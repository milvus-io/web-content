---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: >-
  Saiba como instalar o Milvus em modo autónomo com suporte para GPU utilizando
  o Docker Compose.
title: Executar o Milvus com suporte para GPU utilizando o Docker Compose
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">Executar o Milvus com suporte para GPU utilizando o Docker Compose<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página explica como iniciar uma instância do Milvus com suporte para GPU utilizando o Docker Compose.</p>
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
<li><a href="/docs/pt/prerequisite-gpu.md">Verifique os requisitos de hardware e software</a> antes da instalação.</li>
</ul>
<div class="alert note">
<p>Se tiver alguma dificuldade ao descarregar a imagem, contacte-nos através do endereço <a href="mailto:community@zilliz.com">community@zilliz.com</a> com detalhes sobre o problema e iremos prestar-lhe o apoio necessário.</p>
</div>
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
    </button></h2><p>Para instalar o Milvus com suporte para GPU utilizando o Docker Compose, siga estes passos.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. Descarregue e configure o ficheiro YAML<button data-href="#1-Download-and-configure-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Descarregue <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml"><code translate="no">milvus-standalone-docker-compose-gpu.yaml</code></a> e guarde-o como docker-compose.yml manualmente ou com o comando seguinte.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para verificar o download, compare a saída do comando seguinte com o resumo « <code translate="no">sha256</code> » indicado para « <code translate="no">milvus-standalone-docker-compose-gpu.yaml</code> » na <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">página de lançamento</a>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sha256sum</span> docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pode alterar os dispositivos GPU atribuídos ao Milvus na secção « <code translate="no">deploy</code> » do serviço « <code translate="no">standalone</code> » no ficheiro YAML da seguinte forma:</p>
