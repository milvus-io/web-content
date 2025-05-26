---
id: apify_milvus_rag.md
summary: >-
  Ce tutoriel explique comment parcourir des sites web à l'aide du Website
  Content Crawler d'Apify et enregistrer les données dans la base de données
  vectorielle Milvus/Zilliz afin de les utiliser ultérieurement pour répondre à
  des questions.
title: >-
  Génération améliorée par la recherche : Exploration de sites web avec Apify et
  enregistrement des données dans Milvus pour la réponse aux questions
---
<h1 id="Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="common-anchor-header">Génération améliorée par la recherche : Exploration de sites web avec Apify et enregistrement des données dans Milvus pour la réponse aux questions<button data-href="#Retrieval-Augmented-Generation-Crawling-Websites-with-Apify-and-Saving-Data-to-Milvus-for-Question-Answering" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/apify_milvus_rag.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a></p>
<p>Ce tutoriel explique comment explorer des sites web à l'aide du Website Content Crawler d'Apify et enregistrer les données dans la base de données vectorielle Milvus/Zilliz afin de les utiliser ultérieurement pour répondre à des questions.</p>
<p><a href="https://apify.com/">Apify</a> est une plateforme de scraping web et d'extraction de données qui offre un marché d'applications avec plus de deux mille outils cloud prêts à l'emploi, connus sous le nom d'Acteurs. Ces outils sont idéaux pour des cas d'utilisation tels que l'extraction de données structurées à partir de sites web de commerce électronique, de médias sociaux, de moteurs de recherche, de cartes en ligne, etc.</p>
<p>Par exemple, l'acteur <a href="https://apify.com/apify/website-content-crawler">Website Content Crawler</a> peut explorer en profondeur des sites web, nettoyer leur HTML en supprimant les cookies, le pied de page ou la navigation, puis transformer le HTML en Markdown.</p>
<p>L'intégration d'Apify pour Milvus/Zilliz permet de télécharger facilement des données du web vers la base de données vectorielle.</p>
<h1 id="Before-you-begin" class="common-anchor-header">Avant de commencer<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h1><p>Avant d'exécuter ce notebook, assurez-vous que vous disposez des éléments suivants :</p>
<ul>
<li><p>un compte Apify et <a href="https://docs.apify.com/platform/integrations/api">APIFY_API_TOKEN</a>.</p></li>
<li><p>un compte OpenAI et la <a href="https://platform.openai.com/docs/quickstart">clé OPENAI_API_KEY</a></p></li>
<li><p>Un <a href="https://cloud.zilliz.com">compte Zilliz Cloud</a> (un service cloud entièrement géré pour Milvus).</p></li>
<li><p>L'URI et le Token de la base de données Zilliz</p></li>
</ul>
<h2 id="Install-dependencies" class="common-anchor-header">Installer les dépendances<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">$ pip install --upgrade --quiet  apify==<span class="hljs-number">1.7</span><span class="hljs-number">.2</span> langchain-core==<span class="hljs-number">0.3</span><span class="hljs-number">.5</span> langchain-milvus==<span class="hljs-number">0.1</span><span class="hljs-number">.5</span> langchain-openai==<span class="hljs-number">0.2</span><span class="hljs-number">.0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-Apify-and-Open-API-keys" class="common-anchor-header">Configuration des clés Apify et Open API<button data-href="#Set-up-Apify-and-Open-API-keys" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> getpass <span class="hljs-keyword">import</span> getpass

os.environ[<span class="hljs-string">&quot;APIFY_API_TOKEN&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR APIFY_API_TOKEN&quot;</span>)
os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR OPENAI_API_KEY&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR APIFY_API_TOKEN··········
Enter YOUR OPENAI_API_KEY··········
</code></pre>
<h2 id="Set-up-MilvusZilliz-URI-token-and-collection-name" class="common-anchor-header">Configurer l'URI Milvus/Zilliz, le jeton et le nom de la collection<button data-href="#Set-up-MilvusZilliz-URI-token-and-collection-name" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous avez besoin de l'URI et du jeton de votre Milvus/Zilliz pour configurer le client.</p>
<ul>
<li>Si vous avez un serveur Milvus auto-déployé sur <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>, utilisez l'adresse et le port du serveur comme uri, par exemple<code translate="no">http://localhost:19530</code>. Si vous activez la fonction d'authentification sur Milvus, utilisez "<your_username>:<your_password>" comme jeton, sinon laissez le jeton comme chaîne vide.</li>
<li>Si vous utilisez <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, le service en nuage entièrement géré pour Milvus, ajustez les valeurs <code translate="no">uri</code> et <code translate="no">token</code>, qui correspondent au <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">point de terminaison public et à la clé API</a> dans Zilliz Cloud.</li>
</ul>
<p>Notez que la collection ne doit pas nécessairement exister au préalable. Elle sera automatiquement créée lorsque les données seront téléchargées dans la base de données.</p>
<pre><code translate="no" class="language-python">os.environ[<span class="hljs-string">&quot;MILVUS_URI&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR MILVUS_URI&quot;</span>)
os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>] = getpass(<span class="hljs-string">&quot;Enter YOUR MILVUS_TOKEN&quot;</span>)

