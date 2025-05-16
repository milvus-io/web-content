---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Saiba como instalar o Milvus de forma autónoma com o Docker.
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
    </button></h1><p>Esta página ilustra como iniciar uma instância do Milvus no Docker.</p>
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
<li><a href="https://docs.docker.com/get-docker/">Instalar o Docker</a>.</li>
<li><a href="/docs/pt/v2.4.x/prerequisite-docker.md">Verifique os requisitos de hardware e software</a> antes da instalação.</li>
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
    </button></h2><p>O Milvus fornece um script de instalação para o instalar como um contentor Docker. O script está disponível no <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">repositório do Milvus</a>. Para instalar o Milvus no Docker, basta executar</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download the installation script</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

<span class="hljs-comment"># Start the Docker container</span>
$ bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se tiver algum problema ao puxar a imagem, contacte-nos em <a href="mailto:community@zilliz.com">community@zilliz.com</a> com detalhes sobre o problema, e iremos fornecer-lhe o apoio necessário.</p>
</div>
<p>Depois de executar o script de instalação:</p>
<ul>
<li>Um contentor docker chamado milvus foi iniciado na porta <strong>19530</strong>.</li>
<li>Um etcd incorporado é instalado juntamente com o Milvus no mesmo contentor e funciona no porto <strong>2379</strong>. Seu arquivo de configuração é mapeado para <strong>embedEtcd.yaml</strong> na pasta atual.</li>
<li>Para alterar a configuração predefinida do Milvus, adicione as suas definições ao ficheiro <strong>user.yaml</strong> na pasta atual e, em seguida, reinicie o serviço.</li>
<li>O volume de dados do Milvus é mapeado para <strong>volumes/milvus</strong> na pasta atual.</li>
</ul>
<p>É possível parar e eliminar este contentor da seguinte forma</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ bash standalone_embed.sh stop

<span class="hljs-comment"># Delete Milvus data</span>
$ bash standalone_embed.sh delete
<button class="copy-code-btn"></button></code></pre>
<p>Pode atualizar a versão mais recente do Milvus da seguinte forma</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># upgrade Milvus</span>
$ bash standalone_embed.sh upgrade
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">O que se segue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de instalar o Milvus no Docker, você pode:</p>
<ul>
<li><p>Verificar <a href="/docs/pt/v2.4.x/quickstart.md">o Quickstart</a> para ver o que o Milvus pode fazer.</p></li>
<li><p>Aprender as operações básicas do Milvus:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/manage_databases.md">Gerenciar bancos de dados</a></li>
<li><a href="/docs/pt/v2.4.x/manage-collections.md">Gerenciar coleções</a></li>
<li><a href="/docs/pt/v2.4.x/manage-partitions.md">Gerir partições</a></li>
<li><a href="/docs/pt/v2.4.x/insert-update-delete.md">Inserir, Upsert e Apagar</a></li>
<li><a href="/docs/pt/v2.4.x/single-vector-search.md">Pesquisa de vetor único</a></li>
<li><a href="/docs/pt/v2.4.x/multi-vector-search.md">Pesquisa híbrida</a></li>
</ul></li>
<li><p><a href="/docs/pt/v2.4.x/upgrade_milvus_cluster-helm.md">Atualizar o Milvus usando o Helm Chart</a>.</p></li>
<li><p><a href="/docs/pt/v2.4.x/scaleout.md">Escalar seu cluster Milvus</a>.</p></li>
<li><p>Implantar seu cluster Milvu em nuvens:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/pt/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/pt/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/pt/v2.4.x/milvus_backup_overview.md">o Milvus Backup</a>, uma ferramenta de código aberto para backups de dados do Milvus.</p></li>
<li><p>Explore o <a href="/docs/pt/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, uma ferramenta de código aberto para depuração do Milvus e actualizações dinâmicas de configuração.</p></li>
<li><p>Explore <a href="https://milvus.io/docs/attu.md">o Attu</a>, uma ferramenta GUI de código aberto para gerenciamento intuitivo do Milvus.</p></li>
<li><p><a href="/docs/pt/v2.4.x/monitor.md">Monitore o Milvus com o Prometheus</a>.</p></li>
</ul>
