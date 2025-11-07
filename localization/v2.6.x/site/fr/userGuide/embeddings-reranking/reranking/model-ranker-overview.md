---
id: model-ranker-overview.md
title: Aperçu de Model RankerCompatible with Milvus 2.6.x
summary: >-
  La recherche vectorielle traditionnelle classe les résultats uniquement en
  fonction de la similarité mathématique, c'est-à-dire de la proximité des
  vecteurs dans un espace à haute dimension. Bien qu'efficace, cette approche
  passe souvent à côté de la véritable pertinence sémantique. Pensez à la
  recherche de "meilleures pratiques pour l'optimisation des bases de données" :
  vous pourriez recevoir des documents à forte similarité vectorielle qui
  mentionnent fréquemment ces termes, mais qui ne fournissent pas réellement de
  stratégies d'optimisation exploitables.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">Aperçu de Model Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>La recherche vectorielle traditionnelle classe les résultats uniquement en fonction de la similarité mathématique, c'est-à-dire de la proximité des vecteurs dans un espace à haute dimension. Bien qu'efficace, cette approche passe souvent à côté de la véritable pertinence sémantique. Pensez à la recherche de <strong>"meilleures pratiques pour l'optimisation des bases de données" :</strong> vous pourriez recevoir des documents avec une similarité vectorielle élevée qui mentionnent fréquemment ces termes, mais qui ne fournissent pas réellement de stratégies d'optimisation exploitables.</p>
<p>Model Ranker transforme la recherche Milvus en intégrant des modèles de langage avancés qui comprennent les relations sémantiques entre les requêtes et les documents. Au lieu de s'appuyer uniquement sur la similarité vectorielle, il évalue la signification du contenu et le contexte pour fournir des résultats plus intelligents et plus pertinents.</p>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Les modèles de classement ne peuvent pas être utilisés avec les recherches par regroupement.</p></li>
<li><p>Les champs utilisés pour le reclassement des modèles doivent être de type texte (<code translate="no">VARCHAR</code>).</p></li>
<li><p>Chaque modèle de classement ne peut utiliser qu'un seul champ <code translate="no">VARCHAR</code> à la fois pour l'évaluation.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Fonctionnement<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Les classificateurs de modèles intègrent les capacités de compréhension des modèles linguistiques dans le processus de recherche Milvus par le biais d'un flux de travail bien défini :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" />
   </span> <span class="img-wrapper"> <span>Vue d'ensemble des classificateurs de modèles</span> </span></p>
<ol>
<li><p><strong>Requête initiale</strong>: Votre application envoie une requête à Milvus.</p></li>
<li><p><strong>Recherche vectorielle</strong>: Milvus effectue une recherche vectorielle standard pour identifier les documents candidats.</p></li>
<li><p><strong>Récupération des candidats</strong>: Le système identifie l'ensemble initial de documents candidats sur la base de la similarité vectorielle.</p></li>
<li><p><strong>Évaluation du modèle</strong>: La fonction Model Ranker traite les paires requête-document :</p>
<ul>
<li><p>Envoie la requête originale et les documents candidats à un service de modèle externe.</p></li>
<li><p>Le modèle linguistique évalue la pertinence sémantique entre la requête et chaque document.</p></li>
<li><p>Chaque document reçoit un score de pertinence basé sur la compréhension sémantique.</p></li>
</ul></li>
<li><p><strong>Réorganisation intelligente</strong>: Les documents sont réorganisés en fonction des scores de pertinence générés par le modèle.</p></li>
<li><p><strong>Résultats améliorés</strong>: Votre application reçoit des résultats classés en fonction de la pertinence sémantique plutôt que de la simple similarité vectorielle.</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">Choisissez un fournisseur de modèles adapté à vos besoins<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge les fournisseurs de services de modèle suivants pour le reclassement, chacun ayant des caractéristiques distinctes :</p>
<table>
   <tr>
     <th><p>Fournisseur</p></th>
     <th><p>Meilleur pour</p></th>
     <th><p>Caractéristiques</p></th>
     <th><p>Exemple de cas d'utilisation</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>Applications complexes nécessitant une compréhension sémantique approfondie et une personnalisation</p></td>
     <td><ul><li><p>Prise en charge de divers modèles linguistiques de grande taille</p></li><li><p>Options de déploiement flexibles</p></li><li><p>Exigences de calcul plus élevées</p></li><li><p>Potentiel de personnalisation plus important</p></li></ul></td>
     <td><p>Plate-forme de recherche juridique déployant des modèles spécifiques à un domaine qui comprennent la terminologie juridique et les relations avec la jurisprudence</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>Mise en œuvre rapide avec utilisation efficace des ressources</p></td>
     <td><ul><li><p>Service léger optimisé pour les opérations textuelles</p></li><li><p>Déploiement plus facile avec des besoins en ressources moindres</p></li><li><p>Modèles de reclassement pré-optimisés</p></li><li><p>Frais d'infrastructure minimes</p></li></ul></td>
     <td><p>Système de gestion de contenu nécessitant des capacités de reclassement efficaces avec des exigences standard</p></td>
   </tr>
   <tr>
     <td><p>Cohérence</p></td>
     <td><p>Applications d'entreprise privilégiant la fiabilité et la facilité d'intégration</p></td>
     <td><ul><li><p>Fiabilité et évolutivité de niveau entreprise</p></li><li><p>Service géré sans maintenance de l'infrastructure</p></li><li><p>Capacités de relecture multilingue</p></li><li><p>Limitation de la vitesse et gestion des erreurs intégrées</p></li></ul></td>
     <td><p>Plateforme de commerce électronique nécessitant une recherche à haute disponibilité avec des performances API constantes et des catalogues de produits multilingues</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>Applications RAG avec des exigences spécifiques en matière de performance et de contexte</p></td>
     <td><ul><li><p>Modèles spécialement formés pour les tâches de reranking</p></li><li><p>Contrôles granulaires de la troncature pour diverses longueurs de documents</p></li><li><p>Inférence optimisée pour les charges de travail de production</p></li><li><p>Variantes de modèles multiples (rerank-2, rerank-lite, etc.)</p></li></ul></td>
     <td><p>Base de données de recherche avec différentes longueurs de documents nécessitant un contrôle des performances très fin et une compréhension sémantique spécialisée</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>Applications traitant des documents longs avec des priorités de rentabilité</p></td>
     <td><ul><li><p>Traitement avancé des morceaux de documents avec chevauchement configurable</p></li><li><p>Notation basée sur les morceaux (le morceau ayant obtenu la meilleure note représente le document)</p></li><li><p>Prise en charge de divers modèles de reclassement</p></li><li><p>Rentabilité grâce à des variantes du modèle standard et du modèle pro</p></li></ul></td>
     <td><p>Système de recherche de documentation technique traitant les manuels et les documents longs qui nécessitent une segmentation intelligente et un contrôle des chevauchements.</p></td>
   </tr>
