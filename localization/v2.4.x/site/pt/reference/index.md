---
id: index.md
related_key: index
summary: Mecanismo de indexação em Milvus.
title: Índice na memória
---
<h1 id="In-memory-Index" class="common-anchor-header">Índice na memória<button data-href="#In-memory-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico lista os vários tipos de índices em memória que o Milvus suporta, os cenários que cada um deles melhor se adequa e os parâmetros que os utilizadores podem configurar para obter um melhor desempenho de pesquisa. Para índices no disco, veja <strong><a href="/docs/pt/v2.4.x/disk_index.md">Índice no disco</a></strong>.</p>
<p>A indexação é o processo de organização eficiente dos dados e desempenha um papel importante na utilidade da pesquisa por similaridade, acelerando drasticamente as consultas demoradas em grandes conjuntos de dados.</p>
<p>Para melhorar o desempenho da consulta, é possível <a href="/docs/pt/v2.4.x/index-vector-fields.md">especificar um tipo de índice</a> para cada campo de vetor.</p>
<div class="alert note">
Atualmente, um campo vetorial apenas suporta um tipo de índice. O Milvus elimina automaticamente o índice antigo quando muda o tipo de índice.</div>
<h2 id="ANNS-vector-indexes" class="common-anchor-header">Índices vectoriais ANNS<button data-href="#ANNS-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>A maioria dos tipos de índices vectoriais suportados pelo Milvus utiliza algoritmos de pesquisa de vizinhos mais próximos aproximados (ANNS). Em comparação com a recuperação exacta, que normalmente consome muito tempo, a ideia central do ANNS já não se limita a devolver o resultado mais exato, mas apenas a procurar os vizinhos do alvo. A ANNS melhora a eficiência da recuperação, sacrificando a exatidão dentro de um intervalo aceitável.</p>
<p>De acordo com os métodos de implementação, o índice vetorial ANNS pode ser classificado em quatro tipos: Baseado em árvore, baseado em gráfico, baseado em hash e baseado em quantização.</p>
<h2 id="Indexes-supported-in-Milvus" class="common-anchor-header">Índices suportados no Milvus<button data-href="#Indexes-supported-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus suporta vários tipos de índices, que são categorizados pelo tipo de incorporação de vectores que tratam: <strong>incorporação</strong> de vírgula flutuante (também conhecida como vectores de vírgula flutuante ou vectores densos), <strong>incorporação binária</strong> (também conhecida como vectores binários) e <strong>incorporação esparsa</strong> (também conhecida como vectores esparsos).</p>
<div class="filter">
 <a href="#floating">Incorporações de vírgula flutuante</a> <a href="#binary">Incorporações binárias</a> <a href="#sparse">Incorporações esparsas</a></div>
