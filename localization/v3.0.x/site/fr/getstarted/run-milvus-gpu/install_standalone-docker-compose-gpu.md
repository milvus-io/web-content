---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: >-
  Découvrez comment installer Milvus en mode autonome avec prise en charge des
  GPU à l'aide de Docker Compose.
title: Exécuter Milvus avec prise en charge du GPU à l'aide de Docker Compose
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">Exécuter Milvus avec prise en charge du GPU à l'aide de Docker Compose<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page explique comment démarrer une instance Milvus avec prise en charge GPU à l'aide de Docker Compose.</p>
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
<li><a href="https://docs.docker.com/get-docker/">Installez Docker</a>.</li>
<li><a href="/docs/fr/prerequisite-gpu.md">Vérifiez la configuration matérielle et logicielle requise</a> avant l'installation.</li>
</ul>
<div class="alert note">
<p>Si vous rencontrez des difficultés pour récupérer l'image, contactez-nous à <a href="mailto:community@zilliz.com">l'adresse community@zilliz.com</a> en précisant les détails du problème, et nous vous fournirons l'assistance nécessaire.</p>
</div>
<h2 id="Install-Milvus" class="common-anchor-header">Installer Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour installer Milvus avec prise en charge du GPU à l'aide de Docker Compose, suivez ces étapes.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. Téléchargez et configurez le fichier YAML<button data-href="#1-Download-and-configure-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Téléchargez <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml"><code translate="no">milvus-standalone-docker-compose-gpu.yaml</code></a> et enregistrez-le sous le nom docker-compose.yml manuellement ou à l’aide de la commande suivante.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour vérifier le téléchargement, comparez la sortie de la commande suivante avec le résumé « <code translate="no">sha256</code> » indiqué pour « <code translate="no">milvus-standalone-docker-compose-gpu.yaml</code> » sur la <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">page de publication</a>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sha256sum</span> docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez modifier les périphériques GPU attribués à Milvus dans la section « <code translate="no">deploy</code> » du service « <code translate="no">standalone</code> » du fichier YAML comme suit :</p>
<ul>
<li>Pour attribuer un périphérique GPU spécifique à Milvus, repérez le champ « <code translate="no">deploy.resources.reservations.devices[0].device_ids</code> » dans la définition du service « <code translate="no">standalone</code> » et remplacez sa valeur par l’ID du GPU souhaité. Vous pouvez utiliser l’outil « <code translate="no">nvidia-smi</code> », fourni avec les pilotes d’affichage des GPU NVIDIA, pour déterminer l’ID d’un périphérique GPU. Milvus prend en charge plusieurs périphériques GPU.</li>
</ul>
<p>Attribuer un seul GPU à Milvus :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&quot;0&quot;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Attribuer plusieurs GPU à Milvus :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Démarrer Milvus<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Dans le répertoire contenant le fichier docker-compose.yml, lancez Milvus en exécutant la commande suivante :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si vous ne parvenez pas à exécuter la commande ci-dessus, vérifiez si Docker Compose V1 est installé sur votre système. Si c’est le cas, il est recommandé de migrer vers Docker Compose V2 en raison des remarques figurant sur <a href="https://docs.docker.com/compose/">cette page</a>.</p>
</div>
<p>Une fois Milvus démarré,</p>
<ul>
<li>les conteneurs nommés <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> et <strong>milvus-etcd</strong> sont en cours d'exécution.
<ul>
<li>Le conteneur <strong>milvus-etcd</strong> n'expose aucun port vers l'hôte et mappe ses données vers <strong>le répertoire volumes/etcd</strong> du dossier actuel.</li>
<li>Le conteneur <strong>milvus-minio</strong> expose les ports <strong>9000</strong> et <strong>9001</strong> avec les identifiants d’authentification par défaut et mappe ses données vers le répertoire <strong>volumes/minio</strong> du dossier courant.</li>
<li>Le conteneur <strong>milvus-standalone</strong> écoute sur les ports <strong>19530</strong> et <strong>9091</strong> avec les paramètres par défaut et mappe ses données vers <strong>le répertoire volumes/milvus</strong> du dossier actuel.</li>
</ul></li>
</ul>
<p>Le service « <code translate="no">standalone</code> » définit la valeur « <code translate="no">security_opt: seccomp:unconfined</code> », ce qui permet au conteneur Milvus de s’exécuter sans le profil seccomp Docker par défaut.</p>
<div class="alert warning">
<blockquote>
<p>Le fichier Compose publie ces ports sans adresse IP d’hôte ; Docker les lie donc à toutes les interfaces réseau de l’hôte, et les autres machines pouvant atteindre cet hôte peuvent se connecter à Milvus et MinIO. MinIO utilise la clé d’accès et la clé secrète <code translate="no">minioadmin</code>, qui sont définies dans le fichier Compose. Pour publier les ports uniquement sur l’adresse de bouclage, ajoutez <code translate="no">127.0.0.1:</code> aux entrées <code translate="no">ports</code> des services <code translate="no">minio</code> et <code translate="no">standalone</code> dans <code translate="no">docker-compose.yml</code>, par exemple <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code>, puis relancez <code translate="no">sudo docker compose up -d</code>. Pour plus de détails, consultez <a href="https://docs.docker.com/engine/network/port-publishing/">la section Publication et mappage des ports</a>. Pour utiliser d’autres identifiants MinIO, modifiez les paramètres <code translate="no">MINIO_ACCESS_KEY</code> et <code translate="no">MINIO_SECRET_KEY</code> du service <code translate="no">minio</code>, puis définissez les mêmes valeurs dans <code translate="no">minio.accessKeyID</code> et <code translate="no">minio.secretAccessKey</code> de la configuration Milvus. Pour exiger un nom d’utilisateur et un mot de passe lors des connexions des clients à Milvus, consultez <a href="/docs/fr/authenticate.md">la section Authentification de l’accès utilisateur</a>.</p>
</blockquote>
</div>
<p>Vous pouvez vérifier si les conteneurs sont en cours d’exécution à l’aide de la commande suivante :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>
<button class="copy-code-btn"></button></code></pre>
<p>Par défaut, la commande ne répertorie que les conteneurs en cours d’exécution. Vérifiez que la sortie répertorie les conteneurs <strong>milvus-etcd</strong>, <strong>milvus-minio</strong> et <strong>milvus-standalone</strong>, et que la colonne « <code translate="no">STATUS</code> » de chacun d’entre eux commence par « <code translate="no">Up</code> ».</p>
<p>Vous pouvez également accéder à l’interface Web de Milvus à l’adresse <code translate="no">http://127.0.0.1:9091/webui/</code> pour en savoir plus sur votre instance Milvus. Pour plus de détails, consultez la section « <a href="/docs/fr/milvus-webui.md">Interface Web de Milvus</a> ».</p>
<p>Pour modifier les périphériques GPU utilisés par Milvus après son démarrage, modifiez le champ « <code translate="no">device_ids</code> » sous « <code translate="no">deploy.resources.reservations.devices</code> » du service « <code translate="no">standalone</code> » dans le fichier docker-compose.yml, comme indiqué à l’étape 1, puis exécutez la commande suivante. La configuration du service ayant changé, la commande « <code translate="no">docker compose up</code> » arrête puis recrée le conteneur « <strong>milvus-standalone</strong> ». Pour plus de détails, consultez la section <a href="https://docs.docker.com/compose/how-tos/gpu-support/">Exécuter des services Docker Compose avec accès au GPU</a>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez arrêter et supprimer ce conteneur comme suit.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">Configurer le pool de mémoire<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois Milvus opérationnel, vous pouvez personnaliser le pool de mémoire en modifiant les paramètres <code translate="no">initMemSize</code> et <code translate="no">maxMemSize</code> dans la section <code translate="no">gpu</code> de la configuration de Milvus.</p>
<div class="alert note">
<p>Le fichier <code translate="no">milvus.yaml</code> se trouve dans le répertoire <code translate="no">/milvus/configs/</code> à l’intérieur du conteneur Milvus. Les paramètres d’un fichier <code translate="no">user.yaml</code> situé dans le même répertoire remplacent les valeurs de <code translate="no">milvus.yaml</code>.</p>
</div>
<p>Pour conserver vos paramètres lors de la recréation du conteneur, enregistrez-les dans un fichier <code translate="no">user.yaml</code> sur l’hôte et montez ce fichier dans le conteneur comme suit.</p>
<ol>
<li><p>Dans le répertoire contenant le fichier docker-compose.yml, créez un fichier nommé <code translate="no">user.yaml</code> avec les paramètres que vous souhaitez modifier. L’exemple suivant présente la section <code translate="no">gpu</code> avec ses valeurs par défaut. Remplacez-les par les tailles dont vous avez besoin :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Taille initiale du pool de mémoire, en Mo. La valeur par défaut est 2048.</li>
<li><code translate="no">maxMemSize</code>: Taille maximale du pool de mémoire, en Mo. La valeur par défaut est 4096.</li>
</ul></li>
<li><p>Dans le fichier docker-compose.yml, ajoutez le fichier <code translate="no">user.yaml</code> à la liste <code translate="no">volumes</code> du service <code translate="no">standalone</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Recréez le conteneur Milvus pour appliquer les modifications :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Une fois le fichier monté, redémarrez le service « <code translate="no">standalone</code> » pour appliquer les modifications apportées ultérieurement à « <code translate="no">user.yaml</code> » :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose restart standalone</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Storage V3 est désactivé par défaut. Activez-le avant d’utiliser les fonctionnalités qui en dépendent. Pour connaître les prérequis et les considérations de compatibilité, consultez la page <a href="/docs/fr/storage-v3.md">Storage V3</a>.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Étapes suivantes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois Milvus installé dans Docker, vous pouvez :</p>
<ul>
<li><p>Consultez <a href="/docs/fr/quickstart.md">le guide de démarrage rapide</a> pour découvrir les fonctionnalités de Milvus.</p></li>
<li><p>Consultez <a href="/docs/fr/milvus-webui.md">l’interface Web de Milvus</a> pour en savoir plus sur l’instance Milvus.</p></li>
<li><p>Apprendre les opérations de base de Milvus :</p>
<ul>
<li><a href="/docs/fr/manage_databases.md">Gérer les bases de données</a></li>
<li><a href="/docs/fr/manage-collections.md">Gérer les collections</a></li>
<li><a href="/docs/fr/manage-partitions.md">Gérer les partitions</a></li>
<li><a href="/docs/fr/insert-update-delete.md">Insérer, mettre à jour ou supprimer</a></li>
<li><a href="/docs/fr/single-vector-search.md">Recherche sur un seul vecteur</a></li>
<li><a href="/docs/fr/multi-vector-search.md">Recherche hybride</a></li>
</ul></li>
<li><p><a href="/docs/fr/upgrade_milvus_standalone-docker.md">Mettez à niveau Milvus Standalone avec Docker Compose</a>. Cette page affiche le tag de l'image CPU. Pour ce déploiement GPU, conservez le suffixe « <code translate="no">-gpu</code> » (<code translate="no">milvusdb/milvus:v3.0.5-gpu</code>) et conservez vos paramètres « <code translate="no">deploy</code> » et « <code translate="no">user.yaml</code> ».</p></li>
<li><p><a href="/docs/fr/scaleout.md">Faites évoluer un cluster Milvus</a> sur Kubernetes. Cette procédure utilise Helm et ne s'applique pas à ce déploiement Docker.</p></li>
<li><p>Déployez votre cluster Milvus sur le cloud :</p>
<ul>
<li><a href="/docs/fr/eks.md">Amazon EKS</a></li>
<li><a href="/docs/fr/gcp.md">Google Cloud</a></li>
<li><a href="/docs/fr/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Découvrez <a href="/docs/fr/milvus-webui.md">Milvus WebUI</a>, une interface web intuitive pour la surveillance et la gestion de Milvus.</p></li>
<li><p>Découvrez <a href="/docs/fr/milvus_backup_overview.md">Milvus Backup</a>, un outil open source dédié aux sauvegardes de données Milvus.</p></li>
<li><p>Découvrez <a href="/docs/fr/birdwatcher_overview.md">Birdwatcher</a>, un outil open source permettant le débogage de Milvus et les mises à jour dynamiques de la configuration.</p></li>
<li><p>Découvrez <a href="https://github.com/zilliztech/attu">Attu</a>, un outil GUI open source permettant une gestion intuitive de Milvus.</p></li>
<li><p><a href="/docs/fr/monitor.md">Surveillez Milvus avec Prometheus</a>.</p></li>
</ul>
