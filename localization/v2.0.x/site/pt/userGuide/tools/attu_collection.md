---
id: attu_collection.md
related_key: attu
summary: 'Learn how to manage collections with Attu, an intuitive GUI tool for Milvus.'
title: ''
---
<h1 id="Manage-Collections-with-Attu" class="common-anchor-header">Manage Collections with Attu<button data-href="#Manage-Collections-with-Attu" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to manage collections with Attu.</p>
<h2 id="Create-a-collection" class="common-anchor-header">Create a collection<button data-href="#Create-a-collection" class="anchor-icon" translate="no">
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
<li>Click the <strong>Collection</strong> icon on the left-side navigation pane and then click <strong>Create Collection</strong>. The <strong>Create Collection</strong> dialog box appears as shown below.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/create_collection_dialog_box1.png" alt="Create Collection dialog box" class="doc-image" id="create-collection-dialog-box" />
    <span>Create Collection dialog box</span>
  </span>
</p>
<ol start="2">
<li>Enter the required information. This example creates a collection named <code translate="no">test</code> with a primary key field, a vector field, and a scalar field. You can add scalar fields as needed.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/create_collection_dialog_box2.png" alt="Create Collection dialog box" class="doc-image" id="create-collection-dialog-box" />
    <span>Create Collection dialog box</span>
  </span>
</p>
<ol start="3">
<li>Click <strong>Create</strong> to create a collection.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/create_collection_dialog_box3.png" alt="Create Collection dialog box" class="doc-image" id="create-collection-dialog-box" />
    <span>Create Collection dialog box</span>
  </span>
</p>
<h2 id="Delete-a-collection" class="common-anchor-header">Delete a collection<button data-href="#Delete-a-collection" class="anchor-icon" translate="no">
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
<li>Tick the collection you want to delete in the data grid.</li>
<li>Click the <strong>Trash</strong> icon and the <strong>Delete Collection</strong> dialog box appears as shown below.</li>
<li>Type <code translate="no">delete</code> to confirm the deletion.</li>
<li>Click <strong>Delete</strong> to delete the collection.</li>
</ol>
<div class="alert caution">
Deleting a collection is irreversible.
</div>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/delete_collection.png" alt="Delete Collection dialog box" class="doc-image" id="delete-collection-dialog-box" />
    <span>Delete Collection dialog box</span>
  </span>
</p>
<h2 id="Load-a-collection" class="common-anchor-header">Load a collection<button data-href="#Load-a-collection" class="anchor-icon" translate="no">
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
<li>Hover on the collection you want to load, the <strong>Load</strong> icon appears on the right end of the entry.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/load_collection1.png" alt="Load Collection" class="doc-image" id="load-collection" />
    <span>Load Collection</span>
  </span>
</p>
<ol start="2">
<li>Click the <strong>Load</strong> icon and the <strong>Load Collection</strong> dialog box appears.</li>
<li>Click <strong>Load</strong> in the <strong>Load Collection</strong> dialog box.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/load_collection2.png" alt="Load Collection" class="doc-image" id="load-collection" />
    <span>Load Collection</span>
  </span>
</p>
<ol start="4">
<li>Loading a collection might take a while. If successful, Loaded For Search appears in the Status column.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/load_collection3.png" alt="Load Collection" class="doc-image" id="load-collection" />
    <span>Load Collection</span>
  </span>
</p>
<h2 id="Release-a-collection" class="common-anchor-header">Release a collection<button data-href="#Release-a-collection" class="anchor-icon" translate="no">
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
<li>Hover on the loaded collection you want to release, the <strong>Release</strong> icon appears on the right end of the entry.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/release_collection1.png" alt="Release Collection" class="doc-image" id="release-collection" />
    <span>Release Collection</span>
  </span>
</p>
<ol start="2">
<li>Click the <strong>Release</strong> icon and the <strong>Release Collection</strong> dialog box appears.</li>
<li>Click <strong>Release</strong> in the <strong>Release Collection</strong> dialog box.</li>
<li>If successful, the Status becomes <strong>Unloaded</strong> in the <strong>Status</strong> column.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/release_collection2.png" alt="Release Collection" class="doc-image" id="release-collection" />
    <span>Release Collection</span>
  </span>
</p>
<h2 id="View-the-schema-of-a-collection" class="common-anchor-header">View the schema of a collection<button data-href="#View-the-schema-of-a-collection" class="anchor-icon" translate="no">
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
<li>Click the name of the collection that you want to view the schema of, and the corresponding detail page appears.</li>
<li>Click <strong>Schema</strong> on the detail page, which lists the information of all fields.</li>
</ol>
<p>Attributes of a schema include:</p>
<ul>
<li>Field Name</li>
<li>Field Type</li>
<li>Dimension (Only applies to vector fields)</li>
<li>Index Type (Only applies to vector fields)</li>
<li>Index Parameters (Only applies to vector fields)</li>
<li>Collection description</li>
</ul>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/collection_schema.png" alt="Collection Schema" class="doc-image" id="collection-schema" />
    <span>Collection Schema</span>
  </span>
</p>
