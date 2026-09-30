---
id: synonym-filter.md
title: "Synonym"
summary: "Use the synonym filter to rewrite tokens with a synonym dictionary during text analysis."
---

# Synonym

The `synonym` filter rewrites tokens according to a synonym dictionary, so that related terms match during search. It supports two modes of operation and two ways of supplying the dictionary:

- **Operation modes** — `expand` mode preserves the original token and emits additional synonyms alongside it; normalization mode (`expand: false`) rewrites tokens to a canonical form.

- **Dictionary sources** — small dictionaries can be inlined into the filter configuration via the `synonyms` array; large dictionaries should be stored as a [file resource](manage-file-resources.md) and referenced via `synonyms_file`.

## Dictionary format

A synonym dictionary is a plain-text document (or inline array) in which each line defines one rule. Two rule forms are supported.

### Mapping rule

```plaintext
fast, quick => speedy
```

The tokens on the left (`fast`, `quick`) rewrite to the tokens on the right (`speedy`). Multiple targets are allowed:

```plaintext
small, little => tiny, compact
```

With `expand: true`, the original tokens are kept alongside the targets:

- Input `fast` with `expand: true` → `fast`, `speedy`

- Input `fast` with `expand: false` → `speedy`

### Equivalence group

```plaintext
happy, joyful, cheerful
```

All listed tokens are considered equivalent:

- With `expand: true`, any occurrence of any token in the group emits every token in the group. Input `happy` → `happy`, `joyful`, `cheerful`.

- With `expand: false`, every occurrence is rewritten to the first token in the group. Input `joyful` → `happy`; input `happy` is already the first token and is unchanged.

## Configuration

The `synonym` filter is a custom filter. Specify `"type": "synonym"` along with at least one of `synonyms` (inline) or `synonyms_file` (external), plus an `expand` flag.

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter": [
        {
            "type": "synonym",
            "synonyms": [                       # inline rules (optional)
                "fast, quick => speedy",
                "happy, joyful, cheerful",
            ],
            "synonyms_file": {                  # external rules (optional)
                "type": "remote",
                "resource_name": "en_synonyms",
                "file_name": "synonyms.txt",
            },
            "expand": True,
        }
    ],
}
```

The `synonym` filter accepts the following parameters.

<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Default</strong></p></th>
   </tr>
   <tr>
     <td><p><code>synonyms</code></p></td>
     <td><p>An inline array of rule strings. Each string uses the dictionary format described above. Suitable for small dictionaries (up to a few dozen rules).</p></td>
     <td><p>—</p></td>
   </tr>
   <tr>
     <td><p><code>synonyms_file</code></p></td>
     <td><p>A reference to a <a href="manage-file-resources.md">file resource</a> that stores synonym rules, one per line. Use for larger dictionaries. See <a href="synonym-filter.md#External-dictionary-file">External dictionary file</a> below.</p></td>
     <td><p>—</p></td>
   </tr>
   <tr>
     <td><p><code>expand</code></p></td>
     <td><p>A boolean flag that controls how rules apply. true preserves the original token and emits synonyms alongside it; false rewrites tokens to their canonical form (the right-hand side of a mapping, or the first token of an equivalence group).</p></td>
     <td><p>false</p></td>
   </tr>
</table>

You can specify `synonyms`, `synonyms_file`, or both. When both are present, the filter merges the two sources. The filter operates on tokens produced by the tokenizer; it must therefore be combined with a tokenizer such as the [standard](standard-tokenizer.md) tokenizer.

### External dictionary file

For production-sized dictionaries, register the file as a remote file resource and reference it from `synonyms_file`.

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

# Register the file once, then reference it from any analyzer that needs it.
client.add_file_resource(
    name="en_synonyms",
    path="file/synonyms.txt",     # full S3 object key, including rootPath
)

analyzer_params = {
    "tokenizer": "standard",
    "filter": [{
        "type": "synonym",
        "synonyms_file": {
            "type": "remote",
            "resource_name": "en_synonyms",
            "file_name": "synonyms.txt",
        },
        "expand": True,
    }],
}
```

See Manage File Resources for the full workflow (upload, register, list, remove) and for the alternative `"type": "local"` form.

## Examples

Before applying the analyzer to a collection schema, verify its behavior with `run_analyzer`. The following examples use the inline `synonyms` array for brevity; replace with `synonyms_file` for larger dictionaries.

### `expand: true` — keep the original, add synonyms

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

analyzer_params = {
    "tokenizer": "standard",
    "filter": [{
        "type": "synonym",
        "synonyms": [
            "fast, quick => speedy",
            "happy, joyful, cheerful",
        ],
        "expand": True,
    }],
}

print(client.run_analyzer(["a fast car"], analyzer_params))
# → [['a', 'fast', 'speedy', 'car']]

print(client.run_analyzer(["i am happy today"], analyzer_params))
# → [['i', 'am', 'happy', 'joyful', 'cheerful', 'today']]
```

Both `fast` and `happy` are preserved; their synonyms are emitted alongside.

### `expand: false` — rewrite to canonical form

```python
analyzer_params_norm = {
    "tokenizer": "standard",
    "filter": [{
        "type": "synonym",
        "synonyms": [
            "fast, quick => speedy",
            "happy, joyful, cheerful",
        ],
        "expand": False,
    }],
}

print(client.run_analyzer(["a fast car"], analyzer_params_norm))
# → [['a', 'speedy', 'car']]

print(client.run_analyzer(["i am happy today"], analyzer_params_norm))
# → [['i', 'am', 'happy', 'today']]
```

The mapping rule rewrites `fast` to `speedy`. The equivalence group leaves `happy` unchanged because it is the first token of the group; an input containing `joyful` or `cheerful` would have been rewritten to `happy`.