---
id: question_answering_system.md
summary: Construir um sistema de resposta a perguntas com Milvus.
title: Sistema de resposta a perguntas
---
<h1 id="Question-Answering-System" class="common-anchor-header">Sistema de resposta a perguntas<button data-href="#Question-Answering-System" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial demonstra como utilizar o Milvus, a base de dados vetorial de código aberto, para construir um sistema de resposta a perguntas (QA).</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/question_answering">Abrir o bloco de notas Jupyter</a></li>
<li><a href="https://milvus.io/milvus-demos/">Demonstração online</a></li>
</ul>
<p>O modelo ML e o software de terceiros utilizados incluem:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>O sistema de resposta a perguntas é uma aplicação comum do mundo real que pertence ao domínio do processamento de linguagem natural. Os sistemas de QA típicos incluem sistemas de atendimento ao cliente em linha, chatbots de QA, entre outros. A maioria dos sistemas de resposta a perguntas pode ser classificada como: generativo ou de recuperação, de rodada única ou de rodada múltipla, de domínio aberto ou sistemas de resposta a perguntas específicas.</p>
<p></br></p>
<p>Neste tutorial, aprenderá a construir um sistema de QA que pode ligar novas perguntas de utilizadores a respostas massivas previamente armazenadas na base de dados de vectores. Para criar um chatbot deste tipo, prepare o seu próprio conjunto de dados de perguntas e respostas correspondentes. Guarde as perguntas e respostas em MySQL, uma base de dados relacional. Em seguida, utilize o BERT, o modelo de aprendizagem automática (ML) para processamento de linguagem natural (NLP), para converter as perguntas em vectores. Estes vectores de perguntas são armazenados e indexados no Milvus.  Quando os utilizadores introduzem uma nova pergunta, esta é igualmente convertida num vetor pelo modelo BERT e o Milvus procura o vetor de perguntas mais semelhante a este novo vetor. O sistema de GQ devolve a resposta correspondente às perguntas mais semelhantes.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/qa_chatbot.png" alt="QA_Chatbot" class="doc-image" id="qa_chatbot" />
   </span> <span class="img-wrapper"> <span>QA_Chatbot</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/qa_chatbot_demo.png" alt="QA_chatbot_demo" class="doc-image" id="qa_chatbot_demo" />
   </span> <span class="img-wrapper"> <span>QA_chatbot_demo</span> </span></p>
