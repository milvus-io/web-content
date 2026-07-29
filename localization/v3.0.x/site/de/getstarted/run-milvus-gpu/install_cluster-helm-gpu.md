---
id: install_cluster-helm-gpu.md
label: Cluster (Helm)
related_key: Kubernetes
summary: 'Erfahren Sie, wie Sie einen Milvus-Cluster auf Kubernetes installieren.'
title: Milvus mit GPU-Unterstützung mithilfe eines Helm-Charts ausführen
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="common-anchor-header">Milvus mit GPU-Unterstützung mithilfe eines Helm-Charts ausführen<button data-href="#Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite wird erläutert, wie Sie eine Milvus-Instanz mit GPU-Unterstützung mithilfe eines Helm-Charts starten.</p>
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
    </button></h2><p>Helm verwendet ein Paketformat namens „Charts“. Ein Chart ist eine Sammlung von Dateien, die eine zusammengehörige Gruppe von Kubernetes-Ressourcen beschreiben. Milvus stellt eine Reihe von Charts bereit, die Ihnen bei der Bereitstellung von Milvus-Abhängigkeiten und -Komponenten helfen. <a href="https://artifacthub.io/packages/helm/milvus-helm/milvus">Das Milvus-Helm-Chart</a> ist eine Lösung, die die Milvus-Bereitstellung auf einem Kubernetes-Cluster (K8s) mithilfe des Helm-Paketmanagers initiiert.</p>
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
<li><p><a href="https://helm.sh/docs/intro/install/">Installieren Sie die Helm-CLI</a>.</p></li>
<li><p><a href="/docs/de/prerequisite-gpu.md#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes">Erstellen Sie einen K8s-Cluster mit GPU-Worker-Knoten</a>.</p></li>
<li><p>Installieren Sie eine <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">„StorageClass</a>“. Sie können die installierte „StorageClass“ wie folgt überprüfen.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Überprüfen Sie vor der Installation <a href="/docs/de/prerequisite-gpu.md">die Hardware- und Softwareanforderungen</a>.</p></li>
</ul>
<div class="alert note">
<p>Sollten beim Abrufen des Images Probleme auftreten, kontaktieren Sie uns bitte unter <a href="mailto:community@zilliz.com">community@zilliz.com</a> mit detaillierten Angaben zum Problem, und wir werden Ihnen die erforderliche Unterstützung zukommen lassen.</p>
</div>
<h2 id="Install-Helm-Chart-for-Milvus" class="common-anchor-header">Installieren Sie das Helm-Chart für Milvus<button data-href="#Install-Helm-Chart-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Helm ist ein K8s-Paketmanager, mit dem Sie Milvus schnell bereitstellen können.</p>
<ol>
<li>Fügen Sie das Milvus-Helm-Repository hinzu.</li>
</ol>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Das Milvus-Helm-Charts-Repository unter <code translate="no">https://milvus-io.github.io/milvus-helm/</code> wurde archiviert. Weitere Updates erhalten Sie wie folgt unter <code translate="no">https://zilliztech.github.io/milvus-helm/</code>:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>Das archivierte Repository ist weiterhin für Charts bis zur Version 4.0.31 verfügbar. Für spätere Versionen verwenden Sie stattdessen das neue Repository.</p>
</div>
<ol start="2">
<li>Aktualisieren Sie die Charts lokal.</li>
</ol>
<pre><code translate="no"><span class="hljs-variable">$ </span>helm repo update
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus" class="common-anchor-header">Starten Sie Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie das Helm-Chart installiert haben, können Sie Milvus auf Kubernetes starten. In diesem Abschnitt führen wir Sie durch die Schritte zum Starten von Milvus mit GPU-Unterstützung.</p>
<p>Sie sollten Milvus mit Helm starten, indem Sie den Release-Namen, das Chart und die Parameter angeben, die Sie voraussichtlich ändern werden. In dieser Anleitung verwenden wir „ <code translate="no">my-release</code> “ als Release-Namen. Um einen anderen Release-Namen zu verwenden, ersetzen Sie „ <code translate="no">my-release</code> “ in den folgenden Befehlen durch den von Ihnen verwendeten Namen.</p>
<p>Mit Milvus können Sie Milvus ein oder mehrere GPU-Geräte zuweisen.</p>
<h3 id="1-Assign-a-single-GPU-device" class="common-anchor-header">1. Ein einzelnes GPU-Gerät zuweisen<button data-href="#1-Assign-a-single-GPU-device" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus mit GPU-Unterstützung ermöglicht es Ihnen, ein oder mehrere GPU-Geräte zuzuweisen.</p>
<ul>
<li><p>Milvus-Cluster</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus-Standalone</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
standalone:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Assign-multiple-GPU-devices" class="common-anchor-header">2. Mehrere GPU-Geräte zuweisen<button data-href="#2-Assign-multiple-GPU-devices" class="anchor-icon" translate="no">
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
    </button></h3><p>Zusätzlich zu einem einzelnen GPU-Gerät können Sie Milvus auch mehrere GPU-Geräte zuweisen.</p>
