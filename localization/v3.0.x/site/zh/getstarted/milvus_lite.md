---
id: milvus_lite.md
summary: 安装 Milvus Lite，并使用固定的数据库路径运行本地向量搜索。
title: 在本地运行 Milvus Lite
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">在本地运行 Milvus Lite<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>本页面介绍了如何使用 Milvus Lite 进行本地向量搜索。内容涵盖安装、数据持久化、过滤以及将数据导出到另一个 Milvus 部署。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 是<a href="https://github.com/milvus-io/pymilvus">Milvus Python SDK</a> 的轻量级本地后端。请通过可选的<code translate="no">milvus-lite</code> 附加组件进行安装；仅安装<code translate="no">pymilvus</code> 并不会在下面使用的 SDK 版本中安装此后端。</p>
<p>Milvus Lite 适用于以下环境中的本地开发和小规模工作负载：</p>
<ul>
<li>Jupyter Notebook 或 Google Colab</li>
<li>笔记本电脑</li>
<li>具备兼容 Python 依赖项的边缘设备</li>
</ul>
<p>Milvus Lite 使用<code translate="no">MilvusClient</code> API 执行受支持的操作，包括向量数据持久化、插入和删除、向量搜索以及元数据过滤。若要将受支持的应用程序工作流迁移到远程部署环境，请更改连接 URI 和凭据，并查看受支持功能的差异。 对于大规模生产工作负载，请使用<a href="/docs/zh/install-overview.md">Milvus Standalone 或 Milvus Distributed</a>，或<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 上的全托管 Milvus。</p>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南使用 PyMilvus<strong>3.0.2</strong>和 Milvus Lite<strong>3.2.2</strong>。请准备以下环境：</p>
<ul>
<li>Python 3.10 或更高版本。本地 Lite 后端对 Python 版本的最低要求高于远程 PyMilvus 客户端。</li>
<li>macOS、Linux 或 Windows 系统，并具备兼容的依赖项轮子（如<code translate="no">faiss-cpu</code> 和<code translate="no">pyarrow</code> ）。Milvus Lite 3.2.2 是一个纯 Python 包，因此操作系统和架构必须满足这些依赖项的要求，而非 Lite 包本身的要求。</li>
<li>用于数据库存储的可写本地目录。</li>
</ul>
<p>在 Windows 系统上，由于其平台标记，pip 会跳过 PyMilvus 3.0.2 中的<code translate="no">milvus-lite</code> 附加项，因此必须显式指定<code translate="no">milvus-lite</code> 。下面的安装命令已包含此操作。对于其他软件包和平台的组合，请参阅<a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#requirements">Milvus Lite 发布要求</a>。</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">设置 Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>创建一个隔离的 Python 环境并安装这两个包：</p>
<pre><code translate="no" class="language-bash">python3 -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate
python -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>请为 extras 表达式添加引号，以免 zsh 等 shell 解释其中的方括号。在 Windows PowerShell 中，请使用<code translate="no">.venv\Scripts\Activate.ps1</code> 而不是<code translate="no">source .venv/bin/activate</code> 来激活环境。明确指定版本号可确保 SDK 和本地后端与本指南保持一致。</p>
<div class="alert note">
<blockquote>
<p>Milvus Lite 3.x 使用的存储引擎与原始 2.x 包不同。它无法就地打开现有的 2.x<code translate="no">.db</code> 文件。 请保留原始数据库及能够打开它的环境，将数据导出到该环境，然后将数据导入新数据库。安装新软件包不会迁移旧的存储格式。请参阅《<a href="#Migrating-data-from-Milvus-Lite">从 Milvus Lite 迁移数据</a>》。</p>
</blockquote>
</div>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">连接到 Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>向 `<code translate="no">MilvusClient</code>` 传递以 `<code translate="no">.db</code> ` 结尾的本地路径：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>对于 Milvus Lite 3.2.2，这将在工作目录中创建一个<strong>milvus_demo.db 目录</strong>。该目录包含数据库的存储文件；<code translate="no">.db</code> 后缀并不表示这是一个单一的可移植文件。关闭客户端或重启应用程序后，请使用相同的路径重新打开数据库。</p>
<p>若要创建新数据库，请使用不同的路径。若要连接到远程 Milvus 服务器，请传入其端点和凭据：</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;username:password&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-a-local-search-example" class="common-anchor-header">运行本地搜索示例<button data-href="#Run-a-local-search-example" class="anchor-icon" translate="no">
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
    </button></h2><p>以下示例演示了使用生成的向量进行 API 工作流。这些向量并未编码文本的含义；在构建语义搜索时，请使用 Embeddings 模型。请在新的数据库路径上运行该示例，或者在再次运行前删除现有的<code translate="no">demo_collection</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors in this example have 384 dimensions.</span>
)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># Generate reproducible example vectors, not semantic embeddings.</span>
rng = np.random.default_rng(<span class="hljs-number">7</span>)
vectors = rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, size=(<span class="hljs-built_in">len</span>(docs), <span class="hljs-number">384</span>)).tolist()
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]
res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Search only records whose subject is &quot;history&quot;.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Retrieve all records that match the scalar filter, without vector ranking.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete one record and keep the others for the export example below.</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(res)
client.close()
<button class="copy-code-btn"></button></code></pre>
<p>若您的应用程序需要从文本生成 Embeddings，请继续阅读<a href="/docs/zh/quickstart.md">《快速入门》</a>。您还可以探索<a href="https://github.com/milvus-io/bootcamp">Milvus Bootcamp</a>中的 RAG、图像搜索和框架<a href="https://github.com/milvus-io/bootcamp">集成示例</a>。</p>
<h2 id="Supported-features-and-limits" class="common-anchor-header">支持的功能与限制<button data-href="#Supported-features-and-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 3.2.2 通过其本地 PyMilvus 适配器实现了 Milvus 操作子集。其<a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">带版本号的功能参考文档</a>描述了以下功能：</p>
<table>
<thead>
<tr><th>领域</th><th>此 Lite 版本的支持情况</th></tr>
</thead>
<tbody>
<tr><td>稠密和稀疏向量</td><td><code translate="no">FLOAT_VECTOR</code> 以及<code translate="no">SPARSE_FLOAT_VECTOR</code></td></tr>
<tr><td>向量索引</td><td><code translate="no">FLAT</code>、<code translate="no">BRUTE_FORCE</code> 、<code translate="no">IVF_FLAT</code> 、<code translate="no">IVF_SQ8</code> 、<code translate="no">HNSW</code> 、<code translate="no">HNSW_SQ</code> ，以及<code translate="no">AUTOINDEX</code></td></tr>
<tr><td>标量和稀疏索引</td><td><code translate="no">INVERTED</code> 标量索引和<code translate="no">SPARSE_INVERTED_INDEX</code></td></tr>
<tr><td>数据操作</td><td>插入、更新或插入、获取、查询、向量搜索和删除</td></tr>
<tr><td>搜索</td><td>稠密和稀疏搜索、元数据过滤器、多个向量字段以及混合搜索</td></tr>
<tr><td>Collection organization</td><td>Collections、命名数据库、别名和分区（在本地适配器支持的操作范围内）</td></tr>
</tbody>
</table>
<p>此版本不限于<code translate="no">FLAT</code> 索引。索引的可用性和行为取决于Lite版本；请勿将原始2.x后端的限制套用到3.x引擎上。</p>
<p>在为应用程序选择 Lite 版本之前，请仔细阅读以下限制：</p>
<ul>
<li>每次仅有一个进程可以拥有数据库存储目录。引擎通过文件锁保护该目录。</li>
<li>请对写入同一Collection的操作进行串行化处理。不支持安全地进行并发写入。</li>
<li>本地适配器并未实现所有 Milvus RPC 接口。不支持的操作将返回<code translate="no">UNIMPLEMENTED</code> ；无法进行模式修改以及分区级别的加载或释放操作。</li>
<li>不支持身份验证、用户、角色、基于角色的访问控制（RBAC）和 TLS。请勿将本地服务器暴露在不可信的网络中。</li>
<li>不支持二进制、float16、bfloat16 和 int8 向量字段，以及 Product Quantization 索引。</li>
<li>Lite 专为本地工作负载设计。本地 API 兼容性无法提供分布式扩展能力，也无法提供远程部署所具备的生产环境隔离性和可用性。</li>
</ul>
<p>在依赖本地示例中未涉及的服务器功能之前，请查阅<a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#known-limitations">各版本的已知限制</a>。</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">从 Milvus Lite 迁移数据<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>使用<code translate="no">milvus-lite dump</code> 将Collection导出为Milvus BulkWriter JSON文件。这些文件可导入到自托管的Milvus部署或Zilliz Cloud中。</p>
<p>在打开源数据库的环境中安装 SDK 的批量写入器依赖项：</p>
<pre><code translate="no" class="language-bash">python -m pip install <span class="hljs-string">&quot;pymilvus[bulk_writer]==3.0.2&quot;</span>
milvus-lite dump -h
<button class="copy-code-btn"></button></code></pre>
<p>在另一个进程中运行该命令之前，请先关闭拥有本地数据库的 Python 应用程序。导出前一个示例中的 Collection：</p>
<pre><code translate="no" class="language-bash">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<button class="copy-code-btn"></button></code></pre>
<p>该命令会从<strong>milvus_demo.db 存储目录中</strong>读取<code translate="no">demo_collection</code> ，并将导出文件写入<strong>data_dir</strong> 目录下。请使用<a href="/docs/zh/import-data.md">Bulk Insert</a>或<a href="https://docs.zilliz.com/docs/data-import">Zilliz Cloud 数据导入功能</a>导入这些文件。</p>
<div class="alert note">
<blockquote>
<p>若要导出原始的 2.x 数据库文件，请在安装了可打开该文件的原始 Lite 版本的环境中运行 dump 工具。3.x 版的 dump 工具不会通过直接打开文件来转换旧的存储格式。请保留源数据库，直到您验证了导入的行数和搜索结果。</p>
</blockquote>
</div>
<p>有关受支持的导出选项和存储格式限制，请参阅<a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">Milvus Lite 导出参考</a>文档。</p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>继续执行以下任务：</p>
<ul>
<li><a href="/docs/zh/quickstart.md">快速入门</a>：生成Embeddings并运行搜索工作流。</li>
<li><a href="/docs/zh/single-vector-search.md">单向量搜索</a>和<a href="/docs/zh/multi-vector-search.md">混合搜索</a>：为您的应用程序设计查询。</li>
<li><a href="/docs/zh/install-overview.md">选择部署方式</a>：突破本地开发限制。</li>
<li><a href="https://github.com/zilliztech/attu">Attu</a>：探索 Milvus 图形用户界面（GUI），进行远程部署。</li>
</ul>
