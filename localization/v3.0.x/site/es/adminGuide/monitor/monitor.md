---
id: monitor.md
title: Implementar servicios de supervisión
related_key: 'monitor, alert'
summary: >-
  Descubre cómo implementar servicios de monitorización para un clúster de
  Milvus utilizando Prometheus.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Implementación de servicios de monitorización en Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>En este tema se describe cómo utilizar Prometheus para implementar servicios de monitorización para un clúster de Milvus en Kubernetes.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Supervisar métricas con Prometheus<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>Las métricas son indicadores que proporcionan información sobre el estado de funcionamiento de tu sistema. Por ejemplo, gracias a las métricas, puedes saber cuánta memoria o recursos de CPU consume un nodo de datos en Milvus. Conocer el rendimiento y el estado de los componentes de tu clúster de Milvus te permite estar bien informado y, por lo tanto, tomar mejores decisiones y ajustar la asignación de recursos de forma más oportuna.</p>
<p>Por lo general, las métricas se almacenan en una base de datos de series temporales (TSDB), como <a href="https://prometheus.io/">Prometheus</a>, y se registran con una marca de tiempo. En el caso de la monitorización de los servicios de Milvus, puede utilizar Prometheus para extraer datos de los puntos finales configurados por los exportadores. A continuación, Prometheus exporta las métricas de cada componente de Milvus a <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>Sin embargo, es posible que tenga varias réplicas de un mismo componente, lo que complica demasiado la configuración manual de Prometheus. Por ello, puede utilizar <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a>, una extensión de Kubernetes, para gestionar de forma automatizada y eficaz las instancias de monitorización de Prometheus. El uso de Prometheus Operator le ahorra la molestia de añadir manualmente objetivos de métricas y proveedores de servicios.</p>
<p>La definición de recurso personalizado (CRD) de ServiceMonitor permite definir de forma declarativa cómo se supervisan un conjunto dinámico de servicios. También permite seleccionar qué servicios supervisar con la configuración deseada mediante la selección de etiquetas. Con Prometheus Operator, puedes establecer convenciones que especifiquen cómo se exponen las métricas. Los nuevos servicios se pueden detectar automáticamente siguiendo la convención establecida, sin necesidad de reconfigurarlos manualmente.</p>
<p>La siguiente imagen ilustra el flujo de trabajo de Prometheus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" /> 
   <span>Prometheus_architecture</span>
  
 </span></p>
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
    </button></h2><p>Este tutorial utiliza <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a> para ahorrarte la molestia de instalar y configurar manualmente cada componente de monitorización y alertas.</p>
