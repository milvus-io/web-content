---
id: index-explained.md
title: Índice explicado
summary: >-
  Um índice é uma estrutura adicional construída sobre os dados. A sua estrutura
  interna depende do algoritmo de pesquisa do vizinho mais próximo aproximado em
  utilização. Um índice acelera a pesquisa, mas incorre em tempo de
  pré-processamento, espaço e RAM adicionais durante a pesquisa. Além disso, a
  utilização de um índice reduz normalmente a taxa de recuperação (embora o
  efeito seja insignificante, não deixa de ser importante). Portanto, este
  artigo explica como minimizar os custos da utilização de um índice e maximizar
  os benefícios.
---
<h1 id="Index-Explained" class="common-anchor-header">Índice explicado<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Um índice é uma estrutura adicional construída sobre os dados. A sua estrutura interna depende do algoritmo de pesquisa do vizinho mais próximo aproximado em utilização. Um índice acelera a pesquisa, mas incorre em tempo adicional de pré-processamento, espaço e RAM durante a pesquisa. Além disso, a utilização de um índice reduz normalmente a taxa de recuperação (embora o efeito seja insignificante, não deixa de ser importante). Portanto, este artigo explica como minimizar os custos da utilização de um índice e, ao mesmo tempo, maximizar os benefícios.</p>
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
    </button></h2><p>No Milvus, os índices são específicos dos campos, e os tipos de índices aplicáveis variam de acordo com os tipos de dados dos campos alvo. Sendo uma base de dados vetorial profissional, o Milvus concentra-se em melhorar o desempenho das pesquisas vectoriais e da filtragem escalar, razão pela qual oferece vários tipos de índices.</p>
<p>A tabela seguinte lista a relação de mapeamento entre os tipos de dados de campo e os tipos de índices aplicáveis.</p>
<table>
   <tr>
     <th><p>Tipo de dados de campo</p></th>
     <th><p>Tipos de índice aplicáveis</p></th>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT_VECTOR</p></li><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>HNSW</p></li><li><p>DISKANN</p></li></ul></td>
   </tr>
   <tr>
     <td><p>VECTOR_BINÁRIO</p></td>
     <td><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
   </tr>
   <tr>
     <td><p>VECTOR_FLOAT_ESPARSO</p></td>
     <td><p>ÍNDICE_INVERTIDO_ESPARSO</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTED (Recomendado)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li>BITMAP (Recomendado)</li><li>INVERTIDO</li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li>INVERTIDO</li><li>STL_SORT</li></ul></td>
   </tr>
   <tr>
     <td><ul><li>FLOAT</li><li>DOUBLE</li></ul></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elementos dos tipos BOOL, INT8/16/32/64 e VARCHAR)</sup></p></td>
     <td><p>BITMAP (recomendado)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elementos dos tipos BOOL, INT8/16/32/64, FLOAT, DOUBLE e VARCHAR)</sup></p></td>
     <td><p>INVERTIDO</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTIDO</p></td>
   </tr>
</table>
<p>Este artigo centra-se na forma de selecionar índices vectoriais adequados. Para campos escalares, pode sempre utilizar o tipo de índice recomendado.</p>
<p>A seleção de um tipo de índice adequado para uma pesquisa de vetor pode afetar significativamente o desempenho e a utilização de recursos. Ao escolher um tipo de índice para um campo de vetor, é essencial considerar vários factores, incluindo a estrutura de dados subjacente, a utilização de memória e os requisitos de desempenho.</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">Anatomia do índice de vetor<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Como demonstrado no diagrama abaixo, um tipo de índice em Milvus consiste em três componentes principais, nomeadamente <strong>a estrutura de dados</strong>, <strong>a quantização</strong> e <strong>o refinador</strong>. A quantização e o refinador são opcionais, mas são amplamente utilizados devido a um equilíbrio significativo entre ganhos e custos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" />
   </span> <span class="img-wrapper"> <span>Anatomia do Índice Vetorial</span> </span></p>
