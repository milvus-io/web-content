---
id: integrate_with_spark.md
summary: Diese Seite befasst sich mit dem Spark-Milvus-Anschluss.
title: Spark-Milvus Connector Benutzerhandbuch
---
<h1 id="Spark-Milvus-Connector-User-Guide" class="common-anchor-header">Spark-Milvus Connector Benutzerhandbuch<button data-href="#Spark-Milvus-Connector-User-Guide" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Spark-Milvus Connector (https://github.com/zilliztech/spark-milvus) bietet eine nahtlose Integration zwischen Apache Spark und Milvus, indem er die Datenverarbeitungs- und ML-Funktionen von Apache Spark mit den Vektordaten-Speicher- und Suchfunktionen von Milvus kombiniert. Diese Integration ermöglicht verschiedene interessante Anwendungen, darunter:</p>
<ul>
<li>Effizientes Laden von Vektordaten in Milvus in großen Stapeln,</li>
<li>Verschieben von Daten zwischen Milvus und anderen Speichersystemen oder Datenbanken,</li>
<li>Analyse der Daten in Milvus durch Nutzung der Spark MLlib und anderer KI-Tools.</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">Schnellstart<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Preparation" class="common-anchor-header">Vorbereitung</h3><p>Der Spark-Milvus Connector unterstützt die Programmiersprachen Scala und Python. Benutzer können ihn mit <strong>Pyspark</strong> oder <strong>Spark-shell</strong> verwenden. Um diese Demo auszuführen, richten Sie eine Spark-Umgebung ein, die die Spark-Milvus Connector-Abhängigkeit in den folgenden Schritten enthält:</p>
<ol>
<li><p>Installieren Sie Apache Spark (Version &gt;= 3.3.0)</p>
<p>Sie können Apache Spark installieren, indem Sie die <a href="https://spark.apache.org/docs/latest/">offizielle Dokumentation</a> zu Rate ziehen.</p></li>
<li><p>Laden Sie die <strong>spark-milvus</strong> jar-Datei herunter.</p>
<pre><code translate="no">wget https://github.com/zilliztech/spark-milvus/raw/1.0.0-SNAPSHOT/output/spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Starten Sie die Spark-Laufzeitumgebung mit <strong>spark-milvus</strong> jar als eine der Abhängigkeiten.</p>
<p>Um die Spark-Laufzeit mit dem Spark-Milvus-Konnektor zu starten, fügen Sie das heruntergeladene <strong>spark-milvus</strong> als Abhängigkeit zum Befehl hinzu.</p>
<ul>
<li><p><strong>pyspark</strong></p>
<pre><code translate="no">./<span class="hljs-built_in">bin</span>/pyspark --jars spark-milvus-<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>spark-shell</strong></p>
<pre><code translate="no">./<span class="hljs-built_in">bin</span>/spark-shell --jars spark-milvus-<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ol>
<h3 id="Demo" class="common-anchor-header">Demo</h3><p>In dieser Demo wird ein Spark DataFrame mit Vektordaten erstellt und über den Spark-Milvus-Connector nach Milvus geschrieben. Eine Sammlung wird in Milvus automatisch auf der Grundlage des Schemas und der angegebenen Optionen erstellt.</p>
<div class="multipleCode">
 <a href="#scala">Python-Scala</a></div>
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
<pre><code translate="no" class="language-scala"><span class="hljs-keyword">import</span> org.apache.spark.sql.{SaveMode, SparkSession}

object Hello <span class="hljs-keyword">extends</span> <span class="hljs-title class_">App</span> {

  <span class="hljs-type">val</span> <span class="hljs-variable">spark</span> <span class="hljs-operator">=</span> SparkSession.builder().master(<span class="hljs-string">&quot;local[*]&quot;</span>)
    .appName(<span class="hljs-string">&quot;HelloSparkMilvus&quot;</span>)
    .getOrCreate()

  <span class="hljs-keyword">import</span> spark.implicits._

  <span class="hljs-comment">// Create DataFrame</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">sampleDF</span> <span class="hljs-operator">=</span> Seq(
    (<span class="hljs-number">1</span>, <span class="hljs-string">&quot;a&quot;</span>, Seq(<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>)),
    (<span class="hljs-number">2</span>, <span class="hljs-string">&quot;b&quot;</span>, Seq(<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>)),
    (<span class="hljs-number">3</span>, <span class="hljs-string">&quot;c&quot;</span>, Seq(<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>)),
    (<span class="hljs-number">4</span>, <span class="hljs-string">&quot;d&quot;</span>, Seq(<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>))
  ).toDF(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>)

  <span class="hljs-comment">// set milvus options</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">milvusOptions</span> <span class="hljs-operator">=</span> Map(
      <span class="hljs-string">&quot;milvus.host&quot;</span> -&gt; <span class="hljs-string">&quot;localhost&quot;</span> -&gt; uri,
      <span class="hljs-string">&quot;milvus.port&quot;</span> -&gt; <span class="hljs-string">&quot;19530&quot;</span>,
      <span class="hljs-string">&quot;milvus.collection.name&quot;</span> -&gt; <span class="hljs-string">&quot;hello_spark_milvus&quot;</span>,
      <span class="hljs-string">&quot;milvus.collection.vectorField&quot;</span> -&gt; <span class="hljs-string">&quot;vec&quot;</span>,
      <span class="hljs-string">&quot;milvus.collection.vectorDim&quot;</span> -&gt; <span class="hljs-string">&quot;5&quot;</span>,
      <span class="hljs-string">&quot;milvus.collection.primaryKeyField&quot;</span>, <span class="hljs-string">&quot;id&quot;</span>
    )
    
  sampleDF.write.format(<span class="hljs-string">&quot;milvus&quot;</span>)
    .options(milvusOptions)
    .mode(SaveMode.Append)
    .save()
}
<button class="copy-code-btn"></button></code></pre>
<p>Nach der Ausführung des obigen Codes können Sie die eingefügten Daten in Milvus mithilfe von SDK oder Attu (einem Milvus-Dashboard) anzeigen. Sie können eine Sammlung mit dem Namen <code translate="no">hello_spark_milvus</code> finden, in der bereits 4 Entitäten eingefügt wurden.</p>
<h2 id="Features--concepts" class="common-anchor-header">Merkmale und Konzepte<button data-href="#Features--concepts" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-options" class="common-anchor-header">Milvus-Optionen</h3><p>Im Abschnitt <a href="#Quick-start">Schnellstart</a> haben wir gezeigt, wie man Optionen während der Arbeit mit Milvus einstellen kann. Diese Optionen werden als Milvus Optionen abstrahiert. Sie werden verwendet, um Verbindungen zu Milvus herzustellen und andere Verhaltensweisen von Milvus zu steuern. Nicht alle der Optionen sind obligatorisch.</p>
<table>
<thead>
<tr><th>Option Schlüssel</th><th>Standardwert</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.host</code></td><td><code translate="no">localhost</code></td><td>Milvus-Server-Host. Siehe <a href="https://milvus.io/docs/manage_connection.md">Verwalten von Milvus-Verbindungen</a> für Details.</td></tr>
<tr><td><code translate="no">milvus.port</code></td><td><code translate="no">19530</code></td><td>Anschluss des Milvus-Servers. Siehe <a href="https://milvus.io/docs/manage_connection.md">Milvus-Verbindungen verwalten</a> für weitere Details.</td></tr>
<tr><td><code translate="no">milvus.username</code></td><td><code translate="no">root</code></td><td>Benutzername für Milvus Server. Siehe <a href="https://milvus.io/docs/manage_connection.md">Milvus-Verbindungen verwalten</a> für weitere Details.</td></tr>
<tr><td><code translate="no">milvus.password</code></td><td><code translate="no">Milvus</code></td><td>Passwort für den Milvus-Server. Siehe <a href="https://milvus.io/docs/manage_connection.md">Milvus-Verbindungen verwalten</a> für weitere Details.</td></tr>
<tr><td><code translate="no">milvus.uri</code></td><td><code translate="no">--</code></td><td>Milvus-Server-URI. Siehe <a href="https://milvus.io/docs/manage_connection.md">Milvus-Verbindungen verwalten</a> für weitere Details.</td></tr>
<tr><td><code translate="no">milvus.token</code></td><td><code translate="no">--</code></td><td>Milvus-Server-Token. Siehe <a href="https://milvus.io/docs/manage_connection.md">Manage Milvus Connections</a> für weitere Details.</td></tr>
<tr><td><code translate="no">milvus.database.name</code></td><td><code translate="no">default</code></td><td>Name der Milvus-Datenbank, die gelesen oder geschrieben werden soll.</td></tr>
<tr><td><code translate="no">milvus.collection.name</code></td><td><code translate="no">hello_milvus</code></td><td>Name der zu lesenden oder zu schreibenden Milvus-Sammlung.</td></tr>
<tr><td><code translate="no">milvus.collection.primaryKeyField</code></td><td><code translate="no">None</code></td><td>Name des Primärschlüsselfeldes in der Sammlung. Erforderlich, wenn die Sammlung nicht vorhanden ist.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorField</code></td><td><code translate="no">None</code></td><td>Name des Vektorfelds in der Sammlung. Erforderlich, wenn die Sammlung nicht vorhanden ist.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorDim</code></td><td><code translate="no">None</code></td><td>Dimension des Vektorfelds in der Auflistung. Erforderlich, wenn die Sammlung nicht vorhanden ist.</td></tr>
<tr><td><code translate="no">milvus.collection.autoID</code></td><td><code translate="no">false</code></td><td>Wenn die Sammlung nicht existiert, gibt diese Option an, ob automatisch IDs für die Entitäten generiert werden sollen. Für weitere Informationen, siehe <a href="https://milvus.io/docs/create_collection.md">create_collection</a></td></tr>
<tr><td><code translate="no">milvus.bucket</code></td><td><code translate="no">a-bucket</code></td><td>Bucket-Name im Milvus-Speicher. Dieser sollte derselbe sein wie <code translate="no">minio.bucketName</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.rootpath</code></td><td><code translate="no">files</code></td><td>Root-Pfad des Milvus-Speichers. Dies sollte derselbe sein wie <code translate="no">minio.rootpath</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.fs</code></td><td><code translate="no">s3a://</code></td><td>Dateisystem des Milvus-Speichers. Der Wert <code translate="no">s3a://</code> gilt für Open-Source-Spark. Verwenden Sie <code translate="no">s3://</code> für Databricks.</td></tr>
<tr><td><code translate="no">milvus.storage.endpoint</code></td><td><code translate="no">localhost:9000</code></td><td>Endpunkt des Milvus-Speichers. Dies sollte derselbe sein wie <code translate="no">minio.address</code>:<code translate="no">minio.port</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.user</code></td><td><code translate="no">minioadmin</code></td><td>Benutzer des Milvus-Speichers. Dies sollte dasselbe sein wie <code translate="no">minio.accessKeyID</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.password</code></td><td><code translate="no">minioadmin</code></td><td>Passwort für den Milvus-Speicher. Dies sollte dasselbe sein wie <code translate="no">minio.secretAccessKey</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.useSSL</code></td><td><code translate="no">false</code></td><td>Ob SSL für den Milvus-Speicher verwendet werden soll. Dies sollte dasselbe sein wie <code translate="no">minio.useSSL</code> in <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
</tbody>
</table>
<h2 id="Milvus-data-format" class="common-anchor-header">Milvus-Datenformat<button data-href="#Milvus-data-format" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Spark-Milvus Connector unterstützt das Lesen und Schreiben von Daten in den folgenden Milvus-Datenformaten:</p>
<ul>
<li><code translate="no">milvus</code>: Milvus-Datenformat für die nahtlose Konvertierung von Spark DataFrame in Milvus-Entitäten.</li>
<li><code translate="no">milvusbinlog</code>: Milvus-Datenformat für das Lesen der in Milvus eingebauten Binlog-Daten.</li>
<li><code translate="no">mjson</code>: Milvus JSON-Format für das Einfügen von Daten in Milvus.</li>
</ul>
<h3 id="milvus" class="common-anchor-header">milvus</h3><p>Im <a href="#Quick-start">Schnellstart</a> verwenden wir das <strong>Milvus-Format</strong>, um Beispieldaten in einen Milvus-Cluster zu schreiben. Das <strong>milvus-Format</strong> ist ein neues Datenformat, das das nahtlose Schreiben von Spark DataFrame-Daten in Milvus-Sammlungen unterstützt. Dies wird durch Batch-Aufrufe an die Insert-API des Milvus SDK erreicht. Wenn eine Sammlung in Milvus nicht vorhanden ist, wird eine neue Sammlung auf der Grundlage des Schemas des DataFrames erstellt. Allerdings unterstützt die automatisch erstellte Sammlung möglicherweise nicht alle Funktionen des Sammlungsschemas. Es wird daher empfohlen, zunächst eine Sammlung über das SDK zu erstellen und dann spark-milvus zum Schreiben zu verwenden. Weitere Informationen entnehmen Sie bitte der <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/InsertDemo.scala">Demo</a>.</p>
<h3 id="milvusbinlog" class="common-anchor-header">milvusbinlog</h3><p>Das neue Datenformat <strong>milvusbinlog</strong> dient zum Lesen der in Milvus integrierten binlog-Daten. Binlog ist das interne Datenspeicherformat von Milvus, das auf Parquet basiert. Leider kann es nicht von einer normalen Parquet-Bibliothek gelesen werden, daher haben wir dieses neue Datenformat implementiert, um Spark-Jobs beim Lesen zu helfen. Es wird nicht empfohlen, <strong>milvusbinlog</strong> direkt zu verwenden, es sei denn, Sie sind mit den Details der internen Speicherung von Milvus vertraut. Wir empfehlen die Verwendung der <a href="#MilvusUtils">MilvusUtils-Funktion</a>, die im nächsten Abschnitt vorgestellt wird.</p>
<pre><code translate="no" class="language-scalar">val df = spark.read
  .<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;milvusbinlog&quot;</span>)
  .load(path)
  .withColumnRenamed(<span class="hljs-string">&quot;val&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="mjson" class="common-anchor-header">mjson</h3><p>Milvus bietet die <a href="https://milvus.io/docs/bulk_insert.md">Bulkinsert-Funktionalität</a> für eine bessere Schreibleistung bei der Arbeit mit großen Datensätzen. Das von Milvus verwendete JSON-Format unterscheidet sich jedoch geringfügig vom Standard-JSON-Ausgabeformat von Spark. Um dieses Problem zu lösen, führen wir das <strong>mjson-Datenformat</strong> ein, um Daten zu generieren, die den Anforderungen von Milvus entsprechen. Hier ist ein Beispiel, das den Unterschied zwischen JSON-lines und <strong>mjson</strong> zeigt:</p>
<ul>
<li><p>JSON-lines:</p>
<pre><code translate="no" class="language-json">{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">101</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">1.1</span>, <span class="hljs-number">1.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">102</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">2.1</span>, <span class="hljs-number">2.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">3.1</span>, <span class="hljs-number">3.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">104</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">4.1</span>, <span class="hljs-number">4.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">105</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">34</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">5.1</span>, <span class="hljs-number">5.2</span>]}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>mjson (erforderlich für Milvus Bulkinsert):</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;rows&quot;</span>:[
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">101</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">1.1</span>, <span class="hljs-number">1.2</span>]},
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">102</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">2.1</span>, <span class="hljs-number">2.2</span>]},
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">3.1</span>, <span class="hljs-number">3.2</span>]},
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">104</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">4.1</span>, <span class="hljs-number">4.2</span>]},
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">105</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">34</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">5.1</span>, <span class="hljs-number">5.2</span>]}
    ]
}
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Dies wird in Zukunft verbessert werden. Wir empfehlen die Verwendung des Parquet-Formats in der spark-milvus-Integration, wenn Ihre Milvus-Version v2.3.7+ ist, die Bulkinsert mit Parquet-Format unterstützt. Siehe <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/BulkInsertDemo.scala">Demo</a> auf Github.</p>
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
    </button></h2><p>MilvusUtils enthält mehrere nützliche util-Funktionen. Derzeit wird es nur in Scala unterstützt. Weitere Anwendungsbeispiele finden Sie im Abschnitt <a href="#Advanced-Usage">Erweiterte Verwendung</a>.</p>
