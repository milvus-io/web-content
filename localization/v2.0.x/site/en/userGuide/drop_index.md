---
id: drop_index.md
related_key: drop index
summary: Learn how to drop an index in Milvus.
title: ''
---
<h1 id="Drop-an-Index" class="common-anchor-header">Drop an Index<button data-href="#Drop-an-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to drop an index in Milvus.</p>
<div class="alert caution">
Dropping an index irreversibly removes all corresponding index files.
</div>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      <span class="hljs-comment"># Get an existing collection.</span>
collection.drop_index()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">indexManager</span>.<span class="hljs-title function_">dropIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = milvusClient.<span class="hljs-title class_">DropIndex</span>(
  context.<span class="hljs-title class_">Background</span>(),     <span class="hljs-comment">// ctx</span>
  <span class="hljs-string">&quot;book&quot;</span>,                   <span class="hljs-comment">// CollectionName</span>
  <span class="hljs-string">&quot;book_intro&quot;</span>,             <span class="hljs-comment">// fieldName</span>
)
<span class="hljs-keyword">if</span> err != nil {
  log.<span class="hljs-title class_">Fatal</span>(<span class="hljs-string">&quot;fail to drop index:&quot;</span>, err.<span class="hljs-title class_">Error</span>())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.<span class="hljs-title function_">dropIndex</span>(
  <span class="hljs-title class_">DropIndexParam</span>.<span class="hljs-title function_">newBuilder</span>()
    .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;book&quot;</span>)
    .<span class="hljs-title function_">withFieldName</span>(<span class="hljs-string">&quot;book_intro&quot;</span>)
    .<span class="hljs-title function_">build</span>()
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> index -c book
<button class="copy-code-btn"></button></code></pre>
<table class="language-javascript">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">collection_name</code></td>
            <td>Name of the collection to drop index from.</td>
        </tr>
    </tbody>
</table>
<table class="language-go">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">ctx</code></td>
            <td>Context to control API invocation process.</td>
        </tr>
        <tr>
            <td><code translate="no">CollectionName</code></td>
            <td>Name of the collection to drop index on.</td>
        </tr>
        <tr>
            <td><code translate="no">fieldName</code></td>
            <td>Name of the vector field to drop index on.</td>
        </tr>
    </tbody>
</table>
<table class="language-java">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">CollectionName</code></td>
            <td>Name of the collection to drop index on.</td>
        </tr>
        <tr>
            <td><code translate="no">FieldName</code></td>
            <td>Name of the vector field to drop index on.</td>
        </tr>
    </tbody>
</table>
<table class="language-shell">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>Name of the collection to drop index from.</td>
        </tr>
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
<li><a href="/docs/v2.0.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.0.x/hybridsearch.md">Conduct a hybrid search</a></li>
<li><a href="/docs/v2.0.x/timetravel.md">Search with Time Travel</a></li>
</ul></li>
</ul>
