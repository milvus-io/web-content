---
id: manage_partitions.md
title: Manage Partitions
summary: ''
---
<h1 id="Manage-Partitions" class="common-anchor-header">Manage Partitions<button data-href="#Manage-Partitions" class="anchor-icon" translate="no">
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
    </button></h1><p>A partition is a division of a collection. Milvus supports dividing collection data into multiple parts on physical storage so that search and other operations can be limited to one partition to improve performance. Learn about the partition-level operations.</p>
<ul>
<li><a href="/docs/v2.0.x/create_partition.md">Create a Partition</a>: Create a partition with the example of creating a novel partition within a book collection.</li>
<li><a href="/docs/v2.0.x/check_partition.md">Check Partition Information</a>: Check the basic information of a partition in Milvus including its name.</li>
<li><a href="/docs/v2.0.x/drop_partition.md">Drop a Partition</a>: Caution is needed as the delete operation irreversibly drops the partition and all data within it.</li>
<li><a href="/docs/v2.0.x/load_partition.md">Load a Partition</a>: Load the partition to memory before a search or a query instead of loading the whole collection can significantly reduce memory usage. Milvus 2.1 now supports loading a partition as multiple replicas.</li>
<li><a href="/docs/v2.0.x/release_partition.md">Release a Partition</a>: Release a partition from memory after a search or a query to reduce memory usage.</li>
</ul>
