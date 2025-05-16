---
id: migrate_overview.md
summary: >-
  This article provides an overview of the Milvus-migration tool, including
  supported migrations, features, and architecture.
title: Milvus Migration Overview
---
<h1 id="Milvus-Migration-Overview" class="common-anchor-header">Milvus Migration Overview<button data-href="#Milvus-Migration-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Recognizing the diverse needs of user base, Milvus has expanded its migration tools to not only facilitate upgrades from earlier Milvus 1.x versions but also to enable seamless integration of data from other systems like <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html">Elasticsearch</a> and <a href="https://github.com/facebookresearch/faiss">Faiss</a>. The <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> project is designed to bridge the gap between these varied data environments and the latest advancements in Milvus technology, ensuring you can harness improved features and performance seamlessly.</p>
<h2 id="Supported-migrations" class="common-anchor-header">Supported migrations<button data-href="#Supported-migrations" class="anchor-icon" translate="no">
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
    </button></h2><p>The <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> tool supports a variety of migration paths to accommodate different user needs:</p>
<ul>
<li><a href="/docs/es2m.md/v2.4.x">Elasticsearch to Milvus 2.x</a>: Enabling users to migrate data from Elasticsearch environments to take advantage of Milvus’s optimized vector search capabilities.</li>
<li><a href="/docs/f2m.md/v2.4.x">Faiss to Milvus 2.x</a>: Providing experimental support for transferring data from Faiss, a popular library for efficient similarity search.</li>
<li><a href="/docs/m2m.md/v2.4.x">Milvus 1.x to Milvus 2.x</a>: Ensuring data from earlier versions is transitioned smoothly to the latest framework.</li>
<li><a href="/docs/from-m2x.md/v2.4.x">Milvus 2.3.x to Milvus 2.3.x or above</a>: Providing a one-time migration path for users who have already migrated to 2.3.x.</li>
</ul>
<h2 id="Features" class="common-anchor-header">Features<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-migration is designed with robust features to handle diverse migration scenarios:</p>
<ul>
<li>Multiple interaction methods: You can perform migrations via a command line interface or through a Restful API, with flexibility in how migrations are executed.</li>
<li>Support for various file formats and cloud storage: The <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> tool can handle data stored in local files as well as in cloud storage solutions such as S3, OSS, and GCP, ensuring broad compatibility.</li>
<li>Data type handling: <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> is capable of dealing with both vector data and scalar fields, making it a versatile choice for different data migration needs.</li>
</ul>
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
    </button></h2><p>The architecture of <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> is strategically designed to facilitate efficient data streaming, parsing, and writing processes, enabling robust migration capabilities across various data sources.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/milvus-migration-architecture.jpeg" alt="Milvus-migration architecture" class="doc-image" id="milvus-migration-architecture" />
    <span>Milvus-migration architecture</span>
  </span>
</p>
<p>In the preceding figure:</p>
<ul>
<li><strong>Data source</strong>: <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> supports multiple data sources including Elasticsearch via the <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html">scroll API</a>, local or cloud storage data files, and Milvus 1.x databases. These are accessed and read in a streamlined manner to initiate the migration process.</li>
<li><strong>Stream pipeline</strong>:
<ul>
<li><strong>Parse process</strong>: Data from the sources is parsed according to its format. For example, for a data source from Elasticsearch, an Elasticsearch format parser is employed, while other formats use respective parsers. This step is crucial for transforming raw data into a structured format that can be further processed.</li>
<li><strong>Convert process</strong>: Following parsing, data undergoes conversion where fields are filtered, data types are converted, and table names are adjusted according to the target Milvus 2.x schema. This ensures that the data conforms to the expected structure and types in Milvus.</li>
</ul></li>
<li><strong>Data writing and loading</strong>:
<ul>
<li><strong>Write data</strong>: The processed data is written into intermediate JSON or NumPy files, ready to be loaded into Milvus 2.x.</li>
<li><strong>Load data</strong>: Data is finally loaded into Milvus 2.x using the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">BulkInsert</a> operation, which efficiently writes large volumes of data into Milvus storage systems, either cloud-based or filestore.</li>
</ul></li>
</ul>
<h2 id="Future-plans" class="common-anchor-header">Future plans<button data-href="#Future-plans" class="anchor-icon" translate="no">
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
    </button></h2><p>The development team is committed to enhancing <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> with features such as:</p>
<ul>
<li><strong>Support for more data sources</strong>: Plans to extend support to additional databases and file systems, such as Pinecone, Chroma, Qdrant. If you need support for a specific data source, please submit your request through this <a href="https://github.com/zilliztech/milvus-migration/issues">GitHub issue link</a>.</li>
<li><strong>Command simplification</strong>: Efforts to streamline the command process for easier execution.</li>
<li><strong>SPI parser</strong> / <strong>convert</strong>: The architecture expects to include Service Provider Interface (SPI) tools for both parsing and converting. These tools allow for custom implementations that users can plug into the migration process to handle specific data formats or conversion rules.</li>
<li><strong>Checkpoint resumption</strong>: Enabling migrations to resume from the last checkpoint to enhance reliability and efficiency in case of interruptions. Save points will be created to ensure data integrity and are stored in databases such as SQLite or MySQL to track the progress of the migration process.</li>
</ul>
