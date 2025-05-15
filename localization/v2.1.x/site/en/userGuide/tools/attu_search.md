---
id: attu_search.md
related_key: attu
summary: >-
  Learn how to conduct a vector similarity search with Attu, an intuitive GUI
  tool for Milvus.
title: ''
---
<h1 id="Search-Data-with-Attu" class="common-anchor-header">Search Data with Attu<button data-href="#Search-Data-with-Attu" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to search data with Attu.</p>
<h2 id="Conduct-a-vector-similarity-search" class="common-anchor-header">Conduct a vector similarity search<button data-href="#Conduct-a-vector-similarity-search" class="anchor-icon" translate="no">
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
    </button></h2><p>On the basis of the regular vector similarity search, you can perform hybrid search of search with Time Travel.</p>
<h3 id="Load-the-collection-to-memory" class="common-anchor-header">Load the collection to memory</h3><p>All CRUD operations within Milvus are executed in memory. Load the collection to memory before conducting a vector similarity search. See <a href="/docs/v2.1.x/attu_collection.md#Load-a-collection">Load a collection</a> for more instruction.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/attu/insight_search1.png" alt="Search Data" class="doc-image" id="search-data" />
    <span>Search Data</span>
  </span>
</p>
<h3 id="Set-search-parameters" class="common-anchor-header">Set search parameters</h3><ol>
<li>Select the collection and the vector field you wish to search in in the dropdown lists of the <strong>Choose collection and field</strong> section.</li>
<li>In the <strong>Enter vector value</strong> field, enter a vector (or vectors) with the same dimensions of the selected field as the target vector(s) to search with.</li>
<li>In the <strong>Set search parameters</strong> section, specify the specific parameter(s) to the index and other search-related parameters.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/attu/insight_search2.png" alt="Search Data" class="doc-image" id="search-data" />
    <span>Search Data</span>
  </span>
</p>
<h3 id="Hybrid-search-with-advanced-filters-optional" class="common-anchor-header">Hybrid search with advanced filters (optional)</h3><p>Click <strong>Advanced Filter</strong> and the <strong>Advanced Filter</strong> dialog box appears. You can use the <strong>AND</strong> or <strong>OR</strong> operators to combine multiple conditions into a compound condition. The filter expression updates automatically with any changes to the conditions. See <a href="/docs/v2.1.x/boolean.md">boolean expression rule</a> for more information.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/attu/insight_search3.png" alt="Search Data" class="doc-image" id="search-data" />
    <span>Search Data</span>
  </span>
</p>
<h3 id="Search-with-Time-Travel-optional" class="common-anchor-header">Search with Time Travel (optional)</h3><p>Milvus maintains a timeline for all data insert and delete operations. It allows users to specify a timestamp in a search to retrieve a data view at a specified point in time.</p>
<ol>
<li>Click <strong>Time Travel</strong>, and select a time point in the dialog box that appears.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/attu/insight_search4.png" alt="Search Data" class="doc-image" id="search-data" />
    <span>Search Data</span>
  </span>
</p>
<ol start="2">
<li>Specify the number of search results to return in the <strong>TopK</strong> dropdown list.</li>
<li>Click <strong>Search</strong> to retrieve the nearest search results, which indicate the most similar vectors.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/attu/insight_search5.png" alt="Search Data" class="doc-image" id="search-data" />
    <span>Search Data</span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.1.x/assets/attu/insight_search6.png" alt="Search Data" class="doc-image" id="search-data" />
    <span>Search Data</span>
  </span>
</p>
