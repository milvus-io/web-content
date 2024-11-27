---
id: question_answering_system.md
summary: Construire un système de réponse aux questions avec Milvus.
title: Système de réponse aux questions
---
<h1 id="Question-Answering-System" class="common-anchor-header">Système de réponse aux questions<button data-href="#Question-Answering-System" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce tutoriel montre comment utiliser Milvus, la base de données vectorielle open-source, pour construire un système de réponse aux questions (QA).</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/question_answering">Ouvrir un carnet Jupyter</a></li>
<li><a href="https://milvus.io/milvus-demos/">Essayer la démo en ligne</a></li>
</ul>
<p>Le modèle ML et les logiciels tiers utilisés comprennent :</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>Le système de réponse aux questions est une application courante dans le monde réel qui appartient au domaine du traitement du langage naturel. Les systèmes d'assurance qualité typiques comprennent les systèmes de service client en ligne, les chatbots d'assurance qualité, etc. La plupart des systèmes de réponse aux questions peuvent être classés comme suit : systèmes de réponse aux questions génératifs ou de récupération, à un seul tour ou à plusieurs tours, à domaine ouvert ou spécifique.</p>
<p></br></p>
<p>Dans ce tutoriel, vous apprendrez à construire un système d'assurance qualité capable de relier les nouvelles questions des utilisateurs à des réponses massives préalablement stockées dans la base de données vectorielle. Pour construire un tel chatbot, préparez votre propre base de données de questions et de réponses correspondantes. Stockez les questions et les réponses dans MySQL, une base de données relationnelle. Utilisez ensuite BERT, le modèle d'apprentissage machine (ML) pour le traitement du langage naturel (NLP) afin de convertir les questions en vecteurs. Ces vecteurs de questions sont stockés et indexés dans Milvus.  Lorsque les utilisateurs saisissent une nouvelle question, celle-ci est également convertie en vecteur par le modèle BERT, et Milvus recherche le vecteur de question le plus similaire à ce nouveau vecteur. Le système d'assurance qualité renvoie la réponse correspondante aux questions les plus similaires.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/qa_chatbot.png" alt="QA_Chatbot" class="doc-image" id="qa_chatbot" />
   </span> <span class="img-wrapper"> <span>QA_Chatbot</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/qa_chatbot_demo.png" alt="QA_chatbot_demo" class="doc-image" id="qa_chatbot_demo" />
   </span> <span class="img-wrapper"> <span>QA_chatbot_demo</span> </span></p>
