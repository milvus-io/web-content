---
id: language-identifier.md
title: SprachidentifikatorCompatible with Milvus v2.5.15+
summary: >-
  Der „language_identifier“ ist ein spezieller Tokenizer, der entwickelt wurde,
  um die Text-Suchfunktionen von Milvus durch die Automatisierung des
  Sprachanalyseprozesses zu verbessern. Seine Hauptfunktion besteht darin, die
  Sprache eines Textfeldes zu erkennen und anschließend dynamisch einen
  vorkonfigurierten Analysator anzuwenden, der für diese Sprache am besten
  geeignet ist. Dies ist besonders wertvoll für Anwendungen, die eine Vielzahl
  von Sprachen verarbeiten, da dadurch die manuelle Zuordnung der Sprache für
  jede einzelne Eingabe entfällt.
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">Sprachidentifikator<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p>Der „ <code translate="no">language_identifier</code> “ ist ein spezieller Tokenizer, der entwickelt wurde, um die Textsuchfunktionen von Milvus durch die Automatisierung der Sprachanalyse zu verbessern. Seine Hauptfunktion besteht darin, die Sprache eines Textfeldes zu erkennen und anschließend dynamisch einen vorkonfigurierten Analysator anzuwenden, der für diese Sprache am besten geeignet ist. Dies ist besonders wertvoll für Anwendungen, die eine Vielzahl von Sprachen verarbeiten, da dadurch die manuelle Zuordnung der Sprache für jede einzelne Eingabe entfällt.</p>
<p>Durch die intelligente Weiterleitung von Textdaten an die entsprechende Verarbeitungspipeline optimiert der „ <code translate="no">language_identifier</code> “ die mehrsprachige Datenerfassung und gewährleistet eine präzise Tokenisierung für nachfolgende Such- und Abrufvorgänge.</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">Workflow zur Spracherkennung<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>Der „ <code translate="no">language_identifier</code> “ führt eine Reihe von Schritten zur Verarbeitung einer Textzeichenfolge durch – ein Workflow, dessen Verständnis für die korrekte Konfiguration durch den Benutzer von entscheidender Bedeutung ist.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" /> 
   <span>Workflow zur Spracherkennung</span>
  
 </span></p>
