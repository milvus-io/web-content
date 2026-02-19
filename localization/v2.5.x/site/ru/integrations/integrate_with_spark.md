---
id: integrate_with_spark.md
summary: >-
  Apache Spark и Databricks интегрируются с Milvus и Zilliz Cloud, чтобы
  объединить обработку больших данных с векторным поиском. Узнайте, как создать
  поиск и аналитику на основе искусственного интеллекта с помощью коннектора
  Spark-Milvus.
title: >-
  Используйте Apache Spark™ с Milvus/Zilliz Cloud для конвейеров искусственного
  интеллекта
---
<h1 id="Use-Apache-Spark™-with-MilvusZilliz-Cloud-for-AI-Pipelines" class="common-anchor-header">Используйте Apache Spark™ с Milvus/Zilliz Cloud для конвейеров искусственного интеллекта<button data-href="#Use-Apache-Spark™-with-MilvusZilliz-Cloud-for-AI-Pipelines" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/zilliztech/spark-milvus">Коннектор Spark-Milvus Connector</a> обеспечивает интеграцию Apache Spark и Databricks с Milvus и Zilliz Cloud. Он соединяет мощные функции Apache Spark по обработке больших данных и машинному обучению (ML) с современными возможностями векторного поиска Milvus. Эта интеграция позволяет оптимизировать рабочий процесс для поиска на основе искусственного интеллекта, расширенной аналитики, обучения ML и эффективного управления крупными векторными данными.</p>
<p>Apache Spark - это платформа распределенной обработки данных, предназначенная для работы с огромными массивами данных с высокой скоростью вычислений. В паре с Milvus или Zilliz Cloud она открывает новые возможности для таких сценариев использования, как семантический поиск, рекомендательные системы и аналитика данных на основе искусственного интеллекта.</p>
<p>Например, Spark может пакетно обрабатывать большие массивы данных для создания вкраплений с помощью ML-моделей, а затем использовать коннектор Spark-Milvus для хранения этих вкраплений непосредственно в Milvus или Zilliz Cloud. После индексации эти данные можно быстро искать или анализировать, создавая мощный конвейер для рабочих процессов ИИ и больших данных.</p>
<p>Коннектор Spark-Milvus поддерживает такие задачи, как итеративный и массовый ввод данных в Milvus, синхронизация данных между системами и расширенная аналитика векторных данных, хранящихся в Milvus. В этом руководстве вы узнаете, как настроить и эффективно использовать коннектор для таких задач, как:</p>
<ul>
<li>Эффективная загрузка векторных данных в Milvus большими партиями,</li>
<li>перемещение данных между Milvus и другими системами хранения или базами данных,</li>
<li>Анализ данных в Milvus с помощью Spark MLlib и других инструментов искусственного интеллекта.</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">Быстрый старт<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Preparation" class="common-anchor-header">Подготовка<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h3><p>Spark-Milvus Connector поддерживает языки программирования Scala и Python. Пользователи могут использовать его с <strong>Pyspark</strong> или <strong>Spark-shell</strong>. Чтобы запустить эту демонстрацию, настройте среду Spark, содержащую зависимость Spark-Milvus Connector, выполнив следующие действия:</p>
<ol>
<li><p>Установите Apache Spark (версия &gt;= 3.3.0).</p>
<p>Вы можете установить Apache Spark, обратившись к <a href="https://spark.apache.org/docs/latest/">официальной документации</a>.</p></li>
<li><p>Загрузите jar-файл <strong>spark-milvus</strong>.</p>
<pre><code translate="no">wget https://github.com/zilliztech/spark-milvus/raw/1.0.0-SNAPSHOT/output/spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Запустите среду выполнения Spark с <strong>spark-milvus</strong> jar в качестве одной из зависимостей.</p>
<p>Чтобы запустить среду выполнения Spark с коннектором Spark-Milvus Connector, добавьте в команду загруженный <strong>spark-milvus</strong> в качестве зависимости.</p>
<ul>
<li><p><strong>pyspark</strong></p>
<pre><code translate="no">./bin/pyspark --jars spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>spark-shell</strong></p>
<pre><code translate="no">./bin/spark-shell --jars spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ol>
<h3 id="Demo" class="common-anchor-header">Демонстрация<button data-href="#Demo" class="anchor-icon" translate="no">
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
    </button></h3><p>В этой демонстрации мы создадим пример Spark DataFrame с векторными данными и запишем его в Milvus через Spark-Milvus Connector. Коллекция будет создана в Milvus автоматически на основе схемы и заданных параметров.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#scala">Scala</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pyspark.sql <span class="hljs-keyword">import</span> SparkSession

