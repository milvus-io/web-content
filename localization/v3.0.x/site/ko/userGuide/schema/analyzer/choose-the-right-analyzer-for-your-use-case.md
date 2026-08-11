---
id: choose-the-right-analyzer-for-your-use-case.md
title: 사용 사례에 적합한 분석기 선택하기
summary: 참고 사항
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
<p>이 가이드는 분석기 선정에 대한 실질적인 의사 결정에 중점을 둡니다. 분석기 구성 요소 및 분석기 매개변수 추가 방법에 대한 기술적 세부 사항은 <a href="/docs/ko/analyzer-overview.md">‘분석기 개요’를</a> 참조하십시오.</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">2분 만에 분석기 이해하기<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 분석기는 이 필드에 저장된 텍스트를 처리하여 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색</a> (BM25), <a href="/docs/ko/phrase-match.md">구문 일치</a> 또는 <a href="/docs/ko/keyword-match.md">텍스트 일치와</a> 같은 기능을 통해 검색이 가능하도록 만듭니다. 이를 원시 콘텐츠를 검색 가능한 토큰으로 변환하는 텍스트 프로세서로 생각하시면 됩니다.</p>
<p>애널라이저는 다음과 같은 간단한 2단계 파이프라인으로 작동합니다:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" /> 
   <span>분석기 워크플로</span>
  
 </span></p>
<ol>
<li><p><strong>토큰화(필수):</strong> 이 초기 단계에서는 <strong>토큰화기를</strong> 적용하여 연속된 텍스트 문자열을 토큰이라고 하는 개별적이고 의미 있는 단위로 분할합니다. 토큰화 방법은 언어와 콘텐츠 유형에 따라 크게 달라질 수 있습니다.</p></li>
<li><p><strong>토큰 필터링(선택 사항):</strong> 토큰화 후, <strong>필터를</strong> 적용하여 토큰을 수정, 제거 또는 정제합니다. 이러한 작업에는 모든 토큰을 소문자로 변환하거나, 흔한 무의미한 단어(예: 스톱워드)를 제거하거나, 단어를 어근 형태로 환원(스템밍)하는 것이 포함될 수 있습니다.</p></li>
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
    </button></h2><p>부적절한 분석기를 선택하면 관련 문서를 검색할 수 없거나 관련 없는 결과가 반환될 수 있습니다.</p>
<p>다음 표는 부적절한 분석기 선택으로 인해 발생하는 일반적인 문제를 요약하고, 검색 문제를 진단하기 위한 실질적인 해결책을 제시합니다.</p>
<table>
   <tr>
     <th><p>문제</p></th>
     <th><p>증상</p></th>
     <th><p>예시 (입력 및 출력)</p></th>
     <th><p>원인 (부적절한 분석기)</p></th>
     <th><p>해결책 (적절한 분석기)</p></th>
   </tr>
   <tr>
     <td><p>과도한 토큰화</p></td>
     <td><p>기술 용어, 식별자 또는 URL을 포함한 텍스트 쿼리에서 관련 문서를 찾지 못합니다.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/ko/standard-analyzer.md"><code translate="no">standard</code></a> 분석기</p></td>
     <td><p>토큰화기를 <a href="/docs/ko/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> 토큰화기를 사용하고, 이를 <a href="/docs/ko/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> 필터와 결합합니다.</p></td>
   </tr>
   <tr>
     <td><p>과도한 토큰화</p></td>
     <td><p>여러 단어로 구성된 구의 일부를 검색할 때, 해당 구 전체가 포함된 문서가 반환되지 않습니다.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>다음이 포함된 분석기 <a href="/docs/ko/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> 토큰화기를</p></td>
     <td><p>구두점과 공백을 기준으로 분할하는 <a href="/docs/ko/standard-tokenizer.md"><code translate="no">standard</code></a> 토큰화기를 사용하여 구두점과 공백을 기준으로 분할하고, 사용자 정의 <a href="/docs/ko/regex-filter.md">정규식</a> 필터를 사용하십시오.</p></td>
   </tr>
   <tr>
     <td><p>언어 불일치</p></td>
     <td><p>특정 언어에 대한 검색 결과가 무의미하거나 아예 표시되지 않습니다.</p></td>
     <td><p>중국어 텍스트: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (토큰 1개)</p></td>
     <td><p><a href="/docs/ko/english-analyzer.md"><code translate="no">english</code></a> 분석기</p></td>
     <td><p>다음과 같은 언어별 분석기를 사용하십시오. <a href="/docs/ko/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
   <tr>
     <td><p>입력 방식 불일치</p></td>
     <td><p>사용자는 병음을 입력하지만, 색인된 텍스트는 한자를 사용합니다.</p></td>
     <td><p>중국어 텍스트: <code translate="no">"足球"</code>; 쿼리 텍스트: <code translate="no">"zuqiu"</code></p></td>
     <td><p>한자 토큰만 생성하는 분석기</p></td>
     <td><p>다음과 같은 사용자 정의 분석기를 사용하십시오. <a href="/docs/ko/jieba-tokenizer.md"><code translate="no">jieba</code></a> 토큰화기 및 <a href="/docs/ko/pinyin-filter.md"><code translate="no">pinyin</code></a> 필터를 적용한 사용자 정의 분석기를 사용하십시오.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">첫 번째 질문: 분석기를 선택해야 할까요?<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>대부분의 사용 사례에서는 별도의 조치가 필요하지 않습니다. 귀하의 경우가 이에 해당하는지 확인해 봅시다.</p>
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
    </button></h3><p>전체 텍스트 검색과 같은 텍스트 검색 기능을 사용할 때 분석기를 명시적으로 지정하지 않으면, Milvus는 자동으로 <a href="/docs/ko/standard-analyzer.md"><code translate="no">standard</code></a> 분석기를 자동으로 사용합니다.</p>
