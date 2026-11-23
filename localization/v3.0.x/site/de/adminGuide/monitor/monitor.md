---
id: monitor.md
title: Überwachungsdienste bereitstellen
related_key: 'monitor, alert'
summary: >-
  Erfahren Sie, wie Sie Überwachungsdienste für einen Milvus-Cluster mithilfe
  von Prometheus bereitstellen.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Bereitstellung von Überwachungsdiensten auf Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Abschnitt wird beschrieben, wie Sie mit Prometheus Überwachungsdienste für einen Milvus-Cluster auf Kubernetes bereitstellen.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Metriken mit Prometheus überwachen<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>Metriken sind Indikatoren, die Informationen über den Betriebsstatus Ihres Systems liefern. Anhand von Metriken können Sie beispielsweise nachvollziehen, wie viel Arbeitsspeicher oder CPU-Ressourcen von einem Datenknoten in Milvus verbraucht werden. Wenn Sie über die Leistung und den Status der Komponenten in Ihrem Milvus-Cluster informiert sind, können Sie fundiertere Entscheidungen treffen und die Ressourcenzuweisung zeitnah anpassen.</p>
<p>Im Allgemeinen werden Metriken in einer Zeitreihendatenbank (TSDB) wie <a href="https://prometheus.io/">Prometheus</a> gespeichert und mit einem Zeitstempel aufgezeichnet. Bei der Überwachung von Milvus-Diensten können Sie Prometheus nutzen, um Daten von den durch Exporter festgelegten Endpunkten abzurufen. Prometheus exportiert dann die Metriken jeder Milvus-Komponente unter <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>Möglicherweise verfügen Sie jedoch über mehrere Replikate einer Komponente, was die manuelle Konfiguration von Prometheus zu kompliziert macht. Daher können Sie <a href="https://github.com/prometheus-operator/prometheus-operator">den Prometheus Operator</a>, eine Erweiterung von Kubernetes, für die automatisierte und effektive Verwaltung von Prometheus-Überwachungsinstanzen nutzen. Durch den Einsatz des Prometheus Operators ersparen Sie sich den Aufwand, Metrikziele und Dienstanbieter manuell hinzuzufügen.</p>
<p>Die Custom Resource Definition (CRD) „ServiceMonitor“ ermöglicht es Ihnen, deklarativ zu definieren, wie eine dynamische Gruppe von Diensten überwacht wird. Außerdem können Sie mithilfe von Label-Auswahlen festlegen, welche Dienste mit der gewünschten Konfiguration überwacht werden sollen. Mit dem Prometheus Operator können Sie Konventionen einführen, die festlegen, wie Metriken bereitgestellt werden. Neue Dienste können automatisch gemäß der von Ihnen festgelegten Konvention erkannt werden, ohne dass eine manuelle Neukonfiguration erforderlich ist.</p>
<p>Die folgende Abbildung veranschaulicht den Prometheus-Workflow.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" /> 
   <span>Prometheus_architecture</span>
  
 </span></p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Tutorial wird <a href="https://github.com/prometheus-operator/kube-prometheus">„kube-prometheus“</a> verwendet, um Ihnen die Installation und manuelle Konfiguration der einzelnen Überwachungs- und Warnkomponenten zu ersparen.</p>
