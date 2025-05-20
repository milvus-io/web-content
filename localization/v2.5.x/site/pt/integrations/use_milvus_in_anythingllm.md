---
id: use_milvus_in_anythingllm.md
summary: >-
  Este guia irá guiá-lo através da configuração do Milvus como a base de dados
  vetorial no AnythingLLM, permitindo-lhe incorporar, armazenar e pesquisar os
  seus documentos para uma recuperação inteligente e chat.
title: Usar Milvus no AnythingLLM
---
<h1 id="Use-Milvus-in-AnythingLLM" class="common-anchor-header">Usar Milvus no AnythingLLM<button data-href="#Use-Milvus-in-AnythingLLM" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://anythingllm.com/">O AnythingLLM</a> é uma aplicação de desktop de IA poderosa, focada na privacidade e tudo-em-um que suporta vários LLMs, tipos de documentos e bases de dados vectoriais. Permite-lhe criar um assistente privado, semelhante ao ChatGPT, que pode ser executado localmente ou alojado remotamente, permitindo-lhe conversar de forma inteligente com quaisquer documentos que forneça.</p>
<p>Este guia irá guiá-lo através da configuração do Milvus como a base de dados vetorial no AnythingLLM, permitindo-lhe incorporar, armazenar e pesquisar os seus documentos para recuperação inteligente e chat.</p>
<blockquote>
<p>Este tutorial é baseado na documentação oficial do AnythingLLM e nos passos de uso real. Se a interface do usuário ou as etapas mudarem, consulte os documentos oficiais mais recentes e sinta-se à vontade para sugerir melhorias.</p>
</blockquote>
<hr>
<h2 id="1-Prerequisites" class="common-anchor-header">1. Pré-requisitos<button data-href="#1-Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><a href="https://milvus.io/docs/install-overview.md">Milvus</a> instalado localmente ou uma conta <a href="https://zilliz.com/cloud">Zilliz Cloud</a> </li>
<li><a href="https://anythingllm.com/desktop">AnythingLLM Desktop</a> instalado</li>
<li>Documentos ou fontes de dados prontos para serem carregados e incorporados (PDF, Word, CSV, páginas web, etc.)</li>
</ul>
<hr>
<h2 id="2-Configure-Milvus-as-the-Vector-Database" class="common-anchor-header">2. Configurar o Milvus como a Base de Dados Vetorial<button data-href="#2-Configure-Milvus-as-the-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Abra o AnythingLLM e clique no ícone de <strong>configurações</strong> no canto inferior esquerdo<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_dashboard.png" alt="Open Settings" class="doc-image" id="open-settings" />
   </span> <span class="img-wrapper"> <span>Abrir Configurações</span> </span></li>
</ol>
<ol start="2">
<li><p>No menu esquerdo, selecione <code translate="no">AI Providers</code> &gt; <code translate="no">Vector Database</code> <br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_config.png" alt="Select Vector Database" class="doc-image" id="select-vector-database" />
   </span> <span class="img-wrapper"> <span>Selecione Base de Dados Vetorial</span> </span></p></li>
<li><p>No menu suspenso Provedor de Banco de Dados Vetorial, selecione <strong>Milvus</strong> (ou Zilliz Cloud)<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_vectordb.png" alt="Choose Milvus" class="doc-image" id="choose-milvus" />
   </span> <span class="img-wrapper"> <span>Selecione Milvus</span> </span></p></li>
<li><p>Preencha os seus dados de ligação ao Milvus (para o Milvus local). Aqui está um exemplo:</p>
<ul>
<li><strong>Milvus DB Address</strong>: <code translate="no">http://localhost:19530</code></li>
<li><strong>Milvus Nome de utilizador</strong>: <code translate="no">root</code></li>
<li><strong>Milvus Password</strong>: <code translate="no">Milvus</code>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_milvus.png" alt="Milvus Connection" class="doc-image" id="milvus-connection" />
   </span> <span class="img-wrapper"> <span>Milvus Connection (Ligação Milvus)</span> </span></li>
</ul>
<blockquote>
<p>Se estiver a utilizar o Zilliz Cloud, introduza o seu Cluster Endpoint e o Token API:</p>
</blockquote>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_zilliz_cloud.png" alt="Zilliz Cloud Connection" class="doc-image" id="zilliz-cloud-connection" />
   </span> <span class="img-wrapper"> <span>Ligação Zilliz Cloud</span> </span></p></li>
<li><p>Clique em <strong>Salvar alterações</strong> para aplicar suas configurações.</p></li>
</ol>
<hr>
<h2 id="3-Create-a-Workspace-and-Upload-Documents" class="common-anchor-header">3. Criar um espaço de trabalho e carregar documentos<button data-href="#3-Create-a-Workspace-and-Upload-Documents" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Introduza o seu espaço de trabalho e clique no ícone de <strong>carregamento</strong> para abrir a caixa de diálogo de carregamento de documentos<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_file.png" alt="Open Upload Dialog" class="doc-image" id="open-upload-dialog" />
   </span> <span class="img-wrapper"> <span>Abrir a caixa de diálogo Upload</span> </span></p></li>
<li><p>É possível carregar uma grande variedade de fontes de dados:</p>
<ul>
<li><strong>Ficheiros locais</strong>: PDF, Word, CSV, TXT, ficheiros de áudio, etc.</li>
<li><strong>Páginas Web</strong>: Colar um URL e ir buscar diretamente o conteúdo do sítio Web.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_interface.png" alt="Upload Documents" class="doc-image" id="upload-documents" />
   </span> <span class="img-wrapper"> <span>Carregar documentos</span> </span></p></li>
<li><p>Depois de carregar ou obter, clique em <strong>Mover para espaço de</strong> trabalho para mover o documento ou os dados para o seu espaço de trabalho atual<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_move_to_workspace.png" alt="Move to Workspace" class="doc-image" id="move-to-workspace" />
   </span> <span class="img-wrapper"> <span>Mover para o espaço de trabalho</span> </span></p></li>
<li><p>Selecione o documento ou dados e clique em <strong>Salvar e Incorporar</strong>. O AnythingLLM irá automaticamente dividir, incorporar e armazenar seu conteúdo no Milvus<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_save_and_embed.png" alt="Save and Embed" class="doc-image" id="save-and-embed" />
   </span> <span class="img-wrapper"> <span>Salvar e Incorporar</span> </span></p></li>
</ol>
<hr>
<h2 id="4-Chat-and-Retrieve-Answers-from-Milvus" class="common-anchor-header">4. Bate-papo e Recuperação de Respostas do Milvus<button data-href="#4-Chat-and-Retrieve-Answers-from-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Retorne à interface de bate-papo do espaço de trabalho e faça perguntas. O AnythingLLM pesquisará seu banco de dados de vetores do Milvus em busca de conteúdo relevante e usará o LLM para gerar respostas<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_chat.png" alt="Chat with Docs" class="doc-image" id="chat-with-docs" />
   </span> <span class="img-wrapper"> <span>Bate-papo com Documentos</span> </span></li>
</ol>
<hr>
