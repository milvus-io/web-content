---
id: multi-language-analyzers.md
title: 다중 언어 분석기Compatible with Milvus 2.5.11+
summary: >-
  Milvus는 텍스트 분석을 수행할 때 일반적으로 컬렉션의 전체 텍스트 필드에 단일 분석기를 적용합니다. 이 분석기가 영어에 최적화된 경우
  중국어, 스페인어 또는 프랑스어와 같은 다른 언어에 필요한 토큰화 및 어간 규칙이 매우 달라서 리콜률이 낮아질 수 있습니다. 예를 들어,
  스페인어 단어 "teléfono"('전화'라는 뜻)를 검색하면 영어에 초점을 맞춘 분석기가 악센트를 삭제하고 스페인어 전용 어간을 적용하지
  않아 관련 결과를 간과하게 될 수 있습니다.
beta: Milvus 2.5.11+
---

<h1 id="Multi-language-Analyzers" class="common-anchor-header">다중 언어 분석기<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Multi-language-Analyzers" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 텍스트 분석을 수행할 때 일반적으로 컬렉션의 전체 텍스트 필드에 단일 분석기를 적용합니다. 해당 분석기가 영어에 최적화된 경우 중국어, 스페인어 또는 프랑스어와 같은 다른 언어에서 요구하는 매우 다른 토큰화 및 어간 규칙에 어려움을 겪게 되며, 그 결과 리콜률이 낮아지게 됩니다. 예를 들어, 스페인어 단어 <em>"teléfono</em> "( <em>'전화'라는</em> 뜻)를 검색하면 영어 중심의 분석기가 악센트를 삭제하고 스페인어 전용 어간을 적용하지 않아 관련 결과를 간과할 수 있습니다.</p>
<p>다국어 분석기는 단일 컬렉션에서 텍스트 필드에 대해 여러 분석기를 구성할 수 있도록 함으로써 이 문제를 해결합니다. 이렇게 하면 텍스트 필드에 다국어 문서를 저장할 수 있으며, Milvus는 각 문서에 적합한 언어 규칙에 따라 텍스트를 분석합니다.</p>
<h2 id="Limits" class="common-anchor-header">제한 사항<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>이 기능은 BM25 기반 텍스트 검색 및 스파스 벡터에서만 작동합니다. 자세한 내용은 <a href="/docs/ko/v2.5.x/full-text-search.md">전체 텍스트 검색을</a> 참조하세요.</p></li>
<li><p>단일 컬렉션의 각 문서는 언어 식별자 필드 값에 따라 결정되는 하나의 분석기만 사용할 수 있습니다.</p></li>
<li><p>성능은 분석기의 복잡성과 텍스트 데이터의 크기에 따라 달라질 수 있습니다.</p></li>
</ul>
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
    </button></h2><p>다음 다이어그램은 Milvus에서 다중 언어 분석기를 구성하고 사용하는 워크플로우를 보여줍니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-language-analyzers-workflow.png" alt="Multi Language Analyzers Workflow" class="doc-image" id="multi-language-analyzers-workflow" />
   </span> <span class="img-wrapper"> <span>다중 언어 분석기 워크플로</span> </span></p>
