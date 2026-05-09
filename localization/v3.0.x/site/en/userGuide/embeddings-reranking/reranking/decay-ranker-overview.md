---
id: decay-ranker-overview.md
title: Decay Ranker Overview
summary: >-
  In traditional vector search, results are ranked purely by vector
  similarity—how closely vectors match in mathematical space. But in real-world
  applications, what makes content truly relevant often depends on more than
  just semantic similarity.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">Decay Ranker Overview<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>In traditional vector search, results are ranked purely by vector similarity—how closely vectors match in mathematical space. But in real-world applications, what makes content truly relevant often depends on more than just semantic similarity.</p>
<p>Consider these everyday scenarios:</p>
<ul>
<li><p>A news search where yesterday’s article should rank higher than a similar article from three years ago</p></li>
<li><p>A restaurant finder that prioritizes venues 5 minutes away over those requiring a 30-minute drive</p></li>
<li><p>An e-commerce platform that boosts trending products even when they’re slightly less similar to the search query</p></li>
</ul>
<p>These scenarios all share a common need: balancing vector similarity with other numeric factors like time, distance, or popularity.</p>
<p>Decay rankers in Milvus address this need by adjusting search rankings based on numeric field values. They allow you to balance vector similarity with “freshness,” “nearness,” or other numeric properties of your data, creating more intuitive and contextually relevant search experiences.</p>
<h2 id="Usage-notes" class="common-anchor-header">Usage notes<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p>Decay ranking cannot be used with grouping searches.</p></li>
<li><p>The field used for decay ranking must be numeric (<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, or <code translate="no">DOUBLE</code>).</p></li>
<li><p>Each decay ranker can only use one numeric field.</p></li>
<li><p><strong>Time unit consistency</strong>: When using time-based decay ranking, the units for <code translate="no">origin</code>, <code translate="no">scale</code>, and <code translate="no">offset</code> parameters must match the units used in your collection data:</p>
<ul>
<li><p>If your collection stores timestamps in <strong>seconds</strong>, use seconds for all parameters</p></li>
<li><p>If your collection stores timestamps in <strong>milliseconds</strong>, use milliseconds for all parameters</p></li>
<li><p>If your collection stores timestamps in <strong>microseconds</strong>, use microseconds for all parameters</p></li>
</ul></li>
</ul>
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
    </button></h2><p>Decay ranking enhances traditional vector search by incorporating numeric factors like time or geo distance into the ranking process. The entire process follows these stages:</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">Stage 1: Calculate normalized similarity scores<button data-href="#Stage-1-Calculate-normalized-similarity-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>First, Milvus calculates and normalizes vector similarity scores to ensure consistent comparison:</p>
<ul>
<li><p>For <strong>L2</strong> and <strong>JACCARD</strong> distance metrics (where lower values indicate higher similarity):</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>This transforms distances into similarity scores between 0-1, where higher is better.</p></li>
<li><p>For <strong>IP</strong>, <strong>COSINE</strong>, and <strong>BM25</strong> metrics (where higher scores already indicate better matches): Scores are used directly without normalization.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">Stage 2: Calculate decay scores<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Next, Milvus calculates a decay score based on the numeric field value (like timestamp or distance) using your selected decay ranker:</p>
<ul>
<li><p>Each decay ranker transforms raw numeric values into normalized relevance scores between 0-1</p></li>
<li><p>The decay score represents how relevant an item is based on its “distance” from the ideal point</p></li>
</ul>
<p>The specific calculation formula varies depending on the decay ranker type. For details on how to calculate a decay score, refer to the dedicated pages for <a href="/docs/gaussian-decay.md#Formula">Gaussian Decay</a>, <a href="/docs/exponential-decay.md#Formula">Exponential Decay</a>, <a href="/docs/linear-decay.md#Formula">Linear Decay</a>.</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">Stage 3: Compute final scores<button data-href="#Stage-3-Compute-final-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Finally, Milvus combines the normalized similarity score and decay score to produce the final ranking score:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>In cases of hybrid search (combining multiple vector fields), Milvus takes the maximum normalized similarity score among search requests:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>For example, if a research paper scores 0.82 from vector similarity and 0.91 from BM25-based text retrieval in a hybrid search, Milvus uses 0.91 as the base similarity score before applying the decay factor.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">Decay ranking in action<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>Let’s see decay ranking in a practical scenario—searching for <strong>“AI research papers”</strong> with time-based decay:</p>
<div class="alert note">
<p>In this example, decay scores reflect how relevance diminishes with time—newer papers receive scores closer to 1.0, older papers receive lower scores. These values are calculated using a specific decay ranker. For details, refer to <a href="/docs/decay-ranker-overview.md#Choose-the-right-decay-ranker">Choose the right decay ranker</a>.</p>
</div>
<table>
   <tr>
     <th><p>Paper</p></th>
     <th><p>Vector Similarity</p></th>
     <th><p>Normalized Similarity Score</p></th>
     <th><p>Publication Date</p></th>
     <th><p>Decay Score</p></th>
     <th><p>Final Score</p></th>
     <th><p>Final Rank</p></th>
   </tr>
   <tr>
     <td><p>Paper A</p></td>
     <td><p>High</p></td>
     <td><p>0.85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>2 weeks ago</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Paper B</p></td>
     <td><p>Very High</p></td>
     <td><p>0.92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>6 months ago</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>Paper C</p></td>
     <td><p>Medium</p></td>
     <td><p>0.75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>1 day ago</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>Paper D</p></td>
     <td><p>Medium-High</p></td>
     <td><p>0.76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>3 weeks ago</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>
