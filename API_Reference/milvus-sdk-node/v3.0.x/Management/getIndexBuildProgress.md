# getIndexBuildProgress()

This operation gets the build progress of the specified index.

```javascript
await milvusClient.getIndexBuildProgress(data)
```

## Request Syntax

```javascript
await milvusClient.getIndexBuildProgress({
      db_name?: string,
      collection_name: string,
      field_name: string,
      index_name: string,
      timeout?: number
});
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **index_name** (*string*) -

    **[REQUIRED]**

    The name of the target index. This parameter and `field_name` are mutually exclusive. 

- **field_name** (*string*) -

    **[REQUIRED]**

    The name of the target field. This parameter and `index_name` are mutually exclusive. When you use this parameter, ensure that an index has been built upon the specified field.

- **timeout** (number) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise<GetIndexBuildProgressResponse>*

This method returns a promise that resolves to a **GetIndexBuildProgressResponse** object.

```javascript
{
    indexed_rows: number,
    total_rows: number,
    status:  ResStatus
}
```

**PARAMETERS:**

- **indexed_rows** (*number*) -
The number of rows that have been indexed so far.

- **total_rows** (*number*) -
The total number of rows the index covers. The build is complete when **indexed_rows** equals **total_rows**.

- **ResStatus**
A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```javascript
const milvusClient = new MilvusClient(MILUVS_ADDRESS);
const getIndexBuildProgressReq = {
  collection_name: 'my_collection',
  index_name: 'my_index',
};
const res = await milvusClient.getIndexBuildProgress(getIndexBuildProgressReq);
console.log(res);
```

