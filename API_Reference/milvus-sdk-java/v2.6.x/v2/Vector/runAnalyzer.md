# runAnalyzer()

This operation processes the input data and generates tokenized output.

```java
public RunAnalyzerResp runAnalyzer(RunAnalyzerReq request)
```

## Request Syntax

```java
runAnalyzer(RunAnalyzerReq.builder()
    .texts(List<String> texts)
    .analyzerParams(Map<String, Object> analzyerParams)
    .withDetail(Boolean withDetail)
    .withHash(Boolean withHash)
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .fieldName(String fieldName)
    .analyzerNames(List<String> analyzerNames)
    .build()
)
```

**BUILDER METHODS:**

- `texts(List<String> texts)`

    The input text or a list of texts to be analyzed.

- `analyzerParams(Map<String, Object> analzyerParams)`

    The parameters for the analyzer. If left unspecified, defaults to an empty dictionary.

- `withDetail(Boolean withDetail)`

    An optional flag indicating whether to return detailed analysis output.

- `withHash(Boolean withHash)`

    An optional flag indicating whether to include hash-based processing.

- `databaseName(String databaseName)`

    The name of the target database. The value defaults to an empty string, indicating the default database.

- `collectionName(String collectionName)`

    The name of the target collection in the above-specified database.

- `fieldName(String fieldName)`

    The name of the target field in the above-specified collection.

- `analyzerNames(List<String> analyzerNames)`

    The names of the analyzers to be used.

**RETURN TYPE:**

*RunAnalyzerResp*

**RETURNS:**

A **RunAnalyzerResp** contains a list of **AnalyzerResult** objects, each of which is a list of **AnalyzerToken** objects. 

```java
├── RunAnalyzerResp
│       ├── AnalyzerResult_00
│       │       ├── AnalyzerToken_00   
│       │       ├── AnalyzerToken_01
│       │       ├── ...
│       │       └── AnalyzerToken_0x
│       ├── AnalyzerResult_01
│       ├── ...
│       └── AnalyzerResult_0x
```

An **AnalyzerToken** has the following attributes:

- **token** (*String*) -

    An analyzed token string

- **startOffset** (*Long*) -

    The offset of the above token's first character in the analyzed text.

- **endOffset** (*Long*) -

    The offset of the above token's last character in the analyzed text.

- **position** (*Long*) -

    The position of the above token in the analyzed text.

- **positionLength** (*Long*) -

    The length of the above token.

- **hash** (*Long*) - 

    The hash value of the above token.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.RunAnalyzerReq;
import io.milvus.v2.service.vector.response.RunAnalyzerResp;

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
