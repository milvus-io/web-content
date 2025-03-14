---
id: integration_with_mindsdb.md
summary: >-
  Это руководство демонстрирует, как интегрировать Milvus с MindsDB, позволяя
  вам использовать возможности MindsDB в области искусственного интеллекта с
  функциями векторной базы данных Milvus через SQL-подобные операции для
  управления и запроса векторных вкраплений.
title: Интеграция Milvus с MindsDB
---
<h1 id="Integrate-Milvus-with-MindsDB" class="common-anchor-header">Интеграция Milvus с MindsDB<button data-href="#Integrate-Milvus-with-MindsDB" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB</a> - это мощный инструмент для интеграции приложений искусственного интеллекта с различными корпоративными источниками данных. Он действует как механизм федеративных запросов, который вносит порядок в разрозненные данные, скрупулезно отвечая на запросы как структурированных, так и неструктурированных данных. Независимо от того, разбросаны ли ваши данные по SaaS-приложениям, базам или хранилищам данных, MindsDB может подключить и запросить их все, используя стандартный SQL. В MindsDB реализованы самые современные автономные системы RAG через базы знаний, поддержка сотен источников данных и гибкие возможности развертывания - от локальной разработки до облачных сред.</p>
<p>Это руководство демонстрирует, как интегрировать Milvus с MindsDB, позволяя вам использовать возможности MindsDB в области искусственного интеллекта с функциональностью векторной базы данных Milvus через SQL-подобные операции для управления и запроса векторных вкраплений.</p>
<div class="alert note">
<p>Это руководство в основном ссылается на официальную документацию по <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">MindsDB Milvus Handler</a>. Если вы найдете в этом руководстве какие-либо устаревшие части, вы можете в приоритетном порядке следовать официальной документации и создать для нас проблему.</p>
</div>
<h2 id="Install-MindsDB" class="common-anchor-header">Установите MindsDB<button data-href="#Install-MindsDB" class="anchor-icon" translate="no">
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
    </button></h2><p>Прежде чем мы начнем, установите MindsDB локально через <a href="https://docs.mindsdb.com/setup/self-hosted/docker">Docker</a> или <a href="https://docs.mindsdb.com/setup/self-hosted/docker-desktop">Docker Desktop</a>.</p>
<p>Прежде чем продолжить, убедитесь, что вы хорошо понимаете фундаментальные концепции и операции MindsDB и Milvus.</p>
<h2 id="Arguments-Introduction" class="common-anchor-header">Введение аргументов<button data-href="#Arguments-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Для установления соединения необходимы следующие аргументы:</p>
<ul>
<li><code translate="no">uri</code>: uri для базы данных Milvus, может быть установлен в локальном файле ".db" или в докере или облачном сервисе.</li>
<li><code translate="no">token</code>: токен для поддержки докера или облачного сервиса в соответствии с параметром uri</li>
</ul>
<p>Дополнительные аргументы для установки соединения:</p>
<p>Они используются для запросов <code translate="no">SELECT</code>:</p>
<ul>
<li><code translate="no">search_default_limit</code>: ограничение по умолчанию, передаваемое в операторах select (по умолчанию=100)</li>
<li><code translate="no">search_metric_type</code>: тип метрики, используемый для поиска (по умолчанию=&quot;L2&quot;)</li>
<li><code translate="no">search_ignore_growing</code>: игнорировать ли растущие сегменты при поиске сходства (по умолчанию=False)</li>
<li><code translate="no">search_params</code>: специфично для <code translate="no">search_metric_type</code> (по умолчанию={&quot;nprobe&quot;: 10})</li>
</ul>
<p>Используются для запросов <code translate="no">CREATE</code>:</p>
<ul>
<li><code translate="no">create_auto_id</code>: нужно ли автоматически генерировать id при вставке записей без ID (по умолчанию=False)</li>
<li><code translate="no">create_id_max_len</code>: максимальная длина поля id при создании таблицы (по умолчанию=64)</li>
<li><code translate="no">create_embedding_dim</code>: размерность встраивания при создании таблицы (по умолчанию=8)</li>
<li><code translate="no">create_dynamic_field</code>: будут ли создаваемые таблицы иметь динамические поля или нет (по умолчанию=True)</li>
<li><code translate="no">create_content_max_len</code>: максимальная длина столбца содержимого (по умолчанию=200)</li>
<li><code translate="no">create_content_default_value</code>: значение по умолчанию для столбца содержимого (по умолчанию='')</li>
<li><code translate="no">create_schema_description</code>: описание созданных схем (default='')</li>
<li><code translate="no">create_alias</code>: псевдоним созданных схем (default='default')</li>
<li><code translate="no">create_index_params</code>: параметры индекса, создаваемого по столбцу embeddings (default={})</li>
<li><code translate="no">create_index_metric_type</code>: метрика, используемая для создания индекса (default='L2')</li>
<li><code translate="no">create_index_type</code>: тип индекса (по умолчанию='AUTOINDEX')</li>
</ul>
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
    </button></h2><p>Прежде чем продолжить, убедитесь, что версия <code translate="no">pymilvus</code> совпадает с этой <a href="https://github.com/mindsdb/mindsdb/blob/main/mindsdb/integrations/handlers/milvus_handler/requirements.txt">версией</a>. Если вы обнаружите проблемы с совместимостью версий, вы можете откатить свою версию pymilvus или настроить ее в этом <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">файле требований</a>.</p>
