---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  Эффективная дедупликация и поиск сходства очень важны для больших наборов
  данных машинного обучения, особенно для таких задач, как очистка обучающих
  корпораций для больших языковых моделей (LLM). При работе с миллионами или
  миллиардами документов традиционное точное соответствие становится слишком
  медленным и дорогостоящим.
---
<h1 id="MINHASHLSH" class="common-anchor-header">MINHASH_LSH<button data-href="#MINHASHLSH" class="anchor-icon" translate="no">
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
    </button></h1><p>Эффективная дедупликация и поиск сходства очень важны для больших наборов данных машинного обучения, особенно для таких задач, как очистка обучающих корпораций для больших языковых моделей (LLM). Когда речь идет о миллионах или миллиардах документов, традиционное точное соответствие становится слишком медленным и дорогостоящим.</p>
<p>Индекс <strong>MINHASH_LSH</strong> в Milvus обеспечивает быструю, масштабируемую и точную приблизительную дедупликацию, объединяя две мощные техники:</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>: Быстро генерирует компактные подписи (или "отпечатки пальцев") для оценки сходства документов.</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Локально-чувствительное хэширование (LSH)</a>: Быстрое нахождение групп похожих документов на основе их подписей MinHash.</p></li>
</ul>
<p>В этом руководстве вы узнаете о концепциях, предпосылках, настройке и лучших практиках использования MINHASH_LSH в Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Обзор<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">Сходство по Жаккарду</h3><p>Сходство Жаккара измеряет степень совпадения двух множеств A и B, формально определяемую как:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.09618em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Где его значение варьируется от 0 (полностью несовпадающие) до 1 (идентичные).</p>
<p>Однако точное вычисление сходства Жаккара между всеми парами документов в больших наборах данных требует больших затрат времени и памяти - O<strong>(n²</strong> ), если <strong>n</strong> велико. Это делает его невыполнимым для таких случаев, как очистка учебных корпусов LLM или анализ документов в веб-масштабе.</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">Подписи MinHash: Приблизительное сходство по Жаккарду</h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a> - это вероятностная техника, которая предлагает эффективный способ оценки сходства по Жаккарду. Она работает путем преобразования каждого набора в компактный <strong>вектор сигнатур</strong>, сохраняющий достаточно информации для эффективной аппроксимации сходства наборов.</p>
<p><strong>Основная идея</strong>:</p>
<p>Чем более похожи два набора, тем больше вероятность того, что их сигнатуры MinHash будут совпадать в одних и тех же позициях. Это свойство позволяет MinHash аппроксимировать сходство по Жаккарду между наборами.</p>
<p>Это свойство позволяет MinHash <strong>аппроксимировать сходство по Жаккарду</strong> между наборами без необходимости прямого сравнения полных наборов.</p>
<p>Процесс MinHash включает в себя:</p>
<ol>
<li><p><strong>Шингование</strong>: Преобразование документов в наборы перекрывающихся последовательностей лексем (шинглов).</p></li>
<li><p><strong>Хеширование</strong>: применение нескольких независимых хеш-функций к каждому шинглу.</p></li>
<li><p><strong>Выбор минимума</strong>: Для каждой хэш-функции записываем <strong>минимальное</strong> значение хэша для всех шинглов.</p></li>
</ol>
<p>Весь процесс показан на рисунке ниже:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" />
   </span> <span class="img-wrapper"> <span>Рабочий процесс Minhash</span> </span></p>
