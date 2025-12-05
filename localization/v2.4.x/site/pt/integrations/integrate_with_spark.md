---
id: integrate_with_spark.md
summary: Esta página aborda o conetor Spark-Milvus.
title: Guia do utilizador do conetor Spark-Milvus
---
<h1 id="Spark-Milvus-Connector-User-Guide" class="common-anchor-header">Guia do utilizador do conetor Spark-Milvus<button data-href="#Spark-Milvus-Connector-User-Guide" class="anchor-icon" translate="no">
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
    </button></h1><p>O Conector Spark-Milvus (https://github.com/zilliztech/spark-milvus) fornece uma integração perfeita entre o Apache Spark e o Milvus, combinando o processamento de dados e os recursos de ML do Apache Spark com o armazenamento de dados vetoriais e os recursos de pesquisa do Milvus. Esta integração permite várias aplicações interessantes, incluindo:</p>
<ul>
<li>Carregar eficientemente dados vetoriais no Milvus em grandes lotes,</li>
<li>Mover dados entre o Milvus e outros sistemas de armazenamento ou bases de dados,</li>
<li>Analisar os dados no Milvus tirando partido do Spark MLlib e de outras ferramentas de IA.</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">Início rápido<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Preparation" class="common-anchor-header">Preparação</h3><p>O Conector Spark-Milvus suporta as linguagens de programação Scala e Python. Os utilizadores podem utilizá-lo com o <strong>Pyspark</strong> ou o <strong>Spark-shell</strong>. Para executar esta demonstração, configure um ambiente Spark contendo a dependência do Conector Spark-Milvus nas etapas a seguir:</p>
<ol>
<li><p>Instalar o Apache Spark (versão &gt;= 3.3.0)</p>
<p>Você pode instalar o Apache Spark consultando a <a href="https://spark.apache.org/docs/latest/">documentação oficial</a>.</p></li>
<li><p>Baixe o arquivo jar <strong>spark-milvus</strong>.</p>
<pre><code translate="no">wget https://github.com/zilliztech/spark-milvus/raw/1.0.0-SNAPSHOT/output/spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inicie o tempo de execução do Spark com o jar <strong>spark-milvus</strong> como uma das dependências.</p>
<p>Para iniciar o tempo de execução do Spark com o Conector Spark-Milvus, adicione o <strong>spark-milvus</strong> baixado como dependência ao comando.</p>
<ul>
<li><p><strong>pyspark</strong></p>
<pre><code translate="no">./<span class="hljs-built_in">bin</span>/pyspark --jars spark-milvus-<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>spark-shell</strong></p>
<pre><code translate="no">./<span class="hljs-built_in">bin</span>/spark-shell --jars spark-milvus-<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ol>
<h3 id="Demo" class="common-anchor-header">Demonstração</h3><p>Nesta demonstração, criamos um exemplo de Spark DataFrame com dados vetoriais e o escrevemos no Milvus através do Conector Spark-Milvus. Uma coleção será criada automaticamente no Milvus com base no esquema e nas opções especificadas.</p>
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
<p>Depois de executar o código acima, pode ver os dados inseridos no Milvus utilizando o SDK ou o Attu (um painel de controlo do Milvus). Pode encontrar uma coleção chamada <code translate="no">hello_spark_milvus</code> criada com 4 entidades já inseridas.</p>
<h2 id="Features--concepts" class="common-anchor-header">Caraterísticas e conceitos<button data-href="#Features--concepts" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-options" class="common-anchor-header">Opções do Milvus</h3><p>Na secção <a href="#Quick-start">Início rápido</a>, mostrámos as opções de configuração durante as operações com o Milvus. Estas opções são abstraídas como Milvus Options. São utilizadas para criar ligações ao Milvus e controlar outros comportamentos do Milvus. Nem todas as opções são obrigatórias.</p>
<table>
<thead>
<tr><th>Opção Chave</th><th>Valor por defeito</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.host</code></td><td><code translate="no">localhost</code></td><td>Anfitrião do servidor Milvus. Para mais informações, consulte <a href="https://milvus.io/docs/manage_connection.md">Gerir ligações Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.port</code></td><td><code translate="no">19530</code></td><td>Porta do servidor Milvus. Para mais pormenores, consulte <a href="https://milvus.io/docs/manage_connection.md">Gerir ligações Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.username</code></td><td><code translate="no">root</code></td><td>Nome de utilizador do servidor Milvus. Para mais informações, consulte <a href="https://milvus.io/docs/manage_connection.md">Gerir ligações Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.password</code></td><td><code translate="no">Milvus</code></td><td>Palavra-passe para o servidor Milvus. Para mais informações, consulte <a href="https://milvus.io/docs/manage_connection.md">Gerir ligações Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.uri</code></td><td><code translate="no">--</code></td><td>URI do servidor Milvus. Para mais informações, consulte <a href="https://milvus.io/docs/manage_connection.md">Gerir ligações Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.token</code></td><td><code translate="no">--</code></td><td>Token do servidor Milvus. Para mais pormenores, consulte <a href="https://milvus.io/docs/manage_connection.md">Gerir ligações Milvus</a>.</td></tr>
<tr><td><code translate="no">milvus.database.name</code></td><td><code translate="no">default</code></td><td>Nome da base de dados do Milvus a ler ou escrever.</td></tr>
<tr><td><code translate="no">milvus.collection.name</code></td><td><code translate="no">hello_milvus</code></td><td>Nome da coleção Milvus a ler ou a escrever.</td></tr>
<tr><td><code translate="no">milvus.collection.primaryKeyField</code></td><td><code translate="no">None</code></td><td>Nome do campo da chave primária na coleção. Obrigatório se a coleção não existir.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorField</code></td><td><code translate="no">None</code></td><td>Nome do campo vetorial da coleção. Obrigatório se a coleção não existir.</td></tr>
<tr><td><code translate="no">milvus.collection.vectorDim</code></td><td><code translate="no">None</code></td><td>Dimensão do campo vetorial na coleção. Obrigatório se a coleção não existir.</td></tr>
<tr><td><code translate="no">milvus.collection.autoID</code></td><td><code translate="no">false</code></td><td>Se a coleção não existir, esta opção especifica se deve gerar automaticamente IDs para as entidades. Para obter mais informações, consulte <a href="https://milvus.io/docs/create_collection.md">create_collection</a></td></tr>
<tr><td><code translate="no">milvus.bucket</code></td><td><code translate="no">a-bucket</code></td><td>Nome do bucket no armazenamento Milvus. Deve ser o mesmo que <code translate="no">minio.bucketName</code> em <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.rootpath</code></td><td><code translate="no">files</code></td><td>Caminho da raiz do armazenamento Milvus. Deve ser o mesmo que <code translate="no">minio.rootpath</code> em <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.fs</code></td><td><code translate="no">s3a://</code></td><td>Sistema de ficheiros do armazenamento Milvus. O valor <code translate="no">s3a://</code> aplica-se ao Spark de código aberto. Utilize <code translate="no">s3://</code> para Databricks.</td></tr>
<tr><td><code translate="no">milvus.storage.endpoint</code></td><td><code translate="no">localhost:9000</code></td><td>Ponto final do armazenamento Milvus. Deve ser o mesmo que <code translate="no">minio.address</code>:<code translate="no">minio.port</code> em <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.user</code></td><td><code translate="no">minioadmin</code></td><td>Utilizador do armazenamento Milvus. Deve ser o mesmo que <code translate="no">minio.accessKeyID</code> em <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.password</code></td><td><code translate="no">minioadmin</code></td><td>Palavra-passe do armazenamento Milvus. Deve ser a mesma que <code translate="no">minio.secretAccessKey</code> em <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
<tr><td><code translate="no">milvus.storage.useSSL</code></td><td><code translate="no">false</code></td><td>Se deve utilizar SSL para o armazenamento Milvus. Deve ser o mesmo que <code translate="no">minio.useSSL</code> em <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a>.</td></tr>
</tbody>
</table>
<h2 id="Milvus-data-format" class="common-anchor-header">Formato de dados do Milvus<button data-href="#Milvus-data-format" class="anchor-icon" translate="no">
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
    </button></h2><p>O conetor Spark-Milvus suporta a leitura e a gravação de dados nos seguintes formatos de dados do Milvus:</p>
<ul>
<li><code translate="no">milvus</code>: Formato de dados do Milvus para conversão contínua do Spark DataFrame para entidades do Milvus.</li>
<li><code translate="no">milvusbinlog</code>: Formato de dados Milvus para leitura de dados binlog incorporados no Milvus.</li>
<li><code translate="no">mjson</code>: Formato JSON do Milvus para inserir dados em massa no Milvus.</li>
</ul>
<h3 id="milvus" class="common-anchor-header">Milvus</h3><p>No <a href="#Quick-start">Quick start</a>, usamos o formato <strong>milvus</strong> para escrever dados de amostra num cluster Milvus. O formato <strong>milvus</strong> é um novo formato de dados que suporta a gravação perfeita de dados Spark DataFrame em Milvus Collections. Isso é obtido por meio de chamadas em lote para a API Insert do SDK do Milvus. Se uma coleção não existir no Milvus, uma nova coleção será criada com base no esquema do Dataframe. No entanto, a coleção criada automaticamente pode não suportar todas as funcionalidades do esquema da coleção. Por conseguinte, recomenda-se que crie primeiro uma coleção através do SDK e, em seguida, utilize o spark-milvus para escrever. Para obter mais informações, consulte <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/InsertDemo.scala">a demonstração</a>.</p>
<h3 id="milvusbinlog" class="common-anchor-header">milvusbinlog</h3><p>O novo formato de dados <strong>milvusbinlog</strong> destina-se à leitura de dados binlog incorporados no Milvus. Binlog é o formato de armazenamento de dados interno do Milvus baseado em parquet. Infelizmente, ele não pode ser lido por uma biblioteca parquet comum, então implementamos este novo formato de dados para ajudar o Spark a lê-lo. Não é recomendado usar <strong>o milvusbinlog</strong> diretamente a menos que você esteja familiarizado com os detalhes do armazenamento interno do Milvus. Sugerimos a utilização da função <a href="#MilvusUtils">MilvusUtils</a> que será introduzida na próxima secção.</p>
<pre><code translate="no" class="language-scalar">val df = spark.read
  .<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;milvusbinlog&quot;</span>)
  .load(path)
  .withColumnRenamed(<span class="hljs-string">&quot;val&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="mjson" class="common-anchor-header">mjson</h3><p>O Milvus fornece a funcionalidade <a href="https://milvus.io/docs/bulk_insert.md">Bulkinsert</a> para um melhor desempenho de escrita ao operar com grandes conjuntos de dados. No entanto, o formato JSON usado pelo Milvus é ligeiramente diferente do formato de saída JSON padrão do Spark. Para resolver isso, introduzimos o formato de dados <strong>mjson</strong> para gerar dados que atendam aos requisitos do Milvus. Aqui está um exemplo que mostra a diferença entre JSON-lines e <strong>mjson</strong>:</p>
<ul>
<li><p>JSON-lines:</p>
<pre><code translate="no" class="language-json">{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">101</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">1.1</span>, <span class="hljs-number">1.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">102</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">2.1</span>, <span class="hljs-number">2.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">3.1</span>, <span class="hljs-number">3.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">104</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">4.1</span>, <span class="hljs-number">4.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">105</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">34</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">5.1</span>, <span class="hljs-number">5.2</span>]}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>mjson (Necessário para o Milvus Bulkinsert):</p>
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
<p>Isto será melhorado no futuro. Recomendamos o uso do formato parquet na integração do spark-milvus se a sua versão do Milvus for v2.3.7+, que suporta bulkinsert com o formato Parquet. Veja a <a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/BulkInsertDemo.scala">demonstração</a> no Github.</p>
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
    </button></h2><p>MilvusUtils contém várias funções utilitárias úteis. Atualmente só é suportado em Scala. Mais exemplos de uso estão na secção <a href="#Advanced-Usage">Uso Avançado</a>.</p>
