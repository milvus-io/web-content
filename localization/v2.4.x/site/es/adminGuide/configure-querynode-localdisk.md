---
id: configure-querynode-localdisk.md
title: Configurar Milvus QueryNode con disco local
related_key: 'querynode, query node, local disk'
summary: Aprenda a configurar Milvus QueryNode para utilizar el disco local.
---
<h1 id="Configure-Milvus-QueryNode-with-Local-Disk" class="common-anchor-header">Configurar Milvus QueryNode con disco local<button data-href="#Configure-Milvus-QueryNode-with-Local-Disk" class="anchor-icon" translate="no">
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
    </button></h1><p>Este artículo describe cómo configurar Milvus QueryNode para utilizar almacenamiento en disco local.</p>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus es una base de datos vectorial centrada en la Inteligencia Artificial diseñada para el almacenamiento y recuperación eficientes de grandes cantidades de datos vectoriales. Es ideal para tareas como el análisis de imágenes y vídeos, el procesamiento del lenguaje natural y los sistemas de recomendación. Para garantizar un rendimiento óptimo, es crucial minimizar la latencia de lectura del disco. El uso de unidades SSD NVMe locales es muy recomendable para evitar retrasos y mantener la estabilidad del sistema.</p>
<p>Entre las características clave en las que entra en juego el almacenamiento en disco local se incluyen:</p>
<ul>
<li><a href="/docs/es/v2.4.x/chunk_cache.md"><strong>Caché de trozos</strong></a>: Precarga los datos en la caché de disco local para una búsqueda más rápida.</li>
<li><a href="/docs/es/v2.4.x/mmap.md"><strong>MMap</strong></a>: Asigna el contenido de los archivos directamente a la memoria para mejorar la eficiencia de la memoria.</li>
<li><a href="/docs/es/v2.4.x/disk_index.md"><strong>Índice DiskANN</strong></a>: Requiere almacenamiento en disco para una gestión eficiente del índice.</li>
</ul>
<p>En este artículo, nos centraremos en el despliegue de <a href="/docs/es/v2.4.x/install-overview.md#Milvus-Distributed">Milvus Distributed</a> en plataformas en la nube y en cómo configurar el QueryNode para utilizar el almacenamiento en disco NVMe. La siguiente tabla enumera los tipos de máquina recomendados de varios proveedores de nube.</p>
<table>
<thead>
<tr><th style="text-align:center">Proveedor de nube</th><th style="text-align:center">Tipo de máquina</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">AWS</td><td style="text-align:center">Serie R6id</td></tr>
<tr><td style="text-align:center">GCP</td><td style="text-align:center">Serie N2</td></tr>
<tr><td style="text-align:center">Azure</td><td style="text-align:center">Serie Lsv3</td></tr>
<tr><td style="text-align:center">Nube Alibaba</td><td style="text-align:center">Serie i3</td></tr>
<tr><td style="text-align:center">Nube de Tencent</td><td style="text-align:center">Serie IT5</td></tr>
</tbody>
</table>
<p>Estos tipos de máquinas proporcionan almacenamiento en disco NVMe. Puede utilizar el comando <code translate="no">lsblk</code> en las instancias de estos tipos de máquinas para comprobar si disponen de almacenamiento en disco NVMe. Si lo tienen, puede continuar con el siguiente paso.</p>
<pre><code translate="no" class="language-bash">$ lsblk | grep nvme
nvme0n1     259:0    0 250.0G  0 disk 
nvme1n1     259:1    0 250.0G  0 disk 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kubernetes-to-use-local-disk" class="common-anchor-header">Configurar Kubernetes para utilizar el disco local<button data-href="#Configure-Kubernetes-to-use-local-disk" class="anchor-icon" translate="no">
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
    </button></h2><p>Para configurar el QueryNode de Milvus Distributed para que utilice almacenamiento en disco NVMe, debe configurar los nodos trabajadores de los clústeres Kubernetes de destino para que almacenen los contenedores y las imágenes en un disco NVMe. El procedimiento para ello varía en función de los proveedores de nube.</p>
