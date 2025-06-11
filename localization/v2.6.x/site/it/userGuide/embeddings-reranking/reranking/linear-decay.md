---
id: linear-decay.md
title: Decadimento lineareCompatible with Milvus 2.6.x
summary: >-
  Il decadimento lineare crea una linea retta di declino che termina con un
  punto zero assoluto nei risultati di ricerca. Come un conto alla rovescia per
  un evento imminente, in cui la rilevanza diminuisce gradualmente fino a quando
  l'evento non è passato, il decadimento lineare applica una riduzione
  prevedibile e costante della rilevanza man mano che gli elementi si
  allontanano dal punto ideale, fino a scomparire completamente. Questo
  approccio è ideale quando si desidera un tasso di decadimento coerente con un
  limite chiaro, che garantisca che gli elementi oltre un certo limite siano
  completamente esclusi dai risultati.
beta: Milvus 2.6.x
---
<h1 id="Linear-Decay" class="common-anchor-header">Decadimento lineare<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Linear-Decay" class="anchor-icon" translate="no">
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
    </button></h1><p>Il decadimento lineare crea una linea retta di declino che termina con un punto zero assoluto nei risultati di ricerca. Come un conto alla rovescia per un evento imminente, in cui la rilevanza diminuisce gradualmente fino a quando l'evento non è passato, il decadimento lineare applica una riduzione prevedibile e costante della rilevanza man mano che gli elementi si allontanano dal punto ideale, fino a scomparire completamente. Questo approccio è ideale quando si desidera un tasso di decadimento coerente con un limite chiaro, che garantisca che gli elementi oltre un certo limite siano completamente esclusi dai risultati.</p>
<p>A differenza di altre funzioni di decadimento:</p>
<ul>
<li><p>Il decadimento gaussiano segue una curva a campana che si avvicina gradualmente ma non raggiunge mai lo zero.</p></li>
<li><p>Il decadimento esponenziale mantiene una lunga coda di rilevanza minima che si estende all'infinito.</p></li>
</ul>
<p>Il decadimento lineare crea in modo univoco un punto finale definitivo, rendendolo particolarmente efficace per le applicazioni con limiti o scadenze naturali.</p>
<h2 id="When-to-use-linear-decay" class="common-anchor-header">Quando utilizzare il decadimento lineare<button data-href="#When-to-use-linear-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Il decadimento lineare è particolarmente efficace per:</p>
<table>
   <tr>
     <th><p>Caso d'uso</p></th>
     <th><p>Esempio</p></th>
     <th><p>Perché il decadimento lineare funziona bene</p></th>
   </tr>
   <tr>
     <td><p>Annunci di eventi</p></td>
     <td><p>Piattaforme di biglietti per concerti</p></td>
     <td><p>Crea un limite chiaro per gli eventi troppo lontani nel futuro</p></td>
   </tr>
   <tr>
     <td><p>Offerte a tempo limitato</p></td>
     <td><p>Vendite flash, promozioni</p></td>
     <td><p>Assicura che le offerte scadute o di prossima scadenza non vengano visualizzate.</p></td>
   </tr>
   <tr>
     <td><p>Raggio di consegna</p></td>
     <td><p>Consegna di cibo, servizi di corriere</p></td>
     <td><p>Impone confini geografici rigidi</p></td>
   </tr>
   <tr>
     <td><p>Contenuti con limiti di età</p></td>
     <td><p>Piattaforme di incontri, servizi multimediali</p></td>
     <td><p>Stabilisce soglie di età rigide</p></td>
   </tr>
</table>
<p>Scegliete il decadimento lineare quando:</p>
<ul>
<li><p>L'applicazione ha un limite, una scadenza o una soglia naturale.</p></li>
<li><p>Gli elementi che superano un certo punto dovrebbero essere completamente esclusi dai risultati</p></li>
<li><p>Avete bisogno di un tasso prevedibile e coerente di declino della rilevanza</p></li>
<li><p>Gli utenti devono vedere una chiara demarcazione tra elementi rilevanti e irrilevanti.</p></li>
</ul>
<h2 id="Steady-decline-principle" class="common-anchor-header">Principio del declino costante<button data-href="#Steady-decline-principle" class="anchor-icon" translate="no">
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
    </button></h2><p>Il decadimento lineare crea un calo lineare che diminuisce a un tasso costante fino a raggiungere esattamente lo zero. Questo schema appare in molti scenari quotidiani, come i timer per il conto alla rovescia, l'esaurimento delle scorte e l'approssimarsi di scadenze in cui la rilevanza ha un chiaro punto di scadenza.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/linear-decay.png" alt="Linear Decay" class="doc-image" id="linear-decay" />
   </span> <span class="img-wrapper"> <span>Decadimento lineare</span> </span></p>
