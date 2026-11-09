---
id: language-identifier.md
title: Identificateur de langueCompatible with Milvus v2.5.15+
summary: >-
  language_identifier est un tokeniseur spécialisé conçu pour améliorer les
  capacités de recherche textuelle de Milvus en automatisant le processus
  d'analyse linguistique. Sa fonction principale consiste à détecter la langue
  d'un champ de texte, puis à appliquer de manière dynamique l'analyseur
  préconfiguré le mieux adapté à cette langue. Cette fonctionnalité s'avère
  particulièrement utile pour les applications traitant plusieurs langues, car
  elle évite d'avoir à attribuer manuellement une langue à chaque entrée.
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">Identificateur de langue<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p>L'<code translate="no">language_identifier</code> est un tokeniseur spécialisé conçu pour améliorer les capacités de recherche textuelle de Milvus en automatisant le processus d'analyse linguistique. Sa fonction principale consiste à détecter la langue d'un champ de texte, puis à appliquer dynamiquement l'analyseur préconfiguré le mieux adapté à cette langue. Cette fonctionnalité est particulièrement utile pour les applications traitant plusieurs langues, car elle évite d’avoir à attribuer manuellement une langue à chaque entrée.</p>
<p>En acheminant intelligemment les données textuelles vers le pipeline de traitement approprié, l’ <code translate="no">language_identifier</code> rationalise l’ingestion de données multilingues et garantit une tokenisation précise pour les opérations de recherche et d’extraction ultérieures.</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">Workflow de détection de la langue<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>L’ <code translate="no">language_identifier</code> effectue une série d’étapes pour traiter une chaîne de texte, un workflow qu’il est essentiel que les utilisateurs comprennent afin de le configurer correctement.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" /> 
   <span>Workflow de détection de la langue</span>
  
 </span></p>
