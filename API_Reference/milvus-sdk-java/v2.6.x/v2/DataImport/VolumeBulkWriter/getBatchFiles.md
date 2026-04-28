# getBatchFiles()

This operation returns a list of files passed to the current VolumeBulkWriter instance.

```java
public List<List<String>> getBatchFiles()
```

## Request Syntax

```java
volumeBulkWriter.getBatchFiles()
```

**PARAMETERS:**

*None*

**RETURNS TYPE:**

*List\<List\<String>>*

## Example

```java
List<List<String>> batchFiles = volumeBulkWriter.getBatchFiles();
```

