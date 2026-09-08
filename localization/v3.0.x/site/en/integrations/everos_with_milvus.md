---
id: everos_with_milvus.md
summary: >-
  In this tutorial, we will build a project assistant that remembers release
  decisions across separate conversations. We will add conversations about the
  Project Atlas launch alongside unrelated conversations about other projects.
  EverOS will use an LLM to extract the memories, while Milvus stores the BM25
  and vector indexes used for hybrid search.
title: Build Long-Term Agent Memory with EverOS and Milvus
---
<h1 id="Build-Long-Term-Agent-Memory-with-EverOS-and-Milvus" class="common-anchor-header">Build Long-Term Agent Memory with EverOS and Milvus<button data-href="#Build-Long-Term-Agent-Memory-with-EverOS-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/EverMind-AI/EverOS">EverOS</a> is a Markdown-first memory system for AI agents. It extracts durable memories from conversations, keeps Markdown as the source of truth, and builds a searchable derived index.</p>
<p>In this tutorial, we will build a project assistant that remembers release decisions across separate conversations. We will add conversations about the Project Atlas launch alongside unrelated conversations about other projects. EverOS will use an LLM to extract the memories, while <a href="https://milvus.io/">Milvus</a> stores the BM25 and vector indexes used for hybrid search.</p>
<pre><code translate="no" class="language-text">Conversations
      |
      v
EverOS + LLM ------&gt; Markdown memory files
      |
      | embedding model
      v
Milvus ------&gt; BM25 + vector hybrid search
<button class="copy-code-btn"></button></code></pre>
<p>The LLM and embedding model have different responsibilities. The LLM turns a conversation into structured memories. The embedding model converts those memories and later search queries into vectors. The basic hybrid search in this tutorial does not require a reranking model.</p>
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
    </button></h2><p>You need:</p>
<ul>
<li>Python 3.12 or later</li>
<li><a href="https://docs.astral.sh/uv/"><code translate="no">uv</code></a></li>
<li>A running <a href="https://milvus.io/docs/install-overview.md">Milvus Server</a></li>
<li>An <a href="https://platform.openai.com/api-keys">OpenAI API key</a></li>
</ul>
<p>This tutorial connects to Milvus Server at <code translate="no">http://localhost:19530</code>. EverOS also supports <a href="https://zilliz.com/cloud">Zilliz Cloud</a> through the same URI and token settings. Its Milvus backend expects a remote endpoint and does not accept a Milvus Lite file path.</p>
<h2 id="Install-EverOS" class="common-anchor-header">Install EverOS<button data-href="#Install-EverOS" class="anchor-icon" translate="no">
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
    </button></h2><p>Create a local project and install EverOS with its optional Milvus dependencies:</p>
<pre><code translate="no" class="language-shell">mkdir everos-milvus-demo
cd everos-milvus-demo

uv init --bare --python 3.12
uv add &quot;everos[milvus]&quot;
<button class="copy-code-btn"></button></code></pre>
<p>The command intentionally does not pin a version, so a new installation resolves the latest compatible EverOS release.</p>
<p>Initialize a separate memory root for the tutorial:</p>
<pre><code translate="no" class="language-shell">export EVEROS_ROOT=&quot;$PWD/everos-data&quot;
uv run everos init --root &quot;$EVEROS_ROOT&quot;
<button class="copy-code-btn"></button></code></pre>
<p>EverOS creates <code translate="no">everos.toml</code> and <code translate="no">ome.toml</code> under this directory. It will also write the extracted memories here.</p>
<h2 id="Configure-OpenAI-and-Milvus" class="common-anchor-header">Configure OpenAI and Milvus<button data-href="#Configure-OpenAI-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Set the OpenAI API key and configure EverOS through environment variables:</p>
<pre><code translate="no" class="language-shell">export OPENAI_API_KEY=&quot;YOUR_OPENAI_API_KEY&quot;
export MILVUS_URI=&quot;http://localhost:19530&quot;

export EVEROS_INDEX__BACKEND=&quot;milvus&quot;
export EVEROS_MILVUS__URI=&quot;$MILVUS_URI&quot;
export EVEROS_MILVUS__COLLECTION_PREFIX=&quot;everos_bootcamp&quot;

export EVEROS_LLM__MODEL=&quot;gpt-5.4-mini&quot;
export EVEROS_LLM__API_KEY=&quot;$OPENAI_API_KEY&quot;
export EVEROS_LLM__BASE_URL=&quot;https://api.openai.com/v1&quot;

