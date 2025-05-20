---
id: message_storage_operator.md
title: Configurar o armazenamento de mensagens com o Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Saiba como configurar o armazenamento de mensagens com o Milvus Operator.
---
<h1 id="Configure-Message-Storage-with-Milvus-Operator" class="common-anchor-header">Configurar o armazenamento de mensagens com o Milvus Operator<button data-href="#Configure-Message-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus usa RocksMQ, Pulsar ou Kafka para gerenciar logs de alterações recentes, gerar logs de fluxo e fornecer assinaturas de log. Este tópico apresenta como configurar as dependências de armazenamento de mensagens quando você instala o Milvus com o Milvus Operator. Para obter mais detalhes, consulte <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Configurar o armazenamento de mensagens com o Milvus Operator</a> no repositório do Milvus Operator.</p>
<p>Este tópico pressupõe que você tenha implantado o Milvus Operator.</p>
<div class="alert note">Consulte <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Implantar o Milvus Operator</a> para obter mais informações. </div>
<p>É necessário especificar um ficheiro de configuração para utilizar o Milvus Operator para iniciar um cluster Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Só é necessário editar o modelo de código em <code translate="no">milvus_cluster_default.yaml</code> para configurar dependências de terceiros. As secções seguintes apresentam como configurar o armazenamento de objectos, etcd, e Pulsar respetivamente.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Antes de começar<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>A tabela abaixo mostra se o RocksMQ, NATS, Pulsar e Kafka são suportados no modo autônomo e de cluster do Milvus.</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">NATS</th><th style="text-align:center">Pulsar</th><th style="text-align:center">Kafka</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">Modo autónomo</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">Modo de cluster</td><td style="text-align:center">✖️</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Existem também outras limitações para especificar o armazenamento de mensagens:</p>
<ul>
<li>Só é suportado um armazenamento de mensagens para uma instância Milvus. No entanto, continuamos a ter compatibilidade retroactiva com vários armazenamentos de mensagens definidos para uma instância. A prioridade é a seguinte:<ul>
<li>modo autónomo:  RocksMQ (padrão) &gt; Pulsar &gt; Kafka</li>
<li>modo de cluster: Pulsar (padrão) &gt; Kafka</li>
<li>Nats introduzidos na versão 2.3 não participam dessas regras de prioridade por compatibilidade com versões anteriores.</li>
</ul></li>
<li>O armazenamento de mensagens não pode ser alterado enquanto o sistema Milvus estiver a funcionar.</li>
<li>Apenas a versão 2.x ou 3.x do Kafka é suportada.</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">Configurar o RocksMQ<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>O RocksMQ é o armazenamento de mensagens padrão no Milvus standalone.</p>
<div class="alert note">
<p>Atualmente, só é possível configurar o RocksMQ como o armazenamento de mensagens para o Milvus standalone com o Milvus Operator.</p>
</div>
<h4 id="Example" class="common-anchor-header">Exemplo de configuração</h4><p>O exemplo a seguir configura um serviço RocksMQ.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: {}
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-NATS" class="common-anchor-header">Configurar NATS<button data-href="#Configure-NATS" class="anchor-icon" translate="no">
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
    </button></h2><p>O NATS é um armazenamento de mensagens alternativo para o NATS.</p>
