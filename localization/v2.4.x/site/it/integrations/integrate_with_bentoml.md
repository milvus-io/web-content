---
id: integrate_with_bentoml.md
summary: >-
  Questa guida mostra come utilizzare un modello di embedding open-source e un
  modello a grandi lingue su BentoCloud con il database vettoriale Milvus per
  costruire un'applicazione di Retrieval Augmented Generation (RAG).
title: Generazione Aumentata dal Recupero (RAG) con Milvus e BentoML
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-BentoML" class="common-anchor-header">Generazione Aumentata dal Recupero (RAG) con Milvus e BentoML<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-BentoML" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_bentoml.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a></p>
<h2 id="Introduction" class="common-anchor-header">Introduzione<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa guida illustra come utilizzare un modello di embedding open-source e un modello di grande lingua su BentoCloud con il database vettoriale Milvus per costruire un'applicazione RAG (Retrieval Augmented Generation). BentoCloud è una piattaforma di inferenza AI per team di AI in rapida evoluzione, che offre un'infrastruttura completamente gestita su misura per l'inferenza di modelli. Funziona insieme a BentoML, un framework open-source per la gestione dei modelli, per facilitare la creazione e la distribuzione di servizi di modelli ad alte prestazioni. In questa demo, utilizziamo Milvus Lite come database vettoriale, che è la versione leggera di Milvus che può essere incorporata nelle applicazioni Python.</p>
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
    </button></h2><p>Milvus Lite è disponibile su PyPI. È possibile installarlo tramite pip per Python 3.8+:</p>
<pre><code translate="no" class="language-python">$ pip install -U pymilvus bentoml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se si utilizza Google Colab, per abilitare le dipendenze appena installate, potrebbe essere necessario <strong>riavviare il runtime</strong> (fare clic sul menu "Runtime" nella parte superiore dello schermo e selezionare "Restart session" dal menu a discesa).</p>
</div>
<p>Dopo aver effettuato l'accesso a BentoCloud, possiamo interagire con i servizi BentoCloud distribuiti in Deployments, mentre l'END_POINT e l'API corrispondenti si trovano in Playground -&gt; Python. È possibile scaricare i dati della città <a href="https://github.com/ytang07/bento_octo_milvus_RAG/tree/main/data">qui</a>.</p>
<h2 id="Serving-Embeddings-with-BentoMLBentoCloud" class="common-anchor-header">Servire gli embeddings con BentoML/BentoCloud<button data-href="#Serving-Embeddings-with-BentoMLBentoCloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Per utilizzare questo endpoint, importare <code translate="no">bentoml</code> e impostare un client HTTP utilizzando <code translate="no">SyncHTTPClient</code> specificando l'endpoint e, facoltativamente, il token (se si attiva <code translate="no">Endpoint Authorization</code> su BentoCloud). In alternativa, è possibile utilizzare lo stesso modello servito da BentoML utilizzando il repository <a href="https://github.com/bentoml/BentoSentenceTransformers">Sentence Transformers Embeddings</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> <span class="hljs-type">bentoml</span>

<span class="hljs-variable">BENTO_EMBEDDING_MODEL_END_POINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;BENTO_EMBEDDING_MODEL_END_POINT&quot;</span>
BENTO_API_TOKEN = <span class="hljs-string">&quot;BENTO_API_TOKEN&quot;</span>

