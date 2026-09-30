---
id: basic_memory_with_milvus.md
summary: >-
  В этом руководстве мы создадим небольшой проект по управлению знаниями для
  команды разработчиков приложения. Мы будем записывать заметки о кэшировании,
  аутентификации, развертывании и резервном копировании, а затем находить нужные
  заметки с помощью семантического и гибридного поиска.
title: Создание семантической памяти проекта с помощью Basic Memory и Milvus
---
<h1 id="Build-Semantic-Project-Memory-with-Basic-Memory-and-Milvus" class="common-anchor-header">Создание семантической памяти проекта с помощью Basic Memory и Milvus<button data-href="#Build-Semantic-Project-Memory-with-Basic-Memory-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/basicmachines-co/basic-memory">Basic Memory</a> хранит знания о проекте в обычных файлах Markdown и делает их доступными через CLI и сервер MCP. Это предоставляет агенту-программисту надежное место для сохранения решений, руководств и уроков, которые должны сохраняться после завершения одного разговора.</p>
<p>В этом руководстве мы создадим небольшой проект памяти для команды разработчиков приложения. Мы запишем заметки о кэшировании, аутентификации, развертывании и резервном копировании, а затем будем находить нужные заметки с помощью семантического и гибридного поиска.</p>
<p><a href="https://milvus.io/">Milvus</a> будет хранить векторы и выполнять поиск по схожести. Basic Memory продолжит управлять заметками в формате Markdown, метаданными проекта, полнотекстовым поиском и манифестом векторов в PostgreSQL.</p>
<pre><code translate="no" class="language-text">Markdown notes
      |
      v
