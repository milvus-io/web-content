---
id: roadmap.md
title: Roteiro do Milvus
related_key: Milvus roadmap
summary: >-
  O Milvus é uma base de dados vetorial de código aberto concebida para
  alimentar aplicações de IA. Aqui está o nosso plano de desenvolvimento, que
  servirá de orientação para o nosso trabalho.
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="common-anchor-header">🌌 Rumo à base de dados multimodal de próxima geração e ao Vector Lakebase<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="anchor-icon" translate="no">
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
<p>Estamos a conduzir o Milvus para uma nova era — a base de dados multimodal de próxima geração — <strong>que abrange desde dados estruturados a não estruturados, da recuperação em tempo real à análise offline e do desempenho num único cluster a uma</strong> <strong>arquitetura</strong> <strong>global</strong> <strong>do Vector Lakebase.</strong></p>
<p>Este roteiro descreve os objetivos principais do <strong>Milvus v3.0 (beta pública)</strong> e <strong>do Milvus v3.1 (desenvolvimento a longo prazo)</strong>, juntamente com o plano de evolução do <strong>Zilliz Vector Lakebase</strong>.</p>
<h2 id="🌠-Milvus-v30-Public-Beta" class="common-anchor-header">🌠 Milvus v3.0 (Beta Público)<button data-href="#🌠-Milvus-v30-Public-Beta" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Versão beta pública: maio de 2026</strong></p>
<p>Foco: Construir um <strong>motor de consulta nativo semântico</strong> com ordenação, agregação e recuperação multivectorial integradas no próprio motor, bem como a <strong>base nativa do «lake» do Zilliz Vector Lakebase</strong>, para que a computação aceda aos dados sem necessidade de migração.</p>
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
    </button></h3><h4 id="🔹-Schema--Data-Type-Evolution" class="common-anchor-header">🔹 <strong>Evolução do esquema e dos tipos de dados</strong></h4><ul>
<li>Suporta ALTER COLLECTION ADD COLUMN e DROP COLUMN em tempo de execução, sem necessidade de reconstruir índices nem interromper o serviço.</li>
<li>Fornece <strong>duas vias de preenchimento retroativo</strong> para novas colunas: externa através do Spark Connector e interna com vetores esparsos BM25 gerados automaticamente no momento da gravação.</li>
<li>Introdução <strong>do TEXT</strong> como um tipo de dados de primeira classe que armazena o texto original juntamente com vetores, com suporte a BM25 e à correspondência de texto.</li>
</ul>
<h4 id="🔹-Query-Execution-Overhaul" class="common-anchor-header">🔹 <strong>Reformulação da execução</strong> <strong>de consultas</strong> </h4><ul>
<li>Integra a função <strong>«Order By»</strong> no motor com ordenação por segmento e ordenação por fusão entre os nós de consulta.</li>
<li>Adicionar <strong>agregação</strong> <strong>de consultas</strong> ao estilo SQL (GROUP BY com COUNT, SUM, AVG, MIN, MAX) calculada no kernel.</li>
<li>Introduzir <strong>facetas de pesquisa</strong> sobre resultados de ANN com estatísticas por bucket e subfacetas aninhadas do lado do servidor.</li>
<li>Suporte a <strong>dicionários personalizados</strong> e tabelas de sinónimos registados no cluster para melhorar a recuperação de CJK e de domínios específicos.</li>
</ul>
<h4 id="🔹-Multi-Vector--Late-Interaction-Support" class="common-anchor-header">🔹 <strong>Suporte a multivetores e interação tardia</strong></h4><ul>
<li>Introduzir <strong>o StructList</strong> para representar uma entidade como uma única linha com vários vetores, com suporte nativo à interação tardia (ColBERT, ColPali) através de MAX_SIM.</li>
<li>Suporte <strong>à pesquisa ao nível do elemento e ao nível da entidade</strong> nos campos StructList, com políticas de correspondência configuráveis para resultados ao nível da entidade.</li>
<li>Adiciona três <strong>estratégias de recuperação multivetorial</strong>: TokenANN (exaustiva), Muvera (baseada em projeção, sem treino) e Lemur (compressão aprendida).</li>
</ul>
<h4 id="🔹-Retrieval--Index-Overhaul" class="common-anchor-header">🔹 <strong>Revisão da recuperação e do índice</strong></h4><ul>
<li>Reestruturação do <strong>índice invertido esparso</strong> com compressão em blocos, quantização de pesos e um formato persistente; introdução <strong>do SINDI</strong> como algoritmo IP esparso predefinido.</li>
<li>Expandir a cobertura do índice com toda a <strong>família Faiss</strong> (SVS, Panorama, PQ, IVFPQ, ScaNN) e <strong>MinHash DIDO</strong> para deteção de quase-duplicados.</li>
<li>Suporte a <strong>campos vetoriais nulos</strong> para incorporações assíncronas e modalidades em falta, com filtragem automática no momento da pesquisa.</li>
</ul>
<h4 id="🔹-Vector-Lakebase-Storage--Compute-Architecture" class="common-anchor-header">🔹 <strong>Arquitetura de armazenamento e computação do Vector Lakebase</strong></h4><ul>
<li>Introdução <strong>da «External Collection»</strong> para indexar e consultar dados no S3 / GCS / Azure no local, com suporte para os formatos de tabela Lance, Parquet, Iceberg e Vortex.</li>
<li>Adiciona <strong>o Vortex</strong>, um formato colunar aberto, e <strong>o Loon (Storage V3)</strong>, uma camada de armazenamento de formato misto para leituras pontuais eficientes a partir do armazenamento de objetos.</li>
<li>Suporte a <strong>instantâneos pontuais</strong> com isolamento do tipo MVCC para processamento em lote, enquanto o serviço continua a gravar.</li>
<li>Integra-se como um <strong>Spark DataSource v2</strong> para ler e escrever diretamente no Milvus em pipelines do Spark / Databricks / EMR.</li>
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
    </button></h2><p><strong>Cronograma: Final de 2026 e além</strong></p>