<h3 id="Creating-connection" class="common-anchor-header">Создание соединения</h3><p>Для того чтобы воспользоваться этим обработчиком и подключиться к серверу Milvus в MindsDB, можно использовать следующий синтаксис:</p>
<pre><code translate="no" class="language-sql">CREATE DATABASE milvus_datasource
<span class="hljs-type">WITH</span>
  <span class="hljs-variable">ENGINE</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;milvus&#x27;</span>,
  PARAMETERS = {
    <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;./milvus_local.db&quot;</span>,
    <span class="hljs-string">&quot;token&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-string">&quot;create_embedding_dim&quot;</span>: <span class="hljs-number">3</span>,
    <span class="hljs-string">&quot;create_auto_id&quot;</span>: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<ul>
<li>Если вам нужна локальная векторная база данных только для небольшого масштаба данных или прототипирования, установка uri в качестве локального файла, например<code translate="no">./milvus.db</code>, является наиболее удобным методом, так как он автоматически использует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</li>
<li>Для работы с большими объемами данных и трафика в производстве вы можете настроить сервер Milvus на <a href="https://milvus.io/docs/install-overview.md">Docker или Kubernetes</a>. При такой настройке используйте адрес и порт сервера в качестве <code translate="no">uri</code>, например<code translate="no">http://localhost:19530</code>. Если вы включите функцию аутентификации на Milvus, установите <code translate="no">token</code> как <code translate="no">&quot;&lt;your_username&gt;:&lt;your_password&gt;&quot;</code>, в противном случае устанавливать токен не нужно.</li>
<li>Вы также можете использовать полностью управляемый Milvus в <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Просто установите <code translate="no">uri</code> и <code translate="no">token</code> в качестве <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">публичной конечной точки и ключа API</a> вашего экземпляра Zilliz Cloud.</li>
</ul>
</blockquote>
<h3 id="Dropping-connection" class="common-anchor-header">Сброс соединения</h3><p>Чтобы сбросить соединение, используйте эту команду.</p>
<pre><code translate="no" class="language-sql">DROP DATABASE milvus_datasource;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-tables" class="common-anchor-header">Создание таблиц</h3><p>Чтобы вставить данные из уже существующей таблицы, используйте команду <code translate="no">CREATE</code></p>
<pre><code translate="no" class="language-sql">CREATE TABLE milvus_datasource.test
(SELECT * FROM sqlitedb.test);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Dropping-collections" class="common-anchor-header">Сбрасывание коллекций</h3><p>Сброс коллекции не поддерживается</p>
<h3 id="Querying-and-selecting" class="common-anchor-header">Запрос и выборка</h3><p>Чтобы запросить базу данных с помощью вектора поиска, можно использовать <code translate="no">search_vector</code> в предложении <code translate="no">WHERE</code>.</p>
<p>Оговорки:</p>
<ul>
<li>Если вы опустите <code translate="no">LIMIT</code>, то будет использоваться <code translate="no">search_default_limit</code>, так как Milvus требует этого.</li>
<li>Колонка метаданных не поддерживается, но если в коллекции включена динамическая схема, вы можете делать запросы как обычно, см. пример ниже.</li>
<li>Динамические поля не могут быть отображены, но могут быть запрошены</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<span class="hljs-variable constant_">WHERE</span> search_vector = <span class="hljs-string">&#x27;[3.0, 1.0, 2.0, 4.5]&#x27;</span>
<span class="hljs-variable constant_">LIMIT</span> <span class="hljs-number">10</span>;
<button class="copy-code-btn"></button></code></pre>
<p>Если вы опустите <code translate="no">search_vector</code>, это станет базовым поиском, и будет возвращено <code translate="no">LIMIT</code> или <code translate="no">search_default_limit</code> количество записей в коллекции.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<button class="copy-code-btn"></button></code></pre>
<p>Вы можете использовать предложение <code translate="no">WHERE</code> для динамических полей, как в обычном SQL.</p>
<pre><code translate="no" class="language-sql">SELECT * FROM milvus_datasource.createtest
<span class="hljs-type">WHERE</span> <span class="hljs-variable">category</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;science&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deleting-records" class="common-anchor-header">Удаление записей</h3><p>Вы можете удалять записи с помощью <code translate="no">DELETE</code>, как и в SQL.</p>
<p>Оговорки:</p>
<ul>
<li>Milvus поддерживает удаление сущностей только с четко определенными первичными ключами.</li>
<li>Вы можете использовать только оператор <code translate="no">IN</code>.</li>
</ul>
<pre><code translate="no" class="language-sql">DELETE FROM milvus_datasource.test
WHERE <span class="hljs-built_in">id</span> IN (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Inserting-records" class="common-anchor-header">Вставка записей</h3><p>Вы также можете вставлять отдельные строки, как показано ниже:</p>
<pre><code translate="no" class="language-sql">INSERT INTO milvus_test.testable (<span class="hljs-built_in">id</span>,content,metadata,embeddings)
VALUES (<span class="hljs-string">&quot;id3&quot;</span>, <span class="hljs-string">&#x27;this is a test&#x27;</span>, <span class="hljs-string">&#x27;{&quot;test&quot;: &quot;test&quot;}&#x27;</span>, <span class="hljs-string">&#x27;[1.0, 8.0, 9.0]&#x27;</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Updating" class="common-anchor-header">Обновление</h3><p>Обновление записей не поддерживается Milvus API. Вы можете попробовать использовать комбинацию <code translate="no">DELETE</code> и <code translate="no">INSERT</code></p>
<hr>
<p>Для получения более подробной информации и примеров, пожалуйста, обратитесь к <a href="https://docs.mindsdb.com/what-is-mindsdb">официальной документации MindsDB</a>.</p>
