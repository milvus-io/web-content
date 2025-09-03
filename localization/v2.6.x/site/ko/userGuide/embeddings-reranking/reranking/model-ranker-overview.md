---
id: model-ranker-overview.md
title: 모델 랭커 개요Compatible with Milvus 2.6.x
summary: >-
  기존의 벡터 검색은 순전히 수학적 유사성, 즉 고차원 공간에서 벡터가 얼마나 일치하는지에 따라 결과의 순위를 매깁니다. 이 접근 방식은
  효율적이기는 하지만 진정한 의미적 관련성을 놓치는 경우가 많습니다. '데이터베이스 최적화를 위한 모범 사례'를 검색한다고 생각해 보세요.
  이러한 용어가 자주 언급되는 벡터 유사도가 높은 문서를 받을 수 있지만 실제로 실행 가능한 최적화 전략을 제공하지는 않을 수 있습니다.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">모델 랭커 개요<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>기존의 벡터 검색은 순전히 수학적 유사성, 즉 고차원 공간에서 벡터가 얼마나 가깝게 일치하는지에 따라 결과의 순위를 매깁니다. 이 접근 방식은 효율적이기는 하지만 진정한 의미적 관련성을 놓치는 경우가 많습니다. <strong>'데이터베이스 최적화를 위한 모범 사례'를</strong> 검색한다고 생각해 보세요. 이러한 용어가 자주 언급되는 벡터 유사도가 높은 문서가 있지만 실제로 실행 가능한 최적화 전략을 제공하지는 않을 수 있습니다.</p>
<p>모델 랭커는 쿼리와 문서 간의 의미 관계를 이해하는 고급 언어 모델을 통합하여 Milvus 검색을 혁신합니다. 벡터 유사도에만 의존하는 대신 콘텐츠의 의미와 문맥을 평가하여 보다 지능적이고 관련성 높은 결과를 제공합니다.</p>
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
<li><p>모델 랭커는 그룹화 검색에는 사용할 수 없습니다.</p></li>
<li><p>모델 재랭크에 사용되는 필드는 텍스트 유형이어야 합니다(<code translate="no">VARCHAR</code>).</p></li>
<li><p>각 모델 랭커는 한 번에 하나의 <code translate="no">VARCHAR</code> 필드만 평가에 사용할 수 있습니다.</p></li>
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
    </button></h2><p>모델 랭커는 잘 정의된 워크플로우를 통해 언어 모델 이해 기능을 Milvus 검색 프로세스에 통합합니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" />
   </span> <span class="img-wrapper"> <span>모델 랭커 개요</span> </span></p>
<ol>
<li><p><strong>초기 쿼리</strong>: 애플리케이션이 Milvus에 쿼리를 보냅니다.</p></li>
<li><p><strong>벡터 검색</strong>: Milvus는 표준 벡터 검색을 수행하여 후보 문서를 식별합니다.</p></li>
<li><p><strong>후보 검색</strong>: 시스템이 벡터 유사성을 기반으로 초기 후보 문서 세트를 식별합니다.</p></li>
<li><p><strong>모델 평가</strong>: 모델 랭커 함수는 쿼리-문서 쌍을 처리합니다:</p>
<ul>
<li><p>원본 쿼리와 후보 문서를 외부 모델 서비스로 전송합니다.</p></li>
<li><p>언어 모델은 쿼리와 각 문서 간의 의미적 관련성을 평가합니다.</p></li>
<li><p>각 문서는 의미적 이해도를 기반으로 관련성 점수를 받습니다.</p></li>
</ul></li>
<li><p><strong>지능형 재순위 지정</strong>: 모델에서 생성된 관련성 점수를 기반으로 문서 순서가 재조정됩니다.</p></li>
<li><p><strong>향상된 결과</strong>: 애플리케이션이 벡터 유사도가 아닌 의미론적 관련성에 따라 순위가 매겨진 결과를 받습니다.</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">필요에 맞는 모델 제공업체 선택<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 재랭킹을 위해 다음과 같은 모델 서비스 제공업체를 지원하며, 각각 고유한 특성을 가지고 있습니다:</p>
<table>
   <tr>
     <th><p>제공자</p></th>
     <th><p>최상의 대상</p></th>
     <th><p>특성</p></th>
     <th><p>사용 사례 예시</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>심층적인 의미론적 이해와 사용자 정의가 필요한 복잡한 애플리케이션</p></td>
     <td><ul>
<li><p>다양한 대규모 언어 모델 지원</p></li>
<li><p>유연한 배포 옵션</p></li>
<li><p>더 높은 컴퓨팅 요구 사항</p></li>
<li><p>더 큰 커스터마이징 가능성</p></li>
</ul></td>
     <td><p>법률 용어와 판례 관계를 이해하는 도메인별 모델을 배포하는 법률 연구 플랫폼</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>효율적인 리소스 사용으로 빠른 구현</p></td>
     <td><ul>
<li><p>텍스트 작업에 최적화된 경량 서비스</p></li>
<li><p>더 적은 리소스 요구 사항으로 더 쉬운 배포</p></li>
<li><p>사전 최적화된 리랭킹 모델</p></li>
<li><p>인프라 오버헤드 최소화</p></li>
</ul></td>
     <td><p>표준 요구 사항을 충족하는 효율적인 리랭킹 기능이 필요한 콘텐츠 관리 시스템</p></td>
   </tr>
   <tr>
     <td><p>Cohere</p></td>
     <td><p>안정성과 통합 용이성을 우선시하는 엔터프라이즈 애플리케이션</p></td>
     <td><ul>
