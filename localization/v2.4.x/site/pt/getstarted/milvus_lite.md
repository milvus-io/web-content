---
id: milvus_lite.md
summary: Comece a utilizar o Milvus Lite.
title: Executar o Milvus Lite localmente
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">Executar o Milvus Lite Localmente<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página ilustra como executar o Milvus localmente com o Milvus Lite. O Milvus Lite é a versão leve do <a href="https://github.com/milvus-io/milvus">Milvus</a>, um banco de dados vetorial de código aberto que alimenta aplicativos de IA com embeddings vetoriais e pesquisa de similaridade.</p>
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
    </button></h2><p>O Milvus Lite pode ser importado para a sua aplicação Python, fornecendo a funcionalidade de pesquisa vetorial central do Milvus. O Milvus Lite já está incluído no <a href="https://github.com/milvus-io/pymilvus">Python SDK do Milvus</a>. Ele pode ser simplesmente implantado com <code translate="no">pip install pymilvus</code>.</p>
<p>Com o Milvus Lite, pode começar a construir uma aplicação de IA com pesquisa de semelhanças vectoriais em poucos minutos! O Milvus Lite é bom para ser executado no seguinte ambiente:</p>
<ul>
<li>Jupyter Notebook / Google Colab</li>
<li>Computadores portáteis</li>
<li>Dispositivos Edge</li>
</ul>
<p>O Milvus Lite partilha a mesma API com o Milvus Standalone e Distributed, e cobre a maioria das funcionalidades como a persistência e gestão de dados vectoriais, operações CRUD vectoriais, pesquisa vetorial esparsa e densa, filtragem de metadados, multi-vetor e hybrid_search. Em conjunto, proporcionam uma experiência consistente em diferentes tipos de ambientes, desde dispositivos de ponta a clusters na nuvem, adaptando-se a casos de utilização de diferentes dimensões. Com o mesmo código do lado do cliente, você pode executar aplicativos GenAI com Milvus Lite em um laptop ou Jupyter Notebook, ou Milvus Standalone no contêiner Docker, ou Milvus Distributed em um cluster Kubernetes de escala massiva que serve bilhões de vetores na produção.</p>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus Lite atualmente suporta os seguintes ambientes:</p>
<ul>
<li>Ubuntu &gt;= 20.04 (x86_64 e arm64)</li>
<li>MacOS &gt;= 11.0 (Apple Silicon M1/M2 e x86_64)</li>
</ul>
<p>Note-se que o Milvus Lite só é adequado para casos de utilização de pesquisa vetorial em pequena escala. Para um caso de utilização em grande escala, recomendamos a utilização do <a href="https://milvus.io/docs/install-overview.md#Milvus-Standalone">Milvus Standalone</a> ou <a href="https://milvus.io/docs/install-overview.md#Milvus-Distributed">do Milvus Distributed</a>. Também pode considerar o Milvus totalmente gerido na <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">Configurar o Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>Recomendamos a utilização de <code translate="no">pymilvus</code>. Uma vez que <code translate="no">milvus-lite</code> está incluído em <code translate="no">pymilvus</code> versão 2.4.2 ou superior, pode <code translate="no">pip install</code> com <code translate="no">-U</code> para forçar a atualização para a versão mais recente e <code translate="no">milvus-lite</code> é automaticamente instalado.</p>
<p>Se pretender instalar explicitamente o pacote <code translate="no">milvus-lite</code>, ou se tiver instalado uma versão mais antiga de <code translate="no">milvus-lite</code> e pretender actualizá-la, pode utilizar <code translate="no">pip install -U milvus-lite</code>.</p>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">Ligar ao Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Em <code translate="no">pymilvus</code>, especifique um nome de ficheiro local como parâmetro uri do MilvusClient para utilizar o Milvus Lite.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>
client = <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Depois de executar o trecho de código acima, um arquivo de banco de dados chamado <strong>milvus_demo.db</strong> será gerado na pasta atual.</p>
<blockquote>
<p><strong><em>NOTA:</em></strong> Note que a mesma API também se aplica ao Milvus Standalone, ao Milvus Distributed e ao Zilliz Cloud, a única diferença é substituir o nome do ficheiro local pelo endpoint do servidor remoto e pelas credenciais, por exemplo,<code translate="no">client = MilvusClient(uri=&quot;http://localhost:19530&quot;, token=&quot;username:password&quot;)</code>.</p>
</blockquote>
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
    </button></h2><p>Segue-se uma demonstração simples que mostra como utilizar o Milvus Lite para pesquisa de texto. Existem <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials">exemplos</a> mais abrangentes para usar o Milvus Lite para construir aplicações como <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/build_RAG_with_milvus.ipynb">RAG</a>, <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/image_search_with_milvus.ipynb">pesquisa de imagens</a>, e usar o Milvus Lite em estruturas RAG populares como <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_langchain.ipynb">LangChain</a> e <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_llamaindex.ipynb">LlamaIndex</a>!</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors we will use in this demo has 384 dimensions</span>
)

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<span class="hljs-comment"># For illustration, here we use fake vectors with random numbers (384 dimension).</span>