<p><code translate="no">standard</code> 분석기는 다음과 같은 동작을 합니다:</p>
<ul>
<li><p>공백과 구두점을 기준으로 텍스트를 분할합니다.</p></li>
<li><p>모든 토큰을 소문자로 변환합니다.</p></li>
<li><p>내장된 일반적인 영어 스톱 워드 세트와 대부분의 구두점을 제거합니다</p></li>
</ul>
<p><strong>변환 예시</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">결정 기준: 간단한 확인<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>이 표를 사용하여 기본 제공되는 ‘ <code translate="no">standard</code> ’ 분석기가 귀하의 요구 사항을 충족하는지 빠르게 확인하십시오. 충족하지 않는 경우, 다른 방법을 선택해야 합니다.</p>
<table>
   <tr>
     <th><p>콘텐츠</p></th>
     <th><p>표준 분석기로 충분합니까?</p></th>
     <th><p>이유</p></th>
     <th><p>필요한 사항</p></th>
   </tr>
   <tr>
     <td><p>영어 블로그 게시물</p></td>
     <td><p>✅ 예</p></td>
     <td><p>기본 동작으로 충분합니다.</p></td>
     <td><p>기본값을 사용하세요(별도의 구성이 필요하지 않음).</p></td>
   </tr>
   <tr>
     <td><p>중국어 문서</p></td>
     <td><p>❌ 아니요</p></td>
     <td><p>중국어 단어에는 공백이 없으므로 하나의 토큰으로 처리됩니다.</p></td>
     <td><p>내장된 <a href="/docs/ko/chinese-analyzer.md"><code translate="no">chinese</code></a> 분석기를 사용하십시오.</p></td>
   </tr>
   <tr>
     <td><p>아랍어 문서</p></td>
     <td><p>❌ 아니요</p></td>
     <td><p>아랍어 텍스트에는 문자 변형, 분음 부호, 타트윌, 아랍-인도 숫자 및 언어별 처리가 필요한 일반적인 아랍어 스톱워드가 포함될 수 있습니다.</p></td>
     <td><p>내장된 <a href="/docs/ko/arabic-analyzer.md"><code translate="no">arabic</code></a> 분석기를 사용하십시오.</p></td>
   </tr>
   <tr>
     <td><p>태국어 문서</p></td>
     <td><p>❌ 아니요</p></td>
     <td><p>태국어 텍스트는 일반적으로 단어 사이에 공백을 사용하지 않으므로, 언어별 단어 분할이 필요합니다.</p></td>
     <td><p>내장된 <a href="/docs/ko/thai-analyzer.md"><code translate="no">thai</code></a> 분석기를 사용하십시오.</p></td>
   </tr>
   <tr>
     <td><p>기술 문서</p></td>
     <td><p>❌ 아니요</p></td>
     <td><p><code translate="no">C++</code> 와 같은 용어에서 구두점이 제거됩니다.</p></td>
     <td><p>토큰화기를 사용하여 사용자 정의 분석기를 생성하십시오 <a href="/docs/ko/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> 토큰화기와 <a href="/docs/ko/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> 필터를 사용하여 사용자 정의 분석기를 만드십시오.</p></td>
   </tr>
   <tr>
     <td><p>프랑스어/스페인어 텍스트와 같이 공백으로 구분된 언어</p></td>
     <td><p>⚠️ 주의</p></td>
     <td><p>악센트가 있는 문자(<code translate="no">café</code> 대 <code translate="no">cafe</code>)가 일치하지 않을 수 있습니다.</p></td>
     <td><p>더 나은 결과를 얻으려면 <a href="/docs/ko/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> 사용하는 사용자 정의 분석기를 사용하는 것이 더 나은 결과를 얻기 위해 권장됩니다.</p></td>
   </tr>
   <tr>
     <td><p>다국어 또는 알 수 없는 언어</p></td>
     <td><p>❌ 아니요</p></td>
     <td><p><code translate="no">standard</code> 분석기에는 다양한 문자 집합과 토큰화 규칙을 처리하는 데 필요한 언어별 로직이 부족합니다.</p></td>
     <td><p>유니코드 인식 토큰화를 위해 <a href="/docs/ko/icu-tokenizer.md"><code translate="no">icu</code></a> 유니코드 인식 토큰화를 위한 토큰화기를 함께 사용하십시오. </p><p>또는 다국어 콘텐츠를 보다 정확하게 처리하기 위해 <a href="/docs/ko/multi-language-analyzers.md">다국어 분석기나</a> <a href="/docs/ko/language-identifier.md">언어 식별자를</a> 구성하는 것을 고려해 보십시오.</p></td>
   </tr>