<ol>
<li><p><strong>Entrée :</strong> le workflow commence par la réception d’une chaîne de texte en entrée.</p></li>
<li><p><strong>Détection de la langue :</strong> cette chaîne est d’abord transmise à un moteur de détection de langue, qui tente d’identifier la langue. Milvus prend en charge deux moteurs : <strong>whatlang</strong> et <strong>lingua</strong>.</p></li>
<li><p><strong>Sélection de l'analyseur :</strong></p>
<ul>
<li><p><strong>Succès :</strong> si la langue est détectée avec succès, le système vérifie si le nom de la langue détectée correspond à un analyseur configuré dans le dictionnaire de votre <code translate="no">analyzers</code>. Si une correspondance est trouvée, le système applique l’analyseur spécifié au texte d’entrée. Par exemple, un texte détecté comme étant en « mandarin » serait acheminé vers un tokeniseur <code translate="no">jieba</code>.</p></li>
<li><p><strong>Solution de secours :</strong> si la détection échoue, ou si une langue est détectée avec succès mais que vous n’avez pas fourni d’analyseur spécifique pour celle-ci, le système utilise <strong>par défaut</strong> un <strong>analyseur</strong> préconfiguré. Il s’agit là d’un point crucial à clarifier : l’analyseur « <code translate="no">default</code> » sert de solution de secours à la fois en cas d’échec de la détection et en cas d’absence d’analyseur correspondant.</p></li>
</ul></li>
</ol>
<p>Une fois l’analyseur approprié sélectionné, le texte est tokenisé et traité, ce qui achève le flux de travail.</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">Moteurs de détection de langue disponibles<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus propose le choix entre deux moteurs de détection de langue :</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>Le choix dépend des exigences spécifiques de votre application en matière de performances et de précision.</p>
<table>
   <tr>
     <th><p>Moteur</p></th>
     <th><p>Vitesse</p></th>
     <th><p>Précision</p></th>
     <th><p>Format de sortie</p></th>
     <th><p>Idéal pour</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>Rapide</p></td>
     <td><p>Convient à la plupart des langues</p></td>
     <td><p>Noms de langues (par exemple, <code translate="no">"English"</code>, <code translate="no">"Mandarin"</code> , <code translate="no">"Japanese"</code>)</p><p><strong>Référence :</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">colonne « Langue » du tableau des langues prises en charge</a></p></td>
     <td><p>Applications en temps réel où la vitesse est essentielle</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>Plus lent</p></td>
     <td><p>Précision accrue, en particulier pour les textes courts</p></td>
     <td><p>Noms des langues en anglais (par exemple, <code translate="no">"English"</code>, <code translate="no">"Chinese"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Référence :</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">liste des langues prises en charge</a></p></td>
     <td><p>Applications où la précision prime sur la vitesse</p></td>
   </tr>
</table>
<p>Un aspect essentiel à prendre en compte est la convention de nommage du moteur. Bien que les deux moteurs renvoient les noms de langues en anglais, ils utilisent des termes différents pour certaines langues (par exemple, <code translate="no">whatlang</code> renvoie <code translate="no">Mandarin</code>, tandis que <code translate="no">lingua</code> renvoie <code translate="no">Chinese</code>). La clé de l’analyseur doit correspondre exactement au nom renvoyé par le moteur de détection choisi.</p>
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
    </button></h2><p>Pour utiliser correctement le tokeniseur <code translate="no">language_identifier</code>, les étapes suivantes doivent être suivies afin de définir et d’appliquer sa configuration.</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">Étape 1 : Choisissez vos langues et vos analyseurs<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p>La configuration de l’ <code translate="no">language_identifier</code> repose essentiellement sur l’adaptation de vos analyseurs aux langues spécifiques que vous prévoyez de prendre en charge. Le système fonctionne en associant la langue détectée à l’analyseur approprié ; cette étape est donc cruciale pour un traitement précis du texte.</p>
<p>Vous trouverez ci-dessous une correspondance recommandée entre les langues et les analyseurs Milvus adaptés. Ce tableau sert de passerelle entre le résultat du moteur de détection de langue et l’outil le mieux adapté à la tâche.</p>
<table>
   <tr>
     <th><p>Langue (résultat du détecteur)</p></th>
     <th><p>Analyseur recommandé</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>Tokenisation standard de l’anglais avec lemmatisation et filtrage des mots vides.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (via whatlang) ou <code translate="no">Chinese</code> (via lingua)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>Segmentation des mots chinois pour les textes non délimités par des espaces.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>Un analyseur lexical robuste pour les écritures complexes, y compris le japonais.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>Une configuration personnalisée qui prend en charge les accents et les caractères français.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>La correspondance est essentielle :</strong> le nom de votre analyseur <strong>doit correspondre exactement à</strong> la langue de sortie du moteur de détection. Par exemple, si vous utilisez <code translate="no">whatlang</code>, la clé pour le texte chinois doit être <code translate="no">Mandarin</code>.</p></li>
<li><p><strong>Bonnes pratiques :</strong> le tableau ci-dessus fournit des configurations recommandées pour quelques langues courantes, mais il ne s’agit pas d’une liste exhaustive. Pour un guide plus complet sur le choix des analyseurs, consultez la section « <a href="/docs/fr/choose-the-right-analyzer-for-your-use-case.md">Choisir l’analyseur adapté à votre cas d’utilisation</a> ».</p></li>
<li><p><strong>Résultats du détecteur</strong>: pour obtenir la liste complète des noms de langues renvoyés par les moteurs de détection, consultez <a href="https://github.com/greyblake/whatlang-rs">le tableau des langues prises en charge par Whatlang</a> et <a href="https://github.com/pemistahl/lingua-rs">la liste des langues prises en charge par Lingua</a>.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">Étape 2 : Définir `analyzer_params`<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour utiliser le tokeniseur « <code translate="no">language_identifier</code> » dans Milvus, créez un dictionnaire contenant les éléments clés suivants :</p>
<p><strong>Éléments obligatoires :</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> config set – Un dictionnaire contenant toutes les configurations d’analyseurs, qui doit inclure :</p>
<ul>
<li><p><code translate="no">default</code> – L’analyseur de secours utilisé lorsque la détection de la langue échoue ou qu’aucun analyseur correspondant n’est trouvé</p></li>
<li><p><strong>Analyseurs spécifiques à chaque langue</strong> – Chacun étant défini sous la forme <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code>, où :</p>
<ul>
<li><p><code translate="no">analyzer_name</code> correspond à la sortie du moteur de détection que vous avez choisi (par exemple, <code translate="no">&quot;English&quot;</code>, <code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> respecte le format standard des paramètres d’analyseur (voir <a href="/docs/fr/analyzer-overview.md#Analyzer-types">Présentation des analyseurs</a>)</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Composants facultatifs :</strong></p>
<ul>
<li><p><code translate="no">identifier</code> – Spécifie le moteur de détection de langue à utiliser (<code translate="no">whatlang</code> ou <code translate="no">lingua</code>). La valeur par défaut est <code translate="no">whatlang</code> si rien n’est spécifié</p></li>
<li><p><code translate="no">mapping</code> – Crée des alias personnalisés pour vos analyseurs, ce qui vous permet d’utiliser des noms descriptifs au lieu du format de sortie exact du moteur de détection</p></li>
</ul>
<p>Le tokenizer fonctionne en détectant d’abord la langue du texte d’entrée, puis en sélectionnant l’analyseur approprié dans votre configuration. Si la détection échoue ou s’il n’existe aucun analyseur correspondant, il se rabat automatiquement sur votre analyseur <code translate="no">default</code>.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">Recommandation : correspondance directe des noms</h4><p>Les noms de vos analyseurs doivent correspondre exactement à la sortie du moteur de détection de langue que vous avez choisi. Cette approche est plus simple et évite toute confusion potentielle.</p>
<p>Pour <code translate="no">whatlang</code> et <code translate="no">lingua</code>, utilisez les noms de langues tels qu’ils apparaissent dans leur documentation respective :</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">langues prises en charge par whatlang</a> (utilisez la colonne «<strong>Langue</strong> »)</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">Langues prises en charge par lingua</a></p></li>
</ul>
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
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment"># Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,  <span class="hljs-comment"># or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {  <span class="hljs-comment"># A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>  <span class="hljs-comment"># fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);   <span class="hljs-comment">// Must be `language_identifier`</span>
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>);        <span class="hljs-comment">// or `lingua`</span>
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// A set of analyzer configs</span>
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>); <span class="hljs-comment">// fallback if language detection fails</span>
        }});
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;Mandarin&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{ <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
        }});
    }});
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>, <span class="hljs-comment">// Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,            <span class="hljs-comment">// or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{         <span class="hljs-comment">// A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
            },
        },
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment">// Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,       <span class="hljs-comment">// or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {                  <span class="hljs-comment">// A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span> <span class="hljs-comment">// fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {                <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {               <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>}, <span class="hljs-comment">// Must be `language_identifier`</span>
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>},      <span class="hljs-comment">// or `lingua`</span>
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {                  <span class="hljs-comment">// A set of analyzer configs</span>
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}}, <span class="hljs-comment">// fallback if language detection fails</span>
            {<span class="hljs-string">&quot;English&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},       <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            {<span class="hljs-string">&quot;Mandarin&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>}}}    <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
        }}
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>, <span class="hljs-comment">// Must be `language_identifier`</span>
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,      <span class="hljs-comment">// or `lingua`</span>
    <span class="hljs-attr">analyzers</span>: {                 <span class="hljs-comment">// A set of analyzer configs</span>
      <span class="hljs-attr">default</span>: {
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,   <span class="hljs-comment">// fallback if language detection fails</span>
      },
      <span class="hljs-title class_">English</span>: {                 <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
      },
      <span class="hljs-title class_">Mandarin</span>: {                <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
      },
    },
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>, <span class="hljs-comment">// Must be `language_identifier`</span>
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;whatlang&quot;</span>,      <span class="hljs-comment">// or `lingua`</span>
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// A set of analyzer configs</span>
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span> <span class="hljs-comment">// fallback if language detection fails</span>
            },
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            {
                [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span>
            },
            [<span class="hljs-string">&quot;Mandarin&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: {
    &quot;type&quot;: &quot;language_identifier&quot;,
    &quot;identifier&quot;: &quot;whatlang&quot;,
    &quot;analyzers&quot;: {
      &quot;default&quot;: {
        &quot;tokenizer&quot;: &quot;standard&quot;
      },
      &quot;English&quot;: {
        &quot;type&quot;: &quot;english&quot;
      },
      &quot;Mandarin&quot;: {
        &quot;tokenizer&quot;: &quot;jieba&quot;
      }
    }
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">Autre approche : noms personnalisés avec mappage</h4><p>Si vous préférez utiliser des noms d'analyseurs personnalisés ou si vous devez maintenir la compatibilité avec des configurations existantes, vous pouvez utiliser le paramètre <code translate="no">mapping</code>. Cela crée des alias pour vos analyseurs : les noms d'origine des moteurs de détection et vos noms personnalisés fonctionneront tous les deux.</p>
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
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment"># Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>);
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;english_analyzer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Custom analyzer name</span>
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;chinese_analyzer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Custom analyzer name</span>
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
        }});
    }});
    put(<span class="hljs-string">&quot;mapping&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Maps detection output to custom name</span>
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-string">&quot;english_analyzer&quot;</span>);
        put(<span class="hljs-string">&quot;Chinese&quot;</span>, <span class="hljs-string">&quot;chinese_analyzer&quot;</span>);
    }});
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
            },
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Maps detection output to custom names</span>
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>,
        },
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment">// Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>},
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>},
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}},
            {<span class="hljs-string">&quot;english_analyzer&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},      <span class="hljs-comment">// Custom analyzer name</span>
            {<span class="hljs-string">&quot;chinese_analyzer&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>}}}    <span class="hljs-comment">// Custom analyzer name</span>
        }},
        {<span class="hljs-string">&quot;mapping&quot;</span>, {                                          <span class="hljs-comment">// Maps detection output to custom names</span>
            {<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-string">&quot;english_analyzer&quot;</span>},
            {<span class="hljs-string">&quot;Chinese&quot;</span>, <span class="hljs-string">&quot;chinese_analyzer&quot;</span>}
        }}
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
    <span class="hljs-attr">analyzers</span>: {
      <span class="hljs-attr">default</span>: {
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,
      },
      <span class="hljs-attr">english_analyzer</span>: { <span class="hljs-comment">// Custom analyzer name</span>
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
      },
      <span class="hljs-attr">chinese_analyzer</span>: { <span class="hljs-comment">// Custom analyzer name</span>
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
      },
    },
    <span class="hljs-attr">mapping</span>: {            <span class="hljs-comment">// Maps detection output to custom names</span>
      <span class="hljs-title class_">English</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,
      <span class="hljs-title class_">Chinese</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>,
    },
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>,
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;lingua&quot;</span>,
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span>
            },
            [<span class="hljs-string">&quot;english_analyzer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Custom analyzer name</span>
            {
                [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span>
            },
            [<span class="hljs-string">&quot;chinese_analyzer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Custom analyzer name</span>
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        [<span class="hljs-string">&quot;mapping&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Maps detection output to custom names</span>
        {
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-string">&quot;english_analyzer&quot;</span>,
            [<span class="hljs-string">&quot;Chinese&quot;</span>] = <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: {
    &quot;type&quot;: &quot;language_identifier&quot;,
    &quot;identifier&quot;: &quot;lingua&quot;,
    &quot;analyzers&quot;: {
      &quot;default&quot;: {
        &quot;tokenizer&quot;: &quot;standard&quot;
      },
      &quot;english_analyzer&quot;: {
        &quot;type&quot;: &quot;english&quot;
      },
      &quot;chinese_analyzer&quot;: {
        &quot;tokenizer&quot;: &quot;jieba&quot;
      }
    },
    &quot;mapping&quot;: {
      &quot;English&quot;: &quot;english_analyzer&quot;,
      &quot;Chinese&quot;: &quot;chinese_analyzer&quot;
    }
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Après avoir défini les paramètres ` <code translate="no">analyzer_params</code>`, vous pouvez les appliquer à un champ ` <code translate="no">VARCHAR</code> ` lors de la définition d’un schéma de collection. Cela permet à Milvus de traiter le texte de ce champ à l’aide de l’analyseur spécifié, pour une tokenisation et un filtrage efficaces. Pour plus de détails, consultez la section « <a href="/docs/fr/analyzer-overview.md#Example-use">Exemple d’utilisation</a> ».</p>
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
    </button></h2><p>Voici quelques configurations prêtes à l’emploi pour des scénarios courants. Chaque exemple comprend à la fois la configuration et le code de vérification afin que vous puissiez tester immédiatement la mise en place.</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">Détection de l’anglais et du chinois<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Configuration</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
}

<span class="hljs-comment"># Test the configuration</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># English text</span>
result_en = client.run_analyzer(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;English:&quot;</span>, result_en)

<span class="hljs-comment"># Chinese text</span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.*;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Configuration</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>);
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;Mandarin&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
        }});
    }});
}});

