---
id: configure-docker.md
label: Docker Compose
related_key: configure
summary: Configurar o Milvus com o Docker Compose.
title: Configurar o Milvus com o Docker Compose
---
<h1 id="Configure-Milvus-with-Docker-Compose" class="common-anchor-header">Configurar o Milvus com o Docker Compose<button data-href="#Configure-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico descreve como configurar os componentes do Milvus e as suas dependências de terceiros com o Docker Compose.</p>
<div class="alert note">
Alguns parâmetros podem ser alterados enquanto o Milvus está em execução. Para mais detalhes, consulte <a href="/docs/pt/dynamic_config.md">«Configurar o Milvus em tempo real</a>». Para aplicar alterações a outros parâmetros, reinicie o Milvus.
</div>
<h2 id="Download-a-configuration-file" class="common-anchor-header">Descarregar um ficheiro de configuração<button data-href="#Download-a-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/configs/milvus.yaml">Descarregue</a> o ficheiro « <code translate="no">milvus.yaml</code> » diretamente ou através do comando seguinte.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/configs/milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Modify-the-configuration-file" class="common-anchor-header">Modificar o ficheiro de configuração<button data-href="#Modify-the-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Configure a sua instância do Milvus de acordo com os cenários da sua aplicação num ficheiro « <code translate="no">user.yaml</code> ». Adicione apenas os parâmetros que pretende alterar e utilize o ficheiro « <code translate="no">milvus.yaml</code> » descarregado como referência para os seus nomes e valores predefinidos. O Milvus lê « <code translate="no">user.yaml</code> » após « <code translate="no">milvus.yaml</code> », pelo que os valores em « <code translate="no">user.yaml</code> » substituem os valores predefinidos. O exemplo seguinte altera o nível de registo:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">log:</span>
  <span class="hljs-attr">level:</span> <span class="hljs-string">warn</span>
<button class="copy-code-btn"></button></code></pre>
<p>Consulte as ligações seguintes para obter mais informações sobre cada parâmetro.</p>
<p>Ordenado por:</p>
<div class="filter">
<a href="#component">Componentes ou dependências</a> <a href="#purpose">Finalidades de configuração</a> 
</div>
<div class="filter-component table-wrapper">
<table id="component">
<thead>
  <tr>
    <th>Dependências</th>
    <th>Componentes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
        <ul>
            <li><a href="/docs/pt/configure_etcd.md">etcd</a></li>
            <li><a href="/docs/pt/configure_minio.md">MinIO ou S3</a></li>
            <li><a href="/docs/pt/configure_pulsar.md">Pulsar</a></li>
            <li><a href="/docs/pt/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/pt/configure_rootcoord.md">Coordenada raiz</a></li>
            <li><a href="/docs/pt/configure_proxy.md">Proxy</a></li>
            <li><a href="/docs/pt/configure_querycoord.md">Coordenada de consulta</a></li>
            <li><a href="/docs/pt/configure_querynode.md">Nó de consulta</a></li>
            <li><a href="/docs/pt/configure_indexnode.md">Nó de índice (legado)</a></li>
            <li><a href="/docs/pt/configure_datacoord.md">Coordenadas de dados</a></li>
            <li><a href="/docs/pt/configure_datanode.md">Nó de dados</a></li>
            <li><a href="/docs/pt/configure_localstorage.md">Armazenamento local</a></li>
            <li><a href="/docs/pt/configure_log.md">Registo</a></li>
            <li><a href="/docs/pt/configure_msgchannel.md">Canal de mensagens</a></li>
            <li><a href="/docs/pt/configure_common.md">Comum</a></li>
            <li><a href="/docs/pt/configure_gpu.md">GPU</a></li>
            <li><a href="/docs/pt/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/pt/configure_indexcoord.md">Coordenadas do índice (legado)</a></li>
            <li><a href="/docs/pt/configure_metastore.md">Metastore</a></li>
            <li><a href="/docs/pt/configure_mq.md">Fila de mensagens</a></li>
            <li><a href="/docs/pt/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/pt/configure_trace.md">Rastreio</a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md">Quotas e limites</a></li>
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
    <th>Objetivo</th>
    <th>Parâmetros</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Otimização de desempenho</td>
    <td>
        <ul>
            <li><a href="/docs/pt/configure_common.md#commongracefulTime"><code translate="no">common.gracefulTime</code></a></li>
            <li><a href="/docs/pt/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/pt/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/pt/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/pt/configure_datanode.md#dataNodesegmentinsertBufSize"><code translate="no">dataNode.segment.insertBufSize</code></a></li>
            <li><a href="/docs/pt/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/pt/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Dados e metadados</td>
    <td>
        <ul>
            <li><a href="/docs/pt/configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/pt/configure_datacoord.md#dataCoordenableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/pt/configure_datacoord.md#dataCoordenableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/pt/configure_datacoord.md#dataCoordgcdropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Administração</td>
    <td>
        <ul>
            <li><a href="/docs/pt/configure_log.md#loglevel"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/pt/configure_log.md#logfilerootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/pt/configure_log.md#logfilemaxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/pt/configure_minio.md#minioaccessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/pt/configure_minio.md#miniosecretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Quotas e limites</td>
    <td>
        <ul>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitsflushRatemax"><code translate="no">quotaAndLimits.flushRate.max</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitscompactionRateenabled"><code translate="no">quotaAndLimits.compactionRate.enabled</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitscompactionRatemax"><code translate="no">quotaAndLimits.compactionRate.max</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/pt/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<h2 id="Download-an-installation-file" class="common-anchor-header">Descarregar um ficheiro de instalação<button data-href="#Download-an-installation-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Descarregue o ficheiro de instalação do Milvus <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml">autónomo</a> e guarde-o com o nome « <code translate="no">docker-compose.yml</code> ».</p>