<p>Durante a criação do índice, o Milvus combina a estrutura de dados escolhida e o método de quantização para determinar uma <strong>taxa de expansão</strong> óptima. No momento da consulta, o sistema recupera <code translate="no">topK × expansion rate</code> os vectores candidatos, aplica o refinador para recalcular as distâncias com maior precisão e, finalmente, devolve os resultados mais exactos <code translate="no">topK</code>. Esta abordagem híbrida equilibra a velocidade e a precisão, restringindo o refinamento, que consome muitos recursos, a um subconjunto filtrado de candidatos.</p>
<h3 id="Data-structure" class="common-anchor-header">Estrutura de dados</h3><p>A estrutura de dados constitui a camada fundamental do índice. Os tipos comuns incluem:</p>
<ul>
<li><p><strong>Ficheiro invertido (IVF)</strong></p>
<p>Os tipos de índice da série IVF permitem que o Milvus agrupe vectores em grupos através de um particionamento baseado em centróides. Em geral, é seguro assumir que todos os vectores de um grupo estão provavelmente próximos do vetor de consulta se o centróide do grupo estiver próximo do vetor de consulta. Com base nesta premissa, o Milvus analisa apenas as incorporações de vectores nos baldes em que os centróides estão próximos do vetor de consulta, em vez de examinar todo o conjunto de dados. Esta estratégia reduz os custos computacionais, mantendo uma precisão aceitável.</p>
<p>Este tipo de estrutura de dados de índice é ideal para conjuntos de dados de grande escala que requerem um rendimento rápido.</p></li>
<li><p><strong>Estrutura baseada em grafos</strong></p>
<p>Uma estrutura de dados baseada em gráficos para pesquisa vetorial, como a Hierarchical Navigable Small World<a href="https://arxiv.org/abs/1603.09320">(HNSW</a>), constrói um gráfico em camadas em que cada vetor se liga aos seus vizinhos mais próximos. As consultas navegam nesta hierarquia, começando nas camadas superiores grosseiras e passando pelas camadas inferiores, permitindo uma complexidade de pesquisa eficiente em tempo logarítmico.</p>
<p>Este tipo de estrutura de dados de índice é excelente em espaços de elevada dimensão e em cenários que exigem consultas de baixa latência.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">Quantização</h3><p>A quantização reduz o espaço de memória e os custos computacionais através de uma representação mais grosseira:</p>
<ul>
<li><p><strong>A Quantização Escalar</strong> (por exemplo, <strong>SQ8</strong>) permite ao Milvus comprimir cada dimensão vetorial num único byte (8 bits), reduzindo a utilização de memória em 75% em comparação com os valores flutuantes de 32 bits, preservando uma precisão razoável.</p></li>
<li><p><strong>A Quantização de Produto</strong><strong>(PQ</strong>) permite ao Milvus dividir os vectores em subvectores e codificá-los utilizando o agrupamento baseado em livros de códigos. Isto permite atingir rácios de compressão mais elevados (por exemplo, 4-32x) à custa de uma redução marginal da recuperação, tornando-o adequado para ambientes com restrições de memória.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">Refinador</h3><p>A quantização é inerentemente com perdas. Para manter a taxa de recuperação, a quantização produz consistentemente mais candidatos top-K do que o necessário, permitindo que os refinadores usem maior precisão para selecionar ainda mais os resultados top-K desses candidatos, aumentando a taxa de recuperação.</p>
<p>Por exemplo, o refinador FP32 opera nos candidatos de resultados de pesquisa retornados pela quantização recalculando as distâncias usando a precisão FP32 em vez dos valores quantizados.</p>
<p>Isto é fundamental para aplicações que requerem um compromisso entre a eficiência e a precisão da pesquisa, como a pesquisa semântica ou os sistemas de recomendação, em que pequenas variações de distância afectam significativamente a qualidade dos resultados.</p>
<h3 id="Summary" class="common-anchor-header">Resumo</h3><p>Esta arquitetura em camadas - filtragem grosseira através de estruturas de dados, computação eficiente através de quantização e afinação da precisão através de refinamento - permite ao Milvus otimizar a relação precisão-desempenho de forma adaptativa.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">Compensações de desempenho<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao avaliar o desempenho, é crucial equilibrar o <strong>tempo de construção</strong>, <strong>a consulta por segundo (QPS)</strong> e <strong>a taxa de recuperação</strong>. As regras gerais são as seguintes:</p>
<ul>
<li><p><strong>Os tipos de índices baseados em grafos</strong> geralmente superam as <strong>variantes de IVF</strong> em termos de <strong>QPS</strong>.</p></li>
<li><p><strong>As variantes IVF</strong> adequam-se particularmente aos cenários com <strong>um topK grande (por exemplo, mais de 2.000)</strong>.</p></li>
<li><p><strong>O PQ</strong> oferece normalmente uma melhor taxa de recuperação com taxas de compressão semelhantes quando comparado com o <strong>SQ</strong>, embora este último ofereça um desempenho mais rápido.</p></li>
<li><p>A utilização de discos rígidos para parte do índice (como em <strong>DiskANN</strong>) ajuda a gerir grandes conjuntos de dados, mas também introduz potenciais estrangulamentos de IOPS.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">Capacidade</h3><p>A capacidade envolve normalmente a relação entre o tamanho dos dados e a RAM disponível. Ao lidar com a capacidade, considere o seguinte:</p>
<ul>
<li><p>Se um quarto dos seus dados brutos couber na memória, considere a DiskANN devido à sua latência estável.</p></li>
<li><p>Se todos os seus dados brutos couberem na memória, considere os tipos de índice baseados na memória e o mmap.</p></li>
<li><p>Pode utilizar os tipos de índice aplicados à quantização e o mmap para trocar a precisão pela capacidade máxima.</p></li>
</ul>
<div class="alert note">
<p>O mmap nem sempre é a solução. Quando a maioria dos seus dados está no disco, o DiskANN fornece uma melhor latência.</p>
</div>
<h3 id="Recall" class="common-anchor-header">Recolha</h3><p>A recuperação envolve normalmente o rácio de filtro, que se refere aos dados que são filtrados antes das pesquisas. Ao lidar com a recuperação, considere o seguinte:</p>
<ul>
<li><p>Se o rácio de filtragem for inferior a 85%, os tipos de índices baseados em grafos têm melhor desempenho do que as variantes de FIV.</p></li>
<li><p>Se o rácio de filtragem estiver entre 85% e 95%, utilize variantes de FIV.</p></li>
<li><p>Se o rácio de filtragem for superior a 98%, utilize a Força bruta (FLAT) para obter os resultados de pesquisa mais exactos.</p></li>
</ul>
<div class="alert note">
<p>Os itens acima nem sempre estão corretos. Aconselha-se a afinar a chamada com diferentes tipos de índice para determinar qual o tipo de índice que funciona.</p>
</div>
<h3 id="Performance" class="common-anchor-header">Desempenho</h3><p>O desempenho de uma pesquisa envolve normalmente o top-K, que se refere ao número de registos que a pesquisa devolve. Ao lidar com o desempenho, considere o seguinte:</p>
<ul>
<li><p>Para uma pesquisa com um top-K pequeno (por exemplo, 2.000) que requer uma alta taxa de recuperação, os tipos de índice baseados em gráficos superam as variantes de FIV.</p></li>
<li><p>Para uma pesquisa com um top-K grande (comparado com o número total de incorporações vectoriais), as variantes de FIV são uma melhor escolha do que os tipos de índices baseados em grafos.</p></li>
<li><p>Para uma pesquisa com um top-K de dimensão média e um rácio de filtragem elevado, as variantes FIV são a melhor escolha.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">Matriz de decisão: Escolher o tipo de índice mais adequado</h3><p>A tabela seguinte é uma matriz de decisão que pode ser consultada ao escolher um tipo de índice adequado.</p>
<table>
   <tr>
     <th><p>Cenário</p></th>
     <th><p>Índice recomendado</p></th>
     <th><p>Notas</p></th>
   </tr>
   <tr>
     <td><p>Os dados em bruto cabem na memória</p></td>
     <td><p>HNSW, IVF + Refinamento</p></td>
     <td><p>Utilizar HNSW para baixa<code translate="no">k</code>/recuperação elevada.</p></td>
   </tr>
   <tr>
     <td><p>Dados em bruto no disco, SSD</p></td>
     <td><p>DiskANN</p></td>
     <td><p>Ótimo para consultas sensíveis à latência.</p></td>
   </tr>
   <tr>
     <td><p>Dados em bruto no disco, RAM limitada</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>Equilibra o acesso à memória e ao disco.</p></td>
   </tr>
   <tr>
     <td><p>Rácio de filtragem elevado (&gt;95%)</p></td>
     <td><p>Força bruta (FLAT)</p></td>
     <td><p>Evita a sobrecarga de índices para conjuntos de candidatos pequenos.</p></td>
   </tr>
   <tr>
     <td><p>Grande <code translate="no">k</code> (≥1% do conjunto de dados)</p></td>
     <td><p>FIV</p></td>
     <td><p>A poda de clusters reduz a computação.</p></td>
   </tr>
   <tr>
     <td><p>Taxa de recuperação extremamente elevada (&gt;99%)</p></td>
     <td><p>Força bruta (FLAT) + GPUs</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">Estimativa de utilização de memória<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
