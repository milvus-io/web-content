---
id: woodpecker.md
title: Woodpecker
related_key: Woodpecker
summary: >-
  Узнайте, как Woodpecker работает в качестве очереди сообщений по умолчанию
  (WAL) в Milvus, а также как запускать его в встроенном режиме или в режиме
  службы.
---
<h1 id="Woodpecker" class="common-anchor-header">Woodpecker<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Woodpecker — это <strong>очередь сообщений по умолчанию (журнал предварительной записи, WAL)</strong> в Milvus 3.x. Это облачный WAL, разработанный специально для объектного хранилища, который обеспечивает высокую пропускную способность, низкие эксплуатационные затраты и плавную масштабируемость. Подробную информацию об архитектуре и результатах тестирования см. в разделе <a href="/docs/ru/woodpecker_architecture.md">«Woodpecker</a>».</p>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
<li>В Milvus 3.x Woodpecker является WAL/очередью сообщений <strong>по умолчанию</strong>, обеспечивающей упорядоченную запись и восстановление в качестве службы ведения журнала. Внешняя служба очереди сообщений (такая как Pulsar или Kafka) не требуется.</li>
<li>Woodpecker может работать <strong>встроенным</strong> в узел Milvus/streaming (по умолчанию) или в качестве <strong>отдельного сервиса</strong> со своими собственными под (только в распределённом режиме/кластере).</li>
<li>Он поддерживает три режима хранения данных ( <code translate="no">storage.type</code> ): объектное хранилище (<code translate="no">minio</code>, по умолчанию), локальную файловую систему (<code translate="no">local</code>) и выделенное хранилище ( <code translate="no">service</code>). См. <a href="#Deployment-modes">раздел «Режимы развертывания</a>».</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">Быстрый старт<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы включить Woodpecker, установите тип MQ равным Woodpecker:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>Примечание: Смена типа « <code translate="no">mq.type</code> » для работающего кластера является операцией обновления. Внимательно следуйте процедуре обновления и проверьте работоспособность на новом кластере, прежде чем переключать производственную среду.</p>
<h2 id="Configuration" class="common-anchor-header">Настройка<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Ниже приведен полный блок конфигурации Woodpecker (отредактируйте файл <code translate="no">milvus.yaml</code> или переопределите настройки в файле <code translate="no">user.yaml</code>):</p>
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
      <span class="hljs-attr">maxFlushRetries:</span> <span class="hljs-number">5</span> <span class="hljs-comment"># Maximum number of flush retries.</span>
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
<p>Ключевые моменты:</p>
<ul>
<li><code translate="no">woodpecker.meta</code>
<ul>
<li><strong>type</strong>: В настоящее время поддерживается только <code translate="no">etcd</code>. Используйте тот же etcd, что и для Milvus, для хранения облегчённых метаданных.</li>
<li><strong>prefix</strong>: префикс ключей для метаданных. По умолчанию: <code translate="no">woodpecker</code>.</li>
</ul></li>
<li><code translate="no">woodpecker.client</code>
<ul>
<li>Управляет поведением добавления/последовательного обновления/аудита сегментов на стороне клиента для обеспечения баланса между пропускной способностью и сквозной задержкой.</li>
</ul></li>
<li><code translate="no">woodpecker.logstore</code>
<ul>
<li>Управляет политиками синхронизации, сброса, уплотнения и чтения для сегментов журнала. Это основные параметры для настройки пропускной способности и задержки.</li>
</ul></li>
<li><code translate="no">woodpecker.storage</code>
<ul>
<li><strong>type</strong>: <code translate="no">minio</code> для объектного хранилища, совместимого с MinIO/S3 (MinIO/S3/GCS/OSS и т. д.); <code translate="no">local</code> для локальных/общих файловых систем.</li>
<li><strong>rootPath</strong>: корневой путь для бэкэнда хранилища (действует для <code translate="no">local</code>; при использовании <code translate="no">minio</code> пути определяются корзиной/префиксом).</li>
</ul></li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">Режимы развёртки<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker поддерживает три режима работы с <code translate="no">storage.type</code>:</p>
<table>
<thead>
<tr><th><code translate="no">storage.type</code></th><th>Как работает Woodpecker</th><th>Бэкенд WAL</th><th>Автономный Milvus</th><th>Распределенная версия Milvus (кластер)</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio</code> (по умолчанию)</td><td>Встроенный в узел Milvus/потоковой передачи</td><td>Объектное хранилище (совместимое с MinIO/S3)</td><td>Поддерживается</td><td>Поддерживается</td></tr>
<tr><td><code translate="no">local</code></td><td>Встроен в узел Milvus/потоковой передачи</td><td>Локальная файловая система</td><td>Поддерживается</td><td>Ограничено (все узлы нуждаются в общей файловой системе, например NFS)</td></tr>
<tr><td><code translate="no">service</code></td><td><strong>Выделенный сервис Woodpecker</strong> (собственные поды)</td><td>Объектное хранилище (совместимое с MinIO/S3)</td><td><strong>Не поддерживается</strong></td><td>Поддерживается</td></tr>
</tbody>
</table>
<p>Примечания:</p>
<ul>
<li>При использовании режима « <code translate="no">minio</code> » Woodpecker использует то же объектное хранилище, что и Milvus (MinIO/S3/GCS/OSS и т. д.).</li>
<li>При использовании режима « <code translate="no">local</code> » локальный диск одного узла подходит только для автономного режима. Если все поды имеют доступ к общей файловой системе (например, NFS), в кластерном режиме также можно использовать режим « <code translate="no">local</code> ».</li>
<li><strong><code translate="no">service</code> Режим «Cluster» запускает Woodpecker как отдельный, независимо масштабируемый сервис и доступен только для распределенных/кластерных развертываний.</strong> Автономные развертывания используют встроенные режимы (<code translate="no">minio</code> или <code translate="no">local</code>).</li>
</ul>
<h2 id="Object-storage-compatibility-for-storagetypeminio" class="common-anchor-header">Совместимость с объектными хранилищами для <code translate="no">storage.type=minio</code><button data-href="#Object-storage-compatibility-for-storagetypeminio" class="anchor-icon" translate="no">
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
    </button></h2><p>В приведённой ниже таблице обобщена известная на данный момент совместимость бэкэндов объектного хранилища при настройке Woodpecker с использованием <code translate="no">storage.type=minio</code>. Эта информация основана на <a href="https://github.com/zilliztech/woodpecker/discussions/150">обсуждении № 150 на GitHub</a>.</p>
