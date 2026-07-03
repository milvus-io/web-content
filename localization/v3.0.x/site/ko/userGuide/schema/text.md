---
id: text.md
title: 텍스트 입력란Compatible with Milvus 3.0.x
summary: 'TEXT는 Milvus에서 문서 텍스트, 구절 및 기타 긴 텍스트 콘텐츠를 저장하기 위한 스칼라 필드 유형입니다.'
beta: Milvus 3.0.x
---
<h1 id="Text-Field" class="common-anchor-header">텍스트 입력란<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Text-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>AI 검색 애플리케이션에서 벡터 검색은 의미적으로 유사한 엔티티를 찾는 데 도움이 되지만, 애플리케이션은 종종 각 일치 항목의 원본 텍스트도 필요로 합니다. LLM이나 에이전트는 해당 텍스트를 컨텍스트로 활용하여 내용을 읽거나, 인용하거나, 요약하거나, 프롬프트에 결과를 포함시킬 수 있습니다.</p>
<p>Milvus는 긴 원본 텍스트를 엔티티와 함께 직접 저장하기 위해 ` <code translate="no">TEXT</code> ` 스칼라 필드 유형을 제공합니다. 일반적인 값으로는 문장, 긴 문서, 기사 본문, 티켓 및 로그 등이 있습니다. 고정된 ` <code translate="no">max_length</code>`을 요구하는 ` <code translate="no">VARCHAR</code>`과 달리, ` <code translate="no">TEXT</code> `은 컬렉션 스키마에서 최대 바이트 길이를 설정할 필요가 없습니다.</p>
<p><code translate="no">TEXT</code> 필드를 정의하려면 <code translate="no">datatype</code> 을 <code translate="no">DataType.TEXT</code> 로 설정하십시오.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>필드가 정의된 후에는 각 엔티티가 해당 필드에 문자열 값을 포함할 수 있습니다. <code translate="no">TEXT</code> 값은 다른 스칼라 필드와 마찬가지로 삽입할 수 있으며, <code translate="no">output_fields</code> 에 해당 필드를 나열하여 쿼리 또는 검색 결과에서 반환할 수 있습니다.</p>
<div class="alert note">
<p><code translate="no">TEXT</code> 필드는 null 값을 지원합니다. 이 기능을 사용하려면 <code translate="no">nullable</code> 를 <code translate="no">True</code> 로 설정하십시오. 자세한 내용은 <a href="/docs/ko/nullable-and-default.md">‘Nullable Field’를</a> 참조하십시오.</p>
</div>
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
<li><code translate="no">TEXT</code> 필드는 기본 필드로 지정할 수 없습니다. 기본 필드는 <code translate="no">INT64</code> 및 <code translate="no">VARCHAR</code> 을 지원합니다.</li>
<li>Milvus 3.0.0에서는 <code translate="no">TEXT</code> 필드가 <code translate="no">PHRASE_MATCH</code> 을 지원하지 않습니다.</li>
<li>Milvus 3.0.0에서는 <code translate="no">TEXT</code> 필드가 기본값을 지원하지 않습니다.</li>
<li>Milvus 3.0.0에서는 외부 컬렉션에서 <code translate="no">TEXT</code> 필드가 지원되지 않습니다.</li>
<li>Milvus 3.0.0에서 <code translate="no">TEXT</code> 필드는 스칼라 인덱스를 지원하지 않습니다.</li>
<li><code translate="no">TEXT</code> 는 일반적인 메타데이터 필터링 용도로 설계되지 않았습니다. 짧은 문자열 메타데이터를 기준으로 필터링해야 하고 필드 값이 <code translate="no">VARCHAR</code> 의 길이 제한 내에 들어가는 경우, <code translate="no">VARCHAR</code> 를 사용하십시오.</li>
</ul>
<h2 id="Choose-TEXT-or-VARCHAR" class="common-anchor-header">TEXT 또는 VARCHAR 중 하나를 선택하십시오.<button data-href="#Choose-TEXT-or-VARCHAR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> 와 <code translate="no">VARCHAR</code> 는 모두 문자열 값을 저장하지만, 지원하는 애플리케이션 요구 사항은 다릅니다. 엔티티를 식별, 분류 또는 필터링하는 데 사용되는 짧고 길이가 제한된 메타데이터의 경우 <code translate="no">VARCHAR</code> 를 사용하십시오. LLM이나 에이전트가 내용을 읽고, 인용하고, 요약하거나 프롬프트를 생성하는 데 충분한 맥락을 제공하는 더 긴 소스 콘텐츠의 경우 <code translate="no">TEXT</code> 를 사용하십시오.</p>
<table>
<thead>
<tr><th>측면</th><th><code translate="no">VARCHAR</code></th><th><code translate="no">TEXT</code></th></tr>
</thead>
<tbody>
<tr><td>가장 적합한 용도</td><td><code translate="no">title</code>, <code translate="no">tag</code>, <code translate="no">category</code> 또는 <code translate="no">external_id</code> 과 같이 엔티티를 식별, 분류 또는 필터링하는 데 사용되는 짧은 메타데이터.</td><td><code translate="no">content</code>, <code translate="no">passage</code>, <code translate="no">article_body</code> 또는 <code translate="no">log_message</code> 과 같이 LLM 또는 에이전트 워크플로우에서 사용되는 긴 소스 콘텐츠.</td></tr>
<tr><td>길이 설정</td><td><code translate="no">max_length</code> 가 필요하며, 이는 필드가 저장할 수 있는 최대 바이트 수를 정의합니다. 최대 값은 <code translate="no">65,535</code> 바이트입니다. 값이 이 한도를 초과할 수 있는 경우 <code translate="no">TEXT</code> 를 사용하십시오.</td><td><code translate="no">max_length</code> 가 필요하지 않으므로, 스키마에 텍스트 값에 대한 고정된 바이트 제한을 지정할 필요가 없습니다.</td></tr>
<tr><td>저장 동작</td><td>각 값은 필드에 구성된 <code translate="no">max_length</code> 내에서 저장됩니다.</td><td>크기가 큰 텍스트 값의 경우 자동 저장소 선택 기능을 사용합니다. 자세한 내용은 <a href="#how-milvus-stores-large-text-values">Milvus가 대용량 TEXT 값을 저장하는 방법을</a> 참조하십시오.</td></tr>
<tr><td>주 필드 지원</td><td>주 필드로 사용할 수 있습니다.</td><td>주 필드로 사용할 수 없습니다.</td></tr>
<tr><td>필터링</td><td><code translate="no">category == &quot;news&quot;</code> 이나 <code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code> 와 같이 필터 표현식에 포함되어야 하는 짧은 문자열 메타데이터에 사용합니다.</td><td>일반적인 메타데이터 필터링 용도로는 적합하지 않습니다.</td></tr>
</tbody>
</table>
<p><code translate="no">VARCHAR</code> 필드에 대한 자세한 내용은 <a href="/docs/ko/string.md">VarChar 필드를</a> 참조하십시오.</p>
<h2 id="How-Milvus-stores-large-TEXT-values" class="common-anchor-header">Milvus가 대용량 TEXT 값을 저장하는 방법<button data-href="#How-Milvus-stores-large-TEXT-values" class="anchor-icon" translate="no">
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
<p><summary>작동 방식을 보려면 펼치기</summary></p>
<p>엔티티를 삽입할 때, <code translate="no">TEXT</code> 필드에 입력한 문자열이 <code translate="no">TEXT</code> 값이 됩니다. Milvus는 해당 값의 크기를 <a href="/docs/ko/configure_datanode.md#dataNodetextinlineThreshold">dataNode.text.inlineThreshold</a>(기본값은 <code translate="no">65,536</code> 바이트)와 비교한 다음, 두 가지 내부 저장 경로 중 하나를 선택합니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/text-large-storage-flow.png" alt="Large text storage" class="doc-image" id="large-text-storage" /> 
   <span>대용량 텍스트 저장</span>
  
 </span></p>
