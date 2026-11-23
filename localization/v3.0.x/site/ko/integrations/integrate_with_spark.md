---
id: integrate_with_spark.md
summary: >-
  Apache Spark와 Databricks는 Milvus 및 Zilliz Cloud와 연동되어 빅데이터 처리와 벡터 검색 기능을
  결합합니다. Spark-Milvus 커넥터를 활용해 AI 기반 검색 및 분석 기능을 구축하는 방법을 알아보세요.
title: AI 파이프라인을 위해 Milvus/Zilliz Cloud와 함께 Apache Spark™ 활용
---
<h1 id="Use-Apache-Spark™-with-MilvusZilliz-Cloud-for-AI-Pipelines" class="common-anchor-header">AI 파이프라인을 위해 Milvus/Zilliz Cloud와 함께 Apache Spark™ 활용<button data-href="#Use-Apache-Spark™-with-MilvusZilliz-Cloud-for-AI-Pipelines" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/zilliztech/spark-milvus">Spark-Milvus 커넥터는</a> Apache Spark 및 Databricks와 Milvus, Zilliz Cloud 간의 연동을 제공합니다. 이 커넥터는 Apache Spark의 강력한 빅데이터 처리 및 머신러닝(ML) 기능을 Milvus의 최첨단 벡터 검색 기능과 연결해 줍니다. 이러한 통합을 통해 AI 기반 검색, 고급 분석, ML 훈련 및 대규모 벡터 데이터의 효율적인 관리를 위한 간소화된 워크플로우가 가능해집니다.</p>
<p>아파치 스파크는 고속 연산을 통해 방대한 데이터셋을 처리하도록 설계된 분산 데이터 처리 플랫폼입니다. 밀버스(Milvus) 또는 질리즈 클라우드(Zilliz Cloud)와 결합하면 시맨틱 검색, 추천 시스템, AI 기반 데이터 분석과 같은 사용 사례에 새로운 가능성을 열어줍니다.</p>
<p>예를 들어, Spark는 대규모 데이터셋을 일괄 처리하여 ML 모델을 통해 임베딩을 생성한 다음, Spark-Milvus 커넥터를 사용하여 이러한 임베딩을 Milvus 또는 Zilliz Cloud에 직접 저장할 수 있습니다. 인덱싱이 완료된 이 데이터는 신속하게 검색하거나 분석할 수 있어, AI 및 빅데이터 워크플로우를 위한 강력한 파이프라인을 구축합니다.</p>
<p>Spark-Milvus 커넥터는 Milvus로의 반복적 및 대량 데이터 수집, 시스템 간 데이터 동기화, Milvus에 저장된 벡터 데이터에 대한 고급 분석 등의 작업을 지원합니다. 이 가이드에서는 다음과 같은 사용 사례에 맞춰 커넥터를 효과적으로 구성하고 사용하는 단계를 안내합니다:</p>
<ul>
<li>대용량 벡터 데이터를 Milvus에 효율적으로 일괄 로드하기,</li>
<li>Milvus와 다른 스토리지 시스템 또는 데이터베이스 간에 데이터를 이동하는 것,</li>
<li>Spark MLlib 및 기타 AI 도구를 활용하여 Milvus 내의 데이터를 분석하는 것.</li>
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
    </button></h2><h3 id="Preparation" class="common-anchor-header">준비<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h3><p>Spark-Milvus 커넥터는 Scala 및 Python 프로그래밍 언어를 지원합니다. 사용자는 <strong>Pyspark</strong> 또는 <strong>Spark-shell과</strong> 함께 사용할 수 있습니다. 이 데모를 실행하려면 다음 단계에 따라 Spark-Milvus 커넥터 종속성이 포함된 Spark 환경을 설정하십시오.</p>