<ol>
<li><p><strong>다중 언어 분석기를 구성합니다</strong>:</p>
<ul>
<li><p>형식을 사용하여 여러 언어별 분석기를 설정합니다: <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code> 여기서 각 <code translate="no">analyzer_config</code> 은 <a href="/docs/ko/v2.5.x/analyzer-overview.md#Analyzer-types">분석기 개요에</a> 설명된 대로 표준 <code translate="no">analyzer_params</code> 구성을 따릅니다.</p></li>
<li><p>각 문서에 대한 분석기 선택을 결정할 특수 식별자 필드를 정의합니다.</p></li>
<li><p>알 수 없는 언어를 처리하기 위해 <code translate="no">default</code> 분석기를 구성합니다.</p></li>
</ul></li>
<li><p><strong>컬렉션 만들기</strong>:</p>
<ul>
<li><p>필수 필드가 포함된 스키마를 정의합니다:</p>
<ul>
<li><p><strong>primary_key</strong>: 고유한 문서 식별자입니다.</p></li>
<li><p><strong>text_field</strong>: 원본 텍스트 콘텐츠를 저장합니다.</p></li>
<li><p><strong>identifier_field</strong>: 각 문서에 사용할 분석기를 나타냅니다.</p></li>
<li><p><strong>벡터_필드</strong>: BM25 함수에 의해 생성될 스파스 임베딩을 저장합니다.</p></li>
</ul></li>
<li><p>BM25 함수와 인덱싱 매개변수를 구성합니다.</p></li>
</ul></li>
<li><p><strong>언어 식별자가 있는 데이터 삽입</strong>:</p>
<ul>
<li><p>다양한 언어로 된 텍스트가 포함된 문서를 추가하며, 각 문서에는 사용할 분석기를 지정하는 식별자 값이 포함됩니다.</p></li>
<li><p>Milvus는 식별자 필드에 따라 적절한 분석기를 선택하며, 알 수 없는 식별자가 있는 문서는 <code translate="no">default</code> 분석기를 사용합니다.</p></li>
</ul></li>
<li><p><strong>언어별 분석기로 검색하기</strong>:</p>
<ul>
<li><p>분석기 이름을 지정한 쿼리 텍스트를 입력하면 Milvus가 지정한 분석기를 사용하여 쿼리를 처리합니다.</p></li>
<li><p>토큰화는 언어별 규칙에 따라 이루어지며, 검색은 유사도에 따라 언어에 적합한 결과를 반환합니다.</p></li>
</ul></li>
</ol>
<h2 id="Step-1-Configure-multianalyzerparams" class="common-anchor-header">1단계: multi_analyzer_params 구성하기<button data-href="#Step-1-Configure-multianalyzerparams" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">multi_analyzer_params</code> 은 Milvus가 각 엔티티에 적합한 분석기를 선택하는 방법을 결정하는 단일 JSON 객체입니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">multi_analyzer_params = {
  <span class="hljs-comment"># Define language-specific analyzers</span>
  <span class="hljs-comment"># Each analyzer follows this format: &lt;analyzer_name&gt;: &lt;analyzer_params&gt;</span>
  <span class="hljs-string">&quot;analyzers&quot;</span>: {
    <span class="hljs-string">&quot;english&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},          <span class="hljs-comment"># English-optimized analyzer</span>
    <span class="hljs-string">&quot;chinese&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>},          <span class="hljs-comment"># Chinese-optimized analyzer</span>
    <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>}          <span class="hljs-comment"># Required fallback analyzer</span>
  },
  <span class="hljs-string">&quot;by_field&quot;</span>: <span class="hljs-string">&quot;language&quot;</span>,                    <span class="hljs-comment"># Field determining analyzer selection</span>
  <span class="hljs-string">&quot;alias&quot;</span>: {
    <span class="hljs-string">&quot;cn&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,                         <span class="hljs-comment"># Use &quot;cn&quot; as shorthand for Chinese</span>
    <span class="hljs-string">&quot;en&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>                          <span class="hljs-comment"># Use &quot;en&quot; as shorthand for English</span>
  }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
    }});
    put(<span class="hljs-string">&quot;chinese&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>);
    }});
    put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;icu&quot;</span>);
    }});
}});
analyzerParams.put(<span class="hljs-string">&quot;by_field&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;alias&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;cn&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>);
    put(<span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> multi_analyzer_params = {
  <span class="hljs-comment">// Define language-specific analyzers</span>
  <span class="hljs-comment">// Each analyzer follows this format: &lt;analyzer_name&gt;: &lt;analyzer_params&gt;</span>
  <span class="hljs-string">&quot;analyzers&quot;</span>: {
    <span class="hljs-string">&quot;english&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},          # <span class="hljs-title class_">English</span>-optimized analyzer
    <span class="hljs-string">&quot;chinese&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>},          # <span class="hljs-title class_">Chinese</span>-optimized analyzer
    <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>}          # <span class="hljs-title class_">Required</span> fallback analyzer
  },
  <span class="hljs-string">&quot;by_field&quot;</span>: <span class="hljs-string">&quot;language&quot;</span>,                    # <span class="hljs-title class_">Field</span> determining analyzer selection
  <span class="hljs-string">&quot;alias&quot;</span>: {
    <span class="hljs-string">&quot;cn&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,                         # <span class="hljs-title class_">Use</span> <span class="hljs-string">&quot;cn&quot;</span> <span class="hljs-keyword">as</span> shorthand <span class="hljs-keyword">for</span> <span class="hljs-title class_">Chinese</span>
    <span class="hljs-string">&quot;en&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>                          # <span class="hljs-title class_">Use</span> <span class="hljs-string">&quot;en&quot;</span> <span class="hljs-keyword">as</span> shorthand <span class="hljs-keyword">for</span> <span class="hljs-title class_">English</span>
  }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">multiAnalyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;english&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
        <span class="hljs-string">&quot;chinese&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>},
        <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>},
    },
    <span class="hljs-string">&quot;by_field&quot;</span>: <span class="hljs-string">&quot;language&quot;</span>,
    <span class="hljs-string">&quot;alias&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;cn&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,
        <span class="hljs-string">&quot;en&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> multi_analyzer_params=<span class="hljs-string">&#x27;{
  &quot;analyzers&quot;: {
    &quot;english&quot;: {
      &quot;type&quot;: &quot;english&quot;
    },
    &quot;chinese&quot;: {
      &quot;type&quot;: &quot;chinese&quot;
    },
    &quot;default&quot;: {
      &quot;tokenizer&quot;: &quot;icu&quot;
    }
  },
  &quot;by_field&quot;: &quot;language&quot;,
  &quot;alias&quot;: {
    &quot;cn&quot;: &quot;chinese&quot;,
    &quot;en&quot;: &quot;english&quot;
  }
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>

