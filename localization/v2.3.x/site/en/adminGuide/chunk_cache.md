---
id: chunk_cache.md
title: Configure Chunk Cache
summary: ''
---
<h1 id="Configure-Chunk-Cache" class="common-anchor-header">Configure Chunk Cache<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h1><p>The chunk cache mechanism enables Milvus to pre-load data into cache on the local hard disk of the query nodes before it is needed. This mechanism significantly improves vector retrieval performance by reducing the time it takes to load data from disk to memory.</p>
<h2 id="Background" class="common-anchor-header">Background<button data-href="#Background" class="anchor-icon" translate="no">
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
    </button></h2><p>Before conducting queries to retrieve vectors, Milvus needs to load the data from object storage to the memory cache on the local hard disk of the query nodes. This is a time-consuming process. Before all data is loaded, Milvus may respond to some vector retrieval requests with a delay.</p>
<p>To improve the query performance, Milvus provides a chunk cache mechanism to pre-load data from object storage into the cache on the local hard disk before it is needed. When a query request is received, the Segcore first checks if the data is in the cache, instead of the object storage. If the data is in the cache, Segcore can quickly retrieve it from the cache and return the result to the client.</p>
<h2 id="Configure-Chunk-Cache" class="common-anchor-header">Configure Chunk Cache<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h2><p>This guide provides instructions on how to configure the chunk cache mechanism for a Milvus instance. Configuration varies with the way you install the Milvus instance.</p>
<ul>
<li><p>For Milvus instances installed using Helm Charts</p>
<p>Add the configuration to the <code translate="no">values.yaml</code> file under the <code translate="no">config</code> section. For details, refer to <a href="/docs/v2.3.x/configure-helm.md">Configure Milvus with Helm Charts</a>.</p></li>
<li><p>For Milvus instances installed using Docker Compose</p>
<p>Add the configuration to the <code translate="no">milvus.yaml</code> file you have used to start the Milvus instance. For details, refer to <a href="/docs/v2.3.x/configure-docker.md">Configure Milvus with Docker Compose</a>.</p></li>
<li><p>For Milvus instances installed using Operator</p>
<p>Add the configuration to the <code translate="no">spec.components</code> section of the <code translate="no">Milvus</code> custom resource. For details, refer to <a href="/docs/v2.3.x/configure_operator.md">Configure Milvus with Operator</a>.</p></li>
</ul>
<h3 id="Configuration-options" class="common-anchor-header">Configuration options</h3><pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode</span>:
    <span class="hljs-attr">cache</span>:
        <span class="hljs-attr">warmup</span>: <span class="hljs-keyword">async</span>
<button class="copy-code-btn"></button></code></pre>
<p>The <code translate="no">warmup</code> parameter determines whether Milvus pre-loads data from the object storage into the cache on the local hard disk of the query nodes before it is needed. This parameter defaults to <code translate="no">async</code>. Possible options are as follows:</p>
<ul>
<li><code translate="no">async</code>: Milvus pre-loads data asynchronously in the background, which does not affect the time it takes to load a collection. However, users may experience a delay when retrieving vectors for a short period of time after the load process is complete.  This is the default option.</li>
<li><code translate="no">sync</code>: Milvus pre-loads data synchronously, which may affect the time it takes to load a collection. However, users can perform queries immediately after the load process is complete without any delay.</li>
<li><code translate="no">off</code>: Milvus does not pre-load data into the memory cache.</li>
</ul>
<p>Note that the chunk cache settings also apply when new data is inserted into collections or the collection indexes are rebuilt.</p>
<h3 id="FAQ" class="common-anchor-header">FAQ</h3><ul>
<li><p><strong>How can I determine whether the chunk cache mechanism is working correctly?</strong></p>
<p>You are advised to check the latency of a search or query request after loading a collection. If the latency is significantly higher than expected (e.g., several seconds), it may indicate that the chunk cache mechanism is still working.</p>
<p>If the query latency stays high for a long time. You can check the throughput of the object storage to ensure that the chunk cache is still working. In normal cases, the working chunk cache will generate high throughput on the object storage. Alternatively, you can simply try chunk cache in the <code translate="no">sync</code> mode.</p></li>
</ul>
