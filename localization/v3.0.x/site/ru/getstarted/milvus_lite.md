---
id: milvus_lite.md
summary: >-
  Установите Milvus Lite и запустите локальный векторный поиск с фиксированным
  путем к базе данных.
title: Запуск Milvus Lite в локальной среде
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">Запуск Milvus Lite в локальной среде<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице описано, как выполнить локальный векторный поиск с помощью Milvus Lite. Здесь рассматриваются вопросы установки, сохранения данных, фильтрации и экспорта данных в другую среду развертывания Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite — это облегченный локальный бэкенд для <a href="https://github.com/milvus-io/pymilvus">Python SDK Milvus</a>. Установите его с помощью дополнительного модуля <code translate="no">milvus-lite</code>; установка только <code translate="no">pymilvus</code> не приводит к установке этого бэкенда в версии SDK, используемой ниже.</p>
<p>Milvus Lite подходит для локальной разработки и небольших рабочих нагрузок в таких средах, как:</p>
<ul>
<li>Jupyter Notebook или Google Colab</li>
<li>Ноутбуки</li>
<li>Пограничные устройства с совместимыми зависимостями Python</li>
</ul>
<p>Milvus Lite использует API <code translate="no">MilvusClient</code> для поддерживаемых операций, включая сохранение векторных данных, вставку и удаление, поиск по векторам и фильтрацию по метаданным. Чтобы перенести поддерживаемый рабочий процесс приложения в удаленное развертывание, измените URI подключения и учетные данные, а также ознакомьтесь с различиями в поддерживаемых функциях. Для крупномасштабных производственных рабочих нагрузок используйте <a href="/docs/ru/install-overview.md">Milvus Standalone или Distributed</a> либо полностью управляемый Milvus в <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
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
    </button></h2><p>В данном руководстве используются PyMilvus <strong>3.0.2</strong> и Milvus Lite <strong>3.2.2</strong>. Подготовьте следующую среду:</p>