<ol>
<li><p><strong>Eingabe:</strong> Der Workflow beginnt mit einer Textzeichenfolge als Eingabe.</p></li>
<li><p><strong>Sprachenerkennung:</strong> Diese Zeichenfolge wird zunächst an eine Sprachenerkennungs-Engine weitergeleitet, die versucht, die Sprache zu identifizieren. Milvus unterstützt zwei Engines: <strong>„whatlang“</strong> und <strong>„lingua</strong>“.</p></li>
<li><p><strong>Auswahl des Analysators:</strong></p>
<ul>
<li><p><strong>Erfolg:</strong> Wird die Sprache erfolgreich erkannt, prüft das System, ob für den Namen der erkannten Sprache ein entsprechender Analysator in Ihrem „ <code translate="no">analyzers</code> “-Wörterbuch konfiguriert ist. Wird eine Übereinstimmung gefunden, wendet das System den angegebenen Analysator auf den Eingabetext an. So würde beispielsweise ein als „Mandarin“ erkannter Text an einen „ <code translate="no">jieba</code> “-Tokenizer weitergeleitet werden.</p></li>
<li><p><strong>Fallback:</strong> Wenn die Erkennung fehlschlägt oder wenn eine Sprache zwar erfolgreich erkannt wurde, Sie jedoch keinen spezifischen Analysator dafür bereitgestellt haben, greift das System standardmäßig auf einen vorkonfigurierten <strong>Standardanalysator</strong> zurück. Dies ist ein entscheidender Punkt, der klargestellt werden muss: Der Analysator „ <code translate="no">default</code> “ dient sowohl als Fallback bei fehlgeschlagener Erkennung als auch beim Fehlen eines passenden Analysators.</p></li>
</ul></li>
</ol>
<p>Nachdem der geeignete Analysator ausgewählt wurde, wird der Text tokenisiert und verarbeitet, womit der Workflow abgeschlossen ist.</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">Verfügbare Engines zur Spracherkennung<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus bietet die Wahl zwischen zwei Erkennungsmodulen:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>Die Auswahl hängt von den spezifischen Anforderungen Ihrer Anwendung hinsichtlich Leistung und Genauigkeit ab.</p>
<table>
   <tr>
     <th><p>Engine</p></th>
     <th><p>Geschwindigkeit</p></th>
     <th><p>Genauigkeit</p></th>
     <th><p>Ausgabeformat</p></th>
     <th><p>Am besten geeignet für</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>Schnell</p></td>
     <td><p>Gut für die meisten Sprachen</p></td>
     <td><p>Sprachnamen (z. B. <code translate="no">"English"</code>, <code translate="no">"Mandarin"</code> , <code translate="no">"Japanese"</code>)</p><p><strong>Referenz:</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">Spalte „Sprache“ in der Tabelle der unterstützten Sprachen</a></p></td>
     <td><p>Echtzeitanwendungen, bei denen Geschwindigkeit entscheidend ist</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>Langsamer</p></td>
     <td><p>Höhere Genauigkeit, insbesondere bei kurzen Texten</p></td>
     <td><p>Englische Sprachbezeichnungen (z. B. <code translate="no">"English"</code>, <code translate="no">"Chinese"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Referenz:</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">Liste der unterstützten Sprachen</a></p></td>
     <td><p>Anwendungen, bei denen Genauigkeit wichtiger ist als Geschwindigkeit</p></td>
   </tr>
</table>
<p>Ein wichtiger Aspekt ist die Namenskonvention der Engine. Zwar geben beide Engines die Sprachnamen auf Englisch zurück, verwenden jedoch für einige Sprachen unterschiedliche Bezeichnungen (z. B. gibt „ <code translate="no">whatlang</code> “ „ <code translate="no">Mandarin</code> “ zurück, während „ <code translate="no">lingua</code> “ „ <code translate="no">Chinese</code> “ zurückgibt). Der Schlüssel des Analysators muss exakt mit dem Namen übereinstimmen, der von der gewählten Erkennungs-Engine zurückgegeben wird.</p>
<h2 id="Configuration" class="common-anchor-header">Konfiguration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Um den Tokenizer „ <code translate="no">language_identifier</code> “ korrekt zu verwenden, müssen die folgenden Schritte durchgeführt werden, um dessen Konfiguration zu definieren und anzuwenden.</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">Schritt 1: Wählen Sie Ihre Sprachen und Analysatoren aus<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Kern der Einrichtung des „ <code translate="no">language_identifier</code> “ besteht darin, Ihre Analysatoren auf die spezifischen Sprachen abzustimmen, die Sie unterstützen möchten. Das System ordnet die erkannte Sprache dem richtigen Analysator zu, daher ist dieser Schritt entscheidend für eine genaue Textverarbeitung.</p>
<p>Nachfolgend finden Sie eine empfohlene Zuordnung von Sprachen zu geeigneten Milvus-Analysatoren. Diese Tabelle dient als Brücke zwischen der Ausgabe der Spracherkennungs-Engine und dem für die jeweilige Aufgabe am besten geeigneten Tool.</p>
<table>
   <tr>
     <th><p>Sprache (Ergebnis der Spracherkennung)</p></th>
     <th><p>Empfohlener Analysator</p></th>
     <th><p>Beschreibung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>Standardmäßige Tokenisierung des Englischen mit Stemming und Stop-Word-Filterung.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (über „whatlang“) oder „ <code translate="no">Chinese</code> “ (über „lingua“)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>Chinesische Wortsegmentierung für Text ohne Leerzeichen als Trennzeichen.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>Ein robuster Tokenizer für komplexe Schriftsysteme, einschließlich Japanisch.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>Eine benutzerdefinierte Konfiguration, die französische Akzente und Sonderzeichen berücksichtigt.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>Die Übereinstimmung ist entscheidend:</strong> Der Name Ihres Analysators <strong>muss genau mit</strong> der Sprachausgabe der Erkennungs-Engine <strong>übereinstimmen</strong>. Wenn Sie beispielsweise „ <code translate="no">whatlang</code> “ verwenden, muss der Schlüssel für chinesischen Text „ <code translate="no">Mandarin</code> “ lauten.</p></li>
<li><p><strong>Bewährte Vorgehensweisen:</strong> Die obige Tabelle enthält empfohlene Konfigurationen für einige gängige Sprachen, stellt jedoch keine vollständige Liste dar. Eine umfassendere Anleitung zur Auswahl von Analysatoren finden Sie unter <a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md">„Wählen Sie den richtigen Analysator für Ihren Anwendungsfall</a>“.</p></li>
<li><p><strong>Erkennungsergebnis</strong>: Eine vollständige Liste der von den Erkennungsmodulen zurückgegebenen Sprachbezeichnungen finden Sie in <a href="https://github.com/greyblake/whatlang-rs">der Tabelle der von Whatlang unterstützten Sprachen</a> und in <a href="https://github.com/pemistahl/lingua-rs">der Liste der von Lingua unterstützten Sprachen</a>.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">Schritt 2: „analyzer_params“ definieren<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Um den Tokenizer „ <code translate="no">language_identifier</code> “ in Milvus zu verwenden, erstellen Sie ein Wörterbuch, das folgende Schlüsselkomponenten enthält:</p>
<p><strong>Erforderliche Komponenten:</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> „config set“ – Ein Wörterbuch, das alle Analysator-Konfigurationen enthält und Folgendes umfassen muss:</p>
<ul>
<li><p><code translate="no">default</code> – Den Fallback-Analysator, der verwendet wird, wenn die Spracherkennung fehlschlägt oder kein passender Analysator gefunden wird</p></li>
<li><p><strong>Sprachspezifische Analysatoren</strong> – Jeder wird als „ <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code> “ definiert, wobei:</p>
<ul>
<li><p><code translate="no">analyzer_name</code> der Ausgabe Ihrer gewählten Erkennungs-Engine entspricht (z. B. ` <code translate="no">&quot;English&quot;</code>`, ` <code translate="no">&quot;Japanese&quot;</code>`)</p></li>
<li><p><code translate="no">analyzer_config</code> dem Standardformat für Analysatorparameter entspricht (siehe <a href="/docs/de/analyzer-overview.md#Analyzer-types">„Analysator-Übersicht“</a>)</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Optionale Komponenten:</strong></p>
<ul>
<li><p><code translate="no">identifier</code> – Legt fest, welche Spracherkennungs-Engine verwendet werden soll (<code translate="no">whatlang</code> oder <code translate="no">lingua</code>). Standardmäßig wird <code translate="no">whatlang</code> verwendet, sofern keine Angabe erfolgt</p></li>
<li><p><code translate="no">mapping</code> – Erstellt benutzerdefinierte Aliase für Ihre Analysatoren, sodass Sie beschreibende Namen anstelle des exakten Ausgabeformats der Erkennungs-Engine verwenden können</p></li>
</ul>
<p>Der Tokenizer ermittelt zunächst die Sprache des Eingabetextes und wählt dann den entsprechenden Analysator aus Ihrer Konfiguration aus. Wenn die Erkennung fehlschlägt oder kein passender Analysator vorhanden ist, greift er automatisch auf Ihren „ <code translate="no">default</code> “-Analysator zurück.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">Empfohlen: Direkter Namensabgleich</h4><p>Die Namen Ihrer Analysatoren sollten exakt mit der Ausgabe der von Ihnen gewählten Spracherkennungs-Engine übereinstimmen. Dieser Ansatz ist einfacher und vermeidet mögliche Verwechslungen.</p>
<p>Verwenden Sie sowohl für „ <code translate="no">whatlang</code> “ als auch für „ <code translate="no">lingua</code> “ die in der jeweiligen Dokumentation angegebenen Sprachnamen:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">Von „whatlang“ unterstützte Sprachen</a> (verwenden Sie die Spalte<strong>„Sprache</strong>“)</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">Von „lingua“ unterstützte Sprachen</a></p></li>
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
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">Alternativer Ansatz: Benutzerdefinierte Namen mit Zuordnung</h4><p>Wenn Sie lieber benutzerdefinierte Analysatornamen verwenden möchten oder die Kompatibilität mit bestehenden Konfigurationen gewährleisten müssen, können Sie den Parameter „ <code translate="no">mapping</code> “ verwenden. Dadurch werden Aliase für Ihre Analysatoren erstellt – sowohl die ursprünglichen Namen der Erkennungs-Engines als auch Ihre benutzerdefinierten Namen funktionieren.</p>
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
<p>Nachdem Sie ` <code translate="no">analyzer_params</code>` definiert haben, können Sie diese bei der Definition eines Erfassungsschemas auf ein Feld vom Typ „ <code translate="no">VARCHAR</code> “ anwenden. Dadurch kann Milvus den Text in diesem Feld mit dem angegebenen Analysator verarbeiten, um eine effiziente Tokenisierung und Filterung zu gewährleisten. Weitere Informationen finden Sie unter <a href="/docs/de/analyzer-overview.md#Example-use">„Anwendungsbeispiel</a>“.</p>
<h2 id="Examples" class="common-anchor-header">Beispiele<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Hier finden Sie einige gebrauchsfertige Konfigurationen für gängige Szenarien. Jedes Beispiel enthält sowohl den Konfigurations- als auch den Verifizierungscode, sodass Sie die Einrichtung sofort testen können.</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">Erkennung von Englisch und Chinesisch<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">Europäische Sprachen mit Akzentnormalisierung<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
<h3 id="Expected-output" class="common-anchor-header">Erwartete Ausgabe<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><p>Das obige Beispiel für europäische Sprachen erzeugt die folgenden Token in der angegebenen Reihenfolge. Die SDK-Antwortobjekte und die Ausgabeformatierung variieren je nach Sprache; die REST-Antwort enthält diese Token unter <code translate="no">data.results[].tokens[].token</code>. Die Token-Sequenz für das Beispiel zur Erkennung von Englisch und Chinesisch hängt davon ab, welchen Analysator der Detektor für jede Eingabe auswählt, daher wird sie hier nicht wiedergegeben.</p>
<pre><code translate="no" class="language-plaintext">French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Hinweise zur Verwendung<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Eine Sprache pro Feld:</strong> Das Tool behandelt ein Feld als einzelne, homogene Texteinheit. Es ist dafür ausgelegt, unterschiedliche Sprachen in verschiedenen Datensätzen zu verarbeiten, beispielsweise wenn ein Datensatz einen englischen Satz und der nächste einen französischen Satz enthält.</p></li>
<li><p><strong>Keine mehrsprachigen Zeichenfolgen:</strong> Das Tool ist <strong>nicht</strong> dafür ausgelegt, eine einzelne Zeichenfolge zu verarbeiten, die Text aus mehreren Sprachen enthält. Beispielsweise wird ein einzelnes Feld unter <code translate="no">VARCHAR</code>, das sowohl einen englischen Satz als auch eine zitierte japanische Phrase enthält, als eine einzige Sprache verarbeitet.</p></li>
<li><p><strong>Verarbeitung der dominanten Sprache:</strong> In Szenarien mit gemischten Sprachen identifiziert die Erkennungs-Engine wahrscheinlich die dominante Sprache, und der entsprechende Analysator wird auf den gesamten Text angewendet. Dies führt zu einer schlechten oder gar keiner Tokenisierung des eingebetteten fremdsprachigen Textes.</p></li>
</ul>
