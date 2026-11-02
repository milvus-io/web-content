---
id: decay-ranker-overview.md
title: Visão geral do Decay RankerCompatible with Milvus 2.6.x
summary: >-
  Na pesquisa vetorial tradicional, os resultados são classificados
  exclusivamente com base na semelhança vetorial — ou seja, no grau de
  correspondência entre os vetores no espaço matemático. No entanto, nas
  aplicações do mundo real, o que torna um conteúdo verdadeiramente relevante
  depende, muitas vezes, de mais do que apenas a semelhança semântica.
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
    </button></h1><p>Na pesquisa vetorial tradicional, os resultados são classificados exclusivamente com base na semelhança vetorial — ou seja, no grau de correspondência entre os vetores no espaço matemático. No entanto, em aplicações do mundo real, o que torna um conteúdo verdadeiramente relevante depende frequentemente de mais do que apenas a semelhança semântica.</p>
<p>Considere estes cenários do dia a dia:</p>
<ul>
<li><p>Uma pesquisa de notícias em que o artigo de ontem deve ter uma classificação mais elevada do que um artigo semelhante de há três anos</p></li>
<li><p>Um localizador de restaurantes que dá prioridade a estabelecimentos a 5 minutos de distância em detrimento daqueles que exigem uma viagem de 30 minutos de carro</p></li>
<li><p>Uma plataforma de comércio eletrónico que destaca produtos em destaque, mesmo quando estes são ligeiramente menos semelhantes à consulta de pesquisa</p></li>
</ul>
<p>Todos estes cenários partilham uma necessidade comum: equilibrar a semelhança vetorial com outros fatores numéricos, como o tempo, a distância ou a popularidade.</p>
<p>Os «decay rankers» do Milvus respondem a esta necessidade, ajustando as classificações de pesquisa com base em valores numéricos dos campos. Permitem-lhe equilibrar a semelhança vetorial com a «atualidade», a «proximidade» ou outras propriedades numéricas dos seus dados, criando experiências de pesquisa mais intuitivas e contextualmente relevantes.</p>
<h2 id="Usage-notes" class="common-anchor-header">Notas de utilização<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p>A classificação por decaimento não pode ser utilizada com pesquisas agrupadas.</p></li>
<li><p>O campo utilizado para a classificação por decaimento deve ser numérico (<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code> ou <code translate="no">DOUBLE</code>).</p></li>
<li><p>Cada classificador de decaimento só pode utilizar um campo numérico.</p></li>
<li><p><strong>Consistência das unidades de tempo</strong>: Ao utilizar a classificação por decaimento baseada no tempo, as unidades dos parâmetros <code translate="no">origin</code>, <code translate="no">scale</code> e <code translate="no">offset</code> devem corresponder às unidades utilizadas nos dados da sua coleção:</p>
<ul>
<li><p>Se a sua coleção armazenar carimbos de data/hora em <strong>segundos</strong>, utilize segundos para todos os parâmetros</p></li>
<li><p>Se a sua coleção armazenar carimbos de data/hora em <strong>milissegundos</strong>, utilize milissegundos para todos os parâmetros</p></li>
<li><p>Se a sua coleção armazenar carimbos de data/hora em <strong>microssegundos</strong>, utilize microssegundos para todos os parâmetros</p></li>
</ul></li>
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
    </button></h2><p>A classificação por decaimento melhora a pesquisa vetorial tradicional ao incorporar fatores numéricos, como o tempo ou a distância geográfica, no processo de classificação. Todo o processo segue estas etapas:</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">Etapa 1: Calcular pontuações de similaridade normalizadas<button data-href="#Stage-1-Calculate-normalized-similarity-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Em primeiro lugar, o Milvus calcula e normaliza os índices de similaridade vetorial para garantir uma comparação consistente:</p>
