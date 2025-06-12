---
id: four_layers.md
summary: Estrutura de desagregação de armazenamento/computação em Milvus.
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
<h2 id="Coordinator-service" class="common-anchor-header">Serviço de coordenação<button data-href="#Coordinator-service" class="anchor-icon" translate="no">
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
    </button></h2><p>O serviço de coordenação atribui tarefas aos nós de trabalho e funciona como o cérebro do sistema. As tarefas que assume incluem a gestão da topologia do cluster, o equilíbrio de carga, a geração de carimbos de data/hora, a declaração de dados e a gestão de dados.</p>
<p>Existem três tipos de coordenadores: coordenador de raiz (root coord), coordenador de dados (data coord) e coordenador de consulta (query coord).</p>
<h3 id="Root-coordinator-root-coord" class="common-anchor-header">Coordenador raiz (root coord)</h3><p>O coordenador raiz trata os pedidos de linguagem de definição de dados (DDL) e de linguagem de controlo de dados (DCL), tais como criar ou eliminar colecções, partições ou índices, bem como gerir a emissão de TSO (timestamp Oracle) e de time ticker.</p>
<h3 id="Query-coordinator-query-coord" class="common-anchor-header">Coordenador de consultas (query coord)</h3><p>O coordenador de consultas gere a topologia e o equilíbrio de carga para os nós de consulta, e a transferência de segmentos em crescimento para segmentos selados.</p>
<h3 id="Data-coordinator-data-coord" class="common-anchor-header">Coordenador de dados (data coord)</h3><p>O coordenador de dados gere a topologia dos nós de dados e dos nós de índice, mantém os metadados e desencadeia as operações de descarga, compactação e construção de índices e outras operações de dados em segundo plano.</p>
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
    </button></h2><p>Os braços e as pernas. Os nós de trabalho são executores burros que seguem as instruções do serviço coordenador e executam comandos de linguagem de manipulação de dados (DML) do proxy. Os nós de trabalho não têm estado graças à separação do armazenamento e da computação, e podem facilitar a expansão do sistema e a recuperação de desastres quando implantados no Kubernetes. Há três tipos de nós de trabalho:</p>
<h3 id="Query-node" class="common-anchor-header">Nó de consulta</h3><p>O nó de consulta recupera dados de registo incrementais e transforma-os em segmentos crescentes ao subscrever o corretor de registo, carrega dados históricos do armazenamento de objectos e executa uma pesquisa híbrida entre dados vectoriais e escalares.</p>
<h3 id="Data-node" class="common-anchor-header">Nó de dados</h3><p>O nó de dados recupera dados de registo incrementais através da subscrição do corretor de registos, processa pedidos de mutação e agrupa os dados de registo em instantâneos de registo e armazena-os no armazenamento de objectos.</p>
<h3 id="Index-node" class="common-anchor-header">Nó de índice</h3><p>O nó de índice constrói índices.  Os nós de índice não precisam ser residentes na memória e podem ser implementados com a estrutura sem servidor.</p>
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
    </button></h2><p>O armazenamento é o osso do sistema, responsável pela persistência dos dados. Inclui meta-armazenamento, corretor de registos e armazenamento de objectos.</p>
<h3 id="Meta-storage" class="common-anchor-header">Meta-armazenamento</h3><p>O meta-armazenamento armazena instantâneos de metadados, como o esquema de coleção e os pontos de verificação do consumo de mensagens. O armazenamento de metadados exige uma disponibilidade extremamente elevada, uma forte consistência e suporte de transacções, pelo que a Milvus escolheu o etcd para o meta storage. A Milvus também utiliza o etcd para registo de serviços e verificação da sua integridade.</p>
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
<li>Leia <a href="/docs/pt/main_components.md">Componentes principais</a> para obter mais detalhes sobre a arquitetura Milvus.</li>
</ul>