<span class="hljs-comment">// English text</span>
List&lt;String&gt; english = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
english.add(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>);
<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">enResp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(english)
        .analyzerParams(analyzerParams)
        .build());

<span class="hljs-comment">// Chinese text</span>
List&lt;String&gt; chinese = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
chinese.add(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>);
<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">cnResp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(chinese)
        .analyzerParams(analyzerParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-comment">// Configuration</span>
analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;default&quot;</span>:  <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>:  <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>},
        },
    },
}

<span class="hljs-comment">// English text</span>
enResult, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>).
        WithAnalyzerParams(analyzerParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">for</span> _, tokens := <span class="hljs-keyword">range</span> enResult {
    fmt.Println(<span class="hljs-string">&quot;English:&quot;</span>, tokens.Tokens)
}

<span class="hljs-comment">// Chinese text</span>
cnResult, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>).
        WithAnalyzerParams(analyzerParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">for</span> _, tokens := <span class="hljs-keyword">range</span> cnResult {
    fmt.Println(<span class="hljs-string">&quot;Chinese:&quot;</span>, tokens.Tokens)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Configuration</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
});

<span class="hljs-comment">// English text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">en_response</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params.<span class="hljs-title function_ invoke__">clone</span>())
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Chinese text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">cn_response</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Configuration</span>
nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>},
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>},
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}},
            {<span class="hljs-string">&quot;English&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},
            {<span class="hljs-string">&quot;Mandarin&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>}}}
        }}
    }}
};

