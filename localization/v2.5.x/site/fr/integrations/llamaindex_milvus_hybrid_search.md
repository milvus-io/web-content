---
id: llamaindex_milvus_hybrid_search.md
title: RAG utilise la recherche hybride avec Milvus et LlamaIndex
related_key: LlamaIndex
summary: >-
  Ce carnet montre comment utiliser Milvus pour la recherche hybride dans les
  pipelines RAG [LlamaIndex] (https://www.llamaindex.ai/). Nous commencerons par
  la recherche hybride par défaut recommandée (sémantique + BM25), puis nous
  explorerons d'autres méthodes alternatives d'incorporation de données éparses
  et la personnalisation du reranker hybride.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="common-anchor-header">RAG utilise la recherche hybride avec Milvus et LlamaIndex<button data-href="#RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p>La recherche hybride exploite les forces de la recherche sémantique et de la recherche par mots-clés pour fournir des résultats plus précis et plus pertinents sur le plan contextuel. En combinant les avantages de la recherche sémantique et de la correspondance de mots-clés, la recherche hybride est particulièrement efficace dans les tâches de recherche d'informations complexes.</p>
<p>Ce carnet montre comment utiliser Milvus pour la recherche hybride dans les pipelines RAG de <a href="https://www.llamaindex.ai/">LlamaIndex</a>. Nous commencerons par la recherche hybride par défaut recommandée (sémantique + BM25), puis nous explorerons d'autres méthodes alternatives d'intégration éparse et la personnalisation du reranker hybride.</p>
<h2 id="Prerequisites" class="common-anchor-header">Conditions préalables<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Installer les dépendances</strong></p>
<p>Avant de commencer, assurez-vous que les dépendances suivantes sont installées :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si vous utilisez Google Colab, vous pouvez avoir besoin de <strong>redémarrer le runtime</strong> (Naviguez vers le menu "Runtime" en haut de l'interface, et sélectionnez "Restart session" dans le menu déroulant).</p>
</div>
<p><strong>Configurer les comptes</strong></p>
<p>Ce tutoriel utilise OpenAI pour l'intégration de texte et la génération de réponses. Vous devez préparer la <a href="https://platform.openai.com/api-keys">clé API OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour utiliser le magasin de vecteurs Milvus, indiquez votre serveur Milvus <code translate="no">URI</code> (et éventuellement <code translate="no">TOKEN</code>). Pour démarrer un serveur Milvus, vous pouvez le configurer en suivant le <a href="https://milvus.io/docs/install-overview.md">guide d'installation Milvus</a> ou simplement en essayant gratuitement <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a>.</p>
<blockquote>
<p>La recherche en texte intégral est actuellement prise en charge dans Milvus Standalone, Milvus Distributed et Zilliz Cloud, mais pas encore dans Milvus Lite (prévu pour une mise en œuvre future). Contactez support@zilliz.com pour plus d'informations.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Charger des données d'exemple</strong></p>
<p>Exécutez les commandes suivantes pour télécharger les documents d'exemple dans le répertoire "data/paul_graham" :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>Utilisez ensuite <code translate="no">SimpleDirectoryReaderLoad</code> pour charger l'essai "What I Worked On" de Paul Graham :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: f9cece8c-9022-46d8-9d0e-f29d70e1dbbe
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h2 id="Hybrid-Search-with-BM25" class="common-anchor-header">Recherche hybride avec BM25<button data-href="#Hybrid-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette section montre comment effectuer une recherche hybride à l'aide de la BM25. Pour commencer, nous allons initialiser le site <code translate="no">MilvusVectorStore</code> et créer un index pour les documents d'exemple. La configuration par défaut utilise :</p>
<ul>
<li>des encastrements denses à partir du modèle d'encastrement par défaut (OpenAI's <code translate="no">text-embedding-ada-002</code>)</li>
<li>BM25 pour la recherche en texte intégral si enable_sparse est True</li>
<li>RRFRanker avec k=60 pour combiner les résultats si la recherche hybride est activée.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documnts</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext, VectorStoreIndex


vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># vector dimension depends on the embedding model</span>
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable the default full-text search using BM25</span>
    overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># drop the collection if it already exists</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:16,645 [DEBUG][_create_connection]: Created new connection using: cf0f4df74b18418bb89ec512063c1244 (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
Default sparse embedding function: BM25BuiltInFunction(input_field_names='text', output_field_names='sparse_embedding').
</code></pre>
<p>Voici plus d'informations sur les arguments permettant de configurer les champs denses et épars dans le site <code translate="no">MilvusVectorStore</code>:</p>
<p><strong>champ dense</strong></p>
<ul>
<li><code translate="no">enable_dense (bool)</code>: Un indicateur booléen permettant d'activer ou de désactiver l'intégration dense. La valeur par défaut est True.</li>
<li><code translate="no">dim (int, optional)</code>: La dimension des vecteurs d'intégration pour la collection.</li>
<li><code translate="no">embedding_field (str, optional)</code>: Le nom du champ d'intégration dense pour la collection, la valeur par défaut étant DEFAULT_EMBEDDING_KEY.</li>
<li><code translate="no">index_config (dict, optional)</code>: La configuration utilisée pour construire l'index d'intégration dense. La valeur par défaut est None.</li>
<li><code translate="no">search_config (dict, optional)</code>: La configuration utilisée pour la recherche dans l'index dense Milvus. Notez qu'elle doit être compatible avec le type d'index spécifié par <code translate="no">index_config</code>. La valeur par défaut est None.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: La métrique de similarité à utiliser pour l'intégration dense, actuellement IP, COSINE et L2.</li>
</ul>
<p><strong>champ sparse</strong></p>
<ul>
<li><code translate="no">enable_sparse (bool)</code>: Un indicateur booléen permettant d'activer ou de désactiver l'incorporation éparse. La valeur par défaut est False.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: Le nom du champ d'intégration éparse, par défaut DEFAULT_SPARSE_EMBEDDING_KEY.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: Si enable_sparse est True, cet objet doit être fourni pour convertir le texte en un encodage clairsemé. Si None, la fonction d'incorporation éparse par défaut (BM25BuiltInFunction) sera utilisée, ou utiliser BGEM3SparseEmbedding si la collection existante n'a pas de fonctions intégrées.</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: La configuration utilisée pour construire l'index d'intégration éparse. La valeur par défaut est None.</li>
</ul>
<p>Pour activer la recherche hybride lors de l'étape de recherche, définissez <code translate="no">vector_store_query_mode</code> à "hybrid". Cela combinera et classera les résultats de la recherche sémantique et de la recherche en texte intégral. Testons avec un exemple de requête : "Qu'a appris l'auteur à Viaweb ?":</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned about retail, the importance of user feedback, and the significance of growth
rate as the ultimate test of a startup at Viaweb.
</code></pre>
<h3 id="Customize-text-analyzer" class="common-anchor-header">Personnaliser l'analyseur de texte</h3><p>Les analyseurs jouent un rôle essentiel dans la recherche en texte intégral en décomposant les phrases en tokens et en effectuant un traitement lexical, tel que l'élimination des troncs et des mots vides. Ils sont généralement spécifiques à une langue. Pour plus de détails, voir le <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Guide de l'analyseur Milvus</a>.</p>
<p>Milvus prend en charge deux types d'analyseurs : Les <strong>analyseurs intégrés</strong> et les <strong>analyseurs personnalisés</strong>. Par défaut, si <code translate="no">enable_sparse</code> est défini sur True, <code translate="no">MilvusVectorStore</code> utilise <code translate="no">BM25BuiltInFunction</code> avec les configurations par défaut, en employant l'analyseur intégré standard qui génère du texte en fonction de la ponctuation.</p>
<p>Pour utiliser un autre analyseur ou personnaliser l'analyseur existant, vous pouvez fournir des valeurs à l'argument <code translate="no">analyzer_params</code> lors de la construction de <code translate="no">BM25BuiltInFunction</code>. Ensuite, définissez cette fonction comme <code translate="no">sparse_embedding_function</code> dans <code translate="no">MilvusVectorStore</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction

bm25_function = BM25BuiltInFunction(
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

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=bm25_function,  <span class="hljs-comment"># BM25 with custom analyzer</span>
    overwrite=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:48,085 [DEBUG][_create_connection]: Created new connection using: 61afd81600cb46ee89f887f16bcbfe55 (async_milvus_client.py:547)
</code></pre>
<h2 id="Hybrid-Search-with-Other-Sparse-Embedding" class="common-anchor-header">La recherche hybride avec d'autres encodages épars<button data-href="#Hybrid-Search-with-Other-Sparse-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>Outre la combinaison de la recherche sémantique avec BM25, Milvus prend également en charge la recherche hybride à l'aide d'une fonction d'intégration éparse telle que <a href="https://arxiv.org/abs/2402.03216">BGE-M3</a>. L'exemple suivant utilise la fonction intégrée <code translate="no">BGEM3SparseEmbeddingFunction</code> pour générer des encastrements épars.</p>
<p>Tout d'abord, nous devons installer le paquetage <code translate="no">FlagEmbedding</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -q FlagEmbedding</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ensuite, construisons le magasin de vecteurs et l'index en utilisant le modèle OpenAI par défaut pour l'intégration densen et la fonction intégrée BGE-M3 pour l'intégration sparse :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BGEM3SparseEmbeddingFunction

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BGEM3SparseEmbeddingFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 68871.99it/s]
2025-04-17 03:39:02,074 [DEBUG][_create_connection]: Created new connection using: ff4886e2f8da44e08304b748d9ac9b51 (async_milvus_client.py:547)
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]
</code></pre>
<p>Effectuons maintenant une requête de recherche hybride avec un exemple de question :</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb??&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Chunks: 100%|██████████| 1/1 [00:00&lt;00:00, 17.29it/s]


