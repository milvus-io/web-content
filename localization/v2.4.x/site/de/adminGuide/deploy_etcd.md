---
id: deploy_etcd.md
title: Konfigurieren Sie Meta Storage mit Docker Compose oder Helm
related_key: 'S3, storage'
summary: >-
  Erfahren Sie, wie Sie Metaspeicher für Milvus mit Docker Compose/Helm
  konfigurieren.
---
<h1 id="Configure-Meta-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Konfigurieren Sie den Metaspeicher mit Docker Compose oder Helm<button data-href="#Configure-Meta-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus verwendet etcd zum Speichern von Metadaten. In diesem Thema wird erläutert, wie Sie etcd mit Docker Compose oder Helm konfigurieren.</p>
<h2 id="Configure-etcd-with-Docker-Compose" class="common-anchor-header">Konfigurieren von etcd mit Docker Compose<button data-href="#Configure-etcd-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-etcd" class="common-anchor-header">1. Konfigurieren von etcd</h3><p>Um etcd mit Docker Compose zu konfigurieren, geben Sie Ihre Werte für den Abschnitt <code translate="no">etcd</code> in der Datei <code translate="no">milvus.yaml</code> im Pfad milvus/configs an.</p>
<pre><code translate="no">etcd:
  endpoints:
    - localhost:<span class="hljs-number">2379</span>
  rootPath: by-dev <span class="hljs-comment"># The root path where data are stored in etcd</span>
  metaSubPath: meta <span class="hljs-comment"># metaRootPath = rootPath + &#x27;/&#x27; + metaSubPath</span>
  kvSubPath: kv <span class="hljs-comment"># kvRootPath = rootPath + &#x27;/&#x27; + kvSubPath</span>
  log:
    <span class="hljs-comment"># path is one of:</span>
    <span class="hljs-comment">#  - &quot;default&quot; as os.Stderr,</span>
    <span class="hljs-comment">#  - &quot;stderr&quot; as os.Stderr,</span>
    <span class="hljs-comment">#  - &quot;stdout&quot; as os.Stdout,</span>
    <span class="hljs-comment">#  - file path to append server logs to.</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/logs/etcd.log</span>
    path: stdout
    level: info <span class="hljs-comment"># Only supports debug, info, warn, error, panic, or fatal. Default &#x27;info&#x27;.</span>
  use:
    <span class="hljs-comment"># please adjust in embedded Milvus: true</span>
    embed: false <span class="hljs-comment"># Whether to enable embedded Etcd (an in-process EtcdServer).</span>
  data:
    <span class="hljs-comment"># Embedded Etcd only.</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/etcdData/</span>
    <span class="hljs-built_in">dir</span>: default.etcd
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/configure_etcd.md">etcd-bezogene Konfigurationen</a>.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Starten Sie Milvus</h3><p>Führen Sie den folgenden Befehl aus, um Milvus zu starten, das die etcd-Konfigurationen verwendet.</p>
<pre><code translate="no">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Die Konfigurationen werden erst nach dem Start von Milvus wirksam. Siehe <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Starten von Milvus</a> für weitere Informationen.</div>
<h2 id="Configure-etcd-on-K8s" class="common-anchor-header">Konfigurieren Sie etcd auf K8s<button data-href="#Configure-etcd-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>Für Milvus-Cluster auf K8s können Sie etcd mit demselben Befehl konfigurieren, der Milvus startet. Alternativ können Sie etcd mithilfe der Datei <code translate="no">values.yml</code> im Pfad /charts/milvus im <a href="https://github.com/milvus-io/milvus-helm">milvus-helm-Repository</a> konfigurieren, bevor Sie Milvus starten.</p>
<p>In der folgenden Tabelle sind die Schlüssel für die Konfiguration von etcd in der YAML-Datei aufgeführt.</p>
<table>
<thead>
<tr><th>Schlüssel</th><th>Beschreibung</th><th>Wert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">etcd.enabled</code></td><td>Aktiviert oder deaktiviert etcd.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalEtcd.enabled</code></td><td>Aktiviert oder deaktiviert externes etcd.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalEtcd.endpoints</code></td><td>Der Endpunkt für den Zugriff auf etcd.</td><td></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Verwendung der YAML-Datei</h3><ol>
<li>Konfigurieren Sie den Abschnitt <code translate="no">etcd</code> mit Ihren Werten aus der Datei <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">etcd</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Konfigurieren Sie den Abschnitt <code translate="no">externaletcd</code> unter Verwendung Ihrer Werte aus der Datei <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml">externalEtcd:
  enabled: <span class="hljs-literal">true</span>
  <span class="hljs-comment">## the endpoints of the external etcd</span>
  endpoints:
    - &lt;your_etcd_IP&gt;:2379
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Nachdem Sie die vorangegangenen Abschnitte konfiguriert und die Datei <code translate="no">values.yaml</code> gespeichert haben, führen Sie den folgenden Befehl aus, um Milvus zu installieren, das die etcd-Konfigurationen verwendet.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">Verwenden eines Befehls</h3><p>Um Milvus zu installieren und etcd zu konfigurieren, führen Sie den folgenden Befehl mit Ihren Werten aus.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> etcd.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externaletcd.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalEtcd.endpoints={&lt;your_etcd_IP&gt;:2379}
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
<li><a href="/docs/de/v2.4.x/deploy_s3.md">Konfigurieren Sie den Objektspeicher mit Docker Compose oder Helm</a></li>
<li><a href="/docs/de/v2.4.x/deploy_pulsar.md">Konfigurieren Sie den Nachrichtenspeicher mit Docker Compose oder Helm</a></li>
</ul>