<p>Without decay reranking, Paper B would rank highest based on pure vector similarity (0.92). However, with decay reranking applied:</p>
<ul>
<li><p>Paper C jumps to position #1 despite medium similarity because it’s very recent (published yesterday)</p></li>
<li><p>Paper B drops to position #3 despite excellent similarity because it’s relatively old</p></li>
<li><p>Paper D uses L2 distance (where lower is better), so its score is normalized from 1.2 to 0.76 before applying decay</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">Choose the right decay ranker<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus offers distinct decay rankers - <code translate="no">gauss</code>, <code translate="no">exp</code>, <code translate="no">linear</code>, each designed for specific use cases:</p>
<table>
   <tr>
     <th><p>Decay Ranker</p></th>
     <th><p>Characteristics</p></th>
     <th><p>Ideal Use Cases</p></th>
     <th><p>Example Scenario</p></th>
   </tr>
   <tr>
     <td><p>Gaussian (<code translate="no">gauss</code>)</p></td>
     <td><p>Natural-feeling gradual decline that extends moderately</p></td>
     <td><ul><li><p>General searches requiring balanced results</p></li><li><p>Applications where users have an intuitive sense of distance</p></li><li><p>When moderate distance shouldn't severely penalize results</p></li></ul></td>
     <td><p>In a restaurant search, quality venues 3 km away remain discoverable, though ranked lower than nearby options</p></td>
   </tr>
   <tr>
     <td><p>Exponential (<code translate="no">exp</code>)</p></td>
     <td><p>Rapidly decreases at first but maintains a long tail</p></td>
     <td><ul><li><p>News feeds where recency is critical</p></li><li><p>Social media where fresh content should dominate</p></li><li><p>When proximity is strongly preferred but exceptional distant items should remain visible</p></li></ul></td>
     <td><p>In a news app, yesterday's stories rank much higher than week-old content, but highly relevant older articles can still appear</p></td>
   </tr>
   <tr>
     <td><p>Linear (<code translate="no">linear</code>)</p></td>
     <td><p>Consistent, predictable decline with a clear cutoff</p></td>
     <td><ul><li><p>Applications with natural boundaries</p></li><li><p>Services with distance limits</p></li><li><p>Content with expiration dates or clear thresholds</p></li></ul></td>
     <td><p>In an event finder, events beyond a two-week future window simply don't appear at all</p></td>
   </tr>
</table>
<p>For detailed information about how each decay ranker calculates scores and specific decline patterns, refer to the dedicated documentation:</p>
<ul>
<li><p><a href="/docs/gaussian-decay.md">Gaussian Decay</a></p></li>
<li><p><a href="/docs/exponential-decay.md">Exponential Decay</a></p></li>
<li><p><a href="/docs/linear-decay.md">Linear Decay</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">Implementation example<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>Decay rankers can be applied to both standard vector search and hybrid search operations in Milvus. Below are the key code snippets for implementing this feature.</p>
<div class="alert note">
<p>Before using decay functions, you must first create a collection with appropriate numeric fields (like timestamps, distances, etc.) that will be used for decay calculations. For complete working examples including collection setup, schema definition, and data insertion, refer to <a href="/docs/tutorial-implement-a-time-based-ranking-in-milvus.md">Tutorial: Implement Time-based Ranking in Milvus</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Create a decay ranker<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>To implement decay ranking, first define a <code translate="no">Function</code> object with the appropriate configuration:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
decay_ranker = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).timestamp()),    <span class="hljs-comment"># Reference point (seconds)</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds (must match collection data unit)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone (must match collection data unit)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.DecayRanker;

