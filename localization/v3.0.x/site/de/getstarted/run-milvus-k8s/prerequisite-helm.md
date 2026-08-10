---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: >-
  Erfahren Sie, welche Vorbereitungen vor der Installation von Milvus mit Helm
  erforderlich sind.
title: Voraussetzungen für den Betrieb von Milvus auf Kubernetes
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">Voraussetzungen für den Betrieb von Milvus auf Kubernetes<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Auf dieser Seite sind die Hardware- und Softwareanforderungen aufgeführt, die für die Inbetriebnahme von Milvus erforderlich sind.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Hardwareanforderungen<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
<tr><td>CPU</td><td><ul><li>Intel Core-CPU der 2. Generation oder höher</li><li>Apple Silicon</li></ul></td><td><ul><li>Einzelrechner: 4 Kerne oder mehr</li><li>Cluster: 8 Kerne oder mehr</li></ul></td><td></td></tr>
<tr><td>CPU-Befehlssatz</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Die Vektor-Ähnlichkeitssuche und die Indexerstellung in Milvus erfordern die Unterstützung von SIMD-Erweiterungssätzen (Single Instruction, Multiple Data) durch die CPU. Stellen Sie sicher, dass die CPU mindestens eine der aufgeführten SIMD-Erweiterungen unterstützt. Weitere Informationen finden Sie unter <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">„CPUs mit AVX</a> “.</td></tr>
<tr><td>RAM</td><td><ul><li>Einzelrechner: 8 G</li><li>Cluster: 32 G</li></ul></td><td><ul><li>Einzelrechner: 16 G</li><li>Cluster: 128 G</li></ul></td><td>Die Größe des Arbeitsspeichers hängt vom Datenvolumen ab.</td></tr>
<tr><td>Festplatte</td><td>SATA 3.0 SSD oder CloudStorage</td><td>NVMe-SSD oder höher</td><td>Die Größe der Festplatte hängt vom Datenvolumen ab.</td></tr>
</tbody>
</table>
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
    </button></h2><p>Es wird empfohlen, den Kubernetes-Cluster auf Linux-Plattformen auszuführen.</p>
<p>kubectl ist das Befehlszeilentool für Kubernetes. Verwenden Sie eine kubectl-Version, die sich höchstens um eine Nebenversion von der Ihres Clusters unterscheidet. Die Verwendung der neuesten kubectl-Version hilft, unvorhergesehene Probleme zu vermeiden.</p>
<p>minikube ist erforderlich, wenn Sie den Kubernetes-Cluster lokal ausführen. minikube benötigt Docker als Abhängigkeit. Stellen Sie sicher, dass Sie Docker installieren, bevor Sie Milvus mit Helm installieren. Weitere Informationen finden Sie unter <a href="https://docs.docker.com/get-docker">„Docker herunterladen</a> “.</p>
<table>
<thead>
<tr><th>Betriebssystem</th><th>Software</th><th>Hinweis</th></tr>
</thead>
<tbody>
<tr><td>Linux-Plattformen</td><td><ul><li>Kubernetes 1.16 oder höher</li><li>kubectl</li><li>Helm 3.0.0 oder höher</li><li>minikube (für Milvus im Standalone-Modus)</li><li>Docker 19.03 oder höher (für Milvus Standalone)</li></ul></td><td>Weitere Informationen finden Sie in <a href="https://helm.sh/docs/">der Helm-Dokumentation</a>.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Software</th><th>Version</th><th>Hinweis</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Siehe <a href="#Additional-disk-requirements">zusätzliche Speicherplatzanforderungen</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>Im Lieferumfang von Milvus enthalten (Dienstmodus: <code translate="no">v0.1.37</code>+)</td><td>Standard-Nachrichtenwarteschlange. Bei verteilten Bereitstellungen kann Woodpecker als dedizierter <strong>Dienst</strong> ausgeführt werden; fixieren Sie die Version mit ` <code translate="no">--set woodpecker.image.tag</code>`. Der Dienstmodus wird ab Woodpecker- <code translate="no">v0.1.37</code> unterstützt.</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>Optional – nur, wenn Sie die Nachrichtenwarteschlange auf Pulsar umstellen; wird standardmäßig nicht installiert.</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Zusätzliche Festplattenanforderungen<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Festplattenleistung ist für etcd entscheidend. Es wird dringend empfohlen, lokale NVMe-SSDs zu verwenden. Eine langsamere Festplattenreaktion kann zu häufigen Cluster-Wahlen führen, die letztendlich die Leistung des etcd-Dienstes beeinträchtigen.</p>
<p>Um zu testen, ob Ihre Festplatte geeignet ist, verwenden Sie <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealerweise sollte Ihr Speicher über 500 IOPS erreichen und eine fsync-Latenz im 99. Perzentil von unter 10 ms aufweisen. Lesen Sie die <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">etcd-Dokumentation</a> für detailliertere Anforderungen.</p>
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
    </button></h3><p>Sie können Tools wie <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> und <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> verwenden, um schnell einen Kubernetes-Cluster lokal einzurichten. Die folgende Anleitung verwendet minikube als Beispiel.</p>
<ol>
<li>Minikube herunterladen</li>
</ol>
<p>Rufen Sie die Seite <a href="https://minikube.sigs.k8s.io/docs/start/">„Erste Schritte“</a> auf, prüfen Sie, ob Sie die im Abschnitt <strong>„Was Sie benötigen“</strong> aufgeführten Voraussetzungen erfüllen, klicken Sie auf die Schaltflächen für Ihre Zielplattform und kopieren Sie die Befehle zum Herunterladen und Installieren der Binärdatei.</p>
<ol start="2">
<li>Starten eines K8s-Clusters mit minikube</li>
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
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/de/install_cluster-milvusoperator.md">Milvus in Kubernetes mit dem Milvus Operator ausführen</a></li>
<li><a href="/docs/de/install_cluster-helm.md">Milvus in Kubernetes mit Helm ausführen</a></li>
</ul></li>
<li><p>Unter <a href="/docs/de/system_configuration.md">„Systemkonfiguration“</a> finden Sie die Parameter, die Sie bei der Installation von Milvus festlegen können.</p></li>
</ul>
