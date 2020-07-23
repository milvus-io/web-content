---
id: install_milvus.md
---

# Installation Overview


## Install using Docker

Docker is the easiest and recommended way to install and run Milvus.

- [Install CPU-only Milvus on Docker](cpu_milvus_docker.md)
- [Install GPU-enabled Milvus on Docker](gpu_milvus_docker.md)

### Transfer Docker image and configuration files offline

If you cannot use your host to acquire Docker images and configuration files online because of network restrictions, please acquire them online with another available host and transfer the files offline. Refer to installation steps to learn how to acquire a Docker image. The following steps use `milvusdb/milvus` as the Docker image tag.

#### Transfer Docker image offline

  1. Save the Docker image to a TAR file and use appropriate methods to transfer the TAR file.

      ```shell
      $ docker save milvusdb/milvus > milvus_image.tar
      ```

  2. After transferring the TAR file, use the following command to load the TAR file to a Docker image.  

      ```shell
      $ docker load < milvus_image.tar
      ```
  
#### Transfer configuration files offline

  You can download configuration files and use appropriate methods to transfer the configuration files. Refer to installation steps for details.

## Build from Source

Refer to [Build Milvus from source](https://github.com/milvus-io/milvus/blob/master/INSTALL.md) to learn how to build Milvus from source.


## What's next

- If you're just getting started with Milvus:

  - [Try an example program](example_code.md)
  - [Learn more about Milvus operations](milvus_operation.md)
  - [Try Milvus Bootcamp](https://github.com/milvus-io/bootcamp)
  
- If you're ready to run Milvus in production:

  - [Configure Milvus for Production](performance_tuning.md)
  - Build a [monitoring and alerting system](monitor.md) to check real-time application performance
