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
    </button></h1><p>O AISAQ é um índice vetorial baseado em disco que estende <a href="/docs/pt/diskann.md">o DISKANN</a> para lidar com conjuntos de dados de milhares de milhões de escalas sem exceder os limites da RAM. Ao contrário do DISKANN, que mantém os vectores comprimidos na memória, o AISAQ armazena todos os dados no disco, oferecendo dois modos para equilibrar o desempenho e os custos de armazenamento.</p>
<p>Utilize o AISAQ quando o seu conjunto de dados vectoriais for demasiado grande para caber confortavelmente na RAM, ou quando precisar de otimizar os custos de infraestrutura trocando algum desempenho de consulta por requisitos de memória reduzidos.</p>
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
    </button></h2><p>O diagrama acima compara os layouts de armazenamento do <strong>DISKANN</strong>, <strong>AISAQ-Performance</strong> e <strong>AISAQ-Scale</strong>, mostrando como os dados (vetores brutos, listas de bordas e códigos PQ) são distribuídos entre a RAM e o disco.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
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
<p>Como os dados de PQ já estão armazenados em cache na DRAM, cada visita ao nó requer apenas uma E/S de disco, alcançando alta velocidade de consulta com uso moderado de memória.</p>
<p>Para uma explicação pormenorizada destes componentes e parâmetros, consulte <a href="/docs/pt/diskann.md">DISKANN</a>.</p>
<h3 id="AISAQ-modes" class="common-anchor-header">Modos do AISAQ<button data-href="#AISAQ-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>O AISAQ oferece duas estratégias de armazenamento baseadas em disco. A principal diferença é a forma como os dados comprimidos PQ são armazenados.</p>
<h4 id="AISAQ-performance" class="common-anchor-header">Desempenho do AISAQ</h4><p><strong>O AISAQ-performance</strong> consegue um armazenamento totalmente baseado em disco, movendo os dados PQ da memória para o disco e mantendo um baixo IOPS através da colocação e redundância de dados.</p>
<p>Neste modo:</p>
<ul>
<li><p>O vetor bruto de cada nó, a lista de arestas e os dados de PQ de seus vizinhos são armazenados juntos no disco.</p></li>
<li><p>Esse layout garante que visitar um nó (por exemplo, <em>vetor 0</em>) ainda requer apenas uma única E/S de disco.</p></li>
<li><p>No entanto, como os dados PQ são armazenados de forma redundante perto de vários nós, o tamanho do ficheiro de índice aumenta significativamente, consumindo mais espaço em disco.</p></li>
</ul>
<h4 id="AISAQ-scale" class="common-anchor-header">Escala AISAQ</h4><p><strong>A escala AISAQ</strong> concentra-se na <em>redução da utilização do espaço em disco</em>, mantendo todos os dados no disco.</p>
<p>Neste modo:</p>
<ul>
<li><p>Os dados PQ são armazenados separadamente no disco, sem redundância.</p></li>
<li><p>Este design minimiza o tamanho do índice, mas leva a mais operações de E/S durante a travessia do grafo.</p></li>
<li><p>Para reduzir o excesso de IOPS, o AISAQ introduz duas optimizações:</p>
<ul>
<li><p>Uma estratégia de reorganização que ordena os vectores PQ por prioridade para melhorar a localização dos dados.</p></li>
<li><p>Uma cache PQ na DRAM (pq_cache_size) que armazena em cache os dados PQ frequentemente acedidos.</p></li>
</ul></li>
</ul>
<p>Como resultado, o AISAQ-scale consegue uma melhor eficiência de armazenamento, mas um desempenho inferior ao do DISKANN ou do AISAQ-Performance.</p>
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
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-specific-parameters" class="common-anchor-header">Parâmetros específicos do AISAQ<button data-href="#AISAQ-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>O AISAQ herda muitos parâmetros da DISKANN. Para evitar redundância, apenas os parâmetros específicos do AISAQ são descritos a seguir. Para descrições de parâmetros partilhados, tais como <code translate="no">max_degree</code>, <code translate="no">pq_code_budget_gb_ratio</code>, <code translate="no">search_list_size</code>, e <code translate="no">beam_width_ratio</code>, consulte <a href="/docs/pt/diskann.md#DISKANN-params">DISKANN</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de afinação</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Número de vectores PQ armazenados em linha por nó. Determina a disposição do armazenamento (modo Desempenho vs. Escala).</p></td>
     <td><p><strong>Tipo</strong>: Inteiro</p><p><strong>Intervalo</strong>: [0, <em>max_degree</em>]</p><p><strong>Valor predefinido</strong>: <code translate="no">-1</code></p></td>
     <td><p>Quanto mais <code translate="no">inline_pq</code> se aproximar de <em>max_degree</em>, melhor tende a ser o desempenho, mas o tamanho do ficheiro de índice aumenta significativamente.</p><p>Quando <code translate="no">inline_pq</code> se aproxima de 0, o desempenho diminui e o tamanho do índice torna-se semelhante ao de DISKANN.</p><p><strong>Nota</strong>: É altamente dependente do desempenho do disco. Se o desempenho do disco for fraco, não é aconselhável ativar esta opção, uma vez que a largura de banda limitada do disco pode tornar-se um estrangulamento e degradar o desempenho geral.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Habilita a ordenação do vetor PQ por prioridade para melhorar a localidade de E/S.</p></td>
     <td><p><strong>Tipo</strong>: Booleano</p><p><strong>Intervalo</strong>: [true, false]</p><p><strong>Valor predefinido</strong>: <code translate="no">false</code></p></td>
     <td><p>Reduz a E/S da consulta, mas aumenta o tempo de criação do índice.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>Tamanho da cache PQ em DRAM (bytes).</p></td>
     <td><p><strong>Tipo</strong>: Inteiro</p><p><strong>Range</strong>: [0, 1&lt;&lt;30]</p><p><strong>Valor padrão</strong>: <code translate="no">0</code></p></td>
     <td><p>Uma cache maior melhora o desempenho da consulta, mas aumenta o uso de DRAM.</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Considerações<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>O desempenho do disco é importante. O AISAQ depende muito do IOPS do SSD; um armazenamento deficiente pode reduzir o QPS.</p></li>
<li><p>O modo de desempenho do AISAQ ≈ latência do DISKANN, mas pode exigir várias vezes mais espaço em disco.</p></li>
<li><p>O modo de escala do AISAQ é adequado para pesquisa offline ou cargas de trabalho de arquivamento de dados em que o QPS é menos crítico.</p></li>
</ul>