<p>Il grafico qui sopra mostra come il decadimento lineare influenzerebbe gli annunci di eventi su una piattaforma di biglietteria:</p>
<ul>
<li><p><code translate="no">origin</code> (data attuale): Il momento attuale, dove la rilevanza è massima (1.0).</p></li>
<li><p><code translate="no">offset</code> (1 giorno): La "finestra degli eventi immediati": tutti gli eventi che si verificano entro il giorno successivo mantengono il massimo punteggio di rilevanza (1,0), assicurando che gli eventi molto imminenti non vengano penalizzati per lievi differenze temporali.</p></li>
<li><p><code translate="no">decay</code> (0.5): Il punteggio alla distanza della scala: questo parametro controlla il tasso di declino della rilevanza.</p></li>
<li><p><code translate="no">scale</code> (10 giorni): Il periodo di tempo in cui la rilevanza scende al valore di decadimento: gli eventi a 10 giorni di distanza hanno il punteggio di rilevanza dimezzato (0,5).</p></li>
</ul>
<p>Come si può vedere dalla curva rettilinea, gli eventi che si verificano a circa 16 giorni di distanza hanno una rilevanza esattamente pari a zero e non appaiono affatto nei risultati di ricerca. In questo modo si crea un chiaro confine che assicura che gli utenti vedano solo gli eventi imminenti rilevanti all'interno di una finestra temporale definita.</p>
<p>Questo comportamento rispecchia il funzionamento tipico della pianificazione degli eventi: gli eventi imminenti sono i più rilevanti, quelli delle prossime settimane hanno un'importanza decrescente e quelli troppo lontani nel tempo (o già passati) non dovrebbero comparire affatto.</p>
<h2 id="Formula" class="common-anchor-header">La formula<button data-href="#Formula" class="anchor-icon" translate="no">
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
    </button></h2><p>La formula matematica per calcolare il punteggio di decadimento lineare è la seguente:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mtext>doc</mtext><mo stretchy="false">)</mo><mo>=</mo><mi>max</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mfrac><mrow><mi>s</mi><mo>−</mo><mi>max</mi><mo>⁡</mo><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mi mathvariant="normal">∣</mi><msub><mtext>fieldvalue</mtext><mtext>doc</mtext></msub><mo>−</mo><mtext>origin</mtext><mi mathvariant="normal">∣</mi><mo>−</mo><mtext>offset</mtext><mo stretchy="false">)</mo></mrow><mi>s</mi></mfrac><mo separator="true">,</mo><mn>0</mn><mo fence="true">)</mo></mrow></mrow><annotation encoding="application/x-tex">S(\text{doc}) = \max\left( \frac{s - \max(0, |\text{fieldvalue}_{\text{doc}} - \text{origin}| - \text{offset})}{s}, 0 \right)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mopen">(</span><span class="mord text"><span class="mord">doc</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.4em;vertical-align:-0.95em;"></span><span class="mop">max</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">s</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">∣</span><span class="mord"><span class="mord text"><span class="mord">fieldvalue</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">doc</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">origin</span></span><span class="mord">∣</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">offset</span></span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">0</span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span></span></span></span></span></p>
