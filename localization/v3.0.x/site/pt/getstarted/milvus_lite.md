---
id: milvus_lite.md
summary: >-
  Instale o Milvus Lite e execute uma pesquisa vetorial local com um caminho de
  base de dados persistente.
title: Executar o Milvus Lite localmente
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">Executar o Milvus Lite localmente<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página mostra como executar uma pesquisa vetorial local com o Milvus Lite. Aborda a instalação, a persistência de dados, a filtragem e a exportação de dados para outra implementação do Milvus.</p>
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
    </button></h2><p>O Milvus Lite é um backend local leve para o <a href="https://github.com/milvus-io/pymilvus">SDK do Milvus em Python</a>. Instale-o com o complemento opcional « <code translate="no">milvus-lite</code> »; a instalação apenas do « <code translate="no">pymilvus</code> » não instala este backend na versão do SDK utilizada abaixo.</p>
<p>O Milvus Lite é adequado para desenvolvimento local e cargas de trabalho de pequena escala em ambientes como:</p>
<ul>
<li>Jupyter Notebook ou Google Colab</li>
<li>Portáteis</li>
<li>Dispositivos de borda com dependências Python compatíveis</li>
</ul>
<p>O Milvus Lite utiliza a API <code translate="no">MilvusClient</code> para operações suportadas, incluindo persistência de dados vetoriais, inserção e eliminação, pesquisa vetorial e filtragem de metadados. Para transferir um fluxo de trabalho de aplicação suportado para uma implementação remota, altere o URI de ligação e as credenciais e analise as diferenças nas funcionalidades suportadas. Para cargas de trabalho de produção em grande escala, utilize <a href="/docs/pt/install-overview.md">o Milvus Standalone ou Distributed</a>, ou o Milvus totalmente gerido na <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
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
    </button></h2><p>Este guia utiliza o PyMilvus <strong>3.0.2</strong> e o Milvus Lite <strong>3.2.2</strong>. Prepare o seguinte ambiente:</p>
<ul>
<li>Python 3.10 ou mais recente. O backend Lite local requer uma versão mínima do Python superior à do cliente PyMilvus remoto.</li>
<li>macOS, Linux ou Windows, com «wheels» compatíveis para dependências como <code translate="no">faiss-cpu</code> e <code translate="no">pyarrow</code>. O Milvus Lite 3.2.2 é um pacote em Python puro, pelo que o sistema operativo e a arquitetura devem satisfazer essas dependências, em vez de o próprio pacote Lite.</li>
<li>Um diretório local com permissão de gravação para armazenamento da base de dados.</li>
</ul>
<p>No Windows, o pip ignora o extra « <code translate="no">milvus-lite</code> » do PyMilvus 3.0.2 devido ao seu marcador de plataforma, pelo que « <code translate="no">milvus-lite</code> » deve ser especificado explicitamente. O comando de instalação abaixo já faz isso. Para outras combinações de pacotes e plataformas, consulte os <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#requirements">requisitos de lançamento do Milvus Lite</a>.</p>
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
    </button></h2><p>Crie um ambiente Python isolado e instale ambos os pacotes:</p>
