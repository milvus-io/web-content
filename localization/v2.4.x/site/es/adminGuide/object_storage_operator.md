---
id: object_storage_operator.md
title: Configurar el almacenamiento de objetos con Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Aprenda a configurar el almacenamiento de objetos con Milvus Operator.
---
<h1 id="Configure-Object-Storage-with-Milvus-Operator" class="common-anchor-header">Configurar el almacenamiento de objetos con Milvus Operator<button data-href="#Configure-Object-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utiliza MinIO o S3 como almacenamiento de objetos para persistir archivos a gran escala, como archivos de índice y registros binarios. Este tema presenta cómo configurar las dependencias de almacenamiento de objetos cuando instala Milvus con Milvus Operator. Para más detalles, consulte <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">Configurar el almacenamiento de objetos con Milvus Operator</a> en el repositorio de Milvus Operator.</p>
<p>Este tema asume que usted ha desplegado Milvus Operator.</p>
<div class="alert note">Consulte <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Despliegue de Milvus Operator</a> para obtener más información. </div>
<p>Necesita especificar un archivo de configuración para utilizar Milvus Operator para iniciar un cluster Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sólo necesita editar la plantilla de código en <code translate="no">milvus_cluster_default.yaml</code> para configurar las dependencias de terceros. Las siguientes secciones presentan cómo configurar el almacenamiento de objetos, etcd y Pulsar respectivamente.</p>
<h2 id="Configure-object-storage" class="common-anchor-header">Configurar el almacenamiento de objetos<button data-href="#Configure-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Un cluster Milvus utiliza MinIO o S3 como almacenamiento de objetos para persistir archivos a gran escala, como archivos de índice y registros binarios. Añada los campos requeridos en <code translate="no">spec.dependencies.storage</code> para configurar el almacenamiento de objetos, las opciones posibles son <code translate="no">external</code> y <code translate="no">inCluster</code>.</p>
<h3 id="Internal-object-storage" class="common-anchor-header">Almacenamiento de objetos interno</h3><p>Por defecto, Milvus Operator despliega un MinIO en el cluster para Milvus. El siguiente es un ejemplo de configuración para demostrar cómo utilizar este MinIO como almacenamiento interno de objetos.</p>
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
<p>Después de aplicar la configuración anterior, el MinIO in-cluster se ejecutará en modo autónomo con un límite de memoria de hasta 100Mi. Tenga en cuenta que</p>
<ul>
<li><p>El campo <code translate="no">deletionPolicy</code> especifica la política de borrado del MinIO in-cluster. Por defecto es <code translate="no">Delete</code> y tiene <code translate="no">Retain</code> como opción alternativa.</p>
<ul>
<li><code translate="no">Delete</code> indica que el almacenamiento de objetos en el clúster se elimina cuando detiene su instancia de Milvus.</li>
<li><code translate="no">Retain</code> indica que el almacenamiento de objetos en el clúster se conserva como servicio de dependencia para posteriores arranques de su instancia de Milvus.</li>
</ul></li>
<li><p>El campo <code translate="no">pvcDeletion</code> especifica si se elimina el PVC (Persistent Volume Claim) cuando se elimina el MinIO in-cluster.</p></li>
</ul>
<p>Los campos bajo <code translate="no">inCluster.values</code> son los mismos que los de Milvus Helm Chart, y puede encontrarlos <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">aquí</a>.</p>
<h3 id="External-object-storage" class="common-anchor-header">Almacenamiento externo de objetos</h3><p>El uso de <code translate="no">external</code> en el archivo YAML de plantilla indica el uso de un servicio de almacenamiento de objetos externo. Para utilizar un almacenamiento de objetos externo, debe configurar correctamente los campos en <code translate="no">spec.dependencies.storage</code> y <code translate="no">spec.config.minio</code> en el CRD de Milvus.</p>
<h4 id="Use-Amazon-Web-Service-AWS-S3-as-external-object-storage" class="common-anchor-header">Utilice Amazon Web Service (AWS) S3 como almacenamiento externo de objetos</h4><ul>
<li><p>Configure el acceso a AWS S3 por AK/SK</p>
<p>Normalmente se puede acceder a un cubo S3 mediante un par de una clave de acceso y una clave secreta de acceso. Puede crear un objeto <code translate="no">Secret</code> para almacenarlos en su Kubernetes de la siguiente manera:</p>
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
<p>A continuación, puede configurar un bucket de AWS S3 como almacenamiento de objetos externo:</p>
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
<li><p>Configurar el acceso a AWS S3 por AssumeRole.</p>
<p>Alternativamente, puede hacer que Milvus acceda a su cubo de AWS S3 utilizando <a href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">AssumeRole</a>, de modo que solo intervengan credenciales temporales en lugar de su AK/SK real.</p>
<p>Si esto es lo que prefiere, necesita preparar un rol en su consola AWS y obtener su ARN, que usualmente está en la forma de <code translate="no">arn:aws:iam::&lt;your account id&gt;:role/&lt;role-name&gt;</code>.</p>
<p>A continuación, cree un objeto <code translate="no">ServiceAccount</code> para almacenarlo en su Kubernetes como se indica a continuación:</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    eks.amazonaws.com/role-arn: &lt;my-role-arn&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Una vez todo listo, haz referencia al anterior <code translate="no">ServiceAccount</code> en el archivo YAML de la plantilla, y establece <code translate="no">spec.config.minio.useIAM</code> en <code translate="no">true</code> para habilitar AssumeRole.</p>
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
<h4 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">Utilizar Google Cloud Storage (GCS) como almacenamiento de objetos externo</h4><p>El almacenamiento de objetos AWS S3 no es la única opción. También puede utilizar el servicio de almacenamiento de objetos de otros proveedores de nubes públicas, como Google Cloud.</p>
<ul>
<li><p>Configurar el acceso a GCS por AK/SK</p>
<p>La configuración es en su mayor parte similar a la de utilizar AWS S3. Todavía necesitas crear un objeto <code translate="no">Secret</code> para almacenar tus credenciales en tu Kubernetes.</p>
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
<p>A continuación, solo tiene que cambiar <code translate="no">endpoint</code> por <code translate="no">storage.googleapis.com:443</code> y configurar <code translate="no">spec.config.minio.cloudProvider</code> por <code translate="no">gcp</code> como se indica a continuación:</p>
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
<li><p>Configurar el acceso a GCS mediante AssumeRole</p>
<p>De forma similar a AWS S3, también puede utilizar <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Workload Identity</a> para acceder a GCS con credenciales temporales si está utilizando GKE como su clúster Kubernetes.</p>
<p>La anotación de <code translate="no">ServiceAccount</code> es diferente a la de AWS EKS. Debe especificar el nombre de la cuenta de servicio de GCP en lugar del ARN del rol.</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    iam.gke.io/gcp-service-account: &lt;my-gcp-service-account-name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, puede configurar su instancia Milvus para utilizar el anterior <code translate="no">ServiceAccount</code> y habilitar AssumeRole estableciendo <code translate="no">spec.config.minio.useIAM</code> en <code translate="no">true</code> como se indica a continuación:</p>
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
<h2 id="Whats-next" class="common-anchor-header">A continuación<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/es/v2.4.x/meta_storage_operator.md">Configurar Meta Storage con Milvus Operator</a></li>
<li><a href="/docs/es/v2.4.x/message_storage_operator.md">Configurar el almacenamiento de mensajes con Milvus Operator</a></li>
</ul>
