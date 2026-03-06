---
id: cli_commands.md
summary: Interact with Milvus using commands.
title: Milvus_CLI Command Reference
---

# Milvus_CLI Command Reference

Milvus Command-Line Interface (CLI) is a command-line tool that supports database connection, data operations, and import and export of data.

This topic introduces all supported commands and the corresponding options. Some examples are also included for your reference.

## Command Groups

Milvus CLI commands are organized into the following groups:

- `create`: Create collection, database, partition, user, role, alias, index, privilege_group, or resource_group
- `delete`: Delete collection, database, partition, alias, user, role, index, entities, IDs, privilege_group, resource_group, connection_history, or collection_properties
- `list`: List collections, databases, partitions, users, roles, grants, indexes, aliases, connections, connection_history, privilege_groups, resource_groups, or bulk_insert_tasks
- `show`: Show collection, collection_stats, database, partition, partition_stats, index, index_progress, loading_progress, load_state, flush_state, compaction_state, compaction_plans, replicas, query_segment_info, role, user, alias, output, resource_group, or bulk_insert_state
- `grant`: Grant role, privilege, or privilege_group
- `revoke`: Revoke role, privilege, or privilege_group
- `load`: Load collection or partition
- `release`: Release collection or partition
- `use`: Use database
- `rename`: Rename collection
- `insert`: Insert entities (file or row)
- `upsert`: Upsert entities (file or row)
- `set`: Set output format
- `alter`: Alter database, collection_properties, or collection_field
- `update`: Update password or resource_group

## clear

Clears the screen.

<h3 id="clear">Syntax</h3>

```shell
clear
```

## connect

Connects to Milvus.

<h3 id="connect">Syntax</h3>

```shell
connect [-uri (text)] [-t (text)] [-tls (0|1|2)] [-cert (text)] [--save-as (text)]
```

<h3 id="connect">Options</h3>

| Option   | Full name | Description                                                                                                              |
| :------- | :-------- | :----------------------------------------------------------------------------------------------------------------------- |
| -uri     | --uri     | (Optional) The uri name. The default is "http://127.0.0.1:19530". Can also be set via `ZILLIZ_URI` environment variable. |
| -t       | --token   | (Optional) The zilliz cloud apikey or `username:password`. Can also be set via `ZILLIZ_TOKEN` environment variable.      |
| -tls     | --tlsmode | (Optional) Set TLS mode: 0 (No encryption), 1 (One-way encryption), 2 (Two-way encryption). Default is 0.               |
| -cert    | --cert    | (Optional) Path to the client certificate file. Works with one-way encryption.                                           |
| --save-as| n/a       | (Optional) Save connection with custom alias for later use.                                                              |
| --help   | n/a       | Displays help for using the command.                                                                                     |

<h3 id="connect">Examples</h3>

```shell
milvus_cli > connect -uri http://127.0.0.1:19530

milvus_cli > connect -uri http://192.168.1.100:19530 -t root:milvus

milvus_cli > connect -uri https://xxx.zillizcloud.com -t <api_key>
```

## disconnect

Disconnects from Milvus.

<h3 id="disconnect">Syntax</h3>

```shell
disconnect
```

## create database

Creates a database in Milvus.

<h3 id="create-database">Syntax</h3>

```shell
create database -db (text)
```

<h3 id="create-database">Options</h3>

| Option | Full name | Description                             |
| :----- | :-------- | :-------------------------------------- |
| -db    | --db_name | [Required] The database name in milvus. |
| --help | n/a       | Displays help for using the command.    |

<h3 id="create-database">Example</h3>

```shell
milvus_cli > create database -db testdb
```

## use database

Uses a database in Milvus.

<h3 id="use-database">Syntax</h3>

```shell
use database -db (text)
```

<h3 id="use-database">Options</h3>

| Option | Full name | Description                             |
| :----- | :-------- | :-------------------------------------- |
| -db    | --db_name | [Required] The database name in milvus. |
| --help | n/a       | Displays help for using the command.    |

<h3 id="use-database">Example</h3>

```shell
milvus_cli > use database -db testdb
```

## list databases

Lists all databases in Milvus.

<h3 id="list-database">Syntax</h3>

```shell
list databases
```

## show database

Shows details and properties of a database.

<h3 id="show-database">Syntax</h3>

```shell
show database [-db (text)]
```

<h3 id="show-database">Options</h3>

| Option | Full name | Description                                       |
| :----- | :-------- | :------------------------------------------------ |
| -db    | --db_name | (Optional) The database name. Defaults to current.|
| --help | n/a       | Displays help for using the command.               |

## alter database

Alters database properties.

<h3 id="alter-database">Syntax</h3>

```shell
alter database -db (text)
```

<h3 id="alter-database">Options</h3>

| Option | Full name | Description                             |
| :----- | :-------- | :-------------------------------------- |
| -db    | --db_name | [Required] The database name in milvus. |
| --help | n/a       | Displays help for using the command.    |

<h3 id="alter-database">Interactive Example</h3>

```shell
milvus_cli > alter database -db testdb

Property key: collection.ttl.seconds
Property value: 86400
```

## delete database

Deletes a database in Milvus.

<h3 id="delete-database">Syntax</h3>

```shell
delete database -db (text) [--yes]
```

<h3 id="delete-database">Options</h3>

| Option | Full name | Description                             |
| :----- | :-------- | :-------------------------------------- |
| -db    | --db_name | [Required] The database name in milvus. |
| --yes  | -y        | (Optional) Skip confirmation prompt.    |
| --help | n/a       | Displays help for using the command.    |

<h3 id="delete-database">Example</h3>

```shell
milvus_cli > delete database -db testdb

Warning! You are trying to delete the database. This action cannot be undone!
Do you want to continue? [y/N]: y
```

