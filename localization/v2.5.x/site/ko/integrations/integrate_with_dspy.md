---
id: integrate_with_dspy.md
summary: 이 가이드에서는 DSPy의 리트리버 모듈 중 하나인 MilvusRM을 사용하여 RAG 프로그램을 최적화하는 방법을 설명합니다.
title: Milvus와 DSPy 통합
---
<h1 id="Integrate-Milvus-with-DSPy" class="common-anchor-header">Milvus와 DSPy 통합<button data-href="#Integrate-Milvus-with-DSPy" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_and_DSPy.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_and_DSPy.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h2 id="What-is-DSPy" class="common-anchor-header">DSPy란?<button data-href="#What-is-DSPy" class="anchor-icon" translate="no">
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
    </button></h2><p>스탠포드 NLP 그룹에서 도입한 DSPy는 언어 모델 내에서 프롬프트와 가중치를 최적화하도록 설계된 획기적인 프로그래밍 프레임워크로, 특히 대규모 언어 모델(LLM)이 파이프라인의 여러 단계에 걸쳐 통합되는 시나리오에서 유용합니다. 수동 제작 및 조정에 의존하는 기존의 프롬프트 엔지니어링 기법과 달리 DSPy는 학습 기반 접근 방식을 채택합니다. 쿼리-응답 예시를 흡수함으로써 DSPy는 특정 작업에 맞게 최적화된 프롬프트를 동적으로 생성합니다. 이 혁신적인 방법론을 통해 전체 파이프라인을 원활하게 재조립할 수 있으므로 프롬프트를 지속적으로 수동으로 조정할 필요가 없습니다. DSPy의 파이토닉 구문은 다양한 컴포저블 및 선언적 모듈을 제공하여 LLM의 인스트럭션을 간소화합니다.</p>
<h2 id="Benefits-of-using-DSPy" class="common-anchor-header">DSPy 사용의 이점<button data-href="#Benefits-of-using-DSPy" class="anchor-icon" translate="no">
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
<li>프로그래밍 접근 방식: DSPy는 단순히 LLM에 명령을 내리는 대신 파이프라인을 텍스트 변환 그래프로 추상화하여 LM 파이프라인 개발을 위한 체계적인 프로그래밍 접근 방식을 제공합니다. 선언적 모듈을 통해 구조화된 설계와 최적화가 가능하므로 기존 프롬프트 템플릿의 시행착오적인 방식을 대체할 수 있습니다.</li>
<li>성능 향상: DSPy는 기존 방식에 비해 상당한 성능 향상을 보여줍니다. 사례 연구를 통해 표준 프롬프트 및 전문가가 만든 데모보다 성능이 뛰어나며, 더 작은 LM 모델에 컴파일된 경우에도 그 다양성과 효율성을 보여줍니다.</li>
<li>모듈화된 추상화: DSPy는 분해, 미세 조정 및 모델 선택과 같은 LM 파이프라인 개발의 복잡한 측면을 효과적으로 추상화합니다. DSPy를 사용하면 간결한 프로그램을 GPT-4, Llama2-13b 또는 T5-base와 같은 다양한 모델에 대한 지침으로 원활하게 변환하여 개발을 간소화하고 성능을 향상시킬 수 있습니다.</li>
</ul>
<h2 id="Modules" class="common-anchor-header">모듈<button data-href="#Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>LLM 파이프라인을 구성하는 데 기여하는 수많은 구성 요소가 있습니다. 여기에서는 DSPy의 작동 방식을 개략적으로 이해할 수 있도록 몇 가지 주요 구성 요소에 대해 설명합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/dspy-01.png" alt="DSPy Modules" class="doc-image" id="dspy-modules" />
   </span> <span class="img-wrapper"> <span>DSPy 모듈</span> </span></p>
