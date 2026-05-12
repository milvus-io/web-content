---
id: langchain_milvus_dido.md
summary: >-
  Это руководство демонстрирует, как использовать функцию встраивания текста
  Milvus 2.6 (также известную как Data In Data Out) с LangChain. Эта функция
  позволяет серверу Milvus автоматически преобразовывать необработанный текст в
  векторные вкрапления, упрощая код на стороне клиента и централизуя управление
  ключами API.
title: Интеграция функции встраивания текста Milvus с LangChain
---
<h1 id="Integrating-Milvus-Text-Embedding-Function-with-LangChain" class="common-anchor-header">Интеграция функции встраивания текста Milvus с LangChain<button data-href="#Integrating-Milvus-Text-Embedding-Function-with-LangChain" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_dido.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_dido.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>Это руководство демонстрирует, как использовать <strong>функцию встраивания текста</strong> Milvus 2.6 (также известную как Data In Data Out) с LangChain. Эта функция позволяет серверу Milvus автоматически преобразовывать необработанный текст в векторные вкрапления, упрощая код на стороне клиента и централизуя управление ключами API.</p>
<p><a href="https://milvus.io/">Milvus</a> - это самая передовая в мире векторная база данных с открытым исходным кодом, созданная специально для поддержки поиска сходства вкраплений и приложений искусственного интеллекта. <a href="https://www.langchain.com/">LangChain</a> - это фреймворк для разработки приложений на основе больших языковых моделей (LLM). Интегрировав функцию встраивания текста Milvus, вы сможете добиться более простого и эффективного решения для векторного поиска в своих приложениях LangChain.</p>
<h2 id="Prerequisites" class="common-anchor-header">Предварительные условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед выполнением этого руководства убедитесь, что у вас установлены следующие зависимости:</p>
<pre><code translate="no" class="language-shell">! pip install --upgrade langchain-milvus langchain-core langchain-openai
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если вы используете Google Colab, для включения только что установленных зависимостей вам может потребоваться <strong>перезапустить среду выполнения</strong> (нажмите на меню "Runtime" в верхней части экрана и выберите "Restart session" из выпадающего меню).</p>
</div>
<h3 id="Configuring-the-Milvus-Server" class="common-anchor-header">Настройка сервера Milvus<button data-href="#Configuring-the-Milvus-Server" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Важно</strong>: Функция встраивания текста (Data In Data Out) доступна только в <strong>Milvus Server</strong>. <strong>Milvus Lite не поддерживает эту функцию</strong>. Вам необходимо использовать сервер Milvus, развернутый с помощью Docker/Kubernetes.</p>
<p>Перед использованием функции встраивания текста необходимо настроить учетные данные для поставщиков услуг встраивания на сервере Milvus.</p>
<p><strong>Объявите свои ключи в разделе credential:</strong></p>
<p>Вы можете перечислить один или несколько ключей API - дайте каждому из них ярлык, который вы придумаете и на который будете ссылаться позже.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>

<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_OPENAI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Укажите Milvus, какой ключ использовать для вызовов OpenAI</strong></p>
<p>В том же файле укажите провайдеру OpenAI на метку, которую вы хотите использовать.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom url</span>
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительные способы настройки см. в <a href="https://milvus.io/docs/embedding-function-overview.md">документации Milvus Embedding Function</a>.</p>
<h3 id="Starting-the-Milvus-Service" class="common-anchor-header">Запуск службы Milvus<button data-href="#Starting-the-Milvus-Service" class="anchor-icon" translate="no">
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
    </button></h3><p>Убедитесь, что сервер Milvus запущен и функция встраивания включена. Вы можете развернуть сервер Milvus с помощью <a href="https://milvus.io/docs/install_standalone-docker.md">Docker</a> или <a href="https://milvus.io/docs/install_cluster-helm.md">Kubernetes</a>. Примечание: <strong>Milvus Lite не поддерживает функцию встраивания текста</strong>.</p>
<h2 id="Understanding-Embedding-Client-side-vs-Server-side" class="common-anchor-header">Понимание функции встраивания: Клиентская сторона и серверная сторона<button data-href="#Understanding-Embedding-Client-side-vs-Server-side" class="anchor-icon" translate="no">
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
    </button></h2><p>Прежде чем перейти к использованию, давайте сначала разберемся в различиях между двумя подходами к встраиванию.</p>
