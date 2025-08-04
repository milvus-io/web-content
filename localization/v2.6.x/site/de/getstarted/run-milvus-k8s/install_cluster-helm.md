---
id: install_cluster-helm.md
label: Helm
related_key: Kubernetes
summary: 'Erfahren Sie, wie Sie Milvus-Cluster auf Kubernetes installieren.'
title: Milvus-Cluster mit Helm installieren
---
<h1 id="Run-Milvus-in-Kubernetes-with-Helm" class="common-anchor-header">Milvus in Kubernetes mit Helm starten<button data-href="#Run-Milvus-in-Kubernetes-with-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Diese Seite veranschaulicht, wie man eine Milvus-Instanz in Kubernetes mithilfe von <a href="https://github.com/zilliztech/milvus-helm">Milvus Helm-Diagrammen</a> startet.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Helm verwendet ein Paketierungsformat namens Charts. Ein Diagramm ist eine Sammlung von Dateien, die einen zusammenhängenden Satz von Kubernetes-Ressourcen beschreiben. Milvus bietet eine Reihe von Diagrammen, die Sie bei der Bereitstellung von Milvus-Abhängigkeiten und -Komponenten unterstützen.</p>
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
<li><p><a href="https://helm.sh/docs/intro/install/">Installieren Sie Helm CLI</a>.</p></li>
<li><p><a href="/docs/de/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">Erstellen Sie einen K8s-Cluster</a>.</p></li>
<li><p>Installieren Sie eine <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. Sie können die installierte StorageClass wie folgt überprüfen.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Überprüfen Sie vor der Installation <a href="/docs/de/prerequisite-helm.md">die Hardware- und Software-Anforderungen</a>.</p></li>
<li><p>Es wird empfohlen, vor der Installation von Milvus das <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> zu verwenden, um die Hardware-Anforderungen auf der Grundlage Ihrer Datengröße abzuschätzen. Dies hilft, eine optimale Leistung und Ressourcenzuweisung für Ihre Milvus-Installation zu gewährleisten.</p></li>
</ul>
<div class="alert note">
<p>Sollten Sie beim Ziehen des Images auf Probleme stoßen, wenden Sie sich bitte an <a href="mailto:community@zilliz.com">community@zilliz.com</a> und schildern Sie das Problem, damit wir Ihnen die notwendige Unterstützung bieten können.</p>
</div>
<h2 id="Install-Milvus-Helm-Chart" class="common-anchor-header">Milvus Helm Chart installieren<button data-href="#Install-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie Milvus Helm Charts installieren, müssen Sie das Milvus Helm Repository hinzufügen.</p>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Das Milvus Helm Charts-Repository unter <code translate="no">https://github.com/milvus-io/milvus-helm</code> wurde archiviert und Sie können weitere Aktualisierungen wie folgt von <code translate="no">https://github.com/zilliztech/milvus-helm</code> erhalten:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update
<span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>Das archivierte Repository ist weiterhin für die Diagramme bis 4.0.31 verfügbar. Für spätere Versionen verwenden Sie stattdessen das neue Repo.</p>
</div>
<p>Holen Sie sich dann die Milvus-Charts wie folgt aus dem Repository:</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>helm repo update
<button class="copy-code-btn"></button></code></pre>
<p>Sie können diesen Befehl jederzeit ausführen, um die neuesten Milvus Helm-Diagramme abzurufen.</p>
<h2 id="Online-install" class="common-anchor-header">Online-Installation<button data-href="#Online-install" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Bereitstellen eines Milvus-Clusters</h3><p>Sobald Sie das Helm-Diagramm installiert haben, können Sie Milvus auf Kubernetes starten. Dieser Abschnitt führt Sie durch die Schritte zum Starten von Milvus.</p>
<ul>
<li><p>Um eine Milvus-Instanz im Standalone-Modus bereitzustellen, führen Sie den folgenden Befehl aus:</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.0 \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
  <div class="alert note">
