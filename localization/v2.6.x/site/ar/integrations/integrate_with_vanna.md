---
id: integrate_with_vanna.md
summary: >-
  يوضح هذا الدليل كيفية استخدام Vanna لإنشاء استعلامات SQL وتنفيذها استنادًا إلى
  بياناتك المخزنة في قاعدة بيانات.
title: كتابة SQL باستخدام Vanna و Milvus
---
<h1 id="Write-SQL-with-Vanna-and-Milvus" class="common-anchor-header">كتابة SQL باستخدام Vanna و Milvus<button data-href="#Write-SQL-with-Vanna-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/vanna_write_sql.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/vanna_write_sql.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p><a href="https://vanna.ai/">Vanna</a> هو إطار عمل مفتوح المصدر من Python RAG (التوليد المعزز للاسترجاع) لتوليد SQL والوظائف ذات الصلة. <a href="https://milvus.io/">Milvus</a> هي قاعدة البيانات المتجهة مفتوحة المصدر الأكثر تقدمًا في العالم، وهي مصممة لتشغيل تطبيقات البحث عن التشابه المضمنة وتطبيقات الذكاء الاصطناعي.</p>
<p>يعمل Vanna في خطوتين سهلتين - تدريب "نموذج" RAG على بياناتك، ثم طرح الأسئلة التي ستُعيد استعلامات SQL التي يمكن إعدادها للتشغيل على قاعدة بياناتك. يوضح هذا الدليل كيفية استخدام Vanna لإنشاء استعلامات SQL وتنفيذها استنادًا إلى بياناتك المخزنة في قاعدة البيانات.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل تشغيل هذا الدليل، تأكد من تثبيت التبعيات التالية:</p>
<pre><code translate="no" class="language-python">$ pip install <span class="hljs-string">&quot;vanna[milvus,openai]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</div>
<p>وتحتاج إلى تعيين <code translate="no">OPENAI_API_KEY</code> في متغيرات البيئة الخاصة بك. يمكنك الحصول على مفتاح API من <a href="https://platform.openai.com/docs/guides/production-best-practices/api-keys">OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Data-preparation" class="common-anchor-header">إعداد البيانات<button data-href="#Data-preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>أولاً، نحن بحاجة إلى أن نرث من فئتي <code translate="no">Milvus_VectorStore</code> و <code translate="no">OpenAI_Chat</code> من فانا وتعريف فئة جديدة <code translate="no">VannaMilvus</code> تجمع بين القدرات من كليهما.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, model
<span class="hljs-keyword">from</span> vanna.milvus <span class="hljs-keyword">import</span> Milvus_VectorStore
<span class="hljs-keyword">from</span> vanna.openai <span class="hljs-keyword">import</span> OpenAI_Chat


<span class="hljs-keyword">class</span> <span class="hljs-title class_">VannaMilvus</span>(Milvus_VectorStore, OpenAI_Chat):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, config=<span class="hljs-literal">None</span></span>):
        Milvus_VectorStore.__init__(<span class="hljs-variable language_">self</span>, config=config)
        OpenAI_Chat.__init__(<span class="hljs-variable language_">self</span>, config=config)
