# About Milvus GO SDK

Milvus GO SDK is an open-source project and its source code is hosted on [GitHub](https://github.com/milvus-io/milvus/tree/master/client).

## Compatibility

| Milvus version | Recommended SDK version      |
| -------------- | ---------------------------- |
| 1.0.x | [1.0.0](https://github.com/milvus-io/milvus-sdk-go/tree/v1.0.0) |
| 1.1.x | [1.1.0](https://github.com/milvus-io/milvus-sdk-go/tree/v1.1.0) |
| 2.0.x	| [2.0.0](https://github.com/milvus-io/milvus-sdk-go/tree/v2.0.0)|
| 2.1.x	| [2.1.2](https://github.com/milvus-io/milvus-sdk-go/tree/v2.1.2)|
| 2.2.x	| [2.2.7](https://github.com/milvus-io/milvus-sdk-go/tree/v2.2.8)|
| 2.3.x	| [2.3.2](https://github.com/milvus-io/milvus-sdk-go/tree/v2.3.3)|
| 2.4.x	| [2.4.0](https://github.com/milvus-io/milvus-sdk-go/tree/v2.4.1)|
| 2.5.x	| [2.5.6](https://github.com/milvus-io/milvus/tree/client/v2.5.6/client)|
| 2.6.x	| [2.6.1](https://github.com/milvus-io/milvus/tree/client/v2.6.1/client)|

Note: Milvus and GO SDK are NOT compatible across major versions.

## Installation

Install via `go get`.

```shell
$ go get -u github.com/milvus-io/milvus/client/v2
```

<div class="alert note">

To install go sdk before v2.5.x, please use the following command:

```shell
$ go get -u github.com/milvus-io/milvus-sdk-go/v2
```

</div>

To include the Go MilvusClient in your application, you can use the following code snippet:

```go
import "github.com/milvus-io/milvus/client/v2/milvusclient"

 //...other snippet ...
 ctx, cancel := context.WithCancel(context.Background())
 defer cancel()

 milvusAddr := "YOUR_MILVUS_ENDPOINT"

 cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
 	Address: milvusAddr,
 })
 if err != nil {
 	// handle error
 }

 // Do your work with milvus client
```

<div class="alert note">

If you are using versions earlier than v2.5.x, you can use the following code snippet to connect to Milvus:

```go
import "github.com/milvus-io/milvus-sdk-go/v2/client"

//...other snippet ...
client, err := client.NewGrpcClient(context.Background(), "address_of_milvus")
if err != nil {
    // handle error
}
client.HasCollection(context.Background(), "YOUR_COLLECTION_NAME")
```

</div>

## Contributing

We are committed to building a collaborative, exuberant open-source community for Milvus. Therefore, contributions to Milvus GO SDK are welcome from everyone. Refer to [Contributing Guideline](https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md) before making contributions to this project. You can [file an issue](https://github.com/milvus-io/milvus/issues/new/choose) if you need any assistance or want to propose your ideas.
