---
id: configure-querynode-localdisk.md
title: Mengkonfigurasi Milvus QueryNode dengan Disk Lokal
related_key: 'querynode, query node, local disk'
summary: Pelajari cara mengonfigurasi Milvus QueryNode untuk menggunakan disk lokal.
---
<h1 id="Configure-Milvus-QueryNode-with-Local-Disk" class="common-anchor-header">Mengkonfigurasi Milvus QueryNode dengan Disk Lokal<button data-href="#Configure-Milvus-QueryNode-with-Local-Disk" class="anchor-icon" translate="no">
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
    </button></h1><p>Artikel ini menjelaskan cara mengonfigurasi Milvus QueryNode untuk menggunakan penyimpanan disk lokal.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus adalah basis data vektor yang berfokus pada AI yang dirancang untuk penyimpanan dan pengambilan data vektor dalam jumlah besar secara efisien. Sangat ideal untuk tugas-tugas seperti analisis gambar dan video, pemrosesan bahasa alami, dan sistem rekomendasi. Untuk memastikan performa yang optimal, sangat penting untuk meminimalkan latensi pembacaan disk. Menggunakan SSD NVMe lokal sangat disarankan untuk mencegah penundaan dan menjaga stabilitas sistem.</p>
<p>Fitur utama yang berperan penting dalam penyimpanan disk lokal meliputi:</p>
<ul>
<li><a href="/docs/id/chunk_cache.md"><strong>Cache potongan</strong></a>: Memuat data sebelumnya ke dalam cache disk lokal untuk pencarian yang lebih cepat.</li>
<li><a href="/docs/id/mmap.md"><strong>MMap</strong></a>: Memetakan konten file secara langsung ke dalam memori untuk efisiensi memori yang lebih baik.</li>
<li><a href="/docs/id/disk_index.md"><strong>Indeks DiskANN</strong></a>: Memerlukan penyimpanan disk untuk manajemen indeks yang efisien.</li>
</ul>
<p>Dalam artikel ini, kita akan fokus pada penerapan <a href="/docs/id/install-overview.md#Milvus-Distributed">Milvus Distributed</a> di platform cloud, dan cara mengonfigurasi QueryNode untuk menggunakan penyimpanan disk NVMe. Tabel berikut mencantumkan jenis mesin yang direkomendasikan dari berbagai penyedia cloud.</p>
<table>
<thead>
<tr><th style="text-align:center">Penyedia Cloud</th><th style="text-align:center">Jenis Mesin</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">AWS</td><td style="text-align:center">Seri R6id</td></tr>
<tr><td style="text-align:center">GCP</td><td style="text-align:center">Seri N2</td></tr>
<tr><td style="text-align:center">Azure</td><td style="text-align:center">Seri Lsv3</td></tr>
<tr><td style="text-align:center">Alibaba Cloud</td><td style="text-align:center">Seri i3</td></tr>
<tr><td style="text-align:center">Tencent Cloud</td><td style="text-align:center">Seri IT5</td></tr>
</tbody>
</table>
<p>Jenis mesin ini menyediakan penyimpanan disk NVMe. Anda dapat menggunakan perintah <code translate="no">lsblk</code> pada instance jenis mesin ini untuk memeriksa apakah mereka memiliki penyimpanan disk NVMe. Jika ya, Anda dapat melanjutkan ke langkah berikutnya.</p>
<pre><code translate="no" class="language-bash">$ lsblk | grep nvme
nvme0n1     259:0    0 250.0G  0 disk 
nvme1n1     259:1    0 250.0G  0 disk 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kubernetes-to-use-local-disk" class="common-anchor-header">Mengonfigurasi Kubernetes untuk menggunakan disk lokal<button data-href="#Configure-Kubernetes-to-use-local-disk" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk mengonfigurasi QueryNode Milvus Distributed agar menggunakan penyimpanan disk NVMe, Anda perlu mengonfigurasi node pekerja dari cluster Kubernetes target untuk menyimpan kontainer dan citra pada disk NVMe. Prosedurnya bervariasi, tergantung pada penyedia layanan cloud.</p>
<h3 id="AWS" class="common-anchor-header">AWS</h3><p>Saat menggunakan Amazon EKS, Anda dapat menyesuaikan node terkelola dengan templat peluncuran, yang di dalamnya Anda dapat menentukan pengaturan konfigurasi untuk grup node. Berikut ini adalah contoh cara memasang disk NVMe pada node pekerja di cluster Amazon EKS Anda:</p>
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
<p>Pada contoh di atas, kami mengasumsikan bahwa disk NVMe adalah <code translate="no">/dev/nvme1n1</code>. Anda perlu memodifikasi skrip agar sesuai dengan konfigurasi spesifik Anda.</p>
</div>
<p>Untuk detailnya, lihat <a href="https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#launch-template-user-data">Menyesuaikan node terkelola dengan templat peluncuran</a>.</p>
<h3 id="GCP" class="common-anchor-header">GCP</h3><p>Untuk menyediakan penyimpanan SSD Lokal di cluster Google Kubernetes Engine (GKE), dan mengonfigurasi beban kerja untuk mengonsumsi data dari penyimpanan sementara yang didukung SSD Lokal yang terpasang pada node di cluster Anda, jalankan perintah berikut:</p>
<pre><code translate="no" class="language-bash">gcloud container node-pools create <span class="hljs-variable">${POOL_NAME}</span> \
    --cluster=<span class="hljs-variable">${CLUSTER_NAME}</span> \
    --ephemeral-storage-local-ssd count=<span class="hljs-variable">${NUMBER_OF_DISKS}</span> \
    --machine-type=<span class="hljs-variable">${MACHINE_TYPE}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk detailnya, lihat <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd">Menyediakan penyimpanan SSD Lokal di GKE</a>.</p>
