---
id: deploy_s3.md
title: Konfigurieren von Objektspeicher mit Docker Compose oder Helm
related_key: 'S3, storage'
summary: >-
  Erfahren Sie, wie Sie S3-Speicher für Milvus mit Docker Compose oder Helm
  einrichten.
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Konfigurieren der Objektspeicherung mit Docker Compose oder Helm<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus verwendet standardmäßig MinIO für die Objektspeicherung, aber es unterstützt auch die Verwendung von <a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a> als persistenten Objektspeicher für Protokoll- und Indexdateien. Dieses Thema beschreibt, wie Sie S3 für Milvus konfigurieren. Sie können dieses Thema überspringen, wenn Sie mit MinIO zufrieden sind.</p>
<p>Sie können S3 mit <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> oder auf K8s konfigurieren.</p>
<h2 id="Configure-S3-with-Docker-Compose" class="common-anchor-header">Konfigurieren von S3 mit Docker Compose<button data-href="#Configure-S3-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. S3 konfigurieren</h3><p><a href="https://min.io/product/overview">MinIO</a> ist mit S3 kompatibel. Um S3 mit Docker Compose zu konfigurieren, geben Sie Ihre Werte für den Abschnitt <code translate="no">minio</code> in der Datei <code translate="no">milvus.yaml</code> im Pfad milvus/configs an.</p>
<pre><code translate="no" class="language-yaml">minio:
  address: &lt;your_s3_endpoint&gt;
  port: &lt;your_s3_port&gt;
  accessKeyID: &lt;your_s3_access_key_id&gt;
  secretAccessKey: &lt;your_s3_secret_access_key&gt;
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Siehe <a href="/docs/de/v2.4.x/configure_minio.md">MinIO/S3-Konfigurationen</a> für weitere Informationen.</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. Verfeinern Sie docker-compose.yaml</h3><p>Sie sollten auch die Umgebungsvariable <code translate="no">MINIO_ADDRESS</code> für den milvus-Dienst unter <code translate="no">docker-compose.yaml</code> entfernen. Standardmäßig verwendet milvus lokales Minio anstelle von externem S3.</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. Milvus starten</h3><p>Führen Sie den folgenden Befehl aus, um Milvus zu starten, das die S3-Konfigurationen verwendet.</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Die Konfigurationen werden erst nach dem Start von Milvus wirksam. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Starten von Milvus</a>.</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">Konfigurieren Sie S3 auf K8s<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>Für Milvus-Cluster auf K8s können Sie S3 mit demselben Befehl konfigurieren, mit dem Milvus gestartet wird. Alternativ können Sie S3 mithilfe der Datei <code translate="no">values.yml</code> im Pfad /charts/milvus im <a href="https://github.com/milvus-io/milvus-helm">milvus-helm-Repository</a> konfigurieren, bevor Sie Milvus starten.</p>
<p>In der folgenden Tabelle sind die Schlüssel für die Konfiguration von S3 in der YAML-Datei aufgeführt.</p>
<table>
<thead>
<tr><th>Schlüssel</th><th>Beschreibung</th><th>Wert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>Aktiviert oder deaktiviert MinIO.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>Aktiviert oder deaktiviert S3.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>Der Endpunkt für den Zugriff auf S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>Der Port für den Zugriff auf S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>Der Wurzelpfad des S3-Speichers.</td><td>Standardmäßig eine emtpy-Zeichenkette.</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>Die Zugriffsschlüssel-ID für S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>Der geheime Zugriffsschlüssel für S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>Der Name des S3-Buckets.</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>Ob bei der Verbindung SSL verwendet werden soll</td><td>Die Werte sind standardmäßig auf <code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Verwendung der YAML-Datei</h3><ol>
<li>Konfigurieren Sie den Abschnitt <code translate="no">minio</code> in der Datei <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Konfigurieren Sie den Abschnitt <code translate="no">externalS3</code> mit Ihren Werten in der Datei <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml">externalS3:
  enabled: <span class="hljs-literal">true</span>
  host: <span class="hljs-string">&quot;&lt;your_s3_endpoint&gt;&quot;</span>
  port: <span class="hljs-string">&quot;&lt;your_s3_port&gt;&quot;</span>
  accessKey: <span class="hljs-string">&quot;&lt;your_s3_access_key_id&gt;&quot;</span>
  secretKey: <span class="hljs-string">&quot;&lt;your_s3_secret_key&gt;&quot;</span>
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Nachdem Sie die vorangegangenen Abschnitte konfiguriert und die Datei <code translate="no">values.yaml</code> gespeichert haben, führen Sie den folgenden Befehl aus, um Milvus unter Verwendung der S3-Konfigurationen zu installieren.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">Verwenden eines Befehls</h3><p>Um Milvus zu installieren und S3 zu konfigurieren, führen Sie den folgenden Befehl mit Ihren Werten aus.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span>  --<span class="hljs-built_in">set</span> minio.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externalS3.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.host=&lt;your_s3_endpoint&gt; --<span class="hljs-built_in">set</span> externalS3.port=&lt;your_s3_port&gt; --<span class="hljs-built_in">set</span> externalS3.accessKey=&lt;your_s3_access_key_id&gt; --<span class="hljs-built_in">set</span> externalS3.secretKey=&lt;your_s3_secret_key&gt; --<span class="hljs-built_in">set</span> externalS3.bucketName=&lt;your_bucket_name&gt;
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
    </button></h2><p>Erfahren Sie, wie Sie andere Milvus-Abhängigkeiten mit Docker Compose oder Helm konfigurieren können:</p>
<ul>
<li><a href="/docs/de/v2.4.x/deploy_etcd.md">Konfigurieren von Metaspeicher mit Docker Compose oder Helm</a></li>
<li><a href="/docs/de/v2.4.x/deploy_pulsar.md">Konfigurieren Sie den Nachrichtenspeicher mit Docker Compose oder Helm</a></li>
</ul>