<ol>
<li><p>Apache Spark 설치 (버전 3.3.0 이상)</p>
<p><a href="https://spark.apache.org/docs/latest/">공식 문서를</a> 참고하여 Apache Spark를 설치할 수 있습니다.</p></li>
<li><p><strong>spark-milvus</strong> jar 파일을 다운로드합니다.</p>
<pre><code translate="no">wget https://github.com/zilliztech/spark-milvus/raw/1.0.0-SNAPSHOT/output/spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>spark-milvus</strong> jar 파일을 의존성 중 하나로 지정하여 Spark 런타임을 시작합니다.</p>
<p>Spark-Milvus 커넥터를 사용하여 Spark 런타임을 시작하려면, 다운로드한 <strong>spark-milvus를</strong> 명령어의 의존성으로 추가하십시오.</p>
<ul>
<li><p><strong>pyspark</strong></p>
<pre><code translate="no">./bin/pyspark --jars spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>spark-shell</strong></p>
<pre><code translate="no">./bin/spark-shell --jars spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ol>
<h3 id="Demo" class="common-anchor-header">데모<button data-href="#Demo" class="anchor-icon" translate="no">
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
    </button></h3><p>이 데모에서는 벡터 데이터가 포함된 샘플 Spark DataFrame을 생성하고, Spark-Milvus 커넥터를 통해 Milvus에 기록합니다. 스키마와 지정된 옵션에 따라 Milvus에 컬렉션이 자동으로 생성됩니다.</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#scala"> Scala</a>
</div>
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
<p>위의 코드를 실행한 후, SDK 또는 Attu(Milvus 대시보드)를 사용하여 Milvus에 삽입된 데이터를 확인할 수 있습니다. ‘ <code translate="no">hello_spark_milvus</code> ’라는 이름의 컬렉션이 생성되어 있으며, 여기에는 이미 4개의 엔티티가 삽입되어 있습니다.</p>
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
    </button></h2><h3 id="Milvus-options" class="common-anchor-header">Milvus 옵션<button data-href="#Milvus-options" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="#Quick-start">'빠른 시작'</a> 섹션에서는 Milvus 작업 시 설정하는 옵션들을 살펴보았습니다. 이러한 옵션들은 'Milvus 옵션'으로 추상화되어 있으며, Milvus에 대한 연결을 생성하고 기타 Milvus 동작을 제어하는 데 사용됩니다. 모든 옵션이 필수적인 것은 아닙니다.</p>
