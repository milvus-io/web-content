---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Découvrez comment installer Milvus en mode autonome avec Docker.
title: Exécuter Milvus dans Docker (Linux)
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">Exécuter Milvus dans Docker (Linux)<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page explique comment lancer une instance de Milvus dans Docker.</p>
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
<li><a href="/docs/fr/prerequisite-docker.md">Vérifiez la configuration matérielle et logicielle requise</a> avant l'installation.</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">Installer Milvus dans Docker<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus fournit un script d'installation permettant de l'installer sous forme de conteneur Docker. Ce script est disponible dans le <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">dépôt Milvus</a>. Pour installer Milvus dans Docker, il suffit d'exécuter</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Nouveautés de la version v3.0-beta :</strong></p>
<ul>
<li><strong>Nœud de streaming</strong>: capacités de traitement des données améliorées</li>
<li><strong>Woodpecker MQ (par défaut)</strong>: ce déploiement Docker utilise Woodpecker comme file d’attente de messages, avec le <strong>système de fichiers local</strong> comme backend WAL ; aucun service externe de file d’attente de messages n’est donc nécessaire. Voir <a href="/docs/fr/woodpecker.md">Woodpecker</a>.</li>
<li><strong>Architecture optimisée</strong>: composants consolidés pour de meilleures performances</li>
</ul>
<p>Téléchargez toujours le script le plus récent pour vous assurer de bénéficier des dernières configurations et améliorations architecturales.</p>
<p>Si vous souhaitez utiliser <a href="https://milvus.io/docs/milvus_backup_overview.md">Backup</a> en mode de déploiement autonome, il est recommandé d’utiliser la méthode de déploiement <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Compose</a>.</p>
<p>Si vous rencontrez des difficultés pour récupérer l’image, contactez-nous à <a href="mailto:community@zilliz.com">l’adresse community@zilliz.com</a> en précisant les détails du problème, et nous vous fournirons l’assistance nécessaire.</p>
</div>
<p>Après avoir exécuté le script d’installation :</p>
<ul>
<li>Un conteneur Docker nommé milvus-standalone a été lancé sur le port <strong>19530</strong>.</li>
<li>Un etcd intégré est installé avec Milvus dans le même conteneur et est accessible sur le port <strong>2379</strong>. Son fichier de configuration correspond au <strong>fichier embedEtcd.yaml</strong> situé dans le dossier actuel.</li>
<li>Pour modifier la configuration par défaut de Milvus, ajoutez vos paramètres au fichier <strong>user.yaml</strong> situé dans le dossier actuel, puis redémarrez le service.</li>
<li>Le volume de données Milvus est mappé vers <strong>volumes/milvus</strong> dans le dossier actuel.</li>
</ul>
<p>Vous pouvez accéder à l’interface Web de Milvus à l’adresse <code translate="no">http://127.0.0.1:9091/webui/</code> pour en savoir plus sur votre instance Milvus. Pour plus de détails, consultez la documentation relative à <a href="/docs/fr/milvus-webui.md">l’interface Web de Milvus</a>.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Facultatif) Mise à jour des configurations de Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez modifier les paramètres de configuration de Milvus dans le fichier <strong>user.yaml</strong> situé dans le dossier actuel. Par exemple, pour remplacer l’adresse <code translate="no">proxy.healthCheckTimeout</code> par <code translate="no">1000</code> ms, vous pouvez modifier le fichier comme suit :</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Redémarrez ensuite le service comme suit :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour connaître les éléments de configuration concernés, consultez la section « <a href="/docs/fr/system_configuration.md">Configuration du système</a> ».</p>
<h2 id="Upgrade-Milvus" class="common-anchor-header">Mise à niveau de Milvus<button data-href="#Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez mettre à niveau Milvus vers la dernière version à l’aide de la commande de mise à niveau intégrée. Cela télécharge automatiquement la dernière configuration et l’image Milvus :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Upgrade Milvus to the latest version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>La commande de mise à niveau effectue automatiquement les opérations suivantes :</p>
<ul>
<li>Télécharge le dernier script d'installation avec les configurations mises à jour</li>
<li>Récupère la dernière image Docker de Milvus</li>
<li>redémarre le conteneur avec la nouvelle version</li>
<li>Conserve vos données et configurations existantes</li>
</ul>
<p>Il s'agit de la méthode recommandée pour mettre à niveau votre déploiement Milvus autonome.</p>
</div>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Arrêter et supprimer Milvus<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez arrêter et supprimer ce conteneur comme suit</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Optional-dependencies" class="common-anchor-header">Dépendances facultatives<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>Par défaut, ce déploiement utilise <strong>Woodpecker</strong> (WAL sur le système de fichiers local) comme file d’attente de messages et un <strong>etcd intégré</strong> pour les métadonnées — aucune autre installation n’est nécessaire. Pour utiliser une autre file d’attente de messages ou connecter un stockage d’objets / des métadonnées externes, consultez :</p>
<ul>
<li>File d’attente de messages : <a href="/docs/fr/woodpecker.md">Woodpecker</a> (par défaut) · <a href="/docs/fr/mq_pulsar.md">Pulsar</a> · <a href="/docs/fr/mq_kafka.md">Kafka</a> · <a href="/docs/fr/mq_rocksmq.md">RocksMQ</a></li>
<li>Stockage d’objets : <a href="/docs/fr/deploy_s3.md">MinIO</a> (par défaut) · <a href="/docs/fr/deploy_s3.md">AWS S3</a> · <a href="/docs/fr/abs.md">Azure Blob</a> · <a href="/docs/fr/gcs.md">GCP Cloud Storage</a> · <a href="/docs/fr/deploy_s3.md">Aliyun OSS</a> · <a href="/docs/fr/deploy_s3.md">Tencent COS</a> · <a href="/docs/fr/deploy_s3.md">Huawei OBS</a> · <a href="/docs/fr/deploy_s3.md">Compatible S3</a></li>
<li>Métadonnées : <a href="/docs/fr/deploy_etcd.md">etcd</a></li>
</ul>
<div class="alert note">
<p>Storage V3 est désactivé par défaut. Activez-le avant d’utiliser les fonctionnalités qui en dépendent. Pour connaître les prérequis et les considérations de compatibilité, consultez la page <a href="/docs/fr/storage-v3.md">Storage V3</a>.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Consulter <a href="/docs/fr/quickstart.md">le guide de démarrage rapide</a> pour découvrir les fonctionnalités de Milvus.</p></li>
<li><p>Apprendre les opérations de base de Milvus :</p>
<ul>
<li><a href="/docs/fr/manage_databases.md">Gérer les bases de données</a></li>
<li><a href="/docs/fr/manage-collections.md">Gérer les collections</a></li>
<li><a href="/docs/fr/manage-partitions.md">Gérer les partitions</a></li>
<li><a href="/docs/fr/insert-update-delete.md">Insérer, mettre à jour ou supprimer</a></li>
<li><a href="/docs/fr/single-vector-search.md">Recherche sur un seul vecteur</a></li>
<li><a href="/docs/fr/multi-vector-search.md">Recherche hybride</a></li>
</ul></li>
<li><p><a href="/docs/fr/upgrade_milvus_cluster-helm.md">Mettre à niveau Milvus à l'aide d'un Helm Chart</a>.</p></li>
<li><p><a href="/docs/fr/scaleout.md">Faites évoluer votre cluster Milvus</a>.</p></li>
<li><p>Déployez votre cluster Milvus sur le cloud :</p>
<ul>
<li><a href="/docs/fr/eks.md">Amazon EKS</a></li>
<li><a href="/docs/fr/gcp.md">Google Cloud</a></li>
<li><a href="/docs/fr/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Découvrez <a href="/docs/fr/milvus-webui.md">Milvus WebUI</a>, une interface web intuitive pour la surveillance et la gestion de Milvus.</p></li>
<li><p>Découvrez <a href="/docs/fr/milvus_backup_overview.md">Milvus Backup</a>, un outil open source dédié aux sauvegardes de données Milvus.</p></li>
<li><p>Découvrez <a href="/docs/fr/birdwatcher_overview.md">Birdwatcher</a>, un outil open source permettant le débogage de Milvus et la mise à jour dynamique des configurations.</p></li>
<li><p>Découvrez <a href="https://github.com/zilliztech/attu">Attu</a>, un outil GUI open source permettant une gestion intuitive de Milvus.</p></li>
<li><p><a href="/docs/fr/monitor.md">Surveillez Milvus avec Prometheus</a>.</p></li>
</ul>
