---
id: integrate_with_memgpt.md
summary: >-
  MemGPT makes it easy to build and deploy stateful LLM agents. With Milvus
  integration, you can build agents with connections to external data sources
  (RAG).
title: MemGPT with Milvus Integration
---
<h1 id="MemGPT-with-Milvus-Integration" class="common-anchor-header">MemGPT with Milvus Integration<button data-href="#MemGPT-with-Milvus-Integration" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://memgpt.readme.io/docs/index">MemGPT</a> makes it easy to build and deploy stateful LLM agents. With Milvus integration, you can build agents with connections to external data sources (RAG).</p>
<p>In this example, we’re going to use MemGPT to chat with a custom data source which is stored in Milvus.</p>
<h2 id="Configuration" class="common-anchor-header">Configuration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>To run MemGPT, you should make sure the Python version &gt;= 3.10.</p>
<p>To enable the Milvus backend, make sure to install the required dependencies with:</p>
<pre><code translate="no" class="language-shell">$ pip install <span class="hljs-string">&#x27;pymemgpt[milvus]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>You can configure Milvus connection via command</p>
<pre><code translate="no" class="language-shell">$ memgpt configure
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">...
? <span class="hljs-title class_">Select</span> storage backend <span class="hljs-keyword">for</span> archival <span class="hljs-attr">data</span>: milvus
? <span class="hljs-title class_">Enter</span> the <span class="hljs-title class_">Milvus</span> connection <span class="hljs-title function_">URI</span> (<span class="hljs-title class_">Default</span>: ~<span class="hljs-regexp">/.memgpt/mi</span>lvus.<span class="hljs-property">db</span>): ~<span class="hljs-regexp">/.memgpt/mi</span>lvus.<span class="hljs-property">db</span>
<button class="copy-code-btn"></button></code></pre>
<p>You just set the URI to the local file path, e.g. <code translate="no">~/.memgpt/milvus.db</code>, which will automatically invoke the local Milvus service instance through Milvus Lite.</p>
<p>If you have large scale of data such as more than a million docs, we recommend setting up a more performant Milvus server on <a href="https://milvus.io/docs/quickstart.md">docker or kubenetes</a>.
And in this case, your URI should be the server URI, e.g. <code translate="no">http://localhost:19530</code>.</p>
<h2 id="Creating-an-external-data-source" class="common-anchor-header">Creating an external data source<button data-href="#Creating-an-external-data-source" class="anchor-icon" translate="no">
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
    </button></h2><p>To feed external data into a MemGPT chatbot, we first need to create a data source.</p>
<p>To download the MemGPT research paper we’ll use <code translate="no">curl</code> (you can also just download the PDF from your browser):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># we&#x27;re saving the file as &quot;memgpt_research_paper.pdf&quot;</span>
$ curl -L -o memgpt_research_paper.pdf https://arxiv.org/pdf/<span class="hljs-number">2310.08560</span>.pdf
<button class="copy-code-btn"></button></code></pre>
<p>Now that we have the paper downloaded, we can create a MemGPT data source using <code translate="no">memgpt load</code>:</p>
<pre><code translate="no" class="language-shell">$ memgpt load directory --name memgpt_research_paper --<span class="hljs-built_in">input</span>-files=memgpt_research_paper.pdf
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text"><span class="hljs-title class_">Loading</span> <span class="hljs-attr">files</span>: <span class="hljs-number">100</span>%|███████████████████████████████████| <span class="hljs-number">1</span>/<span class="hljs-number">1</span> [<span class="hljs-number">00</span>:<span class="hljs-number">00</span>&lt;<span class="hljs-number">00</span>:<span class="hljs-number">00</span>,  <span class="hljs-number">3.</span>94file/s]
<span class="hljs-title class_">Loaded</span> <span class="hljs-number">74</span> passages and <span class="hljs-number">13</span> documents <span class="hljs-keyword">from</span> memgpt_research_paper
<button class="copy-code-btn"></button></code></pre>
<h2 id="Attaching-the-data-source-to-a-MemGPT-agent" class="common-anchor-header">Attaching the data source to a MemGPT agent<button data-href="#Attaching-the-data-source-to-a-MemGPT-agent" class="anchor-icon" translate="no">
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
    </button></h2><p>Now that we’ve created this data source, we can attach it to a MemGPT chatbot at any time.</p>
<p>Let’s create a new chatbot using the <code translate="no">memgpt_doc</code> persona (but you can use any persona you want):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># reminder: `memgpt run --persona memgpt_doc` will create a new MemGPT agent using the `memgpt_doc` persona</span>
$ memgpt run --persona memgpt_doc
<button class="copy-code-btn"></button></code></pre>
<p>Once we’re chatting with the agent, we can “attach” the data source to the agent’s archival memory:</p>
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
<h2 id="Testing-out-our-new-chatbot" class="common-anchor-header">Testing out our new chatbot<button data-href="#Testing-out-our-new-chatbot" class="anchor-icon" translate="no">
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
    </button></h2><p>Now that the data has been loaded into the chatbot’s memory, we can start to ask questions about it:</p>
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
