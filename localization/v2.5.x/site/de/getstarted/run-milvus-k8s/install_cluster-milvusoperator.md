---
id: install_cluster-milvusoperator.md
label: Milvus Operator
related_key: Kubernetes
summary: >-
  Erfahren Sie, wie Sie Milvus-Cluster mit Milvus Operator auf Kubernetes
  installieren
title: Milvus Cluster mit Milvus Operator installieren
---
<h1 id="Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="common-anchor-header">Milvus in Kubernetes mit Milvus Operator starten<button data-href="#Run-Milvus-in-Kubernetes-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Diese Seite zeigt, wie man eine Milvus-Instanz in Kubernetes mit <a href="https://github.com/zilliztech/milvus-operator">Milvus Operator</a> startet.</p>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator ist eine Lösung, mit der Sie einen vollständigen Milvus-Service-Stack in Kubernetes (K8s)-Clustern bereitstellen und verwalten können. Der Stack umfasst alle Milvus-Komponenten und relevante Abhängigkeiten wie etcd, Pulsar und MinIO.</p>
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
<li><p>Es wird empfohlen, vor der Installation von Milvus das <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> zu verwenden, um die Hardware-Anforderungen auf der Grundlage Ihrer Datengröße abzuschätzen. Dies hilft, eine optimale Leistung und Ressourcenzuweisung für Ihre Milvus-Installation zu gewährleisten.</p></li>
</ul>
<div class="alert note">
<p>Sollten Sie beim Ziehen des Images auf Probleme stoßen, wenden Sie sich bitte an <a href="mailto:community@zilliz.com">community@zilliz.com</a> und schildern Sie das Problem, damit wir Ihnen die notwendige Unterstützung bieten können.</p>
</div>
<h2 id="Install-Milvus-Operator" class="common-anchor-header">Milvus Operator installieren<button data-href="#Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator definiert die benutzerdefinierten Ressourcen eines Milvus-Clusters zusätzlich zu den <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/">benutzerdefinierten Ressourcen von Kubernetes</a>. Wenn benutzerdefinierte Ressourcen definiert sind, können Sie K8s-APIs auf deklarative Weise verwenden und den Milvus-Bereitstellungsstapel verwalten, um seine Skalierbarkeit und Hochverfügbarkeit zu gewährleisten.</p>
<p>Sie können Milvus Operator auf eine der folgenden Arten installieren:</p>
<ul>
<li><a href="#Install-with-Helm">Mit Helm</a></li>
<li><a href="#Install-with-kubectl">Mit kubectl</a></li>
</ul>
<h3 id="Install-with-Helm" class="common-anchor-header">Installation mit Helm</h3><p>Führen Sie den folgenden Befehl aus, um Milvus Operator mit Helm zu installieren.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install milvus-operator \
  -n milvus-operator --create-namespace \
  --<span class="hljs-built_in">wait</span> --wait-for-jobs \
  https://github.com/zilliztech/milvus-operator/releases/download/v1.2.0/milvus-operator-1.2.0.tgz</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nach Beendigung des Installationsprozesses sehen Sie eine Ausgabe ähnlich der folgenden.</p>
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
<h3 id="Install-with-kubectl" class="common-anchor-header">Installation mit kubectl</h3><p>Führen Sie den folgenden Befehl aus, um Milvus Operator mit <code translate="no">kubectl</code> zu installieren.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/deploy/manifests/deployment.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nach Beendigung des Installationsvorgangs erhalten Sie eine Ausgabe ähnlich der folgenden.</p>
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Einrichten eines Milvus-Clusters</h3><p>Sobald der Milvus Operator-Pod läuft, können Sie einen Milvus-Cluster wie folgt einrichten.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Mit dem obigen Befehl wird ein Milvus-Cluster mit seinen Komponenten und Abhängigkeiten in separaten Pods mit Standardkonfigurationen bereitgestellt. Um diese Einstellungen anzupassen, empfehlen wir Ihnen, das <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> zu verwenden, um die Konfigurationen basierend auf Ihrer tatsächlichen Datengröße anzupassen und dann die entsprechende YAML-Datei herunterzuladen. Weitere Informationen zu den Konfigurationsparametern finden Sie in der <a href="https://milvus.io/docs/system_configuration.md">Checkliste für Milvus-Systemkonfigurationen</a>.</p>
<div class="alert note">
<ul>
<li>Der Release-Name sollte nur Buchstaben, Zahlen und Bindestriche enthalten. Punkte sind im Versionsnamen nicht erlaubt.</li>
<li>Sie können eine Milvus-Instanz auch im Standalone-Modus bereitstellen, bei dem alle Komponenten in einem einzigen Pod enthalten sind. Dazu ändern Sie die URL der Konfigurationsdatei im obigen Befehl in <code translate="no">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_default.yaml</code></li>
</ul>
</div>
<h4 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Überprüfen des Milvus-Cluster-Status</h4><p>Führen Sie den folgenden Befehl aus, um den Status des Milvus-Clusters zu überprüfen</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get milvus my-release -o yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sobald Ihr Milvus-Cluster bereit ist, sollte die Ausgabe des obigen Befehls ähnlich wie die folgende aussehen. Wenn das Feld <code translate="no">status.status</code> <code translate="no">Unhealthy</code> bleibt, ist Ihr Milvus-Cluster noch in der Erstellung.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">status:</span>
  <span class="hljs-attr">conditions:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">StorageReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">StorageReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;2021-11-02T06:06:23Z&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">Pulsar</span> <span class="hljs-string">is</span> <span class="hljs-string">ready</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">PulsarReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">PulsarReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;2021-11-02T05:59:41Z&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">Etcd</span> <span class="hljs-string">endpoints</span> <span class="hljs-string">is</span> <span class="hljs-string">healthy</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">EtcdReady</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">EtcdReady</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">lastTransitionTime:</span> <span class="hljs-string">&quot;2021-11-02T06:12:36Z&quot;</span>
    <span class="hljs-attr">message:</span> <span class="hljs-string">All</span> <span class="hljs-string">Milvus</span> <span class="hljs-string">components</span> <span class="hljs-string">are</span> <span class="hljs-string">healthy</span>
    <span class="hljs-attr">reason:</span> <span class="hljs-string">MilvusClusterHealthy</span>
    <span class="hljs-attr">status:</span> <span class="hljs-string">&quot;True&quot;</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">MilvusReady</span>
  <span class="hljs-attr">endpoint:</span> <span class="hljs-string">my-release-milvus.default:19530</span>
  <span class="hljs-attr">status:</span> <span class="hljs-string">Healthy</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus Operator erstellt Milvus-Abhängigkeiten wie etcd, Pulsar und MinIO und dann Milvus-Komponenten wie Proxy, Coordinators und Nodes.</p>
