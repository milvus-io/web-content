---
id: schema-hands-on.md
title: Entwurf von Datenmodellen für die Suche
summary: >-
  Informationsabrufsysteme, auch als Suchmaschinen bekannt, sind für
  verschiedene KI-Anwendungen wie „Retrieval-Augmented Generation“ (RAG),
  visuelle Suche und Produktempfehlungen unverzichtbar. Das Herzstück dieser
  Systeme bildet ein sorgfältig konzipiertes Datenmodell zur Organisation,
  Indizierung und Abfrage der Informationen.
---
<h1 id="Data-Model-Design-for-Search" class="common-anchor-header">Entwurf von Datenmodellen für die Suche<button data-href="#Data-Model-Design-for-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Informationsabrufsysteme, auch als Suchmaschinen bekannt, sind für verschiedene KI-Anwendungen wie Retrieval-Augmented Generation (RAG), visuelle Suche und Produktempfehlungen unverzichtbar. Das Herzstück dieser Systeme bildet ein sorgfältig entworfenes Datenmodell zur Organisation, Indizierung und Abfrage der Informationen.</p>
<p>Mit Milvus können Sie das Suchdatenmodell über ein Sammlungsschema festlegen, das unstrukturierte Daten, deren dichte oder spärliche Vektordarstellungen sowie strukturierte Metadaten organisiert. Ganz gleich, ob Sie mit Text, Bildern oder anderen Datentypen arbeiten – dieser praktische Leitfaden hilft Ihnen dabei, wichtige Schemakonzepte zu verstehen und anzuwenden, um ein Suchdatenmodell in der Praxis zu entwerfen.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data-model-anatomy.png" alt="Data Model Anatomy" class="doc-image" id="data-model-anatomy" /> 
   <span>Aufbau des Datenmodells</span>
  
 </span></p>
<h2 id="Data-Model" class="common-anchor-header">Datenmodell<button data-href="#Data-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Entwurf des Datenmodells eines Suchsystems umfasst die Analyse der geschäftlichen Anforderungen und die Abstraktion von Informationen in ein schemabasiertes Datenmodell. Ein klar definiertes Schema ist wichtig, um das Datenmodell auf die geschäftlichen Ziele abzustimmen und die Datenkonsistenz sowie die Servicequalität sicherzustellen. Darüber hinaus ist die Auswahl geeigneter Datentypen und Indizes entscheidend, um das Geschäftsziel kosteneffizient zu erreichen.</p>
<h3 id="Analyzing-Business-Needs" class="common-anchor-header">Analyse der geschäftlichen Anforderungen<button data-href="#Analyzing-Business-Needs" class="anchor-icon" translate="no">
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
    </button></h3><p>Die effektive Erfüllung geschäftlicher Anforderungen beginnt mit der Analyse der Arten von Abfragen, die Benutzer durchführen werden, und der Ermittlung der am besten geeigneten Suchmethoden.</p>
<ul>
<li><p><strong>Benutzerabfragen:</strong> Ermitteln Sie die Arten von Abfragen, die Benutzer voraussichtlich durchführen werden. Dies trägt dazu bei, sicherzustellen, dass Ihr Schema reale Anwendungsfälle unterstützt und die Suchleistung optimiert. Dazu können gehören:</p>
<ul>
<li><p>Abrufen von Dokumenten, die einer Abfrage in natürlicher Sprache entsprechen</p></li>
<li><p>Das Finden von Bildern, die einem Referenzbild ähneln oder einer Textbeschreibung entsprechen</p></li>
<li><p>Suche nach Produkten anhand von Attributen wie Name, Kategorie oder Marke</p></li>
<li><p>Filtern von Elementen anhand strukturierter Metadaten (z. B. Veröffentlichungsdatum, Tags, Bewertungen)</p></li>
<li><p>Kombination mehrerer Kriterien in hybriden Suchanfragen (z. B. bei der visuellen Suche unter Berücksichtigung der semantischen Ähnlichkeit sowohl der Bilder als auch ihrer Bildunterschriften)</p></li>
</ul></li>
<li><p><strong>Suchmethoden:</strong> Wählen Sie die geeigneten Suchtechniken aus, die zu den Arten von Suchanfragen passen, die Ihre Nutzer stellen werden. Verschiedene Methoden dienen unterschiedlichen Zwecken und lassen sich oft kombinieren, um leistungsfähigere Ergebnisse zu erzielen:</p>
<ul>
<li><p><strong>Semantische Suche</strong>: Nutzt die Ähnlichkeit dichter Vektoren, um Elemente mit ähnlicher Bedeutung zu finden; ideal für unstrukturierte Daten wie Text oder Bilder.</p></li>
<li><p><strong>Volltextsuche</strong>: Ergänzt die semantische Suche durch den Abgleich von Schlüsselwörtern. Die Volltextsuche kann lexikalische Analysen nutzen, um zu vermeiden, dass lange Wörter in einzelne Token zerlegt werden, und so Fachbegriffe bei der Suche zu erfassen.</p></li>
<li><p><strong>Metadatenfilterung</strong>: Zusätzlich zur Vektorsuche werden Einschränkungen wie Datumsbereiche, Kategorien oder Tags angewendet.</p></li>
</ul></li>
</ul>
<h3 id="Translates-Business-Requirements-into-a-Search-Data-Model" class="common-anchor-header">Umsetzung der Geschäftsanforderungen in ein Suchdatenmodell<button data-href="#Translates-Business-Requirements-into-a-Search-Data-Model" class="anchor-icon" translate="no">
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
    </button></h3><p>Der nächste Schritt besteht darin, Ihre geschäftlichen Anforderungen in ein konkretes Datenmodell zu übersetzen, indem Sie die Kernkomponenten Ihrer Informationen und deren Suchmethoden identifizieren:</p>
