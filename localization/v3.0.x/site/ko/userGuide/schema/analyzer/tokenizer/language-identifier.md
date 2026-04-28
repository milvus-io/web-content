---
id: language-identifier.md
title: 언어 식별자Compatible with Milvus v2.5.15+
summary: >-
  language_identifier는 언어 분석 프로세스를 자동화하여 Milvus의 텍스트 검색 기능을 향상시키기 위해 설계된 특수 토큰화
  도구입니다. 주요 기능은 텍스트 필드의 언어를 감지한 다음 해당 언어에 가장 적합한 사전 구성된 분석기를 동적으로 적용하는 것입니다. 이는
  입력별로 수동으로 언어를 할당할 필요가 없으므로 다양한 언어를 처리하는 애플리케이션에 특히 유용합니다.
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">언어 식별자<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">language_identifier</code> 은 언어 분석 프로세스를 자동화하여 Milvus의 텍스트 검색 기능을 향상시키기 위해 설계된 특수 토큰화 도구입니다. 주요 기능은 텍스트 필드의 언어를 감지한 다음 해당 언어에 가장 적합한 사전 구성된 분석기를 동적으로 적용하는 것입니다. 이는 입력별로 수동으로 언어를 할당할 필요가 없으므로 다양한 언어를 처리하는 애플리케이션에 특히 유용합니다.</p>
<p><code translate="no">language_identifier</code> 은 텍스트 데이터를 적절한 처리 파이프라인으로 지능적으로 라우팅함으로써 다국어 데이터 수집을 간소화하고 후속 검색 및 검색 작업을 위한 정확한 토큰화를 보장합니다.</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">언어 감지 워크플로<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">language_identifier</code> 에서는 텍스트 문자열을 처리하는 일련의 단계를 수행하며, 사용자가 이를 올바르게 구성하는 방법을 이해하는 데 중요한 워크플로우입니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" />
   </span> <span class="img-wrapper"> <span>언어 감지 워크플로</span> </span></p>
<ol>
<li><p><strong>입력:</strong> 워크플로는 텍스트 문자열을 입력하는 것으로 시작됩니다.</p></li>
<li><p><strong>언어 감지:</strong> 이 문자열은 먼저 언어 감지 엔진으로 전달되어 언어 식별을 시도합니다. Milvus는 <strong>whatlang과</strong> <strong>링구아의</strong> 두 가지 엔진을 지원합니다.</p></li>
<li><p><strong>분석기 선택:</strong></p>
<ul>
<li><p><strong>성공:</strong> 언어가 성공적으로 감지되면 시스템은 감지된 언어 이름에 <code translate="no">analyzers</code> 사전에 구성된 해당 분석기가 있는지 확인합니다. 일치하는 항목이 발견되면 시스템은 입력 텍스트에 지정된 분석기를 적용합니다. 예를 들어, 감지된 "만다린" 텍스트는 <code translate="no">jieba</code> 토큰화 도구로 라우팅됩니다.</p></li>
<li><p><strong>폴백:</strong> 감지에 실패하거나 언어가 성공적으로 감지되었지만 사용자가 특정 분석기를 제공하지 않은 경우 시스템은 사전 구성된 <strong>기본 분석기를</strong> 기본값으로 사용합니다. <code translate="no">default</code> 분석기는 탐지 실패와 일치하는 분석기가 없는 경우 모두에 대한 폴백입니다.</p></li>
</ul></li>
</ol>
<p>적절한 분석기를 선택하면 텍스트가 토큰화되고 처리되어 워크플로우가 완료됩니다.</p>
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
    </button></h2><p>Milvus는 두 가지 언어 감지 엔진 중에서 선택할 수 있습니다:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">링구아</a></p></li>
