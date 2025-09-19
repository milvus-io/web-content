---
id: language-identifier.md
title: Identificateur de langueCompatible with Milvus v2.5.15+
summary: >-
  Le language_identifier est un tokenizer spécialisé conçu pour améliorer les
  capacités de recherche de texte de Milvus en automatisant le processus
  d'analyse linguistique. Sa fonction principale est de détecter la langue d'un
  champ de texte, puis d'appliquer dynamiquement un analyseur préconfiguré qui
  convient le mieux à cette langue. Cette fonction est particulièrement utile
  pour les applications qui traitent une variété de langues, car elle élimine la
  nécessité d'une affectation manuelle de la langue pour chaque entrée.
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
    </button></h1><p>Le site <code translate="no">language_identifier</code> est un tokenizer spécialisé conçu pour améliorer les capacités de recherche de texte de Milvus en automatisant le processus d'analyse linguistique. Sa fonction principale est de détecter la langue d'un champ de texte, puis d'appliquer dynamiquement un analyseur préconfiguré qui convient le mieux à cette langue. Cette fonction est particulièrement précieuse pour les applications qui traitent une grande variété de langues, car elle élimine la nécessité d'une affectation manuelle de la langue pour chaque entrée.</p>
<p>En acheminant intelligemment les données textuelles vers le pipeline de traitement approprié, le site <code translate="no">language_identifier</code> rationalise l'ingestion de données multilingues et garantit une tokenisation précise pour les opérations de recherche et d'extraction ultérieures.</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">Flux de travail pour la détection des langues<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>Le site <code translate="no">language_identifier</code> exécute une série d'étapes pour traiter une chaîne de texte, un flux de travail qui est essentiel pour que les utilisateurs comprennent comment le configurer correctement.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" />
   </span> <span class="img-wrapper"> <span>Flux de travail de la détection de la langue</span> </span></p>
