---
id: phrase-match.md
title: 구문 검색Compatible with Milvus 2.6.x
summary: >-
  구문 검색을 사용하면 검색어가 포함된 문서를 정확한 구문으로 검색할 수 있습니다. 기본적으로 단어는 동일한 순서로 서로 바로 옆에 나타나야
  합니다. 예를 들어, '로봇 공학 머신 러닝'에 대한 쿼리는 '...일반적인 로봇 공학 머신 러닝 모델...'과 같은 텍스트와 일치하며,
  여기서 '로봇 공학', '기계', '학습'이라는 단어가 그 사이에 다른 단어 없이 순차적으로 나타납니다.
beta: Milvus 2.6.x
---
<h1 id="Phrase-Match" class="common-anchor-header">구문 검색<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>구문 검색을 사용하면 검색어가 포함된 문서를 정확한 구문으로 검색할 수 있습니다. 기본적으로 단어는 동일한 순서로 서로 바로 옆에 나타나야 합니다. 예를 들어, ' <strong>로봇 공학 기계 학습'</strong> 에 대한 쿼리는 <em>'...일반적인 로봇 공학 기계 학습 모델...'</em>과 같은 텍스트와 일치하며, 여기서 <strong>'로봇 공학',</strong> <strong>'기계</strong>', <strong>'학습'</strong> 이라는 단어가 그 사이에 다른 단어 없이 순서대로 나타납니다.</p>
<p>그러나 실제 시나리오에서는 엄격한 구문 일치가 너무 엄격할 수 있습니다. 예를 들어 <em>"...로봇 공학에서 널리 채택된 머신 러닝 모델..."</em>과 같은 텍스트를 일치시키고 싶을 수 있습니다. 여기에는 동일한 키워드가 나란히 있거나 원래 순서가 아닌 다른 키워드가 존재합니다. 이를 처리하기 위해 구문 검색은 <code translate="no">slop</code> 매개변수를 지원하여 유연성을 도입합니다. <code translate="no">slop</code> 값은 구문 내 용어 간에 허용되는 위치 이동 횟수를 정의합니다. 예를 들어 <code translate="no">slop</code> 값이 1인 경우, <strong>'머신 러닝'</strong> 에 대한 쿼리는 <em>'...머신 딥 러닝...'</em>과 같은 텍스트를 일치시킬 수 있으며, 여기서 한 단어(<strong>"deep")가</strong> 원래 용어를 구분합니다.</p>
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
    </button></h2><p><a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> 검색 엔진 라이브러리를 기반으로 하는 구문 일치는 문서 내 단어의 위치 정보를 분석하여 작동합니다. 아래 다이어그램은 그 과정을 보여줍니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" />
   </span> <span class="img-wrapper"> <span>구문 검색 워크플로</span> </span></p>
