---
id: aws.md
title: Deploy Terraform-Ansible on AWS
summary: Learn how to deploy Milvus on AWS.
---

# Deploy Milvus on AWS with Terraform and Ansible

This guide includes instructions for deploying Terraform-Ansible on Amazon Web Services (AWS). Terraform and Ansible are useful open-source tools that simplify updating and configuring cloud deployments. This guide covers provisioning resources with Terraform and starting services with Ansible.


## What are Terraform and Ansible?

Terraform and Ansible are key open-source tools used in sync for cloud deployments. Terraform is used for quickly provisioning and updating application infrastructure, while Ansible is used to configure machines and start applications. These popular command line tools help reduce complexity and accelerate DevOps.

## Provisioning resources with Terraform

Begin by using Terraform to provision resources for the cluster on AWS. With Terraform, resources and their configurations are declared, then the tool maps out dependencies and builds everything.

### Files

**variables.tf**
- **inventory.tf**: Includes quick edit variables for setting up or updating the cluster.
- **Node Count**: State how many of each node to include in the cluster.

<div class="alert note">
Value must be greater than or equal to 1.
</div>

- **Node Types**: State which instances to use for each node.
- **Personal**: Personal details for AWS access. Set my_ip to your IP address.

```YAML
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

**output.tf and inventory.tmpl**

The **output.tf** and **inventory.tmpl** are used to show the resulting metadata of the created cluster, and also to pass metadata to Ansible. The metadata we need to access in this example includes `public_ips`, `private_ips`, and all AWS resource IDs. These values are plugged into a template that formats the data file in a way that is easily read by Ansible.

**main.tf**

The **main.tf** file is where the main deployment logic happens. Deploying a cluster involves many interconnected parts, but Terraform handles ordering and actual deployment. Start by setting the provider and region. This example uses the us-east-2 AWS zone. 

```
provider "aws" {
  profile = "default"
  region  = "us-east-2"
}
```

Next create the security group for this cluster. In this example, the group can only allow communication between `my_ip` and the machines that are within that security group. 

```
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

After creating the security group, a network must be created for all the machines. First, create a VPC (virtual private cloud) to hold the machines. This example uses the 10.0.0.0/24 block of addresses. To create an external access point, we also attach an internet gateway. 


```
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

This example takes advantage of a subnet. Although not required, it is typically good practice to route internode traffic through private addresses. In this case, we take the full range of addresses available within the VPC. In order for these machines to be accessible, external routing must be provided to them from the internet gateway. To accomplish this, a route from the gateway is associated with all the available routes in the subnet. 

```
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

Last, create all the required instances — 11 different types in this case. To create an instance, specify the amount, Amazon Machine Image (AMI), machine type, access key, subnet location, and security group. Most of these were defined in the steps above, so we only need to use the variables created for them.  For some of the instances you will also notice the `root_block_device`, which signifies an increase in machine storage space. 

```
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

### Running Terraform
1. Begin by installing and configuring [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) and [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli). 
2. Once both are setup, open a command line in the directory where **main.tf** is located.
3. Type `terraform init` in the command line to setup the workspace.
4. Type `terraform apply` and accept the prompt to start the cluster.
5. The output returned at the end includes which IPs to use to connect to each instance type.


## Starting Milvus services with Ansible 
Use Ansible to start running the Milvus cluster with the machines provisioned by Terraform.

### Files

**inventory**

The inventory file only exists after a cluster is created and will disappear once the cluster is destroyed. This file includes all the public and private addresses of the nodes in the cluster. Ansible needs this file to know the server and its corresponding address in order to ssh into them, modify, and run the correct script. 

**yaml_files**

The **yaml_files** directory holds **.j2** docker-compose files for each type of node. They are **.j2** and **.yaml** files because Ansible uses Jinja2 for templating. This example uses templating files because the files need to be updated with the IPs of the nodes at runtime.

**playbook.yaml** 

The **playbook.yaml** file is the coordinator for running all the scripts in all the nodes. The script first begins by installing docker and Docker Compose on all the machines in the cluster.

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

Once all the nodes have docker-compose setup, the script launches the corresponding docker container for each node one by one. To do this, the script copies over the **.j2** files with the variables filled in and runs it using compose. 

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

### Running Ansible
1. Install and configure [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html).
2. Open a command line in the **playbook.yaml** directory.
3. Run `ansible-playbook  -i inventory playbook.yaml -tags "start"` .
4. Once finished, the service is up and running.

## Shutting down the Milvus cluster
1. Open a command line in the Terraform directory that was used to launch the cluster.
2. Run `terraform destroy` and accept the prompt.
3. Once script finishes running, all allocated resources will be destroyed. 

## Resources

Files for this instruction are available at https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view?usp=sharing.
