---
id: configure-querynode-localdisk.md
title: 使用本機磁碟配置 Milvus QueryNode
related_key: 'querynode, query node, local disk'
summary: 瞭解如何設定 Milvus QueryNode 使用本機磁碟。
---
<h1 id="Configure-Milvus-QueryNode-with-Local-Disk" class="common-anchor-header">使用本機磁碟配置 Milvus QueryNode<button data-href="#Configure-Milvus-QueryNode-with-Local-Disk" class="anchor-icon" translate="no">
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
    </button></h1><p>本文描述如何設定 Milvus QueryNode 使用本機磁碟儲存。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 是專為人工智能量身打造的向量資料庫，可有效儲存及擷取大量向量資料。它是圖像和視訊分析、自然語言處理和推薦系統等任務的理想選擇。為了確保最佳效能，將磁碟讀取延遲時間降至最低是非常重要的。強烈建議使用本機 NVMe SSD，以防止延遲並保持系統穩定。</p>
<p>本機磁碟儲存發揮作用的主要功能包括</p>
<ul>
<li><a href="/docs/zh-hant/chunk_cache.md"><strong>Chunk 快取</strong></a>：將資料預先載入本機磁碟快取，以加快搜尋速度。</li>
<li><a href="/docs/zh-hant/mmap.md"><strong>MMap</strong></a>：將檔案內容直接映射到記憶體，以提高記憶體效率。</li>
<li><a href="/docs/zh-hant/disk_index.md"><strong>DiskANN 索引</strong></a>：需要磁碟儲存空間以進行有效率的索引管理。</li>
</ul>
<p>在本文中，我們將著重於在雲端平台上部署<a href="/docs/zh-hant/install-overview.md#Milvus-Distributed">Milvus Distributed</a>，以及如何設定 QueryNode 使用 NVMe 磁碟儲存。下表列出各雲端供應商推薦的機器類型。</p>
<table>
<thead>
<tr><th style="text-align:center">雲供應商</th><th style="text-align:center">機器類型</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">AWS</td><td style="text-align:center">R6id 系列</td></tr>
<tr><td style="text-align:center">GCP</td><td style="text-align:center">N2 系列</td></tr>
<tr><td style="text-align:center">Azure</td><td style="text-align:center">Lsv3 系列</td></tr>
<tr><td style="text-align:center">阿里巴巴雲</td><td style="text-align:center">i3 系列</td></tr>
<tr><td style="text-align:center">騰訊雲</td><td style="text-align:center">IT5 系列</td></tr>
</tbody>
</table>
<p>這些機器類型提供 NVMe 磁碟儲存。您可以在這些機器類型的實體上使用<code translate="no">lsblk</code> 指令檢查它們是否有 NVMe 磁碟儲存。如果有，您就可以進行下一步。</p>
<pre><code translate="no" class="language-bash">$ lsblk | grep nvme
nvme0n1     259:0    0 250.0G  0 disk 
nvme1n1     259:1    0 250.0G  0 disk 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kubernetes-to-use-local-disk" class="common-anchor-header">設定 Kubernetes 使用本機磁碟<button data-href="#Configure-Kubernetes-to-use-local-disk" class="anchor-icon" translate="no">
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
    </button></h2><p>若要設定 Milvus Distributed 的 QueryNode 使用 NVMe 磁碟儲存，您需要設定目標 Kubernetes 叢集的 Worker 節點，將容器和影像儲存於 NVMe 磁碟上。其步驟依雲供應商而有所不同。</p>
<h3 id="AWS" class="common-anchor-header">AWS</h3><p>使用 Amazon EKS 時，您可以使用啟動範本自訂受管節點，您可以在其中指定節點群組的組態設定。以下是如何在 Amazon EKS 群集的工作節點上掛載 NVMe 磁碟的範例：</p>
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
<p>在上述範例中，我們假設 NVMe 磁碟為<code translate="no">/dev/nvme1n1</code> 。您需要修改腳本以符合您的特定配置。</p>
</div>
<p>如需詳細資訊，請參閱<a href="https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#launch-template-user-data">使用啟動範本自訂受管節點</a>。</p>
<h3 id="GCP" class="common-anchor-header">GCP</h3><p>若要在 Google Kubernetes Engine (GKE) 叢集上佈建 Local SSD 儲存，並配置工作負載從連接至叢集中節點的 Local SSD 支援暫存中消耗資料，請執行下列指令：</p>
<pre><code translate="no" class="language-bash">gcloud container node-pools create <span class="hljs-variable">${POOL_NAME}</span> \
    --cluster=<span class="hljs-variable">${CLUSTER_NAME}</span> \
    --ephemeral-storage-local-ssd count=<span class="hljs-variable">${NUMBER_OF_DISKS}</span> \
    --machine-type=<span class="hljs-variable">${MACHINE_TYPE}</span>
<button class="copy-code-btn"></button></code></pre>
<p>如需詳細資訊，請參閱<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd">在 GKE 上配置 Local SSD 儲存</a>。</p>
<h3 id="Azure" class="common-anchor-header">Azure</h3><p>若要使用本機 NVMe 磁碟儲存建立虛擬機器規模集 (VMSS)，您需要傳送自訂資料至虛擬機器實體。以下是如何將 NVMe 磁碟附加到 VMSS 中的虛擬機器實體的範例：</p>
<pre><code translate="no" class="language-bash">mdadm -Cv /dev/md0 -l0 -n2 /dev/nvme0n1 /dev/nvme1n1
mdadm -Ds &gt; /etc/mdadm/mdadm.conf 
update-initramfs -u

