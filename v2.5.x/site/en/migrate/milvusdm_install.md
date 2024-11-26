---
id: milvusdm_install.md
summary: Learn how to install Milvus-Migration to migrate your data.
title: Install Migration Tool
---

# Install Migration Tool

We support downloading the executable binary file or compiling the Milvus-migration tool from source.

## Download the executable binary

1. Download the latest release from the [Milvus-Migration GitHub repository](https://github.com/zilliztech/milvus-migration/tags).
2. Extract the downloaded file to obtain the `milvus-migration` executable binary.

## Compile from source

Alternatively, download and compile the source to obtain an executable binary file.

1. Clone the Milvus-Migration repository:
    
    ```bash
    # clone the source project
    git clone https://github.com/zilliztech/milvus-migration.git
    ```
    
2. Navigate to the project directory:
    
    ```bash
    cd milvus-migration
    ```
    
3. Compile the project to obtain the executable file:
    
    ```bash
    # compile the project to obtain an executable file
    go get & go build
    ```
    
    This will generate the `milvus-migration` executable in the project directory.
    

## What's next

Having the Milvus-migration tool installed, you can migrate data from various sources:

- [From Elasticsearch](es2m.md)
- [From Faiss](f2m.md)
- [From Milvus 1.x](m2m.md)