<div class="filter-floating">
<h3 id="Indexes-for-floating-point-embeddings" class="common-anchor-header">Índices para incorporações de vírgula flutuante</h3><p>Para as incorporações de vírgula flutuante de 128 dimensões (vectores), o armazenamento que ocupam é 128 * o tamanho da vírgula flutuante = 512 bytes. E as <a href="/docs/pt/v2.4.x/metric.md">métricas de distância</a> utilizadas para as incorporações de vírgula flutuante são a distância euclidiana (<code translate="no">L2</code>) e o produto interno (<code translate="no">IP</code>).</p>
<p>Estes tipos de índices incluem <code translate="no">FLAT</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_PQ</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, e <code translate="no">SCANN</code> para pesquisas ANN baseadas em CPU.</p>
</div>
<div class="filter-binary">
<h3 id="Indexes-for-binary-embeddings" class="common-anchor-header">Índices para incrustações binárias</h3><p>Para as incorporações binárias de 128 dimensões, o armazenamento que ocupam é de 128 / 8 = 16 bytes. E as métricas de distância utilizadas para as incrustações binárias são <code translate="no">JACCARD</code> e <code translate="no">HAMMING</code>.</p>
<p>Este tipo de índices inclui <code translate="no">BIN_FLAT</code> e <code translate="no">BIN_IVF_FLAT</code>.</p>
</div>
<div class="filter-sparse">
<h3 id="Indexes-for-sparse-embeddings" class="common-anchor-header">Índices para embeddings esparsos</h3><p>A métrica de distância suportada para as incorporações esparsas é apenas <code translate="no">IP</code>.</p>
<p>Os tipos de índices incluem <code translate="no">SPARSE_INVERTED_INDEX</code> e <code translate="no">SPARSE_WAND</code>.</p>
</div>
<div class="filter-floating table-wrapper">
<table id="floating">
<thead>
  <tr>
    <th>Índice suportado</th>
    <th>Classificação</th>
    <th>Cenário</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>FLAT</td>
    <td>N/A</td>
    <td>
      <ul>
        <li>Conjunto de dados relativamente pequeno</li>
        <li>Requer uma taxa de recuperação de 100</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_FLAT</td>
    <td>Índice baseado na quantização</td>
    <td>
      <ul>
        <li>Consulta de alta velocidade</li>
        <li>Requer uma taxa de recuperação tão elevada quanto possível</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>Índice baseado na quantificação</td>
    <td>
      <ul>
        <li>Consulta de alta velocidade</li>
        <li>Recursos de memória limitados</li>
        <li>Aceita um pequeno compromisso na taxa de recuperação</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>IVF_PQ</td>
    <td>Índice baseado na quantificação</td>
    <td>
      <ul>
        <li>Consulta a muito alta velocidade</li>
        <li>Recursos de memória limitados</li>
        <li>Aceita um compromisso substancial na taxa de recuperação</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW</td>
    <td>Índice baseado em gráficos</td>
    <td>
      <ul>
        <li>Consulta de muito alta velocidade</li>
        <li>Requer uma taxa de recuperação tão elevada quanto possível</li>
        <li>Grandes recursos de memória</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SCANN</td>
    <td>Índice baseado na quantização</td>
    <td>
      <ul>
        <li>Consulta a muito alta velocidade</li>
        <li>Requer uma taxa de recuperação tão elevada quanto possível</li>
        <li>Grandes recursos de memória</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper">
<table id="binary">
<thead>
  <tr>
    <th>Índice suportado</th>
    <th>Classificação</th>
    <th>Cenário</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>BIN_FLAT</td>
    <td>Índice baseado na quantização</td>
    <td><ul>
      <li>Depende de conjuntos de dados relativamente pequenos.</li>
      <li>Requer uma precisão perfeita.</li>
      <li>Não se aplica compressão.</li>
      <li>Garante resultados de pesquisa exactos.</li>
    </ul></td>
  </tr>
  <tr>
    <td>BIN_IVF_FLAT</td>
    <td>Índice baseado na quantização</td>
    <td><ul>
      <li>Consulta de alta velocidade</li>
      <li>Requer uma taxa de recuperação tão elevada quanto possível</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper">
<table id="sparse">
<thead>
  <tr>
    <th>Índice suportado</th>
    <th>Classificação</th>
    <th>Cenário</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>ÍNDICE_INVERTIDO_ESPARSO</td>
    <td>Índice invertido</td>
    <td><ul>
      <li>Depende de conjuntos de dados relativamente pequenos.</li>
      <li>Requer uma taxa de recuperação de 100%.</li>
    </ul></td>
  </tr>
  <tr>
    <td>SPARSE_WAND</td>
    <td>Índice invertido</td>
    <td><ul>
      <li>Algoritmo<a href="https://dl.acm.org/doi/10.1145/956863.956944">Weak-AND</a> acelerado</li>
      <li>Pode obter uma melhoria significativa da velocidade, sacrificando apenas uma pequena quantidade de recuperação.</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-floating">
