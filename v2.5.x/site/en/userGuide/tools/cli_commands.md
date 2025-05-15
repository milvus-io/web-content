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

- `create`: Create collection, database, partition, user, role, or index
- `delete`: Delete collection, database, partition, alias, user, role, or index
- `list`: List collections, databases, partitions, users, roles, grants, or indexes
- `show`: Show connection, database, collection, loading_progress, or index_progress
- `grant`: Grant role or privilege
- `revoke`: Revoke role or privilege
- `load`: Load collection or partition
- `release`: Release collection or partition
- `use`: Use database
- `rename`: Rename collection
- `insert`: Insert entities (file or row)

## clear

Clears the screen.

<h3 id="clear">Syntax</h3>

```shell
clear
```

<h3 id="clear">Options</h3>

| Option | Full name | Description                          |
| :----- | :-------- | :----------------------------------- |
| --help | n/a       | Displays help for using the command. |

## connect

Connects to Milvus.

<h3 id="connect">Syntax</h3>

```shell
connect [-uri (text)] [-t (text)]
connect [-uri (text)] [-t (text)] [-tls (0|1)] [-cert (text)]
```

<h3 id="connect">Options</h3>

| Option | Full name | Description                                                                                                              |
| :----- | :-------- | :----------------------------------------------------------------------------------------------------------------------- |
| -uri   | --uri     | (Optional) The uri name. The default is "http://127.0.0.1:19530".                                                        |
| -t     | --token   | (Optional) The zilliz cloud apikey or `username:password`. The default is None.                                          |
| -tls   | --tlsmode | (Optional) Set TLS mode: 0 (No encryption), 1 (One-way encryption), 2 (Two-way encryption not support yet). Default is 0 |
| -cert  | --cert    | (Optional) Path to the client certificate file. Work with One-way encryption                                             |
| --help | n/a       | Displays help for using the command.                                                                                     |

<h3 id="connect">Example</h3>

```shell
milvus_cli > connect -uri http://127.0.0.1:19530
```

## create Database

Create Database in Milvus

<h3 id="create-database">Syntax</h3>

```shell
create database -db (text)
```

### Options

| Option | Full name | Description                             |
| :----- | :-------- | :-------------------------------------- |
| -db    | --db_name | [Required] The database name in milvus. |
| --help | n/a       | Displays help for using the command.    |

### Examples

#### Example 1

The following example create the database <code>testdb</code> in milvus.

```shell
milvus_cli > create database -db testdb
```

## use Database

Use Database in Milvus

<h3 id="use-database">Syntax</h3>

```shell
use database -db (text)
```

### Options

| Option | Full name | Description                             |
| :----- | :-------- | :-------------------------------------- |
| -db    | --db_name | [Required] The database name in milvus. |
| --help | n/a       | Displays help for using the command.    |

### Examples

#### Example 1

The following example use the database <code>testdb</code> in milvus.

```shell
milvus_cli > use database -db testdb
```

## list Databases

List Databases in Milvus

<h3 id="list-database">Syntax</h3>

```shell
list databases
```

### Examples

#### Example 1

The following example list the databases in milvus.

```shell
milvus_cli > list databases
```

## delete Database

Delete Database in Milvus

<h3 id="delete-database">Syntax</h3>

```shell
delete database -db (text)
```

### Options

| Option | Full name | Description                             |
| :----- | :-------- | :-------------------------------------- |
| -db    | --db_name | [Required] The database name in milvus. |
| --help | n/a       | Displays help for using the command.    |

### Examples

#### Example 1

The following example delete the database <code>testdb</code> in milvus.

```shell
milvus_cli > delete database -db testdb

Warning! You are trying to delete the database. This action cannot be undone!
Do you want to continue? [y/N]: y
```

## create user

Create user in Milvus

<h3 id="create-user">Syntax</h3>

```shell
create user -u (text) -p (text)
```

### Options

| Option | Full name  | Description                                         |
| :----- | :--------- | :-------------------------------------------------- |
| -p     | --password | The user password in milvus. The default is "None". |
| -u     | --username | The username in milvus. The default is "None".      |
| --help | n/a        | Displays help for using the command.                |

### Examples

#### Example 1

The following example create the user <code>zilliz</code> and password <code>zilliz</code> in milvus.

