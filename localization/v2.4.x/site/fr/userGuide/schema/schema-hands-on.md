---
id: schema-hands-on.md
title: Conception de schémas Pratique
summary: >-
  Milvus prend en charge la définition du modèle de données par le biais d'un
  schéma de collection. Une collection organise les données non structurées
  telles que le texte et les images, ainsi que leurs représentations
  vectorielles, y compris les vecteurs denses et épars dans diverses précisions
  utilisées pour la recherche sémantique. En outre, Milvus prend en charge le
  stockage et le filtrage de types de données non vectorielles appelés "Scalar".
  Les types scalaires comprennent BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR,
  JSON et Array.
---
<h1 id="Schema-Design-Hands-On​" class="common-anchor-header">Conception de schémas Pratique<button data-href="#Schema-Design-Hands-On​" class="anchor-icon" translate="no">
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
    </button></h1><p>Les systèmes de recherche d'information (RI), également connus sous le nom de recherche, sont essentiels pour diverses applications d'IA telles que la génération augmentée par la recherche (RAG), la recherche d'images et la recommandation de produits. La première étape du développement d'un système de RI consiste à concevoir le modèle de données, ce qui implique d'analyser les besoins de l'entreprise, de déterminer comment organiser les informations et d'indexer les données pour les rendre sémantiquement consultables.</p>
<p>Milvus prend en charge la définition du modèle de données par le biais d'un schéma de collection. Une collection organise les données non structurées telles que le texte et les images, ainsi que leurs représentations vectorielles, y compris les vecteurs denses et épars dans diverses précisions utilisées pour la recherche sémantique. En outre, Milvus prend en charge le stockage et le filtrage de types de données non vectorielles appelés &quot;Scalar&quot;. Les types scalaires comprennent BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON et Array.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/schema-hands-on.png" alt="Example data schema designed for searching news article" class="doc-image" id="example-data-schema-designed-for-searching-news-article" />
   </span> <span class="img-wrapper"> <span>Exemple de schéma de données conçu pour la recherche d'articles d'actualité</span> </span></p>
