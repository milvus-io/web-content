---
id: boolean.md
summary: >-
  Une expression de filtre peut être utilisée pour filtrer un champ scalaire
  spécifique lors d'une recherche ou d'une requête afin d'obtenir des résultats
  précis. Ce guide présente l'utilisation des expressions de filtre dans Zilliz
  à l'aide d'un jeu de données d'exemple. A des fins de démonstration, ce guide
  ne fournira que des exemples d'opérations de requête.
title: Filtrage des métadonnées
---
<h1 id="Metadata-Filtering​" class="common-anchor-header">Metadata Filtering​<button data-href="#Metadata-Filtering​" class="anchor-icon" translate="no">
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
    </button></h1><p>A filter expression can be used to filter a specific scalar field during a search or query to obtain precisely matched results. This guide will introduce how to use filter expressions in Zilliz through an example dataset. For demonstration purposes, this guide will only provide examples of query operations.​</p>
<h2 id="Example-Dataset" class="common-anchor-header">Example Dataset<button data-href="#Example-Dataset" class="anchor-icon" translate="no">
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
    </button></h2><p>Suppose the example dataset is stored in a collection named “my_collection” and includes 10 entities of electronic products. The following is the example dataset.​</p>
<table data-block-token="N92advouDoOVkixCfD2cJxMKnWb"><thead><tr><th data-block-token="KHrJdy8bOoSMrExjvgWcCHWKn7c" colspan="1" rowspan="1"><p data-block-token="ADdYdCd6koyH7wx6DUbcqlAonSg"><strong>id</strong>​</p>
</th><th data-block-token="I0ZJdeXHRoBSyjxxgdEcwIXln6q" colspan="1" rowspan="1"><p data-block-token="WWy3diLO9ordOfxLLNbcxVfjnsd"><strong>color</strong>​</p>
</th><th data-block-token="F6DzdJQm1oidtvx7KUqcOkIZnYe" colspan="1" rowspan="1"><p data-block-token="Em7wd7DuRoigntxHi1lc5m9LnI3"><strong>vector</strong>​</p>
</th><th data-block-token="II7AdYYYyoyHshxkJ5kc9jwAn8K" colspan="1" rowspan="1"><p data-block-token="FPK8dbBSkol9zOxMY1gcHnFHnye"><strong>price</strong>​</p>
</th><th data-block-token="FqP1dNbS4oZgATxzKCUcvjoUnve" colspan="1" rowspan="1"><p data-block-token="Fi9xd4MPToImaRxUNV7c8lW1nOh"><strong>inventory</strong>​</p>
</th><th data-block-token="OcDPd43PxoGaPexv1nQcNWSwnJf" colspan="1" rowspan="1"><p data-block-token="E64Sd8AkJoQ8nQxcpcHcUfMjnDW"><strong>sales_volume</strong>​</p>
</th><th data-block-token="MtPmdXPnNoarkBxR2bVcEQPlnPS" colspan="1" rowspan="1"><p data-block-token="HvxMduuTKo6cWUxUOsnc3ADEnHh"><strong>description</strong>​</p>
</th></tr></thead><tbody><tr><td data-block-token="QRH0dSPAloZVXtxyQDAcFWxanBc" colspan="1" rowspan="1">1</td><td data-block-token="S4vAdpxONo77XJxz5uRcjVVundg" colspan="1" rowspan="1"><p data-block-token="VfRDdF2zwoCC5hxK6PWciImQnVg">pink_8682​</p>
</td><td data-block-token="VkCEd7YSyovXfcxe43xcFErPn5g" colspan="1" rowspan="1"><p data-block-token="Thjyd4BtMoyQwkxkyNWcyj77nyd">[0.3580376395471989, -0.6023495712049978, ...]​</p>
</td><td data-block-token="D0gCdQMnro4ABYxSAUGcOXVEnoX" colspan="1" rowspan="1"><p data-block-token="XUZRdeubKoFRWhxtw8nckMbIndh">593​</p>
</td><td data-block-token="S6YBdqN5Xo78YIxoEoXcEuu0nTd" colspan="1" rowspan="1"><p data-block-token="AuVwde9UgognN2x3TgEcNo9LnBb">{"brand": "Sony", "quantity": 310}​</p>
</td><td data-block-token="Pvl6dmfwXosaGBx4yT1cFXetnWf" colspan="1" rowspan="1"><p data-block-token="Cg2fd2K7HogGtFxkGA0cwPiTnth">[161, 81, 51]​</p>
</td><td data-block-token="MAdwdml5foFu9yxJbmkctv1dncc" colspan="1" rowspan="1"><p data-block-token="XyuOdHc6KooIHvxB9UXcdY0AnTb">Sony Xperia 1 VI is a flagship Android smartphone released in 2024 with a 6.5-inch LTPO OLED display​</p>
</td></tr><tr><td data-block-token="BE3xd3NH9oaxdOxyclVcLb6qnth" colspan="1" rowspan="1"><p data-block-token="GfwAd7ZYHoKQvBxuUpqcEzwEnVh">2​</p>
</td><td data-block-token="JybFdLLZzozrScxljKccqYtgn9f" colspan="1" rowspan="1"><p data-block-token="Gus2dBieloF4cYxcJThcykJHncf">red_7025​</p>
</td><td data-block-token="DOCEd8EV3oZgqwx7iO8cp3MRnhb" colspan="1" rowspan="1"><p data-block-token="GvYddZCYSoB5JFxA6ancFsYFnXQ">[0.43742130801983836, -0.5597502546264526, ....]​</p>
</td><td data-block-token="Am6adjx8Jo6huex2r9OcRCfinBh" colspan="1" rowspan="1"><p data-block-token="VQevdoMw1oVWDAxagjecDedrnwh">196​</p>
</td><td data-block-token="Q2UAdOyfoo0i1yx0M5ec7kjGn7e" colspan="1" rowspan="1"><p data-block-token="C8WUd8FZnopOY5xAQHMcRpRWngb">{"brand": "Samsung", "quantity": 274}​</p>
</td><td data-block-token="U9CPdGR76oryyKxcGi9cF3wQnTh" colspan="1" rowspan="1"><p data-block-token="HxLFd3FJQoncQUxxUeCcGelSnqc">[126, 126, 125, 96, 155]​</p>
</td><td data-block-token="PtIndGANSoH3stxy2gicFrNTn5c" colspan="1" rowspan="1"><p data-block-token="D2YQdCXdSoew0dx0ESrceOqxnVd">Galaxy S24 Ultra, Samsung’s latest flagship smartphone.​</p>
</td></tr><tr><td data-block-token="OruUd4laNoWXYvx9MT6csg9bn2f" colspan="1" rowspan="1"><p data-block-token="KjxmdZ7LBo2RTUxT5XucRM1ZnTe">3​</p>
</td><td data-block-token="VsKWdSgXCol9b5xtVsmcnBtlnIh" colspan="1" rowspan="1"><p data-block-token="MRpSdifOPobZcYxMdbDcPfq9nzb">orange_6781​</p>
</td><td data-block-token="AiwrdAh5Xoj7u4xWEL1cd53Dnfe" colspan="1" rowspan="1"><p data-block-token="VZTRd2gqHo1Ay2xDaf1cicy1n3c">[0.19886812562848388, 0.06023560599112088, ...]​</p>
</td><td data-block-token="NP1Fd7oF7og4GJxsYRfcQQksnlc" colspan="1" rowspan="1"><p data-block-token="J59NdphcJoXMnwxjedbc91gKnFc">862​</p>
</td><td data-block-token="W76qdV0e4oE3agxSADhcHyD2n2f" colspan="1" rowspan="1"><p data-block-token="ZhZddr4Giou6FoxvMx1ckSO7nih">{"brand": "Samsung", "quantity": 103}​</p>
</td><td data-block-token="YALodLyPyolbLlxNy6IcP8JWn9f" colspan="1" rowspan="1"><p data-block-token="DP3kdVSCcoPVnpxRNOGc1TxmnBZ">[124, 117, 90, 188]​</p>
</td><td data-block-token="AYz4d92bwoUityxx7SxcAkbqn6c" colspan="1" rowspan="1"><p data-block-token="JMwZdos6KoDSvBxgtG5cM2W7nwh">Galaxy Fold features the world’s first 7.3-inch Infinity Flex Display.​</p>
</td></tr><tr><td data-block-token="V2B7di6nJohEEcx9iYJcC0SHnIb" colspan="1" rowspan="1"><p data-block-token="GSNLdlH6Po6agnxls5JclPCBn6b">4​</p>
</td><td data-block-token="K5d8dYbKVoQoXixILeocsga9nBg" colspan="1" rowspan="1"><p data-block-token="SPn7dL1eAoso0pxOEapcOuD6nPc">pink_9298​</p>
</td><td data-block-token="UpmbdScVsozEZ3x7pPpcW818n3d" colspan="1" rowspan="1"><p data-block-token="DTI3duvnvoF836xLFd7c7H1rnfb">[0.3172005263489739, 0.9719044792798428, ...]​</p>
</td><td data-block-token="Kx1Xd164Zos7TWxJmsBc9HzUnUb" colspan="1" rowspan="1"><p data-block-token="Ssk9deQimocLJjxgI5scDlKWntd">991​</p>
</td><td data-block-token="FjJgdgLeloGed5xPSJJck5oan3e" colspan="1" rowspan="1"><p data-block-token="MNRydm9JZowcVrxB2UIcIpU8npg">{"brand": "Microsoft", "quantity": 175,}​</p>
</td><td data-block-token="S0AtdjgYtomQqIxZDuocBqntnnf" colspan="1" rowspan="1"><p data-block-token="IM22dcQ2Lo2RfaxuCK4cXjmonsb">[133, 92, 181, 61, 193]​</p>
</td><td data-block-token="WE3Cd4G0LonD7kxfI5gcHaGEnKe" colspan="1" rowspan="1"><p data-block-token="YxlwdiSWAosYOBxiCuhcD4OTnNb">Surface Duo 2, now with lightning-fast 5G(Footnote1) and dynamic triple lens camera.​</p>
</td></tr><tr><td data-block-token="N5PDd2EXhoJphCxOjCkcGetXnOb" colspan="1" rowspan="1"><p data-block-token="KjdydkCNho0Fq0xgGpmcpkbQnGh">5​</p>
</td><td data-block-token="NGN3daNKpoIg3TxSCWjcEJ0enHg" colspan="1" rowspan="1"><p data-block-token="FVDYdcF82oUHfsxDy2ccNTaxnsc">red_4794​</p>
</td><td data-block-token="IFyodcwR7o6Nn4x3zh1c9DMcnye" colspan="1" rowspan="1"><p data-block-token="Frd4dzp1SoOpd5xYgcbcqV4In1c">[0.4452349528804562, -0.8757026943054742, ...]​</p>
</td><td data-block-token="Vt1odwpE8oRAugxhqOCcFbMqnRe" colspan="1" rowspan="1"><p data-block-token="FtQwdwIwtoriGHxSYR4cS9nZnJb">327​</p>
</td><td data-block-token="FyX8d2svJoGTUvxtFsFczGYDnVb" colspan="1" rowspan="1"><p data-block-token="HSiZdJsb9o3kaLxAAqaclJQJnWH">{"brand": "Apple", "quantity": 193}​</p>
</td><td data-block-token="RDI2d88xvoNmLwxZWTWcUO5PnPg" colspan="1" rowspan="1"><p data-block-token="JSpHdKedlowkFCxpShOcanMLnkh">[155, 161, 106, 86, 99]​</p>
</td><td data-block-token="Q2MLdUk1Po3TXtxFUmdc45a4n1b" colspan="1" rowspan="1"><p data-block-token="KA5ydXE3Fovau0x1X62cFrhRnhf">iPhone 15 Pro, A new chip designed for better gaming and other 'pro' features.​</p>
</td></tr><tr><td data-block-token="Ea20dKtiDoGAjtxGp8HcH8q6nch" colspan="1" rowspan="1"><p data-block-token="Ac9mdxt7noD45LxfkKUcgLEDnJf">6​</p>
</td><td data-block-token="IqgcdGcm0ofTuYx0jzpc2aMfnNz" colspan="1" rowspan="1"><p data-block-token="G3CHdEKjRoQChrxV1GNcvB2Fn3c">yellow_4222​</p>
</td><td data-block-token="JVUZd2GweoExGkxzrXMcOmoEnve" colspan="1" rowspan="1"><p data-block-token="WhrzdBnf0oKMtNxxm3ocxyg4nle">[0.985825131989184, -0.8144651566660419, ...]​</p>
</td><td data-block-token="EcpkdpEv8ogagqxIpqEcivjjnOb" colspan="1" rowspan="1"><p data-block-token="NBwud0u5Poe2zZxgnMgcieOgnWL">996​</p>
</td><td data-block-token="WfVxd3rc1oxqCpxSPX1cQY5Snhe" colspan="1" rowspan="1"><p data-block-token="NRISd9zGzoJnPQx3o7xcyp3Sn2d">{"brand": "Microsoft", "quantity": 376}​</p>
</td><td data-block-token="EHlddj5MOo8OLexTdXpcsiPHnuj" colspan="1" rowspan="1"><p data-block-token="LCJudvtTAox1ArxdmA1cUoSrnMe">[173, 151, 148]​</p>
</td><td data-block-token="ZC3OddVVqokFECxiRGwcgUdQnY3" colspan="1" rowspan="1"><p data-block-token="ZcIedzoDdo6K3zx5bXfcgPh0n2c">The Microsoft Surface Duo seems at first like the perfect little device for this new work-from-home world.​</p>
</td></tr><tr><td data-block-token="NZ97dNGjNovurNxKsxacBCkTnHb" colspan="1" rowspan="1"><p data-block-token="QT3MdGVB9owzsTxivlccGu6unRc">7​</p>
</td><td data-block-token="KObKdLr2NouSShxBjtKcV2vpnkg" colspan="1" rowspan="1"><p data-block-token="CeRRdRVgComLHYxIV6accbvCnuh">red_9392​</p>
</td><td data-block-token="R4LPdkpH3oetzXx5RzjctmTfnga" colspan="1" rowspan="1"><p data-block-token="NbIrdjN2boRAQbxJ1IacZ8Qpnuc">[0.8371977790571115, -0.015764369584852833, ...]​</p>
</td><td data-block-token="QANcdcxAioEW9YxRLRvcsfminXd" colspan="1" rowspan="1"><p data-block-token="NvqvdsJppoUKFsxry6Tc3wnNnOx">848​</p>
</td><td data-block-token="At98dIknmoXoZSxUIXwcsTe5nZb" colspan="1" rowspan="1"><p data-block-token="CuXHdCU5hoDwXyxQwffcRJe4nUd">{"brand": "Apple", "quantity": 61}​</p>
</td><td data-block-token="McJYdywckoRGTAxIWGFcTKnMnKl" colspan="1" rowspan="1"><p data-block-token="V6BKdMin6oKYSuxwmaRcPNvVnne">[59, 156, 126, 60, 177]​</p>
</td><td data-block-token="AwFpd6uw2oeDPuxMKjHcEUH8nsb" colspan="1" rowspan="1"><p data-block-token="QRDLdsPDpoSi9nxkhhkcO6wInqB">The iPhone 14 is a smartphone from Apple Inc. that comes in various colors and sizes.​</p>
</td></tr><tr><td data-block-token="JNLXdIoWFoQAr3xEp4acBeZzn0d" colspan="1" rowspan="1"><p data-block-token="S5hwd5kzSo4subxA87IcLasZnvf">8​</p>
</td><td data-block-token="A7XadYjKIogygex2w40c6vNJnrd" colspan="1" rowspan="1"><p data-block-token="RteBd6V5FoL7IbxAE4FcAvupnfg">grey_8510​</p>
</td><td data-block-token="IoNudCU5OogfOMxOmHJc8qbHnBf" colspan="1" rowspan="1"><p data-block-token="IXMTdrkMGodIhNxPpX8cQr88nBv">[-0.33445148015177995, -0.2567135004164067, ...]​</p>
</td><td data-block-token="DonodmIbjoRgRRx4E7ycEybSnkg" colspan="1" rowspan="1"><p data-block-token="Oj4XdppwdoQkOkx91e4c9Ub7nZg">241​</p>
</td><td data-block-token="SM4qdp3aUokmTbxerS9cULXOn2b" colspan="1" rowspan="1"><p data-block-token="FtpNd8taGonMVxxE3uMcoc3onCc">{"brand": "Dell", "quantity": 248}​</p>
</td><td data-block-token="C0CkdqK7AoFwWyxPSsZccqhmnXf" colspan="1" rowspan="1"><p data-block-token="AWeydx9lhoZKhXxzAARcPTzjnbg">[105, 126, 114, 132]​</p>
</td><td data-block-token="Kli6dEN0ko80b1xUNzKcRLaHn6g" colspan="1" rowspan="1"><p data-block-token="JnkadXMEoofiorxuBP7c9MFmnUd">The Dell Inspiron 15 3000 laptop is equipped with a powerful Intel Core i5-1135G7 Quad-Core Processor, 12GB RAM and 256GB SSD storage.​</p>
</td></tr><tr><td data-block-token="VYWhd91gAoRTpXxhSU7c7jdmnEE" colspan="1" rowspan="1"><p data-block-token="Lxd4d63v4o0YEIx2NP1c5nXJn1b">9​</p>
</td><td data-block-token="NlHNdWG1QoLSZqx0kIKcXw54nLf" colspan="1" rowspan="1"><p data-block-token="Ih7odgVrKozU8bxO0vUcaVADnod">white_9381​</p>
</td><td data-block-token="K9WgdaUdIoClLGxfr7pcLXB3nCg" colspan="1" rowspan="1"><p data-block-token="XWcTdnTmTowaBrxI8pzcaT1ln3d">[0.39524717779832685, 0.4000257286739164, ...]​</p>
</td><td data-block-token="TvdcdBiURoP3F2xAmHkcs6WVngy" colspan="1" rowspan="1"><p data-block-token="Xa7cdRpZkoIIdIxUauwciPpansg">597​</p>
</td><td data-block-token="RNvHdSZKUoZ2JzxKE5ZcsbEznc2" colspan="1" rowspan="1"><p data-block-token="KZICdmwOwog7AmxWzRDcj7ufnYb">{"brand": "Apple", "quantity": 351}​</p>
</td><td data-block-token="SctvdEBoAoYvvyxoStyc9TaNnEf" colspan="1" rowspan="1"><p data-block-token="Mgnjde8Loo6QjDxXeoCcPamGn1e">[150, 150, 73]​</p>
</td><td data-block-token="ZPgkdhV3aoq78bxcz3ucysnsn5b" colspan="1" rowspan="1"><p data-block-token="WrY4dizZdoGuLmx90GicLnMgnvb">The iPhone 16 features a 6.1-inch OLED display, is powered by Apple's A18 processor, and has dual cameras at the back.​</p>
</td></tr><tr><td data-block-token="L4Gzd1dP9oW1dQxXvWncIbeLnag" colspan="1" rowspan="1"><p data-block-token="EnF3doktUoapHxx9aqccSMqEnad">10​</p>
</td><td data-block-token="CFbGdBWh5o4HgAxPw4mc5ldKnVg" colspan="1" rowspan="1"><p data-block-token="T2iGdfOu9oC1Rjxr0u0c7BcynJB">purple_4976​</p>
</td><td data-block-token="TJyNdkx7JoEYn9xF4cYcM3o6nWe" colspan="1" rowspan="1"><p data-block-token="GSB3dCsOAoZ5ADx0j1bclPKxnWc">[0.5718280481994695, 0.24070317428066512, ...]​</p>
</td><td data-block-token="QMiodCe6ooedabxzbGocSz06nGh" colspan="1" rowspan="1"><p data-block-token="ZS1wdBAw0oo651xSK9mcAZkenPb">450​</p>
</td><td data-block-token="AOAHdx9YOox655xOSrFcqPMjnwb" colspan="1" rowspan="1"><p data-block-token="VGIkdFw0noAZgAxLPrVcukiWnNb">{"brand": "Apple", "quantity": 268}​</p>
</td><td data-block-token="IS9fdAsrbocXDTxwqvFcjh36nXb" colspan="1" rowspan="1"><p data-block-token="Y1dJdl29DoYkQPx6M25cl1QIn6f">[190, 149, 85, 79, 80]​</p>
</td><td data-block-token="SONZdwCmnoDGqbxCrjUcXgfUnJf" colspan="1" rowspan="1"><p data-block-token="Ejqqd5xRyoFfbaxk1QBcyaqQnZd">The iPad is a brand of iOS- and iPadOS-based tablet computers that are developed and marketed by Apple.​</p>
</td></tr></tbody></table>
<ul>
<li><p><code translate="no">id</code>: The ID of the product. The data type of this field is INT64.​</p></li>
<li><p><code translate="no">vector</code>: The embedding vector of the product image that can represent different features of the product (such as product size, style, pattern, etc.). For convenience, this field is omitted in the demonstration. ​</p></li>
<li><p><code translate="no">color</code>: The color of the product. The data type of this field is VARCHAR. The numeric value in this field indicates the hue, which helps differentiate various shades of colors.​</p></li>
<li><p><code translate="no">price</code>: The price of the product. The data type of this field is INT64.​</p></li>
<li><p><code translate="no">inventory</code>: The inventory of the product. The data type of this field is JSON and contains two keys: the  key <code translate="no">brand</code> represents the brand of the product and the key <code translate="no">quantity</code> represents the number of items in stock.​</p></li>
<li><p><code translate="no">sales_volume</code>:  The sales volume of products in different countries. The data type of this field is Array. The values in this array contain 3 to 5 integers.​</p></li>
<li><p><code translate="no">description</code>: The description of the product. The data type of this field is VARCHAR. It offers a summary of the product features, functionality, and intended users.​</p></li>
</ul>
<h2 id="Single-condition-filtering" class="common-anchor-header">Single-condition filtering<button data-href="#Single-condition-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>The following types of operators can be used in filters with single condition:​</p>
<ul>
<li><p><a href="#Comparison-operators">Comparison operators</a>​</p></li>
<li><p><a href="#Term-operators">Term operators</a>​</p></li>
<li><p><a href="#Match-operators">Match operators</a>​</p></li>
<li><p><a href="#Arithmetic-operators">Arithmetic operators</a>​</p></li>
<li><p><a href="#Advanced-JSON-operators">Advanced JSON operators</a>​</p></li>
<li><p><a href="#Advanced-Array-operators">Advanced Array operators</a>​</p></li>
</ul>
<h3 id="Comparison-operators" class="common-anchor-header">Comparison operators</h3><p>Comparison operators include:​</p>
<ul>
<li><p><code translate="no">&gt;</code>: Greater than​</p></li>
<li><p><code translate="no">&lt;</code>: Less than​</p></li>
<li><p><code translate="no">==</code>: Equal​</p></li>
<li><p><code translate="no">&lt;=</code>: Less than or equal​</p></li>
<li><p><code translate="no">&gt;=</code>: Greater than or equal​</p></li>
<li><p><code translate="no">!=</code>: Not equal​</p></li>
</ul>
<h4 id="Example-1-Apply-filter-on-scalar-field​" class="common-anchor-header">Example 1: Apply filter on scalar field​</h4><p>The following example demonstrates how to filter products with prices ranging from 500 to 900:​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">from pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&quot;500 &lt; price &lt; 900&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;pink_8682&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">593.0</span>)}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;orange_6781&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">862.0</span>)}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_9392&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">848.0</span>)}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;white_9381&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">597.0</span>)}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;500 &lt; price &lt; 900&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// {color=pink_8682, price=593.0, id=1}​</span>
<span class="hljs-comment">// {color=orange_6781, price=862.0, id=3}​</span>
<span class="hljs-comment">// {color=red_9392, price=848.0, id=7}​</span>
<span class="hljs-comment">// {color=white_9381, price=597.0, id=9}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&quot;500 &lt; price &lt; 900&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;500 &lt; price &lt; 900&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-json">[​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span> <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">593</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span> <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">862</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span> <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">848</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span> <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">597</span>}​
]​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Apply-filter-on-JSON-field" class="common-anchor-header">Example 2: Apply filter on JSON field</h4><p>The following example demonstrates how to filter products with an inventory quantity of 250 or more.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;inventory[&quot;quantity&quot;] &gt;= 250&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;pink_8682&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">593.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Sony&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">310</span>}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_7025&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">196.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Samsung&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">274</span>}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;yellow_4222&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">996.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Microsoft&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">376</span>}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;white_9381&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">597.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">351</span>}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;purple_4976&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">450.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">268</span>}}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-string">&quot;inventory[\&quot;quantity\&quot;] &gt;= 250&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=pink_8682, price=<span class="hljs-number">593.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">1</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Sony&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">310</span>}}​
// {color=red_7025, price=<span class="hljs-number">196.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">2</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Samsung&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">274</span>}}​
// {color=yellow_4222, price=<span class="hljs-number">996.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">6</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Microsoft&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">376</span>}}​
// {color=white_9381, price=<span class="hljs-number">597.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">9</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Apple&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">351</span>}}​
// {color=purple_4976, price=<span class="hljs-number">450.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">10</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Apple&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">268</span>}}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;inventory[&quot;quantity&quot;] &gt;= 250&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;inventory[\&quot;quantity\&quot;] &gt;=250&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;, &quot;inventory&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">593</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Sony&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">310</span>​
    },​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">161</span>,​
      <span class="hljs-number">81</span>,​
      <span class="hljs-number">51</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">196</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Samsung&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">274</span>​
    },​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">126</span>,​
      <span class="hljs-number">126</span>,​
      <span class="hljs-number">125</span>,​
      <span class="hljs-number">96</span>,​
      <span class="hljs-number">155</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">996</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Microsoft&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">376</span>​
    },​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">173</span>,​
      <span class="hljs-number">151</span>,​
      <span class="hljs-number">148</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">597</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Apple&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">351</span>​
    },​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">150</span>,​
      <span class="hljs-number">150</span>,​
      <span class="hljs-number">73</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">450</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Apple&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">268</span>​
    },​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">190</span>,​
      <span class="hljs-number">149</span>,​
      <span class="hljs-number">85</span>,​
      <span class="hljs-number">79</span>,​
      <span class="hljs-number">80</span>​
    ]​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-3-Apply-filter-on-Array-field​" class="common-anchor-header">Example 3: Apply filter on Array field​</h4><p>The following example demonstrates how to filter products whose sales volume in the first country is 150 or more.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&quot;sales_volume[0] &gt;= 150&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;pink_8682&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">593.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">161</span>, <span class="hljs-number">81</span>, <span class="hljs-number">51</span>]}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_4794&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">327.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">155</span>, <span class="hljs-number">161</span>, <span class="hljs-number">106</span>, <span class="hljs-number">86</span>, <span class="hljs-number">99</span>]}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;yellow_4222&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">996.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">173</span>, <span class="hljs-number">151</span>, <span class="hljs-number">148</span>]}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;white_9381&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">597.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">150</span>, <span class="hljs-number">150</span>, <span class="hljs-number">73</span>]}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;purple_4976&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">450.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">190</span>, <span class="hljs-number">149</span>, <span class="hljs-number">85</span>, <span class="hljs-number">79</span>, <span class="hljs-number">80</span>]}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;sales_volume[0] &gt;= 150&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>))​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// {color=pink_8682, price=593.0, id=1, sales_volume=[161, 81, 51]}​</span>
