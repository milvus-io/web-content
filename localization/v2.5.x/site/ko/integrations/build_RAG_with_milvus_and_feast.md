---
id: build_RAG_with_milvus_and_feast.md
summary: >-
  이 튜토리얼에서는 Feast와 Milvus를 사용해 검색 증강 생성(RAG) 파이프라인을 구축합니다. Feast는 머신 러닝을 위한 피처
  관리를 간소화하는 오픈 소스 피처 저장소로, 학습과 실시간 추론을 위해 구조화된 데이터를 효율적으로 저장하고 검색할 수 있게 해줍니다.
  Milvus는 빠른 유사성 검색을 위해 설계된 고성능 벡터 데이터베이스로, RAG 워크플로우에서 관련 문서를 검색하는 데 이상적입니다.
title: Milvus와 Feast로 RAG 구축하기
---
<h1 id="Build-RAG-with-Milvus-and-Feast" class="common-anchor-header">Milvus와 Feast로 RAG 구축하기<button data-href="#Build-RAG-with-Milvus-and-Feast" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_feast.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_feast.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>이 튜토리얼에서는 <a href="https://github.com/feast-dev/feast">Feast와</a> <a href="https://milvus.io/">Milvus를</a> 사용해 검색 증강 생성(RAG) 파이프라인을 구축합니다. Feast는 머신 러닝을 위한 기능 관리를 간소화하는 오픈 소스 기능 저장소로, 학습과 실시간 추론 모두를 위해 구조화된 데이터를 효율적으로 저장하고 검색할 수 있게 해줍니다. Milvus는 빠른 유사성 검색을 위해 설계된 고성능 벡터 데이터베이스로, RAG 워크플로우에서 관련 문서를 검색하는 데 이상적입니다.</p>
<p>기본적으로 Feast를 사용하여 문서와 구조화된 데이터(즉, 피처)를 LLM(대규모 언어 모델)의 컨텍스트에 주입하여 Milvus를 온라인 벡터 데이터베이스로 사용하는 RAG 애플리케이션(검색 증강 생성)을 구동할 것입니다.</p>
<h1 id="Why-Feast" class="common-anchor-header">왜 Feast인가?<button data-href="#Why-Feast" class="anchor-icon" translate="no">
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
    </button></h1><p>Feast는 이러한 흐름에서 몇 가지 일반적인 문제를 해결합니다:</p>
<ol>
<li><strong>온라인 검색:</strong> 추론 시점에 LLM은 쉽게 사용할 수 없고 다른 데이터 소스에서 미리 계산해야 하는 데이터에 액세스해야 하는 경우가 많습니다.<ul>
<li>Feast는 다양한 온라인 스토어(예: Milvus, DynamoDB, Redis, Google Cloud Datastore)에 대한 배포를 관리하고 추론 시점에 필요한 기능을 일관되게 <em>사용할 수</em> 있고 <em>새로 계산되도록</em> 보장합니다.</li>
</ul></li>
<li><strong>벡터 검색:</strong> Feast는 사용자가 애플리케이션에 집중할 수 있도록 선언적으로 쉽게 구성할 수 있는 벡터 유사도 검색을 지원합니다. Milvus는 강력하고 효율적인 벡터 유사도 검색 기능을 제공합니다.</li>
<li><strong>더욱 풍부한 구조화된 데이터:</strong> 사용자는 벡터 검색과 함께 표준 구조화된 필드를 쿼리하여 더 나은 사용자 경험을 위해 LLM 컨텍스트에 삽입할 수 있습니다.</li>
<li><strong>기능/컨텍스트 및 버전 관리:</strong> 조직 내 여러 팀이 프로젝트와 서비스 전반에서 데이터를 재사용하지 못해 애플리케이션 로직이 중복되는 경우가 많습니다. 예를 들어 모델/프롬프트 버전에서 A/B 테스트를 실행할 때 모델에는 버전 관리가 필요한 데이터 종속성이 있습니다.<ul>
<li>Feast를 사용하면 이전에 사용한 문서, 기능을 검색하고 협업할 수 있으며 데이터 세트의 버전 관리가 가능합니다.</li>
</ul></li>
</ol>
<p>그렇게 할 것입니다:</p>
<ol>
<li><strong>Parquet 파일 오프라인 스토어와</strong> <strong>Milvus 온라인 스토어가</strong> 있는 로컬 피처 스토어를 배포합니다.</li>
<li>오프라인 스토어(Parquet 파일)의 데이터(즉, 피처 값)를 온라인 스토어(Milvus)에 기록/구체화합니다.</li>
<li>Milvus의 벡터 검색 기능과 함께 Feast SDK를 사용하여 피처를 제공합니다.</li>
<li>문서를 LLM의 컨텍스트에 삽입하여 질문에 답변하기</li>
</ol>
<div class="alert note">
<p>이 튜토리얼은 <a href="https://github.com/feast-dev/feast/blob/master/examples/rag/milvus-quickstart.ipynb">Feast 리포지토리의</a> 공식 Milvus 통합 가이드를 기반으로 합니다. 이 튜토리얼을 최신 상태로 유지하기 위해 노력하고 있지만, 불일치하는 부분이 있으면 공식 가이드를 참조하고 필요한 업데이트가 있으면 언제든지 리포지토리에서 이슈를 열어주시기 바랍니다.</p>
</div>
<h2 id="Preparation" class="common-anchor-header">준비 사항<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies" class="common-anchor-header">종속성</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install <span class="hljs-string">&#x27;feast[milvus]&#x27;</span> openai -U -q</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우 방금 설치한 종속성을 사용하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 '런타임' 메뉴를 클릭하고 드롭다운 메뉴에서 '세션 다시 시작'을 선택).</p>
</div>
<p>저희는 OpenAI를 LLM 제공업체로 사용합니다. 공식 웹사이트에 로그인하여 <a href="https://platform.openai.com/api-keys">OPENAI_API_KEY를</a> 환경 변수로 준비할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-**************&quot;</span>

