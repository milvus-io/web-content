---
id: langchain_milvus_async.md
summary: >-
  Ce tutoriel explore comment exploiter les fonctions asynchrones dans
  langchain-milvus pour construire des applications de haute performance. En
  utilisant des méthodes asynchrones, vous pouvez améliorer de manière
  significative le débit et la réactivité de votre application, en particulier
  lorsqu'il s'agit de récupérer des données à grande échelle.
title: Fonctions asynchrones dans l'intégration LangChain-Milvus
---
<h1 id="Asynchronous-Functions-in-LangChain-Milvus-Integration" class="common-anchor-header">Fonctions asynchrones dans l'intégration LangChain-Milvus<button data-href="#Asynchronous-Functions-in-LangChain-Milvus-Integration" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce tutoriel explore comment exploiter les fonctions asynchrones dans <a href="https://github.com/langchain-ai/langchain-milvus">langchain-milvus</a> pour construire des applications de haute performance. En utilisant des méthodes asynchrones, vous pouvez améliorer de manière significative le débit et la réactivité de votre application, en particulier lorsqu'il s'agit de récupérer des données à grande échelle. Que vous construisiez un système de recommandation en temps réel, que vous mettiez en œuvre une recherche sémantique dans votre application ou que vous créiez un pipeline RAG (Retrieval-Augmented Generation), les opérations asynchrones peuvent vous aider à traiter plus efficacement les requêtes simultanées. La base de données vectorielle haute performance Milvus, associée aux puissantes abstractions LLM de LangChain, peut constituer une base solide pour la création d'applications d'IA évolutives.</p>
<h2 id="Async-API-Overview" class="common-anchor-header">Présentation de l'API Async<button data-href="#Async-API-Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>langchain-milvus fournit un support complet des opérations asynchrones, améliorant de manière significative les performances dans les scénarios concurrents à grande échelle. L'API asynchrone maintient une interface cohérente avec l'API synchrone.</p>
<h3 id="Core-Async-Functions" class="common-anchor-header">Fonctions asynchrones de base</h3><p>Pour utiliser les opérations asynchrones dans langchain-milvus, il suffit d'ajouter un préfixe <code translate="no">a</code> aux noms des méthodes. Cela permet une meilleure utilisation des ressources et un débit amélioré lors de la gestion des demandes de récupération concurrentes.</p>
<table>
<thead>
<tr><th>Type d'opération</th><th>Méthode synchrone</th><th>Méthode asynchrone</th><th>Description de l'opération</th></tr>
</thead>
<tbody>
<tr><td>Ajouter des textes</td><td><code translate="no">add_texts()</code></td><td><code translate="no">aadd_texts()</code></td><td>Ajouter des textes à la base de données vectorielles</td></tr>
<tr><td>Ajouter des documents</td><td><code translate="no">add_documents()</code></td><td><code translate="no">aadd_documents()</code></td><td>Ajouter des documents à la base de données vectorielles</td></tr>
<tr><td>Ajout de vecteurs d'intégration</td><td><code translate="no">add_embeddings()</code></td><td><code translate="no">aadd_embeddings()</code></td><td>Ajouter des vecteurs d'intégration</td></tr>
<tr><td>Recherche de similarité</td><td><code translate="no">similarity_search()</code></td><td><code translate="no">asimilarity_search()</code></td><td>Recherche sémantique par texte</td></tr>
<tr><td>Recherche vectorielle</td><td><code translate="no">similarity_search_by_vector()</code></td><td><code translate="no">asimilarity_search_by_vector()</code></td><td>Recherche sémantique par vecteur</td></tr>
<tr><td>Recherche avec score</td><td><code translate="no">similarity_search_with_score()</code></td><td><code translate="no">asimilarity_search_with_score()</code></td><td>Recherche sémantique par texte et retour des scores de similarité</td></tr>
<tr><td>Recherche vectorielle avec score</td><td><code translate="no">similarity_search_with_score_by_vector()</code></td><td><code translate="no">asimilarity_search_with_score_by_vector()</code></td><td>Recherche sémantique par vecteur et retour des scores de similarité</td></tr>
<tr><td>Recherche de diversité</td><td><code translate="no">max_marginal_relevance_search()</code></td><td><code translate="no">amax_marginal_relevance_search()</code></td><td>Recherche MMR (renvoie les résultats similaires tout en optimisant la diversité)</td></tr>
<tr><td>Recherche vectorielle de diversité</td><td><code translate="no">max_marginal_relevance_search_by_vector()</code></td><td><code translate="no">amax_marginal_relevance_search_by_vector()</code></td><td>Recherche MMR par vecteur</td></tr>
<tr><td>Opération de suppression</td><td><code translate="no">delete()</code></td><td><code translate="no">adelete()</code></td><td>Suppression de documents</td></tr>
<tr><td>Opération d'insertion</td><td><code translate="no">upsert()</code></td><td><code translate="no">aupsert()</code></td><td>Insérer (mettre à jour si existant, sinon insérer) des documents</td></tr>
<tr><td>Recherche de métadonnées</td><td><code translate="no">search_by_metadata()</code></td><td><code translate="no">asearch_by_metadata()</code></td><td>Requête avec filtrage des métadonnées</td></tr>
<tr><td>Obtenir des clés primaires</td><td><code translate="no">get_pks()</code></td><td><code translate="no">aget_pks()</code></td><td>Obtenir les clés primaires par expression</td></tr>
<tr><td>Créer à partir de textes</td><td><code translate="no">from_texts()</code></td><td><code translate="no">afrom_texts()</code></td><td>Création d'une base de données vectorielles à partir de textes</td></tr>
</tbody>
</table>
<p>Pour plus d'informations sur ces fonctions, veuillez vous référer à la <a href="https://python.langchain.com/api_reference/milvus/vectorstores/langchain_milvus.vectorstores.milvus.Milvus.html#milvus">référence API</a>.</p>
<h3 id="Performance-Benefits" class="common-anchor-header">Avantages en termes de performances</h3><p>Les opérations asynchrones permettent d'améliorer considérablement les performances lors du traitement d'un grand nombre de demandes simultanées :</p>
<ul>
<li>le traitement de documents par lots</li>
<li>Scénarios de recherche à haute fréquence</li>
<li>les applications RAG de production</li>
<li>Importation/exportation de données à grande échelle</li>
</ul>
<p>Dans ce tutoriel, nous allons démontrer ces avantages en termes de performances en comparant en détail les opérations synchrones et asynchrones, et en vous montrant comment exploiter les API asynchrones pour optimiser les performances de vos applications.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Avant de commencer<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Les extraits de code de cette page nécessitent les dépendances suivantes :</p>
<pre><code translate="no" class="language-python">! pip install -U pymilvus langchain-milvus langchain langchain-core langchain-openai langchain-text-splitters nest-asyncio
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Si vous utilisez Google Colab, pour activer les dépendances qui viennent d'être installées, vous devrez peut-être <strong>redémarrer le runtime</strong> (cliquez sur le menu "Runtime" en haut de l'écran, et sélectionnez "Restart session" dans le menu déroulant).</p>
</blockquote>
<p>Nous utiliserons les modèles OpenAI. Vous devez préparer la <a href="https://platform.openai.com/docs/quickstart">clé api</a> <code translate="no">OPENAI_API_KEY</code> en tant que variable d'environnement :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Si vous utilisez Jupyter Notebook, vous devez exécuter cette ligne de code avant d'exécuter le code asynchrone :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.apply()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Exploring-Async-APIs-and-Performance-Comparison" class="common-anchor-header">Exploration des API asynchrones et comparaison des performances<button data-href="#Exploring-Async-APIs-and-Performance-Comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>Maintenant, plongeons plus profondément dans la comparaison des performances entre les opérations synchrones et asynchrones avec langchain-milvus.</p>
<p>Tout d'abord, importez les bibliothèques nécessaires :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> asyncio
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings
<span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Define the Milvus URI</span>
URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-up-Test-Functions" class="common-anchor-header">Mise en place des fonctions de test</h3><p>Créons des fonctions d'aide pour générer des données de test :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">random_id</span>():
    <span class="hljs-string">&quot;&quot;&quot;Generate a random string ID&quot;&quot;&quot;</span>
    random_num_str = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>):
        random_digit = <span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">9</span>))
        random_num_str += random_digit
    <span class="hljs-keyword">return</span> random_num_str


