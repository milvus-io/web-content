---
id: upgrade_milvus_cluster-docker.md
summary: Learn how to upgrade Milvus cluster with Docker Compose.
title: Upgrade Milvus Cluster with Docker Compose
---
<div class="tab-wrapper"><a href="/docs/v2.3.x/upgrade_milvus_standalone-operator.md" class=''>Milvus Operator</a><a href="/docs/v2.3.x/upgrade_milvus_cluster-operator.md" class=''>Milvus Operator</a><a href="/docs/v2.3.x/configure_operator.md" class=''>Milvus Operator</a><a href="/docs/v2.3.x/configure-helm.md" class=''>Helm</a><a href="/docs/v2.3.x/configure-docker.md" class=''>Docker Compose</a><a href="/docs/v2.3.x/upgrade_milvus_standalone-helm.md" class=''>Helm</a><a href="/docs/v2.3.x/upgrade_milvus_standalone-docker.md" class=''>Docker Compose</a><a href="/docs/v2.3.x/upgrade_milvus_cluster-helm.md" class=''>Helm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Docker-Compose" class="common-anchor-header">Upgrade Milvus Cluster with Docker Compose<button data-href="#Upgrade-Milvus-Cluster-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to upgrade your Milvus using Docker Compose.</p>
<p>In normal cases, you can <a href="#Upgrade-Milvus-by-changing-its-image">upgrade Milvus by changing its image</a>. However, you need to <a href="#Migrate-the-metadata">migrate the metadata</a> before any upgrade from v2.1.x to v2.3.21.</p>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">Upgrade Milvus by changing its image<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>In normal cases, you can upgrade Milvus as follows:</p>
<ol>
<li><p>Change the Milvus image tags in <code translate="no">docker-compose.yaml</code>.</p>
<p>Note that you need to change the image tags for the Proxy, all coordinators, and all worker nodes.</p>
<pre><code translate="no" class="language-yaml">...
rootcoord:
  container_name: milvus-rootcoord
  image: milvusdb/milvus:v2.3.21
...
proxy:
  container_name: milvus-proxy
  image: milvusdb/milvus:v2.3.21
...
querycoord:
  container_name: milvus-querycoord
  image: milvusdb/milvus:v2.3.21  
...
querynode:
  container_name: milvus-querynode
  image: milvusdb/milvus:v2.3.21
...
indexcoord:
  container_name: milvus-indexcoord
  image: milvusdb/milvus:v2.3.21
...
indexnode:
  container_name: milvus-indexnode
  image: milvusdb/milvus:v2.3.21 
...
datacoord:
  container_name: milvus-datacoord
  image: milvusdb/milvus:v2.3.21   
...
datanode:
  container_name: milvus-datanode
  image: milvusdb/milvus:v2.3.21
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Run the following commands to perform the upgrade.</p>
<pre><code translate="no" class="language-shell">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Migrate the metadata<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
<li><p>Stop all Milvus components.</p>
<pre><code translate="no">docker stop &lt;milvus-component-docker-container-name&gt;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Prepare the configuration file <code translate="no">migrate.yaml</code> for meta migration.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># migration.yaml</span>
cmd:
  <span class="hljs-comment"># Option: run/backup/rollback</span>
  <span class="hljs-built_in">type</span>: run
  runWithBackup: true
config:
  sourceVersion: <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>   <span class="hljs-comment"># Specify your milvus version</span>
  targetVersion: <span class="hljs-number">2.3</span><span class="hljs-number">.21</span>
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
<li><p>Run the migration container.</p>
<pre><code translate="no"><span class="hljs-comment"># Suppose your docker-compose run with the default milvus network,</span>
<span class="hljs-comment"># and you put migration.yaml in the same directory with docker-compose.yaml.</span>
docker run --<span class="hljs-built_in">rm</span> -it --network milvus -v $(<span class="hljs-built_in">pwd</span>)/migration.yaml:/milvus/configs/migration.yaml milvus/meta-migration:v2.2.0 /milvus/bin/meta-migration -config=/milvus/configs/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Start Milvus components again with the new Milvus image.</p>
<pre><code translate="no">Update the milvus image tag in the docker-compose.yaml
docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>You might also want to learn how to:
<ul>
<li><a href="/docs/v2.3.x/scaleout.md">Scale a Milvus cluster</a></li>
</ul></li>
<li>If you are ready to deploy your cluster on clouds:
<ul>
<li>Learn how to <a href="/docs/v2.3.x/aws.md">Deploy Milvus on AWS with Terraform and Ansible</a></li>
<li>Learn how to <a href="/docs/v2.3.x/eks.md">Deploy Milvus on Amazon EKS with Terraform</a></li>
<li>Learn how to <a href="/docs/v2.3.x/gcp.md">Deploy Milvus Cluster on GCP with Kubernetes</a></li>
<li>Learn how to <a href="/docs/v2.3.x/azure.md">Deploy Milvus on Microsoft Azure With Kubernetes</a></li>
</ul></li>
</ul>
