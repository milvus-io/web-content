---
id: index-explained.md
title: O que é um índice
summary: >-
  Um índice é uma estrutura adicional criada sobre os dados. A sua estrutura
  interna depende do algoritmo de pesquisa de vizinho mais próximo aproximado
  que estiver a ser utilizado. Um índice acelera a pesquisa, mas implica tempo
  de pré-processamento, espaço e memória RAM adicionais durante a pesquisa. Além
  disso, a utilização de um índice reduz normalmente a taxa de recuperação
  (embora o efeito seja insignificante, continua a ser relevante). Por
  conseguinte, este artigo explica como minimizar os custos da utilização de um
  índice, maximizando simultaneamente os benefícios.
---
<h1 id="Index-Explained" class="common-anchor-header">O que é um índice<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Um índice é uma estrutura adicional criada sobre os dados. A sua estrutura interna depende do algoritmo de pesquisa do vizinho mais próximo, aproximadamente, que estiver a ser utilizado. Um índice acelera a pesquisa, mas implica tempo de pré-processamento, espaço e memória RAM adicionais durante a pesquisa. Além disso, a utilização de um índice reduz normalmente a taxa de recuperação (embora o efeito seja insignificante, continua a ser relevante). Por conseguinte, este artigo explica como minimizar os custos da utilização de um índice, maximizando simultaneamente os benefícios.</p>
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
    </button></h2><p>No Milvus, os índices são específicos para cada campo, e os tipos de índice aplicáveis variam de acordo com os tipos de dados dos campos de destino. Enquanto base de dados vetorial profissional, o Milvus concentra-se em melhorar tanto o desempenho das pesquisas vetoriais como da filtragem escalar, razão pela qual oferece vários tipos de índice.</p>
<p>A tabela seguinte apresenta a relação de correspondência entre os tipos de dados dos campos e os tipos de índice aplicáveis.</p>
<table>
   <tr>
     <th><p>Tipo de dados do campo</p></th>
     <th><p>Tipos de Índice Aplicáveis</p></th>
   </tr>
   <tr>
     <td><p>FLOAT_VECTOR</p></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>FAISS</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_FORÇA_BRUTA</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VECTOR</p></li><li><p>INT8_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_FORÇA_BRUTA</p></li></ul></td>
   </tr>
   <tr>
     <td><p>VETOR_BINÁRIO</p></td>
     <td><ul><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>MINHASH_LSH</p></li><li><p>FAISS</p></li></ul></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
     <td><p>ÍNDICE INVERTIDO ESPARSO</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTED (Recomendado)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li><p>BITMAP (Recomendado)</p></li><li><p>INVERTIDO</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li><p>INVERTIDO</p></li><li><p>STL_SORT</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT</p></li><li><p>DUPLO</p></li></ul></td>
     <td><p>INVERTIDO</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elementos dos tipos BOOL, INT8/16/32/64 e VARCHAR)</sup></p></td>
     <td><p>BITMAP (Recomendado)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elementos dos tipos BOOL, INT8/16/32/64, FLOAT, DOUBLE e VARCHAR)</sup></p></td>
     <td><p>INVERTIDA</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTIDO</p></td>
   </tr>
</table>
<p>Este artigo centra-se na forma de selecionar índices vetoriais adequados. Para campos escalares, pode sempre utilizar o tipo de índice recomendado.</p>
<p>A seleção de um tipo de índice adequado para uma pesquisa vetorial pode ter um impacto significativo no desempenho e na utilização de recursos. Ao escolher um tipo de índice para um campo vetorial, é essencial considerar vários fatores, incluindo a estrutura de dados subjacente, a utilização de memória e os requisitos de desempenho.</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">Anatomia do índice vetorial<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Conforme demonstrado no diagrama abaixo, um tipo de índice no Milvus consiste em três componentes principais: <strong>estrutura de dados</strong>, <strong>quantização</strong> e <strong>refinador</strong>. A quantização e o refinador são opcionais, mas são amplamente utilizados devido a um equilíbrio significativo entre ganhos e custos.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" /> 
   <span>Anatomia do índice vetorial</span>
  
 </span></p>