<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_test_documents</span>(<span class="hljs-params">num_docs</span>):
    <span class="hljs-string">&quot;&quot;&quot;Generate test documents for performance testing&quot;&quot;&quot;</span>
    docs = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_docs):
        content = (
            <span class="hljs-string">f&quot;This is test document <span class="hljs-subst">{i}</span> with some random content: <span class="hljs-subst">{random.random()}</span>&quot;</span>
        )
        metadata = {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-string">f&quot;doc_<span class="hljs-subst">{i}</span>&quot;</span>,
            <span class="hljs-string">&quot;score&quot;</span>: random.random(),
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">f&quot;cat_<span class="hljs-subst">{i % <span class="hljs-number">5</span>}</span>&quot;</span>,
        }
        doc = Document(page_content=content, metadata=metadata)
        docs.append(doc)
    <span class="hljs-keyword">return</span> docs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Initialize-the-Vector-Store" class="common-anchor-header">Initialiser le magasin de vecteurs</h3><p>Avant de pouvoir exécuter nos tests de performance, nous devons configurer un magasin de vecteurs Milvus propre. Cette fonction garantit que nous commençons avec une nouvelle collection pour chaque test, en éliminant toute interférence des données précédentes :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">init_vector_store</span>():
    <span class="hljs-string">&quot;&quot;&quot;Initialize and return a fresh vector store for testing&quot;&quot;&quot;</span>
    <span class="hljs-keyword">return</span> Milvus(
        embedding_function=OpenAIEmbeddings(),
        collection_name=<span class="hljs-string">&quot;langchain_perf_test&quot;</span>,
        connection_args={<span class="hljs-string">&quot;uri&quot;</span>: URI},
        auto_id=<span class="hljs-literal">True</span>,
        drop_old=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Always start with a fresh collection</span>
    )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Async-vs-Sync-Add-Documents" class="common-anchor-header">Async vs Sync : Ajouter des documents</h3><p>Comparons maintenant les performances de l'ajout de documents synchrone et asynchrone. Ces fonctions nous aideront à mesurer la rapidité des opérations asynchrones lors de l'ajout de plusieurs documents au magasin vectoriel. La version asynchrone crée des tâches pour chaque ajout de document et les exécute simultanément, tandis que la version synchrone traite les documents un par un :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_add</span>(<span class="hljs-params">milvus_store, num_adding</span>):
    <span class="hljs-string">&quot;&quot;&quot;Add documents asynchronously and measure the time&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_adding)
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs:
        <span class="hljs-comment"># Create tasks for each document addition</span>
        task = milvus_store.aadd_documents([doc])
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_add</span>(<span class="hljs-params">milvus_store, num_adding</span>):
    <span class="hljs-string">&quot;&quot;&quot;Add documents synchronously and measure the time&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_adding)
    start_time = time.time()
    <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs:
        result = milvus_store.add_documents([doc])
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>Exécutons maintenant nos tests de performance avec différents nombres de documents pour voir les différences de performance dans le monde réel. Nous allons effectuer des tests avec différentes charges pour comprendre comment les opérations asynchrones évoluent par rapport à leurs homologues synchrones. Les tests mesureront le temps d'exécution pour les deux approches et aideront à démontrer les avantages des opérations asynchrones en termes de performances :</p>
<pre><code translate="no" class="language-python">add_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Get the event loop</span>
loop = asyncio.get_event_loop()

