---
id: mmap.md
summary: MMap enables more data in a single node.
title: MMap-enabled Data Storage
---
<h1 id="MMap-enabled-Data-Storage" class="common-anchor-header">MMap-enabled Data Storage<button data-href="#MMap-enabled-Data-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus, memory-mapped files allow for direct mapping of file contents into memory. This feature enhances memory efficiency, particularly in situations where available memory is scarce but complete data loading is infeasible. This optimization mechanism can increase data capacity while ensuring performance up to a certain limit; however, when the amount of data exceeds memory by too much, search and query performance may suffer serious degradation, so please choose to turn this feature on or off as appropriate.</p>
<h2 id="Configure-memory-mapping" class="common-anchor-header">Configure memory mapping<button data-href="#Configure-memory-mapping" class="anchor-icon" translate="no">
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
    </button></h2><p>Starting with Milvus 2.4, you have the flexibility to adjust the static configuration file to configure default memory mapping settings for the entire cluster before deployment. Additionally, there’s the option for you to dynamically alter parameters to fine-tune memory mapping settings at both the cluster and index levels. Looking ahead, future updates will extend memory mapping capabilities to include field-level configurations.</p>
<h3 id="Before-cluster-deployment-global-configuration" class="common-anchor-header">Before cluster deployment: global configuration</h3><p>Before you deploy a cluster, <strong>cluster-level</strong> settings apply memory mapping across your entire cluster. This ensures all new objects will automatically adhere to these configurations. It’s important to note that modifying these settings requires a restart of the cluster to become effective.</p>
<p>To adjust your cluster’s memory mapping settings, edit the <code translate="no">configs/milvus.yaml</code> file. Within this file, you can specify whether to enable memory mapping by default and determine the directory path for storing memory-mapped files. If the path (<code translate="no">mmapDirPath</code>) is left unspecified, the system defaults to storing memory-mapped files in <code translate="no">{localStorage.path}/mmap</code>. For more information, refer to <a href="https://milvus.io/docs/configure_localstorage.md#localStoragepath">Local Storage-related Configurations</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    <span class="hljs-comment"># Set memory mapping property for whole cluster</span>
    mmapEnabled: false | true
    <span class="hljs-comment"># Set memory-mapped directory path, if you leave mmapDirPath unspecified, the memory-mapped files will be stored in {localStorage.path}/ mmap by default. </span>
    mmapDirPath: <span class="hljs-built_in">any</span>/valid/path 
....
<button class="copy-code-btn"></button></code></pre>
<p>After <code translate="no">2.4.10</code>, the configuration <code translate="no">queryNode.mmap.mmapEnabled</code> splits into below four seperate fields, and all defaults are <code translate="no">false</code>:</p>
<ul>
<li><code translate="no">queryNode.mmap.vectorField</code>, controls whether vector data is mmap;</li>
<li><code translate="no">queryNode.mmap.vectorIndex</code>, controls whether vector index is mmap;</li>
<li><code translate="no">queryNode.mmap.scalarField</code>, controls whether scalar data is mmap;</li>
<li><code translate="no">queryNode.mmap.scalarIndex</code>, controls whether scalar index is mmap;</li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    vectorField: false <span class="hljs-comment"># Enable mmap for loading vector data</span>
    vectorIndex: false <span class="hljs-comment"># Enable mmap for loading vector index</span>
    scalarField: false <span class="hljs-comment"># Enable mmap for loading scalar data</span>
    scalarIndex: false <span class="hljs-comment"># Enable mmap for loading scalar index</span>
