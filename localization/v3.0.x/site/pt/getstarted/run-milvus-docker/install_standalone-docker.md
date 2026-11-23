---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Saiba como instalar o Milvus em modo autónomo com o Docker.
title: Executar o Milvus no Docker (Linux)
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">Executar o Milvus no Docker (Linux)<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página explica como iniciar uma instância do Milvus no Docker.</p>
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
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">Instalar o Milvus no Docker<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus fornece um script de instalação para o instalar como um contentor Docker. O script está disponível no <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">repositório do Milvus</a>. Descarregue e verifique o script antes de iniciar uma nova implementação:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Inspect the Docker image selected by the script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">grep -n <span class="hljs-string">&quot;milvusdb/milvus:&quot;</span> standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>O script é descarregado a partir do ramo « <code translate="no">master</code> » do Milvus. A etiqueta da imagem do Docker está definida no script e pode diferir da v3.0.5. Para instalar essa versão específica, utilize a configuração com versão indicada em <a href="/docs/pt/install_standalone-docker-compose.md">«Executar o Milvus com o Docker Compose</a>».</p>
<p>Esta implementação do Docker executa <strong>o Woodpecker</strong> com o <strong>sistema de ficheiros local</strong> como backend WAL, pelo que não é necessário qualquer serviço externo de fila de mensagens. Consulte <a href="/docs/pt/woodpecker.md">Woodpecker</a>.</p>
<p>Se pretender utilizar <a href="/docs/pt/milvus_backup_overview.md">o Backup</a> no modo de implementação autónoma, recomenda-se a utilização do método de implementação <a href="/docs/pt/install_standalone-docker-compose.md">Docker Compose</a>.</p>
<p>Se tiver alguma dificuldade ao descarregar a imagem, contacte-nos através do endereço <a href="mailto:community@zilliz.com">community@zilliz.com</a> com detalhes sobre o problema e iremos prestar-lhe o apoio necessário.</p>
</div>
<p>Após executar o script de instalação:</p>
<ul>
<li>Foi iniciado um contentor Docker denominado milvus-standalone na porta <strong>19530</strong>.</li>
<li>Um etcd incorporado está instalado juntamente com o Milvus no mesmo contentor e funciona na porta <strong>2379</strong>. O seu ficheiro de configuração está mapeado para <strong>embedEtcd.yaml</strong> na pasta atual.</li>
<li>Para alterar a configuração predefinida do Milvus, adicione as suas definições ao ficheiro <strong>user.yaml</strong> na pasta atual e, em seguida, reinicie o serviço.</li>
<li>O volume de dados do Milvus está mapeado para <strong>volumes/milvus</strong> na pasta atual.</li>
</ul>
<p>O comando ` <code translate="no">start</code> ` exibe ` <code translate="no">Wait for Milvus Starting...</code> ` e, em seguida, verifica uma vez por segundo até que ` <code translate="no">docker ps</code> ` indique que o contentor está em bom estado. Esta verificação não tem limite de tempo. Se o comando não responder, verifique os registos do contentor a partir de outro terminal:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> docker logs milvus-standalone
<button class="copy-code-btn"></button></code></pre>
<p>O script executa os seus comandos ` <code translate="no">docker</code> ` com ` <code translate="no">sudo</code>`. Cada ` <code translate="no">start</code> ` executa primeiro um contentor de curta duração a partir da imagem do Milvus como ` <code translate="no">root</code>`, o qual altera recursivamente o proprietário de <strong>`volumes/milvus</strong> ` para o utilizador ` <code translate="no">milvus</code> ` da imagem, a menos que um ficheiro marcador ` <code translate="no">.milvus-volume-owner-*</code> ` nessa pasta indique que isso já foi feito. O script inicia o contentor do Milvus com ` <code translate="no">--security-opt seccomp:unconfined</code>`, para que o contentor seja executado sem o perfil seccomp predefinido do Docker.</p>
<div class="alert warning">
<blockquote>
<p>O script publica as portas <strong>19530</strong>, <strong>9091</strong> e <strong>2379</strong> sem um endereço de anfitrião, e o ficheiro ` <strong>embedEtcd.yaml</strong> ` configura o etcd para escutar em <code translate="no">http://0.0.0.0:2379</code>. O Docker publica uma porta sem endereço de anfitrião em todos os endereços de anfitrião, pelo que outras máquinas que consigam aceder a este anfitrião também se podem ligar ao Milvus e ao etcd. Para limitar o acesso a este anfitrião, edite as opções « <code translate="no">-p</code> » em <code translate="no">standalone_embed.sh</code> antes do primeiro « <code translate="no">start</code> », por exemplo, <code translate="no">-p 127.0.0.1:19530:19530</code>, e remova « <code translate="no">-p 2379:2379</code> » se não se ligar ao etcd a partir do exterior do contentor. Se já existir um contentor <code translate="no">milvus-standalone</code>, o comando <code translate="no">start</code> reinicia-o com as suas opções originais. Para exigir credenciais para as ligações ao Milvus, consulte <a href="/docs/pt/authenticate.md">«Autenticar o acesso do utilizador</a>».</p>
</blockquote>
</div>
<p>Verifique a imagem atual e o estado de integridade:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">sudo</span> docker inspect --format <span class="hljs-string">&#x27;{{.Config.Image}}&#x27;</span> milvus-standalone
<span class="hljs-built_in">sudo</span> docker inspect --format <span class="hljs-string">&#x27;{{.State.Health.Status}}&#x27;</span> milvus-standalone
<button class="copy-code-btn"></button></code></pre>
<p>Aguarde até que <code translate="no">healthy</code> esteja disponível antes de seguir <a href="/docs/pt/quickstart.md">o Guia de Início Rápido</a>. Ao utilizar este servidor, ligue o SDK a <code translate="no">http://localhost:19530</code>; uma URI local <code translate="no">.db</code> inicia, em vez disso, o Milvus Lite.</p>
<p>Pode aceder à interface Web do Milvus em <code translate="no">http://127.0.0.1:9091/webui/</code> para saber mais sobre a sua instância do Milvus. Para mais detalhes, consulte <a href="/docs/pt/milvus-webui.md">Interface Web do Milvus</a>.</p>
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
    </button></h2><p>Pode modificar as configurações do Milvus no ficheiro <strong>user.yaml</strong> na pasta atual. Por exemplo, para alterar <code translate="no">proxy.healthCheckTimeout</code> para <code translate="no">1000</code> ms, pode modificar o ficheiro da seguinte forma:</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, reinicie o serviço da seguinte forma:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para os itens de configuração aplicáveis, consulte <a href="/docs/pt/system_configuration.md">«Configuração do sistema</a>».</p>
