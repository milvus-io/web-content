---
id: main_components.md
summary: Learn about the main components in Milvus standalone and cluster.
title: Main Components
---
<h1 id="Main-Components" class="common-anchor-header">Main Components<button data-href="#Main-Components" class="anchor-icon" translate="no">
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
    </button></h1><p>There are two modes for running Milvus: Standalone and Cluster. These two modes share the same features. You can choose a mode that best fits your dataset size, traffic data, and more. For now, Milvus standalone cannot be upgraded “online” to Milvus cluster.</p>
<h2 id="Milvus-standalone" class="common-anchor-header">Milvus standalone<button data-href="#Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus standalone includes three components:</p>
<ul>
<li><p><strong>Milvus:</strong> The core functional component.</p></li>
<li><p><strong>Meta Store:</strong> The metadata engine, which accesses and stores metadata of Milvus’ internal components, including proxies, index nodes, and more.</p></li>
<li><p><strong>Object Storage:</strong> The storage engine, which is responsible for data persistence for Milvus.</p></li>
</ul>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/standalone_architecture.jpg" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
    <span>Standalone_architecture</span>
  </span>
</p>
<h2 id="Milvus-cluster" class="common-anchor-header">Milvus cluster<button data-href="#Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvus cluster</strong> includes seven microservice components and three third-party dependencies. All microservices can be deployed on Kubernetes, independently from each other.</p>
<h3 id="Microservice-components" class="common-anchor-header">Microservice components</h3><ul>
<li>Root coord</li>
<li>Proxy</li>
<li>Query coord</li>
<li>Query node</li>
<li>Data coord</li>
<li>Index node</li>
<li>Data node</li>
</ul>
<h3 id="Third-party-dependencies" class="common-anchor-header">Third-party dependencies</h3><ul>
<li><strong>Meta Store:</strong> Stores metadata for various components in the cluster, e.g. etcd.</li>
<li><strong>Object Storage:</strong>  Responsible for data persistence of large files in the cluster, such as index and binary log files, e.g. S3</li>
<li><strong>Log Broker:</strong> Manages logs of recent mutation operations, outputs streaming log, and provides log publish-subscribe services, e.g. Pulsar.</li>
</ul>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/distributed_architecture.jpg" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
    <span>Distributed_architecture</span>
  </span>
</p>
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
    </button></h2><ul>
<li>Read <a href="/docs/v2.4.x/four_layers.md">Computing/Storage Disaggregation</a> to understand the mechanism and design principle of Milvus.</li>
</ul>
