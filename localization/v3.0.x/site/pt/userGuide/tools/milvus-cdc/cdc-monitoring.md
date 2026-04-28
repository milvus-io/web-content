---
id: cdc-monitoring.md
order: 4
summary: >-
  O Milvus-CDC fornece capacidades de monitorização abrangentes através de
  painéis de controlo Grafana.
title: Monitorização
---
<h1 id="Monitoring" class="common-anchor-header">Monitorização<button data-href="#Monitoring" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus-CDC fornece capacidades de monitorização abrangentes através de dashboards Grafana, permitindo-lhe visualizar as principais métricas e garantir o bom funcionamento das suas tarefas de Captura de Dados de Alterações (CDC) e a integridade do servidor.</p>
<h3 id="Metrics-for-CDC-tasks" class="common-anchor-header">Métricas para tarefas CDC</h3><p>Para começar, importe o arquivo <a href="https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json">cdc-grafana.json</a> para o Grafana. Isso adicionará um painel projetado especificamente para monitorar o status das tarefas do CDC.</p>
<p><strong>Visão geral do painel do CDC Grafana</strong>:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-cdc-dashboard.png" alt="milvus-cdc-dashboard" class="doc-image" id="milvus-cdc-dashboard" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-dashboard</span> </span></p>
<p><strong>Principais métricas explicadas:</strong></p>
<ul>
<li><p><strong>Tarefa</strong>: Número de tarefas do CDC em diferentes estados, incluindo <strong>Inicial</strong>, <strong>Em execução</strong> e <strong>Pausado</strong>.</p></li>
<li><p><strong>Total</strong> de solicitações: número total de solicitações recebidas pelo Milvus-CDC.</p></li>
<li><p><strong>Sucesso do pedido</strong>: Número de pedidos bem-sucedidos recebidos pelo Milvus-CDC.</p></li>
<li><p><strong>Número da tarefa</strong>: Número de tarefas nos estados <strong>Inicial</strong>, <strong>Em pausa</strong> e <strong>Em execução</strong> ao longo do tempo.</p></li>
<li><p><strong>estado da tarefa</strong>: Estado das tarefas individuais.</p></li>
<li><p><strong>contagem de pedidos</strong>: Número de solicitações bem-sucedidas e totais</p></li>
<li><p><strong>latência do pedido</strong>: Latência dos pedidos através de p99, média e outras estatísticas.</p></li>
<li><p><strong>taxa de dados de replicação</strong>: Taxa de dados de replicação para operações de leitura/escrita</p></li>
<li><p><strong>atraso tt da réplica</strong>: Tempo de atraso da replicação para operações de leitura/escrita.</p></li>
<li><p><strong>contagem de execuções da API</strong>: Número de vezes que diferentes APIs Milvus-CDC foram executadas.</p></li>
<li><p><strong>center ts</strong>: Registo de tempo para tarefas de leitura/escrita.</p></li>
</ul>
