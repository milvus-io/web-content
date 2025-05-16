---
id: full_text_search_with_milvus_and_haystack.md
summary: >-
  Ce tutoriel montre comment mettre en œuvre la recherche plein texte et la
  recherche hybride dans votre application en utilisant Haystack et Milvus.
title: Recherche en texte intégral avec Milvus et Haystack
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_blank">
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
    </button></h1><p>La<a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">recherche en texte intégral</a> est une méthode traditionnelle qui permet de récupérer des documents en faisant correspondre des mots-clés ou des phrases spécifiques dans le texte. Elle classe les résultats sur la base de scores de pertinence calculés à partir de facteurs tels que la fréquence des termes. Alors que la recherche sémantique permet de mieux comprendre le sens et le contexte, la recherche en texte intégral excelle dans la correspondance précise des mots-clés, ce qui en fait un complément utile à la recherche sémantique. L'algorithme BM25 est largement utilisé pour le classement dans la recherche plein texte et joue un rôle clé dans la génération améliorée par la recherche (RAG).</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a> introduit des capacités natives de recherche en texte intégral à l'aide de l'algorithme BM25. Cette approche convertit le texte en vecteurs épars qui représentent les scores BM25. Vous pouvez simplement saisir du texte brut et Milvus générera et stockera automatiquement les vecteurs épars, sans qu'aucune génération manuelle d'intégration éparse ne soit nécessaire.</p>
