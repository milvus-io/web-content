---
id: decay-ranker-overview.md
title: Visão geral do Decay RankerCompatible with Milvus 2.6.x
summary: >-
  Na pesquisa vetorial tradicional, os resultados são classificados apenas pela
  semelhança vetorial - a proximidade dos vectores no espaço matemático. Mas em
  aplicações do mundo real, o que torna o conteúdo verdadeiramente relevante
  depende muitas vezes de mais do que apenas a semelhança semântica.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">Visão geral do Decay Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Na pesquisa vetorial tradicional, os resultados são classificados puramente pela similaridade vetorial - a proximidade dos vetores no espaço matemático. Mas em aplicações do mundo real, o que torna o conteúdo verdadeiramente relevante depende muitas vezes de mais do que apenas a semelhança semântica.</p>
<p>Considere estes cenários quotidianos:</p>
<ul>
<li><p>Uma pesquisa de notícias em que o artigo de ontem deve ter uma classificação mais elevada do que um artigo semelhante de há três anos</p></li>
<li><p>Um localizador de restaurantes que dá prioridade a locais a 5 minutos de distância em vez daqueles que requerem uma viagem de 30 minutos</p></li>
<li><p>Uma plataforma de comércio eletrónico que dá prioridade aos produtos mais populares, mesmo quando são ligeiramente menos semelhantes à consulta de pesquisa</p></li>
</ul>
<p>Todos estes cenários partilham uma necessidade comum: equilibrar a semelhança de vectores com outros factores numéricos como o tempo, a distância ou a popularidade.</p>
<p>Os Decay Rankers do Milvus respondem a esta necessidade ajustando as classificações de pesquisa com base em valores de campo numéricos. Permitem-lhe equilibrar a semelhança vetorial com a "frescura", a "proximidade" ou outras propriedades numéricas dos seus dados, criando experiências de pesquisa mais intuitivas e contextualmente relevantes.</p>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>A classificação de decaimento não pode ser utilizada com pesquisas de agrupamento.</p></li>
<li><p>O campo utilizado para a classificação de decaimento tem de ser numérico (<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, ou <code translate="no">DOUBLE</code>).</p></li>
<li><p>Cada classificador de desvalorização só pode utilizar um campo numérico.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Como funciona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>A classificação decrescente melhora a pesquisa vetorial tradicional ao incorporar factores numéricos como o tempo ou a distância geográfica no processo de classificação. O processo completo segue as seguintes etapas:</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">Etapa 1: Calcular as pontuações de semelhança normalizadas</h3><p>Primeiro, o Milvus calcula e normaliza as pontuações de similaridade dos vectores para garantir uma comparação consistente:</p>
<ul>
<li><p>Para as métricas de distância <strong>L2</strong> e <strong>JACCARD</strong> (em que valores mais baixos indicam maior semelhança):</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>Isto transforma as distâncias em pontuações de semelhança entre 0-1, em que quanto maior for, melhor.</p></li>
<li><p>Para as métricas <strong>IP</strong>, <strong>COSINE</strong> e <strong>BM25</strong> (em que pontuações mais altas já indicam melhores correspondências): As pontuações são usadas diretamente sem normalização.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">Etapa 2: Calcular as pontuações de decaimento</h3><p>Em seguida, o Milvus calcula uma pontuação de deterioração com base no valor do campo numérico (como carimbo de data/hora ou distância) utilizando o classificador de deterioração selecionado:</p>
<ul>
<li><p>Cada classificador de deterioração transforma valores numéricos brutos em pontuações de relevância normalizadas entre 0-1</p></li>
<li><p>A pontuação de deterioração representa o grau de relevância de um item com base na sua "distância" do ponto ideal</p></li>
</ul>
<p>A fórmula de cálculo específica varia consoante o tipo de classificador de deterioração. Para obter detalhes sobre como calcular uma pontuação de decaimento, consulte as páginas dedicadas ao <a href="/docs/pt/gaussian-decay.md#Formula">Decaimento gaussiano</a>, Decaimento <a href="/docs/pt/exponential-decay.md#Formula">exponencial</a> e <a href="/docs/pt/linear-decay.md#Formula">Decaimento linear</a>.</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">Etapa 3: Calcular as pontuações finais</h3><p>Finalmente, o Milvus combina a pontuação de similaridade normalizada e a pontuação de decaimento para produzir a pontuação de classificação final:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Nos casos de pesquisa híbrida (combinando vários campos vectoriais), o Milvus utiliza a pontuação máxima de similaridade normalizada entre os pedidos de pesquisa:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Por exemplo, se um artigo de investigação tiver uma pontuação de 0,82 na similaridade vetorial e 0,91 na recuperação de texto com base no BM25 numa pesquisa híbrida, o Milvus utiliza 0,91 como pontuação de similaridade de base antes de aplicar o fator de decaimento.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">Classificação decrescente em ação</h3><p>Vejamos a classificação decrescente num cenário prático - pesquisa de <strong>"artigos de investigação de IA"</strong> com decrescimento baseado no tempo:</p>
<div class="alert note">
<p>Neste exemplo, as pontuações de decaimento reflectem a forma como a relevância diminui com o tempo - os documentos mais recentes recebem pontuações mais próximas de 1,0, os documentos mais antigos recebem pontuações mais baixas. Estes valores são calculados utilizando um classificador de decaimento específico. Para obter detalhes, consulte <a href="/docs/pt/decay-ranker-overview.md#Choose-the-right-decay-ranker">Escolher o classificador de deterioração correto</a>.</p>
</div>
<table>
   <tr>
     <th><p>Artigo</p></th>
     <th><p>Similaridade do vetor</p></th>
     <th><p>Pontuação de similaridade normalizada</p></th>
     <th><p>Data de publicação</p></th>
     <th><p>Pontuação de decaimento</p></th>
     <th><p>Pontuação final</p></th>
     <th><p>Classificação final</p></th>
   </tr>
   <tr>
     <td><p>Papel A</p></td>
     <td><p>Alta</p></td>
     <td><p>0,85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>2 semanas atrás</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Papel B</p></td>
     <td><p>Muito elevado</p></td>
     <td><p>0,92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>6 meses atrás</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>Papel C</p></td>
     <td><p>Média</p></td>
     <td><p>0.75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>1 dia atrás</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>Papel D</p></td>
     <td><p>Médio-Alto</p></td>
     <td><p>0.76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>3 semanas atrás</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>
