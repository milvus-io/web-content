---
id: timetravel.md
related_key: Time Travel
summary: Learn how to search with Time Travel in Milvus.
title: ''
---
<h1 id="Search-with-Time-Travel" class="common-anchor-header">Search with Time Travel<button data-href="#Search-with-Time-Travel" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to use the Time Travel feature during vector search.</p>
<p>Milvus maintains a timeline for all data insert and delete operations. It allows users to specify a timestamp in a search to retrieve a data view at a specified point in time, without spending tremendously on maintenance for data rollback.</p>
<div class="alert note">
By default, Milvus allows Time Travel span of 432,000 seconds (120h0m0s). You can configure this parameter in <code translate="no">common.retentionDuration</code>.
</div>
<h2 id="Preparations" class="common-anchor-header">Preparations<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>The following example code demonstrates the steps prior to inserting data.</p>
<p>If you work with your own dataset in an existing Milvus instance, you can move forward to the next step.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType
connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&#x27;localhost&#x27;</span>, port=<span class="hljs-string">&#x27;19530&#x27;</span>)
collection_name = <span class="hljs-string">&quot;test_time_travel&quot;</span>
schema = CollectionSchema([
  FieldSchema(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  FieldSchema(<span class="hljs-string">&quot;example_field&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">2</span>)
])
collection = Collection(collection_name, schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { MilvusClient } =require(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);
<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> MilvusClient(<span class="hljs-string">&quot;localhost:19530&quot;</span>);
<span class="hljs-keyword">const</span> <span class="hljs-keyword">params</span> = {
  collection_name: <span class="hljs-string">&quot;test_time_travel&quot;</span>,
  fields: [{
      name: <span class="hljs-string">&quot;example_field&quot;</span>,
      description: <span class="hljs-string">&quot;&quot;</span>,
      data_type: <span class="hljs-number">101</span>, <span class="hljs-comment">// DataType.FloatVector</span>
      type_params: {
        dim: <span class="hljs-string">&quot;2&quot;</span>,
      },
    },
    {
      name: <span class="hljs-string">&quot;pk&quot;</span>,
      data_type: <span class="hljs-number">5</span>, <span class="hljs-comment">//DataType.Int64</span>
      is_primary_key: <span class="hljs-literal">true</span>,
      description: <span class="hljs-string">&quot;&quot;</span>,
    },
  ],
};
<span class="hljs-keyword">await</span> milvusClient.collectionManager.createCollection(<span class="hljs-keyword">params</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// This function is under active development on the GO client.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">connect -h localhost -p <span class="hljs-number">19530</span> -a <span class="hljs-keyword">default</span>
create collection -c test_time_travel -f <span class="hljs-attr">pk</span>:<span class="hljs-title class_">INT64</span>:primary_field -f <span class="hljs-attr">example_field</span>:<span class="hljs-attr">FLOAT_VECTOR</span>:<span class="hljs-number">2</span> -p pk
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/collection&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collection_name&quot;: &quot;test_time_travel&quot;,
    &quot;consistency_level&quot;: 1,
    &quot;schema&quot;: {
      &quot;name&quot;: &quot;test_time_travel&quot;,
      &quot;autoID&quot;: false,
      &quot;fields&quot;: [
        {
          &quot;name&quot;: &quot;pk&quot;,
          &quot;is_primary_key&quot;: true,
          &quot;data_type&quot;: 5
        },
        {
          &quot;name&quot;: &quot;example_field&quot;,
          &quot;data_type&quot;: 101,
          &quot;type_params&quot;: [
            {
              &quot;key&quot;: &quot;dim&quot;,
              &quot;value&quot;: &quot;2&quot;
            }
          ]
        }
      ]
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-the-first-batch-of-data" class="common-anchor-header">Insert the first batch of data<button data-href="#Insert-the-first-batch-of-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Insert random data to simulate the original data (Milvus CLI example uses a pre-built, remote CSV file containing similar data).</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> <span class="hljs-type">random</span>
<span class="hljs-variable">data</span> <span class="hljs-operator">=</span> [
  [i <span class="hljs-keyword">for</span> i in <span class="hljs-title function_">range</span><span class="hljs-params">(<span class="hljs-number">10</span>)</span>],
  [[random.random() <span class="hljs-keyword">for</span> _ in <span class="hljs-title function_">range</span><span class="hljs-params">(<span class="hljs-number">2</span>)</span>] <span class="hljs-keyword">for</span> _ in <span class="hljs-title function_">range</span><span class="hljs-params">(<span class="hljs-number">10</span>)</span>],
]
batch1 = collection.insert(data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> entities1 = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">10</span> }, <span class="hljs-function">(<span class="hljs-params">v, k</span>) =&gt;</span> ({
  <span class="hljs-string">&quot;example_field&quot;</span>: <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({   <span class="hljs-attr">length</span>: <span class="hljs-number">2</span>  }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()),
  <span class="hljs-string">&quot;pk&quot;</span>: k,
}));
<span class="hljs-keyword">const</span> batch1 = milvusClient.<span class="hljs-property">dataManager</span>.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_time_travel&quot;</span>,
  <span class="hljs-attr">fields_data</span>: entities1,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// This function is under active development on the GO client.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">import</span> -c test_time_travel https://raw.githubusercontent.com/zilliztech/milvus_cli/main/examples/user_guide/search_with_timetravel_1.csv
Reading file <span class="hljs-keyword">from</span> remote URL.
Reading csv rows...  [<span class="hljs-comment">####################################]  100%</span>
Column names are [<span class="hljs-string">&#x27;pk&#x27;</span>, <span class="hljs-string">&#x27;example_field&#x27;</span>]
Processed <span class="hljs-number">11</span> lines.

Inserted successfully.

--------------------------  ------------------
Total insert entities:                      <span class="hljs-number">10</span>
Total collection entities:                  <span class="hljs-number">10</span>
Milvus timestamp:           <span class="hljs-number">430390410783752199</span>
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/entities&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
  &quot;collection_name&quot;: &quot;test_time_travel&quot;,
  &quot;fields_data&quot;: [
    {
      &quot;field_name&quot;: &quot;pk&quot;,
      &quot;type&quot;: 5,
      &quot;field&quot;: [
        0,1,2,3,4,5,6,7,8,9
      ]
    },
    {
      &quot;field_name&quot;: &quot;example_field&quot;,
      &quot;type&quot;: 101,
      &quot;field&quot;: [
        [1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1]
      ]
    }
  ],
  &quot;num_rows&quot;: 10
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Check-the-timestamp-of-the-first-data-batch" class="common-anchor-header">Check the timestamp of the first data batch<button data-href="#Check-the-timestamp-of-the-first-data-batch" class="anchor-icon" translate="no">
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
    </button></h2><p>Check the timestamp of the first data batch for search with Time Travel. Data inserted within the same batch share an identical timestamp.</p>
<pre><code translate="no" class="language-python">batch1.timestamp
428828271234252802
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">batch1.timestamp
428828271234252802
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// This function is under active development on the GO client.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Milvus CLI automatically returns the timestamp as shown in the previous step.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># Output:</span>
{
  <span class="hljs-string">&quot;status&quot;</span>:{},
  <span class="hljs-string">&quot;IDs&quot;</span>:{<span class="hljs-string">&quot;IdField&quot;</span>:{<span class="hljs-string">&quot;IntId&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>,<span class="hljs-number">10</span>]}}},
  <span class="hljs-string">&quot;succ_index&quot;</span>:[<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>],
  <span class="hljs-string">&quot;insert_cnt&quot;</span>:<span class="hljs-number">10</span>,
  <span class="hljs-string">&quot;timestamp&quot;</span>:<span class="hljs-number">434575831766925313</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
  Milvus adopts a combination of physical clock and logic counter as a hybrid timestamp. The 64-bit timestamp consists of a 46-bit physical part (high-order bits) and an 18-bit logic part (low-order bits). The physical part is the number of milliseconds that have elapsed since January 1, 1970 (midnight UTC/GMT).
</div>
<h2 id="Insert-the-second-batch-of-data" class="common-anchor-header">Insert the second batch of data<button data-href="#Insert-the-second-batch-of-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Insert the second batch of data to simulate the dirty data, among which a piece of data with primary key value <code translate="no">19</code> and vector value <code translate="no">[1.0,1.0]</code> is appended as the target data to search with in the following step (Milvus CLI example uses a pre-built, remote CSV file containing similar data).</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python">data = [
  [i <span class="hljs-keyword">for</span> i in <span class="hljs-keyword">range</span>(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>)],
  [[random.random() <span class="hljs-keyword">for</span> _ in <span class="hljs-keyword">range</span>(<span class="hljs-number">2</span>)] <span class="hljs-keyword">for</span> _ in <span class="hljs-keyword">range</span>(<span class="hljs-number">9</span>)],
]
data[<span class="hljs-number">1</span>].<span class="hljs-built_in">append</span>([<span class="hljs-number">1.0</span>,<span class="hljs-number">1.0</span>])
batch2 = collection.insert(data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> entities2 = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({
  <span class="hljs-attr">length</span>: <span class="hljs-number">9</span>
}, <span class="hljs-function">(<span class="hljs-params">v, k</span>) =&gt;</span> ({
  <span class="hljs-string">&quot;example_field&quot;</span>: <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({
    <span class="hljs-attr">length</span>: <span class="hljs-number">2</span>
  }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()),
  <span class="hljs-string">&quot;pk&quot;</span>: k + <span class="hljs-number">10</span>,
}));
entities2.<span class="hljs-title function_">push</span>({
  <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">19</span>,
  <span class="hljs-string">&quot;example_field&quot;</span>: [<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>],
});
<span class="hljs-keyword">const</span> batch2 = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">dataManager</span>.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_time_travel&quot;</span>,
  <span class="hljs-attr">fields_data</span>: entities2,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// This function is under active development on the GO client.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">import</span> -c test_time_travel https://raw.githubusercontent.com/zilliztech/milvus_cli/main/examples/user_guide/search_with_timetravel_2.csv
Reading file <span class="hljs-keyword">from</span> remote URL.
Reading csv rows...  [<span class="hljs-comment">####################################]  100%</span>
Column names are [<span class="hljs-string">&#x27;pk&#x27;</span>, <span class="hljs-string">&#x27;example_field&#x27;</span>]
Processed <span class="hljs-number">11</span> lines.

Inserted successfully.

--------------------------  ------------------
Total insert entities:                      <span class="hljs-number">10</span>
Total collection entities:                  <span class="hljs-number">20</span>
Milvus timestamp:           <span class="hljs-number">430390435713122310</span>
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/entities&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collection_name&quot;: &quot;test_time_travel&quot;,
    &quot;fields_data&quot;: [
      {
        &quot;field_name&quot;: &quot;pk&quot;,
        &quot;type&quot;: 5,
        &quot;field&quot;: [
          10,11,12,13,14,15,16,17,18,19
        ]
      },
      {
        &quot;field_name&quot;: &quot;example_field&quot;,
        &quot;type&quot;: 101,
        &quot;field&quot;: [
          [11,12],[12,12],[13,12],[14,12],[15,12],[16,12],[17,12],[18,12],[19,12],[1,1]
        ]
      }
    ],
    &quot;num_rows&quot;: 10
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;status&quot;</span>:{},
  <span class="hljs-string">&quot;IDs&quot;</span>:{<span class="hljs-string">&quot;IdField&quot;</span>:{<span class="hljs-string">&quot;IntId&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">10</span>,<span class="hljs-number">11</span>,<span class="hljs-number">12</span>,<span class="hljs-number">13</span>,<span class="hljs-number">14</span>,<span class="hljs-number">15</span>,<span class="hljs-number">16</span>,<span class="hljs-number">17</span>,<span class="hljs-number">18</span>,<span class="hljs-number">19</span>]}}},
  <span class="hljs-string">&quot;succ_index&quot;</span>:[<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>],
  <span class="hljs-string">&quot;insert_cnt&quot;</span>:<span class="hljs-number">10</span>,
  <span class="hljs-string">&quot;timestamp&quot;</span>:<span class="hljs-number">434575834238943233</span>
}
<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Search-with-a-specified-timestamp" class="common-anchor-header">Search with a specified timestamp<button data-href="#Search-with-a-specified-timestamp" class="anchor-icon" translate="no">
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
    </button></h2><p>Load the collection and search the target data with the timestamp of the first data batch. With the timestamp specified, Milvus only retrieves the data view at the point of time the timestamp indicates.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python">collection.<span class="hljs-title function_">load</span>()
search_param = {
  <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]],
  <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;example_field&quot;</span>,
  <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>},
  <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">10</span>,
  <span class="hljs-string">&quot;travel_timestamp&quot;</span>: batch1.<span class="hljs-property">timestamp</span>,
}
res = collection.<span class="hljs-title function_">search</span>(**search_param)
res[<span class="hljs-number">0</span>].<span class="hljs-property">ids</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">collectionManager</span>.<span class="hljs-title function_">loadCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_time_travel&quot;</span>,
});
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">dataManager</span>.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_time_travel&quot;</span>,
  <span class="hljs-attr">vectors</span>: [
    [<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]
  ],
  <span class="hljs-attr">travel_timestamp</span>: batch1.<span class="hljs-property">timestamp</span>,
  <span class="hljs-attr">search_params</span>: {
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;example_field&quot;</span>,
    <span class="hljs-attr">topk</span>: <span class="hljs-string">&quot;10&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-attr">params</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span>
    }),
  },
  <span class="hljs-attr">vector_type</span>: <span class="hljs-number">101</span>, <span class="hljs-comment">// DataType.FloatVector,</span>
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res1.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// This function is under active development on the GO client.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">search
Collection name (test_collection_query, test_time_travel): test_time_travel
The vectors of search data (the length of data <span class="hljs-keyword">is</span> number of query (nq), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also <span class="hljs-keyword">import</span> a CSV file without headers): [[<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]]
The vector field used to search of collection (example_field): example_field
The specified number of decimal places of returned distance [-<span class="hljs-number">1</span>]: 
The <span class="hljs-built_in">max</span> number of returned record, also known <span class="hljs-keyword">as</span> topk: <span class="hljs-number">10</span>
The boolean expression used to <span class="hljs-built_in">filter</span> attribute []: 
The names of partitions to search (split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) [<span class="hljs-string">&#x27;_default&#x27;</span>] []: 
Timeout []: 
Guarantee Timestamp(It instructs Milvus to see <span class="hljs-built_in">all</span> operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search <span class="hljs-built_in">all</span> operations performed to date) [<span class="hljs-number">0</span>]: 
Travel Timestamp(Specify a timestamp <span class="hljs-keyword">in</span> a search to get results based on a data view) [<span class="hljs-number">0</span>]: <span class="hljs-number">430390410783752199</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># Load the collection:</span>
curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/collection/load&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collection_name&quot;: &quot;test_time_travel&quot;
  }&#x27;</span>

<span class="hljs-comment"># Conduct a vector search:</span>
curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/search&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collection_name&quot;: &quot;test_time_travel&quot;,
    &quot;output_fields&quot;: [&quot;pk&quot;],
    &quot;search_params&quot;: [
      {&quot;key&quot;: &quot;anns_field&quot;, &quot;value&quot;: &quot;example_field&quot;},
      {&quot;key&quot;: &quot;topk&quot;, &quot;value&quot;: &quot;10&quot;},
      {&quot;key&quot;: &quot;params&quot;, &quot;value&quot;: &quot;{\&quot;nprobe\&quot;: 10}&quot;},
      {&quot;key&quot;: &quot;metric_type&quot;, &quot;value&quot;: &quot;L2&quot;}
    ],
    &quot;travel_timestamp&quot;: 434575831766925313,
    &quot;vectors&quot;: [ [10,10] ],
    &quot;dsl_type&quot;: 1
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>As shown below, the target data itself and other data inserted later are not returned as results.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-meta">8, 7, 4, 2, 5, 6, 9, 3, 0, 1</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">[<span class="hljs-meta">8, 7, 4, 2, 5, 6, 9, 3, 0, 1</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// This function is under active development on the GO client.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">Search results:

No.1:
+---------+------+------------+-----------+
|   Index |   ID |   Distance |     Score |
+=========+======+============+===========+
|       0 |    2 |  0.0563737 | 0.0563737 |
+---------+------+------------+-----------+
|       1 |    5 |  0.122474  | 0.122474  |
+---------+------+------------+-----------+
|       2 |    3 |  0.141737  | 0.141737  |
+---------+------+------------+-----------+
|       3 |    8 |  0.331008  | 0.331008  |
+---------+------+------------+-----------+
|       4 |    0 |  0.618705  | 0.618705  |
+---------+------+------------+-----------+
|       5 |    1 |  0.676788  | 0.676788  |
+---------+------+------------+-----------+
|       6 |    9 |  0.69871   | 0.69871   |
+---------+------+------------+-----------+
|       7 |    6 |  0.706456  | 0.706456  |
+---------+------+------------+-----------+
|       8 |    4 |  0.956929  | 0.956929  |
+---------+------+------------+-----------+
|       9 |    7 |  1.19445   | 1.19445   |
+---------+------+------------+-----------+
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;status&quot;</span>:{},
  <span class="hljs-string">&quot;results&quot;</span>:{
    <span class="hljs-string">&quot;num_queries&quot;</span>:<span class="hljs-number">1</span>,
    <span class="hljs-string">&quot;top_k&quot;</span>:<span class="hljs-number">10</span>,
    <span class="hljs-string">&quot;fields_data&quot;</span>:[
      {
        <span class="hljs-string">&quot;type&quot;</span>:<span class="hljs-number">5</span>,
        <span class="hljs-string">&quot;field_name&quot;</span>:<span class="hljs-string">&quot;pk&quot;</span>,
        <span class="hljs-string">&quot;Field&quot;</span>:{<span class="hljs-string">&quot;Scalars&quot;</span>:{<span class="hljs-string">&quot;Data&quot;</span>:{<span class="hljs-string">&quot;LongData&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">9</span>,<span class="hljs-number">8</span>,<span class="hljs-number">7</span>,<span class="hljs-number">6</span>,<span class="hljs-number">5</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>]}}}},
        <span class="hljs-string">&quot;field_id&quot;</span>:<span class="hljs-number">100</span>
      }
    ],
    <span class="hljs-string">&quot;scores&quot;</span>:[<span class="hljs-number">81</span>,<span class="hljs-number">82</span>,<span class="hljs-number">85</span>,<span class="hljs-number">90</span>,<span class="hljs-number">97</span>,<span class="hljs-number">106</span>,<span class="hljs-number">117</span>,<span class="hljs-number">130</span>,<span class="hljs-number">145</span>,<span class="hljs-number">162</span>],
    <span class="hljs-string">&quot;ids&quot;</span>:{<span class="hljs-string">&quot;IdField&quot;</span>:{<span class="hljs-string">&quot;IntId&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">9</span>,<span class="hljs-number">8</span>,<span class="hljs-number">7</span>,<span class="hljs-number">6</span>,<span class="hljs-number">5</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>]}}},
    <span class="hljs-string">&quot;topks&quot;</span>:[<span class="hljs-number">10</span>]
  },
  <span class="hljs-string">&quot;collection_name&quot;</span>:<span class="hljs-string">&quot;test_time_travel&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
</div>
<p>If you do not specify the timestamp or specify it with the timestamp of the second data batch, Milvus will return the results from both batches.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python">batch2.timestamp
<span class="hljs-number">428828283406123011</span>
search_param = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;example_field&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">10</span>,
    <span class="hljs-string">&quot;travel_timestamp&quot;</span>: batch2.timestamp,
}
res = collection.search(**search_param)
res[<span class="hljs-number">0</span>].ids
[<span class="hljs-meta">19, 10, 8, 7, 4, 17, 2, 5, 13, 15</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">batch2.<span class="hljs-property">timestamp</span>
<span class="hljs-number">428828283406123011</span>
<span class="hljs-keyword">const</span> res2 = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">dataManager</span>.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_time_travel&quot;</span>,
  <span class="hljs-attr">vectors</span>: [
    [<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]
  ],
  <span class="hljs-attr">travel_timestamp</span>: batch2.<span class="hljs-property">timestamp</span>,
  <span class="hljs-attr">search_params</span>: {
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;example_field&quot;</span>,
    <span class="hljs-attr">topk</span>: <span class="hljs-string">&quot;10&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-attr">params</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span>
    }),
  },
  <span class="hljs-attr">vector_type</span>: <span class="hljs-number">101</span>, <span class="hljs-comment">// DataType.FloatVector,</span>
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res2.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// This function is under active development on the GO client.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">search 
Collection name (test_collection_query, test_time_travel): test_time_travel
The vectors of search data (the length of data <span class="hljs-keyword">is</span> number of query (nq), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also <span class="hljs-keyword">import</span> a CSV file without headers): [[<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]]
The vector field used to search of collection (example_field): example_field
The specified number of decimal places of returned distance [-<span class="hljs-number">1</span>]: 
The <span class="hljs-built_in">max</span> number of returned record, also known <span class="hljs-keyword">as</span> topk: <span class="hljs-number">10</span>
The boolean expression used to <span class="hljs-built_in">filter</span> attribute []: 
The names of partitions to search (split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) [<span class="hljs-string">&#x27;_default&#x27;</span>] []: 
Timeout []: 
Guarantee Timestamp(It instructs Milvus to see <span class="hljs-built_in">all</span> operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search <span class="hljs-built_in">all</span> operations performed to date) [<span class="hljs-number">0</span>]: 
Travel Timestamp(Specify a timestamp <span class="hljs-keyword">in</span> a search to get results based on a data view) [<span class="hljs-number">0</span>]: 
Search results:

No<span class="hljs-number">.1</span>:
+---------+------+------------+------------+
|   Index |   ID |   Distance |      Score |
+=========+======+============+============+
|       <span class="hljs-number">0</span> |   <span class="hljs-number">19</span> | <span class="hljs-number">0</span>          | <span class="hljs-number">0</span>          |
+---------+------+------------+------------+
|       <span class="hljs-number">1</span> |   <span class="hljs-number">12</span> | <span class="hljs-number">0.00321393</span> | <span class="hljs-number">0.00321393</span> |
+---------+------+------------+------------+
|       <span class="hljs-number">2</span> |    <span class="hljs-number">2</span> | <span class="hljs-number">0.0563737</span>  | <span class="hljs-number">0.0563737</span>  |
+---------+------+------------+------------+
|       <span class="hljs-number">3</span> |    <span class="hljs-number">5</span> | <span class="hljs-number">0.122474</span>   | <span class="hljs-number">0.122474</span>   |
+---------+------+------------+------------+
|       <span class="hljs-number">4</span> |    <span class="hljs-number">3</span> | <span class="hljs-number">0.141737</span>   | <span class="hljs-number">0.141737</span>   |
+---------+------+------------+------------+
|       <span class="hljs-number">5</span> |   <span class="hljs-number">10</span> | <span class="hljs-number">0.238646</span>   | <span class="hljs-number">0.238646</span>   |
+---------+------+------------+------------+
|       <span class="hljs-number">6</span> |    <span class="hljs-number">8</span> | <span class="hljs-number">0.331008</span>   | <span class="hljs-number">0.331008</span>   |
+---------+------+------------+------------+
|       <span class="hljs-number">7</span> |   <span class="hljs-number">18</span> | <span class="hljs-number">0.403166</span>   | <span class="hljs-number">0.403166</span>   |
+---------+------+------------+------------+
|       <span class="hljs-number">8</span> |   <span class="hljs-number">13</span> | <span class="hljs-number">0.508617</span>   | <span class="hljs-number">0.508617</span>   |
+---------+------+------------+------------+
|       <span class="hljs-number">9</span> |   <span class="hljs-number">11</span> | <span class="hljs-number">0.531529</span>   | <span class="hljs-number">0.531529</span>   |
+---------+------+------------+------------+
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/search&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collection_name&quot;: &quot;test_time_travel&quot;,
    &quot;output_fields&quot;: [&quot;pk&quot;],
    &quot;search_params&quot;: [
      {&quot;key&quot;: &quot;anns_field&quot;, &quot;value&quot;: &quot;example_field&quot;},
      {&quot;key&quot;: &quot;topk&quot;, &quot;value&quot;: &quot;10&quot;},
      {&quot;key&quot;: &quot;params&quot;, &quot;value&quot;: &quot;{\&quot;nprobe\&quot;: 10}&quot;},
      {&quot;key&quot;: &quot;metric_type&quot;, &quot;value&quot;: &quot;L2&quot;}
    ],
    &quot;vectors&quot;: [ [11,11] ],
    &quot;dsl_type&quot;: 1
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;status&quot;</span>:{},
  <span class="hljs-string">&quot;results&quot;</span>:{
    <span class="hljs-string">&quot;num_queries&quot;</span>:<span class="hljs-number">1</span>,
    <span class="hljs-string">&quot;top_k&quot;</span>:<span class="hljs-number">10</span>,
    <span class="hljs-string">&quot;fields_data&quot;</span>:[
      {
        <span class="hljs-string">&quot;type&quot;</span>:<span class="hljs-number">5</span>,
        <span class="hljs-string">&quot;field_name&quot;</span>:<span class="hljs-string">&quot;pk&quot;</span>,
        <span class="hljs-string">&quot;Field&quot;</span>:{<span class="hljs-string">&quot;Scalars&quot;</span>:{<span class="hljs-string">&quot;Data&quot;</span>:{<span class="hljs-string">&quot;LongData&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">10</span>,<span class="hljs-number">11</span>,<span class="hljs-number">12</span>,<span class="hljs-number">13</span>,<span class="hljs-number">14</span>,<span class="hljs-number">15</span>,<span class="hljs-number">16</span>,<span class="hljs-number">17</span>,<span class="hljs-number">18</span>,<span class="hljs-number">9</span>]}}}},
        <span class="hljs-string">&quot;field_id&quot;</span>:<span class="hljs-number">100</span>
      }
    ],
    <span class="hljs-string">&quot;scores&quot;</span>:[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-number">10</span>,<span class="hljs-number">17</span>,<span class="hljs-number">26</span>,<span class="hljs-number">37</span>,<span class="hljs-number">50</span>,<span class="hljs-number">65</span>,<span class="hljs-number">101</span>],
    <span class="hljs-string">&quot;ids&quot;</span>:{<span class="hljs-string">&quot;IdField&quot;</span>:{<span class="hljs-string">&quot;IntId&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">10</span>,<span class="hljs-number">11</span>,<span class="hljs-number">12</span>,<span class="hljs-number">13</span>,<span class="hljs-number">14</span>,<span class="hljs-number">15</span>,<span class="hljs-number">16</span>,<span class="hljs-number">17</span>,<span class="hljs-number">18</span>,<span class="hljs-number">9</span>]}}},
    <span class="hljs-string">&quot;topks&quot;</span>:[<span class="hljs-number">10</span>]
  },
  <span class="hljs-string">&quot;collection_name&quot;</span>:<span class="hljs-string">&quot;test_time_travel&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Generate-a-timestamp-for-search" class="common-anchor-header">Generate a timestamp for search<button data-href="#Generate-a-timestamp-for-search" class="anchor-icon" translate="no">
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
    </button></h2><p>In the case that the previous timestamp is not recorded, Milvus allows you to generate a timestamp using an existing timestamp, Unix Epoch time, or date time.</p>
<p>The following example simulates an unwanted deletion operation and shows how to generate a timestamp prior to the deletion and search with it.</p>
<p>Generate a timestamp based on the date time or Unix Epoch time prior to the deletion.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> <span class="hljs-type">datetime</span>
<span class="hljs-variable">datetime</span> <span class="hljs-operator">=</span> datetime.datetime.now()
from pymilvus <span class="hljs-keyword">import</span> <span class="hljs-type">utility</span>
<span class="hljs-variable">pre_del_timestamp</span> <span class="hljs-operator">=</span> utility.mkts_from_datetime(datetime)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> {  datetimeToHybrids } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node/milvus/utils/Format&quot;</span>);
<span class="hljs-keyword">const</span> datetime = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">getTime</span>()
<span class="hljs-keyword">const</span> pre_del_timestamp = <span class="hljs-title function_">datetimeToHybrids</span>(datetime)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// This function is under active development on the GO client.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">calc mkts_from_unixtime -e 1641809375
430390476800000000
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># This function is not supported. It is suggested to use Milvus_CLI.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Delete part of the data to simulate an accidental deletion operation.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;pk in [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]&quot;</span>
collection.delete(<span class="hljs-built_in">expr</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const <span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;pk in [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]&quot;</span>
await milvusClient.dataManager.deleteEntities({
  collection_name: <span class="hljs-string">&quot;test_time_travel&quot;</span>,
  <span class="hljs-built_in">expr</span>: <span class="hljs-built_in">expr</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// This function is under active development on the GO client.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> entities -c test_time_travel
<span class="hljs-title class_">The</span> expression to specify entities to be deleted, such <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;film_id in [ 0, 1 ]&quot;</span>: pk <span class="hljs-keyword">in</span> [<span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">10</span>, <span class="hljs-number">12</span>, <span class="hljs-number">14</span>, <span class="hljs-number">16</span>, <span class="hljs-number">18</span>]
<span class="hljs-title class_">You</span> are trying to <span class="hljs-keyword">delete</span> the entities <span class="hljs-keyword">of</span> collection. <span class="hljs-title class_">This</span> action cannot be undone!

<span class="hljs-title class_">Do</span> you want to <span class="hljs-keyword">continue</span>? [y/N]: <span class="hljs-title function_">y</span>
(insert <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>, <span class="hljs-keyword">delete</span> <span class="hljs-attr">count</span>: <span class="hljs-number">10</span>, upsert <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">timestamp</span>: <span class="hljs-number">430390494161534983</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;DELETE&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/entities&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collection_name&quot;: &quot;test_time_travel&quot;,
    &quot;expr&quot;: &quot;pk in [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]&quot;
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;status&quot;</span>:{},
  <span class="hljs-string">&quot;IDs&quot;</span>:{<span class="hljs-string">&quot;IdField&quot;</span>:{<span class="hljs-string">&quot;IntId&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">0</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">6</span>,<span class="hljs-number">8</span>,<span class="hljs-number">10</span>,<span class="hljs-number">12</span>,<span class="hljs-number">14</span>,<span class="hljs-number">16</span>,<span class="hljs-number">18</span>]}}},
  <span class="hljs-string">&quot;delete_cnt&quot;</span>:<span class="hljs-number">10</span>,
  <span class="hljs-string">&quot;timestamp&quot;</span>: <span class="hljs-number">434575874068316161</span>
}
<button class="copy-code-btn"></button></code></pre>
</div>
<p>As shown below, the deleted entities are not returned in the results if you search without specifying the timestamp.</p>
<pre><code translate="no" class="language-python">search_param = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;example_field&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">10</span>,
}
res = collection.<span class="hljs-title function_">search</span>(**search_param)
res[<span class="hljs-number">0</span>].<span class="hljs-property">ids</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res3 = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">dataManager</span>.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_time_travel&quot;</span>,
  <span class="hljs-attr">vectors</span>: [
    [<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]
  ],
  <span class="hljs-attr">search_params</span>: {
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;example_field&quot;</span>,
    <span class="hljs-attr">topk</span>: <span class="hljs-string">&quot;10&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-attr">params</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span>
    }),
  },
  <span class="hljs-attr">vector_type</span>: <span class="hljs-number">101</span>, <span class="hljs-comment">// DataType.FloatVector,</span>
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res3.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// This function is under active development on the GO client.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">search 
Collection name (test_collection_query, test_time_travel): test_time_travel
The vectors of search data (the length of data <span class="hljs-keyword">is</span> number of query (nq), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also <span class="hljs-keyword">import</span> a CSV file without headers): [[<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]]
The vector field used to search of collection (example_field): example_field
The specified number of decimal places of returned distance [-<span class="hljs-number">1</span>]: 
The <span class="hljs-built_in">max</span> number of returned record, also known <span class="hljs-keyword">as</span> topk: <span class="hljs-number">10</span>
The boolean expression used to <span class="hljs-built_in">filter</span> attribute []: 
The names of partitions to search (split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) [<span class="hljs-string">&#x27;_default&#x27;</span>] []: 
Timeout []: 
Guarantee Timestamp(It instructs Milvus to see <span class="hljs-built_in">all</span> operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search <span class="hljs-built_in">all</span> operations performed to date) [<span class="hljs-number">0</span>]: 
Travel Timestamp(Specify a timestamp <span class="hljs-keyword">in</span> a search to get results based on a data view) [<span class="hljs-number">0</span>]: 
Search results:

No<span class="hljs-number">.1</span>:
+---------+------+------------+----------+
|   Index |   ID |   Distance |    Score |
+=========+======+============+==========+
|       <span class="hljs-number">0</span> |   <span class="hljs-number">19</span> |   <span class="hljs-number">0</span>        | <span class="hljs-number">0</span>        |
+---------+------+------------+----------+
|       <span class="hljs-number">1</span> |    <span class="hljs-number">5</span> |   <span class="hljs-number">0.122474</span> | <span class="hljs-number">0.122474</span> |
+---------+------+------------+----------+
|       <span class="hljs-number">2</span> |    <span class="hljs-number">3</span> |   <span class="hljs-number">0.141737</span> | <span class="hljs-number">0.141737</span> |
+---------+------+------------+----------+
|       <span class="hljs-number">3</span> |   <span class="hljs-number">13</span> |   <span class="hljs-number">0.508617</span> | <span class="hljs-number">0.508617</span> |
+---------+------+------------+----------+
|       <span class="hljs-number">4</span> |   <span class="hljs-number">11</span> |   <span class="hljs-number">0.531529</span> | <span class="hljs-number">0.531529</span> |
+---------+------+------------+----------+
|       <span class="hljs-number">5</span> |   <span class="hljs-number">17</span> |   <span class="hljs-number">0.593702</span> | <span class="hljs-number">0.593702</span> |
+---------+------+------------+----------+
|       <span class="hljs-number">6</span> |    <span class="hljs-number">1</span> |   <span class="hljs-number">0.676788</span> | <span class="hljs-number">0.676788</span> |
+---------+------+------------+----------+
|       <span class="hljs-number">7</span> |    <span class="hljs-number">9</span> |   <span class="hljs-number">0.69871</span>  | <span class="hljs-number">0.69871</span>  |
+---------+------+------------+----------+
|       <span class="hljs-number">8</span> |    <span class="hljs-number">7</span> |   <span class="hljs-number">1.19445</span>  | <span class="hljs-number">1.19445</span>  |
+---------+------+------------+----------+
|       <span class="hljs-number">9</span> |   <span class="hljs-number">15</span> |   <span class="hljs-number">1.53964</span>  | <span class="hljs-number">1.53964</span>  |
+---------+------+------------+----------+
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/search&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collection_name&quot;: &quot;test_time_travel&quot;,
    &quot;output_fields&quot;: [&quot;pk&quot;],
    &quot;search_params&quot;: [
      {&quot;key&quot;: &quot;anns_field&quot;, &quot;value&quot;: &quot;example_field&quot;},
      {&quot;key&quot;: &quot;topk&quot;, &quot;value&quot;: &quot;10&quot;},
      {&quot;key&quot;: &quot;params&quot;, &quot;value&quot;: &quot;{\&quot;nprobe\&quot;: 10}&quot;},
      {&quot;key&quot;: &quot;metric_type&quot;, &quot;value&quot;: &quot;L2&quot;}
    ],
    &quot;vectors&quot;: [ [11,11] ],
    &quot;dsl_type&quot;: 1
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;status&quot;</span>:{},
  <span class="hljs-string">&quot;results&quot;</span>:{
    <span class="hljs-string">&quot;num_queries&quot;</span>:<span class="hljs-number">1</span>,
    <span class="hljs-string">&quot;top_k&quot;</span>:<span class="hljs-number">10</span>,
    <span class="hljs-string">&quot;fields_data&quot;</span>:[
      {
        <span class="hljs-string">&quot;type&quot;</span>:<span class="hljs-number">5</span>,
        <span class="hljs-string">&quot;field_name&quot;</span>:<span class="hljs-string">&quot;pk&quot;</span>,
        <span class="hljs-string">&quot;Field&quot;</span>:{<span class="hljs-string">&quot;Scalars&quot;</span>:{<span class="hljs-string">&quot;Data&quot;</span>:{<span class="hljs-string">&quot;LongData&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">11</span>,<span class="hljs-number">13</span>,<span class="hljs-number">15</span>,<span class="hljs-number">17</span>,<span class="hljs-number">9</span>,<span class="hljs-number">7</span>,<span class="hljs-number">5</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-number">19</span>]}}}},
        <span class="hljs-string">&quot;field_id&quot;</span>:<span class="hljs-number">100</span>
      }
    ],
    <span class="hljs-string">&quot;scores&quot;</span>:[<span class="hljs-number">2</span>,<span class="hljs-number">10</span>,<span class="hljs-number">26</span>,<span class="hljs-number">50</span>,<span class="hljs-number">101</span>,<span class="hljs-number">109</span>,<span class="hljs-number">125</span>,<span class="hljs-number">149</span>,<span class="hljs-number">181</span>,<span class="hljs-number">200</span>],
    <span class="hljs-string">&quot;ids&quot;</span>:{<span class="hljs-string">&quot;IdField&quot;</span>:{<span class="hljs-string">&quot;IntId&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">11</span>,<span class="hljs-number">13</span>,<span class="hljs-number">15</span>,<span class="hljs-number">17</span>,<span class="hljs-number">9</span>,<span class="hljs-number">7</span>,<span class="hljs-number">5</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-number">19</span>]}}},
    <span class="hljs-string">&quot;topks&quot;</span>:[<span class="hljs-number">10</span>]
  },
  <span class="hljs-string">&quot;collection_name&quot;</span>:<span class="hljs-string">&quot;test_time_travel&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
</div>
<p>Search with the prior-to-deletion timestamp. Milvus retrieves entities from the data before the deletion.</p>
<pre><code translate="no" class="language-python">search_param = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;example_field&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">10</span>,
    <span class="hljs-string">&quot;travel_timestamp&quot;</span>: pre_del_timestamp,
}
res = collection.<span class="hljs-title function_">search</span>(**search_param)
res[<span class="hljs-number">0</span>].<span class="hljs-property">ids</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res4 = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">dataManager</span>.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_time_travel&quot;</span>,
  <span class="hljs-attr">vectors</span>: [
    [<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]
  ],
  <span class="hljs-attr">travel_timestamp</span>: pre_del_timestamp,
  <span class="hljs-attr">search_params</span>: {
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;example_field&quot;</span>,
    <span class="hljs-attr">topk</span>: <span class="hljs-string">&quot;10&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-attr">params</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span>
    }),
  },
  <span class="hljs-attr">vector_type</span>: <span class="hljs-number">101</span>, <span class="hljs-comment">// DataType.FloatVector,</span>
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res4.<span class="hljs-property">results</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// This function is under active development on the GO client.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">search 
Collection name (test_collection_query, test_time_travel): test_time_travel
The vectors of search data (the length of data <span class="hljs-keyword">is</span> number of query (nq), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also <span class="hljs-keyword">import</span> a CSV file without headers): [[<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]]
The vector field used to search of collection (example_field): example_field
The specified number of decimal places of returned distance [-<span class="hljs-number">1</span>]: 
The <span class="hljs-built_in">max</span> number of returned record, also known <span class="hljs-keyword">as</span> topk: <span class="hljs-number">10</span>
The boolean expression used to <span class="hljs-built_in">filter</span> attribute []: 
The names of partitions to search (split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) [<span class="hljs-string">&#x27;_default&#x27;</span>] []: 
Timeout []: 
Guarantee Timestamp(It instructs Milvus to see <span class="hljs-built_in">all</span> operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search <span class="hljs-built_in">all</span> operations performed to date) [<span class="hljs-number">0</span>]: 
Travel Timestamp(Specify a timestamp <span class="hljs-keyword">in</span> a search to get results based on a data view) [<span class="hljs-number">0</span>]: <span class="hljs-number">430390476800000000</span>
Search results:

No<span class="hljs-number">.1</span>:
+---------+------+------------+------------+
|   Index |   ID |   Distance |      Score |
+=========+======+============+============+
|       <span class="hljs-number">0</span> |   <span class="hljs-number">19</span> | <span class="hljs-number">0</span>          | <span class="hljs-number">0</span>          |
+---------+------+------------+------------+
|       <span class="hljs-number">1</span> |   <span class="hljs-number">12</span> | <span class="hljs-number">0.00321393</span> | <span class="hljs-number">0.00321393</span> |
+---------+------+------------+------------+
|       <span class="hljs-number">2</span> |    <span class="hljs-number">2</span> | <span class="hljs-number">0.0563737</span>  | <span class="hljs-number">0.0563737</span>  |
+---------+------+------------+------------+
|       <span class="hljs-number">3</span> |    <span class="hljs-number">5</span> | <span class="hljs-number">0.122474</span>   | <span class="hljs-number">0.122474</span>   |
+---------+------+------------+------------+
|       <span class="hljs-number">4</span> |    <span class="hljs-number">3</span> | <span class="hljs-number">0.141737</span>   | <span class="hljs-number">0.141737</span>   |
+---------+------+------------+------------+
|       <span class="hljs-number">5</span> |   <span class="hljs-number">10</span> | <span class="hljs-number">0.238646</span>   | <span class="hljs-number">0.238646</span>   |
+---------+------+------------+------------+
|       <span class="hljs-number">6</span> |    <span class="hljs-number">8</span> | <span class="hljs-number">0.331008</span>   | <span class="hljs-number">0.331008</span>   |
+---------+------+------------+------------+
|       <span class="hljs-number">7</span> |   <span class="hljs-number">18</span> | <span class="hljs-number">0.403166</span>   | <span class="hljs-number">0.403166</span>   |
+---------+------+------------+------------+
|       <span class="hljs-number">8</span> |   <span class="hljs-number">13</span> | <span class="hljs-number">0.508617</span>   | <span class="hljs-number">0.508617</span>   |
+---------+------+------------+------------+
|       <span class="hljs-number">9</span> |   <span class="hljs-number">11</span> | <span class="hljs-number">0.531529</span>   | <span class="hljs-number">0.531529</span>   |
+---------+------+------------+------------+
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/search&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collection_name&quot;: &quot;test_time_travel&quot;,
    &quot;output_fields&quot;: [&quot;pk&quot;],
    &quot;search_params&quot;: [
      {&quot;key&quot;: &quot;anns_field&quot;, &quot;value&quot;: &quot;example_field&quot;},
      {&quot;key&quot;: &quot;topk&quot;, &quot;value&quot;: &quot;10&quot;},
      {&quot;key&quot;: &quot;params&quot;, &quot;value&quot;: &quot;{\&quot;nprobe\&quot;: 10}&quot;},
      {&quot;key&quot;: &quot;metric_type&quot;, &quot;value&quot;: &quot;L2&quot;}
    ],
    &quot;travel_timestamp&quot;: 434284782724317186,
    &quot;vectors&quot;: [ [10,10] ],
    &quot;dsl_type&quot;: 1
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;status&quot;</span>:{},
  <span class="hljs-string">&quot;results&quot;</span>:{
    <span class="hljs-string">&quot;num_queries&quot;</span>:<span class="hljs-number">1</span>,
    <span class="hljs-string">&quot;top_k&quot;</span>:<span class="hljs-number">10</span>,
    <span class="hljs-string">&quot;fields_data&quot;</span>:[
      {
        <span class="hljs-string">&quot;type&quot;</span>:<span class="hljs-number">5</span>,
        <span class="hljs-string">&quot;field_name&quot;</span>:<span class="hljs-string">&quot;pk&quot;</span>,
        <span class="hljs-string">&quot;Field&quot;</span>:{<span class="hljs-string">&quot;Scalars&quot;</span>:{<span class="hljs-string">&quot;Data&quot;</span>:{<span class="hljs-string">&quot;LongData&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">11</span>,<span class="hljs-number">12</span>,<span class="hljs-number">13</span>,<span class="hljs-number">14</span>,<span class="hljs-number">15</span>,<span class="hljs-number">16</span>,<span class="hljs-number">17</span>,<span class="hljs-number">18</span>,<span class="hljs-number">10</span>,<span class="hljs-number">9</span>]}}}},
        <span class="hljs-string">&quot;field_id&quot;</span>:<span class="hljs-number">100</span>}
    ],
    <span class="hljs-string">&quot;scores&quot;</span>:[<span class="hljs-number">5</span>,<span class="hljs-number">8</span>,<span class="hljs-number">13</span>,<span class="hljs-number">20</span>,<span class="hljs-number">29</span>,<span class="hljs-number">40</span>,<span class="hljs-number">53</span>,<span class="hljs-number">68</span>,<span class="hljs-number">81</span>,<span class="hljs-number">82</span>],
    <span class="hljs-string">&quot;ids&quot;</span>:{<span class="hljs-string">&quot;IdField&quot;</span>:{<span class="hljs-string">&quot;IntId&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">11</span>,<span class="hljs-number">12</span>,<span class="hljs-number">13</span>,<span class="hljs-number">14</span>,<span class="hljs-number">15</span>,<span class="hljs-number">16</span>,<span class="hljs-number">17</span>,<span class="hljs-number">18</span>,<span class="hljs-number">10</span>,<span class="hljs-number">9</span>]}}},
    <span class="hljs-string">&quot;topks&quot;</span>:[<span class="hljs-number">10</span>]
  },
  <span class="hljs-string">&quot;collection_name&quot;</span>:<span class="hljs-string">&quot;test_time_travel&quot;</span>
}
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
    </button></h2><ul>
<li><p>Learn more basic operations of Milvus:</p>
<ul>
<li><a href="/docs/v2.1.x/query.md">Query vectors</a></li>
<li><a href="/docs/v2.1.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
<li><p>Explore API references for Milvus SDKs:</p>
<ul>
<li><a href="/api-reference/pymilvus/v2.1.x/About.md">PyMilvus API reference</a></li>
<li><a href="/api-reference/node/v2.1.x/About.md">Node.js API reference</a></li>
<li><a href="/api-reference/go/v2.1.x/About.md">Go API reference</a></li>
<li><a href="/api-reference/java/v2.1.x/About.md">Java API reference</a></li>
</ul></li>
</ul>
