---
id: import_data
title: Import Data
sidebar_label: Import Data
---
# Import Data

Milvus supports importing data from various data formats, as long as the data can be transformed into vectors of 2-dimensional arrays.

## Prepare data files

Although Milvus supports various data formats, when it comes to repeated reading of the same data from a local disk storage, it is recommended to use the NPY file format with each NPY file containing less than or equal to 100,000 vectors.

The NPY file format supports faster reading speed and less storage space than CSV files. For example, a CSV file with 100,000 million 512-dimensional vectors takes more than 800 MB, while an NPY file takes less than 400 MB.

If you have only the CSV files, follow below steps to convert them into binary files in NPY format:

1. Read the CSV file through `pandas.read_csv`, and generate `pandas.DataFrame` data structure.
2. Through `numpy.array`, convert `pandas.DataFrame` to `numpy.array` data structure.
3. Through `numpy.save`, save the array to a binary file in NPY format.

## Import data

Follow the following steps to import vector data into Milvus through Python scripts.

### Import NPY files

1. Read the NPY file through `numpy.load` , and generate `numpy.array` data structure.
2. Through `numpy.array.tolist`, convert the `numpy.array` to a 2-dimensional list (in the form of [[],[]...[]]).
3. [Import the vectors (2-dimensional list) into Milvus](milvus_operation.md#insert-vectors-into-a-table). **A list of vector ids** will be returned instantly.

### Import CSV files

1. Read the CSV file through `pandas.read_csv`, and generate `pandas.DataFrame` data structure.
2. Through `numpy.array`, convert `pandas.DataFrame` to `numpy.array` data structure.
3. Through `numpy.array.tolist`, convert the `numpy.array` to a 2-dimensional list (in the form of [[],[]...[]]).
4. [Import the vectors (2-dimensional list) into Milvus](milvus_operation.md#insert-vectors-into-a-table). **A list of vector ids** will be returned instantly.

## Related links

- [Insert Vectors into a Table](milvus_operation.md)
- [Data Normalization](https://github.com/milvus-io/bootcamp/blob/master/EN_docs/data_preparation/data_normalization.md)
