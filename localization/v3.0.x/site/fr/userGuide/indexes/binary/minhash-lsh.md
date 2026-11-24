---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  Utilisez les index LSH MinHash pour accélérer la détection des quasi-doublons
  et la recherche de similarité de Jaccard sur de grands ensembles de données
  textuelles.
---
<h1 id="MINHASHLSH" class="common-anchor-header">MINHASH_LSH<button data-href="#MINHASHLSH" class="anchor-icon" translate="no">
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
    </button></h1><p>La déduplication et la recherche de similarité efficaces sont essentielles pour les ensembles de données d’apprentissage automatique à grande échelle, en particulier pour des tâches telles que le nettoyage des corpus d’entraînement destinés aux grands modèles linguistiques (LLM). Lorsqu’il s’agit de traiter des millions, voire des milliards de documents, la comparaison exacte traditionnelle devient trop lente et trop coûteuse.</p>
<p>L’index <strong>MINHASH_LSH</strong> de Milvus permet une déduplication approximative rapide, évolutive et précise en combinant deux techniques puissantes :</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>: génère rapidement des signatures compactes (ou « empreintes ») pour estimer la similarité des documents.</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Hachage sensible à la localité (LSH)</a>: identifie rapidement des groupes de documents similaires en fonction de leurs signatures MinHash.</p></li>
</ul>
<p>Ce guide vous présente les concepts, les prérequis, la configuration et les bonnes pratiques pour utiliser MINHASH_LSH dans Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">Similitude de Jaccard<button data-href="#Jaccard-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>La similarité de Jaccard mesure le chevauchement entre deux ensembles A et B, formellement défini comme suit :</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0962em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0502em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Sa valeur varie de 0 (ensembles totalement disjoints) à 1 (ensembles identiques).</p>
<p>Cependant, le calcul exact de la similarité de Jaccard entre toutes les paires de documents dans des ensembles de données à grande échelle est très coûteux en termes de ressources informatiques :<strong>O(n²)</strong> en temps et en mémoire lorsque <strong>n</strong> est grand. Cela rend son utilisation irréalisable pour des cas d’utilisation tels que le nettoyage de corpus d’entraînement de modèles de langage à grande échelle (LLM) ou l’analyse de documents à l’échelle du Web.</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">Signatures MinHash : approximation de la similarité de Jaccard<button data-href="#MinHash-signatures-Approximate-Jaccard-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a> est une technique probabiliste qui offre un moyen efficace d’estimer la similarité de Jaccard. Elle fonctionne en transformant chaque ensemble en un <strong>vecteur de signature</strong> compact, tout en conservant suffisamment d’informations pour estimer efficacement la similarité entre les ensembles.</p>
<p><strong>L’idée centrale</strong>:</p>
<p>plus deux ensembles sont similaires, plus il est probable que leurs signatures MinHash coïncident aux mêmes positions. Cette propriété permet à MinHash d’estimer la similarité de Jaccard entre des ensembles.</p>
<p>Cette propriété permet à MinHash <strong>d’estimer la similarité de Jaccard</strong> entre des ensembles sans avoir à comparer directement les ensembles dans leur intégralité.</p>
<p>Le processus MinHash comprend :</p>
<ol>
<li><p><strong>Le « shingling »</strong>: conversion des documents en ensembles de séquences de tokens qui se chevauchent (shingles)</p></li>
<li><p><strong>Hachage</strong>: application de plusieurs fonctions de hachage indépendantes à chaque shingle</p></li>
<li><p><strong>Sélection minimale</strong>: pour chaque fonction de hachage, enregistrer la valeur de hachage <strong>minimale</strong> parmi tous les shingles</p></li>
</ol>
<p>Vous pouvez voir l'illustration du processus complet ci-dessous :</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" /> 
   <span>Flux de travail MinHash</span>
  
 </span></p>
<div class="alert note">
<p>Le nombre de fonctions de hachage utilisées détermine la dimensionnalité de la signature MinHash. Des dimensions plus élevées offrent une meilleure précision d’approximation, au prix d’un stockage et d’un calcul accrus.</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">LSH pour MinHash<button data-href="#LSH-for-MinHash" class="anchor-icon" translate="no">
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
    </button></h3><p>Bien que les signatures MinHash réduisent considérablement le coût de calcul de la similarité exacte de Jaccard entre les documents, la comparaison exhaustive de chaque paire de vecteurs de signature reste inefficace à grande échelle.</p>
