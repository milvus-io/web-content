# AnalyzerResults

This page documents `AnalyzerResults`, `AnalyzerResult`, and `AnalyzerToken`. `AnalyzerResults` is a type alias for `std::vector<AnalyzerResult>` and is returned via `Results()` on a `RunAnalyzerResponse`. Each `AnalyzerResult` corresponds to one input text string and contains the list of tokens produced by the analyzer.

## AnalyzerResults

Access the per-text results via the standard vector API:

## AnalyzerResult

One `AnalyzerResult` holds all tokens for a single input text.

- `const std::vector<AnalyzerToken>& Tokens() const`

      Returns the list of tokens produced by the analyzer for this input text.

## AnalyzerToken

`AnalyzerToken` is a plain struct describing a single token.

- **token_** — The token string (e.g., a word or sub-word).

- **start_offset_** — Byte offset in the original text where this token starts.

- **end_offset_** — Byte offset in the original text where this token ends.

- **position_** — Position index of the token in the token sequence.

- **position_length_** — Number of positions this token spans (usually `1`).

- **hash_** — 32-bit hash of the token string.

## Example

