---
id: meta_storage_operator.md
title: Configurer Meta Storage avec Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Découvrez comment configurer le méta stockage avec Milvus Operator.
---
<h1 id="Configure-Meta-Storage-with-Milvus-Operator" class="common-anchor-header">Configurer le stockage des métadonnées avec Milvus Operator<button data-href="#Configure-Meta-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utilise etcd pour stocker les métadonnées. Cette rubrique explique comment configurer la dépendance du méta stockage lorsque vous installez Milvus avec Milvus Operator. Pour plus de détails, voir <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md">Configurer le méta stockage avec Milvus Operator</a> dans le référentiel Milvus Operator.</p>
<p>Cette rubrique suppose que vous avez déployé Milvus Operator.</p>
<div class="alert note">Voir <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Déployer Milvus Operator</a> pour plus d'informations. </div>
<p>Vous devez spécifier un fichier de configuration pour utiliser Milvus Operator afin de démarrer un cluster Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il suffit de modifier le modèle de code dans <code translate="no">milvus_cluster_default.yaml</code> pour configurer les dépendances tierces. Les sections suivantes expliquent comment configurer le stockage d'objets, etcd et Pulsar respectivement.</p>
<h2 id="Configure-etcd" class="common-anchor-header">Configurer etcd<button data-href="#Configure-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p>Ajoutez les champs requis sous <code translate="no">spec.dependencies.etcd</code> pour configurer etcd.</p>
<p><code translate="no">etcd</code> prend en charge <code translate="no">external</code> et <code translate="no">inCluster</code>.</p>
<p>Les champs utilisés pour configurer un service etcd externe sont les suivants :</p>
<ul>
<li><code translate="no">external</code>: La valeur <code translate="no">true</code> indique que Milvus utilise un service etcd externe.</li>
<li><code translate="no">endpoints</code>: Les points d'extrémité de etcd.</li>
</ul>
<h3 id="External-etcd" class="common-anchor-header">Service etcd externe</h3><h4 id="Example" class="common-anchor-header">Exemple de configuration d'un service etcd externe</h4><p>L'exemple suivant configure un service etcd externe.</p>
<pre><code translate="no" class="language-YAML">kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies: <span class="hljs-comment"># Optional</span>
    etcd: <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external etcd as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new etcd inside the same kubernetes cluster for milvus.</span>
      external: true <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external etcd endpoints if external=true</span>
      endpoints:
      - <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>:<span class="hljs-number">2379</span>
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-etcd" class="common-anchor-header">Le service etcd interne</h3><p><code translate="no">inCluster</code> indique que lorsqu'un cluster Milvus démarre, un service etcd démarre automatiquement dans le cluster.</p>
<h4 id="Example" class="common-anchor-header">Exemple de configuration d'un service etcd interne</h4><p>L'exemple suivant configure un service etcd interne.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    etcd:
      inCluster:
        values:
          replicaCount: 5
          resources:
            limits: 
              cpu: <span class="hljs-string">&#x27;4&#x27;</span>
              memory: 8Gi
            requests:
              cpu: 200m
              memory: 512Mi
  components: {}
  config: {}              
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">L'exemple précédent spécifie le nombre de répliques comme <code translate="no">5</code> et limite les ressources de calcul pour etcd.</div>
<div class="alert note">Vous trouverez les éléments de configuration complets pour configurer un service etcd interne dans <a href="https://github.com/bitnami/charts/blob/ba6f8356e725a8342fe738a3b73ae40d5488b2ad/bitnami/etcd/values.yaml">values.yaml</a>. Ajoutez les éléments de configuration nécessaires sous <code translate="no">etcd.inCluster.values</code> comme indiqué dans l'exemple précédent.</div>
<p>En supposant que le fichier de configuration s'appelle <code translate="no">milvuscluster.yaml</code>, exécutez la commande suivante pour appliquer la configuration.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
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
<li><a href="/docs/fr/v2.4.x/message_storage_operator.md">Configurer le stockage des messages avec Milvus Operator</a></li>
</ul>
