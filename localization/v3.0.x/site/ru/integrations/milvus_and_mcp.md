---
id: milvus_and_mcp.md
summary: >-
  В этом руководстве рассказывается о настройке MCP-сервера для Milvus,
  позволяющего приложениям искусственного интеллекта выполнять векторный поиск,
  управлять коллекциями и получать данные с помощью команд на естественном языке
  без написания пользовательских запросов к базе данных.
title: 'MCP + Milvus: соединение искусственного интеллекта с векторными базами данных'
---
<h1 id="MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="common-anchor-header">MCP + Milvus: соединение искусственного интеллекта с векторными базами данных<button data-href="#MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="anchor-icon" translate="no">
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
    </button></h1><iframe width="560" height="315" src="https://www.youtube.com/embed/0wAsrUxv8gM?si=BVyRqLJ2PuZIBF5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h2 id="Introduction" class="common-anchor-header">Введение<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Model Context Protocol (MCP)</strong> - это открытый протокол, который позволяет приложениям ИИ, таким как Claude и Cursor, беспрепятственно взаимодействовать с внешними источниками данных и инструментами. Независимо от того, создаете ли вы пользовательские приложения ИИ, интегрируете рабочие процессы ИИ или улучшаете интерфейсы чата, MCP обеспечивает стандартизированный способ подключения больших языковых моделей (LLM) к соответствующим контекстным данным.</p>
<p>В этом руководстве вы узнаете, как <strong>настроить MCP-сервер для Milvus</strong>, чтобы приложения ИИ могли выполнять векторный поиск, управлять коллекциями и получать данные с помощью <strong>команд на естественном языке без</strong>написания пользовательских запросов к базе данных.</p>
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
    </button></h2><p>Перед настройкой MCP-сервера убедитесь, что у вас есть:</p>
<ul>
<li>Python 3.10 или выше</li>
<li>запущенный экземпляр <a href="https://milvus.io/">Milvus</a> </li>
<li><a href="https://github.com/astral-sh/uv">uv</a> (рекомендуется для запуска сервера)</li>
</ul>
<h2 id="Getting-Started" class="common-anchor-header">Начало работы<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>Рекомендуемый способ использования этого MCP-сервера - запустить его напрямую с uv без установки. Именно так настроены Claude Desktop и Cursor для его использования в примерах ниже.</p>
<p>Если вы хотите клонировать репозиторий:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/mcp-server-milvus.git
<span class="hljs-built_in">cd</span> mcp-server-milvus
<button class="copy-code-btn"></button></code></pre>
<p>Тогда вы можете запустить сервер напрямую:</p>
<pre><code translate="no" class="language-bash">uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-Applications" class="common-anchor-header">Поддерживаемые приложения<button data-href="#Supported-Applications" class="anchor-icon" translate="no">
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
    </button></h2><p>Этот MCP-сервер можно использовать с различными AI-приложениями, поддерживающими Model Context Protocol, такими как:</p>