<span class="hljs-comment">// {color=red_4794, price=327.0, id=5, sales_volume=[155, 161, 106, 86, 99]}​</span>
<span class="hljs-comment">// {color=yellow_4222, price=996.0, id=6, sales_volume=[173, 151, 148]}​</span>
<span class="hljs-comment">// {color=white_9381, price=597.0, id=9, sales_volume=[150, 150, 73]}​</span>
<span class="hljs-comment">// {color=purple_4976, price=450.0, id=10, sales_volume=[190, 149, 85, 79, 80]}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&quot;sales_volume[0] &gt;= 150&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;sales_volume[0] &gt;= 150&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;, &quot;sales_volume&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">593</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">161</span>,​
      <span class="hljs-number">81</span>,​
      <span class="hljs-number">51</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">327</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">155</span>,​
      <span class="hljs-number">161</span>,​
      <span class="hljs-number">106</span>,​
      <span class="hljs-number">86</span>,​
      <span class="hljs-number">99</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">996</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">173</span>,​
      <span class="hljs-number">151</span>,​
      <span class="hljs-number">148</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">597</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">150</span>,​
      <span class="hljs-number">150</span>,​
      <span class="hljs-number">73</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">450</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">190</span>,​
      <span class="hljs-number">149</span>,​
      <span class="hljs-number">85</span>,​
      <span class="hljs-number">79</span>,​
      <span class="hljs-number">80</span>​
    ]​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Term-operators​" class="common-anchor-header">Term operators​</h3><p>Term operators include:​</p>
