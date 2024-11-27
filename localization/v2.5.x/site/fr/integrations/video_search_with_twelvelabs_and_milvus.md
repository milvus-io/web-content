---
id: video_search_with_twelvelabs_and_milvus.md
summary: >-
  Apprenez à créer une application de recherche vidéo sémantique en intégrant
  l'API Embed de Twelve Labs pour générer des embeddings multimodaux avec
  Milvus. Il couvre l'ensemble du processus, de la mise en place de
  l'environnement de développement à la mise en œuvre de fonctionnalités
  avancées telles que la recherche hybride et l'analyse vidéo temporelle, en
  fournissant une base complète pour la construction de systèmes sophistiqués
  d'analyse et de récupération de contenu vidéo.
title: >-
  Recherche vidéo avancée : Tirer parti de Twelve Labs et de Milvus pour la
  recherche sémantique
---
<h1 id="Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="common-anchor-header">Recherche vidéo avancée : Tirer parti de Twelve Labs et de Milvus pour la recherche sémantique<button data-href="#Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction" class="common-anchor-header">Introduction<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Bienvenue dans ce tutoriel complet sur la mise en œuvre de la recherche sémantique de vidéos à l'aide de <a href="https://docs.twelvelabs.io/docs/create-embeddings">Twelve Labs Embed API</a> et de Milvus. Dans ce guide, nous verrons comment exploiter la puissance des <a href="https://www.twelvelabs.io/blog/multimodal-embeddings">embeddings multimodaux avancés de Twelve Labs</a> et de la <a href="https://milvus.io/intro">base de données vectorielle efficace de Milvus</a> pour créer une solution de recherche vidéo robuste. En intégrant ces technologies, les développeurs peuvent exploiter de nouvelles possibilités en matière d'analyse de contenu vidéo, permettant des applications telles que la recherche vidéo basée sur le contenu, les systèmes de recommandation et les moteurs de recherche sophistiqués qui comprennent les nuances des données vidéo.</p>
<p>Ce tutoriel vous guidera tout au long du processus, de la configuration de votre environnement de développement à la mise en œuvre d'une application de recherche vidéo sémantique fonctionnelle. Nous aborderons des concepts clés tels que la génération d'incrustations multimodales à partir de vidéos, leur stockage efficace dans Milvus et l'exécution de recherches de similarité pour récupérer le contenu pertinent. Que vous construisiez une plate-forme d'analyse vidéo, un outil de découverte de contenu ou que vous amélioriez vos applications existantes avec des fonctionnalités de recherche vidéo, ce guide vous fournira les connaissances et les étapes pratiques pour exploiter les forces combinées de Twelve Labs et de Milvus dans vos projets.</p>
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
    </button></h2><p>Avant de commencer, assurez-vous de disposer des éléments suivants :</p>
