---
id: knowhere.md
summary: Saiba mais sobre Knowhere em Milvus.
title: Knowhere
---
<h1 id="Knowhere" class="common-anchor-header">Knowhere<button data-href="#Knowhere" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico apresenta o Knowhere, o mecanismo de execução vetorial principal do Milvus.</p>
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
    </button></h2><p>O Knowhere é o principal mecanismo de execução de vetores do Milvus, que incorpora várias bibliotecas de pesquisa de similaridade de vetores, incluindo <a href="https://github.com/facebookresearch/faiss">Faiss</a>, <a href="https://github.com/nmslib/hnswlib">Hnswlib</a> e <a href="https://github.com/spotify/annoy">Annoy</a>. O Knowhere foi também concebido para suportar a computação heterogénea. Controla em que hardware (CPU ou GPU) executar a criação de índices e os pedidos de pesquisa. É assim que o Knowhere recebe o seu nome - saber onde executar as operações. Mais tipos de hardware, incluindo DPU e TPU, serão suportados em versões futuras.</p>
<h2 id="Knowhere-in-the-Milvus-architecture" class="common-anchor-header">Knowhere na arquitetura Milvus<button data-href="#Knowhere-in-the-Milvus-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>A figura abaixo ilustra a posição do Knowhere na arquitetura Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/knowhere_architecture.png" alt="Knowhere" class="doc-image" id="knowhere" />
   </span> <span class="img-wrapper"> <span>Knowhere</span> </span></p>
<p>A camada mais baixa é o hardware do sistema. Acima dela estão as bibliotecas de índice de terceiros. Na camada superior, o Knowhere interage com o nó de índice e o nó de consulta por meio do CGO, que permite que os pacotes Go chamem o código C.</p>
<h2 id="Knowhere-advantages" class="common-anchor-header">Vantagens do Knowhere<button data-href="#Knowhere-advantages" class="anchor-icon" translate="no">
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
    </button></h2><p>A seguir estão as vantagens do Knowhere em relação ao Faiss.</p>
<h4 id="Support-for-BitsetView" class="common-anchor-header">Suporte para BitsetView</h4><p>Milvus introduz um mecanismo de bitset para realizar a &quot;eliminação suave&quot;. Um vetor apagado suavemente continua a existir na base de dados, mas não será computado durante uma pesquisa ou consulta de semelhança de vectores.</p>
<p>Cada bit num conjunto de bits corresponde a um vetor indexado. Se um vetor estiver marcado como "1" no conjunto de bits, significa que esse vetor foi eliminado de forma suave e não será envolvido durante uma pesquisa de vectores. O parâmetro bitset é aplicado a todas as APIs de consulta de índice Faiss expostas no Knowhere, incluindo índices de CPU e GPU.</p>
<p>Para obter mais informações sobre o mecanismo de bitset, consulte <a href="/docs/pt/v2.4.x/bitset.md">bitset</a>.</p>
<h4 id="Support-for-multiple-similarity-metrics-for-indexing-binary-vectors" class="common-anchor-header">Suporte a várias métricas de similaridade para indexação de vetores binários</h4><p>O Knowhere oferece suporte a <a href="/docs/pt/v2.4.x/metric.md#Hamming-distance">Hamming</a>, <a href="/docs/pt/v2.4.x/metric.md#Jaccard-distance">Jaccard</a>, <a href="/docs/pt/v2.4.x/metric.md#Tanimoto-distance">Tanimoto</a>, <a href="/docs/pt/v2.4.x/metric.md#Superstructure">Superestrutura</a> e <a href="/docs/pt/v2.4.x/metric.md#Substructure">Subestrutura</a>. Jaccard e Tanimoto podem ser usados para medir a similaridade entre dois conjuntos de amostras, enquanto Superestrutura e Subestrutura podem ser usados para medir a similaridade de estruturas químicas.</p>
<h4 id="Support-for-AVX512-instruction-set" class="common-anchor-header">Suporte para o conjunto de instruções AVX512</h4><p>Para além do <a href="https://en.wikipedia.org/wiki/AArch64">AArch64</a>, do <a href="https://en.wikipedia.org/wiki/SSE4#SSE4.2">SSE4.2</a> e do <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions">AVX2</a>, os conjuntos de instruções já suportados pelo Faiss, o Knowhere também suporta <a href="https://en.wikipedia.org/wiki/AVX-512">o AVX512</a>, que pode <a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">melhorar o desempenho da construção e consulta de índices em 20% a 30%</a> em comparação com o AVX2.</p>
<h4 id="Automatic-SIMD-instruction-selection" class="common-anchor-header">Seleção automática de instruções SIMD</h4><p>O Knowhere suporta a invocação automática das instruções SIMD adequadas (por exemplo, SIMD SSE, AVX, AVX2 e AVX512) em qualquer processador de CPU (plataformas locais e em nuvem), para que os usuários não precisem especificar manualmente o sinalizador SIMD (por exemplo, "-msse4") durante a compilação.</p>
<p>O Knowhere é construído refatorando a base de código do Faiss. As funções comuns (por exemplo, cálculo de semelhanças) que dependem de acelerações SIMD são eliminadas. Em seguida, para cada função, são implementadas quatro versões (ou seja, SSE, AVX, AVX2, AVX512) e cada uma é colocada num ficheiro fonte separado. Em seguida, os ficheiros de origem são compilados individualmente com o sinalizador SIMD correspondente. Portanto, em tempo de execução, o Knowhere pode escolher automaticamente as instruções SIMD mais adequadas com base nos sinalizadores atuais da CPU e, em seguida, vincular os ponteiros de função corretos usando hooking.</p>
<h4 id="Other-performance-optimization" class="common-anchor-header">Outras otimizações de desempenho</h4><p>Leia <a href="https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf">Milvus: um sistema de gerenciamento de dados vetoriais criado para fins específicos</a> para obter mais informações sobre a otimização de desempenho do Knowhere.</p>
<h2 id="Knowhere-code-structure" class="common-anchor-header">Estrutura de código do Knowhere<button data-href="#Knowhere-code-structure" class="anchor-icon" translate="no">
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
    </button></h2><p>A computação em Milvus envolve principalmente operações vetoriais e escalares. O Knowhere só lida com as operações de indexação de vectores.</p>
