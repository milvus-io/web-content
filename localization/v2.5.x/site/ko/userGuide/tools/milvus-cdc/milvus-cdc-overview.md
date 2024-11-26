---
id: milvus-cdc-overview.md
order: 1
summary: >-
  Milvus-CDC is a user-friendly tool that can capture and synchronize
  incremental data in Milvus instances.
title: CDC Overview
---
<h1 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC is a user-friendly tool that can capture and synchronize incremental data in Milvus instances. It ensures the reliability of business data by seamlessly transferring it between source and target instances, allowing for easy incremental backup and disaster recovery.</p>
<h2 id="Key-capabilities" class="common-anchor-header">Key capabilities<button data-href="#Key-capabilities" class="anchor-icon" translate="no">
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
<li><p><strong>Sequential Data Synchronization</strong>: Ensures data integrity and consistency by synchronizing data changes sequentially between Milvus instances.</p></li>
<li><p><strong>Incremental Data Replication</strong>: Replicates incremental data, including insertions and deletions, from source Milvus to target Milvus, offering persistent storage.</p></li>
<li><p><strong>CDC Task Management</strong>: Allows for the management of CDC tasks through OpenAPI requests, including creating, querying status, and deleting CDC tasks.</p></li>
</ul>
<p>Additionally, we are planning to expand our capabilities to include support for integration with stream processing systems in the future.</p>
<h2 id="Architecture" class="common-anchor-header">Architecture<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-CDC adopts an architecture with two main components - an HTTP server that manages tasks and metadata, and <strong>corelib</strong> that synchronizes task execution with a reader that obtains data from the source Milvus instance and a writer that sends processed data to the target Milvus instance.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/milvus-cdc-architecture.png" alt="milvus-cdc-architecture" class="doc-image" id="milvus-cdc-architecture" />
    <span>milvus-cdc-architecture</span>
  </span>
</p>
<p>In the preceding diagram,</p>
<ul>
<li><p><strong>HTTP server</strong>: Handles user requests, executes tasks, and maintains metadata. It serves as the control plane for task orchestration within the Milvus-CDC system.</p></li>
<li><p><strong>Corelib</strong>: Responsible for the actual synchronization of tasks. It includes a reader component that retrieves information from the source Milvus’s etcd and message queue (MQ), and a writer component that translates messages from the MQ into API parameters for the Milvus system and sends these requests to the target Milvus to complete the synchronization process.</p></li>
</ul>
<h2 id="Workflow" class="common-anchor-header">Workflow<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>The Milvus-CDC data processing flow involves the following steps:</p>
<ol>
<li><p><strong>Task creation</strong>: Users initiate a CDC task via HTTP requests.</p></li>
<li><p><strong>Metadata retrieval</strong>: The system fetches collection-specific metadata from the source Milvus’s etcd, including channel and checkpoint information for the collection.</p></li>
<li><p><strong>MQ connection</strong>: With the metadata at hand, the system connects to the MQ to begin subscribing to the data stream.</p></li>
<li><p><strong>Data processing</strong>: Data from MQ is read, parsed, and either passed on using the Go SDK or processed to replicate operations performed in the source Milvus.</p></li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/milvus-cdc-workflow.png" alt="milvus-cdc-workflow" class="doc-image" id="milvus-cdc-workflow" />
    <span>milvus-cdc-workflow</span>
  </span>
</p>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>Incremental Data Synchronization</strong>: As of now, Milvus-CDC is designed to synchronize only incremental data. If your business requires a full data backup, please <a href="https://milvus.io/community">reach out to us</a> for assistance.</p></li>
<li><p><strong>Synchronization Scope</strong>: Currently, Milvus-CDC can synchronize data at the cluster level. We are working on adding support for collection-level data synchronization in upcoming releases.</p></li>
<li><p><strong>Supported API Requests</strong>: Milvus-CDC currently supports the following API requests. We plan to extend support to additional requests in future releases:</p>
<ul>
<li><p>Create/Drop Collection</p></li>
<li><p>Insert/Delete/Upsert</p></li>
<li><p>Create/Drop Partition</p></li>
<li><p>Create/Drop Index</p></li>
<li><p>Load/Release/Flush</p></li>
<li><p>Load/Release Partition</p></li>
<li><p>Create/Drop Database</p></li>
</ul></li>
</ul>
