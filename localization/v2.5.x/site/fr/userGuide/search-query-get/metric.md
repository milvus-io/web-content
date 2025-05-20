---
id: metric.md
title: Types de métriques
summary: >-
  Les métriques de similarité sont utilisées pour mesurer les similitudes entre
  les vecteurs. Le choix d'une métrique de distance appropriée permet
  d'améliorer considérablement les performances de classification et de
  regroupement.
---
<h1 id="Metric-Types" class="common-anchor-header">Types de métriques<button data-href="#Metric-Types" class="anchor-icon" translate="no">
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
    </button></h1><p>Les métriques de similarité sont utilisées pour mesurer les similitudes entre les vecteurs. Le choix d'une métrique de distance appropriée permet d'améliorer considérablement les performances de classification et de regroupement.</p>
<p>Actuellement, Milvus prend en charge les types de métriques de similarité suivants : Distance euclidienne (<code translate="no">L2</code>), Produit intérieur (<code translate="no">IP</code>), Similitude cosinus (<code translate="no">COSINE</code>), <code translate="no">JACCARD</code>, <code translate="no">HAMMING</code>, et <code translate="no">BM25</code> (spécialement conçu pour la recherche de texte intégral sur des vecteurs épars).</p>
<p>Le tableau ci-dessous résume la correspondance entre les différents types de champs et les types de métriques correspondants.</p>
<table>
   <tr>
     <th><p>Type de champ</p></th>
     <th><p>Plage de dimensions</p></th>
     <th><p>Types de métriques pris en charge</p></th>
     <th><p>Type métrique par défaut</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BFLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">SPARSE\_FLOAT\_VECTOR</code></p></td>
     <td><p>Il n'est pas nécessaire de préciser la dimension.</p></td>
     <td><p><code translate="no">IP</code> <code translate="no">BM25</code> (utilisé uniquement pour la recherche en texte intégral)</p></td>
     <td><p><code translate="no">IP</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BINARY_VECTOR</code></p></td>
     <td><p>8-32,768*8</p></td>
     <td><p><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></p></td>
     <td><p><code translate="no">HAMMING</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>Pour les champs de vecteurs de type <code translate="no">SPARSE\_FLOAT\_VECTOR</code>, n'utilisez le type métrique <code translate="no">BM25</code> que pour la recherche en texte intégral. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a>.</p></li>
<li><p>Pour les champs vectoriels de type <code translate="no">BINARY_VECTOR</code>, la valeur de la dimension (<code translate="no">dim</code>) doit être un multiple de 8.</p></li>
</ul>
</div>
<p>Le tableau ci-dessous résume les caractéristiques des valeurs de distance de similarité de tous les types de métriques pris en charge et leur plage de valeurs.</p>
<table>
   <tr>
     <th><p>Type de métrique</p></th>
     <th><p>Caractéristiques des valeurs de distance de similarité</p></th>
     <th><p>Plage de valeurs de la distance de similarité</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>Une valeur plus petite indique une plus grande similarité.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>Une valeur plus élevée indique une plus grande similarité.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>Une valeur plus élevée indique une plus grande similitude.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>Une valeur plus petite indique une plus grande similarité.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>Une valeur plus petite indique une plus grande similarité.</p></td>
     <td><p>[0, dim(vector)]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BM25</code></p></td>
     <td><p>Score de pertinence basé sur la fréquence des termes, la fréquence inversée des documents et la normalisation des documents.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
