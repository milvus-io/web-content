---
id: full_text_search_with_milvus_and_haystack.md
summary: >-
  Questo tutorial illustra come implementare la ricerca full-text e ibrida nella
  propria applicazione utilizzando Haystack e Milvus.
title: Ricerca full-text con Milvus e Haystack
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Full-text-search-with-Milvus-and-Haystack" class="common-anchor-header">Ricerca full-text con Milvus e Haystack<button data-href="#Full-text-search-with-Milvus-and-Haystack" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">La ricerca full-text</a> è un metodo tradizionale per recuperare documenti tramite la corrispondenza di parole chiave o frasi specifiche presenti nel testo. Classifica i risultati in base a punteggi di rilevanza calcolati a partire da fattori quali la frequenza dei termini. Mentre la ricerca semantica è più efficace nel comprendere il significato e il contesto, la ricerca full-text eccelle nella corrispondenza precisa delle parole chiave, rendendola un utile complemento alla ricerca semantica. L’algoritmo BM25 è ampiamente utilizzato per il ranking nella ricerca full-text e svolge un ruolo chiave nella Retrieval-Augmented Generation (RAG).</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a> introduce funzionalità native di ricerca full-text basate su BM25. Questo approccio converte il testo in vettori sparsi che rappresentano i punteggi BM25. È sufficiente inserire il testo grezzo e Milvus genererà e memorizzerà automaticamente i vettori sparsi, senza che sia necessaria la generazione manuale di embedding sparsi.</p>
<p><a href="https://haystack.deepset.ai/">Haystack</a> ora supporta questa funzionalità di Milvus, rendendo semplice l’aggiunta della ricerca full-text alle applicazioni RAG. È possibile combinare la ricerca full-text con la ricerca semantica a vettori densi per un approccio ibrido che sfrutta sia la comprensione semantica sia la precisione nella corrispondenza delle parole chiave. Questa combinazione migliora l’accuratezza della ricerca e offre risultati migliori agli utenti.</p>
<p>Questo tutorial illustra come implementare la ricerca full-text e quella ibrida nella propria applicazione utilizzando Haystack e Milvus.</p>
<p>È possibile eseguire questo tutorial localmente con Milvus Lite, connettersi a un server Milvus oppure utilizzare <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a>, il servizio Milvus completamente gestito.</p>
<div class="alert note">
<ul>
<li>Prima di procedere con questo tutorial, assicurati di avere una conoscenza di base <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">della ricerca full-text</a> e <a href="https://github.com/milvus-io/milvus-haystack/blob/main/README.md">dell’utilizzo fondamentale</a> dell’integrazione tra Haystack e Milvus.</li>
</ul>
</div>
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
    </button></h2><p>Questo tutorial richiede Python 3.10 o versioni successive. Installa l’integrazione Haystack per Milvus insieme ai pacchetti PyMilvus e Milvus Lite aggiornati:</p>
