---
id: hugging-face-ranker.md
title: Hugging Face RankerCompatible with Milvus v2.6.20+
summary: 이 주제에서는 호스팅된 Hugging Face 문장 유사도 모델을 사용하여 Milvus 검색 결과의 순위를 재조정하는 방법을 설명합니다.
beta: Milvus v2.6.20+
---
<h1 id="Hugging-Face-Ranker" class="common-anchor-header">Hugging Face Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.20+</span><button data-href="#Hugging-Face-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>벡터 검색은 벡터 거리에 따라 결과를 정렬하지만, 초기 순서는 각 후보 텍스트가 쿼리에 얼마나 잘 부합하는지를 반영하지 못할 수 있습니다. Hugging Face Ranker는 쿼리와 후보 텍스트를 호스팅된 <a href="https://huggingface.co/docs/inference-providers/index">Hugging Face 추론 제공자(Inference Providers</a> )로 전송하고, 벡터 유사도 점수( <code translate="no">sentence-similarity</code> )를 사용하여 Milvus가 반환한 후보들의 순서를 재정렬합니다.</p>
<p>이 통합 기능은 호스팅된 Hugging Face 라우터를 사용합니다. 별도로 배포된 텍스트 임베딩 추론(TEI) 서비스를 사용하여 재순위를 지정하려면 <a href="/docs/ko/v2.6.x/tei-ranker.md">TEI Ranker를</a> 참조하십시오.</p>
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
<li>이 함수는 <code translate="no">input_field_names</code> 에서 null이 허용되지 않는 <code translate="no">VARCHAR</code> 필드를 정확히 하나만 참조해야 합니다.</li>
<li><code translate="no">queries</code> 에 포함된 문자열의 개수는 검색 쿼리(<code translate="no">nq</code>)의 개수와 동일해야 합니다.</li>
</ul>
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/hugging-face-ranker-flow.png" alt="Hugging Face Ranker workflow" class="doc-image" id="hugging-face-ranker-workflow" /> 
   <span>Hugging Face Ranker 워크플로우</span>
  
 </span></p>
<p>Hugging Face Ranker는 초기 벡터 검색이 완료된 후 실행됩니다:</p>
<ol>
<li><strong>후보 엔티티를 검색합니다.</strong> Milvus는 구성된 벡터 필드를 검색하여 후보 엔티티를 수집합니다.</li>
<li><strong>재순위를 위한 텍스트 준비.</strong> 이 함수는 <code translate="no">params.queries</code> 에서 쿼리 텍스트를, <code translate="no">input_field_names</code> 에 지정된 <code translate="no">VARCHAR</code> 필드에서 후보 텍스트를 읽어들입니다.</li>
<li><strong>유사도 점수 요청.</strong> Milvus는 <code translate="no">hf-inference</code> 를 통해 <code translate="no">source_sentence</code> 로 쿼리를, <code translate="no">sentences</code> 로 후보 텍스트를 Hugging Face <code translate="no">sentence-similarity</code> 파이프라인으로 전송합니다.</li>
<li><strong>후보 텍스트의 순위를 재조정합니다.</strong> Hugging Face는 후보 텍스트당 하나의 점수를 반환합니다. Milvus는 점수가 높은 순서대로 후보 텍스트를 정렬하여 재순위화된 결과를 반환합니다.</li>
</ol>
<p><strong>유사도 점수 계산 방식</strong></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/hugging-face-ranker-scoring.png" alt="How Hugging Face Ranker calculates similarity scores" class="doc-image" id="how-hugging-face-ranker-calculates-similarity-scores" /> 
   <span>Hugging Face Ranker가 유사도 점수를 계산하는 방식</span>
  
 </span></p>