## create collection

Creates a collection.

<h3 id="create-collection">Syntax</h3>

```shell
create collection [--schema-file (text)]
```

<h3 id="create-collection">Options</h3>

| Option        | Full name     | Description                                     |
| :------------ | :------------ | :---------------------------------------------- |
| --schema-file | --schema-file | (Optional) Path to JSON file with schema definition. |
| --help        | n/a           | Displays help for using the command.             |

<h3 id="create-collection">Interactive Example</h3>

```shell
milvus_cli > create collection

Please input collection name: car
Please input auto id [False]: False
Please input description []: car collection
Is support dynamic field [False]: False
Please input consistency level(Strong(0),Bounded(1), Session(2), and Eventually(3)) [1]: 1
Please input shards number [1]: 1

Field name: id
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): INT64
Field description []: primary key
Is id the primary key? [y/N]: y

Field name: vector
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): FLOAT_VECTOR
Field description []: vector field
Dimension: 128

Field name:

Do you want to add embedding function? [y/N]: n
```

## list collections

Lists all collections in the current database.

<h3 id="list-collections">Syntax</h3>

```shell
list collections
```

## show collection

Shows the detailed information of a collection.

<h3 id="show-collection">Syntax</h3>

```shell
show collection -c (text)
```

<h3 id="show-collection">Options</h3>

| Option | Full name         | Description                          |
| :----- | :---------------- | :----------------------------------- |
| -c     | --collection-name | The name of the collection.          |
| --help | n/a               | Displays help for using the command. |

## show collection_stats

Shows collection statistics.

<h3 id="show-collection-stats">Syntax</h3>

```shell
show collection_stats -c (text)
```

<h3 id="show-collection-stats">Options</h3>

| Option | Full name         | Description                          |
| :----- | :---------------- | :----------------------------------- |
| -c     | --collection-name | [Required] The name of the collection.|
| --help | n/a               | Displays help for using the command. |

## rename collection

Renames a collection.

<h3 id="rename-collection">Syntax</h3>

```shell
rename collection -old (text) -new (text)
```

<h3 id="rename-collection">Options</h3>

| Option | Full name              | Description                          |
| :----- | :--------------------- | :----------------------------------- |
| -old   | --old-collection-name  | [Required] The old collection name.  |
| -new   | --new-collection-name  | [Required] The new collection name.  |
| --help | n/a                    | Displays help for using the command. |

## delete collection

Deletes a collection.

<h3 id="delete-collection">Syntax</h3>

```shell
delete collection -c (text) [--yes]
```

<h3 id="delete-collection">Options</h3>

| Option | Full name         | Description                               |
| :----- | :---------------- | :---------------------------------------- |
| -c     | --collection-name | [Required] The name of the collection.    |
| --yes  | -y                | (Optional) Skip confirmation prompt.      |
| --help | n/a               | Displays help for using the command.      |

<h3 id="delete-collection">Example</h3>

```shell
milvus_cli > delete collection -c car

Warning! You are trying to delete the collection. This action cannot be undone!
Do you want to continue? [y/N]: y
```

## load collection

Loads a collection into RAM.

<h3 id="load-collection">Syntax</h3>

```shell
load collection -c (text)
```

<h3 id="load-collection">Options</h3>

| Option | Full name         | Description                          |
| :----- | :---------------- | :----------------------------------- |
| -c     | --collection-name | The name of the collection.          |
| --help | n/a               | Displays help for using the command. |

## release collection

Releases a collection from RAM.

<h3 id="release-collection">Syntax</h3>

```shell
release collection -c (text)
```

<h3 id="release-collection">Options</h3>

| Option | Full name         | Description                          |
| :----- | :---------------- | :----------------------------------- |
| -c     | --collection-name | The name of the collection.          |
| --help | n/a               | Displays help for using the command. |

## truncate

Removes all data from a collection but keeps the schema.

<h3 id="truncate">Syntax</h3>

```shell
truncate -c (text) [--yes]
```

<h3 id="truncate">Options</h3>

| Option | Full name         | Description                            |
| :----- | :---------------- | :------------------------------------- |
| -c     | --collection-name | [Required] The name of the collection. |
| --yes  | -y                | (Optional) Skip confirmation prompt.   |
| --help | n/a               | Displays help for using the command.   |

<h3 id="truncate">Example</h3>

```shell
milvus_cli > truncate -c car

Warning!
You are trying to remove all data in the collection. This action cannot be undone!
Do you want to continue? [y/N]: y
```

## flush

Flushes collection data to storage.

<h3 id="flush">Syntax</h3>

```shell
flush -c (text) [-t (number)]
```

<h3 id="flush">Options</h3>

| Option | Full name         | Description                            |
| :----- | :---------------- | :------------------------------------- |
| -c     | --collection-name | [Required] The name of the collection. |
| -t     | --timeout         | (Optional) Timeout in seconds.         |
| --help | n/a               | Displays help for using the command.   |

## flush_all

Flushes all collections to storage.

<h3 id="flush-all">Syntax</h3>

```shell
flush_all [-t (number)]
```

<h3 id="flush-all">Options</h3>

| Option | Full name | Description                          |
| :----- | :-------- | :----------------------------------- |
| -t     | --timeout | (Optional) Timeout in seconds.       |
| --help | n/a       | Displays help for using the command. |

## show flush_state

Shows flush state for a collection.

<h3 id="show-flush-state">Syntax</h3>

```shell
show flush_state -c (text)
```

<h3 id="show-flush-state">Options</h3>

| Option | Full name         | Description                            |
| :----- | :---------------- | :------------------------------------- |
| -c     | --collection-name | [Required] The name of the collection. |
| --help | n/a               | Displays help for using the command.   |