<p>Foco: <strong>Inteligência de armazenamento</strong>, <strong>integridade do caminho de gravação</strong>, <strong>extensibilidade de computação</strong> e <strong>interoperabilidade</strong> <strong>alargada</strong> com <strong>o Vector Lakebase</strong>.</p>
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
    </button></h3><h4 id="🔹-Storage--Write-Path" class="common-anchor-header">🔹 <strong>Armazenamento e caminho de gravação</strong></h4><ul>
<li>Adicionar <strong>pushdown de predicados</strong> com poda de índices de página e filtros Bloom na camada de armazenamento.</li>
<li>Implementar <strong>a deduplicação por chave primária</strong> na ingestão para evitar duplicados no momento da gravação.</li>
</ul>
<h4 id="🔹-Compute--Elasticity" class="common-anchor-header">🔹 <strong>Computação e elasticidade</strong></h4><ul>
<li>Suporte <strong>a Funções Definidas pelo Utilizador (UDFs)</strong> para a execução de lógica personalizada no motor, no plano de dados.</li>
<li>Habilitar <strong>a divisão de fragmentos</strong> para redistribuir os fragmentos à medida que os dados crescem, com suporte a chaves de fragmentação personalizadas.</li>
</ul>
<h4 id="🔹-Spark--Vector-Lakebase-Expansion" class="common-anchor-header">🔹 <strong>Expansão</strong> <strong>do Spark e</strong> <strong>do Vector Lakebase</strong> </h4><ul>
<li>Expandir o conector Spark com uma biblioteca mais rica de <strong>operadores de lote nativos</strong>.</li>
<li>Adicionar funcionalidades <strong>de formato de tabela</strong>, incluindo «time-travel», evolução de esquemas e reversão de instantâneos.</li>
<li>Expandir a interoperabilidade do Vector Lakebase com <strong>índices externos atualizados por CDC</strong>, suporte ao Apache Paimon e formatos de dados adicionais.</li>
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
    </button></h2><p>O Milvus é um projeto de código aberto impulsionado por uma comunidade global de programadores. Convidamos todos os membros da comunidade a ajudar a moldar a base de dados multimodal da próxima geração:</p>
<ul>
<li><p>💬 <strong>Partilhe o seu feedback</strong>: proponha novas funcionalidades ou ideias de otimização nas <a href="https://github.com/milvus-io/milvus/discussions">Discussões do GitHub</a>.</p></li>
<li><p>🐛 <strong>Relatar problemas</strong>: Registe bugs através do <a href="https://github.com/milvus-io/milvus/issues">GitHub Issues</a>.</p></li>
<li><p>🔧 <strong>Contribua com código</strong>: envie PRs e ajude a desenvolver funcionalidades essenciais.</p>
<ul>
<li><strong>Pull requests</strong>: Contribua diretamente para <a href="https://github.com/milvus-io/milvus/pulls">a</a> nossa <a href="https://github.com/milvus-io/milvus/pulls">base de código</a>. Quer esteja a corrigir erros, a adicionar funcionalidades ou a melhorar a documentação, as suas contribuições são bem-vindas.</li>
<li><strong>Guia de desenvolvimento</strong>: Consulte <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">o</a> nosso <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">Guia do Colaborador</a> para obter orientações sobre contribuições de código.</li>
</ul></li>
<li><p>🗣️ <strong>Participe na conversa</strong>: Faça perguntas e conheça os mantenedores no <a href="https://milvus.io/discord">Discord</a>, no <a href="https://meetings.hubspot.com/chloe-williams1/milvus-meeting">Milvus Office Hours</a> ou em <a href="https://milvus.io/community">todos os canais da comunidade</a>.</p></li>
<li><p>⭐ <strong>Divulgue</strong>: Partilhe <strong>as</strong> melhores práticas e histórias de sucesso, e siga o Milvus no <a href="https://twitter.com/milvusio">X</a>, <a href="https://www.linkedin.com/company/the-milvus-project/">no LinkedIn</a> e <a href="https://www.youtube.com/c/MilvusVectorDatabase">no YouTube</a>.</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
