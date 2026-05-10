# describeIndex()

This operation describes a specific index.

```javascript
await milvusClient.describeIndex(data)
```

## Request Syntax

```javascript
 milvusClient.describeIndex({ 
     db_name: string,
     collection_name: string,
     field_name?: string,
     index_name?: string,
     timeout?: number
 })
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **field_name** (*string*) -

    The name of an existing field in the collection. 

- **index_name** (*string*) -

    The name of the index to describe.

- **timeout** (*number*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise<DescribeIndexResponse>*

This method returns a promise that resolves to a **DescribeIndexResponse** object.

```javascript
{
    index_descriptions: IndexDescription[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **index_descriptions** (*IndexDescription[]*) -
A list of index descriptions for the requested collection. When **field_name** or **index_name** is supplied, the list contains only the matching entry.

    - **index_name** (*string*) -

        The index name.

    - **indexID** (*number*) -

        The internal index identifier.

    - **params** (*KeyValuePair[]*) -

        The index parameters captured at creation (for example, **index_type**, **metric_type**, **params**).

    - **field_name** (*string*) -

        The field on which the index is built.

    - **indexed_rows** (*string*) -

        The number of rows that have been indexed so far.

    - **total_rows** (*string*) -

        The total number of rows the index covers.

    - **state** (*string*) -

        The build state of the index. Possible values are **IndexStateNone**, **Unissued**, **InProgress**, **Finished**, and **Failed**.

    - **index_state_fail_reason** (*string*) -

        The failure reason when **state** is **Failed**, otherwise an empty string.

    - **pending_index_rows** (*string*) -

        The number of rows still waiting to be indexed.

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
const describeIndexReq = {
  collection_name: 'my_collection',
  index_name: 'my_index',
};
const res = await milvusClient.describeIndex(describeIndexReq);
console.log(res);
```

