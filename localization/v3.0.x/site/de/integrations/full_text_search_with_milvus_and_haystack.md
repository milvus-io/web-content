---
id: full_text_search_with_milvus_and_haystack.md
summary: >-
  In diesem Tutorial wird gezeigt, wie Sie mithilfe von Haystack und Milvus eine
  Volltext- und Hybridsuche in Ihrer Anwendung implementieren können.
title: Volltextsuche mit Milvus und Haystack
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Full-text-search-with-Milvus-and-Haystack" class="common-anchor-header">Volltextsuche mit Milvus und Haystack<button data-href="#Full-text-search-with-Milvus-and-Haystack" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">Die Volltextsuche</a> ist eine traditionelle Methode zum Abrufen von Dokumenten durch den Abgleich mit bestimmten Schlüsselwörtern oder Phrasen im Text. Sie ordnet die Ergebnisse anhand von Relevanzwerten, die aus Faktoren wie der Termhäufigkeit berechnet werden. Während die semantische Suche besser darin ist, Bedeutung und Kontext zu verstehen, zeichnet sich die Volltextsuche durch präzisen Schlüsselwortabgleich aus, was sie zu einer nützlichen Ergänzung der semantischen Suche macht. Der BM25-Algorithmus wird häufig für die Rangfolge bei der Volltextsuche verwendet und spielt eine Schlüsselrolle bei der „Retrieval-Augmented Generation“ (RAG).</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a> führt native Volltextsuchfunktionen unter Verwendung von BM25 ein. Bei diesem Ansatz wird Text in spärliche Vektoren umgewandelt, die BM25-Werte darstellen. Sie können einfach Rohtext eingeben, und Milvus generiert und speichert die spärlichen Vektoren automatisch, ohne dass eine manuelle Erzeugung spärlicher Einbettungen erforderlich ist.</p>
<p><a href="https://haystack.deepset.ai/">Haystack</a> unterstützt nun diese Milvus-Funktion, wodurch sich die Volltextsuche problemlos in RAG-Anwendungen integrieren lässt. Sie können die Volltextsuche mit der semantischen Suche anhand dichter Vektoren kombinieren, um einen hybriden Ansatz zu erzielen, der sowohl vom semantischen Verständnis als auch von der Präzision beim Abgleich von Schlüsselwörtern profitiert. Diese Kombination verbessert die Suchgenauigkeit und liefert den Nutzern bessere Ergebnisse.</p>
<p>Dieses Tutorial zeigt, wie Sie die Volltext- und Hybridsuche mithilfe von Haystack und Milvus in Ihrer Anwendung implementieren können.</p>
<p>Sie können dieses Tutorial lokal mit Milvus Lite ausführen, eine Verbindung zu einem Milvus-Server herstellen oder <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a> nutzen, den vollständig verwalteten Milvus-Dienst.</p>
<div class="alert note">
<ul>
<li>Bevor Sie mit diesem Tutorial fortfahren, sollten Sie über grundlegende Kenntnisse der <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">Volltextsuche</a> und der <a href="https://github.com/milvus-io/milvus-haystack/blob/main/README.md">grundlegenden Verwendung</a> der Haystack-Milvus-Integration verfügen.</li>
</ul>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Für dieses Tutorial ist Python 3.10 oder höher erforderlich. Installieren Sie die Haystack-Integration für Milvus zusammen mit den aktuellen PyMilvus- und Milvus Lite-Paketen:</p>
<pre><code translate="no" class="language-shell">pip install --upgrade --quiet &quot;milvus-haystack&gt;=0.1.0&quot; &quot;pymilvus&gt;=3.0.2&quot; &quot;milvus-lite&gt;=3.2.2&quot;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Laufzeitumgebung neu starten</strong>, um die soeben installierten Abhängigkeiten zu aktivieren (klicken Sie oben auf dem Bildschirm auf das Menü „Runtime“ und wählen Sie im Dropdown-Menü „Restart session“ aus).</p>
</div>
<p>Wir verwenden die Modelle von OpenAI. Sie sollten den <a href="https://platform.openai.com/docs/quickstart">API-Schlüssel</a> <code translate="no">OPENAI_API_KEY</code> als Umgebungsvariable vorbereiten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-data" class="common-anchor-header">Daten vorbereiten<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Importieren Sie die erforderlichen Pakete in dieses Notebook. Bereiten Sie anschließend einige Beispieldokumente vor.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">from</span> haystack <span class="hljs-keyword">import</span> Document, Pipeline
<span class="hljs-keyword">from</span> haystack.components.builders <span class="hljs-keyword">import</span> ChatPromptBuilder
<span class="hljs-keyword">from</span> haystack.components.embedders <span class="hljs-keyword">import</span> OpenAIDocumentEmbedder, OpenAITextEmbedder
<span class="hljs-keyword">from</span> haystack.components.generators.chat <span class="hljs-keyword">import</span> OpenAIChatGenerator
<span class="hljs-keyword">from</span> haystack.components.writers <span class="hljs-keyword">import</span> DocumentWriter
<span class="hljs-keyword">from</span> haystack.dataclasses <span class="hljs-keyword">import</span> ChatMessage
<span class="hljs-keyword">from</span> haystack.document_stores.types <span class="hljs-keyword">import</span> DuplicatePolicy
<span class="hljs-keyword">from</span> haystack.utils <span class="hljs-keyword">import</span> Secret

