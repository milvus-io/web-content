---
id: milvus_and_mcp.md
summary: >-
  This tutorial walks you through setting up an MCP server for Milvus, allowing
  AI applications to perform vector searches, manage collections, and retrieve
  data using natural language commands—without writing custom database queries.
title: Integrate Milvus with MindsDB
---
<h1 id="MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="common-anchor-header">MCP + Milvus: Connecting AI with Vector Databases<button data-href="#MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="anchor-icon" translate="no">
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
    </button></h1><iframe width="560" height="315" src="https://www.youtube.com/embed/0wAsrUxv8gM?si=BVyRqLJ2PuZIBF5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h2 id="Introduction" class="common-anchor-header">Introduction<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>The <strong>Model Context Protocol (MCP)</strong> is an open protocol that enables AI applications, such as Claude and Cursor, to interact with external data sources and tools seamlessly. Whether you’re building custom AI applications, integrating AI workflows, or enhancing chat interfaces, MCP provides a standardized way to connect large language models (LLMs) with relevant contextual data.</p>
<p>This tutorial walks you through <strong>setting up an MCP server for Milvus</strong>, allowing AI applications to perform vector searches, manage collections, and retrieve data using <strong>natural language commands</strong>—without writing custom database queries.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Before setting up the MCP server, ensure you have:</p>
<ul>
<li>Python 3.10 or higher</li>
<li>A running <a href="https://milvus.io/">Milvus</a> instance</li>
<li><a href="https://github.com/astral-sh/uv">uv</a> (recommended for running the server)</li>
</ul>
<h2 id="Getting-Started" class="common-anchor-header">Getting Started<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>The recommended way to use this MCP server is to run it directly with uv without installation. This is how both Claude Desktop and Cursor are configured to use it in the examples below.</p>
<p>If you want to clone the repository:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/mcp-server-milvus.git
<span class="hljs-built_in">cd</span> mcp-server-milvus
<button class="copy-code-btn"></button></code></pre>
<p>Then you can run the server directly:</p>
<pre><code translate="no" class="language-bash">uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-Applications" class="common-anchor-header">Supported Applications<button data-href="#Supported-Applications" class="anchor-icon" translate="no">
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
    </button></h2><p>This MCP server can be used with various AI applications that support the Model Context Protocol, such as:</p>
