---
id: full_text_search_with_milvus.md
summary: >-
  La recherche en texte intégral est une méthode traditionnelle qui permet de
  récupérer des documents en faisant correspondre des mots-clés ou des phrases
  spécifiques dans le texte. Elle classe les résultats sur la base de scores de
  pertinence calculés à partir de facteurs tels que la fréquence des termes.
  Alors que la recherche sémantique permet de mieux comprendre le sens et le
  contexte, la recherche en texte intégral excelle dans la correspondance
  précise des mots-clés, ce qui en fait un complément utile à la recherche
  sémantique. Une approche courante de la construction d'un pipeline de
  génération améliorée par la recherche (RAG) consiste à récupérer des documents
  par le biais de la recherche sémantique et de la recherche plein texte, suivie
  d'un processus de reclassement pour affiner les résultats.
title: Recherche en texte intégral avec Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/full_text_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/full_text_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Full-Text-Search-with-Milvus" class="common-anchor-header">Recherche en texte intégral avec Milvus<button data-href="#Full-Text-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>La<a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">recherche en texte intégral</a> est une méthode traditionnelle qui permet de récupérer des documents en faisant correspondre des mots-clés ou des phrases spécifiques dans le texte. Elle classe les résultats en fonction de scores de pertinence calculés à partir de facteurs tels que la fréquence des termes. Alors que la recherche sémantique permet de mieux comprendre le sens et le contexte, la recherche en texte intégral excelle dans la correspondance précise des mots clés, ce qui en fait un complément utile à la recherche sémantique. Une approche courante de la construction d'un pipeline de génération améliorée par la recherche (RAG) consiste à extraire des documents par le biais de la recherche sémantique et de la recherche en texte intégral, suivie d'un processus de reclassement pour affiner les résultats.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Cette approche convertit le texte en vecteurs épars pour la notation BM25. Pour ingérer des documents, les utilisateurs peuvent simplement saisir du texte brut sans calculer manuellement le vecteur épars. Milvus génère et stocke automatiquement les vecteurs épars. Pour rechercher des documents, les utilisateurs doivent simplement spécifier la requête de recherche de texte. Milvus calcule les scores BM25 en interne et renvoie les résultats classés.</p>
<p>Milvus prend également en charge la recherche hybride en combinant la recherche en texte intégral et la recherche sémantique basée sur des vecteurs denses. Cela permet généralement d'améliorer la qualité de la recherche et de fournir de meilleurs résultats aux utilisateurs en équilibrant la correspondance des mots clés et la compréhension sémantique.</p>
<div class="alert note">
<ul>
<li>La recherche en texte intégral est actuellement disponible dans Milvus Standalone, Milvus Distributed et Zilliz Cloud, bien qu'elle ne soit pas encore prise en charge dans Milvus Lite (qui prévoit cette fonctionnalité pour une mise en œuvre future). Contactez support@zilliz.com pour plus d'informations.</li>
</ul>
</div>
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
    </button></h2><h3 id="Install-PyMilvus" class="common-anchor-header">Installer PyMilvus</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus -U</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si vous utilisez Google Colab, pour activer les dépendances qui viennent d'être installées, vous devrez peut-être <strong>redémarrer le runtime</strong> (cliquez sur le menu "Runtime" en haut de l'écran, et sélectionnez "Restart session" dans le menu déroulant).</p>