<h3 id="MilvusUtilsreadMilvusCollection" class="common-anchor-header">MilvusUtils.readMilvusCollection</h3><p><strong>MilvusUtils.readMilvusCollection</strong> ist eine einfache Schnittstelle zum Laden einer ganzen Milvus-Sammlung in einen Spark-Datenframe. Sie verpackt verschiedene Operationen, einschließlich des Aufrufs von Milvus SDK, des Lesens von <strong>Milvusbinlog</strong> und allgemeiner Union/Join-Operationen.</p>
<pre><code translate="no" class="language-scala"><span class="hljs-type">val</span> <span class="hljs-variable">collectionDF</span> <span class="hljs-operator">=</span> MilvusUtils.readMilvusCollection(spark, milvusOptions)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MilvusUtilsbulkInsertFromSpark" class="common-anchor-header">MilvusUtils.bulkInsertFromSpark</h3><p><strong>MilvusUtils.bulkInsertFromSpark</strong> bietet eine bequeme Möglichkeit, Spark-Ausgabedateien in einem großen Stapel in Milvus zu importieren. Es umhüllt die <strong>Bullkinsert-API</strong> des Milvus-SDK.</p>
<pre><code translate="no" class="language-scala">df.write.<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;parquet&quot;</span>).save(outputPath)
MilvusUtils.bulkInsertFromSpark(spark, milvusOptions, outputPath, <span class="hljs-string">&quot;parquet&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Advanced-Usage" class="common-anchor-header">Erweiterte Verwendung<button data-href="#Advanced-Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Abschnitt finden Sie Beispiele für die erweiterte Nutzung des Spark-Milvus-Connectors für die Datenanalyse und -migration. Für weitere Demos siehe <a href="https://github.com/zilliztech/spark-milvus/tree/main/examples/src/main/scala">Beispiele</a>.</p>
<h3 id="MySQL---embedding---Milvus" class="common-anchor-header">MySQL -&gt; Einbettung -&gt; Milvus</h3><p>In dieser Demo werden wir</p>
<ol>
<li>Lesen von Daten aus MySQL über den Spark-MySQL-Connector,</li>
<li>Einbettung generieren (mit Word2Vec als Beispiel) und</li>
<li>eingebettete Daten in Milvus schreiben.</li>
</ol>
<p>Um den Spark-MySQL-Connector zu aktivieren, müssen Sie die folgende Abhängigkeit zu Ihrer Spark-Umgebung hinzufügen:</p>
<pre><code translate="no">spark-shell --jars spark-milvus-1.0.0-SNAPSHOT.jar,mysql-connector-j-x.x.x.jar
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-scala"><span class="hljs-keyword">import</span> org.apache.spark.ml.feature.{Tokenizer, Word2Vec}
<span class="hljs-keyword">import</span> org.apache.spark.sql.functions.udf
<span class="hljs-keyword">import</span> org.apache.spark.sql.{SaveMode, SparkSession}
<span class="hljs-keyword">import</span> zilliztech.spark.milvus.MilvusOptions._

<span class="hljs-keyword">import</span> org.apache.spark.ml.linalg.Vector

object Mysql2MilvusDemo  <span class="hljs-keyword">extends</span> <span class="hljs-title class_">App</span> {

  <span class="hljs-type">val</span> <span class="hljs-variable">spark</span> <span class="hljs-operator">=</span> SparkSession.builder().master(<span class="hljs-string">&quot;local[*]&quot;</span>)
    .appName(<span class="hljs-string">&quot;Mysql2MilvusDemo&quot;</span>)
    .getOrCreate()

  <span class="hljs-keyword">import</span> spark.implicits._

  <span class="hljs-comment">// Create DataFrame</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">sampleDF</span> <span class="hljs-operator">=</span> Seq(
    (<span class="hljs-number">1</span>, <span class="hljs-string">&quot;Milvus was created in 2019 with a singular goal: store, index, and manage massive embedding vectors generated by deep neural networks and other machine learning (ML) models.&quot;</span>),
    (<span class="hljs-number">2</span>, <span class="hljs-string">&quot;As a database specifically designed to handle queries over input vectors, it is capable of indexing vectors on a trillion scale. &quot;</span>),
    (<span class="hljs-number">3</span>, <span class="hljs-string">&quot;Unlike existing relational databases which mainly deal with structured data following a pre-defined pattern, Milvus is designed from the bottom-up to handle embedding vectors converted from unstructured data.&quot;</span>),
    (<span class="hljs-number">4</span>, <span class="hljs-string">&quot;As the Internet grew and evolved, unstructured data became more and more common, including emails, papers, IoT sensor data, Facebook photos, protein structures, and much more.&quot;</span>)
  ).toDF(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>)

  <span class="hljs-comment">// Write to MySQL Table</span>
  sampleDF.write
    .mode(SaveMode.Append)
    .format(<span class="hljs-string">&quot;jdbc&quot;</span>)
    .option(<span class="hljs-string">&quot;driver&quot;</span>,<span class="hljs-string">&quot;com.mysql.cj.jdbc.Driver&quot;</span>)
    .option(<span class="hljs-string">&quot;url&quot;</span>, <span class="hljs-string">&quot;jdbc:mysql://localhost:3306/test&quot;</span>)
    .option(<span class="hljs-string">&quot;dbtable&quot;</span>, <span class="hljs-string">&quot;demo&quot;</span>)
    .option(<span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;root&quot;</span>)
    .option(<span class="hljs-string">&quot;password&quot;</span>, <span class="hljs-string">&quot;123456&quot;</span>)
    .save()

  <span class="hljs-comment">// Read from MySQL Table</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">dfMysql</span> <span class="hljs-operator">=</span> spark.read
    .format(<span class="hljs-string">&quot;jdbc&quot;</span>)
    .option(<span class="hljs-string">&quot;driver&quot;</span>,<span class="hljs-string">&quot;com.mysql.cj.jdbc.Driver&quot;</span>)
    .option(<span class="hljs-string">&quot;url&quot;</span>, <span class="hljs-string">&quot;jdbc:mysql://localhost:3306/test&quot;</span>)
    .option(<span class="hljs-string">&quot;dbtable&quot;</span>, <span class="hljs-string">&quot;demo&quot;</span>)
    .option(<span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;root&quot;</span>)
    .option(<span class="hljs-string">&quot;password&quot;</span>, <span class="hljs-string">&quot;123456&quot;</span>)
    .load()

  <span class="hljs-type">val</span> <span class="hljs-variable">tokenizer</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Tokenizer</span>().setInputCol(<span class="hljs-string">&quot;text&quot;</span>).setOutputCol(<span class="hljs-string">&quot;tokens&quot;</span>)
  <span class="hljs-type">val</span> <span class="hljs-variable">tokenizedDf</span> <span class="hljs-operator">=</span> tokenizer.transform(dfMysql)

  <span class="hljs-comment">// Learn a mapping from words to Vectors.</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">word2Vec</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Word2Vec</span>()
    .setInputCol(<span class="hljs-string">&quot;tokens&quot;</span>)
    .setOutputCol(<span class="hljs-string">&quot;vectors&quot;</span>)
    .setVectorSize(<span class="hljs-number">128</span>)
    .setMinCount(<span class="hljs-number">0</span>)
  <span class="hljs-type">val</span> <span class="hljs-variable">model</span> <span class="hljs-operator">=</span> word2Vec.fit(tokenizedDf)

  <span class="hljs-type">val</span> <span class="hljs-variable">result</span> <span class="hljs-operator">=</span> model.transform(tokenizedDf)

  <span class="hljs-type">val</span> <span class="hljs-variable">vectorToArrayUDF</span> <span class="hljs-operator">=</span> udf((v: Vector) =&gt; v.toArray)
  <span class="hljs-comment">// Apply the UDF to the DataFrame</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">resultDF</span> <span class="hljs-operator">=</span> result.withColumn(<span class="hljs-string">&quot;embedding&quot;</span>, vectorToArrayUDF($<span class="hljs-string">&quot;vectors&quot;</span>))
  <span class="hljs-type">val</span> <span class="hljs-variable">milvusDf</span> <span class="hljs-operator">=</span> resultDF.drop(<span class="hljs-string">&quot;tokens&quot;</span>).drop(<span class="hljs-string">&quot;vectors&quot;</span>)

  milvusDf.write.format(<span class="hljs-string">&quot;milvus&quot;</span>)
    .option(MILVUS_HOST, <span class="hljs-string">&quot;localhost&quot;</span>)
    .option(MILVUS_PORT, <span class="hljs-string">&quot;19530&quot;</span>)
    .option(MILVUS_COLLECTION_NAME, <span class="hljs-string">&quot;text_embedding&quot;</span>)
    .option(MILVUS_COLLECTION_VECTOR_FIELD, <span class="hljs-string">&quot;embedding&quot;</span>)
    .option(MILVUS_COLLECTION_VECTOR_DIM, <span class="hljs-string">&quot;128&quot;</span>)
    .option(MILVUS_COLLECTION_PRIMARY_KEY, <span class="hljs-string">&quot;id&quot;</span>)
    .mode(SaveMode.Append)
    .save()
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Milvus---Transform---Milvus" class="common-anchor-header">Milvus -&gt; Transformieren -&gt; Milvus</h3><p>In dieser Demo werden wir</p>
<ol>
<li>Daten aus einer Milvus-Sammlung lesen,</li>
<li>eine Transformation anwenden (mit PCA als Beispiel) und</li>
<li>die transformierten Daten über die Bulkinsert-API in ein anderes Milvus schreiben.</li>
</ol>
<div class="alert notes">
<p>Das PCA-Modell ist ein Transformationsmodell, das die Dimensionalität von Einbettungsvektoren reduziert, was eine übliche Operation beim maschinellen Lernen ist. Sie können dem Transformationsschritt beliebige andere Verarbeitungsoperationen hinzufügen, wie z. B. Filtern, Verbinden oder Normalisieren.</p>
</div>
<pre><code translate="no" class="language-scala"><span class="hljs-keyword">import</span> org.apache.spark.ml.feature.PCA
<span class="hljs-keyword">import</span> org.apache.spark.ml.linalg.{Vector, Vectors}
<span class="hljs-keyword">import</span> org.apache.spark.SparkConf
<span class="hljs-keyword">import</span> org.apache.spark.sql.SparkSession
<span class="hljs-keyword">import</span> org.apache.spark.sql.functions.udf
<span class="hljs-keyword">import</span> org.apache.spark.sql.util.CaseInsensitiveStringMap
<span class="hljs-keyword">import</span> zilliztech.spark.milvus.{MilvusOptions, MilvusUtils}

<span class="hljs-keyword">import</span> scala.collection.JavaConverters._

object TransformDemo <span class="hljs-keyword">extends</span> <span class="hljs-title class_">App</span> {
  <span class="hljs-type">val</span> <span class="hljs-variable">sparkConf</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SparkConf</span>().setMaster(<span class="hljs-string">&quot;local&quot;</span>)
  <span class="hljs-type">val</span> <span class="hljs-variable">spark</span> <span class="hljs-operator">=</span> SparkSession.builder().config(sparkConf).getOrCreate()

  <span class="hljs-keyword">import</span> spark.implicits._

  <span class="hljs-type">val</span> <span class="hljs-variable">host</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;localhost&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">port</span> <span class="hljs-operator">=</span> <span class="hljs-number">19530</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">user</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">password</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;Milvus&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">fs</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;s3a://&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">bucketName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;a-bucket&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">rootPath</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;files&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">minioAK</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;minioadmin&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">minioSK</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;minioadmin&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">minioEndpoint</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;localhost:9000&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">collectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;hello_spark_milvus1&quot;</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">targetCollectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;hello_spark_milvus2&quot;</span>

  <span class="hljs-type">val</span> <span class="hljs-variable">properties</span> <span class="hljs-operator">=</span> Map(
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

  <span class="hljs-comment">// 1, configurations</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">milvusOptions</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusOptions</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CaseInsensitiveStringMap</span>(properties.asJava))

  <span class="hljs-comment">// 2, batch read milvus collection data to dataframe</span>
  <span class="hljs-comment">//  Schema: dim of `embeddings` is 8</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// | | field name | field type | other attributes |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// |1|    &quot;pk&quot;    |    Int64   |  is_primary=True |</span>
  <span class="hljs-comment">// | |            |            |   auto_id=False  |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// |2|  &quot;random&quot;  |    Double  |                  |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// |3|&quot;embeddings&quot;| FloatVector|     dim=8        |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">arrayToVectorUDF</span> <span class="hljs-operator">=</span> udf((arr: Seq[Double]) =&gt; Vectors.dense(arr.toArray[Double]))
  <span class="hljs-type">val</span> <span class="hljs-variable">collectionDF</span> <span class="hljs-operator">=</span> MilvusUtils.readMilvusCollection(spark, milvusOptions)
    .withColumn(<span class="hljs-string">&quot;embeddings_vec&quot;</span>, arrayToVectorUDF($<span class="hljs-string">&quot;embeddings&quot;</span>))
    .drop(<span class="hljs-string">&quot;embeddings&quot;</span>)
  
  <span class="hljs-comment">// 3. Use PCA to reduce dim of vector</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">dim</span> <span class="hljs-operator">=</span> <span class="hljs-number">4</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">pca</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">PCA</span>()
    .setInputCol(<span class="hljs-string">&quot;embeddings_vec&quot;</span>)
    .setOutputCol(<span class="hljs-string">&quot;pca_vec&quot;</span>)
    .setK(dim)
    .fit(collectionDF)
  <span class="hljs-type">val</span> <span class="hljs-variable">vectorToArrayUDF</span> <span class="hljs-operator">=</span> udf((v: Vector) =&gt; v.toArray)
  <span class="hljs-comment">// embeddings dim number reduce to 4</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// | | field name | field type | other attributes |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// |1|    &quot;pk&quot;    |    Int64   |  is_primary=True |</span>
  <span class="hljs-comment">// | |            |            |   auto_id=False  |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// |2|  &quot;random&quot;  |    Double  |                  |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-comment">// |3|&quot;embeddings&quot;| FloatVector|     dim=4        |</span>
  <span class="hljs-comment">// +-+------------+------------+------------------+</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">pcaDf</span> <span class="hljs-operator">=</span> pca.transform(collectionDF)
    .withColumn(<span class="hljs-string">&quot;embeddings&quot;</span>, vectorToArrayUDF($<span class="hljs-string">&quot;pca_vec&quot;</span>))
    .select(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;random&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>)

  <span class="hljs-comment">// 4. Write PCAed data to S3</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">outputPath</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;s3a://a-bucket/result&quot;</span>
  pcaDf.write
    .mode(<span class="hljs-string">&quot;overwrite&quot;</span>)
    .format(<span class="hljs-string">&quot;parquet&quot;</span>)
    .save(outputPath)

  <span class="hljs-comment">// 5. Config MilvusOptions of target table  </span>
  <span class="hljs-type">val</span> <span class="hljs-variable">targetProperties</span> <span class="hljs-operator">=</span> Map(
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
  <span class="hljs-type">val</span> <span class="hljs-variable">targetMilvusOptions</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusOptions</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CaseInsensitiveStringMap</span>(targetProperties.asJava))
  
  <span class="hljs-comment">// 6. Bulkinsert Spark output files into milvus</span>
  MilvusUtils.bulkInsertFromSpark(spark, targetMilvusOptions, outputPath, <span class="hljs-string">&quot;parquet&quot;</span>)
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Databricks---Zilliz-Cloud" class="common-anchor-header">Databricks -&gt; Zilliz Cloud</h3><p>Wenn Sie Zilliz Cloud (den verwalteten Milvus-Dienst) verwenden, können Sie dessen praktische Datenimport-API nutzen. Zilliz Cloud bietet umfassende Tools und Dokumentation, die Ihnen helfen, Ihre Daten aus verschiedenen Datenquellen, einschließlich Spark und Databricks, effizient zu übertragen. Richten Sie einfach einen S3-Bucket als Vermittler ein und öffnen Sie dessen Zugang zu Ihrem Zilliz Cloud-Konto. Die Datenimport-API der Zilliz Cloud lädt automatisch den kompletten Datenstapel aus dem S3-Bucket in Ihren Zilliz Cloud-Cluster.</p>
<p><strong>Vorbereitungen</strong></p>
<ol>
<li><p>Laden Sie die Spark-Laufzeitumgebung, indem Sie eine jar-Datei zu Ihrem Databricks-Cluster hinzufügen.</p>
<p>Sie können eine Bibliothek auf verschiedene Arten installieren. Dieser Screenshot zeigt das Hochladen einer jar-Datei von lokal auf den Cluster. Weitere Informationen finden Sie unter <a href="https://docs.databricks.com/en/libraries/cluster-libraries.html">Cluster-Bibliotheken</a> in der Databricks-Dokumentation.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/install-databricks-library.png" alt="Install Databricks Library" class="doc-image" id="install-databricks-library" />
   </span> <span class="img-wrapper"> <span>Databricks-Bibliothek installieren</span> </span></p></li>
<li><p>Erstellen Sie ein S3-Bucket und konfigurieren Sie es als externen Speicherort für Ihren Databricks-Cluster.</p>
<p>Bulkinsert benötigt Daten, die in einem temporären Bucket gespeichert werden, damit Zilliz Cloud die Daten in einem Batch importieren kann. Sie können einen S3-Bucket erstellen und ihn als externen Speicherort von Databricks konfigurieren. Weitere Informationen finden Sie unter <a href="https://docs.databricks.com/en/sql/language-manual/sql-ref-external-locations.html">Externe Speicherorte</a>.</p></li>
<li><p>Sichern Sie Ihre Databricks-Anmeldeinformationen.</p>
<p>Weitere Einzelheiten finden Sie in der Anleitung im Blog <a href="https://www.databricks.com/blog/2018/06/04/securely-managing-credentials-in-databricks.html">Sichere Verwaltung von Anmeldeinformationen in Databricks</a>.</p></li>
</ol>
<p><strong>Demo</strong></p>
<p>Hier ist ein Codeschnipsel, der den Batch-Datenmigrationsprozess veranschaulicht. Ähnlich wie im obigen Milvus-Beispiel müssen Sie nur die Anmeldeinformationen und die Adresse des S3-Buckets ersetzen.</p>
<pre><code translate="no" class="language-scala"><span class="hljs-comment">// Write the data in batch into the Milvus bucket storage.</span>
<span class="hljs-type">val</span> <span class="hljs-variable">outputPath</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;s3://my-temp-bucket/result&quot;</span>
df.write
  .mode(<span class="hljs-string">&quot;overwrite&quot;</span>)
  .format(<span class="hljs-string">&quot;mjson&quot;</span>)
  .save(outputPath)
<span class="hljs-comment">// Specify Milvus options.</span>
<span class="hljs-type">val</span> <span class="hljs-variable">targetProperties</span> <span class="hljs-operator">=</span> Map(
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
<span class="hljs-type">val</span> <span class="hljs-variable">targetMilvusOptions</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusOptions</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CaseInsensitiveStringMap</span>(targetProperties.asJava))
  
<span class="hljs-comment">// Bulk insert Spark output files into Milvus</span>
MilvusUtils.bulkInsertFromSpark(spark, targetMilvusOptions, outputPath, <span class="hljs-string">&quot;mjson&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Hands-on" class="common-anchor-header">Praktische Anwendung<button data-href="#Hands-on" class="anchor-icon" translate="no">
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
    </button></h2><p>Um Ihnen den Einstieg in den Spark-Milvus-Connector zu erleichtern, haben wir ein Notebook vorbereitet, das Sie sowohl durch den Streaming- als auch den Batch-Datentransferprozess mit Milvus und Zilliz Cloud führt.</p>
<ul>
<li><a href="https://zilliz.com/databricks_zilliz_demos">Spark-Milvus-Konnektor Hands-on</a></li>
</ul>
