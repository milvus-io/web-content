---
id: woodpecker.md
title: Woodpecker
related_key: Woodpecker
summary: >-
  Saiba como o Woodpecker funciona como fila de mensagens predefinida (WAL) no
  Milvus e como o executar no modo incorporado ou no modo de serviço.
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
    </button></h1><p>O Woodpecker é a <strong>fila de mensagens predefinida (registo antecipado, WAL)</strong> no Milvus 3.x. Trata-se de um WAL nativo da nuvem concebido para armazenamento de objetos, que oferece elevado débito, baixo custo operacional e escalabilidade sem interrupções. Para obter detalhes sobre a arquitetura e os testes de desempenho, consulte <a href="/docs/pt/woodpecker_architecture.md">Woodpecker</a>.</p>
<h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
<li>No Milvus 3.x, o Woodpecker é o WAL/fila de mensagens <strong>predefinido</strong>, proporcionando gravações ordenadas e recuperação enquanto serviço de registo. Não é necessário qualquer serviço externo de fila de mensagens (como o Pulsar ou o Kafka).</li>
<li>O Woodpecker pode ser executado <strong>incorporado</strong> no nó Milvus/streaming (por predefinição) ou como um <strong>serviço dedicado</strong> com os seus próprios pods (apenas em modo distribuído/cluster).</li>
<li>Suporta três modos de « <code translate="no">storage.type</code> »: armazenamento de objetos (<code translate="no">minio</code>, o padrão), sistema de ficheiros local (<code translate="no">local</code>) e o <code translate="no">service</code> dedicado. Consulte <a href="#Deployment-modes">Modos de implementação</a>.</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">Início rápido<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Para ativar o Woodpecker, defina o tipo de MQ como Woodpecker:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nota: A mudança d <code translate="no">mq.type</code> e num cluster em execução é uma operação de atualização. Siga cuidadosamente o procedimento de atualização e valide num cluster novo antes de efetuar a mudança na produção.</p>
<h2 id="Configuration" class="common-anchor-header">Configuração<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Segue-se o bloco de configuração completo do Woodpecker (edite <code translate="no">milvus.yaml</code> ou substitua em <code translate="no">user.yaml</code>):</p>
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
<p>Notas importantes:</p>
<ul>
<li><code translate="no">woodpecker.meta</code>
<ul>
<li><strong>type</strong>: Atualmente, apenas o <code translate="no">etcd</code> é suportado. Reutilize o mesmo etcd do Milvus para armazenar metadados ligeiros.</li>
<li><strong>prefixo</strong>: O prefixo da chave para os metadados. Padrão: <code translate="no">woodpecker</code>.</li>
</ul></li>
<li><code translate="no">woodpecker.client</code>
<ul>
<li>Controla o comportamento de adição/rotação/auditoria de segmentos no lado do cliente para equilibrar o débito e a latência de ponta a ponta.</li>
</ul></li>
<li><code translate="no">woodpecker.logstore</code>
<ul>
<li>Controla as políticas de sincronização/esvaziamento/compactação/leitura para segmentos de registo. Estes são os principais parâmetros para o ajuste da taxa de transferência e da latência.</li>
</ul></li>
<li><code translate="no">woodpecker.storage</code>
<ul>
<li><strong>tipo</strong>: <code translate="no">minio</code> para armazenamento de objetos compatível com MinIO/S3 (MinIO/S3/GCS/OSS, etc.); <code translate="no">local</code> para sistemas de ficheiros locais/partilhados.</li>
<li><strong>rootPath</strong>: Caminho raiz para o backend de armazenamento (aplicável a <code translate="no">local</code>; com <code translate="no">minio</code>, os caminhos são determinados pelo bucket/prefixo).</li>
</ul></li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">Modos de implementação<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>O Woodpecker suporta três modos de « <code translate="no">storage.type</code> »:</p>
<table>
<thead>
<tr><th><code translate="no">storage.type</code></th><th>Como funciona o Woodpecker</th><th>Backend WAL</th><th>Milvus Autônomo</th><th>Milvus Distribuído (cluster)</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio</code> (padrão)</td><td>Incorporado no nó Milvus/streaming</td><td>Armazenamento de objetos (compatível com MinIO/S3)</td><td>Compatível</td><td>Compatível</td></tr>
<tr><td><code translate="no">local</code></td><td>Incorporado no nó Milvus/streaming</td><td>Sistema de ficheiros local</td><td>Suportado</td><td>Limitado (todos os nós necessitam de um sistema de ficheiros partilhado, por exemplo, NFS)</td></tr>
<tr><td><code translate="no">service</code></td><td><strong>Serviço Woodpecker dedicado</strong> (com os seus próprios pods)</td><td>Armazenamento de objetos (compatível com MinIO/S3)</td><td><strong>Não suportado</strong></td><td>Suportado</td></tr>
</tbody>
</table>
<p>Notas:</p>
<ul>
<li>Com o « <code translate="no">minio</code> », o Woodpecker partilha o mesmo armazenamento de objetos com o Milvus (MinIO/S3/GCS/OSS, etc.).</li>
<li>Com o modo « <code translate="no">local</code> », um disco local de um único nó só é adequado para o modo «Standalone». Se todos os pods puderem aceder a um sistema de ficheiros partilhado (por exemplo, NFS), o modo «Cluster» também pode utilizar o modo « <code translate="no">local</code> ».</li>
<li><strong><code translate="no">service</code> O modo «Cluster» executa o Woodpecker como um serviço separado e escalável de forma independente, estando disponível apenas para implementações distribuídas/em cluster.</strong> As implementações «Standalone» utilizam os modos incorporados (<code translate="no">minio</code> ou <code translate="no">local</code>).</li>
</ul>
<h2 id="Object-storage-compatibility-for-storagetypeminio" class="common-anchor-header">Compatibilidade com armazenamento de objetos para <code translate="no">storage.type=minio</code><button data-href="#Object-storage-compatibility-for-storagetypeminio" class="anchor-icon" translate="no">
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
    </button></h2><p>A matriz seguinte resume a compatibilidade atualmente conhecida dos backends de armazenamento de objetos quando o Woodpecker é configurado com <code translate="no">storage.type=minio</code>. Esta informação baseia-se na <a href="https://github.com/zilliztech/woodpecker/discussions/150">Discussão n.º 150 do GitHub</a>.</p>
