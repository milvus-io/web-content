---
id: reranking.md
title: Reranking
summary: >-
  A pesquisa híbrida obtém resultados de pesquisa mais precisos através de
  várias pesquisas ANN simultâneas. Múltiplas pesquisas retornam vários
  conjuntos de resultados, que requerem uma estratégia de reranking para ajudar
  a fundir e reordenar os resultados e retornar um único conjunto de resultados.
  Este guia apresentará as estratégias de reordenamento suportadas pelo Milvus e
  fornecerá dicas para selecionar a estratégia de reordenamento apropriada.
---

<h1 id="Reranking" class="common-anchor-header">Reranking<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>A Pesquisa Híbrida obtém resultados de pesquisa mais precisos através de várias pesquisas ANN simultâneas. Múltiplas pesquisas retornam vários conjuntos de resultados, que requerem uma estratégia de reranking para ajudar a fundir e reordenar os resultados e retornar um único conjunto de resultados. Este guia apresentará as estratégias de reordenamento suportadas pelo Milvus e fornecerá dicas para selecionar a estratégia de reordenamento apropriada.</p>
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
    </button></h2><p>O diagrama seguinte mostra o fluxo de trabalho principal da realização de uma Pesquisa Híbrida numa aplicação de pesquisa multimodal. No diagrama, um caminho é a pesquisa ANN básica em textos e o outro caminho é a pesquisa ANN básica em imagens. Cada caminho gera um conjunto de resultados com base na pontuação de semelhança do texto e da imagem, respetivamente<strong>(Limite 1</strong> e <strong>Limite 2</strong>). Em seguida, é aplicada uma estratégia de reclassificação para reclassificar dois conjuntos de resultados com base num padrão unificado, fundindo finalmente os dois conjuntos de resultados num conjunto final de resultados de pesquisa, <strong>Limite(final)</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="Multi Vector Rerank" class="doc-image" id="multi-vector-rerank" />
   </span> <span class="img-wrapper"> <span>Reranking multi-vetorial</span> </span></p>
<p>Na Pesquisa Híbrida, a classificação é um passo crucial que integra os resultados de múltiplas pesquisas vectoriais para garantir que o resultado final é o mais relevante e preciso. Atualmente, o Milvus suporta as duas estratégias de reranking seguintes:</p>
<ul>
<li><p><strong><a href="/docs/pt/v2.5.x/reranking.md#WeightedRanker">WeightedRanker</a></strong>: Esta estratégia funde resultados calculando uma pontuação ponderada de pontuações (ou distâncias) de diferentes pesquisas vectoriais. Os pesos são atribuídos com base na importância de cada campo vetorial, permitindo a personalização de acordo com as prioridades de casos de utilização específicos.</p></li>
<li><p><strong><a href="/docs/pt/v2.5.x/reranking.md#RRFRanker">RRFRanker</a> (Reciprocal Rank Fusion Ranker)</strong>: Esta estratégia combina resultados com base na classificação. Utiliza um método que equilibra as classificações dos resultados de diferentes pesquisas, conduzindo frequentemente a uma integração mais justa e eficaz de diversos tipos ou modalidades de dados.</p></li>
</ul>
<h2 id="WeightedRanker" class="common-anchor-header">Classificador ponderado<button data-href="#WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>A estratégia WeightedRanker atribui pesos diferentes aos resultados de cada caminho da pesquisa vetorial com base na sua importância.</p>
<h3 id="Mechanism-of-WeightedRanker" class="common-anchor-header">Mecanismo do WeightedRanker</h3><p>O fluxo de trabalho principal da estratégia WeightedRanker é o seguinte:</p>
<ol>
<li><p><strong>Recolher os resultados da pesquisa</strong>: Reúne os resultados e as pontuações de cada caminho de pesquisa vetorial (pontuação_1, pontuação_2).</p></li>
<li><p><strong>Normalização da pontuação</strong>: Cada pesquisa pode usar diferentes métricas de similaridade, resultando em distribuições de pontuação variadas. Por exemplo, o uso do produto interno (IP) como um tipo de similaridade pode resultar em pontuações que variam de [-∞,+∞], enquanto o uso da distância euclidiana (L2) resulta em pontuações que variam de [0,+∞]. Como os intervalos de pontuação de diferentes pesquisas variam e não podem ser diretamente comparados, é necessário normalizar as pontuações de cada caminho de pesquisa. Normalmente, a função <code translate="no">arctan</code> é aplicada para transformar as pontuações num intervalo entre [0, 1] (pontuação_1_normalizada, pontuação_2_normalizada). As pontuações mais próximas de 1 indicam maior similaridade.</p></li>
<li><p><strong>Atribuir pesos</strong>: Com base na importância atribuída aos diferentes campos vectoriais, são atribuídos pesos<strong>(wi</strong>) às pontuações normalizadas (score_1_normalized, score_2_normalized). Os pesos de cada caminho devem variar entre [0,1]. As pontuações ponderadas resultantes são pontuação_1_ponderada e pontuação_2_ponderada.</p></li>
<li><p><strong>Mesclar pontuações</strong>: As pontuações ponderadas (score_1_weighted, score_2_weighted) são classificadas da mais alta para a mais baixa para produzir um conjunto final de pontuações (score_final).</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/weighted-reranker.png" alt="Weighted Reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>Classificador ponderado</span> </span></p>
<h3 id="Example-of-WeightedRanker" class="common-anchor-header">Exemplo de WeightedRanker</h3><p>Este exemplo demonstra uma Pesquisa Híbrida multimodal (topK=5) envolvendo imagens e texto e ilustra como a estratégia WeightedRanker classifica os resultados de duas pesquisas ANN.</p>
<ul>
<li>Resultados da pesquisa ANN em imagens （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Pontuação (imagem)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.8</p></td>
   </tr>
