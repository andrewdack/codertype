# Codertype — Claude Guidelines

## Colors
- Always use CSS variable-based Tailwind classes for colors (`text-muted-foreground`, `text-foreground`, `text-vscode-blue`, `bg-background`, `border-border`, etc.)
- Never hardcode hex values like `text-[#4D4D4D]` — map them to the appropriate variable instead

## Code style
- Do not alter code not directly relevant to the prompt without permission
- Prefer simple, readable solutions over complex ones
- Avoid unnecessary abstractions
- Use strict TypeScript types (no `any` unless unavoidable)
- Keep components small and focused
- Do not mix JSX elements and component references in data structures
- Only use `"use client"` when necessary
- Keep logic out of JSX when it becomes complex
- Reuse existing patterns in the codebase

## Communication
- Explain non-obvious decisions briefly
- Ask for clarification if requirements are unclear

## Comments
- Write all comments in all lowercase
