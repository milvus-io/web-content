---
id: geometry-operators.md
title: Geometrie-OperatorenCompatible with Milvus 2.6.4+
summary: >-
  Milvus unterstützt eine Reihe von Operatoren für die räumliche Filterung von
  GEOMETRY-Feldern, die für die Verwaltung und Analyse von Geometriedaten
  unerlässlich sind. Mit diesen Operatoren können Sie Entitäten auf der
  Grundlage der geometrischen Beziehungen zwischen Objekten abrufen.
beta: Milvus 2.6.4+
---
<h1 id="Geometry-Operators" class="common-anchor-header">Geometrie-Operatoren<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Geometry-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus unterstützt eine Reihe von Operatoren für die räumliche Filterung von <code translate="no">GEOMETRY</code> Feldern, die für die Verwaltung und Analyse von Geometriedaten unerlässlich sind. Mit diesen Operatoren können Sie Entitäten auf der Grundlage der geometrischen Beziehungen zwischen Objekten abrufen.</p>
<p>Alle Geometrieoperatoren funktionieren mit zwei geometrischen Argumenten: dem Namen des Feldes <code translate="no">GEOMETRY</code>, das in Ihrem Sammlungsschema definiert ist, und einem geometrischen Zielobjekt, das im Format <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">Well-Known Text</a> (WKT) dargestellt ist.</p>
<h2 id="Use-syntax" class="common-anchor-header">Syntax verwenden<button data-href="#Use-syntax" class="anchor-icon" translate="no">
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
    </button></h2><p>Um nach einem <code translate="no">GEOMETRY</code> Feld zu filtern, verwenden Sie einen Geometrieoperator in einem Ausdruck:</p>
<ul>
<li><p>Allgemein: <code translate="no">{operator}(geo_field, '{wkt}')</code></p></li>
<li><p>Abstandsbezogen: <code translate="no">ST_DWITHIN(geo_field, '{wkt}', distance)</code></p></li>
</ul>
<p>Wobei:</p>
<ul>
<li><p><code translate="no">operator</code> einer der unterstützten Geometrieoperatoren ist (z. B. <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_INTERSECTS</code>). Operatornamen müssen in Groß- oder Kleinbuchstaben geschrieben werden. Eine Liste der unterstützten Operatoren finden Sie unter <a href="/docs/de/geometry-operators.md#Supported-geometry-operators">Unterstützte Geometrieoperatoren</a>.</p></li>
<li><p><code translate="no">geo_field</code> ist der Name Ihres <code translate="no">GEOMETRY</code> Feldes.</p></li>
<li><p><code translate="no">'{wkt}'</code> ist die WKT-Darstellung der abzufragenden Geometrie.</p></li>
<li><p><code translate="no">distance</code> ist der Schwellenwert speziell für <code translate="no">ST_DWITHIN</code>.</p></li>
</ul>
<p>Weitere Informationen über <code translate="no">GEOMETRY</code> Felder in Milvus finden Sie unter <a href="/docs/de/geometry-field.md">Geometriefeld</a>.</p>
<h2 id="Supported-geometry-operators" class="common-anchor-header">Unterstützte Geometrieoperatoren<button data-href="#Supported-geometry-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>In der folgenden Tabelle sind die in Milvus verfügbaren Geometrieoperatoren aufgeführt.</p>
<div class="alert note">
<p>Die Namen der Operatoren müssen in <strong>Groß-</strong> oder <strong>Kleinbuchstaben</strong> geschrieben werden. Die Groß- und Kleinschreibung innerhalb eines Operatornamens darf nicht gemischt werden.</p>
</div>
<table>
   <tr>
     <th><p>Operator</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Beispiel</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ST_EQUALS(A, B)</code> / <code translate="no">st_equals(A, B)</code></p></td>
     <td><p>Gibt TRUE zurück, wenn zwei Geometrien räumlich identisch sind, d. h. die gleiche Punktmenge und Dimension aufweisen.</p></td>
     <td><p>Sind zwei Geometrien (A und B) im Raum genau gleich?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CONTAINS(A, B)</code> / <code translate="no">st_contains(A, B)</code></p></td>
     <td><p>Gibt TRUE zurück, wenn die Geometrie A die Geometrie B vollständig enthält, wobei ihre Innenräume mindestens einen Punkt gemeinsam haben.</p></td>
     <td><p>Umfasst eine Stadtgrenze (A) einen bestimmten Park (B)?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CROSSES(A, B)</code> / <code translate="no">st_crosses(A, B)</code></p></td>
     <td><p>Gibt TRUE zurück, wenn sich die Geometrien A und B teilweise überschneiden, aber nicht vollständig enthalten.</p></td>
     <td><p>Kreuzen sich zwei Straßen (A und B) an einer Kreuzung?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_INTERSECTS(A, B)</code> / <code translate="no">st_intersects(A, B)</code></p></td>
     <td><p>Gibt TRUE zurück, wenn die Geometrien A und B mindestens einen gemeinsamen Punkt haben. Dies ist die allgemeinste und am häufigsten verwendete räumliche Abfrage.</p></td>
     <td><p>Überschneidet sich ein Suchgebiet (A) mit einem der Geschäftsstandorte (B)?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_OVERLAPS(A, B)</code> / <code translate="no">st_overlaps(A, B)</code></p></td>
     <td><p>Gibt TRUE zurück, wenn die Geometrien A und B dieselbe Dimension haben, sich teilweise überschneiden und keine der beiden Geometrien die andere vollständig enthält.</p></td>
     <td><p>Überschneiden sich zwei Grundstücke (A und B)?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_TOUCHES(A, B)</code> / <code translate="no">st_touches(A, B)</code></p></td>
     <td><p>Gibt TRUE zurück, wenn die Geometrien A und B eine gemeinsame Grenze haben, aber ihre Innenräume sich nicht überschneiden.</p></td>
     <td><p>Haben zwei benachbarte Grundstücke (A und B) eine gemeinsame Grenze?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_WITHIN(A, B)</code> / <code translate="no">st_within(A, B)</code></p></td>
     <td><p>Gibt TRUE zurück, wenn die Geometrie A vollständig in der Geometrie B enthalten ist und ihre Innenräume mindestens einen gemeinsamen Punkt haben. Dies ist die Umkehrung von <code translate="no">ST_Contains(B, A)</code>.</p></td>
     <td><p>Liegt ein bestimmter Punkt von Interesse (A) innerhalb eines bestimmten Suchradius (B)?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_DWITHIN(A, B, distance)</code> / <code translate="no">st_dwithin(A, B, distance)</code></p></td>
     <td><p>Gibt TRUE zurück, wenn der Abstand zwischen Geometrie A und Geometrie B kleiner oder gleich dem angegebenen Abstand ist.</p><p><strong>Hinweis</strong>: Geometrie B unterstützt derzeit nur Punkte. Die Abstandseinheit ist Meter.</p></td>
     <td><p>Findet alle Punkte innerhalb von 5000 Metern von einem bestimmten Punkt (B).</p></td>
   </tr>
