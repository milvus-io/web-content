# ListImportJobsOption

This type configures a request to list bulk import jobs for a collection via the RESTful API. Construct it with `NewListImportJobsOption()`, which defaults to `CurrentPage: 1, PageSize: 10`. Chain `With*` builder methods to change pagination, add API keys, or override defaults.

```go
type ListImportJobsOption struct {
    URL            string
    CollectionName string
    ClusterID      string
    APIKey         string
    PageSize       int
    CurrentPage    int
}
```

**FIELDS:**

- **URL** (*string*) -
The base URL of the Milvus or Zilliz Cloud cluster. Do not include the path; the function appends `/v2/vectordb/jobs/import/list` automatically.

- **CollectionName** (*string*) -
The name of the collection whose import jobs should be listed. Required.

- **ClusterID** (*string*) -
The Zilliz Cloud cluster ID. Optional; used only for cloud imports.

- **APIKey** (*string*) -
The authorization token sent as a `Bearer` header. Optional; required when the server enforces token-based auth.

- **PageSize** (*int*) -
The number of jobs to return per page. Default is `10`. Use `WithPageSize()` to override.

- **CurrentPage** (*int*) -
The page index, starting from `1`. Default is `1`. Use `WithCurrentPage()` to override.

**BUILDER METHODS:**

- `WithAPIKey(key string)`
This sets the authorization token sent as a `Bearer` header.

- `WithPageSize(pageSize int)`
This sets the number of jobs returned per page.

- `WithCurrentPage(currentPage int)`
This sets the page index, starting from `1`.

**CONSTRUCTORS:**

- `NewListImportJobsOption(uri string, collectionName string)`

    This creates a ListImportJobsOption with sensible defaults (`CurrentPage: 1, PageSize: 10`).