<p>Une clé API Twelve Labs (inscrivez-vous sur https://api.twelvelabs.io si vous n'en avez pas) Python 3.7 ou supérieur installé sur votre système.</p>
<h2 id="Setting-Up-the-Development-Environment" class="common-anchor-header">Configuration de l'environnement de développement<button data-href="#Setting-Up-the-Development-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Créez un nouveau répertoire pour votre projet et naviguez-y :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">mkdir</span> video-search-tutorial
<span class="hljs-built_in">cd</span> video-search-tutorial
<button class="copy-code-btn"></button></code></pre>
<p>Créez un environnement virtuel (facultatif mais recommandé) :</p>
<pre><code translate="no" class="language-shell">python -m venv venv
<span class="hljs-built_in">source</span> venv/bin/activate  <span class="hljs-comment"># On Windows, use `venv\Scripts\activate`</span>
<button class="copy-code-btn"></button></code></pre>
<p>Installez les bibliothèques Python requises :</p>
<pre><code translate="no" class="language-shell">pip install twelvelabs pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>Créez un nouveau fichier Python pour votre projet :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">touch</span> video_search.py
<button class="copy-code-btn"></button></code></pre>
<p>Ce fichier video_search.py sera le script principal que nous utiliserons pour le tutoriel. Ensuite, configurez votre clé API Twelve Labs en tant que variable d'environnement pour la sécurité :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">TWELVE_LABS_API_KEY</span>=<span class="hljs-string">&#x27;your_api_key_here&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-Milvus" class="common-anchor-header">Connexion à Milvus<button data-href="#Connecting-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour établir une connexion avec Milvus, nous utiliserons la classe MilvusClient. Cette approche simplifie le processus de connexion et nous permet de travailler avec une instance Milvus locale basée sur des fichiers, ce qui est parfait pour notre tutoriel.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Initialize the Milvus client</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;milvus_twelvelabs_demo.db&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Successfully connected to Milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Ce code crée une nouvelle instance de client Milvus qui stockera toutes les données dans un fichier nommé milvus_twelvelabs_demo.db. Cette approche basée sur les fichiers est idéale pour le développement et les tests.</p>
<h2 id="Creating-a-Milvus-Collection-for-Video-Embeddings" class="common-anchor-header">Création d'une collection Milvus pour les incorporations vidéo<button data-href="#Creating-a-Milvus-Collection-for-Video-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Maintenant que nous sommes connectés à Milvus, créons une collection pour stocker nos incorporations vidéo et les métadonnées associées. Nous allons définir le schéma de la collection et créer la collection si elle n'existe pas encore.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize the collection name</span>
collection_name = <span class="hljs-string">&quot;twelvelabs_demo_collection&quot;</span>

<span class="hljs-comment"># Check if the collection already exists and drop it if it does</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=collection_name):
    milvus_client.drop_collection(collection_name=collection_name)

<span class="hljs-comment"># Create the collection</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">1024</span>  <span class="hljs-comment"># The dimension of the Twelve Labs embeddings</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; created successfully&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Dans ce code, nous vérifions d'abord si la collection existe déjà et la supprimons si c'est le cas. Cela nous permet de faire table rase du passé. Nous créons la collection avec une dimension de 1024, ce qui correspond à la dimension de sortie des embeddings de Twelve Labs.</p>
<h2 id="Generating-Embeddings-with-Twelve-Labs-Embed-API" class="common-anchor-header">Génération d'embeddings avec l'API Embed de Twelve Labs<button data-href="#Generating-Embeddings-with-Twelve-Labs-Embed-API" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour générer des embeddings pour nos vidéos à l'aide de l'API Embed de Twelve Labs, nous utiliserons le SDK Python de Twelve Labs. Ce processus implique la création d'une tâche d'intégration, l'attente de son achèvement et la récupération des résultats. Voici comment procéder :</p>
<p>Tout d'abord, assurez-vous que le SDK Twelve Labs est installé et importez les modules nécessaires :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> twelvelabs <span class="hljs-keyword">import</span> TwelveLabs
<span class="hljs-keyword">from</span> twelvelabs.models.embed <span class="hljs-keyword">import</span> EmbeddingsTask
<span class="hljs-keyword">import</span> os

<span class="hljs-comment"># Retrieve the API key from environment variables</span>
TWELVE_LABS_API_KEY = os.getenv(<span class="hljs-string">&#x27;TWELVE_LABS_API_KEY&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialize-the-Twelve-Labs-client" class="common-anchor-header">Initialiser le client Twelve Labs :<button data-href="#Initialize-the-Twelve-Labs-client" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">twelvelabs_client = TwelveLabs(api_key=TWELVE_LABS_API_KEY)
<button class="copy-code-btn"></button></code></pre>
<p>Créez une fonction pour générer des embeddings pour une URL vidéo donnée :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_embedding</span>(<span class="hljs-params">video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Generate embeddings for a given video URL using the Twelve Labs API.

    This function creates an embedding task for the specified video URL using
    the Marengo-retrieval-2.6 engine. It monitors the task progress and waits
    for completion. Once done, it retrieves the task result and extracts the
    embeddings along with their associated metadata.

    Args:
        video_url (str): The URL of the video to generate embeddings for.

    Returns:
        tuple: A tuple containing two elements:
            1. list: A list of dictionaries, where each dictionary contains:
                - &#x27;embedding&#x27;: The embedding vector as a list of floats.
                - &#x27;start_offset_sec&#x27;: The start time of the segment in seconds.
                - &#x27;end_offset_sec&#x27;: The end time of the segment in seconds.
                - &#x27;embedding_scope&#x27;: The scope of the embedding (e.g., &#x27;shot&#x27;, &#x27;scene&#x27;).
            2. EmbeddingsTaskResult: The complete task result object from Twelve Labs API.

    Raises:
        Any exceptions raised by the Twelve Labs API during task creation,
        execution, or retrieval.
    &quot;&quot;&quot;</span>

    <span class="hljs-comment"># Create an embedding task</span>
    task = twelvelabs_client.embed.task.create(
        engine_name=<span class="hljs-string">&quot;Marengo-retrieval-2.6&quot;</span>,
        video_url=video_url
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Created task: id=<span class="hljs-subst">{task.<span class="hljs-built_in">id</span>}</span> engine_name=<span class="hljs-subst">{task.engine_name}</span> status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Define a callback function to monitor task progress</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">on_task_update</span>(<span class="hljs-params">task: EmbeddingsTask</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Wait for the task to complete</span>
    status = task.wait_for_done(
        sleep_interval=<span class="hljs-number">2</span>,
        callback=on_task_update
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding done: <span class="hljs-subst">{status}</span>&quot;</span>)

    <span class="hljs-comment"># Retrieve the task result</span>
    task_result = twelvelabs_client.embed.task.retrieve(task.<span class="hljs-built_in">id</span>)

    <span class="hljs-comment"># Extract and return the embeddings</span>
    embeddings = []
    <span class="hljs-keyword">for</span> v <span class="hljs-keyword">in</span> task_result.video_embeddings:
        embeddings.append({
            <span class="hljs-string">&#x27;embedding&#x27;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&#x27;start_offset_sec&#x27;</span>: v.start_offset_sec,
            <span class="hljs-string">&#x27;end_offset_sec&#x27;</span>: v.end_offset_sec,
            <span class="hljs-string">&#x27;embedding_scope&#x27;</span>: v.embedding_scope
        })
    
    <span class="hljs-keyword">return</span> embeddings, task_result
<button class="copy-code-btn"></button></code></pre>
<p>Utilisez la fonction pour générer des embeddings pour vos vidéos :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example usage</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Generate embeddings for the video</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Generated <span class="hljs-subst">{<span class="hljs-built_in">len</span>(embeddings)}</span> embeddings for the video&quot;</span>)
<span class="hljs-keyword">for</span> i, emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(embeddings):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Scope: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding_scope&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time range: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Embedding vector (first 5 values): <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding&#x27;</span>][:<span class="hljs-number">5</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Cette implémentation vous permet de générer des embeddings pour n'importe quelle URL vidéo à l'aide de l'API Embed de Twelve Labs. La fonction generate_embedding gère l'ensemble du processus, de la création de la tâche à la récupération des résultats. Elle renvoie une liste de dictionnaires, chacun contenant un vecteur d'intégration ainsi que ses métadonnées (plage temporelle et portée). N'oubliez pas de gérer les erreurs potentielles, telles que les problèmes de réseau ou les limites de l'API, dans un environnement de production. N'oubliez pas de gérer les erreurs potentielles, telles que les problèmes de réseau ou les limites de l'API, dans un environnement de production.</p>
<h2 id="Inserting-Embeddings-into-Milvus" class="common-anchor-header">Insertion des embeddings dans Milvus<button data-href="#Inserting-Embeddings-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir généré des embeddings à l'aide de l'API Embed de Twelve Labs, l'étape suivante consiste à insérer ces embeddings avec leurs métadonnées dans notre collection Milvus. Ce processus nous permet de stocker et d'indexer nos incorporations vidéo pour une recherche de similarité efficace ultérieurement.</p>
<p>Voici comment insérer les embeddings dans Milvus :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_embeddings</span>(<span class="hljs-params">milvus_client, collection_name, task_result, video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Insert embeddings into the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to insert into.
        task_result (EmbeddingsTaskResult): The task result containing video embeddings.
        video_url (str): The URL of the video associated with the embeddings.

    Returns:
        MutationResult: The result of the insert operation.

    This function takes the video embeddings from the task result and inserts them
    into the specified Milvus collection. Each embedding is stored with additional
    metadata including its scope, start and end times, and the associated video URL.
    &quot;&quot;&quot;</span>
    data = []

    <span class="hljs-keyword">for</span> i, v <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(task_result.video_embeddings):
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: i,
            <span class="hljs-string">&quot;vector&quot;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&quot;embedding_scope&quot;</span>: v.embedding_scope,
            <span class="hljs-string">&quot;start_offset_sec&quot;</span>: v.start_offset_sec,
            <span class="hljs-string">&quot;end_offset_sec&quot;</span>: v.end_offset_sec,
            <span class="hljs-string">&quot;video_url&quot;</span>: video_url
        })

    insert_result = milvus_client.insert(collection_name=collection_name, data=data)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(data)}</span> embeddings into Milvus&quot;</span>)
    <span class="hljs-keyword">return</span> insert_result