<ul>
<li><strong>인라인 저장</strong>: <code translate="no">TEXT</code> 값이 <code translate="no">dataNode.text.inlineThreshold</code> 보다 작으면, Milvus는 원본 텍스트 값을 <code translate="no">TEXT</code> 필드의 data에 직접 저장합니다.</li>
<li><strong>LOB 저장</strong>: ` <code translate="no">TEXT</code> ` 값이 ` <code translate="no">dataNode.text.inlineThreshold</code>` 이상인 경우, Milvus는 해당 값을 대용량 객체로 간주하고 원본 텍스트를 MinIO와 같은 객체 저장소에 별도로 저장합니다. ` <code translate="no">TEXT</code> ` 필드 데이터에는 별도로 저장된 텍스트에 대한 내부 참조가 저장됩니다. 쿼리 또는 검색 결과에서 ` <code translate="no">TEXT</code> ` 필드가 요청되면, Milvus는 해당 참조를 사용하여 원본 텍스트를 검색하고 반환합니다.</li>
</ul>
<p>이러한 스토리지 선택은 내부적인 처리입니다. Milvus가 어떤 스토리지 경로를 사용하든 상관없이 <code translate="no">TEXT</code> 필드에 대한 삽입, 쿼리 및 검색은 동일한 방식으로 수행됩니다. 임계값이나 관련 스토리지, 압축 및 가비지 컬렉션 동작을 조정하려면 <a href="/docs/ko/configure_datanode.md">dataNode 관련 구성</a> 및 <a href="/docs/ko/configure_datacoord.md">dataCoord 관련 구성을</a> 참조하십시오.</p>
<p>배포 환경에서 오브젝트 스토리지를 사용하는 경우, 큰 <code translate="no">TEXT</code> 값은 <code translate="no">lobs/...</code> 와 같은 경로 아래에 Milvus가 관리하는 오브젝트로 표시될 수 있습니다. 이러한 오브젝트는 구현 세부 사항이므로 수동으로 이동, 복사 또는 삭제해서는 안 됩니다. 엔티티를 삭제하거나, 파티션을 제거하거나, 데이터를 압축한 후에도, Milvus 가비지 컬렉션이 안전 기간이 지난 후 참조되지 않는 대용량 객체 데이터를 제거해야만 객체 스토리지 사용량이 감소할 수 있습니다.</p>
<p></details></p>
<p><code translate="no">TEXT</code> 의 일반적인 용도는 BM25를 활용한 전체 텍스트 검색입니다. 이 패턴에서 <code translate="no">TEXT</code> 필드는 원본 소스 콘텐츠를 저장하며, BM25는 텍스트를 분석하여 키워드 기반 일치도를 순위 매기기 위한 스파스 벡터를 생성합니다. 그런 다음 검색 결과는 일치하는 <code translate="no">TEXT</code> 값을 LLM 또는 에이전트 워크플로우의 컨텍스트로 반환할 수 있습니다. 다음 예제는 <code translate="no">TEXT</code> 필드를 BM25의 입력 필드로 사용하는 방법을 보여줍니다. 전체 텍스트 검색 개념 및 쿼리 옵션에 대한 자세한 내용은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하십시오.</p>
<h2 id="Step-1-Create-a-collection-with-a-TEXT-field" class="common-anchor-header">1단계: TEXT 필드가 포함된 컬렉션 생성<button data-href="#Step-1-Create-a-collection-with-a-TEXT-field" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예제는 소스 콘텐츠를 위한 <code translate="no">TEXT</code> 필드와 BM25에서 생성된 스파스 벡터를 위한 스파스 벡터 필드를 포함하는 컬렉션을 생성합니다. BM25 함수는 <code translate="no">content</code> 의 토큰화된 텍스트를 <code translate="no">sparse</code> 에 저장된 스파스 벡터로 변환합니다.</p>
<p>BM25 전체 텍스트 검색을 사용하려면 입력 <code translate="no">TEXT</code> 필드의 값이 <code translate="no">enable_analyzer=True</code> 로 설정되어 있어야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.TEXT,</span>
<span class="highlighted-comment-line">    enable_analyzer=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="highlighted-comment-line">bm25_function = Function(</span>
<span class="highlighted-comment-line">    name=<span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    function_type=FunctionType.BM25,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">schema.add_function(bm25_function)</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Create-a-sparse-vector-index" class="common-anchor-header">2단계: 스파스 벡터 인덱스 생성<button data-href="#Step-2-Create-a-sparse-vector-index" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 함수에 의해 생성된 스파스 벡터 필드에 인덱스를 생성합니다. 메트릭 유형은 <code translate="no">BM25</code> 로 설정되어야 합니다.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Insert-TEXT-data" class="common-anchor-header">3단계: TEXT 데이터 삽입<button data-href="#Step-3-Insert-TEXT-data" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> 필드에 텍스트를 직접 입력합니다. <code translate="no">sparse</code> 필드에는 값을 입력하지 마십시오. Milvus는 <code translate="no">content</code> 에 BM25 함수를 적용하여 내부적으로 스파스 벡터를 생성합니다.</p>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Perform-BM25-full-text-search" class="common-anchor-header">4단계: BM25 전체 텍스트 검색 수행<button data-href="#Step-4-Perform-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>원본 쿼리 텍스트를 검색 데이터로 사용하여 스파스 벡터 필드에 대해 검색을 수행합니다. Milvus는 쿼리 텍스트를 스파스 벡터로 변환하고, BM25를 통해 일치 항목을 순위 매긴 후, 요청된 <code translate="no">TEXT</code> 필드의 결과를 <code translate="no">output_fields</code> 에 반환합니다.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Read-the-returned-TEXT-values" class="common-anchor-header">5단계: 반환된 TEXT 값 읽기<button data-href="#Step-5-Read-the-returned-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p>각 검색 결과에는 BM25 점수와 원본 <code translate="no">TEXT</code> 값이 포함됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>BM25 함수, 스파스 벡터 인덱스 및 전체 텍스트 검색용 쿼리 구문에 대한 자세한 내용은 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하십시오.</p>
