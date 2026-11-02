---
id: milvus_lite.md
summary: 'Milvus Lite를 설치하고, 데이터베이스 경로를 고정하여 로컬 벡터 검색을 실행합니다.'
title: Milvus Lite를 로컬에서 실행하기
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">Milvus Lite를 로컬에서 실행하기<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에서는 Milvus Lite를 사용하여 로컬 벡터 검색을 실행하는 방법을 설명합니다. 여기에는 설치, 데이터 저장, 필터링, 그리고 다른 Milvus 배포 환경으로 데이터를 내보내는 방법이 포함됩니다.</p>
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
    </button></h2><p>Milvus Lite는 <a href="https://github.com/milvus-io/pymilvus">Milvus Python SDK를</a> 위한 경량 로컬 백엔드입니다. 선택 사항인 ` <code translate="no">milvus-lite</code> ` 추가 구성 요소를 함께 설치해야 합니다. 아래에서 사용하는 SDK 버전에서는 ` <code translate="no">pymilvus</code> `만 설치하는 것만으로는 이 백엔드가 설치되지 않습니다.</p>
<p>Milvus Lite는 다음과 같은 환경에서의 로컬 개발 및 소규모 워크로드에 적합합니다.</p>
<ul>
<li>Jupyter Notebook 또는 Google Colab</li>
<li>노트북</li>
<li>호환되는 Python 종속성을 갖춘 엣지 디바이스</li>
</ul>
<p>Milvus Lite는 벡터 데이터 영속화, 삽입 및 삭제, 벡터 검색, 메타데이터 필터링 등 지원되는 작업에 대해 <code translate="no">MilvusClient</code> API를 사용합니다. 지원되는 애플리케이션 워크플로를 원격 배포 환경으로 이전하려면 연결 URI와 자격 증명을 변경하고, 지원되는 기능의 차이점을 확인하십시오. 대규모 프로덕션 워크로드의 경우 <a href="/docs/ko/install-overview.md">Milvus Standalone 또는 Distributed를</a> 사용하거나, <a href="https://zilliz.com/cloud">Zilliz Cloud</a>의 완전 관리형 Milvus를 사용하십시오.</p>
<h2 id="Prerequisites" class="common-anchor-header">필수 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>이 가이드에서는 PyMilvus <strong>3.0.2</strong> 와 Milvus Lite <strong>3.2.2를</strong> 사용합니다. 다음 환경을 준비하십시오.</p>
<ul>
<li>Python 3.10 이상. 로컬 Lite 백엔드는 원격 PyMilvus 클라이언트보다 더 높은 최소 Python 버전을 요구합니다.</li>
<li>macOS, Linux 또는 Windows이며, <code translate="no">faiss-cpu</code> 및 <code translate="no">pyarrow</code> 와 같은 종속성에 대한 호환 가능한 휠(wheel)이 설치되어 있어야 합니다. Milvus Lite 3.2.2는 순수 Python 패키지이므로, 운영 체제와 아키텍처는 Lite 패키지 자체가 아닌 해당 종속성을 충족해야 합니다.</li>
<li>데이터베이스 저장을 위한 쓰기 가능한 로컬 디렉터리.</li>
</ul>
<p>Windows에서 pip는 플랫폼 마커로 인해 PyMilvus 3.0.2의 <code translate="no">milvus-lite</code> 추가 항목을 건너뛰므로, <code translate="no">milvus-lite</code> 를 명시적으로 지정해야 합니다. 아래의 설치 명령어는 이미 이를 반영하고 있습니다. 다른 패키지 및 플랫폼 조합에 대해서는 <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#requirements">Milvus Lite 릴리스 요구</a> 사항을 참조하십시오.</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">Milvus Lite 설정<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>격리된 Python 환경을 생성하고 두 패키지를 모두 설치합니다:</p>
<pre><code translate="no" class="language-bash">python3 -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate
python -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>zsh와 같은 셸이 괄호를 해석하지 않도록 extras 표현식을 따옴표로 묶으십시오. Windows PowerShell에서는 <code translate="no">source .venv/bin/activate</code> 대신 <code translate="no">.venv\Scripts\Activate.ps1</code> 를 사용하여 환경을 활성화하십시오. 버전을 명시적으로 지정하면 SDK와 로컬 백엔드가 이 가이드와 일치하도록 유지됩니다.</p>
<div class="alert note">
<blockquote>
<p>Milvus Lite 3.x는 기존 2.x 패키지와 다른 스토리지 엔진을 사용합니다. 기존 2.x <code translate="no">.db</code> 파일을 그대로 열 수 없습니다. 기존 데이터베이스와 이를 열 수 있는 환경을 유지한 상태에서, 해당 데이터베이스의 데이터를 내보낸 다음 새 데이터베이스로 가져오십시오. 새 패키지를 설치한다고 해서 기존 저장 형식이 마이그레이션되지는 않습니다. <a href="#Migrating-data-from-Milvus-Lite">‘Milvus Lite에서 데이터 마이그레이션’을</a> 참조하십시오.</p>
</blockquote>
</div>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">Milvus Lite에 연결하기<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">MilvusClient</code> 에 <code translate="no">.db</code> 로 끝나는 로컬 경로를 전달하십시오:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus Lite 3.2.2의 경우, 이렇게 하면 작업 디렉터리에 <strong>milvus_demo.db 디렉터리가</strong> 생성됩니다. 이 디렉터리에는 데이터베이스의 저장 파일이 포함되어 있으며, <code translate="no">.db</code> 접미사가 붙어 있다고 해서 이것이 단일 휴대용 파일임을 의미하지는 않습니다. 클라이언트를 닫거나 애플리케이션을 다시 시작한 후에도 동일한 경로를 사용하여 데이터베이스를 다시 열 수 있습니다.</p>
<p>새 데이터베이스를 생성할 때는 다른 경로를 사용하십시오. 대신 원격 Milvus 서버에 연결하려면 해당 엔드포인트와 인증 정보를 전달하십시오:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;username:password&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-a-local-search-example" class="common-anchor-header">로컬 검색 예제 실행<button data-href="#Run-a-local-search-example" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예제는 생성된 벡터를 사용한 API 워크플로를 보여줍니다. 이 벡터들은 텍스트의 의미를 인코딩하지 않으므로, 시맨틱 검색을 구축할 때는 임베딩 모델을 사용하십시오. 새로운 데이터베이스 경로에서 예제를 실행하거나, 다시 실행하기 전에 기존 <code translate="no">demo_collection</code> 파일을 삭제하십시오.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors in this example have 384 dimensions.</span>
)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># Generate reproducible example vectors, not semantic embeddings.</span>
rng = np.random.default_rng(<span class="hljs-number">7</span>)
vectors = rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, size=(<span class="hljs-built_in">len</span>(docs), <span class="hljs-number">384</span>)).tolist()
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]
res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Search only records whose subject is &quot;history&quot;.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Retrieve all records that match the scalar filter, without vector ranking.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete one record and keep the others for the export example below.</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(res)
client.close()
<button class="copy-code-btn"></button></code></pre>
<p>텍스트에서 임베딩을 생성하는 애플리케이션의 경우, <a href="/docs/ko/quickstart.md">‘빠른</a> 시작’으로 진행하십시오. 또한 RAG, 이미지 검색 및 프레임워크 통합에 대한 <a href="https://github.com/milvus-io/bootcamp">Milvus Bootcamp 예제를</a> 살펴볼 수도 있습니다.</p>
<h2 id="Supported-features-and-limits" class="common-anchor-header">지원되는 기능 및 제한 사항<button data-href="#Supported-features-and-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 3.2.2는 로컬 PyMilvus 어댑터를 통해 Milvus 작업의 일부를 구현합니다. <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">버전별 기능 참조</a> 문서에는 다음과 같은 기능이 설명되어 있습니다:</p>
<table>
<thead>
<tr><th>영역</th><th>이 Lite 버전에서의 지원 현황</th></tr>
</thead>
<tbody>
<tr><td>밀집 및 희소 벡터</td><td><code translate="no">FLOAT_VECTOR</code> 및 <code translate="no">SPARSE_FLOAT_VECTOR</code></td></tr>
<tr><td>벡터 인덱스</td><td><code translate="no">FLAT</code>, <code translate="no">BRUTE_FORCE</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, 그리고 <code translate="no">AUTOINDEX</code></td></tr>
<tr><td>스칼라 및 스파스 인덱스</td><td><code translate="no">INVERTED</code> 스칼라 인덱스 및 <code translate="no">SPARSE_INVERTED_INDEX</code></td></tr>
<tr><td>데이터 연산</td><td>삽입, 업서트, 가져오기, 쿼리, 벡터 검색 및 삭제</td></tr>
<tr><td>검색</td><td>밀집 및 스파스 검색, 메타데이터 필터, 다중 벡터 필드 및 하이브리드 검색</td></tr>
<tr><td>컬렉션 구성</td><td>로컬 어댑터에서 지원하는 작업 범위 내의 컬렉션, 명명된 데이터베이스, 별칭 및 파티션</td></tr>
</tbody>
</table>
<p>이 버전은 <code translate="no">FLAT</code> 인덱스에 국한되지 않습니다. 인덱스의 사용 가능 여부와 동작은 Lite 버전에 따라 다르므로, 원래 2.x 백엔드의 제한 사항을 3.x 엔진에 적용하지 마십시오.</p>
<p>애플리케이션에 Lite를 선택하기 전에 다음 제한 사항을 검토하십시오:</p>
<ul>
<li>한 번에 하나의 프로세스만 데이터베이스 저장소 디렉터리를 소유할 수 있습니다. 엔진은 파일 잠금을 통해 디렉터리를 보호합니다.</li>
<li>동일한 컬렉션에 대한 쓰기 작업은 순차적으로 수행해야 합니다. 동시 쓰기는 안전하게 지원되지 않습니다.</li>
<li>로컬 어댑터는 모든 Milvus RPC를 구현하지 않습니다. 지원되지 않는 작업은 ` <code translate="no">UNIMPLEMENTED</code>`를 반환하며, 스키마 변경 및 파티션 수준 로딩 또는 해제 기능은 사용할 수 없습니다.</li>
<li>인증, 사용자, 역할, RBAC 및 TLS는 지원되지 않습니다. 로컬 서버를 신뢰할 수 없는 네트워크에 노출하지 마십시오.</li>
<li>Binary, float16, bfloat16, int8 벡터 필드 및 Product Quantization 인덱스는 지원되지 않습니다.</li>
<li>Lite는 로컬 워크로드를 위해 설계되었습니다. 로컬 API 호환성은 분산 확장성이나 원격 배포의 프로덕션 격리 및 가용성을 제공하지 않습니다.</li>
</ul>
<p>로컬 예제에서 실행되지 않는 서버 기능을 사용하기 전에, <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#known-limitations">버전이 지정된 알려진 제한</a> 사항을 확인하십시오.</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">Milvus Lite에서 데이터 마이그레이션<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">milvus-lite dump</code> 를 사용하여 컬렉션을 Milvus BulkWriter JSON 파일로 내보내십시오. 이 파일들은 자체 호스팅 Milvus 배포 환경이나 Zilliz Cloud로 가져올 수 있습니다.</p>
<p>소스 데이터베이스를 여는 환경에 SDK의 벌크 라이터 종속성을 설치하십시오:</p>
<pre><code translate="no" class="language-bash">python -m pip install <span class="hljs-string">&quot;pymilvus[bulk_writer]==3.0.2&quot;</span>
milvus-lite dump -h
<button class="copy-code-btn"></button></code></pre>
<p>다른 프로세스에서 명령을 실행하기 전에 로컬 데이터베이스를 소유한 Python 애플리케이션을 종료하십시오. 앞선 예제의 컬렉션을 내보내려면:</p>
<pre><code translate="no" class="language-bash">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<button class="copy-code-btn"></button></code></pre>
<p>이 명령어는 <strong>milvus_demo.db 저장소 디렉터리에서</strong> <code translate="no">demo_collection</code> <strong>파일을</strong> 읽어와 <strong>data_dir</strong> 아래에 내보내기 파일을 작성합니다. <a href="/docs/ko/import-data.md">Bulk Insert</a> 또는 <a href="https://docs.zilliz.com/docs/data-import">Zilliz Cloud Data Import를</a> 사용하여 해당 파일을 가져오십시오.</p>
<div class="alert note">
<blockquote>
<p>원본 2.x 데이터베이스 파일을 내보내려면, 해당 파일을 열 수 있는 원본 Lite 버전이 설치된 환경에서 덤프 도구를 실행하십시오. 3.x 덤프 도구는 파일을 직접 열어 기존 저장 형식을 변환하지 않습니다. 가져온 행 수와 검색 결과를 확인할 때까지 소스 데이터베이스를 보존하십시오.</p>
</blockquote>
</div>
<p>지원되는 덤프 옵션 및 저장소 형식 제한 사항에 대해서는 <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">Milvus Lite 내보내기 참조</a> 문서를 참조하십시오.</p>
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
    </button></h2><p>다음 작업을 진행하십시오:</p>
<ul>
<li><a href="/docs/ko/quickstart.md">빠른 시작</a>: 임베딩 생성 및 검색 워크플로우 실행.</li>
<li><a href="/docs/ko/single-vector-search.md">단일 벡터 검색</a> 및 <a href="/docs/ko/multi-vector-search.md">하이브리드 검색</a>: 애플리케이션에 맞는 쿼리를 설계합니다.</li>
<li><a href="/docs/ko/install-overview.md">배포 방식 선택</a>: 로컬 개발 단계를 넘어섭니다.</li>
<li><a href="https://github.com/zilliztech/attu">Attu</a>: 원격 배포를 위한 Milvus GUI를 살펴보세요.</li>
</ul>
