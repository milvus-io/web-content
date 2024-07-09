---
id: f2m.md
title: From Faiss
related_key: Faiss, migrate, import
summary: Learn how to migrate Faiss data to Milvus.
---

# From Faiss

This guide provides a comprehensive, step-by-step process for migrating data from Faiss to Milvus 2.x. By following this guide, you will be able to efficiently transfer your data, leveraging Milvus 2.x advanced features and improved performance.

## Prerequisites

- **Software versions**:
    - Source Faiss
    - Target Milvus: 2.x
    - For installation details, see [Installing Faiss](https://github.com/facebookresearch/faiss/blob/main/INSTALL.md) and [Install Milvus](https://milvus.io/docs/install_standalone-docker.md).
- **Required tools**:
    - [Milvus-migration](https://github.com/zilliztech/milvus-migration) tool. For installation details, refer to [Install Migration Tool](milvusdm_install.md).

## Configure the migration

Save the example migration config file as `migration.yaml` and modify the configs based on your actual conditions. You are free to put the config file in any local directory.

```yaml
dumper: # configs for the migration job.
  worker:
    limit: 2
    workMode: faiss    # operational mode of the migration job.
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    limit: 2
source: # configs for the source Faiss index.
  mode: local
  local:
    faissFile: ./testfiles/faiss/faiss_ivf_flat.index

target: # configs for the target Milvus collection.
  create:
    collection:
      name: test1w
      shardsNums: 2
      dim: 256
      metricType: L2

  mode: remote
  remote:
    outputDir: testfiles/output/
    cloud: aws
    endpoint: 0.0.0.0:9000
    region: ap-southeast-1
    bucket: a-bucket
    ak: minioadmin
    sk: minioadmin
    useIAM: false
    useSSL: false
    checkBucket: true
  milvus2x:
    endpoint: localhost:19530
    username: xxxxx
    password: xxxxx

```

The following table describes the parameters in the example config file. For a full list of configs, refer to [Milvus Migration: Faiss to Milvus 2.x](https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference).

- `dumper`

    | Parameter | Description |
    | --- | --- |
    | `dumper.worker.limit` | The concurrency of dumper threads. |
    | `dumper.worker.workMode` | The operational mode of the migration job. Set to faiss when migrating from Faiss indexes. |
    | `dumper.worker.reader.bufferSize` | Buffer size to read from Faiss in each batch. Unit: KB. |
    | `dumper.worker.writer.bufferSize` | Buffer size to write to Milvus in each batch. Unit: KB. |

- `loader`

    | Parameter | Description |
    | --- | --- |
    | `loader.worker.limit` | The concurrency of loader threads. |

- `source`

    | Parameter | Description |
    | --- | --- |
    | `source.mode` | Specifies where the source files are read from. Valid values:<br>- `local`: reads files from a local disk.<br>- `remote`: reads files from remote storage. |
    | `source.local.faissFile` | The directory path where the source files are located. For example, `/db/faiss.index`. |

- `target`

    | Parameter | Description |
    | --- | --- |
    | `target.create.collection.name` | Name of the Milvus collection. |
    | `target.create.collection.shardsNums` | Number of shards to be created in the collection. For more information on shards, refer to [Terminology](https://milvus.io/docs/glossary.md#Shard). |
    | `target.create.collection.dim` | Dimension of the vector field. |
    | `target.create.collection.metricType` | Metric type used to measure similarities between vectors. For more information, refer to [Terminology](https://milvus.io/docs/glossary.md#Metric-type). |
    | `target.mode` | Storage location for dumped files. Valid values:<br>- `local`: Store dumped files on local disks.<br>- `remote`: Store dumped files on object storage. |
    | `target.remote.outputDir` | Output directory path in the cloud storage bucket. |
    | `target.remote.cloud` | Cloud storage service provider. Example values: `aws`, `gcp`, `azure`. |
    | `target.remote.endpoint` | Endpoint of Milvus 2.x storage. |
    | `target.remote.region` | Cloud storage region. It can be any value if you use local MinIO. |
    | `target.remote.bucket` | Bucket name for storing data. The value must be the same as the config in Milvus 2.x. For more information, refer to [System Configurations](https://milvus.io/docs/configure_minio.md#miniobucketName). |
    | `target.remote.ak` | Access key for Milvus 2.x storage. |
    | `target.remote.sk` | Secret key for Milvus 2.x storage. |
    | `target.remote.useIAM` | Whether to use an IAM Role for connection. |
    | `target.remote.useSSL` | Whether to enable SSL when connecting to Milvus 2.x. For more information, refer to [Encryption in Transit](https://milvus.io/docs/tls.md#Encryption-in-Transit). |
    | `target.remote.checkBucket` | Whether to check if the specified bucket exists in object storage. |
    | `target.milvus2x.endpoint` | Address of the target Milvus server. |
    | `target.milvus2x.username` | Username for the Milvus 2.x server. This parameter is required if user authentication is enabled for your Milvus server. For more information, refer to [Enable Authentication](https://milvus.io/docs/authenticate.md). |
    | `target.milvus2x.password` | Password for the Milvus 2.x server. This parameter is required if user authentication is enabled for your Milvus server. For more information, refer to [Enable Authentication](https://milvus.io/docs/authenticate.md). |

## Start the migration task

1. Start the migration task with the following command. Replace `{YourConfigFilePath}` with the local directory where the config file `migration.yaml` resides.
    
    ```bash
    ./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
    ```
    
    The command above converts the Faiss index data into NumPy files, and then uses the [bulkInsert](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md) operation to write the data to the target bucket.
    
2. Once NumPy files are generated, import these files into Milvus 2.x with the following command. Replace `{YourConfigFilePath}` with the local directory where the config file `migration.yaml` resides.
    
    ```bash
    ./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
    ```
    

## Verify the result

Once the migration task is executed, you can make API calls or use Attu to view the number of entities migrated. For more information, refer to [Attu](https://github.com/zilliztech/attu) and [get_collection_stats()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md).
