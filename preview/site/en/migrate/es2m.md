---
id: es2m.md
summary: This guide provides a comprehensive, step-by-step process for migrating data from Elasticsearch to Milvus 2.x.
title: From Elasticsearch
---

# From Elasticsearch

This guide provides a comprehensive, step-by-step process for migrating data from Elasticsearch to Milvus 2.x. By following this guide, you will be able to efficiently transfer your data, leveraging Milvus 2.x advanced features and improved performance.

## Prerequisites

- **Software versions**:
    - Source Elasticsearch: 7.x or 8.x
    - Target Milvus: 2.x
    - For installation details, refer to [Installing Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html) and [Install Milvus](https://milvus.io/docs/install_standalone-docker.md).
- **Required tools**:
    - [Milvus-migration](https://github.com/zilliztech/milvus-migration) tool. For installation details, refer to [Install Migration Tool](milvusdm_install.md).
- **Supported data types for migration**: The fields to migrate from the source Elasticsearch index are of the following types - [dense_vector](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector), [keyword](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type), [text](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type), [long](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html), [integer](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html), [double](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html), [float](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html), [boolean](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html), [object](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html). Data types not listed here are currently not supported for migration. Refer to [Field mapping reference](#field-mapping-reference) for detailed information on data mappings between Milvus collections and Elasticsearch indexes.
- **Elasticsearch index requirements**:
    - The source Elasticsearch index must contain a vector field of the `dense_vector` type. Migration cannot start without a vector field.

## Configure the migration file

Save the example migration config file as `migration.yaml` and modify the configs based on your actual conditions. You are free to put the config file in any local directory.

```yaml
dumper: # configs for the migration job.
  worker:
    workMode: "elasticsearch" # operational mode of the migration job.
    reader:
      bufferSize: 2500 # buffer size to read from Elasticsearch in each batch. A value ranging from 2000 to 4000 is recommended.
meta: # meta configs for the source Elasticsearch index and target Milvus 2.x collection.
  mode: "config" # specifies the source for meta configs. currently, onlly `config` is supported.
  version: "8.9.1"
  index: "qatest_index" # identifies the Elasticsearch index to migrate data from.
  fields: # fields within the Elasticsearch index to be migrated.
  - name: "my_vector" # name of the Elasticsearch field.
    type: "dense_vector" # data type of the Elasticsearch field.
    dims: 128 # dimension of the vector field. required only when `type` is `dense_vector`.
  - name: "id"
    pk: true # specifies if the field serves as a primary key.
    type: "long"
  - name: "num"
    type: "integer"
  - name: "double1"
    type: "double"
  - name: "text1"
    maxLen: 1000 # max. length of data fields. required only for `keyword` and `text` data types.
    type: "text"
  - name: "bl1"
    type: "boolean"
  - name: "float1"
    type: "float"
  milvus: # configs specific to creating the collection in Milvus 2.x
    collection: "Collection_01" # name of the Milvus collection. defaults to the Elasticsearch index name if not specified.
    closeDynamicField: false # specifies whether to disable the dynamic field in the collection. defaults to `false`.
    shardNum: 2 # number of shards to be created in the collection.
    consistencyLevel: Strong # consistency level for Milvus collection.
source: # connection configs for the source Elasticsearch server
  es:
    urls:
    - "http://10.15.1.***:9200" # address of the source Elasticsearch server.
    username: "" # username for the Elasticsearch server.
    password: "" # password for the Elasticsearch server.
target:
  mode: "remote" # storage location for dumped files. valid values: `remote` and `local`.
  remote: # configs for remote storage
    outputDir: "migration/milvus/test" # output directory path in the cloud storage bucket.
    cloud: "aws" # cloud storage service provider. Examples: `aws`, `gcp`, `azure`, etc.
    region: "us-west-2" # region of the cloud storage; can be any value if using local Minio.
    bucket: "zilliz-aws-us-****-*-********" # bucket name for storing data; must align with configs in milvus.yaml for Milvus 2.x.
    useIAM: true # whether to use an IAM Role for connection.
    checkBucket: false # checks if the specified bucket exists in the storage.
  milvus2x: # connection configs for the target Milvus 2.x server
    endpoint: "http://10.102.*.**:19530" # address of the target Milvus server.
    username: "****" # username for the Milvus 2.x server.
    password: "******" # password for the Milvus 2.x server.
```

The following table describes the parameters in the example config file. For a full list of configs, refer to [Milvus Migration: Elasticsearch to Milvus 2.x](https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference).

- `dumper`

    | Parameter | Description |
    | --- | --- |
    | `dumper.worker.workMode` | The operational mode of the migration job. Set to `elasticsearch` when migrating from Elasticsearch indexes. |
    | `dumper.worker.reader.bufferSize` | Buffer size to read from Elasticsearch in each batch. Unit: KB. |

- `meta`

    | Parameter | Description |
    | --- | --- |
    | `meta.mode` | Specifies the source for meta configs. Currently, only `config` is supported. |
    | `meta.index` | Identifies the Elasticsearch index to migrate data from. |
    | `meta.fields` | Fields within the Elasticsearch index to be migrated. |
    | `meta.fields.name` | Name of the Elasticsearch field. |
    | `meta.fields.maxLen` | Maximum length of the field. This parameter is required only when `meta.fields.type` is `keyword` or `text`. |
    | `meta.fields.pk` | Specifies if the field serves as the primary key. |
    | `meta.fields.type` | Data type of the Elasticsearch field. Currently, the following data types in Elasticsearch are supported: [dense_vector](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector), [keyword](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type), [text](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type), [long](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html), [integer](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html), [double](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html), [float](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html), [boolean](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html), [object](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html). |
    | `meta.fields.dims` | Dimension of the vector field. This parameter is required only when `meta.fields.type` is `dense_vector`. |
    | `meta.milvus` | Configs specific to creating the collection in Milvus 2.x. |
    | `meta.milvus.collection` | Name of the Milvus collection. Defaults to the Elasticsearch index name if not specified. |
    | `meta.milvus.closeDynamicField` | Specifies whether to disable the dynamic field in the collection. Defaults to `false`. For more information on dynamic fields, refer to [Enable Dynamic Field](https://milvus.io/docs/enable-dynamic-field.md#Enable-Dynamic-Field). |
    | `meta.milvus.shardNum` | Number of shards to be created in the collection. For more information on shards, refer to [Terminology](https://milvus.io/docs/glossary.md#Shard). |
    | `meta.milvus.consistencyLevel` | Consistency level for the collection in Milvus. For more information, refer to [Consistency](https://milvus.io/docs/consistency.md). |

- `source`

    | Parameter | Description |
    | --- | --- |
    | `source.es` | Connection configs for the source Elasticsearch server. |
    | `source.es.urls` | Address of the source Elasticsearch server. |
    | `source.es.username` | Username for the Elasticsearch server. |
    | `source.es.password` | Password for the Elasticsearch server. |

- `target`

    | Parameter | Description |
    | --- | --- |
    | `target.mode` | Storage location for dumped files. Valid values:<br>- `local`: Store dumped files on local disks.<br>- `remote`: Store dumped files on object storage. |
    | `target.remote.outputDir` | Output directory path in the cloud storage bucket. |
    | `target.remote.cloud` | Cloud storage service provider. Example values: `aws`, `gcp`, `azure`. |
    | `target.remote.region` | Cloud storage region. It can be any value if you use local MinIO. |
    | `target.remote.bucket` | Bucket name for storing data. The value must be the same as the config in Milvus 2.x. For more information, refer to [System Configurations](https://milvus.io/docs/configure_minio.md#miniobucketName). |
    | `target.remote.useIAM` | Whether to use an IAM Role for connection. |
    | `target.remote.checkBucket` | Whether to check if the specified bucket exists in object storage. |
    | `target.milvus2x` | Connection configs for the target Milvus 2.x server. |
    | `target.milvus2x.endpoint` | Address of the target Milvus server. |
    | `target.milvus2x.username` | Username for the Milvus 2.x server. This parameter is required if user authentication is enabled for your Milvus server. For more information, refer to [Enable Authentication](https://milvus.io/docs/authenticate.md). |
    | `target.milvus2x.password` | Password for the Milvus 2.x server. This parameter is required if user authentication is enabled for your Milvus server. For more information, refer to [Enable Authentication](https://milvus.io/docs/authenticate.md). |

## Start the migration task

Start the migration task with the following command. Replace `{YourConfigFilePath}` with the local directory where the config file `migration.yaml` resides.

```bash
./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
```

The following is an example of a successful migration log output:

```bash
[task/load_base_task.go:94] ["[LoadTasker] Dec Task Processing-------------->"] [Count=0] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[task/load_base_task.go:76] ["[LoadTasker] Progress Task --------------->"] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[dbclient/cus_field_milvus2x.go:86] ["[Milvus2x] begin to ShowCollectionRows"]
[loader/cus_milvus2x_loader.go:66] ["[Loader] Static: "] [collection=test_mul_field4_rename1] [beforeCount=50000] [afterCount=100000] [increase=50000]
[loader/cus_milvus2x_loader.go:66] ["[Loader] Static Total"] ["Total Collections"=1] [beforeTotalCount=50000] [afterTotalCount=100000] [totalIncrease=50000]
[migration/es_starter.go:25] ["[Starter] migration ES to Milvus finish!!!"] [Cost=80.009174459]
[starter/starter.go:106] ["[Starter] Migration Success!"] [Cost=80.00928425]
[cleaner/remote_cleaner.go:27] ["[Remote Cleaner] Begin to clean files"] [bucket=a-bucket] [rootPath=testfiles/output/zwh/migration]
[cmd/start.go:32] ["[Cleaner] clean file success!"]
```

## Verify the result

Once the migration task is executed, you can make API calls or use Attu to view the number of entities migrated. For more information, refer to [Attu](https://github.com/zilliztech/attu) and [get_collection_stats()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md).

## Field mapping reference

Review the table below to understand how field types in Elasticsearch indexes are mapped to field types in Milvus collections.

For more information on supported data types in Milvus, refer to [Supported data types](https://milvus.io/docs/schema.md#Supported-data-types).

| Elasticsearch Field Type | Milvus Field Type | Description |
| --- | --- | --- |
| dense_vector | FloatVector | Vector dimensions remain unchanged during migration. |
| keyword | VarChar | Set Max Length (1 to 65,535). Strings exceeding the limit can trigger migration errors. |
| text | VarChar | Set Max Length (1 to 65,535). Strings exceeding the limit can trigger migration errors. |
| long | Int64 | - |
| integer | Int32 | - |
| double | Double | - |
| float | Float | - |
| boolean | Bool | - |
| object | JSON | - |