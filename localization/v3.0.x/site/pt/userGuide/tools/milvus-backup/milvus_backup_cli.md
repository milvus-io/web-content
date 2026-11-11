---
id: milvus_backup_cli.md
summary: Saiba como utilizar o Milvus Backup através da CLI
title: >-
  Fazer cópias de segurança e restaurar dados utilizando comandosCompatible with
  Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Fazer cópias de segurança e restaurar dados utilizando comandos<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Para os fluxos de trabalho atuais, consulte o <a href="/docs/pt/milvus_backup_0_6_cli.md">guia da CLI</a> ou <a href="/docs/pt/milvus_backup_upgrade.md">atualize a partir da versão 0.5.x</a>. Verifique a <a href="/docs/pt/milvus_backup_overview.md#Compatibility-matrix">matriz de compatibilidade</a> para conhecer as versões do servidor Milvus suportadas.</p>
<p>O Milvus Backup fornece funcionalidades de cópia de segurança e restauração de dados para garantir a segurança dos seus dados do Milvus.</p>
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
    </button></h2><p>Pode descarregar o binário compilado ou compilar a partir do código-fonte.</p>
<p>Descarregue o ficheiro binário para o seu sistema operativo e arquitetura a partir da <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">versão 0.5.16</a>. Utilize a configuração e os exemplos correspondentes à versão 0.5.16 apresentados nesta página.</p>
<p>Para compilar a versão 0.5.16 a partir do código-fonte, instale o Go 1.25 ou posterior e execute:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.5.16 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Prepare o ficheiro de configuração<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Descarregue o <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml">ficheiro de configuração de exemplo</a> e adapte-o às suas necessidades.</p>
<p>Em seguida, crie uma pasta ao lado do binário do Milvus Backup descarregado ou compilado, nomeie a pasta « <code translate="no">configs</code> » e coloque o ficheiro de configuração dentro da pasta « <code translate="no">configs</code> ».</p>
<p>A sua estrutura de pastas deve ser semelhante à seguinte:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>Este exemplo utiliza o MinIO para armazenamento de cópias de segurança. Defina « <code translate="no">minio.*</code> » de forma a corresponder ao seu armazenamento Milvus e ao destino das cópias de segurança, incluindo os endereços, credenciais, nomes dos buckets e caminhos raiz.</p>
<div class="alert note">
<p>O nome do bucket MinIO predefinido varia consoante a forma como instala o Milvus. Ao efetuar alterações nas definições do MinIO, consulte a tabela seguinte.</p>
<table>
<thead>
<tr><th>campo</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
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
    </button></h2><p>Se estiver a executar uma instância local vazia do Milvus na porta predefinida, utilize os scripts de exemplo em Python para gerar alguns dados na sua instância. Sinta-se à vontade para fazer as alterações necessárias aos scripts, de modo a adaptá-los às suas necessidades.</p>
<p>Obtenha os <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">scripts</a>. Em seguida, execute-os para gerar os dados. Certifique-se de que <a href="https://pypi.org/project/pymilvus/">o PyMilvus</a>, o SDK oficial do Milvus para Python, está instalado.</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Este passo é opcional. Se o ignorar, certifique-se de que já possui alguns dados na sua instância do Milvus.</p>
<h2 id="Back-up-data" class="common-anchor-header">Fazer cópia de segurança dos dados<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Note que a execução do Milvus Backup numa instância do Milvus normalmente não afeta o funcionamento da instância. A sua instância do Milvus permanece totalmente funcional durante o backup ou a restauração.</p>
<div class="tab-wrapper"></div>
<p>Execute o seguinte comando para criar uma cópia de segurança.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Assim que o comando for executado, pode verificar os ficheiros de cópia de segurança no bucket especificado nas definições do Minio. Mais concretamente, pode descarregá-los utilizando <strong>a Consola do Minio</strong> ou o cliente <strong>mc</strong>.</p>
<p>Para descarregar a partir <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">da Consola do Minio</a>, inicie sessão na Consola do Minio, localize o bucket especificado em <code translate="no">minio.backupBucketName</code>, selecione os ficheiros no bucket e clique em <strong>«Download»</strong> para os descarregar.</p>
<p>Se preferir <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">o cliente mc</a>, proceda da seguinte forma:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Agora, pode guardar os ficheiros de cópia de segurança num local seguro para restauração futura ou carregá-los para <a href="https://cloud.zilliz.com">a Zilliz Cloud</a> para criar uma base de dados vetorial gerida com os seus dados. Para mais detalhes, consulte <a href="https://zilliz.com/doc/migrate_from_milvus-2x">«Migrar do Milvus para a Zilliz Cloud</a>».</p>
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
<p>Pode executar o comando « <code translate="no">restore</code> » com o sinalizador « <code translate="no">-s</code> » para criar uma nova coleção, restaurando os dados a partir do backup:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>O sinalizador ` <code translate="no">-s</code> ` permite definir um sufixo para a nova coleção a ser criada. O comando acima criará uma nova coleção chamada <strong>`hello_milvus_recover</strong> ` na sua instância do Milvus.</p>
<p>Se preferir restaurar a coleção da qual foi feito o backup sem alterar o seu nome, elimine a coleção antes de a restaurar a partir do backup. Pode agora limpar os dados gerados em <a href="#Prepare-data">«Prepare data»</a> (Preparar dados) executando o comando seguinte.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, execute o comando seguinte para restaurar os dados a partir do backup.</p>
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
    </button></h2><p>Para os dados de amostra descartáveis criados acima, o script upstream indexa e consulta <code translate="no">hello_milvus_recover</code> e <code translate="no">hello_milvus2_recover</code> e, em seguida, <strong>elimina ambas as coleções restauradas</strong>. Execute-o apenas após restaurar ambas as coleções de amostra com <code translate="no">_recover</code>. Para os seus próprios dados, compare-os com a linha de base do momento do backup sem utilizar este script de limpeza.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/verify_data.py -o example/verify_data.py
python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Note que o script acima pressupõe que executou o comando <code translate="no">restore</code> com o sinalizador <code translate="no">-s</code> e que o sufixo está definido como <code translate="no">_recover</code>. Sinta-se à vontade para fazer as alterações necessárias no script, de modo a adaptá-lo às suas necessidades.</p>
