---
id: aws.md
title: Menerapkan Cluster Milvus pada EC2
related_key: cluster
summary: Pelajari cara menggunakan cluster Milvus di AWS EC2.
---
<h1 id="Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="common-anchor-header">(Tidak lagi digunakan) Menerapkan Cluster Milvus pada EC2<button data-href="#Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menjelaskan cara menggunakan cluster Milvus di <a href="https://docs.aws.amazon.com/ec2/">Amazon EC2</a> dengan Terraform dan Ansible.</p>
<div class="alert note">
<p>Topik ini sudah usang dan akan segera dihapus. Anda disarankan untuk merujuk ke Menerapkan <a href="/docs/id/eks.md">Cluster Milvus pada EKS</a> sebagai gantinya.</p>
</div>
<h2 id="Provision-a-Milvus-cluster" class="common-anchor-header">Menyediakan cluster Milvus<button data-href="#Provision-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini menjelaskan cara menggunakan Terraform untuk menyediakan cluster Milvus.</p>
<p><a href="https://www.terraform.io/">Terraform</a> adalah alat perangkat lunak infrastruktur sebagai kode (IaC). Dengan Terraform, Anda dapat menyediakan infrastruktur dengan menggunakan file konfigurasi deklaratif.</p>
<h3 id="Prerequisites" class="common-anchor-header">Prasyarat</h3><ul>
<li><p>Menginstal dan mengonfigurasi <a href="https://www.terraform.io/downloads.html">Terraform</a></p></li>
<li><p>Menginstal dan mengonfigurasi <a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html">AWS CLI</a></p></li>
</ul>
<h3 id="Prepare-configuration" class="common-anchor-header">Siapkan konfigurasi</h3><p>Anda dapat mengunduh file konfigurasi template di <a href="https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view">Google Drive</a>.</p>
<ul>
<li><p><code translate="no">main.tf</code></p>
<p>File ini berisi konfigurasi untuk penyediaan cluster Milvus.</p></li>
<li><p><code translate="no">variables.tf</code></p>
<p>File ini memungkinkan pengeditan cepat variabel yang digunakan untuk menyiapkan atau memperbarui cluster Milvus.</p></li>
<li><p><code translate="no">output.tf</code> dan <code translate="no">inventory.tmpl</code></p>
<p>File-file ini menyimpan metadata dari cluster Milvus. Metadata yang digunakan dalam topik ini adalah <code translate="no">public_ip</code> untuk setiap instance node, <code translate="no">private_ip</code> untuk setiap instance node, dan semua ID instance EC2.</p></li>
</ul>
<h4 id="Prepare-variablestf" class="common-anchor-header">Menyiapkan variabel.tf</h4><p>Bagian ini menjelaskan konfigurasi yang berisi file <code translate="no">variables.tf</code>.</p>
<ul>
<li><p>Jumlah node</p>
<p>Templat berikut ini mendeklarasikan variabel <code translate="no">index_count</code> yang digunakan untuk mengatur jumlah simpul indeks.</p>
  <div class="alert note">Nilai <code translate="no">index_count</code> harus lebih besar atau sama dengan satu.</div>
<pre><code translate="no" class="language-variables.tf">variable &quot;index_count&quot; {
  description = &quot;Amount of index instances to run&quot;
  type        = number
  default     = 5
}
</code></pre></li>
<li><p>Jenis contoh untuk jenis simpul</p>
<p>Templat berikut ini mendeklarasikan variabel <code translate="no">index_ec2_type</code> yang digunakan untuk mengatur <a href="https://aws.amazon.com/ec2/instance-types/">tipe instance</a> untuk node indeks.</p>
<pre><code translate="no" class="language-variables.tf">variable &quot;index_ec2_type&quot; {
  description = &quot;Which server type&quot;
  type        = string
  default     = &quot;c5.2xlarge&quot;
}
</code></pre></li>
<li><p>Izin akses</p>
<p>Templat berikut ini mendeklarasikan variabel <code translate="no">key_name</code> dan variabel <code translate="no">my_ip</code>. Variabel <code translate="no">key_name</code> mewakili kunci akses AWS. Variabel <code translate="no">my_ip</code> mewakili rentang alamat IP untuk grup keamanan.</p>
<pre><code translate="no" class="language-variables.tf">variable &quot;key_name&quot; {
  description = &quot;Which aws key to use for access into instances, needs to be uploaded already&quot;
  type        = string
  default     = &quot;&quot;
}