<p>Também pode simplesmente executar o seguinte comando.</p>
<pre><code translate="no"><span class="hljs-meta prompt_"># </span><span class="language-bash">For Milvus standalone</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Modify-the-installation-file" class="common-anchor-header">Modificar o ficheiro de instalação<button data-href="#Modify-the-installation-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Em <code translate="no">docker-compose.yml</code>, mapeie o caminho local para o seu ficheiro <code translate="no">user.yaml</code> para <code translate="no">/milvus/configs/user.yaml</code> na secção <code translate="no">volumes</code> do serviço <code translate="no">standalone</code>. Mantenha as entradas de volume existentes e as outras definições do serviço, tais como a imagem, as variáveis de ambiente, a verificação de integridade e as dependências:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/local/path/to/your/user.yaml:/milvus/configs/user.yaml</span>   <span class="hljs-comment"># Map the local path to the container path</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Os dados são armazenados na pasta <code translate="no">./volumes</code>, de acordo com a configuração predefinida em <code translate="no">docker-compose.yml</code>. Para alterar a pasta onde os dados são armazenados, edite <code translate="no">docker-compose.yml</code> ou execute <code translate="no">$ export DOCKER_VOLUME_DIRECTORY=</code>.
</div>
<h2 id="Start-Milvus" class="common-anchor-header">Iniciar o Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de concluir a modificação do ficheiro de configuração e do ficheiro de instalação, pode iniciar o Milvus.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Próximos passos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Saiba como gerir as seguintes dependências do Milvus com o Docker Compose ou o Helm:
<ul>
<li><a href="/docs/pt/deploy_s3.md">Configurar o armazenamento de objetos com o Docker Compose ou o Helm</a></li>
<li><a href="/docs/pt/deploy_etcd.md">Configurar o armazenamento de metadados com o Docker Compose ou o Helm</a></li>
<li><a href="/docs/pt/deploy_pulsar.md">Configurar o armazenamento de mensagens com o Docker Compose ou o Helm</a></li>
</ul></li>
</ul>
