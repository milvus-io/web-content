---
id: question_answering_system.md
summary: Создайте систему ответов на вопросы с помощью Milvus.
title: Система ответов на вопросы
---
<h1 id="Question-Answering-System" class="common-anchor-header">Система ответов на вопросы<button data-href="#Question-Answering-System" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве показано, как использовать Milvus, векторную базу данных с открытым исходным кодом, для создания системы ответов на вопросы (QA).</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/question_answering">Откройте блокнот Jupyter</a></li>
<li><a href="https://milvus.io/milvus-demos/">Попробуйте онлайн-демонстрацию</a></li>
</ul>
<p>Используемые ML-модели и стороннее программное обеспечение включают:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>Система ответов на вопросы - распространенное в реальном мире приложение, относящееся к области обработки естественного языка. Типичные системы QA включают в себя системы онлайн-обслуживания клиентов, чат-боты QA и другие. Большинство систем ответов на вопросы можно классифицировать как: генеративные или поисковые, однораундовые или многораундовые, системы ответов на вопросы с открытым доменом или специфические.</p>
<p></br></p>
<p>В этом уроке вы узнаете, как построить систему QA, которая может связывать новые вопросы пользователей с массивными ответами, ранее сохраненными в векторной базе данных. Чтобы построить такого чатбота, подготовьте собственный набор данных вопросов и соответствующих ответов. Храните вопросы и ответы в MySQL, реляционной базе данных. Затем используйте BERT, модель машинного обучения (ML) для обработки естественного языка (NLP), чтобы преобразовать вопросы в векторы. Эти векторы вопросов хранятся и индексируются в Milvus.  Когда пользователи вводят новый вопрос, он также преобразуется в вектор с помощью модели BERT, и Milvus ищет наиболее похожий вектор вопроса на этот новый вектор. Система QA возвращает ответ на наиболее похожий вопрос.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/qa_chatbot.png" alt="QA_Chatbot" class="doc-image" id="qa_chatbot" />
   </span> <span class="img-wrapper"> <span>QA_Chatbot</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/qa_chatbot_demo.png" alt="QA_chatbot_demo" class="doc-image" id="qa_chatbot_demo" />
   </span> <span class="img-wrapper"> <span>QA_chatbot_demo</span> </span></p>
