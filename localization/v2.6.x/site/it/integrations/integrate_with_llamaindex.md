---
id: integrate_with_llamaindex.md
summary: >-
  Questa guida mostra come costruire un sistema di Retrieval-Augmented
  Generation (RAG) utilizzando LlamaIndex e Milvus.
title: Generazione Aumentata dal Recupero (RAG) con Milvus e LlamaIndex
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="common-anchor-header">Generazione Aumentata dal Recupero (RAG) con Milvus e LlamaIndex<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>Questa guida mostra come costruire un sistema di Retrieval-Augmented Generation (RAG) utilizzando LlamaIndex e Milvus.</p>
<p>Il sistema RAG combina un sistema di recupero con un modello generativo per generare nuovo testo in base a un prompt dato. Il sistema recupera prima i documenti rilevanti da un corpus utilizzando Milvus e poi utilizza un modello generativo per generare nuovo testo sulla base dei documenti recuperati.</p>
<p><a href="https://www.llamaindex.ai/">LlamaIndex</a> è un framework di dati semplice e flessibile per collegare fonti di dati personalizzate a grandi modelli linguistici (LLM). <a href="https://milvus.io/">Milvus</a> è il database vettoriale open-source più avanzato al mondo, costruito per alimentare le applicazioni di ricerca di similarità e di intelligenza artificiale.</p>
<p>In questo quaderno mostreremo una rapida dimostrazione dell'uso di MilvusVectorStore.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Prima di iniziare<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-dependencies" class="common-anchor-header">Installare le dipendenze</h3><p>Gli snippet di codice di questa pagina richiedono le dipendenze pymilvus e llamaindex. È possibile installarle utilizzando i seguenti comandi:</p>
<pre><code translate="no" class="language-python">$ pip install pymilvus&gt;=<span class="hljs-number">2.4</span><span class="hljs-number">.2</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index-vector-stores-milvus
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se si utilizza Google Colab, per abilitare le dipendenze appena installate potrebbe essere necessario <strong>riavviare il runtime</strong>. (Fare clic sul menu "Runtime" nella parte superiore dello schermo e selezionare "Riavvia sessione" dal menu a discesa).</p>
</div>
<h3 id="Setup-OpenAI" class="common-anchor-header">Configurazione di OpenAI</h3><p>Per prima cosa aggiungiamo la chiave openai api. Questo ci permetterà di accedere a chatgpt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-data" class="common-anchor-header">Preparare i dati</h3><p>È possibile scaricare i dati di esempio con i seguenti comandi:</p>
<pre><code translate="no" class="language-python">! mkdir -p <span class="hljs-string">&#x27;data/&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham_essay.txt&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/uber_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">Per iniziare<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Generate-our-data" class="common-anchor-header">Generare i dati</h3><p>Come primo esempio, generiamo un documento dal file <code translate="no">paul_graham_essay.txt</code>. Si tratta di un singolo saggio di Paul Graham intitolato <code translate="no">What I Worked On</code>. Per generare i documenti utilizzeremo SimpleDirectoryReader.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(
    input_files=[<span class="hljs-string">&quot;./data/paul_graham_essay.txt&quot;</span>]
).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document ID: 95f25e4d-f270-4650-87ce-006d69d82033
</code></pre>
<h3 id="Create-an-index-across-the-data" class="common-anchor-header">Creare un indice sui dati</h3><p>Ora che abbiamo un documento, possiamo creare un indice e inserire il documento. Per l'indice useremo un MilvusVectorStore. MilvusVectorStore accetta alcuni argomenti:</p>
<h4 id="basic-args" class="common-anchor-header">argomenti di base</h4><ul>
<li><code translate="no">uri (str, optional)</code>: L'URI a cui connettersi, sotto forma di "https://address:port" per il servizio Milvus o Zilliz Cloud, o "path/to/local/milvus.db" per il Milvus locale lite. Il valore predefinito è "./milvus_llamaindex.db".</li>
<li><code translate="no">token (str, optional)</code>: Il token per l'accesso. Vuoto se non si usa rbac, se si usa rbac sarà molto probabilmente "username:password".</li>
<li><code translate="no">collection_name (str, optional)</code>: Il nome della raccolta in cui verranno memorizzati i dati. Il valore predefinito è "llamalection".</li>
<li><code translate="no">overwrite (bool, optional)</code>: Sovrascrivere o meno l'insieme esistente con lo stesso nome. L'impostazione predefinita è False.</li>
</ul>
<h4 id="scalar-fields-including-doc-id--text" class="common-anchor-header">campi scalari, compresi id doc e testo</h4><ul>
<li><code translate="no">doc_id_field (str, optional)</code>: Il nome del campo doc_id per la raccolta. Il valore predefinito è DEFAULT_DOC_ID_KEY.</li>
<li><code translate="no">text_key (str, optional)</code>: Quale testo chiave è memorizzato nella raccolta passata. Utilizzato quando si porta la propria raccolta. Il valore predefinito è DEFAULT_TEXT_KEY.</li>
<li><code translate="no">scalar_field_names (list, optional)</code>: I nomi dei campi scalari extra da includere nello schema della collezione.</li>
<li><code translate="no">scalar_field_types (list, optional)</code>: I tipi dei campi scalari extra.</li>
</ul>
<h4 id="dense-field" class="common-anchor-header">campo denso</h4><ul>
<li><code translate="no">enable_dense (bool)</code>: Un flag booleano per abilitare o disabilitare l'incorporazione densa. L'impostazione predefinita è True.</li>
<li><code translate="no">dim (int, optional)</code>: La dimensione dei vettori di incorporamento per la collezione. Richiesto quando si crea una nuova collezione con enable_sparse è False.</li>
<li><code translate="no">embedding_field (str, optional)</code>: Il nome del campo di incorporamento denso per l'insieme, predefinito a DEFAULT_EMBEDDING_KEY.</li>
<li><code translate="no">index_config (dict, optional)</code>: La configurazione usata per costruire l'indice di incorporamento denso. Per impostazione predefinita, Nessuno.</li>
<li><code translate="no">search_config (dict, optional)</code>: Configurazione utilizzata per la ricerca nell'indice denso di Milvus. Si noti che deve essere compatibile con il tipo di indice specificato da <code translate="no">index_config</code>. Valore predefinito: Nessuno.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: La metrica di somiglianza da utilizzare per l'incorporazione densa; attualmente supporta IP, COSINE e L2.</li>
</ul>
<h4 id="sparse-field" class="common-anchor-header">campo sparse</h4><ul>
<li><code translate="no">enable_sparse (bool)</code>: Un flag booleano per abilitare o disabilitare l'incorporazione rada. L'impostazione predefinita è False.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: Il nome del campo sparse embedding, predefinito a DEFAULT_SPARSE_EMBEDDING_KEY.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: Se enable_sparse è True, questo oggetto deve essere fornito per convertire il testo in un'incorporazione rada. Se None, verrà utilizzata la funzione di incorporamento rado predefinita (BGEM3SparseEmbeddingFunction).</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: La configurazione utilizzata per costruire l'indice di incorporamento sparse. L'impostazione predefinita è Nessuno.</li>
</ul>
<h4 id="hybrid-ranker" class="common-anchor-header">ranker ibrido</h4><ul>
<li><p><code translate="no">hybrid_ranker (str)</code>: Specifica il tipo di ranker utilizzato nelle query di ricerca ibride. Attualmente supporta solo ["RRFRanker", "WeightedRanker"]. L'impostazione predefinita è "RRFRanker".</p></li>
<li><p><code translate="no">hybrid_ranker_params (dict, optional)</code>: Parametri di configurazione per il ranker ibrido. La struttura di questo dizionario dipende dal ranker specifico utilizzato:</p>
<ul>
<li>Per "RRFRanker", dovrebbe includere:<ul>
<li>"k" (int): Un parametro utilizzato nella Reciprocal Rank Fusion (RRF). Questo valore viene utilizzato per calcolare i punteggi di rango come parte dell'algoritmo RRF, che combina più strategie di classificazione in un unico punteggio per migliorare la rilevanza della ricerca.</li>
</ul></li>
<li>Per "WeightedRanker", si aspetta:<ul>
<li>"weights" (elenco di float): Un elenco di esattamente due pesi:<ol>
<li>Il peso per la componente densa dell'incorporazione.</li>
<li>Questi pesi sono usati per regolare l'importanza delle componenti dense e rade delle incorporazioni nel processo di recupero ibrido. L'impostazione predefinita è un dizionario vuoto, il che implica che il classificatore opererà con le impostazioni predefinite.</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<h4 id="others" class="common-anchor-header">altri</h4><ul>
<li><code translate="no">collection_properties (dict, optional)</code>: Le proprietà della collezione, come TTL (Time-To-Live) e MMAP (memory mapping). L'impostazione predefinita è Nessuna. Potrebbe includere:<ul>
<li>"collection.ttl.seconds" (int): Una volta impostata questa proprietà, i dati della raccolta corrente scadono nel tempo specificato. I dati scaduti nell'insieme saranno ripuliti e non saranno coinvolti nelle ricerche o nelle query.</li>
<li>"mmap.enabled" (bool): Abilita o meno l'archiviazione con mappatura della memoria a livello di raccolta.</li>
</ul></li>
<li><code translate="no">index_management (IndexManagement)</code>: Specifica la strategia di gestione degli indici da utilizzare. Per impostazione predefinita, "create_if_not_exists".</li>
<li><code translate="no">batch_size (int)</code>: Configura il numero di documenti elaborati in un batch quando si inseriscono i dati in Milvus. Il valore predefinito è DEFAULT_BATCH_SIZE.</li>
<li><code translate="no">consistency_level (str, optional)</code>: Quale livello di consistenza utilizzare per una raccolta appena creata. Il valore predefinito è "Sessione".</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documents</span>
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Per i parametri di <code translate="no">MilvusVectorStore</code>:</p>
<ul>
<li>L'impostazione di <code translate="no">uri</code> come file locale, ad esempio<code translate="no">./milvus.db</code>, è il metodo più conveniente, poiché utilizza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> per memorizzare tutti i dati in questo file.</li>
<li>Se si dispone di una grande quantità di dati, è possibile configurare un server Milvus più performante su <a href="https://milvus.io/docs/quickstart.md">docker o kubernetes</a>. In questa configurazione, utilizzare l'uri del server, ad esempio<code translate="no">http://localhost:19530</code>, come <code translate="no">uri</code>.</li>
<li>Se si desidera utilizzare <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito per Milvus, è necessario impostare <code translate="no">uri</code> e <code translate="no">token</code>, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">endpoint pubblico e alla chiave Api</a> di Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Query-the-data" class="common-anchor-header">Interrogare i dati</h3><p>Ora che il nostro documento è memorizzato nell'indice, possiamo interrogarlo. L'indice utilizzerà i dati memorizzati al suo interno come base di conoscenza per chatgpt.</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What did the author learn?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned that philosophy courses in college were boring to him, leading him to switch his focus to studying AI.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in her losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
<p>Il test successivo mostra che la sovrascrittura rimuove i dati precedenti.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Document


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    [Document(text=<span class="hljs-string">&quot;The number that is being searched for is ten.&quot;</span>)],
    storage_context,
)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author is the individual who created the context information.
</code></pre>
<p>Il prossimo test mostra l'aggiunta di ulteriori dati a un indice già esistente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">del</span> index, vector_store, storage_context, query_engine

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, overwrite=<span class="hljs-literal">False</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What is the number?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The number is ten.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Paul Graham
</code></pre>
<h2 id="Metadata-filtering" class="common-anchor-header">Filtraggio dei metadati<button data-href="#Metadata-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile generare risultati filtrando fonti specifiche. L'esempio seguente illustra il caricamento di tutti i documenti dalla directory e il successivo filtraggio in base ai metadati.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Load all the two documents loaded before</span>
documents_all = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/&quot;</span>).load_data()

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents_all, storage_context)
<button class="copy-code-btn"></button></code></pre>
<p>Vogliamo recuperare solo i documenti del file <code translate="no">uber_2021.pdf</code>.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;uber_2021.pdf&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges related to the adverse impact on the business and operations, including reduced demand for Mobility offerings globally, affecting travel behavior and demand. Additionally, the pandemic led to driver supply constraints, impacted by concerns regarding COVID-19, with uncertainties about when supply levels would return to normal. The rise of the Omicron variant further affected travel, resulting in advisories and restrictions that could adversely impact both driver supply and consumer demand for Mobility offerings.
</code></pre>
<p>Questa volta otteniamo un risultato diverso se recuperiamo i documenti dal file <code translate="no">paul_graham_essay.txt</code>.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;paul_graham_essay.txt&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in his mother losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
