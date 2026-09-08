---
id: everos_with_milvus.md
summary: >-
  在本教程中，我们将构建一个项目助手，它能够记住不同对话中的发布决策。我们将添加关于“Project
  Atlas”发布的对话，以及与之无关的其他项目对话。EverOS 将使用大型语言模型（LLM）来提取这些信息，而 Milvus 则负责存储用于混合搜索的
  BM25 和向量索引。
title: 利用 EverOS 和 Milvus 构建长期智能体记忆
---
<h1 id="Build-Long-Term-Agent-Memory-with-EverOS-and-Milvus" class="common-anchor-header">利用 EverOS 和 Milvus 构建长期智能体记忆<button data-href="#Build-Long-Term-Agent-Memory-with-EverOS-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/EverMind-AI/EverOS">EverOS</a>是一个面向 AI Agents 的“Markdown 优先”记忆系统。它能从对话中提取持久的记忆，将 Markdown 作为权威数据源，并构建可搜索的衍生索引。</p>
<p>在本教程中，我们将构建一个项目助手，使其能够记住不同对话中的发布决策。我们将添加关于“Project Atlas”发布的对话，以及与其他项目相关的无关对话。EverOS将使用大型语言模型（LLM）提取记忆，<a href="https://milvus.io/">而Milvus</a>则负责存储用于混合搜索的BM25和向量索引。</p>
<pre><code translate="no" class="language-text">Conversations
      |
      v
EverOS + LLM ------&gt; Markdown memory files
      |
      | embedding model
      v
Milvus ------&gt; BM25 + vector hybrid search
<button class="copy-code-btn"></button></code></pre>
<p>大语言模型（LLM）和嵌入模型各司其职。大语言模型将对话转化为结构化记忆；嵌入模型则将这些记忆及后续的搜索查询转换为向量。本教程中的基础混合搜索无需使用重新排序模型。</p>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>您需要：</p>
<ul>
<li>Python 3.12 或更高版本</li>
<li><a href="https://docs.astral.sh/uv/"><code translate="no">uv</code></a></li>
<li>正在运行的<a href="https://milvus.io/docs/install-overview.md">Milvus 服务器</a></li>
<li>一个<a href="https://platform.openai.com/api-keys">OpenAI API 密钥</a></li>
</ul>
<p>本教程将连接至<code translate="no">http://localhost:19530</code> 上的 Milvus 服务器。EverOS 还支持通过相同的 URI 和令牌设置连接至<a href="https://zilliz.com/cloud">Zilliz Cloud</a>。其 Milvus 后端需要远程端点，不接受 Milvus Lite 文件路径。</p>
<h2 id="Install-EverOS" class="common-anchor-header">安装 EverOS<button data-href="#Install-EverOS" class="anchor-icon" translate="no">
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
    </button></h2><p>创建本地项目并安装 EverOS 及其可选的 Milvus 依赖项：</p>
<pre><code translate="no" class="language-shell">mkdir everos-milvus-demo
cd everos-milvus-demo

uv init --bare --python 3.12
uv add &quot;everos[milvus]&quot;
<button class="copy-code-btn"></button></code></pre>
<p>该命令特意未指定版本，因此新安装时会自动获取最新的兼容 EverOS 版本。</p>
<p>为本教程初始化一个独立的内存根目录：</p>
<pre><code translate="no" class="language-shell">export EVEROS_ROOT=&quot;$PWD/everos-data&quot;
uv run everos init --root &quot;$EVEROS_ROOT&quot;
<button class="copy-code-btn"></button></code></pre>
<p>EverOS 会在该目录下创建<code translate="no">everos.toml</code> 和<code translate="no">ome.toml</code> 文件，并在此处写入提取的内存数据。</p>
<h2 id="Configure-OpenAI-and-Milvus" class="common-anchor-header">配置 OpenAI 和 Milvus<button data-href="#Configure-OpenAI-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>通过环境变量设置 OpenAI API 密钥并配置 EverOS：</p>
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
<p>EverOS 同时使用 OpenAI 进行记忆提取和 Embeddings 处理。<code translate="no">text-embedding-3-small</code> 默认返回<code translate="no">1536</code> 维度的结果，但 EverOS 会将配置的<code translate="no">dimensions</code> 值转发给 OpenAI。本教程请求<code translate="no">1024</code> 维度的结果，以匹配由 EverOS 管理的 Milvus Schema。</p>
<p><code translate="no">chat</code> 内存模式使本示例专注于用户内存。EverOS 负责管理 Milvus Collections 和其 Schemas，因此您无需自行创建。</p>
<h2 id="Start-EverOS" class="common-anchor-header">启动 EverOS<button data-href="#Start-EverOS" class="anchor-icon" translate="no">
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
    </button></h2><p>启动 EverOS HTTP 服务器：</p>
