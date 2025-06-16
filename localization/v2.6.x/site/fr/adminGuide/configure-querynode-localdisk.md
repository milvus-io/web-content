---
id: configure-querynode-localdisk.md
title: Configuration de Milvus QueryNode avec un disque local
related_key: 'querynode, query node, local disk'
summary: Découvrez comment configurer Milvus QueryNode pour utiliser le disque local.
---
<h1 id="Configure-Milvus-QueryNode-with-Local-Disk" class="common-anchor-header">Configuration de Milvus QueryNode avec un disque local<button data-href="#Configure-Milvus-QueryNode-with-Local-Disk" class="anchor-icon" translate="no">
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
    </button></h1><p>Cet article décrit comment configurer Milvus QueryNode pour utiliser le stockage sur disque local.</p>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus est une base de données vectorielle axée sur l'IA et conçue pour le stockage et la récupération efficaces de grandes quantités de données vectorielles. Elle est idéale pour des tâches telles que l'analyse d'images et de vidéos, le traitement du langage naturel et les systèmes de recommandation. Pour garantir des performances optimales, il est essentiel de minimiser la latence de lecture du disque. L'utilisation de disques SSD NVMe locaux est fortement recommandée pour éviter les retards et maintenir la stabilité du système.</p>
<p>Les principales caractéristiques où le stockage sur disque local entre en jeu sont les suivantes :</p>
<ul>
<li><a href="/docs/fr/chunk_cache.md"><strong>Cache de morceaux</strong></a>: Précharge les données dans le cache du disque local pour une recherche plus rapide.</li>
<li><a href="/docs/fr/mmap.md"><strong>MMap</strong></a>: Mappage du contenu des fichiers directement dans la mémoire pour une meilleure efficacité de la mémoire.</li>
<li><a href="/docs/fr/disk_index.md"><strong>Index DiskANN</strong></a>: Nécessite un stockage sur disque pour une gestion efficace de l'index.</li>
</ul>
<p>Dans cet article, nous nous concentrerons sur le déploiement de <a href="/docs/fr/install-overview.md#Milvus-Distributed">Milvus Distributed</a> sur des plates-formes en nuage et sur la manière de configurer le QueryNode pour utiliser le stockage sur disque NVMe. Le tableau suivant répertorie les types de machines recommandés par les différents fournisseurs de cloud.</p>
<table>
<thead>
<tr><th style="text-align:center">Fournisseur de cloud</th><th style="text-align:center">Type de machine</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">AWS</td><td style="text-align:center">Série R6id</td></tr>
<tr><td style="text-align:center">GCP</td><td style="text-align:center">Série N2</td></tr>
<tr><td style="text-align:center">Azure</td><td style="text-align:center">Série Lsv3</td></tr>
<tr><td style="text-align:center">Alibaba Cloud</td><td style="text-align:center">Série i3</td></tr>
<tr><td style="text-align:center">Tencent Cloud</td><td style="text-align:center">Série IT5</td></tr>
</tbody>
</table>
<p>Ces types de machines offrent un stockage sur disque NVMe. Vous pouvez utiliser la commande <code translate="no">lsblk</code> sur les instances de ces types de machines pour vérifier si elles disposent d'un stockage sur disque NVMe. Si c'est le cas, vous pouvez passer à l'étape suivante.</p>
<pre><code translate="no" class="language-bash">$ lsblk | grep nvme
nvme0n1     259:0    0 250.0G  0 disk 
nvme1n1     259:1    0 250.0G  0 disk 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kubernetes-to-use-local-disk" class="common-anchor-header">Configurer Kubernetes pour utiliser le disque local<button data-href="#Configure-Kubernetes-to-use-local-disk" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour configurer le QueryNode de Milvus Distributed afin d'utiliser le stockage sur disque NVMe, vous devez configurer les nœuds de travail des clusters Kubernetes cibles afin de stocker les conteneurs et les images sur un disque NVMe. La procédure à suivre varie en fonction des fournisseurs de cloud.</p>
<h3 id="AWS" class="common-anchor-header">AWS</h3><p>Lorsque vous utilisez Amazon EKS, vous pouvez personnaliser les nœuds gérés avec des modèles de lancement, dans lesquels vous pouvez spécifier des paramètres de configuration pour vos groupes de nœuds. Voici un exemple de montage d'un disque NVMe sur les nœuds de travail de votre cluster Amazon EKS :</p>
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
<p>Dans l'exemple ci-dessus, nous supposons que le disque NVMe est <code translate="no">/dev/nvme1n1</code>. Vous devez modifier le script pour qu'il corresponde à votre configuration spécifique.</p>
</div>
<p>Pour plus d'informations, voir <a href="https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#launch-template-user-data">Personnaliser les nœuds gérés avec des modèles de lancement</a>.</p>
<h3 id="GCP" class="common-anchor-header">GCP</h3><p>Pour provisionner le stockage SSD local sur les clusters Google Kubernetes Engine (GKE) et configurer les charges de travail pour qu'elles consomment des données à partir du stockage éphémère soutenu par SSD local attaché aux nœuds de votre cluster, exécutez la commande suivante :</p>
<pre><code translate="no" class="language-bash">gcloud container node-pools create <span class="hljs-variable">${POOL_NAME}</span> \
    --cluster=<span class="hljs-variable">${CLUSTER_NAME}</span> \
    --ephemeral-storage-local-ssd count=<span class="hljs-variable">${NUMBER_OF_DISKS}</span> \
    --machine-type=<span class="hljs-variable">${MACHINE_TYPE}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus de détails, voir <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd">Provisionnement du stockage SSD local sur GKE</a>.</p>
