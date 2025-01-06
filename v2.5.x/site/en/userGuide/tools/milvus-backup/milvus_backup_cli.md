---
id: milvus_backup_cli.md
summary: Learn how to use Milvus Backup through CLI
title: Back up and Restore Data Using Commands
---

# Back up and Restore Data Using Commands

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

## Prepare data

If you run an empty local Milvus instance at the default port, use the example Python scripts to generate some data in your instance. Feel free to make necessary changes to the scripts to fit your needs.

Obtain the [scripts](https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py). Then run the scripts to generate the data. Ensure that [PyMilvus](https://pypi.org/project/pymilvus/), the official Milvus Python SDK, has been installed.

```shell
python example/prepare_data.py
```

This step is optional. If you skip this, ensure that you already have some data in your Milvus instance.

## Back up data

Note that running Milvus Backup against a Milvus instance will not normally affect the running of the instance. Your Milvus instance is fully functional during backup or restore.

<div class="tab-wrapper"></div>

Run the following command to create a backup.

```shell
./milvus-backup create -n <backup_name>
```

Once the command is executed, you can check the backup files in the bucket specified in the Minio settings. Specifically, you can download them using **Minio Console** or the **mc** client.

To download from [Minio Console](https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html), log into Minio Console, locate the bucket specified in `minio.address`, select the files in the bucket, and click **Download** to download them.

If you prefer [the mc client](https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install), do as follows:

```shell
# configure a Minio host
mc alias set my_minio https://<minio_endpoint> <accessKey> <secretKey>

# List the available buckets
mc ls my_minio

# Download a bucket recursively
mc cp --recursive my_minio/<your-bucket-path> <local_dir_path>
```

Now, you can save the backup files to a safe place for restoration in the future, or upload them to [Zilliz Cloud](https://cloud.zilliz.com) to create a managed vector database with your data. For details, refer to [Migrate from Milvus to Zilliz Cloud](https://zilliz.com/doc/migrate_from_milvus-2x).

## Restore data

<div class="tab-wrapper"></div>

You can run the `restore` command with the `-s` flag to create a new collection by restoring the data from the backup:

```shell
./milvus-backup restore -n my_backup -s _recover
```

The `-s` flag allows you to set a suffix for the new collection to be created. The above command will create a new collection called **hello_milvus_recover** in your Milvus instance.

If you prefer to restore the backed-up collection without changing its name, drop the collection before restoring it from the backup. You can now clean the data generated in [Prepare data](#Prepare-data) by running the following command.

```shell
python example/clean_data.py
```

Then run the following command to restore the data from the backup.

```shell
./milvus-backup restore -n my_backup
```

## Verify restored data

Once the restore completes, you can verify the restored data by indexing the restored collection as follows:

```shell
python example/verify_data.py
```

Note that the above script assumes that you have run the `restore` command with the `-s` flag and the suffix is set to `-recover`. Feel free to make necessary changes to the script to fit your need.



