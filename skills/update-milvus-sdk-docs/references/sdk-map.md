# SDK Map

Per-SDK specifics for updating the API reference docs. Read the section for the
SDK you are working on **before** starting. Each section documents: SDK repo
name, public API surface paths, doc tree conventions, page-mapping rules, tag
format, version-pin conventions, extraction commands, and known quirks.

Paths inside `web-content` are relative to the repo root. SDK repos are cloned
from GitHub into `sdk-tmp/sdks/<repo-name>/` by SKILL.md **Step 0** and removed when
done — never assume a local checkout, and never use one. The only exception is
milvus-sdk-go, which is a module inside `milvus-io/milvus` (see below).

## Online URL mapping

The live docs are served at `https://milvus.io/api-reference/<route>/<version-line>/<page>.md`.
The `<route>` is a **short slug**, not the local directory name; the
`<version-line>` is the doc version directory (e.g. `v3.0.x`, `v2.6.x`), and the
version line tracks the **Milvus** server version, not the SDK version:

| Directory (API_Reference/) | Route (URL slug) | Latest URL (Milvus 3.0) | Milvus 2.6 URL |
|---|---|---|---|
| `pymilvus` | `pymilvus` | `https://milvus.io/api-reference/pymilvus/v3.0.x/About.md` | `.../pymilvus/v2.6.x/About.md` |
| `milvus-sdk-java` | `java` | `https://milvus.io/api-reference/java/v3.0.x/About.md` | `.../java/v2.6.x/About.md` |
| `milvus-sdk-go` | `go` | `https://milvus.io/api-reference/go/v3.0.x/About.md` | `.../go/v2.6.x/About.md` |
| `milvus-sdk-node` | `node` | `https://milvus.io/api-reference/node/v3.0.x/About.md` | `.../node/v2.6.x/About.md` |
| `milvus-sdk-cpp` | `cpp` | `https://milvus.io/api-reference/cpp/v3.0.x/About.md` | `.../cpp/v2.6.x/About.md` |
| `milvus-sdk-csharp` | `csharp` | `https://milvus.io/api-reference/csharp/v2.2.x/About.md` | (only v2.2.x exists) |

So when the user quotes an `api-reference/<route>/...` URL, map it back to the
local directory via this table before editing. Current latest version line is
`v3.0.x` (Milvus 3.0); the `v2.6.x` line corresponds to Milvus 2.6.

## milvus-sdk-cpp

- **SDK repo**: `milvus-sdk-cpp` (cloned into `sdk-tmp/sdks/milvus-sdk-cpp/`)
- **Online URL**: `https://milvus.io/api-reference/cpp/<version-line>/` (route `cpp`; latest `v3.0.x`)
- **Public API surface**: `src/include/milvus/` (request builders, types, enums,
  responses, `MilvusClient.h`, `MilvusClientV2.h`)
- **Doc tree**: `API_Reference/milvus-sdk-cpp/<version-line>/` with categories
  Authentication, CDC, Collections, Client, Database, DataImport, FileResources,
  Management, Partitions, ResourceGroup, Snapshots, Vector.
- **Page mapping**:
  - `request/<category>/XxxRequest.h` → `<Category>/<Xxx>.md` operation page
    (e.g. `QueryRequest` → `Vector/Query.md`).
  - `types/*.h` → matching `<Category>/<Type>.md` page when one exists.
  - `MilvusClient.h` / `MilvusClientV2.h` → pages under `Client/`.
- **Base classes**: a page documents methods inherited from `RequestBase.h`,
  `CollectionRequestBase.h`, `DMLRequestBase.h`, `DQLRequestBase.h`,
  `SearchRequestBase.h`, `IndexRequestBase.h`, etc. — always include base-class
  members in completeness checks, not just the header matching the page name.
- **Tags**: plain `vX.Y.Z` (e.g. `v3.0.0`, `v3.0.1`, `v3.0.2`).
- **Version pins**: `About.md` holds the only version pins (install is
  from-source), so a patch bump usually touches just the compatibility table.