vectors = [[ np.random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">384</span>) ] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs)) ]
data = [ {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>} <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors)) ]
res = client.insert(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=data
)

<span class="hljs-comment"># This will exclude any text in &quot;history&quot; subject despite close to the query vector.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># a query that retrieves all entities matching filter expressions.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># delete</span>
res = client.delete(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao executar o Milvus Lite, note que alguns recursos não são suportados. As tabelas a seguir resumem os limites de uso do Milvus Lite.</p>
<h3 id="Collection" class="common-anchor-header">Coleção</h3><table>
<thead>
<tr><th>Método / Parâmetro</th><th>Suportado no Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()</a></td><td>Suporte com parâmetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">dimension</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">id_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">vector_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">metric_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">schema</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">num_shards</code></td><td>N</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><code translate="no">num_partitions</code></td><td>N</td></tr>
<tr><td><code translate="no">consistency_level</code></td><td>N (Suporta apenas <code translate="no">Strong</code>; qualquer configuração será tratada como <code translate="no">Strong</code>.)</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a></td><td>Suporta a obtenção de estatísticas de coleção.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_collection.md">describe_collection()</a></td><td><code translate="no">num_shards</code>, <code translate="no">consistency_level</code>, e <code translate="no">collection_id</code> na resposta são inválidos.</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/has_collection.md">has_collection()</a></td><td>Suporta a verificação da existência de uma coleção.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_collections()</a></td><td>Permite listar todas as colecções.</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_collection.md">drop_collection()</a></td><td>Permite eliminar uma coleção.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/rename_collection.md">rename_collection()</a></td><td>Não é possível mudar o nome de uma coleção.</td></tr>
</tbody>
</table>
<h3 id="Field--Schema" class="common-anchor-header">Campo e esquema</h3><table>
<thead>
<tr><th>Método / Parâmetro</th><th>Suportado em Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md">create_schema()</a></td><td>Suporte com parâmetros limitados</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md">add_field()</a></td><td>Suporte com parâmetros limitados</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">datatype</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_primary</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_length</code></td><td>Y</td></tr>
<tr><td><code translate="no">element_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_capacity</code></td><td>Y</td></tr>
<tr><td><code translate="no">dim</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_partition_key</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Insert--Search" class="common-anchor-header">Inserir e pesquisar</h3><table>
<thead>
<tr><th>Método / Parâmetro</th><th>Suportado no Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">search()</a></td><td>Suporte com parâmetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">limit</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">search_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><code translate="no">anns_field</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">query()</a></td><td>Suporte com parâmetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/get.md">get()</a></td><td>Suporte com parâmetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/delete.md">apagar()</a></td><td>Suporte com parâmetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md">inserir()</a></td><td>Suporte com parâmetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/upsert.md">upsert()</a></td><td>Suporte com parâmetros limitados</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Load--Release" class="common-anchor-header">Carregar e libertar</h3><table>
<thead>
<tr><th>Método / Parâmetro</th><th>Suportado em Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md">load_collection()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md">release_collection()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md">get_load_state()</a></td><td>A obtenção do estado do carregamento não é suportada.</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/refresh_load.md">refresh_load()</a></td><td>Não é suportado o carregamento dos dados não carregados de uma coleção carregada.</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/close.md">close()</a></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Index" class="common-anchor-header">Índice</h3><table>
<thead>
<tr><th>Método / Parâmetro</th><th>Suportado em Milvus Lite</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_indexes()</a></td><td>A listagem de índices é suportada.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index()</a></td><td>Suporta apenas o tipo de índice <code translate="no">FLAT</code>.</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md">drop_index()</a></td><td>É suportada a eliminação de índices.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_index()</a></td><td>A descrição dos índices é suportada.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Vector-Index-Types" class="common-anchor-header">Tipos de índices vectoriais</h3><p>O Milvus Lite suporta apenas o tipo de índice <a href="https://milvus.io/docs/index.md?tab=floating#FLAT">FLAT</a>. Utiliza o tipo FLAT independentemente do tipo de índice especificado na coleção.</p>
<h3 id="Search-Features" class="common-anchor-header">Recursos de pesquisa</h3><p>Milvus Lite suporta Vetor Esparso, Multi-vetor, Busca Híbrida.</p>
<h3 id="Partition" class="common-anchor-header">Partição</h3><p>O Milvus Lite não suporta partições e métodos relacionados a partições.</p>
<h3 id="Users--Roles" class="common-anchor-header">Utilizadores e Funções</h3><p>Milvus Lite não suporta usuários e funções e métodos relacionados.</p>
<h3 id="Alias" class="common-anchor-header">Alias</h3><p>O Milvus Lite não suporta aliases e métodos relacionados a aliases.</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">Migrando dados do Milvus Lite<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Todos os dados armazenados no Milvus Lite podem ser facilmente exportados e carregados noutros tipos de implementação do Milvus, como o Milvus Standalone no Docker, o Milvus Distributed no K8s ou o Milvus totalmente gerido no <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
<p>Milvus Lite fornece uma ferramenta de linha de comando que pode despejar dados em um arquivo json, que pode ser importado para <a href="https://github.com/milvus-io/milvus">milvus</a> e <a href="https://zilliz.com/cloud">Zilliz Cloud</a>(o serviço de nuvem totalmente gerenciado para Milvus). O comando milvus-lite será instalado juntamente com o pacote python milvus-lite</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Install</span>
pip install -U <span class="hljs-string">&quot;pymilvus[bulk_writer]&quot;</span>

milvus-lite dump -h

usage: milvus-lite dump [-h] [-d DB_FILE] [-c COLLECTION] [-p PATH]

optional arguments:
  -h, --<span class="hljs-built_in">help</span>            show this <span class="hljs-built_in">help</span> message and <span class="hljs-built_in">exit</span>
  -d DB_FILE, --db-file DB_FILE
                        milvus lite db file
  -c COLLECTION, --collection COLLECTION
                        collection that need to be dumped
  -p PATH, --path PATH  dump file storage <span class="hljs-built_in">dir</span>
<button class="copy-code-btn"></button></code></pre>
<p>O exemplo seguinte descarrega todos os dados da coleção <code translate="no">demo_collection</code> que estão armazenados em <code translate="no">./milvus_demo.db</code> (ficheiro de base de dados do Milvus Lite)</p>
<p>Para exportar dados:</p>
<pre><code translate="no" class="language-shell">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<span class="hljs-comment"># ./milvus_demo.db: milvus lite db file</span>
<span class="hljs-comment"># demo_collection: collection that need to be dumped</span>
<span class="hljs-comment">#./data_dir : dump file storage dir</span>
<button class="copy-code-btn"></button></code></pre>
<p>Com o ficheiro dump, pode carregar os dados para o Zilliz Cloud via <a href="https://docs.zilliz.com/docs/data-import">Data Import</a>, ou carregar os dados para os servidores Milvus via <a href="https://milvus.io/docs/import-data.md">Bulk Insert</a>.</p>
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
    </button></h2><p>Depois de se ligar ao Milvus Lite, pode:</p>
<ul>
<li><p>Verificar <a href="/docs/pt/v2.4.x/quickstart.md">o Quickstart</a> para ver o que Milvus pode fazer.</p></li>
<li><p>Aprender as operações básicas do Milvus:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/manage_databases.md">Gerir bases de dados</a></li>
<li><a href="/docs/pt/v2.4.x/manage-collections.md">Gerir colecções</a></li>
<li><a href="/docs/pt/v2.4.x/manage-partitions.md">Gerir partições</a></li>
<li><a href="/docs/pt/v2.4.x/insert-update-delete.md">Inserir, Upsert e Apagar</a></li>
<li><a href="/docs/pt/v2.4.x/single-vector-search.md">Pesquisa de vetor único</a></li>
<li><a href="/docs/pt/v2.4.x/multi-vector-search.md">Pesquisa híbrida</a></li>
</ul></li>
<li><p><a href="/docs/pt/v2.4.x/upgrade_milvus_cluster-helm.md">Atualizar o Milvus usando o Helm Chart</a>.</p></li>
<li><p><a href="/docs/pt/v2.4.x/scaleout.md">Escalar seu cluster Milvus</a>.</p></li>
<li><p>Implantar seu cluster Milvus em nuvens:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/pt/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/pt/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/pt/v2.4.x/milvus_backup_overview.md">o Milvus Backup</a>, uma ferramenta de código aberto para backups de dados do Milvus.</p></li>
<li><p>Explore o <a href="/docs/pt/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, uma ferramenta de código aberto para depurar o Milvus e actualizações de configuração dinâmica.</p></li>
<li><p>Explore <a href="https://milvus.io/docs/attu.md">o Attu</a>, uma ferramenta GUI de código aberto para gerenciamento intuitivo do Milvus.</p></li>
<li><p><a href="/docs/pt/v2.4.x/monitor.md">Monitore o Milvus com o Prometheus</a>.</p></li>
</ul>
