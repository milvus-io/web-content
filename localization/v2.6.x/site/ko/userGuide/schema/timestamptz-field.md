---
id: timestamptz-field.md
title: 타임스탬프 필드Compatible with Milvus 2.6.4+
summary: >-
  전자상거래 시스템, 협업 도구, 분산 로깅 등 여러 지역에 걸쳐 시간을 추적하는 애플리케이션은 시간대가 포함된 타임스탬프를 정밀하게 처리해야
  합니다. Milvus의 타임스탬프 데이터 유형은 타임스탬프를 관련 시간대와 함께 저장하여 이러한 기능을 제공합니다.
beta: Milvus 2.6.4+
---
<h1 id="TIMESTAMPTZ-Field" class="common-anchor-header">타임스탬프 필드<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#TIMESTAMPTZ-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>전자상거래 시스템, 협업 도구, 분산 로깅 등 여러 지역에 걸쳐 시간을 추적하는 애플리케이션은 시간대가 포함된 타임스탬프를 정확하게 처리해야 합니다. Milvus의 <code translate="no">TIMESTAMPTZ</code> 데이터 유형은 타임스탬프를 관련 시간대와 함께 저장하여 이 기능을 제공합니다.</p>
<h2 id="What-is-a-TIMESTAMPTZ-field" class="common-anchor-header">타임스탬프 필드란 무엇인가요?<button data-href="#What-is-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TIMESTAMPTZ</code> 필드는 명시적인 표준 시간대와 함께 타임스탬프를 저장하는 Milvus의 스키마 정의 데이터 유형(<code translate="no">DataType.TIMESTAMPTZ</code>)입니다:</p>
<ul>
<li><p><strong>허용되는 입력 형식입니다</strong>: 시간대 오프셋이 있는 <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> 문자열(예: <code translate="no">&quot;2025-05-01T23:59:59+08:00&quot;</code> 은 UTC+08:00 기준 11:59:59 PM을 나타냄).</p></li>
<li><p><strong>내부 저장소</strong>: 모든 <code translate="no">TIMESTAMPTZ</code> 값은 정규화되어 <a href="https://en.wikipedia.org/wiki/Coordinated_Universal_Time">협정 세계시</a> (UTC)로 저장됩니다.</p></li>
<li><p><strong>비교 및 필터링</strong>: 모든 필터링 및 순서 지정 작업은 UTC로 수행되므로 서로 다른 시간대에 걸쳐 일관되고 예측 가능한 결과를 보장합니다.</p></li>
</ul>
<div class="alert note">
<ul>
<li><p><code translate="no">TIMESTAMPTZ</code> 필드에 <code translate="no">nullable=True</code> 을 설정하여 누락된 값을 허용할 수 있습니다.</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> 형식의 <code translate="no">default_value</code> 속성을 사용하여 기본 타임스탬프 값을 지정할 수 있습니다.</p></li>
</ul>
<p>자세한 내용은 <a href="/docs/ko/nullable-and-default.md">무효화 가능 및 기본값을</a> 참조하세요.</p>
</div>
<h2 id="Basic-operations" class="common-anchor-header">기본 작업<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TIMESTAMPTZ</code> 필드 사용의 기본 워크플로우는 Milvus의 다른 스칼라 필드와 유사합니다: 필드 정의 → 데이터 삽입 → 쿼리/필터.</p>
<h3 id="Step-1-Define-a-TIMESTAMPTZ-field" class="common-anchor-header">1단계: 타임스탬프 필드 정의하기<button data-href="#Step-1-Define-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">TIMESTAMPTZ</code> 필드를 사용하려면 컬렉션을 만들 때 컬렉션 스키마에 명시적으로 정의하세요. 다음 예는 <code translate="no">DataType.TIMESTAMPTZ</code> 유형의 <code translate="no">tsz</code> 필드가 있는 컬렉션을 만드는 방법을 보여줍니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> datetime
<span class="hljs-keyword">import</span> pytz

server_address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
collection_name = <span class="hljs-string">&quot;timestamptz_test123&quot;</span>

client = MilvusClient(uri=server_address)

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema()
<span class="hljs-comment"># Add a primary key field</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="hljs-comment"># Add a TIMESTAMPTZ field that allows null values</span>
<span class="highlighted-wrapper-line">schema.add_field(<span class="hljs-string">&quot;tsz&quot;</span>, DataType.TIMESTAMPTZ, nullable=<span class="hljs-literal">True</span>)</span>
<span class="hljs-comment"># Add a vector field</span>
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)

