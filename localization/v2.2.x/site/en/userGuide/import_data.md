---
id: import_data.md
related_key: bulk load
summary: Learn how to bulk load data in Milvus.
title: ''
---
<h1 id="Import-Data" class="common-anchor-header">Import Data<button data-href="#Import-Data" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to import data in Milvus via bulk load.</p>
<p>Regular method to insert a large batch of entities to Milvus usually leads to a massive network transmission across client, proxy, Pulsar and data nodes. To avoid such situation, Milvus 2.1 supports loading data from files via bulk load. You can import large amounts of data into a collection by just a few lines of code, and endow atomicity to a whole batch of entities.</p>
<p>You can also migrate data to Milvus with <a href="/docs/v2.2.x/migrate_overview.md">MilvusDM</a>, an open-source tool designed specifically for importing and exporting data with Milvus.</p>
<h2 id="Prepare-data-file" class="common-anchor-header">Prepare data file<button data-href="#Prepare-data-file" class="anchor-icon" translate="no">
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
    </button></h2><p>You can prepare the data file on row base or column base.</p>
<ul>
<li>Row-based data file</li>
</ul>
<p>A row-based data file is a JSON file containing multiple rows. The root key must be &quot;rows&quot;. The file name can be specified arbitrarily.</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;rows&quot;</span>:[
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">101</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">1.1</span>, <span class="hljs-number">1.2</span>]},
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">102</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">2.1</span>, <span class="hljs-number">2.2</span>]},
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">3.1</span>, <span class="hljs-number">3.2</span>]},
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">104</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">4.1</span>, <span class="hljs-number">4.2</span>]},
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">105</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">34</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">5.1</span>, <span class="hljs-number">5.2</span>]},
  ]
}
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Column-based data file</li>
</ul>
<p>A column-based data file can be a JSON file containing multiple columns, several Numpy files, each contains a single column, or a JSON file contains multiple columns and some Numpy files.</p>
<ul>
<li>JSON file containing multiple columns</li>
</ul>
<pre><code translate="no">```json
{
        &quot;book_id&quot;: [101, 102, 103, 104, 105],
        &quot;word_count&quot;: [13, 25, 7, 12, 34],
        &quot;book_intro&quot;: [
                [1.1, 1.2],
                [2.1, 2.2],
                [3.1, 3.2],
                [4.1, 4.2],
                [5.1, 5.2]
        ]
}
```
</code></pre>
<ul>
<li><p>Numpy files</p>
<pre><code translate="no" class="language-python">import numpy
numpy.save(<span class="hljs-string">&#x27;book_id.npy&#x27;</span>, numpy.array([<span class="hljs-number">101</span>, <span class="hljs-number">102</span>, <span class="hljs-number">103</span>, <span class="hljs-number">104</span>, <span class="hljs-number">105</span>]))
numpy.save(<span class="hljs-string">&#x27;word_count.npy&#x27;</span>, numpy.array([<span class="hljs-number">13</span>, <span class="hljs-number">25</span>, <span class="hljs-number">7</span>, <span class="hljs-number">12</span>, <span class="hljs-number">34</span>]))
arr = numpy.array([[<span class="hljs-number">1.1</span>, <span class="hljs-number">1.2</span>],
            [<span class="hljs-meta">2.1, 2.2</span>],
            [<span class="hljs-meta">3.1, 3.2</span>],
            [<span class="hljs-meta">4.1, 4.2</span>],
            [<span class="hljs-meta">5.1, 5.2</span>]])
numpy.save(<span class="hljs-string">&#x27;book_intro.npy&#x27;</span>, arr)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>A JSON file contains multiple columns and some Numpy files.</p>
<pre><code translate="no" class="language-json">{
        <span class="hljs-string">&quot;book_id&quot;</span>: [<span class="hljs-number">101</span>, <span class="hljs-number">102</span>, <span class="hljs-number">103</span>, <span class="hljs-number">104</span>, <span class="hljs-number">105</span>],
        <span class="hljs-string">&quot;word_count&quot;</span>: [<span class="hljs-number">13</span>, <span class="hljs-number">25</span>, <span class="hljs-number">7</span>, <span class="hljs-number">12</span>, <span class="hljs-number">34</span>]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;book_id&quot;</span>: [<span class="hljs-number">101</span>, <span class="hljs-number">102</span>, <span class="hljs-number">103</span>, <span class="hljs-number">104</span>, <span class="hljs-number">105</span>],
    <span class="hljs-string">&quot;word_count&quot;</span>: [<span class="hljs-number">13</span>, <span class="hljs-number">25</span>, <span class="hljs-number">7</span>, <span class="hljs-number">12</span>, <span class="hljs-number">34</span>]
}
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Upload-data-file" class="common-anchor-header">Upload data file<button data-href="#Upload-data-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Upload data files to object storage.</p>
<p>You can upload data file to MinIO or local storage (available only in Milvus Standalone).</p>
<ul>
<li>Upload to MinIO</li>
</ul>
<p>upload the data files to the bucket which is defined by <a href="/docs/v2.2.x/configure_minio.md#miniobucketName"><code translate="no">minio.bucketName</code></a> in the configuration file <code translate="no">milvus.yml</code>.</p>
<ul>
<li>Upload to local storage</li>
</ul>
<p>copy the data files into the directory which is defined by <a href="/docs/v2.2.x/configure_localstorage.md#localStoragepath"><code translate="no">localStorage.path</code></a> in the configuration file <code translate="no">milvus.yml</code>.</p>
<h2 id="Insert-data-to-Milvus" class="common-anchor-header">Insert data to Milvus<button data-href="#Insert-data-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Import the data to the collection.</p>
<ul>
<li>For row-based files</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
tasks = utility.bulk_load(
    collection_name=<span class="hljs-string">&quot;book&quot;</span>,
    is_row_based=<span class="hljs-literal">True</span>,
    files=[<span class="hljs-string">&quot;row_based_1.json&quot;</span>, <span class="hljs-string">&quot;row_based_2.json&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>For column-based files</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
tasks = utility.bulk_load(
    collection_name=<span class="hljs-string">&quot;book&quot;</span>,
    is_row_based=<span class="hljs-literal">False</span>,
    files=[<span class="hljs-string">&quot;columns.json&quot;</span>, <span class="hljs-string">&quot;book_intro.npy&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">collection_name</code></td>
        <td>Name of the collection to load data into.</td>
    </tr>
    <tr>
        <td><code translate="no">is_row_based</code></td>
        <td>Boolean value to indicate if the file is row-based.</td>
    </tr>
    <tr>
        <td><code translate="no">files</code></td>
        <td>List of file names to load into Milvus.</td>
    </tr>
    <tr>
        <td><code translate="no">partition_name</code> (optional)</td>
        <td>Name of the partition to insert data into.</td>
    </tr>
    </tbody>
</table>
<h2 id="Check-the-import-task-state" class="common-anchor-header">Check the import task state<button data-href="#Check-the-import-task-state" class="anchor-icon" translate="no">
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
    </button></h2><p>Check the state of the import task.</p>
<pre><code translate="no" class="language-python">state = utility.get_bulk_load_state(tasks[<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(state.state_name())
<span class="hljs-built_in">print</span>(state.ids())
<span class="hljs-built_in">print</span>(state.infos())
<button class="copy-code-btn"></button></code></pre>
<p>The state codes and their corresponding descriptions.</p>
<table>
<thead>
<tr><th>State code</th><th>State</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>0</td><td>BulkLoadPending</td><td>Task is in pending list</td></tr>
<tr><td>1</td><td>BulkLoadFailed</td><td>Task failed, get the failed reason with <code translate="no">state.infos[&quot;failed_reason&quot;]</code></td></tr>
<tr><td>2</td><td>BulkLoadStarted</td><td>Task is dispatched to data node, gonna to be executed</td></tr>
<tr><td>3</td><td>BulkLoadDownloaded</td><td>Data file has been downloaded from MinIO to local</td></tr>
<tr><td>4</td><td>BulkLoadParsed</td><td>Data file has been validated  and parsed</td></tr>
<tr><td>5</td><td>BulkLoadPersisted</td><td>New segments have been generated and persisted</td></tr>
<tr><td>6</td><td>BulkLoadCompleted</td><td>Task completed</td></tr>
</tbody>
</table>
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
    </button></h2><table>
<thead>
<tr><th>Feature</th><th>Maximum limit</th></tr>
</thead>
<tbody>
<tr><td>Max size of task pending list</td><td>32</td></tr>
<tr><td>Max size of a data file</td><td>4GB</td></tr>
</tbody>
</table>
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
<li>Learn more basic operations of Milvus:
<ul>
<li><a href="/docs/v2.2.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.2.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.2.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
<li>Explore API references for Milvus SDKs:
<ul>
<li><a href="/api-reference/pymilvus/v2.2.x/tutorial.html">PyMilvus API reference</a></li>
<li><a href="/api-reference/node/v2.2.x/tutorial.html">Node.js API reference</a></li>
</ul></li>
</ul>
