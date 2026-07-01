---
id: choose-an-embeddinglist-search-strategy.md
title: Choose an EmbeddingList Search Strategy
summary: >-
  EmbeddingList search strategies decide how Milvus builds an approximate
  candidate index for EmbeddingList search. The default strategy is tokenann.
  You can switch to muvera or lemur when the embedding list is large, TokenANN
  is too expensive, or a learned/compressed row-level representation is a better
  fit. The final result is still produced by MaxSim reranking when
  emb_list_rerank is enabled.
---
<h1 id="Choose-an-EmbeddingList-Search-Strategy" class="common-anchor-header">Choose an EmbeddingList Search Strategy<button data-href="#Choose-an-EmbeddingList-Search-Strategy" class="anchor-icon" translate="no">
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
    </button></h1><p>EmbeddingList search strategies decide how Milvus builds an approximate candidate index for EmbeddingList search. The default strategy is <code translate="no">tokenann</code>. You can switch to <code translate="no">muvera</code> or <code translate="no">lemur</code> when the embedding list is large, TokenANN is too expensive, or a learned/compressed row-level representation is a better fit. The final result is still produced by MaxSim reranking when <code translate="no">emb_list_rerank</code> is enabled.</p>
<h2 id="Why-Search-Strategies-Exist" class="common-anchor-header">Why Search Strategies Exist<button data-href="#Why-Search-Strategies-Exist" class="anchor-icon" translate="no">
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
    </button></h2><p>EmbeddingList is designed for rows that contain multiple vectors, such as token embeddings in a text document, patch embeddings in a visual document, or clip embeddings in a video. Instead of comparing one query vector with one row vector, MaxSim compares a query embedding list with a document embedding list and aggregates the best matches.</p>
