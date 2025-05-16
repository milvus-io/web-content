---
id: schema.md
summary: Milvus에서 스키마를 정의하는 방법을 알아보세요.
title: 스키마 관리
---
<h1 id="Manage-Schema" class="common-anchor-header">스키마 관리<button data-href="#Manage-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Milvus의 스키마에 대해 소개합니다. 스키마는 컬렉션의 속성과 그 안의 필드를 정의하는 데 사용됩니다.</p>
<h2 id="Field-schema" class="common-anchor-header">필드 스키마<button data-href="#Field-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>필드 스키마는 필드의 논리적 정의입니다. <a href="#Collection-schema">컬렉션 스키마를</a> 정의하고 <a href="/docs/ko/v2.4.x/manage-collections.md">컬렉션을 관리하기</a> 전에 가장 먼저 정의해야 하는 항목입니다.</p>
<p>Milvus는 컬렉션에서 하나의 기본 키 필드만 지원합니다.</p>
<h3 id="Field-schema-properties" class="common-anchor-header">필드 스키마 속성</h3><table class="properties">
    <thead>
    <tr>
        <th>속성</th>
        <th>설명</th>
        <th>참고</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">name</code></td>
        <td>생성할 컬렉션의 필드 이름</td>
        <td>데이터 유형입니다: 문자열<br/>필수</td>
    </tr>
    <tr>
        <td><code translate="no">dtype</code></td>
        <td>필드의 데이터 유형</td>
        <td>필수</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>필드에 대한 설명</td>
        <td>데이터 유형: 문자열<br/>선택 사항</td>
    </tr>
    <tr>
        <td><code translate="no">is_primary</code></td>
        <td>필드를 기본 키 필드로 설정할지 여부입니다.</td>
        <td>데이터 유형: 부울 (<code translate="no">true</code> 또는 <code translate="no">false</code>).<br/>기본 키 필드의 경우 필수입니다.</td>
    </tr>
        <tr>
            <td><code translate="no">auto_id</code> (기본 키 필드의 경우 필수)</td>
            <td>자동 ID(기본 키) 할당을 활성화 또는 비활성화할지 여부를 전환합니다.</td>
            <td><code translate="no">True</code> 또는 <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (VARCHAR 필드에 필수)</td>
            <td>삽입할 수 있는 문자열의 최대 바이트 길이입니다. 멀티바이트 문자(예: 유니코드 문자)는 각각 1바이트 이상을 차지할 수 있으므로 삽입된 문자열의 바이트 길이가 지정된 제한을 초과하지 않도록 주의하세요.</td>
            <td>[1, 65,535]</td>
        </tr>
    <tr>
        <td><code translate="no">dim</code></td>
        <td>벡터의 차원</td>
            <td>데이터 유형: 정수 &isin;[1, 32768]<br/>고밀도 벡터 필드의 경우 필수입니다. <a href="https://milvus.io/docs/sparse_vector.md">스파스 벡터</a> 필드의 경우 생략합니다.</td>
    </tr>
    <tr>
        <td><code translate="no">is_partition_key</code></td>
        <td>이 필드가 파티션 키 필드인지 여부입니다.</td>
        <td>데이터 유형: 부울(<code translate="no">true</code> 또는 <code translate="no">false</code>).</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">필드 스키마 만들기</h3><p>데이터 삽입의 복잡성을 줄이기 위해 Milvus에서는 필드 스키마를 생성하는 동안 기본 키 필드를 제외한 각 스칼라 필드에 대해 기본값을 지정할 수 있습니다. 즉, 데이터를 삽입할 때 필드를 비워두면 이 필드에 지정한 기본값이 적용됩니다.</p>
<p>일반 필드 스키마를 만듭니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># The following creates a field and use it as the partition key</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>기본 필드 값을 사용하여 필드 스키마를 생성합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema

fields = [
  FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  <span class="hljs-comment"># configure default value `25` for field `age`</span>
  FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, default_value=<span class="hljs-number">25</span>, description=<span class="hljs-string">&quot;age&quot;</span>),
  embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-types" class="common-anchor-header">지원되는 데이터 유형</h3><p><code translate="no">DataType</code> 은 필드에 포함된 데이터의 종류를 정의합니다. 필드마다 지원되는 데이터 유형이 다릅니다.</p>
