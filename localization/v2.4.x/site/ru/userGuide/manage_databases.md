---
id: manage_databases.md
title: Управление базами данных
---
<h1 id="Manage-Databases" class="common-anchor-header">Управление базами данных<button data-href="#Manage-Databases" class="anchor-icon" translate="no">
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
    </button></h1><p>Как и в традиционных системах баз данных, в Milvus можно создавать базы данных и назначать определенным пользователям привилегии для управления ими. Затем эти пользователи получают право управлять коллекциями в базах данных. Кластер Milvus поддерживает максимум 64 базы данных.</p>
<div class="alert note">
<p>Сниппеты кода на этой странице используют <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">модуль PyMilvus ORM</a> для взаимодействия с Milvus. Сниппеты кода с новым <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient SDK</a> будут доступны в ближайшее время.</p>
</div>
<h2 id="Create-database" class="common-anchor-header">Создание базы данных<button data-href="#Create-database" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Используйте <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">connect()</a> для подключения к серверу Milvus и <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/db/create_database.md">create_database()</a> для создания новой базы данных:</p>
</div>
<div class="language-java">
<p>Используйте <a href="https://milvus.io/api-reference/java/v2.4.x/v1/Connections/MilvusClient.md">MilvusClient</a> для подключения к серверу Milvus и <a href="https://milvus.io/api-reference/java/v2.4.x/v1/Database/createDatabase.md">createDatabase()</a> для создания новой базы данных:</p>
</div>
<div class="language-javascript">
<p>Используйте <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md">MilvusClient</a> для подключения к серверу Milvus и <a href="https://milvus.io/api-reference/node/v2.4.x/Database/createDatabase.md">createDatabase()</a> для создания новой базы данных:</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, db

conn = connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)

database = db.<span class="hljs-title function_">create_database</span>(<span class="hljs-string">&quot;my_database&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.client.MilvusServiceClient;
<span class="hljs-keyword">import</span> io.milvus.param.ConnectParam;
<span class="hljs-keyword">import</span> io.milvus.param.collection.CreateDatabaseParam;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectParam</span> <span class="hljs-variable">connectParam</span> <span class="hljs-operator">=</span> ConnectParam.newBuilder()
    .withUri(CLUSTER_ENDPOINT)
    .withToken(TOKEN)
    .build();

<span class="hljs-type">MilvusServiceClient</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusServiceClient</span>(connectParam);

<span class="hljs-comment">// 3. Create a new database</span>
<span class="hljs-type">CreateDatabaseParam</span> <span class="hljs-variable">createDatabaseParam</span> <span class="hljs-operator">=</span> CreateDatabaseParam.newBuilder()
    .withDatabaseName(<span class="hljs-string">&quot;&quot;</span>)
    .build();

R&lt;RpcStatus&gt; response = client.createDatabase(createDatabaseParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ address });

<span class="hljs-comment">// 3. Create a database</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createDatabase</span>({
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database&quot;</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);

