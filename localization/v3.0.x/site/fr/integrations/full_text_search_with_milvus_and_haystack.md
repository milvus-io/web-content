---
id: full_text_search_with_milvus_and_haystack.md
summary: >-
  Ce tutoriel explique comment mettre en place une recherche plein texte et une
  recherche hybride dans votre application à l'aide de Haystack et Milvus.
title: Recherche en texte intégral avec Milvus et Haystack
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Full-text-search-with-Milvus-and-Haystack" class="common-anchor-header">Recherche en texte intégral avec Milvus et Haystack<button data-href="#Full-text-search-with-Milvus-and-Haystack" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">La recherche en texte intégral</a> est une méthode traditionnelle permettant de retrouver des documents en faisant correspondre des mots-clés ou des expressions spécifiques présents dans le texte. Elle classe les résultats en fonction de scores de pertinence calculés à partir de facteurs tels que la fréquence des termes. Alors que la recherche sémantique est plus performante pour comprendre le sens et le contexte, la recherche en texte intégral excelle dans la correspondance précise des mots-clés, ce qui en fait un complément utile à la recherche sémantique. L’algorithme BM25 est largement utilisé pour le classement dans la recherche en texte intégral et joue un rôle clé dans la génération augmentée par la recherche (RAG).</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a> introduit des capacités natives de recherche en texte intégral utilisant BM25. Cette approche convertit le texte en vecteurs clairsemés qui représentent les scores BM25. Il vous suffit de saisir du texte brut et Milvus générera et stockera automatiquement les vecteurs clairsemés, sans qu’il soit nécessaire de générer manuellement des représentations vectorielles clairsemées.</p>
<p><a href="https://haystack.deepset.ai/">Haystack</a> prend désormais en charge cette fonctionnalité de Milvus, ce qui facilite l’ajout de la recherche en texte intégral aux applications RAG. Vous pouvez combiner la recherche en texte intégral avec la recherche sémantique par vecteurs denses pour obtenir une approche hybride qui tire parti à la fois de la compréhension sémantique et de la précision de la correspondance des mots-clés. Cette combinaison améliore la précision de la recherche et fournit de meilleurs résultats aux utilisateurs.</p>
<p>Ce tutoriel montre comment implémenter la recherche en texte intégral et la recherche hybride dans votre application à l’aide de Haystack et Milvus.</p>
<p>Vous pouvez suivre ce tutoriel en local avec Milvus Lite, vous connecter à un serveur Milvus ou utiliser <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a>, le service Milvus entièrement géré.</p>
<div class="alert note">
<ul>
<li>Avant de commencer ce tutoriel, assurez-vous d’avoir une connaissance de base de <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">la recherche en texte intégral</a> et <a href="https://github.com/milvus-io/milvus-haystack/blob/main/README.md">de l’utilisation</a> de l’intégration Haystack-Milvus.</li>
</ul>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Ce tutoriel nécessite Python 3.10 ou une version ultérieure. Installez l’intégration Haystack pour Milvus ainsi que les paquets PyMilvus et Milvus Lite actuels :</p>
<pre><code translate="no" class="language-shell">pip install --upgrade --quiet &quot;milvus-haystack&gt;=0.1.0&quot; &quot;pymilvus&gt;=3.0.2&quot; &quot;milvus-lite&gt;=3.2.2&quot;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si vous utilisez Google Colab, pour activer les dépendances que vous venez d’installer, vous devrez peut-être <strong>redémarrer l’environnement d’exécution</strong> (cliquez sur le menu « Runtime » en haut de l’écran, puis sélectionnez « Redémarrer la session » dans le menu déroulant).</p>
</div>
<p>Nous utiliserons les modèles d’OpenAI. Vous devez définir la <a href="https://platform.openai.com/docs/quickstart">clé API</a> <code translate="no">OPENAI_API_KEY</code> en tant que variable d’environnement.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-data" class="common-anchor-header">Préparez les données<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Importez les paquets nécessaires dans ce notebook. Préparez ensuite quelques documents d’exemple.</p>
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
<p>L’intégration de la recherche en texte intégral dans un système RAG permet d’équilibrer la recherche sémantique et la recherche précise et prévisible basée sur des mots-clés. Vous pouvez également choisir de n’utiliser que la recherche en texte intégral, bien qu’il soit recommandé de la combiner avec la recherche sémantique pour obtenir de meilleurs résultats. Ici, à des fins de démonstration, nous présenterons la recherche en texte intégral seule et la recherche hybride.</p>
<h2 id="BM25-search-without-embedding" class="common-anchor-header">Recherche BM25 sans encodage<button data-href="#BM25-search-without-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Créer le pipeline d’indexation<button data-href="#Create-the-indexing-Pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour la recherche en texte intégral, la méthode ` <code translate="no">MilvusDocumentStore</code> ` accepte un paramètre ` <code translate="no">builtin_function</code> `. Transmettez une instance de ` <code translate="no">BM25BuiltInFunction</code> ` pour permettre à Milvus de générer des vecteurs clairsemés BM25 côté serveur. Par exemple :</p>
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
<p>Pour le paramètre <code translate="no">connection_args</code>:</p>
<ul>
<li>Le fichier local par défaut, <code translate="no">./milvus_full_text.db</code>, utilise <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>.</li>
<li>Pour un serveur Milvus sur <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>, définissez <code translate="no">MILVUS_URI</code> sur l’adresse du serveur, par exemple <code translate="no">http://localhost:19530</code>.</li>
<li>Pour <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, définissez <code translate="no">MILVUS_URI</code> et <code translate="no">MILVUS_TOKEN</code> sur le <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">point de terminaison public et la clé API</a> indiqués dans la console.</li>
</ul>
</div>
<p>Créez un pipeline d’indexation pour écrire des documents dans le magasin de documents Milvus.</p>
<pre><code translate="no" class="language-python">writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
_ = indexing_pipeline.run({<span class="hljs-string">&quot;writer&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of documents:&quot;</span>, document_store.count_documents())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Number of documents: 3
</code></pre>
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Créer le pipeline de récupération<button data-href="#Create-the-retrieval-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Créez un pipeline de recherche qui récupère les documents à partir du magasin de documents Milvus à l’aide de <code translate="no">MilvusSparseEmbeddingRetriever</code>, qui est un wrapper autour de <code translate="no">document_store</code>.</p>
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
<h2 id="Hybrid-Search-with-semantic-search-and-full-text-search" class="common-anchor-header">Recherche hybride combinant recherche sémantique et recherche en texte intégral<button data-href="#Hybrid-Search-with-semantic-search-and-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Créer le pipeline d’indexation<button data-href="#Create-the-indexing-Pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Dans la recherche hybride, nous utilisons la fonction BM25 pour effectuer la recherche en texte intégral, et spécifions le champ vectoriel dense <code translate="no">vector</code> pour effectuer la recherche sémantique. Cette collection utilise également un analyseur personnalisé, ce qui nous permettra d’examiner son schéma plus tard dans le tutoriel.</p>
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
<p>Créez un pipeline d’indexation qui convertit les documents en représentations vectorielles. Les documents sont ensuite enregistrés dans le magasin de documents Milvus.</p>
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
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Créer le pipeline de recherche<button data-href="#Create-the-retrieval-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Créez un pipeline de récupération qui récupère les documents à partir du magasin de documents Milvus à l’aide de ` <code translate="no">MilvusHybridRetriever</code>`, qui contient l’ <code translate="no">document_store</code> et reçoit les paramètres relatifs à la recherche hybride.</p>
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
<p>Lors d’une recherche hybride à l’aide de <code translate="no">MilvusHybridRetriever</code>, vous pouvez, si vous le souhaitez, définir les paramètres topK et reranker. Le système gère automatiquement les représentations vectorielles et les fonctions intégrées, puis utilise un reranker pour affiner les résultats. Les détails d’implémentation sous-jacents du processus de recherche sont masqués à l’utilisateur.</p>
<p>Pour plus d’informations sur la recherche hybride, vous pouvez consulter <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">l’introduction</a> à <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">la recherche hybride</a>.</p>
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
<h2 id="Customize-analyzer" class="common-anchor-header">Personnalisation de l’analyseur<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Les analyseurs sont essentiels à la recherche en texte intégral : ils décomposent la phrase en tokens et effectuent une analyse lexicale, notamment le lemmatisation et la suppression des mots vides. Les analyseurs sont généralement spécifiques à chaque langue. Vous pouvez consulter <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">ce guide</a> pour en savoir plus sur les analyseurs dans Milvus.</p>
<p>Milvus prend en charge deux types d’analyseurs : <strong>les analyseurs intégrés</strong> et <strong>les analyseurs personnalisés</strong>. Par défaut, l’ <code translate="no">BM25BuiltInFunction</code> utilise <a href="https://milvus.io/docs/standard-analyzer.md">l’analyseur intégré standard</a>, qui est l’analyseur le plus basique permettant de segmenter le texte en tokens tout en conservant la ponctuation.</p>
<p>Le magasin de documents hybride ci-dessus transmet l’ <code translate="no">analyzer_params_custom</code> à <code translate="no">BM25BuiltInFunction</code> et active la correspondance de texte. Cela permet de conserver la définition de l’analyseur au sein de la collection qui l’utilise.</p>
<p>Nous pouvons examiner le schéma de la collection Milvus et nous assurer que l’analyseur personnalisé est correctement configuré.</p>
<pre><code translate="no" class="language-python">collection = document_store.client.describe_collection(document_store.collection_name)
text_field = <span class="hljs-built_in">next</span>(field <span class="hljs-keyword">for</span> field <span class="hljs-keyword">in</span> collection[<span class="hljs-string">&quot;fields&quot;</span>] <span class="hljs-keyword">if</span> field[<span class="hljs-string">&quot;name&quot;</span>] == <span class="hljs-string">&quot;text&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Custom analyzer:&quot;</span>, text_field[<span class="hljs-string">&quot;params&quot;</span>][<span class="hljs-string">&quot;analyzer_params&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Custom analyzer: {&quot;tokenizer&quot;: &quot;standard&quot;, &quot;filter&quot;: [&quot;lowercase&quot;, {&quot;type&quot;: &quot;length&quot;, &quot;max&quot;: 40}, {&quot;type&quot;: &quot;stop&quot;, &quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]}]}
</code></pre>
<p>Pour plus de détails sur ces concepts, par exemple <code translate="no">analyzer</code>, <code translate="no">tokenizer</code>, <code translate="no">filter</code>, <code translate="no">enable_match</code>, <code translate="no">analyzer_params</code>, veuillez vous reporter à la <a href="https://milvus.io/docs/analyzer-overview.md">documentation relative aux analyseurs</a>.</p>
<h2 id="Using-Hybrid-Search-in-RAG-pipeline" class="common-anchor-header">Utilisation de la recherche hybride dans un pipeline RAG<button data-href="#Using-Hybrid-Search-in-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous avons appris à utiliser la fonction intégrée BM25 de base dans Haystack et Milvus et avons préparé un fichier <code translate="no">document_store</code> préchargé. Présentons maintenant une implémentation RAG optimisée avec recherche hybride.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://github.com/milvus-io/bootcamp/blob/master/pics/advanced_rag/hybrid_and_rerank.png?raw=1" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Ce schéma illustre le processus de recherche et de reclassement hybrides (Hybrid Retrieve &amp; Reranking), qui combine l’algorithme BM25 pour la correspondance des mots-clés et la recherche vectorielle dense pour la recherche sémantique. Les résultats des deux méthodes sont fusionnés, reclassés, puis transmis à un modèle de langage grand format (LLM) afin de générer la réponse finale.</p>
<p>La recherche hybride concilie précision et compréhension sémantique, améliorant ainsi l’exactitude et la robustesse pour des requêtes variées. Elle extrait des candidats à l’aide de la recherche en texte intégral BM25 et de la recherche vectorielle, garantissant ainsi une recherche à la fois sémantique, contextuelle et précise.</p>
<p>Essayons une implémentation optimisée de RAG avec la recherche hybride.</p>
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
<h2 id="Conclusion" class="common-anchor-header">Conclusion<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous avez utilisé la recherche BM25 native de Milvus, la recherche hybride et un analyseur personnalisé dans les pipelines Haystack. Pour plus d’options d’intégration, consultez le <a href="https://github.com/milvus-io/milvus-haystack">dépôt milvus-haystack</a>.</p>
