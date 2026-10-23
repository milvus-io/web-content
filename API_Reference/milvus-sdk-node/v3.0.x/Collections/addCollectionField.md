# addCollectionField()

This operation adds a new scalar field to an existing collection without recreating it. The field becomes available almost immediately with minimal delay due to internal schema synchronization.

```javascript
await milvusClient.addCollectionField(data: AddCollectionFieldReq)
```

<div class="alert note">

If the collection has the dynamic field enabled and you add a static field with the same name as an existing dynamic field key, the static field will mask the dynamic field key. The original dynamic values remain accessible via the `$meta['field_name']` syntax.

</div>

## Request Syntax

```javascript
await milvusClient.addCollectionField({
    collection_name: string,
    db_name?: string,
    field: FieldType,
    timeout?: number
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    The name of the target collection.

- **db_name** (*string*) -

    The name of the target database.

- **field** (*[FieldType](FieldType.md)*) -

    The configurations of the field to add, which is a **FieldType** object that has the following fields.

- **timeout** (*number*) -  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS:**

*Promise\<ResStatus\>*

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

```javascript
const milvusClient = new MilvusClient(MILVUS_ADDRESS);
const resStatus = await milvusClient.addCollectionField({
  collection_name: 'my_collection',
  field: [{
    name: 'new_field',
    data_type: 'Int64',
    is_primary_key: false,
    description: 'A new field'
  }]
});
```
