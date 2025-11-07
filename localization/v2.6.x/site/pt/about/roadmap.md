---
id: roadmap.md
title: Roteiro do Milvus
related_key: Milvus roadmap
summary: >-
  Milvus é uma base de dados vetorial de código aberto criada para alimentar
  aplicações de IA. Aqui está o nosso roteiro para orientar o nosso
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">Rumo à base de dados multimodal e ao lago de dados da próxima geração<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
<p>Estamos a conduzir o Milvus a uma nova era - a base de dados multimodal da próxima geração - abrangendo <strong>dados estruturados a não estruturados</strong>, <strong>recuperação em tempo real a análises offline</strong> e <strong>desempenho de um único cluster a uma arquitetura global de lago de dados</strong>.</p>
<p>Este roteiro descreve os principais objetivos do <strong>Milvus v2.6 (em curso)</strong>, do <strong>Milvus v3.0 (previsto para finais de 2026)</strong> e do <strong>Milvus v3.1 (desenvolvimento a longo prazo)</strong>, juntamente com o plano de evolução do <strong>Vetor Lake (lago de dados/Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">Milvus v2.6 (em curso)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Cronograma: Meados de 2025 - final de 2025</strong></p>
<p>Foco: <strong>Atualizar o modelo de dados</strong>, <strong>refatorar a arquitetura de streaming</strong>, <strong>criar recursos de camadas quentes/frias</strong> e lançar o <strong>Protótipo de Lago Vetorial (v0.1)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">Principais destaques<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header"><strong>Atualização do modelo de dados</strong></h4><ul>
<li><p>Introduzir um tipo de dados <strong>Tensor / StructList</strong> unificado para suportar estruturas de incorporação de vários vetores, permitindo a compatibilidade com <em>ColBERT</em>, <em>CoLQwen</em>, <em>vídeo</em> e <em>vetores multimodais</em>.</p></li>
<li><p>Adicionar suporte a <strong>dados geográficos</strong>, incluindo pontos, regiões e indexação espacial (com base na <em>libspatial</em>), para expandir casos de uso em LBS e GIS.</p></li>
<li><p>Suporte para <strong>Timestamp com</strong> tipo de dados de fuso <strong>horário</strong>.</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header"><strong>Refactor da arquitetura StreamNode</strong></h4><ul>
<li><p>Reescreva o pipeline de ingestão de streaming para otimizar gravações incrementais e computação em tempo real.</p></li>
<li><p>Melhorar significativamente o desempenho e a estabilidade da concorrência, lançando as bases para o processamento unificado em tempo real e offline.</p></li>
<li><p>Introduzir um novo mecanismo de fila de mensagens: <strong>Woodpecker</strong>.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header"><strong>Arquitetura de armazenamento e hierarquização quente/fria (StorageV2)</strong></h4><ul>
<li><p>Suporte a dois formatos de armazenamento: <strong>Parquet</strong> e <strong>Vortex</strong>, melhorando a concorrência e a eficiência da memória.</p></li>
<li><p>Implementa armazenamento em camadas com separação automática de dados quentes/frios e agendamento inteligente.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header"><strong>Protótipo de Lago Vetorial (v0.1)</strong></h4><ul>
<li><p>Integrar com <strong>Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion</strong> via FFI, permitindo a evolução do esquema offline e consultas KNN.</p></li>
<li><p>Fornecer visualização de dados multimodais e uma demonstração do Spark ETL, estabelecendo a arquitetura fundamental do lago de dados.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Late-2026" class="common-anchor-header">Milvus v3.0 (previsto para o final de 2026)<button data-href="#🌠-Milvus-v30-Targeted-for-Late-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Cronograma: Final de 2025 - Início de 2026</strong></p>
<p>Foco: Aprimoramentos abrangentes na <strong>experiência de pesquisa</strong>, <strong>flexibilidade de esquema</strong> e <strong>suporte a dados não estruturados</strong>, juntamente com o lançamento do <strong>Vetor Lake (v0.2)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">Principais destaques<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header"><strong>🔹 Revisão da experiência de pesquisa</strong></h4><ul>
<li><p>Introduzir a pesquisa de similaridade <strong>More Like This (MLT)</strong> com suporte para pesquisas com posição ou exemplos negativos.</p></li>
<li><p>Adicionar recursos de pesquisa semântica, como <strong>destaque</strong> e <strong>reforço</strong>.</p></li>
<li><p>Suporte a <strong>dicionários personalizados</strong> e <strong>tabelas de sinónimos</strong>, permitindo definições de regras léxicas e semânticas na camada Analyzer.</p></li>
<li><p>Introduzir recursos <strong>de agregação</strong> para consultas.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header"><strong>Gestão de recursos e multilocatário</strong></h4><ul>
<li><p>Permitir a eliminação de vários inquilinos, estatísticas e camadas quentes/frias.</p></li>
<li><p>Melhorar o isolamento de recursos e as estratégias de agendamento para suportar milhões de tabelas num único cluster.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header"><strong>Aprimoramentos de esquema e chave primária</strong></h4><ul>
<li><p>Implementar <strong>a desduplicação global de chaves primárias (Global PK Dedup)</strong> para garantir a consistência e a exclusividade dos dados.</p></li>
<li><p>Suporte ao <strong>gerenciamento flexível de esquemas</strong> (adição/remoção de colunas, preenchimento de backup).</p></li>
<li><p>Permitir <strong>valores NULL</strong> em campos vectoriais.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header"><strong>Tipos de dados não estruturados alargados (BLOB / Texto)</strong></h4><ul>
<li><p>Introduzir o <strong>tipo BLOB</strong>, que fornece armazenamento nativo e referência para dados binários, como ficheiros, imagens e vídeos.</p></li>
<li><p>Introduzir o <strong>tipo TEXT</strong>, que fornece capacidades melhoradas de pesquisa de texto integral e baseada em conteúdos.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header"><strong>Capacidades de nível empresarial</strong></h4><ul>
<li><p>Suporte a <strong>backup e recuperação baseados em instantâneos</strong>.</p></li>
<li><p>Fornecer <strong>rastreamento de ponta a ponta</strong> e <strong>registo de auditoria</strong>.</p></li>
<li><p>Implementar <strong>alta disponibilidade (HA) ativa</strong> e em <strong>espera</strong> em implantações de vários clusters.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header"><strong>Vetor Lake (v0.2)</strong></h4><ul>
<li><p>Suporte para <strong>armazenamento TEXT / BLOB</strong> e <strong>gerenciamento de instantâneos de várias versões</strong>.</p></li>
<li><p>Integrar o Spark para tarefas de indexação offline, clustering, deduplicação e redução de dimensionalidade.</p></li>
<li><p>Fornecer <strong>demonstrações de consulta a frio e benchmark offline do ChatPDF</strong>.</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">Milvus v3.1 (Visão a longo prazo)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Cronograma: Meados de 2026</strong></p>
<p>Foco: <strong>Funções definidas pelo usuário (UDF)</strong>, <strong>integração de computação distribuída</strong>, <strong>otimização de consulta escalar</strong>, <strong>fragmentação dinâmica</strong> e o lançamento oficial do <strong>Vetor Lake (v1.0)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">Principais destaques<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header"><strong>UDF e ecossistema de computação distribuída</strong></h4><ul>
<li><p>Suporte a <strong>Funções Definidas pelo Usuário (UDFs)</strong>, permitindo que os desenvolvedores injetem lógica personalizada em fluxos de trabalho de recuperação e computação.</p></li>
<li><p>Integração profunda com <strong>Ray Dataset / Daft</strong> para execução distribuída de UDF e processamento de dados multimodais.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header"><strong>Consulta escalar e evolução do formato local</strong></h4><ul>
<li><p>Otimizar o desempenho de filtragem e agregação para campos escalares.</p></li>
<li><p>Melhorar a avaliação de expressões e a execução acelerada por índices.</p></li>
<li><p>Suporte a <strong>atualizações no local</strong> para formatos de arquivo locais.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 <strong>Capacidades de pesquisa avançada</strong></h4><ul>
<li><p>Adicione os seguintes recursos: Consultas <strong>RankBy</strong>, <strong>OrderBy</strong>, <strong>Facet</strong> e <strong>Fuzzy match</strong>.</p></li>
<li><p>Melhore a recuperação de texto com suporte para:</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 S <strong>harding dinâmico e escalabilidade</strong></h4><ul>
<li><p>Habilite <strong>a divisão automática de fragmentos</strong> e <strong>o balanceamento de carga</strong> para um dimensionamento perfeito.</p></li>
<li><p>Melhore <strong>a criação de índices globais</strong> e garanta <strong>o desempenho da pesquisa distribuída</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header"><strong>Vetor Lake V1.0</strong></h4><ul>
<li><p>Integração profunda com <strong>Ray / Daft / PyTorch</strong> para oferecer suporte a UDFs distribuídos e casos de uso de engenharia de contexto.</p></li>
<li><p>Fornece <strong>demonstrações de RAG (Retrieval-Augmented Generation)</strong> <strong>e importação de tabelas Iceberg</strong>.</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">Co-construção do futuro do Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus é um projeto de código aberto conduzido por uma comunidade global de desenvolvedores.</p>
<p>Convidamos calorosamente todos os membros da comunidade a ajudar a moldar a base de dados multimodal da próxima geração:</p>
<ul>
<li><p><strong>💬 Partilhar feedback</strong>: Propor novas funcionalidades ou ideias de otimização</p></li>
<li><p><strong>Comunicar problemas</strong>: Arquivar bugs através do GitHub Issues</p></li>
<li><p><strong>Contribuir com código</strong>: Submeter PRs e ajudar a construir funcionalidades essenciais</p>
<ul>
<li><p><strong>Pull requests</strong>: Contribua diretamente para a nossa <a href="https://github.com/milvus-io/milvus/pulls">base de código</a>. Quer se trate de corrigir bugs, adicionar funcionalidades ou melhorar a documentação, as suas contribuições são bem-vindas.</p></li>
<li><p><strong>Guia de desenvolvimento</strong>: Consulte o nosso <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guia do contribuidor</a> para obter orientações sobre contribuições de código.</p></li>
</ul></li>
<li><p><strong>Espalhe a palavra</strong>: Partilhe as melhores práticas e histórias de sucesso</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