</table>
<p>기본 <code translate="no">standard</code> 분석기가 요구 사항을 충족하지 못하는 경우, 다른 분석기를 구현해야 합니다. 다음 두 가지 방법이 있습니다.</p>
<ul>
<li><p><a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">내장 분석기를 사용하거나</a> </p></li>
<li><p><a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">사용자 정의 분석기 생성</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">방법 A: 내장 분석기 사용<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>내장 분석기는 일반적인 언어를 위해 미리 구성된 솔루션입니다. 기본 표준 분석기가 완벽하게 적합하지 않을 때 시작하기에 가장 쉬운 방법입니다.</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">사용 가능한 내장 분석기<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
     <th><p>지원 언어</p></th>
     <th><p>구성 요소</p></th>
     <th><p>참고</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>대부분의 공백으로 구분되는 언어(영어, 프랑스어, 독일어, 스페인어 등)</p></td>
     <td><ul><li><p>토큰화기: <code translate="no">standard</code></p></li><li><p>필터: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>초기 텍스트 처리를 위한 범용 분석기입니다. 단일 언어 환경의 경우, 언어별 분석기(예: <code translate="no">english</code>)가 더 나은 성능을 제공합니다.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>영어 전용으로, 더 나은 영어 의미 일치를 위해 어간 추출 및 중지어 제거 기능을 적용합니다.</p></td>
     <td><ul><li><p>토큰화기: <code translate="no">standard</code></p></li><li><p>필터: <code translate="no">lowercase</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p><code translate="no">standard</code> 보다 영어 전용 콘텐츠에 권장됩니다.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>중국어</p></td>
     <td><ul><li><p>토큰화기: <code translate="no">jieba</code></p></li><li><p>필터: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>현재 기본적으로 간체 중국어 사전을 사용합니다.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/arabic-analyzer.md"><code translate="no">arabic</code></a></p></td>
     <td><p>아랍어</p></td>
     <td><ul><li><p>토큰화기: <code translate="no">standard</code></p></li><li><p>필터: <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">arabic_normalization</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p><code translate="no">standard</code> 보다 아랍어 텍스트에 권장됩니다.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/thai-analyzer.md"><code translate="no">thai</code></a></p></td>
     <td><p>태국어</p></td>
     <td><ul><li><p>토큰화기: <code translate="no">thai</code></p></li><li><p>필터: <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p><code translate="no">standard</code> 또는 공백 기반 토큰화보다 태국어 텍스트에 권장됩니다.</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">구현 예시<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>내장 분석기를 사용하려면 필드 스키마를 정의할 때 <code translate="no">analyzer_params</code> 에 해당 유형을 지정하기만 하면 됩니다.</p>
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
<p>자세한 사용법은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색</a>, <a href="/docs/ko/keyword-match.md">텍스트 일치</a> 또는 <a href="/docs/ko/phrase-match.md">구문 일치를</a> 참조하십시오.</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">방법 B: 사용자 정의 분석기 만들기<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">내장 옵션이</a> 요구 사항을 충족하지 못하는 경우, 토큰화기와 일련의 필터를 결합하여 사용자 지정 분석기를 생성할 수 있습니다. 이를 통해 텍스트 처리 파이프라인을 완벽하게 제어할 수 있습니다.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">1단계: 언어에 따라 토큰화기 선택<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>콘텐츠의 주 언어에 따라 토큰화기를 선택하십시오:</p>
<h4 id="Western-languages" class="common-anchor-header">서구 언어</h4><p>공백으로 구분되는 언어의 경우 다음과 같은 옵션이 있습니다:</p>
<table>
   <tr>
     <th><p>토큰화기</p></th>
     <th><p>작동 방식</p></th>
     <th><p>가장 적합한 대상</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>공백과 구두점을 기준으로 텍스트를 분할합니다</p></td>
     <td><p>일반 텍스트, 다양한 구두점이 혼합된 경우</p></td>
     <td><ul><li><p>입력: <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>출력: <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>공백 문자에서만 분할합니다</p></td>
     <td><p>사전 처리된 콘텐츠, 사용자가 서식을 지정한 텍스트</p></td>
     <td><ul><li><p>입력: <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>출력: <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">동아시아 언어</h4><p>단어 사이에 공백을 일관되게 사용하지 않는 언어는 올바른 단어 분할을 위해 특수한 토큰화기가 필요합니다:</p>