<ul>
<li><p>Milvus-Cluster</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>In der obigen Konfiguration stehen vier CPUs zur Verfügung, und jeder dataNode sowie jeder queryNode nutzt zwei GPUs. Um dem dataNode und dem queryNode unterschiedliche GPUs zuzuweisen, können Sie die Konfiguration entsprechend anpassen, indem Sie „ <code translate="no">extraEnv</code> “ in der Konfigurationsdatei wie folgt festlegen:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;0&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre>
  <div class="alert note">
    <ul>
      <li>Der Release-Name darf nur Buchstaben, Zahlen und Bindestriche enthalten. Punkte sind im Release-Namen nicht zulässig.</li>
      <li>Die Standard-Befehlszeile installiert die Cluster-Version von Milvus bei der Installation von Milvus mit Helm. Bei der Installation von Milvus im Standalone-Modus sind weitere Einstellungen erforderlich.</li>
      <li>Gemäß dem <a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">Leitfaden zur Migration veralteter APIs von Kubernetes</a> wird die API-Version <b>„policy/v1beta1“</b> von PodDisruptionBudget ab Version v1.25 nicht mehr unterstützt. Es wird empfohlen, Manifests und API-Clients so anzupassen, dass stattdessen die API-Version <b>„policy/v1“</b> verwendet wird. <br/>Als Workaround für Nutzer, die auf Kubernetes v1.25 und höher weiterhin die API-Version <b>„policy/v1beta1“</b> von PodDisruptionBudget verwenden, können Sie stattdessen den folgenden Befehl ausführen, um Milvus zu installieren:<br/>
     <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
      <li>Weitere Informationen finden Sie unter <a href="https://artifacthub.io/packages/helm/milvus/milvus">„Milvus Helm Chart</a> “ und <a href="https://helm.sh/docs/">„Helm</a> “.</li>
    </ul>
  </div>
</li>
<li><p>Milvus als Standalone-Lösung</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>In der obigen Konfiguration stehen vier CPUs zur Verfügung, und jeder dataNode sowie jeder queryNode nutzt zwei GPUs. Um dem dataNode und dem queryNode unterschiedliche GPUs zuzuweisen, können Sie die Konfiguration entsprechend anpassen, indem Sie „extraEnv“ in der Konfigurationsdatei wie folgt festlegen:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
dataNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;0&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Check-Milvus-status" class="common-anchor-header">2. Milvus-Status überprüfen<button data-href="#2-Check-Milvus-status" class="anchor-icon" translate="no">
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
    </button></h3><p>Führen Sie den folgenden Befehl aus, um den Status von Milvus zu überprüfen:</p>
