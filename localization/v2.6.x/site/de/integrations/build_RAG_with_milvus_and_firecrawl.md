---
id: build_RAG_with_milvus_and_firecrawl.md
summary: >-
  In diesem Tutorial zeigen wir Ihnen, wie Sie eine Retrieval-Augmented
  Generation (RAG)-Pipeline mit Milvus und Firecrawl aufbauen. Die Pipeline
  integriert Firecrawl für das Scraping von Webdaten, Milvus für die
  Vektorspeicherung und OpenAI für die Generierung aufschlussreicher,
  kontextbezogener Antworten.
title: Aufbau von RAG mit Milvus und Firecrawl
---
<h1 id="Building-RAG-with-Milvus-and-Firecrawl" class="common-anchor-header">Aufbau von RAG mit Milvus und Firecrawl<button data-href="#Building-RAG-with-Milvus-and-Firecrawl" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_firecrawl.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_firecrawl.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://www.firecrawl.dev/">Firecrawl</a> ermöglicht es Entwicklern, KI-Anwendungen mit sauberen Daten zu erstellen, die von einer beliebigen Website stammen. Mit fortschrittlichen Scraping-, Crawling- und Datenextraktionsfunktionen vereinfacht Firecrawl den Prozess der Umwandlung von Website-Inhalten in saubere Markdown- oder strukturierte Daten für nachgelagerte KI-Workflows.</p>
<p>In diesem Tutorial zeigen wir Ihnen, wie Sie eine Retrieval-Augmented Generation (RAG)-Pipeline mit Milvus und Firecrawl erstellen können. Die Pipeline integriert Firecrawl für das Scraping von Webdaten, Milvus für die Vektorspeicherung und OpenAI für die Generierung aufschlussreicher, kontextbezogener Antworten.</p>
<h2 id="Preparation" class="common-anchor-header">Vorbereitung<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">Abhängigkeiten und Umgebung</h3><p>Um zu beginnen, installieren Sie die erforderlichen Abhängigkeiten, indem Sie den folgenden Befehl ausführen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install firecrawl-py pymilvus openai requests tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong>, um die soeben installierten Abhängigkeiten zu aktivieren (klicken Sie auf das Menü "Runtime" am oberen Rand des Bildschirms und wählen Sie "Sitzung neu starten" aus dem Dropdown-Menü).</p>
</div>
<h3 id="Setting-Up-API-Keys" class="common-anchor-header">API-Schlüssel einrichten</h3><p>Um Firecrawl zum Scrapen von Daten von der angegebenen URL zu verwenden, müssen Sie einen <a href="https://www.firecrawl.dev/">FIRECRAWL_API_KEY</a> erhalten und ihn als Umgebungsvariable festlegen. Außerdem werden wir in diesem Beispiel OpenAI als LLM verwenden. Sie sollten den <a href="https://platform.openai.com/docs/quickstart">OPENAI_API_KEY</a> ebenfalls als Umgebungsvariable vorbereiten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;FIRECRAWL_API_KEY&quot;</span>] = <span class="hljs-string">&quot;fc-***********&quot;</span>
os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-LLM-and-Embedding-Model" class="common-anchor-header">Vorbereiten des LLM und des Einbettungsmodells</h3><p>Wir initialisieren den OpenAI-Client, um das Einbettungsmodell vorzubereiten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

openai_client = OpenAI()
<button class="copy-code-btn"></button></code></pre>
<p>Definieren Sie eine Funktion zur Erzeugung von Texteinbettungen mit dem OpenAI-Client. Wir verwenden das Modell <a href="https://platform.openai.com/docs/guides/embeddings">text-embedding-3-small</a> als Beispiel.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_text</span>(<span class="hljs-params">text</span>):
    <span class="hljs-keyword">return</span> (
        openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)
        .data[<span class="hljs-number">0</span>]
        .embedding
    )
