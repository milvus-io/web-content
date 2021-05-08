---
id: data_migration.md
---

# Milvus Data Migration Guide  

This migration guide deals with migrating data from Milvus v0.7.0~0.10.6 to Milvus v1.0.0. 
<div class="alert note">
 <ul>
  <li>Milvus v0.11.0 and versions earlier than v0.7.0 are incompatible with v1.0.0.</li>
  <li><a href="milvusdm.md">MilvusDM</a> supports migrating data from Milvus v0.10.x to v1.0.0</li>
 </ul>
</div>


## Step 1: Stop Current Version of Milvus

Stop the current version of Milvus:

```
docker stop [Your_milvus_container_id]
```

Delete **/conf**, **/logs**, and **/wal** under **/milvus**:

```
cd ~/milvus
sudo rm -rf ./conf
sudo rm -rf ./logs
sudo rm -rf ./wal
```

<div class="alert note">Save a copy of the logs folder if you want to retain log files.</div>


## Step 2: Download the v1.0.0 Configuration File

Create a **conf** directory and download the v1.0.0 configuration file:

```
mkdir conf
cd conf
wget https://raw.githubusercontent.com/milvus-io/milvus/v1.1.0/core/conf/demo/server_config.yaml
```

<div class="alert note">If the download is unsuccessful, you can open the download URL on a web page, create a new file with the same name in the conf directory, then save the web page content by copying it to the new file.</div>


## Step 3: Update the Server Address of MySQL/SQLite

```
vim ./server_config.yaml
```

Ensure that the MySQL/SQLite server address specified in `general.meta_uri` matches the server address specified in `db_config.backend_url`. If you use MySQL to manage metadata, the configuration information appears as follows:

```
general:
timezone:UTC+8
meta_uri: mysql://root:123456@<MySQL_server_host IP>:3306/milvus
```

## Step 4: Download and Start Milvus v1.0.0

Download and run a Milvus v1.0.0 docker image using the same mapping path setting:

```
$ sudo docker run -d --name milvus_cpu_1.1.0 \
-p 19530:19530 \
-p 19121:19121 \
-v /home/$USER/milvus/db:/var/lib/milvus/db \
-v /home/$USER/milvus/conf:/var/lib/milvus/conf \
-v /home/$USER/milvus/logs:/var/lib/milvus/logs \
-v /home/$USER/milvus/wal:/var/lib/milvus/wal \
milvusdb/milvus:1.1.0-cpu-d050721-5e559c
```

## Step 5: Install the Python SDK Corresponding to Milvus v1.0.0

```
pip3 install pymilvus==1.1.0
```

## Step 6: Verify Data Correctness

Write and run a Python script to verify if the data is correct.