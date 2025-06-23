---
id: streaming_service.md
title: Serviço de Streaming
summary: >-
  O Streaming Service é um conceito para o módulo do sistema de streaming
  interno da Milvus, construído em torno do Write-Ahead Log (WAL) para suportar
  várias funções relacionadas com o streaming.
---
<h1 id="Streaming-Service" class="common-anchor-header">Serviço de Streaming<button data-href="#Streaming-Service" class="anchor-icon" translate="no">
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
    </button></h1><p>O <strong>Serviço de Fluxo</strong> é um conceito para o módulo interno do sistema de fluxo do Milvus, construído em torno do Registo de Escrita Antecipada (WAL) para suportar várias funções relacionadas com o fluxo. Estas incluem a ingestão/assinatura de dados de streaming, a recuperação de falhas do estado do cluster, a conversão de dados de streaming em dados históricos e consultas de dados crescentes. Em termos de arquitetura, o serviço de fluxo contínuo é composto por três componentes principais:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_distributed_arch.png" alt="Streaming Distributed Arc" class="doc-image" id="streaming-distributed-arc" />
   </span> <span class="img-wrapper"> <span>Arco distribuído de fluxo contínuo</span> </span></p>
<ul>
<li><p><strong>Coordenador de streaming</strong>: Um componente lógico no nó coordenador. Utiliza o Etcd para a descoberta de serviços para localizar os nós de fluxo disponíveis e é responsável pela ligação do WAL aos nós de fluxo correspondentes. Também regista o serviço para expor a topologia de distribuição do WAL, permitindo que os clientes de streaming conheçam o nó de streaming adequado para um determinado WAL.</p></li>
<li><p><strong>Cluster de nós de streaming</strong>: Um cluster de nós de trabalho de streaming responsável por todas as tarefas de processamento de streaming, como anexação de wal, recuperação de estado, consulta de dados crescentes.</p></li>
<li><p><strong>Cliente de Streaming</strong>: Um cliente Milvus desenvolvido internamente que encapsula funcionalidades básicas, como descoberta de serviços e verificações de prontidão. É utilizado para iniciar operações como a escrita de mensagens e a subscrição.</p></li>
</ul>
<h2 id="Message" class="common-anchor-header">Mensagem<button data-href="#Message" class="anchor-icon" translate="no">
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
    </button></h2><p>O serviço de fluxo contínuo é um sistema de fluxo contínuo orientado para o registo, pelo que todas as operações de escrita no Milvus (como DML e DDL) são abstraídas como <strong>mensagens</strong>.</p>
<ul>
<li><p>O Streaming Service atribui a cada mensagem um campo <strong>Timestamp Oracle (TSO)</strong>, que indica a ordem da mensagem no WAL. A ordenação das mensagens determina a ordem das operações de escrita no Milvus. Isto torna possível reconstruir o estado mais recente do cluster a partir dos registos.</p></li>
<li><p>Cada mensagem pertence a um <strong>VChannel</strong> (Virtual Channel) específico e mantém certas propriedades invariantes dentro desse canal para garantir a consistência da operação. Por exemplo, uma operação Insert deve sempre ocorrer antes de uma operação DropCollection no mesmo canal.</p></li>
</ul>
<p>A ordem das mensagens em Milvus pode assemelhar-se à seguinte:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/message_order.png" alt="Message Order" class="doc-image" id="message-order" />
   </span> <span class="img-wrapper"> <span>Ordem das mensagens</span> </span></p>
<h2 id="WAL-Component" class="common-anchor-header">Componente WAL<button data-href="#WAL-Component" class="anchor-icon" translate="no">
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
    </button></h2><p>Para suportar escalabilidade horizontal em larga escala, o WAL do Milvus não é um único arquivo de log, mas um composto de múltiplos logs. Cada registo pode suportar de forma independente a funcionalidade de fluxo contínuo para vários canais V. A qualquer momento, um componente WAL pode operar <strong>exatamente</strong> num <strong>nó de streaming</strong>, esta restrição é prometida por um mecanismo de vedação do armazenamento wal subjacente e pelo coordenador de streaming.</p>
