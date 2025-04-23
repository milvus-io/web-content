---
id: install_cluster-helm.md
label: Helm
related_key: Kubernetes
summary: Aprenda a instalar el clúster Milvus en Kubernetes.
title: Instalar Milvus Cluster con Helm
---
<h1 id="Run-Milvus-in-Kubernetes-with-Helm" class="common-anchor-header">Ejecutar Milvus en Kubernetes con Helm<button data-href="#Run-Milvus-in-Kubernetes-with-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página ilustra cómo iniciar una instancia de Milvus en Kubernetes utilizando <a href="https://github.com/zilliztech/milvus-helm">los gráficos de Milvus Helm</a>.</p>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Helm utiliza un formato de empaquetado llamado charts. Un gráfico es una colección de archivos que describen un conjunto relacionado de recursos de Kubernetes. Milvus proporciona un conjunto de gráficos para ayudarle a desplegar dependencias y componentes de Milvus.</p>
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
<li><p><a href="https://helm.sh/docs/intro/install/">Instale Helm CLI</a>.</p></li>
<li><p><a href="/docs/es/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">Crear un cluster K8s</a>.</p></li>
<li><p>Instale una <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. Puede comprobar la StorageClass instalada de la siguiente manera.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Compruebe <a href="/docs/es/prerequisite-helm.md">los requisitos de hardware y software</a> antes de la instalación.</p></li>
<li><p>Antes de instalar Milvus, se recomienda utilizar <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> para estimar los requisitos de hardware basándose en el tamaño de sus datos. Esto ayuda a garantizar un rendimiento y una asignación de recursos óptimos para su instalación de Milvus.</p></li>
</ul>
<div class="alert note">
<p>Si encuentra algún problema al tirar de la imagen, póngase en contacto con nosotros en <a href="mailto:community@zilliz.com">community@zilliz.com</a> con detalles sobre el problema, y le proporcionaremos el soporte necesario.</p>
</div>
<h2 id="Install-Milvus-Helm-Chart" class="common-anchor-header">Instalar Milvus Helm Chart<button data-href="#Install-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de instalar Milvus Helm Charts, necesita añadir el repositorio Milvus Helm.</p>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>El repositorio de Milvus Helm Charts en <code translate="no">https://github.com/milvus-io/milvus-helm</code> ha sido archivado y puede obtener más actualizaciones en <code translate="no">https://github.com/zilliztech/milvus-helm</code> como se indica a continuación:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update
<span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>El repositorio archivado sigue disponible para los gráficos hasta la versión 4.0.31. Para versiones posteriores, utilice el nuevo repositorio.</p>
</div>
<p>A continuación, obtenga los gráficos Milvus del repositorio de la siguiente manera:</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>helm repo update
<button class="copy-code-btn"></button></code></pre>
<p>Siempre puede ejecutar este comando para obtener las últimas cartas Milvus Helm.</p>
<h2 id="Online-install" class="common-anchor-header">Instalación en línea<button data-href="#Online-install" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Despliegue un cluster Milvus</h3><p>Una vez que haya instalado la carta Helm, puede iniciar Milvus en Kubernetes. Esta sección le guiará a través de los pasos para iniciar Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install my-release milvus/milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>En el comando anterior, <code translate="no">my-release</code> es el nombre de la versión y <code translate="no">milvus/milvus</code> es el repositorio de gráficos instalado localmente. Para utilizar un nombre diferente, sustituya <code translate="no">my-release</code> por el que considere oportuno.</p>
<p>El comando anterior despliega un cluster Milvus con sus componentes y dependencias utilizando las configuraciones por defecto. Para personalizar estas configuraciones, le recomendamos que utilice la <a href="https://milvus.io/tools/sizing">herramienta Milvus Sizing Tool</a> para ajustar las configuraciones en función del tamaño real de sus datos y, a continuación, descargue el archivo YAML correspondiente. Para saber más sobre los parámetros de configuración, consulte <a href="https://milvus.io/docs/system_configuration.md">Milvus System Configurations Checklist</a>.</p>
<div class="alert note">
  <ul>
    <li>El nombre de la versión sólo debe contener letras, números y guiones. Los puntos no están permitidos en el nombre de la versión.</li>
    <li>La línea de comandos por defecto instala la versión cluster de Milvus cuando se instala Milvus con Helm. Se necesita una configuración adicional cuando se instala Milvus de forma independiente.</li>
    <li>De acuerdo con la <a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">guía de migración de API obsoleta de Kubernetes</a>, la versión de la API <b>policy/v1beta1</b> de PodDisruptionBudget ya no se sirve a partir de v1.25. Se recomienda migrar los manifiestos y clientes de API para utilizar la versión de API <b>policy/v1</b> en su lugar. <br/>Como solución para los usuarios que aún utilizan la versión de la API <b>policy/v1beta1</b> de PodDisruptionBudget en Kubernetes v1.25 y posteriores, puede ejecutar el siguiente comando para instalar Milvus:<br/> <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
    <li>Consulte <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a> y <a href="https://helm.sh/docs/">Helm</a> para obtener más información.</li>
  </ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Comprobar el estado del clúster Milvus</h3><p>Ejecute el siguiente comando para comprobar el estado de todos los pods en su cluster Milvus.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que todos los pods estén funcionando, la salida del comando anterior debería ser similar a la siguiente:</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-68</span>cb87dcbd<span class="hljs-number">-4</span>khpm      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>indexnode<span class="hljs-number">-5</span>c5f7b5bd9<span class="hljs-operator">-</span>l8hjg     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>mixcoord<span class="hljs-number">-7</span>fb9488465<span class="hljs-operator">-</span>dmbbj      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-6</span>bd7f5587<span class="hljs-operator">-</span>ds2xv          <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-5</span>cd8fff495<span class="hljs-operator">-</span>k6gtg     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-3</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>autorecovery<span class="hljs-number">-86</span>f5dbdf77<span class="hljs-operator">-</span>lchpc  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookkeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookkeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">98</span>s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>broker<span class="hljs-number">-556</span>ff89d4c<span class="hljs-number">-2</span>m29m        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>proxy<span class="hljs-number">-6</span>fbd75db75<span class="hljs-operator">-</span>nhg4v         <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-operator">-</span>metadata<span class="hljs-number">-98</span>zbr       <span class="hljs-number">0</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>   Completed  <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
