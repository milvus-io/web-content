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
    </button></h1><p>Ce guide décrit comment mettre à niveau un déploiement autonome de Milvus 2.6.x vers la version 3.0.5 à l'aide de Docker Compose.</p>
<div class="alert note">
<p>Cette procédure a été validée avec la configuration officielle Docker Compose de Milvus 2.6.20 en mode autonome, avec une modification portant uniquement sur l’image. L’étape 2 ajoute en outre le service de gestion de la propriété du répertoire de données issu de la configuration Compose de la version 3.0.5, qui n’était pas couvert par cette validation.</p>
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
<li>Un déploiement autonome Milvus 2.6.x existant géré par Docker Compose</li>
<li>Le fichier Docker Compose et la configuration utilisés pour le déploiement existant</li>
<li>Une sauvegarde récente des métadonnées et des données persistantes de Milvus</li>
</ul>
<p><strong>Limitations relatives à la file d’attente de messages</strong>: lors de la mise à niveau vers Milvus v3.0.5, vous devez conserver votre choix actuel de file d’attente de messages. Le passage d’un système de file d’attente de messages à un autre pendant la mise à niveau n’est pas pris en charge. La prise en charge du changement de système de file d’attente de messages sera disponible dans les versions futures.</p>
<div class="alert warning">
<p>Ne remplacez pas votre fichier Compose actuel et ne modifiez pas les versions des dépendances dans le cadre de cette procédure. Conservez l’etcd, le stockage d’objets, la file d’attente de messages, les volumes et la configuration existants. Mettez à jour le tag de l’image Milvus et ajoutez le service de propriété du répertoire de données décrit à l’étape 2.</p>
<p>Si votre fichier Compose utilise <code translate="no">minio/minio:RELEASE.2024-12-18T13-15-44Z</code> et que Docker ne parvient pas à récupérer cette image, remplacez-la par <code translate="no">milvusdb/minio:RELEASE.2024-12-18T13-15-44Z</code>, utilisée par la configuration Compose de la version 3.0.5. Conservez le même tag de version.</p>
<p>Cette procédure ne valide pas une rétrogradation ou une restauration consistant à ramener l’image Milvus à la version 2.6.x. Une fois que la version v3.0.5 a écrit des données, une restauration portant uniquement sur l’image peut ne pas parvenir à lire l’état mis à jour. Si la mise à niveau échoue, arrêtez les écritures et utilisez un plan de reprise qui restaure les métadonnées antérieures à la mise à niveau ainsi que les sauvegardes des données persistantes. Validez d’abord le plan de reprise dans un environnement hors production.</p>
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
    </button></h3><p>Dans le fichier Compose existant, mettez à jour l’image du service <code translate="no">standalone</code>, remplacez ses entrées <code translate="no">depends_on</code> par celles ci-dessous, puis ajoutez le service <code translate="no">milvus-volume-init</code>. Utilisez la même image pour les deux services et montez le même répertoire hôte que celui monté par le service <code translate="no">standalone</code> à l’adresse <code translate="no">/var/lib/milvus</code>. Conservez les autres paramètres du service <code translate="no">standalone</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">milvus-volume-init:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;0:0&quot;</span>
    <span class="hljs-attr">network_mode:</span> <span class="hljs-string">none</span>
    <span class="hljs-attr">read_only:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">&quot;no&quot;</span>
    <span class="hljs-attr">entrypoint:</span> [<span class="hljs-string">&quot;/bin/sh&quot;</span>, <span class="hljs-string">&quot;-c&quot;</span>]
    <span class="hljs-attr">command:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">|
        set -eu
        uid=&quot;$$(id -u milvus)&quot;
        gid=&quot;$$(id -g milvus)&quot;
        marker=&quot;/var/lib/milvus/.milvus-volume-owner-$${uid}-$${gid}&quot;
        if [ ! -e &quot;$${marker}&quot; ]; then
          echo &quot;Preparing /var/lib/milvus for $${uid}:$${gid}&quot;
          chown -R &quot;$${uid}:$${gid}&quot; /var/lib/milvus
          touch &quot;$${marker}&quot;
          chown &quot;$${uid}:$${gid}&quot; &quot;$${marker}&quot;
        fi
</span>    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>

  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-attr">milvus-volume-init:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_completed_successfully</span>
      <span class="hljs-attr">etcd:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
      <span class="hljs-attr">minio:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
<button class="copy-code-btn"></button></code></pre>
<p>Les images Milvus v3.0.5 exécutent Milvus sous l’utilisateur non-root <code translate="no">milvus</code>, tandis que les images Milvus 2.6.x ne définissent pas d’utilisateur et exécutent Milvus sous <code translate="no">root</code>. Le service <code translate="no">milvus-volume-init</code> provient de la configuration Compose v3.0.5. Il s’exécute une seule fois sous le nom <code translate="no">root</code> avant le démarrage de Milvus et attribue la propriété du répertoire <code translate="no">/var/lib/milvus</code> et de son contenu à l’utilisateur et au groupe <code translate="no">milvus</code>, afin que Milvus puisse écrire dans les fichiers créés par le déploiement 2.6.x. Il écrit ensuite un fichier marqueur <code translate="no">.milvus-volume-owner-&lt;uid&gt;-&lt;gid&gt;</code> dans <code translate="no">/var/lib/milvus</code> et n’effectue aucune modification lors des exécutions suivantes tant que ce fichier marqueur existe. Si vous restaurez ultérieurement des fichiers appartenant à un autre utilisateur dans le répertoire de données, supprimez le fichier marqueur afin que le service puisse s’exécuter à nouveau.</p>
<p>Récupérez l’image cible et recréez le conteneur Milvus. Comme le service <code translate="no">standalone</code> dépend de <code translate="no">milvus-volume-init</code>, Docker Compose exécute <code translate="no">milvus-volume-init</code> jusqu’à son terme avant de démarrer le nouveau conteneur Milvus :</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose maintient en exécution les conteneurs etcd et object-storage existants et réutilise les répertoires de données configurés. Si vous avez modifié la configuration d’une dépendance, par exemple l’image MinIO, Compose recrée ce conteneur et conserve ses volumes montés.</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Vérification de la mise à niveau<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Vérifiez l’état du conteneur et l’image utilisée par le conteneur Milvus :</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p>Vérifiez que le service <code translate="no">standalone</code> fonctionne correctement, que son image est <code translate="no">milvusdb/milvus:v3.0.5</code> et que les collections existantes restent consultables et recherchables. Effectuez ces vérifications avant d’activer toute fonctionnalité spécifique à la version 3.0.5.</p>
<div class="alert note">
<p>La mise à niveau vers Milvus 3.0 n’active pas Storage V3. Après avoir vérifié la mise à niveau, consultez la documentation relative à <a href="/docs/fr/storage-v3.md">Storage V3</a> avant d’activer les fonctionnalités qui en dépendent. Une fois que Milvus a écrit des données Storage V3, la réversion vers une version antérieure de Milvus incapable de lire Storage V3 n’est pas prise en charge.</p>
</div>
