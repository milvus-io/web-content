---
id: integrate_with_vanna.md
summary: 이 가이드에서는 Vanna를 사용하여 데이터베이스에 저장된 데이터를 기반으로 SQL 쿼리를 생성하고 실행하는 방법을 설명합니다.
title: Vanna 및 Milvus로 SQL 작성
---
<h1 id="Write-SQL-with-Vanna-and-Milvus" class="common-anchor-header">Vanna 및 Milvus로 SQL 작성<button data-href="#Write-SQL-with-Vanna-and-Milvus" class="anchor-icon" translate="no">
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
<p><a href="https://vanna.ai/">Vanna는</a> SQL 생성 및 관련 기능을 위한 오픈 소스 Python RAG(검색 증강 생성) 프레임워크입니다. <a href="https://milvus.io/">Milvus는</a> 세계에서 가장 진보된 오픈 소스 벡터 데이터베이스로, 임베딩 유사도 검색 및 AI 애플리케이션을 강화하기 위해 구축되었습니다.</p>
<p>Vanna는 데이터에 대해 RAG '모델'을 학습시킨 다음, 데이터베이스에서 실행되도록 설정할 수 있는 SQL 쿼리를 반환하는 질문을 하는 두 가지 간단한 단계로 작동합니다. 이 가이드에서는 Vanna를 사용해 데이터베이스에 저장된 데이터를 기반으로 SQL 쿼리를 생성하고 실행하는 방법을 설명합니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>이 노트북을 실행하기 전에 다음 종속성이 설치되어 있는지 확인하세요:</p>
<pre><code translate="no" class="language-python">$ pip install <span class="hljs-string">&quot;vanna[milvus,openai]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우, 방금 설치한 종속성을 사용하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 "런타임" 메뉴를 클릭하고 드롭다운 메뉴에서 "세션 다시 시작"을 선택하세요).</p>
</div>
<p>그리고 환경 변수에 <code translate="no">OPENAI_API_KEY</code> 을 설정해야 합니다. <a href="https://platform.openai.com/docs/guides/production-best-practices/api-keys">OpenAI에서</a> API 키를 받을 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Data-preparation" class="common-anchor-header">데이터 준비<button data-href="#Data-preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>먼저 Vanna의 <code translate="no">Milvus_VectorStore</code> 및 <code translate="no">OpenAI_Chat</code> 클래스를 상속하고 두 클래스의 기능을 결합한 새 클래스 <code translate="no">VannaMilvus</code> 를 정의해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, model
<span class="hljs-keyword">from</span> vanna.milvus <span class="hljs-keyword">import</span> Milvus_VectorStore
<span class="hljs-keyword">from</span> vanna.openai <span class="hljs-keyword">import</span> OpenAI_Chat


<span class="hljs-keyword">class</span> <span class="hljs-title class_">VannaMilvus</span>(Milvus_VectorStore, OpenAI_Chat):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, config=<span class="hljs-literal">None</span></span>):
        Milvus_VectorStore.__init__(<span class="hljs-variable language_">self</span>, config=config)
        OpenAI_Chat.__init__(<span class="hljs-variable language_">self</span>, config=config)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">VannaMilvus</code> 클래스를 필요한 구성 매개변수로 초기화합니다. <code translate="no">milvus_client</code> 인스턴스를 사용하여 임베딩을 저장하고, <a href="https://milvus.io/docs/embeddings.md">milvus_model에서</a> 초기화된 <code translate="no">model.DefaultEmbeddingFunction()</code> 을 사용하여 embeddings.C를 생성합니다.</p>
