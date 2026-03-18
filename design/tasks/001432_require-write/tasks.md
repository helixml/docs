# Implementation Tasks

## Backend

- [ ] Add `validateWriteAccess(ctx, request)` function in `api/pkg/server/git_repository_handlers.go` that checks PAT presence and calls the provider REST API to verify `permissions.push` (GitHub), `access_level >= 30` (GitLab), or HTTP 200 (Azure DevOps)
- [ ] Call `validateWriteAccess` in `createGitRepository()` before `gitRepositoryService.CreateRepository()`, returning HTTP 422 with a user-friendly error message on failure
- [ ] Apply the same `validateWriteAccess` check in `updateGitRepository()` when credential fields change
- [ ] Add `has_write_credentials bool` computed field to the `GitRepository` response type (true if PAT is present; false if linked without credentials)

## Frontend

- [ ] Mark the GitHub PAT field as required in `ExternalRepoForm.tsx` and update helper text to state write access is needed for spec task branch operations and required scope is `repo`
- [ ] Mark the GitLab PAT field as required in `ExternalRepoForm.tsx` and update scope hint to `write_repository` (or `api`)
- [ ] Update `isSubmitDisabled` in `LinkExternalRepositoryDialog.tsx` to require a non-empty token for GitHub and GitLab (currently only enforced for Azure DevOps)
- [ ] Display the server-returned error message from HTTP 422 responses in the link dialog (the API error body should surface directly to the user)
- [ ] Show a warning `Alert` in `SettingsTab.tsx` for existing repos where `has_write_credentials` is false, prompting the user to add a PAT with write access
