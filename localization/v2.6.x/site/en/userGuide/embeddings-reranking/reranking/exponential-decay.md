---
id: exponential-decay.md
title: Exponential Decay
summary: >-
  Exponential decay creates a steep initial drop followed by a long tail in your
  search results. Like a breaking news cycle where relevance diminishes rapidly
  at first but some stories retain importance over time, exponential decay
  applies a sharp penalty to items just beyond your ideal range while still
  keeping distant items discoverable. This approach is ideal when you want to
  heavily prioritize proximity or recency but don't want to completely eliminate
  more distant options.
beta: Milvus 2.6.x
---
<h1 id="Exponential-Decay" class="common-anchor-header">Exponential Decay<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Exponential-Decay" class="anchor-icon" translate="no">
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
    </button></h1><p>Exponential decay creates a steep initial drop followed by a long tail in your search results. Like a breaking news cycle where relevance diminishes rapidly at first but some stories retain importance over time, exponential decay applies a sharp penalty to items just beyond your ideal range while still keeping distant items discoverable. This approach is ideal when you want to heavily prioritize proximity or recency but don’t want to completely eliminate more distant options.</p>
<p>Unlike other decay functions:</p>
<ul>
<li><p>Gaussian decay creates a more gradual, bell-shaped decline</p></li>
<li><p>Linear decay decreases at a constant rate until reaching exactly zero</p></li>
</ul>
<p>Exponential decay uniquely “frontloads” the penalty, applying most of the relevance reduction early while maintaining a long tail of minimal but non-zero relevance.</p>
<h2 id="When-to-use-exponential-decay" class="common-anchor-header">When to use exponential decay<button data-href="#When-to-use-exponential-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Exponential decay is particularly effective for:</p>
<table>
   <tr>
     <th><p>Use Case</p></th>
     <th><p>Example</p></th>
     <th><p>Why Exponential Works Well</p></th>
   </tr>
   <tr>
     <td><p>News feeds</p></td>
     <td><p>Breaking news portals</p></td>
     <td><p>Quickly reduces relevance of older news while still showing important stories from days ago</p></td>
   </tr>
   <tr>
     <td><p>Social media timelines</p></td>
     <td><p>Activity feeds, status updates</p></td>
     <td><p>Emphasizes fresh content but allows viral older content to surface</p></td>
   </tr>
   <tr>
     <td><p>Notification systems</p></td>
     <td><p>Alert prioritization</p></td>
     <td><p>Creates urgency for recent alerts while maintaining visibility for important ones</p></td>
   </tr>
   <tr>
     <td><p>Flash sales</p></td>
     <td><p>Limited-time offers</p></td>
     <td><p>Rapidly decreases visibility as deadline approaches</p></td>
   </tr>
</table>
<p>Choose exponential decay when:</p>
<ul>
<li><p>Users expect very recent or nearby items to strongly dominate results</p></li>
<li><p>Older or more distant items should still be discoverable if they’re exceptionally relevant</p></li>
<li><p>The relevance drop-off should be front-loaded (steeper at the beginning, more gradual later)</p></li>
</ul>
<h2 id="Sharp-drop-off-principle" class="common-anchor-header">Sharp drop-off principle<button data-href="#Sharp-drop-off-principle" class="anchor-icon" translate="no">
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
    </button></h2><p>Exponential decay creates a curve that drops quickly at first, then gradually flattens into a long tail that approaches but never reaches zero. This mathematical pattern appears frequently in natural phenomena like radioactive decay, population decline, and information relevance over time.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/exp-decay.png" alt="Exp Decay" class="doc-image" id="exp-decay" />
    <span>Exp Decay</span>
  </span>
</p>
<p>The graph above shows how exponential decay would affect news article rankings in a digital news platform:</p>
<ul>
<li><p><code translate="no">origin</code> (current time): The present moment, where relevance is at its maximum (1.0).</p></li>
<li><p><code translate="no">offset</code> (3 hours): The "breaking news window"—all stories published within the last 3 hours maintain full relevance scores (1.0), ensuring that very recent news isn’t needlessly penalized for minor time differences.</p></li>
<li><p><code translate="no">decay</code> (0.5): The score at the scale distance—this parameter controls how dramatically scores diminish with time.</p></li>
<li><p><code translate="no">scale</code> (24 hours): The time period at which relevance drops to the decay value—news articles exactly 24 hours old have their relevance scores halved (0.5).</p></li>
</ul>
<p>As you can see from the curve, news articles older than 24 hours continue to decrease in relevance but never quite reach zero. Even stories from several days ago retain some minimal relevance, allowing important but older news to still appear in your feed (albeit ranked lower).</p>
<p>This behavior mimics how news relevance typically works—very recent stories strongly dominate, but significant older stories can still break through if they’re exceptionally relevant to the user’s interests.</p>
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
    </button></h2><p>The mathematical formula for calculating an exponential decay score is:</p>
