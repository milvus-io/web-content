---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
summary: >-
  Erfahren Sie, wie Sie einen Milvus-Cluster mithilfe des Milvus Operators auf
  Kubernetes installieren
title: Milvus-Cluster mit Milvus Operator installieren
---
<h1 id="Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="common-anchor-header">Milvus in Kubernetes mit dem Milvus Operator ausführen<button data-href="#Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite wird erläutert, wie Sie eine Milvus-Instanz in Kubernetes mithilfe <a href="https://github.com/zilliztech/milvus-operator">des Milvus Operators</a> starten.</p>
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
    </button></h2><p>Der Milvus Operator ist eine Lösung, die Ihnen dabei hilft, einen vollständigen Milvus-Service-Stack für Kubernetes-Cluster (K8s) bereitzustellen und zu verwalten. Der Stack umfasst alle Milvus-Komponenten sowie relevante Abhängigkeiten wie etcd, Pulsar und MinIO.</p>
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
<li><p><a href="/docs/de/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">Erstellen Sie einen K8s-Cluster</a>.</p></li>
<li><p>Installieren Sie eine <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. Sie können die installierte StorageClass wie folgt überprüfen.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Überprüfen Sie vor der Installation <a href="/docs/de/prerequisite-helm.md">die Hardware- und Softwareanforderungen</a>.</p></li>
<li><p>Vor der Installation von Milvus wird empfohlen, das <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> zu verwenden, um die Hardwareanforderungen auf der Grundlage Ihrer Datenmenge abzuschätzen. Dies trägt dazu bei, eine optimale Leistung und Ressourcenzuweisung für Ihre Milvus-Installation sicherzustellen.</p></li>
</ul>
<div class="alert note">
<p>Sollten beim Abrufen des Images Probleme auftreten, kontaktieren Sie uns bitte unter <a href="mailto:community@zilliz.com">community@zilliz.com</a> mit Details zum Problem, und wir werden Ihnen die erforderliche Unterstützung zukommen lassen.</p>
</div>
<h2 id="Install-Milvus-Operator" class="common-anchor-header">Installieren Sie den Milvus Operator<button data-href="#Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Milvus Operator definiert benutzerdefinierte Ressourcen für einen Milvus-Cluster auf Basis der <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/">Kubernetes Custom Resources</a>. Wenn benutzerdefinierte Ressourcen definiert sind, können Sie die K8s-APIs deklarativ nutzen und den Milvus-Deployment-Stack verwalten, um dessen Skalierbarkeit und Hochverfügbarkeit sicherzustellen.</p>
<div class="filter">
 <a href="#helm">Helm</a>
 <a href="#kubectl"> Kubectl</a>
</div>
<div class="filter-helm">
<p>Führen Sie den folgenden Befehl aus, um den Milvus Operator mit Helm zu installieren.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --<span class="hljs-built_in">wait</span> --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.3.0/milvus-operator-1.3.0.tgz</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nach Abschluss des Installationsvorgangs wird eine Ausgabe angezeigt, die in etwa wie folgt aussieht.</p>
<pre><code translate="no" class="language-shell">NAME: milvus-operator
LAST DEPLOYED: Thu Jul  7 13:18:40 2022
NAMESPACE: milvus-operator
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Milvus Operator Is Starting, use `kubectl get -n milvus-operator deploy/milvus-operator` to check if its successfully installed
If Operator not started successfully, check the checker&#x27;s log with `kubectl -n milvus-operator logs job/milvus-operator-checker`
Full Installation doc can be found in https://github.com/zilliztech/milvus-operator/blob/main/docs/installation/installation.md
Quick start with `kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_minimum.yaml`
More samples can be found in https://github.com/zilliztech/milvus-operator/tree/main/config/samples
CRD Documentation can be found in https://github.com/zilliztech/milvus-operator/tree/main/docs/CRD
<button class="copy-code-btn"></button></code></pre>
<p>Falls Sie den Milvus Operator bereits installiert haben, führen Sie mit dem folgenden Befehl ein Upgrade durch:</p>
<pre><code translate="no" class="language-shell">helm upgrade milvus-operator \
  -n milvus-operator --create-namespace \
  --wait --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.3.0/milvus-operator-1.3.0.tgz
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-kubectl">
<p>Führen Sie den folgenden Befehl aus, um den Milvus Operator mit „ <code translate="no">kubectl</code> “ zu installieren.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nach Abschluss des Installationsvorgangs wird eine Ausgabe angezeigt, die in etwa wie folgt aussieht.</p>
<pre><code translate="no" class="language-shell">namespace/milvus-operator created
customresourcedefinition.apiextensions.k8s.io/milvusclusters.milvus.io created
serviceaccount/milvus-operator-controller-manager created
role.rbac.authorization.k8s.io/milvus-operator-leader-election-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-manager-role created
clusterrole.rbac.authorization.k8s.io/milvus-operator-metrics-reader created
clusterrole.rbac.authorization.k8s.io/milvus-operator-proxy-role created
rolebinding.rbac.authorization.k8s.io/milvus-operator-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-manager-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/milvus-operator-proxy-rolebinding created
configmap/milvus-operator-manager-config created
service/milvus-operator-controller-manager-metrics-service created
service/milvus-operator-webhook-service created
deployment.apps/milvus-operator-controller-manager created
<button class="copy-code-btn"></button></code></pre>
<p>Sie können wie folgt überprüfen, ob der Milvus Operator-Pod läuft:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods -n milvus-operator</span>

