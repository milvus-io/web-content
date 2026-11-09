---
id: random-sampling.md
title: 무작위 표본 추출Compatible with Milvus 2.6.x
summary: >-
  대규모 데이터셋을 다룰 때, 통찰력을 얻거나 필터링 로직을 테스트하기 위해 모든 데이터를 처리할 필요는 없는 경우가 많습니다. 무작위 표본
  추출은 데이터의 통계적으로 대표성 있는 부분 집합을 활용하여 작업할 수 있게 함으로써, 쿼리 시간과 리소스 소비를 크게 줄여주는 해결책을
  제공합니다.
beta: Milvus 2.6.x
---
<h1 id="Random-Sampling" class="common-anchor-header">무작위 표본 추출<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Random-Sampling" class="anchor-icon" translate="no">
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
    </button></h1><p>대규모 데이터셋을 다룰 때, 통찰력을 얻거나 필터링 로직을 테스트하기 위해 모든 데이터를 처리할 필요는 없는 경우가 많습니다. 무작위 표본 추출은 데이터의 통계적으로 대표성 있는 부분 집합을 활용하여 쿼리 시간과 리소스 소비를 대폭 줄여주는 해결책을 제공합니다.</p>
<p>무작위 표본 추출은 세그먼트 수준에서 수행되어, 컬렉션의 데이터 분포 전반에 걸쳐 표본의 무작위성을 유지하면서도 효율적인 성능을 보장합니다.</p>
<p><strong>주요 사용 사례:</strong></p>
<ul>
<li><p><strong>데이터 탐색</strong>: 최소한의 리소스 사용으로 컬렉션 구조와 내용을 빠르게 미리 확인</p></li>
<li><p><strong>개발 테스트</strong>: 본격적인 배포 전에 관리 가능한 데이터 샘플을 대상으로 복잡한 필터링 로직을 테스트</p></li>
<li><p><strong>리소스 최적화</strong>: 탐색적 쿼리 및 통계 분석에 드는 계산 비용을 절감</p></li>
</ul>
<h2 id="Syntax" class="common-anchor-header">구문<button data-href="#Syntax" class="anchor-icon" translate="no">
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
    </button></h2><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;RANDOM_SAMPLE(sampling_factor)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;RANDOM_SAMPLE(sampling_factor)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;RANDOM_SAMPLE(sampling_factor)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;RANDOM_SAMPLE(sampling_factor)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> filter = <span class="hljs-string">&quot;RANDOM_SAMPLE(sampling_factor)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;RANDOM_SAMPLE(sampling_factor)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;RANDOM_SAMPLE(sampling_factor)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> filterRandomSample=<span class="hljs-string">&#x27;RANDOM_SAMPLE(sampling_factor)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>매개변수:</strong></p>
<ul>
<li><code translate="no">sampling_factor</code>: 경계값을 제외한 (0, 1) 범위의 표본 추출 계수입니다. 예를 들어, ` <code translate="no">RANDOM_SAMPLE(0.001)</code> `는 결과의 약 0.1%를 선택합니다.</li>
</ul>
<p><strong>중요한 규칙:</strong></p>
<ul>
<li><p>이 표현식은 대소문자를 구분하지 않습니다(<code translate="no">RANDOM_SAMPLE</code> 또는 <code translate="no">random_sample</code>).</p></li>
<li><p>표본 추출 비율은 경계값을 제외한 (0, 1) 범위 내에 있어야 합니다</p></li>
</ul>
<h2 id="Combine-with-other-filters" class="common-anchor-header">다른 필터와 결합하기<button data-href="#Combine-with-other-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>무작위 표본 추출 연산자는 논리 연산자 <code translate="no">AND</code> 를 사용하여 다른 필터링 표현식과 결합해야 합니다. 필터를 결합할 때 Milvus는 먼저 다른 조건을 적용한 다음, 결과 집합에 대해 무작위 표본 추출을 수행합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct: Filter first, then sample</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; AND RANDOM_SAMPLE(0.001)&#x27;</span>
<span class="hljs-comment"># Processing: Find all red items → Sample 0.1% of those red items</span>