<ul>
<li><strong>Claude Desktop</strong>: Настольное приложение Anthropic для Claude.</li>
<li><strong>Cursor</strong>: Редактор кода на базе ИИ с поддержкой MCP в функции Composer.</li>
<li><strong>Другие пользовательские клиенты MCP</strong> Любое приложение, реализующее спецификацию клиента MCP</li>
</ul>
<h2 id="Using-MCP-with-Claude-Desktop" class="common-anchor-header">Использование MCP с Claude Desktop<button data-href="#Using-MCP-with-Claude-Desktop" class="anchor-icon" translate="no">
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
<li>Установите <a href="https://claude.ai/download">Claude Desktop</a>.</li>
<li>Откройте файл конфигурации Claude:<ul>
<li>На macOS: <code translate="no">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
</ul></li>
<li>Добавьте следующую конфигурацию:</li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;milvus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;--directory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;run&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;server.py&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;--milvus-uri&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Перезапустите Claude Desktop, чтобы применить изменения.</li>
</ol>
<h2 id="Using-MCP-with-Cursor" class="common-anchor-header">Использование MCP в Cursor<button data-href="#Using-MCP-with-Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.cursor.com/context/model-context-protocol">Cursor</a> также поддерживает инструменты MCP через функцию Agent в Composer. Вы можете добавить сервер Milvus MCP в Cursor двумя способами:</p>
<h3 id="Option-1-Using-Cursor-Settings-UI" class="common-anchor-header">Вариант 1: Использование пользовательского интерфейса настроек Cursor</h3><ol>
<li>Откройте <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Щелкните <code translate="no">+ Add New MCP Server</code>.</li>
<li>Заполните:<ul>
<li>Тип: <code translate="no">stdio</code></li>
<li>Имя: <code translate="no">milvus</code></li>
<li>Команда:<pre><code translate="no" class="language-bash">/PATH/TO/uv --directory /path/to/mcp-server-milvus/src/mcp_server_milvus run server.py --milvus-uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre></li>
<li>⚠️ Совет: Используйте <code translate="no">127.0.0.1</code> вместо <code translate="no">localhost</code>, чтобы избежать возможных проблем с разрешением DNS.</li>
</ul></li>
</ol>
<h3 id="Option-2-Using-Project-specific-Configuration-Recommended" class="common-anchor-header">Вариант 2: Использование конфигурации для конкретного проекта (рекомендуется)</h3><ol>
<li>Создайте файл <code translate="no">.cursor/mcp.json</code> в <strong>корневом каталоге проекта</strong>:</li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;milvus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;--directory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;run&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;server.py&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;--milvus-uri&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Перезапустите Cursor, чтобы применить конфигурацию.</li>
</ol>
<p>После добавления сервера может потребоваться нажать кнопку обновления в настройках MCP, чтобы пополнить список инструментов. Агент Composer Agent будет автоматически использовать инструменты Milvus, если это необходимо для ваших запросов.</p>
<h2 id="Verifying-the-Integration" class="common-anchor-header">Проверка интеграции<button data-href="#Verifying-the-Integration" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы убедиться, что сервер MCP настроен правильно:</p>
<h3 id="For-Cursor" class="common-anchor-header">Для Cursor</h3><ol>
<li>Перейдите по адресу <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Убедитесь, что в списке MCP-серверов появился <code translate="no">&quot;Milvus&quot;</code>.</li>
<li>Проверьте, есть ли в списке инструменты Milvus (например, <code translate="no">milvus_list_collections</code>, <code translate="no">milvus_vector_search</code>).</li>
<li>Если появляются ошибки, см. раздел <strong>"Устранение неполадок"</strong> ниже.</li>
</ol>
<h2 id="MCP-Server-Tools-for-Milvus" class="common-anchor-header">Инструменты MCP-сервера для Milvus<button data-href="#MCP-Server-Tools-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Этот MCP-сервер предоставляет множество инструментов для <strong>поиска, запроса и управления векторными данными в Milvus</strong>. Для получения более подробной информации обратитесь к документации <a href="https://github.com/zilliztech/mcp-server-milvus">mcp-server-milvus</a>.</p>
<h3 id="🔍-Search-and-Query-Tools" class="common-anchor-header">🔍 Инструменты поиска и запросов</h3><ul>
<li><strong><code translate="no">milvus-text-search</code></strong> → Поиск документов с помощью полнотекстового поиска.</li>
<li><strong><code translate="no">milvus-vector-search</code></strong> → Выполните поиск по векторному сходству в коллекции.</li>
<li><strong><code translate="no">milvus-hybrid-search</code></strong> → Выполните гибридный поиск, сочетающий векторное сходство и фильтрацию по атрибутам.</li>
<li><strong><code translate="no">milvus-multi-vector-search</code></strong> → Выполнение поиска по векторному сходству с несколькими векторами запросов.</li>
<li><strong><code translate="no">milvus-query</code></strong> → Запрашивать коллекцию с помощью выражений фильтрации.</li>
<li><strong><code translate="no">milvus-count</code></strong> → Подсчет сущностей в коллекции.</li>
</ul>
<h3 id="📁-Collection-Management" class="common-anchor-header">📁 Управление коллекциями</h3><ul>
<li><strong><code translate="no">milvus-list-collections</code></strong> → Вывод списка всех коллекций в базе данных.</li>
<li><strong><code translate="no">milvus-collection-info</code></strong> → Получение подробной информации о коллекции.</li>
<li><strong><code translate="no">milvus-get-collection-stats</code></strong> → Получение статистики о коллекции.</li>
<li><strong><code translate="no">milvus-create-collection</code></strong> → Создание новой коллекции с указанной схемой.</li>
<li><strong><code translate="no">milvus-load-collection</code></strong> → Загрузка коллекции в память для поиска и запроса.</li>
<li><strong><code translate="no">milvus-release-collection</code></strong> → Извлечь коллекцию из памяти.</li>
<li><strong><code translate="no">milvus-get-query-segment-info</code></strong> → Получить информацию о сегментах запроса.</li>
<li><strong><code translate="no">milvus-get-collection-loading-progress</code></strong> → Получение информации о ходе загрузки коллекции.</li>
</ul>
<h3 id="📊-Data-Operations" class="common-anchor-header">📊 Операции с данными</h3><ul>
<li><strong><code translate="no">milvus-insert-data</code></strong> → Вставка данных в коллекцию.</li>
<li><strong><code translate="no">milvus-bulk-insert</code></strong> → Вставка данных партиями для повышения производительности.</li>
<li><strong><code translate="no">milvus-upsert-data</code></strong> → Вставка данных в коллекцию (вставка или обновление при наличии).</li>
<li><strong><code translate="no">milvus-delete-entities</code></strong> → Удаление сущностей из коллекции на основе выражения фильтра.</li>
<li><strong><code translate="no">milvus-create-dynamic-field</code></strong> → Добавление динамического поля в существующую коллекцию.</li>
</ul>
<h3 id="⚙️-Index-Management" class="common-anchor-header">⚙️ Управление индексами</h3><ul>
<li><strong><code translate="no">milvus-create-index</code></strong> → Создание индекса для векторного поля.</li>
<li><strong><code translate="no">milvus-get-index-info</code></strong> → Получение информации об индексах в коллекции.</li>
</ul>
<h2 id="Environment-Variables" class="common-anchor-header">Переменные окружения<button data-href="#Environment-Variables" class="anchor-icon" translate="no">
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
<li><strong><code translate="no">MILVUS_URI</code></strong> → URI сервера Milvus (может быть задан вместо <code translate="no">--milvus-uri</code>).</li>
<li><strong><code translate="no">MILVUS_TOKEN</code></strong> → Необязательный токен аутентификации.</li>
<li><strong><code translate="no">MILVUS_DB</code></strong> → Имя базы данных (по умолчанию - "default").</li>
</ul>
<h2 id="Development" class="common-anchor-header">Разработка<button data-href="#Development" class="anchor-icon" translate="no">
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
    </button></h2><p>Для непосредственного запуска сервера:</p>