NAME                               READY   STATUS    RESTARTS   AGE
milvus-operator-5fd77b87dc-msrk4   1/1     Running   0          46s
<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Deploy-Milvus" class="common-anchor-header">Milvus bereitstellen<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Einen Milvus-Cluster bereitstellen<button data-href="#1-Deploy-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h3><p>Sobald der Milvus-Operator-Pod läuft, können Sie wie folgt einen Milvus-Cluster bereitstellen.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Der obige Befehl stellt einen Milvus-Cluster bereit, der <strong>Woodpecker</strong> als Nachrichtenwarteschlange verwendet (empfohlen für v3.0-beta) und alle neuen Architekturkomponenten einschließlich des Streaming-Knotens enthält.</p>
<p><strong>Architektur-Highlights dieser Bereitstellung:</strong></p>
<ul>
<li><strong>Nachrichtenwarteschlange</strong>: <a href="/docs/de/use-woodpecker.md">Verwendet Woodpecker</a> (reduziert den Wartungsaufwand für die Infrastruktur)</li>
<li><strong>Streaming-Knoten</strong>: Aktiviert für eine verbesserte Datenverarbeitung</li>
<li><strong>Mix-Koordinator</strong>: Konsolidierte Koordinatorkomponenten für verbesserte Effizienz</li>
</ul>
<p>Um diese Einstellungen anzupassen, empfehlen wir Ihnen, das <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> zu verwenden, um die Konfigurationen basierend auf Ihrer tatsächlichen Datenmenge anzupassen und anschließend die entsprechende YAML-Datei herunterzuladen. Weitere Informationen zu den Konfigurationsparametern finden Sie in <a href="https://milvus.io/docs/system_configuration.md">der Milvus-Checkliste für Systemkonfigurationen</a>.</p>
<div class="alert note">
<ul>
<li>Der Release-Name darf nur Buchstaben, Zahlen und Bindestriche enthalten. Punkte sind im Release-Namen nicht zulässig.</li>
<li>Sie können eine Milvus-Instanz auch im Standalone-Modus bereitstellen, bei dem alle Komponenten in einem einzigen Pod enthalten sind. Ändern Sie dazu die URL der Konfigurationsdatei im obigen Befehl wie folgt: <code translate="no">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_default.yaml</code></li>
</ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Überprüfen Sie den Status des Milvus-Clusters<button data-href="#2-Check-Milvus-cluster-status" class="anchor-icon" translate="no">
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
    </button></h3><p>Führen Sie den folgenden Befehl aus, um den Status des Milvus-Clusters zu überprüfen</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get milvus my-release -o yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sobald Ihr Milvus-Cluster bereit ist, sollte die Ausgabe des obigen Befehls in etwa wie folgt aussehen. Wenn das Feld „ <code translate="no">status.status</code> “ weiterhin den Wert „ <code translate="no">Unhealthy</code> “ anzeigt, befindet sich Ihr Milvus-Cluster noch im Aufbau.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">status:</span>
  <span class="hljs-attr">conditions:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">StorageReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">StorageReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">Pulsar</span> <span class="hljs-string">is</span> <span class="hljs-string">ready</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">PulsarReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">PulsarReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">Etcd</span> <span class="hljs-string">endpoints</span> <span class="hljs-string">is</span> <span class="hljs-string">healthy</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">EtcdReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">EtcdReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;xxxx-xx-xxTxx:xx:xxZ&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">All</span> <span class="hljs-string">Milvus</span> <span class="hljs-string">components</span> <span class="hljs-string">are</span> <span class="hljs-string">healthy</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">MilvusClusterHealthy</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">MilvusReady</span>
  <span class="hljs-attr">endpoint:</span> <span class="hljs-string">my-release-milvus.default:19530</span>
  <span class="hljs-attr">status:</span> <span class="hljs-string">Healthy</span>
