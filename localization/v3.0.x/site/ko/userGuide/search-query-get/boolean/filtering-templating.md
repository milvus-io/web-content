---
id: filtering-templating.md
title: 필터 템플릿
summary: >-
  Milvus에서 요소가 많은 복잡한 필터 표현식, 특히 CJK 문자 같은 비-ASCII 문자가 포함된 표현식은 쿼리 성능에 상당한 영향을
  미칠 수 있습니다. 이를 해결하기 위해 Milvus는 복잡한 표현식을 파싱하는 데 소요되는 시간을 줄여 효율성을 높이기 위해 설계된 필터
  표현식 템플릿 메커니즘을 도입했습니다. 이 페이지에서는 검색, 쿼리 및 삭제 작업에서 필터 표현식 템플릿을 사용하는 방법을 설명합니다.
---
<h1 id="Filter-Templating" class="common-anchor-header">필터 템플릿<button data-href="#Filter-Templating" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus에서 수많은 요소를 포함하는 복잡한 필터 표현식, 특히 CJK 문자 같은 비-ASCII 문자가 포함된 표현식은 쿼리 성능에 상당한 영향을 미칠 수 있습니다. 이를 해결하기 위해 Milvus는 복잡한 표현식을 파싱하는 데 소요되는 시간을 줄여 효율성을 높이기 위해 설계된 필터 표현식 템플릿 메커니즘을 도입했습니다. 이 페이지에서는 검색, 쿼리 및 삭제 작업에서 필터 표현식 템플릿을 사용하는 방법을 설명합니다.</p>
<div class="alert note">
<p>필터 표현식의 좌측에 위치한 리터럴은 아래 예제에서 사용된 <code translate="no">age</code>, <code translate="no">city</code> 등과 같은 컬렉션 필드 이름일 수도 있고, <code translate="no">filter = 'struct[0][subfield] &gt; {var}'</code> 와 같이 특정 요소 인덱스에 위치한 StructArray 하위 필드의 이름일 수도 있습니다.</p>
<p>StructArray 필드에서의 스칼라 필터링에 대한 자세한 내용은 <a href="/docs/ko/struct-array-operators.md">StructArray 연산자를</a> 참조하십시오.</p>
</div>
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
    </button></h2><p>필터 표현식 템플릿 기능을 사용하면 쿼리 실행 중에 값으로 동적으로 대체되는 자리 표시자가 포함된 필터 표현식을 만들 수 있습니다. 템플릿을 사용하면 큰 배열이나 복잡한 표현식을 필터에 직접 삽입하는 것을 피할 수 있어, 구문 분석 시간을 줄이고 쿼리 성능을 향상시킬 수 있습니다.</p>
