# RunAnalyzer()

Run analyzer. Return result tokens of analysis.

```cpp
Status RunAnalyzer(const RunAnalyzerRequest& request, RunAnalyzerResponse& response)
```

## Request Syntax

```cpp
auto request = RunAnalyzerRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFieldName(field_name)
    .WithTexts(texts)
    .AddText(text)
    .AddAnalyzerName(name)
    .WithAnalyzerParams(params)
    .WithDetail(with_detail)
    .WithHash(with_hash);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Set target db name, default is empty, means use the db name of MilvusClient.

- `WithCollectionName(std::string collection_name)`

    Set name of this collection, cannot be empty.

- `WithFieldName(std::string field_name)`

    Set name of the target field, cannot be empty.

- `WithTexts(const std::vector<std::string>& texts)`

    Set texts to be analyzed.

- `AddText(std::string text)`

    Add text for analyze.

- `AddAnalyzerName(std::string name)`

    Specify an analyzer.

- `WithAnalyzerParams(const nlohmann::json& params)`

    Set analyzer parameters.

- `WithDetail(bool with_detail)`

    Include details in the results.

- `WithHash(bool with_hash)`

    Include hash values in the results.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded.

- **response** (*RunAnalyzerResponse*) -

    - **Results** (*const AnalyzerResults&*) -

        Get results of analyzer.

        - **Tokens** (*const std::vector<AnalyzerToken>&*) -

            Set tokens to be analyzed.

            - **token_** (*std::string*) -

            - **start_offset_** (*int64_t*) -

            - **end_offset_** (*int64_t*) -

            - **position_** (*int64_t*) -

            - **position_length_** (*int64_t*) -

            - **hash_** (*uint32_t*) -

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Use RunAnalyzer() after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::RunAnalyzerRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFieldName(field_name);
status = client->RunAnalyzer(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
