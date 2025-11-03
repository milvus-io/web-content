# describeIndex()

This operation describes a specific index.

```javascript
describeIndex(data): Promise<DescribeIndexResponse>
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

    **&#91;REQUIRED&#93;**

    The name of an existing collection.

- **field_name** (*string*) -

    The name of an existing field in the collection. 

- **index_name** (*string*) -

    The name of the index to describe.

- **timeout** (*number*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\&lt;DescribeIndexResponse&gt;*

This method returns a promise that resolves to a **DescribeIndexResponse** object.

```javascript
{
    index_descriptions: IndexDescription[],
    status: object
}
```

**PARAMETERS:**

- **index_descriptions** (*IndexDescription&#91;&#93;*) -

    - **field_name** (*string*) -

        The name of the field on which the index is created.

    - **indexID** (*number*) -

        The ID of the created index.

    - **index_name** (*string*) -

        The name of the created index.

    - **index_state_fail_reason** (*string*) -

        The reason for failing to create the index.

    - **indexed_rows** (*string*) -

        The number of rows that are indexed.

    - **pending_index_rows** (*string*) -

        The number of rows waiting to be indexed.

    - **total_rows** (*string*) -

        The total number of rows in the field.

    - **params** (*string*) -

        Index-specific parameters.

        - **key** (*string*) -

            The name of the index parameter.

        - **value** (*string* | *number*) -

            The value of the index parameter.

- **status** (*object*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
const milvusClient = new MilvusClient(MILUVS_ADDRESS);
const describeIndexReq = {
  collection_name: 'my_collection',
  index_name: 'my_index',
};
const res = await milvusClient.describeIndex(describeIndexReq);
console.log(res);
```