....
<button class="copy-code-btn"></button></code></pre>
<p>In addition, only vector index and vector data mmap can be turned on and off for a collection individually, but not for others.</p>
<p>Compatibility: If the original configuration <code translate="no">queryNode.mmap.mmapEnabled</code> is set to <code translate="no">true</code>, the newly added configuration will be set to <code translate="no">true</code> at this time. If <code translate="no">queryNode.mmap.mmapEnabled</code> is set to <code translate="no">false</code>, if the new configuration is set to <code translate="no">true</code>, the final value will be <code translate="no">true</code>.</p>
<h3 id="During-cluster-operation-dynamic-configuration" class="common-anchor-header">During cluster operation: dynamic configuration</h3><p>During cluster runtime, you can dynamically adjust memory mapping settings at either the collection or index level.</p>
<p>At the <strong>collection level</strong>, memory mapping is applied to all unindexed raw data within a collection, excluding primary keys, timestamps, and row IDs. This approach is particularly suited for comprehensive management of large datasets.</p>
<p>For dynamic adjustments to memory mapping settings within a collection, utilize the <code translate="no">set_properties()</code> method. Here, you can toggle <code translate="no">mmap.enabled</code> between <code translate="no">True</code> or <code translate="no">False</code> as needed.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;test_collection&quot;</span>) <span class="hljs-comment"># Replace with your collection name</span>

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties({<span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">True</span>})
<button class="copy-code-btn"></button></code></pre>
<p>After <code translate="no">2.4.10</code>, the memory mapping settings within a collection, utilize the <code translate="no">add_field</code> method. Here, you can toggle <code translate="no">mmap_enabled</code> between <code translate="no">True</code> or <code translate="no">False</code> as needed.</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, mmap_enabled=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>For <strong>index-level</strong> settings, memory mapping can be specifically applied to vector indexes without affecting other data types. This feature is invaluable for collections that require optimized performance for vector searches.</p>
<p>To enable or disable memory mapping for an index within a collection, call the <code translate="no">alter_index()</code> method, specifying the target index name in <code translate="no">index_name</code> and setting <code translate="no">mmap.enabled</code> to <code translate="no">True</code> or <code translate="no">False</code>.</p>
<pre><code translate="no" class="language-python">collection.alter_index(
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Replace with your vector index name</span>
    extra_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>} <span class="hljs-comment"># Enable memory mapping for index</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-storage-path-in-different-deployments" class="common-anchor-header">Customize storage path in different deployments<button data-href="#Customize-storage-path-in-different-deployments" class="anchor-icon" translate="no">
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
    </button></h2><p>Memory-mapped files default to the <code translate="no">/mmap</code> directory within <code translate="no">localStorage.path</code>. Here’s how to customize this setting across various deployment methods:</p>
<ul>
<li>For Milvus installed using Helm Chart:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># new-values.yaml</span>
extraConfigFiles:
   user.yaml: |+
      queryNode:
         mmap:
           mmapEnabled: <span class="hljs-literal">true</span>
           mmapDirPath: any/valid/path
        
helm upgrade &lt;milvus-release&gt; --reuse-values -f new-values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>For Milvus installed using Milvus Operator:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># patch.yaml</span>
spec:
  config:
    queryNode:
      mmap:
        mmapEnabled: <span class="hljs-literal">true</span>
        mmapDirPath: any/valid/path
      
 kubectl patch milvus &lt;milvus-name&gt; --patch-file patch.yaml
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>For Milvus installed using Docker:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># A new installation script is provided to enable mmap-related settings.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Memory mapping cannot be enabled for a loaded collection, ensure the collection has been released before enabling memory mapping.</p></li>
<li><p>Memory mapping is not supported for DiskANN or GPU-class indexes.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>In which scenarios is it recommended to enable memory mapping? What are the trade-offs after enabling this feature?</strong></p>
<p>Memory mapping is recommended when memory is limited or when performance requirements are moderate. Enabling this feature increases the capacity for data loading. For example, with a configuration of 2 CPUs and 8 GB of memory, enabling memory mapping can allow for up to 4 times more data to be loaded compared to not enabling it. The impact on performance varies:</p>
<ul>
<li><p>With sufficient memory, the expected performance is similar to that of using only memory.</p></li>
<li><p>With insufficient memory, the expected performance may degrade.</p></li>
</ul></li>
<li><p><strong>What is the relationship between collection-level and index-level configurations?</strong></p>
<p>Collection-level and index-level are not inclusive relationships, collection-level controls whether the original data is mmap-enabled or not, whereas index-level is for vector indexes only.</p></li>
<li><p><strong>Is there any recommended index type for memory mapping?</strong></p>
<p>Yes, HNSW is recommended for enable mmap. We have tested HNSW, IVF_FLAT, IVF_PQ/SQ series indexes before, the performance of IVF series indexes dropped seriously, while the performance drop of turning on mmap for HNSW indexes is still within expectation.</p></li>
<li><p><strong>What kind of local storage is required for memory mapping?</strong></p>
<p>A high-quality disk enhances performance, with NVMe drives being the preferred option.</p></li>
<li><p><strong>Can scalar data be memory-mapped?</strong></p>
<p>Memory mapping can be applied to scalar data, but it is not applicable to indexes built on scalar fields.</p></li>
<li><p><strong>How is the priority determined for memory mapping configurations across different levels?</strong></p>
<p>In Milvus, when memory mapping configurations are explicitly defined across multiple levels, index-level and collection-level configurations share the highest priority, which is then followed by cluster-level configurations.</p></li>
<li><p><strong>If I upgrade from Milvus 2.3 and have configured the memory mapping directory path, what will happen?</strong></p>
<p>If you upgrade from Milvus 2.3 and have configured the memory mapping directory path (<code translate="no">mmapDirPath</code>), your configuration will be retained, and the default setting for memory mapping enabled (<code translate="no">mmapEnabled</code>) will be <code translate="no">true</code>. It’s important to migrate the metadata to synchronize the configuration of your existing memory-mapped files. For more details, refer to <a href="https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata">Migrate the metadata</a>.</p></li>
</ul>
