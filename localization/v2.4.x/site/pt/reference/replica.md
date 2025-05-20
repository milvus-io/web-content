---
id: replica.md
summary: Saiba mais sobre a réplica na memória em Milvus.
title: Réplica na Memória
---
<h1 id="In-Memory-Replica" class="common-anchor-header">Réplica na Memória<button data-href="#In-Memory-Replica" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico apresenta o mecanismo de réplica em memória (replicação) no Milvus que permite múltiplas réplicas de segmentos na memória de trabalho para melhorar o desempenho e a disponibilidade.</p>
<p>Para obter informações sobre como configurar réplicas na memória, consulte <a href="/docs/pt/v2.4.x/configure_querynode.md#queryNodereplicas">Configurações relacionadas ao nó de consulta</a>.</p>
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_availability.jpg" alt="Replica_Availiability" class="doc-image" id="replica_availiability" />
   </span> <span class="img-wrapper"> <span>Replica_Availiability</span> </span></p>
<p>Com réplicas na memória, Milvus pode carregar o mesmo segmento em múltiplos nós de consulta. Se um nó de consulta falhar ou estiver ocupado com um pedido de pesquisa atual quando outro chegar, o sistema pode enviar novos pedidos para um nó de consulta inativo que tenha uma réplica do mesmo segmento.</p>
<h3 id="Performance" class="common-anchor-header">Desempenho</h3><p>As réplicas na memória permitem-lhe tirar partido de recursos extra de CPU e memória. É muito útil se você tiver um conjunto de dados relativamente pequeno, mas quiser aumentar a taxa de transferência de leitura com recursos extras de hardware. O QPS (consulta por segundo) e a taxa de transferência gerais podem ser significativamente melhorados.</p>
<h3 id="Availability" class="common-anchor-header">Disponibilidade</h3><p>As réplicas na memória ajudam o Milvus a recuperar mais rapidamente se um nó de consulta falhar. Quando um nó de consulta falha, o segmento não precisa ser recarregado em outro nó de consulta. Em vez disso, o pedido de pesquisa pode ser reenviado imediatamente para um novo nó de consulta sem ter de recarregar os dados novamente. Com várias réplicas de segmento mantidas simultaneamente, o sistema é mais resiliente em face de um failover.</p>
<h2 id="Key-Concepts" class="common-anchor-header">Conceitos-chave<button data-href="#Key-Concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>As réplicas na memória são organizadas como grupos de réplicas. Cada grupo de réplicas contém réplicas <a href="https://milvus.io/docs/v2.1.x/glossary.md#Sharding">de fragmento</a>. Cada réplica de fragmento tem uma réplica de fluxo contínuo e uma réplica histórica que correspondem aos <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">segmentos</a> crescentes e selados no fragmento (ou seja, canal DML).</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_group.png" alt="An illustration of how in-memory replica works" class="doc-image" id="an-illustration-of-how-in-memory-replica-works" />
   </span> <span class="img-wrapper"> <span>Uma ilustração de como funciona a réplica na memória</span> </span></p>
<h3 id="Replica-group" class="common-anchor-header">Grupo de réplicas</h3><p>Um grupo de réplicas consiste em vários <a href="https://milvus.io/docs/v2.1.x/four_layers.md#Query-node">nós de consulta</a> que são responsáveis pelo tratamento de dados históricos e réplicas.</p>
<h3 id="Shard-replica" class="common-anchor-header">Réplica de fragmento</h3><p>Uma réplica de fragmento é composta por uma réplica de fluxo contínuo e uma réplica histórica, ambas pertencentes ao mesmo <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Shard">fragmento</a>. O número de réplicas de fragmentos num grupo de réplicas é determinado pelo número de fragmentos numa coleção especificada.</p>
<h3 id="Streaming-replica" class="common-anchor-header">Réplica de fluxo contínuo</h3><p>Uma réplica de streaming contém todos os <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">segmentos crescentes</a> do mesmo canal DML. Tecnicamente falando, uma réplica de streaming deve ser servida por apenas um nó de consulta numa réplica.</p>
<h3 id="Historical-replica" class="common-anchor-header">Réplica histórica</h3><p>Uma réplica histórica contém todos os segmentos fechados do mesmo canal DML. Os segmentos fechados de uma réplica histórica podem ser distribuídos em vários nós de consulta dentro do mesmo grupo de réplicas.</p>
<h3 id="Shard-leader" class="common-anchor-header">Líder de fragmento</h3><p>Um líder de fragmento é o nó de consulta que serve a réplica de fluxo em uma réplica de fragmento.</p>
<h2 id="Design-Details" class="common-anchor-header">Detalhes do projeto<button data-href="#Design-Details" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Balance" class="common-anchor-header">Balanço</h3><p>Um novo segmento que precisa de ser carregado será atribuído a vários nós de consulta diferentes. Um pedido de pesquisa pode ser processado quando pelo menos uma réplica é carregada com sucesso.</p>
<h3 id="Search" class="common-anchor-header">Pesquisa</h3><h4 id="Cache" class="common-anchor-header">Cache</h4><p>O proxy mantém uma cache que mapeia os segmentos para os nós de pesquisa e actualiza-a periodicamente. Quando o proxy recebe um pedido, Milvus obtém todos os segmentos selados que precisam de ser pesquisados a partir da cache e tenta atribuí-los aos nós de pesquisa uniformemente.</p>
<p>Para segmentos em crescimento, o proxy também mantém um cache channel-to-query-node e envia pedidos para os nós de consulta correspondentes.</p>
<h4 id="Failover" class="common-anchor-header">Transferência em caso de falha</h4><p>As caches no proxy nem sempre estão actualizadas. Alguns segmentos ou canais podem ter sido movidos para outros nós de consulta quando um pedido é recebido. Neste caso, o proxy receberá uma resposta de erro, actualizará a cache e tentará atribuí-la a outro nó de consulta.</p>
<p>Um segmento será ignorado se o proxy ainda não o conseguir encontrar depois de atualizar a cache. Isto pode acontecer se o segmento tiver sido compactado.</p>
<p>Se a cache não for exacta, o proxy pode não encontrar alguns segmentos. Os nós de consulta com canais DML (segmentos crescentes) devolvem respostas de pesquisa juntamente com uma lista de segmentos fiáveis com os quais o proxy pode comparar e atualizar a cache.</p>
<h3 id="Enhancement" class="common-anchor-header">Melhoria</h3><p>O proxy não pode atribuir os pedidos de pesquisa aos nós de consulta de forma completamente igual e os nós de consulta podem ter recursos diferentes para servir os pedidos de pesquisa. Para evitar uma distribuição de recursos com cauda longa, o proxy atribuirá segmentos activos noutros nós de consulta a um nó de consulta inativo que também tenha esses segmentos.</p>
