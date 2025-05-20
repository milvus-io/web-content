---
id: full_text_search_with_milvus_and_haystack.md
summary: >-
  Questo tutorial mostra come implementare la ricerca full-text e ibrida nella
  vostra applicazione utilizzando Haystack e Milvus.
title: Ricerca full-text con Milvus e Haystack
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_blank">
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
    </button></h1><p>La<a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">ricerca full-text</a> è un metodo tradizionale per recuperare i documenti attraverso la corrispondenza di parole chiave o frasi specifiche nel testo. Classifica i risultati in base a punteggi di rilevanza calcolati da fattori come la frequenza dei termini. Mentre la ricerca semantica è in grado di comprendere meglio il significato e il contesto, la ricerca full-text eccelle nella corrispondenza precisa delle parole chiave, rendendola un utile complemento alla ricerca semantica. L'algoritmo BM25 è ampiamente utilizzato per la classificazione nella ricerca full-text e svolge un ruolo chiave nella Retrieval-Augmented Generation (RAG).</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a> introduce funzionalità native di ricerca full-text utilizzando BM25. Questo approccio converte il testo in vettori sparsi che rappresentano i punteggi BM25. È possibile inserire semplicemente il testo grezzo e Milvus genererà e memorizzerà automaticamente i vettori sparsi, senza bisogno di generare manualmente l'incorporazione sparsa.</p>
<p><a href="https://haystack.deepset.ai/">Haystack</a> supporta ora questa funzione di Milvus, semplificando l'aggiunta della ricerca full-text alle applicazioni RAG. È possibile combinare la ricerca full-text con la ricerca semantica vettoriale densa, per un approccio ibrido che trae vantaggio sia dalla comprensione semantica che dalla precisione della corrispondenza delle parole chiave. Questa combinazione migliora l'accuratezza della ricerca e fornisce risultati migliori agli utenti.</p>
<p>Questo tutorial mostra come implementare la ricerca full-text e ibrida nella vostra applicazione utilizzando Haystack e Milvus.</p>
<p>Per utilizzare l'archivio vettoriale Milvus, specificare il server Milvus <code translate="no">URI</code> (e facoltativamente con <code translate="no">TOKEN</code>). Per avviare un server Milvus, è possibile configurarlo seguendo la <a href="https://milvus.io/docs/install-overview.md">guida all'installazione di Milvus</a> o semplicemente <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">provando</a> gratuitamente <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a>(Milvus completamente gestito).</p>
<div class="alert note">
<ul>
<li>La ricerca full-text è attualmente disponibile in Milvus Standalone, Milvus Distributed e Zilliz Cloud, anche se non è ancora supportata in Milvus Lite (la cui implementazione è prevista per il futuro). Per ulteriori informazioni, contattare support@zilliz.com.</li>
<li>Prima di procedere con questo tutorial, assicuratevi di avere una conoscenza di base della <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">ricerca full-text</a> e dell'<a href="https://github.com/milvus-io/milvus-haystack/blob/main/README.md">utilizzo di base</a> dell'integrazione di Haystack Milvus.</li>
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
    </button></h2><p>Prima di eseguire questo notebook, assicuratevi di aver installato le seguenti dipendenze:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet pymilvus milvus-haystack</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se si utilizza Google Colab, per abilitare le dipendenze appena installate potrebbe essere necessario <strong>riavviare il runtime</strong> (fare clic sul menu "Runtime" nella parte superiore dello schermo e selezionare "Restart session" dal menu a discesa).</p>
