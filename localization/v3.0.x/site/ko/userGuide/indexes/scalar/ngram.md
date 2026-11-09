---
id: ngram.md
title: NGRAM
summary: >-
  NGRAM 인덱스는 VARCHAR 필드 또는 JSON 필드 내의 특정 JSON 경로에 대한 LIKE 쿼리와 해당 정규식 필터의 처리 속도를
  높여줍니다. 인덱스를 생성하기 전에 텍스트는 고정 길이 n의 짧고 서로 겹치는 부분 문자열, 즉 n-그램으로 분할됩니다. 쿼리 실행 시,
  이러한 n-그램은 원래 필터 조건이 검증되기 전에 후보 개체 범위를 좁혀줍니다.
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus의 <code translate="no">NGRAM</code> 인덱스는 <code translate="no">VARCHAR</code> 필드 또는 <code translate="no">JSON</code> 필드 내의 특정 JSON 경로에 대한 <code translate="no">LIKE</code> 쿼리와 적용 가능한 정규식 필터를 가속화합니다. 인덱스를 생성하기 전에 Milvus는 텍스트를 고정 길이 <em>n의</em> 짧고 중첩된 부분 문자열, 즉 <em>n-그램으로</em> 분할합니다. 예를 들어, <em>n = 3일</em> 때 <em>“Milvus”라는</em> 단어는 <em>“Mil”</em>, <em>“ilv”</em>, <em>“lvu”</em>, <em>“vus”와</em> 같은 3-그램으로 분할됩니다 <em>.</em> 이러한 n-그램은 각 그램이 등장하는 문서 ID와 매핑되는 역색인에 저장됩니다 <em>.</em> 쿼리 시, Milvus는 이 인덱스를 통해 원래의 필터 조건을 확인하기 전에 검색 범위를 소수의 후보 집합으로 빠르게 좁힐 수 있습니다.</p>
<p>다음과 같이 빠른 접두사, 접미사, 삽입어, 와일드카드 또는 유효한 정규식 필터링이 필요한 경우 이 기능을 사용하십시오.</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
<li><p><code translate="no">message =~ &quot;error.*timeout&quot;</code></p></li>
<li><p><code translate="no">url =~ &quot;/api/v[0-9]+/users&quot;</code></p></li>
</ul>
<div class="alert note">
<p><code translate="no">LIKE</code> 및 정규식 필터 표현식 구문에 대한 자세한 내용은 <a href="/docs/ko/pattern-matching.md">‘패턴 매칭</a>’을 참조하십시오.</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">작동 원리<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>NGRAM의 작동 방식을 보려면 확장하세요</summary></p>
<p>Milvus는 <code translate="no">NGRAM</code> 인덱스를 두 단계의 프로세스로 구현합니다:</p>
<ol>
<li><p><strong>인덱스 구축</strong>: 데이터 수집 과정에서 각 문서에 대한 n-그램을 생성하고 역인덱스를 구축합니다.</p></li>
<li><p><strong>쿼리 가속화</strong>: 인덱스를 사용하여 후보 집합을 소수로 좁힌 다음, 정확한 일치 여부를 확인합니다.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">1단계: 인덱스 구축<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>데이터 수집 과정에서 Milvus는 다음 두 가지 주요 단계를 수행하여 NGRAM 인덱스를 구축합니다:</p>
<ol>
<li><p><strong>텍스트를 n-그램으로 분해</strong>: Milvus는 대상 필드의 각 문자열에 <em>n</em> 크기의 윈도우를 이동시키며, 겹치는 부분 문자열, 즉 <em>n-그램을</em> 추출합니다. 이러한 부분 문자열의 길이는 구성 가능한 범위 내에 속합니다 <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: 생성할 가장 짧은 n-그램입니다. 이는 또한 인덱스의 이점을 누릴 수 있는 최소 쿼리 부분 문자열 길이를 정의합니다.</p></li>
<li><p><code translate="no">max_gram</code>: 생성할 가장 긴 n-그램입니다. 쿼리 시에는 긴 쿼리 문자열을 분할할 때 최대 윈도우 크기로도 사용됩니다.</p></li>
</ul>
<p>예를 들어, <code translate="no">min_gram=2</code> 및 <code translate="no">max_gram=3</code> 인 경우, 문자열 <code translate="no">&quot;AI database&quot;</code> 은 다음과 같이 분할됩니다:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" /> 
   <span>N-그램 인덱스 구축</span>
  
 </span></p>
