---
id: build_rag_on_arm.md
summary: >-
  Neste tutorial, aprenderá a criar uma aplicação Retrieval-Augmented Generation
  (RAG) em infra-estruturas baseadas em Arm. Para o armazenamento de vectores,
  utilizamos o Zilliz Cloud, a base de dados de vectores Milvus totalmente
  gerida. O Zilliz Cloud está disponível nas principais nuvens, como AWS, GCP e
  Azure. Nesta demonstração, usamos o Zilliz Cloud implantado na AWS com
  máquinas Arm. Para LLM, usamos o modelo Llama-3.1-8B na CPU do servidor
  baseado em Arm da AWS usando llama.cpp.
title: Construir RAG na arquitetura Arm
---
<h1 id="Build-RAG-on-Arm-Architecture" class="common-anchor-header">Construir RAG na arquitetura Arm<button data-href="#Build-RAG-on-Arm-Architecture" class="anchor-icon" translate="no">
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
    </button></h1><p>As CPUs<a href="https://www.arm.com/">Arm</a> são amplamente utilizadas em uma ampla gama de aplicações, incluindo casos de uso tradicionais de aprendizado de máquina (ML) e inteligência artificial (AI).</p>
<p>Neste tutorial, aprende a construir uma aplicação Retrieval-Augmented Generation (RAG) em infra-estruturas baseadas em Arm. Para o armazenamento de vetores, utilizamos o <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, o banco de dados de vetores Milvus totalmente gerenciado. O Zilliz Cloud está disponível nas principais nuvens, como AWS, GCP e Azure. Nesta demonstração, usamos o Zilliz Cloud implantado na AWS com máquinas Arm. Para LLM, usamos o modelo <code translate="no">Llama-3.1-8B</code> na CPU do servidor baseado em Arm da AWS usando <code translate="no">llama.cpp</code>.</p>
<h2 id="Prerequisite" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisite" class="anchor-icon" translate="no">
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
    </button></h2><p>Para executar este exemplo, recomendamos que utilize o <a href="https://aws.amazon.com/ec2/graviton/">AWS Graviton</a>, que fornece uma forma económica de executar cargas de trabalho de ML em servidores baseados em Arm. Este notebook foi testado em uma instância do AWS Graviton3 <code translate="no">c7g.2xlarge</code> com o sistema Ubuntu 22.04 LTS.</p>
<p>Você precisa de pelo menos quatro núcleos e 8 GB de RAM para executar este exemplo. Configure o armazenamento em disco até pelo menos 32 GB. Recomendamos que você use uma instância com a mesma especificação ou melhor.</p>
<p>Depois de iniciar a instância, ligue-se a ela e execute os seguintes comandos para preparar o ambiente.</p>
<p>Instalar o python no servidor:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt update
$ <span class="hljs-built_in">sudo</span> apt install python-is-python3 python3-pip python3-venv -y
<button class="copy-code-btn"></button></code></pre>
<p>Criar e ativar um ambiente virtual:</p>
<pre><code translate="no" class="language-bash">$ python -m venv venv
$ <span class="hljs-built_in">source</span> venv/bin/activate
<button class="copy-code-btn"></button></code></pre>
<p>Instalar as dependências python necessárias:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai requests langchain-huggingface huggingface_hub tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-Data-Loading" class="common-anchor-header">Carregamento de dados offline<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">Criar a coleção</h3><p>Utilizamos <a href="https://zilliz.com/cloud">o Zilliz Cloud</a> implementado no AWS com máquinas baseadas em Arm para armazenar e recuperar os dados vectoriais. Para começar rapidamente, basta <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">registar uma conta</a> no Zilliz Cloud gratuitamente.</p>
<div class="alert note">
<p>Para além do Zilliz Cloud, o Milvus auto-hospedado é também uma opção (mais complicada de configurar). Também podemos implementar <a href="https://milvus.io/docs/install_standalone-docker-compose.md">o Milvus Standalone</a> e <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a> em máquinas baseadas em ARM. Para obter mais informações sobre a instalação do Milvus, consulte a <a href="https://milvus.io/docs/install-overview.md">documentação de instalação</a>.</p>
</div>
<p>Definimos <code translate="no">uri</code> e <code translate="no">token</code> como o <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">ponto de extremidade público e a chave Api</a> no Zilliz Cloud.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;&lt;your_zilliz_public_endpoint&gt;&quot;</span>, token=<span class="hljs-string">&quot;&lt;your_zilliz_api_key&gt;&quot;</span>
)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Verifique se a coleção já existe e elimine-a se existir.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Crie uma nova coleção com os parâmetros especificados.</p>
<p>Se não especificarmos qualquer informação de campo, o Milvus criará automaticamente um campo <code translate="no">id</code> por defeito para a chave primária e um campo <code translate="no">vector</code> para armazenar os dados do vetor. Um campo JSON reservado é utilizado para armazenar campos não definidos pelo esquema e os respectivos valores.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">384</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Utilizamos a distância do produto interno como o tipo de métrica predefinido. Para obter mais informações sobre os tipos de distância, pode consultar <a href="https://milvus.io/docs/metric.md?tab=floating">a página Métricas de semelhança</a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">Preparar os dados</h3><p>Utilizamos as páginas de FAQ da <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Documentação do Milvus 2.4.x</a> como conhecimento privado no nosso RAG, que é uma boa fonte de dados para um pipeline RAG simples.</p>
<p>Descarregue o ficheiro zip e extraia os documentos para a pasta <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>Carregamos todos os ficheiros markdown da pasta <code translate="no">milvus_docs/en/faq</code>. Para cada documento, utilizamos simplesmente "#" para separar o conteúdo do ficheiro, o que pode separar aproximadamente o conteúdo de cada parte principal do ficheiro markdown.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Inserir dados</h3><p>Preparamos um modelo de incorporação simples mas eficiente, <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">o all-MiniLM-L6-v2</a>, que pode converter texto em vectores de incorporação.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_huggingface <span class="hljs-keyword">import</span> HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(model_name=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Iteramos pelas linhas de texto, criamos embeddings e depois inserimos os dados no Milvus.</p>
<p>Aqui está um novo campo <code translate="no">text</code>, que é um campo não definido no esquema da coleção. Será automaticamente adicionado ao campo dinâmico JSON reservado, que pode ser tratado como um campo normal a um nível elevado.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