<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//   reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//   code: 0,</span>
<span class="hljs-comment">//   retriable: false,</span>
<span class="hljs-comment">//   detail: &#x27;&#x27;</span>
<span class="hljs-comment">// }</span>
<button class="copy-code-btn"></button></code></pre>
<p>Приведенные выше фрагменты кода подключаются к базе данных по умолчанию и создают новую базу данных с именем <code translate="no">my_database</code>.</p>
<h2 id="Use-a-database" class="common-anchor-header">Использование базы данных<button data-href="#Use-a-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Кластер Milvus поставляется с базой данных по умолчанию, названной 'default'. Коллекции создаются в базе данных по умолчанию, если не указано иное.</p>
<p>Чтобы изменить базу данных по умолчанию, выполните следующие действия:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">db.<span class="hljs-title function_">using_database</span>(<span class="hljs-string">&quot;my_database&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// No equivalent method is available.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Activate another database</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">useDatabase</span>({
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database&quot;</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
<button class="copy-code-btn"></button></code></pre>
<p>Вы также можете задать базу данных, которая будет использоваться при подключении к кластеру Milvus, следующим образом:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">conn = connections.<span class="hljs-title function_">connect</span>(
    host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>,
    port=<span class="hljs-string">&quot;19530&quot;</span>,
    db_name=<span class="hljs-string">&quot;my_database&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">ConnectParam</span> <span class="hljs-variable">connectParam</span> <span class="hljs-operator">=</span> ConnectParam.newBuilder()
    .withDatabaseName(<span class="hljs-string">&quot;my_database&quot;</span>)
    .withUri(CLUSTER_ENDPOINT)
    .withToken(TOKEN)
    .build();

<span class="hljs-type">MilvusServiceClient</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusServiceClient</span>(connectParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> db_name = <span class="hljs-string">&quot;my_database&quot;</span>;

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ address, db_name });
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-databases" class="common-anchor-header">Список баз данных<button data-href="#List-databases" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Чтобы найти все существующие базы данных в вашем кластере Milvus, используйте метод <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/db/list_database.md">list_database()</a>:</p>
</div>
<div class="language-java">
<p>Чтобы найти все существующие базы данных в вашем кластере Milvus, используйте метод <a href="https://milvus.io/api-reference/java/v2.4.x/v1/Database/listDatabases.md">listDatabases()</a>:</p>
</div>
<div class="language-javascript">
<p>Чтобы найти все существующие базы данных в вашем кластере Milvus, используйте метод <a href="https://milvus.io/api-reference/node/v2.4.x/Database/listDatabases.md">listDatabases()</a>:</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">db.list_database()

<span class="hljs-comment"># Output</span>
[<span class="hljs-string">&#x27;default&#x27;</span>, <span class="hljs-string">&#x27;my_database&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.grpc.ListDatabasesResponse;
<span class="hljs-keyword">import</span> io.milvus.param.R;

<span class="hljs-comment">// 2. List all databases</span>
R&lt;ListDatabasesResponse&gt; listDatabasesResponse = client.listDatabases();
System.out.<span class="hljs-built_in">println</span>(listDatabasesResponse.getData());

<span class="hljs-comment">// status {</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// db_names: &quot;default&quot;</span>
<span class="hljs-comment">// db_names: &quot;my_database&quot;</span>
<span class="hljs-comment">// created_timestamp: 1716794498117757990</span>
<span class="hljs-comment">// created_timestamp: 1716797196479639477</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listDatabases</span>();

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">db_names</span>);

<span class="hljs-comment">// [ &#x27;default&#x27;, &#x27;my_database&#x27; ]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-database" class="common-anchor-header">Сбросить базу данных<button data-href="#Drop-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы сбросить базу данных, необходимо сначала сбросить все ее коллекции. В противном случае сброс не удастся.</p>
<div class="language-python">
<p>Чтобы сбросить базу данных, используйте метод <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/db/drop_database.md">drop_database()</a>:</p>
</div>
<div class="language-java">
<p>Чтобы сбросить базу данных, используйте метод <a href="https://milvus.io/api-reference/java/v2.4.x/v1/Database/dropDatabase.md">dropDatabase()</a>:</p>
</div>
<div class="language-javascript">
<p>Чтобы сбросить базу данных, используйте метод <a href="https://milvus.io/api-reference/node/v2.4.x/Database/dropDatabase.md">dropDatabase()</a>:</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">db.drop_database(<span class="hljs-string">&quot;my_database&quot;</span>)

db.list_database()

<span class="hljs-comment"># Output</span>
[<span class="hljs-string">&#x27;default&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.collection.DropDatabaseParam;

<span class="hljs-type">DropDatabaseParam</span> <span class="hljs-variable">dropDatabaseParam</span> <span class="hljs-operator">=</span> DropDatabaseParam.newBuilder()
    .withDatabaseName(<span class="hljs-string">&quot;my_database&quot;</span>)
    .build();

response = client.dropDatabase(dropDatabaseParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropDatabase</span>({
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-RBAC-with-database" class="common-anchor-header">Использование RBAC с базой данных<button data-href="#Use-RBAC-with-database" class="anchor-icon" translate="no">
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
    </button></h2><p>RBAC также охватывает операции с базами данных и обеспечивает совместимость с ними. Слово <strong>database</strong> в API разрешений (Grant / Revoke / List Grant) имеет следующие значения:</p>
<ul>
<li>Если ни в соединении Milvus, ни в вызове Permission API не указан <code translate="no">db_name</code>, то под словом <strong>database</strong> подразумевается база данных по умолчанию.</li>
<li>Если в соединении Milvus указан <code translate="no">db_name</code>, а в последующем вызове Permission API - нет, то <strong>база данных</strong> ссылается на базу данных, имя которой было указано в соединении Milvus.</li>
<li>Если вызов Permission API выполняется по соединению Milvus, с указанием или без указания <code translate="no">db_name</code>, <strong>база данных</strong> ссылается на базу данных, имя которой было указано в вызове Permission API.</li>
</ul>
<p>Следующий фрагмент кода является общим для всех перечисленных ниже блоков.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Role

_URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
_TOKEN = <span class="hljs-string">&quot;root:Milvus&quot;</span>
_DB_NAME = <span class="hljs-string">&quot;default&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">connect_to_milvus</span>(<span class="hljs-params">db_name=<span class="hljs-string">&quot;default&quot;</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;connect to milvus\n&quot;</span>)
    connections.connect(
        uri=_URI,
        token=_TOKEN,
        db_name=db_name
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">URI</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;

<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ConnectToMilvus</span> {
    <span class="hljs-keyword">private</span> <span class="hljs-type">String</span> <span class="hljs-variable">_dbName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;default&quot;</span>;

    <span class="hljs-keyword">public</span> <span class="hljs-title function_">newBuilder</span><span class="hljs-params">()</span> {}

    <span class="hljs-keyword">public</span> MilvusServiceClient <span class="hljs-title function_">build</span><span class="hljs-params">()</span> {
        <span class="hljs-type">ConnectParam</span> <span class="hljs-variable">connectParam</span> <span class="hljs-operator">=</span> ConnectParam.newBuilder()
            .withUri(URI)
            .withToken(TOKEN)
            .withDatabaseName(_dbNAME)
            .build();

        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusServiceClient</span>(connectParam);
    }

    <span class="hljs-keyword">public</span> newBuilder <span class="hljs-title function_">withDbName</span><span class="hljs-params">(String dbName)</span> {
        <span class="hljs-built_in">this</span>._dbName = dbName;
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">this</span>;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">connectToMilvus</span>(<span class="hljs-params">dbName = <span class="hljs-string">&quot;default&quot;</span></span>) {
    <span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
        address,
        token,
        dbName,
    });

    <span class="hljs-keyword">return</span> client;
}
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p>Если ни в соединении Milvus, ни в вызове Permission API не указан <code translate="no">db_name</code>, <strong>база данных</strong> ссылается на базу данных по умолчанию.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">_ROLE_NAME = <span class="hljs-string">&quot;test_role&quot;</span>
_PRIVILEGE_INSERT = <span class="hljs-string">&quot;Insert&quot;</span>

connect_to_milvus()
role = Role(_ROLE_NAME)
role.create()

connect_to_milvus()
role.grant(<span class="hljs-string">&quot;Collection&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, _PRIVILEGE_INSERT)
<span class="hljs-built_in">print</span>(role.list_grants())
<span class="hljs-built_in">print</span>(role.list_grant(<span class="hljs-string">&quot;Collection&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>))
role.revoke(<span class="hljs-string">&quot;Global&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, _PRIVILEGE_INSERT)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">ROLE_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;test_role&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">PRIVILEGE_INSERT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;Insert&quot;</span>;

<span class="hljs-type">MilvusServiceClient</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ConnectToMilvus</span>().build();
R&lt;RpcStatus&gt; response = client.createRole(CreateRoleParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .build());

<span class="hljs-keyword">if</span> (response.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(response.getMessage());
}

response = client.grantRolePrivilege(GrantRolePriviledgeParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .withObject(<span class="hljs-string">&quot;Collection&quot;</span>)
    .withObjectName(<span class="hljs-string">&quot;*&quot;</span>)
    .withPrivilege(PRIVILEGE_INSERT)
    .build());

<span class="hljs-keyword">if</span> (response.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(response.getMessage());
}

R&lt;SelectGrantResponse&gt; grants = client.selectGrantForRole(SelectGrantForRoleParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .build());

<span class="hljs-keyword">if</span> (grants.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(grants.getMessage());
}

System.out.println(grants.getData());

grants = client.selectGrantForRoleAndObject(SelectGrantForRoleAndObjectParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .withObject(<span class="hljs-string">&quot;Collection&quot;</span>)
    .withObjectName(<span class="hljs-string">&quot;*&quot;</span>)
    .build());

<span class="hljs-keyword">if</span> (grants.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(grants.getMessage());
}

System.out.println(grants.getData());

response = client.revokeRolePrivilege(RevokeRolePrivilegeParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .withObject(<span class="hljs-string">&quot;Global&quot;</span>)
    .withObjectName(<span class="hljs-string">&quot;*&quot;</span>)
    .withPrivilege(PRIVILEGE_INSERT)
    .build());

<span class="hljs-keyword">if</span> (response.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(response.getMessage());
}

response = client.revokeRolePrivilege(RevokeRolePrivilegeParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .withObject(<span class="hljs-string">&quot;Global&quot;</span>)
    .withObjectName(<span class="hljs-string">&quot;*&quot;</span>)
    .withPrivilege(PRIVILEGE_INSERT)
    .build());

<span class="hljs-keyword">if</span> (response.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(response.getMessage());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">ROLE_NAME</span> = <span class="hljs-string">&quot;test_role&quot;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">PRIVILEGE_INSERT</span> = <span class="hljs-string">&quot;Insert&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-title function_">connectToMilvus</span>();

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">demo</span>(<span class="hljs-params"></span>) {}
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createRole</span>({
  <span class="hljs-attr">roleName</span>: <span class="hljs-variable constant_">ROLE_NAME</span>,
});

<span class="hljs-keyword">const</span> grants = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listGrants</span>({
  <span class="hljs-attr">roleName</span>: <span class="hljs-variable constant_">ROLE_NAME</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(grants.<span class="hljs-property">grants</span>);

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilege</span>({
  <span class="hljs-attr">roleName</span>: <span class="hljs-variable constant_">ROLE_NAME</span>,
  <span class="hljs-attr">object</span>: <span class="hljs-string">&quot;Global&quot;</span>,
  <span class="hljs-attr">objectName</span>: <span class="hljs-string">&quot;*&quot;</span>,
  <span class="hljs-attr">privilege</span>: <span class="hljs-variable constant_">PRIVILEGE_INSERT</span>,
});
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Если в соединении Milvus указан <code translate="no">db_name</code>, а в последующем вызове Permission API - нет, то <strong>база данных</strong> ссылается на базу данных, имя которой было указано в соединении Milvus.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># <span class="hljs-doctag">NOTE:</span> please make sure the &#x27;foo&#x27; db has been created</span>
connect_to_milvus(db_name=<span class="hljs-string">&quot;foo&quot;</span>)

<span class="hljs-comment"># This role will have the insert permission of all collections under foo db,</span>
<span class="hljs-comment"># excluding the insert permissions of collections under other dbs</span>
role.grant(<span class="hljs-string">&quot;Collection&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, _PRIVILEGE_INSERT)
<span class="hljs-built_in">print</span>(role.list_grants())
<span class="hljs-built_in">print</span>(role.list_grant(<span class="hljs-string">&quot;Collection&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>))
role.revoke(<span class="hljs-string">&quot;Global&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, _PRIVILEGE_INSERT)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// <span class="hljs-doctag">NOTE:</span> please make sure the &#x27;foo&#x27; db has been created</span>
MilvusServiceClient client = <span class="hljs-keyword">new</span> ConnectToMilvus().withDbName(<span class="hljs-string">&quot;foo&quot;</span>).build();

<span class="hljs-comment">// This role will have the insert permission of all collections under foo db,</span>
<span class="hljs-comment">// excluding the insert permissions of collections under other dbs</span>
R&lt;RpcStatus&gt; response = client.grantRolePrivilege(GrantRolePriviledgeParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .withObject(<span class="hljs-string">&quot;Collection&quot;</span>)
    .withObjectName(<span class="hljs-string">&quot;*&quot;</span>)
    .withPrivilege(PRIVILEGE_INSERT)
    .build());

<span class="hljs-keyword">if</span> (response.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> RuntimeException(response.getMessage());
}

R&lt;SelectGrantResponse&gt; grants = client.selectGrantForRole(SelectGrantForRoleParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .build());

<span class="hljs-keyword">if</span> (grants.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> RuntimeException(grants.getMessage());
}

System.<span class="hljs-keyword">out</span>.println(grants.getData());

grants = client.selectGrantForRoleAndObject(SelectGrantForRoleAndObjectParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .withObject(<span class="hljs-string">&quot;Collection&quot;</span>)
    .withObjectName(<span class="hljs-string">&quot;*&quot;</span>)
    .build());

<span class="hljs-keyword">if</span> (grants.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> RuntimeException(grants.getMessage());
}

System.<span class="hljs-keyword">out</span>.println(grants.getData());

response = client.revokeRolePrivilege(RevokeRolePrivilegeParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .withObject(<span class="hljs-string">&quot;Global&quot;</span>)
    .withObjectName(<span class="hljs-string">&quot;*&quot;</span>)
    .withPrivilege(PRIVILEGE_INSERT)
    .build());

<span class="hljs-keyword">if</span> (response.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> RuntimeException(response.getMessage());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> client = <span class="hljs-title function_">connectToMilvus</span>(<span class="hljs-string">&quot;foo&quot;</span>);

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">demo</span>(<span class="hljs-params"></span>) {}
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createRole</span>({
  <span class="hljs-attr">roleName</span>: <span class="hljs-variable constant_">ROLE_NAME</span>,
});

<span class="hljs-keyword">const</span> grants = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listGrants</span>({
  <span class="hljs-attr">roleName</span>: <span class="hljs-variable constant_">ROLE_NAME</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(grants.<span class="hljs-property">grants</span>);

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilege</span>({
  <span class="hljs-attr">roleName</span>: <span class="hljs-variable constant_">ROLE_NAME</span>,
  <span class="hljs-attr">object</span>: <span class="hljs-string">&quot;Global&quot;</span>,
  <span class="hljs-attr">objectName</span>: <span class="hljs-string">&quot;*&quot;</span>,
  <span class="hljs-attr">privilege</span>: <span class="hljs-variable constant_">PRIVILEGE_INSERT</span>,
});
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Если вызов Permission API выполняется по соединению Milvus, с указанием или без указания <code translate="no">db_name</code>, <strong>база данных</strong> ссылается на базу данных, имя которой было указано в вызове Permission API.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># <span class="hljs-doctag">NOTE:</span> please make sure the &#x27;foo&#x27; db has been created</span>

db_name = <span class="hljs-string">&quot;foo&quot;</span>
connect_to_milvus()
role.grant(<span class="hljs-string">&quot;Collection&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, _PRIVILEGE_INSERT, db_name=db_name)
<span class="hljs-built_in">print</span>(role.list_grants(db_name=db_name))
<span class="hljs-built_in">print</span>(role.list_grant(<span class="hljs-string">&quot;Collection&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, db_name=db_name))
role.revoke(<span class="hljs-string">&quot;Global&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, _PRIVILEGE_INSERT, db_name=db_name)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// <span class="hljs-doctag">NOTE:</span> please make sure the &#x27;foo&#x27; db has been created</span>

<span class="hljs-type">String</span> <span class="hljs-variable">dbName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;foo&quot;</span>;
<span class="hljs-type">MilvusServiceClient</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ConnectToMilvus</span>().build();

R&lt;RpcStatus&gt; response = client.grantRolePrivilege(GrantRolePriviledgeParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .withObject(<span class="hljs-string">&quot;Collection&quot;</span>)
    .withObjectName(<span class="hljs-string">&quot;*&quot;</span>)
    .withPrivilege(PRIVILEGE_INSERT)
    .withDatabaseName(dbName)
    .build());

<span class="hljs-keyword">if</span> (response.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(response.getMessage());
}

R&lt;SelectGrantResponse&gt; grants = client.selectGrantForRole(SelectGrantForRoleParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .withDatabaseName(dbName)
    .build());

<span class="hljs-keyword">if</span> (grants.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(grants.getMessage());
}

System.out.println(grants.getData());

grants = client.selectGrantForRoleAndObject(SelectGrantForRoleAndObjectParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .withObject(<span class="hljs-string">&quot;Collection&quot;</span>)
    .withObjectName(<span class="hljs-string">&quot;*&quot;</span>)
    .withDatabaseName(dbName)
    .build());

<span class="hljs-keyword">if</span> (grants.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(grants.getMessage());
}

System.out.println(grants.getData());

response = client.revokeRolePrivilege(RevokeRolePrivilegeParam.newBuilder()
    .withRoleName(ROLE_NAME)
    .withObject(<span class="hljs-string">&quot;Global&quot;</span>)
    .withObjectName(<span class="hljs-string">&quot;*&quot;</span>)
    .withPrivilege(PRIVILEGE_INSERT)
    .withDatabaseName(dbName)
    .build());

<span class="hljs-keyword">if</span> (response.getStatus() != R.Status.Success.getCode()) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(response.getMessage());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// The Node.js SDK currently cannot support this case.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/ru/v2.4.x/rbac.md">Включить RBAC</a></p></li>
<li><p><a href="/docs/ru/v2.4.x/multi_tenancy.md">Многопользовательский доступ</a></p></li>
</ul>
