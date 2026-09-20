# SDK Map (user-guide snippets)

Per-SDK details for verifying/updating the user-guide code snippets. Read the
section for the SDK you are working on **before** writing or fixing snippets.

Paths inside `web-content` are relative to the repo root. SDK repos are cloned
from GitHub into `sdk-tmp/sdks/<repo>/` (gitignored) by **Step 0** — never
assume a local checkout. Ground truth for "latest API" is the SDK repo's git
tags.

## pymilvus

- **SDK repo**: `pymilvus` (clone → `sdk-tmp/sdks/pymilvus/`)
- **Snippet language**: `python` (reference baseline — pymilvus is the logic
  reference for every section)
- **Public API surface**: `pymilvus/` package; `MilvusClient` lives in
  `pymilvus/milvus_client/milvus_client.py`
- **Tags**: plain `vX.Y.Z` (ignore `-dev` tags)
- **Verify**: `git -C sdk-tmp/sdks/pymilvus show <tag>:pymilvus/milvus_client/milvus_client.py`

## milvus-sdk-java

- **SDK repo**: `milvus-sdk-java` (clone → `sdk-tmp/sdks/milvus-sdk-java/`)
- **Snippet language**: `java` (uses `MilvusClientV2`)
- **Public API surface**: `sdk-core/src/main/java/io/milvus/v2/`
- **Tags**: plain `vX.Y.Z` (e.g. `v3.0.9`)
- **Verify**: builder methods = `private` fields of `*Req` classes (Lombok
  `@Builder`); e.g. `git -C sdk-tmp/sdks/milvus-sdk-java show <tag>:sdk-core/src/main/java/io/milvus/v2/service/vector/request/SearchReq.java`

## milvus-sdk-node

- **SDK repo**: `milvus-sdk-node` (clone → `sdk-tmp/sdks/milvus-sdk-node/`)
- **Snippet language**: `javascript`
- **Public API surface**: `milvus/` (e.g. `milvus/MilvusClient.ts`,
  `milvus/grpc/*.ts`)
- **Tags**: plain `vX.Y.Z`; `About.md` pins no version (uses `latest`)
- **Verify**: `git -C sdk-tmp/sdks/milvus-sdk-node grep -n "async [a-zA-Z]*(" <tag> -- milvus/MilvusClient.ts milvus/grpc/GrpcClient.ts`

## milvus-sdk-go

- **SDK repo**: NOT standalone — the Go SDK is the `client/` module inside
  `milvus-io/milvus`. Step 0 clones with `prepare_sdk milvus` (→
  `sdk-tmp/sdks/milvus/`).
- **Snippet language**: `go`
- **Public API surface**: `client/` (module
  `github.com/milvus-io/milvus/client/v2`; the guide snippets import
  `milvusclient "github.com/milvus-io/milvus/client/v2/milvusclient"`)
- **Tags**: `client/vX.Y.Z` (e.g. `client/v2.6.5`); pre-releases carry a suffix
  (`client/v3.0.0-beta`). Constructor takes `*ClientConfig`.
- **Verify**: `git -C sdk-tmp/sdks/milvus show <tag>:client/milvusclient/collection.go`

## milvus-sdk-cpp

- **SDK repo**: `milvus-sdk-cpp` (clone → `sdk-tmp/sdks/milvus-sdk-cpp/`)
- **Snippet language**: `cpp` (usually missing from user guide — the typical gap)
- **Public API surface**: `src/include/milvus/` (request builders `WithXxx`,
  `MilvusClientV2.h`)
- **Tags**: plain `vX.Y.Z` (e.g. `v3.0.2`)
- **Verify**: `git -C sdk-tmp/sdks/milvus-sdk-cpp show <tag>:src/include/milvus/MilvusClientV2.h`
- **Live-run**: use a **prebuilt binary** from the `default-conan-local2` Conan
  repo (`https://milvus01.jfrog.io/artifactory/api/conan/default-conan-local2`):
  `conan install --requires="milvus-sdk-cpp/<ver>@milvus/dev" --build=never
  -s compiler.cppstd=14`. The published binaries are built with **cppstd=14** —
  match that setting (and compile the snippet with `-std=c++14`). If no prebuilt
  binary matches the version/system, **skip cpp verification** (report it; never
  build from source).

## milvus-sdk-csharp

- **SDK repo**: `milvus-sdk-csharp` (clone → `sdk-tmp/sdks/milvus-sdk-csharp/`)
- **Snippet language**: `csharp`
- **Public API surface**: `Milvus.Client/` (namespace `Milvus.Client`)
- **Tags**: `v2.2.x`, `v2.3.0-preview.1`, etc. (many pre-release suffixes)
- **Verify**: `git -C sdk-tmp/sdks/milvus-sdk-csharp grep -n "public .*Task<" <tag> -- Milvus.Client/`

## milvus-sdk-rust

- **SDK repo**: `milvus-sdk-rust` (clone → `sdk-tmp/sdks/milvus-sdk-rust/`)
- **Snippet language**: `rust`
- **Public API surface**: `src/v2/` (crate `milvus-sdk-rust`; `ClientV2` at
  `src/v2/client.rs`; types/requests under `src/v2/`)
- **Tags**: plain `vX.Y.Z` (e.g. `v3.0.1`, `v2.6.1`)
- **Verify**: `git -C sdk-tmp/sdks/milvus-sdk-rust show <tag>:src/v2/client.rs`;
  examples under `examples/v2/` show the client API
- **Conventions**: import via `use milvus::v2::prelude::*;`; connect with
  `ClientV2::new(&ConnectConfig::new().uri(uri).token("root:Milvus")).await?`;
  requests use `XxxRequest::builder()....build()?`