<ul>
<li><strong>Claude Desktop</strong>: Anthropic’s desktop application for Claude</li>
<li><strong>Cursor</strong>: AI-powered code editor with MCP support in its Composer feature</li>
<li><strong>Other custom MCP clients</strong> Any application implementing the MCP client specification</li>
</ul>
<h2 id="Using-MCP-with-Claude-Desktop" class="common-anchor-header">Using MCP with Claude Desktop<button data-href="#Using-MCP-with-Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Install <a href="https://claude.ai/download">Claude Desktop</a>.</li>
<li>Open the Claude configuration file:
<ul>
<li>On macOS: <code translate="no">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
</ul></li>
<li>Add the following configuration:</li>
</ol>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;mcpServers&quot;</span>: {
    <span class="hljs-string">&quot;milvus&quot;</span>: {
      <span class="hljs-string">&quot;command&quot;</span>: <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span>,
      <span class="hljs-string">&quot;args&quot;</span>: [
        <span class="hljs-string">&quot;--directory&quot;</span>,
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span>,
        <span class="hljs-string">&quot;run&quot;</span>,
        <span class="hljs-string">&quot;server.py&quot;</span>,
        <span class="hljs-string">&quot;--milvus-uri&quot;</span>,
        <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      ]
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Restart Claude Desktop to apply the changes.</li>
</ol>
<h2 id="Using-MCP-with-Cursor" class="common-anchor-header">Using MCP with Cursor<button data-href="#Using-MCP-with-Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.cursor.com/context/model-context-protocol">Cursor</a> also supports MCP tools through its Agent feature in Composer. You can add the Milvus MCP server to Cursor in two ways:</p>
<h3 id="Option-1-Using-Cursor-Settings-UI" class="common-anchor-header">Option 1: Using Cursor Settings UI</h3><ol>
<li>Open <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Click <code translate="no">+ Add New MCP Server</code>.</li>
<li>Fill in:
<ul>
<li>Type: <code translate="no">stdio</code></li>
<li>Name: <code translate="no">milvus</code></li>
<li>Command:
<pre><code translate="no" class="language-bash">/PATH/TO/uv --directory /path/to/mcp-server-milvus/src/mcp_server_milvus run server.py --milvus-uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre></li>
<li>⚠️ Tip: Use <code translate="no">127.0.0.1</code> instead of <code translate="no">localhost</code> to avoid potential DNS resolution issues.</li>
</ul></li>
</ol>
<h3 id="Option-2-Using-Project-specific-Configuration-Recommended" class="common-anchor-header">Option 2: Using Project-specific Configuration (Recommended)</h3><ol>
<li>Create a <code translate="no">.cursor/mcp.json</code> file in your <strong>project root directory</strong>:</li>
</ol>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;mcpServers&quot;</span>: {
    <span class="hljs-string">&quot;milvus&quot;</span>: {
      <span class="hljs-string">&quot;command&quot;</span>: <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span>,
      <span class="hljs-string">&quot;args&quot;</span>: [
        <span class="hljs-string">&quot;--directory&quot;</span>,
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span>,
        <span class="hljs-string">&quot;run&quot;</span>,
        <span class="hljs-string">&quot;server.py&quot;</span>,
        <span class="hljs-string">&quot;--milvus-uri&quot;</span>,
        <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
      ]
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Restart Cursor to apply the configuration.</li>
</ol>
<p>After adding the server, you may need to press the refresh button in the MCP settings to populate the tool list. The Composer Agent will automatically use the Milvus tools when relevant to your queries.</p>
<h2 id="Verifying-the-Integration" class="common-anchor-header">Verifying the Integration<button data-href="#Verifying-the-Integration" class="anchor-icon" translate="no">
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
    </button></h2><p>To ensure the MCP server is correctly set up:</p>
<h3 id="For-Cursor" class="common-anchor-header">For Cursor</h3><ol>
<li>Go to <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Confirm that <code translate="no">&quot;Milvus&quot;</code> appears in the list of MCP servers.</li>
<li>Check if Milvus tools (e.g., <code translate="no">milvus_list_collections</code>, <code translate="no">milvus_vector_search</code>) are listed.</li>
<li>If errors appear, see the <strong>Troubleshooting</strong> section below.</li>
</ol>
<h2 id="MCP-Server-Tools-for-Milvus" class="common-anchor-header">MCP Server Tools for Milvus<button data-href="#MCP-Server-Tools-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>This MCP server provides multiple tools for <strong>searching, querying, and managing vector data in Milvus</strong>. For more details, please refer to the <a href="https://github.com/zilliztech/mcp-server-milvus">mcp-server-milvus</a> documentation.</p>
<h3 id="🔍-Search-and-Query-Tools" class="common-anchor-header">🔍 Search and Query Tools</h3><ul>
<li><strong><code translate="no">milvus-text-search</code></strong> → Search for documents using full text search.</li>
<li><strong><code translate="no">milvus-vector-search</code></strong> → Perform vector similarity search on a collection.</li>
<li><strong><code translate="no">milvus-hybrid-search</code></strong> → Perform hybrid search combining vector similarity and attribute filtering.</li>
<li><strong><code translate="no">milvus-multi-vector-search</code></strong> → Perform vector similarity search with multiple query vectors.</li>
<li><strong><code translate="no">milvus-query</code></strong> → Query collection using filter expressions.</li>
<li><strong><code translate="no">milvus-count</code></strong> → Count entities in a collection.</li>
</ul>
<h3 id="📁-Collection-Management" class="common-anchor-header">📁 Collection Management</h3><ul>
<li><strong><code translate="no">milvus-list-collections</code></strong> → List all collections in the database.</li>
<li><strong><code translate="no">milvus-collection-info</code></strong> → Get detailed information about a collection.</li>
<li><strong><code translate="no">milvus-get-collection-stats</code></strong> → Get statistics about a collection.</li>
<li><strong><code translate="no">milvus-create-collection</code></strong> → Create a new collection with specified schema.</li>
<li><strong><code translate="no">milvus-load-collection</code></strong> → Load a collection into memory for search and query.</li>
<li><strong><code translate="no">milvus-release-collection</code></strong> → Release a collection from memory.</li>
<li><strong><code translate="no">milvus-get-query-segment-info</code></strong> → Get information about query segments.</li>
<li><strong><code translate="no">milvus-get-collection-loading-progress</code></strong> → Get the loading progress of a collection.</li>
</ul>
<h3 id="📊-Data-Operations" class="common-anchor-header">📊 Data Operations</h3><ul>
<li><strong><code translate="no">milvus-insert-data</code></strong> → Insert data into a collection.</li>
<li><strong><code translate="no">milvus-bulk-insert</code></strong> → Insert data in batches for better performance.</li>
<li><strong><code translate="no">milvus-upsert-data</code></strong> → Upsert data into a collection (insert or update if exists).</li>
<li><strong><code translate="no">milvus-delete-entities</code></strong> → Delete entities from a collection based on filter expression.</li>
<li><strong><code translate="no">milvus-create-dynamic-field</code></strong> → Add a dynamic field to an existing collection.</li>
</ul>
<h3 id="⚙️-Index-Management" class="common-anchor-header">⚙️ Index Management</h3><ul>
<li><strong><code translate="no">milvus-create-index</code></strong> → Create an index on a vector field.</li>
<li><strong><code translate="no">milvus-get-index-info</code></strong> → Get information about indexes in a collection.</li>
</ul>
<h2 id="Environment-Variables" class="common-anchor-header">Environment Variables<button data-href="#Environment-Variables" class="anchor-icon" translate="no">
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
<li><strong><code translate="no">MILVUS_URI</code></strong> → Milvus server URI (can be set instead of <code translate="no">--milvus-uri</code>).</li>
<li><strong><code translate="no">MILVUS_TOKEN</code></strong> → Optional authentication token.</li>
<li><strong><code translate="no">MILVUS_DB</code></strong> → Database name (defaults to “default”).</li>
</ul>
<h2 id="Development" class="common-anchor-header">Development<button data-href="#Development" class="anchor-icon" translate="no">
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
    </button></h2><p>To run the server directly:</p>
<pre><code translate="no" class="language-bash">uv run server.<span class="hljs-property">py</span> --milvus-uri <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">Examples<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Using-Claude-Desktop" class="common-anchor-header">Using Claude Desktop</h3><h4 id="Example-1-Listing-Collections" class="common-anchor-header">Example 1: Listing Collections</h4><pre><code translate="no">What are the collections I have in my Milvus DB?
<button class="copy-code-btn"></button></code></pre>
<p>Claude will then use MCP to check this information on our Milvus DB.</p>
<pre><code translate="no">I&#x27;ll check what collections are available in your Milvus database.

&gt; View result from milvus-list-collections from milvus (local)

Here are the collections in your Milvus database:

1. rag_demo
2. test
3. chat_messages
4. text_collection
5. image_collection
6. customized_setup
7. streaming_rag_demo
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Searching-for-Documents" class="common-anchor-header">Example 2: Searching for Documents</h4><pre><code translate="no"><span class="hljs-title class_">Find</span> documents <span class="hljs-keyword">in</span> my text_collection that mention <span class="hljs-string">&quot;machine learning&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Claude will use the full-text search capabilities of Milvus to find relevant documents:</p>
<pre><code translate="no">I&#x27;ll search for documents about machine learning in your text_collection.

&gt; View result from milvus-text-search from milvus (local)

Here are the documents I found that mention machine learning:
[Results will appear here based on your actual data]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-Cursor" class="common-anchor-header">Using Cursor</h3><h4 id="Example-Creating-a-Collection" class="common-anchor-header">Example: Creating a Collection</h4><p>In Cursor’s Composer, you can ask:</p>
<pre><code translate="no">Create a <span class="hljs-keyword">new</span> collection called <span class="hljs-string">&#x27;articles&#x27;</span> <span class="hljs-function"><span class="hljs-keyword">in</span> Milvus <span class="hljs-keyword">with</span> fields <span class="hljs-keyword">for</span> <span class="hljs-title">title</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-title">content</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-keyword">and</span> a vector <span class="hljs-title">field</span> (<span class="hljs-params"><span class="hljs-number">128</span> dimensions</span>)
</span><button class="copy-code-btn"></button></code></pre>
<p>Cursor will use the MCP server to execute this operation:</p>
<pre><code translate="no">I<span class="hljs-string">&#x27;ll create a new collection called &#x27;</span>articles<span class="hljs-string">&#x27; with the specified fields.

&gt; View result from milvus-create-collection from milvus (local)

Collection &#x27;</span>articles<span class="hljs-string">&#x27; has been created successfully with the following schema:
- title: string
- content: string
- vector: float vector[128]
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Troubleshooting" class="common-anchor-header">Troubleshooting<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Common-Issues" class="common-anchor-header">Common Issues</h3><h4 id="Connection-Errors" class="common-anchor-header">Connection Errors</h4><p>If you see errors like &quot;Failed to connect to Milvus server&quot;:</p>
<ol>
<li>Verify your Milvus instance is running: <code translate="no">docker ps</code> (if using Docker)</li>
<li>Check the URI is correct in your configuration</li>
<li>Ensure there are no firewall rules blocking the connection</li>
<li>Try using <code translate="no">127.0.0.1</code> instead of <code translate="no">localhost</code> in the URI</li>
</ol>
<h4 id="Authentication-Issues" class="common-anchor-header">Authentication Issues</h4><p>If you see authentication errors:</p>
<ol>
<li>Verify your <code translate="no">MILVUS_TOKEN</code> is correct</li>
<li>Check if your Milvus instance requires authentication</li>
<li>Ensure you have the correct permissions for the operations you’re trying to perform</li>
</ol>
<h4 id="Tool-Not-Found" class="common-anchor-header">Tool Not Found</h4><p>If the MCP tools don’t appear in Claude Desktop or Cursor:</p>
<ol>
<li>Restart the application</li>
<li>Check the server logs for any errors</li>
<li>Verify the MCP server is running correctly</li>
<li>Press the refresh button in the MCP settings (for Cursor)</li>
</ol>
<h3 id="Getting-Help" class="common-anchor-header">Getting Help</h3><p>If you continue to experience issues:</p>
<ol>
<li>Check the <a href="https://github.com/zilliztech/mcp-server-milvus/issues">GitHub Issues</a> for similar problems</li>
<li>Join the <a href="https://discord.gg/zilliz">Zilliz Community Discord</a> for support</li>
<li>File a new issue with detailed information about your problem</li>
</ol>
<h2 id="Conclusion" class="common-anchor-header">Conclusion<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>By following this tutorial, you now have an <strong>MCP server</strong> running, enabling AI-powered vector search in Milvus. Whether you’re using <strong>Claude Desktop</strong> or <strong>Cursor</strong>, you can now query, manage, and search your Milvus database using <strong>natural language commands</strong>—without writing database code!</p>