<p><code translate="no">age</code> 와 <code translate="no">city</code> 라는 두 필드가 포함된 필터 표현식이 있고, 나이가 25세 이상이며 “北京”(베이징) 또는 “上海”(상하이)에 거주하는 모든 사람을 찾고자 한다고 가정해 봅시다. 필터 표현식에 값을 직접 삽입하는 대신 템플릿을 사용할 수 있습니다.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
Map&lt;String, Object&gt; filterTemplateValues = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
filterTemplateValues.put(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>);
filterTemplateValues.put(<span class="hljs-string">&quot;city&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filterTemplates := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;age&quot;</span>:  <span class="hljs-number">25</span>,
    <span class="hljs-string">&quot;city&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>},
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_templates</span>: HashMap&lt;<span class="hljs-type">String</span>, FilterTemplateValue&gt; = HashMap::<span class="hljs-title function_ invoke__">from</span>([
    (<span class="hljs-string">&quot;age&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">Int64</span>(<span class="hljs-number">25</span>)),
    (<span class="hljs-string">&quot;city&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">StringArray</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;北京&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;上海&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()])),
]);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
std::unordered_map&lt;std::string, nlohmann::json&gt; filterTemplates = {
    {<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>},
    {<span class="hljs-string">&quot;city&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>})}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">const</span> exprValues = { <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">city</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>] };
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">var</span> filterParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
    [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

filter=<span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params=<span class="hljs-string">&#x27;{&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>여기서 <code translate="no">{age}</code> 와 <code translate="no">{city}</code> 는 쿼리가 실행될 때 <code translate="no">filter_params</code> 의 실제 값으로 대체될 자리 표시자입니다.</p>
<p>Milvus에서 필터 표현식 템플릿을 사용하면 다음과 같은 몇 가지 주요 이점이 있습니다:</p>
<ul>
<li><p><strong>파싱 시간 단축</strong>: 크거나 복잡한 필터 표현식을 자리 표시자로 대체함으로써, 시스템이 필터를 파싱하고 처리하는 데 소요되는 시간을 줄일 수 있습니다.</p></li>
<li><p><strong>쿼리 성능 향상</strong>: 파싱 오버헤드가 줄어들어 쿼리 성능이 향상되며, 이는 더 높은 QPS와 더 빠른 응답 시간으로 이어집니다.</p></li>
<li><p><strong>확장성</strong>: 데이터 세트가 증가하고 필터 표현식이 더욱 복잡해짐에 따라, 템플릿 기능을 통해 성능이 효율적이고 확장성 있게 유지됩니다.</p></li>
</ul>
<h2 id="Search-Operations" class="common-anchor-header">검색 작업<button data-href="#Search-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus의 검색 작업에서는 ` <code translate="no">filter</code> ` 표현식을 사용하여 필터링 조건을 정의하고, ` <code translate="no">filter_params</code> ` 매개변수를 사용하여 자리 표시자의 값을 지정합니다. ` <code translate="no">filter_params</code> ` 사전에는 Milvus가 필터 표현식에 대입할 동적 값들이 포함되어 있습니다.</p>
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
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.search(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>]],
    <span class="hljs-built_in">filter</span>=expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;search_list&quot;</span>: <span class="hljs-number">100</span>}},
    filter_params=filter_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
Map&lt;String, Object&gt; filterTemplateValues = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
filterTemplateValues.put(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>);
filterTemplateValues.put(<span class="hljs-string">&quot;city&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>));

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>})))
        .filter(expr)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>))
        .filterTemplateValues(filterTemplateValues)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

expr := <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">10</span>,             <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector([]<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>})},
).WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithFilter(expr).
    WithTemplateParam(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>).
    WithTemplateParam(<span class="hljs-string">&quot;city&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>}).
    WithOutputFields(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_templates</span>: HashMap&lt;<span class="hljs-type">String</span>, FilterTemplateValue&gt; = HashMap::<span class="hljs-title function_ invoke__">from</span>([
    (<span class="hljs-string">&quot;age&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">Int64</span>(<span class="hljs-number">25</span>)),
    (<span class="hljs-string">&quot;city&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">StringArray</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;北京&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;上海&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()])),
]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>]]))
            .<span class="hljs-title function_ invoke__">filter</span>(expr)
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>])
            .<span class="hljs-title function_ invoke__">filter_templates</span>(filter_templates)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
std::unordered_map&lt;std::string, nlohmann::json&gt; filterTemplates = {
    {<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>},
    {<span class="hljs-string">&quot;city&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>})}
};

<span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
                         .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                         .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>})
                         .<span class="hljs-built_in">WithFilter</span>(expr)
                         .<span class="hljs-built_in">WithFilterTemplates</span>(std::<span class="hljs-built_in">move</span>(filterTemplates))
                         .<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>});

