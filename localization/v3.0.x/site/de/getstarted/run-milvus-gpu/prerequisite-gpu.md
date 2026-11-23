---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: >-
  Erfahren Sie, welche Vorbereitungen vor der Installation von Milvus mit GPU
  erforderlich sind.
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
    </button></h1><p>Auf dieser Seite sind die Hardware- und Softwareanforderungen für die Einrichtung von Milvus mit GPU-Unterstützung aufgeführt.</p>
<h2 id="Compute-capability" class="common-anchor-header">Rechenleistung<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Milvus-GPU-Image <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> wurde für GPU-Geräte mit den Rechenkapazitäten 7.0, 7.5, 8.0, 8.6, 9.0, 10.0 oder 12.0 erstellt. Ihr GPU-Gerät muss über eine dieser Rechenkapazitäten verfügen oder eine neuere Rechenkapazität aufweisen, die Code ausführen kann, der für eine dieser Kapazitäten erstellt wurde, z. B. 8.9 oder 12.1. Weitere Informationen finden Sie unter <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility">„Binärkompatibilität</a> und <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features">familienspezifische Funktionen</a>“.</p>
<p>Um zu überprüfen, ob Ihr GPU-Gerät die Anforderungen erfüllt, lesen Sie den Abschnitt <a href="https://developer.nvidia.com/cuda-gpus">„Rechenleistung Ihrer GPU</a> “ auf der NVIDIA-Entwickler-Website.</p>
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
    </button></h2><p>Auf Ihrem Host muss eine der <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">vom NVIDIA Container Toolkit unterstützten Linux-Distributionen</a> laufen und der NVIDIA-Treiber für Ihr GPU-Gerät installiert sein.</p>
<p>Das Milvus-GPU-Image „ <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> “ basiert auf CUDA 12.9 Update 1. Die Einstellung „ <code translate="no">NVIDIA_REQUIRE_CUDA</code> “ erfordert „ <code translate="no">cuda&gt;=12.9</code> “, daher muss der NVIDIA-Treiber CUDA 12.9 oder höher unterstützen. Für CUDA 12.9 Update 1 listet NVIDIA unter Linux x86_64 die Treiberversion 575.57.08 oder höher auf. Die Treiberversionen der einzelnen CUDA-Versionen finden Sie in den <a href="https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver">Versionshinweisen zum CUDA Toolkit</a>.</p>
<p>Die gleiche Einstellung akzeptiert bei einigen GPU-Marken auch Treiber aus den Zweigen 535, 550, 560, 565 und 570, jedoch nicht bei GeForce- oder Titan-GPUs. Bei diesen Treibern ist das Image auf <a href="https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html">die Vorwärtskompatibilität von CUDA</a> angewiesen, die NVIDIA nur auf NVIDIA Data Center-GPUs, ausgewählten NGC Server Ready-SKUs von RTX-Karten und Jetson-Boards unterstützt. Wenn der Treiber diese Anforderungen nicht erfüllt, meldet das NVIDIA Container Toolkit den Fehler „ <code translate="no">unsatisfied condition</code> “ und richtet die GPU nicht für den Container ein.</p>
<p>Benutzer von Ubuntu 22.04 können den Treiber mit dem folgenden Befehl installieren:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580</span>
<button class="copy-code-btn"></button></code></pre>
<p>GPUs mit der Rechenkapazität 10.0 oder 12.0 (Blackwell) werden ausschließlich von den Open-Kernel-Modulen des NVIDIA-Treibers unterstützt. Installieren Sie für diese GPUs „ <code translate="no">nvidia-headless-580-open</code> “ anstelle von „ <code translate="no">nvidia-headless-580</code> “. Die offenen Kernel-Module unterstützen keine GPUs, die älter sind als Turing (Compute-Capability 7.5), wie beispielsweise Volta (7.0); verwenden Sie für diese daher weiterhin „ <code translate="no">nvidia-headless-580</code> “.</p>
<p>Für andere Linux-Distributionen lesen Sie bitte das <a href="https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html">NVIDIA-Treiber-Installationshandbuch</a>.</p>
<p>Sie können überprüfen, ob der Treiber korrekt installiert wurde, indem Sie den folgenden Befehl ausführen. Die Ausgabe zeigt die Version des installierten Treibers an.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="NVIDIA-Container-Toolkit" class="common-anchor-header">NVIDIA Container Toolkit<button data-href="#NVIDIA-Container-Toolkit" class="anchor-icon" translate="no">
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
    </button></h2><p>Installieren Sie das NVIDIA Container Toolkit, indem Sie die für Ihre Linux-Distribution geltenden Schritte im <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">Installationshandbuch für das NVIDIA Container Toolkit</a> befolgen.</p>