<p>Pour résoudre ce problème, on utilise <a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">le LSH</a>. Le LSH permet une recherche rapide de similarité approximative en garantissant que les éléments similaires soient, avec une forte probabilité, hachés dans le même « compartiment », ce qui évite d’avoir à comparer directement chaque paire.</p>
<p>Le processus comprend :</p>
<ol>
<li><p><strong>Segmentation de la signature :</strong></p>
<p>Une signature MinHash <em>à n dimensions</em> est divisée en <em>b</em> bandes. Chaque bande contient <em>r</em> valeurs de hachage consécutives, de sorte que la longueur totale de la signature satisfait la relation : <em>n = b × r</em>.</p>
<p>Par exemple, si vous disposez d’une signature MinHash à 128 dimensions (<em>n = 128</em>) et que vous la divisez en 32 bandes (<em>b = 32</em>), chaque bande contient alors 4 valeurs de hachage (<em>r = 4</em>).</p></li>
<li><p><strong>Hachage au niveau des bandes :</strong></p>
<p>Après segmentation, chaque bande est traitée indépendamment à l’aide d’une fonction de hachage standard afin de l’affecter à un compartiment. Si deux signatures produisent la même valeur de hachage au sein d’une bande — c’est-à-dire qu’elles se retrouvent dans le même compartiment —, elles sont considérées comme des correspondances potentielles.</p></li>
<li><p><strong>Sélection des candidates :</strong></p>
<p>Les paires qui présentent une collision dans au moins une bande sont sélectionnées comme candidates à la similarité.</p></li>
</ol>
<div class="alert note">
<p>Pourquoi cela fonctionne-t-il ?</p>
<p>Mathématiquement, si deux signatures ont une similarité de Jaccard <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span></span></span></span>,</p>
<ul>
<li><p>la probabilité qu’elles soient identiques dans une ligne (position de hachage) est <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span></span></span></span></p></li>
<li><p>La probabilité qu’elles coïncident dans toutes les <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">rr</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span></span></span></span> lignes d’une bande est <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6644em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">r</span></span></span></span></span></span></span></span></span></span></span></p></li>
<li><p>La probabilité qu’elles coïncident dans <strong>au moins une bande</strong> est <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>de 1−</mo><mo stretchy="false">(</mo><msup><mi>1−sr</mi></msup><msup><mo stretchy="false">)</mo></msup></mrow><annotation encoding="application/x-tex">b1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen"> </span></span> (<span class="katex-base"><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="katex-base"><span class="mord"><span class="mord mathnormal"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0991em;vertical-align:-0.25em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;"> </span></span></span></span></span></span></span></span></span></span></span> s <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></p></li>
</ul>
<p>Pour plus de détails, voir « <a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Hachage sensible à la localité</a> ».</p>
</div>
<p>Considérons trois documents dotés de signatures MinHash à 128 dimensions :</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" /> 
   <span>Flux de travail LSH 1</span>
  
 </span></p>
<p>Tout d’abord, le LSH divise la signature à 128 dimensions en 32 bandes de 4 valeurs consécutives chacune :</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" /> 
   <span>Flux de travail LSH 2</span>
  
 </span></p>
<p>Ensuite, chaque bande est hachée dans différents compartiments à l'aide d'une fonction de hachage. Les paires de documents partageant un même compartiment sont sélectionnées comme candidates à la similarité. Dans l'exemple ci-dessous, le document A et le document B sont sélectionnés comme candidats à la similarité, car leurs résultats de hachage coïncident dans <strong>la bande 0</strong>:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" /> 
   <span>Flux de travail LSH 3</span>
  
 </span></p>