<p>This gives better representation power, but exact MaxSim is expensive at scale. A brute-force MaxSim search would need to compare the query vectors with every vector in every candidate row. That is usually too slow for production search.</p>
<table>
<thead>
<tr><th>### Problem - Each row may contain many vectors. - Exact MaxSim over all rows is expensive. - Index size and search latency can grow quickly.</th><th>### Strategy - Use an approximate first-stage retrieval method. - Retrieve more candidates than the requested topK. - Rerank candidates with exact MaxSim.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<p>In this sense, <code translate="no">emb_list_strategy</code> is mainly an index-building and candidate-retrieval strategy. It is configured when building the index, and it determines how the first-stage ANN candidate set is produced. Search-time parameters such as <code translate="no">retrieval_ann_ratio</code> and <code translate="no">emb_list_rerank</code> then control how many candidates are retrieved and whether MaxSim reranking is applied.</p>
<hr>
<h2 id="Available-Strategies" class="common-anchor-header">Available Strategies<button data-href="#Available-Strategies" class="anchor-icon" translate="no">
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
<tr><th>Strategy</th><th>Candidate retrieval unit</th><th>What it solves</th><th>Best fit</th><th>Main tradeoff</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td>Individual vectors inside each row</td><td>Keeps the original vectors and avoids compression loss.</td><td>Quality-first search, short or medium embedding lists, high-discrimination embeddings.</td><td>Larger index and higher candidate retrieval cost.</td></tr>
<tr><td><code translate="no">muvera</code></td><td>One encoded vector per row</td><td>Compresses an embedding list into a fixed-dimensional FDE representation without training.</td><td>Longer documents, high-discrimination embeddings, cases where TokenANN is too heavy.</td><td>Random projection introduces approximation loss; FDE dimension affects latency.</td></tr>
<tr><td><code translate="no">lemur</code></td><td>One learned vector per row</td><td>Learns a corpus-specific compression from embedding lists to fixed-dimensional row vectors.</td><td>Low-discrimination embeddings, multimodal or visual-document retrieval, large embedding lists.</td><td>Requires training and can be sensitive to corpus distribution and document-length bias.</td></tr>
</tbody>
</table>
<h2 id="TokenANN" class="common-anchor-header">TokenANN<button data-href="#TokenANN" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">tokenann</code> indexes every vector in the embedding list. During search, each query vector performs ANN retrieval, matched vectors are aggregated back to their rows, and the resulting row candidates are reranked with MaxSim.</p>
<div class="alert note">
<p><strong>Use TokenANN when quality is the first priority.</strong> It is the closest approximation to the original MaxSim computation because it keeps all vectors available in the first-stage index.</p>
</div>
<ul>
<li><p><strong>Good fit:</strong> short text chunks, rows with a small or moderate number of vectors, strong token-level semantic separation, quality-sensitive baselines.</p></li>
<li><p><strong>Less suitable:</strong> very long documents, visual pages with thousands of patch vectors, strict memory or latency budgets.</p></li>
<li><p><strong>Element-level behavior:</strong> TokenANN can retrieve candidates from individual vectors before aggregating them back to rows. The final EmbeddingList search result is still row-level after MaxSim scoring.</p></li>
</ul>
<h2 id="MUVERA" class="common-anchor-header">MUVERA<button data-href="#MUVERA" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">muvera</code> encodes each embedding list into a fixed-dimensional vector using random projections. This turns first-stage retrieval into a standard row-level vector search. Candidates are then reranked with MaxSim.</p>
<div class="alert note">
<p><strong>Use MUVERA when TokenANN is too heavy but you do not want a training step.</strong> It is a practical middle ground between quality and cost.</p>
</div>
<ul>
<li><p><strong>Good fit:</strong> long text documents, high-discrimination embedding spaces, workloads that need lower index size than TokenANN.</p></li>
<li><p><strong>Less suitable:</strong> low-discrimination embedding spaces or cases where the FDE representation becomes too high-dimensional for the latency budget.</p></li>
<li><p><strong>Important parameters:</strong><code translate="no">muvera_num_projections</code>, <code translate="no">muvera_num_repeats</code>, and <code translate="no">muvera_seed</code>.</p></li>
</ul>
<h2 id="LEMUR" class="common-anchor-header">LEMUR<button data-href="#LEMUR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lemur</code> trains a model to compress each embedding list into a fixed-dimensional representation. First-stage ANN search runs on the learned row-level vectors, and candidates are reranked with MaxSim.</p>
<div class="alert note">
<p><strong>Use LEMUR when learned compression is worth the training cost.</strong> It can work well for low-discrimination embedding spaces and multimodal retrieval, but it should be validated against the target corpus because it can be sensitive to document length distribution.</p>
</div>
<ul>
<li><p><strong>Good fit:</strong> visual-document search, multimodal patch embeddings, low-discrimination embedding spaces, large embedding lists where TokenANN is not practical.</p></li>
<li><p><strong>Less suitable:</strong> frequently changing corpora, high-discrimination embeddings with highly skewed document lengths, workloads where training cost is unacceptable.</p></li>
<li><p><strong>Important parameters:</strong><code translate="no">lemur_hidden_dim</code>, <code translate="no">lemur_num_train_samples</code>, <code translate="no">lemur_num_epochs</code>, <code translate="no">lemur_batch_size</code>, <code translate="no">lemur_learning_rate</code>, <code translate="no">lemur_seed</code>, and <code translate="no">lemur_num_layers</code>.</p></li>
</ul>
<hr>
<h2 id="Default-Behavior-and-Configuration" class="common-anchor-header">Default Behavior and Configuration<button data-href="#Default-Behavior-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>The default EmbeddingList strategy in Knowhere is <code translate="no">tokenann</code>. If you do not specify <code translate="no">emb_list_strategy</code>, Knowhere uses TokenANN. Search-time defaults include <code translate="no">retrieval_ann_ratio=3.0</code> and <code translate="no">emb_list_rerank=true</code>.</p>
<h2 id="Configuration-Items-by-Strategy" class="common-anchor-header">Configuration Items by Strategy<button data-href="#Configuration-Items-by-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>The following table lists the strategy-specific configuration items. In Milvus, build-time items are usually passed in the <code translate="no">params</code> map when creating an index. If you need server-side defaults, they should be defined in the Milvus configuration file under the <code translate="no">knowhere</code> section.</p>
<table>
<thead>
<tr><th>Strategy</th><th>Configuration item</th><th>Stage</th><th>Default</th><th>When to change it</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td><code translate="no">emb_list_strategy=&quot;tokenann&quot;</code></td><td>Index build</td><td><code translate="no">tokenann</code></td><td>Use explicitly when you want the default element-vector indexing behavior or when DiskANN is used.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">emb_list_strategy=&quot;muvera&quot;</code></td><td>Index build</td><td><code translate="no">tokenann</code></td><td>Use when you want row-level encoded retrieval without training.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_projections</code></td><td>Index build</td><td><code translate="no">4</code></td><td>Controls SimHash projection count. Higher values create more buckets and may improve encoding quality, but increase encoded dimensionality.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_repeats</code></td><td>Index build</td><td><code translate="no">7</code></td><td>Controls how many independent FDE encodings are concatenated. Higher values may improve robustness but increase index/search cost.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_seed</code></td><td>Index build</td><td><code translate="no">42</code></td><td>Set for reproducible random projections, especially in tests and benchmark comparisons.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">emb_list_strategy=&quot;lemur&quot;</code></td><td>Index build</td><td><code translate="no">tokenann</code></td><td>Use when learned row-level compression is expected to work better than fixed random projection.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_hidden_dim</code></td><td>Index build</td><td><code translate="no">256</code></td><td>Controls the compressed representation size. Increase for more capacity; decrease for lower memory and faster retrieval.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_train_samples</code></td><td>Index build</td><td><code translate="no">20000</code></td><td>Increase when the corpus is diverse and the learned compression underfits; reduce only for small tests or faster builds.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_epochs</code></td><td>Index build</td><td><code translate="no">50</code></td><td>Increase if training has not converged; reduce when build time is the primary constraint.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_batch_size</code></td><td>Index build</td><td><code translate="no">512</code></td><td>Tune for training throughput and memory usage.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_learning_rate</code></td><td>Index build</td><td><code translate="no">0.001</code></td><td>Adjust when training is unstable or converges too slowly.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_seed</code></td><td>Index build</td><td><code translate="no">42</code></td><td>Set for reproducible training runs.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_layers</code></td><td>Index build</td><td><code translate="no">2</code></td><td>Increase only when the corpus needs a more expressive feature extractor and you can afford extra training cost.</td></tr>
<tr><td>All strategies</td><td><code translate="no">retrieval_ann_ratio</code></td><td>Search</td><td><code translate="no">3.0</code></td><td>Increase to retrieve more first-stage candidates and improve recall; decrease to reduce latency.</td></tr>
<tr><td>All strategies</td><td><code translate="no">emb_list_rerank</code></td><td>Search</td><td><code translate="no">true</code></td><td>Keep enabled for MaxSim reranking. Disable only for controlled experiments where first-stage ANN quality is being measured directly.</td></tr>
</tbody>
</table>
<h2 id="Configure-the-Strategy-in-Milvus" class="common-anchor-header">Configure the Strategy in Milvus<button data-href="#Configure-the-Strategy-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus, the strategy is passed as an index parameter when creating an index on an EmbeddingList field, such as a StructArray vector sub-field.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
        <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;muvera&quot;</span>,
        <span class="hljs-string">&quot;muvera_num_projections&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;muvera_num_repeats&quot;</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">&quot;muvera_seed&quot;</span>: <span class="hljs-number">42</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>For LEMUR, provide the LEMUR training parameters in the same <code translate="no">params</code> map.</p>
