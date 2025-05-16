---
id: meta_storage_operator.md
title: Configurar Meta Storage con Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Aprenda a configurar el metaalmacenamiento con Milvus Operator.
---
<h1 id="Configure-Meta-Storage-with-Milvus-Operator" class="common-anchor-header">Configurar Meta Almacenamiento con Milvus Operator<button data-href="#Configure-Meta-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utiliza etcd para almacenar metadatos. Este tema presenta cómo configurar la dependencia de meta almacenamiento cuando instala Milvus con Milvus Operator. Para más detalles, consulte <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md">Configurar Meta Almacenamiento con Milvus Operator</a> en el repositorio de Milvus Operator.</p>
<p>Este tema asume que usted ha desplegado Milvus Operator.</p>
<div class="alert note">Consulte <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Despliegue de Milvus Operator</a> para obtener más información. </div>
<p>Necesita especificar un archivo de configuración para utilizar Milvus Operator para iniciar un cluster Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sólo necesita editar la plantilla de código en <code translate="no">milvus_cluster_default.yaml</code> para configurar las dependencias de terceros. Las siguientes secciones presentan cómo configurar el almacenamiento de objetos, etcd y Pulsar respectivamente.</p>
<h2 id="Configure-etcd" class="common-anchor-header">Configurar etcd<button data-href="#Configure-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p>Añada los campos necesarios en <code translate="no">spec.dependencies.etcd</code> para configurar etcd.</p>
<p><code translate="no">etcd</code> es compatible con <code translate="no">external</code> y <code translate="no">inCluster</code>.</p>
<p>Los campos utilizados para configurar un servicio etcd externo incluyen:</p>
<ul>
<li><code translate="no">external</code>: Un valor <code translate="no">true</code> indica que Milvus utiliza un servicio etcd externo.</li>
<li><code translate="no">endpoints</code>: Los puntos finales de etcd.</li>
</ul>
<h3 id="External-etcd" class="common-anchor-header">etcd externo</h3><h4 id="Example" class="common-anchor-header">Ejemplo</h4><p>El siguiente ejemplo configura un servicio etcd externo.</p>
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
<h3 id="Internal-etcd" class="common-anchor-header">etcd interno</h3><p><code translate="no">inCluster</code> indica que cuando se inicia un clúster Milvus, se inicia automáticamente un servicio etcd en el clúster.</p>
<h4 id="Example" class="common-anchor-header">Ejemplo</h4><p>El siguiente ejemplo configura un servicio etcd interno.</p>
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
<div class="alert note">El ejemplo anterior especifica el número de réplicas como <code translate="no">5</code> y limita los recursos de cómputo para etcd.</div>
<div class="alert note">Encuentra los elementos de configuración completos para configurar un servicio etcd interno en <a href="https://github.com/bitnami/charts/blob/ba6f8356e725a8342fe738a3b73ae40d5488b2ad/bitnami/etcd/values.yaml">values.yaml</a>. Añada los elementos de configuración necesarios en <code translate="no">etcd.inCluster.values</code> como se muestra en el ejemplo anterior.</div>
<p>Suponiendo que el archivo de configuración se llama <code translate="no">milvuscluster.yaml</code>, ejecute el siguiente comando para aplicar la configuración.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
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
<li><a href="/docs/es/v2.4.x/object_storage_operator.md">Configurar el almacenamiento de objetos con Milvus Operator</a></li>
<li><a href="/docs/es/v2.4.x/message_storage_operator.md">Configurar el almacenamiento de mensajes con Milvus Operator</a></li>
</ul>