<p>Kube-prometheus umfasst Kubernetes-Manifeste, <a href="http://grafana.com/">Grafana</a> -Dashboards und <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">Prometheus-Regeln</a> sowie die dazugehörige Dokumentation und Skripte.</p>
<p>Bevor Sie Überwachungsdienste bereitstellen, müssen Sie mithilfe der Konfiguration im Verzeichnis „manifests“ von kube-prometheus einen Überwachungsstack erstellen.</p>
<p>Die folgenden Befehle verwenden den Zweig „ <code translate="no">release-0.19</code> “ von kube-prometheus, der Kubernetes 1.35, 1.36 und 1.37 unterstützt. Informationen zur Auswahl des Zweigs für Ihre Kubernetes-Version finden Sie in der <a href="https://github.com/prometheus-operator/kube-prometheus#compatibility">Kompatibilitätsmatrix von kube-prometheus</a>.</p>
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
Die Standard-Clusterrolle „prometheus-k8s“ kann die Metriken von Milvus nicht erfassen; hier ist ein Patch erforderlich:
</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um einen Stack zu löschen, führen Sie „ <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code> “ aus.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Überwachungsdienste auf Kubernetes bereitstellen<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Auf die Dashboards zugreifen<button data-href="#1-Access-the-dashboards" class="anchor-icon" translate="no">
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
    </button></h3><p>Leiten Sie den Prometheus-Dienst auf den Port <code translate="no">9090</code> und den Grafana-Dienst auf den Port <code translate="no">3000</code> weiter.</p>
<pre><code translate="no" class="language-bash">$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. ServiceMonitor aktivieren<button data-href="#2-Enable-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Der ServiceMonitor ist für Milvus Helm standardmäßig nicht aktiviert. Nach der Installation des Prometheus-Operators im Kubernetes-Cluster können Sie ihn aktivieren, indem Sie den Parameter <code translate="no">metrics.serviceMonitor.enabled=true</code> hinzufügen.</p>
<h4 id="With-Helm" class="common-anchor-header">Mit Helm</h4><p>können Sie den ServiceMonitor aktivieren, indem Sie den Parameter ` <code translate="no">metrics.serviceMonitor.enabled=true</code> ` wie folgt festlegen, sofern Sie das Milvus-Helm-Chart installiert haben.</p>
<pre><code translate="no" class="language-bash">$ helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Dieser Befehl verwendet „ <code translate="no">--reset-then-reuse-values</code> “, wofür Helm 3.14 oder höher erforderlich ist. Mit dieser Option setzt Helm die Werte auf die Standardwerte der in „ <code translate="no">--version</code> “ festgelegten Chart-Version zurück, wendet die Werte Ihrer aktuellen Release an und wendet anschließend die Werte aus „ <code translate="no">--set</code> “ an. Um „ <code translate="no">&lt;current-chart-version&gt;</code> “ zu ermitteln, führen Sie „ <code translate="no">helm list</code> “ aus und entfernen Sie das Präfix „ <code translate="no">milvus-</code> “ aus dem Wert in der Spalte „ <code translate="no">CHART</code> “. Wenn Sie <code translate="no">helm upgrade</code> mit <code translate="no">-f</code> oder <code translate="no">--set</code>, jedoch ohne <code translate="no">--reset-then-reuse-values</code> oder <code translate="no">--reuse-values</code> ausführen, behält Helm die Werte, die Sie bei der Installation festgelegt haben, nicht bei.</p>
</div>
<p>Verwenden Sie nach Abschluss der Installation <code translate="no">kubectl</code>, um die ServiceMonitor-Ressource zu überprüfen.</p>
<h4 id="With-Milvus-Operator" class="common-anchor-header">Mit dem Milvus Operator</h4><p>Wenn Sie Milvus mithilfe des Milvus-Operators installiert haben, erstellt der Operator anstelle eines ServiceMonitor einen PodMonitor. Der PodMonitor hat denselben Namen wie die benutzerdefinierte Milvus-Ressource. Der Operator erstellt ihn nur, wenn Metriken in der benutzerdefinierten Ressource nicht deaktiviert sind und die PodMonitor-CRD im Cluster vorhanden ist. Das Verzeichnis „ <code translate="no">manifests/setup</code> “ von „kube-prometheus“ installiert diese CRD. Gehen Sie wie folgt vor, um sicherzustellen, dass Metriken aktiviert sind.</p>
<ol>
<li><p>Führen Sie den folgenden Befehl aus, um die benutzerdefinierte Milvus-Ressource zu bearbeiten. Der folgende Befehl geht davon aus, dass die benutzerdefinierte Ressource den Namen „ <code translate="no">my-release</code> “ trägt.</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>kubectl edit milvus my-release
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Ändern Sie das Feld „ <code translate="no">spec.components.disableMetric</code> “ in „ <code translate="no">false</code> “.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">disableMetric:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to true to disable metrics</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Speichern Sie die Änderungen und schließen Sie den Editor.</p></li>
<li><p>Warten Sie, bis der Operator die Änderungen übernommen hat. Sie können den PodMonitor überprüfen, indem Sie den folgenden Befehl ausführen.</p>
<pre><code translate="no" class="language-bash">$ kubectl get podmonitor my-release
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="3-Check-the-metrics" class="common-anchor-header">3. Überprüfen Sie die Metriken<button data-href="#3-Check-the-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Nachdem Sie den ServiceMonitor oder den PodMonitor aktiviert haben, können Sie über <code translate="no">http://localhost:9090/</code> auf das Prometheus-Dashboard zugreifen.</p>
<p>Klicken Sie auf die Registerkarte „ <code translate="no">Status</code> “ und anschließend auf „ <code translate="no">Targets</code> “. Dort sollten die Ziele der Milvus-Komponenten angezeigt werden.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_targets.png" alt="Prometheus_targets" class="doc-image" id="prometheus_targets" /> 
   <span>Prometheus_targets</span>
  
 </span></p>
