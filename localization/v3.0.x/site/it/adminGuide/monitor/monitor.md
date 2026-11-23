---
id: monitor.md
title: Implementazione dei servizi di monitoraggio
related_key: 'monitor, alert'
summary: >-
  Scopri come implementare servizi di monitoraggio per un cluster Milvus
  utilizzando Prometheus.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Implementazione dei servizi di monitoraggio su Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>In questa sezione viene descritto come utilizzare Prometheus per distribuire servizi di monitoraggio per un cluster Milvus su Kubernetes.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Monitoraggio delle metriche con Prometheus<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>Le metriche sono indicatori che forniscono informazioni sullo stato di funzionamento del sistema. Ad esempio, grazie alle metriche è possibile comprendere la quantità di memoria o di risorse CPU consumate da un nodo dati in Milvus. Essere a conoscenza delle prestazioni e dello stato dei componenti del proprio cluster Milvus consente di essere ben informati e, di conseguenza, di prendere decisioni migliori e di adeguare l’allocazione delle risorse in modo più tempestivo.</p>
<p>In genere, le metriche vengono memorizzate in un database di serie temporali (TSDB), come <a href="https://prometheus.io/">Prometheus</a>, e vengono registrate con un timestamp. Nel caso del monitoraggio dei servizi Milvus, è possibile utilizzare Prometheus per estrarre i dati dagli endpoint impostati dagli esportatori. Prometheus esporta quindi le metriche di ciascun componente Milvus all’indirizzo <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>Tuttavia, potresti avere diverse repliche per un singolo componente, il che rende troppo complicata la configurazione manuale di Prometheus. Pertanto, puoi utilizzare <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a>, un’estensione di Kubernetes, per una gestione automatizzata ed efficace delle istanze di monitoraggio di Prometheus. L’uso di Prometheus Operator ti evita la fatica di aggiungere manualmente destinazioni delle metriche e fornitori di servizi.</p>
<p>La definizione di risorsa personalizzata (CRD) ServiceMonitor consente di definire in modo dichiarativo come viene monitorato un insieme dinamico di servizi. Permette inoltre di selezionare quali servizi monitorare con la configurazione desiderata utilizzando la selezione delle etichette. Con Prometheus Operator è possibile introdurre convenzioni che specificano come vengono esposte le metriche. I nuovi servizi possono essere individuati automaticamente in base alla convenzione impostata, senza necessità di riconfigurazione manuale.</p>
<p>L’immagine seguente illustra il flusso di lavoro di Prometheus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" /> 
   <span>Prometheus_architecture</span>
  
 </span></p>
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
    </button></h2><p>Questo tutorial utilizza <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a> per evitare di dover installare e configurare manualmente ogni singolo componente di monitoraggio e di allerta.</p>
