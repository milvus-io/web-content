---
id: kotaemon_with_milvus.md
summary: >-
  В этом руководстве вы узнаете, как настроить приложение kotaemon с помощью
  Milvus.
title: Kotaemon RAG с Milvus
---
<h1 id="Kotaemon-RAG-with-Milvus" class="common-anchor-header">Kotaemon RAG с Milvus<button data-href="#Kotaemon-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/Cinnamon/kotaemon">Kotaemon</a> - это чистый и настраиваемый RAG-интерфейс с открытым исходным кодом для общения с документами. Создан с учетом пожеланий как конечных пользователей, так и разработчиков.</p>
<p>Kotaemon представляет собой настраиваемый многопользовательский веб-интерфейс для контроля качества документов, поддерживающий локальные и основанные на API LLM. Он предлагает гибридный конвейер RAG с полнотекстовым и векторным поиском, мультимодальный QA для документов с рисунками и таблицами, а также расширенное цитирование с предварительным просмотром документов. Он поддерживает сложные методы обоснования, такие как ReAct и ReWOO, и предоставляет настраиваемые параметры для поиска и генерации.</p>
<p>В этом руководстве вы узнаете, как настроить приложение kotaemon с помощью <a href="https://milvus.io/">Milvus</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Installation" class="common-anchor-header">Установка</h3><p>Мы рекомендуем устанавливать kotaemon этим способом:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">optional (setup <span class="hljs-built_in">env</span>)</span>
conda create -n kotaemon python=3.10
conda activate kotaemon

git clone https://github.com/Cinnamon/kotaemon
cd kotaemon

pip install -e &quot;libs/kotaemon[all]&quot;
pip install -e &quot;libs/ktem&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Кроме этого способа, есть и другие способы установки kotaemon. За более подробной информацией вы можете обратиться к <a href="https://github.com/Cinnamon/kotaemon?tab=readme-ov-file#installation">официальной документации</a>.</p>
<h3 id="Set-Milvus-as-the-default-vector-storage" class="common-anchor-header">Установка Milvus в качестве векторного хранилища по умолчанию</h3><p>Чтобы изменить векторное хранилище по умолчанию на Milvus, необходимо модифицировать файл <code translate="no">flowsettings.py</code>, переключив <code translate="no">KH_VECTORSTORE</code> на:</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;__type__&quot;</span>: <span class="hljs-string">&quot;kotaemon.storages.MilvusVectorStore&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Environment-Variables" class="common-anchor-header">Set Environment Variables</h3><p>Вы можете настроить модели через файл <code translate="no">.env</code> с информацией, необходимой для подключения к LLM и моделям встраивания. например, OpenAI, Azure, Ollama и т. д.</p>
<h3 id="Run-Kotaemon" class="common-anchor-header">Запуск Kotaemon</h3><p>После настройки переменных окружения и изменения векторного хранилища, вы можете запустить kotaemon, выполнив следующую команду:</p>
<pre><code translate="no" class="language-shell">python app.py
<button class="copy-code-btn"></button></code></pre>
<p>Имя пользователя / пароль по умолчанию: <code translate="no">admin</code> / <code translate="no">admin</code></p>
<h2 id="Start-RAG-with-kotaemon" class="common-anchor-header">Запуск RAG с помощью kotaemon<button data-href="#Start-RAG-with-kotaemon" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Add-your-AI-models" class="common-anchor-header">1. Добавьте свои модели ИИ</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/kotaemon_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>На вкладке <code translate="no">Resources</code> вы можете добавить и настроить свои LLM и модели встраивания. Вы можете добавить несколько моделей и установить их как активные или неактивные. Вам нужно указать только одну модель. Вы также можете добавить несколько моделей, чтобы обеспечить переключение между ними.</p>
<h3 id="2-Upload-your-documents" class="common-anchor-header">2. Загрузка документов</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/kotaemon_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Чтобы выполнить проверку документов, необходимо сначала загрузить их в приложение. Перейдите на вкладку <code translate="no">File Index</code>, и вы сможете загружать и управлять своими пользовательскими документами.</p>
<p>По умолчанию все данные приложения хранятся в папке <code translate="no">./ktem_app_data</code>. Данные базы данных Milvus хранятся в папке <code translate="no">./ktem_app_data/user_data/vectorstore</code>. Вы можете создать резервную копию или скопировать эту папку, чтобы перенести установку на новую машину.</p>
<h3 id="3-Chat-with-your-documents" class="common-anchor-header">3. Общение с документами</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/kotaemon_3.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Теперь перейдите на вкладку <code translate="no">Chat</code>. Вкладка "Чат" состоит из трех областей: панель настроек разговора, где вы управляете разговорами и ссылками на файлы; панель чата для взаимодействия с чат-ботом; и информационная панель, где отображаются подтверждающие доказательства, баллы доверия и рейтинги релевантности ответов.</p>
<p>Вы можете выбрать документы на панели настроек беседы. Затем просто запустите RAG с вашими документами, набрав сообщение в поле ввода и отправив его чатботу.</p>
<p>Если вы хотите более подробно изучить, как использовать kotaemon, вы можете получить полное руководство из <a href="https://cinnamon.github.io/kotaemon/usage/">официальной документации</a>.</p>