<div class="alert note">
<p>Le nombre de bandes est contrôlé par le paramètre « <code translate="no">mh_lsh_band</code> ». Pour plus d’informations, consultez la section <a href="/docs/fr/minhash-lsh.md#Index-building-params">«Paramètres de création d’index</a>».</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures" class="common-anchor-header">MHJACCARD : comparaison des signatures MinHash<button data-href="#MHJACCARD-Comparing-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>Les signatures MinHash fournissent une approximation de la similarité de Jaccard entre des ensembles à l’aide de vecteurs binaires de longueur fixe. Cependant, comme ces signatures ne préservent pas les ensembles d’origine, les métriques standard telles que <code translate="no">JACCARD</code>, <code translate="no">L2</code> ou <code translate="no">COSINE</code> ne peuvent pas être directement appliquées pour les comparer.</p>
<p>Pour remédier à cela, Milvus introduit un type de métrique spécialisé appelé « <code translate="no">MHJACCARD</code> », conçu spécifiquement pour comparer les signatures MinHash.</p>
<p>Lors de l’utilisation de MinHash dans Milvus :</p>
<ul>
<li><p>Le champ vectoriel doit être de type <code translate="no">BINARY_VECTOR</code></p></li>
<li><p>L’ <code translate="no">index_type</code> doit être de type « <code translate="no">MINHASH_LSH</code> » (ou « <code translate="no">BIN_FLAT</code> »)</p></li>
<li><p>La métrique « <code translate="no">metric_type</code> » doit être définie sur <code translate="no">MHJACCARD</code></p></li>
</ul>
<p>L’utilisation d’autres métriques sera soit invalide, soit produira des résultats erronés.</p>
<p>Pour plus d’informations sur ce type de métrique, consultez <a href="/docs/fr/metric.md#MHJACCARD">MHJACCARD</a>.</p>
<h3 id="Deduplication-workflow" class="common-anchor-header">Workflow de déduplication<button data-href="#Deduplication-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>Le processus de déduplication optimisé par MinHash LSH permet à Milvus d’identifier et de filtrer efficacement les textes ou enregistrements structurés quasi-duplicatas avant de les insérer dans la collection.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/it9wwbcfwhft0rbwosacgltzneb.png" alt="It9wwbcfwhft0rbwosacgltzneb" class="doc-image" id="it9wwbcfwhft0rbwosacgltzneb" /> 
   <span>It9wwbcfwhft0rbwosacgltzneb</span>
  
 </span></p>
<ol>
<li><p><strong>Segmentation et prétraitement</strong>: diviser les données textuelles ou structurées entrantes (par exemple, enregistrements, champs) en segments ; normaliser le texte (mise en minuscules, suppression de la ponctuation) et supprimer les mots vides si nécessaire.</p></li>
<li><p><strong>Construction des caractéristiques</strong>: créer l'ensemble de tokens utilisé pour MinHash (par exemple, des « shingles » à partir du texte ; des tokens de champs concaténés pour les données structurées).</p></li>
<li><p><strong>Génération de signatures MinHash</strong>: calculer les signatures MinHash pour chaque segment ou enregistrement.</p></li>
<li><p><strong>Conversion en vecteur binaire</strong>: conversion de la signature en un vecteur binaire compatible avec Milvus.</p></li>
<li><p><strong>Recherche avant insertion</strong>: utiliser l’index LSH MinHash pour rechercher dans la collection cible les quasi-doublons de l’élément entrant.</p></li>
<li><p><strong>Insertion et stockage</strong>: insérer uniquement les éléments uniques dans la collection. Ceux-ci deviennent alors consultables pour de futurs contrôles de déduplication.</p></li>
</ol>
<h2 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d’utiliser l’index LSH MinHash dans Milvus, vous devez d’abord générer <strong>des signatures MinHash</strong>. Ces signatures binaires compactes fournissent une approximation de la similarité de Jaccard entre des ensembles et sont requises pour la recherche basée sur l’ <code translate="no">MHJACCARD</code> dans Milvus.</p>
<div class="alert note">
<p>Vous pouvez préparer des signatures MinHash pour l’index « <code translate="no">MINHASH_LSH</code> » de deux manières :</p>
<ul>
<li><p>Générer vous-même les signatures à l’aide d’outils externes et les insérer dans un champ BINARY_VECTOR, ou</p></li>
<li><p>Utiliser la fonction MinHash intégrée pour générer automatiquement des vecteurs binaires compatibles à partir du texte. Pour connaître le workflow de bout en bout et les options de configuration de la fonction MinHash, consultez la section <a href="/docs/fr/minhash-function.md">Fonction MinHash</a>.</p></li>
</ul>
</div>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">Choisissez une méthode pour générer des signatures MinHash<button data-href="#Choose-a-method-to-generate-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>En fonction de votre charge de travail, vous pouvez choisir :</p>
<ul>
<li><p>Utiliser la fonction <a href="https://ekzhu.github.io/datasketch/"><code translate="no">datasketch</code></a> pour plus de simplicité (recommandé pour le prototypage)</p></li>
<li><p>Utiliser des outils distribués (par exemple, Spark, Ray) pour les ensembles de données à grande échelle</p></li>
<li><p>Mettre en œuvre une logique personnalisée (NumPy, C++, etc.) si l'optimisation des performances est essentielle</p></li>
</ul>
<p>Dans ce guide, nous utilisons <code translate="no">datasketch</code> pour des raisons de simplicité et de compatibilité avec le format d’entrée de Milvus.</p>
<h3 id="Install-required-libraries" class="common-anchor-header">Installez les bibliothèques requises<button data-href="#Install-required-libraries" class="anchor-icon" translate="no">
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
    </button></h3><p>Installez les paquets nécessaires à cet exemple :</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">Générer des signatures MinHash<button data-href="#Generate-MinHash-signatures" class="anchor-icon" translate="no">
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
    </button></h3><p>Nous allons générer des signatures MinHash à 256 dimensions, chaque valeur de hachage étant représentée par un entier de 64 bits. Cela correspond au format vectoriel attendu pour <code translate="no">MINHASH_LSH</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasketch <span class="hljs-keyword">import</span> MinHash
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

