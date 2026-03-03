---
id: langchain_milvus_dido.md
summary: >-
  Ce guide explique comment utiliser la fonction d'incorporation de texte de
  Milvus 2.6 (également connue sous le nom de Data In Data Out) avec LangChain.
  Cette fonction permet au serveur Milvus de convertir automatiquement du texte
  brut en incorporations vectorielles, ce qui simplifie le code côté client et
  centralise la gestion des clés API.
title: Intégration de la fonction d'incorporation de texte de Milvus avec LangChain
---
<h1 id="Integrating-Milvus-Text-Embedding-Function-with-LangChain" class="common-anchor-header">Intégration de la fonction d'incorporation de texte de Milvus avec LangChain<button data-href="#Integrating-Milvus-Text-Embedding-Function-with-LangChain" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_dido.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_dido.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>Ce guide explique comment utiliser la <strong>fonction d'incorporation de texte</strong> de Milvus 2.6 (également connue sous le nom de Data In Data Out) avec LangChain. Cette fonction permet au serveur Milvus de convertir automatiquement du texte brut en incorporations vectorielles, ce qui simplifie le code côté client et centralise la gestion des clés API.</p>
<p><a href="https://milvus.io/">Milvus</a> est la base de données vectorielles open-source la plus avancée au monde, conçue spécifiquement pour prendre en charge les applications de recherche de similarité et d'intelligence artificielle. <a href="https://www.langchain.com/">LangChain</a> est un cadre de développement d'applications alimentées par de grands modèles de langage (LLM). En intégrant la fonction d'incorporation de texte de Milvus, vous pouvez obtenir une solution de recherche vectorielle plus simple et plus efficace dans vos applications LangChain.</p>
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
    </button></h2><p>Avant d'exécuter ce tutoriel, assurez-vous d'avoir installé les dépendances suivantes :</p>
<pre><code translate="no" class="language-shell">! pip install --upgrade langchain-milvus langchain-core langchain-openai
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si vous utilisez Google Colab, pour activer les dépendances qui viennent d'être installées, vous devrez peut-être <strong>redémarrer le runtime</strong> (cliquez sur le menu "Runtime" en haut de l'écran, et sélectionnez "Restart session" dans le menu déroulant).</p>
</div>
<h3 id="Configuring-the-Milvus-Server" class="common-anchor-header">Configuration du serveur Milvus<button data-href="#Configuring-the-Milvus-Server" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Important</strong>: la fonction d'incorporation de texte (Data In Data Out) n'est disponible que dans <strong>Milvus Server</strong>. <strong>Milvus Lite ne prend pas en charge cette fonction</strong>. Vous devez utiliser un serveur Milvus déployé avec Docker/Kubernetes.</p>
<p>Avant d'utiliser la fonction d'incorporation de texte, vous devez configurer les informations d'identification des fournisseurs de services d'incorporation sur le serveur Milvus.</p>
<p><strong>Déclarez vos clés sous credential :</strong></p>
<p>Vous pouvez répertorier une ou plusieurs clés API - donnez à chacune une étiquette que vous inventez et à laquelle vous ferez référence ultérieurement.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>

<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_OPENAI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Indiquer à Milvus la clé à utiliser pour les appels OpenAI</strong></p>
<p>Dans le même fichier, indiquez au fournisseur OpenAI l'étiquette que vous voulez qu'il utilise.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom url</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus de méthodes de configuration, veuillez vous référer à la <a href="https://milvus.io/docs/embedding-function-overview.md">documentation de la fonction d'intégration Milvus</a>.</p>
<h3 id="Starting-the-Milvus-Service" class="common-anchor-header">Démarrage du service Milvus<button data-href="#Starting-the-Milvus-Service" class="anchor-icon" translate="no">
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
    </button></h3><p>Assurez-vous que le serveur Milvus est en cours d'exécution et que la fonction d'intégration est activée. Vous pouvez déployer le serveur Milvus à l'aide de <a href="https://milvus.io/docs/install_standalone-docker.md">Docker</a> ou de <a href="https://milvus.io/docs/install_cluster-helm.md">Kubernetes</a>. Remarque : <strong>Milvus Lite ne prend pas en charge la fonction d'incorporation de texte</strong>.</p>