client.create_collection(collection_name, schema=schema, consistency_level=<span class="hljs-string">&quot;Session&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; with a TimestampTz field created successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-data" class="common-anchor-header">2단계: 데이터 삽입<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>표준 시간대 오프셋이 있는 ISO 8601 문자열을 포함하는 엔티티를 삽입합니다.</p>
<p>아래 예는 8,193개의 샘플 데이터 행을 컬렉션에 삽입합니다. 각 행에는 다음이 포함됩니다:</p>
<ul>
<li><p>고유 ID</p></li>
<li><p>표준 시간대 인식 타임스탬프(상하이 시간)</p></li>
<li><p>간단한 4차원 벡터</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data_size = <span class="hljs-number">8193</span>

<span class="hljs-comment"># Get the Asia/Shanghai time zone using the pytz library</span>
<span class="hljs-comment"># You can use any valid IANA time zone identifier such as:</span>
<span class="hljs-comment">#   &quot;Asia/Tokyo&quot;, &quot;America/New_York&quot;, &quot;Europe/London&quot;, &quot;UTC&quot;, etc.</span>
<span class="hljs-comment"># To view all available values:</span>
<span class="hljs-comment">#   import pytz; print(pytz.all_timezones)</span>
<span class="hljs-comment"># Reference:</span>
<span class="hljs-comment">#   IANA database – https://www.iana.org/time-zones</span>
<span class="hljs-comment">#   Wikipedia – https://en.wikipedia.org/wiki/List_of_tz_database_time_zones</span>
shanghai_tz = pytz.timezone(<span class="hljs-string">&quot;Asia/Shanghai&quot;</span>)

data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i + <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;tsz&quot;</span>: shanghai_tz.localize(
            datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>) + datetime.timedelta(days=i)
        ).isoformat(),
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-built_in">float</span>(i) / <span class="hljs-number">10</span> <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">4</span>)],
    }
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(data_size)
]

