---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  Efficient deduplication and similarity search are critical for large-scale
  machine learning datasets, especially for tasks like cleaning training corpora
  for Large Language Models (LLMs). When dealing with millions or billions of
  documents, traditional exact matching becomes too slow and costly.
---
<h1 id="MINHASHLSH" class="common-anchor-header">MINHASH_LSH<button data-href="#MINHASHLSH" class="anchor-icon" translate="no">
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
    </button></h1><p>Efficient deduplication and similarity search are critical for large-scale machine learning datasets, especially for tasks like cleaning training corpora for Large Language Models (LLMs). When dealing with millions or billions of documents, traditional exact matching becomes too slow and costly.</p>
<p>The <strong>MINHASH_LSH</strong> index in Milvus enables fast, scalable, and accurate approximate deduplication by combining two powerful techniques:</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>: Quickly generates compact signatures (or “fingerprints”) to estimate document similarity.</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Locality-Sensitive Hashing (LSH)</a>: Rapidly finds groups of similar documents based on their MinHash signatures.</p></li>
</ul>
<p>This guide walks you through the concepts, prerequisites, setup, and best practices for using MINHASH_LSH in Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">Jaccard similarity</h3><p>Jaccard similarity measures the overlap between two sets A and B, formally defined as:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.09618em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Where its value ranges from 0 (completely disjoint) to 1 (identical).</p>
<p>However, computing Jaccard similarity exactly between all document pairs in large-scale datasets is computationally expensive—<strong>O(n²)</strong> in time and memory when <strong>n</strong> is large. This makes it infeasible for use cases such as LLM training corpus cleaning or web-scale document analysis.</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">MinHash signatures: Approximate Jaccard similarity</h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a> is a probabilistic technique that offers an efficient way to estimate Jaccard similarity. It works by transforming each set into a compact <strong>signature vector</strong>, preserving enough information to approximate set similarity efficiently.</p>
<p><strong>The core idea</strong>:</p>
<p>The more similar the two sets are, the more likely their MinHash signatures will match at the same positions. This property enables MinHash to approximate the Jaccard similarity between sets.</p>
<p>This property allows MinHash to <strong>approximate the Jaccard similarity</strong> between sets without needing to compare the full sets directly.</p>
<p>The MinHash process involves:</p>
<ol>
<li><p><strong>Shingling</strong>: Convert documents into sets of overlapping token sequences (shingles)</p></li>
<li><p><strong>Hashing</strong>: Apply multiple independent hash functions to each shingle</p></li>
<li><p><strong>Min Selection</strong>: For each hash function, record the <strong>minimum</strong> hash value across all shingles</p></li>
</ol>
<p>You can see the entire process illustrated below:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" />
    <span>Minhash Workflow</span>
  </span>
</p>
<div class="alert note">
<p>The number of hash functions used determines the dimensionality of the MinHash signature. Higher dimensions provide better approximation accuracy, at the cost of increased storage and computation.</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">LSH for MinHash</h3><p>While MinHash signatures significantly reduce the cost of computing exact Jaccard similarity between documents, exhaustively comparing every pair of signature vectors is still inefficient at scale.</p>
<p>To solve this, <a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">LSH</a> is used. LSH enables fast approximate similarity search by ensuring that similar items are hashed into the same “bucket” with high probability — avoiding the need to compare every pair directly.</p>
<p>The process involves:</p>
<ol>
<li><p><strong>Signature segmentation:</strong></p>
<p>An <em>n</em>-dimensional MinHash signature is divided into <em>b</em> bands. Each band contains <em>r</em> consecutive hash values, so the total signature length satisfies: <em>n = b × r</em>.</p>
<p>For example, if you have a 128-dimensional MinHash signature (<em>n = 128</em>) and divide it into 32 bands (<em>b = 32</em>), then each band contains 4 hash values (<em>r = 4</em>).</p></li>
<li><p><strong>Band-level hashing:</strong></p>
<p>After segmentation, each band is independently processed using a standard hash function to assign it to a bucket. If two signatures produce the same hash value within a band—i.e., they fall into the same bucket—they are considered potential matches.</p></li>
<li><p><strong>Candidate selection:</strong></p>
<p>Pairs that collide in at least one band are selected as similarity candidates.</p></li>
</ol>
<div class="alert note">
<p>Why it works?</p>
<p>Mathematically, if two signatures have Jaccard similarity <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>s</mi></mrow><annotation encoding="application/x-tex">s</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span></span></span></span>,</p>
<ul>
<li><p>The probability they are identical in one row (hash position) is <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>s</mi></mrow><annotation encoding="application/x-tex">s</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span></span></span></span></p></li>
<li><p>The probability they match in all <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>r</mi></mrow><annotation encoding="application/x-tex">r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">r</span></span></span></span> rows of a band is <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>s</mi><mi>r</mi></msup></mrow><annotation encoding="application/x-tex">s^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span></span></span></span></p></li>
<li><p>The probability that they match in <strong>at least one band</strong> is:</p></li>
</ul>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mn>1</mn><mo>−</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><msup><mi>s</mi><mi>r</mi></msup><msup><mo stretchy="false">)</mo><mi>b</mi></msup></mrow><annotation encoding="application/x-tex">1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1491em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8991em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>For details, refer to <a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Locality-sensitive hashing</a>.</p>
</div>
<p>Consider three documents with 128-dimensional MinHash signatures:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" />
    <span>Lsh Workflow 1</span>
  </span>
