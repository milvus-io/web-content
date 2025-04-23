---
id: metric.md
title: Tipos de métricas
summary: >-
  As métricas de semelhança são utilizadas para medir as semelhanças entre
  vectores. A escolha de uma métrica de distância adequada ajuda a melhorar
  significativamente o desempenho da classificação e do agrupamento.
---
<h1 id="Metric-Types" class="common-anchor-header">Tipos de métricas<button data-href="#Metric-Types" class="anchor-icon" translate="no">
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
    </button></h1><p>As métricas de semelhança são utilizadas para medir as semelhanças entre vectores. A escolha de uma métrica de distância apropriada ajuda a melhorar significativamente o desempenho da classificação e do agrupamento.</p>
<p>Atualmente, o Milvus suporta estes tipos de métricas de semelhança: Distância euclidiana (<code translate="no">L2</code>), Inner Product (<code translate="no">IP</code>), Cosine Similarity (<code translate="no">COSINE</code>), <code translate="no">JACCARD</code>, <code translate="no">HAMMING</code>, e <code translate="no">BM25</code> (especificamente concebida para pesquisa de texto completo em vectores esparsos).</p>
<p>A tabela abaixo resume o mapeamento entre os diferentes tipos de campos e os tipos de métricas correspondentes.</p>
<table>
   <tr>
     <th><p>Tipo de campo</p></th>
     <th><p>Intervalo de dimensão</p></th>
     <th><p>Tipos de métricas suportados</p></th>
     <th><p>Tipo de métrica predefinido</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BFLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">SPARSE\_FLOAT\_VECTOR</code></p></td>
     <td><p>Não é necessário especificar a dimensão.</p></td>
     <td><p><code translate="no">IP</code>, <code translate="no">BM25</code> (utilizado apenas para pesquisa de texto integral)</p></td>
     <td><p><code translate="no">IP</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BINARY_VECTOR</code></p></td>
     <td><p>8-32,768*8</p></td>
     <td><p><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></p></td>
     <td><p><code translate="no">HAMMING</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>Para campos vectoriais do tipo <code translate="no">SPARSE\_FLOAT\_VECTOR</code>, utilize o tipo métrico <code translate="no">BM25</code> apenas quando efetuar a pesquisa de texto integral. Para mais informações, consulte <a href="/docs/pt/full-text-search.md">Pesquisa de texto integral</a>.</p></li>
<li><p>Para campos vectoriais do tipo <code translate="no">BINARY_VECTOR</code>, o valor da dimensão (<code translate="no">dim</code>) tem de ser um múltiplo de 8.</p></li>
</ul>
</div>
<p>A tabela abaixo resume as caraterísticas dos valores de distância de similaridade de todos os tipos de métrica suportados e o seu intervalo de valores.</p>
<table>
   <tr>
     <th><p>Tipo de métrica</p></th>
     <th><p>Caraterísticas dos valores de distância de similaridade</p></th>
     <th><p>Intervalo de valores da distância de similaridade</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>Um valor menor indica uma maior similaridade.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>Um valor maior indica uma maior similaridade.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>Um valor maior indica uma maior similaridade.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>Um valor menor indica uma maior similaridade.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>Um valor mais pequeno indica uma maior semelhança.</p></td>
     <td><p>[0, dim(vetor)]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BM25</code></p></td>
     <td><p>Pontua a relevância com base na frequência do termo, na frequência invertida do documento e na normalização do documento.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
