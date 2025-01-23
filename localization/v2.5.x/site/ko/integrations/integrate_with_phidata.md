---
id: integrate_with_phidata.md
title: Milvus와 Phidata 통합
summary: 이 페이지에서는 지능형 에이전트 및 워크플로를 구축하기 위한 강력한 프레임워크인 Phidata와 벡터 데이터베이스의 통합에 대해 설명합니다.
---
<h1 id="Integrate-Milvus-with-Phidata" class="common-anchor-header">Milvus와 Phidata 통합<button data-href="#Integrate-Milvus-with-Phidata" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/phidatahq/phidata/tree/main">Phidata는</a> 지능형 에이전트 및 워크플로를 구축하기 위한 강력한 프레임워크입니다. 이를 통해 텍스트, 이미지, 오디오 및 비디오를 이해하고 다양한 도구와 지식 소스를 활용하여 복잡한 작업을 수행할 수 있는 멀티모달 에이전트를 만들 수 있습니다. Phidata는 멀티 에이전트 오케스트레이션을 지원하여 여러 에이전트 팀이 함께 협업하고 문제를 해결할 수 있도록 합니다. 또한 에이전트와의 상호 작용을 위한 멋진 에이전트 UI를 제공합니다.</p>
<p>Milvus 벡터 데이터베이스를 사용하면 정보를 임베딩으로 효율적으로 저장하고 검색할 수 있습니다. Milvus와 Phidata를 사용하면 지식을 상담원 워크플로우에 쉽게 통합할 수 있습니다. 이 문서는 Milvus와 Phidata 통합을 사용하는 방법에 대한 기본 안내서입니다.</p>
<h2 id="Preparation" class="common-anchor-header">준비 단계<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>필요한 종속성을 설치합니다:</p>
<pre><code translate="no" class="language-shell">$ pip install --upgrade phidata pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우 방금 설치한 종속성을 사용하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 "런타임" 메뉴를 클릭하고 드롭다운 메뉴에서 "세션 다시 시작"을 선택).</p>
</div>
<p>이 예제에서는 OpenAI를 LLM으로 사용하겠습니다. 환경 변수로 <code translate="no">OPENAI_API_KEY</code> <a href="https://platform.openai.com/docs/quickstart">API 키를</a> 준비해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initalize-Milvus" class="common-anchor-header">Milvus 초기화<button data-href="#Initalize-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>패키지를 가져와서 Milvus 벡터 데이터베이스 인스턴스를 초기화합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> phi.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> phi.knowledge.pdf <span class="hljs-keyword">import</span> PDFUrlKnowledgeBase
<span class="hljs-keyword">from</span> phi.vectordb.milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Initialize Milvus</span>
vector_db = Milvus(
    collection=<span class="hljs-string">&quot;recipes&quot;</span>,
    uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 서버의 컬렉션 이름과 uri 및 토큰(옵션)을 지정합니다.</p>
<p>URL과 토큰을 설정하는 방법은 다음과 같습니다:</p>
<ul>
<li><p>소규모 데이터나 프로토타이핑을 위한 로컬 벡터 데이터베이스만 필요한 경우, Uri를 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법이며, 이 파일에 모든 데이터를 저장하기 위해 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하기 때문입니다.</p></li>
<li><p>백만 개 이상의 벡터와 같이 대규모 데이터가 있는 경우, <a href="https://milvus.io/docs/quickstart.md">Docker 또는 Kubernetes에서</a> 더 성능이 뛰어난 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 주소와 포트를 URI로 사용하세요(예:<code translate="no">http://localhost:19530</code>). Milvus에서 인증 기능을 활성화하는 경우 토큰으로 "&lt;사용자 이름&gt;:&lt;사용자 비밀번호&gt;"를 사용하고, 그렇지 않은 경우 토큰을 설정하지 마세요.</p></li>
<li><p>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하는 경우, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">uri</code> 와 <code translate="no">token</code> 를 조정합니다.</p></li>
</ul>
<h2 id="Load-data" class="common-anchor-header">데이터 로드<button data-href="#Load-data" class="anchor-icon" translate="no">
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
    </button></h2><p>PDF URL 지식베이스 인스턴스를 생성하고 해당 인스턴스에 데이터를 로드합니다. 여기서는 공개 레시피 PDF 데이터를 예시로 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create knowledge base</span>
knowledge_base = PDFUrlKnowledgeBase(
    urls=[<span class="hljs-string">&quot;https://phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf&quot;</span>],
    vector_db=vector_db,
)

knowledge_base.load(recreate=<span class="hljs-literal">False</span>)  <span class="hljs-comment"># Comment out after first run</span>
<button class="copy-code-btn"></button></code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO </span> 컬렉션 생성하기</pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO </span> 지식창고 불러오기</pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO </span> 읽기 중: <span style="color: #0000ff; text-decoration-color: #0000ff; text-decoration: underline">https:</span> //phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf</pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">정보 </span> 지식창고에 문서 <span style="color: #008080; text-decoration-color: #008080; font-weight: bold">0개</span> 추가됨</pre>
<h2 id="Use-agent-to-response-to-a-question" class="common-anchor-header">상담원을 사용하여 질문에 응답하기<button data-href="#Use-agent-to-response-to-a-question" class="anchor-icon" translate="no">
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
    </button></h2><p>지식창고를 에이전트에 통합하면 에이전트에게 질문하고 답변을 받을 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create and use the agent</span>
agent = Agent(knowledge_base=knowledge_base, use_tools=<span class="hljs-literal">True</span>, show_tool_calls=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Query the agent</span>
agent.print_response(<span class="hljs-string">&quot;How to make Tom Kha Gai&quot;</span>, markdown=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Output()
</code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"></pre>
<pre><code translate="no">    ┏━ Message ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃                                                                                                       ┃
    ┃ How to make Tom Kha Gai                                                                               ┃
    ┃                                                                                                       ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    ┏━ Response (6.9s) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃                                                                                                       ┃
    ┃ Running:                                                                                              ┃
    ┃                                                                                                       ┃
    ┃  • search_knowledge_base(query=Tom Kha Gai recipe)                                                    ┃
    ┃                                                                                                       ┃
    ┃ Here's a recipe for Tom Kha Gai, a delicious Thai chicken and galangal soup made with coconut milk:   ┃
    ┃                                                                                                       ┃
    ┃ Ingredients (One serving):                                                                            ┃
    ┃                                                                                                       ┃
    ┃  • 150 grams chicken, cut into bite-size pieces                                                       ┃
    ┃  • 50 grams sliced young galangal                                                                     ┃
    ┃  • 100 grams lightly crushed lemongrass, julienned                                                    ┃
    ┃  • 100 grams straw mushrooms                                                                          ┃
    ┃  • 250 grams coconut milk                                                                             ┃
    ┃  • 100 grams chicken stock                                                                            ┃
    ┃  • 3 tbsp lime juice                                                                                  ┃
    ┃  • 3 tbsp fish sauce                                                                                  ┃
    ┃  • 2 leaves kaffir lime, shredded                                                                     ┃
    ┃  • 1-2 bird’s eye chilies, pounded                                                                    ┃
    ┃  • 3 leaves coriander                                                                                 ┃
    ┃                                                                                                       ┃
    ┃ Directions:                                                                                           ┃
    ┃                                                                                                       ┃
    ┃  1 Bring the chicken stock and coconut milk to a slow boil.                                           ┃
    ┃  2 Add galangal, lemongrass, chicken, and mushrooms. Once the soup returns to a boil, season it with f┃
    ┃  3 Wait until the chicken is cooked, then add the kaffir lime leaves and bird’s eye chilies.          ┃
    ┃  4 Remove the pot from heat and add lime juice.                                                       ┃
    ┃  5 Garnish with coriander leaves.                                                                     ┃
    ┃                                                                                                       ┃
    ┃ Tips:                                                                                                 ┃
    ┃                                                                                                       ┃
    ┃  • Keep the heat low throughout the cooking process to prevent the oil in the coconut milk from separ ┃
    ┃  • If using mature galangal, reduce the amount.                                                       ┃
    ┃  • Adding lime juice after removing the pot from heat makes it more aromatic.                         ┃
    ┃  • Reduce the number of chilies for a milder taste.                                                   ┃
    ┃                                                                                                       ┃
    ┃ Enjoy making and savoring this flavorful Thai soup!                                                   ┃
    ┃                                                                                                       ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
</code></pre>
<p>축하드립니다. Phidata에서 Milvus 사용의 기본 사항을 배웠습니다. Phidata 사용 방법에 대해 더 자세히 알고 싶으시면 <a href="https://docs.phidata.com/introduction">공식 문서를</a> 참조하세요.</p>
