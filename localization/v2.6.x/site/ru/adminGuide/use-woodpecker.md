---
id: use-woodpecker.md
title: Используйте Woodpecker (Milvus v2.6.x).
related_key: Woodpecker
summary: 'Узнайте, как включить дятла в качестве WAL в milvus.'
---
<h2 id="Use-Woodpecker-Milvus-v26x" class="common-anchor-header">Использование Woodpecker (Milvus v2.6.x)<button data-href="#Use-Woodpecker-Milvus-v26x" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом руководстве объясняется, как включить и использовать Woodpecker в качестве журнала опережающей записи (WAL) в Milvus 2.6.x. Woodpecker - это облачный WAL, предназначенный для хранения объектов, обеспечивающий высокую пропускную способность, низкие эксплуатационные расходы и плавную масштабируемость. Подробную информацию об архитектуре и эталонных образцах см. в разделе <a href="/docs/ru/woodpecker_architecture.md">Woodpecker</a>.</p>
<h3 id="Overview" class="common-anchor-header">Обзор</h3><ul>
<li>Начиная с Milvus 2.6, Woodpecker - это дополнительный WAL, который обеспечивает упорядоченную запись и восстановление в качестве службы протоколирования.</li>
<li>В качестве очереди сообщений он ведет себя аналогично Pulsar/Kafka и может быть включен через конфигурацию.</li>
<li>Поддерживаются два бэкенда хранения данных: локальная файловая система (<code translate="no">local</code>) и объектное хранилище (<code translate="no">minio</code>/S3-совместимое ).</li>
</ul>
<h3 id="Quick-start" class="common-anchor-header">Быстрый запуск</h3><p>Чтобы включить Woodpecker, установите для типа MQ значение Woodpecker:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>Примечание: Переключение <code translate="no">mq.type</code> для работающего кластера является операцией обновления. Внимательно выполните процедуру обновления и проверьте ее на свежем кластере, прежде чем переключать производство.</p>
<h3 id="Configuration" class="common-anchor-header">Конфигурация</h3><p>Ниже приведен полный блок конфигурации Woodpecker (отредактируйте <code translate="no">milvus.yaml</code> или переопределите в <code translate="no">user.yaml</code>):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of woodpecker, used to manage Milvus logs of recent mutation operations, output streaming log, and provide embedded log sequential read and write.</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">meta:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">etcd</span> <span class="hljs-comment"># The Type of the metadata provider. currently only support etcd.</span>
    <span class="hljs-attr">prefix:</span> <span class="hljs-string">woodpecker</span> <span class="hljs-comment"># The Prefix of the metadata provider. default is woodpecker.</span>
  <span class="hljs-attr">client:</span>
    <span class="hljs-attr">segmentAppend:</span>
      <span class="hljs-attr">queueSize:</span> <span class="hljs-number">10000</span> <span class="hljs-comment"># The size of the queue for pending messages to be sent of each log.</span>
      <span class="hljs-attr">maxRetries:</span> <span class="hljs-number">3</span> <span class="hljs-comment"># Maximum number of retries for segment append operations.</span>
    <span class="hljs-attr">segmentRollingPolicy:</span>
      <span class="hljs-attr">maxSize:</span> <span class="hljs-string">256M</span> <span class="hljs-comment"># Maximum size of a segment.</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">10m</span> <span class="hljs-comment"># Maximum interval between two segments, default is 10 minutes.</span>
      <span class="hljs-attr">maxBlocks:</span> <span class="hljs-number">1000</span> <span class="hljs-comment"># Maximum number of blocks in a segment</span>
    <span class="hljs-attr">auditor:</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">10s</span> <span class="hljs-comment"># Maximum interval between two auditing operations, default is 10 seconds.</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">200ms</span> <span class="hljs-comment"># Maximum interval between two sync operations, default is 200 milliseconds.</span>
      <span class="hljs-attr">maxIntervalForLocalStorage:</span> <span class="hljs-string">10ms</span> <span class="hljs-comment"># Maximum interval between two sync operations local storage backend, default is 10 milliseconds.</span>
      <span class="hljs-attr">maxBytes:</span> <span class="hljs-string">256M</span> <span class="hljs-comment"># Maximum size of write buffer in bytes.</span>
      <span class="hljs-attr">maxEntries:</span> <span class="hljs-number">10000</span> <span class="hljs-comment"># Maximum entries number of write buffer.</span>
      <span class="hljs-attr">maxFlushRetries:</span> <span class="hljs-number">5</span> <span class="hljs-comment"># Maximum size of write buffer in bytes.</span>
      <span class="hljs-attr">retryInterval:</span> <span class="hljs-string">1000ms</span> <span class="hljs-comment"># Maximum interval between two retries. default is 1000 milliseconds.</span>
      <span class="hljs-attr">maxFlushSize:</span> <span class="hljs-string">2M</span> <span class="hljs-comment"># Maximum size of a fragment in bytes to flush.</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">32</span> <span class="hljs-comment"># Maximum number of threads to flush data</span>
    <span class="hljs-attr">segmentCompactionPolicy:</span>
      <span class="hljs-attr">maxSize:</span> <span class="hljs-string">2M</span> <span class="hljs-comment"># The maximum size of the merged files.</span>
      <span class="hljs-attr">maxParallelUploads:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># The maximum number of parallel upload threads for compaction.</span>
      <span class="hljs-attr">maxParallelReads:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># The maximum number of parallel read threads for compaction.</span>
    <span class="hljs-attr">segmentReadPolicy:</span>
      <span class="hljs-attr">maxBatchSize:</span> <span class="hljs-string">16M</span> <span class="hljs-comment"># Maximum size of a batch in bytes.</span>
      <span class="hljs-attr">maxFetchThreads:</span> <span class="hljs-number">32</span> <span class="hljs-comment"># Maximum number of threads to fetch data.</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span> <span class="hljs-comment"># The Type of the storage provider. Valid values: [minio, local]</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">/var/lib/milvus/woodpecker</span> <span class="hljs-comment"># The root path of the storage provider.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ключевые замечания:</p>