<span class="hljs-keyword">from</span> milvus_haystack <span class="hljs-keyword">import</span> (
    MilvusDocumentStore,
    MilvusHybridRetriever,
    MilvusSparseEmbeddingRetriever,
)
<span class="hljs-keyword">from</span> milvus_haystack.function <span class="hljs-keyword">import</span> BM25BuiltInFunction

documents = [
    Document(content=<span class="hljs-string">&quot;Alice likes this apple&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;fruit&quot;</span>}),
    Document(content=<span class="hljs-string">&quot;Bob likes swimming&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;sport&quot;</span>}),
    Document(content=<span class="hljs-string">&quot;Charlie likes white dogs&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;pets&quot;</span>}),
]
<button class="copy-code-btn"></button></code></pre>
<p>Die Integration der Volltextsuche in ein RAG-System schafft ein Gleichgewicht zwischen semantischer Suche und präziser, vorhersehbarer, schlüsselwortbasierter Suche. Sie können sich auch dafür entscheiden, ausschließlich die Volltextsuche zu verwenden; es wird jedoch empfohlen, die Volltextsuche mit der semantischen Suche zu kombinieren, um bessere Suchergebnisse zu erzielen. Hier zeigen wir zu Demonstrationszwecken sowohl die reine Volltextsuche als auch die hybride Suche.</p>
<h2 id="BM25-search-without-embedding" class="common-anchor-header">BM25-Suche ohne Einbettung<button data-href="#BM25-search-without-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Erstellen Sie die Indizierungspipeline<button data-href="#Create-the-indexing-Pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Für die Volltextsuche akzeptiert „ <code translate="no">MilvusDocumentStore</code> “ den Parameter „ <code translate="no">builtin_function</code> “. Übergeben Sie eine „ <code translate="no">BM25BuiltInFunction</code> “-Instanz, damit Milvus BM25-Sparse-Vektoren serverseitig generieren kann. Beispiel:</p>
<pre><code translate="no" class="language-python">connection_args = {<span class="hljs-string">&quot;uri&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>, <span class="hljs-string">&quot;./milvus_full_text.db&quot;</span>)}
<span class="hljs-keyword">if</span> os.getenv(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>):
    connection_args[<span class="hljs-string">&quot;token&quot;</span>] = Secret.from_env_var(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>)

