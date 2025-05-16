---
id: object_storage_operator.md
title: Configurer le stockage d'objets avec Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Découvrez comment configurer le stockage d'objets avec Milvus Operator.
---
<h1 id="Configure-Object-Storage-with-Milvus-Operator" class="common-anchor-header">Configurer le stockage d'objets avec Milvus Operator<button data-href="#Configure-Object-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utilise MinIO ou S3 comme stockage d'objets pour conserver les fichiers à grande échelle, tels que les fichiers d'index et les journaux binaires. Cette rubrique explique comment configurer les dépendances du stockage objet lors de l'installation de Milvus avec Milvus Operator. Pour plus de détails, voir <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">Configurer le stockage objet avec Milvus Operator</a> dans le référentiel Milvus Operator.</p>
<p>Cette rubrique suppose que vous avez déployé Milvus Operator.</p>
<div class="alert note">Voir <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Déployer Milvus Operator</a> pour plus d'informations. </div>
<p>Vous devez spécifier un fichier de configuration pour utiliser Milvus Operator afin de démarrer un cluster Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il suffit de modifier le modèle de code dans <code translate="no">milvus_cluster_default.yaml</code> pour configurer les dépendances tierces. Les sections suivantes présentent la configuration du stockage d'objets, d'etcd et de Pulsar respectivement.</p>
<h2 id="Configure-object-storage" class="common-anchor-header">Configuration du stockage d'objets<button data-href="#Configure-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Un cluster Milvus utilise MinIO ou S3 comme stockage d'objets pour conserver les fichiers à grande échelle, tels que les fichiers d'index et les journaux binaires. Ajoutez les champs requis sous <code translate="no">spec.dependencies.storage</code> pour configurer le stockage d'objets, les options possibles sont <code translate="no">external</code> et <code translate="no">inCluster</code>.</p>
<h3 id="Internal-object-storage" class="common-anchor-header">Stockage d'objets interne</h3><p>Par défaut, Milvus Operator déploie un MinIO en cluster pour Milvus. L'exemple de configuration suivant montre comment utiliser ce MinIO en tant que stockage d'objets interne.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    <span class="hljs-comment"># Omit other fields ...</span>
    storage:
      inCluster:
        values:
          mode: standalone
          resources:
            requests:
              memory: 100Mi
        deletionPolicy: Delete <span class="hljs-comment"># Delete | Retain, default: Retain</span>
        pvcDeletion: true <span class="hljs-comment"># default: false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Une fois la configuration ci-dessus appliquée, le MinIO en grappe fonctionnera en mode autonome avec une limite de mémoire allant jusqu'à 100Mi. Notez que</p>
<ul>
<li><p>Le champ <code translate="no">deletionPolicy</code> spécifie la politique de suppression de l'interface MinIO en cluster. La valeur par défaut est <code translate="no">Delete</code> et l'option alternative est <code translate="no">Retain</code>.</p>
<ul>
<li><code translate="no">Delete</code> indique que le stockage d'objets dans le cluster est supprimé lorsque vous arrêtez votre instance Milvus.</li>
<li><code translate="no">Retain</code> indique que le stockage d'objets en cluster est conservé en tant que service de dépendance pour les démarrages ultérieurs de votre instance Milvus.</li>
</ul></li>
<li><p>Le champ <code translate="no">pvcDeletion</code> indique s'il faut supprimer le PVC (Persistent Volume Claim) lorsque le MinIO en cluster est supprimé.</p></li>
</ul>
<p>Les champs sous <code translate="no">inCluster.values</code> sont les mêmes que ceux du Milvus Helm Chart, et vous pouvez les trouver <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">ici</a>.</p>
<h3 id="External-object-storage" class="common-anchor-header">Stockage d'objets externes</h3><p>L'utilisation de <code translate="no">external</code> dans le fichier YAML modèle indique l'utilisation d'un service de stockage d'objets externe. Pour utiliser un stockage d'objets externe, vous devez définir correctement les champs sous <code translate="no">spec.dependencies.storage</code> et <code translate="no">spec.config.minio</code> dans le CRD Milvus.</p>
<h4 id="Use-Amazon-Web-Service-AWS-S3-as-external-object-storage" class="common-anchor-header">Utiliser Amazon Web Service (AWS) S3 comme stockage d'objets externe</h4><ul>
<li><p>Configurer l'accès AWS S3 par AK/SK</p>
<p>Il est généralement possible d'accéder à un seau S3 à l'aide d'une paire de clés d'accès et d'une clé de secret d'accès. Vous pouvez créer un objet <code translate="no">Secret</code> pour les stocker dans votre Kubernetes comme suit :</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-s3-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Ensuite, vous pouvez configurer un seau AWS S3 en tant que stockage d'objet externe :</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      <span class="hljs-comment"># your bucket name</span>
      bucketName: &lt;my-bucket&gt;
      <span class="hljs-comment"># Optional, config the prefix of the bucket milvus will use</span>
      rootPath: milvus/my-release
      useSSL: true
  dependencies:
    storage:
      <span class="hljs-comment"># enable external object storage</span>
      external: true
      <span class="hljs-built_in">type</span>: S3 <span class="hljs-comment"># MinIO | S3</span>
      <span class="hljs-comment"># the endpoint of AWS S3</span>
      endpoint: s3.amazonaws.com:<span class="hljs-number">443</span>
      <span class="hljs-comment"># the secret storing the access key and secret key</span>
      secretRef: <span class="hljs-string">&quot;my-release-s3-secret&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Configurer l'accès AWS S3 par AssumeRole</p>
