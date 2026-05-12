---
id: array_data_type.md
title: 배열 필드 사용하기
---
<h1 id="Use-Array-Fields" class="common-anchor-header">배열 필드 사용하기<button data-href="#Use-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드에서는 배열 값 삽입, 벡터 및 배열 필드에 인덱스 생성, 기본 및 고급 연산자를 사용한 배열 필드에서 검색 및 쿼리 등 배열 필드를 사용하는 방법을 설명합니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">사전 요구 사항<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>다음이 필요합니다:</p>
<ul>
<li>Milvus가 설치되어 실행 중입니다. Milvus 설치 방법에 대한 자세한 내용은 <a href="/docs/ko/install-overview.md">Milvus 설치를</a> 참조하세요.</li>
<li>사용 중인 환경에 Milvus SDK 중 하나가 설치되어 있어야 합니다. 자세한 내용은 <a href="/docs/ko/install-pymilvus.md">SDK 설치를</a> 참조하세요.</li>
</ul>
<h2 id="Prepare-data-with-an-array-field" class="common-anchor-header">배열 필드로 데이터 준비하기<button data-href="#Prepare-data-with-an-array-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 필드 데이터 유형 중 하나로 배열을 지원합니다. Milvus 컬렉션의 배열에는 항상 동일한 데이터 유형의 요소가 있어야 하며, 배열 요소의 데이터 유형은 Milvus에서 지원되는 모든 데이터 유형이 될 수 있습니다. 지원되는 데이터 유형 목록은 <a href="https://milvus.io/docs/schema.md#Supported-data-types">지원되는 데이터 유형을</a> 참조하세요.</p>
<p>다음 코드 스니펫은 인터거 데이터 유형의 모든 요소가 포함된 <code translate="no">color_coord</code> 이라는 이름의 배열 필드를 포함하는 임의의 데이터 세트를 생성합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    current_color = random.choice(colors)
    current_tag = random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>)
    current_coord = [ random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(random.randint(<span class="hljs-number">3</span>, <span class="hljs-number">5</span>)) ]
    data.append({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;color_tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_coord&quot;</span>: current_coord,
    })

<span class="hljs-built_in">print</span>(data[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> java.util.*;

List&lt;String&gt; colors = Arrays.asList(<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>);
List&lt;JsonObject&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">Random</span> <span class="hljs-variable">rand</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">1000</span>; i++) {
    <span class="hljs-type">String</span> <span class="hljs-variable">current_color</span> <span class="hljs-operator">=</span> colors.get(rand.nextInt(colors.size()-<span class="hljs-number">1</span>));
    <span class="hljs-type">Integer</span> <span class="hljs-variable">current_tag</span> <span class="hljs-operator">=</span> rand.nextInt(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>;

    <span class="hljs-comment">// Generate an random-sized array</span>
    <span class="hljs-type">int</span> <span class="hljs-variable">capacity</span> <span class="hljs-operator">=</span> rand.nextInt(<span class="hljs-number">5</span>) + <span class="hljs-number">1</span>;
    List&lt;Integer&gt; current_coord = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> j=<span class="hljs-number">0</span>; j&lt;capacity; j++) {
        current_coord.add(rand.nextInt(<span class="hljs-number">40</span>));
    }

    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, (<span class="hljs-type">long</span>) i);
    row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat())));
    row.addProperty(<span class="hljs-string">&quot;color&quot;</span>, current_color);
    row.addProperty(<span class="hljs-string">&quot;color_tag&quot;</span>, current_tag);
    row.add(<span class="hljs-string">&quot;color_coord&quot;</span>, gson.toJsonTree(current_coord));
    data.add(row);
}

System.out.println(data.get(<span class="hljs-number">0</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>];
<span class="hljs-keyword">let</span> data = [];

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
    <span class="hljs-keyword">const</span> current_color = colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)];
    <span class="hljs-keyword">const</span> current_tag = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">8999</span> + <span class="hljs-number">1000</span>);
    <span class="hljs-keyword">const</span> current_coord = <span class="hljs-title class_">Array</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">5</span> + <span class="hljs-number">1</span>)).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">40</span>));

    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">id</span>: i,
        <span class="hljs-attr">vector</span>: <span class="hljs-title class_">Array</span>(<span class="hljs-number">5</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()),
        <span class="hljs-attr">color</span>: current_color,
        <span class="hljs-attr">color_tag</span>: current_tag,
        <span class="hljs-attr">color_coord</span>: current_coord,
    });
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data[<span class="hljs-number">0</span>]);
<button class="copy-code-btn"></button></code></pre>
<p>이 코드 조각은 임의의 색상 목록을 준비하고 1,000개의 엔티티가 포함된 데이터 집합을 생성합니다. 각 엔티티에는 ID, 5개의 부동 소수점 숫자 벡터, 색상, 색상 태그, 3~5개의 정수 값을 포함하는 배열 필드 <code translate="no">color_coord</code> 가 있습니다. 샘플 데이터는 구조를 확인하기 위해 인쇄됩니다.</p>
<p>출력 구조:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    id<span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
    vector<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-number">0.0338537420906162</span><span class="hljs-punctuation">,</span>
        <span class="hljs-number">0.6844108238358322</span><span class="hljs-punctuation">,</span>
        <span class="hljs-number">0.28410588909961754</span><span class="hljs-punctuation">,</span>
        <span class="hljs-number">0.09752595400212116</span><span class="hljs-punctuation">,</span>
        <span class="hljs-number">0.22671013058761114</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    color<span class="hljs-punctuation">:</span> &#x27;orange&#x27;<span class="hljs-punctuation">,</span>
    color_tag<span class="hljs-punctuation">:</span> <span class="hljs-number">5677</span><span class="hljs-punctuation">,</span>
    color_coord<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">29</span> <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-MilvusClient" class="common-anchor-header">MilvusClient 설정<button data-href="#Set-up-MilvusClient" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus와 상호 작용하려면 서버 주소를 지정하여 Milvus 클라이언트를 설정하세요.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

