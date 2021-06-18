---
id: operational_faq.md
---

# Operational FAQ

<!-- TOC -->

- [What if I failed to pull Milvus Docker image from Docker Hub?](#What-if-I-failed-to-pull-Milvus-Docker-image-from-Docker-Hub)
- [Is Docker the only way to install and run Milvus?](#Is-Docker-the-only-way-to-install-and-run-Milvus)
- [Why does Milvus return `config check error`?](#Why-does-Milvus-return-config-check-error)
- [Why do I get `no space left on device` when importing data to Milvus?](#Why-do-I-get-no-space-left-on-device-when-importing-data-to-Milvus)
- [Why is my recall rate unsatisfying?](#Why-is-my-recall-rate-unsatisfying)
- [Why does my updated configuration not work?](#Why-does-my-updated-configuration-not-work)
- [How can I know if Milvus has started successfully?](#How-can-I-know-if-Milvus-has-started-successfully)
- [Why is the time in the log files different from the system time?](#Why-is-the-time-in-the-log-files-different-from-the-system-time)
- [How can I know whether my CPU supports Milvus?](#How-can-I-know-whether-my-CPU-supports-Milvus)
- [Why does Milvus return `Illegal instruction` during startup?](#Why-does-Milvus-return-illegal-instruction-during-startup)
- [How can I know whether my GPU is supported by Milvus?](#How-can-I-know-whether-my-GPU-is-supported-by-Milvus)
- [Where is the script for starting the server in the Milvus Docker container?](#Where-is-the-script-for-starting-the-server-in-the-Milvus-Docker-container)
- [Besides the configuration file, how can I tell Milvus is using GPU for search?](#Besides-the-configuration-file-how-can-I-tell-Milvus-is-using-GPU-for-search)
- [Can I install Milvus on Windows?](#Can-I-install-Milvus-on-Windows)
- [How to fix the error when I install pymilvus on Windows?](#How-to-fix-the-error-when-I-install-pymilvus-on-Windows)
- [Can I deploy Milvus service in an air-gapped environment?](#Can-I-deploy-Milvus-service-in-an-air-gapped-environment)
- [How can I differentiate if I have multiple Milvus nodes connected to Pushgateway?](#How-can-I-differentiate-if-I-have-multiple-Milvus-nodes-connected-to-Pushgateway)
- [Which database system should I use to manage Metadata, SQLite or MySQL?](#Which-database-system-should-I-use-to-manage-Metadata-SQLite-or-MySQL)
- [How to calculate required memory based on the size of the dataset?](#How-to-calculate-required-memory-based-on-the-size-of-the-dataset)
- [How to migrate data in Milvus?](#How-to-migrate-data-in-Milvus)
- [Can I increase my storage by adding interfaces such as S3 or GlusterFS?](#Can-I-increase-my-storage-by-adding-interfaces-such-as-S3-or-GlusterFS)
- [Why do I see `WARN: increase temp memory to avoid cudaMalloc, or decrease query/add size (alloc 307200000 B, highwater 0 B)` in the log file?](#Why-do-I-see-WARN-increase-temp-memory-to-avoid-cudaMalloc-or-decrease-queryadd-size-alloc-307200000-B-highwater-0-B-in-the-log-file)
- [Why does Milvus return `database is locked`?](#Why-does-Milvus-return-database-is-locked)
- [Still have questions?](#Still-have-questions)

<!-- /TOC -->

#### What if I failed to pull Milvus Docker image from Docker Hub?

Users in some countries may have limited access to Docker Hub. In this case, you can pull the Docker image from other registry mirrors. You can add the URL `"https://registry.docker-cn.com"` to the `registry-mirrors` array in `/etc.docker/daemon.json`.

```json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

#### Is Docker the only way to install and run Milvus?

No. You can also build Milvus from source code in Linux. See [Build Milvus from source code](https://github.com/milvus-io/milvus/blob/master/INSTALL.md) for more information.

#### Why does Milvus return `config check error`?

The version of configuration file does not match the version your Milvus server.

#### Why do I get `no space left on device` when importing data to Milvus?

It is likely that you have not saved enough disk space.

#### Why is my recall rate unsatisfying?

You can increase the value of `nprobe` when searching from a client. The greater the value, the more accurate the result, and the more time it takes.

See [Performance Tuning > Index](tuning.md#Index) for more information.

#### Why does my updated configuration not work?

You need to restart Milvus Docker each time you update the configuration file. See [Milvus Server Configuration > Updating configurations](milvus_config.md#Updating-configurations).

#### How can I know if Milvus has started successfully?

Run `sudo docker logs <container ID>` to check if Milvus is running properly.

#### Why is the time in the log files different from the system time?

The log files in the Docker container use UTC time by default. If your host machine does not use UTC time, then the time in the log files is different. We recommend that you mount the log files onto your host machine to keep the time consistent between the log and the host.

#### How can I know whether my CPU supports Milvus?

The instruction sets that Milvus supports are SSE42, AVX, AVX2, and AVX512. Your CPU must support at least one of them for Milvus to function properly.

#### Why does Milvus return `illegal instruction` during startup?

If your CPU does not support SSE42, AVX, AVX2, or AVX512, Milvus cannot start properly. You can use `cat /proc/cpuinfo` to check the supported instruction sets.

#### How can I know whether my GPU is supported by Milvus?

Milvus supports CUDA architecture 6.0 or later. See [Wikipedia](https://en.wikipedia.org/wiki/CUDA) for supported architectures.

#### Where is the script for starting the server in the Milvus Docker container?

It is at **/var/lib/milvus/script/** in the Milvus Docker container.

#### Besides the configuration file, how can I tell Milvus is using GPU for search?

Use any of the following methods:

- Use `nvidia-smi` to monitor your GPU usage.

- Use Prometheus to monitor performance metrics. See [Visualize Metrics in Grafana > System performance metrics](setup_grafana.md#System-performance-metrics).

- Check the Milvus server logs.

#### Can I install Milvus on Windows?

Yes, so long as you have set up a Docker environment on your operating system.

#### How to fix the error when I install pymilvus on Windows?

Try installing pymilvus in a Conda environment.

#### Can I deploy Milvus service in an air-gapped environment?

Milvus is released as a Docker image. Follow these steps to deploy it from offline:

1. Pull the latest Milvus Docker image when you have Internet access.

2. Run `docker save` to save the Docker image as a TAR file.

3. Transfer the TAR file to the air-gapped environment.

4. Run `docker load` to load the file as a Docker image.

For more information about Docker, see [docs.docker.com](https://docs.docker.com/).

#### How can I differentiate if I have multiple Milvus nodes connected to Pushgateway?

You can add a Prometheus instance in **prometheus.yaml**. Then Prometheus or Granafa will show the monitoring data, as well as the source node.

#### Which database system should I use to manage Metadata, SQLite or MySQL?

We recommend using MySQL to manage Metadata in production environment.

#### How to calculate required memory based on the size of the dataset?

Different indexes require different memory space. You can use [Milvus sizing tool](https://zilliz.com/sizing-tool) to calculate the required memory for a vector search.

#### How to migrate data in Milvus?

Copy the entire **db** directory of the original Milvus service to the new directory. When restarting the Milvus service, map the copied **db** directory to the **db** directory of the Milvus service.

<div class="alert note">
Note: Data formats of different versions may not be compatible with each other. The current data format is backward compatible with Milvus v0.7.0.
</div>

#### Can I increase my storage by adding interfaces such as S3 or GlusterFS?

No, you cannot. Milvus does not support this feature for now.

#### Why do I see `WARN: increase temp memory to avoid cudaMalloc, or decrease query/add size (alloc 307200000 B, highwater 0 B)` in the log file?

You receive this warning if the graphics memory required for a request is larger than the graphics memory allocated beforehand. The warning merely denotes an insufficient graphics memory. Milvus will expand the graphics memory accordingly. 

#### Why does Milvus return `database is locked`?

If you use SQLite to manage Metadata, you receive this error message when write requests occur frequently. We recommend using MySQL for Metadata management. See [Manage Metadata with MySQL](data_manage.md).

#### Still have questions?

You can:

- Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. You're welcome to raise questions, share ideas, and help others.
- Join our [Slack community](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to find more help and have fun!
