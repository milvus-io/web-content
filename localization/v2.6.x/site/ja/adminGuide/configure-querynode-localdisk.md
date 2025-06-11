---
id: configure-querynode-localdisk.md
title: ローカルディスクを使用したMilvus QueryNodeの設定
related_key: 'querynode, query node, local disk'
summary: Milvus QueryNodeがローカルディスクを使用するように設定する方法について説明します。
---
<h1 id="Configure-Milvus-QueryNode-with-Local-Disk" class="common-anchor-header">ローカルディスクを使用したMilvus QueryNodeの設定<button data-href="#Configure-Milvus-QueryNode-with-Local-Disk" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus QueryNodeでローカルディスクを使用するための設定方法について説明します。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusはAIに特化したベクトルデータベースで、膨大なベクトルデータを効率的に保存・検索できるように設計されています。画像・動画解析、自然言語処理、推薦システムなどのタスクに最適です。最適なパフォーマンスを確保するには、ディスクの読み取りレイテンシを最小限に抑えることが極めて重要です。遅延を防ぎ、システムの安定性を維持するためには、ローカルのNVMe SSDを使用することが強く推奨されます。</p>
<p>ローカル・ディスク・ストレージが活躍する主な機能は以下のとおりです：</p>
<ul>
<li><a href="/docs/ja/chunk_cache.md"><strong>チャンク・キャッシュ</strong></a>：データをローカル・ディスク・キャッシュにプリロードし、検索を高速化します。</li>
<li><a href="/docs/ja/mmap.md"><strong>MMap</strong></a>：ファイルの内容をメモリに直接マッピングし、メモリ効率を向上させます。</li>
<li><a href="/docs/ja/disk_index.md"><strong>DiskANNインデックス</strong></a>：効率的なインデックス管理のためにディスク・ストレージを必要とする。</li>
</ul>
<p>本記事では、<a href="/docs/ja/install-overview.md#Milvus-Distributed">Milvus Distributedを</a>クラウドプラットフォームにデプロイし、NVMeディスクストレージを使用するようにQueryNodeを設定する方法に焦点を当てます。以下の表は、様々なクラウドプロバイダの推奨マシンタイプの一覧です。</p>
<table>
<thead>
<tr><th style="text-align:center">クラウドプロバイダ</th><th style="text-align:center">マシンタイプ</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">AWS</td><td style="text-align:center">R6idシリーズ</td></tr>
<tr><td style="text-align:center">GCP</td><td style="text-align:center">N2シリーズ</td></tr>
<tr><td style="text-align:center">アジュール</td><td style="text-align:center">Lsv3シリーズ</td></tr>
<tr><td style="text-align:center">アリババクラウド</td><td style="text-align:center">i3シリーズ</td></tr>
<tr><td style="text-align:center">テンセントクラウド</td><td style="text-align:center">IT5シリーズ</td></tr>
</tbody>
</table>
<p>これらのマシンタイプはNVMeディスクストレージを提供する。これらのマシンタイプのインスタンスで<code translate="no">lsblk</code> コマンドを使用して、NVMe ディスクストレージがあるかどうかを確認できます。もしあれば、次のステップに進むことができる。</p>
<pre><code translate="no" class="language-bash">$ lsblk | grep nvme
nvme0n1     259:0    0 250.0G  0 disk 
nvme1n1     259:1    0 250.0G  0 disk 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kubernetes-to-use-local-disk" class="common-anchor-header">ローカルディスクを使用するようにKubernetesを設定する<button data-href="#Configure-Kubernetes-to-use-local-disk" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus DistributedのQueryNodeがNVMeディスクストレージを使用するように設定するには、対象のKubernetesクラスタのワーカーノードがコンテナとイメージをNVMeディスクに保存するように設定する必要があります。この手順はクラウドプロバイダによって異なる。</p>
<h3 id="AWS" class="common-anchor-header">AWS</h3><p>Amazon EKSを使用する場合、ノードグループの構成設定を指定できるローンチテンプレートを使用して管理ノードをカスタマイズできます。以下は、Amazon EKSクラスタのワーカーノードにNVMeディスクをマウントする方法の例です：</p>
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
<p>上記の例では、NVMe ディスクは<code translate="no">/dev/nvme1n1</code> であると仮定しています。特定の構成に合わせてスクリプトを変更する必要があります。</p>
</div>
<p>詳細については、<a href="https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#launch-template-user-data">起動テンプレートを使用した管理ノードのカスタマイズを</a>参照してください。</p>
<h3 id="GCP" class="common-anchor-header">GCP</h3><p>Google Kubernetes Engine（GKE）クラスタ上でLocal SSDストレージをプロビジョニングし、クラスタ内のノードに接続されたLocal SSDでバックアップされたエフェメラルストレージからデータを消費するようにワークロードを設定するには、次のコマンドを実行します：</p>
<pre><code translate="no" class="language-bash">gcloud container node-pools create <span class="hljs-variable">${POOL_NAME}</span> \
    --cluster=<span class="hljs-variable">${CLUSTER_NAME}</span> \
    --ephemeral-storage-local-ssd count=<span class="hljs-variable">${NUMBER_OF_DISKS}</span> \
    --machine-type=<span class="hljs-variable">${MACHINE_TYPE}</span>
