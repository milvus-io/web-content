# RenameCollection()

This operation renames a collection, optionally moving it to another database in the same call. After a successful rename, the client also migrates its local collection-timestamp cache to the new name and invalidates cached schemas under both the old and new names.

```cpp
Status RenameCollection(const RenameCollectionRequest& request)
```

## Request Syntax

```cpp
auto request = RenameCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithNewCollectionName(collection_name)
    .WithTargetDatabaseName(db_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the database that currently contains the collection (the source database, sent as the RPC db_name); the default database is used if left empty. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the current name of the collection to rename (the old name, sent as the RPC oldname).

- `WithNewCollectionName(const std::string& collection_name)`

    Sets the name the collection will have after the operation (the new name, sent as the RPC newname).

- `WithTargetDatabaseName(const std::string& db_name)`

    Sets the database to move the collection into; when left empty, the collection is renamed in place within the source database. Optional.

**RETURNS:**

*Status*

Returns a Status indicating whether the collection was renamed successfully; check IsOk() and Message() for the outcome.

**ERROR HANDLING:**

- **std::exception**

    When request construction, transport, or response processing fails. the returned Status carries the error code and message; inspect the exception message or the Status to determine the cause, such as a source collection that does not exist under the given database.

## Example

Rename a collection after connecting a MilvusClientV2; WithCollectionName takes the old name and WithNewCollectionName takes the new name.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::string old_name = "old_collection";
std::string new_name = "new_collection";
auto request = milvus::RenameCollectionRequest()
    .WithDatabaseName("default")       // source database holding the collection
    .WithCollectionName(old_name)      // current (old) name
    .WithNewCollectionName(new_name);  // name after the rename
status = client->RenameCollection(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
