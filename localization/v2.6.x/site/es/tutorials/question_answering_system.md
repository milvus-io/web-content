---
id: question_answering_system.md
summary: Construye un sistema de respuesta a preguntas con Milvus.
title: Sistema de respuesta a preguntas
---
<h1 id="Question-Answering-System" class="common-anchor-header">Sistema de respuesta a preguntas<button data-href="#Question-Answering-System" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial muestra cómo utilizar Milvus, la base de datos vectorial de código abierto, para crear un sistema de respuesta a preguntas (QA).</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/question_answering">Abrir el cuaderno Jupyter</a></li>
<li><a href="https://milvus.io/milvus-demos/">Pruebe la demo en línea</a></li>
</ul>
<p>El modelo ML y el software de terceros utilizados incluyen:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>El sistema de respuesta a preguntas es una aplicación común en el mundo real que pertenece al campo del procesamiento del lenguaje natural. Los sistemas de respuesta a preguntas típicos incluyen sistemas de atención al cliente en línea, chatbots de respuesta a preguntas, etc. La mayoría de los sistemas de respuesta a preguntas se pueden clasificar como: generativos o de recuperación, de una sola ronda o de varias rondas, de dominio abierto o sistemas específicos de respuesta a preguntas.</p>
<p></br></p>
<p>En este tutorial, aprenderás a construir un sistema de control de calidad que pueda vincular nuevas preguntas de los usuarios con respuestas masivas almacenadas previamente en la base de datos vectorial. Para construir un chatbot de este tipo, prepara tu propio conjunto de datos de preguntas y sus correspondientes respuestas. Almacena las preguntas y respuestas en MySQL, una base de datos relacional. A continuación, utilice BERT, el modelo de aprendizaje automático (ML) para el procesamiento del lenguaje natural (NLP), para convertir las preguntas en vectores. Estos vectores de preguntas se almacenan e indexan en Milvus.  Cuando los usuarios introducen una nueva pregunta, el modelo BERT también la convierte en un vector, y Milvus busca el vector de preguntas más similar a este nuevo vector. El sistema de control de calidad devuelve la respuesta correspondiente a las preguntas más similares.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/qa_chatbot.png" alt="QA_Chatbot" class="doc-image" id="qa_chatbot" />
   </span> <span class="img-wrapper"> <span>QA_Chatbot</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/qa_chatbot_demo.png" alt="QA_chatbot_demo" class="doc-image" id="qa_chatbot_demo" />
   </span> <span class="img-wrapper"> <span>QA_chatbot_demo</span> </span></p>
