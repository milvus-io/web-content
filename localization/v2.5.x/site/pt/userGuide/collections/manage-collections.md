---
id: manage-collections.md
title: Explicação da coleção
summary: >-
  No Milvus, pode criar várias colecções para gerir os seus dados e inserir os
  seus dados como entidades nas colecções. A coleção e a entidade são
  semelhantes às tabelas e registos das bases de dados relacionais. Esta página
  ajuda-o a aprender sobre a coleção e conceitos relacionados.
---
<h1 id="Collection-Explained" class="common-anchor-header">Explicação da coleção<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>No Milvus, pode criar várias colecções para gerir os seus dados e inserir os seus dados como entidades nas colecções. A coleção e a entidade são semelhantes a tabelas e registos em bases de dados relacionais. Esta página ajuda-o a aprender sobre a coleção e conceitos relacionados.</p>
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
    </button></h2><p>Uma coleção é uma tabela bidimensional com colunas fixas e linhas variantes. Cada coluna representa um campo e cada linha representa uma entidade.</p>
<p>O gráfico seguinte mostra uma coleção com oito colunas e seis entidades.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" />
   </span> <span class="img-wrapper"> <span>Coleção explicada</span> </span></p>
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
    </button></h2><p>Quando descrevemos um objeto, normalmente mencionamos os seus atributos, como o tamanho, o peso e a posição. É possível utilizar estes atributos como campos numa coleção. Cada campo tem várias propriedades de restrição, como o tipo de dados e a dimensionalidade de um campo vetorial. Pode formar um esquema de coleção criando os campos e definindo a sua ordem. Para conhecer os possíveis tipos de dados aplicáveis, consulte <a href="/docs/pt/schema.md">Esquema explicado</a>.</p>
<p>Deve incluir todos os campos definidos pelo esquema nas entidades a inserir. Para tornar alguns deles opcionais, considere ativar o campo dinâmico. Para obter detalhes, consulte <a href="/docs/pt/enable-dynamic-field.md">Campo dinâmico</a>.</p>
<ul>
<li><p><strong>Tornando-os anuláveis ou definindo valores padrão</strong></p>
<p>Para obter detalhes sobre como tornar um campo anulável ou definir o valor padrão, consulte <a href="/docs/pt/nullable-and-default.md">Anulável e padrão</a>.</p></li>
<li><p><strong>Ativação do campo dinâmico</strong></p>
<p>Para mais informações sobre como ativar e utilizar o campo dinâmico, consulte <a href="/docs/pt/enable-dynamic-field.md">Campo dinâmico</a>.</p></li>
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
    </button></h2><p>À semelhança do campo primário numa base de dados relacional, uma coleção tem um campo primário para distinguir uma entidade de outras. Cada valor no campo primário é globalmente único e corresponde a uma entidade específica.</p>
<p>Como mostrado no gráfico acima, o campo denominado <strong>id</strong> serve como campo primário, e o primeiro ID <strong>0</strong> corresponde a uma entidade intitulada <em>A taxa de mortalidade do coronavírus não é importante</em>. Não haverá nenhuma outra entidade que tenha o campo primário 0.</p>
<p>Um campo primário aceita apenas números inteiros ou cadeias de caracteres. Ao inserir entidades, você deve incluir os valores do campo primário por padrão. No entanto, se tiver ativado o <strong>AutoId</strong> aquando da criação da coleção, o Milvus irá gerar esses valores aquando da inserção de dados. Nesse caso, exclua os valores do campo primário das entidades a serem inseridas.</p>
<p>Para mais informações, consulte <a href="/docs/pt/primary-field.md">Primary Field &amp; AutoId</a>.</p>
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
    </button></h2><p>A criação de índices em campos específicos melhora a eficiência da pesquisa. Aconselha-se a criação de índices para todos os campos em que o seu serviço se baseia, entre os quais os índices dos campos vectoriais são obrigatórios.</p>
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
<p>É possível inserir tantas entidades quantas forem necessárias numa coleção. No entanto, à medida que o número de entidades aumenta, o tamanho da memória que ocupa também aumenta, afectando o desempenho da pesquisa.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/schema.md">Esquema explicado</a>.</p>
<h2 id="Load-and-Release" class="common-anchor-header">Carregar e liberar<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>Carregar uma coleção é o pré-requisito para realizar pesquisas e consultas por similaridade nas coleções. Quando você carrega uma coleção, o Milvus carrega todos os arquivos de índice e os dados brutos em cada campo na memória para uma resposta rápida às pesquisas e consultas.</p>
<p>As pesquisas e consultas são operações que consomem muita memória. Para poupar custos, é aconselhável libertar as colecções que não estão a ser utilizadas.</p>
<p>Para obter mais detalhes, consulte <a href="/docs/pt/load-and-release.md">Carregar e liberar</a>.</p>
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
    </button></h2><p>Depois de criar índices e carregar a coleção, pode iniciar uma pesquisa por semelhança alimentando um ou vários vectores de consulta. Por exemplo, ao receber a representação vetorial da sua consulta transportada num pedido de pesquisa, o Milvus utiliza o tipo de métrica especificado para medir a semelhança entre o vetor de consulta e os vectores da coleção de destino antes de devolver os que são semanticamente semelhantes à consulta.</p>