<h3 id="Embedding-using-LangChains-Embeddings-class-Client-side" class="common-anchor-header">Встраивание с помощью класса LangChain <code translate="no">Embeddings</code> (на стороне клиента)<button data-href="#Embedding-using-LangChains-Embeddings-class-Client-side" class="anchor-icon" translate="no">
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
    </button></h3><p>В традиционном подходе LangChain генерация встраивания происходит на стороне клиента с помощью <a href="https://python.langchain.com/docs/api_reference/embeddings/langchain_core.embeddings.Embeddings">класса<code translate="no">Embeddings</code> </a>. Ваше приложение должно использовать метод <code translate="no">embed_query</code> этого класса для вызова API встраивания, а затем сохранить сгенерированные векторы в Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings
<span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Generate embedding on client side</span>
embeddings = OpenAIEmbeddings()
vector = embeddings.embed_query(<span class="hljs-string">&quot;Hello, world!&quot;</span>)
<span class="hljs-comment"># [0.123, -0.456, ...] A vector of floats</span>

vector_store = Milvus(
    embedding_function=embeddings,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    collection_name=<span class="hljs-string">&quot;traditional_approach_collection&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Диаграмма последовательности:</strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langchain_milvus_dito_langchain_embedding.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><strong>Характеристики:</strong></p>
<ul>
<li>Клиент напрямую вызывает API для встраивания</li>
<li>Необходимость управления ключами API на стороне клиента</li>
<li>Поток данных: Текст → Клиент → API встраивания → Вектор → Milvus</li>
</ul>
<h3 id="Milvus-Text-Embedding-Function-Server-side-Data-In-Data-Out" class="common-anchor-header">Функция встраивания текста Milvus (данные на стороне сервера, входящие данные, исходящие данные)<button data-href="#Milvus-Text-Embedding-Function-Server-side-Data-In-Data-Out" class="anchor-icon" translate="no">
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
    </button></h3><p>Функция встраивания текста Milvus 2.6 (Data In Data Out) позволяет серверу Milvus автоматически преобразовывать необработанный текст в векторные вкрапления. Клиенту нужно только предоставить текст, а Milvus автоматически справится с генерацией вкраплений.</p>
<p><strong>Диаграмма последовательности:</strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langchain_milvus_dito_milvus_embedding.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><strong>Характеристики:</strong></p>
<ul>
<li>Сервер Milvus вызывает API для встраивания</li>
<li>Ключи API централизованно управляются на стороне сервера</li>
<li>Поток данных: Текст → Milvus → Embedding API → Вектор (хранится в Milvus)</li>
</ul>
<h3 id="Comparison-of-the-Two-Methods" class="common-anchor-header">Сравнение двух методов<button data-href="#Comparison-of-the-Two-Methods" class="anchor-icon" translate="no">
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
<tr><th>Характеристика</th><th>LangChain Embedding (на стороне клиента)</th><th>Функция встраивания текста Milvus (на стороне сервера)</th></tr>
</thead>
<tbody>
<tr><td><strong>Место обработки</strong></td><td>Клиентское приложение</td><td>Сервер Milvus</td></tr>
<tr><td><strong>Вызовы API</strong></td><td>Клиент напрямую вызывает API для встраивания</td><td>Сервер Milvus вызывает API для встраивания</td></tr>
<tr><td><strong>Управление ключами API</strong></td><td>Необходимость управления на стороне клиента</td><td>Централизованное управление на стороне сервера, более безопасно</td></tr>
<tr><td><strong>Сложность кода</strong></td><td>Необходимость управления API-ключами и вызовами на стороне клиента</td><td>Настраивать нужно только один раз в конфигурации Milvus</td></tr>
<tr><td><strong>Примеры использования</strong></td><td>- Необходим контроль над процессом встраивания на стороне клиента<br>- Необходимость кэширования результатов встраивания на стороне клиента<br>- Необходимость поддержки переключения нескольких моделей встраивания</td><td>- Упростить код на стороне клиента<br>- Централизованное управление ключами API на стороне сервера<br>- Необходимость пакетной обработки больших объемов документов<br>- Сократить количество взаимодействий с внешними API на стороне клиента<br>- Необходимость совмещения со встроенными функциями Milvus, такими как BM25</td></tr>
<tr><td><strong>Требования к версии Milvus</strong></td><td>Все версии (включая Milvus Lite)</td><td>Milvus Lite не поддерживается</td></tr>
</tbody>
</table>
<p><strong>В этом руководстве рассказывается о методе Milvus Text Embedding Function (Data In Data Out) на стороне сервера</strong>, который является новой функцией, представленной в Milvus 2.6 и позволяющей значительно упростить код на стороне клиента и повысить безопасность.</p>
<h2 id="Using-Text-Embedding-Function" class="common-anchor-header">Использование функции встраивания текста<button data-href="#Using-Text-Embedding-Function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Example-1-Server-side-Embedding-Only" class="common-anchor-header">Пример 1: Встраивание только на стороне сервера<button data-href="#Example-1-Server-side-Embedding-Only" class="anchor-icon" translate="no">
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
    </button></h3><p>Это самый простой вариант использования, в котором генерация вкраплений полностью возлагается на сервер Milvus. Клиенту не нужна никакая функция встраивания.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_milvus.function <span class="hljs-keyword">import</span> TextEmbeddingBuiltInFunction
<span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

<span class="hljs-comment"># Create Text Embedding Function</span>
text_embedding_func = TextEmbeddingBuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,  <span class="hljs-comment"># Input field name (field containing text)</span>
    output_field_names=<span class="hljs-string">&quot;vector&quot;</span>,  <span class="hljs-comment"># Output field name (field storing vectors)</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># Vector dimension (must specify)</span>
    params={
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,  <span class="hljs-comment"># Service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,  <span class="hljs-comment"># Model name</span>
        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;apikey_dev&quot;</span>,    <span class="hljs-comment"># Optional: use credential label configured in milvus.yaml</span>
    },
)

