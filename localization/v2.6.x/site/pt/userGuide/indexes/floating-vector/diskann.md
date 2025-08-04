---
id: diskann.md
title: DISKANN
summary: >-
  Em cenários de grande escala, em que os conjuntos de dados podem incluir
  biliões ou mesmo triliões de vectores, os métodos de indexação padrão na
  memória (por exemplo, HNSW, IVF_FLAT) muitas vezes não conseguem acompanhar o
  ritmo devido a limitações de memória. O DISKANN oferece uma abordagem baseada
  em disco que aborda esses desafios, mantendo alta precisão e velocidade de
  pesquisa quando o tamanho do conjunto de dados excede a RAM disponível.
---
<h1 id="DISKANN" class="common-anchor-header">DISKANN<button data-href="#DISKANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Em cenários de grande escala, onde os conjuntos de dados podem incluir biliões ou mesmo triliões de vectores, os métodos padrão de indexação na memória (por exemplo, <a href="/docs/pt/hnsw.md">HNSW</a>, <a href="/docs/pt/ivf-flat.md">IVF_FLAT</a>) muitas vezes não conseguem acompanhar o ritmo devido a limitações de memória. <strong>O DISKANN</strong> oferece uma abordagem baseada em disco que aborda esses desafios, mantendo alta precisão e velocidade de pesquisa quando o tamanho do conjunto de dados excede a RAM disponível.</p>
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
    </button></h2><p><strong>O DISKANN</strong> combina duas técnicas fundamentais para uma pesquisa vetorial eficiente:</p>
<ul>
<li><p><strong>Gráfico Vamana</strong> - Um índice <strong>baseado em disco</strong> e <strong>em gráficos</strong> que liga pontos de dados (ou vectores) para uma navegação eficiente durante a pesquisa.</p></li>
<li><p><strong>Quantização de produtos (PQ)</strong> - Um método de compressão <strong>na memória</strong> que reduz o tamanho dos vectores, permitindo cálculos rápidos de distância aproximada entre vectores.</p></li>
</ul>
<h3 id="Index-construction" class="common-anchor-header">Construção de índices</h3><h4 id="Vamana-graph" class="common-anchor-header">Gráfico Vamana</h4><p>O gráfico Vamana é fundamental para a estratégia baseada em disco da DISKANN. Pode lidar com conjuntos de dados muito grandes porque não precisa de residir totalmente na memória durante ou após a construção.</p>
<p>A figura seguinte mostra como é construído um gráfico Vamana.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann.png" alt="Diskann" class="doc-image" id="diskann" />
   </span> <span class="img-wrapper"> <span>Diskann</span> </span></p>
<ol>
<li><p><strong>Ligações aleatórias iniciais:</strong> Cada ponto de dados (vetor) é representado como um nó no grafo. Estes nós são inicialmente ligados de forma aleatória, formando uma rede densa. Normalmente, um nó começa com cerca de 500 arestas (ou ligações) para uma conetividade alargada.</p></li>
<li><p><strong>Refinamento para eficiência:</strong> O grafo aleatório inicial é submetido a um processo de otimização para o tornar mais eficiente para a pesquisa. Isso envolve duas etapas principais:</p>
<ul>
<li><p><strong>Poda de arestas redundantes:</strong> O algoritmo elimina ligações desnecessárias com base nas distâncias entre nós. Este passo dá prioridade a arestas de maior qualidade.</p>
<p>O parâmetro <code translate="no">max_degree</code> restringe o número máximo de arestas por nó. Um <code translate="no">max_degree</code> mais elevado resulta num gráfico mais denso, podendo encontrar vizinhos mais relevantes (maior recordação), mas também aumenta a utilização da memória e o tempo de pesquisa.</p></li>
<li><p><strong>Adicionar atalhos estratégicos:</strong> O Vamana introduz arestas de longo alcance, ligando pontos de dados que estão muito afastados no espaço vetorial. Estes atalhos permitem que as pesquisas saltem rapidamente através do gráfico, contornando nós intermédios e acelerando significativamente a navegação.</p>
<p>O parâmetro <code translate="no">search_list_size</code> determina a amplitude do processo de refinamento do gráfico. Um <code translate="no">search_list_size</code> mais elevado alarga a pesquisa de vizinhos durante a construção e pode melhorar a precisão final, mas aumenta o tempo de construção do índice.</p></li>
</ul></li>
</ol>
<p>Para saber mais sobre a afinação de parâmetros, consulte <a href="/docs/pt/diskann.md#DISKANN-params">Parâmetros DISKANN</a>.</p>
<h4 id="PQ" class="common-anchor-header">PQ</h4><p>DISKANN utiliza <strong>PQ</strong> para comprimir vectores de alta dimensão em representações mais pequenas<strong>(códigos PQ</strong>), que são armazenadas na memória para cálculos rápidos de distância aproximada.</p>
<p>O parâmetro <code translate="no">pq_code_budget_gb_ratio</code> gere o espaço de memória dedicado ao armazenamento destes códigos PQ. Representa um rácio entre o tamanho total dos vectores (em gigabytes) e o espaço atribuído para armazenar os códigos PQ. Pode calcular o orçamento real do código PQ (em gigabytes) com esta fórmula:</p>
<pre><code translate="no" class="language-plaintext">PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
<button class="copy-code-btn"></button></code></pre>
<p>onde:</p>
<ul>
<li><p><code translate="no">vec_field_size_gb</code> é o tamanho total dos vectores (em gigabytes).</p></li>
<li><p><code translate="no">pq_code_budget_gb_ratio</code> é um rácio definido pelo utilizador, que representa a fração do tamanho total dos dados reservada para os códigos PQ. Este parâmetro permite um compromisso entre a precisão da pesquisa e os recursos de memória. Para obter mais informações sobre o ajuste de parâmetros, consulte <a href="/docs/pt/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">Configurações do DISKANN</a>.</p></li>
</ul>
<p>Para obter pormenores técnicos sobre o método PQ subjacente, consulte <a href="/docs/pt/ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc">IVF_PQ</a>.</p>
<h3 id="Search-process" class="common-anchor-header">Processo de pesquisa</h3><p>Uma vez construído o índice (o gráfico Vamana no disco e os códigos PQ na memória), o DISKANN efectua pesquisas ANN da seguinte forma:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann-2.png" alt="Diskann 2" class="doc-image" id="diskann-2" />
   </span> <span class="img-wrapper"> <span>Diskann 2</span> </span></p>
