---
id: from-m2x.md
summary: This guide provides a comprehensive, step-by-step process for migrating data from Milvus 2.3.x to Milvus 2.3.x or above.
title: From Milvus 2.3.x
---

# From Milvus 2.3.x

This guide provides a comprehensive, step-by-step process for migrating data from Milvus 2.3.x to Milvus 2.3.x or above.

## Prerequisites

- **Software versions**:
    - Source Milvus: 2.3.0+ (The tool uses the iterator to fetch source collection data, requiring source Milvus to be version 2.3.0 or above.)
    - Target Milvus: 2.3.0+
- **Required tools**:
    - [Milvus-migration](https://github.com/zilliztech/milvus-migration) tool. For installation details, refer to [Install Migration Tool](milvusdm_install.md).
- **Data preparation**:
    - Ensure that the source Milvus collection is loaded and ready for data export.
    - If the target Milvus does not contain a collection corresponding to the source collection, the [milvus-migration](https://github.com/zilliztech/milvus-migration) tool will automatically create it. Note that after migration, the target collection will not be indexed, and you must manually index the collection afterward.

## Configure the migration file

Save the example migration config file as `migration.yaml` and modify the configs based on your actual conditions. You are free to put the config file in any local directory.

```yaml
dumper:
  worker:
    workMode: milvus2x
    reader:
      bufferSize: 500

meta:
  mode: config
  version: 2.3.0
  collection: src_table_name

source:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx

target:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx
```

The following table describes the parameters in the example config file. For more information, refer to [Milvus Migration: Milvus2.x to Milvus2.x](https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x).

- `dumper`

    | Parameter | Description |
    | --- | --- |
    | `dumper.worker.workMode` | The operational mode of the migration job. Set to milvus2x when migrating from Milvus 2.x. |
    | `dumper.worker.reader.bufferSize` | Buffer size to read from Milvus 2.x in each batch. |

- `meta`

    | Parameter | Description |
    | --- | --- |
    | `meta.mode` | Specifies where the meta file is read from. Set to config, indicating that the meta config can be obtained from this migration.yaml file. |
    | `meta.version` | Source Milvus version. Set to 2.3.0 or above. |
    | `meta.collection` | Source collection name. |

- `source`

    | Parameter | Description |
    | --- | --- |
    | `source.milvus2x.endpoint` | Address of the source Milvus server. |
    | `source.milvus2x.username` | Username for the source Milvus server. This parameter is required if user authentication is enabled for your Milvus server. For more information, refer to [Enable Authentication](authenticate.md). |
    | `source.milvus2x.password` | Password for the source Milvus server. This parameter is required if user authentication is enabled for your Milvus server. For more information, refer to [Enable Authentication](authenticate.md). |

- `target`

    | Parameter | Description |
    | --- | --- |
    | `target.milvus2x.endpoint` | Address of the target Milvus server. |
    | `target.milvus2x.username` | Username for the target Milvus server. This parameter is required if user authentication is enabled for your Milvus server. For more information, refer to [Enable Authentication](authenticate.md). |
    | `target.milvus2x.password` | Password for the target Milvus server. This parameter is required if user authentication is enabled for your Milvus server. For more information, refer to [Enable Authentication](authenticate.md). |

## Start the migration task

You have two options to start the migration task - using CLI or making API requests. Choose the one that best fits your needs.

### Option 1: Using CLI

Start the migration task with the following command. Replace `{YourConfigFilePath}` with the local directory where the config file `migration.yaml` resides.

```bash
./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
```

Monitor the logs for progress updates. Successful migration logs should include entries like:

```bash
[INFO] [migration/milvus2x_starter.go:79] ["=================>JobProcess!"] [Percent=100]
[INFO] [migration/milvus2x_starter.go:27] ["[Starter] migration Milvus2x to Milvus2x finish!!!"] [Cost=94.877717375]
[INFO] [starter/starter.go:109] ["[Starter] Migration Success!"] [Cost=94.878243583]
```

### Option 2: Making API requests

You can also use the Restful API to execute the migration. Start the API server with:

```bash
./milvus-migration server run -p 8080
```

Once the server starts successfully, place the `migration.yaml` file in the `configs/` directory of the project and start the migration using:

```bash
curl -XPOST http://localhost:8080/api/v1/start
```

## Verify the result

After the migration task is completed, use Attu to view the number of entities migrated. Additionally, you can create indexes and load collections in Attu. For more information, refer to [Attu](https://github.com/zilliztech/attu) and [get_collection_stats()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md).

## Additional configuration options

In addition to the basic configurations mentioned above, you can also add additional settings based on your specific requirements.

- **Selective field migration**: If you need to migrate only specific fields in a collection rather than all fields, specify the fields to be migrated in the `meta` section of the `migration.yaml` file.
    
    ```yaml
    meta:
      fields:
        - name: id
        - name: title_vector
        - name: reading_time
    ```
    
- **Custom target collection**: To customize the properties of the target collection, add the related configurations in the `meta` section of the `migration.yaml` file.
    
    ```yaml
    meta:
      milvus:
        collection: target_collection_name
        shardNum: 2
        closeDynamicField: false
        consistencyLevel: Customized
    ```
    

For detailed information, refer to [Milvus Migration: Milvus2.x to Milvus2.x](https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x).
