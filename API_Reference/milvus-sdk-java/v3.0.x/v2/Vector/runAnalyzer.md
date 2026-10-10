# runAnalyzer()

This operation processes the input data and generates tokenized output.

```java
public RunAnalyzerResp runAnalyzer(RunAnalyzerReq request)
```

## Request Syntax

```java
runAnalyzer(RunAnalyzerReq.builder()
    .texts(List<String> texts)
    .analyzerParams(Map<String, Object> analyzerParams)
    .withDetail(Boolean withDetail)
    .withHash(Boolean withHash)
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .fieldName(String fieldName)
    .analyzerNames(List<String> analyzerNames)
    .build()
);
```

**BUILDER METHODS:**

- `texts(List<String> texts)` -

    A list of text strings to analyze.

- `analyzerParams(Map<String, Object> analyzerParams)` -

    A map of analyzer parameters.

- `withDetail(Boolean withDetail)` -

    Whether to include detailed token information.

- `withHash(Boolean withHash)` -

    Whether to include hash values in the output.

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The name of the target collection.

- `fieldName(String fieldName)` -

    The name of the target field.

- `analyzerNames(List<String> analyzerNames)` -

    A list of analyzer names to use.

**RETURN TYPE:**

*RunAnalyzerResp*

**RETURNS:**

A **RunAnalyzerResp** object that contains the analyzer output.

- `getResults()` (*List\<AnalyzerResult\>*) -

    The analysis results for the input texts. Each **AnalyzerResult** has the following getters:

    - `getTokens()` (*List\<AnalyzerToken\>*) -

        The tokens produced by the analyzer. Each **AnalyzerToken** has the following getters:

        - `getToken()` (*String*) -

            The token text.

        - `getStartOffset()` (*Long*) -

            The start offset of the token in the input text.

        - `getEndOffset()` (*Long*) -

            The end offset of the token in the input text.

        - `getPosition()` (*Long*) -

            The position of the token in the token sequence.

        - `getPositionLength()` (*Long*) -

            The number of positions the token spans.

        - `getHash()` (*Long*) -

            The hash value of the token.

**EXCEPTIONS