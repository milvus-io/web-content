---
id: use-json-fields.md
title: Use JSON Fields
---
<h1 id="Use-JSON-Fields" class="common-anchor-header">Use JSON Fields<button data-href="#Use-JSON-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide explains how to use the JSON fields, such as inserting JSON values as well as searching and querying in JSON fields with basic and advanced operators.</p>
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
    </button></h2><p>JSON stands for Javascript Object Notation, which is a lightweight and simple text-based data format. Data in JSON is structured in key-value pairs, where every key is a string that maps to a value of a number, string, boolean, list, or array. With Milvus clusters, it’s possible to store dictionaries as a field value in collections.</p>
<p>For example, the following code randomly generates key-value pairs, each containing a JSON field with the key <strong>color</strong>.</p>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Insert randomly generated vectors </span>
colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    current_color = random.choice(colors)
    current_tag = random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>)
    current_coord = [ random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3</span>) ]
    current_ref = [ [ random.choice(colors) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3</span>) ] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3</span>) ]
    data.append({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ],
        <span class="hljs-string">&quot;color&quot;</span>: {
            <span class="hljs-string">&quot;label&quot;</span>: current_color,
            <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
            <span class="hljs-string">&quot;coord&quot;</span>: current_coord,
            <span class="hljs-string">&quot;ref&quot;</span>: current_ref
        }
    })

<span class="hljs-built_in">print</span>(data[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">import java.util.*;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

<span class="hljs-comment">// 3. Insert randomly generated vectors and JSON data into the collection</span>
List&lt;String&gt; colors = Arrays.asList(<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>);
List&lt;JsonObject&gt; data = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();

Gson gson = <span class="hljs-keyword">new</span> Gson();
Random rand = <span class="hljs-keyword">new</span> Random();
<span class="hljs-keyword">for</span> (<span class="hljs-built_in">int</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">1000</span>; i++) {
    String current_color = colors.<span class="hljs-keyword">get</span>(rand.nextInt(colors.size()<span class="hljs-number">-1</span>));
    Integer current_tag = rand.nextInt(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>;
    List&lt;Integer&gt; current_coord = Arrays.asList(rand.nextInt(<span class="hljs-number">40</span>), rand.nextInt(<span class="hljs-number">40</span>), rand.nextInt(<span class="hljs-number">40</span>));
    List&lt;List&lt;String&gt;&gt; current_ref = Arrays.asList(
            Arrays.asList(colors.<span class="hljs-keyword">get</span>(rand.nextInt(colors.size()<span class="hljs-number">-1</span>)), colors.<span class="hljs-keyword">get</span>(rand.nextInt(colors.size()<span class="hljs-number">-1</span>)), colors.<span class="hljs-keyword">get</span>(rand.nextInt(colors.size()<span class="hljs-number">-1</span>))),
            Arrays.asList(colors.<span class="hljs-keyword">get</span>(rand.nextInt(colors.size()<span class="hljs-number">-1</span>)), colors.<span class="hljs-keyword">get</span>(rand.nextInt(colors.size()<span class="hljs-number">-1</span>)), colors.<span class="hljs-keyword">get</span>(rand.nextInt(colors.size()<span class="hljs-number">-1</span>))),
            Arrays.asList(colors.<span class="hljs-keyword">get</span>(rand.nextInt(colors.size()<span class="hljs-number">-1</span>)), colors.<span class="hljs-keyword">get</span>(rand.nextInt(colors.size()<span class="hljs-number">-1</span>)), colors.<span class="hljs-keyword">get</span>(rand.nextInt(colors.size()<span class="hljs-number">-1</span>)))
    );
    JsonObject row = <span class="hljs-keyword">new</span> JsonObject();
    row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, (<span class="hljs-built_in">long</span>) i);
    row.<span class="hljs-keyword">add</span>(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat())));
    JsonObject color = <span class="hljs-keyword">new</span> JsonObject();
    color.addProperty(<span class="hljs-string">&quot;label&quot;</span>, current_color);
    color.addProperty(<span class="hljs-string">&quot;tag&quot;</span>, current_tag);
    color.<span class="hljs-keyword">add</span>(<span class="hljs-string">&quot;coord&quot;</span>, gson.toJsonTree(current_coord));
    color.<span class="hljs-keyword">add</span>(<span class="hljs-string">&quot;ref&quot;</span>, gson.toJsonTree(current_ref));
    row.<span class="hljs-keyword">add</span>(<span class="hljs-string">&quot;color&quot;</span>, color);
    data.<span class="hljs-keyword">add</span>(row);
}

System.<span class="hljs-keyword">out</span>.println(data.<span class="hljs-keyword">get</span>(<span class="hljs-number">0</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. Insert randomly generated vectors </span>
<span class="hljs-keyword">const</span> colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
<span class="hljs-keyword">var</span> data = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
    <span class="hljs-keyword">const</span> current_color = colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)]
    <span class="hljs-keyword">const</span> current_tag = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">8999</span> + <span class="hljs-number">1000</span>)
    <span class="hljs-keyword">const</span> current_coord = <span class="hljs-title class_">Array</span>(<span class="hljs-number">3</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">40</span>))
    <span class="hljs-keyword">const</span> current_ref = [ <span class="hljs-title class_">Array</span>(<span class="hljs-number">3</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">() =&gt;</span> colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)]) ]

    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">id</span>: i,
        <span class="hljs-attr">vector</span>: [<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()],
        <span class="hljs-attr">color</span>: {
            <span class="hljs-attr">label</span>: current_color,
            <span class="hljs-attr">tag</span>: current_tag,
            <span class="hljs-attr">coord</span>: current_coord,
            <span class="hljs-attr">ref</span>: current_ref
        }
    })
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<p>You can view the structure of the generated data by checking its first entry.</p>
<pre><code translate="no">{
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>,
    <span class="hljs-string">&quot;vector&quot;</span>: [
        -<span class="hljs-number">0.8017921296923975</span>,
        <span class="hljs-number">0.550046715206634</span>,
        <span class="hljs-number">0.764922589768134</span>,
        <span class="hljs-number">0.6371433836123146</span>,
        <span class="hljs-number">0.2705233937454232</span>
    ],
    <span class="hljs-string">&quot;color&quot;</span>: {
        <span class="hljs-string">&quot;label&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
        <span class="hljs-string">&quot;tag&quot;</span>: <span class="hljs-number">9927</span>,
        <span class="hljs-string">&quot;coord&quot;</span>: [
            <span class="hljs-number">22</span>,
            <span class="hljs-number">36</span>,
            <span class="hljs-number">6</span>
        ],
        <span class="hljs-string">&quot;ref&quot;</span>: [
            [
                <span class="hljs-string">&quot;blue&quot;</span>,
                <span class="hljs-string">&quot;green&quot;</span>,
                <span class="hljs-string">&quot;white&quot;</span>
            ],
            [
                <span class="hljs-string">&quot;black&quot;</span>,
                <span class="hljs-string">&quot;green&quot;</span>,
                <span class="hljs-string">&quot;pink&quot;</span>
            ],
            [
                <span class="hljs-string">&quot;grey&quot;</span>,
                <span class="hljs-string">&quot;black&quot;</span>,
                <span class="hljs-string">&quot;brown&quot;</span>
            ]
        ]
    }
}
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>notes</b></p>
<ul>
<li><p>Ensure that all values in a list or array are of the same data type.</p></li>
<li><p>Any nested dictionaries in a JSON field value will be considered strings.</p></li>
<li><p>Use only alphanumeric characters and underscores to name JSON keys, as other characters may cause problems with filtering or searching.</p></li>
<li>Currently, indexing JSON fields is not available, which can make filtering time-consuming. However, this limitation will be addressed in upcoming releases.</li>
</ul>
</div>
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
<div class="language-python">
<p>For more information on parameters, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a>, and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md"><code translate="no">get_load_state()</code></a> in the SDK reference.</p>
</div>
<div class="language-java">
<p>For more information on parameters, refer to <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a>, <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md"><code translate="no">createSchema()</code></a>, <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md"><code translate="no">addField()</code></a>, <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>, <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a>, and <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md"><code translate="no">getLoadState()</code></a> in the SDK reference.</p>
</div>
<div class="language-javascript">
<p>For more information on parameters, refer to <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> and <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a> and <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a> in the SDK reference.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random, time
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, MilvusClient, DataType

CLUSTER_ENDPOINT = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=CLUSTER_ENDPOINT
)