variable &quot;my_ip&quot; {
  description = &quot;my_ip for security group. used so that ansible and terraform can ssh in&quot;
  type        = string
  default     = &quot;x.x.x.x/32&quot;
}
</code></pre></li>
</ul>
<h4 id="Prepare-maintf" class="common-anchor-header">Menyiapkan main.tf</h4><p>Bagian ini menjelaskan konfigurasi yang berisi file <code translate="no">main.tf</code>.</p>
<ul>
<li><p>Penyedia dan wilayah cloud</p>
<p>Templat berikut ini menggunakan wilayah <code translate="no">us-east-2</code>. Lihat <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions">Wilayah yang Tersedia</a> untuk informasi lebih lanjut.</p>
<pre><code translate="no" class="language-main.tf">provider &quot;aws&quot; {
  profile = &quot;default&quot;
  region  = &quot;us-east-2&quot;
}
</code></pre></li>
<li><p>Grup keamanan</p>
<p>Templat berikut ini mendeklarasikan grup keamanan yang mengizinkan lalu lintas masuk dari rentang alamat CIDR yang diwakili oleh <code translate="no">my_ip</code> yang dideklarasikan di <code translate="no">variables.tf</code>.</p>
<pre><code translate="no" class="language-main.tf">resource &quot;aws_security_group&quot; &quot;cluster_sg&quot; {
  name        = &quot;cluster_sg&quot;
  description = &quot;Allows only me to access&quot;
  vpc_id      = aws_vpc.cluster_vpc.id

  ingress {
    description      = &quot;All ports from my IP&quot;
    from_port        = 0
    to_port          = 65535
    protocol         = &quot;tcp&quot;
    cidr_blocks      = [var.my_ip]
  }

  ingress {
    description      = &quot;Full subnet communication&quot;
    from_port        = 0
    to_port          = 65535
    protocol         = &quot;all&quot;
    self             = true
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = &quot;-1&quot;
    cidr_blocks      = [&quot;0.0.0.0/0&quot;]
    ipv6_cidr_blocks = [&quot;::/0&quot;]
  }

  tags = {
    Name = &quot;cluster_sg&quot;
  }
}
</code></pre></li>
<li><p>VPC</p>
<p>Templat berikut menentukan VPC dengan blok CIDR 10.0.0.0/24 pada cluster Milvus.</p>
<pre><code translate="no" class="language-main.tf">resource &quot;aws_vpc&quot; &quot;cluster_vpc&quot; {
  cidr_block = &quot;10.0.0.0/24&quot;
  tags = {
    Name = &quot;cluster_vpc&quot;
  }
}

resource &quot;aws_internet_gateway&quot; &quot;cluster_gateway&quot; {
  vpc_id = aws_vpc.cluster_vpc.id

  tags = {
    Name = &quot;cluster_gateway&quot;
  }
}
</code></pre></li>
<li><p>Subnet (Opsional)</p>
<p>Templat berikut ini mendeklarasikan subnet yang trafiknya dialihkan ke gateway internet. Dalam kasus ini, ukuran blok CIDR subnet sama dengan blok CIDR VPC.</p>
<pre><code translate="no" class="language-main.tf">resource &quot;aws_subnet&quot; &quot;cluster_subnet&quot; {
  vpc_id                  = aws_vpc.cluster_vpc.id
  cidr_block              = &quot;10.0.0.0/24&quot;
  map_public_ip_on_launch = true

  tags = {
    Name = &quot;cluster_subnet&quot;
  }
}

resource &quot;aws_route_table&quot; &quot;cluster_subnet_gateway_route&quot; {
  vpc_id       = aws_vpc.cluster_vpc.id

  route {
    cidr_block = &quot;0.0.0.0/0&quot;
    gateway_id = aws_internet_gateway.cluster_gateway.id
  }

  tags = {
    Name = &quot;cluster_subnet_gateway_route&quot;
  }
}

