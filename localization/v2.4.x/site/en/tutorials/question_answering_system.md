---
id: question_answering_system.md
summary: Build a question answering system with Milvus.
title: Question Answering System
---
<h1 id="Question-Answering-System" class="common-anchor-header">Question Answering System<button data-href="#Question-Answering-System" class="anchor-icon" translate="no">
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
    </button></h1><p>This tutorial demonstrates how to use Milvus, the open-source vector database, to build a question answering (QA) system.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/question_answering">Open Jupyter notebook</a></li>
<li><a href="https://milvus.io/milvus-demos/">Try online demo</a></li>
</ul>
<p>The ML model and third-party software used include:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>Question answering system is a common real world application that belongs to the field of natural language processing. Typical QA systems include online customer service systems, QA chatbots, and more. Most question answering systems can be classified as: generative or retrieval, single-round or multi-round, open-domain or specific question answering systems.</p>
<p></br></p>
<p>In this tutorial, you will learn how to build a QA system that can link new user questions to massive answers previously stored in the vector database. To build such a chatbot, prepare your own dataset of questions and corresponding answers. Store the questions and answers in MySQL, a relational database. Then use BERT, the machine learning (ML) model for natural language processing (NLP) to convert questions into vectors. These question vectors are stored and indexed in Milvus.  When users input a new question, it is converted into a vector by the BERT model as well, and Milvus searches for the most similar question vector to this new vector. The QA system returns the corresponding answer to the most similar questions.</p>
<p></br></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/qa_chatbot.png" alt="QA_Chatbot" class="doc-image" id="qa_chatbot" />
    <span>QA_Chatbot</span>
  </span>
</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/qa_chatbot_demo.png" alt="QA_chatbot_demo" class="doc-image" id="qa_chatbot_demo" />
    <span>QA_chatbot_demo</span>
  </span>
</p>