</table>
<h2 id="Euclidean-distance-L2" class="common-anchor-header">Distância euclidiana (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h2><p>Essencialmente, a distância euclidiana mede o comprimento de um segmento que liga 2 pontos.</p>
<p>A fórmula para a distância euclidiana é a seguinte:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/euclidean-metric.png" alt="Euclidean Metric" class="doc-image" id="euclidean-metric" />
   </span> <span class="img-wrapper"> <span>Métrica Euclidiana</span> </span></p>
<p>em que <strong>a = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> e <strong>b = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong> são dois pontos num espaço euclidiano n-dimensional.</p>
<p>É a métrica de distância mais comummente utilizada e é muito útil quando os dados são contínuos.</p>
<div class="alert note">
<p>O Milvus só calcula o valor antes de aplicar a raiz quadrada quando a distância euclidiana é escolhida como métrica de distância.</p>
</div>
<h2 id="Inner-product-IP" class="common-anchor-header">Produto interno (IP)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h2><p>A distância IP entre dois embeddings é definida da seguinte forma:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IP-formula.png" alt="IP Formula" class="doc-image" id="ip-formula" />
   </span> <span class="img-wrapper"> <span>Fórmula IP</span> </span></p>
<p>O IP é mais útil se precisar de comparar dados não normalizados ou quando se preocupa com a magnitude e o ângulo.</p>
<div class="alert note">
<p>Se utilizar IP para calcular semelhanças entre embeddings, deve normalizar os seus embeddings. Após a normalização, o produto interno é igual à similaridade de cosseno.</p>
</div>
<p>Suponha que X' seja normalizado a partir da incorporação X:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalize-formula.png" alt="Normalize Formula" class="doc-image" id="normalize-formula" />
   </span> <span class="img-wrapper"> <span>Fórmula de normalização</span> </span></p>
<p>A correlação entre os dois embeddings é a seguinte:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/correlation-between-embeddings.png" alt="Correlation Between Embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>Correlação entre os embeddings</span> </span></p>
<h2 id="Cosine-similarity" class="common-anchor-header">Similaridade de cosseno<button data-href="#Cosine-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>A semelhança do cosseno utiliza o cosseno do ângulo entre dois conjuntos de vectores para medir a sua semelhança. Pode pensar nos dois conjuntos de vectores como segmentos de linha que partem do mesmo ponto, como [0,0,...], mas que apontam em direcções diferentes.</p>
<p>Para calcular a semelhança de cosseno entre dois conjuntos de vectores <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> e <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong>, utilize a seguinte fórmula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cosine-similarity.png" alt="Cosine Similarity" class="doc-image" id="cosine-similarity" />
   </span> <span class="img-wrapper"> <span>Semelhança de cosseno</span> </span></p>
<p>A semelhança de cosseno está sempre no intervalo <strong>[-1, 1]</strong>. Por exemplo, dois vectores proporcionais têm uma semelhança de cosseno de <strong>1</strong>, dois vectores ortogonais têm uma semelhança de <strong>0</strong> e dois vectores opostos têm uma semelhança de <strong>-1</strong>. Quanto maior for o cosseno, menor é o ângulo entre os dois vectores, indicando que estes dois vectores são mais semelhantes entre si.</p>
<p>Subtraindo a sua semelhança de cosseno de 1, obtém-se a distância de cosseno entre dois vectores.</p>
<h2 id="JACCARD-distance" class="common-anchor-header">Distância JACCARD<button data-href="#JACCARD-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>O coeficiente de semelhança JACCARD mede a semelhança entre dois conjuntos de amostras e é definido como a cardinalidade da intersecção dos conjuntos definidos dividida pela cardinalidade da união dos mesmos. Só pode ser aplicado a conjuntos de amostras finitos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-similarity-coefficient-formula.png" alt="JACCARD Similarity Coefficient Formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>Fórmula do coeficiente de similaridade JACCARD</span> </span></p>
<p>A distância JACCARD mede a dissemelhança entre conjuntos de dados e é obtida subtraindo o coeficiente de semelhança JACCARD de 1. Para variáveis binárias, a distância JACCARD é equivalente ao coeficiente de Tanimoto.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-distance-formula.png" alt="JACCARD Distance Formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>Fórmula da distância JACCARD</span> </span></p>
<h2 id="HAMMING-distance" class="common-anchor-header">Distância HAMMING<button data-href="#HAMMING-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>A distância HAMMING mede cadeias de dados binárias. A distância entre duas cadeias de dados de igual comprimento é o número de posições de bits em que os bits são diferentes.</p>
<p>Por exemplo, suponhamos que existem duas cadeias de caracteres, 1101 1001 e 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Uma vez que isto contém dois 1s, a distância HAMMING, d (11011001, 10011101) = 2.</p>
<h2 id="BM25-similarity" class="common-anchor-header">Similaridade BM25<button data-href="#BM25-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>O BM25 é um método de medição da relevância do texto amplamente utilizado, especificamente concebido para a <a href="/docs/pt/full-text-search.md">pesquisa de textos completos</a>. Combina os três factores-chave seguintes:</p>
<ul>
<li><p><strong>Frequência de termos (TF):</strong> Mede a frequência com que um termo aparece num documento. Embora frequências mais elevadas indiquem frequentemente uma maior importância, o BM25 utiliza o parâmetro de saturação k_1 para evitar que termos demasiado frequentes dominem a pontuação de relevância.</p></li>
<li><p><strong>Frequência inversa de documentos (IDF):</strong> Reflecte a importância de um termo em todo o corpus. Os termos que aparecem em menos documentos recebem um valor IDF mais alto, indicando maior contribuição para a relevância.</p></li>
<li><p><strong>Normalização do comprimento do documento:</strong> Documentos mais longos tendem a ter uma pontuação mais alta por conterem mais termos. O BM25 atenua esse viés normalizando o comprimento dos documentos, com o parâmetro b controlando a força dessa normalização.</p></li>
</ul>
<p>A pontuação do BM25 é calculada da seguinte forma:</p>
<p>score(D, Q)=\sum_{i=1}^{n}IDF(q_i)\cdot {{TF(q_i,D)\cdot(k_1+1)}\over{TF(q_i, D)+k_1\cdot(1-b+b\cdot {{|D|}\over{avgdl}})}}</p>
<p>Descrição do parâmetro:</p>
<ul>
<li><p>Q: O texto de consulta fornecido pelo utilizador.</p></li>
<li><p>D: O documento que está a ser avaliado.</p></li>
<li><p>TF(q_i, D): Frequência do termo, representando a frequência com que o termo q_i aparece no documento D.</p></li>
<li><p>IDF(q_i): Frequência inversa do documento, calculada como:</p>
<p>IDF(q_i)=\log({N-n(q_i)+0.5\over n(q_i)+0.5} + 1)</p>
<p>em que N é o número total de documentos no corpus en(q_i) é o número de documentos que contêm o termo q_i.</p></li>
<li><p>|D|: Comprimento do documento D (número total de termos).</p></li>
<li><p>avgdl: Comprimento médio de todos os documentos no corpus.</p></li>
<li><p>k_1: Controla a influência da frequência do termo na pontuação. Valores mais altos aumentam a importância da frequência de termos. O intervalo típico é [1,2, 2,0], enquanto o Milvus permite um intervalo de [0, 3].</p></li>
<li><p>b: Controla o grau de normalização do comprimento, variando de 0 a 1. Quando o valor é 0, nenhuma normalização é aplicada; quando o valor é 1, a normalização completa é aplicada.</p></li>
</ul>
