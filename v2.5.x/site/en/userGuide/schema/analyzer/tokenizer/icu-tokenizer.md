---
id: icu-tokenizer.md
title: "ICU"
summary: "The icu tokenizer is built on the Internationalization Components of Unicode (ICU) open‑source project, which provides key tools for software internationalization. By using ICU's word‑break algorithm, the tokenizer can accurately split text into words across the majority of the world’s languages."
---

# ICU

The `icu` tokenizer is built on the [Internationalization Components of Unicode](http://site.icu-project.org/) (ICU) open‑source project, which provides key tools for software internationalization. By using ICU's word‑break algorithm, the tokenizer can accurately split text into words across the majority of the world’s languages.

## Configuration

To configure an analyzer using the `icu` tokenizer, set `tokenizer` to `icu` in `analyzer_params`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "tokenizer": "icu",
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

The `icu` tokenizer can work in conjunction with one or more filters. For example, the following code defines an analyzer that uses the `icu` tokenizer and [remove punct filter](removepunct-filter.md):

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
analyzer_params = {
    "tokenizer": "icu",
    "filter": ["removepunct"]
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
analyzer_params = {
    "tokenizer": "icu",
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
sample_text = "Привет! Как дела?"

# Run the standard analyzer with the defined configuration
result = MilvusClient.run_analyzer(sample_text, analyzer_params)
print(result)
```

```java
// java
```

```javascript
// javascript
```

```go
// go
```

```bash
# restful
```

### Expected output

```plaintext
['Привет', '!', ' ', 'Как', ' ', 'дела', '?']
```