<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>필수?</p></th>
     <th><p>설명</p></th>
     <th><p>Rules</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">analyzers</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Milvus에서 텍스트를 처리하는 데 사용할 수 있는 모든 언어별 분석기를 나열합니다. <code translate="no">analyzers</code> 의 각 분석기는 다음 형식을 따릅니다: <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_params&gt;</code>.</p></td>
     <td><ul>
<li>표준 <code translate="no">analyzer_params</code> 구문을 사용하여 각 분석기를 정의하세요( <a href="/docs/ko/v2.5.x/analyzer-overview.md#Analyzer-types">분석기 개요</a> 참조).</li>
<li>키가 <code translate="no">default</code> 인 항목을 추가하면 <code translate="no">by_field</code> 에 저장된 값이 다른 분석기 이름과 일치하지 않을 때마다 Milvus가 이 분석기로 되돌아갑니다.</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">by_field</code></p></td>
     <td><p>예</p></td>
     <td><p>모든 문서에 대해 Milvus가 적용해야 하는 언어(즉, 분석기 이름)를 저장하는 필드의 이름입니다.</p></td>
     <td><ul>
<li><p>컬렉션에 정의된 <code translate="no">VARCHAR</code> 필드여야 합니다.</p></li>
<li><p>모든 행의 값은 <code translate="no">analyzers</code> 에 나열된 분석기 이름(또는 별칭) 중 하나와 정확히 일치해야 합니다.</p></li>
<li><p>행의 값이 누락되었거나 찾을 수 없는 경우 Milvus는 자동으로 <code translate="no">default</code> 분석기를 적용합니다.</p></li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">alias</code></p></td>
     <td><p>No</p></td>
     <td><p>분석기에 대한 바로 가기 또는 대체 이름을 생성하여 코드에서 쉽게 참조할 수 있도록 합니다. 각 분석기는 하나 이상의 별칭을 가질 수 있습니다.</p></td>
     <td><p>각 별칭은 기존 분석기 키에 매핑되어야 합니다.</p></td>
   </tr>