<table>
<thead>
<tr><th>옵션 키</th><th>기본값</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.host</code></td><td><code translate="no">localhost</code></td><td>Milvus 서버 호스트. 자세한 내용은 <a href="https://milvus.io/docs/manage_connection.md">‘Milvus 연결 관리’를</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">milvus.port</code></td><td><code translate="no">19530</code></td><td>Milvus 서버 포트. 자세한 내용은 <a href="https://milvus.io/docs/manage_connection.md">‘Milvus 연결 관리’를</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">milvus.username</code></td><td><code translate="no">root</code></td><td>Milvus 서버의 사용자 이름. 자세한 내용은 <a href="https://milvus.io/docs/manage_connection.md">‘Milvus 연결 관리’를</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">milvus.password</code></td><td><code translate="no">Milvus</code></td><td>Milvus 서버의 비밀번호입니다. 자세한 내용은 <a href="https://milvus.io/docs/manage_connection.md">'Milvus 연결 관리'를</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">milvus.uri</code></td><td><code translate="no">--</code></td><td>Milvus 서버 URI. 자세한 내용은 <a href="https://milvus.io/docs/manage_connection.md">'Milvus 연결 관리'를</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">milvus.token</code></td><td><code translate="no">--</code></td><td>Milvus 서버 토큰. 자세한 내용은 <a href="https://milvus.io/docs/manage_connection.md">‘Milvus 연결 관리’를</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">milvus.database.name</code></td><td><code translate="no">default</code></td><td>읽거나 쓸 Milvus 데이터베이스의 이름.</td></tr>
<tr><td><code translate="no">milvus.collection.name</code></td><td><code translate="no">hello_milvus</code></td><td>읽거나 쓸 Milvus 컬렉션의 이름.</td></tr>
<tr><td><code translate="no">milvus.collection.primaryKeyField</code></td><td><code translate="no">None</code></td><td>컬렉션 내 기본 키 필드의 이름. 컬렉션이 존재하지 않는 경우 필수 항목입니다.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorField</code></td><td><code translate="no">None</code></td><td>컬렉션 내 벡터 필드의 이름. 컬렉션이 존재하지 않을 경우 필수입니다.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorDim</code></td><td><code translate="no">None</code></td><td>컬렉션 내 벡터 필드의 차원. 컬렉션이 존재하지 않을 경우 필수입니다.</td></tr>
<tr><td><code translate="no">milvus.collection.autoID</code></td><td><code translate="no">false</code></td><td>컬렉션이 존재하지 않는 경우, 이 옵션은 엔티티에 대한 ID를 자동으로 생성할지 여부를 지정합니다. 자세한 내용은 <a href="https://milvus.io/docs/create_collection.md">create_collection을</a> 참조하십시오.</td></tr>
<tr><td><code translate="no">milvus.bucket</code></td><td><code translate="no">a-bucket</code></td><td>Milvus 스토리지의 버킷 이름입니다. 이는 <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a> 파일의 <code translate="no">minio.bucketName</code> 와 동일해야 합니다.</td></tr>
<tr><td><code translate="no">milvus.rootpath</code></td><td><code translate="no">files</code></td><td>Milvus 스토리지의 루트 경로입니다. 이는 <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a> 파일의 <code translate="no">minio.rootpath</code> 와 동일해야 합니다.</td></tr>
<tr><td><code translate="no">milvus.fs</code></td><td><code translate="no">s3a://</code></td><td>Milvus 스토리지의 파일 시스템입니다. 값 <code translate="no">s3a://</code> 은 오픈소스 Spark에 적용됩니다. Databricks의 경우 <code translate="no">s3://</code> 을 사용하십시오.</td></tr>
<tr><td><code translate="no">milvus.storage.endpoint</code></td><td><code translate="no">localhost:9000</code></td><td>Milvus 스토리지의 엔드포인트입니다. 이는 <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a> 파일의 <code translate="no">minio.address</code>:<code translate="no">minio.port</code> 과 동일해야 합니다.</td></tr>
<tr><td><code translate="no">milvus.storage.user</code></td><td><code translate="no">minioadmin</code></td><td>Milvus 스토리지의 사용자입니다. 이는 <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a> 파일의 <code translate="no">minio.accessKeyID</code> 과 동일해야 합니다.</td></tr>
<tr><td><code translate="no">milvus.storage.password</code></td><td><code translate="no">minioadmin</code></td><td>Milvus 스토리지의 비밀번호입니다. 이는 <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a> 파일의 <code translate="no">minio.secretAccessKey</code> 항목과 동일해야 합니다.</td></tr>
<tr><td><code translate="no">milvus.storage.useSSL</code></td><td><code translate="no">false</code></td><td>Milvus 스토리지에 SSL을 사용할지 여부입니다. 이는 <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a> 파일의 <code translate="no">minio.useSSL</code> 항목과 동일해야 합니다.</td></tr>
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
<li><code translate="no">milvus</code>: Spark DataFrame을 Milvus 엔티티로 원활하게 변환하기 위한 Milvus 데이터 형식.</li>
<li><code translate="no">milvusbinlog</code>: Milvus 내장 바이너리 로그 데이터를 읽기 위한 Milvus 데이터 형식.</li>
<li><code translate="no">mjson</code>: Milvus에 데이터를 일괄 삽입하기 위한 Milvus JSON 형식.</li>
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
    </button></h3><p><a href="#Quick-start">'빠른 시작'</a> 가이드에서는 <strong>milvus</strong> 형식을 사용하여 Milvus 클러스터에 샘플 데이터를 작성합니다. <strong>milvus</strong> 형식은 Spark DataFrame 데이터를 Milvus 컬렉션에 원활하게 작성할 수 있도록 지원하는 새로운 데이터 형식입니다. 이는 Milvus SDK의 Insert API를 일괄 호출하여 구현됩니다. Milvus에 컬렉션이 존재하지 않는 경우, DataFrame의 스키마를 기반으로 새로운 컬렉션이 생성됩니다. 그러나 자동으로 생성된 컬렉션은 컬렉션 스키마의 모든 기능을 지원하지 않을 수 있습니다. 따라서 먼저 SDK를 통해 컬렉션을 생성한 다음, spark-milvus를 사용하여 데이터를 작성하는 것이 권장됩니다. 자세한 내용은 <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/InsertDemo.scala">데모를</a> 참조하십시오.</p>
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
    </button></h3><p>새로운 데이터 형식인 <strong>milvusbinlog는</strong> Milvus 내장 바이너리 로그(binlog) 데이터를 읽기 위한 것입니다. 바이너리 로그는 Parquet를 기반으로 하는 Milvus의 내부 데이터 저장 형식입니다. 안타깝게도 일반 Parquet 라이브러리로는 읽을 수 없기 때문에, Spark 작업이 이를 읽을 수 있도록 이 새로운 데이터 형식을 구현했습니다.
