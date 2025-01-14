---
id: metric.md
summary: >-
  تُستخدم مقاييس التشابه لقياس أوجه التشابه بين المتجهات. يساعد اختيار مقياس
  المسافة المناسب في تحسين أداء التصنيف والتجميع بشكل كبير.
title: الأنواع المترية
---
<h1 id="Metric-Types​" class="common-anchor-header">أنواع المقاييس<button data-href="#Metric-Types​" class="anchor-icon" translate="no">
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
    </button></h1><p>تُستخدم مقاييس التشابه لقياس أوجه التشابه بين المتجهات. يساعد اختيار مقياس المسافة المناسب في تحسين أداء التصنيف والتجميع بشكل كبير.</p>
<p>يدعم ميلفوس حاليًا هذه الأنواع من مقاييس التشابه: المسافة الإقليدية (<code translate="no">L2</code>)، الضرب الداخلي (<code translate="no">IP</code>)، تشابه جيب التمام (<code translate="no">COSINE</code>)، <code translate="no">JACCARD</code> و <code translate="no">HAMMING</code> و <code translate="no">BM25</code> (المصممة خصيصًا للبحث عن النص الكامل على المتجهات المتفرقة).</p>
<p>يلخص الجدول أدناه التعيين بين أنواع الحقول المختلفة وأنواع المقاييس المقابلة لها.</p>
<table data-block-token="LHu5dKCHro3mnTx6PsmckEsinQd"><thead><tr><th data-block-token="JOJvdTK9MouhT8x7tfGc59NGnfg" colspan="1" rowspan="1"><p data-block-token="TS9tdnaJaoG4kfx96cfcqXINnnc">نوع الحقل</p>
</th><th data-block-token="Iy8ZdPGpIo6nfwxiz4RcSuwanwf" colspan="1" rowspan="1"><p data-block-token="SKIAdxDFJo9oOyxg7iTcmfGAnz1">نطاق البعد</p>
</th><th data-block-token="LkYndBOhGotOkGxsog2ciFTSnKd" colspan="1" rowspan="1"><p data-block-token="Nzcsdqt2WoZ4R5xQMT2cD0PQnAh">أنواع المقاييس المدعومة</p>
</th><th data-block-token="Hw3WdXW8UoXmZhxNbTRcMGkjnLb" colspan="1" rowspan="1"><p data-block-token="NEB5drrS2o46Z1xvxNxcfYqsnyc">نوع القياس الافتراضي</p>
</th></tr></thead><tbody><tr><td data-block-token="PGXedlNoqoilHxx2AGJc7i9mnjd" colspan="1" rowspan="1"><p data-block-token="YnSKdzakeoKzcmxFOhicXzWenEg"><code translate="no">FLOAT_VECTOR</code></p>
</td><td data-block-token="PsDDdjHs1ofQVcxorBXca4ognRh" colspan="1" rowspan="1"><p data-block-token="P8SsdIXb8oDZmcxQzhtccTM6nUd">2-32,768</p>
</td><td data-block-token="Lcd9dYDt7oQaFVxCWFFcSRtDnue" colspan="1" rowspan="1"><p data-block-token="L74NdaSY9o41qlxD7qJcIz5Lnkc"><code translate="no">COSINE</code>، <code translate="no">L2</code> ، <code translate="no">IP</code></p>
</td><td data-block-token="Ay3Fd5LNqo4RPsxuuNpck2BMnkh" colspan="1" rowspan="1"><p data-block-token="RF4udqckuoee0OxcAaqc4H7Yn7d"><code translate="no">COSINE</code></p>
</td></tr><tr><td data-block-token="XJjsdPYLAoS9UTx2dMfctcTDnGh" colspan="1" rowspan="1"><p data-block-token="Rxz7dFrd3oN2z8x9DioclY4lnNe"><code translate="no">FLOAT16_VECTOR</code></p>
</td><td data-block-token="CxFFd2zLGocDQ5x8W6KcaNsTncc" colspan="1" rowspan="1"><p data-block-token="LTFOd7WtZo7xPjxeuFcccCmynDb">2-32,768</p>
</td><td data-block-token="Tb0SdIkLyofe0rxXJCgccCePnAf" colspan="1" rowspan="1"><p data-block-token="DXJrdv7X7oJ0QVx33G3cTdJenuP"><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p>
<p data-block-token="B6K0dqXxko7EgTxgXSgcaKvPncc"></p>
</td><td data-block-token="WlU2d4iIfoPCyKx1Pmmchfi3nOl" colspan="1" rowspan="1"><p data-block-token="TlfAdhvlgoO6nIx5RWucqeAYn5c"><code translate="no">COSINE</code></p>
</td></tr><tr><td data-block-token="LWfPdDMxmoR7gtxg0SicPi5TnVe" colspan="1" rowspan="1"><p data-block-token="Cyf6dqXW7oEkzqxgNILcpn9UnPe"><code translate="no">BFLOAT16_VECTOR</code></p>
</td><td data-block-token="YUUNdZ8b0oZyt3xWiTMcPiJxnKe" colspan="1" rowspan="1"><p data-block-token="VLFCdAKmhoPiKUxp3Aoc1q8enhd">2-32,768</p>
</td><td data-block-token="DV93ds317o3UmgxWZbicIJJsnSd" colspan="1" rowspan="1"><p data-block-token="ENpydUfyRokNyHxwdTJc54URndb"><code translate="no">COSINE</code> <code translate="no">L2</code>, <code translate="no">IP</code></p>
</td><td data-block-token="MnocdwigMoBJGZxnAl5c8g7Qnbd" colspan="1" rowspan="1"><p data-block-token="Jzz7dJBY9ory41xD3becoMuLnRg"><code translate="no">COSINE</code></p>
</td></tr><tr><td data-block-token="J3qEdX4N3o0H0nx3ikbcMGWRnLc" colspan="1" rowspan="1"><p data-block-token="HHdzdnRTXo3sdfxLju9cWEwYnId"><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
</td><td data-block-token="Swg5dVhAboemtgx5lDKcYKBSnFb" colspan="1" rowspan="1"><p data-block-token="NqC6dpCgooBUS9xqTlJcUnwbnUc">لا حاجة لتحديد البُعد</p>
</td><td data-block-token="Kh3vdZtdoo4ebbxhpl6cYdcZnZc" colspan="1" rowspan="1"><p data-block-token="VwY7dNaLhowsXOxhPN5cMg8ln3d"><code translate="no">IP</code>، <code translate="no">BM25</code> (يستخدم فقط للبحث في النص الكامل)</p>
</td><td data-block-token="RZWudPDO8oGzo9xrouncv8PXnch" colspan="1" rowspan="1"><p data-block-token="MrWddDR0soeonBxXTQAcY9G5nph"><code translate="no">IP</code></p>
</td></tr><tr><td data-block-token="Qh9YdBV0yocP8Ux1GZzctRcinwh" colspan="1" rowspan="1"><p data-block-token="BP0ddwawMoxoF9xKhBjcNH4jnPr"><code translate="no">BINARY_VECTOR</code></p>
</td><td data-block-token="RnLodmlT3oe8tgxFrPrcqPD6nEb" colspan="1" rowspan="1"><p data-block-token="CFw8dmfgcoubhZxpxB7cLlp6ntb">8-32,768*8</p>
<p data-block-token="ETORduKnPojEq3xweqhc4fBJnkd"></p>
</td><td data-block-token="H5jdd6wKZofy9zxiu88cMrLVn5d" colspan="1" rowspan="1"><p data-block-token="OQDIdyEtKo1dArxPWdEcdX1znZd"><code translate="no">HAMMING</code> <code translate="no">JACCARD</code></p>
</td><td data-block-token="QJBadzeQRox54VxflTLcYRO5nsj" colspan="1" rowspan="1"><p data-block-token="CYUNdJmCCoqr0ux0qF5cFLlRnWf"><code translate="no">HAMMING</code></p>
</td></tr></tbody></table>
<div class="alert note">
<ul>
<li><p>بالنسبة للحقول المتجهة من النوع <code translate="no">SPARSE_FLOAT_VECTOR</code> ، استخدم النوع المتري <code translate="no">BM25</code> فقط عند إجراء بحث بالنص الكامل. لمزيد من المعلومات، راجع <a href="/docs/ar/full-text-search.md">البحث</a> عن <a href="/docs/ar/full-text-search.md">النص الكامل</a>.</p></li>
<li><p>بالنسبة للحقول المتجهة من النوع <code translate="no">BINARY_VECTOR</code> ، يجب أن تكون قيمة البُعد (<code translate="no">dim</code>) من مضاعفات العدد 8. </p></li>
</ul>
</div>
<p>يلخص الجدول أدناه خصائص قيم مسافة التشابه لجميع أنواع المقاييس المدعومة ونطاق قيمها.</p>
<table data-block-token="EOgLdu5WdoBkLqxmYIfcYGkinLd"><thead><tr><th data-block-token="NQdRdW2N9oqzaox1LHdcqs62n2f" colspan="1" rowspan="1"><p data-block-token="Roy2d7WW8oQyy1x21MUc4xbfnyf">نوع المقياس</p>
</th><th data-block-token="UgmddW6X6oP1S0xFq3QcPtUznYf" colspan="1" rowspan="1"><p data-block-token="Or5LdW0KPodlWixinL6cWsJ4nTd">خصائص قيم مسافات التشابه في المسافة</p>
</th><th data-block-token="A6aTdLiwpoZiTOxOKDKcUV3Ynpe" colspan="1" rowspan="1"><p data-block-token="NZAWdu38do5mYUxFV2ac4woBnLh">نطاق قيمة مسافة التشابه</p>
</th></tr></thead><tbody><tr><td data-block-token="WueMdzdxZoPUMaxYFXccfNq3nQc" colspan="1" rowspan="1"><p data-block-token="JZA4dYZYtoqYXZxXskKcm0bSnrc"><code translate="no">L2</code></p>
</td><td data-block-token="U4sEdyrLPo11oxxeK1OcsAYGnMc" colspan="1" rowspan="1"><p data-block-token="GYLzdsePwohWbzxQu9ecqLswnqc">تشير القيمة الأصغر إلى تشابه أكبر.</p>
</td><td data-block-token="NuIIdRT0Vo0ReDx4YxCcrSr1nvg" colspan="1" rowspan="1"><p data-block-token="UmPHdRRIYokZGPxobbZc3gG0nZe">[0, ∞)</p>
</td></tr><tr><td data-block-token="VZPGde4XnokxQWxwZkXcbj4pnnh" colspan="1" rowspan="1"><p data-block-token="YKbidfE52o82EyxLTxPcsYyWn7c"><code translate="no">IP</code></p>
</td><td data-block-token="FLsidgKBYoYSIPxLL6hceY6Unug" colspan="1" rowspan="1"><p data-block-token="P209de8x5oXJ6XxlZxPcA0o6n8d">تشير القيمة الأكبر إلى تشابه أكبر.</p>
</td><td data-block-token="Eqg9d7C9CodcAbxKTH8cFl01nbe" colspan="1" rowspan="1"><p data-block-token="T4dRd7qEmoRCmFxlIpkcwXg3nLf">[-1, 1]</p>
</td></tr><tr><td data-block-token="O999dQ01qoPM8axWJEIcQ7fAnlh" colspan="1" rowspan="1"><p data-block-token="KkA6dbEEMowdOaxqtsMcz4sInQd"><code translate="no">COSINE</code></p>
</td><td data-block-token="UxNzdl0UboEmoqx85QIcbJWxncb" colspan="1" rowspan="1"><p data-block-token="FqPRdMe3uoZIbVxopxkcVIy2nef">تشير القيمة الأكبر إلى تشابه أكبر.</p>
</td><td data-block-token="RUo6dZMMooT6PHxaG7LcCHfhnHh" colspan="1" rowspan="1"><p data-block-token="GfXAduI1KoPjPSxfKslcf7jJnDY">[-1, 1]</p>
</td></tr><tr><td data-block-token="ZvJ8dlR2coPDm6x5MHkcxHLQnPe" colspan="1" rowspan="1"><p data-block-token="KARBdYWDmovd7SxYV1vcEUNAn7F"><code translate="no">JACCARD</code></p>
</td><td data-block-token="Aq8Cd7Awao5IhExSnUjcUzRxndh" colspan="1" rowspan="1"><p data-block-token="AMbXd3nwLoHalMx3h0pc63i9nNg">تشير القيمة الأصغر إلى تشابه أكبر.</p>
</td><td data-block-token="ULaFdvx0WoKy4rxBgPzciLZMnFg" colspan="1" rowspan="1"><p data-block-token="Je5xdsfnvoQli3xdODDchYMkn2e">[0, 1]</p>
</td></tr><tr><td data-block-token="L5l6dqaAVoVpSJxFW5TcZlXLnAc" colspan="1" rowspan="1"><p data-block-token="JOcmdIWTUoZuoGxoToYcMLpLnMg"><code translate="no">HAMMING</code></p>
</td><td data-block-token="H3vYdaah4oWsXmxmABOcW01XnSh" colspan="1" rowspan="1"><p data-block-token="VHz5d7R91o3OGuxX39Bc76CTnGf">تشير القيمة الأصغر إلى تشابه أكبر.</p>
</td><td data-block-token="NZnwdhAGUoO0R9x9gz6cZfCYnOd" colspan="1" rowspan="1"><p data-block-token="Xk7wdBDlko6RjFxVnATcPYTjnsb">[0، خافت (متجه)]</p>
</td></tr><tr><td data-block-token="Xm5BdUTvXoPS1Xxtc26cBqAWn9e" colspan="1" rowspan="1"><p data-block-token="FoMadsBCboAKV2xofQ2c9IiKntb"><code translate="no">BM25</code></p>
</td><td data-block-token="OHEldDxlaoejYmxXgUPcbwCYn4b" colspan="1" rowspan="1"><p data-block-token="EVzLdJPQdopf2mxZ3dfcTGSgnSc">تسجيل درجة الصلة استنادًا إلى تكرار المصطلح وتكرار المستند المقلوب وتطبيع المستند.</p>
</td><td data-block-token="KNCEd8WTioQbwnxmHzNcpHkHnzf" colspan="1" rowspan="1"><p data-block-token="RVtVda2Ozo1N5ixO0oucju5FnWh">[0, ∞)</p>
<p data-block-token="MQ5RdcTC1oIZC5x4d7xc2M56nId"></p>
</td></tr></tbody></table>
<h2 id="Euclidean-distance-L2​" class="common-anchor-header">المسافة الإقليدية (L2)<button data-href="#Euclidean-distance-L2​" class="anchor-icon" translate="no">
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
    </button></h2><p>بشكل أساسي، تقيس المسافة الإقليدية طول القطعة التي تربط بين نقطتين.</p>