<p>La conception du modèle de données d'un système de recherche implique l'analyse des besoins de l'entreprise et l'abstraction des informations dans un modèle de données exprimé par un schéma. Par exemple, pour rechercher un morceau de texte, il faut l'&quot;indexer&quot; en convertissant la chaîne littérale en un vecteur par &quot;encastrement&quot;, ce qui permet la recherche vectorielle. Au-delà de cette exigence de base, il peut être nécessaire de stocker d'autres propriétés telles que l'horodatage de la publication et l'auteur. Ces métadonnées permettent d'affiner les recherches sémantiques par filtrage, en ne renvoyant que les textes publiés après une date spécifique ou par un auteur particulier. Il peut également être nécessaire de les récupérer avec le texte principal, afin de restituer le résultat de la recherche dans l'application. Pour organiser ces éléments de texte, il convient d'attribuer à chacun un identifiant unique, exprimé sous la forme d'un nombre entier ou d'une chaîne de caractères. Ces éléments sont essentiels pour parvenir à une logique de recherche sophistiquée.</p>
<p>Un schéma bien conçu est important car il abstrait le modèle de données et détermine si les objectifs de l'entreprise peuvent être atteints par le biais de la recherche. En outre, étant donné que chaque ligne de données insérée dans la collection doit respecter le schéma, celui-ci contribue grandement à maintenir la cohérence des données et la qualité à long terme. D'un point de vue technique, un schéma bien défini permet un stockage des données en colonnes bien organisé et une structure d'index plus propre, ce qui peut améliorer les performances de recherche.</p>
<h1 id="An-Example-News-Search​" class="common-anchor-header">Un exemple : Recherche d'actualités<button data-href="#An-Example-News-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>Supposons que nous voulions créer un moteur de recherche pour un site web d'actualités et que nous disposions d'un corpus d'actualités contenant du texte, des vignettes et d'autres métadonnées. Tout d'abord, nous devons analyser la manière dont nous voulons utiliser les données pour répondre aux besoins de recherche de l'entreprise. Imaginons qu'il s'agisse d'extraire les nouvelles sur la base de l'image de la vignette et du résumé du contenu, et de prendre les métadonnées telles que les informations sur l'auteur et l'heure de publication comme critères pour filtrer le résultat de la recherche. Ces exigences peuvent être décomposées comme suit.</p>
<ul>
<li><p>Pour rechercher des images par le biais du texte, nous pouvons intégrer des images dans des vecteurs grâce à un modèle d'intégration multimodale qui peut mettre en correspondance des données textuelles et des données d'image dans le même espace latent.</p></li>
<li><p>Le résumé d'un article est intégré dans des vecteurs par le biais d'un modèle d'intégration de texte.</p></li>
<li><p>Pour filtrer sur la base de l'heure de publication, les dates sont stockées sous la forme d'un champ scalaire et un index est nécessaire pour le champ scalaire afin d'assurer un filtrage efficace. D'autres structures de données plus complexes, telles que JSON, peuvent être stockées dans un scalaire et une recherche filtrée peut être effectuée sur leur contenu (l'indexation de JSON est une fonctionnalité à venir).</p></li>
<li><p>Pour récupérer les octets de la vignette de l'image et l'afficher sur la page de résultats de la recherche, l'url de l'image est également stockée. Il en va de même pour le texte et le titre du résumé. (Nous pourrions également stocker le texte brut et les données du fichier image sous forme de champs scalaires si nécessaire).</p></li>
<li><p>Pour améliorer le résultat de la recherche sur le texte résumé, nous concevons une approche de recherche hybride. Pour un chemin de recherche, nous utilisons un modèle d'intégration régulier pour générer un vecteur dense à partir du texte, tel que le modèle <code translate="no">text-embedding-3-large</code> d'OpenAI ou le modèle open-source <code translate="no">bge-large-en-v1.5</code>. Ces modèles représentent bien la sémantique globale du texte. L'autre voie consiste à utiliser des modèles d'intégration clairsemés tels que BM25 ou SPLADE pour générer un vecteur clairsemé, ressemblant à la recherche en texte intégral, qui permet de saisir les détails et les concepts individuels dans le texte. Milvus permet d'utiliser les deux dans la même collecte de données grâce à sa fonction multi-vecteur. La recherche sur plusieurs vecteurs peut être effectuée en une seule opération <code translate="no">hybrid_search()</code>.</p></li>
<li><p>Enfin, nous avons également besoin d'un champ ID pour identifier chaque page d'information individuelle, formellement appelée "entité" dans la terminologie Milvus. Ce champ est utilisé comme clé primaire (ou "pk" en abrégé).</p></li>
</ul>
<table data-block-token="EOxnd1GqhoODuWx4UyucOMahn0e"><thead><tr><th data-block-token="P2g0djnY5oRKT7xw7aSceiaQnRb" colspan="1" rowspan="1"><p data-block-token="TrIsdjxzooLqxUxiqkTcfN5pnHd">Nom du champ</p>
</th><th data-block-token="KVq4dDr4BovOHSxtWd5cZBnnnn5" colspan="1" rowspan="1"><p data-block-token="D9uYdwp8ToHqXmxqueVcBAi2n6b">article_id (clé primaire)</p>
</th><th data-block-token="O6jTdN4rBouwtQxFNgpcM7GFnyp" colspan="1" rowspan="1"><p data-block-token="IJuldjRIeoNHRgx0ix5c2eBSn6f">titre</p>
</th><th data-block-token="V4EKdYzLqoENTTxXuOwcVTIGnLg" colspan="1" rowspan="1"><p data-block-token="Tldydg7BboZeSUxiaTfcUnsfnqd">author_info</p>
</th><th data-block-token="GHF6dqGRVoQ6Kpxv9tUcijFXnVc" colspan="1" rowspan="1"><p data-block-token="Ih0jdg4yToRJOkxyriwcKJ39nVd">publish_ts</p>
</th><th data-block-token="Ui3ldA2BwovU8LxMHcIcrmVvnLg" colspan="1" rowspan="1"><p data-block-token="PJGJdX1efoo647xvgCDcuhkznye">image_url</p>
</th><th data-block-token="VCskd6ySvocz8IxF5CVcpmF5n0b" colspan="1" rowspan="1"><p data-block-token="Cx7idKjgYoctpYxsnskc7OD0nxb">vecteur_image</p>
</th><th data-block-token="WSbhdTqglocn3KxpvBscFOh2n6d" colspan="1" rowspan="1"><p data-block-token="Q16ods013oZUOQxk9vicK0JGn2e">résumé</p>
</th><th data-block-token="T5HAdXwado1qJpxCpf9cwDjmnhe" colspan="1" rowspan="1"><p data-block-token="ZG3odG5k2oMqFSxM8TFcE8kZnCh">vecteur_dense_résumé</p>
</th><th data-block-token="MWAHdYgIvogpIfxsRnscz5WWnOe" colspan="1" rowspan="1"><p data-block-token="MeU1dGziaodmTkxc5q9cvYR9ndd">résumé_vecteur_sparse</p>
</th></tr></thead><tbody><tr><td data-block-token="V1x7d7y15oxxNSxpvRJcoW7VnWh" colspan="1" rowspan="1"><p data-block-token="X9old4LgooPgrexElIBc2JgNnac">Type d'image</p>
</td><td data-block-token="EWlPdiRtBoqrOYxLoWDcnPUQn3f" colspan="1" rowspan="1"><p data-block-token="TtABd1mq0o2ShTxtXfncI8i9n8g">INT64</p>
</td><td data-block-token="ZICad5qEYohcTvxo477cZIWInCh" colspan="1" rowspan="1"><p data-block-token="CBHWdVhLKo2wn1xR3Pocf43NnRs">VARCHAR</p>
</td><td data-block-token="VTwJdpuQboqurJxXbQUctG8fnNc" colspan="1" rowspan="1"><p data-block-token="OI1ldgzbAoEIOUx7boRcooR0nvb">JSON</p>
</td><td data-block-token="UVWKdd69Mo8hyyxOqLLcZn7kncc" colspan="1" rowspan="1"><p data-block-token="QJUZdxgzEora0PxAxf8c1axknbp">INT32</p>
</td><td data-block-token="Wf8AdfYj1on0OkxjHkocPiqInYe" colspan="1" rowspan="1"><p data-block-token="KE0QdVg3doF05Exq3fmccqOcnvc">VARCHAR</p>
</td><td data-block-token="JVHgd9P9aoSl9mxqoFfcM7ownXz" colspan="1" rowspan="1"><p data-block-token="TwotdcMshoE2TSxGIauclTZjnLh">FLOAT_VECTOR</p>
</td><td data-block-token="MUwwdyV4co3V2QxOxc1cMuD9nbc" colspan="1" rowspan="1"><p data-block-token="RpfxdP0AHoW0xhx8sfBclJvtnyc">VARCHAR</p>
</td><td data-block-token="P4bqdeIGOoV67FxhYmtclfBpn1d" colspan="1" rowspan="1"><p data-block-token="RyztdWGXzoP4IBxHd8Pcu0q2nbe">FLOAT_VECTOR</p>
</td><td data-block-token="AtJldXTWUoT5FPxY6EncUqWsnrc" colspan="1" rowspan="1"><p data-block-token="FJMJdqKeFodc73xGlnpcYgJanWg">SPARSE_FLOAT_VECTOR</p>
</td></tr><tr><td data-block-token="ZAKYdJAv6oj5IxxYUaUcLFOEnkh" colspan="1" rowspan="1"><p data-block-token="Frr0dWnzWo5UFDxLfqaceqvSnmg">Indice de besoin</p>
</td><td data-block-token="ONHadATa9ojiwAxEwUdcaJpOnbb" colspan="1" rowspan="1"><p data-block-token="ZGT8dgMGbo8r22xpFztcycKDn9c">N</p>
</td><td data-block-token="E3Hod6CkXozMt4x0xF6cPkdin4e" colspan="1" rowspan="1"><p data-block-token="Ha0PdI0byocer9xXJGac8QYdnPg">N</p>
</td><td data-block-token="NaJ5dcptooRPe8xk9VTcx6Amnld" colspan="1" rowspan="1"><p data-block-token="U57edD6zqoPY7LxQjPDcnNDVnxc">N (support à venir)</p>
</td><td data-block-token="MqejdtkWboMHmZxWWCAcK7X0n1e" colspan="1" rowspan="1"><p data-block-token="NeNJdcEvloQ4E7xN9JeczCORnQX">Y</p>
</td><td data-block-token="VKy3driI9owHhCx1l4Iczj8Hnkb" colspan="1" rowspan="1"><p data-block-token="QRWQdK0J3oWYc0x8xT6c4Me5nXb">N</p>
</td><td data-block-token="EZR0dRNXpotMtdxAKG9cHj8zn2c" colspan="1" rowspan="1"><p data-block-token="LTyRduM2FoGmkVxa1HgceBFbnKf">Y</p>
</td><td data-block-token="W3MydyW7bod6UaxdNURcqTnBnFb" colspan="1" rowspan="1"><p data-block-token="EwbCdu2ZZop4zJxbyhZcR2HunUh">N</p>
</td><td data-block-token="XQdvd35mVov5cUxstzpcipmlni8" colspan="1" rowspan="1"><p data-block-token="SJoudzWmiouT20xXCCpcQR1Mnsz">Y</p>
</td><td data-block-token="MXntdRmaUo91QoxGeNgc9goanee" colspan="1" rowspan="1"><p data-block-token="Sxfzdk7VoocU6kxAV63cI3ObnTe">Y</p>
</td></tr></tbody></table>
<h1 id="How-to-Implement-the-Example-Schema​" class="common-anchor-header">Comment mettre en œuvre l'exemple de schéma<button data-href="#How-to-Implement-the-Example-Schema​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Create-Schema​" class="common-anchor-header">Création du schéma<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous commençons par créer une instance de client Milvus, qui peut être utilisée pour se connecter au serveur Milvus et gérer les collections et les données. </p>
<p>Pour configurer un schéma, nous utilisons <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> pour créer un objet schéma et <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> pour ajouter des champs au schéma.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>​
​
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)​</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)​
​
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR,  max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<p>Vous remarquerez peut-être l'argument <code translate="no">uri</code> dans <code translate="no">MilvusClient</code>, qui est utilisé pour se connecter au serveur Milvus. Vous pouvez définir les arguments comme suit.</p>
<ul>
<li><p>Si vous n'avez besoin d'une base de données vectorielle locale que pour des données à petite échelle ou des prototypes, définir l'uri comme un fichier local, par exemple<code translate="no">./milvus.db</code>, est la méthode la plus pratique, car elle utilise automatiquement <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> pour stocker toutes les données dans ce fichier.</p></li>
<li><p>Si vous disposez de données à grande échelle, par exemple plus d'un million de vecteurs, vous pouvez configurer un serveur Milvus plus performant sur <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>. Dans cette configuration, veuillez utiliser l'adresse et le port du serveur comme uri, par exemple<code translate="no">http://localhost:19530</code>. Si vous activez la fonction d'authentification sur Milvus, utilisez "&lt;votre_nom_d'utilisateur&gt;:&lt;votre_mot_de_passe&gt;" comme jeton, sinon ne définissez pas le jeton.</p></li>
<li><p>Si vous utilisez <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, le service en nuage entièrement géré pour Milvus, ajustez les adresses <code translate="no">uri</code> et <code translate="no">token</code>, qui correspondent au <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">point de terminaison public et à la clé API</a> dans Zilliz Cloud.</p></li>
</ul>
<p>Comme pour <code translate="no">auto_id</code> dans <code translate="no">MilvusClient.create_schema</code>, AutoID est un attribut du champ primaire qui détermine s'il faut activer l'incrémentation automatique pour le champ primaire.  Comme nous avons défini le champ<code translate="no">article_id</code> comme clé primaire et que nous voulons ajouter l'identifiant de l'article manuellement, nous avons défini <code translate="no">auto_id</code> False pour désactiver cette fonctionnalité.</p>
<p>Après avoir ajouté tous les champs à l'objet schéma, notre objet schéma correspond aux entrées du tableau ci-dessus.</p>
<h2 id="Define-Index​" class="common-anchor-header">Définir l'index<button data-href="#Define-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir défini le schéma avec différents champs, y compris les métadonnées et les champs vectoriels pour les images et les données de synthèse, l'étape suivante consiste à préparer les paramètres de l'index. L'indexation est cruciale pour optimiser la recherche et l'extraction des vecteurs, en garantissant des performances de requête efficaces. Dans la section suivante, nous allons définir les paramètres d'indexation pour les champs vectoriels et scalaires spécifiés dans la collection.</p>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,​
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Une fois les paramètres d'index configurés et appliqués, Milvus est optimisé pour traiter les requêtes complexes sur les données vectorielles et scalaires. Cette indexation améliore les performances et la précision des recherches de similarité dans la collection, permettant une récupération efficace des articles basés sur les vecteurs d'image et les vecteurs de résumé. En tirant parti de l'indexation <a href="https://milvus.io/docs/glossary.md#Auto-Index"><code translate="no">AUTOINDEX</code></a> pour les vecteurs denses, le <a href="https://milvus.io/docs/sparse_vector.md#Index-the-collection"><code translate="no">SPARSE_INVERTED_INDEX</code></a> pour les vecteurs épars et la fonction <a href="https://milvus.io/docs/scalar_index.md#Inverted-indexing"><code translate="no">INVERTED_INDEX</code></a> pour les scalaires, Milvus peut rapidement identifier et renvoyer les résultats les plus pertinents, ce qui améliore considérablement l'expérience globale de l'utilisateur et l'efficacité du processus de recherche de données.</p>
<p>Il existe de nombreux types d'indices et de métriques. Pour plus d'informations à leur sujet, vous pouvez vous reporter à <a href="https://milvus.io/docs/overview.md#Index-types">Type d'index Milvus</a> et <a href="https://milvus.io/docs/glossary.md#Metric-type">Type de métrique Milvus</a>.</p>
<h2 id="Create-Collection​" class="common-anchor-header">Création d'une collection<button data-href="#Create-Collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois le schéma et les index définis, nous créons une "collection" avec ces paramètres. Pour Milvus, une collection est comparable à une table dans une base de données relationnelle.</p>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=collection_name,​
    schema=schema,​
    index_params=index_params,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Nous pouvons vérifier que la collection a été créée avec succès en la décrivant.</p>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(​
    collection_name=collection_name​
)​
<span class="hljs-built_in">print</span>(collection_desc)​