<p>Ab Milvus 2.6.x wurden im Standalone-Modus die folgenden Architekturänderungen vorgenommen:</p>
<ul>
<li>Die Standardnachrichtenwarteschlange (MQ) ist <strong>Woodpecker</strong>.</li>
<li>Die Komponente <strong>Streaming Node</strong> wurde eingeführt und ist standardmäßig aktiviert.</li>
</ul>
<p>Einzelheiten finden Sie in der <a href="/docs/de/architecture_overview.md">Architekturübersicht</a>.</p>
  </div>
</li>
<li><p>Um eine Milvus-Instanz im Clustermodus bereitzustellen, führen Sie den folgenden Befehl aus:</p>
<p>Sie können <code translate="no">--set</code> verwenden, um den Milvus-Cluster mit benutzerdefinierten Konfigurationen zu installieren. Der folgende Befehl setzt <code translate="no">streaming.enabled</code> auf <code translate="no">true</code>, um den Streaming-Dienst zu aktivieren, und setzt <code translate="no">indexNode.enabled</code> auf <code translate="no">false</code>, um den Index-Dienst zu deaktivieren. In diesem Fall ist der Streaming-Knoten für alle Datenverarbeitungs- und Indizierungsaufgaben zuständig.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.0 \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
  <div class="alert note">
<p>Ab Milvus 2.6.x wurden die folgenden Architekturänderungen im Clustermodus vorgenommen:</p>
<ul>
<li>Der Standard-MQ ist weiterhin <strong>Pulsar</strong>.</li>
<li>Die Komponente <strong>Streaming Node</strong> wurde eingeführt und ist standardmäßig aktiviert.</li>
<li>Der <strong>Indexknoten</strong> und der <strong>Datenknoten</strong> wurden zu einer einzigen <strong>Datenknotenkomponente</strong> zusammengeführt.</li>
</ul>
<p>Einzelheiten finden Sie in der <a href="/docs/de/architecture_overview.md">Architekturübersicht</a>.</p>
  </div>
</li>
</ul>
<p>Im obigen Befehl steht <code translate="no">my-release</code> für den Versionsnamen und <code translate="no">milvus/milvus</code> für das lokal installierte Diagramm-Repository. Um einen anderen Namen zu verwenden, ersetzen Sie <code translate="no">my-release</code> durch den von Ihnen gewünschten Namen.</p>
<p>Mit den obigen Befehlen wird eine Milvus-Instanz mit ihren Komponenten und Abhängigkeiten unter Verwendung von Standardkonfigurationen bereitgestellt. Um diese Einstellungen anzupassen, empfehlen wir Ihnen, das <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> zu verwenden, um die Konfigurationen basierend auf Ihrer tatsächlichen Datengröße anzupassen und dann die entsprechende YAML-Datei herunterzuladen. Weitere Informationen zu den Konfigurationsparametern finden Sie in der <a href="https://milvus.io/docs/system_configuration.md">Milvus System Configurations Checklist</a>.</p>
<div class="alert note">
  <ul>
    <li>Der Versionsname sollte nur Buchstaben, Zahlen und Bindestriche enthalten. Punkte sind im Versionsnamen nicht erlaubt.</li>
    <li>Die Standard-Befehlszeile installiert die Cluster-Version von Milvus bei der Installation von Milvus mit Helm. Bei der Installation von Milvus als Einzelplatzversion sind weitere Einstellungen erforderlich.</li>
    <li>Gemäß dem <a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">veralteten API-Migrationsleitfaden von Kubernetes</a> wird die API-Version <b>policy/v1beta1</b> von PodDisruptionBudget ab v1.25 nicht mehr unterstützt. Es wird empfohlen, Manifeste und API-Clients zu migrieren, um stattdessen die <b>policy/v1-API-Version</b> zu verwenden. <br/>Als Workaround für Benutzer, die noch die API-Version <b>policy/v1beta1</b> von PodDisruptionBudget auf Kubernetes v1.25 und später verwenden, können Sie stattdessen den folgenden Befehl ausführen, um Milvus zu installieren:<br/> <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
    <li>Siehe <a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a> und <a href="https://helm.sh/docs/">Helm</a> für weitere Informationen.</li>
  </ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Prüfen Sie den Status des Milvus-Clusters</h3><p>Führen Sie den folgenden Befehl aus, um den Status aller Pods in Ihrem Milvus-Cluster zu überprüfen.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>Wenn alle Pods laufen, sollte die Ausgabe des obigen Befehls ähnlich wie die folgende aussehen:</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                                <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-68</span>cb87dcbd<span class="hljs-number">-4</span>khpm      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>indexnode<span class="hljs-number">-5</span>c5f7b5bd9<span class="hljs-operator">-</span>l8hjg     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>mixcoord<span class="hljs-number">-7</span>fb9488465<span class="hljs-operator">-</span>dmbbj      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-6</span>bd7f5587<span class="hljs-operator">-</span>ds2xv          <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-5</span>cd8fff495<span class="hljs-operator">-</span>k6gtg     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-3</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>autorecovery<span class="hljs-number">-86</span>f5dbdf77<span class="hljs-operator">-</span>lchpc  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookkeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookkeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">98</span>s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>broker<span class="hljs-number">-556</span>ff89d4c<span class="hljs-number">-2</span>m29m        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>proxy<span class="hljs-number">-6</span>fbd75db75<span class="hljs-operator">-</span>nhg4v         <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>    <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m23s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-operator">-</span>metadata<span class="hljs-number">-98</span>zbr       <span class="hljs-number">0</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>   Completed  <span class="hljs-number">0</span>        <span class="hljs-number">3</span>m24s
