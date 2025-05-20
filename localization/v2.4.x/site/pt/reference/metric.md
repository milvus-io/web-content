---
id: metric.md
summary: >-
  O Milvus suporta uma variedade de métricas de semelhança, incluindo a
  distância euclidiana, o produto interno, Jaccard, etc.
title: Métricas de similaridade
---
<h1 id="Similarity-Metrics" class="common-anchor-header">Métricas de similaridade<button data-href="#Similarity-Metrics" class="anchor-icon" translate="no">
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
    </button></h1><p>No Milvus, as métricas de semelhança são utilizadas para medir as semelhanças entre vectores. A escolha de uma boa métrica de distância ajuda a melhorar significativamente o desempenho da classificação e do agrupamento.</p>
<p>A tabela seguinte mostra como estas métricas de similaridade amplamente utilizadas se adaptam a várias formas de dados de entrada e índices Milvus. Atualmente, o Milvus suporta vários tipos de dados, incluindo incrustações de vírgula flutuante (frequentemente conhecidas como vectores de vírgula flutuante ou vectores densos), incrustações binárias (também conhecidas como vectores binários) e incrustações esparsas (também conhecidas como vectores esparsos).</p>
<div class="filter">
 <a href="#floating">Integrações de vírgula flutuante</a> <a href="#binary">Integrações binárias</a> <a href="#sparse">Integrações esparsas</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Tipos de métricas</th>
    <th class="tg-0pky">Tipos de índices</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Distância euclidiana (L2)</li><li>Produto interno (IP)</li><li>Semelhança de cosseno (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>FLAT</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Tipos de métricas</th>
    <th class="tg-0pky">Tipos de índices</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Jaccard</li><li>Hamming</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Tipos métricos</th>
    <th class="tg-0pky">Tipos de índice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>ÍNDICE_ESPARSO_INVERTIDO</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Euclidean-distance-L2" class="common-anchor-header">Distância euclidiana (L2)</h3><p>Essencialmente, a distância euclidiana mede o comprimento de um segmento que liga 2 pontos.</p>
<p>A fórmula para a distância euclidiana é a seguinte:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/euclidean_metric.png" alt="euclidean" class="doc-image" id="euclidean" />
   </span> <span class="img-wrapper"> <span>euclidiana</span> </span></p>
<p>em que <strong>a</strong> = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>) e <strong>b</strong> = (<sub>b0</sub>, <sub>b0</sub>,..., <sub>bn-1</sub>) são dois pontos num espaço euclidiano n-dimensional</p>
<p>É a métrica de distância mais comummente utilizada e é muito útil quando os dados são contínuos.</p>
<div class="alert note">
O Milvus só calcula o valor antes de aplicar a raiz quadrada quando a distância euclidiana é escolhida como métrica de distância.</div>
<h3 id="Inner-product-IP" class="common-anchor-header">Produto interno (IP)</h3><p>A distância IP entre duas incorporações vectoriais é definida da seguinte forma</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IP_formula.png" alt="ip" class="doc-image" id="ip" />
   </span> <span class="img-wrapper"> <span>ip</span> </span></p>
<p>O PI é mais útil se precisar de comparar dados não normalizados ou quando se preocupa com a magnitude e o ângulo.</p>
<div class="alert note">
<p>Se aplicar a métrica de distância IP a incorporações normalizadas, o resultado será equivalente ao cálculo da semelhança de cosseno entre as incorporações.</p>
</div>
<p>Suponha que X' é normalizado a partir da incorporação X:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalize_formula.png" alt="normalize" class="doc-image" id="normalize" />
   </span> <span class="img-wrapper"> <span>normalizar</span> </span></p>
<p>A correlação entre os dois embeddings é a seguinte:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalization_formula.png" alt="normalization" class="doc-image" id="normalization" />
   </span> <span class="img-wrapper"> <span>normalização</span> </span></p>
<h3 id="Cosine-Similarity" class="common-anchor-header">Similaridade de cosseno</h3><p>A semelhança do cosseno utiliza o cosseno do ângulo entre dois conjuntos de vectores para medir a sua semelhança. Pode pensar nos dois conjuntos de vectores como dois segmentos de linha que começam na mesma origem ([0,0,...]) mas apontam em direcções diferentes.</p>
<p>Para calcular a semelhança de cosseno entre dois conjuntos de vectores <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> e <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong>, utilize a seguinte fórmula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cosine_similarity.png" alt="cosine_similarity" class="doc-image" id="cosine_similarity" />
   </span> <span class="img-wrapper"> <span>coseno_similaridade</span> </span></p>