</div>
<h3 id="Set-OpenAI-API-Key" class="common-anchor-header">Définir la clé API OpenAI</h3><p>Nous utiliserons les modèles d'OpenAI pour créer des embeddings vectoriels et générer des réponses. Vous devez préparer la <a href="https://platform.openai.com/docs/quickstart">clé de l'API</a> <code translate="no">OPENAI_API_KEY</code> comme variable d'environnement.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Setup-and-Configuration" class="common-anchor-header">Installation et configuration<button data-href="#Setup-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Importer les bibliothèques nécessaires</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
    DataType,
    Function,
    FunctionType,
    AnnSearchRequest,
    RRFRanker,
)
<button class="copy-code-btn"></button></code></pre>
<p>Nous utiliserons MilvusClient pour établir une connexion avec le serveur Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect to Milvus</span>
uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
collection_name = <span class="hljs-string">&quot;full_text_demo&quot;</span>
client = MilvusClient(uri=uri)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Pour les connection_args :</p>
<ul>
<li>Vous pouvez configurer un serveur Milvus plus performant sur <a href="https://milvus.io/docs/quickstart.md">docker ou kubernetes</a>. Dans cette configuration, veuillez utiliser l'adresse du serveur, par exemple<code translate="no">http://localhost:19530</code>, comme votre <code translate="no">uri</code>.</li>
<li>Si vous souhaitez utiliser <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, le service en nuage entièrement géré pour Milvus, ajustez les adresses <code translate="no">uri</code> et <code translate="no">token</code>, qui correspondent au <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">point de terminaison public et à la clé Api</a> dans Zilliz Cloud.</li>
</ul>
</div>
<h2 id="Collection-Setup-for-Full-Text-Search" class="common-anchor-header">Configuration de la collection pour la recherche en texte intégral<button data-href="#Collection-Setup-for-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>La configuration d'une collection pour la recherche en texte intégral nécessite plusieurs étapes de configuration. Nous allons les passer en revue une par une.</p>
<h3 id="Text-Analysis-Configuration" class="common-anchor-header">Configuration de l'analyse de texte</h3><p>Pour la recherche plein texte, nous définissons comment le texte doit être traité. Les analyseurs sont essentiels à la recherche en texte intégral car ils décomposent les phrases en tokens et effectuent des analyses lexicales telles que le stemming et la suppression des mots vides. Ici, nous définissons simplement un analyseur.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define tokenizer parameters for text analysis</span>
analyzer_params = {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus de détails sur les analyseurs, veuillez vous référer à la <a href="https://milvus.io/docs/analyzer-overview.md">documentation de l'analyseur</a>.</p>
<h3 id="Collection-Schema-and-BM25-Function" class="common-anchor-header">Schéma de collecte et fonction BM25</h3><p>Nous définissons maintenant le schéma avec des champs pour la clé primaire, le contenu du texte, les vecteurs épars (pour la recherche plein texte), les vecteurs denses (pour la recherche sémantique) et les métadonnées. Nous configurons également la fonction BM25 pour la recherche en texte intégral.</p>
<p>La fonction BM25 convertit automatiquement le contenu textuel en vecteurs denses, ce qui permet à Milvus de gérer la complexité de la recherche en texte intégral sans nécessiter la génération manuelle de vecteurs denses.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create schema</span>
schema = MilvusClient.create_schema()
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.VARCHAR,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>,
    max_length=<span class="hljs-number">100</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
    analyzer_params=analyzer_params,
    enable_match=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable text matching</span>
    enable_analyzer=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable text analysis</span>
)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)
schema.add_field(
    field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># Dimension for text-embedding-3-small</span>
)
schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON)

<span class="hljs-comment"># Define BM25 function to generate sparse vectors from text</span>
bm25_function = Function(
    name=<span class="hljs-string">&quot;bm25&quot;</span>,
    function_type=FunctionType.BM25,
    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],
    output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
)

<span class="hljs-comment"># Add the function to schema</span>
schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': False, 'description': '', 'fields': [{'name': 'id', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 100}, 'is_primary': True, 'auto_id': True}, {'name': 'content', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535, 'enable_match': True, 'enable_analyzer': True, 'analyzer_params': {'tokenizer': 'standard', 'filter': ['lowercase']}}}, {'name': 'sparse_vector', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;, 'is_function_output': True}, {'name': 'dense_vector', 'description': '', 'type': &lt;DataType.FLOAT_VECTOR: 101&gt;, 'params': {'dim': 1536}}, {'name': 'metadata', 'description': '', 'type': &lt;DataType.JSON: 23&gt;}], 'enable_dynamic_field': False, 'functions': [{'name': 'bm25', 'description': '', 'type': &lt;FunctionType.BM25: 1&gt;, 'input_field_names': ['content'], 'output_field_names': ['sparse_vector'], 'params': {}}]}
</code></pre>
<h3 id="Indexing-and-Collection-Creation" class="common-anchor-header">Indexation et création de collections</h3><p>Pour optimiser les performances de recherche, nous créons des index pour les champs vectoriels denses et peu denses, puis nous créons la collection dans Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define indexes</span>
index_params = MilvusClient.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
)
index_params.add_index(field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>)