<ul>
<li><p><strong>2-그램:</strong> <code translate="no">AI</code>, <code translate="no">I_</code>, <code translate="no">_d</code>, <code translate="no">da</code>, <code translate="no">at</code>, …</p></li>
<li><p><strong>3-그램:</strong> <code translate="no">AI_</code>, <code translate="no">I_d</code>, <code translate="no">_da</code>, <code translate="no">dat</code>, <code translate="no">ata</code>, …</p></li>
</ul>
<p><div class="alert note"></p>
<ul>
<li><p><code translate="no">[min_gram, max_gram]</code> 범위의 경우, Milvus는 두 값 사이의 모든 길이(양쪽 끝값 포함)에 대한 n-그램을 생성합니다. 예를 들어, <code translate="no">[2,4]</code> 와 단어 <code translate="no">&quot;text&quot;</code> 의 경우, Milvus는 다음과 같이 생성합니다:</p></li>
<li><p><strong>2-그램:</strong> <code translate="no">te</code>, <code translate="no">ex</code>, <code translate="no">xt</code></p></li>
<li><p><strong>3-그램:</strong> <code translate="no">tex</code>, <code translate="no">ext</code></p></li>
<li><p><strong>4-그램:</strong> <code translate="no">text</code></p></li>
<li><p>N-그램 분해는 문자 기반이며 언어에 구애받지 않습니다. 예를 들어, 중국어에서 <code translate="no">&quot;向量数据库&quot;</code> 와 <code translate="no">min_gram = 2</code> 는 다음과 같이 분해됩니다: <code translate="no">&quot;向量&quot;</code>, <code translate="no">&quot;量数&quot;</code>, <code translate="no">&quot;数据&quot;</code>, <code translate="no">&quot;据库&quot;</code>.</p></li>
<li><p>분해 과정에서 공백과 구두점은 문자로 처리됩니다.</p></li>
<li><p>분해 과정에서는 원본의 대소문자 구분이 유지되며, 일치 여부 확인 시 대소문자를 구분합니다. 예를 들어, <code translate="no">&quot;Database&quot;</code> 과 <code translate="no">&quot;database&quot;</code> 은 서로 다른 n-그램을 생성하며, 쿼리 시 대소문자를 정확히 일치시켜야 합니다.</p></li>
</ul>
<p></div></p></li>
<li><p><strong>역색인 구축</strong>: 생성된 각 n-그램을 이를 포함하는 문서 ID 목록에 매핑하는 <strong>역색인이</strong> 생성됩니다.</p>
<p>예를 들어, 2-그램 <code translate="no">&quot;AI&quot;</code> 이 ID가 1, 5, 6, 8, 9인 문서에 나타나는 경우, 인덱스에는 <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code> 이 기록됩니다. 이 인덱스는 쿼리 시 검색 범위를 빠르게 좁히는 데 사용됩니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" /> 
   <span>N-그램 인덱스 2 구축</span>
  
 </span></p>
<p><div class="alert note"></p>
<p><code translate="no">[min_gram, max_gram]</code> 의 범위가 넓어질수록 생성되는 그램의 수가 늘어나고 매핑 목록의 크기도 커집니다. 메모리 용량이 부족한 경우, 매우 큰 포스팅 목록에 대해서는 mmap 모드를 고려해 보십시오. 자세한 내용은 <a href="/docs/ko/mmap.md">‘mmap 사용’을</a> 참조하십시오.</p>
<p></div></p></li>
</ol>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">2단계: 쿼리 가속화<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">LIKE</code> 필터나 적용 가능한 정규식(regex) 필터가 실행되면, Milvus는 NGRAM 인덱스를 사용하여 다음 단계에 따라 쿼리 속도를 높입니다:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" /> 
   <span>쿼리 가속화</span>
  
 </span></p>