<ul>
<li><p><code translate="no">in</code>: Filter results that match the condition​</p></li>
<li><p><code translate="no">not in</code>: Filter results that do not match the condition​</p></li>
</ul>
<h4 id="Example-1-Apply-filter-on-scalar-field​" class="common-anchor-header">Example 1: Apply filter on scalar field​</h4><p>The following example demonstrates how to filter products whose color is not red.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;color not in [&quot;red_7025&quot;,&quot;red_4794&quot;,&quot;red_9392&quot;]&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;pink_8682&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">593.0</span>)}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;orange_6781&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">862.0</span>)}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;pink_9298&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">991.0</span>)}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;yellow_4222&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">996.0</span>)}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">8</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;grey_8510&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">241.0</span>)}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;white_9381&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">597.0</span>)}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;purple_4976&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">450.0</span>)}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;color not in [\&quot;red_7025\&quot;,\&quot;red_4794\&quot;,\&quot;red_9392\&quot;]&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// {color=pink_8682, price=593.0, id=1}​</span>
<span class="hljs-comment">// {color=orange_6781, price=862.0, id=3}​</span>
<span class="hljs-comment">// {color=pink_9298, price=991.0, id=4}​</span>
<span class="hljs-comment">// {color=yellow_4222, price=996.0, id=6}​</span>
<span class="hljs-comment">// {color=grey_8510, price=241.0, id=8}​</span>
<span class="hljs-comment">// {color=white_9381, price=597.0, id=9}​</span>
<span class="hljs-comment">// {color=purple_4976, price=450.0, id=10}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;color not in [&quot;red_7025&quot;,&quot;red_4794&quot;,&quot;red_9392&quot;]&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;color not in [\&quot;red_7025\&quot;,\&quot;red_4794\&quot;,\&quot;red_9392\&quot;]&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-json">[​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">593</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">863</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_9298&quot;</span> <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">991</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span> <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">996</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;grey_8510&quot;</span> <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">241</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span> <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">597</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span> <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">450</span>}​
]​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Apply-filter-on-JSON-field​" class="common-anchor-header">Example 2: Apply filter on JSON field​</h4><p>The following example demonstrates how to filter products whose brand is Apple.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;inventory[&quot;brand&quot;] in [&quot;Apple&quot;]&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_4794&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">327.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">193</span>}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_9392&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">848.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">61</span>}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;white_9381&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">597.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">351</span>}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;purple_4976&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">450.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">268</span>}}} ​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-string">&quot;inventory[\&quot;brand\&quot;] in [\&quot;Apple\&quot;]&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_4794&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.float32(<span class="hljs-number">327.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">193</span>}}​
// {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_9392&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.float32(<span class="hljs-number">848.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">61</span>}}​
// {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;white_9381&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.float32(<span class="hljs-number">597.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">351</span>}}​
// {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;purple_4976&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.float32(<span class="hljs-number">450.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">268</span>}}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;inventory[&quot;brand&quot;] in [&quot;Apple&quot;]&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;inventory[\&quot;brand\&quot;] in [\&quot;Apple\&quot;]&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;,&quot;price&quot;, &quot;inventory&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">327</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Apple&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">193</span>​
    }​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">848</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Apple&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">61</span>​
    }​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">597</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Apple&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">351</span>​
    }​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">450</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Apple&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">268</span>​
    }​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-operators​" class="common-anchor-header">Match operators​</h3><p>Match operators include:​</p>