<h2 id="Understanding-Embedding-Client-side-vs-Server-side" class="common-anchor-header">Comprendre l'incorporation : Côté client vs côté serveur<button data-href="#Understanding-Embedding-Client-side-vs-Server-side" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant de plonger dans l'utilisation, commençons par comprendre les différences entre les deux approches d'intégration.</p>
<h3 id="Embedding-using-LangChains-Embeddings-class-Client-side" class="common-anchor-header">Intégration à l'aide de la classe <code translate="no">Embeddings</code> de LangChain (côté client)<button data-href="#Embedding-using-LangChains-Embeddings-class-Client-side" class="anchor-icon" translate="no">
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
    </button></h3><p>Dans l'approche traditionnelle de LangChain, la génération de l'intégration se fait côté client en utilisant la <a href="https://python.langchain.com/docs/api_reference/embeddings/langchain_core.embeddings.Embeddings">classe<code translate="no">Embeddings</code> </a>. Votre application doit utiliser la méthode <code translate="no">embed_query</code> de la classe pour appeler l'API d'intégration, puis stocker les vecteurs générés dans Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings
<span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Generate embedding on client side</span>
embeddings = OpenAIEmbeddings()
vector = embeddings.embed_query(<span class="hljs-string">&quot;Hello, world!&quot;</span>)
<span class="hljs-comment"># [0.123, -0.456, ...] A vector of floats</span>

vector_store = Milvus(
    embedding_function=embeddings,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    collection_name=<span class="hljs-string">&quot;traditional_approach_collection&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Diagramme de séquence :</strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/langchain_milvus_dito_langchain_embedding.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><strong>Caractéristiques :</strong></p>
<ul>
<li>Le client appelle directement l'API d'intégration</li>
<li>Nécessité de gérer les clés API du côté client</li>
<li>Flux de données : Texte → Client → API d'intégration → Vecteur → Milvus</li>
</ul>
<h3 id="Milvus-Text-Embedding-Function-Server-side-Data-In-Data-Out" class="common-anchor-header">Fonction d'incorporation de texte de Milvus (données d'entrée et de sortie côté serveur)<button data-href="#Milvus-Text-Embedding-Function-Server-side-Data-In-Data-Out" class="anchor-icon" translate="no">
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
    </button></h3><p>La fonction d'incorporation de texte de Milvus 2.6 (Data In Data Out) permet au serveur Milvus de convertir automatiquement du texte brut en incorporations vectorielles. Le client n'a qu'à fournir le texte, et Milvus s'occupe automatiquement de la génération de l'intégration.</p>
<p><strong>Diagramme de séquence :</strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/langchain_milvus_dito_milvus_embedding.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><strong>Caractéristiques :</strong></p>
<ul>
<li>Le serveur Milvus appelle l'API d'intégration</li>
<li>Les clés API sont gérées de manière centralisée du côté du serveur.</li>
<li>Flux de données : Texte → Milvus → API d'intégration → Vecteur (stocké dans Milvus)</li>
</ul>
<h3 id="Comparison-of-the-Two-Methods" class="common-anchor-header">Comparaison des deux méthodes<button data-href="#Comparison-of-the-Two-Methods" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Fonctionnalité</th><th>Intégration LangChain (côté client)</th><th>Fonction d'incorporation de texte de Milvus (côté serveur)</th></tr>
</thead>
<tbody>
<tr><td><strong>Lieu de traitement</strong></td><td>Application client</td><td>Serveur Milvus</td></tr>
<tr><td><strong>Appels API</strong></td><td>Le client appelle directement l'API d'incorporation</td><td>Le serveur Milvus appelle l'API d'intégration</td></tr>
<tr><td><strong>Gestion des clés API</strong></td><td>Nécessité d'une gestion côté client</td><td>Gestion centralisée côté serveur, plus sûre</td></tr>
<tr><td><strong>Complexité du code</strong></td><td>Nécessité de gérer les clés et les appels API côté client</td><td>Nécessité de configurer une seule fois dans la configuration de Milvus</td></tr>
<tr><td><strong>Cas d'utilisation</strong></td><td>- Nécessité d'un contrôle côté client sur le processus d'intégration<br>- Nécessité de mettre en cache les résultats de l'intégration côté client<br>- Nécessité de prendre en charge le changement de modèle d'intégration multiple</td><td>- Simplifier le code côté client<br>- Gestion centralisée des clés API côté serveur<br>- Besoin de traiter par lots de grands volumes de documents<br>- Réduction des interactions côté client avec des API externes<br>- Besoin de combiner avec les fonctionnalités intégrées de Milvus comme BM25</td></tr>
<tr><td><strong>Exigences relatives à la version de Milvus</strong></td><td>Toutes les versions (y compris Milvus Lite)</td><td>Milvus Lite non pris en charge</td></tr>
</tbody>
</table>
<p><strong>Ce didacticiel présente principalement la méthode Text Embedding Function (Data In Data Out) côté serveur de Milvus</strong>, une nouvelle fonctionnalité introduite dans Milvus 2.6 qui peut simplifier considérablement le code côté client et améliorer la sécurité.</p>
<h2 id="Using-Text-Embedding-Function" class="common-anchor-header">Utilisation de la fonction d'incorporation de texte<button data-href="#Using-Text-Embedding-Function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Example-1-Server-side-Embedding-Only" class="common-anchor-header">Exemple 1 : incorporation côté serveur uniquement<button data-href="#Example-1-Server-side-Embedding-Only" class="anchor-icon" translate="no">
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
    </button></h3><p>Il s'agit du cas d'utilisation le plus simple, qui repose entièrement sur le serveur Milvus pour générer des incorporations. Le client n'a besoin d'aucune fonction d'intégration.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_milvus.function <span class="hljs-keyword">import</span> TextEmbeddingBuiltInFunction
