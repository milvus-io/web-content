---
id: bitset.md
summary: Saiba mais sobre bitsets em Milvus.
title: Bitset
---
<h1 id="Bitset" class="common-anchor-header">Bitset<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico introduz o mecanismo de bitset que ajuda a permitir funcionalidades chave como filtragem de atributos e <a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">operações de eliminação</a> em Milvus.</p>
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
    </button></h2><p>Um conjunto de bits é um conjunto de bits. Os bits são elementos com apenas dois valores possíveis, normalmente <code translate="no">0</code> e <code translate="no">1</code>, ou valores booleanos <code translate="no">true</code> e <code translate="no">false</code>. No Milvus, os conjuntos de bits são matrizes de números de bits <code translate="no">0</code> e <code translate="no">1</code> que podem ser utilizados para representar determinados dados de forma compacta e eficiente, por oposição a ints, floats ou chars. Um número de bits é <code translate="no">0</code> por defeito e só é definido para <code translate="no">1</code> se cumprir determinados requisitos.</p>
<p>As operações em conjuntos de bits são efectuadas com <a href="/docs/pt/v2.4.x/boolean.md">lógica booleana</a>, segundo a qual um valor de saída é válido ou inválido, também denotado por <code translate="no">1</code> e <code translate="no">0</code>, respetivamente. Por exemplo, o <a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">operador lógico</a> <code translate="no">AND</code> pode ser utilizado para comparar dois conjuntos de bits com base em itens nas mesmas posições de índice e produz um novo conjunto de bits com os resultados. Se dois itens numa posição forem iguais, então, no novo conjunto de bits, <code translate="no">1</code> será escrito nessa posição; <code translate="no">0</code> se forem diferentes.</p>
<h2 id="Implementation" class="common-anchor-header">Implementação<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>O conjunto de bits é um mecanismo simples, mas poderoso, que ajuda o Milvus a efetuar a filtragem de atributos, a eliminação de dados e a consulta com o Time Travel.</p>
<h3 id="Attribute-filtering" class="common-anchor-header">Filtragem de atributos</h3><p>Como os bitsets contêm apenas dois valores possíveis, são perfeitos para armazenar resultados de <a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">filtragem de atributos</a>. Os dados que cumprem os requisitos de um determinado filtro de atributos são marcados com <code translate="no">1</code>.</p>
<h3 id="Data-deletion" class="common-anchor-header">Eliminação de dados</h3><p>Os conjuntos de bits são uma forma compacta de armazenar informação sobre se uma linha num segmento foi eliminada. As entidades eliminadas são marcadas com <code translate="no">1</code> no conjunto de bits correspondente, que <a href="https://milvus.io/blog/deleting-data-in-milvus.md">não será computado</a> durante uma pesquisa ou consulta.</p>
<h2 id="Examples" class="common-anchor-header">Exemplos<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Aqui apresentamos três exemplos que ilustram como os bitsets são usados no Milvus, com referências às três principais implementações de bitsets discutidas acima. Nos três casos, há um segmento com 8 entidades e, em seguida, uma série de eventos de linguagem de manipulação de dados (DML) ocorre na ordem mostrada abaixo.</p>
<ul>
<li>Quatro das entidades, cujos <code translate="no">primary_key</code>s são [1, 2, 3, 4] respetivamente, são inseridas quando o carimbo de data/hora <code translate="no">ts</code> é igual a 100.</li>
<li>As restantes quatro entidades, cujos <code translate="no">primary_key</code>s são [5, 6, 7, 8], são inseridas quando o carimbo de data/hora <code translate="no">ts</code> é igual a 200.</li>
<li>As entidades cujos <code translate="no">primary_key</code>s são [7, 8] são eliminadas quando o carimbo de data/hora <code translate="no">ts</code> é igual a 300.</li>
<li>Apenas as entidades, cujos <code translate="no">primary_key</code>s são [1, 3, 5, 7], satisfazem as condições de filtragem de atributos.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" />
   </span> <span class="img-wrapper"> <span>Ordem dos eventos DML</span> </span></p>