<ul>
<li>Python 3.10 или более поздней версии. Для локального бэкэнда Lite требуется более новая версия Python, чем для удалённого клиента PyMilvus.</li>
<li>macOS, Linux или Windows с совместимыми пакетами wheel для зависимостей, таких как <code translate="no">faiss-cpu</code> и <code translate="no">pyarrow</code>. Milvus Lite 3.2.2 представляет собой пакет, написанный исключительно на Python, поэтому операционная система и архитектура должны удовлетворять требованиям этих зависимостей, а не самого пакета Lite.</li>
<li>Локальный каталог с правами на запись для хранения базы данных.</li>
</ul>
<p>В Windows pip пропускает дополнительный пакет <code translate="no">milvus-lite</code> из PyMilvus 3.0.2 из-за его платформенного маркера, поэтому необходимо явно указать <code translate="no">milvus-lite</code>. Приведенная ниже команда установки уже делает это. Для других комбинаций пакетов и платформ ознакомьтесь с <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#requirements">требованиями к версиям Milvus Lite</a>.</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">Настройка Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Создайте изолированную среду Python и установите оба пакета:</p>
<pre><code translate="no" class="language-bash">python3 -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate
python -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Введите выражение extras в кавычках, чтобы оболочки, такие как zsh, не интерпретировали скобки. В Windows PowerShell активируйте среду с помощью <code translate="no">.venv\Scripts\Activate.ps1</code> вместо <code translate="no">source .venv/bin/activate</code>. Явное указание версий позволяет согласовать SDK и локальный бэкенд с данным руководством.</p>
<div class="alert note">
<blockquote>
<p>Milvus Lite 3.x использует другой механизм хранения данных, отличный от оригинального пакета версии 2.x. Он не может открыть существующий файл <code translate="no">.db</code> версии 2.x на месте. Сохраните исходную базу данных и среду, в которой она может быть открыта, экспортируйте данные в эту среду, а затем импортируйте их в новую базу данных. Установка нового пакета не предусматривает миграцию старого формата хранения. См. раздел <a href="#Migrating-data-from-Milvus-Lite">«Миграция данных из Milvus Lite</a>».</p>
</blockquote>
</div>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">Подключение к Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Передайте локальный путь, заканчивающийся на <code translate="no">.db</code>, в <code translate="no">MilvusClient</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>В Milvus Lite 3.2.2 это создает <strong>каталог milvus_demo.db</strong> в рабочем каталоге. Каталог содержит файлы хранения базы данных; суффикс <code translate="no">.db</code> не означает, что это один переносимый файл. Используйте тот же путь, чтобы вновь открыть базу данных после закрытия клиента или перезапуска приложения.</p>
<p>Для новой базы данных используйте другой путь. Чтобы подключиться к удалённому серверу Milvus, передайте его конечную точку и учетные данные:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;username:password&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-a-local-search-example" class="common-anchor-header">Запустите пример локального поиска<button data-href="#Run-a-local-search-example" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующем примере демонстрируется рабочий процесс API с сгенерированными векторами. Эти векторы не кодируют смысл текста; при построении семантического поиска используйте модель вложения. Запустите пример с указанием нового пути к базе данных или удалите существующий файл <code translate="no">demo_collection</code> перед повторным запуском.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors in this example have 384 dimensions.</span>
)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># Generate reproducible example vectors, not semantic embeddings.</span>
rng = np.random.default_rng(<span class="hljs-number">7</span>)
vectors = rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, size=(<span class="hljs-built_in">len</span>(docs), <span class="hljs-number">384</span>)).tolist()
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]
res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Search only records whose subject is &quot;history&quot;.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Retrieve all records that match the scalar filter, without vector ranking.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete one record and keep the others for the export example below.</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(res)
client.close()
<button class="copy-code-btn"></button></code></pre>
<p>Для приложения, генерирующего вложения из текста, перейдите к <a href="/docs/ru/quickstart.md">разделу «Быстрый старт</a>». Вы также можете ознакомиться с <a href="https://github.com/milvus-io/bootcamp">примерами Milvus Bootcamp</a> по RAG, поиску изображений и интеграции с фреймворками.</p>
<h2 id="Supported-features-and-limits" class="common-anchor-header">Поддерживаемые функции и ограничения<button data-href="#Supported-features-and-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 3.2.2 реализует поднабор операций Milvus через локальный адаптер PyMilvus. В <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">справочнике по функциям с указанием версий</a> описаны следующие возможности:</p>
<table>
<thead>
<tr><th>Область</th><th>Поддержка в данной версии Lite</th></tr>
</thead>
<tbody>
<tr><td>Плотные и разреженные векторы</td><td><code translate="no">FLOAT_VECTOR</code> и <code translate="no">SPARSE_FLOAT_VECTOR</code></td></tr>
<tr><td>Векторные индексы</td><td><code translate="no">FLAT</code>, <code translate="no">BRUTE_FORCE</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, и <code translate="no">AUTOINDEX</code></td></tr>
<tr><td>скалярные и разреженные индексы</td><td><code translate="no">INVERTED</code> скалярные индексы и <code translate="no">SPARSE_INVERTED_INDEX</code></td></tr>
<tr><td>Операции с данными</td><td>Вставка, upsert, получение, запрос, векторный поиск и удаление</td></tr>
<tr><td>Поиск</td><td>Плотный и разреженный поиск, фильтры метаданных, несколько векторных полей и гибридный поиск</td></tr>
<tr><td>Организация коллекций</td><td>Коллекции, именованные базы данных, псевдонимы и разбиения в рамках операций, поддерживаемых локальным адаптером</td></tr>
</tbody>
</table>
<p>Данная версия не ограничивается индексами « <code translate="no">FLAT</code> ». Доступность и поведение индексов зависят от версии Lite; не следует применять ограничения из исходного бэкэнда версии 2.x к движку версии 3.x.</p>
<p>Перед выбором версии Lite для приложения ознакомьтесь с этими ограничениями:</p>
<ul>
<li>В любой момент времени только один процесс может владеть каталогом хранения базы данных. Движок защищает каталог с помощью блокировки файла.</li>
<li>Сериализуйте записи в одну и ту же коллекцию. Параллельные записи не поддерживаются безопасным образом.</li>
<li>Локальный адаптер реализует не все RPC-интерфейсы Milvus. Неподдерживаемые операции возвращают ошибку « <code translate="no">UNIMPLEMENTED</code> »; изменение схемы, а также загрузка или освобождение на уровне партиций недоступны.</li>
<li>Аутентификация, пользователи, роли, RBAC и TLS не поддерживаются. Не подключайте локальный сервер к ненадежной сети.</li>
<li>Не поддерживаются векторные поля типа binary, float16, bfloat16 и int8, а также индексы с квантованием произведения (Product Quantization).</li>
<li>Версия Lite предназначена для локальных рабочих нагрузок. Совместимость с локальным API не обеспечивает распределенное масштабирование, а также изоляцию и доступность в производственной среде, характерные для удаленного развертывания.</li>
</ul>
<p>Ознакомьтесь с <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#known-limitations">известными ограничениями конкретной версии</a>, прежде чем полагаться на функцию сервера, которая не используется в локальном примере.</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">Миграция данных из Milvus Lite<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте <code translate="no">milvus-lite dump</code> для экспорта коллекции в виде JSON-файлов Milvus BulkWriter. Эти файлы можно импортировать в самостоятельно развернутую среду Milvus или в Zilliz Cloud.</p>
<p>Установите зависимости SDK для массового записывателя в среде, в которой открыта исходная база данных:</p>
<pre><code translate="no" class="language-bash">python -m pip install <span class="hljs-string">&quot;pymilvus[bulk_writer]==3.0.2&quot;</span>
milvus-lite dump -h
<button class="copy-code-btn"></button></code></pre>
<p>Закройте приложение Python, управляющее локальной базой данных, прежде чем запускать команду в другом процессе. Экспортируйте коллекцию из предыдущего примера:</p>
<pre><code translate="no" class="language-bash">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<button class="copy-code-btn"></button></code></pre>
<p>Команда считывает файл <code translate="no">demo_collection</code> из <strong>каталога хранения milvus_demo.db</strong> и записывает файлы экспорта в <strong>каталог data_dir</strong>. Импортируйте эти файлы с помощью <a href="/docs/ru/import-data.md">Bulk Insert</a> или <a href="https://docs.zilliz.com/docs/data-import">Zilliz Cloud Data Import</a>.</p>
<div class="alert note">
<blockquote>
<p>Чтобы экспортировать исходный файл базы данных версии 2.x, запустите утилиту dump в среде с исходной версией Lite, способной открыть этот файл. Утилита dump версии 3.x не преобразует старый формат хранения при прямом открытии файла. Сохраните исходную базу данных до тех пор, пока не проверите количество импортированных строк и результаты поиска.</p>
</blockquote>
</div>
<p>Поддерживаемые параметры dump и ограничения формата хранения см. в <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">справочнике по экспорту Milvus Lite</a>.</p>
<h2 id="Whats-next" class="common-anchor-header">Что делать дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Продолжите выполнение следующих задач:</p>
<ul>
<li><a href="/docs/ru/quickstart.md">Быстрый старт</a>: сгенерируйте вложения и запустите рабочий процесс поиска.</li>
<li><a href="/docs/ru/single-vector-search.md">Поиск по одному вектору</a> и <a href="/docs/ru/multi-vector-search.md">гибридный поиск</a>: разработка запросов для вашего приложения.</li>
<li><a href="/docs/ru/install-overview.md">Выберите способ развертывания</a>: выйдите за рамки локальной разработки.</li>
<li><a href="https://github.com/zilliztech/attu">Attu</a>: ознакомьтесь с графическим интерфейсом Milvus для удаленного развертывания.</li>
</ul>
