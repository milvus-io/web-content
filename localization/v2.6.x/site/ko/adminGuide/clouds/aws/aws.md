---
id: aws.md
title: EC2에 Milvus 클러스터 배포하기
related_key: cluster
summary: AWS EC2에 Milvus 클러스터를 배포하는 방법을 알아보세요.
---
<h1 id="Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="common-anchor-header">(더 이상 사용되지 않음) EC2에 Milvus 클러스터 배포하기<button data-href="#Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Terraform 및 Ansible을 사용하여 <a href="https://docs.aws.amazon.com/ec2/">Amazon EC2에</a> Milvus 클러스터를 배포하는 방법에 대해 설명합니다.</p>
<div class="alert note">
<p>이 항목은 오래되었으며 곧 삭제될 예정입니다. 대신 <a href="/docs/ko/eks.md">EKS에 Milvus 클러스터 배포를</a> 참조하시기 바랍니다.</p>
</div>
<h2 id="Provision-a-Milvus-cluster" class="common-anchor-header">Milvus 클러스터 프로비저닝<button data-href="#Provision-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 Terraform을 사용하여 Milvus 클러스터를 프로비저닝하는 방법을 설명합니다.</p>
<p><a href="https://www.terraform.io/">Terraform은</a> 코드형 인프라(IaC) 소프트웨어 도구입니다. Terraform을 사용하면 선언적 구성 파일을 사용하여 인프라를 프로비저닝할 수 있습니다.</p>
<h3 id="Prerequisites" class="common-anchor-header">전제 조건</h3><ul>
<li><p><a href="https://www.terraform.io/downloads.html">Terraform</a> 설치 및 구성</p></li>
<li><p><a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html">AWS CLI</a> 설치 및 구성</p></li>
</ul>
<h3 id="Prepare-configuration" class="common-anchor-header">구성 준비</h3><p><a href="https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view">Google 드라이브에서</a> 템플릿 구성 파일을 다운로드할 수 있습니다.</p>
<ul>
<li><p><code translate="no">main.tf</code></p>
<p>이 파일에는 Milvus 클러스터를 프로비저닝하기 위한 구성이 포함되어 있습니다.</p></li>
<li><p><code translate="no">variables.tf</code></p>
<p>이 파일을 통해 Milvus 클러스터를 설정하거나 업데이트하는 데 사용되는 변수를 빠르게 편집할 수 있습니다.</p></li>
<li><p><code translate="no">output.tf</code> 및 <code translate="no">inventory.tmpl</code></p>
<p>이 파일에는 Milvus 클러스터의 메타데이터가 저장됩니다. 이 항목에서 사용되는 메타데이터는 각 노드 인스턴스의 <code translate="no">public_ip</code>, 각 노드 인스턴스의 <code translate="no">private_ip</code> 및 모든 EC2 인스턴스 ID입니다.</p></li>
</ul>
<h4 id="Prepare-variablestf" class="common-anchor-header">variables.tf 준비</h4><p>이 섹션에서는 <code translate="no">variables.tf</code> 파일에 포함된 구성에 대해 설명합니다.</p>
<ul>
<li><p>노드 수</p>
<p>다음 템플릿은 인덱스 노드 수를 설정하는 데 사용되는 <code translate="no">index_count</code> 변수를 선언합니다.</p>
  <div class="alert note"><code translate="no">index_count</code> 값은 1보다 크거나 같아야 합니다.</div>