<ol>
<li><p><strong>쿼리 용어 추출:</strong> 와일드카드가 포함되지 않은 연속된 부분 문자열이 <code translate="no">LIKE</code> 표현식에서 추출됩니다(예: <code translate="no">&quot;%database%&quot;</code> 는 <code translate="no">&quot;database&quot;</code> 가 됨). 정규식 필터의 경우, Milvus는 가능한 경우 정규식 패턴에서 고정된 리터럴 부분 문자열을 추출합니다. 예를 들어, <code translate="no">message =~ &quot;error.*timeout&quot;</code> 에는 <code translate="no">error</code> 및 <code translate="no">timeout</code> 와 같은 리터럴이 포함되어 있습니다.</p></li>
<li><p><strong>쿼리 용어 분해:</strong> 쿼리 용어는 길이(<code translate="no">L</code>)와 <code translate="no">min_gram</code> 및 <code translate="no">max_gram</code> 설정에 따라 <em>n-그램으로</em> 분해됩니다.</p>
<ul>
<li><p><code translate="no">L &lt; min_gram</code> 인 경우 인덱스를 사용할 수 없으며, 쿼리는 전체 스캔으로 대체됩니다.</p></li>
<li><p><code translate="no">min_gram ≤ L ≤ max_gram</code> 인 경우, 전체 쿼리 용어가 단일 n-그램으로 처리되며, 추가 분해는 필요하지 않습니다.</p></li>
<li><p><code translate="no">L &gt; max_gram</code> 인 경우, 쿼리 용어는 <code translate="no">max_gram</code> 와 동일한 창 크기를 사용하여 중첩되는 그램으로 분해됩니다.</p></li>
</ul>
<p>예를 들어, <code translate="no">max_gram</code> 가 <code translate="no">3</code> 로 설정되어 있고 쿼리 용어가 길이 <strong>8인</strong> <code translate="no">&quot;database&quot;</code> 인 경우, 이 용어는 <code translate="no">&quot;dat&quot;</code>, <code translate="no">&quot;ata&quot;</code>, <code translate="no">&quot;tab&quot;</code> 등과 같은 3-그램 부분 문자열로 분해됩니다.</p></li>
<li><p><strong>각 그램을 검색하고 교집합 구하기</strong>: Milvus는 인버티드 인덱스에서 쿼리 그램을 하나씩 조회한 다음, 결과로 나온 문서 ID 목록을 교집합하여 소수의 후보 문서 집합을 찾습니다. 이 후보 문서들은 쿼리에 포함된 모든 그램을 포함하고 있습니다.</p></li>
<li><p><strong>결과 검증 및 반환:</strong> 이후, 정확한 일치 항목을 찾기 위해 소수의 후보 집합에 대해서만 원래의 <code translate="no">LIKE</code> 또는 정규식 필터를 최종 확인 단계로 적용합니다.</p></li>
</ol>
<p></details></p>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">NGRAM 인덱스 생성<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">VARCHAR</code> 필드나 <code translate="no">JSON</code> 필드 내의 특정 경로에 NGRAM 인덱스를 생성할 수 있습니다.</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">예 1: VARCHAR 필드에 생성<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">VARCHAR</code> 필드의 경우, <code translate="no">field_name</code> 을 지정하고 <code translate="no">min_gram</code> 및 <code translate="no">max_gram</code> 을 구성하기만 하면 됩니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,   <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,           <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span>,     <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                   <span class="hljs-comment"># Minimum substring length (e.g., 2-gram: &quot;st&quot;)</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">3</span>                    <span class="hljs-comment"># Maximum substring length (e.g., 3-gram: &quot;sta&quot;)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;min_gram&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>);
params.put(<span class="hljs-string">&quot;max_gram&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>);

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;Documents&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;text&quot;</span>).indexType(IndexParam.IndexType.NGRAM)
                        .indexName(<span class="hljs-string">&quot;ngram_index&quot;</span>)
                        .extraParams(params)
                        .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;Documents&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, index.NewNgramIndex(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)).WithIndexName(<span class="hljs-string">&quot;ngram_index&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;Documents&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;text&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;ngram_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Ngram)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;min_gram&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;2&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;max_gram&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;3&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ]))])
    .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">ngram_index</span><span class="hljs-params">(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;ngram_index&quot;</span>, milvus::IndexType::NGRAM)</span></span>;
ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;min_gram&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>);
ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;max_gram&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>);