<ul>
<li><p>Para as métricas de distância <strong>L2</strong> e <strong>JACCARD</strong> (em que valores mais baixos indicam maior semelhança):</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>Isto transforma as distâncias em pontuações de similaridade entre 0 e 1, sendo que quanto mais elevada, melhor.</p></li>
<li><p>Para as métricas <strong>IP</strong>, <strong>COSINE</strong> e <strong>BM25</strong> (em que pontuações mais elevadas já indicam melhores correspondências): As pontuações são utilizadas diretamente, sem normalização.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">Fase 2: Calcular os índices de decaimento<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Em seguida, o Milvus calcula uma pontuação de decaimento com base no valor numérico do campo (como data e hora ou distância), utilizando o classificador de decaimento selecionado:</p>
<ul>
<li><p>Cada classificador de decaimento transforma valores numéricos brutos em pontuações de relevância normalizadas entre 0 e 1</p></li>
<li><p>A pontuação de decaimento representa a relevância de um item com base na sua «distância» em relação ao ponto ideal</p></li>
</ul>
<p>A fórmula de cálculo específica varia consoante o tipo de classificador de decaimento. Para mais detalhes sobre como calcular uma pontuação de decaimento, consulte as páginas dedicadas ao <a href="/docs/pt/gaussian-decay.md#Formula">Decaimento Gaussiano</a>, ao <a href="/docs/pt/exponential-decay.md#Formula">Decaimento Exponencial</a> e ao <a href="/docs/pt/linear-decay.md#Formula">Decaimento Linear</a>.</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">Fase 3: Calcular as pontuações finais<button data-href="#Stage-3-Compute-final-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Por fim, o Milvus combina a pontuação de similaridade normalizada e a pontuação de decaimento para produzir a pontuação de classificação final:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Nos casos de pesquisa híbrida (que combina vários campos vetoriais), o Milvus considera a pontuação de similaridade normalizada máxima entre os pedidos de pesquisa:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Por exemplo, se um artigo de investigação obtiver uma pontuação de 0,82 na semelhança vetorial e de 0,91 na recuperação de texto baseada em BM25 numa pesquisa híbrida, o Milvus utiliza 0,91 como pontuação de semelhança de base antes de aplicar o fator de decaimento.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">A classificação com decaimento em ação<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>Vamos ver a classificação por decaimento num cenário prático — a pesquisa por <strong>«artigos de investigação sobre IA»</strong> com decaimento baseado no tempo:</p>
<div class="alert note">
<p>Neste exemplo, as pontuações de decaimento refletem como a relevância diminui com o tempo — os artigos mais recentes recebem pontuações mais próximas de 1,0, enquanto os artigos mais antigos recebem pontuações mais baixas. Estes valores são calculados utilizando um classificador de decaimento específico. Para mais detalhes, consulte <a href="/docs/pt/decay-ranker-overview.md#Choose-the-right-decay-ranker">«Escolher o classificador de decaimento adequado</a>».</p>
</div>
<table>
   <tr>
     <th><p>Artigo</p></th>
     <th><p>Semelhança vetorial</p></th>
     <th><p>Pontuação de similaridade normalizada</p></th>
     <th><p>Data de publicação</p></th>
     <th><p>Pontuação de decaimento</p></th>
     <th><p>Pontuação final</p></th>
     <th><p>Classificação final</p></th>
   </tr>
   <tr>
     <td><p>Artigo A</p></td>
     <td><p>Elevado</p></td>
     <td><p>0,85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Há 2 semanas</p></td>
     <td><p>0,80</p></td>
     <td><p>0,68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Prova B</p></td>
     <td><p>Muito elevado</p></td>
     <td><p>0,92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Há 6 meses</p></td>
     <td><p>0,45</p></td>
     <td><p>0,41</p></td>
     <td>4</td>
   </tr>
   <tr>
     <td><p>Artigo C</p></td>
     <td><p>Médio</p></td>
     <td><p>0,75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Há 1 dia</p></td>
     <td><p>0,98</p></td>
     <td><p>0,74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>Artigo D</p></td>
     <td><p>Médio-Alto</p></td>
     <td><p>0,76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Há 3 semanas</p></td>
     <td><p>0,70</p></td>
     <td><p>0,53</p></td>
     <td>3</td>
   </tr>