<div class="alert note">
<p>의 인수는 <code translate="no">MilvusClient</code> 입니다:</p>
<ul>
<li><code translate="no">uri</code> 를 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법인데, <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하여 모든 데이터를 이 파일에 저장하기 때문입니다.</li>
<li>데이터 규모가 큰 경우, <a href="https://milvus.io/docs/quickstart.md">도커나 쿠버네티스에</a> 더 고성능의 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 URL(예:<code translate="no">http://localhost:19530</code>)을 <code translate="no">uri</code> 으로 사용하세요.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">uri</code> 와 <code translate="no">token</code> 을 조정하세요.</li>
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
<p>여기서는 샘플 데이터가 적은 간단한 예제이므로 <code translate="no">n_results</code> 을 2로 설정하여 가장 유사한 상위 2개 결과를 검색하도록 합니다. 실제로는 더 큰 학습 데이터셋을 처리할 때는 <code translate="no">n_results</code> 을 더 높은 값으로 설정해야 합니다.</p>
<p>여기서는 몇 개의 샘플 데이터가 포함된 몇 개의 테이블이 있는 샘플 SQLite 데이터베이스를 사용하겠습니다.</p>
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
<h2 id="Train-with-data" class="common-anchor-header">데이터로 훈련하기<button data-href="#Train-with-data" class="anchor-icon" translate="no">
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
    </button></h2><p>SQLite 데이터베이스의 DDL 데이터로 모델을 훈련할 수 있습니다. DDL 데이터를 가져와 <code translate="no">train</code> 함수에 공급합니다.</p>
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
<p>DDL 데이터에 대한 훈련 외에도 데이터베이스의 문서와 SQL 쿼리에 대한 훈련도 가능합니다.</p>
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
<p>훈련 데이터를 살펴보겠습니다.</p>
<pre><code translate="no" class="language-python">training_data = vn_milvus.get_training_data()
training_data
<button class="copy-code-btn"></button></code></pre>
<div>
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>id</th>
      <th>question</th>
      <th>content</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>595b185c-e6ad-47b0-98fd-0e93ef9b6a0a-sql</td>
      <td>Joh...라는 고객의 세부 정보는 무엇입니까?</td>
      <td>SELECT * FROM Customer WHERE Name = 'John Doe'</td>
    </tr>
    <tr>
      <th>0</th>
      <td>25f4956c-e370-4097-994f-996f22d145fa-ddl</td>
      <td>None</td>
      <td>CREATE TABLE Company (\n ID INTEGER PRIMARY ...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>b95ecc66-f65b-49dc-a9f1-c1842ad230ff-ddl</td>
      <td>None</td>
      <td>CREATE TABLE Customer (\n ID INTEGER PRIMAR...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>fcc73d15-30a5-4421-9d73-b8c3b0ed5305-ddl</td>
      <td>None</td>
      <td>CREATE TABLE sqlite_sequence(name,seq)</td>
    </tr>
    <tr>
      <th>3</th>
      <td>feae618c-5910-4f6f-8b4b-6cc3e03aec06-ddl</td>
      <td>None</td>
      <td>CREATE TABLE User (\n ID INTEGER PRIMARY KE...</td>
    </tr>
    <tr>
      <th>0</th>
      <td>79a48db1-ba1f-4fd5-be99-74f2ca2eaeeb-doc</td>
      <td>None</td>
      <td>XYZ Inc는 제조 분야의 글로벌 리더입니다 ...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>9f9df1b8-ae62-4823-ad28-d7e0f2d1f4c0-doc</td>
      <td>없음</td>
      <td>ABC Corp는 최첨단 기술을 전문으로합니다.</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Generate-SQLs-and-execute-them" class="common-anchor-header">SQL 생성 및 실행<button data-href="#Generate-SQLs-and-execute-them" class="anchor-icon" translate="no">
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
    </button></h2><p>DDL 데이터로 학습했으므로 이제 테이블 구조로 SQL 쿼리를 생성할 수 있습니다.</p>
<p>간단한 질문을 해보겠습니다.</p>
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
      <th>Phone</th>
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
<p>좀 더 복잡한 질문입니다. 제조 법인명 정보는 배경 정보인 문서 데이터에 있습니다. 생성된 SQL 쿼리는 특정 제조 법인명을 기준으로 고객 정보를 검색합니다.</p>
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
      <th>Name</th>
      <th>회사</th>
      <th>도시</th>
      <th>전화</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>제인 스미스</td>
      <td>XYZ Inc</td>
      <td>Los Angeles</td>
      <td>098-765-4321</td>
    </tr>
  </tbody>
</table>
</div>
<p>리소스를 확보하려면 SQLite 및 Milvus와의 연결을 끊고 제거하세요.</p>
<pre><code translate="no" class="language-python">sql_connect.<span class="hljs-built_in">close</span>()
milvus_client.<span class="hljs-built_in">close</span>()

os.remove(sqlite_path)
<span class="hljs-keyword">if</span> os.path.exists(milvus_uri):
    os.remove(milvus_uri)
<button class="copy-code-btn"></button></code></pre>
