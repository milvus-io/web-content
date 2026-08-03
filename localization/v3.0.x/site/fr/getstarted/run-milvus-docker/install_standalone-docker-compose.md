---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Découvrez comment installer Milvus en mode autonome avec Docker Compose.
title: Exécuter Milvus avec Docker Compose (Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">Exécuter Milvus avec Docker Compose (Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page explique comment lancer une instance Milvus dans Docker à l'aide de Docker Compose.</p>
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
    </button></h2><p>Milvus fournit un fichier de configuration Docker Compose dans le référentiel Milvus. Pour installer Milvus à l’aide de Docker Compose, il suffit d’exécuter</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.0/milvus-standalone-docker-compose.yml -O docker-compose.yml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Déploiement par défaut (v3.0.0) :</strong> la commande « <code translate="no">docker compose up -d</code> » lance trois conteneurs : <code translate="no">milvus-etcd</code> (métadonnées), <code translate="no">milvus-minio</code> (stockage d’objets) et <code translate="no">milvus-standalone</code>. La file d’attente de messages est <strong>Woodpecker (intégrée, avec MinIO / stockage d’objets comme backend WAL)</strong>; aucun conteneur de file d’attente de messages distinct n’est donc nécessaire.</p>
<p><strong>File d’attente de messages par défaut selon la version :</strong></p>
<ul>
<li><strong>2.5.x</strong> — la file d’attente de messages par défaut est <strong>RocksMQ</strong>.</li>
<li><strong>2.6.x et versions ultérieures</strong> — la file d’attente de messages par défaut est <strong>Woodpecker (intégrée)</strong>.</li>
</ul>
<p>Téléchargez toujours la dernière configuration Docker Compose pour garantir la compatibilité avec les fonctionnalités de la version 3.0.0.</p>
<ul>
<li><p>Si vous ne parvenez pas à exécuter la commande ci-dessus, veuillez vérifier si Docker Compose V1 est installé sur votre système. Si tel est le cas, il est recommandé de migrer vers Docker Compose V2, conformément aux remarques figurant sur <a href="https://docs.docker.com/compose/">cette page</a>.</p></li>
<li><p>Si vous rencontrez des difficultés pour récupérer l’image, contactez-nous à <a href="mailto:community@zilliz.com">l’adresse community@zilliz.com</a> en précisant les détails du problème, et nous vous fournirons l’assistance nécessaire.</p></li>
</ul>
</div>
<p>Après le démarrage de Milvus,</p>
<ul>
<li>les conteneurs nommés <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> et <strong>milvus-etcd</strong> sont opérationnels.
<ul>
<li>Le conteneur <strong>milvus-etcd</strong> n'expose aucun port vers l'hôte et mappe ses données vers <strong>le répertoire volumes/etcd</strong> du dossier actuel.</li>
<li>Le conteneur <strong>milvus-minio</strong> expose localement les ports <strong>9000</strong> et <strong>9001</strong> avec les identifiants d’authentification par défaut et mappe ses données vers <strong>le</strong> répertoire <strong>volumes/minio</strong> du dossier actuel.</li>
<li>Le conteneur <strong>milvus-standalone</strong> expose localement les ports <strong>19530</strong> avec les paramètres par défaut et stocke ses données dans <strong>le ré</strong> pertoire <strong>volumes/milvus</strong> du dossier actuel.</li>
</ul></li>
</ul>
<p>Vous pouvez vérifier si les conteneurs sont opérationnels à l’aide de la commande suivante :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose ps</span>

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       &quot;etcd -advertise-cli…&quot;   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       &quot;/usr/bin/docker-ent…&quot;   minio        2 minutes ago   Up 2 minutes (healthy)   9000-9001/tcp
milvus-standalone   …       &quot;/tini -- milvus run…&quot;   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091-&gt;9091/tcp, 0.0.0.0:19530-&gt;19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez également accéder à l’interface Web de Milvus à l’adresse <code translate="no">http://127.0.0.1:9091/webui/</code> pour en savoir plus sur votre instance Milvus. Pour plus de détails, consultez la documentation relative à <a href="/docs/fr/milvus-webui.md">l’interface Web de Milvus</a>.</p>
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
    </button></h2><p>Pour adapter la configuration de Milvus à vos besoins, vous devez modifier le fichier ` <code translate="no">/milvus/configs/user.yaml</code> ` situé dans le conteneur ` <code translate="no">milvus-standalone</code> `.</p>
<ol>
<li><p>Accédez au conteneur <code translate="no">milvus-standalone</code>.</p>
<pre><code translate="no" class="language-shell">docker exec -it milvus-standalone bash
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Ajoutez des paramètres supplémentaires pour remplacer ceux par défaut.
La procédure suivante part du principe que vous devez remplacer la configuration par défaut de ` <code translate="no">proxy.healthCheckTimeout</code>`. Pour connaître les éléments de configuration concernés, consultez la section <a href="/docs/fr/system_configuration.md">Configuration du système</a>.</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; /milvus/configs/user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Redémarrez le conteneur <code translate="no">milvus-standalone</code> pour appliquer les modifications.</p>
<pre><code translate="no" class="language-shell">docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrading-from-Milvus-25x-to-26x" class="common-anchor-header">Mise à niveau de Milvus 2.5.x vers la version 2.6.x<button data-href="#Upgrading-from-Milvus-25x-to-26x" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Limitations relatives aux files d’attente de messages</strong>: lors de la mise à niveau vers Milvus v3.0.0, vous devez conserver votre choix actuel de file d’attente de messages. Le passage d’un système de file d’attente de messages à un autre pendant la mise à niveau n’est pas pris en charge. La prise en charge du changement de système de file d’attente de messages sera disponible dans les versions futures.</p>
<p>La version 2.6.x définissant Woodpecker comme file d’attente de messages par défaut, une instance exécutant <strong>RocksMQ</strong> sous la version 2.5.x doit <strong>explicitement verrouiller RocksMQ avant la mise à niveau</strong> — sinon, la mise à niveau tenterait de modifier la file d’attente de messages, ce qui n’est pas pris en charge. Après avoir téléchargé le fichier Docker Compose de la version 2.6.x, remettez le type de file d’attente de messages sur « <code translate="no">rocksmq</code> » dans votre fichier de redéfinition « <code translate="no">user.yaml</code> », puis effectuez la mise à niveau :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml — keep RocksMQ across the 2.5.x → 2.6.x upgrade</span>
<span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour changer de file d’attente de messages <em>après</em> la mise à niveau, consultez la section « <a href="/docs/fr/switch-mq-type.md">Changer de type de MQ</a> ».</p>
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
    </button></h2><p>Ce déploiement utilise <strong>Woodpecker</strong> (intégré, backend WAL MinIO) pour la messagerie, <strong>etcd</strong> pour les métadonnées et <strong>MinIO</strong> pour le stockage d’objets. Pour utiliser une file d’attente de messages différente ou connecter un stockage d’objets / des métadonnées externes, consultez :</p>
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
