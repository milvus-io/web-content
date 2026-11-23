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
    </button></h1><p>Функция журналов доступа в Milvus позволяет администраторам серверов регистрировать и анализировать поведение пользователей при доступе, что помогает понять такие аспекты, как показатели успешности запросов и причины сбоев.</p>
<p>В данном руководстве приведены подробные инструкции по настройке журналов доступа в Milvus.</p>
<p>Настройка журналов доступа зависит от способа установки Milvus:</p>
<ul>
<li><strong>Установка с помощью Helm</strong>: настройте в файле <code translate="no">values.yaml</code>. Дополнительные сведения см. в разделе <a href="/docs/ru/configure-helm.md">«Настройка Milvus с помощью Helm Charts</a>».</li>
<li><strong>Установка с помощью Docker</strong>: настройте в файле ` <code translate="no">milvus.yaml</code>`. Дополнительные сведения см. в разделе <a href="/docs/ru/configure-docker.md">«Настройка Milvus с помощью Docker Compose</a>».</li>
<li><strong>Установка с помощью Operator</strong>: измените файл <code translate="no">spec.components</code> в конфигурационном файле. Дополнительные сведения см. в разделе <a href="/docs/ru/configure_operator.md">«Настройка Milvus с помощью Milvus Operator</a>».</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Параметры конфигурации<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
<li><strong>Базовая конфигурация</strong>: для общих целей.</li>
<li><strong>Конфигурация для локальных файлов журналов доступа</strong>: для хранения журналов локально.</li>
<li><strong>Конфигурация для загрузки локальных файлов журналов доступа в MinIO</strong>: для хранения в облаке и резервного копирования.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Базовая конфигурация<button data-href="#Base-config" class="anchor-icon" translate="no">
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
    </button></h3><p>Базовая конфигурация включает включение журналов доступа и определение имени файла журнала или использование stdout.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is empty, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Включить ли функцию журнала доступа. По умолчанию установлено значение <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.filename</code>: Имя файла журнала доступа. Если этот параметр оставить пустым, журналы доступа будут выводиться в stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Настройка локальных файлов журналов доступа<button data-href="#Config-for-local-access-log-files" class="anchor-icon" translate="no">
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
    </button></h3><p>Настройте локальное хранилище для файлов журналов доступа с помощью параметров, включая путь к локальному файлу, размер файла и интервал ротации:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Эти параметры указываются, если поле « <code translate="no">filename</code> » не пусто.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: Путь к локальному файлу, в котором хранится файл журнала доступа. По умолчанию: ` <code translate="no">/tmp/milvus_access</code>`.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: Максимальный разрешенный размер одного файла журнала доступа в МБ. Если размер файла журнала достигнет этого предела, запускается процесс ротации. В ходе этого процесса текущий файл журнала доступа запечатывается, создается новый файл журнала, а содержимое исходного файла журнала очищается. По умолчанию установлено значение <strong>64</strong>.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: Максимальный интервал времени в секундах, допускаемый для ротации одного файла журнала доступа. По истечении указанного интервала времени запускается процесс ротации, в результате которого создаётся новый файл журнала доступа, а предыдущий — запечатывается. По умолчанию: <strong>0</strong>.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: Максимальное количество запечатанных файлов журнала доступа, которые могут храниться. Если количество запечатанных файлов журнала доступа превысит этот предел, самый старый из них будет удален. По умолчанию — <strong>8</strong>.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Настройки для загрузки локальных файлов журналов доступа в MinIO<button data-href="#Config-for-uploading-local-access-log-files-to-MinIO" class="anchor-icon" translate="no">
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
    </button></h3><p>Включите и настройте параметры для загрузки локальных файлов журналов доступа в MinIO:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span>
    <span class="hljs-attr">minioEnable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">remotePath:</span> <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    <span class="hljs-attr">remoteMaxTime:</span> <span class="hljs-number">0</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>При настройке параметров MinIO убедитесь, что вы установили значение либо <code translate="no">maxSize</code>, либо <code translate="no">rotatedTime</code>. Невыполнение этого требования может привести к сбоям при загрузке локальных файлов журналов доступа в MinIO.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Укажите, следует ли загружать локальные файлы журналов доступа в MinIO. По умолчанию установлено значение <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: Путь к хранилищу объектов для загрузки файлов журналов доступа. По умолчанию: <code translate="no">access_log/</code>.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: Временной интервал, в течение которого допускается загрузка файлов журналов доступа. Если время загрузки файла журнала превышает этот интервал, файл будет удален. Установка значения 0 отключает эту функцию. По умолчанию — <strong>0</strong>.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">Настройки форматирования<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>Формат журнала по умолчанию, используемый для всех методов, — это формат <code translate="no">base</code>, который не требует специальных связей с методами. Однако, если вы хотите настроить вывод журнала для определённых методов, вы можете определить собственный формат журнала и применить его к соответствующим методам.</p>
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
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.format</code>: Определяет формат журнала с динамическими метриками. Дополнительную информацию см. в разделе <a href="#reference-supported-metrics">«Поддерживаемые метрики</a>».</li>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.methods</code>: Перечисляет операции Milvus, использующие этот форматтер. Чтобы узнать названия методов, см. раздел <strong>«MilvusService»</strong> в описании <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">методов Milvus</a>.</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">Справочная информация: Поддерживаемые метрики<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><th>Название метрики</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>Имя метода</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>Статус доступа: <strong>OK</strong> или <strong>Fail</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Выражение, используемое для операций запроса, поиска или удаления</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>TraceID, связанный с доступом</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>IP-адрес пользователя</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Имя пользователя</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Размер данных ответа</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Код ошибки, специфичный для Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Подробное сообщение об ошибке</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Имя целевой базы данных Milvus</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Имя целевой коллекции Milvus</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Имя или имена целевых разделов Milvus</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Время, затраченное на выполнение доступа</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Время, в которое выводится журнал доступа (обычно соответствует параметру ` <code translate="no">$time_end</code>`)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Время начала доступа</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Время окончания доступа</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Версия Milvus SDK, используемая пользователем</td></tr>
<tr><td><code translate="no">$error_type</code></td><td>Тип ошибки: <strong>system_error</strong> или <strong>input_error</strong></td></tr>
<tr><td><code translate="no">$output_fields</code></td><td>Поля выходных данных запроса</td></tr>
<tr><td><code translate="no">$cluster_prefix</code></td><td>Префикс кластера, заданный в <code translate="no">msgChannel.chanNamePrefix.cluster</code></td></tr>
<tr><td><code translate="no">$consistency_level</code></td><td>Уровень согласованности запроса</td></tr>
<tr><td><code translate="no">$anns_field</code></td><td>Векторное поле запроса на поиск или гибридный поиск</td></tr>
<tr><td><code translate="no">$nq</code></td><td>Количество векторов запроса поискового или гибридного запроса</td></tr>
<tr><td><code translate="no">$search_params</code></td><td>Параметры поиска в запросе на поиск или гибридный поиск</td></tr>
<tr><td><code translate="no">$query_params</code></td><td>Параметры запроса, задаваемые клиентом</td></tr>
<tr><td><code translate="no">$client_request_time</code></td><td>Время запроса, которое клиент задает в метаданных gRPC</td></tr>
<tr><td><code translate="no">$template_value_length</code></td><td>Длина каждого значения шаблона выражения</td></tr>
<tr><td><code translate="no">$partial_update</code></td><td>Является ли запрос upsert частичным обновлением</td></tr>
</tbody>
</table>