```shell
milvus_cli > create user -u zilliz -p zilliz
```

## create role

Create role in Milvus

<h3 id="create-role">Syntax</h3>

```shell
create role -r (text)
```

### Options

| Option | Full name  | Description                          |
| :----- | :--------- | :----------------------------------- |
| -r     | --roleName | The role name of milvus role.        |
| --help | n/a        | Displays help for using the command. |

### Examples

#### Example 1

The following example create the role <code>role1</code> in milvus.

```shell
milvus_cli > create role -r role1
```

## create alias

Specifies unique aliases for a collection.

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

<h3 id="create-alias">Examples</h3>

<h4>Example 1</h4>

The following example creates the <code>carAlias1</code> and <code>carAlias2</code> aliases for the <code>car</code> collection.

```shell
milvus_cli > create alias -c car -a carAlias1
```

<h4>Example 2</h4>

<div class="alert note">Example 2 is based on Example 1.</div>

The following example transfers the <code>carAlias1</code> alias from the <code>car</code> collection to the <code>car2</code> collection.

```shell
milvus_cli > create alias -c car2 -A -a carAlias1
```

## create collection

Creates a collection.

<h3 id="create-collection">Syntax</h3>

```shell
create collection
```

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

Field name: color
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): INT64
Field description []: color field
Nullable [False]: False
Default value (type: INT64) [Not set]: 0

Do you want to add embedding function? [y/N]: n
```

## create partition

Creates a partition.

<h3 id="creat-partition">Syntax</h3>

```shell
create partition -c (text) -p (text) [-d (text)]
```

<h3 id="creat-partition">Options</h3>

| Option | Full name         | Description                                  |
| :----- | :---------------- | :------------------------------------------- |
| -c     | --collection-name | The name of the collection.                  |
| -p     | --partition       | The partition name.                          |
| -d     | --description     | (Optional) The description of the partition. |
| --help | n/a               | Displays help for using the command.         |

<h3 id="creat-partition">Example</h3>

```shell
milvus_cli > create partition -c car -p new_partition -d test_add_partition
```

## create index

Creates an index for a field.

<div class="alert note"> Currently, a collection supports a maximum of one index.</div>

<h3 id="creat-index">Syntax</h3>

```shell
create index
```

<h3 id="creat-index">Interactive Example</h3>

```shell
milvus_cli > create index

Collection name (car, car2): car2
The name of the field to create an index for (vector): vector
Index name: vectorIndex
Index type (FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY, AUTOINDEX, DISKANN, GPU_IVF_FLAT, GPU_IVF_PQ, SPARSE_INVERTED_INDEX, SCANN, STL_SORT, Trie, INVERTED): IVF_FLAT
Vector Index metric type (L2, IP, HAMMING, TANIMOTO, COSINE): L2
Index params nlist: 2
Timeout []:
```

## delete user

Deletes a user

### Syntax

```shell
delete user -u (text)
```

### Options

| Option | Full name  | Description                          |
| :----- | :--------- | :----------------------------------- |
| -u     | --username | The username.                        |
| --help | n/a        | Displays help for using the command. |

### Example

```shell
milvus_cli > delete user -u zilliz

Warning! You are trying to delete the user in milvus. This action cannot be undone!
Do you want to continue? [y/N]: y
```

## delete role

Delete role in Milvus

<h3 id="delete-role">Syntax</h3>

```shell
delete role -r (text)
```

### Options

| Option | Full name  | Description                          |
| :----- | :--------- | :----------------------------------- |
| -r     | --roleName | The role name of milvus role.        |
| --help | n/a        | Displays help for using the command. |

### Examples

The following example delete the role <code>role1</code> in milvus.

```shell
milvus_cli > delete role -r role1
```

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

## delete collection

Deletes a collection.

<h3 id="delete-collection">Syntax</h3>

```shell
delete collection -c (text)
```

<h3 id="delete-collection">Options</h3>

| Option | Full name         | Description                               |
| :----- | :---------------- | :---------------------------------------- |
| -c     | --collection-name | The name of the collection to be deleted. |
| --help | n/a               | Displays help for using the command.      |

<h3 id="delete-collection">Example</h3>

```shell
milvus_cli > delete collection -c car

