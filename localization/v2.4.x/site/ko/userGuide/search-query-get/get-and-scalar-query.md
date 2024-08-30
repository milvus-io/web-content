---
id: get-and-scalar-query.md
order: 3
summary: 이 가이드에서는 ID로 엔티티를 가져오고 스칼라 필터링을 수행하는 방법을 설명합니다.
title: 가져오기 및 스칼라 쿼리
---
<h1 id="Get--Scalar-Query" class="common-anchor-header">가져오기 및 스칼라 쿼리<button data-href="#Get--Scalar-Query" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드에서는 ID로 엔티티를 가져오고 스칼라 필터링을 수행하는 방법을 설명합니다. 스칼라 필터링은 지정된 필터링 조건과 일치하는 엔티티를 검색합니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>스칼라 쿼리는 부울 표현식을 사용하여 정의된 조건에 따라 컬렉션의 엔티티를 필터링합니다. 쿼리 결과는 정의된 조건과 일치하는 엔티티의 집합입니다. 컬렉션에서 주어진 벡터에 가장 가까운 벡터를 식별하는 벡터 검색과 달리, 쿼리는 특정 기준에 따라 엔티티를 필터링합니다.</p>
<p>Milvus에서 <strong>필터는 항상 연산자로 결합된 필드 이름으로 구성된 문자열입니다</strong>. 이 가이드에서는 다양한 필터 예제를 찾을 수 있습니다. 연산자 세부 사항에 대해 자세히 알아보려면 <a href="https://milvus.io/docs/get-and-scalar-query.md#Reference-on-scalar-filters">참조</a> 섹션으로 이동하세요.</p>
<h2 id="Preparations" class="common-anchor-header">준비<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 단계에서는 Milvus에 연결하고, 컬렉션을 빠르게 설정하고, 무작위로 생성된 1,000개 이상의 엔티티를 컬렉션에 삽입하기 위해 코드의 용도를 변경합니다.</p>
<h3 id="Step-1-Create-a-collection" class="common-anchor-header">1단계: 컬렉션 만들기</h3><div class="language-python">
<p>를 사용하여 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> 을 사용하여 Milvus 서버에 연결하고 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> 를 사용하여 컬렉션을 만듭니다.</p>
</div>
<div class="language-java">
<p>를 사용하여 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> 을 사용하여 Milvus 서버에 연결하고 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a> 을 사용하여 컬렉션을 만듭니다.</p>
</div>
<div class="language-javascript">
<p>를 사용하여 <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> 을 사용하여 Milvus 서버에 연결하고 <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a> 를 사용하여 컬렉션을 생성합니다.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    dimension=<span class="hljs-number">5</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);  

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">quickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .dimension(<span class="hljs-number">5</span>)
    .metricType(<span class="hljs-string">&quot;IP&quot;</span>)
    .build();

client.createCollection(quickSetupReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, sleep } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address}); 

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,
}); 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-randomly-generated-entities" class="common-anchor-header">2단계: 무작위로 생성된 엔티티 삽입하기</h3><div class="language-python">
<p>를 사용하여 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a> 를 사용하여 컬렉션에 엔티티를 삽입합니다.</p>
</div>
<div class="language-java">
<p>사용 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md"><code translate="no">insert()</code></a> 를 사용하여 컬렉션에 엔티티를 삽입합니다.</p>
</div>
<div class="language-javascript">
<p>사용 <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/insert.md"><code translate="no">insert()</code></a> 를 사용하여 컬렉션에 엔티티를 삽입합니다.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">노드.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Insert randomly generated vectors </span>
colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    current_color = random.choice(colors)
    current_tag = random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>)
    data.append({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(current_tag)}</span>&quot;</span>
    })

<span class="hljs-built_in">print</span>(data[<span class="hljs-number">0</span>])

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;id&quot;: 0,</span>
<span class="hljs-comment">#     &quot;vector&quot;: [</span>
<span class="hljs-comment">#         0.7371107800002366,</span>
<span class="hljs-comment">#         -0.7290389773227746,</span>
<span class="hljs-comment">#         0.38367002049157417,</span>
<span class="hljs-comment">#         0.36996000494220627,</span>
<span class="hljs-comment">#         -0.3641898951462792</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;color&quot;: &quot;yellow&quot;,</span>
<span class="hljs-comment">#     &quot;tag&quot;: 6781,</span>
<span class="hljs-comment">#     &quot;color_tag&quot;: &quot;yellow_6781&quot;</span>
<span class="hljs-comment"># }</span>

