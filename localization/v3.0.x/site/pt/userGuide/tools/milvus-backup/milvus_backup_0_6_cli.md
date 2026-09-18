---
id: milvus_backup_0_6_cli.md
summary: >-
  Configure o Milvus Backup 0.6.0, crie uma cópia de segurança e verifique os
  dados restaurados utilizando a CLI.
title: Utilizar o Milvus Backup 0.6.0
---
<h1 id="Use-Milvus-Backup-060" class="common-anchor-header">Utilizar o Milvus Backup 0.6.0<button data-href="#Use-Milvus-Backup-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilize o Milvus Backup para fazer cópias de segurança de coleções e restaurá-las na mesma instância do Milvus ou noutra instância. Este guia aborda <strong>o Milvus Backup 0.6.0</strong>. A criação de cópias de segurança e a restauração no Milvus 3.0 são oficialmente suportadas a partir da <strong>versão Milvus 3.0.1</strong>. O Backup 0.6.0 também suporta fluxos de trabalho binlog nas versões compatíveis do Milvus 2.x; consulte <a href="/docs/pt/milvus_backup_overview.md#Compatibility-matrix">a compatibilidade do Milvus Backup</a>.</p>
<p>Se ainda estiver a utilizar o Backup 0.5.x, utilize o <a href="/docs/pt/milvus_backup_cli.md">guia da CLI 0.5.x</a>. Se estiver a atualizar, siga primeiro as instruções em <a href="/docs/pt/milvus_backup_upgrade.md">«Atualizar o Milvus Backup</a> ».</p>
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
    </button></h2><p>Descarregue o ficheiro binário para o seu sistema operativo e arquitetura a partir da <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">versão v0.6.0</a> e, em seguida, extraia-o. Mantenha o ficheiro binário e os exemplos de configuração na mesma versão.</p>
<p>Para compilar a partir do código-fonte, instale <strong>o Go 1.26 ou superior</strong> e, em seguida, execute:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<p>O binário pré-compilado não requer o Go. Execute todos os comandos de shell subsequentes a partir do diretório que contém o arquivo « <code translate="no">milvus-backup</code> ».</p>
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
    </button></h2><p>O Milvus Backup necessita de acesso ao ponto de extremidade gRPC do Milvus, ao seu ponto de extremidade de gestão, ao armazenamento da instância e ao destino do backup. Para backups de instantâneos, o servidor Milvus também necessita de acesso ao armazenamento de backup.</p>
