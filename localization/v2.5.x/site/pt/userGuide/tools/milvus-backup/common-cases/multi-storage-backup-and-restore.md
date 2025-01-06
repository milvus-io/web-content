---
id: multi-storage-backup-and-restore.md
summary: >-
  Este tópico detalha o processo de fazer o backup de uma coleção de uma
  instância do Milvus e restaurá-la para outra
title: Migrar entre instâncias em ambientes S3
---
<h1 id="Migrate-Between-Instances-Across-S3-Environments" class="common-anchor-header">Migrar entre instâncias em ambientes S3<button data-href="#Migrate-Between-Instances-Across-S3-Environments" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico detalha o processo de fazer o backup de uma coleção de uma instância do Milvus e restaurá-la em outra, com cada instância usando um armazenamento de objetos diferente.</p>
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
    </button></h2><p>O diagrama abaixo ilustra o processo de cópia de segurança e restauro utilizando diferentes armazenamentos de objectos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-storage-backup-and-restore.png" alt="multi-storage-backup-and-restore.png" class="doc-image" id="multi-storage-backup-and-restore.png" />
   </span> <span class="img-wrapper"> <span>multi-storage-backup-and-restore.png</span> </span></p>
<p>Suponhamos que temos duas instâncias do Milvus, <code translate="no">milvus_A</code> e <code translate="no">milvus_B</code>, utilizando diferentes armazenamentos de objectos. Neste exemplo, o nosso objetivo é concluir as seguintes tarefas:</p>
<ol>
<li><p>Criar uma cópia de segurança (my_backup) para a coleção <code translate="no">coll</code> em <code translate="no">bucket_A</code> do armazenamento de objectos de<code translate="no">milvus_A</code>.</p></li>
<li><p>Transferir a cópia de segurança my_backup para <code translate="no">bucket_B</code> do armazenamento de objectos de <code translate="no">milvus_B</code>.</p></li>
</ol>
<p>Em <code translate="no">bucket_B</code>, restaurar a partir do backup e nomear a coleção restaurada coll_bak.</p>
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
<li><p>Certifique-se de que a ferramenta <strong>milvus-backup</strong> está instalada.</p></li>
<li><p>Familiarize-se com a configuração do armazenamento de objetos do Milvus. Para obter detalhes, consulte <a href="https://milvus.io/docs/deploy_s3.md">Armazenamento de objetos</a>.</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">Fazer backup de uma coleção do milvus_A<button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">Etapa 1: Preparar a configuração</h3><p>Vá para o diretório do projeto milvus-backup e crie um diretório chamado configs:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">mkdir</span> configs
<span class="hljs-built_in">cd</span> configs
<button class="copy-code-btn"></button></code></pre>
<p>Descarregue o ficheiro de configuração de backup <code translate="no">backup.yaml</code>:</p>
<pre><code translate="no" class="language-shell">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-backup/main/configs/backup.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>A estrutura do ficheiro tem o seguinte aspeto:</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">Passo 2: Editar o ficheiro de configuração</h3><p>Modificar o ficheiro <code translate="no">backup.yaml</code> para definir as configurações apropriadas para milvus_A:</p>
<ul>
<li><p>Conexão configs</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
milvus:
  address: milvus_A
  port: <span class="hljs-number">19530</span>
  authorizationEnabled: false
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  tlsMode: <span class="hljs-number">0</span>
  user: <span class="hljs-string">&quot;root&quot;</span>
  password: <span class="hljs-string">&quot;Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">milvus.address</code>: Endereço IP ou nome do host do servidor milvus_A.</p></li>
<li><p><code translate="no">milvus.port</code>: Porta TCP em que o servidor Milvus está a ouvir (predefinição 19530).</p></li>
</ul></li>
<li><p>Configurações de armazenamento (definições MinIO/S3)</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: minio_A <span class="hljs-comment"># Address of MinIO/S3</span>
  port: <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  accessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  secretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  useSSL: false <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  useIAM: false
  iamEndpoint: <span class="hljs-string">&quot;&quot;</span>
  
  bucketName: <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  rootPath: <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  backupAccessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  backupSecretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  backupBucketName: <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  backupRootPath: <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">minio.bucketName</code>: Nome do contentor utilizado para o armazenamento de dados em milvus_A. Neste exemplo, definido como <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.rootPath</code>: Caminho raiz dentro do bucket onde os dados de milvus_A são armazenados. Neste exemplo, defina como <code translate="no">files</code>.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: Nome do compartimento utilizado para armazenamento de cópias de segurança. Neste exemplo, definido como <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: Caminho de raiz dentro do contentor designado para armazenar ficheiros de cópia de segurança em <code translate="no">milvus_B</code>. Neste exemplo, definido para <code translate="no">backup</code>.</p></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">Etapa 3: Criar backup</h3><p>Depois que backup.yaml for salvo, crie um backup chamado <code translate="no">my_backup</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Este comando cria a cópia de segurança <code translate="no">bucket_A/backup/my_backup</code> no armazenamento de objectos de <code translate="no">milvus_A</code>.</p>
