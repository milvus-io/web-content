---
id: f2m.md
title: Migrate from Faiss to Milvus
---

# Migrate from Faiss to Milvus

1. Download **F2M.yaml**:

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/F2M.yaml
```

2. Set the following in the downloaded **F2M.yaml**:
- `data_path`: Path to the data files in Faiss.
- `dest_host`: Milvus server address.
- `dest_port`: Milvus server port.
- `mode`: The migration mode:
  - `Skip`: Skip data migration if the specified collection or partition already exists.
  - `Append`: Append data if the specified collection or partition already exists.
  - `Overwrite`: Delete existing data before insertion if the specified collection or partition already exists.
- `dest_collection_name`: Name of the collection to import data to.
- `dest_partition_name`: Name of the partition to import data to.
- `collection_parameter`: Collection-specific information such as vector dimension, index file size, and distance metric.

```
F2M:
  milvus_version: 2.x
  data_path: '/home/data/faiss.index'
  dest_host: '127.0.0.1'
  dest_port: 19530
  mode: 'append'        # 'skip/append/overwrite'
  dest_collection_name: 'test'
  dest_partition_name: ''
  collection_parameter:
    dimension: 256
    index_file_size: 1024
    metric_type: 'L2'
Copy
```

3. Run MilvusDM:

```
$ milvusdm --yaml F2M.yaml
```

## Sample Code

1. Read Faiss data files to retrieve vectors and their corresponding IDs:

```
ids, vectors = faiss_data.read_faiss_data()
```

2. Insert the retrieved data into Milvus:

```
insert_milvus.insert_data(vectors, self.dest_collection_name, self.collection_parameter, self.mode, ids, self.dest_partition_name)
```

<br/>


The Milvusdm project is open sourced on [Github](https://github.com/milvus-io/milvus-tools). Any contribution to the project is welcome. Give it a star 🌟, and feel free to file an [issue](https://github.com/milvus-io/milvus-tools/issues) or submit your own code! 