<p>시그니처: DSPy의 시그니처는 모듈의 입출력 동작을 설명하는 선언적 사양으로, 작업 실행에서 언어 모델을 안내하는 역할을 합니다. 모듈: DSPy 모듈은 언어 모델(LM)을 활용하는 프로그램의 기본 구성 요소 역할을 합니다. 모듈은 연쇄 사고 또는 ReAct와 같은 다양한 프롬프트 기법을 추상화하며 모든 DSPy 서명을 처리하도록 조정할 수 있습니다. 학습 가능한 매개변수와 입력을 처리하고 출력을 생성하는 기능을 갖춘 이러한 모듈을 결합하여 더 큰 프로그램을 구성할 수 있으며, PyTorch의 NN 모듈에서 영감을 얻었지만 LM 애플리케이션에 맞게 조정되었습니다. 옵티마이저: DSPy의 최적화 도구는 프롬프트 및 LLM 가중치와 같은 DSPy 프로그램의 파라미터를 미세 조정하여 정확도와 같은 지정된 메트릭을 최대화하여 프로그램 효율성을 향상시킵니다.</p>
<h2 id="Why-Milvus-in-DSPy" class="common-anchor-header">왜 밀버스가 필요한가?<button data-href="#Why-Milvus-in-DSPy" class="anchor-icon" translate="no">
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
    </button></h2><p>DSPy는 RAG 애플리케이션을 강화하는 강력한 프로그래밍 프레임워크입니다. 이러한 애플리케이션은 답변 품질을 향상시키기 위해 유용한 정보를 검색해야 하며, 이를 위해서는 벡터 데이터베이스가 필요합니다. Milvus는 성능과 확장성을 개선하기 위해 잘 알려진 오픈 소스 벡터 데이터베이스입니다. DSPy의 리트리버 모듈인 MilvusRM을 사용하면 Milvus를 원활하게 통합할 수 있습니다. 이제 개발자는 Milvus의 강력한 벡터 검색 기능을 활용하여 DSPy를 사용해 RAG 프로그램을 쉽게 정의하고 최적화할 수 있습니다. 이러한 협업으로 RAG 애플리케이션의 효율성과 확장성이 더욱 향상되어 DSPy의 프로그래밍 기능과 Milvus의 검색 기능을 결합할 수 있습니다.</p>
<h2 id="Examples" class="common-anchor-header">예제<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>이제 DSPy에서 Milvus를 활용하여 RAG 애플리케이션을 최적화하는 방법을 보여주는 간단한 예제를 살펴보겠습니다.</p>
<h3 id="Prerequisites" class="common-anchor-header">전제 조건</h3><p>RAG 앱을 빌드하기 전에 DSPy와 PyMilvus를 설치하세요.</p>
<pre><code translate="no" class="language-python">$ pip install <span class="hljs-string">&quot;dspy-ai[milvus]&quot;</span>
$ pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Google Colab을 사용하는 경우 방금 설치한 종속성을 활성화하려면 **런타임을 다시 시작**해야 할 수 있습니다(화면 상단의 "런타임" 메뉴를 클릭하고 드롭다운 메뉴에서 "세션 다시 시작"을 선택합니다).</div>
<h3 id="Loading-the-dataset" class="common-anchor-header">데이터 세트 로드하기</h3><p>이 예에서는 복잡한 질문-답변 쌍의 모음인 HotPotQA를 훈련 데이터셋으로 사용합니다. HotPotQA 클래스를 통해 로드할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.datasets <span class="hljs-keyword">import</span> HotPotQA

<span class="hljs-comment"># Load the dataset.</span>
dataset = HotPotQA(
    train_seed=<span class="hljs-number">1</span>, train_size=<span class="hljs-number">20</span>, eval_seed=<span class="hljs-number">2023</span>, dev_size=<span class="hljs-number">50</span>, test_size=<span class="hljs-number">0</span>
)

<span class="hljs-comment"># Tell DSPy that the &#x27;question&#x27; field is the input. Any other fields are labels and/or metadata.</span>
trainset = [x.with_inputs(<span class="hljs-string">&quot;question&quot;</span>) <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> dataset.train]
devset = [x.with_inputs(<span class="hljs-string">&quot;question&quot;</span>) <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> dataset.dev]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Ingest-data-into-the-Milvus-vector-database" class="common-anchor-header">Milvus 벡터 데이터베이스로 데이터 수집하기</h3><p>벡터 검색을 위해 Milvus 컬렉션에 컨텍스트 정보를 수집합니다. 이 컬렉션에는 <code translate="no">embedding</code> 필드와 <code translate="no">text</code> 필드가 있어야 합니다. 이 경우 기본 쿼리 임베딩 함수로 OpenAI의 <code translate="no">text-embedding-3-small</code> 모델을 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> requests
<span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;&lt;YOUR_OPENAI_API_KEY&gt;&quot;</span>
MILVUS_URI = <span class="hljs-string">&quot;example.db&quot;</span>
MILVUS_TOKEN = <span class="hljs-string">&quot;&quot;</span>

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Collection
<span class="hljs-keyword">from</span> dspy.retrieve.milvus_rm <span class="hljs-keyword">import</span> openai_embedding_function