<p>Sobald Ihr Milvus-Cluster bereit ist, sollte der Status aller Pods im Milvus-Cluster ähnlich wie im Folgenden dargestellt sein.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods</span>

NAME                                            READY   STATUS      RESTARTS   AGE
my-release-etcd-0                               1/1     Running     0          14m
my-release-etcd-1                               1/1     Running     0          14m
my-release-etcd-2                               1/1     Running     0          14m
my-release-milvus-datanode-5c686bd65-wxtmf      1/1     Running     0          6m
my-release-milvus-indexnode-5b9787b54-xclbx     1/1     Running     0          6m
my-release-milvus-proxy-84f67cdb7f-pg6wf        1/1     Running     0          6m
my-release-milvus-querynode-5bcb59f6-nhqqw      1/1     Running     0          6m
my-release-milvus-mixcoord-fdcccfc84-9964g      1/1     Running     0          6m
my-release-minio-0                              1/1     Running     0          14m
my-release-minio-1                              1/1     Running     0          14m
my-release-minio-2                              1/1     Running     0          14m
my-release-minio-3                              1/1     Running     0          14m
my-release-pulsar-bookie-0                      1/1     Running     0          14m
my-release-pulsar-bookie-1                      1/1     Running     0          14m
my-release-pulsar-bookie-init-h6tfz             0/1     Completed   0          14m
my-release-pulsar-broker-0                      1/1     Running     0          14m
my-release-pulsar-broker-1                      1/1     Running     0          14m
my-release-pulsar-proxy-0                       1/1     Running     0          14m
my-release-pulsar-proxy-1                       1/1     Running     0          14m
my-release-pulsar-pulsar-init-d2t56             0/1     Completed   0          14m
my-release-pulsar-recovery-0                    1/1     Running     0          14m
my-release-pulsar-toolset-0                     1/1     Running     0          14m
my-release-pulsar-zookeeper-0                   1/1     Running     0          14m
my-release-pulsar-zookeeper-1                   1/1     Running     0          13m
my-release-pulsar-zookeeper-2                   1/1     Running     0          13m
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Weiterleitung eines lokalen Ports an Milvus</h3><p>Führen Sie den folgenden Befehl aus, um den Port abzufragen, an dem Ihr Milvus-Cluster arbeitet.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pod my-release-milvus-proxy-84f67cdb7f-pg6wf --template</span>
=&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;
19530
<button class="copy-code-btn"></button></code></pre>
<p>Die Ausgabe zeigt, dass die Milvus-Instanz über den Standard-Port <strong>19530</strong> arbeitet.</p>
<div class="alert note">
<p>Wenn Sie Milvus im Standalone-Modus eingesetzt haben, ändern Sie den Pod-Namen von <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> in <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>Führen Sie dann den folgenden Befehl aus, um einen lokalen Port an den Port weiterzuleiten, an dem Milvus arbeitet.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward service/my-release-milvus 27017:19530</span>
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Optional können Sie <code translate="no">:19530</code> anstelle von <code translate="no">27017:19530</code> im obigen Befehl verwenden, um <code translate="no">kubectl</code> einen lokalen Port für Sie zuweisen zu lassen, so dass Sie sich nicht um Portkonflikte kümmern müssen.</p>
<p>Standardmäßig lauscht die Port-Weiterleitung von kubectl nur auf <code translate="no">localhost</code>. Verwenden Sie das <code translate="no">address</code> Flag, wenn Sie möchten, dass Milvus die ausgewählten oder alle IP-Adressen abhört. Der folgende Befehl sorgt dafür, dass port-forward auf allen IP-Adressen des Host-Rechners lauscht.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530</span>
Forwarding from 0.0.0.0:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Nun können Sie sich mit Milvus über den weitergeleiteten Port verbinden.</p>
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
    </button></h2><p>Milvus wird mit einem integrierten GUI-Tool namens Milvus WebUI geliefert, auf das Sie über Ihren Browser zugreifen können. Milvus Web UI verbessert die Beobachtbarkeit des Systems durch eine einfache und intuitive Schnittstelle. Sie können Milvus Web UI verwenden, um die Statistiken und Metriken der Komponenten und Abhängigkeiten von Milvus zu beobachten, Datenbank- und Sammlungsdetails zu überprüfen und detaillierte Milvus-Konfigurationen aufzulisten. Für Details über Milvus Web UI, siehe <a href="/docs/de/milvus-webui.md">Milvus WebUI</a></p>
