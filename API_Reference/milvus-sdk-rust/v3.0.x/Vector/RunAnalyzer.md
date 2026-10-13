# RunAnalyzer()

Runs an analyzer on the supplied texts and returns the resulting tokens.

```rust
pub async fn run_analyzer(&self, request: RunAnalyzerRequest) -> Result<RunAnalyzerResponse>
```

## Request Syntax

```rust
let request = RunAnalyzerRequest::builder()
    .collection_name("books")
    .field_name("title")
    .texts(["The quick brown fox"])
    .with_detail(true)
    .build()?;
```

**REQUEST FIELDS:**

- `analyzer_params: Option<serde_json::Value>`

    Inline analyzer configuration as a JSON object. When provided, `collection_name` and `field_name` are not required; otherwise the collection's field analyzer is used.

- `texts: Vec<String>`

    The texts to analyze. At least one text is required.

- `with_detail: bool`

    Whether the response includes token detail such as offsets and positions.

- `with_hash: bool`

    Whether the response includes the token hashes.

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection that owns the field analyzer. Required when `analyzer_params` is not provided.

- `field_name: String`

    Name of the field whose analyzer is used. Required when `analyzer_params` is not provided.

- `analyzer_names: Vec<String>`

    Names of the analyzers to run.

**RETURN TYPE:**

*Result\<RunAnalyzerResponse\>*

**RETURNS:**

A **RunAnalyzerResponse** containing the tokens produced for each analyzed text. Returns an `Error` if the operation fails.

```rust
RunAnalyzerResponse
    results() // -> &[AnalyzerResult]
```

**METHODS:**

- `results()` (*&[AnalyzerResult]*) -

    The analyzer results, one per input text.

    - `get_tokens()` (*&[AnalyzerToken]*) -

        The tokens produced by the analyzer.

        - `get_text()` (*&str*) -

            The token text.

        - `get_start_offset()` (*i64*) -

            The start offset of the token in the input text.

        - `get_end_offset()` (*i64*) -

            The end offset of the token in the input text.

        - `get_position()` (*i64*) -

            The position of the token.

        - `get_position_length()` (*i64*) -

            The number of positions the token spans.

        - `get_hash()` (*u32*) -

            The hash of the token.

## Example

```rust
let request = RunAnalyzerRequest::builder()
    .collection_name("books")
    .field_name("title")
    .texts(["The quick brown fox"])
    .with_detail(true)
    .build()?;
let resp = client.run_analyzer(request).await?;
```
