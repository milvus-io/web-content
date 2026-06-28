# bulkInsert()

This operation imports the data from a specified data file into Milvus.

```javascript
await milvusClient.bulkInsert(data)
```

## Request Syntax

```javascript
await milvusClient.bulkInsert({
    db_name?: string,
    collection_name: string,
    partition_name?: string,
    files: string[],
    timeout?: number,
    options?: KeyValuePair<string, string | number>[]
})
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database to which the target collection belongs.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the target collection.

- **partition_name** (*string*) -

    The name of the target partition.

- **files** (*string[]*) -

    A list of paths to the data files from which the import is conducted.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **options** (*KeyValuePair<string, string | number>[]*) -   

    Extra options for the current operation in key-value pairs.

**RETURN TYPE:**

*Promise*<*ImportResponse*>

**RETURNS** *Promise<ImportResponse>*

This method returns a promise that resolves to a **ImportResponse** object.

```javascript
{
    tasks: number[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **tasks** (*number[]*) -
The identifiers of the asynchronous import tasks dispatched to the data nodes. Pass these values to `listImportTasks()` to poll for completion.

- **ResStatus**
A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Examples

```javascript
const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const importResponse = await milvusClient.bulkInsert({
  collection_name: 'my_collection',
  files: ['path-to-data-file.json'],
});
```
