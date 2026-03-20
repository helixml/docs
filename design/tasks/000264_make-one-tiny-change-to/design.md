# Design

## Current README

The file at `docs/README.md` is a short developer guide covering Quick Start, theme updates, CSS notes, deployment info, and the base template attribution.

**Identified minor issue:** Line 9 uses a triple-backtick shell block with `hugo serve`, but there is an extra blank line (line 12) after the closing fence before the next section. This is cosmetic but slightly inconsistent with the rest of the file.

**Chosen change:** Remove the extra blank line after the `hugo serve` code block (between the closing ` ``` ` and `### Update theme`) so spacing is consistent throughout the document.

## Decision

This is a one-line whitespace cleanup — the simplest possible "tiny change" that improves consistency without touching any content.