<h3 id="Azure" class="common-anchor-header">Azure</h3><p>Pour créer un ensemble de machines virtuelles (VMSS) avec un stockage sur disque NVMe local, vous devez transmettre des données personnalisées aux instances de machines virtuelles. L'exemple suivant montre comment attacher un disque NVMe aux instances VM dans le VMSS :</p>
<pre><code translate="no" class="language-bash">mdadm -Cv /dev/md0 -l0 -n2 /dev/nvme0n1 /dev/nvme1n1
mdadm -Ds &gt; /etc/mdadm/mdadm.conf 
update-initramfs -u

mkfs.xfs /dev/md0
<span class="hljs-built_in">mkdir</span> -p /var/lib/kubelet
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;/dev/md0 /var/lib/kubelet xfs defaults 0 0&#x27;</span> &gt;&gt; /etc/fstab
mount -a
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Dans l'exemple ci-dessus, nous supposons que les disques NVMe sont <code translate="no">/dev/nvme0n1</code> et <code translate="no">/dev/nvme1n1</code>. Vous devez modifier le script pour qu'il corresponde à votre configuration spécifique.</p>
</div>
<h3 id="Alibaba-Cloud--TecentCloud" class="common-anchor-header">Alibaba Cloud &amp; TecentCloud</h3><p>Pour créer un pool de nœuds qui utilise des volumes SSD locaux, nous devons passer des données personnalisées. Voici un exemple de données personnalisées.</p>
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
<p>Dans l'exemple ci-dessus, nous supposons que le disque NVMe est <code translate="no">/dev/nvme0n1</code>. Vous devez modifier le script pour qu'il corresponde à votre configuration spécifique.</p>
</div>
<h3 id="Your-own-IDC" class="common-anchor-header">Votre propre IDC</h3><p>Si vous exécutez votre propre IDC et souhaitez configurer vos conteneurs pour qu'ils utilisent par défaut dans containerd le système de fichiers d'un disque NVMe nouvellement monté, procédez comme suit :</p>
<ul>
<li><p><strong>Montez les disques NVMe.</strong></p>
<p>Assurez-vous que votre disque NVMe est correctement monté sur votre machine hôte. Vous pouvez le monter dans un répertoire de votre choix. Par exemple, si vous le montez sur <code translate="no">/mnt/nvme</code>, assurez-vous qu'il est correctement configuré et que vous pouvez voir le disque disponible sur <code translate="no">/mnt/nvme</code> en exécutant <code translate="no">lsblk</code> ou <code translate="no">df -h</code>.</p></li>
<li><p><strong>Mettre à jour la configuration de containerd.</strong></p>
<p>Modifiez la configuration de containerd pour utiliser le nouveau montage comme répertoire racine pour le stockage des conteneurs.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">mkdir</span> -p /mnt/nvme/containerd /mnt/nvme/containerd/state
<span class="hljs-built_in">sudo</span> vim /etc/containerd/config.toml
<button class="copy-code-btn"></button></code></pre>
<p>Localisez la section <code translate="no">[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</code>, et modifiez les paramètres <code translate="no">snapshotter</code> et <code translate="no">root</code> comme suit：</p>
<pre><code translate="no" class="language-toml"><span class="hljs-section">[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</span>
<span class="hljs-attr">snapshotter</span> = <span class="hljs-string">&quot;overlayfs&quot;</span>
<span class="hljs-attr">root</span> = <span class="hljs-string">&quot;/mnt/nvme/containerd&quot;</span>
<span class="hljs-attr">state</span> = <span class="hljs-string">&quot;/mnt/nvme/containerd/state&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Redémarrez containerd.</strong></p>
<p>Redémarrez le service containerd pour appliquer les modifications.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart containerd
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-disk-performance" class="common-anchor-header">Vérifier les performances du disque<button data-href="#Verify-disk-performance" class="anchor-icon" translate="no">
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
    </button></h2><p>Il est conseillé de vérifier les performances du disque à l'aide de <a href="https://github.com/axboe/fio">Fio</a>, un outil populaire d'évaluation des performances des disques. Voici un exemple d'exécution de Fio pour tester les performances du disque.</p>
<ul>
<li><p><strong>Déployez le pod de test sur le nœud avec le disque NVMe.</strong></p>
<pre><code translate="no" class="language-bash">kubectl create -f ubuntu.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Le fichier <code translate="no">ubuntu.yaml</code> est le suivant :</p>
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
<li><p><strong>Exécutez Fio pour tester les performances du disque.</strong></p>
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
<p>La sortie devrait ressembler à ceci :</p>
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
<h2 id="Deploy-Milvus-Distributed" class="common-anchor-header">Déployer Milvus Distribué<button data-href="#Deploy-Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que les résultats de la vérification sont satisfaisants, vous pouvez déployer Milvus Distributed en suivant les étapes suivantes :</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Helm" class="common-anchor-header">Conseils pour le déploiement de Milvus Distributed à l'aide de Helm</h3><p>Le pod QueryNode utilise par défaut des disques NVMe en tant que volumes EmptyDir. Il est conseillé de monter les disques NVMe sur <code translate="no">/var/lib/milvus/data</code> dans les pods QueryNode pour garantir des performances optimales.</p>
<p>Pour plus de détails sur le déploiement de Milvus Distributed à l'aide de Helm, voir <a href="/docs/fr/install_cluster-helm.md">Exécuter Milvus dans Kubernetes avec Helm</a>.</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Milvus-Operator" class="common-anchor-header">Conseils pour le déploiement de Milvus Distributed à l'aide de Milvus Operator</h3><p>Milvus Operator configure automatiquement le pod QueryNode pour utiliser des disques NVMe en tant que volumes EmptyDir. Il est conseillé d'ajouter les configurations suivantes à la ressource personnalisée <code translate="no">MilvusCluster</code>:</p>
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
<p>Cela garantira que le pod QueryNode utilise le disque NVMe comme volume de données. Pour plus de détails sur le déploiement de Milvus Distributed à l'aide de Milvus Operator, voir <a href="/docs/fr/install_cluster-milvusoperator.md">Exécuter Milvus dans Kubernetes avec Milvus Operator</a>.</p>