<span class="hljs-comment"># Incorrect: OR doesn&#x27;t make logical sense</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR RANDOM_SAMPLE(0.001)&#x27;</span>  <span class="hljs-comment"># ❌ Invalid logic</span>
<span class="hljs-comment"># This would mean: &quot;Either red items OR sample everything&quot; - which is meaningless</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Correct: Filter first, then sample</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;color == \&quot;red\&quot; AND RANDOM_SAMPLE(0.001)&quot;</span>;
<span class="hljs-comment">// Processing: Find all red items → Sample 0.1% of those red items</span>

<span class="hljs-comment">// Incorrect: OR doesn&#x27;t make logical sense</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filterIncorrect</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;color == \&quot;red\&quot; OR RANDOM_SAMPLE(0.001)&quot;</span>;  <span class="hljs-comment">// ❌ Invalid logic</span>
<span class="hljs-comment">// This would mean: &quot;Either red items OR sample everything&quot; - which is meaningless</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Correct: Filter first, then sample</span>
filter := <span class="hljs-string">&quot;color == \&quot;red\&quot; AND RANDOM_SAMPLE(0.001)&quot;</span>
<span class="hljs-comment">// Processing: Find all red items → Sample 0.1% of those red items</span>

filter = <span class="hljs-string">&quot;color == \&quot;red\&quot; OR RANDOM_SAMPLE(0.001)&quot;</span> <span class="hljs-comment">// ❌ Invalid logic</span>
<span class="hljs-comment">// This would mean: &quot;Either red items OR sample everything&quot; - which is meaningless</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Correct: Filter first, then sample</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_correct</span> = <span class="hljs-string">r#&quot;color == &quot;red&quot; AND RANDOM_SAMPLE(0.001)&quot;#</span>;
<span class="hljs-comment">// Processing: Find all red items → Sample 0.1% of those red items</span>

<span class="hljs-comment">// Incorrect: OR doesn&#x27;t make logical sense</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_incorrect</span> = <span class="hljs-string">r#&quot;color == &quot;red&quot; OR RANDOM_SAMPLE(0.001)&quot;#</span>;  <span class="hljs-comment">// ❌ Invalid logic</span>
<span class="hljs-comment">// This would mean: &quot;Either red items OR sample everything&quot; - which is meaningless</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> filter_sample_correct = <span class="hljs-string">R&quot;(color == &quot;red&quot; AND RANDOM_SAMPLE(0.001))&quot;</span>;
<span class="hljs-keyword">auto</span> filter_sample_incorrect = <span class="hljs-string">R&quot;(color == &quot;red&quot; OR RANDOM_SAMPLE(0.001))&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Correct: Filter first, then sample</span>
<span class="hljs-keyword">const</span> filterCorrect = <span class="hljs-string">&#x27;color == &quot;red&quot; AND RANDOM_SAMPLE(0.001)&#x27;</span>;
<span class="hljs-comment">// Processing: Find all red items → Sample 0.1% of those red items</span>

<span class="hljs-comment">// Incorrect: OR doesn&#x27;t make logical sense</span>
<span class="hljs-keyword">const</span> filterIncorrect = <span class="hljs-string">&#x27;color == &quot;red&quot; OR RANDOM_SAMPLE(0.001)&#x27;</span>;  <span class="hljs-comment">// ❌ Invalid logic</span>
<span class="hljs-comment">// This would mean: &quot;Either red items OR sample everything&quot; - which is meaningless</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Correct: Filter first, then sample</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;color == \&quot;red\&quot; AND RANDOM_SAMPLE(0.001)&quot;</span>;
<span class="hljs-comment">// Processing: Find all red items → Sample 0.1% of those red items</span>

<span class="hljs-comment">// Incorrect: OR doesn&#x27;t make logical sense</span>
<span class="hljs-built_in">string</span> filterIncorrect = <span class="hljs-string">&quot;color == \&quot;red\&quot; OR RANDOM_SAMPLE(0.001)&quot;</span>; <span class="hljs-comment">// ❌ Invalid logic</span>
<span class="hljs-comment">// This would mean: &quot;Either red items OR sample everything&quot; - which is meaningless</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-comment"># Correct: Filter first, then sample</span>
<span class="hljs-built_in">export</span> filterSampleCorrect=<span class="hljs-string">&#x27;color == &quot;red&quot; AND RANDOM_SAMPLE(0.001)&#x27;</span>
<span class="hljs-comment"># Processing: Find all red items → Sample 0.1% of those red items</span>

