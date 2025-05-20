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
    </button></h1><p>Construído com base em bibliotecas populares de pesquisa vetorial, incluindo Faiss, HNSW, DiskANN, SCANN e outras, o Milvus foi concebido para pesquisa por semelhança em conjuntos de dados vectoriais densos contendo milhões, milhares de milhões ou mesmo triliões de vectores. Antes de prosseguir, familiarize-se com os <a href="/docs/pt/v2.4.x/glossary.md">princípios básicos</a> da recuperação por incorporação.</p>
<p>O Milvus também suporta a fragmentação de dados, a ingestão de dados em fluxo contínuo, o esquema dinâmico, a pesquisa que combina dados vectoriais e escalares, a pesquisa multi-vetorial e híbrida, o vetor esparso e muitas outras funções avançadas. A plataforma oferece desempenho a pedido e pode ser optimizada para se adaptar a qualquer cenário de recuperação de incorporação. Recomendamos a implantação do Milvus usando o Kubernetes para obter disponibilidade e elasticidade ideais.</p>
<p>O Milvus adopta uma arquitetura de armazenamento partilhado com desagregação do armazenamento e da computação e escalabilidade horizontal para os seus nós de computação. Seguindo o princípio da desagregação do plano de dados e do plano de controlo, o Milvus é composto por <a href="/docs/pt/v2.4.x/four_layers.md">quatro camadas</a>: camada de acesso, serviço coordenador, nó de trabalho e armazenamento. Estas camadas são mutuamente independentes quando se trata de escalonamento ou de recuperação de desastres.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus_architecture.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>Diagrama de arquitetura</span> </span></p>
<p>De acordo com a figura, as interfaces podem ser classificadas nas seguintes categorias:</p>
<ul>
<li><strong>DDL / DCL:</strong> createCollection / createPartition / dropCollection / dropPartition / hasCollection / hasPartition</li>
<li><strong>DML / Produce:</strong> insert / delete / upsert</li>
<li><strong>DQL:</strong> pesquisa / consulta</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">O que se segue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Saiba mais sobre a <a href="/docs/pt/v2.4.x/four_layers.md">desagregação de computação/armazenamento</a> em Milvus</li>
<li>Saiba mais sobre os <a href="/docs/pt/v2.4.x/main_components.md">principais componentes</a> do Milvus.</li>
</ul>
