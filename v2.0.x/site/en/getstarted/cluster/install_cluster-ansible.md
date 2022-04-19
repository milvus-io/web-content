---
id: install_cluster-ansible.md
label: Ansible Controller
related_key: Docker
order: 4
group: install_cluster-docker.md
summary: Learn how to install Milvus cluster with Ansible Controller.
---

# Install Milvus Cluster

This topic describes how to install Milvus cluster with Docker Compose or on Kubernetes. 

[Check the requirements for hardware and software](prerequisite-docker.md) prior to your installation. 

If you run into image loading errors while installing, you can [Install Milvus Offline](install_offline-docker.md).

You can also build Milvus from source code at [GitHub](https://github.com/milvus-io/milvus#to-start-developing-milvus).


<div class="tab-wrapper"><a href="install_cluster-docker.md" class=''>Docker Compose</a><a href="install_cluster-helm.md" class=''>Helm</a><a href="install_cluster-milvusoperator.md" class=''>Milvus Operator</a><a href="install_cluster-ansible.md" class='active '>Ansible Controller</a></div>


## Prerequisites

- Hardware: Three virtual machines each with four cores of CPU and 8 GB of RAM or more
- Operating system: Ubuntu 20.04 LTS
- Software: Ansible Controller

## Download Ansible Milvus node deployment Playbook

Clone Milvus repository from GitHub to download the Ansible Milvus node deployment Playbook.

```
$ git clone https://github.com/milvus-io/milvus.git
```

## Configure installation files

Enter the local path to the Playbook and configure the installation files.

```shell
$ cd ./milvus/deployments/docker/cluster-distributed-deployment
```

### Configure `inventory.ini`

Configure `inventory.ini` to divide hosts in groups in accordance with their roles in the Milvus system.

Add host names, and define `docker` group and `vars`.

```
[dockernodes]
dockernode01
dockernode02
dockernode03

[admin]
ansible-controller

[coords]
; Take note the IP of this host VM, and replace 10.170.0.17 with it.
dockernode01

[nodes]
dockernode02

[dependencies]
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

; Setup variables to controll what type of network to use when creating containers.
dependencies_network= host
nodes_network= host

; Setup varibale to controll what version of Milvus image to use.
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

### Configure `ansible.cfg`

`ansible.cfg` controls the action of the Playbook, for example, SSH key, etc.

```
[defaults]
host_key_checking = False
inventory = inventory.ini # Specify the Inventory file
private_key_file=~/.my_ssh_keys/gpc_sshkey # Specify the SSH key that Ansible uses to access Docker host
```

### Configure `deploy-docker.yml`

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

## Test Ansible connectivity

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

## Check the Playbook Syntax

Check the syntax of the Playbook.

```shell
$ ansible-playbook deploy-docker.yml --syntax-check
```

Normally, the terminal returns as follow:

```
playbook: deploy-docker.yml
```

## Install Docker

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

## Verify the installation

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

## Check the Syntax of `deploy-milvus.yml`

Check the Syntax of `deploy-milvus.yml`.

```shell
$ ansible-playbook deploy-milvus.yml --syntax-check
```

Normally, the terminal returns as follow:

```
playbook: deploy-milvus.yml
```

## Create Milvus container

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

## What's next

Having installed Milvus, you can:

- Check [Hello Milvus](example_code.md) to run an example code with different SDKs to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

- Explore [MilvusDM](migrate_overview.md), an open-source tool designed for importing and exporting data in Milvus.
- [Monitor Milvus with Prometheus](monitor.md).
