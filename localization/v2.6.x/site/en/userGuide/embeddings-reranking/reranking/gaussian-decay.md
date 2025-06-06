---
id: gaussian-decay.md
title: Gaussian Decay
summary: >-
  Gaussian decay, also known as normal decay, creates the most natural-feeling
  adjustment to your search results. Like human vision that gradually blurs with
  distance, Gaussian decay creates a smooth, bell-shaped curve that gently
  reduces relevance as items move away from your ideal point. This approach is
  ideal when you want a balanced decay that doesn't harshly penalize items just
  outside your preferred range but still significantly reduces the relevance of
  distant items.
beta: Milvus 2.6.x
---
<h1 id="Gaussian-Decay" class="common-anchor-header">Gaussian Decay<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Gaussian-Decay" class="anchor-icon" translate="no">
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
    </button></h1><p>Gaussian decay, also known as normal decay, creates the most natural-feeling adjustment to your search results. Like human vision that gradually blurs with distance, Gaussian decay creates a smooth, bell-shaped curve that gently reduces relevance as items move away from your ideal point. This approach is ideal when you want a balanced decay that doesn’t harshly penalize items just outside your preferred range but still significantly reduces the relevance of distant items.</p>
<p>Unlike other decay rankers:</p>
<ul>
<li><p>Exponential decay drops sharply at first, creating a stronger initial penalty</p></li>
<li><p>Linear decay decreases at a constant rate until reaching zero, creating a clear cutoff</p></li>
</ul>
<p>Gaussian decay provides a more balanced, intuitive approach that feels natural to users.</p>
<h2 id="When-to-use-Gaussian-decay" class="common-anchor-header">When to use Gaussian decay<button data-href="#When-to-use-Gaussian-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Gaussian decay is particularly effective for:</p>
<table>
   <tr>
     <th><p>Use Case</p></th>
     <th><p>Example</p></th>
     <th><p>Why Gaussian Works Well</p></th>
   </tr>
   <tr>
     <td><p>Location-based searches</p></td>
     <td><p>Restaurant finders, store locators</p></td>
     <td><p>Mimics natural human perception of distance relevance</p></td>
   </tr>
   <tr>
     <td><p>Content recommendations</p></td>
     <td><p>Article suggestions based on publication date</p></td>
     <td><p>Gradual decline in relevance as content ages</p></td>
   </tr>
   <tr>
     <td><p>Product listings</p></td>
     <td><p>Items priced near a target</p></td>
     <td><p>Smooth relevance decline as prices deviate from target</p></td>
   </tr>
   <tr>
     <td><p>Expertise matching</p></td>
     <td><p>Finding professionals with relevant experience</p></td>
     <td><p>Balanced assessment of experience relevance</p></td>
   </tr>
</table>
<p>If your application requires a natural feeling of declining relevance without harsh penalties or strict cutoffs, Gaussian decay is likely your best choice.</p>
<h2 id="Bell-curve-principle" class="common-anchor-header">Bell curve principle<button data-href="#Bell-curve-principle" class="anchor-icon" translate="no">
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
    </button></h2><p>Gaussian decay creates a smooth, bell-shaped curve that gradually reduces relevance as distance increases from an ideal point. Named after mathematician Carl Friedrich Gauss, this distribution appears frequently in nature and statistics, which explains why it feels so intuitive to human perception.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/gaussian-decay.png" alt="Gaussian Decay" class="doc-image" id="gaussian-decay" />
    <span>Gaussian Decay</span>
  </span>
</p>
<p>The graph above shows how Gaussian decay would affect restaurant rankings in a mobile search app:</p>
<ul>
<li><p><code translate="no">origin</code> (0 km): Your current location, where relevance is at its maximum (1.0).</p></li>
<li><p><code translate="no">offset</code> (±300 m): The “perfect score zone” around you—all restaurants within 300 meters maintain full relevance scores (1.0), ensuring that very nearby options aren’t needlessly penalized for tiny distance differences.</p></li>
<li><p><code translate="no">scale</code> (±2 km): The distance at which relevance drops to the decay value—restaurants exactly 2 kilometers away have their relevance scores halved (0.5).</p></li>
<li><p><code translate="no">decay</code> (0.5): The score at the scale distance—this parameter essentially controls how quickly scores diminish with distance.</p></li>
</ul>
<p>As you can see from the curve, restaurants beyond 2 km continue to decrease in relevance but never quite reach zero. Even restaurants 4-5 kilometers away retain some minimal relevance, allowing excellent but distant restaurants to still appear in your results (albeit ranked lower).</p>
<p>This behavior mimics how people naturally think about distance relevance—nearby places are preferred, but we’re willing to travel farther for exceptional options.</p>
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
    </button></h2><p>The mathematical formula for calculating a Gaussian decay score is:</p>
