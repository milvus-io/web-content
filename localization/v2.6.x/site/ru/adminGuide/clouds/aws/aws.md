---
id: aws.md
title: Развертывание кластера Milvus на EC2
related_key: cluster
summary: 'Узнайте, как развернуть кластер Milvus на AWS EC2.'
---
<h1 id="Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="common-anchor-header">(Утратил силу) Развертывание кластера Milvus на EC2<button data-href="#Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается, как развернуть кластер Milvus на <a href="https://docs.aws.amazon.com/ec2/">Amazon EC2</a> с помощью Terraform и Ansible.</p>
<div class="alert note">
<p>Эта тема устарела и скоро будет удалена. Вместо нее рекомендуем обратиться к разделу <a href="/docs/ru/eks.md">Развертывание кластера Milvus на EKS</a>.</p>
</div>
<h2 id="Provision-a-Milvus-cluster" class="common-anchor-header">Создание кластера Milvus<button data-href="#Provision-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе описывается, как использовать Terraform для создания кластера Milvus.</p>
<p><a href="https://www.terraform.io/">Terraform</a> - это программный инструмент "инфраструктура как код" (IaC). С помощью Terraform вы можете создавать инфраструктуру, используя декларативные файлы конфигурации.</p>
<h3 id="Prerequisites" class="common-anchor-header">Необходимые условия</h3><ul>
<li><p>Установите и настройте <a href="https://www.terraform.io/downloads.html">Terraform</a></p></li>
<li><p>Установка и настройка <a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html">AWS CLI</a></p></li>
</ul>
<h3 id="Prepare-configuration" class="common-anchor-header">Подготовьте конфигурацию</h3><p>Шаблонные файлы конфигурации можно скачать на <a href="https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view">Google Drive</a>.</p>
<ul>
<li><p><code translate="no">main.tf</code></p>
<p>Этот файл содержит конфигурацию для инициализации кластера Milvus.</p></li>
<li><p><code translate="no">variables.tf</code></p>
<p>Этот файл позволяет быстро редактировать переменные, используемые для настройки или обновления кластера Milvus.</p></li>
<li><p><code translate="no">output.tf</code> и <code translate="no">inventory.tmpl</code></p>
<p>В этих файлах хранятся метаданные кластера Milvus. Метаданные, используемые в этой теме, - это <code translate="no">public_ip</code> для каждого экземпляра узла, <code translate="no">private_ip</code> для каждого экземпляра узла и все идентификаторы экземпляров EC2.</p></li>
</ul>
<h4 id="Prepare-variablestf" class="common-anchor-header">Подготовка переменных.tf</h4><p>В этом разделе описывается конфигурация, которую содержит файл <code translate="no">variables.tf</code>.</p>
<ul>
<li><p>Количество узлов</p>
<p>В следующем шаблоне объявлена переменная <code translate="no">index_count</code>, используемая для установки количества узлов индекса.</p>
  <div class="alert note">Значение <code translate="no">index_count</code> должно быть больше или равно единице.</div>
