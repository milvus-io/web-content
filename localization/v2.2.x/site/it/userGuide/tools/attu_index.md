---
id: attu_index.md
related_key: attu
summary: 'Learn how to manage indexes with Attu, an intuitive GUI tool for Milvus.'
title: ''
---
<h1 id="Manage-Index-with-Attu" class="common-anchor-header">Manage Index with Attu<button data-href="#Manage-Index-with-Attu" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to manage an index with Attu.</p>
<h2 id="Create-indexes" class="common-anchor-header">Create indexes<button data-href="#Create-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>This example builds an IVF_FLAT index with Euclidean distance as the similarity metrics and an <code translate="no">nlist</code> value of <code translate="no">1024</code>.</p>
<ol>
<li><p>Click <strong>Schema</strong> on the <strong>Collection</strong> page. On the <strong>Schema</strong> tab page, click <strong>CREATE INDEX</strong> and the <strong>Create Index</strong> dialog box appears.</p></li>
<li><p>In the <strong>Create Index</strong> dialog box, select <strong>IVF_FLAT</strong> from the <strong>Index Type</strong> dropdown list, select <strong>L2</strong> from the <strong>Metric Type</strong> dropdown list, and enter <code translate="no">1024</code> in the <code translate="no">nlist</code> field.</p></li>
<li><p>(Optional) Turn on <strong>View Code</strong> and the <strong>Code View</strong> page appears. You can check the code in Python or Node.js as you want.</p></li>
<li><p>Click <strong>Create</strong> to create the index.</p></li>
</ol>
<p>If successful, the type of the index you created appears in the <strong>Index Type</strong> column for the vector field.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_index1.png" alt="Create Index" class="doc-image" id="create-index" />
    <span>Create Index</span>
  </span>
</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_index2.png" alt="Create Index" class="doc-image" id="create-index" />
    <span>Create Index</span>
  </span>
</p>
<h2 id="Delete-indexes" class="common-anchor-header">Delete indexes<button data-href="#Delete-indexes" class="anchor-icon" translate="no">
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
<li>Click the <strong>Trash</strong> icon in the <strong>Index Type</strong> column and the <strong>Delete Index</strong> dialog box appears.</li>
<li>Enter <code translate="no">delete</code> to confirm the deletion and click <strong>Delete</strong> to delete the indexes.</li>
</ol>
<p>If successful, <strong>CREATE INDEX</strong> button appears in the Index Type column.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_index3.png" alt="Delete Index" class="doc-image" id="delete-index" />
    <span>Delete Index</span>
  </span>
</p>
