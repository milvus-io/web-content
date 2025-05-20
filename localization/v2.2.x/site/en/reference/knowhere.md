---
id: knowhere.md
summary: Learn about Knowhere in Milvus.
title: ''
---
<h1 id="Knowhere" class="common-anchor-header">Knowhere<button data-href="#Knowhere" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic introduces Knowhere, the core vector execution engine of Milvus.</p>
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
    </button></h2><p>Knowhere is the core vector execution engine of Milvus which incorporates several vector similarity search libraries including <a href="https://github.com/facebookresearch/faiss">Faiss</a>, <a href="https://github.com/nmslib/hnswlib">Hnswlib</a> and <a href="https://github.com/spotify/annoy">Annoy</a>. Knowhere is also designed to support heterogeneous computing. It controls on which hardware (CPU or GPU) to execute index building and search requests. This is how Knowhere gets its name - knowing where to execute the operations. More types of hardware including DPU and TPU will be supported in future releases.</p>
<h2 id="Knowhere-in-the-Milvus-architecture" class="common-anchor-header">Knowhere in the Milvus architecture<button data-href="#Knowhere-in-the-Milvus-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>The figure below illustrates the position of Knowhere in the Milvus architecture.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/knowhere_architecture.png" alt="Knowhere" class="doc-image" id="knowhere" />
    <span>Knowhere</span>
  </span>
</p>
<p>The bottom-most layer is the system hardware. The third-party index libraries are on top of the hardware. Then Knowhere interacts with the index node and query node on the top via CGO, which allows Go packages to call C code.</p>
<h2 id="Knowhere-advantages" class="common-anchor-header">Knowhere advantages<button data-href="#Knowhere-advantages" class="anchor-icon" translate="no">
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
    </button></h2><p>The following are the advantages of Knowhere over Faiss.</p>
<h4 id="Support-for-BitsetView" class="common-anchor-header">Support for BitsetView</h4><p>Milvus introduces a bitset mechanism to realize &quot;soft deletion&quot;. A soft-deleted vector still exists in the database but will not be computed during a vector similarity search or query.</p>
<p>Each bit in a bitset corresponds to an indexed vector. If a vector is marked as “1” in the bitset, it means this vector is soft-deleted and will not be involved during a vector search. The bitset parameter is applied to all the exposed Faiss index query APIs in Knowhere, including CPU and GPU indexes.</p>
<p>For more information about the bitset mechanism, check out <a href="/docs/v2.2.x/bitset.md">bitset</a>.</p>
<h4 id="Support-for-multiple-similarity-metrics-for-indexing-binary-vectors" class="common-anchor-header">Support for multiple similarity metrics for indexing binary vectors</h4><p>Knowhere supports <a href="/docs/v2.2.x/metric.md#Hamming-distance">Hamming</a>, <a href="/docs/v2.2.x/metric.md#Jaccard-distance">Jaccard</a>, <a href="/docs/v2.2.x/metric.md#Tanimoto-distance">Tanimoto</a>, <a href="/docs/v2.2.x/metric.md#Superstructure">Superstructure</a>, and <a href="/docs/v2.2.x/metric.md#Substructure">Substructure</a>. Jaccard and Tanimoto can be used to measure the similarity between two sample sets while Superstructure and Substructure can be used to measure the similarity of chemical structures.</p>
<h4 id="Support-for-AVX512-instruction-set" class="common-anchor-header">Support for AVX512 instruction set</h4><p>Apart from <a href="https://en.wikipedia.org/wiki/AArch64">AArch64</a>, <a href="https://en.wikipedia.org/wiki/SSE4#SSE4.2">SSE4.2</a> and <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions">AVX2</a>, the instruction sets already supported by Faiss, Knowhere also supports <a href="https://en.wikipedia.org/wiki/AVX-512">AVX512</a>, which can <a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">improve the performance of index building and query by 20% to 30%</a> compared to AVX2.</p>
<h4 id="Automatic-SIMD-instruction-selection" class="common-anchor-header">Automatic SIMD-instruction selection</h4><p>Knowhere supports automatically invoking the suitable SIMD instructions (e.g., SIMD SSE, AVX, AVX2, and AVX512) on any CPU processor (both on-premises and cloud platforms), so that users do not need to manually specify the SIMD flag (e.g., “-msse4”) during compilation.</p>
<p>Knowhere is built by refactoring the codebase of Faiss. Common functions (e.g., similarity computing) that rely on SIMD accelerations are factored out. Then for each function, four versions (i.e., SSE, AVX, AVX2, AVX512) are implemented and each put into a separate source file. Then the source files are further compiled individually with the corresponding SIMD flag. Therefore, at runtime, Knowhere can automatically choose the best-suited SIMD instructions based on the current CPU flags and then link the right function pointers using hooking.</p>
<h4 id="Other-performance-optimization" class="common-anchor-header">Other performance optimization</h4><p>Read <a href="https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf">Milvus: A Purpose-Built Vector Data Management System</a> for more about Knowhere’s performance optimization.</p>
<h2 id="Knowhere-code-structure" class="common-anchor-header">Knowhere code structure<button data-href="#Knowhere-code-structure" class="anchor-icon" translate="no">
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
    </button></h2><p>Computation in Milvus mainly involves vector and scalar operations. Knowhere only handles the operations on vector indexing.</p>