<span class="hljs-comment"># Create Milvus vector store</span>
<span class="hljs-comment"># Note: embedding_function=None, because embedding is done on server side</span>
vector_store = Milvus(
    embedding_function=<span class="hljs-literal">None</span>,  <span class="hljs-comment"># Do not use client-side embedding</span>
    builtin_function=text_embedding_func,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,    # Strong consistency level, default is &quot;Session&quot;</span>
    auto_id=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># drop_old=True,  # If you want to drop old collection and create a new one</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Для <code translate="no">connection_args</code>:</p>
<ul>
<li><strong>Должен использоваться сервер Milvus</strong>: Функция встраивания текста доступна только в Milvus Server, Milvus Lite не поддерживается.</li>
<li>Используйте uri сервера, например <code translate="no">http://localhost:19530</code> (локальное развертывание Docker) или <code translate="no">http://your-server:19530</code> (удаленный сервер).</li>
<li>Если используется <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, используйте Public Endpoint как <code translate="no">uri</code> и установите параметр <code translate="no">token</code>.</li>
</ul>
<p>При добавлении документов вам нужно предоставить только текст, не нужно предварительно вычислять векторы. Milvus автоматически вызовет API OpenAI для генерации вкраплений.</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add documents (only need to provide text, no need to pre-compute vectors)</span>
documents = [
    Document(page_content=<span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>),
    Document(
        page_content=<span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>
    ),
    Document(
        page_content=<span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>
    ),
]

vector_store.add_documents(documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[462726375729313252, 462726375729313253, 462726375729313254]
</code></pre>
<p>При поиске используйте непосредственно текстовые запросы, и Milvus автоматически преобразует текст запроса в векторы для поиска.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search (directly use text query)</span>
results = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>, k=<span class="hljs-number">2</span>
)

<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Content: <span class="hljs-subst">{doc.page_content}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Metadata: <span class="hljs-subst">{doc.metadata}</span>\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">WARNING: All log messages before absl::InitializeLog() is called are written to STDERR
I0000 00:00:1765186679.227345 12227536 fork_posix.cc:71] Other threads are currently calling into gRPC, skipping fork() handlers


