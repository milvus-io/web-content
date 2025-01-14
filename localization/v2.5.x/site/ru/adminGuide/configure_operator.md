---
id: configure_operator.md
label: Milvus Operator
related_key: Milvus Operator
summary: 'Узнайте, как настроить Milvus с помощью Milvus Operator.'
title: Настройка Milvus с помощью Milvus Operator
---
<h1 id="Configure-Milvus-with-Milvus-Operator" class="common-anchor-header">Настройка Milvus с помощью Milvus Operator<button data-href="#Configure-Milvus-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>В производственной среде вам необходимо распределить ресурсы между кластером Milvus в зависимости от типа машины и рабочей нагрузки. Вы можете настроить конфигурацию во время развертывания или обновить ее во время работы кластера.</p>
<p>В этой теме рассказывается о том, как настроить кластер Milvus при его установке с помощью Milvus Operator.</p>
<p>В этой теме предполагается, что вы развернули Milvus Operator. Дополнительные сведения см. в разделе <a href="/docs/ru/install_cluster-milvusoperator.md">Развертывание Milvus Operator</a>.</p>
<p>Настройка кластера Milvus с помощью Milvus Operator включает в себя:</p>
<ul>
<li>Глобальные конфигурации ресурсов</li>
<li>Конфигурации частных ресурсов</li>
</ul>
<div class="alert note">
Конфигурации частных ресурсов будут перезаписывать конфигурации глобальных ресурсов. Если вы настроите ресурсы глобально и одновременно укажете частный ресурс определенного компонента, компонент будет отдавать приоритет и отвечать на частные конфигурации в первую очередь.</div>
<h2 id="Configure-global-resources" class="common-anchor-header">Настройка глобальных ресурсов<button data-href="#Configure-global-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>При использовании Milvus Operator для запуска кластера Milvus необходимо указать файл конфигурации. В приведенном здесь примере используется файл конфигурации по умолчанию.</p>
<pre><code translate="no" class="language-yaml">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Детали конфигурационного файла приведены ниже:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  dependencies: {}
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p>Поле <code translate="no">spec.components</code> включает в себя как глобальную, так и частную конфигурацию ресурсов всех компонентов Milvus. Ниже перечислены четыре часто используемых поля для настройки глобального ресурса.</p>
<ul>
<li><code translate="no">image</code>: Используемый образ Milvus docker.</li>
<li><code translate="no">resources</code>: Вычислительные ресурсы, выделенные каждому компоненту.</li>
<li><code translate="no">tolerations</code> и <code translate="no">nodeSelector</code>: Правила планирования для каждого компонента Milvus в кластере K8s. Дополнительные сведения см. в разделах <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/">"Допуски"</a> и <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/">"Селектор узла"</a>.</li>
<li><code translate="no">env</code>: Переменные окружения.</li>
</ul>
<p>Если вы хотите настроить дополнительные поля, см. документацию <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#ComponentSpec">здесь</a>.</p>
<p>Чтобы настроить глобальный ресурс для кластера Milvus, создайте файл <code translate="no">milvuscluster_resource.yaml</code>.</p>
<h3 id="Example" class="common-anchor-header">Пример</h3><p>В следующем примере настраивается глобальный ресурс для кластера Milvus.</p>
<pre><code translate="no">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  components:
    nodeSelector: {}
    tolerations: {}
    <span class="hljs-built_in">env</span>: {}
    resources:
      limits:
        cpu: <span class="hljs-string">&#x27;4&#x27;</span>
        memory: 8Gi
      requests:
        cpu: 200m
        memory: 512Mi