<p>Wenn Sie Milvus mit Docker Compose installieren, konfigurieren Sie Docker so, dass die NVIDIA Container Runtime verwendet wird, starten Sie den Docker-Daemon neu und führen Sie anschließend eine Beispiel-Workload aus, um zu überprüfen, ob Container auf die GPU zugreifen können:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> nvidia-ctk runtime configure --runtime=docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker run --<span class="hljs-built_in">rm</span> --runtime=nvidia --gpus all ubuntu nvidia-smi</span>
<button class="copy-code-btn"></button></code></pre>
<p>Der letzte Befehl führt „ <code translate="no">nvidia-smi</code> “ in einem Container aus und gibt Informationen zu den GPU-Geräten auf dem Host aus. Wenn Sie Milvus auf Kubernetes installieren, bereiten Sie Ihre GPU-Worker-Knoten stattdessen wie in den FAQs am Ende dieser Seite beschrieben vor.</p>
<h2 id="Software-requirements" class="common-anchor-header">Softwareanforderungen<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Anforderungen in diesem Abschnitt und in den unten stehenden FAQs gelten, wenn Sie Milvus mit GPU-Unterstützung auf Kubernetes mithilfe von Helm installieren.</p>
<p>Es wird empfohlen, den Kubernetes-Cluster auf Linux-Plattformen auszuführen.</p>
<ul>
<li>`kubectl` ist das Befehlszeilentool für Kubernetes. Verwenden Sie eine `kubectl`-Version, die sich nur um eine Nebenversion von der Ihres Clusters unterscheidet. Die Verwendung der neuesten Version von `kubectl` hilft, unvorhergesehene Probleme zu vermeiden.</li>
<li>minikube ist erforderlich, wenn Sie einen Kubernetes-Cluster lokal ausführen. minikube benötigt Docker als Abhängigkeit. Stellen Sie sicher, dass Sie Docker installieren, bevor Sie Milvus mit Helm installieren. Weitere Informationen finden Sie unter <a href="https://docs.docker.com/get-docker">„Docker herunterladen</a> “.</li>
</ul>
<table>
<thead>
<tr><th>Betriebssystem</th><th>Software</th><th>Hinweis</th></tr>
</thead>
<tbody>
<tr><td>Linux-Plattformen</td><td><ul><li>Kubernetes 1.16 oder höher</li><li>kubectl</li><li>Helm 3.0.0 oder höher</li><li>minikube (für Milvus Standalone)</li><li>Docker 19.03 oder höher (für Milvus Standalone)</li></ul></td><td>Weitere Informationen finden Sie in <a href="https://helm.sh/docs/">der Helm-Dokumentation</a>.</td></tr>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Wie kann ich lokal einen K8s-Cluster zu Testzwecken starten?<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>Sie können Tools wie <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> und <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> verwenden, um schnell einen Kubernetes-Cluster lokal einzurichten. Im folgenden Verfahren wird minikube als Beispiel verwendet.</p>
<ol>
<li>Laden Sie minikube herunter</li>
</ol>
<p>Rufen Sie die Seite <a href="https://minikube.sigs.k8s.io/docs/start/">„Erste Schritte“</a> auf, prüfen Sie, ob Sie die im Abschnitt <strong>„Was Sie benötigen“</strong> aufgeführten Voraussetzungen erfüllen, klicken Sie auf die Schaltflächen für Ihre Zielplattform und kopieren Sie die Befehle zum Herunterladen und Installieren der Binärdatei.</p>
<ol start="2">
<li>Starten Sie einen K8s-Cluster mit minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Überprüfen Sie den Status des K8s-Clusters</li>
</ol>
<p>Sie können den Status des installierten K8s-Clusters mit dem folgenden Befehl überprüfen.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Stellen Sie sicher, dass Sie über <code translate="no">kubectl</code> auf den K8s-Cluster zugreifen können. Falls Sie „ <code translate="no">kubectl</code> “ noch nicht lokal installiert haben, lesen Sie den Abschnitt <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">„Verwenden von kubectl in minikube</a>“.</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">Wie kann ich einen K8s-Cluster mit GPU-Worker-Knoten starten?<button data-href="#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Sie GPU-fähige Worker-Knoten verwenden möchten, können Sie die folgenden Schritte ausführen, um einen K8s-Cluster mit GPU-Worker-Knoten zu erstellen. Wir empfehlen, Milvus auf einem K8s-Cluster mit GPU-Worker-Knoten zu installieren und die standardmäßig bereitgestellte Speicherklasse zu verwenden.</p>
<ol>
<li>GPU-Worker-Knoten vorbereiten</li>
</ol>
<p>Um GPU-fähige Worker-Knoten zu verwenden, befolgen Sie die Schritte unter <a href="https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes">„Vorbereiten Ihrer GPU-Knoten</a>“.</p>
<ol start="2">
<li>GPU-Unterstützung auf K8s aktivieren</li>
</ol>
<p>Stellen Sie das <strong>„nvidia-device-plugin“</strong> mit Helm bereit, indem Sie <a href="https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm">diese Schritte</a> befolgen.</p>
<p>Rufen Sie nach der Einrichtung die GPU-Ressourcen mit dem folgenden Befehl ab. Ersetzen Sie „ <code translate="no">&lt;gpu-worker-node&gt;</code> “ durch den tatsächlichen Knotennamen.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">  $ </span><span class="language-bash">kubectl describe node &lt;gpu-worker-node&gt;</span>

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
