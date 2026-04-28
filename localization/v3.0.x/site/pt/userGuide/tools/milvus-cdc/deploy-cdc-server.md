---
id: deploy-cdc-server.md
order: 2
summary: >-
  Este guia fornece um processo passo-a-passo para a implantação de um servidor
  Milvus-CDC.
title: Implantar o servidor CDC
---
<h1 id="Deploy-CDC-Server" class="common-anchor-header">Implantar o servidor CDC<button data-href="#Deploy-CDC-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia fornece um processo passo-a-passo para a implantação de um servidor Milvus-CDC.</p>
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
    </button></h2><p>Certifique-se de que as seguintes condições sejam atendidas antes de implantar um servidor Milvus-CDC:</p>
<ul>
<li><p><strong>Instâncias do Milvus</strong>: Tanto o Milvus de origem quanto pelo menos um Milvus de destino devem estar implantados e operacionais.</p>
<ul>
<li><p>As versões do Milvus de origem e de destino devem ser 2.3.2 ou superior, de preferência 2.4.x. Recomendamos a utilização da mesma versão para o Milvus de origem e de destino para garantir a compatibilidade.</p></li>
<li><p>Defina a configuração <code translate="no">common.ttMsgEnabled</code> do Milvus de destino para <code translate="no">false</code>.</p></li>
<li><p>Configure o Milvus de origem e o Milvus de destino com definições distintas de meta e armazenamento de mensagens para evitar conflitos. Por exemplo, evite usar as mesmas configurações de etcd e rootPath, bem como serviços Pulsar idênticos e <code translate="no">chanNamePrefix</code> em várias instâncias do Milvus.</p></li>
</ul></li>
<li><p><strong>Metastore</strong>: Tenha um banco de dados etcd ou MySQL pronto para o metastore do Milvus-CDC.</p></li>
</ul>
<h2 id="Steps" class="common-anchor-header">Etapas<button data-href="#Steps" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Obtain-the-Milvus-CDC-config-file" class="common-anchor-header">Obter o arquivo de configuração do Milvus-CDC</h3><p>Clone o <a href="https://github.com/zilliztech/milvus-cdc">repositório Milvus-CDC</a> e navegue até ao diretório <code translate="no">milvus-cdc/server/configs</code> para aceder ao ficheiro de configuração <code translate="no">cdc.yaml</code>.</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-cdc.git

<span class="hljs-built_in">cd</span> milvus-cdc/server/configs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Edit-the-config-file" class="common-anchor-header">Editar o ficheiro de configuração</h3><p>No diretório <code translate="no">milvus-cdc/server/configs</code>, modifique o ficheiro <code translate="no">cdc.yaml</code> para personalizar as configurações relacionadas com o metastore do Milvus-CDC e os detalhes de ligação do Milvus de origem.</p>
<ul>
<li><p><strong>Configuração do metastore</strong>:</p>
<ul>
<li><p><code translate="no">metaStoreConfig.storeType</code>: Tipo de metastore para o Milvus-CDC. Os valores possíveis são <code translate="no">etcd</code> ou <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.etcdEndpoints</code>: Endereço de ligação ao etcd do Milvus-CDC. Obrigatório se <code translate="no">storeType</code> estiver definido como <code translate="no">etcd</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.mysqlSourceUrl</code>: Endereço de ligação da base de dados MySQL para o servidor Milvus-CDC. Obrigatório se <code translate="no">storeType</code> estiver definido como <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.rootPath</code>: Caminho da raiz do metastore do Milvus-CDC. Esta configuração permite o multilocatário, permitindo que vários serviços CDC utilizem a mesma instância etcd ou MySQL, ao mesmo tempo que obtêm o isolamento através de diferentes caminhos de raiz.</p></li>
</ul>
<p>Exemplo de configuração:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># cdc meta data config</span>
<span class="hljs-attr">metaStoreConfig:</span>
  <span class="hljs-comment"># the metastore type, available value: etcd, mysql</span>
  <span class="hljs-attr">storeType:</span> <span class="hljs-string">etcd</span>
  <span class="hljs-comment"># etcd address</span>
  <span class="hljs-attr">etcdEndpoints:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-comment"># mysql connection address</span>
  <span class="hljs-comment"># mysqlSourceUrl: root:root@tcp(127.0.0.1:3306)/milvus-cdc?charset=utf8</span>
  <span class="hljs-comment"># meta data prefix, if multiple cdc services use the same store service, you can set different rootPaths to achieve multi-tenancy</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">cdc</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Configuração do Milvus de origem:</strong></p>
