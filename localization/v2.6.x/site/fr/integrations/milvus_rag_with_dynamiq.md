---
id: milvus_rag_with_dynamiq.md
summary: >-
  Dans ce tutoriel, nous allons explorer comment utiliser Dynamiq avec Milvus,
  la base de données vectorielle haute performance conçue pour les flux de
  travail RAG. Milvus excelle dans le stockage, l'indexation et la récupération
  efficaces des embeddings vectoriels, ce qui en fait un composant indispensable
  pour les systèmes d'IA qui exigent un accès rapide et précis aux données
  contextuelles.
title: Démarrer avec Dynamiq et Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/milvus_rag_with_dynamiq.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/milvus_rag_with_dynamiq.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Getting-Started-with-Dynamiq-and-Milvus" class="common-anchor-header">Démarrer avec Dynamiq et Milvus<button data-href="#Getting-Started-with-Dynamiq-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://www.getdynamiq.ai/">Dynamiq</a> est un puissant framework Gen AI qui rationalise le développement d'applications basées sur l'IA. Avec un support robuste pour les agents RAG (retrieval-augmented generation) et LLM (large language model), Dynamiq permet aux développeurs de créer des systèmes intelligents et dynamiques avec facilité et efficacité.</p>
<p>Dans ce tutoriel, nous allons explorer comment utiliser Dynamiq avec <a href="https://milvus.io/">Milvus</a>, la base de données vectorielle de haute performance conçue pour les flux de travail RAG. Milvus excelle dans le stockage, l'indexation et la récupération efficaces des embeddings vectoriels, ce qui en fait un composant indispensable pour les systèmes d'IA qui exigent un accès rapide et précis aux données contextuelles.</p>
<p>Ce guide étape par étape couvrira deux flux de travail RAG fondamentaux :</p>
<ul>
<li><p><strong>Flux d'indexation de documents</strong>: apprenez à traiter les fichiers d'entrée (par exemple, les PDF), à transformer leur contenu en incorporations vectorielles et à les stocker dans Milvus. L'exploitation des capacités d'indexation hautes performances de Milvus garantit que vos données sont prêtes à être récupérées rapidement.</p></li>
<li><p><strong>Flux d'extraction de documents</strong>: Découvrez comment interroger Milvus pour des encastrements de documents pertinents et les utiliser pour générer des réponses perspicaces et contextuelles avec les agents LLM de Dynamiq, créant ainsi une expérience utilisateur transparente alimentée par l'IA.</p></li>
</ul>
<p>À la fin de ce tutoriel, vous aurez acquis une solide compréhension de la façon dont Milvus et Dynamiq travaillent ensemble pour construire des systèmes d'IA évolutifs et contextuels adaptés à vos besoins.</p>
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
    </button></h2><h3 id="Download-required-libraries" class="common-anchor-header">Télécharger les bibliothèques nécessaires<button data-href="#Download-required-libraries" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install dynamiq pymilvus milvus-lite</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si vous utilisez Google Colab, pour activer les dépendances qui viennent d'être installées, vous devrez peut-être <strong>redémarrer le runtime</strong> (cliquez sur le menu "Runtime" en haut de l'écran, et sélectionnez "Restart session" dans le menu déroulant).</p>
</div>
<h3 id="Configure-the-LLM-agent" class="common-anchor-header">Configurer l'agent LLM<button data-href="#Configure-the-LLM-agent" class="anchor-icon" translate="no">
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
    </button></h3><p>Nous utiliserons OpenAI comme LLM dans cet exemple. Vous devez préparer la <a href="https://platform.openai.com/docs/quickstart">clé api</a> <code translate="no">OPENAI_API_KEY</code> en tant que variable d'environnement.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="RAG---Document-Indexing-Flow" class="common-anchor-header">RAG - Flux d'indexation de documents<button data-href="#RAG---Document-Indexing-Flow" class="anchor-icon" translate="no">
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
    </button></h2><p>Ce tutoriel présente un flux de travail RAG (Retrieval-Augmented Generation) pour l'indexation de documents avec Milvus comme base de données vectorielle. Le flux de travail prend des fichiers PDF en entrée, les traite en plus petits morceaux, génère des embeddings vectoriels en utilisant le modèle d'embedding d'OpenAI, et stocke les embeddings dans une collection Milvus pour une récupération efficace.</p>
