---
id: milvus_for_agents.md
title: Milvus for AI Agents
summary: Learn how AI agents can use Milvus as a vector database for RAG, semantic search, and long-term memory.
---

# Milvus for AI Agents

Milvus provides agent-friendly interfaces that allow AI coding agents and autonomous agent systems to interact with vector databases programmatically. Whether you are building RAG pipelines, semantic search, or agent memory systems, Milvus offers multiple ways for agents to connect and operate.

## Agent tools

<div class="card-wrapper">

<div class="start_card_container">
  <a href="https://github.com/zilliztech/milvus-skill" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Milvus Skill</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">An agent skill for Claude Code that teaches LLMs to use PyMilvus for vector database operations.</p>
  </a>
</div>

<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCP Server</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Model Context Protocol server that lets any MCP-compatible agent interact with Milvus directly.</p>
  </a>
</div>

<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Claude Context MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">MCP server designed for Claude Code, providing context-aware Milvus documentation access.</p>
  </a>
</div>

<div class="start_card_container">
  <a href="integrations_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Agent Frameworks</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Integrations with LangChain, LlamaIndex, OpenAI Agents, and other agent orchestration frameworks.</p>
  </a>
</div>

</div>

## AI prompts

Curated prompts that help AI coding assistants write correct Milvus code. Each prompt encodes the rules and patterns that prevent the most common mistakes.

**How to use:**

1. **Copy** a prompt from the "Full prompt" section on any prompt page.
2. **Save** it to the file your AI tool expects (see [environments table](#use-in-different-environments) below).
3. Your AI assistant will automatically apply the rules when it generates or reviews Milvus code.

### Prompt pages

<div class="card-wrapper">

<div class="start_card_container">
  <a href="agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTS.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Top-level rules for any AI coding agent. Start here if you only want one file.</p>
  </a>
</div>

<div class="start_card_container">
  <a href="python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Correct connection patterns, MilvusClient usage, and ORM API prohibition.</p>
  </a>
</div>

<div class="start_card_container">
  <a href="schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Schema Design</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Field types, primary keys, schema immutability, and BM25 configuration.</p>
  </a>
</div>

</div>

<div class="card-wrapper">

<div class="start_card_container">
  <a href="search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Search Patterns</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">ANN, hybrid, and full-text search with critical constraint rules.</p>
  </a>
</div>

<div class="start_card_container">
  <a href="index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Index Selection</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Decision tree for AUTOINDEX, HNSW, DiskANN, and IVF_FLAT.</p>
  </a>
</div>

<div class="start_card_container">
  <a href="rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAG Pipeline</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">End-to-end retrieval-augmented generation flow with Milvus.</p>
  </a>
</div>

</div>

### Use in different environments

| Environment    | Where to put prompt                            | Instructions                                                                                                            |
| -------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Cursor         | `.cursor/rules/*.md`                           | [Configure project rules](https://docs.cursor.com/en/context/rules)                                                     |
| GitHub Copilot | `.github/copilot-instructions.md`              | [Custom instructions](https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions)             |
| Claude Code    | `CLAUDE.md`                                    | [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code/overview)                                             |
| JetBrains IDEs | `guidelines.md`                                | [Customize guidelines](https://www.jetbrains.com/help/junie/customize-guidelines.html)                                  |
| Gemini CLI     | `GEMINI.md`                                    | [Gemini CLI codelab](https://codelabs.developers.google.com/gemini-cli-hands-on)                                        |
| VS Code        | `.instructions.md`                             | [Configure .instructions.md](https://code.visualstudio.com/docs/copilot/copilot-customization)                          |
| Windsurf       | `guidelines.md`                                | [Configure guidelines.md](https://docs.windsurf.com/windsurf/customize)                                                 |

## Recommended deployment for agents

Choosing the right Milvus deployment depends on your development stage.

| Stage | Deployment | Why |
|---|---|---|
| Prototyping | [Milvus Lite](milvus_lite.md) | Zero-config, in-process. Runs anywhere Python runs — ideal for rapid agent prototyping. |
| Development | [Milvus Standalone](install_standalone-docker.md) | Single-node Docker deployment. Good for local development and testing with realistic data volumes. |
| Production | [Zilliz Cloud](https://cloud.zilliz.com/signup) | Fully managed, serverless Milvus. No infrastructure to manage — agents just connect and operate. |
| Self-hosted production | [Milvus Distributed](install_cluster-helm.md) | Multi-node Kubernetes deployment for teams that need full control over their infrastructure. |

<div class="alert note">

For agent workloads, **Zilliz Cloud** is recommended for production use. Agents typically do not manage infrastructure, so a serverless deployment eliminates operational overhead and provides automatic scaling.

</div>

## Next steps

- [Quick Start](quickstart.md) — Run your first Milvus search in minutes.
- [Agent Framework Integrations](integrations_overview.md) — Connect Milvus with LangChain, LlamaIndex, OpenAI Agents, and more.
