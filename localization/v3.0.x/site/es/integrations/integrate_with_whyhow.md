---
id: integrate_with_whyhow.md
summary: >-
  This guide demonstrates how to use whyhow.ai and Milvus Lite to conduct
  Rule-based Retrieval.
title: Integrate Milvus with WhyHow
---
<h1 id="Integrate-Milvus-with-WhyHow" class="common-anchor-header">Integrate Milvus with WhyHow<button data-href="#Integrate-Milvus-with-WhyHow" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide demonstrates how to use whyhow.ai and Milvus Lite to conduct Rule-based Retrieval.</p>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>WhyHow is a platform which provides developers the building blocks they need to organize, contextualize, and reliably retrieve unstructured data to perform complex RAG. The Rule-based Retrieval package is a Python package developed by WhyHow that enables people to create and manage Retrieval Augmented Generation (RAG) applications with advanced filtering capabilities.</p>
<h2 id="Installation" class="common-anchor-header">Installation<button data-href="#Installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Before you start, please install all the necessary python packages for later usage.</p>
<pre><code translate="no" class="language-shell">pip install --upgrade pymilvus, whyhow_rbr
<button class="copy-code-btn"></button></code></pre>
<p>Next, we need to initialize the Milvus client to implement the Rule-based Retrieval by using Milvus Lite.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Lite local path</span>
path=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span> <span class="hljs-comment"># random name for local milvus lite db path</span>

<span class="hljs-comment"># Initialize the ClientMilvus</span>
milvus_client = ClientMilvus(path)
<button class="copy-code-btn"></button></code></pre>
<p>You can also initialize the Milvus client through Milvus Cloud</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Cloud credentials</span>
YOUR_MILVUS_CLOUD_END_POINT = <span class="hljs-string">&quot;YOUR_MILVUS_CLOUD_END_POINT&quot;</span>
YOUR_MILVUS_CLOUD_TOKEN = <span class="hljs-string">&quot;YOUR_MILVUS_CLOUD_TOKEN&quot;</span>

