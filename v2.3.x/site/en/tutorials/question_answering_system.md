---
id: question_answering_system.md
summary: Build a question answering system with Milvus.
title: Question Answering System
---

# Question Answering System 

This tutorial demonstrates how to use Milvus, the open-source vector database, to build a question answering (QA) system.
- [Open Jupyter notebook](https://github.com/towhee-io/examples/tree/main/nlp/question_answering)
- [Try online demo](https://milvus.io/milvus-demos/)

The ML model and third-party software used include:
- BERT
- MySQL
- [Towhee](https://towhee.io/)

</br>

Question answering system is a common real world application that belongs to the field of natural language processing. Typical QA systems include online customer service systems, QA chatbots, and more. Most question answering systems can be classified as: generative or retrieval, single-round or multi-round, open-domain or specific question answering systems.

</br>

In this tutorial, you will learn how to build a QA system that can link new user questions to massive answers previously stored in the vector database. To build such a chatbot, prepare your own dataset of questions and corresponding answers. Store the questions and answers in MySQL, a relational database. Then use BERT, the machine learning (ML) model for natural language processing (NLP) to convert questions into vectors. These question vectors are stored and indexed in Milvus.  When users input a new question, it is converted into a vector by the BERT model as well, and Milvus searches for the most similar question vector to this new vector. The QA system returns the corresponding answer to the most similar questions.

</br>

![QA_Chatbot](../../../assets/qa_chatbot.png "Workflow of a QA chatbot.")


![QA_chatbot_demo](../../../assets/qa_chatbot_demo.png "Demo of a QA chatbot.")