res = client.insert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
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
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 3. Insert randomly generated vectors into the collection</span>
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; colors = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>);
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-keyword">for</span> (int i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">1000</span>; i++) {
    <span class="hljs-title class_">Random</span> rand = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    <span class="hljs-title class_">String</span> current_color = colors.<span class="hljs-title function_">get</span>(rand.<span class="hljs-title function_">nextInt</span>(colors.<span class="hljs-title function_">size</span>()-<span class="hljs-number">1</span>));
    int current_tag = rand.<span class="hljs-title function_">nextInt</span>(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>;
    <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span> row = <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>();
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-title class_">Long</span>.<span class="hljs-title function_">valueOf</span>(i));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>()));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;color&quot;</span>, current_color);
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tag&quot;</span>, current_tag);
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;color_tag&quot;</span>, current_color + <span class="hljs-string">&#x27;_&#x27;</span> + <span class="hljs-title class_">String</span>.<span class="hljs-title function_">valueOf</span>(rand.<span class="hljs-title function_">nextInt</span>(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>));
    data.<span class="hljs-title function_">add</span>(row);
}

<span class="hljs-title class_">InsertReq</span> insertReq = <span class="hljs-title class_">InsertReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(data)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">InsertResp</span> insertResp = client.<span class="hljs-title function_">insert</span>(insertReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(insertResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;insertCnt&quot;: 1000}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. Insert randomly generated vectors</span>
<span class="hljs-keyword">const</span> colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
<span class="hljs-keyword">var</span> data = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
    current_color = colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)]
    current_tag = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">8999</span> + <span class="hljs-number">1000</span>)
    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">`<span class="hljs-subst">${current_color}</span>_<span class="hljs-subst">${current_tag}</span>`</span>
    })
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data[<span class="hljs-number">0</span>])

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   id: 0,</span>
<span class="hljs-comment">//   vector: [</span>
<span class="hljs-comment">//     0.16022394821966035,</span>
<span class="hljs-comment">//     0.6514875214491056,</span>
<span class="hljs-comment">//     0.18294484964044666,</span>
<span class="hljs-comment">//     0.30227694168725394,</span>
<span class="hljs-comment">//     0.47553087493572255</span>
<span class="hljs-comment">//   ],</span>
<span class="hljs-comment">//   color: &#x27;blue&#x27;,</span>
<span class="hljs-comment">//   tag: 8907,</span>
<span class="hljs-comment">//   color_tag: &#x27;blue_8907&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 1000</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Create-partitions-and-insert-more-entities" class="common-anchor-header">3단계: 파티션 생성 및 더 많은 엔티티 삽입하기</h3><div class="language-python">
<p>를 사용하여 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/create_partition.md"><code translate="no">create_partition()</code></a> 를 사용하여 파티션을 만들고 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a> 을 사용하여 컬렉션에 더 많은 엔티티를 삽입합니다.</p>
</div>
<div class="language-java">
<p>를 사용하여 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/createPartition.md"><code translate="no">createPartition()</code></a> 을 사용하여 파티션을 만들고 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md"><code translate="no">insert()</code></a> 를 사용하여 컬렉션에 더 많은 엔티티를 삽입합니다.</p>
</div>
<div class="language-javascript">
<p>사용 <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/createPartition.md"><code translate="no">createPartition()</code></a> 을 사용하여 파티션을 만들고 <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/insert.md"><code translate="no">insert()</code></a> 를 사용하여 컬렉션에 더 많은 엔티티를 삽입합니다.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Create partitions and insert more entities</span>
client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

data = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>, <span class="hljs-number">1500</span>):
    current_color = random.choice(colors)
    data.append({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(current_tag)}</span>&quot;</span>
    })

res = client.insert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=data,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 500,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         1000,</span>
<span class="hljs-comment">#         1001,</span>
<span class="hljs-comment">#         1002,</span>
<span class="hljs-comment">#         1003,</span>
<span class="hljs-comment">#         1004,</span>
<span class="hljs-comment">#         1005,</span>
<span class="hljs-comment">#         1006,</span>
<span class="hljs-comment">#         1007,</span>
<span class="hljs-comment">#         1008,</span>
<span class="hljs-comment">#         1009,</span>
<span class="hljs-comment">#         &quot;(490 more items hidden)&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>

data = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1500</span>, <span class="hljs-number">2000</span>):
    current_color = random.choice(colors)
    data.append({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(current_tag)}</span>&quot;</span>
    })