## compact

Compacts a collection to merge small segments and remove deleted data.

<h3 id="compact">Syntax</h3>

```shell
compact -c (text) [-t (number)]
```

<h3 id="compact">Options</h3>

| Option | Full name         | Description                            |
| :----- | :---------------- | :------------------------------------- |
| -c     | --collection-name | [Required] The name of the collection. |
| -t     | --timeout         | (Optional) Timeout in seconds.         |
| --help | n/a               | Displays help for using the command.   |

## show compaction_state

Shows compaction state.

<h3 id="show-compaction-state">Syntax</h3>

```shell
show compaction_state -id (number)
```

<h3 id="show-compaction-state">Options</h3>

| Option | Full name       | Description                           |
| :----- | :-------------- | :------------------------------------ |
| -id    | --compaction-id | [Required] The compaction ID.         |
| --help | n/a             | Displays help for using the command.  |

## show compaction_plans

Shows compaction plans.

<h3 id="show-compaction-plans">Syntax</h3>

```shell
show compaction_plans -c (text) -id (number)
```

<h3 id="show-compaction-plans">Options</h3>

| Option | Full name         | Description                            |
| :----- | :---------------- | :------------------------------------- |
| -c     | --collection-name | [Required] The name of the collection. |
| -id    | --compaction-id   | [Required] The compaction ID.          |
| --help | n/a               | Displays help for using the command.   |

## show loading_progress

Displays the progress of loading a collection.

<h3 id="show-loading-progress">Syntax</h3>

```shell
show loading_progress -c (text)
```

<h3 id="show-loading-progress">Options</h3>

| Option | Full name         | Description                          |
| :----- | :---------------- | :----------------------------------- |
| -c     | --collection-name | The name of the collection.          |
| --help | n/a               | Displays help for using the command. |

## show load_state

Shows the load state of a collection or partition.

<h3 id="show-load-state">Syntax</h3>

```shell
show load_state -c (text) [-p (text)]
```

<h3 id="show-load-state">Options</h3>

| Option | Full name         | Description                            |
| :----- | :---------------- | :------------------------------------- |
| -c     | --collection-name | [Required] The name of the collection. |
| -p     | --partition       | (Optional) The name of the partition.  |
| --help | n/a               | Displays help for using the command.   |

## show replicas

Shows replicas information for a collection.

<h3 id="show-replicas">Syntax</h3>

```shell
show replicas -c (text)
```

<h3 id="show-replicas">Options</h3>

| Option | Full name         | Description                            |
| :----- | :---------------- | :------------------------------------- |
| -c     | --collection-name | [Required] The name of the collection. |
| --help | n/a               | Displays help for using the command.   |

## show query_segment_info

Shows query segment information for a collection.

<h3 id="show-query-segment-info">Syntax</h3>

```shell
show query_segment_info -c (text)
```

<h3 id="show-query-segment-info">Options</h3>

| Option | Full name         | Description                            |
| :----- | :---------------- | :------------------------------------- |
| -c     | --collection-name | [Required] The name of the collection. |
| --help | n/a               | Displays help for using the command.   |

## alter collection_properties

Alters collection properties like TTL, mmap, etc.

<h3 id="alter-collection-properties">Syntax</h3>

```shell
alter collection_properties -c (text)
```

<h3 id="alter-collection-properties">Options</h3>

| Option | Full name         | Description                            |
| :----- | :---------------- | :------------------------------------- |
| -c     | --collection-name | [Required] The name of the collection. |
| --help | n/a               | Displays help for using the command.   |

<h3 id="alter-collection-properties">Interactive Example</h3>

```shell
milvus_cli > alter collection_properties -c car

Property key: collection.ttl.seconds
Property value: 86400
```

## delete collection_properties

Drops collection properties by key.

<h3 id="delete-collection-properties">Syntax</h3>

```shell
delete collection_properties -c (text) -k (text)
```

<h3 id="delete-collection-properties">Options</h3>

| Option | Full name      | Description                            |
| :----- | :------------- | :------------------------------------- |
| -c     | --collection-name | [Required] The target collection.   |
| -k     | --property-key | [Required] The property key to delete. |
| --help | n/a            | Displays help for using the command.   |

## alter collection_field

Alters collection field properties.

<h3 id="alter-collection-field">Syntax</h3>

```shell
alter collection_field -c (text) -f (text)
```

<h3 id="alter-collection-field">Options</h3>

| Option | Full name         | Description                               |
| :----- | :---------------- | :---------------------------------------- |
| -c     | --collection-name | [Required] The name of the collection.    |
| -f     | --field-name      | [Required] The name of the field to alter.|
| --help | n/a               | Displays help for using the command.      |

<h3 id="alter-collection-field">Interactive Example</h3>

```shell
milvus_cli > alter collection_field -c car -f color

Property key: max_length
Property value: 256
```

## create partition

Creates a partition.

<h3 id="create-partition">Syntax</h3>

```shell
create partition -c (text) -p (text) [-d (text)]
```

<h3 id="create-partition">Options</h3>

| Option | Full name         | Description                                  |
| :----- | :---------------- | :------------------------------------------- |
| -c     | --collection-name | The name of the collection.                  |
| -p     | --partition       | The partition name.                          |
| -d     | --description     | (Optional) The description of the partition. |
| --help | n/a               | Displays help for using the command.         |

<h3 id="create-partition">Example</h3>

```shell
milvus_cli > create partition -c car -p new_partition -d test_add_partition
```

## list partitions

Lists all partitions of a collection.

<h3 id="list-partitions">Syntax</h3>

```shell
list partitions -c (text)
```

<h3 id="list-partitions">Options</h3>

