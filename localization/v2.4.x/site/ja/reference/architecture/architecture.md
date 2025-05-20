---
id: architecture.md
title: Architecture
deprecate: true
---

<h1 id="Architecture" class="common-anchor-header">Architecture<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h1><p>As a cloud-native vector database, Milvus separates storage and computation by design. To enhance elasticity and flexibility, all components in Milvus are stateless.</p>
<ul>
<li><p><a href="/docs/ja/v2.4.x/architecture_overview.md">Milvus Architecture Overview</a>: Milvus adopts a shared-storage architecture featuring storage/computing disaggregation and scalability for its computing nodes.</p></li>
<li><p><a href="/docs/ja/v2.4.x/four_layers.md">Storage/Computing Disaggregation</a>: Milvus comprises four layers that are mutually independent in terms of scalability and disaster recovery.</p></li>
<li><p><a href="/docs/ja/v2.4.x/main_components.md">Main Components</a>: Milvus standalone includes three components while Milvus cluster includes eight microservice components and three third-party dependencies.</p></li>
<li><p><a href="/docs/ja/v2.4.x/data_processing.md">Data Processsing</a>: A detailed description of the implementation of data insertion, index building, and data query in Milvus.</p></li>
</ul>
