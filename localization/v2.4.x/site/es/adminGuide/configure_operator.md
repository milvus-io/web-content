---
id: configure_operator.md
label: Milvus Operator
related_key: Milvus Operator
summary: Aprenda a configurar Milvus con Milvus Operator.
title: Configurar Milvus con Milvus Operator
---
<h1 id="Configure-Milvus-with-Milvus-Operator" class="common-anchor-header">Configurar Milvus con Milvus Operator<button data-href="#Configure-Milvus-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>En un entorno de producción, necesita asignar recursos al cluster Milvus basándose en el tipo de máquina y la carga de trabajo. Puede configurar durante el despliegue o actualizar las configuraciones mientras el cluster está funcionando.</p>
<p>Este tema presenta cómo configurar un cluster Milvus cuando lo instala con Milvus Operator.</p>
<p>Este tema asume que usted ha desplegado Milvus Operator. Consulte <a href="/docs/es/v2.4.x/install_cluster-milvusoperator.md">Despliegue de Milvus Operator</a> para obtener más información.</p>
<p>La configuración de un cluster Milvus con Milvus Operator incluye:</p>
<ul>
<li>Configuraciones de recursos globales</li>
<li>Configuraciones de recursos privados</li>
</ul>
<div class="alert note">
Las configuraciones de recursos privados sobrescribirán las configuraciones de recursos globales. Si configura los recursos globalmente y especifica el recurso privado de un determinado componente al mismo tiempo, el componente priorizará y responderá primero a las configuraciones privadas.</div>
<h2 id="Configure-global-resources" class="common-anchor-header">Configurar recursos globales<button data-href="#Configure-global-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Cuando utilice Milvus Operator para iniciar un cluster Milvus, necesita especificar un archivo de configuración. En este ejemplo se utiliza el archivo de configuración predeterminado.</p>
<pre><code translate="no" class="language-yaml">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Los detalles del archivo de configuración son los siguientes:</p>
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
<p>El campo <code translate="no">spec.components</code> incluye la configuración tanto global como privada de los recursos de todos los componentes de Milvus. Los siguientes son cuatro campos comúnmente utilizados para configurar el recurso global.</p>
<ul>
<li><code translate="no">image</code>: La imagen docker de Milvus utilizada.</li>
<li><code translate="no">resources</code>: Los recursos de computación asignados a cada componente.</li>
<li><code translate="no">tolerations</code> y <code translate="no">nodeSelector</code>: Las reglas de programación de cada componente Milvus en el clúster K8s. Ver <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/">tolerations</a> y <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/">nodeSelector</a> para más información.</li>
<li><code translate="no">env</code>: Las variables de entorno.</li>
</ul>
<p>Si desea configurar más campos, consulte la documentación <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#ComponentSpec">aquí</a>.</p>
<p>Para configurar el recurso global para el cluster Milvus, cree un archivo <code translate="no">milvuscluster_resource.yaml</code>.</p>
<h3 id="Example" class="common-anchor-header">Ejemplo</h3><p>El siguiente ejemplo configura los recursos globales para un cluster Milvus.</p>
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
<p>Ejecute el siguiente comando para aplicar las nuevas configuraciones:</p>
<pre><code translate="no">kubectl apply -f milvuscluster_resource.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Los recursos del clúster se actualizarán de acuerdo con el archivo de configuración si existe un clúster Milvus denominado <code translate="no">my-release</code> en el clúster K8s. En caso contrario, se creará un nuevo cluster Milvus.</div>
<h2 id="Configure-private-resources" class="common-anchor-header">Configurar recursos privados<button data-href="#Configure-private-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Originalmente en Milvus 2.0, un cluster Milvus incluye siete componentes: proxy, root coord, data coord, query coord, index node, data node, y query node. Sin embargo, un nuevo componente, mix coord, se lanza junto con Milvus 2.1.0. Mix coord incluye todos los componentes del coordinador. Por lo tanto, iniciar un mix coord significa que no necesita instalar e iniciar otros coordinadores incluyendo root coord, data coord y query coord.</p>
<p>Los campos comunes utilizados para configurar cada componente incluyen:</p>
<ul>
<li><code translate="no">replica</code>: El número de réplicas de cada componente.</li>
<li><code translate="no">port</code>: El número de puerto de escucha de cada componente.</li>
<li>Los cuatro campos comúnmente utilizados en la configuración global de recursos: <code translate="no">image</code>, <code translate="no">env</code>, <code translate="no">nodeSelector</code>, <code translate="no">tolerations</code>, <code translate="no">resources</code> (véase más arriba). Para ver más campos configurables, haga clic en cada componente de <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#MilvusComponents">esta documentación</a>.</li>
</ul>
<div class="alert note">
Además, al configurar el proxy, hay un campo extra llamado `serviceType`. Este campo define el tipo de servicio que Milvus proporciona en el cluster K8s.</div>
<p>Para configurar recursos para un componente específico, añada primero el nombre del componente en el campo bajo <code translate="no">spec.componets</code> y luego configure sus recursos privados.</p>
<div class="filter">
<a href="#component">Componentes o dependencias</a> <a href="#purpose">Propósitos de la configuración</a> </div>
<div class="filter-component table-wrapper">
<table id="component">
<thead>
  <tr>
    <th>Dependencias</th>
    <th>Componentes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
        <ul>
            <li><a href="/docs/es/v2.4.x/configure_etcd.md">etcd</a></li>
            <li><a href="/docs/es/v2.4.x/configure_minio.md">MinIO o S3</a></li>
            <li><a href="/docs/es/v2.4.x/configure_pulsar.md">Pulsar</a></li>
            <li><a href="/docs/es/v2.4.x/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/es/v2.4.x/configure_rootcoord.md">Coordenada raíz</a></li>
            <li><a href="/docs/es/v2.4.x/configure_proxy.md">Proxy</a></li>
            <li><a href="/docs/es/v2.4.x/configure_querycoord.md">Coordenada de consulta</a></li>
            <li><a href="/docs/es/v2.4.x/configure_querynode.md">Nodo de consulta</a></li>
            <li><a href="/docs/es/v2.4.x/configure_indexnode.md">Nodo índice</a></li>
            <li><a href="/docs/es/v2.4.x/configure_datacoord.md">Coordenada de datos</a></li>
            <li><a href="/docs/es/v2.4.x/configure_datanode.md">Nodo de datos</a></li>
            <li><a href="/docs/es/v2.4.x/configure_localstorage.md">Almacenamiento local</a></li>
            <li><a href="/docs/es/v2.4.x/configure_log.md">Registro</a></li>
            <li><a href="/docs/es/v2.4.x/configure_msgchannel.md">Canal de mensajes</a></li>
            <li><a href="/docs/es/v2.4.x/configure_common.md">Común</a></li>
            <li><a href="/docs/es/v2.4.x/configure_gpu.md">GPU</a></li>
            <li><a href="/docs/es/v2.4.x/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/es/v2.4.x/configure_indexcoord.md">Índice de coordenadas</a></li>
            <li><a href="/docs/es/v2.4.x/configure_metastore.md">Metastore</a></li>
            <li><a href="/docs/es/v2.4.x/configure_mq.md">Cola de mensajes</a></li>
            <li><a href="/docs/es/v2.4.x/configure_natsmq.md">Natsmq</a></li>
            <li><a href="/docs/es/v2.4.x/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/es/v2.4.x/configure_trace.md">Rastreo</a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md">Cuotas y límites</a></li>
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
    <th>Propósito</th>
    <th>Parámetros</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Ajuste del rendimiento</td>
    <td>
        <ul>
            <li><a href="/docs/es/v2.4.x/configure_querynode.md#queryNodegracefulTime"><code translate="no">queryNode.gracefulTime</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_datanode.md#dataNodeflushinsertBufSize"><code translate="no">dataNode.flush.insertBufSize</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_localstorage.md#localStorageenabled"><code translate="no">localStorage.enabled</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Datos y meta</td>
    <td>
        <ul>
            <li><a href="/docs/es/v2.4.x/configure_common.md#commonretentionDuration"><code translate="no">common.retentionDuration</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_datacoord.md#dataCoordenableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_datacoord.md#dataCoordenableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_datacoord.md#dataCoordgcdropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Administración</td>
    <td>
        <ul>
            <li><a href="/docs/es/v2.4.x/configure_log.md#loglevel"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_log.md#logfilerootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_log.md#logfilemaxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_minio.md#minioaccessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_minio.md#miniosecretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Cuotas y límites</td>
    <td>
        <ul>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitsmaxCollectionNumPerDB"><code translate="no">quotaAndLimits.limits.maxCollectionNumPerDB</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushmax"><code translate="no">quotaAndLimits.flush.max</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompationenabled"><code translate="no">quotaAndLimits.compation.enabled</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompactionmax"><code translate="no">quotaAndLimits.compaction.max</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatecollectionmax"><code translate="no">quotaAndLimits.dml.insertRate.collection.max</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatecollectionmax"><code translate="no">quotaAndLimits.dml.deleteRate.collection.max</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatecollectionmax"><code translate="no">quotaAndLimits.dql.searchRate.collection.max</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatecollectionmax"><code translate="no">quotaAndLimits.dql.queryRate.collection.max</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerCollection"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionenabled"><code translate="no">quotaAndLimits.limitReading.queueProtection.enabled</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionnqInQueueThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionqueueLatencyThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionenabled"><code translate="no">quotaAndLimits.limitReading.resultProtection.enabled</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionmaxReadResultRate"><code translate="no">quotaAndLimits.limitReading.resultProtection.maxReadResultRate</code></a></li>
            <li><a href="/docs/es/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Example" class="common-anchor-header">Ejemplo</h3><p>El siguiente ejemplo configura las réplicas y los recursos de cálculo del proxy y del datanode en el archivo <code translate="no">milvuscluster.yaml</code>.</p>
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
Este ejemplo configura no sólo los recursos globales sino también los recursos de computación privados para el coordenador raíz y el proxy. Cuando se utiliza este archivo de configuración para iniciar un cluster Milvus, las configuraciones de recursos privados se aplicarán a root coord y proxy, mientras que el resto de los componentes seguirán la configuración de recursos globales.</div>
<p>Ejecute el siguiente comando para aplicar las nuevas configuraciones:</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">A continuación<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Aprenda a gestionar las siguientes dependencias de Milvus con Milvus Operator:<ul>
<li><a href="/docs/es/v2.4.x/object_storage_operator.md">Configure Object Storage con Milvus Operator</a></li>
<li><a href="/docs/es/v2.4.x/meta_storage_operator.md">Configurar Meta Storage con Milvus Operator</a></li>
<li><a href="/docs/es/v2.4.x/message_storage_operator.md">Configurar el almacenamiento de mensajes con el Operador Milvus</a></li>
</ul></li>
</ul>