<p>فيما يلي صيغة المسافة الإقليدية.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/euclidean_metric.png" alt="Euclidean distance formula" class="doc-image" id="euclidean-distance-formula" />
   </span> <span class="img-wrapper"> <span>صيغة المسافة الإقليدية</span> </span></p>
<p>حيث <strong>a = (<sub>a0،</sub><sub>a1،</sub>...،...،<sub>an-1</sub>)</strong> و <strong>b = (<sub>b0،</sub><sub>b1،</sub>...،...، <sub>bn-1</sub>)</strong> نقطتان في الفضاء الإقليدي ن في الفضاء الإقليدي.</p>
<p>إنه مقياس المسافة الأكثر استخدامًا وهو مفيد جدًا عندما تكون البيانات متصلة.</p>
<div class="alert note">
<p>يحسب ميلفوس القيمة فقط قبل تطبيق الجذر التربيعي عند اختيار المسافة الإقليدية كمقياس للمسافة.</p>
</div>
<h2 id="Inner-product-IP​" class="common-anchor-header">الضرب الداخلي (IP)<button data-href="#Inner-product-IP​" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم تعريف المسافة IP بين تضمينينين على النحو التالي.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IP_formula.png" alt="Inner product formula" class="doc-image" id="inner-product-formula" />
   </span> <span class="img-wrapper"> <span>صيغة الضرب الداخلي</span> </span></p>