MINHASH_DIM = <span class="hljs-number">256</span>
HASH_BIT_WIDTH = <span class="hljs-number">64</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_minhash_signature</span>(<span class="hljs-params">text, num_perm=MINHASH_DIM</span>) -&gt; <span class="hljs-built_in">bytes</span>:
    m = MinHash(num_perm=num_perm)
    <span class="hljs-keyword">for</span> token <span class="hljs-keyword">in</span> text.lower().split():
        m.update(token.encode(<span class="hljs-string">&quot;utf8&quot;</span>))
    <span class="hljs-keyword">return</span> m.hashvalues.astype(<span class="hljs-string">&#x27;&gt;u8&#x27;</span>).tobytes()  <span class="hljs-comment"># Returns 2048 bytes</span>
<button class="copy-code-btn"></button></code></pre>
<p>Chaque signature fait 256 × 64 bits = 2 048 octets. Cette chaîne d’octets peut être directement insérée dans un champ « <code translate="no">BINARY_VECTOR</code> ». Pour plus d’informations sur les vecteurs binaires utilisés dans Milvus, consultez la section <a href="/docs/fr/binary-vector.md">Vecteur binaire</a>.</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(Facultatif) Préparer des ensembles de tokens bruts (pour une recherche affinée)<button data-href="#Optional-Prepare-raw-token-sets-for-refined-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Par défaut, Milvus utilise uniquement les signatures MinHash et l’index LSH pour trouver des voisins approximatifs. Cette méthode est rapide, mais peut renvoyer des faux positifs ou passer à côté de correspondances proches.</p>
<p>Si vous souhaitez obtenir <strong>une similarité de Jaccard précise</strong>, Milvus prend en charge la recherche affinée qui utilise les ensembles de tokens d’origine. Pour l’activer :</p>
<ul>
<li><p>Stockez les ensembles de tokens dans un champ « <code translate="no">VARCHAR</code> » distinct</p></li>
<li><p>Définissez « <code translate="no">&quot;with_raw_data&quot;: True</code> » lors de <a href="/docs/fr/minhash-lsh.md#Build-index-parameters-and-create-collection">la configuration des paramètres d’indexation</a></p></li>
<li><p>Et activez « <code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> » lors <a href="/docs/fr/minhash-lsh.md#Perform-similarity-search">de la recherche de similarité</a></p></li>
</ul>
<p><strong>Exemple d’extraction d’ensembles de tokens</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH" class="common-anchor-header">Utilisez MinHash LSH<button data-href="#Use-MinHash-LSH" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vos vecteurs MinHash et vos ensembles de tokens d'origine sont prêts, vous pouvez les stocker, les indexer et effectuer des recherches à l'aide de Milvus avec l'<code translate="no">MINHASH_LSH</code>.</p>
<h3 id="Connect-to-your-cluster" class="common-anchor-header">Connectez-vous à votre cluster<button data-href="#Connect-to-your-cluster" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment">// Update if your URI is different</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-comment">// Update if your URI is different</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>, <span class="hljs-comment">// Update if your URI is different</span>
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">Définir le schéma de la collection<button data-href="#Define-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Définissez un schéma avec :</p>
<ul>
<li><p>La clé primaire</p></li>
<li><p>Un champ « <code translate="no">BINARY_VECTOR</code> » pour les signatures MinHash</p></li>
<li><p>Un champ d'<code translate="no">VARCHAR</code> s pour l'ensemble de jetons d'origine (si la recherche affinée est activée)</p></li>
<li><p>En option, un champ d’ <code translate="no">document</code> s pour le texte d’origine</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">false</span>);

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;doc_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
        .dataType(DataType.BinaryVector)
        .dimension(<span class="hljs-number">16384</span>) <span class="hljs-comment">// 256 hash values × 64 bits</span>
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;token_set&quot;</span>) <span class="hljs-comment">// required for refinement</span>
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;document&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> schema = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">16384</span>, <span class="hljs-comment">// 256 hash values × 64 bits</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;token_set&quot;</span>, <span class="hljs-comment">// required for refinement</span>
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;document&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

