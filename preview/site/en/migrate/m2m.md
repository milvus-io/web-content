---
id: m2m.md
summary: This guide provides a comprehensive, step-by-step process for migrating data from Milvus 1.x (including 0.9.x and above) to Milvus 2.x.
title: From Milvus 1.x
---

# From Milvus 1.x

This guide provides a comprehensive, step-by-step process for migrating data from Milvus 1.x (including 0.9.x and above) to Milvus 2.x. By following this guide, you will be able to efficiently transfer your data, leveraging Milvus 2.x advanced features and improved performance.

## Prerequisites

- **Software versions**:
    - Source Milvus: 0.9.x to 1.x
    - Target Milvus: 2.x
- **Required tools**:
    - [Milvus-migration](https://github.com/zilliztech/milvus-migration) tool. For installation details, refer to [Install Migration Tool](milvusdm_install.md).

## Export metadata of the source Milvus installation

To prepare migration data for Milvus 0.9.x through 1.x, stop the source Milvus or at least stop performing any DML operations in it.

1. Export metadata of the source Milvus installation to `meta.json`.
    
    - For those installations using MySQL as the backend, run
    
    ```bash
    ./milvus-migration export -m "user:password@tcp(adderss)/milvus?charset=utf8mb4&parseTime=True&loc=Local" -o outputDir
    ```
    
    - For those installations using SQLite as the backend, run
    
    ```bash
    ./milvus-migration export -s /milvus/db/meta.sqlite -o outputDir
    ```
    
2. Copy the `tables` folder of your Milvus installation, then move both `meta.json` and the `tables` folder to an empty folder.
    
    Once this step is done, the structure of the empty folder should look like this:
    
    ```
    migration_data
    ├── meta.json
    └── tables
    ```
    
3. Upload the folder prepared in the preceding step to an S3 block storage bucket or directly use this local folder in the next section.

## Configure the migration file

Save the example migration config file as `migration.yaml` and modify the configs based on your actual conditions. You are free to put the config file in any local directory.

```yaml
dumper:
  worker:
    limit: 2
    workMode: milvus1x
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    limit: 16
meta:
  mode: local
  localFile: /outputDir/test/meta.json
source:
  mode: local
  local:
    tablesDir: /db/tables/
target:
  mode: remote
  remote:
    outputDir: "migration/test/xx"
    ak: xxxx
    sk: xxxx
    cloud: aws
    region: us-west-2
    bucket: xxxxx
    useIAM: true
    checkBucket: false
  milvus2x:
    endpoint: "{yourMilvus2_xServerAddress}:{port}"
    username: xxxx
    password: xxxx
```

The following table describes the parameters in the example config file. For a full list of configs, refer to [Milvus Migration: Milvus1.x to Milvus 2.x](https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#migrationyaml-reference).

- `dumper`

    | Parameter | Description |
    | --- | --- |
    | `dumper.worker.limit` | The concurrency of dumper threads. |
    | `dumper.worker.workMode` | The operational mode of the migration job. Set to `milvus1x` when migrating from Milvus 1.x. |
    | `dumper.worker.reader.bufferSize` | Buffer size to read from Milvus 1.x in each batch. Unit: KB. |
    | `dumper.worker.writer.bufferSize` | Buffer size to write to Milvus 2.x in each batch. Unit: KB. |

- `loader`

    | Parameter | Description |
    | --- | --- |
    | `loader.worker.limit` | The concurrency of loader threads. |

- `meta`

    | Parameter | Description |
    | --- | --- |
    | `meta.mode` | Specifies where the meta file meta.json is read from. Valid values: `local`, `remote`, `mysql`, `sqlite`. |
    | `meta.localFile` | Local directory path where the `meta.json` file resides. This config is used only when `meta.mode` is set to `local`. For other meta configs, refer to [README_1X](https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#meta). |

- `source`

    | Parameter | Description |
    | --- | --- |
    | `source.mode` | Specifies where the source files are read from. Valid values:<br>- `local`: reads files from a local disk.<br>- `remote`: reads files from remote storage. |
    | `source.local.tablesDir` | The directory path where the source files are located. For example, `/db/tables/`. |

- `target`

    | Parameter | Description |
    | --- | --- |
    | `target.mode` | Storage location for dumped files. Valid values:<br>- `local`: Store dumped files on local disks.<br>- `remote`: Store dumped files on object storage. |
    | `target.remote.outputDir` | Output directory path in the cloud storage bucket. |
    | `target.remote.ak` | Access key for Milvus 2.x storage. |
    | `target.remote.sk` | Secret key for Milvus 2.x storage. |
    | `target.remote.cloud` | Cloud storage service provider. Example values: `aws`, `gcp`, `azure`. |
    | `target.remote.region` | Cloud storage region. It can be any value if you use local MinIO. |
    | `target.remote.bucket` | Bucket name for storing data. The value must be the same as the config in Milvus 2.x. For more information, refer to [System Configurations](https://milvus.io/docs/configure_minio.md#miniobucketName). |
    | `target.remote.useIAM` | Whether to use an IAM Role for connection. |
    | `target.remote.checkBucket` | Whether to check if the specified bucket exists in object storage. |
    | `target.milvus2x.endpoint` | Address of the target Milvus server. |
    | `target.milvus2x.username` | Username for the Milvus 2.x server. This parameter is required if user authentication is enabled for your Milvus server. For more information, refer to [Enable Authentication](https://milvus.io/docs/authenticate.md). |
    | `target.milvus2x.password` | Password for the Milvus 2.x server. This parameter is required if user authentication is enabled for your Milvus server. For more information, refer to [Enable Authentication](https://milvus.io/docs/authenticate.md). |

## Start the migration task

1. Start the migration task with the following command. Replace `{YourConfigFilePath}` with the local directory where the config file `migration.yaml` resides.
    
    ```bash
    ./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
    ```
    
    The command above converts the source data in Milvus 1.x into NumPy files, and then uses the [bulkInsert](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md) operation to write the data to the target bucket.
    
2. Once NumPy files are generated, import these files into Milvus 2.x with the following command. Replace `{YourConfigFilePath}` with the local directory where the config file `migration.yaml` resides.
    
    ```bash
    ./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
    ```
    

## Verify the result

Once the migration task is executed, you can make API calls or use Attu to view the number of entities migrated. For more information, refer to [Attu](https://github.com/zilliztech/attu) and [get_collection_stats()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md).
