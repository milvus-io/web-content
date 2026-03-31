---
id: milvus_for_agents.md
title: Milvus for AI Agents
summary: >-
  Learn how AI agents can use Milvus as a vector database for RAG, semantic
  search, and long-term memory.
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">Milvus for AI Agents<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>Milvus provides agent-friendly interfaces that allow AI coding agents and autonomous agent systems to interact with vector databases programmatically. Whether you are building RAG pipelines, semantic search, or agent memory systems, Milvus offers multiple ways for agents to connect and operate.</p>
<h2 id="Agent-tools" class="common-anchor-header">Agent tools<button data-href="#Agent-tools" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><div class="card-wrapper">
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
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/integrations_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Agent Frameworks</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Integrations with LangChain, LlamaIndex, OpenAI Agents, and other agent orchestration frameworks.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">AI prompts<button data-href="#AI-prompts" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Curated prompts that help AI coding assistants write correct Milvus code. Each prompt encodes the rules and patterns that prevent the most common mistakes.</p>
<p><strong>How to use:</strong></p>
<ol>
<li><strong>Copy</strong> a prompt from the “Full prompt” section on any prompt page.</li>
<li><strong>Save</strong> it to the file your AI tool expects (see <a href="#use-in-different-environments">environments table</a> below).</li>
<li>Your AI assistant will automatically apply the rules when it generates or reviews Milvus code.</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">Prompt pages<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTS.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Top-level rules for any AI coding agent. Start here if you only want one file.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Correct connection patterns, MilvusClient usage, and ORM API prohibition.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Schema Design</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Field types, primary keys, schema immutability, and BM25 configuration.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Search Patterns</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">ANN, hybrid, and full-text search with critical constraint rules.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Index Selection</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Decision tree for AUTOINDEX, HNSW, DiskANN, and IVF_FLAT.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAG Pipeline</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">End-to-end retrieval-augmented generation flow with Milvus.</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">Use in different environments<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><table>
<thead>
<tr><th>Environment</th><th>Where to put prompt</th><th>Instructions</th></tr>
</thead>
<tbody>
<tr><td>Cursor</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">Configure project rules</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">Custom instructions</a></td></tr>
<tr><td>Claude Code</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Claude Code docs</a></td></tr>
<tr><td>JetBrains IDEs</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">Customize guidelines</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI codelab</a></td></tr>
<tr><td>VS Code</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">Configure .instructions.md</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">Configure guidelines.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">Recommended deployment for agents<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Choosing the right Milvus deployment depends on your development stage.</p>
<table>
<thead>
<tr><th>Stage</th><th>Deployment</th><th>Why</th></tr>
</thead>
<tbody>
<tr><td>Prototyping</td><td><a href="/docs/milvus_lite.md">Milvus Lite</a></td><td>Zero-config, in-process. Runs anywhere Python runs — ideal for rapid agent prototyping.</td></tr>
<tr><td>Development</td><td><a href="/docs/install_standalone-docker.md">Milvus Standalone</a></td><td>Single-node Docker deployment. Good for local development and testing with realistic data volumes.</td></tr>
<tr><td>Production</td><td><a href="https://cloud.zilliz.com/signup">Zilliz Cloud</a></td><td>Fully managed, serverless Milvus. No infrastructure to manage — agents just connect and operate.</td></tr>
<tr><td>Self-hosted production</td><td><a href="/docs/install_cluster-helm.md">Milvus Distributed</a></td><td>Multi-node Kubernetes deployment for teams that need full control over their infrastructure.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>For agent workloads, <strong>Zilliz Cloud</strong> is recommended for production use. Agents typically do not manage infrastructure, so a serverless deployment eliminates operational overhead and provides automatic scaling.</p>
</div>
<h2 id="Quick-connection-examples" class="common-anchor-header">Quick connection examples<button data-href="#Quick-connection-examples" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Connect to Milvus from your agent code:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Lite (local, zero-config)</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_agent.db&quot;</span>)

<span class="hljs-comment"># Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Zilliz Cloud</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;YOUR_ZILLIZ_CLOUD_URI&quot;</span>,
    token=<span class="hljs-string">&quot;YOUR_ZILLIZ_CLOUD_TOKEN&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Next-steps" class="common-anchor-header">Next steps<button data-href="#Next-steps" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ul>
<li><a href="/docs/quickstart.md">Quick Start</a> — Run your first Milvus search in minutes.</li>
<li><a href="/docs/integrations_overview.md">Agent Framework Integrations</a> — Connect Milvus with LangChain, LlamaIndex, OpenAI Agents, and more.</li>
</ul>