<button class="copy-code-btn"></button></code></pre>
<p>Erzeugen Sie eine Testeinbettung und geben Sie deren Dimension und die ersten Elemente aus.</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1536
[0.009889289736747742, -0.005578675772994757, 0.00683477520942688, -0.03805781528353691, -0.01824733428657055, -0.04121600463986397, -0.007636285852640867, 0.03225184231996536, 0.018949154764413834, 9.352207416668534e-05]
</code></pre>
<h2 id="Scrape-Data-Using-Firecrawl" class="common-anchor-header">Scrapen von Daten mit Firecrawl<button data-href="#Scrape-Data-Using-Firecrawl" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Initialize-the-Firecrawl-Application" class="common-anchor-header">Initialisieren der Firecrawl-Anwendung</h3><p>Wir werden die Bibliothek <code translate="no">firecrawl</code> verwenden, um Daten von der angegebenen URL im Markdown-Format zu scrapen. Beginnen Sie mit der Initialisierung der Firecrawl-Anwendung:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> firecrawl <span class="hljs-keyword">import</span> FirecrawlApp

app = FirecrawlApp(api_key=os.environ[<span class="hljs-string">&quot;FIRECRAWL_API_KEY&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Scrape-the-Target-Website" class="common-anchor-header">Scrapen der Ziel-Website</h3><p>Scrapen Sie den Inhalt von der Ziel-URL. Die Website <a href="https://lilianweng.github.io/posts/2023-06-23-agent/">LLM-powered Autonomous Agents (LLM-gestützte autonome Agenten</a> ) bietet eine eingehende Untersuchung von autonomen Agentensystemen, die mit großen Sprachmodellen (LLMs) gebaut wurden. Wir werden diese Inhalte verwenden, um ein RAG-System aufzubauen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Scrape a website:</span>
scrape_status = app.scrape_url(
    <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-06-23-agent/&quot;</span>,
    params={<span class="hljs-string">&quot;formats&quot;</span>: [<span class="hljs-string">&quot;markdown&quot;</span>]},
)

markdown_content = scrape_status[<span class="hljs-string">&quot;markdown&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Process-the-Scraped-Content" class="common-anchor-header">Verarbeiten der gescrapten Inhalte</h3><p>Um den gescrapten Inhalt für das Einfügen in Milvus handhabbar zu machen, verwenden wir einfach "# ", um den Inhalt zu trennen, wodurch der Inhalt jedes Hauptteils der gescrapten Markdown-Datei grob getrennt werden kann.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">split_markdown_content</span>(<span class="hljs-params">content</span>):
    <span class="hljs-keyword">return</span> [section.strip() <span class="hljs-keyword">for</span> section <span class="hljs-keyword">in</span> content.split(<span class="hljs-string">&quot;# &quot;</span>) <span class="hljs-keyword">if</span> section.strip()]


<span class="hljs-comment"># Process the scraped markdown content</span>
sections = split_markdown_content(markdown_content)

<span class="hljs-comment"># Print the first few sections to understand the structure</span>
<span class="hljs-keyword">for</span> i, section <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(sections[:<span class="hljs-number">3</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Section <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(section[:<span class="hljs-number">300</span>] + <span class="hljs-string">&quot;...&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-&quot;</span> * <span class="hljs-number">50</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Section 1:
Table of Contents

- [Agent System Overview](#agent-system-overview)
- [Component One: Planning](#component-one-planning)  - [Task Decomposition](#task-decomposition)
  - [Self-Reflection](#self-reflection)
- [Component Two: Memory](#component-two-memory)  - [Types of Memory](#types-of-memory)
  - [...
--------------------------------------------------
Section 2:
Agent System Overview [\#](\#agent-system-overview)

In a LLM-powered autonomous agent system, LLM functions as the agent’s brain, complemented by several key components:

- **Planning**
  - Subgoal and decomposition: The agent breaks down large tasks into smaller, manageable subgoals, enabling effi...
--------------------------------------------------
Section 3:
Component One: Planning [\#](\#component-one-planning)

A complicated task usually involves many steps. An agent needs to know what they are and plan ahead.

#...
--------------------------------------------------
</code></pre>
<h2 id="Load-Data-into-Milvus" class="common-anchor-header">Daten in Milvus laden<button data-href="#Load-Data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-collection" class="common-anchor-header">Erstellen Sie die Sammlung</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Was das Argument von <code translate="no">MilvusClient</code> betrifft:</p>
<ul>
<li><p>Die Einstellung von <code translate="no">uri</code> als lokale Datei, z.B.<code translate="no">./milvus.db</code>, ist die bequemste Methode, da sie automatisch <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> nutzt, um alle Daten in dieser Datei zu speichern.</p></li>
<li><p>Wenn Sie große Datenmengen haben, können Sie einen leistungsfähigeren Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> einrichten. Bei dieser Einrichtung verwenden Sie bitte die Server-Uri, z. B.<code translate="no">http://localhost:19530</code>, als <code translate="no">uri</code>.</p></li>
<li><p>Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, den vollständig verwalteten Cloud-Service für Milvus, verwenden möchten, passen Sie <code translate="no">uri</code> und <code translate="no">token</code> an, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und dem Api-Schlüssel</a> in Zilliz Cloud entsprechen.</p></li>
</ul>
</div>
<p>Prüfen Sie, ob die Sammlung bereits existiert und löschen Sie sie, wenn dies der Fall ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen Sie eine neue Sammlung mit den angegebenen Parametern.</p>
<p>Wenn wir keine Feldinformationen angeben, erstellt Milvus automatisch ein Standardfeld <code translate="no">id</code> für den Primärschlüssel und ein Feld <code translate="no">vector</code> zum Speichern der Vektordaten. Ein reserviertes JSON-Feld wird verwendet, um nicht schema-definierte Felder und ihre Werte zu speichern.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Daten einfügen</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

<span class="hljs-keyword">for</span> i, section <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(sections, desc=<span class="hljs-string">&quot;Processing sections&quot;</span>)):
    embedding = emb_text(section)
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: section})

<span class="hljs-comment"># Insert data into Milvus</span>
milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Processing sections: 100%|██████████| 17/17 [00:08&lt;00:00,  2.09it/s]





{'insert_count': 17, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 'cost': 0}
</code></pre>
<h2 id="Build-RAG" class="common-anchor-header">RAG erstellen<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Retrieve-data-for-a-query" class="common-anchor-header">Abrufen von Daten für eine Abfrage</h3><p>Geben wir eine Abfragefrage über die Website an, die wir gerade ausgewertet haben.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What are the main components of autonomous agents?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Suchen Sie nach der Frage in der Sammlung und rufen Sie die semantischen Top-3-Treffer ab.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[emb_text(question)],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Werfen wir einen Blick auf die Suchergebnisse der Abfrage</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot;Agent System Overview [\\#](\\#agent-system-overview)\n\nIn a LLM-powered autonomous agent system, LLM functions as the agent\u2019s brain, complemented by several key components:\n\n- **Planning**\n  - Subgoal and decomposition: The agent breaks down large tasks into smaller, manageable subgoals, enabling efficient handling of complex tasks.\n  - Reflection and refinement: The agent can do self-criticism and self-reflection over past actions, learn from mistakes and refine them for future steps, thereby improving the quality of final results.\n- **Memory**\n  - Short-term memory: I would consider all the in-context learning (See [Prompt Engineering](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)) as utilizing short-term memory of the model to learn.\n  - Long-term memory: This provides the agent with the capability to retain and recall (infinite) information over extended periods, often by leveraging an external vector store and fast retrieval.\n- **Tool use**\n  - The agent learns to call external APIs for extra information that is missing from the model weights (often hard to change after pre-training), including current information, code execution capability, access to proprietary information sources and more.\n\n![](agent-overview.png)Fig. 1. Overview of a LLM-powered autonomous agent system.&quot;,
        0.6343474388122559
    ],
    [
        &quot;Table of Contents\n\n- [Agent System Overview](#agent-system-overview)\n- [Component One: Planning](#component-one-planning)  - [Task Decomposition](#task-decomposition)\n  - [Self-Reflection](#self-reflection)\n- [Component Two: Memory](#component-two-memory)  - [Types of Memory](#types-of-memory)\n  - [Maximum Inner Product Search (MIPS)](#maximum-inner-product-search-mips)\n- [Component Three: Tool Use](#component-three-tool-use)\n- [Case Studies](#case-studies)  - [Scientific Discovery Agent](#scientific-discovery-agent)\n  - [Generative Agents Simulation](#generative-agents-simulation)\n  - [Proof-of-Concept Examples](#proof-of-concept-examples)\n- [Challenges](#challenges)\n- [Citation](#citation)\n- [References](#references)\n\nBuilding agents with LLM (large language model) as its core controller is a cool concept. Several proof-of-concepts demos, such as [AutoGPT](https://github.com/Significant-Gravitas/Auto-GPT), [GPT-Engineer](https://github.com/AntonOsika/gpt-engineer) and [BabyAGI](https://github.com/yoheinakajima/babyagi), serve as inspiring examples. The potentiality of LLM extends beyond generating well-written copies, stories, essays and programs; it can be framed as a powerful general problem solver.&quot;,
        0.5715497732162476
    ],
    [
        &quot;Challenges [\\#](\\#challenges)\n\nAfter going through key ideas and demos of building LLM-centered agents, I start to see a couple common limitations:\n\n- **Finite context length**: The restricted context capacity limits the inclusion of historical information, detailed instructions, API call context, and responses. The design of the system has to work with this limited communication bandwidth, while mechanisms like self-reflection to learn from past mistakes would benefit a lot from long or infinite context windows. Although vector stores and retrieval can provide access to a larger knowledge pool, their representation power is not as powerful as full attention.\n\n- **Challenges in long-term planning and task decomposition**: Planning over a lengthy history and effectively exploring the solution space remain challenging. LLMs struggle to adjust plans when faced with unexpected errors, making them less robust compared to humans who learn from trial and error.\n\n- **Reliability of natural language interface**: Current agent system relies on natural language as an interface between LLMs and external components such as memory and tools. However, the reliability of model outputs is questionable, as LLMs may make formatting errors and occasionally exhibit rebellious behavior (e.g. refuse to follow an instruction). Consequently, much of the agent demo code focuses on parsing model output.&quot;,
        0.5009307265281677
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">LLM verwenden, um eine RAG-Antwort zu erhalten</h3><p>Konvertieren Sie die abgerufenen Dokumente in ein String-Format.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<p>Definieren Sie System- und Benutzer-Prompts für das Lanage Model. Diese Eingabeaufforderung wird mit den abgerufenen Dokumenten von Milvus zusammengestellt.</p>
<pre><code translate="no" class="language-python">SYSTEM_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;</span>
USER_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
<span class="hljs-subst">{context}</span>
&lt;/context&gt;
&lt;question&gt;
<span class="hljs-subst">{question}</span>
&lt;/question&gt;
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Verwenden Sie OpenAI ChatGPT, um eine Antwort basierend auf den Prompts zu generieren.</p>
<pre><code translate="no" class="language-python">response = openai_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The main components of a LLM-powered autonomous agent system are the Planning, Memory, and Tool use. 

1. Planning: The agent breaks down large tasks into smaller, manageable subgoals, and can self-reflect and learn from past mistakes, refining its actions for future steps.

2. Memory: This includes short-term memory, which the model uses for in-context learning, and long-term memory, which allows the agent to retain and recall information over extended periods. 

3. Tool use: This component allows the agent to call external APIs for additional information that is not available in the model weights, like current information, code execution capacity, and access to proprietary information sources.
</code></pre>
