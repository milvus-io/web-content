---
id: es2m.md
summary: >-
  Este guia fornece um processo abrangente e passo a passo para migrar dados do
  Elasticsearch para o Milvus 2.x.
title: Do Elasticsearch
---
<h1 id="From-Elasticsearch" class="common-anchor-header">Do Elasticsearch<button data-href="#From-Elasticsearch" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia fornece um processo abrangente e passo a passo para a migração de dados do Elasticsearch para o Milvus 2.x. Ao seguir este guia, poderá transferir os seus dados de forma eficiente, tirando partido das funcionalidades avançadas do Milvus 2.x e de um desempenho melhorado.</p>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>Versões de software</strong>:<ul>
<li>Elasticsearch de origem: 7.x ou 8.x</li>
<li>Milvus de destino: 2.x</li>
<li>Para obter detalhes sobre a instalação, consulte <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html">Instalação do Elasticsearch</a> e <a href="https://milvus.io/docs/install_standalone-docker.md">Instalação do Milvus</a>.</li>
</ul></li>
<li><strong>Ferramentas necessárias</strong>:<ul>
<li>Ferramenta<a href="https://github.com/zilliztech/milvus-migration">de migração do Milvus</a>. Para obter detalhes sobre a instalação, consulte <a href="/docs/pt/v2.4.x/milvusdm_install.md">Instalar a ferramenta de migração</a>.</li>
</ul></li>
<li><strong>Tipos de dados suportados para migração</strong>: Os campos a migrar do índice Elasticsearch de origem são dos seguintes tipos - <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>. Os tipos de dados não listados aqui não são atualmente suportados para migração. Consulte a <a href="#field-mapping-reference">Referência de mapeamento de campo</a> para obter informações detalhadas sobre mapeamentos de dados entre colecções Milvus e índices Elasticsearch.</li>
<li><strong>Requisitos do índice Elasticsearch</strong>:<ul>
<li>O índice Elasticsearch de origem tem de conter um campo de vetor do tipo <code translate="no">dense_vector</code>. A migração não pode ser iniciada sem um campo de vetor.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration-file" class="common-anchor-header">Configurar o ficheiro de migração<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Salve o arquivo de configuração de migração de exemplo como <code translate="no">migration.yaml</code> e modifique as configurações com base nas suas condições reais. Você pode colocar o arquivo de configuração em qualquer diretório local.</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    workMode: <span class="hljs-string">&quot;elasticsearch&quot;</span> <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: <span class="hljs-number">2500</span> <span class="hljs-comment"># buffer size to read from Elasticsearch in each batch. A value ranging from 2000 to 4000 is recommended.</span>
meta: <span class="hljs-comment"># meta configs for the source Elasticsearch index and target Milvus 2.x collection.</span>
  mode: <span class="hljs-string">&quot;config&quot;</span> <span class="hljs-comment"># specifies the source for meta configs. currently, onlly `config` is supported.</span>
  version: <span class="hljs-string">&quot;8.9.1&quot;</span>
  index: <span class="hljs-string">&quot;qatest_index&quot;</span> <span class="hljs-comment"># identifies the Elasticsearch index to migrate data from.</span>
  fields: <span class="hljs-comment"># fields within the Elasticsearch index to be migrated.</span>
  - name: <span class="hljs-string">&quot;my_vector&quot;</span> <span class="hljs-comment"># name of the Elasticsearch field.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;dense_vector&quot;</span> <span class="hljs-comment"># data type of the Elasticsearch field.</span>
    dims: <span class="hljs-number">128</span> <span class="hljs-comment"># dimension of the vector field. required only when `type` is `dense_vector`.</span>
  - name: <span class="hljs-string">&quot;id&quot;</span>
    pk: true <span class="hljs-comment"># specifies if the field serves as a primary key.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;long&quot;</span>
  - name: <span class="hljs-string">&quot;num&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;integer&quot;</span>
  - name: <span class="hljs-string">&quot;double1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;double&quot;</span>
  - name: <span class="hljs-string">&quot;text1&quot;</span>
    maxLen: <span class="hljs-number">1000</span> <span class="hljs-comment"># max. length of data fields. required only for `keyword` and `text` data types.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;text&quot;</span>
  - name: <span class="hljs-string">&quot;bl1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;boolean&quot;</span>
  - name: <span class="hljs-string">&quot;float1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;float&quot;</span>
  milvus: <span class="hljs-comment"># configs specific to creating the collection in Milvus 2.x</span>
    collection: <span class="hljs-string">&quot;Collection_01&quot;</span> <span class="hljs-comment"># name of the Milvus collection. defaults to the Elasticsearch index name if not specified.</span>
    closeDynamicField: false <span class="hljs-comment"># specifies whether to disable the dynamic field in the collection. defaults to `false`.</span>
    shardNum: <span class="hljs-number">2</span> <span class="hljs-comment"># number of shards to be created in the collection.</span>
    consistencyLevel: Strong <span class="hljs-comment"># consistency level for Milvus collection.</span>