milvus::SearchResponse searchResponse;
client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">const</span> exprValues = { <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">city</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>] };

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>]],
    <span class="hljs-attr">filter</span>: expr,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    exprValues
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-built_in">string</span> expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">var</span> filterParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
    [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
};

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    Vectors = [<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span> })],
    VectorFieldName = <span class="hljs-string">&quot;vector&quot;</span>,
    MetricType = MetricType.Cosine,
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = expr,
        OutputFields = { <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span> },
        FilterTemplates =
        {
            [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
            [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
filter=<span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params=<span class="hljs-string">&#x27;{&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]}&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;hello_milvus&quot;,
      &quot;data&quot;: [[0.1, 0.2]],
      &quot;annsField&quot;: &quot;vector&quot;,
      &quot;limit&quot;: 10,
      &quot;filter&quot;: &quot;age &gt; {age} AND city IN {city}&quot;,
      &quot;exprParams&quot;: {&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]},
      &quot;outputFields&quot;: [&quot;age&quot;, &quot;city&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서 Milvus는 검색을 실행할 때 <code translate="no">{age}</code> 을 <code translate="no">25</code> 으로, <code translate="no">{city}</code> 을 <code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> 으로 동적으로 대체합니다.</p>
<h2 id="Query-Operations" class="common-anchor-header">쿼리 연산<button data-href="#Query-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus의 쿼리 연산에도 동일한 템플릿 메커니즘을 적용할 수 있습니다. <code translate="no">query</code> 함수에서 필터 표현식을 정의하고, <code translate="no">filter_params</code> 를 사용하여 대체할 값을 지정합니다.</p>
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
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.query(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
Map&lt;String, Object&gt; filterTemplateValues = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
filterTemplateValues.put(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>);
filterTemplateValues.put(<span class="hljs-string">&quot;city&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>));

<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
        .filter(expr)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>))
        .filterTemplateValues(filterTemplateValues)
        .build();

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

expr := <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;hello_milvus&quot;</span>).
    WithFilter(expr).
    WithTemplateParam(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>).
    WithTemplateParam(<span class="hljs-string">&quot;city&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>}).
    WithOutputFields(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_templates</span>: HashMap&lt;<span class="hljs-type">String</span>, FilterTemplateValue&gt; = HashMap::<span class="hljs-title function_ invoke__">from</span>([
    (<span class="hljs-string">&quot;age&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">Int64</span>(<span class="hljs-number">25</span>)),
    (<span class="hljs-string">&quot;city&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">StringArray</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;北京&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;上海&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()])),
]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">query</span>(
        QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(expr)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>])
            .<span class="hljs-title function_ invoke__">filter_templates</span>(filter_templates)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
std::unordered_map&lt;std::string, nlohmann::json&gt; filterTemplates = {
    {<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>},
    {<span class="hljs-string">&quot;city&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>})}
};

<span class="hljs-keyword">auto</span> queryRequest = milvus::<span class="hljs-built_in">QueryRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
                         .<span class="hljs-built_in">WithFilter</span>(expr)
                         .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>})
                         .<span class="hljs-built_in">WithFilterTemplates</span>(std::<span class="hljs-built_in">move</span>(filterTemplates));

milvus::QueryResponse queryResponse;
client-&gt;<span class="hljs-built_in">Query</span>(queryRequest, queryResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">const</span> exprValues = { <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">city</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>] };

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-attr">filter</span>: expr,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    exprValues
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;

<span class="hljs-built_in">string</span> expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">var</span> filterParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
    [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
};