</div>
<p>Utilizzeremo i modelli di OpenAI. È necessario preparare la <a href="https://platform.openai.com/docs/quickstart">chiave api</a> <code translate="no">OPENAI_API_KEY</code> come variabile d'ambiente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-data" class="common-anchor-header">Preparare i dati</h3><p>Importare i pacchetti necessari in questo blocco note. Preparate poi alcuni documenti di esempio.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> haystack <span class="hljs-keyword">import</span> Pipeline
<span class="hljs-keyword">from</span> haystack.components.embedders <span class="hljs-keyword">import</span> OpenAIDocumentEmbedder, OpenAITextEmbedder
<span class="hljs-keyword">from</span> haystack.components.writers <span class="hljs-keyword">import</span> DocumentWriter
<span class="hljs-keyword">from</span> haystack.utils <span class="hljs-keyword">import</span> Secret
<span class="hljs-keyword">from</span> milvus_haystack <span class="hljs-keyword">import</span> MilvusDocumentStore, MilvusSparseEmbeddingRetriever
<span class="hljs-keyword">from</span> haystack.document_stores.types <span class="hljs-keyword">import</span> DuplicatePolicy
<span class="hljs-keyword">from</span> milvus_haystack.function <span class="hljs-keyword">import</span> BM25BuiltInFunction
<span class="hljs-keyword">from</span> milvus_haystack <span class="hljs-keyword">import</span> MilvusDocumentStore
<span class="hljs-keyword">from</span> milvus_haystack.milvus_embedding_retriever <span class="hljs-keyword">import</span> MilvusHybridRetriever

<span class="hljs-keyword">from</span> haystack.utils <span class="hljs-keyword">import</span> Secret
<span class="hljs-keyword">from</span> haystack.components.builders <span class="hljs-keyword">import</span> PromptBuilder
<span class="hljs-keyword">from</span> haystack.components.generators <span class="hljs-keyword">import</span> OpenAIGenerator
<span class="hljs-keyword">from</span> haystack <span class="hljs-keyword">import</span> Document

documents = [
    Document(content=<span class="hljs-string">&quot;Alice likes this apple&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;fruit&quot;</span>}),
    Document(content=<span class="hljs-string">&quot;Bob likes swimming&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;sport&quot;</span>}),
    Document(content=<span class="hljs-string">&quot;Charlie likes white dogs&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;pets&quot;</span>}),
]
<button class="copy-code-btn"></button></code></pre>
<p>L'integrazione della ricerca full-text in un sistema RAG bilancia la ricerca semantica con un recupero preciso e prevedibile basato sulle parole chiave. Si può anche scegliere di utilizzare solo la ricerca full-text, anche se si consiglia di combinare la ricerca full-text con la ricerca semantica per ottenere risultati migliori. A scopo dimostrativo mostreremo la ricerca full text da sola e la ricerca ibrida.</p>
<h2 id="BM25-search-without-embedding" class="common-anchor-header">Ricerca BM25 senza inclusione<button data-href="#BM25-search-without-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Creare la pipeline di indicizzazione</h3><p>Per la ricerca full-text Milvus MilvusDocumentStore accetta un parametro <code translate="no">builtin_function</code>. Attraverso questo parametro, è possibile passare un'istanza di <code translate="no">BM25BuiltInFunction</code>, che implementa l'algoritmo BM25 sul lato server di Milvus. Impostare il parametro <code translate="no">builtin_function</code> specificato come istanza della funzione BM25. Ad esempio:</p>
<pre><code translate="no" class="language-python">connection_args = {<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>}
<span class="hljs-comment"># connection_args = {&quot;uri&quot;: YOUR_ZILLIZ_CLOUD_URI, &quot;token&quot;: Secret.from_env_var(&quot;ZILLIZ_CLOUD_API_KEY&quot;)}</span>