<li><p>엔터프라이즈급 안정성 및 확장성</p></li>
<li><p>인프라 유지 관리가 필요 없는 관리형 서비스</p></li>
<li><p>다국어 리랭킹 기능</p></li>
<li><p>기본 제공 속도 제한 및 오류 처리</p></li>
</ul></td>
     <td><p>일관된 API 성능과 다국어 제품 카탈로그를 갖춘 고가용성 검색이 필요한 이커머스 플랫폼</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>특정 성능 및 컨텍스트 요구 사항이 있는 RAG 애플리케이션</p></td>
     <td><ul>
<li><p>리랭크 작업을 위해 특별히 훈련된 모델</p></li>
<li><p>다양한 문서 길이를 위한 세분화된 잘라내기 컨트롤</p></li>
<li><p>프로덕션 워크로드에 최적화된 추론 기능</p></li>
<li><p>여러 모델 변형(재랭크-2, 재랭크-라이트 등)</p></li>
</ul></td>
     <td><p>미세 조정된 성능 제어와 전문화된 의미론적 이해가 필요한 다양한 문서 길이의 연구 데이터베이스</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>비용 효율성에 우선순위를 두고 긴 문서를 처리하는 애플리케이션</p></td>
     <td><ul>
<li><p>구성 가능한 중첩을 통한 고급 문서 청킹</p></li>
<li><p>청크 기반 채점(가장 높은 점수를 받은 청크가 문서 대표)</p></li>
<li><p>다양한 재순위 모델 지원</p></li>
<li><p>표준 및 프로 모델 변형으로 비용 효율적</p></li>
</ul></td>
     <td><p>지능적인 세분화 및 중복 제어가 필요한 긴 매뉴얼과 문서를 처리하는 기술 문서 검색 시스템</p></td>
   </tr>
</table>
<p>각 모델 서비스 구현에 대한 자세한 내용은 전용 설명서를 참조하세요:</p>
<ul>
<li><p><a href="/docs/ko/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/ko/tei-ranker.md">TEI Ranker</a></p></li>
<li><p><a href="/docs/ko/cohere-ranker.md">코히어 랭커</a></p></li>
<li><p><a href="/docs/ko/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/ko/siliconflow-ranker.md">실리콘플로우 랭커</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">구현<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>모델 랭커를 구현하기 전에 다음이 필요한지 확인하세요:</p>
<ul>
<li><p>재랭크할 텍스트가 포함된 <code translate="no">VARCHAR</code> 필드가 있는 Milvus 컬렉션</p></li>
<li><p>Milvus 인스턴스에서 액세스할 수 있는 실행 중인 외부 모델 서비스</p></li>
<li><p>Milvus와 선택한 모델 서비스 간의 적절한 네트워크 연결</p></li>
</ul>
<p>모델 랭커는 표준 벡터 검색 및 하이브리드 검색 작업 모두와 원활하게 통합됩니다. 구현에는 재랭크 구성을 정의하는 함수 객체를 생성하고 이를 검색 작업에 전달하는 작업이 포함됩니다.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">모델 랭커 만들기<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>모델 재랭킹을 구현하려면 먼저 적절한 구성으로 함수 객체를 정의합니다. 이 예에서는 서비스 제공자로 TEI를 사용합니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a model ranker function</span>
model_ranker = Function(
    name=<span class="hljs-string">&quot;semantic_ranker&quot;</span>,  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># VARCHAR field to use for reranking</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,  <span class="hljs-comment"># Specify model reranker. Must be &quot;model&quot;</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot;, &quot;vllm&quot;, etc.</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>필수?</p></th>
     <th><p>설명</p></th>
     <th><p>값/예시</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>예</p></td>
     <td><p>검색을 실행할 때 사용되는 함수의 식별자입니다.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>예</p></td>
     <td><p>재순위에 사용할 텍스트 필드의 이름입니다. <code translate="no">VARCHAR</code> 유형 필드여야 합니다.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>예</p></td>
     <td><p>생성 중인 함수 유형을 지정합니다. 모든 모델 랭커에 대해 <code translate="no">RERANK</code> 로 설정해야 합니다.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>예</p></td>
     <td><p>모델 기반 재랭킹 함수에 대한 구성이 포함된 딕셔너리입니다. 사용 가능한 매개 변수(키)는 서비스 제공업체에 따라 다릅니다.</p></td>
     <td><p>{...}</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>예</p></td>
     <td><p>모델 재랭킹을 사용하려면 <code translate="no">"model"</code> 으로 설정해야 합니다.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>예</p></td>
     <td><p>재랭크에 사용할 모델 서비스 제공업체입니다.</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>예</p></td>
     <td><p>재랭크 모델에서 관련성 점수를 계산하는 데 사용하는 쿼리 문자열의 목록입니다. 쿼리 문자열의 수는 검색 작업의 쿼리 수와 정확히 일치해야 하며(텍스트 대신 쿼리 벡터를 사용하는 경우에도 마찬가지), 그렇지 않으면 오류가 보고됩니다.</p></td>
     <td><p><em>["검색 쿼리"]</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>예</p></td>
     <td><p>모델 서비스의 URL입니다.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>No</p></td>
     <td><p>단일 배치에서 처리할 최대 문서 수입니다. 값이 클수록 처리량은 증가하지만 더 많은 메모리가 필요합니다.</p></td>
     <td><p><code translate="no">32</code> (기본값)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">표준 벡터 검색에 적용<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>모델 랭킹러를 정의한 후 랭킹러 파라미터에 전달하여 검색 작업 중에 적용할 수 있습니다:</p>
<div class="multipleCode">
   <a href="#bash">cURL</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>], <span class="hljs-comment"># Number of queries must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">하이브리드 검색에 적용<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>모델 랭커는 여러 벡터 필드를 결합하는 하이브리드 검색 작업에도 적용할 수 있습니다:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply model ranker to hybrid search</span>
hybrid_results = client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Same model ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
