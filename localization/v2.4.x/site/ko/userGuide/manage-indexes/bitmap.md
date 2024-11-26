---
id: bitmap.md
title: 비트맵
related_key: bitmap
summary: 비트맵 인덱싱은 카디널리티가 낮은 스칼라 필드에서 쿼리 성능을 개선하기 위해 고안된 효율적인 인덱싱 기법입니다.
---
<h1 id="BITMAP​" class="common-anchor-header">비트맵<button data-href="#BITMAP​" class="anchor-icon" translate="no">
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
    </button></h1><p>비트맵 인덱싱은 카디널리티가 낮은 스칼라 필드에서 쿼리 성능을 개선하기 위해 고안된 효율적인 인덱싱 기법입니다. 카디널리티는 필드에 있는 고유 값의 수를 나타냅니다. 고유 요소가 적은 필드는 카디널리티가 낮은 필드로 간주됩니다.</p>
<p>이 인덱스 유형은 필드 값을 간결한 이진 형식으로 표현하고 효율적인 비트 단위 연산을 수행하여 스칼라 쿼리의 검색 시간을 단축하는 데 도움이 됩니다. 다른 유형의 인덱스에 비해 비트맵 인덱스는 일반적으로 카디널리티가 낮은 필드를 처리할 때 공간 효율성이 높고 쿼리 속도가 빠릅니다.</p>
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
    </button></h2><p>비트맵이라는 용어는 두 단어를 결합한 것입니다: <strong>비트와</strong> <strong>맵입니다</strong>. 비트는 컴퓨터에서 가장 작은 데이터 단위를 나타내며, <strong>0</strong> 또는 <strong>1의</strong> 값만 저장할 수 있습니다. 여기서 맵은 0과 1에 어떤 값을 할당해야 하는지에 따라 데이터를 변환하고 구성하는 프로세스를 의미합니다.</p>
<p>비트맵 인덱스는 비트맵과 키라는 두 가지 주요 구성 요소로 이루어져 있습니다. 키는 인덱싱된 필드의 고유 값을 나타냅니다. 각 고유 값마다 해당 비트맵이 있습니다. 이러한 비트맵의 길이는 컬렉션의 레코드 수와 같습니다. 비트맵의 각 비트는 컬렉션의 레코드에 해당합니다. 레코드에서 인덱싱된 필드의 값이 키와 일치하면 해당 비트는 <strong>1로</strong> 설정되고, 그렇지 않으면 <strong>0으로</strong> 설정됩니다.</p>
<p><strong>Category</strong> 및 <strong>Public</strong> 필드가 있는 문서 컬렉션을 예로 들어 보겠습니다. <strong>기술</strong> 카테고리에 속하고 <strong>공개되어</strong> 있는 문서를 검색하려고 합니다. 이 경우 비트맵 인덱스의 키는 <strong>Tech와</strong> <strong>Public입니다</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bitmap.png" alt="Bitmap indexing" class="doc-image" id="bitmap-indexing" />
   </span> <span class="img-wrapper"> <span>비트맵 인덱싱</span> </span></p>
