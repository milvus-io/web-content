---
id: generating_milvus_query_filter_expressions.md
summary: >-
  In this tutorial, we will demonstrate how to use Large Language Models (LLMs)
  to automatically generate Milvus filter expressions from natural language
  queries. This approach makes vector database querying more accessible by
  allowing users to express complex filtering conditions in plain English, which
  are then converted to proper Milvus syntax.
title: Generating Milvus Query Filter Expressions with Large Language Models
---
<h1 id="Generating-Milvus-Query-Filter-Expressions-with-Large-Language-Models" class="common-anchor-header">Generating Milvus Query Filter Expressions with Large Language Models<button data-href="#Generating-Milvus-Query-Filter-Expressions-with-Large-Language-Models" class="anchor-icon" translate="no">
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
    </button></h1><p>In this tutorial, we will demonstrate how to use Large Language Models (LLMs) to automatically generate Milvus filter expressions from natural language queries. This approach makes vector database querying more accessible by allowing users to express complex filtering conditions in plain English, which are then converted to proper Milvus syntax.</p>
<p>Milvus supports sophisticated filtering capabilities including:</p>
<ul>
<li><strong>Basic Operators</strong>: Comparison operators like <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code></li>
<li><strong>Boolean Operators</strong>: Logical operators like <code translate="no">and</code>, <code translate="no">or</code>, <code translate="no">not</code> for complex conditions</li>
<li><strong>String Operations</strong>: Pattern matching with <code translate="no">like</code> and other string functions</li>
<li><strong>Array Operations</strong>: Working with array fields using <code translate="no">array_contains</code>, <code translate="no">array_length</code>, etc.</li>
<li><strong>JSON Operations</strong>: Querying JSON fields with specialized operators</li>
</ul>
<p>By integrating LLMs with Milvus documentation, we can create an intelligent system that understands natural language queries and generates syntactically correct filter expressions. This tutorial will walk through the process of setting up this system, highlighting its effectiveness in various filtering scenarios.</p>
<h2 id="Dependencies-and-Environment" class="common-anchor-header">Dependencies and Environment<button data-href="#Dependencies-and-Environment" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai requests docling beautifulsoup4</span>
print(&quot;Environment setup complete!&quot;)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-environment-variables" class="common-anchor-header">Set up environment variables<button data-href="#Set-up-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Configure your OpenAI API credentials to enable embedding generation and LLM-based filter expression creation. Replace <code translate="no">'your_openai_api_key'</code> with your actual OpenAI API key.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> openai

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your_openai_api_key&quot;</span>
api_key = os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>)

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> api_key:
    <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;Please set the OPENAI_API_KEY environment variable!&quot;</span>)

openai.api_key = api_key
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;API key loaded.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-Sample-Collection" class="common-anchor-header">Create a Sample Collection<button data-href="#Create-a-Sample-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Now let’s create a sample Milvus collection with user data. This collection will contain both scalar fields (for filtering) and vector embeddings (for semantic search). We’ll use OpenAI’s text embedding model to generate vector representations of user information.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">import</span> uuid

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
openai_client = OpenAI(api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>))
embedding_model = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>
embedding_dim = <span class="hljs-number">1536</span>

fields = [
    FieldSchema(
        name=<span class="hljs-string">&quot;pk&quot;</span>,
        dtype=DataType.VARCHAR,
        is_primary=<span class="hljs-literal">True</span>,
        auto_id=<span class="hljs-literal">False</span>,
        max_length=<span class="hljs-number">100</span>,
    ),
    FieldSchema(name=<span class="hljs-string">&quot;name&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">128</span>),
    FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64),
    FieldSchema(name=<span class="hljs-string">&quot;city&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">128</span>),
    FieldSchema(name=<span class="hljs-string">&quot;hobby&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">128</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
]
schema = CollectionSchema(fields=fields, description=<span class="hljs-string">&quot;User data embedding example&quot;</span>)
collection_name = <span class="hljs-string">&quot;user_data_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)
<span class="hljs-comment"># Strong consistency waits for all loads to complete, adding latency with large datasets</span>
<span class="hljs-comment"># client.create_collection(</span>
<span class="hljs-comment">#     collection_name=collection_name, schema=schema, consistency_level=&quot;Strong&quot;</span>
<span class="hljs-comment"># )</span>
client.create_collection(collection_name=collection_name, schema=schema)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
)
client.create_index(collection_name=collection_name, index_params=index_params)

data_to_insert = [
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">23</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Shanghai&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Drinking coffee&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Alice&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">29</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;New York&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Reading books&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Bob&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">31</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;London&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Playing chess&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Eve&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">27</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Paris&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Painting&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Charlie&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">35</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Tokyo&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Cycling&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Grace&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">22</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Berlin&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Photography&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;David&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">40</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Toronto&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Watching movies&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Helen&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Sydney&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Cooking&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Frank&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">28</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Beijing&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Hiking&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Ivy&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">26</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Seoul&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Dancing&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Tom&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">33</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Madrid&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Writing&quot;</span>},
]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embeddings</span>(<span class="hljs-params">texts</span>):
    <span class="hljs-keyword">return</span> [
        rec.embedding
        <span class="hljs-keyword">for</span> rec <span class="hljs-keyword">in</span> openai_client.embeddings.create(
            <span class="hljs-built_in">input</span>=texts, model=embedding_model, dimensions=embedding_dim
        ).data
    ]


