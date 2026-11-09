---
id: weighted-ranker.md
title: Classement pondéré
summary: >-
  Weighted Ranker combine et hiérarchise intelligemment les résultats issus de
  plusieurs chemins de recherche en attribuant à chacun d’eux des coefficients
  d’importance différents. À l’instar d’un chef expérimenté qui harmonise
  plusieurs ingrédients pour créer le plat parfait, Weighted Ranker équilibre
  les différents résultats de recherche afin de fournir les résultats combinés
  les plus pertinents. Cette approche est idéale lors de recherches portant sur
  plusieurs champs vectoriels ou modalités, lorsque certains champs doivent
  contribuer de manière plus significative que d’autres au classement final.
---
<h1 id="Weighted-Ranker" class="common-anchor-header">Classement pondéré<button data-href="#Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Le classement pondéré combine et hiérarchise intelligemment les résultats issus de plusieurs chemins de recherche en attribuant à chacun d’eux un poids d’importance différent. À l’instar d’un chef expérimenté qui équilibre plusieurs ingrédients pour créer le plat parfait, le Classement pondéré équilibre les différents résultats de recherche afin de fournir les résultats combinés les plus pertinents. Cette approche est idéale lors de recherches portant sur plusieurs champs vectoriels ou modalités, lorsque certains champs doivent contribuer de manière plus significative au classement final que d’autres.</p>
<h2 id="When-to-use-Weighted-Ranker" class="common-anchor-header">Quand utiliser le Classement pondéré<button data-href="#When-to-use-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Le Classement pondéré est spécialement conçu pour les scénarios de recherche hybrides dans lesquels vous devez combiner les résultats issus de plusieurs chemins de recherche vectoriels. Il est particulièrement efficace pour :</p>
<table>
   <tr>
     <th><p>Cas d’utilisation</p></th>
     <th><p>Exemple</p></th>
     <th><p>Pourquoi Weighted Ranker fonctionne-t-il si bien ?</p></th>
   </tr>
   <tr>
     <td><p>Recherche e-commerce</p></td>
     <td><p>Recherche de produits combinant la similarité des images et la description textuelle</p></td>
     <td><p>Permet aux détaillants de privilégier la similitude visuelle pour les articles de mode tout en mettant l’accent sur les descriptions textuelles pour les produits techniques</p></td>
   </tr>
   <tr>
     <td><p>Recherche de contenus multimédias</p></td>
     <td><p>Récupération de vidéos à l’aide à la fois de caractéristiques visuelles et de transcriptions audio</p></td>
     <td><p>Équilibre l’importance du contenu visuel par rapport aux dialogues parlés en fonction de l’intention de la requête</p></td>
   </tr>
   <tr>
     <td><p>Récupération de documents</p></td>
     <td><p>Recherche de documents d’entreprise avec plusieurs représentations pour différentes sections</p></td>
     <td><p>Accorde une plus grande importance aux représentations du titre et du résumé tout en prenant en compte celles du texte intégral</p></td>
   </tr>
