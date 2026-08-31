---
id: search-aggregation.md
title: Search AggregationCompatible with Milvus 3.0.x
summary: >-
  Die Ergebnisse der Vektorsuche werden in Buckets gruppiert, Metriken pro
  Bucket berechnet, die Buckets sortiert und repräsentative Treffer
  zurückgegeben.
beta: Milvus 3.0.x
---
<h1 id="Search-Aggregation" class="common-anchor-header">Search Aggregation<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>When a shopper searches for “black running shoes for daily training,” approximate nearest neighbor (ANN) search ranks products by vector similarity and returns a flat Top-K list. The results can be relevant but repetitive: in the example below, four of the first six results are Brand A products, while Brand B and Brand C appear once each.</p>
<p>A flat list cannot directly provide a bucket-oriented summary. An application may need to compare brands by retained candidate count or average price, inspect a small number of representative products from each brand, or organize the results into multiple bucket levels.</p>
<p>Search Aggregation organizes retained ANN candidates into buckets based on selected scalar fields. In this example, each brand becomes a separate bucket. Milvus can calculate statistics for each bucket, order the buckets, and attach representative products. The application consumes this bucket-first response through <code translate="no">result.agg_buckets</code>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" />
    <span>A flat running-shoe search result becomes a set of comparable brand buckets</span>
  </span>
</p>
<p>Search Aggregation does not run an exact full-collection aggregation. Bucket existence, counts, metrics, ordering, and representative hits depend on the candidates retained by the ANN and grouping stages.</p>
<h2 id="How-it-works" class="common-anchor-header">How it works<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits" class="doc-image" id="ann-candidates-grouped-by-bucket-keys-and-returned-with-counts,-metrics,-and-representative-hits" />
    <span>ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits</span>
  </span>
</p>
<ol>
<li><p><strong>Retrieve candidates.</strong> Milvus runs ANN search to find entities closest to the query vector. The grouping stage then retains a bounded number of candidates for each full composite key. This per-key candidate budget is the largest <code translate="no">TopHits.size</code> anywhere in the aggregation tree, or <code translate="no">1</code> when no level configures <code translate="no">top_hits</code>.</p></li>
<li><p><strong>Build buckets.</strong> <code translate="no">SearchAggregation.fields</code> defines the bucket key. Each unique combination of field values creates a separate key. In the figure, <code translate="no">fields=[&quot;brand&quot;]</code> creates <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code>, and <code translate="no">(Brand C)</code> bucket keys. Retained candidates with the same key belong to the same bucket and contribute to its <code translate="no">count</code>. <code translate="no">SearchAggregation.size</code> limits how many buckets Milvus returns.</p></li>
<li><p><strong>Calculate and return results.</strong> Each returned bucket contains its key and retained-candidate count. Milvus can also calculate configured metrics, order the buckets, return representative entities, and build child buckets. Each <code translate="no">AggregationBucket</code> in <code translate="no">result.agg_buckets</code> exposes <code translate="no">key</code>, <code translate="no">count</code>, <code translate="no">metrics</code>, <code translate="no">hits</code>, and <code translate="no">sub_groups</code>. When Search Aggregation is enabled, the ordinary search-hit list is empty.</p></li>
</ol>
<p>In the diagram, <code translate="no">TopHits.size=4</code> supplies a per-key candidate budget of four, so the four retained Brand A candidates produce <code translate="no">count: 4</code>. The completed Brand A card shows only two of the four returned representative hits to keep the figure compact.</p>
<p>With <code translate="no">sub_aggregation</code>, Milvus repeats steps 2 and 3 inside each parent bucket. Changes in ANN recall or the per-key candidate budget can change bucket counts, metrics, ordering, hits, and nested results.</p>
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
    </button></h2><p>Before using Search Aggregation, note the following limits:</p>
<ul>
<li><p><strong>Nested aggregations:</strong> A request can contain one root <code translate="no">SearchAggregation</code> and up to three nested <code translate="no">sub_aggregation</code> levels, for a maximum of four levels in total. Across all levels, at most 10 fields can be used to create bucket keys.</p></li>
<li><p><strong>Fields used to create bucket keys:</strong> <code translate="no">SearchAggregation.fields</code> supports Boolean, integer, <code translate="no">VARCHAR</code>, and <code translate="no">TIMESTAMPTZ</code> fields. It does not support <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">ARRAY</code>, <code translate="no">JSON</code>, <code translate="no">GEOMETRY</code>, <code translate="no">TEXT</code>, vector, or dynamic fields.</p></li>
<li><p><strong>Metric fields:</strong> <code translate="no">count</code> accepts <code translate="no">&quot;*&quot;</code> or any non-<code translate="no">JSON</code>, non-dynamic field and skips <code translate="no">NULL</code> values when a field is specified. <code translate="no">sum</code> and <code translate="no">avg</code> accept integer and floating-point fields. <code translate="no">min</code> and <code translate="no">max</code> additionally accept string and <code translate="no">TIMESTAMPTZ</code> fields.</p></li>
<li><p><strong>Top Hits sorting fields:</strong> <code translate="no">TopHits.sort</code> accepts comparable Boolean, integer, floating-point, string, and <code translate="no">TIMESTAMPTZ</code> fields, plus <code translate="no">_score</code>. It does not support <code translate="no">ARRAY</code>, <code translate="no">JSON</code>, <code translate="no">GEOMETRY</code>, vector, or dynamic fields.</p></li>
<li><p><strong>Candidate budget:</strong> The largest <code translate="no">TopHits.size</code> anywhere in the aggregation tree is also the number of candidates retained per full composite key. If no level configures <code translate="no">top_hits</code>, Milvus retains one candidate per key. Bucket <code translate="no">count</code> and metrics are calculated from these retained candidates, so changing <code translate="no">TopHits.size</code> can change them.</p></li>
<li><p><strong>Nullable bucket fields:</strong> A <code translate="no">NULL</code> value forms its own bucket key. To exclude the null bucket, add a filter such as <code translate="no">brand is not null</code> to the search request.</p></li>
<li><p><strong>Repeated fields:</strong> The same field cannot appear in more than one <code translate="no">SearchAggregation.fields</code> list. For example, if the root aggregation uses <code translate="no">fields=[&quot;category&quot;]</code>, a nested <code translate="no">sub_aggregation</code> cannot also use <code translate="no">fields=[&quot;category&quot;]</code>.</p></li>
<li><p><strong>Unsupported combinations:</strong> Search Aggregation cannot be combined with a non-zero <code translate="no">offset</code>, Search Iterators, Hybrid Search, a Highlighter, or Grouping Search. A top-level <code translate="no">offset</code> value of <code translate="no">0</code> is equivalent to omitting the parameter. In REST v2 search requests, <code translate="no">searchAggregation</code> and <code translate="no">ids</code> cannot be specified together.</p></li>
<li><p><strong>Returned entries:</strong> By default, Milvus rejects a Search Aggregation request when the request’s calculated maximum number of result entries exceeds 10,000. This threshold is controlled by <code translate="no">proxy.maxSearchAggregationResultEntries</code>. Set the configuration value to <code translate="no">0</code> or a negative number to disable this check.</p>
<p>Milvus calculates this maximum as:</p>
<p><code translate="no">number of query vectors × product of the effective search_size at every aggregation level × largest TopHits.size at any level</code></p>
<p>For this server-side calculation, the effective <code translate="no">search_size</code> at a level is the explicitly configured <code translate="no">search_size</code>, or that level’s <code translate="no">size</code> when <code translate="no">search_size</code> is omitted. The PyMilvus API used in this guide does not currently expose <code translate="no">search_size</code>, so PyMilvus requests use each level’s <code translate="no">size</code> for this calculation. Use <code translate="no">1</code> for the last factor when no level configures <code translate="no">TopHits</code>. For example, one query vector, 10 root buckets, five child buckets per root bucket, and two hits per child bucket produce a calculated maximum of:</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">Use Search Aggregation<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>Choose an example based on what you want to accomplish:</p>
<table>
<thead>
<tr><th>Go to</th><th>Description</th><th>Key settings</th></tr>
</thead>
<tbody>
<tr><td><a href="#Compare-and-sort-buckets">Compare and sort buckets</a></td><td>Calculate per-bucket statistics to compare buckets, then sort the returned buckets by metrics, counts, or keys.</td><td><code translate="no">fields</code>, <code translate="no">size</code>, <code translate="no">metrics</code>, <code translate="no">order</code></td></tr>
<tr><td><a href="#Show-representative-results-from-each-bucket">Show representative results from each bucket</a></td><td>Return a limited number of entities from each bucket and sort those entities independently by scalar fields or vector score.</td><td><code translate="no">top_hits</code>, <code translate="no">TopHits.size</code>, <code translate="no">TopHits.sort</code></td></tr>
<tr><td><a href="#Group-results-at-multiple-levels">Group results at multiple levels</a></td><td>Organize results into parent and child bucket levels to analyze multiple dimensions in sequence.</td><td><code translate="no">sub_aggregation</code></td></tr>
</tbody>
</table>
<p>The examples below use a product collection with brand, category, color, price, and rating fields. All brand names, product names, prices, ratings, and search results are synthetic example data. Expand the following section to create the collection and define the shared search variables.</p>
<p><details></p>
<p><summary>Set up the example collection</summary></p>
<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#go">Go</a>
  <a href="#javascript">Node.js</a>
  <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