| Option | Full name         | Description                          |
| :----- | :---------------- | :----------------------------------- |
| -c     | --collection-name | The name of the collection.          |
| --help | n/a               | Displays help for using the command. |

## show partition

Shows the detailed information of a partition.

<h3 id="show-partition">Syntax</h3>

```shell
show partition -c (text) -p (text)
```

<h3 id="show-partition">Options</h3>

| Option | Full name         | Description                                               |
| :----- | :---------------- | :-------------------------------------------------------- |
| -c     | --collection-name | The name of the collection that the partition belongs to. |
| -p     | --partition       | The name of the partition.                                |
| --help | n/a               | Displays help for using the command.                      |

## show partition_stats

Shows partition statistics.

<h3 id="show-partition-stats">Syntax</h3>

```shell
show partition_stats -c (text) -p (text)
```

<h3 id="show-partition-stats">Options</h3>

| Option | Full name         | Description                            |
| :----- | :---------------- | :------------------------------------- |
| -c     | --collection-name | [Required] The name of the collection. |
| -p     | --partition       | [Required] The name of the partition.  |
| --help | n/a               | Displays help for using the command.   |

## delete partition

Deletes a partition.

<h3 id="delete-partition">Syntax</h3>

```shell
delete partition -c (text) -p (text)
```

<h3 id="delete-partition">Options</h3>

| Option | Full name         | Description                                                             |
| :----- | :---------------- | :---------------------------------------------------------------------- |
| -c     | --collection-name | The name of the collection that the partition to be deleted belongs to. |
| -p     | --partition       | The name of the partition to be deleted.                                |
| --help | n/a               | Displays help for using the command.                                    |

## load partition

Loads a partition into RAM.

<h3 id="load-partition">Syntax</h3>

```shell
load partition -c (text) -p (text)
```

<h3 id="load-partition">Options</h3>

| Option | Full name         | Description                          |
| :----- | :---------------- | :----------------------------------- |
| -c     | --collection-name | The name of the collection.          |
| -p     | --partition       | The name of the partition.           |
| --help | n/a               | Displays help for using the command. |

## release partition

Releases a partition from RAM.

<h3 id="release-partition">Syntax</h3>

```shell
release partition -c (text) -p (text)
```

<h3 id="release-partition">Options</h3>

| Option | Full name         | Description                          |
| :----- | :---------------- | :----------------------------------- |
| -c     | --collection-name | The name of the collection.          |
| -p     | --partition       | The name of the partition.           |
| --help | n/a               | Displays help for using the command. |

## create index

Creates an index for a field.

<h3 id="create-index">Syntax</h3>

```shell
create index
```

<h3 id="create-index">Interactive Example</h3>

```shell
milvus_cli > create index

Collection name (car, car2): car
The name of the field to create an index for (vector): vector
Index name: vectorIndex
Index type (FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, HNSW, AUTOINDEX, DISKANN, GPU_IVF_FLAT, GPU_IVF_PQ, SPARSE_INVERTED_INDEX, SCANN, STL_SORT, Trie, INVERTED): IVF_FLAT
Vector Index metric type (L2, IP, HAMMING, TANIMOTO, COSINE): L2
Index params nlist: 2
Timeout []:
```

## list indexes

Lists all indexes for a collection.

<h3 id="list-indexes">Syntax</h3>

```shell
list indexes -c (text)
```

<h3 id="list-indexes">Options</h3>

| Option | Full name    | Description                          |
| :----- | :----------- | :----------------------------------- |
| -c     | --collection | The name of the collection.          |
| --help | n/a          | Displays help for using the command. |

## show index

Shows the detailed information of an index.

<h3 id="show-index">Syntax</h3>

```shell
show index -c (text) -in (text)
```

<h3 id="show-index">Options</h3>

| Option | Full name    | Description                          |
| :----- | :----------- | :----------------------------------- |
| -c     | --collection | The name of the collection.          |
| -in    | --index-name | The name of the index.               |
| --help | n/a          | Displays help for using the command. |

## show index_progress

Shows the progress of entity indexing.

<h3 id="show-index-progress">Syntax</h3>

```shell
show index_progress -c (text) [-in (text)]
```

<h3 id="show-index-progress">Options</h3>

| Option | Full name    | Description                          |
| :----- | :----------- | :----------------------------------- |
| -c     | --collection | The name of the collection.          |
| -in    | --index-name | (Optional) The name of the index.    |
| --help | n/a          | Displays help for using the command. |

## delete index

Deletes an index.

<h3 id="delete-index">Syntax</h3>

```shell
delete index -c (text) -in (text)
```

<h3 id="delete-index">Options</h3>

| Option | Full name    | Description                          |
| :----- | :----------- | :----------------------------------- |
| -c     | --collection | The name of the collection.          |
| -in    | --index-name | The name of the index.               |
| --help | n/a          | Displays help for using the command. |

## wait_for_index

Waits for index building to complete.

<h3 id="wait-for-index">Syntax</h3>

```shell
wait_for_index -c (text) [-in (text)] [-t (number)]
```

<h3 id="wait-for-index">Options</h3>

| Option | Full name    | Description                          |
| :----- | :----------- | :----------------------------------- |
| -c     | --collection | [Required] The name of the collection.|
| -in    | --index-name | (Optional) The name of the index.    |
| -t     | --timeout    | (Optional) Timeout in seconds.       |
| --help | n/a          | Displays help for using the command. |

## insert file

Imports data from a CSV file into a collection.

<h3 id="insert-file">Syntax</h3>

```shell
insert file -c (text) [-p (text)] [-t (number)] <file_path>
```

<h3 id="insert-file">Options</h3>