- **Extraction commands**:

  ```bash
  # what changed between tags (public headers only)
  git -C sdk-tmp/sdks/milvus-sdk-cpp diff --stat v3.0.1..v3.0.2 -- src/include/milvus/
  git -C sdk-tmp/sdks/milvus-sdk-cpp diff v3.0.1..v3.0.2 -- src/include/milvus/

  # side A: builders/getters actually available on a request class (incl. bases)
  git -C sdk-tmp/sdks/milvus-sdk-cpp grep -n "With[A-Z][A-Za-z]*(\|Set[A-Z][A-Za-z]*(\|Add[A-Z][A-Za-z]*(" v3.0.2 \
    -- src/include/milvus/request/dql/QueryRequest.h src/include/milvus/request/dql/DQLRequestBase.h src/include/milvus/request/dml/DMLRequestBase.h | \
    grep -o "With[A-Z][A-Za-z]*(\|Set[A-Z][A-Za-z]*(\|Add[A-Z][A-Za-z]*(" | sort -u

  # side B: builders/getters documented on a page
  grep -o "With[A-Z][A-Za-z]*(\|Set[A-Z][A-Za-z]*(\|Add[A-Z][A-Za-z]*(" \
    API_Reference/milvus-sdk-cpp/v3.0.x/Vector/Query.md | sort -u

  # doc comments for a header at a tag (ground truth for prose)
  git -C sdk-tmp/sdks/milvus-sdk-cpp show v3.0.2:src/include/milvus/request/dql/QueryRequest.h
  ```

