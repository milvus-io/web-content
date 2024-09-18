---
id: kotaemon_with_milvus.md
summary: >-
  Este tutorial irá guiá-lo sobre como personalizar a sua aplicação kotaemon
  utilizando o Milvus.
title: Kotaemon RAG com Milvus
---
<h1 id="Kotaemon-RAG-with-Milvus" class="common-anchor-header">Kotaemon RAG com Milvus<button data-href="#Kotaemon-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/Cinnamon/kotaemon">O Kotaemon</a> é uma interface RAG de código aberto, limpa e personalizável, para conversar com os seus documentos. Foi criado a pensar nos utilizadores finais e nos programadores.</p>
<p>O Kotaemon fornece uma interface web de QA de documentos personalizável e multi-utilizador que suporta LLMs locais e baseados em API. Oferece um pipeline RAG híbrido com recuperação de texto integral e vetorial, QA multimodal para documentos com figuras e tabelas e citações avançadas com pré-visualizações de documentos. Suporta métodos de raciocínio complexos, como ReAct e ReWOO, e fornece definições configuráveis para recuperação e geração.</p>
<p>Este tutorial irá guiá-lo sobre como personalizar a sua aplicação kotaemon utilizando <a href="https://milvus.io/">o Milvus</a>.</p>
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
    </button></h2><h3 id="Installation" class="common-anchor-header">Instalação do kotaemon</h3><p>Recomendamos a instalação do kotaemon desta forma:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># optional (setup env)</span>
conda create -n kotaemon python=3.10
conda activate kotaemon

git <span class="hljs-built_in">clone</span> https://github.com/Cinnamon/kotaemon
<span class="hljs-built_in">cd</span> kotaemon

pip install -e <span class="hljs-string">&quot;libs/kotaemon[all]&quot;</span>
pip install -e <span class="hljs-string">&quot;libs/ktem&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Além desta forma, existem outras maneiras de instalar o kotaemon. Pode consultar a <a href="https://github.com/Cinnamon/kotaemon?tab=readme-ov-file#installation">documentação oficial</a> para obter mais detalhes.</p>
<h3 id="Set-Milvus-as-the-default-vector-storage" class="common-anchor-header">Definir o Milvus como o armazenamento de vectores predefinido</h3><p>Para alterar o armazenamento de vectores por defeito para Milvus, tem de modificar o ficheiro <code translate="no">flowsettings.py</code> mudando <code translate="no">KH_VECTORSTORE</code> para:</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;__type__&quot;</span>: <span class="hljs-string">&quot;kotaemon.storages.MilvusVectorStore&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Environment-Variables" class="common-anchor-header">Set Environment Variables (Definir variáveis de ambiente)</h3><p>pode configurar os modelos através do ficheiro <code translate="no">.env</code> com as informações necessárias para ligar aos LLM e aos modelos de incorporação, por exemplo, OpenAI, Azure, Ollama, etc.</p>
<h3 id="Run-Kotaemon" class="common-anchor-header">Executar o Kotaemon</h3><p>Depois de configurar as variáveis de ambiente e alterar o armazenamento de vectores, pode executar o kotaemon através do seguinte comando:</p>
<pre><code translate="no" class="language-shell">python app.py
<button class="copy-code-btn"></button></code></pre>
<p>O nome de utilizador/palavra-passe predefinidos são: <code translate="no">admin</code> / <code translate="no">admin</code></p>
<h2 id="Start-RAG-with-kotaemon" class="common-anchor-header">Iniciar o RAG com o kotaemon<button data-href="#Start-RAG-with-kotaemon" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Add-your-AI-models" class="common-anchor-header">1. Adicione os seus modelos de IA</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/kotaemon_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>No separador <code translate="no">Resources</code>, pode adicionar e definir os seus LLM e modelos de incorporação. Pode adicionar vários modelos e defini-los como activos ou inactivos. Só precisa de fornecer pelo menos um. Também pode fornecer vários modelos para permitir a alternância entre eles.</p>
<h3 id="2-Upload-your-documents" class="common-anchor-header">2. Carregue os seus documentos</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/kotaemon_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Para efetuar o controlo de qualidade dos seus documentos, é necessário carregá-los primeiro na aplicação. Navegue até ao separador <code translate="no">File Index</code> e pode carregar e gerir os seus documentos personalizados.</p>
<p>Por defeito, todos os dados da aplicação são armazenados na pasta <code translate="no">./ktem_app_data</code>. Os dados da base de dados Milvus são armazenados em <code translate="no">./ktem_app_data/user_data/vectorstore</code>. Pode fazer uma cópia de segurança ou copiar esta pasta para mover a sua instalação para uma nova máquina.</p>
<h3 id="3-Chat-with-your-documents" class="common-anchor-header">3. Conversar com os seus documentos</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/kotaemon_3.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Agora navegue novamente para o separador <code translate="no">Chat</code>. O separador Conversa é composto por 3 regiões: o Painel de Definições de Conversa, onde gere as conversas e as referências de ficheiros; o Painel de Conversa para interagir com o chatbot; e o Painel de Informação, que apresenta provas de apoio, pontuações de confiança e classificações de relevância para as respostas.</p>
<p>Pode selecionar os seus documentos no Painel de definições de conversação. Depois, basta iniciar o RAG com os seus documentos, escrevendo uma mensagem na caixa de entrada e enviando-a para o chatbot.</p>
<p>Se quiser aprofundar a forma de utilizar o kotaemon, pode obter uma orientação completa na <a href="https://cinnamon.github.io/kotaemon/usage/">documentação oficial</a>.</p>
