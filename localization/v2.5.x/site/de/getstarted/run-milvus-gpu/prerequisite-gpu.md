---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: >-
  Lernen Sie die notwendigen Vorbereitungen vor der Installation von Milvus mit
  GPU kennen.
title: Voraussetzungen für die Installation von Milvus mit GPU
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">Voraussetzungen für die Installation von Milvus mit GPU<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite werden die Hardware- und Softwareanforderungen für die Einrichtung von Milvus mit GPU-Unterstützung aufgeführt.</p>
<h2 id="Compute-capability" class="common-anchor-header">Compute-Fähigkeit<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Rechenleistung Ihres GPU-Geräts muss eine der folgenden sein: 6.0, 7.0, 7.5, 8.0, 8.6, 9.0.</p>
<p>Um zu überprüfen, ob Ihr GPU-Gerät die Anforderungen erfüllt, prüfen Sie <a href="https://developer.nvidia.com/cuda-gpus">Ihre GPU-Rechenleistung</a> auf der NVIDIA-Entwickler-Website.</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">NVIDIA-Treiber<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>Der NVIDIA-Treiber für Ihr GPU-Gerät muss auf einer der <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">unterstützten Linux-Distributionen</a> installiert sein, und das NVIDIA Container Toolkit muss mit Hilfe <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">dieser Anleitung</a> installiert worden sein.</p>
<p>Benutzer von Ubuntu 22.04 können den Treiber und das Container-Toolkit mit den folgenden Befehlen installieren:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545
<button class="copy-code-btn"></button></code></pre>
<p>Für Benutzer anderer Betriebssysteme lesen Sie bitte die <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">offizielle Installationsanleitung</a>.</p>
<p>Sie können überprüfen, ob der Treiber korrekt installiert wurde, indem Sie den folgenden Befehl ausführen:</p>
<pre><code translate="no" class="language-shell">$ modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span>
<span class="hljs-attr">version</span>:        <span class="hljs-number">545.29</span><span class="hljs-number">.06</span>
<button class="copy-code-btn"></button></code></pre>
<p>Es wird empfohlen, die Treiber der Version 545 und höher zu verwenden.</p>
<h2 id="Software-requirements" class="common-anchor-header">Software-Anforderungen<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Es wird empfohlen, den Kubernetes-Cluster auf Linux-Plattformen zu betreiben.</p>
<ul>
<li>kubectl ist das Befehlszeilentool für Kubernetes. Verwenden Sie eine kubectl-Version, die innerhalb eines geringfügigen Versionsunterschieds zu Ihrem Cluster liegt. Die Verwendung der neuesten Version von kubectl hilft, unvorhergesehene Probleme zu vermeiden.</li>
<li>minikube ist erforderlich, wenn Sie einen Kubernetes-Cluster lokal betreiben. minikube benötigt Docker als Abhängigkeit. Stellen Sie sicher, dass Sie Docker installieren, bevor Sie Milvus mit Helm installieren. Weitere Informationen finden Sie unter <a href="https://docs.docker.com/get-docker">Get Docker</a>.</li>
</ul>
<table>
<thead>
<tr><th>Das Betriebssystem</th><th>Software</th><th>Hinweis</th></tr>
</thead>
<tbody>
<tr><td>Linux-Plattformen</td><td><ul><li>Kubernetes 1.16 oder höher</li><li>kubectl</li><li>Helm 3.0.0 oder höher</li><li>minikube (für Milvus Standalone)</li><li>Docker 19.03 oder höher (für Milvus Standalone)</li></ul></td><td>Weitere Informationen finden Sie in den <a href="https://helm.sh/docs/">Helm Docs</a>.</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">Häufig gestellte Fragen<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Wie kann ich einen K8s-Cluster zu Testzwecken lokal starten?</h3><p>Sie können Tools wie <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> und <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> verwenden, um schnell einen Kubernetes-Cluster lokal einzurichten. Das folgende Verfahren verwendet minikube als Beispiel.</p>
<ol>
<li>Minikube herunterladen</li>
</ol>
<p>Rufen Sie die Seite <a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a> auf, prüfen Sie, ob Sie die im Abschnitt <strong>What you'll need</strong> aufgelisteten Bedingungen erfüllen, klicken Sie auf die Schaltflächen, die Ihre Zielplattform beschreiben, und kopieren Sie die Befehle zum Herunterladen und Installieren der Binärdatei.</p>
<ol start="2">
<li>Starten eines K8s-Clusters mit minikube</li>
</ol>
<pre><code translate="no" class="language-shell">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Überprüfen des Status des K8s-Clusters</li>
</ol>
<p>Sie können den Status des installierten K8s-Clusters mit dem folgenden Befehl überprüfen.</p>
<pre><code translate="no" class="language-shell">$ kubectl cluster-info
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Stellen Sie sicher, dass Sie über <code translate="no">kubectl</code> auf den K8s-Cluster zugreifen können. Wenn Sie <code translate="no">kubectl</code> nicht lokal installiert haben, siehe <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Verwenden von kubectl innerhalb von minikube</a>.</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">Wie kann ich einen K8s-Cluster mit GPU-Worker-Nodes starten?</h3><p>Wenn Sie GPU-fähige Worker Nodes verwenden möchten, können Sie die folgenden Schritte ausführen, um einen K8s-Cluster mit GPU-Worker Nodes zu erstellen. Wir empfehlen, Milvus auf einem K8s-Cluster mit GPU-Worker-Nodes zu installieren und die standardmäßig bereitgestellte Speicherklasse zu verwenden.</p>
<ol>
<li>GPU-Worker-Nodes vorbereiten</li>
</ol>
<p>Um GPU-fähige Worker-Knoten zu verwenden, befolgen Sie die Schritte in <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">Bereiten Sie Ihre GPU-Knoten</a> vor.</p>
<ol start="2">
<li>Aktivieren der GPU-Unterstützung auf K8s</li>
</ol>
<p>Setzen Sie das <strong>nvidia-device-plugin</strong> mit Helm ein, indem Sie <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">die</a> folgenden Schritte ausführen.</p>
<p>Zeigen Sie nach dem Einrichten die GPU-Ressourcen mit dem folgenden Befehl an. Ersetzen Sie <code translate="no">&lt;gpu-worker-node&gt;</code> durch den tatsächlichen Knotennamen.</p>
<pre><code translate="no" class="language-shell">  $ kubectl describe node &lt;gpu-worker-node&gt;

  Capacity:
  ...
  nvidia.com/gpu:     4
  ...
  Allocatable:
  ...
  nvidia.com/gpu:     4
  ...
  ```  
<button class="copy-code-btn"></button></code></pre>
