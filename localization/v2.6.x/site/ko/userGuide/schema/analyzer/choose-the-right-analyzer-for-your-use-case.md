---
id: choose-the-right-analyzer-for-your-use-case.md
title: 사용 사례에 적합한 분석기 선택하기
summary: 참고
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">사용 사례에 적합한 분석기 선택하기<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h1><div class="alert note">
<p>이 가이드는 분석기 선택에 대한 실질적인 의사 결정에 중점을 둡니다. 분석기 구성 요소와 분석기 매개변수를 추가하는 방법에 대한 기술적 세부 사항은 분석기 <a href="/docs/ko/analyzer-overview.md">개요를</a> 참조하세요.</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">2분 안에 분석기 이해하기<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 분석기는 이 필드에 저장된 텍스트를 처리하여 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색</a> (BM25), <a href="/docs/ko/phrase-match.md">구문</a> 검색 또는 <a href="/docs/ko/keyword-match.md">텍스트 일치와</a> 같은 기능으로 검색할 수 있도록 합니다. 원시 콘텐츠를 검색 가능한 토큰으로 변환하는 텍스트 프로세서라고 생각하면 됩니다.</p>
<p>분석기는 간단한 2단계 파이프라인으로 작동합니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" />
   </span> <span class="img-wrapper"> <span>분석기 워크플로</span> </span></p>
<ol>
<li><p><strong>토큰화(필수):</strong> 이 초기 단계에서는 <strong>토큰화기를</strong> 적용하여 연속적인 텍스트 문자열을 토큰이라는 의미 있는 개별 단위로 분리합니다. 토큰화 방법은 언어와 콘텐츠 유형에 따라 크게 달라질 수 있습니다.</p></li>
<li><p><strong>토큰 필터링(선택 사항):</strong> 토큰화 후에는 <strong>필터를</strong> 적용하여 토큰을 수정, 제거 또는 세분화합니다. 이러한 작업에는 모든 토큰을 소문자로 변환하거나, 의미가 없는 일반적인 단어(예: 중지어)를 제거하거나, 단어를 어근 형태(어간)로 줄이는 작업이 포함될 수 있습니다.</p></li>
</ol>
<p><strong>예시</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">분석기 선택이 중요한 이유<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>잘못된 분석기를 선택하면 관련 문서를 검색할 수 없거나 관련 없는 결과가 반환될 수 있습니다.</p>
<p>다음 표에는 부적절한 분석기 선택으로 인해 발생하는 일반적인 문제가 요약되어 있으며, 검색 문제를 진단하기 위한 실행 가능한 솔루션이 나와 있습니다.</p>
<table>
   <tr>
     <th><p>문제</p></th>
     <th><p>증상</p></th>
     <th><p>예(입력 및 출력)</p></th>
     <th><p>원인(잘못된 분석기)</p></th>
     <th><p>해결 방법(좋은 분석기)</p></th>
   </tr>
   <tr>
     <td><p>토큰화 초과</p></td>
     <td><p>기술 용어, 식별자 또는 URL에 대한 텍스트 쿼리가 관련 문서를 찾지 못합니다.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/ko/standard-analyzer.md"><code translate="no">standard</code></a> 분석기</p></td>
     <td><p>사용 <a href="/docs/ko/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> 토큰화기, 또는 <a href="/docs/ko/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> 필터와 결합합니다.</p></td>
   </tr>
   <tr>
     <td><p>토큰화 미달</p></td>
     <td><p>여러 단어로 이루어진 구문의 구성 요소를 검색해도 전체 구문이 포함된 문서를 반환하지 못합니다.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>분석기에 <a href="/docs/ko/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> 토큰화</p></td>
     <td><p>구두점과 공백을 분할하려면 <a href="/docs/ko/standard-tokenizer.md"><code translate="no">standard</code></a> 토큰화기를 사용하여 구두점과 공백을 분할하고 사용자 정의 <a href="/docs/ko/regex-filter.md">정규식</a> 필터를 사용하세요.</p></td>
   </tr>
   <tr>
     <td><p>언어 불일치</p></td>
     <td><p>특정 언어에 대한 검색 결과가 무의미하거나 존재하지 않는 경우.</p></td>
     <td><p>중국어 텍스트: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (토큰 1개)</p></td>
     <td><p><a href="/docs/ko/english-analyzer.md"><code translate="no">english</code></a> 분석기</p></td>
     <td><p>다음과 같은 언어별 분석기를 사용하세요. <a href="/docs/ko/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">첫 번째 질문입니다: 분석기를 선택해야 하나요?<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>많은 사용 사례의 경우 특별한 작업을 수행할 필요가 없습니다. 여러분이 그러한 사용 사례에 해당하는지 확인해 보겠습니다.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">기본 동작: <code translate="no">standard</code> 분석기<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>전체 텍스트 검색과 같은 텍스트 검색 기능을 사용할 때 분석기를 지정하지 않으면 Milvus에서 자동으로 <a href="/docs/ko/standard-analyzer.md"><code translate="no">standard</code></a> 분석기를 사용합니다.</p>
