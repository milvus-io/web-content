# About Milvus GO SDK

Milvus GO SDK is an open-source project and its source code is hosted on [GitHub](https://github.com/milvus-io/milvus-sdk-go).

## Compatibility

| Milvus version | Recommended SDK version      |
| -------------- | ---------------------------- |
| 1.0.x | [1.0.0](https://github.com/milvus-io/milvus-sdk-go/tree/v1.0.0) |
| 1.1.x | [1.1.0](https://github.com/milvus-io/milvus-sdk-go/tree/v1.1.0) |
| 2.0.x	         | [2.0.0](https://github.com/milvus-io/milvus-sdk-go/tree/v2.0.0)|
| 2.1.x	         | [2.1.2](https://github.com/milvus-io/milvus-sdk-go/tree/v2.1.2)|

Note: Milvus and GO SDK are NOT compatible across major versions.

## Installation

Install via `go get`.

```shell
$ go get -u github.com/milvus-io/milvus-sdk-go/v2
```

Include Milvus GO SDK in your application.

```go
import "github.com/milvus-io/milvus-sdk-go/v2/client"

//...other snippet ...
client, err := client.NewGrpcClient(context.Background(), "address_of_milvus")
if err != nil {
    // handle error
}
client.HasCollection(context.Background(), "YOUR_COLLECTION_NAME")
```

## Contributing

We are committed to building a collaborative, exuberant open-source community for Milvus. Therefore, contributions to Milvus GO SDK are welcome from everyone. Refer to [Contributing Guideline](https://github.com/milvus-io/milvus-sdk-go/blob/master/CONTRIBUTING.md) before making contributions to this project. You can [file an issue](https://github.com/milvus-io/milvus-sdk-go/issues/new/choose) if you need any assistance or want to propose your ideas.