<div class="alert note">
<p>Количество используемых хэш-функций определяет размерность подписи MinHash. Более высокая размерность обеспечивает более высокую точность аппроксимации, но при этом требует больших затрат на хранение и вычисления.</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">LSH для MinHash</h3><p>Хотя подписи MinHash значительно снижают затраты на вычисление точного сходства по Жаккарду между документами, исчерпывающее сравнение каждой пары векторов подписей все еще неэффективно в масштабе.</p>
<p>Для решения этой проблемы используется <a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">LSH</a>. LSH обеспечивает быстрый приблизительный поиск сходства, гарантируя, что похожие элементы с высокой вероятностью попадут в одно и то же "ведро", что избавляет от необходимости сравнивать каждую пару напрямую.</p>
<p>Процесс включает в себя:</p>
<ol>
<li><p><strong>Сегментация подписи:</strong></p>
<p><em>n-мерная</em> подпись MinHash делится на <em>b</em> полос. Каждая полоса содержит <em>r</em> последовательных хэш-значений, поэтому общая длина подписи удовлетворяет условию: <em>n = b × r</em>.</p>
<p>Например, если у вас есть 128-мерная подпись MinHash<em>(n = 128</em>) и вы разделили ее на 32 полосы<em>(b = 32</em>), то каждая полоса содержит 4 хэш-значения<em>(r = 4</em>).</p></li>
<li><p><strong>Хеширование на уровне полос:</strong></p>
<p>После сегментации каждая полоса независимо обрабатывается с помощью стандартной хэш-функции, чтобы отнести ее к "ведру". Если две подписи дают одинаковое хэш-значение в пределах полосы - т. е. попадают в один и тот же бакет, - они считаются потенциальными совпадениями.</p></li>
<li><p><strong>Отбор кандидатов:</strong></p>
<p>Пары, совпадающие хотя бы в одной полосе, отбираются в качестве кандидатов на сходство.</p></li>
</ol>
<div class="alert note">
<p>Почему это работает?</p>
<p>С математической точки зрения, если две подписи имеют сходство по Жаккарду <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s,</p>
<ul>
<li><p>Вероятность того, что они идентичны в одной строке (хэш-позиции), равна <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> s.</p></li>
<li><p>Вероятность того, что они совпадают во всех <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">rr</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> r строках диапазона, равна <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span></span></span></span> s <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> r</span></span></span></span></span></span></span></span></span></p></li>
<li><p>Вероятность того, что они совпадают <strong>хотя бы</strong> в <strong>одной полосе</strong>, равна :</p></li>
</ul>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mn>1</mn><mo>−</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><msup><mi>s</mi><mi>r</mi></msup><msup><mo stretchy="false">)</mo><mi>b</mi></msup></mrow><annotation encoding="application/x-tex">1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1491em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8991em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>Подробнее см. в разделе <a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Локально-чувствительное хеширование</a>.</p>
</div>
<p>Рассмотрим три документа со 128-мерными подписями MinHash:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" />
   </span> <span class="img-wrapper"> <span>Lsh Workflow 1</span> </span></p>
<p>Сначала LSH делит 128-мерную подпись на 32 диапазона по 4 последовательных значения в каждом:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" />
   </span> <span class="img-wrapper"> <span>Lsh Workflow 2</span> </span></p>
<p>Затем каждая полоса хэшируется в различные ведра с помощью хэш-функции. Пары документов, разделяющие бакеты, выбираются в качестве кандидатов на сходство. В приведенном ниже примере документы A и B выбраны в качестве кандидатов на сходство, поскольку их результаты хэширования совпадают в <strong>полосе 0</strong>:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" />
   </span> <span class="img-wrapper"> <span>Lsh Workflow 3</span> </span></p>