</table>
<p>Si votre application de recherche hybride nécessite de combiner plusieurs chemins de recherche tout en contrôlant leur importance relative, Weighted Ranker est le choix idéal.</p>
<h2 id="Mechanism-of-Weighted-Ranker" class="common-anchor-header">Fonctionnement de Weighted Ranker<button data-href="#Mechanism-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Le déroulement principal de la stratégie WeightedRanker est le suivant :</p>
<ol>
<li><p><strong>Collecte des scores de recherche</strong>: rassembler les résultats et les scores de chaque chemin de recherche vectorielle (score_1, score_2).</p></li>
<li><p><strong>Normalisation des scores</strong>: chaque recherche peut utiliser des mesures de similarité différentes, ce qui entraîne des distributions de scores variées. Par exemple, l’utilisation du produit scalaire (IP) comme mesure de similarité peut donner des scores compris entre [−∞, +∞], tandis que l’utilisation de la distance euclidienne (L2) donne des scores compris entre [0, +∞]. Comme les plages de scores des différentes recherches varient et ne peuvent pas être directement comparées, il est nécessaire de normaliser les scores de chaque chemin de recherche. En général, on applique une fonction d’ <code translate="no">arctan</code> e pour transformer les scores en une plage comprise entre [0, 1] (score_1_normalized, score_2_normalized). Les scores proches de 1 indiquent une plus grande similarité.</p></li>
<li><p><strong>Attribution de pondérations</strong>: en fonction de l’importance attribuée aux différents champs vectoriels, des pondérations (<strong>wi</strong>) sont attribuées aux scores normalisés (score_1_normalized, score_2_normalized). Les poids de chaque chemin doivent être compris entre [0, 1]. Les scores pondérés obtenus sont score_1_weighted et score_2_weighted.</p></li>
<li><p><strong>Fusionner les scores</strong>: les scores pondérés (score_1_weighted, score_2_weighted) sont classés du plus élevé au plus faible afin de produire un ensemble final de scores (score_final).</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/weighted-ranker.png" alt="Weighted Ranker" class="doc-image" id="weighted-ranker" /> 
   <span>Classement pondéré</span>
  
 </span></p>
<h2 id="Example-of-Weighted-Ranker" class="common-anchor-header">Exemple de classement pondéré<button data-href="#Example-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Cet exemple présente une recherche hybride multimodale (topK=5) associant des images et du texte, et illustre la manière dont la stratégie WeightedRanker reclasse les résultats issus de deux recherches par réseau neuronal artificiel (ANN).</p>
<ul>
<li><p>Résultats de la recherche ANN sur les images (topK=5) :</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Score (image)</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>0,92</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>0,88</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>0,85</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>0,83</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>0,8</p></td>
</tr>
</table></p></li>
<li><p>Résultats de la recherche ANN sur les textes (topK=5) :</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Score (texte)</strong></p></th>
</tr>
<tr>
<td><p>198</p></td>
<td><p>0,91</p></td>
</tr>
<tr>
<td><p>101</p></td>
<td><p>0,87</p></td>
</tr>
<tr>
<td><p>110</p></td>
<td><p>0,85</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>0,82</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>0,78</p></td>
</tr>
</table></p></li>
<li><p>Utilisez WeightedRanker pour attribuer des pondérations aux résultats de recherche d'images et de texte. Supposons que la pondération pour la recherche d'images par réseau neuronal (ANN) soit de 0,6 et celle pour la recherche de texte de 0,4.</p>
<p><table>
<tr>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Score (image)</strong></p></th>
<th><p><strong>Score (texte)</strong></p></th>
<th><p><strong>Score pondéré</strong></p></th>
</tr>
<tr>
<td><p>101</p></td>
<td><p>0,92</p></td>
<td><p>0,87</p></td>
<td><p>0,6 × 0,92 + 0,4 × 0,87 = 0,90</p></td>
</tr>
<tr>
<td><p>203</p></td>
<td><p>0,88</p></td>
<td><p>N/A</p></td>
<td><p>0,6 × 0,88 + 0,4 × 0 = 0,528</p></td>
</tr>
<tr>
<td><p>150</p></td>
<td><p>0,85</p></td>
<td><p>N/A</p></td>
<td><p>0,6 × 0,85 + 0,4 × 0 = 0,51</p></td>
</tr>
<tr>
<td><p>198</p></td>
<td><p>0,83</p></td>
<td><p>0,91</p></td>
<td><p>0,6 × 0,83 + 0,4 × 0,91 = 0,86</p></td>
</tr>
<tr>
<td><p>175</p></td>
<td><p>0,80</p></td>
<td><p>0,82</p></td>
<td><p>0,6 × 0,80 + 0,4 × 0,82 = 0,81</p></td>
</tr>
<tr>
<td><p>110</p></td>
<td><p>Non représenté sur l'image</p></td>
<td><p>0,85</p></td>
<td><p>0,6 × 0 + 0,4 × 0,85 = 0,34</p></td>
</tr>
<tr>
<td><p>250</p></td>
<td><p>Absent de l'image</p></td>
<td><p>0,78</p></td>
<td><p>0,6 × 0 + 0,4 × 0,78 = 0,312</p></td>
</tr>
</table></p></li>
<li><p>Résultats finaux après reclassement (topK=5) :</p>
<p><table>
<tr>
<th><p><strong>Classement</strong></p></th>
<th><p><strong>ID</strong></p></th>
<th><p><strong>Score final</strong></p></th>
</tr>
<tr>
<td><p>1</p></td>
<td><p>101</p></td>
<td><p>0,90</p></td>
</tr>
<tr>
<td><p>2</p></td>
<td><p>198</p></td>
<td><p>0,86</p></td>
</tr>
<tr>
<td><p>3</p></td>
<td><p>175</p></td>
<td><p>0,81</p></td>
</tr>
<tr>
<td><p>4</p></td>
<td><p>203</p></td>
<td><p>0,528</p></td>
</tr>
<tr>
<td><p>5</p></td>
<td><p>150</p></td>
<td><p>0,51</p></td>
</tr>
</table></p></li>
</ul>
<h2 id="Usage-of-Weighted-Ranker" class="common-anchor-header">Utilisation du « Weighted Ranker »<button data-href="#Usage-of-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Lorsque vous utilisez la stratégie « WeightedRanker », vous devez saisir des valeurs de pondération. Le nombre de valeurs de pondération à saisir doit correspondre au nombre de requêtes de recherche ANN de base dans la recherche hybride. Les valeurs de pondération saisies doivent être comprises entre 0 et 1, les valeurs proches de 1 indiquant une importance plus grande.</p>
<h3 id="Create-a-Weighted-Ranker" class="common-anchor-header">Créer un « Weighted Ranker »<button data-href="#Create-a-Weighted-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Par exemple, supposons qu’il y ait deux requêtes de recherche ANN de base dans une recherche hybride : la recherche textuelle et la recherche d’images. Si la recherche textuelle est considérée comme plus importante, il convient de lui attribuer un poids plus élevé.</p>
<div class="alert note">
<p>Milvus 2.6.x et versions ultérieures vous permettent de configurer des stratégies de reclassement directement via l’API <code translate="no">Function</code>. Si vous utilisez une version antérieure (antérieure à la v2.6.0), consultez la documentation <a href="https://milvus.io/docs/v2.5.x/reranking.md#Usage-of-WeightedRanker">sur le reclassement</a> pour obtenir des instructions de configuration.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