QueryResp res = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    Expression = expr,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span> },
        FilterTemplates =
        {
            [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
            [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
filter=<span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params=<span class="hljs-string">&#x27;{&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]}&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;hello_milvus&quot;,
      &quot;filter&quot;: &quot;age &gt; {age} AND city IN {city}&quot;,
      &quot;exprParams&quot;: {&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]},
      &quot;outputFields&quot;: [&quot;age&quot;, &quot;city&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">filter_params</code> 를 사용하면 Milvus는 값의 동적 삽입을 효율적으로 처리하여 쿼리 실행 속도를 향상시킵니다.</p>
<h2 id="Delete-Operations" class="common-anchor-header">삭제 작업<button data-href="#Delete-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>삭제 작업에서도 필터 표현식 템플릿을 사용할 수 있습니다. 검색 및 쿼리와 마찬가지로, <code translate="no">filter</code> 표현식은 조건을 정의하고, <code translate="no">filter_params</code> 는 자리 표시자에 대한 동적 값을 제공합니다.</p>
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
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.delete(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.DeleteReq;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
Map&lt;String, Object&gt; filterTemplateValues = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
filterTemplateValues.put(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>);
filterTemplateValues.put(<span class="hljs-string">&quot;city&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>));

<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">deleteReq</span> <span class="hljs-operator">=</span> DeleteReq.builder()
        .collectionName(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
        .filter(expr)
        .filterTemplateValues(filterTemplateValues)
        .build();

client.delete(deleteReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

expr := <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>

result, err := client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;hello_milvus&quot;</span>).
    WithExpr(expr).
    WithTemplateParam(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>).
    WithTemplateParam(<span class="hljs-string">&quot;city&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>}))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_templates</span>: HashMap&lt;<span class="hljs-type">String</span>, FilterTemplateValue&gt; = HashMap::<span class="hljs-title function_ invoke__">from</span>([
    (<span class="hljs-string">&quot;age&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">Int64</span>(<span class="hljs-number">25</span>)),
    (<span class="hljs-string">&quot;city&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">StringArray</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;北京&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;上海&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()])),
]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">delete</span>(
        DeleteRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(expr)
            .<span class="hljs-title function_ invoke__">filter_templates</span>(filter_templates)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
std::unordered_map&lt;std::string, nlohmann::json&gt; filterTemplates = {
    {<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>},
    {<span class="hljs-string">&quot;city&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>})}
};

<span class="hljs-keyword">auto</span> deleteRequest = milvus::<span class="hljs-built_in">DeleteRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
                         .<span class="hljs-built_in">WithFilter</span>(expr)
                         .<span class="hljs-built_in">WithFilterTemplates</span>(std::<span class="hljs-built_in">move</span>(filterTemplates));

milvus::DeleteResponse deleteResponse;
client-&gt;<span class="hljs-built_in">Delete</span>(deleteRequest, deleteResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">const</span> exprValues = { <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">city</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>] };

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-attr">filter</span>: expr,
    exprValues
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;

<span class="hljs-built_in">string</span> expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">var</span> filterParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
    [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
};

<span class="hljs-keyword">await</span> client.DeleteAsync(<span class="hljs-keyword">new</span> DeleteReq
{
    CollectionName = <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    Expression = expr,
    FilterTemplates =
    {
        [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
        [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
filter=<span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params=<span class="hljs-string">&#x27;{&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]}&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/delete&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;hello_milvus&quot;,
      &quot;filter&quot;: &quot;age &gt; {age} AND city IN {city}&quot;,
      &quot;exprParams&quot;: {&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]}
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 접근 방식은 특히 복잡한 필터 조건을 처리할 때 삭제 작업의 성능을 향상시킵니다.</p>
<h2 id="Regex-filter-templates" class="common-anchor-header">정규식 필터 템플릿<button data-href="#Regex-filter-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>정규식 필터와 함께 필터 표현식 템플릿을 사용할 수 있습니다. 이는 요청 시점에 정규식 패턴이 제공될 때 유용합니다.</p>
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
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>
filter_params = {<span class="hljs-string">&quot;pattern&quot;</span>: <span class="hljs-string">&quot;E[0-9]{4}&quot;</span>}
res = client.query(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>],
    filter_params=filter_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>;
Map&lt;String, Object&gt; filterTemplateValues = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
filterTemplateValues.put(<span class="hljs-string">&quot;pattern&quot;</span>, <span class="hljs-string">&quot;E[0-9]{4}&quot;</span>);

<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
        .filter(expr)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;message&quot;</span>))
        .filterTemplateValues(filterTemplateValues)
        .build();

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

expr := <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;hello_milvus&quot;</span>).
    WithFilter(expr).
    WithTemplateParam(<span class="hljs-string">&quot;pattern&quot;</span>, <span class="hljs-string">&quot;E[0-9]{4}&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;message&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">expr</span> = <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_templates</span>: HashMap&lt;<span class="hljs-type">String</span>, FilterTemplateValue&gt; = HashMap::<span class="hljs-title function_ invoke__">from</span>([
    (<span class="hljs-string">&quot;pattern&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">String</span>(<span class="hljs-string">&quot;E[0-9]{4}&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())),
]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">query</span>(
        QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(expr)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;message&quot;</span>])
            .<span class="hljs-title function_ invoke__">filter_templates</span>(filter_templates)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string expr = <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>;
std::unordered_map&lt;std::string, nlohmann::json&gt; filterTemplates = {
    {<span class="hljs-string">&quot;pattern&quot;</span>, <span class="hljs-string">&quot;E[0-9]{4}&quot;</span>}
};

<span class="hljs-keyword">auto</span> queryRequest = milvus::<span class="hljs-built_in">QueryRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
                         .<span class="hljs-built_in">WithFilter</span>(expr)
                         .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;message&quot;</span>})
                         .<span class="hljs-built_in">WithFilterTemplates</span>(std::<span class="hljs-built_in">move</span>(filterTemplates));

