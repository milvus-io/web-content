---
id: use_milvus_in_docsgpt.md
summary: >-
  В этом руководстве мы покажем вам, как использовать Milvus в качестве
  внутренней базы данных векторов для DocsGPT.
title: Использование Milvus в DocsGPT
---
<h1 id="Use-Milvus-in-DocsGPT" class="common-anchor-header">Использование Milvus в DocsGPT<button data-href="#Use-Milvus-in-DocsGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/arc53/DocsGPT">DocsGPT</a> - это передовое решение с открытым исходным кодом, которое упрощает поиск информации в проектной документации за счет интеграции мощных моделей GPT. Оно позволяет разработчикам легко получать точные ответы на свои вопросы о проекте, избавляя их от трудоемкого ручного поиска.</p>
<p>В этом руководстве мы покажем вам, как использовать Milvus в качестве внутренней векторной базы данных для DocsGPT.</p>
<div class="alert note">
<p>Это руководство в основном ссылается на официальное руководство по установке <a href="https://github.com/arc53/DocsGPT?tab=readme-ov-file#quickstart">DocsGPT</a>. Если вы обнаружите, что в этом руководстве есть устаревшие части, вы можете отдать предпочтение официальному руководству и создать проблему для нас.</p>
</div>
<h2 id="Requirements" class="common-anchor-header">Требования<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Убедитесь, что у вас установлен <a href="https://docs.docker.com/engine/install/">Docker</a> </p>
<h2 id="Clone-the-repository" class="common-anchor-header">Клонируйте репозиторий<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Клонируйте репозиторий и перейдите в него:</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/arc53/DocsGPT.git
$ <span class="hljs-built_in">cd</span> DocsGPT
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-dependency" class="common-anchor-header">Добавить зависимость<button data-href="#Add-dependency" class="anchor-icon" translate="no">
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
    </button></h2><p>Добавьте зависимость <code translate="no">langchain-milvus</code> в файл <code translate="no">requirements.txt</code> в папке <code translate="no">application</code>:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;\nlangchain-milvus==0.1.6&quot;</span> &gt;&gt; ./application/requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-environment-variables" class="common-anchor-header">Установите переменные окружения<button data-href="#Set-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Добавьте <code translate="no">VECTOR_STORE=milvus</code>, <code translate="no">MILVUS_URI=...</code>, <code translate="no">MILVUS_TOKEN=...</code> в переменные окружения для сервисов <code translate="no">backend</code> и <code translate="no">worker</code> в файле <code translate="no">docker-compose.yaml</code>, как показано ниже:</p>
<pre><code translate="no" class="language-yaml">  backend:
    build: ./application
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-yaml">  worker:
    build: ./application
    <span class="hljs-built_in">command</span>: celery -A application.app.celery worker -l INFO -B
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<p>Для сервисов <code translate="no">MILVUS_URI</code> и <code translate="no">MILVUS_TOKEN</code> вы можете использовать либо полностью управляемый сервис <a href="https://zilliz.com/cloud">Zilliz Cloud</a>(рекомендуется), либо запущенный вручную сервис Milvus.</p>
<ul>
<li><p>Для полностью управляемого сервиса Zillz Cloud: Мы рекомендуем использовать сервис Zilliz Cloud. Вы можете зарегистрировать бесплатную пробную учетную запись на <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. После этого вы получите адреса <code translate="no">MILVUS_URI</code> и <code translate="no">MILVUS_TOKEN</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">публичной конечной точке и ключу API</a>.</p></li>
<li><p>Для запуска сервиса Milvus вручную: Если вы хотите настроить сервис Milvus, вы можете следовать <a href="https://milvus.io/docs/install_standalone-docker-compose.md">официальной документации Milvus</a> для настройки сервера Milvus, а затем получить <code translate="no">MILVUS_URI</code> и <code translate="no">MILVUS_TOKEN</code> с сервера. Файлы <code translate="no">MILVUS_URI</code> и <code translate="no">MILVUS_TOKEN</code> должны быть в формате <code translate="no">http://&lt;your_server_ip&gt;:19530</code> и <code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code> соответственно.</p></li>
</ul>
<h2 id="Start-the-services" class="common-anchor-header">Запустите службы<button data-href="#Start-the-services" class="anchor-icon" translate="no">
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
    </button></h2><p>Выполните: <code translate="no">./setup.sh</code></p>
<p>Затем перейдите на страницу http://localhost:5173/.</p>
<p>Вы можете поиграть с пользовательским интерфейсом и задать вопросы о ваших документах.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/doscgpt_ui.png" alt="alt text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>текст alt</span> </span></p>
<p>Если вы хотите остановить сервисы, выполните:</p>
<pre><code translate="no" class="language-shell">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
<p>Для получения более подробной информации и более сложных настроек, пожалуйста, обратитесь к официальной документации <a href="https://github.com/arc53/DocsGPT">DocsGPT</a>.</p>