Content: Milvus simplifies semantic search through embeddings.
Metadata: {'pk': 462726375729313252}

Content: Semantic search helps users find relevant information quickly.
Metadata: {'pk': 462726375729313254}
</code></pre>
<h3 id="Example-2-Combining-Text-Embedding-and-BM25-Hybrid-Search" class="common-anchor-header">Пример 2: сочетание встраивания текста и BM25 (гибридный поиск)<button data-href="#Example-2-Combining-Text-Embedding-and-BM25-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Сочетание семантического поиска (Text Embedding) и поиска по ключевым словам (BM25) обеспечивает более мощные возможности гибридного поиска. Семантический поиск отлично справляется с пониманием смысла запроса, а поиск по ключевым словам - с точным подбором.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_milvus.function <span class="hljs-keyword">import</span> TextEmbeddingBuiltInFunction, BM25BuiltInFunction

<span class="hljs-comment"># Text Embedding Function (semantic search)</span>
text_embedding_func = TextEmbeddingBuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
    output_field_names=<span class="hljs-string">&quot;vector_dense&quot;</span>,
    dim=<span class="hljs-number">1536</span>,
    params={
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,
    },
)

<span class="hljs-comment"># BM25 Function (keyword search)</span>
bm25_func = BM25BuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
    output_field_names=<span class="hljs-string">&quot;vector_sparse&quot;</span>,
)

<span class="hljs-comment"># Create Milvus vector store</span>
vector_store = Milvus(
    embedding_function=<span class="hljs-literal">None</span>,
    builtin_function=[text_embedding_func, bm25_func],
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    vector_field=[<span class="hljs-string">&quot;vector_dense&quot;</span>, <span class="hljs-string">&quot;vector_sparse&quot;</span>],
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,    # Strong consistency level, default is &quot;Session&quot;</span>
    auto_id=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># drop_old=True,  # If you want to drop old collection and create a new one</span>
)

<span class="hljs-comment"># Add documents</span>
documents = [
    Document(page_content=<span class="hljs-string">&quot;Machine learning and artificial intelligence&quot;</span>),
    Document(page_content=<span class="hljs-string">&quot;The cat sat on the mat&quot;</span>),
]

vector_store.add_documents(documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[462726375729313255, 462726375729313256]
</code></pre>
<p>Используйте <code translate="no">WeightedRanker</code> для управления весами семантического поиска и поиска по ключевым словам. Если вес плотного поиска выше, результаты больше ориентированы на семантическое сходство; если вес разреженного поиска выше, результаты больше ориентированы на совпадение ключевых слов.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Hybrid search, use WeightedRanker to control weights</span>
<span class="hljs-comment"># 70% semantic search, 30% keyword search</span>
results = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;AI technology&quot;</span>,
    k=<span class="hljs-number">2</span>,
    ranker_type=<span class="hljs-string">&quot;weighted&quot;</span>,
    ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.3</span>]},
)

<span class="hljs-comment"># If you want to be more biased towards keyword matching, you can adjust weights</span>
<span class="hljs-comment"># 30% semantic search, 70% keyword search</span>
results_keyword_focused = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;cat mat&quot;</span>,
    k=<span class="hljs-number">2</span>,
    ranker_type=<span class="hljs-string">&quot;weighted&quot;</span>,
    ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]},
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">results
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 462726375729313255}, page_content='Machine learning and artificial intelligence'),
 Document(metadata={'pk': 462726375729313256}, page_content='The cat sat on the mat')]
</code></pre>
<pre><code translate="no" class="language-python">results_keyword_focused
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 462726375729313256}, page_content='The cat sat on the mat'),
 Document(metadata={'pk': 462726375729313255}, page_content='Machine learning and artificial intelligence')]
</code></pre>
<h2 id="Summary" class="common-anchor-header">Резюме<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Поздравляем! Вы узнали, как использовать функцию встраивания текста Milvus (Data In Data Out) с LangChain. Перенеся генерацию встраивания на серверную сторону, вы можете упростить код на стороне клиента, централизованно управлять ключами API и легко реализовать гибридный поиск. В сочетании с функцией встраивания текста и BM25 Milvus предоставляет вам мощные возможности векторного поиска.</p>
