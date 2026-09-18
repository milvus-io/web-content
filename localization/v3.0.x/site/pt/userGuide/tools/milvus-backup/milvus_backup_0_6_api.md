---
id: milvus_backup_0_6_api.md
summary: >-
  Criar e monitorizar tarefas de cópia de segurança e restauração do Milvus
  Backup 0.6.0 através da API HTTP.
title: Utilizar a API HTTP do Milvus Backup 0.6.0
---
<h1 id="Use-the-Milvus-Backup-060-HTTP-API" class="common-anchor-header">Utilizar a API HTTP do Milvus Backup 0.6.0<button data-href="#Use-the-Milvus-Backup-060-HTTP-API" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilize a API HTTP do Milvus Backup para criar cópias de segurança, restaurar coleções e monitorizar tarefas assíncronas. O exemplo de instantâneo abaixo utiliza <strong>o Milvus Backup 0.6.0</strong> com <strong>o Milvus 3.0.1 ou posterior</strong>. Para o Backup 0.5.x, consulte <a href="/docs/pt/milvus_backup_api.md">o guia da API 0.5.x</a>. Para uma instalação existente, consulte <a href="/docs/pt/milvus_backup_upgrade.md">Atualizar o Milvus Backup</a>.</p>
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
    </button></h2><p>Descarregue e extraia o ficheiro binário adequado da <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">versão v0.6.0</a>. Para compilar a partir do código-fonte, siga as instruções em <a href="/docs/pt/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">Obter o Milvus Backup</a>; a compilação requer o Go 1.26 ou posterior.</p>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Preparar o ficheiro de configuração<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Crie <a href="/docs/pt/milvus_backup_0_6_cli.md#Prepare-configuration-file">um ficheiro</a>` <code translate="no">configs/backup.yaml</code> ` utilizando o exemplo v2 em <a href="/docs/pt/milvus_backup_0_6_cli.md#Prepare-configuration-file">«Preparar o ficheiro de configuração</a>». Configure o acesso ao Milvus, ao armazenamento da instância e ao destino do backup. O servidor Milvus também deve poder aceder ao armazenamento de backup para operações de instantâneos.</p>
<p>Se tiver um ficheiro v1, este continua a poder ser carregado. Consulte <a href="/docs/pt/milvus_backup_upgrade.md#Migrate-the-configuration">«Migrar a configuração»</a> antes de alterar o seu esquema ou as variáveis de ambiente.</p>
<p>A partir do diretório que contém o binário, verifique a configuração e a conectividade:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Continue quando a verificação de conectividade indicar « <code translate="no">Success!</code> ».</p>
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
    </button></h2><p>Inicie o serviço com a configuração que verificou:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>A porta predefinida é a 8080. Para escolher outra porta, utilize <code translate="no">-p</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 18080 --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Execute apenas um destes comandos para um determinado serviço. Os exemplos abaixo utilizam a porta 8080; altere os respetivos URLs se tiver selecionado outra porta. A Swagger UI está disponível em <code translate="no">http://localhost:8080/api/v1/docs/index.html</code>.</p>
