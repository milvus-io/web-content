# createAlias()

This operation creates an alias for an existing collection.

```javascript
createAlias(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.createAlias({
   alias: string,
   collection_name: string,
   timeout?: number
 })
```

**PARAMETERS:**

- **alias** (*str*) -

    **[REQUIRED]**

    The alias of the collection. Before this operation, ensure that the alias does not already exist. If it does, exceptions will occur.

    <div class="admonition note">

    <p><b>what is a collection alias?</b></p>

    <p>A collection alias is an additional name for a collection. Collection aliases are useful when you want to switch your application to a new collection without any changes to your code. </p>
    <p>In Milvus, a collection alias is a globally unique identifier. One alias can only be assigned to exactly one collection. Conversely, a collection can have multiple aliases.</p>
    <p>Below is an example of reassigning the alias of one collection to another:</p>
    <p>Suppose there are two collections: <code>collection_1</code> and <code>collection_2</code>. There is also a collection alias named <code>bob</code>, which was originally assigned to <code>collection_1</code>:</p>
    <ul>
    <li><p><code>collection_1</code>'s alias = ["bob"]</p></li>
    <li><p><code>collection_2</code>'s alias = []</p></li>
    </ul>
    <p>After calling <code>alter_alias("collection_2", "bob")</code>:</p>
    <ul>
    <li><p><code>collection_1</code>'s alias = []</p></li>
    <li><p><code>collection_2</code>'s alias = ["bob"]</p></li>
    </ul>

    </div>

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection to create an alias for.

- **timeout** (*number*)  

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
const milvusClient = new milvusClient(MILUVS_ADDRESS);
 const resStatus = await milvusClient.createAlias({
   alias: 'my_collection_alias',
   collection_name: 'my_collection',
 });
```

