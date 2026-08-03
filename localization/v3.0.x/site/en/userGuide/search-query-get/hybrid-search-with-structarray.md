---
id: hybrid-search-with-structarray.md
title: Hybrid Search with StructArray
summary: >-
  Use this page to combine StructArray vector search with other vector searches
  in one hybrid search request. StructArray hybrid search can produce either
  entity-level results or element-level results, depending on the
  AnnSearchRequest objects you combine.
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">Hybrid Search with StructArray<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Use this page to combine StructArray vector search with other vector searches in one hybrid search request. StructArray hybrid search can produce either entity-level results or element-level results, depending on the <code translate="no">AnnSearchRequest</code> objects you combine.</p>
<p>This page uses the <code translate="no">tech_articles</code> collection from <a href="/docs/create-structarray-field.md">Create a StructArray Field</a>. The collection has a top-level vector field named <code translate="no">title_vector</code> and a StructArray field named <code translate="no">chunks</code>. The <code translate="no">chunks[emb_list_vector]</code> subfield is indexed for EmbeddingList search, and <code translate="no">chunks[emb]</code> is indexed for element-level search.</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">How hybrid search applies to StructArray<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> combination</th><th>Final candidate scope</th><th>Result behavior</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>Collection-level vector field + StructArray EmbeddingList subfield</td><td>Entity level</td><td>Final candidates are keyed by primary key.</td><td>Do not use.</td></tr>
<tr><td>Collection-level vector field + StructArray element-level subfield</td><td>Entity level</td><td>Element-level hits are collapsed to entity-level candidates before hybrid reranking.</td><td>Optional collapse config on the StructArray element-level <code translate="no">AnnSearchRequest</code>.</td></tr>
<tr><td>Multiple element-level subfields under the same StructArray field</td><td>Element level</td><td>Final candidates are keyed by primary key plus Struct element offset.</td><td>Do not use.</td></tr>
<tr><td>Element-level subfields under different StructArray fields</td><td>Entity level</td><td>Element offsets do not share identity, so each StructArray element-level <code translate="no">AnnSearchRequest</code> is collapsed before reranking.</td><td>Optional collapse config on each StructArray element-level <code translate="no">AnnSearchRequest</code>.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Warning</p>
<p>Use <code translate="no">element_scope</code> only to configure collapse for StructArray element-level <code translate="no">AnnSearchRequest</code> objects in a non-same-struct element-level hybrid search. Do not use it for EmbeddingList requests, collection-level vector requests, or same-StructArray element-level hybrid search.</p>
</div>
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
    </button></h2><p>Prepare the collection, data, and indexes before running hybrid search.</p>
<table>
<thead>
<tr><th>Requirement</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td>StructArray field</td><td>The collection contains a StructArray field such as <code translate="no">chunks</code>.</td></tr>
<tr><td>Vector subfields</td><td>Use separate vector subfields for EmbeddingList search and element-level search.</td></tr>
<tr><td>Indexes</td><td><code translate="no">chunks[emb_list_vector]</code> uses a <code translate="no">MAX_SIM*</code> metric. <code translate="no">chunks[emb]</code> uses a regular vector metric such as <code translate="no">COSINE</code>, <code translate="no">IP</code>, or <code translate="no">L2</code>.</td></tr>
<tr><td>Reranker</td><td>Choose a hybrid reranker such as <code translate="no">RRFRanker</code> or another reranker supported by your application.</td></tr>
</tbody>
</table>
<p>For index setup, see <a href="/docs/index-structarray-fields.md">Index StructArray Fields</a>.</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">Run hybrid search with an EmbeddingList request<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>EmbeddingList search on a StructArray vector subfield is entity-level in hybrid search. It behaves like an entity-level vector search request and does not return one matched Struct element offset.</p>
<pre><code translate="no">from pymilvus import AnnSearchRequest, MilvusClient, RRFRanker
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [0.19, 0.24, 0.30, 0.37]