<pre><code translate="no" class="language-bash">uv run server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">Примеры<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Using-Claude-Desktop" class="common-anchor-header">Использование Claude Desktop</h3><h4 id="Example-1-Listing-Collections" class="common-anchor-header">Пример 1: Вывод списков коллекций</h4><pre><code translate="no">What are the collections <span class="hljs-selector-tag">I</span> have in my Milvus DB?
<button class="copy-code-btn"></button></code></pre>
<p>Claude будет использовать MCP для проверки этой информации в нашей БД Milvus.</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll check what collections are available in your Milvus database.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-list-collections <span class="hljs-keyword">from</span> milvus (local)

Here are the collections <span class="hljs-keyword">in</span> your Milvus database:

<span class="hljs-number">1</span>. rag_demo
<span class="hljs-number">2</span>. test
<span class="hljs-number">3</span>. chat_messages
<span class="hljs-number">4</span>. text_collection
<span class="hljs-number">5</span>. image_collection
<span class="hljs-number">6</span>. customized_setup
<span class="hljs-number">7</span>. streaming_rag_demo
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Searching-for-Documents" class="common-anchor-header">Пример 2: Поиск документов</h4><pre><code translate="no">Find documents in <span class="hljs-keyword">my</span> text_collection that mention <span class="hljs-string">&quot;machine learning&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Клод использует возможности полнотекстового поиска в Milvus, чтобы найти нужные документы:</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll search for documents about machine learning in your text_collection.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-<span class="hljs-keyword">text</span>-search <span class="hljs-keyword">from</span> milvus (local)

