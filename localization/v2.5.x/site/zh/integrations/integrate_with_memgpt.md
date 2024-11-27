---
id: integrate_with_memgpt.md
summary: MemGPT 可轻松构建和部署有状态 LLM 代理。通过 Milvus 集成，您可以构建与外部数据源（RAG）连接的 Agents。
title: 与 Milvus 集成的 MemGPT
---
<h1 id="MemGPT-with-Milvus-Integration" class="common-anchor-header">与 Milvus 集成的 MemGPT<button data-href="#MemGPT-with-Milvus-Integration" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://memgpt.readme.io/docs/index">MemGPT</a>可轻松构建和部署有状态 LLM 代理。通过 Milvus 集成，您可以构建与外部数据源（RAG）连接的 Agents。</p>
<p>在本例中，我们将使用 MemGPT 与存储在 Milvus 中的自定义数据源聊天。</p>
<h2 id="Configuration" class="common-anchor-header">配置<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>要运行 MemGPT，应确保 Python 版本大于等于 3.10。</p>
<p>要启用 Milvus 后端，请确保安装了所需的依赖项：</p>
<pre><code translate="no" class="language-shell">$ pip install <span class="hljs-string">&#x27;pymemgpt[milvus]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>你可以通过命令配置 Milvus 连接。</p>
<pre><code translate="no" class="language-shell">$ memgpt configure
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">...
? <span class="hljs-title class_">Select</span> storage backend <span class="hljs-keyword">for</span> archival <span class="hljs-attr">data</span>: milvus
? <span class="hljs-title class_">Enter</span> the <span class="hljs-title class_">Milvus</span> connection <span class="hljs-title function_">URI</span> (<span class="hljs-title class_">Default</span>: ~<span class="hljs-regexp">/.memgpt/mi</span>lvus.<span class="hljs-property">db</span>): ~<span class="hljs-regexp">/.memgpt/mi</span>lvus.<span class="hljs-property">db</span>
<button class="copy-code-btn"></button></code></pre>
<p>只需将 URI 设置为本地文件路径，例如<code translate="no">~/.memgpt/milvus.db</code> ，就会通过 Milvus Lite 自动调用本地 Milvus 服务实例。</p>
<p>如果你有大规模数据，比如超过一百万个文档，我们建议在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubenetes</a> 上设置性能更强的 Milvus 服务器。 在这种情况下，你的 URI 应该是服务器 URI，比如<code translate="no">http://localhost:19530</code> 。</p>
<h2 id="Creating-an-external-data-source" class="common-anchor-header">创建外部数据源<button data-href="#Creating-an-external-data-source" class="anchor-icon" translate="no">
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
    </button></h2><p>要将外部数据输入 MemGPT 聊天机器人，我们首先需要创建一个数据源。</p>
<p>我们将使用<code translate="no">curl</code> 下载 MemGPT 研究论文（也可以直接从浏览器下载 PDF）：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># we&#x27;re saving the file as &quot;memgpt_research_paper.pdf&quot;</span>
$ curl -L -o memgpt_research_paper.pdf https://arxiv.org/pdf/<span class="hljs-number">2310.08560</span>.pdf
<button class="copy-code-btn"></button></code></pre>
<p>下载论文后，我们可以使用<code translate="no">memgpt load</code> 创建 MemGPT 数据源：</p>
<pre><code translate="no" class="language-shell">$ memgpt load directory --name memgpt_research_paper --<span class="hljs-built_in">input</span>-files=memgpt_research_paper.pdf
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text"><span class="hljs-title class_">Loading</span> <span class="hljs-attr">files</span>: <span class="hljs-number">100</span>%|███████████████████████████████████| <span class="hljs-number">1</span>/<span class="hljs-number">1</span> [<span class="hljs-number">00</span>:<span class="hljs-number">00</span>&lt;<span class="hljs-number">00</span>:<span class="hljs-number">00</span>,  <span class="hljs-number">3.</span>94file/s]
<span class="hljs-title class_">Loaded</span> <span class="hljs-number">74</span> passages and <span class="hljs-number">13</span> documents <span class="hljs-keyword">from</span> memgpt_research_paper
<button class="copy-code-btn"></button></code></pre>
<h2 id="Attaching-the-data-source-to-a-MemGPT-agent" class="common-anchor-header">将数据源连接到 MemGPT Agents<button data-href="#Attaching-the-data-source-to-a-MemGPT-agent" class="anchor-icon" translate="no">
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
    </button></h2><p>现在我们已经创建了数据源，可以随时将其附加到 MemGPT 聊天机器人上。</p>
