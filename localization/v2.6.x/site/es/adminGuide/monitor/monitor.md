---
id: monitor.md
title: Implantar servicios de supervisión
related_key: 'monitor, alert'
summary: >-
  Aprenda a desplegar servicios de monitorización para un cluster Milvus
  utilizando Prometheus.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Despliegue de Servicios de Monitoreo en Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema describe cómo utilizar Prometheus para desplegar servicios de monitorización para un clúster Milvus en Kubernetes.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Monitorización de métricas con Prometheus<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>Las métricas son indicadores que proporcionan información sobre el estado de ejecución de su sistema. Por ejemplo, con las métricas, puede comprender cuánta memoria o recursos de CPU consume un nodo de datos en Milvus. Conocer el rendimiento y el estado de los componentes de su clúster Milvus le permite estar bien informado y, por tanto, tomar mejores decisiones y ajustar la asignación de recursos de forma más oportuna.</p>
<p>Generalmente, las métricas se almacenan en una base de datos de series temporales (TSDB), como <a href="https://prometheus.io/">Prometheus</a>, y las métricas se registran con una marca de tiempo. En el caso de la supervisión de los servicios de Milvus, puede utilizar Prometheus para extraer datos de los puntos finales establecidos por los exportadores. A continuación, Prometheus exporta las métricas de cada componente de Milvus en <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>Sin embargo, puede tener varias réplicas para un componente, lo que complica demasiado la configuración manual de Prometheus. Por lo tanto, puede utilizar Prometheus <a href="https://github.com/prometheus-operator/prometheus-operator">Operator</a>, una extensión de Kubernetes, para una gestión automatizada y eficaz de las instancias de supervisión de Prometheus. El uso de Prometheus Operator le ahorra la molestia de añadir manualmente objetivos de métricas y proveedores de servicios.</p>
<p>La definición personalizada de recursos (CRD) de ServiceMonitor le permite definir de forma declarativa cómo se supervisa un conjunto dinámico de servicios. También permite seleccionar qué servicios supervisar con la configuración deseada mediante selecciones de etiquetas. Con Prometheus Operator, puede introducir convenciones que especifiquen cómo se exponen las métricas. Los nuevos servicios pueden descubrirse automáticamente siguiendo la convención que establezca sin necesidad de reconfiguración manual.</p>
<p>La siguiente imagen ilustra el flujo de trabajo de Prometheus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" />
   </span> <span class="img-wrapper"> <span>Arquitectura_de_Prometeo</span> </span></p>
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
    </button></h2><p>Este tutorial utiliza <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a> para ahorrarle la molestia de instalar y configurar manualmente cada componente de monitorización y alerta.</p>
<p>Kube-prometheus recopila manifiestos de Kubernetes, paneles de control <a href="http://grafana.com/">de Grafana</a> y <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">reglas de Prometheus</a> combinadas con documentación y scripts.</p>
<p>Antes de desplegar los servicios de monitorización, debe crear una pila de monitorización utilizando la configuración del directorio de manifiestos de kube-prometheus.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/prometheus-operator/kube-prometheus.git</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> kube-prometheus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply --server-side -f manifests/setup</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f manifests/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
El clusterrole prometheus-k8s por defecto no puede capturar las métricas de milvus, necesita parchearlo:</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para eliminar una pila, ejecute <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Despliegue de servicios de monitorización en Kubernetes<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Acceda a los cuadros de mando<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>Reenvíe el servicio Prometheus al puerto <code translate="no">9090</code>, y el servicio Grafana al puerto <code translate="no">3000</code>.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/prometheus-k8s 9090</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/grafana 3000</span>
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
    </button></h3><p>El ServiceMonitor no está habilitado para Milvus Helm de forma predeterminada. Después de instalar el Operador Prometheus en el clúster Kubernetes, puede habilitarlo añadiendo el parámetro <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<h4 id="With-Helm" class="common-anchor-header">Con Helm</h4><p>Puede habilitar el ServiceMonitor configurando el parámetro <code translate="no">metrics.serviceMonitor.enabled=true</code> de la siguiente manera si ha instalado la tabla Milvus Helm.</p>
<pre><code translate="no">```
$ helm upgrade my-release milvus/milvus --set metrics.serviceMonitor.enabled=true --reuse-values
```
</code></pre>
<p>Cuando finalice la instalación, utilice <code translate="no">kubectl</code> para comprobar el recurso ServiceMonitor.</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">Con Milvus Operator</h4><p>Puede habilitar el ServiceMonitor de la siguiente manera si ha instalado Milvus utilizando el Milvus Operator.</p>
<ol>
<li><p>Ejecute el siguiente comando para editar el recurso personalizado MIlvus. El siguiente comando asume que el recurso personalizado se llama <code translate="no">my-release</code>.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edite el campo <code translate="no">spec.components.disableMetric</code> a <code translate="no">false</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Guarde y salga del editor.</p></li>
<li><p>Espera a que el operador reconcilie los cambios. Puede comprobar el estado del recurso personalizado Milvus ejecutando el siguiente comando.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> milvus my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span> <span class="hljs-operator">-</span>o yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>El campo <code translate="no">status.components.metrics.serviceMonitor.enabled</code> debería ser <code translate="no">true</code>.</p>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. Compruebe las métricas<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Tras habilitar ServiceMonitor, puede acceder al panel de Prometheus en <code translate="no">http://localhost:9090/</code>.</p>
<p>Haga clic en la pestaña <code translate="no">Status</code> y, a continuación, en <code translate="no">Targets</code>. Debería ver los objetivos de los componentes de Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" />
   </span> <span class="img-wrapper"> <span>Prometheus_targets</span> </span></p>
<p>Haga clic en la pestaña <code translate="no">Graph</code> e introduzca la expresión <code translate="no">up{job=&quot;default/my-release&quot;}</code> en el cuadro de entrada de expresiones. Debería ver las métricas de los componentes Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" />
   </span> <span class="img-wrapper"> <span>Prometheus_graph</span> </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. Compruebe el ServiceMonitor<button data-href="#4-Check-the-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                           AGE
<span class="hljs-keyword">my</span>-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Siguiente paso<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Si has desplegado servicios de monitorización para el clúster Milvus, puede que también quieras aprender a:<ul>
<li><a href="/docs/es/visualize.md">Visualizar las métricas de Milvus en Grafana</a></li>
<li><a href="/docs/es/alert.md">Crear una alerta para los servicios de Milvus</a></li>
<li>Ajustar su <a href="/docs/es/allocate.md">asignación de recursos</a></li>
</ul></li>
<li>Si busca información sobre cómo escalar un clúster Milvus:<ul>
<li>Aprender a <a href="/docs/es/scaleout.md">escalar un clúster Milvus</a></li>
</ul></li>
<li>Si está interesado en actualizar la versión de Milvus,<ul>
<li>Lea la <a href="/docs/es/upgrade_milvus_cluster-operator.md">guía para actualizar Milvus cluster</a> y <a href="/docs/es/upgrade_milvus_standalone-operator.md">la</a> <a href="/docs/es/upgrade_milvus_cluster-operator.md">guía</a> <a href="/docs/es/upgrade_milvus_standalone-operator.md">para actualizar Milvus standalone</a>.</li>
</ul></li>
</ul>
