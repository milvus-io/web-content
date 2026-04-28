---
id: choose-the-right-analyzer-for-your-use-case.md
title: Escolha o analisador certo para o seu caso de utilização
summary: Notas
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">Escolha o analisador certo para o seu caso de utilização<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
<p>Este guia centra-se na tomada de decisões práticas para a seleção do analisador. Para obter detalhes técnicos sobre os componentes do analisador e como adicionar parâmetros do analisador, consulte <a href="/docs/pt/analyzer-overview.md">Visão geral do analisador</a>.</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">Compreender os analisadores em 2 minutos<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>No Milvus, um analisador processa o texto armazenado neste campo para torná-lo pesquisável para recursos como <a href="/docs/pt/full-text-search.md">pesquisa de texto completo</a> (BM25), <a href="/docs/pt/phrase-match.md">correspondência de frase</a> ou <a href="/docs/pt/keyword-match.md">correspondência de texto</a>. Pense nele como um processador de texto que transforma o seu conteúdo em bruto em tokens pesquisáveis.</p>
<p>Um analisador funciona num pipeline simples de duas fases:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" />
   </span> <span class="img-wrapper"> <span>Fluxo de trabalho do analisador</span> </span></p>
<ol>
<li><p><strong>Tokenização (obrigatório):</strong> Este estágio inicial aplica um <strong>tokenizador</strong> para quebrar uma cadeia contínua de texto em unidades discretas e significativas chamadas tokens. O método de tokenização pode variar significativamente, dependendo do idioma e do tipo de conteúdo.</p></li>
<li><p><strong>Filtragem de tokens (opcional):</strong> Após a tokenização, são aplicados <strong>filtros</strong> para modificar, remover ou refinar os tokens. Estas operações podem incluir a conversão de todos os tokens para minúsculas, a remoção de palavras comuns sem significado (como stopwords) ou a redução de palavras à sua forma de raiz (stemming).</p></li>
</ol>
<p><strong>Exemplo</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">Porque é que a escolha do analisador é importante<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>A escolha do analisador errado pode fazer com que os documentos relevantes não possam ser pesquisados ou devolver resultados irrelevantes.</p>
<p>A tabela seguinte resume os problemas comuns causados pela seleção incorrecta do analisador e fornece soluções acionáveis para diagnosticar problemas de pesquisa.</p>
<table>
   <tr>
     <th><p>Problema</p></th>
     <th><p>Sintoma</p></th>
     <th><p>Exemplo (entrada e saída)</p></th>
     <th><p>Causa (analisador ruim)</p></th>
     <th><p>Solução (analisador bom)</p></th>
   </tr>
   <tr>
     <td><p>Excesso de tokenização</p></td>
     <td><p>As consultas de texto para termos técnicos, identificadores ou URLs não conseguem encontrar documentos relevantes.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/pt/standard-analyzer.md"><code translate="no">standard</code></a> analisador</p></td>
     <td><p>Utilizar um <a href="/docs/pt/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizador; combine com um <a href="/docs/pt/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filtro.</p></td>
   </tr>
   <tr>
     <td><p>Sub-tokenização</p></td>
     <td><p>A pesquisa de um componente de uma frase com várias palavras não devolve documentos que contenham a frase completa.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>Analisador com um <a href="/docs/pt/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizador</p></td>
     <td><p>Utilizar um <a href="/docs/pt/standard-tokenizer.md"><code translate="no">standard</code></a> para dividir a pontuação e os espaços; utilize um filtro <a href="/docs/pt/regex-filter.md">regex</a> personalizado.</p></td>
   </tr>
   <tr>
     <td><p>Incompatibilidades de idioma</p></td>
     <td><p>Os resultados da pesquisa para um idioma específico são absurdos ou inexistentes.</p></td>
     <td><p>Texto em chinês: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (um token)</p></td>
     <td><p><a href="/docs/pt/english-analyzer.md"><code translate="no">english</code></a> analisador</p></td>
     <td><p>Utilize um analisador específico da língua, como <a href="/docs/pt/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
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
    </button></h2><p>Para muitos casos de utilização, não é necessário fazer nada de especial. Vamos determinar se você é um deles.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">Comportamento padrão: analisador <code translate="no">standard</code> <button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Se não especificar um analisador quando utilizar funcionalidades de recuperação de texto como a pesquisa de texto integral, o Milvus utiliza automaticamente o analisador <a href="/docs/pt/standard-analyzer.md"><code translate="no">standard</code></a> analisador.</p>