<ul>
<li><p>Definieren Sie die Daten, die Sie speichern müssen, wie z. B. Rohinhalte (Text, Bilder, Audio), zugehörige Metadaten (Titel, Tags, Urheberschaft) und kontextbezogene Attribute (Zeitstempel, Nutzerverhalten usw.)</p></li>
<li><p>Legen Sie für jedes Element die geeigneten Datentypen und Formate fest. Zum Beispiel:</p>
<ul>
<li><p>Textbeschreibungen → Zeichenfolge</p></li>
<li><p>Bild- oder Dokument-Embeddings → dichte oder spärliche Vektoren</p></li>
<li><p>Kategorien, Tags oder Kennzeichnungen → Zeichenkette, Array und Boolescher Wert</p></li>
<li><p>Numerische Attribute wie Preis oder Bewertung → Ganzzahl oder Gleitkomma</p></li>
<li><p>Strukturierte Informationen wie Autorenangaben → JSON</p></li>
</ul></li>
</ul>
<p>Eine klare Definition dieser Elemente gewährleistet Datenkonsistenz, präzise Suchergebnisse und eine einfache Integration in nachgelagerte Anwendungslogiken.</p>
<h2 id="Schema-Design" class="common-anchor-header">Schema-Design<button data-href="#Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus wird das Datenmodell durch ein Sammlungsschema ausgedrückt. Die Gestaltung der richtigen Felder innerhalb eines Sammlungsschemas ist entscheidend für eine effektive Datenabfrage. Jedes Feld definiert einen bestimmten Datentyp, der in der Sammlung gespeichert ist, und spielt eine spezifische Rolle im Suchprozess. Auf hoher Ebene unterstützt Milvus zwei Haupttypen von Feldern: <strong>Vektorfelder</strong> und <strong>Skalarfelder</strong>.</p>
<p>Nun können Sie Ihr Datenmodell auf ein Schema aus Feldern abbilden, einschließlich Vektoren und etwaiger zusätzlicher Skalarfelder. Stellen Sie sicher, dass jedes Feld mit den Attributen Ihres Datenmodells korreliert, und achten Sie dabei besonders auf Ihren Vektortyp (dicht oder spärlich) und dessen Dimension.</p>
<h3 id="Vector-Field" class="common-anchor-header">Vektorfeld<button data-href="#Vector-Field" class="anchor-icon" translate="no">
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
    </button></h3><p>Vektorfelder speichern Einbettungen für unstrukturierte Datentypen wie Text, Bilder und Audio. Diese Einbettungen können je nach Datentyp und verwendeter Abfragemethode dicht, spärlich oder binär sein. In der Regel werden dichte Vektoren für die semantische Suche verwendet, während spärliche Vektoren besser für Volltext- oder lexikalische Übereinstimmungen geeignet sind. Binäre Vektoren sind nützlich, wenn Speicher- und Rechenressourcen begrenzt sind. Eine Sammlung kann mehrere Vektorfelder enthalten, um multimodale oder hybride Abrufstrategien zu ermöglichen. Eine ausführliche Anleitung zu diesem Thema finden Sie unter <a href="/docs/de/multi-vector-search.md">„Multi-Vektor-Hybridsuche</a>“.</p>