<p>An index is a data structure independent from the original vector data. Generally, indexing requires four steps: create an index, train data, insert data and build an index. In some AI applications, dataset training is separated from vector search. Data from datasets are first trained and then inserted into a vector database like Milvus for similarity search. For example, open datasets sift1M and sift1B differentiate data for training and data for testing.</p>
<p>However, in Knowhere, data for training and for searching are the same. Knowhere trains all the data in a <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Segments">segment</a> and then inserts all the trained data and builds an index for them.</p>
<h4 id="DataObj-base-class" class="common-anchor-header"><code translate="no">DataObj</code>: base class</h4><p><code translate="no">DataObj</code> is the base class of all data structures in Knowhere. <code translate="no">Size()</code> is the only virtual method in <code translate="no">DataObj</code>. The Index class inherits from <code translate="no">DataObj</code> with a field named &quot;size_&quot;. The Index class also has two virtual methods - <code translate="no">Serialize()</code> and <code translate="no">Load()</code>. The <code translate="no">VecIndex</code> class derived from <code translate="no">Index</code> is the virtual base class for all vector indexes. <code translate="no">VecIndex</code> provides methods including <code translate="no">Train()</code>, <code translate="no">Query()</code>, <code translate="no">GetStatistics()</code>, and <code translate="no">ClearStatistics()</code>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/Knowhere_base_classes.png" alt="base class" class="doc-image" id="base-class" />
    <span>base class</span>
  </span>
</p>
<p>Some other index types are listed on the right in the figure above.</p>
<ul>
<li><p>The Faiss index has two base classes: <code translate="no">FaissBaseIndex</code> for all indexes on float point vectors, and <code translate="no">FaissBaseBinaryIndex</code> for all indexes on binary vectors.</p></li>
<li><p><code translate="no">GPUIndex</code> is the base class for all Faiss GPU indexes.</p></li>
<li><p><code translate="no">OffsetBaseIndex</code> is the base class for all self-developed indexes. Given that only vector IDs are stored in an index file, the file size for 128-dimensional vectors can be reduced by 2 orders of magnitude.</p></li>
</ul>
<h4 id="IDMAP-brute-force-search" class="common-anchor-header"><code translate="no">IDMAP</code>: brute-force search</h4><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/IDMAP.png" alt="IDMAP" class="doc-image" id="idmap" />
    <span>IDMAP</span>
  </span>