<pre><code translate="no" class="language-bash">$ kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>Nachdem Milvus gestartet ist, wird in der Spalte „ <code translate="no">READY</code> “ für alle Pods „ <code translate="no">1/1</code> “ angezeigt.</p>
<ul>
<li><p>Milvus-Cluster</p>
<pre><code translate="no" class="language-shell">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                  1/1     Running     0             3m24s
my-release-etcd-1                                  1/1     Running     0             3m24s
my-release-etcd-2                                  1/1     Running     0             3m24s
my-release-milvus-datanode-698dbf7d77-rjkkq        1/1     Running     0             3m24s
my-release-milvus-mixcoord-856d666559-rpj8z        1/1     Running     0             3m24s
my-release-milvus-proxy-7f7cf47689-pzltw           1/1     Running     0             3m24s
my-release-milvus-querynode-7fb6d5b5f8-92phj       1/1     Running     0             3m24s
my-release-milvus-streamingnode-5867bfbcbf-cg9xx   1/1     Running     0             3m24s
my-release-minio-0                                 1/1     Running     0             3m24s
my-release-minio-1                                 1/1     Running     0             3m24s
my-release-minio-2                                 1/1     Running     0             3m24s
my-release-minio-3                                 1/1     Running     0             3m24s
my-release-pulsarv3-bookie-0                       1/1     Running     0             3m24s
my-release-pulsarv3-bookie-1                       1/1     Running     0             3m24s
my-release-pulsarv3-bookie-2                       1/1     Running     0             3m24s
my-release-pulsarv3-bookie-init-p8hcq              0/1     Completed   0             3m24s
my-release-pulsarv3-broker-0                       1/1     Running     0             3m24s
my-release-pulsarv3-broker-1                       1/1     Running     0             3m24s
my-release-pulsarv3-proxy-0                        1/1     Running     0             3m24s
my-release-pulsarv3-proxy-1                        1/1     Running     0             3m24s
my-release-pulsarv3-pulsar-init-8kjsj              0/1     Completed   0             3m24s
my-release-pulsarv3-recovery-0                     1/1     Running     0             3m24s
my-release-pulsarv3-zookeeper-0                    1/1     Running     0             3m24s
my-release-pulsarv3-zookeeper-1                    1/1     Running     0             3m24s
my-release-pulsarv3-zookeeper-2                    1/1     Running     0             3m24s
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus-Standalone</p>
<pre><code translate="no" class="language-shell">NAME                                               READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                  1/1     Running     0          30s
my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Einen lokalen Port an Milvus weiterleiten<button data-href="#3-Forward-a-local-port-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Überprüfen Sie, auf welchem lokalen Port der Milvus-Server auf Verbindungen wartet. Ersetzen Sie den Pod-Namen durch Ihren eigenen.</p>
<pre><code translate="no" class="language-bash">$ kubectl get pod my-release-milvus-proxy-6bd7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
19530
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie anschließend den folgenden Befehl aus, um einen lokalen Port auf den Port weiterzuleiten, auf dem Milvus läuft.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus 27017:19530
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Optional können Sie im obigen Befehl „ <code translate="no">:19530</code> “ anstelle von „ <code translate="no">27017:19530</code> “ verwenden, damit „ <code translate="no">kubectl</code> “ einen lokalen Port für Sie zuweist und Sie sich nicht um Portkonflikte kümmern müssen.</p>
<p>Standardmäßig lauscht die Portweiterleitung von `kubectl` nur auf <code translate="no">localhost</code>. Verwenden Sie das Flag <code translate="no">address</code>, wenn Milvus auf die ausgewählte oder alle IP-Adressen lauschen soll. Der folgende Befehl bewirkt, dass die Portweiterleitung auf allen IP-Adressen des Host-Rechners lauscht.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
Forwarding from 0.0.0.0:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>Nun können Sie über den weitergeleiteten Port eine Verbindung zu Milvus herstellen.</p>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">Auf die Milvus-WebUI zugreifen<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus wird mit einem integrierten GUI-Tool namens „Milvus WebUI“ ausgeliefert, auf das Sie über Ihren Browser zugreifen können. Die Milvus-Web-UI verbessert die Beobachtbarkeit des Systems durch eine einfache und intuitive Benutzeroberfläche. Mit der Milvus-Web-UI können Sie die Statistiken und Metriken der Komponenten und Abhängigkeiten von Milvus beobachten, Details zu Datenbanken und Sammlungen überprüfen sowie detaillierte Milvus-Konfigurationen auflisten. Weitere Informationen zur Milvus-Web-UI finden Sie unter <a href="/docs/de/milvus-webui.md">Milvus-Web-UI</a></p>
<p>Um den Zugriff auf die Milvus-Web-UI zu ermöglichen, müssen Sie den Proxy-Pod auf einen lokalen Port weiterleiten.</p>
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
    </button></h2><p>Führen Sie den folgenden Befehl aus, um Milvus zu deinstallieren.</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Storage V3 ist standardmäßig deaktiviert. Aktivieren Sie es, bevor Sie Funktionen nutzen, die davon abhängen. Informationen zu Anforderungen und Kompatibilitätsaspekten finden Sie unter <a href="/docs/de/storage-v3.md">„Storage V3</a>“.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Was als Nächstes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie Milvus installiert haben, können Sie:</p>
<ul>
<li><p>Schauen Sie <a href="/docs/de/quickstart.md">im Schnellstart</a> nach, was Milvus alles kann.</p></li>
<li><p>Lernen Sie die grundlegenden Funktionen von Milvus kennen:</p>
<ul>
<li><a href="/docs/de/manage_databases.md">Datenbanken verwalten</a></li>
<li><a href="/docs/de/manage-collections.md">Sammlungen verwalten</a></li>
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
<li><p>Entdecken Sie <a href="/docs/de/birdwatcher_overview.md">Birdwatcher</a>, ein Open-Source-Tool zur Fehlerbehebung in Milvus und für dynamische Konfigurationsaktualisierungen.</p></li>
<li><p>Entdecken Sie <a href="https://github.com/zilliztech/attu">Attu</a>, ein Open-Source-GUI-Tool für die intuitive Verwaltung von Milvus.</p></li>
<li><p><a href="/docs/de/monitor.md">Überwachen Sie Milvus mit Prometheus</a>.</p></li>
</ul>