</table>
<p>Sem a reclassificação por decaimento, o Artigo B ocuparia a posição mais elevada com base na semelhança vetorial pura (0,92). No entanto, com a reclassificação por decaimento aplicada:</p>
<ul>
<li><p>O Artigo C salta para a 1.ª posição, apesar da semelhança média, porque é muito recente (publicado ontem)</p></li>
<li><p>O Artigo B desce para a 4.ª posição, apesar da excelente semelhança, porque é relativamente antigo</p></li>
<li><p>O Artigo D utiliza a semelhança COSINE, pelo que a sua pontuação de 0,76 é utilizada diretamente antes da aplicação do decaimento</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">Escolha o sistema de reclassificação por decaimento adequado<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus oferece diferentes sistemas de reclassificação por decaimento — <code translate="no">gauss</code>, <code translate="no">exp</code>, <code translate="no">linear</code> —, cada um concebido para casos de utilização específicos:</p>
<table>
   <tr>
     <th><p>Classificador de decaimento</p></th>
     <th><p>Características</p></th>
     <th><p>Casos de utilização ideais</p></th>
     <th><p>Cenário de exemplo</p></th>
   </tr>
   <tr>
     <td><p>Gaussiano (<code translate="no">gauss</code>)</p></td>
     <td><p>Declínio gradual com sensação natural que se estende moderadamente</p></td>
     <td><ul><li><p>Pesquisas gerais que exigem resultados equilibrados</p></li><li><p>Aplicações em que os utilizadores têm uma noção intuitiva de distância</p></li><li><p>Quando uma distância moderada não deve penalizar gravemente os resultados</p></li></ul></td>
     <td><p>Numa pesquisa de restaurantes, estabelecimentos de qualidade a 3 km de distância continuam a ser encontráveis, embora sejam classificados abaixo das opções mais próximas</p></td>
   </tr>
   <tr>
     <td><p>Exponencial (<code translate="no">exp</code>)</p></td>
     <td><p>Diminui rapidamente no início, mas mantém uma cauda longa</p></td>
     <td><ul><li><p>Feeds de notícias em que a atualidade é fundamental</p></li><li><p>Redes sociais onde o conteúdo recente deve predominar</p></li><li><p>Quando a proximidade é fortemente preferida, mas itens distantes excecionais devem permanecer visíveis</p></li></ul></td>
     <td><p>Numa aplicação de notícias, as notícias de ontem têm uma classificação muito superior à do conteúdo com uma semana, mas artigos mais antigos altamente relevantes podem ainda assim aparecer</p></td>
   </tr>
   <tr>
     <td><p>Linear (<code translate="no">linear</code>)</p></td>
     <td><p>Declínio consistente e previsível com um limite claro</p></td>
     <td><ul><li><p>Aplicações com limites naturais</p></li><li><p>Serviços com limites de distância</p></li><li><p>Conteúdo com datas de validade ou limites claros</p></li></ul></td>
     <td><p>Num localizador de eventos, os eventos que se situem para além de um intervalo de duas semanas no futuro simplesmente não aparecem</p></td>
   </tr>
</table>
<p>Para obter informações detalhadas sobre a forma como cada sistema de classificação de decaimento calcula pontuações e padrões específicos de declínio, consulte a documentação dedicada:</p>
<ul>
<li><p><a href="/docs/pt/gaussian-decay.md">Decaimento gaussiano</a></p></li>
<li><p><a href="/docs/pt/exponential-decay.md">Decaimento exponencial</a></p></li>
<li><p><a href="/docs/pt/linear-decay.md">Decaimento linear</a></p></li>
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
    </button></h2><p>Os classificadores de decaimento podem ser aplicados tanto a operações de pesquisa vetorial padrão como a operações de pesquisa híbrida no Milvus. Seguem-se os principais trechos de código para implementar esta funcionalidade.</p>
