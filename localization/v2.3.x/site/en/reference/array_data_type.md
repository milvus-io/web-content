---
id: array_data_type.md
related_key: array_data_type
summary: Array data type in Milvus.
title: Array
---
<h1 id="Array" class="common-anchor-header">Array<button data-href="#Array" class="anchor-icon" translate="no">
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
    </button></h1><p>The array data type in Milvus is an ordered collection of elements, where each element can be of a specific data type: INT, VARCHAR, BOOL, FLOAT, or DOUBLE. An array is particularly useful when you need to store multiple values in a single field.</p>
<div class="alert note">
<p>All elements within a single array must be of the same data type.</p>
</div>
<p>To demonstrate the use of array fields, we have prepared <a href="https://www.kaggle.com/datasets/shiyu22chen/cleaned-medium-articles-dataset">a dataset from Kaggle</a> containing the articles published on Medium.com from Jan 2020 to August 2020.</p>
<p>In this topic, we load the first 100 entities in the dataset, and organize the values of <code translate="no">link</code> and <code translate="no">publication</code> fields into an array field named <code translate="no">var_array</code> and values of <code translate="no">reading_time</code>, <code translate="no">claps</code>, and <code translate="no">responses</code> into an array field named <code translate="no">int_array</code>.</p>
<p>The data structure is similar as follows:</p>
<pre><code translate="no" class="language-json">{

        <span class="hljs-string">&#x27;title&#x27;</span>: <span class="hljs-string">&#x27;The Reported Mortality Rate of Coronavirus Is Not Important&#x27;</span>,
        <span class="hljs-string">&#x27;title_vector&#x27;</span>: [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, ..., <span class="hljs-number">0.030096486</span>],
        <span class="hljs-string">&#x27;var_array&#x27;</span>: [<span class="hljs-string">&#x27;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&#x27;</span>, <span class="hljs-string">&#x27;The Startup&#x27;</span>],
        <span class="hljs-string">&#x27;int_array&#x27;</span>: [<span class="hljs-number">13</span>, <span class="hljs-number">1100</span>, <span class="hljs-number">18</span>]

}
<button class="copy-code-btn"></button></code></pre>
<p>For your reference, the code that can be used to process the example dataset is as follows:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

