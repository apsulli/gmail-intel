# Journal Archives

This directory contains archived journal entries for the gmail-intel project.

## Tier System

| File                              | Contents                      | Purpose                                    |
| --------------------------------- | ----------------------------- | ------------------------------------------ |
| `../.gsd/JOURNAL.md`              | Last 5 sessions (hot log)     | Auto-loaded by resume-work, progress, etc. |
| `.gsd/journal/YYYY-MM-archive.md` | Older sessions (cold archive) | Searchable history, never auto-loaded      |

## Archive Files

- `2026-03-archive.md` — Project initialization

## How to Search Archives

To find historical context for a specific phase or feature:

```bash
grep -A 20 "Phase 11" .gsd/journal/2026-03-archive.md
```

Or use `/archive-journal` to archive the current hot log when it grows beyond 5 sessions.