<span class="hljs-comment"># Drop collection if exist</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)
<span class="hljs-comment"># Create the collection</span>
client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; created successfully&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Collection 'full_text_demo' created successfully
</code></pre>
<h2 id="Insert-Data" class="common-anchor-header">Insertion des données<button data-href="#Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir configuré la collection, nous insérons des données en préparant des entités avec un contenu textuel et leurs représentations vectorielles. Définissons une fonction d'intégration, puis insérons des données dans la collection.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up OpenAI for embeddings</span>
openai_client = OpenAI(api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>))
model_name = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>


<span class="hljs-comment"># Define embedding generation function for reuse</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embeddings</span>(<span class="hljs-params">texts: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-type">List</span>[<span class="hljs-built_in">float</span>]]:
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> texts:
        <span class="hljs-keyword">return</span> []

    response = openai_client.embeddings.create(<span class="hljs-built_in">input</span>=texts, model=model_name)
    <span class="hljs-keyword">return</span> [embedding.embedding <span class="hljs-keyword">for</span> embedding <span class="hljs-keyword">in</span> response.data]
<button class="copy-code-btn"></button></code></pre>
<p>Insérer des documents d'exemple dans la collection.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example documents to insert</span>
documents = [
    {
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus is a vector database built for embedding similarity search and AI applications.&quot;</span>,
        <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;documentation&quot;</span>, <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;introduction&quot;</span>},
    },
    {
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Full-text search in Milvus allows you to search using keywords and phrases.&quot;</span>,
        <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;tutorial&quot;</span>, <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;full-text search&quot;</span>},
    },
    {
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Hybrid search combines the power of sparse BM25 retrieval with dense vector search.&quot;</span>,
        <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;blog&quot;</span>, <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;hybrid search&quot;</span>},
    },
]

<span class="hljs-comment"># Prepare entities for insertion</span>
entities = []
texts = [doc[<span class="hljs-string">&quot;content&quot;</span>] <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> documents]
embeddings = get_embeddings(texts)

<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    entities.append(
        {
            <span class="hljs-string">&quot;content&quot;</span>: doc[<span class="hljs-string">&quot;content&quot;</span>],
            <span class="hljs-string">&quot;dense_vector&quot;</span>: embeddings[i],
            <span class="hljs-string">&quot;metadata&quot;</span>: doc.get(<span class="hljs-string">&quot;metadata&quot;</span>, {}),
        }
    )

<span class="hljs-comment"># Insert data</span>
client.insert(collection_name, entities)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(entities)}</span> documents&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Inserted 3 documents
</code></pre>
<h2 id="Perform-Retrieval" class="common-anchor-header">Effectuer une recherche<button data-href="#Perform-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez utiliser de manière flexible les méthodes <code translate="no">search()</code> ou <code translate="no">hybrid_search()</code> pour mettre en œuvre la recherche en texte intégral (éparse), la recherche sémantique (dense) et la recherche hybride afin d'obtenir des résultats de recherche plus robustes et plus précis.</p>
<h3 id="Full-Text-Search" class="common-anchor-header">Recherche en texte intégral</h3><p>La recherche éparse s'appuie sur l'algorithme BM25 pour trouver des documents contenant des mots-clés ou des phrases spécifiques. Cette méthode de recherche traditionnelle excelle dans la recherche de termes précis et est particulièrement efficace lorsque les utilisateurs savent exactement ce qu'ils recherchent.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query for keyword search</span>
query = <span class="hljs-string">&quot;full-text search keywords&quot;</span>

<span class="hljs-comment"># BM25 sparse vectors</span>
results = client.search(
    collection_name=collection_name,
    data=[query],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>],
)
sparse_results = results[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Print results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nSparse Search (Full-text search):&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(sparse_results):
    <span class="hljs-built_in">print</span>(
        <span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>, Content: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>]}</span>&quot;</span>
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Sparse Search (Full-text search):
1. Score: 3.1261, Content: Full-text search in Milvus allows you to search using keywords and phrases.
2. Score: 0.1836, Content: Hybrid search combines the power of sparse BM25 retrieval with dense vector search.
3. Score: 0.1335, Content: Milvus is a vector database built for embedding similarity search and AI applications.
</code></pre>
<h3 id="Semantic-Search" class="common-anchor-header">Recherche sémantique</h3><p>La recherche dense utilise l'intégration de vecteurs pour trouver des documents ayant une signification similaire, même s'ils ne partagent pas exactement les mêmes mots-clés. Cette approche permet de comprendre le contexte et la sémantique, ce qui la rend idéale pour les requêtes en langage plus naturel.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query for semantic search</span>
query = <span class="hljs-string">&quot;How does Milvus help with similarity search?&quot;</span>