columns = [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>]
data = [(<span class="hljs-number">1</span>, <span class="hljs-string">&quot;a&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>]),
    (<span class="hljs-number">2</span>, <span class="hljs-string">&quot;b&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>]),
    (<span class="hljs-number">3</span>, <span class="hljs-string">&quot;c&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>]),
    (<span class="hljs-number">4</span>, <span class="hljs-string">&quot;d&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>])]
sample_df = spark.sparkContext.parallelize(data).toDF(columns)
sample_df.write \
    .mode(<span class="hljs-string">&quot;append&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.host&quot;</span>, <span class="hljs-string">&quot;localhost&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.port&quot;</span>, <span class="hljs-string">&quot;19530&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.collection.name&quot;</span>, <span class="hljs-string">&quot;hello_spark_milvus&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.collection.vectorField&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.collection.vectorDim&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>) \
    .option(<span class="hljs-string">&quot;milvus.collection.primaryKeyField&quot;</span>, <span class="hljs-string">&quot;id&quot;</span>) \
    .<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;milvus&quot;</span>) \
    .save()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-scala">import org.apache.spark.sql.{SaveMode, SparkSession}

object Hello extends App {

  val spark = SparkSession.builder().master(&quot;local[*]&quot;)
    .appName(&quot;HelloSparkMilvus&quot;)
    .getOrCreate()

  import spark.implicits._

  // Create DataFrame
  val sampleDF = Seq(
    (1, &quot;a&quot;, Seq(1.0,2.0,3.0,4.0,5.0)),
    (2, &quot;b&quot;, Seq(1.0,2.0,3.0,4.0,5.0)),
    (3, &quot;c&quot;, Seq(1.0,2.0,3.0,4.0,5.0)),
    (4, &quot;d&quot;, Seq(1.0,2.0,3.0,4.0,5.0))
  ).toDF(&quot;id&quot;, &quot;text&quot;, &quot;vec&quot;)

  // set milvus options
  val milvusOptions = Map(
      &quot;milvus.host&quot; -&gt; &quot;localhost&quot; -&gt; uri,
      &quot;milvus.port&quot; -&gt; &quot;19530&quot;,
      &quot;milvus.collection.name&quot; -&gt; &quot;hello_spark_milvus&quot;,
      &quot;milvus.collection.vectorField&quot; -&gt; &quot;vec&quot;,
      &quot;milvus.collection.vectorDim&quot; -&gt; &quot;5&quot;,
      &quot;milvus.collection.primaryKeyField&quot;, &quot;id&quot;
    )
    
  sampleDF.write.format(&quot;milvus&quot;)
    .options(milvusOptions)
    .mode(SaveMode.Append)
    .save()
}
</code></pre>
<p>После выполнения приведенного выше кода вы можете просмотреть вставленные данные в Milvus с помощью SDK или Attu (A Milvus Dashboard). Вы можете найти коллекцию с именем <code translate="no">hello_spark_milvus</code>, в которую уже вставлены 4 сущности.</p>
<h2 id="Features--concepts" class="common-anchor-header">Особенности и концепции<button data-href="#Features--concepts" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-options" class="common-anchor-header">Опции Milvus<button data-href="#Milvus-options" class="anchor-icon" translate="no">
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
    </button></h3><p>В разделе <a href="#Quick-start">"Быстрый старт</a> " мы показали установку опций при работе с Milvus. Эти опции абстрагированы как опции Milvus. Они используются для создания соединений с Milvus и управления другим поведением Milvus. Не все опции являются обязательными.</p>
