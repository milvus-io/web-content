---
id: linear-decay.md
title: Linear Decay
summary: >-
  Linear decay creates a straight-line decline that terminates at an absolute
  zero point in your search results. Like an upcoming event countdown where
  relevance gradually fades until the event has passed, linear decay applies a
  predictable, steady reduction in relevance as items move away from your ideal
  point until they completely disappear. This approach is ideal when you want a
  consistent decay rate with a clear cutoff, ensuring that items beyond a
  certain boundary are completely excluded from results.
beta: Milvus 2.6.x
---
<h1 id="Linear-Decay" class="common-anchor-header">Linear Decay<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Linear-Decay" class="anchor-icon" translate="no">
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
    </button></h1><p>Linear decay creates a straight-line decline that terminates at an absolute zero point in your search results. Like an upcoming event countdown where relevance gradually fades until the event has passed, linear decay applies a predictable, steady reduction in relevance as items move away from your ideal point until they completely disappear. This approach is ideal when you want a consistent decay rate with a clear cutoff, ensuring that items beyond a certain boundary are completely excluded from results.</p>
<p>Unlike other decay functions:</p>
<ul>
<li><p>Gaussian decay follows a bell curve that gradually approaches but never reaches zero</p></li>
<li><p>Exponential decay maintains a long tail of minimal relevance that extends indefinitely</p></li>
</ul>
<p>Linear decay uniquely creates a definitive endpoint, making it particularly effective for applications with natural boundaries or deadlines.</p>
<h2 id="When-to-use-linear-decay" class="common-anchor-header">When to use linear decay<button data-href="#When-to-use-linear-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Linear decay is particularly effective for:</p>
<table>
   <tr>
     <th><p>Use Case</p></th>
     <th><p>Example</p></th>
     <th><p>Why Linear Works Well</p></th>
   </tr>
   <tr>
     <td><p>Event listings</p></td>
     <td><p>Concert ticket platforms</p></td>
     <td><p>Creates a clear cutoff for events too far in the future</p></td>
   </tr>
   <tr>
     <td><p>Limited-time offers</p></td>
     <td><p>Flash sales, promotions</p></td>
     <td><p>Ensures expired or soon-to-expire offers don't appear</p></td>
   </tr>
   <tr>
     <td><p>Delivery radius</p></td>
     <td><p>Food delivery, courier services</p></td>
     <td><p>Enforces hard geographical boundaries</p></td>
   </tr>
   <tr>
     <td><p>Age-restricted content</p></td>
     <td><p>Dating platforms, media services</p></td>
     <td><p>Establishes firm age thresholds</p></td>
   </tr>
</table>
<p>Choose linear decay when:</p>
<ul>
<li><p>Your application has a natural boundary, deadline, or threshold</p></li>
<li><p>Items beyond a certain point should be completely excluded from results</p></li>
<li><p>You need a predictable, consistent rate of decline in relevance</p></li>
<li><p>Users should see a clear demarcation between relevant and irrelevant items</p></li>
</ul>
<h2 id="Steady-decline-principle" class="common-anchor-header">Steady decline principle<button data-href="#Steady-decline-principle" class="anchor-icon" translate="no">
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
    </button></h2><p>Linear decay creates a straight-line drop that decreases at a constant rate until reaching exactly zero. This pattern appears in many everyday scenarios like countdown timers, inventory depletion, and deadline approaches where relevance has a clear expiration point.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/linear-decay.png" alt="Linear Decay" class="doc-image" id="linear-decay" />
    <span>Linear Decay</span>
  </span>
</p>
<p>The graph above shows how linear decay would affect event listings on a ticketing platform:</p>
<ul>
<li><p><code translate="no">origin</code> (current date): The present moment, where relevance is at its maximum (1.0).</p></li>
<li><p><code translate="no">offset</code> (1 day): The "immediate events window"—all events happening within the next day maintain full relevance scores (1.0), ensuring that very imminent events aren’t penalized for slight time differences.</p></li>
<li><p><code translate="no">decay</code> (0.5): The score at the scale distance—this parameter controls the rate of decline in relevance.</p></li>
<li><p><code translate="no">scale</code> (10 days): The time period at which relevance drops to the decay value—events 10 days away have their relevance scores halved (0.5).</p></li>
</ul>
<p>As you can see from the straight-line curve, events beyond approximately 16 days away have exactly zero relevance and won’t appear in search results at all. This creates a clear boundary that ensures users only see relevant upcoming events within a defined time window.</p>
<p>This behavior mirrors how event planning typically works—imminent events are most relevant, events in the coming weeks have diminishing importance, and events too far in the future (or already past) shouldn’t appear at all.</p>
<h2 id="Formula" class="common-anchor-header">Formula<button data-href="#Formula" class="anchor-icon" translate="no">
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
    </button></h2><p>The mathematical formula for calculating a linear decay score is:</p>
