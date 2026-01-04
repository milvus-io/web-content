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
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>El repositorio de Milvus Helm Charts en <code translate="no">https://github.com/milvus-io/milvus-helm</code> ha sido archivado. Ahora usamos el nuevo repositorio en <code translate="no">https://github.com/zilliztech/milvus-helm</code>. El repositorio archivado aún está disponible para gráficos hasta la versión 4.0.31, pero utilice el nuevo repositorio para versiones posteriores.</p>
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Despliegue un cluster Milvus<button data-href="#1-Deploy-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h3><p>Una vez que haya instalado la carta Helm, puede iniciar Milvus en Kubernetes. Esta sección le guía a través del despliegue de un cluster Milvus.</p>
<div class="alert note" id="standalone-deployment-note">
<p><strong>¿Necesita un despliegue independiente en su lugar?</strong></p>
<p>Si prefiere desplegar Milvus en modo autónomo (nodo único) para desarrollo o pruebas, utilice este comando:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.8 \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Nota</strong>: El modo autónomo utiliza Woodpecker como cola de mensajes predeterminada y habilita el componente Streaming Node. Para más detalles, consulte la <a href="/docs/es/architecture_overview.md">Descripción general de la arquitectura</a> y el <a href="/docs/es/use-woodpecker.md">Uso de Woodpecker</a>.</p>
</div>
<p><strong>Despliegue del cluster Milvus:</strong></p>
<p>El siguiente comando despliega un cluster Milvus con configuración optimizada para v2.6.8, utilizando Woodpecker como cola de mensajes recomendada:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.8 \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Qué hace este comando:</strong></p>
<ul>
<li>Utiliza <strong>Woodpecker</strong> como cola de mensajes (recomendado para reducir el mantenimiento)</li>
<li>Activa el nuevo componente <strong>Streaming Node</strong> para mejorar el rendimiento.</li>
<li>Desactiva el nodo de <strong>índice</strong> heredado (la funcionalidad la gestiona ahora el nodo de datos).</li>
<li>Desactiva Pulsar para utilizar en su lugar Woodpecker</li>
</ul>
<div class="alert note">
<p><strong>Cambios de arquitectura en Milvus 2.6.x:</strong></p>
<ul>
<li><strong>Cola de mensajes</strong>: Ahora se recomienda <strong>Woodpecker</strong> (reduce el mantenimiento de la infraestructura en comparación con Pulsar)</li>
<li><strong>Nuevo componente</strong>: <strong>Streaming Node</strong> se introduce y se activa por defecto</li>
<li><strong>Componentes fusionados</strong>: El <strong>nodo de índice</strong> y el <strong>nodo de datos</strong> se combinan en un único <strong>nodo de datos</strong>.</li>
</ul>
<p>Para más detalles sobre la arquitectura, consulte la <a href="/docs/es/architecture_overview.md">Visión general de la arquitectura</a>.</p>
</div>
<p><strong>Opciones alternativas de colas de mensajes:</strong></p>
<p>Si prefiere utilizar <strong>Pulsar</strong> (opción tradicional) en lugar de Woodpecker:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.8 \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Pasos siguientes</strong>: El comando anterior despliega Milvus con las configuraciones recomendadas. Para uso en producción:</p>
<ul>
<li>Utilice la <a href="https://milvus.io/tools/sizing">herramienta Milvus Sizing Tool</a> para optimizar las configuraciones en función del tamaño de sus datos</li>
<li>Revise <a href="https://milvus.io/docs/system_configuration.md">la Lista de comprobación de configuraciones del sistema Milvus</a> para conocer las opciones de configuración avanzadas</li>
</ul>
<div class="alert note">
<p><strong>Notas importantes:</strong></p>
<ul>
<li><strong>Nomenclatura de versiones</strong>: Utilice solo letras, números y guiones (no se permiten puntos)</li>
<li><strong>Kubernetes v1.25+</strong>: Si tiene problemas con PodDisruptionBudget, utilice esta solución:<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> pulsar.bookkeeper.pdb.usePolicy=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsar.broker.pdb.usePolicy=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsar.proxy.pdb.usePolicy=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsar.zookeeper.pdb.usePolicy=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Para obtener más información, consulte <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a> y la <a href="https://helm.sh/docs/">documentación de Helm</a>.</p>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Compruebe el estado del cluster Milvus<button data-href="#2-Check-Milvus-cluster-status" class="anchor-icon" translate="no">
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
    </button></h3><p>Verifique que su despliegue se ha realizado correctamente comprobando el estado del pod:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p><strong>Espere a que todos los pods muestren el estado "Running".</strong> Con la configuración v2.6.8, debería ver pods similares a:</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-68</span>cb87dcbd<span class="hljs-number">-4</span>khpm      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>mixcoord<span class="hljs-number">-7</span>fb9488465<span class="hljs-operator">-</span>dmbbj      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-6</span>bd7f5587<span class="hljs-operator">-</span>ds2xv          <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-5</span>cd8fff495<span class="hljs-operator">-</span>k6gtg     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>streaming<span class="hljs-operator">-</span>node<span class="hljs-operator">-</span>xxxxxxxxx       <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
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
<p><strong>Componentes clave a verificar:</strong></p>
<ul>
<li><strong>Componentes Milvus</strong>: <code translate="no">mixcoord</code>, <code translate="no">datanode</code>, <code translate="no">querynode</code>, <code translate="no">proxy</code>, <code translate="no">streaming-node</code></li>
<li><strong>Dependencias</strong>: <code translate="no">etcd</code> (metadatos), <code translate="no">minio</code> (almacenamiento de objetos), <code translate="no">pulsar</code> (cola de mensajes)</li>
</ul>
<p>También puede acceder a la <strong>WebUI</strong> de Milvus en <code translate="no">http://127.0.0.1:9091/webui/</code> una vez que se haya configurado el reenvío de puertos (véase el paso siguiente). Para más detalles, consulte <a href="/docs/es/milvus-webui.md">Milvus WebUI</a>.</p>
<h3 id="3-Connect-to-Milvus" class="common-anchor-header">3. Conectarse a Milvus<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Para conectarse a su cluster Milvus desde fuera de Kubernetes, necesita configurar el reenvío de puertos.</p>
<p><strong>Configure el reenvío de puertos:</strong></p>
<pre><code translate="no" class="language-bash">kubectl port-forward service/my-release-milvus 27017:19530
<button class="copy-code-btn"></button></code></pre>
<p>Este comando reenvía su puerto local <code translate="no">27017</code> al puerto de Milvus <code translate="no">19530</code>. Usted debe ver:</p>
<pre><code translate="no"><span class="hljs-attribute">Forwarding</span> from <span class="hljs-number">127.0.0.1:27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Detalles de la conexión:</strong></p>
<ul>
<li><strong>Conexión local</strong>: <code translate="no">localhost:27017</code></li>
<li><strong>Puerto por defecto de Milvus</strong>: <code translate="no">19530</code></li>
</ul>
<div class="alert note">
<p><strong>Opciones para el reenvío de puertos:</strong></p>
<ul>
<li><strong>Auto-assign local port</strong>: Utilice <code translate="no">:19530</code> en lugar de <code translate="no">27017:19530</code> para que kubectl elija un puerto disponible</li>
<li><strong>Escuchar en todas las interfaces</strong>: Añadir <code translate="no">--address 0.0.0.0</code> para permitir conexiones desde otras máquinas:<pre><code translate="no" class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
<button class="copy-code-btn"></button></code></pre></li>
<li><strong>Despliegue autónomo</strong>: Si utiliza el modo autónomo, el nombre del servicio sigue siendo el mismo</li>
</ul>
</div>
<p><strong>Mantenga este terminal abierto</strong> mientras utiliza Milvus. Ahora puede conectarse a Milvus utilizando cualquier SDK de Milvus en <code translate="no">localhost:27017</code>.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Opcional) Actualizar las configuraciones de Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede actualizar las configuraciones de su cluster Milvus editando el archivo <code translate="no">values.yaml</code> y aplicándolo de nuevo.</p>
<ol>
<li><p>Cree un archivo <code translate="no">values.yaml</code> con las configuraciones deseadas.</p>
<p>A continuación se asume que desea habilitar <code translate="no">proxy.http</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    proxy:
      http:
        enabled: true
