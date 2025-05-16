---
id: modify_collection.md
related_key: modify collection
summary: Learn how to modify the properties of a collection in Milvus.
title: ''
---
<h1 id="Modify-a-collection" class="common-anchor-header">Modify a collection<button data-href="#Modify-a-collection" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to modify the properties, especially the time to live (TTL), of a collection.</p>
<p>Currently, the TTL feature is only available in Python.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
</div>
<pre><code translate="no" class="language-python">collection = <span class="hljs-title class_">Collection</span>(<span class="hljs-string">&quot;books&quot;</span>)
collection.<span class="hljs-title function_">set_properties</span>(properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1800</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">AlterCollectionParam</span> <span class="hljs-variable">alterCollectionParam</span> <span class="hljs-operator">=</span> AlterCollectionParam.newBuilder
  .withCollectionName(<span class="hljs-string">&quot;books&quot;</span>)
  .withTTL(<span class="hljs-number">1800</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">client.<span class="hljs-title class_">AlterCollection</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;books&quot;</span>, entity.<span class="hljs-title class_">CollectionTTL</span>(<span class="hljs-number">1800</span>))
<button class="copy-code-btn"></button></code></pre>
<p>The example above changes the collection TTL to 1800 seconds.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Option</th></tr>
</thead>
<tbody>
<tr><td>Properties: collection.ttl.seconds</td><td>Collection time to live (TTL) is the expiration time of data in a collection. Expired data in the collection will be cleaned up and will not be involved in searches or queries. Specify TTL in the unit of seconds.</td><td>The value should be 0 or greater. The default value is 0, which means TTL is disabled.</td></tr>
</tbody>
</table>
<blockquote>
<p>TTL only happens after compaction which means the expired data will be invisible and GC after segment compacted.</p>
</blockquote>
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
<li><a href="/docs/v2.2.x/insert_data.md">Insert data into Milvus</a></li>
<li><a href="/docs/v2.2.x/create_partition.md">Create a partition</a></li>
<li><a href="/docs/v2.2.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.2.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.2.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
</ul>
