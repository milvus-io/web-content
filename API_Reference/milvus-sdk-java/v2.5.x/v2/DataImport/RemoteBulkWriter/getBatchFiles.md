

# getBatchFiles()

This operation returns a list of files passed to the current LocalBulkWriter instance.

```java
public List<List<String>> getBatchFiles()
```

## Request Syntax

```java
remoteBulkWriter.getBatchFiles()
```

**PARAMETERS:**

*None*

**RETURNS TYPE:**

*List\&lt;List\&lt;String&gt;&gt;*

## Example

```java
List<List<String>> batchFiles = remoteBulkWriter.getBatchFiles();
```