resource &quot;aws_route_table_association&quot; &quot;cluster_subnet_add_gateway&quot; {
  subnet_id      = aws_subnet.cluster_subnet.id
  route_table_id = aws_route_table.cluster_subnet_gateway_route.id
}

</code></pre></li>
<li><p>Instance node (Node)</p>
<p>Templat berikut ini mendeklarasikan instance node MinIO. File template <code translate="no">main.tf</code> mendeklarasikan node dari 11 jenis node. Untuk beberapa jenis node, Anda perlu mengatur <code translate="no">root_block_device</code>. Lihat <a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#ebs-ephemeral-and-root-block-devices">Perangkat EBS, Ephemeral, dan Root Block</a> untuk informasi lebih lanjut.</p>
<pre><code translate="no" class="language-main.tf">resource &quot;aws_instance&quot; &quot;minio_node&quot; {
  count         = var.minio_count
  ami           = &quot;ami-0d8d212151031f51c&quot;
  instance_type = var.minio_ec2_type
  key_name      = var.key_name
  subnet_id     = aws_subnet.cluster_subnet.id 
  vpc_security_group_ids = [aws_security_group.cluster_sg.id]

  root_block_device {
    volume_type = &quot;gp2&quot;
    volume_size = 1000
  }
  
  tags = {
    Name = &quot;minio-${count.index + 1}&quot;
  }
}
</code></pre></li>
</ul>
<h3 id="Apply-the-configuration" class="common-anchor-header">Menerapkan konfigurasi</h3><ol>
<li><p>Buka terminal dan arahkan ke folder yang menyimpan <code translate="no">main.tf</code>.</p></li>
<li><p>Untuk menginisialisasi konfigurasi, jalankan <code translate="no">terraform init</code>.</p></li>
<li><p>Untuk menerapkan konfigurasi, jalankan <code translate="no">terraform apply</code> dan masukkan <code translate="no">yes</code> saat diminta.</p></li>
</ol>
<p>Anda sekarang telah menyediakan cluster Milvus dengan Terraform.</p>
<h2 id="Start-the-Milvus-cluster" class="common-anchor-header">Memulai cluster Milvus<button data-href="#Start-the-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Bagian ini menjelaskan cara menggunakan Ansible untuk memulai cluster Milvus yang telah Anda sediakan.</p>
<p><a href="https://www.ansible.com/overview/how-ansible-works">Ansible</a> adalah alat manajemen konfigurasi yang digunakan untuk mengotomatiskan penyediaan cloud dan manajemen konfigurasi.</p>
<h3 id="Prerequisites" class="common-anchor-header">Prasyarat</h3><ul>
<li><a href="https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html">Pengontrol Ansible</a> telah diinstal.</li>
</ul>
<h3 id="Download-Ansible-Milvus-node-deployment-Playbook" class="common-anchor-header">Unduh Panduan Penyebaran Node Ansible Milvus</h3><p>Kloning repositori Milvus dari GitHub untuk mengunduh Playbook penyebaran node Ansible Milvus.</p>
<pre><code translate="no">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/milvus.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configure-installation-files" class="common-anchor-header">Mengonfigurasi file instalasi</h3><p>File <code translate="no">inventory.ini</code> dan <code translate="no">ansible.cfg</code> digunakan untuk mengontrol variabel lingkungan dan metode verifikasi masuk di Ansible playbook. Dalam berkas <code translate="no">inventory.ini</code>, bagian <code translate="no">dockernodes</code> mendefinisikan semua server mesin docker. Bagian <code translate="no">ansible.cfg</code> mendefinisikan semua server koordinator Milvus. Bagian <code translate="no">node</code> mendefinisikan semua server dari simpul Milvus.</p>
<p>Masukkan jalur lokal ke Playbook dan konfigurasikan berkas instalasi.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> ./milvus/deployments/docker/cluster-distributed-deployment</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="inventoryini" class="common-anchor-header"><code translate="no">inventory.ini</code></h4><p>Konfigurasikan <code translate="no">inventory.ini</code> untuk membagi host dalam kelompok sesuai dengan perannya dalam sistem Milvus.</p>
<p>Tambahkan nama host, dan tentukan grup <code translate="no">docker</code> dan <code translate="no">vars</code>.</p>
<pre><code translate="no">[dockernodes] <span class="hljs-comment">#Add docker host names.</span>
dockernode01
dockernode02
dockernode03

