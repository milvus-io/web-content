---
id: milvus_backup_upgrade.md
summary: >-
  Atualizar o Milvus Backup da versão 0.5.x para a 0.6.0, atualizar a
  configuração e os comandos e verificar o funcionamento do backup e da
  restauração.
title: Atualizar o Milvus Backup para a versão 0.6.0
---
<h1 id="Upgrade-Milvus-Backup-to-060" class="common-anchor-header">Atualizar o Milvus Backup para a versão 0.6.0<button data-href="#Upgrade-Milvus-Backup-to-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilize este guia ao atualizar a <strong>ferramenta Milvus Backup</strong> da versão 0.5.x para a 0.6.0. Esta atualização não afeta o seu servidor Milvus. Se pretender permanecer na versão 0.5.x, continue a utilizar o guia <a href="/docs/pt/milvus_backup_cli.md">da CLI</a> ou <a href="/docs/pt/milvus_backup_api.md">da API</a> <a href="/docs/pt/milvus_backup_cli.md">da versão 0.5.x</a>. Para uma nova instalação, utilize o <a href="/docs/pt/milvus_backup_0_6_cli.md">guia da versão 0.6.0</a>.</p>
<p>As configurações YAML da V1 continuam a ser carregadas através da tradução automática. No entanto, os sinalizadores da CLI obsoletos são rejeitados na versão 0.6.0 e o formato de cópia de segurança predefinido altera-se no Milvus 3.0. Reveja tanto a configuração como os comandos antes de alterar tarefas agendadas ou serviços.</p>
<h2 id="Check-the-starting-point" class="common-anchor-header">Verifique o ponto de partida<button data-href="#Check-the-starting-point" class="anchor-icon" translate="no">
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
    </button></h2><p>Registe a sua versão do Backup, as versões de origem e de destino do Milvus, os ficheiros de configuração, as substituições de variáveis de ambiente, a localização do backup e os comandos utilizados pelos scripts ou serviços da API. Verifique as <a href="/docs/pt/milvus_backup_overview.md#Compatibility-matrix">informações de compatibilidade</a> para essas versões do servidor.</p>
<p>Mantenha o binário original, a configuração e os diretórios de cópia de segurança existentes enquanto valida a nova instalação. Descarregue a versão 0.6.0 para um diretório separado utilizando <a href="/docs/pt/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">a opção «Obter o Milvus Backup</a>». Todos os comandos abaixo são executados a partir desse diretório e invocam o binário da versão 0.6.0. Coloque uma cópia da sua configuração da v1 em <code translate="no">configs/backup-v1.yaml</code>.</p>
<h2 id="Migrate-the-configuration" class="common-anchor-header">Migrar a configuração<button data-href="#Migrate-the-configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Uma configuração da v1 ainda é carregada na versão 0.6.0. O Milvus Backup converte-a para a v2 no arranque e apresenta um aviso. Para guardar a configuração convertida num ficheiro separado:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--strict</code> rejeita uma configuração migrada inválida. Sem <code translate="no">--output</code>, o comando escreve o YAML da v2 na saída padrão. Reveja e utilize o novo ficheiro apenas após verificar as suas definições resolvidas.</p>
<table>
<thead>
<tr><th>Definição v1</th><th>Definição v2</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.address</code>, <code translate="no">milvus.port</code></td><td><code translate="no">milvus.grpc.address</code>, <code translate="no">milvus.grpc.port</code></td></tr>
<tr><td>Armazenamento de origem em <code translate="no">minio.*</code></td><td><code translate="no">milvus.storage.*</code></td></tr>
<tr><td>Armazenamento de cópias de segurança em <code translate="no">minio.backup*</code></td><td><code translate="no">backup.storage.*</code></td></tr>
<tr><td>Credenciais de armazenamento</td><td><code translate="no">milvus.storage.auth.*</code> / <code translate="no">backup.storage.auth.*</code>, com uma <code translate="no">auth.type</code></td></tr>
<tr><td><code translate="no">minio.crossStorage</code></td><td><code translate="no">transfer.mode</code></td></tr>
<tr><td><code translate="no">backup.gcPause.address</code></td><td><code translate="no">milvus.management.endpoint</code></td></tr>
</tbody>
</table>
<p>Revise as variáveis de ambiente na mesma alteração que o ficheiro de configuração. A v2 aceita apenas as variáveis de ambiente relacionadas com credenciais suportadas, tais como <code translate="no">MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY</code>. Os nomes antigos da v1 não são aplicados a um ficheiro v2. Para definições não relacionadas com credenciais, tais como nomes de buckets e endpoints, utilize YAML ou uma substituição de chave de configuração:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config migrate</code> relata as variáveis de ambiente afetadas sem copiar os seus valores secretos para o ficheiro de saída. Consulte <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md">as variáveis de ambiente da v2 suportadas</a>. O comando ` <code translate="no">config show</code> ` substitui o comando obsoleto ` <code translate="no">check config</code> `.</p>
<h2 id="Update-CLI-commands" class="common-anchor-header">Atualizar comandos da CLI<button data-href="#Update-CLI-commands" class="anchor-icon" translate="no">
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
    </button></h2><p>Os sinalizadores obsoletos na versão 0.5 são rejeitados na versão 0.6.0. Atualize os scripts antes de atualizar o binário.</p>