export EVEROS_EMBEDDING__MODEL=&quot;text-embedding-3-small&quot;
export EVEROS_EMBEDDING__API_KEY=&quot;$OPENAI_API_KEY&quot;
export EVEROS_EMBEDDING__BASE_URL=&quot;https://api.openai.com/v1&quot;
export EVEROS_EMBEDDING__DIMENSIONS=&quot;1024&quot;

export EVEROS_MEMORIZE__MODE=&quot;chat&quot;
<button class="copy-code-btn"></button></code></pre>
<p>EverOS uses OpenAI for both memory extraction and embeddings. <code translate="no">text-embedding-3-small</code> returns <code translate="no">1536</code> dimensions by default, but EverOS forwards the configured <code translate="no">dimensions</code> value to OpenAI. This tutorial requests <code translate="no">1024</code> dimensions to match the Milvus schemas managed by EverOS.</p>
<p>The <code translate="no">chat</code> memory mode keeps this example focused on user memories. EverOS manages the Milvus collections and their schemas, so you do not need to create them yourself.</p>
<h2 id="Start-EverOS" class="common-anchor-header">Start EverOS<button data-href="#Start-EverOS" class="anchor-icon" translate="no">
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
    </button></h2><p>Start the EverOS HTTP server:</p>
<pre><code translate="no" class="language-shell">uv run everos server start --root &quot;$EVEROS_ROOT&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Keep this terminal open. EverOS connects to Milvus and creates seven derived-index collections with the configured prefix during startup.</p>
<p>Open another terminal in the same project directory and check the service:</p>
<pre><code translate="no" class="language-shell">curl http://127.0.0.1:8000/health
<button class="copy-code-btn"></button></code></pre>
<p>Reference output:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ok&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1.3.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;capabilities&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;llm&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;embed&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;rerank&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;multimodal_llm&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;parser&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;cascade&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;healthy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;pending&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>The response contains additional health fields. The important values for this tutorial are <code translate="no">status: &quot;ok&quot;</code>, <code translate="no">llm: true</code>, <code translate="no">embed: true</code>, and <code translate="no">cascade.healthy: true</code>.</p>
<h2 id="Add-project-conversations" class="common-anchor-header">Add project conversations<button data-href="#Add-project-conversations" class="anchor-icon" translate="no">
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
    </button></h2><p>The following Python program sends ten independent conversations to EverOS. Atlas has separate launch and rollback discussions. Eight conversations about other projects provide distractors so that the later search has to identify the correct project memories.</p>
<p>Save the following code as <code translate="no">add_memories.py</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> urllib.request <span class="hljs-keyword">import</span> Request, urlopen


API_URL = <span class="hljs-string">&quot;http://127.0.0.1:8000/api/v2/memory&quot;</span>
NOW = <span class="hljs-built_in">int</span>(time.time() * <span class="hljs-number">1000</span>)

