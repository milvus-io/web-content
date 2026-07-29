---
id: switch-kafka-woodpecker.md
title: Passaggio da Kafka a Woodpecker
summary: >-
  Passare dalla coda dei messaggi di un cluster Milvus da Kafka a Woodpecker,
  utilizzando Helm o Milvus Operator.
---
<h1 id="Switch-between-Kafka-and-Woodpecker" class="common-anchor-header">Passaggio da Kafka a Woodpecker<button data-href="#Switch-between-Kafka-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa pagina descrive come passare dalla coda dei messaggi (MQ) di un <strong>cluster Milvus</strong> da <strong>Kafka</strong> (integrato o esterno) a <strong>Woodpecker</strong> (backend MinIO) e viceversa. Per il flusso di lavoro generale e i prerequisiti, consultare <a href="/docs/it/switch-mq-type.md">Passare a un altro tipo di MQ</a>.</p>
<div class="alert note">
<p><strong>Prerequisito:</strong> la funzionalità "Cambio MQ" è disponibile in <strong>Milvus 3.0 e versioni successive</strong>. Aggiornare l’istanza di Milvus a Milvus 3.0 o versioni successive prima di iniziare: la funzionalità non è disponibile nelle versioni precedenti.</p>
</div>
<div class="alert warning">
<p>Il cambio della coda dei messaggi è <strong>un'operazione ad alto rischio</strong>. Scegli la sezione che corrisponde <strong>al tuo</strong> metodo di distribuzione — <strong>Con Helm</strong> o <strong>Con Milvus Operator</strong> — e seguila dall'inizio alla fine. Non mescolare i comandi di Helm e Operator.</p>
</div>
<h2 id="With-Helm" class="common-anchor-header">Con Helm<button data-href="#With-Helm" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Kafka-to-Woodpecker-Helm" class="common-anchor-header">Passaggio da Kafka a Woodpecker (Helm)<button data-href="#Switch-from-Kafka-to-Woodpecker-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Passaggio 1: Verifica che l’istanza di Milvus sia in esecuzione.</strong> Assicurati che il tuo cluster Milvus funzioni correttamente — ad esempio, creando una raccolta di prova, inserendo dati ed eseguendo una query.</p>
<p><strong>Passo 2: Eseguire il cambio di MQ.</strong> Esporre l’interfaccia di gestione MixCoord, quindi chiamare l’API di cambio:</p>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>In un altro terminale:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Passaggio 3: Verifica che il passaggio sia stato completato.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Se il passaggio va a buon fine, viene registrato il messaggio " <code translate="no">[mqTypeValue=woodpecker]</code>".</p>
<p><strong>Passaggio 4: (Facoltativo) Arrestare Kafka ed eseguire la pulizia.</strong> Per Kafka <strong>integrato</strong>, rimuovere i pod Kafka e i relativi PVC. Per Kafka <strong>esterno</strong>, ripulire gli argomenti Milvus nell’istanza Kafka esterna: seguono il formato <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code>.</p>
<div class="alert note">
<p>Se si prevede di tornare a Kafka in un secondo momento, ripulire prima i dati/argomenti per evitare conflitti.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Kafka-Helm" class="common-anchor-header">Passaggio da Woodpecker a Kafka (Helm)<button data-href="#Switch-from-Woodpecker-to-Kafka-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Passaggio 1: Verificare che l’istanza di Milvus sia in esecuzione.</strong></p>
<p><strong>Passaggio 2: configurare la connessione a Kafka di destinazione e riavviare Milvus.</strong> Il passaggio richiede che Milvus conosca già la connessione a Kafka, quindi inserirla in <code translate="no">user.yaml</code> tramite <code translate="no">extraConfigFiles</code> e applicare con <code translate="no">helm upgrade</code> (che esegue il rollover dei pod). <code translate="no">streaming.enabled=true</code> è necessario per la funzionalità Switch MQ. Per i dettagli su SASL/SSL, consultare <a href="/docs/it/connect_kafka_ssl.md">Connettersi a Kafka con SASL/SSL</a>.</p>
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
<p>Attendere che tutti i pod siano pronti, quindi verificare che la configurazione di accesso a Kafka sia stata incorporata nella configurazione di Milvus.</p>
<p><strong>Passaggio 3: Eseguire il passaggio a MQ.</strong></p>
<div class="alert note">
<p>Assicurarsi che il Kafka di destinazione non contenga argomenti Milvus provenienti da una configurazione precedente. Se si tratta del primo passaggio a Kafka, ignorare questa nota; in caso contrario, eliminare prima gli argomenti Milvus residui con gli stessi nomi.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>In un altro terminale:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;kafka&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Passaggio 4: Verificare che il passaggio sia stato completato.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Se il passaggio ha esito positivo, viene registrato il messaggio " <code translate="no">[mqTypeValue=kafka]</code>".</p>
<p><strong>Passaggio 5: (Facoltativo) Eliminare i dati di Woodpecker.</strong> Eliminare i dati di Woodpecker su MinIO/S3 (nella directory <code translate="no">&lt;rootPath&gt;/wp/...</code>, in genere <code translate="no">files/wp/...</code>) e i metadati di Woodpecker in etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Se si prevede di tornare a Woodpecker in un secondo momento, eliminare prima questi file.</p>
<h2 id="With-Milvus-Operator" class="common-anchor-header">Con Milvus Operator<button data-href="#With-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Kafka-to-Woodpecker-Milvus-Operator" class="common-anchor-header">Passaggio da Kafka a Woodpecker (Milvus Operator)<button data-href="#Switch-from-Kafka-to-Woodpecker-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Passaggio 1: Verificare che l’istanza di Milvus sia in esecuzione.</strong></p>
<p><strong>Passaggio 2: Eseguire il passaggio a MQ.</strong> Il servizio MixCoord non è esposto, quindi eseguire l’API di passaggio dall’interno del pod MixCoord:</p>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Passaggio 3: Verificare che il passaggio sia stato completato.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Se il passaggio va a buon fine, viene registrato il messaggio " <code translate="no">[mqTypeValue=woodpecker]</code>".</p>
<p><strong>Passaggio 4: aggiornare il tipo di MQ nell’Operator.</strong> Aggiornare la configurazione gestita dall’Operator in modo che l’Operator non annulli il passaggio. Creare <code translate="no">change_configmap.yaml</code>:</p>
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
<p><strong>Passaggio 5: (Facoltativo) Arrestare Kafka ed eseguire la pulizia.</strong> Per Kafka <strong>integrato</strong>, rimuovere i pod Kafka e i relativi PVC. Per Kafka <strong>esterno</strong>, ripulire gli argomenti Milvus (formato <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code>).</p>
<h3 id="Switch-from-Woodpecker-to-Kafka-Milvus-Operator" class="common-anchor-header">Passaggio da Woodpecker a Kafka (Operatore Milvus)<button data-href="#Switch-from-Woodpecker-to-Kafka-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Passaggio 1: Verificare che l’istanza di Milvus sia in esecuzione.</strong></p>
<p><strong>Passaggio 2: configurare la connessione a Kafka di destinazione e riavviare Milvus.</strong> Inserire la connessione a Kafka in <code translate="no">spec.config</code> (l’Operator converte <code translate="no">spec.config</code> in <code translate="no">user.yaml</code>) e impostare il tipo di MQ; l’applicazione del CR aggiorna i pod con la nuova configurazione. Per i dettagli su SASL/SSL, consultare <a href="/docs/it/connect_kafka_ssl.md">Connettersi a Kafka con SASL/SSL</a>.</p>
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
<p>Attendere che tutti i pod siano pronti, quindi verificare che la configurazione di accesso a Kafka sia stata applicata alla configurazione di Milvus.</p>
<p><strong>Passaggio 3: Eseguire il passaggio a MQ.</strong></p>
<div class="alert note">
<p>Assicurarsi che il Kafka di destinazione non contenga argomenti Milvus provenienti da una configurazione precedente. Se si tratta del primo passaggio a Kafka, ignorare questa nota; in caso contrario, eliminare prima gli argomenti Milvus residui con gli stessi nomi.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;kafka&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Passaggio 4: verificare che il passaggio sia stato completato.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Se il passaggio va a buon fine, viene registrato il messaggio " <code translate="no">[mqTypeValue=kafka]</code>".</p>
<p><strong>Passaggio 5: (Facoltativo) Eliminare i dati di Woodpecker.</strong> Eliminare i dati di Woodpecker su MinIO/S3 (nella directory <code translate="no">&lt;rootPath&gt;/wp/...</code>, in genere <code translate="no">files/wp/...</code>) e i metadati di Woodpecker in etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Se si prevede di tornare a Woodpecker in un secondo momento, eliminare prima questi file.</p>
<h2 id="Supported-scenarios" class="common-anchor-header">Scenari supportati<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
<tr><th>MQ di origine</th><th>MQ di destinazione</th><th>Helm</th><th>Operatore Milvus</th></tr>
</thead>
<tbody>
<tr><td>Kafka integrato</td><td>Woodpecker (MinIO)</td><td><strong>Supportato</strong></td><td><strong>Supportato</strong></td></tr>
<tr><td>Kafka esterno</td><td>Woodpecker (MinIO)</td><td><strong>Supportato</strong></td><td><strong>Supportato</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Kafka esterno</td><td><strong>Supportato</strong></td><td><strong>Supportato</strong></td></tr>
<tr><td>Kafka</td><td>Woodpecker (locale)</td><td><strong>Supportato ma non consigliato</strong> (tutti i pod necessitano di un sistema di file condiviso)</td><td><strong>Non supportato</strong></td></tr>
</tbody>
</table>
