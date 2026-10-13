---
id: membership-match.md
title: 멤버십 매치Compatible with Milvus v3.0.2+
summary: >-
  컴팩트 블룸 필터(compact Bloom filters) 또는 정확한 로어링 비트맵(exact Roaring bitmaps)을 사용하여
  대규모 멤버 집합을 기준으로 엔티티를 필터링하며, 여기에는 구문, SDK 요청 패턴, 삭제 세미오틱스 및 운영 제한 사항이 포함됩니다.
beta: Milvus v3.0.2+
---
<h1 id="Membership-Match" class="common-anchor-header">멤버십 매치<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v3.0.2+</span><button data-href="#Membership-Match" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>멤버십 매치는 스칼라 필드 값이 호출자가 제공한 집합에 속하는지 여부를 검사하여 엔티티를 필터링합니다. 클라이언트는 간결한 이진 멤버십 필터 블롭을 생성하여 이를 표현식 템플릿 값으로 전달합니다.</p>
<p>이는 대용량 <code translate="no">IN [...]</code> 목록을 대체합니다. <code translate="no">IN</code> 필터는 모든 멤버를 요청에 직렬화하므로, 멤버 집합이 충분히 크면 프록시의 gRPC 수신 한도를 초과할 수 있습니다. <code translate="no">membership_match</code> 를 사용하면 프록시가 블롭을 검증하고 멤버 목록을 재구성하지 않고 쿼리 계획에 포함시킵니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/membership-match-workflow.jpg" alt="Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it." class="doc-image" id="membership-match-workflow:-the-client-builds-a-reusable-blob,-the-proxy-validates-it,-and-querynodes-evaluate-it." /> 
   <span>멤버십 매치 워크플로: 클라이언트가 재사용 가능한 blob을 생성하고, 프록시가 이를 검증하며, QueryNodes가 이를 평가합니다.</span>
  
 </span></p>
