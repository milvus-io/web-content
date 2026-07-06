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
    </button></h1><p>Milvus utilise RocksMQ, Pulsar ou Kafka pour gérer les journaux des modifications récentes, générer des journaux de flux et fournir des abonnements aux journaux. Cette rubrique explique comment configurer les dépendances de stockage des messages lors de l'installation de Milvus avec Milvus Operator. Pour plus de détails, consultez la rubrique « <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Configurer le stockage des messages avec Milvus Operator</a> » dans le référentiel Milvus Operator.</p>
<p>Cette rubrique part du principe que vous avez déployé Milvus Operator.</p>
<div class="alert note">Consultez la section « <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Déployer Milvus Operator</a> » pour plus d’informations. </div>
<p>Vous devez spécifier un fichier de configuration pour utiliser Milvus Operator afin de démarrer un cluster Milvus.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">kubectl</span> <span class="hljs-string">apply</span> <span class="hljs-string">-f</span> <span class="hljs-string">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il vous suffit de modifier le modèle de code disponible à l’adresse <code translate="no">milvus_cluster_default.yaml</code> pour configurer les dépendances tierces. Les sections suivantes expliquent comment configurer respectivement le stockage d’objets, etcd et Pulsar.</p>
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
    </button></h2><p>Le tableau ci-dessous indique si RocksMQ, Pulsar, Kafka et Woodpecker sont pris en charge dans Milvus en mode autonome et en mode cluster.</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">Pulsar</th><th style="text-align:center">Kafka</th><th style="text-align:center">Woodpecker</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">Mode autonome</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">Mode cluster</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>Il existe également d'autres restrictions concernant la configuration du stockage des messages :</p>
<ul>
<li>Un seul stockage de messages est pris en charge par instance Milvus. Cependant, la rétrocompatibilité avec la configuration de plusieurs stockages de messages pour une même instance est toujours assurée. L'ordre de priorité est le suivant :
<ul>
<li>mode autonome : RocksMQ (par défaut) &gt; Pulsar &gt; Kafka</li>
<li>mode cluster : Pulsar (par défaut) &gt; Kafka</li>
</ul></li>
<li>Le stockage des messages ne peut pas être modifié pendant que le système Milvus est en cours d’exécution.</li>
<li>Seules les versions 2.x ou 3.x de Kafka sont prises en charge.</li>
<li><strong>Restrictions de mise à niveau</strong>: <strong>Restrictions relatives aux files d’attente de messages</strong>: lors de la mise à niveau vers Milvus v2.6.19, vous devez conserver votre choix actuel de file d’attente de messages. Le passage d’un système de file d’attente de messages à un autre pendant la mise à niveau n’est pas pris en charge. La prise en charge du changement de système de file d’attente de messages sera disponible dans les versions futures.</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">Configurer RocksMQ<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>RocksMQ est le stockage de messages par défaut dans Milvus en mode autonome.</p>
<div class="alert note">
<p>Actuellement, vous ne pouvez configurer RocksMQ comme stockage de messages pour Milvus en mode autonome qu’à l’aide de Milvus Operator.</p>
</div>
<h4 id="Example" class="common-anchor-header">Exemple</h4><p>L'exemple suivant configure un service RocksMQ.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">rocksmq</span>
    <span class="hljs-attr">rocksmq:</span>
      <span class="hljs-attr">persistence:</span>
        <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">true</span>
        <span class="hljs-attr">persistentVolumeClaim:</span>
          <span class="hljs-attr">spec:</span>
            <span class="hljs-attr">accessModes:</span> [<span class="hljs-string">&quot;ReadWriteOnce&quot;</span>]
            <span class="hljs-attr">storageClassName:</span> <span class="hljs-string">&quot;local-path&quot;</span>  <span class="hljs-comment"># Specify your storage class</span>
            <span class="hljs-attr">resources:</span>
              <span class="hljs-attr">requests:</span>
                <span class="hljs-attr">storage:</span> <span class="hljs-string">10Gi</span>  <span class="hljs-comment"># Specify your desired storage size</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<h5 id="Key-configuration-options" class="common-anchor-header">Options de configuration clés :</h5><ul>