<p>Durante a criação do índice, o Milvus combina a estrutura de dados e o método de quantização escolhidos para determinar uma <strong>taxa de expansão</strong> ótima. No momento da consulta, o sistema recupera um <code translate="no">topK × expansion rate</code> e vetores candidatos, aplica o refinador para recalcular distâncias com maior precisão e, por fim, devolve os resultados mais precisos <code translate="no">topK</code>. Esta abordagem híbrida equilibra velocidade e precisão, restringindo o refinamento, que consome muitos recursos, a um subconjunto filtrado de candidatos.</p>
<h3 id="Data-structure" class="common-anchor-header">Estrutura de dados<button data-href="#Data-structure" class="anchor-icon" translate="no">
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
    </button></h3><p>A estrutura de dados constitui a camada fundamental do índice. Os tipos comuns incluem:</p>
<ul>
<li><p><strong>Ficheiro Invertido (IVF)</strong></p>
<p>Os tipos de índice da série IVF permitem ao Milvus agrupar vetores em buckets através de um particionamento baseado em centroides. Em geral, é seguro assumir que todos os vetores num bucket estão provavelmente próximos do vetor de consulta se o centroide do bucket estiver próximo do vetor de consulta. Com base nesta premissa, o Milvus analisa apenas as incorporações de vetores nos buckets cujos centroides se encontram próximos do vetor de consulta, em vez de examinar todo o conjunto de dados. Esta estratégia reduz os custos computacionais, mantendo simultaneamente uma precisão aceitável.</p>
<p>Este tipo de estrutura de dados de índice é ideal para conjuntos de dados de grande escala que exigem um débito elevado.</p></li>
<li><p><strong>Estrutura baseada em grafos</strong></p>
<p>Uma estrutura de dados baseada em grafos para pesquisa vetorial, como o Hierarchical Navigable Small World (<a href="https://arxiv.org/abs/1603.09320">HNSW</a>), constrói um grafo em camadas onde cada vetor se liga aos seus vizinhos mais próximos. As consultas navegam por esta hierarquia, começando pelas camadas superiores mais genéricas e passando pelas camadas inferiores, permitindo uma complexidade de pesquisa eficiente em tempo logarítmico.</p>
<p>Este tipo de estrutura de dados de índice destaca-se em espaços de alta dimensão e em cenários que exigem consultas de baixa latência.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">Quantização<button data-href="#Quantization" class="anchor-icon" translate="no">
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
    </button></h3><p>A quantização reduz a pegada de memória e os custos computacionais através de uma representação mais grosseira:</p>
<ul>
<li><p><strong>A quantização escalar</strong> (por exemplo, <strong>SQ8</strong>) permite ao Milvus comprimir cada dimensão do vetor num único byte (8 bits), reduzindo a utilização de memória em 75% em comparação com números flutuantes de 32 bits, ao mesmo tempo que preserva uma precisão razoável.</p></li>
<li><p><strong>A quantização de produto</strong> (<strong>PQ</strong>) permite que o Milvus divida vetores em subvetores e os codifique utilizando agrupamento baseado em livro de códigos. Isto permite obter taxas de compressão mais elevadas (por exemplo, 4-32x) à custa de uma ligeira redução na taxa de recuperação, tornando-a adequada para ambientes com restrições de memória.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">Refinador<button data-href="#Refiner" class="anchor-icon" translate="no">
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
    </button></h3><p>A quantização é, por natureza, com perdas. Para manter a taxa de recuperação, a quantização produz consistentemente mais candidatos top-K do que o necessário, permitindo que os refinadores utilizem uma precisão mais elevada para selecionar posteriormente os resultados top-K a partir desses candidatos, melhorando assim a taxa de recuperação.</p>
