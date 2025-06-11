---
id: schema-hands-on.md
title: 스키마 디자인 실습
summary: >-
  검색 엔진이라고도 하는 정보 검색(IR) 시스템은 검색 증강 생성(RAG), 이미지 검색, 상품 추천 등 다양한 AI 애플리케이션에
  필수적입니다. IR 시스템 개발의 첫 번째 단계는 데이터 모델을 설계하는 것으로, 여기에는 비즈니스 요구 사항을 분석하고 정보를 구성하는
  방법을 결정하며 의미론적으로 검색할 수 있도록 데이터를 색인화하는 작업이 포함됩니다.
---

<h1 id="Schema-Design-Hands-On" class="common-anchor-header">스키마 디자인 실습<button data-href="#Schema-Design-Hands-On" class="anchor-icon" translate="no">
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
    </button></h1><p>검색 엔진이라고도 하는 정보 검색(IR) 시스템은 검색 증강 생성(RAG), 이미지 검색, 상품 추천과 같은 다양한 AI 애플리케이션에 필수적입니다. IR 시스템 개발의 첫 번째 단계는 데이터 모델을 설계하는 것으로, 여기에는 비즈니스 요구 사항을 분석하고 정보를 구성하는 방법을 결정하며 의미론적으로 검색할 수 있도록 데이터를 색인화하는 작업이 포함됩니다.</p>
<p>Milvus는 컬렉션 스키마를 통해 데이터 모델을 정의할 수 있도록 지원합니다. 컬렉션은 텍스트와 이미지와 같은 비정형 데이터와 그 벡터 표현을 의미론적 검색에 사용되는 다양한 정밀도의 고밀도 및 희소 벡터와 함께 구성합니다. 또한, Milvus는 '스칼라'라는 비벡터 데이터 유형의 저장과 필터링을 지원합니다. 스칼라 유형에는 BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON 및 Array가 포함됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-hands-on.png" alt="Schema Hands On" class="doc-image" id="schema-hands-on" />
   </span> <span class="img-wrapper"> <span>스키마 실습</span> </span></p>