res = client.insert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=data,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 500,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         1500,</span>
<span class="hljs-comment">#         1501,</span>
<span class="hljs-comment">#         1502,</span>
<span class="hljs-comment">#         1503,</span>
<span class="hljs-comment">#         1504,</span>
<span class="hljs-comment">#         1505,</span>
<span class="hljs-comment">#         1506,</span>
<span class="hljs-comment">#         1507,</span>
<span class="hljs-comment">#         1508,</span>
<span class="hljs-comment">#         1509,</span>
<span class="hljs-comment">#         &quot;(490 more items hidden)&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 4. Create partitions and insert some more data</span>
<span class="hljs-title class_">CreatePartitionReq</span> createPartitionReq = <span class="hljs-title class_">CreatePartitionReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .<span class="hljs-title function_">build</span>();

client.<span class="hljs-title function_">createPartition</span>(createPartitionReq);

createPartitionReq = <span class="hljs-title class_">CreatePartitionReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .<span class="hljs-title function_">build</span>();

client.<span class="hljs-title function_">createPartition</span>(createPartitionReq);

data.<span class="hljs-title function_">clear</span>();

<span class="hljs-keyword">for</span> (int i=<span class="hljs-number">1000</span>; i&lt;<span class="hljs-number">1500</span>; i++) {
    <span class="hljs-title class_">Random</span> rand = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    <span class="hljs-title class_">String</span> current_color = colors.<span class="hljs-title function_">get</span>(rand.<span class="hljs-title function_">nextInt</span>(colors.<span class="hljs-title function_">size</span>()-<span class="hljs-number">1</span>));
    int current_tag = rand.<span class="hljs-title function_">nextInt</span>(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>;
    <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span> row = <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>();
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-title class_">Long</span>.<span class="hljs-title function_">valueOf</span>(i));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>()));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;color&quot;</span>, current_color);
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tag&quot;</span>, current_tag);
    data.<span class="hljs-title function_">add</span>(row);
}

insertReq = <span class="hljs-title class_">InsertReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(data)
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .<span class="hljs-title function_">build</span>();

insertResp = client.<span class="hljs-title function_">insert</span>(insertReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(insertResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;insertCnt&quot;: 500}</span>

data.<span class="hljs-title function_">clear</span>();

<span class="hljs-keyword">for</span> (int i=<span class="hljs-number">1500</span>; i&lt;<span class="hljs-number">2000</span>; i++) {
    <span class="hljs-title class_">Random</span> rand = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    <span class="hljs-title class_">String</span> current_color = colors.<span class="hljs-title function_">get</span>(rand.<span class="hljs-title function_">nextInt</span>(colors.<span class="hljs-title function_">size</span>()-<span class="hljs-number">1</span>));
    int current_tag = rand.<span class="hljs-title function_">nextInt</span>(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>;
    <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span> row = <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>();
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-title class_">Long</span>.<span class="hljs-title function_">valueOf</span>(i));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>()));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;color&quot;</span>, current_color);
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tag&quot;</span>, current_tag);
    data.<span class="hljs-title function_">add</span>(row);
}

insertReq = <span class="hljs-title class_">InsertReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(data)
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .<span class="hljs-title function_">build</span>();

insertResp = client.<span class="hljs-title function_">insert</span>(insertReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(insertResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;insertCnt&quot;: 500}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Create partitions and insert more entities</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

data = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1000</span>; i &lt; <span class="hljs-number">1500</span>; i++) {
    current_color = colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)]
    current_tag = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">8999</span> + <span class="hljs-number">1000</span>)
    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">`<span class="hljs-subst">${current_color}</span>_<span class="hljs-subst">${current_tag}</span>`</span>
    })
}

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 500</span>
<span class="hljs-comment">// </span>

<span class="hljs-keyword">await</span> <span class="hljs-title function_">sleep</span>(<span class="hljs-number">5000</span>)

data = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1500</span>; i &lt; <span class="hljs-number">2000</span>; i++) {
    current_color = colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)]
    current_tag = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">8999</span> + <span class="hljs-number">1000</span>)
    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">`<span class="hljs-subst">${current_color}</span>_<span class="hljs-subst">${current_tag}</span>`</span>
    })
}

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 500</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Get-Entities-by-ID" class="common-anchor-header">ID로 엔티티 가져오기<button data-href="#Get-Entities-by-ID" class="anchor-icon" translate="no">
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
<p>관심 있는 엔티티의 ID를 알고 있는 경우에는 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/get.md"><code translate="no">get()</code></a> 메서드를 사용할 수 있습니다.</p>
</div>
<div class="language-java">
<p>관심 있는 엔티티의 ID를 알고 있는 경우에는 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/get.md"><code translate="no">get()</code></a> 메서드를 사용할 수 있습니다.</p>
</div>
<div class="language-javascript">
<p>관심 있는 엔티티의 ID를 알고 있는 경우에는 <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/get.md"><code translate="no">get()</code></a> 메서드를 사용할 수 있습니다.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Get entities by ID</span>
res = client.get(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    ids=[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 0,</span>
<span class="hljs-comment">#         &quot;vector&quot;: [</span>
<span class="hljs-comment">#             0.68824464,</span>
<span class="hljs-comment">#             0.6552274,</span>
<span class="hljs-comment">#             0.33593303,</span>
<span class="hljs-comment">#             -0.7099536,</span>
<span class="hljs-comment">#             -0.07070546</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;green_2006&quot;,</span>
<span class="hljs-comment">#         &quot;color&quot;: &quot;green&quot;</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 1,</span>
<span class="hljs-comment">#         &quot;vector&quot;: [</span>
<span class="hljs-comment">#             -0.98531723,</span>
<span class="hljs-comment">#             0.33456197,</span>
<span class="hljs-comment">#             0.2844234,</span>
<span class="hljs-comment">#             0.42886782,</span>
<span class="hljs-comment">#             0.32753858</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;white_9298&quot;,</span>
<span class="hljs-comment">#         &quot;color&quot;: &quot;white&quot;</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 2,</span>
<span class="hljs-comment">#         &quot;vector&quot;: [</span>
<span class="hljs-comment">#             -0.9886812,</span>
<span class="hljs-comment">#             -0.44129863,</span>
<span class="hljs-comment">#             -0.29859528,</span>
<span class="hljs-comment">#             0.06059075,</span>
<span class="hljs-comment">#             -0.43817034</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;grey_5312&quot;,</span>
<span class="hljs-comment">#         &quot;color&quot;: &quot;grey&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 5. Get entities by ID</span>
<span class="hljs-title class_">GetReq</span> getReq = <span class="hljs-title class_">GetReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">ids</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(0L, 1L, 2L))
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">GetResp</span> entities = client.<span class="hljs-title function_">get</span>(getReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(entities));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;getResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;white&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;white_4597&quot;,</span>
<span class="hljs-comment">//         &quot;vector&quot;: [</span>
<span class="hljs-comment">//             0.09665024,</span>
<span class="hljs-comment">//             0.1163497,</span>
<span class="hljs-comment">//             0.0701347,</span>
<span class="hljs-comment">//             0.32577968,</span>
<span class="hljs-comment">//             0.40943468</span>
<span class="hljs-comment">//         ],</span>
<span class="hljs-comment">//         &quot;tag&quot;: 8946,</span>
<span class="hljs-comment">//         &quot;id&quot;: 0</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;green&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;green_3039&quot;,</span>
<span class="hljs-comment">//         &quot;vector&quot;: [</span>
<span class="hljs-comment">//             0.90689456,</span>
<span class="hljs-comment">//             0.4377399,</span>
<span class="hljs-comment">//             0.75387514,</span>
<span class="hljs-comment">//             0.36454988,</span>
<span class="hljs-comment">//             0.8702918</span>
<span class="hljs-comment">//         ],</span>
<span class="hljs-comment">//         &quot;tag&quot;: 2341,</span>
<span class="hljs-comment">//         &quot;id&quot;: 1</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;white&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;white_8708&quot;,</span>
<span class="hljs-comment">//         &quot;vector&quot;: [</span>
<span class="hljs-comment">//             0.9757728,</span>
<span class="hljs-comment">//             0.13974023,</span>
<span class="hljs-comment">//             0.8023141,</span>
<span class="hljs-comment">//             0.61947155,</span>
<span class="hljs-comment">//             0.8290197</span>
<span class="hljs-comment">//         ],</span>
<span class="hljs-comment">//         &quot;tag&quot;: 9913,</span>
<span class="hljs-comment">//         &quot;id&quot;: 2</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Get entities by id</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">get</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">ids</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>],
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     vector: [</span>
<span class="hljs-comment">//       0.16022394597530365,</span>
<span class="hljs-comment">//       0.6514875292778015,</span>
<span class="hljs-comment">//       0.18294484913349152,</span>
<span class="hljs-comment">//       0.30227693915367126,</span>
<span class="hljs-comment">//       0.47553086280822754</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;blue&#x27;, tag: 8907, color_tag: &#x27;blue_8907&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;0&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     vector: [</span>
<span class="hljs-comment">//       0.2459285855293274,</span>
<span class="hljs-comment">//       0.4974019527435303,</span>
<span class="hljs-comment">//       0.2154673933982849,</span>
<span class="hljs-comment">//       0.03719571232795715,</span>
<span class="hljs-comment">//       0.8348019123077393</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;grey&#x27;, tag: 3710, color_tag: &#x27;grey_3710&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;1&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     vector: [</span>
<span class="hljs-comment">//       0.9404329061508179,</span>
<span class="hljs-comment">//       0.49662265181541443,</span>
<span class="hljs-comment">//       0.8088793158531189,</span>
<span class="hljs-comment">//       0.9337621331214905,</span>
<span class="hljs-comment">//       0.8269071578979492</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;blue&#x27;, tag: 2993, color_tag: &#x27;blue_2993&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;2&#x27;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Get-entities-from-partitions" class="common-anchor-header">파티션에서 엔티티 가져오기</h3><p>특정 파티션에서 엔티티를 가져올 수도 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Get entities from partitions</span>
res = client.get(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    ids=[<span class="hljs-number">1000</span>, <span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>],
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color&quot;: &quot;green&quot;,</span>
<span class="hljs-comment">#         &quot;tag&quot;: 1995,</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;green_1995&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 1000,</span>
<span class="hljs-comment">#         &quot;vector&quot;: [</span>
<span class="hljs-comment">#             0.7807706,</span>
<span class="hljs-comment">#             0.8083741,</span>
<span class="hljs-comment">#             0.17276904,</span>
<span class="hljs-comment">#             -0.8580777,</span>
<span class="hljs-comment">#             0.024156934</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">#         &quot;tag&quot;: 1995,</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_1995&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 1001,</span>
<span class="hljs-comment">#         &quot;vector&quot;: [</span>
<span class="hljs-comment">#             0.065074645,</span>
<span class="hljs-comment">#             -0.44882354,</span>
<span class="hljs-comment">#             -0.29479212,</span>
<span class="hljs-comment">#             -0.19798489,</span>
<span class="hljs-comment">#             -0.77542555</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color&quot;: &quot;green&quot;,</span>
<span class="hljs-comment">#         &quot;tag&quot;: 1995,</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;green_1995&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 1002,</span>
<span class="hljs-comment">#         &quot;vector&quot;: [</span>
<span class="hljs-comment">#             0.027934508,</span>
<span class="hljs-comment">#             -0.44199976,</span>
<span class="hljs-comment">#             -0.40262738,</span>
<span class="hljs-comment">#             -0.041511405,</span>
<span class="hljs-comment">#             0.024782438</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 5. Get entities by ID in a partition</span>
getReq = <span class="hljs-title class_">GetReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">ids</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(1001L, 1002L, 1003L))
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .<span class="hljs-title function_">build</span>();

entities = client.<span class="hljs-title function_">get</span>(getReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(entities));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;getResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;yellow&quot;,</span>
<span class="hljs-comment">//         &quot;vector&quot;: [</span>
<span class="hljs-comment">//             0.4300114,</span>
<span class="hljs-comment">//             0.599917,</span>
<span class="hljs-comment">//             0.799163,</span>
<span class="hljs-comment">//             0.75395125,</span>
<span class="hljs-comment">//             0.89947814</span>
<span class="hljs-comment">//         ],</span>
<span class="hljs-comment">//         &quot;id&quot;: 1001,</span>
<span class="hljs-comment">//         &quot;tag&quot;: 5803</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;blue&quot;,</span>
<span class="hljs-comment">//         &quot;vector&quot;: [</span>
<span class="hljs-comment">//             0.009218454,</span>
<span class="hljs-comment">//             0.64637834,</span>
<span class="hljs-comment">//             0.19815737,</span>
<span class="hljs-comment">//             0.30519038,</span>
<span class="hljs-comment">//             0.8218663</span>
<span class="hljs-comment">//         ],</span>
<span class="hljs-comment">//         &quot;id&quot;: 1002,</span>
<span class="hljs-comment">//         &quot;tag&quot;: 7212</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;black&quot;,</span>
<span class="hljs-comment">//         &quot;vector&quot;: [</span>
<span class="hljs-comment">//             0.76521933,</span>
<span class="hljs-comment">//             0.7818409,</span>
<span class="hljs-comment">//             0.16976339,</span>
<span class="hljs-comment">//             0.8719652,</span>
<span class="hljs-comment">//             0.1434964</span>
<span class="hljs-comment">//         ],</span>
<span class="hljs-comment">//         &quot;id&quot;: 1003,</span>
<span class="hljs-comment">//         &quot;tag&quot;: 1710</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5.1 Get entities by id in a partition</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">get</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">ids</span>: [<span class="hljs-number">1000</span>, <span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>],
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>],
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     id: &#x27;1000&#x27;,</span>
<span class="hljs-comment">//     vector: [</span>
<span class="hljs-comment">//       0.014254206791520119,</span>
<span class="hljs-comment">//       0.5817716121673584,</span>
<span class="hljs-comment">//       0.19793470203876495,</span>
<span class="hljs-comment">//       0.8064294457435608,</span>
<span class="hljs-comment">//       0.7745839357376099</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;white&#x27;, tag: 5996, color_tag: &#x27;white_5996&#x27; }</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     id: &#x27;1001&#x27;,</span>
<span class="hljs-comment">//     vector: [</span>
<span class="hljs-comment">//       0.6073881983757019,</span>
<span class="hljs-comment">//       0.05214758217334747,</span>
<span class="hljs-comment">//       0.730999231338501,</span>
<span class="hljs-comment">//       0.20900958776474,</span>
<span class="hljs-comment">//       0.03665429726243019</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;grey&#x27;, tag: 2834, color_tag: &#x27;grey_2834&#x27; }</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     id: &#x27;1002&#x27;,</span>
<span class="hljs-comment">//     vector: [</span>
<span class="hljs-comment">//       0.48877206444740295,</span>
<span class="hljs-comment">//       0.34028753638267517,</span>
<span class="hljs-comment">//       0.6527213454246521,</span>
<span class="hljs-comment">//       0.9763909578323364,</span>
<span class="hljs-comment">//       0.8031482100486755</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;pink&#x27;, tag: 9107, color_tag: &#x27;pink_9107&#x27; }</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Basic-Operators" class="common-anchor-header">기본 연산자 사용<button data-href="#Use-Basic-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 스칼라 필터링에서 기본 연산자를 사용하는 방법에 대한 예제를 찾을 수 있습니다. 이러한 필터를 <a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">벡터 검색</a> 및 <a href="https://milvus.io/docs/insert-update-delete.md#Delete-entities">데이터 삭제에도</a> 적용할 수 있습니다.</p>
<div class="language-python">
<p>자세한 내용은 SDK 참조에서 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md"><code translate="no">query()</code></a> 를 참조하세요.</p>
</div>
<div class="language-java">
<p>자세한 내용은 SDK 참조에서 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/query.md"><code translate="no">query()</code></a> 를 참조하세요.</p>
</div>
<div class="language-javascript">
<p>자세한 내용은 <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/query.md"><code translate="no">query()</code></a> 를 참조하세요.</p>
</div>
<ul>
<li><p>태그 값이 1,000에서 1,500 사이인 엔티티를 필터링합니다.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. Use basic operators</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;1000 &lt; tag &lt; 1500&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;color_tag&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 1,</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;pink_1023&quot;</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 41,</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_1483&quot;</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;id&quot;: 44,</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;grey_1146&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 6. Use basic operators</span>

<span class="hljs-title class_">QueryReq</span> queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;1000 &lt; tag &lt; 1500&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color_tag&quot;</span>))
    .<span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">QueryResp</span> queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;white_7588&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 34</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;orange_4989&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 64</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;white_3415&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 73</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 6. Use basic operators</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;1000 &lt; tag &lt; 1500&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;pink&#x27;, tag: 1050, color_tag: &#x27;pink_1050&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;6&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;purple&#x27;, tag: 1174, color_tag: &#x27;purple_1174&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;24&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;orange&#x27;, tag: 1023, color_tag: &#x27;orange_1023&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;40&#x27;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>색상</strong> 값이 <strong>갈색으로</strong> 설정된 엔티티를 필터링합니다.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color == &quot;brown&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;color_tag&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;brown_5343&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 15</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;brown_3167&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 27</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;brown_3100&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 30</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;color == \&quot;brown\&quot;&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color_tag&quot;</span>))
    .<span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;brown_7792&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 3</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;brown_9695&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 7</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;brown_2551&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 15</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color == &quot;brown&quot;&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;brown&#x27;, tag: 6839, color_tag: &#x27;brown_6839&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;22&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;brown&#x27;, tag: 7849, color_tag: &#x27;brown_7849&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;32&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;brown&#x27;, tag: 7855, color_tag: &#x27;brown_7855&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;33&#x27;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>색상</strong> 값이 <strong>녹색과</strong> <strong>보라색으로</strong> 설정되지 않은 엔티티를 필터링합니다.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color not in [&quot;green&quot;, &quot;purple&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;color_tag&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;yellow_6781&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 0</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;pink_1023&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 1</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;blue_3972&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 2</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;color not in [\&quot;green\&quot;, \&quot;purple\&quot;]&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color_tag&quot;</span>))
    .<span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));   

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;white_4597&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 0</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;white_8708&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 2</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;brown_7792&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 3</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color not in [&quot;green&quot;, &quot;purple&quot;]&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;blue&#x27;, tag: 8907, color_tag: &#x27;blue_8907&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;0&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;grey&#x27;, tag: 3710, color_tag: &#x27;grey_3710&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;1&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;blue&#x27;, tag: 2993, color_tag: &#x27;blue_2993&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;2&#x27;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>색상 태그가 <strong>빨간색으로</strong> 시작하는 문서를 필터링합니다.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color_tag like &quot;red%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;color_tag&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_6443&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 17</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_1483&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 41</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_4348&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 47</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;color_tag like \&quot;red%\&quot;&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color_tag&quot;</span>))
    .<span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));  

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;red_4929&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 9</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;red_8284&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 13</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;red_3021&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 44</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color_tag like &quot;red%&quot;&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;red&#x27;, tag: 8773, color_tag: &#x27;red_8773&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;17&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;red&#x27;, tag: 9197, color_tag: &#x27;red_9197&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;34&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;red&#x27;, tag: 7914, color_tag: &#x27;red_7914&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;46&#x27;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>색상이 빨간색으로 설정되어 있고 태그 값이 1,000에서 1,500 범위 내에 있는 항목을 필터링합니다.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;(color == &quot;red&quot;) and (1000 &lt; tag &lt; 1500)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;color_tag&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_1483&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 41</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_1100&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 94</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;color_tag&quot;: &quot;red_1343&quot;,</span>
<span class="hljs-comment">#         &quot;id&quot;: 526</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;(color == \&quot;red\&quot;) and (1000 &lt; tag &lt; 1500)&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;color_tag&quot;</span>))
    .<span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));  

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;red_8124&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 83</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;red_5358&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 501</span>
<span class="hljs-comment">//     }},</span>
<span class="hljs-comment">//     {&quot;entity&quot;: {</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;red_3564&quot;,</span>
<span class="hljs-comment">//         &quot;id&quot;: 638</span>
<span class="hljs-comment">//     }}</span>
<span class="hljs-comment">// ]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;(color == &quot;red&quot;) and (1000 &lt; tag &lt; 1500)&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;red&#x27;, tag: 1436, color_tag: &#x27;red_1436&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;67&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;red&#x27;, tag: 1463, color_tag: &#x27;red_1463&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;160&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   {</span>
<span class="hljs-comment">//     &#x27;$meta&#x27;: { color: &#x27;red&#x27;, tag: 1073, color_tag: &#x27;red_1073&#x27; },</span>
<span class="hljs-comment">//     id: &#x27;291&#x27;</span>
<span class="hljs-comment">//   }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Use-Advanced-Operators" class="common-anchor-header">고급 연산자 사용<button data-href="#Use-Advanced-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 스칼라 필터링에서 고급 연산자를 사용하는 방법에 대한 예제를 찾을 수 있습니다. 이러한 필터를 <a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">벡터 검색</a> 및 <a href="https://milvus.io/docs/insert-update-delete.md#Delete-entities">데이터 삭제에도</a> 적용할 수 있습니다.</p>
<h3 id="Count-entities" class="common-anchor-header">엔티티 카운트</h3><ul>
<li><p>컬렉션의 총 엔티티 수를 계산합니다.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Use advanced operators</span>