</table>
<h2 id="Step-2-Create-collection" class="common-anchor-header">2단계: 컬렉션 만들기<button data-href="#Step-2-Create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>다국어를 지원하는 컬렉션을 만들려면 특정 필드와 인덱스를 구성해야 합니다:</p>
<h3 id="Add-fields" class="common-anchor-header">필드 추가</h3><p>이 단계에서는 네 가지 필수 필드로 컬렉션 스키마를 정의합니다:</p>
<ul>
<li><p><strong>기본 키 필드</strong> (<code translate="no">id</code>): 컬렉션의 각 엔티티에 대한 고유 식별자입니다. <code translate="no">auto_id=True</code> 을 설정하면 Milvus에서 이러한 ID를 자동으로 생성할 수 있습니다.</p></li>
<li><p><strong>언어 표시기 필드</strong> (<code translate="no">language</code>): 이 VARCHAR 필드는 <code translate="no">multi_analyzer_params</code> 에 지정된 <code translate="no">by_field</code> 에 해당합니다. 이 필드에는 각 엔티티의 언어 식별자가 저장되어 Milvus가 어떤 분석기를 사용할지 알려줍니다.</p></li>
<li><p><strong>텍스트 콘텐츠 필드</strong> (<code translate="no">text</code>): 이 VARCHAR 필드에는 분석 및 검색하려는 실제 텍스트 데이터가 저장됩니다. <code translate="no">enable_analyzer=True</code> 설정은 이 필드에 대한 텍스트 분석 기능을 활성화하기 때문에 매우 중요합니다. <code translate="no">multi_analyzer_params</code> 구성은 이 필드에 직접 첨부되어 텍스트 데이터와 언어별 분석기 간의 연결을 설정합니다.</p></li>
<li><p><strong>벡터 필드</strong> (<code translate="no">sparse</code>): 이 필드에는 BM25 함수에 의해 생성된 스파스 벡터가 저장됩니다. 이 벡터는 텍스트 데이터의 분석 가능한 형태를 나타내며 Milvus가 실제로 검색하는 것입니다.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Import required modules</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize client</span>
client = MilvusClient(
uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Initialize a new schema</span>
schema = client.create_schema()

<span class="hljs-comment"># Step 2.1: Add a primary key field for unique document identification</span>
schema.add_field(
field_name=<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-comment"># Field name</span>
datatype=DataType.INT64, <span class="hljs-comment"># Integer data type</span>
is_primary=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Designate as primary key</span>
auto_id=<span class="hljs-literal">True</span> <span class="hljs-comment"># Auto-generate IDs (recommended)</span>
)

<span class="hljs-comment"># Step 2.2: Add language identifier field</span>
<span class="hljs-comment"># This MUST match the &quot;by_field&quot; value in language_analyzer_config</span>
schema.add_field(
field_name=<span class="hljs-string">&quot;language&quot;</span>, <span class="hljs-comment"># Field name</span>
datatype=DataType.VARCHAR, <span class="hljs-comment"># String data type</span>
max_length=<span class="hljs-number">255</span> <span class="hljs-comment"># Maximum length (adjust as needed)</span>
)

<span class="hljs-comment"># Step 2.3: Add text content field with multi-language analysis capability</span>
schema.add_field(
field_name=<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-comment"># Field name</span>
datatype=DataType.VARCHAR, <span class="hljs-comment"># String data type</span>
max_length=<span class="hljs-number">8192</span>, <span class="hljs-comment"># Maximum length (adjust based on expected text size)</span>
enable_analyzer=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable text analysis</span>
multi_analyzer_params=multi_analyzer_params <span class="hljs-comment"># Connect with our language analyzers</span>
)

<span class="hljs-comment"># Step 2.4: Add sparse vector field to store the BM25 output</span>
schema.add_field(
field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Field name</span>
datatype=DataType.SPARSE_FLOAT_VECTOR <span class="hljs-comment"># Sparse vector data type</span>
)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.FlushReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
        
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
        
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;language&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">255</span>)
        .build());

collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">8192</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .multiAnalyzerParams(analyzerParams)
        .build());
        
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Initialize client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
});

<span class="hljs-comment">// Initialize schema array</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;language&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">255</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">8192</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">analyzer_params</span>: multi_analyzer_params,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

schema := entity.NewSchema()

schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;language&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">255</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">8192</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMultiAnalyzerParams(multiAnalyzerParams),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;id&quot;,
  &quot;dataType&quot;: &quot;Int64&quot;,
  &quot;isPrimary&quot;: true,
  &quot;autoID&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> languageField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;language&quot;,
  &quot;dataType&quot;: &quot;VarChar&quot;,
  &quot;elementTypeParams&quot;: {
    &quot;max_length&quot;: 255
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> textField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;text&quot;,
  &quot;dataType&quot;: &quot;VarChar&quot;,
  &quot;elementTypeParams&quot;: {
    &quot;max_length&quot;: 8192,
    &quot;enable_analyzer&quot;: true，
    &quot;multiAnalyzerParam&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$multi_analyzer_params</span>&quot;</span><span class="hljs-string">&#x27;
  },
}&#x27;</span>

<span class="hljs-built_in">export</span> sparseField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;sparse&quot;,
  &quot;dataType&quot;: &quot;SparseFloatVector&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-BM25-function" class="common-anchor-header">BM25 함수 정의</h3><p>원시 텍스트 데이터에서 스파스 벡터 표현을 생성하는 BM25 함수를 정의합니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create the BM25 function</span>
bm25_function = Function(
    name=<span class="hljs-string">&quot;text_to_vector&quot;</span>,            <span class="hljs-comment"># Descriptive function name</span>
    function_type=FunctionType.BM25,  <span class="hljs-comment"># Use BM25 algorithm</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],       <span class="hljs-comment"># Process text from this field</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>]     <span class="hljs-comment"># Store vectors in this field</span>
)

<span class="hljs-comment"># Add the function to our schema</span>
schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java">CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">function</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_to_vector&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;sparse&quot;</span>))
        .build();
