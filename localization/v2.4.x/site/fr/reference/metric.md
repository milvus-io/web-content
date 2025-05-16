---
id: metric.md
summary: >-
  Milvus prend en charge un grand nombre de mesures de similarité, notamment la
  distance euclidienne, le produit intérieur, Jaccard, etc.
title: Métriques de similarité
---
<h1 id="Similarity-Metrics" class="common-anchor-header">Métriques de similarité<button data-href="#Similarity-Metrics" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans Milvus, les métriques de similarité sont utilisées pour mesurer les similitudes entre les vecteurs. Le choix d'une bonne métrique de distance permet d'améliorer considérablement les performances de classification et de regroupement.</p>
<p>Le tableau suivant montre comment ces métriques de similarité largement utilisées s'adaptent à diverses formes de données d'entrée et aux index Milvus. Actuellement, Milvus prend en charge différents types de données, y compris les incorporations à virgule flottante (souvent connues sous le nom de vecteurs à virgule flottante ou de vecteurs denses), les incorporations binaires (également connues sous le nom de vecteurs binaires) et les incorporations éparses (également connues sous le nom de vecteurs épars).</p>
<div class="filter">
 <a href="#floating">Encastrements à virgule flottante</a> <a href="#binary">Encastrements binaires</a> <a href="#sparse">Encastrements épars</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Types de métriques</th>
    <th class="tg-0pky">Types d'indices</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Distance euclidienne (L2)</li><li>Produit intérieur (IP)</li><li>Similitude cosinus (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>FLAT</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Types de métriques</th>
    <th class="tg-0pky">Types d'indices</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Jaccard</li><li>Hamming</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Types de métriques</th>
    <th class="tg-0pky">Types d'index</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>INDEX_INVERTI_SPARSE</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Euclidean-distance-L2" class="common-anchor-header">Distance euclidienne (L2)</h3><p>La distance euclidienne mesure essentiellement la longueur d'un segment reliant deux points.</p>
<p>La formule de la distance euclidienne est la suivante :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/euclidean_metric.png" alt="euclidean" class="doc-image" id="euclidean" />
   </span> <span class="img-wrapper"> <span>euclidienne</span> </span></p>
<p>où <strong>a</strong> = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>) et <strong>b</strong> = (<sub>b0</sub>, <sub>b0</sub>,..., <sub>bn-1</sub>) sont deux points dans un espace euclidien à n dimensions.</p>
<p>Il s'agit de la mesure de distance la plus couramment utilisée et elle est très utile lorsque les données sont continues.</p>
<div class="alert note">
Milvus calcule uniquement la valeur avant d'appliquer la racine carrée lorsque la distance euclidienne est choisie comme mesure de distance.</div>
<h3 id="Inner-product-IP" class="common-anchor-header">Produit intérieur (PI)</h3><p>La distance IP entre deux intégrations vectorielles est définie comme suit :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IP_formula.png" alt="ip" class="doc-image" id="ip" />
   </span> <span class="img-wrapper"> <span>IP</span> </span></p>
<p>Le produit intérieur est plus utile si vous devez comparer des données non normalisées ou si vous vous intéressez à la magnitude et à l'angle.</p>
<div class="alert note">
<p>Si vous appliquez la distance IP à des intégrations normalisées, le résultat sera équivalent au calcul de la similarité cosinus entre les intégrations.</p>
</div>
<p>Supposons que X' soit normalisé à partir de l'intégration X :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalize_formula.png" alt="normalize" class="doc-image" id="normalize" />
   </span> <span class="img-wrapper"> <span>normaliser</span> </span></p>
<p>La corrélation entre les deux embeddings est la suivante :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalization_formula.png" alt="normalization" class="doc-image" id="normalization" />
   </span> <span class="img-wrapper"> <span>normalisation</span> </span></p>
<h3 id="Cosine-Similarity" class="common-anchor-header">Similitude en cosinus</h3><p>La similarité en cosinus utilise le cosinus de l'angle entre deux ensembles de vecteurs pour mesurer leur degré de similarité. Vous pouvez considérer les deux ensembles de vecteurs comme deux segments de ligne qui partent de la même origine ([0,0,...]) mais qui pointent dans des directions différentes.</p>
<p>Pour calculer la similitude en cosinus entre deux ensembles de vecteurs <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> et <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong>, utilisez la formule suivante :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cosine_similarity.png" alt="cosine_similarity" class="doc-image" id="cosine_similarity" />
   </span> <span class="img-wrapper"> <span>cosinus_similarité</span> </span></p>
