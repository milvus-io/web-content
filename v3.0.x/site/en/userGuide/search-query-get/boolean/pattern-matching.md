---
id: pattern-matching.md
title: "Pattern Matching"
summary: "Milvus supports string pattern matching with LIKE wildcard patterns and RE2 regular expressions. Use pattern filters to match prefixes, suffixes, substrings, structured codes, email domains, URL paths, and other string patterns in VARCHAR fields, JSON string paths, or ARRAY elements."
---

# Pattern Matching

In agentic search applications, vector search and grep-style pattern matching often complement each other. Vector search retrieves entities that are semantically relevant, while pattern matching narrows those results by exact string structures, such as error codes, log prefixes, email domains, URL paths, or identifiers.

In Milvus, you can express these pattern constraints in scalar filters with `LIKE` for simple wildcard matching, and `=~` or `!~` for [RE2](https://github.com/google/re2/wiki/syntax) regular expressions. You can combine these filters with `query`, `search`, or hybrid search.

Pattern matching expressions are written in the `filter` parameter. For example, the following query matches log messages that contain an error code such as `E1001`:

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

res = client.query(
    collection_name="log_events",
    # highlight-next-line
    filter='message =~ "E[0-9]{4}"',
    output_fields=["message", "severity"],
)
```

The examples on this page focus on the expression assigned to `filter`. You can use the same filter expression syntax in Milvus operations that accept a scalar filter, such as `query`, `search`, and hybrid search.

## Supported field types

Pattern matching is available for string values.

| Target | `LIKE` | Regex `=~` / `!~` | Notes |
| --- | --- | --- | --- |
| `VARCHAR` field | Yes | Yes | Typical target for pattern matching on string fields. |
| `JSON` path with `VARCHAR` cast type | Yes | Yes | The JSON path value must be a string for positive matches. If you create an index on the JSON path for acceleration, set `json_cast_type="varchar"`. |
| `ARRAY<VARCHAR>` element | Yes | Yes | Match a specific element by index, such as `tags[0]`. Pattern matching does **not** scan all elements; it only applies to the element at the specified index. |
| Numeric, Boolean, vector, `TEXT`, or other non-`VARCHAR` targets | No | No | Pattern matching is available only for `VARCHAR` values, JSON paths that resolve to strings, or indexed `ARRAY<VARCHAR>` elements. |

## Choose LIKE or regex

Choose the simplest operator that expresses the pattern you need.

If you need an exact string match, we recommend you use `==` instead of pattern matching. Use `LIKE` or regex only when the filter needs to match a pattern.

| Requirement | Recommended operator | Example | Description |
| --- | --- | --- | --- |
| Exact string equality | `==` | `status == "active"` | Exact match of the string `active`. |
| Simple prefix match | `LIKE` | `name LIKE "Prod%"` | Matches strings that start with `Prod`. |
| Simple suffix match | `LIKE` | `filename LIKE "%.json"` | Matches strings that end with `.json`. |
| Simple contains match | `LIKE` | `description LIKE "%vector database%"` | Matches values that contain `vector database` anywhere in the string. |
| Match a structured code or fixed-length pattern | `=~` | `code =~ "E[0-9]{4}"` | Matches strings that case-sensitively contain `E` followed by four digits, such as `E1001`. |
| Case-insensitive pattern matching | `=~` with `(?i)` | `message =~ "(?i)error"` | Matches `error`, `ERROR`, or other case variants. |
| Exclude values that match a regex pattern | `!~` | `message !~ "^DEBUG"` | Excludes strings that start with `DEBUG`. |

Use `LIKE` for simple wildcard matching. Use regex when the pattern needs character classes, repetition, alternation such as `error|failed`, anchors, or case-insensitive matching.

## Use LIKE

The `LIKE` operator is for simple wildcard matching on string values. It supports only the following wildcards:

| Wildcard | Description |
| --- | --- |
| `%` | Matches zero or more characters. |
| `_` | Matches exactly one character. |

### Common LIKE patterns

Use the position of `%` and `_` to control where the fixed text appears in the matched string.

| Requirement | Pattern | Filter example |
| --- | --- | --- |
| Starts with a prefix | `Prod%` | `filter = 'name LIKE "Prod%"'` |
| Ends with a suffix | `%.json` | `filter = 'filename LIKE "%.json"'` |
| Contains a substring | `%vector%` | `filter = 'description LIKE "%vector%"'` |
| Matches one character at a fixed position | `AB_%` | `filter = 'code LIKE "AB_%"'` |

### LIKE matching behavior

Use `LIKE` for prefix, suffix, contains, and fixed-position single-character matches. `LIKE` does not support character classes such as `[0-9]`, alternation such as `error|failed`, repeat counts such as `{4}`, anchors such as `^` or `$`, or case-insensitive flags such as `(?i)`. Use regex for those patterns.

Use `==` for exact full-string equality. Use `LIKE` only when the filter needs wildcard matching.

## Use regex

Use regex filters when the pattern requires regular expression features such as character classes, repetition, alternation, anchors, or case-insensitive matching. Milvus applies an [RE2](https://github.com/google/re2/wiki/syntax) regular expression to a string value.

The right side of `=~` or `!~` must be a string literal.

| Operator | Meaning | Example |
| --- | --- | --- |
| `=~` | Matches values that satisfy the regex pattern. | `filter = 'message =~ "E[0-9]{4}"'` |
| `!~` | Excludes values that satisfy the regex pattern. | `filter = 'message !~ "^DEBUG"'` |

### Common regex patterns

The following examples use common RE2 syntax in Milvus filter expressions. For complete regex syntax, refer to the [RE2 syntax](https://github.com/google/re2/wiki/syntax) reference.

| Requirement | Pattern | Filter example |
| --- | --- | --- |
| Contains literal text | `error` | `filter = 'message =~ "error"'` |
| Starts with a prefix | `^ERR` | `filter = 'code =~ "^ERR"'` |
| Ends with a suffix | `\.json$` | `filter = 'filename =~ "\\.json$"'` |
| Matches a digit sequence | `[0-9]+` | `filter = 'message =~ "[0-9]+"'` |
| Matches a fixed number of digits | `[0-9]{4}` | `filter = 'code =~ "[0-9]{4}"'` |
| Matches an email domain | `@example\.com$` | `filter = 'email =~ "@example\\.com$"'` |
| Matches case-insensitively | `(?i)error` | `filter = 'message =~ "(?i)error"'` |
| Matches the full string | `^prod-[0-9]+$` | `filter = 'name =~ "^prod-[0-9]+$"'` |

To match one of several words, use alternation with `|`:

```python
filter = 'message =~ "error|failed|timeout"'
```

When matching regex metacharacters literally, escape them in the regex pattern. For example, to match a literal dot (`\.` in regex), write `\\.` in a Python filter string:

```python
filter = 'email =~ "@gmail\\.com$"'
```

Note: Milvus regex filters follow RE2 syntax. If a regex pattern uses syntax that RE2 does not support or is otherwise invalid, Milvus rejects the filter expression. For details about regex metacharacters, flags, and matching behavior, refer to the [RE2 syntax](https://github.com/google/re2/wiki/syntax) reference.

### Matching behavior

**Substring matching**

Milvus regex matching uses substring semantics. The pattern does not need to match the entire field value. For example, the following filter matches both `E1001` and `failed with E1001 after retry`:

```python
filter = 'message =~ "E[0-9]{4}"'
```

To match the entire field value, use the `^` and `$` anchors:

```python
# Match only values that are exactly E followed by four digits
filter = 'code =~ "^E[0-9]{4}$"'
```

**Nullable VARCHAR fields**

Regex filters do not match null values. This applies to both `=~` and `!~`. If you want to exclude a regex pattern but keep null values, explicitly add `OR field IS NULL`:

```python
filter = 'message !~ "^DEBUG" OR message IS NULL'
```

**JSON paths**

For JSON paths, regex filters behave differently when the path is missing, null, or resolves to a non-string value:

| Filter | Includes missing/null/non-string values? | Notes |
| --- | --- | --- |
| `json_field["path"] =~ "pattern"` | No | Matches only string values that satisfy the regex pattern. |
| `json_field["path"] !~ "pattern"` | Yes | Returns entities where the path is missing, null, non-string, or a string that does not match the regex pattern. |

## Accelerate pattern matching with indexes

Milvus supports several index types on string fields that can be used together with `LIKE` and regex filters on `VARCHAR` fields or JSON string paths, such as `NGRAM`, `STL_SORT`, `INVERTED`, and `BITMAP`. Pattern matching can work without an index, but an index can improve performance on large datasets.

Index effectiveness depends on the pattern expression, whether Milvus can extract fixed literal substrings, and the cardinality and distribution of the target field. Prefix-style patterns such as `name LIKE "Prod%"` may benefit from different index strategies than infix or suffix patterns such as `description LIKE "%vector%"` or `filename LIKE "%.json"`.

Use the following table as a starting point, then benchmark with your own workload:

| Pattern or data characteristic | Index to consider | Notes |
| --- | --- | --- |
| Contains fixed literal substrings, such as `message =~ "error.*timeout"` or `message LIKE "%database%"` | `NGRAM` | Helps when Milvus can extract meaningful literal substrings from the pattern. For details, refer to [NGRAM](ngram.md). |
| Prefix, exact, or equality-like string filters, especially on fields with low to moderate cardinality | `STL_SORT`, `INVERTED`, or `BITMAP` | May be more effective when the field has repeated values or when the filter is close to exact matching. For details, refer to [STL_SORT](stl-sort.md), [INVERTED](inverted.md), and [BITMAP](bitmap.md). |
| Regex patterns without fixed literals, or patterns dominated by character classes, short tokens, or wildcards | Benchmark before relying on index acceleration | These patterns may provide limited index selectivity and can fall back to broader scans. |
