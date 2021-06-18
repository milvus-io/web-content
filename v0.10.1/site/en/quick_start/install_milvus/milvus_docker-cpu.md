---
id: milvus_docker-cpu.md
label: CPU-only Milvus
order: 0
group: version
---

# Install and Run Milvus

<div class="tab-wrapper"><a href="milvus_docker-cpu.md" class='active '>CPU-only Milvus</a><a href="milvus_docker-gpu.md" class=''>GPU-enabled Milvus</a></div> 

## Prerequisites

#### Operating system requirements

| Operating system | Supported versions                              |
| :--------------- | :----------------------------------------------------------- |
| CentOS           | 7.5 or higher                                                |
| Ubuntu LTS       | 18.04 or higher                                              |

#### Hardware requirements

| Component | Recommended configuration             |
| ---------- | ------------------------------------- |
| CPU        | Intel CPU Sandy Bridge or higher. |
| CPU instruction set | <ul><li>SSE42</li><li>AVX</li><li>AVX2</li><li>AVX512</li></ul> |
| RAM        | 8 GB or more (depends on the data volume) |
| Hard drive | SATA 3.0 SSD or higher                |

#### Software requirements

| Software     | Version                                |
| ------- | -------------------------------------- |
| Docker  | 19.03 or higher                             |

<div class="alert note">
Please ensure that the available memory is greater than the sum of <code>cache.insert_buffer_size</code> and <code>cache.cache_size</code> set in the <b>server_config.yaml</b> file.
</div>

#### Confirm Docker status

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

## Pull Docker image

Pull the CPU-only image:

```shell
$ sudo docker pull milvusdb/milvus:0.10.1-cpu-d072020-bd02b1
```
<div class="alert note">
<ul>
<li>If you cannot use your host to acquire Docker images and configuration files online because of network restrictions, please acquire them online from another available host, save them as a TAR file, pass it on to your local machine, and then load the TAR file as a Docker image:
<details>
<summary><font color="#3ab7f8">Sample code</font></summary>
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
</div>


## Download configuration files

```shell
$ mkdir -p /home/$USER/milvus/conf
$ cd /home/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v0.10.1/core/conf/demo/server_config.yaml
```

<div class="alert note">
If you cannot download configuration files via the <code>wget</code> command, you can create a <b>server_config.yaml</b> file under <b>/home/$USER/milvus/conf</b>, and then copy the content from <a href="https://github.com/milvus-io/milvus/blob/v0.10.1/core/conf/demo/server_config.yaml">server config</a> to it.
</div>

## Start Docker container

Start Docker container and map the paths to the local files to the container:

```shell
$ sudo docker run -d --name milvus_cpu_0.10.1 \
-p 19530:19530 \
-p 19121:19121 \
-v /home/$USER/milvus/db:/var/lib/milvus/db \
-v /home/$USER/milvus/conf:/var/lib/milvus/conf \
-v /home/$USER/milvus/logs:/var/lib/milvus/logs \
-v /home/$USER/milvus/wal:/var/lib/milvus/wal \
milvusdb/milvus:0.10.1-cpu-d072020-bd02b1
```

The `docker run` options used in the above command are defined as follows:

- `-d`: Runs container in the background and prints container ID.
- `--name`: Assigns a name to the container.
- `-p`: Publishes a container’s port(s) to the host.
- `-v`: Mounts the directory into the container.

Confirm the running state of Milvus:

```shell
$ sudo docker ps
```

If the Milvus server does not start up properly, check the error logs:

```shell
# Get the ID of the container running Milvus.
$ docker ps -a
# Check docker logs.
$ docker logs <milvus container id>
```

## What's next

- If you're just getting started with Milvus:

  - [Try an example program](example_code.md)
  - [Learn basic Milvus operations](connect_milvus_python.md)
  - [Try Milvus Bootcamp](https://github.com/zilliz-bootcamp)
  
- If you're ready to run Milvus in production:

  - Build a [monitoring and alerting system](monitor.md) to check real-time application performance.
  - Tune Milvus performance through [configuration](milvus_config.md).
  
- If you want to use GPU-accelerated Milvus for search in large datasets:
  
  - [Install GPU-enabled Milvus](milvus_docker-gpu.md)
