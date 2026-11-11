---
id: milvus_backup_api.md
summary: Saiba como utilizar o Milvus Backup através da API
title: >-
  Cópia de segurança e restauração de dados através de APIsCompatible with
  Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">Cópia de segurança e restauração de dados através de APIs<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>Para os fluxos de trabalho atuais, consulte o <a href="/docs/pt/milvus_backup_0_6_api.md">guia da API HTTP</a> ou <a href="/docs/pt/milvus_backup_upgrade.md">atualize a partir da versão 0.5.x</a>. Consulte a <a href="/docs/pt/milvus_backup_overview.md#Compatibility-matrix">matriz de compatibilidade</a> para saber quais as versões do servidor Milvus suportadas.</p>
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
    </button></h2><p>Pode descarregar o ficheiro binário compilado ou compilar a partir do código-fonte.</p>
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
<p>Este exemplo utiliza o MinIO para armazenamento de cópias de segurança. Defina « <code translate="no">minio.*</code> » de forma a corresponder ao seu armazenamento Milvus e ao destino das cópias de segurança, incluindo os endereços, credenciais, nomes de buckets e caminhos raiz.</p>
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
<h2 id="Start-up-the-API-server" class="common-anchor-header">Inicie o servidor da API<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>Em seguida, pode iniciar o servidor API da seguinte forma:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>Por predefinição, o servidor da API escuta na porta 8080. Pode alterar esta configuração executando-o com o sinalizador « <code translate="no">-p</code> ». Para iniciar o servidor da API a escutar na porta 443, proceda da seguinte forma:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>Pode aceder à interface do utilizador do Swagger através de http://localhost:<port>/api/v1/docs/index.html.</p>
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
    </button></h2><p>Se estiver a executar uma instância local vazia do Milvus a escutar na porta predefinida 19530, utilize os scripts de exemplo em Python para gerar alguns dados na sua instância. Sinta-se à vontade para fazer as alterações necessárias aos scripts, de modo a adaptá-los às suas necessidades.</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p>Note que a execução do Milvus Backup numa instância do Milvus não afeta, normalmente, o funcionamento da instância. A sua instância do Milvus permanece totalmente funcional durante o backup ou a restauração.</p>
<p>Execute o seguinte comando para criar uma cópia de segurança. Altere <code translate="no">collection_names</code> e <code translate="no">backup_name</code>, se necessário.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
  &quot;async&quot;: true,
  &quot;backup_name&quot;: &quot;my_backup&quot;,
  &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ]
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>O pedido de criação é assíncrono. Verifique <code translate="no">get_backup</code> utilizando o <code translate="no">requestId</code> devolvido como <code translate="no">backup_id</code> e aguarde até que <code translate="no">data.state_code</code> passe a ser <code translate="no">2</code> antes de proceder à restauração.</p>
<p>Pode listar os backups no bucket especificado nas definições do Minio da seguinte forma:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Recupere os metadados do backup da seguinte forma:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Substitua <code translate="no">backup_id</code> e <code translate="no">backup_name</code> pelos valores do seu backup. Este endpoint devolve metadados em JSON, não ficheiros de backup. Copie o diretório completo do backup do armazenamento de objetos ao arquivá-lo.</p>
<p>Agora, pode guardar os ficheiros de cópia de segurança num local seguro para restauração futura ou carregá-los na <a href="https://cloud.zilliz.com">Zilliz Cloud</a> para criar uma base de dados de vetores gerida com os seus dados. Para mais detalhes, consulte <a href="https://zilliz.com/doc/migrate_from_milvus-2x">«Migrar do Milvus para a Zilliz Cloud</a>».</p>
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
<p>Pode chamar o comando da API de restauração com a opção « <code translate="no">collection_suffix</code> » para criar uma nova coleção, restaurando os dados a partir do backup. Altere « <code translate="no">collection_names</code> » e « <code translate="no">backup_name</code> », se necessário.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;_recover&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>A opção <code translate="no">collection_suffix</code> permite definir um sufixo para a nova coleção a ser criada. O comando acima criará uma nova coleção chamada <strong>hello_milvus_recover</strong> na sua instância do Milvus.</p>
<p>Se preferir restaurar a coleção da qual foi feita a cópia de segurança sem alterar o seu nome, elimine a coleção antes de a restaurar a partir da cópia de segurança. Pode agora limpar os dados gerados na etapa <a href="#Prepare-data">«Preparar dados»</a> executando o comando seguinte.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, execute o comando seguinte para restaurar os dados a partir do backup.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>O processo de restauração pode demorar algum tempo, dependendo do tamanho dos dados a restaurar. Por isso, os exemplos acima solicitam a execução assíncrona com ` <code translate="no">&quot;async&quot;: true</code>`. Pode verificar o estado de uma tarefa de restauração executando:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Lembre-se de substituir « <code translate="no">test_restore_id</code> » pelo « <code translate="no">data.id</code> » devolvido pela API de restauração. Aguarde até que « <code translate="no">data.state_code</code> » passe a « <code translate="no">2</code> » antes de verificar os dados; « <code translate="no">3</code> » indica falha e « <code translate="no">4</code> » indica um tempo limite esgotado.</p>
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
    </button></h2><p>Após a tarefa ser bem-sucedida, confirme se <code translate="no">hello_milvus_recover</code> existe. Crie um índice adequado, carregue a coleção e compare a contagem de entidades, os valores escalares e vetoriais e os resultados da pesquisa com os dados de origem capturados antes da cópia de segurança. Para uma restauração com o nome original, utilize <code translate="no">hello_milvus</code> em vez disso.</p>
<p>O exemplo <code translate="no">verify_data.py</code>, para o qual existe um link no guia da CLI, espera duas coleções restauradas e elimina-as no final. Não é adequado para este exemplo da API, que seleciona apenas <code translate="no">hello_milvus</code>.</p>