<ul>
<li>Para atribuir um dispositivo GPU específico ao Milvus, localize o campo « <code translate="no">deploy.resources.reservations.devices[0].device_ids</code> » na definição do serviço « <code translate="no">standalone</code> » e substitua o seu valor pelo ID da GPU pretendida. Pode utilizar a ferramenta « <code translate="no">nvidia-smi</code> », incluída nos controladores de ecrã da GPU da NVIDIA, para determinar o ID de um dispositivo GPU. O Milvus suporta vários dispositivos GPU.</li>
</ul>
<p>Atribuir um único dispositivo de GPU ao Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&quot;0&quot;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Atribuir vários dispositivos de GPU ao Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Inicie o Milvus<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>No diretório que contém o ficheiro docker-compose.yml, inicie o Milvus executando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se não conseguir executar o comando acima, verifique se o seu sistema tem o Docker Compose V1 instalado. Se for esse o caso, recomenda-se que migre para o Docker Compose V2, devido às notas <a href="https://docs.docker.com/compose/">nesta página</a>.</p>
</div>
<p>Após iniciar o Milvus,</p>
<ul>
<li>os contentores denominados <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> e <strong>milvus-etcd</strong> estão em funcionamento.
<ul>
<li>O contentor <strong>milvus-etcd</strong> não expõe quaisquer portas ao anfitrião e mapeia os seus dados para <strong>volumes/etcd</strong> na pasta atual.</li>
<li>O contentor <strong>milvus-minio</strong> serve as portas <strong>9000</strong> e <strong>9001</strong> com as credenciais de autenticação predefinidas e mapeia os seus dados para <strong>volumes/minio</strong> na pasta atual.</li>
<li>O contentor <strong>milvus-standalone</strong> serve as portas <strong>19530</strong> e <strong>9091</strong> com as definições predefinidas e mapeia os seus dados para <strong>volumes/milvus</strong> na pasta atual.</li>
</ul></li>
</ul>
<p>O serviço « <code translate="no">standalone</code> » define « <code translate="no">security_opt: seccomp:unconfined</code> », para que o contentor Milvus seja executado sem o perfil seccomp predefinido do Docker.</p>
<div class="alert warning">
<blockquote>
<p>O ficheiro Compose publica estas portas sem um IP de anfitrião, pelo que o Docker as associa a todas as interfaces de rede do anfitrião, e outras máquinas que consigam aceder a este anfitrião podem ligar-se ao Milvus e ao MinIO. O MinIO utiliza a chave de acesso e a chave secreta <code translate="no">minioadmin</code>, que estão definidas no ficheiro Compose. Para publicar as portas apenas no endereço de loopback, adicione <code translate="no">127.0.0.1:</code> às entradas <code translate="no">ports</code> dos serviços <code translate="no">minio</code> e <code translate="no">standalone</code> em <code translate="no">docker-compose.yml</code>, por exemplo <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code>, e execute novamente <code translate="no">sudo docker compose up -d</code>. Para mais detalhes, consulte <a href="https://docs.docker.com/engine/network/port-publishing/">Publicação e mapeamento de portas</a>. Para utilizar outras credenciais do MinIO, altere <code translate="no">MINIO_ACCESS_KEY</code> e <code translate="no">MINIO_SECRET_KEY</code> do serviço <code translate="no">minio</code> e defina os mesmos valores em <code translate="no">minio.accessKeyID</code> e <code translate="no">minio.secretAccessKey</code> da configuração do Milvus. Para exigir um nome de utilizador e uma palavra-passe para as ligações dos clientes ao Milvus, consulte <a href="/docs/pt/authenticate.md">Autenticar o acesso do utilizador</a>.</p>
</blockquote>
</div>
<p>Pode verificar se os contentores estão ativos e a funcionar utilizando o seguinte comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>
<button class="copy-code-btn"></button></code></pre>
<p>Por predefinição, o comando lista apenas os contentores em execução. Verifique se a saída lista os contentores <strong>milvus-etcd</strong>, <strong>milvus-minio</strong> e <strong>milvus-standalone</strong> e se a coluna « <code translate="no">STATUS</code> » de cada um deles começa por « <code translate="no">Up</code> ».</p>
<p>Também pode aceder à interface web do Milvus em <code translate="no">http://127.0.0.1:9091/webui/</code> para saber mais sobre a sua instância do Milvus. Para mais detalhes, consulte a <a href="/docs/pt/milvus-webui.md">interface web do Milvus</a>.</p>
<p>Para alterar os dispositivos GPU que o Milvus utiliza após o seu arranque, edite o campo « <code translate="no">device_ids</code> » em « <code translate="no">deploy.resources.reservations.devices</code> » do serviço « <code translate="no">standalone</code> » no ficheiro «docker-compose.yml», conforme ilustrado no passo 1, e, em seguida, execute o comando seguinte. Como a configuração do serviço foi alterada, o comando « <code translate="no">docker compose up</code> » interrompe e recria o contentor <strong>«milvus-standalone</strong> ». Para mais detalhes, consulte <a href="https://docs.docker.com/compose/how-tos/gpu-support/">Executar serviços do Docker Compose com acesso à GPU</a>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pode parar e eliminar este contentor da seguinte forma.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">Configurar o pool de memória<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de o Milvus estar em funcionamento, pode personalizar o conjunto de memória alterando as definições de « <code translate="no">initMemSize</code> » e « <code translate="no">maxMemSize</code> » na secção « <code translate="no">gpu</code> » da configuração do Milvus.</p>
<div class="alert note">
<p>O ficheiro « <code translate="no">milvus.yaml</code> » encontra-se no diretório « <code translate="no">/milvus/configs/</code> » dentro do contentor do Milvus. As definições num ficheiro « <code translate="no">user.yaml</code> » no mesmo diretório substituem os valores em « <code translate="no">milvus.yaml</code> ».</p>
</div>
<p>Para manter as suas definições quando o contentor for recriado, guarde-as num ficheiro <code translate="no">user.yaml</code> no anfitrião e monte o ficheiro no contentor da seguinte forma.</p>
<ol>
<li><p>No diretório que contém o ficheiro `docker-compose.yml`, crie um ficheiro chamado ` <code translate="no">user.yaml</code> ` com as definições que pretende alterar. O exemplo seguinte mostra a secção ` <code translate="no">gpu</code> ` com os seus valores predefinidos. Substitua-os pelos tamanhos de que necessita:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Tamanho inicial do conjunto de memória, em MB. O valor predefinido é 2048.</li>
<li><code translate="no">maxMemSize</code>: Tamanho máximo do pool de memória, em MB. O valor predefinido é 4096.</li>
</ul></li>
<li><p>No ficheiro `docker-compose.yml`, adicione o ficheiro ` <code translate="no">user.yaml</code> ` à lista ` <code translate="no">volumes</code> ` do serviço ` <code translate="no">standalone</code> `:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Recrie o contentor Milvus para aplicar as alterações:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Depois de o ficheiro estar montado, reinicie o serviço « <code translate="no">standalone</code> » para aplicar as alterações posteriores a « <code translate="no">user.yaml</code> »:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose restart standalone</span>
<button class="copy-code-btn"></button></code></pre>
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
<li><p>Consulte <a href="/docs/pt/milvus-webui.md">a interface web do Milvus</a> para saber mais sobre a instância do Milvus.</p></li>
<li><p>Aprender as operações básicas do Milvus:</p>
<ul>
<li><a href="/docs/pt/manage_databases.md">Gerir bases de dados</a></li>
<li><a href="/docs/pt/manage-collections.md">Gerir coleções</a></li>
<li><a href="/docs/pt/manage-partitions.md">Gerir partições</a></li>
<li><a href="/docs/pt/insert-update-delete.md">Inserir, atualizar e eliminar</a></li>
<li><a href="/docs/pt/single-vector-search.md">Pesquisa de vetor único</a></li>
<li><a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida</a></li>
</ul></li>
<li><p><a href="/docs/pt/upgrade_milvus_standalone-docker.md">Atualize o Milvus Standalone com o Docker Compose</a>. Essa página apresenta a etiqueta da imagem da CPU. Para esta implementação com GPU, mantenha o sufixo « <code translate="no">-gpu</code> » (<code translate="no">milvusdb/milvus:v3.0.5-gpu</code>) e mantenha as suas definições « <code translate="no">deploy</code> » e « <code translate="no">user.yaml</code> ».</p></li>
<li><p><a href="/docs/pt/scaleout.md">Dimensionar um cluster Milvus</a> no Kubernetes. Esse procedimento utiliza o Helm e não se aplica a esta implementação do Docker.</p></li>
<li><p>Implemente o seu cluster Milvus em nuvens:</p>
<ul>
<li><a href="/docs/pt/eks.md">Amazon EKS</a></li>
<li><a href="/docs/pt/gcp.md">Google Cloud</a></li>
<li><a href="/docs/pt/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/pt/milvus-webui.md">a Milvus WebUI</a>, uma interface web intuitiva para a monitorização e gestão do Milvus.</p></li>
<li><p>Explore <a href="/docs/pt/milvus_backup_overview.md">o Milvus Backup</a>, uma ferramenta de código aberto para cópias de segurança dos dados do Milvus.</p></li>
<li><p>Explore <a href="/docs/pt/birdwatcher_overview.md">o Birdwatcher</a>, uma ferramenta de código aberto para depuração do Milvus e atualizações dinâmicas de configuração.</p></li>
<li><p>Explore <a href="https://github.com/zilliztech/attu">o Attu</a>, uma ferramenta GUI de código aberto para a gestão intuitiva do Milvus.</p></li>
<li><p><a href="/docs/pt/monitor.md">Monitorize o Milvus com o Prometheus</a>.</p></li>
</ul>