<span class="hljs-comment">// English text</span>
milvus::RunAnalyzerRequest en_request;
en_request.<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);
en_request.<span class="hljs-built_in">AddText</span>(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>);
milvus::RunAnalyzerResponse en_response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(en_request, en_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Chinese text</span>
milvus::RunAnalyzerRequest cn_request;
cn_request.<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);
cn_request.<span class="hljs-built_in">AddText</span>(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>);
milvus::RunAnalyzerResponse cn_response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(cn_request, cn_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>,
});

<span class="hljs-comment">// Configuration</span>
<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
    <span class="hljs-attr">analyzers</span>: {
      <span class="hljs-attr">default</span>: { <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span> },
      <span class="hljs-title class_">English</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span> },
      <span class="hljs-title class_">Mandarin</span>: { <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span> },
    },
  },
};

<span class="hljs-comment">// English text</span>
<span class="hljs-keyword">const</span> en_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;The Milvus vector database is built for scale!&#x27;</span>,
  analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;English:&#x27;</span>, en_result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>)));

<span class="hljs-comment">// Chinese text</span>
<span class="hljs-keyword">const</span> cn_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Milvus 向量数据库专为大规模应用而设计&#x27;</span>,
  analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Chinese:&#x27;</span>, cn_result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Configuration</span>
