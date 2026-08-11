---
id: choose-the-right-analyzer-for-your-use-case.md
title: Escolha o analisador adequado para o seu caso de utilização
summary: Notas
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">Escolha o analisador adequado para o seu caso de utilização<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h1><div class="alert note">
<p>Este guia centra-se na tomada de decisões práticas para a seleção de analisadores. Para obter detalhes técnicos sobre os componentes dos analisadores e sobre como adicionar parâmetros aos mesmos, consulte a <a href="/docs/pt/analyzer-overview.md">Visão geral dos analisadores</a>.</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">Compreenda os analisadores em 2 minutos<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>No Milvus, um analisador processa o texto armazenado neste campo para o tornar pesquisável em termos de funcionalidades como <a href="/docs/pt/full-text-search.md">a pesquisa de texto completo</a> (BM25), <a href="/docs/pt/phrase-match.md">a correspondência de frases</a> ou <a href="/docs/pt/keyword-match.md">a correspondência de texto</a>. Pense nele como um processador de texto que transforma o seu conteúdo bruto em tokens pesquisáveis.</p>
<p>Um analisador funciona num fluxo de trabalho simples, em duas etapas:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" /> 
   <span>Fluxo de trabalho do analisador</span>
  
 </span></p>
<ol>
<li><p><strong>Tokenização (obrigatória):</strong> Esta fase inicial aplica um <strong>tokenizador</strong> para dividir uma sequência contínua de texto em unidades discretas e significativas, chamadas tokens. O método de tokenização pode variar significativamente, dependendo do idioma e do tipo de conteúdo.</p></li>
<li><p><strong>Filtragem de tokens (opcional):</strong> Após a tokenização, são aplicados <strong>filtros</strong> para modificar, remover ou refinar os tokens. Estas operações podem incluir a conversão de todos os tokens para minúsculas, a remoção de palavras comuns sem significado (como palavras de paragem) ou a redução das palavras à sua forma raiz (stemming).</p></li>
</ol>
<p><strong>Exemplo</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">Por que razão a escolha do analisador é importante<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>A escolha do analisador errado pode tornar os documentos relevantes impossíveis de pesquisar ou apresentar resultados irrelevantes.</p>
<p>A tabela seguinte resume os problemas comuns causados pela seleção inadequada do analisador e fornece soluções práticas para diagnosticar problemas de pesquisa.</p>
<table>
   <tr>
     <th><p>Problema</p></th>
     <th><p>Sintoma</p></th>
     <th><p>Exemplo (Entrada e Saída)</p></th>
     <th><p>Causa (Analisador inadequado)</p></th>
     <th><p>Solução (analisador adequado)</p></th>
   </tr>
   <tr>
     <td><p>Tokenização excessiva</p></td>
     <td><p>As consultas de texto com termos técnicos, identificadores ou URLs não conseguem encontrar documentos relevantes.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/pt/standard-analyzer.md"><code translate="no">standard</code></a> analisador</p></td>
     <td><p>Utilize um <a href="/docs/pt/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizador; combine-o com um <a href="/docs/pt/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filtro.</p></td>
   </tr>
   <tr>
     <td><p>Sub-tokenização</p></td>
     <td><p>A pesquisa por um componente de uma frase composta por várias palavras não devolve documentos que contenham a frase completa.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>Analisador com um <a href="/docs/pt/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizador</p></td>
     <td><p>Utilize um <a href="/docs/pt/standard-tokenizer.md"><code translate="no">standard</code></a> tokenizador para dividir com base na pontuação e nos espaços; utilize um filtro <a href="/docs/pt/regex-filter.md">regex</a> personalizado.</p></td>
   </tr>
   <tr>
     <td><p>Incompatibilidades linguísticas</p></td>
     <td><p>Os resultados da pesquisa para um idioma específico não fazem sentido ou são inexistentes.</p></td>
     <td><p>Texto em chinês: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (um token)</p></td>
     <td><p><a href="/docs/pt/english-analyzer.md"><code translate="no">english</code></a> analisador</p></td>
     <td><p>Utilize um analisador específico para o idioma, como <a href="/docs/pt/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
   <tr>
     <td><p>Incompatibilidade do método de introdução</p></td>
     <td><p>Os utilizadores digitam em pinyin, mas o texto indexado utiliza caracteres chineses.</p></td>
     <td><p>Texto em chinês: <code translate="no">"足球"</code>; texto da consulta: <code translate="no">"zuqiu"</code></p></td>
     <td><p>Analisador que gera apenas tokens de caracteres chineses</p></td>
     <td><p>Utilize um analisador personalizado com o <a href="/docs/pt/jieba-tokenizer.md"><code translate="no">jieba</code></a> tokenizador e <a href="/docs/pt/pinyin-filter.md"><code translate="no">pinyin</code></a> filtro.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">Primeira pergunta: É necessário escolher um analisador?<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Em muitos casos de utilização, não é necessário fazer nada de especial. Vamos determinar se este é o seu caso.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">Comportamento por predefinição: analisador « <code translate="no">standard</code> »<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Se não especificar um analisador ao utilizar funcionalidades de recuperação de texto, como a pesquisa de texto completo, o Milvus utiliza automaticamente o <a href="/docs/pt/standard-analyzer.md"><code translate="no">standard</code></a> analisador.</p>
