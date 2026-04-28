---
id: snapshots.md
title: 快照Compatible with Milvus 3.0.x
summary: 使用快照捕捉时间点的 Collections 状态，以便进行回滚、版本控制和测试。
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
    </button></h1><p>快照是 Milvus Collections 的时间点映像，是快速回滚、版本控制和测试的理想选择。它捕捉 Collections 在特定时间戳的状态，只存储元数据和清单文件，如 Schema、索引和向量数据文件（binlogs），以便高效存储和恢复。</p>
<div class="alert note">
<p>快照是快速的时间点数据镜像，适用于快速回滚或测试<strong>（几天到几周</strong>）。同时，备份是单独存储的独立、完整副本，可用于长期灾难恢复<strong>（数周至数年</strong>），并能更好地防止整体存储故障。</p>
<p>要创建备份，请参阅<a href="/docs/zh/milvus_backup_overview.md">Milvus 备份</a>。</p>
</div>
<h2 id="Snapshot-anatomy" class="common-anchor-header">快照解剖<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 实现了基于清单的快照架构，可在不复制实际向量数据的情况下实现高效的时间点数据捕获、存储和恢复。该架构将元数据管理与物理数据存储分离开来，实现了引用对象存储中现有段文件的轻量级快照。</p>
<p>为一个 Collection 创建快照时，Milvus 会收集以下内容：</p>
<ul>
<li><p><strong>快照元数据</strong></p>
<p>提供创建快照的基本信息，包括快照名称和描述、目标 Collections ID 以及创建快照的时间点。</p></li>
<li><p><strong>Collections 描述</strong></p>
<p>它包含目标 Collections 的描述，包括其 Schema 定义、分区信息和属性。</p></li>
<li><p><strong>索引信息</strong></p>
<p>存储索引元数据和索引文件路径。</p></li>
<li><p><strong>分段数据</strong></p>
<p>它捕获了向量数据文件（binlogs）、删除日志（deltalogs）和索引文件。</p></li>
</ul>
<p>在上述信息中，Milvus 会为每个网段生成 Apache Avro 清单文件，并在 JSON 文件中存储快照元数据、Collection 说明、索引信息和清单文件的路径。下图说明了快照文件夹结构。</p>
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
<p>创建快照通常只需几毫秒，恢复快照则需要几秒到几分钟，具体取决于数据量。</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">存储影响和注意事项<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>一旦 Milvus 在快照中引用了段或索引文件，除非你删除收集快照，否则它不会垃圾收集这些文件。快照消耗的存储空间与目标 Collections 的大小成正比，对象存储成本适用于快照保留。在极端情况下，单个快照甚至会使对象存储成本翻倍。建议您</p>
<ul>
<li>定期删除旧快照，以节省存储空间。</li>
<li>使用描述性的名称和说明，以备将来参考。</li>
<li>始终验证快照创建和恢复结果。</li>
<li>跟踪快照创建时间戳、存储使用情况和恢复任务 ID，以便进行监控和故障排除。</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">限制和约束<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>快照在创建后不可更改。</li>
<li>您只能将快照还原到与原始快照在同一群集中的新集合。</li>
<li>恢复的 Collections 保留相同的 Schema、分片数和分区数。</li>
<li>恢复的历史数据可能与 TTL 策略冲突。建议在创建快照前禁用 TTL 或调整 TTL 设置。</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">更多信息<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/zh/manage-snapshots.md">管理</a>快照 - 创建、列出、还原和删除快照。</li>
<li><a href="/docs/zh/snapshot-use-cases.md">快照使用案例</a>- 常用模式和工作流程。</li>
<li><a href="/docs/zh/milvus_backup_overview.md">Milvus 备份</a>- 跨群集的长期备份和还原。</li>
</ul>
