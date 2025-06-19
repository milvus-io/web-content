# addCollectionField()

This operation adds a new scalar field to an existing collection without recreating it. The field becomes available almost immediately with minimal delay due to internal schema synchronization.

```javascript
addCollectionField(data: AddCollectionFieldReq): Promise<ResStatus>
```

<div class="admonition note">

<p><b>notes</b></p>

<p>If the collection has the dynamic field enabled and you add a static field with the same name as an existing dynamic field key, the static field will mask the dynamic field key. The original dynamic values remain accessible via the <code>$meta['field_name']</code> syntax.</p>

</div>

## Request Syntax

```javascript
milvusClient.addCollectionField({
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

- **field** (*FieldType*) -

    The configurations of the field to add, which is a **FieldType** object that has the following fields:

    - **name** (*string)* -

        The name of the field.

    - **data_type** (*string)* -

        The data type of the field. For an enumeration of all available data types, please see DataType.

    - **description** (*string)* -

        The description of the field.

    - **is_clustering_key** (*boolean*) -

        A boolean value indicating whether this field will work as the clustering key.

    - **is_partition_key** (*boolean)* -

        A boolean value indicating whether this field will work as the partition key field.

    - **is_primary_key** (*boolean)* -

        Whether the field will work as the primary key.

        The value defaults to **False**. Setting this to **True** makes the field a primary key field which is unique throughout the collection.

    - **type_params** (*string* | *number)* -

        Other parameters for the field.

        - **auto_id** (*boolean)* -

            Whether the primary field automatically increments upon data insertions into this collection.

            The value defaults to **False**. Setting this to **True** makes the primary field automatically increment. Skip this parameter if you need to set up a collection with a customized schema.

        - **dim** (*string* | *number*) -

            The dimensionality of the collection field that holds vector embeddings. 

            The value should be an integer greater than 1 and is usually determined by the model you use to generate vector embeddings.

        - **element_type** (string) -

            The data type of the elements in an array. 

            This parameter applies if the current field is an array field.

        - **max_capacity** (*string* | *number)* -

            The number of elements in an array.

            This parameter applies if the current field is an array field.

        - **max_length** (*string*) -

            The maximum lengths of a string in this field.

            This is required when the **data_type** of this field is **VarChar**.

        - **type_params** (*object*) -

            Extra parameters for the current field in key-value pairs.

    - **nullable** (*boolean*) -

        A Boolean parameter that specifies whether the field can accept null values. Valid values:

        - **true**: The field can contain null values, indicating that the field is optional, and missing data is permitted for entries.

        - **false** (default): The field must contain a valid value for each entity; missing data is not allowed, making the field mandatory.

        For more information, refer to [Nullable & Default](https://milvus.io/docs/nullable-and-default.md).

    - **default_value** (*object*)

        Sets a default value for a specific field in a collection schema when creating it. This is particularly useful when you want certain fields to have an initial value even if no value is explicitly provided during data insertion.

    - **enable_analyzer** (*boolean*) -

        Whether to enable text analysis for the specified `VarChar` field. When set to `true`, it instructs Milvus to use a text analyzer, which tokenizes and filters the text content of the field.

    - **enable_match** (*boolean*)

        Whether to enable keyword matching for the specified `VarChar` field. When set to `true`, Milvus creates an inverted index for the field, allowing for quick and efficient keyword lookups. `enable_match` works in conjunction with `enable_analyzer` to provide structured term-based text search, with `enable_analyzer` handling tokenization and `enable_match` handling the search operations on these tokens.

    - **analyzer_params** (*object*)

        Configures the analyzer for text processing, specifically for `VarChar` fields. This parameter configures tokenizer and filter settings, particularly for text fields used in [keyword matching](https://milvus.io/docs/keyword-match.md) or [full text search](https://milvus.io/docs/full-text-search.md). Depending on the type of analyzer, it can be configured in either of the following methods:

        - Built-in analyzer

            ```javascript
            const analyzer_params: { type: 'english' };
            ```

            - `type` (*string*) -

                Pre-configured analyzer type built into Milvus, which can be used out-of-the-box by specifying its name. Possible values: `standard`, `english`, `chinese`. For more information, refer to [Standard Analyzer](https://milvus.io/docs/standard-analyzer.md), [English Analyzer](https://milvus.io/docs/english-analyzer.md), and [Chinese Analyzer](https://milvus.io/docs/chinese-analyzer.md).

        - Custom analyzer

            ```javascript
            const analyzer_params: {
                "tokenizer": "standard",
                "filter": ["lowercase"],
            };
            ```

            - `tokenizer` (*string*) -

                Defines the tokenizer type. Possible values: `standard` (default), `whitespace`, `jieba`. For more information, refer to [Standard Tokenizer](https://milvus.io/docs/standard-tokenizer.md), [Whitespace Tokenizer](https://milvus.io/docs/whitespace-tokenizer.md), and [Jieba Tokenizer](https://milvus.io/docs/jieba-tokenizer.md).

            - `filter` (*list*) -

                Lists filters to refine tokens produced by the tokenizer, with options for built-in filters and custom filters. For more information, refer to [Alphanumonly Filter](https://milvus.io/docs/alphanumonly-filer.md) and others.

- **timeout** (*number*) -  

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
