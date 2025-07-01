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

**RETURNS TYPE:**

*List\<List\<String>*

## Example

```java
List<List<String>> batchFiles = localBulkWriter.getBatchFiles();
```