source: <span class="hljs-comment"># connection configs for the source Elasticsearch server</span>
  es:
    urls:
    - <span class="hljs-string">&quot;http://10.15.1.***:9200&quot;</span> <span class="hljs-comment"># address of the source Elasticsearch server.</span>
    username: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># username for the Elasticsearch server.</span>
    password: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># password for the Elasticsearch server.</span>
target:
  mode: <span class="hljs-string">&quot;remote&quot;</span> <span class="hljs-comment"># storage location for dumped files. valid values: `remote` and `local`.</span>
  remote: <span class="hljs-comment"># configs for remote storage</span>
    outputDir: <span class="hljs-string">&quot;migration/milvus/test&quot;</span> <span class="hljs-comment"># output directory path in the cloud storage bucket.</span>
    cloud: <span class="hljs-string">&quot;aws&quot;</span> <span class="hljs-comment"># cloud storage service provider. Examples: `aws`, `gcp`, `azure`, etc.</span>
    region: <span class="hljs-string">&quot;us-west-2&quot;</span> <span class="hljs-comment"># region of the cloud storage; can be any value if using local Minio.</span>
    bucket: <span class="hljs-string">&quot;zilliz-aws-us-****-*-********&quot;</span> <span class="hljs-comment"># bucket name for storing data; must align with configs in milvus.yaml for Milvus 2.x.</span>
    useIAM: true <span class="hljs-comment"># whether to use an IAM Role for connection.</span>
    checkBucket: false <span class="hljs-comment"># checks if the specified bucket exists in the storage.</span>
  milvus2x: <span class="hljs-comment"># connection configs for the target Milvus 2.x server</span>
    endpoint: <span class="hljs-string">&quot;http://10.102.*.**:19530&quot;</span> <span class="hljs-comment"># address of the target Milvus server.</span>
    username: <span class="hljs-string">&quot;****&quot;</span> <span class="hljs-comment"># username for the Milvus 2.x server.</span>
    password: <span class="hljs-string">&quot;******&quot;</span> <span class="hljs-comment"># password for the Milvus 2.x server.</span>
