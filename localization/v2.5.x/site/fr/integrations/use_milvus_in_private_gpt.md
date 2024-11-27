---
id: use_milvus_in_private_gpt.md
summary: >-
  Dans ce tutoriel, nous allons vous montrer comment utiliser Milvus comme base
  de données vectorielle pour PrivateGPT.
title: Utiliser Milvus dans PrivateGPT
---
<h1 id="Use-Milvus-in-PrivateGPT" class="common-anchor-header">Utiliser Milvus dans PrivateGPT<button data-href="#Use-Milvus-in-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://privategpt.dev/">PrivateGPT</a> est un projet d'IA prêt à la production qui permet aux utilisateurs de poser des questions sur leurs documents à l'aide de grands modèles de langage sans connexion Internet tout en garantissant la confidentialité à 100 %. PrivateGPT offre une API divisée en blocs de haut niveau et de bas niveau. Il fournit également un client Gradio UI et des outils utiles tels que des scripts de téléchargement de modèles en vrac et des scripts d'ingestion. Conceptuellement, PrivateGPT enveloppe un pipeline RAG et expose ses primitives, étant prêt à l'emploi et fournissant une implémentation complète de l'API et du pipeline RAG.</p>
<p>Dans ce tutoriel, nous allons vous montrer comment utiliser Milvus comme base de données vectorielles pour PrivateGPT.</p>
<div class="alert note">
<p>Ce tutoriel se réfère principalement au guide d'installation officiel de <a href="https://docs.privategpt.dev/installation/getting-started/installation">PrivateGPT</a>. Si vous trouvez que ce tutoriel contient des parties obsolètes, vous pouvez suivre en priorité le guide officiel et créer un problème avec nous.</p>
</div>
<h2 id="Base-requirements-to-run-PrivateGPT" class="common-anchor-header">Exigences de base pour faire fonctionner PrivateGPT<button data-href="#Base-requirements-to-run-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Clone-the-PrivateGPT-Repository" class="common-anchor-header">1. Cloner le dépôt PrivateGPT</h3><p>Clonez le dépôt et naviguez jusqu'à lui :</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/zylon-ai/private-gpt
$ <span class="hljs-built_in">cd</span> private-gpt
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Poetry" class="common-anchor-header">2. Installer Poetry</h3><p>Installez <a href="https://python-poetry.org/docs/#installing-with-the-official-installer">Poetry</a> pour la gestion des dépendances : Suivez les instructions sur le site officiel de Poetry pour l'installer.</p>
<h3 id="3-Optional-Install-make" class="common-anchor-header">3) (Facultatif) Installer make</h3><p>Pour exécuter divers scripts, vous devez installer make.</p>
<p>macOS (en utilisant Homebrew) :</p>
<pre><code translate="no" class="language-shell">$ brew install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows (utilisation de Chocolatey) :</p>
<pre><code translate="no" class="language-shell">$ choco install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Available-Modules" class="common-anchor-header">Installer les modules disponibles<button data-href="#Install-Available-Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>PrivateGPT permet de personnaliser la configuration de certains modules tels que LLM, Embeddings, Vector Stores, UI.</p>
<p>Dans ce tutoriel, nous utiliserons les modules suivants :</p>
<ul>
<li><strong>LLM</strong>: Ollama</li>
<li><strong>Embeddings</strong>: Ollama</li>
<li><strong>Vector Stores</strong>: Milvus</li>
<li><strong>UI</strong>: Gradio</li>
</ul>
<p>Exécutez la commande suivante pour utiliser la poésie afin d'installer les dépendances des modules requis :</p>
<pre><code translate="no" class="language-shell">$ poetry install --extras <span class="hljs-string">&quot;llms-ollama embeddings-ollama vector-stores-milvus ui&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Ollama-service" class="common-anchor-header">Démarrer le service Ollama<button data-href="#Start-Ollama-service" class="anchor-icon" translate="no">
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
    </button></h2><p>Allez sur <a href="https://ollama.com/">ollama.ai</a> et suivez les instructions pour installer Ollama sur votre machine.</p>
<p>Après l'installation, assurez-vous que l'application Ollama est fermée.</p>
<p>Maintenant, démarrez le service Ollama (il démarrera un serveur d'inférence local, servant à la fois le LLM et les Embeddings) :</p>
<pre><code translate="no" class="language-shell">$ ollama serve
<button class="copy-code-btn"></button></code></pre>
<p>Installer les modèles à utiliser, le modèle par défaut <code translate="no">settings-ollama.yaml</code> est configuré pour l'utilisateur <code translate="no">llama3.1</code> 8b LLM (~4GB) et <code translate="no">nomic-embed-text</code> Embeddings (~275MB).</p>
<p>Par défaut, PrivateGPT récupère automatiquement les modèles en fonction des besoins. Ce comportement peut être changé en modifiant la propriété <code translate="no">ollama.autopull_models</code>.</p>
<p>Dans tous les cas, si vous souhaitez extraire manuellement des modèles, exécutez les commandes suivantes :</p>
<pre><code translate="no" class="language-shell">$ ollama pull llama3.1
$ ollama pull nomic-embed-text
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez éventuellement changer vos modèles préférés dans le fichier <code translate="no">settings-ollama.yaml</code> et les extraire manuellement.</p>
<h2 id="Change-Milvus-Settings" class="common-anchor-header">Modifier les paramètres de Milvus<button data-href="#Change-Milvus-Settings" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans le fichier <code translate="no">settings-ollama.yaml</code>, définissez le vectorstore à milvus :</p>
<pre><code translate="no" class="language-yaml">vectorstore:
  database: milvus
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez également ajouter une configuration cumstom Milvus pour spécifier vos paramètres, comme ceci :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">milvus</span>:
  <span class="hljs-attr">uri</span>: <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
  <span class="hljs-attr">collection_name</span>: my_collection
<button class="copy-code-btn"></button></code></pre>
<p>Les options de configuration disponibles sont les suivantes :</p>
<table>
<thead>
<tr><th>Champ Option</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>uri</td><td>La valeur par défaut est "local_data/private_gpt/milvus/milvus_local.db" en tant que fichier local ; vous pouvez également configurer un serveur Milvus plus performant sur docker ou k8s, par exemple http://localhost:19530, en tant qu'uri ; pour utiliser <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, adaptez l'uri et le token au <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint et à la clé API</a> dans Zilliz Cloud.</td></tr>
<tr><td>jeton</td><td>Paire avec le serveur Milvus sur docker ou k8s ou la clé d'API de Zilliz Cloud.</td></tr>
<tr><td>nom_de_la_collection</td><td>Le nom de la collection, défini par défaut sur "milvus_db".</td></tr>
<tr><td>overwrite</td><td>Ecraser les données de la collection si elles existent, défini par défaut comme True.</td></tr>
</tbody>
</table>
<h2 id="Start-PrivateGPT" class="common-anchor-header">Démarrer PrivateGPT<button data-href="#Start-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois tous les réglages effectués, vous pouvez lancer PrivateGPT avec une interface utilisateur Gradio.</p>
<pre><code translate="no" class="language-shell">PGPT_PROFILES=ollama <span class="hljs-built_in">make</span> run
<button class="copy-code-btn"></button></code></pre>
<p>L'interface utilisateur sera disponible à l'adresse <code translate="no">http://0.0.0.0:8001</code>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/private_gpt_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Vous pouvez jouer avec l'interface et poser des questions sur vos documents.</p>
<p>Pour plus de détails, veuillez vous référer à la documentation officielle de <a href="https://docs.privategpt.dev/">PrivateGPT</a>.</p>