<ol>
<li><p><strong>Consulta e ponto de entrada:</strong> É fornecido um vetor de consulta para localizar os seus vizinhos mais próximos. O DISKANN começa a partir de um ponto de entrada selecionado no gráfico Vamana, frequentemente um nó próximo do centróide global do conjunto de dados. O centróide global representa a média de todos os vectores, o que ajuda a minimizar a distância de deslocação através do grafo para encontrar os vizinhos desejados.</p></li>
<li><p><strong>Exploração de vizinhança:</strong> O algoritmo reúne potenciais candidatos a vizinhos (círculos a vermelho na figura) a partir das arestas do nó atual, utilizando códigos PQ na memória para aproximar as distâncias entre estes candidatos e o vetor de consulta. Estes potenciais candidatos a vizinhos são os nós diretamente ligados ao ponto de entrada selecionado através de arestas no gráfico Vamana.</p></li>
<li><p><strong>Seleção de nós para o cálculo exato da distância:</strong> A partir dos resultados aproximados, um subconjunto dos vizinhos mais promissores (círculos a verde na figura) é selecionado para avaliações precisas da distância utilizando os seus vectores originais não comprimidos. Isto requer a leitura de dados do disco, o que pode ser demorado. O DISKANN utiliza dois parâmetros para controlar este delicado equilíbrio entre precisão e velocidade:</p>
<ul>
<li><p><code translate="no">beam_width_ratio</code>: Uma ração que controla a amplitude da pesquisa, determinando quantos vizinhos candidatos são selecionados em paralelo para explorar os seus vizinhos. Um <code translate="no">beam_width_ratio</code> maior resulta numa exploração mais ampla, potencialmente conduzindo a uma maior precisão, mas também aumentando o custo computacional e a E/S do disco. A largura do feixe, ou o número de nós selecionados, é determinada utilizando a fórmula: <code translate="no">Beam width = Number of CPU cores * beam_width_ratio</code>.</p></li>
<li><p><code translate="no">search_cache_budget_gb_ratio</code>: A proporção de memória atribuída para armazenar em cache os dados do disco frequentemente acedidos. Este armazenamento em cache ajuda a minimizar a E/S do disco, tornando as pesquisas repetidas mais rápidas, uma vez que os dados já estão na memória.</p></li>
</ul>
<p>Para saber mais sobre a afinação de parâmetros, consulte <a href="/docs/pt/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">Configurações do DISKANN</a>.</p></li>
<li><p><strong>Exploração iterativa:</strong> A pesquisa refina iterativamente o conjunto de candidatos, efectuando repetidamente avaliações aproximadas (utilizando PQ) seguidas de verificações precisas (utilizando vectores originais do disco) até ser encontrado um número suficiente de vizinhos.</p></li>
</ol>
<h2 id="Enable-DISKANN-in-Milvus" class="common-anchor-header">Ativar DISKANN em Milvus<button data-href="#Enable-DISKANN-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Por padrão, <strong>DISKANN</strong> é desativado no Milvus para priorizar a velocidade dos índices na memória para conjuntos de dados que cabem confortavelmente na RAM. No entanto, se estiver a trabalhar com conjuntos de dados maciços ou quiser tirar partido da escalabilidade do <strong>DISKANN</strong> e da otimização de SSD, pode activá-lo facilmente.</p>
<p>Veja como habilitar o DISKANN no Milvus:</p>
<ol>
<li><p><strong>Atualizar o arquivo de configuração do Milvus</strong></p>
<ol>
<li><p>Localize o arquivo de configuração do Milvus<strong>.</strong> (Consulte a documentação do Milvus em Configuration para obter detalhes sobre como encontrar esse arquivo).</p></li>
<li><p>Encontre o parâmetro <code translate="no">queryNode.enableDisk</code> e defina seu valor para <code translate="no">true</code>:</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">queryNode:</span>
     <span class="hljs-attr">enableDisk:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Enables query nodes to load and search using the on-disk index</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol></li>
