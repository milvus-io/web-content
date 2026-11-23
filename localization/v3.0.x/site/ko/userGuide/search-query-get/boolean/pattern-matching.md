---
id: pattern-matching.md
title: 패턴 매칭
summary: 스칼라 필터에서 문자열 값을 LIKE 와일드카드 패턴이나 RE2 정규 표현식과 일치시킵니다.
---
<h1 id="Pattern-Matching" class="common-anchor-header">패턴 매칭<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>와일드카드 일치를 위해서는 ` <code translate="no">LIKE</code> `를, <a href="https://github.com/google/re2/wiki/syntax">RE2</a> 정규식을 위해서는 ` <code translate="no">=~</code> ` 또는 ` <code translate="no">!~</code> `를 사용하십시오. 이러한 스칼라 필터는 ` <code translate="no">query</code>`, ` <code translate="no">search</code>` 및 하이브리드 검색에서 오류 코드, 접두사, 이메일 도메인 또는 URL 경로와 같은 문자열 구조와 일치합니다.</p>
<div class="alert note">
<p>이러한 필터는 문자열 값과 일치합니다. 분석기 토큰을 변경하지 않으며, 토큰 기반 <code translate="no">TEXT_MATCH</code> 및 <code translate="no">PHRASE_MATCH</code> 기능을 활성화하지도 않습니다. 해당 메커니즘에 대해서는 <a href="/docs/ko/regex-filter.md">정규식 분석기 필터</a> 및 <a href="/docs/ko/keyword-match.md">텍스트 일치를</a> 참조하십시오.</p>
</div>
<p>패턴 일치 표현식은 <code translate="no">filter</code> 매개변수에 작성됩니다. 예를 들어, 다음 쿼리는 <code translate="no">E1001</code> 와 같은 오류 코드가 포함된 로그 메시지와 일치합니다:</p>
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

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;log_events&quot;</span>)
<span class="highlighted-wrapper-line">        .filter(<span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>)</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

res, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;log_events&quot;</span>).
<span class="highlighted-wrapper-line">    WithFilter(<span class="hljs-string">`message =~ &quot;E[0-9]{4}&quot;`</span>).</span>
    WithOutputFields(<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">query</span>(
    QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;log_events&quot;</span>)
<span class="highlighted-wrapper-line">        .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">r#&quot;message =~ &quot;E[0-9]{4}&quot;&quot;#</span>)</span>
        .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>])
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> res.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">rows</span>()? {
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">QueryRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;log_events&quot;</span>)
                   .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">R&quot;(message =~ &quot;E[0-9]{4}&quot;)&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;message&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;severity&quot;</span>);

milvus::QueryResponse response;
status = client-&gt;<span class="hljs-built_in">Query</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>);

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">main</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span> });

  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;log_events&#x27;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-string">&#x27;severity&#x27;</span>],
  });
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
}

<span class="hljs-title function_">main</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(error);
  process.<span class="hljs-property">exitCode</span> = <span class="hljs-number">1</span>;
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