schema := entity.NewSchema().WithAutoID(<span class="hljs-literal">false</span>).WithDynamicFieldEnabled(<span class="hljs-literal">false</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;doc_id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;minhash_signature&quot;</span>).WithDataType(entity.FieldTypeBinaryVector).WithDim(<span class="hljs-number">16384</span>)). <span class="hljs-comment">// 256 hash values × 64 bits</span>
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;token_set&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>)).        <span class="hljs-comment">// required for refinement</span>
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;document&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: false,
    &quot;enableDynamicField&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;doc_id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;minhash_signature&quot;,
            &quot;dataType&quot;: &quot;BinaryVector&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: 16384
            }
        },
        {
            &quot;fieldName&quot;: &quot;token_set&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 1000
            }
        },
        {
            &quot;fieldName&quot;: &quot;document&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 1000
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">Définir les paramètres d’indexation et créer une collection<button data-href="#Build-index-parameters-and-create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Construire un index « <code translate="no">MINHASH_LSH</code> » avec le raffinement Jaccard activé :</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: HASH_BIT_WIDTH,  <span class="hljs-comment"># Must match signature bit width</span>
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">16</span>,                       <span class="hljs-comment"># Band count (128/16 = 8 hashes per band)</span>
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>                    <span class="hljs-comment"># Required for Jaccard refinement</span>
    }
)

client.create_collection(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema=schema, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;mh_element_bit_width&quot;</span>, <span class="hljs-number">64</span>); <span class="hljs-comment">// Must match signature bit width</span>
extraParams.put(<span class="hljs-string">&quot;mh_lsh_band&quot;</span>, <span class="hljs-number">16</span>);          <span class="hljs-comment">// Band count</span>
extraParams.put(<span class="hljs-string">&quot;with_raw_data&quot;</span>, <span class="hljs-literal">true</span>);      <span class="hljs-comment">// Required for Jaccard refinement</span>

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
        .indexType(IndexParam.IndexType.MINHASH_LSH)
        .metricType(IndexParam.MetricType.MHJACCARD)
        .extraParams(extraParams)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> index_params = [
    {
        <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
        <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">MINHASH_LSH</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">MHJACCARD</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">mh_element_bit_width</span>: <span class="hljs-number">64</span>, <span class="hljs-comment">// Must match signature bit width</span>
            <span class="hljs-attr">mh_lsh_band</span>: <span class="hljs-number">16</span>,          <span class="hljs-comment">// Band count</span>
            <span class="hljs-attr">with_raw_data</span>: <span class="hljs-literal">true</span>,      <span class="hljs-comment">// Required for Jaccard refinement</span>
        },
    },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    schema,
    index_params,
    <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">false</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>, <span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index.NewMinHashLSHIndex(entity.MHJACCARD, <span class="hljs-number">16</span>). <span class="hljs-comment">// mh_lsh_band: band count</span>
        WithElementBitWidth(<span class="hljs-number">64</span>).                    <span class="hljs-comment">// Must match signature bit width</span>
        WithRawData(<span class="hljs-literal">true</span>))                          <span class="hljs-comment">// Required for Jaccard refinement</span>

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema).
    WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;minhash_demo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

err = loadTask.Await(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;minhash_signature&quot;,
        &quot;metricType&quot;: &quot;MHJACCARD&quot;,
        &quot;indexType&quot;: &quot;MINHASH_LSH&quot;,
        &quot;params&quot;: {
            &quot;mh_element_bit_width&quot;: 64,
            &quot;mh_lsh_band&quot;: 16,
            &quot;with_raw_data&quot;: true
        }
    }
]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus d’informations sur les paramètres de création d’index, consultez la section <a href="/docs/fr/minhash-lsh.md#Index-building-params">Paramètres de création d’index</a>.</p>
<h3 id="Insert-data" class="common-anchor-header">Insérer des données<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour chaque document, préparez :</p>
<ul>
<li><p>Une signature binaire MinHash</p></li>
<li><p>Une chaîne de caractères représentant l’ensemble de jetons sérialisés</p></li>
<li><p>(Facultatif) le texte d'origine</p></li>
</ul>
<pre><code translate="no" class="language-python">documents = [
    <span class="hljs-string">&quot;machine learning algorithms process data automatically&quot;</span>,
    <span class="hljs-string">&quot;deep learning uses neural networks to model patterns&quot;</span>
]

