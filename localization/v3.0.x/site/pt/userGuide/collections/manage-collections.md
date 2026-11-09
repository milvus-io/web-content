---
id: manage-collections.md
title: Explicação sobre as coleções
summary: >-
  No Milvus, pode criar várias coleções para gerir os seus dados e inserir esses
  dados como entidades nas coleções. As coleções e as entidades são semelhantes
  às tabelas e aos registos nas bases de dados relacionais. Esta página ajuda-o
  a conhecer melhor as coleções e os conceitos relacionados.
---
<h1 id="Collection-Explained" class="common-anchor-header">Explicação sobre as coleções<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>No Milvus, pode criar várias coleções para gerir os seus dados e inserir esses dados como entidades nas coleções. As coleções e as entidades são semelhantes às tabelas e aos registos nas bases de dados relacionais. Esta página ajuda-o a compreender o conceito de coleção e os conceitos relacionados.</p>
<h2 id="Collection" class="common-anchor-header">Coleção<button data-href="#Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Uma coleção é uma tabela bidimensional com colunas fixas e linhas variáveis. Cada coluna representa um campo e cada linha representa uma entidade.</p>
<p>O gráfico seguinte mostra uma coleção com oito colunas e seis entidades.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" /> 
   <span>Explicação sobre as coleções</span>
  
 </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">Esquema e campos<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao descrever um objeto, costumamos mencionar os seus atributos, tais como tamanho, peso e posição. Pode utilizar estes atributos como campos numa coleção. Cada campo possui várias propriedades restritivas, tais como o tipo de dados e a dimensionalidade de um campo vetorial. Pode formar um esquema de coleção criando os campos e definindo a sua ordem. Para conhecer os tipos de dados aplicáveis, consulte <a href="/docs/pt/schema.md">Explicação</a> do <a href="/docs/pt/schema.md">esquema</a>.</p>
<p>Deve incluir todos os campos definidos no esquema nas entidades a inserir. Para tornar alguns deles opcionais, considere ativar o campo dinâmico. Para mais detalhes, consulte <a href="/docs/pt/enable-dynamic-field.md">«Campo dinâmico</a>».</p>
<ul>
<li><p><strong>Torná-los nulos ou definir valores por defeito</strong></p>
<p>Para mais detalhes sobre como tornar um campo nulo ou definir o valor por predefinição, consulte <a href="/docs/pt/nullable-and-default.md">«Nulo e por predefinição</a>».</p></li>
<li><p><strong>Ativar o campo dinâmico</strong></p>
<p>Para mais detalhes sobre como ativar e utilizar o campo dinâmico, consulte <a href="/docs/pt/enable-dynamic-field.md">«Campo Dinâmico</a>».</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">Chave primária e AutoId<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>À semelhança do campo primário numa base de dados relacional, uma coleção possui um campo primário para distinguir uma entidade das outras. Cada valor no campo primário é globalmente único e corresponde a uma entidade específica.</p>
<p>Conforme ilustrado no gráfico acima, o campo denominado <strong>«id»</strong> funciona como campo primário, e o primeiro ID <strong>0</strong> corresponde a uma entidade intitulada <em>«A Taxa de Mortalidade do Coronavírus Não É Importante</em>». Não haverá nenhuma outra entidade que tenha o campo primário com o valor 0.</p>
<p>Um campo primário aceita apenas números inteiros ou cadeias de caracteres. Ao inserir entidades, deve incluir os valores do campo primário por predefinição. No entanto, se tiver ativado <strong>o AutoId</strong> aquando da criação da coleção, o Milvus irá gerar esses valores aquando da inserção dos dados. Nesse caso, exclua os valores do campo primário das entidades a inserir.</p>
<p>Para mais informações, consulte <a href="/docs/pt/primary-field.md">«Campo Primário e AutoId</a>».</p>
<h2 id="Index" class="common-anchor-header">Índice<button data-href="#Index" class="anchor-icon" translate="no">
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
    </button></h2><p>A criação de índices em campos específicos melhora a eficiência da pesquisa. Recomenda-se a criação de índices para todos os campos dos quais o seu serviço depende, sendo obrigatórios os índices em campos vetoriais.</p>
<h2 id="Entity" class="common-anchor-header">Entidade<button data-href="#Entity" class="anchor-icon" translate="no">
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
    </button></h2><p>As entidades são registos de dados que partilham o mesmo conjunto de campos numa coleção. Os valores em todos os campos da mesma linha constituem uma entidade.</p>
