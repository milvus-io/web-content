---
id: m2m.md
title: Migrate from Milvus to Milvus
---

# Migrate from Milvus to Milvus

<div class="alert note">
MilvusDM does not support migrating data from Milvus 2.0 standalone to Milvus 2.0 cluster.
</div>

1. Download **M2M.yaml**:

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/M2M.yaml
```

2. Set the following in the downloaded **M2M.yaml**:

- `source_milvus_path`: Working directory of the source Milvus.
- `mysql_parameter`: MySQL settings for the source Milvus. If MySQL is not used, set mysql_parameter as ''.
- `source_collection`: Names of the collection and its partitions in the source Milvus.
- `dest_host`: Milvus server address.
- `dest_port`: Milvus server port.
- `mode`: The migration mode:
  - `Skip`: Skip data migration if the specified collection or partition already exists.
  - `Append`: Append data if the specified collection or partition already exists.
  - `Overwrite`: Delete existing data before insertion if the specified collection or partition already exists.

```
M2M:
  milvus_version: 2.x
  source_milvus_path: '/home/user/milvus'
  mysql_parameter:
    host: '127.0.0.1'
    user: 'root'
    port: 3306
    password: '123456'
    database: 'milvus'
  source_collection:
    test:
      - 'partition_1'
      - 'partition_2'
  dest_host: '127.0.0.1'
  dest_port: 19530
  mode: 'skip' # 'skip/append/overwrite'
```

3. Run MilvusDM:

```
$ milvusdm --yaml M2M.yaml
```

## Sample Code

1. Read the data files under **milvus/db** on your local drive, and retrieve vectors and their corresponding IDs from the source Milvus according to the metadata of the specified collection or partitions:

```
collection_parameter, _ = milvus_meta.get_collection_info(collection_name)
r_vectors, r_ids, r_rows = milvusdb.read_milvus_file(self.milvus_meta, collection_name, partition_tag) 
```

2. Insert the retrieved vectors and the corresponding IDs into a target Milvus.

``` python
milvus_insert.insert_data(r_vectors, collection_name, collection_parameter, self.mode, r_ids, partition_tag)
```

<br/>

The Milvusdm project is open sourced on [Github](https://github.com/milvus-io/milvus-tools). Any contribution to the project is welcome. Give it a star 🌟, and feel free to file an [issue](https://github.com/milvus-io/milvus-tools/issues) or submit your own code! 
