---
id: configure-querynode-localdisk.md
title: Configure Milvus QueryNode with Local Disk
related_key: querynode, query node, local disk
summary: Learn how to configure Milvus QueryNode to use local disk.
---

# Configure Milvus QueryNode with Local Disk

This article describes how to configure Milvus QueryNode to use local disk storage.

## Overview

Milvus is an AI-focused vector database tailored for efficient storage and retrieval of vast quantities of vector data. It is ideal for tasks such as image and video analysis, natural language processing, and recommendation systems. To ensure optimal performance, it is crucial to minimize disk read latency. Using local NVMe SSDs is highly recommended to prevent delays and maintain system stability.

Key features where local disk storage comes into play include:

- [**Chunk cache**](chunk_cache.md): Preloads data into local disk cache for faster search.
- [**MMap**](mmap.md): Maps file contents directly into memory for better memory efficiency.
- [**DiskANN Index**](disk_index.md): Requires disk storage for efficient index management.

In this article, we will focus on deploying [Milvus Distributed](install-overview.md#Milvus-Distributed) on cloud platforms, and how to configure the QueryNode to use NVMe disk storage. The following table lists the recommended machine types of various cloud providers.

| Cloud Provider | Machine Type |
|:--------------:|:------------:|
|      AWS       | R6id series  |
|      GCP       |  N2 series   |
|     Azure      | Lsv3  series |
| Alibaba Cloud  |  i3 series   |
| Tencent Cloud  |  IT5 series  |

These machine types provide NVMe disk storage. You can use the `lsblk` command on the instances of these machine types to check if they have NVMe disk storage. If they do, you can proceed to the next step.

```bash
$ lsblk | grep nvme
nvme0n1     259:0    0 250.0G  0 disk 
nvme1n1     259:1    0 250.0G  0 disk 
```

## Configure Kubernetes to use local disk

To configure the QueryNode of Milvus Distributed to use NVMe disk storage, you need to configure the worker nodes of the target Kubernetes clusters to store the containers and images on an NVMe disk. The procedure for this varies depending on the cloud providers.

### AWS

When using Amazon EKS, you can customize managed nodes with launch templates, in which you can specify configuration settings for your node groups. The following is an example of how to mount an NVMe disk on the worker nodes of your Amazon EKS cluster:

```bash
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="==MYBOUNDARY=="

--==MYBOUNDARY==
Content-Type: text/x-shellscript; charset="us-ascii"

#!/bin/bash
echo "Running custom user data script"
if ( lsblk | fgrep -q nvme1n1 ); then
    mkdir -p /mnt/data /var/lib/kubelet /var/lib/docker
    mkfs.xfs /dev/nvme1n1
    mount /dev/nvme1n1 /mnt/data
    chmod 0755 /mnt/data
    mv /var/lib/kubelet /mnt/data/
    mv /var/lib/docker /mnt/data/
    ln -sf /mnt/data/kubelet /var/lib/kubelet
    ln -sf /mnt/data/docker /var/lib/docker
    UUID=$(lsblk -f | grep nvme1n1 | awk '{print $3}')
    echo "UUID=$UUID     /mnt/data   xfs    defaults,noatime  1   1" >> /etc/fstab
fi
echo 10485760 > /proc/sys/fs/aio-max-nr

--==MYBOUNDARY==--
```

<div class="alert note">

In the above example, we assume that the NVMe disk is `/dev/nvme1n1`. You need to modify the script to match your specific configuration.

</div>

For details, see [Customizing managed nodes with launch templates](https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#launch-template-user-data).

### GCP

To provision Local SSD storage on Google Kubernetes Engine (GKE) clusters, and configure workloads to consume data from Local SSD-backed ephemeral storage attached to nodes in your cluster, run the following command:

```bash
gcloud container node-pools create ${POOL_NAME} \
    --cluster=${CLUSTER_NAME} \
    --ephemeral-storage-local-ssd count=${NUMBER_OF_DISKS} \
    --machine-type=${MACHINE_TYPE}
```

For details, see [Provisioning Local SSD storage on GKE](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd).

### Azure

To create a virtual machine scale set (VMSS) with local NVMe disk storage, you need to pass custom data to the VM instances. The following is an example of how to attach an NVMe disk to the VM instances in the VMSS:

```bash
mdadm -Cv /dev/md0 -l0 -n2 /dev/nvme0n1 /dev/nvme1n1
mdadm -Ds > /etc/mdadm/mdadm.conf 
update-initramfs -u

mkfs.xfs /dev/md0
mkdir -p /var/lib/kubelet
echo '/dev/md0 /var/lib/kubelet xfs defaults 0 0' >> /etc/fstab
mount -a
```

<div class="alert note">

In the above example, we assume that the NVMe disks are `/dev/nvme0n1` and `/dev/nvme1n1`. You need to modify the script to match your specific configuration.

</div>


### Alibaba Cloud & TecentCloud

To create a node pool that uses Local SSD volumes, we need to pass Custom Data. The following is an example of custom data.

```bash
#!/bin/bash
echo "nvme init start..."
mkfs.xfs /dev/nvme0n1
mkdir -p /mnt/data
echo '/dev/nvme0n1 /mnt/data/ xfs defaults 0 0' >> /etc/fstab
mount -a

mkdir -p /mnt/data/kubelet /mnt/data/containerd /mnt/data/log/pods
mkdir -p  /var/lib/kubelet /var/lib/containerd /var/log/pods

echo '/mnt/data/kubelet /var/lib/kubelet none defaults,bind 0 0' >> /etc/fstab
echo '/mnt/data/containerd /var/lib/containerd none defaults,bind 0 0' >> /etc/fstab
echo '/mnt/data/log/pods /var/log/pods none defaults,bind 0 0' >> /etc/fstab
mount -a

echo "nvme init end..."
```

<div class="alert note">

In the above example, we assume that the NVMe disk is `/dev/nvme0n1`. You need to modify the script to match your specific configuration.

</div>

### Your own IDC

If you are running your own IDC and want to configure your containers to use the filesystem on a newly mounted NVMe disk by default in containerd, follow these steps:

- **Mount the NVMe disks.**

    Ensure that your NVMe disk is properly mounted on your host machine. You can mount it to a directory of your choice. For instance, if you mount it to `/mnt/nvme`, make sure it is correctly set up and you can see the disk available at `/mnt/nvme` by running `lsblk` or `df -h`.

- **Update containerd configuration.**

    Modify the containerd configuration to use the new mount as the root directory for container storage.

    ```bash
    sudo mkdir -p /mnt/nvme/containerd /mnt/nvme/containerd/state
    sudo vim /etc/containerd/config.toml
    ```

    Locate the `[plugins."io.containerd.grpc.v1.cri".containerd]` section, and modify the `snapshotter` and `root` settings as follows：

    ```toml
    [plugins."io.containerd.grpc.v1.cri".containerd]
    snapshotter = "overlayfs"
    root = "/mnt/nvme/containerd"
    state = "/mnt/nvme/containerd/state"
    ```

- **Restart containerd.**

    Restart the containerd service to apply the changes.

    ```bash
    sudo systemctl restart containerd
    ```


## Verify disk performance

You are advised to verify the disk performance using [Fio](https://github.com/axboe/fio), which is a popular tool for benchmarking disk performance. The following is an example of how to run Fio to test the disk performance.

- **Deploy the test pod to the node with the NVMe disk.**

    ```bash
    kubectl create -f ubuntu.yaml
    ```

    The `ubuntu.yaml` file is as follows:

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
    name: ubuntu
    spec:
    containers:
    - name: ubuntu
        image: ubuntu:latest
        command: ["sleep", "86400"]
        volumeMounts:
        - name: data-volume
            mountPath: /data
    volumes:
        - name: data-volume
        emptyDir: {}
    ```

- **Run Fio to test the disk performance.**

    ```bash
    # enter the container
    kubectl exec pod/ubuntu -it bash

    # in container
    apt-get update
    apt-get install fio -y

    # change to the mounted dir
    cd /data

    # write 10GB
    fio -direct=1 -iodepth=128 -rw=randwrite -ioengine=libaio -bs=4K -size=10G -numjobs=10 -runtime=600 -group_reporting -filename=test -name=Rand_Write_IOPS_Test

    # verify the read speed
    # compare with the disk performance indicators provided by various cloud providers.
    fio --filename=test --direct=1 --rw=randread --bs=4k --ioengine=libaio --iodepth=64 --runtime=120 --numjobs=128 --time_based --group_reporting --name=iops-test-job --eta-newline=1  --readonly
    ```

    And the output should look like this:

    ```bash
    Jobs: 128 (f=128): [r(128)][100.0%][r=1458MiB/s][r=373k IOPS][eta 00m:00s]
    iops-test-job: (groupid=0, jobs=128): err= 0: pid=768: Mon Jun 24 09:35:06 2024
    read: IOPS=349k, BW=1364MiB/s (1430MB/s)(160GiB/120067msec)
        slat (nsec): min=765, max=530621k, avg=365836.09, stdev=4765464.96
        clat (usec): min=35, max=1476.0k, avg=23096.78, stdev=45409.13
        lat (usec): min=36, max=1571.6k, avg=23462.62, stdev=46296.74
        clat percentiles (usec):
        |  1.00th=[    69],  5.00th=[    79], 10.00th=[    85], 20.00th=[    95],
        | 30.00th=[   106], 40.00th=[   123], 50.00th=[   149], 60.00th=[ 11469],
        | 70.00th=[ 23462], 80.00th=[ 39584], 90.00th=[ 70779], 95.00th=[103285],
        | 99.00th=[189793], 99.50th=[244319], 99.90th=[497026], 99.95th=[591397],
        | 99.99th=[767558]
    bw (  MiB/s): min=  236, max= 4439, per=100.00%, avg=1365.82, stdev= 5.02, samples=30591
    iops        : min=60447, max=1136488, avg=349640.62, stdev=1284.65, samples=30591
    lat (usec)   : 50=0.01%, 100=24.90%, 250=30.47%, 500=0.09%, 750=0.31%
    lat (usec)   : 1000=0.08%
    lat (msec)   : 2=0.32%, 4=0.59%, 10=1.86%, 20=8.20%, 50=17.29%
    lat (msec)   : 100=10.62%, 250=4.80%, 500=0.38%, 750=0.09%, 1000=0.01%
    lat (msec)   : 2000=0.01%
    cpu          : usr=0.20%, sys=0.48%, ctx=838085, majf=0, minf=9665
    IO depths    : 1=0.1%, 2=0.1%, 4=0.1%, 8=0.1%, 16=0.1%, 32=0.1%, >=64=100.0%
        submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
        complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.1%, >=64=0.0%
        issued rwts: total=41910256,0,0,0 short=0,0,0,0 dropped=0,0,0,0
        latency   : target=0, window=0, percentile=100.00%, depth=64
    ```

## Deploy Milvus Distributed

Once the verification results are satisfactory, you can deploy Milvus Distributed with the following steps:

### Tips for deploying Milvus Distributed using Helm

The QueryNode pod uses NVMe disks as EmptyDir volumes by default. You are advised to mount NVMe disks to `/var/lib/milvus/data` within the QueryNode pods to ensure optimal performance.

For details on how to deploy Milvus Distributed using Helm, see [Run Milvus in Kubernetes with Helm](install_cluster-helm.md).

### Tips for deploying Milvus Distributed using Milvus Operator

The Milvus Operator automatically configures the QueryNode pod to use NVMe disks as EmptyDir volumes. You are advised to add the following configurations to the `MilvusCluster` custom resource:

```yaml
...
spec:
  components:
    queryNode:
      volumeMounts:
      - mountPath: /var/lib/milvus/data
        name: data
      volumes:
      - emptyDir:
        name: data
```

This will ensure that the QueryNode pod uses the NVMe disk as the data volume. For details on how to deploy Milvus Distributed using Milvus Operator, see [Run Milvus in Kubernetes with Milvus Operator](install_cluster-milvusoperator.md).
