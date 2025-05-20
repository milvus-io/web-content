---
id: multi-vector-search.md
order: 2
summary: >-
  This guide demonstrates how to perform hybrid search in Milvus and understand
  the reranking of results.
title: Hybrid Search
---
<h1 id="Hybrid-Search" class="common-anchor-header">Hybrid Search<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Since Milvus 2.4, we introduced multi-vector support and a hybrid search framework, which means users can bring in several vector fields (up to 10) into a single collection. These vectors in different columns represent diverse facets of data, originating from different embedding models or undergoing distinct processing methods. The results of hybrid searches are integrated using reranking strategies, such as Reciprocal Rank Fusion (RRF) and Weighted Scoring. To learn more about reranking strategies, refer to <a href="/docs/v2.4.x/reranking.md">Reranking</a>.</p>
<p>This feature is particularly useful in comprehensive search scenarios, such as identifying the most similar person in a vector library based on various attributes like pictures, voice, fingerprints, etc.</p>
<p>In this tutorial, you will learn how to:</p>
<ul>
<li><p>Create multiple <code translate="no">AnnSearchRequest</code> instances for similarity searches on different vector fields;</p></li>
<li><p>Configure a reranking strategy to combine and rerank search results from multiple <code translate="no">AnnSearchRequest</code> instances;</p></li>
<li><p>Use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> method to perform a hybrid search.</p></li>
</ul>
<div class="alert note">
<p>The code snippets on this page use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">PyMilvus ORM module</a> to interact with Milvus. Code snippets with the new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient SDK</a> will be available soon.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">Preparations<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>Before starting a hybrid search, ensure you have a collection with multiple vector fields. Currently, Milvus introduces a default of four vector fields per collection, which can be extended to a maximum of ten by modifying the <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum">proxy.maxVectorFieldNum</a> configuration.</p>
<p>Below is an example of creating a collection named <code translate="no">test_collection</code> with two vector fields, <code translate="no">filmVector</code> and <code translate="no">posterVector</code>, and inserting random entities into it.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Connect to Milvus</span>
connections.connect(
    host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, <span class="hljs-comment"># Replace with your Milvus server IP</span>
    port=<span class="hljs-string">&quot;19530&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&quot;film_id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;filmVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>), <span class="hljs-comment"># Vector field for film vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;posterVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)] <span class="hljs-comment"># Vector field for poster vectors</span>

schema = CollectionSchema(fields=fields,enable_dynamic_field=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Create collection</span>
collection = Collection(name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema)

<span class="hljs-comment"># Create index for each vector field</span>
index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
}

collection.create_index(<span class="hljs-string">&quot;filmVector&quot;</span>, index_params)
collection.create_index(<span class="hljs-string">&quot;posterVector&quot;</span>, index_params)

<span class="hljs-comment"># Generate random entities to insert</span>
entities = []

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    <span class="hljs-comment"># generate random values for each field in the schema</span>
    film_id = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">1000</span>)
    film_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]
    poster_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]

    <span class="hljs-comment"># create a dictionary for each entity</span>
    entity = {
        <span class="hljs-string">&quot;film_id&quot;</span>: film_id,
        <span class="hljs-string">&quot;filmVector&quot;</span>: film_vector,
        <span class="hljs-string">&quot;posterVector&quot;</span>: poster_vector
    }

    <span class="hljs-comment"># add the entity to the list</span>
    entities.append(entity)
    
