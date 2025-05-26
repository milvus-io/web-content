---
id: llamaindex_milvus_metadata_filter.md
title: Metadaten-Filterung mit LlamaIndex und Milvus
related_key: LlamaIndex
summary: >-
  Dieses Notizbuch veranschaulicht die Verwendung des Milvus-Vektorspeichers in
  LlamaIndex und konzentriert sich dabei auf die Möglichkeiten zur Filterung von
  Metadaten. Sie werden lernen, wie man Dokumente mit Metadaten indiziert,
  Vektorsuchen mit den in LlamaIndex eingebauten Metadatenfiltern durchführt und
  die nativen Filterausdrücke von Milvus auf den Vektorspeicher anwendet.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_metadata_filter.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_metadata_filter.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Metadata-Filtering-with-LlamaIndex-and-Milvus" class="common-anchor-header">Metadaten-Filterung mit LlamaIndex und Milvus<button data-href="#Metadata-Filtering-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Notizbuch veranschaulicht die Verwendung des Milvus-Vektorspeichers in LlamaIndex und konzentriert sich dabei auf die Möglichkeiten der Metadatenfilterung. Sie werden lernen, wie man Dokumente mit Metadaten indiziert, Vektorsuchen mit den in LlamaIndex eingebauten Metadatenfiltern durchführt und die nativen Filterausdrücke von Milvus auf den Vektorspeicher anwendet.</p>
<p>Am Ende dieses Notebooks werden Sie wissen, wie Sie die Filterfunktionen von Milvus nutzen können, um die Suchergebnisse auf der Grundlage von Dokument-Metadaten einzugrenzen.</p>
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
    </button></h2><p><strong>Abhängigkeiten installieren</strong></p>
<p>Bevor Sie beginnen, stellen Sie sicher, dass Sie die folgenden Abhängigkeiten installiert haben:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus llama-index</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong> (navigieren Sie zum Menü "Runtime" am oberen Rand der Benutzeroberfläche und wählen Sie "Sitzung neu starten" aus dem Dropdown-Menü).</p>
</div>
<p><strong>Konten einrichten</strong></p>
<p>Dieses Tutorial verwendet OpenAI für Texteinbettungen und die Generierung von Antworten. Sie müssen den <a href="https://platform.openai.com/api-keys">OpenAI-API-Schlüssel</a> vorbereiten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um den Milvus-Vektorspeicher zu verwenden, geben Sie Ihren Milvus-Server <code translate="no">URI</code> (und optional mit der <code translate="no">TOKEN</code>) an. Um einen Milvus-Server zu starten, können Sie einen Milvus-Server einrichten, indem Sie die <a href="https://milvus.io/docs/install-overview.md">Milvus-Installationsanleitung</a> befolgen oder einfach <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a> kostenlos ausprobieren.</p>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;./milvus_filter_demo.db&quot;</span>  <span class="hljs-comment"># Use Milvus-Lite for demo purpose</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Daten vorbereiten</strong></p>
<p>Für dieses Beispiel werden wir einige Bücher mit ähnlichen oder identischen Titeln, aber unterschiedlichen Metadaten (Autor, Genre und Erscheinungsjahr) als Beispieldaten verwenden. Auf diese Weise lässt sich demonstrieren, wie Milvus Dokumente auf der Grundlage von Vektorähnlichkeit und Metadatenattributen filtern und abrufen kann.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.schema <span class="hljs-keyword">import</span> TextNode

nodes = [
    TextNode(
        text=<span class="hljs-string">&quot;Life: A User&#x27;s Manual&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Georges Perec&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Postmodern Fiction&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">1978</span>,
        },
    ),
    TextNode(
        text=<span class="hljs-string">&quot;Life and Fate&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Vasily Grossman&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Historical Fiction&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">1980</span>,
        },
    ),
    TextNode(
        text=<span class="hljs-string">&quot;Life&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Keith Richards&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Memoir&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2010</span>,
        },
    ),
    TextNode(
        text=<span class="hljs-string">&quot;The Life&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Malcolm Knox&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Literary Fiction&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2011</span>,
        },
    ),
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-Index" class="common-anchor-header">Index aufbauen<button data-href="#Build-Index" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Abschnitt werden wir Beispieldaten in Milvus unter Verwendung des Standard-Einbettungsmodells (OpenAI's <code translate="no">text-embedding-ada-002</code>) speichern. Die Titel werden in Texteinbettungen umgewandelt und in einem dichten Einbettungsfeld gespeichert, während alle Metadaten in skalaren Feldern gespeichert werden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext, VectorStoreIndex


vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    collection_name=<span class="hljs-string">&quot;test_filter_collection&quot;</span>,  <span class="hljs-comment"># Change collection name here</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># Vector dimension depends on the embedding model</span>
    overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Drop collection if exists</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex(nodes, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-22 08:31:09,871 [DEBUG][_create_connection]: Created new connection using: 19675caa8f894772b3db175b65d0063a (async_milvus_client.py:547)
</code></pre>
<h2 id="Metadata-Filters" class="common-anchor-header">Metadaten-Filter<button data-href="#Metadata-Filters" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Abschnitt werden wir die in LlamaIndex integrierten Metadatenfilter und -bedingungen auf die Milvus-Suche anwenden.</p>
<p><strong>Definieren von Metadatenfiltern</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> (
    MetadataFilter,
    MetadataFilters,
    FilterOperator,
)

filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key=<span class="hljs-string">&quot;year&quot;</span>, value=<span class="hljs-number">2000</span>, operator=FilterOperator.GT
        )  <span class="hljs-comment"># year &gt; 2000</span>
    ]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Abruf aus Vektorspeicher mit Filtern</strong></p>
