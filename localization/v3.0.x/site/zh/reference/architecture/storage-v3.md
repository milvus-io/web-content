---
id: storage-v3.md
title: 存储 V3Compatible with Milvus 3.0.x
summary: 了解哪些 Milvus 3.0 功能需要 Storage V3、如何启用该功能，以及适用哪些兼容性限制。
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">存储 V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>AI 数据集在 Collection 创建后往往会不断演变。随着模型和工作流的变化，团队可能需要添加文本、为现有实体生成新的向量字段，或者使用存储在 Milvus 之外的数据。要支持这些工作流，需要一种能够随数据集共同演进的存储模型。</p>
<p>Storage V3 在 Milvus 3.0 中提供了这种模型。它采用版本化存储布局，可整合随时间推移新增或重写的数据，同时应用程序仍可通过相同的 Milvus API 访问 Collections。</p>
<p>Storage V3 默认处于禁用状态。<code translate="no">common.storage.useLoonFFI</code> 生效后，新的写入操作和压缩输出将使用 Storage V3。现有数据将保留在当前布局中，直到符合条件的数据被后台压缩重写为止。在此过渡期间，Milvus 可以读取两种布局。启用 Storage V3 是为了使用依赖于它的功能，而非作为一般的性能优化手段。</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">需要 Storage V3 的功能<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><table>
<thead>
<tr><th>功能</th><th>描述</th><th>所需配置</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/zh/text.md"><code translate="no">TEXT</code> 字段</a></td><td>存储长源文本（例如段落、文档、工单或日志），且无需在Collection Schema中设置固定的最大长度。</td><td><a href="/docs/zh/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/zh/add-fields-to-an-existing-collection.md">函数生成的向量字段</a></td><td>向现有 Collection 添加 BM25 或 MinHash 函数，以便 Milvus 基于现有的<code translate="no">VARCHAR</code> 字段生成新的向量字段。Milvus 会通过后台压缩，异步地为现有实体补入生成的值。</td><td><ul><li><a href="/docs/zh/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/zh/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/zh/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/zh/create-an-external-collection.md">External Collections</a></td><td>无需将数据复制到管理 Collections 中，即可查询存储在 Milvus 外部的数据。当源数据发生变化时，请刷新外部 Collection。若要公开其他源字段，请参阅<a href="/docs/zh/alter-external-collection-schema.md">“修改外部 Collection Schema”</a>。</td><td><a href="/docs/zh/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">启用 Storage V3 之前<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><div class="alert warning">
<p>一旦 Milvus 将数据写入 Storage V3，将不支持降级到无法读取 Storage V3 的 Milvus 版本。后续禁用 Storage V3 不会立即转换所有现有的 Storage V3 数据，也不会恢复与旧版本的兼容性。</p>
</div>
<p>在启用 Storage V3 之前，请考虑以下数据行为：</p>
<ul>
<li>由于<code translate="no">dataCoord.compaction.storageVersion.enabled</code> 默认处于启用状态，符合条件的现有数据可通过后台压缩逐步迁移至Storage V3。</li>
<li>禁用 Storage V3 会更改未来写入操作及符合条件的压缩输出所使用的目标存储版本。此操作不会同步转换所有现有的 Storage V3 数据，也不会确保版本降级的安全性。</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">启用 Storage V3<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>在 Milvus 配置中将 `<code translate="no">common.storage.useLoonFFI</code> ` 设置为 `<code translate="no">true</code> `：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 将此设置视为可刷新设置。请通过部署环境支持的配置更新工作流应用此更改。仅编辑静态配置文件并不能保证运行中的部署已接收新值。</p>
<p>如果您计划将一个函数及其生成的向量字段添加到现有Collection中，还需启用现有数据回填所需的两个压缩设置：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>针对现有实体的函数输出是通过后台压缩异步生成的。Schema更新成功并不意味着所有现有实体的回填都已完成。</p>
<h2 id="Related-documentation" class="common-anchor-header">相关文档<button data-href="#Related-documentation" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ul>
<li><a href="/docs/zh/text.md">文本字段</a></li>
<li><a href="/docs/zh/add-fields-to-an-existing-collection.md">修改集合 Schema</a></li>
<li><a href="/docs/zh/create-an-external-collection.md">创建外部Collection</a></li>
<li><a href="/docs/zh/install-overview.md">Milvus 部署选项概述</a></li>
<li><a href="/docs/zh/upgrade_milvus_standalone-helm.md">使用 Helm 图表升级 Milvus Standalone</a></li>
<li><a href="/docs/zh/upgrade_milvus_cluster-helm.md">使用 Helm 图表升级 Milvus 集群</a></li>
<li><a href="/docs/zh/configure_common.md">与 common 相关的配置</a></li>
<li><a href="/docs/zh/configure_datacoord.md">与 dataCoord 相关的配置</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">我们为何开发 Loon：一款专为不断变化的 AI 数据打造的存储引擎</a>——关于 Storage V3 设计动机的工程背景。</li>
</ul>
