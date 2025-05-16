---
id: hdbscan_clustering_with_milvus.md
summary: >-
  Dans ce bloc-notes, nous utiliserons le modèle d'intégration BGE-M3 pour
  extraire les intégrations d'un ensemble de données de titres de journaux, nous
  utiliserons Milvus pour calculer efficacement les distances entre les
  intégrations afin d'aider HDBSCAN dans le regroupement, et nous visualiserons
  ensuite les résultats pour les analyser à l'aide de la méthode UMAP. Ce
  bloc-notes est une adaptation Milvus de l'article de Dylan Castillo.
title: HDBSCAN Clustering avec Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hdbscan_clustering_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/hdbscan_clustering_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="HDBSCAN-Clustering-with-Milvus" class="common-anchor-header">HDBSCAN Clustering avec Milvus<button data-href="#HDBSCAN-Clustering-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Les données peuvent être transformées en embeddings à l'aide de modèles d'apprentissage profond, qui capturent des représentations significatives des données d'origine. En appliquant un algorithme de clustering non supervisé, nous pouvons regrouper des points de données similaires sur la base de leurs modèles inhérents. HDBSCAN (Hierarchical Density-Based Spatial Clustering of Applications with Noise) est un algorithme de clustering largement utilisé qui regroupe efficacement les points de données en analysant leur densité et leur distance. Il est particulièrement utile pour découvrir des grappes de formes et de tailles variées. Dans ce carnet, nous utiliserons HDBSCAN avec Milvus, une base de données vectorielles haute performance, pour regrouper des points de données en groupes distincts sur la base de leurs encastrements.</p>
<p>HDBSCAN (Hierarchical Density-Based Spatial Clustering of Applications with Noise) est un algorithme de clustering qui repose sur le calcul des distances entre les points de données dans l'espace d'intégration. Ces embeddings, créés par des modèles d'apprentissage profond, représentent les données sous une forme hautement dimensionnelle. Pour regrouper des points de données similaires, HDBSCAN détermine leur proximité et leur densité, mais le calcul efficace de ces distances, en particulier pour les grands ensembles de données, peut s'avérer difficile.</p>
<p>Milvus, une base de données vectorielles haute performance, optimise ce processus en stockant et en indexant les encastrements, ce qui permet de retrouver rapidement des vecteurs similaires. Utilisés conjointement, HDBSCAN et Milvus permettent un regroupement efficace d'ensembles de données à grande échelle dans l'espace d'intégration.</p>
<p>Dans ce bloc-notes, nous utiliserons le modèle d'intégration BGE-M3 pour extraire les intégrations d'un ensemble de données de titres de journaux, nous utiliserons Milvus pour calculer efficacement les distances entre les intégrations afin d'aider HDBSCAN dans le regroupement, puis nous visualiserons les résultats pour l'analyse à l'aide de la méthode UMAP. Ce bloc-notes est une adaptation Milvus de l'<a href="https://dylancastillo.co/posts/clustering-documents-with-openai-langchain-hdbscan.html">article de Dylan Castillo</a>.</p>
<h2 id="Preparation" class="common-anchor-header">Préparation<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>Télécharger le jeu de données des actualités sur https://www.kaggle.com/datasets/dylanjcastillo/news-headlines-2024/</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install hdbscan</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install plotly</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install umap-learn</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Download-Data" class="common-anchor-header">Télécharger les données<button data-href="#Download-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Téléchargez l'ensemble de données de https://www.kaggle.com/datasets/dylanjcastillo/news-headlines-2024/, extrayez <code translate="no">news_data_dedup.csv</code> et mettez-le dans le répertoire courant.</p>
<p>Vous pouvez également télécharger via curl :</p>
<pre><code translate="no" class="language-bash">%%bash
curl -L -o ~/Downloads/news-headlines-2024.zip\
  https://www.kaggle.com/api/v1/datasets/download/dylanjcastillo/news-headlines-2024
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0 --:--:--     0
100  225k  100  225k    0     0  33151      0  0:00:06  0:00:06 --:--:-- 62160:03  114k  0:00:07  0:00:06  0:00:01 66615    0  30519      0  0:00:07  0:00:06  0:00:01 61622
</code></pre>
<h2 id="Extract-Embeddings-to-Milvus" class="common-anchor-header">Extraire les Embeddings vers Milvus<button data-href="#Extract-Embeddings-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous allons créer une collection à l'aide de Milvus, et extraire des embeddings denses à l'aide du modèle BGE-M3.</p>
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
<li>Si vous n'avez besoin d'une base de données vectorielle locale que pour des données à petite échelle ou pour le prototypage, la méthode la plus pratique consiste à définir l'uri comme un fichier local, par exemple<code translate="no">./milvus.db</code>, car <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> est automatiquement utilisé pour stocker toutes les données dans ce fichier.</li>
<li>Si vous disposez de données à grande échelle, par exemple plus d'un million de vecteurs, vous pouvez configurer un serveur Milvus plus performant sur <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>. Dans cette configuration, veuillez utiliser l'adresse et le port du serveur comme uri, par exemple<code translate="no">http://localhost:19530</code>. Si vous activez la fonction d'authentification sur Milvus, utilisez "<your_username>:<your_password>" comme jeton, sinon ne définissez pas le jeton.</li>
<li>Si vous utilisez <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, le service en nuage entièrement géré pour Milvus, ajustez les valeurs <code translate="no">uri</code> et <code translate="no">token</code>, qui correspondent au <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">point de terminaison public et à la clé API</a> dans Zilliz Cloud.</li>
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
<h2 id="Construct-the-Distance-Matrix-for-HDBSCAN" class="common-anchor-header">Construire la matrice de distance pour HDBSCAN<button data-href="#Construct-the-Distance-Matrix-for-HDBSCAN" class="anchor-icon" translate="no">
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
    </button></h2><p>HDBSCAN nécessite le calcul des distances entre les points pour le regroupement, ce qui peut nécessiter un calcul intensif. Comme les points éloignés ont moins d'influence sur les affectations de regroupement, nous pouvons améliorer l'efficacité en calculant les k premiers voisins les plus proches. Dans cet exemple, nous utilisons l'index FLAT, mais pour les ensembles de données à grande échelle, Milvus prend en charge des méthodes d'indexation plus avancées afin d'accélérer le processus de recherche. Tout d'abord, nous devons obtenir un itérateur pour parcourir la collection Milvus que nous avons précédemment créée.</p>
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
<p>Nous allons itérer tous les encastrements dans la collection Milvus. Pour chaque encastrement, nous rechercherons ses principaux voisins dans la même collection, nous obtiendrons leurs identifiants et leurs distances. Ensuite, nous devons également construire un dictionnaire pour faire correspondre l'ID original à un index continu dans la matrice de distance. Une fois la recherche terminée, nous devons créer une matrice de distance dont tous les éléments sont initialisés à l'infini et remplir les éléments que nous avons recherchés. De cette manière, la distance entre les points éloignés sera ignorée. Enfin, nous utilisons la bibliothèque HDBSCAN pour regrouper les points à l'aide de la matrice de distance que nous avons créée. Nous devons définir la métrique sur "précalculée" pour indiquer que les données sont des matrices de distance plutôt que des encastrements originaux.</p>
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
<p>Après cela, le regroupement HDBSCAN est terminé. Nous pouvons obtenir des données et afficher leur cluster. Notez que certaines données ne seront assignées à aucun cluster, ce qui signifie qu'il s'agit de bruit, parce qu'elles sont situées dans une région peu dense.</p>
<h2 id="Clusters-Visualization-using-UMAP" class="common-anchor-header">Visualisation des grappes à l'aide de l'UMAP<button data-href="#Clusters-Visualization-using-UMAP" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous avons déjà regroupé les données à l'aide de HDBSCAN et nous pouvons obtenir les étiquettes pour chaque point de données. Cependant, en utilisant certaines techniques de visualisation, nous pouvons obtenir une image complète des grappes pour une analyse intuitive. Nous allons maintenant utiliser UMAP pour visualiser les grappes. UMAP est une méthode efficace utilisée pour la réduction de la dimensionnalité, préservant la structure des données à haute dimension tout en les projetant dans un espace à plus faible dimension pour la visualisation ou une analyse plus approfondie. Ici encore, nous itérons les points de données et obtenons l'identifiant et le texte des données originales, puis nous utilisons ploty pour représenter les points de données avec ces méta-informations dans une figure, et nous utilisons différentes couleurs pour représenter les différents groupes.</p>
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
   </span> <span class="img-wrapper"> <span>Image</span> </span></p>
<p>Ici, nous démontrons que les données sont bien regroupées, et vous pouvez survoler les points pour vérifier le texte qu'ils représentent. Avec ce carnet, nous espérons que vous apprendrez à utiliser HDBSCAN pour regrouper efficacement des embeddings avec Milvus, ce qui peut également être appliqué à d'autres types de données. Combinée à de grands modèles de langage, cette approche permet une analyse plus approfondie de vos données à grande échelle.</p>
