---
id: snapshot-backup-and-restore.md
summary: >-
  Fazer uma cópia de segurança de uma coleção e restaurá-la com um novo nome na
  mesma instância do Milvus.
title: Cópia de segurança e restauração de instantâneos numa única instância
---
<h1 id="Snapshot-Backup-and-Restore-in-One-Instance" class="common-anchor-header">Cópia de segurança e restauração de instantâneos numa única instância<button data-href="#Snapshot-Backup-and-Restore-in-One-Instance" class="anchor-icon" translate="no">
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
    </button></h1><p>Faça uma cópia de segurança de uma coleção e restaure-a com um novo nome na mesma instância do Milvus. Este exemplo utiliza <strong>o Milvus Backup 0.6.0</strong> para criar um instantâneo de « <code translate="no">coll</code> » e restaurá-lo como « <code translate="no">coll_bak</code> » no <strong>Milvus 3.0.1 ou posterior</strong>. Para o Backup 0.5.x, utilize <a href="/docs/pt/single-instance-backup-and-restore.md">«Cópia de segurança e restauração numa única instância</a>».</p>
<h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Localização</th><th>Instância do Milvus</th><th>Armazenamento de objetos</th><th>Bucket</th><th>Caminho raiz</th></tr>
</thead>
<tbody>
<tr><td>Dados de origem</td><td><code translate="no">milvus-a</code></td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">files</code></td></tr>
<tr><td>Cópia de segurança criada pela fonte</td><td>—</td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">backup/my_backup</code></td></tr>
<tr><td>Dados restaurados</td><td><code translate="no">milvus-a</code></td><td><code translate="no">minio-a</code></td><td><code translate="no">bucket-a</code></td><td><code translate="no">files</code></td></tr>
</tbody>
</table>
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
<li>Utilize o Milvus Backup 0.6.0 e o Milvus 3.0.1 ou posterior. Instale a ferramenta conforme descrito em <a href="/docs/pt/milvus_backup_0_6_cli.md">«Fazer cópias de segurança e restaurar dados utilizando comandos</a>».</li>
<li>Utilize uma coleção existente denominada « <code translate="no">coll</code> » ou crie a coleção de exemplo opcional abaixo. Mantenha os seus dados inalterados enquanto compara os resultados da fonte e os resultados restaurados.</li>
<li>Torne a porta gRPC do Milvus (19530), a porta de gestão (9091) e o armazenamento de objetos acessíveis ao Milvus Backup. O servidor Milvus também deve poder aceder ao armazenamento de cópias de segurança para a exportação e importação de instantâneos.</li>
<li>Substitua os nomes de anfitrião, nomes de buckets, caminhos raiz e credenciais do exemplo pelas suas definições de implementação. As definições de armazenamento do Milvus têm de corresponder à instância em execução; alterar a configuração de cópia de segurança não reconfigura o Milvus.</li>
<li>Certifique-se de que <code translate="no">coll_bak</code> não existe na instância de destino.</li>
</ul>
<p>Para as definições de armazenamento do Milvus, consulte <a href="/docs/pt/deploy_s3.md">Armazenamento de objetos</a>. Para configurações de cópia de segurança v1 existentes, consulte <a href="/docs/pt/milvus_backup_upgrade.md#Migrate-the-configuration">Atualizar o Milvus Backup</a>.</p>
<h2 id="Prepare-sample-data" class="common-anchor-header">Prepare dados de amostra<button data-href="#Prepare-sample-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Os comandos abaixo utilizam uma coleção existente denominada « <code translate="no">coll</code> ». Pode utilizar a sua própria coleção, alterando os nomes de forma consistente.</p>
<p>Para uma pequena coleção de teste, instale o PyMilvus e execute o seguinte código utilizando um nome de coleção vazio. Substitua a URI se o Milvus não estiver instalado localmente:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus==3.0.0
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
<span class="hljs-keyword">assert</span> <span class="hljs-keyword">not</span> client.has_collection(<span class="hljs-string">&quot;coll&quot;</span>), <span class="hljs-string">&quot;Use an empty sample collection name&quot;</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;label&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">64</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">8</span>)
indexes = client.prepare_index_params()
indexes.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)
client.create_collection(<span class="hljs-string">&quot;coll&quot;</span>, schema=schema, index_params=indexes)