<p>Kube-prometheus raccoglie i manifest di Kubernetes, le dashboard <a href="http://grafana.com/">di Grafana</a> e <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">le regole di Prometheus</a>, insieme alla documentazione e agli script.</p>
<p>Prima di distribuire i servizi di monitoraggio, è necessario creare uno stack di monitoraggio utilizzando la configurazione presente nella directory dei manifesti di kube-prometheus.</p>
<p>I comandi seguenti utilizzano il ramo " <code translate="no">release-0.19</code> " di kube-prometheus, che supporta Kubernetes 1.35, 1.36 e 1.37. Per scegliere il ramo adatto alla propria versione di Kubernetes, consultare la <a href="https://github.com/prometheus-operator/kube-prometheus#compatibility">matrice di compatibilità di kube-prometheus</a>.</p>
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
Il clusterrole predefinito prometheus-k8s non è in grado di acquisire le metriche di Milvus; è necessario applicare una patch:
</div>
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Accedere alle dashboard<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>Reindirizza il servizio Prometheus alla porta <code translate="no">9090</code> e il servizio Grafana alla porta <code translate="no">3000</code>.</p>
<pre><code translate="no" class="language-bash">$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. Abilitare ServiceMonitor<button data-href="#2-Enable-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>ServiceMonitor non è abilitato per Milvus Helm per impostazione predefinita. Dopo aver installato Prometheus Operator nel cluster Kubernetes, è possibile abilitarlo aggiungendo il parametro <code translate="no">metrics.serviceMonitor.enabled=true</code>.</p>
<h4 id="With-Helm" class="common-anchor-header">Con Helm</h4><p>È possibile abilitare ServiceMonitor impostando il parametro <code translate="no">metrics.serviceMonitor.enabled=true</code> come segue, se è stato installato il chart Helm di Milvus.</p>
<pre><code translate="no" class="language-bash">$ helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Questo comando utilizza ` <code translate="no">--reset-then-reuse-values</code>`, che richiede Helm 3.14 o versioni successive. Con questa opzione, Helm ripristina i valori predefiniti della versione del chart specificata in ` <code translate="no">--version</code>`, applica i valori della release corrente e infine applica i valori da ` <code translate="no">--set</code>`. Per individuare ` <code translate="no">&lt;current-chart-version&gt;</code>`, eseguire ` <code translate="no">helm list</code> ` e rimuovere il prefisso ` <code translate="no">milvus-</code> ` dal valore nella colonna ` <code translate="no">CHART</code> `. Se si esegue <code translate="no">helm upgrade</code> con <code translate="no">-f</code> o <code translate="no">--set</code> ma senza <code translate="no">--reset-then-reuse-values</code> o <code translate="no">--reuse-values</code>, Helm non mantiene i valori impostati al momento dell’installazione.</p>
</div>
<p>Al termine dell’installazione, utilizzare <code translate="no">kubectl</code> per verificare la risorsa ServiceMonitor.</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">Con Milvus Operator</h4><p>Se avete installato Milvus utilizzando Milvus Operator, l’operator crea un PodMonitor anziché un ServiceMonitor. Il PodMonitor ha lo stesso nome della risorsa personalizzata di Milvus. L’operatore lo crea solo se le metriche non sono disabilitate nella risorsa personalizzata e se il CRD PodMonitor è presente nel cluster. La directory <code translate="no">manifests/setup</code> di kube-prometheus installa questo CRD. Per assicurarsi che le metriche siano abilitate, procedere come segue.</p>
<ol>
<li><p>Eseguire il comando seguente per modificare la risorsa personalizzata Milvus. Il comando seguente presuppone che la risorsa personalizzata sia denominata <code translate="no">my-release</code>.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Modificare il campo <code translate="no">spec.components.disableMetric</code> impostandolo su <code translate="no">false</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Salvare e uscire dall’editor.</p></li>
<li><p>Attendere che l’operatore sincronizzi le modifiche. È possibile verificare lo stato di PodMonitor eseguendo il comando seguente.</p>
<pre><code translate="no" class="language-bash">$ kubectl get podmonitor my-release
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. Verifica le metriche<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Dopo aver abilitato il ServiceMonitor o il PodMonitor, è possibile accedere alla dashboard di Prometheus all'indirizzo <code translate="no">http://localhost:9090/</code>.</p>
<p>Fare clic sulla scheda " <code translate="no">Status</code> " e poi su " <code translate="no">Targets</code>". Dovrebbero essere visibili i target dei componenti Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" /> 
   <span>Prometheus_targets</span>
  
 </span></p>
<p>Fare clic sulla scheda " <code translate="no">Graph</code> " e inserire l’espressione " <code translate="no">up{app_kubernetes_io_instance=&quot;my-release&quot;}</code> " nella casella di immissione dell’espressione. Dovrebbero essere visualizzate le metriche dei componenti Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" /> 
   <span>Prometheus_graph</span>
  
 </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. Verifica il ServiceMonitor<button data-href="#4-Check-the-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Se hai installato Milvus con Helm, esegui il seguente comando per visualizzare l’elenco dei ServiceMonitor. Il chart li denomina <code translate="no">my-release-milvus</code> per un cluster Milvus e <code translate="no">my-release-milvus-standalone</code> per un Milvus standalone.</p>
<pre><code translate="no" class="language-bash">$ kubectl get servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">NAME                           AGE
my-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Se avete implementato i servizi di monitoraggio per il cluster Milvus, potreste anche voler imparare a:
<ul>
<li><a href="/docs/it/visualize.md">Visualizzare le metriche di Milvus in Grafana</a></li>
<li><a href="/docs/it/alert.md">Creare un avviso per i servizi Milvus</a></li>
<li>Regolare <a href="/docs/it/allocate.md">l’allocazione</a> delle <a href="/docs/it/allocate.md">risorse</a></li>
</ul></li>
<li>Se stai cercando informazioni su come scalare un cluster Milvus:
<ul>
<li>Scopri <a href="/docs/it/scaleout.md">come scalare un cluster Milvus</a></li>
</ul></li>
<li>Se sei interessato ad aggiornare la versione di Milvus,
<ul>
<li>Leggi la <a href="/docs/it/upgrade_milvus_cluster-operator.md">guida all'aggiornamento del cluster Milvus</a> e <a href="/docs/it/upgrade_milvus_standalone-operator.md">quella all'aggiornamento di Milvus standalone</a>.</li>
</ul></li>
</ul>
