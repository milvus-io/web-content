---
id: from-m2x.md
summary: >-
  В этом руководстве представлен полный пошаговый процесс переноса данных из
  Milvus 2.3.x в Milvus 2.3.x или выше.
title: С Milvus 2.3.x
---
<h1 id="From-Milvus-23x" class="common-anchor-header">С Milvus 2.3.x<button data-href="#From-Milvus-23x" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве представлен полный пошаговый процесс переноса данных с Milvus 2.3.x на Milvus 2.3.x или выше.</p>
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
    </button></h2><ul>
<li><strong>Версии программного обеспечения</strong>:<ul>
<li>Исходный Milvus: 2.3.0+ (Инструмент использует итератор для получения исходных данных коллекции, поэтому исходный Milvus должен быть версии 2.3.0 или выше).</li>
<li>Целевой Milvus: 2.3.0+</li>
</ul></li>
<li><strong>Необходимые инструменты</strong>:<ul>
<li>Инструмент<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>. Подробности установки см. в разделе <a href="/docs/ru/milvusdm_install.md">Установка инструмента миграции</a>.</li>
</ul></li>
<li><strong>Подготовка данных</strong>:<ul>
<li>Убедитесь, что исходная коллекция Milvus загружена и готова к экспорту данных.</li>
<li>Если целевой Milvus не содержит коллекции, соответствующей исходной, инструмент <a href="https://github.com/zilliztech/milvus-migration">milvus-migration</a> автоматически создаст ее. Обратите внимание, что после миграции целевая коллекция не будет проиндексирована, и вам придется вручную проиндексировать коллекцию.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration-file" class="common-anchor-header">Настройка файла миграции<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Сохраните пример файла конфигурации миграции как <code translate="no">migration.yaml</code> и измените конфигурацию в соответствии с вашими реальными условиями. Вы можете поместить файл конфигурации в любой локальный каталог.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    workMode: milvus2x
    reader:
      bufferSize: 500

meta:
  mode: config
  version: 2.3.0
  collection: src_table_name

<span class="hljs-built_in">source</span>:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx

target:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx
<button class="copy-code-btn"></button></code></pre>
<p>В следующей таблице описаны параметры в файле конфигурации примера. Дополнительные сведения см. в разделе <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Миграция Milvus: Milvus2.x - Milvus2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Режим работы задания миграции. Установите значение milvus2x при миграции с Milvus 2.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Размер буфера для чтения из Milvus 2.x в каждом пакете.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Указывает, откуда считывается метафайл. Имеет значение config, указывающее, что метаконфигурация может быть получена из этого файла migration.yaml.</td></tr>
<tr><td><code translate="no">meta.version</code></td><td>Исходная версия Milvus. Установите значение 2.3.0 или выше.</td></tr>
<tr><td><code translate="no">meta.collection</code></td><td>Имя исходной коллекции.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.milvus2x.endpoint</code></td><td>Адрес исходного сервера Milvus.</td></tr>
<tr><td><code translate="no">source.milvus2x.username</code></td><td>Имя пользователя для исходного сервера Milvus. Этот параметр необходим, если на сервере Milvus включена аутентификация пользователей. Дополнительные сведения см. в разделе <a href="/docs/ru/authenticate.md">Включение аутентификации</a>.</td></tr>
<tr><td><code translate="no">source.milvus2x.password</code></td><td>Пароль для исходного сервера Milvus. Этот параметр необходим, если для вашего сервера Milvus включена аутентификация пользователей. Дополнительные сведения см. в разделе <a href="/docs/ru/authenticate.md">Включить аутентификацию</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Адрес целевого сервера Milvus.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Имя пользователя для целевого сервера Milvus. Этот параметр необходим, если для сервера Milvus включена аутентификация пользователей. Дополнительные сведения см. в разделе <a href="/docs/ru/authenticate.md">Включение аутентификации</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Пароль для целевого сервера Milvus. Этот параметр необходим, если для сервера Milvus включена аутентификация пользователей. Дополнительные сведения см. в разделе <a href="/docs/ru/authenticate.md">Включить аутентификацию</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">Запуск задачи миграции<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><p>У вас есть два варианта запуска задачи миграции - с помощью CLI или с помощью API-запросов. Выберите тот, который лучше всего соответствует вашим потребностям.</p>
<h3 id="Option-1-Using-CLI" class="common-anchor-header">Вариант 1: Использование CLI</h3><p>Запустите задачу миграции с помощью следующей команды. Замените <code translate="no">{YourConfigFilePath}</code> на локальный каталог, в котором находится файл конфигурации <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Следите за обновлениями в журналах. В журналах успешной миграции должны быть такие записи, как:</p>
<pre><code translate="no" class="language-bash">[INFO] [migration/milvus2x_starter.go:79] [<span class="hljs-string">&quot;=================&gt;JobProcess!&quot;</span>] [Percent=100]
[INFO] [migration/milvus2x_starter.go:27] [<span class="hljs-string">&quot;[Starter] migration Milvus2x to Milvus2x finish!!!&quot;</span>] [Cost=94.877717375]
[INFO] [starter/starter.go:109] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=94.878243583]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Making-API-requests" class="common-anchor-header">Вариант 2: Выполнение API-запросов</h3><p>Для выполнения миграции можно также использовать Restful API. Запустите сервер API с помощью:</p>
<pre><code translate="no" class="language-bash">./milvus-migration server run -p 8080
<button class="copy-code-btn"></button></code></pre>
<p>После успешного запуска сервера поместите файл <code translate="no">migration.yaml</code> в каталог <code translate="no">configs/</code> проекта и запустите миграцию с помощью:</p>
<pre><code translate="no" class="language-bash">curl -XPOST http://localhost:8080/api/v1/start
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-result" class="common-anchor-header">Проверить результат<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>После завершения задачи миграции используйте Attu для просмотра количества перенесенных сущностей. Кроме того, в Attu можно создавать индексы и загружать коллекции. Дополнительную информацию см. в разделе <a href="https://github.com/zilliztech/attu">Attu</a> и <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
<h2 id="Additional-configuration-options" class="common-anchor-header">Дополнительные параметры конфигурации<button data-href="#Additional-configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>В дополнение к базовым настройкам, упомянутым выше, вы можете добавить дополнительные параметры, исходя из ваших конкретных требований.</p>
<ul>
<li><p><strong>Выборочная миграция полей</strong>: Если вам нужно перенести только определенные поля коллекции, а не все поля, укажите поля, которые нужно перенести, в разделе <code translate="no">meta</code> файла <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml">meta:
  fields:
    - name: <span class="hljs-built_in">id</span>
    - name: title_vector
    - name: reading_time
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Пользовательская целевая коллекция</strong>: Чтобы настроить свойства целевой коллекции, добавьте соответствующие конфигурации в раздел <code translate="no">meta</code> файла <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">meta</span>:
  <span class="hljs-attr">milvus</span>:
    <span class="hljs-attr">collection</span>: target_collection_name
    <span class="hljs-attr">shardNum</span>: <span class="hljs-number">2</span>
    <span class="hljs-attr">closeDynamicField</span>: <span class="hljs-literal">false</span>
    <span class="hljs-attr">consistencyLevel</span>: <span class="hljs-title class_">Customized</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Подробную информацию см. в разделе <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Миграция Milvus: Milvus2.x - Milvus2.x</a>.</p>
