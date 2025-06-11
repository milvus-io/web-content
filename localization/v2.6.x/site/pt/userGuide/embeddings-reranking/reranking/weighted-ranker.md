---
id: weighted-ranker.md
title: Classificador ponderado
summary: >-
  O Weighted Ranker combina e prioriza de forma inteligente os resultados de
  vários caminhos de pesquisa, atribuindo pesos de importância diferentes a cada
  um deles. Da mesma forma que um chef habilidoso equilibra vários ingredientes
  para criar o prato perfeito, o Weighted Ranker equilibra diferentes resultados
  de pesquisa para fornecer os resultados combinados mais relevantes. Esta
  abordagem é ideal para pesquisas em vários campos vectoriais ou modalidades em
  que determinados campos devem contribuir mais significativamente para a
  classificação final do que outros.
---
<h1 id="Weighted-Ranker" class="common-anchor-header">Classificador ponderado<button data-href="#Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>O Weighted Ranker combina e prioriza de forma inteligente os resultados de vários caminhos de pesquisa, atribuindo pesos de importância diferentes a cada um deles. Da mesma forma que um chef habilidoso equilibra vários ingredientes para criar o prato perfeito, o Weighted Ranker equilibra diferentes resultados de pesquisa para fornecer os resultados combinados mais relevantes. Esta abordagem é ideal para pesquisas em vários campos vectoriais ou modalidades em que determinados campos devem contribuir mais significativamente para a classificação final do que outros.</p>
<h2 id="When-to-use-Weighted-Ranker" class="common-anchor-header">Quando utilizar o Weighted Ranker<button data-href="#When-to-use-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>O Weighted Ranker foi especificamente concebido para cenários de pesquisa híbrida em que é necessário combinar resultados de vários caminhos de pesquisa vetorial. É particularmente eficaz para:</p>
<table>
   <tr>
     <th><p>Caso de uso</p></th>
     <th><p>Exemplo de uso</p></th>
     <th><p>Por que o Weighted Ranker funciona bem</p></th>
   </tr>
   <tr>
     <td><p>Pesquisa de comércio eletrónico</p></td>
     <td><p>Pesquisa de produtos que combina semelhança de imagem e descrição de texto</p></td>
     <td><p>Permite que os retalhistas dêem prioridade à semelhança visual para artigos de moda, enquanto dão ênfase às descrições de texto para produtos técnicos</p></td>
   </tr>
   <tr>
     <td><p>Pesquisa de conteúdos multimédia</p></td>
     <td><p>Recuperação de vídeos utilizando caraterísticas visuais e transcrições de áudio</p></td>
     <td><p>Equilibra a importância do conteúdo visual em relação ao diálogo falado com base na intenção da consulta</p></td>
   </tr>
   <tr>
     <td><p>Recuperação de documentos</p></td>
     <td><p>Pesquisa de documentos empresariais com múltiplas incorporações para diferentes secções</p></td>
     <td><p>Dá maior peso às incorporações de título e resumo, sem deixar de considerar as incorporações de texto integral</p></td>
   </tr>
</table>
<p>Se a sua aplicação de pesquisa híbrida requer a combinação de vários caminhos de pesquisa e o controlo da sua importância relativa, o Weighted Ranker é a escolha ideal.</p>
<h2 id="Mechanism-of-Weighted-Ranker" class="common-anchor-header">Mecanismo do Weighted Ranker<button data-href="#Mechanism-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>O fluxo de trabalho principal da estratégia do WeightedRanker é o seguinte:</p>
<ol>
<li><p><strong>Recolher resultados de pesquisa</strong>: Reúne os resultados e as pontuações de cada caminho de pesquisa vetorial (pontuação_1, pontuação_2).</p></li>
<li><p><strong>Normalização da pontuação</strong>: Cada pesquisa pode usar diferentes métricas de similaridade, resultando em distribuições de pontuação variadas. Por exemplo, o uso do produto interno (IP) como um tipo de similaridade pode resultar em pontuações que variam de [-∞,+∞], enquanto o uso da distância euclidiana (L2) resulta em pontuações que variam de [0,+∞]. Como os intervalos de pontuação de diferentes pesquisas variam e não podem ser diretamente comparados, é necessário normalizar as pontuações de cada caminho de pesquisa. Normalmente, a função <code translate="no">arctan</code> é aplicada para transformar as pontuações num intervalo entre [0, 1] (pontuação_1_normalizada, pontuação_2_normalizada). As pontuações mais próximas de 1 indicam maior similaridade.</p></li>
<li><p><strong>Atribuir pesos</strong>: Com base na importância atribuída aos diferentes campos vectoriais, são atribuídos pesos<strong>(wi</strong>) às pontuações normalizadas (score_1_normalized, score_2_normalized). Os pesos de cada caminho devem variar entre [0,1]. As pontuações ponderadas resultantes são pontuação_1_ponderada e pontuação_2_ponderada.</p></li>
<li><p><strong>Mesclar pontuações</strong>: As pontuações ponderadas (score_1_weighted, score_2_weighted) são classificadas da mais alta para a mais baixa para produzir um conjunto final de pontuações (score_final).</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/weighted-ranker.png" alt="Weighted Ranker" class="doc-image" id="weighted-ranker" />
   </span> <span class="img-wrapper"> <span>Classificador ponderado</span> </span></p>
