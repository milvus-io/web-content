---
id: milvus_backup_api.md
summary: Learn how to use Milvus Backup through API
title: Back up and Restore Data Using APIs
---

# Back up and Restore Data Using APIs

Milvus Backup provides data backup and restoration features to ensure the security of your Milvus data. 

## Obtain Milvus Backup

You can either download the compiled binary or build from the source.

To download the compiled binary, go to the [release](https://github.com/zilliztech/milvus-backup/releases) page, where you can find all official releases. Remember, always use the binaries in the release marked as **Latest**.

To compile from the source, do as follows:

```shell
git clone git@github.com:zilliztech/milvus-backup.git
go get
go build
```

## Prepare configuration file

Download the [example configuration file](https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml) and tailor it to fit your needs.

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

Because Milvus Backup cannot back up your data to a local path, ensure that Minio settings are correct when tailoring the configuration file. 

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

Obtain the [scripts](https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py). Then run the scripts to generate the data. Ensure that [PyMilvus](https://pypi.org/project/pymilvus/), the official Milvus Python SDK, has been installed.

```shell
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

Once the command is executed, you can list the backups in the bucket specified in the Minio settings as follows:

```shell
curl --location --request GET 'http://localhost:8080/api/v1/list' \
--header 'Content-Type: application/json'
```

And download the backup files as follows:

```shell
curl --location --request GET 'http://localhost:8080/api/v1/get_backup?backup_id=<test_backup_id>&backup_name=my_backup' \
--header 'Content-Type: application/json'
```

While running the above command, change `backup_id` and `backup_name` to the one returned by the list API.

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

The restore process can be time-consuming depending on the size of the data to be restored. Therefore, all restore tasks are running asynchronously. You can check the status of a restore task by running:

```shell
curl --location --request GET 'http://localhost:8080/api/v1/get_restore?id=<test_restore_id>' \
--header 'Content-Type: application/json'
```

Remember to change `test_restore_id` to the one restored by the restore API.

## Verify restored data

Once the restore completes, you can verify the restored data by indexing the restored collection as follows:

```shell
python example/verify_data.py
```

Note that the above script assumes that you have run the `restore` command with the `-s` flag and the suffix is set to `-recover`. Feel free to make necessary changes to the script to fit your need.