texts = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{item[<span class="hljs-string">&#x27;name&#x27;</span>]}</span> from <span class="hljs-subst">{item[<span class="hljs-string">&#x27;city&#x27;</span>]}</span> is <span class="hljs-subst">{item[<span class="hljs-string">&#x27;age&#x27;</span>]}</span> years old and likes <span class="hljs-subst">{item[<span class="hljs-string">&#x27;hobby&#x27;</span>]}</span>.&quot;</span>
    <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> data_to_insert
]
embeddings = get_embeddings(texts)

insert_data = []
<span class="hljs-keyword">for</span> item, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(data_to_insert, embeddings):
    item_with_embedding = {
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-built_in">str</span>(uuid.uuid4()),
        <span class="hljs-string">&quot;name&quot;</span>: item[<span class="hljs-string">&quot;name&quot;</span>],
        <span class="hljs-string">&quot;age&quot;</span>: item[<span class="hljs-string">&quot;age&quot;</span>],
        <span class="hljs-string">&quot;city&quot;</span>: item[<span class="hljs-string">&quot;city&quot;</span>],
        <span class="hljs-string">&quot;hobby&quot;</span>: item[<span class="hljs-string">&quot;hobby&quot;</span>],
        <span class="hljs-string">&quot;embedding&quot;</span>: embedding,
    }
    insert_data.append(item_with_embedding)

client.insert(collection_name=collection_name, data=insert_data)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; has been created and data has been inserted.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Print-3-sample-data" class="common-anchor-header">Print 3 sample data<button data-href="#Print-3-sample-data" class="anchor-icon" translate="no">
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
    </button></h2><p>The code above creates a Milvus collection with the following structure:</p>
<ul>
<li><strong>pk</strong>: Primary key field (VARCHAR)</li>
<li><strong>name</strong>: User name (VARCHAR)</li>
<li><strong>age</strong>: User age (INT64)</li>
<li><strong>city</strong>: User city (VARCHAR)</li>
<li><strong>hobby</strong>: User hobby (VARCHAR)</li>
<li><strong>embedding</strong>: Vector embedding (FLOAT_VECTOR, 1536 dimensions)</li>
</ul>
<p>We have inserted 11 sample users with their personal information and generate embeddings for semantic search capabilities. Each user’s information is converted into a descriptive text that captures their name, location, age, and interests before being embedded. Let’s verify that our collection was created successfully and contains the expected data by querying a few sample records.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;user_data_collection&quot;</span>

client.load_collection(collection_name=collection_name)

result = client.query(
    collection_name=collection_name,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)

<span class="hljs-keyword">for</span> record <span class="hljs-keyword">in</span> result:
    <span class="hljs-built_in">print</span>(record)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Collecting-Milvus-Filter-Expression-Documentation" class="common-anchor-header">Collecting Milvus Filter Expression Documentation<button data-href="#Collecting-Milvus-Filter-Expression-Documentation" class="anchor-icon" translate="no">
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
    </button></h2><p>To help the large language model better understand Milvus’s filter expression syntax, we need to provide it with relevant official documentation. We’ll use the <code translate="no">docling</code> library to scrape several key pages from the official Milvus website.</p>
<p>These pages contain detailed information about:</p>
<ul>
<li><strong>Boolean operators</strong>: <code translate="no">and</code>, <code translate="no">or</code>, <code translate="no">not</code> for complex logical conditions</li>
<li><strong>Basic operators</strong>: Comparison operators like <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code></li>
<li><strong>Filtering templates</strong>: Advanced filtering patterns and syntax</li>
<li><strong>String matching</strong>: Pattern matching with <code translate="no">like</code> and other string operations</li>
</ul>
<p>This documentation will serve as the knowledge base for our LLM to generate accurate filter expressions.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> docling
<span class="hljs-keyword">from</span> docling.document_converter <span class="hljs-keyword">import</span> DocumentConverter

converter = DocumentConverter()
docs = [
    converter.convert(url)
    <span class="hljs-keyword">for</span> url <span class="hljs-keyword">in</span> [
        <span class="hljs-string">&quot;https://milvus.io/docs/boolean.md&quot;</span>,
        <span class="hljs-string">&quot;https://milvus.io/docs/basic-operators.md&quot;</span>,
        <span class="hljs-string">&quot;https://milvus.io/docs/filtering-templating.md&quot;</span>,
    ]
]

<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs[:<span class="hljs-number">3</span>]:
    <span class="hljs-built_in">print</span>(doc.document.export_to_markdown())
<button class="copy-code-btn"></button></code></pre>
<p>The documentation scraping provides comprehensive coverage of Milvus filter syntax. This knowledge base will enable our LLM to understand the nuances of filter expression construction, including proper operator usage, field referencing, and complex condition combinations.</p>
<h2 id="LLM-Powered-Filter-Generation" class="common-anchor-header">LLM-Powered Filter Generation<button data-href="#LLM-Powered-Filter-Generation" class="anchor-icon" translate="no">
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
    </button></h2><p>Now that we have the documentation context, let’s set up the LLM system to generate filter expressions. We’ll create a structured prompt that combines the scraped documentation with user queries to produce syntactically correct Milvus filter expressions.</p>
<p>Our filter generation system uses a carefully crafted prompt that:</p>
<ol>
<li><strong>Provides context</strong>: Includes the complete Milvus documentation as reference material</li>
<li><strong>Sets constraints</strong>: Ensures the LLM only uses documented syntax and features</li>
<li><strong>Enforces accuracy</strong>: Requires syntactically correct expressions</li>
<li><strong>Maintains focus</strong>: Returns only the filter expression without explanations</li>
</ol>
<p>Let’s test this with a natural language query and see how well the LLM performs.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display, Markdown

context = <span class="hljs-string">&quot;\n&quot;</span>.join([doc.document.export_to_markdown() <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs])

prompt = <span class="hljs-string">f&quot;&quot;&quot;
You are an expert Milvus vector database engineer. Your task is to convert a user&#x27;s natural language query into a valid Milvus filter expression, using the provided Milvus documentation as your knowledge base.

Follow these rules strictly:
1. Only use the provided documents as your source of knowledge.
2. Ensure the generated filter expression is syntactically correct.
3. If there isn&#x27;t enough information in the documents to create an expression, state that directly.
4. Only return the final filter expression. Do not include any explanations or extra text.

---
**Milvus Documentation Context:**
<span class="hljs-subst">{context}</span>

---
**User Query:**
<span class="hljs-subst">{user_query}</span>

---
**Filter Expression:**
&quot;&quot;&quot;</span>

client = OpenAI()


<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_filter_expr</span>(<span class="hljs-params">user_query</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Generates a Milvus filter expression from a user query using GPT-4o-mini.
    &quot;&quot;&quot;</span>
    completion = client.chat.completions.create(
        model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
        messages=[
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: prompt},
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_query},
        ],
        temperature=<span class="hljs-number">0.0</span>,
    )
    <span class="hljs-keyword">return</span> completion.choices[<span class="hljs-number">0</span>].message.content


