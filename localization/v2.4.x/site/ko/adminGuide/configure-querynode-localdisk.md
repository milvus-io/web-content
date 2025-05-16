---
id: configure-querynode-localdisk.md
title: 로컬 디스크로 Milvus 쿼리 노드 구성하기
related_key: 'querynode, query node, local disk'
summary: 로컬 디스크를 사용하도록 Milvus QueryNode를 구성하는 방법을 알아보세요.
---
<h1 id="Configure-Milvus-QueryNode-with-Local-Disk" class="common-anchor-header">로컬 디스크로 Milvus 쿼리 노드 구성하기<button data-href="#Configure-Milvus-QueryNode-with-Local-Disk" class="anchor-icon" translate="no">
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
    </button></h1><p>이 문서에서는 로컬 디스크 스토리지를 사용하도록 Milvus QueryNode를 구성하는 방법에 대해 설명합니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 방대한 양의 벡터 데이터를 효율적으로 저장하고 검색할 수 있도록 맞춤화된 AI 중심 벡터 데이터베이스입니다. 이미지 및 동영상 분석, 자연어 처리, 추천 시스템과 같은 작업에 이상적입니다. 최적의 성능을 보장하려면 디스크 읽기 지연 시간을 최소화하는 것이 중요합니다. 지연을 방지하고 시스템 안정성을 유지하려면 로컬 NVMe SSD를 사용하는 것이 좋습니다.</p>
<p>로컬 디스크 스토리지가 중요한 역할을 하는 주요 기능은 다음과 같습니다:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/chunk_cache.md"><strong>청크 캐시</strong></a>: 빠른 검색을 위해 로컬 디스크 캐시에 데이터를 미리 로드합니다.</li>
<li><a href="/docs/ko/v2.4.x/mmap.md"><strong>MMap</strong></a>: 메모리 효율성을 높이기 위해 파일 콘텐츠를 메모리에 직접 매핑합니다.</li>
<li><a href="/docs/ko/v2.4.x/disk_index.md"><strong>DiskANN 인덱스</strong></a>: 효율적인 인덱스 관리를 위해 디스크 스토리지가 필요합니다.</li>
</ul>
<p>이 문서에서는 클라우드 플랫폼에 <a href="/docs/ko/v2.4.x/install-overview.md#Milvus-Distributed">Milvus Distributed를</a> 배포하는 방법과 NVMe 디스크 스토리지를 사용하도록 쿼리 노드를 구성하는 방법에 대해 중점적으로 설명합니다. 다음 표에는 다양한 클라우드 제공업체의 권장 머신 유형이 나와 있습니다.</p>
<table>
<thead>
<tr><th style="text-align:center">클라우드 제공자</th><th style="text-align:center">머신 유형</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">AWS</td><td style="text-align:center">R6id 시리즈</td></tr>
<tr><td style="text-align:center">GCP</td><td style="text-align:center">N2 시리즈</td></tr>
<tr><td style="text-align:center">Azure</td><td style="text-align:center">Lsv3 시리즈</td></tr>
<tr><td style="text-align:center">Alibaba Cloud</td><td style="text-align:center">i3 시리즈</td></tr>
<tr><td style="text-align:center">Tencent Cloud</td><td style="text-align:center">IT5 시리즈</td></tr>
</tbody>
</table>
<p>이러한 머신 유형은 NVMe 디스크 스토리지를 제공합니다. 이러한 머신 유형의 인스턴스에서 <code translate="no">lsblk</code> 명령을 사용하여 NVMe 디스크 스토리지가 있는지 확인할 수 있습니다. 있는 경우 다음 단계로 진행할 수 있습니다.</p>
<pre><code translate="no" class="language-bash">$ lsblk | grep nvme
nvme0n1     259:0    0 250.0G  0 disk 
nvme1n1     259:1    0 250.0G  0 disk 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kubernetes-to-use-local-disk" class="common-anchor-header">로컬 디스크를 사용하도록 쿠버네티스 구성하기<button data-href="#Configure-Kubernetes-to-use-local-disk" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스 디스트리뷰션의 쿼리노드가 NVMe 디스크 스토리지를 사용하도록 구성하려면, 대상 쿠버네티스 클러스터의 워커 노드가 컨테이너와 이미지를 NVMe 디스크에 저장하도록 구성해야 합니다. 이 절차는 클라우드 제공자에 따라 다릅니다.</p>
<h3 id="AWS" class="common-anchor-header">AWS</h3><p>Amazon EKS를 사용하는 경우, 노드 그룹에 대한 구성 설정을 지정할 수 있는 시작 템플릿으로 관리형 노드를 사용자 정의할 수 있습니다. 다음은 Amazon EKS 클러스터의 작업자 노드에 NVMe 디스크를 마운트하는 방법의 예입니다:</p>
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
<p>위의 예에서는 NVMe 디스크가 <code translate="no">/dev/nvme1n1</code> 이라고 가정합니다. 특정 구성에 맞게 스크립트를 수정해야 합니다.</p>
</div>
<p>자세한 내용은 <a href="https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#launch-template-user-data">시작 템플릿으로 관리형 노드 사용자 지정하기를</a> 참조하세요.</p>
<h3 id="GCP" class="common-anchor-header">GCP</h3><p>GKE(Google 쿠버네티스 엔진) 클러스터에서 로컬 SSD 스토리지를 프로비저닝하고 클러스터의 노드에 연결된 로컬 SSD 지원 임시 스토리지에서 데이터를 사용하도록 워크로드를 구성하려면 다음 명령을 실행하세요:</p>
<pre><code translate="no" class="language-bash">gcloud container node-pools create <span class="hljs-variable">${POOL_NAME}</span> \
    --cluster=<span class="hljs-variable">${CLUSTER_NAME}</span> \
    --ephemeral-storage-local-ssd count=<span class="hljs-variable">${NUMBER_OF_DISKS}</span> \
    --machine-type=<span class="hljs-variable">${MACHINE_TYPE}</span>
