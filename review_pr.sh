#!/bin/bash
# Usage: ./review_pr.sh <repo> <pr_number>

repo=$1
pr_number=$2

# Fetch PR diff
diff=$(gh pr view $pr_number --repo $repo --json diffUrl -q .diffUrl | xargs curl -s)

# Generate review using gptme
review=$(gptme --non-interactive "Review this pull request diff and provide constructive feedback:
1. Identify potential bugs or issues.
2. Suggest improvements for code quality and readability.
3. Check for adherence to best practices.
4. Highlight any security concerns.

Pull Request Diff:
$diff

Format your review as a markdown list with clear, concise points.")

# Post review comment
gh pr comment $pr_number --repo $repo --body "## Automated Code Review

$review

*This review was generated automatically by gptme.*"