<p>Klicken Sie auf die Registerkarte „ <code translate="no">Graph</code> “ und geben Sie den Ausdruck „ <code translate="no">up{app_kubernetes_io_instance=&quot;my-release&quot;}</code> “ in das Eingabefeld für den Ausdruck ein. Sie sollten nun die Metriken der Milvus-Komponenten sehen.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_graph.png" alt="Prometheus_graph" class="doc-image" id="prometheus_graph" /> 
   <span>Prometheus_graph</span>
  
 </span></p>
<h3 id="4-Check-the-ServiceMonitor" class="common-anchor-header">4. Überprüfen Sie den ServiceMonitor<button data-href="#4-Check-the-ServiceMonitor" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Sie Milvus mit Helm installiert haben, führen Sie den folgenden Befehl aus, um den ServiceMonitor aufzulisten. Das Chart benennt ihn für einen Milvus-Cluster als „ <code translate="no">my-release-milvus</code> “ und für eine Milvus-Standalone-Installation als „ <code translate="no">my-release-milvus-standalone</code> “.</p>
<pre><code translate="no" class="language-bash">$ kubectl get servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">NAME                           AGE
my-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Was als Nächstes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Wenn Sie Überwachungsdienste für den Milvus-Cluster bereitgestellt haben, möchten Sie vielleicht auch lernen, wie Sie:
<ul>
<li><a href="/docs/de/visualize.md">Milvus-Metriken in Grafana visualisieren</a></li>
<li><a href="/docs/de/alert.md">Erstellen eines Alerts für Milvus-Dienste</a></li>
<li>Anpassen Ihrer <a href="/docs/de/allocate.md">Ressourcenzuweisung</a></li>
</ul></li>
<li>Wenn Sie Informationen zur Skalierung eines Milvus-Clusters suchen:
<ul>
<li>Erfahren Sie, wie Sie <a href="/docs/de/scaleout.md">einen Milvus-Cluster skalieren</a></li>
</ul></li>
<li>Wenn Sie an einem Upgrade der Milvus-Version interessiert sind,
<ul>
<li>lesen Sie die <a href="/docs/de/upgrade_milvus_cluster-operator.md">Anleitung zum Upgrade eines Milvus-Clusters</a> sowie <a href="/docs/de/upgrade_milvus_standalone-operator.md">die Anleitung zum Upgrade von Milvus Standalone</a>.</li>
</ul></li>
</ul>
