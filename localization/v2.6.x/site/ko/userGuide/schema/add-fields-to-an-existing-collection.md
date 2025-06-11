---
id: add-fields-to-an-existing-collection.md
title: 기존 컬렉션에 필드 추가Compatible with Milvus 2.6.x
summary: >-
  Milvus를 사용하면 기존 컬렉션에 새 필드를 동적으로 추가할 수 있으므로 애플리케이션 요구 사항의 변화에 따라 데이터 스키마를 쉽게
  발전시킬 수 있습니다. 이 가이드는 실제 예제를 사용하여 다양한 시나리오에서 필드를 추가하는 방법을 보여줍니다.
beta: Milvus 2.6.x
---
<h1 id="Add-Fields-to-an-Existing-Collection" class="common-anchor-header">기존 컬렉션에 필드 추가<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-Fields-to-an-Existing-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus를 사용하면 기존 컬렉션에 새 필드를 동적으로 추가할 수 있으므로 애플리케이션 요구 사항의 변화에 따라 데이터 스키마를 쉽게 발전시킬 수 있습니다. 이 가이드는 실제 예제를 사용하여 다양한 시나리오에서 필드를 추가하는 방법을 보여줍니다.</p>
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
    </button></h2><p>컬렉션에 필드를 추가하기 전에 다음과 같은 중요한 사항을 염두에 두세요:</p>
<ul>
<li><p>스칼라 필드(<code translate="no">INT64</code>, <code translate="no">VARCHAR</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code> 등)를 추가할 수 있습니다. 벡터 필드는 기존 컬렉션에 추가할 수 없습니다.</p></li>
<li><p>새 필드에 대한 값이 없는 기존 엔티티를 수용하려면 새 필드를 null 가능(nullable=True)으로 설정해야 합니다.</p></li>
<li><p>로드된 컬렉션에 필드를 추가하면 메모리 사용량이 증가합니다.</p></li>
<li><p>컬렉션당 총 필드 수에는 최대 제한이 있습니다. 자세한 내용은 <a href="/docs/ko/limitations.md#Number-of-resources-in-a-collection">밀버스 제한을</a> 참조하세요.</p></li>
<li><p>필드 이름은 정적 필드 중에서 고유해야 합니다.</p></li>
<li><p>원래 <code translate="no">enable_dynamic_field=True</code> 으로 만들지 않은 컬렉션에는 동적 필드 기능을 활성화하기 위해 <code translate="no">$meta</code> 필드를 추가할 수 없습니다.</p></li>
</ul>
<h2 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>이 가이드에서는 다음이 있다고 가정합니다:</p>
<ul>
<li><p>실행 중인 Milvus 인스턴스</p></li>
<li><p>Milvus SDK 설치</p></li>
<li><p>기존 컬렉션</p></li>
</ul>
<div class="alert note">
<p>컬렉션 생성 및 기본 작업은 컬렉션 <a href="/docs/ko/create-collection.md">만들기를</a> 참조하세요.</p>
</div>
<h2 id="Basic-usage" class="common-anchor-header">기본 사용법<button data-href="#Basic-usage" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Scenario-1-Quickly-add-nullable-fields" class="common-anchor-header">시나리오 1: 빠르게 null 가능한 필드 추가하기<button data-href="#Scenario-1-Quickly-add-nullable-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 확장하는 가장 간단한 방법은 null 가능한 필드를 추가하는 것입니다. 이 방법은 데이터에 새 속성을 빠르게 추가해야 할 때 적합합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a nullable field to an existing collection</span>
<span class="hljs-comment"># This operation:</span>
<span class="hljs-comment"># - Returns almost immediately (non-blocking)</span>
<span class="hljs-comment"># - Makes the field available for use with minimal delay</span>
<span class="hljs-comment"># - Sets NULL for all existing entities</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    field_name=<span class="hljs-string">&quot;created_timestamp&quot;</span>,  <span class="hljs-comment"># Name of the new field to add</span>
    data_type=DataType.INT64,        <span class="hljs-comment"># Data type must be a scalar type</span>
    nullable=<span class="hljs-literal">True</span>                    <span class="hljs-comment"># Must be True for added fields</span>
    <span class="hljs-comment"># Allows NULL values for existing entities</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="What-to-expect" class="common-anchor-header">기대할 수 있는 기능</h3><ul>
