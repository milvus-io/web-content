---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: >-
  Milvus le recomienda actualizar Pulsar a v3 para Milvus v2.5.x. Sin embargo,
  si prefiere utilizar Pulsar v2, este artículo le guiará a través de los pasos
  para seguir utilizando Pulsar v2 con Milvus v2.5.x.
title: Utilizar Pulsar v2 con Milvus v2.5.x
---

<h1 id="Use-Pulsar-v2-with-Milvus-v25x" class="common-anchor-header">Utilizar Pulsar v2 con Milvus v2.5.x<button data-href="#Use-Pulsar-v2-with-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus le recomienda actualizar Pulsar a v3 para ejecutar Milvus v2.5.x. Para más detalles, consulte <a href="/docs/es/v2.5.x/upgrade-pulsar-v3.md">Actualizar Pulsar</a>. Sin embargo, si prefiere utilizar Pulsar v2 con Milvus v2.5.x, este artículo le guiará a través del procedimiento para ejecutar Milvus v2.5.x con Pulsar v2.</p>
<p>Si ya tiene una instancia de Milvus en ejecución y desea actualizarla a v2.5.x pero seguir utilizando Pulsar v2, puede seguir los pasos de esta página.</p>
<h2 id="Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="common-anchor-header">Continúe utilizando Pulsar v2 mientras actualiza Milvus v2.5.x<button data-href="#Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta sección le guiará a través de los pasos para continuar usando Pulsar v2 mientras actualiza su instancia Milvus a Milvus v2.5.x.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Para usuarios de Milvus Operator</h3><p>Milvus Operator es compatible con las actualizaciones de Pulsar v2 por defecto. Puede actualizar su instancia Milvus a v2.5.x consultando <a href="/docs/es/v2.5.x/upgrade_milvus_cluster-operator.md">Actualizar Milvus Cluster con Milvus Oper</a>ator.</p>
<p>Una vez completada la actualización, puede seguir utilizando Pulsar v2 con su instancia Milvus.</p>
<h3 id="For-Helm-users" class="common-anchor-header">Para usuarios de Helm</h3><p>Antes de la actualización, asegúrese de que</p>
<ul>
<li><p>Su versión de Helm es superior a v3.12, y se recomienda la última versión.</p>
<p>Para más información, consulte <a href="https://helm.sh/docs/intro/install/">Instalar Helm</a>.</p></li>
<li><p>Su versión de Kubernetes es superior a v1.20.</p></li>
</ul>
<p>Las operaciones de este artículo asumen que</p>
<ul>
<li><p>Milvus se ha instalado en el espacio de nombres <code translate="no">default</code>.</p></li>
<li><p>El nombre de la versión de Milvus es <code translate="no">my-release</code>.</p></li>
</ul>
<p>Es necesario cambiar el archivo <code translate="no">values.yaml</code> para especificar la versión de Pulsar como v2 antes de actualizar Milvus. Los pasos son los siguientes</p>
<ol>
<li><p>Obtenga el archivo <code translate="no">values.yaml</code> actual de su instancia de Milvus.</p>
<pre><code translate="no" class="language-bash">namespace=default
release=my-release
helm -n <span class="hljs-variable">${namespace}</span> get values <span class="hljs-variable">${release}</span> -o yaml &gt; values.yaml
<span class="hljs-built_in">cat</span> values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edite el archivo <code translate="no">values.yaml</code> para especificar la versión Pulsar como v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># ... omit existing values</span>
pulsar:
  enabled: <span class="hljs-literal">true</span>
pulsarv3:
  enabled: <span class="hljs-literal">false</span>
image:
  all:
    repository: milvusdb/milvus
    tag: v2.5.0-beta 
<button class="copy-code-btn"></button></code></pre>
<p>Para <code translate="no">image</code>, cambie <code translate="no">tag</code> por la versión de Milvus deseada (por ejemplo <code translate="no">v2.5.0-beta</code>).</p></li>
<li><p>Actualice el cuadro de Milvus Helm.</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm</span>
helm repo update milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Actualizar la instancia de Milvus.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-variable">$namespace</span> upgrade <span class="hljs-variable">$releaase</span> milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Creating-a-new-Milvus-instance-with-Pulsar-v2" class="common-anchor-header">Creación de una nueva instancia de Milvus con Pulsar v2<button data-href="#Creating-a-new-Milvus-instance-with-Pulsar-v2" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta sección le guiará a través de los pasos para crear una nueva instancia de Milvus con Pulsar v2.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Para usuarios de Milvus Operator</h3><p>Antes de desplegar Milvus v2.5.x, necesita descargar y editar el archivo Milvus Customer Resource Definition (CRD). Para más detalles sobre cómo instalar Milvus utilizando Milvus Operator, consulte <a href="/docs/es/v2.5.x/install_cluster-milvusoperator.md">Instalar Milvus Cluster con Milvus Operator</a>.</p>
<ol>
<li><p>Descargue el archivo CRD.</p>
<pre><code translate="no" class="language-bash">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edite el archivo <code translate="no">milvus_cluster_default.yaml</code> para especificar la versión de Pulsar como v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion</span>: milvus.<span class="hljs-property">io</span>/v1beta1
<span class="hljs-attr">kind</span>: <span class="hljs-title class_">Milvus</span>
<span class="hljs-attr">metadata</span>:
  <span class="hljs-attr">name</span>: my-release
  <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
  <span class="hljs-attr">labels</span>:
    <span class="hljs-attr">app</span>: milvus
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">mode</span>: cluster
  <span class="hljs-attr">dependencies</span>:
    <span class="hljs-attr">pulsar</span>:
      <span class="hljs-attr">inCluster</span>:
        <span class="hljs-attr">chartVersion</span>: pulsar-v2
<button class="copy-code-btn"></button></code></pre>
<p>Para <code translate="no">dependencies</code>, cambie <code translate="no">pulsar.inCluster.chartVersion</code> por <code translate="no">pulsar-v2</code>.</p></li>
<li><p>Continúe con los pasos en <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Instalar Mil</a> vus <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Cluster con Milvus Operator</a> para desplegar Milvus v2.5.x con Pulsar v2 utilizando el archivo CRD editado.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="For-Helm-users" class="common-anchor-header">Para usuarios de Helm</h3><p>Antes de desplegar Milvus v2.5.x, puede preparar un archivo <code translate="no">values.yaml</code> o utilizar los parámetros en línea para especificar la versión de Pulsar. Para más detalles sobre cómo instalar Milvus utilizando Helm, consulte <a href="/docs/es/v2.5.x/install_cluster-helm.md">Instalar Milvus Cluster con Helm</a>.</p>
<ul>
<li><p>Utilice los parámetros en línea para especificar la versión de Pulsar como v2.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">true</span>,pulsarv3.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Utilice un archivo <code translate="no">values.yaml</code> para especificar la versión de Pulsar como v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, despliegue Milvus v2.5.x con Pulsar v2 utilizando el archivo <code translate="no">values.yaml</code>.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