<button class="copy-code-btn"></button></code></pre>
<p>Sie können auch auf die Milvus-WebUI unter <code translate="no">http://127.0.0.1:9091/webui/</code> zugreifen, um mehr über Ihre Milvus-Instanz zu erfahren. Einzelheiten finden Sie unter <a href="/docs/de/milvus-webui.md">Milvus WebUI</a>.</p>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Weiterleitung eines lokalen Ports an Milvus</h3><p>Führen Sie den folgenden Befehl aus, um den Port abzurufen, an dem Ihr Milvus-Cluster arbeitet.</p>
<pre><code translate="no" class="language-bash">$ kubectl get pod my-release-milvus-proxy-6bd7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
19530
<button class="copy-code-btn"></button></code></pre>
<p>Die Ausgabe zeigt, dass die Milvus-Instanz auf dem Standard-Port <strong>19530</strong> arbeitet.</p>
<div class="alert note">
<p>Wenn Sie Milvus im Standalone-Modus eingesetzt haben, ändern Sie den Pod-Namen von <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> in <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>Führen Sie dann den folgenden Befehl aus, um einen lokalen Port an den Port weiterzuleiten, an dem Milvus arbeitet.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus 27017:19530
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Optional können Sie <code translate="no">:19530</code> anstelle von <code translate="no">27017:19530</code> im obigen Befehl verwenden, um <code translate="no">kubectl</code> einen lokalen Port für Sie zuweisen zu lassen, so dass Sie sich nicht um Portkonflikte kümmern müssen.</p>
<p>Standardmäßig lauscht die Port-Weiterleitung von kubectl nur auf <code translate="no">localhost</code>. Verwenden Sie das <code translate="no">address</code> Flag, wenn Sie möchten, dass Milvus die ausgewählten oder alle IP-Adressen abhört. Mit dem folgenden Befehl wird port-forward auf allen IP-Adressen des Host-Rechners abgehört.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Optional) Milvus-Konfigurationen aktualisieren<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können die Konfigurationen Ihres Milvus-Clusters aktualisieren, indem Sie die Datei <code translate="no">values.yaml</code> bearbeiten und sie erneut anwenden.</p>
<ol>
<li>Erstellen Sie eine <code translate="no">values.yaml</code> Datei mit den gewünschten Konfigurationen.</li>
</ol>
<p>Im Folgenden wird davon ausgegangen, dass Sie <code translate="no">proxy.http</code> aktivieren möchten.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    proxy:
      http:
        enabled: true