<span class="hljs-comment"># Incorrect: OR doesn&#x27;t make logical sense</span>
<span class="hljs-built_in">export</span> filterSampleIncorrect=<span class="hljs-string">&#x27;color == &quot;red&quot; OR RANDOM_SAMPLE(0.001)&#x27;</span>  <span class="hljs-comment"># ❌ Invalid logic</span>
<span class="hljs-comment"># This would mean: &quot;Either red items OR sample everything&quot; - which is meaningless</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">예제<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Example-1-Data-exploration" class="common-anchor-header">예제 1: 데이터 탐색<button data-href="#Example-1-Data-exploration" class="anchor-icon" translate="no">
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
    </button></h3><p>컬렉션 구조를 빠르게 미리 살펴보세요:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Sample approximately 1% of the entire collection</span>
result = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;product_name&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sampled <span class="hljs-subst">{<span class="hljs-built_in">len</span>(result)}</span> products from collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .filter(<span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;product_name&quot;</span>))
        .limit(<span class="hljs-number">10</span>)
        .build();

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(queryReq);

List&lt;QueryResp.QueryResult&gt; results = queryResp.getQueryResults();
<span class="hljs-keyword">for</span> (QueryResp.QueryResult result : results) {
    System.out.println(result.getEntity());
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;product_catalog&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;product_name&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(<span class="hljs-string">&quot;id: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;id&quot;</span>).FieldData().GetScalars())
fmt.Println(<span class="hljs-string">&quot;product_name: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;product_name&quot;</span>).FieldData().GetScalars())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Sample approximately 1% of the entire collection</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">query</span>(
        QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;product_name&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;Sampled {} products from collection&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">get_row_count</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">QueryRequest</span>()
                       .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                       .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;product_name&quot;</span>)
                       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);

milvus::QueryResponse response;
status = client-&gt;<span class="hljs-built_in">Query</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-comment">// Sample approximately 1% of the entire collection</span>
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;product_name&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Sampled <span class="hljs-subst">${res.data.length}</span> products from collection`</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    Username = <span class="hljs-string">&quot;root&quot;</span>,
    Password = <span class="hljs-string">&quot;Milvus&quot;</span>
});

<span class="hljs-comment">// Sample approximately 1% of the entire collection</span>
QueryResp resp = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Expression = <span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;product_name&quot;</span> },
        Limit = <span class="hljs-number">10</span>
    }
});

Console.WriteLine(<span class="hljs-string">$&quot;Sampled <span class="hljs-subst">{resp.FieldsData.FirstOrDefault()?.RowCount ?? <span class="hljs-number">0</span>}</span> products from collection&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> filterSample=<span class="hljs-string">&#x27;RANDOM_SAMPLE(0.01)&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;product_catalog\&quot;,
  \&quot;filter\&quot;: \&quot;<span class="hljs-variable">$filterSample</span>\&quot;,
  \&quot;outputFields\&quot;: [\&quot;id\&quot;, \&quot;product_name\&quot;],
  \&quot;limit\&quot;: 10
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Combined-filtering-with-random-sampling" class="common-anchor-header">예제 2: 무작위 표본 추출과 결합된 필터링<button data-href="#Example-2-Combined-filtering-with-random-sampling" class="anchor-icon" translate="no">
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
    </button></h3><p>관리 가능한 부분 집합에서 필터링 로직을 테스트해 보세요:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># First filter by category and price, then sample 0.5% of results</span>
filter_expression = <span class="hljs-string">&#x27;category == &quot;electronics&quot; AND price &gt; 100 AND RANDOM_SAMPLE(0.005)&#x27;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=filter_expression,</span>
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Found <span class="hljs-subst">{<span class="hljs-built_in">len</span>(result)}</span> electronics products in sample&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;category == \&quot;electronics\&quot; AND price &gt; 100 AND RANDOM_SAMPLE(0.005)&quot;</span>;

<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>))
        .limit(<span class="hljs-number">10</span>)
        .build();

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

filter := <span class="hljs-string">&quot;category == \&quot;electronics\&quot; AND price &gt; 100 AND RANDOM_SAMPLE(0.005)&quot;</span>

_, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;product_catalog&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// First filter by category and price, then sample 0.5% of results</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_expression</span> = <span class="hljs-string">r#&quot;category == &quot;electronics&quot; AND price &gt; 100 AND RANDOM_SAMPLE(0.005)&quot;#</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">query</span>(
        QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(filter_expression)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;Found {} electronics products in sample&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">get_row_count</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(category == &quot;electronics&quot; AND price &gt; 100 AND RANDOM_SAMPLE(0.005))&quot;</span>;
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">QueryRequest</span>()
                       .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                       .<span class="hljs-built_in">WithFilter</span>(filter)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;product_name&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;price&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;rating&quot;</span>)
                       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);

milvus::QueryResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Query</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// First filter by category and price, then sample 0.5% of results</span>
<span class="hljs-keyword">const</span> filter_expression = <span class="hljs-string">&#x27;category == &quot;electronics&quot; AND price &gt; 100 AND RANDOM_SAMPLE(0.005)&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">filter</span>: filter_expression,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Found <span class="hljs-subst">${res.data.length}</span> electronics products in sample`</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    Username = <span class="hljs-string">&quot;root&quot;</span>,
    Password = <span class="hljs-string">&quot;Milvus&quot;</span>
});

