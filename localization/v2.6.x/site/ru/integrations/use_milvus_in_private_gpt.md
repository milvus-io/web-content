---
id: use_milvus_in_private_gpt.md
summary: >-
  В этом руководстве мы покажем вам, как использовать Milvus в качестве
  внутренней базы данных векторов для PrivateGPT.
title: Использование Milvus в PrivateGPT
---
<h1 id="Use-Milvus-in-PrivateGPT" class="common-anchor-header">Использование Milvus в PrivateGPT<button data-href="#Use-Milvus-in-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://privategpt.dev/">PrivateGPT</a> - это готовый к производству ИИ-проект, который позволяет пользователям задавать вопросы о документах с помощью больших языковых моделей без подключения к интернету, обеспечивая при этом 100% конфиденциальность. PrivateGPT предлагает API, разделенный на высокоуровневые и низкоуровневые блоки. Он также предоставляет клиент Gradio UI и такие полезные инструменты, как скрипты массовой загрузки моделей и скрипты ингестирования. Концептуально PrivateGPT оборачивает конвейер RAG и раскрывает его примитивы, будучи готовым к использованию и предоставляя полную реализацию API и конвейера RAG.</p>
<p>В этом руководстве мы покажем вам, как использовать Milvus в качестве внутренней базы данных векторов для PrivateGPT.</p>
<div class="alert note">
<p>Это руководство в основном ссылается на официальное руководство по установке <a href="https://docs.privategpt.dev/installation/getting-started/installation">PrivateGPT</a>. Если вы обнаружите, что в этом руководстве есть устаревшие части, вы можете в приоритетном порядке следовать официальному руководству и создать проблему для нас.</p>
</div>
<h2 id="Base-requirements-to-run-PrivateGPT" class="common-anchor-header">Базовые требования для запуска PrivateGPT<button data-href="#Base-requirements-to-run-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Clone-the-PrivateGPT-Repository" class="common-anchor-header">1. Клонируйте репозиторий PrivateGPT</h3><p>Клонируйте репозиторий и перейдите к нему:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zylon-ai/private-gpt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> private-gpt</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Poetry" class="common-anchor-header">2. Установите Poetry</h3><p>Установите <a href="https://python-poetry.org/docs/#installing-with-the-official-installer">Poetry</a> для управления зависимостями: Для установки следуйте инструкциям на официальном сайте Poetry.</p>
<h3 id="3-Optional-Install-make" class="common-anchor-header">3. (Необязательно) Установите make</h3><p>Чтобы запускать различные скрипты, необходимо установить make.</p>
<p>macOS (с помощью Homebrew):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">brew install make</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows (использование Chocolatey):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">choco install make</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Available-Modules" class="common-anchor-header">Установите доступные модули<button data-href="#Install-Available-Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>PrivateGPT позволяет настроить некоторые модули, например, LLM, Embeddings, Vector Stores, UI.</p>
<p>В этом руководстве мы будем использовать следующие модули:</p>
<ul>
<li><strong>LLM</strong>: Ollama</li>
<li><strong>Embeddings</strong>: Ollama</li>
<li><strong>Vector Stores</strong>: Milvus</li>
<li><strong>UI</strong>: Gradio</li>
</ul>
<p>Выполните следующую команду, чтобы с помощью поэзии установить необходимые зависимости модулей:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">poetry install --extras <span class="hljs-string">&quot;llms-ollama embeddings-ollama vector-stores-milvus ui&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Ollama-service" class="common-anchor-header">Запустите службу Ollama<button data-href="#Start-Ollama-service" class="anchor-icon" translate="no">
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
    </button></h2><p>Перейдите на сайт <a href="https://ollama.com/">ollama.ai</a> и следуйте инструкциям для установки Ollama на вашу машину.</p>
<p>После установки убедитесь, что приложение Ollama для рабочего стола закрыто.</p>
<p>Теперь запустите сервис Ollama (он запустит локальный сервер вывода, обслуживающий как LLM, так и Embeddings):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ollama serve</span>
<button class="copy-code-btn"></button></code></pre>
<p>Установите модели, которые будут использоваться, по умолчанию <code translate="no">settings-ollama.yaml</code> настроен на пользователя <code translate="no">llama3.1</code> 8b LLM (~4GB) и <code translate="no">nomic-embed-text</code> Embeddings (~275MB).</p>
<p>По умолчанию PrivateGPT будет автоматически извлекать модели по мере необходимости. Это поведение можно изменить, изменив свойство <code translate="no">ollama.autopull_models</code>.</p>
<p>В любом случае, если вы хотите извлекать модели вручную, выполните следующие команды:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ollama pull llama3.1</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">ollama pull nomic-embed-text</span>
<button class="copy-code-btn"></button></code></pre>
<p>При желании вы можете изменить свои любимые модели в файле <code translate="no">settings-ollama.yaml</code> и извлекать их вручную.</p>
<h2 id="Change-Milvus-Settings" class="common-anchor-header">Изменение настроек Milvus<button data-href="#Change-Milvus-Settings" class="anchor-icon" translate="no">
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
    </button></h2><p>В файле <code translate="no">settings-ollama.yaml</code> установите для vectorstore значение milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">vectorstore:</span>
  <span class="hljs-attr">database:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>Вы также можете добавить некоторую конфигурацию Milvus, чтобы указать свои настройки. Например, так:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">uri:</span> <span class="hljs-string">http://localhost:19530</span>
  <span class="hljs-attr">collection_name:</span> <span class="hljs-string">my_collection</span>
<button class="copy-code-btn"></button></code></pre>
<p>Доступны следующие опции конфигурации:</p>
<table>
<thead>
<tr><th>Поле Опция</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td>uri</td><td>По умолчанию установлен "local_data/private_gpt/milvus/milvus_local.db" в качестве локального файла; вы также можете установить более производительный сервер Milvus на docker или k8s, например http://localhost:19530, в качестве вашего uri; Чтобы использовать <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, настройте uri и token на <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint и API key</a> в Zilliz Cloud.</td></tr>
<tr><td>токен</td><td>Пара с сервером Milvus на docker или k8s или api ключ в Zilliz Cloud.</td></tr>
<tr><td>имя_коллекции</td><td>Имя коллекции, по умолчанию установлено "milvus_db".</td></tr>
<tr><td>перезаписать</td><td>Перезаписывать данные в коллекции, если они существовали, по умолчанию установлено значение True.</td></tr>
</tbody>
</table>
<h2 id="Start-PrivateGPT" class="common-anchor-header">Запуск PrivateGPT<button data-href="#Start-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>После того как все настройки выполнены, вы можете запустить PrivateGPT с помощью пользовательского интерфейса Gradio.</p>
<pre><code translate="no" class="language-shell">PGPT_PROFILES=ollama make run
<button class="copy-code-btn"></button></code></pre>
<p>UI будет доступен по адресу <code translate="no">http://0.0.0.0:8001</code>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/private_gpt_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Вы можете поиграть с пользовательским интерфейсом и задать вопросы о ваших документах.</p>
<p>За более подробной информацией обращайтесь к официальной документации <a href="https://docs.privategpt.dev/">PrivateGPT</a>.</p>
