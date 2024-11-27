---
id: integrate_with_airbyte.md
summary: >-
  Airbyte는 추출 및 로드(EL) 데이터 파이프라인을 구축하기 위한 오픈 소스 데이터 이동 인프라입니다. 다용도성, 확장성, 사용
  편의성을 위해 설계되었습니다. Airbyte의 커넥터 카탈로그는 350개 이상의 사전 구축된 커넥터와 함께 '즉시' 제공됩니다. 이러한
  커넥터를 사용하면 단 몇 분 만에 소스에서 대상으로 데이터 복제를 시작할 수 있습니다.
title: 'Airbyte: 오픈 소스 데이터 이동 인프라'
---
<h1 id="Airbyte-Open-Source-Data-Movement-Infrastructure" class="common-anchor-header">Airbyte: 오픈 소스 데이터 이동 인프라<button data-href="#Airbyte-Open-Source-Data-Movement-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Airbyte는 추출 및 로드(EL) 데이터 파이프라인을 구축하기 위한 오픈 소스 데이터 이동 인프라입니다. 다용도성, 확장성, 사용 편의성을 위해 설계되었습니다. Airbyte의 커넥터 카탈로그는 350개 이상의 사전 구축된 커넥터와 함께 '즉시' 제공됩니다. 이러한 커넥터를 사용하면 단 몇 분 만에 소스에서 대상으로 데이터 복제를 시작할 수 있습니다.</p>
<h2 id="Major-Components-of-Airbyte" class="common-anchor-header">Airbyte의 주요 구성 요소<button data-href="#Major-Components-of-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Connector-Catalog" class="common-anchor-header">1. 커넥터 카탈로그</h3><ul>
<li><strong>350개 이상의 사전 구축 커넥터</strong>: Airbyte의 커넥터 카탈로그는 350개 이상의 사전 구축된 커넥터를 '즉시' 제공합니다. 이러한 커넥터를 사용해 단 몇 분 만에 소스에서 대상으로 데이터 복제를 시작할 수 있습니다.</li>
<li><strong>노코드 커넥터 빌더</strong>: <a href="https://docs.airbyte.com/connector-development/connector-builder-ui/overview">노코드 커넥터 빌더와 같은</a> 도구를 통해 사용자 정의 사용 사례를 지원하도록 Airbyte의 기능을 쉽게 확장할 수 있습니다.</li>
</ul>
<h3 id="2-The-Platform" class="common-anchor-header">2. 플랫폼</h3><p>Airbyte의 플랫폼은 데이터 이동 작업을 구성하고 확장하는 데 필요한 모든 수평적 서비스를 제공하며, <a href="https://airbyte.com/product/airbyte-cloud">클라우드 관리형</a> 또는 <a href="https://airbyte.com/product/airbyte-enterprise">자체 관리형으로</a> 이용할 수 있습니다.</p>
<h3 id="3-The-User-Interface" class="common-anchor-header">3. 사용자 인터페이스</h3><p>에어바이트는 사용자가 선호하는 툴링 및 인프라 관리 방식과 통합할 수 있는 UI, <a href="https://docs.airbyte.com/using-airbyte/pyairbyte/getting-started">PyAirbyte</a> (파이썬 라이브러리), <a href="https://docs.airbyte.com/api-documentation">API</a>, <a href="https://docs.airbyte.com/terraform-documentation">테라폼 프로바이더를</a> 갖추고 있습니다.</p>
<p>Airbyte의 기능을 통해 사용자는 유사도 검색을 위해 데이터 소스를 Milvus 클러스터에 통합할 수 있습니다.</p>
<h2 id="Before-You-Begin" class="common-anchor-header">시작하기 전에<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>다음이 필요합니다:</p>
<ul>
<li>Zendesk 계정(또는 데이터를 동기화하려는 다른 데이터 소스)</li>
<li>Airbyte 계정 또는 로컬 인스턴스</li>
<li>OpenAI API 키</li>
<li>Milvus 클러스터</li>
<li>로컬에 설치된 Python 3.10</li>
</ul>
<h2 id="Set-Up-Milvus-Cluster" class="common-anchor-header">Milvus 클러스터 설정<button data-href="#Set-Up-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>이미 프로덕션용으로 K8s 클러스터를 배포한 경우, 이 단계를 건너뛰고 바로 <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">Milvus Operator 배포를</a> 진행할 수 있습니다. 그렇지 않은 경우, <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Create-a-K8s-Cluster">다음 단계에</a> 따라 Milvus Operator를 사용하여 Milvus 클러스터를 배포할 수 있습니다.</p>
<p>개별 엔티티(이 경우에는 지원 티켓 및 지식창고 문서)는 '컬렉션'에 저장되므로 클러스터가 설정된 후에는 컬렉션을 만들어야 합니다. 적절한 이름을 선택하고 OpenAI 임베딩 서비스에서 생성된 벡터 차원과 일치하도록 1536으로 차원을 설정합니다.</p>
<p>생성 후 엔드포인트와 <a href="https://milvus.io/docs/authenticate.md?tab=docker">인증</a> 정보를 기록합니다.</p>
<h2 id="Set-Up-Connection-in-Airbyte" class="common-anchor-header">Airbyte에서 연결 설정<button data-href="#Set-Up-Connection-in-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><p>데이터베이스가 준비되었으니 이제 데이터를 이동해 보겠습니다! 이를 위해서는 Airbyte에서 연결을 구성해야 합니다. <a href="https://cloud.airbyte.com">cloud.airbyte.com에서</a> Airbyte 클라우드 계정에 가입하거나 <a href="https://docs.airbyte.com/using-airbyte/getting-started/">설명서에</a> 설명된 대로 로컬 인스턴스를 실행합니다.</p>
<h3 id="Set-Up-Source" class="common-anchor-header">소스 설정</h3><p>인스턴스가 실행 중이면 연결을 설정해야 합니다. "새 연결"을 클릭하고 "Zendesk Support" 커넥터를 소스로 선택합니다. "테스트 및 저장" 버튼을 클릭하면 Airbyte가 연결이 설정될 수 있는지 확인합니다.</p>
<p>Airbyte 클라우드에서는 인증 버튼을 클릭하여 쉽게 인증할 수 있습니다. 로컬 Airbyte 인스턴스를 사용하는 경우 <a href="https://docs.airbyte.com/integrations/sources/zendesk-support#airbyte-open-source-enable-api-token-access-and-generate-a-token">설명서</a> 페이지에 설명된 지침을 따르세요.</p>
<h3 id="Set-Up-Destination" class="common-anchor-header">대상 설정</h3><p>모든 것이 올바르게 작동한다면 다음 단계는 데이터를 옮길 대상을 설정하는 것입니다. 여기에서 "Milvus" 커넥터를 선택합니다.</p>
<p>Milvus 커넥터는 세 가지 작업을 수행합니다:</p>
<ul>
<li><strong>청크 및 서식 지정</strong> - Zendesk 레코드를 텍스트와 메타데이터로 나눕니다. 텍스트가 지정된 청크 크기보다 크면 레코드가 여러 부분으로 분할되어 컬렉션에 개별적으로 로드됩니다. 예를 들어 텍스트 분할(또는 청크 분할)은 큰 지원 티켓이나 지식창고의 경우에 발생할 수 있습니다. 텍스트를 분할하면 검색에서 항상 유용한 결과를 얻을 수 있습니다.</li>
</ul>
<p>본문, 제목, 설명 및 제목의 텍스트 필드와 청크 크기를 1000토큰으로 설정하여 Zendesk에서 받게 될 데이터에 포함되도록 해 보겠습니다.</p>
<ul>
<li><strong>임베딩</strong> - 머신 러닝 모델을 사용하면 처리 파트에서 생성된 텍스트 청크가 벡터 임베딩으로 변환되어 의미적 유사성을 검색할 수 있습니다. 임베딩을 만들려면 OpenAI API 키를 제공해야 합니다. 에어바이트는 각 청크를 OpenAI로 전송하고 결과 벡터를 Milvus 클러스터에 로드된 엔티티에 추가합니다.</li>
<li><strong>인덱싱</strong> - 청크를 벡터화했으면 데이터베이스에 로드할 수 있습니다. 이렇게 하려면 클러스터 및 컬렉션을 설정할 때 얻은 정보를 Milvus 클러스터에 삽입합니다. <div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_1.png" width="40%"/></div> "테스트 및 저장"을 클릭하면 모든 것이 올바르게 정렬되었는지 확인합니다(유효한 자격 증명, 컬렉션이 존재하며 구성된 임베딩과 동일한 벡터 차원을 갖는지 등).</li>
</ul>
<h3 id="Set-up-stream-sync-flow" class="common-anchor-header">스트림 동기화 흐름 설정</h3><p>데이터 흐름이 준비되기 전 마지막 단계는 동기화할 '스트림'을 선택하는 것입니다. 스트림은 소스에 있는 레코드의 모음입니다. Zendesk는 사용 사례와 관련이 없는 많은 수의 스트림을 지원하므로 대역폭을 절약하고 관련 정보만 검색에 표시되도록 하기 위해 "티켓"과 "문서"만 선택하고 다른 모든 스트림을 비활성화해 보겠습니다:<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_2.png" width="40%"/></div> 스트림 이름을 클릭하여 소스에서 추출할 필드를 선택할 수 있습니다. "증분 + 추가 + 중복 제거" 동기화 모드는 후속 연결 실행 시 최소한의 데이터(마지막 실행 이후 변경된 문서 및 티켓만)만 전송하면서 Zendesk와 Milvus를 동기화 상태로 유지한다는 의미입니다.</p>
<p>연결이 설정되는 즉시 Airbyte가 데이터 동기화를 시작합니다. Milvus 컬렉션에 표시되기까지 몇 분 정도 걸릴 수 있습니다.</p>
<p>복제 빈도를 선택하면 Airbyte가 정기적으로 실행되어 Zendesk 문서의 변경 사항 및 새로 만들어진 이슈로 Milvus 컬렉션을 최신 상태로 유지합니다.</p>
<h3 id="Check-flow" class="common-anchor-header">흐름 확인</h3><p>Milvus 클러스터 UI에서 플레이그라운드로 이동하여 "_ab_stream == \"tickets\""로 설정된 필터로 "데이터 쿼리" 쿼리를 실행하여 컬렉션의 데이터 구조가 어떻게 구성되어 있는지 확인할 수 있습니다.<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_3.png" width="40%"/></div> 결과 보기에서 볼 수 있듯이 Zendesk에서 오는 각 레코드는 지정된 모든 메타데이터와 함께 Milvus에 별도의 엔티티로 저장됩니다. 임베딩의 기반이 되는 텍스트 청크는 "text" 속성으로 표시되며, 이는 OpenAI를 사용하여 임베딩된 텍스트이며 우리가 검색할 텍스트가 될 것입니다.</p>
<h2 id="Build-Streamlit-app-querying-the-collection" class="common-anchor-header">컬렉션을 쿼리하는 Streamlit 앱 빌드<button data-href="#Build-Streamlit-app-querying-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>데이터가 준비되었으니 이제 이를 사용할 애플리케이션을 빌드해야 합니다. 이 경우 애플리케이션은 사용자가 지원 사례를 제출할 수 있는 간단한 지원 양식이 될 것입니다. 사용자가 제출을 누르면 두 가지 작업을 수행합니다:</p>
<ul>
<li>같은 조직의 사용자가 제출한 유사한 티켓을 검색합니다.</li>
<li>사용자와 관련이 있을 수 있는 지식 기반 문서를 검색합니다.</li>
</ul>
<p>두 경우 모두 OpenAI 임베딩을 사용하여 시맨틱 검색을 활용합니다. 이를 위해 사용자가 입력한 문제에 대한 설명도 임베드되어 Milvus 클러스터에서 유사한 엔티티를 검색하는 데 사용됩니다. 관련성이 있는 결과가 있으면 양식 아래에 표시됩니다.</p>
<h3 id="Set-up-UI-environment" class="common-anchor-header">UI 환경 설정</h3><p>애플리케이션을 구현하기 위해 Streamlit을 사용하므로 로컬 Python 설치가 필요합니다.</p>
<p>먼저 Streamlit, Milvus 클라이언트 라이브러리, OpenAI 클라이언트 라이브러리를 로컬에 설치합니다:</p>
<pre><code translate="no" class="language-shell">pip install streamlit pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<p>기본 지원 양식을 렌더링하려면 파이썬 파일 <code translate="no">basic_support_form.py</code> 을 만듭니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-comment"># TODO check for related support cases and articles</span>
        st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>애플리케이션을 실행하려면 Streamlit 실행을 사용합니다:</p>
