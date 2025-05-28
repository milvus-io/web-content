---
id: hpa.md
related_key: scale Milvus cluster with HPA
summary: >-
  Erfahren Sie, wie Sie Horizontal Pod Autoscaling (HPA) konfigurieren, um einen
  Milvus-Cluster dynamisch zu skalieren.
title: Konfigurieren der horizontalen Pod-Autoskalierung (HPA) für Milvus
---
<h1 id="Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="common-anchor-header">Konfigurieren der horizontalen Pod-Autoskalierung (HPA) für Milvus<button data-href="#Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Horizontale Pod-Autoskalierung (HPA) ist eine Kubernetes-Funktion, die die Anzahl der Pods in einem Deployment automatisch auf der Grundlage der Ressourcenauslastung (z. B. CPU oder Speicher) anpasst. In Milvus kann HPA auf zustandslose Komponenten wie <code translate="no">proxy</code>, <code translate="no">queryNode</code>, <code translate="no">dataNode</code> und <code translate="no">indexNode</code> angewendet werden, um den Cluster als Reaktion auf Änderungen der Arbeitslast dynamisch zu skalieren.</p>
<p>In dieser Anleitung wird erklärt, wie HPA für Milvus-Komponenten mit dem Milvus Operator konfiguriert wird.</p>
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
    </button></h2><ul>