<li><p><strong>기존 엔티티는</strong> 새 필드에 대해 NULL을 갖습니다.</p></li>
<li><p><strong>새 엔티티는</strong> NULL 또는 실제 값을 가질 수 있습니다.</p></li>
<li><p>내부 스키마 동기화로 인해 지연을 최소화하면서 거의 즉시<strong>필드 사용 가능</strong> </p></li>
<li><p>짧은 동기화 기간 후<strong>즉시 쿼리 가능</strong> </p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query result</span>
{
    <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, 
    <span class="hljs-string">&#x27;created_timestamp&#x27;</span>: <span class="hljs-literal">None</span>  <span class="hljs-comment"># New field shows NULL for existing entities</span>
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Scenario-2-Add-fields-with-default-values" class="common-anchor-header">시나리오 2: 기본값이 있는 필드 추가<button data-href="#Scenario-2-Add-fields-with-default-values" class="anchor-icon" translate="no">
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
    </button></h2><p>기존 엔티티가 NULL 대신 의미 있는 초기 값을 갖도록 하려면 기본값을 지정하세요.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a field with default value</span>
<span class="hljs-comment"># This operation:</span>
<span class="hljs-comment"># - Sets the default value for all existing entities</span>
<span class="hljs-comment"># - Makes the field available with minimal delay</span>
<span class="hljs-comment"># - Maintains data consistency with the default value</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    field_name=<span class="hljs-string">&quot;priority_level&quot;</span>,     <span class="hljs-comment"># Name of the new field</span>
    data_type=DataType.VARCHAR,      <span class="hljs-comment"># String type field</span>
    max_length=<span class="hljs-number">20</span>,                   <span class="hljs-comment"># Maximum string length</span>
    nullable=<span class="hljs-literal">True</span>,                   <span class="hljs-comment"># Required for added fields</span>
    default_value=<span class="hljs-string">&quot;standard&quot;</span>         <span class="hljs-comment"># Value assigned to existing entities</span>
    <span class="hljs-comment"># Also used for new entities if no value provided</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="What-to-expect" class="common-anchor-header">예상되는 결과</h3><ul>
<li><p><strong>기존 엔티티는</strong> 새로 추가된 필드에 대해 기본값(<code translate="no">&quot;standard&quot;</code>)을 갖게 됩니다.</p></li>
<li><p><strong>새 엔티티는</strong> 기본값을 재정의하거나 값이 제공되지 않은 경우 기본값을 사용할 수 있습니다.</p></li>
<li><p>최소한의 지연으로 거의 즉시<strong>필드 사용 가능</strong> </p></li>
<li><p>짧은 동기화 기간 후<strong>즉시 쿼리 가능</strong> </p></li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Example query result</span>
{
    <span class="hljs-string">&#x27;id&#x27;</span>: 1,
    <span class="hljs-string">&#x27;priority_level&#x27;</span>: <span class="hljs-string">&#x27;standard&#x27;</span>  <span class="hljs-comment"># Shows default value for existing entities</span>
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-I-enable-dynamic-schema-functionality-by-adding-a-meta-field" class="common-anchor-header"><code translate="no">$meta</code> 필드를 추가하여 동적 스키마 기능을 활성화할 수 있나요?</h3><p>아니요, <code translate="no">add_collection_field</code> 을 사용하여 <code translate="no">$meta</code> 필드를 추가하여 동적 필드 기능을 활성화할 수 없습니다. 컬렉션을 만들 때 스키마에서 <code translate="no">enable_dynamic_field=True</code> 을 설정하여 동적 스키마를 사용하도록 설정해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># ❌ This is NOT supported</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;existing_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;$meta&quot;</span>,
    data_type=DataType.JSON  <span class="hljs-comment"># This operation will fail</span>
)

<span class="hljs-comment"># ✅ Dynamic field must be enabled during collection creation</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    dimension=<span class="hljs-number">5</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="What-happens-when-I-add-a-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">동적 필드 키와 이름이 같은 필드를 추가하면 어떻게 되나요?</h3><p>컬렉션에 동적 필드가 활성화된 경우(<code translate="no">$meta</code> 존재) 기존 동적 필드 키와 이름이 같은 정적 필드를 추가할 수 있습니다. 새 정적 필드는 동적 필드 키를 가리지만 원래 동적 데이터는 그대로 유지됩니다.</p>
<p><strong>예시 시나리오:</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Original collection with dynamic field enabled</span>
<span class="hljs-comment"># Insert data with dynamic field keys</span>
data = [{
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">&quot;my_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, ...],
    <span class="hljs-string">&quot;extra_info&quot;</span>: <span class="hljs-string">&quot;this is a dynamic field key&quot;</span>,  <span class="hljs-comment"># Dynamic field key as string</span>
    <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">99.5</span>                                 <span class="hljs-comment"># Another dynamic field key</span>
}]
client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=data)

