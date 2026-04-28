---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  O AISAQ é um índice vetorial baseado em disco que amplia o DISKANN para lidar
  com conjuntos de dados em escala de bilhões sem exceder os limites de RAM. Ao
  contrário do DISKANN, que mantém os vectores comprimidos na memória, o AISAQ
  armazena todos os dados no disco - oferecendo dois modos para equilibrar o
  desempenho e os custos de armazenamento.
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>O AISAQ é um índice vetorial baseado em disco que alarga <a href="/docs/pt/diskann.md">o DISKANN</a> para lidar com conjuntos de dados à escala de milhares de milhões com uma pegada DRAM mínima.</p>
<p>Ao contrário do DISKANN, que mantém os vectores comprimidos na memória, o AISAQ foi concebido com uma "Arquitetura DRAM quase nula", o que significa manter todas as estruturas de dados em SSD.</p>
<p>O AISAQ permite executar bases de dados de escala ultraelevada utilizando servidores padrão, oferecendo modos de funcionamento para equilibrar o desempenho e os custos de armazenamento.</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">Como funciona o AISAQ<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>O diagrama acima compara as disposições de armazenamento do <strong>DISKANN</strong>, do <strong>AISAQ-Performance</strong> e do <strong>AISAQ-Scale</strong>, mostrando como os dados (vectores brutos, listas de arestas e códigos PQ) são distribuídos entre a RAM e o disco.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>Aisaq Vs Diskann</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">Fundação: Recapitulação do DISKANN<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>No DISKANN, os vectores brutos e as listas de arestas são armazenados no disco, enquanto os vectores comprimidos PQ são mantidos na memória (DRAM).</p>
<p>Quando o DISKANN atravessa para um nó (por exemplo, <em>vetor 0</em>):</p>
<ul>
<li><p>Carrega o vetor bruto<strong>(raw_vector_0</strong>) e a sua lista de arestas<strong>(edgelist_0</strong>) a partir do disco.</p></li>
<li><p>A lista de arestas indica quais vizinhos devem ser visitados em seguida (nós 2, 3 e 5 neste exemplo).</p></li>
<li><p>O vetor bruto é utilizado para calcular a distância exacta ao vetor de consulta para classificação.</p></li>
<li><p>Os dados PQ na memória são usados para filtragem de distância aproximada para guiar a próxima travessia.</p></li>
</ul>
<p>Como os dados PQ já estão armazenados em cache na DRAM, cada visita ao nó requer apenas uma E/S de disco, alcançando alta velocidade de consulta com uso moderado de memória.</p>
<p>Para uma explicação detalhada destes componentes e parâmetros, consulte <a href="/docs/pt/diskann.md">DISKANN</a>.</p>
<h3 id="AISAQ-Operation-Modes" class="common-anchor-header">Modos de funcionamento do AISAQ<button data-href="#AISAQ-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h3><p>O AISAQ oferece dois modos de operação para atender a dois casos de uso distintos:</p>
<p>Modo de desempenho: optimizado para aplicações que requerem baixa latência e alta taxa de transferência em escala, como a pesquisa semântica online.</p>
<p>Modo de escala: optimizado para aplicações com restrições de latência mais relaxadas, como RAG e pesquisa semântica offline, ao mesmo tempo que permite a expansão rentável de conjuntos de dados para uma escala ultra-alta.</p>
<h4 id="AISAQ-performance-mode" class="common-anchor-header">Modo de desempenho do AISAQ</h4><p><strong>O AISAQ-performance</strong> alcança uma "pegada DRAM quase nula", movendo os dados PQ da memória para o disco, mantendo baixos IOPS através da colocação e redundância de dados.</p>
<ul>
<li><p>O vetor bruto de cada nó, a lista de arestas e os dados PQ dos seus vizinhos são armazenados em conjunto no disco.</p></li>
<li><p>Esse layout garante que visitar um nó (por exemplo, vetor 0) ainda requer apenas uma única E/S de disco.</p></li>
<li><p>Uma vez que os dados PQ são armazenados de forma redundante perto de vários nós, o tamanho do ficheiro de índice aumenta significativamente, consumindo mais espaço em disco.</p></li>
</ul>
<h4 id="AISAQ-scale-mode" class="common-anchor-header">Modo AISAQ-scale</h4><p><strong>O AISAQ-scale</strong> concentra-se na redução da utilização do espaço em disco, satisfazendo simultaneamente os requisitos de desempenho das suas aplicações alvo.</p>
<p>Neste modo:</p>
<ul>
<li><p>Os dados PQ são armazenados separadamente no disco, sem redundância.</p></li>
<li><p>Este design minimiza o tamanho do índice, mas leva a mais operações de E/S durante a travessia do gráfico.</p></li>
<li><p>Para reduzir o excesso de IOPS, o AISAQ introduz duas optimizações:</p>
<ul>
<li><p>Um algoritmo de reorganização que ordena os vectores PQ por prioridade para melhorar a localização dos dados.</p></li>
<li><p>Uma cache PQ na DRAM (pq_read_page_cache_size) que armazena em cache os dados PQ acedidos frequentemente.</p></li>
</ul></li>
</ul>
<h2 id="Example-configuration" class="common-anchor-header">Exemplo de configuração<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Controls the maximum number of connections (edges) each data point can have in the Vamana graph</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges</span>
      <span class="hljs-attr">inline_pq:</span> <span class="hljs-number">-1</span> <span class="hljs-comment"># Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</span>
      <span class="hljs-attr">rearrange:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode)</span>
      <span class="hljs-attr">num_entry_points:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate entry points to optimize search entry-point selection</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
      <span class="hljs-attr">disk_pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.25</span> <span class="hljs-comment"># Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data</span>
      <span class="hljs-attr">pq_cache_size:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># Controls the amount of DRAM to be used for caching frequently accessed index nodes. This cache is loaded during index load and used during search to reduce IOs</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">search_list:</span> <span class="hljs-number">16</span> <span class="hljs-comment"># During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency</span>
      <span class="hljs-attr">beamwidth:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes</span>
      <span class="hljs-attr">vectors_beamwidth:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode)</span>
      <span class="hljs-attr">pq_read_page_cache_size:</span> <span class="hljs-number">5242880</span> <span class="hljs-string">(5MiB)</span> <span class="hljs-comment"># PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true). The PQ read cache memory is reused across all AISAQ segments</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-parameters" class="common-anchor-header">Parâmetros do AISAQ<button data-href="#AISAQ-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>O AISAQ herda alguns parâmetros do DISKANN - <code translate="no">max_degree</code>, <code translate="no">search_list_size</code>, e <code translate="no">pq_code_budget_gb_ratio</code>.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de construção de índices<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Estes parâmetros influenciam a forma como o índice AISAQ é construído. O seu ajuste pode afetar o tamanho do índice, o tempo de construção e a qualidade da pesquisa.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Valor Intervalo</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Controla o número máximo de ligações (arestas) que cada ponto de dados pode ter no gráfico Vamana.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro</p><p><strong>Intervalo</strong>: [1, 512]</p><p><strong>Valor padrão</strong>: <code translate="no">56</code></p></td>
     <td><p>Valores mais altos criam gráficos mais densos, potencialmente aumentando a recuperação (encontrando resultados mais relevantes), mas também aumentando o uso de memória e o tempo de construção. Na maioria dos casos, recomendamos que você defina um valor dentro deste intervalo: [10, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>Durante a construção do índice, este parâmetro define o tamanho do conjunto de candidatos usado na pesquisa dos vizinhos mais próximos de cada nó. Para cada nó que está sendo adicionado ao gráfico, o algoritmo mantém uma lista dos melhores candidatos encontrados até o momento. A procura de vizinhos pára quando esta lista já não pode ser melhorada. A partir deste conjunto final de candidatos, os nós de grau máximo superior são selecionados para formar as arestas finais.</p></td>
     <td><p><strong>Tipo</strong>: Integer</p><p><strong>Range</strong>: [1, 512]</p><p><strong>Valor padrão</strong>: <code translate="no">100</code></p></td>
     <td><p>Um tamanho maior de search_list_size aumenta a probabilidade de encontrar os verdadeiros vizinhos mais próximos para cada nó, o que pode levar a um gráfico de maior qualidade e melhor desempenho de pesquisa (recall). No entanto, isto tem o custo de um tempo de construção do índice significativamente mais longo. Deve ser sempre definido para um valor maior ou igual a max_degree.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Número de vectores PQ armazenados em linha por nó de índice (lidos quando o nó é acedido, para reduzir o IO)</p></td>
     <td><p><strong>Tipo</strong>: Integer</p><p><strong>Intervalo</strong>: [0, <em>max_degree</em>]</p><p><strong>Valor predefinido</strong>: <code translate="no">-1</code></p></td>
     <td><p>Valores mais altos de <code translate="no">inline_pq</code> melhoram o desempenho, mas aumentam o espaço em disco.</p><p>Defina <code translate="no">inline_pq</code>=0 para AISAQ em modo de escala.</p><p>Defina <code translate="no">inline_pq</code>=-1 para preencher automaticamente qualquer espaço não utilizado no índice com vectores PQ para otimização adicional do AISAQ em modo de escala.</p><p>Defina <code translate="no">inline_pq</code><em>=max_degree</em> para o AISAQ no modo de desempenho.</p><p><code translate="no">inline_pq</code> As definições entre 0 e <em>max_degree</em> permitem um equilíbrio ajustável entre o desempenho e o consumo de espaço em disco.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Reorganizar a estrutura de dados dos vectores PQ para melhorar a localidade dos dados e reduzir os acessos ao disco durante a pesquisa (ignorado no modo de desempenho).</p></td>
     <td><p><strong>Tipo</strong>: Booleano</p><p><strong>Intervalo</strong>: [true, false]</p><p><strong>Valor predefinido</strong>: <code translate="no">true</code></p></td>
     <td><p>Quando verdadeiro, reduz os IOs durante a pesquisa com apenas um pequeno aumento na memória e no tempo de construção do índice.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_entry_points</code></p></td>
     <td><p>Número de pontos de entrada candidatos para otimizar a seleção do ponto de entrada da pesquisa.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro</p><p><strong>Intervalo</strong>: [0, 1000]</p><p><strong>Valor predefinido</strong>: <code translate="no">100</code></p></td>
     <td><p>Valores elevados podem reduzir o tempo de pesquisa ao iniciar a pesquisa a partir de um ponto de entrada mais próximo.</p><p>Defina valores mais elevados para segmentos grandes (por exemplo, para vectores de 10M e acima do valor de utilização de 1000).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>Controla o tamanho dos códigos PQ (representações comprimidas dos pontos de dados) em comparação com o tamanho dos dados não comprimidos.</p></td>
     <td><p><strong>Tipo</strong>: Flutuante</p><p><strong>Intervalo</strong>: (0,0, 0,25]</p><p><strong>Valor predefinido</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Um rácio mais elevado conduz a resultados de pesquisa mais precisos, armazenando efetivamente mais informações sobre os vectores originais, mas aumenta a complexidade computacional durante a pesquisa.</p><p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: (0,0417, 0,25].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disk_pq_code_budget_gb_ratio</code></p></td>
     <td><p>Controla o tamanho dos códigos PQ dos vectores de alta precisão armazenados no índice (utilizados para reclassificação), em comparação com o tamanho dos dados não comprimidos.</p></td>
     <td><p><strong>Tipo</strong>: Float</p><p><strong>Intervalo</strong>: [0, 0.25]</p><p><strong>Valor predefinido</strong>: <code translate="no">0.25</code></p></td>
     <td><p>Com o valor predefinido de 0,25, os vectores serão quantizados para 25% do seu tamanho original (compressão 4×), reduzindo o espaço ocupado em disco com um impacto relativamente mínimo na precisão.</p><p>Defina o valor de 0 para armazenar vectores de precisão total no índice do disco para nova classificação. Um valor maior oferece uma taxa de recuperação mais elevada, mas aumenta a utilização do disco.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>Tamanho da cache de vectores PQ em DRAM (bytes). A cache de vectores PQ é carregada durante o carregamento do índice e utilizada durante a pesquisa para reduzir as IOs (ignorada no modo de desempenho).</p></td>
     <td><p><strong>Tipo</strong>: Integer</p><p><strong>Range</strong>: [0, 1073741824]</p><p><strong>Valor padrão</strong>: <code translate="no">0</code></p></td>
     <td><p>Uma cache maior melhora o desempenho da consulta, mas aumenta o uso de DRAM.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>Controla a quantidade de DRAM a ser utilizada para colocar em cache os nós de índice frequentemente acedidos</p><p>Esta cache é carregada durante o carregamento do índice e utilizada durante a pesquisa para reduzir as IOs.</p></td>
     <td><p><strong>Tipo</strong>: Float</p><p><strong>Range</strong>: [0.0, 0.3)</p><p><strong>Valor predefinido</strong>: <code translate="no">0</code></p></td>
     <td><p>Um valor mais alto aloca mais memória para cache, reduzindo IOs de disco, mas consumindo mais memória do sistema. Um valor mais baixo utiliza menos memória para cache, aumentando potencialmente a necessidade de acesso ao disco.</p></td>
   </tr>
</table>
<h3 id="Index-search-params" class="common-anchor-header">Parâmetros de pesquisa de índices<button data-href="#Index-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Estes parâmetros influenciam a forma como o AISAQ efectua as pesquisas. Ajustá-los pode afetar a velocidade de pesquisa, a latência e a utilização de recursos.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>Durante uma operação de pesquisa, esse parâmetro determina o tamanho do pool de candidatos que o algoritmo mantém à medida que percorre o gráfico. Um valor maior aumenta as hipóteses de encontrar os verdadeiros vizinhos mais próximos (maior recuperação), mas também aumenta a latência da pesquisa.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro</p><p><strong>Intervalo</strong>: [topk, int32_max]</p><p><strong>Valor predefinido</strong>: <code translate="no">16</code></p></td>
     <td><p>Para obter um bom equilíbrio entre desempenho e precisão, é recomendável definir este valor como sendo igual ou ligeiramente superior ao número de resultados que pretende obter (top_k).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">beamwidth</code></p></td>
     <td><p>Controla o grau de paralelismo durante a pesquisa, determinando o número máximo de pedidos de E/S de disco paralelos para ler os nós de índice.</p></td>
     <td><p><strong>Tipo</strong>: Integer</p><p><strong>Intervalo</strong>: [1, 16]</p><p><strong>Valor padrão</strong>: <code translate="no">8</code></p></td>
     <td><p>Valores mais altos aumentam o paralelismo, o que pode acelerar a pesquisa em sistemas com CPUs e SSDs potentes. No entanto, defini-lo como muito alto pode levar a uma contenção excessiva de recursos.</p><p>Na maioria dos casos, recomendamos que você defina um valor de 2.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectors_beamwidth</code></p></td>
     <td><p>Controla o grau de paralelismo durante a pesquisa, determinando o número máximo de pedidos de E/S de disco paralelos para ler grupos de vectores PQ vizinhos (ignorado no modo de desempenho).</p></td>
     <td><p><strong>Tipo</strong>: Inteiro</p><p><strong>Intervalo</strong>: [1, 4] deve ser &lt;= <em>beamwidth</em></p><p><strong>Valor padrão</strong>: <code translate="no">1</code></p></td>
     <td><p>Valores mais altos aumentam o paralelismo, o que pode acelerar a pesquisa em sistemas com CPUs e SSDs potentes. No entanto, defini-lo muito alto pode levar a uma contenção excessiva de recursos, pois cada grupo de vetores PQ vizinhos pode conter até vetores max_degree.</p><p>Na maioria dos casos, recomendamos que você defina um valor de 1.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_read_page_cache_size</code></p></td>
     <td><p>Tamanho do cache de leitura PQ em DRAM por thread de pesquisa (bytes). Armazena em cache as páginas de dados frequentemente acedidas que contêm vectores PQ (ignorados no modo de desempenho e aplicáveis apenas quando rearranjar é verdadeiro).</p><p>A memória cache de leitura PQ é reutilizada em todos os segmentos AISAQ.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro</p><p><strong>Intervalo</strong>: [0, 33554432]</p><p><strong>Valor padrão</strong>: <code translate="no">5242880 (5MiB)</code></p></td>
     <td><p>Um cache maior melhora o desempenho da consulta, mas aumenta o uso de DRAM.</p><p>Os valores recomendados variam entre 2 MiB para segmentos pequenos (1 M de vectores), 5 MiB para segmentos médios (50 M de vectores) e 10 MiB para segmentos grandes (250 M de vectores).</p></td>
   </tr>
</table>