<button class="copy-code-btn"></button></code></pre>
<p>詳細については、<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd">GKEでのLocal SSDストレージのプロビジョニングを</a>参照してください。</p>
<h3 id="Azure" class="common-anchor-header">アジュール</h3><p>ローカルNVMeディスクストレージを持つ仮想マシンスケールセット（VMSS）を作成するには、VMインスタンスにカスタムデータを渡す必要があります。以下は、VMSS内のVMインスタンスにNVMeディスクをアタッチする方法の例です：</p>
<pre><code translate="no" class="language-bash">mdadm -Cv /dev/md0 -l0 -n2 /dev/nvme0n1 /dev/nvme1n1
mdadm -Ds &gt; /etc/mdadm/mdadm.conf 
update-initramfs -u

mkfs.xfs /dev/md0
<span class="hljs-built_in">mkdir</span> -p /var/lib/kubelet
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;/dev/md0 /var/lib/kubelet xfs defaults 0 0&#x27;</span> &gt;&gt; /etc/fstab
mount -a
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>上記の例では、NVMe ディスクは<code translate="no">/dev/nvme0n1</code> と<code translate="no">/dev/nvme1n1</code> であると仮定しています。特定の構成に合わせてスクリプトを変更する必要があります。</p>
</div>
<h3 id="Alibaba-Cloud--TecentCloud" class="common-anchor-header">AlibabaクラウドとTecentCloud</h3><p>ローカルSSDボリュームを使用するノードプールを作成するには、カスタムデータを渡す必要があります。以下はカスタムデータの例です。</p>
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
<p>上記の例では、NVMeディスクを<code translate="no">/dev/nvme0n1</code> と仮定しています。特定の構成に合わせてスクリプトを修正する必要があります。</p>
</div>
<h3 id="Your-own-IDC" class="common-anchor-header">独自の IDC</h3><p>独自のIDCを実行しており、コンテナがcontainerdでデフォルトで新しくマウントされたNVMeディスク上のファイルシステムを使用するように設定したい場合は、以下の手順に従ってください：</p>
<ul>
<li><p><strong>NVMe ディスクをマウントする。</strong></p>
<p>NVMeディスクがホストマシンに正しくマウントされていることを確認します。お好みのディレクトリにマウントできます。例えば、<code translate="no">/mnt/nvme</code> にマウントする場合、それが正しく設定され、<code translate="no">lsblk</code> または<code translate="no">df -h</code> を実行して<code translate="no">/mnt/nvme</code> で利用可能なディスクを確認できることを確認する。</p></li>
<li><p><strong>containerd 構成を更新する。</strong></p>
<p>コンテナ・ストレージのルート・ディレクトリとして新しいマウントを使用するように、containerd 構成を修正します。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">mkdir</span> -p /mnt/nvme/containerd /mnt/nvme/containerd/state
<span class="hljs-built_in">sudo</span> vim /etc/containerd/config.toml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</code> セクションを探し、<code translate="no">snapshotter</code> と<code translate="no">root</code> の設定を以下のように修正する。</p>
<pre><code translate="no" class="language-toml"><span class="hljs-section">[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</span>
<span class="hljs-attr">snapshotter</span> = <span class="hljs-string">&quot;overlayfs&quot;</span>
<span class="hljs-attr">root</span> = <span class="hljs-string">&quot;/mnt/nvme/containerd&quot;</span>
<span class="hljs-attr">state</span> = <span class="hljs-string">&quot;/mnt/nvme/containerd/state&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>containerd を再起動する。</strong></p>
<p>containerd サービスを再起動して、変更を適用する。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart containerd
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-disk-performance" class="common-anchor-header">ディスク・パフォーマンスの検証<button data-href="#Verify-disk-performance" class="anchor-icon" translate="no">
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
    </button></h2><p>ディスク性能をベンチマークするための一般的なツールである<a href="https://github.com/axboe/fio">Fio</a> を使用して、ディスク性能を検証することを推奨する。以下は、ディスク性能をテストするために Fio を実行する方法の例である。</p>
<ul>
<li><p><strong>NVMe ディスクのあるノードにテストポッドをデプロイします。</strong></p>
<pre><code translate="no" class="language-bash">kubectl create -f ubuntu.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ubuntu.yaml</code> ファイルは以下のとおりです：</p>
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
<li><p><strong>Fio を実行してディスク性能をテストします。</strong></p>
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
<p>そして、出力は以下のようになるはずです：</p>
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
<h2 id="Deploy-Milvus-Distributed" class="common-anchor-header">Milvus Distributedをデプロイします。<button data-href="#Deploy-Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>検証結果が満足のいくものであれば、以下の手順でMilvus Distributedをデプロイすることができる：</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Helm" class="common-anchor-header">Helmを使用してMilvus Distributedをデプロイするためのヒント</h3><p>QueryNodeポッドはデフォルトでNVMeディスクをEmptyDirボリュームとして使用します。最適なパフォーマンスを確保するために、NVMeディスクをQueryNodeポッド内の<code translate="no">/var/lib/milvus/data</code> 。</p>
<p>Helmを使用したMilvus Distributedのデプロイ方法の詳細については、「<a href="/docs/ja/install_cluster-helm.md">Run Milvus in Kubernetes with Helm</a>」を参照してください。</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Milvus-Operator" class="common-anchor-header">Milvus Operatorを使用してMilvus Distributedをデプロイするためのヒント</h3><p>Milvus Operatorは、NVMeディスクをEmptyDirボリュームとして使用するようにQueryNodeポッドを自動的に設定します。<code translate="no">MilvusCluster</code> カスタムリソースに以下の設定を追加することをお勧めします：</p>
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
<p>これにより、QueryNodeポッドがNVMeディスクをデータボリュームとして使用するようになります。Milvus Operatorを使用してMilvus Distributedをデプロイする方法の詳細については、<a href="/docs/ja/install_cluster-milvusoperator.md">Milvus Operatorを使用してKubernetesでMilvusを実行するを</a>参照してください。</p>