<p>그림에서 보는 바와 같이 <strong>Category</strong> 및 <strong>Public에</strong> 대한 비트맵 인덱스는 다음과 같습니다.</p>
<ul>
<li><p><strong>Tech</strong>: [1, 0, 1, 0, 0]이며, 이는 첫 번째와 세 번째 문서만 <strong>Tech</strong> 카테고리에 속한다는 것을 보여줍니다.</p></li>
<li><p><strong>Public</strong>: [1, 0, 0, 1, 0]은 1번째와 4번째 문서만 <strong>공개</strong> 문서에 해당됨을 나타냅니다.</p></li>
</ul>
<p>두 기준에 모두 일치하는 문서를 찾기 위해 이 두 비트맵에 대해 비트 단위 AND 연산을 수행합니다.</p>
<ul>
<li><strong>기술</strong> 및 <strong>공개</strong>: [1, 0, 0, 0, 0]</li>
</ul>
<p>결과 비트맵 [1, 0, 0, 0, 0, 0]은 첫 번째 문서<strong>(ID</strong> <strong>1</strong>)만이 두 기준을 모두 만족한다는 것을 나타냅니다. 비트맵 인덱스와 효율적인 비트 단위 연산을 사용하면 전체 데이터 세트를 스캔할 필요 없이 검색 범위를 빠르게 좁힐 수 있습니다.</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">비트맵 인덱스 만들기<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 비트맵 인덱스를 생성하려면 <code translate="no">create_index()</code> 방법을 사용하고 <code translate="no">index_type</code> 파라미터를 <code translate="no">&quot;BITMAP&quot;</code> 로 설정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed​</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created​</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created​</span>
)​
​
client.create_index(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name​</span>
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>이 예에서는 <code translate="no">my_collection</code> 컬렉션의 <code translate="no">category</code> 필드에 비트맵 인덱스를 생성합니다. <code translate="no">add_index()</code> 메서드는 필드 이름, 인덱스 유형 및 인덱스 이름을 지정하는 데 사용됩니다.</p>
<p>비트맵 인덱스가 생성되면 쿼리 작업에서 <code translate="no">filter</code> 매개변수를 사용하여 인덱싱된 필드를 기반으로 스칼라 필터링을 수행할 수 있습니다. 이렇게 하면 비트맵 인덱스를 사용하여 검색 결과의 범위를 효율적으로 좁힐 수 있습니다. 자세한 내용은 <ins>필터링을</ins> 참조하세요.</p>
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
<li><p>비트맵 인덱스는 기본 키가 아닌 스칼라 필드에 대해서만 지원됩니다.</p></li>
<li><p>필드의 데이터 유형은 다음 중 하나여야 합니다.</p>
<ul>
<li><p><code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (요소는 <code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code>) 중 하나여야 합니다.</p></li>
</ul></li>
<li><p>비트맵 인덱스는 다음 데이터 유형을 지원하지 않습니다.</p>
<ul>
<li><p><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>: 부동소수점 유형은 비트맵 인덱스의 이진 특성과 호환되지 않습니다.</p></li>
<li><p><code translate="no">JSON</code>: JSON 데이터 유형은 비트맵 인덱스를 사용하여 효율적으로 표현할 수 없는 복잡한 구조를 가지고 있습니다.</p></li>
</ul></li>
<li><p>비트맵 인덱스는 카디널리티가 높은 필드(즉, 고유값이 많은 필드)에는 적합하지 않습니다.</p>
<ul>
<li><p>일반적인 가이드라인으로, 비트맵 인덱스는 필드의 카디널리티가 500 미만일 때 가장 효과적입니다.</p></li>
<li><p>카디널리티가 이 임계값 이상으로 증가하면 비트맵 인덱스의 성능 이점이 줄어들고 스토리지 오버헤드가 크게 증가합니다.</p></li>
<li><p>카디널리티가 높은 필드의 경우, 특정 사용 사례와 쿼리 요구 사항에 따라 역 인덱스와 같은 대체 인덱싱 기술을 사용하는 것을 고려하세요.</p></li>
</ul></li>
</ul>
<h3 id="Structural-Similarity" class="common-anchor-header">구조적 유사성</h3><p>어떤 화학 구조가 더 큰 화학 구조의 일부로 존재하는 경우, 전자를 하부 구조라고 하고 후자를 상부 구조라고 합니다. 예를 들어 에탄올은 아세트산의 하부 구조이고 아세트산은 에탄올의 상부 구조입니다.</p>
<p>구조 유사성은 두 화학식이 서로 유사한지 여부를 판단하는 데 사용되며, 한 화학식이 다른 화학식의 상부 구조 또는 하부 구조인지 여부를 결정합니다.</p>
<p>A가 B의 상부 구조인지 확인하려면 다음 공식을 사용하세요:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>상부 구조</span> </span></p>
<p>여기서</p>
<ul>
<li>A는 검색하려는 화학식의 이진 표현입니다.</li>
<li>B는 데이터베이스에 있는 화학식의 이진 표현입니다.</li>
</ul>
<p><code translate="no">0</code> 이 반환되면 <strong>A는</strong> <strong>B의</strong> 상부 구조가 아닙니다. 그렇지 않으면 결과는 그 반대입니다.</p>
<p>A가 B의 하부 구조인지 확인하려면 다음 공식을 사용합니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>하부 구조</span> </span></p>
<p>여기서:</p>
<ul>
<li>A는 검색하려는 화학식의 이진 표현입니다.</li>
<li>B는 데이터베이스에 있는 화학식의 이진 표현입니다.</li>
</ul>
<p><code translate="no">0</code> 이 반환되면 <strong>A는</strong> <strong>B의</strong> 하위 구조가 아닙니다. 그렇지 않으면 결과는 그 반대입니다.</p>
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">메트릭 유형이 내적 곱인 경우 벡터 검색의 상위 1순위 결과가 검색 벡터 자체가 아닌 이유는 무엇인가요?</font></summary>거리 메트릭으로 내적 곱을 사용할 때 벡터를 정규화하지 않은 경우 이런 문제가 발생합니다.</details>
<details>
<summary><font color="#4fc4f9">정규화란 무엇인가요? 정규화가 필요한 이유는 무엇인가요?</font></summary></p>
<p>정규화란 임베딩(벡터)을 변환하는 과정을 통해 해당 벡터의 규범이 1이 되도록 변환하는 것을 말합니다. 내적 곱을 사용하여 임베딩 유사성을 계산하는 경우, 임베딩을 정규화해야 합니다. 정규화 후 내적 곱은 코사인 유사도와 같습니다.</p>
<p>
자세한 내용은 <a href="https://en.wikipedia.org/wiki/Unit_vector">위키백과를</a> 참조하세요.</p>
</details>
<details>
<summary><font color="#4fc4f9">거리 측정값으로 유클리드 거리(L2)와 내적 곱(IP)을 사용하면 왜 다른 결과가 나오나요?</font></summary>벡터가 정규화되었는지 확인하세요. 그렇지 않은 경우 먼저 벡터를 정규화해야 합니다. 이론적으로 벡터가 정규화되지 않은 경우 L2로 계산된 유사도는 IP로 계산된 유사도와 다릅니다.</details>