<li>Ein laufender Milvus-Cluster, der mit Milvus Operator bereitgestellt wurde.</li>
<li>Zugriff auf <code translate="no">kubectl</code> zur Verwaltung von Kubernetes-Ressourcen.</li>
<li>Vertrautheit mit der Milvus-Architektur und Kubernetes HPA.</li>
</ul>
<h2 id="Configure-HPA-with-Milvus-Operator" class="common-anchor-header">Konfigurieren von HPA mit Milvus Operator<button data-href="#Configure-HPA-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Um HPA in einem Milvus-Cluster zu aktivieren, der von Milvus Operator verwaltet wird, führen Sie die folgenden Schritte aus:</p>
<ol>
<li><p><strong>Setzen Sie Replicas auf -1</strong>:</p>
<p>Setzen Sie in der benutzerdefinierten Milvus-Ressource (CR) das Feld <code translate="no">replicas</code> auf <code translate="no">-1</code> für die Komponente, die Sie mit HPA skalieren möchten. Dadurch wird die Skalierungssteuerung an HPA und nicht an den Operator delegiert. Sie können die CR direkt bearbeiten oder den folgenden Befehl <code translate="no">kubectl patch</code> verwenden, um schnell zur HPA-Steuerung zu wechseln:</p>
<pre><code translate="no" class="language-bash">kubectl patch milvus &lt;your-release-name&gt; --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;json&#x27;</span> -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;replace&quot;, &quot;path&quot;: &quot;/spec/components/proxy/replicas&quot;, &quot;value&quot;: -1}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ersetzen Sie <code translate="no">&lt;your-release-name&gt;</code> durch den Namen Ihres Milvus-Clusters.</p>
<p>Führen Sie den Befehl aus, um zu überprüfen, ob die Änderung übernommen wurde:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;your-release-name&gt; -o jsonpath=<span class="hljs-string">&#x27;{.spec.components.proxy.replicas}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die erwartete Ausgabe sollte <code translate="no">-1</code> sein, was bestätigt, dass die Komponente <code translate="no">proxy</code> nun unter HPA-Kontrolle steht.</p>
<p>Alternativ können Sie sie auch in der CR YAML definieren:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">&lt;your-release-name&gt;</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">proxy:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">-1</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Definieren Sie eine HPA-Ressource</strong>:</p>
<p>Erstellen Sie eine HPA-Ressource, um die Bereitstellung der gewünschten Komponente zu steuern. Nachfolgend finden Sie ein Beispiel für die Komponente <code translate="no">proxy</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">autoscaling/v2</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">HorizontalPodAutoscaler</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-milvus-proxy-hpa</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">scaleTargetRef:</span>
    <span class="hljs-attr">apiVersion:</span> <span class="hljs-string">apps/v1</span>
    <span class="hljs-attr">kind:</span> <span class="hljs-string">Deployment</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-milvus-proxy</span>
  <span class="hljs-attr">minReplicas:</span> <span class="hljs-number">2</span>
  <span class="hljs-attr">maxReplicas:</span> <span class="hljs-number">10</span>
  <span class="hljs-attr">metrics:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Resource</span>
      <span class="hljs-attr">resource:</span>
        <span class="hljs-attr">name:</span> <span class="hljs-string">cpu</span>
        <span class="hljs-attr">target:</span>
          <span class="hljs-attr">type:</span> <span class="hljs-string">Utilization</span>
          <span class="hljs-attr">averageUtilization:</span> <span class="hljs-number">60</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Resource</span>
      <span class="hljs-attr">resource:</span>
        <span class="hljs-attr">name:</span> <span class="hljs-string">memory</span>
        <span class="hljs-attr">target:</span>
          <span class="hljs-attr">type:</span> <span class="hljs-string">Utilization</span>
          <span class="hljs-attr">averageUtilization:</span> <span class="hljs-number">60</span>
  <span class="hljs-attr">behavior:</span>
    <span class="hljs-attr">scaleUp:</span>
      <span class="hljs-attr">policies:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Pods</span>
          <span class="hljs-attr">value:</span> <span class="hljs-number">1</span>
          <span class="hljs-attr">periodSeconds:</span> <span class="hljs-number">30</span>
    <span class="hljs-attr">scaleDown:</span>
      <span class="hljs-attr">stabilizationWindowSeconds:</span> <span class="hljs-number">300</span>
      <span class="hljs-attr">policies:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Pods</span>
          <span class="hljs-attr">value:</span> <span class="hljs-number">1</span>
          <span class="hljs-attr">periodSeconds:</span> <span class="hljs-number">60</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ersetzen Sie <code translate="no">my-release</code> in <code translate="no">metadata.name</code> und <code translate="no">spec.scaleTargetRef.name</code> durch Ihren aktuellen Milvus-Clusternamen (z.B. <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> und <code translate="no">&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
<li><p><strong>Wenden Sie die HPA-Konfiguration an</strong>:</p>
<p>Stellen Sie die HPA-Ressource mit dem folgenden Befehl bereit:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f hpa.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie diesen aus, um zu überprüfen, ob die HPA erfolgreich erstellt wurde:</p>
<pre><code translate="no" class="language-bash">kubectl get hpa
<button class="copy-code-btn"></button></code></pre>
<p>Sie sollten eine Ausgabe ähnlich der folgenden sehen:</p>
<pre><code translate="no">NAME                          REFERENCE                            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-operator">-</span>hpa   Deployment<span class="hljs-operator">/</span>my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy   <span class="hljs-operator">&lt;</span><span class="hljs-keyword">some</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">/</span><span class="hljs-number">60</span><span class="hljs-operator">%</span>      <span class="hljs-number">2</span>         <span class="hljs-number">10</span>        <span class="hljs-number">2</span>          <span class="hljs-operator">&lt;</span><span class="hljs-type">time</span><span class="hljs-operator">&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die Felder <code translate="no">NAME</code> und <code translate="no">REFERENCE</code> spiegeln Ihren Clusternamen wider (z. B. <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> und <code translate="no">Deployment/&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
</ol>
<ul>
<li><code translate="no">scaleTargetRef</code>: Gibt die zu skalierende Bereitstellung an (z. B. <code translate="no">my-release-milvus-proxy</code>).</li>
<li><code translate="no">minReplicas</code> und <code translate="no">maxReplicas</code>: Legt den Skalierungsbereich fest (2 bis 10 Pods in diesem Beispiel).</li>
<li><code translate="no">metrics</code>: Konfiguriert die Skalierung auf der Grundlage der CPU- und Speichernutzung, wobei eine durchschnittliche Nutzung von 60 % angestrebt wird.</li>
</ul>
<h2 id="Conclusion" class="common-anchor-header">Schlussfolgerung<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>HPA ermöglicht Milvus eine effiziente Anpassung an unterschiedliche Arbeitslasten. Mit dem Befehl <code translate="no">kubectl patch</code> können Sie eine Komponente schnell auf HPA-Kontrolle umstellen, ohne die gesamte CR manuell bearbeiten zu müssen. Weitere Einzelheiten finden Sie in der <a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">Kubernetes HPA-Dokumentation</a>.</p>