<ol>
<li><p><strong>문서 토큰화</strong>: Milvus에 문서를 삽입하면 분석기를 사용하여 텍스트가 토큰(개별 단어 또는 용어)으로 분할되고 각 토큰에 위치 정보가 기록됩니다. 예를 들어, <strong>doc_1은</strong> <strong>["기계"(pos=0), "학습"(pos=1), "부스트"(pos=2), "효율성"(pos=3</strong>) <strong>]</strong>으로 토큰화됩니다. 분석기에 대한 자세한 내용은 <a href="/docs/ko/analyzer-overview.md">분석기 개요를</a> 참조하세요.</p></li>
<li><p><strong>역 인덱스 생성</strong>: Milvus는 각 토큰을 해당 토큰이 나타나는 문서와 해당 문서에서 토큰의 위치에 매핑하여 반전된 인덱스를 생성합니다.</p></li>
<li><p>구문<strong>매칭</strong>: 구문 쿼리가 실행되면 Milvus는 반전된 색인에서 각 토큰을 조회하고 위치를 확인하여 올바른 순서와 근접성으로 나타나는지 확인합니다. <code translate="no">slop</code> 매개변수는 일치하는 토큰 간에 허용되는 최대 위치 수를 제어합니다:</p>
<ul>
<li><p><strong>slop = 0은</strong> 토큰이 <strong>정확한 순서로 바로 인접하여</strong> 나타나야 함을 의미합니다(즉, 그 사이에 여분의 단어가 없어야 함).</p>
<ul>
<li>이 예에서는 <strong>doc_1</strong> ( <strong>pos=0의</strong><strong>"machine"</strong>, <strong>pos=1의</strong> <strong>"learning"</strong> )만 정확히 일치합니다.</li>
</ul></li>
<li><p><strong>slop = 2를</strong> 사용하면 일치하는 토큰 간의 위치를 최대 두 개까지 유연하게 조정하거나 재배열할 수 있습니다.</p>
<ul>
<li><p>이를 통해 순서가 뒤바뀌거나(<strong>"학습 머신")</strong> 토큰 사이에 작은 간격을 둘 수 있습니다.</p></li>
<li><p>따라서 <strong>doc_1</strong>, <strong>doc_2</strong> (<strong>"학습"</strong> <strong>위치=0</strong>, <strong>"기계"</strong> <strong>위치=1</strong>), <strong>doc_3</strong> (<strong>"학습"</strong> <strong>위치=1</strong>, <strong>"기계"</strong> <strong>위치=2</strong>)은 모두 일치합니다.</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">구문 검색 사용 설정<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>구문 일치는 Milvus의 문자열 데이터 유형인 <code translate="no">VARCHAR</code> 필드 유형에서 작동합니다. 구문 일치를 사용하려면 <a href="/docs/ko/keyword-match.md">텍스트 일치와</a> 유사하게 <code translate="no">enable_analyzer</code> 및 <code translate="no">enable_match</code> 매개 변수를 모두 <code translate="no">True</code> 로 설정하여 컬렉션 스키마를 구성하세요.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header"><code translate="no">enable_analyzer</code> 및 <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>특정 <code translate="no">VARCHAR</code> 필드에 대해 구문 일치를 사용하려면 필드 스키마를 정의할 때 <code translate="no">enable_analyzer</code> 및 <code translate="no">enable_match</code> 매개 변수를 모두 <code translate="no">True</code> 으로 설정합니다. 이 구성은 Milvus가 텍스트를 토큰화하고 효율적인 구문 일치를 위해 필요한 위치 정보가 포함된 반전 인덱스를 생성하도록 지시합니다.</p>
<p>다음은 구문 일치를 활성화하는 스키마 정의 예시입니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a schema for a new collection</span>
schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
<span class="hljs-comment"># Add a VARCHAR field configured for phrase matching</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR (string)</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">선택 사항입니다: 분석기 구성<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>구문 일치 정확도는 텍스트 데이터를 토큰화하는 데 사용되는 분석기에 따라 크게 달라집니다. 분석기마다 언어와 텍스트 형식에 적합하며, 토큰화 및 위치 정확도에 영향을 미칩니다. 특정 사용 사례에 적합한 분석기를 선택하면 구문 매칭 결과를 최적화할 수 있습니다.</p>
<p>기본적으로 Milvus는 공백과 구두점을 기반으로 텍스트를 토큰화하고, 40자 이상의 토큰을 제거하며, 텍스트를 소문자로 변환하는 표준 분석기를 사용합니다. 기본 사용에는 추가 매개변수가 필요하지 않습니다. 자세한 내용은 <a href="/docs/ko/standard-analyzer.md">표준 분석기를</a> 참조하세요.</p>
<p>애플리케이션에 특정 분석기가 필요한 경우 <code translate="no">analyzer_params</code> 매개변수를 사용하여 구성하세요. 예를 들어, 다음은 영어 텍스트의 구문 일치를 위해 <code translate="no">english</code> 분석기를 구성하는 방법입니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus는 다양한 언어 및 사용 사례에 맞게 조정된 여러 분석기를 지원합니다. 자세한 내용은 <a href="/docs/ko/analyzer-overview.md">분석기 개요를</a> 참조하세요.</p>
<h2 id="Use-phrase-match" class="common-anchor-header">구문 검색 사용<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션 스키마에서 <code translate="no">VARCHAR</code> 필드에 대한 일치를 활성화한 후에는 <code translate="no">PHRASE_MATCH</code> 표현식을 사용하여 구문 일치를 수행할 수 있습니다.</p>
<div class="alert note">
<p><code translate="no">PHRASE_MATCH</code> 표현식은 대소문자를 구분하지 않습니다. <code translate="no">PHRASE_MATCH</code> 또는 <code translate="no">phrase_match</code> 을 사용할 수 있습니다.</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">PHRASE_MATCH 표현식 구문<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">PHRASE_MATCH</code> 표현식을 사용하여 검색할 때 필드, 구문 및 선택적 유연성(<code translate="no">slop</code>)을 지정합니다. 구문은 다음과 같습니다:</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> 구문 일치를 수행할 <code translate="no">VARCHAR</code> 필드의 이름입니다.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> 검색할 정확한 구문입니다.</p></li>
<li><p><code translate="no">slop</code> (선택 사항)<strong>:</strong> 일치하는 토큰에서 허용되는 최대 위치 수를 지정하는 정수입니다.</p>
<ul>
<li><p><code translate="no">0</code> (기본값): 정확한 구문만 일치시킵니다. 예시: <strong>'머신 러닝</strong> '에 대한 필터는 ' <strong>머신 러닝'</strong> 은 정확히 일치하지만 <strong>'머신 부스트 러닝'</strong> 이나 <strong>'러닝 머신'</strong>은 일치하지 않습니다 <strong>.</strong></p></li>
<li><p><code translate="no">1</code>: 용어 하나 추가 또는 위치의 사소한 이동과 같은 사소한 변형을 허용합니다. 예시: <strong>"machine learning"</strong> 에 대한 필터는 <strong>"machine boosts learning"</strong> ( <strong>"machine"</strong> 과 <strong>"learning"</strong> 사이에 하나의 토큰이 있음 <strong>)</strong>과 일치하지만 <strong>"learning machine"</strong> (용어가 뒤바뀜)은 일치하지 않습니다.</p></li>
<li><p><code translate="no">2</code>: 용어 순서가 반전되거나 그 사이에 토큰이 최대 2개까지 포함되는 등 더 많은 유연성을 허용합니다. 예시: <strong>"machine learning"</strong> 에 대한 필터는 <strong>"learning machine"</strong> (용어가 반전됨) 또는 <strong>"machine quickly boosts learning"</strong> ( <strong>"machine"</strong> 과 <strong>"learning"</strong> 사이에 두 개의 토큰이 있음)과 일치합니다.</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">데이터 집합 예시<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 5개의 엔티티가 포함된 <strong>tech_articles라는</strong> 이름의 컬렉션이 있다고 가정해 보겠습니다:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"기계 학습은 대규모 데이터 분석의 효율성을 높입니다."</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"기계 기반 접근 방식을 학습하는 것은 최신 AI 발전에 필수적입니다."</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"딥 러닝 머신 아키텍처는 계산 부하를 최적화합니다"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"머신러닝은 지속적인 학습을 위해 모델 성능을 빠르게 개선합니다"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"고급 머신 알고리즘 학습으로 AI 기능 확장"</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">구문 일치를 통한 쿼리<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">query()</code> 메서드를 사용할 때 <strong>PHRASE_MATCH는</strong> 스칼라 필터 역할을 합니다. 지정된 구문이 포함된 문서만(허용된 기울기에 따라) 반환됩니다.</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">예: slop = 0(정확히 일치)</h4><p>이 예는 중간에 추가 토큰 없이 <strong>"machine learning"이라는</strong> 정확한 문구가 포함된 문서를 반환합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>예상 일치 결과</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"대규모 데이터 분석의 효율성을 높여주는 머신 러닝"</p></td>
   </tr>
