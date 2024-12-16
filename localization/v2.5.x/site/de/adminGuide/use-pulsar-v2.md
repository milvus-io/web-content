---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: >-
  Milvus empfiehlt Ihnen, Pulsar auf v3 für Milvus v2.5.x zu aktualisieren. Wenn
  Sie jedoch lieber Pulsar v2 verwenden möchten, wird dieser Artikel Sie durch
  die Schritte führen, um Pulsar v2 mit Milvus v2.5.x weiter zu verwenden.
title: Verwendung von Pulsar v2 mit Milvus v2.5.x
---
<h1 id="Use-Pulsar-v2-with-Milvus-v25x" class="common-anchor-header">Verwendung von Pulsar v2 mit Milvus v2.5.x<button data-href="#Use-Pulsar-v2-with-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus empfiehlt Ihnen, Pulsar auf v3 zu aktualisieren, um Milvus v2.5.x auszuführen. Details finden Sie unter <a href="/docs/de/upgrade-pulsar-v3.md">Upgrade Pulsar</a>. Wenn Sie es jedoch vorziehen, Pulsar v2 mit Milvus v2.5.x zu verwenden, wird dieser Artikel Sie durch das Verfahren zur Ausführung von Milvus v2.5.x mit Pulsar v2 führen.</p>
<p>Wenn Sie bereits eine laufende Milvus-Instanz haben und diese auf v2.5.x aktualisieren möchten, aber weiterhin Pulsar v2 verwenden, können Sie die Schritte auf dieser Seite befolgen.</p>
<h2 id="Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="common-anchor-header">Weiterbenutzung von Pulsar v2 während des Upgrades von Milvus v2.5.x<button data-href="#Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser Abschnitt führt Sie durch die Schritte zur weiteren Verwendung von Pulsar v2 während des Upgrades Ihrer laufenden Milvus-Instanz auf Milvus v2.5.x.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Für Milvus Operator Benutzer</h3><p>Milvus Operator ist standardmäßig mit Pulsar v2-Upgrades kompatibel. Sie können Ihre Milvus-Instanz auf v2.5.x aktualisieren, indem Sie den Abschnitt <a href="/docs/de/upgrade_milvus_cluster-operator.md">Upgrade von Milvus Cluster mit Milvus Operator</a> lesen.</p>
<p>Sobald das Upgrade abgeschlossen ist, können Sie Pulsar v2 mit Ihrer Milvus-Instanz weiter verwenden.</p>
<h3 id="For-Helm-users" class="common-anchor-header">Für Helm-Benutzer</h3><p>Stellen Sie vor dem Upgrade sicher, dass</p>
<ul>
<li><p>Ihre Helm-Version ist höher als v3.12, wobei die neueste Version empfohlen wird.</p>
<p>Weitere Informationen finden Sie unter <a href="https://helm.sh/docs/intro/install/">Installieren von Helm</a>.</p></li>
<li><p>Ihre Kubernetes-Version ist höher als v1.20.</p></li>
</ul>
<p>Die Vorgänge in diesem Artikel setzen voraus, dass:</p>
<ul>
<li><p>Milvus wurde im Namespace <code translate="no">default</code> installiert.</p></li>
<li><p>Der Versionsname von Milvus lautet <code translate="no">my-release</code>.</p></li>
</ul>
<p>Sie müssen die Datei <code translate="no">values.yaml</code> ändern, um die Pulsar-Version als v2 anzugeben, bevor Sie Milvus aktualisieren. Die Schritte sind wie folgt:</p>
<ol>
<li><p>Holen Sie sich die aktuelle <code translate="no">values.yaml</code> Datei Ihrer Milvus-Instanz.</p>
<pre><code translate="no" class="language-bash">namespace=default
release=my-release
helm -n <span class="hljs-variable">${namespace}</span> get values <span class="hljs-variable">${release}</span> -o yaml &gt; values.yaml
<span class="hljs-built_in">cat</span> values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Bearbeiten Sie die Datei <code translate="no">values.yaml</code>, um die Pulsar-Version als v2 anzugeben.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># ... omit existing values</span>
pulsar:
  enabled: <span class="hljs-literal">true</span>
