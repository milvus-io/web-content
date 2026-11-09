---
id: filtering-templating.md
title: 篩選器範本機制
summary: >-
  在 Milvus 中，包含大量元素的複雜篩選表達式（尤其是涉及非 ASCII 字元（如 CJK
  字元）的表達式）可能會顯著影響查詢效能。為解決此問題，Milvus
  引入了篩選表達式範本機制，旨在透過減少解析複雜表達式所需的時間來提升效率。本頁說明如何在搜尋、查詢及刪除操作中使用篩選表達式範本。
---
<h1 id="Filter-Templating" class="common-anchor-header">篩選器範本機制<button data-href="#Filter-Templating" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，包含大量元素的複雜篩選表達式（尤其是涉及非 ASCII 字元（如 CJK 字元）的表達式）可能會顯著影響查詢效能。為解決此問題，Milvus 引入了篩選表達式範本機制，旨在透過減少解析複雜表達式所需的時間來提升效率。本頁說明如何在搜尋、查詢及刪除操作中使用篩選表達式範本。</p>
<div class="alert note">
<p>篩選表達式左側的字面量可以是集合欄位名稱（例如下文範例中的<code translate="no">age</code> 、<code translate="no">city</code> 等），或是 StructArray 子欄位在特定元素索引處的名稱（例如<code translate="no">filter = 'struct[0][subfield] &gt; {var}'</code> ）。</p>
<p>有關 StructArray 欄位中標量篩選的詳細資訊，請參閱《<a href="/docs/zh-hant/struct-array-operators.md">StructArray 運算子</a>》。</p>
</div>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>篩選表達式模板功能可讓您建立包含佔位符的篩選表達式，這些佔位符會在查詢執行期間動態替換為實際值。透過使用模板，您可避免將大型陣列或複雜表達式直接嵌入篩選條件中，從而減少解析時間並提升查詢效能。</p>
<p>假設您有一個涉及兩個欄位的篩選表達式：<code translate="no">age</code> 和<code translate="no">city</code> ，並希望找出所有年齡大於 25 歲且居住於「北京」或「上海」的人。與其直接將值嵌入篩選表達式中，您可以使用範本：</p>
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
<p>在此，<code translate="no">{age}</code> 和<code translate="no">{city}</code> 為佔位符，當查詢執行時，會被<code translate="no">filter_params</code> 中的實際值所取代。</p>
<p>在 Milvus 中使用篩選表達式模板有幾個關鍵優勢：</p>
<ul>
<li><p><strong>減少解析時間</strong>：透過將龐大或複雜的篩選表達式替換為佔位符，系統在解析與處理篩選條件時所需的時間便會減少。</p></li>
<li><p><strong>提升查詢效能</strong>：隨著解析開銷降低，查詢效能隨之提升，進而帶來更高的每秒查詢數（QPS）與更快的回應時間。</p></li>
<li><p><strong>可擴展性</strong>：隨著資料集規模擴大及篩選表達式日益複雜，範本化機制可確保系統效能持續保持高效且具備可擴展性。</p></li>
</ul>
<h2 id="Search-Operations" class="common-anchor-header">搜尋操作<button data-href="#Search-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 的搜尋操作中，會使用 `<code translate="no">filter</code> ` 表達式來定義篩選條件，並透過 `<code translate="no">filter_params</code> ` 參數指定佔位符的值。`<code translate="no">filter_params</code> ` 字典包含 Milvus 將用於替換篩選表達式中的動態值。</p>
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
<p>在此範例中，Milvus 在執行搜尋時，會將<code translate="no">{age}</code> 動態替換為<code translate="no">25</code> ，並將<code translate="no">{city}</code> 動態替換為<code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> 。</p>
<h2 id="Query-Operations" class="common-anchor-header">查詢操作<button data-href="#Query-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>相同的模板機制亦可套用至 Milvus 中的查詢操作。在<code translate="no">query</code> 函式中，您需定義篩選表達式，並使用<code translate="no">filter_params</code> 來指定要替換的值。</p>
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
<p>透過使用 `<code translate="no">filter_params</code>`，Milvus 能高效處理值的動態插入，從而提升查詢執行速度。</p>
<h2 id="Delete-Operations" class="common-anchor-header">刪除操作<button data-href="#Delete-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>您亦可在刪除操作中使用篩選表達式範本。與搜尋和查詢類似，<code translate="no">filter</code> 表達式定義條件，而<code translate="no">filter_params</code> 則為佔位符提供動態值。</p>
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
<p>此方法可提升刪除操作的效能，特別是在處理複雜篩選條件時。</p>
<h2 id="Regex-filter-templates" class="common-anchor-header">正規表達式篩選模板<button data-href="#Regex-filter-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以將篩選表達式模板與正規表達式篩選器結合使用。當正規表達式模式在請求時提供時，此功能特別有用。</p>
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
<p>您也可以在 `<code translate="no">!~</code>` 中使用範本參數：</p>
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
<p>範本值必須為包含有效 RE2 正規表達式模式的字串。Milvus 會在執行篩選器之前驗證該模式。</p>
<p>篩選器範本會將正規表達式模式作為值傳入，而非將其拼接至篩選器表達式中。此舉可降低表達式解析的開銷，並避免在模式中包含引號或運算子時，意外地改變篩選器結構。</p>
<h2 id="Conclusion" class="common-anchor-header">結論<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>篩選器表達式的範本化是優化 Milvus 查詢效能的關鍵工具。透過使用佔位符和 `<code translate="no">filter_params</code> ` 字典，您可以顯著減少解析複雜篩選器表達式所需的時間。這將帶來更快的查詢執行速度和更佳的整體效能。</p>
