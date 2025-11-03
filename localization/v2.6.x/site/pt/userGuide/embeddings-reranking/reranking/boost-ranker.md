---
id: boost-ranker.md
title: Boost RankerCompatible with Milvus v2.6.2+
summary: >-
  Em vez de se basear apenas na semelhança semântica calculada com base em
  distâncias vectoriais, os Boost Rankers permitem-lhe influenciar os resultados
  da pesquisa de forma significativa. É ideal para ajustar rapidamente os
  resultados da pesquisa utilizando a filtragem de metadados.
beta: Milvus v2.6.2+
---
<h1 id="Boost-Ranker" class="common-anchor-header">Boost Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Em vez de depender apenas da semelhança semântica calculada com base em distâncias vectoriais, os Boost Rankers permitem-lhe influenciar os resultados da pesquisa de uma forma significativa. É ideal para ajustar rapidamente os resultados da pesquisa utilizando a filtragem de metadados.</p>
<p>Quando um pedido de pesquisa inclui uma função Boost Ranker, o Milvus utiliza a condição de filtragem opcional dentro da função para encontrar correspondências entre os candidatos a resultados de pesquisa e aumenta as pontuações dessas correspondências aplicando o peso especificado, ajudando a promover ou rebaixar as classificações das entidades correspondentes no resultado final.</p>
<h2 id="When-to-use-Boost-Ranker" class="common-anchor-header">Quando usar o Boost Ranker<button data-href="#When-to-use-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao contrário de outros classificadores que dependem de modelos de codificadores cruzados ou algoritmos de fusão, um Boost Ranker injeta diretamente regras opcionais orientadas por metadados no processo de classificação, o que o torna mais adequado nos seguintes cenários.</p>
<table>
   <tr>
     <th><p>Caso de uso</p></th>
     <th><p>Exemplos</p></th>
     <th><p>Por que o Boost Ranker funciona bem</p></th>
   </tr>
   <tr>
     <td><p>Priorização de conteúdo orientado para o negócio</p></td>
     <td><ul><li><p>Destacar produtos premium nos resultados de pesquisa de comércio eletrónico</p></li><li><p>Aumentar a visibilidade do conteúdo com métricas de envolvimento do utilizador elevadas (tais como visualizações, gostos e partilhas)</p></li><li><p>Elevar o conteúdo recente em aplicativos de pesquisa sensíveis ao tempo</p></li><li><p>Dar prioridade a conteúdos de fontes verificadas ou fiáveis</p></li><li><p>Impulsionar os resultados que correspondem a frases exactas ou palavras-chave de elevada relevância</p></li></ul></td>
     <td rowspan="2"><p>Sem a necessidade de reconstruir índices ou modificar modelos de incorporação de vectores - operações que podem consumir muito tempo - pode promover ou despromover instantaneamente itens específicos nos resultados de pesquisa, aplicando filtros de metadados opcionais em tempo real. Este mecanismo permite classificações de pesquisa flexíveis e dinâmicas que se adaptam facilmente à evolução dos requisitos comerciais.</p></td>
   </tr>
   <tr>
     <td><p>Classificação inferior estratégica de conteúdos</p></td>
     <td><ul><li><p>Reduzir a proeminência de itens com pouco inventário sem os remover completamente</p></li><li><p>Diminuir a classificação de conteúdos com termos potencialmente censuráveis sem censura</p></li><li><p>Desvalorização de documentação mais antiga, mantendo-a acessível em pesquisas técnicas</p></li><li><p>Reduzir subtilmente a visibilidade dos produtos da concorrência nas pesquisas de mercado</p></li><li><p>Diminuir a relevância do conteúdo com indicações de qualidade inferior (tais como problemas de formatação, comprimento mais curto, etc.)</p></li></ul></td>
   </tr>
</table>
<p>Também é possível combinar vários Boost Rankers para implementar uma estratégia de classificação mais dinâmica e robusta baseada no peso.</p>
<h2 id="Mechanism-of-Boost-Ranker" class="common-anchor-header">Mecanismo do Boost Ranker<button data-href="#Mechanism-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>O diagrama seguinte ilustra o fluxo de trabalho principal dos Boost Rankers.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" />
   </span> <span class="img-wrapper"> <span>Mecanismo do Boost Ranker</span> </span></p>
