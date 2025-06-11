---
id: exponential-decay.md
title: Экспоненциальный распадCompatible with Milvus 2.6.x
summary: >-
  Экспоненциальный распад создает крутой начальный спад, за которым следует
  длинный хвост в результатах поиска. Подобно циклу новостей, где актуальность
  сначала быстро снижается, но некоторые истории со временем сохраняют свою
  значимость, экспоненциальный распад применяет резкое наказание к элементам,
  находящимся за пределами вашего идеального диапазона, сохраняя при этом
  возможность обнаружения удаленных элементов. Такой подход идеален, когда вы
  хотите сделать приоритет на близость или актуальность, но не хотите полностью
  исключать более отдаленные варианты.
beta: Milvus 2.6.x
---
<h1 id="Exponential-Decay" class="common-anchor-header">Экспоненциальный распад<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Exponential-Decay" class="anchor-icon" translate="no">
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
    </button></h1><p>Экспоненциальный распад создает крутой начальный спад, за которым следует длинный хвост в результатах поиска. Подобно циклу новостей, в котором актуальность сначала быстро снижается, но со временем некоторые истории сохраняют свою значимость, экспоненциальный спад применяет резкое наказание к элементам, находящимся за пределами вашего идеального диапазона, сохраняя при этом возможность обнаружения удаленных элементов. Такой подход идеален, когда вы хотите сделать приоритет на близость или актуальность, но не хотите полностью исключать более отдаленные варианты.</p>
<p>В отличие от других функций распада:</p>
<ul>
<li><p>Гауссово распадение создает более постепенный, колоколообразный спад.</p></li>
<li><p>Линейное затухание уменьшается с постоянной скоростью, пока не достигнет нуля</p></li>
</ul>
<p>Экспоненциальный распад уникальным образом "нагружает" штраф, применяя большую часть снижения релевантности на ранней стадии, сохраняя при этом длинный хвост минимальной, но ненулевой релевантности.</p>
<h2 id="When-to-use-exponential-decay" class="common-anchor-header">Когда использовать экспоненциальный распад<button data-href="#When-to-use-exponential-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Экспоненциальный распад особенно эффективен для:</p>
<table>
   <tr>
     <th><p>Пример использования</p></th>
     <th><p>Пример</p></th>
     <th><p>Почему экспоненциальный распад хорошо работает</p></th>
   </tr>
   <tr>
     <td><p>Новостные ленты</p></td>
     <td><p>Порталы срочных новостей</p></td>
     <td><p>Быстрое снижение релевантности старых новостей при сохранении отображения важных событий, произошедших несколько дней назад</p></td>
   </tr>
   <tr>
     <td><p>Временные ленты социальных сетей</p></td>
     <td><p>Ленты активности, обновления статусов</p></td>
     <td><p>Акцентирует внимание на свежем контенте, но позволяет всплывать вирусному старому контенту</p></td>
   </tr>
   <tr>
     <td><p>Системы оповещения</p></td>
     <td><p>Расстановка приоритетов оповещений</p></td>
     <td><p>Создает срочность для недавних оповещений, сохраняя видимость для важных.</p></td>
   </tr>
   <tr>
     <td><p>Флеш-продажи</p></td>
     <td><p>Ограниченные по времени предложения</p></td>
     <td><p>Быстрое снижение видимости по мере приближения срока</p></td>
   </tr>
</table>
<p>Выбирайте экспоненциальный спад, когда:</p>
<ul>
<li><p>Пользователи ожидают, что очень недавние или близлежащие объекты будут доминировать в результатах.</p></li>
<li><p>Более старые или более удаленные товары должны оставаться доступными, если они исключительно релевантны.</p></li>
<li><p>Падение релевантности должно быть фронтальным (более резким в начале, более постепенным позже).</p></li>
</ul>
<h2 id="Sharp-drop-off-principle" class="common-anchor-header">Принцип резкого спада<button data-href="#Sharp-drop-off-principle" class="anchor-icon" translate="no">
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
    </button></h2><p>Экспоненциальный спад создает кривую, которая сначала быстро падает, а затем постепенно сглаживается в длинный хвост, который приближается, но никогда не достигает нуля. Эта математическая модель часто встречается в таких природных явлениях, как радиоактивный распад, сокращение численности населения и актуальность информации с течением времени.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/exp-decay.png" alt="Exp Decay" class="doc-image" id="exp-decay" />
   </span> <span class="img-wrapper"> <span>Экспоненциальный распад</span> </span></p>