<button class="copy-code-btn"></button></code></pre>
<p>نقوم بتهيئة فئة <code translate="no">VannaMilvus</code> بمعلمات التكوين اللازمة. نستخدم مثيل <code translate="no">milvus_client</code> لتخزين التضمينات و <code translate="no">model.DefaultEmbeddingFunction()</code> التي تمت تهيئتها من <a href="https://milvus.io/docs/embeddings.md">نموذج ميلفوس</a> لتوليد التضمينات.C</p>
<div class="alert note">
<p>أما بالنسبة لحجة <code translate="no">MilvusClient</code>:</p>
<ul>
<li>يعد تعيين <code translate="no">uri</code> كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، هو الطريقة الأكثر ملاءمة، حيث يستخدم تلقائيًا <a href="https://milvus.io/docs/milvus_lite.md">ميلفوس لايت</a> لتخزين جميع البيانات في هذا الملف.</li>
<li>إذا كان لديك حجم كبير من البيانات، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/quickstart.md">docker أو kubernetes</a>. في هذا الإعداد، يُرجى استخدام الخادم uri، على سبيل المثال<code translate="no">http://localhost:19530</code> ، كـ <code translate="no">uri</code>.</li>
<li>إذا كنت ترغب في استخدام <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، اضبط <code translate="no">uri</code> و <code translate="no">token</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">نقطة النهاية العامة ومفتاح Api</a> في Zilliz Cloud.</li>
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
<p>هذا مثال بسيط مع عينة قليلة فقط من البيانات، لذلك قمنا بتعيين <code translate="no">n_results</code> إلى 2 للتأكد من أننا نبحث عن أعلى نتيجتين متشابهتين. من الناحية العملية، يجب عليك تعيين <code translate="no">n_results</code> إلى قيمة أعلى عند التعامل مع مجموعة بيانات تدريبية أكبر.</p>
<p>سنستخدم عينة من قاعدة بيانات SQLite مع عدد قليل من الجداول التي تحتوي على بعض البيانات النموذجية.</p>
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
<h2 id="Train-with-data" class="common-anchor-header">تدريب مع البيانات<button data-href="#Train-with-data" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكننا تدريب النموذج على بيانات DDL لقاعدة بيانات SQLite. نحصل على بيانات الـ DDL ونغذي بها الدالة <code translate="no">train</code>.</p>
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
<p>إلى جانب التدريب على بيانات DDL، يمكننا أيضًا التدريب على الوثائق واستعلامات SQL لقاعدة البيانات.</p>
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
<p>دعونا نلقي نظرة على بيانات التدريب.</p>
<pre><code translate="no" class="language-python">training_data = vn_milvus.get_training_data()
training_data
<button class="copy-code-btn"></button></code></pre>
<div>
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>المعرف</th>
      <th>السؤال</th>
      <th>المحتوى</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>595b185c-e6ad-47b0-98fd-0e93ef9b6a0a-sql</td>
      <td>ما هي تفاصيل العميل المسمى Joh....</td>
      <td>حدد * من العميل حيث الاسم = "مجهول الهوية</td>
    </tr>
    <tr>
      <th>0</th>
      <td>25f4956c-e370-4097-994f-996f22d145fa-ddl</td>
      <td>لا يوجد</td>
      <td>إنشاء جدول إنشاء جدول الشركة (\nالمعرف INTEGER PRIMARY...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>b95ecc66-f65b-49dc-a9f1-c1842ad230ff-ddl</td>
      <td>لا يوجد</td>
      <td>إنشاء جدول إنشاء جدول العميل (المعرف INTEGER PRIMAR...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>fcc73d15-30a5-4421-9d73-b8c3b0ed5305-ddl</td>
      <td>لا يوجد</td>
      <td>إنشاء جدول sqlite_sequence (الاسم، تسلسل)</td>
    </tr>
    <tr>
      <th>3</th>
      <td>feae618c-5910-4f6f-8b4b-6cc3e03aec06-ddl</td>
      <td>لا يوجد</td>
      <td>إنشاء جدول إنشاء مستخدم (\nالمعرف INTEGER PRIMARY KE....</td>
    </tr>
    <tr>
      <th>0</th>
      <td>79a48db1-ba1f-4fd5-be99-74f2ca2eaeeb-doc</td>
      <td>لا يوجد</td>
      <td>شركة XYZ Inc هي شركة رائدة عالميًا في مجال التصنيع...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>9f9df1b8-ae62-4823-ad28-d7e0f2d1f4c0-doc</td>
      <td>لا يوجد</td>
      <td>تتخصص شركة ABC Corp في مجال التكنولوجيا المتطورة...</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Generate-SQLs-and-execute-them" class="common-anchor-header">إنشاء SQLs وتنفيذها<button data-href="#Generate-SQLs-and-execute-them" class="anchor-icon" translate="no">
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
    </button></h2><p>كما تدربنا على بيانات DDL، أصبحت بنية الجدول متاحة الآن لإنشاء استعلامات SQL.</p>
<p>لنجرب سؤالًا بسيطًا.</p>
<pre><code translate="no" class="language-python">sql = vn_milvus.generate_sql(<span class="hljs-string">&quot;what is the phone number of John Doe?&quot;</span>)
vn_milvus.run_sql(sql)
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
      <th>الهاتف</th>
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
<p>هنا سؤال أكثر تعقيداً. معلومات اسم شركة التصنيع موجودة في بيانات المستند، وهي معلومات أساسية. سيقوم استعلام SQL الذي تم إنشاؤه باسترداد معلومات العميل بناءً على اسم شركة التصنيع المحددة.</p>
<pre><code translate="no" class="language-python">sql = vn_milvus.generate_sql(<span class="hljs-string">&quot;which customer works for a manufacturing corporation?&quot;</span>)
vn_milvus.run_sql(sql)
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
      <th>المعرف</th>
      <th>الاسم</th>
      <th>الشركة</th>
      <th>المدينة</th>
      <th>رقم الهاتف</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>جين سميث</td>
      <td>شركة XYZ</td>
      <td>لوس أنجلوس</td>
      <td>098-765-4321</td>
    </tr>
  </tbody>
</table>
</div>
<p>افصل عن SQLite و Milvus وقم بإزالتها لتحرير الموارد.</p>
<pre><code translate="no" class="language-python">sql_connect.close()
milvus_client.close()

os.remove(sqlite_path)
<span class="hljs-keyword">if</span> os.path.exists(milvus_uri):
    os.remove(milvus_uri)
<button class="copy-code-btn"></button></code></pre>