<pre><code translate="no" class="language-bash">python3 -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate
python -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Coloque a expressão «extras» entre aspas para que shells como o zsh não interpretem os parênteses. No Windows PowerShell, ative o ambiente com « <code translate="no">.venv\Scripts\Activate.ps1</code> » em vez de « <code translate="no">source .venv/bin/activate</code> ». As versões explícitas mantêm o SDK e o backend local alinhados com este guia.</p>
<div class="alert note">
<blockquote>
<p>O Milvus Lite 3.x utiliza um motor de armazenamento diferente do pacote 2.x original. Não é possível abrir um ficheiro <code translate="no">.db</code> existente da versão 2.x no local. Mantenha a base de dados original e um ambiente capaz de a abrir, exporte os dados para esse ambiente e importe-os para uma nova base de dados. A instalação de um novo pacote não migra o formato de armazenamento antigo. Consulte <a href="#Migrating-data-from-Milvus-Lite">«Migração de dados do Milvus Lite</a>».</p>
</blockquote>
</div>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">Ligar-se ao Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Passe um caminho local que termine em <code translate="no">.db</code> para <code translate="no">MilvusClient</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>No caso do Milvus Lite 3.2.2, isto cria um <strong>diretório milvus_demo.db</strong> no diretório de trabalho. O diretório contém os ficheiros de armazenamento da base de dados; o sufixo <code translate="no">.db</code> não significa que se trate de um único ficheiro portátil. Reutilize o mesmo caminho para reabrir a base de dados após fechar o cliente ou reiniciar a aplicação.</p>
<p>Utilize um caminho diferente para uma nova base de dados. Para se ligar a um servidor Milvus remoto, indique o seu ponto de extremidade e as credenciais:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;username:password&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-a-local-search-example" class="common-anchor-header">Executar um exemplo de pesquisa local<button data-href="#Run-a-local-search-example" class="anchor-icon" translate="no">
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
    </button></h2><p>O exemplo seguinte demonstra o fluxo de trabalho da API com vetores gerados. Estes vetores não codificam o significado do texto; utilize um modelo de incorporação ao criar uma pesquisa semântica. Execute o exemplo com um novo caminho de base de dados ou remova o ficheiro <code translate="no">demo_collection</code> existente antes de o executar novamente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors in this example have 384 dimensions.</span>
)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># Generate reproducible example vectors, not semantic embeddings.</span>
rng = np.random.default_rng(<span class="hljs-number">7</span>)
vectors = rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, size=(<span class="hljs-built_in">len</span>(docs), <span class="hljs-number">384</span>)).tolist()
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]
res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Search only records whose subject is &quot;history&quot;.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Retrieve all records that match the scalar filter, without vector ranking.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete one record and keep the others for the export example below.</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(res)
client.close()
<button class="copy-code-btn"></button></code></pre>
<p>Para uma aplicação que gere embeddings a partir de texto, continue com <a href="/docs/pt/quickstart.md">o Guia de Início Rápido</a>. Também pode explorar os <a href="https://github.com/milvus-io/bootcamp">exemplos do Milvus Bootcamp</a> para RAG, pesquisa de imagens e integrações de frameworks.</p>
<h2 id="Supported-features-and-limits" class="common-anchor-header">Funcionalidades suportadas e limites<button data-href="#Supported-features-and-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus Lite 3.2.2 implementa um subconjunto de operações do Milvus através do seu adaptador PyMilvus local. <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">A</a> sua <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">referência de funcionalidades versionada</a> descreve as seguintes capacidades:</p>
<table>
<thead>
<tr><th>Área</th><th>Suporte nesta versão Lite</th></tr>
</thead>
<tbody>
<tr><td>Vetores densos e esparsos</td><td><code translate="no">FLOAT_VECTOR</code> e <code translate="no">SPARSE_FLOAT_VECTOR</code></td></tr>
<tr><td>Índices de vetores</td><td><code translate="no">FLAT</code>, <code translate="no">BRUTE_FORCE</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, e <code translate="no">AUTOINDEX</code></td></tr>
<tr><td>Índices escalares e esparsos</td><td><code translate="no">INVERTED</code> índices escalares e <code translate="no">SPARSE_INVERTED_INDEX</code></td></tr>
<tr><td>Operações sobre dados</td><td>Inserção, upsert, recuperação, consulta, pesquisa vetorial e eliminação</td></tr>
<tr><td>Pesquisa</td><td>Pesquisa densa e esparsa, filtros de metadados, vários campos vetoriais e pesquisa híbrida</td></tr>
<tr><td>Organização de coleções</td><td>Coleções, bases de dados nomeadas, aliases e partições, dentro das operações suportadas pelo adaptador local</td></tr>
</tbody>
</table>
<p>Esta versão não se limita aos índices d <code translate="no">FLAT</code>. A disponibilidade e o comportamento dos índices dependem da versão Lite; não aplique os limites do backend 2.x original ao motor 3.x.</p>
<p>Analise estes limites antes de escolher o Lite para uma aplicação:</p>
<ul>
<li>Apenas um processo pode ser proprietário de um diretório de armazenamento de base de dados de cada vez. O motor protege o diretório com um bloqueio de ficheiro.</li>
<li>Serialize as gravações na mesma coleção. As gravações simultâneas não são suportadas de forma segura.</li>
<li>O adaptador local não implementa todos os RPC do Milvus. As operações não suportadas devolvem « <code translate="no">UNIMPLEMENTED</code> »; a alteração do esquema e o carregamento ou libertação ao nível da partição não estão disponíveis.</li>
<li>A autenticação, os utilizadores, as funções, o RBAC e o TLS não são suportados. Não exponha o servidor local a uma rede não fiável.</li>
<li>Os campos vetoriais «binary», «float16», «bfloat16» e «int8», bem como os índices de quantização de produto, não são suportados.</li>
<li>A versão Lite foi concebida para cargas de trabalho locais. A compatibilidade com a API local não oferece escalabilidade distribuída nem o isolamento e a disponibilidade de produção de uma implementação remota.</li>
</ul>
<p>Consulte as <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#known-limitations">limitações conhecidas por versão</a> antes de confiar numa funcionalidade do servidor que o exemplo local não utilize.</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">Migração de dados do Milvus Lite<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize o <code translate="no">milvus-lite dump</code> para exportar uma coleção como ficheiros JSON do Milvus BulkWriter. Estes ficheiros podem ser importados para uma implementação do Milvus auto-hospedada ou para a Zilliz Cloud.</p>
<p>Instale as dependências do Bulk Writer do SDK no ambiente que acede à base de dados de origem:</p>
<pre><code translate="no" class="language-bash">python -m pip install <span class="hljs-string">&quot;pymilvus[bulk_writer]==3.0.2&quot;</span>
milvus-lite dump -h
<button class="copy-code-btn"></button></code></pre>
<p>Feche a aplicação Python que gere a base de dados local antes de executar o comando noutro processo. Exporte a coleção do exemplo anterior:</p>
<pre><code translate="no" class="language-bash">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<button class="copy-code-btn"></button></code></pre>
<p>O comando lê o ficheiro « <code translate="no">demo_collection</code> » a partir do <strong>diretório de armazenamento «milvus_demo.db»</strong> e grava os ficheiros de exportação no diretório <strong>«data_dir</strong>». Importe esses ficheiros com <a href="/docs/pt/import-data.md">o Bulk Insert</a> ou com <a href="https://docs.zilliz.com/docs/data-import">o Zilliz Cloud Data Import</a>.</p>
<div class="alert note">
<blockquote>
<p>Para exportar um ficheiro de base de dados 2.x original, execute a ferramenta de dump num ambiente com a versão Lite original capaz de abrir esse ficheiro. A ferramenta de dump 3.x não converte o formato de armazenamento antigo ao abri-lo diretamente. Mantenha a base de dados de origem até ter verificado o número de linhas importadas e os resultados da pesquisa.</p>
</blockquote>
</div>
<p>Para conhecer as opções de dump suportadas e as restrições do formato de armazenamento, consulte a <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">referência de exportação do Milvus Lite</a>.</p>
<h2 id="Whats-next" class="common-anchor-header">Próximos passos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Continue com estas tarefas:</p>
<ul>
<li><a href="/docs/pt/quickstart.md">Início rápido</a>: gerar embeddings e executar um fluxo de trabalho de pesquisa.</li>
<li><a href="/docs/pt/single-vector-search.md">Pesquisa de vetor único</a> e <a href="/docs/pt/multi-vector-search.md">pesquisa híbrida</a>: conceba consultas para a sua aplicação.</li>
<li><a href="/docs/pt/install-overview.md">Escolha uma implementação</a>: vá além do desenvolvimento local.</li>
<li><a href="https://github.com/zilliztech/attu">Attu</a>: explore a interface gráfica do Milvus para uma implementação remota.</li>
</ul>