</span><button class="copy-code-btn"></button></code></pre>
<p>Para conocer los elementos de configuración aplicables, consulte <a href="/docs/es/system_configuration.md">Configuración del sistema</a>.</p></li>
<li><p>Aplique el archivo <code translate="no">values.yaml</code>.</p></li>
</ol>
<pre><code translate="no" class="language-shell">helm upgrade my-release zilliztech/milvus --namespace my-namespace -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<ol>
<li><p>Compruebe las configuraciones actualizadas.</p>
<pre><code translate="no" class="language-shell">helm get values my-release
<button class="copy-code-btn"></button></code></pre>
<p>La salida debería mostrar las configuraciones actualizadas.</p></li>
</ol>
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
    </button></h2><p>Milvus se suministra con una herramienta GUI integrada llamada Milvus WebUI a la que puede acceder a través de su navegador. Milvus Web UI mejora la observabilidad del sistema con una interfaz sencilla e intuitiva. Puede utilizar Milvus Web UI para observar las estadísticas y métricas de los componentes y dependencias de Milvus, comprobar los detalles de la base de datos y la colección, y listar las configuraciones detalladas de Milvus. Para más detalles sobre Milvus Web UI, consulte <a href="/docs/es/milvus-webui.md">Milvus WebUI</a></p>
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
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1. Obtenga el manifiesto de Milvus<button data-href="#1-Get-Milvus-manifest" class="anchor-icon" translate="no">
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
    </button></h3><p>Ejecute el siguiente comando para obtener el manifiesto de Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm template my-release zilliztech/milvus &gt; milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>El comando anterior genera plantillas de gráficos para un cluster Milvus y guarda el resultado en un archivo de manifiesto llamado <code translate="no">milvus_manifest.yaml</code>. Utilizando este manifiesto, puede instalar un cluster Milvus con sus componentes y dependencias en pods separados.</p>
