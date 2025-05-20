---
id: json_data_type.md
related_key: json_data_type
summary: JSON data type in Milvus.
title: JavaScript Object Notation (JSON)
---
<h1 id="JavaScript-Object-Notation-JSON" class="common-anchor-header">JavaScript Object Notation (JSON)<button data-href="#JavaScript-Object-Notation-JSON" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON stands for Javascript Object Notation, which is a lightweight and easy-to-use text-based data format. JSON fields consist of key-value pairs, where each key is a string and its corresponding value can be a number, string, boolean, list, or array. You can insert dictionaries as a field value into collections of your Milvus instances.</p>
<p>To demonstrate the use of a JSON field, we have prepared <a href="https://www.kaggle.com/datasets/shiyu22chen/cleaned-medium-articles-dataset">a dataset from Kaggle</a> containing the articles published on Medium.com from Jan 2020 to August 2020.</p>
<p>We should prepare the dataset a little bit to make its member dictionaries similar to the following:</p>
<pre><code translate="no" class="language-python">{
      <span class="hljs-string">&#x27;title&#x27;</span>: <span class="hljs-string">&#x27;The Reported Mortality Rate of Coronavirus Is Not Important&#x27;</span>, 
      <span class="hljs-string">&#x27;title_vector&#x27;</span>: [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, ..., <span class="hljs-number">0.030096486</span>], 
      <span class="hljs-string">&#x27;article_meta&#x27;</span>: {
        <span class="hljs-string">&#x27;link&#x27;</span>: <span class="hljs-string">&#x27;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&#x27;</span>, 
        <span class="hljs-string">&#x27;reading_time&#x27;</span>: <span class="hljs-number">13</span>, 
        <span class="hljs-string">&#x27;publication&#x27;</span>: <span class="hljs-string">&#x27;The Startup&#x27;</span>, 
        <span class="hljs-string">&#x27;claps&#x27;</span>: <span class="hljs-number">1100</span>, 
        <span class="hljs-string">&#x27;responses&#x27;</span>: <span class="hljs-number">18</span>
      }
}
<button class="copy-code-btn"></button></code></pre>
<p>For your reference, the code used to process the dataset is as follows:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