<h5 id="Chinese" class="common-anchor-header">중국어</h5><table>
   <tr>
     <th><p>토큰화기</p></th>
     <th><p>작동 원리</p></th>
     <th><p>가장 적합한 대상</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>지능형 알고리즘을 활용한 중국어 사전 기반 분절</p></td>
     <td><p><strong>중국어 콘텐츠에 권장</strong> - 중국어 전용으로 설계된 사전과 지능형 알고리즘을 결합</p></td>
     <td><ul><li><p>입력: <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>출력: <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>중국어 사전(<a href="https://cc-cedict.org/wiki/">cc-cedict</a>)을 활용한 순수 사전 기반 형태소 분석</p></td>
     <td><p><code translate="no">jieba</code> 와 비교하여, 중국어 텍스트를 보다 일반적인 방식으로 처리합니다</p></td>
     <td><ul><li><p>입력: <code translate="no">"机器学习算法"</code></p></li><li><p>출력: <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Thai" class="common-anchor-header">태국어</h5><p>대부분의 태국어 텍스트의 경우, 내장된 <a href="/docs/ko/thai-analyzer.md"><code translate="no">thai</code></a> 분석기를 사용하십시오. 독립형 <a href="/docs/ko/thai-tokenizer.md"><code translate="no">thai</code></a> 토큰화기를 사용하십시오.</p>
<table>
   <tr>
     <th><p>토큰화기</p></th>
     <th><p>작동 원리</p></th>
     <th><p>적용 대상</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/thai-tokenizer.md"><code translate="no">thai</code></a></p></td>
     <td><p>태국어 텍스트를 단어 토큰으로 분할하고, 공백 및 구두점만 포함된 세그먼트를 걸러냅니다.</p></td>
     <td><p>태국어 또는 태국어와 영어가 혼합된 텍스트를 위한 맞춤형 분석기 파이프라인</p></td>
     <td><ul><li><p>입력: <code translate="no">"สวัสดี! ทดสอบ, ระบบ Milvus"</code></p></li><li><p>출력: <code translate="no">['สวัสดี', 'ทดสอบ', 'ระบบ', 'Milvus']</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">일본어 및 한국어</h5><table>
   <tr>
     <th><p>언어</p></th>
     <th><p>토큰화기</p></th>
     <th><p>사전 옵션</p></th>
     <th><p>가장 적합한 용도</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p>일본어</p></td>
     <td><p><a href="/docs/ko/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a> (범용), <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a> (현대 용어), <a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a> (학술용)</p></td>
     <td><p>고유명사 처리가 포함된 형태소 분석</p></td>
     <td><ul><li><p>입력: <code translate="no">"東京都渋谷区"</code></p></li><li><p>출력: <code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>한국어</p></td>
     <td><p><a href="/docs/ko/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>한국어 형태소 분석</p></td>
     <td><ul><li><p>입력: <code translate="no">"안녕하세요"</code></p></li><li><p>출력: <code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">다국어 또는 알 수 없는 언어</h4><p>문서 내에서 사용 언어가 예측 불가능하거나 여러 언어가 혼합된 콘텐츠의 경우:</p>
