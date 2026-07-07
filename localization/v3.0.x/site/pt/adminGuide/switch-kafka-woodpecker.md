---
id: switch-kafka-woodpecker.md
title: Alternar entre o Kafka e o Woodpecker
summary: >-
  Alterne a fila de mensagens de um cluster Milvus entre o Kafka e o Woodpecker,
  utilizando o Helm ou o Milvus Operator.
---
<h1 id="Switch-between-Kafka-and-Woodpecker" class="common-anchor-header">Alternar entre o Kafka e o Woodpecker<button data-href="#Switch-between-Kafka-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página descreve como alternar a fila de mensagens (MQ) de um <strong>cluster Milvus</strong> entre <strong>o Kafka</strong> (integrado ou externo) e <strong>o Woodpecker</strong> (backend MinIO), em ambos os sentidos. Para conhecer o fluxo de trabalho geral e os pré-requisitos, consulte <a href="/docs/pt/switch-mq-type.md">Alternar o tipo de MQ</a>.</p>
<div class="alert note">
<p><strong>Pré-requisito:</strong> A funcionalidade «Alternar MQ» está disponível no <strong>Milvus 3.0 e versões posteriores</strong>. Atualize a sua instância do Milvus para o Milvus 3.0 ou posterior antes de começar — a funcionalidade não está disponível em versões anteriores.</p>
</div>
<div class="alert warning">
<p>A alteração da fila de mensagens é uma <strong>operação de alto risco</strong>. Escolha a secção que corresponde <strong>ao seu</strong> método de implementação — <strong>«Com o Helm»</strong> ou <strong>«Com o Milvus Operator»</strong> — e siga-a do início ao fim. Não misture comandos do Helm e do Operator.</p>
</div>
<h2 id="With-Helm" class="common-anchor-header">Com o Helm<button data-href="#With-Helm" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Kafka-to-Woodpecker-Helm" class="common-anchor-header">Mudar do Kafka para o Woodpecker (Helm)<button data-href="#Switch-from-Kafka-to-Woodpecker-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Passo 1: Verifique se a instância do Milvus está em execução.</strong> Certifique-se de que o seu cluster do Milvus está a funcionar corretamente — por exemplo, criando uma coleção de teste, inserindo dados e executando uma consulta.</p>
<p><strong>Passo 2: Execute a mudança de MQ.</strong> Abra a interface de gestão do MixCoord e, em seguida, chame a API de mudança:</p>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>Noutro terminal:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Passo 3: Verifique se a mudança foi concluída.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Uma mudança bem-sucedida regista « <code translate="no">[mqTypeValue=woodpecker]</code> ».</p>
<p><strong>Passo 4: (Opcional) Parar o Kafka e limpar.</strong> Para o Kafka <strong>integrado</strong>, remova os pods do Kafka e os respetivos PVCs. Para o Kafka <strong>externo</strong>, limpe os tópicos do Milvus na instância externa do Kafka — estes seguem o formato <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code>.</p>
<div class="alert note">
<p>Se pretender voltar a utilizar o Kafka mais tarde, elimine primeiro os dados/tópicos para evitar conflitos.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Kafka-Helm" class="common-anchor-header">Mudar do Woodpecker para o Kafka (Helm)<button data-href="#Switch-from-Woodpecker-to-Kafka-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Passo 1: Verifique se a instância do Milvus está em execução.</strong></p>
<p><strong>Passo 2: Configure a ligação ao Kafka de destino e reinicie o Milvus.</strong> A transição requer que o Milvus já conheça a ligação ao Kafka; por isso, insira-a em <code translate="no">user.yaml</code> através de <code translate="no">extraConfigFiles</code> e aplique com <code translate="no">helm upgrade</code> (o que reinicia os pods). O <code translate="no">streaming.enabled=true</code> é necessário para a funcionalidade Switch MQ. Para detalhes sobre SASL/SSL, consulte <a href="/docs/pt/connect_kafka_ssl.md">«Ligar-se ao Kafka com SASL/SSL</a>».</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># values.yaml</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    kafka:
      brokerList:
        - &lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release zilliztech/milvus \
  --set kafka.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Aguarde até que todos os pods estejam prontos e, em seguida, confirme se a configuração de acesso ao Kafka foi incorporada na configuração do Milvus.</p>