<p><code translate="no">standard</code> 분석기:</p>
<ul>
<li><p>공백과 구두점으로 텍스트 분할</p></li>
<li><p>모든 토큰을 소문자로 변환합니다.</p></li>
<li><p>내장된 일반적인 영어 마침표와 대부분의 구두점 세트를 제거합니다.</p></li>
</ul>
<p><strong>변환 예시</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">결정 기준 빠른 확인<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>이 표를 사용하여 기본 <code translate="no">standard</code> 분석기가 사용자의 요구 사항을 충족하는지 빠르게 확인할 수 있습니다. 그렇지 않은 경우 다른 경로를 선택해야 합니다.</p>
<table>
   <tr>
     <th><p>콘텐츠</p></th>
     <th><p>표준 분석기 괜찮나요?</p></th>
     <th><p>왜</p></th>
     <th><p>필요한 사항</p></th>
   </tr>
   <tr>
     <td><p>영어 블로그 게시물</p></td>
     <td><p>✅ 예</p></td>
     <td><p>기본 동작으로 충분합니다.</p></td>
     <td><p>기본값을 사용합니다(구성할 필요 없음).</p></td>
   </tr>
   <tr>
     <td><p>중국어 문서</p></td>
     <td><p>❌ 아니요</p></td>
     <td><p>중국어 단어에는 공백이 없으며 하나의 토큰으로 처리됩니다.</p></td>
     <td><p>기본 제공 <a href="/docs/ko/chinese-analyzer.md"><code translate="no">chinese</code></a> 분석기를 사용합니다.</p></td>
   </tr>
   <tr>
     <td><p>기술 문서</p></td>
     <td><p>❌ 아니요</p></td>
     <td><p><code translate="no">C++</code> 와 같은 용어에서 구두점이 제거됩니다.</p></td>
     <td><p>사용자 정의 분석기를 만들려면 <a href="/docs/ko/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> 토큰화 도구와 <a href="/docs/ko/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> 필터를 사용하여 사용자 정의 분석기를 만듭니다.</p></td>
   </tr>
   <tr>
     <td><p>프랑스어/스페인어 텍스트와 같이 공백으로 구분된 언어</p></td>
     <td><p>⚠️ 아마도</p></td>
     <td><p>악센트 문자(<code translate="no">café</code> 대 <code translate="no">cafe</code>)가 일치하지 않을 수 있습니다.</p></td>
     <td><p>더 나은 결과를 얻으려면 <a href="/docs/ko/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> 가 포함된 사용자 지정 분석기를 사용하면 더 나은 결과를 얻을 수 있습니다.</p></td>
   </tr>
   <tr>
     <td><p>다국어 또는 알 수 없는 언어</p></td>
     <td><p>❌ 아니요</p></td>
     <td><p><code translate="no">standard</code> 분석기에는 다양한 문자 집합 및 토큰화 규칙을 처리하는 데 필요한 언어별 로직이 없습니다.</p></td>
     <td><p>사용자 정의 분석기를 사용하여 <a href="/docs/ko/icu-tokenizer.md"><code translate="no">icu</code></a> 토큰화 도구와 함께 사용자 정의 분석기를 사용하세요. </p><p>또는 다국어 콘텐츠를 보다 정확하게 처리하기 위해 <a href="/docs/ko/multi-language-analyzers.md">다국어 분석기</a> 또는 <a href="/docs/ko/language-identifier.md">언어 식별자를</a> 구성하는 것도 고려해 보세요.</p></td>
   </tr>
