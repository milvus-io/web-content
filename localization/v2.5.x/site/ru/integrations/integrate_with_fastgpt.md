---
id: integrate_with_fastgpt.md
summary: >-
  В этом руководстве вы узнаете, как быстро развернуть собственное эксклюзивное
  приложение FastGPT с помощью [Milvus](https://milvus.io/).
title: Развертывание FastGPT с помощью Milvus
---
<h1 id="Deploying-FastGPT-with-Milvus" class="common-anchor-header">Развертывание FastGPT с помощью Milvus<button data-href="#Deploying-FastGPT-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://fastgpt.in/">FastGPT</a> - это система вопросов и ответов, основанная на знаниях и построенная на большой языковой модели LLM, предлагающая готовые к использованию возможности для обработки данных и вызова моделей. Кроме того, она позволяет организовать рабочий процесс с помощью визуализации Flow, что облегчает работу со сложными сценариями вопросов и ответов. В этом руководстве вы узнаете, как быстро развернуть собственное эксклюзивное приложение FastGPT с помощью <a href="https://milvus.io/">Milvus</a>.</p>
<h2 id="Download-docker-composeyml" class="common-anchor-header">Загрузите docker-compose.yml<button data-href="#Download-docker-composeyml" class="anchor-icon" translate="no">
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
    </button></h2><p>Убедитесь, что вы уже установили <a href="https://docs.docker.com/compose/">Docker Compose</a>.<br>
Выполните приведенную ниже команду, чтобы загрузить файл docker-compose.yml.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">mkdir</span> fastgpt
$ <span class="hljs-built_in">cd</span> fastgpt
$ curl -O https://raw.githubusercontent.com/labring/FastGPT/main/projects/app/data/config.json

<span class="hljs-comment"># milvus version</span>
$ curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-milvus.yml
<span class="hljs-comment"># zilliz version</span>
<span class="hljs-comment"># curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-zilliz.yml</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Если вы используете версию Zilliz, настройте параметры <code translate="no">MILVUS_ADDRESS</code> и <code translate="no">MILVUS_TOKEN</code> link в файле docker-compose.yml, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint и Api key</a> в <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
</blockquote>
<h2 id="Launch-the-Container" class="common-anchor-header">Запуск контейнера<button data-href="#Launch-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>Выполните запуск в той же директории, что и docker-compose.yml. Убедитесь, что версия docker-compose в идеале выше 2.17, так как в противном случае некоторые команды автоматизации могут не работать.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Launch the container</span>
$ docker compose up -d
<span class="hljs-comment"># Wait for 10s, OneAPI typically needs to restart a few times to initially connect to Mysql</span>
$ sleep <span class="hljs-number">10</span>
<span class="hljs-comment"># Restart oneapi (Due to certain issues with the default Key of OneAPI, it will display &#x27;channel not found&#x27; if not restarted, this can be temporarily resolved by manually restarting once, while waiting for the author&#x27;s fix)</span>
$ docker restart oneapi
<button class="copy-code-btn"></button></code></pre>
<h2 id="Access-OneAPI-to-Add-Models" class="common-anchor-header">Доступ к OneAPI для добавления моделей<button data-href="#Access-OneAPI-to-Add-Models" class="anchor-icon" translate="no">
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
    </button></h2><p>Доступ к OneAPI можно получить по адресу <code translate="no">ip:3001</code>. По умолчанию имя пользователя - root, а пароль - 123456. Вы можете изменить пароль после входа в систему.<br>
Используя модель OpenAI в качестве примера, перейдите на вкладку &quot;Канал&quot;, выберите модель чата и модель встраивания в разделе &quot;Модели&quot;.<br>
Введите свой <a href="https://platform.openai.com/docs/quickstart">API-ключ OpenAI</a> в разделе "Секреты".<br>
Для использования моделей за пределами OpenAI и получения дополнительной информации, пожалуйста, обратитесь к <a href="https://doc.fastgpt.in/docs/development/one-api/">One API</a>.</p>
<h2 id="Setting-Tokens" class="common-anchor-header">Настройка токенов<button data-href="#Setting-Tokens" class="anchor-icon" translate="no">
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
    </button></h2><p>Перейдите на вкладку "Токены". По умолчанию здесь установлен токен <code translate="no">Initial Root Token</code>. Вы также можете создать новый токен и установить квоту самостоятельно.<br>
Нажмите "Копировать" на своем токене, убедившись, что значение этого токена совпадает со значением <code translate="no">CHAT_API_KEY</code>, заданным в файле docker-compose.yml.</p>
<h2 id="Accessing-FastGPT" class="common-anchor-header">Доступ к FastGPT<button data-href="#Accessing-FastGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>В настоящее время доступ к FastGPT можно получить напрямую по адресу <code translate="no">ip:3000</code> (пожалуйста, не забывайте о брандмауэре). Имя пользователя - root, а пароль - <code translate="no">DEFAULT_ROOT_PSW</code> в переменной окружения docker-compose.yml. Если вам потребуется доступ к доменному имени, вам нужно будет самостоятельно установить и настроить <a href="https://nginx.org/en/">Nginx</a>.</p>
<h2 id="Stop-the-Container" class="common-anchor-header">Остановка контейнера<button data-href="#Stop-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>Выполните следующую команду, чтобы остановить контейнер.</p>
<pre><code translate="no" class="language-shell">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