<ul>
<li><code translate="no">woodpecker.meta</code>
<ul>
<li><strong>тип</strong>: В настоящее время поддерживается только <code translate="no">etcd</code>. Используйте тот же etcd, что и Milvus, для хранения легких метаданных.</li>
<li><strong>префикс</strong>: Префикс ключа для метаданных. По умолчанию: <code translate="no">woodpecker</code>.</li>
</ul></li>
<li><code translate="no">woodpecker.client</code>
<ul>
<li>Управляет поведением сегмента при добавлении/прокрутке/аудите на стороне клиента, чтобы сбалансировать пропускную способность и сквозную задержку.</li>
</ul></li>
<li><code translate="no">woodpecker.logstore</code>
<ul>
<li>Управляет политиками синхронизации/промывки/компактирования/чтения для сегментов журнала. Это основные регуляторы для настройки пропускной способности/задержки.</li>
</ul></li>
<li><code translate="no">woodpecker.storage</code>
<ul>
<li><strong>type</strong>: <code translate="no">minio</code> для MinIO/S3-совместимых объектных хранилищ (MinIO/S3/GCS/OSS и т. д.); <code translate="no">local</code> для локальных/общих файловых систем.</li>
<li><strong>rootPath</strong>: Корневой путь для бэкенда хранилища (эффективно для <code translate="no">local</code>; в случае <code translate="no">minio</code> пути определяются bucket/prefix).</li>
</ul></li>
</ul>
<h3 id="Deployment-modes" class="common-anchor-header">Режимы развертывания</h3><p>Milvus поддерживает как автономный, так и кластерный режимы. Матрица поддержки бэкендов хранения Woodpecker:</p>
<table>
<thead>
<tr><th></th><th><code translate="no">storage.type=local</code></th><th><code translate="no">storage.type=minio</code></th></tr>
</thead>
<tbody>
<tr><td>Milvus Standalone</td><td>Поддерживается</td><td>Поддерживается</td></tr>
<tr><td>Milvus Cluster</td><td>Ограниченно (требуется общая ФС)</td><td>Поддерживается</td></tr>
</tbody>
</table>
<p>Примечания:</p>
<ul>
<li>При использовании <code translate="no">minio</code> Woodpecker разделяет с Milvus одно и то же хранилище объектов (MinIO/S3/GCS/OSS и т. д.).</li>
<li>При использовании <code translate="no">local</code> локальный диск на одном узле подходит только для Standalone. Если все стручки могут получить доступ к общей файловой системе (например, NFS), в режиме кластера также можно использовать <code translate="no">local</code>.</li>
</ul>
<h2 id="Deployment-guides" class="common-anchor-header">Руководства по развертыванию<button data-href="#Deployment-guides" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="common-anchor-header">Включение Woodpecker для кластера Milvus на Kubernetes (Milvus Operator, storage=minio)</h3><p>После установки <a href="/docs/ru/install_cluster-milvusoperator.md">Milvus Operator</a> запустите кластер Milvus с включенным Woodpecker, используя официальный пример:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml

<button class="copy-code-btn"></button></code></pre>
<p>Этот пример настраивает Woodpecker в качестве очереди сообщений и включает потоковый узел. При первом запуске может потребоваться время для извлечения изображений; подождите, пока все поды будут готовы:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
kubectl get milvus my-release -o yaml | grep -A2 status
<button class="copy-code-btn"></button></code></pre>
<p>После готовности вы должны увидеть стручки, похожие на:</p>
<pre><code translate="no">NAME                                               READY   STATUS    RESTARTS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-7</span>f8f88499d<span class="hljs-operator">-</span>kc66r        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>mixcoord<span class="hljs-number">-7</span>cd7998d<span class="hljs-operator">-</span>x59kg          <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-5</span>b56cf8446<span class="hljs-operator">-</span>pbnjm           <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-0</span><span class="hljs-number">-558</span>d9cdd57<span class="hljs-operator">-</span>sgbfx     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>streamingnode<span class="hljs-number">-58</span>fbfdfdd8<span class="hljs-operator">-</span>vtxfd   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-0</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-1</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-2</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-3</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
<button class="copy-code-btn"></button></code></pre>
<p>Выполните следующую команду, чтобы удалить кластер Milvus.</p>
<pre><code translate="no" class="language-bash">kubectl delete milvus my-release
<button class="copy-code-btn"></button></code></pre>
<p>Если вам нужно настроить параметры Woodpecker, следуйте настройкам, описанным в <a href="/docs/ru/deploy_pulsar.md">message storage config</a>.</p>
<h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="common-anchor-header">Включение Woodpecker для кластера Milvus на Kubernetes (Helm Chart, storage=minio)</h3><p>Сначала добавьте и обновите диаграмму Milvus Helm, как описано в разделе <a href="/docs/ru/install_cluster-helm.md">Запуск Milvus в Kubernetes с помощью Helm</a>.</p>
<p>Затем выполните развертывание в одном из следующих примеров:</p>
<p>- Кластерное развертывание (рекомендуемые настройки с включенным Woodpecker и Streaming Node):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.0 \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>- Автономное развертывание (Woodpecker включен):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.0 \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>После развертывания следуйте документации для переадресации портов и подключения. Чтобы настроить параметры Woodpecker, следуйте настройкам, описанным в <a href="/docs/ru/deploy_pulsar.md">конфигурации хранилища сообщений</a>.</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="common-anchor-header">Включите Woodpecker для Milvus Standalone в Docker (storage=local)</h3><p>Выполните <a href="/docs/ru/install_standalone-docker.md">команду Запустить Milvus в Docker</a>. Пример:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

<span class="hljs-comment"># Create user.yaml to enable Woodpecker with local filesystem</span>
<span class="hljs-built_in">cat</span> &gt; user.yaml &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
mq:
  <span class="hljs-built_in">type</span>: woodpecker
woodpecker:
  storage:
    <span class="hljs-built_in">type</span>: <span class="hljs-built_in">local</span>
    rootPath: /var/lib/milvus/woodpecker
EOF

bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы дополнительно изменить настройки Woodpecker, обновите <code translate="no">user.yaml</code> и запустите <code translate="no">bash standalone_embed.sh restart</code>.</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="common-anchor-header">Включить Woodpecker для Milvus Standalone с помощью Docker Compose (storage=minio)</h3><p>Выполните <a href="/docs/ru/install_standalone-docker-compose.md">команду Запустить Milvus с помощью Docker Compose</a>. Пример:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp-compose &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp-compose
wget https://github.com/milvus-io/milvus/releases/download/v2.6.0/milvus-standalone-docker-compose.yml -O docker-compose.yml
<span class="hljs-comment"># By default, the Docker Compose standalone uses Woodpecker</span>
<span class="hljs-built_in">sudo</span> docker compose up -d
<span class="hljs-comment"># If you need to change Woodpecker parameters further, write an override:</span>
docker <span class="hljs-built_in">exec</span> -it milvus-standalone bash -lc <span class="hljs-string">&#x27;cat &gt; /milvus/configs/user.yaml &lt;&lt;EOF
mq:
  type: woodpecker
woodpecker:
  logstore:
    segmentSyncPolicy: 
      maxFlushThreads: 16
  storage:
    type: minio
EOF&#x27;</span>