<span class="hljs-comment"># 2. Create a collection</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;color&quot;</span>, datatype=DataType.JSON)

index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>}
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.*;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection in customized setup mode</span>

<span class="hljs-comment">// 2.1 Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// 2.2 Add fields to schema</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;color&quot;</span>)
        .dataType(DataType.JSON)
        .build());

<span class="hljs-comment">// 2.3 Prepare index parameters</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForIdField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .indexType(IndexParam.IndexType.STL_SORT)
        .build();

Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">1024</span>);
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.IVF_FLAT)
        .metricType(IndexParam.MetricType.IP)
        .extraParams(params)
        .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);

<span class="hljs-comment">// 2.4 Create a collection with schema and index parameters</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();

client.createCollection(customizedSetupReq);

<span class="hljs-comment">// 2.5 Check if the collection is loaded</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">getLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .build();

<span class="hljs-type">Boolean</span> <span class="hljs-variable">isLoaded</span> <span class="hljs-operator">=</span> client.getLoadState(getLoadStateReq);

System.out.println(isLoaded);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, sleep } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">main</span>(<span class="hljs-params"></span>) {
<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address}); 

<span class="hljs-comment">// 2. Create a collection</span>
<span class="hljs-comment">// 2.1 Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
    }
]

<span class="hljs-comment">// 2.2 Prepare index parameters</span>
<span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nlist</span>: <span class="hljs-number">1024</span>}
}]

<span class="hljs-comment">// 2.3 Create a collection with fields and index parameters</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">fields</span>: fields, 
    <span class="hljs-attr">index_params</span>: index_params
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
})  

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>For more information on parameters, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a>, and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md"><code translate="no">get_load_state()</code></a> in the SDK reference.</p>
</div>
<div class="language-java">
<p>For more information on parameters, refer to <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a>, <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md"><code translate="no">createSchema()</code></a>, <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md"><code translate="no">addField()</code></a>, <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>, <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a>, and <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md"><code translate="no">getLoadState()</code></a> in the SDK reference.</p>
</div>
<div class="language-javascript">
<p>For more information on parameters, refer to <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a>, <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>, and <a href="https://milvus.io/api-reference/node/v2.4.x/Management/getLoadState.md"><code translate="no">getLoadState()</code></a> in the SDK reference.</p>
</div>
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
    </button></h2><p>After creating a collection from the <code translate="no">CollectionSchema</code> object, dictionaries such as the one above can be inserted into it.</p>
<div class="language-python">
<p>Use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a> method to insert the data into the collection.</p>
</div>
<div class="language-java">
<p>Use the <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md"><code translate="no">insert()</code></a> method to insert the data into the collection.</p>
</div>
<div class="language-javascript">
<p>Use the <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/insert.md"><code translate="no">insert()</code></a> method to insert the data into the collection.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python">res = client.insert(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    data=data
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 1000,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         0,</span>
<span class="hljs-comment">#         1,</span>
<span class="hljs-comment">#         2,</span>
<span class="hljs-comment">#         3,</span>
<span class="hljs-comment">#         4,</span>
<span class="hljs-comment">#         5,</span>
<span class="hljs-comment">#         6,</span>
<span class="hljs-comment">#         7,</span>
<span class="hljs-comment">#         8,</span>
<span class="hljs-comment">#         9,</span>
<span class="hljs-comment">#         &quot;(990 more items hidden)&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 3.1 Insert data into the collection</span>
<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);

System.out.println(insertResp.getInsertCnt());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 1000</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. Insert randomly generated vectors </span>
<span class="hljs-keyword">const</span> colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
<span class="hljs-keyword">var</span> data = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
    <span class="hljs-keyword">const</span> current_color = colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)]
    <span class="hljs-keyword">const</span> current_tag = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">8999</span> + <span class="hljs-number">1000</span>)
    <span class="hljs-keyword">const</span> current_coord = <span class="hljs-title class_">Array</span>(<span class="hljs-number">3</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">40</span>))
    <span class="hljs-keyword">const</span> current_ref = [ <span class="hljs-title class_">Array</span>(<span class="hljs-number">3</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">() =&gt;</span> colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)]) ]

    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">id</span>: i,
        <span class="hljs-attr">vector</span>: [<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()],
        <span class="hljs-attr">color</span>: {
            <span class="hljs-attr">label</span>: current_color,
            <span class="hljs-attr">tag</span>: current_tag,
            <span class="hljs-attr">coord</span>: current_coord,
            <span class="hljs-attr">ref</span>: current_ref
        }
    })
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data[<span class="hljs-number">0</span>])

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   id: 0,</span>
<span class="hljs-comment">//   vector: [</span>
<span class="hljs-comment">//     0.11455530974226114,</span>
<span class="hljs-comment">//     0.21704086958595314,</span>
<span class="hljs-comment">//     0.9430119822312437,</span>
<span class="hljs-comment">//     0.7802712923612023,</span>
<span class="hljs-comment">//     0.9106927960926137</span>
<span class="hljs-comment">//   ],</span>
<span class="hljs-comment">//   color: { label: &#x27;grey&#x27;, tag: 7393, coord: [ 22, 1, 22 ], ref: [ [Array] ] }</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 1000</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Basic-scalar-filtering" class="common-anchor-header">Basic scalar filtering<button data-href="#Basic-scalar-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>Once all of your data has been added, you can conduct searches and queries using the keys in the JSON field in the same manner as you would with a standard scalar field.</p>
<div class="language-python">
<p>For more information on parameters, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> in the SDK reference.</p>
</div>
<div class="language-java">
<p>For more information on parameters, refer to <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/search.md"><code translate="no">search()</code></a> in the SDK reference.</p>
</div>
<div class="language-javascript">
<p>For more information on parameters, refer to <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/search.md"><code translate="no">search()</code></a> in the SDK reference.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Basic search with a JSON field</span>
query_vectors = [ [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]]