<pre><code translate="no" class="language-shell">uv run everos server start --root &quot;$EVEROS_ROOT&quot;
<button class="copy-code-btn"></button></code></pre>
<p>请保持此终端窗口打开。EverOS 在启动时会连接到 Milvus，并使用配置的前缀创建七个派生索引 Collection。</p>
<p>在同一项目目录下打开另一个终端并检查服务状态：</p>
<pre><code translate="no" class="language-shell">curl http://127.0.0.1:8000/health
<button class="copy-code-btn"></button></code></pre>
<p>参考输出：</p>
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
<p>响应中包含额外的健康状态字段。本教程中重要的值包括<code translate="no">status: &quot;ok&quot;</code> 、<code translate="no">llm: true</code> 、<code translate="no">embed: true</code> 以及<code translate="no">cascade.healthy: true</code> 。</p>
<h2 id="Add-project-conversations" class="common-anchor-header">添加项目对话<button data-href="#Add-project-conversations" class="anchor-icon" translate="no">
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
    </button></h2><p>以下 Python 程序向 EverOS 发送十个独立的对话。Atlas 分别处理启动和回滚相关的讨论。其中八个关于其他项目的对话作为干扰项，以便后续搜索必须识别出正确的项目记忆。</p>
<p>将以下代码保存为<code translate="no">add_memories.py</code> ：</p>
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
<p>在项目目录下运行该程序：</p>
<pre><code translate="no" class="language-shell">uv run python add_memories.py
<button class="copy-code-btn"></button></code></pre>
<p>参考输出：</p>
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
<p>将<code translate="no">defer_extraction</code> 设置为<code translate="no">true</code> 后，系统会将每次对话存储在持久化缓冲区中，而不会要求大型语言模型（LLM）检测边界。以下<code translate="no">/flush</code> 调用标志着该会话的结束，并触发一次提取操作。随后，EverOS将提取的片段写入Markdown格式，并异步将其嵌入到Milvus索引中。</p>
<h2 id="Inspect-the-Markdown-memory" class="common-anchor-header">检查 Markdown 缓存<button data-href="#Inspect-the-Markdown-memory" class="anchor-icon" translate="no">
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
    </button></h2><p>生成的对话片段文件存储在应用、项目和用户范围下：</p>
<pre><code translate="no" class="language-shell">find &quot;$EVEROS_ROOT/project-assistant/launch-planning/users/maya/episodes&quot; \
  -type f -name &quot;*.md&quot;
<button class="copy-code-btn"></button></code></pre>
<p>参考输出（文件名中的日期反映了您运行示例的时间）：</p>
<pre><code translate="no" class="language-text">everos-data/project-assistant/launch-planning/users/maya/episodes/episode-2026-09-08.md
<button class="copy-code-btn"></button></code></pre>
<p>打开文件可查看由 LLM 提取的记忆内容。以下为简短摘录：</p>
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
<p>由于记忆片段由 LLM 提取，具体措辞、标识符和时间戳可能会有所不同。原始 Markdown 文件仍是可靠的权威来源；Milvus 索引可基于这些文件重建。</p>
<h2 id="Search-the-memories" class="common-anchor-header">搜索记忆<button data-href="#Search-the-memories" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Atlas 正式上线前，使用混合搜索功能来确定应记录哪些内容。将以下代码保存为<code translate="no">search_memories.py</code> ：</p>
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
<p>运行搜索：</p>
<pre><code translate="no" class="language-shell">uv run python search_memories.py
<button class="copy-code-btn"></button></code></pre>
<p>参考输出（得分和措辞可能有所不同）：</p>
<pre><code translate="no" class="language-text">1. atlas-release | score=0.492
   Project Atlas Launch Plan: 10% Canary Rollout on September 30 with Error Rate Gate
2. atlas-rollback | score=0.400
   Atlas Rollback Plan Details: Priya as Owner, 2% Error Trigger, 24-Hour Image Retention
<button class="copy-code-btn"></button></code></pre>
<p>两段 Atlas 对话均排在八段无关对话之前。EverOS 将查询发送至 OpenAI Embeddings 端点，向 Milvus 请求 Maya 的应用程序和项目范围内的 BM25 及向量候选项，并融合这两组结果列表。</p>
<h2 id="Inspect-the-Milvus-collections" class="common-anchor-header">检查 Milvus Collections<button data-href="#Inspect-the-Milvus-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>EverOS 为每种受支持的派生内存类型创建一个 Collection。使用<code translate="no">MilvusClient</code> 列出其行数：</p>
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
<p>参考经过验证的运行结果：</p>
<pre><code translate="no" class="language-text">agent_case: 0 rows
agent_skill: 0 rows
atomic_fact: 50 rows
episode: 10 rows
foresight: 0 rows
knowledge_topic: 0 rows
user_profile: 1 rows
<button class="copy-code-btn"></button></code></pre>
<p>原子事实的确切数量可能因 LLM 输出而异。这十行记录对应于已刷出的十段对话。其他 Collections 合适用于本示例未涉及的 EverOS 内存模式和功能。</p>
<h2 id="Use-another-Milvus-deployment" class="common-anchor-header">使用另一个 Milvus 部署<button data-href="#Use-another-Milvus-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>若要使用其他 Milvus Server 端点或<a href="https://zilliz.com/cloud">Zilliz Cloud</a>，请更新<code translate="no">EVEROS_MILVUS__URI</code> 。当端点需要身份验证时，请设置<code translate="no">EVEROS_MILVUS__TOKEN</code> 。数据摄入和搜索代码保持不变。</p>
<h2 id="Conclusion" class="common-anchor-header">结论<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>通过将 EverOS 与 Milvus 结合使用，您可以将对话转化为持久的记忆，并通过关键词和语义信号进行检索。您可以采用相同的模式，为助手和其他代理类应用程序提供针对您自身用户、项目和工作流的长期记忆。</p>
