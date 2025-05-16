---
id: aws.md
title: Einrichten eines Milvus-Clusters auf EC2
related_key: cluster
summary: 'Erfahren Sie, wie Sie einen Milvus-Cluster auf AWS EC2 bereitstellen.'
---
<h1 id="Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="common-anchor-header">(Veraltet) Einrichten eines Milvus-Clusters auf EC2<button data-href="#Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Thema beschreibt die Bereitstellung eines Milvus-Clusters auf <a href="https://docs.aws.amazon.com/ec2/">Amazon EC2</a> mit Terraform und Ansible.</p>
<div class="alert note">
<p>Dieses Thema ist veraltet und wird bald entfernt werden. Wir empfehlen Ihnen, stattdessen auf <a href="/docs/de/v2.4.x/eks.md">Deploy a Milvus Cluster on EKS</a> zu verweisen.</p>
</div>
<h2 id="Provision-a-Milvus-cluster" class="common-anchor-header">Bereitstellung eines Milvus-Clusters<button data-href="#Provision-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser Abschnitt beschreibt, wie Sie Terraform zur Bereitstellung eines Milvus-Clusters verwenden.</p>
<p><a href="https://www.terraform.io/">Terraform</a> ist ein Infrastructure as Code (IaC) Software-Tool. Mit Terraform können Sie Infrastrukturen mit Hilfe von deklarativen Konfigurationsdateien bereitstellen.</p>
<h3 id="Prerequisites" class="common-anchor-header">Voraussetzungen</h3><ul>
<li><p><a href="https://www.terraform.io/downloads.html">Terraform</a> installieren und konfigurieren</p></li>
<li><p><a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html">AWS CLI</a> installieren und konfigurieren</p></li>
</ul>
<h3 id="Prepare-configuration" class="common-anchor-header">Konfiguration vorbereiten</h3><p>Sie können Vorlagenkonfigurationsdateien bei <a href="https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view">Google Drive</a> herunterladen.</p>
<ul>
<li><p><code translate="no">main.tf</code></p>
<p>Diese Datei enthält die Konfiguration für die Bereitstellung eines Milvus-Clusters.</p></li>
<li><p><code translate="no">variables.tf</code></p>
<p>Diese Datei ermöglicht eine schnelle Bearbeitung der Variablen, die zum Einrichten oder Aktualisieren eines Milvus-Clusters verwendet werden.</p></li>
<li><p><code translate="no">output.tf</code> und <code translate="no">inventory.tmpl</code></p>
<p>Diese Dateien speichern die Metadaten eines Milvus-Clusters. Die in diesem Thema verwendeten Metadaten sind die <code translate="no">public_ip</code> für jede Knoteninstanz, <code translate="no">private_ip</code> für jede Knoteninstanz und alle EC2-Instanz-IDs.</p></li>
</ul>
<h4 id="Prepare-variablestf" class="common-anchor-header">Variablen vorbereiten.tf</h4><p>Dieser Abschnitt beschreibt die Konfiguration, die eine <code translate="no">variables.tf</code> Datei enthält.</p>
<ul>
<li><p>Anzahl der Knoten</p>
<p>Die folgende Vorlage deklariert eine <code translate="no">index_count</code> Variable, die verwendet wird, um die Anzahl der Indexknoten festzulegen.</p>
  <div class="alert note">Der Wert von <code translate="no">index_count</code> muss größer als oder gleich eins sein.</div>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;index_count&quot;</span> {
  description = <span class="hljs-string">&quot;Amount of index instances to run&quot;</span>
  <span class="hljs-keyword">type</span>        = number
  <span class="hljs-keyword">default</span>     = <span class="hljs-number">5</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Instanztyp für einen Knotentyp</p>
<p>Die folgende Vorlage deklariert eine <code translate="no">index_ec2_type</code> Variable, die verwendet wird, um den <a href="https://aws.amazon.com/ec2/instance-types/">Instanztyp</a> für Indexknoten festzulegen.</p>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;index_ec2_type&quot;</span> {
  description = <span class="hljs-string">&quot;Which server type&quot;</span>
  <span class="hljs-keyword">type</span>        = <span class="hljs-type">string</span>
  <span class="hljs-keyword">default</span>     = <span class="hljs-string">&quot;c5.2xlarge&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Zugriffsberechtigung</p>
<p>Die folgende Vorlage deklariert eine <code translate="no">key_name</code> Variable und eine <code translate="no">my_ip</code> Variable. Die Variable <code translate="no">key_name</code> steht für den AWS-Zugangsschlüssel. Die Variable <code translate="no">my_ip</code> stellt den IP-Adressbereich für eine Sicherheitsgruppe dar.</p>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;key_name&quot;</span> {
  description = <span class="hljs-string">&quot;Which aws key to use for access into instances, needs to be uploaded already&quot;</span>
  <span class="hljs-keyword">type</span>        = <span class="hljs-type">string</span>
  <span class="hljs-keyword">default</span>     = <span class="hljs-string">&quot;&quot;</span>
}

variable <span class="hljs-string">&quot;my_ip&quot;</span> {
  description = <span class="hljs-string">&quot;my_ip for security group. used so that ansible and terraform can ssh in&quot;</span>
  <span class="hljs-keyword">type</span>        = <span class="hljs-type">string</span>
  <span class="hljs-keyword">default</span>     = <span class="hljs-string">&quot;x.x.x.x/32&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h4 id="Prepare-maintf" class="common-anchor-header">main.tf vorbereiten</h4><p>Dieser Abschnitt beschreibt die Konfigurationen, die eine <code translate="no">main.tf</code> Datei enthält.</p>
<ul>
<li><p>Cloud-Anbieter und Region</p>
<p>Die folgende Vorlage verwendet die Region <code translate="no">us-east-2</code>. Siehe <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions">Verfügbare Regionen</a> für weitere Informationen.</p>
<pre><code translate="no" class="language-main.tf">provider <span class="hljs-string">&quot;aws&quot;</span> {
  profile = <span class="hljs-string">&quot;default&quot;</span>
  region  = <span class="hljs-string">&quot;us-east-2&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Sicherheitsgruppe</p>
<p>Die folgende Vorlage deklariert eine Sicherheitsgruppe, die eingehenden Datenverkehr aus dem CIDR-Adressbereich zulässt, der durch <code translate="no">my_ip</code> repräsentiert wird und in <code translate="no">variables.tf</code> deklariert ist.</p>
<pre><code translate="no" class="language-main.tf">resource <span class="hljs-string">&quot;aws_security_group&quot;</span> <span class="hljs-string">&quot;cluster_sg&quot;</span> {
  name        = <span class="hljs-string">&quot;cluster_sg&quot;</span>
  description = <span class="hljs-string">&quot;Allows only me to access&quot;</span>
  vpc_id      = aws_vpc.<span class="hljs-property">cluster_vpc</span>.<span class="hljs-property">id</span>

  ingress {
    description      = <span class="hljs-string">&quot;All ports from my IP&quot;</span>
    from_port        = <span class="hljs-number">0</span>
    to_port          = <span class="hljs-number">65535</span>
    protocol         = <span class="hljs-string">&quot;tcp&quot;</span>
    cidr_blocks      = [<span class="hljs-keyword">var</span>.<span class="hljs-property">my_ip</span>]
  }

  ingress {
    description      = <span class="hljs-string">&quot;Full subnet communication&quot;</span>
    from_port        = <span class="hljs-number">0</span>
    to_port          = <span class="hljs-number">65535</span>
    protocol         = <span class="hljs-string">&quot;all&quot;</span>
    self             = <span class="hljs-literal">true</span>
  }

  egress {
    from_port        = <span class="hljs-number">0</span>
    to_port          = <span class="hljs-number">0</span>
    protocol         = <span class="hljs-string">&quot;-1&quot;</span>
    cidr_blocks      = [<span class="hljs-string">&quot;0.0.0.0/0&quot;</span>]
    ipv6_cidr_blocks = [<span class="hljs-string">&quot;::/0&quot;</span>]
  }

  tags = {
    <span class="hljs-title class_">Name</span> = <span class="hljs-string">&quot;cluster_sg&quot;</span>
  }
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>VPC</p>
<p>Die folgende Vorlage legt eine VPC mit dem CIDR-Block 10.0.0.0/24 auf einem Milvus-Cluster fest.</p>
<pre><code translate="no" class="language-main.tf">resource <span class="hljs-string">&quot;aws_vpc&quot;</span> <span class="hljs-string">&quot;cluster_vpc&quot;</span> {
  cidr_block = <span class="hljs-string">&quot;10.0.0.0/24&quot;</span>
  tags = {
    Name = <span class="hljs-string">&quot;cluster_vpc&quot;</span>
  }
}

resource <span class="hljs-string">&quot;aws_internet_gateway&quot;</span> <span class="hljs-string">&quot;cluster_gateway&quot;</span> {
  vpc_id = aws_vpc.cluster_vpc.<span class="hljs-built_in">id</span>

  tags = {
    Name = <span class="hljs-string">&quot;cluster_gateway&quot;</span>
  }
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Subnetze (Optional)</p>
<p>Die folgende Vorlage deklariert ein Subnetz, dessen Verkehr an ein Internet-Gateway geleitet wird. In diesem Fall ist die Größe des CIDR-Blocks des Subnetzes die gleiche wie die des CIDR-Blocks des VPCs.</p>
<pre><code translate="no" class="language-main.tf">resource <span class="hljs-string">&quot;aws_subnet&quot;</span> <span class="hljs-string">&quot;cluster_subnet&quot;</span> {
  vpc_id                  = aws_vpc.cluster_vpc.<span class="hljs-built_in">id</span>
  cidr_block              = <span class="hljs-string">&quot;10.0.0.0/24&quot;</span>
  map_public_ip_on_launch = true

  tags = {
    Name = <span class="hljs-string">&quot;cluster_subnet&quot;</span>
  }
}

resource <span class="hljs-string">&quot;aws_route_table&quot;</span> <span class="hljs-string">&quot;cluster_subnet_gateway_route&quot;</span> {
  vpc_id       = aws_vpc.cluster_vpc.<span class="hljs-built_in">id</span>

  route {
    cidr_block = <span class="hljs-string">&quot;0.0.0.0/0&quot;</span>
    gateway_id = aws_internet_gateway.cluster_gateway.<span class="hljs-built_in">id</span>
  }

  tags = {
    Name = <span class="hljs-string">&quot;cluster_subnet_gateway_route&quot;</span>
  }
}

resource <span class="hljs-string">&quot;aws_route_table_association&quot;</span> <span class="hljs-string">&quot;cluster_subnet_add_gateway&quot;</span> {
  subnet_id      = aws_subnet.cluster_subnet.<span class="hljs-built_in">id</span>
  route_table_id = aws_route_table.cluster_subnet_gateway_route.<span class="hljs-built_in">id</span>
}

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Knoteninstanzen (Nodes)</p>
<p>Die folgende Vorlage deklariert eine MinIO-Knoteninstanz. Die Vorlagendatei <code translate="no">main.tf</code> deklariert Knoten von 11 Knotentypen. Für einige Knotentypen müssen Sie <code translate="no">root_block_device</code> einstellen. Weitere Informationen finden Sie unter <a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#ebs-ephemeral-and-root-block-devices">EBS, Ephemeral und Root Block Devices</a>.</p>
<pre><code translate="no" class="language-main.tf">resource <span class="hljs-string">&quot;aws_instance&quot;</span> <span class="hljs-string">&quot;minio_node&quot;</span> {
  count         = <span class="hljs-keyword">var</span>.<span class="hljs-type">minio_count</span>
  <span class="hljs-variable">ami</span>           <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ami-0d8d212151031f51c&quot;</span>
  instance_type = <span class="hljs-keyword">var</span>.<span class="hljs-type">minio_ec2_type</span>
  <span class="hljs-variable">key_name</span>      <span class="hljs-operator">=</span> <span class="hljs-keyword">var</span>.<span class="hljs-type">key_name</span>
  <span class="hljs-variable">subnet_id</span>     <span class="hljs-operator">=</span> aws_subnet.cluster_subnet.<span class="hljs-type">id</span> 
  <span class="hljs-variable">vpc_security_group_ids</span> <span class="hljs-operator">=</span> [aws_security_group.cluster_sg.id]

  root_block_device {
    volume_type = <span class="hljs-string">&quot;gp2&quot;</span>
    volume_size = <span class="hljs-number">1000</span>
  }
  
  tags = {
    Name = <span class="hljs-string">&quot;minio-${count.index + 1}&quot;</span>
  }
}
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Apply-the-configuration" class="common-anchor-header">Anwenden der Konfiguration</h3><ol>
<li><p>Öffnen Sie ein Terminal und navigieren Sie zu dem Ordner, in dem <code translate="no">main.tf</code> gespeichert ist.</p></li>
<li><p>Um die Konfiguration zu initialisieren, führen Sie <code translate="no">terraform init</code> aus.</p></li>
<li><p>Um die Konfiguration anzuwenden, führen Sie <code translate="no">terraform apply</code> aus und geben Sie <code translate="no">yes</code> ein, wenn Sie dazu aufgefordert werden.</p></li>
</ol>
<p>Sie haben nun einen Milvus-Cluster mit Terraform bereitgestellt.</p>
<h2 id="Start-the-Milvus-cluster" class="common-anchor-header">Starten des Milvus-Clusters<button data-href="#Start-the-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Abschnitt wird beschrieben, wie Sie Ansible verwenden, um den Milvus-Cluster zu starten, den Sie bereitgestellt haben.</p>
<p><a href="https://www.ansible.com/overview/how-ansible-works">Ansible</a> ist ein Konfigurationsmanagement-Tool, das zur Automatisierung der Cloud-Bereitstellung und des Konfigurationsmanagements verwendet wird.</p>
<h3 id="Prerequisites" class="common-anchor-header">Voraussetzungen</h3><ul>
<li><a href="https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html">Ansible Controller</a> ist installiert.</li>
</ul>
<h3 id="Download-Ansible-Milvus-node-deployment-Playbook" class="common-anchor-header">Download Ansible Milvus-Knotenbereitstellung Playbook</h3><p>Klonen Sie das Milvus-Repository von GitHub, um das Ansible Milvus Node Deployment Playbook herunterzuladen.</p>
<pre><code translate="no">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/milvus.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configure-installation-files" class="common-anchor-header">Konfigurieren Sie die Installationsdateien</h3><p>Die Dateien <code translate="no">inventory.ini</code> und <code translate="no">ansible.cfg</code> werden verwendet, um die Umgebungsvariablen und die Verifizierungsmethoden für die Anmeldung im Ansible-Playbook zu steuern. In der Datei <code translate="no">inventory.ini</code> werden im Abschnitt <code translate="no">dockernodes</code> alle Server der Docker-Engines definiert. Der Abschnitt <code translate="no">ansible.cfg</code> definiert alle Server der Milvus-Koordinatoren. Der Abschnitt <code translate="no">node</code> definiert alle Server der Milvus-Knoten.</p>
<p>Geben Sie den lokalen Pfad zum Playbook ein und konfigurieren Sie die Installationsdateien.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">cd</span> ./milvus/deployments/docker/cluster-distributed-deployment
<button class="copy-code-btn"></button></code></pre>
<h4 id="inventoryini" class="common-anchor-header"><code translate="no">inventory.ini</code></h4><p>Konfigurieren Sie <code translate="no">inventory.ini</code>, um die Hosts entsprechend ihrer Rolle im Milvus-System in Gruppen einzuteilen.</p>
<p>Fügen Sie Hostnamen hinzu, und definieren Sie die Gruppen <code translate="no">docker</code> und <code translate="no">vars</code>.</p>
<pre><code translate="no">[<span class="hljs-meta">dockernodes</span>] <span class="hljs-meta">#Add docker host names.</span>
dockernode01
dockernode02
dockernode03

[<span class="hljs-meta">admin</span>] <span class="hljs-meta">#Add Ansible controller name.</span>
ansible-controller

[<span class="hljs-meta">coords</span>] <span class="hljs-meta">#Add the host names of Milvus coordinators.</span>
; Take note the IP of <span class="hljs-keyword">this</span> host VM, <span class="hljs-keyword">and</span> replace <span class="hljs-number">10.170</span><span class="hljs-number">.0</span><span class="hljs-number">.17</span> <span class="hljs-keyword">with</span> it.
dockernode01

[<span class="hljs-meta">nodes</span>] <span class="hljs-meta">#Add the host names of Milvus nodes.</span>
dockernode02

[<span class="hljs-meta">dependencies</span>] <span class="hljs-meta">#Add the host names of Milvus dependencies.</span>
; dependencies node will host etcd, minio, pulsar, these <span class="hljs-number">3</span> roles are the foundation of Milvus. 
; Take note the IP of <span class="hljs-keyword">this</span> host VM, <span class="hljs-keyword">and</span> replace <span class="hljs-number">10.170</span><span class="hljs-number">.0</span><span class="hljs-number">.19</span> <span class="hljs-keyword">with</span> it.
dockernode03

[<span class="hljs-meta">docker:children</span>]
dockernodes
coords
nodes
dependencies

[<span class="hljs-meta">docker:vars</span>]
ansible_python_interpreter= /usr/bin/python3
StrictHostKeyChecking= no

; Setup variables to control what type of network to use <span class="hljs-keyword">when</span> creating containers.
dependencies_network= host
nodes_network= host

; Setup varibale to control what version of Milvus image to use.
image= milvusdb/milvus-dev:master<span class="hljs-number">-20220412</span><span class="hljs-number">-4781</span>db8a

; Setup <span class="hljs-keyword">static</span> IP addresses of the docker hosts <span class="hljs-keyword">as</span> variable <span class="hljs-keyword">for</span> container environment variable config.
; Before running the playbook, below <span class="hljs-number">4</span> IP addresses need to be replaced <span class="hljs-keyword">with</span> the IP of your host VM
; <span class="hljs-keyword">on</span> which the etcd, minio, pulsar, coordinators will be hosted.
etcd_ip= <span class="hljs-number">10.170</span><span class="hljs-number">.0</span><span class="hljs-number">.19</span>
minio_ip= <span class="hljs-number">10.170</span><span class="hljs-number">.0</span><span class="hljs-number">.19</span>
pulsar_ip= <span class="hljs-number">10.170</span><span class="hljs-number">.0</span><span class="hljs-number">.19</span>
coords_ip= <span class="hljs-number">10.170</span><span class="hljs-number">.0</span><span class="hljs-number">.17</span>

; Setup container environment which later will be used <span class="hljs-keyword">in</span> container creation.
ETCD_ENDPOINTS= {{etcd_ip}}:<span class="hljs-number">2379</span> 
MINIO_ADDRESS= {{minio_ip}}:<span class="hljs-number">9000</span>
PULSAR_ADDRESS= pulsar:<span class="hljs-comment">//{{pulsar_ip}}:6650</span>
QUERY_COORD_ADDRESS= {{coords_ip}}:<span class="hljs-number">19531</span>
DATA_COORD_ADDRESS= {{coords_ip}}:<span class="hljs-number">13333</span>
ROOT_COORD_ADDRESS= {{coords_ip}}:<span class="hljs-number">53100</span>
INDEX_COORD_ADDRESS= {{coords_ip}}:<span class="hljs-number">31000</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="ansiblecfg" class="common-anchor-header"><code translate="no">ansible.cfg</code></h4><p><code translate="no">ansible.cfg</code> steuert die Aktion des Playbooks, z. B. SSH-Schlüssel usw. Richten Sie keine Passphrase über den SSH-Schlüssel auf Docker-Hosts ein. Andernfalls wird die Ansible SSH-Verbindung fehlschlagen. Wir empfehlen, auf allen drei Hosts denselben Benutzernamen und SSH-Schlüssel einzurichten und das neue Benutzerkonto so einzurichten, dass es sudo ohne Passwort ausführen kann. Andernfalls erhalten Sie die Fehlermeldung, dass der Benutzername nicht mit dem Kennwort übereinstimmt oder dass Sie beim Ausführen des Ansible-Playbooks keine erhöhten Rechte erhalten.</p>
<pre><code translate="no">[defaults]
host_key_checking = <span class="hljs-literal">False</span>
inventory = inventory.ini <span class="hljs-comment"># Specify the Inventory file</span>
private_key_file=~/.my_ssh_keys/gpc_sshkey <span class="hljs-comment"># Specify the SSH key that Ansible uses to access Docker host</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="deploy-dockeryml" class="common-anchor-header"><code translate="no">deploy-docker.yml</code></h4><p><code translate="no">deploy-docker.yml</code> definiert die Aufgaben während der Installation von Docker. Siehe die Code-Kommentare in der Datei für Details.</p>
<pre><code translate="no" class="language-yaml">---
- name: setup pre-requisites <span class="hljs-comment"># Install prerequisite</span>
  hosts: all
  become: <span class="hljs-built_in">yes</span>
  become_user: root
  roles:
    - install-modules
    - configure-hosts-file

- name: install docker
  become: <span class="hljs-built_in">yes</span>
  become_user: root
  hosts: dockernodes
  roles:
    - docker-installation
<button class="copy-code-btn"></button></code></pre>
<h3 id="Test-Ansible-connectivity" class="common-anchor-header">Testen der Konnektivität von Ansible</h3><p>Testen Sie die Konnektivität zu Ansible.</p>
<pre><code translate="no" class="language-shell">$ ansible <span class="hljs-built_in">all</span> -m ping
<button class="copy-code-btn"></button></code></pre>
<p>Fügen Sie <code translate="no">-i</code> in den Befehl ein, um den Pfad zur Inventarisierungsdatei anzugeben, wenn Sie ihn nicht in <code translate="no">ansible.cfg</code> angegeben haben. Andernfalls verwendet Ansible <code translate="no">/etc/ansible/hosts</code>.</p>
<p>Das Terminal gibt die folgende Meldung aus:</p>
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
<h3 id="Check-the-Playbook-Syntax" class="common-anchor-header">Überprüfen Sie die Syntax des Playbooks</h3><p>Überprüfen Sie die Syntax des Playbooks.</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-docker.yml --syntax-check
<button class="copy-code-btn"></button></code></pre>
<p>Normalerweise gibt das Terminal Folgendes zurück:</p>
<pre><code translate="no">playbook: deploy-docker.yml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-Docker" class="common-anchor-header">Docker installieren</h3><p>Installieren Sie Docker mit dem Playbook.</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-docker.yml
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Docker erfolgreich auf den drei Hosts installiert wurde, gibt das Terminal Folgendes zurück:</p>
<pre><code translate="no">TASK [docker-installation : Install Docker-CE] *******************************************************************
ok: [dockernode01]
ok: [dockernode03]
ok: [dockernode02]

TASK [docker-installation : Install python3-docker] **************************************************************
ok: [dockernode01]
ok: [dockernode02]
ok: [dockernode03]

TASK [docker-installation : Install docker-compose python3 library] **********************************************
changed: [dockernode01]
changed: [dockernode03]
changed: [dockernode02]

PLAY RECAP *******************************************************************************************************
ansible-controller         : ok=3    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
dockernode01               : ok=10   changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
dockernode02               : ok=10   changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
dockernode03               : ok=10   changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verify-the-installation" class="common-anchor-header">Überprüfen Sie die Installation</h3><p>Melden Sie sich bei den drei Hosts mit dem SSH-Schlüssel an, und überprüfen Sie die Installation auf den Hosts.</p>
<ul>
<li>Für Root-Hosts:</li>
</ul>
<pre><code translate="no" class="language-shell">$ docker -v
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Für Nicht-Root-Hosts:</li>
</ul>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker -v
<button class="copy-code-btn"></button></code></pre>
<p>Normalerweise gibt das Terminal die folgende Meldung aus:</p>
<pre><code translate="no">Docker version 20.10.14, build a224086
<button class="copy-code-btn"></button></code></pre>
<p>Überprüfen Sie den Laufstatus der Container.</p>
<pre><code translate="no" class="language-shell">$ docker ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Check-the-Syntax" class="common-anchor-header">Überprüfen Sie die Syntax</h3><p>Überprüfen Sie die Syntax von <code translate="no">deploy-milvus.yml</code>.</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-milvus.yml --syntax-check
<button class="copy-code-btn"></button></code></pre>
<p>Normalerweise gibt das Terminal folgendes zurück:</p>
<pre><code translate="no">playbook: deploy-milvus.yml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Milvus-container" class="common-anchor-header">Milvus-Container erstellen</h3><p>Die Aufgaben zum Erstellen von Milvus-Containern sind in <code translate="no">deploy-milvus.yml</code> definiert.</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-milvus.yml
<button class="copy-code-btn"></button></code></pre>
<p>Das Terminal gibt zurück:</p>
<pre><code translate="no">PLAY [Create milvus-etcd, minio, pulsar] *****************************************************************

TASK [Gathering Facts] ********************************************************************************************
ok: [dockernode03]

TASK [etcd] *******************************************************************************************************
changed: [dockernode03]

TASK [pulsar] *****************************************************************************************************
changed: [dockernode03]

TASK [minio] ******************************************************************************************************
changed: [dockernode03]

PLAY [Create milvus nodes] ****************************************************************************************

TASK [Gathering Facts] ********************************************************************************************
ok: [dockernode02]

TASK [querynode] **************************************************************************************************
changed: [dockernode02]

TASK [datanode] ***************************************************************************************************
changed: [dockernode02]

TASK [indexnode] **************************************************************************************************
changed: [dockernode02]

PLAY [Create milvus coords] ***************************************************************************************

TASK [Gathering Facts] ********************************************************************************************
ok: [dockernode01]

TASK [rootcoord] **************************************************************************************************
changed: [dockernode01]

TASK [datacoord] **************************************************************************************************
changed: [dockernode01]

TASK [querycoord] *************************************************************************************************
changed: [dockernode01]

TASK [indexcoord] *************************************************************************************************
changed: [dockernode01]

TASK [proxy] ******************************************************************************************************
changed: [dockernode01]

PLAY RECAP ********************************************************************************************************
dockernode01               : ok=6    changed=5    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
dockernode02               : ok=4    changed=3    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
dockernode03               : ok=4    changed=3    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
<button class="copy-code-btn"></button></code></pre>
<p>Jetzt haben Sie Milvus auf den drei Hosts installiert.</p>
<h2 id="Stop-nodes" class="common-anchor-header">Knoten stoppen<button data-href="#Stop-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können alle Knoten stoppen, wenn Sie keinen Milvus-Cluster mehr benötigen.</p>
<div class="alert note"> Stellen Sie sicher, dass die Binärdatei <code translate="no">terraform</code> auf Ihrem <code translate="no">PATH</code> verfügbar ist. </div>
<ol>
<li><p>Führen Sie <code translate="no">terraform destroy</code> aus und geben Sie <code translate="no">yes</code> ein, wenn Sie dazu aufgefordert werden.</p></li>
<li><p>Wenn dies erfolgreich war, werden alle Knoteninstanzen gestoppt.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">Wie geht es weiter?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie erfahren möchten, wie Sie Milvus in anderen Clouds einsetzen können:</p>
<ul>
<li><a href="/docs/de/v2.4.x/eks.md">Einrichten eines Milvus-Clusters auf EKS</a></li>
<li><a href="/docs/de/v2.4.x/gcp.md">Bereitstellen von Milvus Cluster auf GCP mit Kubernetes</a></li>
<li><a href="/docs/de/v2.4.x/azure.md">Anleitung zur Bereitstellung von Milvus auf Microsoft Azure mit Kubernetes</a></li>
</ul>