</p>
<p>First, LSH divides the 128-dimensional signature into 32 bands of 4 consecutive values each:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" />
    <span>Lsh Workflow 2</span>
  </span>
</p>
<p>Then, each band is hashed into different buckets using a hash function. Document pairs sharing buckets are selected as similarity candidates. In the example below, Document A and Document B are selected as similarity candidates as their hash results collide in <strong>Band 0</strong>:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" />
    <span>Lsh Workflow 3</span>
  </span>
</p>
<div class="alert note">
<p>The number of bands is controlled by the <code translate="no">mh_lsh_band</code> parameter. For more information, refer to <a href="/docs/minhash-lsh.md#Index-building-params">Index building params</a>.</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures-in-Milvus" class="common-anchor-header">MHJACCARD: Comparing MinHash signatures in Milvus</h3><p>MinHash signatures approximate the Jaccard similarity between sets using fixed-length binary vectors. However, since these signatures do not preserve the original sets, standard metrics such as <code translate="no">JACCARD</code>, <code translate="no">L2</code>, or <code translate="no">COSINE</code> cannot be directly applied to compare them.</p>
<p>To address this, Milvus introduces a specialized metric type called <code translate="no">MHJACCARD</code>, designed specifically for comparing MinHash signatures.</p>
<p>When using MinHash in Milvus:</p>
<ul>
<li><p>The vector field must be of type <code translate="no">BINARY_VECTOR</code></p></li>
<li><p>The <code translate="no">index_type</code> must be <code translate="no">MINHASH_LSH</code> (or <code translate="no">BIN_FLAT</code>)</p></li>
<li><p>The <code translate="no">metric_type</code> must be set to <code translate="no">MHJACCARD</code></p></li>
</ul>
<p>Using other metrics will either be invalid or yield incorrect results.</p>
<p>For more information about this metric type, refer to <a href="/docs/metric.md#MHJACCARD">MHJACCARD</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Before using MinHash LSH in Milvus, you must first generate <strong>MinHash signatures</strong>. These compact binary signatures approximate Jaccard similarity between sets and are required for <code translate="no">MHJACCARD</code>-based search in Milvus.</p>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">Choose a method to generate MinHash signatures</h3><p>Depending on your workload, you can choose:</p>
<ul>
<li><p>Use Python’s <code translate="no">datasketch</code> for simplicity (recommended for prototyping)</p></li>
<li><p>Use distributed tools (e.g., Spark, Ray) for large-scale datasets</p></li>
<li><p>Implement custom logic (NumPy, C++, etc.) if performance tuning is critical</p></li>
</ul>
<p>In this guide, we use <code translate="no">datasketch</code> for simplicity and compatibility with Milvus input format.</p>
<h3 id="Install-required-libraries" class="common-anchor-header">Install required libraries</h3><p>Install the necessary packages for this example:</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">Generate MinHash signatures</h3><p>We’ll generate 256-dimensional MinHash signatures, with each hash value represented as a 64-bit integer. This aligns with the expected vector format for <code translate="no">MINHASH_LSH</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasketch <span class="hljs-keyword">import</span> MinHash
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

