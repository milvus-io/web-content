---
id: aws.md
title: Despliegue de un clúster Milvus en EC2
related_key: cluster
summary: Aprenda a desplegar un clúster Milvus en AWS EC2.
---
<h1 id="Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="common-anchor-header">(Obsoleto) Desplegar un clúster Milvus en EC2<button data-href="#Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema describe cómo implementar un clúster Milvus en <a href="https://docs.aws.amazon.com/ec2/">Amazon EC2</a> con Terraform y Ansible.</p>
<div class="alert note">
<p>Este tema está obsoleto y será eliminado pronto. En su lugar, le recomendamos que consulte <a href="/docs/es/eks.md">Despliegue de un clúster Milvus en EKS</a>.</p>
</div>
<h2 id="Provision-a-Milvus-cluster" class="common-anchor-header">Aprovisionar un cluster Milvus<button data-href="#Provision-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta sección describe cómo utilizar Terraform para aprovisionar un cluster Milvus.</p>
<p><a href="https://www.terraform.io/">Terraform</a> es una herramienta de software de infraestructura como código (IaC). Con Terraform, puede aprovisionar infraestructura utilizando archivos de configuración declarativos.</p>
<h3 id="Prerequisites" class="common-anchor-header">Requisitos previos</h3><ul>
<li><p>Instalar y configurar <a href="https://www.terraform.io/downloads.html">Terraform</a></p></li>
<li><p>Instalar y configurar <a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html">AWS CLI</a></p></li>
</ul>
<h3 id="Prepare-configuration" class="common-anchor-header">Preparar la configuración</h3><p>Puede descargar archivos de configuración de plantillas en <a href="https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view">Google Drive</a>.</p>
<ul>
<li><p><code translate="no">main.tf</code></p>
<p>Este archivo contiene la configuración para aprovisionar un clúster Milvus.</p></li>
<li><p><code translate="no">variables.tf</code></p>
<p>Este archivo permite editar rápidamente las variables utilizadas para configurar o actualizar un clúster Milvus.</p></li>
<li><p><code translate="no">output.tf</code> y <code translate="no">inventory.tmpl</code></p>
<p>Estos archivos almacenan los metadatos de un cluster Milvus. Los metadatos utilizados en este tema son <code translate="no">public_ip</code> para cada instancia de nodo, <code translate="no">private_ip</code> para cada instancia de nodo y todos los ID de instancia EC2.</p></li>
</ul>
<h4 id="Prepare-variablestf" class="common-anchor-header">Preparar variables.tf</h4><p>Esta sección describe la configuración que contiene un archivo <code translate="no">variables.tf</code>.</p>
<ul>
<li><p>Número de nodos</p>
<p>La siguiente plantilla declara una variable <code translate="no">index_count</code> utilizada para establecer el número de nodos de índice.</p>
  <div class="alert note">El valor de <code translate="no">index_count</code> debe ser mayor o igual a uno.</div>