<li><code translate="no">msgStreamType</code>: rocksmq : définit explicitement RocksMQ comme file d’attente de messages</li>
<li><code translate="no">persistence.enabled</code>: Active le stockage persistant des données RocksMQ</li>
<li><code translate="no">persistence.pvcDeletion</code>: Si la valeur est « true », le PVC sera supprimé lors de la suppression de l’instance Milvus</li>
<li><code translate="no">persistentVolumeClaim.spec</code>: Spécification PVC Kubernetes standard</li>
<li><code translate="no">accessModes</code>: Généralement « <code translate="no">ReadWriteOnce</code> » pour le stockage en blocs</li>
<li><code translate="no">storageClassName</code>: Classe de stockage de votre cluster</li>
<li><code translate="no">storage</code>: Taille du volume persistant</li>
</ul>
<h2 id="Configure-Woodpecker" class="common-anchor-header">Configurer Woodpecker<button data-href="#Configure-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker est un journal d’écriture anticipée (WAL) natif du cloud, conçu pour le stockage objet. Il offre un débit élevé, une faible charge opérationnelle et une évolutivité transparente. Pour plus de détails, consultez la section <a href="/docs/fr/v2.6.x/use-woodpecker.md">Utiliser Woodpecker</a>.</p>
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
    </button></h2><p>Pulsar gère les journaux des modifications récentes, génère des flux de journaux et permet de s’abonner à ces journaux. La configuration de Pulsar en tant que stockage de messages est prise en charge aussi bien dans Milvus en mode autonome que dans un cluster Milvus. Cependant, avec Milvus Operator, vous ne pouvez configurer Pulsar comme stockage de messages que pour un cluster Milvus. Remplissez les champs obligatoires sous « <code translate="no">spec.dependencies.pulsar</code> » pour configurer Pulsar.</p>
<p><code translate="no">pulsar</code> Prise en charge de <code translate="no">external</code> et <code translate="no">inCluster</code>.</p>
<h3 id="External-Pulsar" class="common-anchor-header">Pulsar externe<button data-href="#External-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">external</code> indique l’utilisation d’un service Pulsar externe.
Les champs permettant de configurer un service Pulsar externe sont les suivants :</p>
<ul>
<li><code translate="no">external</code>:  Une valeur « <code translate="no">true</code> » indique que Milvus utilise un service Pulsar externe.</li>
<li><code translate="no">endpoints</code>: Les points de terminaison de Pulsar.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Exemple</h4><p>L'exemple suivant configure un service Pulsar externe.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span> <span class="hljs-comment"># Optional</span>
    <span class="hljs-attr">pulsar:</span> <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external pulsar as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new pulsar inside the same kubernetes cluster for milvus.</span>
      <span class="hljs-attr">external:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external pulsar endpoints if external=true</span>
      <span class="hljs-attr">endpoints:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span><span class="hljs-string">:6650</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}           
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-Pulsar" class="common-anchor-header">Pulsar interne<button data-href="#Internal-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">inCluster</code> indique que, lors du démarrage d’un cluster Milvus, un service Pulsar démarre automatiquement au sein du cluster.</p>
<h4 id="Example" class="common-anchor-header">Exemple</h4><p>L'exemple suivant configure un service Pulsar interne.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">pulsar:</span>
      <span class="hljs-attr">inCluster:</span>
        <span class="hljs-attr">values:</span>
          <span class="hljs-attr">components:</span>
            <span class="hljs-attr">autorecovery:</span> <span class="hljs-literal">false</span>
          <span class="hljs-attr">zookeeper:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
          <span class="hljs-attr">bookkeeper:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
            <span class="hljs-attr">resoureces:</span>
              <span class="hljs-attr">limit:</span>
                <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;4&#x27;</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">8Gi</span>
            <span class="hljs-attr">requests:</span>
              <span class="hljs-attr">cpu:</span> <span class="hljs-string">200m</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">512Mi</span>
          <span class="hljs-attr">broker:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
            <span class="hljs-attr">configData:</span>
              <span class="hljs-comment">## Enable `autoSkipNonRecoverableData` since bookkeeper is running</span>
              <span class="hljs-comment">## without persistence</span>
              <span class="hljs-attr">autoSkipNonRecoverableData:</span> <span class="hljs-string">&quot;true&quot;</span>
              <span class="hljs-attr">managedLedgerDefaultEnsembleSize:</span> <span class="hljs-string">&quot;1&quot;</span>
              <span class="hljs-attr">managedLedgerDefaultWriteQuorum:</span> <span class="hljs-string">&quot;1&quot;</span>
              <span class="hljs-attr">managedLedgerDefaultAckQuorum:</span> <span class="hljs-string">&quot;1&quot;</span>
          <span class="hljs-attr">proxy:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}            
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Cet exemple précise le nombre de répliques de chaque composant de Pulsar, les ressources de calcul de Pulsar BookKeeper, ainsi que d’autres paramètres de configuration.</div>
<div class="alert note">Retrouvez l’ensemble des éléments de configuration nécessaires à la configuration d’un service Pulsar interne dans <a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">le fichier values.yaml</a>. Ajoutez les éléments de configuration nécessaires sous la section « <code translate="no">pulsar.inCluster.values</code> », comme indiqué dans l’exemple précédent.</div>
<p>En supposant que le fichier de configuration s’appelle ` <code translate="no">milvuscluster.yaml</code>`, exécutez la commande suivante pour appliquer la configuration.</p>
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
    </button></h2><p>Pulsar est le stockage de messages par défaut dans un cluster Milvus. Si vous souhaitez utiliser Kafka, ajoutez le champ facultatif « <code translate="no">msgStreamType</code> » pour configurer Kafka.</p>
