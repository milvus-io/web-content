---
id: upgrade_milvus_standalone-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: >-
  Erfahren Sie, wie Sie Milvus standalone mit Milvus operator aktualisieren
  können.
title: Aufrüstung von Milvus Standalone mit Milvus Operator
---

<div class="tab-wrapper"><a href="/docs/de/v2.5.x/upgrade_milvus_standalone-operator.md" class='active '>Milvus</a><a href="/docs/de/v2.5.x/upgrade_milvus_standalone-helm.md" class=''>OperatorHelmDocker</a><a href="/docs/de/v2.5.x/upgrade_milvus_standalone-docker.md" class=''>Zusammenstellen</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Milvus-Operator" class="common-anchor-header">Aufrüstung von Milvus Standalone mit Milvus Operator<button data-href="#Upgrade-Milvus-Standalone-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieser Leitfaden beschreibt, wie Sie Ihren Milvus Standalone mit Milvus Operator aufrüsten können.</p>
<h2 id="Upgrade-your-Milvus-operator" class="common-anchor-header">Aktualisieren Sie Ihren Milvus Operator<button data-href="#Upgrade-your-Milvus-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Führen Sie den folgenden Befehl aus, um die Version Ihres Milvus Operators auf v1.2.0 zu aktualisieren.</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> zilliztech-milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update zilliztech-milvus-<span class="hljs-keyword">operator</span>
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> zilliztech-milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sobald Sie Ihren Milvus-Operator auf die neueste Version aktualisiert haben, haben Sie die folgenden Möglichkeiten:</p>
<ul>
<li>Um Milvus von v2.2.3 oder späteren Versionen auf 2.5.13 zu aktualisieren, können Sie <a href="#Conduct-a-rolling-upgrade">ein Rolling Upgrade durchführen</a>.</li>
<li>Um Milvus von einer Nebenversion vor v2.2.3 auf 2.5.13 zu aktualisieren, sollten Sie <a href="#Upgrade-Milvus-by-changing-its-image">Milvus aktualisieren, indem Sie seine Image-Version ändern</a>.</li>
<li>Um Milvus von v2.1.x auf 2.5.13 zu aktualisieren, müssen Sie <a href="#Migrate-the-metadata">die Metadaten</a> vor dem eigentlichen Upgrade <a href="#Migrate-the-metadata">migrieren</a>.</li>
</ul>
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">Durchführen eines rollenden Upgrades<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Seit Milvus 2.2.3 können Sie Milvus-Koordinatoren so konfigurieren, dass sie im Aktiv-Standby-Modus arbeiten, und die Funktion "Rolling Upgrade" für sie aktivieren, so dass Milvus auf eingehende Anfragen während der Koordinator-Upgrades reagieren kann. In früheren Versionen müssen die Koordinatoren während eines Upgrades entfernt und neu erstellt werden, was zu einer gewissen Ausfallzeit des Dienstes führen kann.</p>
<p>Auf der Grundlage der von Kubernetes bereitgestellten rollierenden Aktualisierungsfunktionen erzwingt der Milvus-Operator eine geordnete Aktualisierung der Bereitstellungen entsprechend ihrer Abhängigkeiten. Darüber hinaus implementiert Milvus einen Mechanismus, der sicherstellt, dass seine Komponenten während des Upgrades mit den von ihnen abhängigen Komponenten kompatibel bleiben, wodurch potenzielle Ausfallzeiten des Dienstes erheblich reduziert werden.</p>
<p>Die Funktion "Rolling Upgrade" ist standardmäßig deaktiviert. Sie müssen sie explizit über eine Konfigurationsdatei aktivieren.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">rollingUpgrade</span> <span class="hljs-comment"># Default value, can be omitted</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.13</span>
<button class="copy-code-btn"></button></code></pre>
<p>In der obigen Konfigurationsdatei setzen Sie <code translate="no">spec.components.enableRollingUpdate</code> auf <code translate="no">true</code> und <code translate="no">spec.components.image</code> auf die gewünschte Milvus-Version.</p>
<p>Standardmäßig führt Milvus ein Rolling Upgrade für Koordinatoren in geordneter Weise durch, wobei die Pod-Images der Koordinatoren nacheinander ersetzt werden. Um die Upgrade-Zeit zu verkürzen, sollten Sie <code translate="no">spec.components.imageUpdateMode</code> auf <code translate="no">all</code> setzen, damit Milvus alle Pod-Images gleichzeitig ersetzt.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">all</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.13</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie können <code translate="no">spec.components.imageUpdateMode</code> auf <code translate="no">rollingDowngrade</code> setzen, damit Milvus die Coordinator-Pod-Images durch eine niedrigere Version ersetzt.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">rollingDowngrade</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:&lt;some-older-version&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Speichern Sie dann Ihre Konfiguration als YAML-Datei (z.B. <code translate="no">milvusupgrade.yaml</code>) und patchen Sie diese Konfigurationsdatei wie folgt in Ihre Milvus-Instanz:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">Upgrade von Milvus durch Änderung des Images<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>Im Normalfall können Sie Ihr Milvus einfach auf die neueste Version aktualisieren, indem Sie sein Image ändern. Beachten Sie jedoch, dass es zu einer gewissen Ausfallzeit kommt, wenn Sie Milvus auf diese Weise aktualisieren.</p>
<p>Stellen Sie eine Konfigurationsdatei wie folgt zusammen und speichern Sie sie als <strong>milvusupgrade.yaml</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">components:</span>
   <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.13</span>
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie dann das Folgende aus, um das Upgrade durchzuführen:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Migrieren Sie die Metadaten<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>Seit Milvus 2.2.0 sind die Metadaten nicht mehr mit denen früherer Versionen kompatibel. Die folgenden Beispielschnipsel gehen von einem Upgrade von Milvus 2.1.4 auf Milvus v2.5.13 aus.</p>
<h3 id="1-Create-a-yaml-file-for-metadata-migration" class="common-anchor-header">1. Erstellen Sie eine <code translate="no">.yaml</code> Datei für die Migration von Metadaten</h3><p>Erstellen Sie eine Metadaten-Migrationsdatei. Im Folgenden finden Sie ein Beispiel. Sie müssen <code translate="no">name</code>, <code translate="no">sourceVersion</code> und <code translate="no">targetVersion</code> in der Konfigurationsdatei angeben. Im folgenden Beispiel wird <code translate="no">name</code> auf <code translate="no">my-release-upgrade</code>, <code translate="no">sourceVersion</code> auf <code translate="no">v2.1.4</code> und <code translate="no">targetVersion</code> auf <code translate="no">v2.5.13</code> gesetzt. Dies bedeutet, dass Ihre Milvus-Instanz von v2.1.4 auf v2.5.13 aktualisiert wird.</p>
<pre><code translate="no"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">MilvusUpgrade</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-upgrade</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">milvus:</span>
    <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">sourceVersion:</span> <span class="hljs-string">&quot;v2.1.4&quot;</span>
  <span class="hljs-attr">targetVersion:</span> <span class="hljs-string">&quot;v2.5.13&quot;</span>
  <span class="hljs-comment"># below are some omit default values:</span>
  <span class="hljs-comment"># targetImage: &quot;milvusdb/milvus:v2.5.13&quot;</span>
  <span class="hljs-comment"># toolImage: &quot;milvusdb/meta-migration:v2.2.0&quot;</span>
  <span class="hljs-comment"># operation: upgrade</span>
  <span class="hljs-comment"># rollbackIfFailed: true</span>
  <span class="hljs-comment"># backupPVC: &quot;&quot;</span>
  <span class="hljs-comment"># maxRetry: 3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Apply-the-new-configuration" class="common-anchor-header">2. Übernehmen Sie die neue Konfiguration</h3><p>Führen Sie den folgenden Befehl aus, um die neue Konfiguration anzuwenden.</p>