<span class="hljs-comment"># Create a new vector store for testing</span>
milvus_store = init_vector_store()

<span class="hljs-comment"># Test async document addition</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_add</span>():
        async_time = <span class="hljs-keyword">await</span> async_add(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async add for <span class="hljs-subst">{count}</span> documents took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_add())

<span class="hljs-comment"># Reset vector store for sync tests</span>
milvus_store = init_vector_store()

<span class="hljs-comment"># Test sync document addition</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:
    sync_time = sync_add(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync add for <span class="hljs-subst">{count}</span> documents took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:44:12,274 [DEBUG][_create_connection]: Created new connection using: dd5f77bb78964c079da42c2446b03bf6 (async_milvus_client.py:599)


Async add for 10 documents took 1.74 seconds


2025-06-05 10:44:16,940 [DEBUG][_create_connection]: Created new connection using: 8b13404a78654cdd9b790371eb44e427 (async_milvus_client.py:599)


Async add for 100 documents took 2.77 seconds
Sync add for 10 documents took 5.36 seconds
Sync add for 100 documents took 65.60 seconds
</code></pre>
<h3 id="Async-vs-Sync-Search" class="common-anchor-header">Async vs Sync : Recherche</h3><p>Pour la comparaison des performances de recherche, nous devons d'abord remplir le magasin de vecteurs. Les fonctions suivantes nous aideront à mesurer les performances de recherche en créant plusieurs requêtes de recherche simultanées et en comparant le temps d'exécution entre les approches synchrones et asynchrones :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">populate_vector_store</span>(<span class="hljs-params">milvus_store, num_docs=<span class="hljs-number">1000</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;Populate the vector store with test documents&quot;&quot;&quot;</span>
    docs = generate_test_documents(num_docs)
    milvus_store.add_documents(docs)
    <span class="hljs-keyword">return</span> docs


<span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_search</span>(<span class="hljs-params">milvus_store, num_queries</span>):
    <span class="hljs-string">&quot;&quot;&quot;Perform async searches and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = <span class="hljs-string">f&quot;test document <span class="hljs-subst">{i % <span class="hljs-number">50</span>}</span>&quot;</span>
        task = milvus_store.asimilarity_search(query=query, k=<span class="hljs-number">3</span>)
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_search</span>(<span class="hljs-params">milvus_store, num_queries</span>):
    <span class="hljs-string">&quot;&quot;&quot;Perform sync searches and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = <span class="hljs-string">f&quot;test document <span class="hljs-subst">{i % <span class="hljs-number">50</span>}</span>&quot;</span>
        result = milvus_store.similarity_search(query=query, k=<span class="hljs-number">3</span>)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>Exécutons maintenant des tests complets de performance de recherche pour voir comment les opérations asynchrones évoluent par rapport aux opérations synchrones. Nous testerons différents volumes de requêtes pour démontrer les avantages des opérations asynchrones en termes de performances, en particulier lorsque le nombre d'opérations simultanées augmente :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize and populate the vector store</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

query_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Test async search</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_search</span>():
        async_time = <span class="hljs-keyword">await</span> async_search(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_search())

<span class="hljs-comment"># Test sync search</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:
    sync_time = sync_search(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:45:28,131 [DEBUG][_create_connection]: Created new connection using: 851824591c64415baac843e676e78cdd (async_milvus_client.py:599)


Async search for 10 queries took 2.31 seconds
Async search for 100 queries took 3.72 seconds
Sync search for 10 queries took 6.07 seconds
Sync search for 100 queries took 54.22 seconds
</code></pre>
<h3 id="Async-vs-Sync-Delete" class="common-anchor-header">Async vs Sync : Suppression</h3><p>Les opérations de suppression sont un autre aspect critique pour lequel les opérations asynchrones peuvent apporter des améliorations significatives en termes de performances. Créons des fonctions pour mesurer la différence de performance entre les opérations de suppression synchrones et asynchrones. Ces tests permettront de démontrer comment les opérations asynchrones peuvent gérer les suppressions par lots de manière plus efficace :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_delete</span>(<span class="hljs-params">milvus_store, num_deleting</span>):
    <span class="hljs-string">&quot;&quot;&quot;Delete documents asynchronously and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_deleting):
        expr = <span class="hljs-string">f&quot;id == &#x27;doc_<span class="hljs-subst">{i}</span>&#x27;&quot;</span>
        task = milvus_store.adelete(expr=expr)
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time


<span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_delete</span>(<span class="hljs-params">milvus_store, num_deleting</span>):
    <span class="hljs-string">&quot;&quot;&quot;Delete documents synchronously and measure the time&quot;&quot;&quot;</span>
    start_time = time.time()
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_deleting):
        expr = <span class="hljs-string">f&quot;id == &#x27;doc_<span class="hljs-subst">{i}</span>&#x27;&quot;</span>
        result = milvus_store.delete(expr=expr)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<p>Exécutons maintenant les tests de performance de suppression pour quantifier la différence de performance. Nous commencerons par un magasin vectoriel frais rempli de données de test, puis nous effectuerons des opérations de suppression en utilisant les approches synchrone et asynchrone :</p>
