---
id: configure_access_logs.md
title: Настройка журналов доступа
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">Настройка журналов доступа<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>Функция журнала доступа в Milvus позволяет менеджерам серверов записывать и анализировать поведение пользователей при доступе, помогая понять такие аспекты, как частота успешных запросов и причины отказов.</p>
<p>В этом руководстве приведены подробные инструкции по настройке журналов доступа в Milvus.</p>
<p>Конфигурация журналов доступа зависит от метода установки Milvus:</p>
<ul>
<li><strong>Установка Helm</strong>: Настройка в <code translate="no">values.yaml</code>. Дополнительные сведения см. в разделе <a href="/docs/ru/configure-helm.md">Настройка Milvus с помощью диаграмм Helm</a>.</li>
<li><strong>Установка Docker</strong>: Настроить в <code translate="no">milvus.yaml</code>. Дополнительные сведения см. в разделе <a href="/docs/ru/configure-docker.md">Настройка Milvus с помощью Docker Compose</a>.</li>
<li><strong>Установка оператора</strong>: Измените <code translate="no">spec.components</code> в файле конфигурации. Дополнительные сведения см. в разделе <a href="/docs/ru/configure_operator.md">Настройка Milvus с помощью Milvus Operator</a>.</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Варианты конфигурации<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Выберите один из трех вариантов конфигурации в зависимости от ваших потребностей:</p>
<ul>
<li><strong>Базовая конфигурация</strong>: Для общих целей.</li>
<li><strong>Конфигурация для файлов журналов локального доступа</strong>: Для локального хранения журналов.</li>
<li><strong>Конфигурация для загрузки локальных журналов доступа в MinIO</strong>: Для облачного хранения и резервного копирования.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Базовая конфигурация</h3><p>Базовая конфигурация включает в себя включение журналов доступа и определение имени файла журнала или использование stdout.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is emtpy, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Включать ли функцию журнала доступа. По умолчанию <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.filename</code>: Имя файла журнала доступа. Если оставить этот параметр пустым, журналы доступа будут выводиться в stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Настройка локальных файлов журнала доступа</h3><p>Настройка локального хранения файлов журнала доступа с параметрами, включающими путь к локальному файлу, размер файла и интервал ротации:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">24</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Эти параметры задаются, если <code translate="no">filename</code> не пуст.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: Путь к локальному файлу, где хранится файл журнала доступа.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: : Максимальный размер в МБ, допустимый для одного файла журнала доступа. Если размер файла журнала достигнет этого предела, будет запущен процесс ротации. Этот процесс запечатывает текущий файл журнала доступа, создает новый файл журнала и очищает содержимое исходного файла журнала.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: Максимальный интервал времени в секундах, допустимый для ротации одного файла журнала доступа. По достижении указанного интервала времени запускается процесс ротации, в результате которого создается новый файл журнала доступа и запечатывается предыдущий.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: Максимальное количество опечатанных файлов журнала доступа, которое может быть сохранено. Если количество опечатанных файлов журнала доступа превысит этот предел, самый старый из них будет удален.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Настройка выгрузки локальных файлов журналов доступа в MinIO</h3><p>Включите и настройте параметры для загрузки локальных файлов журналов доступа в MinIO:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">24</span> 
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span>
    <span class="hljs-attr">minioEnable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">remotePath:</span> <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    <span class="hljs-attr">remoteMaxTime:</span> <span class="hljs-number">0</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>При настройке параметров MinIO убедитесь, что вы установили либо <code translate="no">maxSize</code>, либо <code translate="no">rotatedTime</code>. Невыполнение этого требования может привести к неудачной загрузке локальных файлов журнала доступа в MinIO.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Загружать ли локальные файлы журналов доступа в MinIO. По умолчанию <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: Путь к хранилищу объектов для загрузки файлов журналов доступа.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: : Интервал времени, допустимый для загрузки файлов журнала доступа. Если время загрузки файла журнала превышает этот интервал, файл будет удален. Установка значения 0 отключает эту функцию.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">Настройка форматера<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>По умолчанию для всех методов используется формат журнала <code translate="no">base</code>, который не требует специальных ассоциаций методов. Однако, если вы хотите настроить вывод журнала для определенных методов, вы можете определить собственный формат журнала и применить его к связанным методам.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    <span class="hljs-attr">formatters:</span>
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      <span class="hljs-attr">base:</span> 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_name-$method_status-$error_code [traceID: $trace_id] [timeCost: $time_cost]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      <span class="hljs-attr">query:</span> 
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_status-$method_name [traceID: $trace_id] [timeCost: $time_cost] [database: $database_name] [collection: $collection_name] [partitions: $partition_name] [expr: $method_expr]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        <span class="hljs-attr">methods:</span> [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.format</code>: Определяет формат журнала с динамическими метриками. Дополнительные сведения см. в разделе <a href="#reference-supported-metrics">Поддерживаемые метрики</a>.</li>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.methods</code>: Перечисляет операции Milvus, использующие данный формат. Чтобы получить имена методов, см. раздел <strong>MilvusService</strong> в разделе <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Методы Milvus</a>.</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">Ссылка: Поддерживаемые метрики<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Метрика Имя</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>Имя метода</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>Статус доступа: <strong>OK</strong> или <strong>Fail</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Выражение, используемое для операций запроса, поиска или удаления</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>Идентификатор трассировки, связанный с доступом</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>IP-адрес пользователя</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Имя пользователя</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Размер данных ответа</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Код ошибки, характерный для Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Подробное сообщение об ошибке</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Имя целевой базы данных Milvus</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Имя целевой коллекции Milvus</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Имя или имена целевого раздела (разделов) Milvus</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Время, затраченное на завершение доступа</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Время, в которое печатается журнал доступа (обычно эквивалентно <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Время начала доступа</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Время окончания доступа</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Версия Milvus SDK, используемая пользователем</td></tr>
</tbody>
</table>
