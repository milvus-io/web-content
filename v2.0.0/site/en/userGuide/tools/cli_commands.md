---
id: cli_commands.md
summary: Interact with Milvus using commands.
---
# Milvus CLI Command Reference

Milvus Command-Line Interface (CLI) is a command-line tool that supports database connection, data operations, and import and export of data. 

This topic introduces all supported commands and the corresponding options. Some examples are also included for your reference.

## calc
Calculates the distance between two vector arrays.
### Syntax
```shell
calc
```
### Options
|Option|Full name|Description|
|:---|:---|:---|
|--help|n/a|Displays help for using the command.|

### Example
To calculate the distance between two vector arrays and be prompted for the required input:
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

Timeout(optional) []:

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
Clears the screen.
### Syntax
```shell
clear
```
### Options
|Option|Full name|Description|
|:---|:---|:---|
|--help|n/a|Displays help for using the command.|

## connect 
Connects to Milvus.
### Syntax
```shell
connect [-h (text)] [-p (int)] [-a (text)]
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-h|--host|(Optional) The host name. The default is "127.0.0.1".
|-p|--port|(Optional) The port number. The default is "19530".|
|-a|--alias|(Optional) The alias name of the Milvus link. The default is "default".|
|--help|n/a|Displays help for using the command.|

### Example
```shell
milvus_cli > connect -h 127.0.0.1 -p 19530 -a default
```

## create collection
Creates a collection.
### Syntax
```shell
create collection -c (text) -f (text) -p (text) [-a] [-d (text)]
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection-name|The collection name.|
|-f|--schema-field|(Multiple) The field schema in the    ```<fieldName>:<dataType>:<dimOfVector/desc>``` format.|
|-p|--schema-primary-field|The name of the primary key field.|
|-a|--schema-auto-id|(Optional) Flag to generate IDs automatically.|
|-d|--schema-description|(Optional) The description of the collection.|
|--help|n/a|Displays help for using the command.


### Example
```shell
milvus_cli > create collection -c car -f id:INT64:primary_field -f vector:FLOAT_VECTOR:128 -f color:INT64:color -f brand:INT64:brand -p id -a -d 'car_collection'
```

## create partition
Creates a partition.
### Syntax
```shell
create partition -c (text) -p (text) [-d (text)]
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The collection name.|
|-p|--partition|The partition name.|
|-d|--description|(Optional) The description of the partition.|
|--help|n/a|Displays help for using the command.|


### Example
```shell
milvus_cli > create partition -c car -p new_partition -d test_add_partition
```

## create index
Creates an index for a field.

<div class="alert note"> Currently, a collection supports a maximum of one index.</div>

### Syntax
```shell
create index
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|--help|n/a|Displays help for using the command.|

