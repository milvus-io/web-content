---
id: aws.md
title: Deploy a Milvus Cluster on EC2
related_key: cluster
summary: Learn how to deploy a Milvus cluster on AWS EC2.
---

# 在 EC2 部署 Milvus 集群

本文介绍如何使用 Terraform 和 Ansible 在 [Amazon EC2 ](https://docs.aws.amazon.com/ec2/)上部署 Milvus 集群。

##  预置集群

介绍如何使用 Terraform 预置 Milvus 集群。[Terraform](https://www.terraform.io/) 是一个基础架构即代码 (IaC) 软件工具。使用 Terraform ，你可以通过使用声明性配置文件来预置基础设施。

### 先决条件

- 安装和配置 [Terraform](https://www.terraform.io/downloads.html)

- 安装和配置 [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

### 准备配置

你可以在 [Google 云端硬盘](https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view) 下载模板配置文件。

- `main.tf`
	这个文件包含了一个Milvus集群的配置。

- `variables.tf`
	这个文件允许快速编辑用于设置或更新Milvus集群的变量。

- `output.tf` 和 `inventory.tmpl`
	
	这些文件存储 Milvus 集群的元数据。本问中使用的元数据是每个节点实例的 `public_ip`，每个节点实例的 `private_ip` 和所有 EC2 实例 ID。

#### 准备 variables.tf

本节描述 `variables.tf` 文件包含的配置。

- 节点数量

  下面的模板声明一个 `index_count` 变量，用于设置索引节点的数量。

  <div class="alert note"><code>index_count</code> 的值必须大于等于1。</div>

  ```variables.tf
  variable "index_count" {
    description = "Amount of index instances to run"
    type        = number
    default     = 5
  }
  ```
- 节点类型的实例类型

  下面的模板声明了一个 `index_ec2_type` 变量，用于设置索引节点的[实例类型](https://aws.amazon.com/ec2/instance-types/)。

  ```variables.tf
  variable "index_ec2_type" {
    description = "Which server type"
    type        = string
    default     = "c5.2xlarge"
  }
  ```
- 访问权限

  下面的模板声明一个 `key_name` 变量和一个 `my_ip` 变量。` key_name` 变量表示 AWS 访问密钥。`my_ip` 变量表示安全组的 IP 地址范围。

  ```variables.tf
  variable "key_name" {
    description = "Which aws key to use for access into instances, needs to be uploaded already"
    type        = string
    default     = ""
  }
  
  variable "my_ip" {
    description = "my_ip for security group. used so that ansible and terraform can ssh in"
    type        = string
    default     = "x.x.x.x/32"
  }
  ```

#### 准备 main.tf

本节描述 `main. txt` 文件包含的配置。

- 云提供商和区域

  下面的模板使用 `us-east-2 ` 区域。更多信息请参见[可用区域](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions)。

  ```main.tf
  provider "aws" {
    profile = "default"
    region  = "us-east-2"
  }
  ```

- 安全组

  下面的模板声明了一个安全组，该安全组允许来自 CIDR 地址范围的流量，该地址范围由在 `variables.tf` 中声明的 `my_ip` 表示。

  ```main.tf
  resource "aws_security_group" "cluster_sg" {
    name        = "cluster_sg"
    description = "Allows only me to access"
    vpc_id      = aws_vpc.cluster_vpc.id
  
    ingress {
      description      = "All ports from my IP"
      from_port        = 0
      to_port          = 65535
      protocol         = "tcp"
      cidr_blocks      = [var.my_ip]
    }
  
    ingress {
      description      = "Full subnet communication"
      from_port        = 0
      to_port          = 65535
      protocol         = "all"
      self             = true
    }
  
    egress {
      from_port        = 0
      to_port          = 0
      protocol         = "-1"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    }
  
    tags = {
      Name = "cluster_sg"
    }
  }
  ```

- 虚拟私有云

   下面的模板在 Milvus 集群中指定里 CIDR 块为10.0.0.0/24的虚拟私有云。

  ```main.tf
  resource "aws_vpc" "cluster_vpc" {
    cidr_block = "10.0.0.0/24"
    tags = {
      Name = "cluster_vpc"
    }
  }
  
  resource "aws_internet_gateway" "cluster_gateway" {
    vpc_id = aws_vpc.cluster_vpc.id
  
    tags = {
      Name = "cluster_gateway"
    }
  }
  ```

- 子网 (可选)

  下面的模板声明了一个子网，其流量被路由到互联网网关。此时子网的 CIDR 块大小与虚拟私有云的 CIDR 块大小相同。

  ```main.tf
  resource "aws_subnet" "cluster_subnet" {
    vpc_id                  = aws_vpc.cluster_vpc.id
    cidr_block              = "10.0.0.0/24"
    map_public_ip_on_launch = true
  
    tags = {
      Name = "cluster_subnet"
    }
  }
  
  resource "aws_route_table" "cluster_subnet_gateway_route" {
    vpc_id       = aws_vpc.cluster_vpc.id
  
    route {
      cidr_block = "0.0.0.0/0"
      gateway_id = aws_internet_gateway.cluster_gateway.id
    }
  
    tags = {
      Name = "cluster_subnet_gateway_route"
    }
  }
  
  resource "aws_route_table_association" "cluster_subnet_add_gateway" {
    subnet_id      = aws_subnet.cluster_subnet.id
    route_table_id = aws_route_table.cluster_subnet_gateway_route.id
  }
  
  ```

- 节点实例(节点)

  下面的模板声明一个 MinIO 节点实例。`main.tf` 模板文件声明了11个节点类型。对于某些节点类型，需要设置 `root_block_device`。有关更多信息，请参见 [EBS、临时块设备和根块设备](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#ebs-ephemeral-and-root-block-devices)。

  ```main.tf
  resource "aws_instance" "minio_node" {
    count         = var.minio_count
    ami           = "ami-0d8d212151031f51c"
    instance_type = var.minio_ec2_type
    key_name      = var.key_name
    subnet_id     = aws_subnet.cluster_subnet.id 
    vpc_security_group_ids = [aws_security_group.cluster_sg.id]
  
    root_block_device {
      volume_type = "gp2"
      volume_size = 1000
    }
    
    tags = {
      Name = "minio-${count.index + 1}"
    }
  }
  ```
  
### 应用配置

1. 打开一个终端，导航到存储 `main.tf` 的文件夹。
2. 运行 `terraform init` 命令初始化配置。
2. 要应用配置，运行 `terraform apply` 并在提示时输入 `yes`。

你现在已经使用 Terraform 预置了 Milvus 集群。

## 启动集群

本节描述如何使用 Ansible 启动你已经准备好的 Milvus 集群。[Ansible](https://www.ansible.com/overview/how-ansible-works) 是一个配置管理工具，用于自动化云配置和配置管理。

### 先决条件

- 安装和配置 [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

### 准备配置

你可以在 [Google 云端硬盘](https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view)下载模板配置文件。

- `yaml_files` 文件夹中的文件

这个文件夹存储每个节点类型的 Jinja2 文件。Ansible 使用了 Jinja2 模板。有关 Jinja2 的更多信息请参见[介绍](https://jinja2docs.readthedocs.io/en/stable/intro.html)。

- `playbook.yaml`

该文件在特定的节点集上执行一组任务。该模板首先在 Milvus 集群的所有节点实例上安装 Docker 和 Docker Compose。

<div class="alert note">Playbook 是按照从上到下的顺序运行的。在每个 Play 中，任务也从上到下依次运行。</div>
  
  ```playbook.yaml
  - name: All Servers
    hosts: etcd_ips_public:pulsar_ips_public:minio_ips_public:data_ips_public:index_ips_public:query_ips_public:proxy_ips_public:root_coordinator_ips_public:data_coordinator_ips_public:query_coordinator_ips_public:index_coordinator_ips_public
    remote_user: ec2-user
    become: true
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
        url : "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-Linux-x86_64"
        dest: /usr/local/bin/docker-compose
        mode: 'a+x'
        force: yes
    - name: Create symbolic link for docker-compose
      file:
        src: "/usr/local/bin/docker-compose"
        dest: "/usr/bin/docker-compose"
        state: link
   
  ```

   在所有节点实例上安装 Docker 和 Docker Compose 后，`playbook.yaml` 按顺序启动所有节点实例的容器。
  
  ```playbook.yaml
  - name: etcd
    hosts: etcd_ips_public
    remote_user: ec2-user
    become: true
    tags:
      - start
  
    tasks:
    - name: Copy etcd config
      ansible.builtin.template:
        src: ./yaml_files/etcd.j2
        dest: /home/ec2-user/docker-compose.yml
        owner: ec2-user
        group: wheel
        mode: '0644'
  
    - name: Run etcd node
      shell: docker-compose up -d
      args:
        chdir: /home/ec2-user/
       
  ```

### 应用配置

1. 打开终端，导航到存放 `playbook.yaml` 的文件夹。
2. 运行 `ansible-playbook -i inventory playbook.yaml --tags "start"`。
3. 如果成功，将启动所有节点实例。

现在你已经使用 Ansible 启动了一个 Milvus 集群。

## 停止节点

当不再需要 Milvus 集群时，可以停止所有节点。

<div class="alert note">确保 <code>terraform</code> 二进制文件在你的 <code>PATH</code> 上可用。</div>

1. 运行 `terraform destroy` 并在提示时输入 `yes`。
2. 如果成功，则停止所有节点实例。

## 更多内容

如果你想学习如何在其他云上部署 Milvus:
- [在 EKS 部署 Milvus 集群](https://milvus.io/cn/docs/v2.0.0/eks.md)
- [在 GCP 部署 Milvus 集群](https://milvus.io/cn/docs/v2.0.0/gcp.md)
- [在 Azure 部署 Milvus 集群](https://milvus.io/cn/docs/v2.0.0/azure.md)