<p>O analisador <code translate="no">standard</code>:</p>
<ul>
<li><p>Divide o texto em espaços e pontuação</p></li>
<li><p>Converte todos os tokens para minúsculas</p></li>
<li><p>Remove um conjunto integrado de palavras de paragem comuns em inglês e a maior parte da pontuação</p></li>
</ul>
<p><strong>Exemplo de transformação</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">Critérios de decisão: Uma verificação rápida<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize esta tabela para determinar rapidamente se o analisador <code translate="no">standard</code> predefinido satisfaz as suas necessidades. Se não corresponder, terá de escolher um caminho diferente.</p>
<table>
   <tr>
     <th><p>O seu conteúdo</p></th>
     <th><p>Analisador padrão OK?</p></th>
     <th><p>Sim</p></th>
     <th><p>O que você precisa</p></th>
   </tr>
   <tr>
     <td><p>Posts de blogue em inglês</p></td>
     <td><p>Sim</p></td>
     <td><p>O comportamento predefinido é suficiente.</p></td>
     <td><p>Utilize a predefinição (não é necessária qualquer configuração).</p></td>
   </tr>
   <tr>
     <td><p>Documentos em chinês</p></td>
     <td><p>Não</p></td>
     <td><p>As palavras chinesas não têm espaços e serão tratadas como um token.</p></td>
     <td><p>Use um analisador <a href="/docs/pt/chinese-analyzer.md"><code translate="no">chinese</code></a> incorporado.</p></td>
   </tr>
   <tr>
     <td><p>Documentação técnica</p></td>
     <td><p>Não</p></td>
     <td><p>A pontuação é removida de termos como <code translate="no">C++</code>.</p></td>
     <td><p>Crie um analisador personalizado com um <a href="/docs/pt/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizador e um <a href="/docs/pt/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filtro.</p></td>
   </tr>
   <tr>
     <td><p>Línguas separadas por espaços, como o texto francês/espanhol</p></td>
     <td><p>⚠️ Talvez</p></td>
     <td><p>Os caracteres acentuados (<code translate="no">café</code> vs. <code translate="no">cafe</code>) podem não corresponder.</p></td>
     <td><p>Um analisador personalizado com o <a href="/docs/pt/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> é recomendado para obter melhores resultados.</p></td>
   </tr>
   <tr>
     <td><p>Línguas multilingues ou desconhecidas</p></td>
     <td><p>Não</p></td>
     <td><p>O analisador <code translate="no">standard</code> não possui a lógica específica do idioma necessária para lidar com diferentes conjuntos de caracteres e regras de tokenização.</p></td>
     <td><p>Use um analisador personalizado com o <a href="/docs/pt/icu-tokenizer.md"><code translate="no">icu</code></a> para a tokenização com reconhecimento de unicode. </p><p>Como alternativa, considere a configuração de <a href="/docs/pt/multi-language-analyzers.md">analisadores</a> multilíngues ou um <a href="/docs/pt/language-identifier.md">identificador de idioma</a> para um tratamento mais preciso do conteúdo multilíngue.</p></td>
   </tr>