| Option | Full name         | Description                                                                     |
| :----- | :---------------- | :------------------------------------------------------------------------------ |
| -c     | --collection-name | The name of the collection that the data are inserted into.                     |
| -p     | --partition       | (Optional) The partition name. Default is "\_default".                          |
| -t     | --timeout         | (Optional) Timeout in seconds.                                                 |
| --help | n/a               | Displays help for using the command.                                            |

<h3 id="insert-file">Example</h3>

```shell
milvus_cli > insert file -c car 'examples/import_csv/vectors.csv'

Reading csv file...  [####################################]  100%

Column names are ['vector', 'color', 'brand']

Processed 50001 lines.

Inserting ...

Insert successfully.
--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
```

## insert row

Inserts a row of data into a collection.

<h3 id="insert-row">Syntax</h3>

```shell
insert row
```

<h3 id="insert-row">Interactive Example</h3>

```shell
milvus_cli > insert row

Collection name: car
Partition name [_default]: _default
Enter value for id (INT64): 1
Enter value for vector (FLOAT_VECTOR): [1.0, 2.0, 3.0]
Enter value for color (INT64): 100
Enter value for brand (VARCHAR): Toyota

Inserted successfully.
```

## upsert file

Upserts data from a CSV file into a collection.

<h3 id="upsert-file">Syntax</h3>

```shell
upsert file -c (text) [-p (text)] [-t (number)] <file_path>
```

<h3 id="upsert-file">Options</h3>

| Option | Full name         | Description                                                     |
| :----- | :---------------- | :-------------------------------------------------------------- |
| -c     | --collection-name | The name of the collection to upsert into.                      |
| -p     | --partition       | (Optional) The partition name. Default is "\_default".          |
| -t     | --timeout         | (Optional) Timeout in seconds.                                  |
| --help | n/a               | Displays help for using the command.                            |

## upsert row

Upserts a row of data into a collection.

<h3 id="upsert-row">Syntax</h3>

```shell
upsert row
```

<h3 id="upsert-row">Interactive Example</h3>

```shell
milvus_cli > upsert row

Collection name: car
Partition name [_default]: _default
Enter value for id (INT64): 1
Enter value for vector (FLOAT_VECTOR): [1.0, 2.0, 3.0]
Enter value for color (INT64): 200
Enter value for brand (VARCHAR): Honda

Upserted successfully.
```

## delete entities

Deletes entities using a filter expression.

<h3 id="delete-entities">Syntax</h3>

```shell
delete entities -c (text) [-p (text)]
```

<h3 id="delete-entities">Options</h3>

| Option | Full name         | Description                                                        |
| :----- | :---------------- | :----------------------------------------------------------------- |
| -c     | --collection-name | The name of the collection that entities to be deleted belongs to. |
| -p     | --partition       | (Optional) The name of the partition.                              |
| --help | n/a               | Displays help for using the command.                               |

<h3 id="delete-entities">Interactive Example</h3>

```shell
milvus_cli > delete entities -c car

The expression to specify entities to be deleted, such as "film_id in [ 0, 1 ]": film_id in [ 0, 1 ]

Warning! You are trying to delete the entities of collection. This action cannot be undone!
Do you want to continue? [y/N]: y
```

## delete ids

Deletes entities by IDs.

<h3 id="delete-ids">Syntax</h3>

```shell
delete ids -c (text) [-p (text)]
```

<h3 id="delete-ids">Options</h3>

| Option | Full name         | Description                          |
| :----- | :---------------- | :----------------------------------- |
| -c     | --collection-name | The name of the collection.          |
| -p     | --partition       | (Optional) The name of the partition.|
| --help | n/a               | Displays help for using the command. |

<h3 id="delete-ids">Interactive Example</h3>

```shell
milvus_cli > delete ids -c car

IDs to delete (comma-separated): 1, 2, 3
```

## get

Gets entities by IDs.

<h3 id="get">Syntax</h3>

```shell
get
```

<h3 id="get">Interactive Example</h3>

```shell
milvus_cli > get

Collection name: car
IDs (comma-separated): 1, 2, 3
Output fields (comma-separated, or * for all) []: color, brand
```

## query

Shows query results that match all the criteria you enter.

<h3 id="query">Syntax</h3>

```shell
query
```

<h3 id="query">Interactive Example</h3>

```shell
milvus_cli > query

Collection name: car

The query expression: id in [ 428960801420883491, 428960801420883492 ]

Name of partitions that contain entities(split by "," if multiple) []: default

A list of fields to return(split by "," if multiple) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. [0]:

Graceful time. Only used in bounded consistency level. [5]:
```

## search

Performs a vector similarity search.

<h3 id="search">Syntax</h3>

```shell
search
```

<h3 id="search">Interactive Example</h3>

```shell
milvus_cli > search

Collection name (car, test_collection): car

The vectors of search data: examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

Search parameter nprobe's value: 10

The max number of returned record, also known as topk: 2

The boolean expression used to filter attribute []: id > 0

The names of partitions to search (split by "," if multiple) ['_default'] []: _default

timeout []:

Guarantee Timestamp [0]:
```

## hybrid_search

Performs a hybrid search (multi-vector search) with reranking.

<h3 id="hybrid-search">Syntax</h3>

```shell
hybrid_search
```

<h3 id="hybrid-search">Interactive Example</h3>

```shell
milvus_cli > hybrid_search

Collection name: car

Enter search requests (one per line, empty line to finish):
  Vector field, search vector, metric type, top K, filter expression...

Rerank strategy (rrf, weighted, etc.): rrf

Output fields (comma-separated) []: color, brand
```

## query_iterator

Queries entities with iterator for large result sets.

<h3 id="query-iterator">Syntax</h3>

```shell
query_iterator
```

