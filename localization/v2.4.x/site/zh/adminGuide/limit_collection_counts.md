---
id: limit_collection_counts.md
title: 设定收集数量限制
---
<h1 id="Limit-Collection-Counts" class="common-anchor-header">收集数量限制<button data-href="#Limit-Collection-Counts" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 实例最多允许 65,536 个 Collection。不过，过多的 Collections 可能会导致性能问题。因此，建议限制在 Milvus 实例中创建的 Collection 数量。</p>
<p>本指南说明了如何设置 Milvus 实例中的 Collection 数量限制。</p>
<p>配置因安装 Milvus 实例的方式而异。</p>
<ul>
<li><p>对于使用 Helm Charts 安装的 Milvus 实例</p>
<p>将配置添加到<code translate="no">values.yaml</code> 文件的<code translate="no">config</code> 部分。有关详细信息，请参阅<a href="/docs/zh/v2.4.x/configure-helm.md">使用 Helm Charts 配置 Milvus</a>。</p></li>
<li><p>对于使用 Docker Compose 安装的 Milvus 实例</p>
<p>将配置添加到用于启动 Milvus 实例的<code translate="no">milvus.yaml</code> 文件中。有关详细信息，请参阅<a href="/docs/zh/v2.4.x/configure-docker.md">使用 Docker Compose 配置 Milvus</a>。</p></li>
<li><p>对于使用 Operator 安装的 Milvus 实例</p>
<p>将配置添加到<code translate="no">Milvus</code> 自定义资源的<code translate="no">spec.components</code> 部分。有关详情，请参阅<a href="/docs/zh/v2.4.x/configure_operator.md">使用 Operator 配置 Milvus</a>。</p></li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">配置选项<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    maxGeneralCapacity: 65536
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">maxGeneralCapacity</code> 参数设置当前 Milvus 实例可容纳的最大 Collections 数量。默认值为<code translate="no">65536</code> 。</p>
<h2 id="Calculating-the-number-of-collections" class="common-anchor-header">计算 Collections 的数量<button data-href="#Calculating-the-number-of-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>在一个 Collections 中，可以设置多个分片和分区。分片是用于在多个数据节点之间分配数据写入操作的逻辑单元。分区是逻辑单元，用于通过只加载 Collections 数据的子集来提高数据检索效率。在计算当前 Milvus 实例中的 Collections 数量时，还需要计算分片和分区的数量。</p>
<p>例如，假设您已经创建了<strong>100 个</strong>Collection，其中<strong>60 个</strong>Collection 有<strong>2</strong>个分块和<strong>4 个</strong>分区，其余<strong>40 个</strong>Collection 有<strong>1 个</strong>分块和<strong>12 个</strong>分区。当前的 Collections 数量可以计算如下：</p>
<pre><code translate="no">60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
<button class="copy-code-btn"></button></code></pre>
<p>在上例中，您已经使用了默认限制中的<strong>960 个</strong>。现在如果想创建一个有<strong>4</strong>个分区和<strong>20 个</strong>分区的新 Collections，就会收到以下错误提示，因为 Collections 的总数超过了最大容量：</p>
<pre><code translate="no" class="language-shell">failed checking constraint: sum_collections(parition*shard) exceeding the <span class="hljs-built_in">max</span> general capacity:
<button class="copy-code-btn"></button></code></pre>
<p>要避免此错误，可以减少现有或新集合中的分片或分区数量，删除某些集合，或者增加<code translate="no">maxGeneralCapacity</code> 值。</p>
