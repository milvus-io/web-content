# Function

This class is the base class for all built-in function objects used in search reranking and full-text search. It is also used as the base for schema-level functions (e.g., BM25 tokenizer). Pass a `FunctionPtr` (a `std::shared_ptr<Function>`) to `CollectionSchema::AddFunction()` or to [FunctionScore](../../Vector/FunctionScore.md)`::AddFunction()`.

```cpp
Function();
Function(std::string name, FunctionType function_type, std::string description = "");

using FunctionPtr = std::shared_ptr<Function>;
```

**PARAMETERS:**

- **name** (*std::string*)

    Unique name for this function instance.

- **function_type** (*FunctionType*)

    Type of function. Values: `UNKNOWN=0`, `BM25=1`, `TEXTEMBEDDING=2`, `RERANK=3`.
    See [FunctionType](../FunctionType.md).

- **description** (*std::string*)

    Optional description. Default: `""`.

**METHODS:**

- `const std::string& Name() const` / `Status SetName(std::string name)`

    Gets or sets the function name.

- `const std::string& Description() const` / `Status SetDescription(std::string description)`

    Gets or sets the optional function description.

- `FunctionType GetFunctionType() const` / `virtual Status SetFunctionType(FunctionType ft)`

    Gets or sets the function type. See [FunctionType](../FunctionType.md).

- `const std::vector<std::string>& InputFieldNames() const` / `Status AddInputFieldName(std::string name)`

    Gets or adds input field names (fields this function reads from).

- `const std::vector<std::string>& OutputFieldNames() const` / `Status AddOutputFieldName(std::string name)`

    Gets or adds output field names (fields this function writes to).

- `virtual Status AddParam(const std::string& key, const std::string& value)`

    Adds an extra key-value parameter specific to the function type.

- `virtual const std::unordered_map<std::string, std::string>& Params() const`

    Returns all extra parameters.

## Related types

- [RRFRerank](RRFRerank.md)

- [WeightedRerank](WeightedRerank.md)

- [BoostRerank](BoostRerank.md)

- [DecayRerank](DecayRerank.md)

- [ModelRerank](ModelRerank.md)

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <milvus/types/Function.h>
using namespace milvus;

// Add a BM25 full-text-search function to the collection schema
Function bm25("text_bm25", FunctionType::BM25, "Full-text search over the title field");
bm25.AddInputFieldName("title");
bm25.AddOutputFieldName("title_bm25");

CollectionSchema schema("my_collection");
schema.AddFunction(std::make_shared<Function>(bm25));
```