</table>
<p>기본 <code translate="no">standard</code> 분석기가 요구 사항을 충족할 수 없는 경우 다른 분석기를 구현해야 합니다. 두 가지 경로가 있습니다:</p>
<ul>
<li><p><a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">기본 제공 분석기 사용</a> 또는</p></li>
<li><p><a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">사용자 정의 분석기 만들기</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">경로 A: 기본 제공 분석기 사용<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>기본 제공 분석기는 일반적인 언어에 대해 미리 구성된 솔루션입니다. 기본 표준 분석기가 적합하지 않을 때 가장 쉽게 시작할 수 있는 방법입니다.</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">사용 가능한 기본 제공 분석기<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>분석기</p></th>
     <th><p>언어 지원</p></th>
     <th><p>구성 요소</p></th>
     <th><p>참고</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>대부분의 공백으로 구분된 언어(영어, 프랑스어, 독일어, 스페인어 등)</p></td>
     <td><ul><li><p>토큰화 도구: <code translate="no">standard</code></p></li><li><p>필터: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>초기 텍스트 처리를 위한 범용 분석기. 단일 언어 시나리오의 경우 언어별 분석기(예: <code translate="no">english</code>)가 더 나은 성능을 제공합니다.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>영어 전용으로, 더 나은 영어 의미 매칭을 위해 어간 및 중지 단어 제거를 적용합니다.</p></td>
     <td><ul><li><p>토큰화: <code translate="no">standard</code></p></li><li><p>필터 <code translate="no">lowercase</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p><code translate="no">standard</code> 이상의 영어 전용 콘텐츠에 권장됩니다.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>중국어</p></td>
     <td><ul><li><p>토큰화 도구: <code translate="no">jieba</code></p></li><li><p>필터: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>현재 기본적으로 중국어 간체 사전을 사용합니다.</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">구현 예<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>기본 제공 분석기를 사용하려면 필드 스키마를 정의할 때 <code translate="no">analyzer_params</code> 에서 해당 유형을 지정하기만 하면 됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using built-in English analyzer</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>자세한 사용법은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색</a>, <a href="/docs/ko/keyword-match.md">텍스트 일치</a> 또는 <a href="/docs/ko/phrase-match.md">구문</a> 일치를 참조하세요.</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">경로 B: 사용자 지정 분석기 만들기<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">기본 제공 옵션이</a> 사용자의 요구를 충족시키지 못하는 경우 토큰화 도구와 필터 세트를 결합하여 사용자 정의 분석기를 만들 수 있습니다. 이렇게 하면 텍스트 처리 파이프라인을 완전히 제어할 수 있습니다.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">1단계: 언어에 따라 토큰화 도구 선택하기<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>콘텐츠의 기본 언어를 기준으로 토큰화 도구를 선택하세요:</p>
<h4 id="Western-languages" class="common-anchor-header">서양 언어</h4><p>공백으로 구분된 언어의 경우 다음 옵션이 있습니다:</p>
<table>
   <tr>
     <th><p>토큰화 도구</p></th>
     <th><p>작동 방식</p></th>
     <th><p>최적 대상</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>공백과 구두점을 기준으로 텍스트 분할</p></td>
     <td><p>일반 텍스트, 혼합 구두점</p></td>
     <td><ul><li><p>입력: <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>출력: <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>공백 문자만 분할</p></td>
     <td><p>사전 처리된 콘텐츠, 사용자 서식 지정 텍스트</p></td>
     <td><ul><li><p>입력 <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>출력 <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">동아시아 언어</h4><p>사전 기반 언어는 적절한 단어 분할을 위해 특수 토큰화기가 필요합니다:</p>
