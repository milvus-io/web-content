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
<li>Installez le <a href="https://docs.docker.com/compose/install/linux/">plugin Docker Compose</a> (version 2 ou ultérieure) et vérifiez qu’il fonctionne correctement à l’aide de la commande ` <code translate="no">docker compose version</code>`. Ces instructions utilisent la commande ` <code translate="no">docker compose</code>`, et non l’ancienne commande ` <code translate="no">docker-compose</code> ` (version 1).</li>
<li><a href="/docs/fr/prerequisite-docker.md">Vérifiez la configuration matérielle et logicielle requise</a> avant l’installation.</li>
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
    </button></h2><p>Milvus fournit un fichier de configuration Docker Compose dans le dépôt Milvus. Téléchargez la configuration pour la version 3.0.5 à l’aide de la commande <code translate="no">wget</code> ci-dessous. Immédiatement après le téléchargement, avant de modifier le fichier ou de démarrer Milvus avec <code translate="no">sudo docker compose up -d</code>, exécutez <code translate="no">sha256sum docker-compose.yaml</code> et comparez le résultat avec le résumé <code translate="no">sha256</code> indiqué pour <code translate="no">milvus-standalone-docker-compose.yaml</code> sur la <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">page de la version 3.0.5</a>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yaml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Déploiement par défaut (v3.0.5) :</strong> <code translate="no">docker compose up -d</code> lance trois conteneurs à exécution longue — <code translate="no">milvus-etcd</code> (métadonnées), <code translate="no">milvus-minio</code> (stockage d’objets) et <code translate="no">milvus-standalone</code>. La file d’attente de messages est <strong>Woodpecker (intégrée, avec MinIO / stockage d’objets comme backend WAL)</strong>; aucun conteneur de file d’attente de messages distinct n’est donc nécessaire.</p>