conversations = [
    (
        <span class="hljs-string">&quot;atlas-release&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;For Project Atlas, we decided to launch with a 10% canary &quot;</span>
                    <span class="hljs-string">&quot;on September 30. Promote to all users only after the checkout &quot;</span>
                    <span class="hljs-string">&quot;error rate stays below 1% for 30 minutes.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">1_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Understood. I will remember the Atlas launch date, canary &quot;</span>
                    <span class="hljs-string">&quot;percentage, and promotion gate.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;atlas-rollback&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">10_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;The Atlas rollback owner is Priya. Roll back immediately if &quot;</span>
                    <span class="hljs-string">&quot;checkout errors exceed 2% for five minutes, and keep the &quot;</span>
                    <span class="hljs-string">&quot;previous container image available for 24 hours.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">11_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Got it. Priya owns rollback, with the 2% five-minute trigger &quot;</span>
                    <span class="hljs-string">&quot;and a 24-hour image retention window.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;orion-pricing&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">20_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Orion will test annual billing with the education &quot;</span>
                    <span class="hljs-string">&quot;segment. The pricing review is scheduled for October 12.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">21_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;I will remember Orion&#x27;s annual billing experiment and October &quot;</span>
                    <span class="hljs-string">&quot;pricing review.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;vega-mobile&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">30_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;For Project Vega, the mobile team chose offline drafts as the &quot;</span>
                    <span class="hljs-string">&quot;next milestone. Elena will review the interaction design on &quot;</span>
                    <span class="hljs-string">&quot;October 18.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">31_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Noted. Vega&#x27;s next milestone is offline drafts, followed by &quot;</span>
                    <span class="hljs-string">&quot;Elena&#x27;s design review.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;nova-warehouse&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">40_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Nova will migrate the analytics warehouse to Iceberg. &quot;</span>
                    <span class="hljs-string">&quot;Marcus owns the checksum rehearsal scheduled for October 22.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">41_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;I will remember Nova&#x27;s warehouse migration and Marcus&#x27;s &quot;</span>
                    <span class="hljs-string">&quot;checksum rehearsal.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;helios-support&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">50_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Helios needs weekend support coverage for the APAC &quot;</span>
                    <span class="hljs-string">&quot;region. Imani will publish the rotation schedule on November 1.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">51_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Noted. Helios needs APAC weekend coverage, and Imani owns the &quot;</span>
                    <span class="hljs-string">&quot;rotation schedule.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;luna-onboarding&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">60_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Luna will replace the onboarding tour with a checklist. &quot;</span>
                    <span class="hljs-string">&quot;The localized copy is due from the content team on October 25.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">61_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;I will remember Luna&#x27;s checklist approach and the localization &quot;</span>
                    <span class="hljs-string">&quot;deadline.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;aurora-observability&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">70_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Aurora will retain detailed telemetry for 30 days. &quot;</span>
                    <span class="hljs-string">&quot;The operations team should alert after three consecutive &quot;</span>
                    <span class="hljs-string">&quot;heartbeat misses.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">71_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Understood. Aurora keeps 30 days of telemetry and alerts after &quot;</span>
                    <span class="hljs-string">&quot;three missed heartbeats.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;comet-invoices&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">80_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Comet will add downloadable invoice PDFs for enterprise &quot;</span>
                    <span class="hljs-string">&quot;accounts. Finance will approve the tax-field layout on October 28.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">81_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Noted. Comet covers enterprise invoice PDFs and an October tax &quot;</span>
                    <span class="hljs-string">&quot;layout review.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;solstice-research&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">90_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Solstice is prototyping voice notes for field researchers. &quot;</span>
                    <span class="hljs-string">&quot;The research team will interview 12 participants in November.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">91_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;I will remember Solstice&#x27;s voice-note prototype and the planned &quot;</span>
                    <span class="hljs-string">&quot;participant interviews.&quot;</span>
                ),
            },
        ],
    ),
]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">post</span>(<span class="hljs-params">path, payload</span>):
    request = Request(
        <span class="hljs-string">f&quot;<span class="hljs-subst">{API_URL}</span>/<span class="hljs-subst">{path}</span>&quot;</span>,
        data=json.dumps(payload).encode(),
        headers={<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/json&quot;</span>},
        method=<span class="hljs-string">&quot;POST&quot;</span>,
    )
    <span class="hljs-keyword">with</span> urlopen(request, timeout=<span class="hljs-number">300</span>) <span class="hljs-keyword">as</span> response:
        <span class="hljs-keyword">return</span> json.load(response)[<span class="hljs-string">&quot;data&quot;</span>]


