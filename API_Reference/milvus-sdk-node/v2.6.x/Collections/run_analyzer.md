# run_analyzer()

This operation processes the input data and generates tokenized output.

```javascript
runAnalyzer(data): Promise<RunAnalyzerResponse>
```

## Request Syntax

```javascript
milvusClient.runAnalyzer({
    analyzer_params: Record<string, any>,
    text: string | string[],
    with_detail: boolean,
    with_hash: boolean,
})
```

**PARAMETERS:**

- **analyzer_params** (*Record\<string, any>*) -

    The parameters for the analyzer. If set to `None`, defaults to an empty dictionary.

- **text** (*string* | *string[]*) -

    The input text or a list of texts to be analyzed.

- **with_detail** (*boolean*) -

    Optional flag indicating whether to return detailed analysis output.

- **with_hash** (*boolean*) - 

    Optional flag indicating whether to include hash-based processing. 

**RETURNS** *Promise\<RunAnalyzerResponse>*

This method returns a promise that resolves to a **RunAnalyzerResponse** object.

```javascript
{
    status: ResStatus,
    results: AnalyzerResult[]
}
```

**PARAMETERS:**

- **status** (*ResStatus*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

- **results** (*AnalyzerResult[]*) -  

    A list of **AnalyzerResult** objects, with each comprising the following fields:

    - **tokens** (*AnalyzerToken[]*) - 

        A list of strings representing the primary tokenized output, or a list of lists of strings representing detailed token information if detailed output is enabled.

## Example

```javascript
 const milvusClient = new milvusClient(MILUVS_ADDRESS);
 const searchResults = await milvusClient.search({
   collection_name: 'my_collection',
   vector: [1, 2, 3, 4],
 });
```