</table>
<h2 id="STEQUALS--stequals" class="common-anchor-header">ST_EQUALS / st_equals<button data-href="#STEQUALS--stequals" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator <code translate="no">ST_EQUALS</code> gibt TRUE zurück, wenn zwei Geometrien räumlich identisch sind, d. h. sie haben denselben Satz von Punkten und dieselbe Dimension. Dies ist nützlich, um zu überprüfen, ob zwei gespeicherte Geometrieobjekte genau denselben Ort und dieselbe Form repräsentieren.</p>
<p><strong>Beispiel</strong></p>
<p>Nehmen wir an, Sie möchten überprüfen, ob eine gespeicherte Geometrie (z. B. ein Punkt oder ein Polygon) genau dieselbe ist wie eine Zielgeometrie. Sie können zum Beispiel einen gespeicherten Punkt mit einem bestimmten Punkt von Interesse vergleichen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to check if a geometry matches a specific point</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_EQUALS(geo_field, &#x27;POINT(10 20)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCONTAINS--stcontains" class="common-anchor-header">ST_CONTAINS / st_contains<button data-href="#STCONTAINS--stcontains" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator <code translate="no">ST_CONTAINS</code> gibt TRUE zurück, wenn die erste Geometrie die zweite Geometrie vollständig enthält. Dies ist nützlich, um Punkte innerhalb eines Polygons oder kleinere Polygone innerhalb eines größeren Polygons zu finden.</p>
<p><strong>Beispiel</strong></p>
<p>Stellen Sie sich vor, Sie haben eine Sammlung von Stadtbezirken und möchten einen bestimmten Punkt von Interesse finden, z. B. ein Restaurant, das innerhalb der Grenzen eines bestimmten Bezirks liegt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries completely within a specific polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CONTAINS(geo_field, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCROSSES--stcrosses" class="common-anchor-header">ST_CROSSES / st_crosses<button data-href="#STCROSSES--stcrosses" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator <code translate="no">ST_CROSSES</code> gibt <code translate="no">TRUE</code> zurück, wenn der Schnittpunkt zweier Geometrien eine Geometrie mit einer geringeren Dimension als die ursprünglichen Geometrien bildet. Dies gilt typischerweise für eine Linie, die ein Polygon oder eine andere Linie schneidet.</p>
<p><strong>Beispiel</strong></p>
<p>Sie möchten alle Wanderwege (Linienstrings) finden, die eine bestimmte Grenzlinie (einen anderen Linienstring) kreuzen oder in ein Schutzgebiet (Polygon) eintreten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that cross a line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CROSSES(geo_field, &#x27;LINESTRING(5 0, 5 10)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STINTERSECTS--stintersects" class="common-anchor-header">ST_INTERSECTS / st_intersects<button data-href="#STINTERSECTS--stintersects" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator <code translate="no">ST_INTERSECTS</code> gibt <code translate="no">TRUE</code> zurück, wenn zwei Geometrien irgendeinen Punkt ihrer Grenzen oder Innenräume gemeinsam haben. Dies ist ein allgemeiner Operator zur Erkennung jeder Form von räumlicher Überschneidung.</p>
<p><strong>Beispiel</strong></p>
<p>Wenn Sie eine Sammlung von Straßen haben und alle Straßen finden möchten, die eine bestimmte Linie kreuzen oder berühren, die eine vorgeschlagene neue Straße darstellt, können Sie <code translate="no">ST_INTERSECTS</code> verwenden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that intersect with a specific line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_INTERSECTS(geo_field, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STOVERLAPS--stoverlaps" class="common-anchor-header">ST_OVERLAPS / st_overlaps<button data-href="#STOVERLAPS--stoverlaps" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator <code translate="no">ST_OVERLAPS</code> gibt <code translate="no">TRUE</code> zurück, wenn zwei Geometrien der gleichen Dimension eine Teilüberschneidung haben, wobei die Überschneidung selbst die gleiche Dimension wie die ursprünglichen Geometrien hat, aber nicht gleich einer von ihnen ist.</p>
<p><strong>Beispiel</strong></p>
<p>Sie haben eine Reihe von sich überschneidenden Verkaufsgebieten und möchten alle Gebiete finden, die sich teilweise mit einem neuen vorgeschlagenen Verkaufsgebiet überschneiden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that partially overlap with a polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_OVERLAPS(geo_field, &#x27;POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STTOUCHES--sttouches" class="common-anchor-header">ST_TOUCHES / st_touches<button data-href="#STTOUCHES--sttouches" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator <code translate="no">ST_TOUCHES</code> gibt <code translate="no">TRUE</code> zurück, wenn sich die Grenzen zweier Geometrien berühren, ihre Innenräume sich aber nicht überschneiden. Dies ist nützlich, um Nachbarschaften zu erkennen.</p>
<p><strong>Beispiel</strong></p>
<p>Wenn Sie eine Karte mit Grundstücken haben und alle Grundstücke finden möchten, die direkt an einen öffentlichen Park grenzen, ohne dass es zu Überschneidungen kommt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that only touch a line string at their boundaries.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_TOUCHES(geo_field, &#x27;LINESTRING(0 0, 1 1)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STWITHIN--stwithin" class="common-anchor-header">ST_WITHIN / st_within<button data-href="#STWITHIN--stwithin" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator <code translate="no">ST_WITHIN</code> gibt <code translate="no">TRUE</code> zurück, wenn die erste Geometrie vollständig im Inneren oder an der Grenze der zweiten Geometrie liegt. Er ist die Umkehrung von <code translate="no">ST_CONTAINS</code>.</p>
<p><strong>Beispiel</strong></p>
<p>Sie möchten alle kleinen Wohngebiete finden, die sich vollständig innerhalb eines größeren ausgewiesenen Parkgebiets befinden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that are completely within a larger polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_WITHIN(geo_field, &#x27;POLYGON((110 38, 115 38, 115 42, 110 42, 110 38))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen über die Verwendung eines <code translate="no">GEOMETRY</code> Feldes finden Sie unter <a href="/docs/de/geometry-field.md">Geometriefeld</a>.</p>
<h2 id="STDWITHIN--stdwithin" class="common-anchor-header">ST_DWITHIN / st_dwithin<button data-href="#STDWITHIN--stdwithin" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Operator <code translate="no">ST_DWITHIN</code> gibt <code translate="no">TRUE</code> zurück, wenn der Abstand zwischen Geometrie A und Geometrie B kleiner oder gleich einem bestimmten Wert (in Metern) ist. Derzeit muss Geometrie B ein Punkt sein.</p>
<p><strong>Beispiel</strong></p>
<p>Angenommen, Sie haben eine Sammlung von Filialen und möchten alle Filialen im Umkreis von 5.000 Metern um den Standort eines bestimmten Kunden finden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Find all stores within 5000 meters of the point (120 30)</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_DWITHIN(geo_field, &#x27;POINT(120 30)&#x27;, 5000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
