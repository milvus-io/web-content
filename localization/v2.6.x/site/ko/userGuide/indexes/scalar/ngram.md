---
id: ngram.md
title: NGRAM
summary: >-
  Milvus의 NGRAM 인덱스는 VARCHAR 필드 또는 JSON 필드 내의 특정 JSON 경로에 대한 LIKE 쿼리를 가속화하기 위해
  구축되었습니다. 인덱스를 구축하기 전에 Milvus는 텍스트를 n-gram이라고 하는 고정된 길이 n의 짧고 겹치는 하위 문자열로
  분할합니다. 예를 들어, n = 3인 경우 "Milvus"라는 단어는 3그램으로 분할됩니다: "Mil", "ilv", "lvu",
  "vus". 그런 다음 이러한 n-그램은 각 그램을 해당 그램이 나타나는 문서 ID에 매핑하는 반전 인덱스에 저장됩니다. 쿼리 시 이
  인덱스를 통해 Milvus는 검색 범위를 작은 후보 집합으로 빠르게 좁힐 수 있으므로 쿼리 실행 속도가 훨씬 빨라집니다.
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
    </button></h1><p>Milvus의 <code translate="no">NGRAM</code> 인덱스는 <code translate="no">VARCHAR</code> 필드 또는 <code translate="no">JSON</code> 필드 내의 특정 JSON 경로에 대한 <code translate="no">LIKE</code> 쿼리를 가속화하기 위해 구축되었습니다. 인덱스를 구축하기 전에 Milvus는 텍스트를 <em>n-그램이라고</em> 하는 고정된 길이 <em>n의</em> 짧고 겹치는 하위 문자열로 분할합니다. 예를 들어, <em>n = 3이면</em> <em>"Milvus</em> "라는 단어는 3그램으로 분할됩니다: <em>"Mil",</em> <em>"ilv",</em> <em>"lvu</em>", <em>"vus"</em>. 그런 다음 이러한 n-그램은 각 그램을 해당 그램이 나타나는 문서 ID에 매핑하는 반전 인덱스에 저장됩니다. 쿼리 시 이 인덱스를 통해 Milvus는 검색 범위를 작은 후보 집합으로 빠르게 좁힐 수 있으므로 쿼리 실행 속도가 훨씬 빨라집니다.</p>
<p>다음과 같이 빠른 접두사, 접미사, 접미사 또는 와일드카드 필터링이 필요할 때 이 색인을 사용하세요:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
</ul>
<div class="alert note">
<p>필터 표현식 구문에 대한 자세한 내용은 <a href="/docs/ko/basic-operators.md#Range-operators">기본 연산자를</a> 참조하세요.</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">작동 방식<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 <code translate="no">NGRAM</code> 인덱스를 2단계 프로세스로 구현합니다:</p>
<ol>
<li><p><strong>인덱스를 구축합니다</strong>: 각 문서에 대해 n-그램을 생성하고 수집 중에 반전된 인덱스를 구축합니다.</p></li>
<li><p><strong>쿼리 가속화</strong>: 인덱스를 사용하여 작은 후보 집합으로 필터링한 다음 정확히 일치하는 것을 확인합니다.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">1단계: 색인 구축<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>데이터 수집 중에 Milvus는 두 가지 주요 단계를 수행하여 NGRAM 인덱스를 구축합니다:</p>
<ol>
<li><p><strong>텍스트를 N-그램으로 분해합니다</strong>: Milvus는 대상 필드의 각 문자열에 걸쳐 <em>n의</em> 창을 슬라이드하고 겹치는 하위 문자열, 즉 <em>n-그램을</em> 추출합니다. 이러한 하위 문자열의 길이는 구성 가능한 범위인 <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: 생성할 최단 n-그램입니다. 또한 인덱스를 활용할 수 있는 최소 쿼리 하위 문자열 길이를 정의합니다.</p></li>
<li><p><code translate="no">max_gram</code>: 생성할 가장 긴 n-그램. 쿼리 시에는 긴 쿼리 문자열을 분할할 때 최대 창 크기로도 사용됩니다.</p></li>
</ul>
<p>예를 들어 <code translate="no">min_gram=2</code> 와 <code translate="no">max_gram=3</code> 의 경우 <code translate="no">&quot;AI database&quot;</code> 문자열은 다음과 같이 분할됩니다:</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" />
   </span> <span class="img-wrapper"> <span>Ngram 인덱스 구축</span> </span></p>
<pre><code translate="no">- **2-grams:** `AI`, `I_`, `_d`, `da`, `at`, ...

- **3-grams:** `AI_`, `I_d`, `_da`, `dat`, `ata`, ...

&lt;div class=&quot;alert note&quot;&gt;

- For a range `[min_gram, max_gram]`, Milvus generates all n-grams for every length between the two values (inclusive). For example, with `[2,4]` and the word `&quot;text&quot;`, Milvus generates:

