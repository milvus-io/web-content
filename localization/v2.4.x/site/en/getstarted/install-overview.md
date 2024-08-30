---
id: install-overview.md
summary: >-
  Milvus is a highly performant, scalable vector database. It supports use cases
  of a wide range of sizes, from demos running locally in Jupyter Notebooks to
  massive-scale Kubernetes clusters handling tens of billions of vectors.
  Currently, there are three Milvus deployment options_ Milvus Lite, Milvus
  Standalone, and Milvus Distributed.
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
    </button></h1><p>Milvus is a highly performant, scalable vector database. It supports use cases of a wide range of sizes, from demos running locally in Jupyter Notebooks to massive-scale Kubernetes clusters handling tens of billions of vectors. Currently, there are three Milvus deployment options: Milvus Lite, Milvus Standalone, and Milvus Distributed.</p>
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
<p>To integrate Milvus Lite into your applications, run <code translate="no">pip install pymilvus</code> to install it and use the <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> statement to instantiate a vector database with a local file that persists all your data. For more details, refer to <a href="https://milvus.io/docs/milvus_lite.md">Run Milvus Lite</a>.</p>
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
    </button></h2><p>Milvus Standalone is a single-machine server deployment. All components of Milvus Standalone are packed into a single <a href="https://milvus.io/docs/install_standalone-docker.md">Docker image</a>, making deployment convenient. If you have a production workload but prefer not to use Kubernetes, running Milvus Standalone on a single machine with sufficient memory is a good option. Additionally, Milvus Standalone supports high availability through master-slave replication.</p>
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
    </button></h2><p>Milvus Distributed can be deployed on <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a> clusters. This deployment features a cloud-native architecture, where ingestion load and search queries are separately handled by isolated nodes, allowing redundancy for critical components. It offers the highest scalability and availability, as well as the flexibility in customizing the allocated resources in each component. Milvus Distributed is the top choice for enterprise users running large-scale vector search systems in production.</p>
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
<p>If you would like to quickly build something as a prototype or for learning purposes, such as Retrieval Augmented Generation (RAG) demos, AI chatbots, multi-modality search, Milvus Lite itself or a combination of Milvus Lite and Milvus Standalone is suitable. You can use Milvus Lite in notebooks for rapid prototyping and explore various approaches such as different chunking strategies in RAG. You may want to deploy the application built with Milvus Lite in a small-scale production to serve real users, or validating the idea on larger datasets, say more than a few millions of vectors. Milvus Standalone is appropriate. The application logic for Milvus Lite can still be shared as all Milvus deployments have the same client side API. The data stored in Milvus Lite can also be ported to Milvus Standalone with a command line tool.</p></li>
<li><p><strong>Small-Scale Production Deployment</strong></p>
<p>For early-stage production, when the project is still seeking product-market fit and agility is more important than scalability, Milvus Standalone is the best choice. It can still scale up to 100M vectors given enough machine resource, while requiring much less DevOps than maintaining a K8s cluster.</p></li>
<li><p><strong>Large-Scale Production Deployment</strong></p>
<p>As your business is rapidly growing and the data scale exceeds the capacity of a single server, it’s time to consider Milvus Distributed. You can keep using Milvus Standalone for dev or staging environment for its convenience, and operate the K8s cluster that runs Milvus Distributed. This can sustain you towards tens of billions of vectors, as well as providing flexibility on tailoring the node size for your particular workload, such as high-read, infrequent write or high-write, low read cases.</p></li>
<li><p><strong>Local Search on Edge Devices</strong></p>
<p>For searching through private or sensitive on edge devices, you can deploy Milvus Lite on the device without relying on a cloud-based service to do text or image search. This is suitable for cases such as proprietary document search, or on-device object detection.</p></li>
</ul>
<p>The choice of Milvus deployment mode depends on your project’s stage and scale. Milvus provides a flexible and powerful solution for various needs, from rapid prototyping to large-scale enterprise deployment.</p>
<ul>
<li><strong>Milvus Lite</strong> is recommended for smaller datasets, up to a few million vectors.</li>
<li><strong>Milvus Standalone</strong> is suitable for medium-sized datasets, scaling up to 100 million vectors.</li>
<li><strong>Milvus Distributed</strong> is designed for large-scale deployments, capable of handling datasets from 100 million up to tens of billions of vectors.</li>
</ul>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" />
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
    </button></h2><table>
<thead>
<tr><th>Feature</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / Client Lirary</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Data types</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td></tr>
<tr><td>Search capabilities</td><td>Vector Search (ANN Search)<br/>Metadata Filtering<br/>Range Search<br/>Scalar Query<br/>Get Entities by Primary Key<br/>Hybrid Search</td><td>Vector Search (ANN Search)<br/>Metadata Filtering<br/>Range Search<br/>Scalar Query<br/>Get Entities by Primary Key<br/>Hybrid Search</td><td>Vector Search (ANN Search)<br/>Metadata Filtering<br/>Range Search<br/>Scalar Query<br/>Get Entities by Primary Key<br/>Hybrid Search</td></tr>
<tr><td>CRUD operations</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Advanced data management</td><td>N/A</td><td>Access Control<br/>Partition<br/>Partition Key</td><td>Access Control<br/>Partition<br/>Partition Key<br/>Physical Resource Grouping</td></tr>
<tr><td>Consistency Levels</td><td>Strong</td><td>Strong<br/>Bounded Staleness<br/>Session<br/>Eventual</td><td>Strong<br/>Bounded Staleness<br/>Session<br/>Eventual</td></tr>
</tbody>
</table>
