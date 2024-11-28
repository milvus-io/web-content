# About PyMilvus

PyMilvus is a Python SDK of Milvus. Its source code is open-sourced and hosted on [GitHub](https://github.com/milvus-io/pymilvus).

<div class="alert note">

In this release, you have the flexibility to choose MilvusClient or the original ORM module to talk with Milvus.

</div>

## Compatibility

| Milvus version | Recommended PyMilvus version |
| -------------- | ---------------------------- |
| 1.0.x	         | 1.0.1                        |
| 1.1.x	         | 1.1.2                        |
| 2.0.x	         | 2.0.2                        |
| 2.1.x	         | 2.1.3                        |
| 2.2.x          | 2.2.3                        |
| 2.3.x          | 2.3.7                        | 
| 2.4.x          | 2.4.4                        |
| 2.5.x          | 2.5.0                        |

## Install & Update

You can run the following command to install the latest PyMilvus or update your PyMilvus to this version.

```shell
pip install --upgrade pymilvus==v2.5.0
```

After the installation, you can check the PyMilvus version by running the following

```python
from pymilvus import __version__

print(__version__)

# v2.5.0
```

To install the Model library for embedding operations, run the following command:

```shell
pip install pymilvus[model]
```

For details, refer to the Model library documents and examples.

## Connect to Milvus

```python
from pymilvus import MilvusClient

# Authentication not enabled
client = MilvusClient("http://localhost:19530")

# Authentication enabled with the root user
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
    db_name="default"
)

# Authentication enabled with a non-root user
client = MilvusClient(
    uri="http://localhost:19530",
    token="user:password", # replace this with your token
    db_name="default"
)
```

## What's New

In this version, PyMilvus adds a MilvusClient module that incorporates several functional methods, aligning its functionality overall with that of the legacy ORM module.

### Collection-related methods

- [create_collection()](MilvusClient/Collections/create_collection.md)
- [rename_collection()](MilvusClient/Collections/rename_collection.md)
- [describe_collection()](MilvusClient/Collections/describe_collection.md)
- [has_collection()](MilvusClient/Collections/has_collection.md)
- [list_collections()](MilvusClient/Collections/list_collections.md)
- [drop_collection()](MilvusClient/Collections/drop_collection.md)
- [get_collection_stats()](MilvusClient/Collections/get_collection_stats.md)
- [load_collection()](MilvusClient/Management/load_collection.md)
- [release_collection()](MilvusClient/Management/release_collection.md)
- [get_load_state()](MilvusClient/Management/get_load_state.md)
- [refresh_load()](MilvusClient/Management/refresh_load.md)

### Data-related methods

- [insert()](MilvusClient/Vector/insert.md)
- [upsert()](MilvusClient/Vector/upsert.md)
- [search()](MilvusClient/Vector/search.md)
- [query()](MilvusClient/Vector/query.md)
- [delete()](MilvusClient/Vector/delete.md)

### Alias-related methods

- [create_alias()](MilvusClient/Collections/create_alias.md)
- [drop_alias()](MilvusClient/Collections/drop_alias.md)
- [alter_alias()](MilvusClient/Collections/alter_alias.md)
- [describe_alias()](MilvusClient/Collections/describe_alias.md)
- [list_aliases()](MilvusClient/Collections/list_aliases.md)

### Partition-related methods

- [create_partition()](MilvusClient/Partitions/create_partition.md)
- [drop_partition()](MilvusClient/Partitions/drop_partition.md)
- [has_partition()](MilvusClient/Partitions/has_partition.md)
- [list_partitions()](MilvusClient/Partitions/list_partitions.md)
- [load_partitions()](MilvusClient/Partitions/load_partitions.md)
- [release_partitions()](MilvusClient/Partitions/release_partitions.md)
- [get_partition_stats()](MilvusClient/Partitions/get_partition_stats.md)

### Index-related methods

- [create_index()](MilvusClient/Management/create_index.md)
- [list_indexes()](MilvusClient/Management/list_indexes.md)
- [drop_index](MilvusClient/Management/drop_index.md)
- [describe_index()](MilvusClient/Management/describe_index.md)

### User- and RBAC-related methods

- [create_user()](MilvusClient/Authentication/create_user.md)
- [drop_user()](MilvusClient/Authentication/drop_user.md)
- [update_password()](MilvusClient/Authentication/update_password.md)
- [list_users()](MilvusClient/Authentication/list_users.md)
- [describe_user()](MilvusClient/Authentication/describe_user.md)
- [grant_role()](MilvusClient/Authentication/grant_role.md)
- [revoke_role()](MilvusClient/Authentication/revoke_role.md)
- [create_role()](MilvusClient/Authentication/create_role.md)
- [drop_role()](MilvusClient/Authentication/drop_role.md)
- [describe_role()](MilvusClient/Authentication/describe_role.md)
- [list_roles()](MilvusClient/Authentication/list_roles.md)
- [grant_privilege()](MilvusClient/Authentication/grant_privilege.md)
- [revoke_privileges()](MilvusClient/Authentication/revoke_privileges.md)

## Examples

In addition to the documents, you can also refer to the example sets in our GitHub repo.

## Feedback & Issues

If you are having trouble or have questions about PyMilvus, ask your question on our PyMilvus Community Forum. Once you get an answer, it’d be great if you could work it back into this documentation and contribute!

## Contributing

We are committed to building a collaborative, exuberant open-source community for PyMilvus. Therefore, contributions to PyMilvus are welcome from everyone. Refer to [Contributing Guideline](https://github.com/milvus-io/pymilvus/blob/master/CONTRIBUTING.md) before making contributions to this project. You can [file an issue](https://github.com/milvus-io/pymilvus/issues/new/choose) or contact us on [Slack](https://github.com/milvus-io/pymilvus#readme) if you need any assistance or want to propose your ideas about PyMilvus.
