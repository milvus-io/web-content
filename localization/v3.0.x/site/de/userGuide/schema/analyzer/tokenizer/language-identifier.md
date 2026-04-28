---
id: language-identifier.md
title: SprachidentifikatorCompatible with Milvus v2.5.15+
summary: >-
  Der language_identifier ist ein spezieller Tokenizer, der die
  Textsuchfunktionen von Milvus durch die Automatisierung des
  Sprachanalyseprozesses verbessern soll. Seine Hauptfunktion besteht darin, die
  Sprache eines Textfeldes zu erkennen und dann dynamisch einen
  vorkonfigurierten Analysator anzuwenden, der für diese Sprache am besten
  geeignet ist. Dies ist besonders wertvoll für Anwendungen, die mit einer
  Vielzahl von Sprachen arbeiten, da es die Notwendigkeit einer manuellen
  Sprachzuweisung für jede einzelne Eingabe eliminiert.
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
    </button></h1><p><code translate="no">language_identifier</code> ist ein spezieller Tokenizer, der die Textsuchfunktionen von Milvus durch die Automatisierung des Sprachanalyseprozesses verbessert. Seine Hauptfunktion besteht darin, die Sprache eines Textfeldes zu erkennen und dann dynamisch einen vorkonfigurierten Analysator anzuwenden, der für diese Sprache am besten geeignet ist. Dies ist besonders wertvoll für Anwendungen, die eine Vielzahl von Sprachen verarbeiten, da die manuelle Sprachzuweisung für jede einzelne Eingabe entfällt.</p>
<p>Durch die intelligente Weiterleitung von Textdaten an die entsprechende Verarbeitungspipeline rationalisiert <code translate="no">language_identifier</code> die Aufnahme mehrsprachiger Daten und gewährleistet eine genaue Tokenisierung für nachfolgende Such- und Abrufvorgänge.</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">Arbeitsablauf der Spracherkennung<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">language_identifier</code> führt eine Reihe von Schritten durch, um einen Textstring zu verarbeiten. Dieser Arbeitsablauf ist für die Benutzer entscheidend, um zu verstehen, wie er richtig konfiguriert wird.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" />
   </span> <span class="img-wrapper"> <span>Spracherkennungs-Workflow</span> </span></p>