MILVUS_COLLECTION_NAME = <span class="hljs-string">&quot;apify&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Enter YOUR MILVUS_URI··········
Enter YOUR MILVUS_TOKEN··········
</code></pre>
<h2 id="Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="common-anchor-header">Utilisation du Website Content Crawler pour extraire le contenu textuel de Milvus.io<button data-href="#Using-the-Website-Content-Crawler-to-scrape-text-content-from-Milvusio" class="anchor-icon" translate="no">
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
    </button></h2><p>Ensuite, nous allons utiliser le Website Content Crawler avec le SDK Apify Python. Nous commencerons par définir actor_id et run_input, puis nous spécifierons les informations qui seront enregistrées dans la base de données vectorielle.</p>
<p>Le <code translate="no">actor_id=&quot;apify/website-content-crawler&quot;</code> est l'identifiant du Website Content Crawler. Le comportement du crawler peut être entièrement contrôlé via les paramètres run_input (voir la <a href="https://apify.com/apify/website-content-crawler/input-schema">page input</a> pour plus de détails). Dans cet exemple, nous allons explorer la documentation Milvus, qui ne nécessite pas de rendu JavaScript. Par conséquent, nous définissons <code translate="no">crawlerType=cheerio</code>, <code translate="no">startUrls</code> et nous limitons le nombre de pages explorées en définissant <code translate="no">maxCrawlPages=10</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> apify_client <span class="hljs-keyword">import</span> ApifyClient

client = ApifyClient(os.getenv(<span class="hljs-string">&quot;APIFY_API_TOKEN&quot;</span>))