<span class="hljs-comment">// First filter by category and price, then sample 0.5% of results</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;category == \&quot;electronics\&quot; AND price &gt; 100 AND RANDOM_SAMPLE(0.005)&quot;</span>;

QueryResp resp = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Expression = filter,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span> },
        Limit = <span class="hljs-number">10</span>
    }
});

Console.WriteLine(<span class="hljs-string">$&quot;Found <span class="hljs-subst">{resp.FieldsData.FirstOrDefault()?.RowCount ?? <span class="hljs-number">0</span>}</span> electronics products in sample&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> filterComplex=<span class="hljs-string">&quot;category == \\\&quot;electronics\\\&quot; AND price &gt; 100 AND RANDOM_SAMPLE(0.005)&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;product_catalog\&quot;,
  \&quot;filter\&quot;: \&quot;<span class="hljs-variable">$filterComplex</span>\&quot;,
  \&quot;outputFields\&quot;: [\&quot;product_name\&quot;, \&quot;price\&quot;, \&quot;rating\&quot;]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Quick-analytics" class="common-anchor-header">예제 3: 신속한 분석<button data-href="#Example-3-Quick-analytics" class="anchor-icon" translate="no">
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
    </button></h3><p>필터링된 데이터에 대한 신속한 통계 분석 수행:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get insights from ~0.1% of premium customer data</span>
filter_expression = <span class="hljs-string">&#x27;customer_tier == &quot;premium&quot; AND region == &quot;North America&quot; AND RANDOM_SAMPLE(0.001)&#x27;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;customer_profiles&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=filter_expression,</span>
    output_fields=[<span class="hljs-string">&quot;purchase_amount&quot;</span>, <span class="hljs-string">&quot;satisfaction_score&quot;</span>, <span class="hljs-string">&quot;last_purchase_date&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Analyze sample for quick insights</span>
<span class="hljs-keyword">if</span> result:
    average_purchase = <span class="hljs-built_in">sum</span>(r[<span class="hljs-string">&quot;purchase_amount&quot;</span>] <span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> result) / <span class="hljs-built_in">len</span>(result)
    average_satisfaction = <span class="hljs-built_in">sum</span>(r[<span class="hljs-string">&quot;satisfaction_score&quot;</span>] <span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> result) / <span class="hljs-built_in">len</span>(result)

    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sample size: <span class="hljs-subst">{<span class="hljs-built_in">len</span>(result)}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Average purchase amount: $<span class="hljs-subst">{average_purchase:<span class="hljs-number">.2</span>f}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Average satisfaction score: <span class="hljs-subst">{average_satisfaction:<span class="hljs-number">.2</span>f}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;customer_tier == \&quot;premium\&quot; AND region == \&quot;North America\&quot; AND RANDOM_SAMPLE(0.001)&quot;</span>;

<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;customer_profiles&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;purchase_amount&quot;</span>, <span class="hljs-string">&quot;satisfaction_score&quot;</span>, <span class="hljs-string">&quot;last_purchase_date&quot;</span>))
        .limit(<span class="hljs-number">10</span>)
        .build();

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