<pre><code translate="no">$ kubectl <span class="hljs-built_in">create</span> -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/<span class="hljs-built_in">config</span>/samples/milvusupgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-status-of-metadata-migration" class="common-anchor-header">3. Prüfen Sie den Status der Metadaten-Migration</h3><p>Führen Sie den folgenden Befehl aus, um den Status Ihrer Metadaten-Migration zu überprüfen.</p>
<pre><code translate="no">kubectl <span class="hljs-keyword">describe</span> milvus <span class="hljs-keyword">release</span><span class="hljs-operator">-</span>name
<button class="copy-code-btn"></button></code></pre>
<p>Der Status <code translate="no">ready</code> in der Ausgabe bedeutet, dass die Metadaten-Migration erfolgreich war.</p>
<p>Sie können auch <code translate="no">kubectl get pod</code> ausführen, um alle Pods zu überprüfen. Wenn alle Pods <code translate="no">ready</code> sind, ist die Metadaten-Migration erfolgreich.</p>
<h3 id="4-Delete-my-release-upgrade" class="common-anchor-header">4. Löschen Sie <code translate="no">my-release-upgrade</code></h3><p>Wenn das Upgrade erfolgreich ist, löschen Sie <code translate="no">my-release-upgrade</code> in der YAML-Datei.</p>
