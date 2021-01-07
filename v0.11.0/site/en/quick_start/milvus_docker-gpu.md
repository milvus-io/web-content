---
id: milvus_docker-gpu.md
label: GPU-enabled Milvus
order: 1
group: distribution
icon: tab-icon-gpu
---

# Installation Overview

Ensure that you have read [Milvus Distributions](milvus_distributions-cpu.md) and understood the differences in terms of performance and scenarios.

Docker is the recommended way to install and run Milvus.

  
<div class="alert note">
If you have not set up a Docker environment, see <a href="https://github.com/milvus-io/milvus/blob/master/INSTALL.md">Build Milvus from source</a> to learn how to build Milvus from source.
</div>



# Install and Start Milvus

<div class="tab-wrapper"><a href="milvus_docker-cpu.md" class='tab-icon-cpu'>CPU-only Milvus</a><a href="milvus_docker-gpu.md" class='active tab-icon-gpu'>GPU-enabled Milvus</a></div>

## Prerequisites

#### System requirements

| Operating system | Supported versions |
| :--------------- | :----------------- |
| CentOS           | 7.5 or higher      |
| Ubuntu LTS       | 18.04 or higher    |

#### Hardware requirements

| Component  | Recommended configuration             |
| ---------- | ------------------------------------- |
| CPU        | Intel CPU Sandy Bridge or higher. |
| CPU instruction set | <ul><li>SSE42</li><li>AVX</li><li>AVX2</li><li>AVX512</li></ul> |
| GPU        | NVIDIA Pascal or higher               |
| RAM        | 8 GB or more (depends on data volume) |
| Hard drive | SATA 3.0 SSD or higher                |

#### Software requirements