<p>Quando insere dados, Milvus distribui-os por segmentos. Durante uma pesquisa, cada segmento retorna um conjunto de candidatos, e Milvus classifica esses candidatos de todos os segmentos para produzir os resultados finais. Quando uma solicitação de pesquisa inclui um Boost Ranker, Milvus aplica-o aos resultados do candidato de cada segmento para evitar a perda potencial de precisão e melhorar a recuperação.</p>
<p>Antes de finalizar os resultados, Milvus processa esses candidatos com o Boost Ranker da seguinte forma:</p>
<ol>
<li><p>Aplica a expressão de filtragem opcional especificada no Boost Ranker para identificar as entidades que correspondem à expressão.</p></li>
<li><p>Aplica o peso especificado no Boost Ranker para aumentar as pontuações das entidades identificadas.</p></li>
</ol>
<div class="alert note">
<p>Não é possível usar o Boost Ranker como o classificador em uma pesquisa híbrida de vários vetores. No entanto, é possível usá-lo como classificador em qualquer um de seus sub-solicitações (<code translate="no">AnnSearchRequest</code>).</p>
</div>
<h2 id="Examples-of-Boost-Ranker" class="common-anchor-header">Exemplos do Boost Ranker<button data-href="#Examples-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>O exemplo a seguir ilustra o uso de um Boost Ranker em uma pesquisa de vetor único que requer o retorno das cinco entidades mais relevantes e a adição de pesos às pontuações de entidades com o tipo de documento abstrato.</p>
<ol>
<li><p><strong>Coletar candidatos de resultados de pesquisa em segmentos.</strong></p>
<p>A tabela a seguir assume que Milvus distribui entidades em dois segmentos<strong>(0001</strong> e <strong>0002</strong>), com cada segmento retornando cinco candidatos.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo de documento</p></th>
<th><p>Pontuação</p></th>
<th><p>Classificação</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p>117</p></td>
<td><p>abstrato</p></td>
<td><p>0.344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>resumo</p></td>
<td><p>0.456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>corpo</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>título</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>corpo</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corpo</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>corpo</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>561</p></td>
<td><p>abstrato</p></td>
<td><p>0.366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>resumo</p></td>
<td><p>0.444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>resumo</p></td>
<td><p>0.845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>Aplicar a expressão de filtragem especificada no Boost Ranker</strong> (<code translate="no">doctype='abstract'</code>).</p>
<p>Como indicado pelo campo <code translate="no">DocType</code> na tabela seguinte, o Milvus marcará todas as entidades com o seu <code translate="no">doctype</code> definido como <code translate="no">abstract</code> para processamento posterior.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo de documento</p></th>
<th><p>Pontuação</p></th>
<th><p>Classificação</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstrato</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>resumo</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>corpo</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>título</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>corpo</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corpo</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>corpo</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstrato</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>resumo</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>resumo</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>Aplicar o peso especificado no Boost Ranker</strong> (<code translate="no">weight=0.5</code>).</p>
<p>Todas as entidades identificadas no passo anterior serão multiplicadas pelo peso especificado no Boost Ranker, resultando em alterações nas suas classificações.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo de documento</p></th>
<th><p>Pontuação</p></th>
<th><p>Pontuação ponderada </p><p>(= pontuação x peso)</p></th>
<th><p>Classificação</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstrato</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstrato</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>corpo</p></td>
<td><p>0.578</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>título</p></td>
<td><p>0.788</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>corpo</p></td>
<td><p>0.899</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstrato</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corpo</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstrato</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>corpo</p></td>
<td><p>0.265</p></td>
<td><p>0.265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>abstrato</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>0.423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>O peso deve ser um número de ponto flutuante escolhido por si. Em casos como o exemplo acima, em que uma pontuação menor indica maior relevância, use um peso menor que <strong>1</strong>. Caso contrário, use um peso maior que <strong>1</strong>.</p>
<p></div></p></li>
<li><p><strong>Agregue os candidatos de todos os segmentos com base nas pontuações ponderadas para finalizar os resultados.</strong></p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo de documento</p></th>
<th><p>Pontuação</p></th>
<th><p>Pontuação ponderada</p></th>
<th><p>Classificação</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstrato</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstrato</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corpo</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstrato</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstrato</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
</table></p></li>
</ol>
<h2 id="Usage-of-Boost-Ranker" class="common-anchor-header">Utilização do Boost Ranker<button data-href="#Usage-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Nesta secção, verá exemplos de como utilizar o Boost Ranker para influenciar os resultados de uma pesquisa de vetor único.</p>
<h3 id="Create-a-Boost-Ranker" class="common-anchor-header">Criar um Boost Ranker<button data-href="#Create-a-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Antes de passar um Boost Ranker como o reranker de uma solicitação de pesquisa, você deve definir corretamente o Boost Ranker como uma função de reranking da seguinte forma:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: { 
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;id&quot;</span>
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.5</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BoostRanker;