<p>Crie um diretório de configuração:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>Guarde este exemplo do MinIO como <code translate="no">configs/backup.yaml</code>. Substitua os endereços, credenciais, bucket e caminho raiz pelas definições da sua implementação. As credenciais <code translate="no">minioadmin</code> são as predefinições de teste do MinIO.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://localhost:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">milvus.grpc</code> liga-se à instância que está a ser copiada de segurança ou restaurada. Se a autenticação estiver ativada, defina também <code translate="no">milvus.user</code> e <code translate="no">milvus.password</code>.</li>
<li><code translate="no">milvus.management.endpoint</code> É utilizado para pausar/retomar a recolha de lixo durante o backup.</li>
<li><code translate="no">milvus.storage</code> deve corresponder ao armazenamento de objetos real da instância. Definir um balde aqui não altera a configuração do Milvus.</li>
<li><code translate="no">backup.storage</code> identifica a localização do backup. Os campos não definidos herdam o valor de <code translate="no">milvus.storage</code>, exceto <code translate="no">rootPath</code>, cujo valor por predefinição é <code translate="no">backup</code>.</li>
<li><code translate="no">transfer.mode: auto</code> seleciona a cópia do lado do armazenamento quando os backends correspondem e, caso contrário, o streaming através do Milvus Backup. Esta definição controla a transferência de objetos, não o formato de cópia de segurança.</li>
</ul>
<p>Os valores predefinidos típicos de armazenamento são apresentados abaixo. Confirme os valores na sua implementação em execução antes de os utilizar.</p>
<table>
<thead>
<tr><th>Definição</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>Bucket</td><td><code translate="no">a-bucket</code></td><td><code translate="no">milvus-bucket</code></td></tr>
<tr><td>Caminho raiz</td><td><code translate="no">files</code></td><td><code translate="no">file</code></td></tr>
</tbody>
</table>
<p>Se o servidor Milvus utilizar um endereço diferente para aceder ao armazenamento de cópias de segurança, defina <code translate="no">backup.storage.milvusAddress</code> e <code translate="no">milvusPort</code> com o endereço acessível ao servidor. Para autenticação, TLS, outros fornecedores de armazenamento e definições adicionais, consulte o <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">exemplo de configuração da versão 0.6.0</a>.</p>
<p>Verifique os valores efetivos e a conectividade:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config show</code> oculta os valores secretos e indica a origem de cada valor. A verificação de conectividade deve indicar <code translate="no">Success!</code>. Resolva os erros de ligação ou de armazenamento antes de criar uma cópia de segurança.</p>
<p>Para configurações v1 existentes, consulte <a href="/docs/pt/milvus_backup_upgrade.md#Migrate-the-configuration">Atualizar o Milvus Backup</a>. A conversão automática da configuração não substitui os sinalizadores da CLI removidos.</p>
<h2 id="Prepare-data" class="common-anchor-header">Prepare os dados<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize uma coleção existente denominada « <code translate="no">coll</code> » e certifique-se de que « <code translate="no">coll_bak</code> » não existe. Registe o esquema, a contagem de entidades, valores escalares e vetoriais representativos e um resultado de pesquisa conhecido antes do backup. Mantenha os dados de exemplo inalterados ao comparar a cópia restaurada. Para criar, em vez disso, um pequeno conjunto de dados descartável, utilize <a href="/docs/pt/snapshot-backup-and-restore.md#Prepare-sample-data">«Preparar dados de amostra</a>».</p>
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
    </button></h2><p>Crie um backup com o nome « <code translate="no">coll</code> »:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>O comando «create» deve apresentar « <code translate="no">create backup success</code> ». O comando « <code translate="no">get</code> » devolve os metadados da cópia de segurança; verifique se a coleção esperada está presente. Ao omitir « <code translate="no">--filter</code> », são copiadas todas as coleções elegíveis. As coleções externas são ignoradas.</p>
<p><code translate="no">--filter</code> Aceita nomes separados por vírgulas: « <code translate="no">coll</code> » na base de dados predefinida, « <code translate="no">db1.coll</code> » ou « <code translate="no">'db1.*'</code> » para todas as coleções numa base de dados. Coloque entre aspas os padrões que contenham « <code translate="no">*</code> » para impedir a expansão do shell.</p>
<h3 id="Choose-a-backup-format-or-purpose" class="common-anchor-header">Escolha um formato ou finalidade de cópia de segurança<button data-href="#Choose-a-backup-format-or-purpose" class="anchor-icon" translate="no">
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
    </button></h3><p>Com o valor predefinido <code translate="no">--format auto</code>, o Milvus 3.0 utiliza cópias de segurança de instantâneo; os servidores Milvus 2.x suportados utilizam binlog. Para manter explicitamente o comportamento do binlog, passe <code translate="no">--format binlog</code>. O <a href="/docs/pt/snapshot-backup-and-restore.md">exemplo de instantâneo</a> seleciona explicitamente <code translate="no">--format snapshot</code>.</p>