The author learned about retail, the importance of user feedback, the value of growth rate in a
startup, the significance of pricing strategy, the benefits of working on things that weren't
prestigious, and the challenges and rewards of running a startup.
</code></pre>
<h3 id="Customize-Sparse-Embedding-Function" class="common-anchor-header">Personnaliser la fonction d'intégration éparse</h3><p>Vous pouvez également personnaliser la fonction d'intégration éparse tant qu'elle hérite de <code translate="no">BaseSparseEmbeddingFunction</code>, y compris les méthodes suivantes :</p>
<ul>
<li><code translate="no">encode_queries</code>: Cette méthode convertit les textes en une liste d'intégrations éparses pour les requêtes.</li>
<li><code translate="no">encode_documents</code>: Cette méthode convertit les textes en liste d'encastrements épars pour les documents.</li>
</ul>
<p>La sortie de chaque méthode doit suivre le format de l'intégration éparse, qui est une liste de dictionnaires. Chaque dictionnaire doit avoir une clé (un entier) représentant la dimension et une valeur correspondante (un flottant) représentant l'ampleur de l'intégration dans cette dimension (par exemple, {1 : 0,5, 2 : 0,3}).</p>
<p>Par exemple, voici une implémentation personnalisée d'une fonction d'intégration éparse utilisant BGE-M3 :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> FlagEmbedding <span class="hljs-keyword">import</span> BGEM3FlagModel
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BaseSparseEmbeddingFunction


