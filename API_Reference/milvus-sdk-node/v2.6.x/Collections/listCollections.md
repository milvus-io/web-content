# listCollections()

This operation lists all existing collections.

```javascript
milvusClient.listCollections();
```

## Request Syntax

```javascript
listCollections({
    type: ShowCollectionsType,
    collection_names?: string[],
    db_name?: string,
    timeout?: number
})
```

**PARAMETERS:**

- **type** (*ShowCollectionsType*) 

    The scope of this operation. Possible values are **All** or **Loaded**.

- **collection_names** (*string[]*) -

    A list of collection names to check. When empty, all collections in the scope defined by **type** are returned.

- **db_name** (*string*) -

    The name of the database that holds the target collections. When omitted, the default database is used.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

**RETURNS:**

*Promise<ShowCollectionsResponse>*

This method returns a promise that resolves to a **ShowCollectionsResponse** object.

```javascript
{
    data: CollectionData[],
    created_timestamps: string[],
    created_utc_timestamps: string[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **data** (*CollectionData[]*) -
A list of collection data objects. Each entry provides the following fields:

    - **name** (*string*) -

        The collection name.

    - **id** (*string*) -

        The collection ID.

    - **timestamp** (*string*) -

        A hybrid timestamp indicating when the collection was created.

    - **loadedPercentage** (*string*) -

        The percentage of the collection's data that is loaded.

- **created_timestamps** (*string[]*) -
A list of hybrid timestamps indicating when each collection was created.

- **created_utc_timestamps** (*string[]*) -
A list of UTC timestamps indicating when each collection was created.

- **status** (*ResStatus*) -
A **ResStatus** object with the following members.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.


**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
const res = await milvusClient.listCollections({ collection_names: ['my_collection'] });
```