<p>يكون IP أكثر فائدة إذا كنت بحاجة إلى مقارنة بيانات غير طبيعية أو عندما تهتم بالمقدار والزاوية.</p>
<div class="alert note">
<p>إذا كنت تستخدم IP لحساب أوجه التشابه بين التضمينات، فيجب عليك تطبيع التضمينات. بعد التطبيع، يساوي حاصل الضرب الداخلي تشابه جيب التمام.</p>
</div>
<p>لنفترض أن X' تم تطبيعه من تضمين X.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalize_formula.png" alt="Normalized inner product formula" class="doc-image" id="normalized-inner-product-formula" />
   </span> <span class="img-wrapper"> <span>صيغة الضرب الداخلي الطبيعي</span> </span></p>
<p>يكون الارتباط بين التضمينين على النحو التالي.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalization_formula.png" alt="Correlation between embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>الارتباط بين التضمينين</span> </span></p>
<h2 id="Cosine-similarity-​" class="common-anchor-header">تشابه جيب التمام<button data-href="#Cosine-similarity-​" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم تشابه جيب التمام جيب تمام الزاوية بين مجموعتين من المتجهات لقياس مدى تشابههما. يمكنك التفكير في مجموعتي المتجهات على أنهما قطعتان مستقيمتان تبدآن من نفس النقطة، مثل [0،0،...]، لكنهما تشيران في اتجاهين مختلفين.</p>
<p>لحساب التشابه في جيب التمام بين مجموعتين من المتجهات <strong>A = (<sub>a0،</sub><sub>a1،</sub>...،<sub>an-1</sub>)</strong> <strong>وB = (<sub>b0،</sub><sub>b1،</sub>...، <sub>bn-1</sub>)</strong>، استخدم الصيغة التالية.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cosine_similarity.png" alt="Cosine similarity formula" class="doc-image" id="cosine-similarity-formula" />
   </span> <span class="img-wrapper"> <span>صيغة تشابه جيب التمام</span> </span></p>