document_store = MilvusDocumentStore(
    collection_name=<span class="hljs-string">&quot;haystack_bm25_demo&quot;</span>,
    connection_args=connection_args,
    sparse_vector_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,  <span class="hljs-comment"># The sparse vector field.</span>
    text_field=<span class="hljs-string">&quot;text&quot;</span>,
    builtin_function=[
        BM25BuiltInFunction(  <span class="hljs-comment"># The BM25 function converts the text into a sparse vector.</span>
            input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
            output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
        )
    ],
    <span class="hljs-comment"># Strong consistency waits for all loads to complete, adding latency with large datasets</span>
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,  # Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`).</span>
    drop_old=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Für den Parameter ` <code translate="no">connection_args</code>`:</p>
<ul>
<li>Die standardmäßige lokale Datei „ <code translate="no">./milvus_full_text.db</code> “ verwendet <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>.</li>
<li>Für einen Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> setzen Sie „ <code translate="no">MILVUS_URI</code> “ auf die Serveradresse, z. B. „ <code translate="no">http://localhost:19530</code> “.</li>
<li>Für <a href="https://zilliz.com/cloud">Zilliz Cloud</a> setzen Sie „ <code translate="no">MILVUS_URI</code> “ und „ <code translate="no">MILVUS_TOKEN</code> “ auf den <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und den API-Schlüssel</a>, die in der Konsole angezeigt werden.</li>
</ul>
</div>
<p>Erstellen Sie eine Indizierungspipeline, um Dokumente in den Milvus-Dokumentenspeicher zu schreiben.</p>
<pre><code translate="no" class="language-python">writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
_ = indexing_pipeline.run({<span class="hljs-string">&quot;writer&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of documents:&quot;</span>, document_store.count_documents())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Number of documents: 3
</code></pre>
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Erstellen Sie die Abruf-Pipeline<button data-href="#Create-the-retrieval-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Erstellen Sie eine Abruf-Pipeline, die Dokumente aus dem Milvus-Dokumentenspeicher mithilfe von <code translate="no">MilvusSparseEmbeddingRetriever</code> abruft, einem Wrapper um <code translate="no">document_store</code>.</p>
<pre><code translate="no" class="language-python">retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusSparseEmbeddingRetriever(document_store=document_store)
)

question = <span class="hljs-string">&quot;Who likes swimming?&quot;</span>

retrieval_results = retrieval_pipeline.run({<span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question}})

<span class="hljs-built_in">print</span>(retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>][<span class="hljs-number">0</span>].content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Bob likes swimming
</code></pre>
<h2 id="Hybrid-Search-with-semantic-search-and-full-text-search" class="common-anchor-header">Hybride Suche mit semantischer Suche und Volltextsuche<button data-href="#Hybrid-Search-with-semantic-search-and-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Erstellen Sie die Indizierungspipeline<button data-href="#Create-the-indexing-Pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei der hybriden Suche verwenden wir die Funktion `BM25` zur Volltextsuche und legen das dichte Vektorfeld ` <code translate="no">vector</code>` fest, um die semantische Suche durchzuführen. Diese Sammlung verwendet außerdem einen benutzerdefinierten Analysator, sodass wir ihr Schema später im Tutorial untersuchen können.</p>
<pre><code translate="no" class="language-python">analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},
    ],
}

document_store = MilvusDocumentStore(
    collection_name=<span class="hljs-string">&quot;haystack_hybrid_demo&quot;</span>,
    connection_args=connection_args,
    vector_field=<span class="hljs-string">&quot;vector&quot;</span>,  <span class="hljs-comment"># The dense vector field.</span>
    sparse_vector_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,  <span class="hljs-comment"># The sparse vector field.</span>
    text_field=<span class="hljs-string">&quot;text&quot;</span>,
    builtin_function=[
        BM25BuiltInFunction(  <span class="hljs-comment"># The BM25 function converts the text into a sparse vector.</span>
            input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
            output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
            analyzer_params=analyzer_params_custom,
            enable_match=<span class="hljs-literal">True</span>,
        )
    ],
    <span class="hljs-comment"># Strong consistency waits for all loads to complete, adding latency with large datasets</span>
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,  # Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`).</span>
    drop_old=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen Sie eine Indizierungspipeline, die die Dokumente in Einbettungen umwandelt. Die Dokumente werden anschließend in den Milvus-Dokumentenspeicher geschrieben.</p>
<pre><code translate="no" class="language-python">writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, OpenAIDocumentEmbedder())
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
indexing_pipeline.connect(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, <span class="hljs-string">&quot;writer&quot;</span>)
indexing_pipeline.run({<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of documents:&quot;</span>, document_store.count_documents())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Number of documents: 3
</code></pre>
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Erstellen Sie die Abruf-Pipeline<button data-href="#Create-the-retrieval-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Erstellen Sie eine Abruf-Pipeline, die Dokumente aus dem Milvus-Dokumentenspeicher mithilfe von ` <code translate="no">MilvusHybridRetriever</code>` abruft, das die ` <code translate="no">document_store</code> ` enthält und Parameter zur hybriden Suche empfängt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># from pymilvus import WeightedRanker</span>
retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(<span class="hljs-string">&quot;dense_text_embedder&quot;</span>, OpenAITextEmbedder())
retrieval_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>,
    MilvusHybridRetriever(
        document_store=document_store,
        <span class="hljs-comment"># top_k=3,</span>
        <span class="hljs-comment"># reranker=WeightedRanker(0.5, 0.5),  # Default is RRFRanker()</span>
    ),
)

