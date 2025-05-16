---
id: f2m.md
title: De Faiss
related_key: 'Faiss, migrate, import'
summary: Saiba como migrar os dados do Faiss para o Milvus.
---
<h1 id="From-Faiss" class="common-anchor-header">Do Faiss<button data-href="#From-Faiss" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia fornece um processo abrangente e passo a passo para a migração de dados do Faiss para o Milvus 2.x. Seguindo este guia, poderá transferir os seus dados de forma eficiente, tirando partido das funcionalidades avançadas do Milvus 2.x e de um melhor desempenho.</p>
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
<li>Fonte Faiss</li>
<li>Milvus de destino: 2.x</li>
<li>Para obter detalhes sobre a instalação, consulte <a href="https://github.com/facebookresearch/faiss/blob/main/INSTALL.md">Instalação do Faiss</a> e <a href="https://milvus.io/docs/install_standalone-docker.md">Instalação do Milvus</a>.</li>
</ul></li>
<li><strong>Ferramentas necessárias</strong>:<ul>
<li>Ferramenta<a href="https://github.com/zilliztech/milvus-migration">de migração do Milvus</a>. Para obter detalhes sobre a instalação, consulte <a href="/docs/pt/v2.4.x/milvusdm_install.md">Instalar a ferramenta de migração</a>.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration" class="common-anchor-header">Configurar a migração<button data-href="#Configure-the-migration" class="anchor-icon" translate="no">
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
    </button></h2><p>Guarde o ficheiro de configuração de migração de exemplo como <code translate="no">migration.yaml</code> e modifique as configurações com base nas suas condições reais. Pode colocar o ficheiro de configuração em qualquer diretório local.</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: faiss    <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 2
<span class="hljs-built_in">source</span>: <span class="hljs-comment"># configs for the source Faiss index.</span>
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    faissFile: ./testfiles/faiss/faiss_ivf_flat.index

target: <span class="hljs-comment"># configs for the target Milvus collection.</span>
  create:
    collection:
      name: test1w
      shardsNums: 2
      dim: 256
      metricType: L2

  mode: remote
  remote:
    outputDir: testfiles/output/
    cloud: aws
    endpoint: 0.0.0.0:9000
    region: ap-southeast-1
    bucket: a-bucket
    ak: minioadmin
    sk: minioadmin
    useIAM: <span class="hljs-literal">false</span>
    useSSL: <span class="hljs-literal">false</span>
    checkBucket: <span class="hljs-literal">true</span>
  milvus2x:
    endpoint: localhost:19530
    username: xxxxx
    password: xxxxx

<button class="copy-code-btn"></button></code></pre>
<p>A tabela seguinte descreve os parâmetros no ficheiro de configuração de exemplo. Para obter uma lista completa das configurações, consulte <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">Milvus Migration: Faiss para Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>A simultaneidade de threads do dumper.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>O modo operacional da tarefa de migração. Definido como faiss quando migrar a partir de índices Faiss.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Tamanho do buffer para ler de Faiss em cada lote. Unidade: KB.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Tamanho do buffer para escrever em Milvus em cada lote. Unidade: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição do parâmetro</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>A simultaneidade das threads do carregador.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Especifica de onde são lidos os ficheiros de origem. Valores válidos:<br/>- <code translate="no">local</code>: lê ficheiros a partir de um disco local.<br/>- <code translate="no">remote</code>: lê ficheiros a partir de armazenamento remoto.</td></tr>
<tr><td><code translate="no">source.local.faissFile</code></td><td>O caminho do diretório onde estão localizados os ficheiros de origem. Por exemplo, <code translate="no">/db/faiss.index</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.create.collection.name</code></td><td>Nome da coleção Milvus.</td></tr>
<tr><td><code translate="no">target.create.collection.shardsNums</code></td><td>Número de shards a serem criados na coleção. Para mais informações sobre os fragmentos, consulte <a href="https://milvus.io/docs/glossary.md#Shard">Terminologia</a>.</td></tr>
<tr><td><code translate="no">target.create.collection.dim</code></td><td>Dimensão do campo vetorial.</td></tr>
<tr><td><code translate="no">target.create.collection.metricType</code></td><td>Tipo de métrica utilizada para medir as semelhanças entre os vectores. Para obter mais informações, consulte <a href="https://milvus.io/docs/glossary.md#Metric-type">Terminologia</a>.</td></tr>
<tr><td><code translate="no">target.mode</code></td><td>Local de armazenamento dos ficheiros despejados. Valores válidos:<br/>- <code translate="no">local</code>: Armazena os arquivos despejados em discos locais.<br/>- <code translate="no">remote</code>: Armazena os arquivos despejados no armazenamento de objetos.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Caminho do diretório de saída no bucket de armazenamento em nuvem.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Fornecedor de serviços de armazenamento na nuvem. Valores de exemplo: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.endpoint</code></td><td>Ponto final do armazenamento Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Região de armazenamento na nuvem. Pode ser qualquer valor se utilizar o MinIO local.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nome do bucket para armazenamento de dados. O valor deve ser o mesmo que o da configuração no Milvus 2.x. Para mais informações, consulte <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Configurações do sistema</a>.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Chave de acesso para o armazenamento do Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Chave secreta para o armazenamento do Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Se deve ser utilizada uma função IAM para a ligação.</td></tr>
<tr><td><code translate="no">target.remote.useSSL</code></td><td>Se deve ser ativado o SSL durante a ligação ao Milvus 2.x. Para mais informações, consulte <a href="https://milvus.io/docs/tls.md#Encryption-in-Transit">Encryption in Transit (Encriptação em trânsito</a>).</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Se deve verificar se o intervalo especificado existe no armazenamento de objectos.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Endereço do servidor Milvus de destino.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nome de utilizador para o servidor Milvus 2.x. Este parâmetro é necessário se a autenticação do utilizador estiver activada para o servidor Milvus. Para mais informações, consulte <a href="https://milvus.io/docs/authenticate.md">Ativar a autenticação</a>.</td></tr>
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
    </button></h2><ol>
<li><p>Inicie a tarefa de migração com o seguinte comando. Substitua <code translate="no">{YourConfigFilePath}</code> pelo diretório local onde reside o ficheiro de configuração <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>O comando acima converte os dados do índice Faiss em arquivos NumPy e, em seguida, usa a operação <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> para gravar os dados no bucket de destino.</p></li>
<li><p>Uma vez gerados os ficheiros NumPy, importe estes ficheiros para o Milvus 2.x com o seguinte comando. Substitua <code translate="no">{YourConfigFilePath}</code> pelo diretório local onde reside o ficheiro de configuração <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>Assim que a tarefa de migração for executada, pode fazer chamadas à API ou utilizar o Attu para ver o número de entidades migradas. Para obter mais informações, consulte <a href="https://github.com/zilliztech/attu">Attu</a> e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
