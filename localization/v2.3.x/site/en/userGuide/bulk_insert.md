---
id: bulk_insert.md
related_key: bulk load
summary: Learn how to insert multiple entities in a batch from a JSON file.
title: Insert Entities from Files
---
<h1 id="Insert-Entities-from-Files" class="common-anchor-header">Insert Entities from Files<button data-href="#Insert-Entities-from-Files" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 2.2 now supports inserting a batch of entities from a file. Compared to the <code translate="no">insert()</code> method, this feature reduces network transmission across the Milvus client, proxy, Pulsar, and data nodes. You can now import a batch of entities in one file or multiple files into a collection with just a few lines of code.</p>
<div class="alert note">
<p>When interacting with Milvus using Python code, you have the flexibility to choose between PyMilvus and MilvusClient (new). For more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/About.md">Python SDK</a>.</p>
</div>
<h2 id="Prepare-the-data-file" class="common-anchor-header">Prepare the data file<button data-href="#Prepare-the-data-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Organize the data to be inserted into a Milvus collection in a row-based JSON file or multiple NumPy files.</p>
<h3 id="Row-based-JSON-file" class="common-anchor-header">Row-based JSON file</h3><p>You can name the file whatever makes sense, but the root key must be <strong>rows</strong>. In the file, each entity is organized in a dictionary. The keys in the dictionary are field names, and the values are field values in the corresponding entity.</p>
<p>The following is an example of a row-based JSON file. You can include fields not defined in the collection schema as dynamic fields. For details, refer to <a href="/docs/v2.3.x/dynamic_schema.md">Dynamic Schema</a>.</p>
<div class="none-filter">
<pre><code translate="no" class="language-python">{
  <span class="hljs-string">&quot;rows&quot;</span>:[
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">101</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">1.1</span>, <span class="hljs-number">1.2</span>]},
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">102</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">2.1</span>, <span class="hljs-number">2.2</span>]},
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">3.1</span>, <span class="hljs-number">3.2</span>]},
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">104</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">4.1</span>, <span class="hljs-number">4.2</span>]},
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">105</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">34</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">5.1</span>, <span class="hljs-number">5.2</span>]}
  ]
}

<span class="hljs-comment"># To include dynamic fields, do as follows:</span>