Here are the documents I found that mention machine learning:
[Results will appear here based <span class="hljs-keyword">on</span> your actual data]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-Cursor" class="common-anchor-header">Использование курсора</h3><h4 id="Example-Creating-a-Collection" class="common-anchor-header">Пример: Создание коллекции</h4><p>В Cursor's Composer вы можете задать вопрос:</p>
<pre><code translate="no">Create a <span class="hljs-keyword">new</span> collection called <span class="hljs-string">&#x27;articles&#x27;</span> <span class="hljs-function"><span class="hljs-keyword">in</span> Milvus <span class="hljs-keyword">with</span> fields <span class="hljs-keyword">for</span> <span class="hljs-title">title</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-title">content</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-keyword">and</span> a vector <span class="hljs-title">field</span> (<span class="hljs-params"><span class="hljs-number">128</span> dimensions</span>)
</span><button class="copy-code-btn"></button></code></pre>
<p>Cursor будет использовать сервер MCP для выполнения этой операции:</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll create a new collection called &#x27;articles&#x27; with the specified fields.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-create-collection <span class="hljs-keyword">from</span> milvus (local)

Collection <span class="hljs-comment">&#x27;articles&#x27; has been created successfully with the following schema:</span>
- title: <span class="hljs-type">string</span>
- content: <span class="hljs-type">string</span>
- vector: float vector[<span class="hljs-number">128</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Troubleshooting" class="common-anchor-header">Устранение неполадок<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Common-Issues" class="common-anchor-header">Общие проблемы</h3><h4 id="Connection-Errors" class="common-anchor-header">Ошибки подключения</h4><p>Если вы видите ошибки типа "Не удалось подключиться к серверу Milvus":</p>
<ol>
<li>Убедитесь, что ваш экземпляр Milvus запущен: <code translate="no">docker ps</code> (если используется Docker).</li>
<li>Проверьте правильность URI в вашей конфигурации</li>
<li>Убедитесь, что правила брандмауэра не блокируют соединение.</li>
<li>Попробуйте использовать <code translate="no">127.0.0.1</code> вместо <code translate="no">localhost</code> в URI.</li>
</ol>
<h4 id="Authentication-Issues" class="common-anchor-header">Проблемы с аутентификацией</h4><p>Если вы видите ошибки аутентификации:</p>
<ol>
<li>Проверьте правильность <code translate="no">MILVUS_TOKEN</code>.</li>
<li>Проверьте, требует ли ваш экземпляр Milvus аутентификации.</li>
<li>Убедитесь, что у вас есть правильные разрешения для операций, которые вы пытаетесь выполнить.</li>
</ol>
<h4 id="Tool-Not-Found" class="common-anchor-header">Инструмент не найден</h4><p>Если инструменты MCP не отображаются на рабочем столе Claude или в курсоре:</p>
<ol>
<li>Перезапустите приложение</li>
<li>Проверьте журналы сервера на наличие ошибок</li>
<li>Убедитесь, что сервер MCP работает правильно</li>
<li>Нажмите кнопку обновления в настройках MCP (для Cursor).</li>
</ol>
<h3 id="Getting-Help" class="common-anchor-header">Получение помощи</h3><p>Если вы продолжаете испытывать проблемы:</p>
<ol>
<li>Проверьте <a href="https://github.com/zilliztech/mcp-server-milvus/issues">GitHub Issues</a> на наличие аналогичных проблем.</li>
<li>Присоединитесь к <a href="https://discord.gg/zilliz">сообществу Zilliz в Discord</a> для получения поддержки</li>
<li>Создайте новый вопрос с подробной информацией о вашей проблеме.</li>
</ol>
<h2 id="Conclusion" class="common-anchor-header">Заключение<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Следуя этому руководству, вы запустили <strong>MCP-сервер</strong>, который позволяет использовать векторный поиск на основе искусственного интеллекта в Milvus. Независимо от того, используете ли вы <strong>Claude Desktop</strong> или <strong>Cursor</strong>, теперь вы можете запрашивать, управлять и искать в базе данных Milvus с помощью <strong>команд на естественном языке без</strong>написания кода базы данных!</p>
