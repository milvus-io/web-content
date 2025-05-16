---
id: monitor.md
title: Bereitstellung von Überwachungsdiensten
related_key: 'monitor, alert'
summary: >-
  Erfahren Sie, wie Sie mit Prometheus Überwachungsdienste für einen
  Milvus-Cluster bereitstellen.
---
<h1 id="Deploying-Monitoring-Services-on-Kubernetes" class="common-anchor-header">Bereitstellen von Überwachungsdiensten auf Kubernetes<button data-href="#Deploying-Monitoring-Services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Thema wird beschrieben, wie Sie Prometheus verwenden, um Überwachungsdienste für einen Milvus-Cluster auf Kubernetes bereitzustellen.</p>
<h2 id="Monitor-metrics-with-Prometheus" class="common-anchor-header">Überwachen von Metriken mit Prometheus<button data-href="#Monitor-metrics-with-Prometheus" class="anchor-icon" translate="no">
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
    </button></h2><p>Metriken sind Indikatoren, die Informationen über den Betriebsstatus Ihres Systems liefern. Mit Metriken können Sie beispielsweise nachvollziehen, wie viel Arbeitsspeicher oder CPU-Ressourcen von einem Datenknoten in Milvus verbraucht werden. Wenn Sie die Leistung und den Status der Komponenten in Ihrem Milvus-Cluster kennen, sind Sie gut informiert und können daher bessere Entscheidungen treffen und die Ressourcenzuweisung rechtzeitig anpassen.</p>
<p>Im Allgemeinen werden die Metriken in einer Zeitseriendatenbank (TSDB) wie <a href="https://prometheus.io/">Prometheus</a> gespeichert und mit einem Zeitstempel versehen. Bei der Überwachung von Milvus-Diensten können Sie Prometheus verwenden, um Daten von Endpunkten zu beziehen, die von Exporteuren festgelegt wurden. Prometheus exportiert dann die Metriken der einzelnen Milvus-Komponenten unter <code translate="no">http://&lt;component-host&gt;:9091/metrics</code>.</p>
<p>Es kann jedoch sein, dass Sie mehrere Repliken für eine Komponente haben, was die manuelle Konfiguration von Prometheus zu kompliziert macht. Daher können Sie <a href="https://github.com/prometheus-operator/prometheus-operator">Prometheus Operator</a>, eine Erweiterung für Kubernetes, für die automatisierte und effektive Verwaltung von Prometheus-Überwachungsinstanzen verwenden. Die Verwendung von Prometheus Operator erspart Ihnen das manuelle Hinzufügen von metrischen Zielen und Dienstanbietern.</p>
<p>Mit der benutzerdefinierten Ressourcendefinition (CRD) von ServiceMonitor können Sie deklarativ festlegen, wie eine dynamische Gruppe von Diensten überwacht wird. Sie ermöglicht auch die Auswahl der zu überwachenden Dienste mit der gewünschten Konfiguration unter Verwendung von Labels. Mit Prometheus Operator können Sie Konventionen einführen, die festlegen, wie Metriken dargestellt werden. Neue Dienste können automatisch gemäß der von Ihnen festgelegten Konvention erkannt werden, ohne dass eine manuelle Neukonfiguration erforderlich ist.</p>
<p>Die folgende Abbildung veranschaulicht den Prometheus-Workflow.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/prometheus_architecture.png" alt="Prometheus_architecture" class="doc-image" id="prometheus_architecture" />
   </span> <span class="img-wrapper"> <span>Prometheus_Architektur</span> </span></p>
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
    </button></h2><p>Dieses Tutorial verwendet <a href="https://github.com/prometheus-operator/kube-prometheus">kube-prometheus</a>, um Ihnen die Installation und manuelle Konfiguration jeder Überwachungs- und Alarmierungskomponente zu ersparen.</p>