<p>Vous pouvez également faire en sorte que Milvus accède à votre seau AWS S3 à l'aide de <a href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">AssumeRole</a>, de sorte que seules des informations d'identification temporaires soient impliquées au lieu de votre AK/SK réel.</p>
<p>Si c'est ce que vous préférez, vous devez préparer un rôle dans votre console AWS et obtenir son ARN, qui se présente généralement sous la forme <code translate="no">arn:aws:iam::&lt;your account id&gt;:role/&lt;role-name&gt;</code>.</p>
<p>Créez ensuite un objet <code translate="no">ServiceAccount</code> pour le stocker dans votre Kubernetes comme suit :</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    eks.amazonaws.com/role-arn: &lt;my-role-arn&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Une fois que tout est prêt, faites référence à l'objet <code translate="no">ServiceAccount</code> ci-dessus dans le fichier YAML du modèle, et définissez <code translate="no">spec.config.minio.useIAM</code> à <code translate="no">true</code> pour activer AssumeRole.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      <span class="hljs-comment"># Note: you must use regional endpoint here, otherwise the minio client that milvus uses will fail to connect</span>
      endpoint: s3.&lt;my-bucket-region&gt;.amazonaws.com:<span class="hljs-number">443</span>
      secretRef: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># we don&#x27;t need to specify the secret here</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h4 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">Utiliser Google Cloud Storage (GCS) comme stockage d'objets externe</h4><p>Le stockage d'objets AWS S3 n'est pas le seul choix possible. Vous pouvez également utiliser le service de stockage d'objets d'autres fournisseurs de clouds publics, tels que Google Cloud.</p>
<ul>
<li><p>Configurer l'accès à GCS par AK/SK</p>
<p>La configuration est en grande partie similaire à celle de l'utilisation d'AWS S3. Vous devez toujours créer un objet <code translate="no">Secret</code> pour stocker vos informations d'identification dans votre Kubernetes.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-gcp-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Ensuite, il vous suffit de remplacer <code translate="no">endpoint</code> par <code translate="no">storage.googleapis.com:443</code> et de définir <code translate="no">spec.config.minio.cloudProvider</code> par <code translate="no">gcp</code> comme suit :</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      cloudProvider: gcp
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      endpoint: storage.googleapis.com:<span class="hljs-number">443</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Configurer l'accès GCS par AssumeRole</p>
<p>Comme pour AWS S3, vous pouvez également utiliser <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Workload Identity</a> pour accéder à GCS avec des informations d'identification temporaires si vous utilisez GKE comme cluster Kubernetes.</p>
<p>L'annotation du site <code translate="no">ServiceAccount</code> est différente de celle d'AWS EKS. Vous devez spécifier le nom du compte de service GCP au lieu de l'ARN du rôle.</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    iam.gke.io/gcp-service-account: &lt;my-gcp-service-account-name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Ensuite, vous pouvez configurer votre instance Milvus pour utiliser le site <code translate="no">ServiceAccount</code> ci-dessus et activer AssumeRole en définissant <code translate="no">spec.config.minio.useIAM</code> sur <code translate="no">true</code> comme suit :</p>
<pre><code translate="no" class="language-YAML">labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      cloudProvider: gcp
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...  </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
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
<li><a href="/docs/fr/v2.4.x/meta_storage_operator.md">Configurer le stockage des méta avec Milvus Operator</a></li>
<li><a href="/docs/fr/v2.4.x/message_storage_operator.md">Configurer le stockage des messages avec Milvus Operator</a></li>
</ul>