<h3 id="AWS" class="common-anchor-header">AWS</h3><p>Al utilizar Amazon EKS, puede personalizar los nodos administrados con plantillas de lanzamiento, en las que puede especificar los ajustes de configuración para sus grupos de nodos. A continuación se muestra un ejemplo de cómo montar un disco NVMe en los nodos trabajadores de su clúster de Amazon EKS:</p>
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
<p>En el ejemplo anterior, suponemos que el disco NVMe es <code translate="no">/dev/nvme1n1</code>. Debe modificar el script para adaptarlo a su configuración específica.</p>
</div>
<p>Para obtener más información, consulte <a href="https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#launch-template-user-data">Personalización de nodos administrados con plantillas de lanzamiento</a>.</p>
<h3 id="GCP" class="common-anchor-header">GCP</h3><p>Para aprovisionar almacenamiento SSD local en clústeres Google Kubernetes Engine (GKE) y configurar las cargas de trabajo para que consuman datos del almacenamiento efímero respaldado por SSD local conectado a los nodos de su clúster, ejecute el siguiente comando:</p>
<pre><code translate="no" class="language-bash">gcloud container node-pools create <span class="hljs-variable">${POOL_NAME}</span> \
    --cluster=<span class="hljs-variable">${CLUSTER_NAME}</span> \
    --ephemeral-storage-local-ssd count=<span class="hljs-variable">${NUMBER_OF_DISKS}</span> \
    --machine-type=<span class="hljs-variable">${MACHINE_TYPE}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para obtener más información, consulte <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd">Aprovisionamiento de almacenamiento SSD local en GKE</a>.</p>
<h3 id="Azure" class="common-anchor-header">Azure</h3><p>Para crear un conjunto de escalado de máquinas virtuales (VMSS) con almacenamiento en disco NVMe local, debe pasar datos personalizados a las instancias de máquinas virtuales. A continuación se muestra un ejemplo de cómo adjuntar un disco NVMe a las instancias VM en el VMSS:</p>
<pre><code translate="no" class="language-bash">mdadm -Cv /dev/md0 -l0 -n2 /dev/nvme0n1 /dev/nvme1n1
mdadm -Ds &gt; /etc/mdadm/mdadm.conf 
update-initramfs -u

