---
id: configure_grafana_loki.md
title: Grafana Loki konfigurieren
summary: >-
  Dieses Thema beschreibt das Sammeln von Protokollen mit Loki und das Abfragen
  von Protokollen für einen Milvus-Cluster mit Grafana.
---
<h1 id="Configure-Grafana-Loki" class="common-anchor-header">Grafana Loki konfigurieren<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieser Leitfaden enthält Anweisungen zur Konfiguration von Loki zum Sammeln von Protokollen und Grafana zum Abfragen und Anzeigen von Protokollen für einen Milvus-Cluster.</p>
<p>In diesem Leitfaden erfahren Sie, wie Sie:</p>
<ul>
<li><a href="https://grafana.com/docs/loki/latest/get-started/overview/">Loki</a> und <a href="https://grafana.com/docs/loki/latest/send-data/promtail/">Promtail</a> auf einem Milvus-Cluster mit Helm bereitstellen.</li>
<li>Konfigurieren Sie den Objektspeicher für Loki.</li>
<li>Abfragen von Protokollen mit Grafana.</li>
</ul>
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
<li>Sie haben <a href="/docs/de/v2.4.x/install_cluster-helm.md">einen Milvus-Cluster auf K8s installiert</a>.</li>
<li>Sie haben die erforderlichen Tools, einschließlich <a href="https://helm.sh/docs/intro/install/">Helm</a> und <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>, installiert.</li>
</ul>
<h2 id="Deploy-Loki" class="common-anchor-header">Loki bereitstellen<button data-href="#Deploy-Loki" class="anchor-icon" translate="no">
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
    </button></h2><p>Loki ist ein von Prometheus inspiriertes System zur Protokollaggregation. Setzen Sie Loki mit Helm ein, um Protokolle von Ihrem Milvus-Cluster zu sammeln.</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1. Hinzufügen des Grafana Helm Chart Repository</h3><p>Fügen Sie das Chart-Repository von Grafana zu Helm hinzu und aktualisieren Sie es:</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2. Konfigurieren Sie den Objektspeicher für Loki</h3><p>Wählen Sie eine der folgenden Speicheroptionen und erstellen Sie eine <code translate="no">loki.yaml</code> Konfigurationsdatei:</p>
<ul>
<li><p>Option 1: Verwendung von MinIO für die Speicherung</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki</span>:
  <span class="hljs-attr">commonConfig</span>:
    <span class="hljs-attr">replication_factor</span>: <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled</span>: <span class="hljs-literal">false</span>

<span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Option 2: Verwendung von AWS S3 für die Speicherung</p>
<p>Im folgenden Beispiel ersetzen Sie <code translate="no">&lt;accessKey&gt;</code> und <code translate="no">&lt;keyId&gt;</code> durch Ihren eigenen S3-Zugangsschlüssel und Ihre ID, <code translate="no">s3.endpoint</code> durch den S3-Endpunkt und <code translate="no">s3.region</code> durch die S3-Region.</p>
<pre><code translate="no" class="language-yaml">loki:
  commonConfig:
    replication_factor: 1
  auth_enabled: <span class="hljs-literal">false</span>
  storage:
    bucketNames:
      chunks: loki-chunks
      ruler: loki-ruler
      admin: loki-admin
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&#x27;s3&#x27;</span>
    s3:
      endpoint: s3.us-west-2.amazonaws.com
      region: us-west-2
      secretAccessKey: &lt;accessKey&gt;
      accessKeyId: &lt;keyId&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Install-Loki" class="common-anchor-header">3. Loki installieren</h3><p>Führen Sie die folgenden Befehle aus, um Loki zu installieren:</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Promtail" class="common-anchor-header">Promtail bereitstellen<button data-href="#Deploy-Promtail" class="anchor-icon" translate="no">
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
    </button></h2><p>Promtail ist ein Protokollsammelagent für Loki. Er liest Logs von Milvus-Pods und sendet sie an Loki.</p>
<h3 id="1-Create-Promtail-Configuration" class="common-anchor-header">1. Promtail-Konfiguration erstellen</h3><p>Erstellen Sie eine <code translate="no">promtail.yaml</code> Konfigurationsdatei:</p>
<pre><code translate="no" class="language-yaml">config:
  clients:
    - url: http://loki-gateway/loki/api/v1/push
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Promtail" class="common-anchor-header">2. Promtail installieren</h3><p>Installieren Sie Promtail mit Helm:</p>
<pre><code translate="no" class="language-shell">helm install  --values promtail.yaml promtail grafana/promtail -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">Abfrage von Protokollen mit Grafana<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>Setzen Sie Grafana ein und konfigurieren Sie es für die Verbindung mit Loki zur Abfrage von Protokollen.</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1. Grafana bereitstellen</h3><p>Installieren Sie Grafana mit den folgenden Befehlen:</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>Bevor Sie auf Grafana zugreifen können, müssen Sie das Passwort <code translate="no">admin</code> abrufen:</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=<span class="hljs-string">&quot;{.data.admin-password}&quot;</span> | <span class="hljs-built_in">base64</span> --decode ; <span class="hljs-built_in">echo</span>
<button class="copy-code-btn"></button></code></pre>
<p>Leiten Sie dann den Grafana-Port an Ihren lokalen Rechner weiter:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">POD_NAME</span>=$(kubectl get pods --namespace monitoring -l <span class="hljs-string">&quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot;</span> -o jsonpath=<span class="hljs-string">&quot;{.items[0].metadata.name}&quot;</span>)
kubectl --namespace monitoring port-forward $POD_NAME <span class="hljs-number">3000</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2. Loki als Datenquelle in Grafana hinzufügen</h3><p>Sobald Grafana läuft, müssen Sie Loki als Datenquelle hinzufügen, um Logs abzufragen.</p>
<ol>
<li>Öffnen Sie einen Webbrowser und navigieren Sie zu <code translate="no">127.0.0.1:3000</code>. Melden Sie sich mit dem Benutzernamen <code translate="no">admin</code> und dem zuvor erhaltenen Passwort an.</li>
<li>Wählen Sie im Menü auf der linken Seite <strong>Verbindungen</strong> &gt; <strong>Neue Verbindung hinzufügen</strong>.</li>
<li>Wählen Sie auf der nun angezeigten Seite <strong>Loki</strong> als Datenquellentyp. Sie können <strong>loki</strong> in die Suchleiste eingeben, um die Datenquelle zu finden.</li>
<li>Geben Sie in den Einstellungen für die Loki-Datenquelle den <strong>Namen</strong> und die <strong>URL</strong> an, und klicken Sie dann auf <strong>Speichern und testen</strong>.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
   </span> <span class="img-wrapper"> <span>Datenquelle</span> </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3. Milvus Logs abfragen</h3><p>Nachdem Sie Loki als Datenquelle hinzugefügt haben, fragen Sie Milvus Logs in Grafana ab:</p>
<ol>
<li>Klicken Sie im Menü auf der linken Seite auf <strong>Explore</strong>.</li>
<li>Wählen Sie in der oberen linken Ecke der Seite die Datenquelle loki.</li>
<li>Verwenden Sie den <strong>Label-Browser</strong>, um Labels auszuwählen und Logs abzufragen.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
   </span> <span class="img-wrapper"> <span>Abfrage</span> </span></p>
