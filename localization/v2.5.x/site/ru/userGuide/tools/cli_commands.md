---
id: cli_commands.md
summary: Взаимодействуйте с Милвусом с помощью команд.
title: Справочник команд Milvus_CLI
---
<h1 id="MilvusCLI-Command-Reference" class="common-anchor-header">Справочник команд Milvus_CLI<button data-href="#MilvusCLI-Command-Reference" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Command-Line Interface (CLI) - это инструмент командной строки, который поддерживает подключение к базе данных, операции с данными, а также импорт и экспорт данных.</p>
<p>В этой теме представлены все поддерживаемые команды и соответствующие опции. Некоторые примеры также включены для справки.</p>
<h2 id="clear" class="common-anchor-header">очистить<button data-href="#clear" class="anchor-icon" translate="no">
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
    </button></h2><p>Очищает экран.</p>
<p><h3 id="clear">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">clear
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="clear">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">н/а</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h2 id="connect" class="common-anchor-header">подключиться<button data-href="#connect" class="anchor-icon" translate="no">
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
    </button></h2><p>Подключение к Milvus.</p>
<p><h3 id="connect">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">connect [-uri (text)] [-t (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="connect">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-uri</td><td style="text-align:left">-uri</td><td style="text-align:left">(Необязательно) Имя uri. По умолчанию - &quot;http://127.0.0.1:19530&quot;.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-token</td><td style="text-align:left">(Необязательно) apikey облака zilliz или <code translate="no">username:password</code>. По умолчанию - None.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 id="connect">Пример</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; connect -uri <span class="hljs-attr">http</span>:<span class="hljs-comment">//127.0.0.1:19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-Database" class="common-anchor-header">создать базу данных<button data-href="#create-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Создание базы данных в Milvus</p>
<p><h3 id="create-database">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">create database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Опции</h3><table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-database</td><td style="text-align:left">[Требуется] Имя базы данных в milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Примеры</h3><h4 id="Example-1" class="common-anchor-header">Пример 1</h4><p>В следующем примере создается база данных <code translate="no">testdb</code> в milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="use-Database" class="common-anchor-header">использовать базу данных<button data-href="#use-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Использовать базу данных в Milvus</p>
<p><h3 id="use-database">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">use database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Опции</h3><table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-database</td><td style="text-align:left">[Требуется] Имя базы данных в milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Примеры</h3><h4 id="Example-1" class="common-anchor-header">Пример 1</h4><p>В следующем примере используется база данных <code translate="no">testdb</code> в milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; use database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-Databases" class="common-anchor-header">список баз данных<button data-href="#list-Databases" class="anchor-icon" translate="no">
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
    </button></h2><p>Список баз данных в Milvus</p>
