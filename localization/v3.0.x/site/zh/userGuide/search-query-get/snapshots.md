---
id: snapshots.md
title: 快照Compatible with Milvus 3.0.x
summary: 使用快照来捕获特定时间点的Collection状态，以便进行回滚、版本控制和测试。
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">快照<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>快照是 Milvus Collection 在特定时间点的镜像，非常适合快速回滚、版本控制和测试。它捕获 Collection 在特定时间戳下的状态，并仅存储元数据和清单文件（如 Schema、索引和向量数据文件（二进制日志）），以实现高效的存储和恢复。</p>
<p>快照是数据的快速、特定时间点的镜像，适用于快速回滚或测试（<strong>时间跨度为数天至数周</strong>）。与此同时，备份则是独立的完整副本，单独存储以用于长期灾难恢复（<strong>时间跨度为数周至数年</strong>），并能更好地防范存储系统完全故障。</p>
<p>要创建备份，请参阅《<a href="/docs/zh/milvus_backup_overview.md">Milvus 备份</a>》。</p>
<h2 id="Snapshot-anatomy" class="common-anchor-header">快照结构<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 采用基于清单的快照架构，可在不复制实际向量数据的情况下，高效地捕获、存储和恢复特定时间点的数据。该架构将元数据管理与物理数据存储分离，从而实现轻量级快照，这些快照引用对象存储中现有的分段文件。</p>
<p>当您为 Collection 创建快照时，Milvus 会收集以下信息：</p>
<ul>
<li><p><strong>快照元数据</strong></p>
<p>它提供用于创建快照的基本信息，包括快照名称和描述、目标 Collection ID 以及创建快照的时间点。</p></li>
<li><p><strong>Collection description</strong></p>
<p>包含目标Collection的描述，包括其Schema定义、分区信息和属性。</p></li>
<li><p><strong>索引信息</strong></p>
<p>它存储索引元数据和索引文件的路径。</p></li>
<li><p><strong>分段数据</strong></p>
<p>该部分包含向量数据文件（binlogs）、删除日志（deltalogs）和索引文件。</p></li>
</ul>
<p>在上述信息中，Milvus 为每个分段生成一个 Apache Avro 清单文件，并将快照元数据、Collection 描述、索引信息以及清单文件的路径存储在一个 JSON 文件中。下图说明了快照的文件夹结构。</p>
<pre><code translate="no" class="language-text">snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
<button class="copy-code-btn"></button></code></pre>
<p>创建快照通常只需几毫秒，而恢复快照则根据数据量不同，可能需要几秒到几分钟不等。</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">对存储的影响及注意事项<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>一旦 Milvus 引用了快照中的某个分段或索引文件，除非您删除该快照，否则它不会对这些文件进行垃圾回收。快照占用的存储空间与目标 Collections 的大小成正比，且快照保留期间会产生对象存储费用。在极端情况下，单个快照甚至可能使您的对象存储成本翻倍。建议您</p>
<ul>
<li>定期删除旧快照以节省存储空间。</li>
<li>使用描述性名称和说明以便日后参考。</li>
<li>始终验证快照创建和还原结果。</li>
<li>跟踪快照的创建时间戳和存储使用情况，以便进行监控和故障排除。</li>
<li>保存还原作业 ID，以便进行监控和故障排除。</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">限制与约束<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>快照在创建后即成为不可变的。</li>
<li>您只能将快照还原到与原始快照位于同一集群中的新Collection中。</li>
<li>恢复后的 Collections 将保留相同的 Schema、分片数和分区数。</li>
<li>恢复的历史数据可能会与 TTL 策略发生冲突。建议您在创建快照之前禁用 TTL 或调整 TTL 设置。</li>
<li>若要将快照用作<code translate="no">milvus-table</code> 的外部数据源，该源快照必须来自常规的StorageV3 Milvus Collection。外部Collection的快照不支持作为<code translate="no">milvus-table</code> 的数据源。</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">进一步阅读<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/zh/manage-snapshots.md">管理快照</a>— 创建、列出、描述、固定、恢复和删除快照。</li>
<li><a href="/docs/zh/snapshot-use-cases.md">快照用例</a>— 常见模式和工作流。</li>
<li><a href="/docs/zh/milvus_backup_overview.md">Milvus 备份</a>— 跨集群的长期备份与恢复。</li>
</ul>
