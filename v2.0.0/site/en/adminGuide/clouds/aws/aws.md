---
id: aws.md
title: Deploy a Milvus Cluster on EC2
related_key: cluster
summary: Learn how to deploy a Milvus cluster on AWS EC2.
---

# Deploy a Milvus Cluster on EC2

This topic describes how to deploy a Milvus cluster on [Amazon EC2](https://docs.aws.amazon.com/ec2/) with Terraform and Ansible.

##  Provision a Milvus cluster

This section describes how to use Terraform to provision a Milvus cluster. 

[Terraform](https://www.terraform.io/) is an infrastructure as code (IaC) software tool. With Terraform, you can provision infrastructure by using declarative configuration files.

### Prerequisites

- Install and configure [Terraform](https://www.terraform.io/downloads.html)

- Install and configure [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

### Prepare configuration

You can download template configuration files at [Google Drive](https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view).

- ```main.tf```

  This file contains the configuration for provisioning a Milvus cluster.

- ```variables.tf```

  This file allows quick editing of variables used to set up or update a Milvus cluster.

- ```output.tf``` and ```inventory.tmpl```

  These files store the metadata of a Milvus cluster. The metadata used in this topic is the ```public_ip``` for each node instance, ```private_ip``` for each node instance, and all EC2 instance IDs. 

#### Prepare variables.tf

This section describes the configuration that a ```variables.tf``` file that contains.

- Number of nodes

  The following template declares an ```index_count``` variable used to set the number of index nodes.

  <div class="alert note">The value of <code>index_count</code> must be greater than or equal to one.</div>

  ```variables.tf
  variable "index_count" {
    description = "Amount of index instances to run"
    type        = number
    default     = 5
  }
  ```

- Instance type for a node type

  The following template declares an ```index_ec2_type``` variable used to set the [instance type](https://aws.amazon.com/ec2/instance-types/) for index nodes.

  ```variables.tf
  variable "index_ec2_type" {
    description = "Which server type"
    type        = string
    default     = "c5.2xlarge"
  }
  ```

- Access permission

  The following template declares a ```key_name``` variable and a ```my_ip``` variable. The ```key_name``` variable represents the AWS access key. The ```my_ip``` variable represents the IP address range for a security group.

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

#### Prepare main.tf

This section describes the configurations that a ```main.tf``` file that contains.

- Cloud provider and region

  The following template uses the ```us-east-2``` region. See [Available Regions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions) for more information.

  ```main.tf
  provider "aws" {
    profile = "default"
    region  = "us-east-2"
  }
  ```

- Security group

  The following template declares a security group that allows incoming traffic from the CIDR address range represented by ```my_ip``` declared in ```variables.tf```.

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

- VPC

  The following template specifies a VPC with the 10.0.0.0/24 CIDR block on a Milvus cluster.

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

- Subnets (Optional)

  The following template declares a subnet whose traffic is routed to an internet gateway. In this case, the size of the subnet's CIDR block is the same as the VPC's CIDR block.

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

- Node instances (Nodes)

  The following template declares a MinIO node instance. The ```main.tf``` template file declares nodes of 11 node types. For some node types, you need to set ```root_block_device```. See [EBS, Ephemeral, and Root Block Devices](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#ebs-ephemeral-and-root-block-devices) for more information.

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

### Apply the configuration

1. Open a terminal and navigate to the folder that stores ```main.tf```.

2. To initialize the configuration, run ```terraform init```.

3. To apply the configuration, run ```terraform apply``` and enter ```yes``` when prompted.

You have now provisioned a Milvus cluster with Terraform.

## Start the Milvus cluster

This section describes how to use Ansible to start the Milvus cluster that you have provisioned.

[Ansible](https://www.ansible.com/overview/how-ansible-works) is a configuration management tool used to automate cloud provisioning and configuration management.

### Prerequisites 

- Install and configure [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

### Prepare configuration

You can download template configuration files at [Google Drive](https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view).

- Files in the ```yaml_files``` folder

  This folder stores 
  2 files for each node type. Ansible uses Jinja2 templating. See [Introduction](https://palletsprojects.com/p/jinja/) for more information about Jinja2.

- ```playbook.yaml```

  This file performs a set of tasks on specific sets of nodes. The template begins with installing Docker and Docker Compose on all node instances on the Milvus cluster.

  <div class="alert note">A playbook runs in sequence from top to bottom. Within each play, tasks also run in sequence from top to bottom.</div>
  
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

  After Docker and Docker Compose are installed on all node instances,  ```playbook.yaml``` starts containers for all node instances in sequence.
  
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

### Apply the configuration

1. Open a terminal and navigate to the folder that stores ```playbook.yaml```.

2. Run ```ansible-playbook -i inventory playbook.yaml --tags "start"```. 

3. If successful, all node instances start.

You have now started a Milvus cluster with Ansible.

## Stop nodes

You can stop all nodes after you do not need a Milvus cluster any longer.

<div class="alert note"> Ensure that the <code>terraform</code> binary is available on your <code>PATH</code>. </div>

1. Run ```terraform destroy``` and enter ```yes``` when prompted.

2. If successful, all node instances are stopped. 

## What's next

If you want to learn how to deploy Milvus on other clouds:
- [Deploy a Milvus Cluster on EKS](https://milvus.io/docs/v2.0.0/eks.md)
- [Deploy Milvus Cluster on GCP with Kubernetes](https://milvus.io/docs/v2.0.0/gcp.md)
- [Guide to Deploying Milvus on Microsoft Azure With Kubernetes](https://milvus.io/docs/v2.0.0/azure.md)

