---
id: deploy-cdc-server.md
order: 2
summary: >-
  Dieser Leitfaden enthält eine schrittweise Anleitung für die Bereitstellung
  eines Milvus-CDC-Servers.
title: CDC-Server bereitstellen
---
<h1 id="Deploy-CDC-Server" class="common-anchor-header">CDC-Server bereitstellen<button data-href="#Deploy-CDC-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieser Leitfaden enthält eine schrittweise Anleitung für die Bereitstellung eines Milvus-CDC-Servers.</p>
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
    </button></h2><p>Stellen Sie sicher, dass die folgenden Bedingungen erfüllt sind, bevor Sie einen Milvus-CDC-Server einrichten:</p>
<ul>
<li><p><strong>Milvus-Instanzen</strong>: Sowohl das Quell-Milvus als auch mindestens ein Ziel-Milvus sollten bereitgestellt und betriebsbereit sein.</p>
<ul>
<li><p>Sowohl die Quell- als auch die Ziel-Milvus-Versionen müssen 2.3.2 oder höher sein, vorzugsweise 2.4.x. Wir empfehlen, die gleiche Version für Quell- und Ziel-Milvus zu verwenden, um Kompatibilität zu gewährleisten.</p></li>
<li><p>Setzen Sie die <code translate="no">common.ttMsgEnabled</code> Konfiguration des Ziel-Milvus auf <code translate="no">false</code>.</p></li>
<li><p>Konfigurieren Sie das Quell- und das Ziel-Milvus mit unterschiedlichen Meta- und Nachrichtenspeichereinstellungen, um Konflikte zu vermeiden. Vermeiden Sie zum Beispiel die Verwendung derselben etcd- und rootPath-Konfigurationen sowie identischer Pulsar-Dienste und <code translate="no">chanNamePrefix</code> in mehreren Milvus-Instanzen.</p></li>
</ul></li>
<li><p><strong>Metaspeicher</strong>: Halten Sie eine etcd- oder MySQL-Datenbank für den Milvus-CDC-Metaspeicher bereit.</p></li>
</ul>
<h2 id="Steps" class="common-anchor-header">Schritte<button data-href="#Steps" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Obtain-the-Milvus-CDC-config-file" class="common-anchor-header">Besorgen Sie sich die Milvus-CDC-Konfigurationsdatei</h3><p>Klonen Sie das <a href="https://github.com/zilliztech/milvus-cdc">Milvus-CDC-Repositorium</a> und navigieren Sie zum Verzeichnis <code translate="no">milvus-cdc/server/configs</code>, um auf die Konfigurationsdatei <code translate="no">cdc.yaml</code> zuzugreifen.</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-cdc.git