<p>Sem o decay reranking, o Documento B teria a classificação mais elevada com base na semelhança vetorial pura (0,92). No entanto, com a classificação decrescente aplicada:</p>
<ul>
<li><p>O artigo C salta para a posição #1, apesar da similaridade média, porque é muito recente (publicado ontem)</p></li>
<li><p>O artigo B desce para a posição #3, apesar da excelente semelhança, porque é relativamente antigo</p></li>
<li><p>O artigo D utiliza a distância L2 (em que quanto menor for, melhor), pelo que a sua pontuação é normalizada de 1,2 para 0,76 antes de aplicar a desclassificação</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">Escolher o classificador de decaimento correto<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>A Milvus oferece diferentes classificadores de desvalorização - <code translate="no">gauss</code>, <code translate="no">exp</code>, <code translate="no">linear</code>, cada um concebido para casos de utilização específicos:</p>
<table>
   <tr>
     <th><p>Classificador de decaimento</p></th>
     <th><p>Caraterísticas</p></th>
     <th><p>Casos de uso ideais</p></th>
     <th><p>Cenário de exemplo</p></th>
   </tr>
   <tr>
     <td><p>Gaussiano (<code translate="no">gauss</code>)</p></td>
     <td><p>Declínio gradual natural que se estende moderadamente</p></td>
     <td><ul>
<li><p>Pesquisas gerais que requerem resultados equilibrados</p></li>
<li><p>Aplicações em que os utilizadores têm uma noção intuitiva da distância</p></li>
<li><p>Quando a distância moderada não deve penalizar severamente os resultados</p></li>
</ul></td>
     <td><p>Numa pesquisa de restaurantes, os locais de qualidade a 3 km de distância permanecem detectáveis, embora com uma classificação inferior às opções mais próximas</p></td>
   </tr>
   <tr>
     <td><p>Exponencial (<code translate="no">exp</code>)</p></td>
     <td><p>Diminui rapidamente no início, mas mantém uma cauda longa</p></td>
     <td><ul>
<li><p>Feeds de notícias, onde a atualidade é fundamental</p></li>
<li><p>Redes sociais onde o conteúdo fresco deve dominar</p></li>
<li><p>Quando a proximidade é fortemente preferida, mas os itens excecionalmente distantes devem permanecer visíveis</p></li>
</ul></td>
     <td><p>Numa aplicação de notícias, as histórias de ontem têm uma classificação muito mais elevada do que o conteúdo de uma semana atrás, mas ainda podem aparecer artigos mais antigos altamente relevantes</p></td>
   </tr>
   <tr>
     <td><p>Linear (<code translate="no">linear</code>)</p></td>
     <td><p>Declínio consistente e previsível com um corte claro</p></td>
     <td><ul>
<li><p>Aplicações com limites naturais</p></li>
<li><p>Serviços com limites de distância</p></li>
<li><p>Conteúdos com datas de expiração ou limites claros</p></li>
</ul></td>
     <td><p>Num localizador de eventos, os eventos para além de uma janela futura de duas semanas simplesmente não aparecem</p></td>
   </tr>
