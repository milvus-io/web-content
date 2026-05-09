---
id: snapshot-use-cases.md
title: Примеры использования моментальных снимковCompatible with Milvus 3.0.x
summary: В этом руководстве вы найдете общие случаи использования моментальных снимков.
beta: Milvus 3.0.x
---
<h1 id="Snapshot-Use-Cases" class="common-anchor-header">Примеры использования моментальных снимков<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshot-Use-Cases" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве вы найдете общие случаи использования моментальных снимков.</p>
<h2 id="Data-backup-and-restoration" class="common-anchor-header">Резервное копирование и восстановление данных<button data-href="#Data-backup-and-restoration" class="anchor-icon" translate="no">
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
    </button></h2><p>Снимки - это быстрые, точечные образы данных, подходящие для быстрого отката или тестирования (от нескольких дней до нескольких недель). В то же время резервные копии - это независимые, полные копии, хранящиеся отдельно для долгосрочного аварийного восстановления (от нескольких недель до нескольких лет) и для лучшей защиты от полного отказа хранилища.</p>
<p>В следующей таблице приведено сравнение моментальных снимков и резервных копий.</p>
<table>
   <tr>
     <th></th>
     <th><p>Резервное копирование</p></th>
     <th><p>Снимок</p></th>
   </tr>
   <tr>
     <td><p>Создание резервной копии</p></td>
     <td><p>Копирует все файлы данных (занимает много времени).</p></td>
     <td><p>Создает только метаданные (в миллисекундах)</p></td>
   </tr>
   <tr>
     <td><p>Восстановление</p></td>
     <td><p>Импортирует данные и перестраивает индексы</p></td>
     <td><p>Копирует только существующие файлы данных и индексов</p></td>
   </tr>
   <tr>
     <td><p>Производительность</p></td>
     <td><p>Медленный и ресурсоемкий</p></td>
     <td><p>Быстрая и легкая (от нескольких секунд до нескольких минут)</p></td>
   </tr>
   <tr>
     <td><p>Влияние на систему</p></td>
     <td><p>Высокое использование операций ввода-вывода и процессора</p></td>
     <td><p>Минимальное воздействие</p></td>
   </tr>
</table>
<p>Создание моментального снимка обычно занимает миллисекунды, а его восстановление - от нескольких секунд до нескольких минут, в зависимости от объема данных.</p>
<p>Более подробную информацию о лимитах, ограничениях и влиянии моментальных снимков на систему см. в разделе <a href="/docs/ru/snapshots.md">"Моментальные снимки"</a>.</p>
<h3 id="Create-snapshots" class="common-anchor-header">Создание моментальных снимков<button data-href="#Create-snapshots" class="anchor-icon" translate="no">
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
    </button></h3><p>Перед созданием моментального снимка рекомендуется прекратить запись данных в целевую коллекцию и вызвать <code translate="no">flush()</code>, чтобы избежать возможной потери данных.</p>