<button class="copy-code-btn"></button></code></pre>
<p>También puede acceder a Milvus WebUI en <code translate="no">http://127.0.0.1:9091/webui/</code> para obtener más información sobre su instancia de Milvus. Para más detalles, consulte <a href="/docs/es/milvus-webui.md">Milvus WebUI</a>.</p>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Reenvíe un puerto local a Milvus</h3><p>Ejecute el siguiente comando para obtener el puerto en el que sirve su cluster Milvus.</p>
<pre><code translate="no" class="language-bash">$ kubectl get pod my-release-milvus-proxy-6bd7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
19530
<button class="copy-code-btn"></button></code></pre>
<p>La salida muestra que la instancia Milvus sirve en el puerto por defecto <strong>19530</strong>.</p>
<div class="alert note">
<p>Si ha desplegado Milvus en modo autónomo, cambie el nombre del pod de <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> a <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>A continuación, ejecute el siguiente comando para reenviar un puerto local al puerto en el que sirve Milvus.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus 27017:19530
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Opcionalmente, puede utilizar <code translate="no">:19530</code> en lugar de <code translate="no">27017:19530</code> en el comando anterior para dejar que <code translate="no">kubectl</code> asigne un puerto local para usted de modo que no tenga que gestionar conflictos de puertos.</p>
<p>Por defecto, el reenvío de puertos de kubectl sólo escucha en <code translate="no">localhost</code>. Utilice la bandera <code translate="no">address</code> si desea que Milvus escuche en las direcciones IP seleccionadas o en todas. El siguiente comando hace que port-forward escuche en todas las direcciones IP de la máquina anfitriona.</p>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">Acceso a Milvus WebUI<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus incluye una herramienta GUI integrada llamada Milvus WebUI a la que puede acceder a través de su navegador. Milvus Web UI mejora la observabilidad del sistema con una interfaz sencilla e intuitiva. Puede utilizar Milvus Web UI para observar las estadísticas y métricas de los componentes y dependencias de Milvus, comprobar los detalles de la base de datos y la colección, y listar las configuraciones detalladas de Milvus. Para más detalles sobre Milvus Web UI, consulte <a href="/docs/es/milvus-webui.md">Milvus WebUI</a></p>
<p>Para habilitar el acceso a Milvus Web UI, necesita reenviar el puerto del pod proxy a un puerto local.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
<button class="copy-code-btn"></button></code></pre>
<p>Ahora, puede acceder a Milvus Web UI en <code translate="no">http://localhost:27018</code>.</p>
<h2 id="Offline-install" class="common-anchor-header">Instalación sin conexión<button data-href="#Offline-install" class="anchor-icon" translate="no">
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
    </button></h2><p>Si se encuentra en un entorno con restricciones de red, siga el procedimiento de esta sección para iniciar un cluster Milvus.</p>
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1. Obtenga el manifiesto de Milvus</h3><p>Ejecute el siguiente comando para obtener el manifiesto de Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm template my-release milvus/milvus &gt; milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>El comando anterior genera plantillas de gráficos para un cluster Milvus y guarda el resultado en un archivo de manifiesto llamado <code translate="no">milvus_manifest.yaml</code>. Utilizando este manifiesto, puede instalar un cluster Milvus con sus componentes y dependencias en pods separados.</p>
<div class="alert note">
<ul>
<li>Para instalar una instancia de Milvus en el modo autónomo en el que todos los componentes de Milvus están contenidos en un único pod, debe ejecutar <code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsarv3.enabled=false milvus/milvus &gt; milvus_manifest.yaml</code> en su lugar para renderizar plantillas de gráficos para una instancia de Milvus en modo autónomo.</li>
<li>Para cambiar las configuraciones de Milvus, descargue la plantilla <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a> plantilla, coloque en ella la configuración que desee y utilice <code translate="no">helm template -f values.yaml my-release milvus/milvus &gt; milvus_manifest.yaml</code> para renderizar el manifiesto en consecuencia.</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2. Descargar el script de extracción de imágenes</h3><p>El script de extracción de imágenes está desarrollado en Python. Debe descargar el script junto con sus dependencias en el archivo <code translate="no">requirement.txt</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3. Extraer y guardar imágenes</h3><p>Ejecute el siguiente comando para extraer y guardar las imágenes necesarias.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip3 install -r requirements.txt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">python3 save_image.py --manifest milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Las imágenes se extraen en una subcarpeta llamada <code translate="no">images</code> en el directorio actual.</p>
<h3 id="4-Load-images" class="common-anchor-header">4. Cargar imágenes</h3><p>Ahora puede cargar las imágenes a los hosts en el entorno restringido a la red de la siguiente manera:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5. Despliegue de Milvus</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Hasta ahora, puede seguir los pasos <a href="#2-Check-Milvus-cluster-status">2</a> y <a href="#3-Forward-a-local-port-to-Milvus">3</a> de la instalación en línea para comprobar el estado del cluster y reenviar un puerto local a Milvus.</p>
<h2 id="Upgrade-running-Milvus-cluster" class="common-anchor-header">Actualice el cluster Milvus en ejecución<button data-href="#Upgrade-running-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Ejecute el siguiente comando para actualizar su cluster Milvus en ejecución a la última versión:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release zilliztech/milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Desinstalar Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Ejecute el siguiente comando para desinstalar Milvus.</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
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
    </button></h2><p>Una vez instalado Milvus en Docker, puede:</p>
