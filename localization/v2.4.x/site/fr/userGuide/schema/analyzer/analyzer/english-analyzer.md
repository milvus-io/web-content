---
id: english-analyzer.md
title: Analyseur d'anglais
related_key: 'english, analyzer'
summary: >-
  L'analyseur `english` de Milvus est conçu pour traiter le texte anglais, en
  appliquant des règles spécifiques à la langue pour la tokenisation et le
  filtrage.
---
<h1 id="English​" class="common-anchor-header">Anglais<button data-href="#English​" class="anchor-icon" translate="no">
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
    </button></h1><p>L'analyseur <code translate="no">english</code> de Milvus est conçu pour traiter des textes en anglais, en appliquant des règles de tokenisation et de filtrage propres à la langue.</p>
<h3 id="Definition​" class="common-anchor-header">Définition</h3><p>L'analyseur <code translate="no">english</code> utilise les composants suivants.</p>
<ul>
<li><p><strong>Tokenizer</strong>: Utilise le <a href="/docs/fr/standard-tokenizer.md"><code translate="no">standard tokenizer</code></a> pour diviser le texte en unités de mots discrètes.</p></li>
<li><p>Filtres : Inclut plusieurs filtres pour un traitement complet du texte.</p>
<ul>
<li><p><a href="/docs/fr/lowercase-filter.md"><code translate="no">lowercase</code></a>: Convertit tous les tokens en minuscules, ce qui permet d'effectuer des recherches sans tenir compte de la casse.</p></li>
<li><p><a href="/docs/fr/stemmer-filter.md"><code translate="no">stemmer</code></a>: Réduit les mots à leur forme racine pour permettre une recherche plus large (par exemple, "running" devient "run").</p></li>
<li><p><a href="/docs/fr/stop-filter.md"><code translate="no">stop_words</code></a>: Supprime les mots d'arrêt courants en anglais pour se concentrer sur les termes clés du texte.</p></li>
</ul></li>
</ul>
<p>La fonctionnalité de l'analyseur <code translate="no">english</code> est équivalente à la configuration suivante de l'analyseur personnalisé.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,​
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
        }，{​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: <span class="hljs-string">&quot;_english_&quot;</span>,​
        }​
    ]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">Configuration</h3><p>Pour appliquer l'analyseur <code translate="no">english</code> à un champ, il suffit de définir <code translate="no">type</code> sur <code translate="no">english</code> dans <code translate="no">analyzer_params</code>, et d'inclure des paramètres optionnels si nécessaire.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p>L'analyseur <code translate="no">english</code> accepte les paramètres facultatifs suivants : </p>
<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">Paramètre</p>
</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">Description</p>
</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code translate="no">stop_words</code></p>
</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">Un tableau contenant une liste de mots vides, qui seront supprimés de la tokenisation. La valeur par défaut est <code translate="no">_english_</code>, un ensemble intégré de mots d'arrêt anglais courants.</p>
</td></tr></tbody></table>
<p>Exemple de configuration avec des mots vides personnalisés.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Après avoir défini <code translate="no">analyzer_params</code>, vous pouvez les appliquer à un champ <code translate="no">VARCHAR</code> lors de la définition d'un schéma de collecte. Cela permet à Milvus de traiter le texte de ce champ à l'aide de l'analyseur spécifié pour une tokenisation et un filtrage efficaces. Pour plus de détails, voir <a href="/docs/fr/analyzer-overview.md#Example-use">Exemple d'utilisation</a>.</p>
<h3 id="Example-output​" class="common-anchor-header">Exemple de sortie</h3><p>Voici comment l'analyseur <code translate="no">english</code> traite le texte.</p>
<p><strong>Texte original</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Résultat attendu</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;databas&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