<span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

<span class="hljs-comment"># Create Text Embedding Function</span>
text_embedding_func = TextEmbeddingBuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,  <span class="hljs-comment"># Input field name (field containing text)</span>
    output_field_names=<span class="hljs-string">&quot;vector&quot;</span>,  <span class="hljs-comment"># Output field name (field storing vectors)</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># Vector dimension (must specify)</span>
    params={
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,  <span class="hljs-comment"># Service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,  <span class="hljs-comment"># Model name</span>
        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;apikey_dev&quot;</span>,    <span class="hljs-comment"># Optional: use credential label configured in milvus.yaml</span>
    },
)

<span class="hljs-comment"># Create Milvus vector store</span>
<span class="hljs-comment"># Note: embedding_function=None, because embedding is done on server side</span>
vector_store = Milvus(
    embedding_function=<span class="hljs-literal">None</span>,  <span class="hljs-comment"># Do not use client-side embedding</span>
    builtin_function=text_embedding_func,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,    # Strong consistency level, default is &quot;Session&quot;</span>
    auto_id=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># drop_old=True,  # If you want to drop old collection and create a new one</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Pour <code translate="no">connection_args</code>:</p>
<ul>
<li><strong>Doit utiliser le serveur Milvus</strong>: La fonction d'incorporation de texte n'est disponible que dans Milvus Server, Milvus Lite n'est pas pris en charge.</li>
<li>Utiliser l'uri du serveur, par exemple <code translate="no">http://localhost:19530</code> (déploiement Docker local) ou <code translate="no">http://your-server:19530</code> (serveur distant).</li>
<li>Si vous utilisez <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, utilisez le point de terminaison public comme <code translate="no">uri</code> et définissez le paramètre <code translate="no">token</code>.</li>
</ul>
<p>Lors de l'ajout de documents, il suffit de fournir du texte, il n'est pas nécessaire de précalculer les vecteurs. Milvus appellera automatiquement l'API OpenAI pour générer des embeddings.</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add documents (only need to provide text, no need to pre-compute vectors)</span>
documents = [
    Document(page_content=<span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>),
    Document(
        page_content=<span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>
    ),
    Document(
        page_content=<span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>
    ),
]

vector_store.add_documents(documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[462726375729313252, 462726375729313253, 462726375729313254]
</code></pre>
<p>Lors de la recherche, utilisez directement des requêtes textuelles et Milvus convertira automatiquement le texte de la requête en vecteurs pour la recherche.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search (directly use text query)</span>
results = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>, k=<span class="hljs-number">2</span>
)

<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Content: <span class="hljs-subst">{doc.page_content}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Metadata: <span class="hljs-subst">{doc.metadata}</span>\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">WARNING: All log messages before absl::InitializeLog() is called are written to STDERR
I0000 00:00:1765186679.227345 12227536 fork_posix.cc:71] Other threads are currently calling into gRPC, skipping fork() handlers


Content: Milvus simplifies semantic search through embeddings.
Metadata: {'pk': 462726375729313252}