{
  <span class="hljs-string">&quot;rows&quot;</span>:[
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">101</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">1.1</span>, <span class="hljs-number">1.2</span>], <span class="hljs-string">&quot;book_props&quot;</span>: {<span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2015</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">23.43</span>}},
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">102</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">2.1</span>, <span class="hljs-number">2.2</span>], <span class="hljs-string">&quot;book_props&quot;</span>: {<span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2018</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">15.05</span>}},
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">3.1</span>, <span class="hljs-number">3.2</span>], <span class="hljs-string">&quot;book_props&quot;</span>: {<span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2020</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">36.68</span>}},
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">104</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">4.1</span>, <span class="hljs-number">4.2</span>] , <span class="hljs-string">&quot;book_props&quot;</span>: {<span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2019</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">20.14</span>}},
    {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">105</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">34</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">5.1</span>, <span class="hljs-number">5.2</span>] , <span class="hljs-string">&quot;book_props&quot;</span>: {<span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2021</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">9.36</span>}}
  ]
}
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="alert note">
<ul>
<li>Do not add any field that does not exist in the target collection, and do not miss any field that the schema of the target collection defines.</li>
<li>To add fields that are not predefined in the schema, you should enable dynamic schema for the collection. In this case, Milvus automatically adds these fields to an internal JSON field. For details, refer to <a href="/docs/v2.3.x/dynamic_schema.md">Dynamic Schema</a>.</li>
<li>Use the correct types of values in each field. For example, use integers in integer fields, floats in float fields, strings in varchar fields, and float arrays in vector fields.</li>
<li>Do not include an auto-generated primary key in the JSON file.</li>
<li>For binary vectors, use uint8 arrays. Each uint8 value represents 8 dimensions, and the value must be between 0 and 255. For example, <code translate="no">[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]</code> is a 16-dimensional binary vector and should be written as <code translate="no">[128, 7]</code> in the JSON file.</li>
<li>If you have enabled dynamic schema for a collection, you can add fields that are not pre-defined in the schema. Milvus automatically adds these non-existent fields into a JSON field.</li>
</ul>
</div>
<h3 id="Column-based-NumPy-files" class="common-anchor-header">Column-based NumPy files</h3><p>As an alternative to the row-based JSON file mentioned above, you can also use NumPy arrays to organize each column of a dataset in a separate file. In this case, use the field name of each column to name the NumPy file.</p>
<div class="none-filter">
<pre><code translate="no" class="language-python">import numpy
numpy.save(<span class="hljs-string">&#x27;book_id.npy&#x27;</span>, numpy.array([<span class="hljs-number">101</span>, <span class="hljs-number">102</span>, <span class="hljs-number">103</span>, <span class="hljs-number">104</span>, <span class="hljs-number">105</span>]))
numpy.save(<span class="hljs-string">&#x27;word_count.npy&#x27;</span>, numpy.array([<span class="hljs-number">13</span>, <span class="hljs-number">25</span>, <span class="hljs-number">7</span>, <span class="hljs-number">12</span>, <span class="hljs-number">34</span>]))
arr = numpy.array([[<span class="hljs-number">1.1</span>, <span class="hljs-number">1.2</span>],
            [<span class="hljs-meta">2.1, 2.2</span>],
            [<span class="hljs-meta">3.1, 3.2</span>],
            [<span class="hljs-meta">4.1, 4.2</span>],
            [<span class="hljs-meta">5.1, 5.2</span>]])
numpy.save(<span class="hljs-string">&#x27;book_intro.npy&#x27;</span>, arr)
arr = numpy.array([json.dumps({<span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2015</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">23.43</span>}),
            json.dumps({<span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2018</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">15.05</span>}),
            json.dumps({<span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2020</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">36.68</span>}),
            json.dumps({<span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2019</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">20.14</span>}),
            json.dumps({<span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2021</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">9.36</span>})])
numpy.save(<span class="hljs-string">&#x27;book_props.npy&#x27;</span>, arr)
<button class="copy-code-btn"></button></code></pre>
</div>
<p>You can also add dynamic fields using NumPy files as follows. For details on dynamic fields, refer to <a href="/docs/v2.3.x/dynamic_schema.md">Dynamic Schema</a>.</p>
<div class="none-filter">
<pre><code translate="no" class="language-python">numpy.<span class="hljs-title function_">save</span>(<span class="hljs-string">&#x27;$meta.py&#x27;</span>, numpy.<span class="hljs-title function_">array</span>([ json.<span class="hljs-title function_">dumps</span>({<span class="hljs-attr">x</span>: <span class="hljs-number">2</span>}), json.<span class="hljs-title function_">dumps</span>({<span class="hljs-attr">y</span>: <span class="hljs-number">8</span>, <span class="hljs-attr">z</span>: <span class="hljs-number">2</span>}) ]))
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="alert note">
<ul>
<li>Use the field name of each column to name the NumPy file. Do not add files named after a field that does not exist in the target collection. There should be one NumPy file for each field.</li>
<li>Use the correct value type when creating NumPy arrays. For details, refer to <a href="#Create-NumPy-files">these examples</a>.</li>
</ul>
</div>
<h2 id="Insert-entities-from-files" class="common-anchor-header">Insert entities from files<button data-href="#Insert-entities-from-files" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Upload-data-files" class="common-anchor-header">1. Upload data files</h3><p>You can use either MinIO or the local hard disk for storage in Milvus.</p>
<p>The bulk-insert API does not directly upload a file from your local drive. Instead, it passes a path relative to the root of an object storage bucket to tell the Milvus server where to find the data file. Therefore, you need to upload the data file to the bucket defined by <code translate="no">minio.bucketName</code> in your Milvus configuration file <code translate="no">milvus.yml</code>. To upload a file to MinIO or S3, you can use the AWS SDK or MinIO SDK.</p>
<p>For PyMilvus, we provide an <a href="https://github.com/milvus-io/pymilvus/blob/2.2/examples/example_bulkinsert_json.py">example</a> to show how to use the MinIO SDK to upload files to MinIO and do bulk-insert to Milvus.</p>
<div class="alert note">
Using the local hard disk for storage is only available in Milvus Standalone.
</div>
<ul>
<li>To use MinIO for storage, upload data files to the bucket defined by <code translate="no">minio.bucketName</code> in the <code translate="no">milvus.yml</code> configuration file.</li>
<li>For local storage, copy the data files into a directory of the local disk.</li>
</ul>
<h3 id="2-Insert-entities" class="common-anchor-header">2. Insert entities</h3><p>To facilitate data import from files, Milvus offers a bulk-insert API in various flavors. In PyMilvus, you can use the <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/Utility/do_bulk_insert().md"><code translate="no">do_bulk_insert()</code></a> method. As to the Java SDK, use the <a href="https://milvus.io/api-reference/java/v2.3.x/BulkInsert/bulkInsert().md"><code translate="no">bulkInsert</code></a> method.</p>
<p>In this method, you need to set the name of the target collection as <strong>collection_name</strong> and the list of files <a href="#Prepare-the-data-file">prepared in the previous step</a> as <strong>files</strong>. Optionally, you can specify the name of a specific partition as <strong>partition_name</strong> in the target collection so that Milvus imports the data from the files listed only into this partition.</p>
<ul>
<li><p>For a row-based JSON file, parameter <strong>files</strong> should be a one-member list containing the path to the JSON file.</p>
  <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
  </div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
task_id = utility.<span class="hljs-title function_">do_bulk_insert</span>(
    collection_name=<span class="hljs-string">&quot;book&quot;</span>,
    partition_name=<span class="hljs-string">&quot;2022&quot;</span>,
    files=[<span class="hljs-string">&quot;test.json&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.bulkinsert.BulkInsertParam;
<span class="hljs-keyword">import</span> io.milvus.response.BulkInsertResponseWrapper;
<span class="hljs-keyword">import</span> io.milvus.grpc.ImportResponse;
<span class="hljs-keyword">import</span> io.milvus.param.R;

<span class="hljs-type">BulkInsertParam</span> <span class="hljs-variable">param</span> <span class="hljs-operator">=</span> BulkInsertParam.newBuilder()
        .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
        .withPartitionName(<span class="hljs-string">&quot;2022&quot;</span>)
        .addFile(<span class="hljs-string">&quot;test.json&quot;</span>)
        .build()
R&lt;ImportResponse&gt; response = milvusClient.bulkInsert(param);
<span class="hljs-type">BulkInsertResponseWrapper</span> <span class="hljs-variable">wrapper</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">BulkInsertResponseWrapper</span>(response.getData());
task_id = wrapper.getTaskID();
<button class="copy-code-btn"></button></code></pre></li>
<li><p>For a set of column-based NumPy files, parameter <strong>files</strong> should be a multi-member list containing the paths to the NumPy files.</p>
  <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
  </div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
task_id = utility.<span class="hljs-title function_">do_bulk_insert</span>(
    collection_name=<span class="hljs-string">&quot;book&quot;</span>,
    partition_name=<span class="hljs-string">&quot;2022&quot;</span>,
    files=[<span class="hljs-string">&quot;book_id.npy&quot;</span>, <span class="hljs-string">&quot;word_count.npy&quot;</span>, <span class="hljs-string">&quot;book_intro.npy&quot;</span>, <span class="hljs-string">&quot;book_props.npy&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.bulkinsert.BulkInsertParam;
<span class="hljs-keyword">import</span> io.milvus.response.BulkInsertResponseWrapper;
<span class="hljs-keyword">import</span> io.milvus.grpc.ImportResponse;
<span class="hljs-keyword">import</span> io.milvus.param.R;

<span class="hljs-type">BulkInsertParam</span> <span class="hljs-variable">param</span> <span class="hljs-operator">=</span> BulkInsertParam.newBuilder()
        .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
        .withPartitionName(<span class="hljs-string">&quot;2022&quot;</span>)
        .addFile(<span class="hljs-string">&quot;book_id.npy&quot;</span>)
        .addFile(<span class="hljs-string">&quot;word_count.npy&quot;</span>)
        .addFile(<span class="hljs-string">&quot;book_intro.npy&quot;</span>)
        .addFile(<span class="hljs-string">&quot;book_props.npy&quot;</span>)
        .build()
R&lt;ImportResponse&gt; response = milvusClient.bulkInsert(param);
<span class="hljs-type">BulkInsertResponseWrapper</span> <span class="hljs-variable">wrapper</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">BulkInsertResponseWrapper</span>(response.getData());
task_id = wrapper.getTaskID();
<button class="copy-code-btn"></button></code></pre>
<p>Each call to the bulk-insert API returns immediately. The return value is the ID of a data-import task running in the background. Milvus maintains a queue of such tasks to be dispatched in parallel to idle data nodes.</p>
  <div class="alert note">
<p>When setting the file paths, note that</p>
<ul>
<li>If you upload the data file to a MinIO instance, a valid file path should be relative to the root bucket defined in <strong>“milvus.yml”</strong>, such as <strong>“data/book_id.npy”</strong>.</li>
<li>If a collection contains a partition key, you do not need to specify <code translate="no">partition_name</code>, as data nodes can assign rows to different partitions according to partition key values.</li>
</ul>
<p>If you have a lot of files to process, consider <a href="#Import-multiple-NumPy-files-in-parallel">creating multiple data-import tasks and have them run in parallel</a>.</p>
  </div>
</li>
</ul>
<p>After inserting entities into a collection that has previously been indexed, you do not need to re-index the collection, as Milvus will automatically create an index for the newly inserted data. For more information, refer to <a href="/docs/v2.3.x/product_faq.md#Can-indexes-be-created-after-inserting-vectors">Can indexes be created after inserting vectors?</a></p>
<h2 id="List-tasks" class="common-anchor-header">List tasks<button data-href="#List-tasks" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Check-task-state" class="common-anchor-header">Check task state</h3><p>Since the bulk-insert API is asynchronous, you might need to check whether a data-import task is complete. Milvus provides a <strong>BulkInsertState</strong> object to hold the details of a data-import task and you can use the get-bulk-insert-state API to retrieve this object using the programming language of your choice.</p>
<p>In the flavor of PyMilvus, you can use <a href="https://milvus.io/api-reference/pymilvus/v2.2.2/Utility/get_bulk_insert_state().md"><code translate="no">get_bulk_insert_state()</code></a>. For Java SDK, use <a href="https://milvus.io/api-reference/java/v2.2.3/BulkInsert/getBulkInsertState().md"><code translate="no">getBulkInsertState()</code></a>.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility, BulkInsertState
task = utility.get_bulk_insert_state(task_id=task_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Task state:&quot;</span>, task.state_name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Imported files:&quot;</span>, task.files)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Collection name:&quot;</span>, task.collection_name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Partition name:&quot;</span>, task.partition_name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Start time:&quot;</span>, task.create_time_str)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Imported row count:&quot;</span>, task.row_count)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Entities ID array generated by this task:&quot;</span>, task.ids)

<span class="hljs-keyword">if</span> task.state == BulkInsertState.ImportFailed:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Failed reason:&quot;</span>, task.failed_reason)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.bulkinsert.GetBulkInsertStateParam;
<span class="hljs-keyword">import</span> io.milvus.response.GetBulkInsertStateWrapper;
<span class="hljs-keyword">import</span> io.milvus.grpc.GetImportStateResponse;
<span class="hljs-keyword">import</span> io.milvus.grpc.ImportState;
<span class="hljs-keyword">import</span> io.milvus.param.R;

<span class="hljs-type">GetBulkInsertStateParam</span> <span class="hljs-variable">param</span> <span class="hljs-operator">=</span> GetBulkInsertStateParam.newBuilder()
        .withTask(task_id)
        .build()
R&lt;GetImportStateResponse&gt; response = milvusClient.getBulkInsertState(param);
<span class="hljs-type">GetBulkInsertStateWrapper</span> <span class="hljs-variable">wrapper</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetBulkInsertStateWrapper</span>(response.getData());
<span class="hljs-type">ImportState</span> <span class="hljs-variable">state</span> <span class="hljs-operator">=</span> wrapper.getState();
<span class="hljs-type">long</span> <span class="hljs-variable">row_count</span> <span class="hljs-operator">=</span> wrapper.getImportedCount();
<span class="hljs-type">String</span> <span class="hljs-variable">create_ts</span> <span class="hljs-operator">=</span> wrapper.getCreateTimeStr();
<span class="hljs-type">String</span> <span class="hljs-variable">failed_reason</span> <span class="hljs-operator">=</span> wrapper.getFailedReason();
<span class="hljs-type">String</span> <span class="hljs-variable">files</span> <span class="hljs-operator">=</span> wrapper.getFiles();
<span class="hljs-type">int</span> <span class="hljs-variable">progress</span> <span class="hljs-operator">=</span> wrapper.getProgress();
<button class="copy-code-btn"></button></code></pre>
<p>The following table lists the state of a data-import task returned.</p>
<table>
<thead>
<tr><th>State</th><th>Code</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>Pending</td><td>0</td><td>The task is pending.</td></tr>
<tr><td>Failed</td><td>1</td><td>The task fails. Use <code translate="no">task.failed_reason</code> to understand why the task fails.</td></tr>
<tr><td>Started</td><td>2</td><td>The task has been dispatched to a data node and will be executed soon.</td></tr>
<tr><td>Persisted</td><td>5</td><td>New data segments have been generated and persisted.</td></tr>
<tr><td>Completed</td><td>6</td><td>The metadata has been updated for the new segments.</td></tr>
<tr><td>Failed and cleaned</td><td>7</td><td>The task fails and all temporary data generated by this task are cleared.</td></tr>
</tbody>
</table>
<h3 id="List-all-tasks" class="common-anchor-header">List all tasks</h3><p>Milvus also offers a list-bulk-insert-tasks API for you to list all data-import tasks. In this method, you need to specify a collection name so that Milvus lists all tasks that import data into this collection. Optionally, you can specify a limit for the maximum number of tasks to return.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>
<pre><code translate="no" class="language-python">tasks = utility.list_bulk_insert_tasks(collection_name=<span class="hljs-string">&quot;book&quot;</span>, <span class="hljs-built_in">limit</span>=10)
<span class="hljs-keyword">for</span> task <span class="hljs-keyword">in</span> tasks:
    <span class="hljs-built_in">print</span>(task)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.bulkinsert.ListBulkInsertTasksParam;
<span class="hljs-keyword">import</span> io.milvus.grpc. ListImportTasksResponse;
<span class="hljs-keyword">import</span> io.milvus.grpc.GetImportStateResponse;
<span class="hljs-keyword">import</span> io.milvus.grpc.ImportState;
<span class="hljs-keyword">import</span> io.milvus.param.R;

<span class="hljs-type">ListBulkInsertTasksParam</span> <span class="hljs-variable">param</span> <span class="hljs-operator">=</span> ListBulkInsertTasksParam.newBuilder()
    .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
    .build()
R&lt;ListImportTasksResponse&gt; response = milvusClient.listBulkInsertTasks(param);
List&lt;GetImportStateResponse&gt; tasks = response.getTasksList();
<span class="hljs-keyword">for</span> (GetImportStateResponse task : tasks) {
    <span class="hljs-type">GetBulkInsertStateWrapper</span> <span class="hljs-variable">wrapper</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetBulkInsertStateWrapper</span>(task);
    <span class="hljs-type">ImportState</span> <span class="hljs-variable">state</span> <span class="hljs-operator">=</span> wrapper.getState();
    <span class="hljs-type">long</span> <span class="hljs-variable">row_count</span> <span class="hljs-operator">=</span> wrapper.getImportedCount();
    <span class="hljs-type">String</span> <span class="hljs-variable">create_ts</span> <span class="hljs-operator">=</span> wrapper.getCreateTimeStr();
    <span class="hljs-type">String</span> <span class="hljs-variable">failed_reason</span> <span class="hljs-operator">=</span> wrapper.getFailedReason();
    <span class="hljs-type">String</span> <span class="hljs-variable">files</span> <span class="hljs-operator">=</span> wrapper.getFiles();
}
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>collection_name (optional)</td><td>Specify the target collection name to list all tasks on this collection. Leave the value empty if you want to list all tasks recorded by Milvus root coords.</td></tr>
<tr><td>limit (optional)</td><td>Specify this parameter to limit the number of returned tasks.</td></tr>
</tbody>
</table>
<p>See <a href="/docs/v2.3.x/configure_rootcoord.md">System Configurations</a> for more information about import task configurations.</p>
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
<tr><td>Max. size of task pending list</td><td>65536</td></tr>
<tr><td>Max. size of a data file</td><td>16 GB</td></tr>
</tbody>
</table>
<h2 id="Reference" class="common-anchor-header">Reference<button data-href="#Reference" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Configure-Milvus-for-data-import" class="common-anchor-header">Configure Milvus for data import</h3><p>To have Milvus remove failed or old data-import tasks automatically, you can specify a timeout duration and retention period for data-import tasks in the Milvus configuration file.</p>
<pre><code translate="no" class="language-yaml">rootCoord:
  <span class="hljs-comment"># (in seconds) Duration after which an import task will expire (be killed). Default 900 seconds (15 minutes).</span>
  <span class="hljs-comment"># Note: If default value is to be changed, change also the default in: internal/util/paramtable/component_param.go</span>
  importTaskExpiration: <span class="hljs-number">900</span>
  <span class="hljs-comment"># (in seconds) Milvus will keep the record of import tasks for at least `importTaskRetention` seconds. Default 86400</span>
  <span class="hljs-comment"># seconds (24 hours).</span>
  <span class="hljs-comment"># Note: If default value is to be changed, change also the default in: internal/util/paramtable/component_param.go</span>
  importTaskRetention: <span class="hljs-number">86400</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-NumPy-files" class="common-anchor-header">Create NumPy files</h3><p>The following examples demonstrate how to create NumPy files for columns of data types that Milvus supports.</p>
<ul>
<li><p>Create a Numpy file from a boolean array</p>
  <div class="none-filter">
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
data = [<span class="hljs-literal">True</span>, <span class="hljs-literal">False</span>, <span class="hljs-literal">True</span>, <span class="hljs-literal">False</span>]
dt = np.dtype(<span class="hljs-string">&#x27;bool&#x27;</span>, (<span class="hljs-built_in">len</span>(data)))
arr = np.array(data, dtype=dt)
np.save(file_path, arr)
<button class="copy-code-btn"></button></code></pre>
  </div>
</li>
<li><p>Create a NumPy file from an int8 array</p>
  <div class="none-filter">
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
data = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
dt = np.dtype(<span class="hljs-string">&#x27;int8&#x27;</span>, (<span class="hljs-built_in">len</span>(data)))
arr = np.array(data, dtype=dt)
np.save(file_path, arr)
<button class="copy-code-btn"></button></code></pre>
  </div>
</li>
<li><p>Create a NumPy file from an int16 array</p>
  <div class="none-filter">
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
data = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
dt = np.dtype(<span class="hljs-string">&#x27;int16&#x27;</span>, (<span class="hljs-built_in">len</span>(data)))
arr = np.array(data, dtype=dt)
np.save(file_path, arr)
<button class="copy-code-btn"></button></code></pre>
  </div>
</li>
<li><p>Create a NumPy file from an int32 array</p>
  <div class="none-filter">
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
data = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
dt = np.dtype(<span class="hljs-string">&#x27;int32&#x27;</span>, (<span class="hljs-built_in">len</span>(data)))
arr = np.array(data, dtype=dt)
np.save(file_path, arr)
<button class="copy-code-btn"></button></code></pre>
  </div>
</li>
<li><p>Create a NumPy file from an int64 array</p>
  <div class="none-filter">
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
data = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
dt = np.dtype(<span class="hljs-string">&#x27;int64&#x27;</span>, (<span class="hljs-built_in">len</span>(data)))
arr = np.array(data, dtype=dt)
np.save(file_path, arr)
<button class="copy-code-btn"></button></code></pre>
  </div>
</li>
<li><p>Create a NumPy file from a float array</p>
  <div class="none-filter">
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
data = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]
dt = np.dtype(<span class="hljs-string">&#x27;float32&#x27;</span>, (<span class="hljs-built_in">len</span>(data)))
arr = np.array(data, dtype=dt)
np.save(file_path, arr)
<button class="copy-code-btn"></button></code></pre>
  </div>
</li>
<li><p>Create a NumPy file from a double float array</p>
  <div class="none-filter">
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
data = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]
dt = np.dtype(<span class="hljs-string">&#x27;float64&#x27;</span>, (<span class="hljs-built_in">len</span>(data)))
arr = np.array(data, dtype=dt)
np.save(file_path, arr)
<button class="copy-code-btn"></button></code></pre>
  </div>
</li>
<li><p>Create a NumPy file from a VARCHAR array</p>
  <div class="none-filter">
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
data = [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-string">&quot;c&quot;</span>, <span class="hljs-string">&quot;d&quot;</span>]
arr = np.<span class="hljs-title function_">array</span>(data)
np.<span class="hljs-title function_">save</span>(file_path, arr)
<button class="copy-code-btn"></button></code></pre>
  </div>
</li>
<li><p>Create a NumPy file from a binary vector array</p>
<p>For binary vectors, use <strong>uint8</strong> as the NumPy data type. Each uint8 value represents 8 dimensions. For a 32-dimensional binary vector, use four uint8 values.</p>
  <div class="none-filter">
<pre><code translate="no" class="language-python">import numpy <span class="hljs-keyword">as</span> np
data = [
    [<span class="hljs-meta">43, 35, 124, 90</span>],
    [<span class="hljs-meta">65, 212, 12, 57</span>],
    [<span class="hljs-meta">6, 126, 232, 78</span>],
    [<span class="hljs-meta">87, 189, 38, 22</span>],
]
dt = np.dtype(<span class="hljs-string">&#x27;uint8&#x27;</span>, (len(data), <span class="hljs-number">4</span>))
arr = np.array(data)
np.save(file_path, arr)
<button class="copy-code-btn"></button></code></pre>
  </div>
</li>
<li><p>Create a NumPy file from a float vector array</p>
<p>In Milvus, you can use either float32 or float64 values to form a float vector.</p>
<p>The following snippet creates a NumPy file from an 8-dimensional vector array formed using float32 values.</p>
  <div class="none-filter">
<pre><code translate="no" class="language-python">import numpy <span class="hljs-keyword">as</span> np
data = [
    [<span class="hljs-meta">1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8</span>],
    [<span class="hljs-meta">2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8</span>],
    [<span class="hljs-meta">3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8</span>],
    [<span class="hljs-meta">4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8</span>],
]
dt = np.dtype(<span class="hljs-string">&#x27;float32&#x27;</span>, (len(data), <span class="hljs-number">8</span>))
arr = np.array(data)
np.save(file_path, arr)
<button class="copy-code-btn"></button></code></pre>
  </div>
</li>
</ul>
<h3 id="Import-multiple-NumPy-files-in-parallel" class="common-anchor-header">Import multiple NumPy files in parallel</h3><p>You can upload NumPy files into different subdirectories, create multiple import tasks, and execute them in parallel.</p>
<p>Assume the data structure is as follows:</p>
<pre>
├── task_1
│    └── book_id.npy
│    └── word_count.npy
│    └── book_intro.npy
│    └── book_props.npy
├── task_2
│    └── book_id.npy
│    └── word_count.npy
│    └── book_intro.npy
│    └── book_props.npy
</pre>
<p>You can create multiple data-import tasks as follows</p>
<div class="none-filter">
<pre><code translate="no" class="language-python">task_1 = utility.<span class="hljs-title function_">do_bulk_insert</span>(
    collection_name=<span class="hljs-string">&quot;book&quot;</span>,
    files=[<span class="hljs-string">&quot;task_1/book_id.npy&quot;</span>, <span class="hljs-string">&quot;task_1/word_count.npy&quot;</span>, <span class="hljs-string">&quot;task_1/book_intro.npy&quot;</span>, <span class="hljs-string">&quot;task_1/book_props.npy&quot;</span>]
)
task_2 = utility.<span class="hljs-title function_">do_bulk_insert</span>(
    collection_name=<span class="hljs-string">&quot;book&quot;</span>,
    files=[<span class="hljs-string">&quot;task_2/book_id.npy&quot;</span>, <span class="hljs-string">&quot;task_2/word_count.npy&quot;</span>, <span class="hljs-string">&quot;task_2/book_intro.npy&quot;</span>, <span class="hljs-string">&quot;task_2/book_props.npy&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Check-data-searchability" class="common-anchor-header">Check data searchability</h3><p>After a data-import task is complete, Milvus persists the imported data into segments and sends these segments to the index nodes for index-building. During the index-building process, these segments are unavailable for searches. Once such a process is complete, you need to call the load API again to load these segments into the query nodes. These segments will then be ready for searches.</p>
<ol>
<li>Check the index-building progress</li>
</ol>
<p>PyMilvus provides a utility method to wait for the index-building process to complete.</p>
<div class="none-filter">
<pre><code translate="no" class="language-python">utility.wait_for_index_building_complete(collection_name)
<button class="copy-code-btn"></button></code></pre>
</div>
<p>In other SDKs, you can use the describe-index API to check the index-building progress.</p>
<div class="none-filter">
<pre><code translate="no"><span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    R&lt;DescribeIndexResponse&gt; response = milvusClient.describeIndex(
        DescribeIndexParam.newBuilder()
            .withCollectionName(collection_name)
            .withIndexName(index_name)
            .build());
    <span class="hljs-type">IndexDescription</span> <span class="hljs-variable">desc</span> <span class="hljs-operator">=</span> response.getData().getIndexDescriptions(<span class="hljs-number">0</span>);
    <span class="hljs-keyword">if</span> (desc.getIndexedRows() == desc.getTotalRows()) {
        <span class="hljs-keyword">break</span>;
    }
}
<button class="copy-code-btn"></button></code></pre>
</div>
<ol start="2">
<li>Load new segments into query nodes</li>
</ol>
<p>Newly indexed segments need to be loaded manually as follows:</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>
<pre><code translate="no" class="language-python">collection.load(_refresh = <span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">R&lt;<span class="hljs-title class_">RpcStatus</span>&gt; response = milvusClient.<span class="hljs-title function_">loadCollection</span>(
    <span class="hljs-title class_">LoadCollectionParam</span>.<span class="hljs-title function_">newBuilder</span>()
        .<span class="hljs-title function_">withCollectionName</span>(collection_name)
        .<span class="hljs-title function_">withRefresh</span>(<span class="hljs-title class_">Boolean</span>.<span class="hljs-property">TRUE</span>)
        .<span class="hljs-title function_">build</span>());
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
  <div class="alert note">
<p>The <code translate="no">_refresh</code> parameter is <code translate="no">False</code> by default. Do not set it to <code translate="no">True</code> when you load a collection for the first time.</p>
  </div>
</div>
<div class="language-java">
  <div class="alert note">
<p>The <code translate="no">withRefresh()</code> method is optional. Do not call it with a <code translate="no">Boolean.TRUE</code> when you load a collection for the first time.</p>
  </div>
</div>
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
    </button></h2><p>Learn more basic operations of Milvus:</p>
<ul>
<li><a href="/docs/v2.3.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.3.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.3.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul>