<h2 id="Manually-transfer-the-backup-to-milvusB" class="common-anchor-header">Transferir manualmente a cópia de segurança para milvus_B<button data-href="#Manually-transfer-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><p>Uma vez que <code translate="no">milvus_A</code> e <code translate="no">milvus_B</code> utilizam um armazenamento de objectos diferente, é necessário transferir manualmente a cópia de segurança do armazenamento de milvus_A e carregá-la para o armazenamento de<code translate="no">milvus_B</code>.</p>
<p><strong>Utilizar a consola do MinIO</strong></p>
<ol>
<li><p>Inicie sessão na consola MinIO.</p></li>
<li><p>Localize o bucket especificado em minio.address para milvus_A.</p></li>
<li><p>Selecione os ficheiros de cópia de segurança no bucket.</p></li>
<li><p>Clique em <strong>Download</strong> para transferir os ficheiros para a sua máquina.</p></li>
</ol>
<p><strong>Utilizar o cliente mc</strong></p>
<p>Em alternativa, pode utilizar o <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">cliente mc</a> para transferir os ficheiros de cópia de segurança:</p>
<ol>
<li>Configurar um anfitrião MinIO:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta"># configure a Minio host</span>
mc <span class="hljs-keyword">alias</span> <span class="hljs-keyword">set</span> my_minio https:<span class="hljs-comment">//&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Listar os buckets disponíveis:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># List the available buckets</span>
mc ls my_minio
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Descarregar um bucket recursivamente:</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Assim que os ficheiros de cópia de segurança forem transferidos, pode carregá-los para o armazenamento de objectos utilizado por <code translate="no">milvus_B</code> para restauro futuro. Em alternativa, pode carregar a cópia de segurança para o <a href="https://cloud.zilliz.com/">Zilliz Cloud</a> para criar uma base de dados vetorial gerida com os seus dados. Para obter detalhes, consulte <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migrar do Milvus para o Zilliz Cloud</a>.</p>
<h2 id="Restore-from-the-backup-to-milvusB" class="common-anchor-header">Restaurar a partir da cópia de segurança para milvus_B<button data-href="#Restore-from-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">Passo 1: Configurar as definições de restauro</h3><p>Repita a etapa 2 para modificar as configurações para restauração para <code translate="no">milvus_B</code>, garantindo que <code translate="no">minio.bucketName</code> esteja definido como <code translate="no">bucket_B</code>.</p>
<p>Aqui está um exemplo de configuração:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
milvus:
  address: milvus_B
  port: <span class="hljs-number">19530</span>
  authorizationEnabled: false
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  tlsMode: <span class="hljs-number">0</span>
  user: <span class="hljs-string">&quot;root&quot;</span>
  password: <span class="hljs-string">&quot;Milvus&quot;</span>
  
<span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: minio_B <span class="hljs-comment"># Address of MinIO/S3</span>
  port: <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  accessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  secretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  useSSL: false <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  useIAM: false
  iamEndpoint: <span class="hljs-string">&quot;&quot;</span>
  
  bucketName: <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  rootPath: <span class="hljs-string">&quot;files&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  backupAccessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  backupSecretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  backupBucketName: <span class="hljs-string">&quot;bucket_B&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  backupRootPath: <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-from-the-backup" class="common-anchor-header">Passo 2: Restaurar a partir da cópia de segurança</h3><p>Restaure o backup para <code translate="no">milvus_B</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Este comando restaura a cópia de segurança para uma nova coleção denominada coll_bak em<code translate="no">milvus_B</code>, com dados armazenados em <code translate="no">bucket_B/files/insert_log/[ID of new collection]</code> no armazenamento de objectos de <code translate="no">milvus_B</code>.</p>