<button class="copy-code-btn"></button></code></pre>
<p>Der Milvus-Operator erstellt zunächst die Milvus-Abhängigkeiten wie etcd, Pulsar und MinIO und anschließend die Milvus-Komponenten wie Proxy, Koordinatoren und Knoten.</p>
<p>Sobald Ihr Milvus-Cluster bereit ist, sollte der Status aller Pods im Milvus-Cluster in etwa wie folgt aussehen.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods</span>

NAME                                             READY   STATUS    RESTARTS   AGE
my-release-etcd-0                                1/1     Running   0          2m36s
my-release-etcd-1                                1/1     Running   0          2m36s
my-release-etcd-2                                1/1     Running   0          2m36s
my-release-milvus-datanode-58955c65b9-j4j7s      1/1     Running   0          92s
my-release-milvus-mixcoord-686f84968f-jcv5d      1/1     Running   0          92s
my-release-milvus-proxy-646f48fc7c-4lctb         1/1     Running   0          92s
my-release-milvus-querynode-0-d89d7677b-x7j7q    1/1     Running   0          91s
my-release-milvus-streamingnode-556bdcc87c-2qwcc 1/1     Running   0          92s
my-release-minio-0                               1/1     Running   0          2m36s
my-release-minio-1                               1/1     Running   0          2m36s
my-release-minio-2                               1/1     Running   0          2m35s
my-release-minio-3                               1/1     Running   0          2m35s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Leiten Sie einen lokalen Port an Milvus weiter<button data-href="#3-Forward-a-local-port-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Führen Sie den folgenden Befehl aus, um den Port zu ermitteln, unter dem Ihr Milvus-Cluster erreichbar ist.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pod my-release-milvus-proxy-84f67cdb7f-pg6wf --template</span>
=&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;
19530
<button class="copy-code-btn"></button></code></pre>
<p>Die Ausgabe zeigt, dass die Milvus-Instanz auf dem Standardport <strong>19530</strong> erreichbar ist.</p>
<div class="alert note">
<p>Wenn Sie Milvus im Standalone-Modus bereitgestellt haben, ändern Sie den Pod-Namen von „ <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> “ in „ <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code> “.</p>
</div>
<p>Führen Sie anschließend den folgenden Befehl aus, um einen lokalen Port auf den Port weiterzuleiten, unter dem Milvus erreichbar ist.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward service/my-release-milvus 27017:19530</span>
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Optional können Sie im obigen Befehl „ <code translate="no">:19530</code> “ anstelle von „ <code translate="no">27017:19530</code> “ verwenden, damit „ <code translate="no">kubectl</code> “ einen lokalen Port für Sie zuweist und Sie sich nicht um Portkonflikte kümmern müssen.</p>
<p>Standardmäßig lauscht die Portweiterleitung von `kubectl` nur auf <code translate="no">localhost</code>. Verwenden Sie das Flag <code translate="no">address</code>, wenn Milvus auf die ausgewählte oder alle IP-Adressen lauschen soll. Der folgende Befehl sorgt dafür, dass die Portweiterleitung auf allen IP-Adressen des Host-Rechners lauscht.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530</span>
Forwarding from 0.0.0.0:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Nun können Sie über den weitergeleiteten Port eine Verbindung zu Milvus herstellen.</p>
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
    </button></h2><p>Sie können die Konfigurationen Ihres Milvus-Clusters anzeigen und aktualisieren, indem Sie den Befehl ` <code translate="no">patch</code> ` wie folgt aufrufen:</p>
<ol>
<li><p>Führen Sie den folgenden Befehl aus, um eine Vorschau der geplanten Konfigurationen anzuzeigen.</p>
<p>Im Folgenden wird davon ausgegangen, dass Sie den Parameter „ <code translate="no">spec.components.disableMetric</code> “ auf „ <code translate="no">false</code> “ ms aktualisieren möchten.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl patch milvus my-release --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;merge&#x27;</span>\
  -p <span class="hljs-string">&#x27;{&quot;spec&quot;:{&quot;components&quot;:{&quot;disableMetric&quot;:false}}}&#x27;</span> \
  --dry-run=client -o yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Informationen zu den entsprechenden Konfigurationselementen finden Sie unter <a href="/docs/de/system_configuration.md">„Systemkonfiguration</a>“.</p></li>
