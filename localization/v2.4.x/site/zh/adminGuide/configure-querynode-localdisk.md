---
id: configure-querynode-localdisk.md
title: 使用本地磁盘配置 Milvus QueryNode
related_key: 'querynode, query node, local disk'
summary: 了解如何配置 Milvus QueryNode 以使用本地磁盘。
---
<h1 id="Configure-Milvus-QueryNode-with-Local-Disk" class="common-anchor-header">使用本地磁盘配置 Milvus QueryNode<button data-href="#Configure-Milvus-QueryNode-with-Local-Disk" class="anchor-icon" translate="no">
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
    </button></h1><p>本文介绍如何配置 Milvus QueryNode 使用本地磁盘存储。</p>
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
    </button></h2><p>Milvus 是一个以人工智能为重点的向量数据库，专为高效存储和检索大量向量数据而量身定制。它是图像和视频分析、自然语言处理和推荐系统等任务的理想选择。为确保最佳性能，最大限度地减少磁盘读取延迟至关重要。强烈建议使用本地 NVMe SSD，以防止延迟并保持系统稳定性。</p>
<p>本地磁盘存储发挥作用的主要功能包括</p>
<ul>
<li><a href="/docs/zh/v2.4.x/chunk_cache.md"><strong>大块缓存</strong></a>：将数据预加载到本地磁盘缓存中，以加快搜索速度。</li>
<li><a href="/docs/zh/v2.4.x/mmap.md"><strong>MMap</strong></a>：将文件内容直接映射到内存中，提高内存效率。</li>
<li><a href="/docs/zh/v2.4.x/disk_index.md"><strong>DiskANN 索引</strong></a>：需要磁盘存储，以便高效管理索引。</li>
</ul>
<p>本文将重点介绍在云平台上部署<a href="/docs/zh/v2.4.x/install-overview.md#Milvus-Distributed">Milvus Distributed</a>，以及如何配置 QueryNode 以使用 NVMe 磁盘存储。下表列出了各种云提供商推荐的机器类型。</p>
<table>
<thead>
<tr><th style="text-align:center">云提供商</th><th style="text-align:center">机器类型</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">AWS</td><td style="text-align:center">R6id 系列</td></tr>
<tr><td style="text-align:center">GCP</td><td style="text-align:center">N2 系列</td></tr>
<tr><td style="text-align:center">Azure</td><td style="text-align:center">Lsv3 系列</td></tr>
<tr><td style="text-align:center">阿里云</td><td style="text-align:center">i3 系列</td></tr>
<tr><td style="text-align:center">腾讯云</td><td style="text-align:center">IT5 系列</td></tr>
</tbody>
</table>
<p>这些机器类型提供 NVMe 磁盘存储。您可以在这些机器类型的实例上使用<code translate="no">lsblk</code> 命令检查它们是否有 NVMe 磁盘存储。如果有，就可以进行下一步。</p>
<pre><code translate="no" class="language-bash">$ lsblk | grep nvme
nvme0n1     259:0    0 250.0G  0 disk 
nvme1n1     259:1    0 250.0G  0 disk 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kubernetes-to-use-local-disk" class="common-anchor-header">配置 Kubernetes 以使用本地磁盘<button data-href="#Configure-Kubernetes-to-use-local-disk" class="anchor-icon" translate="no">
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
    </button></h2><p>要配置 Milvus Distributed 的 QueryNode 使用 NVMe 磁盘存储，你需要配置目标 Kubernetes 集群的工作节点，将容器和映像存储在 NVMe 磁盘上。具体步骤因云提供商而异。</p>
<h3 id="AWS" class="common-anchor-header">亚马逊</h3><p>使用亚马逊 EKS 时，您可以使用启动模板自定义受管节点，在其中为节点组指定配置设置。下面的示例说明了如何在 Amazon EKS 群集的工作节点上加载 NVMe 磁盘：</p>
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
<p>在上述示例中，我们假设 NVMe 磁盘为<code translate="no">/dev/nvme1n1</code> 。您需要根据具体配置修改脚本。</p>
</div>
<p>有关详细信息，请参阅<a href="https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#launch-template-user-data">使用启动模板自定义托管节点</a>。</p>
<h3 id="GCP" class="common-anchor-header">GCP</h3><p>要在 Google Kubernetes Engine (GKE) 集群上配置本地固态盘存储，并配置工作负载从连接到集群中节点的本地固态盘支持的短暂存储中消耗数据，请运行以下命令：</p>
<pre><code translate="no" class="language-bash">gcloud container node-pools create <span class="hljs-variable">${POOL_NAME}</span> \
    --cluster=<span class="hljs-variable">${CLUSTER_NAME}</span> \
    --ephemeral-storage-local-ssd count=<span class="hljs-variable">${NUMBER_OF_DISKS}</span> \
    --machine-type=<span class="hljs-variable">${MACHINE_TYPE}</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关详细信息，请参阅<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd">在 GKE 上配置 Local SSD 存储</a>。</p>
<h3 id="Azure" class="common-anchor-header">Azure</h3><p>要创建具有本地 NVMe 磁盘存储的虚拟机扩展集 (VMSS)，需要将自定义数据传递给虚拟机实例。下面的示例说明了如何将 NVMe 磁盘附加到 VMSS 中的虚拟机实例：</p>
<pre><code translate="no" class="language-bash">mdadm -Cv /dev/md0 -l0 -n2 /dev/nvme0n1 /dev/nvme1n1
mdadm -Ds &gt; /etc/mdadm/mdadm.conf 
update-initramfs -u