<button class="copy-code-btn"></button></code></pre>
<p>자세한 내용은 <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd">GKE에서 로컬 SSD 스토리지 프로비저닝을</a> 참조한다.</p>
<h3 id="Azure" class="common-anchor-header">Azure</h3><p>로컬 NVMe 디스크 스토리지로 VMSS(가상 머신 스케일 세트)를 만들려면 VM 인스턴스에 사용자 지정 데이터를 전달해야 합니다. 다음은 VMSS의 VM 인스턴스에 NVMe 디스크를 연결하는 방법의 예시입니다:</p>
<pre><code translate="no" class="language-bash">mdadm -Cv /dev/md0 -l0 -n2 /dev/nvme0n1 /dev/nvme1n1
mdadm -Ds &gt; /etc/mdadm/mdadm.conf 
update-initramfs -u

mkfs.xfs /dev/md0
<span class="hljs-built_in">mkdir</span> -p /var/lib/kubelet
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;/dev/md0 /var/lib/kubelet xfs defaults 0 0&#x27;</span> &gt;&gt; /etc/fstab
mount -a
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>위의 예에서는 NVMe 디스크가 <code translate="no">/dev/nvme0n1</code> 및 <code translate="no">/dev/nvme1n1</code> 이라고 가정합니다. 특정 구성에 맞게 스크립트를 수정해야 합니다.</p>
</div>
<h3 id="Alibaba-Cloud--TecentCloud" class="common-anchor-header">알리바바 클라우드 및 테센트 클라우드</h3><p>로컬 SSD 볼륨을 사용하는 노드 풀을 만들려면 사용자 지정 데이터를 전달해야 합니다. 다음은 사용자 지정 데이터의 예시입니다.</p>
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
<p>위 예제에서는 NVMe 디스크가 <code translate="no">/dev/nvme0n1</code> 이라고 가정합니다. 특정 구성에 맞게 스크립트를 수정해야 합니다.</p>
</div>
<h3 id="Your-own-IDC" class="common-anchor-header">자체 IDC</h3><p>자체 IDC를 실행 중이고 컨테이너에서 기본적으로 새로 마운트된 NVMe 디스크의 파일 시스템을 사용하도록 컨테이너를 구성하려는 경우 다음 단계를 따르세요:</p>
<ul>
<li><p><strong>NVMe 디스크를 마운트한다.</strong></p>
<p>NVMe 디스크가 호스트 머신에 제대로 마운트되었는지 확인합니다. 원하는 디렉터리에 마운트할 수 있습니다. 예를 들어 <code translate="no">/mnt/nvme</code> 에 마운트하는 경우, 제대로 설정되었는지 확인하고 <code translate="no">lsblk</code> 또는 <code translate="no">df -h</code> 을 실행하여 <code translate="no">/mnt/nvme</code> 에서 디스크를 사용할 수 있는지 확인합니다.</p></li>
<li><p><strong>컨테이너 구성 업데이트.</strong></p>
<p>새 마운트를 컨테이너 스토리지의 루트 디렉터리로 사용하도록 컨테이너 구성을 수정합니다.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">mkdir</span> -p /mnt/nvme/containerd /mnt/nvme/containerd/state
<span class="hljs-built_in">sudo</span> vim /etc/containerd/config.toml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</code> 섹션을 찾아 <code translate="no">snapshotter</code> 및 <code translate="no">root</code> 설정을 다음과 같이 수정합니다.</p>
<pre><code translate="no" class="language-toml">[<span class="hljs-meta">plugins.<span class="hljs-string">&quot;io.containerd.grpc.v1.cri&quot;</span>.containerd</span>]
snapshotter = <span class="hljs-string">&quot;overlayfs&quot;</span>
root = <span class="hljs-string">&quot;/mnt/nvme/containerd&quot;</span>
state = <span class="hljs-string">&quot;/mnt/nvme/containerd/state&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>컨테이너를 다시 시작합니다.</strong></p>
<p>컨테이너 서비스를 다시 시작하여 변경 사항을 적용합니다.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart containerd
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-disk-performance" class="common-anchor-header">디스크 성능 확인<button data-href="#Verify-disk-performance" class="anchor-icon" translate="no">
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
    </button></h2><p>디스크 성능을 벤치마킹하는 데 널리 사용되는 도구인 <a href="https://github.com/axboe/fio">Fio를</a> 사용하여 디스크 성능을 확인하는 것이 좋습니다. 다음은 Fio를 실행하여 디스크 성능을 테스트하는 방법의 예시입니다.</p>