<p>À la fin de ce flux de travail, vous disposerez d'un système d'indexation de documents évolutif et efficace qui prendra en charge les futures tâches RAG telles que la recherche sémantique et la réponse aux questions.</p>
<h3 id="Import-Required-Libraries-and-Initialize-Workflow" class="common-anchor-header">Importer les bibliothèques requises et initialiser le flux de travail<button data-href="#Import-Required-Libraries-and-Initialize-Workflow" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Importing necessary libraries for the workflow</span>
<span class="hljs-keyword">from</span> io <span class="hljs-keyword">import</span> BytesIO
<span class="hljs-keyword">from</span> dynamiq <span class="hljs-keyword">import</span> Workflow
<span class="hljs-keyword">from</span> dynamiq.nodes <span class="hljs-keyword">import</span> InputTransformer
<span class="hljs-keyword">from</span> dynamiq.connections <span class="hljs-keyword">import</span> (
    OpenAI <span class="hljs-keyword">as</span> OpenAIConnection,
    Milvus <span class="hljs-keyword">as</span> MilvusConnection,
    MilvusDeploymentType,
)
<span class="hljs-keyword">from</span> dynamiq.nodes.converters <span class="hljs-keyword">import</span> PyPDFConverter
<span class="hljs-keyword">from</span> dynamiq.nodes.splitters.document <span class="hljs-keyword">import</span> DocumentSplitter
<span class="hljs-keyword">from</span> dynamiq.nodes.embedders <span class="hljs-keyword">import</span> OpenAIDocumentEmbedder
<span class="hljs-keyword">from</span> dynamiq.nodes.writers <span class="hljs-keyword">import</span> MilvusDocumentWriter