<p>Kube-prometheus sammelt Kubernetes-Manifeste, <a href="http://grafana.com/">Grafana-Dashboards</a> und <a href="https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/">Prometheus-Regeln</a> in Kombination mit Dokumentation und Skripten.</p>
<p>Bevor Sie Überwachungsdienste bereitstellen, müssen Sie einen Überwachungsstapel erstellen, indem Sie die Konfiguration im Verzeichnis kube-prometheus manifests verwenden.</p>
<pre><code translate="no">$ git <span class="hljs-built_in">clone</span> https://github.com/prometheus-operator/kube-prometheus.git
$ <span class="hljs-built_in">cd</span> kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl <span class="hljs-built_in">wait</span> \
        --<span class="hljs-keyword">for</span> condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Die standardmäßige prometheus-k8s-Clusterrole kann die Metriken von milvus nicht erfassen und muss gepatcht werden:</div>
<pre><code translate="no" class="language-bash">kubectl patch clusterrole prometheus-k8s --<span class="hljs-built_in">type</span>=json -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;add&quot;, &quot;path&quot;: &quot;/rules/-&quot;, &quot;value&quot;: {&quot;apiGroups&quot;: [&quot;&quot;], &quot;resources&quot;: [&quot;pods&quot;, &quot;services&quot;, &quot;endpoints&quot;], &quot;verbs&quot;: [&quot;get&quot;, &quot;watch&quot;, &quot;list&quot;]}}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um einen Stack zu löschen, führen Sie <code translate="no">kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup</code> aus.</p>
<h2 id="Deploy-monitoring-services-on-Kubernetes" class="common-anchor-header">Bereitstellen von Überwachungsdiensten auf Kubernetes<button data-href="#Deploy-monitoring-services-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Access-the-dashboards" class="common-anchor-header">1. Zugriff auf die Dashboards</h3><p>Leiten Sie den Prometheus-Dienst an den Port <code translate="no">9090</code> und den Grafana-Dienst an den Port <code translate="no">3000</code> weiter.</p>
<pre><code translate="no">$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring --address 0.0.0.0 port-forward svc/grafana 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Enable-ServiceMonitor" class="common-anchor-header">2. Aktivieren Sie den ServiceMonitor</h3><p>Der ServiceMonitor ist für Milvus Helm standardmäßig nicht aktiviert. Nach der Installation des Prometheus Operator im Kubernetes-Cluster können Sie ihn durch Hinzufügen des Parameters <code translate="no">metrics.serviceMonitor.enabled=true</code> aktivieren.</p>
<pre><code translate="no">$ helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> metrics.serviceMonitor.enabled=<span class="hljs-literal">true</span> --reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>Wenn die Installation abgeschlossen ist, verwenden Sie <code translate="no">kubectl</code>, um die ServiceMonitor-Ressource zu überprüfen.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> servicemonitor
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">NAME                           AGE
my-release-milvus              54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Wie geht es weiter?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Wenn Sie Überwachungsdienste für den Milvus-Cluster implementiert haben, möchten Sie vielleicht auch lernen, wie man:<ul>
<li><a href="/docs/de/v2.4.x/visualize.md">Visualisieren von Milvus-Metriken in Grafana</a></li>
<li><a href="/docs/de/v2.4.x/alert.md">Einen Alert für Milvus-Dienste erstellen</a></li>
<li>Ihre <a href="/docs/de/v2.4.x/allocate.md">Ressourcenzuweisung</a> anpassen</li>
</ul></li>
<li>Wenn Sie nach Informationen zur Skalierung eines Milvus-Clusters suchen:<ul>
<li>Lernen Sie <a href="/docs/de/v2.4.x/scaleout.md">einen Milvus-Cluster</a> zu <a href="/docs/de/v2.4.x/scaleout.md">skalieren</a></li>
</ul></li>
<li>Wenn Sie an einem Upgrade der Milvus-Version interessiert sind,<ul>
<li>Lesen Sie den <a href="/docs/de/v2.4.x/upgrade_milvus_cluster-operator.md">Leitfaden für das Upgrade von Milvus Cluster</a> und <a href="/docs/de/v2.4.x/upgrade_milvus_standalone-operator.md">den</a> <a href="/docs/de/v2.4.x/upgrade_milvus_cluster-operator.md">Leitfaden</a> <a href="/docs/de/v2.4.x/upgrade_milvus_standalone-operator.md">für das Upgrade von Milvus Standalone</a>.</li>
</ul></li>
</ul>