<table>
   <tr>
     <th><p>토큰화기</p></th>
     <th><p>작동 원리</p></th>
     <th><p>가장 적합한 용도</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>유니코드 인식 토큰화 (International Components for Unicode)</p></td>
     <td><p>여러 문자 체계가 혼합된 경우, 알 수 없는 언어의 경우, 또는 간단한 토큰화가 충분한 경우</p></td>
     <td><ul><li><p>입력: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>출력: <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>icu를 사용할 때</strong>:</p>
<ul>
<li><p>언어 식별이 사실상 불가능한 혼합 언어의 경우.</p></li>
<li><p><a href="/docs/ko/multi-language-analyzers.md">다국어 분석기나</a> <a href="/docs/ko/language-identifier.md">언어 식별자에</a> 따른 부하를 원치 않는 경우.</p></li>
<li><p>콘텐츠에 주 언어가 있으며, 전체적인 의미에 거의 영향을 미치지 않는 외국어 단어가 간혹 포함된 경우(예: 일본어나 프랑스어로 된 브랜드 이름이나 전문 용어가 산발적으로 포함된 영어 텍스트).</p></li>
</ul>
<p><strong>대안</strong>: 다국어 콘텐츠를 보다 정밀하게 처리하려면 다국어 분석기나 언어 식별자를 사용하는 것을 고려해 보십시오. 자세한 내용은 <a href="/docs/ko/multi-language-analyzers.md">다국어 분석기</a> 또는 <a href="/docs/ko/language-identifier.md">언어 식별자를</a> 참조하십시오.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">2단계: 정확도를 높이기 위한 필터 추가<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">토큰화기를 선택한</a> 후, 구체적인 검색 요구 사항과 콘텐츠 특성에 따라 필터를 적용하십시오.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">일반적으로 사용되는 필터</h4><p>이러한 필터는 공백으로 구분되는 대부분의 언어 구성(영어, 프랑스어, 독일어, 스페인어 등)에 필수적이며, 검색 품질을 크게 향상시킵니다:</p>
<table>
   <tr>
     <th><p>필터</p></th>
     <th><p>작동 원리</p></th>
     <th><p>사용 시점</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>모든 토큰을 소문자로 변환</p></td>
     <td><p>범용 - 대소문자를 구분하는 모든 언어에 적용됩니다</p></td>
     <td><ul><li><p>입력: <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>출력: <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>단어를 어근 형태로 환원하기</p></td>
     <td><p>어형 변화가 있는 언어(영어, 프랑스어, 독일어 등)</p></td>
     <td><p>영어의 경우:</p><ul><li><p>입력: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>출력: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>흔히 쓰이는 무의미한 단어 제거</p></td>
     <td><p>대부분의 언어 - 특히 공백으로 구분되는 언어에 효과적</p></td>
     <td><ul><li><p>입력: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>출력: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>동아시아 언어(중국어, 일본어, 한국어 등)의 경우, 대신 <a href="/docs/ko/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">언어별 필터에</a> 중점을 두십시오. 이러한 언어들은 일반적으로 텍스트 처리에 있어 다른 접근 방식을 사용하므로, 어간 추출을 통해 큰 이점을 얻지 못할 수 있습니다.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">텍스트 정규화 필터</h4><p>이 필터들은 텍스트의 변형을 표준화하여 일치 일관성을 높입니다:</p>
<table>
   <tr>
     <th><p>필터</p></th>
     <th><p>작동 원리</p></th>
     <th><p>사용 시점</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>악센트 부호가 붙은 문자를 ASCII 등가 문자로 변환</p></td>
     <td><p>국제 콘텐츠, 사용자 생성 콘텐츠</p></td>
     <td><ul><li><p>입력: <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>출력: <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">토큰 필터링</h4><p>문자 내용이나 길이에 따라 보존할 토큰을 제어:</p>