<p><strong>Passo 3: Execute a mudança para o MQ.</strong></p>
<div class="alert note">
<p>Certifique-se de que o Kafka de destino não contém tópicos do Milvus de uma configuração anterior. Se esta for a sua primeira transição para o Kafka, ignore esta nota; caso contrário, elimine primeiro os tópicos residuais do Milvus com os mesmos nomes.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>Noutro terminal:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;kafka&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Passo 4: Verifique se a transição está concluída.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Uma transição bem-sucedida regista « <code translate="no">[mqTypeValue=kafka]</code> ».</p>
<p><strong>Passo 5: (Opcional) Limpe os dados do Woodpecker.</strong> Elimine os dados do Woodpecker no MinIO/S3 (na pasta <code translate="no">&lt;rootPath&gt;/wp/...</code>, normalmente <code translate="no">files/wp/...</code>) e os metadados do Woodpecker no etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Se pretender voltar a utilizar o Woodpecker mais tarde, elimine primeiro estes ficheiros.</p>
<h2 id="With-Milvus-Operator" class="common-anchor-header">Com o Milvus Operator<button data-href="#With-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Kafka-to-Woodpecker-Milvus-Operator" class="common-anchor-header">Mudar do Kafka para o Woodpecker (Milvus Operator)<button data-href="#Switch-from-Kafka-to-Woodpecker-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Passo 1: Verifique se a instância do Milvus está em execução.</strong></p>
<p><strong>Passo 2: Execute a mudança de MQ.</strong> O serviço MixCoord não está exposto, por isso execute a API de mudança a partir do interior do pod do MixCoord:</p>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Passo 3: Verifique se a mudança foi concluída.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Uma mudança bem-sucedida regista <code translate="no">[mqTypeValue=woodpecker]</code>.</p>
<p><strong>Passo 4: Atualize o tipo de MQ no Operator.</strong> Atualize a configuração gerida pelo Operator para que este não reverta a mudança. Crie <code translate="no">change_configmap.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p><strong>Passo 5: (Opcional) Parar o Kafka e limpar.</strong> Para o Kafka <strong>integrado</strong>, remova os pods do Kafka e os respetivos PVCs. Para o Kafka <strong>externo</strong>, limpe os tópicos do Milvus (formato <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code>).</p>
<h3 id="Switch-from-Woodpecker-to-Kafka-Milvus-Operator" class="common-anchor-header">Mudar do Woodpecker para o Kafka (Operador Milvus)<button data-href="#Switch-from-Woodpecker-to-Kafka-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Passo 1: Verifique se a instância do Milvus está em execução.</strong></p>
<p><strong>Passo 2: Configure a ligação ao Kafka de destino e reinicie o Milvus.</strong> Coloque a ligação ao Kafka em <code translate="no">spec.config</code> (o Operator converte <code translate="no">spec.config</code> em <code translate="no">user.yaml</code>) e defina o tipo de MQ; ao aplicar o CR, os pods são atualizados com a nova configuração. Para detalhes sobre SASL/SSL, consulte <a href="/docs/pt/connect_kafka_ssl.md">«Ligar-se ao Kafka com SASL/SSL</a>».</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change_configmap.yaml</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-attr">brokerList:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-string">&lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;</span>
      <span class="hljs-attr">saslUsername:</span>
      <span class="hljs-attr">saslPassword:</span>
      <span class="hljs-attr">saslMechanisms:</span> <span class="hljs-string">PLAIN</span>
      <span class="hljs-attr">securityProtocol:</span> <span class="hljs-string">SASL_SSL</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">kafka</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p>Aguarde até que todos os pods estejam prontos e, em seguida, confirme se a configuração de acesso ao Kafka foi incorporada na configuração do Milvus.</p>
<p><strong>Passo 3: Execute a mudança para o MQ.</strong></p>
<div class="alert note">
<p>Certifique-se de que o Kafka de destino não contém tópicos do Milvus de uma configuração anterior. Se esta for a sua primeira mudança para o Kafka, ignore esta nota; caso contrário, elimine primeiro os tópicos residuais do Milvus com os mesmos nomes.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;kafka&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Passo 4: Verifique se a transição está concluída.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Uma transição bem-sucedida regista « <code translate="no">[mqTypeValue=kafka]</code> ».</p>
<p><strong>Passo 5: (Opcional) Limpe os dados do Woodpecker.</strong> Elimine os dados do Woodpecker no MinIO/S3 (em <code translate="no">&lt;rootPath&gt;/wp/...</code>, normalmente <code translate="no">files/wp/...</code>) e os metadados do Woodpecker no etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Se pretender voltar a utilizar o Woodpecker mais tarde, elimine primeiro estes ficheiros.</p>
<h2 id="Supported-scenarios" class="common-anchor-header">Cenários suportados<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>MQ de origem</th><th>MQ de destino</th><th>Helm</th><th>Operador Milvus</th></tr>
</thead>
<tbody>
<tr><td>Kafka integrado</td><td>Woodpecker (MinIO)</td><td><strong>Compatível</strong></td><td><strong>Compatível</strong></td></tr>
<tr><td>Kafka externo</td><td>Woodpecker (MinIO)</td><td><strong>Compatível</strong></td><td><strong>Compatível</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Kafka externo</td><td><strong>Compatível</strong></td><td><strong>Compatível</strong></td></tr>
<tr><td>Kafka</td><td>Woodpecker (local)</td><td><strong>Compatível, mas não recomendado</strong> (todos os pods necessitam de um sistema de ficheiros partilhado)</td><td><strong>Não suportado</strong></td></tr>
</tbody>
</table>
