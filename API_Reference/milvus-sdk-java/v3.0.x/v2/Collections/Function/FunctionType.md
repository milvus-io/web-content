# FunctionType

Represents the supported server-side function types and provides conversion by name or numeric code.

```java
public enum FunctionType
```

## Constants

### UNKNOWN(0)

Represents an unknown or unsupported function type. `fromName()` and `fromCode()` return this value when no match is found.

### BM25(1)

Represents the BM25 full-text scoring function.

### TEXTEMBEDDING(2)

Represents a text-embedding function.

### RERANK(3)

Represents a reranking function.

### MINHASH(4)

Represents a MinHash function.

### MOLFINGERPRINT(5)

Represents a molecular-fingerprint function.

**RETURNS:**

*FunctionType*

An enum value describing the server-side function type.

## Example

```java
FunctionType byName = FunctionType.fromName("MinHash");
FunctionType byCode = FunctionType.fromCode(5);

int code = byName.getCode();
String name = byCode.getName();
```
