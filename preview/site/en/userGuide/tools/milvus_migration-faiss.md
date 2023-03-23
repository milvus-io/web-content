---
id: milvus_migration-faiss.md
label: FAISS
order: 3
group: milvus_migration-sqlite.md
summary: Learn how to use Milvus Migration
---

# Migrate Data from FAISS to Milvus 2.x

Due to architecture changes, Milvus offers a migration tool for you to safely migrate data from Milvus 1.x (including Milvus 0.9.x) to Milvus 2.x.

## Obtain Milvus Migration

You can either download the compiled binary or build from the source.

To download the compiled binary, go to the [release](https://github.com/zilliztech/milvus-migration/releases) page, where you can find all official releases. Remember, always use the binaries in the release marked as **Latest**.

You should choose the binary that fits the architecture of your operating system.

To compile from the source, do as follows:

```shell
git clone git@github.com:zilliztech/milvus-migration.git
go build
```

## Prepare migration

Create a configuration file, name it `migration.yaml`, and place it in the folder where the downloaded or built binary resides. 

<div class="tab-wrapper"><a href="milvus_migration-sqlite.md" class=''>SQLite-based Milvus</a><a href="milvus_migration-mysql.md" class=''>MySQL-based Milvus</a><a href="milvus_migration-faiss.md" class='active '>FAISS</a></div>

```yaml
dumper:
    worker: 
        limit: 20 # number of dumper threads run concurrently
        workMode: faiss
        reader:
            bufferSize: 1024 # in KB
        writer:
            bufferSize: 1024 # in KB
loader:
    worker:
        limit: 20 # number of loader threads run concurrently
source:
    mode: local
    local:
        faissFile: /data/faiss.index
target:
    mode: remote
    remote:
        outputDir: output/ # do not prefix it with a forward slash (/).
        cloud: aws
        endpoint: 127.0.0.1:9000
        region: ap-southeast-1
        bucket: a-bucket
        ak: minioadmin
        sk: minioadmin
        useIAM: false
        useSSL: false
        checkBucket: true
    milvus2x: # Milvus 2.x connection endpoint and its authentication credentials
        endpoint: xxxxxx:19530
        username: xxxxx
        password: xxxxx
    create:
        collection:
        name: test
        shardsNum: 2
        dim: 512
        metricType: L2
```

For details on configuration items, see [Milvus Migration Configuration Reference](milvus_migration_conf.md).

## Migrate data

Once you prepared the configuration file and placed it alongside the Milvus Migration binary, you can start migrating data from a legacy Milvus instance or FAISS to a Milvus 2.x instance.

```shell
# Dump the data from a legacy Milvus instance
./milvus-migration dump

# Load the data to a Milvus 2.x instance
./milvus-migration load
```