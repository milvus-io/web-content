---
id: hdbscan_clustering_with_milvus.md
summary: >-
  In questo quaderno, utilizzeremo il modello di embedding BGE-M3 per estrarre
  gli embedding da un set di dati di notizie, utilizzeremo Milvus per calcolare
  in modo efficiente le distanze tra gli embedding per aiutare HDBSCAN nella
  clusterizzazione e quindi visualizzeremo i risultati per l'analisi con il
  metodo UMAP. Questo quaderno è un adattamento Milvus dell'articolo di Dylan
  Castillo.
title: Raggruppamento HDBSCAN con Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hdbscan_clustering_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hdbscan_clustering_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="HDBSCAN-Clustering-with-Milvus" class="common-anchor-header">Raggruppamento HDBSCAN con Milvus<button data-href="#HDBSCAN-Clustering-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>I dati possono essere trasformati in embeddings utilizzando modelli di deep learning, che catturano rappresentazioni significative dei dati originali. Applicando un algoritmo di clustering non supervisionato, possiamo raggruppare punti di dati simili in base ai loro modelli intrinseci. HDBSCAN (Hierarchical Density-Based Spatial Clustering of Applications with Noise) è un algoritmo di clustering ampiamente utilizzato che raggruppa in modo efficiente i punti di dati analizzandone la densità e la distanza. È particolarmente utile per scoprire cluster di forme e dimensioni diverse. In questo quaderno utilizzeremo HDBSCAN con Milvus, un database vettoriale ad alte prestazioni, per raggruppare i punti di dati in gruppi distinti in base alle loro incorporazioni.</p>
<p>HDBSCAN (Hierarchical Density-Based Spatial Clustering of Applications with Noise) è un algoritmo di clustering che si basa sul calcolo delle distanze tra i punti di dati nello spazio delle incorporazioni. Questi embeddings, creati da modelli di deep learning, rappresentano i dati in forma altamente dimensionale. Per raggruppare punti di dati simili, HDBSCAN ne determina la vicinanza e la densità, ma il calcolo efficiente di queste distanze, soprattutto per i grandi insiemi di dati, può essere impegnativo.</p>
<p>Milvus, un database vettoriale ad alte prestazioni, ottimizza questo processo memorizzando e indicizzando le incorporazioni, consentendo un rapido recupero di vettori simili. Se utilizzati insieme, HDBSCAN e Milvus consentono di raggruppare in modo efficiente insiemi di dati di grandi dimensioni nello spazio delle incorporazioni.</p>
<p>In questo notebook, utilizzeremo il modello di embedding BGE-M3 per estrarre gli embedding da un set di dati di notizie, utilizzeremo Milvus per calcolare in modo efficiente le distanze tra gli embedding per aiutare HDBSCAN nel clustering e visualizzeremo i risultati per l'analisi con il metodo UMAP. Questo quaderno è un adattamento Milvus dell'<a href="https://dylancastillo.co/posts/clustering-documents-with-openai-langchain-hdbscan.html">articolo di Dylan Castillo</a>.</p>
<h2 id="Preparation" class="common-anchor-header">Preparazione<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>scaricare il set di dati delle notizie da https://www.kaggle.com/datasets/dylanjcastillo/news-headlines-2024/</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install hdbscan</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install plotly</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install umap-learn</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Download-Data" class="common-anchor-header">Scaricare i dati<button data-href="#Download-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Scaricare il dataset delle notizie da https://www.kaggle.com/datasets/dylanjcastillo/news-headlines-2024/, estrarre <code translate="no">news_data_dedup.csv</code> e metterlo nella directory corrente.</p>
<p>Oppure si può scaricare tramite curl:</p>
<pre><code translate="no" class="language-bash">%%bash
curl -L -o ~/Downloads/news-headlines-2024.zip\
  https://www.kaggle.com/api/v1/datasets/download/dylanjcastillo/news-headlines-2024
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0 --:--:--     0
100  225k  100  225k    0     0  33151      0  0:00:06  0:00:06 --:--:-- 62160:03  114k  0:00:07  0:00:06  0:00:01 66615    0  30519      0  0:00:07  0:00:06  0:00:01 61622
</code></pre>
<h2 id="Extract-Embeddings-to-Milvus" class="common-anchor-header">Estrarre gli embeddings in Milvus<button data-href="#Extract-Embeddings-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Creeremo una raccolta utilizzando Milvus ed estrarremo le incorporazioni dense utilizzando il modello BGE-M3.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
<span class="hljs-keyword">from</span> dotenv <span class="hljs-keyword">import</span> load_dotenv
<span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, Collection, connections, CollectionSchema, DataType

