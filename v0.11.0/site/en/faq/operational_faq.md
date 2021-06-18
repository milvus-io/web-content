---
id: operational_faq.md
---

# Operational FAQ

## What if I failed to pull Milvus Docker image from Docker Hub? {#1}

Users in some countries may have limited access to Docker Hub. In this case, you can pull the Docker image from other registry mirrors. You can add the URL `"https://registry.docker-cn.com"` to the `registry-mirrors` array in `/etc.docker/daemon.json`.

```json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

## Is Docker the only way to install and run Milvus? {#2}

No. You can also build Milvus from source code in Linux. See [Build Milvus from source code](https://github.com/milvus-io/milvus/blob/master/INSTALL.md) for more information.

## Why does Milvus return <code>config check error</code>? {#3}

The version of configuration file does not match the version your Milvus server. It is very likely you have not downloaded the right version of **milvus.yaml**, see [Download Configuration File](milvus_docker-cpu.md#Download-configuration-file)

## Why do I get <code>no space left on device</code> when importing data to Milvus? {#4}

It is likely that you have not saved enough disk space.

## Why is my recall rate unsatisfying? {#5}

You can increase the value of `nprobe` when searching from a client. The greater the value, the more accurate the result, and the more time it takes.

See [Performance Tuning > Index](tuning.md#Index) for more information.

## Why does my updated configuration not work? {#6}

You need to restart Milvus Docker each time you update the configuration file. See [Milvus Server Configuration > Updating configurations](milvus_config.md#Updating-configurations).

## How can I know if Milvus has started successfully? {#7}

Run `sudo docker logs <container ID>` to check if Milvus is running properly.

## Why is the time in the log files different from the system time? {#8}

The log files in the Docker container use UTC time by default. If your host machine does not use UTC time, then the time in the log files is different. We recommend that you mount the log files onto your host machine to keep the time consistent between the log and the host.

## How can I know whether my CPU supports Milvus? {#9}

The instruction sets that Milvus supports are SSE42, AVX, AVX2, and AVX512. Your CPU must support at least one of them for Milvus to function properly.

## Why does Milvus return Illegal instruction during startup? {#10}

If your CPU does not support SSE42, AVX, AVX2, or AVX512, Milvus cannot start properly. You can use `cat /proc/cpuinfo` to check the supported instruction sets.

## How can I know whether my GPU is supported by Milvus? {#11}

Milvus supports CUDA architecture 6.0 or later. See [Wikipedia](https://en.wikipedia.org/wiki/CUDA) for supported architectures.

## Where is the script for starting the server in the Milvus Docker container? {#12}

It is at **/var/lib/milvus/script/** in the Milvus Docker container.

## Besides the configuration file, how can I tell Milvus is using GPU for search? {#13}

Use any of the following methods:

- Use `nvidia-smi` to monitor your GPU usage.

- Use Prometheus to monitor performance metrics. See [Visualize Metrics in Grafana > System performance metrics](setup_grafana.md#System-performance-metrics).

- Check the Milvus server logs.

## Can I install Milvus on Windows? {#14}

Yes, so long as you have set up a Docker environment on your operating system.

## How to fix the error when I install pymilvus on Windows? {#15}

Try installing pymilvus in a Conda environment.

## Can I deploy Milvus service in an air-gapped environment? {#16}

Milvus is released as a Docker image. Follow these steps to deploy it from offline:

1. Pull the latest Milvus Docker image when you have Internet access.

2. Run `docker save` to save the Docker image as a TAR file.

3. Transfer the TAR file to the air-gapped environment.

4. Run `docker load` to load the file as a Docker image.

For more information about Docker, see [docs.docker.com](https://docs.docker.com/).

## How can I differentiate if I have multiple Milvus nodes connected to Pushgateway? {#17}

You can add a Prometheus instance in **prometheus.yaml**. Then Prometheus or Granafa will show the monitoring data, as well as the source node.

## Which database system should I use to manage Metadata, SQLite or MySQL? {#18}

We recommend using MySQL to manage Metadata in production environment.

## How to calculate required memory based on the size of the dataset? {#19}

Different indexes require different memory space. You can use [Milvus sizing tool](https://milvus.io/tools/sizing) to calculate the required memory for a vector search.

## How to migrate data in Milvus? {#20}

Copy the entire **db** directory of the original Milvus service to the new directory. When restarting the Milvus service, map the copied **db** directory to the **db** directory of the Milvus service.

<div class="alert note">
Note: Data formats of different versions may not be compatible with each other. The current release is incompatible with earlier versions.
</div>

## Can I increase my storage by adding interfaces such as S3 or GlusterFS? {#21}

No, you cannot. Milvus does not support this feature for now.

## Why do I see <code>WARN: increase temp memory to avoid cudaMalloc, or decrease query/add size (alloc 307200000 B, highwater 0 B)</code> in the log file? {#22}

You receive this warning if the graphics memory required for a request is larger than the allocated graphics memory. The warning merely denotes an insufficient graphics memory. Milvus will expand the graphics memory accordingly. 

## Why does Milvus return <code>database is locked</code>? {#23}

If you use SQLite to manage Metadata, you receive this error message when write requests occur frequently. We recommend using MySQL to manage Metadata. See [Manage Metadata with MySQL](data_manage.md).

## Still have questions? {#24}

You can:

- Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. You're welcome to raise questions, share ideas, and help others.
- Join our [Slack community](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to find more help and have fun!