_ = retrieval_pipeline.connect(
    <span class="hljs-string">&quot;dense_text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Bei der Durchführung einer hybriden Suche mit „ <code translate="no">MilvusHybridRetriever</code> “ können wir optional die Parameter „topK“ und „reranker“ festlegen. Dabei werden die Vektor-Embeddings und integrierten Funktionen automatisch verarbeitet und die Ergebnisse schließlich mithilfe eines Rerankers verfeinert. Die zugrunde liegenden Implementierungsdetails des Suchvorgangs bleiben für den Benutzer verborgen.</p>
<p>Weitere Informationen zur hybriden Suche finden Sie in der <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">Einführung zur hybriden Suche</a>.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;Who likes swimming?&quot;</span>

retrieval_results = retrieval_pipeline.run(
    {
        <span class="hljs-string">&quot;dense_text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question},
    }
)

<span class="hljs-built_in">print</span>(retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>][<span class="hljs-number">0</span>].content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Bob likes swimming
</code></pre>
<h2 id="Customize-analyzer" class="common-anchor-header">Analyzer anpassen<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Analysatoren sind für die Volltextsuche unverzichtbar, da sie den Satz in Token zerlegen und lexikalische Analysen wie Stemming und das Entfernen von Stoppwörtern durchführen. Analysatoren sind in der Regel sprachspezifisch. In <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">diesem Leitfaden</a> erfahren Sie mehr über Analysatoren in Milvus.</p>
<p>Milvus unterstützt zwei Arten von Analysatoren: <strong>integrierte Analysatoren</strong> und <strong>benutzerdefinierte Analysatoren</strong>. Standardmäßig verwendet der „ <code translate="no">BM25BuiltInFunction</code> “ den <a href="https://milvus.io/docs/standard-analyzer.md">integrierten Standardanalysator</a>, bei dem es sich um den grundlegendsten Analysator handelt, der den Text einschließlich der Satzzeichen in Token zerlegt.</p>
<p>Der oben genannte hybride Dokumentenspeicher übergibt „ <code translate="no">analyzer_params_custom</code> “ an „ <code translate="no">BM25BuiltInFunction</code> “ und aktiviert den Textabgleich. Dadurch bleibt die Analysator-Definition bei der Sammlung, die sie verwendet.</p>
<p>Wir können uns das Schema der Milvus-Sammlung ansehen und sicherstellen, dass der angepasste Analysator korrekt eingerichtet ist.</p>
<pre><code translate="no" class="language-python">collection = document_store.client.describe_collection(document_store.collection_name)
text_field = <span class="hljs-built_in">next</span>(field <span class="hljs-keyword">for</span> field <span class="hljs-keyword">in</span> collection[<span class="hljs-string">&quot;fields&quot;</span>] <span class="hljs-keyword">if</span> field[<span class="hljs-string">&quot;name&quot;</span>] == <span class="hljs-string">&quot;text&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Custom analyzer:&quot;</span>, text_field[<span class="hljs-string">&quot;params&quot;</span>][<span class="hljs-string">&quot;analyzer_params&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Custom analyzer: {&quot;tokenizer&quot;: &quot;standard&quot;, &quot;filter&quot;: [&quot;lowercase&quot;, {&quot;type&quot;: &quot;length&quot;, &quot;max&quot;: 40}, {&quot;type&quot;: &quot;stop&quot;, &quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]}]}
</code></pre>
<p>Weitere Details zu den Konzepten, z. B. „ <code translate="no">analyzer</code> “, „ <code translate="no">tokenizer</code> “, „ <code translate="no">filter</code> “, „ <code translate="no">enable_match</code> “ und „ <code translate="no">analyzer_params</code> “, finden Sie in der <a href="https://milvus.io/docs/analyzer-overview.md">Dokumentation zu den Analysatoren</a>.</p>
<h2 id="Using-Hybrid-Search-in-RAG-pipeline" class="common-anchor-header">Verwendung der Hybrid-Suche in der RAG-Pipeline<button data-href="#Using-Hybrid-Search-in-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Wir haben gelernt, wie man die integrierte BM25-Grundfunktion in Haystack und Milvus nutzt, und eine vorbelegte „ <code translate="no">document_store</code> “ vorbereitet. Lassen Sie uns nun eine optimierte RAG-Implementierung mit Hybrid-Suche vorstellen.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://github.com/milvus-io/bootcamp/blob/master/pics/advanced_rag/hybrid_and_rerank.png?raw=1" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Dieses Diagramm veranschaulicht den Prozess des „Hybrid Retrieve &amp; Reranking“, bei dem BM25 für den Abgleich von Schlüsselwörtern und die dichte Vektorsuche für die semantische Suche kombiniert werden. Die Ergebnisse beider Methoden werden zusammengeführt, neu gewichtet und an ein LLM weitergeleitet, um die endgültige Antwort zu generieren.</p>
<p>Die hybride Suche schafft ein Gleichgewicht zwischen Präzision und semantischem Verständnis und verbessert so die Genauigkeit und Robustheit bei vielfältigen Suchanfragen. Sie ermittelt Kandidaten mithilfe der BM25-Volltextsuche und der Vektorsuche und gewährleistet so eine semantische, kontextbezogene und präzise Suche.</p>
<p>Probieren wir eine optimierte RAG-Implementierung mit hybrider Suche aus.</p>
<pre><code translate="no" class="language-python">prompt_template = [
    ChatMessage.from_user(
        <span class="hljs-string">&quot;&quot;&quot;Answer the following query based on the provided context. If the context does
        not include an answer, reply with &#x27;I don&#x27;t know&#x27;.

        Query: {{query}}
        Documents:
        {% for doc in documents %}
            {{ doc.content }}
        {% endfor %}
        Answer:
        &quot;&quot;&quot;</span>
    )
]

rag_pipeline = Pipeline()
rag_pipeline.add_component(<span class="hljs-string">&quot;text_embedder&quot;</span>, OpenAITextEmbedder())
rag_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusHybridRetriever(document_store=document_store, top_k=<span class="hljs-number">1</span>)
)
rag_pipeline.add_component(
    <span class="hljs-string">&quot;prompt_builder&quot;</span>, ChatPromptBuilder(template=prompt_template)
)
rag_pipeline.add_component(
    <span class="hljs-string">&quot;generator&quot;</span>,
    OpenAIChatGenerator(
        api_key=Secret.from_env_var(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
    ),
)
rag_pipeline.connect(<span class="hljs-string">&quot;text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;retriever.documents&quot;</span>, <span class="hljs-string">&quot;prompt_builder.documents&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;prompt_builder.prompt&quot;</span>, <span class="hljs-string">&quot;generator.messages&quot;</span>)

results = rag_pipeline.run(
    {
        <span class="hljs-string">&quot;text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question},
        <span class="hljs-string">&quot;prompt_builder&quot;</span>: {<span class="hljs-string">&quot;query&quot;</span>: question},
    }
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;RAG answer:&quot;</span>, results[<span class="hljs-string">&quot;generator&quot;</span>][<span class="hljs-string">&quot;replies&quot;</span>][<span class="hljs-number">0</span>].text)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">RAG answer: Bob
</code></pre>
<h2 id="Conclusion" class="common-anchor-header">Fazit<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie haben die native BM25-Suche von Milvus, die hybride Suche und einen benutzerdefinierten Analysator in Haystack-Pipelines verwendet. Weitere Integrationsmöglichkeiten finden Sie im <a href="https://github.com/milvus-io/milvus-haystack">Repository „milvus-haystack</a>“.</p>