<table>
<thead>
<tr><th>Поставщик / сервис</th><th>Состояние</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td>Хранилище Azure Blob</td><td>Поддерживается</td><td>Использует собственный SDK для Azure.</td></tr>
<tr><td>AWS S3</td><td>Поддерживается</td><td>Нативная поддержка S3 с полной поддержкой условной записи.</td></tr>
<tr><td>MinIO (<code translate="no">&gt;= 2024-12</code>)</td><td>Поддерживается</td><td>Полная поддержка условной записи S3.</td></tr>
<tr><td>Aliyun OSS</td><td>Поддерживается</td><td>Поддерживается через интерфейс, совместимый с S3.</td></tr>
<tr><td>Tencent COS</td><td>Поддерживается</td><td>Поддерживается через интерфейс, совместимый с S3.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>Поддерживается</td><td>Поддерживается через режим взаимодействия с S3.</td></tr>
<tr><td>Huawei Cloud OBS</td><td>Не поддерживается</td><td>Отсутствует необходимая семантика условной записи.</td></tr>
<tr><td>VAST Data</td><td>Поддерживается</td><td>Проверено сообществом; работает только с бакетами без управления версиями.</td></tr>
<tr><td>Другие хранилища, совместимые с S3</td><td>Частично</td><td>Зависит от полной поддержки семантики условной записи S3.</td></tr>
</tbody>
</table>
<p>Примечания:</p>
<ul>
<li>Совместимость зависит от поддержки нативного SDK или поддержки семантики условной записи S3.</li>
<li>Если вы самостоятельно развертываете MinIO для Woodpecker, используйте версию <code translate="no">RELEASE.2024-12-18T13-15-44Z</code> или более позднюю.</li>
<li>Эта матрица отражает <a href="https://github.com/zilliztech/woodpecker/discussions/150">текущее состояние обсуждения</a> и может изменяться по мере дальнейшей проверки поддержки бэкэнда.</li>
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
    </button></h2><h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="common-anchor-header">Включение Woodpecker для кластера Milvus в Kubernetes (Milvus Operator, storage=minio)<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>После установки <a href="/docs/ru/install_cluster-milvusoperator.md">Milvus Operator</a> запустите кластер Milvus с включенным Woodpecker, используя официальный пример:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml

<button class="copy-code-btn"></button></code></pre>
<p>В этом примере Woodpecker настраивается в качестве очереди сообщений и включается узел потоковой передачи (Streaming Node). При первом запуске загрузка образов может занять некоторое время; подождите, пока все поды будут готовы:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
kubectl get milvus my-release -o yaml | grep -A2 status
<button class="copy-code-btn"></button></code></pre>
<p>Когда все будет готово, вы должны увидеть поды, похожие на следующие:</p>
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
<p>Если вам необходимо настроить параметры Woodpecker, следуйте инструкциям, описанным в разде <a href="#Configuration">ле «Настройка</a>».</p>
<h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="common-anchor-header">Включение Woodpecker для кластера Milvus в Kubernetes (Helm Chart, storage=minio)<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>Сначала добавьте и обновите диаграмму Helm для Milvus, как описано в разделе <a href="/docs/ru/install_cluster-helm.md">«Запуск Milvus в Kubernetes с помощью Helm</a>».</p>
<p>Затем выполните развертывание, воспользовавшись одним из следующих примеров:</p>
<p>– Развертывание кластера (рекомендуемые настройки с включенными Woodpecker и Streaming Node):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>– Автономное развертывание (с включенным Woodpecker):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>После развертывания следуйте инструкциям в документации для перенаправления портов и подключения. Чтобы настроить параметры Woodpecker, следуйте инструкциям, описанным в разделе <a href="#Configuration">«Конфигурация</a>».</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="common-anchor-header">Включение Woodpecker для автономной версии Milvus в Docker (storage=local)<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="anchor-icon" translate="no">
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
    </button></h3><p>В Milvus 3.x автономное развертывание в Docker <strong>по умолчанию</strong> использует Woodpecker с <strong>локальной файловой системой</strong> в качестве бэкэнда WAL — дополнительная настройка не требуется. Следуйте инструкциям из раздела <a href="/docs/ru/install_standalone-docker.md">«Запуск Milvus в Docker</a>»:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Для настройки Woodpecker отредактируйте сгенерированный файл ` <code translate="no">user.yaml</code> ` после первого запуска и выполните команду ` <code translate="no">bash standalone_embed.sh restart</code> `, чтобы применить изменения (при новом запуске ` <code translate="no">start</code> ` файл ` <code translate="no">user.yaml</code>` генерируется заново, поэтому примените изменения с помощью команды ` <code translate="no">restart</code>`):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">16</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="common-anchor-header">Включение Woodpecker для автономной версии Milvus с Docker Compose (storage=minio)<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>Следуйте инструкциям <a href="/docs/ru/install_standalone-docker-compose.md">по запуску Milvus с помощью Docker Compose</a>. Пример:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp-compose &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp-compose