<span class="hljs-comment"># Initialize the ClientMilvus</span>
milvus_client = ClientMilvus(
        milvus_uri=YOUR_MILVUS_CLOUD_END_POINT, 
        milvus_token=YOUR_MILVUS_CLOUD_TOKEN,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-Collection" class="common-anchor-header">Create Collection<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-necessary-variables" class="common-anchor-header">Defining necessary variables</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Define collection name</span>
COLLECTION_NAME=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span> <span class="hljs-comment"># take your own collection name</span>

<span class="hljs-comment"># Define vector dimension size</span>
DIMENSION=<span class="hljs-number">1536</span> <span class="hljs-comment"># decide by the model you use</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-schema" class="common-anchor-header">Add schema</h3><p>Before inserting any data into Milvus Lite database, we need to first define the data field, which is called schema in here. Through create object <code translate="no">CollectionSchema</code> and add data field through <code translate="no">add_field()</code>, we can control our data type and their characteristics. This step is mandatory before inserting any data into Milvus.</p>
<pre><code translate="no" class="language-python">schema = milvus_client.create_schema(auto_id=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Enable id matching</span>

schema = milvus_client.add_field(schema=schema, field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema = milvus_client.add_field(schema=schema, field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-index" class="common-anchor-header">Create index</h3><p>For each schema, it is better to have an index so that the querying will be much more efficient. To create an index, we first need an <code translate="no">index_params</code> and later add more index data on this <code translate="no">IndexParams</code> object.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Start to indexing data field</span>
index_params = milvus_client.prepare_index_params()
index_params = milvus_client.add_index(
    index_params=index_params,  <span class="hljs-comment"># pass in index_params object</span>
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># use autoindex instead of other complex indexing method</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,  <span class="hljs-comment"># L2, COSINE, or IP</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>This method is a thin wrapper around the official Milvus implementation (<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">official docs</a>).</p>
<h3 id="Create-collection" class="common-anchor-header">Create collection</h3><p>After defining all the data field and indexing them, we now need to create our database collection so that we can access our data quick and precise. What needs to be mentioned is that we initialized the <code translate="no">enable_dynamic_field</code> to be true so that you can upload any data freely. The cost is that data querying might be inefficient.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create Collection</span>
milvus_client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upload-documents" class="common-anchor-header">Upload documents<button data-href="#Upload-documents" class="anchor-icon" translate="no">
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
    </button></h2><p>After creating a collection, we are ready to populate it with documents. In <code translate="no">whyhow_rbr</code> this is done using the <code translate="no">upload_documents</code> method of the <code translate="no">MilvusClient</code>. It performs the following steps under the hood:</p>
<ul>
<li><strong>Preprocessing</strong>: Reading and splitting the provided PDF files into chunks</li>
<li><strong>Embedding</strong>: Embedding all the chunks using an OpenAI model</li>
<li><strong>Inserting</strong>: Uploading both the embeddings and the metadata to Milvus Lite</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># get pdfs</span>
pdfs = [<span class="hljs-string">&quot;harry-potter.pdf&quot;</span>, <span class="hljs-string">&quot;game-of-thrones.pdf&quot;</span>] <span class="hljs-comment"># replace to your pdfs path</span>

<span class="hljs-comment"># Uploading the PDF document</span>
milvus_client.upload_documents(
    collection_name=COLLECTION_NAME,
    documents=pdfs
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Question-answering" class="common-anchor-header">Question answering<button data-href="#Question-answering" class="anchor-icon" translate="no">
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
    </button></h2><p>Now we can finally move to retrieval augmented generation.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search data and implement RAG!</span>
res = milvus_client.search(
    question=<span class="hljs-string">&#x27;What food does Harry Potter like to eat?&#x27;</span>,
    collection_name=COLLECTION_NAME,
    anns_field=<span class="hljs-string">&#x27;embedding&#x27;</span>,
    output_fields=<span class="hljs-string">&#x27;text&#x27;</span>
)
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;answer&#x27;</span>])
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;matches&#x27;</span>])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Rules" class="common-anchor-header">Rules</h3><p>In the previous example, every single document in our index was considered. However, sometimes it might be beneficial to only retrieve documents satisfying some predefined conditions (e.g. <code translate="no">filename=harry-potter.pdf</code>). In <code translate="no">whyhow_rbr</code> through Milvus Lite, this can be done via adjusting searching parameters.</p>
<p>A rule can control the following metadata attributes</p>
<ul>
<li><code translate="no">filename</code> name of the file</li>
<li><code translate="no">page_numbers</code> list of integers corresponding to page numbers (0 indexing)</li>
<li><code translate="no">id</code> unique identifier of a chunk (this is the most “extreme” filter)</li>
<li>Other rules base on <a href="https://milvus.io/docs/boolean.md">Boolean Expressions</a></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># RULES(search on book harry-potter on page 8):</span>
PARTITION_NAME=<span class="hljs-string">&#x27;harry-potter&#x27;</span> <span class="hljs-comment"># search on books</span>
page_number=<span class="hljs-string">&#x27;page_number == 8&#x27;</span>

<span class="hljs-comment"># first create a partitions to store the book and later search on this specific partition:</span>
milvus_client.crate_partition(
    collection_name=COLLECTION_NAME,
    partition_name=PARTITION_NAME <span class="hljs-comment"># separate base on your pdfs type</span>
)

<span class="hljs-comment"># search with rules</span>
res = milvus_client.search(
    question=<span class="hljs-string">&#x27;Tell me about the greedy method&#x27;</span>,
    collection_name=COLLECTION_NAME,
    partition_names=PARTITION_NAME,
    <span class="hljs-built_in">filter</span>=page_number, <span class="hljs-comment"># append any rules follow the Boolean Expression Rule</span>
    anns_field=<span class="hljs-string">&#x27;embedding&#x27;</span>,
    output_fields=<span class="hljs-string">&#x27;text&#x27;</span>
)
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;answer&#x27;</span>])
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;matches&#x27;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>In this example, we first create a partition that store harry-potter related pdfs, and through searching within this partition, we can get the most direct information. Also, we apply page numbers as a filter to specify the exact page we wish to search on. Remember, the filer parameter needs to follow the <a href="https://milvus.io/docs/boolean.md">boolean rule</a>.</p>
<h3 id="Clean-up" class="common-anchor-header">Clean up</h3><p>At last, after implementing all the instructions, you can clean up the database by calling <code translate="no">drop_collection()</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Clean up</span>
milvus_client.drop_collection(
    collection_name=COLLECTION_NAME
)
<button class="copy-code-btn"></button></code></pre>
