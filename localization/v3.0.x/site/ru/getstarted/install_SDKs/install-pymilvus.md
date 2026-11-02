---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
summary: 'Узнайте, как установить SDK Milvus для Python.'
title: Установка Python SDK для Milvus
---
<h1 id="Install-Milvus-Python-SDK" class="common-anchor-header">Установка Python SDK для Milvus<button data-href="#Install-Milvus-Python-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице описано, как установить PyMilvus — SDK для Milvus на языке Python — и выбрать дополнительные зависимости для локальных баз данных или встраивания моделей.</p>
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
    </button></h2><ul>
<li>Для подключения к удаленному серверу Milvus PyMilvus 3.0.2 требует Python 3.9 или более поздней версии.</li>
<li>Для локальных примеров Milvus Lite 3.2.2 требуется Python 3.10 или более поздней версии и поддерживаемая платформа. См. раздел <a href="/docs/ru/milvus_lite.md">«Запуск Milvus Lite локально</a>».</li>
<li>Установите зависимости через <code translate="no">pip</code>. Для работы PyMilvus 3.0.2 требуется <code translate="no">protobuf&gt;=5.27.2</code>; не фиксируйте отдельно версию <code translate="no">protobuf==3.20.0</code>. Для использования SDK не требуется <code translate="no">grpcio-tools</code>.</li>
</ul>
<h2 id="Install-PyMilvus-via-pip" class="common-anchor-header">Установите PyMilvus с помощью pip<button data-href="#Install-PyMilvus-via-pip" class="anchor-icon" translate="no">
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
    </button></h2><p>PyMilvus доступен в <a href="https://pypi.org/project/pymilvus/">Python Package Index</a>.</p>
<div class="alert note">
Рекомендуется установить версию PyMilvus, соответствующую версии установленного сервера Milvus. Дополнительную информацию см. в <a href="/docs/ru/release_notes.md">примечаниях к выпуску</a>.
</div>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>При этом устанавливается клиент для удалённого сервера Milvus. Milvus Lite и модель для встраивания не устанавливаются.</p>
<p>Для локальной базы данных, используемой в <a href="/docs/ru/quickstart.md">«Быстром старте»</a>, установите дополнение <code translate="no">milvus-lite</code> и соответствующий пакет Lite:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Для вспомогательных средств встраивания установите отдельный дополнительный модуль « <code translate="no">model</code> »:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[model]==3.0.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>В Windows pip пропускает дополнение « <code translate="no">milvus-lite</code> » для PyMilvus 3.0.2 из-за его платформенного маркера. В приведенной выше команде явно указан файл « <code translate="no">milvus-lite</code> », поэтому установка в Windows пройдет успешно, если для вашей версии Python существуют библиотеки « <code translate="no">faiss-cpu</code> » и « <code translate="no">pyarrow</code> » в формате wheel.</p>
<h2 id="Verify-installation" class="common-anchor-header">Проверка установки<button data-href="#Verify-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Если PyMilvus установлен правильно, при выполнении следующей команды исключение не возникнет.</p>
<pre><code translate="no" class="language-bash">python3 -c <span class="hljs-string">&quot;from pymilvus import MilvusClient&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Эта команда проверяет импорт SDK, а не подключение к серверу. Следуйте <a href="/docs/ru/quickstart.md">инструкциям в разделе «Быстрый старт»</a>, чтобы создать локальную коллекцию, внести данные и запустить поиск.</p>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>После установки PyMilvus вы сможете:</p>
<ul>
<li><p>Ознакомиться с основными операциями Milvus:</p>
<ul>
<li><a href="/docs/ru/manage-collections.md">Управлять коллекциями</a></li>
<li><a href="/docs/ru/manage-partitions.md">Управлять разделами</a></li>
<li><a href="/docs/ru/insert-update-delete.md">Вставлять, обновлять и удалять</a></li>
<li><a href="/docs/ru/single-vector-search.md">Поиск по одному вектору</a></li>
<li><a href="/docs/ru/multi-vector-search.md">Гибридный поиск</a></li>
</ul></li>
<li><p>Ознакомьтесь со <a href="/api-reference/pymilvus/v3.0.x/About.md">справочником по API PyMilvus</a></p></li>
</ul>
