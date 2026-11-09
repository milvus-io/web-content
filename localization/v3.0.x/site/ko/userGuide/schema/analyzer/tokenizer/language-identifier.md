---
id: language-identifier.md
title: 언어 식별기Compatible with Milvus v2.5.15+
summary: >-
  language_identifier는 언어 분석 과정을 자동화하여 Milvus의 텍스트 검색 기능을 강화하도록 설계된 특수한 토큰화기입니다.
  이 기능의 주된 역할은 텍스트 필드의 언어를 감지한 후, 해당 언어에 가장 적합한 사전 구성된 분석기를 동적으로 적용하는 것입니다. 이는
  입력 건마다 수동으로 언어를 지정해야 하는 번거로움을 없애주므로, 다양한 언어를 처리하는 애플리케이션에서 특히 유용합니다.
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">언어 식별기<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">language_identifier</code> 는 언어 분석 과정을 자동화하여 Milvus의 텍스트 검색 기능을 강화하도록 설계된 특수 토큰화 도구입니다. 이 도구의 주요 기능은 텍스트 필드의 언어를 감지한 후, 해당 언어에 가장 적합한 사전 구성된 분석기를 동적으로 적용하는 것입니다. 이는 입력 건마다 수동으로 언어를 지정해야 하는 번거로움을 없애주므로, 다양한 언어를 처리하는 애플리케이션에서 특히 유용합니다.</p>
<p><code translate="no">language_identifier</code> 는 텍스트 데이터를 적절한 처리 파이프라인으로 지능적으로 라우팅함으로써 다국어 데이터 수집을 간소화하고, 후속 검색 및 검색 작업에 필요한 정확한 토큰화를 보장합니다.</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">언어 감지 워크플로우<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">language_identifier</code> 는 텍스트 문자열을 처리하기 위해 일련의 단계를 수행하며, 사용자가 이를 올바르게 구성하는 방법을 이해하는 데 있어 이 워크플로는 매우 중요합니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" /> 
   <span>언어 감지 워크플로우</span>
  
 </span></p>