<p>Também é possível incluir a filtragem de metadados nas pesquisas e consultas para melhorar a relevância dos resultados. Note que as condições de filtragem de metadados são obrigatórias nas consultas, mas opcionais nas pesquisas.</p>
<p>Para obter detalhes sobre os tipos de métricas aplicáveis, consulte <a href="/docs/pt/metric.md">Tipos de métricas</a>.</p>
<p>Para obter mais informações sobre pesquisas e consultas, consulte os artigos no capítulo Pesquisa e classificação, entre os quais se encontram as funcionalidades básicas:</p>
<ul>
<li><p><a href="/docs/pt/single-vector-search.md">Pesquisa ANN básica</a></p></li>
<li><p><a href="/docs/pt/filtered-search.md">Pesquisa filtrada</a></p></li>
<li><p><a href="/docs/pt/range-search.md">Pesquisa de intervalo</a></p></li>
<li><p><a href="/docs/pt/grouping-search.md">Pesquisa de agrupamento</a></p></li>
<li><p><a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida</a></p></li>
<li><p><a href="/docs/pt/with-iterators.md">Iterador de pesquisa</a></p></li>
<li><p><a href="/docs/pt/get-and-scalar-query.md">Consulta</a></p></li>
<li><p><a href="/docs/pt/full-text-search.md">Pesquisa de texto completo</a></p></li>
<li><p><a href="/docs/pt/keyword-match.md">Correspondência de texto</a></p></li>
</ul>
<p>Além disso, o Milvus também fornece melhorias para melhorar o desempenho e a eficiência da pesquisa. Estão desactivadas por defeito e pode activá-las e utilizá-las de acordo com os seus requisitos de serviço. São elas</p>
<ul>
<li><p><a href="/docs/pt/use-partition-key.md">Usar chave de partição</a></p></li>
<li><p><a href="/docs/pt/mmap.md">Usar mmap</a></p></li>
<li><p><a href="/docs/pt/clustering-compaction.md">Compactação de clustering</a></p></li>
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
    </button></h2><p>As partições são subconjuntos de uma coleção, que partilham o mesmo conjunto de campos com a sua coleção-mãe, cada uma contendo um subconjunto de entidades.</p>
<p>Ao alocar entidades em diferentes partições, é possível criar grupos de entidades. É possível efetuar pesquisas e consultas em partições específicas para que o Milvus ignore entidades noutras partições e melhore a eficiência da pesquisa.</p>
<p>Para obter detalhes, consulte <a href="/docs/pt/manage-partitions.md">Gerenciar partições</a>.</p>
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
    </button></h2><p>Shards são fatias horizontais de uma coleção. Cada shard corresponde a um canal de entrada de dados. Cada coleção tem um fragmento por predefinição. Pode definir o número apropriado de fragmentos ao criar uma coleção com base na taxa de transferência esperada e no volume de dados a inserir na coleção.</p>
<p>Para obter detalhes sobre como definir o número de fragmentos, consulte <a href="/docs/pt/create-collection.md">Criar coleção</a>.</p>
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
    </button></h2><p>É possível criar aliases para as suas colecções. Uma coleção pode ter vários aliases, mas as colecções não podem partilhar um alias. Ao receber um pedido contra uma coleção, o Milvus localiza a coleção com base no nome fornecido. Se a coleção com o nome fornecido não existir, o Milvus continua a localizar o nome fornecido como um alias. Pode utilizar aliases de colecções para adaptar o seu código a diferentes cenários.</p>
<p>Para mais detalhes, consulte <a href="/docs/pt/manage-aliases.md">Gerenciar aliases</a>.</p>
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
    </button></h2><p>É possível definir funções para o Milvus para derivar campos na criação da coleção. Por exemplo, a função de pesquisa de texto completo utiliza a função definida pelo utilizador para derivar um campo de vetor esparso de um campo varchar específico. Para obter mais informações sobre a pesquisa de texto completo, consulte <a href="/docs/pt/full-text-search.md">Pesquisa de texto completo</a>.</p>
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
    </button></h2><p>Os sistemas de bases de dados distribuídas utilizam normalmente o nível de consistência para definir a semelhança de dados entre nós de dados e réplicas. É possível definir níveis de consistência separados quando cria uma coleção ou efectua pesquisas de semelhança dentro da coleção. Os níveis de consistência aplicáveis são <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong> e <strong>Eventually</strong>.</p>
<p>Para obter detalhes sobre esses níveis de consistência, consulte <a href="/docs/pt/tune_consistency.md">Nível de consistência</a>.</p>
