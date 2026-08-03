# RefreshExternalCollection()

This operation scans the data files in the schema-defined external storage and generates metadata files that record their mapping relationship to those data files.

```go
func (c *Client) RefreshExternalCollection(ctx context.Context, option RefreshExternalCollectionOption, callOptions ...grpc.CallOption) (*RefreshExternalCollectionResult, error)
```

## Request Syntax

```go
option := client.NewRefreshExternalCollectionOption(collectionName).
    WithExternalSource(externalSource string).
    WithExternalSpec(externalSpec string).
    WithDbName(dbName string)
    
result, err := client.RefreshExternalCollection(option)
```

**PARAMETERS:**

- **collectionName** (*string*) -

    The name of an existing external collection.

**BUILDER METHODS:**

- `WithExternalSource(externalSource string)`

    This sets the source data URI, which is similar to an AWS S3 object path.

- `WithExternalSpec(externalSpec string)`

    The external source specifications, which are a set of secondary parameters:

    - **format** (*string*) - 

        The format of the target source data files.

        Possible values are `parquet`, `vortex`, `lance-table`, and `iceberg-table`.

    - **extfs** (*string*) -  

        External file system settings in a stringified JSON structure.

        Possible options are as follows:

        - **access_key_id** (*string*) -

            The access key ID of your object storage service.

        - **access_key_val** (*string*) -

            The access key value of your object storage service.

        - **cloud_provider** (*string*) -

            The cloud provider of your object storage service.

        - **region** (*string*) -

            The region of your object storage service.

        - **use_iam** (*string*) -

            Whether to use AWS IAM for bucket access authentication. 

            Possible values are `"true"` or `"false"`.

        - **iam_endpoint** (*string*) -

            The AWS IAM STS endpoint.

        - **use_ssl** (*string*) -

            Whether to use SSL to access your object storage bucket.

            Possible values are `"true"` or `"false"`.

        - **use_virtual_host** (*string*) -

            Whether to use virtual hosting for bucket access. 

            For details, refer to [this article](https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html).

        - **storage_type** (*string*) -

            The storage type. Possible values is `remote`.

        - **role_arn** (*string*) -

            The AWS IAM Role ARN that is obtained from the bucket owner.

        - **external_id** (*string*) -

            The external ID obtained from the bucket owner.

        - **load_frequency** (*string*) -

            The interval at which Milvus retrieves temporary authentication credentials in seconds.

- `WithDbName(dbName string)`

    The name of the database to which the target external collection belongs.

**RETURN TYPE:**

*&ast;RefreshExternalCollectionResult*

**RETURNS:**

A type struct of the following shape.

```go
type RefreshExternalCollectionResult struct {
    JobID int64
}
```

**PARAMETERS:**

- **JobID** (*int64*) -

    An integer that indicates an asynchronous job that has been created.

## Examples

```go
refreshResult, err := client.RefreshExternalCollection(ctx,
    client.NewRefreshExternalCollectionOption("test_collection"))

jobID := refreshResult.JobID

for {
    progress, _ := client.GetRefreshExternalCollectionProgress(ctx,
        client.NewGetRefreshExternalCollectionProgressOption(jobID))

    fmt.Printf("State: %s\n", progress.State)

    if progress.State == entity.RefreshStateCompleted {
        fmt.Println("Refresh completed!")
        break
    }
    if progress.State == entity.RefreshStateFailed {
        fmt.Printf("Refresh failed: %s\n", progress.Reason)
        break
    }
    time.Sleep(2 * time.Second)
}
```