<p><h3 id="list-database">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">list databases
<button class="copy-code-btn"></button></code></pre>
<h3 id="Examples" class="common-anchor-header">Примеры</h3><h4 id="Example-1" class="common-anchor-header">Пример 1</h4><p>В следующем примере перечислены базы данных в Milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; list databases
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-Database" class="common-anchor-header">удалить базу данных<button data-href="#delete-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Удалить базу данных в Milvus</p>
<p><h3 id="delete-database">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> database -<span class="hljs-title function_">db</span> (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Опции</h3><table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-database</td><td style="text-align:left">[Требуется] Имя базы данных в milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Примеры</h3><h4 id="Example-1" class="common-anchor-header">Пример 1</h4><p>В следующем примере удаляется база данных <code translate="no">testdb</code> в milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-user" class="common-anchor-header">создать пользователя<button data-href="#create-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Создание пользователя в Milvus</p>
<p><h3 id="create-user">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">create user -u (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Опции</h3><table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-пароль</td><td style="text-align:left">Пароль пользователя в формате milvus. По умолчанию используется значение &quot;None&quot;.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-username</td><td style="text-align:left">Имя пользователя в milvus. По умолчанию - &quot;Нет&quot;.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Примеры</h3><h4 id="Example-1" class="common-anchor-header">Пример 1</h4><p>В следующем примере создается пользователь <code translate="no">zilliz</code> и пароль <code translate="no">zilliz</code> в milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create user -u zilliz -p zilliz
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-role" class="common-anchor-header">создать роль<button data-href="#create-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Создание роли в Milvus</p>
<p><h3 id="create-role">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">create role -r (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Опции</h3><table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-roleName</td><td style="text-align:left">Имя роли milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Примеры</h3><h4 id="Example-1" class="common-anchor-header">Пример 1</h4><p>В следующем примере создается роль <code translate="no">role1</code> в milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create role -r role1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-alias" class="common-anchor-header">создать псевдоним<button data-href="#create-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Задает уникальные псевдонимы для коллекции.</p>
<div class="alert note">Коллекция может иметь несколько псевдонимов. Однако псевдоним соответствует максимум одной коллекции.</div>
<p><h3 id="create-alias">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">create <span class="hljs-built_in">alias</span> -c (text) -a (text) [-A]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-alias">Параметры</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции.</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-alias-name</td><td style="text-align:left">Псевдоним.</td></tr>
<tr><td style="text-align:left">-A</td><td style="text-align:left">-alter</td><td style="text-align:left">(Необязательно) Флаг для передачи псевдонима в указанную коллекцию.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 id="create-alias">Примеры</h3></p>
<p><h4>Пример 1</h4></p>
<p>В следующем примере создаются псевдонимы <code translate="no">carAlias1</code> и <code translate="no">carAlias2</code> для коллекции <code translate="no">car</code>.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create <span class="hljs-built_in">alias</span> -c car -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<p><h4>Пример 2</h4></p>
<div class="alert note">Пример 2 основан на примере 1.</div>
<p>В следующем примере псевдоним <code translate="no">carAlias1</code> переносится из коллекции <code translate="no">car</code> в коллекцию <code translate="no">car2</code>.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create <span class="hljs-built_in">alias</span> -c car2 -A -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-collection" class="common-anchor-header">создать коллекцию<button data-href="#create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Создает коллекцию.</p>
<p><h3 id="create-collection">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">create collection -c (text) -f (text) -p (text) [-a] [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-collection">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции.</td></tr>
<tr><td style="text-align:left">-f</td><td style="text-align:left">-schema-field</td><td style="text-align:left">(Множество) Схема поля в формате <code translate="no">&lt;fieldName&gt;:&lt;dataType&gt;:&lt;dimOfVector/desc&gt;</code>.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-schema-primary-field</td><td style="text-align:left">Имя поля первичного ключа.</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-schema-auto-id</td><td style="text-align:left">(Необязательно) Флаг для автоматической генерации идентификаторов.</td></tr>
<tr><td style="text-align:left">-desc</td><td style="text-align:left">-schema-description</td><td style="text-align:left">(Необязательно) Описание коллекции.</td></tr>
<tr><td style="text-align:left">-level</td><td style="text-align:left">-уровень согласованности</td><td style="text-align:left">(Необязательно) Уровень согласованности: Bounded, Session, Strong, Eventual .</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">-is-dynamic</td><td style="text-align:left">(Необязательно) Схема коллекции поддерживает динамические поля или нет.</td></tr>
<tr><td style="text-align:left">-s</td><td style="text-align:left">-shards-num</td><td style="text-align:left">(Необязательно) Количество осколков</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 id="create-collection">Пример</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment">## For array field: --schema-field support &lt;fieldName&gt;:&lt;dataType&gt;:&lt;maxCapacity&gt;:&lt;elementDataType&gt;(:&lt;maxLength&gt;if Varchar)</span>

milvus_cli &gt; create collection -c car -f <span class="hljs-built_in">id</span>:INT64:primary_field -f vector:FLOAT_VECTOR:<span class="hljs-number">128</span> -f color:INT64:color -f brand:ARRAY:<span class="hljs-number">64</span>:VARCHAR:<span class="hljs-number">128</span> -p <span class="hljs-built_in">id</span> -A -d <span class="hljs-string">&#x27;car_collection&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-partition" class="common-anchor-header">создать раздел<button data-href="#create-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Создает раздел.</p>
<p><h3 id="creat-partition">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">create partition -c (text) -p (text) [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-partition">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">Имя раздела.</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">-description</td><td style="text-align:left">(Необязательно) Описание раздела.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 id="creat-partition">Пример</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create partition -c car -p new_partition -d test_add_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-index" class="common-anchor-header">создать индекс<button data-href="#create-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Создает индекс для поля.</p>
<div class="alert note"> В настоящее время коллекция поддерживает не более одного индекса.</div>
<p><h3 id="creat-index">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">create index
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-index">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">н/а</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 id="creat-index">Пример</h3></p>
<p>Создать индекс для поля и получить запрос на ввод необходимых данных:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create index

Collection name (car, car2): car2

The name of the field to create an index <span class="hljs-keyword">for</span> (vector): vector

Index name: vectorIndex

<span class="hljs-comment"># Default is &#x27;&#x27;</span>
Index <span class="hljs-built_in">type</span> FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY, AUTOINDEX, DISKANN, GPU_IVF_FLAT, GPU_IVF_PQ, SPARSE_INVERTED_INDEX, SPARSE_WAND, SCANN, STL_SORT, Trie, INVERTED, ) []: IVF_FLAT