collectionSchema.addFunction(function);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> functions = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_bm25_emb&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;bm25 function&quot;</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
    <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;text&quot;</span>],
    <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;sparse&quot;</span>],
    <span class="hljs-attr">params</span>: {},
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction()
schema.WithFunction(function.WithName(<span class="hljs-string">&quot;text_to_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;sparse&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> <span class="hljs-keyword">function</span>=<span class="hljs-string">&#x27;{
  &quot;name&quot;: &quot;text_to_vector&quot;,
  &quot;type&quot;: &quot;BM25&quot;,
  &quot;inputFieldNames&quot;: [&quot;text&quot;],
  &quot;outputFieldNames&quot;: [&quot;sparse&quot;]
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
  \&quot;autoID\&quot;: true,
  \&quot;fields\&quot;: [
    <span class="hljs-variable">$idField</span>,
    <span class="hljs-variable">$languageField</span>,
    <span class="hljs-variable">$textField</span>,
    <span class="hljs-variable">$sparseField</span>
  ],
  \&quot;functions\&quot;: [
    <span class="hljs-variable">$function</span>
  ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 함수는 언어 식별자에 따라 각 텍스트 항목에 적절한 분석기를 자동으로 적용합니다. BM25 기반 텍스트 검색에 대한 자세한 내용은 <a href="/docs/ko/v2.5.x/full-text-search.md">전체 텍스트 검색을</a> 참조하세요.</p>
<h3 id="Configure-index-params" class="common-anchor-header">색인 매개변수 구성</h3><p>효율적인 검색을 위해 스파스 벡터 필드에 인덱스를 생성합니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Configure index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add index for sparse vector field</span>
index_params.add_index(
field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Field to index (our vector field)</span>
index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Let Milvus choose optimal index type</span>
metric_type=<span class="hljs-string">&quot;BM25&quot;</span> <span class="hljs-comment"># Must be BM25 for this feature</span>
)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java">List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.BM25)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>
}];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">idx := index.NewAutoIndex(index.MetricType(entity.BM25))
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;multilingual_documents&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>, idx)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> IndexParams=<span class="hljs-string">&#x27;[
  {
    &quot;fieldName&quot;: &quot;sparse&quot;,
    &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
    &quot;metricType&quot;: &quot;BM25&quot;,
    &quot;params&quot;: {}
  }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 인덱스는 효율적인 BM25 유사도 계산을 위해 스파스 벡터를 구성하여 검색 성능을 향상시킵니다.</p>
<h3 id="Create-the-collection" class="common-anchor-header">컬렉션 만들기</h3><p>이 마지막 생성 단계에서는 이전의 모든 구성을 통합합니다:</p>
<ul>
<li><p><code translate="no">collection_name=&quot;multilang_demo&quot;</code> 나중에 참조할 수 있도록 컬렉션의 이름을 지정합니다.</p></li>
<li><p><code translate="no">schema=schema</code> 정의한 필드 구조와 기능을 적용합니다.</p></li>
<li><p><code translate="no">index_params=index_params</code> 효율적인 검색을 위한 인덱싱 전략을 구현합니다.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection</span>
COLLECTION_NAME = <span class="hljs-string">&quot;multilingual_documents&quot;</span>

<span class="hljs-comment"># Check if collection already exists</span>
<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
client.drop_collection(COLLECTION_NAME) <span class="hljs-comment"># Remove it for this example</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Dropped existing collection: <span class="hljs-subst">{COLLECTION_NAME}</span>&quot;</span>)

<span class="hljs-comment"># Create the collection</span>
client.create_collection(
collection_name=COLLECTION_NAME, <span class="hljs-comment"># Collection name</span>
schema=schema, <span class="hljs-comment"># Our multilingual schema</span>
index_params=index_params <span class="hljs-comment"># Our search index configuration</span>
)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java">client.dropCollection(DropCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .build());
        
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .collectionSchema(collectionSchema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;multilingual_documents&quot;</span>;

<span class="hljs-comment">// Create the collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">schema</span>: schema,
  <span class="hljs-attr">index_params</span>: index_params,
  <span class="hljs-attr">functions</span>: functions
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;multilingual_documents&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;multilingual_documents\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$IndexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>이 시점에서 Milvus는 다국어 분석기를 지원하는 빈 컬렉션을 생성하여 데이터를 수신할 준비를 마칩니다.</p>
<h2 id="Step-3-Insert-example-data" class="common-anchor-header">3단계: 예제 데이터 삽입<button data-href="#Step-3-Insert-example-data" class="anchor-icon" translate="no">
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
    </button></h2><p>다국어 컬렉션에 문서를 추가할 때 각 문서에는 텍스트 콘텐츠와 언어 식별자가 모두 포함되어야 합니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare multilingual documents</span>
documents = [
    <span class="hljs-comment"># English documents</span>
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,  <span class="hljs-comment"># Using full language name</span>
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;en&quot;</span>,  <span class="hljs-comment"># Using our defined alias</span>
    },
    <span class="hljs-comment"># Chinese documents</span>
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,  <span class="hljs-comment"># Using full language name</span>
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;cn&quot;</span>,  <span class="hljs-comment"># Using our defined alias</span>
    },
]