</span><button class="copy-code-btn"></button></code></pre>
<ol>
<li>Wenden Sie die Datei <code translate="no">values.yaml</code> an.</li>
</ol>
<pre><code translate="no" class="language-shell">helm upgrade my-release milvus/milvus --namespace my-namespace -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<ol>
<li>Überprüfen Sie die aktualisierten Konfigurationen.</li>
</ol>
<pre><code translate="no" class="language-shell">helm get values my-release
<button class="copy-code-btn"></button></code></pre>
<p>Die Ausgabe sollte die aktualisierten Konfigurationen zeigen.</p>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">Zugriff auf Milvus WebUI<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus wird mit einem integrierten GUI-Tool namens Milvus WebUI ausgeliefert, auf das Sie über Ihren Browser zugreifen können. Milvus Web UI verbessert die Beobachtbarkeit des Systems durch eine einfache und intuitive Schnittstelle. Sie können Milvus Web UI verwenden, um die Statistiken und Metriken der Komponenten und Abhängigkeiten von Milvus zu beobachten, Datenbank- und Sammlungsdetails zu überprüfen und detaillierte Milvus-Konfigurationen aufzulisten. Für Details über Milvus Web UI, siehe <a href="/docs/de/milvus-webui.md">Milvus WebUI</a></p>
<p>Um den Zugriff auf die Milvus Web UI zu ermöglichen, müssen Sie den Proxy-Pod auf einen lokalen Port weiterleiten.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
<button class="copy-code-btn"></button></code></pre>
<p>Nun können Sie auf die Milvus Web UI unter <code translate="no">http://localhost:27018</code> zugreifen.</p>
<h2 id="Offline-install" class="common-anchor-header">Offline-Installation<button data-href="#Offline-install" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie sich in einer Umgebung mit Netzwerkbeschränkungen befinden, befolgen Sie das Verfahren in diesem Abschnitt, um einen Milvus-Cluster zu starten.</p>
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1. Milvus-Manifest abrufen</h3><p>Führen Sie den folgenden Befehl aus, um das Milvus-Manifest abzurufen.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm template my-release milvus/milvus &gt; milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Der obige Befehl rendert Diagrammvorlagen für einen Milvus-Cluster und speichert die Ausgabe in einer Manifestdatei namens <code translate="no">milvus_manifest.yaml</code>. Mit diesem Manifest können Sie einen Milvus-Cluster mit seinen Komponenten und Abhängigkeiten in separaten Pods installieren.</p>
<div class="alert note">
<ul>
<li>Um eine Milvus-Instanz im Standalone-Modus zu installieren, bei dem alle Milvus-Komponenten in einem einzigen Pod enthalten sind, sollten Sie stattdessen <code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsarv3.enabled=false milvus/milvus &gt; milvus_manifest.yaml</code> ausführen, um Diagrammvorlagen für eine Milvus-Instanz im Standalone-Modus zu rendern.</li>
<li>Um Milvus-Konfigurationen zu ändern, laden Sie die <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a> Vorlage herunter, fügen Sie die gewünschten Einstellungen hinzu, und verwenden Sie <code translate="no">helm template -f values.yaml my-release milvus/milvus &gt; milvus_manifest.yaml</code>, um das Manifest entsprechend zu rendern.</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2. Download des Image-Pulling-Skripts</h3><p>Das Image-Pulling-Skript ist in Python entwickelt. Sie sollten das Skript zusammen mit seinen Abhängigkeiten in der Datei <code translate="no">requirement.txt</code> herunterladen.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3. Bilder abrufen und speichern</h3><p>Führen Sie den folgenden Befehl aus, um die benötigten Bilder zu laden und zu speichern.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip3 install -r requirements.txt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">python3 save_image.py --manifest milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die Bilder werden in einem Unterordner namens <code translate="no">images</code> im aktuellen Verzeichnis gespeichert.</p>
<h3 id="4-Load-images" class="common-anchor-header">4. Bilder laden</h3><p>Sie können nun die Bilder wie folgt auf die Hosts in der netzbeschränkten Umgebung laden:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5. Milvus bereitstellen</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f milvus_manifest.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Bis zu diesem Zeitpunkt können Sie die Schritte <a href="#2-Check-Milvus-cluster-status">2</a> und <a href="#3-Forward-a-local-port-to-Milvus">3</a> der Online-Installation ausführen, um den Cluster-Status zu überprüfen und einen lokalen Port an Milvus weiterzuleiten.</p>
<h2 id="Upgrade-running-Milvus-cluster" class="common-anchor-header">Upgrade des laufenden Milvus-Clusters<button data-href="#Upgrade-running-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Führen Sie den folgenden Befehl aus, um Ihren laufenden Milvus-Cluster auf die neueste Version zu aktualisieren:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release zilliztech/milvus --reset-then-reuse-values</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Milvus deinstallieren<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Führen Sie den folgenden Befehl aus, um Milvus zu deinstallieren.</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
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
    </button></h2><p>Nachdem Sie Milvus in Docker installiert haben, können Sie:</p>
