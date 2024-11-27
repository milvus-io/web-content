---
id: integrate_with_vanna.md
summary: 本指南演示如何使用 Vanna 根据存储在数据库中的数据生成并执行 SQL 查询。
title: 用 Vanna 和 Milvus 编写 SQL
---
<h1 id="Write-SQL-with-Vanna-and-Milvus" class="common-anchor-header">用 Vanna 和 Milvus 编写 SQL<button data-href="#Write-SQL-with-Vanna-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/vanna_write_sql.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/vanna_write_sql.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p><a href="https://vanna.ai/">Vanna</a>是一个开源 Python RAG（检索增强生成）框架，用于生成 SQL 和相关功能。<a href="https://milvus.io/">Milvus</a>是世界上最先进的开源向量数据库，用于支持 Embeddings 相似性搜索和人工智能应用。</p>
<p>Vanna 的工作分为两个简单的步骤--在你的数据上训练一个 RAG "模型"，然后提出问题，这些问题将返回 SQL 查询，这些查询可以设置为在你的数据库上运行。本指南演示了如何使用 Vanna 根据存储在数据库中的数据生成并执行 SQL 查询。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在运行本笔记本之前，请确保已安装以下依赖项：</p>
<pre><code translate="no" class="language-python">$ pip install <span class="hljs-string">&quot;vanna[milvus,openai]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果使用的是 Google Colab，要启用刚刚安装的依赖项，可能需要<strong>重启运行时</strong>（点击屏幕上方的 "运行时 "菜单，从下拉菜单中选择 "重启会话"）。</p>
</div>
<p>你还需要在环境变量中设置<code translate="no">OPENAI_API_KEY</code> 。您可以从<a href="https://platform.openai.com/docs/guides/production-best-practices/api-keys">OpenAI</a> 获取 API 密钥。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Data-preparation" class="common-anchor-header">数据准备<button data-href="#Data-preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>首先，我们需要继承 Vanna 的<code translate="no">Milvus_VectorStore</code> 和<code translate="no">OpenAI_Chat</code> 类，并定义一个新类<code translate="no">VannaMilvus</code> ，该类结合了这两个类的功能。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, model
<span class="hljs-keyword">from</span> vanna.milvus <span class="hljs-keyword">import</span> Milvus_VectorStore
<span class="hljs-keyword">from</span> vanna.openai <span class="hljs-keyword">import</span> OpenAI_Chat


<span class="hljs-keyword">class</span> <span class="hljs-title class_">VannaMilvus</span>(Milvus_VectorStore, OpenAI_Chat):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, config=<span class="hljs-literal">None</span></span>):
        Milvus_VectorStore.__init__(<span class="hljs-variable language_">self</span>, config=config)
        OpenAI_Chat.__init__(<span class="hljs-variable language_">self</span>, config=config)
<button class="copy-code-btn"></button></code></pre>
<p>我们使用必要的配置参数初始化<code translate="no">VannaMilvus</code> 类。我们使用<code translate="no">milvus_client</code> 实例来存储嵌入式数据，并使用从<a href="https://milvus.io/docs/embeddings.md">milvus_model</a>初始化的<code translate="no">model.DefaultEmbeddingFunction()</code> 来生成嵌入式数据。C</p>
<div class="alert note">
<p>至于<code translate="no">MilvusClient</code> 的参数：</p>
<ul>
<li>将<code translate="no">uri</code> 设置为本地文件，如<code translate="no">./milvus.db</code> ，是最方便的方法，因为它会自动利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>将所有数据存储在此文件中。</li>
<li>如果数据规模较大，可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上设置性能更强的 Milvus 服务器。在此设置中，请使用服务器 uri，例如<code translate="no">http://localhost:19530</code> ，作为您的<code translate="no">uri</code> 。</li>
<li>如果你想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的全托管云服务），请调整<code translate="no">uri</code> 和<code translate="no">token</code> ，它们对应于 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">公共端点和 Api 密钥</a>。</li>
</ul>
</div>
<pre><code translate="no" class="language-python">milvus_uri = <span class="hljs-string">&quot;./milvus_vanna.db&quot;</span>

milvus_client = MilvusClient(uri=milvus_uri)