<p>Mantenha o serviço em execução enquanto faz o polling das tarefas. Os IDs das tarefas e o progresso em tempo real pertencem ao processo do serviço; a cópia de segurança persistente permanece no armazenamento de objetos após o processo ser interrompido.</p>
<h2 id="Prepare-data" class="common-anchor-header">Preparar os dados<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize uma coleção existente denominada <code translate="no">coll</code> ou crie a coleção de teste com 256 entidades a partir de <a href="/docs/pt/snapshot-backup-and-restore.md#Prepare-sample-data">«Preparar dados de amostra</a>». Altere os nomes das coleções nos pedidos se utilizar os seus próprios dados. Mantenha os dados de teste inalterados enquanto verifica o resultado.</p>
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
    </button></h2><p>Envie um pedido de cópia de segurança assíncrona:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;]
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>A resposta inclui um « <code translate="no">requestId</code> ». O envio não significa que o backup esteja concluído. Copie esse valor para « <code translate="no">backup_id</code> » e faça a consulta:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&amp;backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Aguarde até que <code translate="no">data.state_code</code> passe a ser <code translate="no">2</code>. A API utiliza os seguintes estados de tarefa:</p>
<table>
<thead>
<tr><th><code translate="no">state_code</code></th><th>Significado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">0</code></td><td>Inicial</td></tr>
<tr><td><code translate="no">1</code></td><td>Em execução</td></tr>
<tr><td><code translate="no">2</code></td><td>Sucesso</td></tr>
<tr><td><code translate="no">3</code></td><td>Falha</td></tr>
<tr><td><code translate="no">4</code></td><td>Tempo esgotado</td></tr>
</tbody>
</table>
<p>Verifique tanto a resposta como o estado da tarefa. O código HTTP 200, por si só, não é suficiente: um código de resposta diferente de zero <code translate="no">code</code> indica um erro. Uma resposta bem-sucedida pode omitir <code translate="no">code</code>, uma vez que o seu valor é zero. Se uma tarefa falhar ou atingir o tempo limite, verifique os detalhes da resposta e o registo do servidor antes de restaurar a partir desse cópia de segurança.</p>
<p>Liste os backups armazenados e verifique o backup concluído pelo nome:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/list&#x27;
curl &#x27;http://localhost:8080/api/v1/get_backup?backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">get_backup</code> retorna metadados em JSON, incluindo <code translate="no">collection_backups</code>; <strong>não</strong> descarrega ficheiros de cópia de segurança. Para uma cópia de segurança criada por outro processo, uma consulta apenas pelo nome pode devolver metadados sem o progresso atual da tarefa. Utilize o ID da tarefa da resposta de criação do serviço atual ao monitorizar uma cópia de segurança ativa.</p>
<p>O formato predefinido é <code translate="no">auto</code>, que seleciona o snapshot no Milvus 3.0. Para solicitar explicitamente o binlog, adicione <code translate="no">&quot;format&quot;: &quot;binlog&quot;</code> ao corpo da solicitação de criação. As predefinições « <code translate="no">--for</code> » da CLI não são um campo de solicitação HTTP.</p>
<p>Para preservar ou mover o backup, copie o diretório inteiro para o armazenamento de objetos. Consulte o <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">guia de transferência da versão 0.6.0</a>.</p>
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
    </button></h2><p>Certifique-se de que <code translate="no">coll_bak</code> ainda não existe. Envie um pedido de restauração com um sufixo:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;_bak&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>O campo HTTP « <code translate="no">collection_names</code> » seleciona nomes <strong>no backup</strong>, antes de o sufixo ser aplicado. Esta solicitação seleciona « <code translate="no">coll</code> » e cria « <code translate="no">coll_bak</code> ». Por outro lado, o parâmetro « <code translate="no">--filter</code> » da CLI corresponde aos nomes de destino após a renomeação; não substitua « <code translate="no">coll_bak</code> » neste campo HTTP.</p>
<p>Copie <code translate="no">data.id</code> da resposta de restauração e verifique o estado da tarefa:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Aguarde por <code translate="no">data.state_code: 2</code> e verifique <code translate="no">collection_restore_tasks</code> para ver se a coleção de destinos está conforme o esperado. Uma tarefa submetida ainda não constitui uma restauração verificada.</p>
<h3 id="Restore-with-the-original-name" class="common-anchor-header">Restaurar com o nome original<button data-href="#Restore-with-the-original-name" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize uma instância de destino onde <code translate="no">coll</code> não exista. Inicie um serviço de API de cópia de segurança separado, configurado para esse destino e para a localização da cópia de segurança concluída, e, em seguida, envie este pedido ao serviço de destino:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Verifique <code translate="no">get_restore</code> no mesmo serviço utilizando o ID da tarefa devolvido. Configure <code translate="no">milvus.*</code> para o destino de restauração e <code translate="no">backup.storage</code> para o backup existente. Consulte <a href="/docs/pt/milvus_backup_0_6_cli.md#Prepare-configuration-file">Preparar o ficheiro de configuração</a>.</p>
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
    </button></h2><p>Após a tarefa de restauração ser bem-sucedida, ligue-se à instância Milvus de destino e verifique se a coleção e os dados esperados existem. Para a coleção de teste de 256 entidades, utilize as verificações completas de escalares, vetores e pesquisa em <a href="/docs/pt/snapshot-backup-and-restore.md#Verify-the-result">«Verificar o resultado</a>».</p>
<p>Altere <code translate="no">coll_bak</code> para <code translate="no">coll</code> quando restaurar com o nome original. O código de verificação lê os dados restaurados sem os eliminar. Para dados de produção, compare-os com uma linha de base capturada no momento do backup.</p>
