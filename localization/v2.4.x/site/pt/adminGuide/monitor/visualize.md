---
id: visualize.md
title: Visualizar métricas
related_key: 'monitor, alert'
summary: Saiba como visualizar as métricas do Milvus no Grafana.
---
<h1 id="Visualize-Milvus-Metrics-in-Grafana" class="common-anchor-header">Visualizar métricas do Milvus no Grafana<button data-href="#Visualize-Milvus-Metrics-in-Grafana" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico descreve como visualizar as métricas do Milvus usando o Grafana.</p>
<p>Conforme descrito no <a href="/docs/pt/v2.4.x/monitor.md">guia de monitoramento</a>, as métricas contêm informações úteis, como a quantidade de memória usada por um componente específico do Milvus. O monitoramento de métricas ajuda a entender melhor o desempenho do Milvus e seu status de execução para que você possa ajustar a alocação de recursos em tempo hábil.</p>
<p>A visualização é um gráfico que mostra a alteração do uso de recursos ao longo do tempo, o que facilita a visualização e a observação rápida das alterações no uso de recursos, especialmente quando ocorre um evento.</p>
<p>Este tutorial usa o Grafana, uma plataforma de código aberto para análise de séries temporais, para visualizar várias métricas de desempenho de um cluster Milvus implantado no Kubernetes (K8s).</p>
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
<li>Você instalou <a href="/docs/pt/v2.4.x/install_cluster-helm.md">um cluster do Milvus no K8s)</a>.</li>
<li>É necessário <a href="/docs/pt/v2.4.x/monitor.md">configurar o Prometheus</a> para monitorar e coletar métricas antes de usar o Grafana para visualizar as métricas. Se a configuração for bem-sucedida, você poderá acessar o Grafana em <code translate="no">http://localhost:3000</code>. Ou também pode acessar o Grafana usando o Grafana padrão <code translate="no">user:password</code> de <code translate="no">admin:admin</code>.</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">Visualizar métricas usando o Grafana<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1. Descarregar e importar o painel de controlo</h3><p>Descarregue e importe o dashboard do Milvus a partir do ficheiro JSON.</p>
<pre><code translate="no">wget https://raw.githubusercontent.com/milvus-io/milvus/2.2.0/deployments/monitor/grafana/milvus-dashboard.json
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" />
   </span> <span class="img-wrapper"> <span>Descarregar_e_importar</span> </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2. Ver métricas</h3><p>Selecione a instância do Milvus que pretende monitorizar. Em seguida, pode ver o painel de componentes do Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" />
   </span> <span class="img-wrapper"> <span>Selecionar_instância</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" />
   </span> <span class="img-wrapper"> <span>Painel do Grafana</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">O que vem a seguir<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Se você configurou o Grafana para visualizar as métricas do Milvus, talvez também queira:<ul>
<li>Saiba como <a href="/docs/pt/v2.4.x/alert.md">criar um alerta para os serviços do Milvus</a></li>
<li>Ajustar sua <a href="/docs/pt/v2.4.x/allocate.md">alocação de recursos</a></li>
<li><a href="/docs/pt/v2.4.x/scaleout.md">Dimensionar ou escalar um cluster do Milvus</a></li>
</ul></li>
<li>Se estiver interessado em atualizar a versão do Milvus,<ul>
<li>Leia o <a href="/docs/pt/v2.4.x/upgrade_milvus_cluster-operator.md">guia de atualização do Milvus cluster</a> e <a href="/docs/pt/v2.4.x/upgrade_milvus_standalone-operator.md">o</a> <a href="/docs/pt/v2.4.x/upgrade_milvus_cluster-operator.md">guia</a> <a href="/docs/pt/v2.4.x/upgrade_milvus_standalone-operator.md">de atualização do Milvus standalone</a>.</li>
</ul></li>
</ul>