milvus::CreateIndexRequest create_request;
create_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;Documents&quot;</span>);
create_request.<span class="hljs-built_in">WithIndexes</span>({ngram_index});
create_request.<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>);

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(create_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;Documents&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;ngram_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;NGRAM&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">min_gram</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">max_gram</span>: <span class="hljs-number">3</span> },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;Documents&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;text&quot;,
            &quot;indexName&quot;: &quot;ngram_index&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;NGRAM&quot;,
                &quot;min_gram&quot;: 2,
                &quot;max_gram&quot;: 3
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 구성은 <code translate="no">text</code> 에 있는 각 문자열에 대해 2-그램과 3-그램을 생성하고, 이를 역색인에 저장합니다.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">예제 2: JSON 경로에서 생성하기<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">JSON</code> 필드의 경우, 그램 설정 외에도 다음을 지정해야 합니다:</p>
<ul>
<li><p><code translate="no">params.json_path</code> – 인덱싱할 값을 가리키는 JSON 경로.</p></li>
<li><p><code translate="no">params.json_cast_type</code> – NGRAM 색인 생성은 문자열을 대상으로 하므로, 반드시 <code translate="no">&quot;varchar&quot;</code> 이어야 합니다(대소문자 구분 없음).</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you have defined a JSON field named &quot;json_field&quot; in your collection schema, with a JSON path named &quot;body&quot;</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on a JSON field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;json_field&quot;</span>,              <span class="hljs-comment"># Target JSON field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,                   <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;json_ngram_index&quot;</span>,        <span class="hljs-comment"># Custom index name</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                           <span class="hljs-comment"># Minimum n-gram length</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">4</span>,                           <span class="hljs-comment"># Maximum n-gram length</span></span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the value inside the JSON field</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>                  <span class="hljs-comment"># Required: cast the value to varchar</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;min_gram&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>);
params.put(<span class="hljs-string">&quot;max_gram&quot;</span>, <span class="hljs-string">&quot;4&quot;</span>);
params.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>);
params.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;Documents&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;json_field&quot;</span>).indexType(IndexParam.IndexType.NGRAM)
                        .indexName(<span class="hljs-string">&quot;json_ngram_index&quot;</span>)
                        .extraParams(params)
                        .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

opt := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;Documents&quot;</span>, <span class="hljs-string">&quot;json_field&quot;</span>, index.NewNgramIndex(<span class="hljs-number">2</span>, <span class="hljs-number">4</span>)).
    WithIndexName(<span class="hljs-string">&quot;json_ngram_index&quot;</span>)
opt.WithExtraParam(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">`json_field[&quot;body&quot;]`</span>)
opt.WithExtraParam(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>)

_, err = cli.CreateIndex(ctx, opt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

    <span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;Documents&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[IndexParam::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;json_field&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;json_ngram_index&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Ngram)
            .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
                (<span class="hljs-string">&quot;min_gram&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;2&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
                (<span class="hljs-string">&quot;max_gram&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;4&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
                (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
                (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;varchar&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            ]))])
        .<span class="hljs-title function_ invoke__">build</span>()?;
    client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-function">milvus::IndexDesc <span class="hljs-title">json_ngram_index</span><span class="hljs-params">(<span class="hljs-string">&quot;json_field&quot;</span>, <span class="hljs-string">&quot;json_ngram_index&quot;</span>, milvus::IndexType::NGRAM)</span></span>;
json_ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;min_gram&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>);
json_ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;max_gram&quot;</span>, <span class="hljs-string">&quot;4&quot;</span>);
json_ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>);
json_ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);

