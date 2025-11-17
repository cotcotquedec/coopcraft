---
description: Generate AI-powered conventional commit messages from staged changes with conversation context awareness.
---

# Automated Git Commit Message Generation

You are helping generate an AI-powered commit message for staged changes. Follow these steps carefully:

## Step 1: Validate Staged Changes

Use `execute_command` to check for staged files:
```bash
git diff --cached --name-only
```

If no files are staged, use `ask_followup_question` to ask the user if they want to stage files first, then exit.

## Step 2: Gather Change Context

Execute these commands to collect comprehensive context:

1. Get the diff of staged changes:
```bash
git diff --cached
```

2. Get the list of staged files (excluding lock files):
```bash
git diff --cached --name-only | grep -v '\.lock\.\(json\|yaml\)$'
```

## Step 3: Read File Contents

For each staged file (excluding images and lock files):
- Use `read_file()` to get the full content
- Skip image files: .png, .jpg, .jpeg, .gif, .ico, .svg, .webp, .bmp, .tiff
- Skip lock files: *.lock.json, *.lock.yaml
- If a file cannot be read, note it but continue with others

## Step 4: Generate Commit Message

Using the current conversation context and gathered changes, generate a commit message following the **Conventional Commits** specification.

Consider:
- **Conversation context**: Any features, bugs, or changes discussed in the current chat
- **File changes**: The diff output and full file contents
- **User intent**: Any scope or context mentioned by the user
- **Modified files**: What was changed and why based on the conversation

The commit message must follow this format:
```
type(scope): concise description (max 72 characters)

Detailed explanation of what changed and why (1-3 paragraphs).
Reference any relevant context from the conversation.
Explain the motivation and impact of the changes.
```

**Commit types**: feat, fix, docs, style, refactor, test, chore

## Step 5: Present the Message

Display the generated commit message in a clear, formatted way:
```
═══════════════════════════════════════
Generated Commit Message
═══════════════════════════════════════

[Generated message here]

Files changed: [count]
═══════════════════════════════════════
```

## Step 6: Execute Commit (Optional)

Use `ask_followup_question` to confirm if the user wants to:
- Commit with this message
- Edit the message before committing
- Cancel and regenerate

If confirmed, use `execute_command` to commit:
```bash
git commit -m "escaped_message_here"
```

Make sure to properly escape special characters (quotes, backticks, dollar signs) in the commit message.

## Parameters

Optional parameters (use `ask_followup_question` if needed):
- `--graceful`: Only generate the message without committing
- `--scope`: Specific scope for the commit (e.g., "auth", "api", "ui")
- Additional context about the changes

## Key Rules

- **MUST** exclude lock files and image file contents from analysis
- **MUST** use proper Conventional Commits format
- **MUST** leverage current conversation context for better commit messages
- **MUST** properly escape special characters before executing git commit
- Handle large diffs gracefully (files may be substantial)
- Provide meaningful, context-aware commit messages that explain both what and why
- If tests exist, consider suggesting to run them before committing

## Error Handling

- If no files are staged: Ask user to stage files first
- If file read fails: Log warning but continue with available files
- If commit fails: Display error and suggest corrections
- If message generation is unclear: Ask for more context from the user