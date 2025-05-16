---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Aprenda a actualizar Milvus standalone con Helm Chart.
title: Actualizar Milvus Standalone con cartas Helm
---
<div class="tab-wrapper"><a href="/docs/es/v2.4.x/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/es/v2.4.x/upgrade_milvus_standalone-helm.md" class='active '>OperatorHelmDocker</a><a href="/docs/es/v2.4.x/upgrade_milvus_standalone-docker.md" class=''>Componer</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">Actualizar Milvus Standalone con cartas Helm<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía describe cómo actualizar su Milvus standalone con Milvus Helm charts.</p>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Versión de Helm &gt;= 3.14.0</li>
<li>Versión de Kubernetes &gt;= 1.20.0</li>
</ul>
<div class="alert note">
<p>Desde la versión 4.2.21 de Milvus-Helm chart, hemos introducido pulsar-v3.x chart como dependencia. Por compatibilidad con versiones anteriores, actualice su helm a la versión 3.14 o posterior, y asegúrese de añadir la opción <code translate="no">--reset-then-reuse-values</code> siempre que utilice <code translate="no">helm upgrade</code>.</p>
</div>
<h2 id="Check-the-Milvus-version" class="common-anchor-header">Comprobar la versión de Milvus<button data-href="#Check-the-Milvus-version" class="anchor-icon" translate="no">
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
    </button></h2><p>Ejecute los siguientes comandos para comprobar las nuevas versiones de Milvus.</p>
