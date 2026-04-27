---
id: manage-file-resources.md
title: "Manage File Resources"
summary: "Register and manage external dictionary files that Milvus text analyzers can load at runtime."
---

# Manage File Resources

A **file resource** is a server-registered reference to an external dictionary file that text analyzers consume at runtime. In Milvus 3.0, four analyzer components can load their dictionaries from a file resource instead of from an inline array:

<table>
   <tr>
     <th><p><strong>Analyzer component</strong></p></th>
     <th><p><strong>Parameter that accepts a file resource</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="jieba-tokenizer.md">Jieba tokenizer</a></p></td>
     <td><p><code>extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="stop-filter.md">Stop filter</a></p></td>
     <td><p><code>stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="decompounder-filter.md">Decompounder filter</a></p></td>
     <td><p><code>word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="synonym-filter.md">Synonym filter</a></p></td>
     <td><p><code>synonyms_file</code></p></td>
   </tr>
</table>

File resources solve two practical problems with inline dictionary arrays:

- Real dictionaries are large. A Chinese Jieba vocabulary can be tens of thousands of lines; synonym tables are typically thousands of rules. Inlining them into analyzer configuration is impractical.

- The same dictionary is usually shared across collections. Registering it once, then referencing it by name, keeps schemas small and makes dictionary updates a single operation.

## File resource types

Milvus supports two file resource types with different management responsibilities:

<table>
   <tr>
     <th><p><strong>Type</strong></p></th>
     <th><p><strong>Where the file lives</strong></p></th>
     <th><p><strong>Who manages the file</strong></p></th>
     <th><p><strong>Fit</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Remote</strong></p></td>
     <td><p>In the object store (MinIO / S3 / GCS / Azure) that your Milvus cluster is already configured to use</p></td>
     <td><p>Milvus, via the <code>add_file_resource</code> / <code>remove_file_resource</code> / <code>list_file_resources</code> client APIs</p></td>
     <td><p>Recommended for most deployments.</p></td>
   </tr>
   <tr>
     <td><p><strong>Local</strong></p></td>
     <td><p>At the same absolute path on the local filesystem of every Milvus component (DataNode, QueryNode, StreamingNode)</p></td>
     <td><p>You — mount the file yourself, for example via a Kubernetes volume</p></td>
     <td><p>Open-source / self-hosted scenarios where you prefer to manage dictionary files outside Milvus.</p></td>
   </tr>
</table>

The rest of this page walks through both types, starting with the more common remote type.

## Prerequisites

- For **Remote** file resources, your Milvus deployment must be configured with an object store. Most deployments already are — check the `minio:` section of your `milvus.yaml` (or the equivalent Helm chart values). Note the `bucketName` and `rootPath` values; you will need them when registering file resources.

- For **Local** file resources, you must be able to place files on every Milvus pod / container at the same absolute path. How you do that depends on your deployment (bind mount, ConfigMap-backed volume, init container, etc.).

## Register a remote file resource

Registering a remote file resource is a three-step workflow: **upload** the file to object storage, **register** it with Milvus under a chosen name, then **reference** it from any analyzer that needs it.

### Step 1. Upload the dictionary file to object storage

Use your own tooling (`mc`, `aws s3 cp`, `boto3`, or any S3-compatible client) to put the file in the bucket that Milvus is configured to use.

For example, if `milvus.yaml` contains:

```yaml
minio:
  bucketName: milvus-bucket
  rootPath: file
```

Uploading a file named `chinese_terms.txt` with `rootPath` as the prefix places the object at `s3://milvus-bucket/file/chinese_terms.txt`.

The `path` argument you will pass to `add_file_resource` in Step 2 is the **full object key, including the rootPath prefix** — for the example above, `path="file/chinese_terms.txt"`. A path without the prefix (for example, just `"chinese_terms.txt"`) is rejected with the error `file resource path not exist`.

### Step 2. Register the file with `add_file_resource`

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

client.add_file_resource(
    name="chinese_terms",                # short, unique name you'll reference later
    path="file/chinese_terms.txt",       # full S3 object key, including the rootPath prefix
)
```

`add_file_resource` validates synchronously: the call returns only after Milvus has confirmed that the object exists at `path` in the configured object store. If the object is missing, the call raises `MilvusException(code=65535, "file resource path not exist")` — upload the file first, then retry.

The call is idempotent. Calling `add_file_resource` twice with the same `name` and `path` does not create duplicates.

### Step 3. Reference the file resource from an analyzer

Wherever an analyzer parameter accepts a file reference (`extra_dict_file`, `stop_words_file`, `word_list_file`, `synonyms_file`), use the canonical remote form:

```python
{
    "type": "remote",
    "resource_name": "chinese_terms",    # must match the name in add_file_resource
    "file_name": "chinese_terms.txt",    # filename only — Milvus uses this to identify the file inside the resource
}
```

All four analyzer parameters use the same shape; only the surrounding analyzer key differs. For concrete per-analyzer examples, see Jieba tokenizer, Stop filter, Decompounder filter, and Synonym filter.

The parameter names are `resource_name` and `file_name` — not `name` and `file`. Using `name` / `file` (or `"type": "resource"` instead of `"type": "remote"`) raises `MilvusException` at analyzer-creation time with a message like `resource name of remote file ... must be set`.

## List file resources

```python
resources = client.list_file_resources()
for r in resources:
    print(r.name, r.path)
# chinese_terms file/chinese_terms.txt
```

`list_file_resources()` returns a list of `FileResourceInfo` objects, each with `.name` and `.path` attributes. The empty cluster returns `[]`. There is no per-resource `get`; `list_file_resources` is the only read API.

## Remove a file resource

```python
client.remove_file_resource(name="chinese_terms")
```

`remove_file_resource` is idempotent: calling it for a name that does not exist returns `None` without raising.

Before removing a file resource, drop or alter any collections whose analyzer configurations reference it. Keeping a file resource around until no collection depends on it avoids the risk of analyzer lookups failing after the resource is gone.

## Use a local file resource

A **local** file resource points directly at a path on the local filesystem of each Milvus component. There is no `add_file_resource` call — Milvus does not track local resources. You place the file at the same absolute path on every relevant pod or container yourself, then reference it by path:

```python
{
    "type": "local",
    "path": "/var/lib/milvus/dicts/chinese_terms.txt",
}
```

Local file resources are only valid in deployments where you control the filesystems of DataNodes, QueryNodes, and StreamingNodes — typically self-hosted Milvus on bare-metal or on a Kubernetes cluster where you can add a volume mount. The file must exist at exactly the same absolute path on every component; otherwise some nodes fail when loading the analyzer.

The file is opened when the analyzer is first created. If the path does not exist at that point, the analyzer creation fails with `MilvusException(code=2000, "IOError: No such file or directory")`.

## Considerations

- **Cluster-wide availability is not instantaneous.** After `add_file_resource` returns, Milvus synchronizes the file to every component that needs it. During this brief window, a collection that references the resource may fail to create on nodes that have not yet synced. The typical fix is to retry the create call after a few seconds.

- **Remove only when no collection depends on the resource.** Drop or alter any collection whose analyzer configuration references the resource before calling `remove_file_resource`, to avoid analyzer lookups that fail to find the file.

- **Metadata only.** `list_file_resources()` returns `name` and `path` — there is no size, checksum, upload time, or other metadata. Keep track of dictionary versions with your own naming convention if you need it.
