---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Découvrez comment installer Milvus de manière autonome avec Docker Compose.
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
    </button></h1><p>Cette page illustre comment lancer une instance Milvus dans Docker à l'aide de Docker Compose.</p>
<h2 id="Prerequisites" class="common-anchor-header">Conditions préalables<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="https://docs.docker.com/get-docker/">Installer Docker</a>.</li>
<li><a href="/docs/fr/v2.4.x/prerequisite-docker.md">Vérifier la configuration matérielle et logicielle requise</a> avant l'installation.</li>
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
    </button></h2><p>Milvus fournit un fichier de configuration Docker Compose dans le référentiel Milvus. Pour installer Milvus à l'aide de Docker Compose, il suffit d'exécuter la commande suivante</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download the configuration file</span>
$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose.yml -O docker-compose.yml

<span class="hljs-comment"># Start Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Si vous n'avez pas réussi à exécuter la commande ci-dessus, veuillez vérifier si Docker Compose V1 est installé sur votre système. Si c'est le cas, il est conseillé de migrer vers Docker Compose V2 en raison des notes sur <a href="https://docs.docker.com/compose/">cette page</a>.</p></li>
<li><p>Si vous rencontrez des problèmes lors de l'extraction de l'image, contactez-nous à l'adresse <a href="mailto:community@zilliz.com">community@zilliz.com</a> en détaillant le problème, et nous vous fournirons l'assistance nécessaire.</p></li>
</ul>
</div>
<p>Après le démarrage de Milvus,</p>
<ul>
<li>Les conteneurs <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> et <strong>milvus-etcd</strong> sont en place.<ul>
<li>Le conteneur <strong>milvus-etcd</strong> n'expose aucun port à l'hôte et mappe ses données sur les <strong>volumes/etcd</strong> dans le dossier actuel.</li>
<li>Le conteneur <strong>milvus-minio</strong> dessert les ports <strong>9090</strong> et <strong>9091</strong> localement avec les informations d'authentification par défaut et affecte ses données aux <strong>volumes/minio</strong> dans le dossier actuel.</li>
<li>Le conteneur <strong>milvus-standalone</strong> dessert les ports <strong>19530</strong> localement avec les paramètres par défaut et mappe ses données sur <strong>volumes/milvus</strong> dans le dossier actuel.</li>
</ul></li>
</ul>
<p>Vous pouvez vérifier si les conteneurs sont opérationnels à l'aide de la commande suivante :</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker-compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez arrêter et supprimer ce conteneur comme suit</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Après avoir installé Milvus dans Docker, vous pouvez :</p>
<ul>
<li><p>Consulter <a href="/docs/fr/v2.4.x/quickstart.md">Quickstart</a> pour voir ce que Milvus peut faire.</p></li>
<li><p>Apprendre les opérations de base de Milvus :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/manage_databases.md">Gérer les bases de données</a></li>
<li><a href="/docs/fr/v2.4.x/manage-collections.md">Gérer les collections</a></li>
<li><a href="/docs/fr/v2.4.x/manage-partitions.md">Gérer les partitions</a></li>
<li><a href="/docs/fr/v2.4.x/insert-update-delete.md">Insérer, surinsérer et supprimer</a></li>
<li><a href="/docs/fr/v2.4.x/single-vector-search.md">Recherche à vecteur unique</a></li>
<li><a href="/docs/fr/v2.4.x/multi-vector-search.md">Recherche hybride</a></li>
</ul></li>
<li><p><a href="/docs/fr/v2.4.x/upgrade_milvus_cluster-helm.md">Mise à niveau de Milvus à l'aide de Helm Chart</a>.</p></li>
<li><p><a href="/docs/fr/v2.4.x/scaleout.md">Faire évoluer votre cluster Milvus</a>.</p></li>
<li><p>Déployer votre cluster Milvus sur des clouds :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/fr/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/fr/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Découvrez <a href="/docs/fr/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, un outil open-source pour les sauvegardes de données Milvus.</p></li>
<li><p>Découvrez <a href="/docs/fr/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, un outil open-source pour le débogage de Milvus et les mises à jour dynamiques de la configuration.</p></li>
<li><p>Découvrez <a href="https://github.com/zilliztech/attu">Attu</a>, un outil GUI open-source pour la gestion intuitive de Milvus.</p></li>
<li><p><a href="/docs/fr/v2.4.x/monitor.md">Surveiller Milvus avec Prometheus</a>.</p></li>
</ul>
