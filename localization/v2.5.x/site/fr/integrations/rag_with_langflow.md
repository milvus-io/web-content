---
id: rag_with_langflow.md
summary: >-
  This guide demonstrates how to use Langflow to build a Retrieval-Augmented
  Generation (RAG) pipeline with Milvus.
title: Building a RAG System Using Langflow with Milvus
---
<h1 id="Building-a-RAG-System-Using-Langflow-with-Milvus" class="common-anchor-header">Building a RAG System Using Langflow with Milvus<button data-href="#Building-a-RAG-System-Using-Langflow-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide demonstrates how to use <a href="https://www.langflow.org/">Langflow</a> to build a Retrieval-Augmented Generation (RAG) pipeline with <a href="https://milvus.io/">Milvus</a>.</p>
<p>The RAG system enhances text generation by first retrieving relevant documents from a knowledge base and then generating new responses based on this context. Milvus is used to store and retrieve text embeddings, while Langflow facilitates the integration of retrieval and generation in a visual workflow.</p>
<p>Langflow enables easy construction of RAG pipelines, where chunks of text are embedded, stored in Milvus, and retrieved when relevant queries are made. This allows the language model to generate contextually informed responses.</p>
<p>Milvus serves as a scalable vector database that quickly finds semantically similar text, while Langflow allows you to manage how your pipeline handles text retrieval and response generation. Together, they provide an efficient way to build a robust RAG pipeline for enhanced text-based applications.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Before running this notebook, make sure you have the following dependencies installed:</p>
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
    </button></h2><p>Once all the dependencies are installed, start a Langflow dashboard by typing in the following command:</p>
<pre><code translate="no" class="language-shell">$ python -m langflow run
<button class="copy-code-btn"></button></code></pre>
<p>Then a dashboard will pop up as shown below:

  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/langflow_dashboard_start.png" alt="langflow" class="doc-image" id="langflow" />
    <span>langflow</span>
  </span>
</p>
<p>We want to create a <strong>Vector Store</strong> project, so we first need to click the <strong>New Project</strong> button. A panel would pop up, and we choose the <strong>Vector Store RAG</strong> option:

  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/langflow_dashboard_new_project.png" alt="panel" class="doc-image" id="panel" />
    <span>panel</span>
  </span>
</p>
<p>Once the Vector Store Rag project is successfully created, the default vector store is AstraDB, whereas we want to use Milvus. So we need to replace these two astraDB module with Milvus in order to use Milvus as vector store.

  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/langflow_default_structure.png" alt="astraDB" class="doc-image" id="astradb" />
    <span>astraDB</span>
  </span>
</p>
<h3 id="Steps-to-replace-astraDB-with-Milvus" class="common-anchor-header">Steps to replace astraDB with Milvus:</h3><ol>
<li>Remove existing cards of Vector Store. Click on two AstraDB cards marked red in the above image, and press <strong>backspace</strong> to delete them.</li>
<li>Click on the <strong>Vector Store</strong> option in the sidebar, chose Milvus and drag it into the canvas. Do this twice as we need 2 Milvus cards, one for storing the file processing workflow and one for search workflow.</li>
<li>Link the Milvus Modules to the rest of the components. See the image below for reference.</li>
<li>Configure the Milvus credentials for both Milvus modules. The simplest way is to use Milvus Lite by setting Connection URI to milvus_demo.db. If you have a Milvus server self-deployed or on Zilliz Cloud, set the Connection URI to server endpoint and Connection Password to token (for Milvus that’s concatenated &quot;<username>:<password>&quot;, for Zilliz Cloud it’s API Key). See below image for reference:</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/langflow_milvus_structure.png" alt="Milvus Structure demo" class="doc-image" id="milvus-structure-demo" />
    <span>Milvus Structure demo</span>
  </span>
</p>
<h3 id="Embed-knowledge-into-the-RAG-system" class="common-anchor-header">Embed knowledge into the RAG system</h3><ol>
<li>Upload a file as LLM’s knowledge base through the file module on the bottom left. Here we uploaded a file containing a brief introduction to Milvus</li>
<li>Run the inserting workflow by pressing the run botton on the Milvus module on the bottom right. This will insert the knowledge to the Milvus vector store</li>
<li>Test whether the knowledge is in memory. Open playground and ask anything related to the file you uploaded.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/langflow_why_milvus.png" alt="why milvus" class="doc-image" id="why-milvus" />
    <span>why milvus</span>
  </span>
</p>
