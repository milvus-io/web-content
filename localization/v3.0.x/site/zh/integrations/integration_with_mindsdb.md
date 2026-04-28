---
id: integration_with_mindsdb.md
summary: >-
  本教程演示了如何将 Milvus 与 MindsDB 集成，使您能够通过类似 SQL 的操作来管理和查询向量嵌入，从而利用 MindsDB 的人工智能功能和
  Milvus 的向量数据库功能。
title: 将 Milvus 与 MindsDB 相集成
---
<h1 id="Integrate-Milvus-with-MindsDB" class="common-anchor-header">将 Milvus 与 MindsDB 相集成<button data-href="#Integrate-Milvus-with-MindsDB" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB</a>是一款功能强大的工具，用于将人工智能应用程序与各种企业数据源集成。它作为一个联合查询引擎，在细致回答结构化和非结构化数据查询的同时，还能为无序的数据带来秩序。无论您的数据是分散在 SaaS 应用程序、数据库还是数据仓库中，MindsDB 都能使用标准 SQL 对其进行连接和查询。它通过知识库提供最先进的自主RAG系统，支持数百种数据源，并提供从本地开发到云环境的灵活部署选项。</p>
<p>本教程演示了如何将 Milvus 与 MindsDB 集成，通过类似 SQL 的操作来管理和查询向量嵌入，使您能够利用 MindsDB 的 AI 功能和 Milvus 的向量数据库功能。</p>
<div class="alert note">
<p>本教程主要参考了<a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">MindsDB Milvus处理程序</a>的官方文档。如果你在本教程中发现任何过时的部分，可以优先参考官方文档，并为我们创建一个问题。</p>
</div>
<h2 id="Install-MindsDB" class="common-anchor-header">安装MindsDB<button data-href="#Install-MindsDB" class="anchor-icon" translate="no">
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
    </button></h2><p>开始之前，请通过<a href="https://docs.mindsdb.com/setup/self-hosted/docker">Docker</a>或<a href="https://docs.mindsdb.com/setup/self-hosted/docker-desktop">Docker Desktop</a>在本地安装MindsDB。</p>