<table>
<thead>
<tr><th>Ключ опции</th><th>Значение по умолчанию</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.host</code></td><td><code translate="no">localhost</code></td><td>Хост сервера Milvus. Подробнее см. в разделе <a href="https://milvus.io/docs/manage_connection.md">Управление подключениями Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.port</code></td><td><code translate="no">19530</code></td><td>Порт сервера Milvus. Подробнее см. в разделе <a href="https://milvus.io/docs/manage_connection.md">Управление подключениями Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.username</code></td><td><code translate="no">root</code></td><td>Имя пользователя для сервера Milvus. Подробнее см. в разделе <a href="https://milvus.io/docs/manage_connection.md">Управление подключениями Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.password</code></td><td><code translate="no">Milvus</code></td><td>Пароль для сервера Milvus. Подробнее см. в разделе <a href="https://milvus.io/docs/manage_connection.md">Управление подключениями Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.uri</code></td><td><code translate="no">--</code></td><td>URI сервера Milvus. Подробнее см. в разделе <a href="https://milvus.io/docs/manage_connection.md">Управление подключениями Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.token</code></td><td><code translate="no">--</code></td><td>Токен сервера Milvus. Подробнее см. в разделе <a href="https://milvus.io/docs/manage_connection.md">Управление подключениями Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.database.name</code></td><td><code translate="no">default</code></td><td>Имя базы данных Milvus для чтения или записи.</td></tr>
<tr><td><code translate="no">milvus.collection.name</code></td><td><code translate="no">hello_milvus</code></td><td>Имя коллекции Milvus для чтения или записи.</td></tr>
<tr><td><code translate="no">milvus.secure</code></td><td><code translate="no">false</code></td><td>Включает безопасные соединения TLS/SSL.</td></tr>
<tr><td><code translate="no">milvus.secure.serverName</code></td><td><code translate="no">localhost</code></td><td>Ожидаемое имя хоста для проверки TLS.</td></tr>
<tr><td><code translate="no">milvus.secure.serverPemPath</code></td><td><code translate="no">--</code></td><td>Путь к PEM-файлу сервера для TLS.</td></tr>
<tr><td><code translate="no">milvus.secure.caCert</code></td><td><code translate="no">--</code></td><td>Путь к файлу сертификата ЦС для проверки.</td></tr>
<tr><td><code translate="no">milvus.secure.clientCert</code></td><td><code translate="no">--</code></td><td>Путь к сертификату клиента для проверки подлинности.</td></tr>
<tr><td><code translate="no">milvus.secure.clientKey</code></td><td><code translate="no">--</code></td><td>Путь к закрытому ключу клиента для проверки подлинности.</td></tr>
<tr><td><code translate="no">milvus.collection.primaryKeyField</code></td><td><code translate="no">None</code></td><td>Имя поля первичного ключа в коллекции. Требуется, если коллекция не существует.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorField</code></td><td><code translate="no">None</code></td><td>Имя поля вектора в коллекции. Требуется, если коллекция не существует.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorDim</code></td><td><code translate="no">None</code></td><td>Размерность векторного поля в коллекции. Требуется, если коллекция не существует.</td></tr>
<tr><td><code translate="no">milvus.collection.autoID</code></td><td><code translate="no">false</code></td><td>Если коллекция не существует, этот параметр указывает, нужно ли автоматически генерировать идентификаторы для сущностей. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/create_collection.md">create_collection</a></td></tr>
<tr><td><code translate="no">milvus.bucket</code></td><td><code translate="no">a-bucket</code></td><td>Имя ведра в хранилище Milvus. Оно должно быть таким же, как <code translate="no">minio.bucketName</code> в <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.rootpath</code></td><td><code translate="no">files</code></td><td>Корневой путь хранилища Milvus. Он должен быть таким же, как <code translate="no">minio.rootpath</code> в <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.fs</code></td><td><code translate="no">s3a://</code></td><td>Файловая система хранилища Milvus. Значение <code translate="no">s3a://</code> применяется для Spark с открытым исходным кодом. Для Databricks используйте <code translate="no">s3://</code>.</td></tr>
<tr><td><code translate="no">milvus.storage.endpoint</code></td><td><code translate="no">localhost:9000</code></td><td>Конечная точка хранилища Milvus. Должно быть таким же, как <code translate="no">minio.address</code>:<code translate="no">minio.port</code> в <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.user</code></td><td><code translate="no">minioadmin</code></td><td>Пользователь хранилища Milvus. Это должно быть так же, как <code translate="no">minio.accessKeyID</code> в <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.password</code></td><td><code translate="no">minioadmin</code></td><td>Пароль хранилища Milvus. Пароль должен быть таким же, как <code translate="no">minio.secretAccessKey</code> в <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.useSSL</code></td><td><code translate="no">false</code></td><td>Использовать ли SSL для хранилища Milvus. Значение должно быть таким же, как <code translate="no">minio.useSSL</code> в <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
</tbody>
</table>
<h2 id="Milvus-data-format" class="common-anchor-header">Формат данных Milvus<button data-href="#Milvus-data-format" class="anchor-icon" translate="no">
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
    </button></h2><p>Spark-Milvus Connector поддерживает чтение и запись данных в следующих форматах данных Milvus:</p>
