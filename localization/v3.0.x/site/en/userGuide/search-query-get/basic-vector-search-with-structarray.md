---
id: basic-vector-search-with-structarray.md
title: Basic Vector Search with StructArray
summary: >-
  Use this page to run vector search on vector subfields inside a StructArray
  field. StructArray supports two basic vector search modes: EmbeddingList
  search, which scores an embedding list stored in each entity, and
  element-level search, which searches each Struct element independently.
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">Basic Vector Search with StructArray<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Use this page to run vector search on vector subfields inside a StructArray field. StructArray supports two basic vector search modes: EmbeddingList search, which scores an embedding list stored in each entity, and element-level search, which searches each Struct element independently.</p>
<p>This page uses the <code translate="no">tech_articles</code> collection from <a href="/docs/create-structarray-field.md">Create a StructArray Field</a>. The collection has a StructArray field named <code translate="no">chunks</code>. Each chunk contains text, scalar metadata, a vector subfield named <code translate="no">emb_list_vector</code> with an index for EmbeddingList search, and a vector subfield named <code translate="no">emb</code> with an index for element-level search.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Before you begin<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Make sure the collection schema, data, and indexes are already prepared.</p>
<table>
<thead>
<tr><th>Requirement</th><th>Where to prepare it</th></tr>
</thead>
<tbody>
<tr><td>Create a StructArray field, such as <code translate="no">chunks</code>.</td><td><a href="/docs/create-structarray-field.md">Create a StructArray Field</a></td></tr>
<tr><td>Insert entities whose <code translate="no">chunks</code> field contains Struct objects.</td><td><a href="/docs/insert-data-into-structarray-fields.md">Insert Data into StructArray Fields</a></td></tr>
<tr><td>Create a <code translate="no">MAX_SIM*</code> index on <code translate="no">chunks[emb_list_vector]</code> for EmbeddingList search.</td><td><a href="/docs/index-structarray-fields.md">Index StructArray Fields</a></td></tr>
<tr><td>Create a regular vector-metric index on <code translate="no">chunks[emb]</code> for element-level search.</td><td><a href="/docs/index-structarray-fields.md">Index StructArray Fields</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Warning</p>
<p>A vector field or vector subfield accepts only one index. If you need both EmbeddingList search and element-level search, create two separate vector subfields. In this page, <code translate="no">chunks[emb_list_vector]</code> is indexed for EmbeddingList search, and <code translate="no">chunks[emb]</code> is indexed for element-level search.</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">Choose a search mode<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
<tr><th>Aspect</th><th>EmbeddingList search</th><th>Element-level search</th></tr>
</thead>
<tbody>
<tr><td>Target subfield</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Query data</td><td>An embedding list that contains one or more vectors.</td><td>A regular vector.</td></tr>
<tr><td>Metric family</td><td><code translate="no">MAX_SIM*</code>, such as <code translate="no">MAX_SIM_COSINE</code>.</td><td>Regular vector metrics, such as <code translate="no">COSINE</code>, <code translate="no">IP</code>, or <code translate="no">L2</code>.</td></tr>
<tr><td>What one hit represents</td><td>A matched entity whose StructArray vector subfield is similar to the query embedding list.</td><td>A matched Struct element inside the StructArray field.</td></tr>
<tr><td>Result granularity</td><td>Entity level.</td><td>Struct element level.</td></tr>
<tr><td>Offset</td><td>Not applicable.</td><td>Identifies the zero-based position of the matched Struct element when returned.</td></tr>
<tr><td>Typical use</td><td>ColBERT, ColPali, and other late-interaction retrieval patterns.</td><td>Chunk-level, passage-level, clip-level, patch-level, or fact-level retrieval.</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">Run EmbeddingList search<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Use EmbeddingList search when the query itself contains multiple vectors and the target StructArray vector subfield is indexed with a <code translate="no">MAX_SIM*</code> metric. The result is an entity-level match.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;id&quot;</span>], hit[<span class="hljs-string">&quot;distance&quot;</span>], hit[<span class="hljs-string">&quot;entity&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>In this search mode, <code translate="no">limit</code> controls how many entities are returned for each query. The output can include StructArray subfields, but the hit itself represents the matched parent entity rather than one specific Struct element.</p>
<div class="alert note">
<p>For a full ColBERT or ColPali-style walkthrough, see <a href="/docs/search-with-embedding-lists.md">Search with Embedding Lists</a>. This page only covers the basic StructArray search behavior.</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">Run element-level search<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Use element-level search when each Struct element should participate in vector search independently. The query is a regular vector, and the target vector subfield must be indexed with a regular vector metric.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>In element-level search, each hit represents a matched Struct element. The <code translate="no">offset</code> value is the zero-based position of that element in the StructArray field. The same entity can appear more than once if more than one Struct element matches the query. The <code translate="no">limit</code> value applies to element hits, not unique parent entities.</p>
<h2 id="Interpret-results" class="common-anchor-header">Interpret results<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
<tr><th>Result item</th><th>EmbeddingList search</th><th>Element-level search</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Primary key of the matched entity.</td><td>Primary key of the entity that contains the matched Struct element.</td></tr>
<tr><td><code translate="no">distance</code> or score</td><td>Score or distance between the query embedding list and the stored embedding list.</td><td>Score or distance between the query vector and the matched Struct element vector.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Not applicable.</td><td>Zero-based position of the matched Struct element when returned.</td></tr>
<tr><td>Repeated primary keys</td><td>Not expected for a single query because results are entity-level.</td><td>Possible, because multiple Struct elements in the same entity can match.</td></tr>
<tr><td>Requested StructArray output fields</td><td>Returned from the matched entity.</td><td>Returned with the element-level hit shape supported by the target API and SDK.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">Common mistakes<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Using <code translate="no">chunks.emb</code> instead of the required subfield path syntax <code translate="no">chunks[emb]</code>.</p></li>
<li><p>Using an EmbeddingList query against a vector subfield indexed with a regular vector metric.</p></li>
<li><p>Using a regular vector query against a vector subfield indexed with a <code translate="no">MAX_SIM*</code> metric.</p></li>
<li><p>Expecting element-level search <code translate="no">limit</code> to return that many unique parent entities. It returns element hits.</p></li>
<li><p>Expecting EmbeddingList search to return one specific element offset. It returns entity-level matches.</p></li>
<li><p>Reusing one vector subfield for both search modes. Use separate vector subfields because each vector subfield accepts only one index.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Next steps<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>To restrict element-level search by scalar conditions, read <a href="/docs/filtered-search-with-structarray.md">Filtered Search with StructArray</a>.</p></li>
<li><p>To search by score or distance boundaries, read <a href="/docs/range-search-with-structarray.md">Range Search with StructArray</a>.</p></li>
<li><p>To return at most one result per parent entity after element-level search, read <a href="/docs/grouping-search-with-structarray.md">Grouping Search with StructArray</a>.</p></li>
<li><p>To combine StructArray search with other vector searches, read <a href="/docs/hybrid-search-with-structarray.md">Hybrid Search with StructArray</a>.</p></li>
<li><p>To review supported data types, metrics, filters, and version-specific limits, read <a href="/docs/structarray-limits.md">StructArray Limits</a>.</p></li>
</ol>