<p>La similarité en cosinus est toujours comprise dans l'intervalle <strong>[-1, 1]</strong>. Par exemple, deux vecteurs proportionnels ont un cosinus de <strong>1</strong>, deux vecteurs orthogonaux ont un cosinus de <strong>0</strong> et deux vecteurs opposés ont un cosinus de <strong>-1</strong>. Plus le cosinus est grand, plus l'angle entre deux vecteurs est petit, ce qui indique que ces deux vecteurs sont plus semblables l'un à l'autre.</p>
<p>En soustrayant leur cosinus de 1, on obtient la distance en cosinus entre deux vecteurs.</p>
<h3 id="Jaccard-distance" class="common-anchor-header">Distance de Jaccard</h3><p>Le coefficient de similarité de Jaccard mesure la similarité entre deux ensembles d'échantillons et est défini comme la cardinalité de l'intersection des ensembles définis divisée par la cardinalité de leur union. Il ne peut être appliqué qu'à des ensembles d'échantillons finis.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_coeff.png" alt="Jaccard similarity coefficient" class="doc-image" id="jaccard-similarity-coefficient" />
   </span> <span class="img-wrapper"> <span>Coefficient de similarité de Jaccard</span> </span></p>
<p>La distance de Jaccard mesure la dissimilarité entre des ensembles de données et est obtenue en soustrayant le coefficient de similitude de Jaccard de 1. Pour les variables binaires, la distance de Jaccard est équivalente au coefficient de Tanimoto.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_dist.png" alt="Jaccard distance" class="doc-image" id="jaccard-distance" />
   </span> <span class="img-wrapper"> <span>Distance de Jaccard</span> </span></p>
<h3 id="Hamming-distance" class="common-anchor-header">Distance de Hamming</h3><p>La distance de Hamming mesure les chaînes de données binaires. La distance entre deux chaînes de même longueur est le nombre de positions de bits auxquelles les bits sont différents.</p>
<p>Par exemple, supposons qu'il y ait deux chaînes, 1101 1001 et 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Comme ces chaînes contiennent deux 1, la distance de Hamming, d (11011001, 10011101) = 2.</p>
<h3 id="Structural-Similarity" class="common-anchor-header">Similitude structurelle</h3><p>Lorsqu'une structure chimique fait partie d'une structure chimique plus importante, la première est appelée sous-structure et la seconde superstructure. Par exemple, l'éthanol est une sous-structure de l'acide acétique et l'acide acétique est une superstructure de l'éthanol.</p>
<p>La similarité structurelle est utilisée pour déterminer si deux formules chimiques sont similaires en ce sens que l'une est la superstructure ou la sous-structure de l'autre.</p>
<p>Pour déterminer si A est une superstructure de B, utilisez la formule suivante :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>superstructure</span> </span></p>
<p>Où :</p>
<ul>
<li>A est la représentation binaire d'une formule chimique à retrouver</li>
<li>B est la représentation binaire d'une formule chimique dans la base de données.</li>
</ul>
<p>Si le résultat est <code translate="no">0</code>, <strong>A</strong> n'est pas une superstructure de <strong>B</strong>. Dans le cas contraire, le résultat est inversé.</p>
<p>Pour déterminer si A est une sous-structure de B, utilisez la formule suivante :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>sous-structure</span> </span></p>
<p>Où : A est la représentation binaire d'une sous-structure de B :</p>
<ul>
<li>A est la représentation binaire d'une formule chimique à retrouver</li>
<li>B est la représentation binaire d'une formule chimique dans la base de données.</li>
</ul>
<p>Si le résultat est <code translate="no">0</code>, <strong>A</strong> n'est pas une sous-structure de <strong>B</strong>. Dans le cas contraire, le résultat est inversé.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">Pourquoi le premier résultat d'une recherche vectorielle n'est-il pas le vecteur de recherche lui-même, si le type de métrique est le produit intérieur ?</font></summary>Cela se produit si vous n'avez pas normalisé les vecteurs lorsque vous utilisez le produit intérieur comme métrique de distance.</details>
<details>
<summary><font color="#4fc4f9">Qu'est-ce que la normalisation ? Pourquoi la normalisation est-elle nécessaire ?</font></summary></p>
<p>La normalisation est le processus qui consiste à convertir un encastrement (vecteur) de manière à ce que sa norme soit égale à 1. Si vous utilisez le produit intérieur pour calculer les similitudes des embeddings, vous devez normaliser vos embeddings. Après normalisation, le produit intérieur est égal à la similarité cosinusoïdale.</p>
<p>
Voir <a href="https://en.wikipedia.org/wiki/Unit_vector">Wikipedia</a> pour plus d'informations.</p>
</details>
<details>
<summary><font color="#4fc4f9">Pourquoi est-ce que j'obtiens des résultats différents en utilisant la distance euclidienne (L2) et le produit intérieur (PI) comme métrique de distance ?</font></summary>Vérifiez si les vecteurs sont normalisés. Si ce n'est pas le cas, vous devez d'abord normaliser les vecteurs. En théorie, les similitudes calculées par L2 sont différentes des similitudes calculées par IP si les vecteurs ne sont pas normalisés.</details>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>En savoir plus sur les <a href="/docs/fr/v2.4.x/index.md">types d'index</a> pris en charge dans Milvus.</li>
</ul>