<h3 id="query-iterator">Interactive Example</h3>

```shell
milvus_cli > query_iterator

Collection name: car
Filter expression []: id > 0
Output fields (comma-separated, or * for all) []: color, brand
Batch size [1000]: 1000
Limit [10]: 100
```

## search_iterator

Searches with iterator for large result sets.

<h3 id="search-iterator">Syntax</h3>

```shell
search_iterator
```

<h3 id="search-iterator">Interactive Example</h3>

```shell
milvus_cli > search_iterator

Collection name: car
Vector field name: vector
Search vector (comma-separated floats): 1.0, 2.0, 3.0, ...
Batch size [1000]: 1000
Limit [10]: 100
Filter expression []:
Output fields (comma-separated) []: color, brand
```

## bulk_insert

Bulk inserts data from remote storage (S3, MinIO, etc.).

<h3 id="bulk-insert">Syntax</h3>

```shell
bulk_insert -c (text) [-p (text)] -f (text)
```

<h3 id="bulk-insert">Options</h3>

| Option | Full name         | Description                                    |
| :----- | :---------------- | :--------------------------------------------- |
| -c     | --collection-name | [Required] The name of the collection.         |
| -p     | --partition       | (Optional) The partition name.                 |
| -f     | --files           | [Required] File paths (comma separated).       |
| --help | n/a               | Displays help for using the command.           |

## show bulk_insert_state

Shows bulk insert task state.

<h3 id="show-bulk-insert-state">Syntax</h3>

```shell
show bulk_insert_state -id (number)
```

<h3 id="show-bulk-insert-state">Options</h3>

| Option | Full name | Description                          |
| :----- | :-------- | :----------------------------------- |
| -id    | --task-id | [Required] The bulk insert task ID.  |
| --help | n/a       | Displays help for using the command. |

## list bulk_insert_tasks

Lists bulk insert tasks.

<h3 id="list-bulk-insert-tasks">Syntax</h3>

```shell
list bulk_insert_tasks [-l (number)] [-c (text)]
```

<h3 id="list-bulk-insert-tasks">Options</h3>

| Option | Full name         | Description                                    |
| :----- | :---------------- | :--------------------------------------------- |
| -l     | --limit           | (Optional) Maximum number of tasks to return.  |
| -c     | --collection-name | (Optional) Filter by collection name.          |
| --help | n/a               | Displays help for using the command.           |

## create user

Creates a user in Milvus.

<h3 id="create-user">Syntax</h3>

```shell
create user -u (text) -p (text)
```

<h3 id="create-user">Options</h3>

| Option | Full name  | Description                          |
| :----- | :--------- | :----------------------------------- |
| -u     | --username | The username.                        |
| -p     | --password | The password.                        |
| --help | n/a        | Displays help for using the command. |

<h3 id="create-user">Example</h3>

```shell
milvus_cli > create user -u zilliz -p zilliz
```

## list users

Lists all users.

<h3 id="list-users">Syntax</h3>

```shell
list users
```

## show user

Shows user details and assigned roles.

<h3 id="show-user">Syntax</h3>

```shell
show user -u (text)
```

<h3 id="show-user">Options</h3>

| Option | Full name  | Description                          |
| :----- | :--------- | :----------------------------------- |
| -u     | --username | [Required] The username to describe. |
| --help | n/a        | Displays help for using the command. |

## delete user

Deletes a user.

<h3 id="delete-user">Syntax</h3>

```shell
delete user -u (text)
```

<h3 id="delete-user">Options</h3>

| Option | Full name  | Description                          |
| :----- | :--------- | :----------------------------------- |
| -u     | --username | The username.                        |
| --help | n/a        | Displays help for using the command. |

## update password

Updates a user's password.

<h3 id="update-password">Syntax</h3>

```shell
update password -u (text)
```

<h3 id="update-password">Options</h3>

| Option | Full name  | Description                               |
| :----- | :--------- | :---------------------------------------- |
| -u     | --username | [Required] The username to update.        |
| --help | n/a        | Displays help for using the command.      |

<h3 id="update-password">Interactive Example</h3>

```shell
milvus_cli > update password -u zilliz

Old password:
New password:
Confirm new password:
```

## create role

Creates a role in Milvus.

<h3 id="create-role">Syntax</h3>

```shell
create role -r (text)
```

<h3 id="create-role">Options</h3>

| Option | Full name  | Description                          |
| :----- | :--------- | :----------------------------------- |
| -r     | --roleName | The role name.                       |
| --help | n/a        | Displays help for using the command. |

## list roles

Lists all roles.

<h3 id="list-roles">Syntax</h3>

```shell
list roles
```

## show role

Shows role details and granted privileges.

<h3 id="show-role">Syntax</h3>

```shell
show role -r (text)
```

<h3 id="show-role">Options</h3>

| Option | Full name  | Description                          |
| :----- | :--------- | :----------------------------------- |
| -r     | --roleName | [Required] The role name.            |
| --help | n/a        | Displays help for using the command. |

## delete role

Deletes a role.

<h3 id="delete-role">Syntax</h3>

```shell
delete role -r (text)
```

<h3 id="delete-role">Options</h3>

| Option | Full name  | Description                          |
| :----- | :--------- | :----------------------------------- |
| -r     | --roleName | The role name.                       |
| --help | n/a        | Displays help for using the command. |

## grant role

Assigns a user to a role.

<h3 id="grant-role">Syntax</h3>

```shell
grant role -r (text) -u (text)
```

<h3 id="grant-role">Options</h3>

| Option | Full name  | Description                          |
| :----- | :--------- | :----------------------------------- |
| -r     | --roleName | The role name.                       |
| -u     | --username | The username.                        |
| --help | n/a        | Displays help for using the command. |

