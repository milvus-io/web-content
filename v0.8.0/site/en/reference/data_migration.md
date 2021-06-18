---
id: data_migration.md
---

# Migrate Data to Milvus v.0.10.x

Milvus v0.8.0 is no longer supported. We highly recommend migrating your data to v0.10.x. For demonstration purposes, this tutorial covers migrating data to v0.10.3.

<div class="alert warning">
This version is <i>incompatible</i> with v0.11.0.
</div>

## Step 1: Stop Milvus v0.8.0 

1. Stop the current version of Milvus:

    ```
    docker stop [Your_milvus_container_id]
    ```

2. Delete **/conf**, **/logs,** and **/wal** under **/milvus**: 

    ```
    cd ~/milvus
    sudo rm -rf ./conf
    sudo rm -rf ./logs
    sudo rm -rf ./wal
    ```

    <div class="alert note">
    Save a copy of the <b>logs</b> folder if you want to retain log files.
    </div>

## Step 2: Download the v0.10.3 configuration file

Create a **conf** directory and download the v0.10.3 configuration file:

```
mkdir conf
cd conf
wget https://raw.githubusercontent.com/milvus-io/milvus/0.10.3/core/conf/demo/server_config.yaml
```

<div class="alert note">
If the download is unsuccessful, you can open the download URL with the web page, create a new file of the same name in the <b>conf</b> directory, and paste the content of the web page into the file to save.
</div>

## Step 3: Update the server address of MySQL/SQLite 

```
vim ./server_config.yaml
```

Ensure that the MySQL/SQLite server address specified in `general.meta_uri` matches the server address specified in `db_config.backend_url`. If you use MySQL to manage metadata, the configuration information appears as follows:

```
 general:
  timezone:UTC+8
  meta_uri: mysql://root:123456@<MySQL_server_host IP>:3306/milvus
```

## Step 4: Download and start Milvus v0.10.3

Download and run a Milvus v0.10.3 docker image using the same mapping path settings as in the current version:

```
docker pull milvusdb/milvus:0.10.3-cpu-d091720-f962e8
docker run -it -d -p 19530:19530 -v ~/milvus/db:/var/lib/milvus/db -v ~/milvus/conf:/var/lib/milvus/conf -v ~/milvus/logs:/var/lib/milvus/logs -v ~/milvus/wal:/var/lib/milvus/wal milvusdb/milvus:0.10.3-cpu-d091720-f962e8
```

## Step 5: Install the Python SDK corresponding to Milvus v0.10.3

```
pip3 install pymilvus==0.2.14
```

## Step 6: Verify data correctness

Write and run a Python script to verify data correctness. 
