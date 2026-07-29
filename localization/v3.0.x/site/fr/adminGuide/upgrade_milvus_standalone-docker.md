---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: >-
  Découvrez comment mettre à niveau Milvus en mode autonome à l'aide de Docker
  Compose.
title: Mise à niveau de Milvus en mode autonome avec Docker Compose
---
<div class="tab-wrapper"><a href="/docs/fr/upgrade_milvus_standalone-operator.md" class=''>Milvus,</a><a href="/docs/fr/upgrade_milvus_standalone-docker.md" class='active '>Operator</a>, Helm, Docker<a href="/docs/fr/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">Mise à niveau de Milvus en mode autonome avec Docker Compose<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide décrit comment mettre à niveau un déploiement autonome de Milvus 2.6.x vers la version 3.0.0 à l'aide de Docker Compose.</p>
<div class="alert note">
<p>Cette procédure a été validée avec la configuration officielle Docker Compose de Milvus 2.6.20 en mode autonome. La mise à niveau a conservé etcd, MinIO, Woodpecker et les répertoires de données existants, et n’a modifié que l’image Milvus pour passer à <code translate="no">milvusdb/milvus:v3.0.0</code>.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Docker Engine et Docker Compose V2</li>
<li>Un déploiement autonome existant de Milvus 2.6.x géré par Docker Compose</li>
<li>Le fichier Docker Compose et la configuration utilisés pour le déploiement existant</li>
<li>Une sauvegarde récente des métadonnées et des données persistantes de Milvus</li>
</ul>
<p><strong>Limitations relatives à la file d’attente de messages</strong>: lors de la mise à niveau vers Milvus v3.0.0, vous devez conserver votre choix actuel de file d’attente de messages. Le passage d’un système de file d’attente de messages à un autre pendant la mise à niveau n’est pas pris en charge. La prise en charge du changement de système de file d’attente de messages sera disponible dans les versions futures.</p>
<div class="alert warning">
<p>Ne remplacez pas votre fichier Compose actuel et ne modifiez pas les versions des dépendances dans le cadre de cette procédure. Conservez l’etcd, le stockage d’objets, la file d’attente de messages, les volumes et la configuration existants. Mettez à jour uniquement le tag de l’image Milvus.</p>
<p>Cette procédure ne prend pas en charge la rétrogradation ou la restauration de l’image Milvus vers la version 2.6.x. Une fois que la version 3.0.0 a écrit des données, une annulation portant uniquement sur l’image peut ne pas parvenir à lire l’état mis à jour. Si la mise à niveau échoue, arrêtez les écritures et utilisez un plan de reprise qui restaure les métadonnées antérieures à la mise à niveau ainsi que les sauvegardes des données persistantes. Testez d’abord le plan de reprise dans un environnement hors production.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">Processus de mise à niveau<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Back-up-the-current-configuration" class="common-anchor-header">Étape 1 : Sauvegardez la configuration actuelle<button data-href="#Step-1-Back-up-the-current-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Enregistrez une copie du fichier Compose actuel et de tous les fichiers de configuration Milvus montés :</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cp</span> docker-compose.yml docker-compose-before-upgrade.yml
<button class="copy-code-btn"></button></code></pre>
<p>Vérifiez que les conteneurs actuels sont en bon état de fonctionnement avant de lancer la mise à niveau :</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Update-the-Milvus-image" class="common-anchor-header">Étape 2 : Mettre à jour l’image Milvus<button data-href="#Step-2-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>Dans le fichier Compose existant, mettez à jour uniquement l’image du service « <code translate="no">standalone</code> » :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.0</span>
<button class="copy-code-btn"></button></code></pre>
<p>Récupérez l'image cible et recréez uniquement le conteneur Milvus :</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose maintient en fonctionnement les conteneurs etcd et object-storage existants et réutilise les répertoires de données configurés.</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Vérifiez la mise à niveau<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Vérifiez l'état du conteneur et l'image utilisée par le conteneur Milvus :</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p>Vérifiez que le service <code translate="no">standalone</code> fonctionne correctement, que son image est <code translate="no">milvusdb/milvus:v3.0.0</code> et que les collections existantes restent consultables et recherchables. Effectuez ces vérifications avant d’activer toute fonctionnalité spécifique à la version 3.0.0.</p>
