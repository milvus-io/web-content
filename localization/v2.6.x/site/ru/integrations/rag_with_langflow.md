---
id: rag_with_langflow.md
summary: >-
  В этом руководстве показано, как использовать Langflow для создания конвейера
  Retrieval-Augmented Generation (RAG) с помощью Milvus.
title: Создание системы RAG с помощью Langflow и Milvus
---
<h1 id="Building-a-RAG-System-Using-Langflow-with-Milvus" class="common-anchor-header">Создание системы RAG с помощью Langflow и Milvus<button data-href="#Building-a-RAG-System-Using-Langflow-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Это руководство демонстрирует, как использовать <a href="https://www.langflow.org/">Langflow</a> для создания конвейера Retrieval-Augmented Generation (RAG) с <a href="https://milvus.io/">Milvus</a>.</p>
<p>Система RAG улучшает генерацию текста, сначала извлекая соответствующие документы из базы знаний, а затем генерируя новые ответы на основе этого контекста. Milvus используется для хранения и получения текстовых вкраплений, а Langflow облегчает интеграцию поиска и генерации в визуальный рабочий процесс.</p>
<p>Langflow позволяет легко создавать конвейеры RAG, в которых фрагменты текста встраиваются, хранятся в Milvus и извлекаются при соответствующих запросах. Это позволяет языковой модели генерировать ответы с учетом контекста.</p>
<p>Milvus служит масштабируемой векторной базой данных, которая быстро находит семантически схожий текст, а Langflow позволяет управлять тем, как ваш конвейер обрабатывает поиск текста и генерирует ответы. Вместе они обеспечивают эффективный способ создания надежного конвейера RAG для усовершенствованных текстовых приложений.</p>
<h2 id="Prerequisites" class="common-anchor-header">Предварительные условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед запуском этого блокнота убедитесь, что у вас установлены следующие зависимости:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">python -m pip install langflow -U</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tutorial" class="common-anchor-header">Учебник .<button data-href="#Tutorial" class="anchor-icon" translate="no">
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
    </button></h2><p>После установки всех зависимостей запустите дашборд Langflow, введя следующую команду:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">python -m langflow run</span>
<button class="copy-code-btn"></button></code></pre>
<p>После этого появится панель инструментов, как показано ниже: <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/langflow_dashboard_start.png" alt="langflow" class="doc-image" id="langflow" /><span>langflow</span> </span>.</p>
<p>Мы хотим создать проект <strong>Vector Store</strong>, поэтому сначала нам нужно нажать кнопку <strong>New Project</strong>. Появится панель, и мы выберем вариант <strong>Vector Store RAG</strong>: <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/langflow_dashboard_new_project.png" alt="panel" class="doc-image" id="panel" /><span>panel</span> </span></p>
<p>После успешного создания проекта Vector Store Rag по умолчанию используется векторное хранилище AstraDB, в то время как мы хотим использовать Milvus. Поэтому нам нужно заменить эти два модуля astraDB на Milvus, чтобы использовать Milvus в качестве векторного хранилища. <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/langflow_default_structure.png" alt="astraDB" class="doc-image" id="astradb" /><span>astraDB</span> </span></p>
<h3 id="Steps-to-replace-astraDB-with-Milvus" class="common-anchor-header">Шаги по замене astraDB на Milvus:</h3><ol>
<li>Удалите существующие карты Vector Store. Щелкните на двух карточках AstraDB, отмеченных красным цветом на изображении выше, и нажмите <strong>backspace</strong>, чтобы удалить их.</li>
<li>Нажмите на опцию <strong>Vector Store</strong> в боковой панели, выберите Milvus и перетащите ее на холст. Сделайте это дважды, поскольку нам нужны две карты Milvus: одна для хранения рабочего процесса обработки файлов и одна для рабочего процесса поиска.</li>
<li>Свяжите модули Milvus с остальными компонентами. Для справки смотрите изображение ниже.</li>
<li>Настройте учетные данные Milvus для обоих модулей Milvus. Самый простой способ - использовать Milvus Lite, установив Connection URI на milvus_demo.db. Если у вас есть самостоятельно развернутый сервер Milvus или Zilliz Cloud, установите Connection URI на конечную точку сервера и Connection Password на токен (для Milvus это конкатенированный "<username>:<password>", для Zilliz Cloud это API Key). Для справки смотрите рисунок ниже:</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/langflow_milvus_structure.png" alt="Milvus Structure demo" class="doc-image" id="milvus-structure-demo" />
   </span> <span class="img-wrapper"> <span>Демонстрация структуры Milvus</span> </span></p>
<h3 id="Embed-knowledge-into-the-RAG-system" class="common-anchor-header">Встраивание знаний в систему RAG</h3><ol>
<li>Загрузите файл в базу знаний LLM через модуль файла в левом нижнем углу. Здесь мы загрузили файл, содержащий краткое введение в Milvus</li>
<li>Запустите рабочий процесс вставки, нажав кнопку run на модуле Milvus в правом нижнем углу. В результате знания будут вставлены в векторное хранилище Milvus.</li>
<li>Проверьте, сохранились ли знания в памяти. Откройте playground и задайте любые вопросы, связанные с загруженным файлом.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/langflow_why_milvus.png" alt="why milvus" class="doc-image" id="why-milvus" />
   </span> <span class="img-wrapper"> <span>почему Milvus</span> </span></p>
