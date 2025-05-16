---
id: m2m_legacy.md
title: Version Migration
related_key: version migration
summary: Use MilvusDM for version migration.
deprecate: true
---

<h1 id="Version-Migration" class="common-anchor-header">Version Migration<button data-href="#Version-Migration" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to migrate data from Milvus 1.x to Milvus 2.0 using <a href="/docs/ja/v2.4.x/migrate_overview.md">MilvusDM</a>, an open-source tool specifically designed for Milvus data migration.</p>
<div class="alert note">
MilvusDM does not support migrating data from Milvus 2.0 standalone to Milvus 2.0 cluster.
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>You need to <a href="/docs/ja/v2.4.x/milvusdm_install.md">install MilvusDM</a> before migrating Milvus data.</p>
<h2 id="1-Download-YAML-file" class="common-anchor-header">1. Download YAML file<button data-href="#1-Download-YAML-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Download the <code translate="no">M2M.yaml</code> file.</p>
<pre><code translate="no">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/M2M.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="2-Set-the-parameters" class="common-anchor-header">2. Set the parameters<button data-href="#2-Set-the-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Configuration parameters include:</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Example</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus_version</code></td><td>Version of Milvus.</td><td>2.0.0</td></tr>
<tr><td><code translate="no">data_path</code></td><td>Path to the HDF5 files. Set either <code translate="no">data_path</code> or <code translate="no">data_dir</code>.</td><td>- /Users/zilliz/float_1.h5 <br/> - /Users/zilliz/float_2.h5</td></tr>
<tr><td><code translate="no">data_dir</code></td><td>Directory of the HDF5 files. Set either <code translate="no">data_path</code> or <code translate="no">data_dir</code>.</td><td>‘/Users/zilliz/Desktop/HDF5_data’</td></tr>
<tr><td><code translate="no">dest_host</code></td><td>Milvus server address.</td><td>‘127.0.0.1’</td></tr>
<tr><td><code translate="no">dest_port</code></td><td>Milvus server port.</td><td>19530</td></tr>
<tr><td><code translate="no">mode</code></td><td>Mode of migration, including <code translate="no">skip</code>, <code translate="no">append</code>, and <code translate="no">overwrite</code>. This parameter works only when the specified collection name exists in the Milvus library. <br/> <li><code translate="no">skip</code> refers to skipping data migration if the specified collection or partition already exists.</li> <li><code translate="no">append</code> refers to appending data if the specified collection or partition already exists.</li> <li><code translate="no">overwrite</code> refers to deleting existing data before insertion if the specified collection or partition already exists.</li></td><td>‘append’</td></tr>
<tr><td><code translate="no">dest_collection_name</code></td><td>Name of the collection to import data to.</td><td>‘test_float’</td></tr>
<tr><td><code translate="no">dest_partition_name</code> (optional)</td><td>Name of the partition to import data to.</td><td>‘partition_1’</td></tr>
<tr><td><code translate="no">collection_parameter</code></td><td>Collection-specific information including vector dimension, index file size, and similarity metric.</td><td>“dimension: 512 <br/> index_file_size: 1024 <br/> metric_type: 'HAMMING’”</td></tr>
</tbody>
</table>
<p>The following two examples of configuration are for your reference. The first example involves setting <code translate="no">mysql_parameter</code>. If you do not use MySQL for managing vector IDs in Milvus 1.x, refer to the second example.</p>
<h3 id="Example-1" class="common-anchor-header">Example 1</h3><pre><code translate="no">M2M:
  milvus_version: <span class="hljs-number">2.0</span><span class="hljs-number">.0</span>
  source_milvus_path: <span class="hljs-string">&#x27;/home/user/milvus&#x27;</span>
  mysql_parameter:
    host: <span class="hljs-string">&#x27;127.0.0.1&#x27;</span>
    user: <span class="hljs-string">&#x27;root&#x27;</span>
    port: <span class="hljs-number">3306</span>
    password: <span class="hljs-string">&#x27;123456&#x27;</span>
    database: <span class="hljs-string">&#x27;milvus&#x27;</span>
  source_collection: # specify the <span class="hljs-string">&#x27;partition_1&#x27;</span> and <span class="hljs-string">&#x27;partition_2&#x27;</span> partitions of the <span class="hljs-string">&#x27;test&#x27;</span> collection.
    test:
      - <span class="hljs-string">&#x27;partition_1&#x27;</span>
      - <span class="hljs-string">&#x27;partition_2&#x27;</span>
  dest_host: <span class="hljs-string">&#x27;127.0.0.1&#x27;</span>
  dest_port: <span class="hljs-number">19530</span>
  mode: <span class="hljs-string">&#x27;skip&#x27;</span> # <span class="hljs-string">&#x27;skip/append/overwrite&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2" class="common-anchor-header">Example 2</h3><pre><code translate="no">M2M:
  milvus_version: <span class="hljs-number">2.0</span><span class="hljs-number">.0</span>
  source_milvus_path: <span class="hljs-string">&#x27;/home/user/milvus&#x27;</span>
  mysql_parameter:
  source_collection: <span class="hljs-comment"># specify the collection named &#x27;test&#x27;</span>
    test:
  dest_host: <span class="hljs-string">&#x27;127.0.0.1&#x27;</span>
  dest_port: <span class="hljs-number">19530</span>
  mode: <span class="hljs-string">&#x27;skip&#x27;</span> <span class="hljs-comment"># &#x27;skip/append/overwrite&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Migrate-data-from-Milvus-to-Milvus" class="common-anchor-header">3. Migrate data from Milvus to Milvus<button data-href="#3-Migrate-data-from-Milvus-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Run MilvusDM to import data from Milvus 1.x to Milvus 2.0 with the following command.</p>
<pre><code translate="no">$ milvusdm --yaml M2M.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>If you are interested in migrating data in other forms into Milvus,
<ul>
<li>Learn how to <a href="/docs/ja/v2.4.x/f2m.md">Migrate Data from Faiss to Milvus</a>.</li>
<li>Learn how to <a href="/docs/ja/v2.4.x/h2m.md">Migrate from HDF5 to Milvus</a>.</li>
</ul></li>
<li>If you are interested in learning more about the data migration tool,
<ul>
<li>Read the overview of <a href="/docs/ja/v2.4.x/migrate_overview.md">MilvusDM</a>.</li>
</ul></li>
</ul>
