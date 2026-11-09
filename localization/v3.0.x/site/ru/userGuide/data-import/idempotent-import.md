---
id: idempotent-import.md
order: 2
title: Идемпотентный массовый импорт
summary: >-
  Отправьте ключ идемпотентности, чтобы при повторной попытке массового импорта
  система обращалась к исходному заданию, а не создавала новое.
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">Идемпотентный массовый импорт<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>Запрос на массовый импорт может завершиться успешно, но его ответ может быть утерян: истек таймаут вызова, сорвалось соединение или ваш оркестратор завершил работу до того, как сохранил возвращенный <code translate="no">jobId</code>. Невозможно отличить состояние «не завершено» от «завершено, ответ утерян». Повторная попытка запускает второе задание, и каждая строка попадает дважды; отказ от повторной попытки может привести к потере импорта.</p>
<p>Ключ идемпотентности устраняет эту дилемму. Пометьте запрос таким ключом, и повторная попытка с тем же ключом вернет исходный файл <code translate="no">jobId</code> вместо создания второго задания.</p>
<p>Для идемпотентного массового импорта требуется Milvus 3.0.2 или более поздней версии, либо версия 2.6.24 или более поздней версии из линейки 2.6. Более старые версии сервера игнорируют этот заголовок, и каждый запрос, независимо от того, повторяется он или нет, запускает новую задачу.</p>
<h2 id="Sending-the-key" class="common-anchor-header">Отправка ключа<button data-href="#Sending-the-key" class="anchor-icon" translate="no">
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
    </button></h2><p>Ключ передаётся в виде HTTP-заголовка <code translate="no">Idempotency-Key</code>, а не в теле запроса.</p>
<pre><code translate="no" class="language-bash">curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/jobs/import/create&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Idempotency-Key: nightly-2026-09-07-batch-3&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;events&quot;, &quot;files&quot;: [[&quot;events/2026-09-07/part-0.parquet&quot;]]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<!-- TODO: the `headers` parameter and `IDEMPOTENCY_KEY_HEADER` are merged but not released: milvus-io/pymilvus#3784 (master), milvus-io/pymilvus#3807 (3.0), milvus-io/pymilvus#3808 (2.6). They are expected in pymilvus v3.0.3 and v2.6.18. After those tags exist, verify this example against the released API. -->
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> IDEMPOTENCY_KEY_HEADER, bulk_import

resp = bulk_import(
    url=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    collection_name=<span class="hljs-string">&quot;events&quot;</span>,
    files=[[<span class="hljs-string">&quot;events/2026-09-07/part-0.parquet&quot;</span>]],
    headers={IDEMPOTENCY_KEY_HEADER: <span class="hljs-string">&quot;nightly-2026-09-07-batch-3&quot;</span>},
)
resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]   <span class="hljs-comment"># the same id on every retry</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">IDEMPOTENCY_KEY_HEADER</code> <code translate="no">&quot;Idempotency-Key&quot;</code>; необработанная строка также работает. Параметр и требуют pymilvus версии 3.0.3 или более поздней в линейке 3.x, либо версии 2.6.18 или более поздней в линейке 2.6. В более старых версиях pymilvus приведенная выше строка завершается ошибкой с сообщением « » при поиске , а передача в приводит к неопределенному поведению — вызов может завершиться ошибкой, либо импорт может быть отправлен без ключа. <code translate="no">headers</code> <code translate="no">IDEMPOTENCY_KEY_HEADER</code> <code translate="no">import</code> <code translate="no">ImportError</code> <code translate="no">IDEMPOTENCY_KEY_HEADER</code> <code translate="no">headers</code> <code translate="no">bulk_import</code> </p>
<p>Опрашивайте <code translate="no">/v2/vectordb/jobs/import/describe</code> с возвращённым <code translate="no">jobId</code>, как обычно. Повторный запрос, поступивший в то время, когда исходный запрос ещё регистрируется, будет ждать его завершения, поэтому повторный запрос никогда не обнаружит частично зарегистрированное задание.</p>
<h2 id="Choosing-a-key" class="common-anchor-header">Выбор ключа<button data-href="#Choosing-a-key" class="anchor-icon" translate="no">
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
<li><strong>Один ключ на один логический запрос.</strong> Назовите единицу работы, например <code translate="no">orders-2026-09-07-batch-3</code>, или сгенерируйте UUID и сохраните его вместе с рабочим элементом перед отправкой запроса. Включите номер попытки, если вам может понадобиться повторно выполнить ту же работу.</li>
<li><strong>При повторной попытке используйте тот же ключ.</strong> Создание нового ключа при повторной попытке приводит к дублированию данных. Исключения перечислены в разделе <a href="#when-to-send-a-new-key">«Когда следует отправлять новый ключ</a>».</li>
<li><strong>Никогда не используйте один и тот же ключ для разных файлов.</strong> Milvus не сравнивает эти два запроса. Вы получите обратно исходный файл <code translate="no">jobId</code>, а новые файлы не будут импортированы.</li>
<li><strong>Ключ должен быть коротким и пригодным для печати.</strong> По умолчанию допускаются печатные ASCII-символы, максимальный размер — 256 байт (<code translate="no">streaming.idempotency.maxKeyLength</code>). Все остальные варианты отклоняются с ошибкой <code translate="no">1100</code>.</li>
<li><strong>Не включайте в него секретные данные.</strong> Ключ хранится вместе с вашими данными.</li>
</ul>
<h2 id="How-long-a-key-is-remembered" class="common-anchor-header">Как долго сохраняется ключ<button data-href="#How-long-a-key-is-remembered" class="anchor-icon" translate="no">
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
    </button></h2><p>Ключ привязан к коллекции по её внутреннему ID, поэтому переименование коллекции не прерывает повторную попытку, если в ней коллекция указана под новым именем. Удаление и повторное создание коллекции под тем же именем прерывает процесс, и в этом случае правильным решением будет запуск нового задания.</p>