SERVER_ADDR = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

client = MilvusClient(uri=SERVER_ADDR)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.*;

<span class="hljs-type">String</span> <span class="hljs-variable">SERVER_ADDR</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(SERVER_ADDR)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Connect to Milvus server</span>
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({<span class="hljs-attr">address</span>: address});
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-collection-with-an-array-field" class="common-anchor-header">배열 필드가 있는 컬렉션 만들기<button data-href="#Create-a-collection-with-an-array-field" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Define-collection-schema" class="common-anchor-header">컬렉션 스키마 정의<button data-href="#Define-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>스키마는 필드 및 해당 데이터 유형을 포함하여 컬렉션의 구조를 정의합니다. 아래 예는 <a href="#prepare-data-with-an-array-field">이전 섹션에서</a> 생성된 샘플 데이터와 일치하는 컬렉션 스키마를 정의합니다.</p>
<p>컬렉션에서 배열 필드를 구성하려면 다음과 같이 하세요:</p>
<div class="language-python">
<ol>
<li><code translate="no">datatype</code>: 를 <code translate="no">DataType.ARRAY</code> 으로 설정합니다.</li>
<li><code translate="no">element_type</code>: 배열의 요소에 대한 데이터 유형을 선택합니다. 배열 필드의 요소는 모두 동일한 데이터 유형을 가져야 합니다. 이 예에서는 <code translate="no">element_type</code> 을 <code translate="no">DataType.INT64</code> 으로 설정합니다.</li>
<li><code translate="no">max_capacity</code>: 이 매개변수를 설정하여 배열 필드에 포함할 수 있는 최대 요소 수를 지정합니다.</li>
</ol>
</div>
<div class="language-java">
<ol>
<li><code translate="no">dataType</code>: 를 <code translate="no">DataType.Array</code> 으로 설정합니다.</li>
<li><code translate="no">elementType</code>: 배열의 요소에 대한 데이터 유형을 선택합니다. 배열 필드의 요소는 모두 동일한 데이터 유형을 가져야 합니다. 이 예에서는 <code translate="no">elementType</code> 을 <code translate="no">DataType.Int64</code> 으로 설정합니다.</li>
<li><code translate="no">maxCapacity</code>: 이 매개변수를 설정하여 배열 필드에 포함할 수 있는 최대 요소 수를 지정합니다.</li>
</ol>
</div>
<div class="language-javascript">
<ol>
<li><code translate="no">data_type</code>: 를 <code translate="no">DataType.Array</code> 으로 설정합니다.</li>
<li><code translate="no">element_type</code>: 배열의 요소에 대한 데이터 유형을 선택합니다. 배열 필드의 요소는 모두 동일한 데이터 유형을 가져야 합니다. 이 예에서는 <code translate="no">element_type</code> 을 <code translate="no">DataType.Int64</code> 으로 설정합니다.</li>
<li><code translate="no">max_capacity</code>: 배열 필드에 포함할 수 있는 최대 요소 수를 지정하려면 이 매개변수를 설정합니다.</li>
</ol>
</div>
<p>아래 예제 코드는 최대 5개의 요소와 각 요소가 정수 데이터 유형인 배열 필드 <code translate="no">color_coord</code> 로 컬렉션 스키마를 정의합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;color&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;color_tag&quot;</span>, datatype=DataType.INT64)
schema.add_field(field_name=<span class="hljs-string">&quot;color_coord&quot;</span>, datatype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=<span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// Add fields to schema</span>
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
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;color_tag&quot;</span>)
        .dataType(DataType.Int64)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;color_coord&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.Int64)
        .maxCapacity(<span class="hljs-number">5</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> fields = [
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
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;color_tag&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;color_coord&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,
        <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>
    }
];
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>메서드 및 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md">create_schema</a> 및 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md">add_field를</a> 참조하세요.</p>
</div>
<div class="language-java">
<p>메서드 및 매개 변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md">createSchema</a> 및 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md">addField를</a> 참조하세요.</p>
</div>
<div class="language-javascript">
<p>메서드 및 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md">createCollection을</a> 참조하세요.</p>
</div>
<h3 id="Create-the-collection" class="common-anchor-header">컬렉션 만들기<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>그런 다음 정의된 스키마를 사용하여 컬렉션을 만듭니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.create_collection(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema)
client.list_collections()

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [&#x27;test_collection&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
    .collectionSchema(schema)
    .build();

client.createCollection(customizedSetupReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">fields</span>: fields
});

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listCollections</span>({<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Existing collections: &quot;</span> + res.<span class="hljs-property">collection_names</span>);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Existing collections: test_collection</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>메서드 및 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection</a> 및 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_collections를</a> 참조하세요.</p>
</div>
<div class="language-java">
<p>메서드 및 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md">createCollection을</a> 참조하세요.</p>
</div>
<div class="language-javascript">
<p>메서드 및 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md">createCollection</a> 및 <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/listCollections.md">listCollections를</a> 참조하세요.</p>
</div>
<h2 id="Create-indexes" class="common-anchor-header">인덱스 만들기<button data-href="#Create-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스는 검색 및 쿼리 작업의 성능을 향상시킵니다. Milvus에서는 벡터 필드와 스칼라 필드 모두에 인덱스를 생성할 수 있습니다. 이 예제에서는 벡터 필드 <code translate="no">vector</code> 에 <code translate="no">IVF_FLAT</code> 인덱스를 만들고 배열 필드 <code translate="no">color_coord</code> 에 <code translate="no">INVERTED</code> 인덱스를 만들겠습니다. 인덱스에 대한 자세한 내용은 인덱스 <a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">벡터 필드</a> 및 <a href="https://milvus.io/docs/index-scalar-fields.md">인덱스 스칼라 필드를</a> 참조하세요.</p>
<h3 id="Index-vector-field" class="common-anchor-header">인덱스 벡터 필드<button data-href="#Index-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>벡터 필드에 인덱스를 생성하면 각 검색 작업에 필요한 벡터 유사도 검색의 성능을 향상시킬 수 있습니다.</p>
<p>아래 예는 벡터 필드 <code translate="no">vector</code> 에 <code translate="no">IVF_FLAT</code> 유형의 인덱스를 생성합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>}
)