<ul>
<li><p><code translate="no">like</code>: Match constants or prefixes (prefix%), infixes (%infix%), and suffixes (%suffix) within constants. It relies on a brute-force search mechanism using wildcards and does not involve text tokenization. While it can achieve exact matches, its query efficiency is relatively low, making it suitable for simple matching tasks or queries on smaller datasets.​</p></li>
<li><p><code translate="no">TEXT_MATCH</code>: Match specific terms or keywords on VARCHAR fields, using tokenization and inverted index to enable efficient text search. Compared to <code translate="no">like</code>, <code translate="no">TEXT_MATCH</code> offers more advanced text tokenization and filtering capabilities. It is suited for large-scale datasets where higher query performance is required for complex text search scenarios.​</p>
<p><div class="alert note"></p>
<p>To use the <code translate="no">TEXT_MATCH</code> filter expression, you must enable text matching for the target <code translate="no">VARCHAR</code> field when creating the collection. For details, refer to <a href="/docs/fr/keyword-match.md">Text Match</a>.​</p>
<p></div></p></li>
</ul>
<h4 id="Example-1-Apply-filter-on-scalar-field​" class="common-anchor-header">Example 1: Apply filter on scalar field​</h4><p>The following example demonstrates how to filter products whose color is red. In this case, you can quickly filter all red products by matching the prefix 'red%’. Similarly, you can use the expression color in ['red_7025’, 'red_4794’, ‘red_9392’] to filter all red products. However, when the data is more complex, we recommend using the like operator for more efficient filtering.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;color like &quot;red%&quot;&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_7025&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">196.0</span>)}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_4794&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">327.0</span>)}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_9392&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">848.0</span>)}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// {color=red_7025, price=196.0, id=2}​</span>
<span class="hljs-comment">// {color=red_4794, price=327.0, id=5}​</span>
<span class="hljs-comment">// {color=red_9392, price=848.0, id=7}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;color like &quot;red%&quot;&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;color like \&quot;red%\&quot;&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-json">[​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">196</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span> <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">327</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span> <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">848</span>}​
]​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Apply-filter-on-JSON-field​" class="common-anchor-header">Example 2: Apply filter on JSON field​</h4><p>The following example demonstrates how to filter products whose brand name starts with the letter 'S’.​</p>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;inventory[&quot;brand&quot;] like &quot;S%&quot;&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;pink_8682&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">593.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Sony&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">310</span>}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_7025&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">196.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Samsung&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">274</span>}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;orange_6781&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">862.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Samsung&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">103</span>}}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-string">&quot;inventory[\&quot;brand\&quot;] like \&quot;S%\&quot;&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=pink_8682, price=<span class="hljs-number">593.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">1</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Sony&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">310</span>}}​
// {color=red_7025, price=<span class="hljs-number">196.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">2</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Samsung&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">274</span>}}​
// {color=orange_6781, price=<span class="hljs-number">862.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">3</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Samsung&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">103</span>}}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;inventory[&quot;brand&quot;] like &quot;S%&quot;&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;inventory[\&quot;brand\&quot;] like \&quot;S%\&quot;&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;, &quot;inventory&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-json">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">593</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Sony&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">310</span>​
    }​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">196</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Samsung&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">274</span>​
    }​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">862</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Samsung&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">103</span>​
    }​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-3-Text-match-on-VARCHAR-fields​" class="common-anchor-header">Example 3: Text match on VARCHAR fields​</h4><p>The <code translate="no">TEXT_MATCH</code> expression is used for text match on <code translate="no">VARCHAR</code> fields. By default, it applies an <strong>OR</strong> logic, but you can combine it with other logical operators to create more complex query conditions. For details, refer to <a href="/docs/fr/keyword-match.md">Text Match</a>.​</p>