<h2 id="Example-of-Weighted-Ranker" class="common-anchor-header">Exemplo de classificador ponderado<button data-href="#Example-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Este exemplo demonstra uma Pesquisa Híbrida multimodal (topK=5) que envolve imagens e texto e ilustra como a estratégia WeightedRanker classifica os resultados de duas pesquisas ANN.</p>
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
<h2 id="Usage-of-Weighted-Ranker" class="common-anchor-header">Utilização do Weighted Ranker<button data-href="#Usage-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao utilizar a estratégia WeightedRanker, é necessário introduzir valores de peso. O número de valores de peso a introduzir deve corresponder ao número de pedidos de pesquisa básica da RNA na Pesquisa Híbrida. Os valores de peso de entrada devem estar no intervalo de [0,1], com valores mais próximos de 1 indicando maior importância.</p>
<h3 id="Create-a-Weighted-Ranker" class="common-anchor-header">Criar um classificador ponderado</h3><p>Por exemplo, suponha que existam dois pedidos de pesquisa ANN básicos numa Pesquisa Híbrida: pesquisa de texto e pesquisa de imagem. Se a pesquisa de texto for considerada mais importante, deve ser-lhe atribuído um peso maior.</p>
<div class="alert note">
<p>O Milvus 2.6.x e posteriores permitem-lhe configurar estratégias de reranking diretamente através da API <code translate="no">Function</code>. Se estiver a utilizar uma versão anterior (antes da v2.6.0), consulte a documentação <a href="https://milvus.io/docs/2.5.x/reranking.md#Reranking">do Reranking</a> para obter instruções de configuração.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

rerank = Function(
    name=<span class="hljs-string">&quot;weight&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;weighted&quot;</span>, 
        <span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-string">&quot;norm_score&quot;</span>: <span class="hljs-literal">True</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Necessário?</p></th>
     <th><p>Descrição</p></th>
     <th><p>Valor/Exemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Identificador único para esta função</p></td>
     <td><p><code translate="no">"weight"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Lista de campos vectoriais aos quais aplicar a função (deve estar vazia para a classificação ponderada)</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sim</p></td>
     <td><p>O tipo de função a invocar; utilize <code translate="no">RERANK</code> para especificar uma estratégia de classificação</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Especifica o método de reordenação a utilizar. Deve ser definido como <code translate="no">weighted</code> para utilizar a classificação ponderada.</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weights</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Matriz de pesos correspondentes a cada caminho de pesquisa; valores ∈ [0,1]. Para obter detalhes, consulte <a href="/docs/pt/weighted-ranker.md#Mechanism-of-Weighted-Ranker">Mecanismo de classificação ponderada</a>.</p></td>
     <td><p><code translate="no">[0.1, 0.9]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.norm_score</code></p></td>
     <td><p>Não</p></td>
     <td><p>Se a pontuação bruta deve ser normalizada (usando arctan) antes da ponderação. Para obter detalhes, consulte <a href="/docs/pt/weighted-ranker.md#Mechanism-of-Weighted-Ranker">Mecanismo do classificador ponderado</a>.</p></td>
     <td><p><code translate="no">True</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Aplicar à pesquisa híbrida</h3><p>O Weighted Ranker foi concebido especificamente para operações de pesquisa híbrida que combinam vários campos vectoriais. Ao executar a pesquisa híbrida, deve especificar os pesos para cada caminho de pesquisa:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest

<span class="hljs-comment"># Connect to Milvus server</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assume you have a collection setup</span>

<span class="hljs-comment"># Define text vector search request</span>
text_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;modern dining table&quot;</span>],
    anns_field=<span class="hljs-string">&quot;text_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define image vector search request</span>
image_search = AnnSearchRequest(
    data=[image_embedding],  <span class="hljs-comment"># Image embedding vector</span>
    anns_field=<span class="hljs-string">&quot;image_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply Weighted Ranker to product hybrid search</span>
<span class="hljs-comment"># Text search has 0.8 weight, image search has 0.3 weight</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=rerank,  <span class="hljs-comment"># Apply the weighted ranker</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para obter mais informações sobre a pesquisa híbrida, consulte <a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida multivectorial</a>.</p>
