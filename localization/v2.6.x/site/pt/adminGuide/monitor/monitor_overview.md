---
id: monitor_overview.md
title: Visão geral do monitor
related_key: 'monitor, alert'
summary: >-
  Saiba como o Prometheus e o Grafana são utilizados no Milvus para serviços de
  monitorização e alerta.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Visão geral da estrutura de monitoramento do Milvus<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico explica como o Milvus usa o Prometheus para monitorar métricas e o Grafana para visualizar métricas e criar alertas.</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">Prometheus no Milvus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">O Prometheus</a> é um kit de ferramentas de monitoramento e alerta de código aberto para implementações do Kubernetes. Ele coleta e armazena métricas como dados de série temporal. Isso significa que as métricas são armazenadas com carimbos de data e hora quando registradas, juntamente com pares de valores-chave opcionais chamados rótulos.</p>
<p>Atualmente, o Milvus usa os seguintes componentes do Prometheus:</p>
<ul>
<li>Endpoint do Prometheus para extrair dados de endpoints definidos por exportadores.</li>
<li>Operador do Prometheus para gerenciar efetivamente as instâncias de monitoramento do Prometheus.</li>
<li>Kube-prometheus para fornecer monitoramento de cluster Kubernetes de ponta a ponta fácil de operar.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Nomes de métricas</h3><p>Um nome de métrica válido no Prometheus contém três elementos: namespace, subsistema e nome. Esses três elementos são conectados com "_".</p>
<p>O namespace das métricas do Milvus monitoradas pelo Prometheus é "milvus". Dependendo da função a que uma métrica pertence, o seu subsistema deve ser uma das oito funções seguintes: "rootcoord", "proxy", "querycoord", "querynode", "indexcoord", "indexnode", "datacoord", "datanode".</p>
<p>Por exemplo, a métrica Milvus que calcula o número total de vectores consultados tem o nome de <code translate="no">milvus_proxy_search_vectors_count</code>.</p>
<h3 id="Metric-types" class="common-anchor-header">Tipos de métricas</h3><p>O Prometheus suporta quatro tipos de métricas:</p>
<ul>
<li>Contador: um tipo de métrica cumulativa cujo valor só pode aumentar ou ser redefinido para zero após a reinicialização.</li>
<li>Gauge: um tipo de métrica cujo valor pode subir ou descer.</li>
<li>Histograma: um tipo de métrica que é contada com base em intervalos configuráveis. Um exemplo comum é a duração do pedido.</li>
<li>Resumo: um tipo de métrica semelhante ao histograma que calcula os quantis configuráveis numa janela de tempo deslizante.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Rótulos de métricas</h3><p>O Prometheus diferencia amostras com o mesmo nome de métrica rotulando-as. Um rótulo é um determinado atributo de uma métrica. As métricas com o mesmo nome devem ter o mesmo valor para o campo <code translate="no">variable_labels</code>. A tabela a seguir lista os nomes e os significados dos rótulos comuns das métricas do Milvus.</p>
<table>
<thead>
<tr><th>Nome da etiqueta</th><th>Definição</th><th>Valores</th></tr>
</thead>
<tbody>
<tr><td>"node_id"</td><td>A identidade única de uma função.</td><td>Um ID globalmente único gerado por milvus.</td></tr>
<tr><td>"status" (estado)</td><td>O estado de uma operação ou pedido processado.</td><td>"abandono", "sucesso" ou "falha".</td></tr>
<tr><td>"query_type" (tipo de consulta)</td><td>O tipo de um pedido de leitura.</td><td>"search" (pesquisa) ou "query" (consulta).</td></tr>
<tr><td>"msg_type" (tipo de mensagem)</td><td>O tipo de mensagens.</td><td>"insert", "delete", "search" ou "query".</td></tr>
<tr><td>"segment_state" (estado do segmento)</td><td>O estado de um segmento.</td><td>"Sealed", "Growing", "Flushed", "Flushing", "Dropped" ou "Importing".</td></tr>
<tr><td>"cache_state"</td><td>O estado de um objeto em cache.</td><td>"hit" ou "miss".</td></tr>
<tr><td>"cache_name"</td><td>O nome de um objeto em cache. Esta etiqueta é utilizada em conjunto com a etiqueta "cache_state".</td><td>Por exemplo, "CollectionID", "Schema", etc.</td></tr>
<tr><td>"channel_name" (nome do canal)</td><td>Tópicos físicos no armazenamento de mensagens (Pulsar ou Kafka).</td><td>Por exemplo, "by-dev-rootcoord-dml_0", "by-dev-rootcoord-dml_255", etc.</td></tr>
<tr><td>"function_name" (nome da função)</td><td>O nome de uma função que trata de determinados pedidos.</td><td>Por exemplo, "CreateCollection", "CreatePartition", "CreateIndex", etc.</td></tr>
<tr><td>"user_name"</td><td>O nome de utilizador utilizado para a autenticação.</td><td>Um nome de utilizador da sua preferência.</td></tr>
<tr><td>"index_task_status"</td><td>O estado de uma tarefa de índice no meta-armazenamento.</td><td>"unissued" (não emitido), "in-progress" (em andamento), "failed" (falhou), "finished" (concluído) ou "recycled" (reciclado).</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">Grafana em Milvus<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> é uma pilha de visualização de código aberto que pode se conectar a todas as fontes de dados. Ao obter métricas, ajuda os utilizadores a compreender, analisar e monitorizar dados massivos.</p>
<p>Milvus usa os painéis personalizáveis do Grafana para visualização de métricas.</p>
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
    </button></h2><p>Depois de aprender sobre o fluxo de trabalho básico de monitoramento e alerta, aprenda:</p>
<ul>
<li><a href="/docs/pt/monitor.md">Implantar serviços de monitoramento</a></li>
<li><a href="/docs/pt/visualize.md">Visualizar as métricas do Milvus</a></li>
<li><a href="/docs/pt/alert.md">Criar um alerta</a></li>
</ul>