<table>
<thead>
<tr><th>Fornecedor / serviço</th><th>Estado</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td>Armazenamento de Blobs do Azure</td><td>Compatível</td><td>Utiliza o SDK nativo do Azure.</td></tr>
<tr><td>AWS S3</td><td>Compatível</td><td>S3 nativo com suporte total à escrita condicional.</td></tr>
<tr><td>MinIO (<code translate="no">&gt;= 2024-12</code>)</td><td>Compatível</td><td>Suporte total à escrita condicional do S3.</td></tr>
<tr><td>Aliyun OSS</td><td>Compatível</td><td>Compatível através da sua interface compatível com S3.</td></tr>
<tr><td>Tencent COS</td><td>Compatível</td><td>Compatível através da sua interface compatível com S3.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>Compatível</td><td>Compatível através do modo de interoperabilidade S3.</td></tr>
<tr><td>Huawei Cloud OBS</td><td>Não suportado</td><td>Não dispõe da semântica de gravação condicional necessária.</td></tr>
<tr><td>VAST Data</td><td>Compatível</td><td>Verificado pela comunidade; funciona apenas com buckets sem controlo de versões.</td></tr>
<tr><td>Outros armazenamentos compatíveis com S3</td><td>Parcial</td><td>Depende do suporte total à semântica de gravação condicional do S3.</td></tr>
</tbody>
</table>
<p>Notas:</p>
<ul>
<li>A compatibilidade depende do suporte nativo do SDK ou do suporte à semântica de escrita condicional do S3.</li>
<li>Se hospedar o MinIO para o Woodpecker, utilize a versão <code translate="no">RELEASE.2024-12-18T13-15-44Z</code> ou posterior.</li>
<li>Esta matriz reflete <a href="https://github.com/zilliztech/woodpecker/discussions/150">a discussão atual</a> e poderá evoluir à medida que o suporte do backend for sendo validado.</li>
</ul>
<h2 id="Deployment-guides" class="common-anchor-header">Guias de implementação<button data-href="#Deployment-guides" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="common-anchor-header">Ativar o Woodpecker num cluster Milvus no Kubernetes (Milvus Operator, storage=minio)<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>Após instalar o <a href="/docs/pt/install_cluster-milvusoperator.md">Milvus Operator</a>, inicie um cluster Milvus com o Woodpecker ativado utilizando o exemplo oficial:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml

<button class="copy-code-btn"></button></code></pre>
<p>Este exemplo configura o Woodpecker como fila de mensagens e ativa o Nodo de Streaming. A primeira inicialização pode demorar algum tempo a carregar as imagens; aguarde até que todos os pods estejam prontos:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
kubectl get milvus my-release -o yaml | grep -A2 status
<button class="copy-code-btn"></button></code></pre>
<p>Quando estiver pronto, deverá ver pods semelhantes a:</p>
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
<p>Execute o seguinte comando para desinstalar o cluster Milvus.</p>
<pre><code translate="no" class="language-bash">kubectl delete milvus my-release
<button class="copy-code-btn"></button></code></pre>
<p>Se precisar de ajustar os parâmetros do Woodpecker, siga as configurações descritas em <a href="#Configuration">«Configuração</a>».</p>
<h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="common-anchor-header">Ativar o Woodpecker para um cluster Milvus no Kubernetes (Helm Chart, storage=minio)<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>Primeiro, adicione e atualize o Helm Chart do Milvus, conforme descrito em <a href="/docs/pt/install_cluster-helm.md">Executar o Milvus no Kubernetes com o Helm</a>.</p>
<p>Em seguida, efetue a implementação utilizando um dos exemplos seguintes:</p>
<p>– Implantação em cluster (configurações recomendadas com o Woodpecker e o Streaming Node ativados):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>– Implantação autónoma (Woodpecker ativado):</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Após a implementação, siga a documentação para fazer o reencaminhamento de portas e estabelecer a ligação. Para ajustar os parâmetros do Woodpecker, siga as configurações descritas em <a href="#Configuration">«Configuração</a>».</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="common-anchor-header">Ativar o Woodpecker para o Milvus autónomo no Docker (storage=local)<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="anchor-icon" translate="no">
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
    </button></h3><p>No Milvus 3.x, a implementação autónoma no Docker utiliza o Woodpecker com o <strong>sistema de ficheiros local</strong> como backend WAL <strong>por predefinição</strong> — não é necessária qualquer configuração adicional. Siga as instruções em <a href="/docs/pt/install_standalone-docker.md">«Executar o Milvus no Docker</a>»:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Para ajustar o Woodpecker, edite o ficheiro « <code translate="no">user.yaml</code> » gerado após o primeiro arranque e execute « <code translate="no">bash standalone_embed.sh restart</code> » para aplicar as alterações (um novo « <code translate="no">start</code> » regenera o « <code translate="no">user.yaml</code> », pelo que deve aplicar as edições com « <code translate="no">restart</code> »):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">16</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="common-anchor-header">Ativar o Woodpecker para o Milvus Standalone com o Docker Compose (storage=minio)<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>Siga as instruções de <a href="/docs/pt/install_standalone-docker-compose.md">«Executar o Milvus com o Docker Compose</a>». Exemplo:</p>
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
<h3 id="Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="common-anchor-header">Ativar o modo de serviço do Woodpecker para um cluster Milvus (Helm)<button data-href="#Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>O modo de serviço</strong> do Woodpecker é uma funcionalidade <strong>do Milvus 3.0</strong>. Para implementações distribuídas/em cluster, pode executar o Woodpecker como um <strong>serviço dedicado</strong> (pods separados) em vez de incorporado no nó de streaming, definindo <code translate="no">streaming.woodpecker.embedded=false</code>:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> woodpecker.image.tag=v0.1.33 \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.woodpecker.embedded=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Isto implementa o Woodpecker como um StatefulSet dedicado (<code translate="no">my-release-milvus-woodpecker</code>, 4 réplicas por predefinição) liderado por um serviço sem interface gráfica, agrupado em cluster por gossip nas portas <code translate="no">18080</code> (serviço), <code translate="no">17946</code> (gossip) e <code translate="no">9091</code> (métricas), com o MinIO como backend de armazenamento. O serviço necessita de um quórum de <strong>3</strong> nós; o valor predefinido de <strong>4</strong> réplicas mantém o quórum ao mesmo tempo que tolera a falha de um único nó, pelo que não se deve definir <code translate="no">woodpecker.replicaCount</code> para um valor inferior a 3. O cluster inclui então um conjunto separado de pods <code translate="no">woodpecker</code>:</p>
<pre><code translate="no"><span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">0</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">1</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">2</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>O modo « <code translate="no">service</code> » do Woodpecker destina-se apenas a implementações <strong>distribuídas/em cluster</strong> — as implementações autónomas executam o Woodpecker incorporado (<code translate="no">minio</code> ou <code translate="no">local</code>). O Milvus Operator ainda não suporta o modo de serviço do Woodpecker.</p>
</div>
<h2 id="Throughput-tuning-tips" class="common-anchor-header">Dicas para otimização da taxa de transferência<button data-href="#Throughput-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><p>O perfil de débito e latência do Woodpecker difere entre o modo <strong>incorporado</strong> e o modo <strong>de serviço</strong> (uma funcionalidade do Milvus 3.0). As orientações abaixo estão organizadas por modo.</p>
<h3 id="Embedded-mode" class="common-anchor-header">Modo incorporado<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Com base nos benchmarks e nos limites do backend do <a href="/docs/pt/woodpecker_architecture.md">Woodpecker</a>, otimize a taxa de transferência de gravação de ponta a ponta a partir dos seguintes aspetos:</p>
<ul>
<li>Do lado do armazenamento
<ul>
<li><strong>Armazenamento de objetos (compatível com MinIO/S3)</strong>: Aumente a simultaneidade e o tamanho dos objetos (evite objetos muito pequenos). Esteja atento aos limites de largura de banda da rede e dos buckets. Um único nó MinIO num SSD atinge frequentemente um limite de cerca de 100 MB/s localmente; um único EC2 para S3 pode atingir GB/s.</li>
<li><strong>Sistemas de ficheiros locais/partilhados (locais)</strong>: Dê preferência a NVMe/discos rápidos. Certifique-se de que o sistema de ficheiros lida bem com pequenas gravações e com a latência do fsync.</li>
</ul></li>
<li>Parâmetros do Woodpecker
<ul>
<li>Aumente os parâmetros ` <code translate="no">logstore.segmentSyncPolicy.maxFlushSize</code> ` e ` <code translate="no">maxFlushThreads</code> ` para flushes maiores e maior paralelismo.</li>
<li>Ajuste <code translate="no">maxInterval</code> de acordo com as características do suporte (troque latência por débito com uma agregação mais longa).</li>
<li>No caso do armazenamento de objetos, considere aumentar <code translate="no">segmentRollingPolicy.maxSize</code> para reduzir as trocas de segmento.</li>
</ul></li>
<li>Lado do cliente/aplicação
<ul>
<li>Utilize lotes de maior dimensão e mais gravadores/clientes simultâneos.</li>
<li>Controle o momento da atualização/criação do índice (agrupe antes de acionar) para evitar pequenas gravações frequentes.</li>
</ul></li>
</ul>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">Modo de serviço (Milvus 3.0+)<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>O modo de serviço mantém o elevado débito de gravação de um WAL suportado por armazenamento de objetos, ao mesmo tempo que adiciona baixa latência (ver <a href="#Latency">Latência</a>). O ajuste do lado do armazenamento e do lado do cliente acima continua a aplicar-se; além disso, como o Woodpecker funciona como um serviço próprio, é possível escalar a capacidade de gravação horizontalmente adicionando réplicas (<code translate="no">woodpecker.replicaCount</code>, valor predefinido 4), e as gravações beneficiam da replicação de quórum de um RTT e de leituras sensíveis à topologia que evitam o reencaminhamento pelo broker.</p>
<p><strong>Demonstração de inserção em lote</strong> — utilize o seguinte para medir a taxa de transferência de gravação:</p>
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
<h2 id="Latency" class="common-anchor-header">Latência<button data-href="#Latency" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Embedded-mode" class="common-anchor-header">Modo incorporado<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>O Woodpecker é um WAL nativo da nuvem concebido para armazenamento de objetos, com compromissos entre débito, custo e latência. O modo incorporado leve dá prioridade à otimização de custo e débito, uma vez que a maioria dos cenários apenas exige que os dados sejam gravados dentro de um determinado prazo, em vez de exigir baixa latência para pedidos de gravação individuais. Por conseguinte, o Woodpecker recorre a gravações em lote, com intervalos predefinidos de 10 ms para backends de armazenamento em sistemas de ficheiros locais e de 200 ms para backends de armazenamento do tipo MinIO. Durante operações de gravação lentas, a latência máxima é igual ao tempo do intervalo mais o tempo de flush.</p>
<p>Note-se que a inserção em lotes é desencadeada não só por intervalos de tempo, mas também pelo tamanho do lote, cujo valor predefinido é de 2 MB.</p>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">Modo de serviço (Milvus 3.0+)<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>O modo de serviço proporciona <strong>uma latência de gravação ao nível dos milissegundos</strong> — da mesma ordem de grandeza que um WAL tradicional em disco local com três réplicas —, mantendo os custos baixos. Numa implementação típica com três réplicas e entre zonas de disponibilidade (AZ), a latência de gravação mantém-se na ordem dos milissegundos. Isto é conseguido através de:</p>
<ul>
<li><strong>Gravações de quórum de um RTT</strong> — a replicação orientada pelo cliente conclui uma gravação de quórum num único round trip, com o tráfego entre zonas fixado no equivalente a dois réplicas de dados (em comparação com o tráfego extra entre zonas de cerca de 1/3, típico da replicação baseada em broker/líder).</li>
<li><strong>Leituras de salto único sensíveis à topologia</strong> — cada leitura vai diretamente para a réplica mais próxima, em vez de ser reencaminhada através de um broker, evitando as leituras aleatórias entre zonas (≈2/3 do tráfego de leitura entre zonas) dos sistemas baseados em broker.</li>
<li><strong>Carregamento imediato para o armazenamento de objetos após a rotação do segmento</strong> — cada segmento acompanha todo o seu ciclo de vida e é carregado para o armazenamento de objetos assim que é rodado, mantendo a ocupação do disco local e os custos de armazenamento baixos, sem comprometer a latência.</li>
<li><strong>Sem replicação contínua de nó para nó</strong> — os registos persistem no armazenamento de objetos, que funciona como armazenamento partilhado; assim, o failover apenas volta a carregar as réplicas sobreviventes (sem cópia do nó inteiro), o escalonamento não é limitado pela largura de banda de replicação entre nós e a substituição de nós em grande escala não provoca picos de replicação.</li>
</ul>
<p>Em implementações entre zonas de disponibilidade (AZ), o modo de serviço também poupa cerca de <strong>1/3 do</strong> tráfego de rede <strong>de escrita</strong> e <strong>2/3 do</strong> tráfego <strong>de leitura</strong> entre zonas de disponibilidade, em comparação com sistemas de registos baseados em broker. Para a análise completa do design e dos custos, consulte <a href="/docs/pt/woodpecker_architecture.md">a Arquitetura do Woodpecker</a>.</p>
<p>Para obter detalhes sobre a arquitetura, os modos de implementação (MemoryBuffer / QuorumBuffer) e o desempenho, consulte <a href="/docs/pt/woodpecker_architecture.md">a Arquitetura do Woodpecker</a>.</p>
<p>Para mais detalhes sobre os parâmetros, consulte o <a href="https://github.com/zilliztech/woodpecker">repositório GitHub</a> do Woodpecker.</p>