<p>На графике выше показано, как экспоненциальный распад повлияет на рейтинг новостных статей на цифровой новостной платформе:</p>
<ul>
<li><p><code translate="no">origin</code> (текущее время): Текущий момент, когда актуальность максимальна (1.0).</p></li>
<li><p><code translate="no">offset</code> (3 часа): "окно срочных новостей" - все статьи, опубликованные в течение последних 3 часов, сохраняют полный балл релевантности (1,0), гарантируя, что самые свежие новости не будут подвергаться ненужному наказанию за незначительную разницу во времени.</p></li>
<li><p><code translate="no">decay</code> (0.5): Оценка на расстоянии шкалы - этот параметр определяет, насколько резко снижаются оценки с течением времени.</p></li>
<li><p><code translate="no">scale</code> (24 часа): Временной промежуток, когда релевантность падает до значения распада - у новостей, которым ровно 24 часа, оценка релевантности снижается вдвое (0,5).</p></li>
</ul>
<p>Как видно из кривой, релевантность статей старше 24 часов продолжает снижаться, но так и не достигает нуля. Даже новости, опубликованные несколько дней назад, сохраняют минимальную релевантность, что позволяет важным, но старым новостям по-прежнему появляться в вашей ленте (хотя и с более низким рейтингом).</p>
<p>Такое поведение имитирует то, как обычно работает релевантность новостей - очень свежие истории сильно доминируют, но значимые старые истории все же могут пробиться вперед, если они исключительно релевантны интересам пользователя.</p>
<h2 id="Formula" class="common-anchor-header">Формула<button data-href="#Formula" class="anchor-icon" translate="no">
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
    </button></h2><p>Математическая формула для расчета показателя экспоненциального распада выглядит следующим образом:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mtext>doc</mtext><mo stretchy="false">)</mo><mo>=</mo><mi>exp</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mi>λ</mi><mo>⋅</mo><mi>max</mi><mo>⁡</mo><mrow><mo fence="true">(</mo><mn>0</mn><mo separator="true">,</mo><mrow><mo fence="true">∣</mo><msub><mtext>fieldvalue</mtext><mtext>doc</mtext></msub><mo>−</mo><mtext>origin</mtext><mo fence="true">∣</mo></mrow><mo>−</mo><mtext>offset</mtext><mo fence="true">)</mo></mrow><mo fence="true">)</mo></mrow></mrow><annotation encoding="application/x-tex">S(\text{doc}) = \exp\left( \lambda \cdot \max\left(0, \left|\text{fieldvalue}_{\text{doc}} - \text{origin}\right| - \text{offset} \right) \right)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mopen">(</span><span class="mord text"><span class="mord">doc</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">(</span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop">max</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;">∣</span><span class="mord"><span class="mord text"><span class="mord">fieldvalue</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">doc</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">origin</span></span><span class="mclose delimcenter" style="top:0em;">∣</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">offset</span></span><span class="mclose delimcenter" style="top:0em;">)</span></span><span class="mclose delimcenter" style="top:0em;">)</span></span></span></span></span></span></p>
<p>Где:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>λ</mi><mo>=</mo><mfrac><mrow><mi>ln</mi><mo>⁡</mo><mo stretchy="false">(</mo><mtext>decay</mtext><mo stretchy="false">)</mo></mrow><mtext>scale</mtext></mfrac></mrow><annotation encoding="application/x-tex">\lambda = \frac{\ln(\text{decay})}{\text{scale}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.113em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">scale</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mop">ln</span><span class="mopen">(</span><span class="mord text"><span class="mord">decay</span></span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Если говорить простым языком:</p>
<ol>
<li><p>Вычислите, насколько далеко значение поля находится от начала: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> ∣fieldvaluedoc-origin∣|\text{fieldvalue}_{\text{doc}}</annotation></semantics></math></span></span>- <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">\text{origin}|</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord text"><span class="mord">∣fieldvalue</span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">doc</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">-</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord text"><span class="mord">origin</span></span><span class="mord">∣.</span></span></span></span></p></li>
<li><p>Вычтите смещение (если оно есть), но никогда не опускайтесь ниже нуля: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>max</mi><mo stretchy="false">(</mo><mn>0</mn><mo separator="true">,</mo><mtext>расстояние-смещение</mtext><mo stretchy="false">)</mo></mrow></semantics></math></span></span>\max <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">(0, \text{расстояние} - \text{смещение})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">max</span><span class="mopen">(</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord text"><span class="mord">расстояние</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">-</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord text"><span class="mord">смещение</span></span><span class="mclose">)</span></span></span></span>.</p></li>
<li><p>Умножьте на <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> λ\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span>, которая рассчитывается из параметров масштаба и распада.</p></li>
<li><p>Возьмите экспоненту, которая дает значение между 0 и 1: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo stretchy="false">(</mo><mtext>λ⋅value</mtext><mo stretchy="false">)</mo></mrow></semantics></math></span></span>\exp <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">(\lambda \cdot \text{value})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord text"><span class="mord">value</span></span><span class="mclose">)</span></span></span></span>.</p></li>
</ol>
<p>Вычисление <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> λ\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span> преобразует ваши параметры масштаба и распада в параметр скорости экспоненциальной функции. Более отрицательное значение <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex"> λ\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span> создает более крутой начальный спад.</p>
<h2 id="Use-exponential-decay" class="common-anchor-header">Использование экспоненциального распада<button data-href="#Use-exponential-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Экспоненциальный спад можно применять как к стандартному векторному поиску, так и к гибридным операциям поиска в Milvus. Ниже приведены ключевые фрагменты кода для реализации этой возможности.</p>
<div class="alert note">
<p>Прежде чем использовать функции затухания, необходимо создать коллекцию с соответствующими числовыми полями (например, временными метками, расстояниями и т. д.), которые будут использоваться для вычислений затухания. Полные рабочие примеры, включающие настройку коллекции, определение схемы и вставку данных, см. в разделе <a href="/docs/ru/tutorial-implement-a-time-based-ranking-in-milvus.md">Decay Ranker Tutorial</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Создание ранжировщика распада</h3><p>После того как коллекция настроена с числовым полем (в данном примере <code translate="no">publish_time</code>), создайте ранжировщик экспоненциального распада:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> datetime

<span class="hljs-comment"># Create an exponential decay ranker for news recency</span>
ranker = Function(
    name=<span class="hljs-string">&quot;news_recency&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;publish_time&quot;</span>],   <span class="hljs-comment"># Numeric field to use</span>
    function_type=FunctionType.RERANK,    <span class="hljs-comment"># Function type. Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,              <span class="hljs-comment"># Specify decay reranker</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;exp&quot;</span>,                <span class="hljs-comment"># Choose exponential decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime.now().timestamp()),  <span class="hljs-comment"># Current time</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">3</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,            <span class="hljs-comment"># 3 hour breaking news window</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                     <span class="hljs-comment"># Half score at scale distance</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>             <span class="hljs-comment"># 24 hours (1 day)</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Применить к стандартному векторному поиску</h3><p>Определив ранжировщик распада, вы можете применить его в процессе поиска, передав параметр <code translate="no">ranker</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply decay ranker to vector search</span>
result = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;market analysis&quot;</span>],             <span class="hljs-comment"># Query text</span>
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">10</span>,                             <span class="hljs-comment"># Number of results</span>
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>], <span class="hljs-comment"># Fields to return</span>
<span class="highlighted-wrapper-line">    ranker=ranker,                        <span class="hljs-comment"># Apply the decay ranker</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Применить к гибридному поиску</h3><p>Ранжировщики распада также можно применять в операциях гибридного поиска, которые объединяют несколько векторных полей:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define dense vector search request</span>
dense = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;market analysis&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Define sparse vector search request</span>
sparse = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;market analysis&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense, sparse],                      <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=ranker,                        <span class="hljs-comment"># Same decay ranker</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;publish_time&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительные сведения о гибридных операциях поиска см. в разделе <a href="/docs/ru/multi-vector-search.md">Многовекторный гибридный поиск</a>.</p>
