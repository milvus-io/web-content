---
id: milvus-cdc-overview.md
order: 1
summary: Milvus CDC 是一个用户友好型工具，可以捕获和同步 Milvus 实例中的增量数据。
title: CDC 概览
---
<h1 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus CDC 是一款用户友好型工具，可捕获和同步 Milvus 实例中的增量数据。它通过在源实例和目标实例之间无缝传输数据，确保业务数据的可靠性，从而轻松实现增量备份和灾难恢复。</p>
<h2 id="Key-capabilities" class="common-anchor-header">主要功能<button data-href="#Key-capabilities" class="anchor-icon" translate="no">
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
<li><p><strong>顺序数据同步</strong>：通过在 Milvus 实例之间按顺序同步数据更改，确保数据完整性和一致性。</p></li>
<li><p><strong>增量数据复制</strong>：将增量数据（包括插入和删除）从源 Milvus 复制到目标 Milvus，提供持久存储。</p></li>
<li><p><strong>CDC 任务管理</strong>：允许通过 OpenAPI 请求管理 CDC 任务，包括创建、查询状态和删除 CDC 任务。</p></li>
</ul>
<p>此外，我们正计划扩展我们的功能，以便在未来支持与流处理系统的集成。</p>
<h2 id="Architecture" class="common-anchor-header">架构<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC 采用的架构包含两个主要组件--管理任务和元数据的 HTTP 服务器，以及与任务执行同步的<strong>corelib</strong>，前者负责从源 Milvus 实例获取数据，后者负责将处理后的数据发送到目标 Milvus 实例。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-cdc-architecture.png" alt="milvus-cdc-architecture" class="doc-image" id="milvus-cdc-architecture" />
   </span> <span class="img-wrapper"> <span>Milvus CDC 架构</span> </span></p>
<p>在上图中</p>
<ul>
<li><p><strong>HTTP 服务器</strong>：处理用户请求、执行任务并维护元数据。它是 Milvus-CDC 系统内任务协调的控制平面。</p></li>
<li><p><strong>Corelib</strong>负责任务的实际同步。它包括一个从源 Milvus 的 etcd 和消息队列（MQ）中检索信息的读取器组件，以及一个将 MQ 中的消息转换为 Milvus 系统 API 参数并将这些请求发送到目标 Milvus 以完成同步过程的写入器组件。</p></li>
</ul>
<h2 id="Workflow" class="common-anchor-header">工作流程<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC 数据处理流程包括以下步骤：</p>
<ol>
<li><p><strong>创建任务</strong>：用户通过 HTTP 请求启动 CDC 任务。</p></li>
<li><p><strong>元数据检索</strong>：系统从 Milvus 的 etcd 源获取特定于 Collections 的元数据，包括 Collections 的通道和检查点信息。</p></li>
<li><p><strong>MQ 连接</strong>：有了元数据，系统就会连接到 MQ，开始订阅数据流。</p></li>
<li><p><strong>数据处理</strong>：读取、解析来自 MQ 的数据，然后使用 Go SDK 将其传递给其他系统，或进行处理以复制在源 Milvus 中执行的操作符。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-cdc-workflow.png" alt="milvus-cdc-workflow" class="doc-image" id="milvus-cdc-workflow" />
   </span> <span class="img-wrapper"> <span>Milvus CDC 工作流</span> </span></p>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>增量数据同步</strong>：到目前为止，Milvus-CDC 只同步增量数据。如果您的业务需要完整的数据备份，请<a href="https://milvus.io/community">联系我们</a>寻求帮助。</p></li>
<li><p><strong>同步范围</strong>：目前，Milvus-CDC 可以在集群级别同步数据。我们正在努力在即将发布的版本中添加对 Collections 级数据同步的支持。</p></li>
<li><p><strong>支持的 API 请求</strong>：Milvus-CDC 目前支持以下 API 请求。我们计划在未来的版本中扩展对其他请求的支持：</p>
<ul>
<li><p>创建/删除 Collections</p></li>
<li><p>插入/删除/增加</p></li>
<li><p>创建/删除分区</p></li>
<li><p>创建/删除索引</p></li>
<li><p>加载/释放/刷新</p></li>
<li><p>加载/释放分区</p></li>
<li><p>创建/删除数据库</p></li>
</ul></li>
</ul>