<p>O analisador « <code translate="no">standard</code> »:</p>
<ul>
<li><p>Divide o texto em base nos espaços e na pontuação</p></li>
<li><p>Converte todos os tokens para minúsculas</p></li>
<li><p>Remove um conjunto integrado de palavras vazias comuns do inglês e a maior parte da pontuação</p></li>
</ul>
<p><strong>Exemplo de transformação</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">Critérios de decisão: uma verificação rápida<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize esta tabela para determinar rapidamente se o analisador « <code translate="no">standard</code> » predefinido satisfaz as suas necessidades. Caso contrário, terá de optar por uma abordagem diferente.</p>
<table>
   <tr>
     <th><p>O seu conteúdo</p></th>
     <th><p>O analisador padrão é adequado?</p></th>
     <th><p>Porquê</p></th>
     <th><p>O que precisa</p></th>
   </tr>
   <tr>
     <td><p>Publicações de blogue em inglês</p></td>
     <td><p>✅ Sim</p></td>
     <td><p>O comportamento predefinido é suficiente.</p></td>
     <td><p>Utilize a configuração predefinida (não é necessária qualquer configuração).</p></td>
   </tr>
   <tr>
     <td><p>Documentos em chinês</p></td>
     <td><p>❌ Não</p></td>
     <td><p>As palavras em chinês não têm espaços e serão tratadas como um único token.</p></td>
     <td><p>Utilize um <a href="/docs/pt/chinese-analyzer.md"><code translate="no">chinese</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>Documentos em árabe</p></td>
     <td><p>❌ Não</p></td>
     <td><p>textos em árabe podem incluir variantes de letras, sinais diacríticos, Tatweel, algarismos árabe-índicos e palavras-vazio comuns em árabe que requerem um tratamento específico para o idioma.</p></td>
     <td><p>Utilize um <a href="/docs/pt/arabic-analyzer.md"><code translate="no">arabic</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>Documentos em tailandês</p></td>
     <td><p>❌ Não</p></td>
     <td><p>O texto tailandês normalmente não utiliza espaços entre palavras, pelo que necessita de uma segmentação de palavras específica para o idioma.</p></td>
     <td><p>Utilize um <a href="/docs/pt/thai-analyzer.md"><code translate="no">thai</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>Documentação técnica</p></td>
     <td><p>❌ Não</p></td>
     <td><p>A pontuação é removida de termos como « <code translate="no">C++</code> ».</p></td>
     <td><p>Crie um analisador personalizado com um <a href="/docs/pt/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizador e um <a href="/docs/pt/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filtro.</p></td>
   </tr>
   <tr>
     <td><p>Línguas separadas por espaços, como textos em francês/espanhol</p></td>
     <td><p>⚠️ Talvez</p></td>
     <td><p>os caracteres acentuados (<code translate="no">café</code> vs. <code translate="no">cafe</code>) possam não corresponder.</p></td>
     <td><p>Recomenda-se utilizar um analisador personalizado com o <a href="/docs/pt/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> é recomendado para obter melhores resultados.</p></td>
   </tr>
   <tr>
     <td><p>Línguas multilingues ou desconhecidas</p></td>
     <td><p>❌ Não</p></td>
     <td><p>O analisador <code translate="no">standard</code> não dispõe da lógica específica de cada idioma necessária para lidar com diferentes conjuntos de caracteres e regras de tokenização.</p></td>
     <td><p>Utilize um analisador personalizado com o <a href="/docs/pt/icu-tokenizer.md"><code translate="no">icu</code></a> tokenizador para uma tokenização compatível com Unicode. </p><p>Em alternativa, considere configurar <a href="/docs/pt/multi-language-analyzers.md">analisadores multilingues</a> ou um <a href="/docs/pt/language-identifier.md">identificador de idioma</a> para um tratamento mais preciso de conteúdos multilingues.</p></td>
   </tr>
