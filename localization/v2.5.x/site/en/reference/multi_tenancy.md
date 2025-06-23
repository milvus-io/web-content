---
id: multi_tenancy.md
title: Implement Multi-tenancy
summary: >-
  In Milvus, multi-tenancy means multiple customers or teams—referred to as
  tenants— share the same cluster while maintaining isolated data environments.
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">Implement Multi-tenancy<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus, multi-tenancy means multiple customers or teams—referred to as <strong>tenants</strong>— share the same cluster while maintaining isolated data environments.</p>
<p>Milvus supports four multi-tenancy strategies, each offering a different trade-off between scalability, data isolation, and flexibility. This guide walks you through each option, helping you choose the most suitable strategy for your use case.</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">Multi-tenancy strategies<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supports multi-tenancy at four levels: <strong>Database</strong>, <strong>Collection</strong>, <strong>Partition</strong>, and <strong>Partition Key</strong>.</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">Database-level multi-tenancy</h3><p>With database-level multi-tenancy, each tenant receives a corresponding <a href="/docs/manage_databases.md">database</a> containing one or more collections.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" />
    <span>Database Level Multi Tenancy</span>
  </span>
</p>
<ul>
<li><p><strong>Scalability</strong>: The database-level multi-tenancy strategy  supports a maximum of 64 tenants by default.</p></li>
<li><p><strong>Data isolation</strong>: The data in each database is fully separated, offering enterprise-grade data isolation ideal for regulated environments or customers with strict compliance needs.</p></li>
<li><p><strong>Flexibility</strong>: Each database can have collections with different schemas, offering highly flexible data organization and allowing each tenant to have its own data schema.</p></li>
<li><p><strong>Others</strong>: This strategy also supports RBAC, enabling fine-grained control over user access per tenant. Additionally, you can flexibly load or release data for specific tenants to manage hot and cold data effectively.</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">Collection-level multi-tenancy</h3><p>With collection-level multi-tenancy, each tenant is assigned a <a href="/docs/manage-collections.md">collection</a>, offering strong data isolation.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" />
    <span>Collection Level Multi Tenancy</span>
  </span>
</p>
<ul>
<li><p><strong>Scalability</strong>: Since a cluster can hold up to 65,536 collections by default, this strategy can accommodate the same number of tenants within the cluster.</p></li>
<li><p><strong>Data isolation</strong>: Collections are physically isolated from one another. This strategy provides strong data isolation.</p></li>
<li><p><strong>Flexibility</strong>: This strategy allows each collection to have its own schema, accommodating tenants with different data schemas.</p></li>
<li><p><strong>Others</strong>: This strategy also supports RBAC, allowing for granular access control over tenants. Additionally, you can flexibly load or release data for specific tenants to manage hot and cold data effectively.</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">Partition-level multi-tenancy</h3><p>In partition-level multi-tenancy, each tenant is assigned to a manually created <a href="/docs/manage-partitions.md">partition</a> within a shared collection.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" />
    <span>Partition Level Multi Tenancy</span>
  </span>
</p>
<ul>
<li><p><strong>Scalability</strong>: A collection can hold up to 1,024 partitions per collection, allowing for the same number of tenants within it.</p></li>
<li><p><strong>Data isolation</strong>: The data of each tenant is physically separated by partitions.</p></li>
<li><p><strong>Flexibility</strong>: This strategy requires all tenants to share the same data schema. And partitions need to be manually created.</p></li>
<li><p><strong>Others</strong>: RBAC is not supported on the partition level. Tenants can be queried either individually or across multiple partitions, which makes this approach well-suited for scenarios involving aggregated queries or analytics across tenant segments. Additionally, you can flexibly load or release data for specific tenants to manage hot and cold data effectively.</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">Partition key-level multi-tenancy</h3><p>With this strategy, all tenants share a single collection and schema, but each tenant’s data is automatically routed into 16 physically isolated partitions based on the <a href="/docs/use-partition-key.md">partition key</a> value. Although each physical partition can contain multiple tenants, the data from different tenants remains logically separated.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" />
    <span>Partition Key Level Multi Tenancy</span>
  </span>
