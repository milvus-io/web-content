---
id: how_to_enhance_your_rag.md
summary: >-
  검색 증강 세대 RAG 애플리케이션의 인기가 높아짐에 따라 성능 향상에 대한 관심이 높아지고 있습니다. 이 문서에서는 RAG 파이프라인을
  최적화할 수 있는 모든 가능한 방법을 제시하고 해당 일러스트레이션을 제공하여 주요 RAG 최적화 전략을 빠르게 이해할 수 있도록
  도와드립니다.
title: RAG 파이프라인의 성능을 향상시키는 방법
---
<h1 id="How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="common-anchor-header">RAG 파이프라인의 성능을 향상시키는 방법<button data-href="#How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>검색 증강 생성<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(RAG)</a> 애플리케이션의 인기가 높아짐에 따라 성능 향상에 대한 관심이 높아지고 있습니다. 이 문서에서는 RAG 파이프라인을 최적화할 수 있는 모든 가능한 방법을 제시하고, 주요 RAG 최적화 전략을 빠르게 이해할 수 있도록 해당 일러스트를 제공합니다.</p>
<p>이러한 전략과 기법이 RAG 시스템에 어떻게 통합되는지에 초점을 맞춰 개략적인 설명만 제공한다는 점에 유의하시기 바랍니다. 그러나 복잡한 세부 사항을 다루거나 단계별 구현 방법을 안내하지는 않습니다.</p>
<h2 id="A-Standard-RAG-Pipeline" class="common-anchor-header">표준 RAG 파이프라인<button data-href="#A-Standard-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 다이어그램은 가장 간단한 바닐라 RAG 파이프라인을 보여줍니다. 먼저, 문서 청크가 벡터 저장소(예: <a href="https://milvus.io/docs">Milvus</a> 또는 <a href="https://zilliz.com/cloud">Zilliz 클라우드</a>)에 로드됩니다. 그런 다음, 벡터 저장소는 쿼리와 관련된 가장 연관성이 높은 상위 K개의 청크를 검색합니다. 그런 다음 이러한 관련 청크가 <a href="https://zilliz.com/glossary/large-language-models-(llms)">LLM의</a> 컨텍스트 프롬프트에 주입되고 마지막으로 LLM이 최종 답변을 반환합니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/vanilla_rag.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Various-Types-of-RAG-Enhancement-Techniques" class="common-anchor-header">다양한 유형의 RAG 향상 기법<button data-href="#Various-Types-of-RAG-Enhancement-Techniques" class="anchor-icon" translate="no">
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
    </button></h2><p>RAG 파이프라인 단계에서의 역할에 따라 다양한 RAG 향상 접근 방식을 분류할 수 있습니다.</p>