<ul>
<li><code translate="no">milvus</code>: Формат данных Milvus для плавного преобразования из Spark DataFrame в сущности Milvus.</li>
<li><code translate="no">milvusbinlog</code>: Формат данных Milvus для чтения встроенных данных бинлога Milvus.</li>
<li><code translate="no">mjson</code>: Формат Milvus JSON для массового ввода данных в Milvus.</li>
</ul>
<h3 id="milvus" class="common-anchor-header">milvus<button data-href="#milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>В разделе <a href="#Quick-start">"Быстрый старт</a>" мы используем формат <strong>milvus</strong> для записи образцов данных в кластер Milvus. Формат <strong>milvus</strong> - это новый формат данных, который поддерживает беспрепятственную запись данных Spark DataFrame в коллекции Milvus. Это достигается с помощью пакетных вызовов Insert API в Milvus SDK. Если коллекция не существует в Milvus, новая коллекция будет создана на основе схемы Dataframe. Однако автоматически созданная коллекция может не поддерживать все возможности схемы коллекции. Поэтому рекомендуется сначала создать коллекцию через SDK, а затем использовать spark-milvus для записи. Для получения дополнительной информации обратитесь к <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/InsertDemo.scala">демонстрации</a>.</p>
<h3 id="milvusbinlog" class="common-anchor-header">milvusbinlog<button data-href="#milvusbinlog" class="anchor-icon" translate="no">
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
    </button></h3><p>Новый формат данных <strong>milvusbinlog</strong> предназначен для чтения встроенных в Milvus данных binlog. Binlog - это внутренний формат хранения данных Milvus, основанный на parquet. К сожалению, он не может быть прочитан обычной библиотекой parquet, поэтому мы реализовали этот новый формат данных, чтобы помочь Spark job прочитать его. Не рекомендуется использовать <strong>milvusbinlog</strong> напрямую, если вы не знакомы с деталями внутреннего хранилища milvus. Мы предлагаем использовать функцию <a href="#MilvusUtils">MilvusUtils</a>, которая будет представлена в следующем разделе.</p>
<pre><code translate="no" class="language-scalar">val df = spark.read
  .format(&quot;milvusbinlog&quot;)
  .load(path)
  .withColumnRenamed(&quot;val&quot;, &quot;embedding&quot;)
