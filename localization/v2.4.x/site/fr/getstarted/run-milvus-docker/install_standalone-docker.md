---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Découvrez comment installer Milvus de manière autonome avec Docker.
title: Exécuter Milvus dans Docker
---
<h1 id="Run-Milvus-in-Docker" class="common-anchor-header">Exécuter Milvus dans Docker<button data-href="#Run-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page explique comment lancer une instance Milvus dans Docker.</p>
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
<li><a href="/docs/fr/prerequisite-docker.md">Vérifier la configuration matérielle et logicielle requise</a> avant l'installation.</li>
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
    </button></h2><p>Milvus fournit un script d'installation pour l'installer en tant que conteneur Docker. Le script est disponible dans le <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">référentiel Milvus</a>. Pour installer Milvus dans Docker, exécutez simplement</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download the installation script</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

<span class="hljs-comment"># Start the Docker container</span>
$ bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si vous rencontrez des problèmes lors de l'extraction de l'image, contactez-nous à l'adresse <a href="mailto:community@zilliz.com">community@zilliz.com</a> en détaillant le problème, et nous vous fournirons l'assistance nécessaire.</p>
</div>
<p>Après avoir exécuté le script d'installation :</p>
<ul>
<li>Un conteneur docker nommé milvus a été démarré au port <strong>19530</strong>.</li>
<li>Un embed etcd est installé avec Milvus dans le même conteneur et sert au port <strong>2379</strong>. Son fichier de configuration est mappé à <strong>embedEtcd.yaml</strong> dans le dossier actuel.</li>
<li>Pour modifier la configuration par défaut de Milvus, ajoutez vos paramètres au fichier <strong>user.yaml</strong> dans le dossier actuel, puis redémarrez le service.</li>
<li>Le volume de données Milvus est mappé sur <strong>volumes/milvus</strong> dans le dossier en cours.</li>
</ul>
<p>Vous pouvez arrêter et supprimer ce conteneur comme suit</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ bash standalone_embed.sh stop

<span class="hljs-comment"># Delete Milvus data</span>
$ bash standalone_embed.sh delete
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
<li><p>Consulter <a href="/docs/fr/quickstart.md">Quickstart</a> pour voir ce que Milvus peut faire.</p></li>
<li><p>Apprendre les opérations de base de Milvus :</p>
<ul>
<li><a href="/docs/fr/manage_databases.md">Gérer les bases de données</a></li>
<li><a href="/docs/fr/manage-collections.md">Gérer les collections</a></li>
<li><a href="/docs/fr/manage-partitions.md">Gérer les partitions</a></li>
<li><a href="/docs/fr/insert-update-delete.md">Insérer, surinsérer et supprimer</a></li>
<li><a href="/docs/fr/single-vector-search.md">Recherche à vecteur unique</a></li>
<li><a href="/docs/fr/multi-vector-search.md">Recherche hybride</a></li>
</ul></li>
<li><p><a href="/docs/fr/upgrade_milvus_cluster-helm.md">Mise à niveau de Milvus à l'aide de Helm Chart</a>.</p></li>
<li><p><a href="/docs/fr/scaleout.md">Faire évoluer votre cluster Milvus</a>.</p></li>
<li><p>Déployer votre cluster Milvus sur des clouds :</p>
<ul>
<li><a href="/docs/fr/eks.md">Amazon EKS</a></li>
<li><a href="/docs/fr/gcp.md">Google Cloud</a></li>
<li><a href="/docs/fr/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Découvrez <a href="/docs/fr/milvus_backup_overview.md">Milvus Backup</a>, un outil open-source pour les sauvegardes de données Milvus.</p></li>
<li><p>Découvrez <a href="/docs/fr/birdwatcher_overview.md">Birdwatcher</a>, un outil open-source pour le débogage de Milvus et les mises à jour dynamiques de la configuration.</p></li>
<li><p>Découvrez <a href="https://milvus.io/docs/attu.md">Attu</a>, un outil GUI open-source pour la gestion intuitive de Milvus.</p></li>
<li><p><a href="/docs/fr/monitor.md">Surveiller Milvus avec Prometheus</a>.</p></li>
</ul>