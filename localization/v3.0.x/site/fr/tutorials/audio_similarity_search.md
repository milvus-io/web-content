---
id: audio_similarity_search.md
summary: Construire un système de recherche de similarités audio avec Milvus.
title: Recherche de similarité audio
---
<h1 id="Audio-Similarity-Search" class="common-anchor-header">Recherche de similarité audio<button data-href="#Audio-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce tutoriel montre comment utiliser Milvus, la base de données vectorielle open-source, pour construire un système de recherche de similarité audio.</p>
<p>Le modèle ML et les logiciels tiers utilisés comprennent :</p>
<ul>
<li>PANNs (réseaux neuronaux audio pré-entraînés à grande échelle)</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>La recherche sur la parole, la musique, les effets sonores et d'autres types de recherche audio permet d'interroger rapidement des volumes massifs de données audio et de mettre en évidence des sons similaires. Les applications des systèmes de recherche de similarité audio comprennent l'identification d'effets sonores similaires, la minimisation des infractions à la propriété intellectuelle, etc. La recherche audio peut être utilisée pour rechercher et surveiller les médias en ligne en temps réel afin de réprimer les violations des droits de propriété intellectuelle. Elle joue également un rôle important dans la classification et l'analyse statistique des données audio.</p>
<p></br></p>
<p>Dans ce tutoriel, vous apprendrez à construire un système de recherche de similarités audio capable de renvoyer des clips sonores similaires. Les clips audio téléchargés sont convertis en vecteurs à l'aide des PANN. Ces vecteurs sont stockés dans Milvus qui génère automatiquement un identifiant unique pour chaque vecteur. Les utilisateurs peuvent ensuite effectuer une recherche de similarité vectorielle dans Milvus et interroger le chemin de données du clip audio correspondant à l'ID unique du vecteur renvoyé par Milvus.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/audio_search.png" alt="Audio_search" class="doc-image" id="audio_search" />
   </span> <span class="img-wrapper"> <span>Audio_search</span> </span> <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/audio_search_demo.png" alt="Audio_search_demo" class="doc-image" id="audio_search_demo" /><span>Audio_search_demo</span> </span></p>