<span class="hljs-comment"># Usage example</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Assuming this function exists from previous step</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-comment"># Insert embeddings into the Milvus collection</span>
insert_result = insert_embeddings(milvus_client, collection_name, task_result, video_url)
<span class="hljs-built_in">print</span>(insert_result)
<button class="copy-code-btn"></button></code></pre>
<p>Cette fonction prépare les données à insérer, y compris toutes les métadonnées pertinentes telles que le vecteur d'intégration, l'intervalle de temps et l'URL de la vidéo source. Elle utilise ensuite le client Milvus pour insérer ces données dans la collection spécifiée.</p>
<h2 id="Performing-Similarity-Search" class="common-anchor-header">Recherche de similarité<button data-href="#Performing-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois nos embeddings stockés dans Milvus, nous pouvons effectuer des recherches de similarité pour trouver les segments vidéo les plus pertinents sur la base d'un vecteur de requête. Voici comment mettre en œuvre cette fonctionnalité :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">perform_similarity_search</span>(<span class="hljs-params">milvus_client, collection_name, query_vector, limit=<span class="hljs-number">5</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Perform a similarity search on the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to search in.
        query_vector (list): The query vector to search for similar embeddings.
        limit (int, optional): The maximum number of results to return. Defaults to 5.

    Returns:
        list: A list of search results, where each result is a dictionary containing
              the matched entity&#x27;s metadata and similarity score.

    This function searches the specified Milvus collection for embeddings similar to
    the given query vector. It returns the top matching results, including metadata
    such as the embedding scope, time range, and associated video URL for each match.
    &quot;&quot;&quot;</span>
    search_results = milvus_client.search(
        collection_name=collection_name,
        data=[query_vector],
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;embedding_scope&quot;</span>, <span class="hljs-string">&quot;start_offset_sec&quot;</span>, <span class="hljs-string">&quot;end_offset_sec&quot;</span>, <span class="hljs-string">&quot;video_url&quot;</span>]
    )

    <span class="hljs-keyword">return</span> search_results
    
