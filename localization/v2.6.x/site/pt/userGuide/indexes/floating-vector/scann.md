---
id: scann.md
title: SCANN
summary: >-
  Alimentado pela biblioteca ScaNN da Google, o índice SCANN em Milvus foi
  concebido para enfrentar os desafios da pesquisa de semelhança de vectores em
  escala, alcançando um equilíbrio entre velocidade e precisão, mesmo em grandes
  conjuntos de dados que tradicionalmente colocariam desafios à maioria dos
  algoritmos de pesquisa.
---
<h1 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Alimentado pela biblioteca <a href="https://github.com/google-research/google-research/blob/master/scann%2FREADME.md">ScaNN</a> da Google, o índice <code translate="no">SCANN</code> em Milvus foi concebido para enfrentar os desafios da pesquisa de semelhança de vectores em escala, alcançando um equilíbrio entre velocidade e precisão, mesmo em grandes conjuntos de dados que tradicionalmente colocariam desafios à maioria dos algoritmos de pesquisa.</p>
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
    </button></h2><p>O ScaNN foi criado para resolver um dos maiores desafios na pesquisa de vectores: encontrar eficientemente os vectores mais relevantes em espaços de elevada dimensão, mesmo quando os conjuntos de dados se tornam maiores e mais complexos. A sua arquitetura divide o processo de pesquisa vetorial em fases distintas:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scann.png" alt="Scann" class="doc-image" id="scann" />
   </span> <span class="img-wrapper"> <span>Scann</span> </span></p>