<div class="alert note">
<p>Antes de utilizar funções de decaimento, deve primeiro criar uma coleção com campos numéricos adequados (como carimbos de data/hora, distâncias, etc.) que serão utilizados para os cálculos de decaimento. Para exemplos práticos completos, incluindo a configuração da coleção, a definição do esquema e a inserção de dados, consulte <a href="/docs/pt/tutorial-implement-a-time-based-ranking-in-milvus.md">o Tutorial: Implementar uma classificação baseada no tempo no Milvus</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Criar um classificador de decaimento<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Para implementar a classificação com decaimento, defina primeiro um objeto ` <code translate="no">Function</code> ` com a configuração adequada:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> datetime

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
rerank = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).timestamp()),    <span class="hljs-comment"># Reference point (seconds)</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds (must match collection data unit)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone (must match collection data unit)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.DecayRanker;
<span class="hljs-keyword">import</span> java.time.ZoneId;
<span class="hljs-keyword">import</span> java.time.ZonedDateTime;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ZonedDateTime</span> <span class="hljs-variable">zdt</span> <span class="hljs-operator">=</span> ZonedDateTime.of(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">25</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, ZoneId.systemDefault());

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;timestamp&quot;</span>))
        .function(<span class="hljs-string">&quot;gauss&quot;</span>)
        .origin(zdt.toInstant().getEpochSecond())
        .scale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .offset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .decay(<span class="hljs-number">0.5</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;time_decay&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function&quot;</span>, <span class="hljs-string">&quot;gauss&quot;</span>).
    WithParam(<span class="hljs-string">&quot;origin&quot;</span>, <span class="hljs-number">1735689600</span>).
    WithParam(<span class="hljs-string">&quot;scale&quot;</span>, <span class="hljs-number">7</span>*<span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;offset&quot;</span>, <span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;decay&quot;</span>, <span class="hljs-number">0.5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = DecayRerank::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">function</span>(Function::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;timestamp&quot;</span>])
        .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
        .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>))
    .<span class="hljs-title function_ invoke__">decay_function</span>(<span class="hljs-string">&quot;gauss&quot;</span>)
    .<span class="hljs-title function_ invoke__">origin</span>(<span class="hljs-number">1735689600</span>)
    .<span class="hljs-title function_ invoke__">scale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">offset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">decay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::DecayRerank&gt;(<span class="hljs-string">&quot;time_decay&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;timestamp&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFunction</span>(<span class="hljs-string">&quot;gauss&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetOrigin</span>(<span class="hljs-number">1735689600</span>);
rerank-&gt;<span class="hljs-built_in">SetScale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetOffset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetDecay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;time_decay&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;gauss&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">UTC</span>(<span class="hljs-number">2025</span>, <span class="hljs-number">0</span>, <span class="hljs-number">15</span>) / <span class="hljs-number">1000</span>),
    <span class="hljs-attr">scale</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">offset</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Create a decay function for timestamp-based decay</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> DecayRerank(<span class="hljs-string">&quot;time_decay&quot;</span>)     <span class="hljs-comment">// Function identifier</span>
    .WithInputField(<span class="hljs-string">&quot;timestamp&quot;</span>)                <span class="hljs-comment">// Numeric field to use for decay</span>
    .WithFunction(<span class="hljs-string">&quot;gauss&quot;</span>)                       <span class="hljs-comment">// Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
    .WithOrigin(<span class="hljs-keyword">new</span> DateTimeOffset(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, TimeSpan.Zero).ToUnixTimeSeconds()) <span class="hljs-comment">// Reference point (seconds)</span>
    .WithScale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                 <span class="hljs-comment">// 7 days in seconds (must match collection data unit)</span>
    .WithOffset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                    <span class="hljs-comment">// 1 day no-decay zone (must match collection data unit)</span>
    .WithDecay(<span class="hljs-number">0.5f</span>);                            <span class="hljs-comment">// Half score at scale distance</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Obrigatório?</p></th>
     <th><p>Descrição</p></th>
     <th><p>Valor/Exemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Identificador da sua função utilizado na execução de pesquisas. Escolha um nome descritivo e relevante para o seu caso de utilização.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Campo numérico para o cálculo da pontuação de decaimento. Determina qual o atributo de dados que será utilizado para calcular o decaimento (por exemplo, carimbos de data/hora para decaimento baseado no tempo, coordenadas para decaimento baseado na localização). </p><p>Tem de ser um campo da sua coleção que contenha valores numéricos relevantes. Suporta INT8/16/32/64, FLOAT, DOUBLE.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Especifica o tipo de função que está a ser criada.</p><p>Deve ser definido como « <code translate="no">RERANK</code> » para todos os classificadores de decaimento.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Especifica o método de reclassificação a utilizar.</p><p>Deve ser definido como « <code translate="no">"decay"</code> » para ativar a funcionalidade de classificação por decaimento.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Especifica qual o classificador de decaimento matemático a aplicar. Determina a forma da curva de declínio da relevância.</p><p>Consulte a secção <a href="/docs/pt/decay-ranker-overview.md#Choose-the-right-decay-ranker">«Escolher o classificador de decaimento adequado»</a> para obter orientações sobre a seleção da função apropriada.</p></td>
     <td><p><code translate="no">"gauss"</code>, « <code translate="no">"exp"</code> » ou <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Ponto de referência a partir do qual a pontuação de decaimento é calculada. Os itens com este valor recebem pontuações máximas de relevância.</p><p>Para o decaimento baseado no tempo, a unidade de tempo deve corresponder aos dados da sua coleção.</p></td>
     <td><ul><li><p>Para carimbos de data/hora: hora atual (por exemplo, <code translate="no">int(time.time())</code>)</p></li><li><p>Para geolocalização: coordenadas atuais do utilizador</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Distância ou tempo a partir do qual a relevância desce para o valor <code translate="no">decay</code>. Controla a rapidez com que a relevância diminui.</p><p>Para a diminuição baseada no tempo, a unidade de tempo deve corresponder aos seus dados de recolha.</p><p>Valores mais elevados resultam num declínio mais gradual da relevância; valores mais baixos resultam num declínio mais acentuado.</p></td>
     <td><ul><li><p>Para o tempo: período em segundos (por exemplo, <code translate="no">7 * 24 * 60 * 60</code> para 7 dias)</p></li><li><p>Para a distância: metros (por exemplo, <code translate="no">5000</code> para 5 km)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>Não</p></td>
     <td><p>Cria uma «zona sem decaimento» em torno do <code translate="no">origin</code>, onde os itens mantêm pontuações completas (pontuação de decaimento = 1,0).</p><p>Para a deterioração baseada no tempo, a unidade de tempo deve corresponder aos dados da sua coleção.</p><p>Os itens dentro deste intervalo em torno de <code translate="no">origin</code> mantêm a relevância máxima.</p></td>
     <td><ul><li><p>Para o tempo: período em segundos (por exemplo, <code translate="no">24 * 60 * 60</code> por 1 dia)</p></li><li><p>Para a distância: metros (por exemplo, <code translate="no">500</code> para 500 m)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>Não</p></td>
     <td><p>O valor da pontuação na distância « <code translate="no">scale</code> » controla a inclinação da curva. Valores mais baixos criam curvas de declínio mais acentuadas; valores mais elevados criam curvas de declínio mais graduais.</p><p>Deve estar entre 0 e 1.</p></td>
     <td><p><code translate="no">0.5</code> (padrão)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Aplicar à pesquisa vetorial padrão<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Depois de definir o seu classificador de decaimento, pode aplicá-lo durante as operações de pesquisa, passando-o para o parâmetro ` <code translate="no">ranker</code> `:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=rerank,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;search query&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

functionScore := entity.NewFunctionScore().AddFunction(rerank)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    collection_name, <span class="hljs-comment">// collection name</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit</span>
    []entity.Vector{your_query_vector}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;vector_field&quot;</span>).
    WithFunctionScore(functionScore).
    WithOutputFields(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">function_score</span> = FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank);
<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[your_query_vector]))
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>])
    .<span class="hljs-title function_ invoke__">rerank</span>(function_score)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;document&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;timestamp&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(your_query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [your_query_vector], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector_field&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Use the decay function in standard vector search</span>
SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    Vectors = [yourQueryVector], <span class="hljs-comment">// Replace with your query vector</span>
    VectorFieldName = <span class="hljs-string">&quot;vector_field&quot;</span>,
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span> },  <span class="hljs-comment">// Include the decay field in outputs to see values</span>
        FunctionScoreReranker = rerank,              <span class="hljs-comment">// Apply the decay ranker here</span>
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