<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>,
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;whatlang&quot;</span>,
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span> },
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span> },
            [<span class="hljs-string">&quot;Mandarin&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span> }
        }
    }
};

<span class="hljs-comment">// English text</span>
<span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span> }
});

<span class="hljs-comment">// Chinese text</span>
<span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;language_identifier\&quot;,\&quot;identifier\&quot;:\&quot;whatlang\&quot;,\&quot;analyzers\&quot;:{\&quot;default\&quot;:{\&quot;tokenizer\&quot;:\&quot;standard\&quot;},\&quot;English\&quot;:{\&quot;type\&quot;:\&quot;english\&quot;},\&quot;Mandarin\&quot;:{\&quot;tokenizer\&quot;:\&quot;jieba\&quot;}}}}&quot;,
    &quot;text&quot;: [&quot;The Milvus vector database is built for scale!&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">Langues européennes avec normalisation des accents<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
            }
        }
    }
}

<span class="hljs-comment"># Test with accented text</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.*;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>);
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;French&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
            put(<span class="hljs-string">&quot;filter&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>));
        }});
    }});
}});

<span class="hljs-comment">// Test with accented text</span>
List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>);
<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>:    []any{<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>},
            },
        },
    },
}

<span class="hljs-comment">// Test with accented text</span>
result, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>).
        WithAnalyzerParams(analyzerParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">for</span> _, tokens := <span class="hljs-keyword">range</span> result {
    fmt.Println(<span class="hljs-string">&quot;French:&quot;</span>, tokens.Tokens)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
            }
        }
    }
});