<li><p>Aktualisieren Sie die Konfigurationen.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl patch milvus my-release --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;merge&#x27;</span>\
  -p <span class="hljs-string">&#x27;{&quot;spec&quot;:{&quot;components&quot;:{&quot;disableMetric&quot;:false}}}&#x27;</span></span> 
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">Auf Milvus WebUI zugreifen<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus wird mit einem integrierten GUI-Tool namens „Milvus WebUI“ ausgeliefert, auf das Sie über Ihren Browser zugreifen können. Die Milvus WebUI verbessert die Systemüberwachbarkeit durch eine einfache und intuitive Benutzeroberfläche. Mit der Milvus WebUI können Sie die Statistiken und Metriken der Komponenten und Abhängigkeiten von Milvus überwachen, Datenbank- und Erfassungsdetails überprüfen sowie detaillierte Milvus-Konfigurationen auflisten. Weitere Informationen zur Milvus-Web-UI finden Sie unter <a href="/docs/de/milvus-webui.md">„Milvus-Web-UI“</a></p>
<p>Um den Zugriff auf die Milvus-Web-UI zu ermöglichen, müssen Sie eine Portweiterleitung vom Proxy-Pod zu einem lokalen Port einrichten.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
<button class="copy-code-btn"></button></code></pre>
<p>Nun können Sie über <code translate="no">http://localhost:27018</code> auf die Milvus-Web-UI zugreifen.</p>
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
    </button></h2><p>Führen Sie den folgenden Befehl aus, um den Milvus-Cluster zu deinstallieren.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl delete milvus my-release</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Wenn Sie den Milvus-Cluster mit der Standardkonfiguration löschen, werden Abhängigkeiten wie etcd, Pulsar und MinIO nicht gelöscht. Daher werden diese Abhängigkeiten bei der nächsten Installation derselben Milvus-Cluster-Instanz erneut verwendet.</li>
<li>Informationen zum Löschen der Abhängigkeiten und der Persistent Volume Claims (PVCs) zusammen mit dem Milvus-Cluster finden Sie in <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/samples/milvus_deletion.yaml">der Konfigurationsdatei</a>.</li>
</ul>
</div>
<h2 id="Uninstall-Milvus-Operator" class="common-anchor-header">Milvus Operator deinstallieren<button data-href="#Uninstall-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Es gibt zwei Möglichkeiten, den Milvus Operator zu deinstallieren.</p>
<ul>
<li><a href="#Uninstall-with-Helm">Deinstallation mit Helm</a></li>
<li><a href="#Uninstall-with-kubectl">Deinstallation mit kubectl</a></li>
</ul>
<h4 id="Uninstall-with-Helm" class="common-anchor-header">Deinstallation mit Helm</h4><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm -n milvus-operator uninstall milvus-operator</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Uninstall-with-kubectl" class="common-anchor-header">Deinstallation mit kubectl</h4><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl delete -f https://raw.githubusercontent.com/zilliztech/milvus-operator/v1.3.0/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Was nun?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Schauen Sie sich <a href="/docs/de/quickstart.md">„Hello Milvus“</a> an, um zu sehen, was Milvus leisten kann.</p></li>
<li><p>Lernen Sie die grundlegenden Funktionen von Milvus kennen:</p>
<ul>
<li><a href="/docs/de/manage_databases.md">Datenbanken verwalten</a></li>
<li><a href="/docs/de/manage-collections.md">Verwalten von Sammlungen</a></li>
<li><a href="/docs/de/manage-partitions.md">Partitionen verwalten</a></li>
<li><a href="/docs/de/insert-update-delete.md">Einfügen, Upsert und Löschen</a></li>
<li><a href="/docs/de/single-vector-search.md">Einzelvektor-Suche</a></li>
<li><a href="/docs/de/multi-vector-search.md">Hybride Suche</a></li>
</ul></li>
<li><p><a href="/docs/de/upgrade_milvus_cluster-helm.md">Milvus mit Helm-Chart aktualisieren</a>.</p></li>
<li><p><a href="/docs/de/scaleout.md">Skalieren Sie Ihren Milvus-Cluster</a>.</p></li>
<li><p>Stellen Sie Ihren Milvus-Cluster in folgenden Clouds bereit:</p>
<ul>
<li><a href="/docs/de/eks.md">Amazon EKS</a></li>
<li><a href="/docs/de/gcp.md">Google Cloud</a></li>
<li><a href="/docs/de/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Entdecken Sie <a href="/docs/de/milvus-webui.md">Milvus WebUI</a>, eine intuitive Weboberfläche für die Überwachung und Verwaltung von Milvus.</p></li>
<li><p>Entdecken Sie <a href="/docs/de/milvus_backup_overview.md">Milvus Backup</a>, ein Open-Source-Tool für Milvus-Datensicherungen.</p></li>
<li><p>Entdecken Sie <a href="/docs/de/birdwatcher_overview.md">Birdwatcher</a>, ein Open-Source-Tool zur Fehlerbehebung bei Milvus und zur dynamischen Konfigurationsaktualisierung.</p></li>
<li><p>Entdecken Sie <a href="https://github.com/zilliztech/attu">Attu</a>, ein Open-Source-GUI-Tool für die intuitive Verwaltung von Milvus.</p></li>
<li><p><a href="/docs/de/monitor.md">Überwachen Sie Milvus mit Prometheus</a>.</p></li>
</ul>