Warning! You are trying to delete the collection. This action cannot be undone!
Do you want to continue? [y/N]: y
```

## delete entities

Deletes entities.

<h3 id="delete-entities">Syntax</h3>

```
delete entities -c (text) -p (text)
```

<h3 id="delete-entities">Options</h3>

| Option | Full name         | Description                                                        |
| :----- | :---------------- | :----------------------------------------------------------------- |
| -c     | --collection-name | The name of the collection that entities to be deleted belongs to. |
| -p     | --partition       | (Optional) The name of the partition to be deleted.                |
| --help | n/a               | Displays help for using the command.                               |

<h3 id="delete-entities">Example</h3>

```
milvus_cli > delete entities -c car

The expression to specify entities to be deleted, such as "film_id in [ 0, 1 ]": film_id in [ 0, 1 ]

Warning! You are trying to delete the entities of collection. This action cannot be undone!
Do you want to continue? [y/N]: y
```

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

<h3 id="delete-partition">Example</h3>

```shell
milvus_cli > delete partition -c car -p new_partition
```

## delete index

Deletes an index and the corresponding index files.

<div class="alert note"> Currently, a collection supports a maximum of one index.</div>

<h3 id="delete-index">Syntax</h3>

```shell
delete index -c (text) -in (text)
```

<h3 >Options</h3>

| Option | Full name         | Description                          |
| :----- | :---------------- | :----------------------------------- |
| -c     | --collection-name | The name of the collection.          |
| -in    | --index-name      | The name of the index name.          |
| --help | n/a               | Displays help for using the command. |

<h3 >Example</h3>

```shell
milvus_cli > delete index -c car -in indexName