<span class="hljs-comment"># Generate embedding for query</span>
query_embedding = get_embeddings([query])[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Semantic search using dense vectors</span>
results = client.search(
    collection_name=collection_name,
    data=[query_embedding],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>],
)
dense_results = results[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Print results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nDense Search (Semantic):&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(dense_results):
    <span class="hljs-built_in">print</span>(
        <span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>, Content: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>]}</span>&quot;</span>
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Dense Search (Semantic):
1. Score: 0.6959, Content: Milvus is a vector database built for embedding similarity search and AI applications.
2. Score: 0.6501, Content: Full-text search in Milvus allows you to search using keywords and phrases.
3. Score: 0.4371, Content: Hybrid search combines the power of sparse BM25 retrieval with dense vector search.
</code></pre>
<h3 id="Hybrid-Search" class="common-anchor-header">Recherche hybride</h3><p>La recherche hybride combine à la fois la recherche en texte intégral et la recherche sémantique dense. Cette approche équilibrée améliore la précision et la robustesse de la recherche en exploitant les points forts des deux méthodes.</p>
<p>La recherche hybride est particulièrement utile dans les applications RAG (Retrieval-Augmented Generation), où la compréhension sémantique et la correspondance précise des mots-clés contribuent à améliorer les résultats de la recherche.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query for hybrid search</span>
query = <span class="hljs-string">&quot;what is hybrid search&quot;</span>

<span class="hljs-comment"># Get query embedding</span>
query_embedding = get_embeddings([query])[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Set up BM25 search request</span>
sparse_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>}
sparse_request = AnnSearchRequest(
    [query], <span class="hljs-string">&quot;sparse_vector&quot;</span>, sparse_search_params, limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Set up dense vector search request</span>
dense_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
dense_request = AnnSearchRequest(
    [query_embedding], <span class="hljs-string">&quot;dense_vector&quot;</span>, dense_search_params, limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Perform hybrid search with reciprocal rank fusion</span>
results = client.hybrid_search(
    collection_name,
    [sparse_request, dense_request],
    ranker=RRFRanker(),  <span class="hljs-comment"># Reciprocal Rank Fusion for combining results</span>
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>],
)
hybrid_results = results[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Print results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nHybrid Search (Combined):&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(hybrid_results):
    <span class="hljs-built_in">print</span>(
        <span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>, Content: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>]}</span>&quot;</span>
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Hybrid Search (Combined):
1. Score: 0.0328, Content: Hybrid search combines the power of sparse BM25 retrieval with dense vector search.
2. Score: 0.0320, Content: Milvus is a vector database built for embedding similarity search and AI applications.
3. Score: 0.0320, Content: Full-text search in Milvus allows you to search using keywords and phrases.
</code></pre>
<h2 id="Answer-Generation" class="common-anchor-header">Génération de réponses<button data-href="#Answer-Generation" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir récupéré les documents pertinents avec la recherche hybride, nous pouvons utiliser un LLM pour générer une réponse complète basée sur les informations récupérées. Il s'agit de la dernière étape d'un pipeline RAG (Retrieval Augmented Generation).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Format retrieved documents into context</span>
context = <span class="hljs-string">&quot;\n\n&quot;</span>.join([doc[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>] <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> hybrid_results])

<span class="hljs-comment"># Create prompt</span>
prompt = <span class="hljs-string">f&quot;&quot;&quot;Answer the following question based on the provided context. 
If the context doesn&#x27;t contain relevant information, just say &quot;I don&#x27;t have enough information to answer this question.&quot;

Context:
<span class="hljs-subst">{context}</span>

Question: <span class="hljs-subst">{query}</span>

Answer:&quot;&quot;&quot;</span>

<span class="hljs-comment"># Call OpenAI API</span>
response = openai_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
    messages=[
        {
            <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>,
            <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a helpful assistant that answers questions based on the provided context.&quot;</span>,
        },
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: prompt},
    ],
)

<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Hybrid search combines the power of sparse BM25 retrieval with dense vector search.
</code></pre>
<p>Voilà, c'est fait ! Vous venez de construire un RAG avec une recherche hybride qui combine la puissance de la recherche plein texte basée sur le BM25 et la recherche sémantique basée sur les vecteurs denses.</p>
