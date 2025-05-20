---
id: insert_data.md
related_key: insert
summary: Learn how to insert data in Milvus.
title: ''
---
<h1 id="Insert-Data" class="common-anchor-header">Insert Data<button data-href="#Insert-Data" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to insert data in Milvus via client.</p>
<p>You can also migrate data to Milvus with <a href="/docs/v2.1.x/migrate_overview.md">MilvusDM</a>, an open-source tool designed specifically for importing and exporting data with Milvus.</p>
<p>Milvus 2.1 supports VARCHAR data type on scalar field. When building indexes for VARCHAR-type scalar fields, the default index type is dictionary tree.</p>
<p>The following example inserts 2,000 rows of randomly generated data as the example data (Milvus CLI example uses a pre-built, remote CSV file containing similar data). Real applications will likely use much higher dimensional vectors than the example. You can prepare your own data to replace the example.</p>
<h2 id="Prepare-data" class="common-anchor-header">Prepare data<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>First, prepare the data to insert.  Data type of the data to insert must match the schema of the collection, otherwise Milvus will raise exception.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
data = [
  [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">2000</span>)],
  [<span class="hljs-built_in">str</span>(i) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">2000</span>)],
  [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10000</span>, <span class="hljs-number">12000</span>)],
  [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">2</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">2000</span>)],
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">2000</span> }, <span class="hljs-function">(<span class="hljs-params">v,k</span>) =&gt;</span> ({
  <span class="hljs-string">&quot;book_id&quot;</span>: k,
  <span class="hljs-string">&quot;word_count&quot;</span>: k+<span class="hljs-number">10000</span>,
  <span class="hljs-string">&quot;book_intro&quot;</span>: <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">2</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()),
}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bookIDs := <span class="hljs-built_in">make</span>([]<span class="hljs-type">int64</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2000</span>)
wordCounts := <span class="hljs-built_in">make</span>([]<span class="hljs-type">int64</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2000</span>)
bookIntros := <span class="hljs-built_in">make</span>([][]<span class="hljs-type">float32</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2000</span>)
<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">2000</span>; i++ {
    bookIDs = <span class="hljs-built_in">append</span>(bookIDs, <span class="hljs-type">int64</span>(i))
    wordCounts = <span class="hljs-built_in">append</span>(wordCounts, <span class="hljs-type">int64</span>(i+<span class="hljs-number">10000</span>))
    v := <span class="hljs-built_in">make</span>([]<span class="hljs-type">float32</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>)
    <span class="hljs-keyword">for</span> j := <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">2</span>; j++ {
        v = <span class="hljs-built_in">append</span>(v, rand.Float32())
    }
    bookIntros = <span class="hljs-built_in">append</span>(bookIntros, v)
}
idColumn := entity.NewColumnInt64(<span class="hljs-string">&quot;book_id&quot;</span>, bookIDs)
wordColumn := entity.NewColumnInt64(<span class="hljs-string">&quot;word_count&quot;</span>, wordCounts)
introColumn := entity.NewColumnFloatVector(<span class="hljs-string">&quot;book_intro&quot;</span>, <span class="hljs-number">2</span>, bookIntros)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Random ran = <span class="hljs-keyword">new</span> Random();
List&lt;Long&gt; book_id_array = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
List&lt;Long&gt; word_count_array = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
List&lt;List&lt;Float&gt;&gt; book_intro_array = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-built_in">long</span> i = <span class="hljs-number">0L</span>; i &lt; <span class="hljs-number">2000</span>; ++i) {
    book_id_array.<span class="hljs-keyword">add</span>(i);
    word_count_array.<span class="hljs-keyword">add</span>(i + <span class="hljs-number">10000</span>);
    List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">int</span> k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-number">2</span>; ++k) {
        vector.<span class="hljs-keyword">add</span>(ran.nextFloat());
    }
    book_intro_array.<span class="hljs-keyword">add</span>(vector);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Prepare your data in a CSV file. Milvus CLI only supports importing data from local or remote files.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># See the following step.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data-to-Milvus" class="common-anchor-header">Insert data to Milvus<button data-href="#Insert-data-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Insert the data to the collection.</p>