rerank = Function(
    name=<span class="hljs-string">&quot;weight&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;weighted&quot;</span>, 
        <span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-string">&quot;norm_score&quot;</span>: <span class="hljs-literal">True</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                .name(<span class="hljs-string">&quot;weight&quot;</span>)
                .functionType(FunctionType.RERANK)
                .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>)
                .param(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>)
                .param(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
                .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;weight&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithInputFields().
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>).
    WithParam(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;weight&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">input_fields</span>(<span class="hljs-type">Vec</span>::&lt;<span class="hljs-type">String</span>&gt;::<span class="hljs-title function_ invoke__">new</span>())
    .<span class="hljs-title function_ invoke__">params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
        (<span class="hljs-string">&quot;reranker&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;weighted&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;weights&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;norm_score&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;true&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
    ]));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;weight&quot;</span>, milvus::FunctionType::RERANK);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;weighted&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;weights&quot;</span>, <span class="hljs-string">&quot;[0.1, 0.9]&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddParam</span>(<span class="hljs-string">&quot;norm_score&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> rerank = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weight&quot;</span>,
    <span class="hljs-attr">input_field_names</span>: [],
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;weighted&quot;</span>,
        <span class="hljs-attr">weights</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.9</span>],
        <span class="hljs-attr">norm_score</span>: <span class="hljs-literal">true</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;