## revoke role

Removes a user from a role.

<h3 id="revoke-role">Syntax</h3>

```shell
revoke role -r (text) -u (text)
```

<h3 id="revoke-role">Options</h3>

| Option | Full name  | Description                          |
| :----- | :--------- | :----------------------------------- |
| -r     | --roleName | The role name.                       |
| -u     | --username | The username.                        |
| --help | n/a        | Displays help for using the command. |

## grant privilege

Grants a privilege to a role.

<h3 id="grant-privilege">Syntax</h3>

```shell
grant privilege
```

<h3 id="grant-privilege">Interactive Example</h3>

```shell
milvus_cli > grant privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
```

## revoke privilege

Revokes a privilege from a role.

<h3 id="revoke-privilege">Syntax</h3>

```shell
revoke privilege
```

<h3 id="revoke-privilege">Interactive Example</h3>

```shell
milvus_cli > revoke privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
```

## list grants

Lists grants for a role.

<h3 id="list-grants">Syntax</h3>

```shell
list grants -r (text) -o (text) -t (text)
```

<h3 id="list-grants">Options</h3>

| Option | Full name    | Description                          |
| :----- | :----------- | :----------------------------------- |
| -r     | --roleName   | The role name.                       |
| -o     | --objectName | The object name.                     |
| -t     | --objectType | Global, Collection, or User.         |
| --help | n/a          | Displays help for using the command. |

## create alias

Specifies an alias for a collection.

<div class="alert note">A collection can have multiple aliases. However, an alias corresponds to a maximum of one collection.</div>

<h3 id="create-alias">Syntax</h3>

```shell
create alias -c (text) -a (text) [-A]
```

<h3 id="create-alias">Options</h3>

| Option | Full name         | Description                                                      |
| :----- | :---------------- | :--------------------------------------------------------------- |
| -c     | --collection-name | The name of the collection.                                      |
| -a     | --alias-name      | The alias.                                                       |
| -A     | --alter           | (Optional) Flag to transfer the alias to a specified collection. |
| --help | n/a               | Displays help for using the command.                             |

<h3 id="create-alias">Example</h3>

```shell
milvus_cli > create alias -c car -a carAlias1
```

## list aliases

Lists aliases in the database.

<h3 id="list-aliases">Syntax</h3>

```shell
list aliases [-c (text)]
```

<h3 id="list-aliases">Options</h3>

| Option | Full name         | Description                                      |
| :----- | :---------------- | :----------------------------------------------- |
| -c     | --collection-name | (Optional) Filter aliases by collection.         |
| --help | n/a               | Displays help for using the command.             |

## show alias

Shows details of an alias.

<h3 id="show-alias">Syntax</h3>

```shell
show alias -a (text)
```

<h3 id="show-alias">Options</h3>

| Option | Full name    | Description                          |
| :----- | :----------- | :----------------------------------- |
| -a     | --alias-name | [Required] The alias name.           |
| --help | n/a          | Displays help for using the command. |

## delete alias

Deletes an alias.

<h3 id="delete-alias">Syntax</h3>

```shell
delete alias -a (text)
```

<h3 id="delete-alias">Options</h3>

| Option | Full name    | Description                          |
| :----- | :----------- | :----------------------------------- |
| -a     | --alias-name | The alias.                           |
| --help | n/a          | Displays help for using the command. |

## create privilege_group

Creates a new privilege group.

<h3 id="create-privilege-group">Syntax</h3>

```shell
create privilege_group -n (text)
```

<h3 id="create-privilege-group">Options</h3>

| Option | Full name | Description                            |
| :----- | :-------- | :------------------------------------- |
| -n     | --name    | [Required] The privilege group name.   |
| --help | n/a       | Displays help for using the command.   |

## list privilege_groups

Lists all privilege groups.

<h3 id="list-privilege-groups">Syntax</h3>

```shell
list privilege_groups
```

## grant privilege_group

Adds privileges to a privilege group.

<h3 id="grant-privilege-group">Syntax</h3>

```shell
grant privilege_group -n (text) -p (text)
```

<h3 id="grant-privilege-group">Options</h3>

| Option | Full name    | Description                                         |
| :----- | :----------- | :-------------------------------------------------- |
| -n     | --name       | [Required] The privilege group name.                |
| -p     | --privileges | [Required] Comma-separated list of privileges.      |
| --help | n/a          | Displays help for using the command.                |

<h3 id="grant-privilege-group">Example</h3>

```shell
milvus_cli > grant privilege_group -n my_group -p CreateCollection,DropCollection
```

## revoke privilege_group

Removes privileges from a privilege group.

<h3 id="revoke-privilege-group">Syntax</h3>

```shell
revoke privilege_group -n (text) -p (text)
```

<h3 id="revoke-privilege-group">Options</h3>

| Option | Full name    | Description                                         |
| :----- | :----------- | :-------------------------------------------------- |
| -n     | --name       | [Required] The privilege group name.                |
| -p     | --privileges | [Required] Comma-separated list of privileges.      |
| --help | n/a          | Displays help for using the command.                |

## delete privilege_group

Deletes a privilege group.

<h3 id="delete-privilege-group">Syntax</h3>

```shell
delete privilege_group -n (text) [--yes]
```

<h3 id="delete-privilege-group">Options</h3>

| Option | Full name | Description                            |
| :----- | :-------- | :------------------------------------- |
| -n     | --name    | [Required] The privilege group name.   |
| --yes  | -y        | (Optional) Skip confirmation prompt.   |
| --help | n/a       | Displays help for using the command.   |

## create resource_group

Creates a new resource group.

<h3 id="create-resource-group">Syntax</h3>

