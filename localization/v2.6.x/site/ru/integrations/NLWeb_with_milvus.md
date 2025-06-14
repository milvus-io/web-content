---
id: NLWeb_with_milvus.md
summary: >-
  Узнайте, как интегрировать Microsoft NLWeb с Milvus для создания мощных
  интерфейсов естественного языка для веб-сайтов. В этом учебном пособии
  показано, как использовать возможности векторной базы данных Milvus для
  эффективного семантического поиска, хранения вложений и извлечения контекста в
  приложениях NLWeb.
title: Использование NLWeb с Milvus
---
<h1 id="Using-NLWeb-with-Milvus" class="common-anchor-header">Использование NLWeb с Milvus<button data-href="#Using-NLWeb-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/microsoft/NLWeb">NLWeb от Microsoft</a> - это предлагаемый фреймворк, позволяющий создавать интерфейсы естественного языка для веб-сайтов, используя <a href="https://schema.org/">Schema.org</a>, такие форматы, как RSS и новый протокол MCP.</p>
<p><a href="https://milvus.io/">Milvus</a> поддерживается как бэкэнд векторной базы данных в NLWeb для встраивания хранения и эффективного поиска векторного сходства, обеспечивая мощный контекстный поиск для приложений обработки естественного языка.</p>
<blockquote>
<p>Эта документация в основном основана на официальной документации по <a href="https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md">быстрому запуску</a>. Если вы обнаружите устаревшее или несоответствующее содержание, пожалуйста, отдайте предпочтение официальной документации и не стесняйтесь поднимать вопрос для нас.</p>
</blockquote>
<h2 id="Usage" class="common-anchor-header">Использование<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>NLWeb может быть настроен на использование Milvus в качестве поискового механизма. Ниже приведено руководство по настройке и использованию NLWeb с Milvus.</p>
<h3 id="Installation" class="common-anchor-header">Установка</h3><p>Клонируйте репо и настройте ваше окружение:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/microsoft/NLWeb
<span class="hljs-built_in">cd</span> NLWeb
python -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate  <span class="hljs-comment"># or `.venv\Scripts\activate` on Windows</span>
<span class="hljs-built_in">cd</span> code
pip install -r requirements.txt
pip install pymilvus  <span class="hljs-comment"># Add Milvus Python client</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-Milvus" class="common-anchor-header">Настройка Milvus</h3><p>Чтобы использовать <strong>Milvus</strong>, обновите конфигурацию.</p>
<h4 id="Update-config-files-in-codeconfig" class="common-anchor-header">Обновите файлы конфигурации в <code translate="no">code/config</code></h4><p>Откройте файл <code translate="no">config_retrieval.yaml</code> и добавьте конфигурацию Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">preferred_endpoint:</span> <span class="hljs-string">milvus_local</span>

<span class="hljs-attr">endpoints:</span>
  <span class="hljs-attr">milvus_local:</span>
    <span class="hljs-attr">database_path:</span> <span class="hljs-string">&quot;../data/milvus.db&quot;</span>
    <span class="hljs-comment"># Set the collection name to use</span>
    <span class="hljs-attr">index_name:</span> <span class="hljs-string">nlweb_collection</span>
    <span class="hljs-comment"># Specify the database type</span>
    <span class="hljs-attr">db_type:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Loading-Data" class="common-anchor-header">Загрузка данных</h3><p>После настройки загрузите контент с помощью RSS-каналов.</p>
<p>Из каталога <code translate="no">code</code>:</p>
<pre><code translate="no" class="language-bash">python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
<button class="copy-code-btn"></button></code></pre>
<p>Это позволит загрузить контент в коллекцию Milvus, сохранив как текстовые данные, так и векторные вкрапления.</p>
<h3 id="Running-the-Server" class="common-anchor-header">Запуск сервера</h3><p>Чтобы запустить NLWeb, из каталога <code translate="no">code</code> выполните команду run:</p>
<pre><code translate="no" class="language-bash">python app-file.py
<button class="copy-code-btn"></button></code></pre>
<p>Теперь вы можете запрашивать контент с помощью естественного языка, используя веб-интерфейс на http://localhost:8000/ или напрямую через MCP-совместимый REST API.</p>
<h2 id="Further-Reading" class="common-anchor-header">Дальнейшее чтение<button data-href="#Further-Reading" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs">Документация Milvus</a></li>
<li><a href="https://github.com/microsoft/NLWeb">Источник NLWeb</a></li>
<li>Жизнь чат-запроса</li>
<li>Модификация поведения путем изменения подсказок</li>
<li>Изменение потока управления</li>
<li>Изменение пользовательского интерфейса</li>
</ul>
