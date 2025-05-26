---
id: quickstart_mem0_with_milvus.md
summary: >-
  Neste tutorial, cobriremos as operações essenciais de gerenciamento de memória
  do Mem0 - adicionar, recuperar, atualizar, pesquisar, excluir e rastrear o
  histórico de memória - usando o Milvus, um banco de dados vetorial de alto
  desempenho e de código aberto que possibilita o armazenamento e a recuperação
  eficientes. Esta introdução prática guiá-lo-á através de operações de memória
  fundamentais para o ajudar a criar interações de IA personalizadas com o Mem0
  e o Milvus.
title: Introdução ao Mem0 e ao Milvus
---
<h1 id="Getting-Started-with-Mem0-and-Milvus" class="common-anchor-header">Introdução ao Mem0 e ao Milvus<button data-href="#Getting-Started-with-Mem0-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/quickstart_mem0_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/quickstart_mem0_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://mem0.ai/">O Mem0</a> é uma camada de memória inteligente para aplicações de IA, concebida para proporcionar interações personalizadas e eficientes, retendo as preferências do utilizador e adaptando-se continuamente ao longo do tempo. Ideal para chatbots e ferramentas orientadas por IA, o Mem0 cria experiências perfeitas e conscientes do contexto.</p>
<p>Neste tutorial, abordaremos as operações essenciais de gerenciamento de memória do Mem0 - adicionando, recuperando, atualizando, pesquisando, excluindo e rastreando o histórico de memória - usando <a href="https://milvus.io/">o Milvus</a>, um banco de dados vetorial de alto desempenho e de código aberto que possibilita o armazenamento e a recuperação eficientes. Esta introdução prática guiá-lo-á através de operações de memória fundamentais para o ajudar a criar interações de IA personalizadas com o Mem0 e o Milvus.</p>
<h2 id="Preparation" class="common-anchor-header">Preparação<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Download-required-libraries" class="common-anchor-header">Descarregar as bibliotecas necessárias</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install mem0ai pymilvus</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Se estiver a utilizar o Google Colab, para ativar as dependências que acabou de instalar, poderá ter de <strong>reiniciar o tempo de execução</strong> (clique no menu "Tempo de execução" na parte superior do ecrã e selecione "Reiniciar sessão" no menu pendente).</p>
</blockquote>
<h3 id="Configure-Mem0-with-Milvus" class="common-anchor-header">Configurar o Mem0 com o Milvus</h3><p>Neste exemplo, vamos utilizar o OpenAI como LLM. Deve preparar a <a href="https://platform.openai.com/docs/quickstart">chave api</a> <code translate="no">OPENAI_API_KEY</code> como uma variável de ambiente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Agora, podemos configurar o Mem0 para usar o Milvus como o armazenamento de vetores</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define Config</span>
<span class="hljs-keyword">from</span> mem0 <span class="hljs-keyword">import</span> Memory

config = {
    <span class="hljs-string">&quot;vector_store&quot;</span>: {
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;milvus&quot;</span>,
        <span class="hljs-string">&quot;config&quot;</span>: {
            <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;quickstart_mem0_with_milvus&quot;</span>,
            <span class="hljs-string">&quot;embedding_model_dims&quot;</span>: <span class="hljs-string">&quot;1536&quot;</span>,
            <span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># Use local vector database for demo purpose</span>
        },
    },
    <span class="hljs-string">&quot;version&quot;</span>: <span class="hljs-string">&quot;v1.1&quot;</span>,
}

m = Memory.from_config(config)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<ul>
<li>Se só precisar de uma base de dados vetorial local para dados de pequena escala ou prototipagem, definir o uri como um ficheiro local, por exemplo<code translate="no">./milvus.db</code>, é o método mais conveniente, uma vez que utiliza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">o Milvus Lite</a> para armazenar todos os dados neste ficheiro.</li>
<li>Se tiver uma grande escala de dados, digamos mais de um milhão de vectores, pode configurar um servidor Milvus mais eficiente em <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>. Nesta configuração, use o endereço e a porta do servidor como seu uri, por exemplo,<code translate="no">http://localhost:19530</code>. Se ativar a funcionalidade de autenticação no Milvus, utilize "<your_username>:<your_password>" como token, caso contrário não defina o token.</li>
<li>Se utilizar <a href="https://zilliz.com/cloud">o Zilliz Cloud</a>, o serviço de nuvem totalmente gerido para o Milvus, ajuste <code translate="no">uri</code> e <code translate="no">token</code>, que correspondem ao <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint e</a> à <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">chave API</a> no Zilliz Cloud.</li>
</ul>
</blockquote>
</div>
<h2 id="Managing-User-Memories-with-Mem0-and-Milvus" class="common-anchor-header">Gerir as memórias do utilizador com o Mem0 e o Milvus<button data-href="#Managing-User-Memories-with-Mem0-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Adding-a-Memory" class="common-anchor-header">Adicionar uma memória</h3><p>A função <code translate="no">add</code> armazena texto não estruturado no Milvus como uma memória, associando-o a um utilizador específico e a metadados opcionais.</p>
<p>Aqui, estamos a adicionar a memória da Alice, "working on improving my tennis skills", juntamente com metadados relevantes para o contexto do Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a memory to user: Working on improving tennis skills</span>
res = m.add(
    messages=<span class="hljs-string">&quot;I am working on improving my tennis skills.&quot;</span>,
    user_id=<span class="hljs-string">&quot;alice&quot;</span>,
    metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;hobbies&quot;</span>},
)