<ul>
<li><p><strong>NVMe 디스크가 있는 노드에 테스트 파드를 배포합니다.</strong></p>
<pre><code translate="no" class="language-bash">kubectl create -f ubuntu.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ubuntu.yaml</code> 파일은 다음과 같습니다:</p>
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
<li><p><strong>Fio를 실행하여 디스크 성능을 테스트합니다.</strong></p>
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
<p>출력은 다음과 같아야 합니다:</p>
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
<h2 id="Deploy-Milvus-Distributed" class="common-anchor-header">Milvus 배포 배포<button data-href="#Deploy-Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>확인 결과가 만족스러우면 다음 단계에 따라 Milvus Distributed를 배포할 수 있습니다:</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Helm" class="common-anchor-header">헬름을 사용하여 밀버스 디스트리뷰티드 배포를 위한 팁</h3><p>쿼리노드 파드는 기본적으로 NVMe 디스크를 EmptyDir 볼륨으로 사용한다. 최적의 성능을 보장하려면 NVMe 디스크를 쿼리노드 파드 내의 <code translate="no">/var/lib/milvus/data</code> 에 마운트하는 것이 좋다.</p>
<p>헬름을 사용하여 밀버스 디스트리뷰션을 배포하는 방법에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/install_cluster-helm.md">헬름으로 쿠버네티스에서 밀버스 실행하기를</a> 참조한다.</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Milvus-Operator" class="common-anchor-header">밀버스 오퍼레이터를 사용하여 밀버스 디스트리뷰티드 배포를 위한 팁</h3><p>밀버스 오퍼레이터는 NVMe 디스크를 EmptyDir 볼륨으로 사용하도록 쿼리노드 파드를 자동으로 구성한다. <code translate="no">MilvusCluster</code> 사용자 정의 리소스에 다음 구성을 추가하는 것이 좋습니다:</p>
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
<p>이렇게 하면 쿼리노드 파드가 NVMe 디스크를 데이터 볼륨으로 사용하게 됩니다. 밀버스 오퍼레이터를 사용하여 밀버스 디스트리뷰션을 배포하는 방법에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/install_cluster-milvusoperator.md">밀버스 오퍼레이터로 쿠버네티스에서 밀버스 실행하기를</a> 참조한다.</p>
