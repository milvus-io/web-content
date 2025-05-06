---
id: lindera-tokenizer.md
title: "Lindera"
summary: "The lindera tokenizer performs dictionary-based morphological analysis. It is a good choice for languages—such as Japanese, Korean, and Chinese—whose words are not separated by spaces."
---

# Lindera

The `lindera` tokenizer performs dictionary-based morphological analysis. It is a good choice for languages—such as Japanese, Korean, and Chinese—whose words are not separated by spaces.

## Configuration

To configure an analyzer using the `lindera` tokenizer, set `tokenizer.type` to `lindera` and choose a dictionary with `dict_kind`.

```python
analyzer_params = {
    "tokenizer": {
      "type": "lindera"，
      "dict_kind": "ipadic"
    }
}
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>type</code></p></td>
     <td><p>The type of tokenizer. This is fixed to <code>"lindera"</code>.</p></td>
   </tr>
   <tr>
     <td><p><code>dict</code></p></td>
     <td><p>A list of dictionaries used to define vocabulary. Possible values:</p><ul><li><p><code>ipadic</code>: Japanese</p></li><li><p><code>ko-dic</code>: Korean</p></li><li><p><code>cc-cedict</code>: Mandarin Chinese (traditional/simpl.)</p></li></ul></td>
   </tr>
</table>

After defining `analyzer_params`, you can apply them to a `VARCHAR` field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to [Example use](analyzer-overview.md#Example-use).

## Examples

Before applying the analyzer configuration to your collection schema, verify its behavior using the `run_analyzer` method.

### Analyzer configuration

```python
analyzer_params = {
    "tokenizer": {
      "type": "lindera",
      "dict_kind": "ipadic"
    }
}
```

### Verification using `run_analyzer`

```python
# Sample text to analyze
sample_text = "東京スカイツリーの最寄り駅はとうきょうスカイツリー駅で"

# Run the standard analyzer with the defined configuration
result = MilvusClient.run_analyzer(sample_text, analyzer_params)
print(result)
```

### Expected output

```plaintext
{tokens: ['東京', 'スカイ', 'ツリー', 'の', '最寄り駅', 'は', 'とう', 'きょう', 'スカイ', 'ツリー', '駅', 'で']} 
```