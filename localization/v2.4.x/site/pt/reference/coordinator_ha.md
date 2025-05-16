---
id: coordinator_ha.md
summary: >-
  Conheça a motivação e o procedimento para os coordenadores Milvus trabalharem
  em modo de espera ativa.
title: Coordenador HA
---
<h1 id="Coordinator-HA" class="common-anchor-header">Coordenador HA<button data-href="#Coordinator-HA" class="anchor-icon" translate="no">
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
    </button></h1><p>Como se pode ver na <a href="/docs/pt/v2.4.x/architecture_overview.md">arquitetura do Milvus</a>, este é constituído por muitos componentes que funcionam de forma distribuída. Entre todos os componentes, o Milvus assegura a elevada disponibilidade dos trabalhadores através do <a href="/docs/pt/v2.4.x/scaleout.md">aumento e da redução</a> dos nós, tornando os coordenadores o único elo fraco da cadeia.</p>
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
    </button></h2><p>Na versão 2.2.3, o Milvus implementa alta disponibilidade para os coordenadores, fazendo com que eles trabalhem no modo ativo-em espera, mitigando possíveis pontos únicos de falha (SPoFs) que podem resultar em indisponibilidade do serviço.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/coordinator_ha.png" alt="Coordinator HA" class="doc-image" id="coordinator-ha" />
   </span> <span class="img-wrapper"> <span>Coordenador HA</span> </span></p>
<p>A figura acima ilustra a forma como os coordenadores funcionam no modo de espera ativa. Quando um par de coordenadores é iniciado, eles se registram no etcd usando seu ID de servidor e competem pela função ativa. O coordenador que conseguir alugar a função ativa do etcd começará a servir, e o outro coordenador do par permanecerá em espera, observando a função ativa e pronto a servir se o coordenador ativo morrer.</p>
<h2 id="Enable-coordinator-HA" class="common-anchor-header">Habilitar o coordenador HA<button data-href="#Enable-coordinator-HA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="With-Helm" class="common-anchor-header">Com o Helm</h3><p>Para iniciar vários coordenadores e fazê-los trabalhar no modo ativo-em espera, você deve fazer as seguintes alterações no seu arquivo <code translate="no">values.yaml</code>.</p>
<ul>
<li>Defina <code translate="no">xxxCoordinator.replicas</code> como <code translate="no">2</code>.</li>
<li>Defina <code translate="no">xxxCoordinator.activeStandby.enabled</code> como <code translate="no">true</code>.</li>
</ul>
<p>O seguinte trecho de código utiliza o RootCoord como exemplo. Você pode fazer o mesmo com coordenadores de outros tipos.</p>
<pre><code translate="no" class="language-yaml">rootCoordinator:
  enabled: true
  <span class="hljs-comment"># You can set the number of replicas greater than 1 only if you also need to set activeStandby.enabled to true.</span>
  replicas: <span class="hljs-number">2</span>  <span class="hljs-comment"># Otherwise, remove this configuration item.</span>
  resources: {}
  nodeSelector: {}
  affinity: {}
  tolerations: []
  extraEnv: []
  heaptrack:
    enabled: false
  profiling:
    enabled: false  <span class="hljs-comment"># Enable live profiling</span>
  activeStandby:
    enabled: true  <span class="hljs-comment"># Set this to true to have RootCoordinators work in active-standby mode.</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="With-Docker" class="common-anchor-header">Com o Docker</h3><p>Para iniciar vários coordenadores e fazê-los trabalhar em modo de espera ativa, pode adicionar algumas definições ao ficheiro <code translate="no">docker-compose</code> que utiliza para iniciar o seu cluster Milvus.</p>
