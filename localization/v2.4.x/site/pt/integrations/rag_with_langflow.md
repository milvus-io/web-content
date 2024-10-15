---
id: rag_with_langflow.md
summary: >-
  Este guia demonstra como utilizar o Langflow para criar um pipeline RAG
  (Retrieval-Augmented Generation) com o Milvus.
title: Construir um sistema RAG usando Langflow com Milvus
---
<h1 id="Building-a-RAG-System-Using-Langflow-with-Milvus" class="common-anchor-header">Construir um sistema RAG usando Langflow com Milvus<button data-href="#Building-a-RAG-System-Using-Langflow-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia demonstra como utilizar <a href="https://www.langflow.org/">o Langflow</a> para construir um pipeline de Geração Aumentada por Recuperação (RAG) com o <a href="https://milvus.io/">Milvus</a>.</p>
<p>O sistema RAG melhora a geração de texto, recuperando primeiro documentos relevantes de uma base de conhecimentos e, em seguida, gerando novas respostas com base neste contexto. O Milvus é utilizado para armazenar e recuperar texto incorporado, enquanto o Langflow facilita a integração da recuperação e da geração num fluxo de trabalho visual.</p>
<p>O Langflow permite a fácil construção de condutas RAG, em que partes de texto são incorporadas, armazenadas no Milvus e recuperadas quando são efectuadas consultas relevantes. Isto permite que o modelo de linguagem gere respostas contextualmente informadas.</p>
<p>O Milvus funciona como uma base de dados vetorial escalável que encontra rapidamente texto semanticamente semelhante, enquanto o Langflow permite gerir a forma como o pipeline lida com a recuperação de texto e a geração de respostas. Juntos, eles fornecem uma maneira eficiente de criar um pipeline RAG robusto para aplicativos aprimorados baseados em texto.</p>
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
    </button></h2><p>Antes de executar este notebook, certifique-se de ter as seguintes dependências instaladas:</p>
<pre><code translate="no" class="language-shell">$ python -m pip install langflow -U
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tutorial" class="common-anchor-header">Tutorial<button data-href="#Tutorial" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando todas as dependências estiverem instaladas, inicie um painel do Langflow digitando o seguinte comando:</p>
<pre><code translate="no" class="language-shell">$ python -m langflow run
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, um painel aparecerá como mostrado abaixo: <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/langflow_dashboard_start.png" alt="langflow" class="doc-image" id="langflow" /><span>langflow</span> </span></p>
<p>Queremos criar um projeto <strong>Vetor Store</strong>, por isso, primeiro temos de clicar no botão <strong>New Project (Novo projeto</strong> ). Aparece um painel e escolhemos a opção <strong>Vetor Store RAG</strong>: <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/langflow_dashboard_new_project.png" alt="panel" class="doc-image" id="panel" /><span>panel</span> </span></p>
<p>Depois de o projeto Vetor Store Rag ser criado com êxito, o armazenamento de vectores predefinido é o AstraDB, embora queiramos utilizar o Milvus. Por isso, temos de substituir estes dois módulos do astraDB pelo Milvus para podermos utilizar o Milvus como armazenamento de vectores. <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/langflow_default_structure.png" alt="astraDB" class="doc-image" id="astradb" /><span>astraDB</span> </span></p>
<h3 id="Steps-to-replace-astraDB-with-Milvus" class="common-anchor-header">Passos para substituir o astraDB pelo Milvus:</h3><ol>
<li>Remover os cartões existentes do Vetor Store. Clique em dois cartões AstraDB marcados a vermelho na imagem acima e prima <strong>backspace</strong> para os eliminar.</li>
<li>Clique na opção <strong>Vetor Store</strong> na barra lateral, escolha Milvus e arraste-o para a tela. Faça isto duas vezes, pois precisamos de 2 cartões Milvus, um para armazenar o fluxo de trabalho de processamento de ficheiros e outro para o fluxo de trabalho de pesquisa.</li>
<li>Ligue os módulos Milvus ao resto dos componentes. Veja a imagem abaixo para referência.</li>
<li>Configure as credenciais Milvus para ambos os módulos Milvus. A maneira mais simples é usar o Milvus Lite, definindo o URI de conexão como milvus_demo.db. Se tiver um servidor Milvus auto-implantado ou no Zilliz Cloud, defina o URI de ligação para o endpoint do servidor e a Palavra-passe de ligação para o token (para o Milvus é a concatenação &quot;<username>:<password>&quot;, para o Zilliz Cloud é a Chave API). Ver imagem abaixo para referência:</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/langflow_milvus_structure.png" alt="Milvus Structure demo" class="doc-image" id="milvus-structure-demo" />
   </span> <span class="img-wrapper"> <span>Demonstração da estrutura do Milvus</span> </span></p>
<h3 id="Embed-knowledge-into-the-RAG-system" class="common-anchor-header">Integrar conhecimentos no sistema RAG</h3><ol>
<li>Carregue um ficheiro como base de conhecimento do LLM através do módulo de ficheiros no canto inferior esquerdo. Neste caso, carregámos um ficheiro com uma breve introdução ao Milvus</li>
<li>Execute o fluxo de trabalho de inserção, premindo o botão executar no módulo Milvus, no canto inferior direito. Isto irá inserir o conhecimento no armazenamento de vectores do Milvus</li>
<li>Teste se o conhecimento está na memória. Abra o playground e pergunte qualquer coisa relacionada com o ficheiro que carregou.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/langflow_why_milvus.png" alt="why milvus" class="doc-image" id="why-milvus" />
   </span> <span class="img-wrapper"> <span>porquê milvus</span> </span></p>