<pre><code translate="no" class="language-shell">streamlit run basic_support_form.py
<button class="copy-code-btn"></button></code></pre>
<p>그러면 기본 양식이 렌더링됩니다:<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_4.png" width="40%"/></div>이 예제의 코드는 <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/1_basic_support_form.py">GitHub에서도</a> 찾을 수 있습니다.</p>
<h3 id="Set-up-backend-query-service" class="common-anchor-header">백엔드 쿼리 서비스 설정</h3><p>다음으로 관련성이 있을 수 있는 기존 미해결 티켓이 있는지 확인해 보겠습니다. 이를 위해 사용자가 OpenAI를 사용하여 입력한 텍스트를 임베드한 다음 컬렉션에서 유사성 검색을 수행하여 아직 미해결 티켓을 필터링합니다. 제공된 티켓과 기존 티켓 사이의 거리가 매우 짧은 티켓이 있는 경우에는 사용자에게 알리고 제출하지 않습니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">import</span> openai


<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem?&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-keyword">import</span> os
        <span class="hljs-keyword">import</span> pymilvus
        <span class="hljs-keyword">import</span> openai

        org_id = <span class="hljs-number">360033549136</span> <span class="hljs-comment"># TODO Load from customer login data</span>

        pymilvus.connections.connect(uri=os.environ[<span class="hljs-string">&quot;MILVUS_URL&quot;</span>], token=os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>])
        collection = pymilvus.Collection(<span class="hljs-string">&quot;zendesk&quot;</span>)

        embedding = openai.Embedding.create(<span class="hljs-built_in">input</span>=text_val, model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)[<span class="hljs-string">&#x27;data&#x27;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;embedding&#x27;</span>]

        results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">2</span>, output_fields=[<span class="hljs-string">&quot;_id&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>], expr=<span class="hljs-string">f&#x27;status == &quot;new&quot; and organization_id == <span class="hljs-subst">{org_id}</span>&#x27;</span>)

        st.write(results[<span class="hljs-number">0</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> results[<span class="hljs-number">0</span>].distances[<span class="hljs-number">0</span>] &lt; <span class="hljs-number">0.35</span>:
            matching_ticket = results[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>].entity
            st.write(<span class="hljs-string">f&quot;This case seems very similar to <span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;subject&#x27;</span>)}</span> (id #<span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;_id&#x27;</span>)}</span>). Make sure it has not been submitted before&quot;</span>)
        <span class="hljs-keyword">else</span>:
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            
<button class="copy-code-btn"></button></code></pre>
<p>여기서 몇 가지 일이 일어나고 있습니다:</p>
<ul>
<li>Milvus 클러스터에 대한 연결이 설정되었습니다.</li>
<li>사용자가 입력한 설명의 임베딩을 생성하기 위해 OpenAI 서비스가 사용됩니다.</li>
<li>유사성 검색이 수행되어 티켓 상태와 조직 ID를 기준으로 결과를 필터링합니다(동일한 조직의 미해결 티켓만 관련성이 있으므로).</li>
<li>결과가 있고 기존 티켓의 임베딩 벡터와 새로 입력한 텍스트 사이의 거리가 특정 임계값 미만인 경우 이 사실을 알려줍니다.</li>
</ul>
<p>새 앱을 실행하려면 먼저 OpenAI 및 Milvus에 대한 환경 변수를 설정해야 합니다:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_TOKEN</span>=...
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_URL</span>=<span class="hljs-attr">https</span>:<span class="hljs-comment">//...</span>
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">OPENAI_API_KEY</span>=sk-...

streamlit run app.<span class="hljs-property">py</span>
<button class="copy-code-btn"></button></code></pre>
<p>이미 존재하는 티켓을 제출하려고 하면 다음과 같은 결과가 표시됩니다:<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_5.png" width="40%"/></div> 이 예제의 코드는 <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/2_open_ticket_check.py">GitHub에서도</a> 찾을 수 있습니다.</p>
<h3 id="Show-more-relevant-information" class="common-anchor-header">관련 정보 더 보기</h3><p>최종 버전에 숨겨진 녹색 디버그 출력에서 볼 수 있듯이 검색 결과와 일치하는 티켓이 두 개(신규 상태, 현재 조직에서, 임베딩 벡터에 가까운 상태) 있었습니다. 하지만 첫 번째(관련성 있는) 티켓이 두 번째(이 상황에서는 관련성 없는) 티켓보다 순위가 더 높았으며, 이는 낮은 거리 값에 반영되어 있습니다. 이러한 관계는 일반 전체 텍스트 검색에서처럼 직접 일치하는 단어 없이 임베딩 벡터에 포착됩니다.</p>
<p>결론적으로 티켓이 제출된 후에 유용한 정보를 표시하여 사용자에게 최대한 많은 관련 정보를 미리 제공하겠습니다.</p>
<p>이를 위해 티켓이 제출된 후 두 번째 검색을 수행하여 가장 일치하는 지식창고 문서를 가져옵니다:</p>
<pre><code translate="no" class="language-python">   ......
   
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># TODO Actually send out the ticket</span>
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            article_results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">5</span>, output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;html_url&quot;</span>], expr=<span class="hljs-string">f&#x27;_ab_stream == &quot;articles&quot;&#x27;</span>)
            st.write(article_results[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(article_results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span>:
                st.write(<span class="hljs-string">&quot;We also found some articles that might help you:&quot;</span>)
                <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> article_results[<span class="hljs-number">0</span>]:
                    <span class="hljs-keyword">if</span> hit.distance &lt; <span class="hljs-number">0.362</span>:
                        st.write(<span class="hljs-string">f&quot;* [<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>)}</span>](<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;html_url&#x27;</span>)}</span>)&quot;</span>)

<button class="copy-code-btn"></button></code></pre>
<p>유사성 점수가 높은 미해결 지원 티켓이 없는 경우에는 새 티켓이 제출되고 관련 지식창고 문서가 아래에 표시됩니다:<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_6.png" width="40%"/></div> 이 예제의 코드는 <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/3_relevant_articles.py">Github에서도</a> 찾을 수 있습니다.</p>
<h2 id="Conclusion" class="common-anchor-header">결론<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>여기에 표시된 UI는 실제 지원 양식은 아니지만 사용 사례를 설명하기 위한 예시이지만 Airbyte와 Milvus의 조합은 매우 강력합니다. 다양한 소스(Postgres와 같은 데이터베이스부터 Zendesk나 GitHub와 같은 API, Airbyte의 SDK 또는 비주얼 커넥터 빌더를 사용하여 구축한 완전히 사용자 지정 소스까지)에서 텍스트를 쉽게 로드하고 방대한 양의 데이터로 확장 가능한 강력한 벡터 검색 엔진인 Milvus에 임베디드 형식으로 색인할 수 있습니다.</p>
<p>Airbyte와 Milvus는 오픈 소스이며 인프라에서 완전히 무료로 사용할 수 있으며, 원하는 경우 클라우드 서비스를 통해 작업 부하를 분산할 수 있습니다.</p>
<p>이 문서에서 설명한 일반적인 시맨틱 검색 사용 사례 외에도 일반적인 설정은 RAG(검색 증강 생성) 방식, 추천 시스템을 사용하여 질문에 답변하는 채팅 봇을 구축하거나 광고의 관련성과 효율성을 높이는 데에도 사용할 수 있습니다.</p>
