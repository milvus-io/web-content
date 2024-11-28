# delete()

This operation deletes entities by their IDs or with a boolean expression.

```javascript
delete(data): Promise<MutationResult>
```

## Request Syntax

This method has the following alternatives.

### With DeleteByIdsReq

```javascript
milvusClient.delete({
   collection_name: string,
   ids: string[] | number[],
   partition_name?: string,
   timeout?: number
 })
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **ids** (*string[]* | *number[]*) -

    **[REQUIRED]**

    A specific entity ID or a list of entity IDs.

    The value defaults to **None**, indicating that a scalar filtering condition applies.

- **partition_name** (*string*) -

    The name of an existing partition in the collection.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

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

### With DeleteByFilterReq

```javascript
milvusClient.delete({
   collection_name: string,
   filter: string,
   partition_name?: string,
   timeout?: number
 })
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **filter** (*string*) -

    A scalar filtering condition to filter matching entities. 

    The value defaults to an empty string, indicating that no condition applies. Setting both **ids** and **filter** results in a **ParamError** exception.

    You can set this parameter to an empty string to skip scalar filtering. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md). 

- **partition_name** (*string*) -

    The name of an existing partition in the collection.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

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

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
</div>

```python
const milvusClient = new milvusClient(MILUVS_ADDRESS);
 const resStatus = await milvusClient.delete({
   collection_name: 'my_collection',
   ids: [1,2,3,4]
 });
```

```java
const milvusClient = new milvusClient(MILUVS_ADDRESS);
 const resStatus = await milvusClient.delete({
   collection_name: 'my_collection',
   filter: 'id in [1,2,3,4]'
 });
```