<span class="hljs-comment"># Default is &#x27;&#x27;</span>
Index metric <span class="hljs-built_in">type</span> (L2, IP, HAMMING, TANIMOTO, COSINE, ) []:

Timeout []:
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-user" class="common-anchor-header">удалить пользователя<button data-href="#delete-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Удаляет пользователя</p>
<h3 id="Syntax" class="common-anchor-header">Синтаксис</h3><pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> user -<span class="hljs-title function_">u</span> (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Опции</h3><table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-имя пользователя</td><td style="text-align:left">Имя пользователя.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h3 id="Example" class="common-anchor-header">Пример</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> user -u zilliz
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-role" class="common-anchor-header">удалить роль<button data-href="#delete-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Удаление роли в Milvus</p>
<p><h3 id="delete-role">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> role -<span class="hljs-title function_">r</span> (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Опции</h3><table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-roleName</td><td style="text-align:left">Имя роли milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Примеры</h3><p>В следующем примере удаляется роль <code translate="no">role1</code> в milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> role -r role1
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-alias" class="common-anchor-header">удалить псевдоним<button data-href="#delete-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Удаляет псевдоним.</p>
<p><h3 id="delete-alias">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> alias -<span class="hljs-title function_">a</span> (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-alias">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-alias-name</td><td style="text-align:left">Псевдоним.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
<tr><td style="text-align:left"></td></tr>
</tbody>
</table>
<h2 id="delete-collection" class="common-anchor-header">удалить коллекцию<button data-href="#delete-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Удаляет коллекцию.</p>
<p><h3 id="delete-collection">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> collection -<span class="hljs-title function_">c</span> (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-collection">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя удаляемой коллекции.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 id="delete-collection">Пример</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> collection -c car
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-entities" class="common-anchor-header">удалить сущности<button data-href="#delete-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>Удаляет сущности.</p>
<p><h3 id="delete-entities">Синтаксис</h3></p>
<pre><code translate="no"><span class="hljs-keyword">delete</span> entities -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">p</span> (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-entities">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции, к которой принадлежат удаляемые сущности.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">(Необязательно) Имя удаляемого раздела.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 id="delete-entities">Пример</h3></p>
<pre><code translate="no">milvus_cli &gt; <span class="hljs-keyword">delete</span> entities -c car

<span class="hljs-title class_">The</span> expression to specify entities to be deleted, such <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;film_id in [ 0, 1 ]&quot;</span>: film_id <span class="hljs-keyword">in</span> [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ]

<span class="hljs-title class_">You</span> are trying to <span class="hljs-keyword">delete</span> the entities <span class="hljs-keyword">of</span> collection. <span class="hljs-title class_">This</span> action cannot be undone!

<span class="hljs-title class_">Do</span> you want to <span class="hljs-keyword">continue</span>? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-partition" class="common-anchor-header">удалить раздел<button data-href="#delete-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Удаляет раздел.</p>
<p><h3 id="delete-partition">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> partition -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">p</span> (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-partition">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции, к которой принадлежит удаляемый раздел.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">Имя удаляемого раздела.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 id="delete-partition">Пример</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> partition -c car -p new_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-index" class="common-anchor-header">удалить индекс<button data-href="#delete-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Удаляет индекс и соответствующие индексные файлы.</p>
<div class="alert note"> В настоящее время коллекция поддерживает не более одного индекса.</div>
<p><h3 id="delete-index">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> index -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">in</span> (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции.</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">-index-name</td><td style="text-align:left">Имя индекса.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 >Пример</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> index -c car -<span class="hljs-keyword">in</span> indexName
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-role" class="common-anchor-header">предоставить роль<button data-href="#grant-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Предоставление роли пользователю</p>
<p><h3 id="grant-user">Синтаксис</h3></p>
<p><h3 >Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-roleName</td><td style="text-align:left">Имя роли milvus.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-username</td><td style="text-align:left">Имя пользователя milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 >Пример</h3></p>
<pre><code translate="no" class="language-shell">grant role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-privilege" class="common-anchor-header">присвоить привилегию<button data-href="#grant-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>Назначает привилегию роли.</p>
<p><h3 id="assign-privilege">Синтаксис</h3></p>
<p><h3 >Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">н/а</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 >Пример</h3></p>
<pre><code translate="no" class="language-shell">grant privilege
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-role" class="common-anchor-header">отозвать роль<button data-href="#revoke-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Отменяет роль, назначенную пользователю.</p>
<p><h3 id="grant-user">Синтаксис</h3></p>
<p><h3 >Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-roleName</td><td style="text-align:left">Имя роли milvus.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-username</td><td style="text-align:left">Имя пользователя milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 >Пример</h3></p>
<pre><code translate="no" class="language-shell">grant role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-privilege" class="common-anchor-header">отменить привилегию<button data-href="#revoke-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>Отменяет привилегию, уже назначенную роли.</p>
<p><h3 id="revoke-privilege">Синтаксис</h3></p>
<p><h3 >Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">н/а</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 >Пример</h3></p>
<pre><code translate="no" class="language-shell">revoke privilege
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-collection" class="common-anchor-header">показать коллекцию<button data-href="#show-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Отображает подробную информацию о коллекции.</p>
<p><h3 id="show-collection">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">show collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3>Пример</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show collection -c test_collection_insert
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-partition" class="common-anchor-header">показать раздел<button data-href="#show-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Показывает подробную информацию о разделе.</p>
<p><h3 id="show-partition">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">show partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции, к которой принадлежит раздел.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">Имя раздела.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3>Пример</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show partition -c test_collection_insert -p _default
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-index" class="common-anchor-header">показать индекс<button data-href="#show-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Показывает подробную информацию об индексе.</p>
<p><h3 id="show-index">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">show index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции.</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">-index-name</td><td style="text-align:left">Имя индекса.</td></tr>
</tbody>
</table>
<p>| --help | n/a | Отображает справку по использованию команды. |</p>
<p><h3 >Пример</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show index -c test_collection -in index_name
<button class="copy-code-btn"></button></code></pre>
<h2 id="exit" class="common-anchor-header">exit<button data-href="#exit" class="anchor-icon" translate="no">
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
    </button></h2><p>Закрывает окно командной строки.</p>
<p><h3 id="exit">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">exit</span>
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="exit">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">н/а</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h2 id="help" class="common-anchor-header">help<button data-href="#help" class="anchor-icon" translate="no">
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
    </button></h2><p>Отображает справку по использованию команды.</p>
<p><h3 id="help">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">help</span> &lt;<span class="hljs-built_in">command</span>&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="help">Команды</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Команда</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">очистить</td><td style="text-align:left">Очищает экран.</td></tr>
<tr><td style="text-align:left">подключиться</td><td style="text-align:left">Подключение к Milvus.</td></tr>
<tr><td style="text-align:left">создать</td><td style="text-align:left">Создает коллекцию, базу данных, раздел, пользователя, роль и индекс.</td></tr>
<tr><td style="text-align:left">grant</td><td style="text-align:left">Предоставить роль, привилегию.</td></tr>
<tr><td style="text-align:left">отозвать</td><td style="text-align:left">Отменить роль, привилегию .</td></tr>
<tr><td style="text-align:left">удалить</td><td style="text-align:left">Удаление коллекции, базы данных, раздела, псевдонима, пользователя, роли или индекса.</td></tr>
<tr><td style="text-align:left">exit</td><td style="text-align:left">Закрывает окно командной строки.</td></tr>
<tr><td style="text-align:left">help</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
<tr><td style="text-align:left">вставить</td><td style="text-align:left">Импортирует данные в раздел.</td></tr>
<tr><td style="text-align:left">list</td><td style="text-align:left">Вывод списка коллекций, баз данных, разделов, пользователей, ролей, грантов или индексов.</td></tr>
<tr><td style="text-align:left">load</td><td style="text-align:left">Загружает коллекцию или раздел.</td></tr>
<tr><td style="text-align:left">запрос</td><td style="text-align:left">Показывает результаты запроса, соответствующие всем введенным критериям.</td></tr>
<tr><td style="text-align:left">освободить</td><td style="text-align:left">Высвобождает коллекцию или раздел.</td></tr>
<tr><td style="text-align:left">поиск</td><td style="text-align:left">Выполняет поиск векторного сходства или гибридный поиск.</td></tr>
<tr><td style="text-align:left">показать</td><td style="text-align:left">Показать соединение, базу данных, коллекцию, ход загрузки_прогресса или ход индекса_прогресса.</td></tr>
<tr><td style="text-align:left">переименовать</td><td style="text-align:left">Переименовать коллекцию</td></tr>
<tr><td style="text-align:left">использовать</td><td style="text-align:left">Использовать базу данных</td></tr>
<tr><td style="text-align:left">версия</td><td style="text-align:left">Показывает версию Milvus_CLI.</td></tr>
</tbody>
</table>
<h2 id="import" class="common-anchor-header">импорт<button data-href="#import" class="anchor-icon" translate="no">
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
    </button></h2><p>Импортирует локальные или удаленные данные в раздел.</p>
<p><h3 id="import">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">import</span> -<span class="hljs-title function_">c</span> (text)[-<span class="hljs-title function_">p</span> (text)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="import">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции, в которую вставляются данные.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">(Необязательно) Имя раздела, в который вставляются данные. Если не передавать этот параметр раздела, то будет выбран раздел "_default".</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 id="import">Пример 1</h3>
В следующем примере импортируется локальный CSV-файл.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">import</span> -c car <span class="hljs-string">&#x27;examples/import_csv/vectors.csv&#x27;</span>

Reading csv file...  [<span class="hljs-comment">####################################]  100%</span>

Column names are [<span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;brand&#x27;</span>]

Processed <span class="hljs-number">50001</span> lines.

Inserting ...

Insert successfully.
--------------------------  ------------------
Total insert entities:                   <span class="hljs-number">50000</span>
Total collection entities:              <span class="hljs-number">150000</span>
Milvus timestamp:           <span class="hljs-number">428849214449254403</span>
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="import">Пример 2</h3>
В следующем примере импортируется удаленный CSV-файл.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; import -c car <span class="hljs-string">&#x27;https://raw.githubusercontent.com/milvus-
io/milvus_cli/main/examples/import_csv/vectors.csv&#x27;</span>

Reading file from remote URL.

Reading csv file...  [####################################]  100%

Column names are [<span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;brand&#x27;</span>]

Processed 50001 lines.

Inserting ...

Insert successfully.

--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-users" class="common-anchor-header">список пользователей<button data-href="#list-users" class="anchor-icon" translate="no">
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
    </button></h2><p>Перечисление всех пользователей.</p>
<h3 id="Syntax" class="common-anchor-header">Синтаксис</h3><pre><code translate="no" class="language-shell">list <span class="hljs-built_in">users</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Опции</h3><p>| Опция | Полное имя | Описание | | --help | n/a | Отображает справку по использованию команды. |</p>
<h2 id="List-roles" class="common-anchor-header">Список ролей<button data-href="#List-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Список ролей в Milvus</p>
<p><h3 id="list-role">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">list roles
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Опции</h3><table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">н/а</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Примеры</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list roles
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-grants" class="common-anchor-header">Перечислить гранты<button data-href="#List-grants" class="anchor-icon" translate="no">
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
    </button></h2><p>Перечислить гранты в Milvus</p>
<h3 id="Options" class="common-anchor-header">Опции</h3><table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное название</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-roleName</td><td style="text-align:left">Имя роли milvus.</td></tr>
<tr><td style="text-align:left">-o</td><td style="text-align:left">-objectName</td><td style="text-align:left">Имя объекта milvus.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-objectType</td><td style="text-align:left">Глобальный, Коллекция или Пользователь.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Примеры</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list grants -r role1 -o object1 -t Collection
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-collections" class="common-anchor-header">список коллекций<button data-href="#list-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Выводит список всех коллекций.</p>
<p><h3 id="list-collections">Синтаксис<h3></p>
<pre><code translate="no" class="language-shell">list collections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-collections">Опции<h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">н/а</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h2 id="list-indexes" class="common-anchor-header">список индексов<button data-href="#list-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Выводит список всех индексов для коллекции.</p>
<div class="alert note"> В настоящее время коллекция поддерживает не более одного индекса. </div>
<p><h3 id="list-indexes">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">list indexes -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-indexes">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h2 id="list-partitions" class="common-anchor-header">список разделов<button data-href="#list-partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Выводит список всех разделов коллекции.</p>
<p><h3 id="list-partitions">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">list partitions -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-partitions">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h2 id="load" class="common-anchor-header">загрузить<button data-href="#load" class="anchor-icon" translate="no">
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
    </button></h2><p>Загружает коллекцию или раздел с жесткого диска в оперативную память.</p>
<p><h3 id="load">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">load -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="load">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции, к которой принадлежит раздел.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">(Необязательно/многократно) Имя раздела.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h2 id="query" class="common-anchor-header">запрос<button data-href="#query" class="anchor-icon" translate="no">
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
    </button></h2><p>Показывает результаты запроса, соответствующие всем введенным критериям.</p>
<p><h3 id="query">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">query
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="query">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">н/а</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 id="query">Пример</h3>
<h4 id="query">Пример 1</h4></p>
<p>Выполнить запрос и получить запрос на ввод необходимых данных:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: id <span class="hljs-keyword">in</span> [ <span class="hljs-number">428960801420883491</span>, <span class="hljs-number">428960801420883492</span>,
<span class="hljs-number">428960801420883493</span> ]

<span class="hljs-function">Name of partitions that contain <span class="hljs-title">entities</span>(<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) []:
<span class="hljs-literal">default</span>

A list of fields to <span class="hljs-title">return</span>(<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date. [0]:
Graceful time. Only used <span class="hljs-keyword">in</span> bounded consistency level. If graceful_time <span class="hljs-keyword">is</span> <span class="hljs-keyword">set</span>, PyMilvus will use current timestamp minus the graceful_time <span class="hljs-keyword">as</span> the guarantee_timestamp. This option <span class="hljs-keyword">is</span> 5s <span class="hljs-keyword">by</span> <span class="hljs-literal">default</span> <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">set</span>. [5]:
</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="query">Пример 2</h4></p>
<p>Чтобы выполнить запрос и получить запрос на ввод необходимых данных:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">428960801420883491</span>

Name of partitions that contain entities(split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) []:
default

A <span class="hljs-built_in">list</span> of fields to <span class="hljs-keyword">return</span>(split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) []: <span class="hljs-built_in">id</span>, color,
brand

timeout []:

Guarantee timestamp. This instructs Milvus to see <span class="hljs-built_in">all</span> operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search <span class="hljs-built_in">all</span> operations performed to date. [<span class="hljs-number">0</span>]:
Graceful time. Only used <span class="hljs-keyword">in</span> bounded consistency level. If graceful_time <span class="hljs-keyword">is</span> <span class="hljs-built_in">set</span>, PyMilvus will use current timestamp minus the graceful_time <span class="hljs-keyword">as</span> the guarantee_timestamp. This option <span class="hljs-keyword">is</span> 5s by default <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> <span class="hljs-built_in">set</span>. [<span class="hljs-number">5</span>]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="release" class="common-anchor-header">освободить<button data-href="#release" class="anchor-icon" translate="no">
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
    </button></h2><p>Освобождает коллекцию или раздел из оперативной памяти.</p>
<p><h3 id="release">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">release -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="release">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции, к которой принадлежит раздел.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">(Необязательно/многократно) Имя раздела.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h2 id="search" class="common-anchor-header">search<button data-href="#search" class="anchor-icon" translate="no">
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
    </button></h2><p>Выполняет поиск векторного сходства или гибридный поиск.</p>
<p><h3 id="search">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">search
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="search">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">н/а</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<p><h3 id="search">Примеры</h3>
<h4 id="search">Пример 1</h4></p>
<p>Выполнить поиск в csv-файле и получить запрос на ввод необходимых данных:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-function">search

Collection <span class="hljs-title">name</span> (<span class="hljs-params">car, test_collection</span>): car

The vectors of search <span class="hljs-title">data</span>(<span class="hljs-params">the length of data <span class="hljs-keyword">is</span> number of query (nq</span>), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also import a csv file
<span class="hljs-keyword">out</span> headers): examples/import_csv/search_vectors.csv

The vector field used to search of <span class="hljs-title">collection</span> (<span class="hljs-params">vector</span>): vector

Search parameter nprobe&#x27;s <span class="hljs-keyword">value</span>: 10

The max number of returned <span class="hljs-keyword">record</span>, also known <span class="hljs-keyword">as</span> topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to <span class="hljs-title">search</span> (<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee <span class="hljs-title">Timestamp</span>(<span class="hljs-params">It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date</span>) [0]:

</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="search">Пример 2</h4></p>
<p>Выполнить поиск в индексированной коллекции и получить запрос на ввод необходимых данных:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-function">search

Collection <span class="hljs-title">name</span> (<span class="hljs-params">car, test_collection</span>): car

The vectors of search <span class="hljs-title">data</span>(<span class="hljs-params">the length of data <span class="hljs-keyword">is</span> number of query (nq</span>), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also import a csv file without headers):
    [[0.71, 0.76, 0.17, 0.13, 0.42, 0.07, 0.15, 0.67, 0.58, 0.02, 0.39, 0.47, 0.58, 0.88, 0.73, 0.31, 0.23, 0.57, 0.33, 0.2, 0.03, 0.43, 0.78, 0.49, 0.17, 0.56, 0.76, 0.54, 0.45, 0.46, 0.05, 0.1, 0.43, 0.63, 0.29, 0.44, 0.65, 0.01, 0.35, 0.46, 0.66, 0.7, 0.88, 0.07, 0.49, 0.92, 0.57, 0.5, 0.16, 0.77, 0.98, 0.1, 0.44, 0.88, 0.82, 0.16, 0.67, 0.63, 0.57, 0.55, 0.95, 0.13, 0.64, 0.43, 0.71, 0.81, 0.43, 0.65, 0.76, 0.7, 0.05, 0.24, 0.03, 0.9, 0.46, 0.28, 0.92, 0.25, 0.97, 0.79, 0.73, 0.97, 0.49, 0.28, 0.64, 0.19, 0.23, 0.51, 0.09, 0.1, 0.53, 0.03, 0.23, 0.94, 0.87, 0.14, 0.42, 0.82, 0.91, 0.11, 0.91, 0.37, 0.26, 0.6, 0.89, 0.6, 0.32, 0.11, 0.98, 0.67, 0.12, 0.66, 0.47, 0.02, 0.15, 0.6, 0.64, 0.57, 0.14, 0.81, 0.75, 0.11, 0.49, 0.78, 0.16, 0.63, 0.57, 0.18]]

The vector field used to search of <span class="hljs-title">collection</span> (<span class="hljs-params">vector</span>): vector

Search parameter nprobe&#x27;s <span class="hljs-keyword">value</span>: 10

The specified number of <span class="hljs-built_in">decimal</span> places of returned distance [-1]: 5

The max number of returned <span class="hljs-keyword">record</span>, also known <span class="hljs-keyword">as</span> topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to <span class="hljs-title">search</span> (<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee <span class="hljs-title">Timestamp</span>(<span class="hljs-params">It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date</span>) [0]:

</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="search">Пример 3</h4></p>
<p>Выполнить поиск в неиндексированной коллекции и получить запрос на ввод необходимых данных:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; search

Collection name (car, car2): car

The vectors of search data(the length of data <span class="hljs-keyword">is</span> number of query (nq), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also <span class="hljs-keyword">import</span> a csv file without headers): examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

The specified number of decimal places of returned distance [-<span class="hljs-number">1</span>]: <span class="hljs-number">5</span>

The <span class="hljs-built_in">max</span> number of returned record, also known <span class="hljs-keyword">as</span> topk: <span class="hljs-number">2</span>

The boolean expression used to <span class="hljs-built_in">filter</span> attribute []:

The names of partitions to search (split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) [<span class="hljs-string">&#x27;_default&#x27;</span>] []:

timeout []:

Guarantee Timestamp(It instructs Milvus to see <span class="hljs-built_in">all</span> operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search <span class="hljs-built_in">all</span> operations performed to date) [<span class="hljs-number">0</span>]:

<button class="copy-code-btn"></button></code></pre>
<h2 id="list-connection" class="common-anchor-header">список соединений<button data-href="#list-connection" class="anchor-icon" translate="no">
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
    </button></h2><p>Список соединений.</p>
<p><h3 id="show-connection">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">list connections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-connection">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">н/а</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h2 id="show-indexprogress" class="common-anchor-header">show index_progress<button data-href="#show-indexprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>Показывает прогресс индексирования сущностей.</p>
<p><h3 id="show-index-progress">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">show index_progress -c (text) [-i (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-index-progress">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции, к которой принадлежат сущности.</td></tr>
<tr><td style="text-align:left">-i</td><td style="text-align:left">-index</td><td style="text-align:left">(Необязательно) Имя индекса.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h2 id="show-loadingprogress" class="common-anchor-header">show loading_progress<button data-href="#show-loadingprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>Отображает ход загрузки коллекции.</p>
<p><h3 id="show-loading-progress">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">show loading_progress -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-loading-progress">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-name</td><td style="text-align:left">Имя коллекции, к которой принадлежат сущности.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">(Необязательно/многократно) Имя раздела загрузки.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<h2 id="version" class="common-anchor-header">версия<button data-href="#version" class="anchor-icon" translate="no">
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
    </button></h2><p>Показывает версию Milvus_CLI.</p>
<p><h3 id="version">Синтаксис</h3></p>
<pre><code translate="no" class="language-shell">version
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="version">Опции</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Опция</th><th style="text-align:left">Полное имя</th><th style="text-align:left">Описание</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">н/а</td><td style="text-align:left">Отображает справку по использованию команды.</td></tr>
</tbody>
</table>
<div class="alert note"> Вы также можете проверить версию Milvus_CLI в оболочке, как показано в следующем примере. В этом случае <code translate="no">milvus_cli --version</code> выступает в качестве команды.</div>
<p><h3 id="version">Пример</h3></p>
<pre><code translate="no" class="language-shell">$ milvus_cli --version
Milvus_CLI v0.4.0
<button class="copy-code-btn"></button></code></pre>