<span class="hljs-comment"># Initialize the workflow</span>
rag_wf = Workflow()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-PDF-Converter-Node" class="common-anchor-header">Définir le nœud de conversion PDF<button data-href="#Define-PDF-Converter-Node" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">converter = PyPDFConverter(document_creation_mode=<span class="hljs-string">&quot;one-doc-per-page&quot;</span>)
converter_added = rag_wf.flow.add_nodes(
    converter
)  <span class="hljs-comment"># Add node to the DAG (Directed Acyclic Graph)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-Document-Splitter-Node" class="common-anchor-header">Définir le nœud de séparation de documents<button data-href="#Define-Document-Splitter-Node" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">document_splitter = DocumentSplitter(
    split_by=<span class="hljs-string">&quot;sentence&quot;</span>,  <span class="hljs-comment"># Splits documents into sentences</span>
    split_length=<span class="hljs-number">10</span>,
    split_overlap=<span class="hljs-number">1</span>,
    input_transformer=InputTransformer(
        selector={
            <span class="hljs-string">&quot;documents&quot;</span>: <span class="hljs-string">f&quot;$<span class="hljs-subst">{[converter.<span class="hljs-built_in">id</span>]}</span>.output.documents&quot;</span>,
        },
    ),
).depends_on(
    converter
)  <span class="hljs-comment"># Set dependency on the PDF converter</span>
splitter_added = rag_wf.flow.add_nodes(document_splitter)  <span class="hljs-comment"># Add to the DAG</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-Embedding-Node" class="common-anchor-header">Définir le nœud d'intégration<button data-href="#Define-Embedding-Node" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">embedder = OpenAIDocumentEmbedder(
    connection=OpenAIConnection(api_key=os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>]),
    input_transformer=InputTransformer(
        selector={
            <span class="hljs-string">&quot;documents&quot;</span>: <span class="hljs-string">f&quot;$<span class="hljs-subst">{[document_splitter.<span class="hljs-built_in">id</span>]}</span>.output.documents&quot;</span>,
        },
    ),
).depends_on(
    document_splitter
)  <span class="hljs-comment"># Set dependency on the splitter</span>
document_embedder_added = rag_wf.flow.add_nodes(embedder)  <span class="hljs-comment"># Add to the DAG</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-Milvus-Vector-Store-Node" class="common-anchor-header">Définir le nœud Milvus Vector Store<button data-href="#Define-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">vector_store = (
    MilvusDocumentWriter(
        connection=MilvusConnection(
            deployment_type=MilvusDeploymentType.FILE, uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>
        ),
        index_name=<span class="hljs-string">&quot;my_milvus_collection&quot;</span>,
        dimension=<span class="hljs-number">1536</span>,
        create_if_not_exist=<span class="hljs-literal">True</span>,
        metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    )
    .inputs(documents=embedder.outputs.documents)  <span class="hljs-comment"># Connect to embedder output</span>
    .depends_on(embedder)  <span class="hljs-comment"># Set dependency on the embedder</span>
)
milvus_writer_added = rag_wf.flow.add_nodes(vector_store)  <span class="hljs-comment"># Add to the DAG</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2024-11-19 22:14:03 - WARNING - Environment variable 'MILVUS_API_TOKEN' not found
2024-11-19 22:14:03 - INFO - Pass in the local path ./milvus.db, and run it using milvus-lite
2024-11-19 22:14:04 - DEBUG - Created new connection using: 0bef2849fdb1458a85df8bb9dd27f51d
2024-11-19 22:14:04 - INFO - Collection my_milvus_collection does not exist. Creating a new collection.
2024-11-19 22:14:04 - DEBUG - Successfully created collection: my_milvus_collection
2024-11-19 22:14:05 - DEBUG - Successfully created an index on collection: my_milvus_collection
2024-11-19 22:14:05 - DEBUG - Successfully created an index on collection: my_milvus_collection
</code></pre>
<div class="alert note">
<p>Milvus propose deux types de déploiement, répondant à des cas d'utilisation différents :</p>
<ol>
<li><strong>MilvusDeploymentType.FILE</strong></li>
</ol>
<ul>
<li>Idéal pour le <strong>prototypage local</strong> ou le stockage de <strong>données à petite échelle</strong>.</li>
<li>Définissez <code translate="no">uri</code> sur un chemin de fichier local (par exemple, <code translate="no">./milvus.db</code>) pour tirer parti de <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>, qui stocke automatiquement toutes les données dans le fichier spécifié.</li>
<li>Il s'agit d'une option pratique pour une <strong>installation</strong> et une <strong>expérimentation</strong> <strong>rapides</strong>.</li>
</ul>
<ol start="2">
<li><strong>MilvusDeploymentType.HOST</strong></li>
</ol>
<ul>
<li><p>Conçu pour les scénarios de <strong>données à grande échelle</strong>, tels que la gestion de plus d'un million de vecteurs.</p>
<p><strong>Serveur auto-hébergé</strong></p>
<ul>
<li>Déployez un serveur Milvus haute performance à l'aide de <a href="https://milvus.io/docs/quickstart.md">Docker ou de Kubernetes</a>.</li>
<li>Configurez l'adresse et le port du serveur en tant que <code translate="no">uri</code> (par exemple, <code translate="no">http://localhost:19530</code>).</li>
<li>Si l'authentification est activée :</li>
<li>Fournir <code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code> comme <code translate="no">token</code>.</li>
<li>Si l'authentification est désactivée :</li>
<li>Ne pas paramétrer <code translate="no">token</code>.</li>
</ul>
<p><strong>Zilliz Cloud (service géré)</strong></p>
<ul>
<li>Pour une expérience Milvus entièrement gérée et basée sur le cloud, utilisez <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</li>
<li>Définissez les paramètres <code translate="no">uri</code> et <code translate="no">token</code> en fonction du <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">point de terminaison public et de la clé API</a> fournis dans la console Zilliz Cloud.</li>
</ul></li>
</ul>
</div>
<h3 id="Define-Input-Data-and-Run-the-Workflow" class="common-anchor-header">Définir les données d'entrée et exécuter le flux de travail<button data-href="#Define-Input-Data-and-Run-the-Workflow" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">file_paths = [<span class="hljs-string">&quot;./pdf_files/WhatisMilvus.pdf&quot;</span>]
input_data = {
    <span class="hljs-string">&quot;files&quot;</span>: [BytesIO(<span class="hljs-built_in">open</span>(path, <span class="hljs-string">&quot;rb&quot;</span>).read()) <span class="hljs-keyword">for</span> path <span class="hljs-keyword">in</span> file_paths],
    <span class="hljs-string">&quot;metadata&quot;</span>: [{<span class="hljs-string">&quot;filename&quot;</span>: path} <span class="hljs-keyword">for</span> path <span class="hljs-keyword">in</span> file_paths],
}