client.create_index(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, index_params=index_params)
client.describe_index(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, index_name=<span class="hljs-string">&quot;vector_index&quot;</span>)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {&#x27;nlist&#x27;: &#x27;128&#x27;,</span>
<span class="hljs-comment">#  &#x27;index_type&#x27;: &#x27;IVF_FLAT&#x27;,</span>
<span class="hljs-comment">#  &#x27;metric_type&#x27;: &#x27;COSINE&#x27;,</span>
<span class="hljs-comment">#  &#x27;field_name&#x27;: &#x27;vector&#x27;,</span>
<span class="hljs-comment">#  &#x27;index_name&#x27;: &#x27;vector_index&#x27;}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .metricType(IndexParam.MetricType.COSINE)
        .indexType(IndexParam.IndexType.IVF_FLAT)
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
        .build();
<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .indexParams(Collections.singletonList(indexParam))
        .build();
client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,   
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
});

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Vector index description: &quot;</span> + <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Vector index description: {&quot;index_descriptions&quot;:[{&quot;params&quot;:[{&quot;key&quot;:&quot;params&quot;,&quot;value&quot;:&quot;{\&quot;nlist\&quot;:128}&quot;},{&quot;key&quot;:&quot;index_type&quot;,&quot;value&quot;:&quot;IVF_FLAT&quot;},{&quot;key&quot;:&quot;metric_type&quot;,&quot;value&quot;:&quot;COSINE&quot;}],&quot;index_name&quot;:&quot;vector_index&quot;,&quot;indexID&quot;:&quot;451543183233666062&quot;,&quot;field_name&quot;:&quot;vector&quot;,&quot;indexed_rows&quot;:&quot;0&quot;,&quot;total_rows&quot;:&quot;0&quot;,&quot;state&quot;:&quot;Finished&quot;,&quot;index_state_fail_reason&quot;:&quot;&quot;,&quot;pending_index_rows&quot;:&quot;0&quot;}],&quot;status&quot;:{&quot;extra_info&quot;:{},&quot;error_code&quot;:&quot;Success&quot;,&quot;reason&quot;:&quot;&quot;,&quot;code&quot;:0,&quot;retriable&quot;:false,&quot;detail&quot;:&quot;&quot;}}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>메서드 및 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md">prepare_index_params</a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index</a> 및 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_index를</a> 참조하세요.</p>
</div>
<div class="language-java">
<p>메서드 및 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParam</a> 및 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/createIndex.md">createIndex를</a> 참조하세요.</p>
</div>
<div class="language-javascript">
<p>메서드 및 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md">createIndex</a> 및 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/describeIndex.md">describeIndex를</a> 참조하세요.</p>
</div>
<h3 id="Index-array-field" class="common-anchor-header">인덱스 배열 필드<button data-href="#Index-array-field" class="anchor-icon" translate="no">
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
    </button></h3><p>스칼라 필드에 인덱스를 만들면 해당 필드에 대한 쿼리의 검색 성능을 향상시킬 수 있으며, 이는 선택 사항이지만 대규모 데이터 세트에 권장됩니다.</p>