<p>The following example demonstrates how to use the <code translate="no">TEXT_MATCH</code> expression to filter products where the <code translate="no">description</code> field contains either the term <code translate="no">&quot;Apple&quot;</code> or <code translate="no">&quot;iPhone&quot;</code>:​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(description, &quot;Apple iPhone&quot;)&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>],​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;TEXT_MATCH(description, \&quot;Apple iPhone\&quot;)&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>))​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> results = client.<span class="hljs-title function_">query</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;TEXT_MATCH(description, &#x27;Apple iPhone&#x27;)&quot;</span>,​
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>]​
});​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&quot;iPhone 15 Pro, A new chip designed for better gaming and other &#x27;pro&#x27; features.&quot;</span>}​
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&quot;The iPhone 14 is a smartphone from Apple Inc. that comes in various colors and sizes.&quot;</span>}​
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&quot;The iPhone 16 features a 6.1-inch OLED display, is powered by Apple&#x27;s A18 processor, and has dual cameras at the back.&quot;</span>}​
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&quot;The iPad is a brand of iOS- and iPadOS-based tablet computers that are developed and marketed by Apple.&quot;</span>}​
]​

<button class="copy-code-btn"></button></code></pre>
<p>To filter for descriptions containing multiple keywords simultaneously, you can use the <code translate="no">and</code> operator. The following example demonstrates how to filter products where the <code translate="no">description</code> field contains both <code translate="no">&quot;chip&quot;</code> and <code translate="no">&quot;iPhone&quot;</code>:​</p>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(description, &quot;chip&quot;) and TEXT_MATCH(description, &quot;iPhone&quot;)&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>],​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;TEXT_MATCH(description, \&quot;chip\&quot;) and TEXT_MATCH(description, \&quot;iPhone\&quot;)&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>))​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> results = client.<span class="hljs-title function_">query</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;TEXT_MATCH(description, &#x27;chip&#x27;) and TEXT_MATCH(description, &#x27;iPhone&#x27;)&quot;</span>,​
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>]​
});​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-python">[​
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&quot;iPhone 15 Pro, A new chip designed for better gaming and other &#x27;pro&#x27; features.&quot;</span>}​
]​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Arithmetic-operators​" class="common-anchor-header">Arithmetic operators​</h3><p>Arithmetic operators include:​</p>
<ul>
<li><p><code translate="no">+</code>: Addition​</p></li>
<li><p><code translate="no">-</code>: Subtraction​</p></li>
<li><p><code translate="no">*</code>: Multiplication​</p></li>
<li><p><code translate="no">/</code>: Division​</p></li>
<li><p><code translate="no">**</code>: Power​</p></li>
<li><p><code translate="no">%</code>: Modulo​</p></li>
</ul>
<h4 id="Example-1-Apply-filter-on-scalar-field​" class="common-anchor-header">Example 1: Apply filter on scalar field​</h4><p>The following example demonstrates how to filter products whose price, after a 50% discount, is between 200 and 300 (both inclusive).​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&quot;200 &lt;= price*0.5 and price*0.5 &lt;= 300&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">593.0</span>)}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">597.0</span>)}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">450.0</span>)}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
<span class="hljs-type">ueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;200 &lt;= price*0.5 and price*0.5 &lt;= 300&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// {price=593.0, id=1}​</span>
<span class="hljs-comment">// {price=597.0, id=9}​</span>
<span class="hljs-comment">// {price=450.0, id=10}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&quot;200 &lt;= price*0.5 &lt;= 300&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;200 &lt;= price*0.5 &lt;= 300&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;price&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-json">[​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">593</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">597</span>},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span> <span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">450</span>}​
]​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Apply-filter-on-JSON-field​" class="common-anchor-header">Example 2: Apply filter on JSON field​</h4><p>The following example demonstrates how to filter products whose inventory, when doubled, exceeds 600 items.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;inventory[&quot;quantity&quot;] * 2 &gt; 600&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;pink_8682&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">593.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Sony&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">310</span>}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;yellow_4222&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">996.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Microsoft&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">376</span>}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;white_9381&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">597.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">351</span>}}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-string">&quot;inventory[\&quot;quantity\&quot;] * 2 &gt; 600&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=pink_8682, price=<span class="hljs-number">593.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">1</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Sony&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">310</span>}}​
// {color=yellow_4222, price=<span class="hljs-number">996.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">6</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Microsoft&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">376</span>}}​
// {color=white_9381, price=<span class="hljs-number">597.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">9</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Apple&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">351</span>}}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;inventory[&quot;quantity&quot;] * 2 &gt; 600&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;inventory[\&quot;quantity\&quot;] * 2 &gt; 600&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;, &quot;inventory&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">593</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Sony&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">310</span>​
    }​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">996</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Microsoft&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">376</span>​
    }​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">597</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Apple&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">351</span>​
    }​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-3-Apply-filter-on-Array-field​" class="common-anchor-header">Example 3: Apply filter on Array field​</h4><p>The following example demonstrates how to filter products whose combined sales in the first and second countries exceed 300.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&quot;sales_volume[0]*2 &gt; 300&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;pink_8682&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">593.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">161</span>, <span class="hljs-number">81</span>, <span class="hljs-number">51</span>], <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>}​