MINHASH_DIM = <span class="hljs-number">256</span>
HASH_BIT_WIDTH = <span class="hljs-number">64</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_minhash_signature</span>(<span class="hljs-params">text, num_perm=MINHASH_DIM</span>) -&gt; <span class="hljs-built_in">bytes</span>:
    m = MinHash(num_perm=num_perm)
    <span class="hljs-keyword">for</span> token <span class="hljs-keyword">in</span> text.lower().split():
        m.update(token.encode(<span class="hljs-string">&quot;utf8&quot;</span>))
    <span class="hljs-keyword">return</span> m.hashvalues.astype(<span class="hljs-string">&#x27;&gt;u8&#x27;</span>).tobytes()  <span class="hljs-comment"># Returns 2048 bytes</span>
<button class="copy-code-btn"></button></code></pre>
<p>Each signature is 256 × 64 bits = 2048 bytes. This byte string can be directly inserted into a Milvus <code translate="no">BINARY_VECTOR</code> field. For more information on binary vectors used in Milvus, refer to <a href="/docs/binary-vector.md">Binary Vector</a>.</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(Optional) Prepare raw token sets (for refined search)</h3><p>By default, Milvus uses only the MinHash signatures and LSH index to find approximate neighbors. This is fast but may return false positives or miss close matches.</p>
<p>If you want <strong>accurate Jaccard similarity</strong>, Milvus supports refined search that uses original token sets. To enable it:</p>
<ul>
<li><p>Store token sets as a separate <code translate="no">VARCHAR</code> field</p></li>
<li><p>Set <code translate="no">&quot;with_raw_data&quot;: True</code> when <a href="/docs/minhash-lsh.md#Build-index-parameters-and-create-collection">building index parameters</a></p></li>
<li><p>And enable <code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> when <a href="/docs/minhash-lsh.md#Perform-similarity-search">performing similarity search</a></p></li>
</ul>
<p><strong>Token set extraction example</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH-in-Milvus" class="common-anchor-header">Use MinHash LSH in Milvus<button data-href="#Use-MinHash-LSH-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Once your MinHash vectors and original token sets are ready, you can store, index, and search them using Milvus with <code translate="no">MINHASH_LSH</code>.</p>
<h3 id="Connect-to-Milvus" class="common-anchor-header">Connect to Milvus</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">Define collection schema</h3><p>Define a schema with:</p>
<ul>
<li><p>The primary key</p></li>
<li><p>A <code translate="no">BINARY_VECTOR</code> field for the MinHash signatures</p></li>
<li><p>A <code translate="no">VARCHAR</code> field for the original token set (if refined search is enabled)</p></li>
<li><p>Optionally, a <code translate="no">document</code> field for original text</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">Build index parameters and create collection</h3><p>Build a <code translate="no">MINHASH_LSH</code> index with Jaccard refinement enabled:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: HASH_BIT_WIDTH,  <span class="hljs-comment"># Must match signature bit width</span>
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">16</span>,                       <span class="hljs-comment"># Band count (128/16 = 8 hashes per band)</span>
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>                    <span class="hljs-comment"># Required for Jaccard refinement</span>
    }
)