<p><code translate="no">kafka</code> Prend en charge <code translate="no">external</code> et <code translate="no">inCluster</code>.</p>
<h3 id="External-Kafka" class="common-anchor-header">Kafka externe<button data-href="#External-Kafka" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">external</code> indique l’utilisation d’un service Kafka externe.</p>
<p>Les champs utilisés pour configurer un service Kafka externe sont les suivants :</p>
<ul>
<li><code translate="no">external</code>: Une valeur « <code translate="no">true</code> » indique que Milvus utilise un service Kafka externe.</li>
<li><code translate="no">brokerList</code>: La liste des brokers auxquels envoyer les messages.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Exemple</h4><p>L'exemple suivant configure un service Kafka externe.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-comment"># securityProtocol supports: PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL </span>
      <span class="hljs-attr">securityProtocol:</span> <span class="hljs-string">PLAINTEXT</span>
      <span class="hljs-comment"># saslMechanisms supports: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512</span>
      <span class="hljs-attr">saslMechanisms:</span> <span class="hljs-string">PLAIN</span>
      <span class="hljs-attr">saslUsername:</span> <span class="hljs-string">&quot;&quot;</span>
      <span class="hljs-attr">saslPassword:</span> <span class="hljs-string">&quot;&quot;</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-comment"># Omit other fields ...</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">&quot;kafka&quot;</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-attr">external:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">brokerList:</span> 
        <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;kafkaBrokerAddr1:9092&quot;</span>
        <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;kafkaBrokerAddr2:9092&quot;</span>
        <span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Les configurations SASL sont prises en charge à partir de la version v0.8.5 de l'opérateur.</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">Kafka interne<button data-href="#Internal-Kafka" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">inCluster</code> indique que, lors du démarrage d’un cluster Milvus, un service Kafka démarre automatiquement au sein du cluster.</p>
<h4 id="Example" class="common-anchor-header">Exemple</h4><p>L'exemple suivant permet de configurer un service Kafka interne.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
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
        <span class="hljs-attr">values:</span> {} <span class="hljs-comment"># values can be found in https://artifacthub.io/packages/helm/bitnami/kafka</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<p>Retrouvez <a href="https://artifacthub.io/packages/helm/bitnami/kafka">ici</a> la liste complète des éléments de configuration nécessaires pour configurer un service Kafka interne. Ajoutez les éléments de configuration nécessaires sous « <code translate="no">kafka.inCluster.values</code> ».</p>
<p>En supposant que le fichier de configuration s'appelle <code translate="no">milvuscluster.yaml</code>, exécutez la commande suivante pour appliquer la configuration.</p>
<pre><code translate="no"><span class="hljs-attribute">kubectl</span> apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Étapes suivantes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Découvrez comment configurer d’autres dépendances Milvus avec Milvus Operator :</p>
<ul>
<li><a href="/docs/fr/v2.6.x/object_storage_operator.md">Configurer le stockage d’objets avec Milvus Operator</a></li>
<li><a href="/docs/fr/v2.6.x/meta_storage_operator.md">Configurer le stockage des métadonnées avec Milvus Operator</a></li>
</ul>
