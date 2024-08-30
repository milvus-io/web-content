---
id: tune_consistency.md
related_key: tune consistency
title: Tune Consistency
summary: Learn how to tune consistency level in Milvus.
deprecate: true
---

<h1 id="Tune-consistency" class="common-anchor-header">Tune consistency<button data-href="#Tune-consistency" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus supports setting consistency level while creating a collection, conducting a vector query, and conducting a vector search (only on PyMilvus currently). Milvus supports four levels of consistency: <code translate="no">Strong</code>, <code translate="no">Eventual</code>, <code translate="no">Bounded</code>, and <code translate="no">Session</code>. By default, a collection created without specifying the consistency level is set with <code translate="no">Bounded</code> consistency level. This topic describes how to tune consistency.</p>
<h2 id="Configure-parameter" class="common-anchor-header">Configure parameter<button data-href="#Configure-parameter" class="anchor-icon" translate="no">
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
    </button></h2><p>By default, the consistency level is set as <code translate="no">Bounded</code>, under which Milvus reads a less updated data view (usually several seconds earlier) when a search or query request comes. You can set the consistency level by configuring the parameter <code translate="no">consistency_level</code> while creating a collection and conducting a search or query. See <a href="https://github.com/milvus-io/milvus/blob/master/docs/developer_guides/how-guarantee-ts-works.md">Guarantee Timestamp in Search Requests</a> for the mechanism behind.</p>
<table class="language-python">
        <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><code translate="no">consistency_level</code></td>
            <td>Consistency level of the collection to create.</td>
            <td>
                <ul>
                    <li><code translate="no">Strong</code></li>
                    <li><code translate="no">Bounded</code></li>
                    <li><code translate="no">Session</code></li>
                    <li><code translate="no">Eventually</code></li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>
<h4 id="Example" class="common-anchor-header">Example</h4><p>The following examples set the consistency level as <code translate="no">Strong</code>, meaning Milvus will read the most updated data view at the exact time point when a search or query request comes. The consistency level set in the search or query requests overwrites the one set while creating the collection.  Without specifying the consistency level during a search or query, Milvus adopts the original consistency level of the collection.</p>
<ul>
<li><strong>Create a collection</strong></li>
</ul>
<pre><code translate="no"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>
collection = <span class="hljs-title class_">Collection</span>(
    name=collection_name, 
    schema=schema, 
    using=<span class="hljs-string">&#x27;default&#x27;</span>, 
    shards_num=<span class="hljs-number">2</span>,
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
    )
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><strong>Conduct a vector search</strong></li>
</ul>
<pre><code translate="no">result = hello_milvus.search(
        vectors_to_search,
        <span class="hljs-string">&quot;embeddings&quot;</span>,
        search_params,
        limit=<span class="hljs-number">3</span>,
        output_fields=[<span class="hljs-string">&quot;random&quot;</span>],
        <span class="hljs-comment"># search will scan all entities inserted into Milvus.</span>
        consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
        )
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><strong>Conduct a vector query</strong></li>
</ul>
<pre><code translate="no">res = collection.query(
  <span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;book_id in [2,4,6,8]&quot;</span>, 
  output_fields = [<span class="hljs-string">&quot;book_id&quot;</span>, <span class="hljs-string">&quot;book_intro&quot;</span>],
  consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
