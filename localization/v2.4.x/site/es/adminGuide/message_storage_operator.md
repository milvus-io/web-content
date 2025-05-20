---
id: message_storage_operator.md
title: Configurar el almacenamiento de mensajes con Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Aprenda a configurar el almacenamiento de mensajes con Milvus Operator.
---
<h1 id="Configure-Message-Storage-with-Milvus-Operator" class="common-anchor-header">Configurar el almacenamiento de mensajes con Milvus Operator<button data-href="#Configure-Message-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utiliza RocksMQ, Pulsar o Kafka para gestionar registros de cambios recientes, emitir registros de flujo y proporcionar suscripciones a registros. Este tema presenta cómo configurar las dependencias de almacenamiento de mensajes cuando instala Milvus con Milvus Operator. Para más detalles, consulte <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Configurar el almacenamiento de mensajes con Milvus Operator</a> en el repositorio de Milvus Operator.</p>
<p>Este tema asume que usted ha desplegado Milvus Operator.</p>
<div class="alert note">Consulte <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Despliegue de Milvus Operator</a> para obtener más información. </div>
<p>Necesita especificar un archivo de configuración para utilizar Milvus Operator para iniciar un cluster Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sólo necesita editar la plantilla de código en <code translate="no">milvus_cluster_default.yaml</code> para configurar las dependencias de terceros. Las siguientes secciones presentan cómo configurar el almacenamiento de objetos, etcd y Pulsar respectivamente.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Antes de empezar<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>La siguiente tabla muestra si RocksMQ, NATS, Pulsar y Kafka son compatibles con Milvus en modo autónomo y en clúster.</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">NATS</th><th style="text-align:center">Pulsar</th><th style="text-align:center">Kafka</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">Modo autónomo</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">Modo clúster</td><td style="text-align:center">✖️</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>También hay otras limitaciones para especificar el almacenamiento de mensajes:</p>
<ul>
<li>Sólo se admite un almacenamiento de mensajes para una instancia de Milvus. Sin embargo, todavía tenemos compatibilidad con múltiples almacenamientos de mensajes establecidos para una instancia. La prioridad es la siguiente<ul>
<li>modo autónomo:  RocksMQ (por defecto) &gt; Pulsar &gt; Kafka</li>
<li>modo clúster: Pulsar (por defecto) &gt; Kafka</li>
<li>Los Nats introducidos en 2.3 no participan en estas reglas de prioridad por compatibilidad con versiones anteriores.</li>
</ul></li>
<li>El almacenamiento de mensajes no puede cambiarse mientras el sistema Milvus está en funcionamiento.</li>
<li>Sólo se admite la versión 2.x o 3.x de Kafka.</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">Configurar RocksMQ<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>RocksMQ es el almacenamiento de mensajes por defecto en Milvus standalone.</p>
<div class="alert note">
<p>Actualmente, sólo puede configurar RocksMQ como almacenamiento de mensajes para Milvus standalone con Milvus Operator.</p>
</div>
<h4 id="Example" class="common-anchor-header">Ejemplo</h4><p>El siguiente ejemplo configura un servicio RocksMQ.</p>
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
    </button></h2><p>NATS es un almacenamiento de mensajes alternativo para NATS.</p>
