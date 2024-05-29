# describeAlias()

This operation describes a specific alias.

```javascript
describeAlias(data): Promise<DescribeAliasResponse>
```

## Request Syntax

```javascript
milvusClient.describeAlias({
    alias: string,
    collection_name: string
})
```

**PARAMETERS:**

- **alias** (*str*) -

    **[REQUIRED]**

    The alias of a collection. Note that the alias should exist beforehand.

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

    The name of the collection that has the specified alias.

**RETURNS** *Promise\<DescribeAliasResponse>*

This method returns a promise that resolves to a **ResStatus** object.

```javascript
{
    alias: string;
    collection: string;
    db_name: string;
    status: ResStatus;
}
```

**PARAMETERS:**

- **alias** (*string*) -

    The name of the specified alias.

- **collection** (*string*) -

    The name of the specified collection.

- **db_name** (*string*) -

    The database that holds the above alias and collection.

- **status** (*ResStatus*) -  

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```javascript
const milvusClient = new milvusClient(MILUVS_ADDRESS);
const res = await milvusClient.describeAlias({
   alias: 'my_collection_alias',
   collection_name: 'my_collection',
});
```