</table>
<p>Se o analisador « <code translate="no">standard</code> » predefinido não satisfizer os seus requisitos, terá de implementar um analisador diferente. Tem duas opções:</p>
<ul>
<li><p><a href="/docs/pt/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">Utilizar um analisador integrado</a> ou</p></li>
<li><p><a href="/docs/pt/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">Criar um analisador personalizado</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">Opção A: Utilizar analisadores integrados<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>Os analisadores integrados são soluções pré-configuradas para idiomas comuns. São a forma mais fácil de começar quando o analisador padrão não é a solução ideal.</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">Analisadores integrados disponíveis<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>Analisador</p></th>
     <th><p>Língua suportada</p></th>
     <th><p>Componentes</p></th>
     <th><p>Notas</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>A maioria das línguas separadas por espaços (inglês, francês, alemão, espanhol, etc.)</p></td>
     <td><ul><li><p>Tokenizador: <code translate="no">standard</code></p></li><li><p>Filtros: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>Analisador de uso geral para o processamento inicial do texto. Em cenários monolíngues, os analisadores específicos para cada língua (como <code translate="no">english</code>) oferecem um melhor desempenho.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>Dedicado ao inglês, que aplica a derivação e a remoção de palavras vazias para uma melhor correspondência semântica em inglês</p></td>
     <td><ul><li><p>Tokenizador: <code translate="no">standard</code></p></li><li><p>Filtros: <code translate="no">lowercase</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Recomendado para conteúdos exclusivamente em inglês em vez de <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>Chinês</p></td>
     <td><ul><li><p>Tokenizador: <code translate="no">jieba</code></p></li><li><p>Filtros: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>Atualmente, utiliza por predefinição o dicionário de chinês simplificado.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/arabic-analyzer.md"><code translate="no">arabic</code></a></p></td>
     <td><p>Árabe</p></td>
     <td><ul><li><p>Tokenizador: <code translate="no">standard</code></p></li><li><p>Filtros: <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">arabic_normalization</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Recomendado para texto em árabe em vez de <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/thai-analyzer.md"><code translate="no">thai</code></a></p></td>
     <td><p>Tailandês</p></td>
     <td><ul><li><p>Tokenizador: <code translate="no">thai</code></p></li><li><p>Filtros: <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Recomendado para texto em tailandês em vez de <code translate="no">standard</code> ou tokenização baseada em espaços em branco.</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">Exemplo de implementação<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>Para utilizar um analisador integrado, basta especificar o seu tipo no parâmetro « <code translate="no">analyzer_params</code> » ao definir o esquema do seu campo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using built-in English analyzer</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Para obter informações detalhadas sobre a utilização, consulte <a href="/docs/pt/full-text-search.md">«Pesquisa</a> de <a href="/docs/pt/full-text-search.md">texto completo</a>», <a href="/docs/pt/keyword-match.md">«Correspondência de texto</a>» ou <a href="/docs/pt/phrase-match.md">«Correspondência de frase</a>».</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">Caminho B: Criar um analisador personalizado<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando <a href="/docs/pt/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">as opções integradas</a> não satisfizerem as suas necessidades, pode criar um analisador personalizado combinando um tokenizador com um conjunto de filtros. Isto dá-lhe controlo total sobre o fluxo de processamento de texto.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">Passo 1: Selecione o tokenizador com base no idioma<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>Escolha o seu tokenizador com base no idioma principal do seu conteúdo:</p>
