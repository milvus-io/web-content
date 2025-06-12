---
id: configure-querynode-localdisk.md
title: Milvus QueryNode mit lokaler Festplatte konfigurieren
related_key: 'querynode, query node, local disk'
summary: >-
  Erfahren Sie, wie Sie Milvus QueryNode für die Verwendung einer lokalen
  Festplatte konfigurieren.
---
<h1 id="Configure-Milvus-QueryNode-with-Local-Disk" class="common-anchor-header">Milvus QueryNode mit lokaler Festplatte konfigurieren<button data-href="#Configure-Milvus-QueryNode-with-Local-Disk" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieser Artikel beschreibt, wie Sie Milvus QueryNode so konfigurieren, dass es lokalen Plattenspeicher verwendet.</p>
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
    </button></h2><p>Milvus ist eine auf künstliche Intelligenz ausgerichtete Vektordatenbank, die auf die effiziente Speicherung und Abfrage großer Mengen von Vektordaten zugeschnitten ist. Sie ist ideal für Aufgaben wie Bild- und Videoanalyse, natürliche Sprachverarbeitung und Empfehlungssysteme. Um eine optimale Leistung zu gewährleisten, ist es von entscheidender Bedeutung, die Festplattenleselatenz zu minimieren. Die Verwendung lokaler NVMe-SSDs wird dringend empfohlen, um Verzögerungen zu vermeiden und die Systemstabilität zu erhalten.</p>
<p>Zu den wichtigsten Funktionen, bei denen lokale Festplattenspeicher ins Spiel kommen, gehören:</p>
<ul>
<li><a href="/docs/de/chunk_cache.md"><strong>Chunk-Cache</strong></a>: Vorladen von Daten in den lokalen Festplatten-Cache für eine schnellere Suche.</li>
<li><a href="/docs/de/mmap.md"><strong>MMap</strong></a>: Ordnet den Dateiinhalt direkt im Speicher zu, um die Speichereffizienz zu verbessern.</li>
<li><a href="/docs/de/disk_index.md"><strong>DiskANN-Index</strong></a>: Erfordert Festplattenspeicher für eine effiziente Indexverwaltung.</li>
</ul>
<p>In diesem Artikel konzentrieren wir uns auf den Einsatz von <a href="/docs/de/install-overview.md#Milvus-Distributed">Milvus Distributed</a> auf Cloud-Plattformen und auf die Konfiguration des QueryNode zur Verwendung von NVMe-Plattenspeicher. In der folgenden Tabelle sind die empfohlenen Maschinentypen der verschiedenen Cloud-Anbieter aufgeführt.</p>
<table>
<thead>
<tr><th style="text-align:center">Cloud-Anbieter</th><th style="text-align:center">Maschinentyp</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">AWS</td><td style="text-align:center">R6id-Reihe</td></tr>
<tr><td style="text-align:center">GCP</td><td style="text-align:center">N2-Reihe</td></tr>
<tr><td style="text-align:center">Azure</td><td style="text-align:center">Lsv3-Reihe</td></tr>
<tr><td style="text-align:center">Alibaba Wolke</td><td style="text-align:center">i3-Reihe</td></tr>
<tr><td style="text-align:center">Tencent Wolke</td><td style="text-align:center">IT5-Reihe</td></tr>
</tbody>
</table>
<p>Diese Maschinentypen bieten NVMe-Festplattenspeicher. Sie können den Befehl <code translate="no">lsblk</code> auf den Instanzen dieser Maschinentypen verwenden, um zu prüfen, ob sie über NVMe-Plattenspeicher verfügen. Wenn dies der Fall ist, können Sie mit dem nächsten Schritt fortfahren.</p>
<pre><code translate="no" class="language-bash">$ lsblk | grep nvme
nvme0n1     259:0    0 250.0G  0 disk 
nvme1n1     259:1    0 250.0G  0 disk 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kubernetes-to-use-local-disk" class="common-anchor-header">Konfigurieren von Kubernetes für die Verwendung einer lokalen Festplatte<button data-href="#Configure-Kubernetes-to-use-local-disk" class="anchor-icon" translate="no">
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
    </button></h2><p>Um den QueryNode von Milvus Distributed so zu konfigurieren, dass er NVMe-Plattenspeicher verwendet, müssen Sie die Worker Nodes der Kubernetes-Zielcluster so konfigurieren, dass sie die Container und Images auf einer NVMe-Platte speichern. Das Verfahren hierfür variiert je nach Cloud-Anbieter.</p>