query_list = EmbeddingList()
query_list.add([0.12, 0.21, 0.32, 0.44])
query_list.add([0.18, 0.23, 0.29, 0.36])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=10,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=10,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>In this example, both <code translate="no">AnnSearchRequest</code> objects produce entity-level candidates. The final result is keyed by the parent entity primary key. Do not add <code translate="no">element_scope</code> to the EmbeddingList request.</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">Run same-StructArray element-level hybrid search<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>When all <code translate="no">AnnSearchRequest</code> objects target element-level vector subfields under the same StructArray field, hybrid search can keep element-level candidates through reranking. This is the only StructArray hybrid mode where final results remain element-level.</p>
<p>The following example assumes the <code translate="no">chunks</code> StructArray field has two element-level vector subfields, <code translate="no">chunks[emb]</code> and <code translate="no">chunks[code_emb]</code>, and both use regular vector metrics.</p>
<pre><code translate="no">index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
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
<p>Both <code translate="no">AnnSearchRequest</code> objects search vector subfields under <code translate="no">chunks</code>. The same zero-based offset refers to the same Struct element, so the hybrid reranker can rank element candidates directly. Do not set <code translate="no">element_scope</code> in this mode because no entity-level collapse is performed.</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">Collapse element-level hits for entity-level hybrid search<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>If a hybrid search mixes a StructArray element-level <code translate="no">AnnSearchRequest</code> with a collection-level vector request, an EmbeddingList request, or an element-level request under a different StructArray field, the final candidate scope is entity-level. In this case, each StructArray element-level <code translate="no">AnnSearchRequest</code> is collapsed to entity-level candidates before hybrid reranking.</p>
<p>Use <code translate="no">element_scope</code> inside the <code translate="no">params</code> of the StructArray element-level <code translate="no">AnnSearchRequest</code> when you need to control how multiple matched elements from the same entity are collapsed.</p>
<pre><code translate="no">title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;element_scope&quot;</span>: {
                <span class="hljs-string">&quot;collapse&quot;</span>: {
                    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;topk_sum&quot;</span>,
                    <span class="hljs-string">&quot;topk&quot;</span>: 3,
                },
            },
        },
    },
    <span class="hljs-built_in">limit</span>=30,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[quality_score] &gt; 0.8)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>In this example, <code translate="no">title_req</code> is entity-level, so the final hybrid result is also entity-level. The <code translate="no">chunk_req</code> request first returns element hits from <code translate="no">chunks[emb]</code>, then collapses the returned elements from the same entity by summing the best three element scores. If <code translate="no">element_scope</code> is omitted when entity-level collapse is needed, the collapse strategy defaults to <code translate="no">max</code>.</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">Choose a collapse strategy<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>Strategy</th><th>Behavior</th><th><code translate="no">topk</code></th><th>Metric requirement</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>Keep the best returned element score for the entity.</td><td>Not allowed.</td><td>Any supported regular vector metric.</td></tr>
