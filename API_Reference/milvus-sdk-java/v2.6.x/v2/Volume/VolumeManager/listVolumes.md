# listVolumes()

Lists volumes with optional project, type, and pagination filters.

```java
public ListVolumesResponse listVolumes(ListVolumesRequest request)
```

## Request Syntax

```java
ListVolumesRequest.builder()
    .projectId(projectId)
    .pageSize(pageSize)
    .currentPage(currentPage)
    .type(type)
    .build();
```

**BUILDER METHODS:**

- `projectId(String projectId)`

    The ID of the Zilliz Cloud project.

- `pageSize(Integer pageSize)`

    The number of volumes to return on each page.

- `currentPage(Integer currentPage)`

    The page number to return.

- `type(String type)`

    The optional volume type filter: `MANAGED` or `EXTERNAL`.

**RETURNS:**

*ListVolumesResponse*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Lists volumes with optional project, type, and pagination filters.

```java
ListVolumesResponse response = volumeManager.listVolumes(
    ListVolumesRequest.builder()
        .projectId(PROJECT_ID)
        .type("S3")
        .currentPage(1)
        .pageSize(20)
        .build());
```