<div class="alert note">
<ul>
<li>Para instalar una instancia de Milvus en el modo autónomo en el que todos los componentes de Milvus están contenidos en un único pod, debe ejecutar <code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsarv3.enabled=false zilliztech/milvus &gt; milvus_manifest.yaml</code> en su lugar para renderizar plantillas de gráficos para una instancia de Milvus en modo autónomo.</li>
<li>Para cambiar las configuraciones de Milvus, descargue la plantilla <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a> plantilla, coloque en ella la configuración que desee y utilice <code translate="no">helm template -f values.yaml my-release zilliztech/milvus &gt; milvus_manifest.yaml</code> para renderizar el manifiesto en consecuencia.</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2. Descargar el script de extracción de imágenes<button data-href="#2-Download-image-pulling-script" class="anchor-icon" translate="no">
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
    </button></h3><p>El script de extracción de imágenes está desarrollado en Python. Debe descargar el script junto con sus dependencias en el archivo <code translate="no">requirement.txt</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3. Extraer y guardar imágenes<button data-href="#3-Pull-and-save-images" class="anchor-icon" translate="no">
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
    </button></h3><p>Ejecute el siguiente comando para extraer y guardar las imágenes necesarias.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip3 install -r requirements.txt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">python3 save_image.py --manifest milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Las imágenes se extraen en una subcarpeta llamada <code translate="no">images</code> en el directorio actual.</p>
<h3 id="4-Load-images" class="common-anchor-header">4. Cargar imágenes<button data-href="#4-Load-images" class="anchor-icon" translate="no">
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
    </button></h3><p>Ahora puede cargar las imágenes a los hosts en el entorno restringido a la red de la siguiente manera:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5. Despliegue de Milvus<button data-href="#5-Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f milvus_manifest.yaml</span>
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
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release zilliztech/milvus --reset-then-reuse-values</span>
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