<p><a href="https://haystack.deepset.ai/">Haystack</a> prend désormais en charge cette fonctionnalité de Milvus, ce qui facilite l'ajout de la recherche en texte intégral aux applications RAG. Vous pouvez combiner la recherche en texte intégral avec la recherche sémantique à vecteurs denses pour une approche hybride qui bénéficie à la fois de la compréhension sémantique et de la précision de l'appariement des mots clés. Cette combinaison améliore la précision de la recherche et fournit de meilleurs résultats aux utilisateurs.</p>
<p>Ce tutoriel montre comment mettre en œuvre la recherche en texte intégral et la recherche hybride dans votre application à l'aide de Haystack et Milvus.</p>
<p>Pour utiliser le magasin de vecteurs Milvus, indiquez votre serveur Milvus <code translate="no">URI</code> (et éventuellement <code translate="no">TOKEN</code>). Pour démarrer un serveur Milvus, vous pouvez configurer un serveur Milvus en suivant le <a href="https://milvus.io/docs/install-overview.md">guide d'installation Milvus</a> ou simplement <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">essayer Zilliz Cloud</a>(Milvus entièrement géré) gratuitement.</p>
<div class="alert note">
<ul>
<li>La recherche en texte intégral est actuellement disponible dans Milvus Standalone, Milvus Distributed et Zilliz Cloud, bien qu'elle ne soit pas encore prise en charge dans Milvus Lite (qui prévoit cette fonctionnalité pour une mise en œuvre future). Contactez support@zilliz.com pour plus d'informations.</li>
<li>Avant de poursuivre ce tutoriel, assurez-vous d'avoir une compréhension de base de la <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">recherche en texte intégral</a> et de l'<a href="https://github.com/milvus-io/milvus-haystack/blob/main/README.md">utilisation de base</a> de l'intégration Haystack Milvus.</li>
</ul>
</div>
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
    </button></h2><p>Avant d'exécuter ce bloc-notes, assurez-vous que les dépendances suivantes sont installées :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet pymilvus milvus-haystack</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si vous utilisez Google Colab, pour activer les dépendances qui viennent d'être installées, vous devrez peut-être <strong>redémarrer le runtime</strong> (cliquez sur le menu "Runtime" en haut de l'écran, et sélectionnez "Restart session" dans le menu déroulant).</p>
</div>
<p>Nous utiliserons les modèles d'OpenAI. Vous devez préparer la <a href="https://platform.openai.com/docs/quickstart">clé api</a> <code translate="no">OPENAI_API_KEY</code> comme variable d'environnement.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-data" class="common-anchor-header">Préparer les données</h3><p>Importez les paquets nécessaires dans ce carnet. Préparez ensuite quelques exemples de documents.</p>
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
<p>L'intégration de la recherche en texte intégral dans un système RAG permet d'équilibrer la recherche sémantique et la recherche précise et prévisible par mot-clé. Vous pouvez également choisir de n'utiliser que la recherche en texte intégral, bien qu'il soit recommandé de combiner la recherche en texte intégral avec la recherche sémantique pour obtenir de meilleurs résultats de recherche. Ici, à des fins de démonstration, nous montrerons la recherche en texte intégral seule et la recherche hybride.</p>
<h2 id="BM25-search-without-embedding" class="common-anchor-header">Recherche BM25 sans intégration<button data-href="#BM25-search-without-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Créer le pipeline d'indexation</h3><p>Pour la recherche plein texte, Milvus MilvusDocumentStore accepte un paramètre <code translate="no">builtin_function</code>. Ce paramètre permet de transmettre une instance de <code translate="no">BM25BuiltInFunction</code>, qui met en œuvre l'algorithme BM25 du côté du serveur Milvus. Définissez le <code translate="no">builtin_function</code> spécifié comme instance de la fonction BM25. Par exemple :</p>
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
<p>Pour les connection_args :</p>
<ul>
<li>Vous pouvez configurer un serveur Milvus plus performant sur <a href="https://milvus.io/docs/quickstart.md">docker ou kubernetes</a>. Dans cette configuration, veuillez utiliser l'adresse du serveur, par exemple<code translate="no">http://localhost:19530</code>, comme votre <code translate="no">uri</code>.</li>
<li>Si vous souhaitez utiliser <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, le service cloud entièrement géré pour Milvus, ajustez les adresses <code translate="no">uri</code> et <code translate="no">token</code>, qui correspondent au <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">point de terminaison public et à la clé Api</a> dans Zilliz Cloud.</li>
</ul>
<p>Créer un pipeline d'indexation pour écrire des documents dans le magasin de documents Milvus.</p>
<pre><code translate="no" class="language-python">writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
indexing_pipeline.run({<span class="hljs-string">&quot;writer&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'writer': {'documents_written': 3}}
</code></pre>
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Créer le pipeline de récupération</h3><p>Créer un pipeline de récupération qui récupère les documents du magasin de documents Milvus à l'aide de <code translate="no">MilvusSparseEmbeddingRetriever</code>, qui est un wrapper autour de <code translate="no">document_store</code>.</p>
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
<h2 id="Hybrid-Search-with-semantic-search-and-full-text-search" class="common-anchor-header">Recherche hybride avec recherche sémantique et recherche en texte intégral<button data-href="#Hybrid-Search-with-semantic-search-and-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Créer le pipeline d'indexation</h3><p>Dans la recherche hybride, nous utilisons la fonction BM25 pour effectuer une recherche en texte intégral et nous spécifions le champ vectoriel dense <code translate="no">vector</code>, pour effectuer une recherche sémantique.</p>
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
<p>Créer un pipeline d'indexation qui convertit les documents en embeddings. Les documents sont ensuite écrits dans le magasin de documents Milvus.</p>
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
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Créer le pipeline d'extraction</h3><p>Créer un pipeline d'extraction qui extrait les documents du magasin de documents Milvus à l'aide de <code translate="no">MilvusHybridRetriever</code>, qui contient <code translate="no">document_store</code> et reçoit les paramètres relatifs à la recherche hybride.</p>
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
<p>Lors de l'exécution de la recherche hybride à l'aide de <code translate="no">MilvusHybridRetriever</code>, nous pouvons définir les paramètres topK et reranker. Le système traitera automatiquement les intégrations vectorielles et les fonctions intégrées et utilisera finalement un reranker pour affiner les résultats. Les détails de l'implémentation sous-jacente du processus de recherche sont cachés à l'utilisateur.</p>
<p>Pour plus d'informations sur la recherche hybride, vous pouvez consulter l'<a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">introduction à la recherche hybride</a>.</p>
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
<h2 id="Customize-analyzer" class="common-anchor-header">Personnaliser l'analyseur<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Les analyseurs sont essentiels dans la recherche en texte intégral car ils décomposent la phrase en tokens et effectuent des analyses lexicales telles que le stemming et la suppression des mots vides. Les analyseurs sont généralement spécifiques à une langue. Vous pouvez consulter <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">ce guide</a> pour en savoir plus sur les analyseurs dans Milvus.</p>
<p>Milvus prend en charge deux types d'analyseurs : Les <strong>analyseurs intégrés</strong> et les <strong>analyseurs personnalisés</strong>. Par défaut, le site <code translate="no">BM25BuiltInFunction</code> utilise l'<a href="https://milvus.io/docs/standard-analyzer.md">analyseur intégré standard</a>, qui est l'analyseur le plus basique et qui symbolise le texte avec la ponctuation.</p>
<p>Si vous souhaitez utiliser un analyseur différent ou personnaliser l'analyseur, vous pouvez passer le paramètre <code translate="no">analyzer_params</code> dans l'initialisation de <code translate="no">BM25BuiltInFunction</code>.</p>
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
<p>Nous pouvons examiner le schéma de la collection Milvus et nous assurer que l'analyseur personnalisé est correctement configuré.</p>
<pre><code translate="no" class="language-python">document_store.col.schema
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': False, 'description': '', 'fields': [{'name': 'text', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535, 'enable_match': True, 'enable_analyzer': True, 'analyzer_params': {'tokenizer': 'standard', 'filter': ['lowercase', {'type': 'length', 'max': 40}, {'type': 'stop', 'stop_words': ['of', 'to']}]}}}, {'name': 'id', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535}, 'is_primary': True, 'auto_id': False}, {'name': 'vector', 'description': '', 'type': &lt;DataType.FLOAT_VECTOR: 101&gt;, 'params': {'dim': 1536}}, {'name': 'sparse_vector', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;, 'is_function_output': True}], 'enable_dynamic_field': True, 'functions': [{'name': 'bm25_function_7b6e15a4', 'description': '', 'type': &lt;FunctionType.BM25: 1&gt;, 'input_field_names': ['text'], 'output_field_names': ['sparse_vector'], 'params': {}}]}
</code></pre>
<p>Pour plus de détails sur les concepts, par exemple <code translate="no">analyzer</code>, <code translate="no">tokenizer</code>, <code translate="no">filter</code>, <code translate="no">enable_match</code>, <code translate="no">analyzer_params</code>, veuillez vous référer à la <a href="https://milvus.io/docs/analyzer-overview.md">documentation de l'analyseur</a>.</p>
<h2 id="Using-Hybrid-Search-in-RAG-pipeline" class="common-anchor-header">Utilisation de la recherche hybride dans le pipeline RAG<button data-href="#Using-Hybrid-Search-in-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous avons appris à utiliser la fonction intégrée de base BM25 dans Haystack et Milvus et avons préparé un fichier chargé <code translate="no">document_store</code>. Nous allons maintenant présenter une implémentation optimisée de RAG avec la recherche hybride.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://github.com/milvus-io/bootcamp/blob/master/images/advanced_rag/hybrid_and_rerank.png?raw=1" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Ce diagramme illustre le processus de récupération et de reclassement hybride, qui combine le BM25 pour la correspondance des mots clés et la recherche vectorielle dense pour la récupération sémantique. Les résultats des deux méthodes sont fusionnés, reclassés et transmis à un LLM pour générer la réponse finale.</p>
<p>La recherche hybride équilibre la précision et la compréhension sémantique, améliorant la précision et la robustesse pour diverses requêtes. Elle récupère les candidats à l'aide de la recherche plein texte BM25 et de la recherche vectorielle, garantissant ainsi une récupération sémantique, contextuelle et précise.</p>
<p>Essayons une implémentation optimisée de RAG avec la recherche hybride.</p>
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
<p>Pour plus d'informations sur l'utilisation de milvus-haystack, veuillez vous référer au <a href="https://github.com/milvus-io/milvus-haystack">dépôt officiel de milvus-haystack</a>.</p>
