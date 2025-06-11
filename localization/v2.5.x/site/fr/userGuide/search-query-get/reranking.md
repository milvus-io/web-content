---
id: reranking.md
title: Reranking
summary: >-
  La recherche hybride permet d'obtenir des résultats de recherche plus précis
  grâce à plusieurs recherches ANN simultanées. Les recherches multiples
  renvoient plusieurs ensembles de résultats, qui nécessitent une stratégie de
  reclassement pour aider à fusionner et à réorganiser les résultats et à
  renvoyer un seul ensemble de résultats. Ce guide présente les stratégies de
  reclassement prises en charge par Milvus et fournit des conseils pour
  sélectionner la stratégie de reclassement appropriée.
---

<h1 id="Reranking" class="common-anchor-header">Reranking<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>La recherche hybride permet d'obtenir des résultats de recherche plus précis grâce à plusieurs recherches ANN simultanées. Les recherches multiples renvoient plusieurs ensembles de résultats, qui nécessitent une stratégie de reclassement pour aider à fusionner et à réorganiser les résultats et à renvoyer un seul ensemble de résultats. Ce guide présente les stratégies de reclassement prises en charge par Milvus et fournit des conseils pour sélectionner la stratégie de reclassement appropriée.</p>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Le diagramme suivant illustre le flux de travail principal d'une recherche hybride dans une application de recherche multimodale. Dans le diagramme, un chemin est une recherche ANN de base sur les textes et l'autre chemin est une recherche ANN de base sur les images. Chaque chemin génère un ensemble de résultats basés sur le score de similarité du texte et de l'image respectivement<strong>(limite 1</strong> et <strong>limite 2</strong>). Une stratégie de reclassement est ensuite appliquée pour classer les deux ensembles de résultats sur la base d'une norme unifiée, pour finalement fusionner les deux ensembles de résultats en un ensemble final de résultats de recherche, <strong>Limite(finale).</strong></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="Multi Vector Rerank" class="doc-image" id="multi-vector-rerank" />
   </span> <span class="img-wrapper"> <span>Reranking multi-vecteur</span> </span></p>
<p>Dans la recherche hybride, le reclassement est une étape cruciale qui intègre les résultats de plusieurs recherches vectorielles afin de garantir que le résultat final est le plus pertinent et le plus précis. Actuellement, Milvus prend en charge les deux stratégies de reclassement suivantes :</p>
<ul>
<li><p><strong><a href="/docs/fr/v2.5.x/reranking.md#WeightedRanker">WeightedRanker</a></strong>: Cette stratégie fusionne les résultats en calculant un score pondéré des scores (ou distances) des différentes recherches vectorielles. Les poids sont attribués en fonction de l'importance de chaque champ vectoriel, ce qui permet une personnalisation en fonction des priorités des cas d'utilisation spécifiques.</p></li>
<li><p><strong><a href="/docs/fr/v2.5.x/reranking.md#RRFRanker">RRFRanker</a> (Reciprocal Rank Fusion Ranker)</strong>: Cette stratégie combine les résultats en fonction du classement. Elle utilise une méthode qui équilibre les rangs des résultats provenant de différentes recherches, ce qui conduit souvent à une intégration plus équitable et plus efficace de divers types de données ou de modalités.</p></li>
</ul>
<h2 id="WeightedRanker" class="common-anchor-header">Rangée pondérée<button data-href="#WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>La stratégie WeightedRanker attribue des poids différents aux résultats de chaque chemin de recherche vectorielle en fonction de leur importance.</p>
<h3 id="Mechanism-of-WeightedRanker" class="common-anchor-header">Mécanisme du WeightedRanker</h3><p>Le processus principal de la stratégie WeightedRanker est le suivant :</p>
<ol>
<li><p><strong>Collecte des résultats de la recherche</strong>: Rassembler les résultats et les scores de chaque chemin de recherche vectorielle (score_1, score_2).</p></li>
<li><p><strong>Normalisation des scores</strong>: Chaque recherche peut utiliser des mesures de similarité différentes, ce qui se traduit par des distributions de scores variées. Par exemple, l'utilisation du produit intérieur (PI) comme type de similarité peut donner des résultats allant de [-∞,+∞], tandis que l'utilisation de la distance euclidienne (L2) donne des résultats allant de [0,+∞]. Étant donné que les scores des différentes recherches varient et ne peuvent pas être directement comparés, il est nécessaire de normaliser les scores de chaque chemin de recherche. En règle générale, la fonction <code translate="no">arctan</code> est appliquée pour transformer les scores en une plage comprise entre [0 et 1] (score_1_normalisé, score_2_normalisé). Les scores plus proches de 1 indiquent une plus grande similarité.</p></li>
<li><p><strong>Attribuer des poids</strong>: En fonction de l'importance attribuée aux différents champs vectoriels, des poids<strong>(wi</strong>) sont attribués aux scores normalisés (score_1_normalisé, score_2_normalisé). Les poids de chaque chemin doivent être compris entre [0,1]. Les scores pondérés résultants sont score_1_pondéré et score_2_pondéré.</p></li>
<li><p><strong>Fusionner les scores</strong>: Les scores pondérés (score_1_pondéré, score_2_pondéré) sont classés du plus élevé au plus bas pour produire un ensemble final de scores (score_final).</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/weighted-reranker.png" alt="Weighted Reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>Reranker pondéré</span> </span></p>
<h3 id="Example-of-WeightedRanker" class="common-anchor-header">Exemple de reclasseur pondéré</h3><p>Cet exemple illustre une recherche hybride multimodale (topK=5) impliquant des images et du texte et montre comment la stratégie WeightedRanker reclasse les résultats de deux recherches ANN.</p>
<ul>
<li>Résultats de la recherche ANN sur les images （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Score (image)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.8</p></td>
   </tr>