<p>이 다이어그램은 고정된 업무 분담을 보여줍니다. 클라이언트는 블롭을 한 번 생성하여 여러 요청에 걸쳐 재사용하고, 프록시는 엔벨로프와 크기 제한을 검증한 후 블롭을 쿼리 계획에 그대로 포함시키며, QueryNodes는 원시 데이터나 인덱스를 기준으로 해당 계획을 평가합니다.</p>
<p>이 연산자는 정확도 보장 수준이 서로 다른 두 가지 인코딩 방식을 제공합니다:</p>
<ul>
<li><strong>블룸</strong> (<code translate="no">type=bloom</code>): 근사적 멤버십. 오탐(false positive)이 발생할 수 있으나, 유효한 필터의 경우 오탐지(false negative)는 발생하지 않을 것으로 예상됩니다. 대표적인 용도: 가끔 발생하는 오탐이 허용되는 대용량 대상 그룹 또는 제외 필터.</li>
<li><strong>Roaring</strong> (<code translate="no">type=roaring</code>): 정수 값에 대한 정확한 멤버십. 일반적인 용도: ACL, 테넌트 가시성, 규정 준수 필터 및 ID 집합별 삭제 작업.</li>
</ul>
<p>승인 결정이나 데이터 삭제와 같은 파괴적 작업에는 <strong>블룸(Bloom</strong> ) 멤버십을 사용하지 마십시오. 오탐이 발생하면 의도된 집합에 속하지 않는 엔티티가 노출되거나 삭제될 수 있습니다.</p>
<h3 id="Operational-checklist" class="common-anchor-header">운영 체크리스트<button data-href="#Operational-checklist" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>대상 필드 유형을 확인하고 동일한 값 도메인을 기반으로 BLOB을 생성하십시오.</li>
<li>오탐이 허용되는 경우에만 블룸을 선택하십시오.</li>
<li>ACL, 규정 준수, 테넌트 격리 및 삭제 작업의 경우 Roaring을 선택하십시오.</li>
<li>대용량 BLOB은 한 번 생성하여 재사용하고, 매 요청마다 다시 생성하지 마십시오.</li>
<li>BLOB 크기는 멤버 수가 아닌 직렬화된 바이트 단위로 산정하십시오.</li>
<li>버전이 혼합된 클러스터에서는 롤링 업그레이드를 완료하고(프록시부터 먼저), 그 후에 ' <code translate="no">membership_match</code>'을 활성화하십시오.</li>
<li>파괴적인 워크플로를 활성화하기 전에 비프로덕션 컬렉션에서 표현식을 테스트하십시오.</li>
</ul>
<h2 id="Expression-syntax" class="common-anchor-header">표현식 구문<button data-href="#Expression-syntax" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
membership_match(&lt;field&gt;, {&lt;template&gt;}, type=roaring)
membership_match(&lt;field&gt;, {&lt;template&gt;})
not membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
<button class="copy-code-btn"></button></code></pre>
<p>두 번째 인수는 템플릿 자리 표시자입니다. SDK는 클라이언트에서 생성한 필터 블롭을 포함하는 protobuf <code translate="no">bytes</code> 형식으로 자리 표시자 값을 제공합니다. 프로덕션 표현식에서는 <code translate="no">type</code> 를 명시적으로 유지하여 의도된 정확성 계약이 코드와 로그에 명확히 드러나도록 하십시오.</p>
<p><code translate="no">type</code> 인수는 선택 사항입니다. 모든 blob은 자체 설명형 매직 헤더(Bloom의 경우 <code translate="no">MBF1</code>, Roaring의 경우 <code translate="no">MRB1</code> )를 포함하며, <code translate="no">type</code> 가 생략되면 서버가 이 헤더를 감지합니다. blob 헤더와 충돌하는 명시적인 <code translate="no">type</code> 는 요청 오류로 거부되며, 알 수 없거나 잘린 헤더는 fail-closed 상태를 유발합니다.</p>
<h2 id="Choose-the-encoding" class="common-anchor-header">인코딩 선택<button data-href="#Choose-the-encoding" class="anchor-icon" translate="no">
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
    </button></h2><p>오탐(false positive)이 허용되는 경우 블룸(Bloom)을 사용하십시오. 블룸은 부호 있는 정수 필드(<strong>INT8/16/32/64</strong>), <strong>VARCHAR</strong> 필드 및 <strong>JSON</strong> 경로를 지원합니다. 블룸 필터는 정확한 허용 목록(allow-list)이 아닙니다.</p>