<p>Hugging Face 모델은 다음 세 단계에 걸쳐 점수를 계산합니다:</p>
<ol>
<li><strong>텍스트 입력 데이터를 준비합니다.</strong> Ranker는 <code translate="no">params.queries</code> 에서 쿼리 텍스트를, 구성된 <code translate="no">VARCHAR</code> 필드에서 후보 텍스트를 읽어들입니다.</li>
<li><strong>별도의 모델 표현 생성.</strong> Milvus는 쿼리를 <code translate="no">source_sentence</code> 로, 후보 텍스트를 <code translate="no">sentences</code> 로 전송합니다. 모델은 내부적으로 쿼리와 각 후보를 별도로 인코딩합니다.</li>
<li><strong>점수를 비교하고 반환합니다.</strong> 모델은 쿼리 표현과 각 후보 표현을 비교하여 후보마다 하나의 유사도 점수를 반환합니다.</li>
</ol>
<p>Hugging Face 모델이 사용하는 임베딩 또는 표현은 모델 처리 과정의 중간 단계입니다. Hugging Face는 벡터가 아닌 점수를 반환합니다. 따라서 초기 벡터 검색과 모델 재순위는 별도의 표현을 사용하며, 서로 다른 모델을 사용할 수도 있습니다.</p>
<h2 id="Before-you-start" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Hugging Face Ranker를 사용하기 전에 다음을 확인하십시오:</p>
<ul>
<li>2.6 릴리스 라인의 Milvus 2.6.20 이상.</li>
<li>PyMilvus 2.6.16 이상.</li>
<li>추론 제공자(Inference Providers)를 호출할 수 있는 Hugging Face 사용자 액세스 토큰.</li>
<li><code translate="no">hf-inference</code> 에서 현재 <a href="https://huggingface.co/tasks/sentence-similarity"><code translate="no">sentence-similarity</code></a> 해당 태스크에 대해 xml-ph-0000@deepl.internal에서 현재 제공 중인 모델.</li>
<li><code translate="no">VARCHAR</code> 의 null 허용되지 않는 필드에 후보 텍스트를 저장하는 컬렉션.</li>
</ul>
<div class="alert note">
<p>Milvus는 Hugging Face 모델이 <code translate="no">hf-inference</code> 을 통해 계속 사용 가능한지, 또는 해당 모델이 사용자의 안정성, 지연 시간 및 출력 품질 요구 사항을 충족하는지 여부를 제어하지 않습니다. 프로덕션 환경에서 사용하기 전에 Hugging Face에서 모델을 확인하고 사용자의 워크로드에 대해 평가하십시오.</p>
</div>
<p>이 예제에서는 <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"><code translate="no">sentence-transformers/all-MiniLM-L6-v2</code></a> 단순히 구성을 보여주기 위한 목적으로만 사용됩니다. 이 모델은 Milvus의 권장 사항이나 인증을 의미하지 않습니다.</p>
<h2 id="Configure-credentials" class="common-anchor-header">인증 정보 구성<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">milvus.yaml</code> 에서 또는 환경 변수를 통해 Hugging Face 사용자 액세스 토큰을 구성할 수 있습니다.</p>
<p>인증 정보의 우선순위는 다음과 같습니다.</p>
<pre><code translate="no" class="language-text">Function credential label -&gt; provider credential label in milvus.yaml -&gt; environment variable
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">옵션 1: 구성 파일<button data-href="#Option-1-Configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">credential</code> 섹션의 최상위 수준에서 토큰을 정의한 다음, Hugging Face 랭커 제공자를 해당 자격 증명 레이블로 지정합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">huggingface_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">rerank:</span>
    <span class="hljs-attr">model:</span>
      <span class="hljs-attr">providers:</span>
        <span class="hljs-attr">huggingface:</span>
          <span class="hljs-attr">credential:</span> <span class="hljs-string">huggingface_apikey</span>
          <span class="hljs-comment"># url: https://router.huggingface.co</span>