Warning! You are trying to delete the index of collection. This action cannot be undone!
Do you want to continue? [y/N]: y
```

## grant role

Grant role to user

<h3 id="grant-user">Syntax</h3>

```shell
grant role -r (text) -u (text)
```

<h3 >Options</h3>

| Option | Full name  | Description                          |
| :----- | :--------- | :----------------------------------- |
| -r     | --roleName | The role name of milvus role.        |
| -u     | --username | The username of milvus user.         |
| --help | n/a        | Displays help for using the command. |

<h3 >Example</h3>

```shell
milvus_cli > grant role -r role1 -u user1
```

## grant privilege

Assigns a privilege to a role.

<h3 id="assign-privilege">Syntax</h3>

```shell
grant privilege
```

<h3 id="assign-privilege">Interactive Example</h3>

```shell
milvus_cli > grant privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
```

## revoke role

Revokes the role assigned to a user.

<h3 id="grant-user">Syntax</h3>

```shell
revoke role -r (text) -u (text)
```

<h3 >Options</h3>

| Option | Full name  | Description                          |
| :----- | :--------- | :----------------------------------- |
| -r     | --roleName | The role name of milvus role.        |
| -u     | --username | The username of milvus user.         |
| --help | n/a        | Displays help for using the command. |

<h3 >Example</h3>

```shell
milvus_cli > revoke role -r role1 -u user1
```

## revoke privilege

Revokes a privilege already assigned to a role.

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

## show collection

Shows the detailed information of a collection.

<h3 id="show-collection">Syntax</h3>

```shell
show collection -c (text)
```

<h3>Options</h3>

| Option | Full name         | Description                          |
| :----- | :---------------- | :----------------------------------- |
| -c     | --collection-name | The name of the collection.          |
| --help | n/a               | Displays help for using the command. |

<h3>Example</h3>

```shell
milvus_cli > show collection -c test_collection_insert
```

## show partition

Shows the detailed information of a partition.

<h3 id="show-partition">Syntax</h3>

```shell
show partition -c (text) -p (text)
```

<h3>Options</h3>

| Option | Full name         | Description                                               |
| :----- | :---------------- | :-------------------------------------------------------- |
| -c     | --collection-name | The name of the collection that the partition belongs to. |
| -p     | --partition       | The name of the partition.                                |
| --help | n/a               | Displays help for using the command.                      |

<h3>Example</h3>

```shell
milvus_cli > show partition -c test_collection_insert -p _default
```

## show index

Shows the detailed information of an index.

<h3 id="show-index">Syntax</h3>

```shell
show index -c (text) -in (text)
```

<h3 >Options</h3>

| Option | Full name         | Description                 |
| :----- | :---------------- | :-------------------------- |
| -c     | --collection-name | The name of the collection. |
| -in    | --index-name      | The name of the index.      |

| --help | n/a | Displays help for using the command. |

<h3 >Example</h3>

```shell
milvus_cli > show index -c test_collection -in index_name
```

## exit

Closes the command line window.

<h3 id="exit">Syntax</h3>

```shell
exit
```

<h3 id="exit">Options</h3>

| Option | Full name | Description                          |
| :----- | :-------- | :----------------------------------- |
| --help | n/a       | Displays help for using the command. |

## help

Displays help for using a command.

<h3 id="help">Syntax</h3>

```shell
help <command>
```

<h3 id="help">Commands</h3>

| Command | Description                                                               |
| :------ | :------------------------------------------------------------------------ |
| clear   | Clears the screen.                                                        |
| connect | Connects to Milvus.                                                       |
| create  | Create collection, database, partition,user,role and index.               |
| grant   | Grant role, privilege .                                                   |
| revoke  | Revoke role, privilege .                                                  |
| delete  | Delete collection, database, partition,alias,user,role or index.          |
| exit    | Closes the command line window.                                           |
| help    | Displays help for using a command.                                        |
| insert  | Imports data into a partition.                                            |
| list    | List collections,databases, partitions,users,roles,grants or indexes.     |
| load    | Loads a collection or partition.                                          |
| query   | Shows query results that match all the criteria that you enter.           |
| release | Releases a collection or partition.                                       |
| search  | Performs a vector similarity search or hybrid search.                     |
| show    | Show connection, database,collection, loading_progress or index_progress. |
| rename  | Rename collection                                                         |
| use     | Use database                                                              |
| version | Shows the version of Milvus_CLI.                                          |

## insert

Imports local or remote data into a partition.

<h3 id="insert">Syntax</h3>

```shell
insert file -c (text) [-p (text)] [-t (text)] <file_path>
```

<h3 id="insert">Options</h3>

| Option | Full name         | Description                                                                                                                                                            |
| :----- | :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -c     | --collection-name | The name of the collection that the data are inserted into.                                                                                                            |
| -p     | --partition       | (Optional) The name of the partition that the data are inserted into. Not passing this partition option indicates choosing the "\_default" partition.                  |
| -t     | --timeout         | (Optional) An optional duration of time in seconds to allow for the RPC. If timeout is not set, the client keeps waiting until the server responds or an error occurs. |
| --help | n/a               | Displays help for using the command.                                                                                                                                   |

<h3 id="insert">Example 1</h3>
The following example imports a local CSV file.

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

<h3 id="insert">Example 2</h3>
The following example imports a remote CSV file.

```shell
milvus_cli > insert file -c car 'https://raw.githubusercontent.com/milvus-
io/milvus_cli/main/examples/import_csv/vectors.csv'

Reading file from remote URL.

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

## list users

Lists all users.

### Syntax

```shell
list users
```

### Options

| Option | Full name | Description |
| --help | n/a | Displays help for using the command. |

## List roles

List roles in Milvus

<h3 id="list-role">Syntax</h3>

```shell
list roles
```

### Options

| Option | Full name | Description                          |
| :----- | :-------- | :----------------------------------- |
| --help | n/a       | Displays help for using the command. |

### Examples

```shell
milvus_cli > list roles
```

## List grants

List grants in Milvus

### Options

| Option | Full name    | Description                          |
| :----- | :----------- | :----------------------------------- |
| -r     | --roleName   | The role name of milvus role.        |
| -o     | --objectName | The object name of milvus object.    |
| -t     | --objectType | Global, Collection or User.          |
| --help | n/a          | Displays help for using the command. |

### Examples

```shell
milvus_cli > list grants -r role1 -o object1 -t Collection
```

## list collections

Lists all collections.

<h3 id="list-collections">Syntax<h3>

```shell
list collections
```

<h3 id="list-collections">Options<h3>

| Option | Full name | Description                          |
| :----- | :-------- | :----------------------------------- |
| --help | n/a       | Displays help for using the command. |

## list indexes

Lists all indexes for a collection.

<div class="alert note"> Currently, a collection supports a maximum of one index. </div>

<h3 id="list-indexes">Syntax</h3>

```shell
list indexes -c (text)
```

<h3 id="list-indexes">Options</h3>

