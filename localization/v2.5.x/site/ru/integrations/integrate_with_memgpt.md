---
id: integrate_with_memgpt.md
summary: >-
  MemGPT упрощает создание и развертывание агентов LLM с поддержкой состояния.
  Благодаря интеграции с Milvus вы можете создавать агенты с подключением к
  внешним источникам данных (RAG).
title: MemGPT с интеграцией Milvus
---
<h1 id="MemGPT-with-Milvus-Integration" class="common-anchor-header">MemGPT с интеграцией Milvus<button data-href="#MemGPT-with-Milvus-Integration" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://memgpt.readme.io/docs/index">MemGPT</a> упрощает создание и развертывание агентов LLM с поддержкой состояния. Благодаря интеграции с Milvus вы можете создавать агентов с подключением к внешним источникам данных (RAG).</p>
<p>В этом примере мы будем использовать MemGPT для общения с пользовательским источником данных, который хранится в Milvus.</p>
<h2 id="Configuration" class="common-anchor-header">Конфигурация<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы запустить MemGPT, необходимо убедиться, что версия Python &gt;= 3.10.</p>
<p>Чтобы включить бэкенд Milvus, убедитесь, что установили необходимые зависимости:</p>
<pre><code translate="no" class="language-shell">$ pip install <span class="hljs-string">&#x27;pymemgpt[milvus]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Вы можете настроить подключение Milvus с помощью команды</p>
<pre><code translate="no" class="language-shell">$ memgpt configure
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">...
? <span class="hljs-title class_">Select</span> storage backend <span class="hljs-keyword">for</span> archival <span class="hljs-attr">data</span>: milvus
? <span class="hljs-title class_">Enter</span> the <span class="hljs-title class_">Milvus</span> connection <span class="hljs-title function_">URI</span> (<span class="hljs-title class_">Default</span>: ~<span class="hljs-regexp">/.memgpt/mi</span>lvus.<span class="hljs-property">db</span>): ~<span class="hljs-regexp">/.memgpt/mi</span>lvus.<span class="hljs-property">db</span>
<button class="copy-code-btn"></button></code></pre>
<p>Достаточно указать URI на путь к локальному файлу, например, <code translate="no">~/.memgpt/milvus.db</code>, что автоматически вызовет локальный экземпляр сервиса Milvus через Milvus Lite.</p>
<p>Если у вас большой объем данных, например, более миллиона документов, мы рекомендуем установить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">docker или kubenetes</a>. В этом случае URI должен быть URI сервера, например, <code translate="no">http://localhost:19530</code>.</p>
<h2 id="Creating-an-external-data-source" class="common-anchor-header">Создание внешнего источника данных<button data-href="#Creating-an-external-data-source" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы передать внешние данные в чатбот MemGPT, нам сначала нужно создать источник данных.</p>
<p>Для загрузки исследовательской работы MemGPT мы используем <code translate="no">curl</code> (вы также можете просто загрузить PDF-файл из браузера):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># we&#x27;re saving the file as &quot;memgpt_research_paper.pdf&quot;</span>
$ curl -L -o memgpt_research_paper.pdf https://arxiv.org/pdf/<span class="hljs-number">2310.08560</span>.pdf
<button class="copy-code-btn"></button></code></pre>
<p>Теперь, когда статья загружена, мы можем создать источник данных MemGPT с помощью <code translate="no">memgpt load</code>:</p>
<pre><code translate="no" class="language-shell">$ memgpt load directory --name memgpt_research_paper --<span class="hljs-built_in">input</span>-files=memgpt_research_paper.pdf
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text"><span class="hljs-title class_">Loading</span> <span class="hljs-attr">files</span>: <span class="hljs-number">100</span>%|███████████████████████████████████| <span class="hljs-number">1</span>/<span class="hljs-number">1</span> [<span class="hljs-number">00</span>:<span class="hljs-number">00</span>&lt;<span class="hljs-number">00</span>:<span class="hljs-number">00</span>,  <span class="hljs-number">3.</span>94file/s]
<span class="hljs-title class_">Loaded</span> <span class="hljs-number">74</span> passages and <span class="hljs-number">13</span> documents <span class="hljs-keyword">from</span> memgpt_research_paper
<button class="copy-code-btn"></button></code></pre>
<h2 id="Attaching-the-data-source-to-a-MemGPT-agent" class="common-anchor-header">Прикрепление источника данных к агенту MemGPT<button data-href="#Attaching-the-data-source-to-a-MemGPT-agent" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь, когда мы создали этот источник данных, мы можем в любой момент прикрепить его к чатботу MemGPT.</p>
<p>Давайте создадим новый чатбот, используя персону <code translate="no">memgpt_doc</code> (но вы можете использовать любую персону):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># reminder: `memgpt run --persona memgpt_doc` will create a new MemGPT agent using the `memgpt_doc` persona</span>
$ memgpt run --persona memgpt_doc
<button class="copy-code-btn"></button></code></pre>
<p>Как только мы начнем общаться с агентом, мы сможем "прикрепить" источник данных к архивной памяти агента:</p>
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
<h2 id="Testing-out-our-new-chatbot" class="common-anchor-header">Тестирование нашего нового чатбота<button data-href="#Testing-out-our-new-chatbot" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь, когда данные загружены в память чатбота, мы можем начать задавать вопросы о них:</p>
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