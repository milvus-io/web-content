---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: >-
  Informieren Sie sich über die notwendigen Vorbereitungen für die Installation
  von Milvus mit Helm.
title: Anforderungen für die Ausführung von Milvus auf Kubernetes
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">Anforderungen für den Betrieb von Milvus auf Kubernetes<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite werden die Hardware- und Softwareanforderungen aufgeführt, um Milvus zum Laufen zu bringen.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Hardware-Anforderungen<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Komponente</th><th>Anforderung</th><th>Empfehlung</th><th>Hinweis</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>Intel 2nd Gen Core CPU oder höher</li><li>Apple Silizium</li></ul></td><td><ul><li>Eigenständig: 4 Kerne oder mehr</li><li>Cluster: 8 Kerne oder mehr</li></ul></td><td></td></tr>
<tr><td>CPU-Befehlssatz</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Die Vektorähnlichkeitssuche und die Indexerstellung in Milvus erfordern die Unterstützung von SIMD-Erweiterungen (Single Instruction, Multiple Data) durch die CPU. Stellen Sie sicher, dass die CPU mindestens eine der aufgeführten SIMD-Erweiterungen unterstützt. Siehe <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPUs mit AVX</a> für weitere Informationen.</td></tr>
<tr><td>RAM</td><td><ul><li>Eigenständig: 8G</li><li>Cluster: 32G</li></ul></td><td><ul><li>Eigenständig: 16G</li><li>Cluster: 128G</li></ul></td><td>Die Größe des Arbeitsspeichers hängt von der Datenmenge ab.</td></tr>
<tr><td>Festplattenlaufwerk</td><td>SATA 3.0 SSD oder CloudStorage</td><td>NVMe SSD oder höher</td><td>Die Größe des Festplattenlaufwerks hängt vom Datenvolumen ab.</td></tr>
</tbody>
</table>
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
<p>kubectl ist das Befehlszeilentool für Kubernetes. Verwenden Sie eine kubectl-Version, die innerhalb eines geringfügigen Versionsunterschieds zu Ihrem Cluster liegt. Die Verwendung der neuesten Version von kubectl hilft, unvorhergesehene Probleme zu vermeiden.</p>
<p>minikube ist erforderlich, wenn Sie einen Kubernetes-Cluster lokal betreiben. minikube benötigt Docker als Abhängigkeit. Stellen Sie sicher, dass Sie Docker installieren, bevor Sie Milvus mit Helm installieren. Weitere Informationen finden Sie unter <a href="https://docs.docker.com/get-docker">Get Docker</a>.</p>
<table>
<thead>
<tr><th>Das Betriebssystem</th><th>Software</th><th>Hinweis</th></tr>
</thead>
<tbody>
<tr><td>Linux-Plattformen</td><td><ul><li>Kubernetes 1.16 oder höher</li><li>kubectl</li><li>Helm 3.0.0 oder höher</li><li>minikube (für Milvus Standalone)</li><li>Docker 19.03 oder höher (für Milvus Standalone)</li></ul></td><td>Weitere Informationen finden Sie in den <a href="https://helm.sh/docs/">Helm Docs</a>.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Software</th><th>Version</th><th>Hinweis</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Siehe <a href="#Additional-disk-requirements">zusätzliche Festplattenanforderungen</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Zusätzliche Anforderungen an die Festplatte</h3><p>Die Festplattenleistung ist entscheidend für etcd. Es wird dringend empfohlen, dass Sie lokale NVMe-SSDs verwenden. Eine langsamere Festplattenreaktion kann zu häufigen Clusterwahlen führen, die schließlich den etcd-Dienst beeinträchtigen.</p>
<p>Um zu testen, ob Ihre Festplatte geeignet ist, verwenden Sie <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealerweise sollte Ihre Festplatte mehr als 500 IOPS und eine fsync-Latenz von weniger als 10 ms (99. Perzentil) erreichen. Detaillierte Anforderungen finden Sie in den etcd <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">Docs</a>.</p>
<h2 id="FAQs" class="common-anchor-header">FAQs<button data-href="#FAQs" class="anchor-icon" translate="no">
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
<h2 id="Whats-next" class="common-anchor-header">Wie geht's weiter?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Wenn Ihre Hardware und Software die Anforderungen erfüllen, können Sie:</p>
<ul>
<li><a href="/docs/de/v2.4.x/install_cluster-milvusoperator.md">Milvus in Kubernetes mit Milvus Operator ausführen</a></li>
<li><a href="/docs/de/v2.4.x/install_cluster-helm.md">Milvus in Kubernetes mit Helm ausführen</a></li>
</ul></li>
<li><p>Siehe <a href="/docs/de/v2.4.x/system_configuration.md">Systemkonfiguration</a> für Parameter, die Sie bei der Installation von Milvus einstellen können.</p></li>
</ul>
