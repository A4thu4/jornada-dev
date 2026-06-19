# Project Guidelines

## Commit Messages

When suggesting or generating commit messages, **always** follow the [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) standard as described in [CONTRIBUTING.md](https://github.com/ArthemizLabs/.github/blob/main/CONTRIBUTING.md).

- Use a valid type such as: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, or `revert`.
- Include a scope when it adds clarity, e.g., `feat(auth): ...`.
- Description must be concise and short.
- Keep the summary **extra short, imperative, and lowercase** unless a proper noun is required.
- Only reference the main changes.
- For breaking changes, use `!` after the type/scope and add a `BREAKING CHANGE:` footer.
- Avoid overly verbose descriptions or unnecessary details.

## Pull Requests

When generating Pull Request titles and descriptions, **you MUST strictly and explicitly use the repository's PR template** available at [PULL_REQUEST_TEMPLATE.md](https://github.com/ArthemizLabs/.github/blob/main/.github/PULL_REQUEST_TEMPLATE.md).

- PR titles **must always have the format**: `<type>(<scope>): <short description>`.
  - Type must be one of: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `revert`.
  - Title must be short, imperative, and lowercase (except proper nouns).
- PR descriptions must always follow the sections of the PR template, such as:
  - `Summary`
  - `Security Impact`
  - `Breaking Changes`
  - `Tests Added`
- Non-applicable sections may be omitted for small or low-impact changes, but never skip required fields for security or critical updates.
- **Do not ignore these conventions. Failing to follow the PR template and commit standards will result in rejections.**

## Mandatory Audits (Commits and PRs)

**Before** suggesting, generating, or finalizing any commit message or PR title/description, **always execute an audit** using the base playbooks:

- [security-auditor.md](https://github.com/ArthemizLabs/.github/blob/main/.github/security-auditor.md) (Security)
- [code-auditor.md](https://github.com/ArthemizLabs/.github/blob/main/.github/code-auditor.md) (Quality/Architecture)

### Rules

- **Detect the stack** and run **only relevant modules**, except:
  - For `security-auditor`, always run Modules **1, 7, 8, and 9**.
- **Always show evidence**: include actual paths and real code/configuration excerpts.
- **Never leak secrets**: mask values such as `sk-****`, `ghp_****`, or `[REDACTED]`.
- **Severity grading**:
  - Security: Critical / High / Medium / Low
  - Quality: Pass / Warning / Fail

### Minimum Output Requirement

- For **security**: Generate a *Security Report* in the format defined by `security-auditor.md`.
- For **quality**: Generate a *Code Audit Report* in the format defined by `code-auditor.md`.

### Blocking Condition

- If there is any **CRITICAL** (security) or **Fail** (quality) finding related to the proposed change, **do not proceed** with commit/PR generation until:
  - the issue is fixed, or
  - explicit user confirmation accepting the risk is provided (and recorded in the PR text under *Security Impact* and/or *Breaking Changes*, as applicable).
- For severe security issues (e.g., secrets/token leaks), PRs must be blocked.

---
**Summary**:  
- Commit messages and PRs **must always** follow the template and Conventional Commits conventions above.
- All generated PR titles and descriptions must be in English and match the standards above.
- Never bypass the conventions or templates — Copilot must enforce them at all times.