# {<span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_4794&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">327.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">155</span>, <span class="hljs-number">161</span>, <span class="hljs-number">106</span>, <span class="hljs-number">86</span>, <span class="hljs-number">99</span>], <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">5</span>}​
# {<span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;yellow_4222&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">996.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">173</span>, <span class="hljs-number">151</span>, <span class="hljs-number">148</span>], <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">6</span>}​
# {<span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;purple_4976&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">450.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">190</span>, <span class="hljs-number">149</span>, <span class="hljs-number">85</span>, <span class="hljs-number">79</span>, <span class="hljs-number">80</span>], <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">10</span>}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;sales_volume[0]*2 &gt; 300&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>))​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// {color=pink_8682, price=593.0, id=1, sales_volume=[161, 81, 51]}​</span>
<span class="hljs-comment">// {color=red_4794, price=327.0, id=5, sales_volume=[155, 161, 106, 86, 99]}​</span>
<span class="hljs-comment">// {color=yellow_4222, price=996.0, id=6, sales_volume=[173, 151, 148]}​</span>
<span class="hljs-comment">// {color=purple_4976, price=450.0, id=10, sales_volume=[190, 149, 85, 79, 80]}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&quot;sales_volume[0]*2 &gt; 300&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;sales_volume[0]*2 &gt; 300&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;, &quot;sales_volume&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">327</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">155</span>,​
      <span class="hljs-number">161</span>,​
      <span class="hljs-number">106</span>,​
      <span class="hljs-number">86</span>,​
      <span class="hljs-number">99</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">996</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">173</span>,​
      <span class="hljs-number">151</span>,​
      <span class="hljs-number">148</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">450</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">190</span>,​
      <span class="hljs-number">149</span>,​
      <span class="hljs-number">85</span>,​
      <span class="hljs-number">79</span>,​
      <span class="hljs-number">80</span>​
    ]​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Advanced-JSON-operators​" class="common-anchor-header">Advanced JSON operators​</h3><p>JSON operators include: ​</p>
<ul>
<li><p><code translate="no">JSON_CONTAINS</code>: Filter entities whose JSON field contains elements from a specific list.​</p></li>
<li><p><code translate="no">JSON_CONTAINS_ALL</code>: Filter entities whose JSON field contains all elements from a specific list in the same order.​</p></li>
<li><p><code translate="no">JSON_CONTAINS_ANY</code>: Filter all entities whose JSON field contains any one element from a specific list.​</p></li>
</ul>
<div class="alert note">
<p>When using JSON opertors, the JSON field must contain at least one key whose value is a list.​</p>
</div>
<p>To demonstrate how to use advanced filtering operators on JSON fields, we make a slight adjustment to the example dataset in this section. A new key named ‘previous_sales’ has been added to the JSON ‘inventory’ field, which represents the previous sales of the product in three countries. The value of this key is a list of numbers. Below is the modified new example dataset:​</p>
<h4 id="Example-1-JSONCONTAINS​" class="common-anchor-header">Example 1: <code translate="no">JSON_CONTAINS</code>​</h4><p><code translate="no">JSON_CONTAINS(identifier, JsonExpr)</code>：<code translate="no">identifier</code> is the key name in the JSON field and <code translate="no">JsonExpr</code> is the list of filtering conditions.​</p>
<p>The following example demonstrates how to filter products that previously had sales of 232 items in a specific country.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;JSON_CONTAINS(inventory[\&quot;previous_sales\&quot;], 232)&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Samsung&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&#x27;previous_sales&#x27;</span>: [<span class="hljs-number">232</span>, <span class="hljs-number">254</span>, <span class="hljs-number">275</span>]}, <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;orange_6781&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">862.0</span>)}​
# {<span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Microsoft&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">376</span>, <span class="hljs-string">&#x27;previous_sales&#x27;</span>: [<span class="hljs-number">254</span>, <span class="hljs-number">275</span>, <span class="hljs-number">232</span>]}, <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;yellow_4222&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">996.0</span>)}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-string">&quot;JSON_CONTAINS(inventory[\&quot;previous_sales\&quot;], 232)&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=orange_6781, price=<span class="hljs-number">862.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">3</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Samsung&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">103</span>,<span class="hljs-string">&quot;previous_sales&quot;</span>:[<span class="hljs-number">232</span>,<span class="hljs-number">254</span>,<span class="hljs-number">275</span>]}}​
// {color=yellow_4222, price=<span class="hljs-number">996.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">6</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Microsoft&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">376</span>,<span class="hljs-string">&quot;previous_sales&quot;</span>:[<span class="hljs-number">254</span>,<span class="hljs-number">275</span>,<span class="hljs-number">232</span>]}}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;JSON_CONTAINS(inventory[\&quot;previous_sales\&quot;], 232)&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;JSON_CONTAINS(inventory[\&quot;previous_sales\&quot;], 232)&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;, &quot;inventory&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">862</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Samsung&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">103</span>,​
      <span class="hljs-string">&quot;previous_sales&quot;</span>: [​
        <span class="hljs-number">232</span>,​
        <span class="hljs-number">254</span>,​
        <span class="hljs-number">275</span>​
      ]​
    }​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-JSONCONTAINSALL​" class="common-anchor-header">Example 2: <code translate="no">JSON_CONTAINS_ALL</code>​</h4><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code>：<code translate="no">identifier</code> is the key name in the JSON field and <code translate="no">JsonExpr</code> is the list of filtering conditions.​</p>
<p>The following example demonstrates how to filter products that had previous sales of 232, 254, and 275 items in three different countries.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;JSON_CONTAINS_ALL(inventory[&quot;previous_sales&quot;], [232, 254, 275])&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;orange_6781&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">862.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Samsung&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&#x27;previous_sales&#x27;</span>: [<span class="hljs-number">232</span>, <span class="hljs-number">254</span>, <span class="hljs-number">275</span>]}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;yellow_4222&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">996.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Microsoft&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">376</span>, <span class="hljs-string">&#x27;previous_sales&#x27;</span>: [<span class="hljs-number">254</span>, <span class="hljs-number">275</span>, <span class="hljs-number">232</span>]}}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-string">&quot;JSON_CONTAINS_ALL(inventory[\&quot;previous_sales\&quot;], [232, 254, 275])&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=orange_6781, price=<span class="hljs-number">862.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">3</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Samsung&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">103</span>,<span class="hljs-string">&quot;previous_sales&quot;</span>:[<span class="hljs-number">232</span>,<span class="hljs-number">254</span>,<span class="hljs-number">275</span>]}}​
// {color=yellow_4222, price=<span class="hljs-number">996.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">6</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Microsoft&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">376</span>,<span class="hljs-string">&quot;previous_sales&quot;</span>:[<span class="hljs-number">254</span>,<span class="hljs-number">275</span>,<span class="hljs-number">232</span>]}}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;JSON_CONTAINS_ALL(inventory[&quot;previous_sales&quot;], [232, 254, 275])&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;JSON_CONTAINS_ALL(inventory[\&quot;previous_sales\&quot;], [232, 254, 275])&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;, &quot;inventory&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">862</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Samsung&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">103</span>,​
      <span class="hljs-string">&quot;previous_sales&quot;</span>: [​
        <span class="hljs-number">232</span>,​
        <span class="hljs-number">254</span>,​
        <span class="hljs-number">275</span>​
      ]​
    }​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">996</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Microsoft&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">376</span>,​
      <span class="hljs-string">&quot;previous_sales&quot;</span>: [​
        <span class="hljs-number">254</span>,​
        <span class="hljs-number">275</span>,​
        <span class="hljs-number">232</span>​
      ]​
    }​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-3-JSONCONTAINSANY​" class="common-anchor-header">Example 3: <code translate="no">JSON_CONTAINS_ANY</code>​</h4><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code>：<code translate="no">identifier</code> is the key name in the JSON field and <code translate="no">JsonExpr</code> is the list of filtering conditions.​</p>