insert_data = []
<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    sig = generate_minhash_signature(doc)
    token_str = extract_token_set(doc)
    insert_data.append({
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;minhash_signature&quot;</span>: sig,
        <span class="hljs-string">&quot;token_set&quot;</span>: token_str,
        <span class="hljs-string">&quot;document&quot;</span>: doc
    })

client.insert(<span class="hljs-string">&quot;minhash_demo&quot;</span>, insert_data)
client.flush(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">Effectuer une recherche par similarité<button data-href="#Perform-similarity-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus prend en charge deux modes de recherche de similarité utilisant MinHash LSH :</p>
<ul>
<li><p><strong>Recherche approximative</strong> — utilise uniquement les signatures MinHash et LSH pour obtenir des résultats rapides mais probabilistes.</p></li>
<li><p><strong>Recherche affinée</strong> — recalcule la similarité de Jaccard à l’aide des ensembles de tokens d’origine pour une précision améliorée.</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 Préparer la requête</h4><p>Pour effectuer une recherche par similarité, générez une signature MinHash pour le document de requête. Cette signature doit correspondre à la même dimension et au même format d'encodage que ceux utilisés lors de l'insertion des données.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 Recherche approximative (LSH uniquement)</h4><p>Cette méthode est rapide et évolutive, mais peut passer à côté de correspondances proches ou inclure des faux positifs :</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params={</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>, </span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {}</span>
<span class="highlighted-comment-line">}</span>

approx_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(approx_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BinaryVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="highlighted-comment-line">Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>);</span>

<span class="hljs-comment">// querySig holds the query signature as a byte[]</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">approxResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(querySig)))
        .annsField(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
<span class="highlighted-wrapper-line">        .searchParams(searchParams)</span>
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

List&lt;SearchResp.SearchResult&gt; hits = approxResults.getSearchResults().get(<span class="hljs-number">0</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; hits.size(); i++) {
    <span class="hljs-type">float</span> <span class="hljs-variable">sim</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span> - hits.get(i).getScore();
    System.out.printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s%n&quot;</span>, i + <span class="hljs-number">1</span>, sim, hits.get(i).getEntity().get(<span class="hljs-string">&quot;document&quot;</span>));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ConsistencyLevelEnum</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// querySig holds the query signature as an array of byte values (0-255)</span>
<span class="hljs-keyword">const</span> approxResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-attr">data</span>: querySig,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">params</span>: {},</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-title class_">ConsistencyLevelEnum</span>.<span class="hljs-property">Strong</span>,
});

approxResults.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> sim = <span class="hljs-number">1</span> - hit.<span class="hljs-property">score</span>;
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">${sim.toFixed(<span class="hljs-number">3</span>)}</span> | <span class="hljs-subst">${hit.<span class="hljs-variable language_">document</span>}</span>`</span>);
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// querySig holds the query signature as a []byte</span>
approxResults, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.BinaryVector(querySig)},
).WithANNSField(<span class="hljs-string">&quot;minhash_signature&quot;</span>).
<span class="highlighted-wrapper-line">    WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>).</span>
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; approxResults[<span class="hljs-number">0</span>].ResultCount; i++ {
    document, _ := approxResults[<span class="hljs-number">0</span>].GetColumn(<span class="hljs-string">&quot;document&quot;</span>).GetAsString(i)
    fmt.Printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s\n&quot;</span>, i+<span class="hljs-number">1</span>, <span class="hljs-number">1</span>-approxResults[<span class="hljs-number">0</span>].Scores[i], document)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
    &quot;metric_type&quot;: &quot;MHJACCARD&quot;,
    &quot;params&quot;: {}
}&#x27;</span>

