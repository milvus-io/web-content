---
id: pinyin-filter.md
title: 병음Compatible with Milvus 3.0.x
summary: '병음 필터는 텍스트 분석 과정에서 한자 토큰을 병음 토큰으로 변환하여, 중국어 텍스트에 대해 병음 기반의 일치 검색을 가능하게 합니다.'
beta: Milvus 3.0.x
---
<h1 id="Pinyin" class="common-anchor-header">병음<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Pinyin" class="anchor-icon" translate="no">
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
    </button></h1><p>중국어 텍스트 검색에서는 사용자가 색인된 텍스트에 표시된 그대로 한자를 정확히 입력해야 하는 경우가 많습니다. 이름 조회, 자동 완성 및 입력 시 실시간 검색과 같은 워크플로우에서 사용자는 한자 대신 병음을 입력하는 경우가 많습니다. 예를 들어, 사용자는 <code translate="no">足球</code> 을 검색하기 위해 <code translate="no">zuqiu</code> 을 입력할 수 있습니다. <code translate="no">pinyin</code> 필터는 분석기 출력에 병음 토큰을 추가하여, 별도의 병음 필드를 유지 관리하지 않고도 중국어 텍스트가 병음 입력과 일치할 수 있도록 합니다.</p>
<p><code translate="no">pinyin</code> 필터는 일반적으로 중국어 텍스트를 처리하는 <a href="/docs/ko/jieba-tokenizer.md">Jieba</a> 토큰화기와 함께 사용됩니다. 이 필터는 사용자 정의 분석기 필터 파이프라인에서 작동하며, 동일한 중국어 토큰에 대해 여러 형태의 병음 토큰을 출력할 수 있습니다.</p>
<h2 id="Configuration" class="common-anchor-header">구성<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>기본 옵션을 사용하려면 <code translate="no">analyzer_params</code> 의 <code translate="no">filter</code> 섹션에서 <code translate="no">&quot;pinyin&quot;</code> 을 지정하십시오.</p>
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
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;pinyin&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;pinyin&quot;</span>},
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
    {<span class="hljs-string">&quot;filter&quot;</span>, {<span class="hljs-string">&quot;pinyin&quot;</span>}}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,
    [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;pinyin&quot;</span> }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;jieba&quot;,
  &quot;filter&quot;: [&quot;pinyin&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 약식 설정은 원본 중국어 토큰을 유지하면서 문자 단위의 병음 토큰을 출력합니다. 해당 옵션을 명시적으로 활성화하지 않는 한, 결합된 병음이나 병음 초성만으로는 토큰을 출력하지 않습니다.</p>
<p>모든 설정을 직접 제어하려면 필터를 객체로 지정하고 Milvus가 생성하는 병음 토큰 형식을 구성하십시오.</p>
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
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;filter&quot;</span>: [</span>
<span class="highlighted-comment-line">        {</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">False</span>,</span>
<span class="highlighted-comment-line">        }</span>
<span class="highlighted-comment-line">    ],</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
Map&lt;String, Object&gt; pinyinFilter = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
pinyinFilter.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;pinyin&quot;</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_original&quot;</span>, <span class="hljs-literal">true</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>, <span class="hljs-literal">true</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>, <span class="hljs-literal">false</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(pinyinFilter));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        {
            <span class="hljs-string">&quot;type&quot;</span>:                       <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>:              <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>:           <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>:    <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">false</span>,
        },
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">false</span>
        }
    ]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
    {<span class="hljs-string">&quot;filter&quot;</span>, {
        {
            {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;pinyin&quot;</span>},
            {<span class="hljs-string">&quot;keep_original&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>},
            {<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>, <span class="hljs-literal">false</span>}
        }
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">false</span>,
        },
    ],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,
    [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;pinyin&quot;</span>,
            [<span class="hljs-string">&quot;keep_original&quot;</span>] = <span class="hljs-literal">true</span>,
            [<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>] = <span class="hljs-literal">true</span>,
            [<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>] = <span class="hljs-literal">false</span>,
            [<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>] = <span class="hljs-literal">false</span>
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;jieba&quot;,
  &quot;filter&quot;: [
    {
      &quot;type&quot;: &quot;pinyin&quot;,
      &quot;keep_original&quot;: true,
      &quot;keep_full_pinyin&quot;: true,
      &quot;keep_joined_full_pinyin&quot;: false,
      &quot;keep_separate_first_letter&quot;: false
    }
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 필터는 다음 매개변수를 지원합니다.</p>
<table>
<thead>
<tr><th>매개변수</th><th>유형</th><th>기본값</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">keep_original</code></td><td>부울</td><td><code translate="no">true</code></td><td>분석기 출력에 원본 중국어 토큰을 유지합니다.</td></tr>
<tr><td><code translate="no">keep_full_pinyin</code></td><td>부울</td><td><code translate="no">true</code></td><td>문자 수준의 병음 토큰을 출력합니다. 예를 들어, " <code translate="no">中文</code> "는 " <code translate="no">zhong</code> " 및 " <code translate="no">wen</code>"를 생성합니다.</td></tr>
<tr><td><code translate="no">keep_joined_full_pinyin</code></td><td>부울</td><td><code translate="no">false</code></td><td>각 소스 토큰에 대해 결합된 병음 토큰을 출력합니다. 예를 들어, <code translate="no">中文</code> 는 <code translate="no">zhongwen</code> 를 생성합니다.</td></tr>
<tr><td><code translate="no">keep_separate_first_letter</code></td><td>부울</td><td><code translate="no">false</code></td><td>각 소스 토큰에 대해 병음 이니셜 토큰을 출력합니다. 예를 들어, <code translate="no">中文</code> 는 <code translate="no">zw</code> 를 생성합니다.</td></tr>
</tbody>
</table>
<p>이 필터는 토큰화기가 생성한 토큰을 대상으로 작동합니다. 중국어 텍스트의 경우, <code translate="no">jieba</code> 와 같은 토큰화기와 함께 사용하십시오.</p>
<h2 id="Examples" class="common-anchor-header">예시<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>분석기 구성을 컬렉션 스키마에 적용하기 전에, <code translate="no">run_analyzer</code> 을 사용하여 동작을 확인하십시오.</p>
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

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

sample_text = <span class="hljs-string">&quot;中文测试&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;中文测试&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;中文测试&quot;</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">sample_text</span> = <span class="hljs-string">&quot;中文测试&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

std::string sample_text = <span class="hljs-string">&quot;中文测试&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;中文测试&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> sampleText = <span class="hljs-string">&quot;中文测试&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-comment"># The run_analyzer request is sent directly to the endpoint below.</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-text-with-character-level-Pinyin" class="common-anchor-header">중국어 텍스트를 문자 단위 병음과 매칭<button data-href="#Match-Chinese-text-with-character-level-Pinyin" class="anchor-icon" translate="no">
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
    </button></h3><p>기본 <code translate="no">pinyin</code> 필터는 원본 중국어 토큰을 유지하면서 문자 단위 병음 토큰을 출력합니다.</p>
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
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(<span class="hljs-string">&quot;pinyin&quot;</span>));

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;pinyin&quot;</span>},
}