<h3 id="Azure" class="common-anchor-header">Azure</h3><p>Untuk membuat set skala mesin virtual (VMSS) dengan penyimpanan disk NVMe lokal, Anda perlu meneruskan data khusus ke instance VM. Berikut ini adalah contoh cara melampirkan disk NVMe ke instance VM di VMSS:</p>
<pre><code translate="no" class="language-bash">mdadm -Cv /dev/md0 -l0 -n2 /dev/nvme0n1 /dev/nvme1n1
mdadm -Ds &gt; /etc/mdadm/mdadm.conf 
update-initramfs -u

mkfs.xfs /dev/md0
<span class="hljs-built_in">mkdir</span> -p /var/lib/kubelet
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;/dev/md0 /var/lib/kubelet xfs defaults 0 0&#x27;</span> &gt;&gt; /etc/fstab
mount -a
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Pada contoh di atas, kami mengasumsikan bahwa disk NVMe adalah <code translate="no">/dev/nvme0n1</code> dan <code translate="no">/dev/nvme1n1</code>. Anda perlu memodifikasi skrip agar sesuai dengan konfigurasi spesifik Anda.</p>
</div>
<h3 id="Alibaba-Cloud--TecentCloud" class="common-anchor-header">Alibaba Cloud &amp; TecentCloud</h3><p>Untuk membuat kumpulan node yang menggunakan volume SSD Lokal, kita perlu mengoper Data Kustom. Berikut ini adalah contoh data khusus.</p>
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
<p>Pada contoh di atas, kami mengasumsikan bahwa disk NVMe adalah <code translate="no">/dev/nvme0n1</code>. Anda perlu memodifikasi skrip agar sesuai dengan konfigurasi spesifik Anda.</p>
</div>
<h3 id="Your-own-IDC" class="common-anchor-header">IDC Anda sendiri</h3><p>Jika Anda menjalankan IDC sendiri dan ingin mengonfigurasi container untuk menggunakan sistem file pada disk NVMe yang baru dipasang secara default di containerd, ikuti langkah berikut:</p>
<ul>
<li><p><strong>Pasang disk NVMe.</strong></p>
<p>Pastikan disk NVMe Anda terpasang dengan benar di mesin host. Anda dapat menyambungkannya ke direktori pilihan Anda. Misalnya, jika Anda memasangnya ke <code translate="no">/mnt/nvme</code>, pastikan sudah diatur dengan benar dan Anda dapat melihat disk yang tersedia di <code translate="no">/mnt/nvme</code> dengan menjalankan <code translate="no">lsblk</code> atau <code translate="no">df -h</code>.</p></li>
<li><p><strong>Perbarui konfigurasi containerd.</strong></p>
<p>Ubah konfigurasi containerd untuk menggunakan mount baru sebagai direktori root untuk penyimpanan kontainer.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">mkdir</span> -p /mnt/nvme/containerd /mnt/nvme/containerd/state
<span class="hljs-built_in">sudo</span> vim /etc/containerd/config.toml
<button class="copy-code-btn"></button></code></pre>
<p>Cari bagian <code translate="no">[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</code>, dan modifikasi pengaturan <code translate="no">snapshotter</code> dan <code translate="no">root</code> sebagai berikut</p>
<pre><code translate="no" class="language-toml">[<span class="hljs-meta">plugins.<span class="hljs-string">&quot;io.containerd.grpc.v1.cri&quot;</span>.containerd</span>]
snapshotter = <span class="hljs-string">&quot;overlayfs&quot;</span>
root = <span class="hljs-string">&quot;/mnt/nvme/containerd&quot;</span>
state = <span class="hljs-string">&quot;/mnt/nvme/containerd/state&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Mulai ulang containerd.</strong></p>
<p>Mulai ulang layanan containerd untuk menerapkan perubahan.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart containerd
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-disk-performance" class="common-anchor-header">Verifikasi kinerja disk<button data-href="#Verify-disk-performance" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda disarankan untuk memverifikasi performa disk menggunakan <a href="https://github.com/axboe/fio">Fio</a>, yang merupakan alat populer untuk membandingkan performa disk. Berikut ini adalah contoh cara menjalankan Fio untuk menguji performa disk.</p>
<ul>
<li><p><strong>Sebarkan pod uji ke node dengan disk NVMe.</strong></p>
<pre><code translate="no" class="language-bash">kubectl create -f ubuntu.yaml
<button class="copy-code-btn"></button></code></pre>
<p>File <code translate="no">ubuntu.yaml</code> adalah sebagai berikut:</p>
<pre><code translate="no" class="language-yaml">apiVersion: v1
kind: Pod
metadata:
name: ubuntu
spec:
containers:
- name: ubuntu
    image: ubuntu:latest
    <span class="hljs-built_in">command</span>: [<span class="hljs-string">&quot;sleep&quot;</span>, <span class="hljs-string">&quot;86400&quot;</span>]
    volumeMounts:
    - name: data-volume
        mountPath: /data
volumes:
    - name: data-volume
    emptyDir: {}
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Jalankan Fio untuk menguji performa disk.</strong></p>
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
<p>Dan hasilnya akan terlihat seperti ini:</p>
<pre><code translate="no" class="language-bash">Jobs: <span class="hljs-number">128</span> (f=<span class="hljs-number">128</span>): [r(<span class="hljs-number">128</span>)][<span class="hljs-number">100.0</span>%][r=1458MiB/s][r=373k IOPS][eta 00m:00s]
iops-test-job: (groupid=<span class="hljs-number">0</span>, jobs=<span class="hljs-number">128</span>): err= <span class="hljs-number">0</span>: pid=<span class="hljs-number">768</span>: Mon Jun <span class="hljs-number">24</span> 09:<span class="hljs-number">35</span>:06 <span class="hljs-number">2024</span>
read: IOPS=349k, BW=1364MiB/s (1430MB/s)(160GiB/120067msec)
    slat (nsec): <span class="hljs-built_in">min</span>=<span class="hljs-number">765</span>, <span class="hljs-built_in">max</span>=530621k, avg=<span class="hljs-number">365836.09</span>, stdev=<span class="hljs-number">4765464.96</span>
    clat (usec): <span class="hljs-built_in">min</span>=<span class="hljs-number">35</span>, <span class="hljs-built_in">max</span>=<span class="hljs-number">1476.0</span>k, avg=<span class="hljs-number">23096.78</span>, stdev=<span class="hljs-number">45409.13</span>
    lat (usec): <span class="hljs-built_in">min</span>=<span class="hljs-number">36</span>, <span class="hljs-built_in">max</span>=<span class="hljs-number">1571.6</span>k, avg=<span class="hljs-number">23462.62</span>, stdev=<span class="hljs-number">46296.74</span>
    clat percentiles (usec):
    |  <span class="hljs-number">1.00</span>th=[    <span class="hljs-number">69</span>],  <span class="hljs-number">5.00</span>th=[    <span class="hljs-number">79</span>], <span class="hljs-number">10.00</span>th=[    <span class="hljs-number">85</span>], <span class="hljs-number">20.00</span>th=[    <span class="hljs-number">95</span>],
    | <span class="hljs-number">30.00</span>th=[   <span class="hljs-number">106</span>], <span class="hljs-number">40.00</span>th=[   <span class="hljs-number">123</span>], <span class="hljs-number">50.00</span>th=[   <span class="hljs-number">149</span>], <span class="hljs-number">60.00</span>th=[ <span class="hljs-number">11469</span>],
    | <span class="hljs-number">70.00</span>th=[ <span class="hljs-number">23462</span>], <span class="hljs-number">80.00</span>th=[ <span class="hljs-number">39584</span>], <span class="hljs-number">90.00</span>th=[ <span class="hljs-number">70779</span>], <span class="hljs-number">95.00</span>th=[<span class="hljs-number">103285</span>],
    | <span class="hljs-number">99.00</span>th=[<span class="hljs-number">189793</span>], <span class="hljs-number">99.50</span>th=[<span class="hljs-number">244319</span>], <span class="hljs-number">99.90</span>th=[<span class="hljs-number">497026</span>], <span class="hljs-number">99.95</span>th=[<span class="hljs-number">591397</span>],
    | <span class="hljs-number">99.99</span>th=[<span class="hljs-number">767558</span>]
bw (  MiB/s): <span class="hljs-built_in">min</span>=  <span class="hljs-number">236</span>, <span class="hljs-built_in">max</span>= <span class="hljs-number">4439</span>, per=<span class="hljs-number">100.00</span>%, avg=<span class="hljs-number">1365.82</span>, stdev= <span class="hljs-number">5.02</span>, samples=<span class="hljs-number">30591</span>
iops        : <span class="hljs-built_in">min</span>=<span class="hljs-number">60447</span>, <span class="hljs-built_in">max</span>=<span class="hljs-number">1136488</span>, avg=<span class="hljs-number">349640.62</span>, stdev=<span class="hljs-number">1284.65</span>, samples=<span class="hljs-number">30591</span>
lat (usec)   : <span class="hljs-number">50</span>=<span class="hljs-number">0.01</span>%, <span class="hljs-number">100</span>=<span class="hljs-number">24.90</span>%, <span class="hljs-number">250</span>=<span class="hljs-number">30.47</span>%, <span class="hljs-number">500</span>=<span class="hljs-number">0.09</span>%, <span class="hljs-number">750</span>=<span class="hljs-number">0.31</span>%
lat (usec)   : <span class="hljs-number">1000</span>=<span class="hljs-number">0.08</span>%
lat (msec)   : <span class="hljs-number">2</span>=<span class="hljs-number">0.32</span>%, <span class="hljs-number">4</span>=<span class="hljs-number">0.59</span>%, <span class="hljs-number">10</span>=<span class="hljs-number">1.86</span>%, <span class="hljs-number">20</span>=<span class="hljs-number">8.20</span>%, <span class="hljs-number">50</span>=<span class="hljs-number">17.29</span>%
lat (msec)   : <span class="hljs-number">100</span>=<span class="hljs-number">10.62</span>%, <span class="hljs-number">250</span>=<span class="hljs-number">4.80</span>%, <span class="hljs-number">500</span>=<span class="hljs-number">0.38</span>%, <span class="hljs-number">750</span>=<span class="hljs-number">0.09</span>%, <span class="hljs-number">1000</span>=<span class="hljs-number">0.01</span>%
lat (msec)   : <span class="hljs-number">2000</span>=<span class="hljs-number">0.01</span>%
cpu          : usr=<span class="hljs-number">0.20</span>%, sys=<span class="hljs-number">0.48</span>%, ctx=<span class="hljs-number">838085</span>, majf=<span class="hljs-number">0</span>, minf=<span class="hljs-number">9665</span>
IO depths    : <span class="hljs-number">1</span>=<span class="hljs-number">0.1</span>%, <span class="hljs-number">2</span>=<span class="hljs-number">0.1</span>%, <span class="hljs-number">4</span>=<span class="hljs-number">0.1</span>%, <span class="hljs-number">8</span>=<span class="hljs-number">0.1</span>%, <span class="hljs-number">16</span>=<span class="hljs-number">0.1</span>%, <span class="hljs-number">32</span>=<span class="hljs-number">0.1</span>%, &gt;=<span class="hljs-number">64</span>=<span class="hljs-number">100.0</span>%
    submit    : <span class="hljs-number">0</span>=<span class="hljs-number">0.0</span>%, <span class="hljs-number">4</span>=<span class="hljs-number">100.0</span>%, <span class="hljs-number">8</span>=<span class="hljs-number">0.0</span>%, <span class="hljs-number">16</span>=<span class="hljs-number">0.0</span>%, <span class="hljs-number">32</span>=<span class="hljs-number">0.0</span>%, <span class="hljs-number">64</span>=<span class="hljs-number">0.0</span>%, &gt;=<span class="hljs-number">64</span>=<span class="hljs-number">0.0</span>%
    complete  : <span class="hljs-number">0</span>=<span class="hljs-number">0.0</span>%, <span class="hljs-number">4</span>=<span class="hljs-number">100.0</span>%, <span class="hljs-number">8</span>=<span class="hljs-number">0.0</span>%, <span class="hljs-number">16</span>=<span class="hljs-number">0.0</span>%, <span class="hljs-number">32</span>=<span class="hljs-number">0.0</span>%, <span class="hljs-number">64</span>=<span class="hljs-number">0.1</span>%, &gt;=<span class="hljs-number">64</span>=<span class="hljs-number">0.0</span>%
    issued rwts: total=<span class="hljs-number">41910256</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span> short=<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span> dropped=<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>
    latency   : target=<span class="hljs-number">0</span>, window=<span class="hljs-number">0</span>, percentile=<span class="hljs-number">100.00</span>%, depth=<span class="hljs-number">64</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Deploy-Milvus-Distributed" class="common-anchor-header">Menyebarkan Milvus Terdistribusi<button data-href="#Deploy-Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah hasil verifikasi memuaskan, Anda dapat menggunakan Milvus Distributed dengan langkah-langkah berikut:</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Helm" class="common-anchor-header">Kiat untuk men-deploy Milvus Distributed menggunakan Helm</h3><p>Pod QueryNode menggunakan disk NVMe sebagai volume EmptyDir secara default. Anda disarankan untuk memasang disk NVMe ke <code translate="no">/var/lib/milvus/data</code> di dalam pod QueryNode untuk memastikan performa yang optimal.</p>
<p>Untuk detail tentang cara menggunakan Milvus Distributed menggunakan Helm, lihat Menjalankan <a href="/docs/id/install_cluster-helm.md">Milvus di Kubernetes dengan Helm</a>.</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Milvus-Operator" class="common-anchor-header">Kiat untuk menerapkan Milvus Distributed menggunakan Milvus Operator</h3><p>Milvus Operator secara otomatis mengonfigurasi pod QueryNode untuk menggunakan disk NVMe sebagai volume EmptyDir. Anda disarankan untuk menambahkan konfigurasi berikut ke sumber daya khusus <code translate="no">MilvusCluster</code>:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">components</span>:
    <span class="hljs-attr">queryNode</span>:
      <span class="hljs-attr">volumeMounts</span>:
      - <span class="hljs-attr">mountPath</span>: <span class="hljs-regexp">/var/</span>lib/milvus/data
        <span class="hljs-attr">name</span>: data
      <span class="hljs-attr">volumes</span>:
      - <span class="hljs-attr">emptyDir</span>:
        <span class="hljs-attr">name</span>: data
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan memastikan bahwa pod QueryNode menggunakan disk NVMe sebagai volume data. Untuk detail tentang cara menggunakan Milvus Distributed menggunakan Milvus Operator, lihat Menjalankan <a href="/docs/id/install_cluster-milvusoperator.md">Milvus di Kubernetes dengan Milvus Operator</a>.</p>
