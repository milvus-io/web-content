# AlterAlias()

This operation reassigns the alias set by WithAlias from the collection it currently points to, so that it addresses the collection set by WithCollectionName; subsequent search and query operations issued through the alias resolve to the new collection. On success, the client also refreshes its local collection-timestamp and schema caches for the alias so cached lookups follow the reassignment.

```cpp
Status AlterAlias(const AlterAliasRequest& request)
```

## Request Syntax

```cpp
auto request = AlterAliasRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithAlias(alias);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the database that contains the alias and the target collection; the default database is used if this is left empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the target collection that the alias is reassigned to; after the operation succeeds, the alias points to this collection instead of its previous one.

- `WithAlias(const std::string& alias)`

    Sets the name of the alias to change; this alias is detached from its current collection and rebound to the collection set by WithCollectionName.

**RETURNS:**

*Status*

Returns a Status indicating whether the alias was successfully reassigned to the target collection.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for the underlying failure details.

## Example

Reassign an existing alias to a new collection after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// Point the alias "product_alias" at the collection "product_collection_v2".
auto request = milvus::AlterAliasRequest()
    .WithDatabaseName("default")
    .WithCollectionName("product_collection_v2")
    .WithAlias("product_alias");
status = client->AlterAlias(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
