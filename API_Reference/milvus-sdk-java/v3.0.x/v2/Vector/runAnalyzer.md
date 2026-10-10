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

**RETURNS:**

*RunAnalyzerResp*

A **RunAnalyzerResp** object that contains the analyzer output. The object has the following fields:

- **results** (*List\<AnalyzerResult\>*) -

    The analysis results for the input texts. Each **AnalyzerResult** has the following fields:

    - **tokens** (*List\<AnalyzerToken\>*) -

        The tokens produced by the analyzer. Each **AnalyzerToken** has the following fields:

        - **token** (*String*) -

            The token text.

        - **startOffset** (*Long*) -

            The start offset of the token in the input text.

        - **endOffset** (*Long*) -

            The end offset of the token in the input text.

        - **position** (*Long*) -

            The position of the token in the token sequence.

        - **positionLength** (*Long*) -

            The number of positions the token spans.

        - **hash** (*Long*) -

            The hash value of the token.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.RunAnalyzerReq;
import io.milvus.v2.service.vector.response.RunAnalyzerResp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Run analyzer
List<String> texts = new ArrayList<>();
texts.add("Analyzers (tokenizers) for multi languages");
texts.add("2.5 to take advantage of enhancements and fixes!");

Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter",
        Arrays.asList("lowercase",
                new HashMap<String, Object>() {{
                    put("type", "stop");
                    put("stop_words", Arrays.asList("to", "of", "for", "the"));
                }}));

RunAnalyzerResp resp = client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .withDetail(true)
        .withHash(true)
        .build());
```
