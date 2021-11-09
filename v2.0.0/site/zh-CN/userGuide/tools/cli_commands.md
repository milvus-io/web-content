---
id: cli_commands.md
summary: Interact with Milvus using commands.
---
# Milvus CLI命令参考

Milvus命令行接口(CLI)是一个支持数据库连接、数据操作、以及数据导入和导出的命令行工具。基于[Milvus Python SDK](https://github.com/milvus-io/pymilvus)，它允许使用交互式命令行提示符通过终端执行命令。本文介绍了所有支持的命令及其参数，还包括了一些示例供你参考。
## calc

计算两个向量数组之间的距离。
### 语法
```shell
calc
```
### 
|参数|全名|描述|
|:---|:---|:---|
|--help|n/a|显示用法信息。|

### 示例

根据提示输入需要的信息，计算两个向量数组之间的距离。
```shell
milvus_cli > calc

Import left operator vectors from existing collection? [y/N]: n

The vector's type (float_vectors, bin_vectors): float_vectors

Left vectors:
    [[0.083, 0.992, 0.931, 0.433, 0.93, 0.706, 0.668, 0.481, 0.255, 0.088, 
    0.121, 0.701, 0.935, 0.142, 0.012, 0.197, 0.066, 0.864, 0.263, 0.732, 
    0.445, 0.672, 0.184, 0.675, 0.361, 0.115, 0.396, 0.206, 0.084, 0.274, 
    0.523, 0.958, 0.071, 0.646, 0.864, 0.434, 0.212, 0.5, 0.319, 0.608, 
    0.356, 0.745, 0.672, 0.488, 0.221, 0.485, 0.193, 0.557, 0.546, 0.626, 
    0.593, 0.526, 0.404, 0.795, 0.076, 0.156, 0.231, 0.1, 0.18, 0.796, 
    0.716, 0.752, 0.816, 0.363], [0.284, 0.135, 0.172, 0.198, 0.752, 0.174, 
    0.314, 0.18, 0.672, 0.727, 0.062, 0.611, 0.921, 0.851, 0.238, 0.648, 
    0.794, 0.177, 0.639, 0.339, 0.402, 0.977, 0.887, 0.528, 0.768, 0.16, 
    0.698, 0.016, 0.906, 0.261, 0.902, 0.93, 0.547, 0.146, 0.65, 0.072, 
    0.876, 0.645, 0.303, 0.922, 0.807, 0.093, 0.063, 0.344, 0.667, 0.81, 
    0.662, 0.147, 0.242, 0.641, 0.903, 0.714, 0.637, 0.365, 0.512, 0.267, 
    0.577, 0.809, 0.698, 0.62, 0.768, 0.402, 0.922, 0.592]] 

Import right operator vectors from existing collection? [y/N]: n

The vector's type (float_vectors, bin_vectors): float_vectors

Right vectors: 
    [[0.518, 0.034, 0.786, 0.251, 0.04, 0.247, 0.55, 0.595, 0.638, 0.957, 
    0.303, 0.023, 0.007, 0.712, 0.841, 0.648, 0.807, 0.429, 0.402, 0.904, 
    0.002, 0.882, 0.69, 0.268, 0.732, 0.511, 0.942, 0.202, 0.749, 0.234, 
    0.666, 0.517, 0.787, 0.399, 0.565, 0.457, 0.57, 0.937, 0.712, 0.981, 
    0.928, 0.678, 0.154, 0.775, 0.754, 0.532, 0.074, 0.493, 0.288, 0.229, 
    0.9, 0.657, 0.936, 0.184, 0.478, 0.587, 0.592, 0.84, 0.793, 0.985, 
    0.826, 0.595, 0.947, 0.175], [0.704, 0.02, 0.937, 0.249, 0.431, 0.99, 
    0.779, 0.855, 0.731, 0.665, 0.773, 0.647, 0.135, 0.44, 0.621, 0.329, 
    0.718, 0.003, 0.927, 0.511, 0.515, 0.359, 0.744, 0.828, 0.31, 0.161, 
    0.605, 0.539, 0.331, 0.077, 0.503, 0.668, 0.275, 0.72, 0.172, 0.035, 
    0.88, 0.762, 0.646, 0.727, 0.83, 0.001, 0.085, 0.188, 0.583, 0.709, 
    0.134, 0.683, 0.246, 0.214, 0.863, 0.109, 0.168, 0.539, 0.451, 0.303, 
    0.064, 0.575, 0.547, 0.85, 0.75, 0.789, 0.681, 0.735], [0.648, 0.769, 
    0.525, 0.716, 0.752, 0.199, 0.095, 0.222, 0.767, 0.029, 0.244, 0.527, 
    0.496, 0.691, 0.487, 0.83, 0.546, 0.102, 0.845, 0.096, 0.744, 0.758, 
    0.092, 0.289, 0.139, 0.005, 0.204, 0.245, 0.528, 0.607, 0.446, 0.029, 
    0.686, 0.558, 0.705, 0.451, 0.87, 0.404, 0.824, 0.727, 0.058, 0.283, 
    0.512, 0.682, 0.027, 0.026, 0.809, 0.669, 0.241, 0.103, 0.101, 0.225, 
    0.989, 0.662, 0.917, 0.972, 0.93, 0.447, 0.318, 0.434, 0.437, 0.036, 
    0.009, 0.96], [0.726, 0.418, 0.404, 0.244, 0.618, 0.356, 0.07, 0.842, 
    0.137, 0.967, 0.465, 0.811, 0.027, 0.704, 0.935, 0.546, 0.92, 0.125, 
    0.917, 0.089, 0.463, 0.929, 0.289, 0.721, 0.368, 0.837, 0.14, 0.431, 
    0.495, 0.75, 0.484, 0.083, 0.431, 0.392, 0.177, 0.303, 0.013, 0.317, 
    0.593, 0.047, 0.695, 0.185, 0.633, 0.825, 0.203, 0.619, 0.597, 0.152, 
    0.899, 0.061, 0.512, 0.67, 0.82, 0.52, 0.743, 0.07, 0.99, 0.119, 
    0.949, 0.284, 0.529, 0.65, 0.523, 0.059]]

Supported metric type. Default is "L2" (L2, IP, HAMMING, TANIMOTO) [L2]:
L2

sqrt [False]: True

Timeout（可选） []:

======
Return type:
Assume the vectors_left: L_1, L_2, L_3
Assume the vectors_right: R_a, R_b
Distance between L_n and R_m we called "D_n_m"
The returned distances are arranged like this:
[[D_1_a, D_1_b],
[D_2_a, D_2_b],
[D_3_a, D_3_b]]

Note: if some vectors do not exist in collection, the returned distance is "-1.0"
======

Result:

[[3.625464916229248, 3.234992742538452, 3.568333148956299, 3.694913148880005], [2.556027889251709, 2.8901233673095703, 3.385758399963379, 3.3239054679870605]]
```
## clear
清除屏幕。
### 语法
```shell
clear
```
### 参数
|参数|全名|描述|
|:---|:---|:---|
|--help|n/a|显示用法信息。|

## connect 
连接Milvus。
### 语法
```shell
connect [-h (text)] [-p (int)] [-a (text)]
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-h|--host|（可选） 主机名。默认是 "127.0.0.1"。
|-p|--port|（可选） 端口号。默认是"19530"。|
|-a|--alias|（可选）Milvus链接的别名。默认是"default"。|
|--help|n/a|显示用法信息。|

### 示例
```shell
milvus_cli > connect -h 127.0.0.1 -p 19530 -a default
```

## create collection
创建一个集合。
### 语法
```shell
create collection -c (text) -f (text) -p (text) [-a] [-d (text)]
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection-name|集合的名称。|
|-f|--schema-field|（多个）使用```<fieldName>:<dataType>:<dimOfVector/desc>``` 格式表示的字段规范。|
|-p|--schema-primary-field|主键字段的名称。|
|-a|--schema-auto-id|（可选）自动生成ID的开关。|
|-d|--schema-描述|（可选）集合的描述。|
|--help|n/a|显示用法信息。|


### 示例
```shell
milvus_cli > create collection -c car -f id:INT64:primary_field -f vector:FLOAT_VECTOR:128 -f color:INT64:color -f brand:INT64:brand -p id -a -d 'car_collection'
```

## create partition
创建一个分区。
### 语法
```shell
create partition -c (text) -p (text) [-d (text)]
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|集合的名称。|
|-p|--partition|分区的名称。|
|-d|--description|（可选）分区的描述。|
|--help|n/a|显示用法信息。|


### 示例
```shell
milvus_cli > create partition -c car -p new_partition -d test_add_partition
```

## create index

为字段创建一个索引。

<div class="alert note">
目前，一个集合最多支持一个索引。</div>

### 语法
```shell
create index
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|--help|n/a|显示用法信息。|

### 示例
根据提示输入需要的信息，为字段创建索引。
```shell
milvus_cli > create index

Collection name (car, car2): car2

The name of the field to create an index for (vector): vector

Index type (FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY): IVF_FLAT

Index metric type (L2, IP, HAMMING, TANIMOTO): L2

Index params nlist: 2

Timeout []:
```
## delete collection
删除集合。
### 语法
```shell
delete collection -c (text) [-t (float)]
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|待删除集合的名称。|
|-t|--timeout|（可选）允许的远程过程调用的最大持续时间(以秒为单位)。如果不传递此参数，客户端将一直等待直到服务器响应或发生错误。|
|--help|n/a|显示用法信息。|

### 示例
```shell
milvus_cli > delete collection -c car
```

## delete partition
删除分区。

### 语法
```shell
delete partition -c (text) -p (text) [-t (float)]
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|待删除分区所属集合的名称。|
|-t|--timeout|（可选）允许的远程过程调用的最大持续时间(以秒为单位)。如果不传递此参数，客户端将一直等待直到服务器响应或发生错误。|
|-p|--partition|待删除分区的名称。|
|--help|n/a|显示用法信息。|

### 示例
```shell
milvus_cli > delete partition -c car -p new_partition
```

## delete index
删除索引和相应的索引文件。

<div class="alert note"> 目前，一个集合最多支持一个索引。</div>

### 语法
```shell
delete index -c (text) [-t (float)]
```

### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|集合的名称。|
|-t|--timeout|（可选）允许的远程过程调用的最大持续时间(以秒为单位)。如果不传递此参数，客户端将一直等待直到服务器响应或发生错误。|
|--help|n/a|显示用法信息。|

### 示例
```shell
milvus_cli > delete index -c car
```
## delete entities (Milvus 2.0.0-GA支持)
删除实体。

### 语法
``` shell
delete entities -c (text) [-p (text)] [-t (float)]
```

### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|集合的名称。|
|-p|--partition|（可选）实体所属的分区的名称。|
|-t|--timeout|（可选）允许的远程过程调用的最大持续时间(以秒为单位)。如果不传递此参数，客户端将一直等待直到服务器响应或发生错误。|
|--help|n/a|显示用法信息。|

### 示例

```shell
milvus_cli > delete entities -c car

The expression to specify entities to be deleted, such as "film_id in [0, 1 ]": film_id in [ 0, 1 ]

You are trying to delete the entities of collection. This action cannot be undone!

Do you want to continue? [y/N]: y
```

## describe collection
显示集合的详细信息。

### 语法
```shell
describe collection -c (text)
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|集合的名称。|
|--help|n/a|显示用法信息。|

### 示例
```shell
milvus_cli > describe collection -c test_collection_insert
```
## describe  partition
显示分区的详细信息。

### 语法
```shell
describe partition -c (text) -p (text)
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|分区所属的集合的名称。|
|-p|--partition|分区的名称。|
|--help|n/a|显示用法信息。|

### 示例
```shell
milvus_cli > describe partition -c test_collection_insert -p _default
```
## describe index
显示索引的详细信息。
<div class="alert note">目前，一个集合最多支持一个索引。</div>

### 语法
```shell
describe index -c (text)
```

### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|集合的名称。|
|--help|n/a|显示用法信息。|

## exit
关闭命令行窗口。

### 语法
```shell
exit
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|--help|n/a|显示用法信息。|

## help
显示命令的用法信息。

### 语法
```shell
help <command>
```
### Commands
|Command|描述
|:---|:---|
|calc|计算两个向量数组之间的距离。|
|clear|清除屏幕。|
|connect|连接到Milvus。|
|create|创建集合、分区或索引。|
|delete|删除集合、分区、索引或实体。|
|describe|描述集合、分区或索引。|
|exit|关闭命令行窗口。|
|help|显示命令的用法信息。 |
|import|将数据导入分区。|
|list|列出集合、分区或索引。|
|load|加载集合或分区。|
|query|显示与您输入的所有条件匹配的查询结果。|
|release|释放集合或分区。|
|search|执行向量相似搜索或混合搜索。|
|show|显示当前集合、实体加载的进度或实体索引的进度。 |
|version|Milvus CLI的版本信息。|

## import
将数据导入分区。

### 语法
```shell
import -c (text)[-p (text)][-t (float)] <file_path>
```

### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|将数据插入到的集合的名称。|
|-p|--partition|（可选）将数据插入到的分区的名称。不传递这个参数表示选择“_default”分区。|
|-t|--timeout|（可选）允许的远程过程调用的最大持续时间(以秒为单位)。如果不传递此参数，客户端将一直等待直到服务器响应或发生错误。|
|--help|n/a|显示用法信息。|

### 示例
```shell
milvus_cli > import -c car '示例s/import_csv/vectors.csv'

Reading csv file...  [####################################]  100%

Column names are ['vector', 'color', 'brand']

Processed 50001 lines.

Import successfully.
```
## list collections
Lists all collections.

### 语法
```shell
list collections [-t (float)][-l (boolean)]
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-t|--timeout|（可选）允许的远程过程调用的最大持续时间(以秒为单位)。如果不传递此参数，客户端将一直等待直到服务器响应或发生错误。|
|-l|--show-loaded|（可选）仅显示已加载的集合。|
|--help|n/a|显示用法信息。|

## list indexes
列出集合的所有索引。
<div class="alert note"> 目前，一个集合最多支持一个索引。 </div>

### 语法
```shell
list indexes -c (text)
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|集合的名称。|
|--help|n/a|显示用法信息。|

## list partitions
列出集合的所有分区。
### 语法
```shell
list partitions -c (text)
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|集合的名称。|
|--help|n/a|显示用法信息。|

## load

将集合或分区从硬盘加载到内存中。
### 语法
```shell
load -c (text) [-p (text)]
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|分区所属的集合的名称。|
|-p|--partition|(可选/多个) 分区的名称。|
|--help|n/a|显示用法信息。|


## query
显示与您输入的所有条件匹配的查询结果。
### 语法
```shell
query
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|--help|n/a|显示用法信息。|

### 示例

根据提示输入需要的信息，执行查询。
```shell
milvus_cli > query

Collection name: car

The query expression(field_name in [x,y]): id in [ 427284660842954108, 427284660842954199 ]

Name of partitions that contain entities(split by "," if multiple) []: default

A list of fields to return(split by "," if multiple) []: color, brand
```
## release
从内存释放集合或分区。
### 语法
```shell
release -c (text) [-p (text)]
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|分区所属的集合的名称。|
|-p|--partition|(多选/多个)分区的名称。|
|--help|n/a|显示用法信息。|

## search
执行向量相似搜索或混合搜索。
### 语法
```shell
search
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|--help|n/a|显示用法信息。|

### 示例s
#### 示例 1

根据提示输入需要的信息，在CSV文件上执行搜索。
```shell
milvus_cli > search

Collection name (car, test_collection): car

The vectors of search data(the length of data is number of query (nq), the dim of every vector in data must be equal to vector field’s of collection. You can also import a csv file 
out headers): examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

Metric type: L2

Search parameter nprobe's value: 10

The max number of returned record, also known as topk: 2

The boolean expression used to filter attribute []: id > 0

The names of partitions to search (split by "," if multiple) ['_default'] []: _default
```
#### 示例 2

根据提示输入需要的信息，在被索引的集合上执行搜索。
```shell
milvus_cli > search

Collection name (car, test_collection): car

The vectors of search data(the length of data is number of query (nq), the dim of every vector in data must be equal to vector field’s of collection. You can also import a csv file without headers):
    [[0.71, 0.76, 0.17, 0.13, 0.42, 0.07, 0.15, 0.67, 0.58, 0.02, 0.39, 
    0.47, 0.58, 0.88, 0.73, 0.31, 0.23, 0.57, 0.33, 0.2, 0.03, 0.43, 
    0.78, 0.49, 0.17, 0.56, 0.76, 0.54, 0.45, 0.46, 0.05, 0.1, 0.43, 
    0.63, 0.29, 0.44, 0.65, 0.01, 0.35, 0.46, 0.66, 0.7, 0.88, 0.07, 
    0.49, 0.92, 0.57, 0.5, 0.16, 0.77, 0.98, 0.1, 0.44, 0.88, 0.82, 
    0.16, 0.67, 0.63, 0.57, 0.55, 0.95, 0.13, 0.64, 0.43, 0.71, 0.81, 
    0.43, 0.65, 0.76, 0.7, 0.05, 0.24, 0.03, 0.9, 0.46, 0.28, 0.92, 
    0.25, 0.97, 0.79, 0.73, 0.97, 0.49, 0.28, 0.64, 0.19, 0.23, 0.51, 
    0.09, 0.1, 0.53, 0.03, 0.23, 0.94, 0.87, 0.14, 0.42, 0.82, 0.91, 
    0.11, 0.91, 0.37, 0.26, 0.6, 0.89, 0.6, 0.32, 0.11, 0.98, 0.67, 
    0.12, 0.66, 0.47, 0.02, 0.15, 0.6, 0.64, 0.57, 0.14, 0.81, 0.75, 
    0.11, 0.49, 0.78, 0.16, 0.63, 0.57, 0.18]]

The vector field used to search of collection (vector): vector

Metric type: L2

Search parameter nprobe's value: 10

The specified number of decimal places of returned distance [-1]: 5

The max number of returned record, also known as topk: 2

The boolean expression used to filter attribute []: id > 0

The names of partitions to search (split by "," if multiple) ['_default'] []: _default

timeout []:
```
#### 示例 3

根据提示输入需要的信息，在未被索引的集合上执行搜索。

```shell
milvus_cli > search

Collection name (car, car2): car

The vectors of search data(the length of data is number of query (nq), the dim of every vector in data must be equal to vector field’s of collection. You can also import a csv file without headers): examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

The specified number of decimal places of returned distance [-1]: 5

The max number of returned record, also known as topk: 2

The boolean expression used to filter attribute []:

The names of partitions to search (split by "," if multiple) ['_default'] []:

Timeout []:
```
## show connection
显示当前连接。
### 语法
```shell
show connection [-a]
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-a|--all|（可选）显示所有连接的开关。|
|--help|n/a|显示用法信息。|

## show index_progress
显示为实体索引的进度。
### 语法
```shell
show index_progress -c (text) [-i (text)]
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|实体所属的集合的名称。|
|-i|--index|（可选）索引的名称。|
|--help|n/a|显示用法信息。|

## show loading_progress
显示实体加载的进度。
### 语法
```shell
show loading_progress -c (text) [-p (text)]
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|-c|--collection|实体所属的集合的名称。|
|-p|--partition|（可选/多个）加载分区的名称。|
|--help|n/a|显示用法信息。|

## version
显示Milvus CLI的版本信息。

### 语法
```shell
version
```
### 参数
|参数|全名|描述
|:---|:---|:---|
|--help|n/a|显示用法信息。|

<div class="alert note"> 
你可以直接在shell中检查Milvus CLI的版本，示例如下。在本例中，<code>milvus cli——version</code>作为命令。</div>

### 示例
```shell
$ milvus_cli --version
Milvus Cli v0.1.7
```

