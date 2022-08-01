---
id: migrate_overview.md
summary: MilvusDM allows data migration between Milvus and many other sources of data.
---

# Overview
[MilvusDM](https://github.com/milvus-io/milvus-tools) (Milvus Data Migration) is an open-source tool designed specifically for importing and exporting data with Milvus. MilvusDM allows you to migrate data in a specific collection or partition. 

<div class="alert note">
Currently, MilvusDM is only supported in Milvus 1.x version.
</div>

To substantially improve data management efficiency and reduce DevOps costs, MilvusDM supports the following migration channels: 

- [Milvus to Milvus](m2m.md): Migrates data between instances of Milvus.
- [Faiss to Milvus](f2m.md): Imports unzipped data from Faiss to Milvus.
- [HDF5 to Milvus](h2m.md): Imports HDF5 files into Milvus.
- [Milvus to HDF5](m2h.md): Saves the data in Milvus as HDF5 files.

![MilvusDM](../../../assets/milvusdm.jpeg "MilvusDM.")

MilvusDM is hosted on GitHub. To install MilvusDM, run: 
```
pip3 install pymilvusdm
```

## MilvusDM File Structure
The flow chart below shows how MilvusDM performs different tasks according to the .yaml file it receives:

![File structure](../../../assets/file_structure.png "MilvusDM file structure.")

MilvusDM file structure:

- pymilvusdm
  - core
    - **milvus_client.py**: Performs client operations in Milvus.
    - **read_data.py**: Reads the HDF5 files on your local drive. (Add your code here to support reading data files in other formats.)
    - **read_faiss_data.py**: Reads Faiss data files. 
    - **read_milvus_data.py**: Reads Milvus data files. 
    - **read_milvus_meta.py**: Reads Milvus metadata. 
    - **data_to_milvus.py**: Creates collections or partitions as specified in .yaml files and imports vectors and the corresponding IDs into Milvus.
    - **save_data.py**: Saves data as HDF5 files.
    - **write_logs.py**: Writes `debug`/`info`/`error` logs during runtime.
  - **faiss_to_milvus.py**: Imports Faiss data into Milvus.
  - **hdf5_to_milvus.py**: Imports HDF5 files into Milvus.
  - **milvus_to_milvus.py**: Migrates data from a source Milvus to a target Milvus.
  - **milvus_to_hdf5.py**: Saves Milvus data as HDF5 files.
  - **main.py**: Executes tasks as specified by the received .yaml file.
  - **setting.py**: Stores configurations for MilvusDM operation.
- **setup.py**: Creates and uploads pymilvusdm file packages to PyPI (Python Package Index).
## Enhancement Plan
In future releases, MilvusDM will provide more new features including MilvusDump and MilvusRestore to support exporting all Milvus data, restoring data in specified collections and partitions, resuming interrupted download and more.


<div class="alert note">
The MilvusDM project is open sourced on <a href="https://github.com/milvus-io/milvus-tools">GitHub</a>. Any contribution to the project is welcome. Give it a star 🌟, and feel free to <a href="https://github.com/milvus-io/milvus-tools/issues">file an issue</a> or submit your own code! 
</div>
