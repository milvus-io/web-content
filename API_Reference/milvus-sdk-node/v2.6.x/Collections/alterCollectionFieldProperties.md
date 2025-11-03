# alterCollectionFieldProperties()

This operation modifies the properties of a specified collection field.

```javascript
alterCollectionFieldProperties(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.alterCollectionFieldProperties({
   db_name?: string
   collection_name: string,
   field_name: string,
   properties: Properties,
   timeout?: number
 })
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **&#91;REQUIRED&#93;**

    The name of the target collection to reassign an alias to.

- **field_name** (*string*) -

    **&#91;REQUIRED&#93;**

    The name of the target field name.

- **properties** (*Properties*) -

    **&#91;REQUIRED&#93;**

    The properties to change and their expected values in a TypeScript **Record**. Possible values are as follows:

    - **max_length** (*number*) -

        The maximum byte length for strings allowed to be inserted. Note that multibyte characters (e.g., Unicode characters) may occupy more than one byte each, so ensure the byte length of inserted strings does not exceed the specified limit. Value range: &#91;1, 65,535&#93;.

        This is mandatory for a **DataType.VARCHAR** field.

    - **max_capacity** (*number*) -

        The number of elements in an Array field value.

        This is mandatory for a **DataType.ARRAY** field.

    - **mmap_enabled** (*bool*) -

        Whether Milvus maps the field data into memory instead of fully loading it. For details, refer to MMap-enabled Data Storage.

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\&lt;ResStatus&gt;*

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
const resStatus = await milvusClient.alterCollectionField({
  collection_name: 'my-collection',
  field_name: 'my-field',
  properties: {"mmap.enabled": true}
});
```