<button class="copy-code-btn"></button></code></pre>
<p>함수(Function) 수준의 <code translate="no">credential</code> 매개변수는 제공자(provider) 수준의 레이블을 재정의할 수 있습니다. 이 매개변수의 값은 토큰 자체가 아니라 <code translate="no">milvus.yaml</code> 에 정의된 자격 증명 레이블이어야 합니다.</p>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">옵션 2: 환경 변수<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>함수나 제공자 구성 모두에서 자격 증명 레이블이 지정되지 않은 경우, Milvus 서비스 환경에서 ` <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> `을 설정하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-attr">MILVUS_HUGGINGFACE_API_KEY:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Hugging-Face-Ranker" class="common-anchor-header">Hugging Face Ranker 사용<button data-href="#Use-Hugging-Face-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Hugging Face Ranker는 검색 시점에 정의되고 적용됩니다. 컬렉션 스키마를 변경하지 않고도 각 검색마다 랭커를 변경하거나 생략할 수 있습니다.</p>
<h3 id="Step-1-Prepare-a-collection" class="common-anchor-header">1단계: 컬렉션 준비<button data-href="#Step-1-Prepare-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 예제는 재순위를 위한 텍스트 필드와 초기 검색을 위한 벡터 필드가 포함된 컬렉션을 생성합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;hugging_face_rerank_demo&quot;</span>
schema = client.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Recent renewable energy developments include improved solar efficiency.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.40</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Climate policy and carbon markets have evolved rapidly in recent years.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.39</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;New battery technology helps stabilize wind and solar power generation.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.90</span>, <span class="hljs-number">0.10</span>, <span class="hljs-number">0.05</span>, <span class="hljs-number">0.02</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Vector databases support similarity search for machine learning applications.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.01</span>, <span class="hljs-number">0.02</span>, <span class="hljs-number">0.03</span>, <span class="hljs-number">0.04</span>],
        },
    ],
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Define-the-rerank-Function" class="common-anchor-header">2단계: 재순위 지정 함수 정의<button data-href="#Step-2-Define-the-rerank-Function" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">document</code> 에서 후보 텍스트를 읽고 <code translate="no">queries</code> 의 쿼리 텍스트를 사용하는 <code translate="no">RERANK</code> 함수를 정의합니다:</p>
<pre><code translate="no" class="language-python">hugging_face_ranker = Function(
    name=<span class="hljs-string">&quot;hugging_face_semantic_ranker&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    function_type=FunctionType.RERANK,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;huggingface&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;hf_provider&quot;</span>: <span class="hljs-string">&quot;hf-inference&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;huggingface_apikey&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    },</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>프로바이더 수준의 자격 증명이나 환경 변수만 사용하는 경우, 함수 매개변수에서 ` <code translate="no">credential</code> `를 생략하십시오.</p>
<p>다음 표는 Hugging Face Ranker 매개변수에 대해 설명합니다:</p>
<table>
<thead>
<tr><th>매개변수</th><th>필수?</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">reranker</code></td><td>예</td><td>재순위 지정 구현. 이 값을 ` <code translate="no">model</code>`로 설정하십시오.</td></tr>
<tr><td><code translate="no">provider</code></td><td>예</td><td>모델 제공자입니다. 이 값을 <code translate="no">huggingface</code> 로 설정하십시오.</td></tr>
<tr><td><code translate="no">model_name</code></td><td>예</td><td><code translate="no">sentence-similarity</code> 태스크를 위해 <code translate="no">hf-inference</code> 을 통해 제공되는 모델의 Hugging Face 모델 ID입니다.</td></tr>
<tr><td><code translate="no">queries</code></td><td>예</td><td>재순위 지정에 사용되는 쿼리 문자열입니다. 초기 검색에 쿼리 벡터가 사용되는 경우에도 검색 쿼리당 정확히 하나의 문자열을 제공해야 합니다.</td></tr>
<tr><td><code translate="no">hf_provider</code></td><td>아니요</td><td>Hugging Face 추론 제공자 경로입니다. Milvus 2.6.20에서 기본값이자 유일하게 지원되는 값은 <code translate="no">hf-inference</code> 입니다.</td></tr>
<tr><td><code translate="no">credential</code></td><td>아니요</td><td><code translate="no">milvus.yaml</code> 의 최상위 <code translate="no">credential</code> 섹션에 정의된 자격 증명의 레이블입니다. 이 값은 토큰 자체가 아닙니다.</td></tr>
<tr><td><code translate="no">max_client_batch_size</code></td><td>아니요</td><td>Hugging Face 요청 한 번에 전송되는 후보 텍스트의 최대 개수입니다. 기본값은 <code translate="no">32</code> 이며, 이 값은 <code translate="no">0</code> 보다 커야 합니다.</td></tr>
</tbody>
</table>
<h3 id="Step-3-Search-with-the-ranker" class="common-anchor-header">3단계: 랭커를 사용하여 검색하기<button data-href="#Step-3-Search-with-the-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">search()</code> 의 <code translate="no">ranker</code> 매개변수를 통해 함수를 전달합니다:</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.41</span>]

results = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
<span class="highlighted-wrapper-line">    ranker=hugging_face_ranker,</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus는 먼저 <code translate="no">dense</code> 에서 후보를 검색한 다음, <code translate="no">queries</code> 의 쿼리 텍스트와 <code translate="no">document</code> 의 후보 텍스트를 사용하여 문장 유사도 점수를 계산합니다. 반환된 후보는 Hugging Face 점수 순으로 정렬됩니다.</p>
<h2 id="Troubleshooting" class="common-anchor-header">문제 해결<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="The-model-is-unavailable-for-sentence-similarity" class="common-anchor-header">문장 유사도 모델 사용 불가<button data-href="#The-model-is-unavailable-for-sentence-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>Hugging Face에서 모델 페이지를 열고 <strong>‘Inference Providers’</strong> 섹션을 확인하십시오. <code translate="no">hf-inference</code> 가 <code translate="no">sentence-similarity</code> 에 대한 모델을 제공하는지 확인하십시오. 그렇지 않은 경우, 해당 작업을 지원하는 다른 모델을 선택하십시오.</p>
<h3 id="The-number-of-query-strings-does-not-match-the-search-request" class="common-anchor-header">쿼리 문자열의 개수가 검색 요청과 일치하지 않습니다<button data-href="#The-number-of-query-strings-does-not-match-the-search-request" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">queries</code> 에 포함된 문자열의 개수는 검색 쿼리(<code translate="no">nq</code>)의 개수와 정확히 일치해야 합니다. 쿼리 벡터가 하나인 검색의 경우, 쿼리 문자열을 정확히 하나만 제공하십시오.</p>
<h3 id="Candidate-text-is-missing-or-nullable" class="common-anchor-header">후보 텍스트가 누락되었거나 null 허용 값입니다<button data-href="#Candidate-text-is-missing-or-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">input_field_names</code> 에 null이 허용되지 않는 <code translate="no">VARCHAR</code> 필드가 정확히 하나 포함되어 있는지, 그리고 모든 후보 엔티티가 해당 필드에 텍스트를 포함하고 있는지 확인하십시오.</p>
<h3 id="Milvus-reports-missing-Hugging-Face-credentials" class="common-anchor-header">Milvus에서 Hugging Face 자격 증명 누락 오류 보고<button data-href="#Milvus-reports-missing-Hugging-Face-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">milvus.yaml</code> 에 Function 자격 증명 레이블이 존재하는지, 공급자 수준 레이블이 유효한지, 또는 Milvus 서비스 환경에 <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> 가 존재하는지 확인하십시오.</p>
<h2 id="Next-steps" class="common-anchor-header">다음 단계<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li>모델 랭커의 동작 및 제한 사항에 대해서는 <a href="/docs/ko/v2.6.x/model-ranker-overview.md">‘모델 랭커 개요’를</a> 참조하십시오.</li>
<li>호스팅된 Hugging Face 추론 제공자를 통해 임베딩을 생성하려면 <a href="/docs/ko/v2.6.x/hugging-face.md">Hugging Face를</a> 참조하십시오.</li>
<li>랭커를 하이브리드 검색에 적용하려면 <a href="/docs/ko/v2.6.x/multi-vector-search.md">‘다중 벡터 하이브리드 검색’을</a> 참조하십시오.</li>
</ul>