<p>在继续之前，确保你对MindsDB和Milvus的基本概念和操作符都有扎实的理解。</p>
<h2 id="Arguments-Introduction" class="common-anchor-header">参数介绍<button data-href="#Arguments-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>建立连接所需的参数如下</p>
<ul>
<li><code translate="no">uri</code>：Milvus 数据库的 uri，可以设置为本地".db "文件，也可以设置为 docker 或云服务。</li>
<li><code translate="no">token</code>根据 uri 选项支持 docker 或云服务的令牌</li>
</ul>
<p>用于建立连接的可选参数有</p>
<p>这些参数用于<code translate="no">SELECT</code> 查询：</p>
<ul>
<li><code translate="no">search_default_limit</code>：在选择语句中传递的默认限制（默认值=100）</li>
<li><code translate="no">search_metric_type</code>：用于搜索的度量类型（默认="L2）</li>
<li><code translate="no">search_ignore_growing</code>：在进行相似性搜索时是否忽略不断增长的片段（默认值=假）</li>
<li><code translate="no">search_params</code>特定于<code translate="no">search_metric_type</code> （默认值={"nprobe"：10}）。</li>
</ul>
<p>这些用于<code translate="no">CREATE</code> 查询：</p>
<ul>
<li><code translate="no">create_auto_id</code>id：插入无 ID 记录时是否自动生成 ID（默认值为 False）</li>
<li><code translate="no">create_id_max_len</code>创建表格时 id 字段的最大长度（默认值=64）</li>
<li><code translate="no">create_embedding_dim</code>创建表格时的嵌入维度（默认值=8）</li>
<li><code translate="no">create_dynamic_field</code>创建的表是否有动态字段（默认为 true）</li>
<li><code translate="no">create_content_max_len</code>内容列的最大长度（默认值=200）</li>
<li><code translate="no">create_content_default_value</code>内容列的默认值（默认值=''）</li>
<li><code translate="no">create_schema_description</code>模式的描述（默认值=''）</li>
<li><code translate="no">create_alias</code>模式的别名（默认值='默认值）</li>
<li><code translate="no">create_index_params</code>在 Embeddings 列上创建的索引的参数（default={}）。</li>
<li><code translate="no">create_index_metric_type</code>：用于创建索引的度量（默认值='L2')</li>
<li><code translate="no">create_index_type</code>索引类型（默认='AUTOINDEX）</li>
</ul>
<h2 id="Usage" class="common-anchor-header">使用方法<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>在继续之前，请确保<code translate="no">pymilvus</code> 版本与此<a href="https://github.com/mindsdb/mindsdb/blob/main/mindsdb/integrations/handlers/milvus_handler/requirements.txt">固定版本</a>相同。如果发现版本兼容性问题，可以回滚 pymilvus 版本，或在此<a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">需求文件</a>中自定义版本。</p>
<h3 id="Creating-connection" class="common-anchor-header">创建连接</h3><p>为了使用该处理程序并连接到 MindsDB 中的 Milvus 服务器，可以使用以下语法：</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">CREATE</span> DATABASE milvus_datasource
<span class="hljs-keyword">WITH</span>
  ENGINE <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;milvus&#x27;</span>,
  PARAMETERS <span class="hljs-operator">=</span> {
    &quot;uri&quot;: &quot;./milvus_local.db&quot;,
    &quot;token&quot;: &quot;&quot;,
    &quot;create_embedding_dim&quot;: <span class="hljs-number">3</span>,
    &quot;create_auto_id&quot;: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<ul>
<li>如果你只需要一个本地向量数据库，用于小规模数据或原型设计，那么将uri设置为本地文件，如<code translate="no">./milvus.db</code> ，是最方便的方法，因为它会自动利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>将所有数据存储在这个文件中。</li>
<li>如果要在生产中使用更大规模的数据和流量，可以在<a href="https://milvus.io/docs/install-overview.md">Docker 或 Kubernetes</a> 上设置 Milvus 服务器。在此设置中，请使用服务器地址和端口作为<code translate="no">uri</code> ，例如<code translate="no">http://localhost:19530</code> 。如果启用了 Milvus 上的身份验证功能，请将<code translate="no">token</code> 设置为<code translate="no">&quot;&lt;your_username&gt;:&lt;your_password&gt;&quot;</code> ，否则无需设置令牌。</li>
<li>您也可以在<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 上使用完全托管的 Milvus。只需将<code translate="no">uri</code> 和<code translate="no">token</code> 设置为 Zilliz Cloud 实例的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">公共端点和 API 密钥</a>。</li>
</ul>
</blockquote>
<h3 id="Dropping-connection" class="common-anchor-header">放弃连接</h3><p>要放弃连接，请使用此命令</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DROP</span> DATABASE milvus_datasource;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-tables" class="common-anchor-header">创建表格</h3><p>要从预先存在的表中插入数据，请使用<code translate="no">CREATE</code></p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> milvus_datasource.test
(<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> sqlitedb.test);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Dropping-collections" class="common-anchor-header">删除 Collection</h3><p>不支持删除 Collections</p>
<h3 id="Querying-and-selecting" class="common-anchor-header">查询和选择</h3><p>要使用搜索向量查询数据库，可在<code translate="no">WHERE</code> 子句中使用<code translate="no">search_vector</code> </p>
<p>注意事项：</p>
<ul>
<li>如果省略<code translate="no">LIMIT</code> ，则会使用<code translate="no">search_default_limit</code> ，因为 Milvus 需要它</li>
<li>不支持元数据列，但如果 Collections 启用了动态 Schema，则可以像普通查询一样进行查询，见下面的示例</li>
<li>动态字段无法显示，但可以查询</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> milvus_datasource.test
<span class="hljs-keyword">WHERE</span> search_vector <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;[3.0, 1.0, 2.0, 4.5]&#x27;</span>
LIMIT <span class="hljs-number">10</span>;
<button class="copy-code-btn"></button></code></pre>
<p>如果省略<code translate="no">search_vector</code> ，这将成为基本搜索，并返回<code translate="no">LIMIT</code> 或<code translate="no">search_default_limit</code> 中的 Collections 条目数量</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> milvus_datasource.test
<button class="copy-code-btn"></button></code></pre>
<p>可以像普通 SQL 一样在动态字段上使用<code translate="no">WHERE</code> 子句</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> milvus_datasource.createtest
<span class="hljs-keyword">WHERE</span> category <span class="hljs-operator">=</span> &quot;science&quot;;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deleting-records" class="common-anchor-header">删除记录</h3><p>可以像使用 SQL 一样使用<code translate="no">DELETE</code> 删除条目。</p>
<p>注意事项</p>
<ul>
<li>Milvus 只支持删除具有明确指定主键的实体。</li>
<li>只能使用<code translate="no">IN</code> 操作符</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> milvus_datasource.test
<span class="hljs-keyword">WHERE</span> id <span class="hljs-keyword">IN</span> (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Inserting-records" class="common-anchor-header">插入记录</h3><p>您也可以像这样插入单个记录：</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> milvus_test.testable (id,content,metadata,embeddings)
<span class="hljs-keyword">VALUES</span> (&quot;id3&quot;, <span class="hljs-string">&#x27;this is a test&#x27;</span>, <span class="hljs-string">&#x27;{&quot;test&quot;: &quot;test&quot;}&#x27;</span>, <span class="hljs-string">&#x27;[1.0, 8.0, 9.0]&#x27;</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Updating" class="common-anchor-header">更新</h3><p>Milvus API 不支持更新记录。你可以尝试使用<code translate="no">DELETE</code> 和<code translate="no">INSERT</code></p>
<hr>
<p>更多详情和示例，请参阅<a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB官方文档</a>。</p>