<span class="hljs-comment"># Load the first 100 entities of the downloaded dataset</span>
df = pd.read_csv(<span class="hljs-string">&#x27;New_Medium_Data.csv&#x27;</span>, nrows=<span class="hljs-number">100</span>)
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">100</span>):
    df[<span class="hljs-string">&#x27;title_vector&#x27;</span>][i] = <span class="hljs-built_in">eval</span>(df[<span class="hljs-string">&#x27;title_vector&#x27;</span>][i])

<span class="hljs-comment"># Convert the specified fields into arrays</span>
df[<span class="hljs-string">&#x27;var_array&#x27;</span>] = df[[<span class="hljs-string">&#x27;link&#x27;</span>, <span class="hljs-string">&#x27;publication&#x27;</span>]].values.tolist()
df[<span class="hljs-string">&#x27;int_array&#x27;</span>] = df[[<span class="hljs-string">&#x27;reading_time&#x27;</span>, <span class="hljs-string">&#x27;claps&#x27;</span>, <span class="hljs-string">&#x27;responses&#x27;</span>]].values.tolist()

<span class="hljs-comment"># Drop the original columns</span>
df = df.drop(columns=[<span class="hljs-string">&#x27;link&#x27;</span>, <span class="hljs-string">&#x27;publication&#x27;</span>, <span class="hljs-string">&#x27;reading_time&#x27;</span>, <span class="hljs-string">&#x27;claps&#x27;</span>, <span class="hljs-string">&#x27;responses&#x27;</span>])

<span class="hljs-comment"># Convert the DataFrame to a list of dictionaries</span>
data = df.to_dict(<span class="hljs-string">&#x27;records&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-array-fields" class="common-anchor-header">Define array fields<button data-href="#Define-array-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>When defining an array field, specify the following arguments for elements in the array field:</p>
<ul>
<li><code translate="no">element_type</code>: (Required) Data type of elements in an array. Valid values: <code translate="no">DataType.Int8</code>, <code translate="no">DataType.Int16</code>, <code translate="no">DataType.Int32</code>, <code translate="no">DataType.Int64</code>, <code translate="no">DataType.VARCHAR</code>, <code translate="no">DataType.BOOL</code>, <code translate="no">DataType.FLOAT</code>, and <code translate="no">DataType.DOUBLE</code>.</li>
<li><code translate="no">max_capacity</code>: (Required) Maximum number of elements that an array field can contain. Value range: [1, 4,096].</li>
<li><code translate="no">max_length</code>: Maximum length of strings for each VARCHAR element in an array field. This argument is required when <code translate="no">element_type</code> is set to <code translate="no">DataType.VARCHAR</code>. Value range: [1, 65,535].</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define array fields</span>

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType

connections.connect(host=<span class="hljs-string">&#x27;localhost&#x27;</span>, port=<span class="hljs-string">&#x27;19530&#x27;</span>)

<span class="hljs-comment"># 1. define fields</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&#x27;id&#x27;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>, max_length=<span class="hljs-number">100</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;title&#x27;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;title_vector&#x27;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>),
    <span class="hljs-comment"># define ARRAY field with VARCHAR elements</span>
    FieldSchema(name=<span class="hljs-string">&#x27;var_array&#x27;</span>, dtype=DataType.ARRAY, element_type=DataType.VARCHAR, max_capacity=<span class="hljs-number">900</span>, max_length=<span class="hljs-number">1000</span>),
    <span class="hljs-comment"># define ARRAY field with INT64 elements</span>
    FieldSchema(name=<span class="hljs-string">&#x27;int_array&#x27;</span>, dtype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=<span class="hljs-number">900</span>)
]

<span class="hljs-comment"># 2. enable dynamic schema in schema definition</span>
schema = CollectionSchema(
        fields, 
        <span class="hljs-string">&quot;The schema for a medium news collection&quot;</span>, 
        enable_dynamic_field=<span class="hljs-literal">True</span> <span class="hljs-comment"># Optional, defaults to &#x27;False&#x27;.</span>
)

<span class="hljs-comment"># 3. reference the schema in a collection</span>
collection = Collection(<span class="hljs-string">&quot;medium_articles_with_array&quot;</span>, schema)

<span class="hljs-comment"># 4. index the vector field</span>
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
<h2 id="Insert-field-values" class="common-anchor-header">Insert field values<button data-href="#Insert-field-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Once the collection is created, you can insert the processed data into it.</p>
<div class="alert note">
<p>If <code translate="no">auto_id</code> is set to <code translate="no">True</code> for a collection, insert data without the primary key field. Otherwise, an error can occur during data insert.</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert field values</span>

<span class="hljs-comment"># 1. insert data</span>
collection.insert(data)

<span class="hljs-comment"># 2. call the flush API to make inserted data immediately available for search</span>
collection.flush()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Entity counts: &quot;</span>, collection.num_entities)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># Entity counts:  100</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-or-query-with-array-fields" class="common-anchor-header">Search or query with array fields<button data-href="#Search-or-query-with-array-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Then, you can search or query with array fields in the same manner as you would with a standard scalar field.</p>
<p>Search data with <code translate="no">int_array</code> to filter entities whose <code translate="no">reading_time</code> is between 10 and 20 (exclusive).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. search data with `int_array`</span>
result = collection.search(
    data=data[0][<span class="hljs-string">&#x27;title_vector&#x27;</span>],
    anns_field=<span class="hljs-string">&#x27;title_vector&#x27;</span>,
    param={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: 10}},
    <span class="hljs-built_in">limit</span>=3,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;10 &lt; int_array[0] &lt; 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&#x27;title&#x27;</span>,<span class="hljs-string">&#x27;int_array&#x27;</span>]
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
            hit.entity.get(<span class="hljs-string">&quot;int_array&quot;</span>)[0]
        )
<button class="copy-code-btn"></button></code></pre>
<p>Query data with <code translate="no">var_array</code> to filter entities whose <code translate="no">publication</code> is <code translate="no">'The Startup'</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 2. query data with `var_array`</span>
result = collection.query(
    expr=<span class="hljs-string">&#x27;var_array[1] == &quot;The Startup&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&#x27;title&#x27;</span>,<span class="hljs-string">&#x27;var_array&#x27;</span>]
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> result:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Matched IDs: &quot;</span>, hits.<span class="hljs-built_in">id</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Matched articles: &quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;Title: &quot;</span>,
            hit.entity.get(<span class="hljs-string">&quot;title&quot;</span>),
            <span class="hljs-string">&quot;, Publication: &quot;</span>,
            hit.entity.get(<span class="hljs-string">&quot;var_array&quot;</span>)[<span class="hljs-number">1</span>]
        )
<button class="copy-code-btn"></button></code></pre>
<p>Check whether <code translate="no">int_array</code> contains element <code translate="no">10</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. use array_contains to check whether an array contains a specific element</span>

collection.query(
    expr=<span class="hljs-string">&#x27;array_contains(int_array, 10)&#x27;</span>,
    output_fields=[<span class="hljs-string">&#x27;title&#x27;</span>,<span class="hljs-string">&#x27;int_array&#x27;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>When working with array fields, you can enclose a string value with either double quotation marks (“”) or single quotation marks (‘’). It’s important to note that Milvus stores string values in the array field as is without performing semantic escape or conversion. For instance, <strong>‘a&quot;b’</strong>, <strong>“a’b”</strong>, <strong>‘a’b’</strong>, and <strong>“a&quot;b”</strong> will be saved as is, while <strong>‘a’b’</strong> and <strong>“a&quot;b”</strong> will be treated as invalid values.</p>
<p>Assume that two array fields <code translate="no">int_array</code> and <code translate="no">var_array</code> have been defined. The following table describes the supported boolean expressions that you can use in <code translate="no">expr</code> when searching with array fields.</p>
<table>
<thead>
<tr><th>Operator</th><th>Examples</th><th>Remarks</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td><code translate="no">‘int_array[0] &lt; 3’</code></td><td>This expression evaluates to true if the value of <code translate="no">int_array[0]</code> is less than 3.</td></tr>
<tr><td>&gt;</td><td><code translate="no">‘int_array[0] &gt; 5’</code></td><td>This expression evaluates to true if the value of <code translate="no">int_array[0]</code> is greater than 5.</td></tr>
<tr><td>==</td><td><code translate="no">‘int_array[0] == 0’</code></td><td>This expression evaluates to true if the value of <code translate="no">int_array[0]</code> is equal to 0.</td></tr>
<tr><td>!=</td><td><code translate="no">‘var_array[0] != &quot;a&quot;’</code></td><td>This expression evaluates to true if the value of <code translate="no">var_array[0]</code> is not equal to <code translate="no">“a”</code>.</td></tr>
<tr><td>&lt;=</td><td><code translate="no">‘int_array[0] &lt;= 3’</code></td><td>This expression evaluates to true if the value of <code translate="no">int_array[0]</code> is smaller than or equal to 3.</td></tr>
<tr><td>&gt;=</td><td><code translate="no">‘int_array[0] &gt;= 10’</code></td><td>This expression evaluates to true if the value of <code translate="no">int_array[0]</code> is greater than or equal to 10.</td></tr>
<tr><td>in</td><td><code translate="no">'var_array[0] in [&quot;str1&quot;, “str2”]'</code></td><td>This expression evaluates to true if the value of <code translate="no">var_array[0]</code> is <code translate="no">“str1”</code> or <code translate="no">“str2”</code>.</td></tr>
<tr><td>not in</td><td><code translate="no">'int_array[0] not in [1, 2, 3]'</code></td><td>This expression evaluates to true if the value of <code translate="no">int_array[0]</code> is not 1, 2, or 3.</td></tr>
<tr><td>+, -, *, /, %, **</td><td><code translate="no">‘int_array[0] + 100 &gt; 200’</code></td><td>This expression evaluates to true if the value of <code translate="no">int_array[0] + 100</code> is greater than 200.</td></tr>
<tr><td>like (LIKE)</td><td><code translate="no">‘var_array[0] like &quot;prefix%&quot;’</code></td><td>This expression evaluates to true if the value of <code translate="no">var_array[0]</code> is prefixed with <code translate="no">“prefix”</code>.</td></tr>
<tr><td>and (&amp;&amp;)</td><td><code translate="no">‘var_array[0] like “prefix%” &amp;&amp; int_array[0] &lt;= 100’</code></td><td>This expression evaluates to true if the value of <code translate="no">var_array[0]</code> is prefixed with <code translate="no">“prefix”</code>, and the value of <code translate="no">int_array[0]</code> is smaller than or equal to 100.</td></tr>
<tr><td>or (||)</td><td><code translate="no">‘var_array[0] like “prefix%” || int_array[0] &lt;= 100’</code></td><td>This expression evaluates to true if the value of <code translate="no">var_array[0]</code> is prefixed with <code translate="no">“prefix”</code>, or the value of <code translate="no">int_array[0]</code> is smaller than or equal to 100.</td></tr>
<tr><td>array_contains (ARRAY_CONTAINS)</td><td><code translate="no">'array_contains(int_array, 100)'</code></td><td>This expression evaluates to true if <code translate="no">int_array</code> contains element <code translate="no">100</code>.</td></tr>
<tr><td>array_contains_all (ARRAY_CONTAINS_ALL)</td><td><code translate="no">'array_contains_all(int_array, [1, 2, 3])'</code></td><td>This expression evaluates to true if <code translate="no">int_array</code> contains all elements <code translate="no">1</code>, <code translate="no">2</code>, and <code translate="no">3</code>.</td></tr>
<tr><td>array_contains_any (ARRAY_CONTAINS_ANY)</td><td><code translate="no">'array_contains_any(var_array, [&quot;a&quot;, &quot;b&quot;, “c”])'</code></td><td>This expression evaluates to true if <code translate="no">var_array</code> contains any element of <code translate="no">“a”</code>, <code translate="no">“b”</code>, and <code translate="no">“c”</code>.</td></tr>
<tr><td>array_length</td><td><code translate="no">‘array_length(int_array) == 10’</code></td><td>This expression evaluates to true if <code translate="no">int_array</code> contains exactly 10 elements.</td></tr>
</tbody>
</table>
<h2 id="What’s-next" class="common-anchor-header">What’s next<button data-href="#What’s-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/v2.3.x/dynamic_schema.md">Dynamic Schema</a></li>
<li><a href="/docs/v2.3.x/json_data_type.md">JSON</a></li>
</ul>
