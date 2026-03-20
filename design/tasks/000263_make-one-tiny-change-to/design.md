# Design

## Approach

Edit `README.md` in the `docs` repo with a trivial change (e.g. add a trailing newline or fix minor punctuation). This is the smallest possible change that exercises the full git/PR flow without risk.

## Key Decisions

- Target file: `docs/README.md` — safe, always present, low risk
- Change type: cosmetic (whitespace or minor wording) so no functional impact
- Branch name: `test/pr-flow` or similar short-lived branch

## Notes

This task exists purely to validate the PR pipeline (branch → commit → push → PR). No content review needed.