option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">result</span> = client
    .<span class="hljs-title function_ invoke__">run_analyzer</span>(
        RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">texts</span>(<span class="hljs-built_in">vec!</span>[sample_text])
            .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
    {<span class="hljs-string">&quot;filter&quot;</span>, {<span class="hljs-string">&quot;pinyin&quot;</span>}}
};

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                       .<span class="hljs-built_in">AddText</span>(sample_text)
                       .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-attr">filter</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>],
};

<span class="hljs-keyword">const</span> char_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
    <span class="hljs-attr">text</span>: sample_text,
    analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(char_result.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,
    [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;pinyin&quot;</span> }
};

RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { sampleText }
});
Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, result.Results.SelectMany(r =&gt; r.Tokens).Select(t =&gt; t.Token)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
        &quot;text&quot;: [&quot;中文测试&quot;],
        &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;: \&quot;jieba\&quot;, \&quot;filter\&quot;: [\&quot;pinyin\&quot;]}&quot;
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력:</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zhong&#x27;, &#x27;wen&#x27;, &#x27;测试&#x27;, &#x27;ce&#x27;, &#x27;shi&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-terms-with-joined-Pinyin" class="common-anchor-header">중국어 용어를 결합된 병음과 매칭<button data-href="#Match-Chinese-terms-with-joined-Pinyin" class="anchor-icon" translate="no">
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
    </button></h3><p>중국어 용어를 완전한 결합형 병음 형태와 매칭해야 할 때는 ‘ <code translate="no">keep_joined_full_pinyin</code> ’를 활성화하세요.</p>
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
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">False</span>,
        }
    ],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
Map&lt;String, Object&gt; pinyinFilter = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
pinyinFilter.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;pinyin&quot;</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_original&quot;</span>, <span class="hljs-literal">true</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>, <span class="hljs-literal">true</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>, <span class="hljs-literal">false</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(pinyinFilter));

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        {
            <span class="hljs-string">&quot;type&quot;</span>:                       <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>:              <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>:           <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>:    <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">false</span>,
        },
    },
}

option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">false</span>
        }
    ]
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">result</span> = client
    .<span class="hljs-title function_ invoke__">run_analyzer</span>(
        RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">texts</span>(<span class="hljs-built_in">vec!</span>[sample_text])
            .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
    {<span class="hljs-string">&quot;filter&quot;</span>, {
        {
            {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;pinyin&quot;</span>},
            {<span class="hljs-string">&quot;keep_original&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>},
            {<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>, <span class="hljs-literal">false</span>}
        }
    }}
};

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                       .<span class="hljs-built_in">AddText</span>(sample_text)
                       .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-attr">filter</span>: [
        {
            <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-attr">keep_original</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">keep_full_pinyin</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">keep_joined_full_pinyin</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">keep_separate_first_letter</span>: <span class="hljs-literal">false</span>,
        },
    ],
};