<p>Por exemplo, o refinador FP32 opera sobre os candidatos aos resultados de pesquisa devolvidos pela quantização, recalculando as distâncias utilizando precisão FP32 em vez dos valores quantizados.</p>
<p>Isto é fundamental para aplicações que exigem um equilíbrio entre a eficiência da pesquisa e a precisão, tais como a pesquisa semântica ou os sistemas de recomendação, onde pequenas variações de distância têm um impacto significativo na qualidade dos resultados.</p>
<h3 id="Summary" class="common-anchor-header">Resumo<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h3><p>Esta arquitetura em camadas — filtragem grosseira através de estruturas de dados, computação eficiente por meio da quantização e ajuste de precisão por meio do refinamento — permite que o Milvus otimize de forma adaptativa o equilíbrio entre precisão e desempenho.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">Compromissos de desempenho<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao avaliar o desempenho, é crucial equilibrar <strong>o tempo de compilação</strong>, <strong>o número de consultas por segundo (QPS)</strong> e <strong>a taxa de recuperação</strong>. As regras gerais são as seguintes:</p>
<ul>
<li><p><strong>Os tipos de índice baseados em grafos</strong> costumam superar <strong>as variantes IVF</strong> em termos de <strong>QPS</strong>.</p></li>
<li><p><strong>As variantes IVF</strong> são particularmente adequadas em cenários com <strong>um topK elevado (por exemplo, superior a 2 000)</strong>.</p></li>
<li><p><strong>O PQ</strong> oferece normalmente uma melhor taxa de recuperação com taxas de compressão semelhantes quando comparado com <strong>o SQ</strong>, embora este último proporcione um desempenho mais rápido.</p></li>
<li><p>A utilização de discos rígidos para parte do índice (como no <strong>DiskANN</strong>) ajuda a gerir grandes conjuntos de dados, mas também introduz potenciais estrangulamentos de IOPS.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">Capacidade<button data-href="#Capacity" class="anchor-icon" translate="no">
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
    </button></h3><p>A capacidade envolve normalmente a relação entre o tamanho dos dados e a RAM disponível. Ao lidar com a capacidade, tenha em conta o seguinte:</p>
<ul>
<li><p>Se um quarto dos seus dados brutos couber na memória, considere o DiskANN pela sua latência estável.</p></li>
<li><p>Se todos os seus dados brutos couberem na memória, considere tipos de índice baseados em memória e o mmap.</p></li>
<li><p>Pode utilizar os tipos de índice com quantização aplicada e o mmap para trocar precisão por capacidade máxima.</p></li>
</ul>
<div class="alert note">
<p>O mmap nem sempre é a solução. Quando a maior parte dos seus dados se encontra no disco, o DiskANN proporciona uma melhor latência.</p>
</div>
<h3 id="Recall" class="common-anchor-header">Recuperação<button data-href="#Recall" class="anchor-icon" translate="no">
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
    </button></h3><p>A recuperação envolve normalmente a taxa de filtragem, que se refere aos dados que são filtrados antes das pesquisas. Ao lidar com a recuperação, tenha em conta o seguinte:</p>
<ul>
<li><p>Se a taxa de filtragem for inferior a 85%, os tipos de índice baseados em grafos apresentam melhor desempenho do que as variantes IVF.</p></li>
<li><p>Se a taxa de filtragem estiver entre 85% e 95%, utilize variantes IVF.</p></li>
<li><p>Se a taxa de filtragem for superior a 98%, utilize o método Brute-Force (FLAT) para obter resultados de pesquisa mais precisos.</p></li>
</ul>
<div class="alert note">
<p>Os itens acima nem sempre estão corretos. Recomenda-se ajustar a recuperação com diferentes tipos de índice para determinar qual o tipo de índice que funciona melhor.</p>
</div>
<h3 id="Performance" class="common-anchor-header">Desempenho<button data-href="#Performance" class="anchor-icon" translate="no">
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
    </button></h3><p>O desempenho de uma pesquisa envolve normalmente o top-K, que se refere ao número de registos que a pesquisa devolve. Ao lidar com o desempenho, tenha em conta o seguinte:</p>
