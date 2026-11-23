---
id: configure-docker.md
label: Docker Compose
related_key: configure
summary: Настройте Milvus с помощью Docker Compose.
title: Настройка Milvus с помощью Docker Compose
---
<h1 id="Configure-Milvus-with-Docker-Compose" class="common-anchor-header">Настройка Milvus с помощью Docker Compose<button data-href="#Configure-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом разделе описано, как настроить компоненты Milvus и его сторонние зависимости с помощью Docker Compose.</p>
<div class="alert note">
Некоторые параметры можно изменять во время работы Milvus. Подробнее см. в разделе <a href="/docs/ru/dynamic_config.md">«Настройка Milvus на лету</a>». Чтобы применить изменения к другим параметрам, перезапустите Milvus.
</div>
<h2 id="Download-a-configuration-file" class="common-anchor-header">Загрузите файл конфигурации<button data-href="#Download-a-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/configs/milvus.yaml">Загрузите</a> файл « <code translate="no">milvus.yaml</code> » напрямую или с помощью следующей команды.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/configs/milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Modify-the-configuration-file" class="common-anchor-header">Измените файл конфигурации<button data-href="#Modify-the-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Настройте экземпляр Milvus в соответствии с вашими сценариями применения в файле ` <code translate="no">user.yaml</code> `. Добавляйте только те параметры, которые хотите изменить, и используйте загруженный файл ` <code translate="no">milvus.yaml</code> ` в качестве справочника для их имен и значений по умолчанию. Milvus считывает файл ` <code translate="no">user.yaml</code> ` после файла ` <code translate="no">milvus.yaml</code>`, поэтому значения в файле ` <code translate="no">user.yaml</code> ` переопределяют значения по умолчанию. В следующем примере изменяется уровень ведения журнала:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">log:</span>
  <span class="hljs-attr">level:</span> <span class="hljs-string">warn</span>
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительную информацию о каждом параметре см. по следующим ссылкам.</p>
<p>Сортировано по:</p>
<div class="filter">
<a href="#component">Компоненты или зависимости</a> <a href="#purpose">Цели настройки</a> 
</div>
<div class="filter-component table-wrapper">
<table id="component">
<thead>
  <tr>
    <th>Зависимости</th>
    <th>Компоненты</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
        <ul>
            <li><a href="/docs/ru/configure_etcd.md">etcd</a></li>
            <li><a href="/docs/ru/configure_minio.md">MinIO или S3</a></li>
            <li><a href="/docs/ru/configure_pulsar.md">Pulsar</a></li>
            <li><a href="/docs/ru/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/ru/configure_rootcoord.md">Координатная система Root</a></li>
            <li><a href="/docs/ru/configure_proxy.md">Прокси</a></li>
            <li><a href="/docs/ru/configure_querycoord.md">Координат запроса</a></li>
            <li><a href="/docs/ru/configure_querynode.md">Узел запроса</a></li>
            <li><a href="/docs/ru/configure_indexnode.md">Узел индекса (устаревший)</a></li>
            <li><a href="/docs/ru/configure_datacoord.md">Координаты данных</a></li>
            <li><a href="/docs/ru/configure_datanode.md">Узел данных</a></li>
            <li><a href="/docs/ru/configure_localstorage.md">Локальное хранилище</a></li>
            <li><a href="/docs/ru/configure_log.md">Журнал</a></li>
            <li><a href="/docs/ru/configure_msgchannel.md">Канал сообщений</a></li>
            <li><a href="/docs/ru/configure_common.md">Общие</a></li>
            <li><a href="/docs/ru/configure_gpu.md">GPU</a></li>
            <li><a href="/docs/ru/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/ru/configure_indexcoord.md">Координаты индекса (устаревшее)</a></li>
            <li><a href="/docs/ru/configure_metastore.md">Метахранилище</a></li>
            <li><a href="/docs/ru/configure_mq.md">Очередь сообщений</a></li>
            <li><a href="/docs/ru/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/ru/configure_trace.md">Трейс</a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md">Квоты и ограничения</a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-purpose table-wrapper">