<div class="alert note">
<p>Количество полос контролируется параметром <code translate="no">mh_lsh_band</code>. Дополнительные сведения см. в разделе <a href="/docs/ru/minhash-lsh.md#Index-building-params">Параметры построения индексов</a>.</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures-in-Milvus" class="common-anchor-header">MHJACCARD: Сравнение подписей MinHash в Milvus</h3><p>Подписи MinHash аппроксимируют сходство по Жаккарду между наборами, используя двоичные векторы фиксированной длины. Однако, поскольку эти сигнатуры не сохраняют исходные наборы, стандартные метрики, такие как <code translate="no">JACCARD</code>, <code translate="no">L2</code> или <code translate="no">COSINE</code>, не могут быть напрямую применены для их сравнения.</p>
<p>Чтобы решить эту проблему, Milvus вводит специализированный тип метрики, называемый <code translate="no">MHJACCARD</code>, разработанный специально для сравнения подписей MinHash.</p>
<p>При использовании MinHash в Milvus:</p>
<ul>
<li><p>Векторное поле должно быть типа <code translate="no">BINARY_VECTOR</code></p></li>
<li><p><code translate="no">index_type</code> должно быть <code translate="no">MINHASH_LSH</code> (или <code translate="no">BIN_FLAT</code>).</p></li>
<li><p>Значение <code translate="no">metric_type</code> должно быть установлено в <code translate="no">MHJACCARD</code></p></li>
</ul>
<p>Использование других метрик будет либо недействительным, либо даст неверные результаты.</p>
<p>Для получения дополнительной информации об этом типе метрики обратитесь к <a href="/docs/ru/metric.md#MHJACCARD">MHJACCARD</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Предварительные условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед использованием MinHash LSH в Milvus необходимо сначала сгенерировать <strong>сигнатуры MinHash</strong>. Эти компактные двоичные сигнатуры аппроксимируют сходство Жаккара между множествами и необходимы для поиска в Milvus на основе <code translate="no">MHJACCARD</code>.</p>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">Выбор метода генерации сигнатур MinHash</h3><p>В зависимости от объема работы вы можете выбрать:</p>
<ul>
<li><p>Использовать <code translate="no">datasketch</code> из Python для простоты (рекомендуется для прототипирования).</p></li>
<li><p>Использовать распределенные инструменты (например, Spark, Ray) для работы с большими массивами данных</p></li>
<li><p>Реализовать пользовательскую логику (NumPy, C++ и т. д.), если критически важна настройка производительности.</p></li>
</ul>
<p>В этом руководстве мы используем <code translate="no">datasketch</code> для простоты и совместимости с форматом ввода Milvus.</p>
<h3 id="Install-required-libraries" class="common-anchor-header">Установите необходимые библиотеки</h3><p>Установите необходимые пакеты для этого примера:</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">Генерация сигнатур MinHash</h3><p>Мы сгенерируем 256-мерные подписи MinHash, каждое хэш-значение которых представлено в виде 64-битного целого числа. Это соответствует ожидаемому векторному формату для <code translate="no">MINHASH_LSH</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasketch <span class="hljs-keyword">import</span> MinHash
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

MINHASH_DIM = <span class="hljs-number">256</span>
HASH_BIT_WIDTH = <span class="hljs-number">64</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_minhash_signature</span>(<span class="hljs-params">text, num_perm=MINHASH_DIM</span>) -&gt; <span class="hljs-built_in">bytes</span>:
    m = MinHash(num_perm=num_perm)
    <span class="hljs-keyword">for</span> token <span class="hljs-keyword">in</span> text.lower().split():
        m.update(token.encode(<span class="hljs-string">&quot;utf8&quot;</span>))
    <span class="hljs-keyword">return</span> m.hashvalues.astype(<span class="hljs-string">&#x27;&gt;u8&#x27;</span>).tobytes()  <span class="hljs-comment"># Returns 2048 bytes</span>
<button class="copy-code-btn"></button></code></pre>
<p>Каждая подпись имеет размер 256 × 64 бита = 2048 байт. Эта байтовая строка может быть непосредственно вставлена в поле Milvus <code translate="no">BINARY_VECTOR</code>. Для получения дополнительной информации о двоичных векторах, используемых в Milvus, обратитесь к разделу <a href="/docs/ru/binary-vector.md">Двоичный вектор</a>.</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(Необязательно) Подготовка необработанных наборов токенов (для уточненного поиска)</h3><p>По умолчанию Milvus использует только сигнатуры MinHash и индекс LSH для поиска приблизительных соседей. Это быстро, но может давать ложные срабатывания или пропускать близкие совпадения.</p>
<p>Если вам нужно <strong>точное сходство по Жаккарду</strong>, Milvus поддерживает уточненный поиск, который использует исходные наборы токенов. Чтобы включить эту функцию:</p>
<ul>
<li><p>Храните наборы маркеров в отдельном поле <code translate="no">VARCHAR</code>.</p></li>
<li><p>Установите <code translate="no">&quot;with_raw_data&quot;: True</code> при <a href="/docs/ru/minhash-lsh.md#Build-index-parameters-and-create-collection">построении параметров индекса</a>.</p></li>
<li><p>И включите <code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> при <a href="/docs/ru/minhash-lsh.md#Perform-similarity-search">выполнении поиска по сходству</a>.</p></li>
</ul>
<p><strong>Пример извлечения наборов токенов</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH-in-Milvus" class="common-anchor-header">Использование MinHash LSH в Milvus<button data-href="#Use-MinHash-LSH-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Когда векторы MinHash и исходные наборы токенов готовы, вы можете хранить, индексировать и искать их в Milvus с помощью <code translate="no">MINHASH_LSH</code>.</p>
<h3 id="Connect-to-Milvus" class="common-anchor-header">Подключение к Milvus</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">Определите схему коллекции</h3><p>Определите схему с:</p>
<ul>
<li><p>Первичный ключ</p></li>
<li><p>Поле <code translate="no">BINARY_VECTOR</code> для подписей MinHash</p></li>
<li><p>Поле <code translate="no">VARCHAR</code> для исходного набора токенов (если включен уточненный поиск)</p></li>
<li><p>Опционально, поле <code translate="no">document</code> для оригинального текста.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">Построение параметров индекса и создание коллекции</h3><p>Постройте индекс <code translate="no">MINHASH_LSH</code> с включенным уточнением Жаккарда:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: HASH_BIT_WIDTH,  <span class="hljs-comment"># Must match signature bit width</span>
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">16</span>,                       <span class="hljs-comment"># Band count (128/16 = 8 hashes per band)</span>
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>                    <span class="hljs-comment"># Required for Jaccard refinement</span>
    }
)