<pre><code translate="no" class="language-python">params={
    <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
    <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
    <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;lemur&quot;</span>,
    <span class="hljs-string">&quot;lemur_hidden_dim&quot;</span>: <span class="hljs-number">256</span>,
    <span class="hljs-string">&quot;lemur_num_train_samples&quot;</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-string">&quot;lemur_num_epochs&quot;</span>: <span class="hljs-number">50</span>,
    <span class="hljs-string">&quot;lemur_batch_size&quot;</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&quot;lemur_learning_rate&quot;</span>: <span class="hljs-number">0.001</span>,
    <span class="hljs-string">&quot;lemur_seed&quot;</span>: <span class="hljs-number">42</span>,
    <span class="hljs-string">&quot;lemur_num_layers&quot;</span>: <span class="hljs-number">2</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Server-side-Defaults-in-Milvus" class="common-anchor-header">Configure Server-side Defaults in Milvus<button data-href="#Configure-Server-side-Defaults-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus can also populate index parameters from <code translate="no">milvus.yaml</code>. The relevant section is <code translate="no">knowhere</code>. Parameters are organized by index type and stage, using the pattern <code translate="no">knowhere.&lt;INDEX_TYPE&gt;.&lt;stage&gt;.&lt;parameter&gt;</code>. User-provided index parameters take precedence over these defaults.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">HNSW:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">emb_list_strategy:</span> <span class="hljs-string">muvera</span>
      <span class="hljs-attr">muvera_num_projections:</span> <span class="hljs-number">4</span>
      <span class="hljs-attr">muvera_num_repeats:</span> <span class="hljs-number">7</span>
      <span class="hljs-attr">muvera_seed:</span> <span class="hljs-number">42</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">retrieval_ann_ratio:</span> <span class="hljs-number">3.0</span>
      <span class="hljs-attr">emb_list_rerank:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Prefer per-index params for strategy selection.</strong> A Milvus config-file default applies broadly to indexes of that type and stage. Use <code translate="no">create_index</code> parameters when different collections or fields need different EmbeddingList strategies.</p>
</div>
<h2 id="Configure-Candidate-Retrieval-at-Search-Time" class="common-anchor-header">Configure Candidate Retrieval at Search Time<button data-href="#Configure-Candidate-Retrieval-at-Search-Time" class="anchor-icon" translate="no">
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
    </button></h2><p>The strategy decides how the index is built. At search time, use <code translate="no">retrieval_ann_ratio</code> to control how many first-stage candidates are retrieved before MaxSim reranking. Higher values usually improve recall but increase latency.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">64</span>,
            <span class="hljs-string">&quot;retrieval_ann_ratio&quot;</span>: <span class="hljs-number">3.0</span>,
            <span class="hljs-string">&quot;emb_list_rerank&quot;</span>: <span class="hljs-literal">True</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parameter</th><th>Stage</th><th>Default</th><th>Meaning</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">emb_list_strategy</code></td><td>Index build</td><td><code translate="no">tokenann</code></td><td>Selects how EmbeddingList candidates are indexed and retrieved.</td></tr>
<tr><td><code translate="no">retrieval_ann_ratio</code></td><td>Search</td><td><code translate="no">3.0</code></td><td>Candidate expansion factor for the first ANN round.</td></tr>
<tr><td><code translate="no">emb_list_rerank</code></td><td>Search</td><td><code translate="no">true</code></td><td>Whether to rerank retrieved candidates with MaxSim.</td></tr>
</tbody>
</table>
<div class="alert note">
<p><strong>Compatibility notes:</strong> MUVERA and LEMUR currently support fp32 data in Knowhere. DiskANN supports EmbeddingList only with the TokenANN strategy. If you use non-fp32 vector types or DiskANN, verify strategy support before changing the default.</p>
</div>
<hr>
<h2 id="How-to-Choose-a-Strategy" class="common-anchor-header">How to Choose a Strategy<button data-href="#How-to-Choose-a-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>There is no universally best strategy. Choose based on embedding-list length, embedding-space discrimination, latency budget, index size, and whether you can afford a training step.</p>
<table>
<thead>
<tr><th>Question</th><th>Signal</th><th>Recommended starting point</th></tr>
</thead>
<tbody>
<tr><td>Do you need a high-quality baseline?</td><td>You want to measure the best practical approximation before optimizing cost.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>Are rows short or moderate in vector count?</td><td>Each row has a small number of token, patch, or clip vectors.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>Is TokenANN too large or too slow?</td><td>Index size or first-stage retrieval latency is the bottleneck.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>Do you want compression without training?</td><td>You need a simpler operational model and reproducible encoding.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>Is the embedding space low-discrimination?</td><td>Token-level ANN candidates are noisy, and random projection does not preserve enough signal.</td><td><code translate="no">lemur</code></td></tr>
<tr><td>Is the workload visual or multimodal?</td><td>Rows contain many patch vectors, and TokenANN is too expensive.</td><td><code translate="no">lemur</code> or <code translate="no">muvera</code></td></tr>
<tr><td>Is document length highly skewed?</td><td>Some rows contain far more vectors than others.</td><td>Start with <code translate="no">muvera</code>; validate <code translate="no">lemur</code> carefully.</td></tr>
</tbody>
</table>
<h2 id="Suggested-Evaluation-Workflow" class="common-anchor-header">Suggested Evaluation Workflow<button data-href="#Suggested-Evaluation-Workflow" class="anchor-icon" translate="no">
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
<li><p>Start with <code translate="no">tokenann</code> as a quality baseline when the dataset size allows it.</p></li>
<li><p>Run the same queries with <code translate="no">muvera</code> and compare recall, nDCG, latency, and index size.</p></li>
<li><p>Try <code translate="no">lemur</code> when the embedding list is large, the embedding space is noisy, or the workload is visual or multimodal.</p></li>
<li><p>Tune <code translate="no">retrieval_ann_ratio</code> before changing too many build-time parameters. Increase it if recall is low; reduce it if latency is too high.</p></li>
<li><p>Always validate on representative queries and document-length distributions. A strategy that works on short text may not work on visual documents or long-tail corpora.</p></li>
</ol>
<table>
<thead>
<tr><th>### Quality-first Start with <code translate="no">tokenann</code>. Use it as the baseline for MaxSim approximation quality.</th><th>### Balanced Try <code translate="no">muvera</code> when you need lower cost without adding a training pipeline.</th><th>### Compressed Try <code translate="no">lemur</code> when learned row-level compression is likely to outperform fixed random projection.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<hr>
<h2 id="References-Used-for-This-Draft" class="common-anchor-header">References Used for This Draft<button data-href="#References-Used-for-This-Draft" class="anchor-icon" translate="no">
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
<li><p>Milvus tests for <code translate="no">emb_list_strategy</code>, <code translate="no">retrieval_ann_ratio</code>, and <code translate="no">emb_list_rerank</code>.</p></li>
<li><p>Milvus config-file handling for server-side index defaults under the <code translate="no">knowhere</code> section.</p></li>
<li><p>Knowhere parameter definitions for default values and supported strategy names.</p></li>
<li><p>Knowhere compatibility checks for fp32-only MUVERA/LEMUR and DiskANN TokenANN-only support.</p></li>
<li><p>Internal evaluation notes comparing TokenANN, MUVERA, and LEMUR for MaxSim candidate retrieval.</p></li>
</ul>
<div class="alert note">
<p><strong>Publishing note:</strong> Before publishing externally, verify which parameters are officially supported in the target Milvus release and whether the product wants to expose all low-level Knowhere parameters or only a smaller documented subset.</p>
</div>