res = client.search(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    data=query_vectors,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color[&quot;label&quot;] in [&quot;red&quot;]&#x27;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">16</span>}
    },
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 460,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.4016231596469879,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;id&quot;: 460,</span>
<span class="hljs-comment">#                 &quot;color&quot;: {</span>
<span class="hljs-comment">#                     &quot;label&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">#                     &quot;tag&quot;: 5030,</span>
<span class="hljs-comment">#                     &quot;coord&quot;: [14, 32, 40],</span>
<span class="hljs-comment">#                     &quot;ref&quot;: [</span>
<span class="hljs-comment">#                         [ &quot;pink&quot;, &quot;green&quot;, &quot;brown&quot; ],</span>
<span class="hljs-comment">#                         [ &quot;red&quot;, &quot;grey&quot;, &quot;black&quot;],</span>
<span class="hljs-comment">#                         [ &quot;red&quot;, &quot;yellow&quot;, &quot;orange&quot;]</span>
<span class="hljs-comment">#                     ]</span>
<span class="hljs-comment">#                 }</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 785,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.451080858707428,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;id&quot;: 785,</span>
<span class="hljs-comment">#                 &quot;color&quot;: {</span>
<span class="hljs-comment">#                     &quot;label&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">#                     &quot;tag&quot;: 5290,</span>
<span class="hljs-comment">#                     &quot;coord&quot;: [31, 13, 23],</span>
<span class="hljs-comment">#                     &quot;ref&quot;: [</span>
<span class="hljs-comment">#                         [&quot;yellow&quot;, &quot;pink&quot;, &quot;pink&quot;],</span>
<span class="hljs-comment">#                         [&quot;purple&quot;, &quot;grey&quot;, &quot;orange&quot;],</span>
<span class="hljs-comment">#                         [&quot;grey&quot;, &quot;purple&quot;, &quot;pink&quot;]</span>
<span class="hljs-comment">#                     ]</span>
<span class="hljs-comment">#                 }</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 355,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.5839247703552246,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;id&quot;: 355,</span>
<span class="hljs-comment">#                 &quot;color&quot;: {</span>
<span class="hljs-comment">#                     &quot;label&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">#                     &quot;tag&quot;: 8725,</span>
<span class="hljs-comment">#                     &quot;coord&quot;: [5, 10, 22],</span>
<span class="hljs-comment">#                     &quot;ref&quot;: [</span>
<span class="hljs-comment">#                         [&quot;white&quot;, &quot;purple&quot;, &quot;yellow&quot;],</span>
<span class="hljs-comment">#                         [&quot;white&quot;, &quot;purple&quot;, &quot;white&quot;],</span>
<span class="hljs-comment">#                         [&quot;orange&quot;, &quot;white&quot;, &quot;pink&quot;]</span>
<span class="hljs-comment">#                     ]</span>
<span class="hljs-comment">#                 }</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">// <span class="hljs-number">4.</span> Search <span class="hljs-keyword">with</span> partition key
<span class="hljs-type">List</span>&lt;BaseVector&gt; query_vectors = Collections.singletonList(new FloatVec(new <span class="hljs-built_in">float</span>[]{<span class="hljs-number">0.3580376395471989</span>f, -<span class="hljs-number">0.6023495712049978</span>f, <span class="hljs-number">0.18414012509913835</span>f, -<span class="hljs-number">0.26286205330961354</span>f, <span class="hljs-number">0.9029438446296592</span>f}));

SearchReq searchReq = SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .data(query_vectors)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-string">&quot;color[\&quot;label\&quot;] in [\&quot;red\&quot;]&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .topK(<span class="hljs-number">3</span>)
        .build();

SearchResp searchResp = client.search(searchReq);