<ul>
<li><strong>쿼리 향상</strong>: 쿼리 의도를 더 잘 표현하거나 처리하기 위해 RAG 입력의 쿼리 프로세스를 수정하고 조작하는 것입니다.</li>
<li><strong>색인 개선</strong>: 다중 청킹, 단계별 인덱싱 또는 다방향 인덱싱과 같은 기술을 사용해 청킹 인덱스 생성을 최적화하는 작업입니다.</li>
<li><strong>리트리버 향상</strong>: 검색 프로세스 중에 최적화 기법과 전략을 적용합니다.</li>
<li><strong>생성기 향상</strong>: 더 나은 응답을 제공하기 위해 LLM에 대한 프롬프트를 조립할 때 프롬프트를 조정하고 최적화합니다.</li>
<li><strong>RAG 파이프라인 개선</strong>: 에이전트 또는 도구를 사용하여 RAG 파이프라인의 주요 단계를 최적화하는 등 전체 RAG 파이프라인 내에서 프로세스를 동적으로 전환합니다.</li>
</ul>
<p>다음에서는 각 범주별로 구체적인 방법을 소개합니다.</p>
<h2 id="Query-Enhancement" class="common-anchor-header">쿼리 개선<button data-href="#Query-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>쿼리 환경을 개선하기 위한 효과적인 네 가지 방법을 살펴보겠습니다: 가상의 질문, 가상의 문서 임베딩, 하위 쿼리 및 단계별 프롬프트입니다.</p>
<h3 id="Creating-Hypothetical-Questions" class="common-anchor-header">가상 질문 만들기</h3><p>가상 질문을 만들려면 LLM을 활용하여 사용자가 각 문서 청크 내의 콘텐츠에 대해 물어볼 수 있는 여러 질문을 생성해야 합니다. 사용자의 실제 쿼리가 LLM에 도달하기 전에 벡터 스토어는 해당 문서 청크와 함께 실제 쿼리와 가장 관련성이 높은 가상 질문을 검색하여 LLM으로 전달합니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/hypothetical_question.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>이 방법론은 쿼리 대 쿼리 검색에 직접 관여함으로써 벡터 검색 프로세스에서 도메인 간 비대칭 문제를 우회하여 벡터 검색의 부담을 덜어줍니다. 하지만 가상의 질문을 생성하는 데 추가적인 오버헤드와 불확실성이 발생합니다.</p>
<h3 id="HyDE-Hypothetical-Document-Embeddings" class="common-anchor-header">HyDE(가상 문서 임베딩)</h3><p>HyDE는 가상 문서 임베딩의 약자입니다. 이는 문맥 정보가 없는 사용자 쿼리에 대한 응답으로 '<strong><em>가상의 문서</em></strong>' 또는 <strong><em>가짜</em></strong> 답변을 만들기 위해 LLM을 활용합니다. 그런 다음 이 가짜 답변은 벡터 임베딩으로 변환되어 벡터 데이터베이스 내에서 가장 관련성이 높은 문서 청크를 쿼리하는 데 사용됩니다. 그 후, 벡터 데이터베이스는 가장 관련성이 높은 상위 K개의 문서 청크를 검색하여 LLM과 원래 사용자 쿼리로 전송하여 최종 답변을 생성합니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/hyde.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>이 방법은 벡터 검색에서 도메인 간 비대칭 문제를 해결하는 가상 질문 기법과 유사합니다. 하지만 계산 비용이 추가되고 가짜 답변 생성의 불확실성이 있다는 단점도 있습니다.</p>
<p>자세한 내용은 <a href="https://arxiv.org/abs/2212.10496">HyDE</a> 백서를 참조하세요.</p>
<h3 id="Creating-Sub-Queries" class="common-anchor-header">하위 쿼리 만들기</h3><p>사용자 쿼리가 너무 복잡하면 LLM을 사용하여 쿼리를 벡터 데이터베이스와 LLM에 전달하기 전에 더 간단한 하위 쿼리로 나눌 수 있습니다. 예를 들어 보겠습니다.</p>
<p>&quot;<strong><em>밀버스와 질리즈 클라우드의 기능 차이점은 무엇인가요?</em></strong>&quot; 이 질문은 매우 복잡하고 지식창고에 간단한 답변이 없을 수도 있습니다. 이 문제를 해결하기 위해 이 질문을 두 개의 간단한 하위 질문으로 나눌 수 있습니다:</p>
<ul>
<li>하위 질문 1: "Milvus의 기능은 무엇인가요?"</li>
<li>하위 질문 2: "질리즈 클라우드의 기능은 무엇인가요?"</li>
</ul>
<p>이러한 하위 쿼리가 있으면 벡터 임베딩으로 변환한 후 모두 벡터 데이터베이스로 보냅니다. 그러면 벡터 데이터베이스는 각 하위 쿼리와 가장 연관성이 높은 상위 K 문서 청크를 찾습니다. 마지막으로 LLM은 이 정보를 사용해 더 나은 답변을 생성합니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>사용자 쿼리를 하위 쿼리로 세분화하면 시스템이 관련 정보를 더 쉽게 찾고 복잡한 질문에도 정확한 답변을 제공할 수 있습니다.</p>
<h3 id="Creating-Stepback-Prompts" class="common-anchor-header">단계별 프롬프트 만들기</h3><p>복잡한 사용자 쿼리를 단순화하는 또 다른 방법은 <strong><em>스텝백 프롬프트를</em></strong> 만드는 것입니다. 이 기법은 복잡한 사용자 쿼리를 LLM을 사용하여 <em><em>'</em>스텝백 질문</em>'**으로 추상화하는 것입니다. 그런 다음 벡터 데이터베이스는 이러한 스텝백 질문을 사용하여 가장 관련성이 높은 문서 청크를 검색합니다. 마지막으로 LLM은 이렇게 검색된 문서 청크를 기반으로 보다 정확한 답변을 생성합니다.</p>
<p>이 기술을 예시를 통해 설명해 보겠습니다. 다음 쿼리는 매우 복잡하고 직접 답변하기가 쉽지 않은 쿼리입니다:</p>
<p><strong><em>원래 사용자 쿼리: "100억 개의 레코드가 포함된 데이터 세트가 있는데, 이를 Milvus에 저장하여 쿼리하고 싶습니다. 가능한가요?"</em></strong></p>
<p>이 사용자 쿼리를 단순화하기 위해 LLM을 사용하여 보다 간단한 스텝백 질문을 생성할 수 있습니다:</p>
<p><strong><em>스텝백 질문: "Milvus가 처리할 수 있는 데이터 세트 크기 제한은 얼마인가요?"</em></strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/stepback.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>이 방법을 사용하면 복잡한 쿼리에 대해 더 정확하고 더 나은 답변을 얻을 수 있습니다. 원래의 질문을 더 간단한 형태로 세분화하여 시스템이 관련 정보를 더 쉽게 찾고 정확한 답변을 제공할 수 있도록 합니다.</p>
<h2 id="Indexing-Enhancement" class="common-anchor-header">색인 강화<button data-href="#Indexing-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>색인 강화는 RAG 애플리케이션의 성능을 향상시키기 위한 또 다른 전략입니다. 세 가지 색인 개선 기술을 살펴보겠습니다.</p>
<h3 id="Merging-Document-Chunks-Automatically" class="common-anchor-header">문서 청크 자동 병합</h3><p>색인을 만들 때 자식 청크와 그에 해당하는 부모 청크의 두 가지 세분화 수준을 사용할 수 있습니다. 처음에는 더 세밀한 수준에서 하위 청크를 검색합니다. 그런 다음 병합 전략을 적용합니다. 처음 <strong><em>k개의</em></strong> 자식 청크 중 특정 개수인 <strong><em>n개의</em></strong> 자식 청크가 동일한 상위 청크에 속하는 경우, 이 상위 청크를 컨텍스트 정보로 LLM에 제공합니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/merge_chunks.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>이 방법론은 <a href="https://docs.llamaindex.ai/en/stable/examples/retrievers/recursive_retriever_nodes.html">LlamaIndex에서</a> 구현되었습니다.</p>
<h3 id="Constructing-Hierarchical-Indices" class="common-anchor-header">계층적 인덱스 구축</h3><p>문서에 대한 인덱스를 만들 때, 문서 요약과 문서 청크에 대한 두 가지 수준의 인덱스를 만들 수 있습니다. 벡터 검색 프로세스는 두 단계로 구성됩니다. 처음에는 요약을 기반으로 관련 문서를 필터링하고, 이후에는 이러한 관련 문서 내에서만 해당 문서 청크를 검색합니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/hierarchical_index.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>이 접근 방식은 방대한 데이터 볼륨이나 라이브러리 컬렉션 내의 콘텐츠 검색과 같이 데이터가 계층 구조로 되어 있는 경우에 유용합니다.</p>
<h3 id="Hybrid-Retrieval-and-Reranking" class="common-anchor-header">하이브리드 검색 및 재랭킹</h3><p>하이브리드 검색 및 재랭크 기술은 하나 이상의 보조 검색 방법을 <a href="https://zilliz.com/learn/vector-similarity-search">벡터 유사성 검색과</a> 통합합니다. 그런 다음 <a href="https://zilliz.com/learn/optimize-rag-with-rerankers-the-role-and-tradeoffs#What-is-a-Reranker">재랭커는</a> 검색된 결과의 사용자 쿼리와의 관련성을 기준으로 순위를 다시 매깁니다.</p>
<p>일반적인 보완 검색 알고리즘에는 <a href="https://milvus.io/docs/embed-with-bm25.md">BM25와</a> 같은 어휘 빈도 기반 방법이나 <a href="https://zilliz.com/learn/discover-splade-revolutionize-sparse-data-processing">Splade와</a> 같은 희소 임베딩을 활용하는 빅 모델이 포함됩니다. 순위 재지정 알고리즘에는 RRF 또는 BERT와 유사한 아키텍처인 <a href="https://www.sbert.net/examples/applications/cross-encoder/README.html">Cross-Encoder와</a> 같은 보다 정교한 모델이 포함됩니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>이 접근 방식은 다양한 검색 방법을 활용하여 검색 품질을 개선하고 벡터 리콜의 잠재적인 격차를 해결합니다.</p>
<h2 id="Retriever-Enhancement" class="common-anchor-header">리트리버 개선<button data-href="#Retriever-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>RAG 시스템 내에서 리트리버 구성 요소를 개선하면 RAG 애플리케이션도 개선할 수 있습니다. 리트리버를 향상시키는 몇 가지 효과적인 방법을 살펴보겠습니다.</p>
<h3 id="Sentence-Window-Retrieval" class="common-anchor-header">문장 창 검색</h3><p>기본 RAG 시스템에서 LLM에 제공되는 문서 청크는 검색된 임베딩 청크를 포괄하는 더 큰 창입니다. 이렇게 하면 LLM에 제공되는 정보가 더 넓은 범위의 문맥적 세부 정보를 포함하도록 보장하여 정보 손실을 최소화할 수 있습니다. 문장 창 검색 기술은 임베딩 검색에 사용되는 문서 청크를 LLM에 제공되는 청크에서 분리합니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/sentence_window.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>그러나 창 크기를 확장하면 간섭하는 정보가 추가로 유입될 수 있습니다. 특정 비즈니스 요구사항에 따라 창 확장 크기를 조정할 수 있습니다.</p>
<h3 id="Meta-data-Filtering" class="common-anchor-header">메타 데이터 필터링</h3><p>보다 정확한 답변을 얻기 위해 검색된 문서를 LLM으로 전달하기 전에 시간 및 카테고리와 같은 메타데이터를 필터링하여 검색된 문서를 구체화할 수 있습니다. 예를 들어, 여러 해에 걸친 재무 보고서를 검색하는 경우 원하는 연도를 기준으로 필터링하면 특정 요구 사항을 충족하도록 정보를 세분화할 수 있습니다. 이 방법은 도서관 컬렉션의 콘텐츠 검색과 같이 광범위한 데이터와 상세한 메타데이터가 있는 상황에서 효과적입니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/metadata_filtering.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Generator-Enhancement" class="common-anchor-header">생성기 향상<button data-href="#Generator-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>RAG 시스템 내에서 제너레이터를 개선하여 더 많은 RAG 최적화 기술을 살펴보겠습니다.</p>
<h3 id="Compressing-the-LLM-prompt" class="common-anchor-header">LLM 프롬프트 압축</h3><p>검색된 문서 청크 내의 노이즈 정보는 RAG의 최종 답변의 정확도에 상당한 영향을 미칠 수 있습니다. 또한 LLM의 제한된 프롬프트 창은 보다 정확한 답변을 얻기 위한 장애물입니다. 이 문제를 해결하기 위해 관련 없는 세부 정보를 압축하고, 핵심 단락을 강조하며, 검색된 문서 청크의 전체 문맥 길이를 줄일 수 있습니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/compress_prompt.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>이 접근 방식은 앞서 설명한 하이브리드 검색 및 재랭크 방법과 유사하며, 재랭커를 사용하여 관련 없는 문서 청크를 걸러냅니다.</p>
<h3 id="Adjusting-the-chunk-order-in-the-prompt" class="common-anchor-header">프롬프트에서 청크 순서 조정하기</h3><p>&quot;<a href="https://arxiv.org/abs/2307.03172">중간에서 길을 잃</a>다&quot; 논문에서 연구자들은 LLM이 추론 과정에서 주어진 문서의 중간에 있는 정보를 간과하는 경우가 많다는 사실을 관찰했습니다. 대신 문서의 시작과 끝에 제시된 정보에 더 의존하는 경향이 있습니다.</p>
<p>이러한 관찰을 바탕으로 여러 지식 청크를 검색할 때 상대적으로 신뢰도가 낮은 청크는 중간에, 상대적으로 신뢰도가 높은 청크는 양 끝에 배치하는 등 검색된 청크의 순서를 조정하여 답변 품질을 개선할 수 있습니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/adjust_order.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="RAG-Pipeline-Enhancement" class="common-anchor-header">RAG 파이프라인 개선<button data-href="#RAG-Pipeline-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>전체 RAG 파이프라인을 개선하여 RAG 애플리케이션의 성능을 향상시킬 수도 있습니다.</p>
<h3 id="Self-reflection" class="common-anchor-header">자기 반성</h3><p>이 접근 방식은 AI 에이전트 내에서 자기 반성 개념을 통합합니다. 그렇다면 이 기술은 어떻게 작동할까요?</p>
<p>처음에 검색된 일부 Top-K 문서 청크는 모호하여 사용자 질문에 직접적으로 대답하지 못할 수 있습니다. 이러한 경우, 이러한 청크가 쿼리를 진정으로 해결할 수 있는지 확인하기 위해 두 번째 반사를 수행할 수 있습니다.</p>
<p>자연어 추론(NLI) 모델이나 검증을 위한 인터넷 검색과 같은 추가 도구와 같은 효율적인 반영 방법을 사용하여 반영을 수행할 수 있습니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/self_reflection.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>이러한 자기 반영 개념은 <a href="https://arxiv.org/pdf/2310.11511.pdf">Self-RAG</a>, <a href="https://arxiv.org/pdf/2401.15884.pdf">Corrective RAG</a>, <a href="https://github.com/langchain-ai/langgraph/blob/main/examples/reflexion/reflexion.ipynb">LangGraph</a> 등을 포함한 여러 논문이나 프로젝트에서 탐구되었습니다.</p>
<h3 id="Query-Routing-with-an-Agent" class="common-anchor-header">에이전트를 통한 쿼리 라우팅</h3><p>때로는 잘못된 정보로 인해 더 많은 오해와 추론이 발생할 수 있으므로 간단한 질문에 답하기 위해 RAG 시스템을 사용할 필요가 없는 경우도 있습니다. 이러한 경우에는 쿼리 단계에서 에이전트를 라우터로 사용할 수 있습니다. 이 에이전트는 쿼리가 RAG 파이프라인을 거쳐야 하는지 여부를 평가합니다. 필요한 경우 후속 RAG 파이프라인이 시작되고, 그렇지 않은 경우 LLM이 쿼리를 직접 처리합니다.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/query_routing.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/query_routing_with_sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>에이전트는 LLM, 소규모 분류 모델 또는 규칙 집합 등 다양한 형태를 취할 수 있습니다.</p>
<p>사용자 의도에 따라 쿼리를 라우팅하면 쿼리의 일부를 리디렉션하여 응답 시간을 크게 늘리고 불필요한 노이즈를 눈에 띄게 줄일 수 있습니다.</p>
<p>쿼리 라우팅 기법을 웹 검색, 하위 쿼리 수행 또는 이미지 검색과 같은 도구를 언제 활용할지 결정하는 등 RAG 시스템 내의 다른 프로세스로 확장할 수 있습니다. 이 접근 방식은 쿼리의 특정 요구 사항에 따라 RAG 시스템의 각 단계를 최적화하여 보다 효율적이고 정확한 정보 검색을 보장합니다.</p>
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
    </button></h2><p>바닐라 RAG 파이프라인은 단순해 보일 수 있지만, 최적의 비즈니스 성과를 달성하려면 보다 정교한 최적화 기술이 필요한 경우가 많습니다.</p>
<p>이 문서에서는 RAG 애플리케이션의 성능을 향상시키기 위해 널리 사용되는 다양한 접근 방식을 요약합니다. 또한 이러한 개념과 기법을 빠르게 이해하고 구현 및 최적화를 신속하게 진행할 수 있도록 명확한 일러스트를 제공했습니다.</p>
<p>이 문서에 나열된 주요 접근법의 간단한 구현은 이 <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">GitHub 링크에서</a> 확인할 수 있습니다.</p>
