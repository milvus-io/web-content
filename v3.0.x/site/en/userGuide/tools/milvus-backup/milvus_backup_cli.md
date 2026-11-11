---
id: milvus_backup_cli.md
summary: Learn how to use Milvus Backup through CLI
title: Back up and Restore Data Using Commands
beta: Milvus Backup 0.5.x
---

# Back up and Restore Data Using Commands

For current workflows, see the [CLI guide](milvus_backup_0_6_cli.md) or [upgrade from 0.5.x](milvus_backup_upgrade.md). Check the [compatibility matrix](milvus_backup_overview.md#Compatibility-matrix) for supported Milvus server versions.

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

## Prepare data

If you run an empty local Milvus instance at the default port, use the example Python scripts to generate some data in your instance. Feel free to make necessary changes to the scripts to fit your needs.

Obtain the [scripts](https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py). Then run the scripts to generate the data. Ensure that [PyMilvus](https://pypi.org/project/pymilvus/), the official Milvus Python SDK, has been installed.

```shell
mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
```

This step is optional. If you skip this, ensure that you already have some data in your Milvus instance.

## Back up data

Note that running Milvus Backup against a Milvus instance will not normally affect the running of the instance. Your Milvus instance is fully functional during backup or restore.

<div class="tab-wrapper"></div>

Run the following command to create a backup.

```shell
./milvus-backup create -n my_backup
```

Once the command is executed, you can check the backup files in the bucket specified in the Minio settings. Specifically, you can download them using **Minio Console** or the **mc** client.

To download from [Minio Console](https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html), log into Minio Console, locate the bucket specified in `minio.backupBucketName`, select the files in the bucket, and click **Download** to download them.

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
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
```

Then run the following command to restore the data from the backup.

```shell
./milvus-backup restore -n my_backup
```

## Verify restored data

For the disposable sample data created above, the upstream script indexes and queries `hello_milvus_recover` and `hello_milvus2_recover`, then **deletes both restored collections**. Run it only after restoring both sample collections with `_recover`. For your own data, compare against your backup-time baseline without using this cleanup script.

```shell
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/verify_data.py -o example/verify_data.py
python example/verify_data.py
```

Note that the above script assumes that you have run the `restore` command with the `-s` flag and the suffix is set to `_recover`. Feel free to make necessary changes to the script to fit your need.
