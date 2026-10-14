# getBatchFiles()

This operation returns a list of files passed to the current LocalBulkWriter instance.

```java
public List<List<String>> getBatchFiles()
```

## Request Syntax

```java
localBulkWriter.getBatchFiles()
```

**PARAMETERS:**

*None*

**RETURN TYPE:**

*List\<List\<String>>*

**RETURNS:**

A list of file paths. Each inner list holds the column-based file paths for one batch of data.

## Example

```java
List<List<String>> batchFiles = localBulkWriter.getBatchFiles();
```