<h5 id="Chinese" class="common-anchor-header">중국어</h5><table>
   <tr>
     <th><p>토큰화기</p></th>
     <th><p>작동 방식</p></th>
     <th><p>최적 대상</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>지능형 알고리즘을 사용한 중국어 사전 기반 세분화</p></td>
     <td><p>중국어<strong>콘텐츠에 권장</strong> - 중국어를 위해 특별히 설계된 사전과 지능형 알고리즘을 결합합니다.</p></td>
     <td><ul><li><p>입력: <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>출력: <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>중국어 사전을 사용한 순수 사전 기반 형태소 분석<a href="https://cc-cedict.org/wiki/">(cc-cedict</a>)</p></td>
     <td><p><code translate="no">jieba</code> 와 비교하여 중국어 텍스트를 보다 일반적인 방식으로 처리합니다.</p></td>
     <td><ul><li><p>입력: <code translate="no">"机器学习算法"</code></p></li><li><p>출력 <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">일본어와 한국어</h5><table>
   <tr>
     <th><p>언어</p></th>
     <th><p>토큰화기</p></th>
     <th><p>사전 옵션</p></th>
     <th><p>최적 대상</p></th>
     <th><p>예제</p></th>
   </tr>
   <tr>
     <td><p>일본어</p></td>
     <td><p><a href="/docs/ko/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a> (범용), <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a> (현대 용어), <a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a> (학술 용어)</p></td>
     <td><p>고유 명사 처리를 통한 형태소 분석</p></td>
     <td><ul><li><p>입력: <code translate="no">"東京都渋谷区"</code></p></li><li><p>출력 <code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>한국어</p></td>
     <td><p><a href="/docs/ko/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>한국어 형태소 분석</p></td>
     <td><ul><li><p>입력: <code translate="no">"안녕하세요"</code></p></li><li><p>출력 <code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">다국어 또는 알 수 없는 언어</h4><p>문서 내에서 언어가 예측할 수 없거나 혼합된 콘텐츠에 적합합니다:</p>
<table>
   <tr>
     <th><p>토큰화</p></th>
     <th><p>작동 방식</p></th>
     <th><p>최상의 용도</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>유니코드 인식 토큰화(유니코드를 위한 국제 컴포넌트)</p></td>
     <td><p>혼합 스크립트, 알 수 없는 언어 또는 간단한 토큰화로 충분한 경우</p></td>
     <td><ul><li><p>입력: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>출력 <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>ICU를 사용해야 하는 경우</strong>:</p>
<ul>
<li><p>언어 식별이 비현실적인 혼합 언어.</p></li>
<li><p><a href="/docs/ko/multi-language-analyzers.md">다국어 분석기나</a> <a href="/docs/ko/language-identifier.md">언어 식별자의</a> 오버헤드를 원하지 않는 경우.</p></li>
<li><p>콘텐츠에 기본 언어가 있고 전체 의미에 거의 기여하지 않는 외국어가 간혹 포함된 경우(예: 브랜드 이름이 산발적으로 포함된 영어 텍스트 또는 일본어 또는 프랑스어로 된 기술 용어).</p></li>
</ul>
<p><strong>다른 접근 방식</strong>: 다국어 콘텐츠를 보다 정확하게 처리하려면 다국어 분석기 또는 언어 식별자를 사용하는 것이 좋습니다. 자세한 내용은 <a href="/docs/ko/multi-language-analyzers.md">다국어 분석기</a> 또는 <a href="/docs/ko/language-identifier.md">언어 식별자를</a> 참조하세요.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">2단계: 정밀도를 위해 필터 추가하기<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">토큰화기를 선택한</a> 후 특정 검색 요구 사항 및 콘텐츠 특성에 따라 필터를 적용합니다.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">일반적으로 사용되는 필터</h4><p>이러한 필터는 대부분의 공백으로 구분된 언어 구성(영어, 프랑스어, 독일어, 스페인어 등)에 필수적이며 검색 품질을 크게 향상시킵니다:</p>
<table>
   <tr>
     <th><p>필터</p></th>
     <th><p>작동 방식</p></th>
     <th><p>사용 시기</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>모든 토큰을 소문자로 변환</p></td>
     <td><p>범용 - 대소문자 구분이 있는 모든 언어에 적용됩니다.</p></td>
     <td><ul><li><p>입력: <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>출력: <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>단어를 어근 형태로 축소</p></td>
     <td><p>단어 굴절이 있는 언어(영어, 프랑스어, 독일어 등)</p></td>
     <td><p>영어의 경우:</p><ul><li><p>입력: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>출력: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>일반적인 의미 없는 단어 제거</p></td>
     <td><p>대부분의 언어 - 특히 공백으로 구분된 언어에 효과적임</p></td>
     <td><ul><li><p>입력: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>출력: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>동아시아 언어(중국어, 일본어, 한국어 등)의 경우, <a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">언어별 필터에</a> 집중하세요. 이러한 언어는 일반적으로 텍스트 처리에 다른 접근 방식을 사용하므로 형태소 분석의 이점이 크지 않을 수 있습니다.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">텍스트 정규화 필터</h4><p>이 필터는 텍스트 변형을 표준화하여 일치 일치도를 향상시킵니다:</p>