client.insert(collection_name, data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data inserted successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Filtering-operations" class="common-anchor-header">3단계: 필터링 작업<button data-href="#Step-3-Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">TIMESTAMPTZ</code> 는 스칼라 비교, 간격 산술, 시간 구성 요소 추출을 지원합니다.</p>
<p><code translate="no">TIMESTAMPTZ</code> 필드에서 필터링 작업을 수행하려면 먼저 다음 사항을 확인하세요:</p>
<ul>
<li><p>각 벡터 필드에 인덱스를 만들었습니다.</p></li>
<li><p>컬렉션이 메모리에 로드되었습니다.</p></li>
</ul>
<p><details></p>
<p><summary>예제 코드 보기</summary></p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index on vector field</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vec&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;vec_index&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
client.create_index(collection_name, index_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Index created successfully.&quot;</span>)

<span class="hljs-comment"># Load the collection</span>
client.load_collection(collection_name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; loaded successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h4 id="Query-with-timestamp-filtering" class="common-anchor-header">타임스탬프 필터링으로 쿼리하기</h4><p><code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;=</code> 와 같은 산술 연산자를 사용합니다. Milvus에서 사용할 수 있는 산술 연산자의 전체 목록은 산술 <a href="/docs/ko/basic-operators.md#Arithmetic-Operators">연산자를</a> 참조하세요.</p>
<p>아래 예제는 타임스탬프(<code translate="no">tsz</code>)가 <strong>2025-01-03T00:00:00+08:00과</strong> 같지 않은 엔티티를 필터링합니다:</p>
<div class="multipleCode">
   <a href="#bash">cURL</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Query for entities where tsz is not equal to &#x27;2025-01-03T00:00:00+08:00&#x27;</span>
<span class="highlighted-wrapper-line"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;tsz != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span></span>

results = client.query(
    collection_name=collection_name,
    filter=<span class="hljs-built_in">expr</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
    <span class="hljs-built_in">limit</span>=10
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: &#x27;2024-12-31T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: &#x27;2025-01-01T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;tsz&#x27;: &#x27;2025-01-03T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 5, &#x27;tsz&#x27;: &#x27;2025-01-04T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 6, &#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 7, &#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 8, &#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 9, &#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 10, &#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 11, &#x27;tsz&#x27;: &#x27;2025-01-10T16:00:00Z&#x27;}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>위의 예제에서</p>
<ul>
<li><p><code translate="no">tsz</code> 는 스키마에 정의된 <code translate="no">TIMESTAMPTZ</code> 필드 이름입니다.</p></li>
<li><p><code translate="no">ISO '2025-01-03T00:00:00+08:00'</code> 는 시간대 오프셋을 포함한 <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> 형식의 타임스탬프 리터럴입니다.</p></li>
<li><p><code translate="no">!=</code> 는 필드 값을 해당 리터럴과 비교합니다. 기타 지원되는 연산자로는 <code translate="no">==</code>, <code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code>, <code translate="no">&gt;=</code> 등이 있습니다.</p></li>
</ul>
<h4 id="Interval-operations" class="common-anchor-header">간격 연산</h4><p><a href="https://en.wikipedia.org/wiki/ISO_8601#Durations">ISO 8601 기간 형식의</a> <strong>INTERVAL</strong> 값을 사용하여 <code translate="no">TIMESTAMPTZ</code> 필드에서 산술을 수행할 수 있습니다. 이를 통해 데이터를 필터링할 때 타임스탬프에서 일, 시간 또는 분과 같은 기간을 더하거나 뺄 수 있습니다.</p>
<p>예를 들어, 다음 쿼리는 타임스탬프(<code translate="no">tsz</code>)에 0일을 더한 값이 <strong>2025-01-03T00:00:00+08:00이</strong> <strong>아닌</strong> 엔티티를 필터링합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="highlighted-wrapper-line">expr = <span class="hljs-string">&quot;tsz + INTERVAL &#x27;P0D&#x27; != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span></span>

results = client.query(
    collection_name, 
    <span class="hljs-built_in">filter</span>=expr, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>], 
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: &#x27;2024-12-31T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: &#x27;2025-01-01T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;tsz&#x27;: &#x27;2025-01-03T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 5, &#x27;tsz&#x27;: &#x27;2025-01-04T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 6, &#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 7, &#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 8, &#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 9, &#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 10, &#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 11, &#x27;tsz&#x27;: &#x27;2025-01-10T16:00:00Z&#x27;}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">INTERVAL</code> 값은 <a href="https://www.w3.org/TR/xmlschema-2/#duration">ISO 8601 기간 구문을</a> 따릅니다. 예를 들어</p>
<ul>
<li><p><code translate="no">P1D</code> → 1일</p></li>
<li><p><code translate="no">PT3H</code> → 3시간</p></li>
<li><p><code translate="no">P2DT6H</code> → 2일 및 6시간</p></li>
</ul>
<p>다음과 같이 필터 표현식에 <code translate="no">INTERVAL</code> 산술을 직접 사용할 수 있습니다:</p>
<ul>
<li><p><code translate="no">tsz + INTERVAL 'P3D'</code> → 3일 더하기</p></li>
<li><p><code translate="no">tsz - INTERVAL 'PT2H'</code> → 2시간 빼기</p></li>
</ul>
</div>
<h4 id="Extract-timestamp-elements" class="common-anchor-header">타임스탬프 요소 추출</h4><p>쿼리 또는 검색에서 <code translate="no">time_fields</code> 매개변수를 사용하여 <code translate="no">TIMESTAMPTZ</code> 필드에서 연도, 월 또는 일과 같은 특정 구성 요소를 추출할 수 있습니다.</p>
<p>아래 예는 쿼리 결과의 각 <code translate="no">TIMESTAMPTZ</code> 필드에서 <code translate="no">year</code>, <code translate="no">month</code>, <code translate="no">day</code> 요소를 추출합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">results = client.query(
    collection_name,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &lt;= 10&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
<span class="highlighted-wrapper-line">    time_fields=<span class="hljs-string">&quot;year, month, day&quot;</span>,</span>
    limit=<span class="hljs-number">2</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: [2024, 12, 31]}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: [2025, 1, 1]}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>추출에 지원되는 요소</strong></p>
<table>
   <tr>
     <th><p>요소</p></th>
     <th><p>설명</p></th>
     <th><p>출력 예시</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">year</code></p></td>
     <td><p>연도 구성 요소</p></td>
     <td><p><code translate="no">2025</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">month</code></p></td>
     <td><p>월 번호</p></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">day</code></p></td>
     <td><p>월의 요일</p></td>
     <td><p><code translate="no">3</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hour</code></p></td>
     <td><p>시(0-23)</p></td>
     <td><p><code translate="no">14</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">minute</code></p></td>
     <td><p>분</p></td>
     <td><p><code translate="no">30</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">second</code></p></td>
     <td><p>초</p></td>
     <td><p><code translate="no">5</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">microsecond</code></p></td>
     <td><p>마이크로초</p></td>
     <td><p><code translate="no">123456</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>매개변수 <code translate="no">time_fields</code> 는 쉼표로 구분된 문자열입니다(예: <code translate="no">&quot;year, month, day&quot;</code>).</p></li>
<li><p>결과는 추출된 구성 요소의 배열로 반환됩니다(예: <code translate="no">[2024, 12, 31]</code>).</p></li>
</ul>
</div>
<h4 id="Search-with-timestamp-filtering" class="common-anchor-header">타임스탬프 필터링으로 검색하기</h4><p><code translate="no">TIMESTAMPTZ</code> 필터링과 벡터 유사도 검색을 결합하여 시간과 유사도 모두에 따라 결과 범위를 좁힐 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define a time-based filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;tsz &gt; ISO &#x27;2025-01-05T00:00:00+08:00&#x27;&quot;</span>

res = client.search(
    collection_name=collection_name,             <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]],                  <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                                      <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                                <span class="hljs-comment"># Filter expression using TIMESTAMPTZ</span></span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],  <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search result: &quot;</span>, res)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Search result:  data: [[{&#x27;id&#x27;: 10, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;, &#x27;id&#x27;: 10}}, {&#x27;id&#x27;: 9, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;, &#x27;id&#x27;: 9}}, {&#x27;id&#x27;: 8, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;, &#x27;id&#x27;: 8}}, {&#x27;id&#x27;: 7, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;, &#x27;id&#x27;: 7}}, {&#x27;id&#x27;: 6, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;, &#x27;id&#x27;: 6}}]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>컬렉션에 두 개 이상의 벡터 필드가 있는 경우 타임스탬프 필터링을 사용하여 하이브리드 검색 작업을 수행할 수 있습니다. 자세한 내용은 <a href="/docs/ko/multi-vector-search.md">다중 벡터 하이브리드 검색을</a> 참조하세요.</p>
