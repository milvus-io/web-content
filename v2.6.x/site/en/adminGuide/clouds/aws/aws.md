---
id: aws.md
title: Deploy a Milvus Cluster on EC2
related_key: cluster
summary: Learn how to deploy a Milvus cluster on AWS EC2.
---

# (Deprecated) Deploy a Milvus Cluster on EC2

This topic describes how to deploy a Milvus cluster on [Amazon EC2](https://docs.aws.amazon.com/ec2/) with Terraform and Ansible.

<div class="alert note">

This topic is outdated and will be removed soon. You are advised to refer to [Deploy a Milvus Cluster on EKS](eks.md) instead.

</div>

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

- [Ansible Controller](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is installed.

### Download Ansible Milvus node deployment Playbook

Clone Milvus repository from GitHub to download the Ansible Milvus node deployment Playbook.

```
git clone https://github.com/milvus-io/milvus.git
```

### Configure installation files

The `inventory.ini` and `ansible.cfg` files are used to control the environment variables and log-in verification methods in Ansible playbook. In the `inventory.ini` file, the `dockernodes` section defines all the servers of docker engines. The `ansible.cfg` section defines all the servers of Milvus coordinators. The `node` section defines all the servers of Milvus nodes.

Enter the local path to the Playbook and configure the installation files.

```shell
$ cd ./milvus/deployments/docker/cluster-distributed-deployment
```

#### `inventory.ini`

Configure `inventory.ini` to divide hosts in groups in accordance with their roles in the Milvus system.

Add host names, and define `docker` group and `vars`.

```
[dockernodes] #Add docker host names.
dockernode01
dockernode02
dockernode03

[admin] #Add Ansible controller name.
ansible-controller

[coords] #Add the host names of Milvus coordinators.
; Take note the IP of this host VM, and replace 10.170.0.17 with it.
dockernode01

[nodes] #Add the host names of Milvus nodes.
dockernode02

[dependencies] #Add the host names of Milvus dependencies.
; dependencies node will host etcd, minio, pulsar, these 3 roles are the foundation of Milvus. 
; Take note the IP of this host VM, and replace 10.170.0.19 with it.
dockernode03

[docker:children]
dockernodes
coords
nodes
dependencies

[docker:vars]
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
```

#### `ansible.cfg`

`ansible.cfg` controls the action of the playbook, for example, SSH key, etc. Do not set up passphrase via the SSH key on docker hosts. Otherwise, the Ansible SSH connection will fail. We recommend setting up the same username and SSH key on the three hosts and setting up the new user account to execute sudo without a password. Otherwise, you will receive errors that the user name does not match the password or you are not granted elevated privileges when running Ansible playbook.


```
[defaults]
host_key_checking = False
inventory = inventory.ini # Specify the Inventory file
private_key_file=~/.my_ssh_keys/gpc_sshkey # Specify the SSH key that Ansible uses to access Docker host
```

#### `deploy-docker.yml`

`deploy-docker.yml` defines the tasks during the installation of Docker. See the code comments in the file for details.

```yaml
---
- name: setup pre-requisites # Install prerequisite
  hosts: all
  become: yes
  become_user: root
  roles:
    - install-modules
    - configure-hosts-file

- name: install docker
  become: yes
  become_user: root
  hosts: dockernodes
  roles:
    - docker-installation
```
### Test Ansible connectivity

Test the connectivity to Ansible.

```shell
$ ansible all -m ping
```

Add `-i` in the command to specify the path to the inventory file if you did not specify it in `ansible.cfg`, otherwise Ansible uses `/etc/ansible/hosts`.

The terminal returns as follow:

```
dockernode01 | SUCCESS => {
"changed": false,
"ping": "pong"
}
ansible-controller | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
dockernode03 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
dockernode02 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

### Check the Playbook Syntax

Check the syntax of the Playbook.

```shell
$ ansible-playbook deploy-docker.yml --syntax-check
```

Normally, the terminal returns as follow:

```
playbook: deploy-docker.yml
```

### Install Docker

Install Docker with the Playbook.

```shell
$ ansible-playbook deploy-docker.yml
```

If Docker is successfully installed on the three hosts, the terminal returns as follow:

```
TASK [docker-installation : Install Docker-CE] *******************************************************************
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
```

### Verify the installation

Log in to the three hosts with the SSH key, and verify the installation on the hosts.

- For root host:

```shell
$ docker -v
```

- For non-root hosts:

```shell
$ sudo docker -v
```

Normally, the terminal returns as follow:

```
Docker version 20.10.14, build a224086
```

Check the running status of the containers.

```shell
$ docker ps
```

### Check the Syntax

Check the Syntax of `deploy-milvus.yml`.

```shell
$ ansible-playbook deploy-milvus.yml --syntax-check
```

Normally, the terminal returns as follow:

```
playbook: deploy-milvus.yml
```

### Create Milvus container

The tasks to create Milvus container are defined in `deploy-milvus.yml`.

```shell
$ ansible-playbook deploy-milvus.yml
```

The terminal returns:

```
PLAY [Create milvus-etcd, minio, pulsar] *****************************************************************

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
```

Now you have Milvus deployed on the three hosts.

## Stop nodes

You can stop all nodes after you do not need a Milvus cluster any longer.

<div class="alert note"> Ensure that the <code>terraform</code> binary is available on your <code>PATH</code>. </div>

1. Run ```terraform destroy``` and enter ```yes``` when prompted.

2. If successful, all node instances are stopped. 

## What's next

If you want to learn how to deploy Milvus on other clouds:
- [Deploy a Milvus Cluster on EKS](eks.md)
- [Deploy Milvus Cluster on GCP with Kubernetes](gcp.md)
- [Guide to Deploying Milvus on Microsoft Azure With Kubernetes](azure.md)

