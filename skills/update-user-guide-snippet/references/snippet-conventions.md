# Snippet Conventions

Per-SDK conventions for writing user-guide code snippets. Read the relevant
sections before drafting or fixing a snippet. The pymilvus block is always the
logic reference — translate its operation flow, keep the sub-step numbering.

## pymilvus — `python` (reference baseline)

- Client init:

  ```python
  from pymilvus import MilvusClient, DataType
  client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")
  ```

- Operations are plain `client.<method>(...)` calls; schema built with
  `MilvusClient.create_schema()` + `schema.add_field(...)`.
- When a section adds cpp/java/... from this baseline, mirror the exact steps and
  numbered comments.

## milvus-sdk-java — `java`

- Standard imports and init:

  ```java
  import io.milvus.v2.client.ConnectConfig;
  import io.milvus.v2.client.MilvusClientV2;

  ConnectConfig connectConfig = ConnectConfig.builder()
          .uri("http://localhost:19530")
          .token("root:Milvus")
          .build();
  MilvusClientV2 client = new MilvusClientV2(connectConfig);
  ```

- Requests are Lombok builders: `XxxReq.builder().field(...).build()`, passed to
  `client.method(req)`. Enums live in `io.milvus.v2.common.*` (e.g.
  `DataType.Int64`, `IndexParam.IndexType`).
- Verify class/package names against the latest `milvus-sdk-java` tag
  (`sdk-core/src/main/java/io/milvus/v2/`).

## milvus-sdk-node — `javascript`

- Init:

  ```javascript
  import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";
  const client = new MilvusClient({ address: "http://localhost:19530", token: "root:Milvus" });
  ```

- Methods are async (`await client.createDatabase({...})`). Options are plain
  objects; types in `@zilliz/milvus2-sdk-node`.

## milvus-sdk-go — `go`

- Init:

  ```go
  import "github.com/milvus-io/milvus/client/v2/milvusclient"
  cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
      Address: "http://localhost:19530",
      APIKey:  "root:Milvus",
  })
  ```

  Note: the constructor takes `*ClientConfig`, not a plain `Config` struct —
  match the real type.

- Operations use option builders: `cli.CreateCollection(ctx,
  milvusclient.NewCreateCollectionOption("name", schema))`. The module lives in
  `client/` inside `milvus-io/milvus`; verify against the latest `client/vX.Y.Z`
  tag (see the `update-milvus-sdk-docs` skill's sdk-map for the Go specifics).

## milvus-sdk-cpp — `cpp` (usually the missing SDK to add)

- Init and error handling:

  ```cpp
  #include "milvus/MilvusClientV2.h"
  using namespace milvus;
  auto client = MilvusClientV2::Create();
  util::CheckStatus(client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus")));
  ```

- Requests are fluent builders with `WithXxx(...)`, wrapped in
  `client->Operation(...)`. Verify method names against
  `src/include/milvus/` in the latest `milvus-sdk-cpp` tag.
- When adding cpp to a section that currently lacks it, translate the pymilvus
  flow step for step and keep the same numbered comments.

## RESTful — `bash`

- `curl` calls to `/v2/vectordb/...` with `"Authorization": "Bearer $TOKEN"` and a
  JSON body. Not an SDK — keep it but do not treat it as a baseline for logic.

## General

- Numbered comments must stay in sync across all SDKs in a section (the pymilvus
  block defines the numbering).
- Prefer the same endpoint/collection/db names across SDKs so readers can compare
  (e.g. `my_collection`, `my_database_1`).
- Never invent APIs: confirm each method/option exists at the SDK's latest tag.
