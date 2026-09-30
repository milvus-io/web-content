---
id: llamaindex_milvus_full_text_search.md
title: Utilizzo della ricerca full-text con LlamaIndex e Milvus
related_key: LlamaIndex
summary: >-
  In questo tutorial imparerai come utilizzare LlamaIndex e Milvus per
  realizzare un sistema RAG basato sulla ricerca full-text e sulla ricerca
  ibrida. Inizieremo implementando la sola ricerca full-text, per poi
  potenziarla integrando la ricerca semantica al fine di ottenere risultati più
  completi.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">Utilizzo della ricerca full-text con LlamaIndex e Milvus<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>La ricerca full-text</strong> utilizza la corrispondenza esatta delle parole chiave, spesso avvalendosi di algoritmi come BM25 per classificare i documenti in base alla rilevanza. Nei sistemi <strong>di generazione potenziata dal recupero (RAG)</strong>, questo metodo recupera il testo pertinente per migliorare le risposte generate dall’IA.</p>
<p>D'altra parte, <strong>la ricerca semantica</strong> interpreta il significato contestuale per fornire risultati più ampi. La combinazione di entrambi gli approcci crea una <strong>ricerca ibrida</strong> che migliora il recupero delle informazioni, specialmente nei casi in cui un singolo metodo non sia sufficiente.</p>
<p>Con l’approccio Sparse-BM25 <a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">di Milvus 2.5</a>, il testo grezzo viene automaticamente convertito in vettori sparsi. Ciò elimina la necessità di generare manualmente embedding sparsi e consente una strategia di ricerca ibrida che bilancia la comprensione semantica con la rilevanza delle parole chiave.</p>
<p>In questo tutorial imparerai come utilizzare LlamaIndex e Milvus per realizzare un sistema RAG utilizzando la ricerca full-text e la ricerca ibrida. Inizieremo implementando la sola ricerca full-text per poi potenziarla integrando la ricerca semantica, al fine di ottenere risultati più completi.</p>
<blockquote>
<p>Prima di procedere con questo tutorial, assicurati di avere familiarità con <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">la ricerca full-text</a> e <a href="https://milvus.io/docs/integrate_with_llamaindex.md">con</a> le <a href="https://milvus.io/docs/integrate_with_llamaindex.md">nozioni di base sull’utilizzo di Milvus in LlamaIndex</a>.</p>
</blockquote>
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
    </button></h2><p><strong>Installazione delle dipendenze</strong></p>