actor_id = <span class="hljs-string">&quot;apify/website-content-crawler&quot;</span>
run_input = {
    <span class="hljs-string">&quot;crawlerType&quot;</span>: <span class="hljs-string">&quot;cheerio&quot;</span>,
    <span class="hljs-string">&quot;maxCrawlPages&quot;</span>: <span class="hljs-number">10</span>,
    <span class="hljs-string">&quot;startUrls&quot;</span>: [{<span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;https://milvus.io/&quot;</span>}, {<span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;https://zilliz.com/&quot;</span>}],
}

actor_call = client.actor(actor_id).call(run_input=run_input)
<button class="copy-code-btn"></button></code></pre>
<p>Le Website Content Crawler va explorer le site en profondeur jusqu'à ce qu'il atteigne la limite prédéfinie par <code translate="no">maxCrawlPages</code>. Les données extraites seront stockées dans un site <code translate="no">Dataset</code> sur la plateforme Apify. Pour accéder à ces données et les analyser, vous pouvez utiliser la fonction de récupération de données. <code translate="no">defaultDatasetId</code></p>
<pre><code translate="no" class="language-python">dataset_id = actor_call[<span class="hljs-string">&quot;defaultDatasetId&quot;</span>]
dataset_id
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'P9dLFfeJAljlePWnz'
</code></pre>
<p>Le code suivant récupère les données extraites de la plate-forme Apify <code translate="no">Dataset</code> et affiche le premier site web extrait.</p>
<pre><code translate="no" class="language-python">item = client.dataset(dataset_id).list_items(limit=<span class="hljs-number">1</span>).items
item[<span class="hljs-number">0</span>].get(<span class="hljs-string">&quot;text&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'The High-Performance Vector Database Built for Scale\nStart running Milvus in seconds\nfrom pymilvus import MilvusClient client = MilvusClient(&quot;milvus_demo.db&quot;) client.create_collection( collection_name=&quot;demo_collection&quot;, dimension=5 )\nDeployment Options to Match Your Unique Journey\nMilvus Lite\nLightweight, easy to start\nVectorDB-as-a-library runs in notebooks/ laptops with a pip install\nBest for learning and prototyping\nMilvus Standalone\nRobust, single-machine deployment\nComplete vector database for production or testing\nIdeal for datasets with up to millions of vectors\nMilvus Distributed\nScalable, enterprise-grade solution\nHighly reliable and distributed vector database with comprehensive toolkit\nScale horizontally to handle billions of vectors\nZilliz Cloud\nFully managed with minimal operations\nAvailable in both serverless and dedicated cluster\nSaaS and BYOC options for different security and compliance requirements\nTry Free\nLearn more about different Milvus deployment models\nLoved by GenAI developers\nBased on our research, Milvus was selected as the vector database of choice (over Chroma and Pinecone). Milvus is an open-source vector database designed specifically for similarity search on massive datasets of high-dimensional vectors.\nWith its focus on efficient vector similarity search, Milvus empowers you to build robust and scalable image retrieval systems. Whether you’re managing a personal photo library or developing a commercial image search application, Milvus offers a powerful foundation for unlocking the hidden potential within your image collections.\nBhargav Mankad\nSenior Solution Architect\nMilvus is a powerful vector database tailored for processing and searching extensive vector data. It stands out for its high performance and scalability, rendering it perfect for machine learning, deep learning, similarity search tasks, and recommendation systems.\nIgor Gorbenko\nBig Data Architect\nStart building your GenAI app now\nGuided with notebooks developed by us and our community\nRAG\nTry Now\nImage Search\nTry Now\nMultimodal Search\nTry Now\nUnstructured Data Meetups\nJoin a Community of Passionate Developers and Engineers Dedicated to Gen AI.\nRSVP now\nWhy Developers Prefer Milvus for Vector Databases\nScale as needed\nElastic scaling to tens of billions of vectors with distributed architecture.\nBlazing fast\nRetrieve data quickly and accurately with Global Index, regardless of scale.\nReusable Code\nWrite once, and deploy with one line of code into the production environment.\nFeature-rich\nMetadata filtering, hybrid search, multi-vector and more.\nWant to learn more about Milvus? View our documentation\nJoin the community of developers building GenAI apps with Milvus, now with over 25 million downloads\nGet Milvus Updates\nSubscribe to get updates on the latest Milvus releases, tutorials and training from Zilliz, the creator and key maintainer of Milvus.'
</code></pre>
<p>Pour télécharger les données dans la base de données Milvus, nous utilisons l'<a href="https://apify.com/apify/milvus-integration">intégration Milvus d'Apify</a>. Tout d'abord, nous devons définir les paramètres de la base de données Milvus. Ensuite, nous sélectionnons les champs (<code translate="no">datasetFields</code>) que nous voulons stocker dans la base de données. Dans l'exemple ci-dessous, nous enregistrons le champ <code translate="no">text</code> et <code translate="no">metadata.title</code>.</p>
<pre><code translate="no" class="language-python">milvus_integration_inputs = {
    <span class="hljs-string">&quot;milvusUri&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>),
    <span class="hljs-string">&quot;milvusToken&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>),
    <span class="hljs-string">&quot;milvusCollectionName&quot;</span>: MILVUS_COLLECTION_NAME,
    <span class="hljs-string">&quot;datasetFields&quot;</span>: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;metadata.title&quot;</span>],
    <span class="hljs-string">&quot;datasetId&quot;</span>: actor_call[<span class="hljs-string">&quot;defaultDatasetId&quot;</span>],
    <span class="hljs-string">&quot;performChunking&quot;</span>: <span class="hljs-literal">True</span>,
    <span class="hljs-string">&quot;embeddingsApiKey&quot;</span>: os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
    <span class="hljs-string">&quot;embeddingsProvider&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>Nous allons maintenant appeler <code translate="no">apify/milvus-integration</code> pour stocker les données.</p>
<pre><code translate="no" class="language-python">actor_call = client.actor(<span class="hljs-string">&quot;apify/milvus-integration&quot;</span>).call(
    run_input=milvus_integration_inputs
)
<button class="copy-code-btn"></button></code></pre>
<p>Toutes les données extraites sont maintenant stockées dans la base de données Milvus et sont prêtes à être extraites et à faire l'objet de réponses aux questions.</p>
<h1 id="Retrieval-and-LLM-generative-pipeline" class="common-anchor-header">Récupération et pipeline génératif LLM<button data-href="#Retrieval-and-LLM-generative-pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>Ensuite, nous allons définir le pipeline d'extraction-augmentation à l'aide de Langchain. Le pipeline fonctionne en deux étapes :</p>
<ul>
<li>Vectorstore (Milvus) : Langchain récupère les documents pertinents de Milvus en faisant correspondre les enchâssements de la requête avec les enchâssements des documents stockés.</li>
<li>Réponse LLM : Les documents récupérés fournissent un contexte au LLM (par exemple, GPT-4) pour générer une réponse éclairée.</li>
</ul>
<p>Pour plus de détails sur la chaîne RAG, veuillez vous référer à la <a href="https://python.langchain.com/v0.2/docs/tutorials/rag/">documentation Langchain</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.output_parsers <span class="hljs-keyword">import</span> StrOutputParser
<span class="hljs-keyword">from</span> langchain_core.prompts <span class="hljs-keyword">import</span> PromptTemplate
<span class="hljs-keyword">from</span> langchain_core.runnables <span class="hljs-keyword">import</span> RunnablePassthrough
<span class="hljs-keyword">from</span> langchain_milvus.vectorstores <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI, OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)

