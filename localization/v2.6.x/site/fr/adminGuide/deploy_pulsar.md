---
id: deploy_pulsar.md
title: Configurer le stockage des messages avec Docker Compose ou Helm
related_key: 'Pulsar, storage'
summary: >-
  Découvrez comment configurer le stockage des messages avec Docker Compose ou
  Helm.
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Configurer le stockage des messages avec Docker Compose ou Helm<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utilise Pulsar ou Kafka pour gérer les journaux des modifications récentes, produire des journaux de flux et fournir des abonnements aux journaux. Pulsar est le système de stockage de messages par défaut. Cette rubrique explique comment configurer le stockage des messages avec Docker Compose ou Helm.</p>
<p>Vous pouvez configurer Pulsar avec <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> ou sur K8s et configurer Kafka sur K8s.</p>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">Configurer Pulsar avec Docker Compose<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. Configurer Pulsar</h3><p>Pour configurer Pulsar avec Docker Compose, fournissez vos valeurs pour la section <code translate="no">pulsar</code> dans le fichier <code translate="no">milvus.yaml</code> sur le chemin milvus/configs.</p>
<pre><code translate="no"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span> <span class="hljs-comment"># Address of pulsar</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Voir les <a href="/docs/fr/configure_pulsar.md">configurations liées à Pulsar</a> pour plus d'informations.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Exécuter Milvus</h3><p>Exécuter la commande suivante pour démarrer Milvus qui utilise les configurations Pulsar.</p>
<pre><code translate="no"><span class="hljs-attribute">docker</span> compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Les configurations ne prennent effet qu'après le démarrage de Milvus. Voir <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Démarrer Milvus</a> pour plus d'informations.</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">Configurer Pulsar avec Helm<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour les clusters Milvus sur K8s, vous pouvez configurer Pulsar dans la même commande que celle qui démarre Milvus. Vous pouvez également configurer Pulsar à l'aide du fichier <code translate="no">values.yml</code> sur le chemin /charts/milvus dans le référentiel <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> avant de démarrer Milvus.</p>
<p>Pour plus de détails sur la configuration de Milvus à l'aide de Helm, voir <a href="/docs/fr/configure-helm.md">Configurer Milvus avec les cartes Helm</a>. Pour plus de détails sur les éléments de configuration liés à Pulsar, voir <a href="/docs/fr/configure_pulsar.md">Configurations liées à Pulsar</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Utilisation du fichier YAML</h3><ol>
<li>Configurer la section <code translate="no">externalConfigFiles</code> dans le fichier <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: localhost # Address of pulsar
      port: 6650 # Port of Pulsar
      webport: 80 # Web port of pulsar, if you connect direcly without proxy, should use 8080
      maxMessageSize: 5242880 # 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.
      tenant: public
      namespace: default    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Après avoir configuré les sections précédentes et enregistré le fichier <code translate="no">values.yaml</code>, exécutez la commande suivante pour installer Milvus qui utilise les configurations Pulsar.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">Configurer Kafka avec Helm<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour les clusters Milvus sur K8s, vous pouvez configurer Kafka dans la même commande que celle qui démarre Milvus. Vous pouvez également configurer Kafka à l'aide du fichier <code translate="no">values.yml</code> sur le chemin /charts/milvus dans le référentiel <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> avant de démarrer Milvus.</p>
<p>Pour plus de détails sur la configuration de Milvus à l'aide de Helm, reportez-vous à la section <a href="/docs/fr/configure-helm.md">Configurer Milvus avec les cartes Helm</a>. Pour plus de détails sur les éléments de configuration liés à Pulsar, voir <a href="/docs/fr/configure_pulsar.md">Configurations liées à Pulsar</a>.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Utilisation du fichier YAML</h3><ol>
<li>Configurez la section <code translate="no">externalConfigFiles</code> dans le fichier <code translate="no">values.yaml</code> si vous souhaitez utiliser Kafka comme système de stockage des messages.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    kafka:
      brokerList:
        -  &lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL    