</p>
<p>Technically speaking, <code translate="no">IDMAP</code> is not an index, but rather used for brute-force search. When vectors are inserted into the database, neither data training nor index building is required. Searches will be conducted directly on the inserted vector data.</p>
<p>However, for code consistency, <code translate="no">IDMAP</code> also inherits from the <code translate="no">VecIndex</code> class with all its virtual interfaces. The usage of <code translate="no">IDMAP</code> is the same as other indexes.</p>
<h4 id="IVF-indexes" class="common-anchor-header">IVF indexes</h4><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/IVF.png" alt="IVF" class="doc-image" id="ivf" />
    <span>IVF</span>
  </span>
</p>
<p>The IVF (inverted file) indexes are the most frequently used. The <code translate="no">IVF</code> class is derived from <code translate="no">VecIndex</code> and <code translate="no">FaissBaseIndex</code>, and further extends to <code translate="no">IVFSQ</code> and <code translate="no">IVFPQ</code>. <code translate="no">GPUIVF</code> is derived from <code translate="no">GPUIndex</code> and <code translate="no">IVF</code>. Then <code translate="no">GPUIVF</code> further extends to <code translate="no">GPUIVFSQ</code> and <code translate="no">GPUIVFPQ</code>.</p>
<p><code translate="no">IVFSQHybrid</code> is a self-developed hybrid index. Coarse quantizer is executed on GPU while search in the bucket on CPU. This type of index can reduce the occurrence of memory copy between CPU and GPU by leveraging the computing power of GPU. <code translate="no">IVFSQHybrid</code> has the same recall rate as <code translate="no">GPUIVFSQ</code> but comes with better performance.</p>
<p>The base class structure for binary indexes is relatively simpler. <code translate="no">BinaryIDMAP</code> and <code translate="no">BinaryIVF</code> are derived from <code translate="no">FaissBaseBinaryIndex</code> and <code translate="no">VecIndex</code>.</p>
<h4 id="Third-party-indexes" class="common-anchor-header">Third-party indexes</h4><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/third_party_index.png" alt="third-party indexes" class="doc-image" id="third-party-indexes" />
    <span>third-party indexes</span>
  </span>
</p>
<p>Currently, only two types of third-party indexes are supported apart from Faiss: tree-based index <code translate="no">Annoy</code>, and graph-based index <code translate="no">HNSW</code>. These two common and frequently used third-party indexes are both derived from <code translate="no">VecIndex</code>.</p>
<h2 id="Adding-indexes-to-Knowhere" class="common-anchor-header">Adding indexes to Knowhere<button data-href="#Adding-indexes-to-Knowhere" class="anchor-icon" translate="no">
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
    </button></h2><p>If you want to add new indexes to Knowhere, first you can refer to existing indexes:</p>
<ul>
<li><p>To add quantization-based indexes, refer to <code translate="no">IVF_FLAT</code>.</p></li>
<li><p>To add graph-based indexes, refer to <code translate="no">HNSW</code>.</p></li>
<li><p>To add tree-based indexes, refer to <code translate="no">Annoy</code>.</p></li>
</ul>
<p>After referring to the existing index, you can follow the steps below to add a new index to Knowhere.</p>
<ol>
<li><p>Add the name of the new index in <code translate="no">IndexEnum</code>. The data type is string.</p></li>
<li><p>Add data validation check on the new index in the file <code translate="no">ConfAdapter.cpp</code>. The validation check is mainly to validate the parameters for data training and query.</p></li>
<li><p>Create a new file for the new index. The base class of the new index should include <code translate="no">VecIndex</code>, and the necessary virtual interface of <code translate="no">VecIndex</code>.</p></li>
<li><p>Add the index building logic for new index in <code translate="no">VecIndexFactory::CreateVecIndex()</code>.</p></li>
<li><p>Add unit test under the <code translate="no">unittest</code> directory.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>After learning how Knowhere works in Milvus, you might also want to:</p>
<ul>
<li><p>Learn about <a href="/docs/v2.2.x/index.md">the various types of indexes Milvus supports</a>.</p></li>
<li><p>Learn about <a href="/docs/v2.2.x/bitset.md">the bitset mechanism</a>.</p></li>
<li><p>Understand <a href="/docs/v2.2.x/data_processing.md">how data are processed</a> in Milvus.</p></li>
</ul>