<span class="hljs-comment"># Insert the documents</span>
result = client.insert(COLLECTION_NAME, documents)

<span class="hljs-comment"># Print results</span>
inserted = result[<span class="hljs-string">&quot;insert_count&quot;</span>]  
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Successfully inserted <span class="hljs-subst">{inserted}</span> documents&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Documents by language: 2 English, 2 Chinese&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Successfully inserted 4 documents</span>
<span class="hljs-comment"># Documents by language: 2 English, 2 Chinese</span>
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java">List&lt;String&gt; texts = Arrays.asList(
        <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
        <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
        <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
        <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>
);
List&lt;String&gt; languages = Arrays.asList(
        <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>
);

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; texts.size(); i++) {
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;text&quot;</span>, texts.get(i));
    row.addProperty(<span class="hljs-string">&quot;language&quot;</span>, languages.get(i));
    rows.add(row);
}
client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Prepare multilingual documents</span>
<span class="hljs-keyword">const</span> documents = [
  <span class="hljs-comment">// English documents</span>
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;english&quot;</span>,
  },
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;en&quot;</span>,
  },
  <span class="hljs-comment">// Chinese documents</span>
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;chinese&quot;</span>,
  },
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;cn&quot;</span>,
  },
];

<span class="hljs-comment">// Insert the documents</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: documents,
});