<p>يكون تشابه جيب التمام دائمًا في الفترة <strong>[-1، 1]</strong>. على سبيل المثال، متجهان متناسبان يكون تشابه جيب التمام بينهما يساوي <strong>1،</strong> ومتجهان متعامدان يكون التشابه بينهما يساوي <strong>0،</strong> ومتجهان متعاكسان يكون التشابه بينهما يساوي <strong>-1</strong>. كلما كان جيب التمام أكبر، كانت الزاوية بين المتجهين أصغر، ما يشير إلى أن هذين المتجهين متشابهان أكثر تشابهًا مع بعضهما البعض.</p>
<p>بطرح التشابه في جيب التمام من 1، يمكنك الحصول على مسافة جيب التمام بين المتجهين.</p>
<h2 id="JACCARD-distance​" class="common-anchor-header">مسافة JACCARD<button data-href="#JACCARD-distance​" class="anchor-icon" translate="no">
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
    </button></h2><p>يقيس معامل التشابه JACCARD التشابه بين مجموعتين من العينات، ويُعرَّف بأنه مقدار التشابه بين مجموعتين محددتين مقسومًا على مقدار التشابه بين مجموعتين محددتين. لا يمكن تطبيقه إلا على مجموعات العينات المحدودة.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/jaccard_coeff.png" alt="JACCARD similarity coefficient formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>صيغة معامل التشابه JACCARD</span> </span></p>