<span class="hljs-comment">// Test with accented text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;Café français très délicieux&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>},
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>},
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}},
            {<span class="hljs-string">&quot;English&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},
            {<span class="hljs-string">&quot;French&quot;</span>, {
                {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>},
                {<span class="hljs-string">&quot;filter&quot;</span>, {<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>}}
            }}
        }}
    }}
};

<span class="hljs-comment">// Test with accented text</span>
milvus::RunAnalyzerRequest request;
request.<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);
request.<span class="hljs-built_in">AddText</span>(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>);
milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>,
});

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
    <span class="hljs-attr">analyzers</span>: {
      <span class="hljs-attr">default</span>: { <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span> },
      <span class="hljs-title class_">English</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span> },
      <span class="hljs-title class_">French</span>: {
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-attr">filter</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>],
      },
    },
  },
};

<span class="hljs-comment">// Test with accented text</span>
<span class="hljs-keyword">const</span> fr_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Café français très délicieux&#x27;</span>,
  analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;French:&#x27;</span>, fr_result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>,
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;lingua&quot;</span>,
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span> },
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span> },
            [<span class="hljs-string">&quot;French&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span>,
                [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span> }
            }
        }
    }
};

<span class="hljs-comment">// Test with accented text</span>
<span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;Café français très délicieux&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;language_identifier\&quot;,\&quot;identifier\&quot;:\&quot;lingua\&quot;,\&quot;analyzers\&quot;:{\&quot;default\&quot;:{\&quot;tokenizer\&quot;:\&quot;standard\&quot;},\&quot;English\&quot;:{\&quot;type\&quot;:\&quot;english\&quot;},\&quot;French\&quot;:{\&quot;tokenizer\&quot;:\&quot;standard\&quot;,\&quot;filter\&quot;:[\&quot;lowercase\&quot;,\&quot;asciifolding\&quot;]}}}}&quot;,
    &quot;text&quot;: [&quot;Café français très délicieux&quot;]
  }&#x27;</span>
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
    </button></h3><p>L'exemple européen ci-dessus génère les tokens suivants dans l'ordre. Les objets de réponse du SDK et le format d'affichage varient selon le langage ; la réponse REST contient ces tokens à l'adresse <code translate="no">data.results[].tokens[].token</code>. La séquence de tokens pour l'exemple de détection de l'anglais et du chinois dépend de l'analyseur sélectionné par le détecteur pour chaque entrée ; elle n'est donc pas reproduite ici.</p>
<pre><code translate="no" class="language-plaintext">French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Remarques d'utilisation<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Une seule langue par champ :</strong> le détecteur traite chaque champ comme une unité de texte unique et homogène. Il est conçu pour gérer différentes langues au sein de différents enregistrements de données, par exemple un enregistrement contenant une phrase en anglais et le suivant une phrase en français.</p></li>
<li><p><strong>Pas de chaînes multilingues :</strong> il <strong>n’</strong> est <strong>pas</strong> conçu pour traiter une seule chaîne contenant du texte en plusieurs langues. Par exemple, un champ <code translate="no">VARCHAR</code> contenant à la fois une phrase en anglais et une citation en japonais sera traité comme une seule langue.</p></li>
<li><p><strong>Traitement de la langue dominante :</strong> dans les cas de mélange de langues, le moteur de détection identifiera probablement la langue dominante, et l’analyseur correspondant sera appliqué à l’ensemble du texte. Il en résultera une tokenisation médiocre, voire inexistante, pour le texte étranger intégré.</p></li>
</ul>