<p>Milvus unterstützt die folgenden Vektordatentypen: <code translate="no">FLOAT_VECTOR</code> für <a href="/docs/de/dense-vector.md">dichte Vektoren</a>, <code translate="no">SPARSE_FLOAT_VECTOR</code> für <a href="/docs/de/sparse_vector.md">spärliche Vektoren</a> und <code translate="no">BINARY_VECTOR</code> für <a href="/docs/de/binary-vector.md">binäre Vektoren</a></p>
<h3 id="Scalar-Field" class="common-anchor-header">Skalarfeld<button data-href="#Scalar-Field" class="anchor-icon" translate="no">
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
    </button></h3><p>Skalarfelder speichern primitive, strukturierte Werte – gemeinhin als Metadaten bezeichnet –, wie beispielsweise Zahlen, Zeichenfolgen oder Datumsangaben. Diese Werte können zusammen mit den Vektorsuchergebnissen zurückgegeben werden und sind für das Filtern und Sortieren unerlässlich. Sie ermöglichen es Ihnen, Suchergebnisse anhand bestimmter Attribute einzugrenzen, beispielsweise durch die Beschränkung von Dokumenten auf eine bestimmte Kategorie oder einen definierten Zeitbereich.</p>
<p>Milvus unterstützt Skalartypen wie „ <code translate="no">BOOL</code> “, „ <code translate="no">INT8/16/32/64</code> “, „ <code translate="no">FLOAT</code> “, „ <code translate="no">DOUBLE</code> “, „ <code translate="no">VARCHAR</code> “, „ <code translate="no">JSON</code> “ und „ <code translate="no">ARRAY</code> “ zum Speichern und Filtern von Nicht-Vektordaten. Diese Typen verbessern die Präzision und Anpassbarkeit von Suchvorgängen.</p>
<h2 id="Leverage-Advanced-Features-in-Schema-Design" class="common-anchor-header">Nutzen Sie erweiterte Funktionen beim Schema-Design<button data-href="#Leverage-Advanced-Features-in-Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>Beim Entwerfen eines Schemas reicht es nicht aus, Ihre Daten einfach mithilfe der unterstützten Datentypen den Feldern zuzuordnen. Es ist unerlässlich, die Beziehungen zwischen den Feldern und die verfügbaren Konfigurationsstrategien gründlich zu verstehen. Wenn Sie wichtige Funktionen bereits in der Entwurfsphase berücksichtigen, stellen Sie sicher, dass das Schema nicht nur die unmittelbaren Anforderungen an die Datenverarbeitung erfüllt, sondern auch skalierbar und an zukünftige Bedürfnisse anpassbar ist. Durch die sorgfältige Integration dieser Funktionen können Sie eine robuste Datenarchitektur aufbauen, die die Fähigkeiten von Milvus maximiert und Ihre übergeordnete Datenstrategie sowie Ihre Ziele unterstützt. Hier finden Sie einen Überblick über die wichtigsten Funktionen beim Erstellen eines Sammlungsschemas:</p>
<h3 id="Primary-Key" class="common-anchor-header">Primärschlüssel<button data-href="#Primary-Key" class="anchor-icon" translate="no">
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
    </button></h3><p>Ein Primärschlüsselfeld ist ein grundlegender Bestandteil eines Schemas, da es jede Entität innerhalb einer Sammlung eindeutig identifiziert. Die Definition eines Primärschlüssels ist obligatorisch. Es muss sich um ein skalares Feld vom Typ „Integer“ oder „String“ handeln, das als „ <code translate="no">is_primary=True</code> “ gekennzeichnet ist. Optional können Sie für den Primärschlüssel die automatische ID-Zuweisung ( <code translate="no">auto_id</code> ) aktivieren, wodurch automatisch ganzzahlige Nummern zugewiesen werden, die monolithisch ansteigen, je mehr Daten in die Sammlung aufgenommen werden.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/primary-field.md">„Primärfeld &amp; AutoID</a>“.</p>
