---
id: regex-filter.md
title: "Regex"
summary: "The regex filter is a regular expression filter: any token produced by the tokenizer is kept only if it matches the expression you provide; everything else is discarded."
beta: Milvus 2.5.11+
---

# Regex

The `regex` filter is a regular expression filter: any token produced by the tokenizer is kept only if it matches the expression you provide; everything else is discarded.

## Configuration

The `regex` filter is a custom filter in Milvus. To use it, specify `"type": "regex"` in the filter configuration, along with an `expr` parameter to specify the desired regular expressions.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
{
    "tokenizer": "standard",
    "filter": [{
        "type": "regex",
        "expr": "^(?!test)" # keep tokens that do NOT start with "test"
    }]
}
```

```java
// java
```

```javascript
// node
```

```go
// go
```

```bash
# curl
```

The `regex` filter accepts the following configurable parameters.

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>expr</code></p></td>
     <td><p>A regular‑expression pattern applied to each token. Tokens that match are retained; non‑matches are dropped. For details on regex syntax, refer to <a href="https://docs.rs/regex/latest/regex/#syntax">Syntax</a>.</p></td>
   </tr>
</table>

The `regex` filter operates on the terms generated by the tokenizer, so it must be used in combination with a tokenizer.

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).

## Examples

Before applying the analyzer configuration to your collection schema, verify its behavior using the `run_analyzer` method.

### Analyzer configuration

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
{
    "tokenizer": "standard",
    "filter": [{
        "type": "regex",
        "expr": "^(?!test)"
    }]
}
```

```java
// java
```

```javascript
// node
```

```go
// go
```

```bash
# curl
```

### Verification using `run_analyzer`

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
# Sample text to analyze
sample_text = "testItem apple testCase banana"

# Run the standard analyzer with the defined configuration
result = MilvusClient.run_analyzer(sample_text, analyzer_params)
print(result)
```

```java
// java
```

```javascript
// node
```

```go
// go
```

```bash
# curl
```

### Expected output

```python
['apple', 'banana']
```