rng = random.Random(<span class="hljs-number">601</span>)
rows = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;label&quot;</span>: <span class="hljs-string">f&quot;backup-docs-<span class="hljs-subst">{i}</span>&quot;</span>,
     <span class="hljs-string">&quot;vector&quot;</span>: [rng.randrange(<span class="hljs-number">256</span>) / <span class="hljs-number">256</span> <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>)]}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)
]
client.insert(<span class="hljs-string">&quot;coll&quot;</span>, rows)
client.flush(<span class="hljs-string">&quot;coll&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Isto cria 256 entidades. Mantenha estes dados de teste inalterados enquanto segue os passos restantes.</p>
<h2 id="Back-up-the-collection" class="common-anchor-header">Fazer cópia de segurança da coleção<button data-href="#Back-up-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">Passo 1: Preparar a configuração<button data-href="#Step-1-Prepare-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Execute o seguinte a partir do diretório que contém o binário <code translate="no">milvus-backup</code>. Mantenha este diretório de trabalho para os comandos restantes:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>Guarde o seguinte como « <code translate="no">configs/backup-source.yaml</code> ». O exemplo utiliza as credenciais de teste predefinidas do MinIO; substitua-as pelas credenciais do seu armazenamento de objetos.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">milvus-a</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://milvus-a:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">minio-a</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">bucket-a</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">bucket-a</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">milvus.storage</code> descreve os dados da instância de origem. <code translate="no">backup.storage</code> descreve o destino do backup. Os campos de armazenamento de backup não definidos herdam os valores de <code translate="no">milvus.storage</code>, exceto <code translate="no">rootPath</code>, cujo valor predefinido é <code translate="no">backup</code>.</p>
<p>Se o Milvus e o Milvus Backup utilizarem endereços diferentes para aceder ao mesmo armazenamento de objetos, configure <code translate="no">backup.storage.milvusAddress</code> e <code translate="no">milvusPort</code> com o endereço acessível pelo servidor Milvus. Consulte o <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">exemplo de configuração da versão 0.6.0</a>.</p>
<h3 id="Step-2-Check-connectivity-and-create-a-backup" class="common-anchor-header">Passo 2: Verificar a conectividade e criar uma cópia de segurança<button data-href="#Step-2-Check-connectivity-and-create-a-backup" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-source.yaml
./milvus-backup create --format snapshot --filter coll -n my_backup --config configs/backup-source.yaml
./milvus-backup get -n my_backup --config configs/backup-source.yaml
<button class="copy-code-btn"></button></code></pre>
<p>A verificação de conectividade deve indicar <code translate="no">Success!</code>. O comando de criação deve indicar <code translate="no">create backup success</code>, e as informações de cópia de segurança devem listar <code translate="no">coll</code>.</p>
<p>A especificação explícita « <code translate="no">--format snapshot</code> » seleciona o fluxo de trabalho de instantâneos. A opção predefinida « <code translate="no">auto</code> » também seleciona a criação de instantâneos no Milvus 3.0. A cópia de segurança inclui metadados e um pacote de instantâneos exportado em « <code translate="no">bucket-a/backup/my_backup</code> ». Preserve o diretório na íntegra.</p>
<h2 id="Restore-within-the-same-instance" class="common-anchor-header">Restaurar na mesma instância<button data-href="#Restore-within-the-same-instance" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize a mesma configuração para restaurar o backup com um sufixo:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-source.yaml
<button class="copy-code-btn"></button></code></pre>
<p>A CLI <code translate="no">--filter</code> corresponde ao nome de destino <strong>após</strong> aplicar <code translate="no">-s</code> ou <code translate="no">--rename</code>. Utilize <code translate="no">coll_bak</code>, e não <code translate="no">coll</code>, neste comando de restauração. Um filtro que não corresponda a nada pode terminar com sucesso sem criar uma coleção.</p>
<p>A coleção restaurada utiliza o armazenamento configurado da instância de destino. O Milvus gere a importação do instantâneo e o layout de dados resultante.</p>
<h2 id="Verify-the-result" class="common-anchor-header">Verifique o resultado<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>Para os dados de amostra opcionais de 256 entidades acima, execute isto no destino de restauração. Substitua <code translate="no">localhost:19530</code> pelo mesmo ponto de extremidade do Milvus utilizado para preparar os dados. Isto verifica a contagem, todos os valores escalares e vetoriais e um resultado de pesquisa vetorial sem eliminar dados:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
<span class="hljs-keyword">assert</span> client.has_collection(<span class="hljs-string">&quot;coll_bak&quot;</span>)
<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> client.list_indexes(<span class="hljs-string">&quot;coll_bak&quot;</span>):
    indexes = client.prepare_index_params()
    indexes.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)
    client.create_index(<span class="hljs-string">&quot;coll_bak&quot;</span>, indexes)
client.load_collection(<span class="hljs-string">&quot;coll_bak&quot;</span>)

rng = random.Random(<span class="hljs-number">601</span>)
expected = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;label&quot;</span>: <span class="hljs-string">f&quot;backup-docs-<span class="hljs-subst">{i}</span>&quot;</span>,
     <span class="hljs-string">&quot;vector&quot;</span>: [rng.randrange(<span class="hljs-number">256</span>) / <span class="hljs-number">256</span> <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>)]}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)
]
count = client.query(<span class="hljs-string">&quot;coll_bak&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>, output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>],
                     consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;count(*)&quot;</span>]
actual = client.query(<span class="hljs-string">&quot;coll_bak&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &gt;= 0&quot;</span>,
                      output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;label&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>], limit=<span class="hljs-number">512</span>,
                      consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)
<span class="hljs-keyword">assert</span> count == <span class="hljs-number">256</span>
<span class="hljs-keyword">assert</span> <span class="hljs-built_in">sorted</span>(actual, key=<span class="hljs-keyword">lambda</span> row: row[<span class="hljs-string">&quot;id&quot;</span>]) == expected
hits = client.search(<span class="hljs-string">&quot;coll_bak&quot;</span>, data=[expected[<span class="hljs-number">7</span>][<span class="hljs-string">&quot;vector&quot;</span>]], limit=<span class="hljs-number">1</span>,
                     consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)
<span class="hljs-keyword">assert</span> hits[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;id&quot;</span>] == <span class="hljs-number">7</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Backup and restore verified&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Para outros dados, compare com a sua própria linha de base do momento do backup. Crie um índice vetorial adequado antes do carregamento, caso a coleção restaurada não possua nenhum. A execução bem-sucedida do comando, por si só, não comprova que os dados esperados tenham sido restaurados.</p>