<h4 id="Example" class="common-anchor-header">Ejemplo</h4><p>El siguiente ejemplo configura un servicio NATS.</p>
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
<p>Para migrar el almacenamiento de mensajes de RocksMQ a NATS, haga lo siguiente:</p>
<ol>
<li><p>Detenga todas las operaciones DDL.</p></li>
<li><p>Llame a la API FlushAll y luego detenga Milvus una vez que la llamada a la API termine de ejecutarse.</p></li>
<li><p>Cambie <code translate="no">msgStreamType</code> a <code translate="no">natsmq</code> y realice los cambios necesarios en la configuración de NATS en <code translate="no">spec.dependencies.natsmq</code>.</p></li>
<li><p>Inicie Milvus de nuevo y compruebe si</p>
<ul>
<li>Hay una entrada de registro con el nombre <code translate="no">mqType=natsmq</code> en los registros.</li>
<li>Hay un directorio llamado <code translate="no">jetstream</code> en el directorio especificado en <code translate="no">spec.dependencies.natsmq.server.storeDir</code>.</li>
</ul></li>
<li><p>(Opcional) Haga una copia de seguridad y limpie los archivos de datos en el directorio de almacenamiento de RocksMQ.</p></li>
</ol>
<div class="alert note">
<p><strong>¿Elegir entre RocksMQ y NATS?</strong></p>
<p>RockMQ utiliza CGO para interactuar con RocksDB y gestiona la memoria por sí mismo, mientras que el NATS puro de Go incrustado en la instalación de Milvus delega su gestión de memoria al recolector de basura (GC) de Go.</p>
<p>En el escenario en el que el paquete de datos es inferior a 64 kb, RocksDB supera en términos de uso de memoria, uso de CPU y tiempo de respuesta. Por otro lado, si el paquete de datos es mayor de 64 kb, NATS sobresale en términos de tiempo de respuesta con suficiente memoria y una programación ideal del GC.</p>
<p>Actualmente, se recomienda utilizar NATS sólo para experimentos.</p>
</div>
<h2 id="Configure-Pulsar" class="common-anchor-header">Configurar Pulsar<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar gestiona los registros de cambios recientes, genera registros de flujo y proporciona suscripciones a registros. Configurar Pulsar para el almacenamiento de mensajes está soportado tanto en Milvus standalone como en Milvus cluster. Sin embargo, con Milvus Operator, sólo puede configurar Pulsar como almacenamiento de mensajes para Milvus cluster. Añada los campos necesarios en <code translate="no">spec.dependencies.pulsar</code> para configurar Pulsar.</p>
<p><code translate="no">pulsar</code> admite <code translate="no">external</code> y <code translate="no">inCluster</code>.</p>
<h3 id="External-Pulsar" class="common-anchor-header">Pulsar externo</h3><p><code translate="no">external</code> indica que se utiliza un servicio Pulsar externo. Los campos utilizados para configurar un servicio Pulsar externo incluyen:</p>
<ul>
<li><code translate="no">external</code>:  Un valor <code translate="no">true</code> indica que Milvus utiliza un servicio Pulsar externo.</li>
<li><code translate="no">endpoints</code>: Los puntos finales de Pulsar.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Ejemplo</h4><p>El siguiente ejemplo configura un servicio Pulsar externo.</p>
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
<h3 id="Internal-Pulsar" class="common-anchor-header">Pulsar interno</h3><p><code translate="no">inCluster</code> indica que cuando se inicia un clúster Milvus, se inicia automáticamente un servicio Pulsar en el clúster.</p>
<h4 id="Example" class="common-anchor-header">Ejemplo</h4><p>El siguiente ejemplo configura un servicio Pulsar interno.</p>
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
<div class="alert note">Este ejemplo especifica el número de réplicas de cada componente de Pulsar, los recursos informáticos de Pulsar BookKeeper y otras configuraciones.</div>
<div class="alert note">Encuentra los elementos de configuración completos para configurar un servicio Pulsar interno en <a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">values.yaml</a>. Añade los elementos de configuración que necesites en <code translate="no">pulsar.inCluster.values</code> como se muestra en el ejemplo anterior.</div>
<p>Suponiendo que el archivo de configuración se llama <code translate="no">milvuscluster.yaml</code>, ejecute el siguiente comando para aplicar la configuración.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka" class="common-anchor-header">Configurar Kafka<button data-href="#Configure-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar es el almacenamiento de mensajes predeterminado en un clúster Milvus. Si desea utilizar Kafka, añada el campo opcional <code translate="no">msgStreamType</code> para configurar Kafka.</p>
<p><code translate="no">kafka</code> admite <code translate="no">external</code> y <code translate="no">inCluster</code>.</p>
<h3 id="External-Kafka" class="common-anchor-header">Kafka externo</h3><p><code translate="no">external</code> indica que se utiliza un servicio Kafka externo.</p>
<p>Los campos utilizados para configurar un servicio Kafka externo incluyen:</p>
<ul>
<li><code translate="no">external</code>: Un valor <code translate="no">true</code> indica que Milvus utiliza un servicio Kafka externo.</li>
<li><code translate="no">brokerList</code>: La lista de brokers a los que enviar los mensajes.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Ejemplo</h4><p>El siguiente ejemplo configura un servicio Kafka externo.</p>
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
<p>Las configuraciones SASL son compatibles con el operador v0.8.5 o versiones superiores.</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">Kafka interno</h3><p><code translate="no">inCluster</code> indica que cuando se inicia un cluster Milvus, se inicia automáticamente un servicio Kafka en el cluster.</p>
<h4 id="Example" class="common-anchor-header">Ejemplo</h4><p>El siguiente ejemplo configura un servicio Kafka interno.</p>
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
<p>Encuentre los elementos de configuración completos para configurar un servicio Kafka interno <a href="https://artifacthub.io/packages/helm/bitnami/kafka">aquí</a>. Añada los elementos de configuración que necesite en <code translate="no">kafka.inCluster.values</code>.</p>
<p>Suponiendo que el archivo de configuración se llama <code translate="no">milvuscluster.yaml</code>, ejecute el siguiente comando para aplicar la configuración.</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Aprenda a configurar otras dependencias de Milvus con Milvus Operator:</p>
<ul>
<li><a href="/docs/es/v2.4.x/object_storage_operator.md">Configure Object Storage con Milvus Operator</a></li>
<li><a href="/docs/es/v2.4.x/meta_storage_operator.md">Configure Meta Storage con Milvus Operator</a></li>
</ul>