client = MilvusClient(uri=MILVUS_URI, token=MILVUS_TOKEN)

<span class="hljs-keyword">if</span> <span class="hljs-string">&quot;dspy_example&quot;</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> client.list_collections():
    client.create_collection(
        collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
        overwrite=<span class="hljs-literal">True</span>,
        dimension=<span class="hljs-number">1536</span>,
        primary_field_name=<span class="hljs-string">&quot;id&quot;</span>,
        vector_field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
        id_type=<span class="hljs-string">&quot;int&quot;</span>,
        metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
        max_length=<span class="hljs-number">65535</span>,
        enable_dynamic=<span class="hljs-literal">True</span>,
    )
text = requests.get(
    <span class="hljs-string">&quot;https://raw.githubusercontent.com/wxywb/dspy_dataset_sample/master/sample_data.txt&quot;</span>
).text

<span class="hljs-keyword">for</span> idx, passage <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(text.split(<span class="hljs-string">&quot;\n&quot;</span>)):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(passage) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">continue</span>
    client.insert(
        collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
        data=[
            {
                <span class="hljs-string">&quot;id&quot;</span>: idx,
                <span class="hljs-string">&quot;embedding&quot;</span>: openai_embedding_function(passage)[<span class="hljs-number">0</span>],
                <span class="hljs-string">&quot;text&quot;</span>: passage,
            }
        ],
    )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-MilvusRM" class="common-anchor-header">MilvusRM을 정의합니다.</h3><p>이제 MilvusRM을 정의해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.retrieve.milvus_rm <span class="hljs-keyword">import</span> MilvusRM
<span class="hljs-keyword">import</span> dspy

retriever_model = MilvusRM(
    collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
    uri=MILVUS_URI,
    token=MILVUS_TOKEN,  <span class="hljs-comment"># ignore this if no token is required for Milvus connection</span>
    embedding_function=openai_embedding_function,
)
turbo = dspy.OpenAI(model=<span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>)
dspy.settings.configure(lm=turbo)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Building-signatures" class="common-anchor-header">서명 구축</h3><p>이제 데이터를 로드했으므로 파이프라인의 하위 작업에 대한 시그니처를 정의해 보겠습니다. 간단한 입력 <code translate="no">question</code> 과 출력 <code translate="no">answer</code> 을 식별할 수 있지만, 우리는 RAG 파이프라인을 구축하고 있으므로 Milvus에서 컨텍스트 정보를 검색할 것입니다. 따라서 서명을 <code translate="no">context, question --&gt; answer</code> 로 정의해 보겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">GenerateAnswer</span>(dspy.Signature):
    <span class="hljs-string">&quot;&quot;&quot;Answer questions with short factoid answers.&quot;&quot;&quot;</span>

    context = dspy.InputField(desc=<span class="hljs-string">&quot;may contain relevant facts&quot;</span>)
    question = dspy.InputField()
    answer = dspy.OutputField(desc=<span class="hljs-string">&quot;often between 1 and 5 words&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">context</code> 및 <code translate="no">answer</code> 필드에 대한 간단한 설명을 추가하여 모델이 수신하고 생성할 내용에 대한 보다 명확한 지침을 정의합니다.</p>
<h3 id="Building-the-pipeline" class="common-anchor-header">파이프라인 구축하기</h3><p>이제 RAG 파이프라인을 정의해 보겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RAG</span>(dspy.Module):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, rm</span>):
        <span class="hljs-built_in">super</span>().__init__()
        <span class="hljs-variable language_">self</span>.retrieve = rm

        <span class="hljs-comment"># This signature indicates the task imposed on the COT module.</span>
        <span class="hljs-variable language_">self</span>.generate_answer = dspy.ChainOfThought(GenerateAnswer)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">forward</span>(<span class="hljs-params">self, question</span>):
        <span class="hljs-comment"># Use milvus_rm to retrieve context for the question.</span>
        context = <span class="hljs-variable language_">self</span>.retrieve(question).passages
        <span class="hljs-comment"># COT module takes &quot;context, query&quot; and output &quot;answer&quot;.</span>
        prediction = <span class="hljs-variable language_">self</span>.generate_answer(context=context, question=question)
        <span class="hljs-keyword">return</span> dspy.Prediction(
            context=[item.long_text <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> context], answer=prediction.answer
        )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Executing-the-pipeline-and-getting-the-results" class="common-anchor-header">파이프라인 실행 및 결과 가져오기</h3><p>이제 RAG 파이프라인을 구축했습니다. 이제 실행하여 결과를 확인해 보겠습니다.</p>