Milvus 내부 저장 방식에 대해 잘 알고 있지 않은 경우, <strong>milvusbinlog를</strong> 직접 사용하는 것은 권장하지 않습니다. 다음 섹션에서 소개할 <a href="#MilvusUtils">MilvusUtils</a> 함수를 사용하는 것을 권장합니다.</p>
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
    </button></h3><p>Milvus는 대용량 데이터셋을 처리할 때 더 나은 쓰기 성능을 제공하기 위해 <a href="https://milvus.io/docs/bulk_insert.md">Bulkinsert</a> 기능을 지원합니다. 그러나 Milvus에서 사용하는 JSON 형식은 Spark의 기본 JSON 출력 형식과 약간 다릅니다.
이를 해결하기 위해 Milvus 요구 사항을 충족하는 데이터를 생성하는 <strong>mjson</strong> 데이터 형식을 도입했습니다. 다음은 JSON-lines와 <strong>mjson의</strong> 차이점을 보여주는 예시입니다:</p>
<ul>
<li><p>JSON-lines:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">101</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">13</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">1.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">1.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">102</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">25</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">2.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">2.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">3.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">3.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">12</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">4.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">4.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;book_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">105</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;word_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">34</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;book_intro&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">5.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">5.2</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>mjson (Milvus Bulkinsert에 필수):</p>
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
<p>향후 이 부분은 개선될 예정입니다. Parquet 형식을 지원하는 Milvus v2.3.7 이상 버전을 사용 중이라면, spark-milvus 통합 시 Parquet 형식을 사용하는 것을 권장합니다. GitHub의 <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/BulkInsertDemo.scala">데모를</a> 참조하십시오.</p>
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
    </button></h2><p>MilvusUtils에는 여러 유용한 유틸 함수가 포함되어 있습니다. 현재는 Scala에서만 지원됩니다. 더 많은 사용 예제는 <a href="#Advanced-Usage">‘고급 사용법’</a> 섹션에서 확인할 수 있습니다.</p>
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
    </button></h3><p><strong>MilvusUtils.readMilvusCollection은</strong> 전체 Milvus 컬렉션을 Spark DataFrame으로 불러오는 간단한 인터페이스입니다. 이 함수는 Milvus SDK 호출, <strong>milvusbinlog</strong> 읽기, 일반적인 유니온/조인 연산 등 다양한 작업을 포괄합니다.</p>
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
    </button></h3><p><strong>MilvusUtils.bulkInsertFromSpark는</strong> Spark 출력 파일을 대량으로 Milvus로 가져오는 편리한 방법을 제공합니다. 이 함수는 Milvus SDK의 <strong>Bullkinsert</strong> API를 래핑합니다.</p>
<pre><code translate="no" class="language-scala">df.write.format(&quot;parquet&quot;).save(outputPath)
MilvusUtils.bulkInsertFromSpark(spark, milvusOptions, outputPath, &quot;parquet&quot;)
</code></pre>
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
    </button></h2><p>이 섹션에서는 데이터 분석 및 마이그레이션을 위한 Spark-Milvus 커넥터의 고급 사용 예제를 확인할 수 있습니다. 더 많은 데모는 <a href="https://github.com/zilliztech/spark-milvus/tree/main/examples/src/main/scala">예제 섹션을</a> 참조하십시오.</p>
<h3 id="MySQL---embedding---Milvus" class="common-anchor-header">MySQL → 임베딩 → Milvus<button data-href="#MySQL---embedding---Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>이 데모에서는 다음을 수행합니다.</p>
<ol>
<li>Spark-MySQL 커넥터를 통해 MySQL에서 데이터를 읽고,</li>
<li>임베딩을 생성(Word2Vec을 예시로 사용)하고,</li>
<li>임베딩된 데이터를 Milvus에 저장합니다.</li>
</ol>
<p>Spark-MySQL 커넥터를 사용하려면 Spark 환경에 다음 종속성을 추가해야 합니다:</p>
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
    </button></h3><p>이 데모에서는</p>
