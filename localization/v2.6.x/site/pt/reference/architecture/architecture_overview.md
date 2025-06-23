---
id: architecture_overview.md
summary: >-
  O Milvus fornece uma base de dados vetorial rápida, fiável e estável, criada
  especificamente para a pesquisa de semelhanças e a inteligência artificial.
title: Visão geral da arquitetura do Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Visão geral da arquitetura do Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus é um banco de dados vetorial de <strong>código aberto</strong> e <strong>nativo da nuvem</strong> projetado para pesquisa de similaridade de alto desempenho em conjuntos de dados vetoriais maciços. Criado com base em bibliotecas populares de pesquisa vetorial, incluindo Faiss, HNSW, DiskANN e SCANN, ele capacita aplicativos de IA e cenários de recuperação de dados não estruturados. Antes de prosseguir, familiarize-se com os <a href="/docs/pt/v2.6.x/glossary.md">princípios básicos</a> da recuperação de incorporação.</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">Diagrama de arquitetura<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>O diagrama a seguir ilustra a arquitetura de alto nível do Milvus, mostrando seu design modular, escalável e nativo da nuvem com camadas de armazenamento e computação totalmente desagregadas.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>Diagrama de arquitetura</span> </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">Princípios da arquitetura<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus segue o princípio da desagregação do plano de dados e do plano de controlo, compreendendo quatro camadas principais que são mutuamente independentes em termos de escalabilidade e recuperação de desastres. Esta arquitetura de armazenamento partilhado com camadas de armazenamento e de computação totalmente desagregadas permite o escalonamento horizontal dos nós de computação, ao mesmo tempo que implementa o Woodpecker como uma camada WAL de disco zero para uma maior elasticidade e uma menor sobrecarga operacional.</p>
<p>Ao separar o processamento de streaming no Streaming Node e o processamento em lote no Query Node e no Data Node, o Milvus atinge um elevado desempenho, satisfazendo simultaneamente os requisitos de processamento em tempo real.</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">Arquitetura detalhada das camadas<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">Camada 1: Camada de acesso</h3><p>Composta por um grupo de proxies sem estado, a camada de acesso é a camada frontal do sistema e o ponto final para os utilizadores. Valida os pedidos dos clientes e reduz os resultados devolvidos:</p>
<ul>
<li>O proxy é, por si só, apátrida. Fornece um endereço de serviço unificado utilizando componentes de balanceamento de carga como o Nginx, o Kubernetes Ingress, o NodePort e o LVS.</li>
<li>Como o Milvus utiliza uma arquitetura de processamento paralelo massivo (MPP), o proxy agrega e pós-processa os resultados intermédios antes de devolver os resultados finais ao cliente.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">Camada 2: Coordenador</h3><p>O Coordinator funciona como o cérebro do Milvus. Em qualquer momento, está ativo exatamente um Coordenador em todo o cluster, responsável pela manutenção da topologia do cluster, pelo agendamento de todos os tipos de tarefas e pela garantia de consistência ao nível do cluster.</p>
<p>A seguir estão algumas das tarefas tratadas pelo <strong>Coordenador</strong>:</p>
<ul>
<li><strong>Gerenciamento de DDL/DCL/TSO</strong>: Trata os pedidos de linguagem de definição de dados (DDL) e de linguagem de controlo de dados (DCL), tais como a criação ou eliminação de colecções, partições ou índices, bem como a gestão do timestamp Oracle (TSO) e a emissão de time ticker.</li>
<li><strong>Gestão do serviço de streaming</strong>: Vincula o Write-Ahead Log (WAL) aos nós de streaming e fornece descoberta de serviço para o serviço de streaming.</li>
<li><strong>Gestão de consultas</strong>: Gere a topologia e o equilíbrio de carga para os nós de consulta e fornece e gere as vistas de consulta de serviço para orientar o encaminhamento de consultas.</li>
<li><strong>Gestão de dados históricos</strong>: Distribui tarefas offline, como compactação e construção de índices para nós de dados, e gerencia a topologia de segmentos e visualizações de dados.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">Camada 3: Nós de trabalho</h3><p>Os braços e as pernas. Os nós de trabalho são executores burros que seguem as instruções do coordenador. Os nós de trabalho não têm estado graças à separação do armazenamento e da computação, e podem facilitar a expansão do sistema e a recuperação de desastres quando implantados no Kubernetes. Há três tipos de nós de trabalho:</p>
<h3 id="Streaming-node" class="common-anchor-header">Nó de streaming</h3><p>O nó de streaming funciona como o "mini-cérebro" ao nível do shard, fornecendo garantias de consistência ao nível do shard e recuperação de falhas com base no armazenamento WAL subjacente. Entretanto, o nó de fluxo contínuo também é responsável pela consulta de dados crescentes e pela geração de planos de consulta. Além disso, também trata da conversão de dados crescentes em dados selados (históricos).</p>
<h3 id="Query-node" class="common-anchor-header">Nó de consulta</h3><p>O nó de consulta carrega os dados históricos do armazenamento de objectos e fornece a consulta de dados históricos.</p>
<h3 id="Data-node" class="common-anchor-header">Nó de dados</h3><p>O nó de dados é responsável pelo processamento offline dos dados históricos, como a compactação e a criação de índices.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">Camada 4: Armazenamento</h3><p>O armazenamento é o osso do sistema, responsável pela persistência dos dados. Inclui meta-armazenamento, corretor de registos e armazenamento de objectos.</p>
<h3 id="Meta-storage" class="common-anchor-header">Meta-armazenamento</h3><p>O meta-armazenamento armazena instantâneos de metadados, como o esquema de coleção e os pontos de controlo do consumo de mensagens. O armazenamento de metadados exige uma disponibilidade extremamente elevada, uma forte consistência e suporte de transacções, pelo que a Milvus escolheu o etcd para o meta storage. A Milvus também utiliza o etcd para registo de serviços e verificação da sua integridade.</p>
<h3 id="Object-storage" class="common-anchor-header">Armazenamento de objectos</h3><p>O armazenamento de objectos armazena ficheiros de instantâneos de registos, ficheiros de índice para dados escalares e vectoriais e resultados de consultas intermédias. O Milvus utiliza o MinIO como armazenamento de objectos e pode ser facilmente implementado no AWS S3 e no Azure Blob, dois dos serviços de armazenamento mais populares e económicos do mundo. No entanto, o armazenamento de objectos tem uma latência de acesso elevada e cobra pelo número de consultas. Para melhorar o seu desempenho e reduzir os custos, a Milvus planeia implementar a separação de dados cold-hot num conjunto de cache baseado em memória ou SSD.</p>
<h3 id="WAL-storage" class="common-anchor-header">Armazenamento WAL</h3><p>O armazenamento WAL (Write-Ahead Log) é a base da durabilidade e consistência dos dados em sistemas distribuídos. Antes de qualquer alteração ser confirmada, é primeiro registada num registo - garantindo que, em caso de falha, pode recuperar exatamente onde parou.</p>
<p>As implementações comuns de WAL incluem Kafka, Pulsar e Woodpecker. Ao contrário das soluções tradicionais baseadas em disco, o Woodpecker adota um design nativo da nuvem, sem disco, que grava diretamente no armazenamento de objetos. Essa abordagem é dimensionada sem esforço de acordo com suas necessidades e simplifica as operações ao remover a sobrecarga de gerenciamento de discos locais.</p>
<p>Ao registar antecipadamente cada operação de escrita, a camada WAL garante um mecanismo fiável de recuperação e consistência em todo o sistema, independentemente da complexidade do seu ambiente distribuído.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">Fluxo de Dados e Categorias de API<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>As APIs do Milvus são categorizadas por sua função e seguem caminhos específicos através da arquitetura:</p>
<table>
<thead>
<tr><th>Categoria da API</th><th>Operações</th><th>Exemplo de APIs</th><th>Fluxo da arquitetura</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>Esquema e controlo de acesso</td><td><code translate="no">createCollection</code>, <code translate="no">dropCollection</code>, <code translate="no">hasCollection</code>, <code translate="no">createPartition</code></td><td>Camada de acesso → Coordenador</td></tr>
<tr><td><strong>DML</strong></td><td>Manipulação de dados</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>Camada de acesso → Nó de trabalho de fluxo contínuo</td></tr>
<tr><td><strong>DQL</strong></td><td>Consulta de dados</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>Camada de acesso → Nó de trabalho em lote (nós de consulta)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">Exemplo de fluxo de dados: operação de pesquisa</h3><ol>
<li>O cliente envia um pedido de pesquisa através do SDK/API RESTful</li>
<li>O balanceador de carga encaminha o pedido para o proxy disponível na camada de acesso</li>
<li>O proxy utiliza a cache de encaminhamento para determinar os nós de destino; contacta o coordenador apenas se a cache não estiver disponível</li>
<li>O proxy encaminha o pedido para os nós de streaming adequados, que depois coordenam com os nós de consulta para a pesquisa de dados selados enquanto executam localmente a pesquisa de dados crescentes</li>
<li>Os nós de consulta carregam segmentos selados a partir do Object Storage, conforme necessário, e efectuam a pesquisa ao nível dos segmentos</li>
<li>Os resultados da pesquisa são submetidos a uma redução multinível: Os nós de consulta reduzem os resultados em vários segmentos, os nós de streaming reduzem os resultados dos nós de consulta e o proxy reduz os resultados de todos os nós de streaming antes de retornar ao cliente</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">Exemplo de fluxo de dados: inserção de dados</h3><ol>
<li>O cliente envia um pedido de inserção com dados vectoriais</li>
<li>A camada de acesso valida e encaminha o pedido para o nó de fluxo contínuo</li>
<li>O nó de fluxo contínuo regista a operação no armazenamento WAL para durabilidade</li>
<li>Os dados são processados em tempo real e disponibilizados para consultas</li>
<li>Quando os segmentos atingem a capacidade, o nó de streaming acciona a conversão para segmentos selados</li>
<li>O Data Node trata da compactação e constrói índices em cima dos segmentos selados, armazenando os resultados no Object Storage</li>
<li>Os nós de consulta carregam os índices recém-construídos e substituem os dados crescentes correspondentes</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">O que vem a seguir<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>Explore os <a href="/docs/pt/v2.6.x/main_components.md">componentes principais</a> para obter detalhes específicos de implementação</li>
<li>Saiba mais sobre fluxos de trabalho <a href="/docs/pt/v2.6.x/data_processing.md">de processamento de dados</a> e estratégias de otimização</li>
<li>Compreender o <a href="/docs/pt/v2.6.x/consistency.md">Modelo de Consistência</a> e as garantias de transação em Milvus</li>
</ul>
