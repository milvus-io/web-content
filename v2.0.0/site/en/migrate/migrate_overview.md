---
id: migrate_overview.md
title: Overview
---

# Overview
[MilvusDM](https://github.com/milvus-io/milvus-tools) (Milvus Data Migration) is an open-source tool designed specifically for importing and exporting data files with Milvus. MilvusDM has the following features, greatly improving data management efficiency and reducing DevOps costs: 

- Faiss to Milvus: Imports unzipped data from Faiss to Milvus.
- HDF5 to Milvus: Imports HDF5 files into Milvus.
- Milvus to Milvus: Migrates data from a source Milvus to a target Milvus.
- Milvus to HDF5: Saves the data in Milvus as HDF5 files.

![MilvusDM](../../../assets/milvusdm.jpeg)

MilvusDM is hosted on Github and can be easily installed by running the command `pip3 install pymilvusdm`. MilvusDM allows you to migrate data in a specific collection or partition. 

## MilvusDM File Structure
The flow chart below shows how MilvusDM performs different tasks according to the YAML file it receives:

![File structure](../../../assets/file_structure.png)

MilvusDM file structure:

- pymilvusdm
  - core
    - **milvus_client.py**: Performs client operations in Milvus.
    - **read_data.py**: Reads the HDF5 data files on your local drive. (Add your code here to support reading data files in other formats.)
    - **read_faiss_data.py**: Reads Faiss data files. 
    - **read_milvus_data.py**: Reads Milvus data files. 
    - **read_milvus_meta.py**: Reads Milvus metadata. 
    - **data_to_milvus.py**: Creates collections or partitions as specified in YAML files and imports vectors and the corresponding IDs into Milvus.
    - **save_data.py**: Saves data as HDF5 files.
    - **write_logs.py**: Writes logs during runtime.
  - **faiss_to_milvus.py**: Imports data from Faiss into Milvus.
  - **hdf5_to_milvus.py**: Imports data in HDF5 format into Milvus.
  - **milvus_to_milvus.py**: Migrates data from a source Milvus to a target Milvus.
  - **milvus_to_hdf5.py**: Saves data in Milvus as HDF5 files.
  - **main.py**: Executes tasks as specified by the received YAML file.
  - **setting.py**: Configurations for running MilvusDM.
- **setup.py**: Creates and uploads pymilvusdm file packages to PyPI (Python Package Index).

In future releases, MilvusDM will provide more new features including MilvusDump and MilvusRestore to support exporting all Milvus data, restoring data in specified collections and partitions, resuming interrupted download and more.

The Milvusdm project is open sourced on [Github](https://github.com/milvus-io/milvus-tools). Any contribution to the project is welcome. Give it a star 🌟, and feel free to file an [issue](https://github.com/milvus-io/milvus-tools/issues) or submit your own code! 