<table>
   <tr>
     <th><p>필터</p></th>
     <th><p>작동 방식</p></th>
     <th><p>사용 시기</p></th>
     <th><p>예제</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>악센트가 있는 문자를 ASCII 등가 문자로 변환하기</p></td>
     <td><p>해외 콘텐츠, 사용자 생성 콘텐츠</p></td>
     <td><ul><li><p>입력: <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>출력 <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">토큰 필터링</h4><p>문자 내용 또는 길이에 따라 보존할 토큰을 제어합니다:</p>
<table>
   <tr>
     <th><p>필터</p></th>
     <th><p>작동 방식</p></th>
     <th><p>사용 시기</p></th>
     <th><p>예제</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>독립형 구두점 토큰 제거하기</p></td>
     <td><p><code translate="no">jieba</code>, <code translate="no">lindera</code>, <code translate="no">icu</code> 토큰화기에서 출력을 정리하여 구두점을 단일 토큰으로 반환합니다.</p></td>
     <td><ul><li><p>입력: <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>출력: <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>문자와 숫자만 유지</p></td>
     <td><p>기술 콘텐츠, 깨끗한 텍스트 처리</p></td>
     <td><ul><li><p>입력: <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>출력: <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>지정된 길이 범위를 벗어난 토큰 제거</p></td>
     <td><p>노이즈 필터링(지나치게 긴 토큰)</p></td>
     <td><ul><li><p>입력 <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>출력: <code translate="no">[['a'], ['very'], []]</code> ( <strong>최대=10인</strong> 경우)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>사용자 지정 패턴 기반 필터링</p></td>
     <td><p>도메인별 토큰 요구 사항</p></td>
     <td><ul><li><p>입력: <code translate="no">["test123", "prod456"]</code></p></li><li><p>출력 <code translate="no">[[], ['prod456']]</code> (만약 <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">언어별 필터</h4><p>이 필터는 특정 언어 특성을 처리합니다:</p>
<table>
   <tr>
     <th><p>필터</p></th>
     <th><p>언어</p></th>
     <th><p>작동 방식</p></th>
     <th><p>예제</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>독일어</p></td>
     <td><p>복합어를 검색 가능한 구성 요소로 분할</p></td>
     <td><ul><li><p>입력: <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>출력 <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>중국어</p></td>
     <td><p>한자 + 영숫자만 유지합니다.</p></td>
     <td><ul><li><p>입력: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>출력: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>중국어</p></td>
     <td><p>한자만 유지</p></td>
     <td><ul><li><p>입력: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>출력: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">3단계: 결합 및 구현<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>사용자 정의 분석기를 만들려면 <code translate="no">analyzer_params</code> 사전에서 토큰화 도구와 필터 목록을 정의합니다. 필터는 나열된 순서대로 적용됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: A custom analyzer for technical content</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;alphanumonly&quot;</span>]
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">최종: 테스트하기 <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>컬렉션에 적용하기 전에 항상 구성을 검증하세요:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>확인해야 할 일반적인 문제</p>
<ul>
<li><p><strong>토큰화 초과</strong>: 기술 용어가 잘못 분할됨</p></li>
<li><p><strong>토큰화 미달</strong>: 구문이 제대로 분리되지 않음</p></li>
<li><p><strong>누락된 토큰</strong>: 중요한 용어가 필터링되지 않음</p></li>
</ul>
<p>자세한 사용법은 <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer를</a> 참조하세요.</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">사용 사례별 권장 구성<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 Milvus에서 분석기로 작업할 때 일반적인 사용 사례에 대한 권장 토큰화 및 필터 구성을 제공합니다. 콘텐츠 유형 및 검색 요구 사항에 가장 적합한 조합을 선택하세요.</p>
<div class="alert note">
<p>수집에 분석기를 적용하기 전에 다음을 사용하는 것이 좋습니다. <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> 를 사용하여 텍스트 분석 성능을 테스트하고 검증하세요.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">악센트 마크가 있는 언어(프랑스어, 스페인어, 독일어 등)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>소문자 변환, 언어별 어간 및 중단어 제거 기능을 갖춘 <code translate="no">standard</code> 토큰화기를 사용하세요. 이 구성은 <code translate="no">language</code> 및 <code translate="no">stop_words</code> 매개변수를 수정하여 다른 유럽 언어에도 사용할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># French example</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>, 
        <span class="hljs-string">&quot;asciifolding&quot;</span>,  <span class="hljs-comment"># Handle accent marks</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;french&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_french_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># For other languages, modify the language parameter:</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;spanish&quot; for Spanish</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;german&quot; for German</span>
<span class="hljs-comment"># &quot;stop_words&quot;: [&quot;_spanish_&quot;] or [&quot;_german_&quot;] accordingly</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="English-content" class="common-anchor-header">영어 콘텐츠<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>포괄적인 필터링 기능을 갖춘 영어 텍스트 처리용. 내장된 <a href="/docs/ko/english-analyzer.md"><code translate="no">english</code></a> 분석기를 사용할 수도 있습니다:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chinese-content" class="common-anchor-header">중국어 콘텐츠<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">jieba</code> 토큰화기를 사용하고 문자 필터를 적용하여 한자, 라틴 문자 및 숫자만 유지합니다.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>중국어 간체( <code translate="no">cnalphanumonly</code> )의 경우 중국어 문자, 영숫자 텍스트 및 숫자를 제외한 모든 토큰을 제거합니다. 이렇게 하면 구두점이 검색 품질에 영향을 미치는 것을 방지할 수 있습니다.</p>
</div>
<h3 id="Japanese-content" class="common-anchor-header">일본어 콘텐츠<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>일본어 사전 및 필터가 포함된 <code translate="no">lindera</code> 토큰화기를 사용하여 구두점을 정리하고 토큰 길이를 조절하세요:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>  <span class="hljs-comment"># Options: ipadic, ipadic-neologd, unidic</span>
    },
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;removepunct&quot;</span>,  <span class="hljs-comment"># Remove standalone punctuation</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
            <span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">20</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Korean-content" class="common-anchor-header">한국어 콘텐츠<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>일본어와 마찬가지로 한국어 사전과 함께 <code translate="no">lindera</code> 토큰화 도구를 사용합니다:</p>