<ul>
<li><p>Para uma pesquisa com um top-K pequeno (por exemplo, 2 000) que exija uma elevada taxa de recall, os tipos de índice baseados em grafos apresentam melhor desempenho do que as variantes IVF.</p></li>
<li><p>Para uma pesquisa com um top-K elevado (em comparação com o número total de incorporações de vetores), as variantes IVF são uma escolha mais adequada do que os tipos de índice baseados em grafos.</p></li>
<li><p>Para uma pesquisa com um top-K de tamanho médio e uma elevada taxa de filtragem, as variantes IVF são as melhores opções.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">Matriz de decisão: Escolher o tipo de índice mais adequado<button data-href="#Decision-Matrix-Choosing-the-most-appropriate-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>A tabela seguinte é uma matriz de decisão que pode servir de referência na escolha de um tipo de índice adequado.</p>
<table>
   <tr>
     <th><p>Cenário</p></th>
     <th><p>Índice recomendado</p></th>
     <th><p>Notas</p></th>
   </tr>
   <tr>
     <td><p>Os dados brutos cabem na memória</p></td>
     <td><p>HNSW, IVF + Refinamento</p></td>
     <td><p>Utilize o HNSW para baixo<code translate="no">k</code> o / alto recall.</p></td>
   </tr>
   <tr>
     <td><p>Dados brutos no disco, SSD</p></td>
     <td><p>DiskANN</p></td>
     <td><p>Ideal para consultas sensíveis à latência.</p></td>
   </tr>
   <tr>
     <td><p>Dados brutos no disco, RAM limitada</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>Equilibra o acesso à memória e ao disco.</p></td>
   </tr>
   <tr>
     <td><p>Elevada taxa de filtragem (&gt;95%)</p></td>
     <td><p>Força bruta (FLAT)</p></td>
     <td><p>Evita a sobrecarga do índice para conjuntos de candidatos muito pequenos.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">k</code> e grande (≥1% do conjunto de dados)</p></td>
     <td><p>IVF</p></td>
     <td><p>A poda de clusters reduz a carga computacional.</p></td>
   </tr>
   <tr>
     <td><p>Taxa de recall extremamente elevada (&gt;99%)</p></td>
     <td><p>Força bruta (FLAT) + GPUs</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">Estimativa do consumo de memória<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>Esta secção centra-se no cálculo do consumo de memória de um tipo específico de índice e inclui muitos detalhes técnicos. Pode ignorar esta secção sem problemas, caso não seja do seu interesse.</p>