filter := <span class="hljs-string">&quot;customer_tier == \&quot;premium\&quot; AND region == \&quot;North America\&quot; AND RANDOM_SAMPLE(0.001)&quot;</span>

_, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;customer_profiles&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;purchase_amount&quot;</span>, <span class="hljs-string">&quot;satisfaction_score&quot;</span>, <span class="hljs-string">&quot;last_purchase_date&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Get insights from ~0.1% of premium customer data</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_expression</span> = <span class="hljs-string">r#&quot;customer_tier == &quot;premium&quot; AND region == &quot;North America&quot; AND RANDOM_SAMPLE(0.001)&quot;#</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">query</span>(
        QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;customer_profiles&quot;</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(filter_expression)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;purchase_amount&quot;</span>, <span class="hljs-string">&quot;satisfaction_score&quot;</span>, <span class="hljs-string">&quot;last_purchase_date&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;Sample size: {}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">get_row_count</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(customer_tier == &quot;premium&quot; AND region == &quot;North America&quot; AND RANDOM_SAMPLE(0.001))&quot;</span>;
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">QueryRequest</span>()
                       .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;customer_profiles&quot;</span>)
                       .<span class="hljs-built_in">WithFilter</span>(filter)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;purchase_amount&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;satisfaction_score&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;last_purchase_date&quot;</span>)
                       .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>);

milvus::QueryResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Query</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Get insights from ~0.1% of premium customer data</span>
<span class="hljs-keyword">const</span> filter_expression = <span class="hljs-string">&#x27;customer_tier == &quot;premium&quot; AND region == &quot;North America&quot; AND RANDOM_SAMPLE(0.001)&#x27;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customer_profiles&quot;</span>,
    <span class="hljs-attr">filter</span>: filter_expression,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;purchase_amount&quot;</span>, <span class="hljs-string">&quot;satisfaction_score&quot;</span>, <span class="hljs-string">&quot;last_purchase_date&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>
});

