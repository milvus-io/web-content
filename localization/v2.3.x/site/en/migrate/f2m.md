---
id: f2m.md
title: Migrate from Faiss to Milvus
related_key: 'Faiss, migrate, import'
summary: Learn how to migrate Faiss data to Milvus.
---
<h1 id="Migrate-Data-from-Faiss-to-Milvus" class="common-anchor-header">Migrate Data from Faiss to Milvus<button data-href="#Migrate-Data-from-Faiss-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to import data from Faiss to Milvus using <a href="/docs/v2.3.x/migrate_overview.md">MilvusDM</a>, an open-source tool specifically designed for Milvus data migration.</p>
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
    </button></h2><p>You need to <a href="/docs/v2.3.x/milvusdm_install.md">install MilvusDM</a> before migrating Milvus data.</p>
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
    </button></h2><p>Download the <code translate="no">F2M.yaml</code> file.</p>
<pre><code translate="no">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus-tools/main/yamls/F2M.yaml</span>
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
<tr><td><code translate="no">data_path</code></td><td>Path to the data in Faiss.</td><td>‘/home/user/data/faiss.index’</td></tr>
<tr><td><code translate="no">data_dir</code></td><td>Directory of the HDF5 files. Set either <code translate="no">data_path</code> or <code translate="no">data_dir</code>.</td><td>‘/Users/zilliz/Desktop/HDF5_data’</td></tr>
<tr><td><code translate="no">dest_host</code></td><td>Milvus server address.</td><td>‘127.0.0.1’</td></tr>
<tr><td><code translate="no">dest_port</code></td><td>Milvus server port.</td><td>19530</td></tr>
<tr><td><code translate="no">mode</code></td><td>Mode of migration, including <code translate="no">skip</code>, <code translate="no">append</code>, and <code translate="no">overwrite</code>. This parameter works only when the specified collection name exists in the Milvus library. <br/> <li><code translate="no">skip</code> refers to skipping data migration if the specified collection or partition already exists.</li> <li><code translate="no">append</code> refers to appending data if the specified collection or partition already exists.</li> <li><code translate="no">overwrite</code> refers to deleting existing data before insertion if the specified collection or partition already exists.</li></td><td>‘append’</td></tr>
<tr><td><code translate="no">dest_collection_name</code></td><td>Name of the collection to import data to.</td><td>‘test’</td></tr>
<tr><td><code translate="no">dest_partition_name</code> (optional)</td><td>Name of the partition to import data to.</td><td>‘partition’</td></tr>
<tr><td><code translate="no">collection_parameter</code></td><td>Collection-specific information including vector dimension, index file size, and similarity metric.</td><td>“dimension: 512 <br/> index_file_size: 1024 <br/> metric_type: 'HAMMING’”</td></tr>
</tbody>
</table>
<h3 id="Example" class="common-anchor-header">Example</h3><p>The following example of configuration is for your reference.</p>
<pre><code translate="no"><span class="hljs-attr">F2M</span>:
  <span class="hljs-attr">milvus_version</span>: <span class="hljs-number">2.0</span><span class="hljs-number">.0</span>
  <span class="hljs-attr">data_path</span>: <span class="hljs-string">&#x27;/home/data/faiss1.index&#x27;</span>
  <span class="hljs-attr">dest_host</span>: <span class="hljs-string">&#x27;127.0.0.1&#x27;</span>
  <span class="hljs-attr">dest_port</span>: <span class="hljs-number">19530</span>
  <span class="hljs-attr">mode</span>: <span class="hljs-string">&#x27;append&#x27;</span>
  <span class="hljs-attr">dest_collection_name</span>: <span class="hljs-string">&#x27;test&#x27;</span>
  <span class="hljs-attr">dest_partition_name</span>: <span class="hljs-string">&#x27;&#x27;</span>
  <span class="hljs-attr">collection_parameter</span>:
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">256</span>
    <span class="hljs-attr">index_file_size</span>: <span class="hljs-number">1024</span>
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;L2&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Migrate-data-from-Faiss-to-Milvus" class="common-anchor-header">3. Migrate data from Faiss to Milvus<button data-href="#3-Migrate-data-from-Faiss-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Run MilvusDM to import data from Faiss to Milvus with the following command.</p>
<pre><code translate="no">$ milvusdm --yaml F2M.yaml
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
<li>Learn how to <a href="/docs/v2.3.x/h2m.md">Migrate Data from HDF5 to Milvus</a>.</li>
</ul></li>
<li>If you are looking for information about how to migrate data from Milvus 1.x to Milvus 2.0,
<ul>
<li>Learn <a href="/docs/v2.3.x/m2m.md">version migration</a>.</li>
</ul></li>
<li>If you are interested in learning more about the data migration tool,
<ul>
<li>Read the overview of <a href="/docs/v2.3.x/migrate_overview.md">MilvusDM</a>.</li>
</ul></li>
</ul>
