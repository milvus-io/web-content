---
id: milvus_backup_api.md
summary: Learn how to use Milvus Backup through API
title: Back up and Restore Data Using APIs
---

# Back up and Restore Data Using APIs

<div class="alert note">

This page covers **Milvus Backup 0.5.x**, with downloads and examples pinned to **0.5.16**. Check the [Milvus compatibility matrix](milvus_backup_overview.md#Compatibility-matrix) for supported server versions. For Backup 0.6.0, use the [0.6.0 HTTP API guide](milvus_backup_0_6_api.md) or [upgrade from 0.5.x](milvus_backup_upgrade.md).

</div>

Milvus Backup provides data backup and restoration features to ensure the security of your Milvus data. 

## Obtain Milvus Backup

You can either download the compiled binary or build from the source.

Download the binary for your operating system and architecture from the [0.5.16 release](https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16). Use the matching 0.5.16 configuration and examples on this page.

To build 0.5.16 from source, install Go 1.25 or later and run:

```shell
git clone --branch v0.5.16 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
```

## Prepare configuration file

Download the [example configuration file](https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml) and tailor it to fit your needs.

Then create a folder alongside the downloaded or built Milvus Backup binary, name the folder `configs`, and place the configuration file inside the `configs` folder.

Your folder structure should be similar to the following:

<pre>
  <code>
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>

This example uses MinIO for backup storage. Set `minio.*` to match your Milvus storage and backup destination, including the addresses, credentials, bucket names, and root paths.

<div class="alert note">

The name of the default Minio bucket varies with the way you install Milvus. When making changes to Minio settings, do refer to the following table.

| field           | Docker Compose | Helm / Milvus Operator |
| --------------- | -------------- | ---------------------- |
| `bucketName`    | a-bucket       | milvus-bucket          |
| `rootPath`      | files          | file                   |          

</div>

## Start up the API server

Then you can start the API server as follows:

```shell
./milvus-backup server
```

The API server listens on port 8080 by default. You can change it by running it with the `-p` flag. To start the API server listening on port 443, do as follows:

```shell
./milvus-backup server -p 443
```

You can access the Swagger UI using http://localhost:<port>/api/v1/docs/index.html.

## Prepare data

If you run an empty local Milvus instance listening on the default port 19530, use the example Python scripts to generate some data in your instance. Feel free to make necessary changes to the scripts to fit your needs.

Obtain the [scripts](https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py). Then run the scripts to generate the data. Ensure that [PyMilvus](https://pypi.org/project/pymilvus/), the official Milvus Python SDK, has been installed.

```shell
mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
```

This step is optional. If you skip this, ensure that you already have some data in your Milvus instance.

## Back up data

<div class="tab-wrapper"></div>

Note that running Milvus Backup against a Milvus instance will not normally affect the running of the instance. Your Milvus instance is fully functional during backup or restore.

Run the following command to create a backup. Change `collection_names` and `backup_name` if necessary.

```shell
curl --location --request POST 'http://localhost:8080/api/v1/create' \
--header 'Content-Type: application/json' \
--data-raw '{
  "async": true,
  "backup_name": "my_backup",
  "collection_names": [
    "hello_milvus"
  ]
}'
```

The create request is asynchronous. Poll `get_backup` with the returned `requestId` as `backup_id` and wait for `data.state_code` to be `2` before restoring.

You can list the backups in the bucket specified in the Minio settings as follows:

```shell
curl --location --request GET 'http://localhost:8080/api/v1/list' \
--header 'Content-Type: application/json'
```

Retrieve the backup metadata as follows:

```shell
curl --location --request GET 'http://localhost:8080/api/v1/get_backup?backup_id=<test_backup_id>&backup_name=my_backup' \
--header 'Content-Type: application/json'
```

Replace `backup_id` and `backup_name` with the values for your backup. This endpoint returns JSON metadata, not backup files. Copy the complete backup directory from object storage when archiving it.

Now, you can save the backup files to a safe place for restoration in the future, or upload them to [Zilliz Cloud](https://cloud.zilliz.com) to create a managed vector database with your data. For details, refer to [Migrate from Milvus to Zilliz Cloud](https://zilliz.com/doc/migrate_from_milvus-2x).

## Restore data

<div class="tab-wrapper"></div>

You can call the restore API command with a `collection_suffix` option to create a new collection by restoring the data from the backup. Change `collection_names` and `backup_name` if necessary. 

```shell
curl --location --request POST 'http://localhost:8080/api/v1/restore' \
--header 'Content-Type: application/json' \
--data-raw '{
    "async": true,
    "collection_names": [
    "hello_milvus"
  ],
    "collection_suffix": "_recover",
    "backup_name":"my_backup"
}'
```

The `collection_suffix` option allows you to set a suffix for the new collection to be created. The above command will create a new collection called **hello_milvus_recover** in your Milvus instance.

If you prefer to restore the backed-up collection without changing its name, drop the collection before restoring it from the backup. You can now clean the data generated in [Prepare data](#Prepare-data) by running the following command.

```shell
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
```

Then run the following command to restore the data from the backup.

```shell
curl --location --request POST 'http://localhost:8080/api/v1/restore' \
--header 'Content-Type: application/json' \
--data-raw '{
    "async": true,
    "collection_names": [
    "hello_milvus"
  ],
    "collection_suffix": "",
    "backup_name":"my_backup"
}'
```

The restore process can be time-consuming depending on the size of the data to be restored. Therefore, the examples above request asynchronous execution with `"async": true`. You can check the status of a restore task by running:

```shell
curl --location --request GET 'http://localhost:8080/api/v1/get_restore?id=<test_restore_id>' \
--header 'Content-Type: application/json'
```

Remember to change `test_restore_id` to the `data.id` returned by the restore API. Wait for `data.state_code` to be `2` before verifying data; `3` indicates failure and `4` a timeout.

## Verify restored data

After the task succeeds, confirm that `hello_milvus_recover` exists. Create a suitable index, load the collection, and compare the entity count, scalar and vector values, and search results with the source data captured before backup. For an original-name restore, use `hello_milvus` instead.

The sample `verify_data.py` linked by the CLI guide expects two restored collections and deletes them at the end. It is not appropriate for this API example, which selects only `hello_milvus`.