<li><p><strong>Otimizar o armazenamento para DISKANN</strong></p></li>
</ol>
<p>Para garantir o melhor desempenho com o DISKANN, é recomendável armazenar seus dados do Milvus em um SSD NVMe rápido. Veja como fazer isso para implantações do Milvus Standalone e do Cluster:</p>
<ul>
<li><p><strong>Milvus Standalone</strong></p>
<ul>
<li><p>Monte o diretório de dados do Milvus em um SSD NVMe dentro do contêiner do Milvus. Isso pode ser feito no arquivo <code translate="no">docker-compose.yml</code> ou usando outras ferramentas de gerenciamento de contêineres.</p></li>
<li><p>Por exemplo, se o seu SSD NVMe estiver montado em <code translate="no">/mnt/nvme</code>, atualize a secção <code translate="no">volumes</code>do seu <code translate="no">docker-compose.yml</code> da seguinte forma:</p></li>
</ul>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/mnt/nvme/volumes/milvus:/var/lib/milvus</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Cluster Milvus</strong></p>
<ul>
<li><p>Monte o diretório de dados do Milvus em um SSD NVMe nos contêineres QueryNode e IndexNode. Isso pode ser feito por meio da configuração da orquestração de contêineres.</p></li>
<li><p>Ao montar os dados em um SSD NVMe em ambos os tipos de nó, você garante velocidades rápidas de leitura e gravação para operações de pesquisa e indexação.</p></li>
</ul></li>
</ul>
<p>Depois de fazer essas alterações, reinicie a instância do Milvus para que as configurações tenham efeito. Agora, o Milvus aproveitará os recursos do DISKANN para lidar com grandes conjuntos de dados, fornecendo pesquisa vetorial eficiente e escalonável.</p>
<h2 id="Configure-DISKANN" class="common-anchor-header">Configurar DISKANN<button data-href="#Configure-DISKANN" class="anchor-icon" translate="no">
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
    </button></h2><p>Os parâmetros relacionados com DISKANN podem ser configurados através do seu ficheiro de configuração do Milvus (<code translate="no">milvus.yaml</code>):</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">DiskIndex:</span>
    <span class="hljs-attr">MaxDegree:</span> <span class="hljs-number">56</span>  <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
    <span class="hljs-attr">SearchListSize:</span> <span class="hljs-number">100</span>  <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">PQCodeBudgetGBRatio:</span> <span class="hljs-number">0.125</span>  <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
    <span class="hljs-attr">SearchCacheBudgetGBRatio:</span> <span class="hljs-number">0.1</span> <span class="hljs-comment"># Ratio of cached node numbers to raw data</span>
    <span class="hljs-attr">BeamWidthRatio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para mais pormenores sobre as descrições dos parâmetros, consulte <a href="/docs/pt/diskann.md#DISKANN-params">Parâmetros DISKANN</a>.</p>
<h2 id="DISKANN-params" class="common-anchor-header">Parâmetros DISKANN<button data-href="#DISKANN-params" class="anchor-icon" translate="no">
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
    </button></h2><p>O ajuste fino dos parâmetros do DISKANN permite-lhe adaptar o seu comportamento ao seu conjunto de dados específico e à carga de trabalho de pesquisa, atingindo o equilíbrio correto entre velocidade, precisão e utilização de memória.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de criação de índices</h3><p>Estes parâmetros influenciam a forma como o índice DISKANN é construído. O ajuste dos mesmos pode afetar o tamanho do índice, o tempo de construção e a qualidade da pesquisa.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">MaxDegree</code></p></td>
     <td><p>Controla o número máximo de conexões (bordas) que cada ponto de dados pode ter no gráfico Vamana.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Intervalo</strong>: [1, 512]</p>