user_query = <span class="hljs-string">&quot;Find people older than 30 who live in London, Tokyo, or Toronto&quot;</span>

filter_expr = generate_filter_expr(user_query)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Generated filter expression: <span class="hljs-subst">{filter_expr}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>The LLM successfully generated a filter expression that combines multiple conditions:</p>
<ul>
<li>Age comparison using <code translate="no">&gt;</code></li>
<li>Multiple city matching using <code translate="no">in</code> operator</li>
<li>Proper field referencing and syntax</li>
</ul>
<p>This demonstrates the power of providing comprehensive documentation context to guide LLM filter generation.</p>
<h2 id="Test-the-Generated-Filter" class="common-anchor-header">Test the Generated Filter<button data-href="#Test-the-Generated-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Now let’s test our generated filter expression by using it in an actual Milvus search operation. We’ll combine semantic search with precise filtering to find users that match both the query intent and the specific criteria.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">import</span> os

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
openai_client = OpenAI(api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>))

clean_filter = (
    filter_expr.replace(<span class="hljs-string">&quot;```&quot;</span>, <span class="hljs-string">&quot;&quot;</span>).replace(<span class="hljs-string">&#x27;filter=&quot;&#x27;</span>, <span class="hljs-string">&quot;&quot;</span>).replace(<span class="hljs-string">&#x27;&quot;&#x27;</span>, <span class="hljs-string">&quot;&quot;</span>).strip()
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Using filter: <span class="hljs-subst">{clean_filter}</span>&quot;</span>)

query_embedding = (
    openai_client.embeddings.create(
        <span class="hljs-built_in">input</span>=[user_query], model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>, dimensions=<span class="hljs-number">1536</span>
    )
    .data[<span class="hljs-number">0</span>]
    .embedding
)

search_results = client.search(
    collection_name=<span class="hljs-string">&quot;user_data_collection&quot;</span>,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,
    <span class="hljs-built_in">filter</span>=clean_filter,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>],
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    },
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search results:&quot;</span>)
<span class="hljs-keyword">for</span> i, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(search_results):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Query <span class="hljs-subst">{i}</span>:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  - <span class="hljs-subst">{hit}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Results-Analysis" class="common-anchor-header">Results Analysis<button data-href="#Results-Analysis" class="anchor-icon" translate="no">
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
    </button></h2><p>The search results demonstrate successful integration of LLM-generated filters with Milvus vector search. The filter correctly identified users who:</p>
<ul>
<li>Are older than 30 years</li>
<li>Live in London, Tokyo, or Toronto</li>
<li>Match the semantic context of the query</li>
</ul>
<p>This approach combines the precision of structured filtering with the flexibility of natural language input, making vector databases more accessible to users who may not be familiar with specific query syntax.</p>