<span class="hljs-keyword">class</span> <span class="hljs-title class_">ExampleEmbeddingFunction</span>(<span class="hljs-title class_ inherited__">BaseSparseEmbeddingFunction</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.model = BGEM3FlagModel(<span class="hljs-string">&quot;BAAI/bge-m3&quot;</span>, use_fp16=<span class="hljs-literal">False</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_queries</span>(<span class="hljs-params">self, queries: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            queries,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_documents</span>(<span class="hljs-params">self, documents: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            documents,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_to_standard_dict</span>(<span class="hljs-params">self, raw_output</span>):
        result = {}
        <span class="hljs-keyword">for</span> k <span class="hljs-keyword">in</span> raw_output:
            result[<span class="hljs-built_in">int</span>(k)] = raw_output[k]
        <span class="hljs-keyword">return</span> result
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-hybrid-reranker" class="common-anchor-header">Personnalisation du reranker hybride<button data-href="#Customize-hybrid-reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge deux types de <a href="https://milvus.io/docs/reranking.md">stratégies de reclassement</a>: Reciprocal Rank Fusion (RRF) et Weighted Scoring (notation pondérée). Le classeur par défaut dans la recherche hybride <code translate="no">MilvusVectorStore</code> est RRF avec k=60. Pour personnaliser le classificateur hybride, modifiez les paramètres suivants :</p>
<ul>
<li><code translate="no">hybrid_ranker (str)</code>: Spécifie le type de classificateur utilisé dans les requêtes de recherche hybride. Actuellement, seuls ["RRFRanker", "WeightedRanker"] sont pris en charge. La valeur par défaut est "RRFRanker".</li>
<li><code translate="no">hybrid_ranker_params (dict, optional)</code>: Paramètres de configuration du classificateur hybride. La structure de ce dictionnaire dépend du classificateur spécifique utilisé :<ul>
<li>Pour "RRFRanker", il doit comprendre les éléments suivants<ul>
<li>"k" (int) : Un paramètre utilisé dans la fusion réciproque des rangs (RRF). Cette valeur est utilisée pour calculer les scores de classement dans le cadre de l'algorithme RRF, qui combine plusieurs stratégies de classement en un seul score afin d'améliorer la pertinence de la recherche. La valeur par défaut est 60 si elle n'est pas spécifiée.</li>
</ul></li>
<li>Pour "WeightedRanker", il attend :<ul>
<li>"weights" (liste de flottants) : Une liste d'exactement deux poids :<ol>
<li>Le poids de la composante d'intégration dense.</li>
<li>Ces poids sont utilisés pour équilibrer l'importance des composantes denses et éparses des encastrements dans le processus de recherche hybride. Les poids par défaut sont [1.0, 1.0] s'ils ne sont pas spécifiés.</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<pre><code translate="no" class="language-python">vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    overwrite=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Use the existing collection created in the previous example</span>
    enable_sparse=<span class="hljs-literal">True</span>,
    hybrid_ranker=<span class="hljs-string">&quot;WeightedRanker&quot;</span>,
    hybrid_ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">1.0</span>, <span class="hljs-number">0.5</span>]},
)
index = VectorStoreIndex.from_vector_store(vector_store)
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:44:00,419 [DEBUG][_create_connection]: Created new connection using: 09c051fb18c04f97a80f07958856587b (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
No built-in function detected, using BGEM3SparseEmbeddingFunction().
Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 136622.28it/s]
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]


The author learned several valuable lessons at Viaweb, including the importance of understanding
growth rate as the ultimate test of a startup, the significance of user feedback in shaping the
software, and the realization that web applications were the future of software development.
Additionally, the experience at Viaweb taught the author about the challenges and rewards of running
a startup, the value of simplicity in software design, and the impact of pricing strategies on
attracting customers.
</code></pre>