df = pd.read_csv(<span class="hljs-string">&#x27;New_Medium_Data.csv&#x27;</span>)
df.to_json(<span class="hljs-string">&#x27;New_Medium_Data.json&#x27;</span>, orient=<span class="hljs-string">&#x27;records&#x27;</span>)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">m</span>(<span class="hljs-params">row</span>):
    row.update({
        <span class="hljs-string">&#x27;title_vector&#x27;</span>: <span class="hljs-built_in">list</span>(<span class="hljs-built_in">map</span>(<span class="hljs-built_in">float</span>, row[<span class="hljs-string">&#x27;title_vector&#x27;</span>][<span class="hljs-number">1</span>:-<span class="hljs-number">1</span>].split(<span class="hljs-string">&#x27;, &#x27;</span>))),
        <span class="hljs-string">&#x27;article_meta&#x27;</span>: {
            <span class="hljs-string">&#x27;link&#x27;</span>: row.pop(<span class="hljs-string">&#x27;link&#x27;</span>),
            <span class="hljs-string">&#x27;reading_time&#x27;</span>: row.pop(<span class="hljs-string">&#x27;reading_time&#x27;</span>),
            <span class="hljs-string">&#x27;publication&#x27;</span>: row.pop(<span class="hljs-string">&#x27;publication&#x27;</span>),
            <span class="hljs-string">&#x27;claps&#x27;</span>: row.pop(<span class="hljs-string">&#x27;claps&#x27;</span>),
            <span class="hljs-string">&#x27;responses&#x27;</span>: row.pop(<span class="hljs-string">&#x27;responses&#x27;</span>),
        }
    })
    <span class="hljs-keyword">return</span> row

<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;New_Medium_Data.json&#x27;</span>) <span class="hljs-keyword">as</span> f:
    data_rows = json.load(f)
    data_rows = <span class="hljs-built_in">map</span>(m, data_rows)
    data_rows = <span class="hljs-built_in">list</span>(data_rows)
<button class="copy-code-btn"></button></code></pre>
<p>Please keep in mind that when creating a list or array, it’s important to ensure that all values are of the same type. Additionally, any nested dictionaries will be treated as strings. When defining JSON keys, it’s recommended to only use alphanumeric characters and underscores, as other characters may cause issues with filtering or searching.</p>
<h2 id="Define-JSON-field" class="common-anchor-header">Define JSON field<button data-href="#Define-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>To define a JSON field, simply follow the same procedure as defining fields of other types.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType

connections.connect(host=<span class="hljs-string">&#x27;localhost&#x27;</span>, port=<span class="hljs-string">&#x27;19530&#x27;</span>)

<span class="hljs-comment"># 1. define fields</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>),
    FieldSchema(name=<span class="hljs-string">&quot;title_vector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>),
    FieldSchema(name=<span class="hljs-string">&quot;article_meta&quot;</span>, dtype=DataType.JSON),
]
<span class="hljs-comment"># 2. disable dynamic schema in schema definition</span>
schema = CollectionSchema(
        fields, 
        <span class="hljs-string">&quot;The schema for a medium news collection&quot;</span>, 
        enable_dynamic_field=<span class="hljs-literal">False</span> <span class="hljs-comment"># Optional, defaults to &#x27;False&#x27;.</span>
)
<span class="hljs-comment"># 3. reference the schema in a collection</span>
collection = Collection(<span class="hljs-string">&quot;medium_articles_with_json&quot;</span>, schema)

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
<p>To accomplish the task described above, you’ll need to create a FieldSchema object that corresponds to the JSON field, and set its dtype attribute to DataType.JSON.</p>
<h2 id="Insert-Field-Values" class="common-anchor-header">Insert Field Values<button data-href="#Insert-Field-Values" class="anchor-icon" translate="no">
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
    </button></h2><p>After creating a collection from the CollectionSchema object, dictionaries such as the one above can be inserted into it.</p>
<pre><code translate="no" class="language-python">
<span class="hljs-comment"># You can directly insert the record listed at the top of this page into the collection</span>

<span class="hljs-comment"># 5. insert data</span>
collection.insert(data_rows)

<span class="hljs-comment"># Call the flush API to make inserted data immediately available for search</span>
collection.flush()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Entity counts: &quot;</span>, collection.num_entities)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># Entity counts:  5979</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-within-JSON-field" class="common-anchor-header">Search within JSON field<button data-href="#Search-within-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Once all of your data has been added, you can conduct searches using the keys in the JSON field in the same manner as you would with a standard scalar field. Simply follow these steps:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. search data</span>
result = collection.search(
    data=[data_rows[<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;title_vector&#x27;</span>]],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    param={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">3</span>,
    expr=<span class="hljs-string">&#x27;article_meta[&quot;claps&quot;] &gt; 30 and article_meta[&quot;reading_time&quot;] &lt; 10&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;article_meta&quot;</span> ],
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
            hit.entity.get(<span class="hljs-string">&quot;article_meta&quot;</span>)[<span class="hljs-string">&#x27;reading_time&#x27;</span>], 
            <span class="hljs-string">&quot;, Claps&quot;</span>, 
            hit.entity.get(<span class="hljs-string">&quot;article_meta&quot;</span>)[<span class="hljs-string">&#x27;claps&#x27;</span>]
        )

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># Matched articles: </span>
<span class="hljs-comment"># Title:  The Hidden Side Effect of the Coronavirus , Reading time:  8 , Claps 83</span>
<span class="hljs-comment"># Title:  Why The Coronavirus Mortality Rate is Misleading , Reading time:  9 , Claps 2900</span>
<span class="hljs-comment"># Title:  Coronavirus shows what ethical Amazon could look like , Reading time:  4 , Claps 51</span>
<button class="copy-code-btn"></button></code></pre>
<p>To access a particular key within a JSON field, you can reference the key name by including the JSON field name (such as article_meta[“claps”] in expr) and include the name of the JSON field in output_fields. Then you can access the keys in the returned JSON value as normal dictionaries.</p>
<p>Milvus also supports <code translate="no">json_contains</code>. You can use it to check whether the value corresponding to an array-like JSON key contains a specified element.</p>
<p>For example, if the dataset to be inserted is similar to the following:</p>
<pre><code translate="no" class="language-python">rows = [
    { <span class="hljs-string">&quot;x&quot;</span>: [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>] }
]
<button class="copy-code-btn"></button></code></pre>
<p>You can insert it as follows and have Milvus hit the only entity with <code translate="no">json_contains</code> as follows:</p>
<pre><code translate="no" class="language-python">collection.insert(rows)

<span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;json_contains(x, 2)&quot;</span>

collection.search(query_vector, <span class="hljs-string">&quot;vector&quot;</span>, search_params, <span class="hljs-built_in">limit</span>=1, <span class="hljs-built_in">expr</span>=<span class="hljs-built_in">expr</span>)
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
    </button></h2><p>When working with JSON fields, you can enclose a string value with either double quotation marks (“”) or single quotation marks (‘’). It’s important to note that Milvus stores string values in the JSON field as is without performing semantic escape or conversion. For instance, <strong>‘a&quot;b’</strong>, <strong>“a’b”</strong>, <strong>‘a\’b’</strong>, and <strong>“a\&quot;b”</strong> will be saved as is, while <strong>‘a’b’</strong> and <strong>“a&quot;b”</strong> will be treated as invalid values.</p>
<p>To build filter expressions using a JSON field, you can utilize the keys within the field. If a key’s value is an integer or a float, you can compare it with another integer or float key or an INT32/64 or FLOAT32/64 field. If a key’s value is a string, you can compare it only with another string key or a VARCHAR field.</p>
<p>The following table assumes that the value of a JSON field named <code translate="no">json_field</code> has a key named <code translate="no">A</code>. Use it as a reference when constructing boolean expressions using JSON field keys.</p>
<table>
<thead>
<tr><th>Operator</th><th>Examples</th><th>Remarks</th></tr>
</thead>
<tbody>
<tr><td><strong>&lt;</strong></td><td><code translate="no">'json_field[&quot;A&quot;] &lt; 3'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is less than 3.</td></tr>
<tr><td><strong>&gt;</strong></td><td><code translate="no">'json_field[&quot;A&quot;] &gt; 1'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is greater than 1.</td></tr>
<tr><td><strong>==</strong></td><td><code translate="no">'json_field[&quot;A&quot;] == 1'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is equal to <code translate="no">1</code>.</td></tr>
<tr><td><strong>!=</strong></td><td><code translate="no">'json_field[&quot;A&quot;][0]' != &quot;abc&quot;'</code></td><td>This expression evaluates to true if <ul><li><code translate="no">json_field</code> does not have a key named <code translate="no">A</code>.</li><li><code translate="no">json_field</code> has a key named <code translate="no">A</code> but <code translate="no">json_field[&quot;A&quot;]</code> is not an array.</li><li><code translate="no">json_field[&quot;A&quot;]</code> is an empty array.</li><li><code translate="no">json_field[&quot;A&quot;]</code> is an array but the first element is not <code translate="no">abc</code>.</li></ul></td></tr>
<tr><td><strong>&lt;=</strong></td><td><code translate="no">'json_field[&quot;A&quot;] &lt;= 5'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is less than or equal to <code translate="no">5</code>.</td></tr>
<tr><td><strong>&gt;=</strong></td><td><code translate="no">'json_field[&quot;A&quot;] &gt;= 1'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is greater than or equal to <code translate="no">1</code>.</td></tr>
<tr><td><strong>not</strong></td><td><code translate="no">'not json_field[&quot;A&quot;] == 1'</code>.</td><td>This expression evaluates to true if <ul><li><code translate="no">json_field</code> does not have a key named <code translate="no">A</code>.</li><li><code translate="no">json_field[&quot;A&quot;]</code> is not equal to <code translate="no">1</code>.</li></ul></td></tr>
<tr><td><strong>in</strong></td><td><code translate="no">'json_field[&quot;A&quot;] in [1, 2, 3]'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is <code translate="no">1</code>, <code translate="no">2</code>, or <code translate="no">3</code>.</td></tr>
<tr><td><strong>and (&amp;&amp;)</strong></td><td><code translate="no">'json_field[&quot;A&quot;] &gt; 1 &amp;&amp; json_field[&quot;A&quot;] &lt; 3'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is greater than <code translate="no">1</code> and less than <code translate="no">3</code>.</td></tr>
<tr><td>**or (\</td><td>\</td><td>)**</td><td>`’json_field[“A”] &gt; 1 \</td><td>\</td><td>json_field[“A”] &lt; 3’`</td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is greater than <code translate="no">1</code> or less than <code translate="no">3</code>.</td></tr>
<tr><td><strong>exists</strong></td><td><code translate="no">'exists json_field[&quot;A&quot;]'</code></td><td>This expression evaluates to true if <code translate="no">json_field</code> have a key named <code translate="no">A</code>.</td></tr>
<tr><td><strong>json_contains</strong></td><td><code translate="no">'json_contains(json_field[&quot;A&quot;], x)'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[A]</code> is an array and contains <code translate="no">x</code>. Note that <code translate="no">x</code> cannot be an array.</td></tr>
</tbody>
</table>
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
    </button></h2><p><a href="/docs/v2.3.x/dynamic_schema.md">Dynamic Schema</a></p>
