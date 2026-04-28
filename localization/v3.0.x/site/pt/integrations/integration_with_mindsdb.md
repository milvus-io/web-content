---
id: integration_with_mindsdb.md
summary: >-
  Este tutorial demonstra como integrar o Milvus com o MindsDB, permitindo-lhe
  tirar partido das capacidades de IA do MindsDB com a funcionalidade de base de
  dados vetorial do Milvus através de operações do tipo SQL para gerir e
  consultar embeddings vectoriais.
title: Integrar o Milvus com o MindsDB
---
<h1 id="Integrate-Milvus-with-MindsDB" class="common-anchor-header">Integrar o Milvus com o MindsDB<button data-href="#Integrate-Milvus-with-MindsDB" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.mindsdb.com/what-is-mindsdb">O MindsDB</a> é uma ferramenta poderosa para integrar aplicações de IA com diversas fontes de dados empresariais. Ele atua como um mecanismo de consulta federado que coloca ordem na dispersão de dados, respondendo meticulosamente a consultas em dados estruturados e não estruturados. Quer seus dados estejam espalhados por aplicativos SaaS, bancos de dados ou data warehouses, o MindsDB pode conectar e consultar tudo isso usando SQL padrão. Ele apresenta sistemas RAG autônomos de última geração por meio de bases de conhecimento, suporta centenas de fontes de dados e oferece opções flexíveis de implantação, desde o desenvolvimento local até ambientes de nuvem.</p>
<p>Este tutorial demonstra como integrar o Milvus com o MindsDB, permitindo-lhe tirar partido das capacidades de IA do MindsDB com a funcionalidade de base de dados de vectores do Milvus através de operações do tipo SQL para gerir e consultar embeddings de vectores.</p>
<div class="alert note">
<p>Este tutorial refere-se principalmente à documentação oficial do <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">MindsDB Milvus Handler</a>. Se encontrar alguma parte desactualizada neste tutorial, pode dar prioridade ao seguimento da documentação oficial e criar um problema para nós.</p>
</div>
<h2 id="Install-MindsDB" class="common-anchor-header">Instalar o MindsDB<button data-href="#Install-MindsDB" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de começarmos, instale o MindsDB localmente via <a href="https://docs.mindsdb.com/setup/self-hosted/docker">Docker</a> ou <a href="https://docs.mindsdb.com/setup/self-hosted/docker-desktop">Docker Desktop</a>.</p>
<p>Antes de prosseguir, certifique-se de ter uma sólida compreensão dos conceitos e operações fundamentais do MindsDB e do Milvus.</p>
<h2 id="Arguments-Introduction" class="common-anchor-header">Introdução aos argumentos<button data-href="#Arguments-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Os argumentos necessários para estabelecer uma conexão são:</p>
<ul>
<li><code translate="no">uri</code>uri para a base de dados milvus, pode ser definido para o ficheiro local ".db" ou para o serviço docker ou cloud</li>
<li><code translate="no">token</code>token para suportar o serviço docker ou cloud de acordo com a opção uri</li>
</ul>
<p>Os argumentos opcionais para estabelecer uma ligação são:</p>
<p>Estes são utilizados para as consultas <code translate="no">SELECT</code>:</p>
<ul>
<li><code translate="no">search_default_limit</code>: limite predefinido a ser passado em instruções select (predefinição=100)</li>
<li><code translate="no">search_metric_type</code>Tipo de métrica utilizado para pesquisas (predefinição="L2")</li>
<li><code translate="no">search_ignore_growing</code>: se os segmentos crescentes devem ser ignorados durante as pesquisas de similaridade (por defeito=False)</li>
<li><code translate="no">search_params</code>: específico para <code translate="no">search_metric_type</code> (pré-definição={"nprobe": 10})</li>
</ul>
<p>Estas são utilizadas para as consultas <code translate="no">CREATE</code>:</p>
<ul>
<li><code translate="no">create_auto_id</code>: se se deve gerar automaticamente o id quando se inserem registos sem ID (pré-definição=False)</li>
<li><code translate="no">create_id_max_len</code>: comprimento máximo do campo id ao criar uma tabela (predefinição=64)</li>
<li><code translate="no">create_embedding_dim</code>: dimensão de incorporação para criar uma tabela (predefinição=8)</li>
<li><code translate="no">create_dynamic_field</code>: se as tabelas criadas têm ou não campos dinâmicos (predefinição=Verdadeiro)</li>
<li><code translate="no">create_content_max_len</code>: comprimento máximo da coluna de conteúdo (pré-definição=200)</li>
<li><code translate="no">create_content_default_value</code>: valor por defeito da coluna de conteúdo (por defeito='')</li>
<li><code translate="no">create_schema_description</code>: descrição dos esquemas criados (por defeito='')</li>
<li><code translate="no">create_alias</code>alias dos esquemas criados (por defeito='default')</li>
<li><code translate="no">create_index_params</code>: parâmetros do índice criado na coluna "embeddings" (predefinição={})</li>
<li><code translate="no">create_index_metric_type</code>: métrica utilizada para criar o índice (predefinição='L2')</li>
<li><code translate="no">create_index_type</code>o tipo de índice (predefinição='AUTOINDEX')</li>
</ul>
<h2 id="Usage" class="common-anchor-header">Utilização<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de continuar, certifique-se de que a versão <code translate="no">pymilvus</code> é igual a esta <a href="https://github.com/mindsdb/mindsdb/blob/main/mindsdb/integrations/handlers/milvus_handler/requirements.txt">versão fixada</a>. Se encontrar quaisquer problemas com a compatibilidade de versões, pode reverter a sua versão do pymilvus ou personalizá-la neste <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">ficheiro de requisitos</a>.</p>
<h3 id="Creating-connection" class="common-anchor-header">Criar uma ligação</h3><p>Para utilizar este manipulador e ligar-se a um servidor Milvus no MindsDB, pode ser utilizada a seguinte sintaxe:</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">CREATE</span> DATABASE milvus_datasource
<span class="hljs-keyword">WITH</span>
  ENGINE <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;milvus&#x27;</span>,
  PARAMETERS <span class="hljs-operator">=</span> {
    &quot;uri&quot;: &quot;./milvus_local.db&quot;,
    &quot;token&quot;: &quot;&quot;,
    &quot;create_embedding_dim&quot;: <span class="hljs-number">3</span>,
    &quot;create_auto_id&quot;: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<ul>
<li>Se apenas necessitar de uma base de dados vetorial local para dados de pequena escala ou prototipagem, definir o uri como um ficheiro local, por exemplo,<code translate="no">./milvus.db</code>, é o método mais conveniente, uma vez que utiliza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">o Milvus Lite</a> para armazenar todos os dados neste ficheiro.</li>
<li>Para dados de maior escala e tráfego em produção, pode configurar um servidor Milvus em <a href="https://milvus.io/docs/install-overview.md">Docker ou Kubernetes</a>. Nesta configuração, use o endereço e a porta do servidor como seu <code translate="no">uri</code>, por exemplo,<code translate="no">http://localhost:19530</code>. Se ativar a funcionalidade de autenticação no Milvus, defina o <code translate="no">token</code> como <code translate="no">&quot;&lt;your_username&gt;:&lt;your_password&gt;&quot;</code>, caso contrário não é necessário definir o token.</li>
<li>Também pode utilizar o Milvus totalmente gerido no <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Basta definir os endereços <code translate="no">uri</code> e <code translate="no">token</code> para o <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint e a chave API</a> da sua instância Zilliz Cloud.</li>
</ul>
</blockquote>
<h3 id="Dropping-connection" class="common-anchor-header">Abandonar a ligação</h3><p>Para abandonar a ligação, utilize este comando</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DROP</span> DATABASE milvus_datasource;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-tables" class="common-anchor-header">Criar tabelas</h3><p>Para inserir dados de uma tabela pré-existente, utilize <code translate="no">CREATE</code></p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> milvus_datasource.test
(<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> sqlitedb.test);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Dropping-collections" class="common-anchor-header">Eliminar colecções</h3><p>A eliminação de uma coleção não é suportada</p>
<h3 id="Querying-and-selecting" class="common-anchor-header">Consultar e selecionar</h3><p>Para consultar a base de dados utilizando um vetor de pesquisa, pode utilizar <code translate="no">search_vector</code> na cláusula <code translate="no">WHERE</code> </p>
<p>Advertências:</p>
<ul>
<li>Se omitir <code translate="no">LIMIT</code>, a cláusula <code translate="no">search_default_limit</code> é utilizada, uma vez que o Milvus assim o exige</li>
<li>A coluna de metadados não é suportada, mas se a coleção tiver um esquema dinâmico ativado, pode efetuar a consulta normalmente, ver o exemplo abaixo</li>
<li>Os campos dinâmicos não podem ser apresentados, mas podem ser consultados</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> milvus_datasource.test
<span class="hljs-keyword">WHERE</span> search_vector <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;[3.0, 1.0, 2.0, 4.5]&#x27;</span>
LIMIT <span class="hljs-number">10</span>;
<button class="copy-code-btn"></button></code></pre>
<p>Se omitir a cláusula <code translate="no">search_vector</code>, esta torna-se uma pesquisa básica e é devolvida a quantidade de entradas na coleção <code translate="no">LIMIT</code> ou <code translate="no">search_default_limit</code> </p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> milvus_datasource.test
<button class="copy-code-btn"></button></code></pre>
<p>Pode utilizar a cláusula <code translate="no">WHERE</code> nos campos dinâmicos como se fosse uma SQL normal.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> milvus_datasource.createtest
<span class="hljs-keyword">WHERE</span> category <span class="hljs-operator">=</span> &quot;science&quot;;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deleting-records" class="common-anchor-header">Eliminar registos</h3><p>Pode eliminar registos utilizando <code translate="no">DELETE</code> tal como em SQL.</p>
<p>Advertências:</p>
<ul>
<li>O Milvus apenas suporta a eliminação de entidades com chaves primárias claramente especificadas</li>
<li>Só é possível utilizar o operador <code translate="no">IN</code> </li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> milvus_datasource.test
<span class="hljs-keyword">WHERE</span> id <span class="hljs-keyword">IN</span> (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Inserting-records" class="common-anchor-header">Inserir registos</h3><p>Também pode inserir linhas individuais desta forma:</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> milvus_test.testable (id,content,metadata,embeddings)
<span class="hljs-keyword">VALUES</span> (&quot;id3&quot;, <span class="hljs-string">&#x27;this is a test&#x27;</span>, <span class="hljs-string">&#x27;{&quot;test&quot;: &quot;test&quot;}&#x27;</span>, <span class="hljs-string">&#x27;[1.0, 8.0, 9.0]&#x27;</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Updating" class="common-anchor-header">Atualização</h3><p>A atualização de registos não é suportada pela API do Milvus. Pode tentar utilizar a combinação de <code translate="no">DELETE</code> e <code translate="no">INSERT</code></p>
<hr>
<p>Para obter mais detalhes e exemplos, consulte a <a href="https://docs.mindsdb.com/what-is-mindsdb">documentação oficial do MindsDB</a>.</p>
