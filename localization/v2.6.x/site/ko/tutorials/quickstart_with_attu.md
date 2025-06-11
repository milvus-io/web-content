---
id: quickstart_with_attu.md
summary: >-
  Attu는 Milvus를 위한 올인원 오픈소스 관리 도구입니다. 직관적인 그래픽 사용자 인터페이스(GUI)를 갖추고 있어 데이터베이스와 쉽게
  상호 작용할 수 있습니다. 몇 번의 클릭만으로 클러스터 상태를 시각화하고, 메타데이터를 관리하고, 데이터 쿼리를 수행하는 등의 작업을 수행할
  수 있습니다.
title: 질문 답변 시스템
---
<h1 id="Quick-Start-with-Attu-Desktop" class="common-anchor-header">Attu 데스크톱 빠른 시작<button data-href="#Quick-Start-with-Attu-Desktop" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="1-Introduction" class="common-anchor-header">1. 소개<button data-href="#1-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu">Attu는</a> Milvus를 위한 올인원 오픈소스 관리 도구입니다. 직관적인 그래픽 사용자 인터페이스(GUI)를 갖추고 있어 데이터베이스와 쉽게 상호 작용할 수 있습니다. 몇 번의 클릭만으로 클러스터 상태를 시각화하고, 메타데이터를 관리하고, 데이터 쿼리를 수행하는 등의 작업을 수행할 수 있습니다.</p>
<hr>
<h2 id="2-Install-Desktop-Application" class="common-anchor-header">2. 데스크톱 애플리케이션 설치<button data-href="#2-Install-Desktop-Application" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu/releases">Attu GitHub 릴리즈 페이지를</a> 방문하여 데스크톱 버전의 Attu를 다운로드하세요. 사용 중인 운영 체제에 적합한 버전을 선택하고 설치 단계를 따르세요.</p>
<h3 id="Note-for-macOS-M-series-chip" class="common-anchor-header">macOS(M 시리즈 칩)의 경우 참고:</h3><p>오류가 발생하는 경우</p>
<pre><code translate="no">attu.app <span class="hljs-keyword">is</span> damaged <span class="hljs-keyword">and</span> cannot be opened.
<button class="copy-code-btn"></button></code></pre>
<p>터미널에서 다음 명령을 실행하여 이 문제를 우회하세요:</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> xattr -rd com.apple.quarantine /Applications/attu.app
<button class="copy-code-btn"></button></code></pre>
<hr>
<h2 id="3-Connect-to-Milvus" class="common-anchor-header">3. Milvus에 연결하기<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu는 <strong>밀버스 스탠드얼론과</strong> <strong>질리즈 클라우드</strong> 모두 연결을 지원하여 로컬 또는 클라우드에 호스팅된 데이터베이스로 작업할 수 있는 유연성을 제공합니다.</p>
<p>Milvus Standalone을 로컬에서 사용하려면 다음과 같이 하세요:</p>
<ol>
<li><a href="https://milvus.io/docs/install_standalone-docker.md">Milvus 설치 가이드에</a> 따라 Milvus Standalone을 시작합니다.</li>
<li>Attu를 열고 연결 정보를 입력합니다:<ul>
<li>Milvus 주소: Milvus Standalone 서버 URI(예: http://localhost:19530)</li>
<li>기타 선택적 설정: Milvus 구성에 따라 설정하거나 기본값으로 그대로 둘 수 있습니다.</li>
</ul></li>
<li>연결을 클릭하여 데이터베이스에 액세스합니다.</li>
</ol>
<blockquote>
<p><a href="https://zilliz.com/cloud">Zilliz Cloud에서</a> 완전 관리형 Milvus를 연결할 수도 있습니다. <code translate="no">Milvus Address</code> 및 <code translate="no">token</code> 을 질리즈 클라우드 인스턴스의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">퍼블릭 엔드포인트와 API 키로</a> 설정하기만 하면 됩니다.</p>
</blockquote>
<ol start="4">
<li>클릭하여 데이터베이스에 접속합니다.</li>
</ol>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_login_page.png" alt="Attu Login Page" width="80%">
</p>
<hr>
<h2 id="4-Prepare-Data-Create-Collection-and-Insert-Data" class="common-anchor-header">4. 데이터 준비, 수집 생성, 데이터 삽입하기<button data-href="#4-Prepare-Data-Create-Collection-and-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="41-Prepare-the-Data" class="common-anchor-header">4.1 데이터 준비</h3><p>이 예제에서는 <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus 문서 2.4.x의</a> FAQ 페이지를 데이터셋으로 사용합니다.</p>
<h4 id="Download-and-Extract-Data" class="common-anchor-header">데이터를 다운로드하고 추출합니다:</h4><pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<h4 id="Process-Markdown-Files" class="common-anchor-header">마크다운 파일 처리하기:</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []
<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()
    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="42-Generate-Embeddings" class="common-anchor-header">4.2 임베딩 생성하기</h3><p><code translate="no">milvus_model</code> 을 사용하여 텍스트 임베딩을 생성할 임베딩 모델을 정의합니다. 여기서는 사전 학습된 경량 임베딩 모델인 <code translate="no">DefaultEmbeddingFunction</code> 모델을 예로 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model <span class="hljs-keyword">as</span> milvus_model

embedding_model = milvus_model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Generate test embedding</span>
test_embedding = embedding_model.encode_queries([<span class="hljs-string">&quot;This is a test&quot;</span>])[<span class="hljs-number">0</span>]
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<h4 id="Output" class="common-anchor-header">출력합니다:</h4><pre><code translate="no">768
[-0.04836066  0.07163023 -0.01130064 -0.03789345 -0.03320649 -0.01318448
 -0.03041712 -0.02269499 -0.02317863 -0.00426028]
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="43-Create-Collection" class="common-anchor-header">4.3 컬렉션 만들기</h3><p>Milvus에 연결하여 컬렉션을 생성합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;attu_tutorial&quot;</span>

<span class="hljs-comment"># Drop collection if it exists</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection</span>
client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="44-Insert-Data" class="common-anchor-header">4.4 데이터 삽입</h3><p>텍스트 줄을 반복하고 임베딩을 생성한 다음 데이터를 Milvus에 삽입합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []
doc_embeddings = embedding_model.encode_documents(text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc_embeddings[i], <span class="hljs-string">&quot;text&quot;</span>: line})

