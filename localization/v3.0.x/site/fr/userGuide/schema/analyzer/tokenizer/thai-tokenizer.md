---
id: thai-tokenizer.md
title: ThaïCompatible with Milvus 3.0.0+
summary: >-
  Le tokeniseur thaï segmenté le texte thaï en tokens de mots et élimine les
  espaces et les segments composés uniquement de signes de ponctuation.
beta: Milvus 3.0.0+
---
<h1 id="Thai" class="common-anchor-header">Thaï<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Thai" class="anchor-icon" translate="no">
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
    </button></h1><p>Le tokeniseur « <code translate="no">thai</code> » segmente le texte thaï en tokens de mots sans s'appuyer sur les espaces. Utilisez ce tokeniseur lorsque vous devez créer un pipeline d'analyse personnalisé pour du texte en thaï ou mixte (thaï/anglais).</p>
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
    </button></h2><div class="alert note">
<p>Pour le texte en thaï, utilisez dans la plupart des cas l’analyseur intégré <a href="/docs/fr/thai-analyzer.md"><code translate="no">thai</code></a> dans la plupart des cas. L'analyseur intégré inclut ce tokeniseur ainsi que la conversion en minuscules, la normalisation des chiffres décimaux et la suppression des mots vides en thaï. N'utilisez directement le tokeniseur « <code translate="no">thai</code> » que lorsque vous devez créer un pipeline d'analyseur personnalisé.</p>
</div>
<p>Pour configurer un analyseur à l’aide du tokenizer « <code translate="no">thai</code> », définissez ` <code translate="no">tokenizer</code> ` sur ` <code translate="no">thai</code> ` dans ` <code translate="no">analyzer_params</code>`.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>Le tokenizer <code translate="no">thai</code> ne dispose d’aucun paramètre configurable.</p>
<p>Le tokenizer peut fonctionner avec un ou plusieurs filtres. Par exemple, la configuration suivante utilise le tokenizer <code translate="no">thai</code> avec le <a href="/docs/fr/lowercase-filter.md"><code translate="no">lowercase</code></a> et <a href="/docs/fr/decimaldigit-filter.md"><code translate="no">decimaldigit</code></a> :</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        <span class="hljs-string">&quot;decimaldigit&quot;</span>,
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>Ce pipeline personnalisé n’est pas équivalent à l’analyseur <code translate="no">thai</code> intégré, car il n’inclut pas le dictionnaire de mots vides <code translate="no">_thai_</code> intégré. Pour le pipeline prédéfini complet, utilisez <code translate="no">{&quot;type&quot;: &quot;thai&quot;}</code>.</p>
<p>Le tokeniseur applique le comportement suivant :</p>
<ul>
<li><strong>Segmentation du thaï</strong>: segmente le texte thaï en tokens de mots sans s’appuyer sur les espaces.</li>
<li><strong>Filtrage des espaces et de la ponctuation</strong>: filtre les segments composés uniquement d’espaces et de signes de ponctuation. Cela diffère du <a href="/docs/fr/icu-tokenizer.md"><code translate="no">icu</code></a> tokenizer, qui peut conserver la ponctuation et les espaces en tant que tokens.</li>
<li><strong>Texte à scripts mixtes</strong>: génère des tokens de mots en alphabet latin dans un texte mêlant le thaï et l’anglais.</li>
<li><strong>Tokeniseur uniquement</strong>: ne met pas les tokens en minuscules, ne normalise pas les chiffres Unicode et ne supprime pas les mots vides. Ajoutez des filtres ou utilisez l' <a href="/docs/fr/thai-analyzer.md"><code translate="no">thai</code></a> pour ces étapes.</li>
<li><strong>Sémantique de position</strong>: utilise les positions des tokens basées sur les caractères, y compris les espaces et la ponctuation ignorés, ce qui garantit une cohérence du comportement de correspondance de phrases et de proximité avec d’autres tokeniseurs non latins.</li>
</ul>
<p>Après avoir défini l’ <code translate="no">analyzer_params</code>, vous pouvez appliquer l’analyseur à un champ de type « <code translate="no">VARCHAR</code> » lors de la définition d’un schéma de collection. Pour plus de détails, reportez-vous à la section <a href="/docs/fr/analyzer-overview.md#Example-use">«Exemple d’utilisation</a>».</p>
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
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
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

sample_text = <span class="hljs-string">&quot;สวัสดี! ทดสอบ, ระบบ Milvus ๑๒๓&quot;</span>

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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;สวัสดี&#x27;</span>, <span class="hljs-string">&#x27;ทดสอบ&#x27;</span>, <span class="hljs-string">&#x27;ระบบ&#x27;</span>, <span class="hljs-string">&#x27;Milvus&#x27;</span>, <span class="hljs-string">&#x27;๑๒๓&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
