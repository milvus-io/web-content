---
id: configure-helm.md
label: Helm
related_key: configure
summary: Настройте Milvus с помощью Helm Charts.
title: Настройка Milvus с помощью Helm Charts
---
<h1 id="Configure-Milvus-with-Helm-Charts" class="common-anchor-header">Настройка Milvus с помощью Helm Charts<button data-href="#Configure-Milvus-with-Helm-Charts" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается настройка компонентов Milvus и его сторонних зависимостей с помощью Helm Charts.</p>
<div class="alert note">
В текущем выпуске все параметры вступают в силу только после перезапуска Milvus.</div>
<h2 id="Configure-Milvus-via-configuration-file" class="common-anchor-header">Настройка Milvus через файл конфигурации<button data-href="#Configure-Milvus-via-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете настроить Milvus с помощью файла конфигурации <code translate="no">values.yaml</code>.</p>
<h3 id="Download-a-configuration-file" class="common-anchor-header">Загрузить файл конфигурации</h3><p><a href="https://raw.githubusercontent.com/zilliztech/milvus-helm/master/charts/milvus/values.yaml">Загрузите файл</a> <code translate="no">values.yaml</code> напрямую или с помощью следующей команды.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>wget <span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/raw.githubusercontent.com/milvus</span>-io/milvus-helm/master/charts/milvus/values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Modify-the-configuration-file" class="common-anchor-header">Изменение файла конфигурации</h3><p>Настройте экземпляр Milvus в соответствии с вашими сценариями применения, изменив соответствующие параметры в файле <code translate="no">values.yaml</code>.</p>
<p>В частности, найдите <code translate="no">extraConfigFiles</code> в <code translate="no">values.yaml</code> и поместите свои конфигурации в этот раздел следующим образом:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Extra configs for milvus.yaml</span>
<span class="hljs-comment"># If set, this config will merge into milvus.yaml</span>
<span class="hljs-comment"># Please follow the config structure in the milvus.yaml</span>
<span class="hljs-comment"># at https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml</span>
<span class="hljs-comment"># <span class="hljs-doctag">Note:</span> this config will be the top priority which will override the config</span>
<span class="hljs-comment"># in the image and helm chart.</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    #    For example to set the graceful time for query nodes
    #    queryNodes:
    #      gracefulTime: 10
</span><button class="copy-code-btn"></button></code></pre>
<p>Дополнительные сведения о каждом параметре см. в следующих ссылках.</p>
<p>Отсортировано по:</p>
<div class="filter">
<a href="#component">Компоненты или зависимости</a> <a href="#purpose">Цели конфигурации</a> </div>
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
            <li><a href="/docs/ru/configure_rootcoord.md">Корневой коорд</a></li>
            <li><a href="/docs/ru/configure_proxy.md">Прокси</a></li>
            <li><a href="/docs/ru/configure_querycoord.md">Координата запроса</a></li>
            <li><a href="/docs/ru/configure_querynode.md">Узел запроса</a></li>
            <li><a href="/docs/ru/configure_indexnode.md">Индексный узел</a></li>
            <li><a href="/docs/ru/configure_datacoord.md">Коорд данных</a></li>
            <li><a href="/docs/ru/configure_datanode.md">Узел данных</a></li>
            <li><a href="/docs/ru/configure_localstorage.md">Локальное хранилище</a></li>
            <li><a href="/docs/ru/configure_log.md">Журнал</a></li>
            <li><a href="/docs/ru/configure_msgchannel.md">Канал сообщений</a></li>
            <li><a href="/docs/ru/configure_common.md">Общий</a></li>
            <li><a href="/docs/ru/configure_gpu.md">GPU</a></li>
            <li><a href="/docs/ru/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/ru/configure_indexcoord.md">Индексный коорд</a></li>
            <li><a href="/docs/ru/configure_metastore.md">Метахранилище</a></li>
            <li><a href="/docs/ru/configure_mq.md">Очередь сообщений</a></li>
            <li><a href="/docs/ru/configure_natsmq.md">Natsmq</a></li>
            <li><a href="/docs/ru/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/ru/configure_trace.md">Трассировка</a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md">Квоты и лимиты</a></li>
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
            <li><a href="/docs/ru/configure_querynode.md#queryNodegracefulTime"><code translate="no">queryNode.gracefulTime</code></a></li>
            <li><a href="/docs/ru/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/ru/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/ru/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/ru/configure_datanode.md#dataNodeflushinsertBufSize"><code translate="no">dataNode.flush.insertBufSize</code></a></li>
            <li><a href="/docs/ru/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/ru/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
            <li><a href="/docs/ru/configure_localstorage.md#localStorageenabled"><code translate="no">localStorage.enabled</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Данные и метаданные</td>
    <td>
        <ul>
            <li><a href="/docs/ru/configure_common.md#commonretentionDuration"><code translate="no">common.retentionDuration</code></a></li>
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
    <td>Квоты и лимиты</td>
    <td>
        <ul>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsflushmax"><code translate="no">quotaAndLimits.flush.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitscompationenabled"><code translate="no">quotaAndLimits.compation.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitscompactionmax"><code translate="no">quotaAndLimits.compaction.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionenabled"><code translate="no">quotaAndLimits.limitReading.queueProtection.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionnqInQueueThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionqueueLatencyThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionenabled"><code translate="no">quotaAndLimits.limitReading.resultProtection.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionmaxReadResultRate"><code translate="no">quotaAndLimits.limitReading.resultProtection.maxReadResultRate</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<p>Другие параметры, специфичные для установки Kubernetes, см. в разделе <a href="https://github.com/milvus-io/milvus-helm/tree/master/charts/milvus#configuration">Конфигурация Milvus Helm Chart</a>.</p>
<h3 id="Start-Milvus" class="common-anchor-header">Запуск Milvus</h3><p>Закончив модификацию файла конфигурации, вы можете запустить Milvus с помощью этого файла.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release milvus/milvus -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Milvus-via-command-line" class="common-anchor-header">Настройка Milvus через командную строку<button data-href="#Configure-Milvus-via-command-line" class="anchor-icon" translate="no">
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
    </button></h2><p>Кроме того, вы можете обновить конфигурацию Milvus непосредственно с помощью команды Helm.</p>
<h3 id="Check-the-configurable-parameters" class="common-anchor-header">Проверка настраиваемых параметров</h3><p>Перед обновлением можно проверить настраиваемые параметры с помощью диаграмм Helm.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm show values milvus/milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Start-Milvus" class="common-anchor-header">Запуск Milvus</h3><p>Настройте и запустите Milvus, добавив <code translate="no">--values</code> или <code translate="no">--set</code> в команду обновления.</p>
<pre><code translate="no"><span class="hljs-meta prompt_"># </span><span class="language-bash">For instance, upgrade the Milvus cluster with compaction disabled</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> dataCoord.enableCompaction=<span class="hljs-literal">false</span></span>
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
<li><p>Если вы хотите узнать, как отслеживать службы Milvus и создавать оповещения:</p>
<ul>
<li>Узнайте о <a href="/docs/ru/monitor.md">мониторинге Milvus с помощью Prometheus Operator на Kubernetes</a>.</li>
<li><a href="/docs/ru/visualize.md">Визуализация метрик Milvus в Grafana</a>.</li>
</ul></li>
<li><p>Если вы ищете инструкции по выделению ресурсов:</p>
<ul>
<li><a href="/docs/ru/allocate.md#standalone">Распределение ресурсов на Kubernetes</a></li>
</ul></li>
</ul>
