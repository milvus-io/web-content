---
id: aws.md
title: 使用 Terraform 及 Ansible 在 AWS 上部署集群
---

# 使用 Terraform 及 Ansible 在 AWS 上部署集群

本文将介绍如何使用 Terraform 及 Ansible 在 Amazon Web Services (AWS) 上部署 Milvus 集群。使用开源工具 Terraform 及 Ansible 能够简化在云端部署集群的流程。本文主要内容包括：

- [使用 Terraform 创建资源](#使用-Terraform-创建资源)
- [使用 Ansible 启用集群](#使用-Ansible-启用集群)

## Terraform 及 Ansible 简介
Terraform 与 Ansible 两款主要开源软件适用于云端部署集群。使用 Terraform 能够快速创建并更新应用基础设施。使用 Ansible 能够管理机器并启用集群。同时使用这两款广泛运用的命令行工具能够降低运维的复杂程度，加速部署过程。

## 使用 Terraform 创建资源
使用 Terraform 在 AWS 上为 Milvus 集群创建资源。在声明集群资源及其配置后，Terraform 将自动判断依赖之间的映射关系并创建所有资源。

### 文件
**variables.tf**
- **inventory.tf**：用于设置或更新集群的变量。所有文件中变量可快速编辑。
- **Node Count**：用于说明集群中需要包含的每个类型节点的数量。

<div class="alert note">
设定的值必须大于等于 1。
</div>

- **Node Types**：用于说明每个节点使用的实例。
- **Personal**: AWS 访问权限的个人信息。将 `my_ip` 设置为你的 IP 地址。

```Yaml
# ------------------------------------- Node Count ------------------------------------- #
variable "index_count" {
  description = "Amount of index instances to run"
  type        = number
  default     = 5
}

...

# ------------------------------------- NODE TYPES ------------------------------------- #
variable "index_ec2_type" {
  description = "Which server type"
  type        = string
  default     = "c5.2xlarge"
}

...

# ------------------------------------- PERSONAL ------------------------------------- #

variable "key_name" {
  description = "Which aws key to use for accessing the instances, needs to already be created"
  type        = string
  default     = "Example_Key"
}
variable "my_ip" {
  description = "Your IP for security group. Set to allow Terraform and Ansible to SSH into instances"
  type        = string
  default     = "x.x.x.x/32"

}
```

**output.tf 及 inventory.tmpl** 
**output.tf** 及 **inventory.tmpl** 文件用于展示所创建集群的元数据以及将原数据传输给 Ansible。本文中需要获取的原数据包括 `public_ips`、`private_ips`以及所有 AWS 资源 ID。上述原数据将被添加至模版数据文件中，便于 Ansible 读取。

**main.tf**
**main.tf** 文件用于储存主要部署逻辑。集群部署涉及到众多相互连接的组件，但是 Terraform 可以执行排序及部署任务。先设置供应商及地区。本文使用 AWS 美国东部（俄亥俄）（us-east-2 AWS）区域。

```Nginx
provider "aws" {
  profile = "default"
  region  = "us-east-2"
}
```

接着，创建集群安全组。本文中的集群安全组仅支持 `my_ip` 与同一个安全组中的设备之间的通信。

```Nginx
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

集群安全组创建完毕后必须为集群中的所有设备创建网络。首先，创建虚拟私有云（virtual private cloud ，VPC）用于管理所有集群设备。本文使用 10.0.0.0/24 逻辑区块地址。我们在本文中添加了网关以创建外部访问接入点。

```Nginx
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

通常情况下你无需使用子网，但我们推荐通过内部 IP 地址路由节点间流量。本文使用子网及虚拟私有云中的所有 IP 地址。为保证所有设备可用，必须从网关提供外部路由。网关路由需要与子网中的所有路保持关联。
```Nginx
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

创建所有必要的实例——文本案例将涉及 11 种不同类型的实例。你需要在创建实例时说明实例数量、Amazon Machine Image (AMI)、设备类型、访问键、子网位置及安全组。大部分参数都已在之前步骤中配置，因此我们可以直接使用相应变量。若实例中出现 `root_block_device`， 则表示设备存储空间增多。

```Nginx
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
### 运行 Terraform
1. 安装并配置 [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) 及 [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli) 参数。
2. 设置完成后，在 `main.tf` 所在目录打开命令行工具。
3. 在命令行中输入 `terraform init` 以设置工作空间。
4. 输入命令 `terraform apply` 并接受提示以启用集群。
5. 最终返回结果包含了连接使用的 IP 地址以及每个节点的类型等信息。


## 使用 Ansible 启用集群
使用 Ansible 在 Terraform 创建的设备上启用 Milvus 集群。

### 文件
**inventory**
Inventory 文件仅会在集群创建后出现。该文件会随着集群被删除而消失。Inventory 文件包含集群所有节点的外部及内部 IP 地址。Ansible 需要通过 inventory 文件来了解服务器及其对应地址，从而使用 SSH 来修改并运行正确的脚本。

**yaml_files**
**yaml_files** 目录下包含各类型节点的 **.j2** Docker Compose 文件。Ansible 使用Jinja2 模版，因此所有文件格式均为 **.j2** 及 **.yaml**。由于在运行期间需要根据节点 IP 地址更新文件，因此本文使用模版文件。

**playbook.yaml**
**playbook.yaml** 文件用于协调所有节点运行脚本。运行脚本时，系统将在集群所有机器上安装 Docker 及 Docker Compose。

```Yaml
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

所有节点 Docker Compose 设置完毕后，脚本将逐一启动各节点对应的 Docker 容器。在启动容器过程中，脚本会复制 **.j2** 文件及其中的变量，并使用 Compose 运行脚本。

```Yaml
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

### 运行 Ansible
1. 安装并配置 [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) 参数。
2. 在 **playbook.yaml** 目录中打开命令行工具。
3. 运行指令 `ansible-playbook  -i inventory playbook.yaml -tags "start"` 。
4. 服务将在完成指令后启用并运行。

## 关闭 Milvus 集群
1. 在运行集群的 Terraform 目录中打开命令行工具。
2. 运行指令 `terraform destroy` 并接受提示。
3. 脚本运行完毕后，系统将删除所有此前分配的资源。

<br/>

<div class="alert note">
所有本指南中提到的文件均可通过以下网址获取。
https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view?usp=sharing.
</div>