<div class="alert note">
</div>
<p>При именовании моментального снимка используйте понятные, описательные имена, например <code translate="no">&quot;daily_backup_20240101&quot;</code> или <code translate="no">&quot;v2.1_production_release&quot;</code>, и избегайте общих терминов, таких как <code translate="no">&quot;backup1&quot;</code> и <code translate="no">&quot;test&quot;</code>. Используйте имена моментальных снимков с умом, чтобы различать снимки разных версий, окружений и этапов.</p>
<p>В приведенных ниже примерах кода предполагается, что у вас уже есть коллекция с именем <code translate="no">my_collection</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Recommended: Flush data before creating snapshot to ensure all data is included</span>
client.flush(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="hljs-comment"># Create snapshot for entire collection</span>
client.create_snapshot(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    description=<span class="hljs-string">&quot;Daily backup for January 1st, 2024&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

client, err := milvusclient.New(context.Background(), &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    Token: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})

<span class="hljs-comment">// Recommended: Flush data before creating snapshot to ensure all data is included</span>
err = client.Flush(context.Background(), milvusclient.NewFlushOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-comment">// Create snapshot</span>
createOpt := milvusclient.NewCreateSnapshotOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>, <span class="hljs-string">&quot;my_collection&quot;</span>).
    WithDescription(<span class="hljs-string">&quot;Daily backup for January 1st, 2024&quot;</span>)

err = client.CreateSnapshot(context.Background(), createOpt)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Restore-snapshots" class="common-anchor-header">Восстановление моментальных снимков<button data-href="#Restore-snapshots" class="anchor-icon" translate="no">
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
    </button></h3><p>Вы можете восстановить снимок в новую коллекцию. Эта операция является асинхронной и возвращает идентификатор задания для отслеживания хода восстановления.</p>
<p>При восстановлении используется механизм <strong>копирования сегментов</strong> вместо импорта данных, который более эффективен, поскольку</p>
<ul>
<li><p>напрямую копирует файлы сегментов (бинлоги, дельталоги, индексные файлы) из хранилища моментальных снимков</p></li>
<li><p>сохраняет идентификаторы полей и индексов для обеспечения совместимости с существующими файлами данных</p></li>
<li><p>позволяет избежать перезаписи данных и восстановления индексов, что значительно ускоряет процесс восстановления, и</p></li>
<li><p>обеспечивает 10- или 100-кратное увеличение производительности по сравнению с традиционными методами резервного копирования и восстановления.</p></li>
</ul>
<p>Чтобы восстановить моментальный снимок, выполните следующие действия:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Restore snapshot to new collection</span>
job_id = client.restore_snapshot(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    collection_name=<span class="hljs-string">&quot;restored_collection&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">restoreOpt := milvusclient.NewRestoreSnapshotOption(
    <span class="hljs-string">&quot;backup_20240101&quot;</span>,
    <span class="hljs-string">&quot;restored_collection&quot;</span>
)

jobID, err := client.RestoreSnapshot(context.Background(), restoreOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-snapshots" class="common-anchor-header">Сброс моментальных снимков<button data-href="#Drop-snapshots" class="anchor-icon" translate="no">
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
    </button></h3><p>Вы можете отказаться от снимка, если он больше не нужен. Рекомендуется регулярно удалять старые снимки для экономии места.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.drop_snapshot(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">dropOpt := milvusclient.NewDropSnapshotOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>)
err := client.DropSnapshot(context.Background(), dropOpt)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Data-processing-with-Spark" class="common-anchor-header">Обработка данных с помощью Spark<button data-href="#Data-processing-with-Spark" class="anchor-icon" translate="no">
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
    </button></h2><p>Снимки позволяют эффективно обрабатывать данные в автономном режиме, предоставляя стабильные и согласованные источники данных для аналитических рабочих нагрузок. Вы можете напрямую обращаться к данным снимков, хранящимся в объектном хранилище, с помощью Spark или других фреймворков для обработки больших данных, не затрагивая живой кластер Milvus.</p>
<p>Следующий код предполагает, что вы создали моментальный снимок с именем <code translate="no">&quot;analytics_snapshot_20260321&quot;</code>, сохранили его в ведре объектного хранилища и получили учетные данные доступа к объектному хранилищу.</p>
<h3 id="Step-1-Get-snapshot-metadata" class="common-anchor-header">Шаг 1: Получение метаданных моментального снимка<button data-href="#Step-1-Get-snapshot-metadata" class="anchor-icon" translate="no">
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
    </button></h3><p>Прежде чем использовать Spark для доступа к данным моментального снимка, получите метаданные моментального снимка, чтобы найти файлы данных в объектном хранилище.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get snapshot metadata</span>
snapshot_info = client.describe_snapshot(
    snapshot_name=s<span class="hljs-string">&quot;analytics_snapshot_20260321&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

<span class="hljs-comment"># Locate data files in S3</span>
s3_path = <span class="hljs-string">f&quot;s3a://<span class="hljs-subst">{snapshot_info.s3_location}</span>/binlogs/&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step2-Initiate-a-Spark-session" class="common-anchor-header">Шаг 2: инициируйте сеанс Spark<button data-href="#Step2-Initiate-a-Spark-session" class="anchor-icon" translate="no">
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
    </button></h3><p>Получив файлы данных в объектном хранилище, инициируйте сеанс Spark и считайте данные в кадр.</p>
<pre><code translate="no" class="language-python">spark = SparkSession.builder \
    .appName(<span class="hljs-string">&quot;VectorAnalytics&quot;</span>) \
    .config(<span class="hljs-string">&quot;spark.hadoop.fs.s3a.access.key&quot;</span>, <span class="hljs-string">&quot;YOUR_ACCESS_KEY&quot;</span>) \
    .config(<span class="hljs-string">&quot;spark.hadoop.fs.s3a.secret.key&quot;</span>, <span class="hljs-string">&quot;YOUR_SECRET_KEY&quot;</span>) \
    .getOrCreate()

<button class="copy-code-btn"></button></code></pre>
