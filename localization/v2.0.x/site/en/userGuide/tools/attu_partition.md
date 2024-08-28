---
id: attu_partition.md
related_key: attu
summary: 'Learn how to manage partitions with Attu, an intuitive GUI tool for Milvus.'
title: ''
---
<h1 id="Manage-Partitions-with-Attu" class="common-anchor-header">Manage Partitions with Attu<button data-href="#Manage-Partitions-with-Attu" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to manage partitions with Attu.</p>
<p>Milvus creates a partition automatically after a collection is created, which cannot be deleted.</p>
<h2 id="Create-a-partition" class="common-anchor-header">Create a partition<button data-href="#Create-a-partition" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Click <strong>Partitions</strong> tab on the <strong>Collection</strong> page.</li>
<li>Click <strong>Create Partition</strong> on the <strong>Partitions</strong> tab page, and the <strong>Create Partition</strong> dialog box appears as shown below.</li>
<li>In the <strong>Create Partition</strong> dialog box, enter the new partition name in the <strong>Name</strong> field.</li>
<li>Click <strong>Create</strong> to create a partition.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/insight_partition1.png" alt="Create Partition" class="doc-image" id="create-partition" />
    <span>Create Partition</span>
  </span>
</p>
<p>If successful, the new partition appears on the <strong>Partitions</strong> tab page.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/insight_partition2.png" alt="Create Partition" class="doc-image" id="create-partition" />
    <span>Create Partition</span>
  </span>
</p>
<p>Choose the Default partition or the newly created partition to store imported data as needed.</p>
<h2 id="Delete-a-partition" class="common-anchor-header">Delete a partition<button data-href="#Delete-a-partition" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Tick the partition you want to delete.</li>
<li>Click the <strong>Trash</strong> icon and the <strong>Delete Partition</strong> dialog box appears as shown below.</li>
<li>Type <code translate="no">delete</code> to confirm the deletion.</li>
<li>Click <strong>Delete</strong> to delete the partition.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/insight_partition3.png" alt="Delete Partition" class="doc-image" id="delete-partition" />
    <span>Delete Partition</span>
  </span>
</p>
