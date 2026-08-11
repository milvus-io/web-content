---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Saiba como instalar o Milvus em modo autónomo com o Docker Compose.
title: Executar o Milvus com o Docker Compose (Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">Executar o Milvus com o Docker Compose (Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página explica como iniciar uma instância do Milvus no Docker utilizando o Docker Compose.</p>
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
<li><a href="https://docs.docker.com/get-docker/">Instale o Docker</a>.</li>
<li><a href="/docs/pt/prerequisite-docker.md">Verifique os requisitos de hardware e software</a> antes da instalação.</li>
</ul>
<h2 id="Install-Milvus" class="common-anchor-header">Instalar o Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus disponibiliza um ficheiro de configuração do Docker Compose no repositório do Milvus. Para instalar o Milvus utilizando o Docker Compose, basta executar</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0-beta/milvus-standalone-docker-compose.yml -O docker-compose.yml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>A implementação predefinida (v3.0-beta):</strong> <code translate="no">docker compose up -d</code> inicia três contentores — <code translate="no">milvus-etcd</code> (metadados), <code translate="no">milvus-minio</code> (armazenamento de objetos) e <code translate="no">milvus-standalone</code>. A fila de mensagens é <strong>o Woodpecker (incorporado, com o MinIO / armazenamento de objetos como backend WAL)</strong>, pelo que não é necessário um contentor separado para a fila de mensagens.</p>
<p><strong>Fila de mensagens predefinida por versão:</strong></p>
<ul>
<li><strong>2.5.x</strong> — a fila de mensagens predefinida é <strong>o RocksMQ</strong>.</li>
<li><strong>2.6.x e versões posteriores</strong> — a fila de mensagens predefinida é <strong>o Woodpecker (incorporado)</strong>.</li>
</ul>
<p>Descarregue sempre a configuração mais recente do Docker Compose para garantir a compatibilidade com as funcionalidades da v3.0-beta.</p>
<ul>
<li><p>Se não conseguir executar o comando acima, verifique se o seu sistema tem o Docker Compose V1 instalado. Se for esse o caso, recomendamos que migre para o Docker Compose V2, de acordo com as notas <a href="https://docs.docker.com/compose/">nesta página</a>.</p></li>
<li><p>Se tiver alguma dificuldade ao descarregar a imagem, contacte-nos através do endereço <a href="mailto:community@zilliz.com">community@zilliz.com</a> com detalhes sobre o problema, e iremos prestar-lhe o apoio necessário.</p></li>
</ul>
</div>
<p>Após iniciar o Milvus,</p>
<ul>
<li>os contentores denominados <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> e <strong>milvus-etcd</strong> estão em funcionamento.
<ul>
<li>O contentor <strong>milvus-etcd</strong> não expõe quaisquer portas ao anfitrião e mapeia os seus dados para <strong>volumes/etcd</strong> na pasta atual.</li>
<li>O contentor <strong>milvus-minio</strong> disponibiliza as portas <strong>9000</strong> e <strong>9001</strong> localmente com as credenciais de autenticação predefinidas e mapeia os seus dados para <strong>volumes/minio</strong> na pasta atual.</li>
<li>O contentor <strong>milvus-standalone</strong> serve as portas <strong>19530</strong> localmente com as definições predefinidas e mapeia os seus dados para <strong>volumes/milvus</strong> na pasta atual.</li>
</ul></li>
</ul>
<p>Pode verificar se os contentores estão ativos e a funcionar utilizando o seguinte comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose ps</span>

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       &quot;etcd -advertise-cli…&quot;   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       &quot;/usr/bin/docker-ent…&quot;   minio        2 minutes ago   Up 2 minutes (healthy)   9000-9001/tcp
milvus-standalone   …       &quot;/tini -- milvus run…&quot;   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091-&gt;9091/tcp, 0.0.0.0:19530-&gt;19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Também pode aceder à interface Web do Milvus em <code translate="no">http://127.0.0.1:9091/webui/</code> para saber mais sobre a sua instância do Milvus. Para mais detalhes, consulte a <a href="/docs/pt/milvus-webui.md">interface Web do Milvus</a>.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Opcional) Atualizar as configurações do Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Para atualizar a configuração do Milvus de acordo com as suas necessidades, tem de modificar o ficheiro <code translate="no">/milvus/configs/user.yaml</code> dentro do contentor <code translate="no">milvus-standalone</code>.</p>
<ol>
<li><p>Aceda ao contentor <code translate="no">milvus-standalone</code>.</p>
<pre><code translate="no" class="language-shell">docker exec -it milvus-standalone bash
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Adicione configurações adicionais para substituir as predefinidas.
O que se segue pressupõe que precisa de substituir o ficheiro <code translate="no">proxy.healthCheckTimeout</code> predefinido. Para conhecer os itens de configuração aplicáveis, consulte <a href="/docs/pt/system_configuration.md">a Configuração do Sistema</a>.</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; /milvus/configs/user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Reinicie o contentor <code translate="no">milvus-standalone</code> para aplicar as alterações.</p>
<pre><code translate="no" class="language-shell">docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Parar e eliminar o Milvus<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode parar e eliminar este contentor da seguinte forma</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrading-from-Milvus-25x-to-26x" class="common-anchor-header">Atualização do Milvus 2.5.x para 2.6.x<button data-href="#Upgrading-from-Milvus-25x-to-26x" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Limitações da fila de mensagens</strong>: Ao atualizar para o Milvus v3.0-beta, deve manter a sua escolha atual de fila de mensagens. A alternância entre diferentes sistemas de filas de mensagens durante a atualização não é suportada. O suporte à alteração de sistemas de filas de mensagens estará disponível em versões futuras.</p>
<p>Como a versão 2.6.x altera a fila de mensagens predefinida para Woodpecker, uma instância que execute <strong>o RocksMQ</strong> na versão 2.5.x deve <strong>fixar explicitamente o RocksMQ antes da atualização</strong> — caso contrário, a atualização tentaria alterar a fila de mensagens, o que não é suportado. Após descarregar o ficheiro Docker Compose da versão 2.6.x, defina novamente o tipo de fila de mensagens como « <code translate="no">rocksmq</code> » na sua substituição de ` <code translate="no">user.yaml</code> ` e, em seguida, efetue a atualização:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml — keep RocksMQ across the 2.5.x → 2.6.x upgrade</span>
<span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para mudar a fila de mensagens <em>após</em> a atualização, consulte <a href="/docs/pt/switch-mq-type.md">«Mudar a fila de mensagens</a>».</p>
<h2 id="Optional-dependencies" class="common-anchor-header">Dependências opcionais<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta implementação executa <strong>o Woodpecker</strong> (incorporado, backend MinIO WAL) para mensagens, <strong>o etcd</strong> para metadados e <strong>o MinIO</strong> para armazenamento de objetos. Para utilizar uma fila de mensagens diferente ou ligar armazenamento de objetos/metadados externos, consulte:</p>
<ul>
<li>Fila de mensagens: <a href="/docs/pt/woodpecker.md">Woodpecker</a> (padrão) · <a href="/docs/pt/mq_pulsar.md">Pulsar</a> · <a href="/docs/pt/mq_kafka.md">Kafka</a> · <a href="/docs/pt/mq_rocksmq.md">RocksMQ</a></li>
<li>Armazenamento de objetos: <a href="/docs/pt/deploy_s3.md">MinIO</a> (padrão) · <a href="/docs/pt/deploy_s3.md">AWS S3</a> · <a href="/docs/pt/abs.md">Azure Blob</a> · <a href="/docs/pt/gcs.md">GCP Cloud Storage</a> · <a href="/docs/pt/deploy_s3.md">Aliyun OSS</a> · <a href="/docs/pt/deploy_s3.md">Tencent COS</a> · <a href="/docs/pt/deploy_s3.md">Huawei OBS</a> · <a href="/docs/pt/deploy_s3.md">Compatível com S3</a></li>
<li>Metadados: <a href="/docs/pt/deploy_etcd.md">etcd</a></li>
</ul>
<div class="alert note">
<p>O Storage V3 está desativado por predefinição. Ative-o antes de utilizar funcionalidades que dependam dele. Para conhecer os requisitos e as considerações de compatibilidade, consulte <a href="/docs/pt/storage-v3.md">Storage V3</a>.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Próximos passos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de instalar o Milvus no Docker, pode:</p>
<ul>
<li><p>Consultar <a href="/docs/pt/quickstart.md">o Guia de Início Rápido</a> para ver o que o Milvus pode fazer.</p></li>
<li><p>Aprender as operações básicas do Milvus:</p>
<ul>
<li><a href="/docs/pt/manage_databases.md">Gerir bases de dados</a></li>
<li><a href="/docs/pt/manage-collections.md">Gerir coleções</a></li>
<li><a href="/docs/pt/manage-partitions.md">Gerir partições</a></li>
<li><a href="/docs/pt/insert-update-delete.md">Inserir, atualizar e eliminar</a></li>
<li><a href="/docs/pt/single-vector-search.md">Pesquisa de vetor único</a></li>
<li><a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida</a></li>
</ul></li>
<li><p><a href="/docs/pt/upgrade_milvus_cluster-helm.md">Atualizar o Milvus utilizando o Helm Chart</a>.</p></li>
<li><p><a href="/docs/pt/scaleout.md">Dimensionar o seu cluster Milvus</a>.</p></li>
<li><p>Implemente o seu cluster Milvus nas nuvens:</p>
<ul>
<li><a href="/docs/pt/eks.md">Amazon EKS</a></li>
<li><a href="/docs/pt/gcp.md">Google Cloud</a></li>
<li><a href="/docs/pt/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/pt/milvus-webui.md">o Milvus WebUI</a>, uma interface web intuitiva para a monitorização e gestão do Milvus.</p></li>
<li><p>Explore <a href="/docs/pt/milvus_backup_overview.md">o Milvus Backup</a>, uma ferramenta de código aberto para cópias de segurança dos dados do Milvus.</p></li>
<li><p>Explore <a href="/docs/pt/birdwatcher_overview.md">o Birdwatcher</a>, uma ferramenta de código aberto para depuração do Milvus e atualizações dinâmicas de configuração.</p></li>
<li><p>Explore <a href="https://github.com/zilliztech/attu">o Attu</a>, uma ferramenta GUI de código aberto para a gestão intuitiva do Milvus.</p></li>
<li><p><a href="/docs/pt/monitor.md">Monitorize o Milvus com o Prometheus</a>.</p></li>
</ul>