<p>검색 시스템의 데이터 모델 설계에는 비즈니스 요구 사항을 분석하고 스키마로 표현된 데이터 모델로 정보를 추상화하는 작업이 포함됩니다. 예를 들어, 텍스트를 검색하려면 '임베딩'을 통해 리터럴 문자열을 벡터로 변환하여 벡터 검색이 가능하도록 '인덱싱'해야 합니다. 이 기본 요구 사항 외에도 게시 타임스탬프나 작성자 등의 다른 속성을 저장해야 할 수도 있습니다. 이 메타데이터를 사용하면 필터링을 통해 시맨틱 검색을 구체화하여 특정 날짜 이후에 또는 특정 작성자가 게시한 텍스트만 반환할 수 있습니다. 또한 애플리케이션에서 검색 결과를 렌더링하기 위해 기본 텍스트와 함께 검색해야 할 수도 있습니다. 이러한 텍스트 조각을 구성하려면 정수 또는 문자열로 표현되는 고유 식별자를 각각 할당해야 합니다. 이러한 요소는 정교한 검색 로직을 구현하는 데 필수적입니다.</p>
<p>잘 설계된 스키마는 데이터 모델을 추상화하고 검색을 통해 비즈니스 목표를 달성할 수 있는지 여부를 결정하기 때문에 중요합니다. 또한 컬렉션에 삽입되는 모든 데이터 행이 스키마를 따라야 하므로 데이터 일관성과 장기적인 품질을 유지하는 데 큰 도움이 됩니다. 기술적 관점에서 잘 정의된 스키마는 잘 정리된 열 데이터 저장과 더 깔끔한 인덱스 구조로 이어져 검색 성능을 향상시킬 수 있습니다.</p>
<h2 id="An-Example-News-Search" class="common-anchor-header">예시: 뉴스 검색<button data-href="#An-Example-News-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>뉴스 웹사이트에 대한 검색을 구축하려고 하는데 텍스트, 썸네일 이미지 및 기타 메타데이터가 포함된 뉴스 코퍼스가 있다고 가정해 봅시다. 먼저, 검색이라는 비즈니스 요구 사항을 지원하기 위해 데이터를 어떻게 활용할 것인지 분석해야 합니다. 썸네일 이미지와 콘텐츠 요약을 기반으로 뉴스를 검색하고, 작성자 정보 및 게시 시간과 같은 메타데이터를 검색 결과를 필터링하는 기준으로 삼는다고 가정해 보겠습니다. 이러한 요구 사항은 더 세분화할 수 있습니다:</p>
<ul>
<li><p>텍스트를 통해 이미지를 검색하려면 텍스트와 이미지 데이터를 동일한 잠재 공간에 매핑할 수 있는 멀티모달 임베딩 모델을 통해 이미지를 벡터에 임베드할 수 있습니다.</p></li>
<li><p>기사의 요약 텍스트는 텍스트 임베딩 모델을 통해 벡터에 임베드됩니다.</p></li>
<li><p>게시 시간을 기준으로 필터링하기 위해 날짜는 스칼라 필드로 저장되며, 효율적인 필터링을 위해 스칼라 필드에 인덱스가 필요합니다. JSON과 같은 더 복잡한 데이터 구조는 스칼라에 저장하고 그 내용에 대해 필터링된 검색을 수행할 수 있습니다(JSON 색인 기능은 곧 제공될 예정입니다).</p></li>
<li><p>이미지 썸네일 바이트를 검색하여 검색 결과 페이지에 렌더링하기 위해 이미지 URL도 저장됩니다. 마찬가지로 요약 텍스트와 제목도 마찬가지입니다. (또는 필요한 경우 원시 텍스트 및 이미지 파일 데이터를 스칼라 필드로 저장할 수도 있습니다.)</p></li>
<li><p>요약 텍스트에 대한 검색 결과를 개선하기 위해 하이브리드 검색 방식을 설계합니다. 하나의 검색 경로의 경우, OpenAI의 <code translate="no">text-embedding-3-large</code> 또는 오픈 소스 <code translate="no">bge-large-en-v1.5</code> 와 같은 일반 임베딩 모델을 사용해 텍스트에서 고밀도 벡터를 생성합니다. 이러한 모델은 텍스트의 전체적인 의미를 잘 표현합니다. 다른 경로는 BM25 또는 SPLADE와 같은 스파스 임베딩 모델을 사용하여 텍스트의 세부 사항과 개별 개념을 파악하는 데 좋은 전체 텍스트 검색과 유사한 스파스 벡터를 생성하는 것입니다. Milvus는 멀티 벡터 기능을 통해 동일한 데이터 수집에서 이 두 가지를 모두 사용할 수 있도록 지원합니다. 여러 벡터에 대한 검색은 단일 <code translate="no">hybrid_search()</code> 작업으로 수행할 수 있습니다.</p></li>
<li><p>마지막으로, 각 개별 뉴스 페이지를 식별하기 위한 ID 필드도 필요한데, 공식적으로 Milvus 용어로는 '엔티티'라고 합니다. 이 필드는 기본 키(또는 줄여서 "pk")로 사용됩니다.</p></li>
</ul>
<table>
   <tr>
     <th><p>필드 이름</p></th>
     <th><p>article_id(기본 키)</p></th>
     <th><p>title</p></th>
     <th><p>author_info</p></th>
     <th><p>publish_ts</p></th>
     <th><p>image_url</p></th>
     <th><p>이미지_벡터</p></th>
     <th><p>요약</p></th>
     <th><p>summary_dense_vector</p></th>
     <th><p>요약_스파스_벡터</p></th>
   </tr>
   <tr>
     <td><p>유형</p></td>
     <td><p>INT64</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>JSON</p></td>
     <td><p>INT32</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
   </tr>
   <tr>
     <td><p>필요 인덱스</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N (곧 지원 예정)</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>Y</p></td>
   </tr>