</code></pre>
<h3 id="mjson" class="common-anchor-header">mjson<button data-href="#mjson" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus предоставляет функциональность <a href="https://milvus.io/docs/bulk_insert.md">Bulkinsert</a> для повышения производительности записи при работе с большими наборами данных. Однако формат JSON, используемый Milvus, несколько отличается от формата JSON, используемого по умолчанию в Spark. Чтобы решить эту проблему, мы ввели формат данных <strong>mjson</strong> для генерации данных, соответствующих требованиям Milvus. Вот пример, показывающий разницу между JSON-lines и <strong>mjson</strong>:</p>
<ul>
<li><p>JSON-lines:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">101</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">13</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">1.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">1.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">102</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">25</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">2.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">3.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">3.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">12</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">4.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">4.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">105</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">34</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">5.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">5.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>mjson (требуется для Milvus Bulkinsert):</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;rows&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">101</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">13</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">1.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">1.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">102</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">25</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">2.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">3.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">3.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">12</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">4.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">4.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">105</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">34</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">5.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">5.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Это будет улучшено в будущем. Мы рекомендуем использовать формат parquet в интеграции spark-milvus, если ваша версия Milvus - v2.3.7+, которая поддерживает bulkinsert с форматом Parquet. Смотрите <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/BulkInsertDemo.scala">демонстрацию</a> на Github.</p>
<h2 id="MilvusUtils" class="common-anchor-header">MilvusUtils<button data-href="#MilvusUtils" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusUtils содержит несколько полезных функций util. В настоящее время он поддерживается только в Scala. Примеры использования приведены в разделе <a href="#Advanced-Usage">Advanced Usage</a>.</p>
<h3 id="MilvusUtilsreadMilvusCollection" class="common-anchor-header">MilvusUtils.readMilvusCollection<button data-href="#MilvusUtilsreadMilvusCollection" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>MilvusUtils.readMilvusCollection</strong> - это простой интерфейс для загрузки всей коллекции Milvus в Spark Dataframe. Он включает в себя различные операции, в том числе вызов Milvus SDK, чтение <strong>milvusbinlog</strong> и общие операции объединения/соединения.</p>
<pre><code translate="no" class="language-scala">val collectionDF = MilvusUtils.readMilvusCollection(spark, milvusOptions)
</code></pre>
<h3 id="MilvusUtilsbulkInsertFromSpark" class="common-anchor-header">MilvusUtils.bulkInsertFromSpark<button data-href="#MilvusUtilsbulkInsertFromSpark" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>MilvusUtils.bulkInsertFromSpark</strong> предоставляет удобный способ импортировать выходные файлы Spark в Milvus большой партией. Он оборачивает API <strong>Bullkinsert</strong> из Milvus SDK.</p>
<pre><code translate="no" class="language-scala">df.write.format(&quot;parquet&quot;).save(outputPath)
MilvusUtils.bulkInsertFromSpark(spark, milvusOptions, outputPath, &quot;parquet&quot;)
</code></pre>
<h2 id="Advanced-Usage" class="common-anchor-header">Расширенное использование<button data-href="#Advanced-Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе вы найдете примеры расширенного использования Spark-Milvus Connector для анализа и миграции данных. Дополнительные демонстрации смотрите в <a href="https://github.com/zilliztech/spark-milvus/tree/main/examples/src/main/scala">примерах</a>.</p>
<h3 id="MySQL---embedding---Milvus" class="common-anchor-header">MySQL -&gt; встраивание -&gt; Milvus<button data-href="#MySQL---embedding---Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>В этой демонстрации мы</p>
<ol>
<li>Прочитаем данные из MySQL через Spark-MySQL Connector,</li>
<li>генерировать встраивание (на примере Word2Vec) и</li>
<li>записывать встроенные данные в Milvus.</li>
</ol>
<p>Чтобы включить Spark-MySQL Connector, вам нужно добавить следующую зависимость в ваше окружение Spark:</p>
<pre><code translate="no">spark-shell <span class="hljs-attr">--jars</span> spark-milvus-<span class="hljs-number">1.0</span>.<span class="hljs-number">0</span>-SNAPSHOT<span class="hljs-selector-class">.jar</span>,mysql-connector-j-<span class="hljs-attribute">x</span><span class="hljs-selector-class">.x</span><span class="hljs-selector-class">.x</span><span class="hljs-selector-class">.jar</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-scala">import org.apache.spark.ml.feature.{Tokenizer, Word2Vec}
import org.apache.spark.sql.functions.udf
import org.apache.spark.sql.{SaveMode, SparkSession}
import zilliztech.spark.milvus.MilvusOptions._

import org.apache.spark.ml.linalg.Vector

object Mysql2MilvusDemo  extends App {

  val spark = SparkSession.builder().master(&quot;local[*]&quot;)
    .appName(&quot;Mysql2MilvusDemo&quot;)
    .getOrCreate()

  import spark.implicits._

  // Create DataFrame
  val sampleDF = Seq(
    (1, &quot;Milvus was created in 2019 with a singular goal: store, index, and manage massive embedding vectors generated by deep neural networks and other machine learning (ML) models.&quot;),
    (2, &quot;As a database specifically designed to handle queries over input vectors, it is capable of indexing vectors on a trillion scale. &quot;),
    (3, &quot;Unlike existing relational databases which mainly deal with structured data following a pre-defined pattern, Milvus is designed from the bottom-up to handle embedding vectors converted from unstructured data.&quot;),
    (4, &quot;As the Internet grew and evolved, unstructured data became more and more common, including emails, papers, IoT sensor data, Facebook photos, protein structures, and much more.&quot;)
  ).toDF(&quot;id&quot;, &quot;text&quot;)