wget https://github.com/milvus-io/milvus/releases/download/v3.0-beta/milvus-standalone-docker-compose.yml -O docker-compose.yml
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
<h3 id="Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="common-anchor-header">Включение режима службы Woodpecker для кластера Milvus (Helm)<button data-href="#Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Режим службы</strong> Woodpecker — это функция <strong>Milvus 3.0</strong>. Для распределенных/кластерных развертываний вы можете запускать Woodpecker в качестве <strong>выделенной службы</strong> (отдельные поды) вместо встраивания в узел потоковой передачи, установив <code translate="no">streaming.woodpecker.embedded=false</code>:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> woodpecker.image.tag=v0.1.33 \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.woodpecker.embedded=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>При этом Woodpecker развертывается в виде выделенного StatefulSet (<code translate="no">my-release-milvus-woodpecker</code>, по умолчанию 4 реплики), управляемого безголовым сервисом, с кластеризацией по алгоритму «gossip» на портах <code translate="no">18080</code> (сервис), <code translate="no">17946</code> (gossip) и <code translate="no">9091</code> (метрики), с MinIO в качестве бэкэнда хранилища. Сервису требуется кворум из <strong>3</strong> узлов; значение по умолчанию в <strong>4</strong> реплики обеспечивает кворум, допуская отказ одного узла, поэтому не устанавливайте значение параметра ` <code translate="no">woodpecker.replicaCount</code> ` ниже 3. В этом случае кластер включает отдельный набор под-контейнеров <code translate="no">woodpecker</code>:</p>
<pre><code translate="no"><span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">0</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">1</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">2</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Режим Woodpecker <code translate="no">service</code> предназначен только для <strong>распределенных/кластерных</strong> развертываний — в автономных развертываниях Woodpecker работает встроенным образом (<code translate="no">minio</code> или <code translate="no">local</code>). Milvus Operator пока не поддерживает режим службы Woodpecker.</p>
</div>
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
    </button></h2><p>Характеристики пропускной способности и задержки Woodpecker различаются в <strong>встроенном</strong> режиме и режиме <strong>службы</strong> (функция Milvus 3.0). Приведенные ниже рекомендации сгруппированы по режимам.</p>
