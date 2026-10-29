---
id: install-overview.md
summary: >-
  Choose Milvus Lite, Standalone, or Distributed based on your workload,
  availability requirements, and operating environment.
title: Overview of Milvus Deployment Options
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Overview of Milvus Deployment Options<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus supports local prototypes and large-scale vector search services. Choose among Milvus Lite, Milvus Standalone, and Milvus Distributed based on your data, read and write load, availability requirements, and operating environment.</p>
<h2 id="Milvus-Lite" class="common-anchor-header">Milvus Lite<button data-href="#Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> is a Python library that can be imported into your applications. As a lightweight version of Milvus, it is ideal for quick prototyping in Jupyter Notebooks or running on smart devices with limited resources. Milvus Lite supports the same APIs as other Milvus deployments. The client-side code interacting with Milvus Lite can also work with Milvus instances in other deployment modes.</p>
<p>For the local examples, use Python 3.10 or later and install the optional Lite dependency explicitly. On Windows, pip skips the <code translate="no">milvus-lite</code> extra, so the explicit package name is required:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Use <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> to open local storage. Milvus Lite 3.x creates a directory at this path; an existing Milvus Lite 2.x database file requires export and migration. See <a href="/docs/milvus_lite.md">Run Milvus Lite</a> for platform requirements and <a href="/docs/quickstart.md">Quickstart</a> for a complete insert-and-search example.</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvus Standalone<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone is a single-machine server deployment. All components of Milvus Standalone are packed into a single <a href="https://milvus.io/docs/install_standalone-docker.md">Docker image</a>, making deployment convenient. If you have a production workload but prefer not to use Kubernetes, running Milvus Standalone on a single machine with sufficient memory is a good option. By default, Milvus Standalone runs <strong>Woodpecker</strong> (embedded) as its message queue, so there’s no separate messaging service to operate.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Distributed<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed can be deployed on <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a> clusters. This deployment features a cloud-native architecture, where ingestion load and search queries are separately handled by isolated nodes, allowing redundancy for critical components. It offers the highest scalability and availability, as well as the flexibility in customizing the allocated resources in each component. Milvus Distributed is the top choice for enterprise users running large-scale vector search systems in production. By default, Milvus Distributed runs <strong>Woodpecker</strong> as its message queue, deployed as a dedicated service alongside Milvus.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">Choose the Right Deployment for Your Use Case<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>The selection of a deployment mode typically depends on the development stage of your application:</p>
<ul>
<li><p><strong>For Quick Prototyping</strong></p>
<p>Use Milvus Lite in a notebook to test embeddings, RAG chunking strategies, and retrieval behavior. Move to Milvus Standalone when you need a shared server or when the measured memory and query load exceed the local environment. The client API is similar, but check feature differences and migrate the stored data separately.</p></li>
<li><p><strong>Small-Scale Production Deployment</strong></p>
<p>Use Milvus Standalone when a single server can meet your workload and availability requirements, and you prefer to operate without Kubernetes. Estimate memory from vector dimensions, scalar fields, index settings, and replicas, then benchmark the expected query concurrency and write rate. A vector count alone does not establish capacity.</p></li>
<li><p><strong>Large-Scale Production Deployment</strong></p>
<p>As your business is rapidly growing and the data scale exceeds the capacity of a single server, it’s time to consider Milvus Distributed. You can keep using Milvus Standalone for dev or staging environment for its convenience, and operate the K8s cluster that runs Milvus Distributed. This can sustain you towards tens of billions of vectors, as well as providing flexibility on tailoring the node size for your particular workload, such as high-read, infrequent write or high-write, low read cases.</p></li>
<li><p><strong>Local Search on Edge Devices</strong></p>
<p>For searching through private or sensitive on edge devices, you can deploy Milvus Lite on the device without relying on a cloud-based service to do text or image search. This is suitable for cases such as proprietary document search, or on-device object detection.</p></li>
</ul>
<p>The choice of Milvus deployment mode depends on your project’s stage and scale. Milvus provides a flexible and powerful solution for various needs, from rapid prototyping to large-scale enterprise deployment.</p>
<ul>
<li><strong>Milvus Lite</strong> fits local evaluation and workloads within a single application’s resources.</li>
<li><strong>Milvus Standalone</strong> provides a shared service when one server meets your measured capacity and availability requirements.</li>
<li><strong>Milvus Distributed</strong> provides component-level scaling and redundancy when you need to grow beyond one server or isolate read and write resources.</li>
</ul>
<p>Milvus Standalone and Distributed use a message queue, object storage, and a metadata store. Milvus Lite runs locally without those separate services. For the server deployments’ default dependencies and external service options, see <a href="/docs/data-infra-integration-overview.md">Data Infrastructure</a>.</p>
<p>If you want a managed service instead of operating the server infrastructure, consider <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. For a hands-on deployment, continue with <a href="/docs/install_standalone-docker.md">Docker</a> or <a href="/docs/install_cluster-milvusoperator.md">Kubernetes</a>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" />
    <span>Select deployment option for your use case</span>
  </span>
</p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">Comparison on functionalities<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
    </button></h2><p>The Lite column describes Milvus Lite 3.2.2. Check <a href="/docs/milvus_lite.md#Supported-features-and-limits">Milvus Lite limits</a> before relying on a server feature in a local application.</p>
<table>
<thead>
<tr><th>Feature</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / client library</td><td>Python (local PyMilvus adapter)</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Data types</td><td>Dense Vector<br/>Sparse Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td></tr>
<tr><td>Search capabilities</td><td>Vector Search (ANN Search)<br/>Metadata Filtering<br/>Range Search<br/>Scalar Query<br/>Get Entities by Primary Key<br/>Hybrid Search</td><td>Vector Search (ANN Search)<br/>Metadata Filtering<br/>Range Search<br/>Scalar Query<br/>Get Entities by Primary Key<br/>Hybrid Search</td><td>Vector Search (ANN Search)<br/>Metadata Filtering<br/>Range Search<br/>Scalar Query<br/>Get Entities by Primary Key<br/>Hybrid Search</td></tr>
<tr><td>CRUD operations</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Advanced data management</td><td>Databases<br/>Partitions<br/>Aliases<br/>No access control</td><td>Access Control<br/>Partition<br/>Partition Key</td><td>Access Control<br/>Partition<br/>Partition Key<br/>Physical Resource Grouping</td></tr>
<tr><td>Consistency Levels</td><td>Not applicable: a single local process serves all requests; <code translate="no">consistency_level</code> is accepted but has no effect</td><td>Strong<br/>Bounded Staleness<br/>Session<br/>Eventual</td><td>Strong<br/>Bounded Staleness<br/>Session<br/>Eventual</td></tr>
<tr><td>Message queue</td><td>N/A</td><td>Woodpecker (embedded)</td><td>Woodpecker (service)</td></tr>
</tbody>
</table>
