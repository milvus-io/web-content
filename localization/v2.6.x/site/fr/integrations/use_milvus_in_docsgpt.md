---
id: use_milvus_in_docsgpt.md
summary: >-
  Dans ce tutoriel, nous allons vous montrer comment utiliser Milvus comme base
  de données vectorielle pour DocsGPT.
title: Utiliser Milvus dans DocsGPT
---
<h1 id="Use-Milvus-in-DocsGPT" class="common-anchor-header">Utiliser Milvus dans DocsGPT<button data-href="#Use-Milvus-in-DocsGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/arc53/DocsGPT">DocsGPT</a> est une solution open-source avancée qui simplifie la recherche d'informations dans la documentation d'un projet en intégrant de puissants modèles GPT. Il permet aux développeurs d'obtenir facilement des réponses précises à leurs questions sur un projet, en éliminant les recherches manuelles qui prennent du temps.</p>
<p>Dans ce tutoriel, nous allons vous montrer comment utiliser Milvus comme base de données vectorielle pour DocsGPT.</p>
<div class="alert note">
<p>Ce tutoriel se réfère principalement au guide d'installation officiel de <a href="https://github.com/arc53/DocsGPT?tab=readme-ov-file#quickstart">DocsGPT</a>. Si vous trouvez que ce tutoriel contient des parties obsolètes, vous pouvez suivre en priorité le guide officiel et créer un problème avec nous.</p>
</div>
<h2 id="Requirements" class="common-anchor-header">Conditions requises<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Assurez-vous que <a href="https://docs.docker.com/engine/install/">Docker</a> est installé</p>
<h2 id="Clone-the-repository" class="common-anchor-header">Cloner le dépôt<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Clonez le dépôt et naviguez jusqu'à lui :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/arc53/DocsGPT.git</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> DocsGPT</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-dependency" class="common-anchor-header">Ajouter une dépendance<button data-href="#Add-dependency" class="anchor-icon" translate="no">
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
    </button></h2><p>Ajoutez la dépendance <code translate="no">langchain-milvus</code> au fichier <code translate="no">requirements.txt</code> dans le dossier <code translate="no">application</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;\nlangchain-milvus==0.1.6&quot;</span> &gt;&gt; ./application/requirements.txt</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-environment-variables" class="common-anchor-header">Définir les variables d'environnement<button data-href="#Set-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Ajoutez <code translate="no">VECTOR_STORE=milvus</code>, <code translate="no">MILVUS_URI=...</code>, <code translate="no">MILVUS_TOKEN=...</code> aux variables d'environnement pour les services <code translate="no">backend</code> et <code translate="no">worker</code> dans le fichier <code translate="no">docker-compose.yaml</code>, comme ceci :</p>
<pre><code translate="no" class="language-yaml">  <span class="hljs-attr">backend:</span>
    <span class="hljs-attr">build:</span> <span class="hljs-string">./application</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">VECTOR_STORE=milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_URI=...</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_TOKEN=...</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-yaml">  <span class="hljs-attr">worker:</span>
    <span class="hljs-attr">build:</span> <span class="hljs-string">./application</span>
    <span class="hljs-attr">command:</span> <span class="hljs-string">celery</span> <span class="hljs-string">-A</span> <span class="hljs-string">application.app.celery</span> <span class="hljs-string">worker</span> <span class="hljs-string">-l</span> <span class="hljs-string">INFO</span> <span class="hljs-string">-B</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">VECTOR_STORE=milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_URI=...</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_TOKEN=...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour les services <code translate="no">MILVUS_URI</code> et <code translate="no">MILVUS_TOKEN</code>, vous pouvez utiliser le service Zilliz <a href="https://zilliz.com/cloud">Cloud</a>(recommandé) entièrement géré ou le service Milvus démarré manuellement.</p>
<ul>
<li><p>Pour le service Zillz Cloud entièrement géré : Nous recommandons d'utiliser le service Zilliz Cloud. Vous pouvez vous inscrire pour un compte d'essai gratuit sur <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Vous obtiendrez ensuite les adresses <code translate="no">MILVUS_URI</code> et <code translate="no">MILVUS_TOKEN</code>, qui correspondent au <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">point de terminaison public et à la clé API</a>.</p></li>
<li><p>Pour le service Milvus démarré manuellement : Si vous souhaitez configurer un service Milvus, vous pouvez suivre la <a href="https://milvus.io/docs/install_standalone-docker-compose.md">documentation officielle Milvus</a> pour configurer un serveur Milvus, puis obtenir les adresses <code translate="no">MILVUS_URI</code> et <code translate="no">MILVUS_TOKEN</code> du serveur. Les adresses <code translate="no">MILVUS_URI</code> et <code translate="no">MILVUS_TOKEN</code> doivent être au format <code translate="no">http://&lt;your_server_ip&gt;:19530</code> et <code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code> respectivement.</p></li>
</ul>
<h2 id="Start-the-services" class="common-anchor-header">Démarrez les services<button data-href="#Start-the-services" class="anchor-icon" translate="no">
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
    </button></h2><p>Exécutez : <code translate="no">./setup.sh</code></p>
<p>Naviguez ensuite jusqu'à http://localhost:5173/.</p>
<p>Vous pouvez jouer avec l'interface utilisateur et poser des questions sur vos documents.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/doscgpt_ui.png" alt="alt text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>texte alt</span> </span></p>
<p>Si vous souhaitez arrêter les services, exécutez :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose down</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus de détails et des configurations plus avancées, veuillez vous référer à la documentation officielle de <a href="https://github.com/arc53/DocsGPT">DocsGPT</a>.</p>