<pre><code translate="no">$ helm repo update
$ helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>El repositorio de Milvus Helm Charts en <code translate="no">https://milvus-io.github.io/milvus-helm/</code> ha sido archivado y puede obtener más actualizaciones en <code translate="no">https://zilliztech.github.io/milvus-helm/</code> como se indica a continuación:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>El repositorio archivado sigue disponible para las cartas hasta la versión 4.0.31. Para versiones posteriores, utilice el nuevo repositorio.</p>
</div>
<pre><code translate="no">NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<p>Puede elegir la ruta de actualización para su Milvus de la siguiente manera:</p>
<div style="display: none;">- Realice una actualización continua](#conduct-a-rolling-upgrade) de Milvus v2.2.3 y versiones posteriores a v2.4.23.</div>
<ul>
<li><p><a href="#Upgrade-Milvus-using-Helm">Actualice Milvus utilizando Helm</a> para una actualización desde una versión menor anterior a v2.2.3 a v2.4.23.</p></li>
<li><p><a href="#Migrate-the-metadata">Migre los metadatos</a> antes de la actualización de Milvus v2.1.x a v2.4.23.</p></li>
</ul>
<div style="display:none;">
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
    </button></h2><p>Desde Milvus 2.2.3, puede configurar los coordinadores de Milvus para que funcionen en modo activo-espera y habilitar la función de actualización continua para ellos, de modo que Milvus pueda responder a las solicitudes entrantes durante las actualizaciones de los coordinadores. En versiones anteriores, los coordinadores debían eliminarse y luego crearse durante una actualización, lo que podía introducir cierto tiempo de inactividad del servicio.</p>
<p>Las actualizaciones continuas requieren que los coordinadores trabajen en modo activo-espera. Puede utilizar <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">el script</a> que le proporcionamos para configurar los coordinadores para que trabajen en modo de espera activo e iniciar la actualización continua.</p>
<p>Basándose en las capacidades de actualización continua proporcionadas por Kubernetes, el script anterior impone una actualización ordenada de los despliegues según sus dependencias. Además, Milvus implementa un mecanismo para garantizar que sus componentes sigan siendo compatibles con aquellos que dependen de ellos durante la actualización, lo que reduce significativamente el posible tiempo de inactividad del servicio.</p>
<p>El script sólo se aplica a la actualización de Milvus instalado con Helm. La siguiente tabla enumera los indicadores de comando disponibles en los scripts.</p>
<table>
<thead>
<tr><th>Parámetros</th><th>Descripción</th><th>Valor por defecto</th><th>Requerido</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Nombre de instancia Milvus</td><td><code translate="no">None</code></td><td>Verdadero</td></tr>
<tr><td><code translate="no">n</code></td><td>Espacio de nombres en el que está instalado Milvus</td><td><code translate="no">default</code></td><td>Falso</td></tr>
<tr><td><code translate="no">t</code></td><td>Versión de Milvus de destino</td><td><code translate="no">None</code></td><td>Verdadero</td></tr>
<tr><td><code translate="no">w</code></td><td>Nueva etiqueta de imagen de Milvus</td><td><code translate="no">milvusdb/milvus:v2.2.3</code></td><td>Verdadero</td></tr>
<tr><td><code translate="no">o</code></td><td>Operación</td><td><code translate="no">update</code></td><td>Falso</td></tr>
</tbody>
</table>
<p>Una vez que se haya asegurado de que todos los despliegues en su instancia de Milvus están en su estado normal. Puede ejecutar el siguiente comando para actualizar la instancia de Milvus a 2.4.23.</p>
<pre><code translate="no" class="language-shell">sh rollingUpdate.<span class="hljs-property">sh</span> -n <span class="hljs-keyword">default</span> -i my-release -o update -t <span class="hljs-number">2.4</span><span class="hljs-number">.23</span> -w <span class="hljs-string">&#x27;milvusdb/milvus:v2.4.23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ol>
<li>El script <strong>no se aplica</strong> a la instancia de Milvus instalada con <strong>RocksMQ</strong>.</li>
<li>El script codifica el orden de actualización de los despliegues y no puede cambiarse.</li>
<li>El script utiliza <code translate="no">kubectl patch</code> para actualizar los despliegues y <code translate="no">kubectl rollout status</code> para ver su estado.</li>
<li>El script utiliza <code translate="no">kubectl patch</code> para actualizar la etiqueta <code translate="no">app.kubernetes.io/version</code> de los despliegues a la especificada después de la bandera <code translate="no">-t</code> en el comando.</li>
</ol>
</div>
</div>
<h2 id="Upgrade-Milvus-using-Helm" class="common-anchor-header">Actualizar Milvus usando Helm<button data-href="#Upgrade-Milvus-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Para actualizar Milvus desde una versión menor anterior a v2.2.3 a la última, ejecute los siguientes comandos:</p>
<pre><code translate="no" class="language-shell">helm repo update
helm upgrade my-release milvus/milvus --reset-then-reuse-values --version=<span class="hljs-number">4.1</span><span class="hljs-number">.24</span> <span class="hljs-comment"># use the helm chart version here</span>
<button class="copy-code-btn"></button></code></pre>
<p>Utilice la versión del gráfico Helm en el comando anterior. Para más detalles sobre cómo obtener la versión del gráfico Helm, consulte <a href="#Check-the-Milvus-version">Comprobar la versión de Milvus</a>.</p>
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
    </button></h2><p>Desde Milvus 2.2.0, los metadatos son incompatibles con los de versiones anteriores. Los siguientes fragmentos de ejemplo suponen una actualización de Milvus 2.1.4 a Milvus 2.2.0.</p>
<h3 id="1-Check-the-Milvus-version" class="common-anchor-header">1. Compruebe la versión de Milvus</h3><p>Ejecute <code translate="no">$ helm list</code> para comprobar la versión de su aplicación Milvus. Puede ver que <code translate="no">APP VERSION</code> es 2.1.4.</p>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>                <span class="hljs-variable constant_">NAMESPACE</span>   <span class="hljs-variable constant_">REVISION</span>    <span class="hljs-variable constant_">UPDATED</span>                                 <span class="hljs-variable constant_">STATUS</span>      <span class="hljs-variable constant_">CHART</span>           <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>     
my-release          <span class="hljs-keyword">default</span>     <span class="hljs-number">1</span>           <span class="hljs-number">2022</span>-<span class="hljs-number">11</span>-<span class="hljs-number">21</span> <span class="hljs-number">15</span>:<span class="hljs-number">41</span>:<span class="hljs-number">25.51539</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>     deployed    milvus-<span class="hljs-number">3.2</span><span class="hljs-number">.18</span>   <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-running-pods" class="common-anchor-header">2. 2. Compruebe los pods en ejecución</h3><p>Ejecute <code translate="no">$ kubectl get pods</code> para comprobar los pods en ejecución. Puede ver la siguiente salida.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          84s
my-release-milvus-standalone-75c599fffc-6rwlj   1/1     Running   0          84s
my-release-minio-744dd9586f-qngzv               1/1     Running   0          84s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-image-tag" class="common-anchor-header">3. Compruebe la etiqueta de imagen</h3><p>Compruebe la etiqueta de imagen del pod <code translate="no">my-release-milvus-proxy-6c548f787f-scspp</code>. Puede ver que la versión de su clúster Milvus es v2.1.4.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<span class="hljs-meta"># milvusdb/milvus:v2.1.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-Migrate-the-metadata" class="common-anchor-header">4. Migrar los metadatos</h3><p>Un cambio importante en Milvus 2.2 es la estructura de metadatos de los índices de segmentos. Por lo tanto, necesita utilizar Helm para migrar los metadatos mientras actualiza Milvus de v2.1.x a v2.2.0. Aquí tiene <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">un script</a> para migrar sus metadatos de forma segura.</p>
<p>Este script sólo se aplica a Milvus instalado en un cluster K8s. Retroceda primero a la versión anterior con la operación de retroceso si se produce un error durante el proceso.</p>
<p>La siguiente tabla enumera las operaciones que puede realizar para la migración de metadatos.</p>
<table>
<thead>
<tr><th>Parámetros</th><th>Descripción</th><th>Valor por defecto</th><th>Requerido</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>El nombre de instancia de Milvus.</td><td><code translate="no">None</code></td><td>Verdadero</td></tr>
<tr><td><code translate="no">n</code></td><td>El espacio de nombres en el que está instalado Milvus.</td><td><code translate="no">default</code></td><td>Falso</td></tr>
<tr><td><code translate="no">s</code></td><td>La versión fuente de Milvus.</td><td><code translate="no">None</code></td><td>Verdadero</td></tr>
<tr><td><code translate="no">t</code></td><td>La versión Milvus de destino.</td><td><code translate="no">None</code></td><td>Verdadero</td></tr>
<tr><td><code translate="no">r</code></td><td>La ruta raíz de Milvus meta.</td><td><code translate="no">by-dev</code></td><td>Falso</td></tr>
<tr><td><code translate="no">w</code></td><td>La nueva etiqueta de imagen de Milvus.</td><td><code translate="no">milvusdb/milvus:v2.2.0</code></td><td>Falso</td></tr>
<tr><td><code translate="no">m</code></td><td>La etiqueta de imagen de migración meta.</td><td><code translate="no">milvusdb/meta-migration:v2.2.0</code></td><td>Falso</td></tr>
<tr><td><code translate="no">o</code></td><td>La meta operación de migración.</td><td><code translate="no">migrate</code></td><td>Falso</td></tr>
<tr><td><code translate="no">d</code></td><td>Si desea eliminar la vaina de migración una vez finalizada la migración.</td><td><code translate="no">false</code></td><td>Falso</td></tr>
<tr><td><code translate="no">c</code></td><td>La clase de almacenamiento para el pvc de meta migración.</td><td><code translate="no">default storage class</code></td><td>Falso</td></tr>
<tr><td><code translate="no">e</code></td><td>El enpoint etcd utilizado por milvus.</td><td><code translate="no">etcd svc installed with milvus</code></td><td>Falso</td></tr>
</tbody>
</table>
<h4 id="1-Migrate-the-metadata" class="common-anchor-header">1. Migrar los metadatos</h4><ol>
<li>Descargue el <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">script de migración</a>.</li>
<li>Detenga los componentes de Milvus. Cualquier sesión en vivo en el etcd de Milvus puede causar un fallo en la migración.</li>
<li>Cree una copia de seguridad de los metadatos de Milvus.</li>
<li>Migre los metadatos de Milvus.</li>
<li>Inicie los componentes de Milvus con una nueva imagen.</li>
</ol>
<h4 id="2-Upgrade-Milvus-from-v21x-to-2423" class="common-anchor-header">2. Actualizar Milvus de v2.1.x a 2.4.23</h4><p>Los siguientes comandos asumen que usted actualiza Milvus de v2.1.4 a 2.4.23. Cámbielos por las versiones que se ajusten a sus necesidades.</p>
<ol>
<li><p>Especifique el nombre de la instancia de Milvus, la versión de Milvus de origen y la versión de Milvus de destino.</p>
<pre><code translate="no">./migrate.sh -i my-release -s 2.1.4 -t 2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Especifique el espacio de nombres con <code translate="no">-n</code> si su Milvus no está instalado en el espacio de nombres predeterminado de K8s.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Especifique la ruta raíz con <code translate="no">-r</code> si su Milvus está instalado con la costumbre <code translate="no">rootpath</code>.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Especifique la etiqueta de imagen con <code translate="no">-w</code> si su Milvus está instalado con la personalizada <code translate="no">image</code>.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -w milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Establezca <code translate="no">-d true</code> si desea eliminar automáticamente el pod de migración una vez finalizada la migración.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -w milvusdb/milvus:v2.4.23 -d <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Retroceda y migre de nuevo si la migración falla.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -o rollback -w milvusdb/milvus:v2.1.1
./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -o migrate -w milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre></li>
</ol>
