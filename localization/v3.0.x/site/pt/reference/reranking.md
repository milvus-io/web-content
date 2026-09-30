---
id: reranking.md
summary: >-
  Este tópico aborda o processo de reranking, explicando o seu significado e a
  implementação de dois métodos de reranking.
title: Reranking
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
    </button></h1><p>Milvus permite capacidades de pesquisa híbrida usando a API <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md">hybrid_search()</a>, incorporando estratégias sofisticadas de reranking para refinar os resultados de pesquisa de múltiplas instâncias <code translate="no">AnnSearchRequest</code>. Este tópico aborda o processo de reranking, explicando o seu significado e a implementação de diferentes estratégias de reranking no Milvus.</p>
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
    </button></h2><p>A figura seguinte ilustra a execução de uma pesquisa híbrida em Milvus e destaca o papel do reranking no processo.</p>
<p><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/multi-vector-rerank.png" alt="reranking_process" width="300"/></p>
<p>O reranking na pesquisa híbrida é um passo crucial que consolida os resultados de vários campos vectoriais, assegurando que o resultado final é relevante e priorizado com precisão. Atualmente, o Milvus oferece estas estratégias de classificação:</p>
<ul>
<li><p><code translate="no">WeightedRanker</code>: Esta abordagem funde os resultados através do cálculo de uma média ponderada das pontuações (ou distâncias vectoriais) de diferentes pesquisas vectoriais. Atribui pesos com base na importância de cada campo de vetor.</p></li>
<li><p><code translate="no">RRFRanker</code>: Esta estratégia combina resultados com base nas suas classificações em diferentes colunas de vectores.</p></li>
</ul>
<h2 id="Weighted-Scoring-WeightedRanker" class="common-anchor-header">Pontuação ponderada (WeightedRanker)<button data-href="#Weighted-Scoring-WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>A estratégia <code translate="no">WeightedRanker</code> atribui pesos diferentes aos resultados de cada rota de pesquisa vetorial com base na importância de cada campo vetorial. Esta estratégia de reclassificação é aplicada quando a importância de cada campo de vetor varia, permitindo-lhe enfatizar determinados campos de vetor em detrimento de outros, atribuindo-lhes pesos mais elevados. Por exemplo, numa pesquisa multimodal, a descrição do texto pode ser considerada mais importante do que a distribuição de cores nas imagens.</p>
<p>O processo básico do WeightedRanker é o seguinte:</p>
<ul>
<li><p><strong>Recolher pontuações durante a recuperação</strong>: Recolhe os resultados e as suas pontuações de diferentes rotas de recuperação de vectores.</p></li>
<li><p><strong>Normalização da pontuação</strong>: Normalizar as pontuações de cada rota para um intervalo de [0,1], onde valores mais próximos de 1 indicam maior relevância. Essa normalização é crucial devido às distribuições de pontuação que variam com diferentes tipos de métricas. Por exemplo, a distância para IP varia de [-∞,+∞], enquanto a distância para L2 varia de [0,+∞]. Milvus emprega a função <code translate="no">arctan</code>, transformando os valores para o intervalo [0,1] para fornecer uma base padronizada para diferentes tipos de métricas.</p>
<p><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/arctan.png" alt="arctan-function" width="300"/></p></li>
<li><p><strong>Atribuição de pesos</strong>: Atribui um peso <code translate="no">w𝑖</code> a cada rota de recuperação de vectores. Os utilizadores especificam os pesos, que reflectem a fiabilidade, precisão ou outras métricas pertinentes da fonte de dados. Cada peso varia entre [0,1].</p></li>
<li><p><strong>Fusão de pontuação</strong>: Calcula uma média ponderada das pontuações normalizadas para obter a pontuação final. Os resultados são então classificados com base nas pontuações mais altas e mais baixas para gerar os resultados finais ordenados.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x//assets/weighted-reranker.png" alt="weighted-reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>classificador ponderado</span> </span></p>
<p>Para usar essa estratégia, aplique uma instância <code translate="no">WeightedRanker</code> e defina os valores de peso passando um número variável de argumentos numéricos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.7</span>) 
<button class="copy-code-btn"></button></code></pre>
<p>Observe que:</p>
<ul>
<li><p>Cada valor de peso varia de 0 (menos importante) a 1 (mais importante), influenciando a pontuação agregada final.</p></li>
<li><p>O número total de valores de peso fornecidos em <code translate="no">WeightedRanker</code> deve ser igual ao número de instâncias de <code translate="no">AnnSearchRequest</code> que você criou anteriormente.</p></li>
<li><p>É importante observar que, devido às diferentes medidas dos diferentes tipos de métricas, normalizamos as distâncias dos resultados de recuperação para que fiquem no intervalo [0,1], em que 0 significa diferente e 1 significa semelhante. A pontuação final será a soma dos valores de peso e das distâncias.</p></li>
</ul>
<h2 id="Reciprocal-Rank-Fusion-RRFRanker" class="common-anchor-header">Fusão de classificação recíproca (RRFRanker)<button data-href="#Reciprocal-Rank-Fusion-RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>O RRF é um método de fusão de dados que combina listas de classificação com base na recíproca das suas classificações. É uma forma eficaz de equilibrar a influência de cada campo vetorial, especialmente quando não existe uma precedência clara de importância. Esta estratégia é normalmente utilizada quando se pretende dar igual consideração a todos os campos vectoriais ou quando existe incerteza quanto à importância relativa de cada campo.</p>
<p>O processo básico da RRF é o seguinte:</p>
<ul>
<li><p><strong>Coletar classificações durante a recuperação</strong>: Os recuperadores de vários campos vectoriais recuperam e ordenam os resultados.</p></li>
<li><p><strong>Fusão de classificações</strong>: O algoritmo RRF pondera e combina as classificações de cada recuperador. A fórmula é a seguinte:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x//assets/rrf-ranker.png" alt="rrf-ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>rrf-ranker</span> </span></p>
<p>Aqui, 𝑁 representa o número de rotas de recuperação diferentes, rank𝑖(𝑑) é a posição de classificação do documento recuperado 𝑑 pelo 𝑖-ésimo recuperador, e 𝑘 é um parâmetro de suavização, normalmente definido para 60.</p></li>
<li><p><strong>Classificação abrangente</strong>: Classificar novamente os resultados recuperados com base nas pontuações combinadas para produzir os resultados finais.</p></li>
</ul>
<p>Para utilizar esta estratégia, aplique uma instância <code translate="no">RRFRanker</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

<span class="hljs-comment"># Default k value is 60</span>
ranker = RRFRanker()

<span class="hljs-comment"># Or specify k value</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<p>A RRF permite equilibrar a influência entre campos sem especificar pesos explícitos. As principais correspondências acordadas por vários campos terão prioridade na classificação final.</p>
