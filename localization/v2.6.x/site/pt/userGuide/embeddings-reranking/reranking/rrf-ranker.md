---
id: rrf-ranker.md
title: Classificador RRF
summary: >-
  O Reciprocal Rank Fusion (RRF) Ranker é uma estratégia de reclassificação para
  a pesquisa híbrida Milvus que equilibra os resultados de vários caminhos de
  pesquisa vetorial com base nas suas posições de classificação e não nas suas
  pontuações de semelhança brutas. Tal como um torneio desportivo que considera
  as classificações dos jogadores em vez das estatísticas individuais, o RRF
  Ranker combina resultados de pesquisa com base na classificação de cada item
  em diferentes caminhos de pesquisa, criando uma classificação final justa e
  equilibrada.
---
<h1 id="RRF-Ranker" class="common-anchor-header">Classificador RRF<button data-href="#RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>O Reciprocal Rank Fusion (RRF) Ranker é uma estratégia de reranking para a pesquisa híbrida Milvus que equilibra os resultados de vários caminhos de pesquisa vetorial com base nas suas posições de classificação em vez das suas pontuações de semelhança brutas. Como um torneio desportivo que considera as classificações dos jogadores em vez das estatísticas individuais, o RRF Ranker combina os resultados da pesquisa com base na classificação de cada item em diferentes caminhos de pesquisa, criando uma classificação final justa e equilibrada.</p>
<h2 id="When-to-use-RRF-Ranker" class="common-anchor-header">Quando usar o RRF Ranker<button data-href="#When-to-use-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>O RRF Ranker foi especificamente concebido para cenários de pesquisa híbrida em que se pretende equilibrar os resultados de vários caminhos de pesquisa vetorial sem atribuir pesos de importância explícitos. Ele é particularmente eficaz para:</p>
<table>
   <tr>
     <th><p>Caso de uso</p></th>
     <th><p>Exemplo de uso</p></th>
     <th><p>Por que o RRF Ranker funciona bem</p></th>
   </tr>
   <tr>
     <td><p>Pesquisa multimodal com igual importância</p></td>
     <td><p>Pesquisa de imagem-texto em que ambas as modalidades têm a mesma importância</p></td>
     <td><p>Equilibra os resultados sem exigir atribuições arbitrárias de pesos</p></td>
   </tr>
   <tr>
     <td><p>Pesquisa de vectores em conjunto</p></td>
     <td><p>Combinação de resultados de diferentes modelos de incorporação</p></td>
     <td><p>Combina democraticamente as classificações sem favorecer a distribuição de pontuação de nenhum modelo em particular</p></td>
   </tr>
   <tr>
     <td><p>Pesquisa multilingue</p></td>
     <td><p>Encontrar documentos em vários idiomas</p></td>
     <td><p>Classifica os resultados de forma justa, independentemente das caraterísticas de incorporação específicas do idioma</p></td>
   </tr>
   <tr>
     <td><p>Recomendações de especialistas</p></td>
     <td><p>Combinação de recomendações de vários sistemas especializados</p></td>
     <td><p>Cria classificações consensuais quando diferentes sistemas utilizam métodos de pontuação incomparáveis</p></td>
   </tr>