<p>La configuration exécute également le service « one-shot » <code translate="no">milvus-volume-init</code> afin de préparer la propriété du répertoire de données. Elle se termine une fois cette tâche accomplie.</p>
<p><strong>File d’attente de messages par défaut selon la version :</strong></p>
<ul>
<li><strong>2.5.x</strong> — la file d’attente de messages par défaut est <strong>RocksMQ</strong>.</li>
<li><strong>2.6.x et versions ultérieures</strong> — la file d’attente de messages par défaut est <strong>Woodpecker (intégrée)</strong>.</li>
</ul>
<p>Utilisez la configuration jointe à la version que vous comptez installer. Pour un déploiement existant, suivez les instructions de mise à niveau au lieu de remplacer sa configuration par un fichier de nouvelle installation.</p>
<ul>
<li><p>Si <code translate="no">docker compose</code> n’est pas disponible, installez le plugin Compose en suivant les <a href="https://docs.docker.com/compose/install/linux/">instructions Docker</a>.</p></li>
<li><p>Si vous rencontrez des difficultés pour récupérer l’image, contactez-nous à <a href="mailto:community@zilliz.com">l’adresse community@zilliz.com</a> en précisant les détails du problème, et nous vous fournirons l’assistance nécessaire.</p></li>
</ul>
</div>
<p>Après le démarrage de Milvus,</p>
<ul>
<li>les conteneurs nommés <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> et <strong>milvus-etcd</strong> sont en cours d’exécution.
<ul>
<li>Le conteneur <strong>milvus-etcd</strong> n’expose aucun port vers l’hôte et mappe ses données vers <strong>le</strong> répertoire <strong>volumes/etcd</strong> du dossier actuel.</li>
<li>Le conteneur <strong>milvus-minio</strong> expose les ports <strong>9000</strong> et <strong>9001</strong> avec les identifiants d’authentification par défaut et mappe ses données vers le répertoire <strong>volumes/minio</strong> du dossier actuel.</li>
<li>Le conteneur <strong>milvus-standalone</strong> expose les ports <strong>19530</strong> et <strong>9091</strong> avec les paramètres par défaut et mappe ses données vers <strong>le répertoire volumes/milvus</strong> du dossier actuel.</li>
</ul></li>
</ul>
<p>Le service « <code translate="no">standalone</code> » définit la valeur « <code translate="no">security_opt: seccomp:unconfined</code> », ce qui permet au conteneur Milvus de s’exécuter sans le profil seccomp Docker par défaut.</p>
<div class="alert warning">
<blockquote>
<p>Le fichier de configuration expose ces ports sans adresse hôte. Docker expose un port sans adresse hôte sur toutes les adresses hôtes ; ainsi, les autres machines pouvant atteindre cet hôte peuvent également se connecter à Milvus et MinIO. MinIO utilise la clé d’accès et la clé secrète <code translate="no">minioadmin</code>, qui sont définies dans le fichier de configuration. Pour limiter l’accès à cet hôte, ajoutez <code translate="no">127.0.0.1:</code> aux entrées <code translate="no">ports</code> des services <code translate="no">minio</code> et <code translate="no">standalone</code> dans <code translate="no">docker-compose.yaml</code>, par exemple <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code>, puis relancez <code translate="no">sudo docker compose up -d</code>. Pour utiliser d’autres identifiants MinIO, modifiez <code translate="no">MINIO_ACCESS_KEY</code> et <code translate="no">MINIO_SECRET_KEY</code> du service <code translate="no">minio</code>, puis définissez les mêmes valeurs dans <code translate="no">minio.accessKeyID</code> et <code translate="no">minio.secretAccessKey</code> de la configuration Milvus. Pour exiger des identifiants lors des connexions à Milvus, consultez la section « <a href="/docs/fr/authenticate.md">Authentification de l’accès utilisateur</a> ».</p>
</blockquote>
</div>
<p>Vous pouvez vérifier si les conteneurs sont opérationnels à l’aide de la commande suivante :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       &quot;etcd -advertise-cli…&quot;   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       &quot;/usr/bin/docker-ent…&quot;   minio        2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9000-9001-&gt;9000-9001/tcp
milvus-standalone   …       &quot;/tini -- milvus run…&quot;   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091-&gt;9091/tcp, 0.0.0.0:19530-&gt;19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p>La colonne « <code translate="no">PORTS</code> » peut également répertorier chaque port publié avec l’adresse IPv6 <code translate="no">[::]</code>, par exemple <code translate="no">[::]:19530-&gt;19530/tcp</code>, car Docker publie un port sans adresse hôte à la fois sur <code translate="no">0.0.0.0</code> et <code translate="no">[::]</code>.</p>
<p>Vous pouvez également accéder à l’interface Web de Milvus à l’adresse <code translate="no">http://127.0.0.1:9091/webui/</code> pour en savoir plus sur votre instance Milvus. Pour plus de détails, consultez la section <a href="/docs/fr/milvus-webui.md">Interface Web de Milvus</a>.</p>
<p>Pour tester le serveur en cours d’exécution, suivez la procédure <strong>« Utiliser un serveur Milvus existant</strong> » dans <a href="/docs/fr/quickstart.md">le guide de démarrage rapide</a> et connectez-vous à <code translate="no">http://localhost:19530</code>. N’utilisez pas le bloc de connexion local <code translate="no">.db</code>, qui lance une base de données Milvus Lite distincte.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Facultatif) Mise à jour des configurations Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour mettre à jour la configuration de Milvus en fonction de vos besoins, placez vos paramètres dans un fichier <code translate="no">user.yaml</code> sur l’hôte et montez-le à l’emplacement <code translate="no">/milvus/configs/user.yaml</code> dans le conteneur <code translate="no">milvus-standalone</code>. Le fichier de configuration ne monte que <code translate="no">/var/lib/milvus</code> dans ce conteneur ; par conséquent, un fichier <code translate="no">user.yaml</code> que vous modifiez à l’intérieur du conteneur est perdu lorsque Compose recrée le conteneur, par exemple après une modification de <code translate="no">docker-compose.yaml</code> ou de l’image Milvus.</p>
<ol>
<li><p>Créez <code translate="no">user.yaml</code> dans le dossier contenant <code translate="no">docker-compose.yaml</code>. Créez le fichier avant de le monter : si le chemin d’accès source n’existe pas, Compose crée à la place un répertoire portant ce nom.
Ce qui suit part du principe que vous devez remplacer la valeur par défaut <code translate="no">proxy.healthCheckTimeout</code>. Pour connaître les éléments de configuration concernés, reportez-vous à <a href="/docs/fr/system_configuration.md">la section Configuration du système</a>.</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Dans <code translate="no">docker-compose.yaml</code>, ajoutez le fichier à la liste <code translate="no">volumes</code> du service <code translate="no">standalone</code>. Conservez les autres paramètres du service, tels que <code translate="no">security_opt</code>, <code translate="no">healthcheck</code> et <code translate="no">depends_on</code>, tels quels.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Appliquez la modification. La configuration du service ayant changé, Compose recrée le conteneur <code translate="no">milvus-standalone</code> et conserve les données dans ses volumes montés.</p>
<pre><code translate="no" class="language-shell">sudo docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Une fois le fichier monté, redémarrez le service <code translate="no">standalone</code> pour appliquer les modifications ultérieures apportées à <code translate="no">user.yaml</code>:</p>
<pre><code translate="no" class="language-shell">sudo docker compose restart standalone
<button class="copy-code-btn"></button></code></pre>
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
<h2 id="Upgrade-an-existing-deployment" class="common-anchor-header">Mettre à niveau un déploiement existant<button data-href="#Upgrade-an-existing-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour un déploiement autonome de Milvus 2.6.x, suivez la procédure « <a href="/docs/fr/upgrade_milvus_standalone-docker.md">Mise à niveau de Milvus Standalone avec Docker Compose</a> ». Sauvegardez les métadonnées et les données persistantes, conservez les dépendances et la configuration existantes, puis validez le chemin de mise à niveau de la source vers la cible documenté avant de modifier l’image Milvus. Ne remplacez pas le fichier Compose d’un ancien déploiement par la configuration de nouvelle installation ci-dessus.</p>
<p><strong>Limitations relatives aux files d’attente de messages</strong>: lors de la mise à niveau vers Milvus v3.0.5, vous devez conserver votre choix actuel de file d’attente de messages. Le passage d’un système de file d’attente de messages à un autre pendant la mise à niveau n’est pas pris en charge. La prise en charge du changement de système de file d’attente de messages sera disponible dans les versions futures.</p>
<p>Milvus 2.6.x et versions ultérieures utilisent Woodpecker par défaut, tandis que les déploiements 2.5.x utilisent <strong>RocksMQ</strong> par défaut. Si le déploiement que vous mettez à niveau utilise encore RocksMQ, fixez-le dans ` <code translate="no">user.yaml</code> ` avant de modifier l’image Milvus, afin que l’instance mise à niveau conserve sa file d’attente de messages existante au lieu de démarrer avec la nouvelle valeur par défaut :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml — keep RocksMQ across the upgrade</span>
<span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<button class="copy-code-btn"></button></code></pre>
<p>Une fois que l’instance mise à niveau fonctionne sous la version 3.0.5, vous pouvez passer de RocksMQ à Woodpecker à l’aide de la fonction « <a href="/docs/fr/switch-mq-type.md">Switch Message Queue</a> », disponible dans Milvus 3.0 et versions ultérieures.</p>
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
<h2 id="Whats-next" class="common-anchor-header">Et ensuite<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/fr/upgrade_milvus_standalone-docker.md">Mettre à niveau Milvus Standalone avec Docker Compose</a>.</p></li>
<li><p><a href="/docs/fr/scaleout.md">Faites évoluer un cluster Milvus</a> sur Kubernetes. Cette procédure utilise Helm et ne s'applique pas à ce déploiement Docker.</p></li>
<li><p>Déployez votre cluster Milvus sur le cloud :</p>
<ul>
<li><a href="/docs/fr/eks.md">Amazon EKS</a></li>
<li><a href="/docs/fr/gcp.md">Google Cloud</a></li>
<li><a href="/docs/fr/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Découvrez <a href="/docs/fr/milvus-webui.md">Milvus WebUI</a>, une interface web intuitive permettant de surveiller et de gérer Milvus.</p></li>
<li><p>Découvrez <a href="/docs/fr/milvus_backup_overview.md">Milvus Backup</a>, un outil open source dédié aux sauvegardes de données Milvus.</p></li>
<li><p>Découvrez <a href="/docs/fr/birdwatcher_overview.md">Birdwatcher</a>, un outil open source permettant le débogage de Milvus et la mise à jour dynamique des configurations.</p></li>
<li><p>Découvrez <a href="https://github.com/zilliztech/attu">Attu</a>, un outil GUI open source permettant une gestion intuitive de Milvus.</p></li>
<li><p><a href="/docs/fr/monitor.md">Surveillez Milvus avec Prometheus</a>.</p></li>
</ul>
