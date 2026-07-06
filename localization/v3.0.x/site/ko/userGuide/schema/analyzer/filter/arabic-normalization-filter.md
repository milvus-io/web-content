---
id: arabic-normalization-filter.md
title: 아랍어 정규화Compatible with Milvus 3.0.0+
summary: 'arabic_normalization 필터는 아랍어 문자 변형을 정규화하고, 아랍어 분음 부호 및 타트윌을 제거합니다.'
beta: Milvus 3.0.0+
---
<h1 id="Arabic-Normalization" class="common-anchor-header">아랍어 정규화<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Arabic-Normalization" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">arabic_normalization</code> 필터는 아랍어 텍스트를 위한 내장 토큰 필터입니다. 이 필터는 아랍어 특유의 문자 변형을 정규화하고, 텍스트 분석 시 동일한 아랍어 용어가 서로 다르게 보일 수 있게 만드는 선택적 표기를 제거합니다.</p>
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
    </button></h2><div class="alert note">
<p>아랍어 텍스트의 경우, 대부분의 경우 내장된 <a href="/docs/ko/arabic-analyzer.md"><code translate="no">arabic</code></a> 분석기를 사용하십시오. 이 내장 분석기에는 표준 토큰화, 소문자 변환, 소수점 자리 수 정규화, 아랍어 어근 추출 및 아랍어 스톱워드 제거 기능과 함께 이 필터가 포함되어 있습니다. 사용자 정의 분석기 파이프라인을 구축해야 하는 경우에만 ‘ <code translate="no">arabic_normalization</code> ’ 필터를 직접 사용하십시오.</p>
</div>
<p>사용자 정의 분석기에서 <code translate="no">arabic_normalization</code> 필터를 사용하려면, <code translate="no">analyzer_params</code> 파일의 <code translate="no">filter</code> 섹션에 다음을 추가하십시오:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;arabic_normalization&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">arabic_normalization</code> 필터에는 구성 가능한 매개변수가 없습니다.</p>
<p>이 필터는 다음과 같은 변환을 적용합니다:</p>
<table>
   <tr>
     <th><p>변환</p></th>
     <th><p>원본</p></th>
     <th><p>변환 후</p></th>
   </tr>
   <tr>
     <td><p>함자 + 알레프 변형</p></td>
     <td><p><code translate="no">آ</code>, <code translate="no">أ</code>, <code translate="no">إ</code></p></td>
     <td><p><code translate="no">ا</code></p></td>
   </tr>
   <tr>
     <td><p>테 마르부타</p></td>
     <td><p><code translate="no">ة</code></p></td>
     <td><p><code translate="no">ه</code></p></td>
   </tr>
   <tr>
     <td><p>알레프 막수라</p></td>
     <td><p><code translate="no">ى</code></p></td>
     <td><p><code translate="no">ي</code></p></td>
   </tr>
   <tr>
     <td><p>하라카트</p></td>
     <td><p><code translate="no">U+064B</code> ~ <code translate="no">U+065F</code></p></td>
     <td><p>삭제됨</p></td>
   </tr>
   <tr>
     <td><p>타트윌 / 카시다</p></td>
     <td><p><code translate="no">ـ</code></p></td>
     <td><p>제거됨</p></td>
   </tr>
</table>
<p>이 필터는 토큰화기가 생성한 토큰을 대상으로 작동합니다. 위의 구성은 의도적으로 사용자 정의 분석기 예시이며, 완전한 아랍어 처리 파이프라인을 포함하지 않습니다.</p>
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
    </button></h2><p>분석기 구성을 컬렉션 스키마에 적용하기 전에, ` <code translate="no">run_analyzer</code> ` 메서드를 사용하여 동작을 확인하십시오.</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">분석기 구성<button data-href="#Analyzer-configuration" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;arabic_normalization&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">다음 메서드를 사용한 검증 <code translate="no">run_analyzer</code><button data-href="#Verification-using-runanalyzer" class="anchor-icon" translate="no">
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

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sample_text = <span class="hljs-string">&quot;آدم أحمد إسلام مدرسة كبرى كِتَابٌ عـــربي&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;ادم&#x27;</span>, <span class="hljs-string">&#x27;احمد&#x27;</span>, <span class="hljs-string">&#x27;اسلام&#x27;</span>, <span class="hljs-string">&#x27;مدرسه&#x27;</span>, <span class="hljs-string">&#x27;كبري&#x27;</span>, <span class="hljs-string">&#x27;كتاب&#x27;</span>, <span class="hljs-string">&#x27;عربي&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