<p>The following example demonstrates how to filter products that had previous sales of either 232, 254, or 275 items in any one of the three countries.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;JSON_CONTAINS_ANY(inventory[&quot;previous_sales&quot;], [232, 254, 275])&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;orange_6781&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">862.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Samsung&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&#x27;previous_sales&#x27;</span>: [<span class="hljs-number">232</span>, <span class="hljs-number">254</span>, <span class="hljs-number">275</span>]}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;yellow_4222&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">996.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Microsoft&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">376</span>, <span class="hljs-string">&#x27;previous_sales&#x27;</span>: [<span class="hljs-number">254</span>, <span class="hljs-number">275</span>, <span class="hljs-number">232</span>]}}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_9392&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">848.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">61</span>, <span class="hljs-string">&#x27;previous_sales&#x27;</span>: [<span class="hljs-number">312</span>, <span class="hljs-number">254</span>, <span class="hljs-number">367</span>]}}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-string">&quot;JSON_CONTAINS_ANY(inventory[\&quot;previous_sales\&quot;], [232, 254, 275])&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=orange_6781, price=<span class="hljs-number">862.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">3</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Samsung&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">103</span>,<span class="hljs-string">&quot;previous_sales&quot;</span>:[<span class="hljs-number">232</span>,<span class="hljs-number">254</span>,<span class="hljs-number">275</span>]}}​
// {color=yellow_4222, price=<span class="hljs-number">996.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">6</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Microsoft&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">376</span>,<span class="hljs-string">&quot;previous_sales&quot;</span>:[<span class="hljs-number">254</span>,<span class="hljs-number">275</span>,<span class="hljs-number">232</span>]}}​
// {color=red_9392, price=<span class="hljs-number">848.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">7</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Apple&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">61</span>,<span class="hljs-string">&quot;previous_sales&quot;</span>:[<span class="hljs-number">312</span>,<span class="hljs-number">254</span>,<span class="hljs-number">367</span>]}}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;JSON_CONTAINS_ANY(inventory[&quot;previous_sales&quot;], [232, 254, 275])&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;JSON_CONTAINS_ANY(inventory[\&quot;previous_sales\&quot;], [232, 254, 275])&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;, &quot;inventory&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">862</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Samsung&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">103</span>,​
      <span class="hljs-string">&quot;previous_sales&quot;</span>: [​
        <span class="hljs-number">232</span>,​
        <span class="hljs-number">254</span>,​
        <span class="hljs-number">275</span>​
      ]​
    }​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">996</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Microsoft&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">376</span>,​
      <span class="hljs-string">&quot;previous_sales&quot;</span>: [​
        <span class="hljs-number">254</span>,​
        <span class="hljs-number">275</span>,​
        <span class="hljs-number">232</span>​
      ]​
    }​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">848</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Apple&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">61</span>,​
      <span class="hljs-string">&quot;previous_sales&quot;</span>: [​
        <span class="hljs-number">312</span>,​
        <span class="hljs-number">254</span>,​
        <span class="hljs-number">367</span>​
      ]​
    }​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Advanced-Array-operators​" class="common-anchor-header">Advanced Array operators​</h3><p>Array operators include:​</p>
<ul>
<li><p><code translate="no">ARRAY_CONTAINS</code>: Filter all entities whose Array field contains a specific element.​</p></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL</code>: Filter all entities whose Array field contains all specified elements.​</p></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY</code>: Filter all entities whose Array field contains any one of the specified elements.​</p></li>
<li><p><code translate="no">ARRAY_LENGTH</code>: Check the number of elements in the list.​</p></li>
</ul>
<h4 id="Example-1-ARRAYCONTAINS-​" class="common-anchor-header">Example 1: <code translate="no">ARRAY_CONTAINS</code> ​</h4><p><code translate="no">ARRAY_CONTAINS(identifier, ArrayExpr)</code>：<code translate="no">identifier</code> is the name of the Array field, and <code translate="no">ArrayExpr</code> is the array of filtering conditions.​</p>
<p>The following example demonstrates how to filter products with current sales of 161 items in a specific country.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;ARRAY_CONTAINS(sales_volume, 161)&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;pink_8682&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">593.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">161</span>, <span class="hljs-number">81</span>, <span class="hljs-number">51</span>]}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_4794&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">327.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">155</span>, <span class="hljs-number">161</span>, <span class="hljs-number">106</span>, <span class="hljs-number">86</span>, <span class="hljs-number">99</span>]}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;ARRAY_CONTAINS(sales_volume, 161)&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>))​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// {color=pink_8682, price=593.0, id=1, sales_volume=[161, 81, 51]}​</span>
<span class="hljs-comment">// {color=red_4794, price=327.0, id=5, sales_volume=[155, 161, 106, 86, 99]}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&quot;ARRAY_CONTAINS(sales_volume, 161)&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;ARRAY_CONTAINS(sales_volume, 161)&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;, &quot;sales_volume&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">593</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">161</span>,​
      <span class="hljs-number">81</span>,​
      <span class="hljs-number">51</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">327</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">155</span>,​
      <span class="hljs-number">161</span>,​
      <span class="hljs-number">106</span>,​
      <span class="hljs-number">86</span>,​
      <span class="hljs-number">99</span>​
    ]​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-ARRAYCONTAINSALL​" class="common-anchor-header">Example 2: <code translate="no">ARRAY_CONTAINS_ALL</code>​</h4><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code>：<code translate="no">identifier</code> is the name of the Array field, and<code translate="no">ArrayExpr</code> is the array of filtering conditions. ​</p>
<p>The following example demonstrates how to filter products with current sales of 150 items in both the first and second countries.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(sales_volume, [150, 150])&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">597.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">150</span>, <span class="hljs-number">150</span>, <span class="hljs-number">73</span>], <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;white_9381&#x27;</span>}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(sales_volume, [150, 150])&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>))​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// {color=white_9381, price=597.0, id=9, sales_volume=[150, 150, 73]}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(sales_volume, [150, 150])&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;ARRAY_CONTAINS_ALL(sales_volume, [150, 150])&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;, &quot;sales_volume&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">597</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">150</span>,​
      <span class="hljs-number">150</span>,​
      <span class="hljs-number">73</span>​
    ]​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-3-ARRAYCONTAINSANY​" class="common-anchor-header">Example 3: <code translate="no">ARRAY_CONTAINS_ANY</code>​</h4><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code>：<code translate="no">identifier</code> is the name of the Array field, and  <code translate="no">ArrayExpr</code> is the array of filtering conditions. ​</p>