<ul>
<li><p>Comprobar <a href="/docs/es/quickstart.md">Hello Milvus</a> para ver qué puede hacer Milvus.</p></li>
<li><p>Aprender las operaciones básicas de Milvus:</p>
<ul>
<li><a href="/docs/es/manage_databases.md">Gestionar bases de datos</a></li>
<li><a href="/docs/es/manage-collections.md">Gestionar colecciones</a></li>
<li><a href="/docs/es/manage-partitions.md">Gestionar Particiones</a></li>
<li><a href="/docs/es/insert-update-delete.md">Insertar, Subinsertar y Eliminar</a></li>
<li><a href="/docs/es/single-vector-search.md">Búsqueda monovectorial</a></li>
<li><a href="/docs/es/multi-vector-search.md">Búsqueda Híbrida</a></li>
</ul></li>
<li><p><a href="/docs/es/upgrade_milvus_cluster-helm.md">Actualice Milvus utilizando Helm Chart</a>.</p></li>
<li><p><a href="/docs/es/scaleout.md">Escale su cluster Milvus</a>.</p></li>
<li><p>Despliegue su clúster Milvus en nubes:</p>
<ul>
<li><a href="/docs/es/eks.md">Amazon EKS</a></li>
<li><a href="/docs/es/gcp.md">Google Cloud</a></li>
<li><a href="/docs/es/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore Milvus <a href="/docs/es/milvus-webui.md">WebUI</a>, una interfaz web intuitiva para la observabilidad y gestión de Milvus.</p></li>
<li><p>Explore Milvus <a href="/docs/es/milvus_backup_overview.md">Backup</a>, una herramienta de código abierto para las copias de seguridad de los datos de Milvus.</p></li>
<li><p>Explore <a href="/docs/es/birdwatcher_overview.md">Birdwatcher</a>, una herramienta de código abierto para depurar Milvus y actualizaciones de configuración dinámicas.</p></li>
<li><p>Explore <a href="https://github.com/zilliztech/attu">Attu</a>, una herramienta GUI de código abierto para la gestión intuitiva de Milvus.</p></li>
<li><p><a href="/docs/es/monitor.md">Supervise Milvus con Prometheus</a>.</p></li>
</ul>