<span class="hljs-comment"># Add static field with same name as existing dynamic field key</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    field_name=<span class="hljs-string">&quot;extra_info&quot;</span>,         <span class="hljs-comment"># Same name as dynamic field key</span>
    data_type=DataType.INT64,        <span class="hljs-comment"># Data type can differ from dynamic field key</span>
    nullable=<span class="hljs-literal">True</span>                    <span class="hljs-comment"># Must be True for added fields</span>
)

<span class="hljs-comment"># Insert new data after adding static field</span>
new_data = [{
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
    <span class="hljs-string">&quot;my_vector&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, ...],
    <span class="hljs-string">&quot;extra_info&quot;</span>: <span class="hljs-number">100</span>,               <span class="hljs-comment"># Now must use INT64 type (static field)</span>
    <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">88.0</span>                    <span class="hljs-comment"># Still a dynamic field key</span>
}]
client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=new_data)
<button class="copy-code-btn"></button></code></pre>
<p><strong>예상되는 결과</strong></p>
<ul>
<li><p><strong>기존 엔티티는</strong> 새 정적 필드에 대해 NULL을 갖습니다. <code translate="no">extra_info</code></p></li>
<li><p><strong>새 엔티티는</strong> 정적 필드의 데이터 유형(<code translate="no">INT64</code>)을 사용해야 합니다.</p></li>
<li><p><strong>원래 동적 필드 키 값은</strong> 보존되며 <code translate="no">$meta</code> 구문을 통해 액세스할 수 있습니다.</p></li>
<li><p>정적<strong>필드는</strong> 일반 쿼리에서<strong>동적 필드 키를 마스킹합니다</strong>.</p></li>
</ul>
<p><strong>정적 및 동적 값 모두 액세스</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. Query static field only (dynamic field key is masked)</span>
results = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id == 1&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;extra_info&quot;</span>]
)
<span class="hljs-comment"># Returns: {&quot;id&quot;: 1, &quot;extra_info&quot;: None}  # NULL for existing entity</span>

<span class="hljs-comment"># 2. Query both static and original dynamic values</span>
results = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, 
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id == 1&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;extra_info&quot;</span>, <span class="hljs-string">&quot;$meta[&#x27;extra_info&#x27;]&quot;</span>]
)
<span class="hljs-comment"># Returns: {</span>
<span class="hljs-comment">#     &quot;id&quot;: 1,</span>
<span class="hljs-comment">#     &quot;extra_info&quot;: None,                           # Static field value (NULL)</span>
<span class="hljs-comment">#     &quot;$meta[&#x27;extra_info&#x27;]&quot;: &quot;this is a dynamic field key&quot;  # Original dynamic value</span>
<span class="hljs-comment"># }</span>

<span class="hljs-comment"># 3. Query new entity with static field value</span>
results = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id == 2&quot;</span>, 
    output_fields=[<span class="hljs-string">&quot;extra_info&quot;</span>]
)
<span class="hljs-comment"># Returns: {&quot;id&quot;: 2, &quot;extra_info&quot;: 100}  # Static field value</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="How-long-does-it-take-for-a-new-field-to-become-available" class="common-anchor-header">새 필드를 사용할 수 있게 되는 데 얼마나 걸리나요?</h3><p>추가된 필드는 거의 즉시 사용할 수 있지만, 내부 스키마 변경 브로드캐스팅으로 인해 Milvus 클러스터 전체에 잠시 지연될 수 있습니다. 이 동기화를 통해 모든 노드가 새 필드와 관련된 쿼리를 처리하기 전에 스키마 업데이트를 인지할 수 있습니다.</p>
