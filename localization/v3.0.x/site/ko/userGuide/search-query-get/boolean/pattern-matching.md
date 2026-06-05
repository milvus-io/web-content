---
id: pattern-matching.md
title: 패턴 일치
summary: >-
  Milvus는 LIKE 와일드카드 패턴과 RE2 정규식을 사용한 문자열 패턴 일치를 지원합니다. 패턴 필터를 사용하여 접두사, 접미사, 하위
  문자열, 구조화된 코드, 이메일 도메인, URL 경로 및 기타 문자열 패턴을 VARCHAR 필드, JSON 문자열 경로 또는 ARRAY
  요소에서 일치시킬 수 있습니다.
---
<h1 id="Pattern-Matching" class="common-anchor-header">패턴 일치<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>에이전트 검색 애플리케이션에서 벡터 검색과 grep 스타일의 패턴 일치는 종종 서로를 보완합니다. 벡터 검색은 의미적으로 연관성이 있는 엔터티를 검색하는 반면, 패턴 일치는 오류 코드, 로그 접두사, 이메일 도메인, URL 경로 또는 식별자와 같은 정확한 문자열 구조로 검색 결과를 좁혀줍니다.</p>
<p>Milvus에서는 이러한 패턴 제약 조건을 스칼라 필터에서 간단한 와일드카드 일치의 경우 <code translate="no">LIKE</code>, <a href="https://github.com/google/re2/wiki/syntax">RE2</a> 정규식의 경우 <code translate="no">=~</code> 또는 <code translate="no">!~</code> 를 사용하여 표현할 수 있습니다. 이러한 필터를 <code translate="no">query</code>, <code translate="no">search</code>, 또는 하이브리드 검색과 결합할 수 있습니다.</p>
<p>패턴 일치 표현식은 <code translate="no">filter</code> 매개변수에 작성됩니다. 예를 들어 다음 쿼리는 <code translate="no">E1001</code> 과 같은 오류 코드가 포함된 로그 메시지를 일치시킵니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>이 페이지의 예는 <code translate="no">filter</code> 에 할당된 표현식에 초점을 맞추고 있습니다. <code translate="no">query</code>, <code translate="no">search</code>, 하이브리드 검색과 같이 스칼라 필터를 허용하는 Milvus 작업에서도 동일한 필터 표현식 구문을 사용할 수 있습니다.</p>
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
    </button></h2><p>문자열 값에 대해 패턴 일치를 사용할 수 있습니다.</p>
<table>
<thead>
<tr><th>대상</th><th><code translate="no">LIKE</code></th><th>정규식 <code translate="no">=~</code> / <code translate="no">!~</code></th><th>참고</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> 필드</td><td>예</td><td>예</td><td>문자열 필드에서 패턴 일치를 위한 일반적인 대상입니다.</td></tr>
<tr><td><code translate="no">JSON</code> <code translate="no">VARCHAR</code> 캐스트 유형이 있는 경로</td><td>예</td><td>예</td><td>양수 일치를 위해 JSON 경로 값은 문자열이어야 합니다. 가속을 위해 JSON 경로에 인덱스를 생성하는 경우 <code translate="no">json_cast_type=&quot;varchar&quot;</code> 을 설정합니다.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> 요소</td><td>예</td><td>예</td><td><code translate="no">tags[0]</code> 와 같이 인덱스별로 특정 요소를 일치시킵니다. 패턴 일치는 모든 요소를 검사하는 것이 <strong>아니라</strong> 지정된 인덱스의 요소에만 적용됩니다.</td></tr>
<tr><td>숫자, 부울, 벡터, <code translate="no">TEXT</code> 또는 기타<code translate="no">VARCHAR</code> 이외의 대상</td><td>아니요</td><td>아니요</td><td>패턴 일치는 <code translate="no">VARCHAR</code> 값, 문자열로 해석되는 JSON 경로 또는 색인된 <code translate="no">ARRAY&lt;VARCHAR&gt;</code> 요소에 대해서만 사용할 수 있습니다.</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">LIKE 또는 정규식 선택<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>필요한 패턴을 표현하는 가장 간단한 연산자를 선택합니다.</p>
<p>정확한 문자열 일치가 필요한 경우 패턴 일치 대신 <code translate="no">==</code> 을 사용하는 것이 좋습니다. 필터에 패턴을 일치시켜야 하는 경우에만 <code translate="no">LIKE</code> 또는 정규식을 사용하세요.</p>
<table>
<thead>
<tr><th>요구 사항</th><th>권장 연산자</th><th>예제</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>정확한 문자열 동일성</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td><code translate="no">active</code> 문자열과 정확히 일치합니다.</td></tr>
<tr><td>단순 접두사 일치</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td><code translate="no">Prod</code> 로 시작하는 문자열을 일치시킵니다.</td></tr>
<tr><td>단순 접미사 일치</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td><code translate="no">.json</code> 로 끝나는 문자열을 일치시킵니다.</td></tr>
<tr><td>단순 포함 일치</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>문자열의 아무 위치에서나 <code translate="no">vector database</code> 을 포함하는 값을 일치시킵니다.</td></tr>
<tr><td>구조화된 코드 또는 고정 길이 패턴 일치</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td><code translate="no">E1001</code> 과 같이 대소문자를 구분하여 <code translate="no">E</code> 뒤에 네 자리 숫자가 포함된 문자열을 일치시킵니다.</td></tr>
<tr><td>대소문자를 구분하지 않는 패턴 일치</td><td><code translate="no">=~</code> 와 <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td><code translate="no">error</code>, <code translate="no">ERROR</code> 또는 기타 대소문자 변형을 일치시킵니다.</td></tr>
<tr><td>정규식 패턴과 일치하는 값 제외하기</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td><code translate="no">DEBUG</code> 로 시작하는 문자열을 제외합니다.</td></tr>
</tbody>
</table>
<p>간단한 와일드카드 일치에는 <code translate="no">LIKE</code> 을 사용합니다. 패턴에 문자 클래스, 반복, <code translate="no">error|failed</code>, 앵커 또는 대소문자를 구분하지 않는 일치와 같은 교대가 필요한 경우 정규식을 사용합니다.</p>
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
    </button></h2><p><code translate="no">LIKE</code> 연산자는 문자열 값에 대한 간단한 와일드카드 일치를 위한 연산자입니다. 다음 와일드카드만 지원합니다:</p>