<span class="hljs-type">BoostRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> BoostRanker.builder()
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .filter(<span class="hljs-string">&quot;doctype == \&quot;abstract\&quot;&quot;</span>)
        .weight(<span class="hljs-number">5.0f</span>)
        .randomScoreField(<span class="hljs-string">&quot;id&quot;</span>)
        .randomScoreSeed(<span class="hljs-number">126</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
      <span class="hljs-attr">field</span>: <span class="hljs-string">&quot;id&quot;</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.5</span>,
  },
};

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Necessário?</p></th>
     <th><p>Descrição</p></th>
     <th><p>Valor/exemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Identificador único para esta função</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Lista de campos vectoriais aos quais aplicar a função (deve estar vazia para o Boost Ranker)</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sim</p></td>
     <td><p>O tipo de Função a invocar; utilize <code translate="no">RERANK</code> para especificar uma estratégia de classificação</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Especifica o tipo de reranker.</p><p>Deve ser definido como <code translate="no">boost</code> para usar o Boost Ranker.</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weight</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Especifica o peso que será multiplicado pelas pontuações de quaisquer entidades correspondentes nos resultados brutos da pesquisa.</p><p>O valor deve ser um número de ponto flutuante. </p><ul><li><p>Para enfatizar a importância das entidades correspondentes, defina-o para um valor que aumente as pontuações.</p></li><li><p>Para rebaixar as entidades correspondentes, atribua a este parâmetro um valor que diminua suas pontuações.</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>Não</p></td>
     <td><p>Especifica a expressão de filtro que será usada para corresponder entidades entre as entidades do resultado da pesquisa. Pode ser qualquer expressão de filtro básico válida mencionada em <a href="/docs/pt/boolean.md">Filtragem explicada</a>.</p><p><strong>Nota</strong>: Utilize apenas operadores básicos, tais como <code translate="no">==</code>, <code translate="no">&gt;</code>, ou <code translate="no">&lt;</code>. A utilização de operadores avançados, tais como <code translate="no">text_match</code> ou <code translate="no">phrase_match</code>, irá degradar o desempenho da pesquisa.</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>Não</p></td>
     <td><p>Especifica a função aleatória que gera um valor entre <code translate="no">0</code> e <code translate="no">1</code> aleatoriamente. Tem os dois argumentos opcionais seguintes:</p><ul><li><p><code translate="no">seed</code> (number) Especifica um valor inicial utilizado para iniciar um gerador de números pseudo-aleatórios (PRNG).</p></li><li><p><code translate="no">field</code> (string) Especifica o nome de um campo cujo valor será utilizado como um fator aleatório na geração do número aleatório. Um campo com valores únicos será suficiente.</p><p>É aconselhável definir <code translate="no">seed</code> e <code translate="no">field</code> para garantir a consistência entre as gerações, usando os mesmos valores de campo e semente.</p></li></ul></td>
     <td><p><code translate="no">{"seed": 126, "field": "id"}</code></p></td>
   </tr>
</table>
<h3 id="Search-with-a-single-Boost-Ranker" class="common-anchor-header">Pesquisar com um único Boost Ranker<button data-href="#Search-with-a-single-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando a função do Boost Ranker estiver pronta, pode referenciá-la num pedido de pesquisa. O exemplo a seguir pressupõe que você já criou uma coleção que tem os seguintes campos: <strong>id</strong>, <strong>vetor</strong> e <strong>doctype</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
        
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954f</span>, <span class="hljs-number">0.447943f</span>, -<span class="hljs-number">0.174938f</span>, -<span class="hljs-number">0.424803f</span>, -<span class="hljs-number">0.864845f</span>})))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .build());
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-comment">// Connect to the Milvus server</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>
});

<span class="hljs-comment">// Assume you have a collection set up</span>

<span class="hljs-comment">// Conduct a similarity search</span>
<span class="hljs-keyword">const</span> searchResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
  <span class="hljs-attr">data</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;doctype&#x27;</span>],
  <span class="hljs-attr">rerank</span>: ranker,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Search results:&#x27;</span>, searchResults);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-multiple-Boost-Rankers" class="common-anchor-header">Pesquisar com vários Boost Rankers<button data-href="#Search-with-multiple-Boost-Rankers" class="anchor-icon" translate="no">
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
    </button></h3><p>Você pode combinar vários Boost Rankers em uma única pesquisa para influenciar os resultados da pesquisa. Para isso, crie vários Boost Rankers, faça referência a eles em uma instância <strong>do FunctionScore</strong> e use a instância <strong>do FunctionScore</strong> como o classificador na solicitação de pesquisa.</p>