client.create_collection(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema=schema, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>For more information on index building parameters, refer to <a href="/docs/minhash-lsh.md#Index-building-params">Index building params</a>.</p>
<h3 id="Insert-data" class="common-anchor-header">Insert data</h3><p>For each document, prepare:</p>
<ul>
<li><p>A binary MinHash signature</p></li>
<li><p>A serialized token set string</p></li>
<li><p>(Optionally) the original text</p></li>
</ul>
<pre><code translate="no" class="language-python">documents = [
    <span class="hljs-string">&quot;machine learning algorithms process data automatically&quot;</span>,
    <span class="hljs-string">&quot;deep learning uses neural networks to model patterns&quot;</span>
]

insert_data = []
<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    sig = generate_minhash_signature(doc)
    token_str = extract_token_set(doc)
    insert_data.append({
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;minhash_signature&quot;</span>: sig,
        <span class="hljs-string">&quot;token_set&quot;</span>: token_str,
        <span class="hljs-string">&quot;document&quot;</span>: doc
    })

client.insert(<span class="hljs-string">&quot;minhash_demo&quot;</span>, insert_data)
client.flush(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">Perform similarity search</h3><p>Milvus supports two modes of similarity search using MinHash LSH:</p>
<ul>
<li><p><strong>Approximate search</strong> — uses only MinHash signatures and LSH for fast but probabilistic results.</p></li>
<li><p><strong>Refined search</strong> — re-computes Jaccard similarity using original token sets for improved accuracy.</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 Prepare the query</h4><p>To perform a similarity search, generate a MinHash signature for the query document. This signature must match the same dimension and encoding format used during data insertion.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 Approximate search (LSH-only)</h4><p>This is fast and scalable but may miss close matches or include false positives:</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params={</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>, </span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {}</span>
<span class="highlighted-comment-line">}</span>

approx_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(approx_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 Refined search (recommended for accuracy):</h4><p>This enables accurate Jaccard comparison using the original token sets stored in Milvus. It’s slightly slower but recommended for quality-sensitive tasks:</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">5</span>                    <span class="hljs-comment"># Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

refined_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(refined_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">Index params<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>This section provides an overview of the parameters used for building an index and performing searches on the index.</p>
<h3 id="Index-building-params" class="common-anchor-header">Index building params</h3><p>The following table lists the parameters that can be configured in <code translate="no">params</code> when <a href="/docs/minhash-lsh.md#Build-index-parameters-and-create-collection">building an index</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>Bit width of each hash value in the MinHash signature. Must be divisible by 8.</p></td>
     <td><p>8, 16, 32, 64</p></td>
     <td><p>Use <code translate="no">32</code> for balanced performance and accuracy. Use <code translate="no">64</code> for higher precision with larger datasets. Use <code translate="no">16</code> to save memory with acceptable accuracy loss.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>Number of bands to divide the MinHash signature for LSH. Controls the recall-performance tradeoff.</p></td>
     <td><p>[1, <em>signature_length</em>]</p></td>
     <td><p>For 128-dim signatures: start with 32 bands (4 values/band). Increase to 64 for higher recall, decrease to 16 for better performance. Must divide signature length evenly.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>Whether to store LSH hash codes in anonymous memory (<code translate="no">true</code>) or use memory mapping (<code translate="no">false</code>).</p></td>
     <td><p>true, false</p></td>
     <td><p>Use <code translate="no">false</code> for large datasets (&gt;1M sets) to reduce memory usage. Use <code translate="no">true</code> for smaller datasets requiring maximum search speed.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Whether to store original MinHash signatures alongside LSH codes for refinement.</p></td>
     <td><p>true, false</p></td>
     <td><p>Use <code translate="no">true</code> when high precision is required and storage cost is acceptable. Use <code translate="no">false</code> to minimize storage overhead with slight accuracy reduction.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>False positive probability for Bloom filter used in LSH bucket optimization.</p></td>
     <td><p>[0.001, 0.1]</p></td>
     <td><p>Use <code translate="no">0.01</code> for balanced memory usage and accuracy. Lower values (<code translate="no">0.001</code>) reduce false positives but increase memory. Higher values (<code translate="no">0.05</code>) save memory but may reduce precision.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Index-specific search params</h3><p>The following table lists the parameters that can be configured in <code translate="no">search_params.params</code> when <a href="/docs/minhash-lsh.md#Perform-similarity-search">searching on the index</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>Whether to perform exact Jaccard similarity computation on candidate results for refinement.</p></td>
     <td><p>true, false</p></td>
     <td><p>Use <code translate="no">true</code> for applications requiring high precision (e.g., deduplication). Use <code translate="no">false</code> for faster approximate search when slight accuracy loss is acceptable.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Number of candidates to retrieve before Jaccard refinement. Only effective when <code translate="no">mh_search_with_jaccard</code> is <code translate="no">true</code>.</p></td>
     <td><p>[<em>top_k</em>, *top_k * 10*]</p></td>
     <td><p>Set to 2-5x the desired <em>top_k</em> for good recall-performance balance. Higher values improve recall but increase computation cost.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>Whether to enable batch optimization for multiple simultaneous queries.</p></td>
     <td><p>true, false</p></td>
     <td><p>Use <code translate="no">true</code> when searching with multiple queries simultaneously for better throughput. Use <code translate="no">false</code> for single-query scenarios to reduce memory overhead.</p></td>
   </tr>
</table>
