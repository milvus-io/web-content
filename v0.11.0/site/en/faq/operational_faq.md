---
id: operational_faq.md
---

# Operational FAQ

<div class="faq-header" id="1">What if I failed to pull Milvus Docker image from Docker Hub?</div>

Users in some countries may have limited access to Docker Hub. In this case, you can pull the Docker image from other registry mirrors. You can add the URL `"https://registry.docker-cn.com"` to the `registry-mirrors` array in `/etc.docker/daemon.json`.

```json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

<div class="faq-header" id="2">Is Docker the only way to install and run Milvus?</div>

No. You can also build Milvus from source code in Linux. See [Build Milvus from source code](https://github.com/milvus-io/milvus/blob/master/INSTALL.md) for more information.

<div class="faq-header" id="3">Why does Milvus return <code>config check error</code>?</div>

The version of configuration file does not match the version your Milvus server. It is very likely you have not downloaded the right version of **milvus.yaml**, see [Download Configuration File](milvus_docker-cpu.md#Download-configuration-file)

<div class="faq-header" id="4">Why do I get <code>no space left on device</code> when importing data to Milvus?</div>

It is likely that you have not saved enough disk space.

<div class="faq-header" id="5">Why is my recall rate unsatisfying?</div>

You can increase the value of `nprobe` when searching from a client. The greater the value, the more accurate the result, and the more time it takes.

See [Performance Tuning > Index](tuning.md#Index) for more information.

<div class="faq-header" id="6">Why does my updated configuration not work?</div>

You need to restart Milvus Docker each time you update the configuration file. See [Milvus Server Configuration > Updating configurations](milvus_config.md#Updating-configurations).

<div class="faq-header" id="7">How can I know if Milvus has started successfully?</div>

Run `sudo docker logs <container ID>` to check if Milvus is running properly.

<div class="faq-header" id="8">Why is the time in the log files different from the system time?</div>

The log files in the Docker container use UTC time by default. If your host machine does not use UTC time, then the time in the log files is different. We recommend that you mount the log files onto your host machine to keep the time consistent between the log and the host.

<div class="faq-header" id="9">How can I know whether my CPU supports Milvus?</div>

The instruction sets that Milvus supports are SSE42, AVX, AVX2, and AVX512. Your CPU must support at least one of them for Milvus to function properly.

<div class="faq-header" id="10">Why does Milvus return Illegal instruction during startup?</div>

If your CPU does not support SSE42, AVX, AVX2, or AVX512, Milvus cannot start properly. You can use `cat /proc/cpuinfo` to check the supported instruction sets.

<div class="faq-header" id="11">How can I know whether my GPU is supported by Milvus?</div>

Milvus supports CUDA architecture 6.0 or later. See [Wikipedia](https://en.wikipedia.org/wiki/CUDA) for supported architectures.

<div class="faq-header" id="12">Where is the script for starting the server in the Milvus Docker container?</div>

It is at **/var/lib/milvus/script/** in the Milvus Docker container.

<div class="faq-header" id="13">Besides the configuration file, how can I tell Milvus is using GPU for search?</div>

Use any of the following methods:

- Use `nvidia-smi` to monitor your GPU usage.

- Use Prometheus to monitor performance metrics. See [Visualize Metrics in Grafana > System performance metrics](setup_grafana.md#System-performance-metrics).

- Check the Milvus server logs.

<div class="faq-header" id="14">Can I install Milvus on Windows?</div>

Yes, so long as you have set up a Docker environment on your operating system.

<div class="faq-header" id="15">How to fix the error when I install pymilvus on Windows?</div>

Try installing pymilvus in a Conda environment.

<div class="faq-header" id="16">Can I deploy Milvus service in an air-gapped environment?</div>

Milvus is released as a Docker image. Follow these steps to deploy it from offline:

1. Pull the latest Milvus Docker image when you have Internet access.

2. Run `docker save` to save the Docker image as a TAR file.

3. Transfer the TAR file to the air-gapped environment.

4. Run `docker load` to load the file as a Docker image.

For more information about Docker, see [docs.docker.com](https://docs.docker.com/).

<div class="faq-header" id="17">How can I differentiate if I have multiple Milvus nodes connected to Pushgateway?</div>

You can add a Prometheus instance in **prometheus.yaml**. Then Prometheus or Granafa will show the monitoring data, as well as the source node.

<div class="faq-header" id="18">Which database system should I use to manage Metadata, SQLite or MySQL?</div>

We recommend using MySQL to manage Metadata in production environment.

<div class="faq-header" id="19">How to calculate required memory based on the size of the dataset?</div>

Different indexes require different memory space. You can use [Milvus sizing tool](https://milvus.io/tools/sizing) to calculate the required memory for a vector search.

<div class="faq-header" id="20">How to migrate data in Milvus?</div>

Copy the entire **db** directory of the original Milvus service to the new directory. When restarting the Milvus service, map the copied **db** directory to the **db** directory of the Milvus service.

<div class="alert note">
Note: Data formats of different versions may not be compatible with each other. The current data format is backward compatible with Milvus v0.7.0.
</div>

<div class="faq-header" id="21">Can I increase my storage by adding interfaces such as S3 or GlusterFS?</div>

No, you cannot. Milvus does not support this feature for now.

<div class="faq-header" id="22">Why do I see <code>WARN: increase temp memory to avoid cudaMalloc, or decrease query/add size (alloc 307200000 B, highwater 0 B)</code> in the log file?</div>

You receive this warning if the graphics memory required for a request is larger than the graphics memory allocated beforehand. The warning merely denotes an insufficient graphics memory. Milvus will expand the graphics memory accordingly. 

<div class="faq-header" id="23">Why does Milvus return <code>database is locked</code>?</div>

If you use SQLite to manage Metadata, you receive this error message when write requests occur frequently. We recommend using MySQL to manage Metadata. See [Manage Metadata with MySQL](data_manage.md).

<div class="faq-header" id="24">Still have questions?</div>

You can:

- Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. You're welcome to raise questions, share ideas, and help others.
- Join our [Slack community](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to find more help and have fun!