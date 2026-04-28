---
id: config_jaeger_tracing.md
title: Trace konfigurieren
related_key: 'Jaeger, Milvus, Trace'
summary: >-
  Dieser Leitfaden enthält Anweisungen zur Konfiguration von Jaeger für die
  Erfassung von Spuren für Milvus.
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
    </button></h1><p>Dieser Leitfaden enthält Anweisungen zur Konfiguration von Jaeger für die Erfassung von Traces für Milvus.</p>
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
<li>Sie haben die erforderlichen Tools, einschließlich <a href="https://helm.sh/docs/intro/install/">Helm</a> und <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>, installiert.</li>
<li>Cert-manager Version 1.6.1 oder höher muss installiert sein. Eine Installationsanleitung finden Sie <a href="https://cert-manager.io/v1.6-docs/installation/#default-static-install">hier</a>.</li>
</ul>
<h2 id="Deply-Jaeger" class="common-anchor-header">Jaeger einrichten<button data-href="#Deply-Jaeger" class="anchor-icon" translate="no">
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
<h3 id="1-Installing-the-Jaeger-Operator-on-Kubernetes" class="common-anchor-header">1. Installieren des Jaeger-Operators auf Kubernetes</h3><p>Um den Operator zu installieren, führen Sie aus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl create namespace observability</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.62.0/jaeger-operator.yaml -n observability</span>
<button class="copy-code-btn"></button></code></pre>
<p>Zu diesem Zeitpunkt sollte eine <code translate="no">jaeger-operator</code> Bereitstellung verfügbar sein. Sie können es mit dem folgenden Befehl anzeigen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get deployment jaeger-operator -n observability</span>

NAME              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
jaeger-operator   1         1         1            1           48s
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Deploy-Jaeger" class="common-anchor-header">2. Jaeger bereitstellen</h3><p>Der einfachste Weg, eine Jaeger-Instanz zu erstellen, ist die Erstellung einer YAML-Datei wie im folgenden Beispiel. Dadurch wird die standardmäßige AllInOne-Strategie installiert, die das <strong>All-In-One-Image</strong> (eine Kombination aus <strong>Jaeger-Agent</strong>, <strong>Jaeger-Collector</strong>, <strong>Jaeger-Query</strong> und Jaeger-UI) in einem einzigen Pod bereitstellt und standardmäßig <strong>In-Memory-Speicher</strong> verwendet.</p>
<p>Wenn Sie Traces über einen längeren Zeitraum speichern möchten, lesen Sie bitte <a href="https://www.jaegertracing.io/docs/1.62/operator/#production-strategy">production-strategy</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">jaegertracing.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Jaeger</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">jaeger</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die YAML-Datei kann dann mit <code translate="no">kubectl</code> verwendet werden:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f simplest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>In wenigen Sekunden steht eine neue In-Memory-All-in-One-Instanz von Jaeger zur Verfügung, die sich für schnelle Demos und Entwicklungszwecke eignet. Um zu überprüfen, welche Instanzen erstellt wurden, listen Sie die Jaeger-Objekte auf:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get jaegers</span>

NAME     STATUS    VERSION   STRATEGY   STORAGE   AGE
jaeger   Running   1.62.0    allinone   memory    13s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">Milvus mit Helm Chart installieren<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können Milvus mit Helm Chart mit den folgenden Einstellungen installieren oder aktualisieren:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    trace:
      exporter: jaeger
      sampleFraction: 1
      jaeger:
        url: &quot;http://jaeger-collector:14268/api/traces&quot;
</span><button class="copy-code-btn"></button></code></pre>
<p>Um die oben genannten Einstellungen auf einen neuen Milvus-Einsatz anzuwenden, können Sie den folgenden Befehl ausführen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade --install -f values.yaml my-release milvus/milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um die oben genannten Einstellungen auf einen bestehenden Milvus-Einsatz anzuwenden, können Sie den folgenden Befehl ausführen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release -f values.yaml milvus/milvus</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Sobald Sie Jaeger und Milvus mit Helm Chart eingesetzt haben, wurde ein Ingress von dfault aktiviert. Sie können den Ingress anzeigen, indem Sie den folgenden Befehl ausführen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get ingress</span>

NAME           CLASS    HOSTS   ADDRESS         PORTS   AGE
jaeger-query   &lt;none&gt;   *       192.168.122.34  80      14m
<button class="copy-code-btn"></button></code></pre>
<p>Sobald der Ingress verfügbar ist, können Sie auf die Jaeger-Benutzeroberfläche zugreifen, indem Sie zu <code translate="no">http://${ADDRESS}</code> navigieren. Ersetzen Sie <code translate="no">${ADDRESS}</code> durch die tatsächliche IP-Adresse des Ingress.</p>
<p>Der folgende Screenshot zeigt die Jaeger-Benutzeroberfläche mit den Traces von Milvus während eines Suchvorgangs und eines Lastsammelvorgangs:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" />
   </span> <span class="img-wrapper"> <span>Trace Suchanfrage</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" />
   </span> <span class="img-wrapper"> <span>Trace Lastsammlungsanforderung</span> </span></p>