<span class="hljs-comment"># Count the total number of entities in a collection</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;count(*)&quot;: 2000</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 7. Use advanced operators</span>
<span class="hljs-comment">// Count the total number of entities in the collection</span>
queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;count(*)&quot;</span>))
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [{&quot;entity&quot;: {&quot;count(*)&quot;: 2000}}]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Use advanced operators</span>
<span class="hljs-comment">// Count the total number of entities in a collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;count(*)&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)   

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ { &#x27;count(*)&#x27;: &#x27;2000&#x27; } ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>특정 파티션에 있는 엔티티의 총 개수를 계산합니다.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Count the number of entities in a partition</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>],
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;count(*)&quot;: 500</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Count the number of entities in a partition</span>
queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">partitionNames</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;count(*)&quot;</span>))
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [{&quot;entity&quot;: {&quot;count(*)&quot;: 500}}]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Count the number of entities in a partition</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;count(*)&quot;</span>],
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)     

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ { &#x27;count(*)&#x27;: &#x27;500&#x27; } ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>필터링 조건에 일치하는 엔티티의 수를 계산합니다.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Count the number of entities that match a specific filter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;(color == &quot;red&quot;) and (1000 &lt; tag &lt; 1500)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>],
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#         &quot;count(*)&quot;: 3</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Count the number of entities that match a specific filter</span>
queryReq = <span class="hljs-title class_">QueryReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;(color == \&quot;red\&quot;) and (1000 &lt; tag &lt; 1500)&quot;</span>)
    .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;count(*)&quot;</span>))
    .<span class="hljs-title function_">build</span>();