Basic Memory CLI / MCP
      |-- PostgreSQL: projects, metadata, full-text search, vector manifest
      |-- OpenAI: embeddings
      `-- Milvus: vector persistence and similarity search
<button class="copy-code-btn"></button></code></pre>
<p>В этом руководстве используется Milvus Lite, который запускается локально по пути на вашем компьютере. Та же самая конфигурация Basic Memory впоследствии может указывать на Milvus Standalone, Milvus Distributed или Zilliz Cloud.</p>
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
    </button></h2><p>Вам потребуется:</p>
<ul>
<li>Python 3.12 или более поздней версии</li>
<li><a href="https://docs.astral.sh/uv/"><code translate="no">uv</code></a></li>
<li>База данных PostgreSQL и URL-адрес для подключения по протоколу <code translate="no">postgresql+asyncpg://...</code> </li>
<li>Ключ API OpenAI</li>
</ul>
<p>Установите Basic Memory вместе с дополнительными зависимостями Milvus из PyPI:</p>
<pre><code translate="no" class="language-bash">uv tool install --python 3.12 <span class="hljs-string">&quot;basic-memory[milvus]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Basic-Memory" class="common-anchor-header">Настройте Basic Memory<button data-href="#Configure-Basic-Memory" class="anchor-icon" translate="no">
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
    </button></h2><p>Создайте рабочую область для этого руководства. Хранение конфигурации Basic Memory и данных Milvus Lite здесь упрощает изучение примера и его удаление впоследствии.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> -p basic-memory-milvus-demo/notes
<span class="hljs-built_in">cd</span> basic-memory-milvus-demo

<span class="hljs-built_in">export</span> BASIC_MEMORY_CONFIG_DIR=<span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/.basic-memory&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Настройте PostgreSQL в качестве основной базы данных, OpenAI — в качестве поставщика вложений, а Milvus — в качестве векторного индекса:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_DATABASE_BACKEND=postgres
<span class="hljs-built_in">export</span> BASIC_MEMORY_DATABASE_URL=<span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span>

<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED=<span class="hljs-literal">true</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_VECTOR_INDEX=milvus
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/basic-memory-vectors.db&quot;</span>

<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER=openai
<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL=text-embedding-3-small
<span class="hljs-built_in">export</span> OPENAI_API_KEY=<span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Здесь <code translate="no">BASIC_MEMORY_MILVUS_URI</code> — это локальный путь, поэтому PyMilvus запускает Milvus Lite автоматически. Отдельный сервер Milvus не требуется.</p>
<p>Использование Milvus в «Базовой памяти» в целом не является обязательным, но в данном учебном пособии он выбран в качестве векторного бэкэнда. В настоящее время этот выбор действует только в том случае, если в качестве основного бэкэнда базы данных используется PostgreSQL. В проектах «Базовой памяти» на основе SQLite вместо этого используется <code translate="no">sqlite-vec</code>.</p>
<h2 id="Create-a-memory-project" class="common-anchor-header">Создание проекта «memory»<button data-href="#Create-a-memory-project" class="anchor-icon" translate="no">
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
    </button></h2><p>Проект Basic Memory сопоставляет имя с каталогом заметок в формате Markdown. Добавьте каталог с этим руководством в качестве проекта и сделайте его проектом по умолчанию:</p>
<pre><code translate="no" class="language-bash">bm project add app-memory <span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/notes&quot;</span> --default
<button class="copy-code-btn"></button></code></pre>
<p>Теперь у команды разработчиков приложения есть надежное пространство для хранения данных. Давайте заполним его небольшим смешанным каталогом. Некоторые заметки будут иметь отношение к нашим последующим вопросам, а другие послужат реалистичными отвлекающими факторами.</p>
<h2 id="Record-project-memories" class="common-anchor-header">Запись памяти проекта<button data-href="#Record-project-memories" class="anchor-icon" translate="no">
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
    </button></h2><p>Начните с решения о кэшировании в приложении:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Caching Strategy&quot;</span> \
  --folder <span class="hljs-string">&quot;engineering&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Caching Strategy</span>

The application caches read-heavy product responses <span class="hljs-keyword">in</span> Redis <span class="hljs-keyword">for</span> five minutes. This avoids repeated database queries and makes repeated requests faster. Cache entries are invalidated immediately after a write.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Запишите, как обрабатываются токены аутентификации:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Authentication Tokens&quot;</span> \
  --folder <span class="hljs-string">&quot;engineering&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Authentication Tokens</span>

JWT access tokens expire after fifteen minutes. Refresh tokens rotate on every use. After suspicious activity, revoke the entire token family and require the user to sign <span class="hljs-keyword">in</span> again.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Добавьте два операционных руководства:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Deployment Reliability&quot;</span> \
  --folder <span class="hljs-string">&quot;operations&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Deployment Reliability</span>

Production releases use a canary deployment. Readiness probes must pass before traffic shifts, and the rollout automatically stops when the error rate crosses the agreed threshold.
EOF

bm tool write-note \
  --title <span class="hljs-string">&quot;Database Backups&quot;</span> \
  --folder <span class="hljs-string">&quot;operations&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Database Backups</span>

PostgreSQL uses daily snapshots and continuous write-ahead <span class="hljs-built_in">log</span> archiving. The team runs a restore drill every month and records the recovery point and recovery time.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Наконец, добавьте две несвязанные между собой заметки о продукте. Они сделают упражнение по поиску более репрезентативным, чем каталог, в котором каждый документ является релевантным:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;UI Accessibility&quot;</span> \
  --folder <span class="hljs-string">&quot;product&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># UI Accessibility</span>

The settings screen must support keyboard navigation, visible focus states, sufficient color contrast, and descriptive labels <span class="hljs-keyword">for</span> screen readers.
EOF

bm tool write-note \
  --title <span class="hljs-string">&quot;Content Planning&quot;</span> \
  --folder <span class="hljs-string">&quot;product&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Content Planning</span>

The content calendar tracks blog drafts, launch screenshots, reviewers, and publication dates <span class="hljs-keyword">for</span> the next product release.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Каждая заметка по-прежнему представляет собой обычный файл Markdown, расположенный в папке <code translate="no">notes/</code>. Basic Memory добавляет структуру, по которой можно выполнять поиск, не отнимая при этом прав владения у файловой системы.</p>
<h2 id="Build-the-search-indexes" class="common-anchor-header">Создайте поисковые индексы<button data-href="#Build-the-search-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Запустите полную переиндексацию после добавления или существенного изменения группы заметок:</p>
<pre><code translate="no" class="language-bash">bm reindex --full --project app-memory
<button class="copy-code-btn"></button></code></pre>
<p>На этом этапе Basic Memory:</p>
<ol>
<li>Считывает и разбивает заметки Markdown на фрагменты.</li>
<li>Создаёт полнотекстовый индекс PostgreSQL.</li>
<li>Отправляет фрагменты в настроенную модель встраивания OpenAI.</li>
<li>Сохраняет полученные векторы в коллекции Milvus, специфичной для проекта.</li>
<li>помечает успешно сохраненные фрагменты как готовые в своём векторном манифесте PostgreSQL.</li>
</ol>
<p>Basic Memory использует детерминированную коллекцию Milvus для каждого проекта. Вам не нужно самостоятельно создавать или называть коллекцию.</p>
<h2 id="Retrieve-a-memory-by-meaning" class="common-anchor-header">Поиск по смыслу<button data-href="#Retrieve-a-memory-by-meaning" class="anchor-icon" translate="no">
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
    </button></h2><p>Предположим, что новый инженер помнит, что в приложении реализована оптимизация для повторных запросов, но не помнит, что команда назвала это «стратегией кэширования».</p>
<p>Используйте векторный поиск, чтобы задать вопрос на естественном языке:</p>
<pre><code translate="no" class="language-bash">bm tool search-notes \
  <span class="hljs-string">&quot;How does the application make repeated requests faster?&quot;</span> \
  --vector \
  --project app-memory \
  --page-size 3 \
  --plain
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">Caching Strategy</code> должен быть ведущим результатом, даже если в запросе не повторяется название заметки. Векторный поиск встраивает вопрос и запрашивает у Milvus ближайшие сохраненные фрагменты.</p>
<p>Точные оценки и результаты с более низким рейтингом могут варьироваться в зависимости от модели вложения и содержания проекта.</p>
<h2 id="Combine-semantic-and-keyword-signals" class="common-anchor-header">Объединение семантических сигналов и сигналов по ключевым словам<button data-href="#Combine-semantic-and-keyword-signals" class="anchor-icon" translate="no">
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
    </button></h2><p>Теперь представьте, что вы реагируете на инцидент безопасности. Запрос содержит точные термины, такие как « <code translate="no">JWT</code> », но нам также нужны концептуально связанные формулировки об аннулировании токена и повторном входе в систему.</p>
<p>Используйте гибридный поиск:</p>
<pre><code translate="no" class="language-bash">bm tool search-notes \
  <span class="hljs-string">&quot;JWT rotation after suspicious activity&quot;</span> \
  --hybrid \
  --project app-memory \
  --page-size 3 \
  --plain
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">Authentication Tokens</code> должен быть ведущим результатом. Basic Memory сочетает полнотекстовый поиск PostgreSQL с векторным поиском Milvus, отдавая предпочтение контенту, сильному в любом из этих направлений, и особенно контенту, найденному обоими способами.</p>
<p>Три режима поиска имеют разные преимущества:</p>
<table>
<thead>
<tr><th>Режим</th><th>Флаг команды</th><th>Наилучшее применение</th></tr>
</thead>
<tbody>
<tr><td>Полнотекстовый</td><td>Без флага режима</td><td>Точные термины, фразы и булевы запросы по ключевым словам</td></tr>
<tr><td>Векторный</td><td><code translate="no">--vector</code></td><td>Парафразы, концепции и поисковые запросы</td></tr>
<tr><td>Гибридный</td><td><code translate="no">--hybrid</code></td><td>Поиск общего назначения с использованием как ключевых слов, так и семантических сигналов</td></tr>
</tbody>
</table>
<h2 id="Use-another-Milvus-deployment" class="common-anchor-header">Используйте другую версию Milvus<button data-href="#Use-another-Milvus-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Код приложения и команды Basic Memory не изменяются, когда вы выходите за рамки возможностей Milvus Lite. Измените URI и, при необходимости, укажите токен.</p>
<p>Для сервера Milvus:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Для Zilliz Cloud:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;https://YOUR_CLUSTER_ENDPOINT&quot;</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_TOKEN=<span class="hljs-string">&quot;YOUR_API_KEY&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Создайте новую целевую коллекцию или следуйте процедуре миграции векторного хранилища Basic Memory перед переключением существующего проекта между векторными бэкэндами. Затем пересоздайте векторы:</p>
<pre><code translate="no" class="language-bash">bm reindex --full --project app-memory
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-the-same-memory-through-MCP" class="common-anchor-header">Используйте ту же память через MCP<button data-href="#Use-the-same-memory-through-MCP" class="anchor-icon" translate="no">
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
    </button></h2><p>CLI удобен для настройки, обслуживания, написания скриптов и понимания потока данных. В повседневной работе клиент MCP может запускать тот же сервис Basic Memory и напрямую вызывать такие инструменты, как <code translate="no">write_note</code>, <code translate="no">search_notes</code> и <code translate="no">build_context</code>.</p>
<p>Например, конфигурация Codex MCP может запустить команду, установленную с помощью <code translate="no">uv tool</code>:</p>
<pre><code translate="no" class="language-toml"><span class="hljs-section">[mcp_servers.basic-memory]</span>
<span class="hljs-attr">command</span> = <span class="hljs-string">&quot;basic-memory&quot;</span>
<span class="hljs-attr">args</span> = [<span class="hljs-string">&quot;mcp&quot;</span>]

<span class="hljs-section">[mcp_servers.basic-memory.env]</span>
<span class="hljs-attr">BASIC_MEMORY_CONFIG_DIR</span> = <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/.basic-memory&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_DATABASE_BACKEND</span> = <span class="hljs-string">&quot;postgres&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_DATABASE_URL</span> = <span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED</span> = <span class="hljs-string">&quot;true&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_VECTOR_INDEX</span> = <span class="hljs-string">&quot;milvus&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_MILVUS_URI</span> = <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/basic-memory-vectors.db&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER</span> = <span class="hljs-string">&quot;openai&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL</span> = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>
<span class="hljs-attr">OPENAI_API_KEY</span> = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Другие клиенты MCP используют тот же исполняемый файл и аргументы в формате JSON:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;basic-memory&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;basic-memory&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;mcp&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;env&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_CONFIG_DIR&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/.basic-memory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_DATABASE_BACKEND&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;postgres&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_DATABASE_URL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_VECTOR_INDEX&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_MILVUS_URI&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/basic-memory-vectors.db&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;openai&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text-embedding-3-small&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;OPENAI_API_KEY&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sk-***********&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>По возможности храните пароли к базам данных и ключи API в системе управления секретными данными вашего клиента или в среде запуска. Важное требование заключается в том, чтобы процесс MCP получал ту же конфигурацию Basic Memory, что и CLI.</p>
<h2 id="What-each-storage-layer-owns" class="common-anchor-header">Что принадлежит каждому уровню хранения<button data-href="#What-each-storage-layer-owns" class="anchor-icon" translate="no">
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
    </button></h2><p>В конце этого руководства обязанности намеренно разделены:</p>
<ul>
<li>Каталог проекта отвечает за исходные заметки в формате Markdown.</li>
<li>PostgreSQL отвечает за проекты, сущности, метаданные, полнотекстовый индекс и авторитетный векторный манифест Basic Memory.</li>
<li>OpenAI преобразует фрагменты заметок и поисковые запросы в вложения.</li>
<li>Milvus отвечает за сохранность векторных данных и поиск ближайших соседей.</li>
<li>Basic Memory координирует работу всех уровней и предоставляет единый интерфейс для командной строки (CLI) и MCP.</li>
</ul>
<p>Таким образом, в данной интеграции Milvus не заменяет PostgreSQL. Он заменяет путь « <code translate="no">pgvector</code> » в PostgreSQL для хранения векторов и поиска по схожести, в то время как остальные реляционные и полнотекстовые функции Basic Memory остаются в PostgreSQL.</p>
