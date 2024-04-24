# listCollections()

This operation lists all existing collections.

```javascript
milvusClient.listCollections();
```

## Request Syntax

```javascript
listCollections({
    collection_name: string
    type: ShowCollectionsType,
    timeout?: number
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **type** (*ShowCollectionsType*) 

    The scope of this operation. Possible values are **All** or **Loaded**.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

**RETURNS** *Promise\<ShowCollectionsResponse>*

This method returns a promise that resolves to a **ShowCollectionsResponse** object.

```javascript
{
    created_timestamps: string | list[string],
    created_utc_timestamps: string | list[string]
    data: object,
    status: object
}
```

**PARAMETERS:**

- **created_timestamps** (*string* | *list[string]*) -

    The timestamps indicating the creation time of the collections.

- **created_utc_timestamps** (*string* | *list[string]*) -

    The timestamps in UTC indicating the creation time of the collections.

- **data** (*object*) -

    - **id** (*string*) -

        The ID of the collection.

    - **loadedPercentage** (*string*) -

        The percentage of inserted entities in the collection.

    - **name** (*string*) -

        The name of the collection.

    - **timestamp** (*string*) -

        The timestamp indicating the creation time of the collection.

- **status** (*object*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
const milvusClient = new milvusClient(MILUVS_ADDRESS);
const res = await milvusClient.listCollections({ collection_name: 'my_collection' });
```