<span class="hljs-comment"># querySig holds the query signature as a base64-encoded string</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;data\&quot;: [\&quot;<span class="hljs-variable">$querySig</span>\&quot;],
    \&quot;annsField\&quot;: \&quot;minhash_signature\&quot;,
    \&quot;searchParams\&quot;: <span class="hljs-variable">$searchParams</span>,
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;doc_id\&quot;, \&quot;document\&quot;],
    \&quot;consistencyLevel\&quot;: \&quot;Strong\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 Recherche affinée (recommandée pour la précision) :</h4><p>Elle permet une comparaison de Jaccard précise à l’aide des ensembles de tokens d’origine stockés dans Milvus. Elle est légèrement plus lente, mais recommandée pour les tâches où la qualité est primordiale :</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">5</span>                    <span class="hljs-comment"># Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

refined_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(refined_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BinaryVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="highlighted-comment-line">Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>);</span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>, <span class="hljs-literal">true</span>); <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">searchParams.put(<span class="hljs-string">&quot;refine_k&quot;</span>, <span class="hljs-number">5</span>);                  <span class="hljs-comment">// Refine top 5 candidates</span></span>

<span class="hljs-comment">// querySig holds the query signature as a byte[]</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">refinedResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(querySig)))
        .annsField(<span class="hljs-string">&quot;minhash_signature&quot;</span>)
<span class="highlighted-wrapper-line">        .searchParams(searchParams)</span>
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

List&lt;SearchResp.SearchResult&gt; hits = refinedResults.getSearchResults().get(<span class="hljs-number">0</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; hits.size(); i++) {
    <span class="hljs-type">float</span> <span class="hljs-variable">sim</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span> - hits.get(i).getScore();
    System.out.printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s%n&quot;</span>, i + <span class="hljs-number">1</span>, sim, hits.get(i).getEntity().get(<span class="hljs-string">&quot;document&quot;</span>));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ConsistencyLevelEnum</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// querySig holds the query signature as an array of byte values (0-255)</span>
<span class="hljs-keyword">const</span> refinedResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-attr">data</span>: querySig,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">params</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">mh_search_with_jaccard</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-attr">refine_k</span>: <span class="hljs-number">5</span>,                  <span class="hljs-comment">// Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    },</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-title class_">ConsistencyLevelEnum</span>.<span class="hljs-property">Strong</span>,
});

refinedResults.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> sim = <span class="hljs-number">1</span> - hit.<span class="hljs-property">score</span>;
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">${sim.toFixed(<span class="hljs-number">3</span>)}</span> | <span class="hljs-subst">${hit.<span class="hljs-variable language_">document</span>}</span>`</span>);
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

<span class="highlighted-comment-line">annParam := index.NewMinHashLSHAnnParam().</span>
<span class="highlighted-comment-line">    WithSearchWithJACCARD(<span class="hljs-literal">true</span>). <span class="hljs-comment">// Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">    WithRefineK(<span class="hljs-number">5</span>)               <span class="hljs-comment">// Refine top 5 candidates</span></span>

<span class="hljs-comment">// querySig holds the query signature as a []byte</span>
refinedResults, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;minhash_demo&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.BinaryVector(querySig)},
).WithANNSField(<span class="hljs-string">&quot;minhash_signature&quot;</span>).
<span class="highlighted-comment-line">    WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MHJACCARD&quot;</span>).</span>
<span class="highlighted-comment-line">    WithAnnParam(annParam).</span>
    WithOutputFields(<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; refinedResults[<span class="hljs-number">0</span>].ResultCount; i++ {
    document, _ := refinedResults[<span class="hljs-number">0</span>].GetColumn(<span class="hljs-string">&quot;document&quot;</span>).GetAsString(i)
    fmt.Printf(<span class="hljs-string">&quot;%d. Similarity: %.3f | %s\n&quot;</span>, i+<span class="hljs-number">1</span>, <span class="hljs-number">1</span>-refinedResults[<span class="hljs-number">0</span>].Scores[i], document)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
    &quot;metric_type&quot;: &quot;MHJACCARD&quot;,
    &quot;params&quot;: {
        &quot;mh_search_with_jaccard&quot;: true,
        &quot;refine_k&quot;: 5
    }
}&#x27;</span>

<span class="hljs-comment"># querySig holds the query signature as a base64-encoded string</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;minhash_demo\&quot;,
    \&quot;data\&quot;: [\&quot;<span class="hljs-variable">$querySig</span>\&quot;],
    \&quot;annsField\&quot;: \&quot;minhash_signature\&quot;,
    \&quot;searchParams\&quot;: <span class="hljs-variable">$searchParams</span>,
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;doc_id\&quot;, \&quot;document\&quot;],
    \&quot;consistencyLevel\&quot;: \&quot;Strong\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">Paramètres d'indexation<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette section présente une vue d’ensemble des paramètres utilisés pour créer un index et effectuer des recherches sur celui-ci.</p>