<p>Prima di iniziare, assicurati di avere installate le seguenti dipendenze:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Se stai utilizzando Google Colab, potrebbe essere necessario <strong>riavviare il runtime</strong> (vai al menu “Runtime” nella parte superiore dell’interfaccia e seleziona “Riavvia sessione” dal menu a tendina).</p>
</blockquote>
</div>
<p><strong>Configurazione degli account</strong></p>
<p>Questo tutorial utilizza OpenAI per l’embedding dei testi e la generazione delle risposte. È necessario preparare la <a href="https://platform.openai.com/api-keys">chiave API di OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per utilizzare l'archivio vettoriale Milvus, specifica l'<code translate="no">URI</code> e del tuo server Milvus (e, facoltativamente, l'<code translate="no">TOKEN</code>). Per avviare un server Milvus, puoi configurarlo seguendo la <a href="https://milvus.io/docs/install-overview.md">guida all'installazione di Milvus</a> oppure provare semplicemente <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a> gratuitamente.</p>
<blockquote>
<p>La ricerca full-text è attualmente supportata in Milvus Standalone, Milvus Distributed e Zilliz Cloud, ma non ancora in Milvus Lite (implementazione prevista in futuro). Per ulteriori informazioni, contattare support@zilliz.com.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Scaricare i dati di esempio</strong></p>
<p>Eseguire i seguenti comandi per scaricare i documenti di esempio nella directory “data/paul_graham”:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$wget</span> <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">--2025-03-27 07:49:01--  https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.108.133, 185.199.109.133, 185.199.110.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.108.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 75042 (73K) [text/plain]
Saving to: ‘data/paul_graham/paul_graham_essay.txt’

data/paul_graham/pa 100%[===================&gt;]  73.28K  --.-KB/s    in 0.07s   

2025-03-27 07:49:01 (1.01 MB/s) - ‘data/paul_graham/paul_graham_essay.txt’ saved [75042/75042]
</code></pre>
<h2 id="RAG-with-Full-Text-Search" class="common-anchor-header">RAG con ricerca full-text<button data-href="#RAG-with-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>L’integrazione della ricerca full-text in un sistema RAG bilancia la ricerca semantica con un recupero preciso e prevedibile basato su parole chiave. È anche possibile scegliere di utilizzare solo la ricerca full-text, sebbene sia consigliabile combinarla con la ricerca semantica per ottenere risultati migliori. A scopo dimostrativo, mostreremo qui sia la ricerca full-text da sola che la ricerca ibrida.</p>
<p>Per iniziare, utilizzare <code translate="no">SimpleDirectoryReaderLoad</code> per caricare il saggio “What I Worked On” di Paul Graham:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: 16b7942f-bf1a-4197-85e1-f31d51ea25a9
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">Ricerca full-text con BM25<button data-href="#Full-Text-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h3><p>L'API <code translate="no">MilvusVectorStore</code> di LlamaIndex supporta la ricerca full-text, consentendo un recupero efficiente basato su parole chiave. Utilizzando una funzione integrata come <code translate="no">sparse_embedding_function</code>, applica il punteggio BM25 per classificare i risultati della ricerca.</p>
<p>In questa sezione, mostreremo come implementare un sistema RAG utilizzando BM25 per la ricerca full-text.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings

<span class="hljs-comment"># Skip dense embedding model</span>
Settings.embed_model = <span class="hljs-literal">None</span>

<span class="hljs-comment"># Build Milvus vector store creating a new collection</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    enable_dense=<span class="hljs-literal">False</span>,
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Only enable sparse to demo full text search</span>
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Store documents in Milvus</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Embeddings have been explicitly disabled. Using MockEmbedding.
</code></pre>
<p>Il codice sopra riportato inserisce documenti di esempio in Milvus e crea un indice per abilitare il ranking BM25 per la ricerca full-text. Disabilita il dense embedding e utilizza <code translate="no">BM25BuiltInFunction</code> con i parametri predefiniti.</p>
<p>È possibile specificare i campi di input e output nei parametri di <code translate="no">BM25BuiltInFunction</code>:</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: Il campo di testo di input (impostazione predefinita: “text”). Indica a quale campo di testo viene applicato l’algoritmo BM25. Modificarlo se si utilizza una propria collezione con un nome diverso per il campo di testo.</li>
<li><code translate="no">output_field_names (str)</code>: Il campo in cui vengono memorizzati i risultati di questa funzione BM25 (impostazione predefinita: “sparse_embedding”).</li>
</ul>
<p>Una volta configurato l’archivio vettoriale, è possibile eseguire query di ricerca full-text utilizzando Milvus con la modalità di query “sparse” o “text_search”:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;sparse&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. They learned about the importance of growth
rate as the ultimate test of a startup, the value of building stores for users to understand retail
and software usability, and the significance of being the &quot;entry level&quot; option in a market.
Additionally, they discovered the accidental success of making Viaweb inexpensive, the challenges of
hiring too many people, and the relief felt when the company was acquired by Yahoo.
</code></pre>
<h4 id="Customize-text-analyzer" class="common-anchor-header">Personalizzazione dell’analizzatore di testo</h4><p>Gli analizzatori svolgono un ruolo fondamentale nella ricerca full-text, suddividendo le frasi in token ed eseguendo l’elaborazione lessicale, come lo stemming e la rimozione delle parole vuote. Sono tipicamente specifici per ogni lingua. Per ulteriori dettagli, consultare <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">la Guida agli analizzatori di Milvus</a>.</p>
<p>Milvus supporta due tipi di analizzatori: <strong>analizzatori integrati</strong> e <strong>analizzatori personalizzati</strong>. Per impostazione predefinita, l’ <code translate="no">BM25BuiltInFunction</code> e utilizza l’analizzatore integrato standard, che tokenizza il testo in base alla punteggiatura.</p>
<p>Per utilizzare un analizzatore diverso o personalizzare quello esistente, è possibile passare un valore all’argomento ` <code translate="no">analyzer_params</code> `:</p>
<pre><code translate="no" class="language-python">bm25_function = BM25BuiltInFunction(
    analyzer_params={
        <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom cap size of a single token</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom stopwords</span>
        ],
    },
    enable_match=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">Ricerca ibrida con Reranker<button data-href="#Hybrid-Search-with-Reranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Un sistema di ricerca ibrido combina la ricerca semantica e la ricerca full-text, ottimizzando le prestazioni di recupero in un sistema RAG.</p>
<p>L’esempio seguente utilizza l’embedding di OpenAI per la ricerca semantica e BM25 per la ricerca full-text:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index over the documnts</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    <span class="hljs-comment"># enable_dense=True,  # enable_dense defaults to True</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># hybrid_ranker=&quot;RRFRanker&quot;,  # hybrid_ranker defaults to &quot;RRFRanker&quot;</span>
    <span class="hljs-comment"># hybrid_ranker_params={},  # hybrid_ranker_params defaults to {}</span>
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    embed_model=<span class="hljs-string">&quot;default&quot;</span>,  <span class="hljs-comment"># &quot;default&quot; will use OpenAI embedding</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Come funziona</strong></p>
<p>Questo approccio memorizza i documenti in una collezione Milvus con entrambi i campi vettoriali:</p>
<ul>
<li><code translate="no">embedding</code>: embedding densi generati dal modello di embedding di OpenAI per la ricerca semantica.</li>
<li><code translate="no">sparse_embedding</code>: Embedding sparsi calcolati utilizzando BM25BuiltInFunction per la ricerca full-text.</li>
</ul>
<p>Inoltre, abbiamo applicato una strategia di riorganizzazione dei risultati utilizzando “RRFRanker” con i suoi parametri predefiniti. Per personalizzare il riorganizzatore, è possibile configurare <code translate="no">hybrid_ranker</code> e <code translate="no">hybrid_ranker_params</code> seguendo la <a href="https://milvus.io/docs/weighted-ranker.md">Guida alla riorganizzazione di Milvus</a>.</p>
<p>Ora, proviamo il sistema RAG con una query di esempio:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query</span>
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. These included the importance of
understanding growth rate as the ultimate test of a startup, the impact of hiring too many people,
the challenges of being at the mercy of investors, and the relief experienced when Yahoo bought the
company. Additionally, the author learned about the significance of user feedback, the value of
building stores for users, and the realization that growth rate is crucial for the long-term success
of a startup.
</code></pre>
<p>Questo approccio ibrido garantisce risposte più accurate e sensibili al contesto in un sistema RAG, sfruttando sia il recupero semantico che quello basato sulle parole chiave.</p>