<pre><code translate="no" class="language-python">rag = RAG(retriever_model)
<span class="hljs-built_in">print</span>(rag(<span class="hljs-string">&quot;who write At My Window&quot;</span>).answer)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Townes Van Zandt
</code></pre>
<p>데이터 세트에 대한 정량적 결과를 평가할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.evaluate.evaluate <span class="hljs-keyword">import</span> Evaluate
<span class="hljs-keyword">from</span> dspy.datasets <span class="hljs-keyword">import</span> HotPotQA

evaluate_on_hotpotqa = Evaluate(
    devset=devset, num_threads=<span class="hljs-number">1</span>, display_progress=<span class="hljs-literal">False</span>, display_table=<span class="hljs-number">5</span>
)

metric = dspy.evaluate.answer_exact_match
score = evaluate_on_hotpotqa(rag, metric=metric)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;rag:&quot;</span>, score)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optimizing-the-pipeline" class="common-anchor-header">파이프라인 최적화하기</h3><p>이 프로그램을 정의한 후 다음 단계는 컴파일입니다. 이 프로세스는 성능을 향상시키기 위해 각 모듈 내의 매개변수를 업데이트합니다. 컴파일 프로세스는 세 가지 중요한 요소에 따라 달라집니다:</p>
<ul>
<li>훈련 세트: 이 데모에서는 학습 데이터 세트의 20개 질문-답변 예시를 활용하겠습니다.</li>
<li>검증 메트릭: 간단한 <code translate="no">validate_context_and_answer</code> 메트릭을 설정합니다. 이 메트릭은 예측된 답변의 정확성을 검증하고 검색된 컨텍스트에 해당 답변이 포함되어 있는지 확인합니다.</li>
<li>특정 옵티마이저(텔레프롬프터): DSPy의 컴파일러에는 프로그램을 효과적으로 최적화하도록 설계된 여러 텔레프롬프터가 통합되어 있습니다.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.teleprompt <span class="hljs-keyword">import</span> BootstrapFewShot

<span class="hljs-comment"># Validation logic: check that the predicted answer is correct.# Also check that the retrieved context does contain that answer.</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">validate_context_and_answer</span>(<span class="hljs-params">example, pred, trace=<span class="hljs-literal">None</span></span>):
    answer_EM = dspy.evaluate.answer_exact_match(example, pred)
    answer_PM = dspy.evaluate.answer_passage_match(example, pred)
    <span class="hljs-keyword">return</span> answer_EM <span class="hljs-keyword">and</span> answer_PM


<span class="hljs-comment"># Set up a basic teleprompter, which will compile our RAG program.</span>
teleprompter = BootstrapFewShot(metric=validate_context_and_answer)

<span class="hljs-comment"># Compile!</span>
compiled_rag = teleprompter.<span class="hljs-built_in">compile</span>(rag, trainset=trainset)

<span class="hljs-comment"># Now compiled_rag is optimized and ready to answer your new question!</span>
<span class="hljs-comment"># Now, let’s evaluate the compiled RAG program.</span>
score = evaluate_on_hotpotqa(compiled_rag, metric=metric)
<span class="hljs-built_in">print</span>(score)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;compile_rag:&quot;</span>, score)
<button class="copy-code-btn"></button></code></pre>
<p>Ragas 점수가 이전 값인 50.0에서 52.0으로 증가하여 답변 품질이 향상되었음을 나타냅니다.</p>
<h2 id="Summary" class="common-anchor-header">요약<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>DSPy는 모델 프롬프트와 가중치의 알고리즘 및 자동 최적화를 용이하게 하는 프로그래밍 가능한 인터페이스를 통해 언어 모델 상호 작용의 비약적인 발전을 이루었습니다. RAG 구현에 DSPy를 활용하면 다양한 언어 모델이나 데이터 세트에 쉽게 적응할 수 있어 지루한 수동 개입의 필요성을 크게 줄일 수 있습니다.</p>