<ul>
<li><p>Überprüfen Sie <a href="/docs/de/quickstart.md">Hello Milvus</a>, um zu sehen, was Milvus tun kann.</p></li>
<li><p>Lernen Sie die Grundfunktionen von Milvus kennen:</p>
<ul>
<li><a href="/docs/de/manage_databases.md">Verwalten von Datenbanken</a></li>
<li><a href="/docs/de/manage-collections.md">Sammlungen verwalten</a></li>
<li><a href="/docs/de/manage-partitions.md">Partitionen verwalten</a></li>
<li><a href="/docs/de/insert-update-delete.md">Einfügen, Upsert &amp; Löschen</a></li>
<li><a href="/docs/de/single-vector-search.md">Ein-Vektor-Suche</a></li>
<li><a href="/docs/de/multi-vector-search.md">Hybride Suche</a></li>
</ul></li>
<li><p><a href="/docs/de/upgrade_milvus_cluster-helm.md">Upgrade von Milvus mit Helm Chart</a>.</p></li>
<li><p><a href="/docs/de/scaleout.md">Skalieren Sie Ihren Milvus-Cluster</a>.</p></li>
<li><p>Verteilen Sie Ihren Milvus-Cluster auf Clouds:</p>
<ul>
<li><a href="/docs/de/eks.md">Amazon EKS</a></li>
<li><a href="/docs/de/gcp.md">Google Wolke</a></li>
<li><a href="/docs/de/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Entdecken Sie <a href="/docs/de/milvus-webui.md">Milvus WebUI</a>, eine intuitive Webschnittstelle für die Beobachtung und Verwaltung von Milvus.</p></li>
<li><p>Erkunden Sie <a href="/docs/de/milvus_backup_overview.md">Milvus Backup</a>, ein Open-Source-Tool für Milvus-Datensicherungen.</p></li>
<li><p><a href="/docs/de/birdwatcher_overview.md">Birdwatcher</a>, ein Open-Source-Tool zur Fehlersuche in Milvus und zur dynamischen Konfigurationsaktualisierung.</p></li>
<li><p>Entdecken Sie <a href="https://github.com/zilliztech/attu">Attu</a>, ein Open-Source-GUI-Tool für intuitives Milvus-Management.</p></li>
<li><p><a href="/docs/de/monitor.md">Überwachen Sie Milvus mit Prometheus</a>.</p></li>
</ul>
