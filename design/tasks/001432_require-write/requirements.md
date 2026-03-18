# Requirements: Require Write Credentials When Manually Linking a Git Repository

## Problem

The "link manually" flow allows users to connect a Git repo with no PAT (or a read-only PAT). The repo is cloned successfully (read works), but all write operations — most critically writing to the spec tasks branch — fail with cryptic errors later.

Currently:
- GitHub and GitLab treat the PAT as optional
- Azure DevOps requires a PAT but only validates presence, not write access
- No provider validates that the PAT actually grants write access

## User Stories

**US-1:** As a user linking a GitHub/GitLab repo, I am told the PAT is required (not optional) and why, so I don't link a repo that will silently fail later.

**US-2:** As a user who submits without a PAT, I receive a clear error before the repo is saved: "A Personal Access Token is required. Helix needs write access to create and update spec task branches."

**US-3:** As a user who submits a PAT with insufficient scope, I receive an actionable error: "The provided token does not have write access to this repository. Please ensure the token has the `repo` (GitHub) or `write_repository` (GitLab) scope."

**US-4:** As a user who submits a valid write-capable PAT, the link succeeds exactly as before.

**US-5:** As an admin, repos already linked without write credentials are flagged in the UI with a warning so users know to update their credentials.

## Acceptance Criteria

- [ ] Submitting without a PAT (GitHub or GitLab) returns a validation error and does NOT save the repo.
- [ ] Submitting with a read-only PAT returns a clear error with scope instructions and does NOT save the repo.
- [ ] Submitting with a write-capable PAT succeeds and the repo is saved as before.
- [ ] PAT field is marked as required (not optional) in the form for GitHub and GitLab.
- [ ] Form helper text explains write access is required for spec task branch operations.
- [ ] Existing repos linked without confirmed write credentials show a warning badge/banner in the repository settings UI.
- [ ] Write-access check is server-side (client-side validation alone is insufficient).
- [ ] Error messages are user-friendly and include actionable scope names.