</ul>
<p>애플리케이션의 특정 성능 및 정확도 요구 사항에 따라 선택이 달라집니다.</p>
<table>
   <tr>
     <th><p>엔진</p></th>
     <th><p>속도</p></th>
     <th><p>정확도</p></th>
     <th><p>출력 형식</p></th>
     <th><p>최적 대상</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>빠른</p></td>
     <td><p>대부분의 언어에 적합</p></td>
     <td><p>언어 이름(예: <code translate="no">"English"</code>, <code translate="no">"Mandarin"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>참조:</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">지원 언어 표의 언어 열</a></p></td>
     <td><p>속도가 중요한 실시간 애플리케이션</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>느림</p></td>
     <td><p>특히 짧은 텍스트의 경우 더 높은 정밀도</p></td>
     <td><p>영어 이름(예: <code translate="no">"English"</code>, <code translate="no">"Chinese"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>참조:</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">지원 언어 목록</a></p></td>
     <td><p>속도보다 정확성이 더 중요한 애플리케이션</p></td>
   </tr>
</table>
<p>중요한 고려 사항은 엔진의 명명 규칙입니다. 두 엔진 모두 언어 이름을 영어로 반환하지만 일부 언어에 대해서는 다른 용어를 사용합니다(예: <code translate="no">whatlang</code> 은 <code translate="no">Mandarin</code> 을 반환하고 <code translate="no">lingua</code> 은 <code translate="no">Chinese</code> 을 반환합니다). 분석기의 키는 선택한 탐지 엔진에서 반환한 이름과 정확히 일치해야 합니다.</p>
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
    </button></h2><p><code translate="no">language_identifier</code> 토큰 분석기를 올바르게 사용하려면 다음 단계를 수행하여 구성을 정의하고 적용해야 합니다.</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">1단계: 언어 및 분석기 선택하기<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">language_identifier</code> 설정의 핵심은 지원하려는 특정 언어에 맞게 분석기를 조정하는 것입니다. 시스템은 감지된 언어를 올바른 분석기와 일치시켜 작동하므로 이 단계는 정확한 텍스트 처리를 위해 매우 중요합니다.</p>
<p>아래는 적합한 Milvus 분석기에 대한 권장 언어 매핑 표입니다. 이 표는 언어 감지 엔진의 출력과 작업에 가장 적합한 도구 사이의 다리 역할을 합니다.</p>
<table>
   <tr>
     <th><p>언어(검출기 출력)</p></th>
     <th><p>권장 분석기</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>어간 및 중지 단어 필터링이 포함된 표준 영어 토큰화.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (whatlang을 통해) 또는 <code translate="no">Chinese</code> (링구아를 통해)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>공백으로 구분되지 않은 텍스트를 위한 중국어 단어 세분화.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>일본어를 포함한 복잡한 스크립트를 위한 강력한 토큰화 도구.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>프랑스어 악센트와 문자를 처리하는 사용자 지정 구성.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>일치하는 것이 핵심입니다:</strong> 분석기의 이름은 탐지 엔진의 언어 출력과 <strong>정확히 일치해야</strong> 합니다. 예를 들어 <code translate="no">whatlang</code> 을 사용하는 경우 중국어 텍스트의 키는 <code translate="no">Mandarin</code> 이어야 합니다.</p></li>
<li><p><strong>모범 사례:</strong> 위 표는 몇 가지 일반적인 언어에 대한 권장 구성을 제공하지만 전체 목록은 아닙니다. 분석기 선택에 대한 보다 포괄적인 가이드는 <a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md">사용 사례에 적합한 분석기 선택하기를</a> 참조하세요.</p></li>
<li><p><strong>분석기 출력</strong>: 탐지 엔진이 반환하는 언어 이름의 전체 목록은 <a href="https://github.com/greyblake/whatlang-rs">Whatlang 지원 언어 표</a> 및 <a href="https://github.com/pemistahl/lingua-rs">Lingua 지원 언어 목록을</a> 참조하세요.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">2단계: analyzer_params 정의하기<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus에서 <code translate="no">language_identifier</code> 토큰화기를 사용하려면 다음 주요 구성 요소가 포함된 사전을 만드세요:</p>
<p><strong>필수 구성 요소:</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> config set - 모든 분석기 구성이 포함된 사전으로, 반드시 포함되어야 합니다:</p>
<ul>
<li><p><code translate="no">default</code> - 언어 감지에 실패하거나 일치하는 분석기를 찾을 수 없을 때 사용되는 대체 분석기.</p></li>
<li><p><strong>언어별 분석</strong> 기 - 각각 <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code> 로 정의되며, 여기서:</p>
<ul>
<li><p><code translate="no">analyzer_name</code> 선택한 탐지 엔진의 출력과 일치합니다(예: <code translate="no">&quot;English&quot;</code>, <code translate="no">&quot;Japanese&quot;</code>).</p></li>
<li><p><code translate="no">analyzer_config</code> 표준 분석기 매개변수 형식을 따릅니다( <a href="/docs/ko/analyzer-overview.md#Analyzer-types">분석기 개요</a> 참조).</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>선택적 구성 요소:</strong></p>
<ul>
<li><p><code translate="no">identifier</code> - 사용할 언어 탐지 엔진을 지정합니다(<code translate="no">whatlang</code> 또는 <code translate="no">lingua</code>). 지정하지 않으면 기본값은 <code translate="no">whatlang</code> 입니다.</p></li>
<li><p><code translate="no">mapping</code> - 분석기에 대한 사용자 지정 별칭을 생성하여 탐지 엔진의 정확한 출력 형식 대신 설명적인 이름을 사용할 수 있습니다.</p></li>
</ul>
<p>토큰화 도구는 먼저 입력 텍스트의 언어를 감지한 다음 구성에서 적절한 분석기를 선택하는 방식으로 작동합니다. 감지에 실패하거나 일치하는 분석기가 없는 경우 자동으로 <code translate="no">default</code> 분석기로 돌아갑니다.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">권장됩니다: 직접 이름 일치</h4><p>분석기 이름은 선택한 언어 감지 엔진의 출력과 정확히 일치해야 합니다. 이 방법은 더 간단하고 잠재적인 혼동을 피할 수 있습니다.</p>
<p><code translate="no">whatlang</code> 및 <code translate="no">lingua</code> 모두 해당 문서에 표시된 대로 언어 이름을 사용하세요:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">whatlang 지원 언어</a> (<strong>'언어</strong>' 열 사용)</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">링구아 지원 언어</a></p></li>
</ul>
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
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">대체 접근 방식: 매핑이 포함된 사용자 지정 이름</h4><p>사용자 지정 분석기 이름을 사용하거나 기존 구성과의 호환성을 유지해야 하는 경우 <code translate="no">mapping</code> 매개 변수를 사용할 수 있습니다. 이렇게 하면 분석기에 대한 별칭이 생성되며 원래 탐지 엔진 이름과 사용자 지정 이름 모두 작동합니다.</p>
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
<p><code translate="no">analyzer_params</code> 을 정의한 후 컬렉션 스키마를 정의할 때 <code translate="no">VARCHAR</code> 필드에 적용할 수 있습니다. 이렇게 하면 Milvus가 효율적인 토큰화 및 필터링을 위해 지정된 분석기를 사용하여 해당 필드의 텍스트를 처리할 수 있습니다. 자세한 내용은 <a href="/docs/ko/analyzer-overview.md#Example-use">사용 예시를</a> 참조하세요.</p>
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
    </button></h2><p>다음은 일반적인 시나리오에 바로 사용할 수 있는 몇 가지 구성입니다. 각 예제에는 구성 및 인증 코드가 모두 포함되어 있으므로 설정을 즉시 테스트할 수 있습니다.</p>
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

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
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># English: [&#x27;The&#x27;, &#x27;Milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;for&#x27;, &#x27;scale&#x27;]</span>

<span class="hljs-comment"># Chinese text  </span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># Chinese: [&#x27;Milvus&#x27;, &#x27;向量&#x27;, &#x27;数据&#x27;, &#x27;据库&#x27;, &#x27;数据库&#x27;, &#x27;专&#x27;, &#x27;为&#x27;, &#x27;大规&#x27;, &#x27;规模&#x27;, &#x27;大规模&#x27;, &#x27;应用&#x27;, &#x27;而&#x27;, &#x27;设计&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">악센트 정규화가 있는 유럽 언어<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
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
result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">사용 참고 사항<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>필드당 단일 언어:</strong> 필드에서 하나의 동질적인 단일 텍스트 단위로 작동합니다. 영어 문장이 포함된 레코드와 프랑스어 문장이 포함된 레코드 등 서로 다른 데이터 레코드에서 서로 다른 언어를 처리하도록 설계되었습니다.</p></li>
<li><p><strong>혼합 언어 문자열이 없습니다:</strong> 여러 언어의 텍스트가 포함된 단일 문자열을 처리하도록 <strong>설계되지 않았습니다</strong>. 예를 들어 영어 문장과 따옴표로 묶인 일본어 구문이 모두 포함된 단일 <code translate="no">VARCHAR</code> 필드는 단일 언어로 처리됩니다.</p></li>
<li><p><strong>지배적 언어 처리:</strong> 혼합 언어 시나리오에서는 탐지 엔진이 지배적인 언어를 식별하고 해당 분석기가 전체 텍스트에 적용될 가능성이 높습니다. 이렇게 하면 포함된 외국어 텍스트에 대한 토큰화가 제대로 이루어지지 않거나 전혀 이루어지지 않을 수 있습니다.</p></li>
</ul>
