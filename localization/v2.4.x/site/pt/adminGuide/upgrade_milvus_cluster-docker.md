---
id: upgrade_milvus_cluster-docker.md
summary: Saiba como atualizar o cluster Milvus com o Docker Compose.
title: Atualizar o cluster do Milvus com o Docker Compose
---
<div class="tab-wrapper"><a href="/docs/pt/v2.4.x/upgrade_milvus_standalone-operator.md" class=''>Milvus OperatorMilvus</a><a href="/docs/pt/v2.4.x/upgrade_milvus_cluster-operator.md" class=''>OperatorMilvus</a><a href="/docs/pt/v2.4.x/configure-helm.md" class=''>OperatorHelmDocker</a><a href="/docs/pt/v2.4.x/upgrade_milvus_standalone-helm.md" class=''>ComposeHelmDocker</a><a href="/docs/pt/v2.4.x/configure-docker.md" class=''></a><a href="/docs/pt/v2.4.x/upgrade_milvus_cluster-helm.md" class=''>ComposeHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Docker-Compose" class="common-anchor-header">Atualizar o cluster do Milvus com o Docker Compose<button data-href="#Upgrade-Milvus-Cluster-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico descreve como atualizar seu Milvus usando o Docker Compose.</p>
<p>Em casos normais, você pode <a href="#Upgrade-Milvus-by-changing-its-image">atualizar o Milvus alterando sua imagem</a>. No entanto, é necessário <a href="#Migrate-the-metadata">migrar os metadados</a> antes de qualquer atualização da v2.1.x para a v2.4.23.</p>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">Atualizar o Milvus alterando a sua imagem<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>Em casos normais, você pode atualizar o Milvus da seguinte forma:</p>
<ol>
<li><p>Alterar as etiquetas de imagem do Milvus em <code translate="no">docker-compose.yaml</code>.</p>
<p>Note que é necessário alterar as etiquetas de imagem para o Proxy, todos os coordenadores e todos os nós de trabalho.</p>
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
<li><p>Execute os seguintes comandos para realizar a atualização.</p>
<pre><code translate="no" class="language-shell">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Migrar os metadados<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
<li><p>Parar todos os componentes do Milvus.</p>
<pre><code translate="no">docker stop &lt;milvus-component-docker-container-name&gt;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Preparar o ficheiro de configuração <code translate="no">migrate.yaml</code> para a migração de metadados.</p>
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
<li><p>Executar o contentor de migração.</p>
<pre><code translate="no"><span class="hljs-comment"># Suppose your docker-compose run with the default milvus network,</span>
<span class="hljs-comment"># and you put migration.yaml in the same directory with docker-compose.yaml.</span>
docker run --<span class="hljs-built_in">rm</span> -it --network milvus -v $(<span class="hljs-built_in">pwd</span>)/migration.yaml:/milvus/configs/migration.yaml milvus/meta-migration:v2.2.0 /milvus/bin/meta-migration -config=/milvus/configs/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inicie novamente os componentes do Milvus com a nova imagem do Milvus.</p>
<pre><code translate="no">Update the milvus image tag in the docker-compose.yaml
docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">O que se segue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Você também pode querer aprender como:<ul>
<li><a href="/docs/pt/v2.4.x/scaleout.md">Escalar um cluster Milvus</a></li>
</ul></li>
<li>Se estiver pronto para implantar seu cluster em nuvens:<ul>
<li>Saiba como <a href="/docs/pt/v2.4.x/eks.md">implantar o Milvus no Amazon EKS com o Terraform</a></li>
<li>Saiba como implantar <a href="/docs/pt/v2.4.x/gcp.md">o Milvus Cluster no GCP com Kubernetes</a></li>
<li>Saiba como <a href="/docs/pt/v2.4.x/azure.md">implantar o Milvus no Microsoft Azure com o Kubernetes</a></li>
</ul></li>
</ul>
