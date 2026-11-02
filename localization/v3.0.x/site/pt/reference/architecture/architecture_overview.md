---
id: architecture_overview.md
summary: >-
  A Milvus disponibiliza uma base de dados vetorial rápida, fiável e estável,
  concebida especificamente para a pesquisa de semelhanças e a inteligência
  artificial.
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
    </button></h1><p>O Milvus é uma base de dados vetorial <strong>de código aberto</strong> e <strong>nativa da nuvem</strong>, concebida para a pesquisa de similaridade de alto desempenho em conjuntos de dados vetoriais de grande dimensão. Construída com base em bibliotecas populares de pesquisa vetorial, incluindo Faiss, HNSW, DiskANN e SCANN, potencia aplicações de IA e cenários de recuperação de dados não estruturados. Antes de prosseguir, familiarize-se com os <a href="/docs/pt/glossary.md">princípios básicos</a> da recuperação de representações.</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">Diagrama da arquitetura<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>O diagrama seguinte ilustra a arquitetura de alto nível do Milvus, apresentando o seu design modular, escalável e nativo da nuvem, com camadas de armazenamento e computação totalmente desagregadas.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" /> 
   <span>Diagrama_de_arquitetura</span>
  
 </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">Princípios arquitetónicos<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus segue o princípio da desagregação do plano de dados e do plano de controlo, sendo composto por quatro camadas principais que são mutuamente independentes em termos de escalabilidade e recuperação de desastres. Esta arquitetura de armazenamento partilhado, com camadas de armazenamento e computação totalmente desagregadas, permite o escalonamento horizontal dos nós de computação, ao mesmo tempo que implementa o Woodpecker como uma camada WAL sem disco, para maior elasticidade e redução da sobrecarga operacional.</p>
<p>Ao separar o processamento de fluxos no Nodo de Streaming e o processamento em lote no Nodo de Consulta e no Nodo de Dados, o Milvus alcança um elevado desempenho, satisfazendo simultaneamente os requisitos de processamento em tempo real.</p>
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">Camada 1: Camada de Acesso<button data-href="#Layer-1-Access-Layer" class="anchor-icon" translate="no">
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
    </button></h3><p>Composta por um grupo de proxies sem estado, a camada de acesso é a camada frontal do sistema e o ponto de extremidade para os utilizadores. Valida os pedidos dos clientes e reduz os resultados devolvidos:</p>
<ul>
<li>O proxy é, por si só, sem estado. Fornece um endereço de serviço unificado utilizando componentes de equilíbrio de carga, tais como Nginx, Kubernetes Ingress, NodePort e LVS.</li>
<li>Como o Milvus emprega uma arquitetura de processamento massivamente paralelo (MPP), o proxy agrega e pós-processa os resultados intermédios antes de devolver os resultados finais ao cliente.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">Camada 2: Coordenador<button data-href="#Layer-2-Coordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>O Coordenador funciona como o cérebro do Milvus. A qualquer momento, existe exatamente um Coordenador ativo em todo o cluster, responsável por manter a topologia do cluster, agendar todos os tipos de tarefas e garantir a consistência ao nível do cluster.</p>
<p>Seguem-se algumas das tarefas geridas pelo <strong>Coordenador</strong>:</p>
<ul>
<li><strong>Gestão de DDL/DCL/TSO</strong>: Trata de pedidos de linguagem de definição de dados (DDL) e de linguagem de controlo de dados (DCL), tais como a criação ou eliminação de coleções, partições ou índices, bem como a gestão de carimbos de data e hora Oracle (TSO) e a emissão de marcadores de tempo.</li>
<li><strong>Gestão do serviço de streaming</strong>: Estabelece a ligação entre o registo de gravação antecipada (WAL) e os nós de streaming e fornece a descoberta de serviços para o serviço de streaming.</li>
<li><strong>Gestão de consultas</strong>: gere a topologia e o equilíbrio de carga dos nós de consulta e fornece e gere as vistas de consulta para orientar o encaminhamento das consultas.</li>
<li><strong>Gestão de dados históricos</strong>: Distribui tarefas offline, tais como a compactação e a criação de índices, pelos nós de dados e gere a topologia dos segmentos e das vistas de dados.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">Camada 3: Nós de trabalho<button data-href="#Layer-3-Worker-Nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>Os braços e as pernas. Os nós de trabalho são executores simples que seguem as instruções do coordenador. Os nós de trabalho são sem estado, graças à separação entre armazenamento e computação, e podem facilitar a expansão horizontal do sistema e a recuperação de desastres quando implementados no Kubernetes. Existem três tipos de nós de trabalho:</p>
<h3 id="Streaming-node" class="common-anchor-header">Nó de streaming<button data-href="#Streaming-node" class="anchor-icon" translate="no">
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
    </button></h3><p>O nó de streaming funciona como o «mini-cérebro» ao nível do fragmento, proporcionando garantias de consistência ao nível do fragmento e recuperação de falhas com base no armazenamento WAL subjacente. Entretanto, o nó de streaming também é responsável pela consulta de dados em crescimento e pela geração de planos de consulta. Além disso, também trata da conversão de dados em crescimento em dados selados (históricos).</p>