</table>
<ul>
<li>Résultats de la recherche ANN sur les textes （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Score (texte)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.91</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.87</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.82</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>0.78</p></td>
   </tr>
</table>
<ul>
<li>Utilisez WeightedRanker pour attribuer des poids aux résultats de la recherche d'images et de textes. Supposons que la pondération pour la recherche d'images ANN soit de 0,6 et la pondération pour la recherche de texte de 0,4.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Score (image)</strong></p></th>
     <th><p><strong>Score (texte)</strong></p></th>
     <th><p><strong>Score pondéré</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
     <td><p>0.87</p></td>
     <td><p>0.6×0.92+0.4×0.87=0.90</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
     <td><p>N/A</p></td>
     <td><p>0.6×0.88+0.4×0=0.528</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
     <td><p>N/A</p></td>
     <td><p>0.6×0.85+0.4×0=0.51</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
     <td><p>0.91</p></td>
     <td><p>0.6×0.83+0.4×0.91=0.86</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.80</p></td>
     <td><p>0.82</p></td>
     <td><p>0.6×0.80+0.4×0.82=0.81</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>Pas dans l'image</p></td>
     <td><p>0.85</p></td>
     <td><p>0.6×0+0.4×0.85=0.34</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>Pas dans l'image</p></td>
     <td><p>0.78</p></td>
     <td><p>0.6×0+0.4×0.78=0.312</p></td>
   </tr>
</table>
<ul>
<li>Les résultats finaux après le reranking（topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>Rang</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Score final</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.90</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>198</p></td>
     <td><p>0.86</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>175</p></td>
     <td><p>0.81</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>203</p></td>
     <td><p>0.528</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>150</p></td>
     <td><p>0.51</p></td>
   </tr>
</table>
<h3 id="Usage-of-WeightedRanker" class="common-anchor-header">Utilisation de WeightedRanker</h3><p>Lors de l'utilisation de la stratégie WeightedRanker, il est nécessaire d'entrer des valeurs de pondération. Le nombre de valeurs de poids à saisir doit correspondre au nombre de requêtes de recherche ANN de base dans la recherche hybride. Les valeurs de pondération saisies doivent être comprises entre [0 et 1], les valeurs proches de 1 indiquant une plus grande importance.</p>
<p>Par exemple, supposons qu'il y ait deux requêtes de recherche ANN de base dans une recherche hybride : la recherche de texte et la recherche d'images. Si la recherche de texte est considérée comme plus importante, il convient de lui attribuer un poids plus élevé.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

rerank= WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;

<span class="hljs-type">WeightedRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

reranker := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;ws&quot;,
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="RRFRanker" class="common-anchor-header">RRFRanker<button data-href="#RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>La fusion de rangs réciproques (RRF) est une méthode de fusion de données qui combine des listes classées sur la base de la réciproque de leurs classements. Cette stratégie de reclassement permet d'équilibrer efficacement l'importance de chaque chemin de recherche vectorielle.</p>
<h3 id="Mechanism-of-RRFRanker" class="common-anchor-header">Mécanisme du RRFRanker</h3><p>Le processus principal de la stratégie RRFRanker est le suivant :</p>
<ol>
<li><p><strong>Collecte des classements de recherche</strong>: Collecte des classements des résultats de chaque chemin de recherche vectorielle (rang_1, rang_2).</p></li>
<li><p><strong>Fusionner les classements</strong>: Convertir les classements de chaque chemin (rang_rrf_1, rang_rrf_2) selon une formule .</p>
<p>La formule de calcul fait intervenir <em>N</em>, qui représente le nombre d'extractions. <em>ranki</em><em>(d)</em> est la position de classement du document <em>d</em> généré par le <em>i(ème</em> ) extracteur. <em>k</em> est un paramètre de lissage généralement fixé à 60.</p></li>
<li><p><strong>Classement agrégé</strong>: Reclasser les résultats de la recherche sur la base des classements combinés pour produire les résultats finaux.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/RRF-reranker.png" alt="RRF Reranker" class="doc-image" id="rrf-reranker" />
   </span> <span class="img-wrapper"> <span>RRF Reranker</span> </span></p>