</table>
<ul>
<li>Resultados da pesquisa ANN em textos （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Pontuação (texto)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.91</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.87</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.82</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>0.78</p></td>
   </tr>
</table>
<ul>
<li>Utilize o WeightedRanker para atribuir pesos aos resultados da pesquisa de imagens e de texto. Suponha que o peso para a pesquisa ANN de imagens é 0,6 e o peso para a pesquisa de texto é 0,4.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Pontuação (imagem)</strong></p></th>
     <th><p><strong>Pontuação (texto)</strong></p></th>
     <th><p><strong>Pontuação ponderada</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
     <td><p>0.87</p></td>
     <td><p>0.6×0.92+0.4×0.87=0.90</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
     <td><p>N/A</p></td>
     <td><p>0.6×0.88+0.4×0=0.528</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
     <td><p>N/A</p></td>
     <td><p>0.6×0.85+0.4×0=0.51</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
     <td><p>0.91</p></td>
     <td><p>0.6×0.83+0.4×0.91=0.86</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.80</p></td>
     <td><p>0.82</p></td>
     <td><p>0.6×0.80+0.4×0.82=0.81</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>Não está na imagem</p></td>
     <td><p>0.85</p></td>
     <td><p>0.6×0+0.4×0.85=0.34</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>Não está na imagem</p></td>
     <td><p>0.78</p></td>
     <td><p>0.6×0+0.4×0.78=0.312</p></td>
   </tr>
</table>
<ul>
<li>Os resultados finais após o reranking（topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>Classificação</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Pontuação final</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.90</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>198</p></td>
     <td><p>0.86</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>175</p></td>
     <td><p>0.81</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>203</p></td>
     <td><p>0.528</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>150</p></td>
     <td><p>0.51</p></td>
   </tr>
</table>
<h3 id="Usage-of-WeightedRanker" class="common-anchor-header">Utilização do WeightedRanker</h3><p>Ao utilizar a estratégia WeightedRanker, é necessário introduzir valores de peso. O número de valores de peso a introduzir deve corresponder ao número de pedidos de pesquisa da RNA básica na Pesquisa Híbrida. Os valores de peso de entrada devem estar no intervalo de [0,1], com valores mais próximos de 1 indicando maior importância.</p>
<p>Por exemplo, suponha que existem dois pedidos básicos de pesquisa ANN numa Pesquisa Híbrida: pesquisa de texto e pesquisa de imagem. Se a pesquisa de texto for considerada mais importante, deve ser-lhe atribuído um peso maior.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

rerank= WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;

<span class="hljs-type">WeightedRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

reranker := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;ws&quot;,
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="RRFRanker" class="common-anchor-header">RRFRanker<button data-href="#RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>O Reciprocal Rank Fusion (RRF) é um método de fusão de dados que combina listas classificadas com base na recíproca das suas classificações. Esta estratégia de classificação recíproca equilibra eficazmente a importância de cada caminho da pesquisa vetorial.</p>
<h3 id="Mechanism-of-RRFRanker" class="common-anchor-header">Mecanismo do RRFRanker</h3><p>O fluxo de trabalho principal da estratégia RRFRanker é o seguinte:</p>
<ol>
<li><p><strong>Recolher as classificações da pesquisa</strong>: Recolher as classificações dos resultados de cada caminho da pesquisa vetorial (rank_1, rank_2).</p></li>
<li><p><strong>Fundir classificações</strong>: Converter as classificações de cada caminho (rank_rrf_1, rank_rrf_2) de acordo com uma fórmula .</p>
<p>A fórmula de cálculo envolve <em>N</em>, que representa o número de recuperações. <em>ranki</em><em>(d</em>) é a posição na classificação do documento <em>d</em> gerada pelo <em>i(th)</em> retriever. <em>k</em> é um parâmetro de suavização normalmente fixado em 60.</p></li>
<li><p><strong>Agregação de classificações</strong>: Classifica novamente os resultados da pesquisa com base nas classificações combinadas para produzir os resultados finais.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/RRF-reranker.png" alt="RRF Reranker" class="doc-image" id="rrf-reranker" />
   </span> <span class="img-wrapper"> <span>Reranker RRF</span> </span></p>