<p>Outras caraterísticas do componente WAL incluem</p>
<ul>
<li><p><strong>Gestão do ciclo de vida do segmento</strong>: Com base na política, como condições de memória/tamanho do segmento/tempo ocioso do segmento, o WAL gerencia o ciclo de vida de cada segmento.</p></li>
<li><p><strong>Suporte básico a transacções</strong>: Uma vez que cada mensagem tem um limite de tamanho, o componente WAL suporta o nível de transação simples para prometer escritas atómicas ao nível do VChannel.</p></li>
<li><p><strong>Escrita de Log Remoto de Alta-Concorrência</strong>: Milvus suporta filas de mensagens remotas de terceiros como armazenamento WAL. Para atenuar a latência de ida e volta (RTT) entre o nó de streaming e o armazenamento WAL remoto para melhorar a taxa de transferência de escrita, o serviço de streaming suporta escritas de registo simultâneas. Mantém a ordem das mensagens por TSO e sincronização TSO, e as mensagens no WAL são lidas por ordem TSO.</p></li>
<li><p><strong>Buffer de escrita antecipada</strong>: Depois de as mensagens serem escritas no WAL, são temporariamente armazenadas num buffer de escrita antecipada. Isto permite leituras de cauda de registos sem ir buscar mensagens ao armazenamento WAL remoto.</p></li>
<li><p><strong>Suporte a vários armazenamentos WAL</strong>: Woodpecker, Pulsar, Kafka. Usando o Woodpecker com modo de disco zero, podemos remover a dependência do armazenamento WAL remoto.</p></li>
</ul>
<h2 id="Recovery-Storage" class="common-anchor-header">Armazenamento de recuperação<button data-href="#Recovery-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>O componente <strong>Recovery Storage</strong> é sempre executado no nó de streaming em que o componente WAL correspondente está localizado.</p>
<ul>
<li><p>É responsável por converter os dados de streaming em dados históricos persistentes e armazená-los no armazenamento de objectos.</p></li>
<li><p>Ele também lida com a recuperação de estado na memória para o componente WAL no nó de streaming.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recovery_storage.png" alt="Recovery Storage" class="doc-image" id="recovery-storage" />
   </span> <span class="img-wrapper"> <span>Armazenamento de recuperação</span> </span></p>
<h2 id="Query-Delegator" class="common-anchor-header">Delegador de consultas<button data-href="#Query-Delegator" class="anchor-icon" translate="no">
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
    </button></h2><p>O <strong>Query Delegator</strong> é executado em cada nó de streaming e é responsável pela execução de <strong>consultas incrementais</strong> num único fragmento. Ele gera planos de consulta, encaminha-os para os nós de consulta relevantes e agrega os resultados.</p>
<p>Além disso, o Query Delegator é responsável pela transmissão <strong>das operações Delete</strong> para outros Query Nodes.</p>
<p>O Query Delegator coexiste sempre com o componente WAL no mesmo nó de streaming. Mas se a coleção estiver configurada com multi-replicação, então <strong>N-1</strong> delegadores serão implementados nos outros nós de streaming.</p>
<h2 id="WAL-Lifetime-and-Wait-for-Ready" class="common-anchor-header">Tempo de vida do WAL e espera para ficar pronto<button data-href="#WAL-Lifetime-and-Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao separar os nós de computação do armazenamento, o Milvus pode facilmente transferir o WAL de um nó de streaming para outro, alcançando alta disponibilidade no serviço de streaming.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/wal_lifetime.png" alt="wal lifetime" class="doc-image" id="wal-lifetime" />
   </span> <span class="img-wrapper"> <span>Tempo de vida do WAL</span> </span></p>
<h2 id="Wait-for-Ready" class="common-anchor-header">Espera para estar pronto<button data-href="#Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando o WAL vai ser transferido para um novo nó de streaming, o cliente irá verificar que o antigo nó de streaming rejeita alguns pedidos. Entretanto, o WAL será recuperado no novo nó de streaming, o cliente aguardará que o wal no novo nó de streaming esteja pronto para servir.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_wait_for_ready.png" alt="wait for ready" class="doc-image" id="wait-for-ready" />
   </span> <span class="img-wrapper"> <span>esperar que esteja pronto</span> </span></p>
