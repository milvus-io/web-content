# run_analyzer()

This operation processes the input data and generates tokenized output.

## Request Syntax

```plaintext
run_analyzer(
    texts: Union[str, List[str]],
    analyzer_params: Union[str, Dict, None] = None,
    with_hash: bool = False,
    with_detail: bool = False,
    timeout: Optional[float] = None,
)
```

**PARAMETERS:**

- `texts` (*Union[str, List[str]]*) -

    The input text or a list of texts to be analyzed.

- `analyzer_params` (*Union[str, Dict, None]*) -

    The parameters for the analyzer. If set to `None`, defaults to an empty dictionary.

- `with_hash` (*bool*) -

    Optional flag indicating whether to include hash-based processing.

- `with_detail` (*bool*) -

    Optional flag indicating whether to return detailed analysis output.

- `timeout` (*float* | *None*) -

    The timeout duration for this operation. Setting this to *None* indicates that this operation timeouts when any response or error occurs.

**RETURN TYPE:**

*List[str], List[List[str]]*

**RETURNS:**

A tuple containing:

- A list of strings representing the primary tokenized output.

- A list of lists of strings representing detailed token information (if detailed output is enabled).

**EXCEPTIONS:**

- `MilvusException` - Raised if any error occurs during this operation.

## Examples

```plaintext
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
)

analyzer_params = {
    "type": "standard", # Uses the standard built-in analyzer
    "stop_words": ["a", "an", "for"] # Defines a list of common words (stop words) to exclude from tokenization
}

# Sample text to analyze
text = "An efficient system relies on a robust analyzer to correctly process text for various applications."

# Run analyzer
result = client.run_analyzer(
    text,
    analyzer_params
)

print(result)

# Expected output:
# ['efficient', 'system', 'relies', 'on', 'robust', 'analyzer', 'to', 'correctly', 'process', 'text', 'various', 'applications']
```
