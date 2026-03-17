# FunctionScore

This class holds a list of rerank function objects and optional extra parameters. Pass a `FunctionScorePtr` (a `std::shared_ptr<FunctionScore>`) to `SearchArguments::WithFunctionScore()` or `HybridSearchRequest::WithFunctionScore()`. For `HybridSearch` use RRF or Weighted functions; for `Search` use Boost, Decay, or Model functions. For the function subclass details see Function.

## Request Syntax

**REQUEST METHODS:**

- `FunctionScore& WithFunctions(std::vector<FunctionPtr>&& functions)`

      Replaces the function list with the provided vector. For Search, functions may be Boost/Decay/Model; for HybridSearch, use RRF/Weighted.

- `FunctionScore& AddFunction(const FunctionPtr& function)`

      Appends a single function to the list.

- `FunctionScore& WithParams(std::unordered_map<std::string, nlohmann::json>&& params)`

      Sets extra parameters for the rerank configuration (e.g., `{"max_score": 1.0}`).

- `FunctionScore& AddParam(const std::string& key, nlohmann::json&& param)`

      Adds a single extra parameter.

- `const std::vector<FunctionPtr>& Functions() const`

      Returns the list of functions.

- `const std::unordered_map<std::string, nlohmann::json>& Params() const`

      Returns the extra parameters map.

## Example