queryResp = client.<span class="hljs-title function_">query</span>(queryReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(queryResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;queryResults&quot;: [{&quot;entity&quot;: {&quot;count(*)&quot;: 7}}]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Count the number of entities that match a specific filter</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;(color == &quot;red&quot;) and (1000 &lt; tag &lt; 1500)&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;count(*)&quot;</span>]
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">data</span>)   

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ { &#x27;count(*)&#x27;: &#x27;10&#x27; } ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Reference-on-scalar-filters" class="common-anchor-header">스칼라 필터에 대한 참조<button data-href="#Reference-on-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Basic-Operators" class="common-anchor-header">기본 연산자</h3><p><strong>부울 표현식은</strong> 항상 <strong>연산자로 결합된 필드 이름으로 구성된 문자열입니다</strong>. 이 섹션에서는 기본 연산자에 대해 자세히 알아봅니다.</p>
<table>
<thead>
<tr><th><strong>연산자</strong></th><th><strong>설명</strong></th></tr>
</thead>
<tbody>
<tr><td><strong>및 (&amp;&amp;)</strong></td><td>두 피연산자가 모두 참이면 참</td></tr>
<tr><td><strong>또는 (||)</strong></td><td>피연산자 중 하나가 참이면 참</td></tr>
<tr><td><strong>+, -, *, /</strong></td><td>덧셈, 뺄셈, 곱셈, 나눗셈</td></tr>
<tr><td><strong>**</strong></td><td>지수</td></tr>
<tr><td><strong>%</strong></td><td>모듈러스</td></tr>
<tr><td><strong>&lt;, &gt;</strong></td><td>보다 작음, 보다 큼</td></tr>
<tr><td><strong>==, !=</strong></td><td>같음, 같지 않음</td></tr>
<tr><td><strong>&lt;=, &gt;=</strong></td><td>보다 작거나 같음, 보다 크거나 같음</td></tr>
<tr><td><strong>not</strong></td><td>주어진 조건의 결과를 반전시킵니다.</td></tr>
<tr><td><strong>like</strong></td><td>와일드카드 연산자를 사용하여 값을 유사한 값과 비교합니다.<br/> 예를 들어, '접두사%'는 '접두사'로 시작하는 문자열과 일치합니다.</td></tr>
<tr><td><strong>in</strong></td><td>표현식이 값 목록의 어떤 값과 일치하는지 테스트합니다.</td></tr>
</tbody>
</table>
<h3 id="Advanced-operators" class="common-anchor-header">고급 연산자</h3><ul>
<li><p><code translate="no">count(*)</code></p>
<p>컬렉션에 있는 엔티티의 정확한 개수를 계산합니다. 컬렉션 또는 파티션의 정확한 엔티티 수를 가져오려면 이 값을 출력 필드로 사용합니다.</p>
<p><div class="admonition note"></p>
<p><p><b>참고</b></p></p>
<p><p>로드된 컬렉션에 적용됩니다. 유일한 출력 필드로 사용해야 합니다.</p></p>
<p></div></p></li>
</ul>
