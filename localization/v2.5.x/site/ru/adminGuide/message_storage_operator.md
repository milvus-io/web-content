---
id: message_storage_operator.md
title: Настройка хранилища сообщений в Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: 'Узнайте, как настроить хранение сообщений с помощью Milvus Operator.'
---
<h1 id="Configure-Message-Storage-with-Milvus-Operator" class="common-anchor-header">Настройка хранилища сообщений в Milvus Operator<button data-href="#Configure-Message-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus использует RocksMQ, Pulsar или Kafka для управления журналами последних изменений, вывода потоковых журналов и предоставления подписок на журналы. В этой теме описывается настройка зависимостей хранилища сообщений при установке Milvus с Milvus Operator. Дополнительные сведения см. в разделе <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Настройка хранилища сообщений с Milvus Operator</a> в репозитории Milvus Operator.</p>
<p>В этой теме предполагается, что вы развернули Milvus Operator.</p>
<div class="alert note">Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Развертывание Milvus Operator</a>. </div>
<p>Вам нужно указать файл конфигурации для использования Milvus Operator для запуска кластера Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Для настройки сторонних зависимостей достаточно отредактировать шаблон кода в <code translate="no">milvus_cluster_default.yaml</code>. В следующих разделах описывается настройка объектного хранилища, etcd и Pulsar соответственно.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Прежде чем начать<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>В таблице ниже показано, поддерживаются ли RocksMQ, NATS, Pulsar и Kafka в автономном и кластерном режиме Milvus.</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">NATS</th><th style="text-align:center">Pulsar</th><th style="text-align:center">Kafka</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">Автономный режим</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">Кластерный режим</td><td style="text-align:center">✖️</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Существуют и другие ограничения на указание хранилища сообщений:</p>
<ul>
<li>Поддерживается только одно хранилище сообщений для одного экземпляра Milvus. Однако у нас сохраняется обратная совместимость с несколькими хранилищами сообщений, установленными для одного экземпляра. Приоритет следующий:<ul>
<li>автономный режим:  RocksMQ (по умолчанию) &gt; Pulsar &gt; Kafka</li>
<li>кластерный режим: Pulsar (по умолчанию) &gt; Kafka</li>
<li>Наборы, представленные в версии 2.3, не участвуют в этих правилах приоритета в целях обратной совместимости.</li>
</ul></li>
<li>Хранилище сообщений не может быть изменено во время работы системы Milvus.</li>
<li>Поддерживается только версия Kafka 2.x или 3.x.</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">Настройка RocksMQ<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>RocksMQ - это хранилище сообщений по умолчанию в автономной системе Milvus.</p>
<div class="alert note">
<p>В настоящее время настроить RocksMQ в качестве хранилища сообщений для Milvus standalone можно только с помощью Milvus Operator.</p>
</div>
<h4 id="Example" class="common-anchor-header">Пример</h4><p>В следующем примере настраивается служба RocksMQ.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: milvus
spec:
  mode: standalone
  dependencies:
    msgStreamType: rocksmq
    rocksmq:
      persistence:
        enabled: <span class="hljs-literal">true</span>
        pvcDeletion: <span class="hljs-literal">true</span>
        persistentVolumeClaim:
          spec:
            accessModes: [<span class="hljs-string">&quot;ReadWriteOnce&quot;</span>]
            storageClassName: <span class="hljs-string">&quot;local-path&quot;</span>  <span class="hljs-comment"># Specify your storage class</span>
            resources:
              requests:
                storage: 10Gi  <span class="hljs-comment"># Specify your desired storage size</span>
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h5 id="Key-configuration-options" class="common-anchor-header">Основные параметры конфигурации:</h5><ul>
<li><code translate="no">msgStreamType</code>: rocksmq: Явно устанавливает RocksMQ в качестве очереди сообщений.</li>
<li><code translate="no">persistence.enabled</code>: Включает постоянное хранение данных RocksMQ.</li>
<li><code translate="no">persistence.pvcDeletion</code>: При значении true, PVC будет удаляться при удалении экземпляра Milvus.</li>
<li><code translate="no">persistentVolumeClaim.spec</code>: Стандартная спецификация Kubernetes PVC</li>
<li><code translate="no">accessModes</code>: Обычно <code translate="no">ReadWriteOnce</code> для блочного хранилища.</li>
<li><code translate="no">storageClassName</code>: Класс хранилища вашего кластера</li>
<li><code translate="no">storage</code>: Размер постоянного тома</li>
</ul>
<h2 id="Configure-NATS" class="common-anchor-header">Настройка NATS<button data-href="#Configure-NATS" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS - это альтернативное хранилище сообщений для NATS.</p>
<h4 id="Example" class="common-anchor-header">Пример</h4><p>В следующем примере настраивается служба NATS.</p>
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
<p>Чтобы перенести хранилище сообщений с RocksMQ на NATS, сделайте следующее:</p>
<ol>
<li><p>Остановите все операции DDL.</p></li>
<li><p>Вызовите API FlushAll, а затем остановите Milvus после завершения выполнения вызова API.</p></li>
<li><p>Измените <code translate="no">msgStreamType</code> на <code translate="no">natsmq</code> и внесите необходимые изменения в настройки NATS на <code translate="no">spec.dependencies.natsmq</code>.</p></li>
<li><p>Снова запустите Milvus и проверьте:</p>
<ul>
<li>В журналах присутствует запись с текстом <code translate="no">mqType=natsmq</code>.</li>
<li>Каталог с именем <code translate="no">jetstream</code> присутствует в каталоге, указанном в <code translate="no">spec.dependencies.natsmq.server.storeDir</code>.</li>
</ul></li>
<li><p>(Необязательно) Создайте резервную копию и очистите файлы данных в каталоге хранения RocksMQ.</p></li>
</ol>
<div class="alert note">
<p><strong>Выбор между RocksMQ и NATS?</strong></p>
<p>RocksMQ использует CGO для взаимодействия с RocksDB и самостоятельно управляет памятью, в то время как NATS, встроенный в Milvus, делегирует управление памятью сборщику мусора (GC) Go.</p>
<p>В сценарии, когда пакет данных меньше 64 кб, RocksDB превосходит по использованию памяти, загрузке процессора и времени отклика. С другой стороны, если пакет данных больше 64 кб, NATS превосходит по времени отклика при достаточном объеме памяти и идеальном планировании GC.</p>
<p>В настоящее время рекомендуется использовать NATS только для экспериментов.</p>
</div>
<h2 id="Configure-Pulsar" class="common-anchor-header">Настройка Pulsar<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar управляет журналами последних изменений, выводит потоковые журналы и обеспечивает подписку на журналы. Настройка Pulsar для хранения сообщений поддерживается как в автономном Milvus, так и в кластере Milvus. Однако в Milvus Operator вы можете настроить Pulsar в качестве хранилища сообщений только для кластера Milvus. Для настройки Pulsar добавьте необходимые поля в поле <code translate="no">spec.dependencies.pulsar</code>.</p>
<p><code translate="no">pulsar</code> Поддерживаются <code translate="no">external</code> и <code translate="no">inCluster</code>.</p>
<h3 id="External-Pulsar" class="common-anchor-header">Внешний Pulsar</h3><p><code translate="no">external</code> указывает на использование внешней службы Pulsar. Поля, используемые для настройки внешней службы Pulsar, включают:</p>
<ul>
<li><code translate="no">external</code>:  Значение <code translate="no">true</code> указывает на то, что Milvus использует внешнюю службу Pulsar.</li>
<li><code translate="no">endpoints</code>: Конечные точки Pulsar.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Пример</h4><p>В следующем примере настраивается внешняя служба Pulsar.</p>
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
<h3 id="Internal-Pulsar" class="common-anchor-header">Внутренний Pulsar</h3><p><code translate="no">inCluster</code> указывает, что при запуске кластера Milvus в нем автоматически запускается служба Pulsar.</p>
<h4 id="Example" class="common-anchor-header">Пример</h4><p>В следующем примере настраивается внутренняя служба Pulsar.</p>
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
<div class="alert note">В этом примере указывается количество реплик каждого компонента Pulsar, вычислительные ресурсы Pulsar BookKeeper и другие конфигурации.</div>
<div class="alert note">Полный набор элементов конфигурации для настройки внутреннего сервиса Pulsar находится в <a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">values.yaml</a>. Добавьте необходимые элементы конфигурации в файл <code translate="no">pulsar.inCluster.values</code>, как показано в предыдущем примере.</div>
<p>Предполагая, что файл конфигурации имеет имя <code translate="no">milvuscluster.yaml</code>, выполните следующую команду, чтобы применить конфигурацию.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka" class="common-anchor-header">Настройка Kafka<button data-href="#Configure-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar - это хранилище сообщений по умолчанию в кластере Milvus. Если вы хотите использовать Kafka, добавьте необязательное поле <code translate="no">msgStreamType</code> для настройки Kafka.</p>
<p><code translate="no">kafka</code> Поддерживаются <code translate="no">external</code> и <code translate="no">inCluster</code>.</p>
<h3 id="External-Kafka" class="common-anchor-header">Внешняя Kafka</h3><p><code translate="no">external</code> указывает на использование внешней службы Kafka.</p>
<p>Поля, используемые для настройки внешнего сервиса Kafka, включают:</p>
<ul>
<li><code translate="no">external</code>: Значение <code translate="no">true</code> указывает на то, что Milvus использует внешнюю службу Kafka.</li>
<li><code translate="no">brokerList</code>: Список брокеров для отправки сообщений.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Пример</h4><p>В следующем примере настраивается внешний сервис Kafka.</p>
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
<p>Конфигурации SASL поддерживаются в версии оператора v0.8.5 или выше.</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">Внутренний Kafka</h3><p><code translate="no">inCluster</code> указывает, что при запуске кластера Milvus в нем автоматически запускается служба Kafka.</p>
<h4 id="Example" class="common-anchor-header">Пример</h4><p>В следующем примере настраивается внутренняя служба Kafka.</p>
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
<p>Полный список элементов конфигурации для настройки внутренней службы Kafka можно найти <a href="https://artifacthub.io/packages/helm/bitnami/kafka">здесь</a>. Добавьте необходимые элементы конфигурации по адресу <code translate="no">kafka.inCluster.values</code>.</p>
<p>Предполагая, что файл конфигурации имеет имя <code translate="no">milvuscluster.yaml</code>, выполните следующую команду, чтобы применить конфигурацию.</p>
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
    </button></h2><p>Узнайте, как настроить другие зависимости Milvus с помощью Milvus Operator:</p>
<ul>
<li><a href="/docs/ru/object_storage_operator.md">Настройка объектного хранилища с помощью Milvus Operator</a></li>
<li><a href="/docs/ru/meta_storage_operator.md">Настройка метахранилища с помощью Milvus Operator</a></li>
</ul>
