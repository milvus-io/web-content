---
id: ai_prompts_landing.md
title: "AI Prompts for Milvus"
summary: Curated prompts to help AI coding assistants write correct, up-to-date Milvus code.
---

# AI Prompts

Curated prompts that help AI coding assistants write correct Milvus code. Each prompt encodes the rules and patterns that prevent the most common mistakes.

## How to use

1. **Copy** a prompt from the "Full prompt" section on any prompt page.
2. **Save** it to the file your AI tool expects (see [environments table](#use-in-different-environments) below).
3. Your AI assistant will automatically apply the rules when it generates or reviews Milvus code.

## Prompt pages

<div class="card-wrapper">

<div class="start_card_container">
  <a href="agents_overview.md">
    <p class="link-btn">🤖 AGENTS.md for Milvus</p>
    <p>Top-level rules for any AI coding agent. Start here if you only want one file.</p>
  </a>
</div>

<div class="start_card_container">
  <a href="python_sdk.md">
    <p class="link-btn">🐍 Milvus Python SDK</p>
    <p>Correct connection patterns, MilvusClient usage, and ORM API prohibition.</p>
  </a>
</div>

<div class="start_card_container">
  <a href="schema_design.md">
    <p class="link-btn">📐 Schema Design</p>
    <p>Field types, primary keys, schema immutability, and BM25 configuration.</p>
  </a>
</div>

</div>

<div class="card-wrapper">

<div class="start_card_container">
  <a href="search_patterns.md">
    <p class="link-btn">🔍 Search Patterns</p>
    <p>ANN, hybrid, and full-text search with critical constraint rules.</p>
  </a>
</div>

<div class="start_card_container">
  <a href="index_selection.md">
    <p class="link-btn">🗂️ Index Selection</p>
    <p>Decision tree for AUTOINDEX, HNSW, DiskANN, and IVF_FLAT.</p>
  </a>
</div>

<div class="start_card_container">
  <a href="rag_pipeline.md">
    <p class="link-btn">🔗 RAG Pipeline</p>
    <p>End-to-end retrieval-augmented generation flow with Milvus.</p>
  </a>
</div>

</div>

## Use in different environments

| Environment    | Where to put prompt                            | Instructions                                                                                                            |
| -------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Cursor         | `.cursor/rules/*.md`                           | [Configure project rules](https://docs.cursor.com/en/context/rules)                                                     |
| GitHub Copilot | `.github/copilot-instructions.md`              | [Custom instructions](https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions)             |
| Claude Code    | `CLAUDE.md`                                    | [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code/overview)                                             |
| JetBrains IDEs | `guidelines.md`                                | [Customize guidelines](https://www.jetbrains.com/help/junie/customize-guidelines.html)                                  |
| Gemini CLI     | `GEMINI.md`                                    | [Gemini CLI codelab](https://codelabs.developers.google.com/gemini-cli-hands-on)                                        |
| VS Code        | `.instructions.md`                             | [Configure .instructions.md](https://code.visualstudio.com/docs/copilot/copilot-customization)                          |
| Windsurf       | `guidelines.md`                                | [Configure guidelines.md](https://docs.windsurf.com/windsurf/customize)                                                 |