client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="45-Visualize-Data-and-Schema" class="common-anchor-header">4.5 데이터 및 스키마 시각화</h3><p>이제 Attu의 인터페이스를 사용하여 데이터 스키마와 삽입된 엔티티를 시각화할 수 있습니다. 스키마에는 <code translate="no">Int64</code> 유형의 <code translate="no">id</code> 필드와 <code translate="no">vector</code> 유형의 <code translate="no">FloatVector(768)</code> 필드( <code translate="no">Inner Product (IP)</code> 메트릭 포함) 등 정의된 필드가 표시됩니다. 컬렉션에는 <strong>72개의 엔티티가</strong> 로드되어 있습니다.</p>
<p>또한 ID, 벡터 임베딩 및 텍스트 콘텐츠와 같은 메타데이터를 저장하는 동적 필드를 포함하여 삽입된 데이터를 볼 수 있습니다. 이 인터페이스는 지정된 조건 또는 동적 필드를 기반으로 필터링 및 쿼리를 지원합니다.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_1.png" alt="Schema View" width="45%" />
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_2.png" alt="Data View" width="45%" />
</p>
<h2 id="5-Visualizing-Search-Results-and-Relationships" class="common-anchor-header">5. 검색 결과 및 관계 시각화<button data-href="#5-Visualizing-Search-Results-and-Relationships" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu는 데이터 관계를 시각화하고 탐색할 수 있는 강력한 인터페이스를 제공합니다. 삽입된 데이터 포인트와 그 유사성 관계를 조사하려면 다음 단계를 따르세요:</p>
<h3 id="51-Perform-a-Search" class="common-anchor-header">5.1 <strong>검색 수행</strong></h3><p>Attu의 <strong>벡터 검색</strong> 탭으로 이동합니다.</p>
<ol>
<li><strong>무작위 데이터 생성</strong> 버튼을 클릭하여 테스트 쿼리를 생성합니다.</li>
<li><strong>검색을</strong> 클릭하여 생성된 데이터를 기반으로 결과를 검색합니다.</li>
</ol>
<p>결과는 테이블에 표시되며, 일치하는 각 엔티티의 ID, 유사도 점수 및 동적 필드가 표시됩니다.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_table.png" alt="Search Results Table" width="80%">
</p>
<hr>
<h3 id="52-Explore-Data-Relationships" class="common-anchor-header">5.2 <strong>데이터 관계 탐색</strong></h3><p>결과 패널에서 <strong>탐색</strong> 버튼을 클릭하면 쿼리 벡터와 검색 결과 사이의 관계를 <strong>지식 그래프와 같은 구조로</strong> 시각화할 수 있습니다.</p>
<ul>
<li><strong>중앙 노드는</strong> 검색 벡터를 나타냅니다.</li>
<li><strong>연결된 노드는</strong> 검색 결과를 나타내며, 해당 노드를 클릭하면 해당 노드의 상세 정보가 표시됩니다.</li>
</ul>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_graph.png" alt="Knowledge Graph Visualization" width="80%">
</p>
<hr>
<h3 id="53-Expand-the-Graph" class="common-anchor-header">5.3 <strong>그래프 펼치기</strong></h3><p>결과 노드를 더블클릭하여 연결을 확장합니다. 이 작업은 선택한 노드와 컬렉션의 다른 데이터 포인트 사이의 추가 관계를 표시하여 <strong>더 크고 상호 연결된 지식 그래프를</strong> 만듭니다.</p>
<p>이 확장된 보기를 사용하면 벡터 유사성을 기반으로 데이터 포인트가 어떻게 연관되어 있는지 더 깊이 탐색할 수 있습니다.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_expanded_searched_graph.png" alt="Expanded Knowledge Graph" width="80%">
</p>
<hr>
<h2 id="6-Conclusion" class="common-anchor-header">6. 결론<button data-href="#6-Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu는 Milvus에 저장된 벡터 데이터의 관리와 시각화를 간소화합니다. 데이터 삽입부터 쿼리 실행, 대화형 탐색에 이르기까지 복잡한 벡터 검색 작업을 처리할 수 있는 직관적인 인터페이스를 제공합니다. 동적 스키마 지원, 그래픽 검색 시각화, 유연한 쿼리 필터와 같은 기능을 통해 Attu는 사용자가 대규모 데이터 세트를 효과적으로 분석할 수 있도록 지원합니다.</p>
<p>Attu의 시각적 탐색 도구를 활용하면 데이터를 더 잘 이해하고, 숨겨진 관계를 파악하고, 데이터 기반의 의사 결정을 내릴 수 있습니다. 지금 바로 Attu와 Milvus로 데이터 세트 탐색을 시작하세요!</p>
<hr>