<ol>
<li><p><strong>입력:</strong> 워크플로는 텍스트 문자열을 입력으로 받아 시작됩니다.</p></li>
<li><p><strong>언어 감지:</strong> 이 문자열은 먼저 언어 감지 엔진으로 전달되어 언어를 식별합니다. Milvus는 <strong>whatlang과</strong> <strong>lingua</strong>, 두 가지 엔진을 지원합니다.</p></li>
<li><p><strong>분석기 선택:</strong></p>
<ul>
<li><p><strong>성공:</strong> 언어가 성공적으로 감지되면, 시스템은 감지된 언어 이름에 대해 <code translate="no">analyzers</code> 사전 내에 해당 분석기가 구성되어 있는지 확인합니다. 일치하는 항목이 발견되면, 시스템은 지정된 분석기를 입력 텍스트에 적용합니다. 예를 들어, “Mandarin”으로 감지된 텍스트는 <code translate="no">jieba</code> 토큰화기로 전달됩니다.</p></li>
<li><p><strong>대체 처리:</strong> 언어 감지가 실패하거나, 언어가 성공적으로 감지되었으나 해당 언어에 대한 특정 분석기가 제공되지 않은 경우, 시스템은 미리 구성된 <strong>기본 분석기를</strong> 사용합니다. 이는 명확히 해야 할 중요한 사항입니다. <code translate="no">default</code> 분석기는 감지 실패와 일치하는 분석기 부재 모두에 대한 대체 처리 수단입니다.</p></li>
</ul></li>
</ol>
<p>적절한 분석기가 선택되면 텍스트가 토큰화 및 처리되어 워크플로가 완료됩니다.</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">사용 가능한 언어 감지 엔진<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 다음 두 가지 언어 감지 엔진 중 하나를 선택할 수 있도록 제공합니다:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>선택은 애플리케이션의 구체적인 성능 및 정확도 요구 사항에 따라 달라집니다.</p>
<table>
   <tr>
     <th><p>엔진</p></th>
     <th><p>속도</p></th>
     <th><p>정확도</p></th>
     <th><p>출력 형식</p></th>
     <th><p>가장 적합한 용도</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>빠름</p></td>
     <td><p>대부분의 언어에 적합</p></td>
     <td><p>언어 이름(예: <code translate="no">"English"</code>, <code translate="no">"Mandarin"</code> , <code translate="no">"Japanese"</code>)</p><p><strong>참조:</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">지원 언어 표의 ‘언어’ 열</a></p></td>
     <td><p>속도가 중요한 실시간 애플리케이션</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>느림</p></td>
     <td><p>정확도가 높음(특히 짧은 텍스트의 경우)</p></td>
     <td><p>영어 언어 이름(예: <code translate="no">"English"</code>, <code translate="no">"Chinese"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>참조:</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">지원 언어 목록</a></p></td>
     <td><p>속도보다 정확도가 더 중요한 애플리케이션</p></td>
   </tr>
</table>
<p>중요하게 고려해야 할 사항은 엔진의 명명 규칙입니다. 두 엔진 모두 언어 이름을 영어로 반환하지만, 일부 언어에 대해서는 서로 다른 용어를 사용합니다(예: <code translate="no">whatlang</code> 은 <code translate="no">Mandarin</code> 을 반환하는 반면, <code translate="no">lingua</code> 은 <code translate="no">Chinese</code> 을 반환함). 분석기의 키는 선택한 탐지 엔진이 반환한 이름과 정확히 일치해야 합니다.</p>
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
    </button></h2><p><code translate="no">language_identifier</code> 토큰화기를 올바르게 사용하려면 다음 단계를 거쳐 구성을 정의하고 적용해야 합니다.</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">1단계: 언어 및 분석기 선택<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">language_identifier</code> 를 설정하는 핵심은 지원할 특정 언어에 맞게 분석기를 맞춤 설정하는 것입니다. 시스템은 감지된 언어를 올바른 분석기와 매칭하는 방식으로 작동하므로, 이 단계는 정확한 텍스트 처리를 위해 매우 중요합니다.</p>
<p>다음은 언어와 적합한 Milvus 분석기 간의 권장 매핑입니다. 이 표는 언어 감지 엔진의 출력과 해당 작업에 가장 적합한 도구 사이의 가교 역할을 합니다.</p>
<table>
   <tr>
     <th><p>언어 (탐지 엔진 출력)</p></th>
     <th><p>권장 분석기</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>스템밍 및 스톱워드 필터링이 포함된 표준 영어 토큰화.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (whatlang을 통해) 또는 <code translate="no">Chinese</code> (lingua를 통해)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>공백으로 구분되지 않은 텍스트를 위한 중국어 단어 분할.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>일본어를 포함한 복잡한 문자 체계에 대한 강력한 토큰화기입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>프랑스어 악센트 및 특수 문자를 처리하는 사용자 정의 구성.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>일치 여부가 핵심입니다:</strong> 분석기의 이름은 탐지 엔진의 언어 출력 결과와 <strong>정확히 일치해야 합니다</strong>. 예를 들어, <code translate="no">whatlang</code> 를 사용하는 경우, 중국어 텍스트에 대한 키는 <code translate="no">Mandarin</code> 이어야 합니다.</p></li>
<li><p><strong>모범 사례:</strong> 위 표는 몇 가지 일반적인 언어에 대한 권장 구성을 제공하지만, 이것이 모든 경우를 망라하는 목록은 아닙니다. 분석기 선택에 대한 보다 포괄적인 가이드는 <a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md">‘사용 사례에 적합한 분석기 선택’을</a> 참조하십시오.</p></li>
<li><p><strong>탐지</strong> 엔진<strong>출력</strong>: 탐지 엔진이 반환하는 언어 이름의 전체 목록은 <a href="https://github.com/greyblake/whatlang-rs">Whatlang 지원 언어 표와</a> <a href="https://github.com/pemistahl/lingua-rs">Lingua 지원 언어 목록을</a> 참조하십시오.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">2단계: analyzer_params 정의<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus에서 <code translate="no">language_identifier</code> 토큰화기를 사용하려면 다음 주요 구성 요소를 포함하는 사전(dictionary)을 생성하십시오:</p>
<p><strong>필수 구성 요소:</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> config set – 모든 분석기 구성을 포함하는 사전으로, 다음을 반드시 포함해야 합니다:</p>
<ul>
<li><p><code translate="no">default</code> – 언어 감지가 실패하거나 일치하는 분석기가 발견되지 않을 때 사용되는 대체 분석기</p></li>
<li><p><strong>언어별 분석기</strong> – 각각 <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code> 형식으로 정의되며, 여기서:</p>
<ul>
<li><p><code translate="no">analyzer_name</code> 선택한 탐지 엔진의 출력과 일치해야 합니다(예: <code translate="no">&quot;English&quot;</code>, <code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> 표준 분석기 매개변수 형식을 따릅니다( <a href="/docs/ko/analyzer-overview.md#Analyzer-types">‘분석기 개요’</a> 참조)</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>선택적 구성 요소:</strong></p>
<ul>
<li><p><code translate="no">identifier</code> – 사용할 언어 감지 엔진을 지정합니다(<code translate="no">whatlang</code> 또는 <code translate="no">lingua</code>). 지정하지 않으면 기본값은 <code translate="no">whatlang</code> 입니다</p></li>
<li><p><code translate="no">mapping</code> – 분석기에 대한 사용자 정의 별칭을 생성하여, 탐지 엔진의 정확한 출력 형식 대신 설명적인 이름을 사용할 수 있게 합니다</p></li>
</ul>
<p>토큰화기는 먼저 입력 텍스트의 언어를 감지한 다음, 구성에서 적절한 분석기를 선택하여 작동합니다. 감지에 실패하거나 일치하는 분석기가 없는 경우, 자동으로 <code translate="no">default</code> 분석기로 대체됩니다.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">권장 사항: 직접 이름 일치</h4><p>분석기 이름은 선택한 언어 탐지 엔진의 출력 결과와 정확히 일치해야 합니다. 이 방법은 더 간단하며 잠재적인 혼동을 방지할 수 있습니다.</p>
<p><code translate="no">whatlang</code> 와 <code translate="no">lingua</code> 모두 해당 문서에 표시된 언어 이름을 사용하십시오:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">whatlang에서 지원하는 언어</a> (<strong>‘Language’</strong> 열 참조)</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">lingua 지원 언어</a></p></li>
</ul>
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
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment"># Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,  <span class="hljs-comment"># or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {  <span class="hljs-comment"># A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>  <span class="hljs-comment"># fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);   <span class="hljs-comment">// Must be `language_identifier`</span>
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>);        <span class="hljs-comment">// or `lingua`</span>
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// A set of analyzer configs</span>
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>); <span class="hljs-comment">// fallback if language detection fails</span>
        }});
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;Mandarin&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{ <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
        }});
    }});
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>, <span class="hljs-comment">// Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,            <span class="hljs-comment">// or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{         <span class="hljs-comment">// A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
            },
        },
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment">// Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,       <span class="hljs-comment">// or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {                  <span class="hljs-comment">// A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span> <span class="hljs-comment">// fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {                <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {               <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>}, <span class="hljs-comment">// Must be `language_identifier`</span>
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>},      <span class="hljs-comment">// or `lingua`</span>
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {                  <span class="hljs-comment">// A set of analyzer configs</span>
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}}, <span class="hljs-comment">// fallback if language detection fails</span>
            {<span class="hljs-string">&quot;English&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},       <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            {<span class="hljs-string">&quot;Mandarin&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>}}}    <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
        }}
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>, <span class="hljs-comment">// Must be `language_identifier`</span>
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,      <span class="hljs-comment">// or `lingua`</span>
    <span class="hljs-attr">analyzers</span>: {                 <span class="hljs-comment">// A set of analyzer configs</span>
      <span class="hljs-attr">default</span>: {
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,   <span class="hljs-comment">// fallback if language detection fails</span>
      },
      <span class="hljs-title class_">English</span>: {                 <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
      },
      <span class="hljs-title class_">Mandarin</span>: {                <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
      },
    },
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>, <span class="hljs-comment">// Must be `language_identifier`</span>
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;whatlang&quot;</span>,      <span class="hljs-comment">// or `lingua`</span>
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// A set of analyzer configs</span>
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span> <span class="hljs-comment">// fallback if language detection fails</span>
            },
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            {
                [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span>
            },
            [<span class="hljs-string">&quot;Mandarin&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: {
    &quot;type&quot;: &quot;language_identifier&quot;,
    &quot;identifier&quot;: &quot;whatlang&quot;,
    &quot;analyzers&quot;: {
      &quot;default&quot;: {
        &quot;tokenizer&quot;: &quot;standard&quot;
      },
      &quot;English&quot;: {
        &quot;type&quot;: &quot;english&quot;
      },
      &quot;Mandarin&quot;: {
        &quot;tokenizer&quot;: &quot;jieba&quot;
      }
    }
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">대안: 매핑을 사용한 사용자 정의 이름</h4><p>사용자 정의 분석기 이름을 사용하고자 하거나 기존 구성과의 호환성을 유지해야 하는 경우, <code translate="no">mapping</code> 매개변수를 사용할 수 있습니다. 이렇게 하면 분석기에 대한 별칭이 생성되며, 원래의 탐지 엔진 이름과 사용자 정의 이름 모두 정상적으로 작동합니다.</p>
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
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment"># Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>);
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;english_analyzer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Custom analyzer name</span>
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;chinese_analyzer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Custom analyzer name</span>
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
        }});
    }});
    put(<span class="hljs-string">&quot;mapping&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Maps detection output to custom name</span>
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-string">&quot;english_analyzer&quot;</span>);
        put(<span class="hljs-string">&quot;Chinese&quot;</span>, <span class="hljs-string">&quot;chinese_analyzer&quot;</span>);
    }});
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
            },
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Maps detection output to custom names</span>
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>,
        },
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment">// Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>},
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>},
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}},
            {<span class="hljs-string">&quot;english_analyzer&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},      <span class="hljs-comment">// Custom analyzer name</span>
            {<span class="hljs-string">&quot;chinese_analyzer&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>}}}    <span class="hljs-comment">// Custom analyzer name</span>
        }},
        {<span class="hljs-string">&quot;mapping&quot;</span>, {                                          <span class="hljs-comment">// Maps detection output to custom names</span>
            {<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-string">&quot;english_analyzer&quot;</span>},
            {<span class="hljs-string">&quot;Chinese&quot;</span>, <span class="hljs-string">&quot;chinese_analyzer&quot;</span>}
        }}
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
    <span class="hljs-attr">analyzers</span>: {
      <span class="hljs-attr">default</span>: {
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,
      },
      <span class="hljs-attr">english_analyzer</span>: { <span class="hljs-comment">// Custom analyzer name</span>
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
      },
      <span class="hljs-attr">chinese_analyzer</span>: { <span class="hljs-comment">// Custom analyzer name</span>
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
      },
    },
    <span class="hljs-attr">mapping</span>: {            <span class="hljs-comment">// Maps detection output to custom names</span>
      <span class="hljs-title class_">English</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,
      <span class="hljs-title class_">Chinese</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>,
    },
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>,
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;lingua&quot;</span>,
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span>
            },
            [<span class="hljs-string">&quot;english_analyzer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Custom analyzer name</span>
            {
                [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span>
            },
            [<span class="hljs-string">&quot;chinese_analyzer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Custom analyzer name</span>
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        [<span class="hljs-string">&quot;mapping&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Maps detection output to custom names</span>
        {
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-string">&quot;english_analyzer&quot;</span>,
            [<span class="hljs-string">&quot;Chinese&quot;</span>] = <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: {
    &quot;type&quot;: &quot;language_identifier&quot;,
    &quot;identifier&quot;: &quot;lingua&quot;,
    &quot;analyzers&quot;: {
      &quot;default&quot;: {
        &quot;tokenizer&quot;: &quot;standard&quot;
      },
      &quot;english_analyzer&quot;: {
        &quot;type&quot;: &quot;english&quot;
      },
      &quot;chinese_analyzer&quot;: {
        &quot;tokenizer&quot;: &quot;jieba&quot;
      }
    },
    &quot;mapping&quot;: {
      &quot;English&quot;: &quot;english_analyzer&quot;,
      &quot;Chinese&quot;: &quot;chinese_analyzer&quot;
    }
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">analyzer_params</code> 를 정의한 후, 컬렉션 스키마를 정의할 때 <code translate="no">VARCHAR</code> 필드에 이를 적용할 수 있습니다. 이를 통해 Milvus는 해당 필드의 텍스트를 지정된 분석기를 사용하여 처리함으로써 효율적인 토큰화 및 필터링을 수행할 수 있습니다. 자세한 내용은 <a href="/docs/ko/analyzer-overview.md#Example-use">사용 예제를</a> 참조하십시오.</p>
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
    </button></h2><p>다음은 일반적인 시나리오에 바로 사용할 수 있는 구성 예시입니다. 각 예시에는 구성과 검증 코드가 모두 포함되어 있으므로 설정을 즉시 테스트해 볼 수 있습니다.</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">영어 및 중국어 감지<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
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

<span class="hljs-comment"># Configuration</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
}

<span class="hljs-comment"># Test the configuration</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># English text</span>
result_en = client.run_analyzer(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;English:&quot;</span>, result_en)

<span class="hljs-comment"># Chinese text</span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.*;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Configuration</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>);
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;Mandarin&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
        }});
    }});
}});

