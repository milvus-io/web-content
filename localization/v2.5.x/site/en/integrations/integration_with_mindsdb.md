---
id: integration_with_mindsdb.md
summary: >-
  This tutorial demonstrates how to integrate Milvus with MindsDB, enabling you
  to leverage MindsDB's AI capabilities with Milvus's vector database
  functionality through SQL-like operations for managing and querying vector
  embeddings.
title: Integrate Milvus with MindsDB
---
<h1 id="Integrate-Milvus-with-MindsDB" class="common-anchor-header">Integrate Milvus with MindsDB<button data-href="#Integrate-Milvus-with-MindsDB" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB</a> is a powerful tool for integrating AI applications with diverse enterprise data sources. It acts as a federated query engine that brings order to data sprawl while meticulously answering queries across both structured and unstructured data. Whether your data is scattered across SaaS applications, databases, or data warehouses, MindsDB can connect and query it all using standard SQL. It features state-of-the-art autonomous RAG systems through Knowledge Bases, supports hundreds of data sources, and provides flexible deployment options from local development to cloud environments.</p>
<p>This tutorial demonstrates how to integrate Milvus with MindsDB, enabling you to leverage MindsDB’s AI capabilities with Milvus’s vector database functionality through SQL-like operations for managing and querying vector embeddings.</p>
<div class="alert note">
<p>This tutorial mainly refers to the official documentation of the <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">MindsDB Milvus Handler</a>. If you find any outdated parts in this tutorial, you can prioritize following the official documentation and create an issue for us.</p>
</div>
<h2 id="Install-MindsDB" class="common-anchor-header">Install MindsDB<button data-href="#Install-MindsDB" class="anchor-icon" translate="no">
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
    </button></h2><p>Before we start, install MindsDB locally via <a href="https://docs.mindsdb.com/setup/self-hosted/docker">Docker</a> or <a href="https://docs.mindsdb.com/setup/self-hosted/docker-desktop">Docker Desktop</a>.</p>