</table>
<h2 id="Euclidean-distance-L2" class="common-anchor-header">Distance euclidienne (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h2><p>La distance euclidienne mesure essentiellement la longueur d'un segment reliant deux points.</p>
<p>La formule de la distance euclidienne est la suivante :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/euclidean-metric.png" alt="Euclidean Metric" class="doc-image" id="euclidean-metric" />
   </span> <span class="img-wrapper"> <span>Métrique d'Euclide</span> </span></p>
<p>où <strong>a = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> et <strong>b = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong> sont deux points dans un espace euclidien à n dimensions.</p>
<p>Il s'agit de la mesure de distance la plus couramment utilisée et elle est très utile lorsque les données sont continues.</p>
<div class="alert note">
<p>Milvus calcule uniquement la valeur avant d'appliquer la racine carrée lorsque la distance euclidienne est choisie comme mesure de distance.</p>
</div>
<h2 id="Inner-product-IP" class="common-anchor-header">Produit intérieur (PI)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h2><p>La distance IP entre deux embeddings est définie comme suit :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IP-formula.png" alt="IP Formula" class="doc-image" id="ip-formula" />
   </span> <span class="img-wrapper"> <span>Formule IP</span> </span></p>
<p>Le produit intérieur est plus utile si vous devez comparer des données non normalisées ou si vous vous intéressez à la magnitude et à l'angle.</p>
<div class="alert note">
<p>Si vous utilisez le produit intérieur pour calculer les similarités entre les embeddings, vous devez normaliser vos embeddings. Après la normalisation, le produit intérieur est égal à la similarité cosinusoïdale.</p>
</div>
<p>Supposons que X' soit normalisé à partir de l'intégration X :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalize-formula.png" alt="Normalize Formula" class="doc-image" id="normalize-formula" />
   </span> <span class="img-wrapper"> <span>Formule de normalisation</span> </span></p>
<p>La corrélation entre les deux embeddings est la suivante :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/correlation-between-embeddings.png" alt="Correlation Between Embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>Corrélation entre les embeddings</span> </span></p>
<h2 id="Cosine-similarity" class="common-anchor-header">Similitude en cosinus<button data-href="#Cosine-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>La similarité en cosinus utilise le cosinus de l'angle entre deux ensembles de vecteurs pour mesurer leur degré de similarité. Vous pouvez considérer les deux ensembles de vecteurs comme des segments de ligne partant du même point, tel que [0,0,...], mais pointant dans des directions différentes.</p>
<p>Pour calculer la similitude en cosinus entre deux ensembles de vecteurs <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> et <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong>, utilisez la formule suivante :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cosine-similarity.png" alt="Cosine Similarity" class="doc-image" id="cosine-similarity" />
   </span> <span class="img-wrapper"> <span>Similitude en cosinus</span> </span></p>
<p>La similitude en cosinus est toujours comprise dans l'intervalle <strong>[-1, 1]</strong>. Par exemple, deux vecteurs proportionnels ont un cosinus de <strong>1</strong>, deux vecteurs orthogonaux ont un cosinus de <strong>0</strong> et deux vecteurs opposés ont un cosinus de <strong>-1</strong>. Plus le cosinus est grand, plus l'angle entre les deux vecteurs est petit, ce qui indique que ces deux vecteurs sont plus semblables l'un à l'autre.</p>
<p>En soustrayant leur cosinus de 1, on obtient la distance en cosinus entre deux vecteurs.</p>
<h2 id="JACCARD-distance" class="common-anchor-header">Distance JACCARD<button data-href="#JACCARD-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>Le coefficient de similarité JACCARD mesure la similarité entre deux ensembles d'échantillons et est défini comme la cardinalité de l'intersection des ensembles définis divisée par la cardinalité de leur union. Il ne peut être appliqué qu'à des ensembles d'échantillons finis.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-similarity-coefficient-formula.png" alt="JACCARD Similarity Coefficient Formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>Formule du coefficient de similarité JACCARD</span> </span></p>
<p>La distance de JACCARD mesure la dissimilarité entre les ensembles de données et est obtenue en soustrayant le coefficient de similarité de JACCARD de 1. Pour les variables binaires, la distance de JACCARD est équivalente au coefficient de Tanimoto.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-distance-formula.png" alt="JACCARD Distance Formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>Formule de la distance de JACCARD</span> </span></p>
<h2 id="HAMMING-distance" class="common-anchor-header">Distance de HAMMING<button data-href="#HAMMING-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>La distance de HAMMING mesure les chaînes de données binaires. La distance entre deux chaînes de même longueur est le nombre de positions de bits où les bits sont différents.</p>
<p>Par exemple, supposons qu'il y ait deux chaînes, 1101 1001 et 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Comme ces chaînes contiennent deux 1, la distance de HAMMING, d (11011001, 10011101) = 2.</p>
<h2 id="BM25-similarity" class="common-anchor-header">Similitude BM25<button data-href="#BM25-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 est une méthode de mesure de la pertinence des textes largement utilisée, spécialement conçue pour la <a href="/docs/fr/full-text-search.md">recherche de textes intégraux</a>. Elle combine les trois facteurs clés suivants</p>
<ul>
<li><p><strong>La fréquence des termes (TF) :</strong> Mesure la fréquence d'apparition d'un terme dans un document. Bien que des fréquences plus élevées indiquent souvent une plus grande importance, le BM25 utilise le paramètre de saturation <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">k1k_1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span></span></span></span> k <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0315em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">1</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> pour éviter que des termes trop fréquents ne dominent le score de pertinence.</p></li>
<li><p><strong>Fréquence inverse des documents (IDF) :</strong> Reflète l'importance d'un terme dans l'ensemble du corpus. Les termes apparaissant dans moins de documents reçoivent une valeur IDF plus élevée, ce qui indique une plus grande contribution à la pertinence.</p></li>
<li><p><strong>Normalisation de la longueur des documents :</strong> Les documents plus longs ont tendance à obtenir un score plus élevé parce qu'ils contiennent plus de termes. BM25 atténue ce biais en normalisant la longueur des documents, le paramètre <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">bb</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> b contrôlant l'intensité de cette normalisation.</p></li>
</ul>
<p>La notation du BM25 est calculée comme suit :</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>s</mi><mi>c</mi><mi>o</mi><mi>r</mi><mi>e</mi><mo stretchy="false">(</mo><mi>D</mi><mo separator="true">,</mo><mi>Q</mi><mo stretchy="false">)</mo><mo>=</mo><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><mi>I</mi><mi>D</mi><mi>F</mi><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo stretchy="false">)</mo><mo>⋅</mo><mfrac><mrow><mi>T</mi><mi>F</mi><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo separator="true">,</mo><mi>D</mi><mo stretchy="false">)</mo><mo>⋅</mo><mo stretchy="false">(</mo><msub><mi>k</mi><mn>1</mn></msub><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><mrow><mi>T</mi><mi>F</mi><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo separator="true">,</mo><mi>D</mi><mo stretchy="false">)</mo><mo>+</mo><msub><mi>k</mi><mn>1</mn></msub><mo>⋅</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mi>b</mi><mo>+</mo><mi>b</mi><mo>⋅</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>D</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi>a</mi><mi>v</mi><mi>g</mi><mi>d</mi><mi>l</mi></mrow></mfrac><mo stretchy="false">)</mo></mrow></mfrac></mrow><annotation encoding="application/x-tex">score(D, Q)=\sum_{i=1}^{n}IDF(q_i)\cdot {{TF(q_i,D)\cdot(k_1+1)}\over{TF(q_i, D)+k_1\cdot(1-b+b\cdot {{|D|}\over{avgdl}})}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">score</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">Q</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.9291em;vertical-align:-1.2777em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:2.8081em;vertical-align:-1.3811em;"></span><span class="mord"><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.11em;"><span class="pstrut" style="height:3.01em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">TF</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03148em;">k</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0315em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">b</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">b</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.01em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">a</span><span class="mord mathnormal mtight" style="margin-right:0.03588em;">vg</span><span class="mord mathnormal mtight">d</span><span class="mord mathnormal mtight" style="margin-right:0.01968em;">l</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.485em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">∣</span><span class="mord mathnormal mtight" style="margin-right:0.02778em;">D</span><span class="mord mtight">∣</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.4811em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span><span class="mclose">)</span></span></span><span style="top:-3.24em;"><span class="pstrut" style="height:3.01em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.687em;"><span class="pstrut" style="height:3.01em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">TF</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03148em;">k</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0315em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.3811em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></span></p>
<p>Description des paramètres :</p>
<ul>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">QQ</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8778em;vertical-align:-0.1944em;"></span></span></span></span> Q : Le texte de la requête fourni par l'utilisateur.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">DD</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span></span></span></span> D : le document évalué.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>TF</mi><mo stretchy="false">(</mo><msub><mi>qi</mi></msub><mo separator="true">,</mo><mi>D</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">TF(q_i, D)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">TF</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">i</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>,<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span> D</span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">)</span></span></span></span>: Fréquence des termes, représentant la fréquence à laquelle le terme <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">qiq_i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span></span></span></span>q <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">i</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>apparaît dans le document <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">DD</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span></span></span></span> D.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>IDF</mi><mo stretchy="false">(</mo><msub><mi>qi</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">IDF(q_i)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">IDF</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">i</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>) : Fréquence inverse du document, calculée comme suit</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>I</mi><mi>D</mi><mi>F</mi><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo stretchy="false">)</mo><mo>=</mo><mi>log</mi><mo>⁡</mo><mo stretchy="false">(</mo><mfrac><mrow><mi>N</mi><mo>−</mo><mi>n</mi><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo stretchy="false">)</mo><mo>+</mo><mn>0.5</mn></mrow><mrow><mi>n</mi><mo stretchy="false">(</mo><msub><mi>q</mi><mi>i</mi></msub><mo stretchy="false">)</mo><mo>+</mo><mn>0.5</mn></mrow></mfrac><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">IDF(q_i)=\log({N-n(q_i)+0.5\over n(q_i)+0.5} + 1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mop">lo<span style="margin-right:0.01389em;">g</span></span><span class="mopen">(</span><span class="mord"><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">0.5</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10903em;">N</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">0.5</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)</span></span></span></span></span></p>
<p>où <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">NN</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span></span></span></span> N est le nombre total de documents dans le corpus,<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>etn</mi><mo stretchy="false">(</mo><msub><mi>qi</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">n(q_i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord mathnormal">)</span><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal"></span></span></span></span> n<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">i</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> ) est le nombre de documents contenant le terme <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">qiq_i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span></span></span></span> q <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">i</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">∣D∣|D|</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">∣D∣</span><span class="mord">:</span></span></span></span> Longueur du document <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">DD</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span></span></span></span> D (nombre total de termes).</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">avgdlavgdl</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.01968em;">avgdl</span></span></span></span>: Longueur moyenne de tous les documents du corpus.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">k1k_1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span></span></span></span> k<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0315em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span></span></span><span class="vlist-s">1</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>: Contrôle l'influence de la fréquence des termes sur le score. Des valeurs plus élevées augmentent l'importance de la fréquence des termes. La plage typique est [1,2, 2,0], tandis que Milvus permet une plage de [0, 3].</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">bb</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> b : contrôle le degré de normalisation de la longueur, de 0 à 1. Lorsque la valeur est 0, aucune normalisation n'est appliquée ; lorsque la valeur est 1, une normalisation complète est appliquée.</p></li>
</ul>
