---
id: mq_kafka.md
title: Kafka
---
<h1 id="Use-Kafka-as-the-Milvus-Message-Queue" class="common-anchor-header">Utilizar o Kafka como fila de mensagens do Milvus<button data-href="#Use-Kafka-as-the-Milvus-Message-Queue" class="anchor-icon" translate="no">
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
    </button></h1><p>O Apache Kafka é um dos backends de fila de mensagens (WAL) suportados pelo Milvus. No Milvus 3.x, <a href="/docs/pt/woodpecker.md">o Woodpecker</a> é a fila de mensagens predefinida; o Kafka continua a ser totalmente suportado para os utilizadores que o preferirem. O Kafka é utilizado principalmente com o Milvus Distributed (cluster); as implementações autónomas utilizam normalmente o Woodpecker incorporado ou <a href="/docs/pt/mq_rocksmq.md">o RocksMQ</a>.</p>
<h2 id="Version-compatibility" class="common-anchor-header">Compatibilidade de versões<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
<li>O Milvus suporta apenas <strong>o Kafka 2.x e 3.x</strong>.</li>
<li>O Kafka é configurado para o Milvus Distributed (cluster) através do Helm ou do Milvus Operator.</li>
</ul>
<h2 id="Deploy-a-Milvus-cluster-with-Kafka-using-Helm" class="common-anchor-header">Implementar um cluster Milvus com o Kafka utilizando o Helm<button data-href="#Deploy-a-Milvus-cluster-with-Kafka-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-and-configure" class="common-anchor-header">Instalar e configurar<button data-href="#Install-and-configure" class="anchor-icon" translate="no">
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
    </button></h3><p>Para utilizar um serviço Kafka externo, desative o Pulsar integrado e ative o <code translate="no">externalKafka</code> numa substituição do ficheiro « <code translate="no">values.yaml</code> »; em seguida, instale o Milvus com essa configuração:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsarv3:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<span class="hljs-attr">externalKafka:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">brokerList:</span> <span class="hljs-string">&lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;</span>
  <span class="hljs-attr">securityProtocol:</span> <span class="hljs-string">SASL_SSL</span>
  <span class="hljs-attr">sasl:</span>
    <span class="hljs-attr">mechanisms:</span> <span class="hljs-string">PLAIN</span>
    <span class="hljs-attr">username:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-attr">password:</span> <span class="hljs-string">&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Para obter detalhes sobre a autenticação SASL/SSL, consulte <a href="/docs/pt/connect_kafka_ssl.md">«Ligar-se ao Kafka com SASL/SSL</a>».</p>
<h3 id="Uninstall" class="common-anchor-header">Desinstalar<button data-href="#Uninstall" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-bash">helm uninstall my-release
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-a-Milvus-cluster-with-Kafka-using-Milvus-Operator" class="common-anchor-header">Implantar um cluster Milvus com o Kafka utilizando o Milvus Operator<button data-href="#Deploy-a-Milvus-cluster-with-Kafka-using-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Com o Milvus Operator, defina « <code translate="no">spec.dependencies.msgStreamType: &quot;kafka&quot;</code> » e configure o Kafka em « <code translate="no">spec.dependencies.kafka</code> » (apenas no cluster). O « <code translate="no">kafka</code> » suporta « <code translate="no">external</code> » e « <code translate="no">inCluster</code> ».</p>
<h3 id="External-Kafka" class="common-anchor-header">Kafka externo<button data-href="#External-Kafka" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-comment"># securityProtocol supports: PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL</span>
      <span class="hljs-attr">securityProtocol:</span> <span class="hljs-string">PLAINTEXT</span>
      <span class="hljs-comment"># saslMechanisms supports: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512</span>
      <span class="hljs-attr">saslMechanisms:</span> <span class="hljs-string">PLAIN</span>
      <span class="hljs-attr">saslUsername:</span> <span class="hljs-string">&quot;&quot;</span>
      <span class="hljs-attr">saslPassword:</span> <span class="hljs-string">&quot;&quot;</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">&quot;kafka&quot;</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-attr">external:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">brokerList:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;kafkaBrokerAddr1:9092&quot;</span>
        <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;kafkaBrokerAddr2:9092&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>As configurações SASL são suportadas no Milvus Operator v0.8.5 ou posterior.</p>
</div>
<h3 id="Internal-in-cluster-Kafka" class="common-anchor-header">Kafka interno (no cluster)<button data-href="#Internal-in-cluster-Kafka" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">&quot;kafka&quot;</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-attr">inCluster:</span>
        <span class="hljs-attr">values:</span> {}  <span class="hljs-comment"># see https://artifacthub.io/packages/helm/bitnami/kafka</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<p>Aplique a configuração (partindo do princípio de que o ficheiro é <code translate="no">milvuscluster.yaml</code>):</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Uninstall" class="common-anchor-header">Desinstalar<button data-href="#Uninstall" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-bash">kubectl delete milvus my-release
<button class="copy-code-btn"></button></code></pre>
<h2 id="Notes" class="common-anchor-header">Notas<button data-href="#Notes" class="anchor-icon" translate="no">
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
<li><strong>Atualização da versão 2.5.x para a 2.6.x:</strong> <strong>Limitações da fila de mensagens</strong>: Ao atualizar para o Milvus v3.0-beta, deve manter a sua escolha atual de fila de mensagens. A mudança entre diferentes sistemas de filas de mensagens durante a atualização não é suportada. O suporte à alteração de sistemas de filas de mensagens estará disponível em versões futuras.
Se estiver a utilizar o Kafka e pretender mantê-lo, não altere a fila de mensagens durante a atualização.</li>
<li>Apenas <strong>o Kafka 2.x e 3.x</strong> são suportados.</li>
<li>Para conectividade SASL/SSL, consulte <a href="/docs/pt/connect_kafka_ssl.md">«Ligar-se ao Kafka com SASL/SSL</a>».</li>
</ul>
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
<li><a href="/docs/pt/woodpecker.md">Woodpecker (fila de mensagens predefinida)</a></li>
<li><a href="/docs/pt/switch-kafka-woodpecker.md">Alternar entre o Kafka e o Woodpecker</a></li>
</ul>