<span class="hljs-comment">// Note: defining a weighted rerank function with FunctionSchema params</span>
<span class="hljs-comment">// (reranker/weights/norm_score) is not yet supported in milvus-sdk-csharp as of v3.0.0</span>
<span class="hljs-comment">// (FunctionSchema.Params cannot be populated externally). Use WeightedReranker instead.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
  &quot;name&quot;: &quot;weight&quot;,
  &quot;inputFieldNames&quot;: [],
  &quot;functionType&quot;: &quot;RERANK&quot;,
  &quot;params&quot;: {
    &quot;reranker&quot;: &quot;weighted&quot;,
    &quot;weights&quot;: &quot;[0.1, 0.9]&quot;,
    &quot;norm_score&quot;: &quot;true&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Obligatoire ?</p></th>
     <th><p>Description</p></th>
     <th><p>Valeur/Exemple</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Identifiant unique de cette fonction</p></td>
     <td><p><code translate="no">"weight"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Liste des champs vectoriels auxquels appliquer la fonction (doit être vide pour le classement pondéré)</p></td>
     <td><p>[]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Type de fonction à invoquer ; utilisez « <code translate="no">RERANK</code> » pour spécifier une stratégie de reclassement</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Spécifie la méthode de reclassement à utiliser.</p><p>Doit être défini sur « <code translate="no">weighted</code> » pour utiliser le classement pondéré.</p></td>
     <td><p><code translate="no">"weighted"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weights</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Tableau de poids correspondant à chaque chemin de recherche ; valeurs ∈ [0,1].</p><p>Pour plus de détails, reportez-vous à la section « <a href="/docs/fr/weighted-ranker.md#Mechanism-of-Weighted-Ranker">Mécanisme du Weighted Ranker</a> ».</p></td>
     <td><p><code translate="no">[0.1, 0.9]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.norm_score</code></p></td>
     <td><p>Non</p></td>
     <td><p>Indique s’il faut normaliser les scores bruts (à l’aide de la fonction arctan) avant la pondération.</p><p>Pour plus de détails, voir « <a href="/docs/fr/weighted-ranker.md#Mechanism-of-Weighted-Ranker">Mécanisme du classement pondéré</a> ».</p></td>
     <td><p><code translate="no">True</code></p></td>
   </tr>
</table>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Application à la recherche hybride<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Le « Weighted Ranker » est spécialement conçu pour les opérations de recherche hybride combinant plusieurs champs vectoriels. Lors d’une recherche hybride, vous devez spécifier les poids pour chaque chemin de recherche :</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, AnnSearchRequest

<span class="hljs-comment"># Connect to the Milvus server</span>
milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection setup</span>

<span class="hljs-comment"># Define text vector search request</span>
text_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;modern dining table&quot;</span>],
    anns_field=<span class="hljs-string">&quot;text_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define image vector search request</span>
image_search = AnnSearchRequest(
    data=[image_embedding],  <span class="hljs-comment"># Image embedding vector</span>
    anns_field=<span class="hljs-string">&quot;image_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply Weighted Ranker to product hybrid search</span>
<span class="hljs-comment"># Text search has 0.8 weight, image search has 0.3 weight</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=rerank,  <span class="hljs-comment"># Apply the weighted ranker</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;modern dining table&quot;</span>)))
        .limit(<span class="hljs-number">10</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(imageEmbedding)))
        .limit(<span class="hljs-number">10</span>)
        .build());

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(rerank)
                .limit(<span class="hljs-number">10</span>)
                .outputFields(Arrays.asList(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

<span class="hljs-comment">// Define two ANN sub-search requests</span>
textSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_vector&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{textEmbedding}...).WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;COSINE&quot;</span>)
imageSearch := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;image_vector&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{imageEmbedding}...).WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;IP&quot;</span>)

<span class="hljs-comment">// Apply Weighted Ranker: text search has 0.8 weight, image search has 0.3 weight</span>
rerank := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})