</div>
<h2 id="Advanced-usage" class="common-anchor-header">고급 사용법<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><p>고급 사용의 경우 다양한 수준(예: 데이터베이스, 컬렉션, 쿼리)에서 시간대를 관리하거나 인덱스를 사용하여 <code translate="no">TIMESTAMPTZ</code> 필드에 대한 쿼리를 가속화할 수 있습니다.</p>
<h3 id="Manage-time-zones-at-different-levels" class="common-anchor-header">다양한 수준에서 시간대 관리<button data-href="#Manage-time-zones-at-different-levels" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>데이터베이스</strong>, <strong>컬렉션</strong> 또는 <strong>쿼리/검색</strong> 수준에서 <code translate="no">TIMESTAMPTZ</code> 필드의 표준 시간대를 제어할 수 있습니다.</p>
<table>
   <tr>
     <th><p>수준</p></th>
     <th><p>매개변수</p></th>
     <th><p>범위</p></th>
     <th><p>우선순위</p></th>
   </tr>
   <tr>
     <td><p>데이터베이스</p></td>
     <td><p><code translate="no">database.timezone</code></p></td>
     <td><p>데이터베이스의 모든 컬렉션에 대한 기본값</p></td>
     <td><p>최저</p></td>
   </tr>
   <tr>
     <td><p>컬렉션</p></td>
     <td><p><code translate="no">collection.timezone</code></p></td>
     <td><p>해당 컬렉션의 데이터베이스 기본 표준 시간대 설정을 재정의합니다.</p></td>
     <td><p>중간</p></td>
   </tr>
   <tr>
     <td><p>쿼리/검색/하이브리드 검색</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>하나의 특정 작업에 대한 임시 재정의</p></td>
     <td><p>최고</p></td>
   </tr>
</table>
<p>단계별 지침 및 코드 샘플은 전용 페이지를 참조하세요:</p>
<ul>
<li><p><a href="/docs/ko/modify-collection.md#Example-6-Set-collection-time-zone">컬렉션 수정</a></p></li>
<li><p><a href="/docs/ko/manage_databases.md#Manage-database-properties">데이터베이스</a></p></li>
<li><p><a href="/docs/ko/get-and-scalar-query.md#Temporarily-set-a-timezone-for-a-query">쿼리</a></p></li>
<li><p><a href="/docs/ko/single-vector-search.md#Temporarily-set-a-timezone-for-a-search">기본 벡터 검색</a></p></li>
<li><p><a href="/docs/ko/multi-vector-search.md">다중 벡터 하이브리드 검색</a></p></li>
</ul>
<h3 id="Accelerate-queries" class="common-anchor-header">쿼리 가속화<button data-href="#Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>기본적으로 인덱스가 없는 <code translate="no">TIMESTAMPTZ</code> 필드에 대한 쿼리는 모든 행에 대한 전체 스캔을 수행하므로 대규모 데이터 세트에서는 속도가 느려질 수 있습니다. 타임스탬프 쿼리를 가속화하려면 <code translate="no">TIMESTAMPTZ</code> 필드에 <code translate="no">STL_SORT</code> 인덱스를 생성하세요.</p>
<p>자세한 내용은 <a href="https://zilliverse.feishu.cn/wiki/YBYmwvx68iMKFRknytJccwk0nPf">STL_SORT를</a> 참조하세요.</p>
