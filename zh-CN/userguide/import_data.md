---
id: import_data
title: Import Data
sidebar_label: Import Data
---

# 导入数据

Milvus 支持多种数据格式的导入，前提是这些数据最终能转化为二维数组形式的向量。

## 准备数据文件

虽然 Milvus 支持多种类型的数据格式，但当需要从本地磁盘重复读取相同的数据时，建议使用NPY格式的文件，每个文件最好不超过100,000条向量。

相比 CSV 文件，NPY 格式文档的读取速度更快、数据存储占用空间更小。以 512 维单精度向量为例，10 万条向量的 NPY 文件小于 400 MB，而 CSV 文件大于 800 MB。

如果只有 CSV 文件，可以通过以下步骤生成相应的 NPY 二进制文件：

1. 通过 `pandas.read_csv` 方法读入一个 CSV 文件，生成 `pandas.dataframe` 数据类型。
2. 通过 `numpy.array` 方法，将上述 `pandas.dataframe` 转换成 `numpy.array` 数据类型。
3. 将 `numpy.array` 数据类型，通过 `numpy.save` 方法存为一个 NPY 二进制文件。

## 导入数据

请按照以下步骤，通过 Milvus 提供的 Python 客户端导入数据。

### 导入 NPY 文件

1. 通过 `numpy.load` 方法读入一个 NPY 文件，生成 `numpy.array` 类型的数据。
2. 通过 `numpy.array.tolist` 方法将 `numpy.array` 数据转换成 2 维列表（形如，[[],[]...[]]）。
3. [向 Milvus 导入向量（二维列表）](milvus_operation.md#将向量插入表)。导入成功后，将同时返回**向量 ids 列表** 。

### 导入 CSV 文件

1. 通过 `pandas.read_csv` 方法读入一个 CSV 文件，生成 `pandas.dataframe` 类型的数据。
2. 通过 `numpy.array` 方法，将上述 `pandas.dataframe` 转换成 `numpy.array` 类型的数据。
3. 通过 `numpy.array.tolist` 方法将 `numpy.array` 数据导转换成 2 维列表（形如，[[],[]...[]]）。
4. [向 Milvus 导入向量（二维列表）](milvus_operation.md#将向量插入表)。导入成功后，将同时返回**向量 ids 列表** 。

## 相关阅读

- [向表插入向量](milvus_operation.md)
- [数据归一化](https://github.com/milvus-io/bootcamp/blob/master/EN_docs/data_preparation/data_normalization.md)