client.create_collection(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema=schema, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительные сведения о параметрах построения индекса см. в разделе <a href="/docs/ru/minhash-lsh.md#Index-building-params">Параметры построения индекса</a>.</p>
<h3 id="Insert-data" class="common-anchor-header">Вставка данных</h3><p>Для каждого документа подготовьте:</p>
<ul>
<li><p>Двоичную подпись MinHash</p></li>
<li><p>Сериализованную строку набора маркеров</p></li>
<li><p>(Опционально) оригинальный текст</p></li>
</ul>
<pre><code translate="no" class="language-python">documents = [
    <span class="hljs-string">&quot;machine learning algorithms process data automatically&quot;</span>,
    <span class="hljs-string">&quot;deep learning uses neural networks to model patterns&quot;</span>
]

insert_data = []
<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    sig = generate_minhash_signature(doc)
    token_str = extract_token_set(doc)
    insert_data.append({
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;minhash_signature&quot;</span>: sig,
        <span class="hljs-string">&quot;token_set&quot;</span>: token_str,
        <span class="hljs-string">&quot;document&quot;</span>: doc
    })

client.insert(<span class="hljs-string">&quot;minhash_demo&quot;</span>, insert_data)
client.flush(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">Выполните поиск по сходству</h3><p>Milvus поддерживает два режима поиска сходства с использованием MinHash LSH:</p>
<ul>
<li><p><strong>Приближенный поиск</strong> - использует только сигнатуры MinHash и LSH для получения быстрых, но вероятностных результатов.</p></li>
<li><p><strong>Уточненный поиск</strong> - повторное вычисление сходства по Жаккарду с использованием исходных наборов лексем для повышения точности.</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 Подготовка запроса</h4><p>Чтобы выполнить поиск по сходству, создайте подпись MinHash для документа запроса. Эта подпись должна соответствовать той же размерности и формату кодировки, которые использовались при вставке данных.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 Приближенный поиск (только для LSH)</h4><p>Это быстрый и масштабируемый метод, но он может пропускать близкие совпадения или давать ложные срабатывания:</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params={</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>, </span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {}</span>
<span class="highlighted-comment-line">}</span>

approx_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(approx_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 Уточненный поиск (рекомендуется для повышения точности):</h4><p>Этот способ обеспечивает точное сравнение по Жаккарду, используя исходные наборы токенов, хранящиеся в Milvus. Он немного медленнее, но рекомендуется для задач, чувствительных к качеству:</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">5</span>                    <span class="hljs-comment"># Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

refined_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(refined_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">Параметры индекса<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе представлен обзор параметров, используемых для построения индекса и выполнения поиска по нему.</p>
<h3 id="Index-building-params" class="common-anchor-header">Параметры построения индекса</h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">params</code> при <a href="/docs/ru/minhash-lsh.md#Build-index-parameters-and-create-collection">построении индекса</a>.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Рекомендации по настройке</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>Битовая ширина каждого хэш-значения в сигнатуре MinHash. Должна быть кратной 8.</p></td>
     <td><p>8, 16, 32, 64</p></td>
     <td><p>Используйте <code translate="no">32</code> для достижения сбалансированной производительности и точности. Используйте <code translate="no">64</code> для повышения точности при работе с большими наборами данных. Используйте <code translate="no">16</code> для экономии памяти с приемлемой потерей точности.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>Количество полос, на которые делится сигнатура MinHash для LSH. Управляет компромиссом между отзывом и производительностью.</p></td>
     <td><p>[1, <em>signature_length</em>].</p></td>
     <td><p>Для 128-мерных сигнатур: начните с 32 полос (4 значения/полосу). Увеличивайте до 64 для повышения запоминаемости, уменьшайте до 16 для повышения производительности. Длина подписи должна делиться равномерно.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>Хранить ли хэш-коды LSH в анонимной памяти (<code translate="no">true</code>) или использовать отображение памяти (<code translate="no">false</code>).</p></td>
     <td><p>true, false</p></td>
     <td><p>Используйте <code translate="no">false</code> для больших наборов данных (&gt;1M наборов), чтобы уменьшить потребление памяти. Используйте <code translate="no">true</code> для небольших наборов данных, требующих максимальной скорости поиска.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Хранить ли оригинальные сигнатуры MinHash вместе с кодами LSH для уточнения.</p></td>
     <td><p>true, false</p></td>
     <td><p>Используйте <code translate="no">true</code>, если требуется высокая точность и стоимость хранения приемлема. Используйте <code translate="no">false</code> для минимизации затрат на хранение при небольшом снижении точности.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>Вероятность ложного срабатывания для фильтра Блума, используемого при оптимизации LSH bucket.</p></td>
     <td><p>[0.001, 0.1]</p></td>
     <td><p>Используйте <code translate="no">0.01</code>, чтобы сбалансировать использование памяти и точность. Меньшие значения (<code translate="no">0.001</code>) уменьшают количество ложных срабатываний, но увеличивают объем памяти. Более высокие значения (<code translate="no">0.05</code>) экономят память, но могут снизить точность.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Параметры поиска, специфичные для индекса</h3><p>В следующей таблице перечислены параметры, которые могут быть настроены в <code translate="no">search_params.params</code> при <a href="/docs/ru/minhash-lsh.md#Perform-similarity-search">поиске по индексу</a>.</p>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Описание</p></th>
     <th><p>Диапазон значений</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>Выполнять ли точный расчет сходства по Жаккарду для результатов-кандидатов на уточнение.</p></td>
     <td><p>true, false</p></td>
     <td><p>Используйте <code translate="no">true</code> для приложений, требующих высокой точности (например, дедупликация). Используйте <code translate="no">false</code> для более быстрого приблизительного поиска, когда небольшая потеря точности допустима.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Количество кандидатов, которые необходимо получить перед уточнением по Жаккарду. Эффективно только в том случае, если <code translate="no">mh_search_with_jaccard</code> - <code translate="no">true</code>.</p></td>
     <td><p><em>[top_k</em>, *top_k * 10*].</p></td>
     <td><p>Устанавливается в 2-5 раз больше желаемого <em>top_k</em> для хорошего баланса отзыв-производительность. Более высокие значения улучшают отзыв, но увеличивают стоимость вычислений.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>Включать ли пакетную оптимизацию для нескольких одновременных запросов.</p></td>
     <td><p>true, false</p></td>
     <td><p>Используйте <code translate="no">true</code> при одновременном поиске по нескольким запросам для повышения пропускной способности. Используйте <code translate="no">false</code> для сценариев с одним запросом, чтобы уменьшить нагрузку на память.</p></td>
   </tr>
</table>