document_store = MilvusDocumentStore(
    connection_args=connection_args,
    sparse_vector_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,  <span class="hljs-comment"># The sparse vector field.</span>
    text_field=<span class="hljs-string">&quot;text&quot;</span>,
    builtin_function=[
        BM25BuiltInFunction(  <span class="hljs-comment"># The BM25 function converts the text into a sparse vector.</span>
            input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
            output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
        )
    ],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`).</span>
    drop_old=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Drop the old collection if it exists and recreate it.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Per gli argomenti_connessione:</p>
<ul>
<li>È possibile configurare un server Milvus più performante su <a href="https://milvus.io/docs/quickstart.md">docker o kubernetes</a>. In questa configurazione, utilizzare l'indirizzo del server, ad esempio<code translate="no">http://localhost:19530</code>, come <code translate="no">uri</code>.</li>
<li>Se si desidera utilizzare <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito per Milvus, regolare <code translate="no">uri</code> e <code translate="no">token</code>, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">endpoint pubblico e alla chiave Api</a> di Zilliz Cloud.</li>
</ul>
<p>Creare una pipeline di indicizzazione per scrivere i documenti nell'archivio documenti di Milvus.</p>
<pre><code translate="no" class="language-python">writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
indexing_pipeline.run({<span class="hljs-string">&quot;writer&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'writer': {'documents_written': 3}}
</code></pre>
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Creare la pipeline di recupero</h3><p>Creare una pipeline di recupero che recuperi i documenti dal Milvus document store utilizzando <code translate="no">MilvusSparseEmbeddingRetriever</code>, che è un wrapper attorno a <code translate="no">document_store</code>.</p>
<pre><code translate="no" class="language-python">retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusSparseEmbeddingRetriever(document_store=document_store)
)

question = <span class="hljs-string">&quot;Who likes swimming?&quot;</span>

retrieval_results = retrieval_pipeline.run({<span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question}})

retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>][<span class="hljs-number">0</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document(id=bd334348dd2087c785e99b5a0009f33d9b8b8198736f6415df5d92602d81fd3e, content: 'Bob likes swimming', meta: {'category': 'sport'}, score: 1.2039074897766113)
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Creare la pipeline di indicizzazione</h3><p>Nella ricerca ibrida, utilizziamo la funzione BM25 per eseguire la ricerca full-text e specifichiamo il campo vettoriale denso <code translate="no">vector</code>, per eseguire la ricerca semantica.</p>
<pre><code translate="no" class="language-python">document_store = MilvusDocumentStore(
    connection_args=connection_args,
    vector_field=<span class="hljs-string">&quot;vector&quot;</span>,  <span class="hljs-comment"># The dense vector field.</span>
    sparse_vector_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,  <span class="hljs-comment"># The sparse vector field.</span>
    text_field=<span class="hljs-string">&quot;text&quot;</span>,
    builtin_function=[
        BM25BuiltInFunction(  <span class="hljs-comment"># The BM25 function converts the text into a sparse vector.</span>
            input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
            output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
        )
    ],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`).</span>
    drop_old=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Drop the old collection and recreate it.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Creare una pipeline di indicizzazione che converta i documenti in embeddings. I documenti vengono poi scritti nell'archivio documenti di Milvus.</p>
