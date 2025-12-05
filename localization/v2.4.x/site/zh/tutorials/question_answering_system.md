---
id: question_answering_system.md
summary: 使用 Milvus 建立问题解答系统。
title: 答题系统
---
<h1 id="Question-Answering-System" class="common-anchor-header">问题解答系统<button data-href="#Question-Answering-System" class="anchor-icon" translate="no">
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
    </button></h1><p>本教程演示如何使用开源向量数据库 Milvus 构建问题解答（QA）系统。</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/question_answering">打开 Jupyter 笔记本</a></li>
<li><a href="https://milvus.io/milvus-demos/">试用在线演示</a></li>
</ul>
<p>使用的 ML 模型和第三方软件包括</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>问题解答系统是现实世界中常见的应用，属于自然语言处理领域。典型的问答系统包括在线客服系统、问答聊天机器人等。大多数问题解答系统可分为：生成式或检索式、单轮或多轮、开放域或特定问题解答系统。</p>
<p></br></p>
<p>在本教程中，您将学习如何构建一个能将新用户问题与之前存储在向量数据库中的海量答案联系起来的问答系统。要构建这样一个聊天机器人，请准备好自己的问题和相应答案数据集。将问题和答案存储在关系数据库 MySQL 中。然后使用自然语言处理（NLP）的机器学习（ML）模型 BERT 将问题转换成向量。这些问题向量存储在 Milvus 中并编制索引。  当用户输入一个新问题时，它也会被 BERT 模型转换成向量，然后 Milvus 会搜索与这个新向量最相似的问题向量。QA 系统会返回最相似问题的相应答案。</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/qa_chatbot.png" alt="QA_Chatbot" class="doc-image" id="qa_chatbot" />
   </span> <span class="img-wrapper"> <span>QA_ 聊天机器人</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/qa_chatbot_demo.png" alt="QA_chatbot_demo" class="doc-image" id="qa_chatbot_demo" />
   </span> <span class="img-wrapper"> <span>QA_chatbot_demo</span> </span></p>
