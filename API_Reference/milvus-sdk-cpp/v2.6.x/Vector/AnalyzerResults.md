# AnalyzerResults

This page documents `AnalyzerResults`, `AnalyzerResult`, and `AnalyzerToken`. `AnalyzerResults` is a type alias for `std::vector<AnalyzerResult>` and is returned via `Results()` on a `RunAnalyzerResponse`. Each `AnalyzerResult` corresponds to one input text string and contains the list of tokens produced by the analyzer.

## AnalyzerResults

```cpp
using AnalyzerResults = std::vector<AnalyzerResult>;
```

Access the per-text results via the standard vector API:

```cpp
const AnalyzerResults& results = response.Results();
for (const auto& result : results) {
    for (const auto& token : result.Tokens()) {
        std::cout << token.token_ << "\n";
    }
}
```

## AnalyzerResult

One `AnalyzerResult` holds all tokens for a single input text.

```cpp
explicit AnalyzerResult(std::vector<AnalyzerToken>&& tokens);
```

- `const std::vector<AnalyzerToken>& Tokens() const`

    Returns the list of tokens produced by the analyzer for this input text.

## AnalyzerToken

`AnalyzerToken` is a plain struct describing a single token.

```cpp
struct AnalyzerToken {
    std::string token_;
    int64_t start_offset_;
    int64_t end_offset_;
    int64_t position_;
    int64_t position_length_;
    uint32_t hash_;
};
```

- **token_** — The token string (e.g., a word or sub-word).

- **start_offset_** — Byte offset in the original text where this token starts.

- **end_offset_** — Byte offset in the original text where this token ends.

- **position_** — Position index of the token in the token sequence.

- **position_length_** — Number of positions this token spans (usually `1`).

- **hash_** — 32-bit hash of the token string.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

RunAnalyzerResponse response;
auto status = client->RunAnalyzer(
    RunAnalyzerRequest()
        .WithCollectionName("my_collection")
        .WithFieldName("content")
        .AddText("Hello world")
        .AddText("Milvus vector database"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const AnalyzerResults& results = response.Results();
for (size_t i = 0; i < results.size(); ++i) {
    std::cout << "Text " << i << " tokens:\n";
    for (const auto& tok : results[i].Tokens()) {
        std::cout << "  [" << tok.start_offset_ << "," << tok.end_offset_ << "] "
                  << tok.token_ << "\n";
    }
}
```
