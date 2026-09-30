---
id: arabic-analyzer.md
title: ArabeCompatible with Milvus 3.0.0+
summary: >-
  L'analyseur arabe intégré traite les textes en arabe en normalisant les
  variantes de lettres et les chiffres, en effectuant le stemming des termes et
  en supprimant les mots vides arabes.
beta: Milvus 3.0.0+
---
<h1 id="Arabic" class="common-anchor-header">Arabe<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Arabic" class="anchor-icon" translate="no">
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
    </button></h1><p>L'analyseur « <code translate="no">arabic</code> » est un analyseur intégré destiné aux textes en arabe. Utilisez cet analyseur lorsque vous souhaitez que Milvus normalise les variantes des lettres arabes, supprime les signes diacritiques et le tatweel, convertisse les chiffres arabo-indiens, applique le lemmatisation arabe et supprime les mots vides arabes.</p>
<h2 id="Configuration" class="common-anchor-header">Configuration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Les analyseurs intégrés sont des modèles d’analyse fournis par Milvus. Pour utiliser un analyseur intégré, définissez <code translate="no">type</code> sur le nom d’un analyseur prédéfini dans <code translate="no">analyzer_params</code>.</p>
<p>Pour utiliser l’analyseur arabe intégré, définissez ` <code translate="no">type</code> ` sur ` <code translate="no">arabic</code>` :</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;arabic&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>L'analyseur <code translate="no">arabic</code> accepte le paramètre facultatif suivant :</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Type</p></th>
     <th><p>Valeur par défaut</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">stop_words</code></p></td>
     <td><p><code translate="no">list[str]</code></p></td>
     <td><p><code translate="no">_arabic_</code></p></td>
     <td><p>Liste des mots vides supplémentaires à exclure de la tokenisation. Par défaut, l'analyseur « <code translate="no">arabic</code> » utilise le dictionnaire intégré « <code translate="no">_arabic_</code> ». Pour consulter le dictionnaire par défaut, reportez-vous à la <a href="https://github.com/milvus-io/milvus/blob/1945ba399b4552fd0fd0b131f7c735ddde21e71c/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/filter/stop_words/arabic.txt">liste des mots vides arabes</a> de Milvus. Cette liste provient du <a href="https://github.com/apache/lucene/blob/main/lucene/analysis/common/src/resources/org/apache/lucene/analysis/ar/stopwords.txt">fichier de mots vides arabes</a> d'Apache Lucene.</p></td>
   </tr>
</table>
<p>Pour ajouter des mots vides personnalisés, incluez <code translate="no">stop_words</code>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;arabic&quot;</span>,
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;ميلفوس&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<p>Milvus applique les mots vides personnalisés en plus du dictionnaire intégré « <code translate="no">_arabic_</code> ».</p>
<p>L'analyseur intégré « <code translate="no">arabic</code> » équivaut à la configuration d'analyseur personnalisée suivante :</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        <span class="hljs-string">&quot;decimaldigit&quot;</span>,
        <span class="hljs-string">&quot;arabic_normalization&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;arabic&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: <span class="hljs-string">&quot;_arabic_&quot;</span>,
        },
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>Cet analyseur applique les étapes de traitement suivantes :</p>
<ul>
<li><strong>Tokenisation</strong>: utilise le tokeniseur « <code translate="no">standard</code> » pour diviser le texte en tokens.</li>
<li><strong>Normalisation des chiffres</strong>: utilise le filtre « <code translate="no">decimaldigit</code> » pour convertir les chiffres décimaux arabo-indiens et autres chiffres décimaux Unicode en chiffres ASCII.</li>
<li><strong>Normalisation de l’arabe</strong>: utilise le filtre <code translate="no">arabic_normalization</code> pour normaliser les variantes de l’alif, le teh marbuta et l’alif maksura, et supprimer les harakat et les tatweel.</li>
<li><strong>Stemming</strong>: utilise le filtre <code translate="no">stemmer</code> avec l’option « <code translate="no">language</code> » définie sur « <code translate="no">arabic</code> ».</li>
<li><strong>Suppression des mots vides</strong>: utilise le filtre « <code translate="no">stop</code> » avec le dictionnaire intégré « <code translate="no">_arabic_</code> ».</li>
</ul>
<p>Une fois <code translate="no">analyzer_params</code> défini, vous pouvez appliquer l’analyseur à un champ <code translate="no">VARCHAR</code> lors de la définition d’un schéma de collection. Pour plus de détails, reportez-vous à <a href="/docs/fr/analyzer-overview.md#Example-use">la section Exemple d’utilisation</a>.</p>
<h2 id="Examples" class="common-anchor-header">Exemples<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d’appliquer la configuration de l’analyseur à votre schéma de collection, vérifiez son comportement à l’aide de la méthode ` <code translate="no">run_analyzer</code> `.</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">Configuration de l’analyseur<button data-href="#Analyzer-configuration" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;arabic&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">Vérification à l’aide de <code translate="no">run_analyzer</code><button data-href="#Verification-using-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sample_text = <span class="hljs-string">&quot;كِتَابٌ عـــربي ١٢٣&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">Résultat attendu<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;كتاب&#x27;</span>, <span class="hljs-string">&#x27;عرب&#x27;</span>, <span class="hljs-string">&#x27;123&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