<p>Especifique os detalhes de ligação do Milvus de origem, incluindo o etcd e o armazenamento de mensagens, para estabelecer uma ligação entre o servidor Milvus-CDC e o Milvus de origem.</p>
<ul>
<li><p><code translate="no">sourceConfig.etcdAddress</code>: Endereço para conexão com o etcd do Milvus de origem. Para mais informações, consulte <a href="https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations">Configurações relacionadas com o etcd</a>.</p></li>
<li><p><code translate="no">sourceConfig.etcdRootPath</code>: Prefixo da raiz da chave onde o Milvus de origem armazena os dados no etcd. O valor pode variar com base no método de implantação da instância do Milvus:</p>
<ul>
<li><p><strong>Helm</strong> ou <strong>Docker Compose</strong>: A predefinição é <code translate="no">by-dev</code>.</p></li>
<li><p><strong>Operator (Operador</strong>): A predefinição é <code translate="no">&lt;release_name&gt;</code>.</p></li>
</ul></li>
<li><p><code translate="no">replicateChan</code>Nome do canal de replicação do milvus, que é <code translate="no">{msgChannel.chanNamePrefix.cluster}/{msgChannel.chanNamePrefix.replicateMsg}</code> no ficheiro milvus.yaml</p></li>
<li><p><code translate="no">sourceConfig.pulsar</code>: Configurações do Pulsar para o Milvus de origem. Se o Milvus de origem usa Kafka para armazenamento de mensagens, remova todas as configurações relacionadas ao Pulsar. Para obter mais informações, consulte <a href="https://milvus.io/docs/configure_pulsar.md">Configurações relacionadas ao Pulsar</a>.</p></li>
<li><p><code translate="no">sourceConfig.kafka.address</code>: Endereço do Kafka para o Milvus de origem. Descomente esta configuração se o Milvus de origem usa Kafka para armazenamento de mensagens.</p></li>
</ul></li>
</ul>
<p>Exemplo de configuração:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-source config, these settings are basically the same as the corresponding configuration of milvus.yaml in milvus source.</span>
<span class="hljs-attr">sourceConfig:</span>
  <span class="hljs-comment"># etcd config</span>
  <span class="hljs-attr">etcdAddress:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-attr">etcdRootPath:</span> <span class="hljs-string">by-dev</span>
  <span class="hljs-attr">etcdMetaSubPath:</span> <span class="hljs-string">meta</span>
  <span class="hljs-comment"># default partition name</span>
  <span class="hljs-attr">defaultPartitionName:</span> <span class="hljs-string">_default</span>
  <span class="hljs-comment"># read buffer length, mainly used for buffering if writing data to milvus-target is slow.</span>
  <span class="hljs-attr">readChanLen:</span> <span class="hljs-number">10</span>
  <span class="hljs-attr">replicateChan:</span> <span class="hljs-string">by-dev-replicate-msg</span>
  <span class="hljs-comment"># milvus-source mq config, which is pulsar or kafka</span>
  <span class="hljs-attr">pulsar:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">pulsar://localhost:6650</span>
    <span class="hljs-attr">webAddress:</span> <span class="hljs-string">localhost:80</span>
    <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span>
    <span class="hljs-attr">tenant:</span> <span class="hljs-string">public</span>
    <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
<span class="hljs-comment">#    authPlugin: org.apache.pulsar.client.impl.auth.AuthenticationToken</span>
<span class="hljs-comment">#    authParams: token:xxx</span>
<span class="hljs-comment">#  kafka:</span>
<span class="hljs-comment">#    address: 127.0.0.1:9092</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Compile-the-Milvus-CDC-server" class="common-anchor-header">Compilar o servidor Milvus-CDC</h3><p>Depois de guardar o ficheiro <code translate="no">cdc.yaml</code>, navegue até ao diretório <code translate="no">milvus-cdc</code> e execute um dos seguintes comandos para compilar o servidor:</p>
<ul>
<li><p>Para um ficheiro binário:</p>
<pre><code translate="no" class="language-bash">make build
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Para uma imagem do Docker:</p>
<pre><code translate="no" class="language-bash">bash build_image.sh
<button class="copy-code-btn"></button></code></pre>
<p>Para uma imagem Docker, monte o ficheiro compilado em <code translate="no">/app/server/configs/cdc.yaml</code> dentro do contentor.</p></li>
</ul>
<h3 id="Start-the-server" class="common-anchor-header">Iniciar o servidor</h3><ul>
<li><p>Usando o binário</p>
<p>Navegue até o diretório que contém o binário <code translate="no">milvus-cdc</code> e o diretório <code translate="no">configs</code> com o arquivo <code translate="no">cdc.yaml</code> e, em seguida, inicie o servidor:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># dir tree</span>
.
├── milvus-cdc <span class="hljs-comment"># build from source code or download from release page</span>
├── configs
│   └── cdc.yaml <span class="hljs-comment"># config for cdc and source milvus</span>

<span class="hljs-comment"># start milvus cdc</span>
./milvus-cdc server
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Usando o Docker Compose:</p>
<pre><code translate="no" class="language-bash">docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ul>