<table>
<thead>
<tr><th>Comando</th><th>Opção removida</th><th>Substituição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">create</code></td><td><code translate="no">--colls</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--force</code> / <code translate="no">-f</code></td><td><code translate="no">--strategy skip_flush</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--meta_only</code></td><td><code translate="no">--strategy meta_only</code></td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--collections</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code>, utilizando nomes de destino</td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--restore_index</code></td><td><code translate="no">--rebuild_index</code></td></tr>
<tr><td><code translate="no">get</code></td><td><code translate="no">--detail</code> / <code translate="no">-d</code></td><td>Remova o sinalizador; <code translate="no">get</code> devolve as informações de cópia de segurança</td></tr>
<tr><td><code translate="no">list</code></td><td><code translate="no">--collection</code> / <code translate="no">-c</code></td><td>Não existe um filtro de recolha equivalente</td></tr>
</tbody>
</table>
<p>Por exemplo, estes comandos da versão 0.5.16 selecionam o nome de origem <code translate="no">coll</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>As suas versões equivalentes na versão 0.6.0 utilizam o nome de destino para a restauração:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Um filtro de restauração que não corresponda a nada pode terminar com sucesso sem criar uma coleção. Verifique sempre a coleção de destino e os seus dados. O <code translate="no">collection_names</code> da API HTTP continua a selecionar nomes de origem no backup; consulte o <a href="/docs/pt/milvus_backup_0_6_api.md#Restore-data">guia da API 0.6.0</a>.</p>
<h2 id="Choose-the-backup-behavior" class="common-anchor-header">Escolha o comportamento do backup<button data-href="#Choose-the-backup-behavior" class="anchor-icon" translate="no">
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
<li>Nos servidores Milvus 2.x suportados, o formato « <code translate="no">auto</code> » utiliza o binlog. A atualização do backup não requer a migração para o Milvus 3.0.</li>
<li>No Milvus 3.0, o <code translate="no">auto</code> seleciona snapshot. O suporte oficial ao backup e à restauração começa a partir do Milvus 3.0.1. Passe <code translate="no">--format binlog</code> para manter o comportamento do binlog ao criar um backup.</li>
<li>A compatibilidade de configuração da V1 não preserva os sinalizadores de comando removidos nem substitui o valor por defeito do novo formato.</li>
<li>As predefinições de finalidade podem definir o formato e outras opções. Por exemplo, <code translate="no">--for archive</code> força o binlog mesmo que <code translate="no">--format snapshot</code> também seja fornecido. Reveja <a href="/docs/pt/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">as opções de formato e finalidade</a>.</li>
<li>As coleções externas são ignoradas durante o backup. Verifique os metadados do backup, em vez de considerar o sucesso da tarefa como prova de que todas as coleções foram incluídas.</li>
</ul>
<h2 id="Validate-before-switching-jobs" class="common-anchor-header">Valide antes de mudar de tarefa<button data-href="#Validate-before-switching-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>O exemplo seguinte mantém o formato binlog e restaura para uma nova coleção. Substitua « <code translate="no">coll</code> » por uma coleção cujo esquema, contagem, valores escalares e vetoriais e resultados de pesquisa tenha registado. Utilize um novo nome de cópia de segurança e certifique-se de que o nome de destino « <code translate="no">coll_upgrade_check</code> » não existe.</p>
<pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Confirme que o backup inclui <code translate="no">coll</code> e que <code translate="no">coll_upgrade_check</code> existe após a restauração. Crie o seu índice vetorial, se necessário, carregue-o e compare os dados restaurados e os resultados da pesquisa com a linha de base registada. Mantenha os dados de origem inalterados durante este teste.</p>
<p>Teste também um backup existente representativo antes de confiar nele com a nova ferramenta. Para um backup 0.5.16 denominado <code translate="no">legacy_backup</code> que contenha <code translate="no">coll</code>, utilize um nome de destino distinto:</p>
<pre><code translate="no" class="language-shell">./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Estes percursos de atualização foram validados com <strong>o Milvus 2.6.11</strong>, o backup <strong>0.5.16 → 0.6.0</strong> e backups de binlog no MinIO. Tanto os backups recém-criados como os existentes foram restaurados com valores de entidade e resultados de pesquisa vetorial correspondentes. Isto não garante a compatibilidade com todos os backups históricos nem com a restauração do Milvus 2.x para a versão 3.0. Também não garante que a versão 0.5.x consiga ler backups criados pela versão 0.6.0.</p>
<p>Assim que a validação for bem-sucedida, atualize as tarefas para utilizarem em conjunto o novo binário, a configuração verificada, as definições de ambiente e os sinalizadores de substituição. Para implementações via API, inicie o novo serviço com a configuração verificada e verifique a conclusão da tarefa através da <a href="/docs/pt/milvus_backup_0_6_api.md">API HTTP 0.6.0</a>. Para adotar instantâneos no Milvus 3.0.1 ou posterior, siga as instruções em <a href="/docs/pt/snapshot-backup-and-restore.md">«Cópia de segurança e restauração de instantâneos numa única instância</a>».</p>