<span class="hljs-built_in">cd</span> milvus-cdc/server/configs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Edit-the-config-file" class="common-anchor-header">Bearbeiten Sie die Konfigurationsdatei</h3><p>Ändern Sie im Verzeichnis <code translate="no">milvus-cdc/server/configs</code> die Datei <code translate="no">cdc.yaml</code>, um die Konfigurationen in Bezug auf den Milvus-CDC-Metastore und die Verbindungsdetails der Milvus-Quelle anzupassen.</p>
<ul>
<li><p><strong>Metastore-Konfiguration</strong>:</p>
<ul>
<li><p><code translate="no">metaStoreConfig.storeType</code>: Typ des Metaspeichers für Milvus-CDC. Mögliche Werte sind <code translate="no">etcd</code> oder <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.etcdEndpoints</code>: Adresse für die Verbindung mit dem etcd von Milvus-CDC. Erforderlich, wenn <code translate="no">storeType</code> auf <code translate="no">etcd</code> eingestellt ist.</p></li>
<li><p><code translate="no">metaStoreConfig.mysqlSourceUrl</code>: Verbindungsadresse der MySQL-Datenbank für den Milvus-CDC-Server. Erforderlich, wenn <code translate="no">storeType</code> auf <code translate="no">mysql</code> gesetzt ist.</p></li>
<li><p><code translate="no">metaStoreConfig.rootPath</code>: Wurzelpfad des Milvus-CDC-Metaspeichers. Diese Konfiguration ermöglicht Multi-Tenancy, so dass mehrere CDC-Dienste dieselbe etcd- oder MySQL-Instanz verwenden können, während sie durch unterschiedliche Root-Pfade isoliert werden.</p></li>
</ul>
<p>Beispielkonfiguration:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># cdc meta data config</span>
metaStoreConfig:
  <span class="hljs-comment"># the metastore type, available value: etcd, mysql</span>
  storeType: etcd
  <span class="hljs-comment"># etcd address</span>
  etcdEndpoints:
    - localhost:<span class="hljs-number">2379</span>
  <span class="hljs-comment"># mysql connection address</span>
  <span class="hljs-comment"># mysqlSourceUrl: root:root@tcp(127.0.0.1:3306)/milvus-cdc?charset=utf8</span>
  <span class="hljs-comment"># meta data prefix, if multiple cdc services use the same store service, you can set different rootPaths to achieve multi-tenancy</span>
  rootPath: cdc
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Quell-Milvus-Konfiguration:</strong></p>
<p>Geben Sie die Verbindungsdetails des Quell-Milvus an, einschließlich etcd und Nachrichtenspeicher, um eine Verbindung zwischen dem Milvus-CDC-Server und dem Quell-Milvus herzustellen.</p>
<ul>
<li><p><code translate="no">sourceConfig.etcdAddress</code>: Adresse für die Verbindung mit dem etcd des Quell-Milvus. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations">etcd-bezogene Konfigurationen</a>.</p></li>
<li><p><code translate="no">sourceConfig.etcdRootPath</code>: Root-Präfix des Schlüssels, in dem das Quell-Milvus Daten in etcd speichert. Der Wert kann je nach der Bereitstellungsmethode der Milvus-Instanz variieren:</p>
<ul>
<li><p><strong>Helm</strong> oder <strong>Docker Compose</strong>: Der Standardwert ist <code translate="no">by-dev</code>.</p></li>
<li><p><strong>Operator</strong>: Der Standardwert ist <code translate="no">&lt;release_name&gt;</code>.</p></li>
</ul></li>
<li><p><code translate="no">replicateChan</code>Name des Milvus-Replikationskanals, der in der Datei milvus.yaml unter <code translate="no">{msgChannel.chanNamePrefix.cluster}/{msgChannel.chanNamePrefix.replicateMsg}</code> zu finden ist</p></li>
<li><p><code translate="no">sourceConfig.pulsar</code>: Pulsar-Konfigurationen für den Quell-Milvus. Wenn das Quell-Milvus Kafka zur Nachrichtenspeicherung verwendet, entfernen Sie alle Pulsar-bezogenen Konfigurationen. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/configure_pulsar.md">Pulsar-bezogene Konfigurationen</a>.</p></li>
<li><p><code translate="no">sourceConfig.kafka.address</code>: Kafka-Adresse für das Quell-Milvus. Dekommentieren Sie diese Konfiguration, wenn das Quell-Milvus Kafka für die Nachrichtenspeicherung verwendet.</p></li>
</ul></li>
</ul>
<p>Beispielkonfiguration:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-source config, these settings are basically the same as the corresponding configuration of milvus.yaml in milvus source.</span>
sourceConfig:
  <span class="hljs-comment"># etcd config</span>
  etcdAddress:
    - localhost:<span class="hljs-number">2379</span>
  etcdRootPath: by-dev
  etcdMetaSubPath: meta
  <span class="hljs-comment"># default partition name</span>
  defaultPartitionName: _default
  <span class="hljs-comment"># read buffer length, mainly used for buffering if writing data to milvus-target is slow.</span>
  readChanLen: <span class="hljs-number">10</span>
  replicateChan: by-dev-replicate-msg
  <span class="hljs-comment"># milvus-source mq config, which is pulsar or kafka</span>
  pulsar:
    address: pulsar://localhost:<span class="hljs-number">6650</span>
    webAddress: localhost:<span class="hljs-number">80</span>
    maxMessageSize: <span class="hljs-number">5242880</span>
    tenant: public
    namespace: default
<span class="hljs-comment">#    authPlugin: org.apache.pulsar.client.impl.auth.AuthenticationToken</span>
<span class="hljs-comment">#    authParams: token:xxx</span>
<span class="hljs-comment">#  kafka:</span>
<span class="hljs-comment">#    address: 127.0.0.1:9092</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Compile-the-Milvus-CDC-server" class="common-anchor-header">Kompilieren des Milvus-CDC-Servers</h3><p>Nachdem Sie die Datei <code translate="no">cdc.yaml</code> gespeichert haben, navigieren Sie zum Verzeichnis <code translate="no">milvus-cdc</code> und führen einen der folgenden Befehle aus, um den Server zu kompilieren:</p>
<ul>
<li><p>Für eine Binärdatei:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">make</span> build
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Für ein Docker-Abbild:</p>
<pre><code translate="no" class="language-bash">bash build_image.sh
<button class="copy-code-btn"></button></code></pre>
<p>Bei einem Docker-Image mounten Sie die kompilierte Datei nach <code translate="no">/app/server/configs/cdc.yaml</code> innerhalb des Containers.</p></li>
</ul>
<h3 id="Start-the-server" class="common-anchor-header">Starten Sie den Server</h3><ul>
<li><p>Verwendung der Binärdatei</p>
<p>Navigieren Sie zu dem Verzeichnis, das die Binärdatei <code translate="no">milvus-cdc</code> und das Verzeichnis <code translate="no">configs</code> mit der Datei <code translate="no">cdc.yaml</code> enthält, und starten Sie dann den Server:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># dir tree</span>
.
├── milvus-cdc <span class="hljs-comment"># build from source code or download from release page</span>
├── configs
│   └── cdc.yaml <span class="hljs-comment"># config for cdc and source milvus</span>

<span class="hljs-comment"># start milvus cdc</span>
./milvus-cdc server
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verwenden Sie Docker Compose:</p>
<pre><code translate="no" class="language-bash">docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ul>
