---
id: m2m.md
summary: >-
  Este guia fornece um processo abrangente e passo a passo para a migração de
  dados do Milvus 1.x (incluindo 0.9.x e superior) para o Milvus 2.x.
title: De Milvus 1.x
---
<h1 id="From-Milvus-1x" class="common-anchor-header">Do Milvus 1.x<button data-href="#From-Milvus-1x" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia fornece um processo abrangente, passo a passo, para a migração de dados do Milvus 1.x (incluindo 0.9.x e superior) para o Milvus 2.x. Seguindo este guia, você será capaz de transferir seus dados de forma eficiente, aproveitando os recursos avançados do Milvus 2.x e melhor desempenho.</p>
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
<li>Milvus de origem: 0.9.x a 1.x</li>
<li>Milvus de destino: 2.x</li>
</ul></li>
<li><strong>Ferramentas necessárias</strong>:<ul>
<li>Ferramenta<a href="https://github.com/zilliztech/milvus-migration">de migração do Milvus</a>. Para obter detalhes sobre a instalação, consulte <a href="/docs/pt/v2.4.x/milvusdm_install.md">Instalar a ferramenta de migração</a>.</li>
</ul></li>
</ul>
<h2 id="Export-metadata-of-the-source-Milvus-installation" class="common-anchor-header">Exportar metadados da instalação de origem do Milvus<button data-href="#Export-metadata-of-the-source-Milvus-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Para preparar os dados de migração para o Milvus 0.9.x até 1.x, pare o Milvus de origem ou, pelo menos, pare de efetuar quaisquer operações DML no mesmo.</p>
<ol>
<li><p>Exportar os metadados da instalação de origem do Milvus para <code translate="no">meta.json</code>.</p>
<ul>
<li>Para as instalações que utilizam o MySQL como backend, execute</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -m <span class="hljs-string">&quot;user:password@tcp(adderss)/milvus?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span> -o outputDir
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Para as instalações que utilizam o SQLite como backend, execute</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -s /milvus/db/meta.sqlite -o outputDir
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Copie a pasta <code translate="no">tables</code> da sua instalação Milvus e, em seguida, mova ambas as pastas <code translate="no">meta.json</code> e <code translate="no">tables</code> para uma pasta vazia.</p>
<p>Uma vez concluída esta etapa, a estrutura da pasta vazia deve ter o seguinte aspeto:</p>
<pre><code translate="no">migration_data
├── meta.json
└── tables
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Carregue a pasta preparada no passo anterior para um bucket de armazenamento em bloco S3 ou utilize diretamente esta pasta local na secção seguinte.</p></li>
</ol>
<h2 id="Configure-the-migration-file" class="common-anchor-header">Configurar o arquivo de migração<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Salve o arquivo de configuração de migração de exemplo como <code translate="no">migration.yaml</code> e modifique as configurações com base nas suas condições reais. Pode colocar o ficheiro de configuração em qualquer diretório local.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: milvus1x
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 16
meta:
  mode: <span class="hljs-built_in">local</span>
  localFile: /outputDir/test/meta.json
<span class="hljs-built_in">source</span>:
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    tablesDir: /db/tables/
target:
  mode: remote
  remote:
    outputDir: <span class="hljs-string">&quot;migration/test/xx&quot;</span>
    ak: xxxx
    sk: xxxx
    cloud: aws
    region: us-west-2
    bucket: xxxxx
    useIAM: <span class="hljs-literal">true</span>
    checkBucket: <span class="hljs-literal">false</span>
  milvus2x:
    endpoint: <span class="hljs-string">&quot;{yourMilvus2_xServerAddress}:{port}&quot;</span>
    username: xxxx
    password: xxxx
<button class="copy-code-btn"></button></code></pre>
<p>A tabela a seguir descreve os parâmetros no arquivo de configuração de exemplo. Para obter uma lista completa das configurações, consulte <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#migrationyaml-reference">Milvus Migration: Milvus1.x para Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>A simultaneidade de threads do dumper.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>O modo operacional da tarefa de migração. Definido para <code translate="no">milvus1x</code> quando migrar do Milvus 1.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Tamanho do buffer a ler do Milvus 1.x em cada lote. Unidade: KB.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Tamanho do buffer para escrever no Milvus 2.x em cada lote. Unidade: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição do parâmetro</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>A concorrência das threads do carregador.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Especifica de onde é lido o meta ficheiro meta.json. Valores válidos: <code translate="no">local</code>, <code translate="no">remote</code>, <code translate="no">mysql</code>, <code translate="no">sqlite</code>.</td></tr>
<tr><td><code translate="no">meta.localFile</code></td><td>Caminho do diretório local onde reside o ficheiro <code translate="no">meta.json</code>. Esta configuração é utilizada apenas quando <code translate="no">meta.mode</code> está definido como <code translate="no">local</code>. Para outras meta configurações, consulte <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#meta">README_1X</a>.</td></tr>
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
<tr><td><code translate="no">source.local.tablesDir</code></td><td>O caminho do diretório onde estão localizados os ficheiros de origem. Por exemplo, <code translate="no">/db/tables/</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>Local de armazenamento dos ficheiros descarregados. Valores válidos:<br/>- <code translate="no">local</code>: Armazena os arquivos despejados em discos locais.<br/>- <code translate="no">remote</code>: Armazena os arquivos despejados no armazenamento de objetos.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Caminho do diretório de saída no balde de armazenamento na nuvem.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Chave de acesso para o armazenamento Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Chave secreta para o armazenamento Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Fornecedor de serviços de armazenamento na nuvem. Valores de exemplo: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Região de armazenamento na nuvem. Pode ser qualquer valor se utilizar o MinIO local.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Nome do bucket para armazenar dados. O valor deve ser o mesmo que o configurado no Milvus 2.x. Para mais informações, consulte <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Configurações do sistema</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Se deve ser utilizada uma função IAM para a ligação.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Se deve verificar se o intervalo especificado existe no armazenamento de objetos.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Endereço do servidor Milvus de destino.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nome de utilizador para o servidor Milvus 2.x. Este parâmetro é necessário se a autenticação do utilizador estiver activada para o seu servidor Milvus. Para mais informações, consulte <a href="https://milvus.io/docs/authenticate.md">Ativar a autenticação</a>.</td></tr>
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
<p>O comando acima converte os dados de origem no Milvus 1.x em arquivos NumPy e, em seguida, usa a operação <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> para gravar os dados no bucket de destino.</p></li>
<li><p>Uma vez gerados os ficheiros NumPy, importe-os para o Milvus 2.x com o seguinte comando. Substitua <code translate="no">{YourConfigFilePath}</code> pelo diretório local onde reside o ficheiro de configuração <code translate="no">migration.yaml</code>.</p>
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