</table>
<p>Para obter informações detalhadas sobre como cada classificador de decaimento calcula as pontuações e os padrões de declínio específicos, consulte a documentação dedicada:</p>
<ul>
<li><p><a href="/docs/pt/gaussian-decay.md">Decaimento Gaussiano</a></p></li>
<li><p><a href="/docs/pt/exponential-decay.md">Decaimento exponencial</a></p></li>
<li><p><a href="/docs/pt/exponential-decay.md">Decaimento exponencial</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">Exemplo de implementação<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>Os classificadores de decaimento podem ser aplicados tanto à pesquisa vetorial padrão como às operações de pesquisa híbrida em Milvus. Abaixo estão os principais trechos de código para implementar esse recurso.</p>
<div class="alert note">
<p>Antes de utilizar as funções de decaimento, deve primeiro criar uma coleção com campos numéricos apropriados (como carimbos de data/hora, distâncias, etc.) que serão utilizados para cálculos de decaimento. Para obter exemplos de trabalho completos, incluindo a configuração da coleção, a definição do esquema e a inserção de dados, consulte <a href="/docs/pt/tutorial-implement-a-time-based-ranking-in-milvus.md">Tutorial: Implementar classificação baseada no tempo em Milvus</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Criar um classificador de decaimento</h3><p>Para implementar a classificação por decaimento, primeiro defina um objeto <code translate="no">Function</code> com a configuração apropriada:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
decay_ranker = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: current_timestamp,    <span class="hljs-comment"># Reference point (current time)</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
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
     <td><p>Identificador da sua função utilizado na execução de pesquisas. Escolha um nome descritivo relevante para o seu caso de utilização.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Campo numérico para cálculo da pontuação de decaimento. Determina que atributo de dados será utilizado para calcular a deterioração (por exemplo, carimbos de data/hora para deterioração baseada no tempo, coordenadas para deterioração baseada na localização). 
 Tem de ser um campo na sua coleção que contenha valores numéricos relevantes. Suporta INT8/16/32/64, FLOAT, DOUBLE.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Especifica o tipo de função que está a ser criada. Deve ser definido como <code translate="no">RERANK</code> para todos os classificadores de decaimento.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Especifica o método de classificação a utilizar. Tem de ser definido para <code translate="no">"decay"</code> para ativar a funcionalidade de classificação decrescente.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Especifica qual o classificador matemático de redução a aplicar. Determina a forma da curva de declínio da relevância. Consulte a secção <a href="/docs/pt/decay-ranker-overview.md#Choose-the-right-decay-ranker">Escolher o classificador de decaimento correto</a> para obter orientação sobre como selecionar a função adequada.</p></td>
     <td><p><code translate="no">"gauss"</code>, <code translate="no">"exp"</code>, ou <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Ponto de referência a partir do qual a pontuação de decaimento é calculada. Os itens com este valor recebem pontuações de relevância máxima.</p></td>
     <td><ul>
<li>Para carimbos de data/hora: hora atual (por exemplo, <code translate="no">int(time.time())</code>)</li>
<li>Para geolocalização: coordenadas actuais do utilizador</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Distância ou tempo em que a relevância cai para o valor <code translate="no">decay</code>. Controla a rapidez com que a relevância diminui. Valores maiores criam um declínio mais gradual na relevância; valores menores criam um declínio mais acentuado.</p></td>
     <td><ul>
<li>Para o tempo: período em segundos (por exemplo, <code translate="no">7 * 24 * 60 * 60</code> durante 7 dias)</li>
<li>Para distância: metros (por exemplo, <code translate="no">5000</code> para 5km)</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>Não</p></td>
     <td><p>Cria uma "zona sem decaimento" em torno de <code translate="no">origin</code> onde os itens mantêm a pontuação total (pontuação de decaimento = 1,0). Os itens dentro deste intervalo de <code translate="no">origin</code> mantêm a relevância máxima.</p></td>
     <td><ul>
<li>Para o tempo: período em segundos (por exemplo, <code translate="no">24 * 60 * 60</code> durante 1 dia)</li>
<li>Para distância: metros (por exemplo, <code translate="no">500</code> para 500m)</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>Não</p></td>
     <td><p>Valor da pontuação na distância <code translate="no">scale</code>, controla a inclinação da curva. Valores mais baixos criam curvas de declínio mais acentuadas; valores mais altos criam curvas de declínio mais graduais. Deve estar entre 0 e 1.</p></td>
     <td><p><code translate="no">0.5</code> (predefinição)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Aplicar à pesquisa vetorial padrão</h3><p>Depois de definir o seu classificador de decaimento, pode aplicá-lo durante as operações de pesquisa, passando-o para o parâmetro <code translate="no">ranker</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Aplicar à pesquisa híbrida</h3><p>Os classificadores de decaimento também podem ser aplicados a operações de pesquisa híbrida que combinam vários campos vectoriais:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Same decay ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Na pesquisa híbrida, o Milvus encontra primeiro a pontuação máxima de semelhança de todos os campos vectoriais e, em seguida, aplica o fator de decaimento a essa pontuação.</p>
