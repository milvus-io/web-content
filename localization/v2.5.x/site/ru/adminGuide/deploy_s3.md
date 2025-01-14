---
id: deploy_s3.md
title: Настройка объектного хранилища с помощью Docker Compose или Helm
related_key: 'S3, storage'
summary: >-
  Узнайте, как настроить хранилище S3 для Milvus с помощью Docker Compose или
  Helm.
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Настройка объектного хранилища с помощью Docker Compose или Helm<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>По умолчанию Milvus использует MinIO для хранения объектов, но он также поддерживает использование <a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a> в качестве постоянного хранилища объектов для файлов журналов и индексов. В этой теме описывается, как настроить S3 для Milvus. Вы можете пропустить эту тему, если вам достаточно MinIO.</p>
<p>Вы можете настроить S3 с помощью <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> или на K8s.</p>
<h2 id="Configure-S3-with-Docker-Compose" class="common-anchor-header">Настройка S3 с помощью Docker Compose<button data-href="#Configure-S3-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. Настроить S3</h3><p><a href="https://min.io/product/overview">MinIO</a> совместим с S3. Чтобы настроить S3 с помощью Docker Compose, укажите значения для секции <code translate="no">minio</code> в файле <code translate="no">milvus.yaml</code> по пути milvus/configs.</p>
<pre><code translate="no" class="language-yaml">minio:
  address: &lt;your_s3_endpoint&gt;
  port: &lt;your_s3_port&gt;
  accessKeyID: &lt;your_s3_access_key_id&gt;
  secretAccessKey: &lt;your_s3_secret_access_key&gt;
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительные сведения см. в разделе <a href="/docs/ru/configure_minio.md">Конфигурации MinIO/S3</a>.</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. Доработка docker-compose.yaml</h3><p>Вы также удалите переменную окружения <code translate="no">MINIO_ADDRESS</code> для службы milvus по адресу <code translate="no">docker-compose.yaml</code>. По умолчанию milvus будет использовать локальный minio вместо внешнего S3.</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. Запустите Milvus</h3><p>Выполните следующую команду, чтобы запустить Milvus, который использует конфигурации S3.</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Конфигурации вступают в силу только после запуска Milvus. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Запуск Milvus</a>.</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">Настройка S3 на K8s<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>Для кластеров Milvus на K8s можно настроить S3 в той же команде, которая запускает Milvus. В качестве альтернативы можно настроить S3 с помощью файла <code translate="no">values.yml</code> по пути /charts/milvus в репозитории <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> перед запуском Milvus.</p>
<p>В следующей таблице перечислены ключи для настройки S3 в файле YAML.</p>
<table>
<thead>
<tr><th>Ключ</th><th>Описание</th><th>Значение</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>Включает или отключает MinIO.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>Включает или отключает S3.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>Конечная точка для доступа к S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>Порт для доступа к S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>Корневой путь к хранилищу S3.</td><td>По умолчанию - строка emtpy.</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>Идентификатор ключа доступа для S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>Секретный ключ доступа для S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>Имя ведра S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>Использовать ли SSL при подключении</td><td>Значения по умолчанию <code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Использование файла YAML</h3><ol>
<li>Настройте секцию <code translate="no">minio</code> в файле <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Настройте секцию <code translate="no">externalS3</code>, используя значения из файла <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml">externalS3:
  enabled: <span class="hljs-literal">true</span>
  host: <span class="hljs-string">&quot;&lt;your_s3_endpoint&gt;&quot;</span>
  port: <span class="hljs-string">&quot;&lt;your_s3_port&gt;&quot;</span>
  accessKey: <span class="hljs-string">&quot;&lt;your_s3_access_key_id&gt;&quot;</span>
  secretKey: <span class="hljs-string">&quot;&lt;your_s3_secret_key&gt;&quot;</span>
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>После настройки предыдущих разделов и сохранения файла <code translate="no">values.yaml</code> выполните следующую команду, чтобы установить Milvus, использующий конфигурации S3.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">Использование команды</h3><p>Чтобы установить Milvus и настроить S3, выполните следующую команду, используя ваши значения.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span>  --<span class="hljs-built_in">set</span> minio.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externalS3.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.host=&lt;your_s3_endpoint&gt; --<span class="hljs-built_in">set</span> externalS3.port=&lt;your_s3_port&gt; --<span class="hljs-built_in">set</span> externalS3.accessKey=&lt;your_s3_access_key_id&gt; --<span class="hljs-built_in">set</span> externalS3.secretKey=&lt;your_s3_secret_key&gt; --<span class="hljs-built_in">set</span> externalS3.bucketName=&lt;your_bucket_name&gt;
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Узнайте, как настроить другие зависимости Milvus с помощью Docker Compose или Helm:</p>
<ul>
<li><a href="/docs/ru/deploy_etcd.md">Настройка метахранилища с помощью Docker Compose или Helm</a></li>
<li><a href="/docs/ru/deploy_pulsar.md">Настройте хранилище сообщений с помощью Docker Compose или Helm</a></li>
</ul>
