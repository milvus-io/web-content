---
id: attu_system.md
related_key: attu
summary: >-
  Learn how to monitor your Milvus system with Attu, an intuitive GUI tool for
  Milvus.
title: ''
---
<h1 id="Monitor-System-with-Attu" class="common-anchor-header">Monitor System with Attu<button data-href="#Monitor-System-with-Attu" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to monitor your Milvus system with Attu.</p>
<h2 id="System-view" class="common-anchor-header">System view<button data-href="#System-view" class="anchor-icon" translate="no">
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
    </button></h2><p>Click the <strong>System View</strong> icon on the left-side navigation pane to visit the System View page.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_system1.png" alt="System View" class="doc-image" id="system-view" />
    <span>System View</span>
  </span>
</p>
<p>The System View dashboard consists of the following tiles:</p>
<ul>
<li><strong>Topology</strong>: Shows the structure of your Milvus instance. Click Milvus node or a coordinator node and the corresponding information appears in the Info tile on the right.</li>
<li><strong>Info</strong>: Shows the system and configuration information of the selected node.</li>
</ul>
<h2 id="Node-list-view" class="common-anchor-header">Node list view<button data-href="#Node-list-view" class="anchor-icon" translate="no">
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
    </button></h2><p>All nodes managed by their parent coordinator node are listed in the table. You can sort the nodes by metrics including <strong>CPU Core Count</strong>, <strong>CPU Core Usage</strong>, <strong>Disk Usage</strong>, and <strong>Memory Usage</strong>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_system4.png" alt="Node List View" class="doc-image" id="node-list-view" />
    <span>Node List View</span>
  </span>
</p>
<p>Right to the table is a mini topology showing the selected node and its coordinator node. Under the mini topology is a tile showing relevant information.</p>
<p>Click the down arrow to collapse rows in the table.</p>
