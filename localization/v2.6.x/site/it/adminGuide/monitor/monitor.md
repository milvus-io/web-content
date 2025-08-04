---
id: monitor.md
title: Distribuzione dei servizi di monitoraggio
related_key: 'monitor, alert'
summary: >-
  Imparare a distribuire i servizi di monitoraggio per un cluster Milvus usando
  Prometheus.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Distribuzione dei servizi di monitoraggio su Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento descrive come utilizzare Prometheus per distribuire i servizi di monitoraggio per un cluster Milvus su Kubernetes.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Monitorare le metriche con Prometheus<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>Le metriche sono indicatori che forniscono informazioni sullo stato di funzionamento del sistema. Ad esempio, con le metriche è possibile capire quante risorse di memoria o CPU sono consumate da un nodo dati in Milvus. Essere consapevoli delle prestazioni e dello stato dei componenti del vostro cluster Milvus vi rende ben informati e quindi in grado di prendere decisioni migliori e di regolare l'allocazione delle risorse in modo più tempestivo.</p>
<p>In genere, le metriche sono memorizzate in un database di serie temporali (TSDB), come <a href="https://prometheus.io/">Prometheus</a>, e le metriche sono registrate con un timestamp. Nel caso del monitoraggio dei servizi Milvus, è possibile utilizzare Prometheus per estrarre i dati dagli endpoint impostati dagli esportatori. Prometheus esporta quindi le metriche di ciascun componente Milvus all'indirizzo <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>Tuttavia, è possibile avere diverse repliche per un componente, il che rende troppo complicata la configurazione manuale di Prometheus. Pertanto, è possibile utilizzare <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a>, un'estensione di Kubernetes, per una gestione automatizzata ed efficace delle istanze di monitoraggio di Prometheus. L'uso di Prometheus Operator evita di aggiungere manualmente i target metrici e i service provider.</p>
<p>La ServiceMonitor Custom Resource Definition (CRD) consente di definire in modo dichiarativo il monitoraggio di un insieme dinamico di servizi. Consente inoltre di selezionare i servizi da monitorare con la configurazione desiderata utilizzando le selezioni delle etichette. Con Prometheus Operator, è possibile introdurre convenzioni che specificano come vengono esposte le metriche. I nuovi servizi possono essere scoperti automaticamente seguendo le convenzioni impostate, senza bisogno di riconfigurazioni manuali.</p>
<p>L'immagine seguente illustra il flusso di lavoro di Prometheus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" />
   </span> <span class="img-wrapper"> <span>Architettura_Prometheus</span> </span></p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa esercitazione utilizza <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a> per risparmiare la fatica di installare e configurare manualmente ogni componente di monitoraggio e avviso.</p>
<p>Kube-prometheus raccoglie i manifesti di Kubernetes, le dashboard <a href="http://grafana.com/">di Grafana</a> e le <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">regole di Prometheus</a>, insieme a documentazione e script.</p>
<p>Prima di distribuire i servizi di monitoraggio, è necessario creare uno stack di monitoraggio utilizzando la configurazione nella directory kube-prometheus manifests.</p>
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
Il clusterrole predefinito prometheus-k8s non è in grado di catturare le metriche di milvus; è necessario applicare una patch:</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per eliminare uno stack, eseguire <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code>.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Distribuire i servizi di monitoraggio su Kubernetes<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Accedere ai cruscotti</h3><p>Inoltrare il servizio Prometheus alla porta <code translate="no">9090</code> e il servizio Grafana alla porta <code translate="no">3000</code>.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/prometheus-k8s 9090</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/grafana 3000</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. Abilitare ServiceMonitor</h3><p>Il ServiceMonitor non è abilitato per Milvus Helm per impostazione predefinita. Dopo aver installato Prometheus Operator nel cluster Kubernetes, è possibile abilitarlo aggiungendo il parametro <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<h4 id="With-Helm" class="common-anchor-header">Con Helm</h4><p>È possibile abilitare il ServiceMonitor impostando il parametro <code translate="no">metrics.serviceMonitor.enabled=true</code> come segue se è stato installato il grafico Milvus Helm.</p>
<pre><code translate="no">```
$ helm upgrade my-release milvus/milvus --set metrics.serviceMonitor.enabled=true --reuse-values
```
</code></pre>
<p>Al termine dell'installazione, utilizzare <code translate="no">kubectl</code> per controllare la risorsa ServiceMonitor.</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">Con Milvus Operator</h4><p>Se avete installato Milvus con Milvus Operator, potete attivare ServiceMonitor come segue.</p>
<ol>
<li><p>Eseguire il seguente comando per modificare la risorsa personalizzata di Milvus. Il comando seguente presuppone che la risorsa personalizzata si chiami <code translate="no">my-release</code>.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Modificare il campo <code translate="no">spec.components.disableMetrics</code> in <code translate="no">false</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetrics:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Salvare e uscire dall'editor.</p></li>
<li><p>Attendere che l'operatore riconcili le modifiche. È possibile verificare lo stato della risorsa personalizzata Milvus eseguendo il seguente comando.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> milvus my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span> <span class="hljs-operator">-</span>o yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Il campo <code translate="no">status.components.metrics.serviceMonitor.enabled</code> dovrebbe essere <code translate="no">true</code>.</p>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. Controllare le metriche</h3><p>Dopo aver abilitato il ServiceMonitor, è possibile accedere alla dashboard di Prometheus all'indirizzo <code translate="no">http://localhost:9090/</code>.</p>
<p>Fare clic sulla scheda <code translate="no">Status</code> e poi su <code translate="no">Targets</code>. Si dovrebbero vedere i target dei componenti Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" />
   </span> <span class="img-wrapper"> <span>Prometheus_targets</span> </span></p>
<p>Fare clic sulla scheda <code translate="no">Graph</code> e inserire l'espressione <code translate="no">up{job=&quot;default/my-release&quot;}</code> nella casella di input dell'espressione. Dovrebbero essere visualizzate le metriche dei componenti Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" />
   </span> <span class="img-wrapper"> <span>Grafico_Prometeo</span> </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. Controllare il ServiceMonitor</h3><pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                           AGE
<span class="hljs-keyword">my</span>-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Cosa succede dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Se avete implementato i servizi di monitoraggio per il cluster Milvus, potreste anche imparare a:<ul>
<li><a href="/docs/it/visualize.md">Visualizzare le metriche di Milvus in Grafana</a></li>
<li><a href="/docs/it/alert.md">Creare un avviso per i servizi Milvus</a></li>
<li>Regolare l'<a href="/docs/it/allocate.md">allocazione delle risorse</a></li>
</ul></li>
<li>Se cercate informazioni su come scalare un cluster Milvus:<ul>
<li>Imparare a <a href="/docs/it/scaleout.md">scalare un cluster Milvus</a></li>
</ul></li>
<li>Se siete interessati ad aggiornare la versione di Milvus,<ul>
<li>Leggete la <a href="/docs/it/upgrade_milvus_cluster-operator.md">guida per l'aggiornamento di Milvus cluster</a> e <a href="/docs/it/upgrade_milvus_standalone-operator.md">quella per l'aggiornamento di Milvus standalone</a>.</li>
</ul></li>
</ul>