<pre><code translate="no" class="language-python">delete_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>]

<span class="hljs-comment"># Initialize and populate the vector store</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

<span class="hljs-comment"># Test async delete</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> delete_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_delete</span>():
        async_time = <span class="hljs-keyword">await</span> async_delete(milvus_store, count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async delete for <span class="hljs-subst">{count}</span> operations took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_delete())

<span class="hljs-comment"># Reset and repopulate the vector store for sync tests</span>
milvus_store = init_vector_store()
populate_vector_store(milvus_store, <span class="hljs-number">1000</span>)

<span class="hljs-comment"># Test sync delete</span>
<span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> delete_counts:
    sync_time = sync_delete(milvus_store, count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync delete for <span class="hljs-subst">{count}</span> operations took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-06-05 10:46:57,211 [DEBUG][_create_connection]: Created new connection using: 504e9ce3be92411e87077971c82baca2 (async_milvus_client.py:599)


Async delete for 10 operations took 0.58 seconds


2025-06-05 10:47:12,309 [DEBUG][_create_connection]: Created new connection using: 22c1513b444e4c40936e2176d7a1a154 (async_milvus_client.py:599)


Async delete for 100 operations took 0.61 seconds
Sync delete for 10 operations took 2.82 seconds
Sync delete for 100 operations took 29.21 seconds
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
    </button></h2><p>Ce tutoriel a démontré les avantages significatifs en termes de performances de l'utilisation d'opérations asynchrones avec LangChain et Milvus. Nous avons comparé les versions synchrones et asynchrones des opérations d'ajout, de recherche et de suppression, en montrant comment les opérations asynchrones peuvent apporter des améliorations substantielles en termes de vitesse, en particulier pour les opérations par lots importantes.</p>
<p>Principaux enseignements :</p>
<ol>
<li>Les opérations asynchrones offrent le plus d'avantages lorsqu'il s'agit d'effectuer de nombreuses opérations individuelles qui peuvent être exécutées en parallèle</li>
<li>Pour les charges de travail qui génèrent un débit plus élevé, l'écart de performance entre les opérations synchrone et asynchrone se creuse.</li>
<li>Les opérations asynchrones utilisent pleinement la puissance de calcul des machines.</li>
</ol>
<p>Lorsque vous créez des applications RAG de production avec LangChain et Milvus, envisagez d'utiliser l'API asynchrone lorsque les performances sont un problème, en particulier pour les opérations simultanées.</p>