<h4 id="Western-languages" class="common-anchor-header">Línguas ocidentais</h4><p>Para línguas separadas por espaços, dispõe das seguintes opções:</p>
<table>
   <tr>
     <th><p>Tokenizador</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Ideal para</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Divide o texto com base em espaços e sinais de pontuação</p></td>
     <td><p>Texto geral, pontuação mista</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>Saída: <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>Divide apenas com base em caracteres de espaço em branco</p></td>
     <td><p>Conteúdo pré-processado, texto formatado pelo utilizador</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>Saída: <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">Línguas do Leste Asiático</h4><p>As línguas que não utilizam espaços de forma consistente entre palavras requerem tokenizadores especializados para uma segmentação adequada das palavras:</p>
<h5 id="Chinese" class="common-anchor-header">Chinês</h5><table>
   <tr>
     <th><p>Tokenizador</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Ideal para</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>Segmentação baseada no dicionário de chinês com algoritmo inteligente</p></td>
     <td><p><strong>Recomendado para conteúdos em chinês</strong> — combina o dicionário com algoritmos inteligentes, especificamente concebidos para o chinês</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>Saída: <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>Análise morfológica baseada exclusivamente no dicionário com o dicionário de chinês (<a href="https://cc-cedict.org/wiki/">cc-cedict</a>)</p></td>
     <td><p>Em comparação com <code translate="no">jieba</code>, processa o texto em chinês de forma mais genérica</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"机器学习算法"</code></p></li><li><p>Saída: <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Thai" class="common-anchor-header">Tailandês</h5><p>Para a maioria dos textos em tailandês, utilize o <a href="/docs/pt/thai-analyzer.md"><code translate="no">thai</code></a> . Utilize o <a href="/docs/pt/thai-tokenizer.md"><code translate="no">thai</code></a> apenas quando precisar de criar um pipeline de analisadores personalizado.</p>
<table>
   <tr>
     <th><p>Tokenizador</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Ideal para</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/thai-tokenizer.md"><code translate="no">thai</code></a></p></td>
     <td><p>Segmenta texto em tailandês em tokens de palavras e filtra espaços em branco e segmentos compostos apenas por sinais de pontuação</p></td>
     <td><p>Pipelines de análise personalizados para texto em tailandês ou misto (tailandês/inglês)</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"สวัสดี! ทดสอบ, ระบบ Milvus"</code></p></li><li><p>Saída: <code translate="no">['สวัสดี', 'ทดสอบ', 'ระบบ', 'Milvus']</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">Japonês e coreano</h5><table>
   <tr>
     <th><p>Língua</p></th>
     <th><p>Tokenizador</p></th>
     <th><p>Opções do dicionário</p></th>
     <th><p>Ideal para</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p>Japonês</p></td>
     <td><p><a href="/docs/pt/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a> (uso geral), <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a> (termos modernos), <a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a> (académico)</p></td>
     <td><p>Análise morfológica com tratamento de nomes próprios</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"東京都渋谷区"</code></p></li><li><p>Saída: <code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>Coreano</p></td>
     <td><p><a href="/docs/pt/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>Análise morfológica do coreano</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"안녕하세요"</code></p></li><li><p>Saída: <code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">Línguas multilingues ou desconhecidas</h4><p>Para conteúdos em que as línguas são imprevisíveis ou se misturam dentro dos documentos:</p>