<p>$$
S(\text{doc}) = \max\left( \frac{s - \max(0, |\text{fieldvalue}_{\text{doc}} - \text{origin}| - \text{offset})}{s}, 0 \right)
$$</p>
<p>Where:</p>
<p>$$
s = \frac{\text{scale}}{(1.0 - \text{decay})}
$$</p>
<p>Breaking this down in plain language:</p>
<ol>
<li><p>Calculate how far the field value is from the origin: $|\text{fieldvalue}_{\text{doc}} - \text{origin}|$</p></li>
<li><p>Subtract the offset (if any) but never go below zero: $\max(0, \text{distance} - \text{offset})$</p></li>
<li><p>Determine the parameter $s$ from your scale and decay values.</p></li>
<li><p>Subtract the adjusted distance from $s$ and divide by $s$</p></li>
<li><p>Ensure the result never goes below zero: $\max(\text{result}, 0)$</p></li>
</ol>
<p>The $s$ calculation transforms your scale and decay parameters into the point where the score reaches zero. For example, with decay=0.5 and scale=7, the score will reach exactly zero at distance=14 (twice the scale value).</p>
<h2 id="Use-linear-decay" class="common-anchor-header">Use linear decay<button data-href="#Use-linear-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Linear decay can be applied to both standard vector search and hybrid search operations in Milvus. Below are the key code snippets for implementing this feature.</p>
<div class="alert note">
<p>Before using decay functions, you must first create a collection with appropriate numeric fields (like timestamps, distances, etc.) that will be used for decay calculations. For complete working examples including collection setup, schema definition, and data insertion, refer to <a href="/docs/tutorial-implement-a-time-based-ranking-in-milvus.md">Decay Ranker Tutorial</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Create a decay ranker</h3><p>After your collection is set up with a numeric field (in this example, <code translate="no">event_date</code> as seconds from now), create a linear decay ranker:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> time

<span class="hljs-comment"># Calculate current time</span>
current_time = <span class="hljs-built_in">int</span>(time.time())

<span class="hljs-comment"># Create a linear decay ranker for event listings</span>
ranker = Function(
    name=<span class="hljs-string">&quot;event_relevance&quot;</span>,               <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;event_date&quot;</span>],     <span class="hljs-comment"># Numeric field to use</span>
    function_type=FunctionType.RERANK,    <span class="hljs-comment"># Function type. Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,              <span class="hljs-comment"># Specify decay reranker</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;linear&quot;</span>,             <span class="hljs-comment"># Choose linear decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: current_time,           <span class="hljs-comment"># Current time</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">12</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,           <span class="hljs-comment"># 12 hour immediate events window</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                     <span class="hljs-comment"># Half score at scale distance</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>         <span class="hljs-comment"># 7 days (in seconds)</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Apply to standard vector search</h3><p>After defining your decay ranker, you can apply it during search operations by passing it to the <code translate="no">ranker</code> parameter:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply decay ranker to vector search</span>
result = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;music concerts&quot;</span>],              <span class="hljs-comment"># Query text</span>
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">10</span>,                             <span class="hljs-comment"># Number of results</span>
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>], <span class="hljs-comment"># Fields to return</span>
    <span class="hljs-comment">#  highlight-next-line</span>
    ranker=ranker,                        <span class="hljs-comment"># Apply the decay ranker</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Apply to hybrid search</h3><p>Decay rankers can also be applied to hybrid search operations that combine multiple vector fields:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define dense vector search request</span>
dense = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;music concerts&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define sparse vector search request</span>
sparse = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;music concerts&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense, sparse],                      <span class="hljs-comment"># Multiple search requests</span>
    ranker=ranker,                        <span class="hljs-comment"># Same decay ranker</span>
    <span class="hljs-comment">#  highlight-next-line</span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>For more information on hybrid search operations, refer to <a href="/docs/multi-vector-search.md">Multi-Vector Hybrid Search</a>.</p>
