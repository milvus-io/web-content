---
id: upgrade_milvus_cluster-docker.md
summary: 'Узнайте, как обновить кластер Milvus с помощью Docker Compose.'
title: Обновление кластера Milvus с помощью Docker Compose
---
<div class="tab-wrapper"><a href="/docs/ru/upgrade_milvus_standalone-operator.md" class=''>Milvus OperatorMilvus</a><a href="/docs/ru/upgrade_milvus_cluster-operator.md" class=''>OperatorMilvus</a><a href="/docs/ru/configure-helm.md" class=''>OperatorHelmDocker</a><a href="/docs/ru/upgrade_milvus_standalone-helm.md" class=''>ComposeHelmDocker</a><a href="/docs/ru/upgrade_milvus_cluster-helm.md" class=''>ComposeHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Docker-Compose" class="common-anchor-header">Обновление кластера Milvus с помощью Docker Compose<button data-href="#Upgrade-Milvus-Cluster-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается, как обновить Milvus с помощью Docker Compose.</p>
<p>В обычных случаях вы можете <a href="#Upgrade-Milvus-by-changing-its-image">обновить Milvus, изменив его образ</a>. Однако перед обновлением с версии 2.1.x до версии 2.5.3 необходимо <a href="#Migrate-the-metadata">перенести метаданные</a>.</p>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">Обновление Milvus путем изменения его образа<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>В обычных случаях вы можете обновить Milvus следующим образом:</p>
<ol>
<li><p>Измените теги изображения Milvus в <code translate="no">docker-compose.yaml</code>.</p>
<p>Обратите внимание, что вам нужно изменить теги образов для прокси, всех координаторов и всех рабочих узлов.</p>
<pre><code translate="no" class="language-yaml">...
rootcoord:
  container_name: milvus-rootcoord
  image: milvusdb/milvus:v2.5.3
...
proxy:
  container_name: milvus-proxy
  image: milvusdb/milvus:v2.5.3
...
querycoord:
  container_name: milvus-querycoord
  image: milvusdb/milvus:v2.5.3  
...
querynode:
  container_name: milvus-querynode
  image: milvusdb/milvus:v2.5.3
...
indexcoord:
  container_name: milvus-indexcoord
  image: milvusdb/milvus:v2.5.3
...
indexnode:
  container_name: milvus-indexnode
  image: milvusdb/milvus:v2.5.3 
...
datacoord:
  container_name: milvus-datacoord
  image: milvusdb/milvus:v2.5.3   
...
datanode:
  container_name: milvus-datanode
  image: milvusdb/milvus:v2.5.3
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Для выполнения обновления выполните следующие команды.</p>
<pre><code translate="no" class="language-shell">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Перенос метаданных<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
<li><p>Остановите все компоненты Milvus.</p>
<pre><code translate="no">docker stop &lt;milvus-component-docker-container-name&gt;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Подготовьте конфигурационный файл <code translate="no">migrate.yaml</code> для миграции метаданных.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># migration.yaml</span>
cmd:
  <span class="hljs-comment"># Option: run/backup/rollback</span>
  <span class="hljs-built_in">type</span>: run
  runWithBackup: true
config:
  sourceVersion: <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>   <span class="hljs-comment"># Specify your milvus version</span>
  targetVersion: <span class="hljs-number">2.5</span><span class="hljs-number">.3</span>
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
<li><p>Запустите контейнер миграции.</p>
<pre><code translate="no"><span class="hljs-comment"># Suppose your docker-compose run with the default milvus network,</span>
<span class="hljs-comment"># and you put migration.yaml in the same directory with docker-compose.yaml.</span>
docker run --<span class="hljs-built_in">rm</span> -it --network milvus -v $(<span class="hljs-built_in">pwd</span>)/migration.yaml:/milvus/configs/migration.yaml milvus/meta-migration:v2.2.0 /milvus/bin/meta-migration -config=/milvus/configs/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Снова запустите компоненты Milvus с новым образом Milvus.</p>
<pre><code translate="no">Update the milvus image tag in the docker-compose.yaml
docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Вам также может быть интересно узнать, как:<ul>
<li><a href="/docs/ru/scaleout.md">Масштабировать кластер Milvus</a></li>
</ul></li>
<li>Если вы готовы развернуть свой кластер в облаке:<ul>
<li>Узнайте, как <a href="/docs/ru/eks.md">развернуть Milvus на Amazon EKS с помощью Terraform</a>.</li>
<li>Узнайте, как <a href="/docs/ru/gcp.md">развернуть кластер Milvus на GCP с помощью Kubernetes</a></li>
<li>Узнайте, как <a href="/docs/ru/azure.md">развернуть Milvus на Microsoft Azure с помощью Kubernetes</a>.</li>
</ul></li>
</ul>