<h3 id="Case-one" class="common-anchor-header">Caso um</h3><p>Neste caso, um utilizador define <code translate="no">time_travel</code> como 150, o que significa que o utilizador efectua uma consulta sobre dados que satisfazem <code translate="no">ts = 150</code>. O processo de geração do conjunto de bits é ilustrado na Figura 1.</p>
<p>Durante a fase inicial de filtragem, o <code translate="no">filter_bitset</code> deve ser <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>, em que as entidades [1, 3, 5, 7] são marcadas como <code translate="no">1</code> porque são resultados de filtragem válidos.</p>
<p>No entanto, as entidades [4, 5, 6, 7] não foram inseridas na base de dados do vetor quando <code translate="no">ts</code> é igual a 150. Por conseguinte, estas quatro entidades devem ser marcadas como 0, independentemente da condição de filtragem. Agora, o resultado do conjunto de bits deve ser <code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code>.</p>
<p>Conforme discutido em <a href="#data-deletion">Eliminação de dados</a>, as entidades marcadas com <code translate="no">1</code> são ignoradas durante uma pesquisa ou consulta. O resultado do conjunto de bits precisa agora de ser invertido para ser combinado com o mapa de bits de eliminação, o que nos dá <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>.</p>
<p>Quanto ao conjunto de bits de eliminação <code translate="no">del_bitset</code>, o valor inicial deve ser <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. No entanto, as entidades 7 e 8 não são eliminadas até que <code translate="no">ts</code> seja 300. Portanto, quando <code translate="no">ts</code> é 150, as entidades 7 e 8 ainda são válidas. Como resultado, o valor de <code translate="no">del_bitset</code> após a Viagem no Tempo é <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Agora temos dois conjuntos de bits após a viagem no tempo e a filtragem de atributos: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> e <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> .  Combine estes dois conjuntos de bits com o operador lógico binário <code translate="no">OR</code>. O valor final de result_bitset é <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code>, o que significa que apenas as entidades 1 e 3 serão computadas na fase seguinte de pesquisa ou consulta.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." />
   <span>Figura 1. Pesquisa com viagem no tempo = 150</span>. </span></p>
<h3 id="Case-two" class="common-anchor-header">Caso dois</h3><p>Neste caso, o utilizador define <code translate="no">time_travel</code> como 250. O processo de geração do conjunto de bits é ilustrado na Figura 2.</p>
<p>Tal como no caso um, o <code translate="no">filter_bitset</code> inicial é <code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>.</p>
<p>Todas as entidades estão na base de dados vetorial quando <code translate="no">ts</code> = 250. Por conseguinte, o <code translate="no">filter_bitset</code> permanece o mesmo quando se considera o carimbo de data/hora. Mais uma vez, temos de inverter o resultado e obter <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Quanto ao conjunto de bits de eliminação <code translate="no">del_bitset</code>, o valor inicial é <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>. No entanto, as entidades 7 e 8 não foram eliminadas até <code translate="no">ts</code> ser 300. Por conseguinte, quando <code translate="no">ts</code> é 250, as entidades 7 e 8 ainda são válidas. Como resultado, o <code translate="no">del_bitset</code> após a Viagem no Tempo é <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code>.</p>
<p>Agora temos dois conjuntos de bits após a Viagem no Tempo e a filtragem de atributos: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> e <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> . Combine esses dois conjuntos de bits com o operador lógico binário <code translate="no">OR</code>. O conjunto de bits resultante é <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>. Ou seja, apenas as entidades [1, 3, 5, 7] serão computadas na fase de pesquisa ou consulta seguinte.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." />
   <span>Figura 2. Pesquisa com Viagem no Tempo = 250</span>. </span></p>
<h3 id="Case-three" class="common-anchor-header">Caso três</h3><p>Neste caso, o utilizador define <code translate="no">time_travel</code> como 350. O processo de geração do conjunto de bits é ilustrado na Figura 3.</p>
<p>Tal como nos casos anteriores, o <code translate="no">filter_bitset</code> inicial é <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>.</p>
<p>Todas as entidades estão na base de dados vetorial quando <code translate="no">ts</code>= 350. Assim, o <code translate="no">filter_bitset</code> final, invertido, é <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code>, tal como no caso dois.</p>
<p>Quanto ao conjunto de bits de eliminação <code translate="no">del_bitset</code>, uma vez que as entidades 7 e 8 já foram eliminadas em <code translate="no">ts = 350</code>, o resultado de <code translate="no">del_bitset</code> é <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code>.</p>
<p>Agora temos dois conjuntos de bits após a viagem no tempo e a filtragem de atributos: <code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> e <code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> .  Combine estes dois conjuntos de bits com o operador lógico binário <code translate="no">OR</code>. O último <code translate="no">result_bitset</code> é <code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code>. Ou seja, apenas as entidades [1, 3, 5] serão computadas na fase de pesquisa ou consulta seguinte.</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.4.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." />
   <span>Figura 3. Pesquisa com Viagem no Tempo = 350</span>. </span></p>
<h2 id="Whats-next" class="common-anchor-header">O que se segue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Agora que já sabe como funcionam os conjuntos de bits no Milvus, talvez também queira:</p>
<ul>
<li>Aprender a <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">usar strings para filtrar</a> os resultados da pesquisa, ou consultar a <a href="https://milvus.io/docs/hybridsearch.md">Pesquisa Híbrida</a> na nossa documentação.</li>
<li>Compreender <a href="https://milvus.io/docs/v2.1.x/data_processing.md">como os dados são processados</a> em Milvus.</li>
</ul>