mkfs.xfs /dev/md0
<span class="hljs-built_in">mkdir</span> -p /var/lib/kubelet
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;/dev/md0 /var/lib/kubelet xfs defaults 0 0&#x27;</span> &gt;&gt; /etc/fstab
mount -a
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>En el ejemplo anterior, suponemos que los discos NVMe son <code translate="no">/dev/nvme0n1</code> y <code translate="no">/dev/nvme1n1</code>. Debe modificar el script para que se adapte a su configuración específica.</p>
</div>
<h3 id="Alibaba-Cloud--TecentCloud" class="common-anchor-header">Alibaba Cloud y TecentCloud</h3><p>Para crear un pool de nodos que utilice volúmenes SSD Locales, necesitamos pasar Datos Personalizados. El siguiente es un ejemplo de datos personalizados.</p>
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
<p>En el ejemplo anterior, asumimos que el disco NVMe es <code translate="no">/dev/nvme0n1</code>. Debe modificar la secuencia de comandos para adaptarla a su configuración específica.</p>
</div>
<h3 id="Your-own-IDC" class="common-anchor-header">Su propio IDC</h3><p>Si está ejecutando su propio IDC y desea configurar sus contenedores para que utilicen el sistema de archivos de un disco NVMe recién montado por defecto en containerd, siga estos pasos:</p>
<ul>
<li><p><strong>Monta los discos NVMe.</strong></p>
<p>Asegúrate de que tu disco NVMe está correctamente montado en tu máquina anfitriona. Puedes montarlo en un directorio de tu elección. Por ejemplo, si lo monta en <code translate="no">/mnt/nvme</code>, asegúrese de que está correctamente montado y de que puede ver el disco disponible en <code translate="no">/mnt/nvme</code> ejecutando <code translate="no">lsblk</code> o <code translate="no">df -h</code>.</p></li>
<li><p><strong>Actualiza la configuración de containerd.</strong></p>
<p>Modifica la configuración de containerd para utilizar el nuevo montaje como directorio raíz para el almacenamiento del contenedor.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">mkdir</span> -p /mnt/nvme/containerd /mnt/nvme/containerd/state
<span class="hljs-built_in">sudo</span> vim /etc/containerd/config.toml
<button class="copy-code-btn"></button></code></pre>
<p>Localice la sección <code translate="no">[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd]</code>, y modifique las configuraciones <code translate="no">snapshotter</code> y <code translate="no">root</code> como sigue：.</p>
<pre><code translate="no" class="language-toml">[<span class="hljs-meta">plugins.<span class="hljs-string">&quot;io.containerd.grpc.v1.cri&quot;</span>.containerd</span>]
snapshotter = <span class="hljs-string">&quot;overlayfs&quot;</span>
root = <span class="hljs-string">&quot;/mnt/nvme/containerd&quot;</span>
state = <span class="hljs-string">&quot;/mnt/nvme/containerd/state&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Reinicia containerd.</strong></p>
<p>Reinicie el servicio containerd para aplicar los cambios.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart containerd
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-disk-performance" class="common-anchor-header">Verificar el rendimiento del disco<button data-href="#Verify-disk-performance" class="anchor-icon" translate="no">
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
    </button></h2><p>Se recomienda verificar el rendimiento del disco utilizando <a href="https://github.com/axboe/fio">Fio</a>, que es una herramienta popular para la evaluación comparativa del rendimiento del disco. A continuación se muestra un ejemplo de cómo ejecutar Fio para comprobar el rendimiento del disco.</p>
<ul>
<li><p><strong>Despliegue el pod de prueba en el nodo con el disco NVMe.</strong></p>
<pre><code translate="no" class="language-bash">kubectl create -f ubuntu.yaml
<button class="copy-code-btn"></button></code></pre>
<p>El archivo <code translate="no">ubuntu.yaml</code> es el siguiente:</p>
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
<li><p><strong>Ejecute Fio para probar el rendimiento del disco.</strong></p>
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
<p>El resultado debería ser el siguiente</p>
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
<h2 id="Deploy-Milvus-Distributed" class="common-anchor-header">Despliegue Milvus Distributed<button data-href="#Deploy-Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que los resultados de la verificación sean satisfactorios, puede desplegar Milvus Distributed con los siguientes pasos:</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Helm" class="common-anchor-header">Consejos para desplegar Milvus Distributed utilizando Helm</h3><p>El pod QueryNode utiliza discos NVMe como volúmenes EmptyDir por defecto. Se recomienda montar discos NVMe en <code translate="no">/var/lib/milvus/data</code> dentro de los pods QueryNode para garantizar un rendimiento óptimo.</p>
<p>Para más detalles sobre cómo desplegar Milvus Distributed utilizando Helm, consulte <a href="/docs/es/v2.4.x/install_cluster-helm.md">Ejecutar Milvus en Kubernetes con Helm</a>.</p>
<h3 id="Tips-for-deploying-Milvus-Distributed-using-Milvus-Operator" class="common-anchor-header">Consejos para desplegar Milvus Distributed utilizando Milvus Operator</h3><p>Milvus Operator configura automáticamente el pod QueryNode para utilizar discos NVMe como volúmenes EmptyDir. Se recomienda añadir las siguientes configuraciones al recurso personalizado <code translate="no">MilvusCluster</code>:</p>
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
<p>Esto garantizará que el pod QueryNode utilice el disco NVMe como volumen de datos. Para más detalles sobre cómo desplegar Milvus Distributed utilizando Milvus <a href="/docs/es/v2.4.x/install_cluster-milvusoperator.md">Operator</a>, consulte <a href="/docs/es/v2.4.x/install_cluster-milvusoperator.md">Ejecutar Milvus en Kubernetes con Milvus Operator</a>.</p>