<span class="hljs-comment">// Print results</span>
<span class="hljs-keyword">const</span> inserted = result.<span class="hljs-property">insert_count</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Successfully inserted <span class="hljs-subst">${inserted}</span> documents`</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Documents by language: 2 English, 2 Chinese&quot;</span>);

<span class="hljs-comment">// Expected output:</span>
<span class="hljs-comment">// Successfully inserted 4 documents</span>
<span class="hljs-comment">// Documents by language: 2 English, 2 Chinese</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">column1 := column.NewColumnVarChar(<span class="hljs-string">&quot;text&quot;</span>,
    []<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
        <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
        <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
        <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>,
    })
column2 := column.NewColumnVarChar(<span class="hljs-string">&quot;language&quot;</span>,
    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>})

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;multilingual_documents&quot;</span>).
    WithColumns(column1, column2),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;multilingual_documents&quot;,
  &quot;data&quot;: [
    {
      &quot;text&quot;: &quot;Artificial intelligence is transforming technology&quot;,
      &quot;language&quot;: &quot;english&quot;
    },
    {
      &quot;text&quot;: &quot;Machine learning models require large datasets&quot;,
      &quot;language&quot;: &quot;en&quot;
    },
    {
      &quot;text&quot;: &quot;人工智能正在改变技术领域&quot;,
      &quot;language&quot;: &quot;chinese&quot;
    },
    {
      &quot;text&quot;: &quot;机器学习模型需要大型数据集&quot;,
      &quot;language&quot;: &quot;cn&quot;
    }
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>삽입하는 동안 Milvus:</p>
<ol>
<li><p>각 문서의 <code translate="no">language</code> 필드를 읽습니다.</p></li>
<li><p><code translate="no">text</code> 필드에 해당 분석기를 적용합니다.</p></li>
<li><p>BM25 함수를 통해 스파스 벡터 표현을 생성합니다.</p></li>
<li><p>원본 텍스트와 생성된 스파스 벡터를 모두 저장합니다.</p></li>
</ol>
<div class="alert note">
<p>BM25 함수는 텍스트와 지정된 분석기를 기반으로 스파스 벡터를 자동으로 생성하므로 사용자가 직접 스파스 벡터를 제공할 필요가 없습니다.</p>
</div>
<h2 id="Step-4-Perform-search-operations" class="common-anchor-header">4단계: 검색 작업 수행<button data-href="#Step-4-Perform-search-operations" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Use-English-analyzer" class="common-anchor-header">영어 분석기 사용</h3><p>다국어 분석기로 검색할 때 <code translate="no">search_params</code> 에는 중요한 구성이 포함되어 있습니다:</p>
<ul>
<li><p><code translate="no">metric_type=&quot;BM25&quot;</code> 색인 구성과 일치해야 합니다.</p></li>
<li><p><code translate="no">analyzer_name=&quot;english&quot;</code> 쿼리 텍스트에 적용할 분석기를 지정합니다. 이는 저장된 문서에 사용되는 분석기와는 독립적입니다.</p></li>
<li><p><code translate="no">params={&quot;drop_ratio_search&quot;: &quot;0&quot;}</code> BM25 관련 동작을 제어하며, 여기서는 검색의 모든 용어를 유지합니다. 자세한 내용은 <a href="/docs/ko/v2.5.x/sparse_vector.md">스파스 벡터를</a> 참조하세요.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,            <span class="hljs-comment"># Must match index configuration</span>
    <span class="hljs-string">&quot;analyzer_name&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,  <span class="hljs-comment"># Analyzer that matches the query language</span>
    <span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-string">&quot;0&quot;</span>,     <span class="hljs-comment"># Keep all terms in search (tweak as needed)</span>
}

<span class="hljs-comment"># Execute the search</span>
english_results = client.search(
collection_name=COLLECTION_NAME, <span class="hljs-comment"># Collection to search</span>
data=[<span class="hljs-string">&quot;artificial intelligence&quot;</span>], <span class="hljs-comment"># Query text</span>
anns_field=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Field to search against</span>
search_params=search_params, <span class="hljs-comment"># Search configuration</span>
limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># Max results to return</span>
output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>], <span class="hljs-comment"># Fields to include in the output</span>
consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>, <span class="hljs-comment"># Data‑consistency guarantee</span>
)

<span class="hljs-comment"># Display English search results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n=== English Search Results ===&quot;</span>)
<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(english_results[<span class="hljs-number">0</span>]):
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. [<span class="hljs-subst">{hit.score:<span class="hljs-number">.4</span>f}</span>] <span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;text&#x27;</span>)}</span> &quot;</span>
<span class="hljs-string">f&quot;(Language: <span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;language&#x27;</span>)}</span>)&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># === English Search Results ===</span>
<span class="hljs-comment"># 1. [2.7881] Artificial intelligence is transforming technology (Language: english)</span>
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java">Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;BM25&quot;</span>);
searchParams.put(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
searchParams.put(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;artificial intelligence&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
        .build());

System.out.println(<span class="hljs-string">&quot;\n=== English Search Results ===&quot;</span>);
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.printf(<span class="hljs-string">&quot;Score: %f, %s\n&quot;</span>, result.getScore(), result.getEntity().toString());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Execute the search</span>
<span class="hljs-keyword">const</span> english_results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;artificial intelligence&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">analyzer_name</span>: <span class="hljs-string">&quot;english&quot;</span>,
    <span class="hljs-attr">drop_ratio_search</span>: <span class="hljs-string">&quot;0&quot;</span>,
  },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>],
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});

<span class="hljs-comment">// Display English search results</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;\n=== English Search Results ===&quot;</span>);
english_results.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
    <span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. [<span class="hljs-subst">${hit.score.toFixed(<span class="hljs-number">4</span>)}</span>] <span class="hljs-subst">${hit.entity.text}</span> `</span> +
      <span class="hljs-string">`(Language: <span class="hljs-subst">${hit.entity.language}</span>)`</span>
  );
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;BM25&quot;</span>)
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>)
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0</span>)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;multilingual_documents&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,                        <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;artificial intelligence&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithAnnParam(annSearchParams).
    WithOutputFields(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(resultSet.Scores); i++ {
        text, _ := resultSet.GetColumn(<span class="hljs-string">&quot;text&quot;</span>).GetAsString(i)
        lang, _ := resultSet.GetColumn(<span class="hljs-string">&quot;language&quot;</span>).GetAsString(i)
        fmt.Println(<span class="hljs-string">&quot;Score: &quot;</span>, resultSet.Scores[i], <span class="hljs-string">&quot;Text: &quot;</span>, text, <span class="hljs-string">&quot;Language:&quot;</span>, lang)
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;multilingual_documents&quot;,
  &quot;data&quot;: [&quot;artificial intelligence&quot;],
  &quot;annsField&quot;: &quot;sparse&quot;,
  &quot;limit&quot;: 3,
  &quot;searchParams&quot;: {
    &quot;metric_type&quot;: &quot;BM25&quot;,
    &quot;analyzer_name&quot;: &quot;english&quot;,
    &quot;drop_ratio_search&quot;: &quot;0&quot;  
  },
  &quot;outputFields&quot;: [&quot;text&quot;, &quot;language&quot;],
  &quot;consistencyLevel&quot;: &quot;Strong&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-Chinese-analyzer" class="common-anchor-header">중국어 분석기 사용</h3><p>이 예는 다른 쿼리 텍스트에 대해 중국어 분석기(별칭 <code translate="no">&quot;cn&quot;</code>)로 전환하는 것을 보여줍니다. 다른 모든 매개 변수는 동일하게 유지되지만 이제 쿼리 텍스트는 중국어 전용 토큰화 규칙을 사용하여 처리됩니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">search_params[<span class="hljs-string">&quot;analyzer_name&quot;</span>] = <span class="hljs-string">&quot;cn&quot;</span>

chinese_results = client.search(
collection_name=COLLECTION_NAME, <span class="hljs-comment"># Collection to search</span>
data=[<span class="hljs-string">&quot;人工智能&quot;</span>], <span class="hljs-comment"># Query text</span>
anns_field=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Field to search against</span>
search_params=search_params, <span class="hljs-comment"># Search configuration</span>
limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># Max results to return</span>
output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>], <span class="hljs-comment"># Fields to include in the output</span>
consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>, <span class="hljs-comment"># Data‑consistency guarantee</span>
)

<span class="hljs-comment"># Display Chinese search results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n=== Chinese Search Results ===&quot;</span>)
<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(chinese_results[<span class="hljs-number">0</span>]):
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. [<span class="hljs-subst">{hit.score:<span class="hljs-number">.4</span>f}</span>] <span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;text&#x27;</span>)}</span> &quot;</span>
<span class="hljs-string">f&quot;(Language: <span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;language&#x27;</span>)}</span>)&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># === Chinese Search Results ===</span>
<span class="hljs-comment"># 1. [3.3814] 人工智能正在改变技术领域 (Language: chinese)</span>
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java">searchParams.put(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>);
searchResp = client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;人工智能&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
        .build());

System.out.println(<span class="hljs-string">&quot;\n=== Chinese Search Results ===&quot;</span>);
searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.printf(<span class="hljs-string">&quot;Score: %f, %s\n&quot;</span>, result.getScore(), result.getEntity().toString());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Execute the search</span>
<span class="hljs-keyword">const</span> cn_results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;人工智能&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">analyzer_name</span>: <span class="hljs-string">&quot;cn&quot;</span>,
    <span class="hljs-attr">drop_ratio_search</span>: <span class="hljs-string">&quot;0&quot;</span>,
  },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>],
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});