<p>Milvus запоминает ключ импорта примерно на сутки. Рассматривайте это как ориентировочное, а не гарантированное значение: интенсивный трафик DDL или импорта сокращает этот срок, а перезапуск координатора — удлиняет. Повторная попытка после того, как ключ будет забыт, запускает новое задание.</p>
<h2 id="When-to-send-a-new-key" class="common-anchor-header">Когда отправлять новый ключ<button data-href="#When-to-send-a-new-key" class="anchor-icon" translate="no">
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
    </button></h2><p>Два случая, и только два:</p>
<ul>
<li><strong>Исходное задание завершилось сбоем или было прервано.</strong> Команда `Describe` возвращает ` <code translate="no">state: Failed</code> ` с указанием причины. Повторная попытка с использованием того же ключа возвращает тот же ` <code translate="no">jobId</code> `, пока ключ сохраняется в памяти. Устраните причину, а затем отправьте новый ключ.</li>
<li><strong>Исходное задание было удалено.</strong> Milvus хранит завершённые задания в течение <code translate="no">dataCoord.import.taskRetention</code> (по умолчанию 48 часов). Если этот срок истек, пока ключ ещё запомнен, повторная попытка возвращает старый <code translate="no">jobId</code>, а команда `describe` отвечает ошибкой <code translate="no">import job does not exist</code> вместо состояния задания. Это задание могло завершиться успешно. Убедитесь, что данные действительно отсутствуют, прежде чем отправлять новый ключ.</li>
</ul>
<p>Повторная попытка, которая отклоняется, например, из-за того, что лимит заданий импорта исчерпан, не относится к этим случаям. Повторите попытку позже с тем же ключом.</p>
<h2 id="Configuration" class="common-anchor-header">Настройка<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Поведение этой страницы определяется четырьмя параметрами. Ни один из них не требует изменения для работы ключа.</p>
<table>
<thead>
<tr><th>Параметр</th><th>По умолчанию</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxLifetime</code></td><td><code translate="no">24h</code></td><td>Срок хранения ключа импорта. Отсутствует в файле по умолчанию <code translate="no">milvus.yaml</code>; добавьте его явно, чтобы изменить значение. Данное хранилище также отклоняет дубликаты запросов DDL, поэтому не уменьшайте это значение только для сокращения окна импорта.</td></tr>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxCount</code></td><td><code translate="no">8192</code></td><td>Количество ключей и записей DDL, которые хранит одно и то же хранилище, прежде чем самые старые из них будут удалены, независимо от их возраста. Именно это позволяет при интенсивном трафике DDL или импорта забыть ключ до <code translate="no">maxLifetime</code>. Отсутствует в файле по умолчанию <code translate="no">milvus.yaml</code>.</td></tr>
<tr><td><code translate="no">dataCoord.import.taskRetention</code></td><td><code translate="no">172800</code> (48 часов) начиная с версий 2.6.24 и 3.0.2; до этого — <code translate="no">10800</code> </td><td>Срок, в течение которого завершённое задание импорта остаётся доступным для запросов. Установите значение не менее чем в два раза больше, чем <code translate="no">maxLifetime</code>.</td></tr>
<tr><td><code translate="no">streaming.idempotency.maxKeyLength</code></td><td><code translate="no">256</code></td><td>Максимальная длина ключа в байтах. Более длинный ключ отклоняется с ошибкой <code translate="no">1100</code>. Параметр <code translate="no">0</code> отключает это ограничение. Отсутствует в файле по умолчанию <code translate="no">milvus.yaml</code>.</td></tr>
</tbody>
</table>
<p><code translate="no">milvus.yaml</code>, поставлявшийся до версий 2.6.24 и 3.0.2, явно устанавливает значение <code translate="no">taskRetention: 10800</code>, и обновление не переопределяет значение в вашем файле. Если вы выполнили обновление с использованием этого файла, увеличьте значение <code translate="no">taskRetention</code> как минимум вдвое <code translate="no">maxLifetime</code>. Новое значение применяется только к заданиям, завершающимся после внесения изменения.</p>