<h3 id="Example-of-RRFRanker" class="common-anchor-header">Exemplo de RRFRanker</h3><p>Este exemplo demonstra uma Pesquisa Híbrida (topK=5) em vectores esparso-densos e ilustra como a estratégia RRFRanker reordena os resultados de duas pesquisas ANN.</p>
<ul>
<li>Resultados da pesquisa ANN em vectores esparsos de textos （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Classificação (esparso)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>Resultados da pesquisa ANN em vectores densos de textos （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Classificação (denso)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>Utilize a FRR para reordenar as classificações dos dois conjuntos de resultados de pesquisa. Suponha que o parâmetro de suavização <code translate="no">k</code> está definido para 60.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Pontuação (esparso)</strong></p></th>
     <th><p><strong>Pontuação (Densa)</strong></p></th>
     <th><p><strong>Pontuação final</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
     <td><p>2</p></td>
     <td><p>1/(60+1)+1/(60+2) = 0.01639</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
     <td><p>1</p></td>
     <td><p>1/(60+4)+1/(60+1) = 0.01593</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
     <td><p>4</p></td>
     <td><p>1/(60+5)+1/(60+4) = 0.01554</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+2) = 0.01613</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>N/A</p></td>
     <td><p>3</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>N/A</p></td>
     <td><p>5</p></td>
     <td><p>1/(60+5) = 0.01554</p></td>
   </tr>
</table>
<ul>
<li>Os resultados finais após a nova classificação（topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>Classificação</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Pontuação final</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.01639</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>203</p></td>
     <td><p>0.01613</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>198</p></td>
     <td><p>0.01593</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>150</p></td>
     <td><p>0.01587</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>110</p></td>
     <td><p>0.01587</p></td>
   </tr>
</table>
<h3 id="Usage-of-RRFRanker" class="common-anchor-header">Utilização do RRFRanker</h3><p>Ao utilizar a estratégia de reclassificação RRF, é necessário configurar o parâmetro <code translate="no">k</code>. Trata-se de um parâmetro de suavização que pode alterar eficazmente os pesos relativos da pesquisa de texto integral em relação à pesquisa vetorial. O valor padrão deste parâmetro é 60, e pode ser ajustado dentro de um intervalo de (0, 16384). O valor deve ser um número de ponto flutuante. O valor recomendado é entre [10, 100]. Embora <code translate="no">k=60</code> seja uma escolha comum, o valor ideal de <code translate="no">k</code> pode variar dependendo das suas aplicações e conjuntos de dados específicos. Recomendamos testar e ajustar esse parâmetro com base no seu caso de uso específico para obter o melhor desempenho.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

ranker = RRFRanker(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;

<span class="hljs-type">RRFRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;rerank&quot;</span>: {
    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;k&quot;</span>: 100
    }
}
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {&quot;k&quot;: 100}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Select-the-right-reranking-strategy" class="common-anchor-header">Selecionar a estratégia de reranking correta<button data-href="#Select-the-right-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao escolher uma estratégia de reranking, uma coisa a considerar é se há alguma ênfase para uma ou mais pesquisas ANN básicas nos campos vetoriais.</p>
<ul>
<li><p><strong>WeightedRanker</strong>: Esta estratégia é recomendada se for necessário que os resultados dêem ênfase a um determinado campo vetorial. O WeightedRanker permite-lhe atribuir pesos mais elevados a determinados campos vectoriais, dando-lhes mais ênfase. Por exemplo, em pesquisas multimodais, as descrições textuais de uma imagem podem ser consideradas mais importantes do que as cores dessa imagem.</p></li>
<li><p><strong>RRFRanker (Reciprocal Rank Fusion Ranker)</strong>: Esta estratégia é recomendada quando não existe uma ênfase específica. O RRF pode equilibrar eficazmente a importância de cada campo vetorial.</p></li>
</ul>