<p><strong>Valor padrão</strong>: <code translate="no">56</code></p></td>
     <td><p>Valores mais altos criam gráficos mais densos, potencialmente aumentando a recuperação (encontrando resultados mais relevantes), mas também aumentando o uso de memória e o tempo de construção. 
 Na maioria dos casos, recomendamos que você defina um valor dentro deste intervalo: [10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">SearchListSize</code></p></td>
     <td><p>Durante a construção do índice, este parâmetro define o tamanho do conjunto de candidatos usado na pesquisa dos vizinhos mais próximos de cada nó. Para cada nó que está sendo adicionado ao gráfico, o algoritmo mantém uma lista dos <code translate="no">search_list_size</code> melhores candidatos encontrados até o momento. A procura de vizinhos pára quando esta lista já não pode ser melhorada. A partir deste conjunto final de candidatos, os <code translate="no">max_degree</code> melhores nós são selecionados para formar as arestas finais.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Range</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">100</code></p></td>
     <td><p>Um <code translate="no">search_list_size</code> maior aumenta a probabilidade de encontrar os verdadeiros vizinhos mais próximos para cada nó, o que pode levar a um gráfico de maior qualidade e a um melhor desempenho de pesquisa (recuperação). No entanto, isto tem o custo de um tempo de construção do índice significativamente mais longo. Deve ser sempre definido para um valor maior ou igual a <code translate="no">max_degree</code>.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">SearchCacheBudgetGBRatio</code></p></td>
     <td><p>Controla a quantidade de memória alocada para armazenar em cache as partes frequentemente acedidas do gráfico durante a construção do índice.</p></td>
     <td><p><strong>Tipo</strong>: Float <strong>Intervalo</strong>: [0.0, 0.3)</p>
<p><strong>Valor padrão</strong>: <code translate="no">0.10</code></p></td>
     <td><p>Um valor mais alto aloca mais memória para o cache, reduzindo significativamente a E/S do disco, mas consumindo mais memória do sistema. Um valor mais baixo utiliza menos memória para armazenamento em cache, aumentando potencialmente a necessidade de acesso ao disco. Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: [0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">PQCodeBudgetGBRatio</code></p></td>
     <td><p>Controla o tamanho dos códigos PQ (representações comprimidas de pontos de dados) em comparação com o tamanho dos dados não comprimidos.</p></td>
     <td><p><strong>Tipo</strong>: Float <strong>Intervalo</strong>: (0,0, 0,25)</p>
<p><strong>Valor predefinido</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Um rácio mais elevado conduz a resultados de pesquisa mais precisos ao atribuir uma maior proporção de memória para códigos PQ, armazenando efetivamente mais informações sobre os vectores originais. Um rácio mais baixo reduz a utilização de memória mas sacrifica potencialmente a precisão, uma vez que os códigos PQ mais pequenos retêm menos informação. Esta abordagem é adequada para cenários em que as restrições de memória são uma preocupação, permitindo potencialmente a indexação de conjuntos de dados maiores.</p>
<p>Na maioria dos casos, recomendamos que defina um valor dentro deste intervalo: (0,0625, 0,25]</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parâmetros de pesquisa específicos do índice</h3><p>Estes parâmetros influenciam a forma como o DISKANN efectua as pesquisas. O seu ajuste pode afetar a velocidade de pesquisa, a latência e a utilização de recursos.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">BeamWidthRatio</code></p></td>
     <td><p>Controla o grau de paralelismo durante a pesquisa, determinando o número máximo de solicitações de E/S de disco paralelas em relação ao número de núcleos de CPU disponíveis.</p></td>
     <td><p><strong>Tipo</strong>: Float <strong>Intervalo</strong>: [1, max(128 / número da CPU, 16)]</p>
<p><strong>Valor padrão</strong>: <code translate="no">4.0</code></p></td>
     <td><p>Valores mais altos aumentam o paralelismo, o que pode acelerar a pesquisa em sistemas com CPUs e SSDs potentes. Na maioria dos casos, recomendamos que você defina um valor dentro deste intervalo: [1.0, 4.0].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">SearchListSize</code></p></td>
     <td><p>Durante uma operação de pesquisa, esse parâmetro determina o tamanho do pool de candidatos que o algoritmo mantém à medida que percorre o gráfico. Um valor maior aumenta as hipóteses de encontrar os verdadeiros vizinhos mais próximos (maior recuperação), mas também aumenta a latência da pesquisa.</p></td>
     <td><p><strong>Tipo</strong>: Integer <strong>Intervalo</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valor predefinido</strong>: <code translate="no">100</code></p></td>
     <td><p>Para obter um bom equilíbrio entre desempenho e exatidão, recomenda-se que este valor seja igual ou ligeiramente superior ao número de resultados que pretende obter (top_k).</p></td>
   </tr>
</table>
