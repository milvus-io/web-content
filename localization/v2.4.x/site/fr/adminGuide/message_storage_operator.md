---
id: message_storage_operator.md
title: Configurer le stockage des messages avec Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Découvrez comment configurer le stockage des messages avec Milvus Operator.
---
<h1 id="Configure-Message-Storage-with-Milvus-Operator" class="common-anchor-header">Configurer le stockage des messages avec Milvus Operator<button data-href="#Configure-Message-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utilise RocksMQ, Pulsar ou Kafka pour gérer les journaux des modifications récentes, produire des journaux de flux et fournir des abonnements aux journaux. Cette rubrique explique comment configurer les dépendances du stockage des messages lorsque vous installez Milvus avec Milvus Operator. Pour plus de détails, voir <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Configurer le stockage des messages avec Milvus Operator</a> dans le référentiel Milvus Operator.</p>
<p>Cette rubrique suppose que vous avez déployé Milvus Operator.</p>
<div class="alert note">Voir <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Déployer Milvus Operator</a> pour plus d'informations. </div>
<p>Vous devez spécifier un fichier de configuration pour utiliser Milvus Operator afin de démarrer un cluster Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il suffit de modifier le modèle de code dans <code translate="no">milvus_cluster_default.yaml</code> pour configurer les dépendances tierces. Les sections suivantes présentent la configuration du stockage d'objets, d'etcd et de Pulsar respectivement.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Avant de commencer<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tableau ci-dessous indique si RocksMQ, NATS, Pulsar et Kafka sont pris en charge dans Milvus en mode autonome et en mode cluster.</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">NATS</th><th style="text-align:center">Pulsar</th><th style="text-align:center">Kafka</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">Mode autonome</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">Mode cluster</td><td style="text-align:center">✖️</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Il existe également d'autres limitations pour la spécification du stockage des messages :</p>
<ul>
<li>Un seul stockage de messages pour une instance Milvus est pris en charge. Toutefois, il existe toujours une compatibilité ascendante avec les stockages de messages multiples définis pour une instance. La priorité est la suivante<ul>
<li>mode autonome :  RocksMQ (par défaut) &gt; Pulsar &gt; Kafka</li>
<li>mode cluster : Pulsar (par défaut) &gt; Kafka</li>
<li>Les nats introduits dans la version 2.3 ne participent pas à ces règles de priorité pour des raisons de compatibilité ascendante.</li>
</ul></li>
<li>Le stockage des messages ne peut pas être modifié lorsque le système Milvus est en cours d'exécution.</li>
<li>Seule la version 2.x ou 3.x de Kafka est prise en charge.</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">Configuration de RocksMQ<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>RocksMQ est le stockage de messages par défaut dans Milvus standalone.</p>
<div class="alert note">
<p>Actuellement, vous ne pouvez configurer RocksMQ comme stockage de messages pour Milvus standalone qu'avec Milvus Operator.</p>
</div>
<h4 id="Example" class="common-anchor-header">Exemple de configuration</h4><p>L'exemple suivant configure un service RocksMQ.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: {}
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-NATS" class="common-anchor-header">Configuration de NATS<button data-href="#Configure-NATS" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS est un stockage de messages alternatif pour NATS.</p>
<h4 id="Example" class="common-anchor-header">Exemple</h4><p>L'exemple suivant configure un service NATS.</p>
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
<p>Pour migrer le stockage de messages de RocksMQ vers NATS, procédez comme suit :</p>
<ol>
<li><p>Arrêtez toutes les opérations DDL.</p></li>
<li><p>Appeler l'API FlushAll et arrêter Milvus une fois que l'appel API a fini de s'exécuter.</p></li>
<li><p>Remplacer <code translate="no">msgStreamType</code> par <code translate="no">natsmq</code> et apporter les modifications nécessaires aux paramètres NATS dans <code translate="no">spec.dependencies.natsmq</code>.</p></li>
<li><p>Redémarrer Milvus et vérifier si :</p>
<ul>
<li>Une entrée de journal indiquant <code translate="no">mqType=natsmq</code> est présente dans les journaux.</li>
<li>Un répertoire nommé <code translate="no">jetstream</code> est présent dans le répertoire spécifié dans <code translate="no">spec.dependencies.natsmq.server.storeDir</code>.</li>
</ul></li>
<li><p>(Facultatif) Sauvegarder et nettoyer les fichiers de données dans le répertoire de stockage RocksMQ.</p></li>
</ol>
<div class="alert note">
<p><strong>Choisir entre RocksMQ et NATS ?</strong></p>
<p>RockMQ utilise CGO pour interagir avec RocksDB et gère lui-même la mémoire, tandis que le NATS purement Go intégré dans l'installation Milvus délègue la gestion de la mémoire au garbage collector (GC) de Go.</p>
<p>Dans le scénario où le paquet de données est inférieur à 64 kb, RocksDB est plus performant en termes d'utilisation de la mémoire, d'utilisation de l'unité centrale et de temps de réponse. En revanche, si le paquet de données est supérieur à 64 kb, NATS excelle en termes de temps de réponse avec une mémoire suffisante et une planification idéale du GC.</p>
<p>Pour l'instant, il est conseillé de n'utiliser le NATS que pour des expériences.</p>
</div>
<h2 id="Configure-Pulsar" class="common-anchor-header">Configurer Pulsar<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar gère les journaux des modifications récentes, produit des journaux de flux et fournit des abonnements aux journaux. La configuration de Pulsar pour le stockage des messages est prise en charge à la fois dans Milvus standalone et Milvus cluster. Toutefois, avec Milvus Operator, vous ne pouvez configurer Pulsar comme stockage de messages que pour Milvus cluster. Ajouter les champs obligatoires sous <code translate="no">spec.dependencies.pulsar</code> pour configurer Pulsar.</p>
<p><code translate="no">pulsar</code> prend en charge <code translate="no">external</code> et <code translate="no">inCluster</code>.</p>
<h3 id="External-Pulsar" class="common-anchor-header">Pulsar externe</h3><p><code translate="no">external</code> indique l'utilisation d'un service Pulsar externe. Les champs utilisés pour configurer un service Pulsar externe sont les suivants :</p>
<ul>
<li><code translate="no">external</code>:  Une valeur <code translate="no">true</code> indique que Milvus utilise un service Pulsar externe.</li>
<li><code translate="no">endpoints</code>: Les points d'extrémité de Pulsar.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Exemple de configuration d'un service Pulsar externe</h4><p>L'exemple suivant configure un service Pulsar externe.</p>
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
<h3 id="Internal-Pulsar" class="common-anchor-header">Pulsar interne</h3><p><code translate="no">inCluster</code> indique que lorsqu'un cluster Milvus démarre, un service Pulsar démarre automatiquement dans le cluster.</p>
<h4 id="Example" class="common-anchor-header">Exemple</h4><p>L'exemple suivant configure un service Pulsar interne.</p>
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
<div class="alert note">Cet exemple spécifie le nombre de répliques de chaque composant de Pulsar, les ressources de calcul de Pulsar BookKeeper et d'autres configurations.</div>
<div class="alert note">Vous trouverez les éléments de configuration complets pour configurer un service Pulsar interne dans <a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">values.yaml</a>. Ajoutez les éléments de configuration nécessaires sous <code translate="no">pulsar.inCluster.values</code> comme indiqué dans l'exemple précédent.</div>
<p>En supposant que le fichier de configuration s'appelle <code translate="no">milvuscluster.yaml</code>, exécutez la commande suivante pour appliquer la configuration.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka" class="common-anchor-header">Configurer Kafka<button data-href="#Configure-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar est le stockage de messages par défaut dans un cluster Milvus. Si vous souhaitez utiliser Kafka, ajoutez le champ facultatif <code translate="no">msgStreamType</code> pour configurer Kafka.</p>
<p><code translate="no">kafka</code> prend en charge <code translate="no">external</code> et <code translate="no">inCluster</code>.</p>
<h3 id="External-Kafka" class="common-anchor-header">Kafka externe</h3><p><code translate="no">external</code> indique l'utilisation d'un service Kafka externe.</p>
<p>Les champs utilisés pour configurer un service Kafka externe sont les suivants :</p>
<ul>
<li><code translate="no">external</code>: La valeur <code translate="no">true</code> indique que Milvus utilise un service Kafka externe.</li>
<li><code translate="no">brokerList</code>: La liste des courtiers auxquels envoyer les messages.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Exemple</h4><p>L'exemple suivant configure un service Kafka externe.</p>
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
<p>Les configurations SASL sont prises en charge dans la version 0.8.5 ou supérieure de l'opérateur.</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">Kafka interne</h3><p><code translate="no">inCluster</code> indique que lorsqu'un cluster Milvus démarre, un service Kafka démarre automatiquement dans le cluster.</p>
<h4 id="Example" class="common-anchor-header">Exemple de configuration</h4><p>L'exemple suivant configure un service Kafka interne.</p>
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
<p>Vous trouverez les éléments de configuration complets pour configurer un service Kafka interne <a href="https://artifacthub.io/packages/helm/bitnami/kafka">ici</a>. Ajoutez les éléments de configuration nécessaires sous <code translate="no">kafka.inCluster.values</code>.</p>
<p>En supposant que le fichier de configuration s'appelle <code translate="no">milvuscluster.yaml</code>, exécutez la commande suivante pour appliquer la configuration.</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Apprenez à configurer d'autres dépendances Milvus avec Milvus Operator :</p>
<ul>
<li><a href="/docs/fr/v2.4.x/object_storage_operator.md">Configurer le stockage d'objets avec Milvus Operator</a></li>
<li><a href="/docs/fr/v2.4.x/meta_storage_operator.md">Configurer le méta stockage avec Milvus Operator</a></li>
</ul>
