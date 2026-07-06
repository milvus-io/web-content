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
<li><a href="/docs/pt/v2.6.x/prerequisite-docker.md">Verifique os requisitos de hardware e software</a> antes da instalação.</li>
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
    </button></h2><p>O Milvus fornece um script de instalação para o instalar como um contentor Docker. O script está disponível no <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">repositório</a> do <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">Milvus</a>. Para instalar o Milvus no Docker, basta executar</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Novidades na versão 2.6.19:</strong></p>
<ul>
<li><strong>Nó de streaming</strong>: Capacidades de processamento de dados melhoradas</li>
<li><strong>Woodpecker MQ</strong>: Fila de mensagens melhorada com menor sobrecarga de manutenção; consulte <a href="/docs/pt/v2.6.x/use-woodpecker.md">«Utilizar o Woodpecker</a> » para mais detalhes</li>
<li><strong>Arquitetura otimizada</strong>: componentes consolidados para um melhor desempenho</li>
</ul>
<p>Descarregue sempre o script mais recente para garantir que obtém as configurações e melhorias de arquitetura mais recentes.</p>
<p>Se pretender utilizar <a href="https://milvus.io/docs/milvus_backup_overview.md">o Backup</a> no modo de implementação autónoma, recomenda-se que utilize o método de implementação <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Compose</a>.</p>
<p>Se tiver alguma dificuldade ao descarregar a imagem, contacte-nos através do endereço <a href="mailto:community@zilliz.com">community@zilliz.com</a> com detalhes sobre o problema e iremos prestar-lhe o apoio necessário.</p>
</div>
<p>Após executar o script de instalação:</p>
<ul>
<li>Foi iniciado um contentor Docker denominado «milvus» na porta <strong>19530</strong>.</li>
<li>Um etcd incorporado está instalado juntamente com o Milvus no mesmo contentor e funciona na porta <strong>2379</strong>. O seu ficheiro de configuração está mapeado para <strong>embedEtcd.yaml</strong> na pasta atual.</li>
<li>Para alterar a configuração predefinida do Milvus, adicione as suas definições ao ficheiro <strong>user.yaml</strong> na pasta atual e, em seguida, reinicie o serviço.</li>
<li>O volume de dados do Milvus está mapeado para <strong>volumes/milvus</strong> na pasta atual.</li>
</ul>
<p>Pode aceder à interface Web do Milvus em <code translate="no">http://127.0.0.1:9091/webui/</code> para saber mais sobre a sua instância do Milvus. Para mais detalhes, consulte a <a href="/docs/pt/v2.6.x/milvus-webui.md">interface Web do Milvus</a>.</p>
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
    </button></h2><p>Pode modificar as configurações do Milvus no ficheiro <strong>user.yaml</strong> na pasta atual. Por exemplo, para alterar o endereço <code translate="no">proxy.healthCheckTimeout</code> para <code translate="no">1000</code> ms, pode modificar o ficheiro da seguinte forma:</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, reinicie o serviço da seguinte forma:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para os itens de configuração aplicáveis, consulte <a href="/docs/pt/v2.6.x/system_configuration.md">«Configuração do sistema</a>».</p>
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
    </button></h2><p>Pode atualizar para a versão mais recente do Milvus utilizando o comando de atualização integrado. Isto descarrega automaticamente a configuração mais recente e a imagem do Milvus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Upgrade Milvus to the latest version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>O comando de atualização, automaticamente:</p>
<ul>
<li>Descarrega o script de instalação mais recente com as configurações atualizadas</li>
<li>Recupera a imagem Docker mais recente do Milvus</li>
<li>Reinicia o contentor com a nova versão</li>
<li>Preserva os seus dados e configurações existentes</li>
</ul>
<p>Esta é a forma recomendada de atualizar a sua implementação autónoma do Milvus.</p>
</div>
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
<li><p>Consultar <a href="/docs/pt/v2.6.x/quickstart.md">o Guia de Início Rápido</a> para ver o que o Milvus pode fazer.</p></li>
<li><p>Aprender as operações básicas do Milvus:</p>
<ul>
<li><a href="/docs/pt/v2.6.x/manage_databases.md">Gerir bases de dados</a></li>
<li><a href="/docs/pt/v2.6.x/manage-collections.md">Gerir coleções</a></li>
<li><a href="/docs/pt/v2.6.x/manage-partitions.md">Gerir partições</a></li>
<li><a href="/docs/pt/v2.6.x/insert-update-delete.md">Inserir, atualizar e eliminar</a></li>
<li><a href="/docs/pt/v2.6.x/single-vector-search.md">Pesquisa de vetor único</a></li>
<li><a href="/docs/pt/v2.6.x/multi-vector-search.md">Pesquisa híbrida</a></li>
</ul></li>
<li><p><a href="/docs/pt/v2.6.x/upgrade_milvus_cluster-helm.md">Atualizar o Milvus utilizando o Helm Chart</a>.</p></li>
<li><p><a href="/docs/pt/v2.6.x/scaleout.md">Dimensionar o seu cluster Milvus</a>.</p></li>
<li><p>Implemente o seu cluster Milvus nas nuvens:</p>
<ul>
<li><a href="/docs/pt/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/pt/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/pt/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/pt/v2.6.x/milvus-webui.md">o Milvus WebUI</a>, uma interface web intuitiva para a monitorização e gestão do Milvus.</p></li>
<li><p>Explore <a href="/docs/pt/v2.6.x/milvus_backup_overview.md">o Milvus Backup</a>, uma ferramenta de código aberto para cópias de segurança dos dados do Milvus.</p></li>
<li><p>Explore <a href="/docs/pt/v2.6.x/birdwatcher_overview.md">o Birdwatcher</a>, uma ferramenta de código aberto para depuração do Milvus e atualizações dinâmicas de configuração.</p></li>
<li><p>Explore <a href="https://github.com/zilliztech/attu">o Attu</a>, uma ferramenta GUI de código aberto para a gestão intuitiva do Milvus.</p></li>
<li><p><a href="/docs/pt/v2.6.x/monitor.md">Monitorize o Milvus com o Prometheus</a>.</p></li>
</ul>
