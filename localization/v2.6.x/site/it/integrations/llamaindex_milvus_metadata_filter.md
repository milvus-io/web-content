---
id: llamaindex_milvus_metadata_filter.md
title: Filtraggio dei metadati con LlamaIndex e Milvus
related_key: LlamaIndex
summary: >-
  Questo quaderno illustra l'uso dell'archivio vettoriale Milvus in LlamaIndex,
  concentrandosi sulle capacità di filtraggio dei metadati. Imparerete a
  indicizzare i documenti con i metadati, a eseguire ricerche vettoriali con i
  filtri di metadati integrati in LlamaIndex e ad applicare le espressioni di
  filtraggio native di Milvus all'archivio vettoriale.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_metadata_filter.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_metadata_filter.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Metadata-Filtering-with-LlamaIndex-and-Milvus" class="common-anchor-header">Filtraggio dei metadati con LlamaIndex e Milvus<button data-href="#Metadata-Filtering-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo quaderno illustra l'uso dell'archivio vettoriale Milvus in LlamaIndex, concentrandosi sulle capacità di filtraggio dei metadati. Imparerete a indicizzare i documenti con metadati, a eseguire ricerche vettoriali con i filtri di metadati integrati in LlamaIndex e ad applicare le espressioni di filtraggio native di Milvus all'archivio vettoriale.</p>
<p>Alla fine di questo quaderno, capirete come utilizzare le funzioni di filtraggio di Milvus per restringere i risultati delle ricerche in base ai metadati dei documenti.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Installare le dipendenze</strong></p>
<p>Prima di iniziare, assicuratevi di aver installato le seguenti dipendenze:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus llama-index</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se si utilizza Google Colab, potrebbe essere necessario <strong>riavviare il runtime</strong> (andare al menu "Runtime" nella parte superiore dell'interfaccia e selezionare "Riavvia sessione" dal menu a discesa).</p>
</div>
<p><strong>Impostazione degli account</strong></p>
<p>Questa esercitazione utilizza OpenAI per l'incorporazione del testo e la generazione delle risposte. È necessario preparare la <a href="https://platform.openai.com/api-keys">chiave API di OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per utilizzare l'archivio vettoriale Milvus, specificare il server Milvus <code translate="no">URI</code> (e facoltativamente <code translate="no">TOKEN</code>). Per avviare un server Milvus, è possibile configurarlo seguendo la <a href="https://milvus.io/docs/install-overview.md">guida all'installazione di Milvus</a> o semplicemente provando gratuitamente <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a>.</p>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;./milvus_filter_demo.db&quot;</span>  <span class="hljs-comment"># Use Milvus-Lite for demo purpose</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Preparare i dati</strong></p>
<p>Per questo esempio, utilizzeremo alcuni libri con titoli simili o identici ma con metadati diversi (autore, genere e anno di pubblicazione) come dati campione. In questo modo dimostreremo come Milvus possa filtrare e recuperare i documenti in base alla somiglianza vettoriale e agli attributi dei metadati.</p>
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
<h2 id="Build-Index" class="common-anchor-header">Costruire l'indice<button data-href="#Build-Index" class="anchor-icon" translate="no">
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
    </button></h2><p>In questa sezione, memorizzeremo i dati di esempio in Milvus utilizzando il modello di incorporamento predefinito ( <code translate="no">text-embedding-ada-002</code> di OpenAI). I titoli saranno convertiti in embedding di testo e memorizzati in un campo di embedding denso, mentre tutti i metadati saranno memorizzati in campi scalari.</p>
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
<h2 id="Metadata-Filters" class="common-anchor-header">Filtri dei metadati<button data-href="#Metadata-Filters" class="anchor-icon" translate="no">
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
    </button></h2><p>In questa sezione, applicheremo i filtri di metadati e le condizioni di LlamaIndex alla ricerca di Milvus.</p>
<p><strong>Definire i filtri dei metadati</strong></p>
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
<p><strong>Recupero dall'archivio vettoriale con i filtri</strong></p>
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
<h3 id="Multiple-Metdata-Filters" class="common-anchor-header">Filtri multipli per i metadati</h3><p>È anche possibile combinare più filtri di metadati per creare query più complesse. LlamaIndex supporta sia le condizioni <code translate="no">AND</code> che <code translate="no">OR</code> per combinare i filtri. Ciò consente di recuperare in modo più preciso e flessibile i documenti in base ai loro attributi di metadati.</p>
<p><strong>Condizione <code translate="no">AND</code></strong></p>
<p>Proviamo a fare un esempio di filtro per i libri pubblicati tra il 1979 e il 2010 (in particolare, dove 1979 &lt; anno ≤ 2010):</p>
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
<p><strong>Condizione <code translate="no">OR</code></strong></p>
<p>Provate un altro esempio che filtra i libri scritti da Georges Perec o Keith Richards:</p>
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
<h2 id="Use-Milvuss-Keyword-Arguments" class="common-anchor-header">Utilizzare gli argomenti delle parole chiave di Milvus<button data-href="#Use-Milvuss-Keyword-Arguments" class="anchor-icon" translate="no">
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
    </button></h2><p>Oltre alle funzionalità di filtraggio integrate, è possibile utilizzare le espressioni di filtraggio native di Milvus con l'argomento parola chiave <code translate="no">string_expr</code>. Ciò consente di passare espressioni di filtro specifiche direttamente a Milvus durante le operazioni di ricerca, andando oltre il filtraggio standard dei metadati per accedere alle capacità di filtraggio avanzate di Milvus.</p>
<p>Milvus offre opzioni di filtraggio potenti e flessibili che consentono di interrogare con precisione i dati vettoriali:</p>
<ul>
<li>Operatori di base: Operatori di confronto, filtri di intervallo, operatori aritmetici e operatori logici.</li>
<li>Modelli di espressione di filtro: Modelli predefiniti per gli scenari di filtraggio più comuni.</li>
<li>Operatori specializzati: Operatori specifici per tipo di dati per campi JSON o array</li>
</ul>
<p>Per una documentazione completa ed esempi di espressioni di filtraggio Milvus, consultare la documentazione ufficiale di <a href="https://milvus.io/docs/boolean.md">Milvus Filtering</a>.</p>
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