</table>
<p>Se a sua aplicação de pesquisa híbrida requer o equilíbrio de múltiplos caminhos de pesquisa democraticamente sem atribuir pesos explícitos, o RRF Ranker é a sua escolha ideal.</p>
<h2 id="Mechanism-of-RRF-Ranker" class="common-anchor-header">Mecanismo do RRF Ranker<button data-href="#Mechanism-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>O fluxo de trabalho principal da estratégia do RRFRanker é o seguinte:</p>
<ol>
<li><p><strong>Recolher os rankings de pesquisa</strong>: Recolhe as classificações dos resultados de cada caminho da pesquisa vetorial (rank_1, rank_2).</p></li>
<li><p><strong>Fundir classificações</strong>: Converter as classificações de cada caminho (rank_rrf_1, rank_rrf_2) de acordo com uma fórmula .</p>
<p>A fórmula de cálculo envolve <em>N</em>, que representa o número de recuperações. <em>ranki</em><em>(d</em>) é a posição na classificação do documento <em>d</em> gerada pelo <em>i(th)</em> retriever. <em>k</em> é um parâmetro de suavização normalmente fixado em 60.</p></li>
<li><p><strong>Agregação de classificações</strong>: Classifica novamente os resultados da pesquisa com base nas classificações combinadas para produzir os resultados finais.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/rrf-ranker.png" alt="Rrf Ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>Classificador RRF</span> </span></p>
<h2 id="Example-of-RRF-Ranker" class="common-anchor-header">Exemplo de RRF Ranker<button data-href="#Example-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Este exemplo demonstra uma Pesquisa Híbrida (topK=5) em vetores esparso-densos e ilustra como a estratégia RRFRanker reordena os resultados de duas pesquisas ANN.</p>
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
<li>Utilize a FRR para reorganizar as classificações dos dois conjuntos de resultados de pesquisa. Suponha que o parâmetro de suavização <code translate="no">k</code> está definido para 60.</li>
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
<h2 id="Usage-of-RRF-Ranker" class="common-anchor-header">Utilização do RRF Ranker<button data-href="#Usage-of-RRF-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao utilizar a estratégia de classificação RRF, é necessário configurar o parâmetro <code translate="no">k</code>. Trata-se de um parâmetro de suavização que pode alterar efetivamente os pesos relativos da pesquisa de texto integral em relação à pesquisa vetorial. O valor padrão deste parâmetro é 60, e pode ser ajustado dentro de um intervalo de (0, 16384). O valor deve ser um número de ponto flutuante. O valor recomendado é entre [10, 100]. Embora <code translate="no">k=60</code> seja uma escolha comum, o valor ideal de <code translate="no">k</code> pode variar dependendo das suas aplicações e conjuntos de dados específicos. Recomendamos testar e ajustar esse parâmetro com base no seu caso de uso específico para obter o melhor desempenho.</p>
<h3 id="Create-an-RRF-Ranker" class="common-anchor-header">Criar um classificador RRF</h3><p>Depois de a sua coleção estar configurada com vários campos vectoriais, crie um RRF Ranker com um parâmetro de suavização adequado:</p>
<div class="alert note">
<p>O Milvus 2.6.x e posteriores permitem-lhe configurar estratégias de reranking diretamente através da API <code translate="no">Function</code>. Se estiver a utilizar uma versão anterior (antes da v2.6.0), consulte a documentação <a href="https://milvus.io/docs/2.5.x/reranking.md#Reranking">do Reranking</a> para obter instruções de configuração.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;rrf&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>, 
        <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>  <span class="hljs-comment"># Optional</span>
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
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Lista de campos vectoriais aos quais aplicar a função (deve estar vazia para o RRF Ranker)</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sim</p></td>
     <td><p>O tipo de função a invocar; utilizar <code translate="no">RERANK</code> para especificar uma estratégia de classificação</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Especifica o método de reranking a utilizar. Deve ser definido como <code translate="no">rrf</code> para utilizar o RRF Ranker.</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.k</code></p></td>
     <td><p>Não</p></td>
     <td><p>Parâmetro de suavização que controla o impacto das classificações dos documentos; um <code translate="no">k</code> mais elevado reduz a sensibilidade às classificações de topo. Intervalo: (0, 16384); predefinição: <code translate="no">60</code>. Para mais pormenores, consulte <a href="/docs/pt/rrf-ranker.md#Mechanism-of-RRF-Ranker">Mecanismo do RRF Ranker</a>.</p></td>
     <td><p><code translate="no">100</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Aplicar à pesquisa híbrida</h3><p>O RRF Ranker foi concebido especificamente para operações de pesquisa híbrida que combinam vários campos vectoriais. Veja como usá-lo em uma busca híbrida:</p>
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

<span class="hljs-comment"># Apply RRF Ranker to product hybrid search</span>
<span class="hljs-comment"># The smoothing parameter k controls the balance</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=ranker,  <span class="hljs-comment"># Apply the RRF ranker</span></span>
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
<p>Para obter mais informações sobre a pesquisa híbrida, consulte <a href="/docs/pt/multi-vector-search.md">Pesquisa Híbrida Multi-Vetorial</a>.</p>