mkfs.xfs /dev/md0
<span class="hljs-built_in">mkdir</span> -p /var/lib/kubelet
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;/dev/md0 /var/lib/kubelet xfs defaults 0 0&#x27;</span> &gt;&gt; /etc/fstab
mount -a
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>在上述示例中，我們假設 NVMe 磁碟為<code translate="no">/dev/nvme0n1</code> 和<code translate="no">/dev/nvme1n1</code> 。您需要修改腳本以符合您的特定配置。</p>
</div>
<h3 id="Alibaba-Cloud--TecentCloud" class="common-anchor-header">阿里雲與 TecentCloud</h3><p>要創建一個使用本地 SSD 卷的節點池，我們需要傳入自定義數據（Custom Data）。以下是自訂資料的範例。</p>
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
<p>在上述示例中，我們假設 NVMe 磁碟為<code translate="no">/dev/nvme0n1</code> 。您需要修改腳本以符合您的特定配置。</p>
</div>
<h3 id="Your-own-IDC" class="common-anchor-header">您自己的 IDC</h3><p>如果您正在運行自己的 IDC，並且想要在 containerd 中設定容器預設使用新掛載的 NVMe 磁碟上的檔案系統，請遵循下列步驟：</p>
<ul>
<li><p><strong>掛載 NVMe 磁碟。</strong></p>
<p>確保您的 NVMe 磁碟已在主機上正確掛載。您可以將它掛載到您選擇的目錄。例如，如果您將它掛載到<code translate="no">/mnt/nvme</code> ，請確定它已正確設定，而且您可以透過執行<code translate="no">lsblk</code> 或<code translate="no">df -h</code> ，在<code translate="no">/mnt/nvme</code> 看到磁碟可用。</p></li>
<li><p><strong>更新 containerd 配置。</strong></p>
<p>修改 containerd 配置以使用新的掛載作為容器儲存的根目錄。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">mkdir</span> -p /mnt/nvme/containerd /mnt/nvme/containerd/state
<span class="hljs-built_in">sudo</span> vim /etc/containerd/config.toml
<button class="copy-code-btn"></button></code></pre>
<p>找到<code translate="no">[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</code> 部分，並修改<code translate="no">snapshotter</code> 和<code translate="no">root</code> 設定，如下所示： 重新啟動 containerd。</p>
<pre><code translate="no" class="language-toml"><span class="hljs-section">[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</span>
<span class="hljs-attr">snapshotter</span> = <span class="hljs-string">&quot;overlayfs&quot;</span>
<span class="hljs-attr">root</span> = <span class="hljs-string">&quot;/mnt/nvme/containerd&quot;</span>
<span class="hljs-attr">state</span> = <span class="hljs-string">&quot;/mnt/nvme/containerd/state&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>重新啟動 containerd。</strong></p>
<p>重新啟動 containerd 服務以套用變更。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart containerd
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-disk-performance" class="common-anchor-header">驗證磁碟效能<button data-href="#Verify-disk-performance" class="anchor-icon" translate="no">
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
    </button></h2><p>建議您使用<a href="https://github.com/axboe/fio">Fio</a> 來驗證磁碟效能，<a href="https://github.com/axboe/fio">Fio</a> 是一種常用的磁碟效能基準測試工具。以下是如何執行 Fio 以測試磁碟效能的範例。</p>
<ul>
<li><p><strong>將測試 pod 部署到具有 NVMe 磁碟的節點。</strong></p>
<pre><code translate="no" class="language-bash">kubectl create -f ubuntu.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ubuntu.yaml</code> 檔案如下：</p>
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
<li><p><strong>執行 Fio 測試磁碟效能。</strong></p>
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
<p>輸出結果應該是這樣</p>
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
<h2 id="Deploy-Milvus-Distributed" class="common-anchor-header">部署 Milvus Distributed<button data-href="#Deploy-Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>一旦驗證結果令人滿意，您就可以依照下列步驟部署 Milvus Distributed：</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Helm" class="common-anchor-header">使用 Helm 部署 Milvus Distributed 的提示</h3><p>QueryNode pod 預設使用 NVMe 磁碟作為 EmptyDir 磁碟區。建議您將 NVMe 磁碟掛載至 QueryNode pod 內的<code translate="no">/var/lib/milvus/data</code> ，以確保最佳效能。</p>
<p>有關如何使用 Helm 部署 Milvus Distributed 的詳細資訊，請參閱使用<a href="/docs/zh-hant/install_cluster-helm.md">Helm 在 Kubernetes 執行 Milvus</a>。</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator 部署 Milvus Distributed 的提示</h3><p>Milvus Operator 會自動設定 QueryNode pod 使用 NVMe 磁碟作為 EmptyDir 磁碟區。建議您將下列配置新增至<code translate="no">MilvusCluster</code> 自訂資源：</p>
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
<p>這將確保 QueryNode pod 使用 NVMe 磁碟作為資料卷。有關如何使用 Milvus Operator 部署<a href="/docs/zh-hant/install_cluster-milvusoperator.md">Milvus</a> Distributed 的詳細資訊，請參閱使用<a href="/docs/zh-hant/install_cluster-milvusoperator.md">Milvus Operator 在 Kubernetes 中執行 Milvus</a>。</p>