<p>By specifying <code translate="no">partition_name</code>, you can optionally decide to which partition to insert the data.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      <span class="hljs-comment"># Get an existing collection.</span>
mr = collection.insert(data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> mr = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">dataManager</span>.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
  <span class="hljs-attr">fields_data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = milvusClient.<span class="hljs-title class_">Insert</span>(
    context.<span class="hljs-title class_">Background</span>(), <span class="hljs-comment">// ctx</span>
    <span class="hljs-string">&quot;book&quot;</span>,               <span class="hljs-comment">// CollectionName</span>
    <span class="hljs-string">&quot;&quot;</span>,                   <span class="hljs-comment">// partitionName</span>
    idColumn,             <span class="hljs-comment">// columnarData</span>
    wordColumn,           <span class="hljs-comment">// columnarData</span>
    introColumn,          <span class="hljs-comment">// columnarData</span>
)
<span class="hljs-keyword">if</span> err != nil {
    log.<span class="hljs-title class_">Fatal</span>(<span class="hljs-string">&quot;failed to insert data:&quot;</span>, err.<span class="hljs-title class_">Error</span>())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;InsertParam.Field&gt; fields = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
fields.<span class="hljs-keyword">add</span>(<span class="hljs-keyword">new</span> InsertParam.Field(<span class="hljs-string">&quot;book_id&quot;</span>, DataType.Int64, book_id_array));
fields.<span class="hljs-keyword">add</span>(<span class="hljs-keyword">new</span> InsertParam.Field(<span class="hljs-string">&quot;word_count&quot;</span>, DataType.Int64, word_count_array));
fields.<span class="hljs-keyword">add</span>(<span class="hljs-keyword">new</span> InsertParam.Field(<span class="hljs-string">&quot;book_intro&quot;</span>, DataType.FloatVector, book_intro_array));

InsertParam insertParam = InsertParam.newBuilder()
  .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
  .withPartitionName(<span class="hljs-string">&quot;novel&quot;</span>)
  .withFields(fields)
  .build();
milvusClient.insert(insertParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">import</span> -c book <span class="hljs-string">&#x27;https://raw.githubusercontent.com/milvus-io/milvus_cli/main/examples/user_guide/search.csv&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/entities&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
  &quot;collection_name&quot;: &quot;book&quot;,
  &quot;fields_data&quot;: [
    {
      &quot;field_name&quot;: &quot;book_id&quot;,
      &quot;type&quot;: 5,
      &quot;field&quot;: [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100
      ]
    },
    {
      &quot;field_name&quot;: &quot;word_count&quot;,
      &quot;type&quot;: 5,
      &quot;field&quot;: [
        1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,15000,16000,17000,18000,19000,20000,21000,22000,23000,24000,25000,26000,27000,28000,29000,30000,31000,32000,33000,34000,35000,36000,37000,38000,39000,40000,41000,42000,43000,44000,45000,46000,47000,48000,49000,50000,51000,52000,53000,54000,55000,56000,57000,58000,59000,60000,61000,62000,63000,64000,65000,66000,67000,68000,69000,70000,71000,72000,73000,74000,75000,76000,77000,78000,79000,80000,81000,82000,83000,84000,85000,86000,87000,88000,89000,90000,91000,92000,93000,94000,95000,96000,97000,98000,99000,100000
      ]
    },
    {
      &quot;field_name&quot;: &quot;book_intro&quot;,
      &quot;type&quot;: 101,
      &quot;field&quot;: [
        [1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[15,1],[16,1],[17,1],[18,1],[19,1],[20,1],[21,1],[22,1],[23,1],[24,1],[25,1],[26,1],[27,1],[28,1],[29,1],[30,1],[31,1],[32,1],[33,1],[34,1],[35,1],[36,1],[37,1],[38,1],[39,1],[40,1],[41,1],[42,1],[43,1],[44,1],[45,1],[46,1],[47,1],[48,1],[49,1],[50,1],[51,1],[52,1],[53,1],[54,1],[55,1],[56,1],[57,1],[58,1],[59,1],[60,1],[61,1],[62,1],[63,1],[64,1],[65,1],[66,1],[67,1],[68,1],[69,1],[70,1],[71,1],[72,1],[73,1],[74,1],[75,1],[76,1],[77,1],[78,1],[79,1],[80,1],[81,1],[82,1],[83,1],[84,1],[85,1],[86,1],[87,1],[88,1],[89,1],[90,1],[91,1],[92,1],[93,1],[94,1],[95,1],[96,1],[97,1],[98,1],[99,1],[100,1]
      ]
    }
  ],
  &quot;num_rows&quot;: 100
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;status&quot;</span>:{},
  <span class="hljs-string">&quot;IDs&quot;</span>:{
    <span class="hljs-string">&quot;IdField&quot;</span>:{
      <span class="hljs-string">&quot;IntId&quot;</span>:{<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>,<span class="hljs-number">10</span>,<span class="hljs-number">11</span>,<span class="hljs-number">12</span>,<span class="hljs-number">13</span>,<span class="hljs-number">14</span>,<span class="hljs-number">15</span>,<span class="hljs-number">16</span>,<span class="hljs-number">17</span>,<span class="hljs-number">18</span>,<span class="hljs-number">19</span>,<span class="hljs-number">20</span>,<span class="hljs-number">21</span>,<span class="hljs-number">22</span>,<span class="hljs-number">23</span>,<span class="hljs-number">24</span>,<span class="hljs-number">25</span>,<span class="hljs-number">26</span>,<span class="hljs-number">27</span>,<span class="hljs-number">28</span>,<span class="hljs-number">29</span>,<span class="hljs-number">30</span>,<span class="hljs-number">31</span>,<span class="hljs-number">32</span>,<span class="hljs-number">33</span>,<span class="hljs-number">34</span>,<span class="hljs-number">35</span>,<span class="hljs-number">36</span>,<span class="hljs-number">37</span>,<span class="hljs-number">38</span>,<span class="hljs-number">39</span>,<span class="hljs-number">40</span>,<span class="hljs-number">41</span>,<span class="hljs-number">42</span>,<span class="hljs-number">43</span>,<span class="hljs-number">44</span>,<span class="hljs-number">45</span>,<span class="hljs-number">46</span>,<span class="hljs-number">47</span>,<span class="hljs-number">48</span>,<span class="hljs-number">49</span>,<span class="hljs-number">50</span>,<span class="hljs-number">51</span>,<span class="hljs-number">52</span>,<span class="hljs-number">53</span>,<span class="hljs-number">54</span>,<span class="hljs-number">55</span>,<span class="hljs-number">56</span>,<span class="hljs-number">57</span>,<span class="hljs-number">58</span>,<span class="hljs-number">59</span>,<span class="hljs-number">60</span>,<span class="hljs-number">61</span>,<span class="hljs-number">62</span>,<span class="hljs-number">63</span>,<span class="hljs-number">64</span>,<span class="hljs-number">65</span>,<span class="hljs-number">66</span>,<span class="hljs-number">67</span>,<span class="hljs-number">68</span>,<span class="hljs-number">69</span>,<span class="hljs-number">70</span>,<span class="hljs-number">71</span>,<span class="hljs-number">72</span>,<span class="hljs-number">73</span>,<span class="hljs-number">74</span>,<span class="hljs-number">75</span>,<span class="hljs-number">76</span>,<span class="hljs-number">77</span>,<span class="hljs-number">78</span>,<span class="hljs-number">79</span>,<span class="hljs-number">80</span>,<span class="hljs-number">81</span>,<span class="hljs-number">82</span>,<span class="hljs-number">83</span>,<span class="hljs-number">84</span>,<span class="hljs-number">85</span>,<span class="hljs-number">86</span>,<span class="hljs-number">87</span>,<span class="hljs-number">88</span>,<span class="hljs-number">89</span>,<span class="hljs-number">90</span>,<span class="hljs-number">91</span>,<span class="hljs-number">92</span>,<span class="hljs-number">93</span>,<span class="hljs-number">94</span>,<span class="hljs-number">95</span>,<span class="hljs-number">96</span>,<span class="hljs-number">97</span>,<span class="hljs-number">98</span>,<span class="hljs-number">99</span>,<span class="hljs-number">100</span>]
      }
    }
  },
  <span class="hljs-string">&quot;succ_index&quot;</span>:[<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>,<span class="hljs-number">10</span>,<span class="hljs-number">11</span>,<span class="hljs-number">12</span>,<span class="hljs-number">13</span>,<span class="hljs-number">14</span>,<span class="hljs-number">15</span>,<span class="hljs-number">16</span>,<span class="hljs-number">17</span>,<span class="hljs-number">18</span>,<span class="hljs-number">19</span>,<span class="hljs-number">20</span>,<span class="hljs-number">21</span>,<span class="hljs-number">22</span>,<span class="hljs-number">23</span>,<span class="hljs-number">24</span>,<span class="hljs-number">25</span>,<span class="hljs-number">26</span>,<span class="hljs-number">27</span>,<span class="hljs-number">28</span>,<span class="hljs-number">29</span>,<span class="hljs-number">30</span>,<span class="hljs-number">31</span>,<span class="hljs-number">32</span>,<span class="hljs-number">33</span>,<span class="hljs-number">34</span>,<span class="hljs-number">35</span>,<span class="hljs-number">36</span>,<span class="hljs-number">37</span>,<span class="hljs-number">38</span>,<span class="hljs-number">39</span>,<span class="hljs-number">40</span>,<span class="hljs-number">41</span>,<span class="hljs-number">42</span>,<span class="hljs-number">43</span>,<span class="hljs-number">44</span>,<span class="hljs-number">45</span>,<span class="hljs-number">46</span>,<span class="hljs-number">47</span>,<span class="hljs-number">48</span>,<span class="hljs-number">49</span>,<span class="hljs-number">50</span>,<span class="hljs-number">51</span>,<span class="hljs-number">52</span>,<span class="hljs-number">53</span>,<span class="hljs-number">54</span>,<span class="hljs-number">55</span>,<span class="hljs-number">56</span>,<span class="hljs-number">57</span>,<span class="hljs-number">58</span>,<span class="hljs-number">59</span>,<span class="hljs-number">60</span>,<span class="hljs-number">61</span>,<span class="hljs-number">62</span>,<span class="hljs-number">63</span>,<span class="hljs-number">64</span>,<span class="hljs-number">65</span>,<span class="hljs-number">66</span>,<span class="hljs-number">67</span>,<span class="hljs-number">68</span>,<span class="hljs-number">69</span>,<span class="hljs-number">70</span>,<span class="hljs-number">71</span>,<span class="hljs-number">72</span>,<span class="hljs-number">73</span>,<span class="hljs-number">74</span>,<span class="hljs-number">75</span>,<span class="hljs-number">76</span>,<span class="hljs-number">77</span>,<span class="hljs-number">78</span>,<span class="hljs-number">79</span>,<span class="hljs-number">80</span>,<span class="hljs-number">81</span>,<span class="hljs-number">82</span>,<span class="hljs-number">83</span>,<span class="hljs-number">84</span>,<span class="hljs-number">85</span>,<span class="hljs-number">86</span>,<span class="hljs-number">87</span>,<span class="hljs-number">88</span>,<span class="hljs-number">89</span>,<span class="hljs-number">90</span>,<span class="hljs-number">91</span>,<span class="hljs-number">92</span>,<span class="hljs-number">93</span>,<span class="hljs-number">94</span>,<span class="hljs-number">95</span>,<span class="hljs-number">96</span>,<span class="hljs-number">97</span>,<span class="hljs-number">98</span>,<span class="hljs-number">99</span>],
  <span class="hljs-string">&quot;insert_cnt&quot;</span>:<span class="hljs-number">100</span>,
  <span class="hljs-string">&quot;timestamp&quot;</span>:<span class="hljs-number">434262073374408706</span>
}
<button class="copy-code-btn"></button></code></pre>
</div>
<table class="language-python">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">data</code></td>
        <td>Data to insert into Milvus.</td>
    </tr>
    <tr>
        <td><code translate="no">partition_name</code> (optional)</td>
        <td>Name of the partition to insert data into.</td>
    </tr>
    </tbody>
</table>
<table class="language-javascript">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">collection_name</code></td>
        <td>Name of the collection to insert data into.</td>
    </tr>
  <tr>
        <td><code translate="no">partition_name</code> (optional)</td>
        <td>Name of the partition to insert data into.</td>
    </tr>
  <tr>
        <td><code translate="no">fields_data</code></td>
        <td>Data to insert into Milvus.</td>
    </tr>
    </tbody>
</table>
<table class="language-go">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">ctx</code></td>
        <td>Context to control API invocation process.</td>
    </tr>
    <tr>
        <td><code translate="no">CollectionName</code></td>
        <td>Name of the collection to insert data into.</td>
    </tr>
    <tr>
        <td><code translate="no">partitionName</code></td>
        <td>Name of the partition to insert data into. Data will be inserted in the default partition if left blank.</td>
    </tr>
    <tr>
        <td><code translate="no">columnarData</code></td>
        <td>Data to insert into each field.</td>
    </tr>
  </tbody>
</table>
<table class="language-java">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">fieldName</code></td>
        <td>Name of the field to insert data into.</td>
    </tr>
    <tr>
        <td><code translate="no">DataType</code></td>
        <td>Data type of the field to insert data into.</td>
    </tr>
    <tr>
        <td><code translate="no">data</code></td>
        <td>Data to insert into each field.</td>
    </tr>
        <tr>
        <td><code translate="no">CollectionName</code></td>
        <td>Name of the collection to insert data into.</td>
    </tr>
    <tr>
        <td><code translate="no">PartitionName</code> (optional)</td>
        <td>Name of the partition to insert data into.</td>
    </tr>
    </tbody>
</table>
<table class="language-shell">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>Name of the collection to insert data into.</td>
        </tr>
        <tr>
            <td>-p (Optional)</td>
            <td>Name of the partition to insert data into.</td>
        </tr>
    </tbody>
</table>
<table class="language-curl">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">collection_name</code></td>
            <td>Name of the collection to insert data into.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">fields_data</code></td>
            <td>Data to insert into Milvus.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">field_name</code></td>
            <td>Name of the field to insert data into.</td>
            <td>N/A</td>
        </tr>       
        <tr>
            <td><code translate="no">type</code></td>
            <td>Data type of the field to insert data into.</td>
            <td>
                Enums:
                <br>1: "Bool",
                <br>2: "Int8",
                <br>3: "Int16",
                <br>4: "Int32",
                <br>5: "Int64",
                <br>10: "Float",
                <br>11: "Double",
                <br>20: "String",
                <br>21: "VarChar",
                <br>100: "BinaryVector",
                <br>101: "FloatVector",
            </td>
        </tr>
        <tr>
            <td><code translate="no">field</code></td>
            <td>The data of one column to be inserted.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">num_rows</code></td>
            <td>Number of rows to be inserted. The number should be the same as the length of each <code translate="no">field</code> array.</td>
            <td>N/A</td>
        </tr>
    </tbody>
</table>
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
    </button></h2><table>
<thead>
<tr><th>Feature</th><th>Maximum limit</th></tr>
</thead>
<tbody>
<tr><td>Dimensions of a vector</td><td>32,768</td></tr>
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
    </button></h2><ul>
<li>Learn more basic operations of Milvus:
<ul>
<li><a href="/docs/v2.1.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.1.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.1.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
</ul>