<p>이 예에서는 <code translate="no">color_coord</code> 배열 필드에 반전된 인덱스를 만들겠습니다. 이렇게 하면 이 필드를 기반으로 필터링 속도를 높일 수 있습니다. 반전 인덱스는 데이터를 자주 검색하지 않는 경우 원시 데이터를 사용하는 무차별 필터링보다 훨씬 뛰어난 성능을 보여주며, 자주 검색하는 작업에서도 비슷한 성능을 유지하는 등 전반적으로 우수한 성능을 보여줍니다. 역 인덱스에 대한 자세한 내용은 <a href="/docs/ko/scalar_index.md#Inverted-indexing">스칼라 인덱스를</a> 참조하세요.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;color_coord&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span>
)

client.create_index(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, index_params=index_params)
client.describe_index(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, index_name=<span class="hljs-string">&quot;inverted_index&quot;</span>)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {&#x27;index_type&#x27;: &#x27;INVERTED&#x27;,</span>
<span class="hljs-comment">#  &#x27;field_name&#x27;: &#x27;color_coord&#x27;,</span>
<span class="hljs-comment">#  &#x27;index_name&#x27;: &#x27;inverted_index&#x27;}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">indexParam = IndexParam.builder()
        .indexType(IndexParam.IndexType.INVERTED)
        .fieldName(<span class="hljs-string">&quot;color_coord&quot;</span>)
        .indexName(<span class="hljs-string">&quot;inverted_index&quot;</span>)
        .build();
createIndexReq = CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .indexParams(Collections.singletonList(indexParam))
        .build();
client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;color_coord&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>
});

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Array index description: &quot;</span> + <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Array index description: {&quot;index_descriptions&quot;:[{&quot;params&quot;:[{&quot;key&quot;:&quot;index_type&quot;,&quot;value&quot;:&quot;INVERTED&quot;}],&quot;index_name&quot;:&quot;inverted_index&quot;,&quot;indexID&quot;:&quot;451543183233667243&quot;,&quot;field_name&quot;:&quot;color_coord&quot;,&quot;indexed_rows&quot;:&quot;0&quot;,&quot;total_rows&quot;:&quot;0&quot;,&quot;state&quot;:&quot;Finished&quot;,&quot;index_state_fail_reason&quot;:&quot;&quot;,&quot;pending_index_rows&quot;:&quot;0&quot;}],&quot;status&quot;:{&quot;extra_info&quot;:{},&quot;error_code&quot;:&quot;Success&quot;,&quot;reason&quot;:&quot;&quot;,&quot;code&quot;:0,&quot;retriable&quot;:false,&quot;detail&quot;:&quot;&quot;}}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>메서드 및 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md">prepare_index_params</a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index</a> 및 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_index를</a> 참조하세요.</p>
</div>
<div class="language-java">
<p>메서드 및 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParam</a> 및 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/createIndex.md">createIndex를</a> 참조하세요.</p>
</div>
<div class="language-javascript">
<p>메서드 및 매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md">createIndex</a> 및 <a href="https://milvus.io/api-reference/node/v2.4.x/Management/describeIndex.md">describeIndex를</a> 참조하세요.</p>
</div>
<h2 id="Insert-data" class="common-anchor-header">데이터 삽입<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션과 인덱스가 생성되면 컬렉션에 데이터를 삽입할 수 있습니다. 이 단계에서는 <code translate="no">test_collection</code> 에 1,000개의 엔티티를 삽입합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">res = client.insert(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {&#x27;insert_count&#x27;: 1000, &#x27;ids&#x27;: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 999], &#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
    .data(data)
    .build();

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Inserted <span class="hljs-subst">${res.insert_cnt}</span> entities`</span>);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Inserted 1000 entities</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-the-collection" class="common-anchor-header">컬렉션 로드<button data-href="#Load-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>데이터를 삽입한 후에는 검색 및 쿼리 작업에 사용할 수 있도록 컬렉션을 로드해야 합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.load_collection(<span class="hljs-string">&#x27;test_collection&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">LoadCollectionReq</span> <span class="hljs-variable">loadCollectionReq</span> <span class="hljs-operator">=</span> LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .build();
client.loadCollection(loadCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>
});

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Collection load state: &quot;</span> + res.<span class="hljs-property">state</span>);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Collection load state: LoadStateLoaded</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Basic-scalar-filtering" class="common-anchor-header">기본 스칼라 필터링<button data-href="#Basic-scalar-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>모든 데이터를 추가한 후에는 표준 스칼라 필드와 동일한 방식으로 배열 필드의 요소를 사용하여 검색 및 쿼리를 수행할 수 있습니다.</p>
<div class="language-python">
<p>매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> 를 참조하세요.</p>
</div>
<div class="language-java">
<p>매개변수에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/search.md"><code translate="no">search()</code></a> 를 참조하세요.</p>
</div>
<div class="language-javascript">
<p>파라미터에 대한 자세한 내용은 <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/search.md"><code translate="no">search()</code></a> 를 참조하세요.</p>
</div>
<div class="multipleCode">
   <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Basic search with the array field</span>
query_vectors = [ [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]]

res = client.search(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    data=query_vectors,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color_coord[0] &lt; 10&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">16</span>}
    },
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 918, &#x27;distance&#x27;: 0.974249541759491, &#x27;entity&#x27;: {&#x27;color_coord&#x27;: [4, 34, 9, 18, 29], &#x27;id&#x27;: 918, &#x27;color&#x27;: &#x27;purple&#x27;, &#x27;color_tag&#x27;: 2940}}, {&#x27;id&#x27;: 822, &#x27;distance&#x27;: 0.9177230000495911, &#x27;entity&#x27;: {&#x27;color_coord&#x27;: [7, 36, 32], &#x27;id&#x27;: 822, &#x27;color&#x27;: &#x27;red&#x27;, &#x27;color_tag&#x27;: 8519}}, {&#x27;id&#x27;: 981, &#x27;distance&#x27;: 0.9116519689559937, &#x27;entity&#x27;: {&#x27;color_coord&#x27;: [7, 16, 40, 32, 32], &#x27;id&#x27;: 981, &#x27;color&#x27;: &#x27;pink&#x27;, &#x27;color_tag&#x27;: 2992}}]&quot;] , extra_info: {&#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 4. Basic search with an Array field</span>
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;color_coord[0] in [7, 8, 9]&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>))
        .limit(<span class="hljs-number">3L</span>)
        .build();

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(queryReq);

System.out.println(queryResp.getQueryResults());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=black, color_tag=6107, id=8, color_coord=[8, 19, 31, 10]}), </span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=blue, color_tag=3252, id=11, color_coord=[7, 16, 1]}),</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=blue, color_tag=3069, id=16, color_coord=[9, 16, 19]})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vectors = [<span class="hljs-title class_">Array</span>(<span class="hljs-number">5</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>())];

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vectors,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;color_coord[0] &lt; 10&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Search result: &quot;</span> + <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Search result: [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 0.9969238042831421,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;212&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;green&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;5603&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;9&quot;,</span>
<span class="hljs-comment">//             &quot;14&quot;,</span>
<span class="hljs-comment">//             &quot;22&quot;,</span>
<span class="hljs-comment">//             &quot;4&quot;,</span>
<span class="hljs-comment">//             &quot;35&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 0.9952742457389832,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;339&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;yellow&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;8867&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;8&quot;,</span>
<span class="hljs-comment">//             &quot;0&quot;,</span>
<span class="hljs-comment">//             &quot;6&quot;,</span>
<span class="hljs-comment">//             &quot;19&quot;,</span>
<span class="hljs-comment">//             &quot;23&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 0.9944050312042236,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;24&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;7686&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;6&quot;,</span>
<span class="hljs-comment">//             &quot;17&quot;,</span>
<span class="hljs-comment">//             &quot;6&quot;,</span>
<span class="hljs-comment">//             &quot;32&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Advanced-filtering" class="common-anchor-header">고급 필터링<button data-href="#Advanced-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스는 JSON 필드에 있는 것과 마찬가지로 배열에 대한 고급 필터링 연산자( <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_LENGTH</code> 등)도 제공합니다. 연산자에 대한 자세한 내용은 <a href="#reference-on-array-filters">배열 필터에 대한 참조를 참조</a>하세요.</p>
<ul>
<li><p><code translate="no">color_coord</code> 값에 <code translate="no">10</code> 가 포함된 모든 엔티티를 필터링합니다.</p>
<p><div class="multipleCode">
<a href="#python">파이썬 </a><a href="#java">자바</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Advanced query within the array field</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(color_coord, 10)&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [&quot;{&#x27;id&#x27;: 2, &#x27;color&#x27;: &#x27;green&#x27;, &#x27;color_tag&#x27;: 3676, &#x27;color_coord&#x27;: [26, 37, 30, 10]}&quot;, &quot;{&#x27;id&#x27;: 28, &#x27;color&#x27;: &#x27;red&#x27;, &#x27;color_tag&#x27;: 4735, &#x27;color_coord&#x27;: [30, 10, 40, 34]}&quot;, &quot;{&#x27;id&#x27;: 32, &#x27;color&#x27;: &#x27;green&#x27;, &#x27;color_tag&#x27;: 8816, &#x27;color_coord&#x27;: [10, 9, 24, 39]}&quot;] , extra_info: {&#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 5. Advanced query within an Array field</span>
queryReq = QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;ARRAY_CONTAINS(color_coord, 10)&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .build();

queryResp = client.query(queryReq);

System.out.println(queryResp.getQueryResults());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={color=black, color_tag=6107, id=8, color_coord=[8, 19, 31, 10]}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={color=brown, color_tag=7727, id=17, color_coord=[1, 10, 16, 29]}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={color=orange, color_tag=8128, id=26, color_coord=[10, 16, 3, 3]})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Advanced search within the array field</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vectors,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;ARRAY_CONTAINS(color_coord, 10)&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.7962548732757568,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;696&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;1798&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;33&quot;,</span>
<span class="hljs-comment">//             &quot;10&quot;,</span>
<span class="hljs-comment">//             &quot;37&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.7126177549362183,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;770&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;1962&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;21&quot;,</span>
<span class="hljs-comment">//             &quot;23&quot;,</span>
<span class="hljs-comment">//             &quot;10&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.6707111597061157,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;981&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;yellow&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;3100&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;28&quot;,</span>
<span class="hljs-comment">//             &quot;39&quot;,</span>
<span class="hljs-comment">//             &quot;10&quot;,</span>
<span class="hljs-comment">//             &quot;6&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">color_coord</code> 값에 <code translate="no">7</code> 및 <code translate="no">8</code> 이 있는 모든 엔티티를 필터링합니다.</p>
<p><div class="multipleCode">
<a href="#python">파이썬 </a><a href="#java">자바</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(color_coord, [7, 8])&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [&quot;{&#x27;id&#x27;: 147, &#x27;color&#x27;: &#x27;brown&#x27;, &#x27;color_tag&#x27;: 1287, &#x27;color_coord&#x27;: [7, 8, 11, 0]}&quot;, &quot;{&#x27;id&#x27;: 257, &#x27;color&#x27;: &#x27;white&#x27;, &#x27;color_tag&#x27;: 3641, &#x27;color_coord&#x27;: [2, 8, 31, 7]}&quot;, &quot;{&#x27;id&#x27;: 280, &#x27;color&#x27;: &#x27;orange&#x27;, &#x27;color_tag&#x27;: 1072, &#x27;color_coord&#x27;: [22, 7, 8]}&quot;] , extra_info: {&#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(color_coord, [7, 8])&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .build();

queryResp = client.query(queryReq);

System.out.println(queryResp.getQueryResults());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=blue, color_tag=6939, id=246, color_coord=[1, 8, 27, 7]}), </span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=brown, color_tag=6341, id=673, color_coord=[8, 7, 33, 20, 11]})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vectors,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(color_coord, [7, 8])&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 0.8267516493797302,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;913&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;brown&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;8897&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;39&quot;,</span>
<span class="hljs-comment">//             &quot;31&quot;,</span>
<span class="hljs-comment">//             &quot;8&quot;,</span>
<span class="hljs-comment">//             &quot;29&quot;,</span>
<span class="hljs-comment">//             &quot;7&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 0.6889009475708008,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;826&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;blue&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;4903&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;7&quot;,</span>
<span class="hljs-comment">//             &quot;25&quot;,</span>
<span class="hljs-comment">//             &quot;5&quot;,</span>
<span class="hljs-comment">//             &quot;12&quot;,</span>
<span class="hljs-comment">//             &quot;8&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 0.5851659774780273,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;167&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;blue&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;1550&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;8&quot;,</span>
<span class="hljs-comment">//             &quot;27&quot;,</span>
<span class="hljs-comment">//             &quot;7&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">color_coord</code> 값에 7, 8 또는 9가 포함된 모든 엔티티를 필터링합니다.</p>
<p><div class="multipleCode">
<a href="#python">파이썬 </a><a href="#java">자바</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [&quot;{&#x27;id&#x27;: 0, &#x27;color&#x27;: &#x27;white&#x27;, &#x27;color_tag&#x27;: 2081, &#x27;color_coord&#x27;: [16, 7, 35, 5, 25]}&quot;, &quot;{&#x27;id&#x27;: 1, &#x27;color&#x27;: &#x27;purple&#x27;, &#x27;color_tag&#x27;: 4669, &#x27;color_coord&#x27;: [11, 9, 15, 38, 21]}&quot;, &quot;{&#x27;id&#x27;: 3, &#x27;color&#x27;: &#x27;yellow&#x27;, &#x27;color_tag&#x27;: 2612, &#x27;color_coord&#x27;: [0, 12, 22, 7]}&quot;] , extra_info: {&#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .build();

queryResp = client.query(queryReq);

System.out.println(queryResp.getQueryResults());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=purple, color_tag=3687, id=1, color_coord=[22, 7, 29, 25]}), </span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=black, color_tag=6107, id=8, color_coord=[8, 19, 31, 10]}), </span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=blue, color_tag=3252, id=11, color_coord=[7, 16, 1]})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vectors,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 2.015894889831543,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;260&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;green&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;5320&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;1&quot;,</span>
<span class="hljs-comment">//             &quot;7&quot;,</span>
<span class="hljs-comment">//             &quot;33&quot;,</span>
<span class="hljs-comment">//             &quot;13&quot;,</span>
<span class="hljs-comment">//             &quot;23&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.783075213432312,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;593&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;orange&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;4079&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;8&quot;,</span>
<span class="hljs-comment">//             &quot;19&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.7713876962661743,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;874&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;blue&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;7029&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;14&quot;,</span>
<span class="hljs-comment">//             &quot;8&quot;,</span>
<span class="hljs-comment">//             &quot;15&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>정확히 4개의 요소를 가진 엔티티를 필터링합니다.</p>
<p><div class="multipleCode">
<a href="#python">파이썬 </a><a href="#java">자바</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(color_coord) == 4&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [&quot;{&#x27;id&#x27;: 2, &#x27;color&#x27;: &#x27;green&#x27;, &#x27;color_tag&#x27;: 3676, &#x27;color_coord&#x27;: [26, 37, 30, 10]}&quot;, &quot;{&#x27;id&#x27;: 3, &#x27;color&#x27;: &#x27;yellow&#x27;, &#x27;color_tag&#x27;: 2612, &#x27;color_coord&#x27;: [0, 12, 22, 7]}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;color&#x27;: &#x27;green&#x27;, &#x27;color_tag&#x27;: 6912, &#x27;color_coord&#x27;: [4, 5, 19, 28]}&quot;] , extra_info: {&#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;ARRAY_LENGTH(color_coord) == 4&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .build();

queryResp = client.query(queryReq);

System.out.println(queryResp.getQueryResults()); 

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=purple, color_tag=3687, id=1, color_coord=[22, 7, 29, 25]}),</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=yellow, color_tag=1990, id=3, color_coord=[26, 20, 15, 26]}),</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=purple, color_tag=3199, id=4, color_coord=[13, 19, 21, 30]})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
<span class="hljs-attr">data</span>: query_vectors,
<span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;ARRAY_LENGTH(color_coord) == 4&quot;</span>,
<span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
<span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 2.0404388904571533,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;439&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;orange&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;7096&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;27&quot;,</span>
<span class="hljs-comment">//             &quot;34&quot;,</span>
<span class="hljs-comment">//             &quot;26&quot;,</span>
<span class="hljs-comment">//             &quot;39&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.9059759378433228,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;918&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;purple&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;2903&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;28&quot;,</span>
<span class="hljs-comment">//             &quot;19&quot;,</span>
<span class="hljs-comment">//             &quot;36&quot;,</span>
<span class="hljs-comment">//             &quot;35&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.8385567665100098,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;92&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;yellow&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;4693&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;1&quot;,</span>
<span class="hljs-comment">//             &quot;23&quot;,</span>
<span class="hljs-comment">//             &quot;2&quot;,</span>
<span class="hljs-comment">//             &quot;3&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Limits" class="common-anchor-header">제한<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>ARRAY 필드의 요소는 <code translate="no">element_type</code> 에 지정된 것과 동일한 데이터 유형이어야 합니다. Milvus에서 스칼라 필드에 사용할 수 있는 유효한 데이터 유형은 <code translate="no">element_type</code> 으로 사용할 수 있습니다. 지원되는 데이터 유형 목록은 <a href="https://milvus.io/docs/schema.md#Supported-data-types">지원되는 데이터 유형을</a> 참조하세요.</p></li>
<li><p>배열 필드의 요소 수는 <code translate="no">max_capacity</code> 에 지정된 배열 필드의 최대 용량보다 작거나 같아야 합니다.</p></li>
</ul>
<h2 id="Reference-on-array-filters" class="common-anchor-header">배열 필터에 대한 참조<button data-href="#Reference-on-array-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>배열 필드로 작업할 때 문자열 값을 큰따옴표("") 또는 작은따옴표('')로 묶을 수 있습니다. 한 가지 중요한 점은 Milvus는 의미 이스케이프나 변환을 수행하지 않고 배열 필드에 문자열 값을 그대로 저장한다는 점입니다. 예를 들어 <strong>'a"b', '</strong> <strong>a'b',</strong> <strong>'a'b</strong>', <strong>'a"b'</strong> 는 그대로 저장되지만 <strong>'a'b'</strong> 와 <strong>'a"b'</strong> 는 유효하지 않은 값으로 처리됩니다.</p>
<p><code translate="no">int_array</code> 및 <code translate="no">var_array</code> 두 개의 배열 필드가 정의되었다고 가정합니다. 다음 표에서는 배열 필드로 검색할 때 <code translate="no">expr</code> 에서 사용할 수 있는 지원되는 부울 표현식에 대해 설명합니다.</p>
<table>
<thead>
<tr><th>연산자</th><th>예제</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td><code translate="no">‘int_array[0] < 3’</code></td><td>이 표현식은 <code translate="no">int_array[0]</code> 값이 3보다 작으면 참으로 평가됩니다.</td></tr>
<tr><td>&gt;</td><td><code translate="no">‘int_array[0] > 5’</code></td><td>이 표현식은 <code translate="no">int_array[0]</code> 값이 5보다 크면 참으로 평가됩니다.</td></tr>
<tr><td>==</td><td><code translate="no">‘int_array[0] == 0’</code></td><td>이 표현식은 <code translate="no">int_array[0]</code> 값이 0이면 참으로 평가됩니다.</td></tr>
<tr><td>!=</td><td><code translate="no">‘var_array[0] != "a"’</code></td><td>이 표현식은 <code translate="no">var_array[0]</code> 의 값이 <code translate="no">“a”</code> 과 같지 않으면 참으로 평가됩니다.</td></tr>
<tr><td>&lt;=</td><td><code translate="no">‘int_array[0] <= 3’</code></td><td>이 표현식은 <code translate="no">int_array[0]</code> 값이 3보다 작거나 같으면 참으로 평가됩니다.</td></tr>
<tr><td>&gt;=</td><td><code translate="no">‘int_array[0] >= 10’</code></td><td>이 표현식은 <code translate="no">int_array[0]</code> 값이 10보다 크거나 같으면 참으로 평가됩니다.</td></tr>
<tr><td>in</td><td><code translate="no">'var_array[0] in ["str1", “str2”]'</code></td><td>이 표현식은 <code translate="no">var_array[0]</code> 값이 <code translate="no">“str1”</code> 또는 <code translate="no">“str2”</code> 인 경우 true로 평가됩니다.</td></tr>
<tr><td>not in</td><td><code translate="no">'int_array[0] not in [1, 2, 3]'</code></td><td><code translate="no">int_array[0]</code> 값이 1, 2 또는 3이 아닌 경우 이 표현식은 참으로 평가됩니다.</td></tr>
<tr><td>+, -, *, /, %, **</td><td><code translate="no">‘int_array[0] + 100 > 200’</code></td><td>이 표현식은 <code translate="no">int_array[0] + 100</code> 값이 200보다 크면 참으로 평가됩니다.</td></tr>
<tr><td>좋아요(LIKE)</td><td><code translate="no">‘var_array[0] like "prefix%"’</code></td><td><code translate="no">var_array[0]</code> 값 앞에 <code translate="no">“prefix”</code> 이 붙으면 이 표현식은 참으로 평가됩니다.</td></tr>
<tr><td>및 (&amp;&amp;)</td><td><code translate="no">‘var_array[0] like “prefix%” && int_array[0] <= 100’</code></td><td><code translate="no">var_array[0]</code> 값 앞에 <code translate="no">“prefix”</code> 이 붙고 <code translate="no">int_array[0]</code> 값이 100보다 작거나 같으면 이 표현식은 참으로 평가됩니다.</td></tr>
<tr><td>또는 (||)</td><td><code translate="no">‘var_array[0] like “prefix%” || int_array[0] <= 100’</code></td><td><code translate="no">var_array[0]</code> 값 앞에 <code translate="no">“prefix”</code> 이 붙거나 <code translate="no">int_array[0]</code> 값이 100보다 작거나 같으면 이 표현식은 참으로 평가됩니다.</td></tr>
<tr><td>array_contains (배열 포함)</td><td><code translate="no">'array_contains(int_array, 100)'</code></td><td><code translate="no">int_array</code> 에 <code translate="no">100</code> 요소가 포함되어 있으면 이 표현식은 참으로 평가됩니다.</td></tr>
<tr><td>array_contains_all (ARRAY_CONTAINS_ALL)</td><td><code translate="no">'array_contains_all(int_array, [1, 2, 3])'</code></td><td><code translate="no">int_array</code> 에 <code translate="no">1</code>, <code translate="no">2</code>, <code translate="no">3</code> 요소가 모두 포함되어 있으면 이 표현식은 true로 평가됩니다.</td></tr>
<tr><td>array_contains_any (ARRAY_CONTAINS_ANY)</td><td><code translate="no">'array_contains_any(var_array, ["a", "b", “c”])'</code></td><td><code translate="no">var_array</code> 에 <code translate="no">“a”</code>, <code translate="no">“b”</code>, <code translate="no">“c”</code> 의 요소가 하나라도 포함되어 있으면 이 표현식은 참으로 평가됩니다.</td></tr>
<tr><td>array_length</td><td><code translate="no">‘array_length(int_array) == 10’</code></td><td><code translate="no">int_array</code> 에 정확히 10 개의 요소가 포함되어 있으면 이 표현식은 참으로 평가됩니다.</td></tr>
</tbody>
</table>
