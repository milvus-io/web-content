---
id: build_RAG_with_milvus_and_docling.md
summary: >-
  In diesem Tutorial zeigen wir Ihnen, wie Sie eine Retrieval-Augmented
  Generation (RAG)-Pipeline mit Milvus und Docling aufbauen können. Die Pipeline
  integriert Docling für das Parsen von Dokumenten, Milvus für die
  Vektorspeicherung und OpenAI für die Erzeugung aufschlussreicher,
  kontextbezogener Antworten.
title: RAG mit Milvus und Docling aufbauen
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_docling.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_docling.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Build-RAG-with-Milvus-and-Docling" class="common-anchor-header">RAG mit Milvus und Docling aufbauen<button data-href="#Build-RAG-with-Milvus-and-Docling" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/docling-project/docling">Docling</a> rationalisiert das Parsen und Verstehen von Dokumenten in verschiedenen Formaten für KI-Anwendungen. Mit fortschrittlichem PDF-Verständnis und einheitlicher Dokumentendarstellung macht Docling unstrukturierte Dokumentendaten für nachgelagerte Workflows bereit.</p>
<p>In diesem Tutorial zeigen wir Ihnen, wie Sie eine Retrieval-Augmented Generation (RAG)-Pipeline mit Milvus und Docling aufbauen. Die Pipeline integriert Docling für das Parsen von Dokumenten, Milvus für die Vektorspeicherung und OpenAI für die Generierung aufschlussreicher, kontextbezogener Antworten.</p>
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
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus docling openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong>, um die soeben installierten Abhängigkeiten zu aktivieren (klicken Sie auf das Menü "Runtime" am oberen Rand des Bildschirms und wählen Sie "Sitzung neu starten" aus dem Dropdown-Menü).</p>
</div>
<h3 id="Setting-Up-API-Keys" class="common-anchor-header">Einrichten von API-Schlüsseln</h3><p>Wir werden in diesem Beispiel OpenAI als LLM verwenden. Sie sollten den <a href="https://platform.openai.com/docs/quickstart">OPENAI_API_KEY</a> als Umgebungsvariable vorbereiten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

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
<p>Erzeugen Sie eine Testeinbettung und geben Sie ihre Dimension und die ersten Elemente aus.</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1536
[0.00988506618887186, -0.005540902726352215, 0.0068014683201909065, -0.03810417652130127, -0.018254263326525688, -0.041231658309698105, -0.007651153020560741, 0.03220026567578316, 0.01892443746328354, 0.00010708322952268645]
</code></pre>
<h2 id="Process-Data-Using-Docling" class="common-anchor-header">Daten mit Docling verarbeiten<button data-href="#Process-Data-Using-Docling" class="anchor-icon" translate="no">
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
    </button></h2><p>Docling kann verschiedene Dokumentenformate in eine einheitliche Repräsentation (Docling-Dokument) parsen, die dann in verschiedene Ausgabeformate exportiert werden kann. Eine vollständige Liste der unterstützten Eingabe- und Ausgabeformate finden Sie in <a href="https://docling-project.github.io/docling/usage/supported_formats/">der offiziellen Dokumentation</a>.</p>
<p>In diesem Tutorial werden wir eine Markdown-Datei<a href="https://milvus.io/docs/overview.md">(Quelle</a>) als Eingabe verwenden. Wir werden das Dokument mit einem von Docling bereitgestellten <strong>HierarchicalChunker</strong> verarbeiten, um strukturierte, hierarchische Chunks zu erzeugen, die für nachgelagerte RAG-Aufgaben geeignet sind.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> docling.document_converter <span class="hljs-keyword">import</span> DocumentConverter
<span class="hljs-keyword">from</span> docling_core.transforms.chunker <span class="hljs-keyword">import</span> HierarchicalChunker

converter = DocumentConverter()
chunker = HierarchicalChunker()

<span class="hljs-comment"># Convert the input file to Docling Document</span>
source = <span class="hljs-string">&quot;https://milvus.io/docs/overview.md&quot;</span>
doc = converter.convert(source).document

<span class="hljs-comment"># Perform hierarchical chunking</span>
texts = [chunk.text <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> chunker.chunk(doc)]