<table>
<thead>
<tr><th>와일드카드</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>0개 이상의 문자를 일치시킵니다.</td></tr>
<tr><td><code translate="no">_</code></td><td>정확히 하나의 문자와 일치합니다.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">일반적인 좋아요 패턴<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">%</code> 및 <code translate="no">_</code> 의 위치를 사용하여 일치하는 문자열에서 고정 텍스트가 표시되는 위치를 제어합니다.</p>
<table>
<thead>
<tr><th>요구 사항</th><th>패턴</th><th>필터 예</th></tr>
</thead>
<tbody>
<tr><td>접두사로 시작</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>접두사로 끝남</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>하위 문자열 포함</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>고정된 위치에서 한 문자를 일치시킴</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">좋아요 일치 동작<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>접두사, 접미사, 포함 및 고정 위치 단일 문자 일치에는 <code translate="no">LIKE</code> 을 사용합니다. <code translate="no">LIKE</code> 은 <code translate="no">[0-9]</code> 과 같은 문자 클래스, <code translate="no">error|failed</code> 과 같은 교대, <code translate="no">{4}</code> 과 같은 반복 횟수, <code translate="no">^</code> 또는 <code translate="no">$</code> 과 같은 앵커, <code translate="no">(?i)</code> 과 같은 대소문자를 구분하지 않는 플래그를 지원하지 않습니다. 이러한 패턴에는 정규식을 사용합니다.</p>
<p>정확한 전체 문자열 동일성을 위해 <code translate="no">==</code> 을 사용합니다. 필터에 와일드카드 일치가 필요한 경우에만 <code translate="no">LIKE</code> 을 사용하세요.</p>
<h2 id="Use-regex" class="common-anchor-header">정규식 사용<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>패턴에 문자 클래스, 반복, 교대, 앵커 또는 대소문자를 구분하지 않는 일치와 같은 정규식 기능이 필요한 경우 정규식 필터를 사용하세요. Milvus는 문자열 값에 <a href="https://github.com/google/re2/wiki/syntax">RE2</a> 정규식을 적용합니다.</p>
<p><code translate="no">=~</code> 또는 <code translate="no">!~</code> 의 오른쪽은 문자열 리터럴이어야 합니다.</p>
<table>
<thead>
<tr><th>연산자</th><th>의미</th><th>예제</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>정규식 패턴을 만족하는 값과 일치시킵니다.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>정규식 패턴을 만족하는 값을 제외합니다.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">일반적인 정규식 패턴<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 예제에서는 Milvus 필터 표현식에서 일반적인 RE2 구문을 사용합니다. 전체 정규식 구문은 <a href="https://github.com/google/re2/wiki/syntax">RE2 구문</a> 참조를 참조하세요.</p>
<table>
<thead>
<tr><th>요구 사항</th><th>패턴</th><th>필터 예제</th></tr>
</thead>
<tbody>
<tr><td>리터럴 텍스트 포함</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>접두사로 시작</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>접미사로 끝남</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>숫자 시퀀스와 일치</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>고정된 숫자 수와 일치</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>이메일 도메인과 일치</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>대소문자를 구분하지 않고 일치</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>전체 문자열 일치</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>여러 단어 중 하나를 일치시키려면 <code translate="no">|</code> 로 번갈아 가며 사용합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>정규식 메타문자를 문자 그대로 일치시킬 때는 정규식 패턴으로 이스케이프 처리합니다. 예를 들어, 리터럴 점(정규식에서는<code translate="no">\.</code> )을 일치시키려면 Python 필터 문자열에 <code translate="no">\\.</code> 을 입력합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>참고: Milvus 정규식 필터는 RE2 구문을 따릅니다. 정규식 패턴이 RE2가 지원하지 않거나 유효하지 않은 구문을 사용하는 경우 Milvus는 필터 표현식을 거부합니다. 정규식 메타문자, 플래그 및 일치 동작에 대한 자세한 내용은 <a href="https://github.com/google/re2/wiki/syntax">RE2 구문</a> 참조를 참조하세요.</p>
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
    </button></h3><p><strong>하위 문자열 일치</strong></p>