<h3 id="Partitioning" class="common-anchor-header">Partitionierung<button data-href="#Partitioning" class="anchor-icon" translate="no">
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
    </button></h3><p>Um die Suche zu beschleunigen, können Sie optional die Partitionierung aktivieren. Indem Sie ein bestimmtes Skalarfeld für die Partitionierung festlegen und bei der Suche Filterkriterien auf Basis dieses Feldes angeben, lässt sich der Suchbereich effektiv auf die relevanten Partitionen beschränken. Diese Methode steigert die Effizienz von Abrufvorgängen erheblich, indem sie den Suchbereich einschränkt.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/use-partition-key.md">„Partitionsschlüssel verwenden</a>“.</p>
<h3 id="Analyzer" class="common-anchor-header">Analysator<button data-href="#Analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Ein Analyzer ist ein unverzichtbares Werkzeug zur Verarbeitung und Transformation von Textdaten. Seine Hauptfunktion besteht darin, Rohtext in Token umzuwandeln und diese für die Indizierung und den Abruf zu strukturieren. Dazu tokenisiert er die Zeichenfolge, entfernt Stoppwörter und führt für die einzelnen Wörter eine Wortstammbildung durch, um sie in Token umzuwandeln.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/analyzer-overview.md">„Übersicht über den Analyzer</a>“.</p>
<h3 id="Function" class="common-anchor-header">Funktion<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Mit Milvus können Sie integrierte Funktionen als Teil des Schemas definieren, um bestimmte Felder automatisch abzuleiten. So können Sie beispielsweise eine integrierte BM25-Funktion hinzufügen, die aus einem Feld vom Typ „ <code translate="no">VARCHAR</code> “ einen Sparse-Vektor generiert, um die Volltextsuche zu unterstützen. Diese aus Funktionen abgeleiteten Felder optimieren die Vorverarbeitung und stellen sicher, dass die Sammlung in sich geschlossen und abfragebereit bleibt.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/full-text-search.md">„Volltextsuche</a>“.</p>
<h2 id="A-Real-World-Example" class="common-anchor-header">Ein Beispiel aus der Praxis<button data-href="#A-Real-World-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Abschnitt werden wir den Schemaaufbau und ein Code-Beispiel für eine Suchanwendung für Multimedia-Dokumente skizzieren, die im obigen Diagramm dargestellt ist. Dieses Schema ist für die Verwaltung eines Datensatzes konzipiert, der Artikel mit einer Datenzuordnung zu den folgenden Feldern enthält:</p>
<table>
   <tr>
     <th><p><strong>Feld</strong></p></th>
     <th><p><strong>Datenquelle</strong></p></th>
     <th><p><strong>Verwendet von Suchmethoden</strong></p></th>
     <th><p><strong>Primärschlüssel</strong></p></th>
     <th><p><strong>Partitionsschlüssel</strong></p></th>
     <th><p><strong>Analysator</strong></p></th>
     <th><p><strong>Funktionseingabe/-ausgabe</strong></p></th>
   </tr>
   <tr>
     <td><p>article_id (<code translate="no">INT64</code>)</p></td>
     <td><p>wird automatisch generiert, wenn <code translate="no">auto_id</code></p></td>
     <td><p><a href="/docs/de/get-and-scalar-query.md">Abfrage mit Get</a></p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>Titel (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>Artikel-Titel</p></td>
     <td><p><a href="/docs/de/keyword-match.md">Textübereinstimmung</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>Zeitstempel (<code translate="no">INT32</code>)</p></td>
     <td><p>Veröffentlichungsdatum</p></td>
     <td><p><a href="/docs/de/use-partition-key.md">Nach Partitionsschlüssel filtern</a></p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>Text (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>Rohtext des Artikels</p></td>
     <td><p><a href="/docs/de/multi-vector-search.md">Multi-Vektor-Hybridsuche</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>Eingabe</p></td>
   </tr>
   <tr>
     <td><p>text_dense_vector (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>dichter Vektor, der von einem Text-Embedding-Modell generiert wurde</p></td>
     <td><p><a href="/docs/de/single-vector-search.md">Einfache Vektorsuche</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>text_sparse_vector (<code translate="no">SPARSE_FLOAT_VECTOR</code>)</p></td>
     <td><p>durch eine integrierte BM25-Funktion automatisch generierter spärlicher Vektor</p></td>
     <td><p><a href="/docs/de/full-text-search.md">Volltextsuche</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Ausgabe</p></td>
   </tr>
</table>
<p>Weitere Informationen zu Schemata und eine detaillierte Anleitung zum Hinzufügen verschiedener Feldtypen finden Sie unter <a href="/docs/de/schema.md">„Schema erklärt</a>“.</p>
<h3 id="Initialize-schema" class="common-anchor-header">Schema initialisieren<button data-href="#Initialize-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Zunächst müssen wir ein leeres Schema erstellen. Dieser Schritt legt eine grundlegende Struktur für die Definition des Datenmodells fest.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create an empty schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">//Skip this step using JavaScript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Skip this step using cURL</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-fields" class="common-anchor-header">Felder hinzufügen<button data-href="#Add-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Sobald das Schema erstellt ist, besteht der nächste Schritt darin, die Felder festzulegen, aus denen sich Ihre Daten zusammensetzen. Jedes Feld ist mit den jeweiligen Datentypen und Attributen verknüpft.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, enable_analyzer=<span class="hljs-literal">True</span>, enable_match=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;timestamp&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish date&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">2000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article text content&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;timestamp&quot;</span>)
        .dataType(DataType.Int32)
        .build())
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">2000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;timestamp&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int32</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">2000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;article_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article id&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">200</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithEnableMatch(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article title&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithDataType(entity.FieldTypeInt32).
    WithDescription(<span class="hljs-string">&quot;publish date&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">2000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article text content&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;text dense vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription(<span class="hljs-string">&quot;text sparse vector&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;article_id&quot;,
        &quot;dataType&quot;: &quot;Int64&quot;,
        &quot;isPrimary&quot;: true
    },
    {
        &quot;fieldName&quot;: &quot;title&quot;,
        &quot;dataType&quot;: &quot;VarChar&quot;,
        &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 200,
            &quot;enable_analyzer&quot;: true,
            &quot;enable_match&quot;: true
        }
    },
    {
        &quot;fieldName&quot;: &quot;timestamp&quot;,
        &quot;dataType&quot;: &quot;Int32&quot;
    },
    {
       &quot;fieldName&quot;: &quot;text&quot;,
       &quot;dataType&quot;: &quot;VarChar&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 2000,
            &quot;enable_analyzer&quot;: true
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_dense_vector&quot;,
       &quot;dataType&quot;: &quot;FloatVector&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: 768
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_sparse_vector&quot;,
       &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel werden die folgenden Attribute für die Felder festgelegt:</p>
<ul>
<li><p>Primärschlüssel: Die „ <code translate="no">article_id</code> “ wird als Primärschlüssel verwendet, wodurch die automatische Zuweisung von Primärschlüsseln für eingehende Entitäten ermöglicht wird.</p></li>
<li><p>Partitionsschlüssel: „ <code translate="no">timestamp</code> “ wird als Partitionsschlüssel zugewiesen, was eine Filterung nach Partitionen ermöglicht. Dies kann sein</p></li>
<li><p>Textanalysator: Auf die beiden Zeichenfolgenfelder „ <code translate="no">title</code> “ und „ <code translate="no">text</code> “ wird ein Textanalysator angewendet, um Textübereinstimmungen bzw. die Volltextsuche zu unterstützen.</p></li>
</ul>
<h3 id="Optional-Add-functions" class="common-anchor-header">(Optional) Funktionen hinzufügen<button data-href="#Optional-Add-functions" class="anchor-icon" translate="no">
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
    </button></h3><p>Um die Möglichkeiten der Datenabfrage zu erweitern, können Funktionen in das Schema integriert werden. So kann beispielsweise eine Funktion erstellt werden, die bestimmte Felder verarbeitet.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse_vector&quot;</span>],
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">FunctionType</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;text_sparse_vector&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> myFunctions=<span class="hljs-string">&#x27;[
    {
        &quot;name&quot;: &quot;text_bm25&quot;,
        &quot;type&quot;: &quot;BM25&quot;,
        &quot;inputFieldNames&quot;: [&quot;text&quot;],
        &quot;outputFieldNames&quot;: [&quot;text_sparse_vector&quot;],
        &quot;params&quot;: {}
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
    \&quot;functions\&quot;: <span class="hljs-variable">$myFunctions</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel wird eine integrierte BM25-Funktion in das Schema eingefügt, die das Feld „ <code translate="no">text</code> “ als Eingabe verwendet und die resultierenden spärlichen Vektoren im Feld „ <code translate="no">text_sparse_vector</code> “ speichert.</p>
<h2 id="Next-Steps" class="common-anchor-header">Nächste Schritte<button data-href="#Next-Steps" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/de/create-collection.md">Sammlung erstellen</a></p></li>
<li><p><a href="/docs/de/alter-collection-field.md">Sammlungsfeld ändern</a></p></li>
</ul>
