# listImportJobs()

This operation lists all existing import jobs regarding the specified collection.

```java
public static String listImportJobs(String url, BaseListImportJobsRequest request)
```

## Request Syntax

```java
bulkImport.listImportJobs(
    url,
    request
)
```

**PARAMETERS:**

- **url** (*String*) -

    The endpoint of the connected Milvus instance.

- **request** (*[BaseListImportRequest](https://zilliverse.feishu.cn/docx/CN9sdiCicoERZpx9GhmcLa4Wn7g#JPKpdwFULo4m5DxydTKc9SKcndf)*) -  

    A **BaseImportRequest** instance.

**RETURN TYPE:**

*String*

**RETURNS:**

A list of import job IDs of the specified collection.

## BaseListImportRequest

A **BaseListImportRequest** instance is implemented in **MilvusListImportRequest**.

### MilvusListImportRequest

```java
MilvusListImportRequest.builder()
    .collectionName(String collectionName)
    .build()
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of the target collection of this operation.

## Example

```java

```