</span><button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Après avoir configuré les sections précédentes et enregistré le fichier <code translate="no">values.yaml</code>, exécutez la commande suivante pour installer Milvus qui utilise les configurations Kafka.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">Configurer RocksMQ avec Helm<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus standalone utilise RocksMQ comme système de stockage de messages par défaut. Pour des étapes détaillées sur la configuration de Milvus avec Helm, reportez-vous à la section <a href="/docs/fr/configure-helm.md">Configurer Milvus avec les diagrammes Helm</a>. Pour plus de détails sur les éléments de configuration liés à RocksMQ, voir <a href="/docs/fr/configure_rocksmq.md">Configurations liées à RocksMQ</a>.</p>
<ul>
<li><p>Si vous démarrez Milvus avec RocksMQ et que vous souhaitez modifier ses paramètres, vous pouvez exécuter <code translate="no">helm upgrade -f</code> avec les paramètres modifiés dans le fichier YAML suivant.</p></li>
<li><p>Si vous avez installé Milvus de manière autonome à l'aide de Helm avec un magasin de messages autre que RocksMQ et que vous souhaitez revenir à RocksMQ, exécutez <code translate="no">helm upgrade -f</code> avec le fichier YAML suivant après avoir nettoyé toutes les collections et arrêté Milvus.</p></li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    rocksmq:
      # The path where the message is stored in rocksmq
      # please adjust in embedded Milvus: /tmp/milvus/rdb_data
      path: /var/lib/milvus/rdb_data
      lrucacheratio: 0.06 # rocksdb cache memory ratio
      rocksmqPageSize: 67108864 # 64 MB, 64 * 1024 * 1024 bytes, The size of each page of messages in rocksmq
      retentionTimeInMinutes: 4320 # 3 days, 3 * 24 * 60 minutes, The retention time of the message in rocksmq.
      retentionSizeInMB: 8192 # 8 GB, 8 * 1024 MB, The retention size of the message in rocksmq.
      compactionInterval: 86400 # 1 day, trigger rocksdb compaction every day to remove deleted data
      # compaction compression type, only support use 0,7.
      # 0 means not compress, 7 will use zstd
      # len of types means num of rocksdb level.
      compressionTypes: [0, 0, 7, 7, 7]    
</span><button class="copy-code-btn"></button></code></pre>
<div class="alert warning">
<p>Il n'est pas recommandé de changer de magasin de messages. Si vous souhaitez le faire, arrêtez toutes les opérations DDL, puis appelez l'API FlushAll pour vider toutes les collections, et enfin arrêtez Milvus à la fin avant de modifier le magasin de messages.</p>
</div>
<h2 id="Configure-NATS-with-Helm" class="common-anchor-header">Configurer NATS avec Helm<button data-href="#Configure-NATS-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS est un magasin de messages expérimental qui remplace RocksMQ. Pour des étapes détaillées sur la configuration de Milvus avec Helm, voir <a href="/docs/fr/configure-helm.md">Configurer Milvus avec Helm Charts</a>. Pour plus de détails sur les éléments de configuration liés à RocksMQ, reportez-vous aux <a href="/docs/fr/configure_natsmq.md">configurations liées à NATS</a>.</p>
<ul>
<li><p>Si vous démarrez Milvus avec NATS et que vous souhaitez modifier ses paramètres, vous pouvez exécuter <code translate="no">helm upgrade -f</code> avec les paramètres modifiés dans le fichier YAML suivant.</p></li>
<li><p>Si vous avez installé Milvus en mode autonome avec un magasin de messages autre que NATS et que vous souhaitez le remplacer par NATS, exécutez <code translate="no">helm upgrade -f</code> avec le fichier YAML suivant après avoir nettoyé toutes les collections et arrêté Milvus.</p></li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    mq:
      type: natsmq
    natsmq:
      # server side configuration for natsmq.
      server: 
        # 4222 by default, Port for nats server listening.
        port: 4222 
        # /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.
        storeDir: /var/lib/milvus/nats 
        # (B) 16GB by default, Maximum size of the &#x27;file&#x27; storage.
        maxFileStore: 17179869184 
        # (B) 8MB by default, Maximum number of bytes in a message payload.
        maxPayload: 8388608 
        # (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.
        maxPending: 67108864 
        # (√ms) 4s by default, waiting for initialization of natsmq finished.
        initializeTimeout: 4000 
        monitor:
          # false by default, If true enable debug log messages.
          debug: false 
          # true by default, If set to false, log without timestamps.
          logTime: true 
          # no log file by default, Log file path relative to.. .
          logFile: 
          # (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.
          logSizeLimit: 0 
        retention:
          # (min) 3 days by default, Maximum age of any message in the P-channel.
          maxAge: 4320 
          # (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.
          maxBytes:
          # None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    
          maxMsgs: 
</span><button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Choisir entre RocksMQ et NATS ?</strong></p>
<p>RockMQ utilise CGO pour interagir avec RocksDB et gère lui-même la mémoire, tandis que le NATS purement Go intégré dans l'installation de Milvus délègue la gestion de la mémoire au garbage collector (GC) de Go.</p>
<p>Dans le scénario où le paquet de données est inférieur à 64 kb, RocksDB est plus performant en termes d'utilisation de la mémoire, d'utilisation de l'unité centrale et de temps de réponse. En revanche, si le paquet de données est supérieur à 64 kb, NATS excelle en termes de temps de réponse avec une mémoire suffisante et une planification idéale du GC.</p>
<p>Pour l'instant, il est conseillé de n'utiliser les NATS qu'à des fins expérimentales.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Découvrez comment configurer d'autres dépendances Milvus avec Docker Compose ou Helm :</p>
<ul>
<li><a href="/docs/fr/deploy_s3.md">Configurer le stockage d'objets avec Docker Compose ou Helm</a></li>
<li><a href="/docs/fr/deploy_etcd.md">Configurer le méta stockage avec Docker Compose ou Helm</a></li>
</ul>
