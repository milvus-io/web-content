---
id: ETL_using_vectorETL.md
summary: >-
  Neste tutorial, vamos explorar como carregar dados de forma eficiente no
  Milvus utilizando o [VectorETL](https://github.com/ContextData/VectorETL), uma
  estrutura ETL leve concebida para bases de dados vectoriais. O VectorETL
  simplifica o processo de extração de dados de várias fontes, transformando-os
  em embeddings vectoriais utilizando modelos de IA, e armazenando-os no Milvus
  para uma recuperação rápida e escalável. No final deste tutorial, terá um
  pipeline ETL funcional que lhe permite integrar e gerir sistemas de pesquisa
  vetorial com facilidade. Vamos mergulhar!
title: Carregamento eficiente de dados no Milvus com VectorETL
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Efficient-Data-Loading-into-Milvus-with-VectorETL" class="common-anchor-header">Carregamento eficiente de dados no Milvus com VectorETL<button data-href="#Efficient-Data-Loading-into-Milvus-with-VectorETL" class="anchor-icon" translate="no">
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
    </button></h1><p>Neste tutorial, exploraremos como carregar dados de forma eficiente no Milvus usando <a href="https://github.com/ContextData/VectorETL">o VectorETL</a>, uma estrutura ETL leve projetada para bancos de dados vetoriais. O VectorETL simplifica o processo de extração de dados de várias fontes, transformando-os em embeddings vetoriais usando modelos de IA e armazenando-os no Milvus para recuperação rápida e escalável. No final deste tutorial, terá um pipeline ETL funcional que lhe permite integrar e gerir sistemas de pesquisa vetorial com facilidade. Vamos mergulhar de cabeça!</p>
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
    </button></h2><h3 id="Dependency-and-Environment" class="common-anchor-header">Dependência e ambiente</h3><pre><code translate="no" class="language-shell">$ pip install --upgrade vector-etl pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se estiver a utilizar o Google Colab, para ativar as dependências que acabou de instalar, poderá ter de <strong>reiniciar o tempo de execução</strong> (clique no menu "Tempo de execução" na parte superior do ecrã e selecione "Reiniciar sessão" no menu pendente).</p>
</div>
<p>O VectorETL suporta várias fontes de dados, incluindo Amazon S3, Google Cloud Storage, Ficheiro Local, etc. Você pode conferir a lista completa de fontes suportadas <a href="https://github.com/ContextData/VectorETL?tab=readme-ov-file#source-configuration">aqui</a>. Neste tutorial, vamos nos concentrar no Amazon S3 como um exemplo de fonte de dados.</p>
<p>Vamos carregar documentos do Amazon S3. Portanto, é necessário preparar <code translate="no">AWS_ACCESS_KEY_ID</code> e <code translate="no">AWS_SECRET_ACCESS_KEY</code> como variáveis de ambiente para acessar com segurança seu bucket S3. Além disso, utilizaremos o modelo de incorporação <code translate="no">text-embedding-ada-002</code> da OpenAI para gerar incorporação para os dados. Também deve preparar a <a href="https://platform.openai.com/docs/quickstart">chave api</a> <code translate="no">OPENAI_API_KEY</code> como uma variável de ambiente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your-openai-api-key&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>] = <span class="hljs-string">&quot;your-aws-access-key-id&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>] = <span class="hljs-string">&quot;your-aws-secret-access-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Workflow" class="common-anchor-header">Fluxo de trabalho<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-the-Data-Source-Amazon-S3" class="common-anchor-header">Definição da fonte de dados (Amazon S3)</h3><p>Neste caso, estamos a extrair documentos de um bucket do Amazon S3. O VectorETL permite-nos especificar o nome do bucket, o caminho para os ficheiros e o tipo de dados com que estamos a trabalhar.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">source</span> = {
    <span class="hljs-string">&quot;source_data_type&quot;</span>: <span class="hljs-string">&quot;Amazon S3&quot;</span>,
    <span class="hljs-string">&quot;bucket_name&quot;</span>: <span class="hljs-string">&quot;my-bucket&quot;</span>,
    <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;path/to/files/&quot;</span>,
    <span class="hljs-string">&quot;file_type&quot;</span>: <span class="hljs-string">&quot;.csv&quot;</span>,
    <span class="hljs-string">&quot;aws_access_key_id&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>],
    <span class="hljs-string">&quot;aws_secret_access_key&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-the-Embedding-Model-OpenAI" class="common-anchor-header">Configurando o modelo de incorporação (OpenAI)</h3><p>Assim que tivermos a nossa fonte de dados configurada, precisamos de definir o modelo de incorporação que transformará os nossos dados textuais em incorporações vectoriais. Aqui, usamos o <code translate="no">text-embedding-ada-002</code> do OpenAI neste exemplo.</p>