QueryResp res = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;log_events&quot;</span>,
    Expression = <span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;log_events&quot;,
    &quot;filter&quot;: &quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;,
    &quot;outputFields&quot;: [&quot;message&quot;, &quot;severity&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>나머지 예제들은 ` <code translate="no">filter</code>`에 할당된 표현식을 보여줍니다.</p>
<div class="alert note">
<p>왼쪽 피연산자는 <code translate="no">message</code> 과 같은 컬렉션 필드이거나, <code translate="no">struct[0][subfield] =~ &quot;E[0-9]{4}&quot;</code> 과 같이 특정 요소 인덱스에 있는 StructArray 하위 필드일 수 있습니다. <a href="/docs/ko/struct-array-operators.md">StructArray 연산자를</a> 참조하십시오.</p>
</div>
<h2 id="Supported-field-types" class="common-anchor-header">지원되는 필드 유형<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>문자열 값에 대해서는 패턴 매칭을 사용할 수 있습니다.</p>
<table>
<thead>
<tr><th>대상</th><th><code translate="no">LIKE</code></th><th>정규식 <code translate="no">=~</code> / <code translate="no">!~</code></th><th>참고</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> 필드</td><td>예</td><td>예</td><td>문자열 필드에 대한 패턴 매칭의 일반적인 대상입니다.</td></tr>
<tr><td><code translate="no">JSON</code> 문자열 값을 가진 경로</td><td>예</td><td>예</td><td>일치하려면 문자열 값이 필요합니다. 인덱스 경로/캐스트 설정에 대해서는 <a href="/docs/ko/json-indexing.md#Understand-cast-types">JSON 인덱싱을</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> element</td><td>예</td><td>예</td><td><code translate="no">tags[0]</code> 와 같이 인덱스를 통해 특정 요소를 일치시킵니다. 패턴 일치는 모든 요소를 스캔하지 <strong>않으며</strong>, 지정된 인덱스의 요소에만 적용됩니다.</td></tr>
<tr><td>숫자, 부울, 벡터, <code translate="no">TEXT</code> 또는 기타 문자열이 아닌 대상</td><td>아니요</td><td>아니요</td><td>패턴에는 문자열 값이 필요합니다.</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">LIKE 또는 정규 표현식(regex) 중 하나를 선택하십시오<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>문자열이 정확히 일치하는 경우 ` <code translate="no">==</code> `을 사용하고, 그렇지 않은 경우 다음 표에서 연산자를 선택하십시오:</p>
<table>
<thead>
<tr><th>요구 사항</th><th>권장 연산자</th><th>예시</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>문자열의 정확한 일치</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td><code translate="no">active</code> 라는 문자열과 정확히 일치합니다.</td></tr>
<tr><td>간단한 접두사 일치</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td><code translate="no">Prod</code> 로 시작하는 문자열과 일치합니다.</td></tr>
<tr><td>단순 접미사 일치</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td><code translate="no">.json</code> 로 끝나는 문자열과 일치합니다.</td></tr>
<tr><td>단순 포함 일치</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>문자열의 어느 위치에나 <code translate="no">vector database</code> 가 포함된 값과 일치합니다.</td></tr>
<tr><td>구조화된 코드 또는 고정 길이 패턴 일치</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>대소문자를 구분하여 <code translate="no">E</code> 뒤에 네 자리 숫자가 오는 문자열(예: <code translate="no">E1001</code>)과 일치합니다.</td></tr>
<tr><td>대소문자를 구분하지 않는 패턴 일치</td><td><code translate="no">=~</code> 다음과 같이 <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td><code translate="no">error</code>, <code translate="no">ERROR</code> 또는 기타 대소문자 변형과 일치합니다.</td></tr>
<tr><td>정규식 패턴과 일치하는 값 제외</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td><code translate="no">DEBUG</code> 로 시작하는 문자열을 제외합니다.</td></tr>
</tbody>
</table>
<h2 id="Use-LIKE" class="common-anchor-header">LIKE 사용<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">LIKE</code> 연산자는 문자열 값에 대한 간단한 와일드카드 일치를 위한 것입니다. 다음 와일드카드만 지원합니다:</p>
<table>
<thead>
<tr><th>와일드카드</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>0개 이상의 문자와 일치합니다.</td></tr>
<tr><td><code translate="no">_</code></td><td>정확히 하나의 문자와 일치합니다.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">일반적인 LIKE 패턴<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">%</code> 및 <code translate="no">_</code> 의 위치를 사용하여 일치하는 문자열에서 고정 텍스트가 나타날 위치를 제어합니다.</p>
<table>
<thead>
<tr><th>필수 조건</th><th>패턴</th><th>필터 예시</th></tr>
</thead>
<tbody>
<tr><td>접두사로 시작하는 경우</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>접미사로 끝남</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>부분 문자열 포함</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>고정된 위치의 한 글자와 일치</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">LIKE 일치 동작<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>접두사, 접미사, 포함 및 고정 위치의 단일 문자 일치를 위해서는 <code translate="no">LIKE</code> 를 사용하십시오. <code translate="no">LIKE</code> 는 <code translate="no">[0-9]</code> 와 같은 문자 클래스, <code translate="no">error|failed</code> 와 같은 선택, <code translate="no">{4}</code> 와 같은 반복 횟수, <code translate="no">^</code> 또는 <code translate="no">$</code> 와 같은 앵커, <code translate="no">(?i)</code> 와 같은 대소문자 구분 없음 플래그를 지원하지 않습니다. 이러한 패턴의 경우 정규식을 사용하십시오.</p>
<h3 id="Escaping-wildcards-in-a-LIKE-pattern" class="common-anchor-header">LIKE 패턴에서 와일드카드 이스케이프 처리<button data-href="#Escaping-wildcards-in-a-LIKE-pattern" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">%</code>, <code translate="no">_</code> 또는 <code translate="no">\</code> 와 같은 리터럴 값을 그대로 일치시키려면, 해당 문자에 백슬래시(<code translate="no">\</code>)를 사용하여 이스케이프 처리하십시오:</p>
<ul>
<li><code translate="no">name LIKE r&quot;\%&quot;</code> <code translate="no">%</code> 이라는 리터럴 값과 일치합니다.</li>
<li><code translate="no">name LIKE r&quot;\_%&quot;</code> 리터럴 <code translate="no">_</code> 로 시작하는 값과 일치합니다.</li>
<li><code translate="no">name LIKE r&quot;\\%&quot;</code> 리터럴 백슬래시로 시작하는 값과 일치합니다.</li>
</ul>
<p><code translate="no">r&quot;...&quot;</code> 또는 <code translate="no">r'...'</code> 형태로 작성된 원시 문자열 리터럴은 Milvus 필터 표현식에서 백슬래시를 그대로 유지합니다. 백슬래시가 포함된 <code translate="no">LIKE</code> 및 정규식 패턴의 경우 원시 문자열을 사용하는 것이 권장됩니다. 원시 문자열을 사용하지 않으면 일반 문자열 리터럴은 패턴이 평가되기 전에 이스케이프 시퀀스를 처리하므로, 더 많은 백슬래시가 필요할 수 있습니다.</p>
<h2 id="Use-regex" class="common-anchor-header">정규 표현식 사용<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>정규 표현식은 문자 클래스, 반복, 선택, 앵커 및 대소문자 구분 없는 일치를 지원합니다. <code translate="no">=~</code> 또는 <code translate="no">!~</code> 의 오른쪽 피연산자는 문자열 리터럴이어야 합니다:</p>
<table>
<thead>
<tr><th>연산자</th><th>의미</th><th>예시</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>정규식 패턴을 만족하는 값과 일치합니다.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>정규식 패턴을 만족하는 값을 제외합니다.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Using-raw-string-literals" class="common-anchor-header">원시 문자열 리터럴 사용<button data-href="#Using-raw-string-literals" class="anchor-icon" translate="no">
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
    </button></h3><p>일반 필터 문자열에서 불필요한 이스케이프를 피하기 위해, 원시 문자열 리터럴(<code translate="no">r&quot;...&quot;</code> 또는 <code translate="no">r'...'</code>)을 사용하여 백슬래시를 그대로 RE2에 전달합니다:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">r&#x27;filename =~ r&quot;\.json$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;filename =~ r\&quot;\\.json$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`filename =~ r&quot;\.json$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;filename =~ r&quot;\.json$&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(filename =~ r&quot;\.json$&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;filename =~ r&quot;\\.json$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;filename =~ r\&quot;\\.json$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;filename =~ r&quot;\.json$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이는 <code translate="no">report.json</code> 과 같이 <code translate="no">.json</code> 로 끝나는 문자열과 일치합니다.</p>
<p>Milvus 필터 표현식에 원시 문자열이 포함되지 않은 경우, 일반 문자열 리터럴은 정규식 패턴이 평가되기 전에 이스케이프 시퀀스를 처리합니다. 따라서 이스케이프된 리터럴 문자는 호스트 언어 문자열에서 추가적인 백슬래시가 필요할 수 있습니다.</p>
<h3 id="Common-regex-patterns" class="common-anchor-header">일반적인 정규 표현식 패턴<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 예제는 Milvus 필터 표현식에서 흔히 사용되는 RE2 구문을 보여줍니다. 전체 정규 표현식 구문에 대해서는 <a href="https://github.com/google/re2/wiki/syntax">RE2 구문</a> 참조를 확인하십시오.</p>
<table>
<thead>
<tr><th>요구 사항</th><th>패턴</th><th>필터 예시</th></tr>
</thead>
<tbody>
<tr><td>리터럴 텍스트 포함</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>접두사로 시작</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>접미사로 끝남</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>숫자 시퀀스와 일치</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>고정된 자릿수의 숫자와 일치</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>이메일 도메인과 일치</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>대소문자를 구분하지 않고 일치</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>전체 문자열과 일치</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>여러 단어 중 하나와 일치시키려면 <code translate="no">|</code> 를 사용하여 선택지를 지정합니다:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message =~ \&quot;error|failed|timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message =~ &quot;error|failed|timeout&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;message =~ &quot;error|failed|timeout&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(message =~ &quot;error|failed|timeout&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;message =~ \&quot;error|failed|timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>정규 표현식 메타문자를 리터럴로 일치시키려면, 정규 표현식 패턴에서 해당 문자를 이스케이프 처리해야 합니다. 예를 들어, 리터럴 점(정규 표현식에서 `<code translate="no">\.</code> `)을 일치시키려면, Python, Java, Go 또는 Node.js 소스 문자열에 ` <code translate="no">\\.</code> `를 작성합니다:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;email =~ \&quot;@gmail\\.com$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`email =~ &quot;@gmail\\.com$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;email =~ &quot;@gmail\.com$&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(email =~ &quot;@gmail\\.com$&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;email =~ \&quot;@gmail\\.com$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Milvus는 <a href="https://github.com/google/re2/wiki/syntax">RE2에서</a> 지원하지 않는 유효하지 않은 정규 표현식 패턴 및 구문을 거부합니다.</p>
</div>
<h3 id="Matching-behavior" class="common-anchor-header">일치 동작<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>부분 문자열 일치</strong></p>
<p>Milvus의 정규식 일치 처리는 부분 문자열 의미를 사용합니다. 패턴이 필드 값 전체와 일치할 필요는 없습니다. 예를 들어, 다음 필터는 <code translate="no">E1001</code> 과 <code translate="no">failed with E1001 after retry</code> 모두에 일치합니다:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message =~ &quot;E[0-9]{4}&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;message =~ &quot;E[0-9]{4}&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(message =~ &quot;E[0-9]{4}&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>필드 값 전체와 일치시키려면 <code translate="no">^</code> 및 <code translate="no">$</code> 앵커를 사용하십시오:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;code =~ \&quot;^E[0-9]{4}$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
filter := <span class="hljs-string">`code =~ &quot;^E[0-9]{4}$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;code =~ &quot;^E[0-9]{4}$&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(code =~ &quot;^E[0-9]{4}$&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;code =~ \&quot;^E[0-9]{4}$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
filter=<span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Null이 허용되는 VARCHAR 필드</strong></p>
<p>정규식 필터는 null 값과 일치하지 않습니다. 이는 <code translate="no">=~</code> 및 <code translate="no">!~</code> 모두에 적용됩니다. 정규식 패턴을 제외하되 null 값은 유지하려면 <code translate="no">OR field IS NULL</code> 를 명시적으로 추가하십시오:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message !~ \&quot;^DEBUG\&quot; OR message IS NULL&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message !~ &quot;^DEBUG&quot; OR message IS NULL`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;message !~ &quot;^DEBUG&quot; OR message IS NULL&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(message !~ &quot;^DEBUG&quot; OR message IS NULL)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;message !~ \&quot;^DEBUG\&quot; OR message IS NULL&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>JSON 경로</strong></p>
<p>JSON 경로의 경우, 경로가 누락되었거나 null이거나 문자열이 아닌 값으로 해석될 때 정규식 필터의 동작이 달라집니다:</p>
<table>
<thead>
<tr><th>필터</th><th>누락/null/문자가 아닌 값을 포함하나요?</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>아니요</td><td>정규식 패턴을 만족하는 문자열 값만 일치시킵니다.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>예</td><td>경로가 누락되었거나, null이거나, 문자열이 아니거나, 정규식 패턴과 일치하지 않는 문자열인 엔티티를 반환합니다.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">인덱스를 사용하여 패턴 일치 속도 향상<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>패턴 매칭은 스칼라 인덱스 없이도 작동합니다. 가속화 옵션 및 해당 적용 조건에 대해서는 <a href="/docs/ko/scalar_index.md#String-pattern-indexes">‘문자열 패턴 인덱스 선택’을</a> 참조하십시오. JSON 경로 인덱스의 경우, <a href="/docs/ko/json-indexing.md#Index-requirements">JSON 관련 필수</a> 조건을 확인하십시오.</p>
<div class="alert note">
<p>쿼리 계획 단계에서 와일드카드가 없는 LIKE 표현식을 등가 조건으로 단순화하거나, 앵커가 지정된 간단한 정규식을 등가, 접두사 또는 접미사 일치 조건으로 단순화할 수 있습니다. 예를 들어, ` <code translate="no">name =~ &quot;^abc$&quot;</code> `는 등가 테스트로 변환되며 등가 조회 지원 규칙을 따릅니다. 단순화 후의 연산에 대한 인덱스 지원 여부를 확인해야 하며, 원래 표현식에 작성된 연산자에 대한 지원 여부만 확인해서는 안 됩니다.</p>
</div>