<h4 id="Example" class="common-anchor-header">Exemplo</h4><p>O exemplo a seguir configura um serviço NATS.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: 
    msgStreamType: <span class="hljs-string">&#x27;natsmq&#x27;</span>
    natsmq:
      <span class="hljs-comment"># server side configuration for natsmq.</span>
      server: 
        <span class="hljs-comment"># 4222 by default, Port for nats server listening.</span>
        port: <span class="hljs-number">4222</span> 
        <span class="hljs-comment"># /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.</span>
        storeDir: /var/lib/milvus/nats 
        <span class="hljs-comment"># (B) 16GB by default, Maximum size of the &#x27;file&#x27; storage.</span>
        maxFileStore: <span class="hljs-number">17179869184</span> 
        <span class="hljs-comment"># (B) 8MB by default, Maximum number of bytes in a message payload.</span>
        maxPayload: <span class="hljs-number">8388608</span> 
        <span class="hljs-comment"># (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.</span>
        maxPending: <span class="hljs-number">67108864</span> 
        <span class="hljs-comment"># (√ms) 4s by default, waiting for initialization of natsmq finished.</span>
        initializeTimeout: <span class="hljs-number">4000</span> 
        monitor:
          <span class="hljs-comment"># false by default, If true enable debug log messages.</span>
          debug: false 
          <span class="hljs-comment"># true by default, If set to false, log without timestamps.</span>
          logTime: true 
          <span class="hljs-comment"># no log file by default, Log file path relative to.. .</span>
          logFile: 
          <span class="hljs-comment"># (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.</span>
          logSizeLimit: <span class="hljs-number">0</span> 
        retention:
          <span class="hljs-comment"># (min) 3 days by default, Maximum age of any message in the P-channel.</span>
          maxAge: <span class="hljs-number">4320</span> 
          <span class="hljs-comment"># (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.</span>
          maxBytes:
          <span class="hljs-comment"># None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    </span>
          maxMsgs: 
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p>Para migrar o armazenamento de mensagens do RocksMQ para o NATS, faça o seguinte:</p>
<ol>
<li><p>Interrompa todas as operações DDL.</p></li>
<li><p>Chame a API FlushAll e, em seguida, pare o Milvus quando a chamada da API terminar de ser executada.</p></li>
<li><p>Altere <code translate="no">msgStreamType</code> para <code translate="no">natsmq</code> e faça as alterações necessárias nas configurações do NATS em <code translate="no">spec.dependencies.natsmq</code>.</p></li>
<li><p>Inicie novamente o Milvus e verifique se:</p>
<ul>
<li>Existe uma entrada de registo que indica <code translate="no">mqType=natsmq</code> nos registos.</li>
<li>Um diretório com o nome <code translate="no">jetstream</code> está presente no diretório especificado em <code translate="no">spec.dependencies.natsmq.server.storeDir</code>.</li>
</ul></li>
<li><p>(Opcional) Faça backup e limpe os arquivos de dados no diretório de armazenamento do RocksMQ.</p></li>
</ol>
<div class="alert note">
<p><strong>Escolher entre RocksMQ e NATS?</strong></p>
<p>O RockMQ usa o CGO para interagir com o RocksDB e gerencia a memória por si só, enquanto o NATS puro-GO incorporado na instalação do Milvus delega seu gerenciamento de memória ao coletor de lixo (GC) do Go.</p>
<p>No cenário em que o pacote de dados é menor que 64 kb, o RocksDB tem um desempenho melhor em termos de uso de memória, uso de CPU e tempo de resposta. Por outro lado, se o pacote de dados for maior que 64 kb, o NATS se sobressai em termos de tempo de resposta com memória suficiente e agendamento ideal do GC.</p>
<p>Atualmente, é aconselhável usar o NATS apenas para experimentos.</p>
</div>
<h2 id="Configure-Pulsar" class="common-anchor-header">Configurar o Pulsar<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>O Pulsar gerencia logs de mudanças recentes, gera logs de fluxo de saída e fornece assinaturas de log. A configuração do Pulsar para armazenamento de mensagens é suportada tanto no Milvus standalone quanto no Milvus cluster. No entanto, com o Milvus Operator, só é possível configurar a Pulsar como armazenamento de mensagens para o Milvus cluster. Adicione os campos obrigatórios em <code translate="no">spec.dependencies.pulsar</code> para configurar a Pulsar.</p>
<p><code translate="no">pulsar</code> suporta <code translate="no">external</code> e <code translate="no">inCluster</code>.</p>
<h3 id="External-Pulsar" class="common-anchor-header">Pulsar externo</h3><p><code translate="no">external</code> indica o uso de um serviço Pulsar externo. Os campos usados para configurar um serviço Pulsar externo incluem:</p>
<ul>
<li><code translate="no">external</code>:  Um valor <code translate="no">true</code> indica que o Milvus usa um serviço Pulsar externo.</li>
<li><code translate="no">endpoints</code>: Os endpoints do Pulsar.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Exemplo de configuração</h4><p>O exemplo a seguir configura um serviço Pulsar externo.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies: <span class="hljs-comment"># Optional</span>
    pulsar: <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external pulsar as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new pulsar inside the same kubernetes cluster for milvus.</span>
      external: true <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external pulsar endpoints if external=true</span>
      endpoints:
      - <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>:<span class="hljs-number">6650</span>
  components: {}
  config: {}           
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-Pulsar" class="common-anchor-header">Pulsar interno</h3><p><code translate="no">inCluster</code> indica que quando um cluster Milvus é iniciado, um serviço Pulsar é iniciado automaticamente no cluster.</p>
<h4 id="Example" class="common-anchor-header">Exemplo</h4><p>O exemplo a seguir configura um serviço Pulsar interno.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    pulsar:
      inCluster:
        values:
          components:
            autorecovery: <span class="hljs-literal">false</span>
          zookeeper:
            replicaCount: 1
          bookkeeper:
            replicaCount: 1
            resoureces:
              <span class="hljs-built_in">limit</span>:
                cpu: <span class="hljs-string">&#x27;4&#x27;</span>
              memory: 8Gi
            requests:
              cpu: 200m
              memory: 512Mi
          broker:
            replicaCount: 1
            configData:
              <span class="hljs-comment">## Enable `autoSkipNonRecoverableData` since bookkeeper is running</span>
              <span class="hljs-comment">## without persistence</span>
              autoSkipNonRecoverableData: <span class="hljs-string">&quot;true&quot;</span>
              managedLedgerDefaultEnsembleSize: <span class="hljs-string">&quot;1&quot;</span>
              managedLedgerDefaultWriteQuorum: <span class="hljs-string">&quot;1&quot;</span>
              managedLedgerDefaultAckQuorum: <span class="hljs-string">&quot;1&quot;</span>
          proxy:
            replicaCount: 1
  components: {}
  config: {}            
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Este exemplo especifica o número de réplicas de cada componente do Pulsar, os recursos de computação do Pulsar BookKeeper e outras configurações.</div>
<div class="alert note">Encontre os itens de configuração completos para configurar um serviço interno da Pulsar em <a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">values.yaml</a>. Adicione itens de configuração conforme necessário em <code translate="no">pulsar.inCluster.values</code> como mostrado no exemplo anterior.</div>
<p>Supondo que o arquivo de configuração tenha o nome <code translate="no">milvuscluster.yaml</code>, execute o seguinte comando para aplicar a configuração.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka" class="common-anchor-header">Configurar o Kafka<button data-href="#Configure-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>O Pulsar é o armazenamento de mensagens padrão em um cluster Milvus. Se pretender utilizar o Kafka, adicione o campo opcional <code translate="no">msgStreamType</code> para configurar o Kafka.</p>
<p><code translate="no">kafka</code> suporta <code translate="no">external</code> e <code translate="no">inCluster</code>.</p>
<h3 id="External-Kafka" class="common-anchor-header">Kafka externo</h3><p><code translate="no">external</code> indica a utilização de um serviço Kafka externo.</p>
<p>Os campos utilizados para configurar um serviço Kafka externo incluem:</p>
<ul>
<li><code translate="no">external</code>: Um valor <code translate="no">true</code> indica que o Milvus utiliza um serviço Kafka externo.</li>
<li><code translate="no">brokerList</code>: A lista de corretores para os quais enviar as mensagens.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Exemplo de configuração</h4><p>O exemplo seguinte configura um serviço Kafka externo.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  config:
    kafka:
      <span class="hljs-comment"># securityProtocol supports: PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL </span>
      securityProtocol: PLAINTEXT
      <span class="hljs-comment"># saslMechanisms supports: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512</span>
      saslMechanisms: PLAIN
      saslUsername: <span class="hljs-string">&quot;&quot;</span>
      saslPassword: <span class="hljs-string">&quot;&quot;</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    <span class="hljs-comment"># Omit other fields ...</span>
    msgStreamType: <span class="hljs-string">&quot;kafka&quot;</span>
    kafka:
      external: true
      brokerList: 
        - <span class="hljs-string">&quot;kafkaBrokerAddr1:9092&quot;</span>
        - <span class="hljs-string">&quot;kafkaBrokerAddr2:9092&quot;</span>
        <span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>As configurações SASL são suportadas na versão v0.8.5 ou superior do operador.</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">Kafka interno</h3><p><code translate="no">inCluster</code> indica que quando um cluster Milvus é iniciado, um serviço Kafka é iniciado automaticamente no cluster.</p>
<h4 id="Example" class="common-anchor-header">Exemplo</h4><p>O exemplo a seguir configura um serviço Kafka interno.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec: 
  dependencies:
    msgStreamType: <span class="hljs-string">&quot;kafka&quot;</span>
    kafka:
      inCluster: 
        values: {} <span class="hljs-comment"># values can be found in https://artifacthub.io/packages/helm/bitnami/kafka</span>
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p>Encontre os itens de configuração completos para configurar um serviço Kafka interno <a href="https://artifacthub.io/packages/helm/bitnami/kafka">aqui</a>. Adicione itens de configuração conforme necessário em <code translate="no">kafka.inCluster.values</code>.</p>
<p>Supondo que o ficheiro de configuração tenha o nome <code translate="no">milvuscluster.yaml</code>, execute o seguinte comando para aplicar a configuração.</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">O que se segue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Saiba como configurar outras dependências do Milvus com o Milvus Operator:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/object_storage_operator.md">Configurar o Armazenamento de Objetos com o Milvus Operator</a></li>
<li><a href="/docs/pt/v2.4.x/meta_storage_operator.md">Configurar o Meta Storage com o Milvus Operator</a></li>
</ul>