<p>The following example demonstrates how to filter products with current sales of either 150, 190, or 90 items in any country.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(sales_volume, [150, 190, 90])&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;orange_6781&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">862.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">124</span>, <span class="hljs-number">117</span>, <span class="hljs-number">90</span>, <span class="hljs-number">188</span>]}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;white_9381&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">597.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">150</span>, <span class="hljs-number">150</span>, <span class="hljs-number">73</span>]}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;purple_4976&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">450.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">190</span>, <span class="hljs-number">149</span>, <span class="hljs-number">85</span>, <span class="hljs-number">79</span>, <span class="hljs-number">80</span>]}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(sales_volume, [150, 190, 90])&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>))​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// {color=orange_6781, price=862.0, id=3, sales_volume=[124, 117, 90, 188]}​</span>
<span class="hljs-comment">// {color=white_9381, price=597.0, id=9, sales_volume=[150, 150, 73]}​</span>
<span class="hljs-comment">// {color=purple_4976, price=450.0, id=10, sales_volume=[190, 149, 85, 79, 80]}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(sales_volume, [150, 190, 90])&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;ARRAY_CONTAINS_ANY(sales_volume, [150, 190, 90])&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;, &quot;sales_volume&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">862</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">124</span>,​
      <span class="hljs-number">117</span>,​
      <span class="hljs-number">90</span>,​
      <span class="hljs-number">188</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">597</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">150</span>,​
      <span class="hljs-number">150</span>,​
      <span class="hljs-number">73</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">450</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">190</span>,​
      <span class="hljs-number">149</span>,​
      <span class="hljs-number">85</span>,​
      <span class="hljs-number">79</span>,​
      <span class="hljs-number">80</span>​
    ]​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-4-ARRAYLENGTH​" class="common-anchor-header">Example 4: <code translate="no">ARRAY_LENGTH</code>​</h4><p>The following example demonstrates how to filter products that are sold in only three countries.​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;ARRAY_LENGTH(sales_volume) == 3&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;pink_8682&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">593.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">161</span>, <span class="hljs-number">81</span>, <span class="hljs-number">51</span>]}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;yellow_4222&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">996.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">173</span>, <span class="hljs-number">151</span>, <span class="hljs-number">148</span>]}​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;white_9381&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">597.0</span>), <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">150</span>, <span class="hljs-number">150</span>, <span class="hljs-number">73</span>]}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;ARRAY_LENGTH(sales_volume) == 3&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>))​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// {color=pink_8682, price=593.0, id=1, sales_volume=[161, 81, 51]}​</span>
<span class="hljs-comment">// {color=yellow_4222, price=996.0, id=6, sales_volume=[173, 151, 148]}​</span>
<span class="hljs-comment">// {color=white_9381, price=597.0, id=9, sales_volume=[150, 150, 73]}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&quot;ARRAY_LENGTH(sales_volume) == 3&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;ARRAY_LENGTH(sales_volume) == 3&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;, &quot;sales_volume&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">593</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">161</span>,​
      <span class="hljs-number">81</span>,​
      <span class="hljs-number">51</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">996</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">173</span>,​
      <span class="hljs-number">151</span>,​
      <span class="hljs-number">148</span>​
    ]​
  },​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">597</span>,​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">150</span>,​
      <span class="hljs-number">150</span>,​
      <span class="hljs-number">73</span>​
    ]​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Multi-condition-filtering​" class="common-anchor-header">Multi-condition filtering​<button data-href="#Multi-condition-filtering​" class="anchor-icon" translate="no">
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
    </button></h2><p>The logical operators that can be used to combine multiple filtering conditions include:​</p>
<ul>
<li><p><code translate="no">and</code> or <code translate="no">&amp;&amp;</code>: Both conditions should be satisfied.​</p></li>
<li><p><code translate="no">or</code> or <code translate="no">||</code>:  Only one of the two conditions should be satisfied.​</p></li>
</ul>
<div class="alert note">
<p>When a lower precedence operation should be processed first, it should be enclosed within parentheses. Innermost parenthetical expressions are evaluated first.​</p>
</div>
<h4 id="Example​" class="common-anchor-header">Example​</h4><p>The following example demonstrates how to filter products that are red in color, priced below 500, branded as Apple, and have sales over 100 items in the first country​</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;color like &quot;red%&quot; and price &lt; 500 and inventory[&quot;brand&quot;] in [&quot;Apple&quot;] and sales_volume[0] &gt; 100&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
)​
​
# Output​
# {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&#x27;color&#x27;</span>: <span class="hljs-string">&#x27;red_4794&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: np.<span class="hljs-type">float32</span>(<span class="hljs-number">327.0</span>), <span class="hljs-string">&#x27;inventory&#x27;</span>: {<span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>: <span class="hljs-number">193</span>, <span class="hljs-string">&#x27;previous_sales&#x27;</span>: [<span class="hljs-number">225</span>, <span class="hljs-number">286</span>, <span class="hljs-number">202</span>]}, <span class="hljs-string">&#x27;sales_volume&#x27;</span>: [<span class="hljs-number">155</span>, <span class="hljs-number">161</span>, <span class="hljs-number">106</span>, <span class="hljs-number">86</span>, <span class="hljs-number">99</span>]}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-string">&quot;color like \&quot;red%\&quot; and price &lt; 500 and inventory[\&quot;brand\&quot;] in [\&quot;Apple\&quot;] and sales_volume[0] &gt; 100&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=red_4794, price=<span class="hljs-number">327.0</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">5</span>, inventory={<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;Apple&quot;</span>,<span class="hljs-string">&quot;quantity&quot;</span>:<span class="hljs-number">193</span>,<span class="hljs-string">&quot;previous_sales&quot;</span>:[<span class="hljs-number">225</span>,<span class="hljs-number">286</span>,<span class="hljs-number">202</span>]}, sales_volume=[<span class="hljs-number">155</span>, <span class="hljs-number">161</span>, <span class="hljs-number">106</span>, <span class="hljs-number">86</span>, <span class="hljs-number">99</span>]}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    filter=<span class="hljs-string">&#x27;color like &quot;red%&quot; and price &lt; 500 and inventory[&quot;brand&quot;] in [&quot;Apple&quot;] and sales_volume[0] &gt; 100&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;inventory&quot;</span>, <span class="hljs-string">&quot;sales_volume&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;filter&quot;: &quot;color like \&quot;red%\&quot; and price &lt; 500 and inventory[\&quot;brand\&quot;] in [\&quot;Apple\&quot;] and sales_volume[0] &gt; 100&quot;,​
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;color&quot;, &quot;price&quot;, &quot;inventory&quot;, &quot;sales_volume&quot;]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>The filtered results are as follows:​</p>
<pre><code translate="no" class="language-JSON">[​
  {​
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>,​
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">327</span>,​
    <span class="hljs-string">&quot;inventory&quot;</span>: {​
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Apple&quot;</span>,​
      <span class="hljs-string">&quot;quantity&quot;</span>: <span class="hljs-number">193</span>​
    },​
    <span class="hljs-string">&quot;sales_volume&quot;</span>: [​
      <span class="hljs-number">155</span>,​
      <span class="hljs-number">161</span>,​
      <span class="hljs-number">106</span>,​
      <span class="hljs-number">86</span>,​
      <span class="hljs-number">99</span>​
    ]​
  }​
]​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Operator-precedence​" class="common-anchor-header">Operator precedence​<button data-href="#Operator-precedence​" class="anchor-icon" translate="no">
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
    </button></h2><p>The following table lists the precedence of operators. Operators are listed top to bottom, in descending precedence.​</p>
<table>
<thead>
<tr><th>Precedence</th><th>Operator</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+, -</td></tr>
<tr><td>2</td><td>not</td></tr>
<tr><td>3</td><td>**</td></tr>
<tr><td>4</td><td>*, /, %</td></tr>
<tr><td>5</td><td>&lt;, &lt;=, &gt;, &gt;=</td></tr>
<tr><td>6</td><td>==, !=</td></tr>
<tr><td>7</td><td>like</td></tr>
<tr><td>8</td><td>JSON_CONTAINS</td></tr>
<tr><td>9</td><td>ARRAY_CONTAINS</td></tr>
<tr><td>10</td><td>JSON_CONTAINS_ALL</td></tr>
<tr><td>11</td><td>ARRAY_CONTAINS_ALL</td></tr>
<tr><td>12</td><td>JSON_CONTAINS_ANY</td></tr>
<tr><td>13</td><td>ARRAY_CONTAINS_ANY</td></tr>
<tr><td>14</td><td>ARRAY_LENGTH</td></tr>
<tr><td>15</td><td>and (&amp;&amp;)</td></tr>
<tr><td>16</td><td>or (\</td><td>\</td><td>)</td></tr>
</tbody>
</table>
<p>Expressions are normally evaluated from left to right. Complex expressions are evaluated one at a time. The order in which the expressions are evaluated is determined by the precedence of the operators used.​</p>
<p>If an expression contains two or more operators with the same precedence, the operator to the left is evaluated first. When a lower precedence operation should be processed first, it should be enclosed within parentheses.​</p>
