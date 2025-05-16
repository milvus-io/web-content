---
id: rename_collection.md
related_key: rename collection
summary: Learn how to rename a collection from memory in Milvus.
title: Rename a Collection
---
<h1 id="Rename-a-Collection" class="common-anchor-header">Rename a Collection<button data-href="#Rename-a-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>If you want to rename a collection, you can use the collection-renaming API to interact with Milvus. This guide helps you understand how to rename an existing collection using the SDK of your choice.</p>
<div class="alert note">
<p>When interacting with Milvus using Python code, you have the flexibility to choose between PyMilvus and MilvusClient (new). For more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/About.md">Python SDK</a>.</p>
</div>
<p>In the following code snippet, we create a collection and name it <code translate="no">old_collection</code>. Then we rename it <code translate="no">new_collection</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection, FieldSchema, CollectionSchema, DataType, connections, utility
connections.connect(alias=<span class="hljs-string">&quot;default&quot;</span>)
schema = CollectionSchema(fields=[
<span class="hljs-meta">... </span>    FieldSchema(<span class="hljs-string">&quot;int64&quot;</span>, DataType.INT64, description=<span class="hljs-string">&quot;int64&quot;</span>, is_primary=<span class="hljs-literal">True</span>),
<span class="hljs-meta">... </span>    FieldSchema(<span class="hljs-string">&quot;float_vector&quot;</span>, DataType.FLOAT_VECTOR, is_primary=<span class="hljs-literal">False</span>, dim=<span class="hljs-number">128</span>),
<span class="hljs-meta">... </span>])
collection = Collection(name=<span class="hljs-string">&quot;old_collection&quot;</span>, schema=schema)
utility.rename_collection(<span class="hljs-string">&quot;old_collection&quot;</span>, <span class="hljs-string">&quot;new_collection&quot;</span>) <span class="hljs-comment"># Output: True</span>
utility.drop_collection(<span class="hljs-string">&quot;new_collection&quot;</span>)
utility.has_collection(<span class="hljs-string">&quot;new_collection&quot;</span>) <span class="hljs-comment"># Output: False</span>
<button class="copy-code-btn"></button></code></pre>
<p>For code examples in the flavor of other programming languages, keep watching.</p>
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
<li><a href="/docs/v2.3.x/insert_data.md">Insert data into Milvus</a></li>
<li><a href="/docs/v2.3.x/create_partition.md">Create a partition</a></li>
<li><a href="/docs/v2.3.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.3.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.3.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul>