milvus::CreateIndexRequest create_request;
create_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;Documents&quot;</span>);
create_request.<span class="hljs-built_in">WithIndexes</span>({json_ngram_index});
create_request.<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>);

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(create_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;Documents&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;json_field&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;json_ngram_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;NGRAM&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">min_gram</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">max_gram</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;json_field[&quot;body&quot;]&#x27;</span>, <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;varchar&quot;</span> },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;Documents&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;json_field&quot;,
            &quot;indexName&quot;: &quot;json_ngram_index&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;NGRAM&quot;,
                &quot;min_gram&quot;: 2,
                &quot;max_gram&quot;: 4,
                &quot;json_path&quot;: &quot;json_field[\&quot;body\&quot;]&quot;,
                &quot;json_cast_type&quot;: &quot;varchar&quot;
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 예시에서:</p>
<ul>
<li><p><code translate="no">json_field[&quot;body&quot;]</code> 에 있는 값만 인덱싱됩니다.</p></li>
<li><p>이 값은 n-gram 토큰화 전에 <code translate="no">VARCHAR</code> 로 변환됩니다.</p></li>
<li><p>Milvus는 길이가 2~4인 부분 문자열을 생성하여 인버티드 인덱스에 저장합니다.</p></li>
</ul>
<p>JSON 필드를 색인화하는 방법에 대한 자세한 내용은 <a href="/docs/ko/json-indexing.md">JSON 색인화를</a> 참조하십시오.</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">NGRAM을 통해 가속화된 쿼리<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>NGRAM 인덱스가 적용되려면:</p>
<ul>
<li><p>쿼리는 <code translate="no">NGRAM</code> 인덱스가 있는 <code translate="no">VARCHAR</code> 필드(또는 JSON 경로)를 대상으로 해야 합니다.</p></li>
<li><p><code translate="no">LIKE</code> 패턴의 리터럴 부분은 최소 <code translate="no">min_gram</code> 자 이상이어야 합니다.</p>
<p><em>(예를 들어, 예상되는 가장 짧은 쿼리 용어가 2자라면, 인덱스를 생성할 때 min_gram=2로 설정하십시오.)</em></p></li>
</ul>
<p>지원되는 쿼리 유형:</p>
<ul>
<li><p><strong>접두사 일치</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;text LIKE \&quot;database%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match any string that starts with the substring &quot;database&quot;</span>
filter := <span class="hljs-string">&quot;text LIKE \&quot;database%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;text LIKE \&quot;database%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(text LIKE &quot;database%&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;text LIKE \&quot;database%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>접미사 일치</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;text LIKE \&quot;%database\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match any string that ends with the substring &quot;database&quot;</span>
filter := <span class="hljs-string">&quot;text LIKE \&quot;%database\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;text LIKE \&quot;%database\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(text LIKE &quot;%database&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;text LIKE \&quot;%database\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>중간 일치</strong></p>
<p><div class="multipleCode">
<a href="#python">파이썬</a>
<a href="#java">자바</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;text LIKE \&quot;%database%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match any string that contains the substring &quot;database&quot; anywhere</span>
filter := <span class="hljs-string">&quot;text LIKE \&quot;%database%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;text LIKE \&quot;%database%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(text LIKE &quot;%database%&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;text LIKE \&quot;%database%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>와일드카드 일치</strong></p>
<p>Milvus는 <code translate="no">%</code> (0개 이상의 문자)와 <code translate="no">_</code> (정확히 하나의 문자)를 모두 지원합니다.</p>
<p><div class="multipleCode">
<a href="#python">파이썬</a>
<a href="#java">자바</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;text LIKE \&quot;%st%um%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
filter := <span class="hljs-string">&quot;text LIKE \&quot;%st%um%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;text LIKE \&quot;%st%um%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(text LIKE &quot;%st%um%&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
<span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;text LIKE \&quot;%st%um%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSON 경로 쿼리</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_field[\&quot;body\&quot;] LIKE \&quot;%database%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;json_field[\&quot;body\&quot;] LIKE \&quot;%database%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_field[\&quot;body\&quot;] LIKE \&quot;%database%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(json_field[&quot;body&quot;] LIKE &quot;%database%&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;json_field[\&quot;body\&quot;] LIKE \&quot;%database%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>정규식 필터</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;text =~ \&quot;error.*timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
filter := <span class="hljs-string">&quot;text =~ \&quot;error.*timeout\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;text =~ \&quot;error.*timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(text =~ &quot;error.*timeout&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;text =~ \&quot;error.*timeout\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSON 경로에 대한 정규식 필터</strong></p>
<p><div class="multipleCode">
<a href="#python">파이썬</a>
<a href="#java">자바</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_field[\&quot;body\&quot;] =~ \&quot;error.*timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;json_field[\&quot;body\&quot;] =~ \&quot;error.*timeout\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_field[\&quot;body\&quot;] =~ \&quot;error.*timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;json_field[\&quot;body\&quot;] =~ \&quot;error.*timeout\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>필터 표현식 구문에 대한 자세한 내용은 <a href="/docs/ko/pattern-matching.md">패턴 매칭을</a> 참조하십시오.</p>
<h2 id="Drop-an-index" class="common-anchor-header">인덱스 삭제<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">drop_index()</code> 메서드를 사용하여 컬렉션에서 기존 인덱스를 제거합니다.</p>
<div class="alert note">
<ul>
<li><p><strong>v2.6.3</strong> 이하 버전에서는 스칼라 인덱스를 삭제하기 전에 컬렉션을 해제해야 합니다.</p></li>
<li><p><strong>v2.6.4부터는</strong> 스칼라 인덱스가 더 이상 필요하지 않으면 컬렉션을 먼저 해제할 필요 없이 직접 삭제할 수 있습니다.</p></li>
</ul>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DropIndexReq;

client.dropIndex(DropIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;Documents&quot;</span>)
        .indexName(<span class="hljs-string">&quot;ngram_index&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption(<span class="hljs-string">&quot;Documents&quot;</span>, <span class="hljs-string">&quot;ngram_index&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

    <span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = DropIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;Documents&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;ngram_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">build</span>()?;
    client.<span class="hljs-title function_ invoke__">drop_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropIndex</span>(milvus::<span class="hljs-built_in">DropIndexRequest</span>()
                               .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;Documents&quot;</span>)
                               .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;ngram_index&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;Documents&quot;</span>, <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;ngram_index&quot;</span> });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;Documents&quot;,
    &quot;indexName&quot;: &quot;ngram_index&quot;
}&#x27;</span>
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
<li><p><strong>필드 유형</strong>: <code translate="no">VARCHAR</code> 및 <code translate="no">JSON</code> 필드에서 지원됩니다. JSON의 경우 <code translate="no">params.json_path</code> 와 <code translate="no">params.json_cast_type=&quot;varchar&quot;</code> 를 모두 지정해야 합니다.</p></li>
<li><p><strong>정규식 가속</strong>: <code translate="no">NGRAM</code> 은 Milvus가 정규식 패턴에서 고정된 리터럴 부분 문자열을 추출할 수 있는 경우에만 정규식 필터를 가속합니다. <code translate="no">[a-z]+</code> 과 같은 패턴은 고정된 리터럴을 포함하지 않으므로 스캔 방식으로 대체될 수 있습니다.</p></li>
<li><p><strong>대소문자 구분 없는 정규 표현식</strong>: <code translate="no">(?i)</code> 가 포함된 정규 표현식 패턴은 지원되지만, 인덱스가 원래의 대소문자 구분을 유지하기 때문에 <code translate="no">NGRAM</code> 최적화가 생략될 수 있습니다.</p></li>
<li><p><strong>검증 단계</strong>: 정규식 필터의 경우, <code translate="no">NGRAM</code> 가 후보를 생성하고 Milvus가 전체 RE2 정규식 패턴을 사용하여 이를 검증하므로, 인덱스 가속화가 일치 결과에 영향을 미치지 않습니다.</p></li>
<li><p><strong>유니코드</strong>: NGRAM 분해는 문자 기반이며 언어에 구애받지 않고, 공백과 구두점도 포함합니다.</p></li>
<li><p><strong>공간-시간 상충 관계</strong>: <code translate="no">[min_gram, max_gram]</code> 의 그램 범위가 넓을수록 더 많은 그램이 생성되고 인덱스 크기도 커집니다. 메모리가 부족한 경우, 대규모 포스팅 리스트에 대해서는 <code translate="no">mmap</code> 모드를 고려하십시오. 자세한 내용은 <a href="/docs/ko/mmap.md">mmap 사용을</a> 참조하십시오.</p></li>
<li><p><strong>불변성</strong>: <code translate="no">min_gram</code> 및 <code translate="no">max_gram</code> 는 현장에서 변경할 수 없으므로, 이를 조정하려면 인덱스를 다시 구축해야 합니다.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">모범 사례<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>검색 동작에 맞춰 <code translate="no">min_gram</code> 및 <code translate="no">max_gram</code> 을 선택하십시오</strong></p>
<ul>
<li><p><code translate="no">min_gram=2</code>, <code translate="no">max_gram=3</code> 으로 시작하십시오.</p></li>
<li><p><code translate="no">min_gram</code> 은 사용자가 입력할 것으로 예상되는 가장 짧은 리터럴로 설정하십시오.</p></li>
<li><p><code translate="no">max_gram</code> 는 의미 있는 부분 문자열의 일반적인 길이에 가깝게 설정하십시오. <code translate="no">max_gram</code> 값을 크게 설정하면 필터링 성능은 향상되지만 저장 공간이 증가합니다.</p></li>
</ul></li>
<li><p><strong>선택성이 낮은 그램은 피하십시오</strong></p>
<p>반복성이 매우 높은 패턴(예: <code translate="no">&quot;aaaaaa&quot;</code>)은 필터링 효과가 약하며 이득이 제한적일 수 있습니다.</p></li>
<li><p><strong>일관되게 정규화하십시오</strong></p>
<p>사용 사례에 필요한 경우, 수집된 텍스트와 쿼리 리터럴에 동일한 정규화 처리(예: 소문자 변환, 공백 제거)를 적용하십시오.</p></li>
</ul>