<p>Milvus 정규식 일치는 하위 문자열 의미를 사용합니다. 패턴이 전체 필드 값과 일치할 필요는 없습니다. 예를 들어 다음 필터는 <code translate="no">E1001</code> 과 <code translate="no">failed with E1001 after retry</code> 을 모두 일치시킵니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>전체 필드 값을 일치시키려면 <code translate="no">^</code> 및 <code translate="no">$</code> 앵커를 사용합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Null 가능 VARCHAR 필드</strong></p>
<p>정규식 필터는 null 값과 일치하지 않습니다. 이는 <code translate="no">=~</code> 와 <code translate="no">!~</code> 모두에 적용됩니다. 정규식 패턴을 제외하되 null 값을 유지하려면 <code translate="no">OR field IS NULL</code> 를 명시적으로 추가합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>JSON 경로</strong></p>
<p>JSON 경로의 경우 경로가 누락되었거나, Null이거나, 문자열이 아닌 값으로 해석되는 경우 정규식 필터가 다르게 작동합니다:</p>
<table>
<thead>
<tr><th>필터</th><th>누락/무효/비 문자열 값을 포함하나요?</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>No</td><td>정규식 패턴을 만족하는 문자열 값만 일치시킵니다.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Yes</td><td>경로가 누락되었거나, null, 문자열이 아닌 경우 또는 정규식 패턴과 일치하지 않는 문자열이 있는 엔티티를 반환합니다.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">인덱스로 패턴 매칭 가속화<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code>, <code translate="no">BITMAP</code> 과 같은 <code translate="no">VARCHAR</code> 필드 또는 JSON 문자열 경로에서 <code translate="no">LIKE</code> 및 정규식 필터와 함께 사용할 수 있는 문자열 필드에 대한 여러 인덱스 유형을 지원합니다. 패턴 일치는 인덱스 없이도 작동할 수 있지만 인덱스를 사용하면 대규모 데이터 세트에서 성능을 향상시킬 수 있습니다.</p>
<p>인덱스의 효율성은 패턴 표현식, Milvus가 고정 리터럴 하위 문자열을 추출할 수 있는지 여부, 대상 필드의 카디널리티와 분포에 따라 달라집니다. <code translate="no">name LIKE &quot;Prod%&quot;</code> 와 같은 접두사 스타일 패턴은 <code translate="no">description LIKE &quot;%vector%&quot;</code> 또는 <code translate="no">filename LIKE &quot;%.json&quot;</code> 와 같은 접두사 또는 접미사 패턴과는 다른 인덱스 전략의 이점을 누릴 수 있습니다.</p>
<p>다음 표를 시작점으로 삼아 자체 워크로드로 벤치마킹하세요:</p>
<table>
<thead>
<tr><th>패턴 또는 데이터 특성</th><th>고려할 인덱스</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">message =~ &quot;error.*timeout&quot;</code> 또는 다음과 같은 고정 리터럴 하위 문자열을 포함합니다. <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Milvus가 패턴에서 의미 있는 리터럴 하위 문자열을 추출할 수 있을 때 도움이 됩니다. 자세한 내용은 <a href="/docs/ko/ngram.md">NGRAM을</a> 참조하세요.</td></tr>
<tr><td>특히 카디널리티가 낮거나 중간 정도인 필드에 접두사, 일치 또는 등호와 같은 문자열 필터(</td><td><code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code>, 또는 <code translate="no">BITMAP</code></td><td>필드에 반복되는 값이 있거나 필터가 정확히 일치하는 경우에 더 효과적일 수 있습니다. 자세한 내용은 <a href="/docs/ko/stl-sort.md">STL_SORT</a>, <a href="/docs/ko/inverted.md">INVERTED</a> 및 <a href="/docs/ko/bitmap.md">BITMAP을</a> 참조하세요.</td></tr>
<tr><td>고정 리터럴이 없는 정규식 패턴 또는 문자 클래스, 짧은 토큰 또는 와일드카드로 지배되는 패턴</td><td>인덱스 가속에 의존하기 전에 벤치마크하기</td><td>이러한 패턴은 제한된 인덱스 선택성을 제공할 수 있으며 더 광범위한 스캔으로 되돌아갈 수 있습니다.</td></tr>
</tbody>
</table>