vn_milvus = VannaMilvus(
    config={
        <span class="hljs-string">&quot;api_key&quot;</span>: os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
        <span class="hljs-string">&quot;model&quot;</span>: <span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>,
        <span class="hljs-string">&quot;milvus_client&quot;</span>: milvus_client,
        <span class="hljs-string">&quot;embedding_function&quot;</span>: model.DefaultEmbeddingFunction(),
        <span class="hljs-string">&quot;n_results&quot;</span>: <span class="hljs-number">2</span>,  <span class="hljs-comment"># The number of results to return from Milvus semantic search.</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>这是一个只有少量数据样本的简单示例，因此我们将<code translate="no">n_results</code> 设置为 2，以确保搜索到最相似的前 2 个结果。实际上，在处理较大的训练数据集时，应将<code translate="no">n_results</code> 设置为更高的值。</p>
<p>我们将使用一个样本 SQLite 数据库，其中包含一些样本数据表。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> sqlite3

sqlite_path = <span class="hljs-string">&quot;./my-database.sqlite&quot;</span>
sql_connect = sqlite3.connect(sqlite_path)
c = sql_connect.cursor()

init_sqls = <span class="hljs-string">&quot;&quot;&quot;
CREATE TABLE IF NOT EXISTS Customer (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Company TEXT NOT NULL,
    City TEXT NOT NULL,
    Phone TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Company (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Industry TEXT NOT NULL,
    Location TEXT NOT NULL,
    EmployeeCount INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS User (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username TEXT NOT NULL UNIQUE,
    Email TEXT NOT NULL UNIQUE
);

INSERT INTO Customer (Name, Company, City, Phone) 
VALUES (&#x27;John Doe&#x27;, &#x27;ABC Corp&#x27;, &#x27;New York&#x27;, &#x27;123-456-7890&#x27;);

INSERT INTO Customer (Name, Company, City, Phone) 
VALUES (&#x27;Jane Smith&#x27;, &#x27;XYZ Inc&#x27;, &#x27;Los Angeles&#x27;, &#x27;098-765-4321&#x27;);

INSERT INTO Company (Name, Industry, Location, EmployeeCount)
VALUES (&#x27;ABC Corp&#x27;, &#x27;cutting-edge technology&#x27;, &#x27;New York&#x27;, 100);

INSERT INTO User (Username, Email)
VALUES (&#x27;johndoe123&#x27;, &#x27;johndoe123@example.com&#x27;);
&quot;&quot;&quot;</span>

<span class="hljs-keyword">for</span> sql <span class="hljs-keyword">in</span> init_sqls.split(<span class="hljs-string">&quot;;&quot;</span>):
    c.execute(sql)

sql_connect.commit()

<span class="hljs-comment"># Connect to the SQLite database</span>
vn_milvus.connect_to_sqlite(sqlite_path)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Train-with-data" class="common-anchor-header">使用数据进行训练<button data-href="#Train-with-data" class="anchor-icon" translate="no">
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
    </button></h2><p>我们可以在 SQLite 数据库的 DDL 数据上训练模型。我们获取 DDL 数据并将其输入<code translate="no">train</code> 函数。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># If there exists training data, we should remove it before training.</span>
existing_training_data = vn_milvus.get_training_data()
<span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(existing_training_data) &gt; <span class="hljs-number">0</span>:
    <span class="hljs-keyword">for</span> _, training_data <span class="hljs-keyword">in</span> existing_training_data.iterrows():
        vn_milvus.remove_training_data(training_data[<span class="hljs-string">&quot;id&quot;</span>])

<span class="hljs-comment"># Get the DDL of the SQLite database</span>
df_ddl = vn_milvus.run_sql(<span class="hljs-string">&quot;SELECT type, sql FROM sqlite_master WHERE sql is not null&quot;</span>)

<span class="hljs-comment"># Train the model on the DDL data</span>
<span class="hljs-keyword">for</span> ddl <span class="hljs-keyword">in</span> df_ddl[<span class="hljs-string">&quot;sql&quot;</span>].to_list():
    vn_milvus.train(ddl=ddl)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Adding ddl: CREATE TABLE Customer (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Company TEXT NOT NULL,
    City TEXT NOT NULL,
    Phone TEXT NOT NULL
)
Adding ddl: CREATE TABLE sqlite_sequence(name,seq)
Adding ddl: CREATE TABLE Company (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Industry TEXT NOT NULL,
    Location TEXT NOT NULL,
    EmployeeCount INTEGER NOT NULL
)
Adding ddl: CREATE TABLE User (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username TEXT NOT NULL UNIQUE,
    Email TEXT NOT NULL UNIQUE
)
</code></pre>
<p>除了对 DDL 数据进行训练，我们还可以对数据库的文档和 SQL 查询进行训练。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add documentation about your business terminology or definitions.</span>
vn_milvus.train(
    documentation=<span class="hljs-string">&quot;ABC Corp specializes in cutting-edge technology solutions and innovation.&quot;</span>
)
vn_milvus.train(
    documentation=<span class="hljs-string">&quot;XYZ Inc is a global leader in manufacturing and supply chain management.&quot;</span>
)

<span class="hljs-comment"># You can also add SQL queries to your training data.</span>
vn_milvus.train(sql=<span class="hljs-string">&quot;SELECT * FROM Customer WHERE Name = &#x27;John Doe&#x27;&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Adding documentation....
Adding documentation....
Using model gpt-3.5-turbo for 65.0 tokens (approx)
Question generated with sql: What are the details of the customer named John Doe? 
Adding SQL...





'595b185c-e6ad-47b0-98fd-0e93ef9b6a0a-sql'
</code></pre>
<p>让我们来看看训练数据。</p>
<pre><code translate="no" class="language-python">training_data = vn_milvus.get_training_data()
training_data
<button class="copy-code-btn"></button></code></pre>
<div>
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>id</th>
      <th>问题</th>
      <th>内容</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>595b185c-e6ad-47b0-98fd-0e93ef9b6a0a-sql</td>
      <td>名为 Joh... 的客户的详细信息是什么？</td>
      <td>SELECT * FROM Customer WHERE Name = "John Doe</td>
    </tr>
    <tr>
      <th>0</th>
      <td>25f4956c-e370-4097-994f-996f22d145fa-ddl</td>
      <td>无</td>
      <td>CREATE TABLE Company（ID INTEGER PRIMARY...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>b95ecc66-f65b-49dc-a9f1-c1842ad230ff-ddl</td>
      <td>无</td>
      <td>CREATE TABLE Customer（客户 ID INTEGER PRIMAR...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>fcc73d15-30a5-4421-9d73-b8c3b0ed5305-ddl</td>
      <td>无</td>
      <td>CREATE TABLE sqlite_sequence(name,seq)</td>
    </tr>
    <tr>
      <th>3</th>
      <td>feae618c-5910-4f6f-8b4b-6cc3e03aec06-ddl</td>
      <td>无</td>
      <td>CREATE TABLE User（ID INTEGER PRIMARY KE...</td>
    </tr>
    <tr>
      <th>0</th>
      <td>79a48db1-ba1f-4fd5-be99-74f2ca2eaeeb-doc</td>
      <td>无</td>
      <td>XYZ Inc 是一家全球领先的制造和销售公司。</td>
    </tr>
    <tr>
      <th>1</th>
      <td>9f9df1b8-ae62-4823-ad28-d7e0f2d1f4c0-doc</td>
      <td>无</td>
      <td>ABC Corp 专门从事尖端技术的研发和生产。</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Generate-SQLs-and-execute-them" class="common-anchor-header">生成并执行 SQL<button data-href="#Generate-SQLs-and-execute-them" class="anchor-icon" translate="no">
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
    </button></h2><p>由于我们已经对 DDL 数据进行了训练，因此现在可以使用表结构来生成 SQL 查询。</p>
<p>让我们尝试一个简单的问题。</p>
<pre><code translate="no" class="language-python">sql = vn_milvus.<span class="hljs-title function_">generate_sql</span>(<span class="hljs-string">&quot;what is the phone number of John Doe?&quot;</span>)
vn_milvus.<span class="hljs-title function_">run_sql</span>(sql)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">SQL Prompt: [{'role': 'system', 'content': &quot;You are a SQLite expert. Please help to generate a SQL query to answer the question. Your response should ONLY be based on the given context and follow the response guidelines and format instructions. \n===Tables \nCREATE TABLE Customer (\n    ID INTEGER PRIMARY KEY AUTOINCREMENT,\n    Name TEXT NOT NULL,\n    Company TEXT NOT NULL,\n    City TEXT NOT NULL,\n    Phone TEXT NOT NULL\n)\n\nCREATE TABLE User (\n    ID INTEGER PRIMARY KEY AUTOINCREMENT,\n    Username TEXT NOT NULL UNIQUE,\n    Email TEXT NOT NULL UNIQUE\n)\n\n\n===Additional Context \n\nABC Corp specializes in cutting-edge technology solutions and innovation.\n\nXYZ Inc is a global leader in manufacturing and supply chain management.\n\n===Response Guidelines \n1. If the provided context is sufficient, please generate a valid SQL query without any explanations for the question. \n2. If the provided context is almost sufficient but requires knowledge of a specific string in a particular column, please generate an intermediate SQL query to find the distinct strings in that column. Prepend the query with a comment saying intermediate_sql \n3. If the provided context is insufficient, please explain why it can't be generated. \n4. Please use the most relevant table(s). \n5. If the question has been asked and answered before, please repeat the answer exactly as it was given before. \n&quot;}, {'role': 'user', 'content': 'What are the details of the customer named John Doe?'}, {'role': 'assistant', 'content': &quot;SELECT * FROM Customer WHERE Name = 'John Doe'&quot;}, {'role': 'user', 'content': 'what is the phone number of John Doe?'}]
Using model gpt-3.5-turbo for 367.25 tokens (approx)
LLM Response: SELECT Phone FROM Customer WHERE Name = 'John Doe'
</code></pre>
<div>
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>电话</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>123-456-7890</td>
    </tr>
  </tbody>
</table>
</div>
<p>下面是一个更复杂的问题。制造公司名称信息在文档数据中，属于背景信息。生成的 SQL 查询将根据特定的制造公司名称检索客户信息。</p>
<pre><code translate="no" class="language-python">sql = vn_milvus.<span class="hljs-title function_">generate_sql</span>(<span class="hljs-string">&quot;which customer works for a manufacturing corporation?&quot;</span>)
vn_milvus.<span class="hljs-title function_">run_sql</span>(sql)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">SQL Prompt: [{'role': 'system', 'content': &quot;You are a SQLite expert. Please help to generate a SQL query to answer the question. Your response should ONLY be based on the given context and follow the response guidelines and format instructions. \n===Tables \nCREATE TABLE Company (\n    ID INTEGER PRIMARY KEY AUTOINCREMENT,\n    Name TEXT NOT NULL,\n    Industry TEXT NOT NULL,\n    Location TEXT NOT NULL,\n    EmployeeCount INTEGER NOT NULL\n)\n\nCREATE TABLE Customer (\n    ID INTEGER PRIMARY KEY AUTOINCREMENT,\n    Name TEXT NOT NULL,\n    Company TEXT NOT NULL,\n    City TEXT NOT NULL,\n    Phone TEXT NOT NULL\n)\n\n\n===Additional Context \n\nXYZ Inc is a global leader in manufacturing and supply chain management.\n\nABC Corp specializes in cutting-edge technology solutions and innovation.\n\n===Response Guidelines \n1. If the provided context is sufficient, please generate a valid SQL query without any explanations for the question. \n2. If the provided context is almost sufficient but requires knowledge of a specific string in a particular column, please generate an intermediate SQL query to find the distinct strings in that column. Prepend the query with a comment saying intermediate_sql \n3. If the provided context is insufficient, please explain why it can't be generated. \n4. Please use the most relevant table(s). \n5. If the question has been asked and answered before, please repeat the answer exactly as it was given before. \n&quot;}, {'role': 'user', 'content': 'What are the details of the customer named John Doe?'}, {'role': 'assistant', 'content': &quot;SELECT * FROM Customer WHERE Name = 'John Doe'&quot;}, {'role': 'user', 'content': 'which customer works for a manufacturing corporation?'}]
Using model gpt-3.5-turbo for 384.25 tokens (approx)
LLM Response: SELECT * 
FROM Customer 
WHERE Company = 'XYZ Inc'
</code></pre>
<div>
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>ID</th>
      <th>名称</th>
      <th>公司名称</th>
      <th>城市</th>
      <th>电话</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>简-史密斯</td>
      <td>XYZ Inc</td>
      <td>洛杉矶</td>
      <td>098-765-4321</td>
    </tr>
  </tbody>
</table>
</div>
<p>断开 SQLite 和 Milvus 的连接并将其删除，以释放资源。</p>
<pre><code translate="no" class="language-python">sql_connect.<span class="hljs-built_in">close</span>()
milvus_client.<span class="hljs-built_in">close</span>()

os.remove(sqlite_path)
<span class="hljs-keyword">if</span> os.path.exists(milvus_uri):
    os.remove(milvus_uri)
<button class="copy-code-btn"></button></code></pre>