<p><code translate="no">fpr</code> (오탐률, false-positive rate)은 값이 삽입된 적이 없음에도 불구하고 블룸 필터가 해당 값을 멤버로 보고할 확률을 의미합니다. <code translate="no">fpr=0.005</code> 은 대략 200개 중 1개의 비멤버 값이 존재하는 것으로 잘못 보고된다는 것을 의미합니다. fpr이 낮을수록 블롭 크기는 커집니다.</p>
<p>모든 일치가 정확해야 할 때는 <strong>Roaring을</strong> 사용하십시오. <strong>Roaring은</strong> 부호 있는 정수 필드만 허용하며, 시리얼라이제이션 전에 멤버의 부호가 <strong>INT64로</strong> 확장되므로 INT8의 -1과 INT64의 -1은 동일한 멤버로 간주됩니다. UUID나 기타 문자열 필드에는 사용하지 마십시오.</p>
<table>
<thead>
<tr><th>차원</th><th>블룸(type=bloom)</th><th>Roaring (type=roaring)</th></tr>
</thead>
<tbody>
<tr><td>정밀도</td><td>근사; 오탐지 가능성 있음; 누락 없음</td><td>정확함; 오탐 없음, 누락 없음</td></tr>
<tr><td>필드</td><td>INT8/16/32/64, VARCHAR, JSON 경로</td><td>부호 있는 INT8/16/32/64만</td></tr>
<tr><td>BLOB 크기</td><td>멤버 수 및 FPR; FPR 0.005일 때 멤버당 약 11비트; 2의 거듭제곱 크기</td><td>값 분포; 밀집된 집합은 훨씬 더 작은 크기로 압축됨; 무작위 64비트 값은 262,144라는 컨테이너 상한에 도달함</td></tr>
<tr><td>삭제</td><td>구문 분석 시 거부됨</td><td>허용됨</td></tr>
<tr><td>일반적인 사용</td><td>대상 및 제외 필터</td><td>ACL, 규정 준수, 테넌트 격리, ID 집합별 삭제</td></tr>
</tbody>
</table>
<p><strong>JSON</strong> 경로는 행별로 엄격한 유형을 따릅니다. <strong>JSON</strong> 문자열은 <strong>VARCHAR</strong> 값으로, <strong>JSON</strong> 정수는 <strong>INT64</strong> 값으로 처리되며, <strong>JSON</strong> double은 정수 멤버와 일치하지 않습니다. 이는 5.0이 5와 동일한 것으로 간주되는 정확한 <code translate="no">IN</code> 와는 다릅니다. 라이터가 정수를 부동 소수점 형식으로 인코딩하는 경우, 쓰기 시 정규화하거나 유형이 지정된 스칼라 필드를 사용하십시오.</p>
<p>두 인코딩 방식 모두 대상 필드와 동일한 값 도메인에서 멤버 세트를 구성하십시오. 문자열 <code translate="no">&quot;10086&quot;</code> 로 블룸 필터를 구축하여 <code translate="no">INT64</code> 필드에 적용하지 마십시오. blob 헤더는 삽입된 값 도메인을 기록하며, 도메인이 잘못된 blob은 프로キシ에 의해 아무 결과도 일치하지 않는 경우 조용히 처리되지 않고 매개변수 오류와 함께 거부됩니다. 각 쿼리마다 blob을 다시 구축하기보다는 요청 간에 구축된 blob을 재사용하십시오.</p>
<p>구성원이 수천 개 이하인 집합의 경우, 일반 <code translate="no">IN</code> 이 여전히 가장 간단한 옵션입니다. 서버는 <strong>IN</strong>, <strong>Bloom</strong>, <strong>Roaring 중에서</strong> 선택하지 않습니다. 인코딩 선택은 호출자의 책임입니다.</p>
<p>인코딩을 선택하려면:</p>
<ol>
<li>워크로드가 오탐(false positive)을 허용하는지 판단하십시오. 허용하지 않는다면 <strong>Bloom은</strong> 절대 선택지가 될 수 없습니다.</li>
<li>정확한 멤버십을 확인하려면 부호 있는 정수 필드와 함께 <strong>Roaring을</strong> 사용하십시오. 밀집되거나 클러스터화된 값은 가장 작은 블롭으로 압축됩니다.</li>
<li>크기 제한을 확인하십시오. 균일하게 무작위 생성된 64비트 값은 262,144개의 컨테이너 상한선이나 크기 제한을 초과할 수 있습니다. 이 경우, 요청 제한에 맞는 기존의 <strong>IN</strong> 목록을 사용하십시오.</li>
<li>정수가 아닌 필드에 대한 정확한 멤버십을 확인하려면 <strong>IN을</strong> 사용하십시오. 이러한 필드에 대한 정확한 멤버십 인코딩은 없습니다.</li>
</ol>
<p>RESTful HTTP API에서는 멤버십 일치(membership-match)를 사용할 수 없습니다. HTTP 표현식 템플릿 매개변수는 bool, number, string 및 array 값만 허용하며, blob에 대한 이진 <code translate="no">bytes</code> 유형은 없습니다. 멤버십 blob을 전달하려면 gRPC 기반 SDK를 사용하십시오.</p>
<h2 id="SDK-request-patterns" class="common-anchor-header">SDK 요청 패턴<button data-href="#SDK-request-patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 코드 예제는 멤버십 블롭을 생성하고 이를 필터 템플릿 매개변수로 전달하는 데 중점을 둡니다. 이 예제들은 컬렉션과 필드가 이미 존재하고 로드된 상태이며, SDK 클라이언트가 연결되어 있고, 쿼리 벡터, 멤버 목록 및 기타 참조 변수가 정의되어 있음을 전제로 합니다. 컬렉션 설정 및 전체 애플리케이션 스캐폴딩은 생략되었습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, build_bloom_filter, build_roaring_bitmap

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
bloom_blob = build_bloom_filter([<span class="hljs-string">&quot;creator-a&quot;</span>, <span class="hljs-string">&quot;creator-b&quot;</span>], fpr=<span class="hljs-number">0.005</span>)
client.search(collection_name=<span class="hljs-string">&quot;posts&quot;</span>, data=[query_vector], anns_field=<span class="hljs-string">&quot;embedding&quot;</span>, limit=<span class="hljs-number">10</span>,
              <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: bloom_blob})

roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.query(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>,
             filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob}, output_fields=[<span class="hljs-string">&quot;user_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bloomBlob, err := milvusclient.NewBloomFilterBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>}, fpr)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
search := milvusclient.NewSearchOption(<span class="hljs-string">&quot;posts&quot;</span>, topK, vectors).
    WithFilter(<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)

roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
query := milvusclient.NewQueryOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] bloomBlob = BloomFilterUtils.buildBloomFilter(userIds, BloomFilterUtils.DEFAULT_FPR);
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> QueryReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=bloom)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)).build();
<span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> bloomBlob = <span class="hljs-title function_">buildBloomFilter</span>(userIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(user_id, {members}, type=bloom)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: bloomBlob } });
<span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-with-Roaring" class="common-anchor-header">Roaring을 사용한 삭제<button data-href="#Delete-with-Roaring" class="anchor-icon" translate="no">
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
    </button></h2><p>외부 정수 ID 집합으로 선택된 엔티티를 삭제할 때는 정확한 <strong>Roaring</strong> 블롭을 사용하십시오. 삭제를 실행하기 전에 멤버 집합과 컬렉션 필드 유형을 검토하십시오. Bloom을 사용하지 마십시오. 근사 멤버십은 안전한 삭제 술어가 아니며, Bloom 형식은 구문 분석 시점에 Delete 표현식에서 거부됩니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python">roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.delete(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