milvus::QueryResponse queryResponse;
client-&gt;<span class="hljs-built_in">Query</span>(queryRequest, queryResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>;
<span class="hljs-keyword">const</span> exprValues = { <span class="hljs-attr">pattern</span>: <span class="hljs-string">&quot;E[0-9]{4}&quot;</span> };

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-attr">filter</span>: expr,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;message&quot;</span>],
    exprValues
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;

<span class="hljs-built_in">string</span> expr = <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>;
<span class="hljs-keyword">var</span> filterParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;pattern&quot;</span>] = <span class="hljs-string">&quot;E[0-9]{4}&quot;</span>
};

QueryResp res = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    Expression = expr,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;message&quot;</span> },
        FilterTemplates =
        {
            [<span class="hljs-string">&quot;pattern&quot;</span>] = <span class="hljs-string">&quot;E[0-9]{4}&quot;</span>
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
filter=<span class="hljs-string">&quot;message =~ {pattern}&quot;</span>
filter_params=<span class="hljs-string">&#x27;{&quot;pattern&quot;: &quot;E[0-9]{4}&quot;}&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;hello_milvus&quot;,
      &quot;filter&quot;: &quot;message =~ {pattern}&quot;,
      &quot;exprParams&quot;: {&quot;pattern&quot;: &quot;E[0-9]{4}&quot;},
      &quot;outputFields&quot;: [&quot;message&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">!~</code> 와 함께 템플릿 매개변수를 사용할 수도 있습니다:</p>
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
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>
filter_params = {<span class="hljs-string">&quot;pattern&quot;</span>: <span class="hljs-string">&quot;^DEBUG&quot;</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>;
Map&lt;String, Object&gt; filterTemplateValues = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
filterTemplateValues.put(<span class="hljs-string">&quot;pattern&quot;</span>, <span class="hljs-string">&quot;^DEBUG&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">expr := <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>
filterTemplates := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;pattern&quot;</span>: <span class="hljs-string">&quot;^DEBUG&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">expr</span> = <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_templates</span>: HashMap&lt;<span class="hljs-type">String</span>, FilterTemplateValue&gt; = HashMap::<span class="hljs-title function_ invoke__">from</span>([
    (<span class="hljs-string">&quot;pattern&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">String</span>(<span class="hljs-string">&quot;^DEBUG&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())),
]);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string expr = <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>;
std::unordered_map&lt;std::string, nlohmann::json&gt; filterTemplates = {
    {<span class="hljs-string">&quot;pattern&quot;</span>, <span class="hljs-string">&quot;^DEBUG&quot;</span>}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>;
<span class="hljs-keyword">const</span> exprValues = { <span class="hljs-attr">pattern</span>: <span class="hljs-string">&quot;^DEBUG&quot;</span> };
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> expr = <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>;
<span class="hljs-keyword">var</span> filterParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;pattern&quot;</span>] = <span class="hljs-string">&quot;^DEBUG&quot;</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
filter=<span class="hljs-string">&quot;message !~ {pattern}&quot;</span>
filter_params=<span class="hljs-string">&#x27;{&quot;pattern&quot;: &quot;^DEBUG&quot;}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>템플릿 값은 유효한 RE2 정규식 패턴을 포함하는 문자열이어야 합니다. Milvus는 필터를 실행하기 전에 패턴의 유효성을 검사합니다.</p>
<p>필터 템플릿은 정규식 패턴을 필터 표현식에 직접 연결하는 대신 값으로 전달합니다. 이를 통해 표현식 구문 분석에 드는 오버헤드를 줄일 수 있으며, 패턴에 따옴표나 연산자가 포함되어 있을 때 필터 구조가 의도치 않게 변경되는 것을 방지할 수 있습니다.</p>
<h2 id="Conclusion" class="common-anchor-header">결론<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>필터 표현식 템플릿은 Milvus에서 쿼리 성능을 최적화하는 데 필수적인 도구입니다. 자리 표시자와 ` <code translate="no">filter_params</code> ` 사전(dictionary)을 사용하면 복잡한 필터 표현식을 파싱하는 데 소요되는 시간을 크게 줄일 수 있습니다. 이는 쿼리 실행 속도를 높이고 전반적인 성능을 향상시킵니다.</p>