<h3 id="FLAT" class="common-anchor-header">FLAT</h3><p>Para aplicações de pesquisa de semelhança de vectores que requerem uma precisão perfeita e dependem de conjuntos de dados relativamente pequenos (à escala de um milhão), o índice FLAT é uma boa escolha. O FLAT não comprime os vectores e é o único índice que pode garantir resultados de pesquisa exactos. Os resultados do FLAT também podem ser usados como um ponto de comparação para resultados produzidos por outros índices que têm menos de 100% de recuperação.</p>
<p>O FLAT é exato porque adopta uma abordagem exaustiva à pesquisa, o que significa que, para cada consulta, a entrada de destino é comparada com todos os conjuntos de vectores de um conjunto de dados. Isso torna o FLAT o índice mais lento da nossa lista e pouco adequado para consultar dados vetoriais maciços. Não são necessários parâmetros para o índice FLAT no Milvus, e a sua utilização não necessita de formação de dados.</p>
<ul>
<li><p>Parâmetros de pesquisa</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Distância</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[Opcional] A métrica de distância escolhida.</td><td>Ver <a href="/docs/pt/v2.4.x/metric.md">Métricas suportadas</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT</h3><p>O IVF_FLAT divide os dados vectoriais em <code translate="no">nlist</code> unidades de clusters e, em seguida, compara as distâncias entre o vetor de entrada alvo e o centro de cada cluster. Dependendo do número de clusters que o sistema está definido para consultar (<code translate="no">nprobe</code>), os resultados da pesquisa de semelhança são devolvidos com base em comparações entre a entrada de destino e os vectores apenas no(s) cluster(s) mais semelhante(s) - reduzindo drasticamente o tempo de consulta.</p>
<p>Ao ajustar <code translate="no">nprobe</code>, é possível encontrar um equilíbrio ideal entre precisão e velocidade para um determinado cenário. Os resultados do <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">teste de desempenho do IVF_FLAT</a> demonstram que o tempo de consulta aumenta drasticamente à medida que o número de vectores de entrada alvo (<code translate="no">nq</code>) e o número de clusters a pesquisar (<code translate="no">nprobe</code>) aumentam.</p>
<p>O IVF_FLAT é o índice IVF mais básico, e os dados codificados armazenados em cada unidade são consistentes com os dados originais.</p>
<ul>
<li><p>Parâmetros de construção do índice</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th><th>Valor por defeito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de cluster</td><td>[1, 65536]</td><td>128</td></tr>
</tbody>
</table>
</li>
<li><p>Parâmetros de pesquisa</p>
<ul>
<li><p>Pesquisa comum</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição do parâmetro</th><th>Gama</th><th>Valor por defeito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Pesquisa de intervalo</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição do parâmetro</th><th>Intervalo</th><th>Valor por defeito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Número máximo de contentores que não apresentam quaisquer resultados de pesquisa.<br/>Este é um parâmetro de pesquisa de intervalo e termina o processo de pesquisa quando o número de contentores vazios consecutivos atinge o valor especificado.<br/>O aumento deste valor pode melhorar a taxa de recuperação à custa de um aumento do tempo de pesquisa.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFSQ8" class="common-anchor-header">IVF_SQ8</h3><p>O IVF_FLAT não executa qualquer compressão, pelo que os ficheiros de índice que produz têm aproximadamente o mesmo tamanho que os dados vectoriais originais, brutos e não indexados. Por exemplo, se o conjunto de dados 1B SIFT original tiver 476 GB, os seus ficheiros de índice IVF_FLAT serão ligeiramente mais pequenos (~470 GB). Carregar todos os ficheiros de índice na memória consumirá 470 GB de armazenamento.</p>
<p>Quando os recursos de memória do disco, CPU ou GPU são limitados, o IVF_SQ8 é uma opção melhor do que o IVF_FLAT. Este tipo de índice pode converter cada FLOAT (4 bytes) em UINT8 (1 byte) efectuando a Quantização Escalar (SQ). Isto reduz o consumo de memória do disco, CPU e GPU em 70-75%. Para o conjunto de dados 1B SIFT, os ficheiros de índice IVF_SQ8 requerem apenas 140 GB de armazenamento.</p>
<ul>
<li><p>Parâmetros de construção de índices</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de cluster</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>Parâmetros de pesquisa</p>
<ul>
<li><p>Pesquisa comum</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição do parâmetro</th><th>Intervalo</th><th>Valor por defeito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Pesquisa de intervalo</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição do parâmetro</th><th>Intervalo</th><th>Valor por defeito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Número máximo de contentores que não apresentam quaisquer resultados de pesquisa.<br/>Este é um parâmetro de pesquisa de intervalo e termina o processo de pesquisa quando o número de contentores vazios consecutivos atinge o valor especificado.<br/>O aumento deste valor pode melhorar a taxa de recuperação à custa de um aumento do tempo de pesquisa.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFPQ" class="common-anchor-header">IVF_PQ</h3><p><code translate="no">PQ</code> (Product Quantization) decompõe uniformemente o espaço vetorial de alta dimensão original em produtos cartesianos de <code translate="no">m</code> espaços vectoriais de baixa dimensão e quantifica depois os espaços vectoriais de baixa dimensão decompostos. Em vez de calcular as distâncias entre o vetor-alvo e o centro de todas as unidades, a quantização do produto permite o cálculo das distâncias entre o vetor-alvo e o centro de agrupamento de cada espaço de baixa dimensão e reduz consideravelmente a complexidade temporal e espacial do algoritmo.</p>
<p>O IVF_PQ efectua o agrupamento de índices IVF antes de quantificar o produto de vectores. O seu ficheiro de índice é ainda mais pequeno do que o IVF_SQ8, mas também causa uma perda de precisão durante a pesquisa de vectores.</p>
<div class="alert note">
<p>Os parâmetros de construção do índice e os parâmetros de pesquisa variam consoante a distribuição Milvus. Selecione primeiro a sua distribuição Milvus.</p>
</div>
<ul>
<li><p>Parâmetros de construção do índice</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de agrupamento</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">m</code></td><td>Número de factores de quantização do produto</td><td><code translate="no">dim mod m == 0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Opcional] Número de bits em que cada vetor de baixa dimensão é armazenado.</td><td>[1, 64] (8 por defeito)</td></tr>
</tbody>
</table>
</li>
<li><p>Parâmetros de pesquisa</p>
<ul>
<li><p>Pesquisa comum</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th><th>Valor por defeito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Pesquisa de intervalo</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição do parâmetro</th><th>Intervalo</th><th>Valor por defeito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Número máximo de contentores que não apresentam quaisquer resultados de pesquisa.<br/>Este é um parâmetro de pesquisa de intervalo e termina o processo de pesquisa quando o número de contentores vazios consecutivos atinge o valor especificado.<br/>O aumento deste valor pode melhorar a taxa de recuperação à custa de um aumento do tempo de pesquisa.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="SCANN" class="common-anchor-header">SCANN</h3><p>O ScaNN (Scalable Nearest Neighbors) é semelhante ao IVF_PQ em termos de agrupamento de vectores e quantização de produtos. A sua diferença reside nos pormenores de implementação da quantização do produto e na utilização de SIMD (Single-Instruction / Multi-data) para um cálculo eficiente.</p>
<ul>
<li><p>Parâmetros de construção do índice</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de cluster</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">with_raw_data</code></td><td>Se os dados brutos devem ser incluídos no índice</td><td><code translate="no">True</code> ou <code translate="no">False</code>. A predefinição é <code translate="no">True</code>.</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>Ao contrário do IVF_PQ, os valores predefinidos aplicam-se a <code translate="no">m</code> e <code translate="no">nbits</code> para um desempenho optimizado.</p>
  </div>