</div>
<p>O consumo de memória de um índice é influenciado pela sua estrutura de dados, pela taxa de compressão através da quantização e pelo refinador utilizado. De um modo geral, os índices baseados em grafos têm normalmente uma pegada de memória mais elevada devido à estrutura do grafo (por exemplo, <strong>HNSW</strong>), o que implica, na maioria das vezes, uma sobrecarga significativa por espaço vetorial. Em contrapartida, o IVF e as suas variantes são mais eficientes em termos de memória, uma vez que implicam menos sobrecarga por espaço vetorial. No entanto, técnicas avançadas como <strong>o DiskANN</strong> permitem que partes do índice, como o grafo ou o refinador, residam no disco, reduzindo a carga de memória e mantendo simultaneamente o desempenho.</p>
<p>Mais especificamente, a utilização de memória de um índice pode ser calculada da seguinte forma:</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">Utilização de memória do índice IVF<button data-href="#IVF-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>Os índices IVF equilibram a eficiência de memória com o desempenho de pesquisa, particionando os dados em clusters. Abaixo encontra-se uma repartição da memória utilizada por 1 milhão de vetores de 128 dimensões indexados utilizando variantes do IVF.</p>
<ol>
<li><p><strong>Calcular a memória utilizada pelos centróides.</strong></p>
<p>Os tipos de índice da série IVF permitem que o Milvus agrupe vetores em buckets utilizando um particionamento baseado em centroides. Cada centroide é incluído no índice na forma de incorporação de vetor bruto. Quando se dividem os vetores em 2 000 clusters, o consumo de memória pode ser calculado da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcular a memória utilizada pelas atribuições de clusters.</strong></p>
<p>Cada incorporação de vetor é atribuída a um cluster e armazenada como IDs inteiros. Para 2 000 clusters, basta um inteiro de 2 bytes. A utilização de memória pode ser calculada da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcular a compressão resultante da quantização.</strong></p>
<p>As variantes do IVF utilizam normalmente PQ e SQ8, e o consumo de memória pode ser estimado da seguinte forma:</p>
<ul>
<li><p>Utilizando PQ com 8 subquantizadores</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Utilizando o SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>A tabela seguinte apresenta o consumo de memória estimado com diferentes configurações:</p>
<p><table>
<tr>
<th><p>Configuração</p></th>
<th><p>Estimativa de memória</p></th>
<th><p>Memória total</p></th>
</tr>
<tr>
<td><p>IVF-PQ (sem refinamento)</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB</p></td>
<td><p>11,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10% de refinamento bruto</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB + 51,2 MB</p></td>
<td><p>62,2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (sem refinamento)</p></td>
<td><p>1,0 MB + 2,0 MB + 128 MB</p></td>
<td><p>131,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (vetores brutos completos)</p></td>
<td><p>1,0 MB + 2,0 MB + 512 MB</p></td>
<td><p>515,0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>Calcular a sobrecarga do refinamento.</strong></p>
<p>As variantes do IVF são frequentemente combinadas com um refinador para reclassificar os candidatos. Para uma pesquisa que recupere os 10 melhores resultados com uma taxa de expansão de 5, a sobrecarga de refinamento pode ser estimada da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">Utilização de memória do índice baseado em grafos<button data-href="#Graph-based-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>Os tipos de índice baseados em grafos, como o HNSW, requerem uma quantidade significativa de memória para armazenar tanto a estrutura do grafo como as incorporações vetoriais em bruto. Segue-se uma análise detalhada da memória consumida por 1 milhão de vetores de 128 dimensões indexados utilizando o tipo de índice HNSW.</p>
<ol>
<li><p><strong>Calcular a memória utilizada pela estrutura do grafo.</strong></p>
<p>Cada vetor no HNSW mantém ligações aos seus vizinhos. Com um grau do grafo (arestas por nó) de 32, a memória consumida pode ser calculada da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcular a memória utilizada pelas representações vetoriais em bruto.</strong></p>
<p>A memória consumida pelo armazenamento de vetores FP32 não comprimidos pode ser calculada da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>Ao utilizar o HNSW para indexar 1 milhão de representações vetoriais de 128 dimensões, a memória total em uso seria de <strong>128 MB (grafo) + 512 MB (vetores) = 640 MB</strong>.</p></li>
<li><p><strong>Calcule a compressão resultante da quantização.</strong></p>
<p>A quantização reduz o tamanho dos vetores. Por exemplo, a utilização de PQ com 8 subquantizadores (8 bytes por vetor) resulta numa compressão drástica. A memória consumida pelas representações vetoriais comprimidas pode ser calculada da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>Isto permite uma taxa de compressão de 64 vezes em comparação com as representações vetoriais não comprimidas, e a memória total utilizada pelo tipo de índice <strong>HNSWPQ</strong> seria de <strong>128 MB (grafo) + 8 MB (vetor comprimido) = 136 MB</strong>.</p></li>
<li><p><strong>Calcular a sobrecarga do refinamento.</strong></p>
<p>O refinamento, como a reclassificação com vetores não comprimidos, carrega temporariamente dados de alta precisão na memória. Para uma pesquisa que recupere os 10 primeiros resultados com uma taxa de expansão de 5, a sobrecarga de refinamento pode ser estimada da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">Outras considerações<button data-href="#Other-considerations" class="anchor-icon" translate="no">
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
    </button></h3><p>Embora os índices IVF e baseados em grafos otimizem a utilização da memória através da quantização, os ficheiros mapeados na memória (mmap) e o DiskANN respondem a cenários em que os conjuntos de dados excedem a memória de acesso aleatório (RAM) disponível.</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>O DiskANN é um índice baseado no grafo Vamana que liga pontos de dados para uma navegação eficiente durante a pesquisa, ao mesmo tempo que aplica PQ para reduzir o tamanho dos vetores e permitir o cálculo rápido e aproximado da distância entre vetores.</p>
<p>O grafo Vamana é armazenado em disco, o que permite ao DiskANN lidar com grandes conjuntos de dados que, de outra forma, seriam demasiado grandes para caberem na memória. Isto é particularmente útil para conjuntos de dados com milhares de milhões de pontos.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">Ficheiros mapeados na memória (mmap)</h4><p>O mapeamento de memória (mmap) permite o acesso direto à memória de ficheiros de grande dimensão no disco, permitindo que o Milvus armazene índices e dados tanto na memória como nos discos rígidos. Esta abordagem ajuda a otimizar as operações de E/S, reduzindo a sobrecarga das chamadas de E/S com base na frequência de acesso, expandindo assim a capacidade de armazenamento das coleções sem afetar significativamente o desempenho da pesquisa.</p>
<p>Mais especificamente, é possível configurar o Milvus para mapear na memória os dados brutos em determinados campos, em vez de os carregar na totalidade na memória. Desta forma, é possível obter acesso direto à memória desses campos sem se preocupar com problemas de memória e ampliar a capacidade da coleção.</p>