[admin] <span class="hljs-comment">#Add Ansible controller name.</span>
ansible-controller

[coords] <span class="hljs-comment">#Add the host names of Milvus coordinators.</span>
; Take note the IP of this host VM, and replace 10.170.0.17 with it.
dockernode01

[nodes] <span class="hljs-comment">#Add the host names of Milvus nodes.</span>
dockernode02

[dependencies] <span class="hljs-comment">#Add the host names of Milvus dependencies.</span>
; dependencies node will host etcd, minio, pulsar, these 3 roles are the foundation of Milvus. 
; Take note the IP of this host VM, and replace 10.170.0.19 with it.
dockernode03

<span class="hljs-section">[docker:children]</span>
dockernodes
coords
nodes
dependencies

<span class="hljs-section">[docker:vars]</span>
ansible_python_interpreter= /usr/bin/python3
StrictHostKeyChecking= no

; Setup variables to control what type of network to use when creating containers.
dependencies_network= host
nodes_network= host

; Setup varibale to control what version of Milvus image to use.
image= milvusdb/milvus-dev:master-20220412-4781db8a

; Setup static IP addresses of the docker hosts as variable for container environment variable config.
; Before running the playbook, below 4 IP addresses need to be replaced with the IP of your host VM
; on which the etcd, minio, pulsar, coordinators will be hosted.
etcd_ip= 10.170.0.19
minio_ip= 10.170.0.19
pulsar_ip= 10.170.0.19
coords_ip= 10.170.0.17

; Setup container environment which later will be used in container creation.
ETCD_ENDPOINTS= {{etcd_ip}}:2379 
MINIO_ADDRESS= {{minio_ip}}:9000
PULSAR_ADDRESS= pulsar://{{pulsar_ip}}:6650
QUERY_COORD_ADDRESS= {{coords_ip}}:19531
DATA_COORD_ADDRESS= {{coords_ip}}:13333
ROOT_COORD_ADDRESS= {{coords_ip}}:53100
INDEX_COORD_ADDRESS= {{coords_ip}}:31000
<button class="copy-code-btn"></button></code></pre>
<h4 id="ansiblecfg" class="common-anchor-header"><code translate="no">ansible.cfg</code></h4><p><code translate="no">ansible.cfg</code> mengontrol aksi dari playbook, misalnya, kunci SSH, dll. Jangan mengatur kata sandi melalui kunci SSH pada hos docker. Jika tidak, koneksi SSH Ansible akan gagal. Kami menyarankan untuk menyiapkan nama pengguna dan kunci SSH yang sama pada tiga hos dan menyiapkan akun pengguna baru untuk menjalankan sudo tanpa kata sandi. Jika tidak, Anda akan menerima kesalahan bahwa nama pengguna tidak cocok dengan kata sandi atau Anda tidak diberikan hak istimewa yang lebih tinggi saat menjalankan panduan Ansible.</p>
<pre><code translate="no"><span class="hljs-section">[defaults]</span>
<span class="hljs-attr">host_key_checking</span> = <span class="hljs-literal">False</span>
<span class="hljs-attr">inventory</span> = inventory.ini <span class="hljs-comment"># Specify the Inventory file</span>
<span class="hljs-attr">private_key_file</span>=~/.my_ssh_keys/gpc_sshkey <span class="hljs-comment"># Specify the SSH key that Ansible uses to access Docker host</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="deploy-dockeryml" class="common-anchor-header"><code translate="no">deploy-docker.yml</code></h4><p><code translate="no">deploy-docker.yml</code> mendefinisikan tugas selama penginstalan Docker. Lihat komentar kode dalam berkas untuk detailnya.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-meta">---</span>
<span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">setup</span> <span class="hljs-string">pre-requisites</span> <span class="hljs-comment"># Install prerequisite</span>
  <span class="hljs-attr">hosts:</span> <span class="hljs-string">all</span>
  <span class="hljs-attr">become:</span> <span class="hljs-literal">yes</span>
  <span class="hljs-attr">become_user:</span> <span class="hljs-string">root</span>
  <span class="hljs-attr">roles:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">install-modules</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">configure-hosts-file</span>