collection.insert(entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-1-Create-Multiple-AnnSearchRequest-Instances" class="common-anchor-header">Step 1: Create Multiple AnnSearchRequest Instances<button data-href="#Step-1-Create-Multiple-AnnSearchRequest-Instances" class="anchor-icon" translate="no">
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
    </button></h2><p>A hybrid search uses the <code translate="no">hybrid_search()</code> API to perform multiple ANN search requests in a single call. Each <code translate="no">AnnSearchRequest</code> represents a single search request on a specific vector field.</p>
<p>The following example creates two <code translate="no">AnnSearchRequest</code> instances to perform individual similarity searches on two vector fields.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Create ANN search request 1 for filmVector</span>
query_filmVector = [[<span class="hljs-number">0.8896863042430693</span>, <span class="hljs-number">0.370613100114602</span>, <span class="hljs-number">0.23779315077113428</span>, <span class="hljs-number">0.38227915951132996</span>, <span class="hljs-number">0.5997064603128835</span>]]

search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_filmVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;filmVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># Create ANN search request 2 for posterVector</span>
query_posterVector = [[<span class="hljs-number">0.02550758562349764</span>, <span class="hljs-number">0.006085637357292062</span>, <span class="hljs-number">0.5325251250159071</span>, <span class="hljs-number">0.7676432650114147</span>, <span class="hljs-number">0.5521074424751443</span>]]
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_posterVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;posterVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># Store these two requests as a list in `reqs`</span>
reqs = [request_1, request_2]
<button class="copy-code-btn"></button></code></pre>
<p>Parameters:</p>
<ul>
<li><p><code translate="no">AnnSearchRequest</code> (<em>object</em>)</p>
<p>A class representing an ANN search request. Each hybrid search can contain 1 to 1,024 <code translate="no">ANNSearchRequest</code> objects at a time.</p></li>
<li><p><code translate="no">data</code> (<em>list</em>)</p>
<p>The query vector to search in a single <code translate="no">AnnSearchRequest</code>. Currently, this parameter accepts a list containing only a single query vector, for example, <code translate="no">[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]</code>. In the future, this parameter will be expanded to accept multiple query vectors.</p></li>
<li><p><code translate="no">anns_field</code> (<em>string</em>)</p>
<p>The name of the vector field to use in a single <code translate="no">AnnSearchRequest</code>.</p></li>
<li><p><code translate="no">param</code> (<em>dict</em>)</p>
<p>A dictionary of search parameters for a single <code translate="no">AnnSearchRequest</code>. These search parameters are identical to those for a single-vector search. For more information, refer to <a href="https://milvus.io/docs/single-vector-search.md#Search-parameters">Search parameters</a>.</p></li>
<li><p><code translate="no">limit</code> (<em>int</em>)</p>
<p>The maximum number of search results to include in a single <code translate="no">ANNSearchRequest</code>.</p>
<p>This parameter only affects the number of search results to return within an individual <code translate="no">ANNSearchRequest</code>, and it does not decide the final results to return for a <code translate="no">hybrid_search</code> call. In a hybrid search, the final results are determined by combining and reranking the results from multiple <code translate="no">ANNSearchRequest</code> instances.</p></li>
</ul>
<h2 id="Step-2-Configure-a-Reranking-Strategy" class="common-anchor-header">Step 2: Configure a Reranking Strategy<button data-href="#Step-2-Configure-a-Reranking-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>After creating <code translate="no">AnnSearchRequest</code> instances, configure a reranking strategy to combine and rerank the results. Currently, there are two options: <code translate="no">WeightedRanker</code> and <code translate="no">RRFRanker</code>. For more information about reranking strategies, refer to <a href="/docs/v2.4.x/reranking.md">Reranking</a>.</p>
<ul>
<li><p>Use weighted scoring</p>
<p>The <code translate="no">WeightedRanker</code> is used to assign importance to the results from each vector field search with specified weights. If you prioritize some vector fields over others, <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> can reflect this in the combined search results.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker
<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
<span class="hljs-comment"># Assign weights of 0.8 to text search and 0.2 to image search</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>)  
<button class="copy-code-btn"></button></code></pre>
<p>When using <code translate="no">WeightedRanker</code>, note that:</p>
<ul>
<li>Each weight value ranges from 0 (least important) to 1 (most important), influencing the final aggregated score.</li>
<li>The total number of weight values provided in <code translate="no">WeightedRanker</code> should equal the number of <code translate="no">AnnSearchRequest</code> instances you have created.</li>
</ul></li>
<li><p>Use Reciprocal Rank Fusion (RFF)</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Alternatively, use RRFRanker for reciprocal rank fusion reranking</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

rerank = RRFRanker()
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">Step 3: Perform a Hybrid Search<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>With the <code translate="no">AnnSearchRequest</code> instances and reranking strategy set, use the <code translate="no">hybrid_search()</code> method to perform the hybrid search.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Before conducting hybrid search, load the collection into memory.</span>
collection.load()

res = collection.hybrid_search(
    reqs, <span class="hljs-comment"># List of AnnSearchRequests created in step 1</span>
    rerank, <span class="hljs-comment"># Reranking strategy specified in step 2</span>
    limit=<span class="hljs-number">2</span> <span class="hljs-comment"># Number of final search results to return</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>Parameters:</p>
<ul>
<li><p><code translate="no">reqs</code> (<em>list</em>)</p>
<p>A list of search requests, where each request is an <code translate="no">ANNSearchRequest</code> object. Each request can correspond to a different vector field and a different set of search parameters.</p></li>
<li><p><code translate="no">rerank</code> (<em>object</em>)</p>
<p>The reranking strategy to use for hybrid search. Possible values: <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> and <code translate="no">RRFRanker()</code>.</p>
<p>For more information about reranking strategies, refer to <a href="/docs/v2.4.x/reranking.md">Reranking</a>.</p></li>
<li><p><code translate="no">limit</code> (<em>int</em>)</p>
<p>The maximum number of final results to return in the hybrid search.</p></li>
</ul>
<p>The output is similar to the following:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><ul>
<li><p>Typically, each collection has a default allowance of up to 4 vector fields. However, you have the option to adjust the <code translate="no">proxy.maxVectorFieldNum</code> configuration to expand the maximum number of vector fields in a collection, with a maximum limit of 10 vector fields per collection. See <a href="https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations">Proxy-related Configurations</a> for more.</p></li>
<li><p>Partially indexed or loaded vector fields in a collection will result in an error.</p></li>
<li><p>Currently, each <code translate="no">AnnSearchRequest</code> in a hybrid search can carry one query vector only.</p></li>
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
    </button></h2><ul>
<li><p><strong>In which scenario is hybrid search recommended?</strong></p>
<p>Hybrid search is ideal for complex situations demanding high accuracy, especially when an entity can be represented by multiple, diverse vectors. This applies to cases where the same data, such as a sentence, is processed through different embedding models or when multimodal information (like images, fingerprints, and voiceprints of an individual) is converted into various vector formats. By assigning weights to these vectors, their combined influence can significantly enrich recall and improve the effectiveness of search results.</p></li>
<li><p><strong>How does a weighted ranker normalize distances between different vector fields?</strong></p>
<p>A weighted ranker normalizes the distances between vector fields using assigned weights to each field. It calculates the importance of each vector field according to its weight, prioritizing those with higher weights. It’s advised to use the same metric type across ANN search requests to ensure consistency. This method ensures that vectors deemed more significant have a greater influence on the overall ranking.</p></li>
<li><p><strong>Is it possible to use alternative rankers like Cohere Ranker or BGE Ranker?</strong></p>
<p>Currently, only the provided rankers are supported. Plans to include additional rankers are underway for future updates.</p></li>
<li><p><strong>Is it possible to conduct multiple hybrid search operations at the same time?</strong></p>
<p>Yes, simultaneous execution of multiple hybrid search operations is supported.</p></li>
<li><p><strong>Can I use the same vector field in multiple AnnSearchRequest objects to perform hybrid searches?</strong></p>
<p>Technically, it is possible to use the same vector field in multiple AnnSearchRequest objects for hybrid searches. It is not necessary to have multiple vector fields for a hybrid search.</p></li>
</ul>