<pre><code translate="no" class="language-python">embedding = {
    <span class="hljs-string">&quot;embedding_model&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
    <span class="hljs-string">&quot;api_key&quot;</span>: os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>],
    <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-Up-Milvus-as-the-Target-Database" class="common-anchor-header">Configurar o Milvus como a base de dados de destino</h3><p>Precisamos de armazenar os embeddings gerados no Milvus. Aqui, definimos os nossos parâmetros de ligação ao Milvus usando o Milvus Lite.</p>
<pre><code translate="no" class="language-python">target = {
    <span class="hljs-string">&quot;target_database&quot;</span>: <span class="hljs-string">&quot;Milvus&quot;</span>,
    <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_PUBLIC_ENDPOINT&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;api_key&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_TOKEN&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-string">&quot;vector_dim&quot;</span>: <span class="hljs-number">1536</span>,  <span class="hljs-comment"># 1536 for text-embedding-ada-002</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Para <code translate="no">host</code> e <code translate="no">api_key</code>:</p>
<ul>
<li><p>Definir <code translate="no">host</code> como um ficheiro local, por exemplo,<code translate="no">./milvus.db</code>, e deixar <code translate="no">api_key</code> vazio é o método mais conveniente, pois utiliza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">o Milvus Lite</a> para armazenar todos os dados neste ficheiro.</p></li>
<li><p>Se tiver uma grande escala de dados, pode configurar um servidor Milvus mais eficiente em <a href="https://milvus.io/docs/quickstart.md">docker ou kubernetes</a>. Nesta configuração, use o uri do servidor, por exemplo,<code translate="no">http://localhost:19530</code>, como seu <code translate="no">host</code> e deixe <code translate="no">api_key</code> vazio.</p></li>
<li><p>Se pretender utilizar <a href="https://zilliz.com/cloud">o Zilliz Cloud</a>, o serviço de nuvem totalmente gerido para o Milvus, ajuste <code translate="no">host</code> e <code translate="no">api_key</code>, que correspondem ao <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint e</a> à <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Api key</a> no Zilliz Cloud.</p></li>
</ul>
</div>
<h3 id="Specifying-Columns-for-Embedding" class="common-anchor-header">Especificar colunas para incorporação</h3><p>Agora, temos de especificar quais as colunas dos nossos ficheiros CSV que devem ser convertidas em incorporações. Isso garante que apenas os campos de texto relevantes sejam processados, otimizando a eficiência e o armazenamento.</p>
<pre><code translate="no" class="language-python">embed_columns = [<span class="hljs-string">&quot;col_1&quot;</span>, <span class="hljs-string">&quot;col_2&quot;</span>, <span class="hljs-string">&quot;col_3&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-and-Executing-the-VectorETL-Pipeline" class="common-anchor-header">Criando e executando o pipeline VectorETL</h3><p>Com todas as configurações em vigor, agora inicializamos o pipeline ETL, definimos o fluxo de dados e o executamos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> vector_etl <span class="hljs-keyword">import</span> create_flow

flow = create_flow()
flow.set_source(source)
flow.set_embedding(embedding)
flow.set_target(target)
flow.set_embed_columns(embed_columns)

<span class="hljs-comment"># Execute the flow</span>
flow.execute()
<button class="copy-code-btn"></button></code></pre>
<p>Seguindo este tutorial, criamos com sucesso um pipeline ETL de ponta a ponta para mover documentos do Amazon S3 para o Milvus usando o VectorETL. O VectorETL é flexível nas fontes de dados, pelo que pode escolher as fontes de dados que quiser com base nas necessidades específicas da sua aplicação. Com o design modular do VectorETL, pode facilmente estender este pipeline para suportar outras fontes de dados, incorporando modelos, tornando-o uma ferramenta poderosa para IA e fluxos de trabalho de engenharia de dados!</p>
