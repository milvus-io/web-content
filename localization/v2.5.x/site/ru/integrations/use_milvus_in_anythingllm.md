---
id: use_milvus_in_anythingllm.md
summary: >-
  Это руководство поможет вам настроить Milvus в качестве базы данных векторов в
  AnythingLLM, что позволит вам встраивать, хранить и искать документы для
  интеллектуального поиска и общения.
title: Использование Milvus в AnythingLLM
---
<h1 id="Use-Milvus-in-AnythingLLM" class="common-anchor-header">Использование Milvus в AnythingLLM<button data-href="#Use-Milvus-in-AnythingLLM" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://anythingllm.com/">AnythingLLM</a> - это мощное, ориентированное на конфиденциальность, универсальное настольное приложение с искусственным интеллектом, поддерживающее различные LLM, типы документов и векторные базы данных. Оно позволяет создать частного помощника, похожего на ChatGPT, который может работать локально или удаленно, позволяя вам интеллектуально общаться с любыми документами, которые вы предоставляете.</p>
<p>Это руководство поможет вам настроить Milvus как векторную базу данных в AnythingLLM, что позволит вам встраивать, хранить и искать ваши документы для интеллектуального поиска и общения в чате.</p>
<blockquote>
<p>Это руководство основано на официальной документации AnythingLLM и реальных шагах по использованию. Если пользовательский интерфейс или шаги изменились, пожалуйста, обратитесь к последней версии официальной документации и не стесняйтесь предлагать улучшения.</p>
</blockquote>
<hr>
<h2 id="1-Prerequisites" class="common-anchor-header">1. Необходимые условия<button data-href="#1-Prerequisites" class="anchor-icon" translate="no">
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
<li>Установленный локально<a href="https://milvus.io/docs/install-overview.md">Milvus</a> или <a href="https://zilliz.com/cloud">облачный</a> аккаунт <a href="https://zilliz.com/cloud">Zilliz</a> </li>
<li>Установлен<a href="https://anythingllm.com/desktop">AnythingLLM Desktop</a> </li>
<li>Документы или источники данных, готовые для загрузки и встраивания (PDF, Word, CSV, веб-страницы и т. д.)</li>
</ul>
<hr>
<h2 id="2-Configure-Milvus-as-the-Vector-Database" class="common-anchor-header">2. Настройте Milvus в качестве базы данных векторов<button data-href="#2-Configure-Milvus-as-the-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Откройте AnythingLLM и нажмите на значок <strong>настроек</strong> в левом нижнем углу<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_dashboard.png" alt="Open Settings" class="doc-image" id="open-settings" />
   </span> <span class="img-wrapper"> <span>Открыть настройки</span> </span></li>
</ol>
<ol start="2">
<li><p>В левом меню выберите <code translate="no">AI Providers</code> &gt; <code translate="no">Vector Database</code>. <br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_config.png" alt="Select Vector Database" class="doc-image" id="select-vector-database" />
   </span> <span class="img-wrapper"> <span>Выберите Векторная база данных</span> </span></p></li>
<li><p>В раскрывающемся списке Поставщик векторной базы данных выберите <strong>Milvus</strong> (или Zilliz Cloud)<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_vectordb.png" alt="Choose Milvus" class="doc-image" id="choose-milvus" />
   </span> <span class="img-wrapper"> <span>Выберите Milvus</span> </span></p></li>
<li><p>Введите данные подключения к Milvus (для локального Milvus). Вот пример:</p>
<ul>
<li><strong>Milvus DB Address</strong>: <code translate="no">http://localhost:19530</code></li>
<li><strong>Milvus Имя пользователя</strong>: <code translate="no">root</code></li>
<li><strong>Milvus Пароль</strong>: <code translate="no">Milvus</code>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_milvus.png" alt="Milvus Connection" class="doc-image" id="milvus-connection" />
   </span> <span class="img-wrapper"> <span>Milvus Connection</span> </span></li>
</ul>
<blockquote>
<p>Если вы используете Zilliz Cloud, введите конечную точку кластера и API-токен:</p>
</blockquote>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_zilliz_cloud.png" alt="Zilliz Cloud Connection" class="doc-image" id="zilliz-cloud-connection" />
   </span> <span class="img-wrapper"> <span>Zilliz Cloud Connection</span> </span></p></li>
<li><p>Нажмите кнопку <strong>Сохранить изменения</strong>, чтобы применить настройки.</p></li>
</ol>
<hr>
<h2 id="3-Create-a-Workspace-and-Upload-Documents" class="common-anchor-header">3. Создание рабочего пространства и загрузка документов<button data-href="#3-Create-a-Workspace-and-Upload-Documents" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Введите рабочее пространство и нажмите на значок <strong>загрузки</strong>, чтобы открыть диалог загрузки документов<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_file.png" alt="Open Upload Dialog" class="doc-image" id="open-upload-dialog" />
   </span> <span class="img-wrapper"> <span>Открыть диалог загрузки</span> </span>документов</p></li>
<li><p>Вы можете загружать самые разные источники данных:</p>
<ul>
<li><strong>Локальные файлы</strong>: PDF, Word, CSV, TXT, аудиофайлы и т. д.</li>
<li><strong>Веб-страницы</strong>: Вставьте URL-адрес и получайте содержимое веб-сайта напрямую.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_interface.png" alt="Upload Documents" class="doc-image" id="upload-documents" />
   </span> <span class="img-wrapper"> <span>Загрузка документов</span> </span></p></li>
<li><p>После загрузки или извлечения нажмите кнопку <strong>Переместить в рабочую область</strong>, чтобы переместить документ или данные в текущую рабочую область.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_move_to_workspace.png" alt="Move to Workspace" class="doc-image" id="move-to-workspace" />
   </span> <span class="img-wrapper"> <span>Переместить в рабочую область</span> </span></p></li>
<li><p>Выберите документ или данные и нажмите <strong>Сохранить и вставить</strong>. AnythingLLM автоматически создаст чанк, встроит и сохранит ваш контент в Milvus.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_save_and_embed.png" alt="Save and Embed" class="doc-image" id="save-and-embed" />
   </span> <span class="img-wrapper"> <span>Сохранить и внедрить</span> </span></p></li>
</ol>
<hr>
<h2 id="4-Chat-and-Retrieve-Answers-from-Milvus" class="common-anchor-header">4. Общение в чате и получение ответов из Milvus<button data-href="#4-Chat-and-Retrieve-Answers-from-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Вернитесь в интерфейс чата рабочей области и задайте вопросы. AnythingLLM выполнит поиск соответствующего контента в векторной базе данных Milvus и использует LLM для создания ответов.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_chat.png" alt="Chat with Docs" class="doc-image" id="chat-with-docs" />
   </span> <span class="img-wrapper"> <span>Чат с документами</span> </span></li>
</ol>
<hr>