<span class="hljs-keyword">for</span> session_id, messages <span class="hljs-keyword">in</span> conversations:
    added = post(
        <span class="hljs-string">&quot;add&quot;</span>,
        {
            <span class="hljs-string">&quot;session_id&quot;</span>: session_id,
            <span class="hljs-string">&quot;app_id&quot;</span>: <span class="hljs-string">&quot;project-assistant&quot;</span>,
            <span class="hljs-string">&quot;project_id&quot;</span>: <span class="hljs-string">&quot;launch-planning&quot;</span>,
            <span class="hljs-string">&quot;messages&quot;</span>: messages,
            <span class="hljs-string">&quot;defer_extraction&quot;</span>: <span class="hljs-literal">True</span>,
        },
    )
    flushed = post(
        <span class="hljs-string">&quot;flush&quot;</span>,
        {
            <span class="hljs-string">&quot;session_id&quot;</span>: session_id,
            <span class="hljs-string">&quot;app_id&quot;</span>: <span class="hljs-string">&quot;project-assistant&quot;</span>,
            <span class="hljs-string">&quot;project_id&quot;</span>: <span class="hljs-string">&quot;launch-planning&quot;</span>,
        },
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{session_id}</span>: <span class="hljs-subst">{added[<span class="hljs-string">&#x27;status&#x27;</span>]}</span> -&gt; <span class="hljs-subst">{flushed[<span class="hljs-string">&#x27;status&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Run it from the project directory:</p>
<pre><code translate="no" class="language-shell">uv run python add_memories.py
<button class="copy-code-btn"></button></code></pre>
<p>Reference output:</p>
<pre><code translate="no" class="language-text">atlas-release: accumulated -&gt; extracted
atlas-rollback: accumulated -&gt; extracted
orion-pricing: accumulated -&gt; extracted
vega-mobile: accumulated -&gt; extracted
nova-warehouse: accumulated -&gt; extracted
helios-support: accumulated -&gt; extracted
luna-onboarding: accumulated -&gt; extracted
aurora-observability: accumulated -&gt; extracted
comet-invoices: accumulated -&gt; extracted
solstice-research: accumulated -&gt; extracted
<button class="copy-code-btn"></button></code></pre>
<p>Setting <code translate="no">defer_extraction</code> to <code translate="no">true</code> stores each conversation in the durable buffer without asking the LLM to detect a boundary. The following <code translate="no">/flush</code> call marks the end of that session and triggers one extraction. EverOS then writes the extracted episode to Markdown and asynchronously embeds it for the Milvus index.</p>
<h2 id="Inspect-the-Markdown-memory" class="common-anchor-header">Inspect the Markdown memory<button data-href="#Inspect-the-Markdown-memory" class="anchor-icon" translate="no">
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
    </button></h2><p>The generated episode file is stored under the application, project, and user scopes:</p>
<pre><code translate="no" class="language-shell">find &quot;$EVEROS_ROOT/project-assistant/launch-planning/users/maya/episodes&quot; \
  -type f -name &quot;*.md&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Reference output (the filename date reflects when you run the example):</p>
<pre><code translate="no" class="language-text">everos-data/project-assistant/launch-planning/users/maya/episodes/episode-2026-09-08.md
<button class="copy-code-btn"></button></code></pre>
<p>Open the file to see the LLM-extracted memories. A shortened excerpt looks like this:</p>
<pre><code translate="no" class="language-markdown"><span class="hljs-section">## ep<span class="hljs-emphasis">_20260908_</span>00000001</span>

<span class="hljs-strong">**owner<span class="hljs-emphasis">_id**: maya
**session_</span>id**</span>: atlas-release
<span class="hljs-strong">**sender<span class="hljs-emphasis">_ids**: [maya, assistant]

### Subject
Maya&#x27;s Project Atlas Launch Decision: September 30 Canary and Promotion Criteria

### Content
Maya decided that Project Atlas would launch with a 10% canary on September 30.
The promotion to all users would occur only after the checkout error rate remained
below 1% for 30 minutes.
</span></span><button class="copy-code-btn"></button></code></pre>
<p>Exact wording, identifiers, and timestamps can vary because the memory is extracted by the LLM. The original Markdown files remain the durable source of truth; the Milvus index can be rebuilt from them.</p>
<h2 id="Search-the-memories" class="common-anchor-header">Search the memories<button data-href="#Search-the-memories" class="anchor-icon" translate="no">
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
    </button></h2><p>Use hybrid search to ask what should be remembered before Atlas goes live. Save the following code as <code translate="no">search_memories.py</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> urllib.request <span class="hljs-keyword">import</span> Request, urlopen


URL = <span class="hljs-string">&quot;http://127.0.0.1:8000/api/v2/memory/search&quot;</span>
payload = {
    <span class="hljs-string">&quot;user_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
    <span class="hljs-string">&quot;app_id&quot;</span>: <span class="hljs-string">&quot;project-assistant&quot;</span>,
    <span class="hljs-string">&quot;project_id&quot;</span>: <span class="hljs-string">&quot;launch-planning&quot;</span>,
    <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;What should I remember before Atlas goes live?&quot;</span>,
    <span class="hljs-string">&quot;method&quot;</span>: <span class="hljs-string">&quot;hybrid&quot;</span>,
    <span class="hljs-string">&quot;top_k&quot;</span>: <span class="hljs-number">4</span>,
}


<span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>():
    request = Request(
        URL,
        data=json.dumps(payload).encode(),
        headers={<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/json&quot;</span>},
        method=<span class="hljs-string">&quot;POST&quot;</span>,
    )
    <span class="hljs-keyword">with</span> urlopen(request, timeout=<span class="hljs-number">300</span>) <span class="hljs-keyword">as</span> response:
        <span class="hljs-keyword">return</span> json.load(response)[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;episodes&quot;</span>]


expected_sessions = {<span class="hljs-string">&quot;atlas-release&quot;</span>, <span class="hljs-string">&quot;atlas-rollback&quot;</span>}

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">30</span>):
    episodes = search()
    top_results = episodes[:<span class="hljs-number">2</span>]
    <span class="hljs-keyword">if</span> {episode[<span class="hljs-string">&quot;session_id&quot;</span>] <span class="hljs-keyword">for</span> episode <span class="hljs-keyword">in</span> top_results} == expected_sessions:
        <span class="hljs-keyword">break</span>
    time.sleep(<span class="hljs-number">2</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-keyword">raise</span> RuntimeError(<span class="hljs-string">&quot;The expected Atlas memories were not indexed in time&quot;</span>)

<span class="hljs-keyword">for</span> rank, episode <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(top_results, start=<span class="hljs-number">1</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{rank}</span>. <span class="hljs-subst">{episode[<span class="hljs-string">&#x27;session_id&#x27;</span>]}</span> | score=<span class="hljs-subst">{episode[<span class="hljs-string">&#x27;score&#x27;</span>]:<span class="hljs-number">.3</span>f}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;   <span class="hljs-subst">{episode[<span class="hljs-string">&#x27;subject&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Run the search:</p>
<pre><code translate="no" class="language-shell">uv run python search_memories.py
<button class="copy-code-btn"></button></code></pre>
<p>Reference output (scores and wording may vary):</p>
<pre><code translate="no" class="language-text">1. atlas-release | score=0.492
   Project Atlas Launch Plan: 10% Canary Rollout on September 30 with Error Rate Gate
2. atlas-rollback | score=0.400
   Atlas Rollback Plan Details: Priya as Owner, 2% Error Trigger, 24-Hour Image Retention
<button class="copy-code-btn"></button></code></pre>
<p>Both Atlas conversations are returned ahead of the eight unrelated conversations. EverOS sends the query to the OpenAI embedding endpoint, asks Milvus for BM25 and vector candidates within Maya’s application and project scope, and fuses the two result lists.</p>
<h2 id="Inspect-the-Milvus-collections" class="common-anchor-header">Inspect the Milvus collections<button data-href="#Inspect-the-Milvus-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>EverOS creates one collection for each supported derived memory kind. Use <code translate="no">MilvusClient</code> to list their row counts:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


prefix = <span class="hljs-string">&quot;everos_bootcamp&quot;</span>
client = MilvusClient(uri=os.environ.get(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>, <span class="hljs-string">&quot;http://localhost:19530&quot;</span>))

memory_kinds = [
    <span class="hljs-string">&quot;agent_case&quot;</span>,
    <span class="hljs-string">&quot;agent_skill&quot;</span>,
    <span class="hljs-string">&quot;atomic_fact&quot;</span>,
    <span class="hljs-string">&quot;episode&quot;</span>,
    <span class="hljs-string">&quot;foresight&quot;</span>,
    <span class="hljs-string">&quot;knowledge_topic&quot;</span>,
    <span class="hljs-string">&quot;user_profile&quot;</span>,
]

<span class="hljs-keyword">for</span> kind <span class="hljs-keyword">in</span> memory_kinds:
    name = <span class="hljs-string">f&quot;<span class="hljs-subst">{prefix}</span>_<span class="hljs-subst">{kind}</span>&quot;</span>
    <span class="hljs-keyword">if</span> client.has_collection(collection_name=name):
        result = client.query(
            collection_name=name,
            <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>,
            output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>],
        )
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{kind}</span>: <span class="hljs-subst">{result[<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;count(*)&#x27;</span>]}</span> rows&quot;</span>)

client.close()
<button class="copy-code-btn"></button></code></pre>
<p>Reference output from the validated run:</p>
<pre><code translate="no" class="language-text">agent_case: 0 rows
agent_skill: 0 rows
atomic_fact: 50 rows
episode: 10 rows
foresight: 0 rows
knowledge_topic: 0 rows
user_profile: 1 rows
<button class="copy-code-btn"></button></code></pre>
<p>The exact number of atomic facts may vary with the LLM output. The ten episode rows correspond to the ten flushed conversations. The other collections are available for EverOS memory modes and features that this focused example does not exercise.</p>
<h2 id="Use-another-Milvus-deployment" class="common-anchor-header">Use another Milvus deployment<button data-href="#Use-another-Milvus-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>To use another Milvus Server endpoint or <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, update <code translate="no">EVEROS_MILVUS__URI</code>. Set <code translate="no">EVEROS_MILVUS__TOKEN</code> when the endpoint requires authentication. The ingestion and search code remains unchanged.</p>
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
    </button></h2><p>By combining EverOS with Milvus, you can turn conversations into durable memories and retrieve them through keyword and semantic signals. You can adapt the same pattern to give assistants and other agentic applications long-term memory for your own users, projects, and workflows.</p>