</table>
<p>Pour des informations détaillées sur l'implémentation de chaque modèle de service, veuillez vous référer à la documentation correspondante :</p>
<ul>
<li><p><a href="/docs/fr/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/fr/tei-ranker.md">TEI Ranker</a></p></li>
<li><p><a href="/docs/fr/cohere-ranker.md">Cohere Ranker</a></p></li>
<li><p><a href="/docs/fr/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/fr/siliconflow-ranker.md">SiliconFlow Ranker</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">Mise en œuvre<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d'implémenter Model Ranker, assurez-vous que vous disposez des éléments suivants</p>
<ul>
<li><p>une collection Milvus avec un champ <code translate="no">VARCHAR</code> contenant le texte à reclasser</p></li>
<li><p>Un service de modèle externe en cours d'exécution accessible à votre instance Milvus</p></li>
<li><p>Une connectivité réseau appropriée entre Milvus et le service de modèle choisi.</p></li>
</ul>
<p>Les classeurs de modèles s'intègrent parfaitement aux opérations de recherche vectorielle standard et de recherche hybride. La mise en œuvre consiste à créer un objet Function qui définit votre configuration de reclassement et à le transmettre aux opérations de recherche.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">Créer un classeur de modèles<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour mettre en œuvre un classeur de modèles, il faut d'abord définir un objet Function avec la configuration appropriée. Dans cet exemple, nous utilisons le TEI comme fournisseur de services :</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a model ranker function</span>
model_ranker = Function(
    name=<span class="hljs-string">&quot;semantic_ranker&quot;</span>,  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># VARCHAR field to use for reranking</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,  <span class="hljs-comment"># Specify model reranker. Must be &quot;model&quot;</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot;, &quot;vllm&quot;, etc.</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.ModelRanker;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">ModelRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> ModelRanker.builder()
        .name(<span class="hljs-string">&quot;semantic_ranker&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .provider(<span class="hljs-string">&quot;tei&quot;</span>)
        .queries(Collections.singletonList(<span class="hljs-string">&quot;machine learning for time series&quot;</span>))
        .endpoint(<span class="hljs-string">&quot;http://model-service:8080&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Nécessaire ?</p></th>
     <th><p>Description de l'objet</p></th>
     <th><p>Valeur / Exemple</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Identifiant de la fonction utilisé lors de l'exécution des recherches.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Nom du champ de texte à utiliser pour le reclassement.</p><p>Il doit s'agir d'un champ de type <code translate="no">VARCHAR</code>.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Indique le type de fonction créée.</p><p>Doit être défini sur <code translate="no">RERANK</code> pour tous les classeurs de modèles.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Dictionnaire contenant la configuration de la fonction de reclassement basée sur un modèle. Les paramètres disponibles (clés) varient en fonction du fournisseur de services.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Doit être défini sur <code translate="no">"model"</code> pour activer la fonction de reclassement des modèles.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Le fournisseur de services de modélisation à utiliser pour le reclassement.</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Liste des chaînes de requête utilisées par le modèle de reclassement pour calculer les scores de pertinence.</p><p>Le nombre de chaînes de requête doit correspondre exactement au nombre de requêtes dans votre opération de recherche (même si vous utilisez des vecteurs de requête au lieu de texte), sinon une erreur sera signalée.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>Oui</p></td>
     <td><p>URL du service de modèle.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Non</p></td>
     <td><p>Nombre maximal de documents à traiter en un seul lot. Des valeurs plus élevées augmentent le débit mais nécessitent plus de mémoire.</p></td>
     <td><p><code translate="no">32</code> (par défaut)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Appliquer à la recherche vectorielle standard<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Après avoir défini votre modèle de classement, vous pouvez l'appliquer lors des opérations de recherche en le passant au paramètre ranker :</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Number of query vectors must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;machine learning for time series&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(document))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Appliquer à la recherche hybride<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Les classificateurs de modèles peuvent également être appliqués aux opérations de recherche hybride qui combinent plusieurs champs de vecteurs :</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[your_query_vector_1], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[your_query_vector_2], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply model ranker to hybrid search</span>
hybrid_results = client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Same model ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
        
List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;dense_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(embedding)))
        .limit(<span class="hljs-number">10</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;machine learning for time series&quot;</span>)))
        .limit(<span class="hljs-number">10</span>)
        .build());

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(ranker)
                .limit(<span class="hljs-number">10</span>)
                .outputFields(Arrays.asList(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
