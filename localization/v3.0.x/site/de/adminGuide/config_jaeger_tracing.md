---
id: config_jaeger_tracing.md
title: Trace konfigurieren
related_key: 'Jaeger, Milvus, Trace'
summary: >-
  Diese Anleitung enthält Anweisungen zur Konfiguration von Jaeger für die
  Erfassung von Traces für Milvus.
---
<h1 id="Configure-Trace" class="common-anchor-header">Trace konfigurieren<button data-href="#Configure-Trace" class="anchor-icon" translate="no">
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
    </button></h1><p>Diese Anleitung enthält Anweisungen zur Konfiguration von Jaeger für die Erfassung von Traces für Milvus.</p>
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
<li>Sie haben die erforderlichen Tools installiert, darunter <a href="https://helm.sh/docs/intro/install/">Helm</a> und <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
</ul>
<h2 id="Deploy-Jaeger" class="common-anchor-header">Jaeger bereitstellen<button data-href="#Deploy-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>Jaeger ist eine verteilte Tracing-Plattform, die von <a href="http://uber.github.io/">Uber Technologies</a> als Open Source veröffentlicht wurde.</p>
<p>In dieser Anleitung wird Jaeger v2 mithilfe des <a href="https://github.com/jaegertracing/helm-charts">Jaeger-Helm-Charts</a> bereitgestellt. Standardmäßig stellt das Chart Jaeger im All-in-One-Modell und mit In-Memory-Speicher bereit, was für Testzwecke geeignet ist. Weitere Möglichkeiten zum Ausführen von Jaeger auf Kubernetes finden Sie unter <a href="https://www.jaegertracing.io/docs/2.23/deployment/kubernetes/">„Bereitstellung auf Kubernetes</a>“.</p>
<h3 id="1-Install-Jaeger" class="common-anchor-header">1. Jaeger installieren<button data-href="#1-Install-Jaeger" class="anchor-icon" translate="no">
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
    </button></h3><p>Installieren Sie Jaeger in dem Namespace, in dem Sie Milvus installieren. Die Milvus-Einstellungen im nächsten Abschnitt verweisen auf den Jaeger-Service mit dessen Kurznamen „ <code translate="no">jaeger</code> “, und Kubernetes löst einen Servicenamen ohne Namespace nur innerhalb des Namespaces des Pods auf, der die Abfrage stellt.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add jaegertracing https://jaegertracing.github.io/helm-charts</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install jaeger jaegertracing/jaeger --version 4.19.0</span>
<button class="copy-code-btn"></button></code></pre>
<p>In der README-Datei des Charts wird das Chart als experimentell gekennzeichnet und darauf hingewiesen, dass es in Nebenversionen zu grundlegenden Änderungen kommen kann; daher wird die Chart-Version mit dem Befehl festgesetzt. Mit Chart-Version 4.19.0 wird Jaeger 2.23.0 bereitgestellt.</p>
<h3 id="2-Check-the-Jaeger-pod" class="common-anchor-header">2. Überprüfen Sie den Jaeger-Pod<button data-href="#2-Check-the-Jaeger-pod" class="anchor-icon" translate="no">
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
    </button></h3><p>Um zu überprüfen, ob der Jaeger-Pod läuft, führen Sie den folgenden Befehl aus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods -l app.kubernetes.io/instance=jaeger,app.kubernetes.io/component=all-in-one</span>
<button class="copy-code-btn"></button></code></pre>
<p>Das Chart erstellt einen Dienst namens „ <code translate="no">jaeger</code> “. Der Dienst stellt den OTLP-gRPC-Empfänger am Port „ <code translate="no">4317</code> “ und die Jaeger-Benutzeroberfläche am Port „ <code translate="no">16686</code> “ bereit.</p>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">Installieren Sie Milvus mit dem Helm-Chart<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Um Traces von Milvus über OTLP an Jaeger zu senden, speichern Sie die folgenden Einstellungen in einer Datei namens „ <code translate="no">values.yaml</code> “:</p>
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
<p>Mit diesen Einstellungen erfasst Milvus jede Anfrage (<code translate="no">sampleFraction: 1</code>) und exportiert die Traces über OTLP-gRPC ohne TLS (<code translate="no">secure: false</code>) an den Port <code translate="no">4317</code> des Dienstes „ <code translate="no">jaeger</code> “.</p>
<p>Um die oben genannten Einstellungen auf eine neue Milvus-Bereitstellung anzuwenden, führen Sie die folgenden Befehle aus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade --install my-release zilliztech/milvus --version 5.0.22 -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um die oben genannten Einstellungen auf eine bestehende Milvus-Bereitstellung anzuwenden, führen Sie den folgenden Befehl aus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Dieser Befehl verwendet „ <code translate="no">--reset-then-reuse-values</code> “, wofür Helm 3.14 oder höher erforderlich ist. Mit dieser Option setzt Helm die Werte auf die Standardwerte der in <code translate="no">--version</code> festgelegten Chart-Version zurück, wendet die Werte Ihrer aktuellen Release an und wendet anschließend die Werte aus <code translate="no">-f</code> an. Jeder Wert in <code translate="no">values.yaml</code> überschreibt somit den Wert Ihrer aktuellen Release, und der Eintrag „ <code translate="no">user.yaml</code> “ unter <code translate="no">extraConfigFiles</code> wird vollständig ersetzt. Um „ <code translate="no">&lt;current-chart-version&gt;</code> “ zu finden, führen Sie „ <code translate="no">helm list</code> “ aus und entfernen Sie das Präfix „ <code translate="no">milvus-</code> “ aus dem Wert in der Spalte „ <code translate="no">CHART</code> “. Wenn Sie „ <code translate="no">helm upgrade</code> “ mit „ <code translate="no">-f</code> “ oder „ <code translate="no">--set</code> “, jedoch ohne „ <code translate="no">--reset-then-reuse-values</code> “ oder „ <code translate="no">--reuse-values</code> “ ausführen, behält Helm die Werte, die Sie bei der Installation festgelegt haben, nicht bei.</p>
</div>
<h2 id="View-Traces" class="common-anchor-header">Traces anzeigen<button data-href="#View-Traces" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Dienst „ <code translate="no">jaeger</code> “ ist vom Typ „ <code translate="no">ClusterIP</code> “, und das Chart erstellt standardmäßig keinen Ingress. Um die Jaeger-Benutzeroberfläche von Ihrem lokalen Rechner aus zu öffnen, leiten Sie den UI-Port weiter:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward svc/jaeger 16686:16686</span>
<button class="copy-code-btn"></button></code></pre>
<p>Öffnen Sie anschließend <code translate="no">http://localhost:16686</code> in einem Browser.</p>
<p>Der folgende Screenshot zeigt die Jaeger-Benutzeroberfläche mit den Traces von Milvus während eines Suchvorgangs und eines Last-Erfassungsvorgangs:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" /> 
   <span>Trace-Suchanfrage</span>
  
 </span></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" /> 
   <span>Trace einer Last-Erfassungsanfrage</span>
  
 </span></p>
