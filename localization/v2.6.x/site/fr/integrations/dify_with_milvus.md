---
id: dify_with_milvus.md
summary: >-
  Dans ce tutoriel, nous vous montrerons comment déployer Dify avec Milvus, pour
  permettre une recherche efficace et un moteur RAG.
title: Déploiement de Dify avec Milvus
---
<h1 id="Deploying-Dify-with-Milvus" class="common-anchor-header">Déploiement de Dify avec Milvus<button data-href="#Deploying-Dify-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://dify.ai/">Dify</a> est une plateforme open-source conçue pour simplifier la création d'applications d'IA en combinant Backend-as-a-Service et LLMOps. Elle prend en charge les LLM les plus courants, offre une interface d'orchestration intuitive, des moteurs RAG de haute qualité et un cadre d'agent d'IA flexible. Avec des flux de travail à code bas, des interfaces et des API faciles à utiliser, Dify permet aux développeurs et aux utilisateurs non techniques de se concentrer sur la création de solutions d'IA innovantes et réelles sans avoir à gérer la complexité.</p>
<p>Dans ce tutoriel, nous vous montrerons comment déployer Dify avec Milvus, pour permettre une récupération efficace et un moteur RAG.</p>
<div class="alert note">
<p>Cette documentation est principalement basée sur la <a href="https://docs.dify.ai/">documentation</a> officielle <a href="https://docs.dify.ai/">de Dify</a>. Si vous trouvez un contenu obsolète ou incohérent, veuillez donner la priorité à la documentation officielle et n'hésitez pas à nous faire part d'un problème.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Clone-the-Repository" class="common-anchor-header">Cloner le dépôt</h3><p>Clonez le code source de Dify sur votre machine locale :</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Environment-Configuration" class="common-anchor-header">Préparer la configuration de l'environnement</h3><p>Naviguer vers le répertoire Docker dans le code source de Dify</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Copier le fichier de configuration de l'environnement</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deployment-Options" class="common-anchor-header">Options de déploiement<button data-href="#Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez déployer Dify avec Milvus en utilisant deux approches différentes. Choisissez celle qui correspond le mieux à vos besoins :</p>
<h2 id="Option-1-Using-Milvus-with-Docker" class="common-anchor-header">Option 1 : Utilisation de Milvus avec Docker<button data-href="#Option-1-Using-Milvus-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette option exécute les conteneurs Milvus avec Dify sur votre machine locale à l'aide de Docker Compose.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Configurer les variables d'environnement</h3><p>Modifier le fichier <code translate="no">.env</code> avec la configuration Milvus suivante :</p>
<pre><code translate="no">VECTOR_STORE=milvus
MILVUS_URI=http://host.docker.internal:19530
MILVUS_TOKEN=
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Le site <code translate="no">MILVUS_URI</code> utilise <code translate="no">host.docker.internal:19530</code> qui permet aux conteneurs Docker d'accéder à Milvus s'exécutant sur la machine hôte via le réseau interne de Docker.</li>
<li><code translate="no">MILVUS_TOKEN</code> peut être laissé vide pour les déploiements locaux de Milvus.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Démarrer les conteneurs Docker</h3><p>Démarrer les conteneurs avec le profil <code translate="no">milvus</code> pour inclure les services Milvus :</p>
<pre><code translate="no" class="language-shell">docker compose --profile milvus up -d
<button class="copy-code-btn"></button></code></pre>
<p>Cette commande démarrera le service Dify avec les conteneurs <code translate="no">milvus-standalone</code>, <code translate="no">etcd</code> et <code translate="no">minio</code>.</p>
<h2 id="Option-2-Using-Zilliz-Cloud" class="common-anchor-header">Option 2 : Utilisation de Zilliz Cloud<button data-href="#Option-2-Using-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette option connecte Dify à un service Milvus géré sur Zilliz Cloud.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Configurer les variables d'environnement</h3><p>Modifiez le fichier <code translate="no">.env</code> avec vos détails de connexion à Zilliz Cloud :</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<span class="hljs-attr">MILVUS_URI</span>=YOUR_ZILLIZ_CLOUD_ENDPOINT
<span class="hljs-attr">MILVUS_TOKEN</span>=YOUR_ZILLIZ_CLOUD_API_KEY
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Remplacez <code translate="no">YOUR_ZILLIZ_CLOUD_ENDPOINT</code> par votre <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">point de terminaison public</a> de Zilliz Cloud.</li>
<li>Remplacez <code translate="no">YOUR_ZILLIZ_CLOUD_API_KEY</code> par votre <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">clé API de</a> Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Démarrer les conteneurs Docker</h3><p>Démarrez uniquement les conteneurs Dify sans le profil Milvus :</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-Dify" class="common-anchor-header">Accès à Dify<button data-href="#Accessing-Dify" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Log-in-to-Dify" class="common-anchor-header">Connectez-vous à Dify</h3><p>Ouvrez votre navigateur et allez sur la page d'installation de Dify, et vous pouvez configurer votre compte administrateur ici :<code translate="no">http://localhost/install</code>, puis connectez-vous à la page principale de Dify pour une utilisation ultérieure.</p>
<p>Pour plus d'informations sur l'utilisation et les conseils, veuillez vous référer à la <a href="https://docs.dify.ai/">documentation de Dify</a>.</p>