<span class="hljs-keyword">for</span> i, text <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(texts[:<span class="hljs-number">5</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Chunk <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:\n<span class="hljs-subst">{text}</span>\n<span class="hljs-subst">{<span class="hljs-string">&#x27;-&#x27;</span>*<span class="hljs-number">50</span>}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Chunk 1:
Milvus is a high-performance, highly scalable vector database that runs efficiently across a wide range of environments, from a laptop to large-scale distributed systems. It is available as both open-source software and a cloud service.
--------------------------------------------------
Chunk 2:
Milvus is an open-source project under LF AI &amp; Data Foundation distributed under the Apache 2.0 license. Most contributors are experts from the high-performance computing (HPC) community, specializing in building large-scale systems and optimizing hardware-aware code. Core contributors include professionals from Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba, and Microsoft.
--------------------------------------------------
Chunk 3:
Unstructured data, such as text, images, and audio, varies in format and carries rich underlying semantics, making it challenging to analyze. To manage this complexity, embeddings are used to convert unstructured data into numerical vectors that capture its essential characteristics. These vectors are then stored in a vector database, enabling fast and scalable searches and analytics.
--------------------------------------------------
Chunk 4:
Milvus offers robust data modeling capabilities, enabling you to organize your unstructured or multi-modal data into structured collections. It supports a wide range of data types for different attribute modeling, including common numerical and character types, various vector types, arrays, sets, and JSON, saving you from the effort of maintaining multiple database systems.
--------------------------------------------------
Chunk 5:
Untructured data, embeddings, and Milvus
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
<p>Wie für das Argument von <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Die Einstellung von <code translate="no">uri</code> als lokale Datei, z.B.<code translate="no">./milvus.db</code>, ist die bequemste Methode, da sie automatisch <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> nutzt, um alle Daten in dieser Datei zu speichern.</li>
<li>Wenn Sie große Datenmengen haben, können Sie einen leistungsfähigeren Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> einrichten. Bei dieser Einrichtung verwenden Sie bitte die Server-Uri, z. B.<code translate="no">http://localhost:19530</code>, als <code translate="no">uri</code>.</li>
<li>Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, den vollständig verwalteten Cloud-Service für Milvus, verwenden möchten, passen Sie <code translate="no">uri</code> und <code translate="no">token</code> an, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und dem Api-Schlüssel</a> in Zilliz Cloud entsprechen.</li>
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

<span class="hljs-keyword">for</span> i, chunk <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(texts, desc=<span class="hljs-string">&quot;Processing chunks&quot;</span>)):
    embedding = emb_text(chunk)
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: chunk})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Processing chunks: 100%|██████████| 36/36 [00:18&lt;00:00,  1.96it/s]





{'insert_count': 36, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 'cost': 0}
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
<pre><code translate="no" class="language-python">question = (
    <span class="hljs-string">&quot;What are the three deployment modes of Milvus, and what are their differences?&quot;</span>
)
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
        &quot;Milvus offers three deployment modes, covering a wide range of data scales\u2014from local prototyping in Jupyter Notebooks to massive Kubernetes clusters managing tens of billions of vectors:&quot;,
        0.6503741145133972
    ],
    [
        &quot;Milvus Lite is a Python library that can be easily integrated into your applications. As a lightweight version of Milvus, it\u2019s ideal for quick prototyping in Jupyter Notebooks or running on edge devices with limited resources. Learn more.\nMilvus Standalone is a single-machine server deployment, with all components bundled into a single Docker image for convenient deployment. Learn more.\nMilvus Distributed can be deployed on Kubernetes clusters, featuring a cloud-native architecture designed for billion-scale or even larger scenarios. This architecture ensures redundancy in critical components. Learn more.&quot;,
        0.6281254291534424
    ],
    [
        &quot;What is Milvus?\nUnstructured Data, Embeddings, and Milvus\nWhat Makes Milvus so Fast\uff1f\nWhat Makes Milvus so Scalable\nTypes of Searches Supported by Milvus\nComprehensive Feature Set&quot;,
        0.6117545962333679
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
<pre><code translate="no">The three deployment modes of Milvus are Milvus Lite, Milvus Standalone, and Milvus Distributed. 

1. **Milvus Lite**: This is a Python library designed for easy integration into applications. It is lightweight and ideal for quick prototyping in Jupyter Notebooks or for use on edge devices with limited resources.

2. **Milvus Standalone**: This deployment mode involves a single-machine server with all components bundled into a single Docker image for convenient deployment.

3. **Milvus Distributed**: This mode can be deployed on Kubernetes clusters and is built for larger-scale scenarios, including managing billions of vectors. It features a cloud-native architecture that ensures redundancy in critical components, making it suited for extensive scalability.
</code></pre>
