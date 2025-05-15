---
id: install-node.md
label: Install Node.js SDK
related_key: SDK
summary: Learn how to install the Node.js SDK of Milvus.
title: Install Milvus Nodejs SDK
---
<h1 id="Install-Milvus-Nodejs-SDK" class="common-anchor-header">Install Milvus Nodejs SDK<button data-href="#Install-Milvus-Nodejs-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to install Milvus Node.js SDK for Milvus.</p>
<h2 id="Compatibility" class="common-anchor-header">Compatibility<button data-href="#Compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>The following collection shows Milvus versions and recommended @zilliz/milvus2-sdk-node versions:</p>
<table>
<thead>
<tr><th style="text-align:center">Milvus version</th><th style="text-align:center">Recommended @zilliz/milvus2-sdk-node version</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.4.x</td><td style="text-align:center">2.4.x</td></tr>
<tr><td style="text-align:center">2.3.x</td><td style="text-align:center">2.3.x</td></tr>
<tr><td style="text-align:center">2.2.x</td><td style="text-align:center">2.2.x</td></tr>
<tr><td style="text-align:center">2.1.x</td><td style="text-align:center">2.1.x</td></tr>
<tr><td style="text-align:center">2.0.1</td><td style="text-align:center">2.0.0, 2.0.1</td></tr>
<tr><td style="text-align:center">2.0.0</td><td style="text-align:center">2.0.0</td></tr>
</tbody>
</table>
<h2 id="Requirement" class="common-anchor-header">Requirement<button data-href="#Requirement" class="anchor-icon" translate="no">
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
    </button></h2><p>Node.js v18+</p>
<h2 id="Installation" class="common-anchor-header">Installation<button data-href="#Installation" class="anchor-icon" translate="no">
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
    </button></h2><p>The recommended way to get started using the Milvus node.js client is by using npm (Node package manager) to install the dependency in your project.</p>
<pre><code translate="no" class="language-javascript">npm install @zilliz/milvus2-sdk-node
# or ...
yarn add @zilliz/milvus2-sdk-node
<button class="copy-code-btn"></button></code></pre>
<p>This will download the Milvus node.js sdk and add a dependency entry in your package.json file.</p>
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
    </button></h2><p>Having installed Milvus Node.js SDK, you can:</p>
<ul>
<li><p>View <a href="https://github.com/milvus-io/milvus-sdk-node">quick start of milvus node.js sdk</a></p></li>
<li><p>Learn the basic operations of Milvus:</p>
<ul>
<li><a href="/docs/v2.4.x/manage-collections.md">Manage Collections</a></li>
<li><a href="/docs/v2.4.x/manage-partitions.md">Manage Partitions</a></li>
<li><a href="/docs/v2.4.x/insert-update-delete.md">Insert, Upsert & Delete</a></li>
<li><a href="/docs/v2.4.x/single-vector-search.md">Single-Vector Search</a></li>
<li><a href="/docs/v2.4.x/multi-vector-search.md">Hybrid Search</a></li>
</ul></li>
<li><p>Explore <a href="/api-reference/node/v2.4.x/About.md">Milvus Node.js API reference</a></p></li>
</ul>