mkfs.xfs /dev/md0
<span class="hljs-built_in">mkdir</span> -p /var/lib/kubelet
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;/dev/md0 /var/lib/kubelet xfs defaults 0 0&#x27;</span> &gt;&gt; /etc/fstab
mount -a
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>在上述示例中，我们假设 NVMe 磁盘为<code translate="no">/dev/nvme0n1</code> 和<code translate="no">/dev/nvme1n1</code> 。您需要修改脚本以匹配您的特定配置。</p>
</div>
<h3 id="Alibaba-Cloud--TecentCloud" class="common-anchor-header">阿里云和 TecentCloud</h3><p>要创建使用本地 SSD 卷的节点池，我们需要传递自定义数据。以下是自定义数据的示例。</p>
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
<p>在上述示例中，我们假设 NVMe 磁盘为<code translate="no">/dev/nvme0n1</code> 。您需要修改脚本以符合您的具体配置。</p>
</div>
<h3 id="Your-own-IDC" class="common-anchor-header">自己的 IDC</h3><p>如果您正在运行自己的 IDC，并希望将容器配置为默认在 containerd 中使用新挂载的 NVMe 磁盘上的文件系统，请按照以下步骤操作：</p>
<ul>
<li><p><strong>挂载 NVMe 磁盘。</strong></p>
<p>确保 NVMe 磁盘已正确挂载到主机上。您可以将其挂载到自己选择的目录。例如，如果将其挂载到<code translate="no">/mnt/nvme</code> ，请确保已正确设置，并且可以通过运行<code translate="no">lsblk</code> 或<code translate="no">df -h</code> 查看<code translate="no">/mnt/nvme</code> 中的可用磁盘。</p></li>
<li><p><strong>更新 containerd 配置。</strong></p>
<p>修改 containerd 配置，将新的挂载作为容器存储的根目录。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">mkdir</span> -p /mnt/nvme/containerd /mnt/nvme/containerd/state
<span class="hljs-built_in">sudo</span> vim /etc/containerd/config.toml
<button class="copy-code-btn"></button></code></pre>
<p>找到<code translate="no">[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</code> 部分，并修改<code translate="no">snapshotter</code> 和<code translate="no">root</code> 设置，如下所示： 重新启动 containerd。</p>
<pre><code translate="no" class="language-toml">[<span class="hljs-meta">plugins.<span class="hljs-string">&quot;io.containerd.grpc.v1.cri&quot;</span>.containerd</span>]
snapshotter = <span class="hljs-string">&quot;overlayfs&quot;</span>
root = <span class="hljs-string">&quot;/mnt/nvme/containerd&quot;</span>
state = <span class="hljs-string">&quot;/mnt/nvme/containerd/state&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>重新启动 containerd。</strong></p>
<p>重新启动 containerd 服务以应用更改。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart containerd
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-disk-performance" class="common-anchor-header">验证磁盘性能<button data-href="#Verify-disk-performance" class="anchor-icon" translate="no">
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
    </button></h2><p>建议你使用<a href="https://github.com/axboe/fio">Fio</a> 来验证磁盘性能，它是一种常用的磁盘性能基准测试工具。下面是一个如何运行 Fio 测试磁盘性能的示例。</p>
<ul>
<li><p><strong>将测试 pod 部署到装有 NVMe 磁盘的节点。</strong></p>
<pre><code translate="no" class="language-bash">kubectl create -f ubuntu.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ubuntu.yaml</code> 文件如下：</p>
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
<li><p><strong>运行 Fio 测试磁盘性能。</strong></p>
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
<p>输出结果应如下所示：</p>
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
    </button></h2><p>验证结果令人满意后，就可以按以下步骤部署 Milvus Distributed：</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Helm" class="common-anchor-header">使用 Helm 部署 Milvus Distributed 的提示</h3><p>QueryNode pod 默认使用 NVMe 磁盘作为 EmptyDir 卷。建议在 QueryNode pod 中将 NVMe 磁盘挂载到<code translate="no">/var/lib/milvus/data</code> ，以确保最佳性能。</p>
<p>有关如何使用 Helm 部署 Milvus Distributed 的详细信息，请参阅使用<a href="/docs/zh/v2.4.x/install_cluster-helm.md">Helm 在 Kubernetes 中运行 Milvus</a>。</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator 部署 Milvus Distributed 的提示</h3><p>Milvus Operator 会自动配置 QueryNode pod 将 NVMe 磁盘用作 EmptyDir 卷。建议将以下配置添加到<code translate="no">MilvusCluster</code> 自定义资源：</p>
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
<p>这将确保 QueryNode pod 将 NVMe 磁盘用作数据卷。有关如何使用 Milvus Operator 部署<a href="/docs/zh/v2.4.x/install_cluster-milvusoperator.md">Milvus</a> Distributed 的详细信息，请参阅<a href="/docs/zh/v2.4.x/install_cluster-milvusoperator.md">使用 Milvus Operator 在 Kubernetes 中运行 Milvus</a>。</p>
