---
id: milvus_and_n8n.md
summary: >-
  n8n is a powerful open-source workflow automation platform that allows you to
  connect various applications, services, and APIs together to create automated
  workflows without coding. With its node-based visual interface, n8n enables
  users to build complex automation processes by simply connecting nodes that
  represent different services or actions. It is self-hostable, highly
  extensible, and supports both fair-code and enterprise licensing.
title: Getting Started with Milvus and n8n
---
<h1 id="Getting-Started-with-Milvus-and-n8n" class="common-anchor-header">Getting Started with Milvus and n8n<button data-href="#Getting-Started-with-Milvus-and-n8n" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="common-anchor-header">Introduction to n8n and the Milvus Vector Store Node<button data-href="#Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://n8n.io/">n8n</a> is a powerful open-source workflow automation platform that allows you to connect various applications, services, and APIs together to create automated workflows without coding. With its node-based visual interface, n8n enables users to build complex automation processes by simply connecting nodes that represent different services or actions. It is self-hostable, highly extensible, and supports both fair-code and enterprise licensing.</p>
<p>The <strong>Milvus Vector Store</strong> node in n8n integrates <a href="https://milvus.io/">Milvus</a> into your automation workflows. This allows you to perform semantic search, power retrieval-augmented generation (RAG) systems, and build intelligent AI applications—all within the n8n ecosystem.</p>
<p>This documentation is primarily based on the official <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus Vector Store documentation</a>. If you find any outdated or inconsistent content, please prioritize the official documentation and feel free to raise an issue for us.</p>
<h2 id="Key-Features" class="common-anchor-header">Key Features<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>With the Milvus Vector Store node in n8n, you can:</p>
<ul>
<li>Interact with your Milvus database as a <a href="https://docs.n8n.io/glossary/#ai-vector-store">vector store</a></li>
<li>Insert documents into Milvus</li>
<li>Get documents from Milvus</li>
<li>Retrieve documents to provide them to a retriever connected to a <a href="https://docs.n8n.io/glossary/#ai-chain">chain</a></li>
<li>Connect directly to an <a href="https://docs.n8n.io/glossary/#ai-agent">agent</a> as a <a href="https://docs.n8n.io/glossary/#ai-tool">tool</a></li>
<li>Filter documents based on metadata</li>
</ul>
<h2 id="Node-Usage-Patterns" class="common-anchor-header">Node Usage Patterns<button data-href="#Node-Usage-Patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>You can use the Milvus Vector Store node in n8n in the following patterns.</p>
<h3 id="Use-as-a-regular-node-to-insert-and-retrieve-documents" class="common-anchor-header">Use as a regular node to insert and retrieve documents</h3><p>You can use the Milvus Vector Store as a regular node to insert, or get documents. This pattern places the Milvus Vector Store in the regular connection flow without using an agent.</p>
<p>See this <a href="https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/">example template</a> for how to build a system that stores documents in Milvus and retrieves them to support cited, chat-based answers.</p>
<h3 id="Connect-directly-to-an-AI-agent-as-a-tool" class="common-anchor-header">Connect directly to an AI agent as a tool</h3><p>You can connect the Milvus Vector Store node directly to the tool connector of an <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/">AI agent</a> to use a vector store as a resource when answering queries.</p>
<p>Here, the connection would be: AI agent (tools connector) -> Milvus Vector Store node. See this <a href="https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/">example template</a> where data is embedded and indexed in Milvus, and the AI Agent uses the vector store as a knowledge tool for question-answering.</p>
<h3 id="Use-a-retriever-to-fetch-documents" class="common-anchor-header">Use a retriever to fetch documents</h3><p>You can use the <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/">Vector Store Retriever</a> node with the Milvus Vector Store node to fetch documents from the Milvus Vector Store node. This is often used with the <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/">Question and Answer Chain</a> node to fetch documents from the vector store that match the given chat input.</p>
<p>A typical node connection flow looks like this: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Milvus Vector Store.</p>
<p>Check out this <a href="https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/">workflow example</a> to see how to ingest external data into Milvus and build a chat-based semantic Q&A system.</p>
<h3 id="Use-the-Vector-Store-Question-Answer-Tool-to-answer-questions" class="common-anchor-header">Use the Vector Store Question Answer Tool to answer questions</h3><p>Another pattern uses the <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">Vector Store Question Answer Tool</a> to summarize results and answer questions from the Milvus Vector Store node. Rather than connecting the Milvus Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.</p>
<p>The connections flow would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Milvus Vector store.</p>
<h2 id="Node-Operation-Modes" class="common-anchor-header">Node Operation Modes<button data-href="#Node-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h2><p>The Milvus Vector Store node supports multiple operation modes, each tailored for different workflow use cases. Understanding these modes helps design more effective workflows.</p>
<p>We will provide a high-level overview of the available operation modes and options below. For a complete list of input parameters and configuration options for each mode, please refer to the <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">official documentation</a>.</p>
<hr>
<h3 id="Operation-Modes-Overview" class="common-anchor-header">Operation Modes Overview</h3><p>The Milvus Vector Store node supports four distinct modes:</p>
<ul>
<li><strong>Get Many</strong>: Retrieve multiple documents based on semantic similarity to a prompt.</li>
<li><strong>Insert Documents</strong>: Insert new documents into your Milvus collection.</li>
<li><strong>Retrieve Documents (As Vector Store for Chain/Tool)</strong>: Use the node as a retriever within a chain-based system.</li>
<li><strong>Retrieve Documents (As Tool for AI Agent)</strong>: Use the node as a tool resource for an AI agent during question-answering tasks.</li>
</ul>
<h3 id="Additional-Node-Options" class="common-anchor-header">Additional Node Options</h3><ul>
<li><strong>Metadata Filter</strong> (Get Many mode only): Filter results based on custom metadata keys. Multiple fields apply an AND condition.</li>
<li><strong>Clear Collection</strong> (Insert Documents mode only): Remove existing documents from the collection prior to inserting new ones.</li>
</ul>
<h3 id="Related-Resources" class="common-anchor-header">Related Resources</h3><ul>
<li><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus Integration Documentation</a></li>
<li><a href="https://js.langchain.com/docs/integrations/vectorstores/milvus/">LangChain Milvus Documentation</a></li>
<li><a href="https://docs.n8n.io/advanced-ai/">n8n Advanced AI Documentation</a></li>
</ul>