</table>
<p>문서 1에만 추가 토큰 없이 지정된 순서대로 <strong>"machine learning"이라는</strong> 정확한 문구가 포함되어 있습니다.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">구문 검색으로 검색<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>검색 작업에서 벡터 유사도 순위를 적용하기 전에 문서를 필터링하는 데 <strong>PHRASE_MATCH가</strong> 사용됩니다. 이 2단계 접근 방식은 먼저 텍스트 일치를 통해 후보 집합을 좁힌 다음 벡터 임베딩을 기반으로 후보의 순위를 다시 매깁니다.</p>
<h4 id="Example-slop--1" class="common-anchor-header">예: 슬로프 = 1</h4><p>여기서는 슬로프 1을 허용합니다. 이 필터는 <strong>'학습 기계'라는</strong> 문구가 포함된 문서에 약간의 유연성을 가지고 적용됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter_slop1 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

result_slop1 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">filter</span>=filter_slop1,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>결과를 일치시킵니다:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"기계 기반 접근 방식을 학습하는 것은 최신 AI 발전에 필수적입니다."</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"딥 러닝 머신 아키텍처는 계산 부하를 최적화합니다"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"고급 머신 알고리즘을 학습하면 AI 기능이 확장됩니다"</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">예: 슬로프 = 2</h4><p>이 예에서는 슬로프가 2로 허용되며, 이는 <strong>"machine"</strong> 과 <strong>"learning"</strong>이라는 단어 사이에 최대 2개의 추가 토큰(또는 반전된 용어)이 허용됨을 의미합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter_slop2 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop2,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>일치 결과:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"대규모 데이터 분석의 효율성을 높여주는 머신 러닝"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"딥 러닝 머신 아키텍처는 계산 부하를 최적화합니다"</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">예: 슬로프 = 3</h4><p>이 예에서 슬로프 3은 훨씬 더 많은 유연성을 제공합니다. 이 필터는 단어 사이에 최대 3개의 토큰 위치가 허용되는 <strong>"머신 러닝"</strong> 을 검색합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>일치하는 결과:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"대규모 데이터 분석의 효율성을 높여주는 머신 러닝"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"기계 기반 접근 방식을 학습하는 것은 최신 AI 발전에 필수적입니다"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"딥 러닝 머신 아키텍처는 계산 부하를 최적화합니다"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"고급 머신 알고리즘 학습으로 AI 기능 확장"</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">고려 사항<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>필드에 구문 일치를 활성화하면 스토리지 리소스를 소모하는 반전 인덱스가 생성됩니다. 이 기능을 사용하도록 설정할 때는 텍스트 크기, 고유 토큰, 사용되는 분석기에 따라 달라지므로 스토리지 영향을 고려하세요.</p></li>
<li><p>스키마에서 분석기를 정의하면 해당 컬렉션에 대해 해당 설정이 영구적으로 적용됩니다. 다른 분석기가 필요에 더 적합하다고 판단되면 기존 컬렉션을 삭제하고 원하는 분석기 구성으로 새 컬렉션을 만드는 것을 고려할 수 있습니다.</p></li>
<li><p>구문 검색 성능은 텍스트가 토큰화되는 방식에 따라 달라집니다. 전체 컬렉션에 분석기를 적용하기 전에 <code translate="no">run_analyzer</code> 방법을 사용하여 토큰화 출력을 검토하세요. 자세한 내용은 <a href="/docs/ko/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">분석기 개요를</a> 참조하세요.</p></li>
<li><p><code translate="no">filter</code> 표현식의 이스케이프 규칙:</p>
<ul>
<li><p>표현식 내에서 큰따옴표 또는 작은따옴표로 묶인 문자는 문자열 상수로 해석됩니다. 문자열 상수에 이스케이프 문자가 포함된 경우 이스케이프 문자는 이스케이프 시퀀스를 사용하여 표현해야 합니다. 예를 들어 <code translate="no">\\</code> 은 <code translate="no">\</code>, <code translate="no">\\t</code> 은 탭 <code translate="no">\t</code>, <code translate="no">\\n</code> 은 개행으로 표현합니다.</p></li>
<li><p>문자열 상수를 작은따옴표로 묶은 경우 상수 내의 작은따옴표는 <code translate="no">\\'</code> 로 표시해야 하며 큰따옴표는 <code translate="no">&quot;</code> 또는 <code translate="no">\\&quot;</code> 로 표시할 수 있습니다. 예: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>문자열 상수가 큰따옴표로 묶여 있는 경우 상수 내의 큰따옴표는 <code translate="no">\\&quot;</code> 로 표시하고 작은따옴표는 <code translate="no">'</code> 또는 <code translate="no">\\'</code> 로 표시할 수 있습니다. 예: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