<p>Before proceeding, ensure you have a solid understanding of the fundamental concepts and operations of both MindsDB and Milvus.</p>
<h2 id="Arguments-Introduction" class="common-anchor-header">Arguments Introduction<button data-href="#Arguments-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>The required arguments to establish a connection are:</p>
<ul>
<li><code translate="no">uri</code>: uri for milvus database, can be set to local “.db” file or docker or cloud service</li>
<li><code translate="no">token</code>: token to support docker or cloud service according to uri option</li>
</ul>
<p>The optional arguments to establish a connection are:</p>
<p>These are used for <code translate="no">SELECT</code> queries:</p>
<ul>
<li><code translate="no">search_default_limit</code>: default limit to be passed in select statements (default=100)</li>
<li><code translate="no">search_metric_type</code>: metric type used for searches (default=&quot;L2&quot;)</li>
<li><code translate="no">search_ignore_growing</code>: whether to ignore growing segments during similarity searches (default=False)</li>
<li><code translate="no">search_params</code>: specific to the <code translate="no">search_metric_type</code> (default={&quot;nprobe&quot;: 10})</li>
</ul>
<p>These are used for <code translate="no">CREATE</code> queries:</p>
<ul>
<li><code translate="no">create_auto_id</code>: whether to auto generate id when inserting records with no ID (default=False)</li>
<li><code translate="no">create_id_max_len</code>: maximum length of the id field when creating a table (default=64)</li>
<li><code translate="no">create_embedding_dim</code>: embedding dimension for creating table (default=8)</li>
<li><code translate="no">create_dynamic_field</code>: whether or not the created tables have dynamic fields or not (default=True)</li>
<li><code translate="no">create_content_max_len</code>: max length of the content column (default=200)</li>
<li><code translate="no">create_content_default_value</code>: default value of content column (default=’’)</li>
<li><code translate="no">create_schema_description</code>: description of the created schemas (default=’’)</li>
<li><code translate="no">create_alias</code>: alias of the created schemas (default=’default’)</li>
<li><code translate="no">create_index_params</code>: parameters of the index created on embeddings column (default={})</li>
<li><code translate="no">create_index_metric_type</code>: metric used to create the index (default=’L2’)</li>
<li><code translate="no">create_index_type</code>: the type of index (default=’AUTOINDEX’)</li>
</ul>
<h2 id="Usage" class="common-anchor-header">Usage<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Before continuing, make sure that <code translate="no">pymilvus</code> version is same as this <a href="https://github.com/mindsdb/mindsdb/blob/main/mindsdb/integrations/handlers/milvus_handler/requirements.txt">pinned version</a>. If you find any issues with version compatibility, you can roll back your version of pymilvus, or customize it in this <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">requirement file</a>.</p>
<h3 id="Creating-connection" class="common-anchor-header">Creating connection</h3><p>In order to make use of this handler and connect to a Milvus server in MindsDB, the following syntax can be used:</p>
<pre><code translate="no" class="language-sql">CREATE DATABASE milvus_datasource
<span class="hljs-type">WITH</span>
  <span class="hljs-variable">ENGINE</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;milvus&#x27;</span>,
  PARAMETERS = {
    <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;./milvus_local.db&quot;</span>,
    <span class="hljs-string">&quot;token&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-string">&quot;create_embedding_dim&quot;</span>: <span class="hljs-number">3</span>,
    <span class="hljs-string">&quot;create_auto_id&quot;</span>: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<ul>
<li>If you only need a local vector database for small scale data or prototyping, setting the uri as a local file, e.g.<code translate="no">./milvus.db</code>, is the most convenient method, as it automatically utilizes <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> to store all data in this file.</li>
<li>For larger scale data and traffic in production, you can set up a Milvus server on <a href="https://milvus.io/docs/install-overview.md">Docker or Kubernetes</a>. In this setup, please use the server address and port as your <code translate="no">uri</code>, e.g.<code translate="no">http://localhost:19530</code>. If you enable the authentication feature on Milvus, set the <code translate="no">token</code> as <code translate="no">&quot;&lt;your_username&gt;:&lt;your_password&gt;&quot;</code>, otherwise there is no need to set the token.</li>
<li>You can also use fully managed Milvus on <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Simply set the <code translate="no">uri</code> and <code translate="no">token</code> to the <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint and API key</a> of your Zilliz Cloud instance.</li>
</ul>
</blockquote>
<h3 id="Dropping-connection" class="common-anchor-header">Dropping connection</h3><p>To drop the connection, use this command</p>
<pre><code translate="no" class="language-sql">DROP DATABASE milvus_datasource;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-tables" class="common-anchor-header">Creating tables</h3><p>To insert data from a pre-existing table, use <code translate="no">CREATE</code></p>
<pre><code translate="no" class="language-sql">CREATE TABLE milvus_datasource.test
(SELECT * FROM sqlitedb.test);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Dropping-collections" class="common-anchor-header">Dropping collections</h3><p>Dropping a collection is not supported</p>
<h3 id="Querying-and-selecting" class="common-anchor-header">Querying and selecting</h3><p>To query database using a search vector, you can use <code translate="no">search_vector</code> in <code translate="no">WHERE</code> clause</p>
<p>Caveats:</p>
<ul>
<li>If you omit <code translate="no">LIMIT</code>, the <code translate="no">search_default_limit</code> is used since Milvus requires it</li>
<li>Metadata column is not supported, but if the collection has dynamic schema enabled, you can query like normal, see the example below</li>
<li>Dynamic fields cannot be displayed but can be queried</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<span class="hljs-variable constant_">WHERE</span> search_vector = <span class="hljs-string">&#x27;[3.0, 1.0, 2.0, 4.5]&#x27;</span>
<span class="hljs-variable constant_">LIMIT</span> <span class="hljs-number">10</span>;
<button class="copy-code-btn"></button></code></pre>
<p>If you omit the <code translate="no">search_vector</code>, this becomes a basic search and <code translate="no">LIMIT</code> or <code translate="no">search_default_limit</code> amount of entries in collection are returned</p>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<button class="copy-code-btn"></button></code></pre>
<p>You can use <code translate="no">WHERE</code> clause on dynamic fields like normal SQL</p>
<pre><code translate="no" class="language-sql">SELECT * FROM milvus_datasource.createtest
<span class="hljs-type">WHERE</span> <span class="hljs-variable">category</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;science&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deleting-records" class="common-anchor-header">Deleting records</h3><p>You can delete entries using <code translate="no">DELETE</code> just like in SQL.</p>
<p>Caveats:</p>
<ul>
<li>Milvus only supports deleting entities with clearly specified primary keys</li>
<li>You can only use <code translate="no">IN</code> operator</li>
</ul>
<pre><code translate="no" class="language-sql">DELETE FROM milvus_datasource.test
WHERE <span class="hljs-built_in">id</span> IN (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Inserting-records" class="common-anchor-header">Inserting records</h3><p>You can also insert individual rows like so:</p>
<pre><code translate="no" class="language-sql">INSERT INTO milvus_test.testable (<span class="hljs-built_in">id</span>,content,metadata,embeddings)
VALUES (<span class="hljs-string">&quot;id3&quot;</span>, <span class="hljs-string">&#x27;this is a test&#x27;</span>, <span class="hljs-string">&#x27;{&quot;test&quot;: &quot;test&quot;}&#x27;</span>, <span class="hljs-string">&#x27;[1.0, 8.0, 9.0]&#x27;</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Updating" class="common-anchor-header">Updating</h3><p>Updating records is not supported by Milvus API. You can try using combination of <code translate="no">DELETE</code> and <code translate="no">INSERT</code></p>
<hr>
<p>For more details and examples, please refer to the <a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB Official Documentation</a>.</p>