<span class="hljs-comment">// English text</span>
List&lt;String&gt; english = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
english.add(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>);
<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">enResp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(english)
        .analyzerParams(analyzerParams)
        .build());

<span class="hljs-comment">// Chinese text</span>
List&lt;String&gt; chinese = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
chinese.add(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>);
<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">cnResp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(chinese)
        .analyzerParams(analyzerParams)
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
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-comment">// Configuration</span>
analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;default&quot;</span>:  <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>:  <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>},
        },
    },
}

<span class="hljs-comment">// English text</span>
enResult, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>).
        WithAnalyzerParams(analyzerParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">for</span> _, tokens := <span class="hljs-keyword">range</span> enResult {
    fmt.Println(<span class="hljs-string">&quot;English:&quot;</span>, tokens.Tokens)
}

<span class="hljs-comment">// Chinese text</span>
cnResult, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>).
        WithAnalyzerParams(analyzerParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">for</span> _, tokens := <span class="hljs-keyword">range</span> cnResult {
    fmt.Println(<span class="hljs-string">&quot;Chinese:&quot;</span>, tokens.Tokens)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Configuration</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
});

<span class="hljs-comment">// English text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">en_response</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params.<span class="hljs-title function_ invoke__">clone</span>())
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Chinese text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">cn_response</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Configuration</span>
nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>},
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>},
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}},
            {<span class="hljs-string">&quot;English&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},
            {<span class="hljs-string">&quot;Mandarin&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>}}}
        }}
    }}
};

