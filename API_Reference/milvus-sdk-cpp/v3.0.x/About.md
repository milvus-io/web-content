# About Milvus C++ SDK

The Milvus C++ SDK is an open-source project and its source code is hosted on [GitHub](https://github.com/milvus-io/milvus-sdk-cpp).

## Installation

The C++ SDK is installed from source. See the [Development Guide](https://github.com/milvus-io/milvus-sdk-cpp/blob/master/DEVELOPMENT.md) for details on how to compile and install it. The SDK uses CMake and Conan; the build produces both static and shared libraries you can link into your application.

After installation, include the client header and link against the SDK:

```cpp
#include "milvus/MilvusClientV2.h"
```

## Quick Start

The following example connects to Milvus, creates a collection, and runs a vector search using the V2 client API, which is the current API of this SDK.

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>

int main() {
    auto client = milvus::MilvusClientV2::Create();
    milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
    auto status = client->Connect(connect_param);
    if (!status.IsOk()) {
        std::cerr << status.Message() << std::endl;
        return 1;
    }

    // Create a collection
    milvus::CollectionSchema schema("hello_milvus");
    schema.AddField(milvus::FieldSchema("id", milvus::DataType::INT64, "", true, false));
    schema.AddField(milvus::FieldSchema("embedding", milvus::DataType::FLOAT_VECTOR, "").WithDimension(3));
    auto create_status = client->CreateCollection(milvus::CreateCollectionRequest()
        .WithCollectionName("hello_milvus")
        .WithCollectionSchema(std::make_shared<milvus::CollectionSchema>(schema)));
    if (!create_status.IsOk()) {
        std::cerr << create_status.Message() << std::endl;
        return 1;
    }

    // Insert an entity
    auto id_data = std::make_shared<milvus::Int64FieldData>("id");
    id_data->Add(1);
    auto vec_data = std::make_shared<milvus::FloatVecFieldData>("embedding");
    vec_data->Add({0.1f, 0.2f, 0.3f});
    milvus::InsertResponse insert_response;
    auto insert_status = client->Insert(milvus::InsertRequest()
        .WithCollectionName("hello_milvus")
        .WithColumnsData({id_data, vec_data}),
        insert_response);
    if (!insert_status.IsOk()) {
        std::cerr << insert_status.Message() << std::endl;
        return 1;
    }

    // Search
    milvus::SearchResponse response;
    auto search_status = client->Search(milvus::SearchRequest()
        .WithCollectionName("hello_milvus")
        .WithAnnsField("embedding")
        .AddFloatVector({0.1f, 0.2f, 0.3f})
        .WithMetricType(milvus::MetricType::COSINE)
        .WithLimit(1),
        response);
    if (!search_status.IsOk()) {
        std::cerr << search_status.Message() << std::endl;
        return 1;
    }

    client->DropCollection(milvus::DropCollectionRequest().WithCollectionName("hello_milvus"));
    client->Disconnect();
    return 0;
}
```

## Compatibility

Milvus proto is backward compatible, so a later SDK version can work with an earlier Milvus server. The table lists the recommended SDK version validated for each Milvus version.

| Milvus version | Recommended SDK version |
|:-----:|:-----:|
| 2.6.x | v2.6.7 |
| 3.0.x | v3.0.3 |

## Contributing

We are committed to building a collaborative, exuberant open-source community for Milvus. Therefore, contributions to the Milvus C++ SDK are welcome from everyone. Refer to the [Contributing Guideline](https://github.com/milvus-io/milvus-sdk-cpp/blob/master/CONTRIBUTING.md) before making contributions to this project. You can [file an issue](https://github.com/milvus-io/milvus-sdk-cpp/issues/new) if you need any assistance or want to propose your ideas.

## License

[Apache License 2.0](LICENSE)