| Software     | Version                                |
| ------- | -------------------------------------- |
| Docker  | 19.03 or higher                             |
| NVIDIA driver  | 418 or higher                              |
| NVIDIA Container Toolkit  | [NVIDIA-Container-Toolkit](https://github.com/NVIDIA/nvidia-docker)                              |

## Confirm Docker status

Confirm that the Docker daemon is running in the background:

```shell
$ sudo docker info
```

<div class="alert note">
<ul>
<li>If you do not see the server listed, start the Docker daemon.</li>
<li>On Linux, Docker needs <code>sudo</code> privileges. To run Docker commands without <code>sudo</code> privileges, create a <code>docker</code> group and add your users (see <a href="https://docs.docker.com/install/linux/linux-postinstall/">Post-installation steps for Linux</a> for details).</li>
</ul>
</div>

## Pull Milvus image

Pull the GPU-enabled image:

```shell
$ sudo docker pull milvusdb/milvus:0.11.0-gpu-d101620-4c44c0
```

<ul>
<li>If you cannot use your host to acquire Docker images and configuration files online because of network restrictions, please acquire them online from another available host, save them as a TAR file, pass it on to your local machine, and then load the TAR file as a Docker image:
<details>
<summary><font color="#3ab7f8">Click here to view the sample code.</font></summary>
<ol>
 <li>Save the Docker image as a TAR file, and pass it on to your local machine:</br>

<code class="language-shell">
    $ docker save milvusdb/milvus > milvus_image.tar
</code>
</li>

<li>Load the TAR file as a Docker image:</br>

<code class="language-shell">
    $ docker load < milvus_image.tar
</code>
</li></ol>
</details></li>
<li>If pulling the docker image is too slow or keeps failing, see <a href="operational_faq.md">Operational FAQ</a> for solutions.</li>
</ul>


## Download configuration file

```shell
$ mkdir -p /home/$USER/milvus/conf
$ cd /home/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/milvus/0.11.0/core/conf/demo/milvus.yaml
```

<div class="alert note">
If you cannot download configuration files via the <code>wget</code> command, you can create a <b>milvus.yaml</b> file under <b>/home/$USER/milvus/conf</b>, and then copy the content from <a href="https://github.com/milvus-io/milvus/blob/0.11.0/core/conf/demo/milvus.yaml">server config</a> to it.
</div>

After you downloaded the configuration file, you must set `enable` to `true` in `gpu` section of **milvus.yaml**.

## Start Docker container

<div class="alert note">
Before starting Docker container, you must set <code>enable</code> to <code>true</code> in <code>gpu</code> section of <b>milvus.yaml</b>.
</div>

Start Docker container and map the paths to the local files to the container:

```shell
$ sudo docker run -d --name milvus_gpu_0.11.0 --gpus all \
-p 19530:19530 \
-p 19121:19121 \
-v /home/$USER/milvus/db:/var/lib/milvus/db \
-v /home/$USER/milvus/conf:/var/lib/milvus/conf \
-v /home/$USER/milvus/logs:/var/lib/milvus/logs \
-v /home/$USER/milvus/wal:/var/lib/milvus/wal \
milvusdb/milvus:0.11.0-gpu-d101620-4c44c0
```

The `docker run` options used in the above command are defined as follows:

- `-d`: Runs container in the background and prints container ID.
- `--name`: Assigns a name to the container.
- `--gpus`: Assigns GPU devices to the container (`all` represents all GPUs).
- `-p`: Publishes a container’s port(s) to the host.
- `-v`: Mounts the directory into the container.

Confirm the running state of Milvus:

```shell
$ sudo docker ps
```

If the Milvus server does not start up properly, check the error logs:

```shell
$ sudo docker logs milvus_gpu_0.11.0
```

## FAQ

<details>
<summary><font color="#4fc4f9">Can I install Milvus on Windows?</font></summary>
Yes, so long as you have set up a Docker environment on your operating system.
</details>
<details>
<summary><font color="#4fc4f9">Why does Milvus return <code>Illegal instruction</code> during startup?</font></summary>
If your CPU does not support SSE42, AVX, AVX2, or AVX512, Milvus cannot start properly. You can use <code>cat /proc/cpuinfo</code> to check the supported instruction sets.

</details>
<details>
<summary><font color="#4fc4f9">How to migrate data in Milvus?</font></summary>
<p>Copy the entire <strong>db</strong> directory of the original Milvus service to the new directory. When restarting the Milvus service, map the copied <strong>db</strong> directory to the <strong>db</strong> directory of the Milvus service.</p>

<div class="alert note">
Data formats of different versions may not be compatible with each other. The current data format is backward compatible with Milvus v0.7.0.
</div>

</details>
<details>
<summary><font color="#4fc4f9">Is Docker the only way to install and run Milvus?</font></summary>
No. You can also build Milvus from source code in Linux. See <a href="https://github.com/milvus-io/milvus/blob/master/INSTALL.md">Build Milvus from source code</a> for more information.
</details>
<details>
<summary><font color="#4fc4f9">How to set <code>nlist</code> and <code>nprobe</code> for IVF indexes?</font></summary>
In general terms, the recommended value of <code>nprobe</code> is <code>4 &times; sqrt(n)</code>, where n is the total number of entities in a segment.

Determining `nprobe` is a trade-off between search performance and accuracy, and based on your dataset and scenario. It is recommended to run several rounds of tests to determine the value of `nprobe`.

The following charts are from a test running on the sift50m dataset and IVF\_SQ8 index. The test compares search performance and recall rate between different `nlist`/`nprobe` pairs.

<div class="alert note">

We only show the results of GPU-enabled Milvus here, because the two distributions of Milvus show similar results.

</div>

![Accuracy](../../../assets/accuracy_nlist_nprobe.png)

Key takeaways: This test shows that the recall rate increases with the `nlist`/`nprobe` pair.

![Performance](../../../assets/performance_nlist_nprobe.png)

Key takeaways: When `nlist` is 4096 and `nprobe` 128, Milvus shows the best search performance.


</details>



## What's next

- If you're just getting started with Milvus:

  - [Try an example program](example_code.md)
  - [Learn more about Milvus operations](milvus_operation.md)
  - [Try Milvus Bootcamp](https://github.com/milvus-io/bootcamp)
  
- If you're ready to run Milvus in production:

  - Build a [monitoring and alerting system](monitor.md) to check real-time application performance.
  - Tune Milvus performance through [configuration](milvus_config.md).
  
- If you want to run Milvus on machines without an Nvidia GPU:
  
  - [Install CPU-only Milvus](milvus_docker-cpu.md)