<span class="hljs-keyword">import</span> java.time.ZoneId;
<span class="hljs-keyword">import</span> java.time.ZonedDateTime;

<span class="hljs-type">ZonedDateTime</span> <span class="hljs-variable">zdt</span> <span class="hljs-operator">=</span> ZonedDateTime.of(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">25</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, ZoneId.systemDefault());

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;timestamp&quot;</span>))
        .function(<span class="hljs-string">&quot;gauss&quot;</span>)
        .origin(zdt.toInstant().toEpochMilli())
        .scale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .offset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .decay(<span class="hljs-number">0.5</span>)
        .build();

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> decayRanker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;time_decay&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">function_type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;gauss&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).<span class="hljs-title function_">getTime</span>(),
    <span class="hljs-attr">scale</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">offset</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,
  },
};

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Required?</p></th>
     <th><p>Description</p></th>
     <th><p>Value/Example</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Identifier for your function used when executing searches. Choose a descriptive name relevant to your use case.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Numeric field for decay score calculation. Determines which data attribute will be used for calculating decay (e.g., timestamps for time-based decay, coordinates for location-based decay). </p><p>Must be a field in your collection that contains relevant numeric values. Supports INT8/16/32/64, FLOAT, DOUBLE.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Specifies the type of function being created.</p><p>Must be set to <code translate="no">RERANK</code> for all decay rankers.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Specifies the reranking method to use.</p><p>Must be set to <code translate="no">"decay"</code> to enable decay ranking functionality.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Specifies which mathematical decay ranker to apply. Determines the curve shape of relevance decline.</p><p>See <a href="/docs/decay-ranker-overview.md#Choose-the-right-decay-ranker">Choose the right decay ranker</a> section for guidance on selecting the appropriate function.</p></td>
     <td><p><code translate="no">"gauss"</code>, <code translate="no">"exp"</code>, or <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Reference point from which decay score is calculated. Items at this value receive maximum relevance scores.</p><p>For time-based decay, the time unit must match your collection data.</p></td>
     <td><ul><li><p>For timestamps: current time (e.g., <code translate="no">int(time.time())</code>)</p></li><li><p>For geolocation: user's current coordinates</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Distance or time at which relevance drops to the <code translate="no">decay</code> value. Controls how quickly relevance declines.</p><p>For time-based decay, the time unit must match your collection data.</p><p>Larger values create a more gradual decline in relevance; smaller values create a steeper decline.</p></td>
     <td><ul><li><p>For time: period in seconds (e.g., <code translate="no">7 * 24 * 60 * 60</code> for 7 days)</p></li><li><p>For distance: meters (e.g., <code translate="no">5000</code> for 5km)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>No</p></td>
     <td><p>Creates a "no-decay zone" around the <code translate="no">origin</code> where items maintain full scores (decay score = 1.0).</p><p>For time-based decay, the time unit must match your collection data.</p><p>Items within this range of the <code translate="no">origin</code> maintain maximum relevance.</p></td>
     <td><ul><li><p>For time: period in seconds (e.g., <code translate="no">24 * 60 * 60</code> for 1 day)</p></li><li><p>For distance: meters (e.g., <code translate="no">500</code> for 500m)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>No</p></td>
     <td><p>Score value at the <code translate="no">scale</code> distance, controls curve steepness. Lower values create steeper decline curves; higher values create more gradual decline curves.</p><p>Must be between 0 and 1.</p></td>
     <td><p><code translate="no">0.5</code> (default)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Apply to standard vector search<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>After defining your decay ranker, you can apply it during search operations by passing it to the <code translate="no">ranker</code> parameter:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;search query&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;collection_name&quot;</span>,
  <span class="hljs-attr">data</span>: [your_query_vector], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">rerank</span>: ranker,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
