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
<p>Dans ce tutoriel, nous allons vous montrer comment déployer Dify avec Milvus, pour permettre une récupération efficace et un moteur RAG.</p>
<h2 id="Clone-the-Repository" class="common-anchor-header">Cloner le référentiel<button data-href="#Clone-the-Repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Clonez le code source de Dify sur votre machine locale :</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-the-Environment-Variables" class="common-anchor-header">Définir les variables d'environnement<button data-href="#Set-the-Environment-Variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Naviguez vers le répertoire Docker dans le code source de Dify</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Copier le fichier de configuration de l'environnement</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cp</span> .env.example .<span class="hljs-built_in">env</span>
<button class="copy-code-btn"></button></code></pre>
<p>Modifier la valeur <code translate="no">VECTOR_STORE</code> dans le fichier <code translate="no">.env</code> </p>
<pre><code translate="no">VECTOR_STORE=milvus
<button class="copy-code-btn"></button></code></pre>
<p>Modifier la configuration Milvus dans le fichier <code translate="no">.env</code> </p>
<pre><code translate="no">MILVUS_URI=xxx
MILVUS_TOKEN=xxx
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration, veuillez utiliser l'URI externe du serveur, par exemple<code translate="no">http://172.16.16.16:19530</code>, comme votre <code translate="no">MILVUS_URI</code>.</p>
<p>Pour <code translate="no">MILVUS_TOKEN</code>, si vous n'avez pas défini de jeton pour votre serveur Milvus, vous pouvez le définir à une chaîne vide comme <code translate="no">MILVUS_TOKEN=</code>, sinon, vous devez le définir à votre jeton Milvus. Pour plus d'informations sur la manière de définir un jeton dans Milvus, vous pouvez consulter la <a href="https://milvus.io/docs/authenticate.md?tab=docker#Update-user-password">page authentifier</a>.</p>
<h2 id="Start-the-Docker-Containers" class="common-anchor-header">Démarrer les conteneurs Docker<button data-href="#Start-the-Docker-Containers" class="anchor-icon" translate="no">
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
    </button></h2><p>Choisissez la commande appropriée pour démarrer les conteneurs en fonction de la version de Docker Compose sur votre système. Vous pouvez utiliser la commande <code translate="no">$ docker compose version</code> pour vérifier la version et vous référer à la documentation Docker pour plus d'informations :</p>
<p>Si vous disposez de Docker Compose V2, utilisez la commande suivante :</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<p>Si vous avez Docker Compose V1, utilisez la commande suivante :</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Log-in-to-Dify" class="common-anchor-header">Connectez-vous à Dify<button data-href="#Log-in-to-Dify" class="anchor-icon" translate="no">
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
    </button></h2><p>Ouvrez votre navigateur et allez sur la page d'installation de Dify, et vous pouvez configurer votre compte administrateur ici :<code translate="no">http://localhost/install</code>, puis connectez-vous à la page principale de Dify pour une utilisation ultérieure.</p>
<p>Pour plus d'informations sur l'utilisation et les conseils, veuillez vous référer à la <a href="https://docs.dify.ai/">documentation de Dify</a>.</p>
