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
   db_name: string,
   collection_name: string,
   partition_name?: string,
   ids: string[] | number[],
   consistency_level: string,
   timeout?: number
 })
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **&#91;REQUIRED&#93;**

    The name of an existing collection.

- **partition_name** (*string*) -

    The name of an existing partition in the collection.

- **ids** (*string&#91;&#93;* | *number&#91;&#93;*) -

    **&#91;REQUIRED&#93;**

    A specific entity ID or a list of entity IDs.

    The value defaults to **None**, indicating that a scalar filtering condition applies.

- **consistency_level** (*ConsistencyLevelEnum*) -

    The consistency level of the target collection. The value defaults to **Bounded** (**1**) with options of **Strong** (**0**), **Bounded** (**1**), **Session** (**2**), and **Eventually** (**3**).

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\&lt;MutationResult&gt;*

### With DeleteByFilterReq

```javascript
milvusClient.delete({
   db_name: string,
   collection_name: string,
   partition_name?: string,
   filter: string,
   exprValues?: keyValueObject,
   consistency_level?: string,
   timeout?: number
 })
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **&#91;REQUIRED&#93;**

    The name of an existing collection.

- **partition_name** (*string*) -

    The name of an existing partition in the collection.

- **filter** (*string*) -

    A scalar filtering condition to filter matching entities. 

    The value defaults to an empty string, indicating that no condition applies. Setting both **ids** and **filter** results in a **ParamError** exception.

    You can set this parameter to an empty string to skip scalar filtering. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md). 

- **consistency_level** (*ConsistencyLevelEnum*) -

    The consistency level of the target collection. The value defaults to **Bounded** (**1**) with options of **Strong** (**0**), **Bounded** (**1**), **Session** (**2**), and **Eventually** (**3**).

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\&lt;MutationResult&gt;*

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