<p>Dove:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>s</mi><mo>=</mo><mfrac><mtext>scale</mtext><mrow><mo stretchy="false">(</mo><mn>1.0</mn><mo>−</mo><mtext>decay</mtext><mo stretchy="false">)</mo></mrow></mfrac></mrow><annotation encoding="application/x-tex">s = \frac{\text{scale}}{(1.0 - \text{decay})}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">s</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.3074em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mopen">(</span><span class="mord">1.0</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">decay</span></span><span class="mclose">)</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">scale</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>In parole povere:</p>
<ol>
<li><p>Calcolo della distanza del valore del campo dall'origine: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> ∣valore</annotation></semantics></math></span></span> del campo-origine∣|testo{valore del campo}_{testo{doc}} <span class="katex">- <span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">\text{origin}|</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord text"><span class="mord">∣fieldvalue</span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">doc</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2222em;"></span> <span class="mbin">-</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span> <span class="mord">origin∣</span></span></span></span></p></li>
<li><p>Sottrarre l'eventuale offset, senza mai scendere sotto lo zero: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>max</mi><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mtext>distanza-offset</mtext><mo stretchy="false">)</mo></mrow></semantics></math></span></span>\max <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">(0, \text{distance} - \text{offset})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord text"><span class="mord">distanza</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">-</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord text"><span class="mord">offset</span></span><span class="mclose">)</span></span></span></span></p></li>
<li><p>Determinare il parametro <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s dai valori di scala e decadimento.</p></li>
<li><p>Sottrarre la distanza regolata da <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s e dividere per <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s.</p></li>
<li><p>Assicurarsi che il risultato non scenda mai sotto lo zero: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>max</mi><mo stretchy="false">(</mo><mtext>risultato</mtext><mo separator="true">,</mo><mn>0</mn><mo stretchy="false">)</mo></mrow></semantics></math></span></span>\max <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">(\text{result}, 0)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord text"><span class="mord">risultato</span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span></span></span></span> 0 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">)</span></span></span></span></p></li>
</ol>
<p>Il calcolo di <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s trasforma i parametri di scala e decadimento nel punto in cui il punteggio raggiunge lo zero. Ad esempio, con decadimento=0,5 e scala=7, il punteggio raggiungerà esattamente lo zero a distanza=14 (il doppio del valore della scala).</p>
<h2 id="Use-linear-decay" class="common-anchor-header">Utilizzare il decadimento lineare<button data-href="#Use-linear-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Il decadimento lineare può essere applicato sia alla ricerca vettoriale standard che alle operazioni di ricerca ibrida in Milvus. Di seguito sono riportati i principali frammenti di codice per implementare questa funzione.</p>
<div class="alert note">
<p>Prima di utilizzare le funzioni di decadimento, è necessario creare una collezione con campi numerici appropriati (come timestamp, distanze, ecc.) che verranno utilizzati per i calcoli di decadimento. Per esempi di lavoro completi, che includono l'impostazione della raccolta, la definizione dello schema e l'inserimento dei dati, consultare l'<a href="/docs/it/tutorial-implement-a-time-based-ranking-in-milvus.md">esercitazione</a> sul <a href="/docs/it/tutorial-implement-a-time-based-ranking-in-milvus.md">Decay Ranker</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Creare un ranker di decadimento</h3><p>Dopo aver impostato la raccolta con un campo numerico (in questo esempio, <code translate="no">event_date</code> come secondi da ora), creare un ranker di decadimento lineare:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> time

<span class="hljs-comment"># Calculate current time</span>
current_time = <span class="hljs-built_in">int</span>(time.time())

<span class="hljs-comment"># Create a linear decay ranker for event listings</span>
ranker = Function(
    name=<span class="hljs-string">&quot;event_relevance&quot;</span>,               <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;event_date&quot;</span>],     <span class="hljs-comment"># Numeric field to use</span>
    function_type=FunctionType.RERANK,    <span class="hljs-comment"># Function type. Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,              <span class="hljs-comment"># Specify decay reranker</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;linear&quot;</span>,             <span class="hljs-comment"># Choose linear decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: current_time,           <span class="hljs-comment"># Current time</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">12</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,           <span class="hljs-comment"># 12 hour immediate events window</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                     <span class="hljs-comment"># Half score at scale distance</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>         <span class="hljs-comment"># 7 days (in seconds)</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Applicare alla ricerca vettoriale standard</h3><p>Dopo aver definito il ranker di decadimento, è possibile applicarlo durante le operazioni di ricerca passandolo al parametro <code translate="no">ranker</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply decay ranker to vector search</span>
result = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;music concerts&quot;</span>],              <span class="hljs-comment"># Query text</span>
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">10</span>,                             <span class="hljs-comment"># Number of results</span>
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>], <span class="hljs-comment"># Fields to return</span>
<span class="highlighted-wrapper-line">    ranker=ranker,                        <span class="hljs-comment"># Apply the decay ranker</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Applica alla ricerca ibrida</h3><p>I ranker di decadimento possono essere applicati anche alle operazioni di ricerca ibrida che combinano più campi vettoriali:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define dense vector search request</span>
dense = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;music concerts&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define sparse vector search request</span>
sparse = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;music concerts&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense, sparse],                      <span class="hljs-comment"># Multiple search requests</span>
    ranker=ranker,                        <span class="hljs-comment"># Same decay ranker</span>
<span class="highlighted-wrapper-line">    limit=<span class="hljs-number">10</span>,</span>
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;venue&quot;</span>, <span class="hljs-string">&quot;event_date&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sulle operazioni di ricerca ibrida, consultare la sezione <a href="/docs/it/multi-vector-search.md">Ricerca ibrida multivettoriale</a>.</p>
