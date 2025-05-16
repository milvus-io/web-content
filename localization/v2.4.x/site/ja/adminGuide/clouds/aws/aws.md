---
id: aws.md
title: EC2にMilvusクラスタをデプロイする
related_key: cluster
summary: AWS EC2上にMilvusクラスタをデプロイする方法を学びます。
---
<h1 id="Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="common-anchor-header">(非推奨) EC2にMilvusクラスタをデプロイする<button data-href="#Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、TerraformとAnsibleを使用して<a href="https://docs.aws.amazon.com/ec2/">Amazon EC</a>2にMilvusクラスタをデプロイする方法について説明します。</p>
<div class="alert note">
<p>このトピックは古く、すぐに削除される予定です。代わりに<a href="/docs/ja/v2.4.x/eks.md">EKS上でのMilvusクラスタのデプロイを</a>参照することをお勧めします。</p>
</div>
<h2 id="Provision-a-Milvus-cluster" class="common-anchor-header">Milvusクラスタのプロビジョニング<button data-href="#Provision-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、Terraformを使用してMilvusクラスタをプロビジョニングする方法について説明します。</p>
<p><a href="https://www.terraform.io/">Terraformは</a>Infrastructure as Code (IaC) ソフトウェアツールです。Terraformを利用することで、宣言型の設定ファイルを利用してインフラストラクチャをプロビジョニングすることができます。</p>
<h3 id="Prerequisites" class="common-anchor-header">前提条件</h3><ul>
<li><p><a href="https://www.terraform.io/downloads.html">Terraformの</a>インストールと設定</p></li>
<li><p><a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html">AWS CLIの</a>インストールと設定</p></li>
</ul>
<h3 id="Prepare-configuration" class="common-anchor-header">設定の準備</h3><p><a href="https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view">Google Driveで</a>テンプレート設定ファイルをダウンロードできます。</p>
<ul>
<li><p><code translate="no">main.tf</code></p>
<p>このファイルにはMilvusクラスタをプロビジョニングするための設定が含まれています。</p></li>
<li><p><code translate="no">variables.tf</code></p>
<p>このファイルにより、Milvusクラスタの設定や更新に使用する変数を素早く編集することができます。</p></li>
<li><p><code translate="no">output.tf</code> および<code translate="no">inventory.tmpl</code></p>
<p>これらのファイルにはMilvusクラスタのメタデータが格納されています。このトピックで使用されるメタデータは、各ノードインスタンスの<code translate="no">public_ip</code> 、各ノードインスタンスの<code translate="no">private_ip</code> 、すべてのEC2インスタンスIDです。</p></li>
</ul>
<h4 id="Prepare-variablestf" class="common-anchor-header">変数.tfの準備</h4><p>このセクションでは、<code translate="no">variables.tf</code> 。</p>
<ul>
<li><p>ノード数</p>
<p>以下のテンプレートでは、インデックスノードの数を設定するための変数<code translate="no">index_count</code> を宣言している。</p>
  <div class="alert note"><code translate="no">index_count</code> の値は1以上でなければなりません。</div>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;index_count&quot;</span> {
  description = <span class="hljs-string">&quot;Amount of index instances to run&quot;</span>
  <span class="hljs-keyword">type</span>        = number
  <span class="hljs-keyword">default</span>     = <span class="hljs-number">5</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ノード・タイプのインスタンス型</p>
<p>以下のテンプレートは、インデックス・ノードの<a href="https://aws.amazon.com/ec2/instance-types/">インスタンス・タイプを</a>設定するために使用される<code translate="no">index_ec2_type</code> 変数を宣言します。</p>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;index_ec2_type&quot;</span> {
  description = <span class="hljs-string">&quot;Which server type&quot;</span>
  <span class="hljs-keyword">type</span>        = <span class="hljs-type">string</span>
  <span class="hljs-keyword">default</span>     = <span class="hljs-string">&quot;c5.2xlarge&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>アクセス許可</p>
<p>以下のテンプレートでは、<code translate="no">key_name</code> 変数と<code translate="no">my_ip</code> 変数を宣言します。<code translate="no">key_name</code> 変数は AWS アクセスキーを表します。<code translate="no">my_ip</code> 変数は、セキュリティグループの IP アドレス範囲を表します。</p>
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
<h4 id="Prepare-maintf" class="common-anchor-header">main.tf の準備</h4><p>このセクションでは、<code translate="no">main.tf</code> ファイルが含む設定について説明します。</p>
<ul>
<li><p>クラウドプロバイダーとリージョン</p>
<p>以下のテンプレートでは、<code translate="no">us-east-2</code> リージョンを使用します。詳細については、<a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions">利用可能なリージョンを</a>参照してください。</p>
<pre><code translate="no" class="language-main.tf">provider <span class="hljs-string">&quot;aws&quot;</span> {
  profile = <span class="hljs-string">&quot;default&quot;</span>
  region  = <span class="hljs-string">&quot;us-east-2&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>セキュリティグループ</p>
<p>以下のテンプレートでは、<code translate="no">variables.tf</code> で宣言された<code translate="no">my_ip</code> で表される CIDR アドレス範囲からの受信トラフィックを許可するセキュリティグループを宣言します。</p>
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
<p>次のテンプレートは、Milvusクラスタ上の10.0.0.0/24 CIDRブロックを持つVPCを指定します。</p>
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
<li><p>サブネット(オプション)</p>
<p>以下のテンプレートは、トラフィックがインターネットゲートウェイにルーティングされるサブネットを宣言します。この場合、サブネットのCIDRブロックのサイズはVPCのCIDRブロックと同じです。</p>
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
<li><p>ノードインスタンス（ノード）</p>
<p>次のテンプレートでは、MinIOノードインスタンスを宣言します。<code translate="no">main.tf</code> テンプレートファイルは、11のノードタイプのノードを宣言します。ノードタイプによっては、<code translate="no">root_block_device</code> を設定する必要があります。詳細は、「<a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#ebs-ephemeral-and-root-block-devices">EBS、エフェメラル、およびルートブロックデバイス</a>」を参照してください。</p>
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
<h3 id="Apply-the-configuration" class="common-anchor-header">設定の適用</h3><ol>
<li><p>ターミナルを開き、<code translate="no">main.tf</code> を格納するフォルダに移動します。</p></li>
<li><p>構成を初期化するには、<code translate="no">terraform init</code> を実行します。</p></li>
<li><p>構成を適用するには、<code translate="no">terraform apply</code> を実行し、プロンプトが表示されたら<code translate="no">yes</code> を入力します。</p></li>
</ol>
<p>これでTerraformによるMilvusクラスタのプロビジョニングが完了しました。</p>
<h2 id="Start-the-Milvus-cluster" class="common-anchor-header">Milvusクラスタの起動<button data-href="#Start-the-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、Ansibleを使用してプロビジョニングしたMilvusクラスタを起動する方法について説明します。</p>
<p><a href="https://www.ansible.com/overview/how-ansible-works">Ansibleは</a>クラウドのプロビジョニングと構成管理を自動化するための構成管理ツールです。</p>
<h3 id="Prerequisites" class="common-anchor-header">前提条件</h3><ul>
<li><a href="https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html">Ansible Controllerが</a>インストールされている。</li>
</ul>
<h3 id="Download-Ansible-Milvus-node-deployment-Playbook" class="common-anchor-header">Ansible MilvusノードデプロイメントPlaybookをダウンロードする。</h3><p>GitHubからMilvusリポジトリをクローンし、Ansible MilvusノードデプロイメントPlaybookをダウンロードします。</p>
<pre><code translate="no">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/milvus.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configure-installation-files" class="common-anchor-header">インストールファイルの設定</h3><p><code translate="no">inventory.ini</code> と<code translate="no">ansible.cfg</code> ファイルは、Ansible playbook の環境変数とログイン確認方法を制御するために使用します。<code translate="no">inventory.ini</code> ファイルでは、<code translate="no">dockernodes</code> セクションで docker エンジンの全サーバを定義する。<code translate="no">ansible.cfg</code> セクションは、Milvus コーディネータの全サーバを定義します。<code translate="no">node</code> セクションには、Milvus ノードのすべてのサーバを定義します。</p>
<p>Playbookのローカルパスを入力し、インストールファイルを設定します。</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">cd</span> ./milvus/deployments/docker/cluster-distributed-deployment
<button class="copy-code-btn"></button></code></pre>
<h4 id="inventoryini" class="common-anchor-header"><code translate="no">inventory.ini</code></h4><p>ホストをMilvusシステム内の役割に従ってグループに分割するために<code translate="no">inventory.ini</code> を設定します。</p>
<p>ホスト名を追加し、<code translate="no">docker</code> グループと<code translate="no">vars</code> を定義します。</p>
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
<h4 id="ansiblecfg" class="common-anchor-header"><code translate="no">ansible.cfg</code></h4><p><code translate="no">ansible.cfg</code> SSHキーなど、playbookのアクションを制御します。docker ホストでは SSH 鍵経由でパスフレーズを設定しないでください。さもないと、Ansible の SSH 接続に失敗します。3つのホストで同じユーザー名とSSHキーを設定し、新しいユーザーアカウントはパスワードなしでsudoを実行するように設定することをお勧めします。そうしないと、Ansible playbookの実行時に、ユーザー名がパスワードと一致しない、または昇格権限が付与されていないというエラーが発生します。</p>
<pre><code translate="no">[defaults]
host_key_checking = <span class="hljs-literal">False</span>
inventory = inventory.ini <span class="hljs-comment"># Specify the Inventory file</span>
private_key_file=~/.my_ssh_keys/gpc_sshkey <span class="hljs-comment"># Specify the SSH key that Ansible uses to access Docker host</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="deploy-dockeryml" class="common-anchor-header"><code translate="no">deploy-docker.yml</code></h4><p><code translate="no">deploy-docker.yml</code> は、Dockerのインストール中のタスクを定義します。詳細はファイル内のコードコメントを参照してください。</p>
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
<h3 id="Test-Ansible-connectivity" class="common-anchor-header">Ansible接続のテスト</h3><p>Ansibleへの接続性をテストします。</p>
<pre><code translate="no" class="language-shell">$ ansible <span class="hljs-built_in">all</span> -m ping
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ansible.cfg</code> <code translate="no">/etc/ansible/hosts</code> でインベントリファイルのパスを指定していない場合は、 をコマンドに追加し、インベントリファイルのパスを指定します。<code translate="no">-i</code> </p>
<p>ターミナルは以下のように返される：</p>
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
<h3 id="Check-the-Playbook-Syntax" class="common-anchor-header">Playbookの構文の確認</h3><p>Playbookの構文をチェックします。</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-docker.yml --syntax-check
<button class="copy-code-btn"></button></code></pre>
<p>通常、ターミナルは次のように返します：</p>
<pre><code translate="no">playbook: deploy-docker.yml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-Docker" class="common-anchor-header">Dockerのインストール</h3><p>Playbookを使ってDockerをインストールする。</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-docker.yml
<button class="copy-code-btn"></button></code></pre>
<p>Dockerが3つのホストに正常にインストールされると、以下のように表示される：</p>
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
<h3 id="Verify-the-installation" class="common-anchor-header">インストールの確認</h3><p>SSHキーで3つのホストにログインし、ホストへのインストールを確認します。</p>
<ul>
<li>rootホストの場合：</li>
</ul>
<pre><code translate="no" class="language-shell">$ docker -v
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>非 root ホストの場合：</li>
</ul>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker -v
<button class="copy-code-btn"></button></code></pre>
<p>通常、ターミナルは以下のように戻る：</p>
<pre><code translate="no">Docker version 20.10.14, build a224086
<button class="copy-code-btn"></button></code></pre>
<p>コンテナの実行状態を確認する。</p>
<pre><code translate="no" class="language-shell">$ docker ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Check-the-Syntax" class="common-anchor-header">構文の確認</h3><p><code translate="no">deploy-milvus.yml</code> の構文をチェックする。</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-milvus.yml --syntax-check
<button class="copy-code-btn"></button></code></pre>
<p>通常、ターミナルは以下のように返される：</p>
<pre><code translate="no">playbook: deploy-milvus.yml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Milvus-container" class="common-anchor-header">Milvus コンテナの作成</h3><p>Milvus コンテナを作成するタスクは<code translate="no">deploy-milvus.yml</code> に定義されている。</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-milvus.yml
<button class="copy-code-btn"></button></code></pre>
<p>ターミナルが戻る：</p>
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
<p>これで3つのホストにMilvusがデプロイされた。</p>
<h2 id="Stop-nodes" class="common-anchor-header">ノードの停止<button data-href="#Stop-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusクラスタが不要になったら、すべてのノードを停止します。</p>
<div class="alert note"><code translate="no">PATH</code> に<code translate="no">terraform</code> のバイナリがあることを確認してください。 </div>
<ol>
<li><p><code translate="no">terraform destroy</code> を実行し、プロンプトが表示されたら<code translate="no">yes</code> を入力します。</p></li>
<li><p>成功すると、すべてのノードインスタンスが停止します。</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>他のクラウドにMilvusをデプロイする方法を学びたい場合は、次の手順に進んでください：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/eks.md">EKSにMilvusクラスタをデプロイする</a></li>
<li><a href="/docs/ja/v2.4.x/gcp.md">Kubernetesを使ってGCP上にMilvusクラスタをデプロイする</a></li>
<li><a href="/docs/ja/v2.4.x/azure.md">KubernetesでMicrosoft AzureにMilvusをデプロイするガイド</a></li>
</ul>
