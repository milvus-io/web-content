---
id: basic-operators.md
summary: >-
  Milvus предоставляет богатый набор базовых операторов, которые помогут вам
  эффективно фильтровать и запрашивать данные. Эти операторы позволяют уточнять
  условия поиска на основе скалярных полей, числовых вычислений, логических
  условий и многого другого. Понимание того, как использовать эти операторы,
  очень важно для создания точных запросов и повышения эффективности поиска.
title: Основные операторы
---
<h1 id="Basic-Operators​" class="common-anchor-header">Основные операторы<button data-href="#Basic-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus предоставляет богатый набор базовых операторов, которые помогут вам эффективно фильтровать и запрашивать данные. Эти операторы позволяют уточнять условия поиска на основе скалярных полей, числовых вычислений, логических условий и многого другого. Понимание того, как использовать эти операторы, очень важно для создания точных запросов и повышения эффективности поиска.</p>
<h2 id="Comparison-operators​" class="common-anchor-header">Операторы сравнения<button data-href="#Comparison-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Операторы сравнения используются для фильтрации данных на основе равенства, неравенства или размера. Они применимы к числовым, текстовым полям и полям даты.</p>
<h3 id="Supported-Comparison-Operators​" class="common-anchor-header">Поддерживаемые операторы сравнения.</h3><ul>
<li><p><code translate="no">==</code> (Равно)</p></li>
<li><p><code translate="no">!=</code> (Не равно)</p></li>
<li><p><code translate="no">&gt;</code> (Больше, чем)</p></li>
<li><p><code translate="no">&lt;</code> (Меньше, чем)</p></li>
<li><p><code translate="no">&gt;=</code> (Больше или равно)</p></li>
<li><p><code translate="no">&lt;=</code> (Меньше или равно)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Greater-Than-or-Equal-To-​" class="common-anchor-header">Пример 1: Фильтрация с помощью Greater Than or Equal To (<code translate="no">&gt;=</code>)</h3><p>Если вы хотите найти все сущности с <code translate="no">rating</code> больше или равно 4.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Less-Than-or-Equal-To-​" class="common-anchor-header">Пример 2: Фильтрация с помощью Less Than or Equal To (<code translate="no">&lt;=</code>)</h3><p>Чтобы найти сущности с <code translate="no">discount</code> меньше или равным 10%.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators​" class="common-anchor-header">Операторы диапазона<button data-href="#Range-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Операторы диапазона помогают фильтровать данные на основе определенных наборов или диапазонов значений.</p>
<h3 id="Supported-Range-Operators​" class="common-anchor-header">Поддерживаемые операторы диапазона.</h3><ul>
<li><p><code translate="no">IN</code>: Используются для поиска значений в определенном наборе или диапазоне.</p></li>
<li><p><code translate="no">LIKE</code>: : Используется для поиска шаблона (в основном для текстовых полей).</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values​" class="common-anchor-header">Пример 1: Использование <code translate="no">IN</code> для поиска нескольких значений</h3><p>Если вы хотите найти все сущности, для которых <code translate="no">color</code> является либо &quot;красным&quot;, либо &quot;зеленым&quot;, либо &quot;синим&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Это полезно, когда нужно проверить принадлежность к списку значений.</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching​" class="common-anchor-header">Пример 2: Использование <code translate="no">LIKE</code> для сопоставления с образцом</h3><p>Оператор <code translate="no">LIKE</code> используется для поиска шаблонов в строковых полях. Он может сопоставлять подстроки в различных позициях в тексте: в качестве <strong>префикса</strong>, <strong>инфикса</strong> или <strong>суффикса</strong>. Оператор <code translate="no">LIKE</code> использует символ <code translate="no">%</code> в качестве подстановочного знака, который может соответствовать любому количеству символов (включая ноль).</p>
<h4 id="Prefix-Match-Starts-With​" class="common-anchor-header">Префиксное совпадение (начинается с)</h4><p>Чтобы выполнить <strong>префиксное</strong> совпадение, при котором строка начинается с заданного шаблона, можно поместить шаблон в начало и использовать оператор <code translate="no">%</code> для соответствия всем символам, следующим за ним. Например, чтобы найти все продукты, чье <code translate="no">name</code> начинается с &quot;Prod&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>В этом случае будет найден любой продукт, название которого начинается с &quot;Prod&quot;, например &quot;Product A&quot;, &quot;Product B&quot; и т. д.</p>
<h4 id="Suffix-Match-Ends-With​" class="common-anchor-header">Суффиксное совпадение (заканчивается на)</h4><p>Для <strong>суффиксного</strong> совпадения, когда строка заканчивается заданным шаблоном, поместите символ <code translate="no">%</code> в начало шаблона. Например, чтобы найти все продукты, чей <code translate="no">name</code> заканчивается на &quot;XYZ&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>В этом случае будет найден любой продукт, название которого заканчивается на &quot;XYZ&quot;, например &quot;ProductXYZ&quot;, &quot;SampleXYZ&quot; и т. д.</p>
<h4 id="Infix-Match-Contains​" class="common-anchor-header">Инфиксное совпадение (Contains)</h4><p>Чтобы выполнить <strong>инфиксное</strong> совпадение, при котором шаблон может встречаться в любом месте строки, вы можете поместить символ <code translate="no">%</code> как в начало, так и в конец шаблона. Например, чтобы найти все продукты, в названии которых <code translate="no">name</code> содержится слово &quot;Pro&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>В этом случае будет найден любой продукт, в названии которого содержится подстрока &quot;Pro&quot;, например &quot;Product&quot;, &quot;ProLine&quot; или &quot;SuperPro&quot;.</p>
<h2 id="Arithmetic-Operators​" class="common-anchor-header">Арифметические операторы<button data-href="#Arithmetic-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Арифметические операторы позволяют создавать условия на основе вычислений с использованием числовых полей.</p>
<h3 id="Supported-Arithmetic-Operators​" class="common-anchor-header">Поддерживаемые арифметические операторы.</h3><ul>
<li><p><code translate="no">+</code> (Сложение)</p></li>
<li><p><code translate="no">-</code> (Вычитание)</p></li>
<li><p><code translate="no">*</code> (Умножение)</p></li>
<li><p><code translate="no">/</code> (Деление)</p></li>
<li><p><code translate="no">%</code> (Модуль)</p></li>
<li><p><code translate="no">**</code> (Экспоненция)</p></li>
</ul>
<h3 id="Example-1-Using-Addition-+​" class="common-anchor-header">Пример 1: Использование сложения (<code translate="no">+</code>)</h3><p>Найти объекты, в которых цена <code translate="no">total</code> равна сумме <code translate="no">base_price</code> и <code translate="no">tax</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total == base_price + tax&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Subtraction--​" class="common-anchor-header">Пример 2: Использование вычитания (<code translate="no">-</code>)</h3><p>Найти объекты, в которых <code translate="no">quantity</code> больше 50, а <code translate="no">quantity_sold</code> меньше 30.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;quantity - quantity_sold &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-Multiplication-​" class="common-anchor-header">Пример 3: Использование умножения (<code translate="no">*</code>)</h3><p>Чтобы найти объекты, где <code translate="no">price</code> больше 100 и <code translate="no">quantity</code> больше 10, перемножьте их.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price * quantity &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Using-Division-​" class="common-anchor-header">Пример 4: Использование деления (<code translate="no">/</code>)</h3><p>Для поиска произведений, в которых <code translate="no">total_price</code>, деленное на <code translate="no">quantity</code>, меньше 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total_price / quantity &lt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Using-Modulus-​" class="common-anchor-header">Пример 5: Использование модуля (<code translate="no">%</code>)</h3><p>Для поиска объектов, в которых <code translate="no">id</code> является четным числом (т. е. кратным 2).</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Using-Exponentiation-​" class="common-anchor-header">Пример 6: Использование экспоненции (<code translate="no">**</code>)</h3><p>Для поиска сущностей, в которых <code translate="no">price</code>, возведенное в степень 2, больше 1000.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators​" class="common-anchor-header">Логические операторы<button data-href="#Logical-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Логические операторы используются для объединения нескольких условий в более сложное выражение фильтра. К ним относятся <code translate="no">AND</code>, <code translate="no">OR</code> и <code translate="no">NOT</code>.</p>
<h3 id="Supported-Logical-Operators​" class="common-anchor-header">Поддерживаемые логические операторы.</h3><ul>
<li><p><code translate="no">AND</code>: Объединяет несколько условий, которые все должны быть истинными.</p></li>
<li><p><code translate="no">OR</code>: : Комбинирует условия, из которых хотя бы одно должно быть истинным.</p></li>
<li><p><code translate="no">NOT</code>: Отрицает условие.</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions​" class="common-anchor-header">Пример 1: Использование <code translate="no">AND</code> для объединения условий</h3><p>Найти все товары, в которых <code translate="no">price</code> больше 100, а <code translate="no">stock</code> больше 50.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions​" class="common-anchor-header">Пример 2: Использование <code translate="no">OR</code> для объединения условий</h3><p>Найти все товары, для которых <code translate="no">color</code> является либо &quot;красным&quot;, либо &quot;синим&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition​" class="common-anchor-header">Пример 3: Использование <code translate="no">NOT</code> для исключения условия</h3><p>Чтобы найти все продукты, для которых <code translate="no">color</code> не является &quot;зеленым&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="IS-NULL-and-IS-NOT-NULL-Operators" class="common-anchor-header">Операторы IS NULL и IS NOT NULL<button data-href="#IS-NULL-and-IS-NOT-NULL-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Операторы <code translate="no">IS NULL</code> и <code translate="no">IS NOT NULL</code> используются для фильтрации полей на основе того, содержат ли они нулевое значение (отсутствие данных).</p>
<ul>
<li><code translate="no">IS NULL</code>: Определяет сущности, в которых определенное поле содержит нулевое значение, т. е. значение отсутствует или не определено.</li>
<li><code translate="no">IS NOT NULL</code>: Определяет сущности, в которых определенное поле содержит любое значение, отличное от null, что означает, что поле имеет действительное, определенное значение.</li>
</ul>
<div class="alert note">
<p>Операторы не зависят от регистра, поэтому вы можете использовать <code translate="no">IS NULL</code> или <code translate="no">is null</code>, а также <code translate="no">IS NOT NULL</code> или <code translate="no">is not null</code>.</p>
</div>
<h3 id="Regular-Scalar-Fields-with-Null-Values" class="common-anchor-header">Регулярные скалярные поля с нулевыми значениями</h3><p>Milvus позволяет фильтровать обычные скалярные поля, такие как строки или числа, с нулевыми значениями.</p>
<div class="alert note">
<p>Пустая строка <code translate="no">&quot;&quot;</code> не рассматривается как нулевое значение для поля VARCHAR.</p>
</div>
<p>Чтобы получить сущности, в которых поле <code translate="no">description</code> имеет нулевое значение:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы получить сущности, в которых поле <code translate="no">description</code> не является нулевым:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы получить сущности, в которых поле <code translate="no">description</code> не является нулевым, а поле <code translate="no">price</code> больше 10:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL AND price &gt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="JSON-Fields-with-Null-Values" class="common-anchor-header">Поля JSON с нулевыми значениями</h3><p>Milvus позволяет фильтровать поля JSON, содержащие нулевые значения. Поле JSON считается нулевым в следующих случаях:</p>
<ul>
<li>Весь объект JSON явно имеет значение None (null), например, <code translate="no">{&quot;metadata&quot;: None}</code>.</li>
<li>Само JSON-поле полностью отсутствует в сущности.</li>
</ul>
<div class="alert note">
<p>Если некоторые элементы в JSON-объекте являются нулевыми (например, отдельные ключи), поле все равно считается ненулевым. Например, <code translate="no">{&quot;metadata&quot;: {&quot;category&quot;: None, &quot;price&quot;: 99.99}}</code> не рассматривается как null, даже если ключ <code translate="no">category</code> является null.</p>
</div>
<p>Чтобы проиллюстрировать, как Milvus обрабатывает поля JSON с нулевыми значениями, рассмотрим следующий пример данных с полем JSON <code translate="no">metadata</code>:</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-comment"># Entire JSON object is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]
  },
  {  <span class="hljs-comment"># JSON field `metadata` is completely missing</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>}, <span class="hljs-comment"># Individual key value is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>Пример 1: Получение сущностей, для которых поле <code translate="no">metadata</code> равно null.</strong></p>
<p>Чтобы найти сущности, в которых поле <code translate="no">metadata</code> либо отсутствует, либо явно установлено значение None:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Пример 2: Получить сущности, в которых поле <code translate="no">metadata</code> не равно null</strong></p>
<p>Чтобы найти сущности, в которых поле <code translate="no">metadata</code> не является нулевым:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="ARRAY-Fields-with-Null-Values" class="common-anchor-header">Поля ARRAY с нулевыми значениями</h3><p>Milvus позволяет фильтровать поля ARRAY, содержащие нулевые значения. Поле ARRAY считается нулевым в следующих случаях:</p>
<ul>
<li>Для всего поля ARRAY явно установлено значение None (null), например, <code translate="no">&quot;tags&quot;: None</code>.</li>
<li>Поле ARRAY полностью отсутствует в сущности.</li>
</ul>
<div class="alert note">
<p>Поле ARRAY не может содержать частичные нулевые значения, так как все элементы в поле ARRAY должны иметь одинаковый тип данных. Подробнее см. в разделе <a href="/docs/ru/array_data_type.md">Поле массива</a>.</p>
</div>
<p>Чтобы проиллюстрировать, как Milvus обрабатывает поля ARRAY с нулевыми значениями, рассмотрим следующий пример данных с полем ARRAY <code translate="no">tags</code>:</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire ARRAY is null</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>]
  },
  {  <span class="hljs-comment"># The tags field is completely missing</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">9</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.23</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>Пример 1: Получение сущностей, для которых <code translate="no">tags</code> равно null.</strong></p>
<p>Чтобы получить сущности, в которых поле <code translate="no">tags</code> либо отсутствует, либо явно установлено значение None:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [4, 5], &#x27;embedding&#x27;: [0.78, 0.91, 0.23], &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [9, 5], &#x27;embedding&#x27;: [0.18, 0.11, 0.23], &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Пример 2: Получить сущности, в которых поле <code translate="no">tags</code> не равно null</strong></p>
<p>Получение сущностей, в которых поле <code translate="no">tags</code> не является нулевым:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="common-anchor-header">Советы по использованию базовых операторов с полями JSON и ARRAY<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Хотя базовые операторы в Milvus универсальны и могут применяться к скалярным полям, их также можно эффективно использовать с ключами и индексами в полях JSON и ARRAY.</p>
<p>Например, если у вас есть поле <code translate="no">product</code>, содержащее несколько ключей, таких как <code translate="no">price</code>, <code translate="no">model</code> и <code translate="no">tags</code>, всегда ссылайтесь непосредственно на ключ.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Чтобы найти записи, в которых первая температура в массиве записанных температур превышает определенное значение, используйте.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion​" class="common-anchor-header">Заключение .<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus предлагает ряд базовых операторов, которые обеспечивают гибкость при фильтрации и запросе данных. Комбинируя операторы сравнения, диапазона, арифметические и логические операторы, вы можете создавать мощные выражения фильтрации для сужения результатов поиска и эффективного извлечения нужных данных.</p>