<p>$$
S(\text{doc}) = \exp\left( -\frac{\left( \max\left(0, \left|\text{fieldvalue}_{\text{doc}} - \text{origin}\right| - \text{offset} \right) \right)^2}{2\sigma^2} \right)
$$</p>
<p>Where:</p>
<p>$$
\sigma^2 = -\frac{\text{scale}^2}{2 \cdot \ln(\text{decay})}
$$</p>
<p>Breaking this down in plain language:</p>
<ol>
<li><p>Calculate how far the field value is from the origin:  $|\text{fieldvalue}_{\text{doc}} - \text{origin}|$</p></li>
<li><p>Subtract the offset (if any) but never go below zero: $\max(0, \text{distance} - \text{offset})$</p></li>
<li><p>Square this adjusted distance: $(\text{adjusted_distance})^2$</p></li>
<li><p>Divide by $2\sigma^2$, which is calculated from your scale and decay parameters</p></li>
<li><p>Take the negative exponent, which gives you a value between 0 and 1: $\exp(-\text{value})$</p></li>
</ol>
<p>The $\sigma^{2}$ calculation converts your scale and decay parameters into the standard deviation squared for the Gaussian distribution. This is what gives the function its characteristic bell shape.</p>
<h2 id="Use-Gaussian-decay" class="common-anchor-header">Use Gaussian decay<button data-href="#Use-Gaussian-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Gaussian decay can be applied to both standard vector search and hybrid search operations in Milvus. Below are the key code snippets for implementing this feature.</p>
<div class="alert note">
<p>Before using decay functions, you must first create a collection with appropriate numeric fields (like timestamps, distances, etc.) that will be used for decay calculations. For complete working examples including collection setup, schema definition, and data insertion, refer to <a href="/docs/tutorial-implement-a-time-based-ranking-in-milvus.md">Tutorial: Implement Time-based Ranking in Milvus</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Create a decay ranker</h3><p>After your collection is set up with a numeric field (in this example, <code translate="no">distance</code> in meters from the user), create a Gaussian decay ranker:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a Gaussian decay ranker for location-based restaurant search</span>
ranker = Function(
    name=<span class="hljs-string">&quot;restaurant_distance_decay&quot;</span>,     <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;distance&quot;</span>],       <span class="hljs-comment"># Numeric field for distance in meters</span>
    function_type=FunctionType.RERANK,    <span class="hljs-comment"># Function type. Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,              <span class="hljs-comment"># Specify decay reranker</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,              <span class="hljs-comment"># Choose Gaussian decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-number">0</span>,                      <span class="hljs-comment"># Your current location (0 meters)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">300</span>,                    <span class="hljs-comment"># 300m no-decay zone</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                     <span class="hljs-comment"># Half score at scale distance</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">2000</span>                     <span class="hljs-comment"># 2 km scale (2000 meters)</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Apply to standard vector search</h3><p>After defining your decay ranker, you can apply it during search operations by passing it to the <code translate="no">ranker</code> parameter:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply decay ranker to restaurant vector search</span>
result = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;italian restaurants&quot;</span>],         <span class="hljs-comment"># Query text</span>
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">10</span>,                             <span class="hljs-comment"># Number of results</span>
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;cuisine&quot;</span>, <span class="hljs-string">&quot;distance&quot;</span>],  <span class="hljs-comment"># Fields to return</span>
    <span class="hljs-comment">#  highlight-next-line</span>
    ranker=ranker,                        <span class="hljs-comment"># Apply the decay ranker</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Apply to hybrid search</h3><p>Decay rankers can also be applied to hybrid search operations that combine multiple vector fields:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define dense vector search request</span>
dense = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;italian restaurants&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define sparse vector search request</span>
sparse = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;italian restaurants&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply decay ranker to restaurant hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense, sparse],                      <span class="hljs-comment"># Multiple search requests</span>
    <span class="hljs-comment">#  highlight-next-line</span>
    ranker=ranker,                        <span class="hljs-comment"># Same decay ranker</span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;cuisine&quot;</span>, <span class="hljs-string">&quot;distance&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>For more information on hybrid search operations, refer to <a href="/docs/multi-vector-search.md">Multi-Vector Hybrid Search</a>.</p>
