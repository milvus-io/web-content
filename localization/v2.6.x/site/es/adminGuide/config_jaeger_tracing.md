---
id: config_jaeger_tracing.md
title: Configurar Rastreo
related_key: 'Jaeger, Milvus, Trace'
summary: >-
  Esta guía proporciona instrucciones sobre cómo configurar Jaeger para recoger
  trazas para Milvus.
---
<h1 id="Configure-Trace" class="common-anchor-header">Configurar Rastreo<button data-href="#Configure-Trace" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía proporciona instrucciones sobre cómo configurar Jaeger para recoger trazas para Milvus.</p>
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
<li>Debe tener instaladas las herramientas necesarias, incluyendo <a href="https://helm.sh/docs/intro/install/">Helm</a> y <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
<li>Cert-manager versión 1.6.1 o superior debe estar instalado. Puede encontrar una guía de instalación <a href="https://cert-manager.io/v1.6-docs/installation/#default-static-install">aquí</a>.</li>
</ul>
<h2 id="Deply-Jaeger" class="common-anchor-header">Instalar Jaeger<button data-href="#Deply-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>Jaeger es una plataforma de rastreo distribuido liberada como código abierto por <a href="http://uber.github.io/">Uber Technologies</a>.</p>
<h3 id="1-Installing-the-Jaeger-Operator-on-Kubernetes" class="common-anchor-header">1. Instalación del operador Jaeger en Kubernetes</h3><p>Para instalar el operador, ejecute:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl create namespace observability</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.62.0/jaeger-operator.yaml -n observability</span>
<button class="copy-code-btn"></button></code></pre>
<p>En este punto, debería haber un despliegue <code translate="no">jaeger-operator</code> disponible. Puedes verlo ejecutando el siguiente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get deployment jaeger-operator -n observability</span>

NAME              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
jaeger-operator   1         1         1            1           48s
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Deploy-Jaeger" class="common-anchor-header">2. Despliegue de Jaeger</h3><p>La forma más sencilla de crear una instancia de Jaeger es crear un archivo YAML como el siguiente ejemplo. Esto instalará la estrategia AllInOne predeterminada, que despliega la imagen <strong>todo en uno</strong> (que combina <strong>jaeger-agent</strong>, <strong>jaeger-collector</strong>, <strong>jaeger-query</strong> y Jaeger UI) en un único pod, utilizando <strong>almacenamiento en memoria</strong> de forma predeterminada.</p>
<p>Si desea almacenar trazas durante mucho tiempo, consulte <a href="https://www.jaegertracing.io/docs/1.62/operator/#production-strategy">production-strategy</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">jaegertracing.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Jaeger</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">jaeger</span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, el archivo YAML puede utilizarse con <code translate="no">kubectl</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f simplest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>En unos segundos, estará disponible una nueva instancia todo en uno en memoria de Jaeger, adecuada para demostraciones rápidas y fines de desarrollo. Para comprobar las instancias que se han creado, liste los objetos jaeger:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get jaegers</span>

NAME     STATUS    VERSION   STRATEGY   STORAGE   AGE
jaeger   Running   1.62.0    allinone   memory    13s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">Instalar Milvus con Helm Chart<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede instalar o actualizar Milvus con Helm Chart con la siguiente configuración:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    trace:
      exporter: jaeger
      sampleFraction: 1
      jaeger:
        url: &quot;http://jaeger-collector:14268/api/traces&quot;
</span><button class="copy-code-btn"></button></code></pre>
<p>Para aplicar la configuración anterior a un nuevo despliegue de Milvus , puede ejecutar el siguiente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade --install -f values.yaml my-release milvus/milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para aplicar la configuración anterior a un despliegue de Milvus existente, puede ejecutar el siguiente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release -f values.yaml milvus/milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-Traces" class="common-anchor-header">Ver rastros<button data-href="#View-Traces" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que ha desplegado Jaeger y Milvus con Helm Chart, un ingress ha sido habilitado por dfault. Puede ver la entrada ejecutando el siguiente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get ingress</span>

NAME           CLASS    HOSTS   ADDRESS         PORTS   AGE
jaeger-query   &lt;none&gt;   *       192.168.122.34  80      14m
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que el ingress está disponible, puede acceder a la UI de Jaeger navegando a <code translate="no">http://${ADDRESS}</code>. Reemplace <code translate="no">${ADDRESS}</code> con la dirección IP real del ingress.</p>
<p>La siguiente captura de pantalla muestra la UI de Jaeger con las trazas de Milvus durante una operación de búsqueda y una operación de recogida de carga:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" />
   </span> <span class="img-wrapper"> <span>Solicitud de búsqueda de trazas</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" />
   </span> <span class="img-wrapper"> <span>Traza de solicitud de recogida de carga</span> </span></p>
