---
id: integrate_with_spark.md
summary: 이 페이지에서는 스파크-밀버스 커넥터에 대해 설명합니다.
title: Spark-Milvus 커넥터 사용 가이드
---
<h1 id="Spark-Milvus-Connector-User-Guide" class="common-anchor-header">Spark-Milvus 커넥터 사용 가이드<button data-href="#Spark-Milvus-Connector-User-Guide" class="anchor-icon" translate="no">
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
    </button></h1><p>Spark-Milvus 커넥터(https://github.com/zilliztech/spark-milvus)는 아파치 스파크의 데이터 처리 및 ML 기능과 밀버스의 벡터 데이터 저장 및 검색 기능을 결합하여 아파치 스파크와 밀버스 간의 원활한 통합을 제공합니다. 이러한 통합을 통해 다음과 같은 다양하고 흥미로운 애플리케이션을 구현할 수 있습니다:</p>
<ul>
<li>Milvus에 벡터 데이터를 대량으로 효율적으로 로드합니다,</li>
<li>Milvus와 다른 스토리지 시스템 또는 데이터베이스 간에 데이터 이동,</li>
<li>Spark MLlib 및 기타 AI 도구를 활용하여 Milvus의 데이터 분석.</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">빠른 시작<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Preparation" class="common-anchor-header">준비</h3><p>Spark-Milvus 커넥터는 Scala 및 Python 프로그래밍 언어를 지원합니다. 사용자는 <strong>Pyspark</strong> 또는 <strong>Spark-shell과</strong> 함께 사용할 수 있습니다. 이 데모를 실행하려면 다음 단계에 따라 Spark-Milvus 커넥터 종속성을 포함하는 Spark 환경을 설정하세요:</p>
<ol>
<li><p>Apache Spark 설치(버전 &gt;= 3.3.0)</p>
<p><a href="https://spark.apache.org/docs/latest/">공식 문서를</a> 참조하여 Apache Spark를 설치할 수 있습니다.</p></li>
<li><p><strong>spark-milvus</strong> jar 파일을 다운로드합니다.</p>
<pre><code translate="no">wget https://github.com/zilliztech/spark-milvus/raw/1.0.0-SNAPSHOT/output/spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p>종속성 중 하나로 <strong>spark-milvus</strong> jar를 사용하여 Spark 런타임을 시작합니다.</p>
<p>Spark-Milvus 커넥터로 Spark 런타임을 시작하려면 다운로드한 <strong>spark-milvus를</strong> 명령에 종속 요소로 추가합니다.</p>
<ul>
<li><p><strong>pyspark</strong></p>
<pre><code translate="no">./<span class="hljs-built_in">bin</span>/pyspark --jars spark-milvus-<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>spark-shell</strong></p>
<pre><code translate="no">./<span class="hljs-built_in">bin</span>/spark-shell --jars spark-milvus-<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ol>
<h3 id="Demo" class="common-anchor-header">데모</h3><p>이 데모에서는 벡터 데이터가 포함된 샘플 Spark 데이터 프레임을 생성하고 Spark-Milvus 커넥터를 통해 Milvus에 씁니다. 스키마와 지정된 옵션에 따라 Milvus에 컬렉션이 자동으로 생성됩니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#scala">스칼라</a></div>
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
<p>위 코드를 실행한 후, 밀버스에서 삽입된 데이터를 SDK 또는 Attu(밀버스 대시보드)를 통해 확인할 수 있습니다. 이미 4개의 엔티티가 삽입된 <code translate="no">hello_spark_milvus</code> 라는 이름의 컬렉션을 확인할 수 있습니다.</p>
<h2 id="Features--concepts" class="common-anchor-header">기능 및 개념<button data-href="#Features--concepts" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-options" class="common-anchor-header">Milvus 옵션</h3><p><a href="#Quick-start">빠른 시작</a> 섹션에서는 Milvus로 작업하는 동안 설정 옵션을 표시했습니다. 이러한 옵션은 Milvus 옵션으로 추상화되어 있습니다. 이 옵션은 Milvus에 대한 연결을 생성하고 다른 Milvus 동작을 제어하는 데 사용됩니다. 모든 옵션이 필수인 것은 아닙니다.</p>
<table>
<thead>
<tr><th>옵션 키</th><th>기본값</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.host</code></td><td><code translate="no">localhost</code></td><td>Milvus 서버 호스트. 자세한 내용은 <a href="https://milvus.io/docs/manage_connection.md">Milvus 연결 관리를</a> 참조하세요.</td></tr>
<tr><td><code translate="no">milvus.port</code></td><td><code translate="no">19530</code></td><td>Milvus 서버 포트. 자세한 내용은 <a href="https://milvus.io/docs/manage_connection.md">Milvus 연결 관리를</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">milvus.username</code></td><td><code translate="no">root</code></td><td>Milvus 서버의 사용자명. 자세한 내용은 <a href="https://milvus.io/docs/manage_connection.md">Milvus 연결 관리를</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">milvus.password</code></td><td><code translate="no">Milvus</code></td><td>Milvus 서버의 비밀번호. 자세한 내용은 <a href="https://milvus.io/docs/manage_connection.md">Milvus 연결 관리를</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">milvus.uri</code></td><td><code translate="no">--</code></td><td>Milvus 서버 URI. 자세한 내용은 <a href="https://milvus.io/docs/manage_connection.md">Milvus 연결 관리를</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">milvus.token</code></td><td><code translate="no">--</code></td><td>Milvus 서버 토큰. 자세한 내용은 <a href="https://milvus.io/docs/manage_connection.md">Milvus 연결 관리를</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">milvus.database.name</code></td><td><code translate="no">default</code></td><td>읽거나 쓸 Milvus 데이터베이스의 이름입니다.</td></tr>
<tr><td><code translate="no">milvus.collection.name</code></td><td><code translate="no">hello_milvus</code></td><td>읽거나 쓸 Milvus 컬렉션의 이름입니다.</td></tr>
<tr><td><code translate="no">milvus.collection.primaryKeyField</code></td><td><code translate="no">None</code></td><td>컬렉션의 기본 키 필드 이름입니다. 컬렉션이 존재하지 않는 경우 필수입니다.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorField</code></td><td><code translate="no">None</code></td><td>컬렉션의 벡터 필드 이름입니다. 컬렉션이 존재하지 않는 경우 필수입니다.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorDim</code></td><td><code translate="no">None</code></td><td>컬렉션에 있는 벡터 필드의 차원입니다. 컬렉션이 존재하지 않는 경우 필수입니다.</td></tr>
<tr><td><code translate="no">milvus.collection.autoID</code></td><td><code translate="no">false</code></td><td>컬렉션이 존재하지 않는 경우 이 옵션은 엔티티의 ID를 자동으로 생성할지 여부를 지정합니다. 자세한 내용은 <a href="https://milvus.io/docs/create_collection.md">create_collection을</a> 참조하세요.</td></tr>
<tr><td><code translate="no">milvus.bucket</code></td><td><code translate="no">a-bucket</code></td><td>Milvus 스토리지의 버킷 이름입니다. 이 이름은 <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml의</a> <code translate="no">minio.bucketName</code> 와 동일해야 합니다.</td></tr>
<tr><td><code translate="no">milvus.rootpath</code></td><td><code translate="no">files</code></td><td>Milvus 스토리지의 루트 경로. <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml의</a> <code translate="no">minio.rootpath</code> 와 동일해야 합니다.</td></tr>
<tr><td><code translate="no">milvus.fs</code></td><td><code translate="no">s3a://</code></td><td>Milvus 스토리지의 파일 시스템. <code translate="no">s3a://</code> 값은 오픈 소스 Spark에 적용됩니다. 데이터브릭스에는 <code translate="no">s3://</code> 을 사용합니다.</td></tr>
<tr><td><code translate="no">milvus.storage.endpoint</code></td><td><code translate="no">localhost:9000</code></td><td>Milvus 스토리지의 엔드포인트. 이는 <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml의</a> <code translate="no">minio.address</code>:<code translate="no">minio.port</code> 과 동일해야 합니다.</td></tr>
<tr><td><code translate="no">milvus.storage.user</code></td><td><code translate="no">minioadmin</code></td><td>Milvus 스토리지의 사용자. <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml의</a> <code translate="no">minio.accessKeyID</code> 와 동일해야 합니다.</td></tr>
<tr><td><code translate="no">milvus.storage.password</code></td><td><code translate="no">minioadmin</code></td><td>Milvus 스토리지의 비밀번호. <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml의</a> <code translate="no">minio.secretAccessKey</code> 와 동일해야 합니다.</td></tr>
<tr><td><code translate="no">milvus.storage.useSSL</code></td><td><code translate="no">false</code></td><td>Milvus 스토리지에 SSL을 사용할지 여부입니다. 이 값은 <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml의</a> <code translate="no">minio.useSSL</code> 과 동일해야 합니다.</td></tr>
</tbody>
</table>
<h2 id="Milvus-data-format" class="common-anchor-header">Milvus 데이터 형식<button data-href="#Milvus-data-format" class="anchor-icon" translate="no">
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
    </button></h2><p>Spark-Milvus 커넥터는 다음 Milvus 데이터 형식의 데이터 읽기 및 쓰기를 지원합니다:</p>
<ul>
<li><code translate="no">milvus</code>: Spark DataFrame에서 Milvus 엔티티로 원활하게 변환하기 위한 Milvus 데이터 형식입니다.</li>
<li><code translate="no">milvusbinlog</code>: Milvus 빌트인 빈로그 데이터를 읽기 위한 Milvus 데이터 형식.</li>
<li><code translate="no">mjson</code>: Milvus에 데이터를 대량 삽입하기 위한 Milvus JSON 형식입니다.</li>
</ul>
<h3 id="milvus" class="common-anchor-header">밀버스</h3><p><a href="#Quick-start">빠른 시작에서는</a> Milvus 클러스터에 샘플 데이터를 쓰기 위해 <strong>milvus</strong> 형식을 사용합니다. <strong>밀버스</strong> 형식은 밀버스 컬렉션에 Spark 데이터프레임 데이터를 원활하게 쓸 수 있도록 지원하는 새로운 데이터 형식입니다. 이는 Milvus SDK의 Insert API에 대한 일괄 호출을 통해 이루어집니다. Milvus에 컬렉션이 없는 경우, 데이터프레임의 스키마를 기반으로 새 컬렉션이 생성됩니다. 단, 자동 생성된 컬렉션은 컬렉션 스키마의 모든 기능을 지원하지 않을 수 있습니다. 따라서 먼저 SDK를 통해 컬렉션을 생성한 후, spark-milvus를 사용하여 작성하는 것을 권장합니다. 자세한 내용은 <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/InsertDemo.scala">데모를</a> 참조하세요.</p>
<h3 id="milvusbinlog" class="common-anchor-header">밀버스빈로그</h3><p>새로운 데이터 형식인 <strong>milvusbinlog는</strong> Milvus에 내장된 binlog 데이터를 읽기 위한 것입니다. 빈로그는 쪽모이 세공을 기반으로 하는 Milvus의 내부 데이터 저장 형식입니다. 안타깝게도 일반 쪽모이 세공 라이브러리에서는 읽을 수 없기 때문에 Spark 작업에서 읽을 수 있도록 이 새로운 데이터 형식을 구현했습니다. 밀버스 내부 저장소 세부 정보에 익숙하지 않은 경우 <strong>milvusbinlog를</strong> 직접 사용하는 것은 권장하지 않습니다. 다음 섹션에서 소개할 <a href="#MilvusUtils">MilvusUtils</a> 함수를 사용하는 것이 좋습니다.</p>
<pre><code translate="no" class="language-scalar">val df = spark.read
  .<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;milvusbinlog&quot;</span>)
  .load(path)
  .withColumnRenamed(<span class="hljs-string">&quot;val&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="mjson" class="common-anchor-header">mjson</h3><p>Milvus는 대용량 데이터 세트로 작업할 때 쓰기 성능을 향상시키기 위해 <a href="https://milvus.io/docs/bulk_insert.md">Bulkinsert</a> 기능을 제공합니다. 그러나 Milvus에서 사용하는 JSON 형식은 Spark의 기본 JSON 출력 형식과 약간 다릅니다. 이 문제를 해결하기 위해 Milvus 요구 사항을 충족하는 데이터를 생성하기 위해 <strong>mjson</strong> 데이터 형식을 도입했습니다. 다음은 JSON-lines와 <strong>mjson의</strong> 차이점을 보여주는 예제입니다:</p>
<ul>
<li><p>JSON-lines:</p>
<pre><code translate="no" class="language-json">{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">101</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">1.1</span>, <span class="hljs-number">1.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">102</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">2.1</span>, <span class="hljs-number">2.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">3.1</span>, <span class="hljs-number">3.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">104</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">4.1</span>, <span class="hljs-number">4.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">105</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">34</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">5.1</span>, <span class="hljs-number">5.2</span>]}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>mjson(Milvus Bulkinsert에 필요):</p>
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
<p>이 기능은 향후 개선될 예정입니다. 사용 중인 Milvus 버전이 Parquet 형식의 bulkinsert를 지원하는 v2.3.7 이상인 경우 spark-milvus 연동에서 Parquet 형식을 사용하는 것이 좋습니다. 깃허브의 <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/BulkInsertDemo.scala">데모를</a> 참조하세요.</p>
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
    </button></h2><p>MilvusUtils에는 몇 가지 유용한 유틸리티 함수가 포함되어 있습니다. 현재는 Scala에서만 지원됩니다. 더 많은 사용 예제는 <a href="#Advanced-Usage">고급 사용법</a> 섹션에 있습니다.</p>