<table>
   <tr>
     <th><p>필터</p></th>
     <th><p>작동 원리</p></th>
     <th><p>사용 시점</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>단독으로 사용되는 구두점 토큰 제거</p></td>
     <td><p><code translate="no">jieba</code>, <code translate="no">lindera</code>, <code translate="no">icu</code> 토큰화기에서 반환되는 출력을 정리합니다. 이 토큰화기들은 구두점을 단일 토큰으로 반환합니다.</p></td>
     <td><ul><li><p>입력: <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>출력: <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>문자와 숫자만 남기기</p></td>
     <td><p>기술 콘텐츠, 정제된 텍스트 처리</p></td>
     <td><ul><li><p>입력: <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>출력: <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>지정된 길이 범위 외의 토큰 제거</p></td>
     <td><p>노이즈(지나치게 긴 토큰) 필터링</p></td>
     <td><ul><li><p>입력: <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>출력: <code translate="no">[['a'], ['very'], []]</code> ( <strong>max=10인</strong> 경우)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>사용자 정의 패턴 기반 필터링</p></td>
     <td><p>도메인별 토큰 요구 사항</p></td>
     <td><ul><li><p>입력: <code translate="no">["test123", "prod456"]</code></p></li><li><p>출력: <code translate="no">[[], ['prod456']]</code> ( <strong>expr="^prod"</strong>인 경우)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">언어별 필터</h4><p>다음 필터는 특정 언어의 특성을 처리합니다:</p>
<table>
   <tr>
     <th><p>필터</p></th>
     <th><p>언어</p></th>
     <th><p>작동 방식</p></th>
     <th><p>예시</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>독일어</p></td>
     <td><p>복합어를 검색 가능한 구성 요소로 분할합니다</p></td>
     <td><ul><li><p>입력: <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>출력: <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>중국어</p></td>
     <td><p>한자 및 영숫자 유지</p></td>
     <td><ul><li><p>입력: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>출력: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>중국어</p></td>
     <td><p>한자만 유지</p></td>
     <td><ul><li><p>입력: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>출력: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/pinyin-filter.md"><code translate="no">pinyin</code></a></p></td>
     <td><p>중국어</p></td>
     <td><p>중국어 토큰에 대해 병음 토큰 형태를 출력합니다</p></td>
     <td><ul><li><p>입력: <code translate="no">["中文"]</code></p></li><li><p>출력: <code translate="no">[['中文', 'zhong', 'wen']]</code></p></li></ul></td>
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
    </button></h3><p>사용자 정의 분석기를 생성하려면 ` <code translate="no">analyzer_params</code> ` 사전에서 토큰화기와 필터 목록을 정의합니다. 필터는 나열된 순서대로 적용됩니다.</p>
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
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">최종: 다음을 사용하여 테스트 <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>컬렉션에 적용하기 전에 항상 구성을 검증하십시오:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>확인해야 할 일반적인 문제:</p>
<ul>
<li><p><strong>과도한 토큰화</strong>: 기술 용어가 잘못 분할되는 경우</p></li>
<li><p><strong>토큰화 부족</strong>: 구문이 제대로 분리되지 않음</p></li>
<li><p><strong>토큰 누락</strong>: 중요한 용어가 필터링되어 제외됨</p></li>
</ul>
<p>자세한 사용 방법은 <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer를</a> 참조하십시오.</p>
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
    </button></h2><p>이 섹션에서는 Milvus에서 분석기를 사용할 때 흔히 발생하는 사용 사례에 대한 권장 토큰화기 및 필터 구성을 제공합니다. 콘텐츠 유형과 검색 요구 사항에 가장 적합한 조합을 선택하십시오.</p>