<table>
   <tr>
     <th><p>Tokenizador</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Ideal para</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>Tokenização compatível com Unicode (International Components for Unicode)</p></td>
     <td><p>Escritos mistos, línguas desconhecidas ou quando a tokenização simples é suficiente</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>Saída: <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>Quando utilizar o icu</strong>:</p>
<ul>
<li><p>Idiomas mistos em que a identificação do idioma é impraticável.</p></li>
<li><p>Não se pretende a sobrecarga de <a href="/docs/pt/multi-language-analyzers.md">analisadores multilingues</a> ou do <a href="/docs/pt/language-identifier.md">identificador de idioma</a>.</p></li>
<li><p>O conteúdo tem um idioma principal com palavras estrangeiras ocasionais que contribuem pouco para o significado geral (por exemplo, texto em inglês com nomes de marcas ou termos técnicos esporádicos em japonês ou francês).</p></li>
</ul>
<p><strong>Abordagens alternativas</strong>: Para um tratamento mais preciso de conteúdos multilingues, considere a utilização de analisadores multilingues ou do identificador de idioma. Para mais detalhes, consulte <a href="/docs/pt/multi-language-analyzers.md">Analisadores multilingues</a> ou <a href="/docs/pt/language-identifier.md">Identificador de idioma</a>.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">Passo 2: Adicione filtros para maior precisão<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p>Após <a href="/docs/pt/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">selecionar o seu tokenizador</a>, aplique filtros com base nos seus requisitos de pesquisa específicos e nas características do conteúdo.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">Filtros mais utilizados</h4><p>Estes filtros são essenciais para a maioria das configurações linguísticas separadas por espaços (inglês, francês, alemão, espanhol, etc.) e melhoram significativamente a qualidade da pesquisa:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Quando utilizar</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>Converter todos os tokens para minúsculas</p></td>
     <td><p>Universal — aplica-se a todas as línguas que distinguem maiúsculas de minúsculas</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>Saída: <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>Reduzir as palavras à sua forma radical</p></td>
     <td><p>Línguas com flexões de palavras (inglês, francês, alemão, etc.)</p></td>
     <td><p>Para o inglês:</p><ul><li><p>Entrada: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>Resultado: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>Remover palavras comuns sem significado</p></td>
     <td><p>A maioria das línguas — particularmente eficaz para línguas separadas por espaços</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>Saída: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Para as línguas do Leste Asiático (chinês, japonês, coreano, etc.), concentre-se, em vez disso, em <a href="/docs/pt/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">filtros específicos para cada língua</a>. Estas línguas utilizam normalmente abordagens diferentes para o processamento de texto e podem não beneficiar significativamente da redução a raiz.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">Filtros de normalização de texto</h4><p>Estes filtros padronizam as variações do texto para melhorar a consistência da correspondência:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Quando utilizar</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>Converter caracteres acentuados nos seus equivalentes ASCII</p></td>
     <td><p>Conteúdo internacional, conteúdo gerado pelo utilizador</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>Saída: <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">Filtragem de tokens</h4><p>Controlar quais os tokens que são preservados com base no conteúdo ou no comprimento dos caracteres:</p>
