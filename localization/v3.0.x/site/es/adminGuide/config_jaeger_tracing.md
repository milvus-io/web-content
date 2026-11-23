---
id: config_jaeger_tracing.md
title: Configurar el seguimiento
related_key: 'Jaeger, Milvus, Trace'
summary: >-
  Esta guía ofrece instrucciones sobre cómo configurar Jaeger para recopilar
  trazas para Milvus.
---
<h1 id="Configure-Trace" class="common-anchor-header">Configurar el seguimiento<button data-href="#Configure-Trace" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía ofrece instrucciones sobre cómo configurar Jaeger para recopilar trazas para Milvus.</p>
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
<li>Ha instalado las herramientas necesarias, incluyendo <a href="https://helm.sh/docs/intro/install/">Helm</a> y <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
</ul>
<h2 id="Deploy-Jaeger" class="common-anchor-header">Implementar Jaeger<button data-href="#Deploy-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>Jaeger es una plataforma de rastreo distribuido lanzada como código abierto por <a href="http://uber.github.io/">Uber Technologies</a>.</p>
<p>Esta guía describe cómo implementar Jaeger v2 con el <a href="https://github.com/jaegertracing/helm-charts">gráfico Helm de Jaeger</a>. De forma predeterminada, el gráfico implementa Jaeger con el modelo «todo en uno» y almacenamiento en memoria, lo cual es adecuado para realizar pruebas. Para conocer otras formas de ejecutar Jaeger en Kubernetes, consulta <a href="https://www.jaegertracing.io/docs/2.23/deployment/kubernetes/">Implementación en Kubernetes</a>.</p>
<h3 id="1-Install-Jaeger" class="common-anchor-header">1. Instalar Jaeger<button data-href="#1-Install-Jaeger" class="anchor-icon" translate="no">
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
    </button></h3><p>Instala Jaeger en el espacio de nombres donde instales Milvus. La configuración de Milvus de la siguiente sección hace referencia al servicio Jaeger por su nombre abreviado, <code translate="no">jaeger</code>, y Kubernetes resuelve un nombre de servicio sin espacio de nombres únicamente dentro del espacio de nombres del pod que realiza la consulta.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add jaegertracing https://jaegertracing.github.io/helm-charts</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install jaeger jaegertracing/jaeger --version 4.19.0</span>
<button class="copy-code-btn"></button></code></pre>
<p>El archivo README del gráfico lo marca como experimental e indica que pueden producirse cambios importantes en las versiones menores, por lo que el comando fija la versión del gráfico. La versión 4.19.0 del gráfico implementa Jaeger 2.23.0.</p>
<h3 id="2-Check-the-Jaeger-pod" class="common-anchor-header">2. Comprobar el pod de Jaeger<button data-href="#2-Check-the-Jaeger-pod" class="anchor-icon" translate="no">
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
    </button></h3><p>Para comprobar que el pod de Jaeger está en ejecución, ejecuta el siguiente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods -l app.kubernetes.io/instance=jaeger,app.kubernetes.io/component=all-in-one</span>
<button class="copy-code-btn"></button></code></pre>
<p>El gráfico crea un servicio denominado <code translate="no">jaeger</code>. El servicio expone el receptor gRPC de OTLP en el puerto <code translate="no">4317</code> y la interfaz de usuario de Jaeger en el puerto <code translate="no">16686</code>.</p>
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
    </button></h2><p>Para enviar trazas desde Milvus a Jaeger a través de OTLP, guarda la siguiente configuración en un archivo llamado <code translate="no">values.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    trace:
      exporter: otlp
      sampleFraction: 1
      otlp:
        endpoint: &quot;jaeger:4317&quot;
        method: grpc
        secure: false
</span><button class="copy-code-btn"></button></code></pre>
<p>Con esta configuración, Milvus toma una muestra de cada solicitud (<code translate="no">sampleFraction: 1</code>) y exporta los rastros a través de gRPC OTLP sin TLS (<code translate="no">secure: false</code>) al puerto <code translate="no">4317</code> del servicio <code translate="no">jaeger</code>.</p>
<p>Para aplicar la configuración anterior a una nueva implementación de Milvus, ejecuta los siguientes comandos:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade --install my-release zilliztech/milvus --version 5.0.22 -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para aplicar la configuración anterior a una implementación existente de Milvus, ejecuta el siguiente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Este comando utiliza <code translate="no">--reset-then-reuse-values</code>, que requiere Helm 3.14 o posterior. Con esta opción, Helm restablece los valores a los predeterminados de la versión del gráfico establecida en <code translate="no">--version</code>, aplica los valores de tu versión actual y, a continuación, aplica los valores de <code translate="no">-f</code>. Por lo tanto, cada valor de <code translate="no">values.yaml</code> anula el valor de tu versión actual, y la entrada <code translate="no">user.yaml</code> en <code translate="no">extraConfigFiles</code> se sustituye en su totalidad. Para encontrar <code translate="no">&lt;current-chart-version&gt;</code>, ejecuta <code translate="no">helm list</code> y elimina el prefijo <code translate="no">milvus-</code> del valor de la columna <code translate="no">CHART</code>. Si ejecutas <code translate="no">helm upgrade</code> con <code translate="no">-f</code> o <code translate="no">--set</code>, pero sin <code translate="no">--reset-then-reuse-values</code> ni <code translate="no">--reuse-values</code>, Helm no conservará los valores que hayas establecido en el momento de la instalación.</p>
</div>
<h2 id="View-Traces" class="common-anchor-header">Ver trazas<button data-href="#View-Traces" class="anchor-icon" translate="no">
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
    </button></h2><p>El servicio <code translate="no">jaeger</code> es de tipo <code translate="no">ClusterIP</code>, y el gráfico no crea un Ingress de forma predeterminada. Para abrir la interfaz de usuario de Jaeger desde tu equipo local, reenvía el puerto de la interfaz de usuario:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward svc/jaeger 16686:16686</span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, abre <code translate="no">http://localhost:16686</code> en un navegador.</p>
<p>La siguiente captura de pantalla muestra la interfaz de usuario de Jaeger con los rastros de Milvus durante una operación de búsqueda y una operación de recopilación de carga:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" /> 
   <span>Solicitud de búsqueda de trazas</span>
  
 </span></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" /> 
   <span>Rastreo de una solicitud de recopilación de carga</span>
  
 </span></p>