| Option | Full name         | Description                          |
| :----- | :---------------- | :----------------------------------- |
| -c     | --collection-name | The name of the collection.          |
| --help | n/a               | Displays help for using the command. |

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

## load

Loads a collection or partition from hard drive space into RAM.

<h3 id="load">Syntax</h3>

```shell
load collection -c (text) [-p (text)]
```

<h3 id="load">Options</h3>

| Option | Full name         | Description                                               |
| :----- | :---------------- | :-------------------------------------------------------- |
| -c     | --collection-name | The name of the collection that the partition belongs to. |
| -p     | --partition       | (Optional/Multiple) The name of the partition.            |
| --help | n/a               | Displays help for using the command.                      |

## query

Shows query results that match all the criteria that you enter.

<h3 id="query">Syntax</h3>

```shell
query
```

<h3 id="query">Interactive Example</h3>

```shell
milvus_cli > query

Collection name: car

The query expression: id in [ 428960801420883491, 428960801420883492, 428960801420883493 ]

Name of partitions that contain entities(split by "," if multiple) []: default

A list of fields to return(split by "," if multiple) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date. [0]:

Graceful time. Only used in bounded consistency level. If graceful_time is set, PyMilvus will use current timestamp minus the graceful_time as the guarantee_timestamp. This option is 5s by default if not set. [5]:
```

## release

Releases a collection or partition from RAM.

<h3 id="release">Syntax</h3>

```shell
release collection -c (text) [-p (text)]
```

<h3 id="release">Options</h3>

| Option | Full name         | Description                                               |
| :----- | :---------------- | :-------------------------------------------------------- |
| -c     | --collection-name | The name of the collection that the partition belongs to. |
| -p     | --partition       | (Optional/Multiple) The name of the partition.            |
| --help | n/a               | Displays help for using the command.                      |

## search

Performs a vector similarity search or hybrid search.

<h3 id="search">Syntax</h3>

```shell
search
```

<h3 id="search">Interactive Example</h3>

```shell
milvus_cli > search

Collection name (car, test_collection): car

The vectors of search data(the length of data is number of query (nq), the dim of every vector in data must be equal to vector field's of collection. You can also import a csv file without headers): examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

Search parameter nprobe's value: 10

The max number of returned record, also known as topk: 2

The boolean expression used to filter attribute []: id > 0

The names of partitions to search (split by "," if multiple) ['_default'] []: _default

timeout []:

Guarantee Timestamp(It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date) [0]:
```

## list connection

List connections.

<h3 id="show-connection">Syntax</h3>

```shell
list connections
```

<h3 id="show-connection">Options</h3>

| Option | Full name | Description                          |
| :----- | :-------- | :----------------------------------- |
| --help | n/a       | Displays help for using the command. |

## show index_progress

Shows the progress of entity indexing.

<h3 id="show-index-progress">Syntax</h3>

```shell
show index_progress -c (text) [-i (text)]
```

<h3 id="show-index-progress">Options</h3>

| Option | Full name         | Description                                             |
| :----- | :---------------- | :------------------------------------------------------ |
| -c     | --collection-name | The name of the collection that the entities belong to. |
| -i     | --index           | (Optional) The name of the index.                       |
| --help | n/a               | Displays help for using the command.                    |

## show loading_progress

Displays the progress of loading a collection.

<h3 id="show-loading-progress">Syntax</h3>
 
```shell
show loading_progress -c (text) [-p (text)]
```
<h3 id="show-loading-progress">Options</h3>
 
|Option|Full name|Description
|:---|:---|:---|
|-c|--collection-name|The name of the collection that the entities belong to.|
|-p|--partition|(Optional/Multiple) The name of the loading partition.|
|--help|n/a|Displays help for using the command.|

## version

Shows the version of Milvus_CLI.

<h3 id="version">Syntax</h3>
 
```shell
version
```
<h3 id="version">Options</h3>
 
|Option|Full name|Description
|:---|:---|:---|
|--help|n/a|Displays help for using the command.|

<div class="alert note"> You can also check the version of Milvus_CLI in a shell as shown in the following example. In this case, <code>milvus_cli --version</code> acts as a command.</div>

<h3 id="version">Example</h3>

```shell
$ milvus_cli --version
Milvus_CLI v0.4.0
```