<p>تقيس المسافة JACCARD التباين بين مجموعات البيانات، ويتم الحصول عليها بطرح معامل تشابه JACCARD من 1. بالنسبة للمتغيرات الثنائية، تعادل المسافة JACCARD معامل تانيموتو.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/jaccard_dist.png" alt="JACCARD distance formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>صيغة مسافة JACCARD</span> </span></p>
<h2 id="HAMMING-distance​" class="common-anchor-header">مسافة هامينج<button data-href="#HAMMING-distance​" class="anchor-icon" translate="no">
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
    </button></h2><p>تقيس مسافة HAMMING سلاسل البيانات الثنائية. المسافة بين سلسلتين متساويتين في الطول هي عدد مواضع البتات التي تختلف عندها البتات.</p>
<p>على سبيل المثال، لنفترض أن هناك سلسلتين، 1101 1001 و1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. وبما أن هذا يحتوي على اثنين من 1، فإن المسافة بين السلسلتين هي د (11011001، 10011101) = 2.</p>
<h2 id="BM25-similarity​" class="common-anchor-header">تشابه BM25<button data-href="#BM25-similarity​" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 هي طريقة قياس صلة النص المستخدمة على نطاق واسع، وهي مصممة خصيصًا <a href="/docs/ar/full-text-search.md">للبحث في النص الكامل</a>. وهي تجمع بين العوامل الرئيسية الثلاثة التالية.</p>
<ul>
<li><p><strong>تردد المصطلح (TF):</strong> يقيس مدى تكرار ظهور المصطلح في المستند. في حين أن الترددات الأعلى غالبًا ما تشير إلى أهمية أكبر، يستخدم BM25 معامل التشبع k1 لمنع المصطلحات المتكررة بشكل مفرط من الهيمنة على درجة الصلة.</p></li>
<li><p><strong>تردد المستند العكسي (IDF):</strong> يعكس أهمية المصطلح عبر المجموعة بأكملها. وتحصل المصطلحات التي تظهر في عدد أقل من المستندات على قيمة أعلى لتكرار المستند (IDF)، مما يشير إلى مساهمة أكبر في الأهمية.</p></li>
<li><p><strong> <strong>تطبيع</strong> طول المستند:</strong> تميل المستندات الأطول إلى الحصول على درجات أعلى بسبب احتوائها على مصطلحات أكثر. يخفف BM25 من هذا التحيز من خلال تطبيع أطوال المستندات، حيث يتحكم المعامل b في قوة هذا التطبيع.</p></li>
</ul>
<p>يتم حساب درجة BM25 على النحو التالي.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/bm25.png" alt="BM25 similarity formula" class="doc-image" id="bm25-similarity-formula" />
   </span> <span class="img-wrapper"> <span>معادلة تشابه BM25</span> </span></p>