<span class="hljs-comment">// English text</span>
milvus::RunAnalyzerRequest en_request;
en_request.<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);
en_request.<span class="hljs-built_in">AddText</span>(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>);
milvus::RunAnalyzerResponse en_response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(en_request, en_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Chinese text</span>
milvus::RunAnalyzerRequest cn_request;
cn_request.<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);
cn_request.<span class="hljs-built_in">AddText</span>(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>);
milvus::RunAnalyzerResponse cn_response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(cn_request, cn_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>,
});

<span class="hljs-comment">// Configuration</span>
<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
    <span class="hljs-attr">analyzers</span>: {
      <span class="hljs-attr">default</span>: { <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span> },
      <span class="hljs-title class_">English</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span> },
      <span class="hljs-title class_">Mandarin</span>: { <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span> },
    },
  },
};

<span class="hljs-comment">// English text</span>
<span class="hljs-keyword">const</span> en_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;The Milvus vector database is built for scale!&#x27;</span>,
  analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;English:&#x27;</span>, en_result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>)));

<span class="hljs-comment">// Chinese text</span>
<span class="hljs-keyword">const</span> cn_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Milvus 向量数据库专为大规模应用而设计&#x27;</span>,
  analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Chinese:&#x27;</span>, cn_result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Configuration</span>