<button class="copy-code-btn"></button></code></pre>
<p>A tabela a seguir descreve os parâmetros no arquivo de configuração de exemplo. Para obter uma lista completa de configurações, consulte <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">Milvus Migration: Elasticsearch para Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>O modo operacional do trabalho de migração. Definir para <code translate="no">elasticsearch</code> quando migrar a partir de índices do Elasticsearch.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Tamanho do buffer a ler do Elasticsearch em cada lote. Unidade: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Especifica a fonte para meta configs. Atualmente, apenas <code translate="no">config</code> é suportado.</td></tr>
<tr><td><code translate="no">meta.index</code></td><td>Identifica o índice do Elasticsearch a partir do qual migrar os dados.</td></tr>
<tr><td><code translate="no">meta.fields</code></td><td>Campos no índice do Elasticsearch a serem migrados.</td></tr>
<tr><td><code translate="no">meta.fields.name</code></td><td>Nome do campo do Elasticsearch.</td></tr>
<tr><td><code translate="no">meta.fields.maxLen</code></td><td>Comprimento máximo do campo. Este parâmetro só é necessário quando <code translate="no">meta.fields.type</code> é <code translate="no">keyword</code> ou <code translate="no">text</code>.</td></tr>
<tr><td><code translate="no">meta.fields.pk</code></td><td>Especifica se o campo serve como chave primária.</td></tr>
<tr><td><code translate="no">meta.fields.type</code></td><td>Tipo de dados do campo do Elasticsearch. Atualmente, são suportados os seguintes tipos de dados no Elasticsearch: <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>.</td></tr>
<tr><td><code translate="no">meta.fields.dims</code></td><td>Dimensão do campo de vetor. Esse parâmetro é necessário apenas quando <code translate="no">meta.fields.type</code> é <code translate="no">dense_vector</code>.</td></tr>
<tr><td><code translate="no">meta.milvus</code></td><td>Configurações específicas para a criação da coleção no Milvus 2.x.</td></tr>
<tr><td><code translate="no">meta.milvus.collection</code></td><td>Nome da coleção Milvus. A predefinição é o nome do índice do Elasticsearch se não for especificado.</td></tr>
<tr><td><code translate="no">meta.milvus.closeDynamicField</code></td><td>Especifica se pretende desativar o campo dinâmico na coleção. A predefinição é <code translate="no">false</code>. Para obter mais informações sobre campos dinâmicos, consulte <a href="https://milvus.io/docs/enable-dynamic-field.md#Enable-Dynamic-Field">Ativar campo dinâmico</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.shardNum</code></td><td>Número de shards a serem criados na coleção. Para obter mais informações sobre shards, consulte <a href="https://milvus.io/docs/glossary.md#Shard">Terminologia</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.consistencyLevel</code></td><td>Nível de consistência para a coleção em Milvus. Para obter mais informações, consulte <a href="https://milvus.io/docs/consistency.md">Consistência</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.es</code></td><td>Configurações de ligação para o servidor Elasticsearch de origem.</td></tr>
<tr><td><code translate="no">source.es.urls</code></td><td>Endereço do servidor Elasticsearch de origem.</td></tr>
<tr><td><code translate="no">source.es.username</code></td><td>Nome de utilizador para o servidor Elasticsearch.</td></tr>
<tr><td><code translate="no">source.es.password</code></td><td>Palavra-passe para o servidor Elasticsearch.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>Local de armazenamento dos ficheiros descarregados. Valores válidos:<br/>- <code translate="no">local</code>: Armazenar os ficheiros despejados em discos locais.<br/>- <code translate="no">remote</code>: Armazenar os ficheiros despejados no armazenamento de objectos.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Caminho do diretório de saída no bucket de armazenamento em nuvem.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Fornecedor de serviços de armazenamento na nuvem. Valores de exemplo: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Região de armazenamento em nuvem. Pode ser qualquer valor se você usar o MinIO local.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nome do bucket para armazenamento de dados. O valor deve ser o mesmo que o configurado no Milvus 2.x. Para mais informações, consulte <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Configurações do sistema</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Se deve ser utilizada uma função IAM para a ligação.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Se deve verificar se o bucket especificado existe no armazenamento de objetos.</td></tr>
<tr><td><code translate="no">target.milvus2x</code></td><td>Configurações de conexão para o servidor Milvus 2.x de destino.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Endereço do servidor Milvus de destino.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nome de utilizador para o servidor Milvus 2.x. Este parâmetro é necessário se a autenticação do utilizador estiver activada para o seu servidor Milvus. Para mais informações, consulte <a href="https://milvus.io/docs/authenticate.md">Enable Authentication (Ativar autenticação</a>).</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Password para o servidor Milvus 2.x. Este parâmetro é necessário se a autenticação do utilizador estiver activada para o seu servidor Milvus. Para obter mais informações, consulte <a href="https://milvus.io/docs/authenticate.md">Ativar a autenticação</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">Iniciar a tarefa de migração<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><p>Inicie a tarefa de migração com o seguinte comando. Substitua <code translate="no">{YourConfigFilePath}</code> pelo diretório local onde reside o ficheiro de configuração <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>O seguinte é um exemplo de uma saída de registo de migração bem sucedida:</p>
<pre><code translate="no" class="language-bash">[task/load_base_task.go:94] [<span class="hljs-string">&quot;[LoadTasker] Dec Task Processing--------------&gt;&quot;</span>] [Count=0] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[task/load_base_task.go:76] [<span class="hljs-string">&quot;[LoadTasker] Progress Task ---------------&gt;&quot;</span>] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[dbclient/cus_field_milvus2x.go:86] [<span class="hljs-string">&quot;[Milvus2x] begin to ShowCollectionRows&quot;</span>]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static: &quot;</span>] [collection=test_mul_field4_rename1] [beforeCount=50000] [afterCount=100000] [increase=50000]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static Total&quot;</span>] [<span class="hljs-string">&quot;Total Collections&quot;</span>=1] [beforeTotalCount=50000] [afterTotalCount=100000] [totalIncrease=50000]
[migration/es_starter.go:25] [<span class="hljs-string">&quot;[Starter] migration ES to Milvus finish!!!&quot;</span>] [Cost=80.009174459]
[starter/starter.go:106] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=80.00928425]
[cleaner/remote_cleaner.go:27] [<span class="hljs-string">&quot;[Remote Cleaner] Begin to clean files&quot;</span>] [bucket=a-bucket] [rootPath=testfiles/output/zwh/migration]
[cmd/start.go:32] [<span class="hljs-string">&quot;[Cleaner] clean file success!&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-result" class="common-anchor-header">Verificar o resultado<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de a tarefa de migração ser executada, pode fazer chamadas à API ou utilizar o Attu para ver o número de entidades migradas. Para obter mais informações, consulte <a href="https://github.com/zilliztech/attu">Attu</a> e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
<h2 id="Field-mapping-reference" class="common-anchor-header">Referência de mapeamento de campo<button data-href="#Field-mapping-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>Analise a tabela abaixo para entender como os tipos de campo nos índices do Elasticsearch são mapeados para os tipos de campo nas coleções do Milvus.</p>
<p>Para obter mais informações sobre os tipos de dados suportados no Milvus, consulte <a href="https://milvus.io/docs/schema.md#Supported-data-types">Tipos de dados suportados</a>.</p>
<table>
<thead>
<tr><th>Tipo de campo do Elasticsearch</th><th>Tipo de campo do Milvus</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td>vector_denso</td><td>FloatVector</td><td>As dimensões do vetor permanecem inalteradas durante a migração.</td></tr>
<tr><td>palavra-chave</td><td>VarChar</td><td>Define o comprimento máximo (1 a 65.535). As cadeias de caracteres que excedam o limite podem provocar erros de migração.</td></tr>
<tr><td>text</td><td>VarChar</td><td>Definir o comprimento máximo (1 a 65.535). As cadeias de caracteres que excedam o limite podem provocar erros de migração.</td></tr>
<tr><td>long</td><td>Int64</td><td>-</td></tr>
<tr><td>integer</td><td>Int32</td><td>-</td></tr>
<tr><td>double</td><td>Double</td><td>-</td></tr>
<tr><td>float</td><td>Float</td><td>-</td></tr>
<tr><td>booleano</td><td>bool</td><td>-</td></tr>
<tr><td>objeto</td><td>JSON</td><td>-</td></tr>
</tbody>
</table>