<pre><code translate="no" class="language-variables.tf">variable &quot;index_count&quot; {
  description = &quot;Amount of index instances to run&quot;
  type        = number
  default     = 5
}
</code></pre></li>
<li><p>Tipo de instancia para un tipo de nodo</p>
<p>La siguiente plantilla declara una variable <code translate="no">index_ec2_type</code> utilizada para establecer el <a href="https://aws.amazon.com/ec2/instance-types/">tipo de instancia</a> para los nodos índice.</p>
<pre><code translate="no" class="language-variables.tf">variable &quot;index_ec2_type&quot; {
  description = &quot;Which server type&quot;
  type        = string
  default     = &quot;c5.2xlarge&quot;
}
</code></pre></li>
<li><p>Permiso de acceso</p>
<p>La siguiente plantilla declara una variable <code translate="no">key_name</code> y una variable <code translate="no">my_ip</code>. La variable <code translate="no">key_name</code> representa la clave de acceso de AWS. La variable <code translate="no">my_ip</code> representa el rango de direcciones IP para un grupo de seguridad.</p>
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
<h4 id="Prepare-maintf" class="common-anchor-header">Preparar main.tf</h4><p>Esta sección describe las configuraciones que contiene un archivo <code translate="no">main.tf</code>.</p>
<ul>
<li><p>Proveedor de nube y región</p>
<p>La siguiente plantilla utiliza la región <code translate="no">us-east-2</code>. Consulte <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions">Regiones disponibles</a> para obtener más información.</p>
<pre><code translate="no" class="language-main.tf">provider &quot;aws&quot; {
  profile = &quot;default&quot;
  region  = &quot;us-east-2&quot;
}
</code></pre></li>
<li><p>Grupo de seguridad</p>
<p>La siguiente plantilla declara un grupo de seguridad que permite el tráfico entrante desde el rango de direcciones CIDR representado por <code translate="no">my_ip</code> declarado en <code translate="no">variables.tf</code>.</p>
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
<p>La siguiente plantilla especifica una VPC con el bloque CIDR 10.0.0.0/24 en un clúster Milvus.</p>
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
<li><p>Subredes (opcional)</p>
<p>La siguiente plantilla declara una subred cuyo tráfico se enruta a una pasarela de Internet. En este caso, el tamaño del bloque CIDR de la subred es el mismo que el bloque CIDR de la VPC.</p>
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
<li><p>Instancias de nodo (Nodos)</p>
<p>La siguiente plantilla declara una instancia de nodo MinIO. El archivo de plantilla <code translate="no">main.tf</code> declara nodos de 11 tipos de nodo. Para algunos tipos de nodo, es necesario configurar <code translate="no">root_block_device</code>. Consulte <a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#ebs-ephemeral-and-root-block-devices">Dispositivos EBS, efímeros y de bloque</a> raíz para obtener más información.</p>
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
<h3 id="Apply-the-configuration" class="common-anchor-header">Aplique la configuración</h3><ol>
<li><p>Abra un terminal y navegue hasta la carpeta que almacena <code translate="no">main.tf</code>.</p></li>
<li><p>Para inicializar la configuración, ejecute <code translate="no">terraform init</code>.</p></li>
<li><p>Para aplicar la configuración, ejecute <code translate="no">terraform apply</code> e introduzca <code translate="no">yes</code> cuando se le solicite.</p></li>
</ol>
<p>Ahora ha aprovisionado un cluster Milvus con Terraform.</p>
<h2 id="Start-the-Milvus-cluster" class="common-anchor-header">Iniciar el cluster Milvus<button data-href="#Start-the-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta sección describe cómo utilizar Ansible para iniciar el cluster Milvus que ha aprovisionado.</p>
<p><a href="https://www.ansible.com/overview/how-ansible-works">Ansible</a> es una herramienta de gestión de la configuración utilizada para automatizar el aprovisionamiento de la nube y la gestión de la configuración.</p>
<h3 id="Prerequisites" class="common-anchor-header">Requisitos previos</h3><ul>
<li><a href="https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html">Ansible Controller</a> está instalado.</li>
</ul>
<h3 id="Download-Ansible-Milvus-node-deployment-Playbook" class="common-anchor-header">Descargar Ansible Milvus nodo despliegue Playbook</h3><p>Clone el repositorio de Milvus desde GitHub para descargar el Manual de implementación de nodos Milvus de Ansible.</p>
<pre><code translate="no">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/milvus.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configure-installation-files" class="common-anchor-header">Configurar los archivos de instalación</h3><p>Los archivos <code translate="no">inventory.ini</code> y <code translate="no">ansible.cfg</code> se utilizan para controlar las variables de entorno y los métodos de verificación de inicio de sesión en Ansible playbook. En el archivo <code translate="no">inventory.ini</code>, la sección <code translate="no">dockernodes</code> define todos los servidores de motores Docker. La sección <code translate="no">ansible.cfg</code> define todos los servidores de coordinadores Milvus. La sección <code translate="no">node</code> define todos los servidores de los nodos Milvus.</p>
<p>Introduzca la ruta local al Playbook y configure los archivos de instalación.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> ./milvus/deployments/docker/cluster-distributed-deployment</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="inventoryini" class="common-anchor-header"><code translate="no">inventory.ini</code></h4><p>Configure <code translate="no">inventory.ini</code> para dividir los hosts en grupos de acuerdo con sus roles en el sistema Milvus.</p>
<p>Añada nombres de host y defina el grupo <code translate="no">docker</code> y <code translate="no">vars</code>.</p>
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
<h4 id="ansiblecfg" class="common-anchor-header"><code translate="no">ansible.cfg</code></h4><p><code translate="no">ansible.cfg</code> Controla la acción del playbook, por ejemplo, clave SSH, etc. No configure la frase de contraseña a través de la clave SSH en hosts Docker. De lo contrario, la conexión SSH de Ansible fallará. Recomendamos configurar el mismo nombre de usuario y clave SSH en los tres hosts y configurar la nueva cuenta de usuario para ejecutar sudo sin contraseña. De lo contrario, recibirá errores de que el nombre de usuario no coincide con la contraseña o no se le conceden privilegios elevados al ejecutar Ansible playbook.</p>
<pre><code translate="no"><span class="hljs-section">[defaults]</span>
<span class="hljs-attr">host_key_checking</span> = <span class="hljs-literal">False</span>
<span class="hljs-attr">inventory</span> = inventory.ini <span class="hljs-comment"># Specify the Inventory file</span>
<span class="hljs-attr">private_key_file</span>=~/.my_ssh_keys/gpc_sshkey <span class="hljs-comment"># Specify the SSH key that Ansible uses to access Docker host</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="deploy-dockeryml" class="common-anchor-header"><code translate="no">deploy-docker.yml</code></h4><p><code translate="no">deploy-docker.yml</code> define las tareas durante la instalación de Docker. Consulte los comentarios de código en el archivo para obtener más detalles.</p>
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
<h3 id="Test-Ansible-connectivity" class="common-anchor-header">Probar la conectividad con Ansible</h3><p>Pruebe la conectividad con Ansible.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible all -m ping</span>
<button class="copy-code-btn"></button></code></pre>
<p>Añada <code translate="no">-i</code> en el comando para especificar la ruta al archivo de inventario si no lo especificó en <code translate="no">ansible.cfg</code>, de lo contrario Ansible utiliza <code translate="no">/etc/ansible/hosts</code>.</p>
<p>El terminal devuelve lo siguiente:</p>
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
<h3 id="Check-the-Playbook-Syntax" class="common-anchor-header">Comprobar la sintaxis del Playbook</h3><p>Compruebe la sintaxis del Playbook.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-docker.yml --syntax-check</span>
<button class="copy-code-btn"></button></code></pre>
<p>Normalmente, el terminal devuelve lo siguiente:</p>
<pre><code translate="no"><span class="hljs-section">playbook: deploy-docker.yml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-Docker" class="common-anchor-header">Instalar Docker</h3><p>Instala Docker con el Playbook.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-docker.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Si Docker se instala correctamente en los tres hosts, el terminal devuelve lo siguiente:</p>
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
<h3 id="Verify-the-installation" class="common-anchor-header">Verificar la instalación</h3><p>Inicie sesión en los tres hosts con la clave SSH y verifique la instalación en los hosts.</p>
<ul>
<li>Para el host root:</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker -v</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Para hosts no root:</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker -v</span>
<button class="copy-code-btn"></button></code></pre>
<p>Normalmente, el terminal muestra lo siguiente:</p>
<pre><code translate="no"><span class="hljs-attribute">Docker</span> version <span class="hljs-number">20</span>.<span class="hljs-number">10</span>.<span class="hljs-number">14</span>, build a224086
<button class="copy-code-btn"></button></code></pre>
<p>Compruebe el estado de ejecución de los contenedores.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker ps</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Check-the-Syntax" class="common-anchor-header">Compruebe la sintaxis</h3><p>Compruebe la sintaxis de <code translate="no">deploy-milvus.yml</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-milvus.yml --syntax-check</span>
<button class="copy-code-btn"></button></code></pre>
<p>Normalmente, el terminal devuelve lo siguiente:</p>
<pre><code translate="no"><span class="hljs-section">playbook: deploy-milvus.yml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Milvus-container" class="common-anchor-header">Crear contenedor Milvus</h3><p>Las tareas para crear el contenedor Milvus están definidas en <code translate="no">deploy-milvus.yml</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ansible-playbook deploy-milvus.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>El terminal devuelve:</p>
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
<p>Ahora tiene Milvus desplegado en los tres hosts.</p>
<h2 id="Stop-nodes" class="common-anchor-header">Detener nodos<button data-href="#Stop-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede detener todos los nodos cuando ya no necesite un cluster Milvus.</p>
<div class="alert note"> Asegúrese de que el binario <code translate="no">terraform</code> está disponible en su <code translate="no">PATH</code>. </div>
<ol>
<li><p>Ejecute <code translate="no">terraform destroy</code> e introduzca <code translate="no">yes</code> cuando se le solicite.</p></li>
<li><p>Si tiene éxito, se detendrán todas las instancias de nodos.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">Qué hacer a continuación<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Si desea aprender cómo desplegar Milvus en otras nubes:</p>
<ul>
<li><a href="/docs/es/eks.md">Despliegue un Cluster Milvus en EKS</a></li>
<li><a href="/docs/es/gcp.md">Despliegue un Cluster Milvus en GCP con Kubernetes</a></li>
<li><a href="/docs/es/azure.md">Guía para implementar Milvus en Microsoft Azure con Kubernetes</a></li>
</ul>