<h3 id="MilvusUtilsreadMilvusCollection" class="common-anchor-header">MilvusUtils.readMilvusCollection</h3><p><strong>MilvusUtils.readMilvusCollection</strong> é uma interface simples para carregar uma coleção inteira do Milvus em um Dataframe do Spark. Ela envolve várias operações, incluindo a chamada ao Milvus SDK, a leitura <strong>do milvusbinlog</strong> e operações comuns de união/join.</p>
<pre><code translate="no" class="language-scala"><span class="hljs-type">val</span> <span class="hljs-variable">collectionDF</span> <span class="hljs-operator">=</span> MilvusUtils.readMilvusCollection(spark, milvusOptions)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MilvusUtilsbulkInsertFromSpark" class="common-anchor-header">MilvusUtils.bulkInsertFromSpark</h3><p><strong>MilvusUtils.bulkInsertFromSpark</strong> fornece uma maneira conveniente de importar arquivos de saída Spark para o Milvus em um grande lote. Ele envolve a API <strong>Bullkinsert</strong> do SDK do Milvus.</p>
<pre><code translate="no" class="language-scala">df.write.<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;parquet&quot;</span>).save(outputPath)
MilvusUtils.bulkInsertFromSpark(spark, milvusOptions, outputPath, <span class="hljs-string">&quot;parquet&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Advanced-Usage" class="common-anchor-header">Uso avançado<button data-href="#Advanced-Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Nesta secção, encontrará exemplos de utilização avançada do Conector Spark-Milvus para análise e migração de dados. Para mais demonstrações, consulte <a href="https://github.com/zilliztech/spark-milvus/tree/main/examples/src/main/scala">exemplos</a>.</p>
<h3 id="MySQL---embedding---Milvus" class="common-anchor-header">MySQL -&gt; incorporação -&gt; Milvus</h3><p>Nesta demonstração, iremos</p>
<ol>
<li>Ler dados do MySQL através do Conector Spark-MySQL,</li>
<li>Gerar embedding (usando Word2Vec como exemplo), e</li>
<li>Escrever dados incorporados no Milvus.</li>
</ol>
<p>Para habilitar o Conector Spark-MySQL, é necessário adicionar a seguinte dependência ao seu ambiente Spark:</p>
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
<h3 id="Milvus---Transform---Milvus" class="common-anchor-header">Milvus -&gt; Transformar -&gt; Milvus</h3><p>Nesta demonstração, nós iremos</p>
<ol>
<li>Ler dados de uma coleção Milvus,</li>
<li>Aplicar uma transformação (usando PCA como exemplo), e</li>
<li>Escrever os dados transformados em outro Milvus através da API Bulkinsert.</li>
</ol>
<div class="alert notes">
<p>O modelo PCA é um modelo de transformação que reduz a dimensionalidade dos vectores de incorporação, o que é uma operação comum na aprendizagem automática. Pode adicionar quaisquer outras operações de processamento, como filtragem, junção ou normalização, ao passo de transformação.</p>
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
<h3 id="Databricks---Zilliz-Cloud" class="common-anchor-header">Databricks -&gt; Zilliz Cloud</h3><p>Se estiver a utilizar o Zilliz Cloud (o serviço Milvus gerido), pode tirar partido da sua conveniente API de importação de dados. O Zilliz Cloud fornece ferramentas e documentação abrangentes para o ajudar a mover eficientemente os seus dados de várias fontes de dados, incluindo Spark e Databricks. Basta configurar um bucket S3 como intermediário e abrir o seu acesso à sua conta Zilliz Cloud. A API de importação de dados do Zilliz Cloud carregará automaticamente o lote completo de dados do bucket S3 para o seu cluster Zilliz Cloud.</p>
<p><strong>Preparativos</strong></p>
<ol>
<li><p>Carregue o tempo de execução do Spark adicionando um ficheiro jar ao seu Databricks Cluster.</p>
<p>É possível instalar uma biblioteca de diferentes maneiras. Esta captura de tela mostra o upload de um jar do local para o cluster. Para obter mais informações, consulte <a href="https://docs.databricks.com/en/libraries/cluster-libraries.html">Bibliotecas de cluster</a> na documentação do Databricks.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/install-databricks-library.png" alt="Install Databricks Library" class="doc-image" id="install-databricks-library" />
   </span> <span class="img-wrapper"> <span>Instalar a biblioteca Databricks</span> </span></p></li>
<li><p>Crie um bucket S3 e configure-o como um local de armazenamento externo para o seu cluster Databricks.</p>
<p>O Bulkinsert exigia que os dados fossem armazenados em um bucket temporário para que o Zilliz Cloud pudesse importar os dados em um lote. É possível criar um bucket S3 e configurá-lo como um local externo do Databricks. Consulte <a href="https://docs.databricks.com/en/sql/language-manual/sql-ref-external-locations.html">Locais externos</a> para obter detalhes.</p></li>
<li><p>Proteja suas credenciais do Databricks.</p>
<p>Para obter mais detalhes, consulte as instruções no blogue <a href="https://www.databricks.com/blog/2018/06/04/securely-managing-credentials-in-databricks.html">Gerir credenciais de forma segura no Databricks</a>.</p></li>
</ol>
<p><strong>Demonstração</strong></p>
<p>Aqui está um trecho de código que mostra o processo de migração de dados em lote. Semelhante ao exemplo do Milvus acima, você só precisa substituir a credencial e o endereço do bucket S3.</p>
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
<h2 id="Hands-on" class="common-anchor-header">Prática<button data-href="#Hands-on" class="anchor-icon" translate="no">
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
    </button></h2><p>Para o ajudar a começar rapidamente a utilizar o Conector Spark-Milvus, preparámos um bloco de notas que o orienta através dos processos de transferência de dados em fluxo contínuo e em lote, com o Milvus e o Zilliz Cloud.</p>
<ul>
<li><a href="https://zilliz.com/databricks_zilliz_demos">Hands-on do Conector Spark-Milvus</a></li>
</ul>