<pre><code translate="no" class="language-python">writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, OpenAIDocumentEmbedder())
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
indexing_pipeline.connect(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, <span class="hljs-string">&quot;writer&quot;</span>)
indexing_pipeline.run({<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of documents:&quot;</span>, document_store.count_documents())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Calculating embeddings: 100%|██████████| 1/1 [00:01&lt;00:00,  1.15s/it]


Number of documents: 3
</code></pre>
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Creare la pipeline di recupero</h3><p>Creare una pipeline di recupero che recuperi i documenti dall'archivio documenti di Milvus utilizzando <code translate="no">MilvusHybridRetriever</code>, che contiene <code translate="no">document_store</code> e riceve parametri sulla ricerca ibrida.</p>
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

retrieval_pipeline.connect(<span class="hljs-string">&quot;dense_text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">&lt;haystack.core.pipeline.pipeline.Pipeline object at 0x3383ad990&gt;
🚅 Components
  - dense_text_embedder: OpenAITextEmbedder
  - retriever: MilvusHybridRetriever
🛤️ Connections
  - dense_text_embedder.embedding -&gt; retriever.query_embedding (List[float])
</code></pre>
<p>Quando si esegue la ricerca ibrida usando <code translate="no">MilvusHybridRetriever</code>, si possono impostare facoltativamente i parametri topK e reranker. Il sistema gestirà automaticamente le incorporazioni vettoriali e le funzioni integrate e infine utilizzerà un reranker per affinare i risultati. I dettagli dell'implementazione del processo di ricerca sono nascosti all'utente.</p>
<p>Per ulteriori informazioni sulla ricerca ibrida, è possibile consultare l'<a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">introduzione</a> alla <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">ricerca ibrida</a>.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;Who likes swimming?&quot;</span>

retrieval_results = retrieval_pipeline.run(
    {
        <span class="hljs-string">&quot;dense_text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question},
    }
)

retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>][<span class="hljs-number">0</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document(id=bd334348dd2087c785e99b5a0009f33d9b8b8198736f6415df5d92602d81fd3e, content: 'Bob likes swimming', meta: {'category': 'sport'}, score: 0.032786883413791656, embedding: vector of size 1536)
</code></pre>
<h2 id="Customize-analyzer" class="common-anchor-header">Personalizzare l'analizzatore<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli analizzatori sono essenziali nella ricerca full-text, in quanto suddividono la frase in token ed eseguono l'analisi lessicale, come lo stemming e la rimozione delle stop word. Gli analizzatori sono solitamente specifici per la lingua. Per saperne di più sugli analizzatori in Milvus, si può consultare <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">questa guida</a>.</p>
<p>Milvus supporta due tipi di analizzatori: <strong>Analizzatori integrati</strong> e <strong>Analizzatori personalizzati</strong>. Per impostazione predefinita, <code translate="no">BM25BuiltInFunction</code> utilizzerà l'<a href="https://milvus.io/docs/standard-analyzer.md">analizzatore standard incorporato</a>, che è l'analizzatore più elementare e che tokenizza il testo con la punteggiatura.</p>
<p>Se si vuole usare un analizzatore diverso o personalizzare l'analizzatore, si può passare il parametro <code translate="no">analyzer_params</code> nell'inizializzazione di <code translate="no">BM25BuiltInFunction</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom filter</span>
    ],
}

