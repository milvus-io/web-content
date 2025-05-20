---
id: aws.md
title: Deploy a Milvus Cluster on EC2
related_key: cluster
summary: Learn how to deploy a Milvus cluster on AWS EC2.
---
<h1 id="Deploy-a-Milvus-Cluster-on-EC2" class="common-anchor-header">Deploy a Milvus Cluster on EC2<button data-href="#Deploy-a-Milvus-Cluster-on-EC2" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to deploy a Milvus cluster on <a href="https://docs.aws.amazon.com/ec2/">Amazon EC2</a> with Terraform and Ansible.</p>
<h2 id="Provision-a-Milvus-cluster" class="common-anchor-header">Provision a Milvus cluster<button data-href="#Provision-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>This section describes how to use Terraform to provision a Milvus cluster.</p>
<p><a href="https://www.terraform.io/">Terraform</a> is an infrastructure as code (IaC) software tool. With Terraform, you can provision infrastructure by using declarative configuration files.</p>
<h3 id="Prerequisites" class="common-anchor-header">Prerequisites</h3><ul>
<li><p>Install and configure <a href="https://www.terraform.io/downloads.html">Terraform</a></p></li>
<li><p>Install and configure <a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html">AWS CLI</a></p></li>
</ul>
<h3 id="Prepare-configuration" class="common-anchor-header">Prepare configuration</h3><p>You can download template configuration files at <a href="https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view">Google Drive</a>.</p>
<ul>
<li><p><code translate="no">main.tf</code></p>
<p>This file contains the configuration for provisioning a Milvus cluster.</p></li>
<li><p><code translate="no">variables.tf</code></p>
<p>This file allows quick editing of variables used to set up or update a Milvus cluster.</p></li>
<li><p><code translate="no">output.tf</code> and <code translate="no">inventory.tmpl</code></p>
<p>These files store the metadata of a Milvus cluster. The metadata used in this topic is the <code translate="no">public_ip</code> for each node instance, <code translate="no">private_ip</code> for each node instance, and all EC2 instance IDs.</p></li>
</ul>
<h4 id="Prepare-variablestf" class="common-anchor-header">Prepare variables.tf</h4><p>This section describes the configuration that a <code translate="no">variables.tf</code> file that contains.</p>
<ul>
<li><p>Number of nodes</p>
<p>The following template declares an <code translate="no">index_count</code> variable used to set the number of index nodes.</p>
  <div class="alert note">The value of <code translate="no">index_count</code> must be greater than or equal to one.</div>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;index_count&quot;</span> {
  description = <span class="hljs-string">&quot;Amount of index instances to run&quot;</span>
  <span class="hljs-keyword">type</span>        = number
  <span class="hljs-keyword">default</span>     = <span class="hljs-number">5</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Instance type for a node type</p>
<p>The following template declares an <code translate="no">index_ec2_type</code> variable used to set the <a href="https://aws.amazon.com/ec2/instance-types/">instance type</a> for index nodes.</p>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;index_ec2_type&quot;</span> {
  description = <span class="hljs-string">&quot;Which server type&quot;</span>
  <span class="hljs-keyword">type</span>        = <span class="hljs-type">string</span>
  <span class="hljs-keyword">default</span>     = <span class="hljs-string">&quot;c5.2xlarge&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Access permission</p>
<p>The following template declares a <code translate="no">key_name</code> variable and a <code translate="no">my_ip</code> variable. The <code translate="no">key_name</code> variable represents the AWS access key. The <code translate="no">my_ip</code> variable represents the IP address range for a security group.</p>
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
<h4 id="Prepare-maintf" class="common-anchor-header">Prepare main.tf</h4><p>This section describes the configurations that a <code translate="no">main.tf</code> file that contains.</p>
<ul>
<li><p>Cloud provider and region</p>
<p>The following template uses the <code translate="no">us-east-2</code> region. See <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions">Available Regions</a> for more information.</p>
<pre><code translate="no" class="language-main.tf">provider <span class="hljs-string">&quot;aws&quot;</span> {
  profile = <span class="hljs-string">&quot;default&quot;</span>
  region  = <span class="hljs-string">&quot;us-east-2&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Security group</p>
<p>The following template declares a security group that allows incoming traffic from the CIDR address range represented by <code translate="no">my_ip</code> declared in <code translate="no">variables.tf</code>.</p>
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
<p>The following template specifies a VPC with the 10.0.0.0/24 CIDR block on a Milvus cluster.</p>
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
<li><p>Subnets (Optional)</p>
<p>The following template declares a subnet whose traffic is routed to an internet gateway. In this case, the size of the subnet’s CIDR block is the same as the VPC’s CIDR block.</p>
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
<li><p>Node instances (Nodes)</p>
<p>The following template declares a MinIO node instance. The <code translate="no">main.tf</code> template file declares nodes of 11 node types. For some node types, you need to set <code translate="no">root_block_device</code>. See <a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#ebs-ephemeral-and-root-block-devices">EBS, Ephemeral, and Root Block Devices</a> for more information.</p>
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
<h3 id="Apply-the-configuration" class="common-anchor-header">Apply the configuration</h3><ol>
<li><p>Open a terminal and navigate to the folder that stores <code translate="no">main.tf</code>.</p></li>
<li><p>To initialize the configuration, run <code translate="no">terraform init</code>.</p></li>
<li><p>To apply the configuration, run <code translate="no">terraform apply</code> and enter <code translate="no">yes</code> when prompted.</p></li>
</ol>
<p>You have now provisioned a Milvus cluster with Terraform.</p>
<h2 id="Start-the-Milvus-cluster" class="common-anchor-header">Start the Milvus cluster<button data-href="#Start-the-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>This section describes how to use Ansible to start the Milvus cluster that you have provisioned.</p>
<p><a href="https://www.ansible.com/overview/how-ansible-works">Ansible</a> is a configuration management tool used to automate cloud provisioning and configuration management.</p>
<h3 id="Prerequisites" class="common-anchor-header">Prerequisites</h3><ul>
<li>Install and configure <a href="https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html">Ansible</a></li>
</ul>
<h3 id="Prepare-configuration" class="common-anchor-header">Prepare configuration</h3><p>You can download template configuration files at <a href="https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view">Google Drive</a>.</p>
<ul>
<li><p>Files in the <code translate="no">yaml_files</code> folder</p>
<p>This folder stores Jinja2 files for each node type. Ansible uses Jinja2 templating. See <a href="https://github.com/pallets/jinja/blob/main/docs/intro.rst">Introduction</a> for more information about Jinja2.</p></li>
<li><p><code translate="no">playbook.yaml</code></p>
<p>This file performs a set of tasks on specific sets of nodes. The template begins with installing Docker and Docker Compose on all node instances on the Milvus cluster.</p>
  <div class="alert note">A playbook runs in sequence from top to bottom. Within each play, tasks also run in sequence from top to bottom.</div>
<pre><code translate="no" class="language-playbook.yaml">- name: All Servers
  hosts: etcd_ips_public:pulsar_ips_public:minio_ips_public:data_ips_public:index_ips_public:query_ips_public:proxy_ips_public:root_coordinator_ips_public:data_coordinator_ips_public:query_coordinator_ips_public:index_coordinator_ips_public
  remote_user: ec2-user
  become: <span class="hljs-literal">true</span>
  tags:
    - start
  tasks:
  - name: Install docker
    ansible.builtin.yum:
      name: docker
      state: present
  - name: Run docker
    ansible.builtin.service:
      name: docker
      state: started

  - name: Install or upgrade docker-compose
    get_url: 
      url : <span class="hljs-string">&quot;https://github.com/docker/compose/releases/download/1.29.2/docker-compose-Linux-x86_64&quot;</span>
      dest: /usr/local/bin/docker-compose
      mode: <span class="hljs-string">&#x27;a+x&#x27;</span>
      force: <span class="hljs-built_in">yes</span>
  - name: Create symbolic <span class="hljs-built_in">link</span> <span class="hljs-keyword">for</span> docker-compose
    file:
      src: <span class="hljs-string">&quot;/usr/local/bin/docker-compose&quot;</span>
      dest: <span class="hljs-string">&quot;/usr/bin/docker-compose&quot;</span>
      state: <span class="hljs-built_in">link</span>
 
<button class="copy-code-btn"></button></code></pre>
<p>After Docker and Docker Compose are installed on all node instances,  <code translate="no">playbook.yaml</code> starts containers for all node instances in sequence.</p>
<pre><code translate="no" class="language-playbook.yaml">- name: etcd
  hosts: etcd_ips_public
  remote_user: ec2-user
  become: <span class="hljs-literal">true</span>
  tags:
    - start

  tasks:
  - name: Copy etcd config
    ansible.builtin.template:
      src: ./yaml_files/etcd.j2
      dest: /home/ec2-user/docker-compose.yml
      owner: ec2-user
      group: wheel
      mode: <span class="hljs-string">&#x27;0644&#x27;</span>

  - name: Run etcd node
    shell: docker-compose up -d
    args:
      <span class="hljs-built_in">chdir</span>: /home/ec2-user/
     
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Apply-the-configuration" class="common-anchor-header">Apply the configuration</h3><ol>
<li><p>Open a terminal and navigate to the folder that stores <code translate="no">playbook.yaml</code>.</p></li>
<li><p>Run <code translate="no">ansible-playbook -i inventory playbook.yaml --tags &quot;start&quot;</code>.</p></li>
<li><p>If successful, all node instances start.</p></li>
</ol>
<p>You have now started a Milvus cluster with Ansible.</p>
<h2 id="Stop-nodes" class="common-anchor-header">Stop nodes<button data-href="#Stop-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>You can stop all nodes after you do not need a Milvus cluster any longer.</p>
<div class="alert note"> Ensure that the <code translate="no">terraform</code> binary is available on your <code translate="no">PATH</code>. </div>
<ol>
<li><p>Run <code translate="no">terraform destroy</code> and enter <code translate="no">yes</code> when prompted.</p></li>
<li><p>If successful, all node instances are stopped.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>If you want to learn how to deploy Milvus on other clouds:</p>
<ul>
<li><a href="/docs/v2.0.x/eks.md">Deploy a Milvus Cluster on EKS</a></li>
<li><a href="/docs/v2.0.x/gcp.md">Deploy Milvus Cluster on GCP with Kubernetes</a></li>
<li><a href="/docs/v2.0.x/azure.md">Guide to Deploying Milvus on Microsoft Azure With Kubernetes</a></li>
</ul>