<p>Um índice é uma estrutura de dados independente dos dados vectoriais originais. Geralmente, a indexação requer quatro passos: criar um índice, treinar dados, inserir dados e construir um índice. Em algumas aplicações de IA, a formação de conjuntos de dados é separada da pesquisa de vectores. Os dados dos conjuntos de dados são primeiro treinados e depois inseridos numa base de dados vetorial como o Milvus para pesquisa de semelhanças. Por exemplo, os conjuntos de dados abertos sift1M e sift1B diferenciam os dados para formação dos dados para teste.</p>
<p>No entanto, no Knowhere, os dados para treino e para pesquisa são os mesmos. O Knowhere treina todos os dados de um <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Segments">segmento</a> e, em seguida, insere todos os dados treinados e cria um índice para eles.</p>
<h4 id="DataObj-base-class" class="common-anchor-header"><code translate="no">DataObj</code>Classe de base</h4><p><code translate="no">DataObj</code> é a classe de base de todas as estruturas de dados em Knowhere. <code translate="no">Size()</code> é o único método virtual em <code translate="no">DataObj</code>. A classe Index herda de <code translate="no">DataObj</code> com um campo denominado &quot;size_&quot;. A classe Index também tem dois métodos virtuais - <code translate="no">Serialize()</code> e <code translate="no">Load()</code>. A classe <code translate="no">VecIndex</code> derivada de <code translate="no">Index</code> é a classe de base virtual para todos os índices vectoriais. <code translate="no">VecIndex</code> fornece métodos que incluem <code translate="no">Train()</code>, <code translate="no">Query()</code>, <code translate="no">GetStatistics()</code> e <code translate="no">ClearStatistics()</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Knowhere_base_classes.png" alt="base class" class="doc-image" id="base-class" />
   </span> <span class="img-wrapper"> <span>classe de base</span> </span></p>
<p>Alguns outros tipos de índices estão listados à direita na figura acima.</p>
<ul>
<li><p>O índice Faiss tem duas classes de base: <code translate="no">FaissBaseIndex</code> para todos os índices em vectores de ponto flutuante e <code translate="no">FaissBaseBinaryIndex</code> para todos os índices em vectores binários.</p></li>
<li><p><code translate="no">GPUIndex</code> é a classe de base para todos os índices Faiss GPU.</p></li>
<li><p><code translate="no">OffsetBaseIndex</code> é a classe de base para todos os índices auto-desenvolvidos. Dado que apenas os IDs dos vectores são armazenados num ficheiro de índice, o tamanho do ficheiro para vectores de 128 dimensões pode ser reduzido em 2 ordens de grandeza.</p></li>
</ul>
<h4 id="IDMAP-brute-force-search" class="common-anchor-header"><code translate="no">IDMAP</code>: pesquisa de força bruta</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IDMAP.png" alt="IDMAP" class="doc-image" id="idmap" />
   </span> <span class="img-wrapper"> <span>IDMAP</span> </span></p>