### Example
To create an index for a field and be prompted for the required input:
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
Deletes a collection.
### Syntax
```shell
delete collection -c (text) [-t (float)]
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The name of the collection to be deleted.|
|-t|--timeout|(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.|
|--help|n/a|Displays help for using the command.|

### Example
```shell
milvus_cli > delete collection -c car
```

## delete partition
Deletes a partition.

### Syntax
```shell
delete partition -c (text) -p (text) [-t (float)]
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The name of the collection that the partition to be deleted belongs to.|
|-t|--timeout|(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.|
|-p|--partition|The name of the partition to be deleted.|
|--help|n/a|Displays help for using the command.|

### Example
```shell
milvus_cli > delete partition -c car -p new_partition
```

## delete index
Deletes an index and the corresponding index files.

<div class="alert note"> Currently, a collection supports a maximum of one index.</div>

### Syntax
```shell
delete index -c (text) [-t (float)]
```

### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The collection name.|
|-t|--timeout|(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.|
|--help|n/a|Displays help for using the command.|

### Example
```shell
milvus_cli > delete index -c car
```
## delete entities (available in Milvus 2.0.0-GA)
Deletes entities.

### Syntax
``` shell
delete entities -c (text) [-p (text)] [-t (float)]
```

### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The collection name.|
|-p|--partition|(Optional) The name of the partition that the entities belong to.|
|-t|--timeout|(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.|
|--help|n/a|Displays help for using the command.|

### Example

```shell
milvus_cli > delete entities -c car

The expression to specify entities to be deleted, such as "film_id in [0, 1 ]": film_id in [ 0, 1 ]

You are trying to delete the entities of collection. This action cannot be undone!

Do you want to continue? [y/N]: y
```

## describe collection
Shows the detailed information of a collection.

### Syntax
```shell
describe collection -c (text)
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The name of the collection.|
|--help|n/a|Displays help for using the command.|

### Example
```shell
milvus_cli > describe collection -c test_collection_insert
```
## describe  partition
Shows the detailed information of a partition.

### Syntax
```shell
describe partition -c (text) -p (text)
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The name of the collection that the partition belongs to.|
|-p|--partition|The name of the partition.|
|--help|n/a|Displays help for using the command.|

### Example
```shell
milvus_cli > describe partition -c test_collection_insert -p _default
```
## describe index
Shows the detailed information of an index.
<div class="alert note">Currently, a collection supports a maximum of one index.</div>

### Syntax
```shell
describe index -c (text)
```

### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The name of the collection.|
|--help|n/a|Displays help for using the command.|

## exit
Closes the command line window.

### Syntax
```shell
exit
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|--help|n/a|Displays help for using the command.|

## help
Displays help for using a command.

### Syntax
```shell
help <command>
```
### Commands
|Command|Description
|:---|:---|
|calc|Calculates the distance between two vector arrays.|
|clear|Clears the screen.|
|connect|Connects to Milvus.|
|create|Creates a collection, partition, or index.|
|delete|Deletes a collection, partition, index, or entity.|
|describe|Describes a collection, partition, or index.|
|exit|Closes the command line window.|
|help|Displays help for using a command. |
|import|Imports data into a partition.|
|list|Lists collections, partitions, or indexes.|
|load|Loads a collection or partition.|
|query|Shows query results that match all the criteria that you enter.|
|release|Releases a collection or partition.|
|search|Performs a vector similarity search or hybrid search.|
|show|Shows the current collection, progress of entity loading, or progress of entity indexing. |
|version|Shows the version of Milvus CLI.|

## import
Imports data into a partition.

### Syntax
```shell
import -c (text)[-p (text)][-t (float)] <file_path>
```

### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The name of the collection that the data is inserted into.|
|-p|--partition|(Optional) The name of the partition that the data is inserted into. Not passing this partition option indicates choosing the "_default" partition.|
|-t|--timeout|(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.|
|--help|n/a|Displays help for using the command.|

### Example
```shell
milvus_cli > import -c car 'examples/import_csv/vectors.csv'

Reading csv file...  [####################################]  100%

Column names are ['vector', 'color', 'brand']

Processed 50001 lines.

Import successfully.
```
## list collections
Lists all collections.

### Syntax
```shell
list collections [-t (float)][-l (boolean)]
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-t|--timeout|(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.|
|-l|--show-loaded|(Optional) Shows the loaded collections only.|
|--help|n/a|Displays help for using the command.|

## list indexes
Lists all indexes for a collection.
<div class="alert note"> Currently, a collection supports a maximum of one index. </div>

### Syntax
```shell
list indexes -c (text)
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The name of the collection.|
|--help|n/a|Displays help for using the command.|

## list partitions
Lists all partitions of a collection.
### Syntax
```shell
list partitions -c (text)
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The name of the collection.|
|--help|n/a|Displays help for using the command.|

## load
Loads a collection or partition from hard drive space into RAM.
### Syntax
```shell
load -c (text) [-p (text)]
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The name of the collection that the partition belongs to.|
|-p|--partition|(Optional/Multiple) The name of the partition.|
|--help|n/a|Displays help for using the command.|


## query

Shows query results that match all the criteria that you enter.
### Syntax
```shell
query
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|--help|n/a|Displays help for using the command.|

### Example
To perform a query and be prompted for the required input:
```shell
milvus_cli > query

Collection name: car

The query expression(field_name in [x,y]): id in [ 427284660842954108, 427284660842954199 ]

Name of partitions that contain entities(split by "," if multiple) []: default

A list of fields to return(split by "," if multiple) []: color, brand
```
## release
Releases a collection or partition from RAM.
### Syntax
```shell
release -c (text) [-p (text)]
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The name of the collection that the partition belongs to.|
|-p|--partition|(Optional/Multiple) The name of the partition.|
|--help|n/a|Displays help for using the command.|

## search
Performs a vector similarity search or hybrid search.
### Syntax
```shell
search
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|--help|n/a|Displays help for using the command.|

### Examples
#### Example 1
To perform a search on a csv file and be prompted for the required input:
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
#### Example 2
To perform a search on an indexed collection and be prompted for the required input:
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
#### Example 3
To perform a search on a non-indexed collection and be prompted for the required input:
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
Shows the current connection.
### Syntax
```shell
show connection [-a]
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-a|--all|（Optional) Flag to show all connections.|
|--help|n/a|Displays help for using the command.|

## show index_progress
Shows the progress of entity indexing.
### Syntax
```shell
show index_progress -c (text) [-i (text)]
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The name of the collection that the entities belong to.|
|-i|--index|(Optional) The name of the index.|
|--help|n/a|Displays help for using the command.|

## show loading_progress
Shows the progress of entity loading.
### Syntax
```shell
show loading_progress -c (text) [-p (text)]
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection|The name of the collection that the entities belong to.|
|-p|--partition|(Optional/Multiple) The name of the loading partition.|
|--help|n/a|Displays help for using the command.|

## version
Shows the version of Milvus CLI.

### Syntax
```shell
version
```
### Options
|Option|Full name|Description
|:---|:---|:---|
|--help|n/a|Displays help for using the command.|

<div class="alert note"> You can also check the version of Milvus CLI in a shell as shown in the following example. In this case, <code>milvus_cli --version</code> acts as a command.</div>

### Example
```shell
$ milvus_cli --version
Milvus Cli v0.1.7
```

