---
id: text_search_engine.md
summary: Создайте систему текстового поиска с помощью Milvus.
title: Система поиска текста
---
<h1 id="Text-Search-Engine" class="common-anchor-header">Система поиска текста<button data-href="#Text-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом уроке вы узнаете, как использовать Milvus, векторную базу данных с открытым исходным кодом, для создания системы поиска по тексту.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/text_search">Открытый блокнот Jupyter</a></li>
</ul>
<p>Используемые ML-модели и стороннее программное обеспечение включают:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Одним из основных применений Milvus в области обработки естественного языка (NLP) является система текстового поиска. Это отличный инструмент, который может помочь пользователям найти нужную информацию. Он даже может найти информацию, которую трудно найти. Системы текстового поиска сравнивают введенные пользователями ключевые слова или семантику с базой данных текстов, а затем возвращают результаты, соответствующие определенным критериям.</p>
<p><br/></p>
<p>В этом уроке вы узнаете, как создать систему поиска по тексту. В этом учебнике используется BERT для преобразования текстов в векторы фиксированной длины. Milvus используется в качестве базы данных векторов для хранения и поиска сходства векторов. Затем используйте MySQL для сопоставления идентификаторов векторов, сгенерированных Milvus, с текстовыми данными.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_search_engine.png" alt="text_search_engine" class="doc-image" id="text_search_engine" />
   </span> <span class="img-wrapper"> <span>text_search_engine</span> </span> <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_search_engine_demo.png" alt="text_search_engine" class="doc-image" id="text_search_engine" /><span>text_search_engine</span> </span></p>