<span class="hljs-comment"># Restart the container to apply the changes</span>
docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre>
<h2 id="Throughput-tuning-tips" class="common-anchor-header">Советы по настройке пропускной способности<button data-href="#Throughput-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><p>Основываясь на бенчмарках и ограничениях бэкенда в <a href="/docs/ru/woodpecker_architecture.md">Woodpecker</a>, оптимизируйте сквозную пропускную способность записи со следующих точек зрения:</p>
<ul>
<li>Хранилище<ul>
<li><strong>Объектное хранилище (совместимое с minio/S3)</strong>: Увеличьте параллельность и размер объектов (избегайте маленьких объектов). Следите за ограничениями пропускной способности сети и ведра. Пропускная способность одного узла MinIO на SSD часто составляет около 100 МБ/с на локальном уровне; скорость одного узла EC2 в S3 может достигать ГБ/с.</li>
<li><strong>Локальные/общие файловые системы (локальные)</strong>: Предпочитайте NVMe/быстрые диски. Убедитесь, что ФС хорошо справляется с небольшими записями и задержками fsync.</li>
</ul></li>
<li>Ручки дятла<ul>
<li>Увеличьте <code translate="no">logstore.segmentSyncPolicy.maxFlushSize</code> и <code translate="no">maxFlushThreads</code> для больших объемов флеша и более высокого параллелизма.</li>
<li>Настройте <code translate="no">maxInterval</code> в соответствии с характеристиками носителя (обменяйте задержку на пропускную способность при более длительной агрегации).</li>
<li>Для объектных хранилищ следует увеличить <code translate="no">segmentRollingPolicy.maxSize</code>, чтобы уменьшить переключение сегментов.</li>
</ul></li>
<li>Сторона клиента/приложения<ul>
<li>Используйте большие размеры пакетов и большее число одновременно работающих писателей/клиентов.</li>
<li>Контролируйте время обновления/создания индекса (пакетная вставка перед срабатыванием), чтобы избежать частых небольших записей.</li>
</ul></li>
</ul>
<p>Демонстрация пакетной вставки</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://&lt;Proxy Pod IP&gt;:27017&quot;</span>,
)

<span class="hljs-comment"># 2. Create a collection</span>
res = client.create_collection(
    collection_name=<span class="hljs-string">&quot;test_milvus_wp&quot;</span>,
    dimension=<span class="hljs-number">512</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
    shards_num=<span class="hljs-number">2</span>,
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># 3. Insert randomly generated vectors</span>
colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

batch_size = <span class="hljs-number">1000</span>
batch_count = <span class="hljs-number">2000</span>
<span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(batch_count):
    start_time = time.time()
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserting <span class="hljs-subst">{j}</span>th vectors <span class="hljs-subst">{j * batch_size}</span> startTime<span class="hljs-subst">{start_time}</span>&quot;</span>)
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(batch_size):
        current_color = random.choice(colors)
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: (j*batch_size + i),
            <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">512</span>) ],
            <span class="hljs-string">&quot;color&quot;</span>: current_color,
            <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>))}</span>&quot;</span>
        })
    res = client.insert(
        collection_name=<span class="hljs-string">&quot;test_milvus_wp&quot;</span>,
        data=data
    )
    data = []
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{j}</span>th vectors endTime:<span class="hljs-subst">{time.time()}</span> costTime:<span class="hljs-subst">{time.time() - start_time}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Latency" class="common-anchor-header">Латентность<button data-href="#Latency" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker - это облачный нативный WAL, предназначенный для объектного хранилища с компромиссами между пропускной способностью, стоимостью и задержкой. В поддерживаемом в настоящее время облегченном встроенном режиме приоритет отдается оптимизации стоимости и пропускной способности, поскольку в большинстве сценариев требуется только запись данных в течение определенного времени, а не низкая задержка для отдельных запросов на запись. Поэтому Woodpecker использует пакетную запись с интервалами по умолчанию 10 мс для локальных файловых систем и 200 мс для MinIO-подобных систем хранения. При медленных операциях записи максимальная задержка равна времени интервала плюс время промывки.</p>
<p>Обратите внимание, что пакетная вставка инициируется не только временными интервалами, но и размером пакета, который по умолчанию равен 2 МБ.</p>
<p>Подробные сведения об архитектуре, режимах развертывания (MemoryBuffer / QuorumBuffer) и производительности см. в разделе <a href="/docs/ru/woodpecker_architecture.md">Архитектура Woodpecker</a>.</p>
<p>Для получения более подробной информации о параметрах обратитесь к <a href="https://github.com/zilliztech/woodpecker">репозиторию</a> Woodpecker <a href="https://github.com/zilliztech/woodpecker">на GitHub</a>.</p>