<ul>
<li><p>기본 키 필드 지원</p>
<ul>
<li>INT64: numpy.int64</li>
<li>varchar: varchar</li>
</ul></li>
<li><p>스칼라 필드 지원:</p>
<ul>
<li>BOOL: 부울(<code translate="no">true</code> 또는 <code translate="no">false</code>)</li>
<li>INT8: numpy.int8</li>
<li>INT16: numpy.int16</li>
<li>INT32: numpy.int32</li>
<li>INT64: numpy.int64</li>
<li>FLOAT: numpy.float32</li>
<li>DOUBLE: numpy.double</li>
<li>VARCHAR: VARCHAR</li>
<li>JSON: <a href="/docs/ko/v2.4.x/use-json-fields.md">JSON</a></li>
<li>Array: <a href="/docs/ko/v2.4.x/array_data_type.md">Array</a></li>
</ul>
<p>복합 데이터 유형으로 JSON을 사용할 수 있습니다. JSON 필드는 키-값 쌍으로 구성됩니다. 각 키는 문자열이고 값은 숫자, 문자열, 부울 값, 배열 또는 목록일 수 있습니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/use-json-fields.md">JSON: 새로운 데이터 유형을</a> 참조하세요.</p></li>
<li><p>벡터 필드 지원</p>
<ul>
<li>바이너리_벡터: 이진 데이터를 0과 1의 시퀀스로 저장하며, 이미지 처리 및 정보 검색에서 특징을 간결하게 표현하는 데 사용됩니다.</li>
<li>FLOAT_VECTOR: 과학 컴퓨팅 및 머신 러닝에서 실수를 표현하는 데 일반적으로 사용되는 32비트 부동소수점 숫자를 저장합니다.</li>
<li>FLOAT16_VECTOR: 메모리 및 대역폭 효율성을 위해 딥러닝 및 GPU 계산에 사용되는 16비트 반정밀도 부동소수점 숫자를 저장합니다.</li>
<li>BFLOAT16_VECTOR: 정확도는 떨어지지만 Float32와 동일한 지수 범위를 가진 16비트 부동 소수점 숫자를 저장하며, 정확도에 큰 영향을 주지 않고 메모리 및 계산 요구 사항을 줄이기 위해 딥 러닝에서 널리 사용됩니다.</li>
<li>SPARSE_FLOAT_VECTOR: 희소 벡터를 표현하는 데 사용되는 0이 아닌 요소 목록과 그에 해당하는 인덱스를 저장합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/sparse_vector.md">스파스 벡터를</a> 참조하세요.</li>
</ul>
<p>Milvus는 컬렉션에서 여러 개의 벡터 필드를 지원합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/multi-vector-search.md">하이브리드 검색을</a> 참조하세요.</p></li>
</ul>
<h2 id="Collection-schema" class="common-anchor-header">컬렉션 스키마<button data-href="#Collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션 스키마는 컬렉션의 논리적 정의입니다. 일반적으로 컬렉션 스키마를 정의하고 <a href="/docs/ko/v2.4.x/manage-collections.md">컬렉션을 관리하기</a> 전에 <a href="#Field-schema">필드 스키마를</a> 정의해야 합니다.</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">컬렉션 스키마 속성</h3><table class="properties">
    <thead>
    <tr>
        <th>속성</th>
        <th>설명</th>
        <th>참고</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">field</code></td>
        <td>만들 컬렉션의 필드</td>
        <td>필수</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>컬렉션에 대한 설명</td>
        <td>데이터 유형입니다: 문자열<br/>선택 사항</td>
    </tr>
    <tr>
        <td><code translate="no">partition_key_field</code></td>
        <td>파티션 키 역할을 하도록 설계된 필드의 이름입니다.</td>
        <td>데이터 유형: 문자열<br/>선택 사항</td>
    </tr>
    <tr>
        <td><code translate="no">enable_dynamic_field</code></td>
        <td>동적 스키마 활성화 여부</td>
        <td>데이터 유형: 부울(<code translate="no">true</code> 또는 <code translate="no">false</code>).<br/>선택 사항, 기본값은 <code translate="no">False</code> 입니다.<br/>동적 스키마에 대한 자세한 내용은 동적 <a herf="enable-dynamic-field.md">스키마</a> 및 컬렉션 관리를 위한 사용자 가이드를 참조하세요.</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-collection-schema" class="common-anchor-header">컬렉션 스키마 만들기</h3><div class="alert note">
  컬렉션 스키마를 정의하기 전에 필드 스키마를 정의합니다.</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set enable_dynamic_field to True if you need to use dynamic fields. </span>
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>스키마를 지정한 컬렉션을 만듭니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>,connections
conn = connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = <span class="hljs-title class_">Collection</span>(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>샤드 번호는 <code translate="no">shards_num</code> 로 정의할 수 있습니다.</li>
<li><code translate="no">using</code> 에 별칭을 지정하여 컬렉션을 생성할 Milvus 서버를 정의할 수 있습니다.</li>
<li><a href="/docs/ko/v2.4.x/multi_tenancy.md">파티션 키 기반 멀티 테넌시를</a> 구현해야 하는 경우 필드에서 <code translate="no">is_partition_key</code> 을 <code translate="no">True</code> 으로 설정하여 필드에서 파티션 키 기능을 활성화할 수 있습니다.</li>
<li>동적 <a href="/docs/ko/v2.4.x/enable-dynamic-field.md">필드를 활성화해야</a> 하는 경우 컬렉션 스키마에서 <code translate="no">enable_dynamic_field</code> 을 <code translate="no">True</code> 으로 설정하여 동적 스키마를 활성화할 수 있습니다.</li>
</ul>
</div>
<p><br/>
또한 <code translate="no">Collection.construct_from_dataframe</code> 을 사용하여 컬렉션을 만들 수 있으며, 이 경우 DataFrame에서 컬렉션 스키마가 자동으로 생성되어 컬렉션이 생성됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
df = pd.DataFrame({
    <span class="hljs-string">&quot;id&quot;</span>: [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;age&quot;</span>: [random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;embedding&quot;</span>: [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;position&quot;</span>: <span class="hljs-string">&quot;test_pos&quot;</span>
})

collection, ins_res = Collection.construct_from_dataframe(
    <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    df,
    primary_field=<span class="hljs-string">&#x27;id&#x27;</span>,
    auto_id=<span class="hljs-literal">False</span>
    )
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/ko/v2.4.x/manage-collections.md">컬렉션을 관리할</a> 때 스키마를 준비하는 방법을 알아보세요.</li>
<li><a href="/docs/ko/v2.4.x/enable-dynamic-field.md">동적 스키마에</a> 대해 자세히 알아보세요.</li>
<li><a href="/docs/ko/v2.4.x/multi_tenancy.md">멀티테넌시의</a> 파티션 키에 대해 자세히 알아보세요.</li>
</ul>
