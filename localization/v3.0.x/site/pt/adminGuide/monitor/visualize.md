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
    </button></h1><p>Este tópico descreve como visualizar as métricas do Milvus utilizando o Grafana.</p>
<p>Conforme descrito no <a href="/docs/pt/monitor.md">guia de monitorização</a>, as métricas contêm informações úteis, tais como a quantidade de memória utilizada por um componente específico do Milvus. A monitorização das métricas ajuda-o a compreender melhor o desempenho do Milvus e o seu estado de funcionamento, para que possa ajustar a alocação de recursos atempadamente.</p>
<p>A visualização consiste num gráfico que mostra a evolução da utilização de recursos ao longo do tempo, o que facilita a identificação rápida de alterações na utilização de recursos, especialmente quando ocorre um evento.</p>
<p>Este tutorial utiliza o Grafana, uma plataforma de código aberto para análise de séries temporais, para visualizar várias métricas de desempenho de um cluster do Milvus implementado no Kubernetes (K8s).</p>
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
<li>Tem de ter <a href="/docs/pt/install_cluster-helm.md">instalado um cluster do Milvus no K8s.</a></li>
<li><code translate="no">user:password</code> É necessário <a href="/docs/pt/monitor.md">configurar o Prometheus</a> para monitorizar e recolher métricas antes de utilizar o Grafana para visualizar as métricas. Se a configuração for bem-sucedida, pode aceder ao Grafana em <code translate="no">http://localhost:3000</code>. Ou também pode aceder ao Grafana utilizando o URL padrão do Grafana: <code translate="no">admin:admin</code>.</li>
</ul>
<h2 id="Visualize-metrics-using-Grafana" class="common-anchor-header">Visualizar métricas utilizando o Grafana<button data-href="#Visualize-metrics-using-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Download-and-import-dashboard" class="common-anchor-header">1. Descarregar e importar o painel<button data-href="#1-Download-and-import-dashboard" class="anchor-icon" translate="no">
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
    </button></h3><p>Descarregue e importe o painel do Milvus a partir do ficheiro JSON.</p>
<pre><code translate="no" class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/deployments/monitor/grafana/milvus-dashboard.json
<button class="copy-code-btn"></button></code></pre>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/import_dashboard.png" alt="Download_and_import" class="doc-image" id="download_and_import" /> 
   <span>Descarregar_e_importar</span>
  
 </span></p>
<h3 id="2-View-metrics" class="common-anchor-header">2. Visualizar métricas<button data-href="#2-View-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>Selecione a instância do Milvus que pretende monitorizar. Em seguida, poderá ver o painel de componentes do Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/grafana_select.png" alt="Select_instance" class="doc-image" id="select_instance" /> 
   <span>Selecionar_instância</span>
  
 </span></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/grafana_panel.png" alt="Grafana_panel" class="doc-image" id="grafana_panel" /> 
   <span>Painel_do_Grafana</span>
  
 </span></p>
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
    </button></h2><ul>
<li>Se tiver configurado o Grafana para visualizar as métricas do Milvus, talvez também queira:
<ul>
<li>Aprender a <a href="/docs/pt/alert.md">criar um alerta para os serviços do Milvus</a></li>
<li>Ajustar a <a href="/docs/pt/allocate.md">alocação de recursos</a></li>
<li><a href="/docs/pt/scaleout.md">Expandir ou reduzir um cluster do Milvus</a></li>
</ul></li>
<li>Se estiver interessado em atualizar a versão do Milvus,
<ul>
<li>Leia o <a href="/docs/pt/upgrade_milvus_cluster-operator.md">guia para atualizar um cluster do Milvus</a> e <a href="/docs/pt/upgrade_milvus_standalone-operator.md">o guia para atualizar o Milvus autónomo</a>.</li>
</ul></li>
</ul>