</li>
<li><p>Parâmetros de pesquisa</p>
<ul>
<li><p>Pesquisa comum</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th><th>Valor por defeito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td></td></tr>
<tr><td><code translate="no">reorder_k</code></td><td>Número de unidades candidatas a consultar</td><td>[<code translate="no">top_k</code>, ∞]</td><td><code translate="no">top_k</code></td></tr>
</tbody>
</table>
</li>
<li><p>Pesquisa de intervalos</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th><th>Valor predefinido</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Número máximo de contentores que não apresentam quaisquer resultados de pesquisa.<br/>Este é um parâmetro de pesquisa de intervalo e termina o processo de pesquisa quando o número de contentores vazios consecutivos atinge o valor especificado.<br/>O aumento deste valor pode melhorar a taxa de recuperação à custa de um aumento do tempo de pesquisa.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>O HNSW (Hierarchical Navigable Small World Graph) é um algoritmo de indexação baseado em grafos. Constrói uma estrutura de navegação multicamada para uma imagem de acordo com determinadas regras. Nesta estrutura, as camadas superiores são mais esparsas e as distâncias entre os nós são maiores; as camadas inferiores são mais densas e as distâncias entre os nós são menores. A pesquisa começa na camada superior, encontra o nó mais próximo do alvo nessa camada e, em seguida, entra na camada seguinte para iniciar outra pesquisa. Após várias iterações, pode aproximar-se rapidamente da posição do alvo.</p>
<p>Para melhorar o desempenho, o HNSW limita o grau máximo dos nós em cada camada do gráfico a <code translate="no">M</code>. Além disso, pode utilizar <code translate="no">efConstruction</code> (ao construir o índice) ou <code translate="no">ef</code> (ao pesquisar alvos) para especificar um intervalo de pesquisa.</p>
<ul>
<li><p>Parâmetros de construção de índices</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M define o número máximo de ligações de saída no gráfico. Um M mais elevado leva a uma maior precisão/tempo de execução com ef/efConstruction fixos.</td><td>[2, 2048]</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction controla o compromisso entre a velocidade de pesquisa do índice e a velocidade de construção. Aumentar o parâmetro efConstruction pode melhorar a qualidade do índice, mas também tende a aumentar o tempo de indexação.</td><td>[1, int_max]</td></tr>
</tbody>
</table>
</li>
<li><p>Parâmetros de pesquisa</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parâmetro que controla o compromisso tempo/precisão da consulta. Um valor mais elevado em <code translate="no">ef</code> conduz a uma pesquisa mais exacta mas mais lenta.</td><td>[<code translate="no">top_k</code>, int_max]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary">
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT</h3><p>Este índice é exatamente o mesmo que FLAT, exceto que só pode ser utilizado para incorporações binárias.</p>
<p>Para aplicações de pesquisa de semelhança de vectores que requerem uma precisão perfeita e dependem de conjuntos de dados relativamente pequenos (à escala de um milhão), o índice BIN_FLAT é uma boa escolha. O BIN_FLAT não comprime os vectores e é o único índice que pode garantir resultados de pesquisa exactos. Os resultados do BIN_FLAT também podem ser usados como um ponto de comparação para resultados produzidos por outros índices que têm menos de 100% de recuperação.</p>
<p>O BIN_FLAT é exato porque adopta uma abordagem exaustiva à pesquisa, o que significa que, para cada consulta, a entrada de destino é comparada com vectores num conjunto de dados. Isso torna o BIN_FLAT o índice mais lento da nossa lista e pouco adequado para consultar dados vetoriais maciços. Não há parâmetros para o índice BIN_FLAT no Milvus, e usá-lo não requer treinamento de dados ou armazenamento adicional.</p>
<ul>
<li><p>Parâmetros de pesquisa</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição do parâmetro</th><th>Distância</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[Opcional] A métrica de distância escolhida.</td><td>Ver <a href="/docs/pt/v2.4.x/metric.md">Métricas suportadas</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="BINIVFFLAT" class="common-anchor-header">BIN_IVF_FLAT</h3><p>Este índice é exatamente o mesmo que IVF_FLAT, exceto que só pode ser utilizado para embeddings binários.</p>
<p>BIN_IVF_FLAT divide os dados do vetor em <code translate="no">nlist</code> unidades de cluster e, em seguida, compara as distâncias entre o vetor de entrada alvo e o centro de cada cluster. Dependendo do número de clusters que o sistema está definido para consultar (<code translate="no">nprobe</code>), os resultados da pesquisa de semelhança são devolvidos com base em comparações entre a entrada de destino e os vectores apenas no(s) cluster(s) mais semelhante(s) - reduzindo drasticamente o tempo de consulta.</p>
<p>Ajustando <code translate="no">nprobe</code>, pode ser encontrado um equilíbrio ideal entre precisão e velocidade para um determinado cenário. O tempo de consulta aumenta drasticamente à medida que o número de vectores de entrada alvo (<code translate="no">nq</code>) e o número de clusters a pesquisar (<code translate="no">nprobe</code>) aumentam.</p>
<p>BIN_IVF_FLAT é o índice BIN_IVF mais básico, e os dados codificados armazenados em cada unidade são consistentes com os dados originais.</p>
<ul>
<li><p>Parâmetros de construção do índice</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de agrupamento</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>Parâmetros de pesquisa</p>
<ul>
<li><p>Pesquisa comum</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição do parâmetro</th><th>Intervalo</th><th>Valor por defeito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Pesquisa de intervalo</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição do parâmetro</th><th>Intervalo</th><th>Valor por defeito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Número máximo de contentores que não apresentam quaisquer resultados de pesquisa.<br/>Este é um parâmetro de pesquisa de intervalo e termina o processo de pesquisa quando o número de contentores vazios consecutivos atinge o valor especificado.<br/>O aumento deste valor pode melhorar a taxa de recuperação à custa de um aumento do tempo de pesquisa.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
</div>
<div class="filter-sparse">
<h3 id="SPARSEINVERTEDINDEX" class="common-anchor-header">ÍNDICE_INVERTIDO_ESPARSO</h3><p>Cada dimensão mantém uma lista de vectores que têm um valor diferente de zero nessa dimensão. Durante a pesquisa, Milvus itera através de cada dimensão do vetor de consulta e calcula as pontuações dos vectores que têm valores diferentes de zero nessas dimensões.</p>
<ul>
<li><p>Parâmetros de construção de índices</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_build</code></td><td>A proporção de valores de vectores pequenos que são excluídos durante o processo de indexação. Esta opção permite um ajuste fino do processo de indexação, fazendo um compromisso entre eficiência e exatidão ao ignorar valores pequenos ao construir o índice.</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
<li><p>Parâmetros de pesquisa</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>A proporção de valores vectoriais pequenos que são excluídos durante o processo de pesquisa. Esta opção permite o ajuste fino do processo de pesquisa, especificando a proporção dos valores mais pequenos no vetor de consulta a ignorar. Ela ajuda a equilibrar a precisão e o desempenho da pesquisa. Quanto mais pequeno for o valor definido para <code translate="no">drop_ratio_search</code>, menos estes valores pequenos contribuem para a pontuação final. Ao ignorar alguns valores pequenos, o desempenho da pesquisa pode ser melhorado com um impacto mínimo na precisão.</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="SPARSEWAND" class="common-anchor-header">VARINHA_ESPECÍFICA</h3><p>Este índice partilha semelhanças com <code translate="no">SPARSE_INVERTED_INDEX</code>, embora utilize o algoritmo <a href="https://dl.acm.org/doi/10.1145/956863.956944">Weak-AND</a> para reduzir ainda mais o número de avaliações da distância IP completa durante o processo de pesquisa.</p>
<p>Com base nos nossos testes, <code translate="no">SPARSE_WAND</code> supera geralmente os outros métodos em termos de velocidade. No entanto, o seu desempenho pode deteriorar-se rapidamente à medida que a densidade dos vectores aumenta. Para resolver este problema, a introdução de um <code translate="no">drop_ratio_search</code> diferente de zero pode melhorar significativamente o desempenho, incorrendo apenas numa perda mínima de precisão. Para mais informações, consulte <a href="/docs/pt/v2.4.x/sparse_vector.md">Vetor esparso</a>.</p>
<ul>
<li><p>Parâmetros de construção de índices</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_build</code></td><td>A proporção de valores de vetor pequenos que são excluídos durante o processo de indexação. Esta opção permite um ajuste fino do processo de indexação, fazendo um compromisso entre eficiência e exatidão ao ignorar valores pequenos ao construir o índice.</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
<li><p>Parâmetros de pesquisa</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>A proporção de valores vectoriais pequenos que são excluídos durante o processo de pesquisa. Esta opção permite o ajuste fino do processo de pesquisa, especificando a proporção dos valores mais pequenos no vetor de consulta a ignorar. Ela ajuda a equilibrar a precisão e o desempenho da pesquisa. Quanto mais pequeno for o valor definido para <code translate="no">drop_ratio_search</code>, menos estes valores pequenos contribuem para a pontuação final. Ao ignorar alguns valores pequenos, o desempenho da pesquisa pode ser melhorado com um impacto mínimo na precisão.</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<summary><font color="#4fc4f9">Qual é a diferença entre o índice FLAT e o índice IVF_FLAT?</font></summary></p>
<p>O índice IVF_FLAT divide um espaço vetorial em <code translate="no">nlist</code> clusters. Se mantiver o valor predefinido de <code translate="no">nlist</code> como 16384, o Milvus compara as distâncias entre o vetor alvo e os centros de todos os 16384 clusters para obter <code translate="no">nprobe</code> os clusters mais próximos. Em seguida, o Milvus compara as distâncias entre o vetor alvo e os vectores nos clusters selecionados para obter os vectores mais próximos. Ao contrário do IVF_FLAT, o FLAT compara diretamente as distâncias entre o vetor alvo e cada um dos vectores.</p>
<p>
Por conseguinte, quando o número total de vectores é aproximadamente igual a <code translate="no">nlist</code>, o IVF_FLAT e o FLAT têm pouca diferença na forma de cálculo necessária e no desempenho da pesquisa. Mas à medida que o número de vectores aumenta para duas, três ou n vezes <code translate="no">nlist</code>, o índice IVF_FLAT começa a apresentar vantagens cada vez maiores.</p>
<p>
Para mais informações, consulte <a href="https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212">Como escolher um índice no Milvus</a>.</p>
</details>
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
<li>Saiba mais sobre as <a href="/docs/pt/v2.4.x/metric.md">métricas de similaridade</a> suportadas no Milvus.</li>
</ul>
