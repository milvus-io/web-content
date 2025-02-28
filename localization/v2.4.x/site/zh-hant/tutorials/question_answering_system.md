---
id: question_answering_system.md
summary: 使用 Milvus 建立問題回答系統。
title: 問題回答系統
---
<h1 id="Question-Answering-System" class="common-anchor-header">問題回答系統<button data-href="#Question-Answering-System" class="anchor-icon" translate="no">
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
    </button></h1><p>本教學示範如何使用開放原始碼向量資料庫 Milvus 來建立問題回答 (QA) 系統。</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/question_answering">開啟 Jupyter 記事本</a></li>
<li><a href="https://milvus.io/milvus-demos/">試用線上示範</a></li>
</ul>
<p>使用的 ML 模型和第三方軟體包括</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>問題解答系統是現實世界中常見的應用程式，屬於自然語言處理領域。典型的問答系統包括線上客服系統、問答聊天機器人等。大多數問題回答系統可分為: 產生式或檢索式、單輪或多輪、開放領域或特定問題回答系統。</p>
<p></br></p>
<p>在本教程中，您將學習如何建立一個 QA 系統，它可以將使用者的新問題與先前儲存在向量資料庫中的大量答案連結起來。要建立這樣的聊天機器人，請準備您自己的問題和對應答案資料集。將問題和答案儲存在關係資料庫 MySQL 中。然後使用自然語言處理 (NLP) 的機器學習 (ML) 模型 BERT，將問題轉換成向量。這些問題向量會儲存在 Milvus 中並建立索引。  當使用者輸入一個新問題時，它也會被 BERT 模型轉換成向量，然後 Milvus 會搜尋與這個新向量最相似的問題向量。QA 系統會回傳最相似問題的對應答案。</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/qa_chatbot.png" alt="QA_Chatbot" class="doc-image" id="qa_chatbot" />
   </span> <span class="img-wrapper"> <span>QA_Chatbot</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/qa_chatbot_demo.png" alt="QA_chatbot_demo" class="doc-image" id="qa_chatbot_demo" />
   </span> <span class="img-wrapper"> <span>QA_chatbot_demo</span> </span></p>
