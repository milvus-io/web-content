---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Aprenda a actualizar el clúster Milvus con Milvus Operator.
title: Actualizar Milvus Cluster con Milvus Operator
---
<div class="tab-wrapper"><a href="/docs/es/v2.4.x/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/es/v2.4.x/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">Actualizar Milvus Cluster con Milvus Operator<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía describe cómo actualizar su cluster Milvus con Milvus operator.</p>
<h2 id="Upgrade-your-Milvus-operator" class="common-anchor-header">Actualice su operador Milvus<button data-href="#Upgrade-your-Milvus-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Ejecute el siguiente comando para actualizar la versión de su Operador Milvus a v1.1.9.</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> zilliztech-milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update zilliztech-milvus-<span class="hljs-keyword">operator</span>
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> zilliztech-milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que haya actualizado su operador Milvus a la última versión, tiene las siguientes opciones:</p>
<ul>
<li>Para actualizar Milvus desde v2.2.3 o versiones posteriores a 2.4.23, puede <a href="#Conduct-a-rolling-upgrade">realizar una actualización continua</a>.</li>
<li>Para actualizar Milvus desde una versión menor anterior a v2.2.3 a 2.4.23, se recomienda <a href="#Upgrade-Milvus-by-changing-its-image">actualizar Milvus cambiando su versión de imagen</a>.</li>
<li>Para actualizar Milvus de v2.1.x a 2.4.23, debe <a href="#Migrate-the-metadata">migrar los metadatos</a> antes de la actualización.</li>
</ul>
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">Realizar una actualización continua<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Desde Milvus 2.2.3, puede configurar los coordinadores de Milvus para que funcionen en modo activo-espera y activar la función de actualización continua para ellos, de modo que Milvus pueda responder a las solicitudes entrantes durante las actualizaciones de los coordinadores. En versiones anteriores, los coordinadores debían eliminarse y luego crearse durante una actualización, lo que podía introducir cierto tiempo de inactividad del servicio.</p>
<p>Basándose en las capacidades de actualización continua proporcionadas por Kubernetes, el operador Milvus aplica una actualización ordenada de los despliegues según sus dependencias. Además, Milvus implementa un mecanismo para garantizar que sus componentes sigan siendo compatibles con aquellos que dependen de ellos durante la actualización, lo que reduce significativamente el posible tiempo de inactividad del servicio.</p>
<p>La función de actualización continua está desactivada por defecto. Es necesario habilitarla explícitamente a través de un archivo de configuración.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: rollingUpgrade <span class="hljs-comment"># Default value, can be omitted</span>
    image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p>En el archivo de configuración anterior, establezca <code translate="no">spec.components.enableRollingUpdate</code> en <code translate="no">true</code> y <code translate="no">spec.components.image</code> en la versión de Milvus deseada.</p>
<p>Por defecto, Milvus realiza la actualización continua para los coordinadores de forma ordenada, en la que sustituye las imágenes del pod de coordinador una tras otra. Para reducir el tiempo de actualización, considere configurar <code translate="no">spec.components.imageUpdateMode</code> a <code translate="no">all</code> para que Milvus reemplace todas las imágenes de pod al mismo tiempo.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: all
    image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p>Puede configurar <code translate="no">spec.components.imageUpdateMode</code> a <code translate="no">rollingDowngrade</code> para que Milvus reemplace las imágenes de pod coordinador con una versión inferior.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: rollingDowngrade
    image: milvusdb/milvus:&lt;some-old-version&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Luego guarde su configuración como un archivo YAML (por ejemplo, <code translate="no">milvusupgrade.yaml</code>) y parchee este archivo de configuración a su instancia Milvus como sigue:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">Actualizar Milvus cambiando su imagen<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>En casos normales, puede simplemente actualizar su Milvus a la última versión cambiando su imagen. Sin embargo, tenga en cuenta que habrá un cierto tiempo de inactividad al actualizar Milvus de esta manera.</p>
<p>Componga un fichero de configuración como el siguiente y guárdelo como <strong>milvusupgrade.yaml</strong>:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
   image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, ejecute lo siguiente para realizar la actualización:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Migrar los metadatos<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>Desde Milvus 2.2.0, los metadatos son incompatibles con los de versiones anteriores. Los siguientes ejemplos suponen una actualización de Milvus 2.1.4 a Milvus 2.4.23.</p>
<h3 id="1-Create-a-yaml-file-for-metadata-migration" class="common-anchor-header">1. Crear un archivo <code translate="no">.yaml</code> para la migración de metadatos</h3><p>Cree un archivo de migración de metadatos. El siguiente es un ejemplo. Debe especificar <code translate="no">name</code>, <code translate="no">sourceVersion</code> y <code translate="no">targetVersion</code> en el archivo de configuración. El siguiente ejemplo establece <code translate="no">name</code> en <code translate="no">my-release-upgrade</code>, <code translate="no">sourceVersion</code> en <code translate="no">v2.1.4</code> y <code translate="no">targetVersion</code> en <code translate="no">v2.4.23</code>. Esto significa que su clúster Milvus se actualizará de v2.1.4 a v2.4.23.</p>
<pre><code translate="no">apiVersion: milvus.io/v1beta1
kind: MilvusUpgrade
metadata:
  name: my-release-upgrade
spec:
  milvus:
    namespace: default
    name: my-release
  sourceVersion: <span class="hljs-string">&quot;v2.1.4&quot;</span>
  targetVersion: <span class="hljs-string">&quot;v2.4.23&quot;</span>
  <span class="hljs-comment"># below are some omit default values:</span>
  <span class="hljs-comment"># targetImage: &quot;milvusdb/milvus:v2.4.23&quot;</span>
  <span class="hljs-comment"># toolImage: &quot;milvusdb/meta-migration:v2.2.0&quot;</span>
  <span class="hljs-comment"># operation: upgrade</span>
  <span class="hljs-comment"># rollbackIfFailed: true</span>
  <span class="hljs-comment"># backupPVC: &quot;&quot;</span>
  <span class="hljs-comment"># maxRetry: 3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Apply-the-new-configuration" class="common-anchor-header">2. Aplique la nueva configuración</h3><p>Ejecute el siguiente comando para crear la nueva configuración.</p>
<pre><code translate="no">$ kubectl create -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/zilliztech/milvus-operator/blob/main/config/samples/beta/milvusupgrade.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-status-of-metadata-migration" class="common-anchor-header">3. 3. Compruebe el estado de la migración de metadatos</h3><p>Ejecute el siguiente comando para comprobar el estado de la migración de metadatos.</p>
<pre><code translate="no">kubectl describe milvus release-name
<button class="copy-code-btn"></button></code></pre>
<p>El estado de <code translate="no">ready</code> en la salida significa que la migración de metadatos se ha realizado correctamente.</p>
<p>También puede ejecutar <code translate="no">kubectl get pod</code> para comprobar todos los pods. Si todos los pods son <code translate="no">ready</code>, la migración de metadatos se ha realizado correctamente.</p>
<h3 id="4-Delete-my-release-upgrade" class="common-anchor-header">4. Elimine <code translate="no">my-release-upgrade</code></h3><p>Cuando la actualización se haya realizado correctamente, elimine <code translate="no">my-release-upgrade</code> en el archivo YAML.</p>