<pre><code translate="no" class="language-variables.tf">variable &quot;index_count&quot; {
  description = &quot;Amount of index instances to run&quot;
  type        = number
  default     = 5
}
</code></pre></li>
<li><p>노드 유형에 대한 인스턴스 유형</p>
<p>다음 템플릿은 인덱스 노드의 <a href="https://aws.amazon.com/ec2/instance-types/">인스턴스 유형을</a> 설정하는 데 사용되는 <code translate="no">index_ec2_type</code> 변수를 선언합니다.</p>
<pre><code translate="no" class="language-variables.tf">variable &quot;index_ec2_type&quot; {
  description = &quot;Which server type&quot;
  type        = string
  default     = &quot;c5.2xlarge&quot;
}
</code></pre></li>
<li><p>액세스 권한</p>
<p>다음 템플릿은 <code translate="no">key_name</code> 변수와 <code translate="no">my_ip</code> 변수를 선언합니다. <code translate="no">key_name</code> 변수는 AWS 액세스 키를 나타냅니다. <code translate="no">my_ip</code> 변수는 보안 그룹의 IP 주소 범위를 나타냅니다.</p>
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
<h4 id="Prepare-maintf" class="common-anchor-header">main.tf 준비</h4><p>이 섹션에서는 <code translate="no">main.tf</code> 파일에 포함된 구성에 대해 설명합니다.</p>
<ul>
<li><p>클라우드 공급자 및 리전</p>
<p>다음 템플릿은 <code translate="no">us-east-2</code> 리전을 사용합니다. 자세한 내용은 <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions">사용 가능한 리전을</a> 참조하세요.</p>
<pre><code translate="no" class="language-main.tf">provider &quot;aws&quot; {
  profile = &quot;default&quot;
  region  = &quot;us-east-2&quot;
}
</code></pre></li>
<li><p>보안 그룹</p>
<p>다음 템플릿은 <code translate="no">variables.tf</code> 에 선언된 <code translate="no">my_ip</code> 로 표시되는 CIDR 주소 범위에서 들어오는 트래픽을 허용하는 보안 그룹을 선언합니다.</p>
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
<p>다음 템플릿은 Milvus 클러스터에서 10.0.0.0/24 CIDR 블록이 있는 VPC를 지정합니다.</p>
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
<li><p>서브넷(선택 사항)</p>
<p>다음 템플릿은 트래픽이 인터넷 게이트웨이로 라우팅되는 서브넷을 선언합니다. 이 경우 서브넷의 CIDR 블록 크기는 VPC의 CIDR 블록과 동일합니다.</p>
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
<li><p>노드 인스턴스(노드)</p>
<p>다음 템플릿은 MinIO 노드 인스턴스를 선언합니다. <code translate="no">main.tf</code> 템플릿 파일은 11개 노드 유형의 노드를 선언합니다. 일부 노드 유형의 경우 <code translate="no">root_block_device</code> 을 설정해야 합니다. 자세한 내용은 <a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#ebs-ephemeral-and-root-block-devices">EBS, 임시 및 루트 블록 디바이스를</a> 참조하세요.</p>
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
<h3 id="Apply-the-configuration" class="common-anchor-header">구성 적용하기</h3><ol>
<li><p>터미널을 열고 <code translate="no">main.tf</code> 파일이 저장된 폴더로 이동합니다.</p></li>
<li><p>구성을 초기화하려면 <code translate="no">terraform init</code> 을 실행합니다.</p></li>
<li><p>구성을 적용하려면 <code translate="no">terraform apply</code> 을 실행하고 메시지가 표시되면 <code translate="no">yes</code> 을 입력합니다.</p></li>
</ol>
<p>이제 Terraform으로 Milvus 클러스터를 프로비저닝했습니다.</p>
<h2 id="Start-the-Milvus-cluster" class="common-anchor-header">Milvus 클러스터 시작<button data-href="#Start-the-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 프로비저닝한 Milvus 클러스터를 시작하기 위해 Ansible을 사용하는 방법을 설명합니다.</p>
<p><a href="https://www.ansible.com/overview/how-ansible-works">Ansible은</a> 클라우드 프로비저닝 및 구성 관리를 자동화하는 데 사용되는 구성 관리 도구입니다.</p>
<h3 id="Prerequisites" class="common-anchor-header">전제 조건</h3><ul>
<li><a href="https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html">Ansible 컨트롤러가</a> 설치되어 있습니다.</li>
</ul>
<h3 id="Download-Ansible-Milvus-node-deployment-Playbook" class="common-anchor-header">Ansible Milvus 노드 배포 플레이북 다운로드</h3><p>GitHub에서 Milvus 리포지토리를 복제하여 Ansible Milvus 노드 배포 플레이북을 다운로드합니다.</p>
<pre><code translate="no">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/milvus.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configure-installation-files" class="common-anchor-header">설치 파일 구성</h3><p><code translate="no">inventory.ini</code> 및 <code translate="no">ansible.cfg</code> 파일은 Ansible 플레이북에서 환경 변수 및 로그인 확인 방법을 제어하는 데 사용됩니다. <code translate="no">inventory.ini</code> 파일에서 <code translate="no">dockernodes</code> 섹션은 도커 엔진의 모든 서버를 정의합니다. <code translate="no">ansible.cfg</code> 섹션은 Milvus 코디네이터의 모든 서버를 정의합니다. <code translate="no">node</code> 섹션은 Milvus 노드의 모든 서버를 정의합니다.</p>
<p>플레이북의 로컬 경로를 입력하고 설치 파일을 구성합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> ./milvus/deployments/docker/cluster-distributed-deployment</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="inventoryini" class="common-anchor-header"><code translate="no">inventory.ini</code></h4><p><code translate="no">inventory.ini</code> 을 구성하여 Milvus 시스템에서 역할에 따라 호스트를 그룹으로 나눕니다.</p>
<p>호스트 이름을 추가하고 <code translate="no">docker</code> 그룹 및 <code translate="no">vars</code> 을 정의합니다.</p>
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
<h4 id="ansiblecfg" class="common-anchor-header"><code translate="no">ansible.cfg</code></h4><p><code translate="no">ansible.cfg</code> 는 플레이북의 동작을 제어합니다(예: SSH 키 등). 도커 호스트에서 SSH 키를 통해 패스프레이즈를 설정하지 마세요. 그렇지 않으면 Ansible SSH 연결이 실패합니다. 세 호스트에서 동일한 사용자 이름과 SSH 키를 설정하고 새 사용자 계정이 비밀번호 없이 sudo를 실행하도록 설정하는 것이 좋습니다. 그렇지 않으면 사용자 이름이 비밀번호와 일치하지 않거나 상승된 권한이 부여되지 않았다는 오류가 발생하여 Ansible 플레이북을 실행할 때 오류가 발생합니다.</p>
<pre><code translate="no"><span class="hljs-section">[defaults]</span>
<span class="hljs-attr">host_key_checking</span> = <span class="hljs-literal">False</span>
<span class="hljs-attr">inventory</span> = inventory.ini <span class="hljs-comment"># Specify the Inventory file</span>
<span class="hljs-attr">private_key_file</span>=~/.my_ssh_keys/gpc_sshkey <span class="hljs-comment"># Specify the SSH key that Ansible uses to access Docker host</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="deploy-dockeryml" class="common-anchor-header"><code translate="no">deploy-docker.yml</code></h4><p><code translate="no">deploy-docker.yml</code> 는 Docker 설치 중 작업을 정의합니다. 자세한 내용은 파일의 코드 주석을 참조하세요.</p>
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
<h3 id="Test-Ansible-connectivity" class="common-anchor-header">Ansible 연결 테스트</h3><p>Ansible에 대한 연결을 테스트합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible all -m ping</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ansible.cfg</code> 에서 지정하지 않은 경우 명령에 <code translate="no">-i</code> 을 추가하여 인벤토리 파일의 경로를 지정하고, 그렇지 않으면 Ansible에서 <code translate="no">/etc/ansible/hosts</code> 을 사용합니다.</p>
<p>터미널은 다음과 같이 반환합니다:</p>
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
<h3 id="Check-the-Playbook-Syntax" class="common-anchor-header">플레이북 구문 확인</h3><p>플레이북의 구문을 확인합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-docker.yml --syntax-check</span>
<button class="copy-code-btn"></button></code></pre>
<p>일반적으로 터미널은 다음과 같이 반환됩니다:</p>
<pre><code translate="no"><span class="hljs-section">playbook: deploy-docker.yml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-Docker" class="common-anchor-header">Docker 설치</h3><p>플레이북으로 Docker를 설치합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-docker.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>세 호스트에 Docker가 성공적으로 설치되면 터미널은 다음과 같이 반환합니다:</p>
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
<h3 id="Verify-the-installation" class="common-anchor-header">설치 확인</h3><p>SSH 키를 사용하여 세 호스트에 로그인하고 호스트에서 설치를 확인합니다.</p>
<ul>
<li>루트 호스트의 경우:</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker -v</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>루트 호스트가 아닌 호스트의 경우:</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker -v</span>
<button class="copy-code-btn"></button></code></pre>
<p>일반적으로 터미널은 다음과 같이 반환합니다:</p>
<pre><code translate="no"><span class="hljs-attribute">Docker</span> version <span class="hljs-number">20</span>.<span class="hljs-number">10</span>.<span class="hljs-number">14</span>, build a224086
<button class="copy-code-btn"></button></code></pre>
<p>컨테이너의 실행 상태를 확인합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker ps</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Check-the-Syntax" class="common-anchor-header">구문 확인</h3><p><code translate="no">deploy-milvus.yml</code> 의 구문을 확인합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-milvus.yml --syntax-check</span>
<button class="copy-code-btn"></button></code></pre>
<p>일반적으로 터미널은 다음과 같이 반환합니다:</p>
<pre><code translate="no"><span class="hljs-section">playbook: deploy-milvus.yml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Milvus-container" class="common-anchor-header">Milvus 컨테이너 생성</h3><p>Milvus 컨테이너 생성 작업은 <code translate="no">deploy-milvus.yml</code> 에 정의되어 있습니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-milvus.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>터미널이 반환됩니다:</p>
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
<p>이제 세 개의 호스트에 Milvus가 배포되었습니다.</p>
<h2 id="Stop-nodes" class="common-anchor-header">노드 중지<button data-href="#Stop-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 클러스터가 더 이상 필요하지 않은 경우 모든 노드를 중지할 수 있습니다.</p>
<div class="alert note"><code translate="no">PATH</code> 에서 <code translate="no">terraform</code> 바이너리를 사용할 수 있는지 확인합니다. </div>
<ol>
<li><p><code translate="no">terraform destroy</code> 을 실행하고 메시지가 표시되면 <code translate="no">yes</code> 을 입력합니다.</p></li>
<li><p>성공하면 모든 노드 인스턴스가 중지됩니다.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>다른 클라우드에 Milvus를 배포하는 방법을 배우려면 다음과 같이 하세요:</p>
<ul>
<li><a href="/docs/ko/eks.md">EKS에 Milvus 클러스터 배포하기</a></li>
<li><a href="/docs/ko/gcp.md">Kubernetes를 사용하여 GCP에 Milvus 클러스터 배포하기</a></li>
<li><a href="/docs/ko/azure.md">Kubernetes를 사용하여 Microsoft Azure에 Milvus 배포하기 가이드</a></li>
</ul>