<button class="copy-code-btn"></button></code></pre>
<p>Выполните следующую команду, чтобы применить новые конфигурации:</p>
<pre><code translate="no">kubectl apply -f milvuscluster_resource.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Ресурсы кластера будут обновлены в соответствии с файлом конфигурации, если в кластере K8s есть кластер Milvus с именем <code translate="no">my-release</code>. В противном случае будет создан новый кластер Milvus.</div>
<h2 id="Configure-private-resources" class="common-anchor-header">Настройка частных ресурсов<button data-href="#Configure-private-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Первоначально в Milvus 2.0 кластер Milvus включал семь компонентов: прокси, корневой коорд, коорд данных, коорд запросов, индексный узел, узел данных и узел запросов. Однако вместе с Milvus 2.1.0 был выпущен новый компонент, mix coord. Mix coord включает в себя все компоненты координатора. Поэтому запуск mix coord означает, что вам не нужно устанавливать и запускать другие координаторы, включая root coord, data coord и query coord.</p>
<p>Общие поля, используемые для настройки каждого компонента, включают:</p>
<ul>
<li><code translate="no">replica</code>: : Количество реплик каждого компонента.</li>
<li><code translate="no">port</code>: : Номер порта прослушивания каждого компонента.</li>
<li>Четыре часто используемых поля в глобальной конфигурации ресурсов: <code translate="no">image</code>, <code translate="no">env</code>, <code translate="no">nodeSelector</code>, <code translate="no">tolerations</code>, <code translate="no">resources</code> (см. выше). Чтобы узнать больше настраиваемых полей, щелкните на каждом компоненте в <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#MilvusComponents">этой документации</a>.</li>
</ul>
<div class="alert note">
Кроме того, при настройке прокси есть дополнительное поле `serviceType`. Это поле определяет тип сервиса, который Milvus предоставляет в кластере K8s.</div>
<p>Чтобы настроить ресурсы для конкретного компонента, сначала добавьте имя компонента в поле <code translate="no">spec.componets</code>, а затем настройте его личные ресурсы.</p>
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
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitsmaxCollectionNumPerDB"><code translate="no">quotaAndLimits.limits.maxCollectionNumPerDB</code></a></li>
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
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatecollectionmax"><code translate="no">quotaAndLimits.dml.insertRate.collection.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatecollectionmax"><code translate="no">quotaAndLimits.dml.deleteRate.collection.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatecollectionmax"><code translate="no">quotaAndLimits.dql.searchRate.collection.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatecollectionmax"><code translate="no">quotaAndLimits.dql.queryRate.collection.max</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/ru/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerCollection"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection</code></a></li>
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
<h3 id="Example" class="common-anchor-header">Пример</h3><p>В приведенном ниже примере в файле <code translate="no">milvuscluster.yaml</code> настраиваются реплики и вычислительные ресурсы прокси и датанода.</p>
<pre><code translate="no">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  components:
    resources:
      limits:
        cpu: <span class="hljs-string">&#x27;4&#x27;</span>
        memory: 8Gi
      requests:
        cpu: 200m
        memory: 512Mi
    rootCoord: 
      replicas: 1
      port: 8080
      resources:
        limits:
          cpu: <span class="hljs-string">&#x27;6&#x27;</span>
          memory: <span class="hljs-string">&#x27;10Gi&#x27;</span>
    dataCoord: {}
    queryCoord: {}
    indexCoord: {}
    dataNode: {}
    indexNode: {}
    queryNode: {}
    proxy:
      replicas: 1
      serviceType: ClusterIP
      resources:
        limits:
          cpu: <span class="hljs-string">&#x27;2&#x27;</span>
          memory: 4Gi
        requests:
          cpu: 100m
          memory: 128Mi
  config: {}
  dependencies: {}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
В этом примере настраиваются не только глобальные ресурсы, но и частные вычислительные ресурсы для root coord и proxy. При использовании этого файла конфигурации для запуска кластера Milvus конфигурация частных ресурсов будет применена к root coord и proxy, в то время как остальные компоненты будут следовать конфигурации глобальных ресурсов.</div>
<p>Выполните следующую команду, чтобы применить новые конфигурации:</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
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
<li>Узнайте, как управлять следующими зависимостями Milvus с помощью Milvus Operator:<ul>
<li><a href="/docs/ru/object_storage_operator.md">Настройка объектного хранилища с помощью Milvus Operator</a></li>
<li><a href="/docs/ru/meta_storage_operator.md">Настройка метахранилища с помощью Milvus Operator</a></li>
<li><a href="/docs/ru/message_storage_operator.md">Настройка хранилища сообщений с помощью Milvus Operator</a></li>
</ul></li>
</ul>