<p>O trecho de código a seguir usa o RootCoord como exemplo. Pode fazer o mesmo com coordenadores de outros tipos.</p>
<pre><code translate="no" class="language-yaml">  rootcoord:
    container_name: milvus-rootcoord
    image: milvusdb/milvus:v2<span class="hljs-number">.2</span><span class="hljs-number">.3</span>
    command: [<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;rootcoord&quot;</span>]
    environment:
      ETCD_ENDPOINTS: etcd:<span class="hljs-number">2379</span>
      MINIO_ADDRESS: minio:<span class="hljs-number">9000</span>
      PULSAR_ADDRESS: pulsar://pulsar:<span class="hljs-number">6650</span>
      ROOT_COORD_ADDRESS: rootcoord:<span class="hljs-number">53100</span>
      <span class="hljs-comment"># add ROOT_COORD_ENABLE_ACTIVE_STANDBY to enable active standby</span>
      ROOT_COORD_ENABLE_ACTIVE_STANDBY: true
    depends_on:
      - <span class="hljs-string">&quot;etcd&quot;</span>
      - <span class="hljs-string">&quot;pulsar&quot;</span>
      - <span class="hljs-string">&quot;minio&quot;</span>

<span class="hljs-comment">#   add the following to have RootCoords work in active-standby mode</span>
<span class="hljs-comment">#   rootcoord-1:</span>
<span class="hljs-comment">#    container_name: milvus-rootcoord-1</span>
<span class="hljs-comment">#    image: milvusdb/milvus:v2.2.3</span>
<span class="hljs-comment">#    command: [&quot;milvus&quot;, &quot;run&quot;, &quot;rootcoord&quot;]</span>
<span class="hljs-comment">#    environment:</span>
<span class="hljs-comment">#      ETCD_ENDPOINTS: etcd:2379</span>
<span class="hljs-comment">#      MINIO_ADDRESS: minio:9000</span>
<span class="hljs-comment">#      PULSAR_ADDRESS: pulsar://pulsar:6650</span>
<span class="hljs-comment">#      ROOT_COORD_ADDRESS: rootcoord-1:53100</span>
<span class="hljs-comment">#      # add ROOT_COORD_ENABLE_ACTIVE_STANDBY to enable active standby</span>
<span class="hljs-comment">#      ROOT_COORD_ENABLE_ACTIVE_STANDBY: true</span>
<span class="hljs-comment">#    depends_on:</span>
<span class="hljs-comment">#      - &quot;etcd&quot;</span>
<span class="hljs-comment">#      - &quot;pulsar&quot;</span>
<span class="hljs-comment">#      - &quot;minio&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="With-MacLinux-shell" class="common-anchor-header">Com a shell Mac/Linux</h3><p>Para iniciar vários coordenadores e fazê-los funcionar em modo de espera ativa, pode</p>
<ol>
<li><p>Descarregar o código fonte do Milvus para o seu disco local, e <a href="https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md">iniciar um cluster Milvus a partir do código fonte</a> como se segue:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">sudo</span> ./scripts/start_cluster.sh
<button class="copy-code-btn"></button></code></pre>
<p>O Milvus funciona com apenas um coordenador de cada tipo no final desta etapa.</p></li>
<li><p>Atualize <code translate="no">milvus.yaml</code> para alterar o número da porta do coordenador de cada tipo. A seguir, usamos <strong>o rootCoord</strong> como exemplo.</p>
<pre><code translate="no" class="language-yaml">rootCoord:
  address: localhost
  port: <span class="hljs-number">53100</span> <span class="hljs-comment"># change to 53001</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inicie o coordenador em espera.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">nohup</span> ./bin/milvus run rootcoord &gt; /tmp/rootcoord2.<span class="hljs-built_in">log</span> 2&gt;&amp;1 &amp;
