---
id: aws.md
title: Implantar um cluster Milvus no EC2
related_key: cluster
summary: Saiba como implementar um cluster Milvus no AWS EC2.
---
<h1 id="Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="common-anchor-header">(Preterido) Implantar um cluster do Milvus no EC2<button data-href="#Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico descreve como implementar um cluster Milvus no <a href="https://docs.aws.amazon.com/ec2/">Amazon EC2</a> com Terraform e Ansible.</p>
<div class="alert note">
<p>Este tópico está desatualizado e será removido em breve. Recomendamos que consulte <a href="/docs/pt/v2.4.x/eks.md">Implantar um cluster do Milvus no EKS</a>.</p>
</div>
<h2 id="Provision-a-Milvus-cluster" class="common-anchor-header">Provisionar um cluster Milvus<button data-href="#Provision-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção descreve como utilizar o Terraform para aprovisionar um cluster Milvus.</p>
<p><a href="https://www.terraform.io/">O Terraform</a> é uma ferramenta de software de infraestrutura como código (IaC). Com o Terraform, é possível provisionar a infraestrutura usando arquivos de configuração declarativos.</p>
<h3 id="Prerequisites" class="common-anchor-header">Pré-requisitos</h3><ul>
<li><p>Instalar e configurar <a href="https://www.terraform.io/downloads.html">o Terraform</a></p></li>
<li><p>Instalar e configurar <a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html">o AWS CLI</a></p></li>
</ul>
<h3 id="Prepare-configuration" class="common-anchor-header">Preparar a configuração</h3><p>Pode transferir ficheiros de configuração modelo no <a href="https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view">Google Drive</a>.</p>
<ul>
<li><p><code translate="no">main.tf</code></p>
<p>Este ficheiro contém a configuração para o aprovisionamento de um cluster Milvus.</p></li>
<li><p><code translate="no">variables.tf</code></p>
<p>Este ficheiro permite a edição rápida das variáveis utilizadas para configurar ou atualizar um cluster Milvus.</p></li>
<li><p><code translate="no">output.tf</code> e <code translate="no">inventory.tmpl</code></p>
<p>Estes ficheiros armazenam os metadados de um cluster Milvus. Os metadados usados neste tópico são <code translate="no">public_ip</code> para cada instância de nó, <code translate="no">private_ip</code> para cada instância de nó e todos os IDs de instância do EC2.</p></li>
</ul>
<h4 id="Prepare-variablestf" class="common-anchor-header">Preparar variables.tf</h4><p>Esta secção descreve a configuração que um ficheiro <code translate="no">variables.tf</code> contém.</p>
<ul>
<li><p>Número de nós</p>
<p>O modelo a seguir declara uma variável <code translate="no">index_count</code> usada para definir o número de nós de índice.</p>
  <div class="alert note">O valor de <code translate="no">index_count</code> deve ser maior ou igual a um.</div>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;index_count&quot;</span> {
  description = <span class="hljs-string">&quot;Amount of index instances to run&quot;</span>
  <span class="hljs-keyword">type</span>        = number
  <span class="hljs-keyword">default</span>     = <span class="hljs-number">5</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Tipo de instância para um tipo de nó</p>
<p>O modelo seguinte declara uma variável <code translate="no">index_ec2_type</code> utilizada para definir o <a href="https://aws.amazon.com/ec2/instance-types/">tipo de instância</a> para os nós de índice.</p>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;index_ec2_type&quot;</span> {
  description = <span class="hljs-string">&quot;Which server type&quot;</span>
  <span class="hljs-keyword">type</span>        = <span class="hljs-type">string</span>
  <span class="hljs-keyword">default</span>     = <span class="hljs-string">&quot;c5.2xlarge&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Permissão de acesso</p>
<p>O modelo seguinte declara uma variável <code translate="no">key_name</code> e uma variável <code translate="no">my_ip</code>. A variável <code translate="no">key_name</code> representa a chave de acesso do AWS. A variável <code translate="no">my_ip</code> representa o intervalo de endereços IP para um grupo de segurança.</p>
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
<h4 id="Prepare-maintf" class="common-anchor-header">Preparar main.tf</h4><p>Esta secção descreve as configurações que um ficheiro <code translate="no">main.tf</code> contém.</p>
<ul>
<li><p>Provedor de nuvem e região</p>
<p>O modelo a seguir usa a região <code translate="no">us-east-2</code>. Consulte <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions">Regiões disponíveis</a> para obter mais informações.</p>
<pre><code translate="no" class="language-main.tf">provider <span class="hljs-string">&quot;aws&quot;</span> {
  profile = <span class="hljs-string">&quot;default&quot;</span>
  region  = <span class="hljs-string">&quot;us-east-2&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Grupo de segurança</p>
<p>O modelo a seguir declara um grupo de segurança que permite o tráfego de entrada do intervalo de endereços CIDR representado por <code translate="no">my_ip</code> declarado em <code translate="no">variables.tf</code>.</p>
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
<p>O modelo a seguir especifica uma VPC com o bloco CIDR 10.0.0.0/24 em um cluster Milvus.</p>
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
<li><p>Sub-redes (opcional)</p>
<p>O modelo a seguir declara uma sub-rede cujo tráfego é encaminhado para um gateway de Internet. Neste caso, o tamanho do bloco CIDR da sub-rede é o mesmo que o bloco CIDR da VPC.</p>
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
<li><p>Instâncias de nó (Nodes)</p>
<p>O seguinte modelo declara uma instância de nó MinIO. O ficheiro de modelo <code translate="no">main.tf</code> declara nós de 11 tipos de nós. Para alguns tipos de nós, é necessário definir <code translate="no">root_block_device</code>. Consulte <a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#ebs-ephemeral-and-root-block-devices">EBS, Ephemeral e Dispositivos de bloco raiz</a> para obter mais informações.</p>
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
<h3 id="Apply-the-configuration" class="common-anchor-header">Aplicar a configuração</h3><ol>
<li><p>Abra um terminal e navegue até a pasta que armazena <code translate="no">main.tf</code>.</p></li>
<li><p>Para inicializar a configuração, execute <code translate="no">terraform init</code>.</p></li>
<li><p>Para aplicar a configuração, execute <code translate="no">terraform apply</code> e introduza <code translate="no">yes</code> quando solicitado.</p></li>
</ol>
<p>Agora você provisionou um cluster do Milvus com o Terraform.</p>
<h2 id="Start-the-Milvus-cluster" class="common-anchor-header">Iniciar o cluster do Milvus<button data-href="#Start-the-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção descreve como utilizar o Ansible para iniciar o cluster do Milvus que foi aprovisionado.</p>
<p><a href="https://www.ansible.com/overview/how-ansible-works">O Ansible</a> é uma ferramenta de gerenciamento de configuração usada para automatizar o provisionamento de nuvem e o gerenciamento de configuração.</p>
<h3 id="Prerequisites" class="common-anchor-header">Pré-requisitos</h3><ul>
<li><a href="https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html">O Ansible Controller</a> está instalado.</li>
</ul>
<h3 id="Download-Ansible-Milvus-node-deployment-Playbook" class="common-anchor-header">Baixar o Playbook de implantação de nó do Milvus do Ansible</h3><p>Clone o repositório Milvus do GitHub para baixar o Playbook de implantação de nó do Ansible Milvus.</p>
<pre><code translate="no">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/milvus.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configure-installation-files" class="common-anchor-header">Configurar ficheiros de instalação</h3><p>Os ficheiros <code translate="no">inventory.ini</code> e <code translate="no">ansible.cfg</code> são utilizados para controlar as variáveis de ambiente e os métodos de verificação de início de sessão no manual do Ansible. No ficheiro <code translate="no">inventory.ini</code>, a secção <code translate="no">dockernodes</code> define todos os servidores de motores de docker. A secção <code translate="no">ansible.cfg</code> define todos os servidores dos coordenadores Milvus. A secção <code translate="no">node</code> define todos os servidores dos nós Milvus.</p>
<p>Introduza o caminho local para o Playbook e configure os ficheiros de instalação.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">cd</span> ./milvus/deployments/docker/cluster-distributed-deployment
<button class="copy-code-btn"></button></code></pre>
<h4 id="inventoryini" class="common-anchor-header"><code translate="no">inventory.ini</code></h4><p>Configure o <code translate="no">inventory.ini</code> para dividir os hosts em grupos de acordo com as suas funções no sistema Milvus.</p>
<p>Acrescentar os nomes dos anfitriões, definir o grupo <code translate="no">docker</code> e <code translate="no">vars</code>.</p>
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
<h4 id="ansiblecfg" class="common-anchor-header"><code translate="no">ansible.cfg</code></h4><p><code translate="no">ansible.cfg</code> controla a ação do playbook, por exemplo, a chave SSH, etc. Não configure a frase-passe através da chave SSH em anfitriões docker. Caso contrário, a conexão SSH do Ansible falhará. Recomendamos configurar o mesmo nome de usuário e chave SSH nos três hosts e configurar a nova conta de usuário para executar o sudo sem uma senha. Caso contrário, receberá erros que indicam que o nome de utilizador não corresponde à palavra-passe ou que não lhe são concedidos privilégios elevados ao executar o playbook do Ansible.</p>
<pre><code translate="no">[defaults]
host_key_checking = <span class="hljs-literal">False</span>
inventory = inventory.ini <span class="hljs-comment"># Specify the Inventory file</span>
private_key_file=~/.my_ssh_keys/gpc_sshkey <span class="hljs-comment"># Specify the SSH key that Ansible uses to access Docker host</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="deploy-dockeryml" class="common-anchor-header"><code translate="no">deploy-docker.yml</code></h4><p><code translate="no">deploy-docker.yml</code> define as tarefas durante a instalação do Docker. Consulte os comentários de código no arquivo para obter detalhes.</p>
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
<h3 id="Test-Ansible-connectivity" class="common-anchor-header">Testar a conetividade do Ansible</h3><p>Teste a conetividade com o Ansible.</p>
<pre><code translate="no" class="language-shell">$ ansible <span class="hljs-built_in">all</span> -m ping
<button class="copy-code-btn"></button></code></pre>
<p>Adicione <code translate="no">-i</code> no comando para especificar o caminho para o ficheiro de inventário se não o tiver especificado em <code translate="no">ansible.cfg</code>, caso contrário o Ansible utiliza <code translate="no">/etc/ansible/hosts</code>.</p>
<p>O terminal retorna o seguinte:</p>
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
<h3 id="Check-the-Playbook-Syntax" class="common-anchor-header">Verificar a sintaxe do Playbook</h3><p>Verifique a sintaxe do Playbook.</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-docker.yml --syntax-check
<button class="copy-code-btn"></button></code></pre>
<p>Normalmente, o terminal retorna o seguinte:</p>
<pre><code translate="no">playbook: deploy-docker.yml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-Docker" class="common-anchor-header">Instalar o Docker</h3><p>Instale o Docker com o Playbook.</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-docker.yml
<button class="copy-code-btn"></button></code></pre>
<p>Se o Docker for instalado com sucesso nos três hosts, o terminal retornará o seguinte:</p>
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
<h3 id="Verify-the-installation" class="common-anchor-header">Verificar a instalação</h3><p>Faça login nos três hosts com a chave SSH e verifique a instalação nos hosts.</p>
<ul>
<li>Para o host raiz:</li>
</ul>
<pre><code translate="no" class="language-shell">$ docker -v
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Para hosts não-root:</li>
</ul>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker -v
<button class="copy-code-btn"></button></code></pre>
<p>Normalmente, o terminal retorna como a seguir:</p>
<pre><code translate="no">Docker version 20.10.14, build a224086
<button class="copy-code-btn"></button></code></pre>
<p>Verificar o estado de execução dos contentores.</p>
<pre><code translate="no" class="language-shell">$ docker ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Check-the-Syntax" class="common-anchor-header">Verificar a sintaxe</h3><p>Verificar a sintaxe de <code translate="no">deploy-milvus.yml</code>.</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-milvus.yml --syntax-check
<button class="copy-code-btn"></button></code></pre>
<p>Normalmente, o terminal retorna o seguinte:</p>
<pre><code translate="no">playbook: deploy-milvus.yml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Milvus-container" class="common-anchor-header">Criar o contentor Milvus</h3><p>As tarefas para criar o contentor Milvus estão definidas em <code translate="no">deploy-milvus.yml</code>.</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-milvus.yml
<button class="copy-code-btn"></button></code></pre>
<p>O terminal retorna:</p>
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
<p>Agora você tem o Milvus implantado nos três hosts.</p>
<h2 id="Stop-nodes" class="common-anchor-header">Parar os nós<button data-href="#Stop-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode parar todos os nós depois de já não precisar de um cluster Milvus.</p>
<div class="alert note"> Certifique-se de que o binário <code translate="no">terraform</code> está disponível no seu <code translate="no">PATH</code>. </div>
<ol>
<li><p>Execute <code translate="no">terraform destroy</code> e introduza <code translate="no">yes</code> quando solicitado.</p></li>
<li><p>Se for bem-sucedido, todas as instâncias de nós serão interrompidas.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">O que se segue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Se você quiser aprender como implantar o Milvus em outras nuvens:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/eks.md">Implantar um cluster do Milvus no EKS</a></li>
<li><a href="/docs/pt/v2.4.x/gcp.md">Implantar o cluster do Milvus no GCP com o Kubernetes</a></li>
<li><a href="/docs/pt/v2.4.x/azure.md">Guia para implantar o Milvus no Microsoft Azure com o Kubernetes</a></li>
</ul>