pulsarv3:
  enabled: <span class="hljs-literal">false</span>
image:
  all:
    repository: milvusdb/milvus
    tag: v2.5.0-beta 
<button class="copy-code-btn"></button></code></pre>
<p>Ändern Sie bei <code translate="no">image</code> die <code translate="no">tag</code> in die gewünschte Milvus-Version (z.B. <code translate="no">v2.5.0-beta</code>).</p></li>
<li><p>Aktualisieren Sie das Milvus Helm-Diagramm.</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm</span>
helm repo update milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus-Instanz aktualisieren.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-variable">$namespace</span> upgrade <span class="hljs-variable">$releaase</span> milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Creating-a-new-Milvus-instance-with-Pulsar-v2" class="common-anchor-header">Erstellen einer neuen Milvus-Instanz mit Pulsar v2<button data-href="#Creating-a-new-Milvus-instance-with-Pulsar-v2" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser Abschnitt führt Sie durch die Schritte zur Erstellung einer neuen Milvus-Instanz mit Pulsar v2.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Für Milvus Operator-Benutzer</h3><p>Bevor Sie Milvus v2.5.x einsetzen, müssen Sie die Milvus Customer Resource Definition (CRD) Datei herunterladen und bearbeiten. Einzelheiten zur Installation von Milvus mit Milvus Operator finden Sie unter <a href="/docs/de/install_cluster-milvusoperator.md">Installation von Milvus Cluster mit Milvus Operator</a>.</p>
<ol>
<li><p>Laden Sie die CRD-Datei herunter.</p>
<pre><code translate="no" class="language-bash">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Bearbeiten Sie die Datei <code translate="no">milvus_cluster_default.yaml</code>, um die Pulsar-Version als v2 anzugeben.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion</span>: milvus.<span class="hljs-property">io</span>/v1beta1
<span class="hljs-attr">kind</span>: <span class="hljs-title class_">Milvus</span>
<span class="hljs-attr">metadata</span>:
  <span class="hljs-attr">name</span>: my-release
  <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
  <span class="hljs-attr">labels</span>:
    <span class="hljs-attr">app</span>: milvus
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">mode</span>: cluster
  <span class="hljs-attr">dependencies</span>:
    <span class="hljs-attr">pulsar</span>:
      <span class="hljs-attr">inCluster</span>:
        <span class="hljs-attr">chartVersion</span>: pulsar-v2
<button class="copy-code-btn"></button></code></pre>
<p>Für <code translate="no">dependencies</code> ändern Sie <code translate="no">pulsar.inCluster.chartVersion</code> in <code translate="no">pulsar-v2</code>.</p></li>
<li><p>Fahren Sie mit den Schritten unter <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Milvus Cluster mit Milvus Operator installieren</a> fort, um Milvus v2.5.x mit Pulsar v2 unter Verwendung der bearbeiteten CRD-Datei bereitzustellen.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="For-Helm-users" class="common-anchor-header">Für Helm-Benutzer</h3><p>Bevor Sie Milvus v2.5.x einsetzen, können Sie entweder eine <code translate="no">values.yaml</code> -Datei vorbereiten oder die Inline-Parameter verwenden, um die Pulsar-Version anzugeben. Einzelheiten zur Installation von Milvus mit Helm finden Sie unter <a href="/docs/de/install_cluster-helm.md">Milvus-Cluster mit Helm installieren</a>.</p>
<ul>
<li><p>Verwenden Sie Inline-Parameter, um die Pulsar-Version als v2 anzugeben.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">true</span>,pulsarv3.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verwenden Sie eine <code translate="no">values.yaml</code> Datei, um die Pulsar-Version als v2 zu spezifizieren.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Stellen Sie dann Milvus v2.5.x mit Pulsar v2 unter Verwendung der Datei <code translate="no">values.yaml</code> bereit.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