- **2-grams:** `te`, `ex`, `xt`

- **3-grams:** `tex`, `ext`

- **4-grams:** `text`

- N-gram decomposition is character-based and language-agnostic. For example, in Chinese, `&quot;向量数据库&quot;` with `min_gram = 2` is decomposed into: `&quot;向量&quot;`, `&quot;量数&quot;`, `&quot;数据&quot;`, `&quot;据库&quot;`.

- Spaces and punctuation are treated as characters during decomposition.

- Decomposition preserves original case, and matching is case-sensitive. For example, `&quot;Database&quot;` and `&quot;database&quot;` will generate different n-grams and require exact case matching during queries.

&lt;/div&gt;
</code></pre>
<ol>
<li><p><strong>역 인덱스를 구축</strong>합니다: 생성된 각 n-그램을 이를 포함하는 문서 ID 목록에 매핑하는 <strong>반전 인덱스가</strong> 생성됩니다.</p>
<p>예를 들어 2그램 <code translate="no">&quot;AI&quot;</code> 이 ID가 1, 5, 6, 8, 9인 문서에 나타나면 인덱스는 <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code> 을 기록합니다. 그런 다음 쿼리 시 이 인덱스를 사용하여 검색 범위를 빠르게 좁힙니다.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" />
   </span> <span class="img-wrapper"> <span>Ngram 색인 2 구축</span> </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
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
    </button></h3><p><code translate="no">LIKE</code> 필터가 실행되면 Milvus는 다음 단계에서 NGRAM 인덱스를 사용하여 쿼리를 가속화합니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" />
   </span> <span class="img-wrapper"> <span>쿼리 가속화</span> </span></p>