<h3 id="AWS" class="common-anchor-header">AWS</h3><p>Bei der Verwendung von Amazon EKS können Sie verwaltete Knoten mit Startvorlagen anpassen, in denen Sie Konfigurationseinstellungen für Ihre Knotengruppen angeben können. Im Folgenden finden Sie ein Beispiel dafür, wie Sie eine NVMe-Festplatte auf den Arbeitsknoten Ihres Amazon EKS-Clusters einbinden:</p>
<pre><code translate="no" class="language-bash">MIME-Version: 1.0
Content-Type: multipart/mixed; boundary=<span class="hljs-string">&quot;==MYBOUNDARY==&quot;</span>

--==MYBOUNDARY==
Content-Type: text/x-shellscript; charset=<span class="hljs-string">&quot;us-ascii&quot;</span>

<span class="hljs-comment">#!/bin/bash</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Running custom user data script&quot;</span>
<span class="hljs-keyword">if</span> ( lsblk | fgrep -q nvme1n1 ); <span class="hljs-keyword">then</span>
    <span class="hljs-built_in">mkdir</span> -p /mnt/data /var/lib/kubelet /var/lib/docker
    mkfs.xfs /dev/nvme1n1
    mount /dev/nvme1n1 /mnt/data
    <span class="hljs-built_in">chmod</span> 0755 /mnt/data
    <span class="hljs-built_in">mv</span> /var/lib/kubelet /mnt/data/
    <span class="hljs-built_in">mv</span> /var/lib/docker /mnt/data/
    <span class="hljs-built_in">ln</span> -sf /mnt/data/kubelet /var/lib/kubelet
    <span class="hljs-built_in">ln</span> -sf /mnt/data/docker /var/lib/docker
    UUID=$(lsblk -f | grep nvme1n1 | awk <span class="hljs-string">&#x27;{print $3}&#x27;</span>)
    <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;UUID=<span class="hljs-variable">$UUID</span>     /mnt/data   xfs    defaults,noatime  1   1&quot;</span> &gt;&gt; /etc/fstab
<span class="hljs-keyword">fi</span>
<span class="hljs-built_in">echo</span> 10485760 &gt; /proc/sys/fs/aio-max-nr

--==MYBOUNDARY==--
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Im obigen Beispiel nehmen wir an, dass die NVMe-Platte <code translate="no">/dev/nvme1n1</code> ist. Sie müssen das Skript an Ihre spezifische Konfiguration anpassen.</p>
</div>
<p>Details finden Sie unter <a href="https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#launch-template-user-data">Anpassen von verwalteten Knoten mit Startvorlagen</a>.</p>
<h3 id="GCP" class="common-anchor-header">GCP</h3><p>Führen Sie den folgenden Befehl aus, um lokalen SSD-Speicher auf Google Kubernetes Engine (GKE)-Clustern bereitzustellen und Arbeitslasten so zu konfigurieren, dass sie Daten von lokalem SSD-gestütztem ephemerem Speicher verwenden, der an Knoten in Ihrem Cluster angeschlossen ist:</p>
<pre><code translate="no" class="language-bash">gcloud container node-pools create <span class="hljs-variable">${POOL_NAME}</span> \
    --cluster=<span class="hljs-variable">${CLUSTER_NAME}</span> \
    --ephemeral-storage-local-ssd count=<span class="hljs-variable">${NUMBER_OF_DISKS}</span> \
    --machine-type=<span class="hljs-variable">${MACHINE_TYPE}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Einzelheiten finden Sie unter <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd">Bereitstellung von lokalem SSD-Speicher auf GKE</a>.</p>
<h3 id="Azure" class="common-anchor-header">Azure</h3><p>Um ein Virtual Machine Scale Set (VMSS) mit lokalem NVMe-Plattenspeicher zu erstellen, müssen Sie benutzerdefinierte Daten an die VM-Instanzen übergeben. Im Folgenden finden Sie ein Beispiel dafür, wie Sie eine NVMe-Festplatte an die VM-Instanzen in der VMSS anhängen:</p>
<pre><code translate="no" class="language-bash">mdadm -Cv /dev/md0 -l0 -n2 /dev/nvme0n1 /dev/nvme1n1
mdadm -Ds &gt; /etc/mdadm/mdadm.conf 
update-initramfs -u

mkfs.xfs /dev/md0
<span class="hljs-built_in">mkdir</span> -p /var/lib/kubelet
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;/dev/md0 /var/lib/kubelet xfs defaults 0 0&#x27;</span> &gt;&gt; /etc/fstab
mount -a
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Im obigen Beispiel gehen wir davon aus, dass die NVMe-Festplatten <code translate="no">/dev/nvme0n1</code> und <code translate="no">/dev/nvme1n1</code> sind. Sie müssen das Skript an Ihre spezifische Konfiguration anpassen.</p>
</div>
<h3 id="Alibaba-Cloud--TecentCloud" class="common-anchor-header">Alibaba Cloud und TecentCloud</h3><p>Um einen Knotenpool zu erstellen, der lokale SSD-Volumes verwendet, müssen wir benutzerdefinierte Daten übergeben. Im Folgenden finden Sie ein Beispiel für benutzerdefinierte Daten.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta">#!/bin/bash</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;nvme init start...&quot;</span>
mkfs.xfs /dev/nvme0n1
<span class="hljs-built_in">mkdir</span> -p /mnt/data
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;/dev/nvme0n1 /mnt/data/ xfs defaults 0 0&#x27;</span> &gt;&gt; /etc/fstab
mount -a

<span class="hljs-built_in">mkdir</span> -p /mnt/data/kubelet /mnt/data/containerd /mnt/data/log/pods
<span class="hljs-built_in">mkdir</span> -p  /var/lib/kubelet /var/lib/containerd /var/log/pods

<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;/mnt/data/kubelet /var/lib/kubelet none defaults,bind 0 0&#x27;</span> &gt;&gt; /etc/fstab
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;/mnt/data/containerd /var/lib/containerd none defaults,bind 0 0&#x27;</span> &gt;&gt; /etc/fstab
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;/mnt/data/log/pods /var/log/pods none defaults,bind 0 0&#x27;</span> &gt;&gt; /etc/fstab
mount -a

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;nvme init end...&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Im obigen Beispiel wird angenommen, dass die NVMe-Festplatte <code translate="no">/dev/nvme0n1</code> ist. Sie müssen das Skript an Ihre spezifische Konfiguration anpassen.</p>
</div>
<h3 id="Your-own-IDC" class="common-anchor-header">Ihr eigener IDC</h3><p>Wenn Sie Ihre eigene IDC betreiben und Ihre Container so konfigurieren möchten, dass sie standardmäßig das Dateisystem auf einer neu eingehängten NVMe-Platte in containerd verwenden, führen Sie folgende Schritte aus:</p>
<ul>
<li><p><strong>Hängen Sie die NVMe-Platten ein.</strong></p>
<p>Vergewissern Sie sich, dass Ihre NVMe-Platte ordnungsgemäß auf Ihrem Host-Rechner eingehängt ist. Sie können sie in ein Verzeichnis Ihrer Wahl einhängen. Wenn Sie sie z. B. in <code translate="no">/mnt/nvme</code> einbinden, stellen Sie sicher, dass sie korrekt eingerichtet ist und Sie die Platte unter <code translate="no">/mnt/nvme</code> sehen können, indem Sie <code translate="no">lsblk</code> oder <code translate="no">df -h</code> ausführen.</p></li>
<li><p><strong>Aktualisieren Sie die containerd-Konfiguration.</strong></p>
<p>Ändern Sie die containerd-Konfiguration, um das neue Mount als Root-Verzeichnis für den Container-Speicher zu verwenden.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">mkdir</span> -p /mnt/nvme/containerd /mnt/nvme/containerd/state
<span class="hljs-built_in">sudo</span> vim /etc/containerd/config.toml
<button class="copy-code-btn"></button></code></pre>
<p>Suchen Sie den Abschnitt <code translate="no">[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</code>, und ändern Sie die Einstellungen <code translate="no">snapshotter</code> und <code translate="no">root</code> wie folgt：</p>
<pre><code translate="no" class="language-toml"><span class="hljs-section">[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</span>
<span class="hljs-attr">snapshotter</span> = <span class="hljs-string">&quot;overlayfs&quot;</span>
<span class="hljs-attr">root</span> = <span class="hljs-string">&quot;/mnt/nvme/containerd&quot;</span>
<span class="hljs-attr">state</span> = <span class="hljs-string">&quot;/mnt/nvme/containerd/state&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Starten Sie containerd neu.</strong></p>
<p>Starten Sie den containerd-Dienst neu, um die Änderungen zu übernehmen.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart containerd
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-disk-performance" class="common-anchor-header">Überprüfen der Festplattenleistung<button data-href="#Verify-disk-performance" class="anchor-icon" translate="no">
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
    </button></h2><p>Es wird empfohlen, die Festplattenleistung mit <a href="https://github.com/axboe/fio">Fio</a> zu überprüfen. Fio ist ein beliebtes Tool zum Benchmarking der Festplattenleistung. Im Folgenden finden Sie ein Beispiel dafür, wie Sie Fio zum Testen der Festplattenleistung ausführen.</p>
<ul>
<li><p><strong>Setzen Sie den Test-Pod auf dem Knoten mit der NVMe-Festplatte ein.</strong></p>
<pre><code translate="no" class="language-bash">kubectl create -f ubuntu.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Die Datei <code translate="no">ubuntu.yaml</code> lautet wie folgt:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Pod</span>
<span class="hljs-attr">metadata:</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">ubuntu</span>
<span class="hljs-attr">spec:</span>
<span class="hljs-attr">containers:</span>
<span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">ubuntu</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">ubuntu:latest</span>
    <span class="hljs-attr">command:</span> [<span class="hljs-string">&quot;sleep&quot;</span>, <span class="hljs-string">&quot;86400&quot;</span>]
    <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">data-volume</span>
        <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/data</span>
<span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">data-volume</span>
    <span class="hljs-attr">emptyDir:</span> {}
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Führen Sie Fio aus, um die Festplattenleistung zu testen.</strong></p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># enter the container</span>
kubectl <span class="hljs-built_in">exec</span> pod/ubuntu -it bash

<span class="hljs-comment"># in container</span>
apt-get update
apt-get install fio -y

<span class="hljs-comment"># change to the mounted dir</span>
<span class="hljs-built_in">cd</span> /data

<span class="hljs-comment"># write 10GB</span>
fio -direct=1 -iodepth=128 -rw=randwrite -ioengine=libaio -bs=4K -size=10G -numjobs=10 -runtime=600 -group_reporting -filename=<span class="hljs-built_in">test</span> -name=Rand_Write_IOPS_Test

<span class="hljs-comment"># verify the read speed</span>
<span class="hljs-comment"># compare with the disk performance indicators provided by various cloud providers.</span>
fio --filename=<span class="hljs-built_in">test</span> --direct=1 --rw=randread --bs=4k --ioengine=libaio --iodepth=64 --runtime=120 --numjobs=128 --time_based --group_reporting --name=iops-test-job --eta-newline=1  --<span class="hljs-built_in">readonly</span>
<button class="copy-code-btn"></button></code></pre>
<p>Und die Ausgabe sollte wie folgt aussehen:</p>
<pre><code translate="no" class="language-bash">Jobs: 128 (f=128): [r(128)][100.0%][r=1458MiB/s][r=373k IOPS][eta 00m:00s]
iops-test-job: (groupid=0, <span class="hljs-built_in">jobs</span>=128): err= 0: pid=768: Mon Jun 24 09:35:06 2024
<span class="hljs-built_in">read</span>: IOPS=349k, BW=1364MiB/s (1430MB/s)(160GiB/120067msec)
    slat (nsec): min=765, max=530621k, avg=365836.09, stdev=4765464.96
    clat (usec): min=35, max=1476.0k, avg=23096.78, stdev=45409.13
    lat (usec): min=36, max=1571.6k, avg=23462.62, stdev=46296.74
    clat percentiles (usec):
    |  1.00th=[    69],  5.00th=[    79], 10.00th=[    85], 20.00th=[    95],
    | 30.00th=[   106], 40.00th=[   123], 50.00th=[   149], 60.00th=[ 11469],
    | 70.00th=[ 23462], 80.00th=[ 39584], 90.00th=[ 70779], 95.00th=[103285],
    | 99.00th=[189793], 99.50th=[244319], 99.90th=[497026], 99.95th=[591397],
    | 99.99th=[767558]
bw (  MiB/s): min=  236, max= 4439, per=100.00%, avg=1365.82, stdev= 5.02, samples=30591
iops        : min=60447, max=1136488, avg=349640.62, stdev=1284.65, samples=30591
lat (usec)   : 50=0.01%, 100=24.90%, 250=30.47%, 500=0.09%, 750=0.31%
lat (usec)   : 1000=0.08%
lat (msec)   : 2=0.32%, 4=0.59%, 10=1.86%, 20=8.20%, 50=17.29%
lat (msec)   : 100=10.62%, 250=4.80%, 500=0.38%, 750=0.09%, 1000=0.01%
lat (msec)   : 2000=0.01%
cpu          : usr=0.20%, sys=0.48%, ctx=838085, majf=0, minf=9665
IO depths    : 1=0.1%, 2=0.1%, 4=0.1%, 8=0.1%, 16=0.1%, 32=0.1%, &gt;=64=100.0%
    submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, &gt;=64=0.0%
    complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.1%, &gt;=64=0.0%
    issued rwts: total=41910256,0,0,0 short=0,0,0,0 dropped=0,0,0,0
    latency   : target=0, window=0, percentile=100.00%, depth=64
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Deploy-Milvus-Distributed" class="common-anchor-header">Milvus Distributed bereitstellen<button data-href="#Deploy-Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald die Überprüfungsergebnisse zufriedenstellend sind, können Sie Milvus Distributed mit den folgenden Schritten bereitstellen:</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Helm" class="common-anchor-header">Tipps für den Einsatz von Milvus Distributed mit Helm</h3><p>Der QueryNode-Pod verwendet standardmäßig NVMe-Festplatten als EmptyDir-Volumes. Es wird empfohlen, NVMe-Festplatten unter <code translate="no">/var/lib/milvus/data</code> innerhalb des QueryNode-Pods zu mounten, um eine optimale Leistung zu gewährleisten.</p>
<p>Einzelheiten zur Bereitstellung von Milvus Distributed mit Helm finden Sie unter <a href="/docs/de/install_cluster-helm.md">Ausführen von Milvus in Kubernetes mit Helm</a>.</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Milvus-Operator" class="common-anchor-header">Tipps für die Bereitstellung von Milvus Distributed mit Milvus Operator</h3><p>Der Milvus Operator konfiguriert den QueryNode-Pod automatisch für die Verwendung von NVMe-Festplatten als EmptyDir-Volumes. Wir empfehlen Ihnen, die folgenden Konfigurationen zur benutzerdefinierten Ressource <code translate="no">MilvusCluster</code> hinzuzufügen:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">queryNode:</span>
      <span class="hljs-attr">volumeMounts:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/var/lib/milvus/data</span>
        <span class="hljs-attr">name:</span> <span class="hljs-string">data</span>
      <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">emptyDir:</span>
        <span class="hljs-attr">name:</span> <span class="hljs-string">data</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dadurch wird sichergestellt, dass der QueryNode-Pod die NVMe-Festplatte als Datenvolumen verwendet. Einzelheiten zur Bereitstellung von Milvus Distributed mit Milvus Operator finden Sie unter <a href="/docs/de/install_cluster-milvusoperator.md">Ausführen von Milvus in Kubernetes mit Milvus Operator</a>.</p>
