---
id: monitor_overview.md
title: Visão geral do monitor
related_key: 'monitor, alert'
summary: >-
  Saiba como o Prometheus e o Grafana são utilizados no Milvus para serviços de
  monitorização e alertas.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Visão geral da estrutura de monitorização do Milvus<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico explica como o Milvus utiliza o Prometheus para monitorizar métricas e o Grafana para visualizar métricas e criar alertas.</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">O Prometheus no Milvus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">O Prometheus</a> é um conjunto de ferramentas de código aberto para monitorização e alertas em implementações do Kubernetes. Recolhe e armazena métricas como dados de séries temporais. Isto significa que as métricas são armazenadas com carimbos de data e hora no momento do registo, juntamente com pares chave-valor opcionais denominados «labels».</p>
<p>Atualmente, o Milvus utiliza os seguintes componentes do Prometheus:</p>
<ul>
<li>O endpoint do Prometheus para extrair dados dos endpoints definidos pelos exportadores.</li>
<li>Operador do Prometheus para gerir eficazmente as instâncias de monitorização do Prometheus.</li>
<li>O Kube-prometheus para proporcionar um monitorização de ponta a ponta do cluster do Kubernetes de fácil utilização.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Nomes das métricas<button data-href="#Metric-names" class="anchor-icon" translate="no">
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
    </button></h3><p>Um nome de métrica válido no Prometheus contém três elementos: namespace, subsistema e nome. Estes três elementos são separados por «_».</p>
<p>O namespace das métricas do Milvus monitorizadas pelo Prometheus é «milvus». O subsistema de uma métrica é um dos seguintes: «cdc», «cgo», «datacoord», «datanode», «indexnode», «logging», «meta», «msg_queue», «msgstream», «proxy», «querycoord», «querynode», «rootcoord», «storage», «streaming», «streamingcoord», «streamingnode» e «wal». Algumas métricas, como <code translate="no">milvus_build_info</code> e <code translate="no">milvus_num_node</code>, não têm subsistema.</p>
<p>Por exemplo, a métrica do Milvus que calcula o número total de vetores consultados denomina-se « <code translate="no">milvus_proxy_search_vectors_count</code> ».</p>
<h3 id="Metric-types" class="common-anchor-header">Tipos de métricas<button data-href="#Metric-types" class="anchor-icon" translate="no">
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
    </button></h3><p>O Prometheus suporta quatro tipos de métricas:</p>
<ul>
<li>Contador: um tipo de métrica cumulativa cujo valor só pode aumentar ou ser reposto a zero após o reinício.</li>
<li>Gauge: um tipo de métrica cujo valor pode tanto subir como descer.</li>
<li>Histograma: um tipo de métrica que é contabilizada com base em intervalos configuráveis. Um exemplo comum é a duração de uma solicitação.</li>
<li>Resumo: um tipo de métrica semelhante ao histograma que calcula quantis configuráveis ao longo de uma janela de tempo deslizante.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Etiquetas de métricas<button data-href="#Metric-labels" class="anchor-icon" translate="no">
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
    </button></h3><p>O Prometheus distingue amostras com o mesmo nome de métrica através da atribuição de rótulos. Um rótulo é um determinado atributo de uma métrica. As métricas com o mesmo nome devem ter o mesmo valor para o campo « <code translate="no">variable_labels</code> ». A tabela seguinte apresenta os nomes e significados dos rótulos comuns das métricas do Milvus.</p>
<table>
<thead>
<tr><th>Nome do rótulo</th><th>Definição</th><th>Valores</th></tr>
</thead>
<tbody>
<tr><td>«node_id»</td><td>A identidade única de uma função.</td><td>Um ID globalmente único gerado pelo Milvus.</td></tr>
<tr><td>«status»</td><td>O estado de uma operação ou pedido processado.</td><td>«abandon», «success» ou «fail».</td></tr>
<tr><td>«query_type»</td><td>O tipo de um pedido de leitura.</td><td>«search» ou «query».</td></tr>
<tr><td>«msg_type»</td><td>O tipo de mensagens.</td><td>«insert», «delete», «search» ou «query».</td></tr>
<tr><td>«segment_state»</td><td>O estado de um segmento.</td><td>«Sealed», «Growing», «Flushed», «Flushing», «Dropped» ou «Importing».</td></tr>
<tr><td>“cache_state”</td><td>O estado de um objeto em cache.</td><td>«hit» ou «miss».</td></tr>
<tr><td>«cache_name»</td><td>O nome de um objeto armazenado em cache. Este rótulo é utilizado em conjunto com o rótulo «cache_state».</td><td>Por exemplo: «CollectionID», «Schema», etc.</td></tr>
<tr><td>«channel_name»</td><td>Tópicos físicos no armazenamento de mensagens (Pulsar ou Kafka).</td><td>Por exemplo: «by-dev-rootcoord-dml_0», «by-dev-rootcoord-dml_255», etc.</td></tr>
<tr><td>“function_name”</td><td>O nome de uma função que processa determinadas solicitações.</td><td>Por exemplo: «CreateCollection», «CreatePartition», «CreateIndex», etc.</td></tr>
<tr><td>«user_name»</td><td>O nome de utilizador utilizado para autenticação.</td><td>Um nome de utilizador à sua escolha.</td></tr>
<tr><td>«index_task_status»</td><td>O estado de uma tarefa de indexação no meta-armazenamento.</td><td>«unissued», «in-progress», «failed», «finished» ou «recycled».</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">Grafana no Milvus<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">O Grafana</a> é uma plataforma de visualização de código aberto que se pode ligar a todas as fontes de dados. Ao apresentar métricas, ajuda os utilizadores a compreender, analisar e monitorizar grandes volumes de dados.</p>
<p>O Milvus utiliza os painéis personalizáveis do Grafana para a visualização de métricas.</p>
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
    </button></h2><p>Depois de conhecer o fluxo de trabalho básico de monitorização e alertas, aprenda:</p>
<ul>
<li><a href="/docs/pt/monitor.md">Implementar serviços de monitorização</a></li>
<li><a href="/docs/pt/visualize.md">Visualizar métricas do Milvus</a></li>
<li><a href="/docs/pt/alert.md">Criar um alerta</a></li>
</ul>