<p>Utilize ` <code translate="no">--for</code> ` quando uma finalidade corresponder ao seu fluxo de trabalho:</p>
<table>
<thead>
<tr><th>Finalidade</th><th>Valores aplicados pela predefinição</th><th>Utilização pretendida</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">clone</code></td><td>Ativa o backup RBAC; mantém as suas escolhas de formato e estratégia</td><td>Copiar dados para outra instância; o « <code translate="no">auto</code> » utiliza um instantâneo no Milvus 3.0</td></tr>
<tr><td><code translate="no">archive</code></td><td>Força o uso do <code translate="no">binlog</code> e ativa o backup RBAC</td><td>Mantém um backup no formato binlog para restauração posterior</td></tr>
<tr><td><code translate="no">secondary</code></td><td>Força o « <code translate="no">binlog</code> », o « <code translate="no">bulk_flush</code> », o backup RBAC e a indexação de metadados adicionais</td><td>Inicialize um secundário numa topologia de replicação configurada</td></tr>
</tbody>
</table>
<p>Por exemplo:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Uma predefinição substitui valores conflitantes para as opções que define. Por exemplo, ` <code translate="no">--for archive --format snapshot</code> ` produz um backup em formato binlog. Fazer o backup dos metadados RBAC não os restaura automaticamente; utilize a opção ` <code translate="no">--rbac</code> ` do comando de restauração quando necessário.</p>
<p><code translate="no">secondary</code> não é um atalho para a restauração normal entre instâncias. Também requer acesso ao etcd de origem para os metadados do índice, IDs e canais corretos do cluster de replicação e um destino secundário novo. O backup deve reter os seus metadados completos, incluindo <code translate="no">meta/full_meta.json</code>. A configuração da replicação e a execução do failover estão fora do âmbito deste guia. Consulte o <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">código-fonte e a documentação de referência da versão 0.6.0</a> para conhecer a implementação e os requisitos específicos dessa versão.</p>
<h3 id="Preserve-the-complete-backup" class="common-anchor-header">Preserve o backup completo<button data-href="#Preserve-the-complete-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>Um backup é armazenado em <code translate="no">&lt;backup.storage.bucketName&gt;/&lt;backup.storage.rootPath&gt;/&lt;backup_name&gt;</code>. Preserve todos os objetos neste diretório. Os backups de instantâneo incluem um pacote exportado, bem como metadados.</p>
<p>Não copie apenas os ficheiros de metadados nem presuma que um backup de instantâneo tenha a mesma estrutura que um backup de binlog.</p>
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
    </button></h2><p>Restaure <code translate="no">coll</code> como <code translate="no">coll_bak</code> na instância configurada:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Na CLI, « <code translate="no">--filter</code> » corresponde aos nomes <strong>após</strong> a aplicação de « <code translate="no">-s</code> » ou « <code translate="no">--rename</code> ». Um comando com « <code translate="no">--filter coll -s _bak</code> » não corresponde a nada e pode terminar com sucesso sem restaurar uma coleção.</p>
<p>Para restaurar utilizando o nome original, escolha um destino onde esse nome de coleção não exista, aponte a configuração para esse destino e para a localização da cópia de segurança e omita o sufixo:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Para um exemplo completo na mesma instância, consulte <a href="/docs/pt/snapshot-backup-and-restore.md">«Backup e restauração de instantâneos numa única instância</a>». As páginas existentes sobre casos comuns entre instâncias utilizam a configuração do Backup 0.5.16 e v1; não aplique os seus comandos tal como estão à versão 0.6.0. Para a configuração de transferência da versão 0.6.0, consulte o <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">guia de transferência específico para essa versão</a>.</p>
<h2 id="Verify-restored-data" class="common-anchor-header">Verifique os dados restaurados<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Confirme se existe um ficheiro « <code translate="no">coll_bak</code> ». Se a restauração não tiver recriado o seu índice vetorial, crie o índice adequado ao seu esquema antes de carregar a coleção. Compare o seu esquema, o número de entidades, os valores escalares e vetoriais e os resultados de pesquisa conhecidos com a linha de base capturada antes do backup.</p>
<p>Para o conjunto de dados descartável de 256 entidades, utilize as verificações completas descritas em <a href="/docs/pt/snapshot-backup-and-restore.md#Verify-the-result">«Verificar o resultado</a>». A execução bem-sucedida de um comando, por si só, não prova que os dados esperados tenham sido restaurados.</p>