<span class="hljs-comment"># Run the workflow with the prepared input data</span>
inserted_data = rag_wf.run(input_data=input_data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">/var/folders/09/d0hx80nj35sb5hxb5cpc1q180000gn/T/ipykernel_31319/3145804345.py:4: ResourceWarning: unclosed file &lt;_io.BufferedReader name='./pdf_files/WhatisMilvus.pdf'&gt;
  BytesIO(open(path, &quot;rb&quot;).read()) for path in file_paths
ResourceWarning: Enable tracemalloc to get the object allocation traceback
2024-11-19 22:14:09 - INFO - Workflow 87878444-6a3d-43f3-ae32-0127564a959f: execution started.
2024-11-19 22:14:09 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution started.
2024-11-19 22:14:09 - INFO - Node PyPDF File Converter - 6eb42b1f-7637-407b-a3ac-4167bcf3b5c4: execution started.
2024-11-19 22:14:09 - INFO - Node PyPDF File Converter - 6eb42b1f-7637-407b-a3ac-4167bcf3b5c4: execution succeeded in 58ms.
2024-11-19 22:14:09 - INFO - Node DocumentSplitter - 5baed580-6de0-4dcd-bace-d7d947ab6c7f: execution started.
/Users/jinhonglin/anaconda3/envs/myenv/lib/python3.11/site-packages/websockets/legacy/__init__.py:6: DeprecationWarning: websockets.legacy is deprecated; see https://websockets.readthedocs.io/en/stable/howto/upgrade.html for upgrade instructions
  warnings.warn(  # deprecated in 14.0 - 2024-11-09
/Users/jinhonglin/anaconda3/envs/myenv/lib/python3.11/site-packages/pydantic/fields.py:804: PydanticDeprecatedSince20: Using extra keyword arguments on `Field` is deprecated and will be removed. Use `json_schema_extra` instead. (Extra keys: 'is_accessible_to_agent'). Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.7/migration/
  warn(
2024-11-19 22:14:09 - INFO - Node DocumentSplitter - 5baed580-6de0-4dcd-bace-d7d947ab6c7f: execution succeeded in 104ms.
2024-11-19 22:14:09 - INFO - Node OpenAIDocumentEmbedder - 91928f67-a00f-48f6-a864-f6e21672ec7e: execution started.
2024-11-19 22:14:09 - INFO - Node OpenAIDocumentEmbedder - d30a4cdc-0fab-4aff-b2e5-6161a62cb6fd: execution started.
2024-11-19 22:14:10 - INFO - HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
2024-11-19 22:14:10 - INFO - Node OpenAIDocumentEmbedder - d30a4cdc-0fab-4aff-b2e5-6161a62cb6fd: execution succeeded in 724ms.
2024-11-19 22:14:10 - INFO - Node MilvusDocumentWriter - dddab4cc-1dae-4e7e-9101-1ec353f530da: execution started.
2024-11-19 22:14:10 - INFO - HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
2024-11-19 22:14:10 - INFO - Node MilvusDocumentWriter - dddab4cc-1dae-4e7e-9101-1ec353f530da: execution succeeded in 66ms.
2024-11-19 22:14:10 - INFO - Node OpenAIDocumentEmbedder - 91928f67-a00f-48f6-a864-f6e21672ec7e: execution succeeded in 961ms.
2024-11-19 22:14:10 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution succeeded in 1.3s.
2024-11-19 22:14:10 - INFO - Workflow 87878444-6a3d-43f3-ae32-0127564a959f: execution succeeded in 1.3s.
</code></pre>
<p>Grâce à ce flux de travail, nous avons réussi à mettre en œuvre un pipeline d'indexation de documents en utilisant Milvus comme base de données vectorielle et le modèle d'intégration d'OpenAI pour la représentation sémantique. Cette configuration permet une recherche vectorielle rapide et précise, constituant la base des flux de travail RAG tels que la recherche sémantique, la recherche de documents et les interactions contextuelles pilotées par l'IA.</p>
<p>Grâce aux capacités de stockage évolutives de Milvus et à l'orchestration de Dynamiq, cette solution est prête à la fois pour le prototypage et les déploiements de production à grande échelle. Vous pouvez maintenant étendre ce pipeline pour inclure des tâches supplémentaires telles que la réponse à des questions basées sur l'extraction ou la génération de contenu pilotée par l'IA.</p>
<h2 id="RAG-Document-Retrieval-Flow" class="common-anchor-header">Flux de recherche de documents RAG<button data-href="#RAG-Document-Retrieval-Flow" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans ce tutoriel, nous mettons en œuvre un flux de recherche de documents RAG (Retrieval-Augmented Generation). Ce flux de travail prend une requête utilisateur, génère une intégration vectorielle pour celle-ci, récupère les documents les plus pertinents à partir d'une base de données vectorielle Milvus, et utilise un grand modèle de langage (LLM) pour générer une réponse détaillée et contextuelle basée sur les documents récupérés.</p>
<p>En suivant ce flux de travail, vous créerez une solution de bout en bout pour la recherche sémantique et la réponse aux questions, en combinant la puissance de la recherche de documents basée sur les vecteurs avec les capacités des LLM avancés d'OpenAI. Cette approche permet des réponses efficaces et intelligentes aux requêtes des utilisateurs en exploitant les connaissances stockées dans votre base de données de documents.</p>
<h3 id="Import-Required-Libraries-and-Initialize-Workflow" class="common-anchor-header">Importer les bibliothèques requises et initialiser le flux de travail<button data-href="#Import-Required-Libraries-and-Initialize-Workflow" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dynamiq <span class="hljs-keyword">import</span> Workflow
<span class="hljs-keyword">from</span> dynamiq.connections <span class="hljs-keyword">import</span> (
    OpenAI <span class="hljs-keyword">as</span> OpenAIConnection,
    Milvus <span class="hljs-keyword">as</span> MilvusConnection,
    MilvusDeploymentType,
)
<span class="hljs-keyword">from</span> dynamiq.nodes.embedders <span class="hljs-keyword">import</span> OpenAITextEmbedder
<span class="hljs-keyword">from</span> dynamiq.nodes.retrievers <span class="hljs-keyword">import</span> MilvusDocumentRetriever
<span class="hljs-keyword">from</span> dynamiq.nodes.llms <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">from</span> dynamiq.prompts <span class="hljs-keyword">import</span> Message, Prompt

<span class="hljs-comment"># Initialize the workflow</span>
retrieval_wf = Workflow()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-OpenAI-Connection-and-Text-Embedder" class="common-anchor-header">Définir la connexion OpenAI et l'intégrateur de texte<button data-href="#Define-OpenAI-Connection-and-Text-Embedder" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Establish OpenAI connection</span>
openai_connection = OpenAIConnection(api_key=os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>])

<span class="hljs-comment"># Define the text embedder node</span>
embedder = OpenAITextEmbedder(
    connection=openai_connection,
    model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,
)

<span class="hljs-comment"># Add the embedder node to the workflow</span>
embedder_added = retrieval_wf.flow.add_nodes(embedder)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-Milvus-Document-Retriever" class="common-anchor-header">Définir le récupérateur de documents Milvus<button data-href="#Define-Milvus-Document-Retriever" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">document_retriever = (
    MilvusDocumentRetriever(
        connection=MilvusConnection(
            deployment_type=MilvusDeploymentType.FILE, uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>
        ),
        index_name=<span class="hljs-string">&quot;my_milvus_collection&quot;</span>,
        dimension=<span class="hljs-number">1536</span>,
        top_k=<span class="hljs-number">5</span>,
    )
    .inputs(embedding=embedder.outputs.embedding)  <span class="hljs-comment"># Connect to embedder output</span>
    .depends_on(embedder)  <span class="hljs-comment"># Dependency on the embedder node</span>
)

<span class="hljs-comment"># Add the retriever node to the workflow</span>
milvus_retriever_added = retrieval_wf.flow.add_nodes(document_retriever)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2024-11-19 22:14:19 - WARNING - Environment variable 'MILVUS_API_TOKEN' not found
2024-11-19 22:14:19 - INFO - Pass in the local path ./milvus.db, and run it using milvus-lite
2024-11-19 22:14:19 - DEBUG - Created new connection using: 98d1132773af4298a894ad5925845fd2
2024-11-19 22:14:19 - INFO - Collection my_milvus_collection already exists. Skipping creation.
</code></pre>
<h3 id="Define-the-Prompt-Template" class="common-anchor-header">Définir le modèle d'invite<button data-href="#Define-the-Prompt-Template" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the prompt template for the LLM</span>
prompt_template = <span class="hljs-string">&quot;&quot;&quot;
Please answer the question based on the provided context.

Question: {{ query }}

Context:
{% for document in documents %}
- {{ document.content }}
{% endfor %}
&quot;&quot;&quot;</span>

<span class="hljs-comment"># Create the prompt object</span>
prompt = Prompt(messages=[Message(content=prompt_template, role=<span class="hljs-string">&quot;user&quot;</span>)])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-Answer-Generator" class="common-anchor-header">Définir le générateur de réponses<button data-href="#Define-the-Answer-Generator" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">answer_generator = (
    OpenAI(
        connection=openai_connection,
        model=<span class="hljs-string">&quot;gpt-4o&quot;</span>,
        prompt=prompt,
    )
    .inputs(
        documents=document_retriever.outputs.documents,
        query=embedder.outputs.query,
    )
    .depends_on(
        [document_retriever, embedder]
    )  <span class="hljs-comment"># Dependencies on retriever and embedder</span>
)

