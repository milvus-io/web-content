---
id: milvus_migration_conf.md
summary: Milvus Migration is a migration tool that allows you to migrate data from Milvus 0.9.x through 1.x or FAISS to Milvus 2.x.
---

# Milvus Migration Configuration Reference

### `dumper`

| Parameter                       | Description                                         | Example                                                         |
|---------------------------------|-----------------------------------------------------|-----------------------------------------------------------------|
| dumper.worker.workMode          | Work mode for milvus-migration dumper               | milvus1x: dump data from Milvus1.x; faiss: dump data from Faiss |
| dumper.worker.limit             | The number of dumper threads to run concurrently    | 20: means to dump 20 segment files simultaneously               |
| dumper.worker.reader.bufferSize | The buffer size for each segment file reader, in KB | 1024                                                            |
| dumper.worker.writer.bufferSize | The buffer size for each segment file writer, in KB | 1024                                                            |

### `loader`

| Parameter           | Description                   | Example                                           |
|---------------------|-------------------------------|---------------------------------------------------|
| loader.worker.limit | Concurrency of loader threads | 20: means load 20 segments files at the same time |

### `meta`

| parameter       | description                                                           | example                                                                             |
|-----------------|-----------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| meta.mode       | Where to read the source meta information from                        | mock/mysql/sqlite/remote                                                            |
| meta.mockFile   | When meta.mode is mock, read milvus1.x meta info from local meta.json |                                                                                     |
| meta.sqliteFile | When meta.mode is mysql, read milvus1.x meta info from meta.sqlite    | /home/root/milvus/db/meta.sqlite                                                    |
| meta.mysqlUrl   | When meta.mode is sqlite, read milvus1.x meta info from mysql         | "user:password@tcp(localhost:3306)/milvus?charset=utf8mb4&parseTime=True&loc=Local" |

### `source`

| parameter              | description                                       | example                                                       |
|------------------------|---------------------------------------------------|---------------------------------------------------------------|
| source.mode            | Where the source files are read from              | local: read files from local disk, remote: read files from S3 |
| source.local.faissFile | faissFile position                                | /db/faiss.index                                               |
| source.local.tablesDir | Position of the Milvus 0.9.x~1.x tables directory | /home/${user}/milvus/db/tables                                |

### `target`

| parameter                           | description                                          | example                                                                   |
|-------------------------------------|------------------------------------------------------|---------------------------------------------------------------------------|
| target.mode                         | Where to store the dumped files                      | local: store dumped files on local disk; remote: store dumped files on S3 |
| target.remote.outputDir             | Directory path in bucket where to store files        | output/                                                                   |
| target.remote.cloud                 | Storage in Milvus 2.x                                | aws (if using Minio, use aws), GCP, or Azure                              |
| target.remote.endpoint              | Endpoint of the Milvus 2.x storage                   | 127.0.0.1:9000                                                            |
| target.remote.region                | Region of the Milvus 2.x storage                     | If using local Minio, can use any value                                   |
| target.remote.bucket                | Bucket of the Milvus 2.x storage                     | Must use the same bucket as configured in milvus.yaml for Milvus 2.x      |
| target.remote.ak                    | Access Key of the Milvus 2.x storage                 | minioadmin                                                                |
| target.remote.sk                    | Secret Key of the Milvus 2.x storage                 | minioadmin                                                                |
| target.remote.useIAM                | Whether to use IAM Role to connect to Milvus 2.x     | false                                                                     |
| target.remote.useSSL                | Whether to use SSL when connecting to Milvus 2.x     | For local Minio, use false; for remote S3, use true                       |
| target.remote.checkBucket           | Whether to check if the bucket exists in the storage | True to check if you can connect to the Milvus 2.x storage                |
| target.milvus2x.endpoint            | Endpoint of Milvus 2.x                               | xxxxxx:19530                                                              |
| target.milvus2x.username            | Username of Milvus 2.x                               | root                                                                      |
| target.milvus2x.password            | Password of Milvus 2.x                               | xxxxxxx                                                                   |
| target.create.collection.name       | milvus2.x createCollection param name                | collection_name                                                           |
| target.create.collection.shardsNum  | milvus2.x createCollection param shardsNum           | default is 2                                                              |
| target.create.collection.dim        | milvus2.x createCollection param dim                 | must same with faiss.index data's dim                                     |
| target.create.collection.metricType | milvus2.x createCollection param metricType          | metricType: L2 or IP now                                 