_, err = client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithExpr(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> DeleteReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)).build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(id, {members}, type=roaring)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: roaringBlob } });
<button class="copy-code-btn"></button></code></pre>
<p>삭제 의미론은 정확한 3치 매칭을 따릅니다:</p>
<table>
<thead>
<tr><th>필드 값</th><th>membership_match(…)</th><th>not membership_match(…)</th></tr>
</thead>
<tbody>
<tr><td>NULL</td><td>일치 없음 (NULL)</td><td>일치 없음 (NULL)</td></tr>
<tr><td>구성원 집합 내</td><td>일치</td><td>일치 항목 없음</td></tr>
<tr><td>집합 외부</td><td>일치 없음</td><td>일치</td></tr>
</tbody>
</table>
<p>이 표는 행별로 해석하면 다음과 같습니다. <code translate="no">membership_match</code> 를 사용하는 Delete는 집합 내 엔티티를 제거하고, <code translate="no">not membership_match</code> 를 사용하는 Delete는 집합 외 엔티티를 제거하며, NULL 엔티티는 두 극성 모두에서 유지됩니다.</p>
<ul>
<li>NULL 필드 값을 가진 엔티티는 어느 극성에서도 절대 삭제되지 않습니다.</li>
<li>빈 비트맵은 아무것도 삭제하지 않습니다. <code translate="no">not membership_match(&lt;field&gt;, {&lt;empty&gt;}, type=roaring)</code> 는 NULL이 아닌 필드 값을 가진 모든 엔티티를 삭제하며, 이는 정확한 보충 집합으로, 설계상 큰 집합이 될 수 있습니다.</li>
<li><code translate="no">not membership_match</code> 이는 NULL이 아닌 엔티티에 대한 멤버 집합의 정확한 보충 집합이며, 근사치가 아닙니다.</li>
</ul>
<p>인덱스만 있고 원시 스칼라 데이터가 없는 씰된 세그먼트의 경우, 인덱스가 지원하는 경우 평가 시 제한된 역조회를 사용합니다. 원시 필드 데이터나 적격 인덱스를 모두 사용할 수 없는 경우, 요청은 필터링되지 않은 엔티티를 반환하는 대신 <code translate="no">FieldNotLoaded</code> 로 실패합니다.</p>
<h2 id="Operational-limits" class="common-anchor-header">운영상의 제한 사항<button data-href="#Operational-limits" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>설정</th><th>기본값</th><th>구성 가능</th><th>제한 대상</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">proxy.maxMembershipFilterSize</code></td><td>64 MiB</td><td><code translate="no">milvus.yaml</code> 프록시</td><td>하나의 BLOB 본문</td></tr>
<tr><td><code translate="no">proxy.maxMembershipFilterPlanSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> 프록시</td><td>요청당 집계</td></tr>
<tr><td><code translate="no">proxy.grpc.serverMaxRecvSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> 프록시</td><td>전체 요청</td></tr>
<tr><td>매우 높은 컨테이너 상한선</td><td>262,144</td><td>코드에서 수정됨</td><td>필터당</td></tr>
<tr><td>Roaring 디코딩된 메모리 추정값</td><td>64 MiB</td><td>코드에 고정</td><td>필터당</td></tr>
<tr><td>MBF1 형식 제한</td><td>128 MiB</td><td>코드에 고정됨</td><td>블롭 형식 상한</td></tr>
<tr><td>블룸 <code translate="no">fpr</code></td><td>0.005</td><td>클라이언트 빌더</td><td>오탐지 목표값</td></tr>
</tbody>
</table>
<p><code translate="no">proxy.*</code> 설정은 Milvus 서버 구성 항목입니다. 이 설정은 클러스터 운영자가 <code translate="no">milvus.yaml</code> 의 <code translate="no">proxy</code> 섹션에서 설정하며, 필터링 시 요청별 또는 표현식별로 조정할 수 없습니다. <strong>Roaring</strong> admissions 및 MBF1 형식 제한은 구현에서 고정되어 있으며 어디에서도 구성할 수 없습니다. ‘ <code translate="no">fpr</code> ’ 행은 클라이언트 측에서 제어할 수 있는 유일한 항목으로, 블롭이 생성될 때 0.0001에서 0.05 사이의 허용 범위 내에서 선택됩니다.</p>
<p>블롭 본문의 최대 용량은 기본 FPR에서 약 4,860만 개의 INT64 멤버를 수용할 수 있으며, 여기에 고정된 32바이트 엔벨로프 헤더가 추가됩니다. 요청 전체에 적용되는 할당량은 멤버십을 포함하는 플랜의 직렬화 크기 합계와 Roaring 필터의 예상 디코딩 크기 합계를 모두 포함하며, HybridSearch 하위 요청과 스코어러 필터가 이를 공유합니다. 블룸 본문은 2의 거듭제곱 크기를 가집니다. 즉, 멤버 수가 티어 경계를 약간 넘으면 블롭 크기가 두 배로 늘어나며, FPR을 약간 높이면 종종 바로 아래 티어에 맞출 수 있습니다. 프록시가 크기가 초과된 블룸 블롭을 거부할 경우, 오류 메시지에는 적합한 대체 블룸 표현식( <code translate="no">fpr</code> )이 제안됩니다.</p>
<ul>
<li>멤버십 표현식 결과는 요청 간에 캐시되지 않습니다.</li>
<li>버전이 혼합된 클러스터는 실패로 처리됩니다. 구버전 코드를 실행하는 쿼리 노드(QueryNodes)는 멤버십 계획 노드가 포함된 계획을 거부합니다. 먼저 프록시를 업그레이드한 다음, 오퍼레이터를 활성화하기 전에 롤링 업그레이드를 완료하십시오.</li>
<li>서버 로그는 블롭 바이트를 편집합니다. 표현식 텍스트에는 템플릿 이름만 포함되며, 바이너리 페이로드는 템플릿 값을 통해 대역 외로 전송됩니다.</li>
</ul>
