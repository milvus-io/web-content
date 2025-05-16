---
id: chunk_cache.md
title: 配置块缓存
summary: ""
---

<h1 id="Configure-Chunk-Cache" class="common-anchor-header">配置块缓存<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h1><p>大块缓存机制使 Milvus 能够在需要数据之前将其预先加载到查询节点本地硬盘的缓存中。这种机制缩短了将数据从磁盘加载到内存所需的时间，从而大大提高了向量检索性能。</p>
<h2 id="Background" class="common-anchor-header">背景介绍<button data-href="#Background" class="anchor-icon" translate="no">
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
    </button></h2><p>在进行向量检索查询之前，Milvus 需要将数据从对象存储加载到查询节点本地硬盘的内存缓存中。这是一个耗时的过程。在所有数据加载完毕之前，Milvus 可能会延迟响应某些向量检索请求。</p>
<p>为了提高查询性能，Milvus 提供了一种块缓存机制，在需要数据之前将数据从对象存储预加载到本地硬盘的缓存中。当收到查询请求时，Segcore 会首先检查数据是否在缓存中，而不是对象存储中。如果数据在缓存中，Segcore 就能快速从缓存中获取数据，并将结果返回给客户端。</p>
<h2 id="Configure-Chunk-Cache" class="common-anchor-header">配置大块缓存<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南说明了如何为Milvus实例配置块缓存机制。配置因安装 Milvus 实例的方式而异。</p>
<ul>
<li><p>对于使用 Helm Charts 安装的 Milvus 实例</p>
<p>将配置添加到<code translate="no">values.yaml</code> 文件的<code translate="no">config</code> 部分。有关详细信息，请参阅<a href="/docs/zh/v2.4.x/configure-helm.md">使用 Helm Charts 配置 Milvus</a>。</p></li>
<li><p>对于使用 Docker Compose 安装的 Milvus 实例</p>
<p>将配置添加到用于启动 Milvus 实例的<code translate="no">milvus.yaml</code> 文件。有关详细信息，请参阅<a href="/docs/zh/v2.4.x/configure-docker.md">使用 Docker Compose 配置 Milvus</a>。</p></li>
<li><p>对于使用 Operator 安装的 Milvus 实例</p>
<p>将配置添加到<code translate="no">Milvus</code> 自定义资源的<code translate="no">spec.components</code> 部分。有关详情，请参阅<a href="/docs/zh/v2.4.x/configure_operator.md">使用 Operator 配置 Milvus</a>。</p></li>
</ul>
<h3 id="Configuration-options" class="common-anchor-header">配置选项</h3><pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode</span>:
    <span class="hljs-attr">cache</span>:
        <span class="hljs-attr">warmup</span>: <span class="hljs-keyword">async</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">warmup</code> 参数决定 Milvus 是否在需要之前将数据从对象存储预加载到查询节点本地硬盘的缓存中。该参数默认为<code translate="no">disable</code> 。可能的选项如下：</p>
<ul>
<li><code translate="no">async</code>:Milvus 在后台异步预加载数据，这不会影响加载集合所需的时间。不过，在加载过程完成后的短时间内，用户在检索向量时可能会遇到延迟。  这是默认选项。</li>
<li><code translate="no">sync</code>:Milvus 会同步预加载数据，这可能会影响加载集合所需的时间。不过，用户可以在加载过程完成后立即执行查询，不会有任何延迟。</li>
<li><code translate="no">disable</code>:Milvus 不会将数据预加载到内存缓存中。</li>
</ul>
<p>请注意，大块缓存设置也适用于向集合中插入新数据或重建集合索引的情况。</p>
<h3 id="FAQ" class="common-anchor-header">常见问题</h3><ul>
<li><p><strong>如何确定块缓存机制是否正常工作？</strong></p>
<p>建议你在加载集合后检查搜索或查询请求的延迟。如果延迟时间明显高于预期（如几秒），则可能表明分块缓存机制仍在工作。</p>
<p>如果查询延迟长时间居高不下。可以检查对象存储的吞吐量，以确保分块缓存仍在工作。在正常情况下，工作中的分块缓存会在对象存储上产生高吞吐量。或者，也可以在<code translate="no">sync</code> 模式下尝试使用块缓存。</p></li>
</ul>
