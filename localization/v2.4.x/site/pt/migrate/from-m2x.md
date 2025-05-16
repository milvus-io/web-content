---
id: from-m2x.md
summary: >-
  Este guia fornece um processo abrangente e passo a passo para a migração de
  dados do Milvus 2.3.x para o Milvus 2.3.x ou superior.
title: De Milvus 2.3.x
---
<h1 id="From-Milvus-23x" class="common-anchor-header">Do Milvus 2.3.x<button data-href="#From-Milvus-23x" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia fornece um processo abrangente e passo a passo para a migração de dados do Milvus 2.3.x para o Milvus 2.3.x ou superior.</p>
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
<li>Milvus de origem: 2.3.0+ (A ferramenta usa o iterador para buscar dados de coleta de origem, exigindo que o Milvus de origem seja a versão 2.3.0 ou superior).</li>
<li>Milvus de destino: 2.3.0+</li>
</ul></li>
<li><strong>Ferramentas necessárias</strong>:<ul>
<li>Ferramenta<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>. Para obter detalhes sobre a instalação, consulte <a href="/docs/pt/v2.4.x/milvusdm_install.md">Instalar a ferramenta de migração</a>.</li>
</ul></li>
<li><strong>Preparação dos dados</strong>:<ul>
<li>Certifique-se de que a coleção de origem do Milvus está carregada e pronta para a exportação de dados.</li>
<li>Se o Milvus de destino não contiver uma coleção correspondente à coleção de origem, a ferramenta <a href="https://github.com/zilliztech/milvus-migration">milvus-migration</a> cria-a automaticamente. Tenha em atenção que, após a migração, a coleção de destino não será indexada e, posteriormente, terá de indexar manualmente a coleção.</li>
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
    </button></h2><p>Guarde o ficheiro de configuração de migração de exemplo como <code translate="no">migration.yaml</code> e modifique as configurações com base nas suas condições reais. Você pode colocar o arquivo de configuração em qualquer diretório local.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    workMode: milvus2x
    reader:
      bufferSize: 500

meta:
  mode: config
  version: 2.3.0
  collection: src_table_name

<span class="hljs-built_in">source</span>:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx

target:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx
<button class="copy-code-btn"></button></code></pre>
<p>A tabela a seguir descreve os parâmetros no arquivo de configuração de exemplo. Para obter mais informações, consulte <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Migração do Milvus: Milvus2.x para Milvus2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>O modo operacional da tarefa de migração. Defina como milvus2x quando migrar do Milvus 2.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Tamanho do buffer a ler do Milvus 2.x em cada lote.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Especifica de onde o meta-arquivo é lido. Definido como config, indicando que a meta configuração pode ser obtida a partir deste ficheiro migration.yaml.</td></tr>
<tr><td><code translate="no">meta.version</code></td><td>Versão do Milvus de origem. Definido para 2.3.0 ou superior.</td></tr>
<tr><td><code translate="no">meta.collection</code></td><td>Nome da coleção de origem.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.milvus2x.endpoint</code></td><td>Endereço do servidor Milvus de origem.</td></tr>
<tr><td><code translate="no">source.milvus2x.username</code></td><td>Nome de utilizador do servidor Milvus de origem. Este parâmetro é necessário se a autenticação do utilizador estiver activada no seu servidor Milvus. Para mais informações, consulte <a href="/docs/pt/v2.4.x/authenticate.md">Ativar a autenticação</a>.</td></tr>
<tr><td><code translate="no">source.milvus2x.password</code></td><td>Password for the source Milvus server (Palavra-passe para o servidor Milvus de origem). Este parâmetro é necessário se a autenticação do utilizador estiver activada no seu servidor Milvus. Para mais informações, consulte <a href="/docs/pt/v2.4.x/authenticate.md">Ativar a autenticação</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Endereço do servidor Milvus de destino.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nome de utilizador do servidor Milvus de destino. Este parâmetro é necessário se a autenticação do utilizador estiver activada para o seu servidor Milvus. Para mais informações, consulte <a href="/docs/pt/v2.4.x/authenticate.md">Ativar a autenticação</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Password for the target Milvus server (Palavra-passe para o servidor Milvus de destino). Este parâmetro é necessário se a autenticação do utilizador estiver activada para o seu servidor Milvus. Para mais informações, consulte <a href="/docs/pt/v2.4.x/authenticate.md">Enable Authentication (Ativar autenticação</a>).</td></tr>
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
    </button></h2><p>Tem duas opções para iniciar a tarefa de migração: utilizar o CLI ou efetuar pedidos de API. Escolha a que melhor se adapta às suas necessidades.</p>