</p>
<ul>
<li><p><strong>Scalability</strong>: The partition key-level strategy offers the most scalable approach, supporting millions of tenants.</p></li>
<li><p><strong>Data isolation</strong>: This strategy offers relatively weak data isolation because multiple tenants can share a physical partition.</p></li>
<li><p><strong>Flexibility</strong>: Since all tenants must share the same data schema, this strategy offers limited data flexibility.</p></li>
<li><p><strong>Others</strong>: RBAC is not supported on the partition-key level. Tenants can be queried either individually or across multiple partitions, which makes this approach well-suited for scenarios involving aggregated queries or analytics across tenant segments.</p></li>
</ul>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">Choosing the right multi-tenancy strategy<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>The table below offers a comprehensive comparison between the four levels of multi-tenancy strategies.</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>Database-level</strong></p></th>
     <th><p><strong>Collection-level</strong></p></th>
     <th><p><strong>Partition-level</strong></p></th>
     <th><p><strong>Partition key-level</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Data Isolation</strong></p></td>
     <td><p>Physical</p></td>
     <td><p>Physical</p></td>
     <td><p>Physical</p></td>
     <td><p>Physical + Logical</p></td>
   </tr>
   <tr>
     <td><p><strong>Max. number of tenants</strong></p></td>
     <td><p>By default, 64. You can increase it by modifying the <code translate="no">maxDatabaseNum</code> parameter in the Milvus.yaml configuration file. </p></td>
     <td><p>By default, 65,536. You can increase it by modifying the <code translate="no">maxCollectionNum</code> parameter in the Milvus.yaml configuration file.</p></td>
     <td><p>Up to 1,024 per collection. </p></td>
     <td><p>Millions</p></td>
   </tr>
   <tr>
     <td><p><strong>Data schema flexibility</strong></p></td>
     <td><p>High</p></td>
     <td><p>Medium</p></td>
     <td><p>Low</p></td>
     <td><p>Low</p></td>
   </tr>
   <tr>
     <td><p><strong>RBAC support</strong></p></td>
     <td><p>Yes</p></td>
     <td><p>Yes</p></td>
     <td><p>No</p></td>
     <td><p>No</p></td>
   </tr>
   <tr>
     <td><p><strong>Search performance</strong></p></td>
     <td><p>Strong</p></td>
     <td><p>Strong</p></td>
     <td><p>Medium</p></td>
     <td><p>Medium</p></td>
   </tr>
   <tr>
     <td><p><strong>Cross-tenant search support</strong></p></td>
     <td><p>No</p></td>
     <td><p>No</p></td>
     <td><p>Yes</p></td>
     <td><p>Yes</p></td>
   </tr>
   <tr>
     <td><p><strong>Support for effective handling of hot and cold data</strong></p></td>
     <td><p>Yes</p></td>
     <td><p>Yes</p></td>
     <td><p>Yes</p></td>
     <td><p>No Currently, not supported for the partition key-level strategy.</p></td>
   </tr>
</table>
<p>There are several factors to consider when you choose the multi-tenancy strategy in Milvus.</p>
<ol>
<li><p><strong>Scalability:</strong> Partition Key > Partition > Collection > Database</p>
<p>If you expect to support a very large number of tenants (millions or more), use the partition key-level strategy.</p></li>
<li><p><strong>Strong data isolation requirements</strong>: Database = Collection > Partition > Partition Key</p>
<p>Choose database, collection, or partition-level strategies if you have strict physical data isolation requirements.</p></li>
<li><p><strong>Flexible data schema for each tenant’s data:</strong> Database > Collection > Partition = Partition Key</p>
<p>Database-level and collection-level strategies provide full flexibility in data schemas. If your tenants’ data structures are different, choose database-level or collection-level multi-tenancy.</p></li>
<li><p><strong>Others</strong></p>
<ol>
<li><p><strong>Performance:</strong> Search performance is determined by various factors, including indexes, search parameters, and machine configurations. Milvus also support performance-tuning. It is recommended to test the actual performance before you select a multi-tenancy strategy.</p></li>
<li><p><strong>Effective handling of hot and cold data</strong>: Currently, the database-level, collection-level, and partition-level strategies all support hot and cold data handling.</p></li>
<li><p><strong>Cross-tenant searches</strong>: Only the partition-level and partition-key-level strategies support cross-tenant queries.</p></li>
</ol></li>
</ol>
