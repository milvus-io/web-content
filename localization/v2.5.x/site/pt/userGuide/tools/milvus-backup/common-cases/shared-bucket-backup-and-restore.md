---
id: shared-bucket-backup-and-restore.md
summary: >-
  Este tópico detalha o processo de fazer backup de uma coleção de uma instância
  do Milvus e restaurá-la em outra, usando um bucket compartilhado para
  armazenamento de objetos
title: Migrar entre instâncias em um bucket (caminhos raiz diferentes)
---
<h1 id="Migrate-Between-Instances-in-One-Bucket-Different-Root-Paths" class="common-anchor-header">Migrar entre instâncias em um bucket (caminhos raiz diferentes)<button data-href="#Migrate-Between-Instances-in-One-Bucket-Different-Root-Paths" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico detalha o processo de fazer backup de uma coleção de uma instância do Milvus e restaurá-la para outra, usando um bucket compartilhado para armazenamento de objetos, com caminhos raiz distintos para cada instância.</p>
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
    </button></h2><p>O diagrama abaixo ilustra o processo de backup e restauração usando um bucket compartilhado.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/shared-bucket-backup-and-restore.png" alt="shared-bucket-backup-and-restore.png" class="doc-image" id="shared-bucket-backup-and-restore.png" />
   </span> <span class="img-wrapper"> <span>shared-bucket-backup-and-restore.png</span> </span></p>
<p>Suponha que temos instâncias Milvus, <code translate="no">milvus_A</code> e <code translate="no">milvus_B</code>, ambas utilizando o mecanismo de armazenamento MinIO padrão para armazenamento de objetos. Essas instâncias compartilham o mesmo bucket, <code translate="no">bucket_A</code>, mas armazenam seus dados em caminhos de raiz diferentes: <code translate="no">files_A</code> para <code translate="no">milvus_A</code> e files_B para <code translate="no">milvus_B</code>. Neste exemplo, nosso objetivo é concluir as seguintes tarefas:</p>
<ol>
<li><p>Criar uma cópia de segurança (my_backup) para a coleção coll que está armazenada no caminho<code translate="no">files_A</code> para <code translate="no">milvus_A</code>.</p></li>
<li><p>Restaurar a partir da cópia de segurança e armazená-la em files_B para <code translate="no">milvus_B</code>.</p></li>
</ol>
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
<li><p>Familiarize-se com a configuração das definições de armazenamento de objectos do Milvus. Para obter detalhes, consulte <a href="https://milvus.io/docs/deploy_s3.md">Armazenamento de objectos</a>.</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">Fazer backup de uma coleção de <code translate="no">milvus_A</code><button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
<pre><code translate="no" class="language-shell">mkdir configs
cd configs
<button class="copy-code-btn"></button></code></pre>
<p>Faça o download do arquivo de configuração de backup backup.yaml:</p>
<pre><code translate="no" class="language-shell">wget https://raw.githubusercontent.com/zilliztech/milvus-backup/main/configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>A estrutura do ficheiro tem o seguinte aspeto:</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">Passo 2: Editar o ficheiro de configuração</h3><p>Modifique o ficheiro backup.yaml para definir as configurações apropriadas para<code translate="no">milvus_A</code>:</p>
<ul>
<li><p>Configurações de conexão</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_A</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;root&quot;</span>
  <span class="hljs-attr">password:</span> <span class="hljs-string">&quot;Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">milvus.address</code>: Endereço IP ou nome de host do servidor <code translate="no">milvus_A</code>.</p></li>
<li><p><code translate="no">milvus.port</code>: Porta TCP na qual o servidor Milvus está a ouvir (predefinição 19530).</p></li>
</ul></li>
<li><p>Configurações de armazenamento (definições MinIO/S3)</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  <span class="hljs-attr">storageType:</span> <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_A</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files_A&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  <span class="hljs-attr">backupAccessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">backupSecretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  <span class="hljs-attr">backupBucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  <span class="hljs-attr">backupRootPath:</span> <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">minio.bucketName</code>: Nome do contentor utilizado para o armazenamento <code translate="no">milvus_A</code>. Neste exemplo, definido como <code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.rootPath</code>: Caminho raiz dentro do bucket onde os dados de <code translate="no">milvus_A</code> são armazenados. Neste exemplo, defina como <code translate="no">files_A</code>.</p></li>
<li><p><code translate="no">minio.backupBucketName</code>: Nome do compartimento usado para armazenamento. Neste exemplo, <code translate="no">milvus_A</code> e <code translate="no">milvus_B</code> partilham o contentor. Portanto, defina como<code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>: Caminho raiz dentro do compartimento designado para armazenar ficheiros de cópia de segurança em <code translate="no">milvus_B</code>. Neste exemplo, utilize um caminho diferente de <code translate="no">milvus_A</code>. Por conseguinte, defina para <code translate="no">backup</code>.</p></li>
</ul></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">Etapa 3: Criar backup</h3><p>Depois que <code translate="no">backup.yaml</code> for salvo, crie um backup chamado my_backup:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>Este comando cria a cópia de segurança <code translate="no">bucket_A/backup/my_backup</code> no armazenamento de objectos para a coleção <code translate="no">coll</code>.</p>
<h2 id="Restore-the-backup-to-milvusB" class="common-anchor-header">Restaurar a cópia de segurança para <code translate="no">milvus_B</code><button data-href="#Restore-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">Passo 1: Configurar as definições de restauro</h3><p>Repita a etapa 2 para modificar as configurações de restauração para <code translate="no">milvus_B</code>, garantindo que <code translate="no">minio.bucketName</code> esteja definido como <code translate="no">bucket_A</code> e <code translate="no">minio.rootPath</code> como <code translate="no">files_B</code> para distinguir os locais de armazenamento entre as duas instâncias.</p>
<p>Aqui está um exemplo de configuração:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_B</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  <span class="hljs-attr">tlsMode:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;root&quot;</span>
  <span class="hljs-attr">password:</span> <span class="hljs-string">&quot;Milvus&quot;</span>
  
<span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  <span class="hljs-attr">storageType:</span> <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  <span class="hljs-attr">address:</span> <span class="hljs-string">milvus_B</span> <span class="hljs-comment"># Address of MinIO/S3</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span> <span class="hljs-comment"># MinIO/S3 encryption string</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">&quot;files_B&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>
  <span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-backup" class="common-anchor-header">Etapa 2: Restaurar backup</h3><p>Restaurar a cópia de segurança para <code translate="no">milvus_B</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Este comando restaura a cópia de segurança para uma nova coleção denominada <code translate="no">coll_bak</code> em <code translate="no">milvus_B</code>, com dados armazenados em <code translate="no">bucket_A/files_B/insert_log/[ID of new collection]</code>.</p>