<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>,
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;whatlang&quot;</span>,
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span> },
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span> },
            [<span class="hljs-string">&quot;Mandarin&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span> }
        }
    }
};

<span class="hljs-comment">// English text</span>
<span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span> }
});

<span class="hljs-comment">// Chinese text</span>
<span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;language_identifier\&quot;,\&quot;identifier\&quot;:\&quot;whatlang\&quot;,\&quot;analyzers\&quot;:{\&quot;default\&quot;:{\&quot;tokenizer\&quot;:\&quot;standard\&quot;},\&quot;English\&quot;:{\&quot;type\&quot;:\&quot;english\&quot;},\&quot;Mandarin\&quot;:{\&quot;tokenizer\&quot;:\&quot;jieba\&quot;}}}}&quot;,
    &quot;text&quot;: [&quot;The Milvus vector database is built for scale!&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">악센트 정규화가 적용된 유럽 언어<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
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

<span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
            }
        }
    }
}

<span class="hljs-comment"># Test with accented text</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.*;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>);
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;French&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
            put(<span class="hljs-string">&quot;filter&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>));
        }});
    }});
}});

<span class="hljs-comment">// Test with accented text</span>
List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>);
<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
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
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>:    []any{<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>},
            },
        },
    },
}

<span class="hljs-comment">// Test with accented text</span>
result, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>).
        WithAnalyzerParams(analyzerParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">for</span> _, tokens := <span class="hljs-keyword">range</span> result {
    fmt.Println(<span class="hljs-string">&quot;French:&quot;</span>, tokens.Tokens)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
            }
        }
    }
});