load_dotenv()

df = pd.read_csv(<span class="hljs-string">&quot;news_data_dedup.csv&quot;</span>)


docs = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{title}</span>\n<span class="hljs-subst">{description}</span>&quot;</span> <span class="hljs-keyword">for</span> title, description <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(df.title, df.description)
]
ef = BGEM3EmbeddingFunction()

embeddings = ef(docs)[<span class="hljs-string">&quot;dense&quot;</span>]

connections.connect(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<ul>
<li>Se si ha bisogno di un database vettoriale locale solo per dati su piccola scala o per la prototipazione, l'impostazione dell'uri come file locale, ad esempio<code translate="no">./milvus.db</code>, è il metodo più conveniente, poiché utilizza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> per memorizzare tutti i dati in questo file.</li>
<li>Se si dispone di una grande quantità di dati, ad esempio più di un milione di vettori, è possibile configurare un server Milvus più performante su <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>. In questa configurazione, utilizzare l'indirizzo e la porta del server come uri, ad esempio<code translate="no">http://localhost:19530</code>. Se si attiva la funzione di autenticazione su Milvus, utilizzare "<your_username>:<your_password>" come token, altrimenti non impostare il token.</li>
<li>Se si utilizza <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito da Milvus, impostare <code translate="no">uri</code> e <code translate="no">token</code>, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">endpoint pubblico e alla chiave API</a> di Zilliz Cloud.</li>
</ul>
</blockquote>
</div>
<pre><code translate="no" class="language-python">fields = [
    FieldSchema(
        name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>
    ),  <span class="hljs-comment"># Primary ID field</span>
    FieldSchema(
        name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>
    ),  <span class="hljs-comment"># Float vector field (embedding)</span>
    FieldSchema(
        name=<span class="hljs-string">&quot;text&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>
    ),  <span class="hljs-comment"># Float vector field (embedding)</span>
]

schema = CollectionSchema(fields=fields, description=<span class="hljs-string">&quot;Embedding collection&quot;</span>)

collection = Collection(name=<span class="hljs-string">&quot;news_data&quot;</span>, schema=schema)

<span class="hljs-keyword">for</span> doc, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(docs, embeddings):
    collection.insert({<span class="hljs-string">&quot;text&quot;</span>: doc, <span class="hljs-string">&quot;embedding&quot;</span>: embedding})
    <span class="hljs-built_in">print</span>(doc)

index_params = {<span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;FLAT&quot;</span>, <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}}

collection.create_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_params=index_params)

collection.flush()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Construct-the-Distance-Matrix-for-HDBSCAN" class="common-anchor-header">Costruire la matrice di distanza per HDBSCAN<button data-href="#Construct-the-Distance-Matrix-for-HDBSCAN" class="anchor-icon" translate="no">
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
    </button></h2><p>HDBSCAN richiede il calcolo delle distanze tra i punti per il clustering, che può essere computazionalmente intenso. Poiché i punti distanti hanno una minore influenza sull'assegnazione dei cluster, è possibile migliorare l'efficienza calcolando i top-k vicini. In questo esempio, utilizziamo l'indice FLAT, ma per i dataset di grandi dimensioni, Milvus supporta metodi di indicizzazione più avanzati per accelerare il processo di ricerca. Per prima cosa, dobbiamo ottenere un iteratore per iterare la collezione Milvus creata in precedenza.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> hdbscan
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
<span class="hljs-keyword">import</span> plotly.express <span class="hljs-keyword">as</span> px
<span class="hljs-keyword">from</span> umap <span class="hljs-keyword">import</span> UMAP
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection = Collection(name=<span class="hljs-string">&quot;news_data&quot;</span>)
collection.load()