<p>Em termos técnicos, <code translate="no">IDMAP</code> não é um índice, mas sim utilizado para pesquisa de força bruta. Quando os vectores são inseridos na base de dados, não é necessário treinar os dados nem construir um índice. As pesquisas serão efectuadas diretamente nos dados vectoriais inseridos.</p>
<p>No entanto, por uma questão de coerência de código, <code translate="no">IDMAP</code> também herda a classe <code translate="no">VecIndex</code> com todas as suas interfaces virtuais. A utilização de <code translate="no">IDMAP</code> é idêntica à dos outros índices.</p>
<h4 id="IVF-indices" class="common-anchor-header">Índices IVF</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IVF.png" alt="IVF" class="doc-image" id="ivf" />
   </span> <span class="img-wrapper"> <span>FIV</span> </span></p>
<p>Os índices IVF (ficheiro invertido) são os mais frequentemente utilizados. A classe <code translate="no">IVF</code> é derivada de <code translate="no">VecIndex</code> e <code translate="no">FaissBaseIndex</code>, e estende-se a <code translate="no">IVFSQ</code> e <code translate="no">IVFPQ</code>. <code translate="no">GPUIVF</code> é derivada de <code translate="no">GPUIndex</code> e <code translate="no">IVF</code>. Depois, <code translate="no">GPUIVF</code> estende-se a <code translate="no">GPUIVFSQ</code> e <code translate="no">GPUIVFPQ</code>.</p>
<p><code translate="no">IVFSQHybrid</code> é um índice híbrido desenvolvido pelo próprio utilizador. Um quantizador grosseiro é executado na GPU enquanto a pesquisa no balde é efectuada na CPU. Este tipo de índice pode reduzir a ocorrência de cópias de memória entre a CPU e a GPU, tirando partido do poder de computação da GPU. <code translate="no">IVFSQHybrid</code> tem a mesma taxa de recuperação que <code translate="no">GPUIVFSQ</code>, mas apresenta um melhor desempenho.</p>
<p>A estrutura da classe de base para índices binários é relativamente mais simples. <code translate="no">BinaryIDMAP</code> e <code translate="no">BinaryIVF</code> são derivados de <code translate="no">FaissBaseBinaryIndex</code> e <code translate="no">VecIndex</code>.</p>
<h4 id="Third-party-indices" class="common-anchor-header">Índices de terceiros</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/third_party_index.png" alt="third-party indices" class="doc-image" id="third-party-indices" />
   </span> <span class="img-wrapper"> <span>índices de terceiros</span> </span></p>
<p>Atualmente, só são suportados dois tipos de índices de terceiros para além do Faiss: o índice baseado em árvores <code translate="no">Annoy</code> e o índice baseado em gráficos <code translate="no">HNSW</code>. Estes dois índices de terceiros comuns e frequentemente utilizados são ambos derivados de <code translate="no">VecIndex</code>.</p>
<h2 id="Adding-indices-to-Knowhere" class="common-anchor-header">Adicionar índices ao Knowhere<button data-href="#Adding-indices-to-Knowhere" class="anchor-icon" translate="no">
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
    </button></h2><p>Se pretender adicionar novos índices ao Knowhere, pode começar por consultar os índices existentes:</p>
<ul>
<li><p>Para adicionar índices baseados em quantização, consulte <code translate="no">IVF_FLAT</code>.</p></li>
<li><p>Para adicionar índices baseados em gráficos, consulte <code translate="no">HNSW</code>.</p></li>
<li><p>Para adicionar índices baseados em árvores, consulte <code translate="no">Annoy</code>.</p></li>
</ul>
<p>Depois de fazer referência ao índice existente, pode seguir os passos abaixo para adicionar um novo índice ao Knowhere.</p>
<ol>
<li><p>Adicione o nome do novo índice em <code translate="no">IndexEnum</code>. O tipo de dados é uma cadeia de caracteres.</p></li>
<li><p>Adicione uma verificação de validação de dados ao novo índice no ficheiro <code translate="no">ConfAdapter.cpp</code>. A verificação de validação destina-se principalmente a validar os parâmetros de formação e consulta de dados.</p></li>
<li><p>Crie um novo ficheiro para o novo índice. A classe de base do novo índice deve incluir <code translate="no">VecIndex</code>, e a interface virtual necessária de <code translate="no">VecIndex</code>.</p></li>
<li><p>Adicione a lógica de construção do índice para o novo índice em <code translate="no">VecIndexFactory::CreateVecIndex()</code>.</p></li>
<li><p>Adicione o teste de unidade no diretório <code translate="no">unittest</code>.</p></li>
</ol>
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
    </button></h2><p>Depois de aprender como o Knowhere funciona em Milvus, poderá também querer:</p>
<ul>
<li><p>Aprender sobre os <a href="/docs/pt/v2.4.x/index.md">vários tipos de índices que o Milvus suporta</a>.</p></li>
<li><p>Aprender sobre <a href="/docs/pt/v2.4.x/bitset.md">o mecanismo de bitset</a>.</p></li>
<li><p>Compreender <a href="/docs/pt/v2.4.x/data_processing.md">como os dados são processados</a> no Milvus.</p></li>
</ul>