<ol>
<li><p><strong>쿼리 용어를 추출합니다:</strong> <code translate="no">LIKE</code> 표현식에서 와일드카드가 없는 연속된 하위 문자열을 추출합니다(예: <code translate="no">&quot;%database%&quot;</code> 은 <code translate="no">&quot;database&quot;</code> 이 됩니다).</p></li>
<li><p><strong>쿼리 용어를 분해합니다:</strong> 쿼리 용어는 길이(<code translate="no">L</code>)와 <code translate="no">min_gram</code> 및 <code translate="no">max_gram</code> 설정에 따라 <em>n-그램으로</em> 분해됩니다.</p>
<ul>
<li><p><code translate="no">L &lt; min_gram</code> 인 경우 인덱스를 사용할 수 없으며 쿼리는 전체 검색으로 돌아갑니다.</p></li>
<li><p><code translate="no">min_gram ≤ L ≤ max_gram</code> 인 경우 전체 쿼리 용어는 단일 n-그램으로 처리되며 더 이상 분해할 필요가 없습니다.</p></li>
<li><p><code translate="no">L &gt; max_gram</code> 인 경우 쿼리 용어는 <code translate="no">max_gram</code> 과 같은 창 크기를 사용하여 겹치는 그램으로 분해됩니다.</p></li>
</ul>
<p>예를 들어 <code translate="no">max_gram</code> 이 <code translate="no">3</code> 으로 설정되어 있고 쿼리 용어의 길이가 <strong>8</strong> 인 <code translate="no">&quot;database&quot;</code> 인 경우 <code translate="no">&quot;dat&quot;</code>, <code translate="no">&quot;ata&quot;</code>, <code translate="no">&quot;tab&quot;</code> 등과 같은 3 그램 하위 문자열로 분해됩니다.</p></li>
<li><p><strong>각 그램 찾기 및 교차</strong>: Milvus는 역 인덱스에서 각 쿼리 그램을 찾은 다음 결과 문서 ID 목록과 교차하여 작은 후보 문서 세트를 찾습니다. 이러한 후보 문서에는 쿼리의 모든 문형이 포함됩니다.</p></li>
<li><p><strong>결과를 확인하고 반환합니다:</strong> 그런 다음 원본 <code translate="no">LIKE</code> 필터를 작은 후보 집합에만 최종 검사로 적용하여 정확히 일치하는 것을 찾습니다.</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">NGRAM 색인 만들기<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">VARCHAR</code> 필드 또는 <code translate="no">JSON</code> 필드 내의 특정 경로에 NGRAM 인덱스를 만들 수 있습니다.</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">예 1: VARCHAR 필드에 생성하기<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">VARCHAR</code> 필드의 경우 <code translate="no">field_name</code> 을 지정하고 <code translate="no">min_gram</code> 및 <code translate="no">max_gram</code> 을 구성하기만 하면 됩니다.</p>
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
<p>이 구성은 <code translate="no">text</code> 의 각 문자열에 대해 2그램과 3그램을 생성하고 이를 반전된 인덱스에 저장합니다.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">예 2: JSON 경로에 생성하기<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">JSON</code> 필드의 경우 그램 설정 외에도 해당 필드를 가리키는</p>
<ul>
<li><p><code translate="no">params.json_path</code> - 색인하려는 값을 가리키는 JSON 경로.</p></li>
<li><p><code translate="no">params.json_cast_type</code> - NGRAM 인덱싱은 문자열에서 작동하므로 <code translate="no">&quot;varchar&quot;</code> (대소문자를 구분하지 않음)이어야 합니다.</p></li>
</ul>
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
<p>이 예제에서는</p>
<ul>
<li><p><code translate="no">json_field[&quot;body&quot;]</code> 의 값만 색인됩니다.</p></li>
<li><p>이 값은 n-gram 토큰화 전에 <code translate="no">VARCHAR</code> 로 캐스팅됩니다.</p></li>
<li><p>Milvus는 길이 2~4의 하위 문자열을 생성하고 이를 반전된 인덱스에 저장합니다.</p></li>
</ul>
<p>JSON 필드를 색인하는 방법에 대한 자세한 내용은 <a href="/docs/ko/json-indexing.md">JSON 색인하기를</a> 참조하세요.</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">NGRAM으로 가속화된 쿼리<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>NGRAM 인덱스를 적용하려면:</p>
<ul>
<li><p>쿼리는 <code translate="no">NGRAM</code> 인덱스가 있는 <code translate="no">VARCHAR</code> 필드(또는 JSON 경로)를 대상으로 해야 합니다.</p></li>
<li><p><code translate="no">LIKE</code> 패턴의 리터럴 부분은 <code translate="no">min_gram</code> 문자 이상이어야 합니다.<em>(예를 들어 예상되는 최단 쿼리 용어가 2자인 경우 인덱스를 만들 때 min_gram=2로 설정합니다.)</em></p></li>
</ul>
<p>지원되는 쿼리 유형:</p>
<ul>
<li><p><strong>접두사 일치</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>접미사 일치</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>접미사 일치</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>와일드카드 일치</strong></p>
<p>Milvus는 <code translate="no">%</code> (0자 이상)와 <code translate="no">_</code> (정확히 한 글자)를 모두 지원합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSON 경로 쿼리</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>필터 표현식 구문에 대한 자세한 내용은 <a href="/docs/ko/basic-operators.md">기본 연산자를</a> 참조하세요.</p>
<h2 id="Drop-an-index" class="common-anchor-header">색인 삭제<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션에서 기존 인덱스를 제거하려면 <code translate="no">drop_index()</code> 메서드를 사용합니다.</p>
<div class="alert note">
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">사용 참고 사항<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>필드 유형</strong>: <code translate="no">VARCHAR</code> 및 <code translate="no">JSON</code> 필드에서 지원됩니다. JSON의 경우 <code translate="no">params.json_path</code> 와 <code translate="no">params.json_cast_type=&quot;varchar&quot;</code> 을 모두 제공하세요.</p></li>
<li><p><strong>유니코드</strong>: NGRAM 분해는 문자 기반이며 언어에 구애받지 않고 공백과 구두점을 포함합니다.</p></li>
<li><p><strong>시공간 균형</strong>: 더 넓은 그램 범위( <code translate="no">[min_gram, max_gram]</code> )는 더 많은 그램과 더 큰 인덱스를 생성합니다. 메모리가 부족하다면 큰 글 목록에 대해 <code translate="no">mmap</code> 모드를 고려하세요. 자세한 내용은 <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">mmap 사용을</a> 참조하세요.</p></li>
<li><p><strong>불변성</strong>: <code translate="no">min_gram</code> 및 <code translate="no">max_gram</code> 은 제자리에서 변경할 수 없으며 인덱스를 다시 작성하여 조정해야 합니다.</p></li>
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
<li><p><strong>검색 동작에 맞게 최소 그램 및 최대 그램을 선택합니다.</strong></p>
<ul>
<li><p><code translate="no">min_gram=2</code>, <code translate="no">max_gram=3</code> 로 시작합니다.</p></li>
<li><p><code translate="no">min_gram</code> 을 사용자가 입력할 것으로 예상되는 가장 짧은 리터럴로 설정합니다.</p></li>
<li><p>의미 있는 하위 문자열의 일반적인 길이에 가까운 <code translate="no">max_gram</code> 을 설정하고, <code translate="no">max_gram</code> 을 크게 설정하면 필터링이 향상되지만 공간이 늘어납니다.</p></li>
</ul></li>
<li><p><strong>선택성이 낮은 그램 피하기</strong></p>
<p>매우 반복적인 패턴(예: <code translate="no">&quot;aaaaaa&quot;</code>)은 필터링이 약하고 이득이 제한적일 수 있습니다.</p></li>
<li><p><strong>일관된 정규화</strong></p>
<p>사용 사례에 필요한 경우 수집된 텍스트와 쿼리 리터럴에 동일한 정규화(예: 소문자, 트리밍)를 적용하세요.</p></li>
</ul>
