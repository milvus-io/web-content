# EmbeddedText

An embedded text used for searching text stored in a struct field of a collection, where the text is embedded on the server side during the search. It implements [BaseVector](BaseVector.md).

```java
io.milvus.v2.service.vector.request.data.EmbeddedText
```

## Constructor

Constructs an embedded text from a string.

```java
EmbeddedText(String data)
```

**RETURNS:**

An **EmbeddedText** instance.

**METHODS:**

- `getPlaceholderType()` (*PlaceholderType*)

    Returns the placeholder type of an embedded text, `PlaceholderType.VarChar`.

- `getData()` (*Object*)

    Returns the text data as a string.

## Example

```java
import io.milvus.v2.service.vector.request.data.EmbeddedText;

EmbeddedText text = new EmbeddedText("some text to search");
```
