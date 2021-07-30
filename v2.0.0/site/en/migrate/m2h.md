---
id: m2h.md
title: Migrate from Milvus to HDF5
---
# Migrate from Milvus to HDF5

1. Download **M2H.yaml**:

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/M2H.yaml
```

2. Set the following parameters:
- `source_milvus_path`: Work path of the source Milvus. 
- `mysql_parameter`: MySQL settings for the source Milvus. If MySQL is not used, set `mysql_parameter` as ''.
- `source_collection`: Names of the collection and its partitions in the source Milvus.
- `data_dir`: Directory holding the saved HDF5 files.

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
1. Read the data files under **milvus/db** on your local drive, and retrieve vectors and their corresponding IDs from the source Milvus according to the metadata of the specified collection or partitions:

```
collection_parameter, version = milvus_meta.get_collection_info(collection_name)
r_vectors, r_ids, r_rows = milvusdb.read_milvus_file(self.milvus_meta, collection_name, partition_tag)
```

2. Save the retrieved data as HDF5 files:

```
data_save.save_yaml(collection_name, partition_tag, collection_parameter, version, save_hdf5_name)
```

<br/>

The Milvusdm project is open sourced on [Github](https://github.com/milvus-io/milvus-tools). Any contribution to the project is welcome. Give it a star 🌟, and feel free to file an [issue](https://github.com/milvus-io/milvus-tools/issues) or submit your own code! 