<p>让我们使用<code translate="no">memgpt_doc</code> 角色（也可以使用任何角色）创建一个新的聊天机器人：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># reminder: `memgpt run --persona memgpt_doc` will create a new MemGPT agent using the `memgpt_doc` persona</span>
$ memgpt run --persona memgpt_doc
<button class="copy-code-btn"></button></code></pre>
<p>与 Agents 聊天后，我们就可以将数据源 "附加 "到代理的存档内存中：</p>
<pre><code translate="no" class="language-text">? Would you like to <span class="hljs-keyword">select</span> an existing agent? No

🧬 Creating <span class="hljs-keyword">new</span> agent...
-&gt;  🤖 Using persona profile: <span class="hljs-string">&#x27;sam_pov&#x27;</span>
-&gt;  🧑 Using human profile: <span class="hljs-string">&#x27;basic&#x27;</span>
🎉 Created <span class="hljs-keyword">new</span> agent <span class="hljs-string">&#x27;PoliteButterfly&#x27;</span> (id=d26e1981-ff36<span class="hljs-number">-4095</span><span class="hljs-number">-97</span>a0<span class="hljs-number">-61</span>a1601dfb5d)

<span class="hljs-function">Hit enter to <span class="hljs-title">begin</span> (<span class="hljs-params">will request first MemGPT message</span>)

💭 Interesting, I&#x27;ve got a first-time user. Time to present myself <span class="hljs-keyword">and</span> <span class="hljs-keyword">get</span> to understand the user&#x27;s needs. I wonder what brings Chad here today.
🤖 Greetings Chad! I&#x27;m MemGPT. How may I assist you today?

&gt; Enter your message: /attach
? Select data source memgpt_research_paper
100%|███████████████████████████████████| 1/1 [00:00&lt;00:00,  4.81it/s]
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Testing-out-our-new-chatbot" class="common-anchor-header">测试我们的新聊天机器人<button data-href="#Testing-out-our-new-chatbot" class="anchor-icon" translate="no">
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
    </button></h2><p>既然数据已经加载到聊天机器人的内存中，我们就可以开始提问了：</p>
<pre><code translate="no" class="language-text">&gt; Enter your message: The paper I loaded into your archival memory is called MemGPT. Can you tell me more about it?

💭 It seems Chad would like to know more about the paper titled <span class="hljs-string">&#x27;MemGPT&#x27;</span> that<span class="hljs-string">&#x27;s stored in my archival memory. It&#x27;</span>s time to search the archival memory <span class="hljs-keyword">for</span> details and background data to provide a comprehensive
understanding of the paper. Let<span class="hljs-string">&#x27;s remember to page through results until I&#x27;</span>ve gathered enough information to answer Chad<span class="hljs-string">&#x27;s enquiry.
⚡🧠 [function] searching memory with archival_memory_search
💭 Based on the found results, MemGPT is an AI system designed for tasks like extended conversations and document analysis. It efficiently manages different tiers of storage to provide extended context within
the LLM’s limited cap. Also, noteworthy from my findings is that MemGPT performs impressively in deep memory retrieval (DMR) and document QA tasks. Let&#x27;</span>s prepare a comprehensive response <span class="hljs-keyword">for</span> Chad.
🤖 Certainly, Chad. MemGPT, or MemoryGPT, is a system specially designed <span class="hljs-keyword">for</span> tasks like extended conversations and document analysis <span class="hljs-built_in">which</span> are traditionally hindered by the limited context windows of modern 
Large Language Models (LLMs). It uses a technique inspired by hierarchical memory systems <span class="hljs-keyword">in</span> traditional operating systems, called virtual context management. This technique allows <span class="hljs-keyword">for</span> an effective provision 
of extended context within an LLM’s limited context window by intelligently managing different storage tiers, much like paging between physical memory and disk. Notably, MemGPT outperforms the fixed-context 
baselines <span class="hljs-keyword">in</span> deep memory retrieval and it<span class="hljs-string">&#x27;s able to analyze large documents with precision.

</span><button class="copy-code-btn"></button></code></pre>