<ol>
<li>Milvus 컬렉션에서 데이터를 읽고,</li>
<li>변환을 적용하고(PCA를 예시로 사용),</li>
<li>Bulkinsert API를 통해 변환된 데이터를 다른 Milvus에 기록합니다.</li>
</ol>
<div class="alert notes">
<p>PCA 모델은 임베딩 벡터의 차원을 축소하는 변환 모델로, 머신 러닝에서 흔히 사용되는 연산입니다.
변환 단계에 필터링, 조인, 정규화 등 다른 처리 작업을 추가할 수 있습니다.</p>
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
    </button></h3><p>Zilliz Cloud(관리형 Milvus 서비스)를 사용 중이라면, 편리한 데이터 가져오기 API를 활용할 수 있습니다. Zilliz Cloud는 Spark 및 Databricks를 포함한 다양한 데이터 소스에서 데이터를 효율적으로 이동할 수 있도록 돕는 포괄적인 도구와 문서를 제공합니다. 중간 저장소로 S3 버킷을 설정하고 Zilliz Cloud 계정에 대한 액세스 권한을 허용하기만 하면 됩니다. Zilliz Cloud의 데이터 가져오기 API가 S3 버킷의 전체 데이터 배치를 Zilliz Cloud 클러스터로 자동으로 로드합니다.</p>
<p><strong>준비 사항</strong></p>
<ol>
<li><p>Databricks 클러스터에 jar 파일을 추가하여 Spark 런타임을 로드하십시오.</p>
<p>라이브러리는 다양한 방법으로 설치할 수 있습니다. 이 스크린샷은 로컬에서 클러스터로 JAR 파일을 업로드하는 과정을 보여줍니다. 자세한 내용은 Databricks 문서의 <a href="https://docs.databricks.com/en/libraries/cluster-libraries.html">‘클러스터 라이브러리(Cluster Libraries</a> )’를 참조하십시오.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/install-databricks-library.png" alt="Install Databricks Library" class="doc-image" id="install-databricks-library" /> 
   <span>Databricks 라이브러리 설치</span>
  
 </span></p></li>
<li><p>S3 버킷을 생성하고 이를 Databricks 클러스터의 외부 저장소로 구성하십시오.</p>
<p>Bulkinsert는 Zilliz Cloud가 데이터를 일괄적으로 가져올 수 있도록 필요한 데이터를 임시 버킷에 저장해야 합니다. S3 버킷을 생성하고 이를 Databricks의 외부 저장소로 구성할 수 있습니다. 자세한 내용은 <a href="https://docs.databricks.com/en/sql/language-manual/sql-ref-external-locations.html">‘외부 저장소’를</a> 참조하십시오.</p></li>
<li><p>Databricks 자격 증명을 안전하게 관리하십시오.</p>
<p>자세한 내용은 블로그의 <a href="https://www.databricks.com/blog/2018/06/04/securely-managing-credentials-in-databricks.html">‘Databricks에서 자격 증명 안전하게 관리하기’</a> 지침을 참조하십시오.</p></li>
</ol>
<p><strong>데모</strong></p>
<p>다음은 일괄 데이터 마이그레이션 프로세스를 보여주는 코드 스니펫입니다. 위의 Milvus 예제와 마찬가지로, 자격 증명과 S3 버킷 주소만 교체하면 됩니다.</p>
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
<h2 id="Hands-on-Notebook" class="common-anchor-header">실습용 노트북<button data-href="#Hands-on-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>Spark-Milvus 커넥터를 빠르게 시작해 보시려면, Spark에서 Milvus 및 Zilliz Cloud로 데이터를 스트리밍 및 배치 방식으로 수집하는 예제를 단계별로 안내하는 노트북을 확인해 보세요.</p>
<ul>
<li><a href="https://zilliz.com/databricks_zilliz_demos">Spark-Milvus 커넥터 실습</a></li>
</ul>
