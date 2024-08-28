---
id: mmap.md
summary: MMap 可以在单个节点上提供更多数据。
title: 支持 MMap 的数据存储
---
<h1 id="MMap-enabled-Data-Storage" class="common-anchor-header">支持 MMap 的数据存储<button data-href="#MMap-enabled-Data-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，内存映射文件允许将文件内容直接映射到内存中。这一功能提高了内存效率，尤其是在可用内存稀缺但完全加载数据不可行的情况下。这种优化机制可以增加数据容量，同时在一定限度内确保性能；但当数据量超出内存太多时，搜索和查询性能可能会严重下降，因此请根据情况选择打开或关闭此功能。</p>
<h2 id="Configure-memory-mapping" class="common-anchor-header">配置内存映射<button data-href="#Configure-memory-mapping" class="anchor-icon" translate="no">
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
    </button></h2><p>从 Milvus 2.4 开始，您可以灵活调整静态配置文件，在部署前为整个集群配置默认内存映射设置。此外，您还可以动态更改参数，以微调群集和索引级别的内存映射设置。展望未来，未来的更新将把内存映射功能扩展到字段级配置。</p>
<h3 id="Before-cluster-deployment-global-configuration" class="common-anchor-header">群集部署前：全局配置</h3><p>在部署群集之前，<strong>群集级</strong>设置会在整个群集中应用内存映射。这将确保所有新对象自动遵循这些配置。需要注意的是，修改这些设置需要重新启动群集才能生效。</p>
<p>要调整群集的内存映射设置，请编辑<code translate="no">configs/milvus.yaml</code> 文件。在该文件中，你可以指定是否默认启用内存映射，并确定存储内存映射文件的目录路径。如果未指定路径（<code translate="no">mmapDirPath</code> ），系统默认将内存映射文件存储在<code translate="no">{localStorage.path}/mmap</code> 中。有关详细信息，请参阅<a href="https://milvus.io/docs/configure_localstorage.md#localStoragepath">本地存储相关配置</a>。</p>
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
<h3 id="During-cluster-operation-dynamic-configuration" class="common-anchor-header">群集运行期间：动态配置</h3><p>在群集运行期间，可以在集合或索引级别动态调整内存映射设置。</p>
<p>在<strong>集合级别</strong>，内存映射会应用到集合内所有未索引的原始数据，不包括主键、时间戳和行 ID。这种方法特别适用于大型数据集的综合管理。</p>
<p>要在数据集中动态调整内存映射设置，可使用<code translate="no">set_properties()</code> 方法。在这里，你可以根据需要在<code translate="no">True</code> 或<code translate="no">False</code> 之间切换<code translate="no">mmap.enabled</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;test_collection&quot;</span>) <span class="hljs-comment"># Replace with your collection name</span>

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties({<span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">True</span>})
<button class="copy-code-btn"></button></code></pre>
<p>对于<strong>索引级</strong>设置，内存映射可专门应用于向量索引，而不会影响其他数据类型。对于需要优化向量搜索性能的集合来说，这一功能非常宝贵。</p>
<p>要为集合中的索引启用或禁用内存映射，可调用<code translate="no">alter_index()</code> 方法，在<code translate="no">index_name</code> 中指定目标索引名称，并将<code translate="no">mmap.enabled</code> 设置为<code translate="no">True</code> 或<code translate="no">False</code> 。</p>
<pre><code translate="no" class="language-python">collection.alter_index(
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Replace with your vector index name</span>
    extra_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>} <span class="hljs-comment"># Enable memory mapping for index</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-storage-path-in-different-deployments" class="common-anchor-header">在不同部署中自定义存储路径<button data-href="#Customize-storage-path-in-different-deployments" class="anchor-icon" translate="no">
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
    </button></h2><p>内存映射文件默认存放在<code translate="no">localStorage.path</code> 中的<code translate="no">/mmap</code> 目录中。以下是在不同部署方法中自定义此设置的方法：</p>
<ul>
<li>对于使用 Helm Chart 安装的 Milvus：</li>
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
<li>对于使用 Milvus Operator 安装的 Milvus：</li>
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
<li>对于使用 Docker 安装的 Milvus：</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># A new installation script is provided to enable mmap-related settings.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>无法为已加载的集合启用内存映射，请确保在启用内存映射前已释放集合。</p></li>
<li><p>DiskANN 或 GPU 级索引不支持内存映射。</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">常见问题<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>建议在哪些情况下启用内存映射？启用此功能后有哪些权衡？</strong></p>
<p>内存有限或性能要求适中时，建议使用内存映射。启用此功能可提高数据加载能力。例如，在配置 2 个 CPU 和 8 GB 内存的情况下，启用内存映射可使加载的数据量比不启用内存映射多 4 倍。对性能的影响各不相同：</p>
<ul>
<li><p>在内存充足的情况下，预期性能与只使用内存的情况类似。</p></li>
<li><p>如果内存不足，预期性能可能会下降。</p></li>
</ul></li>
<li><p><strong>集合级配置和索引级配置之间的关系是什么？</strong></p>
<p>集合级和索引级不是包含关系，集合级控制原始数据是否启用 mmap，而索引级只针对向量索引。</p></li>
<li><p><strong>有没有推荐用于内存映射的索引类型？</strong></p>
<p>有，建议使用 HNSW 启用毫米映射。我们曾测试过 HNSW、IVF_FLAT、IVF_PQ/SQ 系列索引，IVF 系列索引的性能下降严重，而 HNSW 索引启用毫米映射后的性能下降仍在预期之内。</p></li>
<li><p><strong>内存映射需要什么样的本地存储？</strong></p>
<p>高质量的磁盘可以提高性能，NVMe 驱动器是首选。</p></li>
<li><p><strong>标量数据能否进行内存映射？</strong></p>
<p>内存映射可应用于标量数据，但不适用于基于标量字段建立的索引。</p></li>
<li><p><strong>如何确定不同级别内存映射配置的优先级？</strong></p>
<p>在 Milvus 中，当跨多个级别明确定义内存映射配置时，索引级和集合级配置共享最高优先级，然后是集群级配置。</p></li>
<li><p><strong>如果我从 Milvus 2.3 升级并配置了内存映射目录路径，会发生什么情况？</strong></p>
<p>如果从 Milvus 2.3 升级并配置了内存映射目录路径 (<code translate="no">mmapDirPath</code>)，您的配置将被保留，启用内存映射的默认设置 (<code translate="no">mmapEnabled</code>) 将是<code translate="no">true</code> 。迁移元数据以同步现有内存映射文件的配置非常重要。有关详细信息，请参阅<a href="https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata">迁移元数据</a>。</p></li>
</ul>
