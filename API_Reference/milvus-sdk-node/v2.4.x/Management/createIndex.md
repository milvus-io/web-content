# createIndex()

This operation creates an index for a specific collection.

```javascript
createIndex(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.createIndex([
    {
       collection_name: string,
       field_name: string,
       index_name?: string,
       index_type: string,
       metric_type: string,
       params?: KeyValueObj,
       timeout?: number
     }
 ]);
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **field_name** (*string*) -

    **[REQUIRED]**

    The name of the field in which to create an index.

- **index_name** (*string*) -

    The name of the index to create.

- **index_type** (*string*) -

    The type of the index to create.

- **metric_type** (*string*) -

    The metric type used to measure vector distance.

- **params** (*string*) -

    Other index-specific parameters.

- **timeout** (number) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\<ResStatus>*

This method returns a promise that resolves to a **ResStatus** object.

```javascript
{
    code: number,
    error_code: string | number,
    reason: string
}
```

**PARAMETERS:**

- **code** (*number*) -

    A code that indicates the operation result. It remains **0** if this operation succeeds.

- **error_code** (*string* | *number*) -

    An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

- **reason** (*string*) - 

    The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
milvusClient._createIndex({
   collection_name: "my_collection",
   field_name: "vector_field",
   index_name: "vector_index"
 });
```

