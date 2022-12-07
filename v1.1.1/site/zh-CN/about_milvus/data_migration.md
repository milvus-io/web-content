---
id: data_migration.md
---

# Milvus 数据迁移指南  

本指南适用于从 Milvus v0.7.0~0.10.6 至 Milvus v1.0.0 的数据迁移. 
<div class="alert note">
 <ul>
  <li>Milvus v0.11.0 以及早于 v0.7.0 的版本与 Milvus v1.0.0 不兼容。</li>
  <li>[<a href="milvusdm.md">MilvusDM</a> 可支持从 Milvus v0.10.x 至 v1.0.0 的数据迁移。</li>
 </ul>
</div>


## 第 1 步：关闭当前版本 Milvus

停止当前版本的 Milvus：

```
docker stop [Your_milvus_container_id]
```

删除 **/milvus** 下的 **/conf**、**/logs** 和 **/wal** 文件夹：

```
cd ~/milvus
sudo rm -rf ./conf
sudo rm -rf ./logs
sudo rm -rf ./wal
```

<div class="alert note">如需保留日志文件，请将 logs 文件夹备份到其他目录。</div>


## 第 2 步：下载配置文件

新建 **conf** 目录并下载 v1.0.0 的配置文件：

```
mkdir conf
cd conf
wget https://raw.githubusercontent.com/milvus-io/milvus/v1.1.0/core/conf/demo/server_config.yaml
```

<div class="alert note">如果下载不成功，可在网页中打开下载网址，在 conf 目录下新建同名文件，把网页中的内容粘贴到文件中保存。</div>


## 第 3 步：确认、更新 MySQL/SQLite 服务端地址

```
vim ./server_config.yaml
```

确保新版本配置项 `general.meta_uri` 指定的 MySQL/SQLite 服务端地址与老版本配置项 `db_config.backend_url` 指定的服务端地址一致。以 MySQL 为例，更新的配置信息如下所示：
```
general:
timezone:UTC+8
meta_uri: mysql://root:123456@<MySQL_server_host IP>:3306/milvus
```

## 第 4 步：下载并启动新版 Milvus

使用相同的映射路径下载并启动 Milvus v1.0.0 容器：

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

## 第 5 步：安装对应版本的 Python SDK

```
pip3 install pymilvus==1.1.0
```

## 第 6 步：验证数据正确性

编写 Python 脚本调用相关接口验证数据正确性。