</table>
<p>Se o analisador padrão <code translate="no">standard</code> não atender aos seus requisitos, será necessário implementar um diferente. Existem dois caminhos:</p>
<ul>
<li><p><a href="/docs/pt/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">Utilizar um analisador incorporado</a> ou</p></li>
<li><p><a href="/docs/pt/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">Criar um personalizado</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">Caminho A: Usar analisadores incorporados<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>Os analisadores incorporados são soluções pré-configuradas para linguagens comuns. Eles são a maneira mais fácil de começar quando o analisador padrão não se encaixa perfeitamente.</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">Analisadores incorporados disponíveis<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
     <th><p>Suporte a idiomas</p></th>
     <th><p>Componentes</p></th>
     <th><p>Notas</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>A maioria das línguas separadas por espaços (inglês, francês, alemão, espanhol, etc.)</p></td>
     <td><ul><li><p>Tokenizador: <code translate="no">standard</code></p></li><li><p>Filtros: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>Analisador de uso geral para processamento inicial de texto. Para cenários monolingues, os analisadores específicos da língua (como <code translate="no">english</code>) proporcionam um melhor desempenho.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>Dedicado ao inglês, que aplica o stemming e a remoção de palavras de paragem para uma melhor correspondência semântica em inglês</p></td>
     <td><ul><li><p>Tokenizador: <code translate="no">standard</code></p></li><li><p>Filtros: <code translate="no">lowercase</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Recomendado para conteúdo apenas em inglês acima de <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>Chinês</p></td>
     <td><ul><li><p>Tokenizador: <code translate="no">jieba</code></p></li><li><p>Filtros: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>Atualmente usa o dicionário chinês simplificado por defeito.</p></td>
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
    </button></h3><p>Para utilizar um analisador incorporado, basta especificar o seu tipo em <code translate="no">analyzer_params</code> quando definir o seu esquema de campo.</p>
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
<p>Para uma utilização detalhada, consulte <a href="/docs/pt/full-text-search.md">Pesquisa de texto integral</a>, <a href="/docs/pt/keyword-match.md">Correspondência de texto</a> ou <a href="/docs/pt/phrase-match.md">Correspondência de frase</a>.</p>
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
    </button></h2><p>Quando <a href="/docs/pt/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">as opções incorporadas</a> não satisfazem as suas necessidades, pode criar um analisador personalizado, combinando um tokenizador com um conjunto de filtros. Isto dá-lhe controlo total sobre o pipeline de processamento de texto.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">Passo 1: Selecionar o tokenizador com base no idioma<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
<h4 id="Western-languages" class="common-anchor-header">Línguas ocidentais</h4><p>Para idiomas separados por espaço, tem estas opções:</p>
<table>
   <tr>
     <th><p>Tokenizador</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Melhor para</p></th>
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
     <td><p>Divide apenas em caracteres de espaço em branco</p></td>
     <td><p>Conteúdo pré-processado, texto formatado pelo utilizador</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>Saída: <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">Línguas do Leste Asiático</h4><p>As línguas baseadas em dicionário requerem tokenizadores especializados para a segmentação correta das palavras:</p>
<h5 id="Chinese" class="common-anchor-header">Chinês</h5><table>
   <tr>
     <th><p>Tokenizador</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Melhor para</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>Segmentação baseada em dicionário chinês com algoritmo inteligente</p></td>
     <td><p><strong>Recomendado para conteúdo chinês</strong> - combina dicionário com algoritmos inteligentes, especificamente concebidos para chinês</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>Saída: <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>Análise morfológica baseada em dicionário puro com dicionário chinês<a href="https://cc-cedict.org/wiki/">(cc-cedict</a>)</p></td>
     <td><p>Em comparação com <code translate="no">jieba</code>, processa o texto chinês de uma forma mais genérica</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"机器学习算法"</code></p></li><li><p>Saída: <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">Japonês e coreano</h5><table>
   <tr>
     <th><p>Língua</p></th>
     <th><p>Tokenizador</p></th>
     <th><p>Opções de dicionário</p></th>
     <th><p>Melhor para</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p>Japonês</p></td>
     <td><p><a href="/docs/pt/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a> (uso geral), <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a> (termos modernos), <a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a> (académico)</p></td>
     <td><p>Análise morfológica com tratamento de substantivos próprios</p></td>
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
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">Línguas multilingues ou desconhecidas</h4><p>Para conteúdos em que os idiomas são imprevisíveis ou misturados nos documentos:</p>
<table>
   <tr>
     <th><p>Tokenizador</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Melhor para</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>Tokenização com reconhecimento de Unicode (Componentes internacionais para Unicode)</p></td>
     <td><p>Scripts mistos, idiomas desconhecidos ou quando a tokenização simples é suficiente</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>Saída: <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>Quando usar icu</strong>:</p>