<h3 id="Embedded-mode" class="common-anchor-header">Встроенный режим<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Основываясь на результатах тестов и ограничениях бэкэнда в <a href="/docs/ru/woodpecker_architecture.md">Woodpecker</a>, оптимизируйте сквозную пропускную способность записи, учитывая следующие аспекты:</p>
<ul>
<li>Со стороны хранилища
<ul>
<li><strong>Объектное хранилище (совместимое с MinIO/S3)</strong>: увеличьте количество одновременных операций и размер объектов (избегайте очень маленьких объектов). Следите за ограничениями пропускной способности сети и корзины. Один узел MinIO на SSD часто ограничивается скоростью около 100 МБ/с локально; один EC2, подключенный к S3, может достигать скорости в гигабайтах в секунду.</li>
<li><strong>Локальные/общие файловые системы (локальные)</strong>: отдавайте предпочтение NVMe или быстрым дискам. Убедитесь, что файловая система хорошо обрабатывает мелкие записи и имеет низкую задержку fsync.</li>
</ul></li>
<li>Параметры Woodpecker
<ul>
<li>Увеличьте значения параметров ` <code translate="no">logstore.segmentSyncPolicy.maxFlushSize</code> ` и ` <code translate="no">maxFlushThreads</code> ` для более крупных операций сброса и более высокой степень параллелизма.</li>
<li>Настройте параметр <code translate="no">maxInterval</code> в соответствии с характеристиками носителя (пожертвуйте задержкой ради пропускной способности за счет более длительной агрегации).</li>
<li>Для объектного хранилища рассмотрите возможность увеличения значения <code translate="no">segmentRollingPolicy.maxSize</code>, чтобы сократить количество переключений сегментов.</li>
</ul></li>
<li>Со стороны клиента/приложения
<ul>
<li>Используйте пакеты большего размера и большее количество одновременно записывающих клиентов.</li>
<li>Контролируйте время обновления/построения индекса (соберите пакеты перед запуском), чтобы избежать частых мелких записей.</li>
</ul></li>
</ul>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">Режим службы (Milvus 3.0+)<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>Режим службы сохраняет высокую пропускную способность записи WAL, опирающегося на объектное хранилище, одновременно обеспечивая низкую задержку (см. <a href="#Latency">раздел «Задержка»</a>). Вышеуказанная настройка со стороны хранилища и со стороны клиента по-прежнему применима; кроме того, поскольку Woodpecker работает как отдельный сервис, вы можете горизонтально масштабировать пропускную способность записи, добавляя реплики (<code translate="no">woodpecker.replicaCount</code>, по умолчанию 4), а записи получают преимущества от кворумной репликации с одним RTT и чтения с учетом топологии, что позволяет избежать пересылки через брокер.</p>
<p><strong>Демонстрация пакетной вставки</strong> — используйте следующее для измерения пропускной способности записи:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://&lt;Proxy Pod IP&gt;:19530&quot;</span>,
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
<h2 id="Latency" class="common-anchor-header">Задержка<button data-href="#Latency" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Embedded-mode" class="common-anchor-header">Встроенный режим<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Woodpecker — это облачный WAL, разработанный для объектного хранилища с компромиссами между пропускной способностью, стоимостью и задержкой. Легкий встроенный режим ставит во главу угла оптимизацию стоимости и пропускной способности, поскольку в большинстве сценариев требуется лишь запись данных в течение определённого времени, а не низкая задержка для отдельных запросов на запись. Поэтому Woodpecker использует пакетную запись с интервалами по умолчанию 10 мс для бэкэндов хранения на основе локальной файловой системы и 200 мс для бэкэндов хранения типа MinIO. Во время медленных операций записи максимальная задержка равна времени интервала плюс время сброса.</p>
<p>Обратите внимание, что пакетная запись запускается не только по временным интервалам, но и по размеру пакета, который по умолчанию составляет 2 МБ.</p>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">Режим «Service» (Milvus 3.0+)<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>Режим обслуживания обеспечивает <strong>задержку записи на уровне миллисекунд</strong> — того же порядка, что и у традиционного WAL с тремя репликами на локальном диске — при низких затратах. В типичном развертывании с тремя репликами, распределенном между зонами (AZ), задержка записи остается в диапазоне миллисекунд. Это достигается за счет:</p>
<ul>
<li><strong>Записи с кворумом за один RTT</strong> — репликация, управляемая клиентом, завершает запись с кворумом за один цикл обмена данными, при этом трафик между зонами обслуживания фиксирован на уровне объема данных двух реплик (по сравнению с дополнительным трафиком между зонами обслуживания, составляющим примерно 1/3, характерным для репликации на основе брокера или лидера).</li>
<li><strong>Чтение с одним прыжком с учётом топологии</strong> — каждое чтение направляется непосредственно на ближайшую реплику, а не пересылается через брокер, что позволяет избежать случайных чтений между зонами (≈2/3 трафика чтения между зонами), характерных для систем на основе брокера.</li>
<li><strong>Немедленная загрузка в объектное хранилище после смены сегмента</strong> — каждый сегмент отслеживает весь свой жизненный цикл и загружается в объектное хранилище сразу после смены, что позволяет снизить занимаемое место на локальном диске и затраты на хранение без ухудшения задержки.</li>
<li><strong>Отсутствие непрерывной репликации между узлами</strong> — журналы сохраняются в объектном хранилище, выступающем в качестве общего хранилища, поэтому при отработке отказа повторно загружаются только уцелевшие реплики (без копирования всего узла), масштабирование не ограничивается пропускной способностью межузловой репликации, а замена большого количества узлов не вызывает «штормов» репликации.</li>
</ul>
<p>В развертываниях с пересечением зон доступности (AZ) режим службы также позволяет сэкономить примерно <strong>1/3</strong> сетевого трафика <strong>записи</strong> и <strong>2/3 трафика чтения</strong> между зонами доступности по сравнению с системами журналов на основе брокера. Полный анализ архитектуры и затрат см. в разделе <a href="/docs/ru/woodpecker_architecture.md">«Архитектура Woodpecker</a>».</p>
<p>Подробности об архитектуре, режимах развертывания (MemoryBuffer / QuorumBuffer) и производительности см. в разделе <a href="/docs/ru/woodpecker_architecture.md">«Архитектура Woodpecker</a>».</p>
<p>Более подробную информацию о параметрах см. в <a href="https://github.com/zilliztech/woodpecker">репозитории</a> Woodpecker <a href="https://github.com/zilliztech/woodpecker">на GitHub</a>.</p>