document_store = MilvusDocumentStore(
    connection_args=connection_args,
    vector_field=<span class="hljs-string">&quot;vector&quot;</span>,
    sparse_vector_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    text_field=<span class="hljs-string">&quot;text&quot;</span>,
    builtin_function=[
        BM25BuiltInFunction(
            input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
            output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
            analyzer_params=analyzer_params_custom,  <span class="hljs-comment"># Custom analyzer parameters.</span>
            enable_match=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Whether to enable match.</span>
        )
    ],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
    drop_old=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># write documents to the document store</span>
writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)
indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, OpenAIDocumentEmbedder())
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
indexing_pipeline.connect(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, <span class="hljs-string">&quot;writer&quot;</span>)
indexing_pipeline.run({<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Calculating embeddings: 100%|██████████| 1/1 [00:00&lt;00:00,  1.39it/s]





{'dense_doc_embedder': {'meta': {'model': 'text-embedding-ada-002-v2',
   'usage': {'prompt_tokens': 11, 'total_tokens': 11}}},
 'writer': {'documents_written': 3}}
</code></pre>
<p>Si può dare un'occhiata allo schema della collezione Milvus e verificare che l'analizzatore personalizzato sia impostato correttamente.</p>
<pre><code translate="no" class="language-python">document_store.col.schema
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': False, 'description': '', 'fields': [{'name': 'text', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535, 'enable_match': True, 'enable_analyzer': True, 'analyzer_params': {'tokenizer': 'standard', 'filter': ['lowercase', {'type': 'length', 'max': 40}, {'type': 'stop', 'stop_words': ['of', 'to']}]}}}, {'name': 'id', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535}, 'is_primary': True, 'auto_id': False}, {'name': 'vector', 'description': '', 'type': &lt;DataType.FLOAT_VECTOR: 101&gt;, 'params': {'dim': 1536}}, {'name': 'sparse_vector', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;, 'is_function_output': True}], 'enable_dynamic_field': True, 'functions': [{'name': 'bm25_function_7b6e15a4', 'description': '', 'type': &lt;FunctionType.BM25: 1&gt;, 'input_field_names': ['text'], 'output_field_names': ['sparse_vector'], 'params': {}}]}
</code></pre>
<p>Per ulteriori dettagli sui concetti, ad esempio <code translate="no">analyzer</code>, <code translate="no">tokenizer</code>, <code translate="no">filter</code>, <code translate="no">enable_match</code>, <code translate="no">analyzer_params</code>, consultare la <a href="https://milvus.io/docs/analyzer-overview.md">documentazione</a> dell'<a href="https://milvus.io/docs/analyzer-overview.md">analizzatore</a>.</p>
<h2 id="Using-Hybrid-Search-in-RAG-pipeline" class="common-anchor-header">Uso della ricerca ibrida nella pipeline RAG<button data-href="#Using-Hybrid-Search-in-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Abbiamo imparato a usare la funzione di base di BM25 in Haystack e Milvus e abbiamo preparato un sito <code translate="no">document_store</code>. Introduciamo un'implementazione ottimizzata di RAG con la ricerca ibrida.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://github.com/milvus-io/bootcamp/blob/master/images/advanced_rag/hybrid_and_rerank.png?raw=1" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Questo diagramma mostra il processo di Hybrid Retrieve &amp; Reranking, che combina BM25 per la corrispondenza delle parole chiave e la ricerca vettoriale densa per il recupero semantico. I risultati di entrambi i metodi vengono uniti, riclassificati e passati a un LLM per generare la risposta finale.</p>
<p>La ricerca ibrida bilancia la precisione e la comprensione semantica, migliorando l'accuratezza e la robustezza per query diverse. Recupera i candidati con la ricerca full-text e la ricerca vettoriale di BM25, garantendo un recupero semantico, consapevole del contesto e accurato.</p>
<p>Proviamo un'implementazione ottimizzata di RAG con ricerca ibrida.</p>
<pre><code translate="no" class="language-python">prompt_template = <span class="hljs-string">&quot;&quot;&quot;Answer the following query based on the provided context. If the context does
                     not include an answer, reply with &#x27;I don&#x27;t know&#x27;.\n
                     Query: {{query}}
                     Documents:
                     {% for doc in documents %}
                        {{ doc.content }}
                     {% endfor %}
                     Answer:
                  &quot;&quot;&quot;</span>

rag_pipeline = Pipeline()
rag_pipeline.add_component(<span class="hljs-string">&quot;text_embedder&quot;</span>, OpenAITextEmbedder())
rag_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusHybridRetriever(document_store=document_store, top_k=<span class="hljs-number">1</span>)
)
rag_pipeline.add_component(<span class="hljs-string">&quot;prompt_builder&quot;</span>, PromptBuilder(template=prompt_template))
rag_pipeline.add_component(
    <span class="hljs-string">&quot;generator&quot;</span>,
    OpenAIGenerator(
        api_key=Secret.from_token(os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>)),
        generation_kwargs={<span class="hljs-string">&quot;temperature&quot;</span>: <span class="hljs-number">0</span>},
    ),
)
rag_pipeline.connect(<span class="hljs-string">&quot;text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;retriever.documents&quot;</span>, <span class="hljs-string">&quot;prompt_builder.documents&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;prompt_builder&quot;</span>, <span class="hljs-string">&quot;generator&quot;</span>)

results = rag_pipeline.run(
    {
        <span class="hljs-string">&quot;text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question},
        <span class="hljs-string">&quot;prompt_builder&quot;</span>: {<span class="hljs-string">&quot;query&quot;</span>: question},
    }
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;RAG answer:&quot;</span>, results[<span class="hljs-string">&quot;generator&quot;</span>][<span class="hljs-string">&quot;replies&quot;</span>][<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">RAG answer: Bob likes swimming.
</code></pre>
<p>Per ulteriori informazioni su come utilizzare milvus-haystack, consultare il <a href="https://github.com/milvus-io/milvus-haystack">repository ufficiale di milvus-haystack</a>.</p>