<span class="hljs-comment"># Add the answer generator node to the workflow</span>
answer_generator_added = retrieval_wf.flow.add_nodes(answer_generator)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Run-the-Workflow" class="common-anchor-header">Exécuter le flux de travail<button data-href="#Run-the-Workflow" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Run the workflow with a sample query</span>
sample_query = <span class="hljs-string">&quot;What is the Advanced Search Algorithms in Milvus?&quot;</span>

result = retrieval_wf.run(input_data={<span class="hljs-string">&quot;query&quot;</span>: sample_query})

answer = result.output.get(answer_generator.<span class="hljs-built_in">id</span>).get(<span class="hljs-string">&quot;output&quot;</span>, {}).get(<span class="hljs-string">&quot;content&quot;</span>)
<span class="hljs-built_in">print</span>(answer)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2024-11-19 22:14:22 - INFO - Workflow f4a073fb-dfb6-499c-8cac-5710a7ad6d47: execution started.
2024-11-19 22:14:22 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution started.
2024-11-19 22:14:22 - INFO - Node OpenAITextEmbedder - 47afb0bc-cf96-429d-b58f-11b6c935fec3: execution started.
2024-11-19 22:14:23 - INFO - HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
2024-11-19 22:14:23 - INFO - Node OpenAITextEmbedder - 47afb0bc-cf96-429d-b58f-11b6c935fec3: execution succeeded in 474ms.
2024-11-19 22:14:23 - INFO - Node MilvusDocumentRetriever - 51c8311b-4837-411f-ba42-21e28239a2ee: execution started.
2024-11-19 22:14:23 - INFO - Node MilvusDocumentRetriever - 51c8311b-4837-411f-ba42-21e28239a2ee: execution succeeded in 23ms.
2024-11-19 22:14:23 - INFO - Node LLM - ac722325-bece-453f-a2ed-135b0749ee7a: execution started.
2024-11-19 22:14:24 - INFO - HTTP Request: POST https://api.openai.com/v1/chat/completions &quot;HTTP/1.1 200 OK&quot;
2024-11-19 22:14:24 - INFO - Node LLM - ac722325-bece-453f-a2ed-135b0749ee7a: execution succeeded in 1.8s.
2024-11-19 22:14:25 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution succeeded in 2.4s.
2024-11-19 22:14:25 - INFO - Workflow f4a073fb-dfb6-499c-8cac-5710a7ad6d47: execution succeeded in 2.4s.


The advanced search algorithms in Milvus include a variety of in-memory and on-disk indexing/search algorithms such as IVF (Inverted File), HNSW (Hierarchical Navigable Small World), and DiskANN. These algorithms have been deeply optimized to enhance performance, delivering 30%-70% better performance compared to popular implementations like FAISS and HNSWLib. These optimizations are part of Milvus's design to ensure high efficiency and scalability in handling vector data.
</code></pre>
