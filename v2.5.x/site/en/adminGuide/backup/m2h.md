---
id: m2h.md
title: Migrate from Milvus to HDF5
related_key: Milvus to HDF5
summary: Save Milvus data as HDF5 files.
deprecate: true
---
# Migrate Data from Milvus to HDF5

You can save data in Milvus as HDF5 files using [MilvusDM](migrate_overview.md).

1. Download **M2H.yaml**:

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/M2H.yaml
```

2. Set the following parameters:
- `source_milvus_path`: Working directory of Milvus. 
- `mysql_parameter`: MySQL settings for Milvus. If MySQL is not used, set this parameter as ''.
- `source_collection`: Names of the collection and its partitions in Milvus.
- `data_dir`: Directory to save HDF5 files.

Example:
```
M2H:
  milvus_version: 2.x
  source_milvus_path: '/home/user/milvus'
  mysql_parameter:
    host: '127.0.0.1'
    user: 'root'
    port: 3306
    password: '123456'
    database: 'milvus'
  source_collection: # specify the 'partition_1' and 'partition_2' partitions of the 'test' collection.
    test:
      - 'partition_1'
      - 'partition_2'
  data_dir: '/home/user/data'
```

3. Run MilvusDM:
```
$ milvusdm --yaml M2H.yaml
```

## Sample Code
1. Read the data under **milvus/db** on your local drive, and retrieve vectors and their corresponding IDs from Milvus according to the metadata of the specified collection or partitions:

```
collection_parameter, version = milvus_meta.get_collection_info(collection_name)
r_vectors, r_ids, r_rows = milvusdb.read_milvus_file(self.milvus_meta, collection_name, partition_tag)
```

2. Save the retrieved data as HDF5 files:

```
data_save.save_yaml(collection_name, partition_tag, collection_parameter, version, save_hdf5_name)
```