</table>
<h2 id="How-to-Implement-the-Example-Schema" class="common-anchor-header">예제 스키마를 구현하는 방법<button data-href="#How-to-Implement-the-Example-Schema" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-Schema" class="common-anchor-header">스키마 생성</h3><p>먼저 Milvus 서버에 연결하고 컬렉션과 데이터를 관리하는 데 사용할 수 있는 Milvus 클라이언트 인스턴스를 생성합니다.</p>
<p>스키마를 설정하기 위해 <code translate="no">create_schema()</code> 을 사용하여 스키마 객체를 만들고 <code translate="no">add_field()</code> 을 사용하여 스키마에 필드를 추가합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>

<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

schema = MilvusClient.create_schema(
auto_id=<span class="hljs-literal">False</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">collectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;my_collection&quot;</span>;
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .description(<span class="hljs-string">&quot;article id&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .description(<span class="hljs-string">&quot;article title&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;author_info&quot;</span>)
        .dataType(DataType.JSON)
        .description(<span class="hljs-string">&quot;author information&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .dataType(DataType.Int32)
        .description(<span class="hljs-string">&quot;publish timestamp&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_url&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">500</span>)
        .description(<span class="hljs-string">&quot;image URL&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .description(<span class="hljs-string">&quot;image vector&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .description(<span class="hljs-string">&quot;article summary&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .description(<span class="hljs-string">&quot;summary dense vector&quot;</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .description(<span class="hljs-string">&quot;summary sparse vector&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);
<span class="hljs-keyword">const</span> collectionName = <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">const</span> schema = [
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;INT64&quot;</span>, <span class="hljs-attr">is_primary</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article id&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article title&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;author_info&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;JSON&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;author information&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;publish_ts&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;INT32&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;publish timestamp&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_url&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">500</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;image URL&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;image vector&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;article summary&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary_dense_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;summary dense vector&quot;</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;SPARSE_FLOAT_VECTOR&quot;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;summary sparse vector&quot;</span> },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

collectionName := <span class="hljs-string">&quot;my_collection&quot;</span>
schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;article_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article id&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">200</span>).
    WithDescription(<span class="hljs-string">&quot;article title&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;author_info&quot;</span>).
    WithDataType(entity.FieldTypeJSON).
    WithDescription(<span class="hljs-string">&quot;author information&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;publish_ts&quot;</span>).
    WithDataType(entity.FieldTypeInt32).
    WithDescription(<span class="hljs-string">&quot;publish timestamp&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;image_url&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">500</span>).
    WithDescription(<span class="hljs-string">&quot;image url&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;image_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;image vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;summary&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">1000</span>).
    WithDescription(<span class="hljs-string">&quot;article summary&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;summary dense vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription(<span class="hljs-string">&quot;summary sparse vector&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;article_id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> titleField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;title&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 200
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> authorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;author_info&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> publishField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;publish_ts&quot;,
    &quot;dataType&quot;: &quot;Int32&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> imgField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;image_url&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 500
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> imgVecField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;image_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;max_length&quot;: 1000
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summaryDenseField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary_dense_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 768
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> summarySparseField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;summary_sparse_vector&quot;,
    &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 768
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$idField</span>,
        <span class="hljs-variable">$titleField</span>,
        <span class="hljs-variable">$authorField</span>,
        <span class="hljs-variable">$publishField</span>,
        <span class="hljs-variable">$imgField</span>,
        <span class="hljs-variable">$imgVecField</span>,
        <span class="hljs-variable">$summaryField</span>,
        <span class="hljs-variable">$summaryDenseField</span>,
        <span class="hljs-variable">$summarySparseField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">MilvusClient</code> 에서 <code translate="no">uri</code> 인수를 볼 수 있으며, 이는 Milvus 서버에 연결하는 데 사용됩니다. 인수는 다음과 같이 설정할 수 있습니다:</p>
<ul>
<li><p>소규모 데이터나 프로토타이핑을 위해 로컬 벡터 데이터베이스만 필요한 경우, 예를 들어<code translate="no">./milvus.db</code> 와 같이 로컬 파일로 URL을 설정하는 것이 가장 편리한 방법이며, 이 파일에 모든 데이터를 저장하기 위해 <a href="/docs/ko/v2.5.x/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하기 때문입니다.</p></li>
<li><p>백만 개 이상의 벡터와 같이 대규모 데이터가 있는 경우, <a href="/docs/ko/v2.5.x/quickstart.md">Docker 또는 Kubernetes에서</a> 더 성능이 뛰어난 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 주소와 포트를 URI로 사용하세요(예:<code translate="no">http://localhost:19530</code>). Milvus에서 인증 기능을 활성화하는 경우 토큰으로 "<your_username>:<your_password>"을 사용하고, 그렇지 않은 경우 토큰을 설정하지 마세요.</p></li>
<li><p>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하는 경우, 질리즈 클라우드의 퍼블릭 엔드포인트와 API 키에 해당하는 <code translate="no">uri</code> 및 <code translate="no">token</code> 을 조정합니다.</p></li>
</ul>
<p><code translate="no">MilvusClient.create_schema</code> 의 <code translate="no">auto_id</code> 는 기본 필드의 속성으로 기본 필드에 대한 자동 증분 활성화 여부를 결정합니다.  <code translate="no">article_id</code> 필드를 기본 키로 설정하고 문서 ID를 수동으로 추가하고자 하므로 <code translate="no">auto_id</code> False를 설정하여 이 기능을 비활성화합니다.</p>
<p>스키마 객체에 모든 필드를 추가하면 스키마 객체가 위 표의 항목과 일치합니다.</p>
<h3 id="Define-Index" class="common-anchor-header">색인 정의</h3><p>이미지 및 요약 데이터에 대한 메타데이터와 벡터 필드를 포함한 다양한 필드로 스키마를 정의한 후 다음 단계는 인덱스 매개변수를 준비하는 것입니다. 인덱싱은 벡터의 검색과 검색을 최적화하고 효율적인 쿼리 성능을 보장하는 데 매우 중요합니다. 다음 섹션에서는 컬렉션에서 지정된 벡터 및 스칼라 필드에 대한 인덱스 매개변수를 정의하겠습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,
index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
)
index_params.add_index(
field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,
index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_dense_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;publish_ts&quot;</span>)
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);
<span class="hljs-keyword">const</span> index_params = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
  },
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;publish_ts&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">INVERTED</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOption1 := milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;image_vector&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.IP)))
indexOption2 := milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;summary_dense_vector&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.IP)))
indexOption3 := milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,
    index.NewSparseInvertedIndex(index.MetricType(entity.IP), <span class="hljs-number">0.2</span>))
indexOption4 := milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;publish_ts&quot;</span>,
    index.NewInvertedIndex())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
indexParams=<span class="hljs-string">&#x27;[
  {
    &quot;fieldName&quot;: &quot;image_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;summary_dense_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;summary_sparse_vector&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  },
  {
    &quot;fieldName&quot;: &quot;publish_ts&quot;,
    &quot;params&quot;: {
      &quot;index_type&quot;: &quot;AUTOINDEX&quot;
    }
  }
]&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>인덱스 매개변수를 설정하고 적용하면 Milvus는 벡터 및 스칼라 데이터에 대한 복잡한 쿼리를 처리하는 데 최적화됩니다. 이 인덱싱은 컬렉션 내 유사성 검색의 성능과 정확성을 향상시켜 이미지 벡터와 요약 벡터를 기반으로 한 문서를 효율적으로 검색할 수 있게 해줍니다. 밀도 벡터를 위한 <code translate="no">AUTOINDEX</code>, 스파스 벡터를 위한 <code translate="no">SPARSE_INVERTED_INDEX</code>, 스칼라를 위한 <code translate="no">INVERTED_INDEX</code> 인덱스를 활용함으로써 밀버스는 가장 관련성이 높은 결과를 신속하게 식별하고 반환하여 전반적인 사용자 경험과 데이터 검색 프로세스의 효율성을 크게 개선할 수 있습니다.</p>
<p>다양한 유형의 인덱스와 메트릭이 있습니다. 이에 대한 자세한 내용은 <a href="/docs/ko/v2.5.x/overview.md#Index-types">Milvus 인덱스 유형</a> 및 <a href="/docs/ko/v2.5.x/glossary.md#Metric-type">Milvus 메트릭 유형을</a> 참조하세요.</p>
<h3 id="Create-Collection" class="common-anchor-header">컬렉션 만들기</h3><p>스키마와 인덱스가 정의되면 이러한 매개변수를 사용하여 "컬렉션"을 만듭니다. Milvus에 대한 컬렉션은 관계형 DB에 대한 테이블과 같습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(collectionName)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: index_params,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(collectionName, schema).
        WithIndexOptions(indexOption1, indexOption2, indexOption3, indexOption4))
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
  \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>

<p>컬렉션에 대한 설명을 통해 컬렉션이 성공적으로 생성되었는지 확인할 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(
    collection_name=collection_name
)
<span class="hljs-built_in">print</span>(collection_desc)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">DescribeCollectionResp</span> <span class="hljs-variable">descResp</span> <span class="hljs-operator">=</span> client.describeCollection(DescribeCollectionReq.builder()
        .collectionName(collectionName)
        .build());
System.out.println(descResp);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> collection_desc = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeCollection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(collection_desc);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">desc, err := client.DescribeCollection(ctx, milvusclient.NewDescribeCollectionOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(desc.Schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: $collection_name
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Other-Considerations" class="common-anchor-header">기타 고려 사항<button data-href="#Other-Considerations" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Loading-Index" class="common-anchor-header">인덱스 로드</h3><p>Milvus에서 컬렉션을 만들 때 인덱스를 즉시 로드하거나 일부 데이터를 대량으로 수집할 때까지 연기하도록 선택할 수 있습니다. 위의 예제에서는 수집 생성 직후 수집된 모든 데이터에 대해 인덱스가 자동으로 생성되므로 일반적으로 이에 대해 명시적으로 선택할 필요가 없습니다. 이렇게 하면 수집된 데이터를 즉시 검색할 수 있습니다. 그러나 컬렉션 생성 후 대량의 대량 삽입이 있고 특정 시점까지 데이터를 검색할 필요가 없는 경우, 컬렉션 생성에서 index_params를 생략하여 인덱스 구축을 연기하고 모든 데이터를 수집한 후 명시적으로 load를 호출하여 인덱스를 구축할 수 있습니다. 이 방법은 대규모 컬렉션에서 인덱스를 구축하는 데 더 효율적이지만 load()를 호출하기 전까지는 검색을 수행할 수 없습니다.</p>
<h3 id="How-to-Define-Data-Model-For-Multi-tenancy" class="common-anchor-header">멀티테넌시를 위한 데이터 모델을 정의하는 방법</h3><p>다중 테넌트 개념은 단일 소프트웨어 애플리케이션이나 서비스가 각각 고립된 환경을 가진 여러 독립 사용자나 조직에 서비스를 제공해야 하는 시나리오에서 일반적으로 사용됩니다. 이는 클라우드 컴퓨팅, SaaS(서비스형 소프트웨어) 애플리케이션 및 데이터베이스 시스템에서 자주 볼 수 있습니다. 예를 들어, 클라우드 스토리지 서비스는 멀티테넌시를 활용하여 여러 회사가 동일한 기본 인프라를 공유하면서 데이터를 개별적으로 저장하고 관리할 수 있도록 할 수 있습니다. 이 접근 방식은 리소스 활용도와 효율성을 극대화하는 동시에 각 테넌트의 데이터 보안과 개인정보 보호를 보장합니다.</p>
<p>테넌트를 구분하는 가장 쉬운 방법은 데이터와 리소스를 서로 분리하는 것입니다. 각 테넌트는 특정 리소스에 대한 독점적 액세스 권한을 갖거나 데이터베이스, 컬렉션, 파티션과 같은 Milvus 엔티티를 관리하기 위해 다른 테넌트와 리소스를 공유합니다. 멀티 테넌시를 구현하기 위해 이러한 엔티티에 맞춰진 특정 방법이 있습니다. 자세한 내용은 <a href="/docs/ko/v2.5.x/multi_tenancy.md#Multi-tenancy-strategies">Milvus 멀티테넌시 페이지를</a> 참조하세요.</p>
