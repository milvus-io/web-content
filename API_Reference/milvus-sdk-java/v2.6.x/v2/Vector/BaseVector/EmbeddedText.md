# EmbeddedText

An **EmbeddedText** instance represents text that is embedded at search time, for example when searching a BM25 or text-embedding function field. It implements the [BaseVector](BaseVector.md) interface.

```java
io.milvus.v2.service.vector.request.data.EmbeddedText
```

## Constructor

Constructs an embedded-text instance from a text string.

```java
EmbeddedText(String data)
```

**PARAMETERS:**

- **data** (*String*) -

    The text to embed.

**RETURN TYPE:**

EmbeddedText

**RETURNS:**

An EmbeddedText instance.

## Methods

- `getPlaceholderType()` - Returns the placeholder type of the vector.

- `getData()` - Returns the text data.

## Example

```java
import io.milvus.v2.service.vector.request.data.EmbeddedText;

EmbeddedText text = new EmbeddedText("Albert Einstein");
```
