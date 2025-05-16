---
id: upgrade_milvus_cluster-docker.md
summary: Découvrez comment mettre à niveau le cluster Milvus avec Docker Compose.
title: Mise à niveau du cluster Milvus avec Docker Compose
---
<div class="tab-wrapper"><a href="/docs/fr/v2.4.x/upgrade_milvus_standalone-operator.md" class=''>Milvus OperatorMilvus</a><a href="/docs/fr/v2.4.x/upgrade_milvus_cluster-operator.md" class=''>OperatorMilvus</a><a href="/docs/fr/v2.4.x/configure-helm.md" class=''>OperatorHelmDocker</a><a href="/docs/fr/v2.4.x/upgrade_milvus_standalone-helm.md" class=''>ComposeHelmDocker</a><a href="/docs/fr/v2.4.x/upgrade_milvus_cluster-helm.md" class=''>ComposeHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Docker-Compose" class="common-anchor-header">Mise à niveau du cluster Milvus avec Docker Compose<button data-href="#Upgrade-Milvus-Cluster-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique décrit comment mettre à niveau votre Milvus à l'aide de Docker Compose.</p>
<p>Dans les cas normaux, vous pouvez <a href="#Upgrade-Milvus-by-changing-its-image">mettre à niveau Milvus en modifiant son image</a>. Cependant, vous devez <a href="#Migrate-the-metadata">migrer les métadonnées</a> avant toute mise à niveau de la version 2.1.x à la version 2.4.23.</p>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">Mise à niveau de Milvus en modifiant son image<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans les cas normaux, vous pouvez mettre à niveau Milvus comme suit :</p>
<ol>
<li><p>Modifier les balises d'image de Milvus dans <code translate="no">docker-compose.yaml</code>.</p>
<p>Notez que vous devez modifier les balises d'image pour le proxy, tous les coordinateurs et tous les nœuds de travail.</p>
<pre><code translate="no" class="language-yaml">...
rootcoord:
  container_name: milvus-rootcoord
  image: milvusdb/milvus:v2.4.23
...
proxy:
  container_name: milvus-proxy
  image: milvusdb/milvus:v2.4.23
...
querycoord:
  container_name: milvus-querycoord
  image: milvusdb/milvus:v2.4.23  
...
querynode:
  container_name: milvus-querynode
  image: milvusdb/milvus:v2.4.23
...
indexcoord:
  container_name: milvus-indexcoord
  image: milvusdb/milvus:v2.4.23
...
indexnode:
  container_name: milvus-indexnode
  image: milvusdb/milvus:v2.4.23 
...
datacoord:
  container_name: milvus-datacoord
  image: milvusdb/milvus:v2.4.23   
...
datanode:
  container_name: milvus-datanode
  image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Exécutez les commandes suivantes pour effectuer la mise à niveau.</p>
<pre><code translate="no" class="language-shell">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Migration des métadonnées<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Arrêter tous les composants Milvus.</p>
<pre><code translate="no">docker stop &lt;milvus-component-docker-container-name&gt;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Préparer le fichier de configuration <code translate="no">migrate.yaml</code> pour la migration des métadonnées.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># migration.yaml</span>
cmd:
  <span class="hljs-comment"># Option: run/backup/rollback</span>
  <span class="hljs-built_in">type</span>: run
  runWithBackup: true
config:
  sourceVersion: <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>   <span class="hljs-comment"># Specify your milvus version</span>
  targetVersion: <span class="hljs-number">2.4</span><span class="hljs-number">.23</span>
  backupFilePath: /tmp/migration.bak
metastore:
  <span class="hljs-built_in">type</span>: etcd
etcd:
  endpoints:
    - milvus-etcd:<span class="hljs-number">2379</span>  <span class="hljs-comment"># Use the etcd container name</span>
  rootPath: by-dev <span class="hljs-comment"># The root path where data is stored in etcd</span>
  metaSubPath: meta
  kvSubPath: kv
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Exécuter le conteneur de migration.</p>
<pre><code translate="no"><span class="hljs-comment"># Suppose your docker-compose run with the default milvus network,</span>
<span class="hljs-comment"># and you put migration.yaml in the same directory with docker-compose.yaml.</span>
docker run --<span class="hljs-built_in">rm</span> -it --network milvus -v $(<span class="hljs-built_in">pwd</span>)/migration.yaml:/milvus/configs/migration.yaml milvus/meta-migration:v2.2.0 /milvus/bin/meta-migration -config=/milvus/configs/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Redémarrer les composants Milvus avec la nouvelle image Milvus.</p>
<pre><code translate="no">Update the milvus image tag in the docker-compose.yaml
docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">Suite de l'article<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Vous pouvez également apprendre à<ul>
<li><a href="/docs/fr/v2.4.x/scaleout.md">Faire évoluer un cluster Milvus</a></li>
</ul></li>
<li>Si vous êtes prêt à déployer votre cluster sur des clouds :<ul>
<li>Apprendre à <a href="/docs/fr/v2.4.x/eks.md">déployer Milvus sur Amazon EKS avec Terraform</a></li>
<li>Apprendre à <a href="/docs/fr/v2.4.x/gcp.md">déployer le cluster Milvus sur GCP avec Kubernetes</a></li>
<li>Apprendre à <a href="/docs/fr/v2.4.x/azure.md">déployer Milvus sur Microsoft Azure avec Kubernetes</a></li>
</ul></li>
</ul>