<span class="hljs-comment">// Analyze sample for quick insights</span>
<span class="hljs-keyword">if</span> (res.<span class="hljs-property">data</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">const</span> average_purchase = res.<span class="hljs-property">data</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, r</span>) =&gt;</span> sum + r.<span class="hljs-property">purchase_amount</span>, <span class="hljs-number">0</span>) / res.<span class="hljs-property">data</span>.<span class="hljs-property">length</span>;
    <span class="hljs-keyword">const</span> average_satisfaction = res.<span class="hljs-property">data</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, r</span>) =&gt;</span> sum + r.<span class="hljs-property">satisfaction_score</span>, <span class="hljs-number">0</span>) / res.<span class="hljs-property">data</span>.<span class="hljs-property">length</span>;

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Sample size: <span class="hljs-subst">${res.data.length}</span>`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Average purchase amount: $<span class="hljs-subst">${average_purchase.toFixed(<span class="hljs-number">2</span>)}</span>`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Average satisfaction score: <span class="hljs-subst">${average_satisfaction.toFixed(<span class="hljs-number">2</span>)}</span>`</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    Username = <span class="hljs-string">&quot;root&quot;</span>,
    Password = <span class="hljs-string">&quot;Milvus&quot;</span>
});

<span class="hljs-comment">// Get insights from ~0.1% of premium customer data</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;customer_tier == \&quot;premium\&quot; AND region == \&quot;North America\&quot; AND RANDOM_SAMPLE(0.001)&quot;</span>;

QueryResp resp = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;customer_profiles&quot;</span>,
    Expression = filter,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;purchase_amount&quot;</span>, <span class="hljs-string">&quot;satisfaction_score&quot;</span>, <span class="hljs-string">&quot;last_purchase_date&quot;</span> },
        Limit = <span class="hljs-number">10</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> filterCustomer=<span class="hljs-string">&quot;customer_tier == \\\&quot;premium\\\&quot; AND region == \\\&quot;North America\\\&quot; AND RANDOM_SAMPLE(0.001)&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;customer_profiles\&quot;,
  \&quot;filter\&quot;: \&quot;<span class="hljs-variable">$filterCustomer</span>\&quot;,
  \&quot;outputFields\&quot;: [\&quot;purchase_amount\&quot;, \&quot;satisfaction_score\&quot;, \&quot;last_purchase_date\&quot;],
  \&quot;limit\&quot;: 10
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Combined-with-vector-search" class="common-anchor-header">예제 4: 벡터 검색과 결합<button data-href="#Example-4-Combined-with-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>필터링된 검색 시나리오에서 무작위 표본 추출을 사용합니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search for similar products within a sampled subset</span>
search_results = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># query vector</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;books&quot; AND RANDOM_SAMPLE(0.01)&#x27;</span>,</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {}},
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;author&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Found <span class="hljs-subst">{<span class="hljs-built_in">len</span>(search_results[<span class="hljs-number">0</span>])}</span> similar books in sample&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">10</span>)
        .filter(<span class="hljs-string">&quot;category == \&quot;books\&quot; AND RANDOM_SAMPLE(0.01)&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;author&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">10</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithFilter(<span class="hljs-string">&quot;category == \&quot;books\&quot; AND RANDOM_SAMPLE(0.01)&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;author&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;title: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;title&quot;</span>).FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;author: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;author&quot;</span>).FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;price: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;price&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Search for similar products within a sampled subset</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]]))
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">r#&quot;category == &quot;books&quot; AND RANDOM_SAMPLE(0.01)&quot;#</span>)
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;author&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;Found {} similar books in sample&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">len</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">R&quot;(category == &quot;books&quot; AND RANDOM_SAMPLE(0.01))&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;title&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;author&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;price&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Search for similar products within a sampled subset</span>
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment">// query vector</span>
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;category == &quot;books&quot; AND RANDOM_SAMPLE(0.01)&#x27;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;author&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>]
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Found <span class="hljs-subst">${res.results.length}</span> similar books in sample`</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    Username = <span class="hljs-string">&quot;root&quot;</span>,
    Password = <span class="hljs-string">&quot;Milvus&quot;</span>
});

<span class="hljs-built_in">float</span>[] queryVector = [<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>];

<span class="hljs-comment">// Search for similar products within a sampled subset</span>
SearchResp resp = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;vector&quot;</span>,
    Vectors = [queryVector],
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = <span class="hljs-string">&quot;category == \&quot;books\&quot; AND RANDOM_SAMPLE(0.01)&quot;</span>,
        OutputFields = { <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;author&quot;</span>, <span class="hljs-string">&quot;price&quot;</span> }
    }
});

Console.WriteLine(<span class="hljs-string">$&quot;Found <span class="hljs-subst">{resp.Ids.LongIds?.Count ?? <span class="hljs-number">0</span>}</span> similar books in sample&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;product_catalog&quot;,
  &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4, 0.5]],
  &quot;annsField&quot;: &quot;vector&quot;,
  &quot;limit&quot;: 10,
  &quot;filter&quot;: &quot;category == \&quot;books\&quot; AND RANDOM_SAMPLE(0.01)&quot;,
  &quot;outputFields&quot;: [&quot;title&quot;, &quot;author&quot;, &quot;price&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">모범 사례<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>작게 시작하기</strong>: 초기 탐색을 위해 더 작은 표본 추출 계수(0.001~0.01)로 시작하세요</p></li>
<li><p><strong>개발 워크플로</strong>: 개발 단계에서는 표본 추출을 사용하고, 실제 운영 쿼리에서는 이를 제거하십시오</p></li>
<li><p><strong>통계적 타당성</strong>: 표본 크기가 클수록 더 정확한 통계적 결과를 얻을 수 있습니다</p></li>
<li><p><strong>성능 테스트</strong>: 쿼리 성능을 모니터링하고 필요에 따라 샘플링 계수를 조정하십시오</p></li>
</ul>