<p>O exemplo a seguir mostra como modificar as pontuações de todas as entidades identificadas aplicando um peso entre <strong>0,8</strong> e <strong>1,2</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType, FunctionScore

<span class="hljs-comment"># Create a Boost Ranker with a fixed weight</span>
fix_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.8</span>
    }
)

<span class="hljs-comment"># Create a Boost Ranker with a randomly generated weight between 0 and 0.4</span>
random_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: {
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.4</span>
    }
)

<span class="hljs-comment"># Create a Function Score</span>
ranker = FunctionScore(
    functions=[
        fix_weight_ranker, 
        random_weight_ranker
    ],
    params={
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">fixWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                 .functionType(FunctionType.RERANK)
                 .name(<span class="hljs-string">&quot;boost&quot;</span>)
                 .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
                 .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>)
                 .build();
                 
CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">randomWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                 .functionType(FunctionType.RERANK)
                 .name(<span class="hljs-string">&quot;boost&quot;</span>)
                 .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
                 .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>)
                 .param(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>)
                 .build();

Map&lt;String, String&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;boost_mode&quot;</span>,<span class="hljs-string">&quot;Multiply&quot;</span>);
params.put(<span class="hljs-string">&quot;function_mode&quot;</span>,<span class="hljs-string">&quot;Sum&quot;</span>);     
<span class="hljs-type">FunctionScore</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> FunctionScore.builder()
                 .addFunction(fixWeightRanker)
                 .addFunction(randomWeightRanker)
                 .params(params)
                 .build()

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
                 .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
                 .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954f</span>, <span class="hljs-number">0.447943f</span>, -<span class="hljs-number">0.174938f</span>, -<span class="hljs-number">0.424803f</span>, -<span class="hljs-number">0.864845f</span>})))
                 .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
                 .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
                 .addFunction(ranker)
                 .build());
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> fix_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.8</span>,
  },
};

<span class="hljs-keyword">const</span> random_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.4</span>,
  },
};

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">functions</span>: [fix_weight_ranker, random_weight_ranker],
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">boost_mode</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
    <span class="hljs-attr">function_mode</span>: <span class="hljs-string">&quot;Sum&quot;</span>,
  },
};

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
  <span class="hljs-attr">output_field</span>: [<span class="hljs-string">&quot;doctype&quot;</span>],
  <span class="hljs-attr">ranker</span>: ranker
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Especificamente, existem dois Boost Rankers: um aplica um peso fixo a todas as entidades encontradas, enquanto o outro atribui um peso aleatório a elas. Em seguida, fazemos referência a esses dois classificadores em um <strong>FunctionScore</strong>, que também define como os pesos influenciam as pontuações das entidades encontradas.</p>
<p>A tabela seguinte lista os parâmetros necessários para criar uma instância <strong>FunctionScore</strong>.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Necessário?</p></th>
     <th><p>Descrição</p></th>
     <th><p>Valor/exemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">functions</code></p></td>
     <td><p>Sim</p></td>
     <td><p>Especifica os nomes dos classificadores de destino numa lista.</p></td>
     <td><p><code translate="no">["fix_weight_ranker", "random_weight_ranker"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.boost_mode</code></p></td>
     <td><p>Não</p></td>
     <td><p>Especifica como os pesos especificados influenciam as pontuações de quaisquer entidades correspondentes.</p><p>Os valores possíveis são:</p><ul><li><p><code translate="no">Multiply</code></p><p>Indica que o valor ponderado é igual à pontuação original de uma entidade correspondente multiplicada pelo peso especificado. </p><p>Este é o valor padrão.</p></li><li><p><code translate="no">Sum</code></p><p>Indica que o valor ponderado é igual à soma da pontuação original de uma entidade correspondente e o peso especificado</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>Não</p></td>
     <td><p>Especifica como os valores ponderados de vários Boost Rankers são processados.</p><p>Os valores possíveis são:</p><ul><li><p><code translate="no">Multiply</code></p><p>Indica que a pontuação final de uma entidade correspondente é igual ao produto dos valores ponderados de todos os Boost Rankers.</p><p>Este é o valor padrão.</p></li><li><p><code translate="no">Sum</code></p><p>Indica que a pontuação final de uma entidade correspondente é igual à soma dos valores ponderados de todos os Boost Rankers.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