<ol>
<li><p><strong>Entrée :</strong> Le flux de travail commence par une chaîne de texte en entrée.</p></li>
<li><p><strong>Détection de la langue :</strong> Cette chaîne est d'abord transmise à un moteur de détection de la langue, qui tente d'identifier la langue. Milvus prend en charge deux moteurs : <strong>whatlang</strong> et <strong>lingua</strong>.</p></li>
<li><p><strong>Sélection de l'analyseur :</strong></p>
<ul>
<li><p><strong>Succès :</strong> Si la langue est détectée avec succès, le système vérifie si le nom de la langue détectée a un analyseur correspondant configuré dans votre dictionnaire <code translate="no">analyzers</code>. Si une correspondance est trouvée, le système applique l'analyseur spécifié au texte d'entrée. Par exemple, un texte détecté en "mandarin" sera acheminé vers un tokenizer <code translate="no">jieba</code>.</p></li>
<li><p><strong>Repli :</strong> Si la détection échoue, ou si une langue est détectée avec succès mais que vous n'avez pas fourni d'analyseur spécifique, le système utilise un <strong>analyseur par défaut</strong> préconfiguré. Il s'agit là d'un point de clarification crucial : l'analyseur <code translate="no">default</code> est une solution de repli à la fois en cas d'échec de la détection et en l'absence d'analyseur correspondant.</p></li>
</ul></li>
</ol>
<p>Une fois que l'analyseur approprié a été choisi, le texte est transformé en jetons et traité, ce qui complète le flux de travail.</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">Moteurs de détection linguistique disponibles<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus offre le choix entre deux moteurs de détection de la langue :</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>Le choix dépend des exigences spécifiques de performance et de précision de votre application.</p>
<table>
   <tr>
     <th><p>Moteur</p></th>
     <th><p>Vitesse</p></th>
     <th><p>Précision</p></th>
     <th><p>Format de sortie</p></th>
     <th><p>Meilleur pour</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>Rapide</p></td>
     <td><p>Bon pour la plupart des langues</p></td>
     <td><p>Noms de langues (par exemple, <code translate="no">"English"</code>, <code translate="no">"Mandarin"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Référence :</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">Colonne "Langue" dans le tableau des langues prises en charge</a></p></td>
     <td><p>Applications en temps réel où la vitesse est essentielle</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>Plus lent</p></td>
     <td><p>Plus grande précision, en particulier pour les textes courts</p></td>
     <td><p>Noms en anglais (par exemple, <code translate="no">"English"</code>, <code translate="no">"Chinese"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Référence :</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">Liste des langues prises en charge</a></p></td>
     <td><p>Applications pour lesquelles la précision est plus importante que la vitesse</p></td>
   </tr>
</table>
<p>La convention de dénomination du moteur est un élément essentiel à prendre en considération. Bien que les deux moteurs renvoient des noms de langue en anglais, ils utilisent des termes différents pour certaines langues (par exemple, <code translate="no">whatlang</code> renvoie à <code translate="no">Mandarin</code>, tandis que <code translate="no">lingua</code> renvoie à <code translate="no">Chinese</code>). La clé de l'analyseur doit correspondre exactement au nom renvoyé par le moteur de détection choisi.</p>
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
    </button></h2><p>Pour utiliser correctement le tokenizer <code translate="no">language_identifier</code>, les étapes suivantes doivent être suivies pour définir et appliquer sa configuration.</p>
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
    </button></h3><p>L'essentiel de la configuration de <code translate="no">language_identifier</code> consiste à adapter vos analyseurs aux langues spécifiques que vous envisagez de prendre en charge. Le système fonctionne en associant la langue détectée à l'analyseur approprié, cette étape est donc cruciale pour un traitement précis du texte.</p>
<p>Vous trouverez ci-dessous une correspondance recommandée entre les langues et les analyseurs Milvus appropriés. Ce tableau sert de passerelle entre la sortie du moteur de détection de la langue et l'outil le mieux adapté.</p>
<table>
   <tr>
     <th><p>Langue (sortie du détecteur)</p></th>
     <th><p>Analyseur recommandé</p></th>
     <th><p>Description de la langue</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>Tokenisation de l'anglais standard avec stemming et filtrage des mots vides.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (via whatlang) ou <code translate="no">Chinese</code> (via lingua)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>Segmentation des mots chinois pour les textes non délimités par l'espace.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>Un tokenizer robuste pour les écritures complexes, y compris le japonais.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>Une configuration personnalisée qui gère les accents et les caractères français.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>La correspondance est essentielle :</strong> Le nom de votre analyseur <strong>doit correspondre exactement à</strong> la langue de sortie du moteur de détection. Par exemple, si vous utilisez <code translate="no">whatlang</code>, la clé pour le texte chinois doit être <code translate="no">Mandarin</code>.</p></li>
<li><p><strong>Meilleures pratiques :</strong> Le tableau ci-dessus fournit des configurations recommandées pour quelques langues courantes, mais il ne s'agit pas d'une liste exhaustive. Pour un guide plus complet sur le choix des analyseurs, reportez-vous à la section <a href="/docs/fr/choose-the-right-analyzer-for-your-use-case.md">Choisir le bon analyseur pour votre cas d'utilisation</a>.</p></li>
<li><p><strong>Sortie du détecteur</strong>: Pour une liste complète des noms de langues renvoyés par les moteurs de détection, reportez-vous au <a href="https://github.com/greyblake/whatlang-rs">tableau des langues prises en charge par Whatlang</a> et à la <a href="https://github.com/pemistahl/lingua-rs">liste des langues prises en charge par Lingua</a>.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">Etape 2 : Définir les paramètres de l'analyseur<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour utiliser le tokenizer <code translate="no">language_identifier</code> dans Milvus, créez un dictionnaire contenant ces composants clés :</p>
<p><strong>Composants requis :</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> config set - Un dictionnaire contenant toutes les configurations de l'analyseur, qui doit inclure :</p>
<ul>
<li><p><code translate="no">default</code> - L'analyseur de secours utilisé lorsque la détection de la langue échoue ou qu'aucun analyseur correspondant n'est trouvé.</p></li>
<li><p><strong>Analyseurs spécifiques à une langue</strong> - Chacun est défini comme <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code>, où :</p>
<ul>
<li><p><code translate="no">analyzer_name</code> correspond à la sortie du moteur de détection que vous avez choisi (par exemple, <code translate="no">&quot;English&quot;</code>, <code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> suit le format standard des paramètres de l'analyseur (voir <a href="/docs/fr/analyzer-overview.md#Analyzer-types">Vue d'ensemble de l'analyseur</a>)</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Composants facultatifs :</strong></p>
<ul>
<li><p><code translate="no">identifier</code> - Spécifie le moteur de détection de la langue à utiliser (<code translate="no">whatlang</code> ou <code translate="no">lingua</code>). La valeur par défaut est <code translate="no">whatlang</code> si elle n'est pas spécifiée</p></li>
<li><p><code translate="no">mapping</code> - Crée des alias personnalisés pour vos analyseurs, ce qui vous permet d'utiliser des noms descriptifs au lieu du format de sortie exact du moteur de détection.</p></li>
</ul>
<p>Le tokenizer fonctionne en détectant d'abord la langue du texte d'entrée, puis en sélectionnant l'analyseur approprié à partir de votre configuration. Si la détection échoue ou s'il n'existe pas d'analyseur correspondant, il se rabat automatiquement sur votre analyseur <code translate="no">default</code>.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">Recommandé : Correspondance directe des noms</h4><p>Les noms de vos analyseurs doivent correspondre exactement aux résultats du moteur de détection de la langue que vous avez choisi. Cette approche est plus simple et évite toute confusion potentielle.</p>
<p>Pour <code translate="no">whatlang</code> et <code translate="no">lingua</code>, utilisez les noms de langues tels qu'ils sont indiqués dans leurs documentations respectives :</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">langues supportées par whatlang</a> (utiliser la colonne<strong>"Langue</strong>")</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">lingua langues supportées</a></p></li>
</ul>
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
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">Autre approche : Noms personnalisés avec correspondance</h4><p>Si vous préférez utiliser des noms d'analyseurs personnalisés ou si vous devez maintenir la compatibilité avec des configurations existantes, vous pouvez utiliser le paramètre <code translate="no">mapping</code>. Celui-ci crée des alias pour vos analyseurs : les noms originaux du moteur de détection et vos noms personnalisés fonctionneront tous les deux.</p>
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
<p>Après avoir défini <code translate="no">analyzer_params</code>, vous pouvez les appliquer à un champ <code translate="no">VARCHAR</code> lors de la définition d'un schéma de collecte. Cela permet à Milvus de traiter le texte de ce champ à l'aide de l'analyseur spécifié pour une tokenisation et un filtrage efficaces. Pour plus de détails, voir <a href="/docs/fr/analyzer-overview.md#Example-use">Exemple d'utilisation</a>.</p>
<h2 id="Examples" class="common-anchor-header">Exemples de configuration<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Voici quelques configurations prêtes à l'emploi pour des scénarios courants. Chaque exemple comprend à la fois la configuration et le code de vérification afin que vous puissiez tester la configuration immédiatement.</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">Détection de l'anglais et du chinois<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># English: [&#x27;The&#x27;, &#x27;Milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;for&#x27;, &#x27;scale&#x27;]</span>

<span class="hljs-comment"># Chinese text  </span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># Chinese: [&#x27;Milvus&#x27;, &#x27;向量&#x27;, &#x27;数据&#x27;, &#x27;据库&#x27;, &#x27;数据库&#x27;, &#x27;专&#x27;, &#x27;为&#x27;, &#x27;大规&#x27;, &#x27;规模&#x27;, &#x27;大规模&#x27;, &#x27;应用&#x27;, &#x27;而&#x27;, &#x27;设计&#x27;]</span>
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
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
result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Notes d'utilisation<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Une seule langue par champ :</strong> Ce système fonctionne sur un champ en tant qu'unité de texte unique et homogène. Il est conçu pour traiter différentes langues dans différents enregistrements de données, par exemple un enregistrement contenant une phrase en anglais et le suivant contenant une phrase en français.</p></li>
<li><p><strong>Pas de chaînes de langues mixtes :</strong> Il <strong>n'est pas</strong> conçu pour traiter une chaîne unique contenant du texte dans plusieurs langues. Par exemple, un champ <code translate="no">VARCHAR</code> contenant à la fois une phrase anglaise et une phrase japonaise entre guillemets sera traité comme une langue unique.</p></li>
<li><p><strong>Traitement de la langue dominante :</strong> Dans les scénarios de langues mixtes, le moteur de détection identifiera probablement la langue dominante et l'analyseur correspondant sera appliqué à l'ensemble du texte. Il en résultera une tokenisation médiocre ou inexistante pour le texte étranger incorporé.</p></li>
</ul>