<h2 id="Upgrade-Milvus" class="common-anchor-header">Atualizar o Milvus<button data-href="#Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>O comando <code translate="no">upgrade</code> do script descarrega o script a partir de <code translate="no">master</code> e recria o contentor utilizando a imagem selecionada por esse script. Não valida um caminho de versão de origem para destino suportado e pode recriar ficheiros de configuração gerados. Não considere isto como uma garantia de que uma implementação antiga arbitrária possa ser atualizada com segurança para a v3.0.5.</p>
<p>Antes de uma atualização, faça uma cópia de segurança dos metadados, dos dados persistentes, de <code translate="no">embedEtcd.yaml</code> e de <code translate="no">user.yaml</code>. Verifique a versão de destino, a fila de mensagens e a compatibilidade de armazenamento, e valide a recuperação num ambiente que não seja de produção. Para implementações geridas com o Docker Compose, siga <a href="/docs/pt/upgrade_milvus_standalone-docker.md">as instruções em «Atualizar o Milvus Standalone com o Docker Compose»</a>; não aplique esse procedimento diretamente a um contentor gerido por script.</p>
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
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Por predefinição, esta implementação executa <strong>o Woodpecker</strong> (WAL no sistema de ficheiros local) como fila de mensagens e um <strong>etcd incorporado</strong> para metadados — não é necessário instalar mais nada. Para utilizar uma fila de mensagens diferente ou ligar armazenamento de objetos/metadados externos, consulte:</p>
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
<li><p>Consulte <a href="/docs/pt/quickstart.md">o Guia de Início Rápido</a> para ver o que o Milvus pode fazer.</p></li>
<li><p>Aprender as operações básicas do Milvus:</p>
<ul>
<li><a href="/docs/pt/manage_databases.md">Gerir bases de dados</a></li>
<li><a href="/docs/pt/manage-collections.md">Gerir coleções</a></li>
<li><a href="/docs/pt/manage-partitions.md">Gerir partições</a></li>
<li><a href="/docs/pt/insert-update-delete.md">Inserir, atualizar e eliminar</a></li>
<li><a href="/docs/pt/single-vector-search.md">Pesquisa de vetor único</a></li>
<li><a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida</a></li>
</ul></li>
<li><p>Consulte as considerações relativas à atualização nesta página antes de alterar a versão do Milvus.</p></li>
<li><p><a href="/docs/pt/scaleout.md">Dimensionar um cluster Milvus</a> no Kubernetes. Esse procedimento utiliza o Helm e não se aplica a esta implementação do Docker.</p></li>
<li><p>Implemente o seu cluster Milvus em nuvens:</p>
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