<span class="hljs-type">List</span>&lt;<span class="hljs-type">List</span>&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (<span class="hljs-type">List</span>&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

// Output:
// SearchResp.SearchResult(entity=\{color=\{<span class="hljs-string">&quot;label&quot;</span>:<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;tag&quot;</span>:<span class="hljs-number">1018</span>,<span class="hljs-string">&quot;coord&quot;</span>:[<span class="hljs-number">3</span>,<span class="hljs-number">30</span>,<span class="hljs-number">1</span>],<span class="hljs-string">&quot;ref&quot;</span>:[[<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;brown&quot;</span>,<span class="hljs-string">&quot;orange&quot;</span>],[<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;purple&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>],[<span class="hljs-string">&quot;green&quot;</span>,<span class="hljs-string">&quot;purple&quot;</span>,<span class="hljs-string">&quot;purple&quot;</span>]]}, <span class="hljs-built_in">id</span>=<span class="hljs-number">295</span>}, score=<span class="hljs-number">1.1190735</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">295</span>)
// SearchResp.SearchResult(entity=\{color=\{<span class="hljs-string">&quot;label&quot;</span>:<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;tag&quot;</span>:<span class="hljs-number">8141</span>,<span class="hljs-string">&quot;coord&quot;</span>:[<span class="hljs-number">38</span>,<span class="hljs-number">31</span>,<span class="hljs-number">29</span>],<span class="hljs-string">&quot;ref&quot;</span>:[[<span class="hljs-string">&quot;blue&quot;</span>,<span class="hljs-string">&quot;white&quot;</span>,<span class="hljs-string">&quot;white&quot;</span>],[<span class="hljs-string">&quot;green&quot;</span>,<span class="hljs-string">&quot;orange&quot;</span>,<span class="hljs-string">&quot;green&quot;</span>],[<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;green&quot;</span>,<span class="hljs-string">&quot;black&quot;</span>]]}, <span class="hljs-built_in">id</span>=<span class="hljs-number">667</span>}, score=<span class="hljs-number">1.0679582</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">667</span>)
// SearchResp.SearchResult(entity=\{color=\{<span class="hljs-string">&quot;label&quot;</span>:<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;tag&quot;</span>:<span class="hljs-number">6837</span>,<span class="hljs-string">&quot;coord&quot;</span>:[<span class="hljs-number">29</span>,<span class="hljs-number">9</span>,<span class="hljs-number">8</span>],<span class="hljs-string">&quot;ref&quot;</span>:[[<span class="hljs-string">&quot;green&quot;</span>,<span class="hljs-string">&quot;black&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>],[<span class="hljs-string">&quot;purple&quot;</span>,<span class="hljs-string">&quot;white&quot;</span>,<span class="hljs-string">&quot;green&quot;</span>],[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>,<span class="hljs-string">&quot;black&quot;</span>]]}, <span class="hljs-built_in">id</span>=<span class="hljs-number">927</span>}, score=<span class="hljs-number">1.0029297</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">927</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Basic search with a JSON field</span>
query_vectors = [[<span class="hljs-number">0.6765405125697714</span>, <span class="hljs-number">0.759217474274025</span>, <span class="hljs-number">0.4122471841491111</span>, <span class="hljs-number">0.3346805565394215</span>, <span class="hljs-number">0.09679748345514638</span>]]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vectors,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color[&quot;label&quot;] in [&quot;red&quot;]&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;id&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.777988076210022,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;595&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: {</span>
<span class="hljs-comment">//             &quot;label&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">//             &quot;tag&quot;: 7393,</span>
<span class="hljs-comment">//             &quot;coord&quot;: [31,34,18],</span>
<span class="hljs-comment">//             &quot;ref&quot;: [</span>
<span class="hljs-comment">//                 [&quot;grey&quot;, &quot;white&quot;, &quot;orange&quot;]</span>
<span class="hljs-comment">//             ]</span>
<span class="hljs-comment">//         }</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.7542595863342285,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;82&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: {</span>
<span class="hljs-comment">//             &quot;label&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">//             &quot;tag&quot;: 8636,</span>
<span class="hljs-comment">//             &quot;coord&quot;: [4,37,29],</span>
<span class="hljs-comment">//             &quot;ref&quot;: [</span>
<span class="hljs-comment">//                 [&quot;brown&quot;, &quot;brown&quot;, &quot;pink&quot;]</span>
<span class="hljs-comment">//             ]</span>
<span class="hljs-comment">//         }</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.7537562847137451,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;748&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: {</span>
<span class="hljs-comment">//             &quot;label&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">//             &quot;tag&quot;: 1626,</span>
<span class="hljs-comment">//             &quot;coord&quot;: [31,4,25</span>
<span class="hljs-comment">//             ],</span>
<span class="hljs-comment">//             &quot;ref&quot;: [</span>
<span class="hljs-comment">//                 [&quot;grey&quot;, &quot;green&quot;, &quot;blue&quot;]</span>
<span class="hljs-comment">//             ]</span>
<span class="hljs-comment">//         }</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Advanced-scalar-filtering" class="common-anchor-header">Advanced scalar filtering<button data-href="#Advanced-scalar-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus provides a set of advanced filters for scalar filtering in JSON fields. These filters are <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_CONTAINS_ALL</code>, and <code translate="no">JSON_CONTAINS_ANY</code>.</p>
<ul>
<li><p>Filters all entities that have <code translate="no">[&quot;blue&quot;, &quot;brown&quot;, &quot;grey&quot;]</code> as the reference color set.</p>
<p><div class="multipleCode">
<a href="#python">Python </a>
<a href="#java">Java</a>
<a href="#javascript">Node.js</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Advanced search within a JSON field</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    data=query_vectors,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;JSON_CONTAINS(color[&quot;ref&quot;], [&quot;blue&quot;, &quot;brown&quot;, &quot;grey&quot;])&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 79,</span>
<span class="hljs-comment">#         &quot;color&quot;: {</span>
<span class="hljs-comment">#             &quot;label&quot;: &quot;orange&quot;,</span>
<span class="hljs-comment">#             &quot;tag&quot;: 8857,</span>
<span class="hljs-comment">#             &quot;coord&quot;: [</span>
<span class="hljs-comment">#                 10,</span>
<span class="hljs-comment">#                 14,</span>
<span class="hljs-comment">#                 5</span>
<span class="hljs-comment">#             ],</span>
<span class="hljs-comment">#             &quot;ref&quot;: [</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;yellow&quot;,</span>
<span class="hljs-comment">#                     &quot;white&quot;,</span>
<span class="hljs-comment">#                     &quot;green&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;blue&quot;,</span>
<span class="hljs-comment">#                     &quot;purple&quot;,</span>
<span class="hljs-comment">#                     &quot;purple&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;blue&quot;,</span>
<span class="hljs-comment">#                     &quot;brown&quot;,</span>
<span class="hljs-comment">#                     &quot;grey&quot;</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             ]</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 371,</span>
<span class="hljs-comment">#         &quot;color&quot;: {</span>
<span class="hljs-comment">#             &quot;label&quot;: &quot;black&quot;,</span>
<span class="hljs-comment">#             &quot;tag&quot;: 1324,</span>
<span class="hljs-comment">#             &quot;coord&quot;: [</span>
<span class="hljs-comment">#                 2,</span>
<span class="hljs-comment">#                 18,</span>
<span class="hljs-comment">#                 32</span>
<span class="hljs-comment">#             ],</span>
<span class="hljs-comment">#             &quot;ref&quot;: [</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;purple&quot;,</span>
<span class="hljs-comment">#                     &quot;orange&quot;,</span>
<span class="hljs-comment">#                     &quot;brown&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;blue&quot;,</span>
<span class="hljs-comment">#                     &quot;brown&quot;,</span>
<span class="hljs-comment">#                     &quot;grey&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;purple&quot;,</span>
<span class="hljs-comment">#                     &quot;blue&quot;,</span>
<span class="hljs-comment">#                     &quot;blue&quot;</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             ]</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 590,</span>
<span class="hljs-comment">#         &quot;color&quot;: {</span>
<span class="hljs-comment">#             &quot;label&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">#             &quot;tag&quot;: 3340,</span>
<span class="hljs-comment">#             &quot;coord&quot;: [</span>
<span class="hljs-comment">#                 13,</span>
<span class="hljs-comment">#                 21,</span>
<span class="hljs-comment">#                 13</span>
<span class="hljs-comment">#             ],</span>
<span class="hljs-comment">#             &quot;ref&quot;: [</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;yellow&quot;,</span>
<span class="hljs-comment">#                     &quot;yellow&quot;,</span>
<span class="hljs-comment">#                     &quot;red&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;blue&quot;,</span>
<span class="hljs-comment">#                     &quot;brown&quot;,</span>
<span class="hljs-comment">#                     &quot;grey&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;pink&quot;,</span>
<span class="hljs-comment">#                     &quot;yellow&quot;,</span>
<span class="hljs-comment">#                     &quot;purple&quot;</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             ]</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">// <span class="hljs-number">5.</span> Advanced search within a JSON field
searchReq = SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .data(query_vectors)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-string">&quot;JSON_CONTAINS(color[\&quot;ref\&quot;], [\&quot;purple\&quot;, \&quot;pink\&quot;, \&quot;orange\&quot;])&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .topK(<span class="hljs-number">3</span>)
        .build();

searchResp = client.search(searchReq);

searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (<span class="hljs-type">List</span>&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

// Output:
// SearchResp.SearchResult(entity={color={<span class="hljs-string">&quot;label&quot;</span>:<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-string">&quot;tag&quot;</span>:<span class="hljs-number">2963</span>,<span class="hljs-string">&quot;coord&quot;</span>:[<span class="hljs-number">15</span>,<span class="hljs-number">33</span>,<span class="hljs-number">30</span>],<span class="hljs-string">&quot;ref&quot;</span>:[[<span class="hljs-string">&quot;green&quot;</span>,<span class="hljs-string">&quot;white&quot;</span>,<span class="hljs-string">&quot;white&quot;</span>],[<span class="hljs-string">&quot;purple&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-string">&quot;orange&quot;</span>],[<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;black&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>]]}, <span class="hljs-built_in">id</span>=<span class="hljs-number">273</span>}, score=<span class="hljs-number">0.46558747</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">273</span>)
// SearchResp.SearchResult(entity={color={<span class="hljs-string">&quot;label&quot;</span>:<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-string">&quot;tag&quot;</span>:<span class="hljs-number">4027</span>,<span class="hljs-string">&quot;coord&quot;</span>:[<span class="hljs-number">32</span>,<span class="hljs-number">34</span>,<span class="hljs-number">19</span>],<span class="hljs-string">&quot;ref&quot;</span>:[[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;white&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>],[<span class="hljs-string">&quot;white&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-string">&quot;yellow&quot;</span>],[<span class="hljs-string">&quot;purple&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-string">&quot;orange&quot;</span>]]}, <span class="hljs-built_in">id</span>=<span class="hljs-number">344</span>}, score=<span class="hljs-number">0.2637315</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">344</span>)
// SearchResp.SearchResult(entity={color={<span class="hljs-string">&quot;label&quot;</span>:<span class="hljs-string">&quot;black&quot;</span>,<span class="hljs-string">&quot;tag&quot;</span>:<span class="hljs-number">1603</span>,<span class="hljs-string">&quot;coord&quot;</span>:[<span class="hljs-number">33</span>,<span class="hljs-number">12</span>,<span class="hljs-number">23</span>],<span class="hljs-string">&quot;ref&quot;</span>:[[<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-string">&quot;brown&quot;</span>,<span class="hljs-string">&quot;black&quot;</span>],[<span class="hljs-string">&quot;black&quot;</span>,<span class="hljs-string">&quot;purple&quot;</span>,<span class="hljs-string">&quot;black&quot;</span>],[<span class="hljs-string">&quot;purple&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-string">&quot;orange&quot;</span>]]}, <span class="hljs-built_in">id</span>=<span class="hljs-number">205</span>}, score=<span class="hljs-number">0.26133868</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">205</span>)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Advanced search within a JSON field</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vectors,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;JSON_CONTAINS(color[&quot;ref&quot;], [&quot;blue&quot;, &quot;brown&quot;, &quot;grey&quot;])&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;id&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;id&quot;: 79,</span>
<span class="hljs-comment">//         &quot;color&quot;: {</span>
<span class="hljs-comment">//             &quot;label&quot;: &quot;orange&quot;,</span>
<span class="hljs-comment">//             &quot;tag&quot;: 8857,</span>
<span class="hljs-comment">//             &quot;coord&quot;: [</span>
<span class="hljs-comment">//                 10,</span>
<span class="hljs-comment">//                 14,</span>
<span class="hljs-comment">//                 5</span>
<span class="hljs-comment">//             ],</span>
<span class="hljs-comment">//             &quot;ref&quot;: [</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;yellow&quot;,</span>
<span class="hljs-comment">//                     &quot;white&quot;,</span>
<span class="hljs-comment">//                     &quot;green&quot;</span>
<span class="hljs-comment">//                 ],</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;blue&quot;,</span>
<span class="hljs-comment">//                     &quot;purple&quot;,</span>
<span class="hljs-comment">//                     &quot;purple&quot;</span>
<span class="hljs-comment">//                 ],</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;blue&quot;,</span>
<span class="hljs-comment">//                     &quot;brown&quot;,</span>
<span class="hljs-comment">//                     &quot;grey&quot;</span>
<span class="hljs-comment">//                 ]</span>
<span class="hljs-comment">//             ]</span>
<span class="hljs-comment">//         }</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;id&quot;: 371,</span>
<span class="hljs-comment">//         &quot;color&quot;: {</span>
<span class="hljs-comment">//             &quot;label&quot;: &quot;black&quot;,</span>
<span class="hljs-comment">//             &quot;tag&quot;: 1324,</span>
<span class="hljs-comment">//             &quot;coord&quot;: [</span>
<span class="hljs-comment">//                 2,</span>
<span class="hljs-comment">//                 18,</span>
<span class="hljs-comment">//                 32</span>
<span class="hljs-comment">//             ],</span>
<span class="hljs-comment">//             &quot;ref&quot;: [</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;purple&quot;,</span>
<span class="hljs-comment">//                     &quot;orange&quot;,</span>
<span class="hljs-comment">//                     &quot;brown&quot;</span>
<span class="hljs-comment">//                 ],</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;blue&quot;,</span>
<span class="hljs-comment">//                     &quot;brown&quot;,</span>
<span class="hljs-comment">//                     &quot;grey&quot;</span>
<span class="hljs-comment">//                 ],</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;purple&quot;,</span>
<span class="hljs-comment">//                     &quot;blue&quot;,</span>
<span class="hljs-comment">//                     &quot;blue&quot;</span>
<span class="hljs-comment">//                 ]</span>
<span class="hljs-comment">//             ]</span>
<span class="hljs-comment">//         }</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;id&quot;: 590,</span>
<span class="hljs-comment">//         &quot;color&quot;: {</span>
<span class="hljs-comment">//             &quot;label&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">//             &quot;tag&quot;: 3340,</span>
<span class="hljs-comment">//             &quot;coord&quot;: [</span>
<span class="hljs-comment">//                 13,</span>
<span class="hljs-comment">//                 21,</span>
<span class="hljs-comment">//                 13</span>
<span class="hljs-comment">//             ],</span>
<span class="hljs-comment">//             &quot;ref&quot;: [</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;yellow&quot;,</span>
<span class="hljs-comment">//                     &quot;yellow&quot;,</span>
<span class="hljs-comment">//                     &quot;red&quot;</span>
<span class="hljs-comment">//                 ],</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;blue&quot;,</span>
<span class="hljs-comment">//                     &quot;brown&quot;,</span>
<span class="hljs-comment">//                     &quot;grey&quot;</span>
<span class="hljs-comment">//                 ],</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;pink&quot;,</span>
<span class="hljs-comment">//                     &quot;yellow&quot;,</span>
<span class="hljs-comment">//                     &quot;purple&quot;</span>
<span class="hljs-comment">//                 ]</span>
<span class="hljs-comment">//             ]</span>
<span class="hljs-comment">//         }</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Filters entities that have the coordinator of <code translate="no">[4, 5]</code>.</p>
<p><div class="multipleCode">
<a href="#python">Python </a>
<a href="#java">Java</a>
<a href="#javascript">Node.js</a>
</div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    data=query_vectors,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;JSON_CONTAINS_ALL(color[&quot;coord&quot;], [4, 5])&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 281,</span>
<span class="hljs-comment">#         &quot;color&quot;: {</span>
<span class="hljs-comment">#             &quot;label&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">#             &quot;tag&quot;: 3645,</span>
<span class="hljs-comment">#             &quot;coord&quot;: [</span>
<span class="hljs-comment">#                 5,</span>
<span class="hljs-comment">#                 33,</span>
<span class="hljs-comment">#                 4</span>
<span class="hljs-comment">#             ],</span>
<span class="hljs-comment">#             &quot;ref&quot;: [</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;orange&quot;,</span>
<span class="hljs-comment">#                     &quot;blue&quot;,</span>
<span class="hljs-comment">#                     &quot;pink&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;purple&quot;,</span>
<span class="hljs-comment">#                     &quot;blue&quot;,</span>
<span class="hljs-comment">#                     &quot;purple&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;black&quot;,</span>
<span class="hljs-comment">#                     &quot;brown&quot;,</span>
<span class="hljs-comment">#                     &quot;yellow&quot;</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             ]</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 464,</span>
<span class="hljs-comment">#         &quot;color&quot;: {</span>
<span class="hljs-comment">#             &quot;label&quot;: &quot;brown&quot;,</span>
<span class="hljs-comment">#             &quot;tag&quot;: 6261,</span>
<span class="hljs-comment">#             &quot;coord&quot;: [</span>
<span class="hljs-comment">#                 5,</span>
<span class="hljs-comment">#                 9,</span>
<span class="hljs-comment">#                 4</span>
<span class="hljs-comment">#             ],</span>
<span class="hljs-comment">#             &quot;ref&quot;: [</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;purple&quot;,</span>
<span class="hljs-comment">#                     &quot;purple&quot;,</span>
<span class="hljs-comment">#                     &quot;brown&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;black&quot;,</span>
<span class="hljs-comment">#                     &quot;pink&quot;,</span>
<span class="hljs-comment">#                     &quot;white&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;brown&quot;,</span>
<span class="hljs-comment">#                     &quot;grey&quot;,</span>
<span class="hljs-comment">#                     &quot;brown&quot;</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             ]</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 567,</span>
<span class="hljs-comment">#         &quot;color&quot;: {</span>
<span class="hljs-comment">#             &quot;label&quot;: &quot;green&quot;,</span>
<span class="hljs-comment">#             &quot;tag&quot;: 4589,</span>
<span class="hljs-comment">#             &quot;coord&quot;: [</span>
<span class="hljs-comment">#                 5,</span>
<span class="hljs-comment">#                 39,</span>
<span class="hljs-comment">#                 4</span>
<span class="hljs-comment">#             ],</span>
<span class="hljs-comment">#             &quot;ref&quot;: [</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;purple&quot;,</span>
<span class="hljs-comment">#                     &quot;yellow&quot;,</span>
<span class="hljs-comment">#                     &quot;white&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;yellow&quot;,</span>
<span class="hljs-comment">#                     &quot;yellow&quot;,</span>
<span class="hljs-comment">#                     &quot;brown&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;blue&quot;,</span>
<span class="hljs-comment">#                     &quot;red&quot;,</span>
<span class="hljs-comment">#                     &quot;yellow&quot;</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             ]</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">searchReq = SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .data(query_vectors)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-string">&quot;JSON_CONTAINS_ALL(color[\&quot;coord\&quot;], [4, 5])&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .topK(<span class="hljs-number">3</span>)
        .build();

searchResp = client.search(searchReq);

searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (<span class="hljs-type">List</span>&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
} 

// Output:
// SearchResp.SearchResult(entity={color={<span class="hljs-string">&quot;label&quot;</span>:<span class="hljs-string">&quot;green&quot;</span>,<span class="hljs-string">&quot;tag&quot;</span>:<span class="hljs-number">9899</span>,<span class="hljs-string">&quot;coord&quot;</span>:[<span class="hljs-number">5</span>,<span class="hljs-number">4</span>,<span class="hljs-number">25</span>],<span class="hljs-string">&quot;ref&quot;</span>:[[<span class="hljs-string">&quot;purple&quot;</span>,<span class="hljs-string">&quot;black&quot;</span>,<span class="hljs-string">&quot;yellow&quot;</span>],[<span class="hljs-string">&quot;orange&quot;</span>,<span class="hljs-string">&quot;green&quot;</span>,<span class="hljs-string">&quot;purple&quot;</span>],[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;purple&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>]]}, <span class="hljs-built_in">id</span>=<span class="hljs-number">708</span>}, score=<span class="hljs-number">0.56576324</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">708</span>)
// SearchResp.SearchResult(entity={color={<span class="hljs-string">&quot;label&quot;</span>:<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;tag&quot;</span>:<span class="hljs-number">2176</span>,<span class="hljs-string">&quot;coord&quot;</span>:[<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">23</span>],<span class="hljs-string">&quot;ref&quot;</span>:[[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;black&quot;</span>,<span class="hljs-string">&quot;green&quot;</span>],[<span class="hljs-string">&quot;brown&quot;</span>,<span class="hljs-string">&quot;orange&quot;</span>,<span class="hljs-string">&quot;brown&quot;</span>],[<span class="hljs-string">&quot;brown&quot;</span>,<span class="hljs-string">&quot;orange&quot;</span>,<span class="hljs-string">&quot;yellow&quot;</span>]]}, <span class="hljs-built_in">id</span>=<span class="hljs-number">981</span>}, score=<span class="hljs-number">0.5656834</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">981</span>)
// SearchResp.SearchResult(entity={color={<span class="hljs-string">&quot;label&quot;</span>:<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-string">&quot;tag&quot;</span>:<span class="hljs-number">3085</span>,<span class="hljs-string">&quot;coord&quot;</span>:[<span class="hljs-number">5</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>],<span class="hljs-string">&quot;ref&quot;</span>:[[<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;orange&quot;</span>,<span class="hljs-string">&quot;green&quot;</span>],[<span class="hljs-string">&quot;black&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-string">&quot;red&quot;</span>],[<span class="hljs-string">&quot;orange&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>,<span class="hljs-string">&quot;blue&quot;</span>]]}, <span class="hljs-built_in">id</span>=<span class="hljs-number">221</span>}, score=<span class="hljs-number">0.3708634</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">221</span>)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vectors,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;JSON_CONTAINS_ALL(color[&quot;coord&quot;], [4, 5])&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;id&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.8944344520568848,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;792&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: {</span>
<span class="hljs-comment">//             &quot;label&quot;: &quot;purple&quot;,</span>
<span class="hljs-comment">//             &quot;tag&quot;: 8161,</span>
<span class="hljs-comment">//             &quot;coord&quot;: [</span>
<span class="hljs-comment">//                 4,</span>
<span class="hljs-comment">//                 38,</span>
<span class="hljs-comment">//                 5</span>
<span class="hljs-comment">//             ],</span>
<span class="hljs-comment">//             &quot;ref&quot;: [</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;red&quot;,</span>
<span class="hljs-comment">//                     &quot;white&quot;,</span>
<span class="hljs-comment">//                     &quot;grey&quot;</span>
<span class="hljs-comment">//                 ]</span>
<span class="hljs-comment">//             ]</span>
<span class="hljs-comment">//         }</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.2801706790924072,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;489&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: {</span>
<span class="hljs-comment">//             &quot;label&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">//             &quot;tag&quot;: 4358,</span>
<span class="hljs-comment">//             &quot;coord&quot;: [</span>
<span class="hljs-comment">//                 5,</span>
<span class="hljs-comment">//                 4,</span>
<span class="hljs-comment">//                 1</span>
<span class="hljs-comment">//             ],</span>
<span class="hljs-comment">//             &quot;ref&quot;: [</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;blue&quot;,</span>
<span class="hljs-comment">//                     &quot;orange&quot;,</span>
<span class="hljs-comment">//                     &quot;orange&quot;</span>
<span class="hljs-comment">//                 ]</span>
<span class="hljs-comment">//             ]</span>
<span class="hljs-comment">//         }</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.2097992897033691,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;656&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: {</span>
<span class="hljs-comment">//             &quot;label&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">//             &quot;tag&quot;: 7856,</span>
<span class="hljs-comment">//             &quot;coord&quot;: [</span>
<span class="hljs-comment">//                 5,</span>
<span class="hljs-comment">//                 20,</span>
<span class="hljs-comment">//                 4</span>
<span class="hljs-comment">//             ],</span>
<span class="hljs-comment">//             &quot;ref&quot;: [</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;black&quot;,</span>
<span class="hljs-comment">//                     &quot;orange&quot;,</span>
<span class="hljs-comment">//                     &quot;white&quot;</span>
<span class="hljs-comment">//                 ]</span>
<span class="hljs-comment">//             ]</span>
<span class="hljs-comment">//         }</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Filters entities that have the coordinator containing either <code translate="no">4</code> or <code translate="no">5</code>.</p>
<p><div class="multipleCode">
<a href="#python">Python </a>
<a href="#java">Java</a>
<a href="#javascript">Node.js</a>
</div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    data=query_vectors,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;JSON_CONTAINS_ANY(color[&quot;coord&quot;], [4, 5])&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 0,</span>
<span class="hljs-comment">#         &quot;color&quot;: {</span>
<span class="hljs-comment">#             &quot;label&quot;: &quot;yellow&quot;,</span>
<span class="hljs-comment">#             &quot;tag&quot;: 6340,</span>
<span class="hljs-comment">#             &quot;coord&quot;: [</span>
<span class="hljs-comment">#                 40,</span>
<span class="hljs-comment">#                 4,</span>
<span class="hljs-comment">#                 40</span>
<span class="hljs-comment">#             ],</span>
<span class="hljs-comment">#             &quot;ref&quot;: [</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;purple&quot;,</span>
<span class="hljs-comment">#                     &quot;yellow&quot;,</span>
<span class="hljs-comment">#                     &quot;orange&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;green&quot;,</span>
<span class="hljs-comment">#                     &quot;grey&quot;,</span>
<span class="hljs-comment">#                     &quot;purple&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;black&quot;,</span>
<span class="hljs-comment">#                     &quot;white&quot;,</span>
<span class="hljs-comment">#                     &quot;yellow&quot;</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             ]</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 2,</span>
<span class="hljs-comment">#         &quot;color&quot;: {</span>
<span class="hljs-comment">#             &quot;label&quot;: &quot;brown&quot;,</span>
<span class="hljs-comment">#             &quot;tag&quot;: 9359,</span>
<span class="hljs-comment">#             &quot;coord&quot;: [</span>
<span class="hljs-comment">#                 38,</span>
<span class="hljs-comment">#                 21,</span>
<span class="hljs-comment">#                 5</span>
<span class="hljs-comment">#             ],</span>
<span class="hljs-comment">#             &quot;ref&quot;: [</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;red&quot;,</span>
<span class="hljs-comment">#                     &quot;brown&quot;,</span>
<span class="hljs-comment">#                     &quot;white&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;purple&quot;,</span>
<span class="hljs-comment">#                     &quot;red&quot;,</span>
<span class="hljs-comment">#                     &quot;brown&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;pink&quot;,</span>
<span class="hljs-comment">#                     &quot;grey&quot;,</span>
<span class="hljs-comment">#                     &quot;black&quot;</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             ]</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 7,</span>
<span class="hljs-comment">#         &quot;color&quot;: {</span>
<span class="hljs-comment">#             &quot;label&quot;: &quot;green&quot;,</span>
<span class="hljs-comment">#             &quot;tag&quot;: 3560,</span>
<span class="hljs-comment">#             &quot;coord&quot;: [</span>
<span class="hljs-comment">#                 5,</span>
<span class="hljs-comment">#                 9,</span>
<span class="hljs-comment">#                 5</span>
<span class="hljs-comment">#             ],</span>
<span class="hljs-comment">#             &quot;ref&quot;: [</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;blue&quot;,</span>
<span class="hljs-comment">#                     &quot;orange&quot;,</span>
<span class="hljs-comment">#                     &quot;green&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;blue&quot;,</span>
<span class="hljs-comment">#                     &quot;blue&quot;,</span>
<span class="hljs-comment">#                     &quot;black&quot;</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 [</span>
<span class="hljs-comment">#                     &quot;green&quot;,</span>
<span class="hljs-comment">#                     &quot;purple&quot;,</span>
<span class="hljs-comment">#                     &quot;green&quot;</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             ]</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">searchReq = SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .data(query_vectors)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-string">&quot;JSON_CONTAINS_ANY(color[\&quot;coord\&quot;], [4, 5])&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .topK(<span class="hljs-number">3</span>)
        .build();

searchResp = client.search(searchReq);
searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (<span class="hljs-type">List</span>&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
} 

// Output:
// SearchResp.SearchResult(entity={color={<span class="hljs-string">&quot;label&quot;</span>:<span class="hljs-string">&quot;brown&quot;</span>,<span class="hljs-string">&quot;tag&quot;</span>:<span class="hljs-number">8414</span>,<span class="hljs-string">&quot;coord&quot;</span>:[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">15</span>],<span class="hljs-string">&quot;ref&quot;</span>:[[<span class="hljs-string">&quot;blue&quot;</span>,<span class="hljs-string">&quot;green&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>],[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;orange&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>],[<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-string">&quot;green&quot;</span>]]}, <span class="hljs-built_in">id</span>=<span class="hljs-number">11</span>}, score=<span class="hljs-number">1.18235</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">11</span>)
// SearchResp.SearchResult(entity={color={<span class="hljs-string">&quot;label&quot;</span>:<span class="hljs-string">&quot;yellow&quot;</span>,<span class="hljs-string">&quot;tag&quot;</span>:<span class="hljs-number">2846</span>,<span class="hljs-string">&quot;coord&quot;</span>:[<span class="hljs-number">20</span>,<span class="hljs-number">4</span>,<span class="hljs-number">15</span>],<span class="hljs-string">&quot;ref&quot;</span>:[[<span class="hljs-string">&quot;white&quot;</span>,<span class="hljs-string">&quot;black&quot;</span>,<span class="hljs-string">&quot;purple&quot;</span>],[<span class="hljs-string">&quot;green&quot;</span>,<span class="hljs-string">&quot;black&quot;</span>,<span class="hljs-string">&quot;yellow&quot;</span>],[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;purple&quot;</span>,<span class="hljs-string">&quot;brown&quot;</span>]]}, <span class="hljs-built_in">id</span>=<span class="hljs-number">589</span>}, score=<span class="hljs-number">1.1414992</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">589</span>)
// SearchResp.SearchResult(entity={color={<span class="hljs-string">&quot;label&quot;</span>:<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-string">&quot;tag&quot;</span>:<span class="hljs-number">6744</span>,<span class="hljs-string">&quot;coord&quot;</span>:[<span class="hljs-number">25</span>,<span class="hljs-number">33</span>,<span class="hljs-number">5</span>],<span class="hljs-string">&quot;ref&quot;</span>:[[<span class="hljs-string">&quot;orange&quot;</span>,<span class="hljs-string">&quot;purple&quot;</span>,<span class="hljs-string">&quot;white&quot;</span>],[<span class="hljs-string">&quot;white&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-string">&quot;brown&quot;</span>],[<span class="hljs-string">&quot;red&quot;</span>,<span class="hljs-string">&quot;pink&quot;</span>,<span class="hljs-string">&quot;red&quot;</span>]]}, <span class="hljs-built_in">id</span>=<span class="hljs-number">567</span>}, score=<span class="hljs-number">1.1087029</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">567</span>)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vectors,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;JSON_CONTAINS_ANY(color[&quot;coord&quot;], [4, 5])&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;id&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.9083369970321655,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;453&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: {</span>
<span class="hljs-comment">//             &quot;label&quot;: &quot;brown&quot;,</span>
<span class="hljs-comment">//             &quot;tag&quot;: 8788,</span>
<span class="hljs-comment">//             &quot;coord&quot;: [</span>
<span class="hljs-comment">//                 21,</span>
<span class="hljs-comment">//                 18,</span>
<span class="hljs-comment">//                 5</span>
<span class="hljs-comment">//             ],</span>
<span class="hljs-comment">//             &quot;ref&quot;: [</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;pink&quot;,</span>
<span class="hljs-comment">//                     &quot;black&quot;,</span>
<span class="hljs-comment">//                     &quot;brown&quot;</span>
<span class="hljs-comment">//                 ]</span>
<span class="hljs-comment">//             ]</span>
<span class="hljs-comment">//         }</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.8944344520568848,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;792&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: {</span>
<span class="hljs-comment">//             &quot;label&quot;: &quot;purple&quot;,</span>
<span class="hljs-comment">//             &quot;tag&quot;: 8161,</span>
<span class="hljs-comment">//             &quot;coord&quot;: [</span>
<span class="hljs-comment">//                 4,</span>
<span class="hljs-comment">//                 38,</span>
<span class="hljs-comment">//                 5</span>
<span class="hljs-comment">//             ],</span>
<span class="hljs-comment">//             &quot;ref&quot;: [</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;red&quot;,</span>
<span class="hljs-comment">//                     &quot;white&quot;,</span>
<span class="hljs-comment">//                     &quot;grey&quot;</span>
<span class="hljs-comment">//                 ]</span>
<span class="hljs-comment">//             ]</span>
<span class="hljs-comment">//         }</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.8615753650665283,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;272&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: {</span>
<span class="hljs-comment">//             &quot;label&quot;: &quot;grey&quot;,</span>
<span class="hljs-comment">//             &quot;tag&quot;: 3400,</span>
<span class="hljs-comment">//             &quot;coord&quot;: [</span>
<span class="hljs-comment">//                 5,</span>
<span class="hljs-comment">//                 1,</span>
<span class="hljs-comment">//                 32</span>
<span class="hljs-comment">//             ],</span>
<span class="hljs-comment">//             &quot;ref&quot;: [</span>
<span class="hljs-comment">//                 [</span>
<span class="hljs-comment">//                     &quot;purple&quot;,</span>
<span class="hljs-comment">//                     &quot;green&quot;,</span>
<span class="hljs-comment">//                     &quot;white&quot;</span>
<span class="hljs-comment">//                 ]</span>
<span class="hljs-comment">//             ]</span>
<span class="hljs-comment">//         }</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Reference-on-JSON-filters" class="common-anchor-header">Reference on JSON filters<button data-href="#Reference-on-JSON-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>When working with JSON fields, you can either use the JSON fields as filters or some of its specific keys.</p>
<div class="admonition note">
<p><b>notes</b></p>
<ul>
<li>Milvus stores string values in the JSON field as is without performing semantic escape or conversion. </li>
</ul>
<p>For instance, <code translate="no">'a"b'</code>, <code translate="no">"a'b"</code>, <code translate="no">'a\\\\'b'</code>, and <code translate="no">"a\\\\"b"</code> will be saved as is, while <code translate="no">'a'b'</code> and <code translate="no">"a"b"</code> will be treated as invalid values.</p>
<ul>
<li><p>To build filter expressions using a JSON field, you can utilize the keys within the field. </p></li>
<li><p>If a key's value is an integer or a float, you can compare it with another integer or float key or an INT32/64 or FLOAT32/64 field.</p></li>
<li><p>If a key's value is a string, you can compare it only with another string key or a VARCHAR field.</p></li>
</ul>
</div>
<h3 id="Basic-Operators-in-JSON-Fields" class="common-anchor-header">Basic Operators in JSON Fields</h3><p>The following table assumes that the value of a JSON field named <code translate="no">json_key</code> has a key named <code translate="no">A</code>. Use it as a reference when constructing boolean expressions using JSON field keys.</p>
<table>
<thead>
<tr><th><strong>Operator</strong></th><th><strong>Examples</strong></th><th><strong>Remarks</strong></th></tr>
</thead>
<tbody>
<tr><td><strong>&lt;</strong></td><td><code translate="no">'json_field[&quot;A&quot;] &lt; 3'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is less than <code translate="no">3</code>.</td></tr>
<tr><td><strong>&gt;</strong></td><td><code translate="no">'json_field[&quot;A&quot;] &gt; 1'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is greater than <code translate="no">1</code>.</td></tr>
<tr><td><strong>==</strong></td><td><code translate="no">'json_field[&quot;A&quot;] == 1'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is equal to <code translate="no">1</code>.</td></tr>
<tr><td><strong>!=</strong></td><td><code translate="no">'json_field[&quot;A&quot;][0]' != &quot;abc&quot;'</code></td><td>This expression evaluates to true if<br/> - <code translate="no">json_field</code> does not have a key named <code translate="no">A</code>.<br/> - <code translate="no">json_field</code> has a key named <code translate="no">A</code> but <code translate="no">json_field[&quot;A&quot;]</code> is not an array.<br/> - <code translate="no">json_field[&quot;A&quot;]</code> is an empty array.<br/> - <code translate="no">json_field[&quot;A&quot;]</code> is an array but the first element is not <code translate="no">abc</code>.<br/></td></tr>
<tr><td><strong>&lt;=</strong></td><td><code translate="no">'json_field[&quot;A&quot;] &lt;= 5'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is less than or equal to <code translate="no">5</code>.</td></tr>
<tr><td><strong>&gt;=</strong></td><td><code translate="no">'json_field[&quot;A&quot;] &gt;= 1'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is greater than or equal to <code translate="no">1</code>.</td></tr>
<tr><td><strong>not</strong></td><td><code translate="no">'not json_field[&quot;A&quot;] == 1'</code></td><td>This expression evaluates to true if<br/> - <code translate="no">json_field</code> does not have a key named <code translate="no">A</code>.<br/> - <code translate="no">json_field[&quot;A&quot;]</code> is not equal to <code translate="no">1</code>.<br/></td></tr>
<tr><td><strong>in</strong></td><td><code translate="no">'json_field[&quot;A&quot;] in [1, 2, 3]'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is <code translate="no">1</code>, <code translate="no">2</code>, or <code translate="no">3</code>.</td></tr>
<tr><td><strong>and (&amp;&amp;)</strong></td><td><code translate="no">'json_field[&quot;A&quot;] &gt; 1 &amp;&amp; json_field[&quot;A&quot;] &lt; 3'</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is greater than 1 and less than <code translate="no">3</code>.</td></tr>
<tr><td><strong>or (||)</strong></td><td><code translate="no">‘json_field[“A”] &gt; 1 || json_field[“A”] &lt; 3’</code></td><td>This expression evaluates to true if the value of <code translate="no">json_field[&quot;A&quot;]</code> is greater than <code translate="no">1</code> or less than <code translate="no">3</code>.</td></tr>
<tr><td><strong>exists</strong></td><td><code translate="no">'exists json_field[&quot;A&quot;]'</code></td><td>This expression evaluates to true if <code translate="no">json_field</code> has a key named <code translate="no">A</code>.</td></tr>
</tbody>
</table>
<h3 id="Advanced-Operators" class="common-anchor-header">Advanced Operators</h3><p>The following operators are specific to JSON fields:</p>
<ul>
<li><p><code translate="no">json_contains(identifier, jsonExpr)</code></p>
<p>This operator filters entities whose identifier contains the specified JSON expression.</p>
<ul>
<li><p>Example 1: <code translate="no">{&quot;x&quot;: [1,2,3]}</code></p>
<pre><code translate="no" class="language-python">json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># =&gt; True (x contains 1.)</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># =&gt; False (x does not contain a member &quot;a&quot;.)</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Example 2: <code translate="no">{&quot;x&quot;, [[1,2,3], [4,5,6], [7,8,9]]}</code></p>
<pre><code translate="no" class="language-python">json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># =&gt; True (x contains [1,2,3].)</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># =&gt; False (x does contain a member [3,2,1].)</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
<li><p><code translate="no">json_contains_all(identifier, jsonExpr)</code></p>
<p>This operator filters entities whose identifier contains all the members of the JSON expression.</p>
<p>Example: <code translate="no">{&quot;x&quot;: [1,2,3,4,5,7,8]}</code></p>
<pre><code translate="no" class="language-python">json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># =&gt; True (x contains 1, 2, and 8.)</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># =&gt; False (x does not has a member 6.)</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">json_contains_any(identifier, jsonExpr)</code></p>
<p>This operator filters entities whose identifier contains any members of the JSON expression.</p>
<p>Example: <code translate="no">{&quot;x&quot;: [1,2,3,4,5,7,8]}</code></p>
<pre><code translate="no" class="language-python">json_contains_any(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># =&gt; True (x contains 1, 2, and 8.)</span>
json_contains_any(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># =&gt; True (x contains 4 and 5.)</span>
json_contains_any(x, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># =&gt; False (x contains none of 6 and 9.)</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