<span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">install</span> <span class="hljs-string">docker</span>
  <span class="hljs-attr">become:</span> <span class="hljs-literal">yes</span>
  <span class="hljs-attr">become_user:</span> <span class="hljs-string">root</span>
  <span class="hljs-attr">hosts:</span> <span class="hljs-string">dockernodes</span>
  <span class="hljs-attr">roles:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">docker-installation</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Test-Ansible-connectivity" class="common-anchor-header">Menguji konektivitas Ansible</h3><p>Uji konektivitas ke Ansible.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible all -m ping</span>
<button class="copy-code-btn"></button></code></pre>
<p>Tambahkan <code translate="no">-i</code> pada perintah untuk menentukan jalur ke berkas inventori jika Anda tidak menentukannya di <code translate="no">ansible.cfg</code>, jika tidak, Ansible menggunakan <code translate="no">/etc/ansible/hosts</code>.</p>
<p>Terminal kembali sebagai berikut:</p>
<pre><code translate="no">dockernode01 | <span class="hljs-function"><span class="hljs-params">SUCCESS</span> =&gt;</span> {
<span class="hljs-string">&quot;changed&quot;</span>: <span class="hljs-literal">false</span>,
<span class="hljs-string">&quot;ping&quot;</span>: <span class="hljs-string">&quot;pong&quot;</span>
}
ansible-controller | <span class="hljs-function"><span class="hljs-params">SUCCESS</span> =&gt;</span> {
    <span class="hljs-string">&quot;ansible_facts&quot;</span>: {
        <span class="hljs-string">&quot;discovered_interpreter_python&quot;</span>: <span class="hljs-string">&quot;/usr/bin/python3&quot;</span>
    },
    <span class="hljs-string">&quot;changed&quot;</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-string">&quot;ping&quot;</span>: <span class="hljs-string">&quot;pong&quot;</span>
}
dockernode03 | <span class="hljs-function"><span class="hljs-params">SUCCESS</span> =&gt;</span> {
    <span class="hljs-string">&quot;changed&quot;</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-string">&quot;ping&quot;</span>: <span class="hljs-string">&quot;pong&quot;</span>
}
dockernode02 | <span class="hljs-function"><span class="hljs-params">SUCCESS</span> =&gt;</span> {
    <span class="hljs-string">&quot;changed&quot;</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-string">&quot;ping&quot;</span>: <span class="hljs-string">&quot;pong&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Check-the-Playbook-Syntax" class="common-anchor-header">Periksa Sintaks Playbook</h3><p>Periksa sintaks Playbook.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-docker.yml --syntax-check</span>
<button class="copy-code-btn"></button></code></pre>
<p>Biasanya, terminal akan kembali sebagai berikut:</p>
<pre><code translate="no"><span class="hljs-section">playbook: deploy-docker.yml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-Docker" class="common-anchor-header">Instal Docker</h3><p>Instal Docker dengan Playbook.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-docker.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Jika Docker berhasil diinstal pada ketiga hos, terminal akan menampilkan tampilan berikut:</p>
<pre><code translate="no">TASK [docker-installation : Install Docker-CE] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">***
ok: [dockernode01]
ok: [dockernode03]
ok: [dockernode02]

TASK [docker-installation : Install python3-docker] **</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>
ok: [dockernode01]
ok: [dockernode02]
ok: [dockernode03]

TASK [docker-installation : Install docker-compose python3 library] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>**
changed: [dockernode01]
changed: [dockernode03]
changed: [dockernode02]

PLAY RECAP <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">***
ansible-controller         : ok=3    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
dockernode01               : ok=10   changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
dockernode02               : ok=10   changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
dockernode03               : ok=10   changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
</span><button class="copy-code-btn"></button></code></pre>
<h3 id="Verify-the-installation" class="common-anchor-header">Verifikasi penginstalan</h3><p>Masuk ke tiga hos dengan kunci SSH, dan verifikasi penginstalan pada hos.</p>
<ul>
<li>Untuk hos root:</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker -v</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Untuk hos non-root:</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker -v</span>
<button class="copy-code-btn"></button></code></pre>
<p>Biasanya, terminal akan menampilkan hasil sebagai berikut:</p>
<pre><code translate="no"><span class="hljs-attribute">Docker</span> version <span class="hljs-number">20</span>.<span class="hljs-number">10</span>.<span class="hljs-number">14</span>, build a224086
<button class="copy-code-btn"></button></code></pre>
<p>Periksa status kontainer yang sedang berjalan.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker ps</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Check-the-Syntax" class="common-anchor-header">Periksa Sintaks</h3><p>Periksa sintaks <code translate="no">deploy-milvus.yml</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-milvus.yml --syntax-check</span>
<button class="copy-code-btn"></button></code></pre>
<p>Biasanya, terminal akan menampilkan hasil sebagai berikut:</p>
<pre><code translate="no"><span class="hljs-section">playbook: deploy-milvus.yml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Milvus-container" class="common-anchor-header">Membuat kontainer Milvus</h3><p>Tugas untuk membuat kontainer Milvus didefinisikan di <code translate="no">deploy-milvus.yml</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-milvus.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Terminal kembali:</p>
<pre><code translate="no">PLAY [Create milvus-etcd, minio, pulsar] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>*

TASK [Gathering Facts] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>
ok: [dockernode03]

TASK [etcd] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">***
changed: [dockernode03]

TASK [pulsar] **</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">***
changed: [dockernode03]

TASK [minio] **</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>
changed: [dockernode03]

PLAY [Create milvus nodes] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>

TASK [Gathering Facts] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>
ok: [dockernode02]

TASK [querynode] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>**
changed: [dockernode02]

TASK [datanode] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">***
changed: [dockernode02]

TASK [indexnode] **</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>
changed: [dockernode02]

PLAY [Create milvus coords] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">***

TASK [Gathering Facts] **</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>**
ok: [dockernode01]

TASK [rootcoord] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>**
changed: [dockernode01]

TASK [datacoord] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>**
changed: [dockernode01]

TASK [querycoord] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>*
changed: [dockernode01]

TASK [indexcoord] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>*
changed: [dockernode01]

TASK [proxy] <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>**
changed: [dockernode01]

PLAY RECAP <span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span><span class="hljs-strong">****</span>
dockernode01               : ok=6    changed=5    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
dockernode02               : ok=4    changed=3    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
dockernode03               : ok=4    changed=3    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
<button class="copy-code-btn"></button></code></pre>
<p>Sekarang Anda telah menggunakan Milvus pada tiga hos.</p>
<h2 id="Stop-nodes" class="common-anchor-header">Menghentikan node<button data-href="#Stop-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menghentikan semua node setelah Anda tidak membutuhkan cluster Milvus lagi.</p>
<div class="alert note"> Pastikan bahwa biner <code translate="no">terraform</code> tersedia di <code translate="no">PATH</code>. </div>
<ol>
<li><p>Jalankan <code translate="no">terraform destroy</code> dan masukkan <code translate="no">yes</code> saat diminta.</p></li>
<li><p>Jika berhasil, semua instans node akan dihentikan.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">Apa selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Jika Anda ingin mempelajari cara men-deploy Milvus di cloud lain:</p>
<ul>
<li><a href="/docs/id/eks.md">Menerapkan Milvus Cluster di EKS</a></li>
<li><a href="/docs/id/gcp.md">Menerapkan Milvus Cluster di GCP dengan Kubernetes</a></li>
<li><a href="/docs/id/azure.md">Panduan untuk Menerapkan Milvus di Microsoft Azure dengan Kubernetes</a></li>
</ul>