vectorstore = Milvus(
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>),
        <span class="hljs-string">&quot;token&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>),
    },
    embedding_function=embeddings,
    collection_name=MILVUS_COLLECTION_NAME,
)

prompt = PromptTemplate(
    input_variables=[<span class="hljs-string">&quot;context&quot;</span>, <span class="hljs-string">&quot;question&quot;</span>],
    template=<span class="hljs-string">&quot;Use the following pieces of retrieved context to answer the question. If you don&#x27;t know the answer, &quot;</span>
    <span class="hljs-string">&quot;just say that you don&#x27;t know. \nQuestion: {question} \nContext: {context} \nAnswer:&quot;</span>,
)


<span class="hljs-keyword">def</span> <span class="hljs-title function_">format_docs</span>(<span class="hljs-params">docs</span>):
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs)


rag_chain = (
    {
        <span class="hljs-string">&quot;context&quot;</span>: vectorstore.as_retriever() | format_docs,
        <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough(),
    }
    | prompt
    | ChatOpenAI(model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>)
    | StrOutputParser()
)
<button class="copy-code-btn"></button></code></pre>
<p>Une fois que nous avons les données dans la base de données, nous pouvons commencer à poser des questions.</p>
<hr>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What is Milvus database?&quot;</span>

rag_chain.invoke(question)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'Milvus is an open-source vector database specifically designed for billion-scale vector similarity search. It facilitates efficient management and querying of vector data, which is essential for applications involving unstructured data, such as AI and machine learning. Milvus allows users to perform operations like CRUD (Create, Read, Update, Delete) and vector searches, making it a powerful tool for handling large datasets.'
</code></pre>
<h1 id="Conclusion" class="common-anchor-header">Conclusion<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans ce tutoriel, nous avons montré comment explorer le contenu d'un site Web à l'aide d'Apify, stocker les données dans une base de données vectorielles Milvus et utiliser un pipeline augmenté par extraction pour effectuer des tâches de réponse à des questions. En combinant les capacités de scraping web d'Apify avec Milvus/Zilliz pour le stockage vectoriel et Langchain pour les modèles de langage, vous pouvez construire des systèmes de recherche d'informations très efficaces.</p>
<p>Pour améliorer la collecte et la mise à jour des données dans la base de données, l'intégration d'Apify propose des <a href="https://apify.com/apify/milvus-integration#incrementally-update-database-from-the-website-content-crawler">mises à jour incrémentielles</a>, qui ne mettent à jour que les données nouvelles ou modifiées sur la base des sommes de contrôle. En outre, elle peut <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">supprimer</a> automatiquement <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">les</a> données <a href="https://apify.com/apify/milvus-integration#delete-outdated-expired-data">obsolètes</a> qui n'ont pas été explorées dans un délai donné. Ces fonctionnalités permettent d'optimiser votre base de données vectorielles et de garantir que votre pipeline d'extraction reste efficace et à jour avec un minimum d'efforts manuels.</p>
<p>Pour plus de détails sur l'intégration <a href="https://docs.apify.com/platform/integrations/milvus">Apify-Milvus</a>, veuillez vous référer à la <a href="https://docs.apify.com/platform/integrations/milvus">documentation Apify Milvus</a> et au <a href="https://apify.com/apify/milvus-integration">fichier README de l'intégration</a>.</p>
