---
id: NLWeb_with_milvus.md
summary: >-
  Learn how to integrate Microsoft NLWeb with Milvus to build powerful natural
  language interfaces for websites. This tutorial demonstrates how to leverage
  Milvus' vector database capabilities for efficient semantic search, embedding
  storage, and context retrieval in NLWeb applications.
title: Using NLWeb with Milvus
---
<h1 id="Using-NLWeb-with-Milvus" class="common-anchor-header">Using NLWeb with Milvus<button data-href="#Using-NLWeb-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/microsoft/NLWeb">Microsoft’s NLWeb</a> is a proposed framework that enables natural language interfaces for websites, using <a href="https://schema.org/">Schema.org</a>, formats like RSS and the emerging MCP protocol.</p>
<p><a href="https://milvus.io/">Milvus</a> is supported as a vector database backend within NLWeb for embedding storage and efficient vector similarity search, enabling powerful context retrieval for natural language processing applications.</p>
<blockquote>
<p>This documentation is primarily based on the official <a href="https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md">quick start</a> documentation. If you find any outdated or inconsistent content, please prioritize the official documentation and feel free to raise an issue for us.</p>
</blockquote>
<h2 id="Usage" class="common-anchor-header">Usage<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>NLWeb can be configured to use Milvus as the retrieval engine. Below is a guide on how to set up and use NLWeb with Milvus.</p>
<h3 id="Installation" class="common-anchor-header">Installation</h3><p>Clone the repo and set up your environment:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/microsoft/NLWeb
<span class="hljs-built_in">cd</span> NLWeb
python -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate  <span class="hljs-comment"># or `.venv\Scripts\activate` on Windows</span>
<span class="hljs-built_in">cd</span> code
pip install -r requirements.txt
pip install pymilvus  <span class="hljs-comment"># Add Milvus Python client</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-Milvus" class="common-anchor-header">Configuring Milvus</h3><p>To use <strong>Milvus</strong>, update your configuration.</p>
<h4 id="Update-config-files-in-codeconfig" class="common-anchor-header">Update config files in <code translate="no">code/config</code></h4><p>Open the <code translate="no">config_retrieval.yaml</code> file and add the Milvus configuration:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">preferred_endpoint:</span> <span class="hljs-string">milvus_local</span>

<span class="hljs-attr">endpoints:</span>
  <span class="hljs-attr">milvus_local:</span>
    <span class="hljs-attr">database_path:</span> <span class="hljs-string">&quot;../data/milvus.db&quot;</span>
    <span class="hljs-comment"># Set the collection name to use</span>
    <span class="hljs-attr">index_name:</span> <span class="hljs-string">nlweb_collection</span>
    <span class="hljs-comment"># Specify the database type</span>
    <span class="hljs-attr">db_type:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Loading-Data" class="common-anchor-header">Loading Data</h3><p>Once configured, load your content using RSS feeds.</p>
<p>From the <code translate="no">code</code> directory:</p>
<pre><code translate="no" class="language-bash">python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
<button class="copy-code-btn"></button></code></pre>
<p>This will ingest the content into your Milvus collection, storing both the text data and vector embeddings.</p>
<h3 id="Running-the-Server" class="common-anchor-header">Running the Server</h3><p>To start NLWeb, from the <code translate="no">code</code> directory, run:</p>
<pre><code translate="no" class="language-bash">python app-file.py
<button class="copy-code-btn"></button></code></pre>
<p>You can now query your content via natural language using either the web UI at http://localhost:8000/ or directly through the MCP-compatible REST API.</p>
<h2 id="Further-Reading" class="common-anchor-header">Further Reading<button data-href="#Further-Reading" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs">Milvus Documentation</a></li>
<li><a href="https://github.com/microsoft/NLWeb">NLWeb Source</a></li>
<li>Life of a Chat Query</li>
<li>Modifying behavior by changing prompts</li>
<li>Modifying control flow</li>
<li>Modifying the user interface</li>
</ul>