- **Known pitfalls**:
  - Existing docs were transcribed from code comments, so typos flow from code
    into docs (e.g. "avaiable" in both `QueryRequest.h` and `Vector/Query.md`).
    Fix in docs; flag (don't silently edit) the code comment.
  - New internal-only headers (e.g. `BloomFilter.h`) are cache types — skip, do
    not create a page unless the symbol surfaces in a public request/response.

## pymilvus

- **SDK repo**: `pymilvus` (cloned into `sdk-tmp/sdks/pymilvus/`)
- **Online URL**: `https://milvus.io/api-reference/pymilvus/<version-line>/` (route `pymilvus`; latest `v3.0.x`)
- **Public API surface**: the `pymilvus/` package:
  - `pymilvus/milvus_client/milvus_client.py` — `MilvusClient` (main V2 API)
  - `pymilvus/client/*.py` — legacy client (`connections`, `utils`, ...)
  - `pymilvus/orm/*.py` — ORM API (`collection.py`, `schema.py`, `types.py`, ...)
  - `pymilvus/entities/*.py` — schema/entity types
  - `pymilvus/model/*.py` — embedding models
  - `pymilvus/bulk_writer/*.py` — bulk writer
  - `pymilvus/function_chain/`, `pymilvus/rerank/*`, `pymilvus/data/*`
- **Doc tree**: `API_Reference/pymilvus/<version-line>/` with categories
  MilvusClient, DataImport, EmbeddingModels, FileResource, ORM, Rerankers,
  Volume. Method pages are named `<method>.md` (e.g. `MilvusClient/Collections/create_collection.md`).
- **Page mapping**:
  - `MilvusClient.*` methods → `MilvusClient/<Group>/<method>.md`
    (Groups = Database, Collections, Vector, ...).
  - ORM classes/functions → `ORM/...`.
  - `pymilvus/model/*` → `EmbeddingModels/...`; bulk writer → `DataImport/...`.
- **Tags**: plain `vX.Y.Z` (`v3.0.0`, `v3.0.1`, `v2.6.x`, ...). Ignore `-dev`
  tags (e.g. `v3.0.1.dev0`).
- **Version pins**: `About.md` compatibility table + `pip install --upgrade
  pymilvus==v3.0.1` (note the odd `==v<ver>` form — keep the `v`).
- **Extraction commands**:

  ```bash
  git -C sdk-tmp/sdks/pymilvus diff --stat v3.0.0..v3.0.1 -- pymilvus/
  git -C sdk-tmp/sdks/pymilvus diff v3.0.0..v3.0.1 -- pymilvus/

  # public methods on MilvusClient at a tag
  git -C sdk-tmp/sdks/pymilvus show v3.0.1:pymilvus/milvus_client/milvus_client.py | grep -n "^    def \|^    async def "
  ```

- **Known quirks**: pages use Python signatures with `**PARAMETERS:**`
  describing each argument; new features are annotated "In PyMilvus vX.Y.Z or
  later". `milvus_client.py` is huge — grep per method rather than reading whole.

## milvus-sdk-java

- **SDK repo**: `milvus-sdk-java` (cloned into `sdk-tmp/sdks/milvus-sdk-java/`)
- **Online URL**: `https://milvus.io/api-reference/java/<version-line>/` (route `java`; latest `v3.0.x`)
- **Public API surface**: `sdk-core/src/main/java/io/milvus/`:
  - `io/milvus/v2/` — MilvusClientV2 (current API)
  - `io/milvus/client/`, `io/milvus/response/` — legacy V1 API
  - `sdk-bulkwriter/` — bulk writer
- **Doc tree**: `API_Reference/milvus-sdk-java/<version-line>/v2/` holds the V2
  pages with categories Authentication, CDC, Client, Collections, Database,
  DataImport, FileResources, Management, Partitions, ResourceGroup, Snapshots,
  Vector, Volume; `v1/` holds legacy pages. (The java tree nests the API version
  as `v1/` / `v2/` subfolders — do not confuse these with Milvus versions.)
- **Page mapping** (V2): `io/milvus/v2/service/<group>/request/*Req.java` →
  `<Category>/<Group>/...` pages (groups: `collection`, `vector`, `database`,
  `partition`, `index`, `rbac`→Authentication, `resourcegroup`, `snapshot`,
  `cdc`, `utility`). Request classes are Lombok `@Builder` classes — the builder
  method name for a parameter is **the field name** (e.g. `SearchReq.builder()
  .collectionName(...)`), NOT a `withXxx()`/`setXxx()` method.
- **Tags**: plain `vX.Y.Z` (latest `v3.0.9`; line `v3.0.x`).
- **Version pins**: `About.md` has many plain `3.0.5`-style literals (no `v`
  prefix) for Maven/Gradle coordinates of both `milvus-sdk-java` and
  `milvus-sdk-java-bulkwriter`.
- **Extraction commands**:

  ```bash
  git -C sdk-tmp/sdks/milvus-sdk-java diff --stat v3.0.5..v3.0.9 -- sdk-core/src/main/java/io/milvus/v2/
  git -C sdk-tmp/sdks/milvus-sdk-java diff v3.0.5..v3.0.9 -- sdk-core/src/main/java/io/milvus/v2/

  # NEW parameters: diff the private fields of every request class between tags.
  # Because java uses Lombok @Builder, an added field = a new builder method.
  git -C sdk-tmp/sdks/milvus-sdk-java diff v3.0.5..v3.0.9 -- sdk-core/src/main/java/io/milvus/v2/ \
    | grep -E "^[+-]    private " | sort | uniq

  # fields of one request class at a tag (side A for completeness checks)
  git -C sdk-tmp/sdks/milvus-sdk-java show v3.0.9:sdk-core/src/main/java/io/milvus/v2/service/vector/request/SearchReq.java \
    | grep -E "^    private " | sed -E 's/^    private (final )?//;s/^.* //;s/;//' | sort -u
  ```

- **Known quirks**: doc pages use `**PARAMETERS:**`/`**RETURNS:**` with Java
  types; `About.md` needs every version literal bumped (bulkwriter too). Do NOT
  grep for `with[A-Z]`/`set[A-Z]` — Lombok builders generate no such source
  methods; the `private` field list of a `*Req` class IS the parameter surface.

## milvus-sdk-go

- **Online URL**: `https://milvus.io/api-reference/go/<version-line>/` (route `go`; latest `v3.0.x`)
- **SDK repo**: NOT a standalone repo. The Go SDK is the `client/` module inside
  `milvus-io/milvus`. In Step 0 run `prepare_sdk milvus` (clone lands at
  `sdk-tmp/sdks/milvus/`). The milvus repo is far larger than the other SDK repos, so
  the partial clone takes noticeably longer.
- **Public API surface**: `client/` (Go module
  `github.com/milvus-io/milvus/client/v3`). Ignore everything outside `client/`
  (server-side `internal/`, `pkg/`, etc.).
- **Doc tree**: `API_Reference/milvus-sdk-go/<version-line>/`.
- **Tags**: Go SDK releases are tagged `client/vX.Y.Z` inside the milvus repo
  (e.g. `client/v3.0.0`, `client/v2.6.x`) — NOT plain `vX.Y.Z`. Diff with, e.g.:

  ```bash
  git -C sdk-tmp/sdks/milvus diff client/v3.0.0..client/v3.0.1 -- client/
  git -C sdk-tmp/sdks/milvus show client/v3.0.1:client/milvusclient/collection.go
  ```

- **Version pins**: `About.md` compatibility table links to the git tag
  (`client/v3.0.0`).
- *Extraction commands TBD (Go AST via `go doc` / `go/parser`).*

## milvus-sdk-node

- **SDK repo**: `milvus-sdk-node` (cloned into `sdk-tmp/sdks/milvus-sdk-node/`)
- **Online URL**: `https://milvus.io/api-reference/node/<version-line>/` (route `node`; latest `v3.0.x`)
- **Public API surface**: the `milvus/` directory:
  - `milvus/MilvusClient.ts` — top-level client facade
  - `milvus/grpc/*.ts` — gRPC channel (BaseClient, Collection, Database, Data,
    Partition, MilvusIndex, Resource, User)
  - `milvus/http/*.ts`, `milvus/types.ts`, `milvus/types/`, `milvus/const/`
- **Doc tree**: `API_Reference/milvus-sdk-node/<version-line>/` with categories
  Authentication, Client, Collections, Database, DataImport, Management,
  Partitions, ResourceGroup, Snapshot, Vector.
- **Page mapping**: client methods (e.g. `createCollection`) → category pages;
  types under `milvus/types/` → the page documenting that type.
- **Tags**: plain `vX.Y.Z` (latest `v3.0.4`; line `v3.0.x`).
- **Version pins**: NONE — `About.md` uses `v3.0.0+` → `**latest**` rows and
  `yarn add @zilliz/milvus2-sdk-node` with no pinned version, so patch bumps do
  NOT touch `About.md`.
- **Extraction commands**:

  ```bash
  git -C sdk-tmp/sdks/milvus-sdk-node diff --stat v3.0.3..v3.0.4 -- milvus/
  git -C sdk-tmp/sdks/milvus-sdk-node diff v3.0.3..v3.0.4 -- milvus/

  # public methods on the client at a tag
  git -C sdk-tmp/sdks/milvus-sdk-node grep -n "async [a-zA-Z]*(\|public [a-zA-Z]*(" v3.0.4 \
    -- milvus/MilvusClient.ts milvus/grpc/GrpcClient.ts milvus/http/HttpClient.ts
  ```

## milvus-sdk-csharp

- **SDK repo**: `milvus-sdk-csharp` (cloned into `sdk-tmp/sdks/milvus-sdk-csharp/`)
- **Online URL**: `https://milvus.io/api-reference/csharp/v2.2.x/` (route `csharp`; only `v2.2.x` exists)
- **Public API surface**: `Milvus.Client/` (namespace `Milvus.Client`).
- **Doc tree**: only `API_Reference/milvus-sdk-csharp/v2.2.x/` exists.
- **Page mapping**: `MilvusClient` methods → operation pages; the doc tree is
  small — map each method to its page directly by name.
- **Tags**: `v2.2.x`, `v2.3.0-preview.1`, etc. Note many versions are
  `-preview.N` / `-beta.N` / `-alpha.N` suffixed.
- **Version pins**: `About.md` lists compatibility rows (`v2.2.2 | main`) and
  `dotnet add package Milvus.Client --version 2.2.2-preview.5`.
- **Extraction commands**:

  ```bash
  git -C sdk-tmp/sdks/milvus-sdk-csharp diff --stat v2.2.2-preview.5..v2.2.2-preview.6 -- Milvus.Client/
  git -C sdk-tmp/sdks/milvus-sdk-csharp diff v2.2.2-preview.5..v2.2.2-preview.6 -- Milvus.Client/

  # public methods at a tag
  git -C sdk-tmp/sdks/milvus-sdk-csharp grep -n "public .*Task<" v2.2.2-preview.6 -- Milvus.Client/
  ```

- **Known quirks**: csharp docs are a single 2.2.x line; if the user asks to add
  a new version line, confirm the target tag's compatibility before creating a
  new directory.
