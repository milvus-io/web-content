---
id: milvus_backup_cli.md
summary: Saiba como utilizar o Milvus Backup através do CLI
title: Fazer backup e restaurar dados usando comandos
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Fazer backup e restaurar dados usando comandos<button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus Backup oferece funcionalidades de cópia de segurança e restauro de dados para garantir a segurança dos seus dados Milvus.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Obter o Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode descarregar o binário compilado ou construir a partir da fonte.</p>
<p>Para descarregar o binário compilado, vá à página de <a href="https://github.com/zilliztech/milvus-backup/releases">lançamento</a>, onde pode encontrar todos os lançamentos oficiais. Lembre-se, utilize sempre os binários da versão marcada como <strong>Latest</strong>.</p>
<p>Para compilar a partir da fonte, faça o seguinte:</p>
<pre><code translate="no" class="language-shell">git clone git@github.com:zilliztech/milvus-backup.git
go get
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Preparar ficheiro de configuração<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Descarregue o <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml">ficheiro de configuração de exemplo</a> e adapte-o às suas necessidades.</p>
<p>Em seguida, crie uma pasta juntamente com o binário Milvus Backup descarregado ou compilado, dê-lhe o nome de <code translate="no">configs</code> e coloque o ficheiro de configuração dentro da pasta <code translate="no">configs</code>.</p>
<p>A estrutura da pasta deve ser semelhante à seguinte:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>Como o Milvus Backup não pode fazer backup dos seus dados para um caminho local, certifique-se de que as definições do Minio estão corretas ao adaptar o ficheiro de configuração.</p>
<div class="alert note">
<p>O nome do bucket padrão do Minio varia de acordo com a forma como o Milvus é instalado. Ao efetuar alterações às definições do Minio, consulte a tabela seguinte.</p>
<table>
<thead>
<tr><th>campo</th><th>Docker Compose</th><th>Operador do Helm / Milvus</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>ficheiros</td><td>ficheiro</td></tr>
</tbody>
</table>
</div>
<h2 id="Prepare-data" class="common-anchor-header">Preparar dados<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Se executar uma instância local vazia do Milvus na porta predefinida, utilize os scripts Python de exemplo para gerar alguns dados na sua instância. Sinta-se à vontade para fazer as alterações necessárias nos scripts para atender às suas necessidades.</p>
<p>Obtenha os <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">scripts</a>. Em seguida, execute os scripts para gerar os dados. Certifique-se de que <a href="https://pypi.org/project/pymilvus/">o PyMilvus</a>, o SDK Python oficial do Milvus, foi instalado.</p>
<pre><code translate="no" class="language-shell">python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Este passo é opcional. Se o saltar, certifique-se de que já tem alguns dados na sua instância Milvus.</p>
<h2 id="Back-up-data" class="common-anchor-header">Fazer o backup dos dados<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Note que a execução do Milvus Backup numa instância do Milvus não afectará normalmente a execução da instância. A sua instância Milvus está totalmente funcional durante a cópia de segurança ou o restauro.</p>
<div class="tab-wrapper"></div>
<p>Execute o seguinte comando para criar uma cópia de segurança.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n &lt;backup_name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Depois de o comando ser executado, pode verificar os ficheiros de cópia de segurança no bucket especificado nas definições do Minio. Especificamente, você pode baixá-los usando o <strong>Console do Minio</strong> ou o cliente <strong>mc</strong>.</p>
<p>Para fazer download do <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Console</a> do Minio, faça logon no Console do Minio, localize o compartimento especificado em <code translate="no">minio.address</code>, selecione os arquivos no compartimento e clique em <strong>Download</strong> para baixá-los.</p>
<p>Se preferir <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">o cliente mc</a>, faça o seguinte:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Agora, pode guardar os ficheiros de cópia de segurança num local seguro para restauro no futuro, ou carregá-los para o <a href="https://cloud.zilliz.com">Zilliz Cloud</a> para criar uma base de dados de vectores gerida com os seus dados. Para mais informações, consulte <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migrar do Milvus para o Zilliz Cloud</a>.</p>
<h2 id="Restore-data" class="common-anchor-header">Restaurar dados<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><div class="tab-wrapper"></div>
<p>Pode executar o comando <code translate="no">restore</code> com o sinalizador <code translate="no">-s</code> para criar uma nova coleção, restaurando os dados da cópia de segurança:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>O sinalizador <code translate="no">-s</code> permite-lhe definir um sufixo para a nova coleção a ser criada. O comando acima irá criar uma nova coleção chamada <strong>hello_milvus_recover</strong> na sua instância Milvus.</p>
<p>Se preferir restaurar a coleção com cópia de segurança sem alterar o seu nome, elimine a coleção antes de a restaurar a partir da cópia de segurança. Pode agora limpar os dados gerados em <a href="#Prepare-data">Preparar dados</a>, executando o seguinte comando.</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, execute o seguinte comando para restaurar os dados da cópia de segurança.</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-restored-data" class="common-anchor-header">Verificar os dados restaurados<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando o restauro estiver concluído, pode verificar os dados restaurados indexando a coleção restaurada da seguinte forma:</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Note que o script acima assume que executou o comando <code translate="no">restore</code> com o sinalizador <code translate="no">-s</code> e que o sufixo está definido como <code translate="no">-recover</code>. Sinta-se à vontade para fazer as alterações necessárias no script para atender às suas necessidades.</p>
