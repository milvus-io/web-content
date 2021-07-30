---
id: h2m.md
title: Migrate from HDF5 to Milvus
---
# Migrate from HDF5 to Milvus

1. Download **H2M.yaml**:

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/H2M.yaml
```

2. Set the following parameters:
- `data_path`: Path to the HDF5 files.
- `data_dir`: Directory holding the HDF5 files.
- `dest_host`: Milvus server address.
- `dest_port`: Milvus server port.
- `mode`: The migration mode:
  - `Skip`: Skip data migration if the specified collection or partition already exists.
  - `Append`: Append data if the specified collection or partition already exists.
  - `Overwrite`: Delete existing data before insertion if the specified collection or partition already exists.
- `dest_collection_name`: Name of the collection to import data to.
- `dest_partition_name`: Name of the partition to import data to.
- `collection_parameter`: Collection-specific information such as vector dimension, index file size, and distance metric.

<div class="alert note">
Set either <code>data_path</code> or <code>data_dir</code>. Do <b>not</b> set both. Use <code>data_path</code> to specify multiple file paths, or <code>data_dir</code> to  specify the directory holding your data file.
</div>

```
H2M:
  milvus-version: 2.x
  data_path:
    - /Users/zilliz/float_1.h5
    - /Users/zilliz/float_2.h5
  data_dir:
  dest_host: '127.0.0.1'
  dest_port: 19530
  mode: 'overwrite'        # 'skip/append/overwrite'
  dest_collection_name: 'test_float'
  dest_partition_name: 'partition_1'
  collection_parameter:
    dimension: 128
    index_file_size: 1024
    metric_type: 'L2'
Copy
```

3. Run MilvusDM:
```
$ milvusdm --yaml H2M.yaml
```

## Sample Code

1. Read the HDF5 files to retrieve vectors and their corresponding IDs:

```
vectors, ids = self.file.read_hdf5_data()
```

2. Insert the retrieved data into Milvus:

```
ids = insert_milvus.insert_data(vectors, self.c_name, self.c_param, self.mode, ids,self.p_name)
```


<br/>


The Milvusdm project is open sourced on [Github](https://github.com/milvus-io/milvus-tools). Any contribution to the project is welcome. Give it a star 🌟, and feel free to file an [issue](https://github.com/milvus-io/milvus-tools/issues) or submit your own code! 