<table>
   <tr>
     <th><p>Filtrar</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Quando utilizar</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>Remover tokens de pontuação isolados</p></td>
     <td><p>Limpar a saída dos tokenizadores <code translate="no">jieba</code>, <code translate="no">lindera</code> e <code translate="no">icu</code>, que devolvem sinais de pontuação como tokens únicos</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>Saída: <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>Manter apenas letras e números</p></td>
     <td><p>Conteúdo técnico, processamento de texto limpo</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>Saída: <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>Remover tokens fora do intervalo de comprimento especificado</p></td>
     <td><p>Filtrar ruído (tokens excessivamente longos)</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>Saída: <code translate="no">[['a'], ['very'], []]</code> (se <strong>max=10</strong>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>Filtragem personalizada baseada em padrões</p></td>
     <td><p>Requisitos de tokens específicos do domínio</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["test123", "prod456"]</code></p></li><li><p>Saída: <code translate="no">[[], ['prod456']]</code> (se <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">Filtros específicos de linguagem</h4><p>Estes filtros lidam com características específicas da linguagem:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Língua</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>Alemão</p></td>
     <td><p>Divide palavras compostas em componentes pesquisáveis</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>Saída: <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>Chinês</p></td>
     <td><p>Mantém os caracteres chineses + alfanuméricos</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>Saída: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>Chinês</p></td>
     <td><p>Mantém apenas os caracteres chineses</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>Saída: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/pinyin-filter.md"><code translate="no">pinyin</code></a></p></td>
     <td><p>Chinês</p></td>
     <td><p>Gera formas de tokens em pinyin para tokens em chinês</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["中文"]</code></p></li><li><p>Saída: <code translate="no">[['中文', 'zhong', 'wen']]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">Passo 3: Combinar e implementar<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>Para criar o seu analisador personalizado, deve definir o tokenizador e uma lista de filtros no dicionário « <code translate="no">analyzer_params</code> ». Os filtros são aplicados pela ordem em que estão listados.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: A custom analyzer for technical content</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;alphanumonly&quot;</span>]
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">Final: Teste com <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Valide sempre a sua configuração antes de a aplicar a uma coleção:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>Problemas comuns a verificar:</p>
<ul>
<li><p><strong>Tokenização excessiva</strong>: termos técnicos a serem divididos incorretamente</p></li>
<li><p><strong>Tokenização insuficiente</strong>: frases que não estão a ser separadas corretamente</p></li>
<li><p><strong>Tóquenes em falta</strong>: termos importantes que estão a ser filtrados</p></li>
</ul>
<p>Para obter informações detalhadas sobre a utilização, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>.</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">Configurações recomendadas por caso de utilização<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção fornece configurações recomendadas para o tokenizador e o filtro em casos de utilização comuns ao trabalhar com analisadores no Milvus. Escolha a combinação que melhor se adequa ao seu tipo de conteúdo e aos seus requisitos de pesquisa.</p>
<div class="alert note">
<p>Antes de aplicar um analisador à sua coleção, recomendamos que utilize <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> para testar e validar o desempenho da análise de texto.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">Línguas com acentos (francês, espanhol, alemão, etc.)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize um tokenizador « <code translate="no">standard</code> » com conversão para minúsculas, stemming específico do idioma e remoção de palavras de stop. Esta configuração também funciona para outros idiomas europeus, bastando modificar os parâmetros « <code translate="no">language</code> » e « <code translate="no">stop_words</code> ».</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># French example</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>, 
        <span class="hljs-string">&quot;asciifolding&quot;</span>,  <span class="hljs-comment"># Handle accent marks</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;french&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_french_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># For other languages, modify the language parameter:</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;spanish&quot; for Spanish</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;german&quot; for German</span>
<span class="hljs-comment"># &quot;stop_words&quot;: [&quot;_spanish_&quot;] or [&quot;_german_&quot;] accordingly</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="English-content" class="common-anchor-header">Conteúdo em inglês<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Para o processamento de texto em inglês com filtragem abrangente. Também pode utilizar o analisador integrado <a href="/docs/pt/english-analyzer.md"><code translate="no">english</code></a> :</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chinese-content" class="common-anchor-header">Conteúdo em chinês<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize o tokenizador <code translate="no">jieba</code> e aplique um filtro de caracteres para reter apenas caracteres chineses, letras latinas e algarismos.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>No caso do chinês simplificado, o <code translate="no">cnalphanumonly</code> remove todos os tokens, exceto caracteres chineses, texto alfanumérico e algarismos. Isto evita que a pontuação afete a qualidade da pesquisa.</p>
</div>
<p>Se os utilizadores puderem pesquisar texto em chinês digitando pinyin, utilize um analisador personalizado com o tokenizador « <code translate="no">jieba</code> » e o <a href="/docs/pt/pinyin-filter.md"><code translate="no">pinyin</code></a> em vez do analisador « <code translate="no">chinese</code> » integrado.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Japanese-content" class="common-anchor-header">Conteúdo em japonês<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize o tokenizador « <code translate="no">lindera</code> » com o dicionário e os filtros de japonês para remover a pontuação e controlar o comprimento dos tokens:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>  <span class="hljs-comment"># Options: ipadic, ipadic-neologd, unidic</span>
    },
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;removepunct&quot;</span>,  <span class="hljs-comment"># Remove standalone punctuation</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
            <span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">20</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Korean-content" class="common-anchor-header">Conteúdo coreano<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>À semelhança do japonês, utilize o tokenizador « <code translate="no">lindera</code> » com o dicionário coreano:</p>
<pre><code translate="no" class="language-json">analyzer_params = <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;tokenizer&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lindera&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;dict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ko-dic&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;removepunct&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;length&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;min&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;max&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">Conteúdo misto ou multilingue<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Ao trabalhar com conteúdo que abrange vários idiomas ou utiliza sistemas de escrita de forma imprevisível, comece pelo analisador <code translate="no">icu</code>. Este analisador compatível com Unicode lida eficazmente com sistemas de escrita e símbolos misturados.</p>
<p><strong>Configuração multilingue básica (sem stemming)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Processamento multilingue avançado</strong>:</p>
<p>Para um melhor controlo do comportamento dos tokens em diferentes idiomas:</p>
<ul>
<li><p>Utilize uma configuração <strong>de analisador multilingue</strong>. Para mais detalhes, consulte <a href="/docs/pt/multi-language-analyzers.md">Analisadores multilingues</a>.</p></li>
<li><p>Implemente um <strong>identificador de idioma</strong> no seu conteúdo. Para mais detalhes, consulte <a href="/docs/pt/language-identifier.md">Identificador</a> de <a href="/docs/pt/language-identifier.md">idioma</a>.</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">Integre com funcionalidades de recuperação de texto<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de selecionar o seu analisador, pode integrá-lo com as funcionalidades de recuperação de texto fornecidas pelo Milvus.</p>
<ul>
<li><p><strong>Pesquisa de texto completo</strong></p>
<p>Os analisadores têm um impacto direto na pesquisa de texto completo baseada no BM25 através da geração de vetores esparsos. Utilize o mesmo analisador tanto para a indexação como para as consultas, de modo a garantir uma tokenização consistente. Os analisadores específicos para cada idioma proporcionam, geralmente, uma pontuação BM25 superior à dos analisadores genéricos. Para obter detalhes sobre a implementação, consulte <a href="/docs/pt/full-text-search.md">«Pesquisa de texto completo</a>».</p></li>
<li><p><strong>Correspondência de texto</strong></p>
<p>As operações de correspondência de texto realizam a correspondência exata de tokens entre as consultas e o conteúdo indexado com base na saída do seu analisador. Para obter detalhes sobre a implementação, consulte <a href="/docs/pt/keyword-match.md">Correspondência de Texto</a>.</p></li>
<li><p><strong>Correspondência de frases</strong></p>
<p>A correspondência de frases requer uma tokenização consistente em expressões com várias palavras para manter os limites e o significado das frases. Para obter detalhes de implementação, consulte <a href="/docs/pt/phrase-match.md">«Correspondência de frases</a>».</p></li>
</ul>