<h3 id="Query-node" class="common-anchor-header">Nó de consulta<button data-href="#Query-node" class="anchor-icon" translate="no">
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
    </button></h3><p>O nó de consulta carrega os dados históricos a partir do armazenamento de objetos e permite a consulta desses dados.</p>
<h3 id="Data-node" class="common-anchor-header">Nó de dados<button data-href="#Data-node" class="anchor-icon" translate="no">
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
    </button></h3><p>O nó de dados é responsável pelo processamento offline dos dados históricos, tais como a compactação e a criação de índices.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">Camada 4: Armazenamento<button data-href="#Layer-4-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>O armazenamento é a espinha dorsal do sistema, responsável pela persistência dos dados. É composto pelo meta-armazenamento, pelo intermediário de registos e pelo armazenamento de objetos.</p>
<h3 id="Meta-storage" class="common-anchor-header">Meta-armazenamento<button data-href="#Meta-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>O meta-armazenamento armazena instantâneos de metadados, tais como o esquema da coleção e pontos de verificação do consumo de mensagens. O armazenamento de metadados exige uma disponibilidade extremamente elevada, forte consistência e suporte a transações, pelo que o Milvus escolheu o etcd para o meta-armazenamento. O Milvus também utiliza o etcd para o registo de serviços e a verificação de integridade.</p>
<h3 id="Object-storage" class="common-anchor-header">Armazenamento de objetos<button data-href="#Object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>O armazenamento de objetos persiste dados e ficheiros de índice. O Milvus suporta back-ends de armazenamento de objetos, tais como o MinIO, o AWS S3 e o Azure Blob Storage. Os QueryNodes armazenam em cache os dados e os índices necessários para responder às consultas.</p>
<p>Com <a href="/docs/pt/tiered-storage-overview.md">o Armazenamento em Camadas</a>, disponível no Milvus 2.6.4 e versões posteriores, os QueryNodes podem carregar primeiro os metadados dos segmentos e obter os dados dos campos ou os índices sob demanda, em vez de carregar tudo na inicialização. O armazenamento de objetos remoto continua a ser a fonte persistente; a remoção de uma entrada da cache local não elimina os dados armazenados. O acesso a dados não armazenados em cache aumenta a E/S de armazenamento e pode aumentar a latência das consultas. Utilize <a href="/docs/pt/warm-up.md">o «Warm Up»</a> para campos ou índices sensíveis à latência e avalie a latência das consultas «frias», bem como a do cache «quente», antes de escolher uma estratégia de carregamento.</p>
<h3 id="WAL-storage" class="common-anchor-header">Armazenamento WAL<button data-href="#WAL-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>O armazenamento do Write-Ahead Log (WAL) é a base da durabilidade e consistência dos dados em sistemas distribuídos. Antes de qualquer alteração ser confirmada, esta é primeiro registada num registo — garantindo que, em caso de falha, é possível recuperar exatamente a partir do ponto em que se parou.</p>
<p>As implementações comuns de WAL incluem o Kafka, o Pulsar e o Woodpecker. Ao contrário das soluções tradicionais baseadas em disco, o Woodpecker adota um design nativo da nuvem e sem disco, que grava diretamente no armazenamento de objetos. Esta abordagem adapta-se facilmente às suas necessidades e simplifica as operações, eliminando a sobrecarga da gestão de discos locais.</p>
<p>Ao registar antecipadamente todas as operações de gravação, a camada WAL garante um mecanismo fiável, a nível de todo o sistema, para recuperação e consistência — independentemente da complexidade que o seu ambiente distribuído venha a atingir.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">Fluxo de dados e categorias de API<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>As APIs do Milvus são categorizadas de acordo com a sua função e seguem percursos específicos através da arquitetura:</p>
<table>
<thead>
<tr><th>Categoria de API</th><th>Operações</th><th>Exemplos de APIs</th><th>Fluxo da arquitetura</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>Esquema e controlo de acesso</td><td><code translate="no">createCollection</code>, <code translate="no">dropCollection</code>, <code translate="no">hasCollection</code>, <code translate="no">createPartition</code></td><td>Camada de acesso → Coordenador</td></tr>
<tr><td><strong>DML</strong></td><td>Manipulação de dados</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>Camada de Acesso → Nó de Trabalho de Transmissão</td></tr>
<tr><td><strong>DQL</strong></td><td>Consulta de Dados</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>Camada de Acesso → Nó de Processamento em Lote (Nós de Consulta)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">Exemplo de fluxo de dados: Operação de pesquisa<button data-href="#Example-Data-Flow-Search-Operation" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>O cliente envia um pedido de pesquisa através do SDK/API RESTful</li>
<li>O equilibrador de carga encaminha a solicitação para um proxy disponível na camada de acesso</li>
<li>O proxy utiliza a cache de encaminhamento para determinar os nós de destino; contacta o coordenador apenas se a cache não estiver disponível</li>
<li>O proxy reencaminha a solicitação para os nós de streaming apropriados, que, por sua vez, coordenam-se com os nós de consulta para a pesquisa de dados selados, enquanto executam localmente a pesquisa de dados em crescimento</li>
<li>Os nós de consulta carregam segmentos selados do armazenamento de objetos conforme necessário e realizam a pesquisa ao nível do segmento</li>
<li>Os resultados da pesquisa são submetidos a uma redução em vários níveis: os nós de consulta reduzem os resultados em vários segmentos, os nós de streaming reduzem os resultados provenientes dos nós de consulta e o proxy reduz os resultados de todos os nós de streaming antes de os devolver ao cliente</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">Exemplo de fluxo de dados: inserção de dados<button data-href="#Example-Data-Flow-Data-Insertion" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>O cliente envia uma solicitação de inserção com dados vetoriais</li>
<li>A camada de acesso valida e encaminha o pedido para o nó de streaming</li>
<li>O Nó de Transmissão regista a operação no WAL Storage para garantir a durabilidade</li>
<li>Os dados são processados em tempo real e disponibilizados para consultas</li>
<li>Quando os segmentos atingem a capacidade máxima, o nó de streaming aciona a conversão para segmentos selados</li>
<li>O Nodo de Dados trata da compactação e cria índices sobre os segmentos selados, armazenando os resultados no Armazenamento de Objetos</li>
<li>Os Nós de Consulta carregam os índices recém-criados e substituem os dados correspondentes que estão a crescer</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">Próximos passos<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>Explore os <a href="/docs/pt/main_components.md">principais componentes</a> para obter detalhes específicos sobre a implementação</li>
<li>Conheça os fluxos de trabalho <a href="/docs/pt/data_processing.md">de processamento de dados</a> e as estratégias de otimização</li>
<li>Compreenda o <a href="/docs/pt/tune_consistency.md">modelo de consistência</a> e as garantias de transação no Milvus</li>
</ul>