<h3 id="Example-of-RRFRanker" class="common-anchor-header">Exemple de RRFRanker</h3><p>Cet exemple illustre une recherche hybride (topK=5) sur des vecteurs peu denses et montre comment la stratégie RRFRanker reclasse les résultats de deux recherches ANN.</p>
<ul>
<li>Résultats de la recherche ANN sur des vecteurs de textes peu denses （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Rang (clair)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>Résultats de la recherche ANN sur des vecteurs denses de textes （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Rang (dense)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>Utilisez la méthode RRF pour réorganiser les classements des deux ensembles de résultats de recherche. Supposez que le paramètre de lissage <code translate="no">k</code> est fixé à 60.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Score (clairsemé)</strong></p></th>
     <th><p><strong>Score (dense)</strong></p></th>
     <th><p><strong>Score final</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
     <td><p>2</p></td>
     <td><p>1/(60+1)+1/(60+2) = 0.01639</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
     <td><p>1</p></td>
     <td><p>1/(60+4)+1/(60+1) = 0.01593</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
     <td><p>4</p></td>
     <td><p>1/(60+5)+1/(60+4) = 0.01554</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
     <td><p>SANS OBJET</p></td>
     <td><p>1/(60+2) = 0.01613</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>N/A</p></td>
     <td><p>3</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>N/A</p></td>
     <td><p>5</p></td>
     <td><p>1/(60+5) = 0.01554</p></td>
   </tr>
</table>
<ul>
<li>Les résultats finaux après reranking（topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>Rang</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Score final</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.01639</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>203</p></td>
     <td><p>0.01613</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>198</p></td>
     <td><p>0.01593</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>150</p></td>
     <td><p>0.01587</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>110</p></td>
     <td><p>0.01587</p></td>
   </tr>
</table>
<h3 id="Usage-of-RRFRanker" class="common-anchor-header">Utilisation de RRFRanker</h3><p>Lorsque vous utilisez la stratégie de reclassement RRF, vous devez configurer le paramètre <code translate="no">k</code>. Il s'agit d'un paramètre de lissage qui peut modifier efficacement les poids relatifs de la recherche en texte intégral par rapport à la recherche vectorielle. La valeur par défaut de ce paramètre est 60, et il peut être ajusté dans une plage de (0, 16384). La valeur doit être un nombre à virgule flottante. La valeur recommandée est comprise entre [10 et 100]. Bien que <code translate="no">k=60</code> soit un choix courant, la valeur optimale de <code translate="no">k</code> peut varier en fonction de vos applications et ensembles de données spécifiques. Nous vous recommandons de tester et d'ajuster ce paramètre en fonction de votre cas d'utilisation spécifique afin d'obtenir les meilleures performances.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

ranker = RRFRanker(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;

<span class="hljs-type">RRFRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;rerank&quot;</span>: {
    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;k&quot;</span>: 100
    }
}
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {&quot;k&quot;: 100}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Select-the-right-reranking-strategy" class="common-anchor-header">Choisir la bonne stratégie de reclassement<button data-href="#Select-the-right-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Lors du choix d'une stratégie de reclassement, il convient de se demander si une ou plusieurs recherches ANN de base sur les champs vectoriels peuvent être privilégiées.</p>
<ul>
<li><p><strong>WeightedRanker</strong>: Cette stratégie est recommandée si vous souhaitez que les résultats mettent l'accent sur un champ vectoriel particulier. Le WeightedRanker vous permet d'attribuer des poids plus élevés à certains champs vectoriels, ce qui les met davantage en valeur. Par exemple, dans les recherches multimodales, les descriptions textuelles d'une image peuvent être considérées comme plus importantes que les couleurs de cette image.</p></li>
<li><p><strong>RRFRanker (Reciprocal Rank Fusion Ranker)</strong>: Cette stratégie est recommandée lorsqu'il n'y a pas d'importance particulière. Le RRF peut équilibrer efficacement l'importance de chaque champ vectoriel.</p></li>
</ul>
