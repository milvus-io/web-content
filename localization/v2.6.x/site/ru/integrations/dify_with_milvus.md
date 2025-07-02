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
<div class="alert note">
<p>Эта документация в основном основана на официальной <a href="https://docs.dify.ai/">документации Dify</a>. Если вы обнаружите устаревшее или несоответствующее содержание, пожалуйста, отдайте предпочтение официальной документации и не стесняйтесь поднимать для нас проблему.</p>
</div>
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
    </button></h2><h3 id="Clone-the-Repository" class="common-anchor-header">Клонировать репозиторий</h3><p>Клонируйте исходный код Dify на свою локальную машину:</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Environment-Configuration" class="common-anchor-header">Подготовьте конфигурацию среды</h3><p>Перейдите в каталог Docker в исходном коде Dify.</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Скопируйте файл конфигурации окружения</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deployment-Options" class="common-anchor-header">Варианты развертывания<button data-href="#Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете развернуть Dify с помощью Milvus, используя два различных подхода. Выберите тот, который лучше всего соответствует вашим потребностям:</p>
<h2 id="Option-1-Using-Milvus-with-Docker" class="common-anchor-header">Вариант 1: Использование Milvus с Docker<button data-href="#Option-1-Using-Milvus-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом варианте контейнеры Milvus запускаются вместе с Dify на вашей локальной машине с помощью Docker Compose.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Настройте переменные окружения</h3><p>Отредактируйте файл <code translate="no">.env</code> со следующей конфигурацией Milvus:</p>
<pre><code translate="no">VECTOR_STORE=milvus
MILVUS_URI=http://host.docker.internal:19530
MILVUS_TOKEN=
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>В <code translate="no">MILVUS_URI</code> используется <code translate="no">host.docker.internal:19530</code>, который позволяет контейнерам Docker получать доступ к Milvus, запущенному на хост-машине, через внутреннюю сеть Docker.</li>
<li><code translate="no">MILVUS_TOKEN</code> можно оставить пустым для локального развертывания Milvus.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Запуск контейнеров Docker</h3><p>Запустите контейнеры с профилем <code translate="no">milvus</code>, чтобы включить службы Milvus:</p>
<pre><code translate="no" class="language-shell">docker compose --profile milvus up -d
<button class="copy-code-btn"></button></code></pre>
<p>Эта команда запустит службу Dify вместе с контейнерами <code translate="no">milvus-standalone</code>, <code translate="no">etcd</code> и <code translate="no">minio</code>.</p>
<h2 id="Option-2-Using-Zilliz-Cloud" class="common-anchor-header">Вариант 2: Использование облака Zilliz<button data-href="#Option-2-Using-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Этот вариант подключает Dify к управляемой службе Milvus на Zilliz Cloud.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Настройте переменные окружения</h3><p>Отредактируйте файл <code translate="no">.env</code>, указав данные подключения к Zilliz Cloud:</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<span class="hljs-attr">MILVUS_URI</span>=YOUR_ZILLIZ_CLOUD_ENDPOINT
<span class="hljs-attr">MILVUS_TOKEN</span>=YOUR_ZILLIZ_CLOUD_API_KEY
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Замените <code translate="no">YOUR_ZILLIZ_CLOUD_ENDPOINT</code> на вашу <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">публичную конечную точку</a> из Zilliz Cloud.</li>
<li>Замените <code translate="no">YOUR_ZILLIZ_CLOUD_API_KEY</code> на ваш <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">API-ключ</a> от Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Запуск контейнеров Docker</h3><p>Запустите только контейнеры Dify без профиля Milvus:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-Dify" class="common-anchor-header">Доступ к Dify<button data-href="#Accessing-Dify" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Log-in-to-Dify" class="common-anchor-header">Войдите в Dify</h3><p>Откройте браузер и перейдите на страницу установки Dify, здесь вы можете установить учетную запись администратора:<code translate="no">http://localhost/install</code>, а затем войти на главную страницу Dify для дальнейшего использования.</p>
<p>Для дальнейшего использования и руководства, пожалуйста, обратитесь к <a href="https://docs.dify.ai/">документации Dify</a>.</p>