<ol>
<li><p><strong>Eingabe:</strong> Der Arbeitsablauf beginnt mit einer Textzeichenfolge als Eingabe.</p></li>
<li><p><strong>Erkennung der Sprache:</strong> Diese Zeichenkette wird zunächst an eine Spracherkennungsmaschine weitergeleitet, die versucht, die Sprache zu identifizieren. Milvus unterstützt zwei Engines: <strong>whatlang</strong> und <strong>lingua</strong>.</p></li>
<li><p><strong>Auswahl des Analyzers:</strong></p>
<ul>
<li><p><strong>Erfolg:</strong> Wenn die Sprache erfolgreich erkannt wurde, prüft das System, ob für den erkannten Sprachnamen ein entsprechender Analyzer in Ihrem <code translate="no">analyzers</code> Wörterbuch konfiguriert ist. Wenn eine Übereinstimmung gefunden wird, wendet das System den angegebenen Analyzer auf den Eingabetext an. Zum Beispiel würde ein erkannter "Mandarin"-Text an einen <code translate="no">jieba</code> Tokenizer weitergeleitet werden.</p></li>
<li><p><strong>Fallback:</strong> Wenn die Erkennung fehlschlägt oder wenn eine Sprache erfolgreich erkannt wurde, Sie aber kein spezifisches Analyseprogramm dafür angegeben haben, verwendet das System standardmäßig ein vorkonfiguriertes <strong>Standard-Analyseprogramm</strong>. Dies ist ein wichtiger Punkt zur Klarstellung; das Analysegerät <code translate="no">default</code> ist ein Fallback sowohl für den Fall, dass die Erkennung fehlschlägt als auch für den Fall, dass kein passendes Analysegerät vorhanden ist.</p></li>
</ul></li>
</ol>
<p>Nachdem das passende Analyseprogramm ausgewählt wurde, wird der Text tokenisiert und verarbeitet, womit der Arbeitsablauf abgeschlossen ist.</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">Verfügbare Spracherkennungsprogramme<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus bietet die Wahl zwischen zwei Spracherkennungsprogrammen:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>Die Auswahl hängt von den spezifischen Leistungs- und Genauigkeitsanforderungen Ihrer Anwendung ab.</p>
<table>
   <tr>
     <th><p>Motor</p></th>
     <th><p>Geschwindigkeit</p></th>
     <th><p>Genauigkeit</p></th>
     <th><p>Ausgabeformat</p></th>
     <th><p>Am besten für</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>Schnell</p></td>
     <td><p>Gut für die meisten Sprachen</p></td>
     <td><p>Sprachennamen (z. B. <code translate="no">"English"</code>, <code translate="no">"Mandarin"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Referenz:</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">Spalte Sprache in der Tabelle der unterstützten Sprachen</a></p></td>
     <td><p>Echtzeitanwendungen, bei denen es auf Geschwindigkeit ankommt</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>Langsamer</p></td>
     <td><p>Höhere Präzision, insbesondere bei kurzen Texten</p></td>
     <td><p>Namen in englischer Sprache (z. B. <code translate="no">"English"</code>, <code translate="no">"Chinese"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Referenz:</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">Liste der unterstützten Sprachen</a></p></td>
     <td><p>Anwendungen, bei denen die Genauigkeit wichtiger ist als die Geschwindigkeit</p></td>
   </tr>
</table>
<p>Ein wichtiger Aspekt ist die Namenskonvention der Suchmaschine. Beide Suchmaschinen liefern zwar englische Sprachnamen, verwenden aber für einige Sprachen unterschiedliche Begriffe (z. B. <code translate="no">whatlang</code> liefert <code translate="no">Mandarin</code>, während <code translate="no">lingua</code> <code translate="no">Chinese</code> liefert). Der Schlüssel des Analysators muss genau mit dem Namen übereinstimmen, der von der gewählten Erkennungsmaschine zurückgegeben wird.</p>
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
    </button></h2><p>Um den <code translate="no">language_identifier</code> Tokenizer korrekt zu verwenden, müssen die folgenden Schritte durchgeführt werden, um seine Konfiguration zu definieren und anzuwenden.</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">Schritt 1: Wählen Sie Ihre Sprachen und Analysatoren<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p>Das Kernstück der Einrichtung von <code translate="no">language_identifier</code> ist die Anpassung der Analysatoren an die spezifischen Sprachen, die Sie unterstützen wollen. Das System arbeitet, indem es die erkannte Sprache mit dem richtigen Analysator abgleicht, daher ist dieser Schritt entscheidend für eine genaue Textverarbeitung.</p>
<p>Im Folgenden finden Sie eine empfohlene Zuordnung von Sprachen zu geeigneten Milvus-Analysatoren. Diese Tabelle dient als Brücke zwischen der Ausgabe der Spracherkennungsmaschine und dem besten Werkzeug für die Aufgabe.</p>
<table>
   <tr>
     <th><p>Sprache (Detektorausgabe)</p></th>
     <th><p>Empfohlener Analyzer</p></th>
     <th><p>Beschreibung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>Standard-Englisch-Tokenisierung mit Stemming und Stoppwort-Filterung.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (über whatlang) oder <code translate="no">Chinese</code> (über lingua)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>Chinesische Wortsegmentierung für nicht durch Leerzeichen getrennten Text.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>Ein robuster Tokenisierer für komplexe Skripte, einschließlich Japanisch.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>Eine benutzerdefinierte Konfiguration, die französische Akzente und Zeichen verarbeitet.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>Übereinstimmung ist der Schlüssel:</strong> Der Name Ihres Analysators <strong>muss genau mit</strong> der Sprachausgabe der Erkennungsmaschine übereinstimmen. Wenn Sie zum Beispiel <code translate="no">whatlang</code> verwenden, muss der Schlüssel für chinesischen Text <code translate="no">Mandarin</code> lauten.</p></li>
<li><p><strong>Bewährte Verfahren:</strong> Die obige Tabelle enthält empfohlene Konfigurationen für einige gängige Sprachen, ist aber keine vollständige Liste. Einen umfassenderen Leitfaden zur Auswahl von Analysatoren finden Sie unter <a href="/docs/de/choose-the-right-analyzer-for-your-use-case.md">Wählen Sie den richtigen Analysator für Ihren Anwendungsfall</a>.</p></li>
<li><p><strong>Ausgabe des Detektors</strong>: Eine vollständige Liste der Sprachnamen, die von den Erkennungsmodulen zurückgegeben werden, finden Sie in der <a href="https://github.com/greyblake/whatlang-rs">Tabelle der von Whatlang unterstützten Sprachen</a> und in der <a href="https://github.com/pemistahl/lingua-rs">Liste der von Lingua unterstützten Sprachen</a>.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">Schritt 2: Definieren Sie analyzer_params<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Um den <code translate="no">language_identifier</code> Tokenizer in Milvus zu verwenden, erstellen Sie ein Wörterbuch mit diesen Schlüsselkomponenten:</p>
<p><strong>Erforderliche Komponenten:</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> config set - Ein Wörterbuch, das alle Analyzer-Konfigurationen enthält, die enthalten müssen:</p>
<ul>
<li><p><code translate="no">default</code> - Den Fallback-Analyzer, der verwendet wird, wenn die Spracherkennung fehlschlägt oder kein passender Analyzer gefunden wird</p></li>
<li><p><strong>Sprachspezifische Analyzer</strong> - Jeder definiert als <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code>, wobei:</p>
<ul>
<li><p><code translate="no">analyzer_name</code> mit der Ausgabe der gewählten Erkennungsmaschine übereinstimmt (z. B. <code translate="no">&quot;English&quot;</code>, <code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> dem Standard-Analyzer-Parameterformat folgt (siehe <a href="/docs/de/analyzer-overview.md#Analyzer-types">Analyzer-Übersicht</a>)</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Optionale Komponenten:</strong></p>
<ul>
<li><p><code translate="no">identifier</code> - Gibt an, welches Spracherkennungsmodul verwendet werden soll (<code translate="no">whatlang</code> oder <code translate="no">lingua</code>). Standardmäßig wird <code translate="no">whatlang</code> verwendet, wenn nichts angegeben wird.</p></li>
<li><p><code translate="no">mapping</code> - Erstellt benutzerdefinierte Aliase für Ihre Analyzer, die es Ihnen ermöglichen, beschreibende Namen anstelle des genauen Ausgabeformats der Erkennungsmaschine zu verwenden</p></li>
</ul>
<p>Der Tokenizer erkennt zunächst die Sprache des Eingabetextes und wählt dann das entsprechende Analyseprogramm aus Ihrer Konfiguration aus. Wenn die Erkennung fehlschlägt oder kein passender Analyzer vorhanden ist, wird automatisch auf Ihren <code translate="no">default</code> Analyzer zurückgegriffen.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">Empfohlen: Direkter Namensabgleich</h4><p>Die Namen Ihrer Analysatoren sollten genau mit der Ausgabe des von Ihnen gewählten Spracherkennungsprogramms übereinstimmen. Dieser Ansatz ist einfacher und vermeidet mögliche Verwechslungen.</p>
<p>Verwenden Sie sowohl für <code translate="no">whatlang</code> als auch für <code translate="no">lingua</code> die Sprachnamen, wie sie in der jeweiligen Dokumentation angegeben sind:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">whatlang unterstützte Sprachen</a> (verwenden Sie die Spalte<strong>"Sprache</strong>")</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">lingua unterstützte Sprachen</a></p></li>
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
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">Alternative Vorgehensweise: Benutzerdefinierte Namen mit Mapping</h4><p>Wenn Sie es vorziehen, benutzerdefinierte Analyzernamen zu verwenden oder die Kompatibilität mit bestehenden Konfigurationen aufrechtzuerhalten, können Sie den Parameter <code translate="no">mapping</code> verwenden. Dadurch werden Aliase für Ihre Analysatoren erstellt - sowohl die ursprünglichen Namen der Erkennungsmaschine als auch Ihre benutzerdefinierten Namen werden funktionieren.</p>
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
<p>Nachdem Sie <code translate="no">analyzer_params</code> definiert haben, können Sie sie bei der Definition eines Sammelschemas auf ein <code translate="no">VARCHAR</code> Feld anwenden. Dadurch kann Milvus den Text in diesem Feld unter Verwendung des angegebenen Analysators für eine effiziente Tokenisierung und Filterung verarbeiten. Details finden Sie im Abschnitt <a href="/docs/de/analyzer-overview.md#Example-use">Beispielanwendung</a>.</p>
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
    </button></h2><p>Hier finden Sie einige gebrauchsfertige Konfigurationen für gängige Szenarien. Jedes Beispiel enthält sowohl die Konfiguration als auch den Verifizierungscode, damit Sie die Einrichtung sofort testen können.</p>
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
<li><p><strong>Eine Sprache pro Feld:</strong> Ein Feld wird als eine einzige, homogene Texteinheit betrachtet. Sie ist so konzipiert, dass sie verschiedene Sprachen in verschiedenen Datensätzen verarbeiten kann, z. B. wenn ein Datensatz einen englischen Satz und der nächste einen französischen Satz enthält.</p></li>
<li><p><strong>Keine gemischtsprachigen Zeichenketten:</strong> Es ist <strong>nicht</strong> dafür ausgelegt, eine einzelne Zeichenfolge zu verarbeiten, die Text in mehreren Sprachen enthält. So wird beispielsweise ein einzelnes Feld <code translate="no">VARCHAR</code>, das sowohl einen englischen Satz als auch eine japanische Phrase in Anführungszeichen enthält, als eine einzige Sprache verarbeitet.</p></li>
<li><p><strong>Verarbeitung der dominanten Sprache:</strong> In gemischtsprachigen Szenarien wird die Erkennungsmaschine wahrscheinlich die dominante Sprache identifizieren, und der entsprechende Analysator wird auf den gesamten Text angewendet. Dies führt dazu, dass der eingebettete Fremdtext nur unzureichend oder gar nicht tokenisiert wird.</p></li>
</ul>
