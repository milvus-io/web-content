---
id: import_data
title: Import Data
sidebar_label: Import Data
---
# Import Data

Milvus supports importing data from various data formats, as long as the data can be transformed into vectors of 2-dimension arrays. 

This page shows how to migrate data to Milvus as well as data storage in Milvus.

## Prepare data files

Although Milvus supports various data formats, however, when it comes to repeated reading of the same data from a local disk storage, it is recommended to use the NPY file format, with each file containing <= 100,000 vectors. 

The NPY file format makes incredibly fast reading speed enhancement and storage optimization over reading from CSV files. Take for example the storage of single-precision 512-dimensional vectors: storing 100,000 million such vectors in CSV file takes about 800 MB, while in NPY file, it takes < 400 MB.

If you have only the CSV files, follow below steps to convert them into binary files in NPY format:

1. Read the CSV file through `pandas.read_csv`, and generate `pandas.DataFrame` data structure.
2. Through `numpy.array`, convert `pandas.DataFrame` to `numpy.array` data structure.
3. Through `numpy.save`, save the array to a binary file in NPY format.

## Import data

Follow the following steps to import vector data into Milvus through Python scripts.

### Import NPY files

1. Read the NPY file through `numpy.load` , and generate `numpy.array` data structure.
2. Through `numpy.array.tolist`, convert the `numpy.array` to a 2-dimensional list (in the form of [[],[]...[]]).
3. [Import the vectors (2-dimensional list) into Milvus](Insert vectors into a table). **A list of vector ids** will be returned instantly.

### Import CSV files

1. Read the CSV file through `pandas.read_csv`, and generate `pandas.DataFrame` data structure.
2. Through `numpy.array`, convert `pandas.DataFrame` to `numpy.array` data structure.
3. Through `numpy.array.tolist`, convert the `numpy.array` to a 2-dimensional list (in the form of [[],[]...[]]).
4. [Import the vectors (2-dimensional list) into Milvus](Insert vectors into a table). **A list of vector ids** will be returned instantly.

## Related Links
[Data Storage](reference/data_store.md)
