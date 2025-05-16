---
id: dynamic_schema.md
related_key: dynamic_schema
summary: Dynamic schema in Milvus.
title: Dynamic Schema
---
<h1 id="Dynamic-Schema" class="common-anchor-header">Dynamic Schema<button data-href="#Dynamic-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Schema design is crucial for Milvus data processing. Before inserting entities into a Milvus collection, clarify the schema design and ensure that all data entities inserted afterward match the schema. However, this limits Milvus collections, making them similar to tables in relational databases.</p>
<p>Dynamic schema enables users to insert entities with new fields into a Milvus collection without modifying the existing schema. This means that users can insert data without knowing the full schema of a collection and can include fields that are not yet defined.</p>
<h2 id="Create-collection-with-dynamic-schema-enabled" class="common-anchor-header">Create collection with dynamic schema enabled<button data-href="#Create-collection-with-dynamic-schema-enabled" class="anchor-icon" translate="no">
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
    </button></h2><p>To create a collection using a dynamic data model, set <code translate="no">enable_dynamic_field</code> to <code translate="no">True</code> when defining the data model. Afterward, all undefined fields and their values in the data entities inserted afterward will be treated as pre-defined fields. We prefer to use the term “dynamic fields” to refer to these key-value pairs.</p>
<p>With these dynamic fields, you can ask Milvus to output them in search/query results and include them in search and query filter expressions just as they are already defined in the collection schema.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType, utility

connections.connect(host=<span class="hljs-string">&#x27;localhost&#x27;</span>, port=<span class="hljs-string">&#x27;19530&#x27;</span>)

<span class="hljs-comment"># 1. define fields</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title_vector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>)
]
<span class="hljs-comment"># 2. enable dynamic schema in schema definition</span>
schema = CollectionSchema(
        fields, 
        <span class="hljs-string">&quot;The schema for a medium news collection&quot;</span>, 
        enable_dynamic_field=<span class="hljs-literal">True</span>
)

<span class="hljs-comment"># 3. reference the schema in a collection</span>
collection = Collection(<span class="hljs-string">&quot;medium_articles_with_dynamic&quot;</span>, schema)

<span class="hljs-comment"># 4. index the vector field and load the collection</span>
index_params = {
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}

collection.create_index(
  field_name=<span class="hljs-string">&quot;title_vector&quot;</span>, 
  index_params=index_params
)

<span class="hljs-comment"># 5. load the collection</span>
collection.load()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-dynamic-data" class="common-anchor-header">Insert dynamic data<button data-href="#Insert-dynamic-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Once the collection is created, you can start inserting data, including the dynamic data into the collection.</p>
<h3 id="Prepare-data" class="common-anchor-header">Prepare data</h3><p>To demonstrate the use of dynamic schema, we have prepared <a href="https://www.kaggle.com/datasets/shiyu22chen/cleaned-medium-articles-dataset">a dataset from Kaggle</a> containing the articles published on Medium.com from Jan 2020 to August 2020.</p>
<p>In this section, we need to prepare the dataset as follows:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

<span class="hljs-comment"># read the raw dataset and convert it to JSON</span>
df = pd.read_csv(<span class="hljs-string">&#x27;New_Medium_Data.csv&#x27;</span>)
df.to_json(<span class="hljs-string">&#x27;New_Medium_Data.json&#x27;</span>, orient=<span class="hljs-string">&#x27;records&#x27;</span>)

<span class="hljs-comment"># convert the vector field values into real numbers</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">m</span>(<span class="hljs-params">row</span>):
    row.update({<span class="hljs-string">&#x27;title_vector&#x27;</span>: <span class="hljs-built_in">list</span>(<span class="hljs-built_in">map</span>(<span class="hljs-built_in">float</span>, row[<span class="hljs-string">&#x27;title_vector&#x27;</span>][<span class="hljs-number">1</span>:-<span class="hljs-number">1</span>].split(<span class="hljs-string">&#x27;, &#x27;</span>)))})
    <span class="hljs-keyword">return</span> row

<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;New_Medium_Data.json&#x27;</span>) <span class="hljs-keyword">as</span> f:
    data_rows = json.load(f)
    data_rows = <span class="hljs-built_in">map</span>(m, data_rows)
    data_rows = <span class="hljs-built_in">list</span>(data_rows)
<button class="copy-code-btn"></button></code></pre>
<p>Then we should use <code translate="no">data_rows</code> as a handler to demonstrate the use of a collection with dynamic schema enabled.</p>
<h3 id="Insert-data" class="common-anchor-header">Insert data</h3><p>You can insert this dataset into the collection we have just created.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. insert data</span>
collection.insert(data_rows)

<span class="hljs-comment"># Call the flush API to make inserted data immediately available for search</span>
collection.flush()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Entity counts: &quot;</span>, collection.num_entities)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># Entity counts:  5979</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-with-dynamic-fields" class="common-anchor-header">Search with dynamic fields<button data-href="#Search-with-dynamic-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>If you have created a collection with dynamic field enabled and inserted data with dynamic fields into, index, and load the collection, you can use dynamic fields in the filter expression of a search or a query as follows:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the vector field of the first entity as the query vector.</span>
result = collection.search(
    data=[data_rows[<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;title_vector&#x27;</span>]],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    param={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">3</span>,
    expr=<span class="hljs-string">&#x27;claps &gt; 30 and reading_time &lt; 10&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;reading_time&quot;</span>, <span class="hljs-string">&quot;claps&quot;</span>],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> result:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Matched IDs: &quot;</span>, hits.ids)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Distance to the query vector: &quot;</span>, hits.distances)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Matched articles: &quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;Title: &quot;</span>, 
            hit.entity.get(<span class="hljs-string">&quot;title&quot;</span>), 
            <span class="hljs-string">&quot;, Reading time: &quot;</span>, 
            hit.entity.get(<span class="hljs-string">&quot;reading_time&quot;</span>), 
            <span class="hljs-string">&quot;, Claps&quot;</span>, hit.entity.get(<span class="hljs-string">&quot;claps&quot;</span>)
        )

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># Matched IDs:  [442005795759615782, 442005795759615816, 442005795759613616]</span>
<span class="hljs-comment"># Distance to the query vector:  [0.36103832721710205, 0.3767401874065399, 0.4162980318069458]</span>
<span class="hljs-comment"># Matched articles: </span>
<span class="hljs-comment"># Title:  The Hidden Side Effect of the Coronavirus , Reading time:  8 , Claps 83</span>
<span class="hljs-comment"># Title:  Why The Coronavirus Mortality Rate is Misleading , Reading time:  9 , Claps 2900</span>
<span class="hljs-comment"># Title:  Coronavirus shows what ethical Amazon could look like , Reading time:  4 , Claps 51</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If the key of a dynamic field contains characters other than digits, letters, and underscores (e.g. plus signs, asterisks, or dollar signs), you need to include the key within <code translate="no">$meta[]</code> as shown in the following code snippet when using it in a boolean expression.</p>
<pre><code translate="no" class="language-python">...
<span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;$meta[&quot;#key&quot;] in [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]&#x27;</span>
...
<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/v2.3.x/schema.md#Supported-data-type">Supported data types</a>
<a href="/docs/v2.3.x/boolean.md">Boolean express rules</a>
<a href="/docs/v2.3.x/json_data_type.md">JavaScript Object Notation (JSON)</a></p>
