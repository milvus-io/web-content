---
id: integrate_with_memgpt.md
summary: >-
  MemGPT macht es einfach, zustandsbehaftete LLM-Agenten zu erstellen und
  einzusetzen. Mit der Milvus-Integration können Sie Agenten mit Verbindungen zu
  externen Datenquellen (RAG) erstellen.
title: MemGPT mit Milvus-Integration
---
<h1 id="MemGPT-with-Milvus-Integration" class="common-anchor-header">MemGPT mit Milvus-Integration<button data-href="#MemGPT-with-Milvus-Integration" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://memgpt.readme.io/docs/index">MemGPT</a> macht es einfach, zustandsbehaftete LLM-Agenten zu erstellen und einzusetzen. Mit der Milvus-Integration können Sie Agenten mit Verbindungen zu externen Datenquellen (RAG) erstellen.</p>
<p>In diesem Beispiel werden wir MemGPT verwenden, um mit einer benutzerdefinierten Datenquelle zu chatten, die in Milvus gespeichert ist.</p>
<h2 id="Configuration" class="common-anchor-header">Konfiguration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Um MemGPT auszuführen, sollten Sie sicherstellen, dass die Python-Version &gt;= 3.10 ist.</p>
<p>Um das Milvus-Backend zu aktivieren, stellen Sie sicher, dass Sie die erforderlichen Abhängigkeiten mit installieren:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install <span class="hljs-string">&#x27;pymemgpt[milvus]&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie können die Milvus-Verbindung über den Befehl</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">memgpt configure</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">...
? Select storage backend for archival data: milvus
? Enter the Milvus connection URI (Default: ~/.memgpt/milvus.db): ~/.memgpt/milvus.db
<button class="copy-code-btn"></button></code></pre>
<p>Sie setzen einfach die URI auf den lokalen Dateipfad, z. B. <code translate="no">~/.memgpt/milvus.db</code>, wodurch automatisch die lokale Milvus-Dienstinstanz durch Milvus Lite aufgerufen wird.</p>
<p>Wenn Sie große Datenmengen haben, z. B. mehr als eine Million Dokumente, empfehlen wir, einen leistungsfähigeren Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubenetes</a> einzurichten. In diesem Fall sollte Ihre URI die Server-URI sein, z. B. <code translate="no">http://localhost:19530</code>.</p>
<h2 id="Creating-an-external-data-source" class="common-anchor-header">Erstellen einer externen Datenquelle<button data-href="#Creating-an-external-data-source" class="anchor-icon" translate="no">
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
    </button></h2><p>Um externe Daten in einen MemGPT-Chatbot einzuspeisen, müssen wir zunächst eine Datenquelle erstellen.</p>
<p>Um das MemGPT-Forschungspapier herunterzuladen, verwenden wir <code translate="no">curl</code> (Sie können auch einfach die PDF-Datei über Ihren Browser herunterladen):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">we<span class="hljs-string">&#x27;re saving the file as &quot;memgpt_research_paper.pdf&quot;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-string">curl -L -o memgpt_research_paper.pdf https://arxiv.org/pdf/2310.08560.pdf</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>Nun, da wir das Papier heruntergeladen haben, können wir eine MemGPT-Datenquelle mit <code translate="no">memgpt load</code> erstellen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">memgpt load directory --name memgpt_research_paper --input-files=memgpt_research_paper.pdf</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">Loading files: 100%|███████████████████████████████████| 1/1 [00:00&lt;00:00,  3.94file/s]
Loaded 74 passages and 13 documents from memgpt_research_paper
<button class="copy-code-btn"></button></code></pre>
<h2 id="Attaching-the-data-source-to-a-MemGPT-agent" class="common-anchor-header">Anhängen der Datenquelle an einen MemGPT-Agenten<button data-href="#Attaching-the-data-source-to-a-MemGPT-agent" class="anchor-icon" translate="no">
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
    </button></h2><p>Nun, da wir diese Datenquelle erstellt haben, können wir sie jederzeit mit einem MemGPT-Chatbot verbinden.</p>
<p>Lassen Sie uns einen neuen Chatbot mit der Persona <code translate="no">memgpt_doc</code> erstellen (Sie können aber jede beliebige Persona verwenden):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">reminder: `memgpt run --persona memgpt_doc` will create a new MemGPT agent using the `memgpt_doc` persona</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">memgpt run --persona memgpt_doc</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sobald wir mit dem Agenten chatten, können wir die Datenquelle an den Archivierungsspeicher des Agenten "anhängen":</p>
<pre><code translate="no" class="language-text">? Would you like to select an existing agent? No

🧬 Creating new agent...
-&gt;  🤖 Using persona profile: &#x27;sam_pov&#x27;
-&gt;  🧑 Using human profile: &#x27;basic&#x27;
🎉 Created new agent &#x27;PoliteButterfly&#x27; (id=d26e1981-ff36-4095-97a0-61a1601dfb5d)

Hit enter to begin (will request first MemGPT message)

💭 Interesting, I&#x27;ve got a first-time user. Time to present myself and get to understand the user&#x27;s needs. I wonder what brings Chad here today.
🤖 Greetings Chad! I&#x27;m MemGPT. How may I assist you today?

&gt; Enter your message: /attach
? Select data source memgpt_research_paper
100%|███████████████████████████████████| 1/1 [00:00&lt;00:00,  4.81it/s]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Testing-out-our-new-chatbot" class="common-anchor-header">Testen unseres neuen Chatbots<button data-href="#Testing-out-our-new-chatbot" class="anchor-icon" translate="no">
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
    </button></h2><p>Nun, da die Daten in den Speicher des Chatbots geladen wurden, können wir anfangen, Fragen dazu zu stellen:</p>
<pre><code translate="no" class="language-text">&gt; Enter your message: The paper I loaded into your archival memory is called MemGPT. Can you tell me more about it?

💭 It seems Chad would like to know more about the paper titled &#x27;MemGPT&#x27; that&#x27;s stored in my archival memory. It&#x27;s time to search the archival memory for details and background data to provide a comprehensive
understanding of the paper. Let&#x27;s remember to page through results until I&#x27;ve gathered enough information to answer Chad&#x27;s enquiry.
⚡🧠 [function] searching memory with archival_memory_search
💭 Based on the found results, MemGPT is an AI system designed for tasks like extended conversations and document analysis. It efficiently manages different tiers of storage to provide extended context within
the LLM’s limited cap. Also, noteworthy from my findings is that MemGPT performs impressively in deep memory retrieval (DMR) and document QA tasks. Let&#x27;s prepare a comprehensive response for Chad.
🤖 Certainly, Chad. MemGPT, or MemoryGPT, is a system specially designed for tasks like extended conversations and document analysis which are traditionally hindered by the limited context windows of modern 
Large Language Models (LLMs). It uses a technique inspired by hierarchical memory systems in traditional operating systems, called virtual context management. This technique allows for an effective provision 
of extended context within an LLM’s limited context window by intelligently managing different storage tiers, much like paging between physical memory and disk. Notably, MemGPT outperforms the fixed-context 
baselines in deep memory retrieval and it&#x27;s able to analyze large documents with precision.

<button class="copy-code-btn"></button></code></pre>