<table id="purpose">
<thead>
  <tr>
    <th>Назначение</th>
    <th>Параметры</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Настройка производительности</td>
    <td>
        <ul>
            <li><a href="/docs/ru/configure_common.md#commongracefulTime"><code translate="no">common.gracefulTime</code></a></li>
            <li><a href="/docs/ru/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/ru/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/ru/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/ru/configure_datanode.md#dataNodesegmentinsertBufSize"><code translate="no">dataNode.segment.insertBufSize</code></a></li>
            <li><a href="/docs/ru/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/ru/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Данные и метаданные</td>
    <td>
        <ul>
            <li><a href="/docs/ru/configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/ru/configure_datacoord.md#dataCoordenableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/ru/configure_datacoord.md#dataCoordenableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/ru/configure_datacoord.md#dataCoordgcdropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Администрирование</td>
    <td>
        <ul>
            <li><a href="/docs/ru/configure_log.md#loglevel"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/ru/configure_log.md#logfilerootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/ru/configure_log.md#logfilemaxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/ru/configure_minio.md#minioaccessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/ru/configure_minio.md#miniosecretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Квоты и ограничения</td>
    <td>
        <ul>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsflushRatemax"><code translate="no">quotaAndLimits.flushRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitscompactionRateenabled"><code translate="no">quotaAndLimits.compactionRate.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitscompactionRatemax"><code translate="no">quotaAndLimits.compactionRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<h2 id="Download-an-installation-file" class="common-anchor-header">Скачать установочный файл<button data-href="#Download-an-installation-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Загрузите установочный файл <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml">автономной</a> версии Milvus и сохраните его как « <code translate="no">docker-compose.yml</code> ».</p>
<p>Вы также можете просто выполнить следующую команду.</p>
<pre><code translate="no"><span class="hljs-meta prompt_"># </span><span class="language-bash">For Milvus standalone</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Modify-the-installation-file" class="common-anchor-header">Изменение установочного файла<button data-href="#Modify-the-installation-file" class="anchor-icon" translate="no">
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
    </button></h2><p>В файле ` <code translate="no">docker-compose.yml</code>` сопоставьте локальный путь к вашему файлу ` <code translate="no">user.yaml</code> ` с ` <code translate="no">/milvus/configs/user.yaml</code> ` в разделе ` <code translate="no">volumes</code> ` службы ` <code translate="no">standalone</code> `. Сохраните существующие записи о томах и другие настройки службы, такие как образ, переменные среды, проверка работоспособности и зависимости:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/local/path/to/your/user.yaml:/milvus/configs/user.yaml</span>   <span class="hljs-comment"># Map the local path to the container path</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Данные хранятся в папке <code translate="no">./volumes</code> в соответствии с конфигурацией по умолчанию, указанной в файле <code translate="no">docker-compose.yml</code>. Чтобы изменить папку для хранения данных, отредактируйте файл <code translate="no">docker-compose.yml</code> или запустите команду <code translate="no">$ export DOCKER_VOLUME_DIRECTORY=</code>.
</div>
<h2 id="Start-Milvus" class="common-anchor-header">Запуск Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Завершив изменение файла конфигурации и установочного файла, вы можете запустить Milvus.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
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
    </button></h2><ul>
<li>Узнайте, как управлять следующими зависимостями Milvus с помощью Docker Compose или Helm:
<ul>
<li><a href="/docs/ru/deploy_s3.md">Настройка объектного хранилища с помощью Docker Compose или Helm</a></li>
<li><a href="/docs/ru/deploy_etcd.md">Настройте хранилище метаданных с помощью Docker Compose или Helm</a></li>
<li><a href="/docs/ru/deploy_pulsar.md">Настройка хранилища сообщений с помощью Docker Compose или Helm</a></li>
</ul></li>
</ul>
