---
id: milvus_for_agents.md
title: Milvus для ИИ-агентов
summary: >-
  Узнайте, как ИИ-агенты могут использовать Milvus в качестве векторной базы
  данных для RAG, семантического поиска и долгосрочной памяти.
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">Milvus для ИИ-агентов<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus предоставляет удобные для агентов интерфейсы, которые позволяют агентам по разработке ИИ и автономным агентским системам программно взаимодействовать с векторными базами данных. Независимо от того, создаете ли вы конвейеры RAG, системы семантического поиска или системы памяти агентов, Milvus предлагает множество способов подключения и работы агентов.</p>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Навык агента для Claude Code, который обучает большие языковые модели (LLM) использовать PyMilvus для работы с векторными базами данных.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Сервер MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Сервер Model Context Protocol, позволяющий любому агенту, совместимому с MCP, напрямую взаимодействовать с Milvus.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Claude Context MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Сервер MCP, разработанный для Claude Code, обеспечивающий контекстно-зависимый доступ к документации Milvus.</p>
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
    </button></h2><p>Тщательно отобранные подсказки, помогающие ИИ-помощникам по программированию писать корректный код Milvus. Каждая подсказка содержит правила и шаблоны, позволяющие избежать наиболее распространенных ошибок.</p>
<p><strong>Как использовать:</strong></p>
<ol>
<li><strong>Скопируйте</strong> подсказку из раздела «Полная подсказка» на любой странице с подсказками.</li>
<li><strong>Сохраните</strong> его в формате, поддерживаемом вашим ИИ-инструментом (см. <a href="#use-in-different-environments">таблицу сред</a> ниже).</li>
<li>Ваш ИИ-помощник автоматически применит эти правила при генерации или проверке кода Milvus.</li>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Правила верхнего уровня для любого агента кодирования на базе ИИ. Начните с этого файла, если вам нужен только один файл.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ru/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Правильные шаблоны подключения, использование MilvusClient и запрет на использование ORM API.</p>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Искусственный нейронный поиск (ANN), гибридный поиск и полнотекстовый поиск с правилами критических ограничений.</p>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Сквозной поток генерации с расширением поиска с использованием Milvus.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/ru/nodejs_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">SDK для Node.js</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Вызовы методов MilvusClient, определения полей, проверка статуса ответов и форматы результатов поиска.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ru/go_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">SDK для Go</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Пути к модулям Go SDK v3, таймауты подключения, загрузка коллекций и наборы результатов поиска.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/ru/restful_api.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RESTful API v2</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Конечные точки v2, поля запросов в формате camelCase, проверка кодов ответов и опрос состояния нагрузки.</p>
  </a>
</div>
</div>
<p>Карточки для AGENTS.md и четырех тематических подсказок открывают версию на Python. Каждая из них также имеет версии на Node.js, Go и RESTful API v2:</p>
<table>
<thead>
<tr><th>Запрос</th><th>Python</th><th>Node.js</th><th>Go</th><th>RESTful API v2</th></tr>
</thead>
<tbody>
<tr><td>AGENTS.md</td><td><a href="/docs/ru/agents_overview.md">Python</a></td><td><a href="/docs/ru/agents_overview_nodejs.md">Node.js</a></td><td><a href="/docs/ru/agents_overview_go.md">Go</a></td><td><a href="/docs/ru/agents_overview_restful.md">RESTful API v2</a></td></tr>
<tr><td>Проектирование схем</td><td><a href="/docs/ru/schema_design.md">Python</a></td><td><a href="/docs/ru/schema_design_nodejs.md">Node.js</a></td><td><a href="/docs/ru/schema_design_go.md">Go</a></td><td><a href="/docs/ru/schema_design_restful.md">RESTful API версии 2</a></td></tr>
<tr><td>Шаблоны поиска</td><td><a href="/docs/ru/search_patterns.md">Python</a></td><td><a href="/docs/ru/search_patterns_nodejs.md">Node.js</a></td><td><a href="/docs/ru/search_patterns_go.md">Go</a></td><td><a href="/docs/ru/search_patterns_restful.md">RESTful API v2</a></td></tr>
<tr><td>Выбор индекса</td><td><a href="/docs/ru/index_selection.md">Python</a></td><td><a href="/docs/ru/index_selection_nodejs.md">Node.js</a></td><td><a href="/docs/ru/index_selection_go.md">Go</a></td><td><a href="/docs/ru/index_selection_restful.md">RESTful API v2</a></td></tr>
<tr><td>Конвейер RAG</td><td><a href="/docs/ru/rag_pipeline.md">Python</a></td><td><a href="/docs/ru/rag_pipeline_nodejs.md">Node.js</a></td><td><a href="/docs/ru/rag_pipeline_go.md">Go</a></td><td><a href="/docs/ru/rag_pipeline_restful.md">RESTful API версии 2</a></td></tr>
</tbody>
</table>
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
<tr><th>Среда</th><th>Где разместить запрос</th><th>Инструкции</th></tr>
</thead>
<tbody>
<tr><td>Курсор</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">Настройка правил проекта</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">Пользовательские инструкции</a></td></tr>
<tr><td>Claude Code</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Документация по Claude Code</a></td></tr>
<tr><td>IDE от JetBrains</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">Настройка рекомендаций</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Практикум по Gemini CLI</a></td></tr>
<tr><td>VS Code</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">Настройка файла .instructions.md</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">Настройка файла guidelines.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">Рекомендуемое развертывание агентов<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>Выбор подходящего варианта развертывания Milvus зависит от этапа разработки.</p>
<table>
<thead>
<tr><th>Этап</th><th>Развертывание</th><th>Почему</th></tr>
</thead>
<tbody>
<tr><td>Создание прототипа</td><td><a href="/docs/ru/milvus_lite.md">Milvus Lite</a></td><td>Не требует настройки, работает в процессе. Запускается везде, где работает Python — идеально подходит для быстрого прототипирования агентов.</td></tr>
<tr><td>Разработка</td><td><a href="/docs/ru/install_standalone-docker.md">Milvus Standalone</a></td><td>Развертывание в Docker на одном узле. Подходит для локальной разработки и тестирования с реалистичными объемами данных.</td></tr>
<tr><td>Производственная среда</td><td><a href="https://cloud.zilliz.com/signup">Zilliz Cloud</a></td><td>Полностью управляемый Milvus без серверов. Не требуется управление инфраструктурой — агенты просто подключаются и работают.</td></tr>
<tr><td>Самостоятельное развертывание в производственной среде</td><td><a href="/docs/ru/install_cluster-helm.md">Распределенная версия Milvus</a></td><td>Развертывание Kubernetes с несколькими узлами для команд, которым требуется полный контроль над своей инфраструктурой.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Для рабочих нагрузок агентов в производственной среде рекомендуется использовать <strong><a href="https://zilliz.com/cloud">Zilliz Cloud</a></strong>. Агенты, как правило, не управляют инфраструктурой, поэтому бессерверное развертывание устраняет операционные накладные расходы и обеспечивает автоматическое масштабирование.</p>
</div>