<button class="copy-code-btn"></button></code></pre>
<h1 id="Other-Considerations​" class="common-anchor-header">Autres considérations<button data-href="#Other-Considerations​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Loading-Index​" class="common-anchor-header">Chargement de l'index<button data-href="#Loading-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>Lors de la création d'une collection dans Milvus, vous pouvez choisir de charger l'index immédiatement ou de le différer jusqu'à l'ingestion en masse de certaines données. En général, il n'est pas nécessaire de faire un choix explicite à ce sujet, car les exemples ci-dessus montrent que l'index est automatiquement construit pour toutes les données ingérées juste après la création de la collection. Cela permet d'effectuer des recherches immédiates dans les données ingérées. Cependant, si vous avez une insertion en masse importante après la création de la collection et que vous n'avez pas besoin de rechercher des données jusqu'à un certain point, vous pouvez différer la construction de l'index en omettant les paramètres index_params dans la création de la collection et construire l'index en appelant explicitement load après avoir ingéré toutes les données. Cette méthode est plus efficace pour construire l'index sur une grande collection, mais aucune recherche ne peut être effectuée avant d'appeler load().</p>
<h2 id="How-to-Define-Data-Model-For-Multi-tenancy​" class="common-anchor-header">Comment définir le modèle de données pour le multi-locataire ?<button data-href="#How-to-Define-Data-Model-For-Multi-tenancy​" class="anchor-icon" translate="no">
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
    </button></h2><p>Le concept de locataires multiples est couramment utilisé dans les scénarios où une application ou un service logiciel unique doit servir plusieurs utilisateurs ou organisations indépendants, chacun disposant de son propre environnement isolé. Cette situation est fréquemment observée dans l'informatique en nuage, les applications SaaS (Software as a Service) et les systèmes de base de données. Par exemple, un service de stockage en nuage peut utiliser la multilocation pour permettre à différentes entreprises de stocker et de gérer leurs données séparément tout en partageant la même infrastructure sous-jacente. Cette approche maximise l'utilisation des ressources et l'efficacité tout en garantissant la sécurité et la confidentialité des données pour chaque locataire.</p>
<p>La façon la plus simple de différencier les locataires est d'isoler leurs données et leurs ressources les unes des autres. Chaque locataire dispose d'un accès exclusif à des ressources spécifiques ou partage des ressources avec d'autres pour gérer les entités Milvus telles que les bases de données, les collections et les partitions. Il existe des méthodes spécifiques alignées sur ces entités pour mettre en œuvre le multi-tenant Milvus. Vous pouvez vous référer à la <a href="https://milvus.io/docs/multi_tenancy.md#Multi-tenancy-strategies">page Milvus multi-tenancy</a> pour plus d'informations.</p>