<p>وصف المعلمة.</p>
<ul>
<li><p><code translate="no">​Q</code>: نص الاستعلام المقدم من المستخدم.</p></li>
<li><p><code translate="no">​D</code>: المستند الذي يتم تقييمه.</p></li>
<li><p><code translate="no">​TF(qi​,D)</code>: تكرار المصطلح الذي يمثل عدد مرات ظهور المصطلح <code translate="no">​qi</code> في المستند <code translate="no">​D</code>.</p></li>
<li><p><code translate="no">​IDF(qi​)</code>: : تردد المستند العكسي، محسوبًا على النحو التالي.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/idf.png" alt="IDF formula" class="doc-image" id="idf-formula" />
   </span> <span class="img-wrapper"> <span>صيغة IDF</span> </span></p>
<p>حيث <code translate="no">​N</code> هو العدد الإجمالي للمستندات في مجموعة المستندات، و <code translate="no">​n(qi​)</code> هو عدد المستندات التي تحتوي على المصطلح qi.</p></li>
<li><p><code translate="no">​∣D∣</code>: طول المستند <code translate="no">​D</code> (إجمالي عدد المصطلحات).</p></li>
<li><p><code translate="no">​avgdl</code>: متوسط طول جميع المستندات في المجموعة.</p></li>
<li><p><code translate="no">​k1​</code>: يتحكم في تأثير تكرار المصطلح على النتيجة. تزيد القيم الأعلى من أهمية تكرار المصطلح. النطاق النموذجي هو [1.2، 2.0]، بينما يسمح ميلفوس بنطاق [0، 3].</p></li>
<li><p><code translate="no">​b</code>: يتحكم في درجة تطبيع الطول، وتتراوح من 0 إلى 1. عندما تكون القيمة 0، لا يتم تطبيق أي تطبيع؛ وعندما تكون القيمة 1، يتم تطبيق التطبيع الكامل.</p></li>
</ul>
<p></p>
