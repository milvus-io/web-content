---
id: grant_privileges.md
related_key: enable RBAC
summary: 建立角色後，就可以授予角色權限。本指南將介紹如何授予角色權限或權限群組。
title: 授予角色特權或特權群組
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles​" class="common-anchor-header">授予角色特權或特權群組<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles​" class="anchor-icon" translate="no">
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
    </button></h1><p>建立角色後，就可以授予角色權限。本指南介紹如何授予角色特權或特權群組。</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role​" class="common-anchor-header">授予角色一個特權或特權群組<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.5 引入了新版本的 API，簡化了授予操作。向角色授予特權時，不再需要查詢對象類型。以下是參數和相對應的解釋。</p>
<ul>
<li><p><strong>role_name：</strong>需要授予特權或特權群組的目標角色名稱。</p></li>
<li><p><strong>Resource: 資源</strong>：特權的目標資源，可以是特定的實體、資料庫或集合。下表解釋如何在<code translate="no">client.grantV2()</code> 方法中指定資源。</p></li>
</ul>
<table data-block-token="JEEodjgvGobTYaxIpelculQCnAd"><thead><tr><th data-block-token="A8x3dXMhzoCf5ZxZyUscfy4GnWd" colspan="1" rowspan="1"><p data-block-token="SDgKdAzXFoodDQxru5WcGjBTnof"><strong>層級</strong></p>
</th><th data-block-token="DOINdNjYroiDUMxdNn3cPC2cn7e" colspan="1" rowspan="1"><p data-block-token="MDSZdFSCdoi3w8x1Dglc2YUdnse"><strong>資源</strong></p>
</th><th data-block-token="O6ZZdSVrOoBMZ1xMnWccUglpncf" colspan="1" rowspan="1"><p data-block-token="LOJMd38TkoEUenxnXvUcyuqsnof"><strong>授予方法</strong></p>
</th><th data-block-token="ACnjduxuRoz4oKxBGy9cnwyrnW7" colspan="1" rowspan="1"><p data-block-token="JJWcdxsQ4obIDQxiZhCc4r8Knhd"><strong>註解</strong></p>
</th></tr></thead><tbody><tr><td data-block-token="WrgHdNmJworvbjxDC0Ac8Luynkd" colspan="1" rowspan="2"><p data-block-token="IqewdrEkZoZCuqxe9j1coReKnVf"><strong>收集</strong></p>
<p data-block-token="Xt2LdgXN7od47Ox9jGtctHwrn0d"></p>
</td><td data-block-token="VaxXdIFlIoQq0qxeIRccp94Rn1b" colspan="1" rowspan="1"><p data-block-token="BbHJdvTaJoZy8uxTIGXcu3VOnrc">特定的收藏集</p>
<p data-block-token="BdMadRB6FofK5PxZMYFcGfjunWd"></p>
</td><td data-block-token="BuzqdmVk4oAHq8xqoBRcOxClnbe" colspan="1" rowspan="1"><p data-block-token="RciEdsjwdoqsCoxNDBPcahqfndf">client.grant_privilege_v2(role_name="roleA", privilege="CollectionAdmin", collection_name="col1", db_name="db1")</p>
</td><td data-block-token="R3Pwdw9rboe6uYx6WJQcOjjmn3e" colspan="1" rowspan="1"><p data-block-token="Hv2UdaCOKoWmR2xtyphcT70mn0g">輸入目標集合的名稱，以及目標集合所屬資料庫的名稱。</p>
<p data-block-token="BbxEd3PQWooh4IxNRFJcNnvYnDd"></p>
</td></tr><tr><td data-block-token="NDNgdI3YmooSyTxvnghcdfbEnZe" colspan="1" rowspan="1"><p data-block-token="ChNZdDKlPoFXCKxo0eZcNMuVnUb">特定資料庫下的所有集合</p>
</td><td data-block-token="K7aBd4V2joN6kwxgvJfcUwTxnQh" colspan="1" rowspan="1"><p data-block-token="EEr5d9ITqohPLGxwXGEcRnBtnZc">client.grant_privilege_v2(role_name="roleA", privilege="CollectionAdmin", collection_name="*", db_name="db1")</p>
</td><td data-block-token="YFtEdd26cosytHxx3u7cMV17nsi" colspan="1" rowspan="1"><p data-block-token="QH8idsEf5otsWsxHu5NckM7JnOc">輸入目標資料庫的名稱和通配符<code translate="no">`*`</code> 作為集合名稱。</p>
</td></tr><tr><td data-block-token="RZZHdgXlboGN2axxBwpceLn6nff" colspan="1" rowspan="1"><p data-block-token="UYS5ddiUYoPr3wx415wcFbd8n2c"><strong>**Database**</strong></p>
</td><td data-block-token="S5Q3dhrk3onli5xyPnCcoGlPnof" colspan="1" rowspan="1"><p data-block-token="QM0tdstT3oG12SxglUHcr6XUnEb">特定資料庫</p>
</td><td data-block-token="RtgDdRqEgoi4xOxp2w3cgkNcnzf" colspan="1" rowspan="1"><p data-block-token="Nq7TdnfHGottBHxoRVTct23unMf">client.grant_privilege_v2(role_name="roleA", privilege="DatabaseAdmin", collection_name="*", db_name="db1")</p>
</td><td data-block-token="AWvzduv5Lov5qJx7WYhciIESnfh" colspan="1" rowspan="1"><p data-block-token="AREJdOugloKZKxxZBHmcRQDWnJc">輸入目標資料庫的名稱和通配符<code translate="no">`*`</code> 作為集合名稱。</p>
</td></tr><tr><td data-block-token="JDIKdIWLToT51Exfa6KcDAX5nSc" colspan="1" rowspan="1"><p data-block-token="LwujdLjA4oELFNxQ0vocRqGZn8c"></p>
</td><td data-block-token="VCeyd4LnaocEA3xFzFfcmBFQnVe" colspan="1" rowspan="1"><p data-block-token="Zpypdw1yNoJ7VPxnML8cCobCnUe">目前實例下的所有資料庫</p>
</td><td data-block-token="XDNudVmito8zIaxYhiUc65UfntO" colspan="1" rowspan="1"><p data-block-token="QiPudWimto5bO3xya5ScRjrgnQb">client.grant_privilege_v2(role_name="roleA", privilege="DatabaseAdmin", collection_name="*", db_name="*")</p>
</td><td data-block-token="HK9Jd6egJoGjAzxEUXTcd52Wn01" colspan="1" rowspan="1"><p data-block-token="OqqOd4CG3oVcR8xHgdxcqbCznJb">輸入<code translate="no">`*`</code> 作為資料庫名稱，輸入<code translate="no">`*`</code> 作為集合名稱。</p>
</td></tr><tr><td data-block-token="Owz9dC4pkocTkixLAMdcyBiqnYe" colspan="1" rowspan="1"><p data-block-token="Wwyxdfj9Vo8aHbxcVgycyT10nof"><strong>** 實例**</strong></p>
</td><td data-block-token="FPe1dyBVMoVnMexfHgycH0NSnrh" colspan="1" rowspan="1"><p data-block-token="Zfqtdh8Xqoyt8DxWpa3cD26InLh">目前的實體</p>
</td><td data-block-token="B4mZdL4O4oB8ADxUPsZcmR1enng" colspan="1" rowspan="1"><p data-block-token="CqrVd0CvQoPFIrxE2ePcp5Ren0d">client.grant_privilege_v2(role_name="roleA", privilege="ClusterAdmin", collection_name="*", db_name="*")</p>
</td><td data-block-token="V8ruddYLCo070nxAGFpcRPP1n5c" colspan="1" rowspan="1"><p data-block-token="IskBdd5NWoN6pkxl3bpcwwkSnh0">輸入<code translate="no">`*`</code> 作為資料庫名稱，輸入<code translate="no">`*`</code> 作為集合名稱。</p>
</td></tr></tbody></table>
<ul>
<li><p><strong>權限</strong>：您需要賦予角色的特定權限或<a href="https://zilliverse.feishu.cn/wiki/GpoUwWH7kiAF3bkKqokcTAS4n5d">權限群</a>。目前，Milvus 提供 56 種可授予的權限。下表列出了 Milvus 中的特權。</p>
<p><div class="alert note"></p>
<p>下表中的類型欄是用戶為了方便您快速查找特權，僅用於分類目的。在授予特權時，您不需要瞭解其類型。您只需輸入對應的權限即可。</p>
<p></div></p></li>
</ul>
<table data-block-token="YtvhdW05Ko0c7oxFrEKcDQjBnqh"><thead><tr><th data-block-token="HmLLdKFIJoSYXWxA3P4chgwknZf" colspan="1" rowspan="1"><p data-block-token="FW6fd5H3no6z9IxdPvIcNNcen6g"><strong>**類型 **</strong></p>
</th><th data-block-token="YaSmduL7yoJO1PxQkevc5axJnyb" colspan="1" rowspan="1"><p data-block-token="GWVPdRVZToJJhtx21jFcl2lWn6e"><strong>**權限**</strong></p>
</th><th data-block-token="DAhadKMjNoQ6snxllIDcQwotnSf" colspan="1" rowspan="1"><p data-block-token="Mo8vd0JOPoUjJPxrIA1cypQknwd"><strong>**描述</strong></p>
</th><th data-block-token="PwMedujdVoKROCx8vdKcSbrFnHh" colspan="1" rowspan="1"><p data-block-token="BgkBd6fG9oiErkxzSztcbHvfnfe"><strong>**客戶端的相關 API 描述**</strong></p>
</th></tr></thead><tbody><tr><td data-block-token="Ld7GdPgBYoDkpExDq4Bcb4wPnyd" colspan="1" rowspan="5"><p data-block-token="RL7ndh11Io4z2SxZWqZcJ0junid">資料庫權限</p>
</td><td data-block-token="ImEKdP5fbonDCzxR8dqcWF5Dn0b" colspan="1" rowspan="1"><p data-block-token="JclYd7ldCoFHayxOP3TcoULpnVc">列出資料庫</p>
</td><td data-block-token="Gan5dAwbGoXfPwx92M2ckV08nKd" colspan="1" rowspan="1"><p data-block-token="SVLIdwfdfoeK4qxM8yucW3ianYc">檢視目前實例中的所有資料庫</p>
</td><td data-block-token="OoX4dIbqCogWJYx7zEFcf8ycnrc" colspan="1" rowspan="1"><p data-block-token="IKNxdG111oEpktxs0NAcyXCSnvv"><a href="https://milvus.io/docs/manage_databases.md">[ListDatabases](https://milvus.io/docs/manage_databases.md)</a></p>
</td></tr><tr><td data-block-token="OaOUdVom4o56xLxkTllcR6FUnUg" colspan="1" rowspan="1"><p data-block-token="DjpQdXo7OoJWrhx3qifcjk4Xndh">描述資料庫</p>
</td><td data-block-token="WgjJdZMBXo5RERxvOJAcbLFcnRe" colspan="1" rowspan="1"><p data-block-token="BFK5d1JwPoiLQ7x23YRcF4fOnDM">檢視資料庫的詳細資訊</p>
</td><td data-block-token="EDRvd6QORoPGkSxaCQncwmaUnLf" colspan="1" rowspan="1"><p data-block-token="YriadNiotooOMMxGqVBc5t8Nnvc"><a href="https://milvus.io/docs/manage_databases.md">[DescribeDatabase](https://milvus.io/docs/manage_databases.md)</a></p>
</td></tr><tr><td data-block-token="D1lVdbhJkoE7zNxAoGfcXCBwnXb" colspan="1" rowspan="1"><p data-block-token="ZUEldYWBgoMPmFx93WKcS0WLntb">建立資料庫</p>
</td><td data-block-token="S6bxdDFO2orN9yxwaqfcoTvlnyh" colspan="1" rowspan="1"><p data-block-token="LofsdihfWoBb3XxNUlzcd6Fbnje">建立資料庫</p>
</td><td data-block-token="NbCidCTtxoEm35xqJALcM4CPn7e" colspan="1" rowspan="1"><p data-block-token="VRY8dIdVFoGMt7xHOnecOBN6n1d"><a href="https://milvus.io/docs/manage_databases.md">[CreateDatabase](https://milvus.io/docs/manage_databases.md)</a></p>
</td></tr><tr><td data-block-token="QKiUdVcB5orOo9x1268c5Q0snBb" colspan="1" rowspan="1"><p data-block-token="ZJu2dtQW0oPMZ8xRNmFcpsN2nSf">丟棄資料庫</p>
</td><td data-block-token="K7vldPFrFoVrlpxmxMxc9TXNnUc" colspan="1" rowspan="1"><p data-block-token="UgP7dD1zzouHlbxrDMpcdv5Un9l">丟棄資料庫</p>
</td><td data-block-token="AKPLdjTH4oDIoex6hyqcXyiRnwc" colspan="1" rowspan="1"><p data-block-token="Q9sTdiVWEoobGdxzfq7cYkWcnMb"><a href="https://milvus.io/docs/manage_databases.md">[DropDatabase](https://milvus.io/docs/manage_databases.md)</a></p>
</td></tr><tr><td data-block-token="GGwKdGkk8oDOMvxLNNMcRd0gnXH" colspan="1" rowspan="1"><p data-block-token="G5D1dZNf2oIpu4xUj4jcf947n0e">更改資料庫</p>
</td><td data-block-token="M8HvdGPMxoVJxPxxcCocxQn5nAf" colspan="1" rowspan="1"><p data-block-token="QiCDdd3yBoT7kgx8Z5Kcz5HOnab">修改資料庫的屬性</p>
</td><td data-block-token="EHFEdrUq3otQyrxoTCZctEcfn9i" colspan="1" rowspan="1"><p data-block-token="FQnadyOONo45DgxeGeDcesiFnlf"><a href="https://milvus.io/docs/manage_databases.md">[AlterDatabase](https://milvus.io/docs/manage_databases.md)</a></p>
</td></tr><tr><td data-block-token="MtiFd4S5SozLbsxSjanc6Nirnpf" colspan="1" rowspan="18"><p data-block-token="NlSMdn0GPoNDXcxUVSMcNkuQnw8">收集權限</p>
<p data-block-token="QeaCdWA6uoQgv4xKW94csg8pnJg"></p>
</td><td data-block-token="XAE6d3uW4o41EPxOYVZcRjLFnKe" colspan="1" rowspan="1"><p data-block-token="TAgvdzNano8vDsxc4qkcBoddnGf">GetFlushState</p>
</td><td data-block-token="GV4kdFWqqoq8aqxjlE8cuFVJnmh" colspan="1" rowspan="1"><p data-block-token="RchRdz8Eeo2kouxGQqlc4UphnRc">檢查集合沖洗作業的狀態</p>
</td><td data-block-token="P9yndvLGuoLdAGx5RZwcesXDnGX" colspan="1" rowspan="1"><p data-block-token="RfsydFC6poaDKfxkvEycftNanZf"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">[GetFlushState](https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md)</a></p>
</td></tr><tr><td data-block-token="PAZBdrHB7ooHc5xpF4GcvzWRn6J" colspan="1" rowspan="1"><p data-block-token="AmSndvrvPoIEHzxFHh9c2yfZnMc">取得載入狀態</p>
</td><td data-block-token="He9Ed0SYYoW7hxxWFxZc4r73n3c" colspan="1" rowspan="1"><p data-block-token="NWnud2NA0ouZ2DxUD2GcIAMen4c">檢查集合的載入狀態</p>
</td><td data-block-token="X4fCdfHPLoUV1QxdYMucxqZtnlg" colspan="1" rowspan="1"><p data-block-token="IRAwdcMk2or2b8xQnIdcSvpdnAe"><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">[GetLoadState](https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md)</a></p>
</td></tr><tr><td data-block-token="UgqOdWev3oObkpx90fvcBV6knGe" colspan="1" rowspan="1"><p data-block-token="C1pEdkIVPovdCzxKcmXcV4KBnze">取得載入進度</p>
</td><td data-block-token="P8OsdBTAwoxhYWx8xy7cqnnInWf" colspan="1" rowspan="1"><p data-block-token="No52dFNivoE0BHxGV08cAbj5nqg">檢查集合的載入進度</p>
</td><td data-block-token="A7Aqd4U4Hog6UxxRr7Mcp3yHnHb" colspan="1" rowspan="1"><p data-block-token="AHo1dxWkBodIOYxaGmBcfMosnab"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">[GetLoadingProgress](https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md)</a></p>
</td></tr><tr><td data-block-token="Rvo5dWaJAoHOPoxjWbectFbEncb" colspan="1" rowspan="1"><p data-block-token="VtpodjpcroREwnxl7ugcEGBhnkg">顯示收藏集</p>
</td><td data-block-token="B4i0dq0aao3xXUxLewacuRmlnjf" colspan="1" rowspan="1"><p data-block-token="AJJDdxQhloImZJxnqLXcbBjjnqc">檢視所有具有收藏權限的收藏集</p>
</td><td data-block-token="NS79d4sBCoUfvBxD52wcqMBanZf" colspan="1" rowspan="1"><p data-block-token="UWWbdT33CokXY4xrfMecJZjGnye"><a href="https://milvus.io/docs/view-collections.md">[ShowCollections](https://milvus.io/docs/view-collections.md)</a></p>
</td></tr><tr><td data-block-token="ZxDNdhoaToR7LXxHCfucuuA3nse" colspan="1" rowspan="1"><p data-block-token="Uh7fdfsafoIAayxj86acN995nGh">列出別名</p>
</td><td data-block-token="RE6CdzT5VoisWnxyhbLcTRx4nbh" colspan="1" rowspan="1"><p data-block-token="Faqud1JARoXTpzxsl9Xcvht4nZb">檢視集合的所有別名</p>
</td><td data-block-token="ZuxOdlYxroqO2MxgvQBcC7JFnch" colspan="1" rowspan="1"><p data-block-token="PVePdAscpogIkZxc1NYcmsManmd"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">[ListAliases](https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md)</a></p>
</td></tr><tr><td data-block-token="U69edBjaZoI5vQx5Hkbca6qvnVf" colspan="1" rowspan="1"><p data-block-token="AcaRdgCvSoqlJmxMqTTc3iAzndb">描述收藏集</p>
</td><td data-block-token="JK99dTHjiobQPtx16BIcwaXwnLg" colspan="1" rowspan="1"><p data-block-token="ZQ8vdJF8to9xakx5DL7c2phLnyf">檢視集合的詳細資訊</p>
</td><td data-block-token="L2zNd6oksoXRpaxUXdccyU2ynse" colspan="1" rowspan="1"><p data-block-token="MSHwdiB7ooUykWx4rpmcQUB7ncb"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">[DescribeCollection](https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md)</a></p>
</td></tr><tr><td data-block-token="Eexmd4YEroPmMex9l9AcmsbsnRc" colspan="1" rowspan="1"><p data-block-token="SJ8xdAeAcoZ4UQx9s5ccCWvtn6b">描述別名</p>
</td><td data-block-token="Dheldg28Io7zwmx5gCXcdzZfnxb" colspan="1" rowspan="1"><p data-block-token="Tt0CdxNMooqShuxPnmMcL3rCnGh">檢視別名的詳細資訊</p>
</td><td data-block-token="ZyWcdj6V5oyQV9xIRUHcaNHSnQO" colspan="1" rowspan="1"><p data-block-token="Yx8vdhUpqouxVGxVAiacWwwlnhh"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">[DescribeAlias](https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md)</a></p>
</td></tr><tr><td data-block-token="Cp2vduKPOoWsKCxC5VOcBiounHM" colspan="1" rowspan="1"><p data-block-token="ToDlddP7MogohMxxSptcfRZbn7c">取得統計資料</p>
</td><td data-block-token="Z4bOdaX3foYwBIxQLPAc7yqsnof" colspan="1" rowspan="1"><p data-block-token="LCiYdRQZ7oT2ocxh87acGLPqnyc">取得集合的統計資料 (例如集合中的實體數量)</p>
</td><td data-block-token="B2z5dONOTomOw1xf4Y1ct2j5nud" colspan="1" rowspan="1"><p data-block-token="RDoMdK2dlo0DbbxGJemcKFuGnTb"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">[GetCollectionStatistics](https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md)</a></p>
</td></tr><tr><td data-block-token="XMzpd4J7hoK7Uuxra9Vcu569nme" colspan="1" rowspan="1"><p data-block-token="LdJ3dqvQyoTg9pxOrOfcf2W6nZh">建立集合</p>
</td><td data-block-token="CPq4d04kWocuxixLniLcrsW4nTg" colspan="1" rowspan="1"><p data-block-token="UEUzdseQgoCkqgx9KGrcEsSknZe">建立一個集合</p>
</td><td data-block-token="KFtEdBKgSoFexvxRLPIc0ep1nPd" colspan="1" rowspan="1"><p data-block-token="Kr8VdAWGcop5r1xgCDkcTZMQnpM"><a href="https://milvus.io/docs/create-collection.md">[CreateCollection](https://milvus.io/docs/create-collection.md)</a></p>
</td></tr><tr><td data-block-token="RyGmdf0BroXSaLxEMa7cjg2SnCY" colspan="1" rowspan="1"><p data-block-token="MjdFdb0mBoTPVExtCrOcGKJhnhd">丟棄集合</p>
</td><td data-block-token="SXlVduOdto9crHxvQu8cJpyPn1d" colspan="1" rowspan="1"><p data-block-token="ENtrdws3JoaQVdxxKBmcrjqinoh">丟棄一個收藏集</p>
</td><td data-block-token="BRJzd8wRzoH8SUxiql4cDNlanDg" colspan="1" rowspan="1"><p data-block-token="PuT0d4U2coC6Gwxy178cPySinuf"><a href="https://milvus.io/docs/drop-collection.md">[DropCollection](https://milvus.io/docs/drop-collection.md)</a></p>
</td></tr><tr><td data-block-token="MIZudqBnWo5bYNxVn99cZBPAnqf" colspan="1" rowspan="1"><p data-block-token="CTYAdX2Q1oHvAIxQyYgc7JB9nJb">載入</p>
</td><td data-block-token="NDJHdlMXyoojw8xc5a7cyXsQnMg" colspan="1" rowspan="1"><p data-block-token="LlZIdBMjwoOxJxxCQiucRIkHnze">載入一個收藏集</p>
</td><td data-block-token="GnBMdgfslo3Q0UxyAqOcPOBWnie" colspan="1" rowspan="1"><p data-block-token="KmX1dizLCo1FEDxOSLdcdhptnwe"><a href="https://milvus.io/docs/load-and-release.md">[LoadCollection](https://milvus.io/docs/load-and-release.md)</a>/<a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">[GetLoadingProgress](https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md)</a>/<a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">[GetLoadState](https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md)</a></p>
</td></tr><tr><td data-block-token="R5BFdRrmXoRxuTxbtj0cc5oAnYc" colspan="1" rowspan="1"><p data-block-token="EcIadMeUNoBpnDxjrgccaKlJnrb">釋放</p>
</td><td data-block-token="MAkMdDFTBocJ4yxzxtzcEb5Vn3f" colspan="1" rowspan="1"><p data-block-token="PktFdWSqHoC1bwxzZoDcCPosnGc">釋放集合</p>
</td><td data-block-token="YI4Idz2YKoxEUFxoGjrcIdqenJe" colspan="1" rowspan="1"><p data-block-token="I6aqdaWkToQlxVxOOv7cmqSznUk"><a href="https://milvus.io/docs/load-and-release.md">[ReleaseCollection](https://milvus.io/docs/load-and-release.md)</a></p>
</td></tr><tr><td data-block-token="SdXodgeexoQNgLxhhtrcTXLQn2e" colspan="1" rowspan="1"><p data-block-token="PPGJd9xYyoGc6axLxnXcehHknPd">刷新</p>
<p data-block-token="CwHodxxbFondGMxZI7tcrpyin1e"></p>
</td><td data-block-token="I3sCdXEANooGcQxmSKgc6CzMn6c" colspan="1" rowspan="1"><p data-block-token="Pb8ed7suDodviyxqmZ6cFymUnUc">將集合中的所有實體持久化到封閉的區段。任何在 flush 操作之後插入的實體都會被儲存在新的區段中。</p>
</td><td data-block-token="TjNxdCYIHo2nQlxgfEEcq6vRnMd" colspan="1" rowspan="1"><p data-block-token="VfI4dU4ekoULHtx8UPCcuQ7jnYd"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">[Flush](https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md)</a>/<a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">[GetFlushState](https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md)</a></p>
</td></tr><tr><td data-block-token="McZ6dPwNZo2PaExCJr2c1f1vnKb" colspan="1" rowspan="1"><p data-block-token="BN0TdBHNoo2K8lxMld3cF29Wn2e">壓縮</p>
</td><td data-block-token="VtiFdkyipoclZ0xvm00cWwjBnsb" colspan="1" rowspan="1"><p data-block-token="PI15dBFUFowgCzxgiqYcorC4nUc">手動觸發壓縮</p>
</td><td data-block-token="ZPVKdfoCio0RgexCDOscmebCnMb" colspan="1" rowspan="1"><p data-block-token="N22odujGfo1BNvxy6ytcWYPlnUf"><a href="https://milvus.io/docs/v2.0.x/compact_data.md">[Compact](https://milvus.io/docs/v2.0.x/compact_data.md)</a></p>
</td></tr><tr><td data-block-token="F7r1daqwEoucg2xbmcVcA957nug" colspan="1" rowspan="1"><p data-block-token="P36tdDCZio4Vo6x3mWkcmCWznAc">重新命名集合</p>
</td><td data-block-token="DApzdesFioE439xjLwGcAoybnWh" colspan="1" rowspan="1"><p data-block-token="BfXmdhtqAovizkxxALrcvolwnib">重新命名一個集合</p>
</td><td data-block-token="UERJdDTv9oqfJCxecUKcqVudnLb" colspan="1" rowspan="1"><p data-block-token="EoR6dhhqQo3T06xDDhbcHvYBnmh"><a href="https://milvus.io/docs/modify-collection.md">[RenameCollection](https://milvus.io/docs/modify-collection.md)</a></p>
</td></tr><tr><td data-block-token="JLqjdqu6moHA8ExbKTYcFa1fnCd" colspan="1" rowspan="1"><p data-block-token="ZJZUdrkKOoulHrx8KrUcdcednyc">建立別名</p>
</td><td data-block-token="PCIyd8bf6opfjuxY9agcoysCnwd" colspan="1" rowspan="1"><p data-block-token="EEHSdFVuBoxfAdxGXKPcnx36nMb">為集合建立別名</p>
</td><td data-block-token="KolRdSgkEoXUvaxX1Y0c0R6Mnug" colspan="1" rowspan="1"><p data-block-token="Bv79dMkrUoRvimxW4N4caqwLnfh"><a href="https://milvus.io/docs/manage-aliases.md">[CreateAlias](https://milvus.io/docs/manage-aliases.md)</a></p>
</td></tr><tr><td data-block-token="RQP6dCEpUoU5hOxrHUCcAp43nAg" colspan="1" rowspan="1"><p data-block-token="AJzZdiyDAowFysx1oJ2cJHdrnzr">刪除別名</p>
</td><td data-block-token="ZpMwdiS29o5GUwxSDLLcGoKrnSg" colspan="1" rowspan="1"><p data-block-token="UDSqdIUZfocTrwxsylJcUgTQnad">刪除集合的別名</p>
</td><td data-block-token="AkEKdae8PouzmrxkJlXcPyXQnRh" colspan="1" rowspan="1"><p data-block-token="XQJmdWnDgoP1iAxXyrmc6ZULnEd"><a href="https://milvus.io/docs/manage-aliases.md">[DropAlias](https://milvus.io/docs/manage-aliases.md)</a></p>
</td></tr><tr><td data-block-token="I6CPdpxiDovYgxxXOfecMaiInff" colspan="1" rowspan="1"><p data-block-token="IZMXdTWPYoNCxxxtZHgcZyrTnXb">全部清除</p>
</td><td data-block-token="AWTWdGgSNoxsBQxXVe4cvR9FnYf" colspan="1" rowspan="1"><p data-block-token="GtyudeFwFopyyFxoOyBcM7o9nuf">清除資料庫中的所有集合</p>
</td><td data-block-token="DGS1daDh1oNgFJxczbZcvHMDnmd" colspan="1" rowspan="1"><p data-block-token="DkikdUvPRoNSjqxMDiYcz7AKn5f"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">[FlushAll](https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md)</a></p>
</td></tr><tr><td data-block-token="Q1DpdgIdjojrGrxTy2fc8M0unpe" colspan="1" rowspan="4"><p data-block-token="FCSedwXgKoUjkzxNxIxcHoyYnQh">分區權限</p>
</td><td data-block-token="S97PduCHZo6kOqx0b6HcDaywnrh" colspan="1" rowspan="1"><p data-block-token="Jm1FdoqA9oHwR3xpXxNcDvGwnUd">有分區</p>
</td><td data-block-token="UgCAdYHxXoOEOXxaMvGcoW32neb" colspan="1" rowspan="1"><p data-block-token="GhW4d7zlPoxf5kxe3JYcSJemnOe">檢查是否存在磁碟分割</p>
</td><td data-block-token="QR36dTbquomQbXxm0PAc6nK6nHb" colspan="1" rowspan="1"><p data-block-token="ZPr1d9tv6oAQM0x8rL0cfs8tnHg"><a href="https://milvus.io/docs/manage-partitions.md">[HasPartition](https://milvus.io/docs/manage-partitions.md)</a></p>
</td></tr><tr><td data-block-token="HEPGdUOS5o88a1xUrzNcuvhqnh4" colspan="1" rowspan="1"><p data-block-token="MjhldMMv7oqJ5axXobUcWDS4nxh">顯示分割區</p>
</td><td data-block-token="DpPEderqroL00XxriwNcyWeJnGb" colspan="1" rowspan="1"><p data-block-token="MHpSdgIbJo6tIYxhTl8cwdFAnSb">檢視集合中的所有磁碟分割</p>
</td><td data-block-token="SFbLdAlQwoPxCqx9ckOcKzQaneg" colspan="1" rowspan="1"><p data-block-token="FaDDdF8F6oHeLqxHtoNcH2pxnUh"><a href="https://milvus.io/docs/manage-partitions.md">[ShowPartitions](https://milvus.io/docs/manage-partitions.md)</a></p>
</td></tr><tr><td data-block-token="SrxxdKvoqoPBATx43ndcHGr2nJZ" colspan="1" rowspan="1"><p data-block-token="Q6PFdOFBpodLUbxBSzYcPxYGnEe">建立磁碟分割</p>
</td><td data-block-token="GFcydLWQEoIEKZxynapcb2gjn7f" colspan="1" rowspan="1"><p data-block-token="C8xJdCx8DoXU5NxoL6ucC8RDnFd">建立磁碟分割</p>
</td><td data-block-token="UayZdC1fso6WsoxYhxxcouRSnJh" colspan="1" rowspan="1"><p data-block-token="EHeNdsEcwonOVQxT1JWcXRpInYg"><a href="https://milvus.io/docs/manage-partitions.md">[CreatePartition](https://milvus.io/docs/manage-partitions.md)</a></p>
</td></tr><tr><td data-block-token="CN7fdu71hojcGixGT3xcRqwlnhc" colspan="1" rowspan="1"><p data-block-token="QpN7d4FPdowiLixJGQvcX1Tan0f">丟棄分割區</p>
</td><td data-block-token="HBvzdkIqMoahn7xRZb9c8gmGnob" colspan="1" rowspan="1"><p data-block-token="FxUad6Jurobd7Dx9r2DcsOMGnhf">刪除磁碟分割</p>
</td><td data-block-token="VjabdaiOgoSZOJxaBeBcZOtensg" colspan="1" rowspan="1"><p data-block-token="DzBXdD1vmop2lLxyA3QcTW3bnoh"><a href="https://milvus.io/docs/manage-partitions.md">[DropPartition](https://milvus.io/docs/manage-partitions.md)</a></p>
</td></tr><tr><td data-block-token="ZI1YdRgl0oQNOfxj3hlcC5q0nEb" colspan="1" rowspan="3"><p data-block-token="RyM0dZe8jos9m8xwnEecpBe1nkc">索引權限</p>
</td><td data-block-token="GI64dxRQgoVas4xtrVec0KGGnsb" colspan="1" rowspan="1"><p data-block-token="DLSMdH3CJooontxHeKocZK3cngh">索引詳細資料</p>
</td><td data-block-token="CdqcdkAlEoLiMZxs6IpcIxltnYe" colspan="1" rowspan="1"><p data-block-token="UPHXdO2TKo3it6xQga8cddG3npg">檢視索引的詳細資料</p>
<p data-block-token="YsHTdK8UQorsTqxQMIvcVkLqneb"></p>
</td><td data-block-token="IQQ5dBawkoCz41xepw6cNSCAnGf" colspan="1" rowspan="1"><p data-block-token="HLz5dc2qvoc0oFxhpdLcN6ixnUf"><a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">[DescribeIndex/GetIndexState/GetIndexBuildProgress](https://milvus.io/docs/index-vector-fields.md?tab=floating)</a></p>
</td></tr><tr><td data-block-token="Hlo9djUK8oJdPLx5bMIc5Zbkn8b" colspan="1" rowspan="1"><p data-block-token="RSbPd3M9KoIMTRxlGiScGF1MnDf">建立索引</p>
</td><td data-block-token="FGZVdeaFXoaTuSxXETCc7jGNnLC" colspan="1" rowspan="1"><p data-block-token="YRladIDhxoRkZLx40p4cZTgwn2g">建立索引</p>
</td><td data-block-token="YKAwdx756oilIxxafOjczmoInGc" colspan="1" rowspan="1"><p data-block-token="IdzsdFUOQowLcpxCIZScYPKjnbC"><a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">[CreateIndex](https://milvus.io/docs/index-vector-fields.md?tab=floating)</a></p>
</td></tr><tr><td data-block-token="FpaSdJc5gocyVzxvmCGcSkzDn4e" colspan="1" rowspan="1"><p data-block-token="D9m8dhGerodgzAxUbiXc6X4knNh">刪除索引</p>
</td><td data-block-token="TKzzdWiSNojjmNxOLlEcM8Tzn1f" colspan="1" rowspan="1"><p data-block-token="Cbktda0WYoAz7lxi7ricEfXdn4d">刪除索引</p>
</td><td data-block-token="RZjAdpVNYo8aP4xFRzZcLtUKnRh" colspan="1" rowspan="1"><p data-block-token="Kvr3dARR9oR9LsxwLtEc4xoCnTe"><a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">[DropIndex](https://milvus.io/docs/index-vector-fields.md?tab=floating)</a></p>
</td></tr><tr><td data-block-token="GcvxdCFi9os5wKxkGBxcLlpAnih" colspan="1" rowspan="10"><p data-block-token="MC9EdTagPoITS8xKOONcE8gInAb">資源管理權限</p>
<p data-block-token="Vhs3d9lueobj2BxbvoacLfBbnph"></p>
</td><td data-block-token="MqBKd18GUobjMtxpyGgcBR2BnXg" colspan="1" rowspan="1"><p data-block-token="KC3lddgHJo8bkJx8oTKca3VpnHf">負載平衡</p>
</td><td data-block-token="POQfdVxn1ocXw8xf47McUmJsnCf" colspan="1" rowspan="1"><p data-block-token="ZY2JdXIYooUE5dxv884c6cz0nMd">達成負載平衡</p>
</td><td data-block-token="SS7rdsOLgo2hDZxIgbbcdXHOn0d" colspan="1" rowspan="1"><p data-block-token="DcxbdmK2io2lsHxXl16c8Q63nyh"><a href="https://milvus.io/docs/resource_group.md">[LoadBalance](https://milvus.io/docs/resource_group.md)</a></p>
</td></tr><tr><td data-block-token="RAWrdSmJSouLmVx2EHEcqDR3nRh" colspan="1" rowspan="1"><p data-block-token="OQV2dWGXLoxuSXxb1lOcIqkvnDV">建立資源群組</p>
</td><td data-block-token="WmtLd0b1do4pdoxWoTRcEI24nNg" colspan="1" rowspan="1"><p data-block-token="DlqWdM1UyoajGpxIxewcgTpFnpe">建立資源群組</p>
</td><td data-block-token="Jx1sds16koeIAJxEllOcs4o7nsk" colspan="1" rowspan="1"><p data-block-token="CXTDdgUNeoUvmHxg2IZcRfn2n3d"><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">[CreateResourceGroup](https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md)</a></p>
</td></tr><tr><td data-block-token="SVTcdbRy8oSIYfxjgTncCsGfntc" colspan="1" rowspan="1"><p data-block-token="YExZdDddqo40QExKnvdcZfcEnmd">刪除資源群組</p>
</td><td data-block-token="K5Z2dFlkZoLDXAxHTQ1cLWM0nVo" colspan="1" rowspan="1"><p data-block-token="D0mCd2rYqoZmaDxfieactr9fn1d">刪除資源群組</p>
</td><td data-block-token="U6r4dznP4oF2thx5Y8hcvz83nZc" colspan="1" rowspan="1"><p data-block-token="Xagnddg0rowmGUxZVDqcPB1CnSd"><a href="https://milvus.io/docs/resource_group.md">[DropResourceGroup](https://milvus.io/docs/resource_group.md)</a></p>
</td></tr><tr><td data-block-token="Rjz7dYIdMoUxS8xMFguc1OPhnNh" colspan="1" rowspan="1"><p data-block-token="HqUvdgaEco9BVJx6EcCccRT3n8m">更新資源群組</p>
</td><td data-block-token="ZE0UdUF3LosocpxJJ4pckxOhndd" colspan="1" rowspan="1"><p data-block-token="G2rxdbvD1oDv6exRkD7cpPznnbz">更新資源群組</p>
</td><td data-block-token="KV5jdkCTboAB4HxDmRYcSOjMnHc" colspan="1" rowspan="1"><p data-block-token="Fhodd5hiLoy4X3xb0jmcptsLnPb"><a href="https://milvus.io/docs/resource_group.md">[UpdateResourceGroups](https://milvus.io/docs/resource_group.md)</a></p>
</td></tr><tr><td data-block-token="TIL3d2BpDo0BOnxH42gcltPynCe" colspan="1" rowspan="1"><p data-block-token="IGUldI5RFocmvuxKeXCcQpJqnye">描述資源群組</p>
</td><td data-block-token="HXKddvhmLoVBbzx3edyc4LlbnmK" colspan="1" rowspan="1"><p data-block-token="HgAudI5KjoJDM9xt92xckhXpnaf">檢視資源群組的詳細資訊</p>
</td><td data-block-token="UM9ndx9AvoqAToxbHGtcRXX4nae" colspan="1" rowspan="1"><p data-block-token="ClAMdRpe8o8OTKxBEoOcMIYpnpo"><a href="https://milvus.io/docs/resource_group.md">[DescribeResourceGroup](https://milvus.io/docs/resource_group.md)</a></p>
</td></tr><tr><td data-block-token="ADXidOOSioIYCwxIhkCc1s75nPd" colspan="1" rowspan="1"><p data-block-token="Pzh1dJkwWoLpnHxXDutcp0BTnac">列出資源群組</p>
</td><td data-block-token="OnsZdXGA3obCqaxhk3QcxTcPnPc" colspan="1" rowspan="1"><p data-block-token="EHyZdwDFyoPqlPxBxXKcG22bnse">檢視目前實例的所有資源群組</p>
</td><td data-block-token="JIiVd5dVLoKT9KxTUUKc1prtnIh" colspan="1" rowspan="1"><p data-block-token="FonBdxV8SoFY5lxGpv4cd7ONnxd"><a href="https://milvus.io/docs/resource_group.md">[ListResourceGroups](https://milvus.io/docs/resource_group.md)</a></p>
</td></tr><tr><td data-block-token="LWJ1d1whAofrmdxXkr8cNS0nnZe" colspan="1" rowspan="1"><p data-block-token="KJWcdVyKRoFGa3xZBYxckqbznqw">轉移節點</p>
</td><td data-block-token="V2b4dxfSmo20HexLUDzc3HV2n4d" colspan="1" rowspan="1"><p data-block-token="Ghq1d5ZXoocGdwxoAYscJX0knBb">在資源群組之間轉移節點</p>
</td><td data-block-token="NbvLdLwbLoEI6LxZFxbceHtRnof" colspan="1" rowspan="1"><p data-block-token="Ewhwd2Vg5oWDXxxmv32cKE3Bnyc"><a href="https://milvus.io/docs/resource_group.md">[TransferNode](https://milvus.io/docs/resource_group.md)</a></p>
</td></tr><tr><td data-block-token="CBqHd6iQMoz32mx2QfFcoezZnLw" colspan="1" rowspan="1"><p data-block-token="XJi5dnAY3oMqzfxyR1Dc5GBrnFf">傳送複本</p>
</td><td data-block-token="HZZ9dadWboTapgxIzS6cacGJnRe" colspan="1" rowspan="1"><p data-block-token="BqJfdZGA2oJy5Mx8O1dcNwiFn0M">在資源群組之間傳輸複本</p>
</td><td data-block-token="TQY1dDzSJonsioxxlLCclIspnAf" colspan="1" rowspan="1"><p data-block-token="Jsjpd63uMo0gQGxpTtlciAAOnNh"><a href="https://milvus.io/docs/resource_group.md">[TransferReplica](https://milvus.io/docs/resource_group.md)</a></p>
</td></tr><tr><td data-block-token="NFrtdfmTjoX2Bkx8tnDc3BMZnuf" colspan="1" rowspan="1"><p data-block-token="Afvdd1eYCo4beuxYesFcWJccnrd">備份 RBAC</p>
</td><td data-block-token="UqpAdnVkioHFUGxand8cZMkcnMe" colspan="1" rowspan="1"><p data-block-token="ThH5dy7VvoFDMSxfYLbc4Bscnvc">為目前實例中所有 RBAC 相關作業建立備份</p>
</td><td data-block-token="Uopbd055PoiKmGxBaCDcg8runZc" colspan="1" rowspan="1"><p data-block-token="TIbXdwfFqoYc0cxXCaAc0iDTnAb">備份 RBAC</p>
</td></tr><tr><td data-block-token="GJMGdtpBXodFxPxJEWacjwg8n3d" colspan="1" rowspan="1"><p data-block-token="Inp7dlE81oBFDCx191acMx1fnVh">還原 RBAC</p>
</td><td data-block-token="Jd85dUgHiokvQWxWHVdcTriQnFc" colspan="1" rowspan="1"><p data-block-token="PlaHdwtPQorHHTxl3bPcsOwCnEb">還原當前實例中所有 RBAC 相關操作的備份</p>
</td><td data-block-token="ThOTdwZjcoahs1xfcbpcDzFonab" colspan="1" rowspan="1"><p data-block-token="AFwMdHdmKoXbE4xzGqMctlKLnRA">還原 RBAC</p>
</td></tr><tr><td data-block-token="VFw2dElePoZ45zxsRW5cDqOdnCK" colspan="1" rowspan="6"><p data-block-token="Rk6UdFUAHo69IexovsXcAs6inXc">實體權限</p>
<p data-block-token="TmsNd5Mk2oJmNNxlK8IckdFDnSg"></p>
</td><td data-block-token="BCegdmvf4omIVWxZqsJcWRs4ndf" colspan="1" rowspan="1"><p data-block-token="GCCldIZBeoEs19xLIawcKvW0n2e">查詢</p>
</td><td data-block-token="RzEGd16EQo6hgexM2uLcwN4rnQX" colspan="1" rowspan="1"><p data-block-token="PM8WdTyEXoHSkfxosmrcznAAnT6">進行查詢</p>
</td><td data-block-token="JdWcdaXSWoNg00xp3iGcLTtGn9f" colspan="1" rowspan="1"><p data-block-token="UstWdVI78oNRYVxdac0cBv93nnc"><a href="https://milvus.io/docs/get-and-scalar-query.md">[查詢](https://milvus.io/docs/get-and-scalar-query.md)</a></p>
</td></tr><tr><td data-block-token="EskNdfHL2okPMyxkTooclFBFnRf" colspan="1" rowspan="1"><p data-block-token="WYjDdzwvhoTsPuxfoxwcNFB1nsh">搜尋</p>
</td><td data-block-token="MDjDdqBmFoPJatxr0X3cFxG6nMh" colspan="1" rowspan="1"><p data-block-token="J13udDvCwoYRyMxcoWIcvZxvne2">進行搜尋</p>
</td><td data-block-token="QOFxdnqProclVgxkoGxcb2ddnFe" colspan="1" rowspan="1"><p data-block-token="RQVPdHRyHoo4kUxN6t7cqUWWnZg"><a href="https://milvus.io/docs/single-vector-search.md">[Search](https://milvus.io/docs/single-vector-search.md)</a></p>
</td></tr><tr><td data-block-token="Z629ddacHoYy15xiWu8cGNgknoc" colspan="1" rowspan="1"><p data-block-token="KTjHdCVLcoxFhtxawsSc4Z7LnQh">插入</p>
</td><td data-block-token="SXctd0DIYo6O5jxjchZccwfunjc" colspan="1" rowspan="1"><p data-block-token="VWNmdjNhzoM0u6xWLsvc6fAYnyd">插入實體</p>
</td><td data-block-token="P9PQdtNZ7oSCgFxuREEcBUv6nwd" colspan="1" rowspan="1"><p data-block-token="CPjTd78afo4gc3xUBKGcpdk1nAe"><a href="https://milvus.io/docs/insert-update-delete.md">[Insert](https://milvus.io/docs/insert-update-delete.md)</a></p>
</td></tr><tr><td data-block-token="TdrMd177JoP9sQxkhzEcgZMrn4d" colspan="1" rowspan="1"><p data-block-token="ZwYJdCVnzo92UVxaVV1cbg0enEe">刪除</p>
</td><td data-block-token="Rt9odvfYnofDtExhaCWcKsBynmb" colspan="1" rowspan="1"><p data-block-token="AtDxddeMVonNckxUkrgcCRl7n4e">刪除實體</p>
</td><td data-block-token="ST5Udofmjotouvx432gclKpDngh" colspan="1" rowspan="1"><p data-block-token="QU4Nd9w4YowDlAxuGKxcUgcmnvc"><a href="https://milvus.io/docs/delete-entities.md">[刪除](https://milvus.io/docs/delete-entities.md)</a></p>
</td></tr><tr><td data-block-token="QmAEd0Hd1o0uH6xvJh9ciqfZnie" colspan="1" rowspan="1"><p data-block-token="G3Hrd4PSgoHVxqxlbeQcZFiwnJb">插入</p>
</td><td data-block-token="FzDUdE1sEoBxRnxvzDqcEJtXnzb" colspan="1" rowspan="1"><p data-block-token="JuKDdIQwGoPjsDxw51XcG7a6nZJ">插入實體</p>
</td><td data-block-token="ZKcTdilVBos1JPxl2ZvcwR5tnXb" colspan="1" rowspan="1"><p data-block-token="LiQCdfDlWoelRKxOKNyc6FJdn9g"><a href="https://milvus.io/docs/upsert-entities.md">[Upsert](https://milvus.io/docs/upsert-entities.md)</a></p>
</td></tr><tr><td data-block-token="MgThdpr92ostDkxi9f1crxtenwI" colspan="1" rowspan="1"><p data-block-token="AwDOdjas4oeIxlxfxPJcYeM5nIe">輸入</p>
</td><td data-block-token="G2EHdTvZVoD6QFx8E7JcfFtNnRb" colspan="1" rowspan="1"><p data-block-token="N938dAKo8oKQmcxyjjscRZzPnO9">大量插入或匯入實體</p>
</td><td data-block-token="F8HbdVrruoIFYmxamT1cgtx0nIb" colspan="1" rowspan="1"><p data-block-token="OFa1dwanmoy2lKxcyz4cdUTUnAh"><a href="https://milvus.io/docs/import-data.md">[BulkInsert/Import](https://milvus.io/docs/import-data.md)</a></p>
</td></tr><tr><td data-block-token="IpBJdwH77oI5OFxscS1cS8R2ntc" colspan="1" rowspan="10"><p data-block-token="OGp9dFWLGoYDEmxT8NkcszZunVh">RBAC 權限</p>
</td><td data-block-token="RRnCdRa2QodfgKxhmUscE4jCnsf" colspan="1" rowspan="1"><p data-block-token="LGhAdgmG8oDvP5x6viNc1SxLnnf">建立所有權</p>
</td><td data-block-token="IBOMdPYVCorrjyxZZC6c0drFnce" colspan="1" rowspan="1"><p data-block-token="Z2S9dwOBToohHrx8Ih4cH3fdnnh">建立使用者或角色</p>
</td><td data-block-token="OJXkd6676onpOpxzmTXc1prxnLg" colspan="1" rowspan="1"><p data-block-token="H1aRdCwZ4okneNx94vIcnCzTnac"><a href="https://zilliverse.feishu.cn/wiki/CnzkwQBW3i7bE3kVtLzcqQLtn9d">[CreateUser/CreateRole](https://zilliverse.feishu.cn/wiki/CnzkwQBW3i7bE3kVtLzcqQLtn9d)</a></p>
</td></tr><tr><td data-block-token="Th4Hdv8eeoaoTNx9oPrceUKpnPd" colspan="1" rowspan="1"><p data-block-token="AxG5d7D1doPXVRxQKBzcCNaPnig">更新使用者</p>
</td><td data-block-token="URzfdphsvo5S2JxSYp0cH2R4nzc" colspan="1" rowspan="1"><p data-block-token="JehtddjtMoYsMZxqOAKcLVKXneh">更新使用者的密碼</p>
</td><td data-block-token="KAtiduPSzo8bUGxylXUczG3gnMd" colspan="1" rowspan="1"><p data-block-token="CFJHdSo1eoEnM9x8KUocFsponXf"><a href="https://zilliverse.feishu.cn/wiki/CnzkwQBW3i7bE3kVtLzcqQLtn9d">[UpdateCredential](https://zilliverse.feishu.cn/wiki/CnzkwQBW3i7bE3kVtLzcqQLtn9d)</a></p>
</td></tr><tr><td data-block-token="CgO8dnNyEotOTExeihCcoJoInIe" colspan="1" rowspan="1"><p data-block-token="CGcldT4pIo4rNJx0qkqc8Fm2ndc">刪除所有權</p>
</td><td data-block-token="C2zLdO8auonWUZxNf1Gc9e5tndb" colspan="1" rowspan="1"><p data-block-token="R6yqdtt2yo8V8Rx6wmIcp1genMu">刪除使用者密碼或角色</p>
</td><td data-block-token="PvTYdRi74orjltxXEeQcwaLfnCd" colspan="1" rowspan="1"><p data-block-token="JYwtdB54WoU6Q6xGhiwcLY3XnZv"><a href="https://zilliverse.feishu.cn/wiki/OqZnwJHrJilLPukfvp5cSgnmnTh">[DeleteCredential/DropRole](https://zilliverse.feishu.cn/wiki/OqZnwJHrJilLPukfvp5cSgnmnTh)</a></p>
</td></tr><tr><td data-block-token="BgH2dkOQLonqb1xt0epc3yTknAh" colspan="1" rowspan="1"><p data-block-token="WvuPdKJs2oOItDxKhuccjR56nyf">選擇所有權</p>
</td><td data-block-token="R093ddlBTo5opoxyRmactAI4nWb" colspan="1" rowspan="1"><p data-block-token="Mf5vd65cKoQo8fxokifcdbcGnxg">檢視授予特定角色的所有使用者</p>
</td><td data-block-token="Y9iadTKbcoouhpxADCUcdCRLnWb" colspan="1" rowspan="1"><p data-block-token="I4tDd6CGkofHsFxnfGUc7SP7nuh"><a href="https://zilliverse.feishu.cn/wiki/ZsNZwn1MkiOtH9kFU35cyRgVnue">[SelectRole/SelectGrant](https://zilliverse.feishu.cn/wiki/ZsNZwn1MkiOtH9kFU35cyRgVnue)</a></p>
</td></tr><tr><td data-block-token="BAS1ddw1uoLMsoxLqAHcDGrgnSg" colspan="1" rowspan="1"><p data-block-token="D5o9dFaGKogrc8xIa3lcJ5ucnhe">管理所有權</p>
</td><td data-block-token="UGULdyXOmo8mZUx1V8McnOOOneg" colspan="1" rowspan="1"><p data-block-token="NLsQdOgNroaFYjxnTScc3gEDnsg">管理使用者或角色，或將角色授予使用者</p>
</td><td data-block-token="DZPldb6cPoIbnjxPiCgcJxXQnAf" colspan="1" rowspan="1"><p data-block-token="VNMFdDIUGor46DxtB7AcGEHZnle"><a href="https://zilliverse.feishu.cn/wiki/ZsNZwn1MkiOtH9kFU35cyRgVnue">[OperateUserRole/OperatePrivilege/OperatePrivilegeV2](https://zilliverse.feishu.cn/wiki/ZsNZwn1MkiOtH9kFU35cyRgVnue)</a></p>
</td></tr><tr><td data-block-token="BEgAdlSSVoKEmDxVQoUcKPzjnUb" colspan="1" rowspan="1"><p data-block-token="RvnMdk7PioVQN6x03RNceq8dnGd">選擇使用者</p>
</td><td data-block-token="Sf0edJ8txowUF2xMG1EcXpWjnzf" colspan="1" rowspan="1"><p data-block-token="SVYYd4uN8ol7yixvRuucuvPMnqe">檢視授予使用者的所有角色</p>
</td><td data-block-token="AhxAdxOzIohRvZxFvhucVboBnuf" colspan="1" rowspan="1"><p data-block-token="IOp4djPKnoyIpdx5mQncoPiXn4c"><a href="https://zilliverse.feishu.cn/wiki/ZsNZwn1MkiOtH9kFU35cyRgVnue">[SelectUser](https://zilliverse.feishu.cn/wiki/ZsNZwn1MkiOtH9kFU35cyRgVnue)</a></p>
</td></tr><tr><td data-block-token="ZkHQd0lmMo6LkExMPCWcRmd2nAb" colspan="1" rowspan="1"><p data-block-token="TKqYdgI9JofscAxRXUtcA0M7nDh">建立特權群組</p>
</td><td data-block-token="Mjcmdn05eoNdfwx8ud9cS2ycnfb" colspan="1" rowspan="1"><p data-block-token="Rlc1dUR64owt4UxwCkqcdCPZnRg">建立特權群組</p>
</td><td data-block-token="KYnudiKhEoVaSnxzzW7cuQtSnOg" colspan="1" rowspan="1"><p data-block-token="EJspdi78ooGDvRxsK3Vc4w6gnXb"><a href="https://zilliverse.feishu.cn/wiki/FpV8wdWcZiDwnQkBloucYF7wnUg">[CreatePrivilegeGroup](https://zilliverse.feishu.cn/wiki/FpV8wdWcZiDwnQkBloucYF7wnUg)</a></p>
</td></tr><tr><td data-block-token="U5uod4PtAosrsKxEJ71cj84hnNd" colspan="1" rowspan="1"><p data-block-token="Qw18dvjHuoDfdwxehwLcoSxPnDf">刪除特權群組</p>
</td><td data-block-token="KU0kdROFyofmt5x6ltwcDncinr7" colspan="1" rowspan="1"><p data-block-token="AhGFdo2t3oWF7kxfoH3cUbEWnnc">刪除特權群組</p>
</td><td data-block-token="Lpv5d3cYqobKrCxwQtycutx1nqf" colspan="1" rowspan="1"><p data-block-token="X9CqdpmBoo6CQxxP4eSc42Eantb"><a href="https://zilliverse.feishu.cn/wiki/FpV8wdWcZiDwnQkBloucYF7wnUg">[DropPrivilegeGroup](https://zilliverse.feishu.cn/wiki/FpV8wdWcZiDwnQkBloucYF7wnUg)</a></p>
</td></tr><tr><td data-block-token="RfmYd4ApWoVRjAxAJlhcsBOBnYd" colspan="1" rowspan="1"><p data-block-token="Oe0BdhywGol8b5xMz4kcLDgXn5c">列出特權群組</p>
</td><td data-block-token="XjSidYzDxoM5QlxMpkYc7Rdrnyf" colspan="1" rowspan="1"><p data-block-token="BPASdokERoAcfwxHsnZcrc7gn5f">檢視目前實例中的所有權限群組</p>
</td><td data-block-token="AC1ndxpo5otLECxXwU4cm9XWnxc" colspan="1" rowspan="1"><p data-block-token="I5PQdLW8CoUtbAxfRhYchSPrnXd"><a href="https://zilliverse.feishu.cn/wiki/FpV8wdWcZiDwnQkBloucYF7wnUg">[ListPrivilegeGroups](https://zilliverse.feishu.cn/wiki/FpV8wdWcZiDwnQkBloucYF7wnUg)</a></p>
</td></tr><tr><td data-block-token="MTHXdRxasoxGbUxWQrGctwpfnHh" colspan="1" rowspan="1"><p data-block-token="XuMndXqGUoN6NFxqxWJcK9PwnSf">操作特權群組</p>
</td><td data-block-token="QnMhdQmvwoRJRmx3NjNcWz2Fncf" colspan="1" rowspan="1"><p data-block-token="RGvndPvnDoj86Pxm8xFceP4sn8g">在特權群組中加入特權或移除特權</p>
</td><td data-block-token="Lz0MdWmfXo7bF9xWzPxcv7mYn6b" colspan="1" rowspan="1"><p data-block-token="PNPQdG1GvoBjUXxa8iacCIxenYe"><a href="https://zilliverse.feishu.cn/wiki/FpV8wdWcZiDwnQkBloucYF7wnUg">[OperatePrivilegeGroup](https://zilliverse.feishu.cn/wiki/FpV8wdWcZiDwnQkBloucYF7wnUg)</a></p>
</td></tr></tbody></table>
<p>以下範例示範如何在<code translate="no">collection_01</code> 上授予預設資料庫下的<code translate="no">PrivilegeSearch</code> 特權，以及授予角色<code translate="no">role_a</code> 名為<code translate="no">privilege_group_1</code> 的特權群組。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

client = <span class="hljs-title class_">MilvusClient</span>(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.<span class="hljs-title function_">grant_privilege_v2</span>(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.<span class="hljs-title function_">grant_privilege_v2</span>(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.<span class="hljs-title function_">grant_privilege_v2</span>(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">rbac</span>.<span class="hljs-property">request</span>.<span class="hljs-property">GrantPrivilegeReqV2</span>

client.<span class="hljs-title function_">grantPrivilegeV2</span>(<span class="hljs-title class_">GrantPrivilegeReqV2</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">roleName</span>(<span class="hljs-string">&quot;role_a&quot;</span>)
        .<span class="hljs-title function_">privilege</span>(<span class="hljs-string">&quot;Search&quot;</span>)
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .<span class="hljs-title function_">dbName</span>(<span class="hljs-string">&quot;default&quot;</span>)
        .<span class="hljs-title function_">build</span>());

client.<span class="hljs-title function_">grantPrivilegeV2</span>(<span class="hljs-title class_">GrantPrivilegeReqV2</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">roleName</span>(<span class="hljs-string">&quot;role_a&quot;</span>)
        .<span class="hljs-title function_">privilege</span>(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .<span class="hljs-title function_">dbName</span>(<span class="hljs-string">&quot;default&quot;</span>)
        .<span class="hljs-title function_">build</span>());

client.<span class="hljs-title function_">grantPrivilegeV2</span>(<span class="hljs-title class_">GrantPrivilegeReqV2</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">roleName</span>(<span class="hljs-string">&quot;role_a&quot;</span>)
        .<span class="hljs-title function_">privilege</span>(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;*&quot;</span>)
        .<span class="hljs-title function_">dbName</span>(<span class="hljs-string">&quot;*&quot;</span>)
        .<span class="hljs-title function_">build</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/client&quot;</span>

client.<span class="hljs-title class_">GrantV2</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, entity.<span class="hljs-title class_">WithOperatePrivilegeDatabase</span>(<span class="hljs-string">&quot;default&quot;</span>))

client.<span class="hljs-title class_">GrantV2</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, entity.<span class="hljs-title class_">WithOperatePrivilegeDatabase</span>(<span class="hljs-string">&quot;default&quot;</span>))

client.<span class="hljs-title class_">GrantV2</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, entity.<span class="hljs-title class_">WithOperatePrivilegeDatabase</span>(<span class="hljs-string">&quot;*&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">grantPrivilege</span>({
   <span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
   <span class="hljs-attr">object</span>: <span class="hljs-string">&#x27;Collection&#x27;</span>, 
   <span class="hljs-attr">objectName</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
   <span class="hljs-attr">privilegeName</span>: <span class="hljs-string">&#x27;Search&#x27;</span>
 });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;privilege_group_1&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-a-role" class="common-anchor-header">描述角色<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>下面的示例演示了如何使用 describe_role 方法查看授予角色 role_a 的权限。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

client.<span class="hljs-title function_">describe_role</span>(role_name=<span class="hljs-string">&quot;role_a&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.response.DescribeRoleResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.DescribeRoleReq

<span class="hljs-type">DescribeRoleReq</span> <span class="hljs-variable">describeRoleReq</span> <span class="hljs-operator">=</span> DescribeRoleReq.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .build();
<span class="hljs-type">DescribeRoleResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.describeRole(describeRoleReq);
List&lt;DescribeRoleResp.GrantInfo&gt; infos = resp.getGrantInfos();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/client&quot;</span>

client.<span class="hljs-title class_">ListRoles</span>(context.<span class="hljs-title class_">Background</span>())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">describeRole</span>({<span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>以下是一個輸出範例。</p>
<pre><code translate="no" class="language-json">{
     <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
     <span class="hljs-string">&quot;privileges&quot;</span>: [
         {
             <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;collection_01&quot;</span>,
             <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;default&quot;</span>,
             <span class="hljs-string">&quot;role_name&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
             <span class="hljs-string">&quot;privilege&quot;</span>: <span class="hljs-string">&quot;Search&quot;</span>,
             <span class="hljs-string">&quot;grantor_name&quot;</span>: <span class="hljs-string">&quot;root&quot;</span>
         },
         <span class="hljs-string">&quot;privilege_group_1&quot;</span>
     ]
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">撤銷角色的特權或特權群組<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>以下範例示範如何撤銷<code translate="no">collection_01</code> 在預設資料庫下的特權<code translate="no">PrivilegeSearch</code> ，以及授予角色<code translate="no">role_a</code> 的特權群組<code translate="no">privilege_group_1</code> 。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

client = <span class="hljs-title class_">MilvusClient</span>(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.<span class="hljs-title function_">revoke_privilege_v2</span>(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.<span class="hljs-title function_">revoke_privilege_v2</span>(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.<span class="hljs-title function_">revoke_privilege_v2</span>(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">rbac</span>.<span class="hljs-property">request</span>.<span class="hljs-property">RevokePrivilegeReqV2</span>

client.<span class="hljs-title function_">revokePrivilegeV2</span>(<span class="hljs-title class_">RevokePrivilegeReqV2</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">roleName</span>(<span class="hljs-string">&quot;role_a&quot;</span>)
        .<span class="hljs-title function_">privilege</span>(<span class="hljs-string">&quot;Search&quot;</span>)
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .<span class="hljs-title function_">dbName</span>(<span class="hljs-string">&quot;default&quot;</span>)
        .<span class="hljs-title function_">build</span>());

client.<span class="hljs-title function_">revokePrivilegeV2</span>(<span class="hljs-title class_">RevokePrivilegeReqV2</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">roleName</span>(<span class="hljs-string">&quot;role_a&quot;</span>)
        .<span class="hljs-title function_">privilege</span>(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .<span class="hljs-title function_">dbName</span>(<span class="hljs-string">&quot;default&quot;</span>)
        .<span class="hljs-title function_">build</span>());

client.<span class="hljs-title function_">revokePrivilegeV2</span>(<span class="hljs-title class_">RevokePrivilegeReqV2</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">roleName</span>(<span class="hljs-string">&quot;role_a&quot;</span>)
        .<span class="hljs-title function_">privilege</span>(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;*&quot;</span>)
        .<span class="hljs-title function_">dbName</span>(<span class="hljs-string">&quot;*&quot;</span>)
        .<span class="hljs-title function_">build</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/client&quot;</span>

client.<span class="hljs-title class_">RevokeV2</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, entity.<span class="hljs-title class_">WithOperatePrivilegeDatabase</span>(<span class="hljs-string">&quot;default&quot;</span>))

client.<span class="hljs-title class_">RevokeV2</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>, <span class="hljs-string">&quot;privielge_group_1&quot;</span>, entity.<span class="hljs-title class_">WithOperatePrivilegeDatabase</span>(<span class="hljs-string">&quot;default&quot;</span>))

client.<span class="hljs-title class_">RevokeV2</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, entity.<span class="hljs-title class_">WithOperatePrivilegeDatabase</span>(<span class="hljs-string">&quot;*&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