collection_name = <span class="hljs-string">&quot;product_search_aggregation&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)
schema.add_field(<span class="hljs-string">&quot;brand&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;color&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">50</span>)
schema.add_field(<span class="hljs-string">&quot;price&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;rating&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;in_stock&quot;</span>, DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># Make preceding writes visible to searches from this client.</span>
    consistency_level=<span class="hljs-string">&quot;Session&quot;</span>,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Trail A2&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner C1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand C&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A3&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).token(<span class="hljs-string">&quot;root:Milvus&quot;</span>).build());
<span class="hljs-type">String</span> <span class="hljs-variable">collectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;product_search_aggregation&quot;</span>;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder().build();
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;id&quot;</span>).dataType(DataType.Int64).isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;embedding&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">5</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;name&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">200</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;brand&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">100</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;category&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">100</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;color&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">50</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;price&quot;</span>).dataType(DataType.Double).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;rating&quot;</span>).dataType(DataType.Double).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;in_stock&quot;</span>).dataType(DataType.Bool).build());

client.createCollection(CreateCollectionReq.builder().collectionName(collectionName).collectionSchema(schema)
        .indexParams(Collections.singletonList(IndexParam.builder().fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
                .indexType(IndexParam.IndexType.AUTOINDEX).metricType(IndexParam.MetricType.COSINE).build()))
        .build());

List&lt;JsonObject&gt; data = Arrays.asList(
        product(<span class="hljs-number">1</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.12f</span>, <span class="hljs-number">0.42f</span>, <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.66f</span>, <span class="hljs-number">0.31f</span>}, <span class="hljs-string">&quot;Runner A1&quot;</span>, <span class="hljs-string">&quot;Brand A&quot;</span>, <span class="hljs-string">&quot;running_shoes&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-number">129.99</span>, <span class="hljs-number">4.7</span>, <span class="hljs-literal">true</span>),
        product(<span class="hljs-number">2</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.10f</span>, <span class="hljs-number">0.39f</span>, <span class="hljs-number">0.20f</span>, <span class="hljs-number">0.61f</span>, <span class="hljs-number">0.29f</span>}, <span class="hljs-string">&quot;Trail A2&quot;</span>, <span class="hljs-string">&quot;Brand A&quot;</span>, <span class="hljs-string">&quot;running_shoes&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-number">139.99</span>, <span class="hljs-number">4.6</span>, <span class="hljs-literal">true</span>),
        product(<span class="hljs-number">3</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.14f</span>, <span class="hljs-number">0.44f</span>, <span class="hljs-number">0.19f</span>, <span class="hljs-number">0.68f</span>, <span class="hljs-number">0.33f</span>}, <span class="hljs-string">&quot;Runner B1&quot;</span>, <span class="hljs-string">&quot;Brand B&quot;</span>, <span class="hljs-string">&quot;running_shoes&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-number">159.99</span>, <span class="hljs-number">4.8</span>, <span class="hljs-literal">true</span>),
        product(<span class="hljs-number">4</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.16f</span>, <span class="hljs-number">0.41f</span>, <span class="hljs-number">0.22f</span>, <span class="hljs-number">0.62f</span>, <span class="hljs-number">0.30f</span>}, <span class="hljs-string">&quot;Runner C1&quot;</span>, <span class="hljs-string">&quot;Brand C&quot;</span>, <span class="hljs-string">&quot;running_shoes&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-number">119.99</span>, <span class="hljs-number">4.4</span>, <span class="hljs-literal">false</span>),
        product(<span class="hljs-number">5</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.48f</span>, <span class="hljs-number">0.20f</span>, <span class="hljs-number">0.59f</span>, <span class="hljs-number">0.15f</span>, <span class="hljs-number">0.71f</span>}, <span class="hljs-string">&quot;Jacket A1&quot;</span>, <span class="hljs-string">&quot;Brand A&quot;</span>, <span class="hljs-string">&quot;jackets&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-number">99.99</span>, <span class="hljs-number">4.5</span>, <span class="hljs-literal">true</span>),
        product(<span class="hljs-number">6</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.45f</span>, <span class="hljs-number">0.18f</span>, <span class="hljs-number">0.55f</span>, <span class="hljs-number">0.17f</span>, <span class="hljs-number">0.69f</span>}, <span class="hljs-string">&quot;Jacket B1&quot;</span>, <span class="hljs-string">&quot;Brand B&quot;</span>, <span class="hljs-string">&quot;jackets&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-number">89.99</span>, <span class="hljs-number">4.3</span>, <span class="hljs-literal">true</span>),
        product(<span class="hljs-number">7</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.09f</span>, <span class="hljs-number">0.38f</span>, <span class="hljs-number">0.17f</span>, <span class="hljs-number">0.60f</span>, <span class="hljs-number">0.27f</span>}, <span class="hljs-string">&quot;Runner A3&quot;</span>, <span class="hljs-string">&quot;Brand A&quot;</span>, <span class="hljs-string">&quot;running_shoes&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-number">159.99</span>, <span class="hljs-number">4.8</span>, <span class="hljs-literal">true</span>),
        product(<span class="hljs-number">8</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.13f</span>, <span class="hljs-number">0.43f</span>, <span class="hljs-number">0.21f</span>, <span class="hljs-number">0.65f</span>, <span class="hljs-number">0.32f</span>}, <span class="hljs-string">&quot;Runner A4&quot;</span>, <span class="hljs-string">&quot;Brand A&quot;</span>, <span class="hljs-string">&quot;running_shoes&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-number">149.99</span>, <span class="hljs-number">4.9</span>, <span class="hljs-literal">true</span>));
client.insert(InsertReq.builder().collectionName(collectionName).data(data).build());

List&lt;Float&gt; queryVector = Arrays.asList(<span class="hljs-number">0.11f</span>, <span class="hljs-number">0.40f</span>, <span class="hljs-number">0.19f</span>, <span class="hljs-number">0.64f</span>, <span class="hljs-number">0.30f</span>);

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> JsonObject <span class="hljs-title function_">product</span><span class="hljs-params">(<span class="hljs-type">long</span> id, <span class="hljs-type">float</span>[] embedding, String name, String brand,
                                  String category, String color, <span class="hljs-type">double</span> price, <span class="hljs-type">double</span> rating,
                                  <span class="hljs-type">boolean</span> inStock)</span> {
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, id);
    row.add(<span class="hljs-string">&quot;embedding&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>().toJsonTree(embedding));
    row.addProperty(<span class="hljs-string">&quot;name&quot;</span>, name);
    row.addProperty(<span class="hljs-string">&quot;brand&quot;</span>, brand);
    row.addProperty(<span class="hljs-string">&quot;category&quot;</span>, category);
    row.addProperty(<span class="hljs-string">&quot;color&quot;</span>, color);
    row.addProperty(<span class="hljs-string">&quot;price&quot;</span>, price);
    row.addProperty(<span class="hljs-string">&quot;rating&quot;</span>, rating);
    row.addProperty(<span class="hljs-string">&quot;in_stock&quot;</span>, inStock);
    <span class="hljs-keyword">return</span> row;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// TBD: Search Aggregation is not yet available in the released Go SDK.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>);

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>, <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;root&#x27;</span>, <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Milvus&#x27;</span>,
});
<span class="hljs-keyword">const</span> collectionName = <span class="hljs-string">&#x27;product_search_aggregation&#x27;</span>;

