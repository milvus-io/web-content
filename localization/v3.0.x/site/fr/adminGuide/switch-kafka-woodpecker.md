---
id: switch-kafka-woodpecker.md
title: Basculer entre Kafka et Woodpecker
summary: >-
  Basculer la file d'attente de messages d'un cluster Milvus entre Kafka et
  Woodpecker, à l'aide de Helm ou de Milvus Operator.
---
<h1 id="Switch-between-Kafka-and-Woodpecker" class="common-anchor-header">Basculer entre Kafka et Woodpecker<button data-href="#Switch-between-Kafka-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page décrit comment basculer la file d’attente de messages (MQ) d’un <strong>cluster Milvus</strong> entre <strong>Kafka</strong> (intégré ou externe) et <strong>Woodpecker</strong> (backend MinIO), dans les deux sens. Pour connaître le déroulement général et les prérequis, consultez la section <a href="/docs/fr/switch-mq-type.md">Changer de type de MQ</a>.</p>
<div class="alert note">
<p><strong>Prérequis :</strong> la fonctionnalité « Switch MQ » est disponible dans <strong>Milvus 3.0 et les versions ultérieures</strong>. Mettez à niveau votre instance Milvus vers Milvus 3.0 ou une version ultérieure avant de commencer — cette fonctionnalité n’est pas disponible dans les versions antérieures.</p>
</div>
<div class="alert warning">
<p>Le changement de file d’attente de messages est une <strong>opération à haut risque</strong>. Choisissez la section qui correspond <strong>à votre</strong> méthode de déploiement — <strong>« Avec Helm</strong> » ou <strong>« Avec Milvus Operator</strong> » — et suivez-la de A à Z. Ne mélangez pas les commandes Helm et Operator.</p>
</div>
<h2 id="With-Helm" class="common-anchor-header">Avec Helm<button data-href="#With-Helm" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Kafka-to-Woodpecker-Helm" class="common-anchor-header">Passer de Kafka à Woodpecker (Helm)<button data-href="#Switch-from-Kafka-to-Woodpecker-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Étape 1 : Vérifiez que l’instance Milvus est en cours d’exécution.</strong> Assurez-vous que votre cluster Milvus fonctionne correctement — par exemple, en créant une collection de test, en y insérant des données et en exécutant une requête.</p>
<p><strong>Étape 2 : Exécutez le changement de file d’attente de messages.</strong> Exposez l’interface de gestion MixCoord, puis appelez l’API de changement :</p>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>Dans un autre terminal :</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Étape 3 : Vérifiez que la migration est terminée.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Une migration réussie génère l'entrée suivante dans le journal : <code translate="no">[mqTypeValue=woodpecker]</code>.</p>
<p><strong>Étape 4 : (Facultatif) Arrêtez Kafka et procédez au nettoyage.</strong> Pour Kafka <strong>intégré</strong>, supprimez les pods Kafka et leurs PVC. Pour Kafka <strong>externe</strong>, nettoyez les sujets Milvus dans l’instance Kafka externe — ils suivent le format <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code>.</p>
<div class="alert note">
<p>Si vous prévoyez de revenir à Kafka ultérieurement, nettoyez d’abord les données/sujets afin d’éviter tout conflit.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Kafka-Helm" class="common-anchor-header">Passer de Woodpecker à Kafka (Helm)<button data-href="#Switch-from-Woodpecker-to-Kafka-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Étape 1 : Vérifiez que l’instance Milvus est en cours d’exécution.</strong></p>
<p><strong>Étape 2 : Configurez la connexion Kafka cible et redémarrez Milvus.</strong> Le passage à Kafka nécessite que Milvus connaisse déjà la connexion Kafka ; vous devez donc l’enregistrer dans ` <code translate="no">user.yaml</code> ` via ` <code translate="no">extraConfigFiles</code> `, puis appliquer les modifications avec ` <code translate="no">helm upgrade</code> ` (ce qui redémarre les pods). Le protocole <code translate="no">streaming.enabled=true</code> est requis pour la fonctionnalité Switch MQ. Pour plus de détails sur SASL/SSL, consultez la section « <a href="/docs/fr/connect_kafka_ssl.md">Se connecter à Kafka avec SASL/SSL</a> ».</p>
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
<p>Attendez que tous les pods soient prêts, puis vérifiez que la configuration d’accès à Kafka a bien été intégrée à la configuration de Milvus.</p>
<p><strong>Étape 3 : Exécutez la migration vers MQ.</strong></p>
<div class="alert note">
<p>Assurez-vous que le serveur Kafka cible ne contient pas de sujets Milvus issus d’une configuration précédente. S’il s’agit de votre première migration vers Kafka, ignorez cette remarque ; sinon, supprimez d’abord les sujets Milvus résiduels portant les mêmes noms.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>Dans un autre terminal :</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;kafka&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Étape 4 : Vérifiez que la migration est terminée.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Une migration réussie génère le message « <code translate="no">[mqTypeValue=kafka]</code> ».</p>
<p><strong>Étape 5 : (Facultatif) Supprimez les données Woodpecker.</strong> Supprimez les données Woodpecker sur MinIO/S3 (dans le répertoire <code translate="no">&lt;rootPath&gt;/wp/...</code>, généralement <code translate="no">files/wp/...</code>) ainsi que les métadonnées Woodpecker dans etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Si vous prévoyez de revenir à Woodpecker ultérieurement, supprimez d’abord ces fichiers.</p>
<h2 id="With-Milvus-Operator" class="common-anchor-header">Avec Milvus Operator<button data-href="#With-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Kafka-to-Woodpecker-Milvus-Operator" class="common-anchor-header">Passer de Kafka à Woodpecker (Milvus Operator)<button data-href="#Switch-from-Kafka-to-Woodpecker-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Étape 1 : Vérifiez que l’instance Milvus est en cours d’exécution.</strong></p>
<p><strong>Étape 2 : Exécutez la commutation MQ.</strong> Le service MixCoord n’est pas exposé ; vous devez donc exécuter l’API de commutation depuis l’intérieur du pod MixCoord :</p>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Étape 3 : Vérifiez que la bascule est terminée.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Une migration réussie génère l'entrée suivante dans le journal : <code translate="no">[mqTypeValue=woodpecker]</code>.</p>
<p><strong>Étape 4 : Mettez à jour le type de MQ dans l’Operator.</strong> Mettez à jour la configuration gérée par l’Operator afin que celui-ci ne revienne pas en arrière. Créez <code translate="no">change_configmap.yaml</code>:</p>
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
<p><strong>Étape 5 : (Facultatif) Arrêtez Kafka et procédez au nettoyage.</strong> Pour un Kafka <strong>intégré</strong>, supprimez les pods Kafka et leurs PVC. Pour un Kafka <strong>externe</strong>, nettoyez les sujets Milvus (format <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code>).</p>
<h3 id="Switch-from-Woodpecker-to-Kafka-Milvus-Operator" class="common-anchor-header">Passer de Woodpecker à Kafka (Milvus Operator)<button data-href="#Switch-from-Woodpecker-to-Kafka-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Étape 1 : Vérifiez que l’instance Milvus est en cours d’exécution.</strong></p>
<p><strong>Étape 2 : Configurez la connexion Kafka cible et redémarrez Milvus.</strong> Placez la connexion Kafka sous <code translate="no">spec.config</code> (l’opérateur convertit <code translate="no">spec.config</code> en <code translate="no">user.yaml</code>) et définissez le type de MQ ; l’application du CR actualise les pods avec la nouvelle configuration. Pour plus de détails sur SASL/SSL, consultez la section « <a href="/docs/fr/connect_kafka_ssl.md">Se connecter à Kafka avec SASL/SSL</a> ».</p>
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
<p>Attendez que tous les pods soient prêts, puis vérifiez que la configuration d’accès à Kafka a bien été intégrée à la configuration de Milvus.</p>
<p><strong>Étape 3 : Exécutez la migration vers MQ.</strong></p>
<div class="alert note">
<p>Assurez-vous que le Kafka cible ne contient pas de sujets Milvus issus d’une configuration précédente. S’il s’agit de votre premier basculement vers Kafka, ignorez cette remarque ; sinon, supprimez d’abord les sujets Milvus résiduels portant les mêmes noms.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;kafka&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Étape 4 : Vérifiez que la migration est terminée.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Une migration réussie génère l’entrée suivante dans le journal : <code translate="no">[mqTypeValue=kafka]</code>.</p>
<p><strong>Étape 5 : (Facultatif) Supprimez les données Woodpecker.</strong> Supprimez les données Woodpecker sur MinIO/S3 (dans le répertoire <code translate="no">&lt;rootPath&gt;/wp/...</code>, généralement <code translate="no">files/wp/...</code>) ainsi que les métadonnées Woodpecker dans etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Si vous prévoyez de revenir à Woodpecker ultérieurement, supprimez d’abord ces fichiers.</p>
<h2 id="Supported-scenarios" class="common-anchor-header">Scénarios pris en charge<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
<tr><th>MQ source</th><th>MQ cible</th><th>Helm</th><th>Opérateur Milvus</th></tr>
</thead>
<tbody>
<tr><td>Kafka intégré</td><td>Woodpecker (MinIO)</td><td><strong>Prise en charge</strong></td><td><strong>Prise en charge</strong></td></tr>
<tr><td>Kafka externe</td><td>Woodpecker (MinIO)</td><td><strong>Pris en charge</strong></td><td><strong>Pris en charge</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Kafka externe</td><td><strong>Pris en charge</strong></td><td><strong>Pris en charge</strong></td></tr>
<tr><td>Kafka</td><td>Woodpecker (local)</td><td><strong>Pris en charge mais non recommandé</strong> (tous les pods doivent disposer d'un système de fichiers partagé)</td><td><strong>Non pris en charge</strong></td></tr>
</tbody>
</table>