  // Write to MySQL Table
  sampleDF.write
    .mode(SaveMode.Append)
    .format(&quot;jdbc&quot;)
    .option(&quot;driver&quot;,&quot;com.mysql.cj.jdbc.Driver&quot;)
    .option(&quot;url&quot;, &quot;jdbc:mysql://localhost:3306/test&quot;)
    .option(&quot;dbtable&quot;, &quot;demo&quot;)
    .option(&quot;user&quot;, &quot;root&quot;)
    .option(&quot;password&quot;, &quot;123456&quot;)
    .save()

  // Read from MySQL Table
  val dfMysql = spark.read
    .format(&quot;jdbc&quot;)
    .option(&quot;driver&quot;,&quot;com.mysql.cj.jdbc.Driver&quot;)
    .option(&quot;url&quot;, &quot;jdbc:mysql://localhost:3306/test&quot;)
    .option(&quot;dbtable&quot;, &quot;demo&quot;)
    .option(&quot;user&quot;, &quot;root&quot;)
    .option(&quot;password&quot;, &quot;123456&quot;)
    .load()

  val tokenizer = new Tokenizer().setInputCol(&quot;text&quot;).setOutputCol(&quot;tokens&quot;)
  val tokenizedDf = tokenizer.transform(dfMysql)

  // Learn a mapping from words to Vectors.
  val word2Vec = new Word2Vec()
    .setInputCol(&quot;tokens&quot;)
    .setOutputCol(&quot;vectors&quot;)
    .setVectorSize(128)
    .setMinCount(0)
  val model = word2Vec.fit(tokenizedDf)

  val result = model.transform(tokenizedDf)

  val vectorToArrayUDF = udf((v: Vector) =&gt; v.toArray)
  // Apply the UDF to the DataFrame
  val resultDF = result.withColumn(&quot;embedding&quot;, vectorToArrayUDF($&quot;vectors&quot;))
  val milvusDf = resultDF.drop(&quot;tokens&quot;).drop(&quot;vectors&quot;)

  milvusDf.write.format(&quot;milvus&quot;)
    .option(MILVUS_HOST, &quot;localhost&quot;)
    .option(MILVUS_PORT, &quot;19530&quot;)
    .option(MILVUS_COLLECTION_NAME, &quot;text_embedding&quot;)
    .option(MILVUS_COLLECTION_VECTOR_FIELD, &quot;embedding&quot;)
    .option(MILVUS_COLLECTION_VECTOR_DIM, &quot;128&quot;)
    .option(MILVUS_COLLECTION_PRIMARY_KEY, &quot;id&quot;)
    .mode(SaveMode.Append)
    .save()
}
</code></pre>
<h3 id="Milvus---Transform---Milvus" class="common-anchor-header">Milvus -&gt; Transform -&gt; Milvus<button data-href="#Milvus---Transform---Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>В этом демонстрационном примере мы</p>
<ol>
<li>Считывать данные из коллекции Milvus,</li>
<li>Применим трансформацию (на примере PCA) и</li>
<li>запишем преобразованные данные в другой Milvus с помощью Bulkinsert API.</li>
</ol>
<div class="alert notes">
<p>Модель PCA - это модель трансформации, которая уменьшает размерность векторов вложения, что является распространенной операцией в машинном обучении. Вы можете добавить любые другие операции обработки, такие как фильтрация, объединение или нормализация, к шагу трансформации.</p>
</div>
<pre><code translate="no" class="language-scala">import org.apache.spark.ml.feature.PCA
import org.apache.spark.ml.linalg.{Vector, Vectors}
import org.apache.spark.SparkConf
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions.udf
import org.apache.spark.sql.util.CaseInsensitiveStringMap
import zilliztech.spark.milvus.{MilvusOptions, MilvusUtils}

import scala.collection.JavaConverters._

object TransformDemo extends App {
  val sparkConf = new SparkConf().setMaster(&quot;local&quot;)
  val spark = SparkSession.builder().config(sparkConf).getOrCreate()

  import spark.implicits._

  val host = &quot;localhost&quot;
  val port = 19530
  val user = &quot;root&quot;
  val password = &quot;Milvus&quot;
  val fs = &quot;s3a://&quot;
  val bucketName = &quot;a-bucket&quot;
  val rootPath = &quot;files&quot;
  val minioAK = &quot;minioadmin&quot;
  val minioSK = &quot;minioadmin&quot;
  val minioEndpoint = &quot;localhost:9000&quot;
  val collectionName = &quot;hello_spark_milvus1&quot;
  val targetCollectionName = &quot;hello_spark_milvus2&quot;

  val properties = Map(
    MilvusOptions.MILVUS_HOST -&gt; host,
    MilvusOptions.MILVUS_PORT -&gt; port.toString,
    MilvusOptions.MILVUS_COLLECTION_NAME -&gt; collectionName,
    MilvusOptions.MILVUS_BUCKET -&gt; bucketName,
    MilvusOptions.MILVUS_ROOTPATH -&gt; rootPath,
    MilvusOptions.MILVUS_FS -&gt; fs,
    MilvusOptions.MILVUS_STORAGE_ENDPOINT -&gt; minioEndpoint,
    MilvusOptions.MILVUS_STORAGE_USER -&gt; minioAK,
    MilvusOptions.MILVUS_STORAGE_PASSWORD -&gt; minioSK,
  )

  // 1, configurations
  val milvusOptions = new MilvusOptions(new CaseInsensitiveStringMap(properties.asJava))

  // 2, batch read milvus collection data to dataframe
  //  Schema: dim of `embeddings` is 8
  // +-+------------+------------+------------------+
  // | | field name | field type | other attributes |
  // +-+------------+------------+------------------+
  // |1|    &quot;pk&quot;    |    Int64   |  is_primary=True |
  // | |            |            |   auto_id=False  |
  // +-+------------+------------+------------------+
  // |2|  &quot;random&quot;  |    Double  |                  |
  // +-+------------+------------+------------------+
  // |3|&quot;embeddings&quot;| FloatVector|     dim=8        |
  // +-+------------+------------+------------------+
  val arrayToVectorUDF = udf((arr: Seq[Double]) =&gt; Vectors.dense(arr.toArray[Double]))
  val collectionDF = MilvusUtils.readMilvusCollection(spark, milvusOptions)
    .withColumn(&quot;embeddings_vec&quot;, arrayToVectorUDF($&quot;embeddings&quot;))
    .drop(&quot;embeddings&quot;)
  
  // 3. Use PCA to reduce dim of vector
  val dim = 4
  val pca = new PCA()
    .setInputCol(&quot;embeddings_vec&quot;)
    .setOutputCol(&quot;pca_vec&quot;)
    .setK(dim)
    .fit(collectionDF)
  val vectorToArrayUDF = udf((v: Vector) =&gt; v.toArray)
  // embeddings dim number reduce to 4
  // +-+------------+------------+------------------+
  // | | field name | field type | other attributes |
  // +-+------------+------------+------------------+
  // |1|    &quot;pk&quot;    |    Int64   |  is_primary=True |
  // | |            |            |   auto_id=False  |
  // +-+------------+------------+------------------+
  // |2|  &quot;random&quot;  |    Double  |                  |
  // +-+------------+------------+------------------+
  // |3|&quot;embeddings&quot;| FloatVector|     dim=4        |
  // +-+------------+------------+------------------+
  val pcaDf = pca.transform(collectionDF)
    .withColumn(&quot;embeddings&quot;, vectorToArrayUDF($&quot;pca_vec&quot;))
    .select(&quot;pk&quot;, &quot;random&quot;, &quot;embeddings&quot;)

  // 4. Write PCAed data to S3
  val outputPath = &quot;s3a://a-bucket/result&quot;
  pcaDf.write
    .mode(&quot;overwrite&quot;)
    .format(&quot;parquet&quot;)
    .save(outputPath)

  // 5. Config MilvusOptions of target table  
  val targetProperties = Map(
    MilvusOptions.MILVUS_HOST -&gt; host,
    MilvusOptions.MILVUS_PORT -&gt; port.toString,
    MilvusOptions.MILVUS_COLLECTION_NAME -&gt; targetCollectionName,
    MilvusOptions.MILVUS_BUCKET -&gt; bucketName,
    MilvusOptions.MILVUS_ROOTPATH -&gt; rootPath,
    MilvusOptions.MILVUS_FS -&gt; fs,
    MilvusOptions.MILVUS_STORAGE_ENDPOINT -&gt; minioEndpoint,
    MilvusOptions.MILVUS_STORAGE_USER -&gt; minioAK,
    MilvusOptions.MILVUS_STORAGE_PASSWORD -&gt; minioSK,
  )
  val targetMilvusOptions = new MilvusOptions(new CaseInsensitiveStringMap(targetProperties.asJava))
  
  // 6. Bulkinsert Spark output files into milvus
  MilvusUtils.bulkInsertFromSpark(spark, targetMilvusOptions, outputPath, &quot;parquet&quot;)
}
</code></pre>
<h3 id="Databricks---Zilliz-Cloud" class="common-anchor-header">Databricks -&gt; Zilliz Cloud<button data-href="#Databricks---Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h3><p>Если вы используете Zilliz Cloud (управляемый сервис Milvus), вы можете воспользоваться его удобным API импорта данных. Zilliz Cloud предоставляет исчерпывающие инструменты и документацию, чтобы помочь вам эффективно перемещать данные из различных источников данных, включая Spark и Databricks. Просто настройте ведро S3 в качестве посредника и откройте к нему доступ в своей учетной записи Zilliz Cloud. API импорта данных Zilliz Cloud автоматически загрузит всю партию данных из ведра S3 в ваш кластер Zilliz Cloud.</p>
<p><strong>Подготовительные работы</strong></p>
<ol>
<li><p>Загрузите среду выполнения Spark, добавив jar-файл в кластер Databricks.</p>
<p>Библиотеку можно установить разными способами. На этом скриншоте показана загрузка jar-файла из локальной сети в кластер. Дополнительные сведения см. в разделе <a href="https://docs.databricks.com/en/libraries/cluster-libraries.html">Кластерные библиотеки</a> в документации Databricks.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/install-databricks-library.png" alt="Install Databricks Library" class="doc-image" id="install-databricks-library" />
   </span> <span class="img-wrapper"> <span>Установка библиотеки Databricks</span> </span></p></li>
<li><p>Создайте ведро S3 и настройте его как внешнее хранилище для кластера Databricks.</p>
<p>Для Bulkinsert требуется хранить данные во временном ведре, чтобы Zilliz Cloud мог импортировать их в пакетном режиме. Вы можете создать ведро S3 и настроить его как внешнее хранилище Databricks. Подробности см. в разделе <a href="https://docs.databricks.com/en/sql/language-manual/sql-ref-external-locations.html">Внешние местоположения</a>.</p></li>
<li><p>Защитите учетные данные Databricks.</p>
<p>Для получения более подробной информации см. инструкции в блоге <a href="https://www.databricks.com/blog/2018/06/04/securely-managing-credentials-in-databricks.html">Securely Managing Credentials in Databricks</a>.</p></li>
</ol>
<p><strong>Демонстрация</strong></p>
<p>Вот фрагмент кода, демонстрирующий процесс пакетной миграции данных. Аналогично приведенному выше примеру Milvus, вам просто нужно заменить учетные данные и адрес ведра S3.</p>
<pre><code translate="no" class="language-scala">// Write the data in batch into the Milvus bucket storage.
val outputPath = &quot;s3://my-temp-bucket/result&quot;
df.write
  .mode(&quot;overwrite&quot;)
  .format(&quot;mjson&quot;)
  .save(outputPath)
// Specify Milvus options.
val targetProperties = Map(
  MilvusOptions.MILVUS_URI -&gt; zilliz_uri,
  MilvusOptions.MILVUS_TOKEN -&gt; zilliz_token,
  MilvusOptions.MILVUS_COLLECTION_NAME -&gt; targetCollectionName,
  MilvusOptions.MILVUS_BUCKET -&gt; bucketName,
  MilvusOptions.MILVUS_ROOTPATH -&gt; rootPath,
  MilvusOptions.MILVUS_FS -&gt; fs,
  MilvusOptions.MILVUS_STORAGE_ENDPOINT -&gt; minioEndpoint,
  MilvusOptions.MILVUS_STORAGE_USER -&gt; minioAK,
  MilvusOptions.MILVUS_STORAGE_PASSWORD -&gt; minioSK,
)
val targetMilvusOptions = new MilvusOptions(new CaseInsensitiveStringMap(targetProperties.asJava))
  
// Bulk insert Spark output files into Milvus
MilvusUtils.bulkInsertFromSpark(spark, targetMilvusOptions, outputPath, &quot;mjson&quot;)
</code></pre>
<h2 id="Hands-on-Notebook" class="common-anchor-header">Практический блокнот<button data-href="#Hands-on-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы быстро освоить коннектор Spark-Milvus Connector, вы можете просмотреть блокнот, в котором рассмотрены примеры потокового и пакетного переноса данных из Spark в Milvus и Zilliz Cloud.</p>
<ul>
<li><a href="https://zilliz.com/databricks_zilliz_demos">Практическая работа с коннектором Spark-Milvus</a></li>
</ul>
