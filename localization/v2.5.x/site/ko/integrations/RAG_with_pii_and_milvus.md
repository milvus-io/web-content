---
id: RAG_with_pii_and_milvus.md
summary: 이 튜토리얼에서는 Milvus와 PII 마스커를 사용하여 RAG(검색 증강 생성) 파이프라인을 구축하는 방법을 보여드리겠습니다.
title: Milvus + PII 마스커로 RAG 구축하기
---
<h1 id="Build-RAG-with-Milvus-+-PII-Masker" class="common-anchor-header">Milvus + PII 마스커로 RAG 구축하기<button data-href="#Build-RAG-with-Milvus-+-PII-Masker" class="anchor-icon" translate="no">
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
    </button></h1><p>PII(개인 식별 정보)는 개인을 식별하는 데 사용될 수 있는 민감한 데이터의 일종입니다.</p>
<p><a href="https://www.hydrox.ai/">HydroX AI에서</a> 개발한<a href="https://github.com/HydroXai/pii-masker-v1/tree/main">PII 마스커는</a> 최첨단 AI 모델을 활용하여 민감한 데이터를 보호하도록 설계된 고급 오픈 소스 도구입니다. 고객 데이터를 처리하든, 데이터 분석을 수행하든, 개인정보 보호 규정을 준수하든, PII 마스커는 강력하고 확장 가능한 솔루션을 제공하여 정보를 안전하게 보호할 수 있습니다.</p>
<p>이 튜토리얼에서는 Milvus와 함께 PII 마스커를 사용하여 RAG(검색 증강 세대) 애플리케이션에서 개인 데이터를 보호하는 방법을 보여드립니다. PII 마스커의 데이터 마스킹 기능의 강점과 Milvus의 효율적인 데이터 검색 기능을 결합하면 민감한 정보를 안심하고 처리할 수 있는 안전하고 개인정보 보호 규정을 준수하는 파이프라인을 만들 수 있습니다. 이러한 접근 방식을 통해 애플리케이션이 개인정보 보호 표준을 충족하고 사용자 데이터를 효과적으로 보호할 수 있습니다.</p>
<h2 id="Preparation" class="common-anchor-header">준비하기<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Get-started-with-PII-Masker" class="common-anchor-header">PII 마스커 시작하기</h3><p>PII 마스커의 <a href="https://github.com/HydroXai/pii-masker-v1/tree/main?tab=readme-ov-file#-installation">설치 가이드에</a> 따라 필요한 종속 요소를 설치하고 모델을 다운로드하세요. 다음은 간단한 가이드입니다:</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/HydroXai/pii-masker-v1.git
$ <span class="hljs-built_in">cd</span> pii-masker-v1/pii-masker
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">https://huggingface.co/hydroxai/pii_model_weight</code> 에서 모델을 다운로드하고 파일을 교체합니다: <code translate="no">pii-masker/output_model/deberta3base_1024/</code></p>
<h3 id="Dependencies-and-Environment" class="common-anchor-header">종속성 및 환경</h3><pre><code translate="no" class="language-shell">$ pip install --upgrade pymilvus openai requests tqdm dataset
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서는 OpenAI를 LLM으로 사용합니다. 환경 변수로 <code translate="no">OPENAI_API_KEY</code> <a href="https://platform.openai.com/docs/quickstart">API 키를</a> 준비해야 합니다.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-keyword">export</span> <span class="hljs-variable constant_">OPENAI_API_KEY</span>=sk-***********
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 파이썬 또는 jupyter 노트북을 만들어 다음 코드를 실행할 수 있습니다.</p>
<h3 id="Prepare-the-data" class="common-anchor-header">데이터 준비하기</h3><p>테스트 또는 데모 목적으로 PII 정보가 포함된 가짜 줄을 생성해 보겠습니다.</p>
<pre><code translate="no" class="language-python">text_lines = [
    <span class="hljs-string">&quot;Alice Johnson, a resident of Dublin, Ireland, attended a flower festival at Hyde Park on May 15, 2023. She entered the park at noon using her digital passport, number 23456789. Alice spent the afternoon admiring various flowers and plants, attending a gardening workshop, and having a light snack at one of the food stalls. While there, she met another visitor, Mr. Thompson, who was visiting from London. They exchanged tips on gardening and shared contact information: Mr. Thompson&#x27;s address was 492, Pine Lane, and his cell phone number was +018.221.431-4517. Alice gave her contact details: home address, Ranch 16&quot;</span>,
    <span class="hljs-string">&quot;Hiroshi Tanaka, a businessman from Tokyo, Japan, went to attend a tech expo at the Berlin Convention Center on November 10, 2023. He registered for the event at 9 AM using his digital passport, number Q-24567680. Hiroshi networked with industry professionals, participated in panel discussions, and had lunch with some potential partners. One of the partners he met was from Munich, and they decided to keep in touch: the partner&#x27;s office address was given as house No. 12, Road 7, Block E. Hiroshi offered his business card with the address, 654 Sakura Road, Tokyo.&quot;</span>,
    <span class="hljs-string">&quot;In an online forum discussion about culinary exchanges around the world, several participants shared their experiences. One user, Male, with the email 2022johndoe@example.com, shared his insights. He mentioned his ID code 1A2B3C4D5E and reference number L87654321 while residing in Italy but originally from Australia. He provided his +0-777-123-4567 and described his address at 456, Flavorful Lane, Pasta, IT, 00100.&quot;</span>,
    <span class="hljs-string">&quot;Another user joined the conversation on the topic of international volunteering opportunities. Identified as Female, she used the email 2023janedoe@example.com to share her story. She noted her 9876543210123 and M1234567890123 while residing in Germany but originally from Brazil. She provided her +0-333-987-6543 and described her address at 789, Sunny Side Street, Berlin, DE, 10178.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mask-the-data-with-PIIMasker" class="common-anchor-header">PIIMasker로 데이터 마스킹하기</h3><p>PIIMasker 객체를 초기화하고 모델을 로드해 보겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> model <span class="hljs-keyword">import</span> <span class="hljs-title class_">PIIMasker</span>

masker = <span class="hljs-title class_">PIIMasker</span>()
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 텍스트 줄 목록에서 PII를 마스킹하고 마스킹된 결과를 인쇄합니다.</p>
<pre><code translate="no" class="language-python">masked_results = []
<span class="hljs-keyword">for</span> full_text in text_lines:
    masked_text, _ = masker.mask_pii(full_text)
    masked_results.<span class="hljs-built_in">append</span>(masked_text)

<span class="hljs-keyword">for</span> res in masked_results:
    <span class="hljs-built_in">print</span>(res + <span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Alice [B-NAME] , a resident of Dublin Ireland attended flower festival at Hyde Park on May 15 2023 [B-PHONE_NUM] She entered the park noon using her digital passport number 23 [B-ID_NUM] [B-NAME] afternoon admiring various flowers and plants attending gardening workshop having light snack one food stalls While there she met another visitor Mr Thompson who was visiting from London They exchanged tips shared contact information : ' s address 492 [I-STREET_ADDRESS] his cell phone + [B-PHONE_NUM] [B-NAME] details home Ranch [B-STREET_ADDRESS]

Hiroshi [B-NAME] [I-STREET_ADDRESS] a businessman from Tokyo Japan went to attend tech expo at the Berlin Convention Center on November 10 2023 . He registered for event 9 AM using his digital passport number Q [B-ID_NUM] [B-NAME] with industry professionals participated in panel discussions and had lunch some potential partners One of he met was Munich they decided keep touch : partner ' s office address given as house No [I-STREET_ADDRESS] [B-NAME] business card 654 [B-STREET_ADDRESS]

In an online forum discussion about culinary exchanges around the world [I-STREET_ADDRESS] several participants shared their experiences [I-STREET_ADDRESS] One user Male with email 2022 [B-EMAIL] his insights He mentioned ID code 1 [B-ID_NUM] [I-PHONE_NUM] reference number L [B-ID_NUM] residing in Italy but originally from Australia provided + [B-PHONE_NUM] [I-PHONE_NUM] described address at 456 [I-STREET_ADDRESS]

Another user joined the conversation on topic of international volunteering opportunities . Identified as Female , she used email 2023 [B-EMAIL] share her story She noted 98 [B-ID_NUM] [I-PHONE_NUM] M [B-ID_NUM] residing in Germany but originally from Brazil provided + [B-PHONE_NUM] [I-PHONE_NUM] described address at 789 [I-STREET_ADDRESS] DE 10 178
</code></pre>
<h3 id="Prepare-the-Embedding-Model" class="common-anchor-header">임베딩 모델 준비</h3><p>임베딩 모델을 준비하기 위해 OpenAI 클라이언트를 초기화합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> <span class="hljs-title class_">OpenAI</span>

openai_client = <span class="hljs-title class_">OpenAI</span>()
<button class="copy-code-btn"></button></code></pre>
<p>OpenAI 클라이언트를 사용하여 텍스트 임베딩을 생성하는 함수를 정의합니다. <code translate="no">text-embedding-3-small</code> 모델을 예로 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_text</span>(<span class="hljs-params">text</span>):
    <span class="hljs-keyword">return</span> (
        openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)
        .data[<span class="hljs-number">0</span>]
        .embedding
    )
<button class="copy-code-btn"></button></code></pre>
<p>테스트 임베딩을 생성하고 해당 치수와 처음 몇 개의 요소를 인쇄합니다.</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1536
[0.009889289736747742, -0.005578675772994757, 0.00683477520942688, -0.03805781528353691, -0.01824733428657055, -0.04121600463986397, -0.007636285852640867, 0.03225184231996536, 0.018949154764413834, 9.352207416668534e-05]
</code></pre>
<h2 id="Load-data-into-Milvus" class="common-anchor-header">Milvus에 데이터 로드<button data-href="#Load-data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">컬렉션 생성</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

milvus_client = <span class="hljs-title class_">MilvusClient</span>(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">MilvusClient</code> 의 인수를 사용합니다:</p>
<ul>
<li><code translate="no">uri</code> 을 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법인데, <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하여 모든 데이터를 이 파일에 저장하기 때문입니다.</li>
<li>백만 개 이상의 벡터와 같이 대량의 데이터가 있는 경우, <a href="https://milvus.io/docs/quickstart.md">Docker 또는 Kubernetes에</a> 더 성능이 좋은 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 주소와 포트를 URI로 사용하세요(예:<code translate="no">http://localhost:19530</code>). Milvus에서 인증 기능을 활성화하는 경우 토큰으로 "&lt;사용자 이름&gt;:&lt;사용자 비밀번호&gt;"를 사용하고, 그렇지 않으면 토큰을 설정하지 마세요.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">uri</code> 및 <code translate="no">token</code> 을 조정하세요.</li>
</ul>
</div>
<p>컬렉션이 이미 존재하는지 확인하고 존재한다면 삭제합니다.</p>
<pre><code translate="no" class="language-python">collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<span class="hljs-keyword">if</span> milvus_client.<span class="hljs-title function_">has_collection</span>(collection_name):
    milvus_client.<span class="hljs-title function_">drop_collection</span>(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>지정된 파라미터로 새 컬렉션을 생성합니다.</p>
<p>필드 정보를 지정하지 않으면 기본 키로 <code translate="no">id</code> 필드와 벡터 데이터를 저장할 <code translate="no">vector</code> 필드가 자동으로 생성됩니다. 예약된 JSON 필드는 스키마에 정의되지 않은 필드와 그 값을 저장하는 데 사용됩니다.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  # Inner product distance
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  # Supported values are (<span class="hljs-string">`&quot;Strong&quot;`</span>, <span class="hljs-string">`&quot;Session&quot;`</span>, <span class="hljs-string">`&quot;Bounded&quot;`</span>, <span class="hljs-string">`&quot;Eventually&quot;`</span>). See https:<span class="hljs-comment">//milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">데이터 삽입</h3><p>마스킹된 텍스트 줄을 반복하여 임베딩을 만든 다음 데이터를 Milvus에 삽입합니다.</p>
<p>다음은 컬렉션 스키마에 정의되지 않은 필드인 새 필드 <code translate="no">text</code> 입니다. 이 필드는 상위 수준에서 일반 필드로 취급될 수 있는 예약된 JSON 동적 필드에 자동으로 추가됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(masked_results, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: emb_text(line), <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|██████████| 4/4 [00:01&lt;00:00,  2.60it/s]





{'insert_count': 4, 'ids': [0, 1, 2, 3], 'cost': 0}
</code></pre>
<h2 id="Build-RAG" class="common-anchor-header">RAG 구축<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Retrieve-data-for-a-query" class="common-anchor-header">쿼리에 대한 데이터 검색</h3><p>문서에 대한 질문을 지정해 보겠습니다.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What was the office address of Hiroshi&#x27;s partner from Munich?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>컬렉션에서 질문을 검색하고 시맨틱 상위 1건의 일치 항목을 검색합니다.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        emb_text(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">1</span>,  <span class="hljs-comment"># Return top 1 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>쿼리의 검색 결과를 살펴봅시다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot;Hiroshi [B-NAME] [I-STREET_ADDRESS] a businessman from Tokyo Japan went to attend tech expo at the Berlin Convention Center on November 10 2023 . He registered for event 9 AM using his digital passport number Q [B-ID_NUM] [B-NAME] with industry professionals participated in panel discussions and had lunch some potential partners One of he met was Munich they decided keep touch : partner ' s office address given as house No [I-STREET_ADDRESS] [B-NAME] business card 654 [B-STREET_ADDRESS]&quot;,
        0.6544462442398071
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">LLM을 사용하여 RAG 응답 얻기</h3><p>검색된 문서를 문자열 형식으로 변환합니다.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.<span class="hljs-keyword">join</span>(
    [<span class="hljs-meta">line_with_distance[0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<p>래니어지 모델에 대한 시스템 및 사용자 프롬프트를 정의합니다.</p>
<p>참고: 스니펫에 유용한 정보가 없는 경우 &quot;모르겠습니다&quot;라고 LLM에 알려줍니다.</p>
<pre><code translate="no" class="language-python">SYSTEM_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided. If there are no useful information in the snippets, just say &quot;I don&#x27;t know&quot;.
AI:
&quot;&quot;&quot;</span>
USER_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
<span class="hljs-subst">{context}</span>
&lt;/context&gt;
&lt;question&gt;
<span class="hljs-subst">{question}</span>
&lt;/question&gt;
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>OpenAI ChatGPT를 사용하여 프롬프트에 따라 응답을 생성합니다.</p>
<pre><code translate="no" class="language-python">response = openai_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">I don't know.
</code></pre>
<p>여기에서는 PII를 마스크로 대체했기 때문에 LLM이 문맥에서 PII 정보를 얻을 수 없음을 알 수 있습니다. 따라서 &quot;모르겠습니다&quot;라고 대답합니다. 이러한 방식을 통해 사용자의 개인정보를 효과적으로 보호할 수 있습니다.</p>
