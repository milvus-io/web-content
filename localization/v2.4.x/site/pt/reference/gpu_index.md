---
id: gpu_index.md
related_key: gpu_index
summary: Mecanismo de índice GPU em Milvus.
title: Índice GPU
---
<h1 id="GPU-Index" class="common-anchor-header">Índice GPU<button data-href="#GPU-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus suporta vários tipos de índices GPU para acelerar o desempenho e a eficiência da pesquisa, especialmente em cenários de alto rendimento e alta recordação. Este tópico fornece uma visão geral dos tipos de índice GPU suportados pelo Milvus, seus casos de uso adequados e caraterísticas de desempenho. Para obter informações sobre a criação de índices com GPU, consulte <a href="/docs/pt/v2.4.x/index-with-gpu.md">Índice com GPU</a>.</p>
<p>É importante observar que o uso de um índice de GPU pode não reduzir necessariamente a latência em comparação com o uso de um índice de CPU. Se você quiser maximizar totalmente a taxa de transferência, precisará de uma pressão de solicitação extremamente alta ou de um grande número de vetores de consulta.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/gpu_index.png" alt="performance" class="doc-image" id="performance" />
   </span> <span class="img-wrapper"> <span>desempenho</span> </span></p>
<p>O suporte GPU do Milvus é contribuído pela equipa Nvidia <a href="https://rapids.ai/">RAPIDS</a>. A seguir estão os tipos de índices GPU atualmente suportados pelo Milvus.</p>
<h2 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_CAGRA é um índice baseado em grafos optimizado para GPUs. A utilização de GPUs de grau de inferência para executar a versão GPU do Milvus pode ser mais rentável em comparação com a utilização de GPUs de grau de treino dispendiosas.</p>
<ul>
<li><p>Parâmetros de construção do índice</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Valor predefinido</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">intermediate_graph_degree</code></td><td>Afecta a recuperação e o tempo de construção ao determinar o grau do gráfico antes da poda. Os valores recomendados são <code translate="no">32</code> ou <code translate="no">64</code>.</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">graph_degree</code></td><td>Afeta o desempenho da pesquisa e a recuperação ao definir o grau do gráfico após a poda. Uma diferença maior entre esses dois graus resulta em um tempo de construção mais longo. O seu valor tem de ser inferior ao valor de <strong>intermediate_graph_degree</strong>.</td><td><code translate="no">64</code></td></tr>
<tr><td><code translate="no">build_algo</code></td><td>Seleciona o algoritmo de geração do grafo antes da poda. Valores possíveis:</br><code translate="no">IVF_PQ</code>: Oferece uma qualidade superior mas um tempo de construção mais lento.</br> <code translate="no">NN_DESCENT</code> Oferece uma construção mais rápida com uma recuperação potencialmente inferior.</td><td><code translate="no">IVF_PQ</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Decide se o conjunto de dados original deve ser armazenado em cache na memória da GPU. Valores possíveis:</br><code translate="no">“true”</code>: Armazena em cache o conjunto de dados original para melhorar a recuperação, refinando os resultados da pesquisa.</br> <code translate="no">“false”</code> Valores possíveis: : Não armazena em cache o conjunto de dados original para economizar memória da GPU.</td><td><code translate="no">“false”</code></td></tr>
</tbody>
</table>
</li>
<li><p>Parâmetros de pesquisa</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Valor predefinido</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">itopk_size</code></td><td>Determina o tamanho dos resultados intermédios mantidos durante a pesquisa. Um valor maior pode melhorar a recuperação à custa do desempenho da pesquisa. Deve ser pelo menos igual ao valor final do top-k (limite) e é tipicamente uma potência de 2 (por exemplo, 16, 32, 64, 128).</td><td>Vazio</td></tr>
<tr><td><code translate="no">search_width</code></td><td>Especifica o número de pontos de entrada no gráfico CAGRA durante a pesquisa. Aumentar este valor pode melhorar a recordação, mas pode afetar o desempenho da pesquisa (por exemplo, 1, 2, 4, 8, 16, 32).</td><td>Vazio</td></tr>
<tr><td><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></td><td>Controla o processo de iteração da pesquisa. Por defeito, estão definidos para <code translate="no">0</code>, e o CAGRA determina automaticamente o número de iterações com base em <code translate="no">itopk_size</code> e <code translate="no">search_width</code>. O ajuste manual desses valores pode ajudar a equilibrar o desempenho e a precisão.</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">team_size</code></td><td>Especifica o número de threads CUDA usadas para calcular a distância métrica na GPU. Os valores comuns são uma potência de 2 até 32 (por exemplo, 2, 4, 8, 16, 32). Tem um impacto menor no desempenho da pesquisa. O valor predefinido é <code translate="no">0</code>, em que o Milvus seleciona automaticamente o <code translate="no">team_size</code> com base na dimensão do vetor.</td><td><code translate="no">0</code></td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>Limites da pesquisa</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= 1024</td></tr>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=max((<code translate="no">itopk_size</code> + 31)// 32, <code translate="no">search_width</code>) * 32</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h2><p>Semelhante ao <a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a>, o GPU_IVF_FLAT também divide os dados vetoriais em <code translate="no">nlist</code> unidades de cluster e, em seguida, compara as distâncias entre o vetor de entrada de destino e o centro de cada cluster. Dependendo do número de clusters que o sistema está definido para consultar (<code translate="no">nprobe</code>), os resultados da pesquisa de semelhança são devolvidos com base em comparações entre a entrada de destino e os vectores apenas no(s) cluster(s) mais semelhante(s) - reduzindo drasticamente o tempo de consulta.</p>
<p>Ao ajustar <code translate="no">nprobe</code>, é possível encontrar um equilíbrio ideal entre precisão e velocidade para um determinado cenário. Os resultados do <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">teste de desempenho do IVF_FLAT</a> demonstram que o tempo de consulta aumenta drasticamente à medida que o número de vectores de entrada alvo (<code translate="no">nq</code>) e o número de clusters a pesquisar (<code translate="no">nprobe</code>) aumentam.</p>
<p>GPU_IVF_FLAT é o índice IVF mais básico, e os dados codificados armazenados em cada unidade são consistentes com os dados originais.</p>
<p>Ao realizar pesquisas, observe que é possível definir o top-K até 256 para qualquer pesquisa em uma coleção indexada por GPU_IVF_FLAT.</p>
<ul>
<li><p>Parâmetros de construção de índice</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th><th>Valor padrão</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de cluster</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Decide se o conjunto de dados original deve ser armazenado em cache na memória da GPU. Valores possíveis:</br><code translate="no">“true”</code>: Armazena em cache o conjunto de dados original para melhorar a recuperação, refinando os resultados da pesquisa.</br> <code translate="no">“false”</code> Não coloca em cache o conjunto de dados original para poupar memória da GPU.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;flase&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Limites da pesquisa</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Intervalo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= <code translate="no">2048</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">PQ</code> (Quantização de produto) decompõe uniformemente o espaço vetorial de alta dimensão original em produtos cartesianos de <code translate="no">m</code> espaços vetoriais de baixa dimensão e, em seguida, quantifica os espaços vetoriais de baixa dimensão decompostos. Em vez de calcular as distâncias entre o vetor-alvo e o centro de todas as unidades, a quantização do produto permite o cálculo das distâncias entre o vetor-alvo e o centro de agrupamento de cada espaço de baixa dimensão e reduz consideravelmente a complexidade temporal e espacial do algoritmo.</p>
<p>O IVF_PQ efectua o agrupamento de índices IVF antes de quantificar o produto de vectores. O seu ficheiro de índice é ainda mais pequeno do que o IVF_SQ8, mas também causa uma perda de precisão durante a pesquisa de vectores.</p>
<div class="alert note">
<p>Os parâmetros de construção do índice e os parâmetros de pesquisa variam consoante a distribuição Milvus. Selecione primeiro a sua distribuição Milvus.</p>
<p>Ao efetuar pesquisas, note que pode definir o top-K até 8192 para qualquer pesquisa numa coleção indexada por GPU_IVF_FLAT.</p>
</div>
<ul>
<li><p>Parâmetros de construção de índices</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Descrição</th><th>Intervalo</th><th>Valor padrão</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de cluster</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">m</code></td><td>Número de factores de quantização do produto,</td><td><code translate="no">dim mod m or = 0</code></td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Opcional] Número de bits em que cada vetor de baixa dimensão é armazenado.</td><td>[1, 16]</td><td><code translate="no">8</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Decide se o conjunto de dados original deve ser armazenado em cache na memória da GPU. Valores possíveis:</br><code translate="no">“true”</code>: Armazena em cache o conjunto de dados original para melhorar a recuperação, refinando os resultados da pesquisa.</br> <code translate="no">“false”</code> Não coloca em cache o conjunto de dados original para poupar memória da GPU.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;false&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Limites da pesquisa</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Intervalo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= <code translate="no">1024</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUBRUTEFORCE" class="common-anchor-header">GPU_BRUTE_FORCE<button data-href="#GPUBRUTEFORCE" class="anchor-icon" translate="no">
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
    </button></h2><p>O GPU_BRUTE_FORCE foi concebido para casos em que é crucial uma recuperação extremamente elevada, garantindo uma recuperação de 1 ao comparar cada consulta com todos os vectores do conjunto de dados. Requer apenas o tipo de métrica (<code translate="no">metric_type</code>) e top-k (<code translate="no">limit</code>) como parâmetros de construção e pesquisa de índices.</p>
<p>Para GPU_BRUTE_FORCE, não são necessários parâmetros adicionais de construção de índices ou de pesquisa.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusão<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Atualmente, o Milvus carrega todos os índices para a memória GPU para operações de pesquisa eficientes. A quantidade de dados que pode ser carregada depende do tamanho da memória do GPU:</p>
<ul>
<li><strong>GPU_CAGRA</strong>: A utilização da memória é aproximadamente 1,8 vezes superior à dos dados vectoriais originais.</li>
<li><strong>GPU_IVF_FLAT</strong> e <strong>GPU_BRUTE_FORCE</strong>: Requer memória igual ao tamanho dos dados originais.</li>
<li><strong>GPU_IVF_PQ</strong>: Utiliza um espaço de memória menor, que depende das configurações dos parâmetros de compactação.</li>
</ul>
