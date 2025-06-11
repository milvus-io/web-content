---
id: hdbscan_clustering_with_milvus.md
summary: >-
  In this notebook, we will use the BGE-M3 embedding model to extract embeddings
  from a news headline dataset, utilize Milvus to efficiently calculate
  distances between embeddings to aid HDBSCAN in clustering, and then visualize
  the results for analysis using the UMAP method. This notebook is a Milvus
  adapation of Dylan Castillo's article.
title: HDBSCAN Clustering with Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/tutorials/quickstart/hdbscan_clustering_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/hdbscan_clustering_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="HDBSCAN-Clustering-with-Milvus" class="common-anchor-header">HDBSCAN Clustering with Milvus<button data-href="#HDBSCAN-Clustering-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Data can be transformed into embeddings using deep learning models, which capture meaningful representations of the original data. By applying an unsupervised clustering algorithm, we can group similar data points together based on their inherent patterns. HDBSCAN (Hierarchical Density-Based Spatial Clustering of Applications with Noise) is a widely used clustering algorithm that efficiently groups data points by analyzing their density and distance. It is particularly useful for discovering clusters of varying shapes and sizes. In this notebook, we will use HDBSCAN with Milvus, a high-performance vector database, to cluster data points into distinct groups based on their embeddings.</p>
<p>HDBSCAN (Hierarchical Density-Based Spatial Clustering of Applications with Noise) is a clustering algorithm that relies on calculating distances between data points in embedding space. These embeddings, created by deep learning models, represent data in a high-dimensional form. To group similar data points, HDBSCAN determines their proximity and density, but efficiently computing these distances, especially for large datasets, can be challenging.</p>
<p>Milvus, a high-performance vector database, optimizes this process by storing and indexing embeddings, allowing for fast retrieval of similar vectors. When used together, HDBSCAN and Milvus enable efficient clustering of large-scale datasets in embedding space.</p>
<p>In this notebook, we will use the BGE-M3 embedding model to extract embeddings from a news headline dataset, utilize Milvus to efficiently calculate distances between embeddings to aid HDBSCAN in clustering, and then visualize the results for analysis using the UMAP method. This notebook is a Milvus adapation of <a href="https://dylancastillo.co/posts/clustering-documents-with-openai-langchain-hdbscan.html">Dylan Castillo’s article</a>.</p>
<h2 id="Preparation" class="common-anchor-header">Preparation<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>download news dataset from https://www.kaggle.com/datasets/dylanjcastillo/news-headlines-2024/</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install hdbscan</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install plotly</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install umap-learn</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Download-Data" class="common-anchor-header">Download Data<button data-href="#Download-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Download news dataset from https://www.kaggle.com/datasets/dylanjcastillo/news-headlines-2024/, extract <code translate="no">news_data_dedup.csv</code> and put it into current directory.</p>
<p>Or you can download via curl:</p>
<pre><code translate="no" class="language-bash">%%bash
curl -L -o ~/Downloads/news-headlines-2024.zip\
  https://www.kaggle.com/api/v1/datasets/download/dylanjcastillo/news-headlines-2024
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0 --:--:--     0
100  225k  100  225k    0     0  33151      0  0:00:06  0:00:06 --:--:-- 62160:03  114k  0:00:07  0:00:06  0:00:01 66615    0  30519      0  0:00:07  0:00:06  0:00:01 61622
</code></pre>
<h2 id="Extract-Embeddings-to-Milvus" class="common-anchor-header">Extract Embeddings to Milvus<button data-href="#Extract-Embeddings-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>We will create a collection using Milvus, and extract dense embeddings using BGE-M3 model.</p>
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
<li>If you only need a local vector database for small scale data or prototyping, setting the uri as a local file, e.g.<code translate="no">./milvus.db</code>, is the most convenient method, as it automatically utilizes <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> to store all data in this file.</li>
<li>If you have large scale of data, say more than a million vectors, you can set up a more performant Milvus server on <a href="https://milvus.io/docs/quickstart.md">Docker or Kubernetes</a>. In this setup, please use the server address and port as your uri, e.g.<code translate="no">http://localhost:19530</code>. If you enable the authentication feature on Milvus, use “<your_username>:<your_password>” as the token, otherwise don’t set the token.</li>
<li>If you use <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, the fully managed cloud service for Milvus, adjust the <code translate="no">uri</code> and <code translate="no">token</code>, which correspond to the <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint and API key</a> in Zilliz Cloud.</li>
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
<h2 id="Construct-the-Distance-Matrix-for-HDBSCAN" class="common-anchor-header">Construct the Distance Matrix for HDBSCAN<button data-href="#Construct-the-Distance-Matrix-for-HDBSCAN" class="anchor-icon" translate="no">
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
    </button></h2><p>HDBSCAN requires calculating distances between points for clustering, which can be computationally intensive. Since distant points have less influence on clustering assignments, we can improve efficiency by calculating the top-k nearest neighbors. In this example, we use the FLAT index, but for large-scale datasets, Milvus supports more advanced indexing methods to accelerate the search process.
Firstly, we need to get a iterator to iterate the Milvus collection we previously created.</p>
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
<p>We will iterate all embeddings in the Milvus collection. For each embedding, we will search its top-k neighbors in the same collection, get their ids and distances. Then we also need to build a dictionary to map original ID to a continuous index in the distance matrix. When finished, we need to create a distance matrix which initialized with all elements as infinity and fill the elements we searched. In this way, the distance between far away points will be ignored. Finally we use HDBSCAN library to cluster the points using the distance matrix we created. We need to set metric to ‘precomputed’ to indicate the data is distance matrix rather than origianl embeddings.</p>
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
<p>After this, the HDBSCAN clustering is finished. We can get some data and show its cluster. Note some data will not be assigned to any cluster, which means they are noise, because they are located at some sparse region.</p>
<h2 id="Clusters-Visualization-using-UMAP" class="common-anchor-header">Clusters Visualization using UMAP<button data-href="#Clusters-Visualization-using-UMAP" class="anchor-icon" translate="no">
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
    </button></h2><p>We have already clustered the data using HDBSCAN and can get the labels for each data point. However using some visualization techniques, we can get the whole picture of the clusters for a intuitional analysis. Now we are going the use UMAP to visualize the clusters. UMAP is a efficient methodused for dimensionality reduction, preserving the structure of high-dimensional data while projecting it into a lower-dimensional space for visualization or further analysis. With it, we can visualize original high-dimensional data in 2D or 3D space, and see the clusters clearly.
Here again, we iterate the data points and get the id and text for original data, then we use ploty to plot the data points with these metainfo in a figure, and use different colors to represent different clusters.</p>
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
  <span class="img-wrapper">
    <img translate="no" src="https://github.com/milvus-io/bootcamp/blob/master/pics/hdbscan_clustering_with_milvus.png?raw=true" alt="image" class="doc-image" id="image" />
    <span>image</span>
  </span>
</p>
<p>Here, we demonstrate that the data is well clustered, and you can hover over the points to check the text they represent. With this notebook, we hope you learn how to use HDBSCAN to cluster embeddings with Milvus efficiently, which can also be applied to other types of data. Combined with large language models, this approach allows for deeper analysis of your data at a large scale.</p>