<span class="hljs-keyword">const</span> joined_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
    <span class="hljs-attr">text</span>: sample_text,
    analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(joined_result.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,
    [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;pinyin&quot;</span>,
            [<span class="hljs-string">&quot;keep_original&quot;</span>] = <span class="hljs-literal">true</span>,
            [<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>] = <span class="hljs-literal">false</span>,
            [<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>] = <span class="hljs-literal">true</span>,
            [<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>] = <span class="hljs-literal">false</span>
        }
    }
};

RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { sampleText }
});
Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, result.Results.SelectMany(r =&gt; r.Tokens).Select(t =&gt; t.Token)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
        &quot;text&quot;: [&quot;中文测试&quot;],
        &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;: \&quot;jieba\&quot;, \&quot;filter\&quot;: [{\&quot;type\&quot;: \&quot;pinyin\&quot;, \&quot;keep_original\&quot;: true, \&quot;keep_full_pinyin\&quot;: false, \&quot;keep_joined_full_pinyin\&quot;: true, \&quot;keep_separate_first_letter\&quot;: false}]}&quot;
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력:</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zhongwen&#x27;, &#x27;测试&#x27;, &#x27;ceshi&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-Chinese-terms-with-Pinyin-initials" class="common-anchor-header">중국어 용어와 병음의 첫 글자를 매칭<button data-href="#Match-Chinese-terms-with-Pinyin-initials" class="anchor-icon" translate="no">
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
    </button></h3><p>중국어 용어를 해당 병음 형태의 초성과 일치시켜야 할 때는 ‘ <code translate="no">keep_separate_first_letter</code> ’를 활성화하세요.</p>
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
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">False</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">True</span>,
        }
    ],
}

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
Map&lt;String, Object&gt; pinyinFilter = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
pinyinFilter.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;pinyin&quot;</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_original&quot;</span>, <span class="hljs-literal">true</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>);
pinyinFilter.put(<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>, <span class="hljs-literal">true</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>, Collections.singletonList(pinyinFilter));

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        {
            <span class="hljs-string">&quot;type&quot;</span>:                       <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>:              <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>:           <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>:    <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">true</span>,
        },
    },
}

option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-string">&quot;keep_original&quot;</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">&quot;keep_full_pinyin&quot;</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>: <span class="hljs-literal">true</span>
        }
    ]
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">result</span> = client
    .<span class="hljs-title function_ invoke__">run_analyzer</span>(
        RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">texts</span>(<span class="hljs-built_in">vec!</span>[sample_text])
            .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>},
    {<span class="hljs-string">&quot;filter&quot;</span>, {
        {
            {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;pinyin&quot;</span>},
            {<span class="hljs-string">&quot;keep_original&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>},
            {<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>, <span class="hljs-literal">false</span>},
            {<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>, <span class="hljs-literal">true</span>}
        }
    }}
};

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                       .<span class="hljs-built_in">AddText</span>(sample_text)
                       .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-attr">filter</span>: [
        {
            <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;pinyin&quot;</span>,
            <span class="hljs-attr">keep_original</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">keep_full_pinyin</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">keep_joined_full_pinyin</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">keep_separate_first_letter</span>: <span class="hljs-literal">true</span>,
        },
    ],
};

<span class="hljs-keyword">const</span> initials_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
    <span class="hljs-attr">text</span>: sample_text,
    analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(initials_result.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>,
    [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;pinyin&quot;</span>,
            [<span class="hljs-string">&quot;keep_original&quot;</span>] = <span class="hljs-literal">true</span>,
            [<span class="hljs-string">&quot;keep_full_pinyin&quot;</span>] = <span class="hljs-literal">false</span>,
            [<span class="hljs-string">&quot;keep_joined_full_pinyin&quot;</span>] = <span class="hljs-literal">false</span>,
            [<span class="hljs-string">&quot;keep_separate_first_letter&quot;</span>] = <span class="hljs-literal">true</span>
        }
    }
};

RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { sampleText }
});
Console.WriteLine(<span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, result.Results.SelectMany(r =&gt; r.Tokens).Select(t =&gt; t.Token)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
        &quot;text&quot;: [&quot;中文测试&quot;],
        &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;: \&quot;jieba\&quot;, \&quot;filter\&quot;: [{\&quot;type\&quot;: \&quot;pinyin\&quot;, \&quot;keep_original\&quot;: true, \&quot;keep_full_pinyin\&quot;: false, \&quot;keep_joined_full_pinyin\&quot;: false, \&quot;keep_separate_first_letter\&quot;: true}]}&quot;
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력:</p>
<pre><code translate="no" class="language-plaintext">[&#x27;中文&#x27;, &#x27;zw&#x27;, &#x27;测试&#x27;, &#x27;cs&#x27;]
<button class="copy-code-btn"></button></code></pre>