<h3 id="Option-1-Using-CLI" class="common-anchor-header">Opção 1: Usando a CLI</h3><p>Inicie a tarefa de migração com o seguinte comando. Substitua <code translate="no">{YourConfigFilePath}</code> pelo diretório local onde reside o arquivo de configuração <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Monitore os logs para atualizações de progresso. Os logs de migração bem-sucedidos devem incluir entradas como:</p>
<pre><code translate="no" class="language-bash">[INFO] [migration/milvus2x_starter.go:79] [<span class="hljs-string">&quot;=================&gt;JobProcess!&quot;</span>] [Percent=100]
[INFO] [migration/milvus2x_starter.go:27] [<span class="hljs-string">&quot;[Starter] migration Milvus2x to Milvus2x finish!!!&quot;</span>] [Cost=94.877717375]
[INFO] [starter/starter.go:109] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=94.878243583]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Making-API-requests" class="common-anchor-header">Opção 2: Fazer solicitações de API</h3><p>Você também pode usar a API Restful para executar a migração. Inicie o servidor da API com:</p>
<pre><code translate="no" class="language-bash">./milvus-migration server run -p 8080
<button class="copy-code-btn"></button></code></pre>
<p>Depois que o servidor for iniciado com êxito, coloque o arquivo <code translate="no">migration.yaml</code> no diretório <code translate="no">configs/</code> do projeto e inicie a migração usando:</p>
<pre><code translate="no" class="language-bash">curl -XPOST http://localhost:8080/api/v1/start
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
    </button></h2><p>Depois que a tarefa de migração for concluída, use o Attu para exibir o número de entidades migradas. Além disso, você pode criar índices e carregar coleções no Attu. Para obter mais informações, consulte <a href="https://github.com/zilliztech/attu">Attu</a> e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
<h2 id="Additional-configuration-options" class="common-anchor-header">Opções de configuração adicionais<button data-href="#Additional-configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Além das configurações básicas mencionadas acima, você também pode adicionar configurações adicionais com base em seus requisitos específicos.</p>
<ul>
<li><p><strong>Migração selectiva de campos</strong>: Se precisar de migrar apenas campos específicos numa coleção em vez de todos os campos, especifique os campos a serem migrados na secção <code translate="no">meta</code> do ficheiro <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml">meta:
  fields:
    - name: <span class="hljs-built_in">id</span>
    - name: title_vector
    - name: reading_time
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Coleção de destino personalizada</strong>: Para personalizar as propriedades da coleção de destino, adicione as configurações relacionadas na secção <code translate="no">meta</code> do ficheiro <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">meta</span>:
  <span class="hljs-attr">milvus</span>:
    <span class="hljs-attr">collection</span>: target_collection_name
    <span class="hljs-attr">shardNum</span>: <span class="hljs-number">2</span>
    <span class="hljs-attr">closeDynamicField</span>: <span class="hljs-literal">false</span>
    <span class="hljs-attr">consistencyLevel</span>: <span class="hljs-title class_">Customized</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Para obter informações detalhadas, consulte <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Migração do Milvus: Milvus2.x para Milvus2.x</a>.</p>
