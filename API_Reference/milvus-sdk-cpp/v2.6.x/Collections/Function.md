# Function

This class is the base class for all built-in function objects used in search reranking and full-text search. It is also used as the base for schema-level functions (e.g., BM25 tokenizer). Pass a `FunctionPtr` (a `std::shared_ptr<Function>`) to `CollectionSchema::AddFunction()` or to `FunctionScore::AddFunction()`.

**PARAMETERS:**

- **name** (*std::string*)

      Unique name for this function instance.

- **function_type** (*FunctionType*)

      Type of function. Values: `UNKNOWN=0`, `BM25=1`, `TEXTEMBEDDING=2`, `RERANK=3`.

- **description** (*std::string*)

      Optional description. Default: `""`.

**METHODS:**

- `const std::string& Name() const` / `Status SetName(std::string name)`

      Gets or sets the function name.

- `FunctionType GetFunctionType() const` / `virtual Status SetFunctionType(FunctionType ft)`

      Gets or sets the function type.

- `const std::vector<std::string>& InputFieldNames() const` / `Status AddInputFieldName(std::string name)`

      Gets or adds input field names (fields this function reads from).

- `const std::vector<std::string>& OutputFieldNames() const` / `Status AddOutputFieldName(std::string name)`

      Gets or adds output field names (fields this function writes to).

- `virtual Status AddParam(const std::string& key, const std::string& value)`

      Adds an extra key-value parameter specific to the function type.

- `virtual const std::unordered_map<std::string, std::string>& Params() const`

      Returns all extra parameters.

## RRFRerank

Reciprocal Rank Fusion reranker for `HybridSearch`. Combines multiple ranked lists by summing reciprocal ranks. Set via `FunctionScore::AddFunction()` or `HybridSearchRequest::WithRerank()`.

- **k** (*int*) — Smoothing constant that controls how steeply rank differences are penalized. Default: `60`.

- `Status SetK(int k)` — Updates the smoothing constant after construction.

## WeightedRerank

Weighted reranker for `HybridSearch`. Assigns a scalar weight to each sub-search result and combines scores by weighted sum.

- **weights** (*std::vector<float>*) — Weight for each sub-search, in the order the sub-requests are added to the `HybridSearchRequest`. Values should sum to 1.0 but are not required to.

- `Status SetWeights(const std::vector<float>& weights)` — Replaces the weight vector.

## BoostRerank

Score-boost reranker for a single `Search`. Applies conditional score multipliers based on a filter expression.

- `void SetFilter(const std::string& filter)` — Boolean filter expression; entities matching the filter receive the boosted score.

- `void SetWeight(float weight)` — Multiplicative factor applied to the baseline score for matching entities.

- `void SetRandomScoreField(const std::string& field)` — Field used as a source of random scores (for score randomization).

- `void SetRandomScoreSeed(int64_t seed)` — Seed for the random score generator.

## DecayRerank

Decay reranker for a single `Search`. Reduces scores for entities whose field values are far from an origin point using a decay curve.

- `void SetFunction(const std::string& name)` — Decay curve type: `"gauss"`, `"exp"`, or `"linear"`.

- `template<typename T> void SetOrigin(T val)` — Reference point from which decay is calculated. Applicable to INT8/INT16/INT32/INT64/FLOAT/DOUBLE fields.

- `template<typename T> void SetOffset(T val)` — Half-width of the no-decay zone around the origin where items retain full scores.

- `template<typename T> void SetScale(T val)` — Distance from the origin at which the score equals the decay value.

- `void SetDecay(float val)` — Score value at the scale distance (e.g., `0.5` means half the original score).

## ModelRerank

Model-based reranker for a single `Search`. Sends search results to an external reranking model for rescoring.

- `void SetProvider(const std::string& name)` — Reranking service provider name.

- `void SetQueries(const std::vector<std::string>& queries)` — List of query strings passed to the model. The count must match the number of queries in the search operation.

- `void SetEndpoint(const std::string& url)` — URL of the reranking model service.

- `void SetMaxClientBatchSize(int64_t val)` — Maximum number of documents processed per batch.

## Example