<ul>
<li><p>Idiomas mistos onde a identificação do idioma é impraticável.</p></li>
<li><p>Não quer a sobrecarga de <a href="/docs/pt/multi-language-analyzers.md">analisadores multilíngues</a> ou o <a href="/docs/pt/language-identifier.md">identificador de idioma</a>.</p></li>
<li><p>O conteúdo tem uma língua principal com palavras estrangeiras ocasionais que contribuem pouco para o significado geral (por exemplo, texto em inglês com nomes de marcas esporádicos ou termos técnicos em japonês ou francês).</p></li>
</ul>
<p><strong>Abordagens alternativas</strong>: Para um tratamento mais preciso do conteúdo multilingue, considere utilizar analisadores multilingues ou o identificador de idioma. Para obter detalhes, consulte <a href="/docs/pt/multi-language-analyzers.md">Analisadores multilíngues</a> ou <a href="/docs/pt/language-identifier.md">Identificador de idioma</a>.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">Etapa 2: Adicionar filtros para obter precisão<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p>Depois de <a href="/docs/pt/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">selecionar o seu tokenizador</a>, aplique filtros com base nos seus requisitos de pesquisa específicos e caraterísticas de conteúdo.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">Filtros comumente usados</h4><p>Estes filtros são essenciais para a maioria das configurações de idioma separadas por espaço (inglês, francês, alemão, espanhol, etc.) e melhoram significativamente a qualidade da pesquisa:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Quando utilizar</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>Converter todos os tokens em minúsculas</p></td>
     <td><p>Universal - aplica-se a todos os idiomas com distinção de maiúsculas e minúsculas</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>Saída: <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>Reduzir as palavras à sua forma de raiz</p></td>
     <td><p>Línguas com inflexões de palavras (inglês, francês, alemão, etc.)</p></td>
     <td><p>Para inglês:</p><ul><li><p>Input: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>Saída: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>Remover palavras comuns sem significado</p></td>
     <td><p>A maioria das línguas - particularmente eficaz para línguas separadas por espaços</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>Saída: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Para as línguas do Leste Asiático (chinês, japonês, coreano, etc.), concentre-se nos <a href="/docs/pt/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">filtros específicos da língua</a>. Estas línguas utilizam normalmente abordagens diferentes para o processamento de texto e podem não beneficiar significativamente do stemming.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">Filtros de normalização de texto</h4><p>Estes filtros normalizam as variações de texto para melhorar a consistência da correspondência:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Quando usar</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>Converter caracteres acentuados em equivalentes ASCII</p></td>
     <td><p>Conteúdo internacional, conteúdo gerado pelo utilizador</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>Saída: <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">Filtragem de tokens</h4><p>Controle quais tokens são preservados com base no conteúdo ou comprimento do caractere:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Como funciona</p></th>
     <th><p>Quando usar</p></th>
     <th><p>Exemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>Remover tokens de pontuação independentes</p></td>
     <td><p>Limpe a saída dos tokenizadores <code translate="no">jieba</code>, <code translate="no">lindera</code>, <code translate="no">icu</code>, que retornarão pontuações como tokens únicos</p></td>
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
     <td><p>Requisitos de token específicos do domínio</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["test123", "prod456"]</code></p></li><li><p>Saída: <code translate="no">[[], ['prod456']]</code> (se <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">Filtros específicos do idioma</h4><p>Estes filtros tratam de caraterísticas específicas da língua:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Idioma</p></th>
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
     <td><p>Mantém caracteres chineses + alfanuméricos</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>Saída: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>Chinês</p></td>
     <td><p>Mantém apenas os caracteres chineses</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>Saída: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">Etapa 3: Combinar e implementar<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>Para criar seu analisador personalizado, você define o tokenizador e uma lista de filtros no dicionário <code translate="no">analyzer_params</code>. Os filtros são aplicados na ordem em que são listados.</p>
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
<p>Problemas comuns a serem verificados:</p>
<ul>
<li><p><strong>Excesso de tokenização</strong>: Termos técnicos sendo divididos incorretamente</p></li>
<li><p><strong>Sub-tokenização</strong>: As frases não estão a ser separadas corretamente</p></li>
<li><p><strong>Tokens em falta</strong>: Termos importantes sendo filtrados</p></li>
</ul>
<p>Para uma utilização detalhada, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>.</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">Configurações recomendadas por caso de uso<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção fornece configurações recomendadas de tokenizador e filtro para casos de uso comuns ao trabalhar com analisadores no Milvus. Escolha a combinação que melhor corresponda ao seu tipo de conteúdo e requisitos de pesquisa.</p>
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
    </button></h3><p>Utilize um tokenizador <code translate="no">standard</code> com conversão em minúsculas, stemming específico do idioma e remoção de stopwords. Esta configuração também funciona para outros idiomas europeus, modificando os parâmetros <code translate="no">language</code> e <code translate="no">stop_words</code>.</p>
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
    </button></h3><p>Para processamento de texto em inglês com filtragem abrangente. Também pode utilizar o analisador <a href="/docs/pt/english-analyzer.md"><code translate="no">english</code></a> analisador integrado:</p>
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
    </button></h3><p>Utilize o tokenizador <code translate="no">jieba</code> e aplique um filtro de caracteres para reter apenas caracteres chineses, letras latinas e dígitos.</p>
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
<p>Para chinês simplificado, <code translate="no">cnalphanumonly</code> remove todos os tokens exceto caracteres chineses, texto alfanumérico e dígitos. Isto evita que a pontuação afecte a qualidade da pesquisa.</p>
</div>
<h3 id="Japanese-content" class="common-anchor-header">Conteúdo japonês<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize o tokenizador <code translate="no">lindera</code> com o dicionário japonês e filtros para limpar a pontuação e controlar o comprimento dos tokens:</p>
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
    </button></h3><p>Semelhante ao japonês, utilizando o tokenizador <code translate="no">lindera</code> com o dicionário coreano:</p>
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
    </button></h3><p>Ao trabalhar com conteúdo que abrange vários idiomas ou utiliza scripts de forma imprevisível, comece com o analisador <code translate="no">icu</code>. Este analisador com reconhecimento de Unicode lida eficazmente com scripts e símbolos mistos.</p>
<p><strong>Configuração multilingue básica (sem stemming)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Processamento multilingue avançado</strong>:</p>
<p>Para um melhor controlo sobre o comportamento dos símbolos em diferentes idiomas:</p>
<ul>
<li><p>Utilize uma configuração de <strong>analisador multilingue</strong>. Para obter detalhes, consulte <a href="/docs/pt/multi-language-analyzers.md">Analisadores multilíngues</a>.</p></li>
<li><p>Implemente um <strong>identificador de idioma</strong> no seu conteúdo. Para obter detalhes, consulte <a href="/docs/pt/language-identifier.md">Identificador de idioma</a>.</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">Integrar com recursos de recuperação de texto<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
<li><p><strong>Pesquisa de texto integral</strong></p>
<p>Os analisadores têm um impacto direto na pesquisa de texto completo baseada em BM25 através da geração de vectores esparsos. Utilize o mesmo analisador para indexação e consulta para garantir uma tokenização consistente. Os analisadores específicos de idioma geralmente fornecem melhor pontuação BM25 do que os genéricos. Para obter detalhes de implementação, consulte <a href="/docs/pt/full-text-search.md">Pesquisa de texto completo</a>.</p></li>
<li><p><strong>Correspondência de texto</strong></p>
<p>As operações de correspondência de texto efectuam a correspondência exacta de tokens entre consultas e conteúdo indexado com base na saída do analisador. Para obter detalhes de implementação, consulte <a href="/docs/pt/keyword-match.md">Correspondência de texto</a>.</p></li>
<li><p><strong>Correspondência de frases</strong></p>
<p>A correspondência de frases requer uma tokenização consistente em expressões com várias palavras para manter os limites e o significado das frases. Para obter detalhes de implementação, consulte <a href="/docs/pt/phrase-match.md">Correspondência de frases</a>.</p></li>
</ul>