```shell
create resource_group -n (text)
```

<h3 id="create-resource-group">Options</h3>

| Option | Full name | Description                          |
| :----- | :-------- | :----------------------------------- |
| -n     | --name    | [Required] The resource group name.  |
| --help | n/a       | Displays help for using the command. |

<h3 id="create-resource-group">Interactive Example</h3>

```shell
milvus_cli > create resource_group -n my_rg

Configure node limits? [y/N]: y
requests.node_num [0]: 1
limits.node_num [0]: 3
```

## list resource_groups

Lists all resource groups.

<h3 id="list-resource-groups">Syntax</h3>

```shell
list resource_groups
```

## show resource_group

Shows resource group details.

<h3 id="show-resource-group">Syntax</h3>

```shell
show resource_group -n (text)
```

<h3 id="show-resource-group">Options</h3>

| Option | Full name | Description                          |
| :----- | :-------- | :----------------------------------- |
| -n     | --name    | [Required] The resource group name.  |
| --help | n/a       | Displays help for using the command. |

## update resource_group

Updates resource group configuration.

<h3 id="update-resource-group">Syntax</h3>

```shell
update resource_group -n (text)
```

<h3 id="update-resource-group">Options</h3>

| Option | Full name | Description                          |
| :----- | :-------- | :----------------------------------- |
| -n     | --name    | [Required] The resource group name.  |
| --help | n/a       | Displays help for using the command. |

<h3 id="update-resource-group">Interactive Example</h3>

```shell
milvus_cli > update resource_group -n my_rg

requests.node_num [current]: 2
limits.node_num [current]: 5
```

## delete resource_group

Deletes a resource group.

<h3 id="delete-resource-group">Syntax</h3>

```shell
delete resource_group -n (text)
```

<h3 id="delete-resource-group">Options</h3>

| Option | Full name | Description                          |
| :----- | :-------- | :----------------------------------- |
| -n     | --name    | [Required] The resource group name.  |
| --help | n/a       | Displays help for using the command. |

## transfer replica

Transfers replicas between resource groups.

<h3 id="transfer-replica">Syntax</h3>

```shell
transfer replica
```

<h3 id="transfer-replica">Interactive Example</h3>

```shell
milvus_cli > transfer replica

Source resource group: __default_resource_group
Target resource group: my_rg
Collection name: car
Number of replicas to transfer: 1
```

## list connections

Lists all Milvus connections.

<h3 id="list-connections">Syntax</h3>

```shell
list connections
```

## list connection_history

Lists saved connection history.

<h3 id="list-connection-history">Syntax</h3>

```shell
list connection_history
```

## delete connection_history

Deletes a saved connection from history.

<h3 id="delete-connection-history">Syntax</h3>

```shell
delete connection_history -uri (text)
```

<h3 id="delete-connection-history">Options</h3>

| Option | Full name | Description                                  |
| :----- | :-------- | :------------------------------------------- |
| -uri   | --uri     | [Required] URI of the connection to delete.  |
| --help | n/a       | Displays help for using the command.         |

## show output

Shows the current output format setting.

<h3 id="show-output">Syntax</h3>

```shell
show output
```

## set output

Sets the global output format for CLI results.

<h3 id="set-output">Syntax</h3>

```shell
set output (table|json|csv)
```

<h3 id="set-output">Example</h3>

```shell
milvus_cli > set output json
```

## history

Shows or clears command history.

<h3 id="history">Syntax</h3>

```shell
history [clear]
```

<h3 id="history">Examples</h3>

```shell
milvus_cli > history

milvus_cli > history clear
```

## version

Shows the version of Milvus_CLI.

<h3 id="version">Syntax</h3>

```shell
version
```

<div class="alert note"> You can also check the version of Milvus_CLI in a shell as shown in the following example. In this case, <code>milvus_cli --version</code> acts as a command.</div>

<h3 id="version">Example</h3>

```shell
$ milvus_cli --version
Milvus_CLI v1.2.1
```

## exit

Closes the command line window.

<h3 id="exit">Syntax</h3>

```shell
exit
```

## help

Displays help for using a command.

<h3 id="help">Syntax</h3>

```shell
help <command>
```

<h3 id="help">Commands</h3>

| Command  | Description                                                                 |
| :------- | :-------------------------------------------------------------------------- |
| alter    | Alter database, collection properties, or collection field.                 |
| clear    | Clears the screen.                                                          |
| compact  | Compact a collection.                                                       |
| connect  | Connects to Milvus.                                                         |
| create   | Create collection, database, partition, user, role, alias, index, and more. |
| delete   | Delete collection, database, partition, alias, user, role, index, and more. |
| exit     | Closes the command line window.                                             |
| flush    | Flush collection data to storage.                                           |
| get      | Get entities by IDs.                                                        |
| grant    | Grant role, privilege, or privilege_group.                                   |
| help     | Displays help for using a command.                                          |
| history  | Show or clear command history.                                              |
| insert   | Import data into a collection.                                              |
| list     | List collections, databases, partitions, users, roles, and more.            |
| load     | Load a collection or partition.                                             |
| query    | Query entities with filter expressions.                                     |
| release  | Release a collection or partition.                                          |
| rename   | Rename collection.                                                          |
| revoke   | Revoke role, privilege, or privilege_group.                                  |
| search   | Perform vector similarity search.                                           |
| set      | Set output format.                                                          |
| show     | Show collection, database, partition, index details, and more.              |
| transfer | Transfer replicas between resource groups.                                  |
| truncate | Remove all data from a collection.                                          |
| update   | Update password or resource group.                                          |
| upsert   | Upsert data into a collection.                                              |
| use      | Use database.                                                               |
| version  | Shows the version of Milvus_CLI.                                            |
