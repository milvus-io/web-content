---
id: limit_collection_counts.md
title: Set Limits on Collection Number
summary: ''
---
<h1 id="Limit-Collection-Counts" class="common-anchor-header">Limit Collection Counts<button data-href="#Limit-Collection-Counts" class="anchor-icon" translate="no">
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
    </button></h1><p>A Milvus instance allows up to 65,536 collections. However, too many collections may result in performance issues. Therefore, it is recommended to limit the number of collections created in a Milvus instance.</p>
<p>This guide provides instructions on how to set limits on the number of collections in a Milvus instance.</p>
<p>Configuration varies with the way you install the Milvus instance.</p>
<ul>
<li><p>For Milvus instances installed using Helm Charts</p>
<p>Add the configuration to the <code translate="no">values.yaml</code> file under the <code translate="no">config</code> section. For details, refer to <a href="/docs/v2.3.x/configure-helm.md">Configure Milvus with Helm Charts</a>.</p></li>
<li><p>For Milvus instances installed using Docker Compose</p>
<p>Add the configuration to the <code translate="no">milvus.yaml</code> file you have used to start the Milvus instance. For details, refer to <a href="/docs/v2.3.x/configure-docker.md">Configure Milvus with Docker Compose</a>.</p></li>
<li><p>For Milvus instances installed using Operator</p>
<p>Add the configuration to the <code translate="no">spec.components</code> section of the <code translate="no">Milvus</code> custom resource. For details, refer to <a href="/docs/v2.3.x/configure_operator.md">Configure Milvus with Operator</a>.</p></li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Configuration options<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml">rootCoord:
    maxGeneralCapacity: 1024
<button class="copy-code-btn"></button></code></pre>
<p>The <code translate="no">maxGeneralCapacity</code> parameter sets the maximum number of collections that the current Milvus instance can hold. The default value is <code translate="no">1024</code>.</p>
<h2 id="Calculating-the-number-of-collections" class="common-anchor-header">Calculating the number of collections<button data-href="#Calculating-the-number-of-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>In a collection, you can set up multiple shards and partitions. Shards are logical units used to distribute data write operations among multiple data nodes. Partitions are logical units used to improve data retrieval efficiency by loading only a subset of collection data. When calculating the number of collections in the current Milvus instance, you also need to count the shards and partitions.</p>
<p>For example, let’s assume you have already created <strong>100</strong> collections, with <strong>2</strong> shards and <strong>4</strong> partitions in <strong>60</strong> of them and with <strong>1</strong> shard and <strong>12</strong> partitions in the rest <strong>40</strong> collections. The current number of collections can be calculated as:</p>
<pre><code translate="no">60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
<button class="copy-code-btn"></button></code></pre>
<p>In the above example, you have already used <strong>960</strong> out of the default limits. Now if you want to create a new collection with <strong>4</strong> shards and <strong>20</strong> partitions, you will receive the following error prompt because the total number of collections exceeds the maximum capacity:</p>
<pre><code translate="no" class="language-shell">failed checking constraint: sum_collections(parition*shard) exceeding the <span class="hljs-built_in">max</span> general capacity:
<button class="copy-code-btn"></button></code></pre>
<p>To avoid this error, you can either reduce the number of shards or partitions in existing or new collections, delete some collections, or increase the <code translate="no">maxGeneralCapacity</code> value.</p>