hybridResults, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(collectionName, <span class="hljs-number">10</span>, textSearch, imageSearch).
    WithReranker(rerank).
    WithOutputFields(<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// Define two ANN sub-search requests</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">text_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[text_embedding]))
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">image_search</span> = SubSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[image_embedding]))
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Ip)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-comment">// Apply Weighted Ranker: text search has 0.8 weight, image search has 0.3 weight</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = WeightedRerank::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">weights</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">hybrid_search</span>(
        HybridSearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">sub_requests</span>(<span class="hljs-built_in">vec!</span>[text_search, image_search])
            .<span class="hljs-title function_ invoke__">rerank</span>(rerank)
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> text_search = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
                    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;modern dining table&quot;</span>);

<span class="hljs-keyword">auto</span> image_search = milvus::<span class="hljs-built_in">SubSearchRequest</span>()
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
                    .<span class="hljs-built_in">AddFloatVector</span>(image_embedding);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">HybridSearchRequest</span>()
                    .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                    .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(text_search)))
                    .<span class="hljs-built_in">AddSubRequest</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::SubSearchRequest&gt;(std::<span class="hljs-built_in">move</span>(image_search)))
                    .<span class="hljs-built_in">WithRerank</span>(rerank)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;product_name&quot;</span>)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;price&quot;</span>)
                    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;category&quot;</span>);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">HybridSearch</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> text_search = {
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;modern dining table&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
};

<span class="hljs-keyword">const</span> image_search = {
  <span class="hljs-attr">data</span>: [image_embedding],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
};

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">data</span>: [text_search, image_search],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

<span class="hljs-comment">// Define text vector search request</span>
<span class="hljs-keyword">var</span> textSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;text_vector&quot;</span>,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;modern dining table&quot;</span> },
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-comment">// Define image vector search request</span>
<span class="hljs-keyword">var</span> imageSearch = <span class="hljs-keyword">new</span> AnnSearchReq
{
    VectorFieldName = <span class="hljs-string">&quot;image_vector&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(imageEmbedding) },  <span class="hljs-comment">// Image embedding vector</span>
    Limit = <span class="hljs-number">10</span>
};

<span class="hljs-comment">// Apply Weighted Ranker to product hybrid search</span>
<span class="hljs-comment">// Text search has 0.8 weight, image search has 0.3 weight</span>
<span class="hljs-keyword">var</span> hybridResults = <span class="hljs-keyword">await</span> client.HybridSearchAsync(<span class="hljs-keyword">new</span> HybridSearchReq
{
    CollectionName = collectionName,
    SearchRequests = <span class="hljs-keyword">new</span>[] { textSearch, imageSearch },  <span class="hljs-comment">// Multiple search requests</span>
    Reranker = rerank,  <span class="hljs-comment">// Apply the weighted ranker</span>
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters { OutputFields = { <span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;category&quot;</span> } }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;<span class="hljs-variable">${COLLECTION_NAME}</span>\&quot;,
    \&quot;search\&quot;: [
        {
            \&quot;annsField\&quot;: \&quot;text_vector\&quot;,
            \&quot;data\&quot;: [\&quot;modern dining table\&quot;],
            \&quot;params\&quot;: { \&quot;metric_type\&quot;: \&quot;COSINE\&quot; },
            \&quot;limit\&quot;: 10
        },
        {
            \&quot;annsField\&quot;: \&quot;image_vector\&quot;,
            \&quot;data\&quot;: [<span class="hljs-variable">${IMAGE_EMBEDDING}</span>],
            \&quot;params\&quot;: { \&quot;metric_type\&quot;: \&quot;IP\&quot; },
            \&quot;limit\&quot;: 10
        }
    ],
    \&quot;rerank\&quot;: <span class="hljs-variable">${rerank}</span>,
    \&quot;limit\&quot;: 10,
    \&quot;outputFields\&quot;: [\&quot;product_name\&quot;, \&quot;price\&quot;, \&quot;category\&quot;]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus d’informations sur la recherche hybride, consultez la section « <a href="/docs/fr/multi-vector-search.md">Recherche hybride multi-vecteurs</a> ».</p>