<p>A semelhança de cosseno está sempre no intervalo <strong>[-1, 1]</strong>. Por exemplo, dois vectores proporcionais têm uma semelhança de cosseno de <strong>1</strong>, dois vectores ortogonais têm uma semelhança de <strong>0</strong> e dois vectores opostos têm uma semelhança de <strong>-1</strong>. Quanto maior for o cosseno, menor é o ângulo entre dois vectores, indicando que esses dois vectores são mais semelhantes entre si.</p>
<p>Ao subtrair a semelhança de cosseno de 1, obtém-se a distância de cosseno entre dois vectores.</p>
<h3 id="Jaccard-distance" class="common-anchor-header">Distância de Jaccard</h3><p>O coeficiente de semelhança de Jaccard mede a semelhança entre dois conjuntos de amostras e é definido como a cardinalidade da intersecção dos conjuntos definidos dividida pela cardinalidade da união dos mesmos. Só pode ser aplicado a conjuntos de amostras finitos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_coeff.png" alt="Jaccard similarity coefficient" class="doc-image" id="jaccard-similarity-coefficient" />
   </span> <span class="img-wrapper"> <span>Coeficiente de semelhança de Jaccard</span> </span></p>
<p>A distância de Jaccard mede a dissemelhança entre conjuntos de dados e é obtida subtraindo o coeficiente de semelhança de Jaccard de 1. Para variáveis binárias, a distância de Jaccard é equivalente ao coeficiente de Tanimoto.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_dist.png" alt="Jaccard distance" class="doc-image" id="jaccard-distance" />
   </span> <span class="img-wrapper"> <span>Distância de Jaccard</span> </span></p>
<h3 id="Hamming-distance" class="common-anchor-header">Distância de Hamming</h3><p>A distância de Hamming mede cadeias de dados binárias. A distância entre duas cadeias de igual comprimento é o número de posições de bits em que os bits são diferentes.</p>
<p>Por exemplo, suponha que existem duas cadeias de caracteres, 1101 1001 e 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Como isso contém dois 1s, a distância de Hamming, d (11011001, 10011101) = 2.</p>
<h3 id="Structural-Similarity" class="common-anchor-header">Similaridade Estrutural</h3><p>Quando uma estrutura química ocorre como parte de uma estrutura química maior, a primeira é chamada de subestrutura e a segunda é chamada de superestrutura. Por exemplo, o etanol é uma subestrutura do ácido acético, e o ácido acético é uma superestrutura do etanol.</p>
<p>A semelhança estrutural é utilizada para determinar se duas fórmulas químicas são semelhantes entre si no sentido em que uma é a superestrutura ou a subestrutura da outra.</p>
<p>Para determinar se A é uma superestrutura de B, utilize a seguinte fórmula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>superestrutura</span> </span></p>
<p>Onde:</p>
<ul>
<li>A é a representação binária de uma fórmula química a ser recuperada</li>
<li>B é a representação binária de uma fórmula química na base de dados</li>
</ul>
<p>Se o resultado for <code translate="no">0</code>, <strong>A</strong> não é uma superestrutura de <strong>B</strong>. Caso contrário, o resultado é o inverso.</p>
<p>Para determinar se A é uma subestrutura de B, utilize a seguinte fórmula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>subestrutura</span> </span></p>
<p>Onde:</p>
<ul>
<li>A é a representação binária de uma fórmula química a ser recuperada</li>
<li>B é a representação binária de uma fórmula química na base de dados</li>
</ul>
<p>Se o resultado for <code translate="no">0</code>, <strong>A</strong> não é uma subestrutura de <strong>B</strong>. Caso contrário, o resultado é o inverso.</p>
<h2 id="FAQ" class="common-anchor-header">PERGUNTAS FREQUENTES<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">Porque é que o resultado top1 de uma pesquisa vetorial não é o próprio vetor de pesquisa, se o tipo de métrica for o produto interno?</font></summary>Isto ocorre se não tiver normalizado os vectores ao utilizar o produto interno como métrica de distância.</details>
<details>
<summary><font color="#4fc4f9">O que é normalização? Porque é que a normalização é necessária?</font></summary></p>
<p>A normalização refere-se ao processo de conversão de uma incorporação (vetor) para que a sua norma seja igual a 1. Se utilizar o produto interno para calcular as semelhanças das incorporações, tem de normalizar as incorporações. Após a normalização, o produto interno é igual à similaridade de cosseno.</p>
<p>
Consulte <a href="https://en.wikipedia.org/wiki/Unit_vector">a Wikipédia</a> para obter mais informações.</p>
</details>
<details>
<summary><font color="#4fc4f9">Por que obtenho resultados diferentes usando a distância euclidiana (L2) e o produto interno (PI) como métrica de distância?</font></summary>Verifique se os vetores estão normalizados. Se não estiverem, é necessário normalizar os vectores primeiro. Teoricamente, as semelhanças obtidas por L2 são diferentes das semelhanças obtidas por IP, se os vectores não estiverem normalizados.</details>
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
<li>Saiba mais sobre os <a href="/docs/pt/v2.4.x/index.md">tipos de índices</a> suportados no Milvus.</li>
</ul>