<h3 id="Index-building-params" class="common-anchor-header">Paramètres de création d'index<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">params</code> lors de <a href="/docs/fr/minhash-lsh.md#Build-index-parameters-and-create-collection">la création d’un index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Recommandation de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>Largeur en bits de chaque valeur de hachage dans la signature MinHash. Doit être divisible par 8.</p></td>
     <td><p>8, 16, 32, 64</p></td>
     <td><p>Utilisez <code translate="no">32</code> pour un équilibre entre performances et précision. Utilisez <code translate="no">64</code> pour une précision supérieure avec des ensembles de données plus volumineux. Utilisez <code translate="no">16</code> pour économiser de la mémoire avec une perte de précision acceptable.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>Nombre de bandes dans lesquelles diviser la signature MinHash pour LSH. Permet de contrôler le compromis entre rappel et performance.</p></td>
     <td><p>[1, <em>longueur_de_signature</em>]</p></td>
     <td><p>Pour les signatures à 128 dimensions : commencez par 32 bandes (4 valeurs par bande). Augmentez ce nombre à 64 pour un rappel plus élevé, ou réduisez-le à 16 pour de meilleures performances. La longueur de la signature doit être divisée de manière égale.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>Indique s’il faut stocker les codes de hachage LSH en mémoire anonyme (<code translate="no">true</code>) ou utiliser le mappage mémoire (<code translate="no">false</code>).</p></td>
     <td><p>true, false</p></td>
     <td><p>Utilisez <code translate="no">false</code> pour les grands ensembles de données (&gt; 1 million d’ensembles) afin de réduire l’utilisation de la mémoire. Utilisez <code translate="no">true</code> pour les ensembles de données plus petits nécessitant une vitesse de recherche maximale.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Indique s’il faut stocker les signatures MinHash d’origine aux côtés des codes LSH à des fins d’affinement.</p></td>
     <td><p>true, false</p></td>
     <td><p>Utilisez <code translate="no">true</code> lorsqu’une haute précision est requise et que le coût de stockage est acceptable. Utilisez <code translate="no">false</code> pour minimiser la surcharge de stockage au prix d’une légère réduction de la précision.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>Probabilité de faux positifs pour le filtre de Bloom utilisé dans l’optimisation des compartiments LSH.</p></td>
     <td><p>[0,001 ; 0,1]</p></td>
     <td><p>Utilisez <code translate="no">0.01</code> pour un équilibre entre utilisation de la mémoire et précision. Les valeurs plus faibles (<code translate="no">0.001</code>) réduisent les faux positifs mais augmentent la consommation de mémoire. Les valeurs plus élevées (<code translate="no">0.05</code>) économisent de la mémoire mais peuvent réduire la précision.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Paramètres de recherche spécifiques à l’index<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">search_params.params</code> lors <a href="/docs/fr/minhash-lsh.md#Perform-similarity-search">d’une recherche sur l’index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>Indique s'il faut effectuer un calcul exact de la similarité de Jaccard sur les résultats candidats pour l'affinement.</p></td>
     <td><p>true, false</p></td>
     <td><p>Utilisez <code translate="no">true</code> pour les applications nécessitant une grande précision (par exemple, la déduplication). Utilisez <code translate="no">false</code> pour une recherche approximative plus rapide lorsqu'une légère perte de précision est acceptable.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Nombre de résultats candidats à récupérer avant l'affinage par Jaccard. Ne s'applique que lorsque <code translate="no">mh_search_with_jaccard</code> est défini sur <code translate="no">true</code>.</p></td>
     <td><p>[<em>top_k</em>, <em>top_k &amp;ast; 10</em>]</p></td>
     <td><p>Définissez cette valeur entre 2 et 5 fois la valeur souhaitée <em>pour top_k</em> afin d’obtenir un bon équilibre entre rappel et performance. Des valeurs plus élevées améliorent le rappel mais augmentent le coût de calcul.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>Indique s’il faut activer l’optimisation par lots pour plusieurs requêtes simultanées.</p></td>
     <td><p>true, false</p></td>
     <td><p>Utilisez <code translate="no">true</code> lors de recherches avec plusieurs requêtes simultanées pour un meilleur débit. Utilisez <code translate="no">false</code> pour les scénarios à requête unique afin de réduire la surcharge mémoire.</p></td>
   </tr>
</table>