llm_client = OpenAI(
    api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-Data" class="common-anchor-header">데이터 준비<button data-href="#Prepare-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 폴더의 데이터를 예제로 사용하겠습니다:<br>
<a href="https://github.com/feast-dev/feast/tree/master/examples/rag/feature_repo">Feast RAG 기능 저장소</a></p>
<p>데이터를 다운로드하면 다음 파일을 찾을 수 있습니다:</p>
<pre><code translate="no" class="language-bash">feature_repo/
│── data/                  <span class="hljs-comment"># Contains pre-processed Wikipedia city data in Parquet format</span>
│── example_repo.py        <span class="hljs-comment"># Defines feature views and entities for the city data</span>
│── feature_store.yaml     <span class="hljs-comment"># Configures Milvus and feature store settings</span>
│── test_workflow.py       <span class="hljs-comment"># Example workflow for Feast operations</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Key-Configuration-Files" class="common-anchor-header">주요 구성 파일</h3><h4 id="1-featurestoreyaml" class="common-anchor-header">1. feature_store.yaml</h4><p>이 파일은 피처 저장소 인프라를 구성합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">project:</span> <span class="hljs-string">rag</span>
<span class="hljs-attr">provider:</span> <span class="hljs-string">local</span>
<span class="hljs-attr">registry:</span> <span class="hljs-string">data/registry.db</span>

<span class="hljs-attr">online_store:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">milvus</span>            <span class="hljs-comment"># Uses Milvus for vector storage</span>
  <span class="hljs-attr">path:</span> <span class="hljs-string">data/online_store.db</span>
  <span class="hljs-attr">vector_enabled:</span> <span class="hljs-literal">true</span>    <span class="hljs-comment"># Enables vector similarity search</span>
  <span class="hljs-attr">embedding_dim:</span> <span class="hljs-number">384</span>      <span class="hljs-comment"># Dimension of our embeddings</span>
  <span class="hljs-attr">index_type:</span> <span class="hljs-string">&quot;FLAT&quot;</span>      <span class="hljs-comment"># Vector index type</span>
  <span class="hljs-attr">metric_type:</span> <span class="hljs-string">&quot;COSINE&quot;</span>   <span class="hljs-comment"># Similarity metric</span>

<span class="hljs-attr">offline_store:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">file</span>              <span class="hljs-comment"># Uses file-based offline storage</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 구성은</p>
<ul>
<li>빠른 벡터 검색을 위한 온라인 저장소로서의 Milvus</li>
<li>기록 데이터 처리를 위한 파일 기반 오프라인 스토리지</li>
<li>COSINE 유사성을 이용한 벡터 검색 기능</li>
</ul>
<h4 id="2-examplerepopy" class="common-anchor-header">2. example_repo.py</h4><p>다음을 포함한 도시 데이터에 대한 기능 정의가 포함되어 있습니다:</p>
<ul>
<li>도시에 대한 엔티티 정의</li>
<li>도시 정보 및 임베딩에 대한 기능 보기</li>
<li>벡터 데이터베이스에 대한 스키마 사양</li>
</ul>
<h4 id="3-Data-Directory" class="common-anchor-header">3. 데이터 디렉토리</h4><p>사전 처리된 Wikipedia 도시 데이터가 포함되어 있습니다:</p>
<ul>
<li>도시 설명 및 요약</li>
<li>사전 계산된 임베딩(384차원 벡터)</li>
<li>도시 이름 및 주와 같은 관련 메타데이터</li>
</ul>
<p>이러한 파일은 Milvus의 벡터 검색 기능과 Feast의 기능 관리 기능을 결합한 기능 저장소를 생성하기 위해 함께 작동하여 RAG 애플리케이션을 위한 관련 도시 정보를 효율적으로 검색할 수 있게 해줍니다.</p>
<h2 id="Inspect-the-Data" class="common-anchor-header">데이터 검사<button data-href="#Inspect-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>이 데모에 사용된 원시 피처 데이터는 로컬 파켓 파일에 저장되어 있습니다. 데이터 세트는 여러 도시에 대한 Wikipedia 요약입니다. 먼저 데이터를 검사해 보겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

df = pd.read_parquet(
    <span class="hljs-string">&quot;/path/to/feature_repo/data/city_wikipedia_summaries_with_embeddings.parquet&quot;</span>
)
df[<span class="hljs-string">&quot;vector&quot;</span>] = df[<span class="hljs-string">&quot;vector&quot;</span>].apply(<span class="hljs-keyword">lambda</span> x: x.tolist())
embedding_length = <span class="hljs-built_in">len</span>(df[<span class="hljs-string">&quot;vector&quot;</span>][<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;embedding length = <span class="hljs-subst">{embedding_length}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">embedding length = 384
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display

display(df.head())
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { 세로-정렬: 가운데; }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>item_id</th>
      <th>event_timestamp</th>
      <th>state</th>
      <th>위키 요약</th>
      <th>문장 청크</th>
      <th>벡터</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>뉴욕, 뉴욕</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
      <td>[0.1465730518102646, -0.07317650318145752, 0.0...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>뉴욕, 뉴욕</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
      <td>이 도시는 5 개의 자치구로 구성되어 있으며 각 자치구는 ...</td>
      <td>[0.05218901485204697, -0.08449874818325043, 0....</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>2</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>뉴욕, 뉴욕</td>
      <td>뉴욕, 종종 뉴욕시 또는 단순히 ...</td>
      <td>뉴욕은 금융 및 통신의 글로벌 중심지입니다 ...</td>
      <td>[0.06769222766160965, -0.07371102273464203, -0...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>3</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>뉴욕, 뉴욕</td>
      <td>뉴욕, 종종 뉴욕시 또는 단순히 ...</td>
      <td>뉴욕시는 세계의 진원지입니다 ...</td>
      <td>[0.12095861881971359, -0.04279915615916252, 0....</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>4</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>뉴욕, 뉴욕</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
      <td>2022 년 예상 인구는 8,335 명으로 ...</td>
      <td>[0.17943550646305084, -0.09458263963460922, 0....</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Register-Feature-Definitions-and-Deploy-the-Feature-Store" class="common-anchor-header">기능 정의 등록 및 기능 스토어 배포하기<button data-href="#Register-Feature-Definitions-and-Deploy-the-Feature-Store" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">feature_repo</code> 을 다운로드한 후 <code translate="no">feast apply</code> 을 실행하여 <code translate="no">example_repo.py</code> 에 정의된 기능 뷰와 엔티티를 등록하고 <strong>Milvus를</strong> 온라인 스토어 테이블로 설정해야 합니다.</p>
<p>명령을 실행하기 전에 <code translate="no">feature_repo</code> 디렉터리로 이동했는지 확인하세요.</p>
<pre><code translate="no" class="language-bash">feast apply
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Features-into-Milvus" class="common-anchor-header">Milvus에 기능 로드<button data-href="#Load-Features-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 Milvus에 기능을 로드합니다. 이 단계에서는 오프라인 스토어에서 기능 값을 직렬화하여 Milvus에 기록합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime
<span class="hljs-keyword">from</span> feast <span class="hljs-keyword">import</span> FeatureStore
<span class="hljs-keyword">import</span> warnings

warnings.filterwarnings(<span class="hljs-string">&quot;ignore&quot;</span>)

store = FeatureStore(repo_path=<span class="hljs-string">&quot;/path/to/feature_repo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">store.write_to_online_store(feature_view_name=<span class="hljs-string">&quot;city_embeddings&quot;</span>, df=df)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Connecting to Milvus in local mode using /Users/jinhonglin/Desktop/feature_repo/data/online_store.db
</code></pre>
<p>이제 각각 구체화된 기능과 스키마 정보를 저장하는 <code translate="no">online_store.db</code> 와 <code translate="no">registry.db</code> 이 있습니다. <code translate="no">online_store.db</code> 파일을 살펴볼 수 있습니다.</p>
<pre><code translate="no" class="language-python">pymilvus_client = store._provider._online_store._connect(store.config)
COLLECTION_NAME = pymilvus_client.list_collections()[<span class="hljs-number">0</span>]

milvus_query_result = pymilvus_client.query(
    collection_name=COLLECTION_NAME,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;item_id == &#x27;0&#x27;&quot;</span>,
)
pd.DataFrame(milvus_query_result[<span class="hljs-number">0</span>]).head()
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { 세로-정렬: 가운데; }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>item_id_pk</th>
      <th>created_ts</th>
      <th>event_ts</th>
      <th>item_id</th>
      <th>문장 청크</th>
      <th>state</th>
      <th>벡터</th>
      <th>위키 요약</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
      <td>뉴욕, 뉴욕</td>
      <td>0.146573</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
      <td>뉴욕, 뉴욕</td>
      <td>-0.073177</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
      <td>뉴욕, 뉴욕</td>
      <td>0.052114</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
      <td>뉴욕, 뉴욕</td>
      <td>0.033187</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
      <td>뉴욕, 뉴욕</td>
      <td>0.012013</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Build-RAG" class="common-anchor-header">빌드 RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Embedding-a-Query-Using-PyTorch-and-Sentence-Transformers" class="common-anchor-header">1. 파이토치와 문장 변환기를 사용하여 쿼리 삽입하기</h3><p>추론하는 동안(예: 사용자가 채팅 메시지를 제출할 때) 우리는 입력 텍스트를 임베드해야 합니다. 이것은 입력 데이터의 특징 변환으로 생각할 수 있습니다. 이 예에서는 포옹하는 얼굴의 작은 문장 트랜스포머를 사용하여 이 작업을 수행하겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">import</span> torch.nn.functional <span class="hljs-keyword">as</span> F
<span class="hljs-keyword">from</span> feast <span class="hljs-keyword">import</span> FeatureStore
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, FieldSchema
<span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> AutoTokenizer, AutoModel
<span class="hljs-keyword">from</span> example_repo <span class="hljs-keyword">import</span> city_embeddings_feature_view, item

TOKENIZER = <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>
MODEL = <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">mean_pooling</span>(<span class="hljs-params">model_output, attention_mask</span>):
    token_embeddings = model_output[
        <span class="hljs-number">0</span>
    ]  <span class="hljs-comment"># First element of model_output contains all token embeddings</span>
    input_mask_expanded = (
        attention_mask.unsqueeze(-<span class="hljs-number">1</span>).expand(token_embeddings.size()).<span class="hljs-built_in">float</span>()
    )
    <span class="hljs-keyword">return</span> torch.<span class="hljs-built_in">sum</span>(token_embeddings * input_mask_expanded, <span class="hljs-number">1</span>) / torch.clamp(
        input_mask_expanded.<span class="hljs-built_in">sum</span>(<span class="hljs-number">1</span>), <span class="hljs-built_in">min</span>=<span class="hljs-number">1e-9</span>
    )


<span class="hljs-keyword">def</span> <span class="hljs-title function_">run_model</span>(<span class="hljs-params">sentences, tokenizer, model</span>):
    encoded_input = tokenizer(
        sentences, padding=<span class="hljs-literal">True</span>, truncation=<span class="hljs-literal">True</span>, return_tensors=<span class="hljs-string">&quot;pt&quot;</span>
    )
    <span class="hljs-comment"># Compute token embeddings</span>
    <span class="hljs-keyword">with</span> torch.no_grad():
        model_output = model(**encoded_input)

    sentence_embeddings = mean_pooling(model_output, encoded_input[<span class="hljs-string">&quot;attention_mask&quot;</span>])
    sentence_embeddings = F.normalize(sentence_embeddings, p=<span class="hljs-number">2</span>, dim=<span class="hljs-number">1</span>)
    <span class="hljs-keyword">return</span> sentence_embeddings
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Fetching-Real-time-Vectors-and-Data-for-Online-Inference" class="common-anchor-header">2. 온라인 추론을 위한 실시간 벡터 및 데이터 가져오기</h3><p>쿼리가 임베딩으로 변환되면 다음 단계는 벡터 저장소에서 관련 문서를 검색하는 것입니다. 추론 시에는 벡터 유사성 검색을 활용하여 <code translate="no">retrieve_online_documents_v2()</code> 을 사용하여 온라인 피처 스토어에 저장된 가장 관련성이 높은 문서 임베딩을 찾습니다. 그런 다음 이러한 피처 벡터를 LLM의 컨텍스트에 공급할 수 있습니다.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;Which city has the largest population in New York?&quot;</span>

tokenizer = AutoTokenizer.from_pretrained(TOKENIZER)
model = AutoModel.from_pretrained(MODEL)
query_embedding = run_model(question, tokenizer, model)
query = query_embedding.detach().cpu().numpy().tolist()[<span class="hljs-number">0</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display

<span class="hljs-comment"># Retrieve top k documents</span>
context_data = store.retrieve_online_documents_v2(
    features=[
        <span class="hljs-string">&quot;city_embeddings:vector&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:item_id&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:state&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:sentence_chunks&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:wiki_summary&quot;</span>,
    ],
    query=query,
    top_k=<span class="hljs-number">3</span>,
    distance_metric=<span class="hljs-string">&quot;COSINE&quot;</span>,
).to_df()
display(context_data)
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { 세로-정렬: 가운데; }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>벡터</th>
      <th>item_id</th>
      <th>state</th>
      <th>문장_청크</th>
      <th>위키 요약</th>
      <th>거리</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>0</td>
      <td>뉴욕, 뉴욕</td>
      <td>뉴욕, 종종 뉴욕시 또는 간단히 ...</td>
      <td>뉴욕, 종종 뉴욕시 또는 단순히 ...</td>
      <td>0.743023</td>
    </tr>
    <tr>
      <th>1</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>6</td>
      <td>뉴욕, 뉴욕</td>
      <td>뉴욕은 지리적 및 인구 통계 학적 중심지입니다.</td>
      <td>뉴욕, 종종 뉴욕시 또는 단순히 ...</td>
      <td>0.739733</td>
    </tr>
    <tr>
      <th>2</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>7</td>
      <td>뉴욕, 뉴욕</td>
      <td>20.1 만 명이 넘는 사람들이 지하철에 ...</td>
      <td>뉴욕, 종종 뉴욕시 또는 단순히 ...</td>
      <td>0.728218</td>
    </tr>
  </tbody>
</table>
</div>
<h3 id="3-Formatting-Retrieved-Documents-for-RAG-Context" class="common-anchor-header">3. RAG 컨텍스트에 맞게 검색된 문서 서식 지정하기</h3><p>관련 문서를 검색한 후에는 데이터를 다운스트림 애플리케이션에서 효율적으로 사용할 수 있는 구조화된 컨텍스트로 포맷해야 합니다. 이 단계는 추출된 정보가 깨끗하고 체계적으로 정리되어 RAG 파이프라인에 통합할 준비가 되었는지 확인합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_documents</span>(<span class="hljs-params">context_df</span>):
    output_context = <span class="hljs-string">&quot;&quot;</span>
    unique_documents = context_df.drop_duplicates().apply(
        <span class="hljs-keyword">lambda</span> x: <span class="hljs-string">&quot;City &amp; State = {&quot;</span>
        + x[<span class="hljs-string">&quot;state&quot;</span>]
        + <span class="hljs-string">&quot;}\nSummary = {&quot;</span>
        + x[<span class="hljs-string">&quot;wiki_summary&quot;</span>].strip()
        + <span class="hljs-string">&quot;}&quot;</span>,
        axis=<span class="hljs-number">1</span>,
    )
    <span class="hljs-keyword">for</span> i, document_text <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(unique_documents):
        output_context += <span class="hljs-string">f&quot;****START DOCUMENT <span class="hljs-subst">{i}</span>****\n<span class="hljs-subst">{document_text.strip()}</span>\n****END DOCUMENT <span class="hljs-subst">{i}</span>****&quot;</span>
    <span class="hljs-keyword">return</span> output_context


RAG_CONTEXT = format_documents(context_data[[<span class="hljs-string">&quot;state&quot;</span>, <span class="hljs-string">&quot;wiki_summary&quot;</span>]])
<span class="hljs-built_in">print</span>(RAG_CONTEXT)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">****START DOCUMENT 0****
City &amp; State = {New York, New York}
Summary = {New York, often called New York City or simply NYC, is the most populous city in the United States, located at the southern tip of New York State on one of the world's largest natural harbors. The city comprises five boroughs, each of which is coextensive with a respective county. New York is a global center of finance and commerce, culture and technology, entertainment and media, academics and scientific output, and the arts and fashion, and, as home to the headquarters of the United Nations, is an important center for international diplomacy. New York City is the epicenter of the world's principal metropolitan economy.
With an estimated population in 2022 of 8,335,897 distributed over 300.46 square miles (778.2 km2), the city is the most densely populated major city in the United States. New York has more than double the population of Los Angeles, the nation's second-most populous city. New York is the geographical and demographic center of both the Northeast megalopolis and the New York metropolitan area, the largest metropolitan area in the U.S. by both population and urban area. With more than 20.1 million people in its metropolitan statistical area and 23.5 million in its combined statistical area as of 2020, New York City is one of the world's most populous megacities. The city and its metropolitan area are the premier gateway for legal immigration to the United States. As many as 800 languages are spoken in New York, making it the most linguistically diverse city in the world. In 2021, the city was home to nearly 3.1 million residents born outside the U.S., the largest foreign-born population of any city in the world.
New York City traces its origins to Fort Amsterdam and a trading post founded on the southern tip of Manhattan Island by Dutch colonists in approximately 1624. The settlement was named New Amsterdam (Dutch: Nieuw Amsterdam) in 1626 and was chartered as a city in 1653. The city came under English control in 1664 and was temporarily renamed New York after King Charles II granted the lands to his brother, the Duke of York. before being permanently renamed New York in November 1674. New York City was the capital of the United States from 1785 until 1790. The modern city was formed by the 1898 consolidation of its five boroughs: Manhattan, Brooklyn, Queens, The Bronx, and Staten Island, and has been the largest U.S. city ever since.
Anchored by Wall Street in the Financial District of Lower Manhattan, New York City has been called both the world's premier financial and fintech center and the most economically powerful city in the world. As of 2022, the New York metropolitan area is the largest metropolitan economy in the world with a gross metropolitan product of over US$2.16 trillion. If the New York metropolitan area were its own country, it would have the tenth-largest economy in the world. The city is home to the world's two largest stock exchanges by market capitalization of their listed companies: the New York Stock Exchange and Nasdaq. New York City is an established safe haven for global investors. As of 2023, New York City is the most expensive city in the world for expatriates to live. New York City is home to the highest number of billionaires, individuals of ultra-high net worth (greater than US$30 million), and millionaires of any city in the world.}
****END DOCUMENT 0****
</code></pre>
<h3 id="4-Generating-Responses-Using-Retrieved-Context" class="common-anchor-header">4. 검색된 컨텍스트를 사용하여 응답 생성</h3><p>이제 검색된 문서의 형식을 지정했으므로 응답 생성을 위한 구조화된 프롬프트에 통합할 수 있습니다. 이 단계에서는 어시스턴트가 검색된 정보에만 의존하여 응답이 엉뚱하게 생성되는 것을 방지할 수 있습니다.</p>
<pre><code translate="no" class="language-python">FULL_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
You are an assistant for answering questions about states. You will be provided documentation from Wikipedia. Provide a conversational answer.
If you don&#x27;t know the answer, just say &quot;I do not know.&quot; Don&#x27;t make up an answer.

Here are document(s) you should use when answer the users question:
<span class="hljs-subst">{RAG_CONTEXT}</span>
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: FULL_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: question},
    ],
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>.join([c.message.content <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> response.choices]))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The city with the largest population in New York is New York City itself, often referred to as NYC. It is the most populous city in the United States, with an estimated population of about 8.3 million in 2022.
</code></pre>