iterator = collection.query_iterator(
    batch_size=<span class="hljs-number">10</span>, expr=<span class="hljs-string">&quot;id &gt; 0&quot;</span>, output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>]
)

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
}  <span class="hljs-comment"># L2 is Euclidean distance</span>

ids = []
dist = {}

embeddings = []
<button class="copy-code-btn"></button></code></pre>
<p>Si itereranno tutte le incorporazioni presenti nella collezione Milvus. Per ogni incorporamento, cercheremo i suoi vicini top-k nella stessa collezione, ottenendo i loro id e le loro distanze. Poi dobbiamo anche costruire un dizionario per mappare l'ID originale a un indice continuo nella matrice delle distanze. Al termine, dobbiamo creare una matrice di distanza inizializzata con tutti gli elementi all'infinito e riempire gli elementi cercati. In questo modo, la distanza tra punti lontani sarà ignorata. Infine, utilizziamo la libreria HDBSCAN per raggruppare i punti utilizzando la matrice di distanza creata. È necessario impostare la metrica su 'precomputed' per indicare che i dati sono matrici di distanza piuttosto che embeddings originali.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    batch = iterator.<span class="hljs-built_in">next</span>()
    batch_ids = [data[<span class="hljs-string">&quot;id&quot;</span>] <span class="hljs-keyword">for</span> data <span class="hljs-keyword">in</span> batch]
    ids.extend(batch_ids)

    query_vectors = [data[<span class="hljs-string">&quot;embedding&quot;</span>] <span class="hljs-keyword">for</span> data <span class="hljs-keyword">in</span> batch]
    embeddings.extend(query_vectors)

    results = collection.search(
        data=query_vectors,
        limit=<span class="hljs-number">50</span>,
        anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
        param=search_params,
        output_fields=[<span class="hljs-string">&quot;id&quot;</span>],
    )
    <span class="hljs-keyword">for</span> i, batch_id <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(batch_ids):
        dist[batch_id] = []
        <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results[i]:
            dist[batch_id].append((result.<span class="hljs-built_in">id</span>, result.distance))

    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(batch) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">break</span>

ids2index = {}

<span class="hljs-keyword">for</span> <span class="hljs-built_in">id</span> <span class="hljs-keyword">in</span> dist:
    ids2index[<span class="hljs-built_in">id</span>] = <span class="hljs-built_in">len</span>(ids2index)

dist_metric = np.full((<span class="hljs-built_in">len</span>(ids), <span class="hljs-built_in">len</span>(ids)), np.inf, dtype=np.float64)

<span class="hljs-keyword">for</span> <span class="hljs-built_in">id</span> <span class="hljs-keyword">in</span> dist:
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> dist[<span class="hljs-built_in">id</span>]:
        dist_metric[ids2index[<span class="hljs-built_in">id</span>]][ids2index[result[<span class="hljs-number">0</span>]]] = result[<span class="hljs-number">1</span>]