<span class="hljs-comment">// Test with accented text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;Café français très délicieux&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>},
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>},
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}},
            {<span class="hljs-string">&quot;English&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},
            {<span class="hljs-string">&quot;French&quot;</span>, {
                {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>},
                {<span class="hljs-string">&quot;filter&quot;</span>, {<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>}}
            }}
        }}
    }}
};

<span class="hljs-comment">// Test with accented text</span>
milvus::RunAnalyzerRequest request;
request.<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);
request.<span class="hljs-built_in">AddText</span>(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>);
milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>,
});

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
    <span class="hljs-attr">analyzers</span>: {
      <span class="hljs-attr">default</span>: { <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span> },
      <span class="hljs-title class_">English</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span> },
      <span class="hljs-title class_">French</span>: {
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-attr">filter</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>],
      },
    },
  },
};

<span class="hljs-comment">// Test with accented text</span>
<span class="hljs-keyword">const</span> fr_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Café français très délicieux&#x27;</span>,
  analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;French:&#x27;</span>, fr_result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>,
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;lingua&quot;</span>,
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span> },
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span> },
            [<span class="hljs-string">&quot;French&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span>,
                [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span> }
            }
        }
    }
};

<span class="hljs-comment">// Test with accented text</span>
<span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;Café français très délicieux&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;language_identifier\&quot;,\&quot;identifier\&quot;:\&quot;lingua\&quot;,\&quot;analyzers\&quot;:{\&quot;default\&quot;:{\&quot;tokenizer\&quot;:\&quot;standard\&quot;},\&quot;English\&quot;:{\&quot;type\&quot;:\&quot;english\&quot;},\&quot;French\&quot;:{\&quot;tokenizer\&quot;:\&quot;standard\&quot;,\&quot;filter\&quot;:[\&quot;lowercase\&quot;,\&quot;asciifolding\&quot;]}}}}&quot;,
    &quot;text&quot;: [&quot;Café français très délicieux&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">예상 출력<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><p>위의 유럽 언어 예제는 다음과 같은 토큰을 순서대로 생성합니다. SDK 응답 객체와 출력 형식은 언어에 따라 다르며, REST 응답에는 <code translate="no">data.results[].tokens[].token</code> 에서 이러한 토큰이 포함되어 있습니다. 영어 및 중국어 감지 예제의 토큰 시퀀스는 감지기가 각 입력에 대해 어떤 분석기를 선택하느냐에 따라 달라지므로, 여기에서는 재현하지 않습니다.</p>
<pre><code translate="no" class="language-plaintext">French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">사용법 참고 사항<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>필드당 단일 언어:</strong> 이 기능은 필드를 단일하고 균일한 텍스트 단위로 처리합니다. 이는 한 레코드에 영어 문장이 포함되고 다음 레코드에 프랑스어 문장이 포함되는 등, 서로 다른 데이터 레코드 간에 다른 언어가 혼합된 경우를 처리하도록 설계되었습니다.</p></li>
<li><p><strong>혼합 언어 문자열 불가:</strong> 여러 언어의 텍스트가 포함된 단일 문자열을 처리하도록 <strong>설계되지 않았습니다</strong>. 예를 들어, 영어 문장과 인용된 일본어 구문이 모두 포함된 단일 <code translate="no">VARCHAR</code> 필드는 단일 언어로 처리됩니다.</p></li>
<li><p><strong>주된 언어 처리:</strong> 혼합 언어 환경에서 탐지 엔진은 주된 언어를 식별할 가능성이 높으며, 해당 분석기가 전체 텍스트에 적용됩니다. 이로 인해 삽입된 외국어 텍스트에 대해서는 토큰화가 제대로 이루어지지 않거나 아예 수행되지 않을 수 있습니다.</p></li>
</ul>