<p>Kube-prometheus recopila manifiestos de Kubernetes, paneles <a href="http://grafana.com/">de Grafana</a> y <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">reglas de Prometheus</a>, junto con documentación y scripts.</p>
<p>Antes de implementar los servicios de monitorización, debes crear una pila de monitorización utilizando la configuración del directorio de manifiestos de kube-prometheus.</p>
<p>Los siguientes comandos utilizan la rama « <code translate="no">release-0.19</code> » de kube-prometheus, que es compatible con Kubernetes 1.35, 1.36 y 1.37. Para elegir la rama adecuada para tu versión de Kubernetes, consulta la <a href="https://github.com/prometheus-operator/kube-prometheus#compatibility">matriz de compatibilidad de kube-prometheus</a>.</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> --branch release-0.19 https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
El clusterrole predeterminado de prometheus-k8s no puede capturar las métricas de Milvus, por lo que es necesario aplicar un parche:
</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para eliminar una pila, ejecuta <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Implementar servicios de monitorización en Kubernetes<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Accede a los paneles de control<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>Reenvía el servicio de Prometheus al puerto <code translate="no">9090</code> y el servicio de Grafana al puerto <code translate="no">3000</code>.</p>
<pre><code translate="no" class="language-bash">$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. Habilitar ServiceMonitor<button data-href="#2-Enable-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>ServiceMonitor no está habilitado de forma predeterminada para Milvus Helm. Tras instalar el operador de Prometheus en el clúster de Kubernetes, puedes habilitarlo añadiendo el parámetro <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<h4 id="With-Helm" class="common-anchor-header">Con Helm</h4><p>Si ha instalado el gráfico de Helm de Milvus, puede habilitar ServiceMonitor configurando el parámetro <code translate="no">metrics.serviceMonitor.enabled=true</code> de la siguiente manera.</p>
<pre><code translate="no" class="language-bash">$ helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Este comando utiliza ` <code translate="no">--reset-then-reuse-values</code>`, lo que requiere Helm 3.14 o posterior. Con esta opción, Helm restablece los valores a los predeterminados de la versión del gráfico establecida en ` <code translate="no">--version</code>`, aplica los valores de su versión actual y, a continuación, aplica los valores de ` <code translate="no">--set</code>`. Para encontrar ` <code translate="no">&lt;current-chart-version&gt;</code>`, ejecute ` <code translate="no">helm list</code> ` y elimine el prefijo ` <code translate="no">milvus-</code> ` del valor de la columna ` <code translate="no">CHART</code> `. Si ejecuta <code translate="no">helm upgrade</code> con <code translate="no">-f</code> o <code translate="no">--set</code>, pero sin <code translate="no">--reset-then-reuse-values</code> ni <code translate="no">--reuse-values</code>, Helm no conservará los valores que haya establecido en el momento de la instalación.</p>
</div>
<p>Cuando finalice la instalación, utiliza <code translate="no">kubectl</code> para comprobar el recurso ServiceMonitor.</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">Con Milvus Operator</h4><p>Si has instalado Milvus mediante el Milvus Operator, este crea un PodMonitor en lugar de un ServiceMonitor. El PodMonitor tiene el mismo nombre que el recurso personalizado de Milvus. El operador lo crea únicamente cuando las métricas no están desactivadas en el recurso personalizado y el CRD de PodMonitor existe en el clúster. El directorio ` <code translate="no">manifests/setup</code> ` de `kube-prometheus` instala este CRD. Para asegurarte de que las métricas estén habilitadas, haz lo siguiente.</p>
<ol>
<li><p>Ejecuta el siguiente comando para editar el recurso personalizado de Milvus. El siguiente comando da por hecho que el recurso personalizado se llama <code translate="no">my-release</code>.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Modifique el campo <code translate="no">spec.components.disableMetric</code> para que quede como <code translate="no">false</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Guarda y sal del editor.</p></li>
<li><p>Espera a que el operador sincronice los cambios. Puedes comprobar el PodMonitor ejecutando el siguiente comando.</p>
<pre><code translate="no" class="language-bash">$ kubectl get podmonitor my-release
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. Comprueba las métricas<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Tras habilitar el ServiceMonitor o el PodMonitor, puedes acceder al panel de control de Prometheus en <code translate="no">http://localhost:9090/</code>.</p>
<p>Haz clic en la pestaña « <code translate="no">Status</code> » y, a continuación, en « <code translate="no">Targets</code> ». Deberías ver los objetivos de los componentes de Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" /> 
   <span>Prometheus_targets</span>
  
 </span></p>
<p>Haga clic en la pestaña « <code translate="no">Graph</code> » e introduzca la expresión « <code translate="no">up{app_kubernetes_io_instance=&quot;my-release&quot;}</code> » en el cuadro de entrada de expresiones. Debería ver las métricas de los componentes de Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" /> 
   <span>Prometheus_graph</span>
  
 </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. Comprueba el ServiceMonitor<button data-href="#4-Check-the-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Si has instalado Milvus con Helm, ejecuta el siguiente comando para mostrar el ServiceMonitor. El gráfico lo denomina « <code translate="no">my-release-milvus</code> » para un clúster de Milvus y « <code translate="no">my-release-milvus-standalone</code> » para una instancia independiente de Milvus.</p>
<pre><code translate="no" class="language-bash">$ kubectl get servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">NAME                           AGE
my-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Próximos pasos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Si has implementado servicios de monitorización para el clúster de Milvus, quizá también te interese aprender a:
<ul>
<li><a href="/docs/es/visualize.md">Visualizar las métricas de Milvus en Grafana</a></li>
<li><a href="/docs/es/alert.md">Crear una alerta para los servicios de Milvus</a></li>
<li>Ajustar la <a href="/docs/es/allocate.md">asignación de recursos</a></li>
</ul></li>
<li>Si buscas información sobre cómo escalar un clúster de Milvus:
<ul>
<li>Aprende <a href="/docs/es/scaleout.md">a escalar un clúster de Milvus</a></li>
</ul></li>
<li>Si te interesa actualizar la versión de Milvus,
<ul>
<li>Lee la <a href="/docs/es/upgrade_milvus_cluster-operator.md">guía para actualizar un clúster de Milvus</a> y <a href="/docs/es/upgrade_milvus_standalone-operator.md">la guía para actualizar Milvus en modo autónomo</a>.</li>
</ul></li>
</ul>