<p>Pode inserir quantas entidades forem necessárias numa coleção. No entanto, à medida que o número de entidades aumenta, o espaço de memória ocupado também aumenta, afetando o desempenho da pesquisa.</p>
<p>Para mais informações, consulte <a href="/docs/pt/schema.md">«Explicação</a> do <a href="/docs/pt/schema.md">esquema</a>».</p>
<h2 id="Load-and-Release" class="common-anchor-header">Carregar e Liberar<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>Carregar uma coleção é o pré-requisito para realizar pesquisas de similaridade e consultas nas coleções. Quando carrega uma coleção, o Milvus carrega todos os ficheiros de índice e os dados brutos de cada campo na memória, para uma resposta rápida às pesquisas e consultas.</p>
<p>As pesquisas e consultas são operações que consomem muita memória. Para reduzir os custos, recomenda-se libertar as coleções que não estão atualmente a ser utilizadas.</p>
<p>Para mais detalhes, consulte <a href="/docs/pt/load-and-release.md">«Carregar e Liberar</a>».</p>
<h2 id="Search-and-Query" class="common-anchor-header">Pesquisa e consulta<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de criar índices e carregar a coleção, pode iniciar uma pesquisa de similaridade introduzindo um ou vários vetores de consulta. Por exemplo, ao receber a representação vetorial da sua consulta incluída num pedido de pesquisa, o Milvus utiliza o tipo de métrica especificado para medir a similaridade entre o vetor de consulta e os vetores da coleção de destino, antes de devolver aqueles que são semanticamente semelhantes à consulta.</p>
<p>Também pode incluir filtragem de metadados nas pesquisas e consultas para melhorar a relevância dos resultados. Note que as condições de filtragem de metadados são obrigatórias nas consultas, mas opcionais nas pesquisas.</p>
<p>Para mais detalhes sobre os tipos de métricas aplicáveis, consulte <a href="/docs/pt/metric.md">Tipos</a> de <a href="/docs/pt/metric.md">métricas</a>.</p>
<p>Para mais informações sobre pesquisas e consultas, consulte os artigos no capítulo «Pesquisa e reclassificação», entre os quais se destacam as seguintes funcionalidades básicas:</p>
<ul>
<li><p><a href="/docs/pt/single-vector-search.md">Pesquisa ANN Básica</a></p></li>
<li><p><a href="/docs/pt/filtered-search.md">Pesquisa Filtrada</a></p></li>
<li><p><a href="/docs/pt/range-search.md">Pesquisa por intervalo</a></p></li>
<li><p><a href="/docs/pt/grouping-search.md">Pesquisa por agrupamento</a></p></li>
<li><p><a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida</a></p></li>
<li><p><a href="/docs/pt/with-iterators.md">Iterador de pesquisa</a></p></li>
<li><p><a href="/docs/pt/get-and-scalar-query.md">Consulta</a></p></li>
<li><p><a href="/docs/pt/full-text-search.md">Pesquisa de texto completo</a></p></li>
<li><p><a href="/docs/pt/keyword-match.md">Correspondência de texto</a></p></li>
</ul>
<p>Além disso, o Milvus também disponibiliza funcionalidades para melhorar o desempenho e a eficiência da pesquisa. Estas estão desativadas por predefinição, podendo ser ativadas e utilizadas de acordo com os requisitos do seu serviço. São elas:</p>
<ul>
<li><p><a href="/docs/pt/use-partition-key.md">Utilizar chave de partição</a></p></li>
<li><p><a href="/docs/pt/mmap.md">Utilizar mmap</a></p></li>
<li><p><a href="/docs/pt/clustering-compaction.md">Compactação de agrupamento</a></p></li>
</ul>
<h2 id="Partition" class="common-anchor-header">Partição<button data-href="#Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>As partições são subconjuntos de uma coleção, que partilham o mesmo conjunto de campos com a sua coleção pai, contendo cada uma um subconjunto de entidades.</p>
<p>Ao alocar entidades em partições diferentes, é possível criar grupos de entidades. Pode realizar pesquisas e consultas em partições específicas para que o Milvus ignore as entidades nas outras partições e melhore a eficiência da pesquisa.</p>
<p>Para mais detalhes, consulte <a href="/docs/pt/manage-partitions.md">«Gerir Partições</a>».</p>
<h2 id="Shard" class="common-anchor-header">Fragmento<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>Os fragmentos são divisões horizontais de uma coleção. Cada fragmento corresponde a um canal de entrada de dados. Por predefinição, todas as coleções têm um fragmento. É possível definir o número adequado de fragmentos ao criar uma coleção, com base no débito esperado e no volume de dados a inserir na coleção.</p>
<p>Para mais detalhes sobre como definir o número de shards, consulte <a href="/docs/pt/create-collection.md">«Criar coleção</a>».</p>
<h2 id="Alias" class="common-anchor-header">Alias<button data-href="#Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode criar aliases para as suas coleções. Uma coleção pode ter vários aliases, mas as coleções não podem partilhar um mesmo alias. Ao receber um pedido dirigido a uma coleção, o Milvus localiza a coleção com base no nome fornecido. Se a coleção com o nome fornecido não existir, o Milvus continua a procurar o nome fornecido como um alias. Pode utilizar aliases de coleção para adaptar o seu código a diferentes cenários.</p>
<p>Para mais detalhes, consulte <a href="/docs/pt/manage-aliases.md">«Gerir Aliases</a>».</p>
<h2 id="Function" class="common-anchor-header">Função<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode definir funções para que o Milvus derive campos aquando da criação da coleção. Por exemplo, a função de pesquisa de texto completo utiliza a função definida pelo utilizador para derivar um campo de vetor esparso a partir de um campo varchar específico. Para mais informações sobre a pesquisa de texto completo, consulte <a href="/docs/pt/full-text-search.md">Pesquisa de texto completo</a>.</p>
<h2 id="Consistency-Level" class="common-anchor-header">Nível de consistência<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>Os sistemas de bases de dados distribuídas utilizam normalmente o nível de consistência para definir a uniformidade dos dados entre os nós de dados e as réplicas. Pode definir níveis de consistência distintos ao criar uma coleção ou ao realizar pesquisas de similaridade dentro da coleção. Os níveis de consistência aplicáveis são <strong>«Forte»</strong>, <strong>«Desatualização Limitada</strong>», <strong>«Sessão</strong>» e <strong>«Eventualmente</strong>».</p>
<p>Para obter detalhes sobre estes níveis de consistência, consulte <a href="/docs/pt/tune_consistency.md">Nível</a> de <a href="/docs/pt/tune_consistency.md">Consistência</a>.</p>
