---
id: four_layers.md
summary: Estrutura de desagregação armazenamento/computação em Milvus.
title: Desagregação Armazenamento/Computação
---
<h1 id="StorageComputing-Disaggregation" class="common-anchor-header">Desagregação Armazenamento/Computação<button data-href="#StorageComputing-Disaggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Seguindo o princípio da desagregação do plano de dados e do plano de controlo, o Milvus é composto por quatro camadas que são mutuamente independentes em termos de escalabilidade e de recuperação de desastres.</p>
<h2 id="Access-layer" class="common-anchor-header">Camada de acesso<button data-href="#Access-layer" class="anchor-icon" translate="no">
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
    </button></h2><p>Composta por um grupo de proxies sem estado, a camada de acesso é a camada frontal do sistema e o ponto final para os utilizadores. Valida os pedidos dos clientes e reduz os resultados devolvidos:</p>
<ul>
<li>O proxy é, por si só, apátrida. Fornece um endereço de serviço unificado utilizando componentes de balanceamento de carga como o Nginx, o Kubernetes Ingress, o NodePort e o LVS.</li>
<li>Como o Milvus utiliza uma arquitetura de processamento paralelo massivo (MPP), o proxy agrega e pós-processa os resultados intermédios antes de devolver os resultados finais ao cliente.</li>
</ul>
<h2 id="Coordinator" class="common-anchor-header">Coordenador<button data-href="#Coordinator" class="anchor-icon" translate="no">
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
    </button></h2><p>O <strong>Coordinator</strong> funciona como o cérebro do Milvus. Em qualquer momento, está ativo exatamente um Coordenador em todo o cluster, responsável pela manutenção da topologia do cluster, pelo agendamento de todos os tipos de tarefas e pela garantia de consistência ao nível do cluster.</p>
<p>A seguir estão algumas das tarefas tratadas pelo <strong>Coordenador</strong>:</p>
<ul>
<li><strong>Gerenciamento de DDL/DCL/TSO</strong>: Trata os pedidos de linguagem de definição de dados (DDL) e de linguagem de controlo de dados (DCL), tais como a criação ou eliminação de colecções, partições ou índices, bem como a gestão do timestamp Oracle (TSO) e a emissão de time ticker.</li>
<li><strong>Gestão do serviço de streaming</strong>: Vincula o Write-Ahead Log (WAL) aos nós de streaming e fornece descoberta de serviço para o serviço de streaming.</li>
<li><strong>Gestão de consultas</strong>: Gere a topologia e o equilíbrio de carga para os nós de consulta e fornece e gere as vistas de consulta de serviço para orientar o encaminhamento de consultas.</li>
<li><strong>Gestão de dados históricos</strong>: Distribui tarefas offline, como compactação e criação de índices para nós de dados, e gerencia a topologia de segmentos e visualizações de dados.</li>
</ul>
<h2 id="Worker-nodes" class="common-anchor-header">Nós de trabalho<button data-href="#Worker-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>Os braços e as pernas. Os nós de trabalho são executores burros que seguem as instruções do coordenador. Os nós de trabalho são stateless graças à separação entre armazenamento e computação, e podem facilitar o scale-out do sistema e a recuperação de desastres quando implantados no Kubernetes. Existem três tipos de nós de trabalho:</p>
<h3 id="Streaming-node" class="common-anchor-header">Nó de streaming</h3><p>O nó de streaming funciona como o "mini-cérebro" ao nível do shard, fornecendo garantias de consistência ao nível do shard e recuperação de falhas com base no armazenamento WAL subjacente. Entretanto, o nó de fluxo contínuo também é responsável pela consulta de dados crescentes e pela geração de planos de consulta. Além disso, também trata da conversão de dados crescentes em dados selados (históricos).</p>
<h3 id="Query-node" class="common-anchor-header">Nó de consulta</h3><p>O nó de consulta carrega os dados históricos do armazenamento de objectos e fornece a consulta de dados históricos.</p>
<h3 id="Data-node" class="common-anchor-header">Nó de dados</h3><p>O nó de dados é responsável pelo processamento offline dos dados históricos, como a compactação e a criação de índices.</p>
<h2 id="Storage" class="common-anchor-header">Armazenamento<button data-href="#Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>O armazenamento é o osso do sistema, responsável pela persistência dos dados. Inclui o meta-armazenamento, o corretor de registos e o armazenamento de objectos.</p>
<h3 id="Meta-storage" class="common-anchor-header">Meta-armazenamento</h3><p>O meta-armazenamento armazena instantâneos de metadados, como o esquema de coleção e os pontos de controlo do consumo de mensagens. O armazenamento de metadados exige uma disponibilidade extremamente elevada, uma forte consistência e suporte de transacções, pelo que a Milvus escolheu o etcd para o meta storage. A Milvus também utiliza o etcd para o registo de serviços e a verificação da sua integridade.</p>
<h3 id="Object-storage" class="common-anchor-header">Armazenamento de objectos</h3><p>O armazenamento de objectos armazena ficheiros de instantâneos de registos, ficheiros de índice para dados escalares e vectoriais e resultados de consultas intermédias. O Milvus utiliza o MinIO como armazenamento de objectos e pode ser facilmente implementado no AWS S3 e no Azure Blob, dois dos serviços de armazenamento mais populares e económicos do mundo. No entanto, o armazenamento de objectos tem uma latência de acesso elevada e cobra pelo número de consultas. Para melhorar o seu desempenho e reduzir os custos, a Milvus planeia implementar a separação de dados cold-hot num conjunto de cache baseado em memória ou SSD.</p>
<h3 id="WAL-storage" class="common-anchor-header">Armazenamento WAL</h3><p>O armazenamento WAL (Write-Ahead Log) é a base da durabilidade e consistência dos dados em sistemas distribuídos. Antes de qualquer alteração ser confirmada, é primeiro registada num registo - garantindo que, em caso de falha, pode recuperar exatamente onde parou.</p>
<p>As implementações comuns de WAL incluem Kafka, Pulsar e Woodpecker. Ao contrário das soluções tradicionais baseadas em disco, o Woodpecker adota um design nativo da nuvem, sem disco, que grava diretamente no armazenamento de objetos. Essa abordagem é dimensionada sem esforço de acordo com suas necessidades e simplifica as operações ao remover a sobrecarga de gerenciamento de discos locais.</p>
<p>Ao registar antecipadamente todas as operações de escrita, a camada WAL garante um mecanismo fiável de recuperação e consistência em todo o sistema, independentemente da complexidade do seu ambiente distribuído.</p>
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
<li>Leia <a href="/docs/pt/v2.6.x/main_components.md">Componentes principais</a> para obter mais detalhes sobre a arquitetura Milvus.</li>
</ul>