<span class="hljs-keyword">if</span> ((<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasCollection</span>({ <span class="hljs-attr">collection_name</span>: collectionName })).<span class="hljs-property">value</span>) {
  <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({ <span class="hljs-attr">collection_name</span>: collectionName });
}
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: collectionName,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&#x27;Session&#x27;</span>,
  <span class="hljs-attr">fields</span>: [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;embedding&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;name&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;brand&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">100</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;category&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">100</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">50</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;price&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Double</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;rating&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Double</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;in_stock&#x27;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span> },
  ],
});

<span class="hljs-keyword">const</span> data = [
  { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>], <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Runner A1&#x27;</span>, <span class="hljs-attr">brand</span>: <span class="hljs-string">&#x27;Brand A&#x27;</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">&#x27;running_shoes&#x27;</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;black&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">129.99</span>, <span class="hljs-attr">rating</span>: <span class="hljs-number">4.7</span>, <span class="hljs-attr">in_stock</span>: <span class="hljs-literal">true</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>], <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Trail A2&#x27;</span>, <span class="hljs-attr">brand</span>: <span class="hljs-string">&#x27;Brand A&#x27;</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">&#x27;running_shoes&#x27;</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;blue&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">139.99</span>, <span class="hljs-attr">rating</span>: <span class="hljs-number">4.6</span>, <span class="hljs-attr">in_stock</span>: <span class="hljs-literal">true</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>], <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Runner B1&#x27;</span>, <span class="hljs-attr">brand</span>: <span class="hljs-string">&#x27;Brand B&#x27;</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">&#x27;running_shoes&#x27;</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;white&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">159.99</span>, <span class="hljs-attr">rating</span>: <span class="hljs-number">4.8</span>, <span class="hljs-attr">in_stock</span>: <span class="hljs-literal">true</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>], <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Runner C1&#x27;</span>, <span class="hljs-attr">brand</span>: <span class="hljs-string">&#x27;Brand C&#x27;</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">&#x27;running_shoes&#x27;</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;red&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">119.99</span>, <span class="hljs-attr">rating</span>: <span class="hljs-number">4.4</span>, <span class="hljs-attr">in_stock</span>: <span class="hljs-literal">false</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>], <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Jacket A1&#x27;</span>, <span class="hljs-attr">brand</span>: <span class="hljs-string">&#x27;Brand A&#x27;</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">&#x27;jackets&#x27;</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;black&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">99.99</span>, <span class="hljs-attr">rating</span>: <span class="hljs-number">4.5</span>, <span class="hljs-attr">in_stock</span>: <span class="hljs-literal">true</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">6</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>], <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Jacket B1&#x27;</span>, <span class="hljs-attr">brand</span>: <span class="hljs-string">&#x27;Brand B&#x27;</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">&#x27;jackets&#x27;</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;blue&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">89.99</span>, <span class="hljs-attr">rating</span>: <span class="hljs-number">4.3</span>, <span class="hljs-attr">in_stock</span>: <span class="hljs-literal">true</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">7</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>], <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Runner A3&#x27;</span>, <span class="hljs-attr">brand</span>: <span class="hljs-string">&#x27;Brand A&#x27;</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">&#x27;running_shoes&#x27;</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;black&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">159.99</span>, <span class="hljs-attr">rating</span>: <span class="hljs-number">4.8</span>, <span class="hljs-attr">in_stock</span>: <span class="hljs-literal">true</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">8</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>], <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Runner A4&#x27;</span>, <span class="hljs-attr">brand</span>: <span class="hljs-string">&#x27;Brand A&#x27;</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">&#x27;running_shoes&#x27;</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;black&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">149.99</span>, <span class="hljs-attr">rating</span>: <span class="hljs-number">4.9</span>, <span class="hljs-attr">in_stock</span>: <span class="hljs-literal">true</span> },
];
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({ <span class="hljs-attr">collection_name</span>: collectionName, data });
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({ <span class="hljs-attr">collection_name</span>: collectionName, <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;embedding&#x27;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>, <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;COSINE&#x27;</span> });
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollectionSync</span>({ <span class="hljs-attr">collection_name</span>: collectionName });

<span class="hljs-keyword">const</span> queryVector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>];
<span class="hljs-keyword">const</span> searchParams = { <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;COSINE&#x27;</span>, <span class="hljs-attr">params</span>: {} };
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> COLLECTION_NAME=<span class="hljs-string">&quot;product_search_aggregation&quot;</span>
<span class="hljs-function"><span class="hljs-title">search</span></span>() {
  curl --request POST \
    --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
    --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
    --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    --data <span class="hljs-string">&quot;<span class="hljs-variable">$1</span>&quot;</span>
}
schema=<span class="hljs-string">&#x27;{&quot;autoID&quot;:false,&quot;enableDynamicField&quot;:false,&quot;fields&quot;:[{&quot;fieldName&quot;:&quot;id&quot;,&quot;dataType&quot;:&quot;Int64&quot;,&quot;isPrimary&quot;:true},{&quot;fieldName&quot;:&quot;embedding&quot;,&quot;dataType&quot;:&quot;FloatVector&quot;,&quot;elementTypeParams&quot;:{&quot;dim&quot;:5}},{&quot;fieldName&quot;:&quot;name&quot;,&quot;dataType&quot;:&quot;VarChar&quot;,&quot;elementTypeParams&quot;:{&quot;max_length&quot;:200}},{&quot;fieldName&quot;:&quot;brand&quot;,&quot;dataType&quot;:&quot;VarChar&quot;,&quot;elementTypeParams&quot;:{&quot;max_length&quot;:100}},{&quot;fieldName&quot;:&quot;category&quot;,&quot;dataType&quot;:&quot;VarChar&quot;,&quot;elementTypeParams&quot;:{&quot;max_length&quot;:100}},{&quot;fieldName&quot;:&quot;color&quot;,&quot;dataType&quot;:&quot;VarChar&quot;,&quot;elementTypeParams&quot;:{&quot;max_length&quot;:50}},{&quot;fieldName&quot;:&quot;price&quot;,&quot;dataType&quot;:&quot;Double&quot;},{&quot;fieldName&quot;:&quot;rating&quot;,&quot;dataType&quot;:&quot;Double&quot;},{&quot;fieldName&quot;:&quot;in_stock&quot;,&quot;dataType&quot;:&quot;Bool&quot;}]}&#x27;</span>
indexParams=<span class="hljs-string">&#x27;[{&quot;fieldName&quot;:&quot;embedding&quot;,&quot;indexType&quot;:&quot;AUTOINDEX&quot;,&quot;metricType&quot;:&quot;COSINE&quot;}]&#x27;</span>
data=<span class="hljs-string">&#x27;[{&quot;id&quot;:1,&quot;embedding&quot;:[0.12,0.42,0.18,0.66,0.31],&quot;name&quot;:&quot;Runner A1&quot;,&quot;brand&quot;:&quot;Brand A&quot;,&quot;category&quot;:&quot;running_shoes&quot;,&quot;color&quot;:&quot;black&quot;,&quot;price&quot;:129.99,&quot;rating&quot;:4.7,&quot;in_stock&quot;:true},{&quot;id&quot;:2,&quot;embedding&quot;:[0.10,0.39,0.20,0.61,0.29],&quot;name&quot;:&quot;Trail A2&quot;,&quot;brand&quot;:&quot;Brand A&quot;,&quot;category&quot;:&quot;running_shoes&quot;,&quot;color&quot;:&quot;blue&quot;,&quot;price&quot;:139.99,&quot;rating&quot;:4.6,&quot;in_stock&quot;:true},{&quot;id&quot;:3,&quot;embedding&quot;:[0.14,0.44,0.19,0.68,0.33],&quot;name&quot;:&quot;Runner B1&quot;,&quot;brand&quot;:&quot;Brand B&quot;,&quot;category&quot;:&quot;running_shoes&quot;,&quot;color&quot;:&quot;white&quot;,&quot;price&quot;:159.99,&quot;rating&quot;:4.8,&quot;in_stock&quot;:true},{&quot;id&quot;:4,&quot;embedding&quot;:[0.16,0.41,0.22,0.62,0.30],&quot;name&quot;:&quot;Runner C1&quot;,&quot;brand&quot;:&quot;Brand C&quot;,&quot;category&quot;:&quot;running_shoes&quot;,&quot;color&quot;:&quot;red&quot;,&quot;price&quot;:119.99,&quot;rating&quot;:4.4,&quot;in_stock&quot;:false},{&quot;id&quot;:5,&quot;embedding&quot;:[0.48,0.20,0.59,0.15,0.71],&quot;name&quot;:&quot;Jacket A1&quot;,&quot;brand&quot;:&quot;Brand A&quot;,&quot;category&quot;:&quot;jackets&quot;,&quot;color&quot;:&quot;black&quot;,&quot;price&quot;:99.99,&quot;rating&quot;:4.5,&quot;in_stock&quot;:true},{&quot;id&quot;:6,&quot;embedding&quot;:[0.45,0.18,0.55,0.17,0.69],&quot;name&quot;:&quot;Jacket B1&quot;,&quot;brand&quot;:&quot;Brand B&quot;,&quot;category&quot;:&quot;jackets&quot;,&quot;color&quot;:&quot;blue&quot;,&quot;price&quot;:89.99,&quot;rating&quot;:4.3,&quot;in_stock&quot;:true},{&quot;id&quot;:7,&quot;embedding&quot;:[0.09,0.38,0.17,0.60,0.27],&quot;name&quot;:&quot;Runner A3&quot;,&quot;brand&quot;:&quot;Brand A&quot;,&quot;category&quot;:&quot;running_shoes&quot;,&quot;color&quot;:&quot;black&quot;,&quot;price&quot;:159.99,&quot;rating&quot;:4.8,&quot;in_stock&quot;:true},{&quot;id&quot;:8,&quot;embedding&quot;:[0.13,0.43,0.21,0.65,0.32],&quot;name&quot;:&quot;Runner A4&quot;,&quot;brand&quot;:&quot;Brand A&quot;,&quot;category&quot;:&quot;running_shoes&quot;,&quot;color&quot;:&quot;black&quot;,&quot;price&quot;:149.99,&quot;rating&quot;:4.9,&quot;in_stock&quot;:true}]&#x27;</span>
curl --request POST --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> --data <span class="hljs-string">&quot;{\&quot;collectionName\&quot;:\&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,\&quot;schema\&quot;:<span class="hljs-variable">${schema}</span>,\&quot;indexParams\&quot;:<span class="hljs-variable">${indexParams}</span>}&quot;</span>
curl --request POST --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> --data <span class="hljs-string">&quot;{\&quot;collectionName\&quot;:\&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,\&quot;data\&quot;:<span class="hljs-variable">${data}</span>}&quot;</span>
curl --request POST --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> --data <span class="hljs-string">&quot;{\&quot;collectionName\&quot;:\&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>The setup above configures <code translate="no">COSINE</code> for both the vector index and the search parameters. Therefore, later examples use <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> to place higher cosine similarity first. For a distance metric such as <code translate="no">L2</code>, use <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code>.</p>
<h3 id="Compare-and-sort-buckets" class="common-anchor-header">Compare and sort buckets<button data-href="#Compare-and-sort-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Use this pattern when you need to compare groups of retrieved entities using calculated statistics and control the order in which the buckets are returned. In this example, Milvus groups retrieved products by <code translate="no">brand</code>, calculates price metrics for each brand bucket, and sorts the buckets by average price.</p>
<p>If your goal is only to improve result diversity by returning one or more entities per field value, use <a href="/docs/de/grouping-search.md">Grouping Search</a> instead.</p>
<p>The following configuration creates up to three brand buckets, calculates metrics for each bucket, and sorts the buckets by average price:</p>
<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#go">Go</a>
  <a href="#javascript">Node.js</a>
  <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span></span>
<span class="highlighted-comment-line">    size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Calculate named metrics for every selected bucket.</span></span>
<span class="highlighted-comment-line">    metrics={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;min_price&quot;</span>: {<span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Sort buckets by average price, highest first.</span></span>
<span class="highlighted-comment-line">    order=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;avg_price&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># If average prices are equal, sort by bucket key in ascending order.</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;_key&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.aggregation.AggDirection;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.aggregation.MetricOps;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.aggregation.MetricSpec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.aggregation.OrderSpec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.aggregation.SearchAggregation;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.aggregation.SortSpec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.aggregation.TopHitsSpec;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">SearchAggregation</span> <span class="hljs-variable">aggregation</span> <span class="hljs-operator">=</span> SearchAggregation.builder()
        .fields(Collections.singletonList(<span class="hljs-string">&quot;brand&quot;</span>))
        .size(<span class="hljs-number">3</span>)
        .addMetric(<span class="hljs-string">&quot;product_count&quot;</span>, MetricSpec.builder().op(MetricOps.COUNT).fieldName(<span class="hljs-string">&quot;*&quot;</span>).build())
        .addMetric(<span class="hljs-string">&quot;avg_price&quot;</span>, MetricSpec.builder().op(MetricOps.AVG).fieldName(<span class="hljs-string">&quot;price&quot;</span>).build())
        .addMetric(<span class="hljs-string">&quot;min_price&quot;</span>, MetricSpec.builder().op(MetricOps.MIN).fieldName(<span class="hljs-string">&quot;price&quot;</span>).build())
        .addOrder(OrderSpec.builder().key(<span class="hljs-string">&quot;avg_price&quot;</span>).direction(AggDirection.DESC).build())
        .addOrder(OrderSpec.builder().key(<span class="hljs-string">&quot;_key&quot;</span>).direction(AggDirection.ASC).build())
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// TBD: Search Aggregation is not yet available in the released Go SDK.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> aggregation = {
  <span class="hljs-attr">fields</span>: [<span class="hljs-string">&#x27;brand&#x27;</span>],
  <span class="hljs-attr">size</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">metrics</span>: {
    <span class="hljs-attr">product_count</span>: { <span class="hljs-attr">op</span>: <span class="hljs-string">&#x27;count&#x27;</span>, <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;*&#x27;</span> },
    <span class="hljs-attr">avg_price</span>: { <span class="hljs-attr">op</span>: <span class="hljs-string">&#x27;avg&#x27;</span>, <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;price&#x27;</span> },
    <span class="hljs-attr">min_price</span>: { <span class="hljs-attr">op</span>: <span class="hljs-string">&#x27;min&#x27;</span>, <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;price&#x27;</span> },
  },
  <span class="hljs-attr">order</span>: [
    { <span class="hljs-attr">key</span>: <span class="hljs-string">&#x27;avg_price&#x27;</span>, <span class="hljs-attr">direction</span>: <span class="hljs-string">&#x27;desc&#x27;</span> },
    { <span class="hljs-attr">key</span>: <span class="hljs-string">&#x27;_key&#x27;</span>, <span class="hljs-attr">direction</span>: <span class="hljs-string">&#x27;asc&#x27;</span> },
  ],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">payload=<span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;product_search_aggregation&quot;,
  &quot;data&quot;: [[0.11, 0.40, 0.19, 0.64, 0.30]],
  &quot;annsField&quot;: &quot;embedding&quot;, &quot;limit&quot;: 10,
  &quot;searchParams&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;, &quot;params&quot;: {}},
  &quot;searchAggregation&quot;: {
    &quot;fields&quot;: [&quot;brand&quot;], &quot;size&quot;: 3,
    &quot;metrics&quot;: {&quot;product_count&quot;: {&quot;op&quot;: &quot;count&quot;, &quot;fieldName&quot;: &quot;*&quot;}, &quot;avg_price&quot;: {&quot;op&quot;: &quot;avg&quot;, &quot;fieldName&quot;: &quot;price&quot;}, &quot;min_price&quot;: {&quot;op&quot;: &quot;min&quot;, &quot;fieldName&quot;: &quot;price&quot;}},
    &quot;order&quot;: [{&quot;key&quot;: &quot;avg_price&quot;, &quot;direction&quot;: &quot;desc&quot;}, {&quot;key&quot;: &quot;_key&quot;, &quot;direction&quot;: &quot;asc&quot;}]
  }
}&#x27;</span>
search <span class="hljs-string">&quot;<span class="hljs-variable">$payload</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pass the object to the <code translate="no">search_aggregation</code> parameter of <code translate="no">MilvusClient.search()</code>:</p>
<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#go">Go</a>
  <a href="#javascript">Node.js</a>
  <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    search_params=search_params,
    output_fields=[
        <span class="hljs-string">&quot;name&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-string">&quot;price&quot;</span>,
        <span class="hljs-string">&quot;rating&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>,
    ],
<span class="highlighted-wrapper-line">    search_aggregation=aggregation,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchResp</span> <span class="hljs-variable">result</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(collectionName)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(queryVector)))
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .searchParams(Collections.singletonMap(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;COSINE&quot;</span>))
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>, <span class="hljs-string">&quot;in_stock&quot;</span>))
        .searchAggregation(aggregation)
        .build());

List&lt;AggregationBucket&gt; buckets = result.getAggregationBuckets().get(<span class="hljs-number">0</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// TBD: Search Aggregation is not yet available in the released Go SDK.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collectionName,
  <span class="hljs-attr">data</span>: queryVector,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;embedding&#x27;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  ...searchParams,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;name&#x27;</span>, <span class="hljs-string">&#x27;brand&#x27;</span>, <span class="hljs-string">&#x27;category&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>, <span class="hljs-string">&#x27;rating&#x27;</span>, <span class="hljs-string">&#x27;in_stock&#x27;</span>],
  <span class="hljs-attr">search_aggregation</span>: aggregation,
});

<span class="hljs-keyword">const</span> buckets = result.<span class="hljs-property">agg_buckets</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;product_search_aggregation&quot;,
    &quot;data&quot;: [[0.11, 0.40, 0.19, 0.64, 0.30]],
    &quot;annsField&quot;: &quot;embedding&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;name&quot;, &quot;brand&quot;, &quot;category&quot;, &quot;color&quot;, &quot;price&quot;, &quot;rating&quot;, &quot;in_stock&quot;],
    &quot;searchParams&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;, &quot;params&quot;: {}},
    &quot;searchAggregation&quot;: {
      &quot;fields&quot;: [&quot;brand&quot;], &quot;size&quot;: 3,
      &quot;metrics&quot;: {&quot;product_count&quot;: {&quot;op&quot;: &quot;count&quot;, &quot;fieldName&quot;: &quot;*&quot;}, &quot;avg_price&quot;: {&quot;op&quot;: &quot;avg&quot;, &quot;fieldName&quot;: &quot;price&quot;}, &quot;min_price&quot;: {&quot;op&quot;: &quot;min&quot;, &quot;fieldName&quot;: &quot;price&quot;}},
      &quot;order&quot;: [{&quot;key&quot;: &quot;avg_price&quot;, &quot;direction&quot;: &quot;desc&quot;}, {&quot;key&quot;: &quot;_key&quot;, &quot;direction&quot;: &quot;asc&quot;}]
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>When <code translate="no">search_aggregation</code> is set, PyMilvus returns no ordinary entity hits in <code translate="no">result[0]</code>. Read the bucket response from <code translate="no">result.agg_buckets[0]</code> instead. The <code translate="no">output_fields</code> parameter controls which scalar fields appear in each returned <code translate="no">AggregationHit.fields</code> mapping; Milvus can still use metric-source and sort fields that are not listed in <code translate="no">output_fields</code>.</p>
<p><details></p>
<p><summary>View the example bucket output</summary></p>
<p>The following output was captured from the request above and serialized as JSON for readability. PyMilvus returns <code translate="no">AggregationBucket</code> objects rather than JSON. The <code translate="no">key</code> value is always an ordered list of key components, even when <code translate="no">fields</code> contains only one field. This preserves field order for composite keys.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand C&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>For the single query vector in this guide, read the returned top-level buckets from <code translate="no">result.agg_buckets[0]</code>. Each bucket exposes its ordered key components, retained-candidate <code translate="no">count</code>, calculated <code translate="no">metrics</code>, representative <code translate="no">hits</code>, and nested buckets in <code translate="no">sub_groups</code>.</p>
<p>Read the configuration as follows:</p>
<table>
<thead>
<tr><th>Setting</th><th>What it controls</th><th>In this example</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td>How Milvus creates bucket keys</td><td>Creates one bucket for each distinct <code translate="no">brand</code> value.</td></tr>
<tr><td><code translate="no">size</code></td><td>The maximum number of returned buckets</td><td>Returns up to three brand buckets.</td></tr>
<tr><td><code translate="no">metrics</code></td><td>The statistics calculated for each bucket</td><td>Calculates product count, average price, and minimum price.</td></tr>
<tr><td><code translate="no">order</code></td><td>How Milvus sorts the returned buckets</td><td>Sorts by average price, then uses the bucket key to break ties.</td></tr>
</tbody>
</table>
<p>Milvus ignores <code translate="no">limit</code> when <code translate="no">search_aggregation</code> is set. Use the root <code translate="no">SearchAggregation.size</code> value to control the number of top-level buckets.</p>
<p>With these settings, Milvus returns the Brand B, Brand A, and Brand C buckets in descending <code translate="no">avg_price</code> order. The <code translate="no">_key</code> criterion applies only when buckets have the same average price. Because this configuration does not define <code translate="no">top_hits</code>, every bucket’s <code translate="no">hits</code> list is empty and the per-key candidate budget is <code translate="no">1</code>. The displayed counts and metrics therefore describe one retained candidate per brand. Configure <code translate="no">top_hits</code> with a larger <code translate="no">TopHits.size</code> when the aggregation needs a wider per-key metric window.</p>
<p><details></p>
<p><summary>Metric and ordering rules</summary></p>
<p>Each <code translate="no">SearchAggregation.metrics</code> entry maps a user-defined alias to <code translate="no">{operation: source}</code>:</p>
<table>
<thead>
<tr><th>Source</th><th>Supported operations</th><th>Behavior</th></tr>
</thead>
<tbody>
<tr><td>Any non-<code translate="no">JSON</code>, non-dynamic field</td><td><code translate="no">count</code></td><td>Counts retained candidates whose source field is not <code translate="no">NULL</code>.</td></tr>
<tr><td>Integer or floating-point field</td><td><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code>, <code translate="no">max</code></td><td>Calculates over non-null retained values.</td></tr>
<tr><td>String or <code translate="no">TIMESTAMPTZ</code> field</td><td><code translate="no">min</code>, <code translate="no">max</code></td><td>Selects the minimum or maximum non-null retained value.</td></tr>
<tr><td><code translate="no">&quot;*&quot;</code></td><td><code translate="no">count</code></td><td>Counts every retained candidate in the bucket. The result matches <code translate="no">bucket.count</code>.</td></tr>
<tr><td><code translate="no">_score</code></td><td><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code>, <code translate="no">max</code></td><td>Aggregates ANN similarity or distance values for retained candidates.</td></tr>
</tbody>
</table>
<p><code translate="no">SearchAggregation.order</code> accepts the following keys:</p>
<table>
<thead>
<tr><th>Order key</th><th>Meaning</th></tr>
</thead>
<tbody>
<tr><td>A metric alias</td><td>Sorts by a value calculated in <code translate="no">metrics</code> at the same aggregation level, such as <code translate="no">avg_price</code>.</td></tr>
<tr><td><code translate="no">_count</code></td><td>Sorts by the number of retained candidates in each bucket.</td></tr>
<tr><td><code translate="no">_key</code></td><td>Sorts by the bucket key rather than a collection field named <code translate="no">_key</code>.</td></tr>
</tbody>
</table>
<p>Each <code translate="no">order</code> entry maps a key to <code translate="no">&quot;asc&quot;</code> or <code translate="no">&quot;desc&quot;</code>. Milvus evaluates multiple entries from first to last. If you omit <code translate="no">order</code>, Milvus keeps the bucket discovery order from the retained candidate set.</p>
<p>To sort buckets by vector match quality, first calculate a bucket-level metric from <code translate="no">_score</code>, and then use the metric alias in <code translate="no">order</code>. You cannot use <code translate="no">_score</code> directly as a bucket-order key because each bucket can contain multiple entity scores. For example, with <code translate="no">COSINE</code> or <code translate="no">IP</code>:</p>
<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#go">Go</a>
  <a href="#javascript">Node.js</a>
  <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
    metrics={<span class="hljs-string">&quot;max_score&quot;</span>: {<span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-string">&quot;_score&quot;</span>}},
    order=[{<span class="hljs-string">&quot;max_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchAggregation</span> <span class="hljs-variable">aggregation</span> <span class="hljs-operator">=</span> SearchAggregation.builder()
        .fields(Collections.singletonList(<span class="hljs-string">&quot;brand&quot;</span>))
        .size(<span class="hljs-number">3</span>)
        .addMetric(<span class="hljs-string">&quot;max_score&quot;</span>, MetricSpec.builder().op(MetricOps.MAX).fieldName(<span class="hljs-string">&quot;_score&quot;</span>).build())
        .addOrder(OrderSpec.builder().key(<span class="hljs-string">&quot;max_score&quot;</span>).direction(AggDirection.DESC).build())
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// TBD: Search Aggregation is not yet available in the released Go SDK.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> aggregation = {
  <span class="hljs-attr">fields</span>: [<span class="hljs-string">&#x27;brand&#x27;</span>],
  <span class="hljs-attr">size</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">metrics</span>: { <span class="hljs-attr">max_score</span>: { <span class="hljs-attr">op</span>: <span class="hljs-string">&#x27;max&#x27;</span>, <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;_score&#x27;</span> } },
  <span class="hljs-attr">order</span>: [{ <span class="hljs-attr">key</span>: <span class="hljs-string">&#x27;max_score&#x27;</span>, <span class="hljs-attr">direction</span>: <span class="hljs-string">&#x27;desc&#x27;</span> }],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">payload=<span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;product_search_aggregation&quot;,
  &quot;data&quot;: [[0.11, 0.40, 0.19, 0.64, 0.30]], &quot;annsField&quot;: &quot;embedding&quot;, &quot;limit&quot;: 10,
  &quot;searchParams&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;, &quot;params&quot;: {}},
  &quot;searchAggregation&quot;: {&quot;fields&quot;: [&quot;brand&quot;], &quot;size&quot;: 3, &quot;metrics&quot;: {&quot;max_score&quot;: {&quot;op&quot;: &quot;max&quot;, &quot;fieldName&quot;: &quot;_score&quot;}}, &quot;order&quot;: [{&quot;key&quot;: &quot;max_score&quot;, &quot;direction&quot;: &quot;desc&quot;}]}
}&#x27;</span>
search <span class="hljs-string">&quot;<span class="hljs-variable">$payload</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>With <code translate="no">L2</code>, calculate the minimum <code translate="no">_score</code> value and sort the metric alias in ascending order so that buckets with the lowest distance come first.</p>
<p></details></p>
<p><details></p>
<p><summary>Create composite bucket keys</summary></p>
<p>To create a composite bucket key, pass multiple field names in the same list:</p>
<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#go">Go</a>
  <a href="#javascript">Node.js</a>
  <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],</span>
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchAggregation</span> <span class="hljs-variable">aggregation</span> <span class="hljs-operator">=</span> SearchAggregation.builder()
        .fields(Arrays.asList(<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .size(<span class="hljs-number">6</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// TBD: Search Aggregation is not yet available in the released Go SDK.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> aggregation = {
  <span class="hljs-attr">fields</span>: [<span class="hljs-string">&#x27;brand&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>],
  <span class="hljs-attr">size</span>: <span class="hljs-number">6</span>,
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">payload=<span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;product_search_aggregation&quot;,
  &quot;data&quot;: [[0.11, 0.40, 0.19, 0.64, 0.30]], &quot;annsField&quot;: &quot;embedding&quot;, &quot;limit&quot;: 10,
  &quot;searchParams&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;, &quot;params&quot;: {}},
  &quot;searchAggregation&quot;: {&quot;fields&quot;: [&quot;brand&quot;, &quot;color&quot;], &quot;size&quot;: 6}
}&#x27;</span>
search <span class="hljs-string">&quot;<span class="hljs-variable">$payload</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>This configuration can produce keys such as <code translate="no">(Brand A, black)</code>, <code translate="no">(Brand A, blue)</code>, and <code translate="no">(Brand B, white)</code>. Two entities share a bucket only when both values match. Milvus preserves the list order, so <code translate="no">brand</code> is the first key component and <code translate="no">color</code> is the second. When <code translate="no">_key</code> is used in <code translate="no">order</code>, Milvus compares composite key components in the same order. Pass multiple strings in one flat list; nested lists are not supported.</p>
<p><code translate="no">size=6</code> is the maximum number of composite buckets returned at this aggregation level. The example data contains five distinct brand-color combinations, so all five can be returned. In the <a href="#Limits">returned-entry limit</a>, this request contributes <code translate="no">1 query vector × 6 buckets × 1 = 6</code> configured result entries.</p>
<p>Multiple fields in one <code translate="no">SearchAggregation.fields</code> list create a composite bucket key at that aggregation level. To create a parent-child bucket hierarchy, use a <a href="#Group-results-at-multiple-levels">nested aggregation</a>.</p>
<p></details></p>
<p>The examples that follow redefine <code translate="no">aggregation</code>. Pass the updated object to the same <code translate="no">search_aggregation</code> parameter and rerun the search call.</p>
<h3 id="Show-representative-results-from-each-bucket" class="common-anchor-header">Show representative results from each bucket<button data-href="#Show-representative-results-from-each-bucket" class="anchor-icon" translate="no">
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
    </button></h3><p>Include representative entities when the application needs to show actual products from each bucket. In this example, Milvus returns up to two products from each brand bucket, ordered by rating and then by vector score.</p>
<p>Configure <code translate="no">TopHits</code> as follows:</p>
<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#go">Go</a>
  <a href="#javascript">Node.js</a>
  <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return and sort representative entities for each selected bucket.</span></span>
<span class="highlighted-comment-line">    top_hits=TopHits(</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Return up to two entities per bucket.</span></span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Apply sort criteria in list order.</span></span>
<span class="highlighted-comment-line">        sort=[</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        ],</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchAggregation</span> <span class="hljs-variable">aggregation</span> <span class="hljs-operator">=</span> SearchAggregation.builder().fields(Collections.singletonList(<span class="hljs-string">&quot;brand&quot;</span>)).size(<span class="hljs-number">3</span>)
        .topHits(TopHitsSpec.builder().size(<span class="hljs-number">2</span>)
                .addSort(SortSpec.builder().fieldName(<span class="hljs-string">&quot;rating&quot;</span>).direction(AggDirection.DESC).build())
                .addSort(SortSpec.builder().fieldName(<span class="hljs-string">&quot;_score&quot;</span>).direction(AggDirection.DESC).build()).build())
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// TBD: Search Aggregation is not yet available in the released Go SDK.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> aggregation = {
  <span class="hljs-attr">fields</span>: [<span class="hljs-string">&#x27;brand&#x27;</span>],
  <span class="hljs-attr">size</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">top_hits</span>: {
    <span class="hljs-attr">size</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">sort</span>: [
      { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;rating&#x27;</span>, <span class="hljs-attr">direction</span>: <span class="hljs-string">&#x27;desc&#x27;</span> },
      { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;_score&#x27;</span>, <span class="hljs-attr">direction</span>: <span class="hljs-string">&#x27;desc&#x27;</span> },
    ],
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">payload=<span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;product_search_aggregation&quot;,
  &quot;data&quot;: [[0.11, 0.40, 0.19, 0.64, 0.30]], &quot;annsField&quot;: &quot;embedding&quot;, &quot;limit&quot;: 10,
  &quot;searchParams&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;, &quot;params&quot;: {}},
  &quot;searchAggregation&quot;: {&quot;fields&quot;: [&quot;brand&quot;], &quot;size&quot;: 3, &quot;topHits&quot;: {&quot;size&quot;: 2, &quot;sort&quot;: [{&quot;fieldName&quot;: &quot;rating&quot;, &quot;direction&quot;: &quot;desc&quot;}, {&quot;fieldName&quot;: &quot;_score&quot;, &quot;direction&quot;: &quot;desc&quot;}]}}
}&#x27;</span>
search <span class="hljs-string">&quot;<span class="hljs-variable">$payload</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>View a bucket with representative hits</summary></p>
<p>The following Brand A bucket was captured from the request above and serialized as JSON for readability.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.99976646900177</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;black&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner A1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997048377990723</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;blue&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Trail A2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">139.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.6</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<table>
<thead>
<tr><th>Parameter</th><th>Purpose</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">top_hits</code></td><td>Optional. Configures representative entities for this aggregation level. If omitted, <code translate="no">bucket.hits</code> is empty and the per-key candidate budget defaults to one.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>Returns up to two representative entities from each selected bucket and sets the per-key candidate budget to two for the entire aggregation tree.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>Orders entities inside each bucket using the listed criteria.</td></tr>
</tbody>
</table>
<p>Configure <code translate="no">top_hits</code> when the application needs representative entities or when counts and metrics need a wider per-key candidate window. A larger <code translate="no">TopHits.size</code> increases both the candidate budget and the maximum returned-entry calculation in <a href="#Limits">Limits</a>.</p>
<p><code translate="no">SearchAggregation.order</code> sorts buckets, while <code translate="no">TopHits.sort</code> sorts the retained entities inside each bucket. The sort order does not change which candidates were retained for <code translate="no">count</code> and metrics. <code translate="no">TopHits.sort</code> accepts supported comparable scalar field names and the built-in <code translate="no">_score</code> field, which represents the ANN similarity or distance. Milvus evaluates the <code translate="no">sort</code> entries from first to last. In this example, it orders products by <code translate="no">rating</code> from highest to lowest and uses <code translate="no">_score</code> only when two ratings are equal. Because the setup uses <code translate="no">COSINE</code>, descending <code translate="no">_score</code> places the more similar product first.</p>
<p>The fields used by <code translate="no">metrics</code> or <code translate="no">TopHits.sort</code> do not have to appear in <code translate="no">output_fields</code>. Milvus fetches those fields internally, but only fields explicitly listed in <code translate="no">output_fields</code> are included in each returned hit’s <code translate="no">fields</code> mapping. Primary keys and vector scores remain available through <code translate="no">AggregationHit.pk</code> and <code translate="no">AggregationHit.score</code>.</p>
<p>Each returned <code translate="no">AggregationHit</code> exposes its primary key in <code translate="no">pk</code>, vector score in <code translate="no">score</code>, and requested output fields in <code translate="no">fields</code>.</p>
<h3 id="Group-results-at-multiple-levels" class="common-anchor-header">Group results at multiple levels<button data-href="#Group-results-at-multiple-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>Use nested aggregation when you need one level of buckets inside another. In this example, Milvus creates category buckets first, and then creates brand buckets within each category.</p>
<p>The child aggregation receives only the entities assigned to its parent bucket. <code translate="no">fields</code> controls the bucket key at each aggregation level, while <code translate="no">sub_aggregation</code> creates the parent-child hierarchy.</p>
<p>The configuration below creates a category bucket with the key <code translate="no">(running_shoes)</code>. Within that parent bucket, the child aggregation creates separate brand buckets with keys such as <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code>, and <code translate="no">(Brand C)</code>.</p>
<pre><code translate="no" class="language-text">Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Brand A)
├── (Brand B)
└── (Brand C)
<button class="copy-code-btn"></button></code></pre>
<p>Each level can independently use multiple fields. For example, using <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> in the child aggregation would create composite child keys such as <code translate="no">(Brand A, black)</code>.</p>
<p>The following configuration implements this hierarchy:</p>
<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#go">Go</a>
  <a href="#javascript">Node.js</a>
  <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;category&quot;</span>],
    size=<span class="hljs-number">2</span>,
    metrics={
        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},
        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},
    },
    order=[{<span class="hljs-string">&quot;product_count&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
<span class="highlighted-comment-line">    <span class="hljs-comment"># For each category bucket, group only its entities by brand.</span></span>
<span class="highlighted-comment-line">    sub_aggregation=SearchAggregation(</span>
<span class="highlighted-comment-line">        fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">        metrics={</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;avg_rating&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>},</span>
<span class="highlighted-comment-line">        },</span>
<span class="highlighted-comment-line">        order=[{<span class="hljs-string">&quot;avg_rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        top_hits=TopHits(</span>
<span class="highlighted-comment-line">            size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">            sort=[{<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        ),</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchAggregation</span> <span class="hljs-variable">aggregation</span> <span class="hljs-operator">=</span> SearchAggregation.builder().fields(Collections.singletonList(<span class="hljs-string">&quot;category&quot;</span>)).size(<span class="hljs-number">2</span>)
        .addMetric(<span class="hljs-string">&quot;product_count&quot;</span>, MetricSpec.builder().op(MetricOps.COUNT).fieldName(<span class="hljs-string">&quot;*&quot;</span>).build())
        .addMetric(<span class="hljs-string">&quot;avg_price&quot;</span>, MetricSpec.builder().op(MetricOps.AVG).fieldName(<span class="hljs-string">&quot;price&quot;</span>).build())
        .addOrder(OrderSpec.builder().key(<span class="hljs-string">&quot;product_count&quot;</span>).direction(AggDirection.DESC).build())
        .subAggregation(SearchAggregation.builder().fields(Collections.singletonList(<span class="hljs-string">&quot;brand&quot;</span>)).size(<span class="hljs-number">3</span>)
                .addMetric(<span class="hljs-string">&quot;brand_count&quot;</span>, MetricSpec.builder().op(MetricOps.COUNT).fieldName(<span class="hljs-string">&quot;*&quot;</span>).build())
                .addMetric(<span class="hljs-string">&quot;avg_rating&quot;</span>, MetricSpec.builder().op(MetricOps.AVG).fieldName(<span class="hljs-string">&quot;rating&quot;</span>).build())
                .addOrder(OrderSpec.builder().key(<span class="hljs-string">&quot;avg_rating&quot;</span>).direction(AggDirection.DESC).build())
                .topHits(TopHitsSpec.builder().size(<span class="hljs-number">2</span>).addSort(SortSpec.builder().fieldName(<span class="hljs-string">&quot;rating&quot;</span>).direction(AggDirection.DESC).build()).build()).build())
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// TBD: Search Aggregation is not yet available in the released Go SDK.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> aggregation = {
  <span class="hljs-attr">fields</span>: [<span class="hljs-string">&#x27;category&#x27;</span>],
  <span class="hljs-attr">size</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">metrics</span>: {
    <span class="hljs-attr">product_count</span>: { <span class="hljs-attr">op</span>: <span class="hljs-string">&#x27;count&#x27;</span>, <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;*&#x27;</span> },
    <span class="hljs-attr">avg_price</span>: { <span class="hljs-attr">op</span>: <span class="hljs-string">&#x27;avg&#x27;</span>, <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;price&#x27;</span> },
  },
  <span class="hljs-attr">order</span>: [{ <span class="hljs-attr">key</span>: <span class="hljs-string">&#x27;product_count&#x27;</span>, <span class="hljs-attr">direction</span>: <span class="hljs-string">&#x27;desc&#x27;</span> }],
  <span class="hljs-attr">sub_aggregation</span>: {
    <span class="hljs-attr">fields</span>: [<span class="hljs-string">&#x27;brand&#x27;</span>],
    <span class="hljs-attr">size</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">metrics</span>: {
      <span class="hljs-attr">brand_count</span>: { <span class="hljs-attr">op</span>: <span class="hljs-string">&#x27;count&#x27;</span>, <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;*&#x27;</span> },
      <span class="hljs-attr">avg_rating</span>: { <span class="hljs-attr">op</span>: <span class="hljs-string">&#x27;avg&#x27;</span>, <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;rating&#x27;</span> },
    },
    <span class="hljs-attr">order</span>: [{ <span class="hljs-attr">key</span>: <span class="hljs-string">&#x27;avg_rating&#x27;</span>, <span class="hljs-attr">direction</span>: <span class="hljs-string">&#x27;desc&#x27;</span> }],
    <span class="hljs-attr">top_hits</span>: {
      <span class="hljs-attr">size</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">sort</span>: [{ <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;rating&#x27;</span>, <span class="hljs-attr">direction</span>: <span class="hljs-string">&#x27;desc&#x27;</span> }],
    },
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">payload=<span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;product_search_aggregation&quot;,
  &quot;data&quot;: [[0.11, 0.40, 0.19, 0.64, 0.30]], &quot;annsField&quot;: &quot;embedding&quot;, &quot;limit&quot;: 10,
  &quot;searchParams&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;, &quot;params&quot;: {}},
  &quot;searchAggregation&quot;: {
    &quot;fields&quot;: [&quot;category&quot;], &quot;size&quot;: 2,
    &quot;metrics&quot;: {&quot;product_count&quot;: {&quot;op&quot;: &quot;count&quot;, &quot;fieldName&quot;: &quot;*&quot;}, &quot;avg_price&quot;: {&quot;op&quot;: &quot;avg&quot;, &quot;fieldName&quot;: &quot;price&quot;}},
    &quot;order&quot;: [{&quot;key&quot;: &quot;product_count&quot;, &quot;direction&quot;: &quot;desc&quot;}],
    &quot;subAggregation&quot;: {&quot;fields&quot;: [&quot;brand&quot;], &quot;size&quot;: 3, &quot;metrics&quot;: {&quot;brand_count&quot;: {&quot;op&quot;: &quot;count&quot;, &quot;fieldName&quot;: &quot;*&quot;}, &quot;avg_rating&quot;: {&quot;op&quot;: &quot;avg&quot;, &quot;fieldName&quot;: &quot;rating&quot;}}, &quot;order&quot;: [{&quot;key&quot;: &quot;avg_rating&quot;, &quot;direction&quot;: &quot;desc&quot;}], &quot;topHits&quot;: {&quot;size&quot;: 2, &quot;sort&quot;: [{&quot;fieldName&quot;: &quot;rating&quot;, &quot;direction&quot;: &quot;desc&quot;}]}}
  }
}&#x27;</span>
search <span class="hljs-string">&quot;<span class="hljs-variable">$payload</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>View a nested bucket result</summary></p>
<p>The following serialized excerpt shows the <code translate="no">running_shoes</code> parent bucket and its Brand B child bucket. The Brand A and Brand C child buckets are omitted for brevity.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">137.49</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;avg_rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;brand_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9994542598724365</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner B1&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>The displayed result represents the bucket path <code translate="no">(running_shoes) → (Brand B)</code>, not a single composite bucket key <code translate="no">(running_shoes, Brand B)</code>.</p>
<p>Milvus first selects up to two category buckets, ordered by <code translate="no">product_count</code>. It then runs <code translate="no">sub_aggregation</code> independently within each selected category and returns up to three brand buckets, ordered by <code translate="no">avg_rating</code>.</p>
<p>In the output above:</p>
<ul>
<li>The root <code translate="no">running_shoes</code> bucket contains four retained candidates across its child composite keys. Its <code translate="no">metrics</code> contain the root-level <code translate="no">avg_price</code> and <code translate="no">product_count</code> values.</li>
<li>The root bucket’s <code translate="no">sub_groups</code> list contains the child brand buckets. The displayed Brand B bucket contains one retained candidate and its own <code translate="no">avg_rating</code> and <code translate="no">brand_count</code> values.</li>
<li>The root bucket’s <code translate="no">hits</code> list is empty because the root aggregation does not configure <code translate="no">top_hits</code>. The Brand B child contains a representative hit because <code translate="no">top_hits</code> is configured in <code translate="no">sub_aggregation</code>.</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">How accurate are bucket counts and metrics?<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Search Aggregation summarizes retained ANN candidates. It does not run a full-collection aggregation.</p>
<p>Candidate retention has two approximation stages. ANN search can omit relevant collection entities, and the grouping stage retains at most the largest <code translate="no">TopHits.size</code> candidates for each full composite key. If no level configures <code translate="no">top_hits</code>, this per-key limit is one.</p>
<p>For example, suppose a collection contains 5,000 Brand A products and many are relevant to the vector query. If the aggregation uses <code translate="no">TopHits(size=4)</code>, the Brand A bucket can retain at most four candidates for a full composite key. Its <code translate="no">count</code> and metrics describe those retained candidates, not all relevant Brand A products and not all 5,000 collection entities.</p>
<p>Approximation matters most when <code translate="no">order</code> uses a metric alias. Changes in search recall can change the metric values and therefore change which buckets fit within <code translate="no">SearchAggregation.size</code>. Nested aggregation can amplify this effect because each child level operates on the entities available in its parent bucket.</p>
<p>If you need exact statistics over every matching entity, use an exact query aggregation workflow instead of Search Aggregation.</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">How does Search Aggregation differ from Grouping Search?<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Choose based on the application’s primary result shape:</p>
<table>
<thead>
<tr><th>Primary need</th><th>Prefer</th><th>Response to consume</th></tr>
</thead>
<tbody>
<tr><td>Return a standard ranked entity list with fewer repeated values in a grouping field</td><td><a href="/docs/de/grouping-search.md">Grouping Search</a></td><td>Flat search hits for each query vector</td></tr>
<tr><td>Inspect or compare groups as buckets, with keys, counts, metrics, ordering, representative hits, or child buckets</td><td>Search Aggregation</td><td><code translate="no">AggregationBucket</code> objects in <code translate="no">result.agg_buckets</code></td></tr>
</tbody>
</table>
<p>Even when Search Aggregation configures <code translate="no">top_hits</code>, its primary response remains a bucket tree. Grouping Search remains useful when the application already processes ordinary search hits and primarily wants result diversity.</p>
<p>The APIs are mutually exclusive. PyMilvus raises <code translate="no">ParamError</code> when <code translate="no">search_aggregation</code> is combined with <code translate="no">group_by_field</code> or <code translate="no">group_by_fields</code> in the same request.</p>