<h3 id="MilvusUtilsreadMilvusCollection" class="common-anchor-header">MilvusUtils.readMilvusCollection</h3><p><strong>MilvusUtils.readMilvusCollection은</strong> 전체 Milvus 컬렉션을 Spark 데이터 프레임에 로드하기 위한 간단한 인터페이스입니다. Milvus SDK 호출, <strong>밀버스빈로그</strong> 읽기 및 일반적인 유니온/조인 작업을 포함한 다양한 작업을 래핑합니다.</p>
<pre><code translate="no" class="language-scala"><span class="hljs-type">val</span> <span class="hljs-variable">collectionDF</span> <span class="hljs-operator">=</span> MilvusUtils.readMilvusCollection(spark, milvusOptions)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MilvusUtilsbulkInsertFromSpark" class="common-anchor-header">MilvusUtils.bulkInsertFromSpark</h3><p><strong>MilvusUtils.bulkInsertFromSpark는</strong> Spark 출력 파일을 Milvus로 대량으로 가져올 수 있는 편리한 방법을 제공합니다. Milvus SDK의 <strong>Bullkinsert</strong> API를 래핑합니다.</p>
<pre><code translate="no" class="language-scala">df.write.<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;parquet&quot;</span>).save(outputPath)
MilvusUtils.bulkInsertFromSpark(spark, milvusOptions, outputPath, <span class="hljs-string">&quot;parquet&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Advanced-Usage" class="common-anchor-header">고급 사용법<button data-href="#Advanced-Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 데이터 분석 및 마이그레이션을 위한 Spark-Milvus 커넥터의 고급 사용 예제를 찾을 수 있습니다. 더 많은 데모는 <a href="https://github.com/zilliztech/spark-milvus/tree/main/examples/src/main/scala">예제를</a> 참조하세요.</p>
<h3 id="MySQL---embedding---Milvus" class="common-anchor-header">MySQL -&gt; 임베딩 -&gt; Milvus</h3><p>이 데모에서는 다음을 수행합니다.</p>
<ol>
<li>Spark-MySQL 커넥터를 통해 MySQL에서 데이터를 읽습니다,</li>
<li>임베딩 생성(Word2Vec을 예로 사용), 그리고</li>
<li>임베딩된 데이터를 Milvus에 쓰기.</li>
</ol>
<p>Spark-MySQL 커넥터를 활성화하려면 Spark 환경에 다음 종속성을 추가해야 합니다:</p>
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
<h3 id="Milvus---Transform---Milvus" class="common-anchor-header">Milvus -&gt; Transform -&gt; Milvus</h3><p>이 데모에서는 다음을 수행합니다.</p>
<ol>
<li>Milvus 컬렉션에서 데이터를 읽습니다,</li>
<li>변환을 적용하고(PCA를 예로 사용), 그리고</li>
<li>변환된 데이터를 Bulkinsert API를 통해 다른 Milvus에 기록합니다.</li>
</ol>
<div class="alert notes">
<p>PCA 모델은 머신 러닝에서 흔히 사용되는 임베딩 벡터의 차원을 줄이는 변환 모델입니다. 변환 단계에 필터링, 조인, 정규화 등 다른 처리 작업을 추가할 수 있습니다.</p>
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
<h3 id="Databricks---Zilliz-Cloud" class="common-anchor-header">데이터브릭 -&gt; 질리즈 클라우드</h3><p>Zilliz Cloud(관리형 Milvus 서비스)를 사용하는 경우, 편리한 데이터 가져오기 API를 활용할 수 있습니다. 질리즈 클라우드는 스파크, 데이터브릭스 등 다양한 데이터 소스에서 데이터를 효율적으로 옮길 수 있는 종합적인 도구와 설명서를 제공합니다. S3 버킷을 중개자로 설정하고 질리즈 클라우드 계정에 액세스 권한을 열기만 하면 됩니다. 질리즈 클라우드의 데이터 가져오기 API가 S3 버킷의 전체 데이터를 자동으로 질리즈 클라우드 클러스터로 불러옵니다.</p>
<p><strong>준비 과정</strong></p>
<ol>
<li><p>데이터브릭스 클러스터에 jar 파일을 추가하여 Spark 런타임을 로드합니다.</p>
<p>다양한 방법으로 라이브러리를 설치할 수 있습니다. 이 스크린샷은 로컬에서 클러스터로 jar를 업로드하는 방법을 보여줍니다. 자세한 내용은 Databricks 설명서에서 <a href="https://docs.databricks.com/en/libraries/cluster-libraries.html">클러스터 라이브러리를</a> 참조하세요.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/install-databricks-library.png" alt="Install Databricks Library" class="doc-image" id="install-databricks-library" />
   </span> <span class="img-wrapper"> <span>데이터브릭스 라이브러리 설치</span> </span></p></li>
<li><p>S3 버킷을 생성하고 이를 Databricks 클러스터의 외부 저장 위치로 구성합니다.</p>
<p>불킨서트는 데이터를 임시 버킷에 저장해야 질리즈 클라우드에서 일괄적으로 데이터를 가져올 수 있습니다. S3 버킷을 생성하여 데이터브릭의 외부 위치로 설정할 수 있습니다. 자세한 내용은 <a href="https://docs.databricks.com/en/sql/language-manual/sql-ref-external-locations.html">외부 위치를</a> 참고하세요.</p></li>
<li><p>데이터브릭스 자격 증명을 보호합니다.</p>
<p>자세한 내용은 <a href="https://www.databricks.com/blog/2018/06/04/securely-managing-credentials-in-databricks.html">데이터브릭스에서 자격증명 안전하게 관리하기</a> 블로그의 안내를 참조하세요.</p></li>
</ol>
<p><strong>데모</strong></p>
<p>다음은 일괄 데이터 마이그레이션 프로세스를 보여주는 코드 스니펫입니다. 위의 Milvus 예제와 마찬가지로 자격 증명과 S3 버킷 주소만 바꾸면 됩니다.</p>
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
<h2 id="Hands-on" class="common-anchor-header">실습<button data-href="#Hands-on" class="anchor-icon" translate="no">
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
    </button></h2><p>Spark-Milvus 커넥터를 빠르게 시작할 수 있도록 Milvus와 Zilliz Cloud를 사용한 스트리밍 및 일괄 데이터 전송 프로세스를 모두 안내하는 노트북을 준비했습니다.</p>
<ul>
<li><a href="https://zilliz.com/databricks_zilliz_demos">스파크-밀버스 커넥터 핸즈온</a></li>
</ul>
