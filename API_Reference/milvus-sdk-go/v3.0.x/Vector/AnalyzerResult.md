# AnalyzerResult

Represents the tokenized output of a text analyzer, returned by RunAnalyzer. Each result holds the tokens produced from one input text.

```go
type AnalyzerResult struct {
    Tokens []*Token
}
```

**FIELDS:**

- **Tokens** (*[]*Token*)

    The list of tokens produced by the analyzer.

## Token

Represents a single token produced by an analyzer.

```go
type Token struct {
    Text           string
    StartOffset    int64
    EndOffset      int64
    Position       int64
    PositionLength int64
    Hash           uint32
}
```

**FIELDS:**

- **Text** (*string*)

    The text of the token.

- **StartOffset** (*int64*)

    The start offset of the token in the input text.

- **EndOffset** (*int64*)

    The end offset of the token in the input text.

- **Position** (*int64*)

    The position of the token.

- **PositionLength** (*int64*)

    The length of the token position.

- **Hash** (*uint32*)

    The hash of the token.
