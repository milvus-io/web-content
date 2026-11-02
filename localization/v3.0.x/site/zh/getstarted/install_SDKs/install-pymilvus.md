---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
summary: 了解如何安装 Milvus 的 Python SDK。
title: 安装 Milvus Python SDK
---
<h1 id="Install-Milvus-Python-SDK" class="common-anchor-header">安装 Milvus Python SDK<button data-href="#Install-Milvus-Python-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>本页面介绍了如何安装 PyMilvus（Milvus 的 Python SDK），以及如何为本地数据库或嵌入式模型选择可选依赖项。</p>
<h2 id="Requirements" class="common-anchor-header">系统要求<button data-href="#Requirements" class="anchor-icon" translate="no">
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
<li>PyMilvus 3.0.2 需要 Python 3.9 或更高版本才能连接到远程 Milvus 服务器。</li>
<li>本地 Milvus Lite 3.2.2 示例需要 Python 3.10 或更高版本以及受支持的平台。请参阅《<a href="/docs/zh/milvus_lite.md">在本地运行 Milvus Lite</a>》。</li>
<li>通过<code translate="no">pip</code> 安装依赖项。PyMilvus 3.0.2 需要<code translate="no">protobuf&gt;=5.27.2</code> ；请勿单独锁定<code translate="no">protobuf==3.20.0</code> 。使用该 SDK 时无需<code translate="no">grpcio-tools</code> 。</li>
</ul>
<h2 id="Install-PyMilvus-via-pip" class="common-anchor-header">通过 pip 安装 PyMilvus<button data-href="#Install-PyMilvus-via-pip" class="anchor-icon" translate="no">
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
    </button></h2><p>PyMilvus 可在<a href="https://pypi.org/project/pymilvus/">Python 软件包索引</a>（Python Package<a href="https://pypi.org/project/pymilvus/">Index</a>）中获取。</p>
<div class="alert note">
建议安装与您已安装的 Milvus 服务器版本相匹配的 PyMilvus 版本。有关更多信息，请参阅《<a href="/docs/zh/release_notes.md">发行说明》</a>。
</div>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>此操作将安装用于连接远程 Milvus 服务器的客户端。它不会安装 Milvus Lite 或 Embeddings。</p>
<p>若要使用<a href="/docs/zh/quickstart.md">“快速</a>入门”中的本地数据库，请安装<code translate="no">milvus-lite</code> 扩展包及对应的Lite软件包：</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>若需嵌入式辅助工具，请单独安装<code translate="no">model</code> 扩展：</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[model]==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在 Windows 系统上，由于其平台标记，pip 会跳过 PyMilvus 3.0.2 的<code translate="no">milvus-lite</code> 扩展包。上述命令明确指定了<code translate="no">milvus-lite</code> ，因此只要您的 Python 版本存在<code translate="no">faiss-cpu</code> 和<code translate="no">pyarrow</code> 的 wheels 包，该命令在 Windows 上即可成功安装。</p>
<h2 id="Verify-installation" class="common-anchor-header">验证安装<button data-href="#Verify-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>如果 PyMilvus 安装正确，运行以下命令时不会引发异常。</p>
<pre><code translate="no" class="language-bash">python3 -c <span class="hljs-string">&quot;from pymilvus import MilvusClient&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>此操作仅检查 SDK 的导入情况，而非服务器连接。请按照<a href="/docs/zh/quickstart.md">《快速入门》</a>指南创建本地 Collection、插入数据并运行搜索。</p>
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
    </button></h2><p>安装 PyMilvus 后，您可以：</p>
<ul>
<li><p>学习 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh/manage-collections.md">管理 Collections</a></li>
<li><a href="/docs/zh/manage-partitions.md">管理分区</a></li>
<li><a href="/docs/zh/insert-update-delete.md">插入、Upsert 和删除</a></li>
<li><a href="/docs/zh/single-vector-search.md">单向量搜索</a></li>
<li><a href="/docs/zh/multi-vector-search.md">混合搜索</a></li>
</ul></li>
<li><p>探索<a href="/api-reference/pymilvus/v3.0.x/About.md">PyMilvus API 参考文档</a></p></li>
</ul>
