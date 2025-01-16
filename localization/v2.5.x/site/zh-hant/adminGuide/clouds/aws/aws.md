---
id: aws.md
title: 在 EC2 上部署 Milvus 集群
related_key: cluster
summary: 瞭解如何在 AWS EC2 上部署 Milvus 群集。
---
<h1 id="Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="common-anchor-header">(已停用) 在 EC2 上部署 Milvus 群集<button data-href="#Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題描述如何使用 Terraform 和 Ansible 在<a href="https://docs.aws.amazon.com/ec2/">Amazon EC2</a>上部署 Milvus 叢集。</p>
<div class="alert note">
<p>此主題已經過時，即將移除。建議您參考<a href="/docs/zh-hant/eks.md">在 EKS 上部署 Milvus 叢集</a>。</p>
</div>
<h2 id="Provision-a-Milvus-cluster" class="common-anchor-header">佈建 Milvus 叢集<button data-href="#Provision-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>本節說明如何使用 Terraform 來佈建 Milvus 叢集。</p>
<p><a href="https://www.terraform.io/">Terraform</a>是基礎架構即程式碼 (IaC) 軟體工具。透過 Terraform，您可以使用宣告式組態檔案來佈建基礎設施。</p>
<h3 id="Prerequisites" class="common-anchor-header">先決條件</h3><ul>
<li><p>安裝和設定<a href="https://www.terraform.io/downloads.html">Terraform</a></p></li>
<li><p>安裝和設定<a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html">AWS CLI</a></p></li>
</ul>
<h3 id="Prepare-configuration" class="common-anchor-header">準備配置</h3><p>您可以從<a href="https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view">Google Drive</a> 下載範本配置檔案。</p>
<ul>
<li><p><code translate="no">main.tf</code></p>
<p>此檔案包含配置 Milvus 集群的配置。</p></li>
<li><p><code translate="no">variables.tf</code></p>
<p>此檔案可快速編輯用於設定或更新 Milvus 叢集的變數。</p></li>
<li><p><code translate="no">output.tf</code> 以及<code translate="no">inventory.tmpl</code></p>
<p>這些檔案儲存 Milvus 叢集的元資料。本主題中使用的元資料是每個節點實體的<code translate="no">public_ip</code> 、每個節點實體的<code translate="no">private_ip</code> ，以及所有 EC2 實體 ID。</p></li>
</ul>
<h4 id="Prepare-variablestf" class="common-anchor-header">準備變數.tf</h4><p>本節說明<code translate="no">variables.tf</code> 檔案所包含的配置。</p>
<ul>
<li><p>節點數量</p>
<p>以下範本宣告一個<code translate="no">index_count</code> 變數，用於設定索引節點的數量。</p>
  <div class="alert note"><code translate="no">index_count</code> 的值必須大於或等於 1。</div>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;index_count&quot;</span> {
  description = <span class="hljs-string">&quot;Amount of index instances to run&quot;</span>
  <span class="hljs-keyword">type</span>        = number
  <span class="hljs-keyword">default</span>     = <span class="hljs-number">5</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>節點類型的實例類型</p>
<p>以下範本宣告一個<code translate="no">index_ec2_type</code> 變數，用來設定索引節點的<a href="https://aws.amazon.com/ec2/instance-types/">實體類型</a>。</p>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;index_ec2_type&quot;</span> {
  description = <span class="hljs-string">&quot;Which server type&quot;</span>
  <span class="hljs-keyword">type</span>        = <span class="hljs-type">string</span>
  <span class="hljs-keyword">default</span>     = <span class="hljs-string">&quot;c5.2xlarge&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>存取權限</p>
<p>以下範本宣告了<code translate="no">key_name</code> 變數和<code translate="no">my_ip</code> 變數。<code translate="no">key_name</code> 變數代表 AWS 存取權限金鑰。<code translate="no">my_ip</code> 變數代表安全群組的 IP 位址範圍。</p>
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
<h4 id="Prepare-maintf" class="common-anchor-header">準備 main.tf</h4><p>本節說明<code translate="no">main.tf</code> 檔案所包含的設定。</p>
<ul>
<li><p>雲提供商和區域</p>
<p>以下範本使用<code translate="no">us-east-2</code> 區域。如需詳細資訊，請參閱<a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions">可用區域</a>。</p>
<pre><code translate="no" class="language-main.tf">provider <span class="hljs-string">&quot;aws&quot;</span> {
  profile = <span class="hljs-string">&quot;default&quot;</span>
  region  = <span class="hljs-string">&quot;us-east-2&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>安全群組</p>
<p>以下模板声明了一个安全组，允许来自<code translate="no">variables.tf</code> 中声明的<code translate="no">my_ip</code> 所代表的 CIDR 地址范围的传入流量。</p>
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
<p>以下範本在 Milvus 叢集上指定具有 10.0.0.0/24 CIDR 區塊的 VPC。</p>
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
<li><p>子網路 (選用)</p>
<p>以下範本宣告一個子網路，其流量會路由到網際網路閘道。在這種情況下，子網路的 CIDR 區塊大小與 VPC 的 CIDR 區塊大小相同。</p>
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
<li><p>節點實體 (節點)</p>
<p>以下範本宣告 MinIO 節點實體。<code translate="no">main.tf</code> 範本檔案宣告 11 種節點類型的節點。對於某些節點類型，您需要設定<code translate="no">root_block_device</code> 。如需詳細資訊，請參閱<a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#ebs-ephemeral-and-root-block-devices">EBS、Ephemeral 和 Root Block Devices</a>。</p>
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
<h3 id="Apply-the-configuration" class="common-anchor-header">套用組態</h3><ol>
<li><p>開啟終端機，並導航至存放<code translate="no">main.tf</code> 的資料夾。</p></li>
<li><p>若要初始化組態，請執行<code translate="no">terraform init</code> 。</p></li>
<li><p>若要套用組態，請執行<code translate="no">terraform apply</code> ，並在出現提示時輸入<code translate="no">yes</code> 。</p></li>
</ol>
<p>現在您已使用 Terraform 佈建 Milvus 叢集。</p>
<h2 id="Start-the-Milvus-cluster" class="common-anchor-header">啟動 Milvus 叢集<button data-href="#Start-the-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>本節將介紹如何使用 Ansible 來啟動已佈建的 Milvus 叢集。</p>
<p><a href="https://www.ansible.com/overview/how-ansible-works">Ansible</a>是一個配置管理工具，用於自動化雲端佈建和配置管理。</p>
<h3 id="Prerequisites" class="common-anchor-header">先決條件</h3><ul>
<li>已安裝<a href="https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html">Ansible Controller</a>。</li>
</ul>
<h3 id="Download-Ansible-Milvus-node-deployment-Playbook" class="common-anchor-header">下載 Ansible Milvus 節點部署 Playbook</h3><p>從 GitHub 複製 Milvus 套件庫，下載 Ansible Milvus 節點部署 Playbook。</p>
<pre><code translate="no">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/milvus.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configure-installation-files" class="common-anchor-header">設定安裝檔案</h3><p><code translate="no">inventory.ini</code> 和<code translate="no">ansible.cfg</code> 檔案用來控制 Ansible playbook 中的環境變數和登入驗證方法。在<code translate="no">inventory.ini</code> 檔案中，<code translate="no">dockernodes</code> 部份定義了所有 docker 引擎的伺服器。<code translate="no">ansible.cfg</code> 部分定義 Milvus 協調器的所有伺服器。<code translate="no">node</code> 部份定義 Milvus 節點的所有伺服器。</p>
<p>輸入 Playbook 的本機路徑並設定安裝檔案。</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">cd</span> ./milvus/deployments/docker/cluster-distributed-deployment
<button class="copy-code-btn"></button></code></pre>
<h4 id="inventoryini" class="common-anchor-header"><code translate="no">inventory.ini</code></h4><p>配置<code translate="no">inventory.ini</code> ，按照主機在 Milvus 系統中的角色將其分組。</p>
<p>添加主机名，并定义<code translate="no">docker</code> 组和<code translate="no">vars</code> 。</p>
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
<h4 id="ansiblecfg" class="common-anchor-header"><code translate="no">ansible.cfg</code></h4><p><code translate="no">ansible.cfg</code> 控制 playbook 的動作，例如 SSH 金鑰等。不要在 docker 主機上透過 SSH key 設定 passphrase。否則 Ansible SSH 連線會失敗。建議在三台主機上設定相同的使用者名稱和 SSH 金鑰，並設定新的使用者帳號無需密碼即可執行 sudo。否則，在執行 Ansible playbook 時，您會收到使用者名稱與密碼不符或未獲賦予提升權限的錯誤。</p>
<pre><code translate="no">[defaults]
host_key_checking = <span class="hljs-literal">False</span>
inventory = inventory.ini <span class="hljs-comment"># Specify the Inventory file</span>
private_key_file=~/.my_ssh_keys/gpc_sshkey <span class="hljs-comment"># Specify the SSH key that Ansible uses to access Docker host</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="deploy-dockeryml" class="common-anchor-header"><code translate="no">deploy-docker.yml</code></h4><p><code translate="no">deploy-docker.yml</code> 定義安裝 Docker 時的任務。詳情請參閱檔案中的程式碼註解。</p>
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
<h3 id="Test-Ansible-connectivity" class="common-anchor-header">測試 Ansible 連線性</h3><p>測試與 Ansible 的連線性。</p>
<pre><code translate="no" class="language-shell">$ ansible <span class="hljs-built_in">all</span> -m ping
<button class="copy-code-btn"></button></code></pre>
<p>如果您沒有在<code translate="no">ansible.cfg</code> 中指定 inventory 檔案的路徑，請在指令中加入<code translate="no">-i</code> ，否則 Ansible 會使用<code translate="no">/etc/ansible/hosts</code> 。</p>
<p>終端返回如下：</p>
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
<h3 id="Check-the-Playbook-Syntax" class="common-anchor-header">檢查 Playbook 語法</h3><p>檢查 Playbook 的語法。</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-docker.yml --syntax-check
<button class="copy-code-btn"></button></code></pre>
<p>通常，終端返回如下：</p>
<pre><code translate="no">playbook: deploy-docker.yml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-Docker" class="common-anchor-header">安裝 Docker</h3><p>使用 Playbook 安裝 Docker。</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-docker.yml
<button class="copy-code-btn"></button></code></pre>
<p>如果 Docker 已成功安裝在三台主機上，終端機會返回如下內容：</p>
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
<h3 id="Verify-the-installation" class="common-anchor-header">驗證安裝</h3><p>使用 SSH 金鑰登入三台主機，並驗證在主機上的安裝。</p>
<ul>
<li>針對 root 主機</li>
</ul>
<pre><code translate="no" class="language-shell">$ docker -v
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>對於非 root 主機：</li>
</ul>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker -v
<button class="copy-code-btn"></button></code></pre>
<p>通常，終端機會返回以下內容：</p>
<pre><code translate="no">Docker version 20.10.14, build a224086
<button class="copy-code-btn"></button></code></pre>
<p>檢查容器的執行狀態。</p>
<pre><code translate="no" class="language-shell">$ docker ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Check-the-Syntax" class="common-anchor-header">檢查語法</h3><p>檢查<code translate="no">deploy-milvus.yml</code> 的語法。</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-milvus.yml --syntax-check
<button class="copy-code-btn"></button></code></pre>
<p>通常，終端返回如下內容：</p>
<pre><code translate="no">playbook: deploy-milvus.yml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Milvus-container" class="common-anchor-header">創建 Milvus 容器</h3><p>創建 Milvus 容器的任務定義在<code translate="no">deploy-milvus.yml</code> 。</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-milvus.yml
<button class="copy-code-btn"></button></code></pre>
<p>終端返回：</p>
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
<p>現在您已經在三台主機上部署了 Milvus。</p>
<h2 id="Stop-nodes" class="common-anchor-header">停止節點<button data-href="#Stop-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>不再需要 Milvus 集群後，您可以停止所有節點。</p>
<div class="alert note">確保<code translate="no">terraform</code> 二進位檔在您的<code translate="no">PATH</code> 上可用。 </div>
<ol>
<li><p>執行<code translate="no">terraform destroy</code> ，並在提示時輸入<code translate="no">yes</code> 。</p></li>
<li><p>如果成功，所有節點實例都會停止。</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>如果您想學習如何在其他雲端部署 Milvus：</p>
<ul>
<li><a href="/docs/zh-hant/eks.md">在 EKS 上部署 Milvus 集群</a></li>
<li><a href="/docs/zh-hant/gcp.md">使用 Kubernetes 在 GCP 上部署 Milvus 群集</a></li>
<li><a href="/docs/zh-hant/azure.md">使用 Kubernetes 在 Microsoft Azure 上部署 Milvus 指南</a></li>
</ul>