<p>Um den Zugriff auf die Milvus Web UI zu ermöglichen, müssen Sie den Proxy-Pod auf einen lokalen Port weiterleiten.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
<button class="copy-code-btn"></button></code></pre>
<p>Jetzt können Sie auf Milvus Web UI unter <code translate="no">http://localhost:27018</code> zugreifen.</p>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Deinstallation von Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
<li>Wenn Sie den Milvus-Cluster unter Verwendung der Standardkonfiguration löschen, werden Abhängigkeiten wie etcd, Pulsar und MinIO nicht gelöscht. Wenn Sie also das nächste Mal dieselbe Milvus-Cluster-Instanz installieren, werden diese Abhängigkeiten wieder verwendet.</li>
<li>Um die Abhängigkeiten und persistenten Volumenansprüche (PVCs) zusammen mit dem Milvus-Cluster zu löschen, siehe <a href="https://github.com/zilliztech/milvus-operator/blob/main/config/samples/milvus_deletion.yaml">Konfigurationsdatei</a>.</li>
</ul>
</div>
<h2 id="Uninstall-Milvus-Operator" class="common-anchor-header">Deinstallation von Milvus Operator<button data-href="#Uninstall-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Es gibt auch zwei Möglichkeiten, Milvus Operator zu deinstallieren.</p>
<ul>
<li><a href="#Uninstall-with-Helm">Deinstallation mit Helm</a></li>
<li><a href="#Uninstall-with-kubectl">Deinstallation mit kubectl</a></li>
</ul>
<h4 id="Uninstall-with-Helm" class="common-anchor-header">Deinstallation mit Helm</h4><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm -n milvus-operator uninstall milvus-operator</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Uninstall-with-kubectl" class="common-anchor-header">Deinstallation mit kubectl</h4><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl delete -f https://raw.githubusercontent.com/zilliztech/milvus-operator/v1.2.0/deploy/manifests/deployment.yaml</span>
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
<li><p>Lernen Sie die grundlegenden Operationen von Milvus:</p>
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
