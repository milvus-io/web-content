---
id: migrate_overview.md
title: Migrate Overview
summary: MilvusDM allows data migration between Milvus and many other sources of data.
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
    </button></h1><p><a href="https://github.com/milvus-io/milvus-tools">MilvusDM</a> (Milvus Data Migration) is an open-source tool designed specifically for importing and exporting data with Milvus. MilvusDM allows you to migrate data in a specific collection or partition.</p>
<div class="alert note">
Currently, MilvusDM is only supported in Milvus 1.x version.
</div>
<p>To substantially improve data management efficiency and reduce DevOps costs, MilvusDM supports the following migration channels:</p>
<ul>
<li><a href="/docs/v2.1.x/m2m.md">Milvus to Milvus</a>: Migrates data between instances of Milvus.</li>
<li><a href="/docs/v2.1.x/f2m.md">Faiss to Milvus</a>: Imports unzipped data from Faiss to Milvus.</li>
<li><a href="/docs/v2.1.x/h2m.md">HDF5 to Milvus</a>: Imports HDF5 files into Milvus.</li>
<li><a href="/docs/v2.1.x/m2h.md">Milvus to HDF5</a>: Saves the data in Milvus as HDF5 files.</li>
</ul>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/milvusdm.jpeg" alt="MilvusDM" class="doc-image" id="milvusdm" />
    <span>MilvusDM</span>
  </span>
</p>
<p>MilvusDM is hosted on GitHub. To install MilvusDM, run:</p>
<pre><code translate="no">pip3 install pymilvusdm
<button class="copy-code-btn"></button></code></pre>
<h2 id="MilvusDM-File-Structure" class="common-anchor-header">MilvusDM File Structure<button data-href="#MilvusDM-File-Structure" class="anchor-icon" translate="no">
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
    </button></h2><p>The flow chart below shows how MilvusDM performs different tasks according to the .yaml file it receives:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/file_structure.png" alt="File structure" class="doc-image" id="file-structure" />
    <span>File structure</span>
  </span>
</p>
<p>MilvusDM file structure:</p>
<ul>
<li>pymilvusdm
<ul>
<li>core
<ul>
<li><strong>milvus_client.py</strong>: Performs client operations in Milvus.</li>
<li><strong>read_data.py</strong>: Reads the HDF5 files on your local drive. (Add your code here to support reading data files in other formats.)</li>
<li><strong>read_faiss_data.py</strong>: Reads Faiss data files.</li>
<li><strong>read_milvus_data.py</strong>: Reads Milvus data files.</li>
<li><strong>read_milvus_meta.py</strong>: Reads Milvus metadata.</li>
<li><strong>data_to_milvus.py</strong>: Creates collections or partitions as specified in .yaml files and imports vectors and the corresponding IDs into Milvus.</li>
<li><strong>save_data.py</strong>: Saves data as HDF5 files.</li>
<li><strong>write_logs.py</strong>: Writes <code translate="no">debug</code>/<code translate="no">info</code>/<code translate="no">error</code> logs during runtime.</li>
</ul></li>
<li><strong>faiss_to_milvus.py</strong>: Imports Faiss data into Milvus.</li>
<li><strong>hdf5_to_milvus.py</strong>: Imports HDF5 files into Milvus.</li>
<li><strong>milvus_to_milvus.py</strong>: Migrates data from a source Milvus to a target Milvus.</li>
<li><strong>milvus_to_hdf5.py</strong>: Saves Milvus data as HDF5 files.</li>
<li><strong>main.py</strong>: Executes tasks as specified by the received .yaml file.</li>
<li><strong>setting.py</strong>: Stores configurations for MilvusDM operation.</li>
</ul></li>
<li><strong>setup.py</strong>: Creates and uploads pymilvusdm file packages to PyPI (Python Package Index).</li>
</ul>
<h2 id="Enhancement-Plan" class="common-anchor-header">Enhancement Plan<button data-href="#Enhancement-Plan" class="anchor-icon" translate="no">
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
    </button></h2><p>In future releases, MilvusDM will provide more new features including MilvusDump and MilvusRestore to support exporting all Milvus data, restoring data in specified collections and partitions, resuming interrupted download and more.</p>
<div class="alert note">
The MilvusDM project is open sourced on <a href="https://github.com/milvus-io/milvus-tools">GitHub</a>. Any contribution to the project is welcome. Give it a star 🌟, and feel free to <a href="https://github.com/milvus-io/milvus-tools/issues">file an issue</a> or submit your own code! 
</div>
