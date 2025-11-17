---
description: Generate automated pull request titles and descriptions by analyzing git commits between branches, with GitHub CLI integration for PR creation.
---

# Automated Pull Request Generation

You are helping generate a pull request with title and description based on commits between branches. You will analyze the changes and create or update a PR using the GitHub CLI (`gh`).

## Step 1: Prepare Source Branch

Get current branch and ensure it's pushed to remote:

```bash
git rev-parse --abbrev-ref HEAD
git push -u origin $(git rev-parse --abbrev-ref HEAD)
```

If push fails, display error and ask user to resolve conflicts or authentication issues.

The target branch will always be **develop**.

## Step 2: Analyze Commit Differences

Gather commits between source and target branches:

1. Fetch latest changes:
```bash
git fetch origin
```

2. Get commits that exist in source but not in target:
```bash
git rev-list --left-right --pretty=format:"%H %s" origin/develop...HEAD
```

3. Parse the output to extract:
   - Commit hashes (full and short 7-char versions)
   - Commit messages
   - Total count of commits

If no commits found, inform user there are no changes to create a PR for.

## Step 3: Generate Pull Request Content

Analyze the collected commits and generate a PR title and description following these rules:

### Title Generation Rules:
- **Format**: `type(scope): concise summary` (max 72 characters)
- **Type selection**:
  - `feat`: New features or functionality additions
  - `fix`: Bug fixes or corrections
  - `docs`: Documentation only changes
  - `style`: Code style changes (formatting, semicolons, etc.)
  - `refactor`: Code restructuring without changing functionality
  - `test`: Adding or modifying tests
  - `chore`: Maintenance tasks, dependency updates, configs
- **Scope**: Extract from commits (e.g., auth, api, ui, database) - optional
- **Summary**: Synthesize the main change from all commits into one clear statement

### Description Generation Rules:

Structure the description with these sections:

1. **Overview** (1 paragraph):
   - Summarize what was changed and the main purpose
   - If multiple features/fixes, group them logically
   
2. **Motivation** (1 paragraph):
   - Explain WHY these changes were needed
   - What problem does this solve?
   - What improvement does this bring?

3. **Changes** (bullet points if multiple distinct changes):
   - List the key modifications made
   - Group related commits together
   - Highlight breaking changes with ⚠️ emoji
   
4. **Commits section**:
   - List each commit with clickable links
   - Format: `- commit message ([short_hash](../../commit/full_hash))`

### Analysis Strategy:
1. Read all commit messages
2. Identify the dominant change type (for the title)
3. Find common scope across commits
4. Create a title that represents the overall intent, not just listing changes
5. Write description that provides context not evident from commit list

### Examples:

**Good PR Title:**
- `feat(auth): add OAuth2 integration with Google`
- `fix(api): resolve race condition in user sessions`
- `refactor: migrate database queries to TypeORM`

**Poor PR Title:**
- `fix: various fixes` (too vague)
- `feat: add login, fix bugs, update docs` (multiple types)
- `update code` (no conventional commit format)

## Step 4: Check for Existing Pull Request

Before creating a new PR, check if one already exists:

```bash
gh pr list --head $(git rev-parse --abbrev-ref HEAD) --base develop --state open --json number,title,url
```

Parse the JSON output to determine if a PR exists.

## Step 5: Create or Update Pull Request

### If NO existing PR:
Create a new draft PR using GitHub CLI:

```bash
gh pr create \
  --title "[generated_title]" \
  --body "[generated_body]" \
  --base develop \
  --head $(git rev-parse --abbrev-ref HEAD) \
  --draft
```

### If existing PR found:
Update the existing PR (preserving draft status):

```bash
gh pr edit [pr_number] \
  --title "[generated_title]" \
  --body "[generated_body]"
```

## Step 6: Display Results

Present the results in a formatted output:

```
═══════════════════════════════════════
Pull Request Successfully Generated
═══════════════════════════════════════

Title: [generated_title]

Description:
[generated_body]

Status: [Created new PR #X / Updated PR #X]
URL: [pr_url]
Mode: Draft

═══════════════════════════════════════
```

## Key Rules

- **MUST** push source branch to origin before creating PR
- **MUST** follow Conventional Commits specification strictly
- **MUST** check for existing PRs to avoid duplicates
- **MUST** create new PRs as drafts by default
- **MUST** include commit links in the PR body with full hash
- **MUST** handle large repositories with many commits gracefully
- **MUST** always target the develop branch
- Generate meaningful descriptions that explain both what and why
- Preserve existing PR draft status when updating
- Focus on clarity and context for reviewers

## Error Handling

- **No authentication**: Guide user to run `gh auth login`
- **No commits found**: Inform user there are no changes between branches
- **Push failure**: Display error and suggest conflict resolution
- **PR creation failure**: Check permissions and repository settings
- **Network issues**: Retry or ask user to retry
- **Invalid branch**: Ensure source branch exists and is not 'develop'
- **Empty commit messages**: Skip or use commit hash as reference

## Additional Guidelines

When generating PR content:
- If commits mention issue numbers (#123), preserve them in description
- Detect and highlight if there are:
  - Breaking changes (look for "BREAKING CHANGE" in commits)
  - New dependencies added
  - Configuration changes required
  - Database migrations included
- Group commits by functionality rather than chronologically
- If commit messages are unclear, analyze file changes if possible
- Maintain professional tone suitable for permanent project history
- Avoid redundancy between title and description opening

The PR should provide complete context for reviewers to understand the changes without examining individual commits, while still linking to them for detailed review.