<tr><td><code translate="no">sum</code></td><td>Sum all returned element scores for the entity.</td><td>Not allowed.</td><td>Positive-correlation metrics only, such as <code translate="no">IP</code> or <code translate="no">COSINE</code>.</td></tr>
<tr><td><code translate="no">avg</code></td><td>Average all returned element scores for the entity.</td><td>Not allowed.</td><td>Any supported regular vector metric.</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>Sum the best <code translate="no">K</code> returned element scores for the entity.</td><td>Required and must be positive.</td><td>Positive-correlation metrics only, such as <code translate="no">IP</code> or <code translate="no">COSINE</code>.</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>Average the best <code translate="no">K</code> returned element scores for the entity.</td><td>Required and must be positive.</td><td>Any supported regular vector metric.</td></tr>
</tbody>
</table>
<p>Collapse uses only the element hits returned by that StructArray element-level <code translate="no">AnnSearchRequest</code>. It does not scan every Struct element in the entity after ANN search. Set the request <code translate="no">limit</code> high enough to provide the elements you want available for collapse.</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">Add filters, range search, and grouping<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p>You can attach <code translate="no">element_filter</code> to a StructArray element-level <code translate="no">AnnSearchRequest</code> when scalar conditions should apply to the same Struct elements that participate in vector search. You can also use a top-level <code translate="no">filter</code> on <code translate="no">hybrid_search()</code> for parent-entity conditions.</p>
<p>StructArray element-level vector fields support range search in hybrid search. Add <code translate="no">radius</code> and, optionally, <code translate="no">range_filter</code> to the element-level <code translate="no">AnnSearchRequest</code>. EmbeddingList-level StructArray requests do not support range search.</p>
<p>Element-level hybrid grouping is supported only when all <code translate="no">AnnSearchRequest</code> objects target element-level vector fields under the same StructArray field, and <code translate="no">group_by_field</code> must be the primary key. Hybrid grouping is not supported when the request mixes collection-level vector fields, different StructArray fields, or EmbeddingList-level requests. Do not combine range search with grouping.</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">Interpret hybrid results<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>Final candidate scope</th><th>Result key</th><th>Offset behavior</th><th>When it happens</th></tr>
</thead>
<tbody>
<tr><td>Entity level</td><td>Primary key.</td><td>No element offset in the final result.</td><td>The hybrid request includes a collection-level vector field, an EmbeddingList request, or element-level requests under different StructArray fields.</td></tr>
<tr><td>Element level</td><td>Primary key plus parent StructArray field plus element offset.</td><td>The selected element offset can be returned when exposed by the API or SDK.</td><td>All <code translate="no">AnnSearchRequest</code> objects are element-level and under the same StructArray field.</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">Limitations<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>Use <code translate="no">element_scope</code> only for StructArray element-level <code translate="no">AnnSearchRequest</code> objects that must be collapsed to entity-level candidates in hybrid search.</p></li>
<li><p>Do not use <code translate="no">element_scope</code> for EmbeddingList requests, collection-level vector requests, or same-StructArray element-level hybrid search.</p></li>
<li><p><code translate="no">sum</code> and <code translate="no">topk_sum</code> collapse strategies require positive-correlation metrics, such as <code translate="no">IP</code> or <code translate="no">COSINE</code>. Do not use them with <code translate="no">L2</code>.</p></li>
<li><p><code translate="no">topk_sum</code> and <code translate="no">topk_avg</code> require a positive <code translate="no">topk</code> value. Other collapse strategies must not include <code translate="no">topk</code>.</p></li>
<li><p>EmbeddingList-level StructArray requests do not support range search or group-by.</p></li>
<li><p>Hybrid group-by is supported only for same-StructArray element-level hybrid search and only by primary key.</p></li>
<li><p>Do not combine range search with group-by.</p></li>
</ul>
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
<li><p>Adding <code translate="no">element_scope</code> to a same-StructArray element-level hybrid request. That request remains element-level and does not perform entity-level collapse.</p></li>
<li><p>Adding <code translate="no">element_scope</code> to <code translate="no">chunks[emb_list_vector]</code>. EmbeddingList search is already entity-level.</p></li>
<li><p>Assuming two StructArray fields share element offsets. Offset <code translate="no">3</code> in <code translate="no">chunks</code> and offset <code translate="no">3</code> in another StructArray field are different elements, so the hybrid request becomes entity-level.</p></li>
<li><p>Using <code translate="no">topk_sum</code> with <code translate="no">L2</code>. Use <code translate="no">max</code>, <code translate="no">avg</code>, or <code translate="no">topk_avg</code> for negative distance metrics.</p></li>
<li><p>Expecting entity-level hybrid results to include the selected Struct element offset after collapse.</p></li>
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
<li><p>To learn the two basic StructArray vector search modes, read <a href="/docs/basic-vector-search-with-structarray.md">Basic Vector Search with StructArray</a>.</p></li>
<li><p>To add scalar filters to hybrid search, read <a href="/docs/filtered-search-with-structarray.md">Filtered Search with StructArray</a>.</p></li>
<li><p>To use score or distance boundaries in hybrid search, read <a href="/docs/range-search-with-structarray.md">Range Search with StructArray</a>.</p></li>
<li><p>To group element-level hybrid results by parent entity, read <a href="/docs/grouping-search-with-structarray.md">Grouping Search with StructArray</a>.</p></li>
<li><p>To check StructArray search limits, read <a href="/docs/structarray-limits.md">StructArray Limits</a>.</p></li>
</ol>