Content: Semantic search helps users find relevant information quickly.
Metadata: {'pk': 462726375729313254}
</code></pre>
<h3 id="Example-2-Combining-Text-Embedding-and-BM25-Hybrid-Search" class="common-anchor-header">Exemple 2 : Combinaison de l'intégration de texte et de BM25 (recherche hybride)<button data-href="#Example-2-Combining-Text-Embedding-and-BM25-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>La combinaison de la recherche sémantique (Text Embedding) et de la recherche par mot-clé (BM25) permet d'obtenir des capacités de recherche hybride plus puissantes. La recherche sémantique permet de mieux comprendre l'intention de la requête, tandis que la recherche par mot-clé permet d'obtenir une correspondance exacte.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_milvus.function <span class="hljs-keyword">import</span> TextEmbeddingBuiltInFunction, BM25BuiltInFunction

<span class="hljs-comment"># Text Embedding Function (semantic search)</span>
text_embedding_func = TextEmbeddingBuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
    output_field_names=<span class="hljs-string">&quot;vector_dense&quot;</span>,
    dim=<span class="hljs-number">1536</span>,
    params={
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,
    },
)

<span class="hljs-comment"># BM25 Function (keyword search)</span>
bm25_func = BM25BuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
    output_field_names=<span class="hljs-string">&quot;vector_sparse&quot;</span>,
)

<span class="hljs-comment"># Create Milvus vector store</span>
vector_store = Milvus(
    embedding_function=<span class="hljs-literal">None</span>,
    builtin_function=[text_embedding_func, bm25_func],
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    vector_field=[<span class="hljs-string">&quot;vector_dense&quot;</span>, <span class="hljs-string">&quot;vector_sparse&quot;</span>],
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,    # Strong consistency level, default is &quot;Session&quot;</span>
    auto_id=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># drop_old=True,  # If you want to drop old collection and create a new one</span>
)

<span class="hljs-comment"># Add documents</span>
documents = [
    Document(page_content=<span class="hljs-string">&quot;Machine learning and artificial intelligence&quot;</span>),
    Document(page_content=<span class="hljs-string">&quot;The cat sat on the mat&quot;</span>),
]

vector_store.add_documents(documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[462726375729313255, 462726375729313256]
</code></pre>
<p>Utilisez <code translate="no">WeightedRanker</code> pour contrôler les poids de la recherche sémantique et de la recherche par mot-clé. Lorsque la pondération dense est plus élevée, les résultats sont davantage orientés vers la similarité sémantique ; lorsque la pondération clairsemée est plus élevée, les résultats sont davantage orientés vers la correspondance par mot-clé.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Hybrid search, use WeightedRanker to control weights</span>
<span class="hljs-comment"># 70% semantic search, 30% keyword search</span>
results = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;AI technology&quot;</span>,
    k=<span class="hljs-number">2</span>,
    ranker_type=<span class="hljs-string">&quot;weighted&quot;</span>,
    ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.3</span>]},
)

<span class="hljs-comment"># If you want to be more biased towards keyword matching, you can adjust weights</span>
<span class="hljs-comment"># 30% semantic search, 70% keyword search</span>
results_keyword_focused = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;cat mat&quot;</span>,
    k=<span class="hljs-number">2</span>,
    ranker_type=<span class="hljs-string">&quot;weighted&quot;</span>,
    ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]},
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">results
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 462726375729313255}, page_content='Machine learning and artificial intelligence'),
 Document(metadata={'pk': 462726375729313256}, page_content='The cat sat on the mat')]
</code></pre>
<pre><code translate="no" class="language-python">results_keyword_focused
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 462726375729313256}, page_content='The cat sat on the mat'),
 Document(metadata={'pk': 462726375729313255}, page_content='Machine learning and artificial intelligence')]
</code></pre>
<h2 id="Summary" class="common-anchor-header">Résumé<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous vous félicitons ! Vous avez appris à utiliser la fonction d'incorporation de texte de Milvus (Data In Data Out) avec LangChain. En déplaçant la génération d'intégration vers le côté serveur, vous pouvez simplifier le code côté client, gérer les clés API de manière centralisée et mettre en œuvre facilement la recherche hybride. Combinée à la fonction d'incorporation de texte et à BM25, Milvus vous offre de puissantes capacités de recherche vectorielle.</p>