h = hdbscan.HDBSCAN(min_samples=<span class="hljs-number">3</span>, min_cluster_size=<span class="hljs-number">3</span>, metric=<span class="hljs-string">&quot;precomputed&quot;</span>)
hdb = h.fit(dist_metric)
<button class="copy-code-btn"></button></code></pre>
<p>Al termine di questa operazione, il clustering HDBSCAN è terminato. È possibile ottenere alcuni dati e mostrarne il cluster. Si noti che alcuni dati non saranno assegnati a nessun cluster, il che significa che sono rumore, perché sono situati in una regione rada.</p>
<h2 id="Clusters-Visualization-using-UMAP" class="common-anchor-header">Visualizzazione dei cluster con UMAP<button data-href="#Clusters-Visualization-using-UMAP" class="anchor-icon" translate="no">
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
    </button></h2><p>Abbiamo già clusterizzato i dati usando HDBSCAN e possiamo ottenere le etichette per ogni punto dati. Tuttavia, utilizzando alcune tecniche di visualizzazione, possiamo ottenere l'immagine completa dei cluster per un'analisi intuitiva. Ora utilizzeremo UMAP per visualizzare i cluster. UMAP è un metodo efficiente utilizzato per la riduzione della dimensionalità, che preserva la struttura dei dati ad alta densità proiettandoli in uno spazio a bassa densità per la visualizzazione o l'analisi successiva. Anche in questo caso, iteriamo i punti di dati e otteniamo l'id e il testo dei dati originali, quindi usiamo ploty per tracciare i punti di dati con questi metainfo in una figura e usiamo colori diversi per rappresentare i diversi cluster.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> plotly.io <span class="hljs-keyword">as</span> pio

pio.renderers.default = <span class="hljs-string">&quot;notebook&quot;</span>

umap = UMAP(n_components=<span class="hljs-number">2</span>, random_state=<span class="hljs-number">42</span>, n_neighbors=<span class="hljs-number">80</span>, min_dist=<span class="hljs-number">0.1</span>)

df_umap = (
    pd.DataFrame(umap.fit_transform(np.array(embeddings)), columns=[<span class="hljs-string">&quot;x&quot;</span>, <span class="hljs-string">&quot;y&quot;</span>])
    .assign(cluster=<span class="hljs-keyword">lambda</span> df: hdb.labels_.astype(<span class="hljs-built_in">str</span>))
    .query(<span class="hljs-string">&#x27;cluster != &quot;-1&quot;&#x27;</span>)
    .sort_values(by=<span class="hljs-string">&quot;cluster&quot;</span>)
)
iterator = collection.query_iterator(
    batch_size=<span class="hljs-number">10</span>, expr=<span class="hljs-string">&quot;id &gt; 0&quot;</span>, output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)

ids = []
texts = []

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    batch = iterator.<span class="hljs-built_in">next</span>()
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(batch) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">break</span>
    batch_ids = [data[<span class="hljs-string">&quot;id&quot;</span>] <span class="hljs-keyword">for</span> data <span class="hljs-keyword">in</span> batch]
    batch_texts = [data[<span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-keyword">for</span> data <span class="hljs-keyword">in</span> batch]
    ids.extend(batch_ids)
    texts.extend(batch_texts)

show_texts = [texts[i] <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> df_umap.index]

df_umap[<span class="hljs-string">&quot;hover_text&quot;</span>] = show_texts
fig = px.scatter(
    df_umap, x=<span class="hljs-string">&quot;x&quot;</span>, y=<span class="hljs-string">&quot;y&quot;</span>, color=<span class="hljs-string">&quot;cluster&quot;</span>, hover_data={<span class="hljs-string">&quot;hover_text&quot;</span>: <span class="hljs-literal">True</span>}
)
fig.show()
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/images/hdbscan_clustering_with_milvus.png" alt="image" class="doc-image" id="image" />
   </span> <span class="img-wrapper"> <span>immagine</span> </span></p>
<p>Qui dimostriamo che i dati sono ben raggruppati e che è possibile passare il mouse sui punti per controllare il testo che rappresentano. Con questo quaderno speriamo che impariate a usare HDBSCAN per clusterizzare in modo efficiente gli embeddings con Milvus, che può essere applicato anche ad altri tipi di dati. Combinato con modelli linguistici di grandi dimensioni, questo approccio consente un'analisi più approfondita dei dati su larga scala.</p>