res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Working on improving tennis skills',
   'event': 'ADD'}],
 'relations': []}
</code></pre>
<h3 id="Update-a-Memory" class="common-anchor-header">Atualizar uma memória</h3><p>Podemos utilizar o valor de retorno da função <code translate="no">add</code> para obter o ID da memória, permitindo-nos atualizar esta memória com novas informações através de <code translate="no">update</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get memory_id</span>
memory_id = res[<span class="hljs-string">&quot;results&quot;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;id&quot;</span>]

<span class="hljs-comment"># Update this memory with new information: Likes to play tennis on weekends</span>
m.update(memory_id=memory_id, data=<span class="hljs-string">&quot;Likes to play tennis on weekends&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'message': 'Memory updated successfully!'}
</code></pre>
<h3 id="Get-All-Memory-For-a-User" class="common-anchor-header">Obter todas as memórias de um utilizador</h3><p>Podemos utilizar a função <code translate="no">get_all</code> para visualizar todas as memórias inseridas ou filtrar por <code translate="no">user_id</code> no Milvus.</p>
<p>Repare que podemos ver que a memória foi alterada de "A trabalhar para melhorar as capacidades de ténis" para "Gosta de jogar ténis aos fins-de-semana".</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get all memory for the user Alice</span>
m.get_all(user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'}]}
</code></pre>
<h3 id="View-Memory-Update-History" class="common-anchor-header">Ver o histórico de actualizações da memória</h3><p>Também podemos ver o histórico de actualizações da memória especificando o memory_id em que estamos interessados através da função <code translate="no">history</code>.</p>
<pre><code translate="no" class="language-python">m.history(memory_id=memory_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{'id': '71ed3cec-5d9a-4fa6-a009-59802450c0b9',
  'memory_id': '77162018-663b-4dfa-88b1-4f029d6136ab',
  'old_memory': None,
  'new_memory': 'Working on improving tennis skills',
  'event': 'ADD',
  'created_at': '2024-11-01T19:33:44.116920-07:00',
  'updated_at': None},
 {'id': 'db2b003c-ffb7-42e4-bd8a-b9cf56a02bb9',
  'memory_id': '77162018-663b-4dfa-88b1-4f029d6136ab',
  'old_memory': 'Working on improving tennis skills',
  'new_memory': 'Likes to play tennis on weekends',
  'event': 'UPDATE',
  'created_at': '2024-11-01T19:33:44.116920-07:00',
  'updated_at': '2024-11-01T19:33:47.619857-07:00'}]
</code></pre>
<h3 id="Search-Memory" class="common-anchor-header">Procurar memória</h3><p>Podemos utilizar a função <code translate="no">search</code> para procurar a memória mais relacionada com o utilizador.</p>
<p>Vamos começar por adicionar outra memória para a Alice.</p>
<pre><code translate="no" class="language-python">new_mem = m.add(
    <span class="hljs-string">&quot;I have a linear algebra midterm exam on November 20&quot;</span>,
    user_id=<span class="hljs-string">&quot;alice&quot;</span>,
    metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;task&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>Agora, chamamos <code translate="no">get_all</code> especificando o user_id para verificar se temos de facto 2 entradas de memória para a utilizadora Alice.</p>
<pre><code translate="no" class="language-python">m.get_all(user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'},
  {'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
<p>Podemos executar <code translate="no">search</code> agora fornecendo <code translate="no">query</code> e <code translate="no">user_id</code>. Note-se que, por defeito, estamos a utilizar a métrica <code translate="no">L2</code> para a pesquisa de semelhanças, pelo que um <code translate="no">score</code> mais pequeno significa maior semelhança.</p>
<pre><code translate="no" class="language-python">m.search(query=<span class="hljs-string">&quot;What are Alice&#x27;s hobbies&quot;</span>, user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'score': 1.2807445526123047,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'},
  {'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'score': 1.728922724723816,
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
<h3 id="Delete-Memory" class="common-anchor-header">Apagar memória</h3><p>Também podemos <code translate="no">delete</code> uma memória fornecendo o <code translate="no">memory_id</code> correspondente.</p>
<p>Vamos apagar a memória "Gosta de jogar ténis aos fins-de-semana", uma vez que o seu <code translate="no">memory_id</code> já foi recuperado, e chamar <code translate="no">get_all</code> para verificar se a eliminação foi bem sucedida.</p>
<pre><code translate="no" class="language-python">m.delete(memory_id=memory_id)

m.get_all(<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
