# runAnalyzer()

This operation runs an analyzer on the provided text for test purposes.

```javascript
runAnalyzer(data): Promise<RunAnalyzerResponse>
```

## Request Syntax

```javascript
milvusClient({
    analyzer_params: Record<string, any>,
    text: string | string[],
    with_detail: boolean,
    with_hash: boolean
})
```

**PARAMETERS:**

- **analyzer_params** (*Record&lt;string, any&gt;*) -

    The parameter for the analyzer.

- **text** (*string* | *string&#91;&#93;*) -

    The input text or a list of texts to be analyzed.

- **with_detail** (*boolean*) -

    Optional flag indicating whether to return detailed analysis output.

- **with_hash** (*boolean*) -

    Optional flag indicating whether to include hash-based processing.

**RETURNS** *Promise*&lt;*RunAnalyzerResponse*&gt;

This method returns a promise that resolves to a **RunAnalyzerResponse** object.

```javascript
{
    results: AnalyzerResult[],
    status: ResStatus
}
```

**PARAMETERS:**

- **results** (*AnalyzerResult&#91;&#93;*) -

    The results of this operation, containing a set of tokens generated based on the specified analyzer parameters.

    - **tokens** (*AnalyzerToken&#91;&#93;*) -

        A list of analyzed tokens. 

- **status** (*ResStatus*) -  

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.