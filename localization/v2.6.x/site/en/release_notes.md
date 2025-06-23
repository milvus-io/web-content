---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---
<h1 id="Release-Notes" class="common-anchor-header">Release Notes<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.6.0 in this section. We suggest that you regularly visit this page to learn about updates.</p>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: June 18, 2025</p>
<table>
<thead>
<tr><th style="text-align:center">Milvus Version</th><th style="text-align:center">Python SDK Version</th><th style="text-align:center">Node.js SDK Version</th><th style="text-align:center">Java SDK Version</th><th style="text-align:center">Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 introduces a simplified, cloud-native architecture designed to improve operational efficiency, resource utilization, and total cost of ownership by reducing deployment complexity. This release adds new functionalities focused on performance, search, and development. Key features include high-precision 1-bit quantization (RaBitQ) and a dynamic cache layer for performance gains, near-duplicate detection with MinHash and precise phrase matching for advanced search, and automated embedding functions with online schema modification to enhance the developer’s experience.</p>
<div class="alert note">
<p>This is a pre-release version of Milvus 2.6.0. To try out the latest features, install this version as a fresh deployment. Upgrading from Milvus v2.5.x or earlier to 2.6.0-rc1 is not supported.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Architecture Changes</h3><p>Since 2.6, Milvus introduces significant architectural changes aimed at improving performance, scalability, and ease of use. For more information, refer to <a href="/docs/v2.6.x/architecture_overview.md">Milvus Architecture Overview</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Streaming Node (GA)</h4><p>In previous versions, streaming data was written to the WAL by the Proxy, and read by the QueryNode and DataNode. This architecture made it difficult to achieve consensus on the write side, requiring complex logic on the read side. Additionally, the query delegator was located in the QueryNode, which hindered scalability. Milvus 2.5.0 introduced the Streaming Node, which becomes GA in version 2.6.0. This component is now responsible for all shard-level WAL read/write operations and also serves as the query delegator, resolving the aforementioned issues and enabling new optimizations.</p>
<p><strong>Important Upgrade Notice</strong>: Streaming Node is a significant architectural change, so a direct upgrade to Milvus 2.6.0-rc1 from previous versions is not supported.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">Woodpecker Native WAL</h4><p>Milvus previously relied on external systems like Kafka or Pulsar for its WAL. While functional, these systems added significant operational complexity and resource overhead, particularly for small to medium-sized deployments. In Milvus 2.6, these are replaced by Woodpecker, a purpose-built, cloud-native WAL system. Woodpecker is designed for object storage, supporting both local and object storage based zero-disk modes, simplifying operations while improving performance and scalability.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">DataNode and IndexNode Merge</h4><p>In Milvus 2.6, tasks such as compaction, bulk import, statistics collection, and index building are now managed by a unified scheduler. The data persistence function previously handled by the DataNode has been moved to the Streaming Node. To simplify deployment and maintenance, the IndexNode and DataNode have been merged into a single DataNode component. This consolidated node now executes all these critical tasks, reducing operational complexity and optimizing resource utilization.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Coordinator Merge into MixCoord</h4><p>The previous design with separate RootCoord, QueryCoord, and DataCoord modules introduced complexity in inter-module communication. To simplify the system design, these components have been merged into a single, unified coordinator called MixCoord. This consolidation reduces the complexity of distributed programming by replacing network-based communication with internal function calls, resulting in more efficient system operation and simplified development and maintenance.</p>
<h3 id="Key-Features" class="common-anchor-header">Key Features</h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">RaBitQ 1-bit Quantization</h4><p>To handle large-scale datasets, 1-bit quantization is an effective technique for improving resource utilization and search performance. However, traditional methods can negatively impact recall. In collaboration with the original research authors, Milvus 2.6 introduces RaBitQ, a 1-bit quantization solution that maintains high recall accuracy while delivering the resource and performance benefits of 1-bit compression.</p>
<p>For more information, refer to <a href="/docs/v2.6.x/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">JSON Capability Enhancement</h4><p>Milvus 2.6 enhances its support for the JSON data type with the following improvements:</p>
<ul>
<li><strong>Performance</strong>: JSON Path Indexing is now officially supported, allowing the creation of inverted indexes on specific paths within JSON objects (e.g., <code translate="no">meta.user.location</code>). This avoids full object scans and improves the latency of queries with complex filters.</li>
<li><strong>Functionality</strong>: To support more complex filtering logic, this release adds support for <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code>, and <code translate="no">CAST</code> functions.
Looking ahead, our work on JSON support continues. We are excited to preview that upcoming official releases will feature even more powerful capabilities, such as <strong>JSON shredding</strong> and a <strong>JSON FLAT Index</strong>, designed to dramatically improve performance on highly nested JSON data.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Analyzer/Tokenizer Function Enhancement</h4><p>This release significantly enhances text processing capabilities with several updates to the Analyzer and Tokenizer:</p>
<ul>
<li>A new <a href="/docs/v2.6.x/analyzer-overview.md#Example-use">Run Analyzer</a> syntax is available to validate tokenizer configurations.</li>
<li>The <a href="/docs/v2.6.x/lindera-tokenizer.md">Lindera tokenizer</a> is integrated for improved support of Asian languages such as Japanese and Korean.</li>
<li>Row-level tokenizer selection is now supported, with the general-purpose <a href="/docs/v2.6.x/icu-tokenizer.md">ICU tokenizer</a> available as a fallback for multilingual scenarios.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Data-in, Data-Out with Embedding Functions</h4><p>Milvus 2.6 introduces a “Data-in, Data-Out” capability that simplifies AI application development by integrating directly with third-party embedding models (e.g., from OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Users can now insert and query using raw text data, and Milvus will automatically call the specified model service to convert the text into vectors in real-time. This removes the need for a separate vector conversion pipeline.</p>
<p>For more information, refer to <a href="/docs/v2.6.x/embedding-function-overview.md">Embedding Function Overview</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Phrase Match</h4><p>Phrase Match is a text search feature that returns results only when the exact sequence of words in a query appears consecutively and in the correct order within a document.</p>
<p><strong>Key Characteristics</strong>:</p>
<ul>
<li>Order-sensitive: The words must appear in the same order as in the query.</li>
<li>Consecutive match: The words must appear right next to each other, unless a slop value is used.</li>
<li>Slop (optional): A tunable parameter that allows for a small number of intervening words, enabling fuzzy phrase matching.</li>
</ul>
<p>For more information, refer to <a href="/docs/v2.6.x/phrase-match.md">Phrase Match</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">MinHash LSH Index (Beta)</h4><p>To address the need for data deduplication in model training, Milvus 2.6 adds support for MINHASH_LSH indexes. This feature provides a computationally efficient and scalable method for estimating Jaccard similarity between documents to identify near-duplicates. Users can generate MinHash signatures for their text documents during preprocessing and use the MINHASH_LSH index in Milvus to efficiently find similar content in large-scale datasets, improving data cleaning and model quality.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Time-Aware Decay Functions</h4><p>Milvus 2.6 introduces time-aware decay functions to address scenarios where information value changes over time. During result re-ranking, users can apply exponential, Gaussian, or linear decay functions based on a timestamp field to adjust a document’s relevance score. This ensures that more recent content can be prioritized, which is critical for applications like news feeds, e-commerce, and an AI agent’s memory.</p>
<p>For more information, refer to <a href="/docs/v2.6.x/decay-ranker-overview.md">Decay Ranker Overview</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Add Field for Online Schema Evolution</h4><p>To provide greater schema flexibility, Milvus 2.6 now supports adding a new scalar or vector field to an existing collection’s schema online. This avoids the need to create a new collection and perform a disruptive data migration when application requirements change.</p>
<p>For more information, refer to <a href="/docs/v2.6.x/add-fields-to-an-existing-collection.md">Add Fields to an Existing Collection</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">INT8 Vector Support</h4><p>In response to the growing use of quantized models that produce 8-bit integer embeddings, Milvus 2.6 adds native data type support for INT8 vectors. This allows users to ingest these vectors directly without de-quantization, saving computation, network bandwidth, and storage costs. This feature is initially supported for HNSW-family indexes.</p>
<p>For more information, refer to <a href="/docs/v2.6.x/dense-vector.md">Dense Vector</a>.</p>
