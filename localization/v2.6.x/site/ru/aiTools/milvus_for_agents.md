---
id: milvus_for_agents.md
title: Milvus для агентов искусственного интеллекта
summary: >-
  Узнайте, как агенты искусственного интеллекта могут использовать Milvus в
  качестве векторной базы данных для RAG, семантического поиска и долговременной
  памяти.
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">Milvus для агентов искусственного интеллекта<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus предоставляет удобные для агентов интерфейсы, позволяющие агентам кодирования ИИ и автономным системам агентов программно взаимодействовать с векторными базами данных. Независимо от того, создаете ли вы конвейеры RAG, семантический поиск или системы памяти агентов, Milvus предлагает множество способов подключения и работы агентов.</p>
<h2 id="Agent-tools" class="common-anchor-header">Инструменты для агентов<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    </button></h2><div class="card-wrapper">
<div class="start_card_container">
  <a href="https://github.com/zilliztech/milvus-skill" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Навык Milvus</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Агентский навык для Claude Code, который учит LLM использовать PyMilvus для работы с векторными базами данных.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Сервер MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Сервер Model Context Protocol, позволяющий любому MCP-совместимому агенту напрямую взаимодействовать с Milvus.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Claude Context MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">MCP-сервер, разработанный для Claude Code, обеспечивающий контекстно-ориентированный доступ к документации Milvus.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ru/integrations_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Фреймворки агентов</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Интеграция с LangChain, LlamaIndex, OpenAI Agents и другими фреймворками для оркестровки агентов.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">Подсказки ИИ<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>Подсказки, которые помогают помощникам по кодированию на основе искусственного интеллекта писать правильный код Milvus. Каждая подсказка содержит правила и шаблоны, которые предотвращают наиболее распространенные ошибки.</p>
<p><strong>Как использовать:</strong></p>
<ol>
<li><strong>Скопируйте</strong> подсказку из раздела "Полная подсказка" на любой странице подсказки.</li>
<li><strong>Сохраните</strong> ее в файле, который ожидает ваш инструмент искусственного интеллекта (см. <a href="#use-in-different-environments">таблицу сред</a> ниже).</li>
<li>Ваш помощник ИИ будет автоматически применять правила при генерации или проверке кода Milvus.</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">Страницы подсказок<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
    </button></h3><div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ru/agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTS.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Правила верхнего уровня для любого агента кодирования ИИ. Начните здесь, если вам нужен только один файл.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ru/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Правильные шаблоны соединений, использование MilvusClient и запрет ORM API.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ru/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Проектирование схемы</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Типы полей, первичные ключи, неизменяемость схемы и настройка BM25.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ru/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Шаблоны поиска</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">ANN, гибридный и полнотекстовый поиск с правилами критических ограничений.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ru/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Выбор индекса</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Дерево решений для AUTOINDEX, HNSW, DiskANN и IVF_FLAT.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ru/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Конвейер RAG</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Конечный поток генерации с дополненным поиском и Milvus.</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">Использование в различных средах<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Среда</th><th>Где разместить подсказку</th><th>Инструкции</th></tr>
</thead>
<tbody>
<tr><td>Курсор</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">Настройка правил проекта</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">Пользовательские инструкции</a></td></tr>
<tr><td>Код Клода</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Документация по Claude Code</a></td></tr>
<tr><td>JetBrains IDEs</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">Рекомендации по настройке</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Кодовая лаборатория Gemini CLI</a></td></tr>
<tr><td>VS Code</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">Настройка .instructions.md</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">Настроить guidelines.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">Рекомендуемое развертывание для агентов<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>Выбор правильного развертывания Milvus зависит от стадии разработки.</p>
<table>
<thead>
<tr><th>Стадия</th><th>Развертывание</th><th>Зачем</th></tr>
</thead>
<tbody>
<tr><td>Прототипирование</td><td><a href="/docs/ru/milvus_lite.md">Milvus Lite</a></td><td>Нулевая конфигурация, в процессе. Запускается везде, где работает Python - идеально подходит для быстрого создания прототипов агентов.</td></tr>
<tr><td>Разработка</td><td><a href="/docs/ru/install_standalone-docker.md">Milvus Standalone</a></td><td>Одноузловое развертывание в Docker. Хорошо подходит для локальной разработки и тестирования с реалистичными объемами данных.</td></tr>
<tr><td>Производство</td><td><a href="https://cloud.zilliz.com/signup">Облако Zilliz</a></td><td>Полностью управляемый, бессерверный Milvus. Никакой инфраструктуры для управления - агенты просто подключаются и работают.</td></tr>
<tr><td>Самостоятельное производство</td><td><a href="/docs/ru/install_cluster-helm.md">Milvus Distributed</a></td><td>Многоузловое развертывание Kubernetes для команд, которым необходим полный контроль над инфраструктурой.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Для агентских рабочих нагрузок рекомендуется использовать <strong>Zilliz Cloud</strong>. Агенты, как правило, не управляют инфраструктурой, поэтому бессерверное развертывание устраняет операционные накладные расходы и обеспечивает автоматическое масштабирование.</p>
</div>
<h2 id="Quick-connection-examples" class="common-anchor-header">Примеры быстрого подключения<button data-href="#Quick-connection-examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Подключитесь к Milvus из кода вашего агента:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Lite (local, zero-config)</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_agent.db&quot;</span>)

<span class="hljs-comment"># Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Zilliz Cloud</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;YOUR_ZILLIZ_CLOUD_URI&quot;</span>,
    token=<span class="hljs-string">&quot;YOUR_ZILLIZ_CLOUD_TOKEN&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Next-steps" class="common-anchor-header">Следующие шаги<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><a href="/docs/ru/quickstart.md">Быстрый старт</a> - запустите свой первый поиск в Milvus за несколько минут.</li>
<li><a href="/docs/ru/integrations_overview.md">Интеграция с агентскими фреймворками</a> - подключите Milvus к LangChain, LlamaIndex, OpenAI Agents и многим другим.</li>
</ul>