<div class="alert note">
<p>컬렉션에 분석기를 적용하기 전에, <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> 를 사용하여 텍스트 분석 성능을 테스트하고 검증할 것을 권장합니다.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">악센트 기호가 있는 언어(프랑스어, 스페인어, 독일어 등)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">standard</code> 토큰화기를 사용하여 소문자 변환, 언어별 어근 추출 및 스톱워드 제거 기능을 적용하십시오. 이 구성은 <code translate="no">language</code> 및 <code translate="no">stop_words</code> 매개변수를 수정하여 다른 유럽 언어에도 적용할 수 있습니다.</p>
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
    </button></h3><p>포괄적인 필터링이 적용된 영어 텍스트 처리를 위한 것입니다. 내장된 <a href="/docs/ko/english-analyzer.md"><code translate="no">english</code></a> 분석기를 사용할 수도 있습니다:</p>
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
    </button></h3><p><code translate="no">jieba</code> 토큰화기를 사용하고, 한자, 라틴 문자 및 숫자만 남기도록 문자 필터를 적용합니다.</p>
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
<p>간체자의 경우, ‘ <code translate="no">cnalphanumonly</code> ’는 한자, 영숫자 및 숫자를 제외한 모든 토큰을 제거합니다. 이를 통해 구두점이 검색 품질에 영향을 미치는 것을 방지할 수 있습니다.</p>
</div>
<p>사용자가 병음(Pinyin)을 입력하여 중국어 텍스트를 검색할 가능성이 있는 경우, 내장된 <code translate="no">jieba</code> 분석기 대신 토큰화기와 <a href="/docs/ko/pinyin-filter.md"><code translate="no">pinyin</code></a><code translate="no">chinese</code> 필터를 적용한 사용자 정의 분석기를 사용하십시오.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p><code translate="no">lindera</code> 토큰화기와 일본어 사전 및 필터를 사용하여 구두점을 제거하고 토큰 길이를 제어하십시오:</p>
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
    </button></h3><p>일본어와 마찬가지로, 한국어 사전을 적용한 <code translate="no">lindera</code> 토큰화기를 사용합니다:</p>
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
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">혼합 언어 또는 다국어 콘텐츠<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>여러 언어가 혼합되어 있거나 문자 체계가 예측 불가능한 콘텐츠를 처리할 때는 <code translate="no">icu</code> 분석기를 먼저 사용해 보십시오. 이 유니코드 지원 분석기는 혼합된 문자 체계와 기호를 효과적으로 처리합니다.</p>
<p><strong>기본 다국어 구성(어근 추출 없음)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>고급 다국어 처리</strong>:</p>
<p>서로 다른 언어 간 토큰 동작을 더 세밀하게 제어하려면:</p>
<ul>
<li><p><strong>다국어 분석기</strong> 구성을 사용하십시오. 자세한 내용은 <a href="/docs/ko/multi-language-analyzers.md">다국어 분석기를</a> 참조하십시오.</p></li>
<li><p>콘텐츠에 <strong>언어 식별자를</strong> 구현하십시오. 자세한 내용은 <a href="/docs/ko/language-identifier.md">‘언어 식별자’를</a> 참조하십시오.</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">텍스트 검색 기능과 통합<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>분석기를 선택한 후, Milvus에서 제공하는 텍스트 검색 기능과 통합할 수 있습니다.</p>
<ul>
<li><p><strong>전체 텍스트 검색</strong></p>
<p>분석기는 스파스 벡터 생성을 통해 BM25 기반 전체 텍스트 검색에 직접적인 영향을 미칩니다. 일관된 토큰화를 보장하기 위해 색인 생성 및 쿼리 시 동일한 분석기를 사용하십시오. 일반적으로 언어별 분석기는 범용 분석기보다 더 나은 BM25 점수를 제공합니다. 구현에 대한 자세한 <a href="/docs/ko/full-text-search.md">내용은 ‘전체 텍스트 검색’을</a> 참조하십시오.</p></li>
<li><p><strong>텍스트 일치</strong></p>
<p>텍스트 일치 연산은 분석기 출력을 기반으로 쿼리와 색인된 콘텐츠 간의 토큰을 정확히 일치시킵니다. 구현에 대한 자세한 내용은 <a href="/docs/ko/keyword-match.md">‘텍스트 일치’를</a> 참조하십시오.</p></li>
<li><p><strong>구문 일치</strong></p>
<p>구문 일치는 구문의 경계와 의미를 유지하기 위해 여러 단어로 구성된 표현 전반에 걸쳐 일관된 토큰화를 필요로 합니다. 구현에 대한 자세한 내용은 <a href="/docs/ko/phrase-match.md">‘구문 일치’를</a> 참조하십시오.</p></li>
</ul>
