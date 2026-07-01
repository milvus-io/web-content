---
id: roadmap.md
title: Roteiro do Milvus
related_key: Milvus roadmap
summary: >-
  O Milvus é uma base de dados vetorial de código aberto concebida para
  alimentar aplicações de IA. Aqui está o nosso roteiro para orientar o nosso
  desenvolvimento.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Roteiro do Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 Rumo à base de dados multimodal e ao data lake de próxima geração<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Roteiro do produto Milvus</strong></p>
<p>Bem-vindo ao Roteiro do Milvus!</p>
<p>Estamos a conduzir o Milvus para uma nova era — a base de dados multimodal de próxima geração — que abrange <strong>desde dados estruturados a não estruturados</strong>, <strong>da recuperação em tempo real à análise offline</strong> e <strong>do desempenho num único cluster a uma arquitetura global de lago de dados</strong>.</p>
<p>Este roteiro descreve os objetivos principais para <strong>o Milvus v2.6 (em desenvolvimento)</strong>, <strong>o Milvus v3.0 (previsto para o final de 2026)</strong> e <strong>o Milvus v3.1 (desenvolvimento a longo prazo)</strong>, juntamente com o plano de evolução do <strong>Vector Lake (data lake / Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (em desenvolvimento)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Cronograma: meados de 2025 – final de 2025</strong></p>
<p>Foco: <strong>Atualização do modelo de dados</strong>, <strong>refatoração da arquitetura de streaming</strong>, <strong>desenvolvimento de capacidades de armazenamento em camadas «quentes» e «frias»</strong> e lançamento do <strong>protótipo do Vector Lake (v0.1)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Principais destaques<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹 <strong>Atualização do modelo de dados</strong></h4><ul>
<li><p>Introduzir um tipo de dados unificado <strong>Tensor / StructList</strong> para suportar estruturas de incorporação multivectorial, permitindo a compatibilidade com <em>ColBERT</em>, <em>CoLQwen</em>, <em>vídeo</em> e <em>vetores multimodais</em>.</p></li>
<li><p>Adicionar suporte <strong>a dados geográficos</strong>, incluindo pontos, regiões e indexação espacial (com base na <em>libspatial</em>), para expandir os casos de utilização em LBS e GIS.</p></li>
<li><p>Suporte para o tipo de dados <strong>«Timestamp with Timezone</strong> ».</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header">🔹 <strong>Reestruturação da arquitetura do StreamNode</strong></h4><ul>
<li><p>Reescrever o pipeline de ingestão de streaming para otimizar gravações incrementais e cálculos em tempo real.</p></li>
<li><p>Melhorar significativamente o desempenho e a estabilidade da concorrência, lançando as bases para um processamento unificado em tempo real e offline.</p></li>
<li><p>Introdução de um novo motor de filas de mensagens: <strong>Woodpecker</strong>.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹 <strong>Arquitetura de armazenamento e camadas «quentes»/«frias» (StorageV2)</strong></h4><ul>
<li><p>Suportar dois formatos de armazenamento: <strong>Parquet</strong> e <strong>Vortex</strong>, melhorando a concorrência e a eficiência da memória.</p></li>
<li><p>Implementar armazenamento em camadas com separação automática de dados «quentes» e «frios» e agendamento inteligente.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹 <strong>Protótipo do Vector Lake (v0.1)</strong></h4><ul>
<li><p>Integração com <strong>o Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion</strong> através de FFI, permitindo a evolução do esquema offline e consultas KNN.</p></li>
<li><p>Fornece visualização de dados multimodal e uma demonstração de ETL do Spark, estabelecendo a arquitetura fundamental do data lake.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Early-2026" class="common-anchor-header">🌠 Milvus v3.0 (previsto para o início de 2026)<button data-href="#🌠-Milvus-v30-Targeted-for-Early-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Cronograma: Final de 2025 – Início de 2026</strong></p>
<p>Foco: Melhorias abrangentes na <strong>experiência de pesquisa</strong>, <strong>flexibilidade do esquema</strong> e <strong>suporte a dados não estruturados</strong>, juntamente com o lançamento do <strong>Vector Lake (v0.2)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Principais destaques<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header">🔹 <strong>Reformulação da experiência de pesquisa</strong></h4><ul>
<li><p>Introdução da pesquisa por semelhança <strong>«Mais como este» (MLT)</strong>, com suporte para pesquisas com posição ou exemplos negativos.</p></li>
<li><p>Adicionar capacidades de pesquisa semântica, tais como <strong>realce</strong> e <strong>reforço</strong>.</p></li>
<li><p>Suporte a <strong>dicionários personalizados</strong> e <strong>tabelas de sinónimos</strong>, permitindo definições de regras lexicais e semânticas na camada do Analyzer.</p></li>
<li><p>Introdução de capacidades <strong>de agregação</strong> para consultas.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹 <strong>Multilocação e gestão de recursos</strong></h4><ul>
<li><p>Habilitar a eliminação multitenant, estatísticas e classificação em camadas «quentes» e «frias».</p></li>
<li><p>Melhorar o isolamento de recursos e as estratégias de agendamento para suportar milhões de tabelas num único cluster.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header">🔹 <strong>Melhorias no esquema e na chave primária</strong></h4><ul>
<li><p>Implementar <strong>a deduplicação global de chaves primárias (Global PK Dedup)</strong> para garantir a consistência e a unicidade dos dados.</p></li>
<li><p>Suportar <strong>a gestão flexível de esquemas</strong> (adição/eliminação de colunas, preenchimento de cópias de segurança).</p></li>
<li><p>Permitir <strong>valores NULL</strong> em campos vetoriais.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹 <strong>Tipos de dados não estruturados alargados (BLOB / Texto)</strong></h4><ul>
<li><p>Introduza o <strong>tipo BLOB</strong>, que fornece armazenamento e referência nativos para dados binários, tais como ficheiros, imagens e vídeos.</p></li>
<li><p>Introduzir <strong>o tipo TEXT</strong>, que oferece capacidades melhoradas de pesquisa de texto completo e baseada no conteúdo.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹 <strong>Funcionalidades de nível empresarial</strong></h4><ul>
<li><p>Suportar <strong>cópias de segurança e recuperação baseadas em instantâneos</strong>.</p></li>
<li><p>Fornece <strong>rastreio de ponta a ponta</strong> e <strong>registo de auditoria</strong>.</p></li>
<li><p>Implementação <strong>de alta disponibilidade (HA) ativo-em espera</strong> em implementações com vários clusters.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹 <strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>Suporta <strong>armazenamento de TEXT/BLOB</strong> e <strong>gestão de instantâneos com várias versões</strong>.</p></li>
<li><p>Integra o Spark para tarefas de indexação offline, agrupamento em clusters, deduplicação e redução de dimensionalidade.</p></li>
<li><p>Apresentar <strong>demonstrações de consultas em modo «cold» e benchmarks offline do ChatPDF</strong>.</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1 (Visão a Longo Prazo)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Cronograma: meados de 2026</strong></p>
<p>Foco: <strong>Funções definidas pelo utilizador (UDF)</strong>, <strong>integração de computação distribuída</strong>, <strong>otimização de consultas escalares</strong>, <strong>fragmentação dinâmica</strong> e o lançamento oficial do <strong>Vector Lake (v1.0)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Principais destaques<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹 <strong>UDF e ecossistema de computação distribuída</strong></h4><ul>
<li><p>Suporte <strong>a funções definidas pelo utilizador (UDFs)</strong>, permitindo que os programadores incorporem lógica personalizada nos fluxos de trabalho de recuperação e computação.</p></li>
<li><p>Integração profunda com <strong>o Ray Dataset / Daft</strong> para a execução distribuída de UDF e o processamento de dados multimodais.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header">🔹 <strong>Evolução das consultas escalares e do formato local</strong></h4><ul>
<li><p>Otimização do desempenho de filtragem e agregação para campos escalares.</p></li>
<li><p>Melhoria da avaliação de expressões e da execução acelerada por índices.</p></li>
<li><p>Suporta <strong>atualizações no local</strong> para formatos de ficheiros locais.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 <strong>Funcionalidades de pesquisa avançadas</strong></h4><ul>
<li><p>Adicione as seguintes funcionalidades: consultas <strong>RankBy</strong>, <strong>OrderBy</strong>, <strong>Facet</strong> e <strong>de correspondência aproximada</strong>.</p></li>
<li><p>Melhorar a recuperação de texto com suporte para:</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 <strong>Fragmentação dinâmica e escalabilidade</strong></h4><ul>
<li><p>Ativar <strong>a divisão automática de fragmentos</strong> e <strong>o equilíbrio de carga</strong> para um dimensionamento sem interrupções.</p></li>
<li><p>Melhorar <strong>a criação de índices globais</strong> e garantir <strong>o desempenho da pesquisa distribuída</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p>Integração profunda com <strong>Ray / Daft / PyTorch</strong> para suportar UDFs distribuídas e casos de utilização de Engenharia de Contexto.</p></li>
<li><p>Fornece <strong>demonstrações de RAG (Retrieval-Augmented Generation)</strong> <strong>e permite a importação a partir de tabelas Iceberg</strong>.</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Construir em conjunto o futuro do Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus é um projeto de código aberto impulsionado por uma comunidade global de programadores.</p>
<p>Convidamos calorosamente todos os membros da comunidade a ajudar a moldar a base de dados multimodal da próxima geração:</p>
<ul>
<li><p>💬 <strong>Partilhe o seu feedback</strong>: proponha novas funcionalidades ou ideias de otimização</p></li>
<li><p>🐛 <strong>Relatar problemas</strong>: Registe bugs através do GitHub Issues</p></li>
<li><p>🔧 <strong>Contribua com código</strong>: envie PRs e ajude a desenvolver funcionalidades essenciais</p>
<ul>
<li><p><strong>Pull requests</strong>: Contribua diretamente para <a href="https://github.com/milvus-io/milvus/pulls">a</a> nossa <a href="https://github.com/milvus-io/milvus/pulls">base de código</a>. Quer se trate de corrigir erros, adicionar funcionalidades ou melhorar a documentação, as suas contribuições são bem-vindas.</p></li>
<li><p><strong>Guia de desenvolvimento</strong>: Consulte <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">o</a> nosso <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guia do Colaborador</a> para obter orientações sobre contribuições de código.</p></li>
</ul></li>
<li><p>⭐ <strong>Divulgue</strong>: Partilhe <strong>as</strong> melhores práticas e histórias de sucesso</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
