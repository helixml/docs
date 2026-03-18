# Design: Require Write Credentials When Manually Linking a Git Repository

## Architecture

Changes span two layers: backend validation (authoritative) and frontend UX (early feedback).

### Backend: Write-Access Validation

**Location:** `api/pkg/server/git_repository_handlers.go` — `createGitRepository()` handler (line 35)

Add a `validateWriteAccess(ctx, request)` call **before** `gitRepositoryService.CreateRepository()`. This function:

1. Verifies PAT presence for providers where it is now required (GitHub, GitLab, Bitbucket).
2. Calls the provider's REST API to check the authenticated user's push permissions on the target repository. Uses the PAT as a Bearer/token header — no actual git push needed.

**Provider API checks:**

| Provider | Endpoint | Write indicator |
|---|---|---|
| GitHub | `GET https://api.github.com/repos/{owner}/{repo}` | `permissions.push == true` |
| GitLab | `GET https://gitlab.com/api/v4/projects/{encoded_path}` | `access_level >= 30` (Developer) |
| Azure DevOps | `GET https://dev.azure.com/{org}/{project}/_apis/git/repositories/{repo}` | HTTP 200 + `remoteUrl` present (ADO returns 401/403 for insufficient access) |

The function returns a structured error with a human-readable message and the required scope names. The handler converts this to an HTTP 422 Unprocessable Entity response (not 400, since the request is structurally valid but fails a business rule).

**PAT required validation:** Before calling the provider API, if no PAT is present for GitHub/GitLab/Bitbucket, return immediately with the "PAT required" error message without making any external call.

**Existing `updateGitRepository()` handler:** Apply the same validation when credentials are updated so users cannot downgrade an existing repo to read-only access.

### Frontend: Mark PAT as Required

**Location:** `frontend/src/components/project/forms/ExternalRepoForm.tsx`

- GitHub PAT field: change `required={false}` to `required={true}` and update helper text to explain write access requirement.
- GitLab PAT field: same change; also update the required scope hint from `read_repository` to `write_repository` (or `api`).
- Update `isSubmitDisabled` guard in `LinkExternalRepositoryDialog.tsx` to require a non-empty token for GitHub and GitLab (currently only enforced for Azure DevOps).

### Frontend: Existing Repo Warning

**Location:** `frontend/src/components/git/SettingsTab.tsx`

If the stored repository has no PAT (`github.personal_access_token == ""` etc.) and is an external repo, show a `<Alert severity="warning">` banner: "This repository was linked without write credentials. Spec task branch operations may fail. Please add a Personal Access Token with write access."

The backend can expose this as a computed field `has_write_credentials: bool` on the `GitRepository` type to avoid having the frontend inspect raw credential fields.

## Key Decisions

**Use provider REST API, not test push:** A test push (create/delete a temp ref) is risky (rate limits, side effects, branch protection rules). The provider API's permission fields are the intended mechanism for this check.

**Server-side is authoritative:** Client validation is UX-only. The backend must enforce the same rules so the constraint cannot be bypassed via direct API calls.

**HTTP 422 for failed write-access check:** Distinguishes business-rule failures from malformed requests (400) and auth failures (401). Frontend can display the error message from the response body directly.

**No breaking change for OAuth-linked repos:** Repos connected via OAuth (`OAuthConnectionID` set) are not affected — OAuth tokens are managed by Helix and already carry appropriate scopes. The validation only applies when a user-supplied PAT is the credential mechanism.

## Codebase Patterns Discovered

- Provider-specific credential structs are in `api/pkg/types/git_repositories.go` lines 93-127.
- Credential resolution order is in `getCredentialsForRepo()` at `api/pkg/services/git_repository_service.go` lines 2599-2648: OAuth → provider PAT → username/password fallback.
- The `createGitRepository()` handler already handles an Azure DevOps PAT-required check at the service layer (lines 314-324 of `git_repository_service.go`) — the new validation should be consistent with that pattern but moved to the handler layer and extended to all providers.
- Frontend form is split: `LinkExternalRepositoryDialog.tsx` holds dialog state and submit logic; `ExternalRepoForm.tsx` is the reusable inner form component used in both the link dialog and the create-project dialog. Both may need PAT-required updates.