<p>$$
S(\text{doc}) = \exp\left( \lambda \cdot \max\left(0, \left|\text{fieldvalue}_{\text{doc}} - \text{origin}\right| - \text{offset} \right) \right)
$$</p>
<p>Where:</p>
<p>$$
\lambda = \frac{\ln(\text{decay})}{\text{scale}}
$$</p>
<p>Breaking this down in plain language:</p>
<ol>
<li><p>Calculate how far the field value is from the origin: $|\text{fieldvalue}_{\text{doc}} - \text{origin}|$.</p></li>
<li><p>Subtract the offset (if any) but never go below zero: $\max(0, \text{distance} - \text{offset})$.</p></li>
<li><p>Multiply by $\lambda$, which is calculated from your scale and decay parameters.</p></li>
<li><p>Take the exponent, which gives you a value between 0 and 1: $\exp(\lambda \cdot \text{value})$.</p></li>
</ol>
<p>The $\lambda$ calculation converts your scale and decay parameters into the rate parameter for the exponential function. A more negative $\lambda$ creates a steeper initial drop.</p>
<h2 id="Use-exponential-decay" class="common-anchor-header">Use exponential decay<button data-href="#Use-exponential-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Exponential decay can be applied to both standard vector search and hybrid search operations in Milvus. Below are the key code snippets for implementing this feature.</p>
<div class="alert note">
<p>Before using decay functions, you must first create a collection with appropriate numeric fields (like timestamps, distances, etc.) that will be used for decay calculations. For complete working examples including collection setup, schema definition, and data insertion, refer to <a href="/docs/tutorial-implement-a-time-based-ranking-in-milvus.md">Decay Ranker Tutorial</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Create a decay ranker</h3><p>After your collection is set up with a numeric field (in this example, <code translate="no">publish_time</code>), create an exponential decay ranker:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> datetime

<span class="hljs-comment"># Create an exponential decay ranker for news recency</span>
ranker = Function(
    name=<span class="hljs-string">&quot;news_recency&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;publish_time&quot;</span>],   <span class="hljs-comment"># Numeric field to use</span>
    function_type=FunctionType.RERANK,    <span class="hljs-comment"># Function type. Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,              <span class="hljs-comment"># Specify decay reranker</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;exp&quot;</span>,                <span class="hljs-comment"># Choose exponential decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime.now().timestamp()),  <span class="hljs-comment"># Current time</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,            <span class="hljs-comment"># 3 hour breaking news window</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                     <span class="hljs-comment"># Half score at scale distance</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>             <span class="hljs-comment"># 24 hours (1 day)</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Apply to standard vector search</h3><p>After defining your decay ranker, you can apply it during search operations by passing it to the <code translate="no">ranker</code> parameter:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply decay ranker to vector search</span>
result = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;market analysis&quot;</span>],             <span class="hljs-comment"># Query text</span>
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">10</span>,                             <span class="hljs-comment"># Number of results</span>
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>], <span class="hljs-comment"># Fields to return</span>
    <span class="hljs-comment">#  highlight-next-line</span>
    ranker=ranker,                        <span class="hljs-comment"># Apply the decay ranker</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Apply to hybrid search</h3><p>Decay rankers can also be applied to hybrid search operations that combine multiple vector fields:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define dense vector search request</span>
dense = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;market analysis&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define sparse vector search request</span>
sparse = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;market analysis&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense, sparse],                      <span class="hljs-comment"># Multiple search requests</span>
    <span class="hljs-comment">#  highlight-next-line</span>
    ranker=ranker,                        <span class="hljs-comment"># Same decay ranker</span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>For more information on hybrid search operations, refer to <a href="/docs/multi-vector-search.md">Multi-Vector Hybrid Search</a>.</p>