embedding_client = bentoml.SyncHTTPClient(
    BENTO_EMBEDDING_MODEL_END_POINT, token=BENTO_API_TOKEN
)
<button class="copy-code-btn"></button></code></pre>
<p>Una volta che ci si connette all'embedding_client, occorre elaborare i dati. Abbiamo fornito diverse funzioni per eseguire la suddivisione e l'incorporazione dei dati.</p>
<p>Leggere i file e preelaborare il testo in un elenco di stringhe.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># naively chunk on newlines</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">chunk_text</span>(<span class="hljs-params">filename: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">list</span>:
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(filename, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> f:
        text = f.read()
    sentences = text.split(<span class="hljs-string">&quot;\n&quot;</span>)
    <span class="hljs-keyword">return</span> sentences
<button class="copy-code-btn"></button></code></pre>
<p>Per prima cosa dobbiamo scaricare i dati della città.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> requests
<span class="hljs-keyword">import</span> urllib.request

<span class="hljs-comment"># set up the data source</span>
repo = <span class="hljs-string">&quot;ytang07/bento_octo_milvus_RAG&quot;</span>
directory = <span class="hljs-string">&quot;data&quot;</span>
save_dir = <span class="hljs-string">&quot;./city_data&quot;</span>
api_url = <span class="hljs-string">f&quot;https://api.github.com/repos/<span class="hljs-subst">{repo}</span>/contents/<span class="hljs-subst">{directory}</span>&quot;</span>


response = requests.get(api_url)
data = response.json()

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> os.path.exists(save_dir):
    os.makedirs(save_dir)

<span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> data:
    <span class="hljs-keyword">if</span> item[<span class="hljs-string">&quot;type&quot;</span>] == <span class="hljs-string">&quot;file&quot;</span>:
        file_url = item[<span class="hljs-string">&quot;download_url&quot;</span>]
        file_path = os.path.join(save_dir, item[<span class="hljs-string">&quot;name&quot;</span>])
        urllib.request.urlretrieve(file_url, file_path)
<button class="copy-code-btn"></button></code></pre>
<p>Quindi, elaboriamo ciascuno dei file disponibili.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># please upload your data directory under this file&#x27;s folder</span>
cities = os.listdir(<span class="hljs-string">&quot;city_data&quot;</span>)
<span class="hljs-comment"># store chunked text for each of the cities in a list of dicts</span>
city_chunks = []
<span class="hljs-keyword">for</span> city <span class="hljs-keyword">in</span> cities:
    chunked = chunk_text(<span class="hljs-string">f&quot;city_data/<span class="hljs-subst">{city}</span>&quot;</span>)
    cleaned = []
    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> chunked:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(chunk) &gt; <span class="hljs-number">7</span>:
            cleaned.append(chunk)
    mapped = {<span class="hljs-string">&quot;city_name&quot;</span>: city.split(<span class="hljs-string">&quot;.&quot;</span>)[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;chunks&quot;</span>: cleaned}
    city_chunks.append(mapped)
<button class="copy-code-btn"></button></code></pre>
<p>Suddivide un elenco di stringhe in un elenco di incorporazioni, ciascuna raggruppata 25 stringhe di testo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embeddings</span>(<span class="hljs-params">texts: <span class="hljs-built_in">list</span></span>) -&gt; <span class="hljs-built_in">list</span>:
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(texts) &gt; <span class="hljs-number">25</span>:
        splits = [texts[x : x + <span class="hljs-number">25</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(texts), <span class="hljs-number">25</span>)]
        embeddings = []
        <span class="hljs-keyword">for</span> split <span class="hljs-keyword">in</span> splits:
            embedding_split = embedding_client.encode(sentences=split)
            embeddings += embedding_split
        <span class="hljs-keyword">return</span> embeddings
    <span class="hljs-keyword">return</span> embedding_client.encode(
        sentences=texts,
    )
<button class="copy-code-btn"></button></code></pre>
<p>Ora dobbiamo abbinare embeddings e pezzi di testo. Dato che l'elenco di embeddings e l'elenco di frasi dovrebbero corrispondere per indice, è possibile scorrere <code translate="no">enumerate</code> attraverso entrambi gli elenchi per abbinarli.</p>
<pre><code translate="no" class="language-python">entries = []
<span class="hljs-keyword">for</span> city_dict <span class="hljs-keyword">in</span> city_chunks:
    <span class="hljs-comment"># No need for the embeddings list if get_embeddings already returns a list of lists</span>
    embedding_list = get_embeddings(city_dict[<span class="hljs-string">&quot;chunks&quot;</span>])  <span class="hljs-comment"># returns a list of lists</span>
    <span class="hljs-comment"># Now match texts with embeddings and city name</span>
    <span class="hljs-keyword">for</span> i, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(embedding_list):
        entry = {
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding,
            <span class="hljs-string">&quot;sentence&quot;</span>: city_dict[<span class="hljs-string">&quot;chunks&quot;</span>][
                i
            ],  <span class="hljs-comment"># Assume &quot;chunks&quot; has the corresponding texts for the embeddings</span>
            <span class="hljs-string">&quot;city&quot;</span>: city_dict[<span class="hljs-string">&quot;city_name&quot;</span>],
        }
        entries.append(entry)
    <span class="hljs-built_in">print</span>(entries)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Inserting-Data-into-a-Vector-Database-for-Retrieval" class="common-anchor-header">Inserire i dati in un database vettoriale per recuperarli<button data-href="#Inserting-Data-into-a-Vector-Database-for-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta preparati gli embeddings e i dati, possiamo inserire i vettori insieme ai metadati in Milvus Lite per la successiva ricerca vettoriale. Il primo passo di questa sezione è avviare un client collegandosi a Milvus Lite. È sufficiente importare il modulo <code translate="no">MilvusClient</code> e inizializzare un client Milvus Lite che si connette al database vettoriale di Milvus Lite. La dimensione della dimensione deriva dalla dimensione del modello di incorporazione, ad esempio il modello Sentence Transformer <code translate="no">all-MiniLM-L6-v2</code> produce vettori di 384 dimensioni.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

COLLECTION_NAME = <span class="hljs-string">&quot;Bento_Milvus_RAG&quot;</span>  <span class="hljs-comment"># random name for your collection</span>
DIMENSION = <span class="hljs-number">384</span>

<span class="hljs-comment"># Initialize a Milvus Lite client</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Come per l'argomento di <code translate="no">MilvusClient</code>:</p>
<ul>
<li>L'impostazione di <code translate="no">uri</code> come file locale, ad esempio<code translate="no">./milvus.db</code>, è il metodo più conveniente, poiché utilizza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> per memorizzare tutti i dati in questo file.</li>
<li>Se si dispone di una grande quantità di dati, è possibile configurare un server Milvus più performante su <a href="https://milvus.io/docs/quickstart.md">docker o kubernetes</a>. In questa configurazione, utilizzare l'uri del server, ad esempio<code translate="no">http://localhost:19530</code>, come <code translate="no">uri</code>.</li>
<li>Se si desidera utilizzare <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito per Milvus, regolare <code translate="no">uri</code> e <code translate="no">token</code>, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">endpoint pubblico e alla chiave Api</a> di Zilliz Cloud.</li>
</ul>
</div>
<p>Oppure con la vecchia API connections.connect (non raccomandata):</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections

connections.<span class="hljs-title function_">connect</span>(uri=<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Creating-Your-Milvus-Lite-Collection" class="common-anchor-header">Creazione della raccolta Milvus Lite<button data-href="#Creating-Your-Milvus-Lite-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>La creazione di una collezione con Milvus Lite comporta due fasi: la prima è la definizione dello schema e la seconda è la definizione dell'indice. Per questa sezione, abbiamo bisogno di un modulo: DataType, che indica il tipo di dati da inserire in un campo. Dobbiamo anche usare due funzioni per creare lo schema e aggiungere campi. create_schema(): crea lo schema di una collezione, add_field(): aggiunge un campo allo schema di una collezione.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Collection

<span class="hljs-comment"># Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 3.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)
<button class="copy-code-btn"></button></code></pre>
<p>Ora che abbiamo creato il nostro schema e definito con successo il campo dati, dobbiamo definire l'indice. In termini di ricerca, un "indice" definisce il modo in cui i dati vengono mappati per essere recuperati. Per questo progetto, utilizziamo la scelta predefinita <a href="https://docs.zilliz.com/docs/autoindex-explained">AUTOINDEX</a> per indicizzare i dati.</p>
<p>Quindi, si crea la collezione con il nome, lo schema e l'indice precedentemente indicati. Infine, inseriamo i dati precedentemente elaborati.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># prepare index parameters</span>
index_params = milvus_client.prepare_index_params()

<span class="hljs-comment"># add index</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># use autoindex instead of other complex indexing method</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,  <span class="hljs-comment"># L2, COSINE, or IP</span>
)

<span class="hljs-comment"># create collection</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(
    collection_name=COLLECTION_NAME, schema=schema, index_params=index_params
)

<span class="hljs-comment"># Outside the loop, now you upsert all the entries at once</span>
milvus_client.insert(collection_name=COLLECTION_NAME, data=entries)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-Your-LLM-for-RAG" class="common-anchor-header">Configurare l'LLM per RAG<button data-href="#Set-up-Your-LLM-for-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>Per creare un'applicazione RAG, dobbiamo distribuire un LLM su BentoCloud. Utilizziamo l'ultimo LLM Llama3. Una volta che è attivo e funzionante, è sufficiente copiare l'endpoint e il token di questo servizio modello e impostare un client per esso.</p>
<pre><code translate="no" class="language-python"><span class="hljs-variable constant_">BENTO_LLM_END_POINT</span> = <span class="hljs-string">&quot;BENTO_LLM_END_POINT&quot;</span>

llm_client = bentoml.<span class="hljs-title class_">SyncHTTPClient</span>(<span class="hljs-variable constant_">BENTO_LLM_END_POINT</span>, token=<span class="hljs-variable constant_">BENTO_API_TOKEN</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="LLM-Instructions" class="common-anchor-header">Istruzioni LLM<button data-href="#LLM-Instructions" class="anchor-icon" translate="no">
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
    </button></h2><p>Ora impostiamo le istruzioni LLM con il prompt, il contesto e la domanda. Ecco la funzione che si comporta come un LLM e che restituisce l'output del client in un formato stringa.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">dorag</span>(<span class="hljs-params">question: <span class="hljs-built_in">str</span>, context: <span class="hljs-built_in">str</span></span>):

    prompt = (
        <span class="hljs-string">f&quot;You are a helpful assistant. The user has a question. Answer the user question based only on the context: <span class="hljs-subst">{context}</span>. \n&quot;</span>
        <span class="hljs-string">f&quot;The user question is <span class="hljs-subst">{question}</span>&quot;</span>
    )

    results = llm_client.generate(
        max_tokens=<span class="hljs-number">1024</span>,
        prompt=prompt,
    )

    res = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
        res += result

    <span class="hljs-keyword">return</span> res
<button class="copy-code-btn"></button></code></pre>
<h2 id="A-RAG-Example" class="common-anchor-header">Un esempio di RAG<button data-href="#A-RAG-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>Ora siamo pronti a porre una domanda. Questa funzione prende semplicemente una domanda e poi esegue una RAG per generare il contesto pertinente dalle informazioni di base. Quindi, si passano il contesto e la domanda a dorag() e si ottiene il risultato.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What state is Cambridge in?&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">ask_a_question</span>(<span class="hljs-params">question</span>):
    embeddings = get_embeddings([question])
    res = milvus_client.search(
        collection_name=COLLECTION_NAME,
        data=embeddings,  <span class="hljs-comment"># search for the one (1) embedding returned as a list of lists</span>
        anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,  <span class="hljs-comment"># Search across embeddings</span>
        limit=<span class="hljs-number">5</span>,  <span class="hljs-comment"># get me the top 5 results</span>
        output_fields=[<span class="hljs-string">&quot;sentence&quot;</span>],  <span class="hljs-comment"># get the sentence/chunk and city</span>
    )

    sentences = []
    <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
        <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
            <span class="hljs-built_in">print</span>(hit)
            sentences.append(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;sentence&quot;</span>])
    context = <span class="hljs-string">&quot;. &quot;</span>.join(sentences)
    <span class="hljs-keyword">return</span> context


context = ask_a_question(question=question)
<span class="hljs-built_in">print</span>(context)
<button class="copy-code-btn"></button></code></pre>
<p>Implementare RAG</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(dorag(question=question, context=context))
<button class="copy-code-btn"></button></code></pre>
<p>Per la domanda di esempio che chiede in quale stato si trova Cambridge, possiamo stampare l'intera risposta da BentoML. Tuttavia, se ci prendiamo il tempo di analizzarla, il risultato è più gradevole e dovrebbe dirci che Cambridge si trova nel Massachusetts.</p>