<pre><code translate="no" class="language-json">analyzer_params = <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;tokenizer&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lindera&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;dict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ko-dic&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;removepunct&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;length&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;min&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;max&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">혼합 또는 다국어 콘텐츠<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>여러 언어에 걸쳐 있거나 예측할 수 없는 스크립트를 사용하는 콘텐츠로 작업할 때는 <code translate="no">icu</code> 분석기로 시작하세요. 이 유니코드 인식 분석기는 혼합 스크립트와 기호를 효과적으로 처리합니다.</p>
<p><strong>기본 다국어 구성(스템밍 없음)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>고급 다국어 처리</strong>:</p>
<p>여러 언어에서 토큰 동작을 더 잘 제어할 수 있습니다:</p>
<ul>
<li><p><strong>다국어 분석기</strong> 구성을 사용합니다. 자세한 내용은 <a href="/docs/ko/multi-language-analyzers.md">다국어 분석기를</a> 참조하세요.</p></li>
<li><p>콘텐츠에 <strong>언어 식별자를</strong> 구현합니다. 자세한 내용은 <a href="/docs/ko/language-identifier.md">언어 식별자를</a> 참조하세요.</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">텍스트 검색 기능과 통합하기<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>분석기를 선택한 후 Milvus에서 제공하는 텍스트 검색 기능과 통합할 수 있습니다.</p>
<ul>
<li><p><strong>전체 텍스트 검색</strong></p>
<p>분석기는 스파스 벡터 생성을 통해 BM25 기반 전체 텍스트 검색에 직접적인 영향을 미칩니다. 인덱싱과 쿼리 모두에 동일한 분석기를 사용하여 일관된 토큰화를 보장하세요. 언어별 분석기는 일반적으로 일반 분석기보다 더 나은 BM25 점수를 제공합니다. 구현에 대한 자세한 내용은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하세요.</p></li>
<li><p><strong>텍스트 일치</strong></p>
<p>텍스트 일치 작업은 분석기 출력에 따라 쿼리와 색인된 콘텐츠 간에 정확한 토큰 일치를 수행합니다. 구현에 대한 자세한 내용은 <a href="/docs/ko/keyword-match.md">텍스트 일치를</a> 참조하세요.</p></li>
<li><p><strong>구문 일치</strong></p>
<p>구문 검색은 구문 경계와 의미를 유지하기 위해 여러 단어 표현에 걸쳐 일관된 토큰화가 필요합니다. 구현에 대한 자세한 내용은 <a href="/docs/ko/phrase-match.md">구문 일치를</a> 참조하세요.</p></li>
</ul>