<pre><code translate="no" class="language-python">retriever = index.as_retriever(filters=filters, similarity_top_k=<span class="hljs-number">5</span>)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The Life
{'author': 'Malcolm Knox', 'genre': 'Literary Fiction', 'year': 2011}


Life
{'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}
</code></pre>
<h3 id="Multiple-Metdata-Filters" class="common-anchor-header">Mehrere Metadaten-Filter</h3><p>Sie können auch mehrere Metadatenfilter kombinieren, um komplexere Abfragen zu erstellen. LlamaIndex unterstützt sowohl <code translate="no">AND</code> als auch <code translate="no">OR</code> Bedingungen, um Filter zu kombinieren. Dies ermöglicht eine präzisere und flexiblere Abfrage von Dokumenten auf der Grundlage ihrer Metadatenattribute.</p>
<p><strong>Bedingung <code translate="no">AND</code></strong></p>
<p>Probieren Sie ein Beispiel aus, bei dem nach Büchern gefiltert wird, die zwischen 1979 und 2010 veröffentlicht wurden (insbesondere, wenn 1979 &lt; Jahr ≤ 2010):</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> FilterCondition

filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key=<span class="hljs-string">&quot;year&quot;</span>, value=<span class="hljs-number">1979</span>, operator=FilterOperator.GT
        ),  <span class="hljs-comment"># year &gt; 1979</span>
        MetadataFilter(
            key=<span class="hljs-string">&quot;year&quot;</span>, value=<span class="hljs-number">2010</span>, operator=FilterOperator.LTE
        ),  <span class="hljs-comment"># year &lt;= 2010</span>
    ],
    condition=FilterCondition.AND,
)

retriever = index.as_retriever(filters=filters, similarity_top_k=<span class="hljs-number">5</span>)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Life and Fate
{'author': 'Vasily Grossman', 'genre': 'Historical Fiction', 'year': 1980}


Life
{'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}
</code></pre>
<p><strong>Bedingung <code translate="no">OR</code></strong></p>
<p>Probieren Sie ein weiteres Beispiel aus, das Bücher filtert, die entweder von Georges Perec oder Keith Richards geschrieben wurden:</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key=<span class="hljs-string">&quot;author&quot;</span>, value=<span class="hljs-string">&quot;Georges Perec&quot;</span>, operator=FilterOperator.EQ
        ),  <span class="hljs-comment"># author is Georges Perec</span>
        MetadataFilter(
            key=<span class="hljs-string">&quot;author&quot;</span>, value=<span class="hljs-string">&quot;Keith Richards&quot;</span>, operator=FilterOperator.EQ
        ),  <span class="hljs-comment"># author is Keith Richards</span>
    ],
    condition=FilterCondition.OR,
)

retriever = index.as_retriever(filters=filters, similarity_top_k=<span class="hljs-number">5</span>)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Life
{'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}


Life: A User's Manual
{'author': 'Georges Perec', 'genre': 'Postmodern Fiction', 'year': 1978}
</code></pre>
<h2 id="Use-Milvuss-Keyword-Arguments" class="common-anchor-header">Verwenden Sie die Schlüsselwortargumente von Milvus<button data-href="#Use-Milvuss-Keyword-Arguments" class="anchor-icon" translate="no">
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
    </button></h2><p>Zusätzlich zu den eingebauten Filtermöglichkeiten können Sie die nativen Filterausdrücke von Milvus mit dem Schlüsselwortargument <code translate="no">string_expr</code> verwenden. Dies erlaubt Ihnen, spezifische Filterausdrücke während der Suchoperationen direkt an Milvus zu übergeben und so über die Standard-Metadatenfilterung hinaus auf die erweiterten Filterfähigkeiten von Milvus zuzugreifen.</p>
<p>Milvus bietet leistungsstarke und flexible Filtermöglichkeiten, die eine präzise Abfrage Ihrer Vektordaten ermöglichen:</p>
<ul>
<li>Grundlegende Operatoren: Vergleichsoperatoren, Bereichsfilter, arithmetische Operatoren und logische Operatoren</li>
<li>Vorlagen für Filterausdrücke: Vordefinierte Muster für gängige Filterszenarien</li>
<li>Spezialisierte Operatoren: Datentypspezifische Operatoren für JSON- oder Array-Felder</li>
</ul>
<p>Eine umfassende Dokumentation und Beispiele für Milvus-Filterausdrücke finden Sie in der offiziellen Dokumentation von <a href="https://milvus.io/docs/boolean.md">Milvus Filtering</a>.</p>
<pre><code translate="no" class="language-python">retriever = index.as_retriever(
    vector_store_kwargs={
        <span class="hljs-string">&quot;string_expr&quot;</span>: <span class="hljs-string">&quot;genre like &#x27;%Fiction&#x27;&quot;</span>,
    },
    similarity_top_k=<span class="hljs-number">5</span>,
)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The Life
{'author': 'Malcolm Knox', 'genre': 'Literary Fiction', 'year': 2011}


Life and Fate
{'author': 'Vasily Grossman', 'genre': 'Historical Fiction', 'year': 1980}


Life: A User's Manual
{'author': 'Georges Perec', 'genre': 'Postmodern Fiction', 'year': 1978}
</code></pre>