<button class="copy-code-btn"></button></code></pre>
<p>No final desta etapa, execute o seguinte comando para verificar se existem dois processos de coordenador.</p>
<pre><code translate="no" class="language-shell">ps aux|grep milvus
<button class="copy-code-btn"></button></code></pre>
<p>A saída deve ser semelhante a</p>
<pre><code translate="no" class="language-shell">&gt; ps aux|grep milvus
root        12813   0.7 0.2 410709648   82432   ??  S   5:18PM  0:33.28 ./bin/milvus run rootcoord
root        12816   0.5 0.2 409487968   62352   ??  S   5:18PM  0:22.69 ./bin/milvus run proxy
root        17739   0.1 0.3 410289872   91792 s003  SN  6:01PM  0:00.30 ./bin/milvus run rootcoord
...
<button class="copy-code-btn"></button></code></pre>
<p>E o coordenador em espera gera uma entrada de log a cada dez segundos, como segue:</p>
<pre><code translate="no" class="language-shell">[INFO] [sessionutil/session_util.go:649] [<span class="hljs-string">&quot;serverName: rootcoord is in STANDBY ...&quot;</span>]
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Mate o coordenador ativo em um par e observe o comportamento do coordenador em espera.</p>
<p>É possível constatar que são necessários 60 segundos para que o coordenador em espera assuma a função ativa.</p>
<pre><code translate="no" class="language-shell">[2022/09/21 11:58:33.855 +08:00] [DEBUG] [sessionutil/session_util.go:677] [<span class="hljs-string">&quot;watch the ACTIVE key&quot;</span>] [DELETE=<span class="hljs-string">&quot;key:\&quot;by-dev/meta/session/rootcoord\&quot; mod_revision:167 &quot;</span>]
[2022/09/21 11:58:33.856 +08:00] [DEBUG] [sessionutil/session_util.go:677] [<span class="hljs-string">&quot;watch the ACTIVE key&quot;</span>] [DELETE=<span class="hljs-string">&quot;key:\&quot;by-dev/meta/session/rootcoord-15\&quot; mod_revision:167 &quot;</span>]
[2022/09/21 11:58:33.856 +08:00] [INFO] [sessionutil/session_util.go:683] [<span class="hljs-string">&quot;stop watching ACTIVE key&quot;</span>]
[2022/09/21 11:58:33.856 +08:00] [INFO] [sessionutil/session_util.go:655] [<span class="hljs-string">&quot;start retrying to register as ACTIVE service...&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [INFO] [sessionutil/session_util.go:641] [<span class="hljs-string">&quot;register ACTIVE service successfully&quot;</span>] [ServerID=19]
[2022/09/21 11:58:33.859 +08:00] [INFO] [sessionutil/session_util.go:690] [<span class="hljs-string">&quot;quit STANDBY mode, this node will become ACTIVE&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [INFO] [rootcoord/root_coord.go:638] [<span class="hljs-string">&quot;rootcoord switch from standby to active, activating&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [INFO] [rootcoord/root_coord.go:306] [<span class="hljs-string">&quot;RootCoord Register Finished&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [DEBUG] [rootcoord/service.go:148] [<span class="hljs-string">&quot;RootCoord start done ...&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [DEBUG] [components/root_coord.go:58] [<span class="hljs-string">&quot;RootCoord successfully started&quot;</span>]
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Related-configuration-items" class="common-anchor-header">Itens de configuração relacionados<button data-href="#Related-configuration-items" class="anchor-icon" translate="no">
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
    </button></h2><p>A HA do coordenador é desativada por padrão. É possível ativar esse recurso manualmente alterando os seguintes itens no arquivo de configuração do Milvus.</p>
<ul>
<li><a href="/docs/pt/v2.4.x/configure_rootcoord.md#rootCoordactiveStandbyenabled">rootCoord.activeStandby.enabled</a></li>
<li><a href="/docs/pt/v2.4.x/configure_querycoord.md#queryCoordactiveStandbyenabled">queryCoord.activeStandby.enabled</a></li>
<li><a href="/docs/pt/v2.4.x/configure_datacoord.md#dataCoordactiveStandbyenabled">dataCoord.activeStandby.enabled</a></li>
</ul>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Atualmente, não existe uma garantia de consistência forte entre o serviço ativo e o serviço em espera. Por conseguinte, o coordenador em espera necessita de recarregar os metadados ao assumir a função ativa.</p>
<p>O Etcd liberta uma concessão apenas depois de a sessão atual ter expirado. O tempo limite da sessão é predefinido para 60 segundos. Por conseguinte, existe um intervalo de 60 segundos entre o momento em que o coordenador ativo morre e o momento em que o coordenador em espera assume o papel ativo.</p>
