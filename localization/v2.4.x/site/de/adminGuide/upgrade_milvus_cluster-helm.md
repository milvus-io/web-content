---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: 'Erfahren Sie, wie Sie Milvus-Cluster mit Helm Chart aktualisieren können.'
title: Milvus-Cluster mit Helm-Diagramm aufrüsten
---
<div class="tab-wrapper"><a href="/docs/de/v2.4.x/upgrade_milvus_cluster-operator.md" class=''>Milvus</a><a href="/docs/de/v2.4.x/upgrade_milvus_cluster-helm.md" class='active '>BedienerHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">Milvus-Cluster mit Helm-Diagramm aufrüsten<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Diese Anleitung beschreibt, wie Sie Ihren Milvus-Cluster mit Milvus Helm-Charts aufrüsten.</p>
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
<li>Helm-Version &gt;= 3.14.0</li>
<li>Kubernetes-Version &gt;= 1.20.0</li>
</ul>
<div class="alert note">
<p>Seit Milvus-Helm Chart Version 4.2.21 haben wir pulsar-v3.x Chart als Abhängigkeit eingeführt. Um die Abwärtskompatibilität zu gewährleisten, aktualisieren Sie bitte Ihren Helm auf v3.14 oder eine neuere Version und fügen Sie die Option <code translate="no">--reset-then-reuse-values</code> hinzu, wenn Sie <code translate="no">helm upgrade</code> verwenden.</p>
</div>
<h2 id="Check-Milvus-Helm-Chart" class="common-anchor-header">Überprüfen der Milvus Helm-Karte<button data-href="#Check-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Führen Sie die folgenden Befehle aus, um neue Milvus-Versionen zu überprüfen.</p>
<pre><code translate="no">$ helm repo update zilliztech
$ helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Das Milvus Helm Charts Repo unter <code translate="no">https://milvus-io.github.io/milvus-helm/</code> wurde archiviert und Sie können weitere Updates von <code translate="no">https://zilliztech.github.io/milvus-helm/</code> wie folgt erhalten:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>Das archivierte Repo ist weiterhin für die Diagramme bis 4.0.31 verfügbar. Für spätere Versionen verwenden Sie stattdessen das neue Repo.</p>
</div>
<pre><code translate="no">NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<p>Sie können den Upgrade-Pfad für Ihren Milvus wie folgt wählen:</p>
<div style="display: none;">- [Führen Sie ein rollendes Upgrade durch](#conduct-a-rolling-upgrade) von Milvus v2.2.3 und späteren Versionen auf v2.4.23.</div>
<ul>
<li><p><a href="#Upgrade-Milvus-using-Helm">Führen Sie ein Upgrade von Milvus mit Helm</a> für ein Upgrade von einer Nebenversion vor v2.2.3 auf v2.4.23 durch.</p></li>
<li><p><a href="#Migrate-the-metadata">Migrieren Sie die Metadaten</a> vor dem Upgrade von Milvus v2.1.x auf v2.4.23.</p></li>
</ul>
<div style="display: none;">
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
<p>Rolling Upgrades erfordern, dass die Koordinatoren im Aktiv-Standby-Modus arbeiten. Sie können <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">das</a> von uns bereitgestellte <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">Skript</a> verwenden, um die Koordinatoren so zu konfigurieren, dass sie im aktiven Standby-Modus arbeiten, und das Rolling Upgrade starten.</p>
<p>Auf der Grundlage der von Kubernetes bereitgestellten rollenden Aktualisierungsfunktionen erzwingt das oben genannte Skript eine geordnete Aktualisierung der Bereitstellungen entsprechend ihrer Abhängigkeiten. Darüber hinaus implementiert Milvus einen Mechanismus, der sicherstellt, dass seine Komponenten während des Upgrades mit den von ihnen abhängigen Komponenten kompatibel bleiben, wodurch potenzielle Service-Ausfallzeiten erheblich reduziert werden.</p>
<p>Das Skript gilt nur für das Upgrade von Milvus, das mit Helm installiert wurde. In der folgenden Tabelle sind die in den Skripten verfügbaren Befehlsflags aufgeführt.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Standardwert</th><th>Erforderlich</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Milvus-Instanzname</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">n</code></td><td>Namespace, in dem Milvus installiert ist</td><td><code translate="no">default</code></td><td>Falsch</td></tr>
<tr><td><code translate="no">t</code></td><td>Ziel-Milvus-Version</td><td><code translate="no">None</code></td><td>Wahr</td></tr>
<tr><td><code translate="no">w</code></td><td>Neues Milvus-Bild-Tag</td><td><code translate="no">milvusdb/milvus:v2.2.3</code></td><td>Wahr</td></tr>
<tr><td><code translate="no">o</code></td><td>Vorgang</td><td><code translate="no">update</code></td><td>Falsch</td></tr>
</tbody>
</table>
<p>Sobald Sie sichergestellt haben, dass sich alle Einsätze in Ihrer Milvus-Instanz in ihrem normalen Status befinden, können Sie den folgenden Befehl ausführen. Sie können den folgenden Befehl ausführen, um die Milvus-Instanz auf 2.4.23 zu aktualisieren.</p>
<pre><code translate="no" class="language-shell">sh rollingUpdate.<span class="hljs-property">sh</span> -n <span class="hljs-keyword">default</span> -i my-release -o update -t <span class="hljs-number">2.4</span><span class="hljs-number">.23</span> -w <span class="hljs-string">&#x27;milvusdb/milvus:v2.4.23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ol>
<li>Das Skript kodiert die Upgrade-Reihenfolge der Einsätze fest und kann nicht geändert werden.</li>
<li>Das Skript verwendet <code translate="no">kubectl patch</code>, um die Einsätze zu aktualisieren, und <code translate="no">kubectl rollout status</code>, um ihren Status zu überwachen.</li>
<li>Das Skript verwendet <code translate="no">kubectl patch</code>, um die Bezeichnung <code translate="no">app.kubernetes.io/version</code> der Einsätze auf die Bezeichnung zu aktualisieren, die hinter dem Flag <code translate="no">-t</code> im Befehl angegeben ist.</li>
</ol>
</div>
</div>
<h2 id="Upgrade-Milvus-using-Helm" class="common-anchor-header">Upgrade von Milvus mit Helm<button data-href="#Upgrade-Milvus-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Um Milvus von einer Nebenversion vor v2.2.3 auf die neueste Version zu aktualisieren, führen Sie die folgenden Befehle aus:</p>
<pre><code translate="no" class="language-shell">helm repo update zilliztech
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values --version=<span class="hljs-number">4.1</span><span class="hljs-number">.24</span> <span class="hljs-comment"># use the helm chart version here</span>
<button class="copy-code-btn"></button></code></pre>
<p>Verwenden Sie die Helm-Diagrammversion im vorangegangenen Befehl. Einzelheiten dazu, wie Sie die Helm-Chart-Version erhalten, finden Sie unter <a href="#Check-the-Milvus-version">Prüfen der Milvus-Version</a>.</p>
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
    </button></h2><p>Seit Milvus 2.2.0 sind die Metadaten nicht mehr mit denen früherer Versionen kompatibel. Die folgenden Beispielausschnitte gehen von einem Upgrade von Milvus 2.1.4 auf Milvus 2.2.0 aus.</p>
<h3 id="1-Check-the-Milvus-version" class="common-anchor-header">1. Prüfen Sie die Milvus-Version</h3><p>Führen Sie <code translate="no">$ helm list</code> aus, um die Version Ihrer Milvus-Anwendung zu überprüfen. Sie können sehen, dass <code translate="no">APP VERSION</code> 2.1.4 ist.</p>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>                <span class="hljs-variable constant_">NAMESPACE</span>   <span class="hljs-variable constant_">REVISION</span>    <span class="hljs-variable constant_">UPDATED</span>                                 <span class="hljs-variable constant_">STATUS</span>      <span class="hljs-variable constant_">CHART</span>           <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>    
<span class="hljs-keyword">new</span>-release         <span class="hljs-keyword">default</span>     <span class="hljs-number">1</span>           <span class="hljs-number">2022</span>-<span class="hljs-number">11</span>-<span class="hljs-number">21</span> <span class="hljs-number">15</span>:<span class="hljs-number">41</span>:<span class="hljs-number">25.51539</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>     deployed    milvus-<span class="hljs-number">3.2</span><span class="hljs-number">.18</span>   <span class="hljs-number">2.1</span><span class="hljs-number">.4</span> 
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-running-pods" class="common-anchor-header">2. Prüfen Sie die laufenden Pods</h3><p>Führen Sie <code translate="no">$ kubectl get pods</code> aus, um die laufenden Pods zu überprüfen. Sie können die folgende Ausgabe sehen.</p>
<pre><code translate="no">NAME                                             READY   STATUS      RESTARTS   AGE
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-etcd<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-etcd<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-datacoord<span class="hljs-number">-664</span>c58798d-fl75s    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-datanode<span class="hljs-number">-5f</span>75686c55-xfg2r     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-indexcoord<span class="hljs-number">-5f</span>98b97589<span class="hljs-number">-2l</span>48r   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-indexnode<span class="hljs-number">-857b</span>4ddf98-vmd75    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp        <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-querycoord-c454f44cd-dwmwq    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-querynode<span class="hljs-number">-76b</span>b4946d-lbrz6     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-rootcoord<span class="hljs-number">-7764</span>c5b686<span class="hljs-number">-62</span>msm    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-0</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-1</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-2</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-3</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-2</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-tjxpj             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span>-c8vvc             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-image-tag" class="common-anchor-header">3. Überprüfen Sie das Image-Tag</h3><p>Überprüfen Sie das Image-Tag für den Pod <code translate="no">my-release-milvus-proxy-6c548f787f-scspp</code>. Sie können sehen, dass die Version Ihres Milvus-Clusters v2.1.4 ist.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<span class="hljs-meta"># milvusdb/milvus:v2.1.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-Migrate-the-metadata" class="common-anchor-header">4. Migrieren Sie die Metadaten</h3><p>Eine wichtige Änderung in Milvus 2.2 ist die Metadatenstruktur der Segmentindizes. Daher müssen Sie Helm verwenden, um die Metadaten beim Upgrade von Milvus von v2.1.x auf v2.2.0 zu migrieren. Hier finden Sie <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">ein Skript</a>, mit dem Sie Ihre Metadaten sicher migrieren können.</p>
<p>Dieses Skript gilt nur für Milvus, das auf einem K8s-Cluster installiert ist. Wenn während des Prozesses ein Fehler auftritt, sollten Sie zunächst mit der Rollback-Operation auf die vorherige Version zurückkehren.</p>
<p>In der folgenden Tabelle sind die Operationen aufgeführt, die Sie für die Metamigration durchführen können.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Standardwert</th><th>Erforderlich</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Der Name der Milvus-Instanz.</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">n</code></td><td>Der Namespace, in dem Milvus installiert ist.</td><td><code translate="no">default</code></td><td>Falsch</td></tr>
<tr><td><code translate="no">s</code></td><td>Die Quellversion von Milvus.</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">t</code></td><td>Die Zielversion von Milvus.</td><td><code translate="no">None</code></td><td>Wahr</td></tr>
<tr><td><code translate="no">r</code></td><td>Der Wurzelpfad von Milvus meta.</td><td><code translate="no">by-dev</code></td><td>False</td></tr>
<tr><td><code translate="no">w</code></td><td>Das neue Milvus-Bild-Tag.</td><td><code translate="no">milvusdb/milvus:v2.2.0</code></td><td>False</td></tr>
<tr><td><code translate="no">m</code></td><td>Das Meta-Migrationsbild-Tag.</td><td><code translate="no">milvusdb/meta-migration:v2.2.0</code></td><td>False</td></tr>
<tr><td><code translate="no">o</code></td><td>Der Meta-Migrationsvorgang.</td><td><code translate="no">migrate</code></td><td>False</td></tr>
<tr><td><code translate="no">d</code></td><td>Ob der Migrations-Pod nach Abschluss der Migration gelöscht werden soll.</td><td><code translate="no">false</code></td><td>False</td></tr>
<tr><td><code translate="no">c</code></td><td>Die Speicherklasse für die Metamigration pvc.</td><td><code translate="no">default storage class</code></td><td>False</td></tr>
<tr><td><code translate="no">e</code></td><td>Der von milvus verwendete etcd enpoint.</td><td><code translate="no">etcd svc installed with milvus</code></td><td>False</td></tr>
</tbody>
</table>
<h4 id="1-Migrate-the-metadata" class="common-anchor-header">1. Migrieren Sie die Metadaten</h4><ol>
<li>Laden Sie das <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">Migrationsskript</a> herunter.</li>
<li>Stoppen Sie die Milvus-Komponenten. Jede Live-Sitzung im Milvus etcd kann einen Migrationsfehler verursachen.</li>
<li>Erstellen Sie ein Backup für die Milvus-Metadaten.</li>
<li>Migrieren Sie die Milvus-Metadaten.</li>
<li>Starten Sie die Milvus-Komponenten mit einem neuen Image.</li>
</ol>
<h4 id="2-Upgrade-Milvus-from-v21x-to-220" class="common-anchor-header">2. Upgrade von Milvus von v2.1.x auf 2.2.0</h4><p>Die folgenden Befehle gehen davon aus, dass Sie Milvus von v2.1.4 auf 2.2.0 aktualisieren. Ändern Sie sie auf die Versionen, die Ihren Anforderungen entsprechen.</p>
<ol>
<li><p>Geben Sie den Namen der Milvus-Instanz, die Quell-Milvus-Version und die Ziel-Milvus-Version an.</p>
<pre><code translate="no">./migrate.sh -i my-release -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Geben Sie den Namespace mit <code translate="no">-n</code> an, wenn Ihr Milvus nicht im Standard-Namespace von K8s installiert ist.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Geben Sie den Wurzelpfad mit <code translate="no">-r</code> an, wenn Ihr Milvus mit dem benutzerdefinierten <code translate="no">rootpath</code> installiert ist.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Geben Sie das Bild-Tag mit <code translate="no">-w</code> an, wenn Ihr Milvus mit einem benutzerdefinierten <code translate="no">image</code> installiert ist.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Legen Sie <code translate="no">-d true</code> fest, wenn Sie den Migrations-Pod automatisch entfernen möchten, nachdem die Migration abgeschlossen ist.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -w milvusdb/milvus:v2.2.0 -d <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Machen Sie einen Rollback und migrieren Sie erneut, wenn die Migration fehlschlägt.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o rollback -w milvusdb/milvus:v2.1.4
./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o migrate -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