<pre><code translate="no" class="language-variables.tf">variable &quot;index_count&quot; {
  description = &quot;Amount of index instances to run&quot;
  type        = number
  default     = 5
}
</code></pre></li>
<li><p>Тип экземпляра для типа узла</p>
<p>Следующий шаблон объявляет переменную <code translate="no">index_ec2_type</code>, используемую для задания <a href="https://aws.amazon.com/ec2/instance-types/">типа экземпляра</a> для индексных узлов.</p>
<pre><code translate="no" class="language-variables.tf">variable &quot;index_ec2_type&quot; {
  description = &quot;Which server type&quot;
  type        = string
  default     = &quot;c5.2xlarge&quot;
}
</code></pre></li>
<li><p>Разрешение доступа</p>
<p>В следующем шаблоне объявлены переменная <code translate="no">key_name</code> и переменная <code translate="no">my_ip</code>. Переменная <code translate="no">key_name</code> представляет ключ доступа AWS. Переменная <code translate="no">my_ip</code> представляет диапазон IP-адресов для группы безопасности.</p>
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
<h4 id="Prepare-maintf" class="common-anchor-header">Подготовка файла main.tf</h4><p>В этом разделе описаны конфигурации, которые содержит файл <code translate="no">main.tf</code>.</p>
<ul>
<li><p>Облачный провайдер и регион</p>
<p>В следующем шаблоне используется регион <code translate="no">us-east-2</code>. Дополнительные сведения см. в разделе <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions">Доступные регионы</a>.</p>
<pre><code translate="no" class="language-main.tf">provider &quot;aws&quot; {
  profile = &quot;default&quot;
  region  = &quot;us-east-2&quot;
}
</code></pre></li>
<li><p>Группа безопасности</p>
<p>В следующем шаблоне объявлена группа безопасности, которая разрешает входящий трафик из диапазона адресов CIDR, представленного в <code translate="no">my_ip</code>, объявленном в <code translate="no">variables.tf</code>.</p>
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
<p>Следующий шаблон определяет VPC с блоком CIDR 10.0.0.0/24 на кластере Milvus.</p>
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
<li><p>Подсети (необязательно)</p>
<p>В следующем шаблоне объявляется подсеть, трафик которой направляется на интернет-шлюз. В этом случае размер CIDR-блока подсети равен размеру CIDR-блока VPC.</p>
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
<li><p>Экземпляры узлов (узлы)</p>
<p>Следующий шаблон объявляет экземпляр узла MinIO. В файле шаблона <code translate="no">main.tf</code> объявлены узлы 11 типов узлов. Для некоторых типов узлов необходимо установить <code translate="no">root_block_device</code>. Дополнительные сведения см. в разделах <a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#ebs-ephemeral-and-root-block-devices">EBS, Ephemeral и Root Block Devices</a>.</p>
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
<h3 id="Apply-the-configuration" class="common-anchor-header">Применение конфигурации</h3><ol>
<li><p>Откройте терминал и перейдите в папку, в которой хранится <code translate="no">main.tf</code>.</p></li>
<li><p>Чтобы инициализировать конфигурацию, выполните команду <code translate="no">terraform init</code>.</p></li>
<li><p>Чтобы применить конфигурацию, запустите <code translate="no">terraform apply</code> и введите <code translate="no">yes</code>, когда появится запрос.</p></li>
</ol>
<p>Теперь вы создали кластер Milvus с помощью Terraform.</p>
<h2 id="Start-the-Milvus-cluster" class="common-anchor-header">Запуск кластера Milvus<button data-href="#Start-the-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе описывается, как с помощью Ansible запустить созданный вами кластер Milvus.</p>
<p><a href="https://www.ansible.com/overview/how-ansible-works">Ansible</a> - это инструмент управления конфигурацией, используемый для автоматизации предоставления облака и управления конфигурацией.</p>
<h3 id="Prerequisites" class="common-anchor-header">Необходимые условия</h3><ul>
<li>Установлен<a href="https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html">Ansible Controller</a>.</li>
</ul>
<h3 id="Download-Ansible-Milvus-node-deployment-Playbook" class="common-anchor-header">Загрузите учебник Ansible Milvus node deployment Playbook</h3><p>Клонируйте репозиторий Milvus с GitHub, чтобы загрузить учебник Ansible Milvus node deployment Playbook.</p>
<pre><code translate="no">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/milvus.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configure-installation-files" class="common-anchor-header">Настройте файлы установки</h3><p>Файлы <code translate="no">inventory.ini</code> и <code translate="no">ansible.cfg</code> используются для управления переменными окружения и методами проверки входа в систему в плейбуке Ansible. В файле <code translate="no">inventory.ini</code> секция <code translate="no">dockernodes</code> определяет все серверы движков docker. Секция <code translate="no">ansible.cfg</code> определяет все серверы координаторов Milvus. В секции <code translate="no">node</code> определены все серверы узлов Milvus.</p>
<p>Укажите локальный путь к Playbook и настройте файлы установки.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> ./milvus/deployments/docker/cluster-distributed-deployment</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="inventoryini" class="common-anchor-header"><code translate="no">inventory.ini</code></h4><p>Настройте <code translate="no">inventory.ini</code> для разделения узлов на группы в соответствии с их ролями в системе Milvus.</p>
<p>Добавьте имена хостов, определите группу <code translate="no">docker</code> и <code translate="no">vars</code>.</p>
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
<h4 id="ansiblecfg" class="common-anchor-header"><code translate="no">ansible.cfg</code></h4><p><code translate="no">ansible.cfg</code> контролирует действия плейбука, например, SSH-ключ и т. д. Не задавайте парольную фразу через SSH-ключ на хостах docker. В противном случае подключение Ansible по SSH будет неудачным. Мы рекомендуем задать одно и то же имя пользователя и SSH-ключ на трех хостах и настроить новую учетную запись пользователя на выполнение sudo без пароля. В противном случае вы будете получать ошибки о том, что имя пользователя не соответствует паролю или вам не предоставлены повышенные привилегии при запуске плейбука Ansible.</p>
<pre><code translate="no"><span class="hljs-section">[defaults]</span>
<span class="hljs-attr">host_key_checking</span> = <span class="hljs-literal">False</span>
<span class="hljs-attr">inventory</span> = inventory.ini <span class="hljs-comment"># Specify the Inventory file</span>
<span class="hljs-attr">private_key_file</span>=~/.my_ssh_keys/gpc_sshkey <span class="hljs-comment"># Specify the SSH key that Ansible uses to access Docker host</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="deploy-dockeryml" class="common-anchor-header"><code translate="no">deploy-docker.yml</code></h4><p><code translate="no">deploy-docker.yml</code> определяет задачи при установке Docker. Подробности смотрите в комментариях к коду в файле.</p>
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
<h3 id="Test-Ansible-connectivity" class="common-anchor-header">Проверка подключения к Ansible</h3><p>Проверьте подключение к Ansible.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible all -m ping</span>
<button class="copy-code-btn"></button></code></pre>
<p>Добавьте в команду <code translate="no">-i</code>, чтобы указать путь к файлу инвентаризации, если вы не указали его в <code translate="no">ansible.cfg</code>, иначе Ansible использует <code translate="no">/etc/ansible/hosts</code>.</p>
<p>Терминал выдает следующее сообщение:</p>
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
<h3 id="Check-the-Playbook-Syntax" class="common-anchor-header">Проверка синтаксиса плейбука</h3><p>Проверьте синтаксис Playbook.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-docker.yml --syntax-check</span>
<button class="copy-code-btn"></button></code></pre>
<p>Обычно терминал выдает следующее сообщение:</p>
<pre><code translate="no"><span class="hljs-section">playbook: deploy-docker.yml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-Docker" class="common-anchor-header">Установить Docker</h3><p>Установите Docker с помощью Playbook.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-docker.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Если Docker успешно установлен на трех хостах, терминал выдает следующее сообщение:</p>
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
<h3 id="Verify-the-installation" class="common-anchor-header">Проверить установку</h3><p>Войдите на три хоста с помощью SSH-ключа и проверьте установку на хостах.</p>
<ul>
<li>Для корневого хоста:</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker -v</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Для хостов, не являющихся root-хостами:</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker -v</span>
<button class="copy-code-btn"></button></code></pre>
<p>Обычно терминал выдает следующее сообщение:</p>
<pre><code translate="no"><span class="hljs-attribute">Docker</span> version <span class="hljs-number">20</span>.<span class="hljs-number">10</span>.<span class="hljs-number">14</span>, build a224086
<button class="copy-code-btn"></button></code></pre>
<p>Проверьте состояние работы контейнеров.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker ps</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Check-the-Syntax" class="common-anchor-header">Проверьте синтаксис</h3><p>Проверьте синтаксис <code translate="no">deploy-milvus.yml</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-milvus.yml --syntax-check</span>
<button class="copy-code-btn"></button></code></pre>
<p>Обычно терминал выдает следующее:</p>
<pre><code translate="no"><span class="hljs-section">playbook: deploy-milvus.yml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Milvus-container" class="common-anchor-header">Создать контейнер Milvus</h3><p>Задачи по созданию контейнера Milvus определены в <code translate="no">deploy-milvus.yml</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-milvus.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Терминал возвращается:</p>
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
<p>Теперь у вас есть Milvus, развернутый на трех узлах.</p>
<h2 id="Stop-nodes" class="common-anchor-header">Остановка узлов<button data-href="#Stop-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете остановить все узлы после того, как вам больше не нужен кластер Milvus.</p>
<div class="alert note"> Убедитесь, что двоичный файл <code translate="no">terraform</code> доступен на вашем компьютере <code translate="no">PATH</code>. </div>
<ol>
<li><p>Запустите <code translate="no">terraform destroy</code> и введите <code translate="no">yes</code>, когда появится запрос.</p></li>
<li><p>В случае успеха все экземпляры узлов будут остановлены.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Если вы хотите узнать, как развернуть Milvus в других облаках:</p>
<ul>
<li><a href="/docs/ru/eks.md">Развертывание кластера Milvus на EKS</a></li>
<li><a href="/docs/ru/gcp.md">Развертывание кластера Milvus на GCP с помощью Kubernetes</a></li>
<li><a href="/docs/ru/azure.md">Руководство по развертыванию Milvus в Microsoft Azure с помощью Kubernetes</a></li>
</ul>
