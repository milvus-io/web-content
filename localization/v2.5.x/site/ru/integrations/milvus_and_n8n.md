---
id: milvus_and_n8n.md
summary: >-
  n8n - это мощная платформа автоматизации рабочих процессов с открытым исходным
  кодом, которая позволяет соединять различные приложения, сервисы и API для
  создания автоматизированных рабочих процессов без кодирования. Благодаря
  визуальному интерфейсу, основанному на узлах, n8n позволяет пользователям
  создавать сложные процессы автоматизации, просто соединяя узлы, представляющие
  различные сервисы или действия. Это самодостаточное, легко расширяемое
  решение, поддерживающее лицензирование по принципу fair-code и корпоративное
  лицензирование.
title: Начало работы с Milvus и n8n
---
<h1 id="Getting-Started-with-Milvus-and-n8n" class="common-anchor-header">Начало работы с Milvus и n8n<button data-href="#Getting-Started-with-Milvus-and-n8n" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="common-anchor-header">Введение в n8n и узел Milvus Vector Store Node<button data-href="#Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://n8n.io/">n8n</a> - это мощная платформа автоматизации рабочих процессов с открытым исходным кодом, которая позволяет соединять различные приложения, сервисы и API для создания автоматизированных рабочих процессов без кодирования. Благодаря визуальному интерфейсу, основанному на узлах, n8n позволяет пользователям создавать сложные процессы автоматизации, просто соединяя узлы, которые представляют различные сервисы или действия. Он является самодостаточным, хорошо расширяемым и поддерживает как fair-code, так и корпоративное лицензирование.</p>
<p>Узел <strong>Milvus Vector Store</strong> в n8n интегрирует <a href="https://milvus.io/">Milvus</a> в рабочие процессы автоматизации. Это позволяет выполнять семантический поиск, создавать системы с расширенным поиском (RAG) и интеллектуальные приложения искусственного интеллекта - и все это в рамках экосистемы n8n.</p>
<p>Эта документация в основном основана на официальной <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">документации n8n Milvus Vector Store</a>. Если вы обнаружите устаревшее или несоответствующее содержание, пожалуйста, отдайте предпочтение официальной документации и не стесняйтесь поднимать вопрос.</p>
<h2 id="Key-Features" class="common-anchor-header">Ключевые особенности<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>С помощью узла Milvus Vector Store в n8n вы можете:</p>
<ul>
<li>Взаимодействовать с базой данных Milvus как с <a href="https://docs.n8n.io/glossary/#ai-vector-store">векторным хранилищем</a></li>
<li>Вставлять документы в Milvus</li>
<li>Получать документы из Milvus</li>
<li>Извлекать документы, чтобы предоставить их ретриверу, подключенному к <a href="https://docs.n8n.io/glossary/#ai-chain">цепочке</a>.</li>
<li>Подключаться непосредственно к <a href="https://docs.n8n.io/glossary/#ai-agent">агенту</a> в качестве <a href="https://docs.n8n.io/glossary/#ai-tool">инструмента</a></li>
<li>Фильтровать документы на основе метаданных</li>
</ul>
<h2 id="Node-Usage-Patterns" class="common-anchor-header">Шаблоны использования узла<button data-href="#Node-Usage-Patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете использовать узел Milvus Vector Store в n8n по следующим схемам.</p>
<h3 id="Use-as-a-regular-node-to-insert-and-retrieve-documents" class="common-anchor-header">Использование в качестве обычного узла для вставки и извлечения документов</h3><p>Вы можете использовать Milvus Vector Store в качестве обычного узла для вставки или получения документов. В этом шаблоне Milvus Vector Store помещается в обычный поток соединений без использования агента.</p>
<p>Посмотрите этот <a href="https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/">пример шаблона</a>, чтобы узнать, как создать систему, которая хранит документы в Milvus и извлекает их для поддержки цитируемых ответов в чате.</p>
<h3 id="Connect-directly-to-an-AI-agent-as-a-tool" class="common-anchor-header">Подключение непосредственно к агенту искусственного интеллекта в качестве инструмента</h3><p>Вы можете подключить узел Milvus Vector Store непосредственно к инструментальному разъему <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/">агента искусственного интеллекта</a>, чтобы использовать векторное хранилище в качестве ресурса при ответе на запросы.</p>
<p>В этом случае подключение будет выглядеть следующим образом: AI-агент (коннектор инструментов) -&gt; узел Milvus Vector Store. Посмотрите этот <a href="https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/">пример шаблона</a>, где данные встроены и проиндексированы в Milvus, а агент ИИ использует векторное хранилище в качестве инструмента знаний для ответов на вопросы.</p>
<h3 id="Use-a-retriever-to-fetch-documents" class="common-anchor-header">Использование ретривера для получения документов</h3><p>Вы можете использовать узел <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/">Vector Store Retriever</a> с узлом Milvus Vector Store для получения документов из узла Milvus Vector Store. Это часто используется с узлом <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/">"Цепочка вопросов и ответов"</a> для получения документов из векторного хранилища, которые соответствуют заданным входным данным чата.</p>
<p>Типичный поток соединений узлов выглядит следующим образом: Цепочка вопросов и ответов (коннектор Retriever) -&gt; Vector Store Retriever (коннектор Vector Store) -&gt; Milvus Vector Store.</p>
<p>Ознакомьтесь с <a href="https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/">примером рабочего процесса</a>, чтобы увидеть, как вводить внешние данные в Milvus и создавать семантическую систему вопросов и ответов на основе чата.</p>
<h3 id="Use-the-Vector-Store-Question-Answer-Tool-to-answer-questions" class="common-anchor-header">Используйте инструмент Vector Store Question Answer Tool для ответов на вопросы</h3><p>В другом шаблоне используется <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">инструмент Vector Store Question Answer Tool</a> для обобщения результатов и ответов на вопросы с узла Milvus Vector Store. Вместо того чтобы напрямую подключать Milvus Vector Store в качестве инструмента, этот паттерн использует инструмент, специально разработанный для обобщения данных в векторном хранилище.</p>
<p>Поток соединений будет выглядеть следующим образом: Агент ИИ (коннектор инструментов) -&gt; Инструмент для ответов на вопросы в векторном хранилище (коннектор векторного хранилища) -&gt; Векторное хранилище Milvus.</p>
<h2 id="Node-Operation-Modes" class="common-anchor-header">Режимы работы узла<button data-href="#Node-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Узел Milvus Vector Store поддерживает несколько режимов работы, каждый из которых предназначен для различных сценариев использования рабочего процесса. Понимание этих режимов помогает разрабатывать более эффективные рабочие процессы.</p>
<p>Ниже мы дадим общий обзор доступных режимов работы и опций. Полный список входных параметров и параметров конфигурации для каждого режима приведен в <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">официальной документации</a>.</p>
<hr>
<h3 id="Operation-Modes-Overview" class="common-anchor-header">Обзор режимов работы</h3><p>Узел Milvus Vector Store поддерживает четыре различных режима работы:</p>
<ul>
<li><strong>Get Many</strong>: Получение нескольких документов на основе семантического сходства с запросом.</li>
<li><strong>Вставить документы</strong>: Вставка новых документов в коллекцию Milvus.</li>
<li><strong>Retrieve Documents (As Vector Store for Chain/Tool)</strong>: Используйте узел в качестве ретривера в системе, основанной на цепочке.</li>
<li><strong>Retrieve Documents (As Tool for AI Agent)</strong>: Используйте узел в качестве инструментального ресурса для агента искусственного интеллекта при выполнении задач по поиску ответов на вопросы.</li>
</ul>
<h3 id="Additional-Node-Options" class="common-anchor-header">Дополнительные параметры узла</h3><ul>
<li><strong>Фильтр метаданных</strong> (только в режиме Get Many): Фильтр результатов на основе пользовательских ключей метаданных. Для нескольких полей применяется условие AND.</li>
<li><strong>Очистить коллекцию</strong> (только в режиме "Вставка документов"): Удаление существующих документов из коллекции перед вставкой новых.</li>
</ul>
<h3 id="Related-Resources" class="common-anchor-header">Связанные ресурсы</h3><ul>
<li><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">Документация по интеграции n8n Milvus</a></li>
<li><a href="https://js.langchain.com/docs/integrations/vectorstores/milvus/">Документация по LangChain Milvus</a></li>
<li><a href="https://docs.n8n.io/advanced-ai/">Документация n8n Advanced AI</a></li>
</ul>