<span class="hljs-comment"># define the query vector</span>
<span class="hljs-comment"># We use the embedding inserted previously as an example. In practice, you can replace it with any video embedding you want to query.</span>
query_vector = task_result.video_embeddings[<span class="hljs-number">0</span>].embedding.<span class="hljs-built_in">float</span>

<span class="hljs-comment"># Perform a similarity search on the Milvus collection</span>
search_results = perform_similarity_search(milvus_client, collection_name, query_vector)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search Results:&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(search_results[<span class="hljs-number">0</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Result <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Video URL: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;video_url&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time Range: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Similarity Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Cette implémentation effectue les opérations suivantes :</p>
<ol>
<li>Définit une fonction perform_similarity_search qui prend un vecteur de requête et recherche des embeddings similaires dans la collection Milvus.</li>
<li>Elle utilise la méthode de recherche du client Milvus pour trouver les vecteurs les plus similaires.</li>
<li>Spécifie les champs de sortie que nous voulons récupérer, y compris les métadonnées sur les segments vidéo correspondants.</li>
<li>Fournit un exemple d'utilisation de cette fonction avec une vidéo de requête, en générant d'abord son intégration, puis en l'utilisant pour la recherche.</li>
<li>Imprime les résultats de la recherche, y compris les métadonnées pertinentes et les scores de similarité.</li>
</ol>
<p>En mettant en œuvre ces fonctions, vous avez créé un flux de travail complet pour stocker les incorporations vidéo dans Milvus et effectuer des recherches de similarité. Cette configuration permet de récupérer efficacement des contenus vidéo similaires sur la base des embeddings multimodaux générés par l'API Embed de Twelve Labs.</p>
<h2 id="Optimizing-Performance" class="common-anchor-header">Optimisation des performances<button data-href="#Optimizing-Performance" class="anchor-icon" translate="no">
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
    </button></h2><p>D'accord, faisons passer cette application au niveau supérieur ! Lorsque l'on traite des collections de vidéos à grande échelle, les <strong>performances sont essentielles</strong>. Pour les optimiser, nous devons mettre en œuvre un <a href="https://milvus.io/docs/v2.3.x/bulk_insert.md">traitement par lots pour la génération et l'insertion d'embeddings dans Milvus</a>. De cette manière, nous pouvons traiter plusieurs vidéos simultanément, ce qui réduit considérablement le temps de traitement global. En outre, nous pourrions exploiter la <a href="https://milvus.io/docs/v2.2.x/partition_key.md">fonction de partitionnement de Milvus</a> pour organiser nos données de manière plus efficace, par exemple par catégories de vidéos ou par périodes. Cela accélèrerait les requêtes en nous permettant de ne rechercher que les partitions pertinentes.</p>
<p>Une autre astuce d'optimisation consiste à <strong>utiliser des mécanismes de mise en cache pour les incorporations ou les résultats de recherche fréquemment consultés</strong>. Cela permettrait d'améliorer considérablement les temps de réponse pour les requêtes les plus fréquentes. N'oubliez pas d'<a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">affiner les paramètres d'indexation de Milvus</a> en fonction de votre ensemble de données et de vos modèles de requêtes spécifiques - un petit ajustement peut contribuer grandement à améliorer les performances de recherche.</p>
<h2 id="Advanced-Features" class="common-anchor-header">Fonctionnalités avancées<button data-href="#Advanced-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Ajoutons maintenant quelques fonctionnalités intéressantes pour que notre application se démarque ! Nous pourrions mettre en œuvre <strong>une recherche hybride qui combine des requêtes textuelles et vidéo</strong>. En fait, l'<a href="https://docs.twelvelabs.io/docs/create-text-embeddings">API Embed de Twelve Labs peut également générer des incrustations de texte pour vos requêtes textuelles</a>. Imaginez que vous permettiez aux utilisateurs de saisir à la fois une description textuelle et un exemple de clip vidéo - nous générerions des embeddings pour les deux et effectuerions une recherche pondérée dans Milvus. Nous obtiendrions ainsi des résultats extrêmement précis.</p>
<p>Un autre ajout génial serait la <strong>recherche temporelle dans les vidéos</strong>. <a href="https://docs.twelvelabs.io/docs/create-video-embeddings#customize-your-embeddings">Nous pourrions diviser les longues vidéos en segments plus petits, chacun avec sa propre intégration</a>. Ainsi, les utilisateurs pourraient trouver des moments précis dans les vidéos, et pas seulement des clips entiers. Et pourquoi ne pas ajouter un peu d'analyse vidéo de base ? Nous pourrions utiliser les embeddings pour regrouper des segments vidéo similaires, détecter des tendances ou même identifier des valeurs aberrantes dans de grandes collections de vidéos.</p>
<h2 id="Error-Handling-and-Logging" class="common-anchor-header">Gestion des erreurs et journalisation<button data-href="#Error-Handling-and-Logging" class="anchor-icon" translate="no">
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
    </button></h2><p>Ne nous voilons pas la face, les choses peuvent mal tourner, et lorsque c'est le cas, nous devons être préparés. <strong>La mise en œuvre d'une gestion robuste des erreurs est cruciale</strong>. Nous devons <a href="https://softwareengineering.stackexchange.com/questions/64180/good-use-of-try-catch-blocks">envelopper nos appels d'API et nos opérations de base de données dans des blocs try-except</a>, en fournissant des messages d'erreur informatifs aux utilisateurs en cas d'échec. Pour les problèmes liés au réseau, l'<a href="https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/implement-retries-exponential-backoff">implémentation de tentatives avec un backoff exponentiel</a> peut aider à gérer les problèmes temporaires de manière gracieuse.</p>
<p><strong>Quant à la journalisation, c'est notre meilleur ami pour le débogage et la surveillance</strong>. Nous devrions utiliser <a href="https://blog.sentry.io/logging-in-python-a-developers-guide/">le module de journalisation de Python</a> pour suivre les événements importants, les erreurs et les mesures de performance tout au long de notre application. Mettons en place différents niveaux de journalisation : DEBUG pour le développement, INFO pour le fonctionnement général et ERROR pour les problèmes critiques. N'oubliez pas de mettre en place une rotation des journaux pour gérer la taille des fichiers. Grâce à la mise en place d'une journalisation appropriée, nous serons en mesure d'identifier et de résoudre rapidement les problèmes, ce qui garantira le bon fonctionnement de notre application de recherche vidéo, même lorsqu'elle sera mise à l'échelle.</p>
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
    </button></h2><p>Nous vous félicitons ! Vous avez maintenant construit une application de recherche vidéo sémantique puissante à l'aide de l'API Embed de Twelve Labs et de Milvus. Cette intégration vous permet de traiter, stocker et récupérer du contenu vidéo avec une précision et une efficacité sans précédent. En exploitant les incorporations multimodales, vous avez créé un système qui comprend les nuances des données vidéo, ce qui ouvre des possibilités passionnantes pour la découverte de contenu, les systèmes de recommandation et l'analyse vidéo avancée.</p>
<p>Alors que vous continuez à développer et à affiner votre application, n'oubliez pas que la combinaison de la génération d'intégration avancée de Twelve Labs et du stockage vectoriel évolutif de Milvus constitue une base solide pour relever des défis encore plus complexes en matière de compréhension vidéo. Nous vous encourageons à expérimenter les fonctionnalités avancées présentées et à repousser les limites de ce qui est possible en matière de recherche et d'analyse vidéo.</p>