<ol>
<li><p><strong>Particionamento</strong>: Divide o conjunto de dados em clusters. Este método limita o espaço de pesquisa, concentrando-se apenas em subconjuntos de dados relevantes, em vez de analisar todo o conjunto de dados, poupando tempo e recursos de processamento. O ScaNN utiliza frequentemente algoritmos de agrupamento, como o <a href="https://zilliz.com/blog/k-means-clustering">k-means</a>, para identificar clusters, o que lhe permite efetuar pesquisas de semelhança de forma mais eficiente.</p></li>
<li><p><strong>Quantização</strong>: O ScaNN aplica um processo de quantização conhecido como <a href="https://arxiv.org/abs/1908.10396">quantização de vetor anisotrópico</a> após o particionamento. A quantização tradicional concentra-se na minimização da distância geral entre os vectores originais e comprimidos, o que não é ideal para tarefas como a <a href="https://papers.nips.cc/paper/5329-asymmetric-lsh-alsh-for-sublinear-time-maximum-inner-product-search-mips.pdf">Maximum Inner Product Search (MIPS)</a>, em que a semelhança é determinada pelo produto interno dos vectores e não pela distância direta. Em vez disso, a quantização anisotrópica prioriza a preservação de componentes paralelos entre vetores, ou as partes mais importantes para o cálculo de produtos internos precisos. Esta abordagem permite que o ScaNN mantenha uma elevada precisão MIPS, alinhando cuidadosamente os vectores comprimidos com a consulta, permitindo pesquisas de semelhança mais rápidas e precisas.</p></li>
<li><p><strong>Re-ranking</strong>: A fase de reclassificação é a etapa final, onde o ScaNN ajusta os resultados da pesquisa dos estágios de particionamento e quantização. Essa reclassificação aplica cálculos precisos de produto interno aos principais vetores candidatos, garantindo que os resultados finais sejam altamente precisos. A reclassificação é crucial em motores de recomendação de alta velocidade ou em aplicações de pesquisa de imagens em que a filtragem e o agrupamento iniciais servem como uma camada grosseira e a fase final garante que apenas os resultados mais relevantes são devolvidos ao utilizador.</p></li>
</ol>
<p>O desempenho do <code translate="no">SCANN</code> é controlado por dois parâmetros-chave que lhe permitem afinar o equilíbrio entre velocidade e precisão:</p>
<ul>
<li><p><code translate="no">with_raw_data</code>: Controla se os dados vectoriais originais são armazenados juntamente com as representações quantizadas. A ativação deste parâmetro melhora a precisão durante a reclassificação, mas aumenta os requisitos de armazenamento.</p></li>
<li><p><code translate="no">reorder_k</code>: Determina quantos candidatos são refinados durante a fase final de reclassificação. Valores mais altos melhoram a precisão, mas aumentam a latência da pesquisa.</p></li>
</ul>
<p>Para obter orientações detalhadas sobre a otimização destes parâmetros para o seu caso de utilização específico, consulte <a href="/docs/pt/scann.md#Index-params">Parâmetros de índice</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Criar índice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Para construir um índice <code translate="no">SCANN</code> num campo vetorial em Milvus, utilize o método <code translate="no">add_index()</code>, especificando os parâmetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, e parâmetros adicionais para o índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;SCANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span></span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to hold raw data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a construir. Neste exemplo, defina o valor para <code translate="no">SCANN</code>.</p></li>
<li><p><code translate="no">metric_type</code>: O método utilizado para calcular a distância entre vectores. Os valores suportados incluem <code translate="no">COSINE</code>, <code translate="no">L2</code>, e <code translate="no">IP</code>. Para obter detalhes, consulte <a href="/docs/pt/metric.md">Tipos de métricas</a>.</p></li>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para criar o índice.</p>
<ul>
<li><code translate="no">with_raw_data</code>: Se devem ser armazenados os dados do vetor original juntamente com a representação quantizada.</li>
</ul>
<p>Para saber mais sobre os parâmetros de construção disponíveis para o índice <code translate="no">SCANN</code>, consulte <a href="/docs/pt/scann.md#Index-building-params">Parâmetros de construção do índice</a>.</p></li>
</ul>
<p>Uma vez configurados os parâmetros do índice, pode criar o índice utilizando diretamente o método <code translate="no">create_index()</code> ou passando os parâmetros do índice no método <code translate="no">create_collection</code>. Para obter detalhes, consulte <a href="/docs/pt/create-collection.md">Criar coleção</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Pesquisar no índice<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de o índice ser criado e as entidades serem inseridas, pode efetuar pesquisas de semelhança no índice.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;reorder_k&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of candidates to refine</span>
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span> <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração:</p>
<ul>
<li><p><code translate="no">params</code>: Opções de configuração adicionais para pesquisar no índice.</p>
<ul>
<li><code translate="no">reorder_k</code>: Número de candidatos a serem refinados durante a fase de reclassificação.</li>
<li><code translate="no">nprobe</code>: Número de clusters a pesquisar.</li>
</ul>
<p>Para saber mais sobre os parâmetros de pesquisa disponíveis para o índice <code translate="no">SCANN</code>, consulte <a href="/docs/pt/scann.md#Index-specific-search-params">Parâmetros de pesquisa específicos do índice</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Parâmetros do índice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção fornece uma visão geral dos parâmetros utilizados para criar um índice e efetuar pesquisas no índice.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parâmetros de construção do índice<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>A tabela seguinte lista os parâmetros que podem ser configurados em <code translate="no">params</code> ao <a href="/docs/pt/scann.md#Build-index">construir um índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Número de unidades de cluster</p></td>
     <td><p>[1, 65536]</p></td>
     <td><p>Uma <em>nlist</em> mais alta aumenta a eficiência da poda e normalmente acelera a pesquisa grosseira, mas as partições podem ficar demasiado pequenas, o que pode reduzir a recuperação; uma <em>nlist</em> mais baixa pesquisa clusters maiores, melhorando a recuperação mas tornando a pesquisa mais lenta.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Se deve armazenar os dados do vetor original juntamente com a representação quantizada. Quando ativado, isto permite cálculos de similaridade mais precisos durante a fase de reclassificação, utilizando os vectores originais em vez de aproximações quantizadas.</p></td>
     <td><p><strong>Tipo</strong>: Booleano</p><p><strong>Intervalo</strong>: <code translate="no">true</code>, <code translate="no">false</code></p><p><strong>Valor predefinido</strong>: <code translate="no">true</code></p></td>
     <td><p>Definido para <code translate="no">true</code> para uma <strong>maior precisão de pesquisa</strong> e quando o espaço de armazenamento não é uma preocupação principal. Os dados vectoriais originais permitem cálculos de semelhança mais precisos durante a reclassificação.</p><p>Defina para <code translate="no">false</code> para <strong>reduzir a sobrecarga de armazenamento</strong> e a utilização de memória, especialmente para grandes conjuntos de dados. No entanto, isto pode resultar numa precisão de pesquisa ligeiramente inferior, uma vez que a fase de reclassificação irá utilizar vectores quantizados.</p><p><strong>Recomendado</strong>: Use <code translate="no">true</code> para aplicações de produção em que a precisão é crítica.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parâmetros de pesquisa específicos do índice<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>A tabela a seguir lista os parâmetros que podem ser configurados em <code translate="no">search_params.params</code> ao <a href="/docs/pt/scann.md#Search-on-index">pesquisar no índice</a>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Intervalo de valores</p></th>
     <th><p>Sugestão de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reorder_k</code></p></td>
     <td><p>Controla o número de vectores candidatos que são refinados durante a fase de reclassificação. Este parâmetro determina quantos candidatos de topo das fases iniciais de partição e quantização são reavaliados utilizando cálculos de semelhança mais precisos.</p></td>
     <td><p><strong>Tipo</strong>: Inteiro</p><p><strong>Range</strong>: [1, <em>int_max</em>]</p><p><strong>Valor predefinido</strong>: Nenhum</p></td>
     <td><p>Um <code translate="no">reorder_k</code> maior conduz geralmente a uma <strong>maior precisão de pesquisa</strong>, uma vez que são considerados mais candidatos durante a fase de refinamento final. No entanto, isto também <strong>aumenta o tempo de pesquisa</strong> devido a computação adicional.</p><p>Considere o aumento de <code translate="no">reorder_k</code> quando a obtenção de uma alta recuperação é crítica e a velocidade de pesquisa é menos preocupante. Um bom ponto de partida é 2-5x o <code translate="no">limit</code> desejado (TopK resultados a retornar).</p><p>Considere diminuir <code translate="no">reorder_k</code> para dar prioridade a pesquisas mais rápidas, especialmente em cenários em que uma ligeira redução na precisão é aceitável.</p><p>Na maioria dos casos, recomendamos que você defina um valor dentro deste intervalo:<em>[limite</em>, <em>limite</em> * 5].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>O número de clusters para pesquisar candidatos.</p></td>
     <td><p><strong>Tipo</strong>: Integer</p><p><strong>Range</strong>: [1, <em>nlist</em>]</p><p><strong>Valor predefinido</strong>: <code translate="no">8</code></p></td>
     <td><p>Valores mais altos permitem que mais clusters sejam pesquisados, melhorando a recuperação ao expandir o escopo da pesquisa, mas ao custo de maior latência de consulta.</p><p>Defina <code translate="no">nprobe</code> proporcionalmente a <code translate="no">nlist</code> para equilibrar velocidade e precisão.</p><p>Na maioria dos casos, recomendamos que você defina um valor dentro deste intervalo: [1, nlist].</p></td>
   </tr>
</table>