<p>Esta secção centra-se no cálculo do consumo de memória de um tipo de índice específico e inclui muitos detalhes técnicos. Pode saltar esta secção com segurança se não estiver de acordo com os seus interesses.</p>
</div>
<p>O consumo de memória de um índice é influenciado pela sua estrutura de dados, taxa de compressão através da quantização e o refinador em uso. De um modo geral, os índices baseados em grafos têm tipicamente um maior consumo de memória devido à estrutura do grafo (por exemplo, <strong>HNSW</strong>), o que implica normalmente uma sobrecarga de espaço por vetor. Em contrapartida, o IVF e as suas variantes são mais eficientes em termos de memória, uma vez que se aplica menos sobrecarga de espaço por vetor. No entanto, técnicas avançadas como a <strong>DiskANN</strong> permitem que partes do índice, como o gráfico ou o refinador, residam no disco, reduzindo a carga de memória e mantendo o desempenho.</p>
<p>Especificamente, a utilização de memória de um índice pode ser calculada da seguinte forma:</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">Utilização de memória do índice IVF</h3><p>Os índices IVF equilibram a eficiência da memória com o desempenho da pesquisa, particionando os dados em clusters. Segue-se uma análise da memória utilizada por 1 milhão de vectores de 128 dimensões indexados com variantes de IVF.</p>
<ol>
<li><p><strong>Calcule a memória utilizada pelos centróides.</strong></p>
<p>Os tipos de índice da série IVF permitem que o Milvus agrupe vectores em grupos utilizando o particionamento baseado em centróides. Cada centróide é incluído no índice na incorporação de vectores em bruto. Quando divide os vectores em 2.000 clusters, a utilização de memória pode ser calculada da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcule a memória utilizada pelas atribuições de cluster.</strong></p>
<p>Cada incorporação de vetor é atribuída a um cluster e armazenada como IDs inteiros. Para 2000 clusters, é suficiente um número inteiro de 2 bytes. A utilização de memória pode ser calculada da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcular a compressão causada pela quantização.</strong></p>
<p>As variantes de FIV utilizam normalmente PQ e SQ8, e a utilização de memória pode ser estimada da seguinte forma:</p>
<ul>
<li><p>Usando PQ com 8 subquantizadores</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Utilização de SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>A tabela a seguir lista o uso estimado de memória com diferentes configurações:</p>
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
<td><p>IVF-PQ + 10% de refinamento em bruto</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB + 51,2 MB</p></td>
<td><p>62,2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (sem refinamento)</p></td>
<td><p>1,0 MB + 2,0 MB + 128 MB</p></td>
<td><p>131,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (vectores brutos completos)</p></td>
<td><p>1,0 MB + 2,0 MB + 512 MB</p></td>
<td><p>515,0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>Calcular a sobrecarga de refinamento.</strong></p>
<p>As variantes de FIV geralmente são combinadas com um refinador para reclassificar os candidatos. Para uma pesquisa que recupera os 10 principais resultados com uma taxa de expansão de 5, a sobrecarga de refinamento pode ser estimada da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">Utilização da memória do índice baseado em grafos</h3><p>Os tipos de índice baseados em grafos, como o HNSW, requerem uma memória significativa para armazenar a estrutura do grafo e as incorporações de vetor em bruto. Abaixo está uma análise detalhada da memória consumida por 1 milhão de vectores de 128 dimensões indexados utilizando o tipo de índice HNSW.</p>
<ol>
<li><p><strong>Calcule a memória utilizada pela estrutura do grafo.</strong></p>
<p>Cada vetor em HNSW mantém ligações aos seus vizinhos. Com um grau de grafo (arestas por nó) de 32, a memória consumida pode ser calculada da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcular a memória utilizada pelos embeddings vectoriais em bruto.</strong></p>
<p>A memória consumida pelo armazenamento de vectores FP32 não comprimidos pode ser calculada da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>Quando se utiliza o HNSW para indexar o 1 milhão de embeddings vectoriais de 128 dimensões, a memória total utilizada seria de <strong>128 MB (gráfico) + 512 MB (vectores) = 640 MB</strong>.</p></li>
<li><p><strong>Calcule a compressão causada pela quantização.</strong></p>
<p>A quantização reduz o tamanho do vetor. Por exemplo, a utilização de PQ com 8 subquantizadores (8 bytes por vetor) conduz a uma compressão drástica. A memória consumida pelos embeddings vectoriais comprimidos pode ser calculada da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>Isto alcança uma taxa de compressão de 64 vezes quando comparado com os embeddings de vetor em bruto, e a memória total utilizada pelo tipo de índice <strong>HNSWPQ</strong> seria <strong>128 MB (gráfico) + 8 MB (vetor comprimido) = 136 MB</strong>.</p></li>
<li><p><strong>Calcule a sobrecarga de refinamento.</strong></p>
<p>O refinamento, como a reclassificação com vetores brutos, carrega temporariamente dados de alta precisão na memória. Para uma pesquisa que recupera os 10 principais resultados com uma taxa de expansão de 5, a sobrecarga de refinamento pode ser estimada da seguinte forma:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">Outras considerações</h3><p>Enquanto o IVF e os índices baseados em grafos optimizam a utilização da memória através da quantização, os ficheiros mapeados na memória (mmap) e o DiskANN abordam cenários em que os conjuntos de dados excedem a memória de acesso aleatório (RAM) disponível.</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>O DiskANN é um índice baseado no grafo Vamana que liga pontos de dados para uma navegação eficiente durante a pesquisa, aplicando PQ para reduzir o tamanho dos vectores e permitir um cálculo rápido da distância aproximada entre vectores.</p>
<p>O grafo Vamana é armazenado no disco, o que permite ao DiskANN lidar com grandes conjuntos de dados que, de outra forma, seriam demasiado grandes para caber na memória. Isto é particularmente útil para conjuntos de dados de milhares de milhões de pontos.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">Ficheiros mapeados na memória (mmap)</h4><p>O mapeamento de memória (Mmap) permite o acesso direto à memória de grandes ficheiros no disco, permitindo ao Milvus armazenar índices e dados tanto na memória como nos discos rígidos. Esta abordagem ajuda a otimizar as operações de E/S, reduzindo a sobrecarga das chamadas de E/S com base na frequência de acesso, expandindo assim a capacidade de armazenamento das colecções sem afetar significativamente o desempenho da pesquisa.</p>
<p>Especificamente, é possível configurar o Milvus para mapear em memória os dados brutos em determinados campos, em vez de carregá-los totalmente na memória. Desta forma, pode obter acesso direto à memória dos campos sem se preocupar com problemas de memória e aumentar a capacidade da coleção.</p>
