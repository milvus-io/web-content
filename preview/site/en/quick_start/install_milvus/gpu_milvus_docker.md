---
id: gpu_milvus_docker.md
---

# Install GPU-enabled Milvus

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

## Confirm Docker status

Confirm that the Docker daemon is running in the background:

```shell
$ docker info
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
$ docker pull milvusdb/milvus:0.10.0-gpu-d061620-5f3c00
```

<div class="alert note">
If the pulling is too slow or fails constantly, see <a href="operational_faq.md">Operational FAQ</a> for possible solutions.
</div>

## Download configuration files

```shell
$ mkdir -p /home/$USER/milvus/conf
$ cd /home/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v0.10.0/core/conf/demo/server_config.yaml
```

<div class="alert note">
If you cannot download configuration files via the <code>wget</code> command, you can create a <b>server_config.yaml</b> file under <b>/home/$USER/milvus/conf</b>, and then copy the content from <a href="https://github.com/milvus-io/milvus/blob/v0.10.0/core/conf/demo/server_config.yaml">server config</a> to it.
</div>

## Start Docker container

Before starting Docker container, you must set `enable` to `true` in `gpu` section of `server_config.yaml`.

Start Docker container and map the paths to the local files to the container:

```shell
$ docker run -d --name milvus_gpu_0.10.0 --gpus all \
-p 19530:19530 \
-p 19121:19121 \
-v /home/$USER/milvus/db:/var/lib/milvus/db \
-v /home/$USER/milvus/conf:/var/lib/milvus/conf \
-v /home/$USER/milvus/logs:/var/lib/milvus/logs \
-v /home/$USER/milvus/wal:/var/lib/milvus/wal \
milvusdb/milvus:0.10.0-gpu-d061620-5f3c00
```

The `docker run` options used in the above command are defined as follows:

- `-d`: Runs container in the background and prints container ID.
- `--name`: Assigns a name to the container.
- `--gpus`: Assigns GPU devices to the container. ('all' represents all GPUs.)
- `-p`: Publishes a container’s port(s) to the host.
- `-v`: Mounts the directory into the container.

Confirm the running state of Milvus:

```shell
$ docker ps
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
  - [Learn more about Milvus operations](milvus_operation.md)
  - [Try Milvus Bootcamp](https://github.com/milvus-io/bootcamp)
  
- If you're ready to run Milvus in production:

  - Build a [monitoring and alerting system](monitor.md) to check real-time application performance
  - Tune Milvus performance through [configuration](milvus_config.md)
  
- If you want to run Milvus on machines without an Nvidia GPU:
  
  - [Install CPU-only Milvus](cpu_milvus_docker.md)