<pre><code translate="no" class="language-shell">pip install --upgrade --quiet &quot;milvus-haystack&gt;=0.1.0&quot; &quot;pymilvus&gt;=3.0.2&quot; &quot;milvus-lite&gt;=3.2.2&quot;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se si utilizza Google Colab, per abilitare le dipendenze appena installate, potrebbe essere necessario <strong>riavviare il runtime</strong> (fare clic sul menu “Runtime” nella parte superiore dello schermo e selezionare “Riavvia sessione” dal menu a discesa).</p>
</div>
<p>Utilizzeremo i modelli di OpenAI. È necessario preparare la <a href="https://platform.openai.com/docs/quickstart">chiave API</a> <code translate="no">OPENAI_API_KEY</code> come variabile d’ambiente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-data" class="common-anchor-header">Preparazione dei dati<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Importate i pacchetti necessari in questo notebook. Quindi preparate alcuni documenti di esempio.</p>
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
<p>L’integrazione della ricerca full-text in un sistema RAG bilancia la ricerca semantica con un recupero preciso e prevedibile basato su parole chiave. È anche possibile scegliere di utilizzare solo la ricerca full-text, sebbene sia consigliabile combinarla con la ricerca semantica per ottenere risultati migliori. Qui, a scopo dimostrativo, mostreremo sia la ricerca full-text da sola che la ricerca ibrida.</p>
<h2 id="BM25-search-without-embedding" class="common-anchor-header">Ricerca BM25 senza embedding<button data-href="#BM25-search-without-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Creare la pipeline di indicizzazione<button data-href="#Create-the-indexing-Pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Per la ricerca full-text, <code translate="no">MilvusDocumentStore</code> accetta un parametro <code translate="no">builtin_function</code>. Passare un'istanza di <code translate="no">BM25BuiltInFunction</code> per consentire a Milvus di generare vettori sparsi BM25 sul lato server. Ad esempio:</p>
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
<p>Per il parametro ` <code translate="no">connection_args</code>`:</p>
<ul>
<li>Il file locale predefinito, <code translate="no">./milvus_full_text.db</code>, utilizza <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>.</li>
<li>Per un server Milvus su <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>, impostare ` <code translate="no">MILVUS_URI</code> ` sull'indirizzo del server, ad esempio ` <code translate="no">http://localhost:19530</code>`.</li>
<li>Per <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, impostare <code translate="no">MILVUS_URI</code> e <code translate="no">MILVUS_TOKEN</code> <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">sull'endpoint pubblico e sulla chiave API</a> indicati nella console.</li>
</ul>
</div>
<p>Creare una pipeline di indicizzazione per scrivere i documenti nell'archivio documenti di Milvus.</p>
<pre><code translate="no" class="language-python">writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
_ = indexing_pipeline.run({<span class="hljs-string">&quot;writer&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of documents:&quot;</span>, document_store.count_documents())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Number of documents: 3
</code></pre>
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Creare la pipeline di recupero<button data-href="#Create-the-retrieval-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Creare una pipeline di recupero che recuperi i documenti dall’archivio di Milvus utilizzando <code translate="no">MilvusSparseEmbeddingRetriever</code>, che è un wrapper attorno a <code translate="no">document_store</code>.</p>
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
<h2 id="Hybrid-Search-with-semantic-search-and-full-text-search" class="common-anchor-header">Ricerca ibrida con ricerca semantica e ricerca full-text<button data-href="#Hybrid-Search-with-semantic-search-and-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Creazione della pipeline di indicizzazione<button data-href="#Create-the-indexing-Pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Nella ricerca ibrida, utilizziamo la funzione BM25 per eseguire la ricerca full-text e specifichiamo il campo vettoriale denso <code translate="no">vector</code> per eseguire la ricerca semantica. Questa collezione utilizza anche un analizzatore personalizzato, in modo da poter esaminarne lo schema più avanti nel tutorial.</p>
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
<p>Creare una pipeline di indicizzazione che converta i documenti in embedding. I documenti vengono quindi scritti nell’archivio documenti di Milvus.</p>
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
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Creazione della pipeline di recupero<button data-href="#Create-the-retrieval-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Creare una pipeline di recupero che recuperi i documenti dall’archivio di Milvus utilizzando <code translate="no">MilvusHybridRetriever</code>, che contiene l’ <code translate="no">document_store</code> e e riceve i parametri relativi alla ricerca ibrida.</p>
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
<p>Quando si esegue una ricerca ibrida utilizzando <code translate="no">MilvusHybridRetriever</code>, è possibile impostare facoltativamente i parametri topK e reranker. Il sistema gestirà automaticamente gli embedding vettoriali e le funzioni integrate e, infine, utilizzerà un reranker per affinare i risultati. I dettagli di implementazione sottostanti del processo di ricerca sono nascosti all’utente.</p>
<p>Per ulteriori informazioni sulla ricerca ibrida, è possibile consultare <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">l’introduzione</a> alla <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">ricerca ibrida</a>.</p>
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
<h2 id="Customize-analyzer" class="common-anchor-header">Personalizzazione dell’analizzatore<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli analizzatori sono fondamentali nella ricerca full-text poiché suddividono la frase in token ed eseguono analisi lessicali quali lo stemming e la rimozione delle parole vuote. Gli analizzatori sono solitamente specifici per ogni lingua. È possibile consultare <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">questa guida</a> per saperne di più sugli analizzatori in Milvus.</p>
<p>Milvus supporta due tipi di analizzatori: <strong>analizzatori integrati</strong> e <strong>analizzatori personalizzati</strong>. Per impostazione predefinita, l’ <code translate="no">BM25BuiltInFunction</code> e utilizzerà <a href="https://milvus.io/docs/standard-analyzer.md">l’analizzatore standard integrato</a>, che è l’analizzatore più basilare che tokenizza il testo con la punteggiatura.</p>
<p>L’archivio di documenti ibrido sopra riportato passa ` <code translate="no">analyzer_params_custom</code> ` a ` <code translate="no">BM25BuiltInFunction</code> ` e abilita la corrispondenza del testo. In questo modo, la definizione dell’analizzatore rimane associata alla collezione che lo utilizza.</p>
<p>Possiamo dare un’occhiata allo schema della collezione Milvus e assicurarci che l’analizzatore personalizzato sia configurato correttamente.</p>
<pre><code translate="no" class="language-python">collection = document_store.client.describe_collection(document_store.collection_name)
text_field = <span class="hljs-built_in">next</span>(field <span class="hljs-keyword">for</span> field <span class="hljs-keyword">in</span> collection[<span class="hljs-string">&quot;fields&quot;</span>] <span class="hljs-keyword">if</span> field[<span class="hljs-string">&quot;name&quot;</span>] == <span class="hljs-string">&quot;text&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Custom analyzer:&quot;</span>, text_field[<span class="hljs-string">&quot;params&quot;</span>][<span class="hljs-string">&quot;analyzer_params&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Custom analyzer: {&quot;tokenizer&quot;: &quot;standard&quot;, &quot;filter&quot;: [&quot;lowercase&quot;, {&quot;type&quot;: &quot;length&quot;, &quot;max&quot;: 40}, {&quot;type&quot;: &quot;stop&quot;, &quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]}]}
</code></pre>
<p>Per ulteriori dettagli concettuali, ad esempio <code translate="no">analyzer</code>, <code translate="no">tokenizer</code>, <code translate="no">filter</code>, <code translate="no">enable_match</code>, <code translate="no">analyzer_params</code>, si prega di fare riferimento alla <a href="https://milvus.io/docs/analyzer-overview.md">documentazione</a> relativa <a href="https://milvus.io/docs/analyzer-overview.md">agli analizzatori</a>.</p>
<h2 id="Using-Hybrid-Search-in-RAG-pipeline" class="common-anchor-header">Utilizzo della ricerca ibrida nella pipeline RAG<button data-href="#Using-Hybrid-Search-in-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Abbiamo appreso come utilizzare la funzione integrata di base BM25 in Haystack e Milvus e abbiamo preparato un file <code translate="no">document_store</code> già caricato. Presentiamo ora un’implementazione ottimizzata di RAG con ricerca ibrida.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://github.com/milvus-io/bootcamp/blob/master/pics/advanced_rag/hybrid_and_rerank.png?raw=1" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Questo diagramma illustra il processo di recupero e riclassificazione ibrido (Hybrid Retrieve &amp; Reranking), che combina BM25 per la corrispondenza delle parole chiave e la ricerca vettoriale densa per il recupero semantico. I risultati di entrambi i metodi vengono uniti, riclassificati e trasmessi a un LLM per generare la risposta finale.</p>
<p>La ricerca ibrida bilancia precisione e comprensione semantica, migliorando l’accuratezza e la robustezza per query diverse. Recupera i risultati candidati tramite la ricerca full-text BM25 e la ricerca vettoriale, garantendo un recupero semantico, sensibile al contesto e accurato.</p>
<p>Proviamo un’implementazione RAG ottimizzata con ricerca ibrida.</p>
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
<h2 id="Conclusion" class="common-anchor-header">Conclusione<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Avete utilizzato la ricerca BM25 nativa di Milvus, il recupero ibrido e un analizzatore personalizzato nelle pipeline Haystack. Per ulteriori opzioni di integrazione, consultate il <a href="https://github.com/milvus-io/milvus-haystack">repository milvus-haystack</a>.</p>