<span class="hljs-comment">// Display Chinese search results</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;\n=== Chinese Search Results ===&quot;</span>);
cn_results.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
    <span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. [<span class="hljs-subst">${hit.score.toFixed(<span class="hljs-number">4</span>)}</span>] <span class="hljs-subst">${hit.entity.text}</span> `</span> +
      <span class="hljs-string">`(Language: <span class="hljs-subst">${hit.entity.language}</span>)`</span>
  );
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annSearchParams.WithExtraParam(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>)

resultSets, err = client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;multilingual_documents&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,                        <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;人工智能&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithAnnParam(annSearchParams).
    WithOutputFields(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(resultSet.Scores); i++ {
        text, _ := resultSet.GetColumn(<span class="hljs-string">&quot;text&quot;</span>).GetAsString(i)
        lang, _ := resultSet.GetColumn(<span class="hljs-string">&quot;language&quot;</span>).GetAsString(i)
        fmt.Println(<span class="hljs-string">&quot;Score: &quot;</span>, resultSet.Scores[i], <span class="hljs-string">&quot;Text: &quot;</span>, text, <span class="hljs-string">&quot;Language:&quot;</span>, lang)
    }
}

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;multilingual_documents&quot;,
  &quot;data&quot;: [&quot;人工智能&quot;],
  &quot;annsField&quot;: &quot;sparse&quot;,
  &quot;limit&quot;: 3,
  &quot;searchParams&quot;: {
    &quot;analyzer_name&quot;: &quot;cn&quot;
  },
  &quot;outputFields&quot;: [&quot;text&quot;, &quot;language&quot;],
  &quot;consistencyLevel&quot;: &quot;Strong&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
