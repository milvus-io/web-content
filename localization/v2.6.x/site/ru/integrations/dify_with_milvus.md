---
id: dify_with_milvus.md
summary: >-
  В этом руководстве мы покажем вам, как развернуть Dify с Milvus, чтобы
  обеспечить эффективный поиск и механизм RAG.
title: Развертывание Dify с помощью Milvus
---
<h1 id="Deploying-Dify-with-Milvus" class="common-anchor-header">Развертывание Dify с помощью Milvus<button data-href="#Deploying-Dify-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://dify.ai/">Dify</a> - это платформа с открытым исходным кодом, предназначенная для упрощения создания приложений искусственного интеллекта путем объединения Backend-as-a-Service с LLMOps. Она поддерживает основные LLM, предлагает интуитивно понятный интерфейс оперативной оркестровки, высококачественные RAG-движки и гибкую структуру агентов ИИ. Благодаря низкокодовым рабочим процессам, простым в использовании интерфейсам и API, Dify позволяет разработчикам и нетехническим пользователям сосредоточиться на создании инновационных, реальных ИИ-решений, не сталкиваясь со сложностями.</p>
<p>В этом руководстве мы покажем вам, как развернуть Dify с Milvus, чтобы обеспечить эффективный поиск и RAG-движок.</p>
<h2 id="Clone-the-Repository" class="common-anchor-header">Клонирование репозитория<button data-href="#Clone-the-Repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Клонируйте исходный код Dify на свою локальную машину:</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-the-Environment-Variables" class="common-anchor-header">Установите переменные окружения<button data-href="#Set-the-Environment-Variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Перейдите в каталог Docker в исходном коде Dify.</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Скопируйте файл конфигурации окружения</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<p>Измените значение <code translate="no">VECTOR_STORE</code> в файле <code translate="no">.env</code>.</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<button class="copy-code-btn"></button></code></pre>
<p>Убедитесь, что в конфигурации Milvus в файле <code translate="no">.env</code> есть следующая строка:</p>
<pre><code translate="no"><span class="hljs-attr">MILVUS_URI</span>=http://host.docker.internal:<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Обратите внимание, что, указав <code translate="no">VECTOR_STORE=milvus</code>, Dify вызовет сервер Milvus Standalone в docker. Даже если вы можете получить доступ к серверу извне Docker через <code translate="no">http://localhost:19530</code>, чтобы другие контейнеры Dify могли общаться с ним внутри среды Docker, им необходимо подключиться к специальному DNS-имени <code translate="no">host.docker.internal</code>. Таким образом, мы задаем <code translate="no">http://host.docker.internal:19530</code> как <code translate="no">MILVUS_URI</code>.</p>
<p>Для производственного развертывания вы можете захотеть настроить аутентификацию. Для получения дополнительной информации о том, как установить токен или имя пользователя и пароль в Milvus, вы можете обратиться к <a href="https://milvus.io/docs/authenticate.md?tab=docker#Update-user-password">странице аутентификации</a>.</p>
<h2 id="Start-the-Docker-Containers" class="common-anchor-header">Запуск контейнеров Docker<button data-href="#Start-the-Docker-Containers" class="anchor-icon" translate="no">
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
    </button></h2><p>Выберите соответствующую команду для запуска контейнеров в зависимости от версии Docker Compose в вашей системе. Вы можете использовать команду <code translate="no">$ docker compose version</code> для проверки версии, а также обратиться к документации Docker для получения дополнительной информации:</p>
<p>Если у вас Docker Compose V2, используйте следующую команду:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<p>Если у вас Docker Compose V1, используйте следующую команду:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Log-in-to-Dify" class="common-anchor-header">Войдите в систему Dify<button data-href="#Log-in-to-Dify" class="anchor-icon" translate="no">
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
    </button></h2><p>Откройте браузер и перейдите на страницу установки Dify, здесь вы можете установить учетную запись администратора:<code translate="no">http://localhost/install</code>, а затем войти на главную страницу Dify для дальнейшего использования.</p>
<p>Для дальнейшего использования и руководства, пожалуйста, обратитесь к <a href="https://docs.dify.ai/">документации Dify</a>.</p>