text_embeddings = embedding_model.embed_documents(text_lines)

<span class="hljs-keyword">for</span> i, (line, embedding) <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(
    tqdm(<span class="hljs-built_in">zip</span>(text_lines, text_embeddings), desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)
):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 72/72 [00:18&lt;00:00,  3.91it/s]
</code></pre>
<h2 id="Launch-LLM-Service-on-Arm" class="common-anchor-header">Iniciar o serviço LLM no braço<button data-href="#Launch-LLM-Service-on-Arm" class="anchor-icon" translate="no">
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
    </button></h2><p>Nesta secção, vamos construir e lançar o serviço <code translate="no">llama.cpp</code> no CPU baseado no Arm.</p>
<h3 id="Llama-31-model--llamacpp" class="common-anchor-header">Modelo Llama 3.1 &amp; llama.cpp</h3><p>O <a href="https://huggingface.co/cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf">modelo Llama-3.1-8B</a> da Meta pertence à família de modelos Llama 3.1 e é de uso livre para fins comerciais e de pesquisa. Antes de utilizar o modelo, visite o <a href="https://llama.meta.com/llama-downloads/">sítio Web</a> da Llama e preencha o formulário para pedir acesso.</p>
<p><a href="https://github.com/ggerganov/llama.cpp">O llama.cpp</a> é um projeto C/C++ de código aberto que permite uma inferência LLM eficiente numa variedade de hardware - tanto localmente como na nuvem. É possível hospedar convenientemente um modelo Llama 3.1 usando <code translate="no">llama.cpp</code>.</p>
<h3 id="Download-and-build-llamacpp" class="common-anchor-header">Baixe e construa llama.cpp</h3><p>Execute os seguintes comandos para instalar make, cmake, gcc, g++ e outras ferramentas essenciais necessárias para compilar llama.cpp a partir da fonte:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt install make cmake -y
$ <span class="hljs-built_in">sudo</span> apt install gcc g++ -y
$ <span class="hljs-built_in">sudo</span> apt install build-essential -y
<button class="copy-code-btn"></button></code></pre>
<p>Agora você está pronto para começar a compilar <code translate="no">llama.cpp</code>.</p>
<p>Clone o repositório de código-fonte para llama.cpp:</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/ggerganov/llama.cpp
<button class="copy-code-btn"></button></code></pre>
<p>Por padrão, <code translate="no">llama.cpp</code> constrói para CPU apenas no Linux e no Windows. Não precisa de fornecer quaisquer interruptores extra para o construir para o CPU Arm em que o executa.</p>
<p>Execute <code translate="no">make</code> para compilá-lo:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">cd</span> llama.cpp
$ make GGML_NO_LLAMAFILE=1 -j$(<span class="hljs-built_in">nproc</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Verifique se <code translate="no">llama.cpp</code> foi compilado corretamente executando o comando help:</p>
<pre><code translate="no" class="language-bash">$ ./llama-cli -h
<button class="copy-code-btn"></button></code></pre>
<p>Se <code translate="no">llama.cpp</code> foi compilado corretamente, você verá a opção help exibida. O snippet de saída tem o seguinte aspeto:</p>
<pre><code translate="no">example usage:

    text generation:     ./llama-cli -m your_model.gguf -p &quot;I believe the meaning of life is&quot; -n 128

    chat (conversation): ./llama-cli -m your_model.gguf -p &quot;You are a helpful assistant&quot; -cnv
</code></pre>
<p>Pode agora descarregar o modelo utilizando o cli huggingface:</p>
<pre><code translate="no" class="language-bash">$ huggingface-cli download cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf dolphin-2.9.4-llama3.1-8b-Q4_0.gguf --local-dir . --local-dir-use-symlinks False
<button class="copy-code-btn"></button></code></pre>
<p>O formato do modelo GGUF, introduzido pela equipa llama.cpp, usa compressão e quantização para reduzir a precisão dos pesos para inteiros de 4 bits, diminuindo significativamente as exigências computacionais e de memória e tornando as CPUs Arm eficazes para a inferência LLM.</p>
<h3 id="Re-quantize-the-model-weights" class="common-anchor-header">Re-quantificar os pesos do modelo</h3><p>Para re-quantizar, execute</p>
<pre><code translate="no" class="language-bash">$ ./llama-quantize --allow-requantize dolphin-2.9.4-llama3.1-8b-Q4_0.gguf dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf Q4_0_8_8
<button class="copy-code-btn"></button></code></pre>
<p>Isto produzirá um novo ficheiro, <code translate="no">dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf</code>, que contém pesos reconfigurados que permitem a <code translate="no">llama-cli</code> utilizar o suporte SVE 256 e MATMUL_INT8.</p>
<div class="alert note">
<p>Esta requantização é óptima especificamente para o Graviton3. Para o Graviton2, a requantização ideal deve ser efectuada no formato <code translate="no">Q4_0_4_4</code> e, para o Graviton4, o formato <code translate="no">Q4_0_4_8</code> é o mais adequado para a requantização.</p>
</div>
<h3 id="Start-the-LLM-Service" class="common-anchor-header">Iniciar o serviço LLM</h3><p>Pode utilizar o programa servidor llama.cpp e enviar pedidos através de uma API compatível com OpenAI. Isto permite-lhe desenvolver aplicações que interagem com o LLM várias vezes sem ter de o iniciar e parar repetidamente. Adicionalmente, pode aceder ao servidor a partir de outra máquina onde o LLM está alojado através da rede.</p>
<p>Inicie o servidor a partir da linha de comando, e ele escuta na porta 8080:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./llama-server -m dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf -n 2048 -t 64 -c 65536  --port 8080</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'main: server is listening on 127.0.0.1:8080 - starting the main loop
</code></pre>
<p>Também é possível ajustar os parâmetros do LLM iniciado para adaptá-lo ao hardware do servidor e obter o desempenho ideal. Para obter mais informações sobre os parâmetros, consulte o comando <code translate="no">llama-server --help</code>.</p>
<p>Se tiver dificuldade em executar esta etapa, pode consultar os <a href="https://learn.arm.com/learning-paths/servers-and-cloud-computing/llama-cpu/llama-chatbot/">documentos oficiais</a> para obter mais informações.</p>
<p>Iniciou o serviço LLM na sua CPU baseada em Arm. Em seguida, interagimos diretamente com o serviço usando o OpenAI SDK.</p>
<h2 id="Online-RAG" class="common-anchor-header">RAG online<button data-href="#Online-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="LLM-Client-and-Embedding-Model" class="common-anchor-header">Cliente LLM e modelo de incorporação</h3><p>Inicializamos o cliente LLM e preparamos o modelo de incorporação.</p>
<p>Para o LLM, usamos o OpenAI SDK para solicitar o serviço Llama lançado anteriormente. Não precisamos de usar nenhuma chave de API porque, na verdade, é o nosso serviço local llama.cpp.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

llm_client = OpenAI(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;no-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Gerar um embedding de teste e imprimir a sua dimensão e os primeiros elementos.</p>
<pre><code translate="no" class="language-python">test_embedding = embedding_model.embed_query(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">384
[0.03061249852180481, 0.013831384479999542, -0.02084377221763134, 0.016327863559126854, -0.010231520049273968, -0.0479842908680439, -0.017313342541456223, 0.03728749603033066, 0.04588735103607178, 0.034405000507831573]
</code></pre>
<h3 id="Retrieve-data-for-a-query" class="common-anchor-header">Recuperar dados para uma consulta</h3><p>Vamos especificar uma pergunta frequente sobre o Milvus.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pesquise a pergunta na coleção e obtenha as 3 melhores correspondências semânticas.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        embedding_model.embed_query(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Vamos dar uma olhadela aos resultados da pesquisa da consulta</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        0.6488019824028015
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        0.5974207520484924
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.5833579301834106
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">Utilizar o LLM para obter uma resposta RAG</h3><p>Converta os documentos recuperados num formato de cadeia de caracteres.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Define system and user prompts for the Language Model. This prompt is assembled with the retrieved documents from Milvus.

SYSTEM_PROMPT = &quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;
USER_PROMPT = f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
{context}
&lt;/context&gt;
&lt;question&gt;
{question}
&lt;/question&gt;
&quot;&quot;&quot;
</code></pre>
<p>Use o LLM para gerar uma resposta com base nos prompts. Definimos o parâmetro <code translate="no">model</code> como <code translate="no">not-used</code>, pois é um parâmetro redundante para o serviço llama.cpp.</p>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;not-used&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Milvus stores data in two types: inserted data and metadata. Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage (COS). Metadata are generated within Milvus and each Milvus module has its own metadata that are stored in etcd.
</code></pre>
<p>Parabéns! Construiu uma aplicação RAG sobre as infra-estruturas baseadas em Arm.</p>
