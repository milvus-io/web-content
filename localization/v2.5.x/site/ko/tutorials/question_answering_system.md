---
id: question_answering_system.md
summary: Milvus로 질문 답변 시스템을 구축하세요.
title: 질문 답변 시스템
---
<h1 id="Question-Answering-System" class="common-anchor-header">질문 답변 시스템<button data-href="#Question-Answering-System" class="anchor-icon" translate="no">
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
    </button></h1><p>이 튜토리얼에서는 오픈 소스 벡터 데이터베이스인 Milvus를 사용하여 질문 답변(QA) 시스템을 구축하는 방법을 보여드립니다.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/question_answering">Jupyter 노트북 열기</a></li>
<li><a href="https://milvus.io/milvus-demos/">온라인 데모 체험하기</a></li>
</ul>
<p>사용된 ML 모델과 타사 소프트웨어는 다음과 같습니다:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>질문 답변 시스템은 자연어 처리 분야에 속하는 일반적인 실제 애플리케이션입니다. 일반적인 QA 시스템에는 온라인 고객 서비스 시스템, QA 챗봇 등이 포함됩니다. 대부분의 질문 답변 시스템은 생성형 또는 검색형, 단일 라운드 또는 다중 라운드, 개방형 도메인 또는 특정 질문 답변 시스템으로 분류할 수 있습니다.</p>
<p></br></p>
<p>이 튜토리얼에서는 새로운 사용자 질문을 이전에 벡터 데이터베이스에 저장된 방대한 답변에 연결할 수 있는 QA 시스템을 구축하는 방법을 배웁니다. 이러한 챗봇을 구축하려면 질문과 해당 답변으로 구성된 자체 데이터 세트를 준비하세요. 질문과 답변을 관계형 데이터베이스인 MySQL에 저장합니다. 그런 다음 자연어 처리(NLP)를 위한 머신 러닝(ML) 모델인 BERT를 사용하여 질문을 벡터로 변환합니다. 이러한 질문 벡터는 Milvus에 저장되고 색인화됩니다.  사용자가 새로운 질문을 입력하면 BERT 모델에 의해 이 질문도 벡터로 변환되고, Milvus는 이 새로운 벡터와 가장 유사한 질문 벡터를 검색합니다. QA 시스템은 가장 유사한 질문에 해당하는 답변을 반환합니다.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/qa_chatbot.png" alt="QA_Chatbot" class="doc-image" id="qa_chatbot" />
   </span> <span class="img-wrapper"> <span>QA_Chatbot</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/qa_chatbot_demo.png" alt="QA_chatbot_demo" class="doc-image" id="qa_chatbot_demo" />
   </span> <span class="img-wrapper"> <span>QA_챗봇_데모</span> </span></p>
