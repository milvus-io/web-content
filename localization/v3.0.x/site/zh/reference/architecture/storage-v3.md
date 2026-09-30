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
    </button></h2><p>AI 数据集在 Collection 创建后往往会不断演变。随着模型和工作流的变化，团队可能需要添加文本、为现有实体生成新的向量字段，或者使用存储在 Milvus 之外的数据。要支持这些工作流，需要一种能够随数据集共同演变的存储模型。</p>
<p>Storage V3 在 Milvus 3.0 中提供了这种模型。它采用版本化存储布局，可整合随时间推移新增或重写的数据，同时应用程序仍可通过相同的 Milvus API 访问 Collections。</p>
<p>Storage V3 默认处于禁用状态。在执行 `<code translate="no">common.storage.useLoonFFI</code> ` 命令后，新的写入操作和压缩输出将使用 Storage V3。现有数据将保留在当前布局中，直到符合条件的数据被后台压缩重写为止。在此过渡期间，Milvus 可以读取两种布局。启用 Storage V3 是为了使用依赖于它的功能，而非作为一般的性能优化手段。</p>
<h2 id="Data-formats-in-Storage-V3" class="common-anchor-header">Storage V3 中的数据格式<button data-href="#Data-formats-in-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Storage V3 使用清单文件来描述 Collection 数据，使其独立于底层数据格式。这使得同一存储层既能处理由 Milvus 管理的数据，也能处理仍保存在外部系统中的数据。</p>
<h3 id="Managed-collection-file-formats" class="common-anchor-header">受管集合的文件格式<button data-href="#Managed-collection-file-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>对于管理 Collections，<code translate="no">dataNode.storage.format</code> 会为新的Storage V3数据选择文件格式。该设置支持以下值：</p>
<table>
<thead>
<tr><th>格式</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>默认的、被广泛采用的列式文件格式，具有广泛的生态系统兼容性和成熟的工具链。Parquet 将数据组织为行组，并支持按列编码和压缩，使 Milvus 能够仅读取所需的列，并高效处理大规模顺序扫描。</td></tr>
<tr><td><code translate="no">vortex</code></td><td>一种可选的下一代列式文件格式，基于可扩展、可组合的编码和丰富的统计信息构建。在 Milvus 中，Vortex 支持列投影、范围读取和随机访问读取。对于合适的工作负载，这些功能可减少不必要的数据读取。</td></tr>
</tbody>
</table>
<p>更改<code translate="no">dataNode.storage.format</code> 参数将影响新的Storage V3写入操作。现有文件将保持当前格式，直到压缩操作重写相应的分段为止。大多数部署应保留默认的<code translate="no">parquet</code> 格式，除非具有代表性的基准测试表明<code translate="no">vortex</code> 更适合其数据和访问模式。</p>
<h3 id="External-collections-and-supported-source-formats" class="common-anchor-header">外部 Collections 和 支持的源格式<button data-href="#External-collections-and-supported-source-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>External Collections allow Milvus to use data stored in external files or tables. Storage V3 supports the following external source formats:</p>
<table>
<thead>
<tr><th>格式</th><th>类别</th><th>预期源</th><th>Storage V3 支持情况</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>文件格式</td><td>包含 Parquet 文件的目录或对象存储前缀。</td><td>发现这些文件，读取其元数据和行组，并将它们记录在 Storage V3 清单中。</td></tr>
<tr><td><code translate="no">vortex</code></td><td>文件格式</td><td>包含 Vortex 文件的目录或对象存储前缀。</td><td>发现文件，并利用 Vortex 布局和统计信息进行投影、范围读取和随机访问读取。</td></tr>
<tr><td><code translate="no">lance-table</code></td><td>表格式</td><td>一个 Lance 数据集目录。</td><td>读取数据集元数据，并将它的片段映射到 Storage V3 清单中。</td></tr>
<tr><td><code translate="no">iceberg-table</code></td><td>表格式</td><td>一个 Iceberg 元数据 JSON 文件和快照 ID。</td><td>解析指定的快照，规划其数据文件，并保留位置删除元数据。不支持等值删除，必须在刷新外部Collection之前将其转换为位置删除。</td></tr>
</tbody>
</table>
<p>外部数据源为只读。Storage V3 会自行创建并刷新清单，而不会修改或复制源数据。随后，Milvus 即可通过外部 Collection 对数据构建索引，并执行搜索和查询。</p>
<h4 id="Cloud-storage-and-cross-account-authentication" class="common-anchor-header">云存储与跨账户身份验证</h4><p>下表仅描述了外部 Collection 如何访问存储在另一个云账户中的源数据，不涉及用于存储 Milvus 管理数据的对象存储。</p>
<table>
<thead>
<tr><th>云存储</th><th>支持的外部格式</th><th>外部Collection的跨账户身份验证</th></tr>
</thead>
<tbody>
<tr><td>Amazon S3</td><td>上述四种格式均支持。</td><td>指定客户拥有的 IAM 角色 ARN。Storage V3 使用 AWS STS<code translate="no">AssumeRole</code> 获取临时凭证，并根据需要刷新凭证。如果角色的信任策略有要求，您还可以提供外部 ID。</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>上述四种格式均支持。</td><td>指定目标服务账户。Storage V3 将冒充该服务账户，使用其短效 OAuth 访问令牌访问源存储桶，并在令牌过期前进行刷新。</td></tr>
<tr><td>Azure Blob Storage</td><td><code translate="no">parquet</code>、<code translate="no">vortex</code> 以及<code translate="no">lance-table</code> 。不支持<code translate="no">iceberg-table</code> 。</td><td>Milvus 通过<code translate="no">milvus-tools</code> 私有 gRPC 服务请求短效 SAS 凭据。Storage V3 使用这些 SAS 凭据访问源容器，并在凭据过期前进行更新。</td></tr>
<tr><td>Azure Data Lake Storage Gen2 (ADLS Gen2)</td><td>上述四种格式均支持。</td><td>Milvus 通过<code translate="no">milvus-tools</code> 私有 gRPC 服务请求短效 SAS 凭证。Storage V3 使用这些 SAS 凭证访问源容器，且凭证会在过期前自动刷新。</td></tr>
<tr><td>阿里云对象存储服务 (OSS)</td><td>上述四种格式均支持。</td><td>请指定客户拥有的 RAM 角色 ARN。Storage V3 将使用运行时的负载身份或 ECS RAM 角色来承接该角色，然后使用临时凭据访问源存储桶。</td></tr>
</tbody>
</table>
<p>有关外部Collection的配置和使用说明，请参阅<a href="/docs/zh/create-an-external-collection.md">《创建外部Collection》</a>。</p>
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
<tr><td>Vortex 文件格式</td><td>以 Vortex 文件格式写入新的托管 Collection 数据。</td><td><ul><li><a href="/docs/zh/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><code translate="no">dataNode.storage.format=vortex</code></li></ul></td></tr>
<tr><td><a href="/docs/zh/text.md"><code translate="no">TEXT</code> 字段</a></td><td>存储长源文本（例如段落、文档、工单或日志），而无需在 Collection Schema 中设置固定的最大长度。</td><td><a href="/docs/zh/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/zh/add-fields-to-an-existing-collection.md">函数生成的向量字段</a></td><td>向现有 Collection 添加 BM25 或 MinHash 函数，以便 Milvus 基于现有的<code translate="no">VARCHAR</code> 字段生成新的向量字段。Milvus 会通过后台压缩异步地为现有实体补入生成的值。</td><td><ul><li><a href="/docs/zh/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/zh/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/zh/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/zh/create-an-external-collection.md">外部Collection</a></td><td>无需将数据复制到受管 Collection 中，即可查询存储在 Milvus 外部的数据。当源数据发生变化时，请刷新外部 Collection。若要公开其他源字段，请参阅<a href="/docs/zh/alter-external-collection-schema.md">“修改外部 Collection Schema”</a>。</td><td><a href="/docs/zh/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
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
<p>一旦 Milvus 将数据写入 Storage V3，则不支持降级到无法读取 Storage V3 的 Milvus 版本。后续禁用 Storage V3 不会立即转换所有现有的 Storage V3 数据，也不会恢复与旧版本的兼容性。</p>
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
<li><a href="/docs/zh/add-fields-to-an-existing-collection.md">修改 Collection Schema</a></li>
<li><a href="/docs/zh/create-an-external-collection.md">创建外部Collection</a></li>
<li><a href="/docs/zh/install-overview.md">Milvus 部署选项概述</a></li>
<li><a href="/docs/zh/upgrade_milvus_standalone-helm.md">使用 Helm 图表升级 Milvus Standalone</a></li>
<li><a href="/docs/zh/upgrade_milvus_cluster-helm.md">使用 Helm 图表升级 Milvus 集群</a></li>
<li><a href="/docs/zh/configure_common.md">与 common 相关的配置</a></li>
<li><a href="/docs/zh/configure_datacoord.md">与 dataCoord 相关的配置</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">我们为何开发 Loon：一款专为不断变化的 AI 数据打造的存储引擎</a>——关于 Storage V3 设计动机的工程背景。</li>
</ul>
