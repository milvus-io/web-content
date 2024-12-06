---
id: boolean.md
summary: A filter expression can be used to filter a specific scalar field during a search or query to obtain precisely matched results. This guide will introduce how to use filter expressions in Zilliz through an example dataset. For demonstration purposes, this guide will only provide examples of query operations.​
title: Metadata Filtering
---

# Metadata Filtering​

A filter expression can be used to filter a specific scalar field during a search or query to obtain precisely matched results. This guide will introduce how to use filter expressions in Zilliz through an example dataset. For demonstration purposes, this guide will only provide examples of query operations.​

## Example Dataset

Suppose the example dataset is stored in a collection named "my_collection" and includes 10 entities of electronic products. The following is the example dataset.​

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

- `id`: The ID of the product. The data type of this field is INT64.​

- `vector`: The embedding vector of the product image that can represent different features of the product (such as product size, style, pattern, etc.). For convenience, this field is omitted in the demonstration. ​

- `color`: The color of the product. The data type of this field is VARCHAR. The numeric value in this field indicates the hue, which helps differentiate various shades of colors.​

- `price`: The price of the product. The data type of this field is INT64.​

- `inventory`: The inventory of the product. The data type of this field is JSON and contains two keys: the  key `brand` represents the brand of the product and the key `quantity` represents the number of items in stock.​

- `sales_volume`:  The sales volume of products in different countries. The data type of this field is Array. The values in this array contain 3 to 5 integers.​

- `description`: The description of the product. The data type of this field is VARCHAR. It offers a summary of the product features, functionality, and intended users.​

## Single-condition filtering

The following types of operators can be used in filters with single condition:​

- [Comparison operators](#Comparison-operators)​

- [Term operators](#Term-operators)​

- [Match operators](#Match-operators)​

- [Arithmetic operators](#Arithmetic-operators)​

- [Advanced JSON operators](#Advanced-JSON-operators)​

- [Advanced Array operators](#Advanced-Array-operators)​

### Comparison operators

Comparison operators include:​

- `>`: Greater than​

- `<`: Less than​

- `==`: Equal​

- `<=`: Less than or equal​

- `>=`: Greater than or equal​

- `!=`: Not equal​

#### Example 1: Apply filter on scalar field​

The following example demonstrates how to filter products with prices ranging from 500 to 900:​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
from pymilvus import MilvusClient​
​
client = MilvusClient(​
    uri="http://localhost:19530",​
    token="root:Milvus"​
)​
​
results = client.query(​
    collection_name="my_collection",​
    filter="500 < price < 900",​
    output_fields=["id", "color", "price"]​
)​
​
# Output​
# {'id': 1, 'color': 'pink_8682', 'price': np.float32(593.0)}​
# {'id': 3, 'color': 'orange_6781', 'price': np.float32(862.0)}​
# {'id': 7, 'color': 'red_9392', 'price': np.float32(848.0)}​
# {'id': 9, 'color': 'white_9381', 'price': np.float32(597.0)}​

```

```java
import io.milvus.v2.client.ConnectConfig;​
import io.milvus.v2.client.MilvusClientV2;​
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()​
        .uri("http://localhost:19530")​
        .token("root:Milvus")​
        .build());​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("500 < price < 900")​
        .outputFields(Arrays.asList("id", "color", "price"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=pink_8682, price=593.0, id=1}​
// {color=orange_6781, price=862.0, id=3}​
// {color=red_9392, price=848.0, id=7}​
// {color=white_9381, price=597.0, id=9}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
const address = "http://localhost:19530";​
const token = "root:Milvus";​
const client = new MilvusClient({address, token});​
​
var res = client.query({​
    collection_name="my_collection",​
    filter="500 < price < 900",​
    output_fields=["id", "color", "price"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "500 < price < 900",​
    "outputFields": ["id", "color", "price"]​
}'​

```

The filtered results are as follows:​

```json
[​
    {"id": 1, "color": "pink_8682" "price":593},​
    {"id": 3, "color": "orange_6781" "price":862},​
    {"id": 7, "color": "red_9392" "price":848},​
    {"id": 9, "color": "white_9381" "price":597}​
]​

```

#### Example 2: Apply filter on JSON field

The following example demonstrates how to filter products with an inventory quantity of 250 or more.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='inventory["quantity"] >= 250',​
    output_fields=["id", "color", "price", "inventory"]​
)​
​
# Output​
# {'id': 1, 'color': 'pink_8682', 'price': np.float32(593.0), 'inventory': {'brand': 'Sony', 'quantity': 310}}​
# {'id': 2, 'color': 'red_7025', 'price': np.float32(196.0), 'inventory': {'brand': 'Samsung', 'quantity': 274}}​
# {'id': 6, 'color': 'yellow_4222', 'price': np.float32(996.0), 'inventory': {'brand': 'Microsoft', 'quantity': 376}}​
# {'id': 9, 'color': 'white_9381', 'price': np.float32(597.0), 'inventory': {'brand': 'Apple', 'quantity': 351}}​
# {'id': 10, 'color': 'purple_4976', 'price': np.float32(450.0), 'inventory': {'brand': 'Apple', 'quantity': 268}}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("inventory[\"quantity\"] >= 250")​
        .outputFields(Arrays.asList("id", "color", "price", "inventory"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=pink_8682, price=593.0, id=1, inventory={"brand":"Sony","quantity":310}}​
// {color=red_7025, price=196.0, id=2, inventory={"brand":"Samsung","quantity":274}}​
// {color=yellow_4222, price=996.0, id=6, inventory={"brand":"Microsoft","quantity":376}}​
// {color=white_9381, price=597.0, id=9, inventory={"brand":"Apple","quantity":351}}​
// {color=purple_4976, price=450.0, id=10, inventory={"brand":"Apple","quantity":268}}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter='inventory["quantity"] >= 250',​
    output_fields=["id", "color", "price", "inventory"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "inventory[\"quantity\"] >=250",​
    "outputFields": ["id", "color", "price", "inventory"]​
}'​

```

The filtered results are as follows:​

```JSON
[​
  {​
    "id": 1,​
    "color": "pink_8682",​
    "price": 593,​
    "inventory": {​
      "brand": "Sony",​
      "quantity": 310​
    },​
    "sales_volume": [​
      161,​
      81,​
      51​
    ]​
  },​
  {​
    "id": 2,​
    "color": "red_7025",​
    "price": 196,​
    "inventory": {​
      "brand": "Samsung",​
      "quantity": 274​
    },​
    "sales_volume": [​
      126,​
      126,​
      125,​
      96,​
      155​
    ]​
  },​
  {​
    "id": 6,​
    "color": "yellow_4222",​
    "price": 996,​
    "inventory": {​
      "brand": "Microsoft",​
      "quantity": 376​
    },​
    "sales_volume": [​
      173,​
      151,​
      148​
    ]​
  },​
  {​
    "id": 9,​
    "color": "white_9381",​
    "price": 597,​
    "inventory": {​
      "brand": "Apple",​
      "quantity": 351​
    },​
    "sales_volume": [​
      150,​
      150,​
      73​
    ]​
  },​
  {​
    "id": 10,​
    "color": "purple_4976",​
    "price": 450,​
    "inventory": {​
      "brand": "Apple",​
      "quantity": 268​
    },​
    "sales_volume": [​
      190,​
      149,​
      85,​
      79,​
      80​
    ]​
  }​
]​

```

#### Example 3: Apply filter on Array field​

The following example demonstrates how to filter products whose sales volume in the first country is 150 or more.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter="sales_volume[0] >= 150",​
    output_fields=["id", "color", "price", "sales_volume"]​
)​
​
# Output​
# {'id': 1, 'color': 'pink_8682', 'price': np.float32(593.0), 'sales_volume': [161, 81, 51]}​
# {'id': 5, 'color': 'red_4794', 'price': np.float32(327.0), 'sales_volume': [155, 161, 106, 86, 99]}​
# {'id': 6, 'color': 'yellow_4222', 'price': np.float32(996.0), 'sales_volume': [173, 151, 148]}​
# {'id': 9, 'color': 'white_9381', 'price': np.float32(597.0), 'sales_volume': [150, 150, 73]}​
# {'id': 10, 'color': 'purple_4976', 'price': np.float32(450.0), 'sales_volume': [190, 149, 85, 79, 80]}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("sales_volume[0] >= 150")​
        .outputFields(Arrays.asList("id", "color", "price", "sales_volume"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=pink_8682, price=593.0, id=1, sales_volume=[161, 81, 51]}​
// {color=red_4794, price=327.0, id=5, sales_volume=[155, 161, 106, 86, 99]}​
// {color=yellow_4222, price=996.0, id=6, sales_volume=[173, 151, 148]}​
// {color=white_9381, price=597.0, id=9, sales_volume=[150, 150, 73]}​
// {color=purple_4976, price=450.0, id=10, sales_volume=[190, 149, 85, 79, 80]}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter="sales_volume[0] >= 150",​
    output_fields=["id", "color","price", "sales_volume"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "sales_volume[0] >= 150",​
    "outputFields": ["id", "color", "price", "sales_volume"]​
}'​

```

The filtered results are as follows:​

```JSON
[​
  {​
    "id": 1,​
    "color": "pink_8682",​
    "price": 593,​
    "sales_volume": [​
      161,​
      81,​
      51​
    ]​
  },​
  {​
    "id": 5,​
    "color": "red_4794",​
    "price": 327,​
    "sales_volume": [​
      155,​
      161,​
      106,​
      86,​
      99​
    ]​
  },​
  {​
    "id": 6,​
    "color": "yellow_4222",​
    "price": 996,​
    "sales_volume": [​
      173,​
      151,​
      148​
    ]​
  },​
  {​
    "id": 9,​
    "color": "white_9381",​
    "price": 597,​
    "sales_volume": [​
      150,​
      150,​
      73​
    ]​
  },​
  {​
    "id": 10,​
    "color": "purple_4976",​
    "price": 450,​
    "sales_volume": [​
      190,​
      149,​
      85,​
      79,​
      80​
    ]​
  }​
]​

```

### Term operators​

Term operators include:​

- `in`: Filter results that match the condition​

- `not in`: Filter results that do not match the condition​

#### Example 1: Apply filter on scalar field​

The following example demonstrates how to filter products whose color is not red.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='color not in ["red_7025","red_4794","red_9392"]',​
    output_fields=["id", "color", "price"]​
)​
​
# Output​
# {'id': 1, 'color': 'pink_8682', 'price': np.float32(593.0)}​
# {'id': 3, 'color': 'orange_6781', 'price': np.float32(862.0)}​
# {'id': 4, 'color': 'pink_9298', 'price': np.float32(991.0)}​
# {'id': 6, 'color': 'yellow_4222', 'price': np.float32(996.0)}​
# {'id': 8, 'color': 'grey_8510', 'price': np.float32(241.0)}​
# {'id': 9, 'color': 'white_9381', 'price': np.float32(597.0)}​
# {'id': 10, 'color': 'purple_4976', 'price': np.float32(450.0)}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("color not in [\"red_7025\",\"red_4794\",\"red_9392\"]")​
        .outputFields(Arrays.asList("id", "color", "price"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=pink_8682, price=593.0, id=1}​
// {color=orange_6781, price=862.0, id=3}​
// {color=pink_9298, price=991.0, id=4}​
// {color=yellow_4222, price=996.0, id=6}​
// {color=grey_8510, price=241.0, id=8}​
// {color=white_9381, price=597.0, id=9}​
// {color=purple_4976, price=450.0, id=10}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter='color not in ["red_7025","red_4794","red_9392"]',​
    output_fields=["id", "color", "price"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "color not in [\"red_7025\",\"red_4794\",\"red_9392\"]",​
    "outputFields": ["id", "color", "price"]​
}'​

```

The filtered results are as follows:​

```json
[​
    {"id": 1, "color": "pink_8682", "price":593},​
    {"id": 3, "color": "orange_6781", "price":863},​
    {"id": 4, "color": "pink_9298" "price":991},​
    {"id": 6, "color": "yellow_4222" "price":996},​
    {"id": 8, "color": "grey_8510" "price":241},​
    {"id": 9, "color": "white_9381" "price":597},​
    {"id": 10, "color": "purple_4976" "price":450}​
]​

```

#### Example 2: Apply filter on JSON field​

The following example demonstrates how to filter products whose brand is Apple.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='inventory["brand"] in ["Apple"]',​
    output_fields=["id", "color", "price", "inventory"]​
)​
​
# Output​
# {'id': 5, 'color': 'red_4794', 'price': np.float32(327.0), 'inventory': {'brand': 'Apple', 'quantity': 193}}​
# {'id': 7, 'color': 'red_9392', 'price': np.float32(848.0), 'inventory': {'brand': 'Apple', 'quantity': 61}}​
# {'id': 9, 'color': 'white_9381', 'price': np.float32(597.0), 'inventory': {'brand': 'Apple', 'quantity': 351}}​
# {'id': 10, 'color': 'purple_4976', 'price': np.float32(450.0), 'inventory': {'brand': 'Apple', 'quantity': 268}}} ​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("inventory[\"brand\"] in [\"Apple\"]")​
        .outputFields(Arrays.asList("id", "color", "price", "inventory"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {'id': 5, 'color': 'red_4794', 'price': np.float32(327.0), 'inventory': {'brand': 'Apple', 'quantity': 193}}​
// {'id': 7, 'color': 'red_9392', 'price': np.float32(848.0), 'inventory': {'brand': 'Apple', 'quantity': 61}}​
// {'id': 9, 'color': 'white_9381', 'price': np.float32(597.0), 'inventory': {'brand': 'Apple', 'quantity': 351}}​
// {'id': 10, 'color': 'purple_4976', 'price': np.float32(450.0), 'inventory': {'brand': 'Apple', 'quantity': 268}}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter='inventory["brand"] in ["Apple"]',​
    output_fields=["id", "color", "price", "inventory"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "inventory[\"brand\"] in [\"Apple\"]",​
    "outputFields": ["id", "color","price", "inventory"]​
}'​

```

The filtered results are as follows:​

```JSON
[​
  {​
    "id": 5,​
    "color": "red_4794",​
    "price": 327,​
    "inventory": {​
      "brand": "Apple",​
      "quantity": 193​
    }​
  },​
  {​
    "id": 7,​
    "color": "red_9392",​
    "price": 848,​
    "inventory": {​
      "brand": "Apple",​
      "quantity": 61​
    }​
  },​
  {​
    "id": 9,​
    "color": "white_9381",​
    "price": 597,​
    "inventory": {​
      "brand": "Apple",​
      "quantity": 351​
    }​
  },​
  {​
    "id": 10,​
    "color": "purple_4976",​
    "price": 450,​
    "inventory": {​
      "brand": "Apple",​
      "quantity": 268​
    }​
  }​
]​

```

### Match operators​

Match operators include:​

- `like`: Match constants or prefixes (prefix%), infixes (%infix%), and suffixes (%suffix) within constants. It relies on a brute-force search mechanism using wildcards and does not involve text tokenization. While it can achieve exact matches, its query efficiency is relatively low, making it suitable for simple matching tasks or queries on smaller datasets.​

- `TEXT_MATCH`: Match specific terms or keywords on VARCHAR fields, using tokenization and inverted index to enable efficient text search. Compared to `like`, `TEXT_MATCH` offers more advanced text tokenization and filtering capabilities. It is suited for large-scale datasets where higher query performance is required for complex text search scenarios.​
    
    <div class="alert note">

    To use the `TEXT_MATCH` filter expression, you must enable text matching for the target `VARCHAR` field when creating the collection. For details, refer to [Text Match](keyword-match.md).​

    </div>

#### Example 1: Apply filter on scalar field​

The following example demonstrates how to filter products whose color is red. In this case, you can quickly filter all red products by matching the prefix 'red%'. Similarly, you can use the expression color in ['red_7025', 'red_4794', 'red_9392'] to filter all red products. However, when the data is more complex, we recommend using the like operator for more efficient filtering.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='color like "red%"',​
    output_fields=["id", "color", "price"]​
)​
​
# Output​
# {'id': 2, 'color': 'red_7025', 'price': np.float32(196.0)}​
# {'id': 5, 'color': 'red_4794', 'price': np.float32(327.0)}​
# {'id': 7, 'color': 'red_9392', 'price': np.float32(848.0)}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("color like \"red%\"")​
        .outputFields(Arrays.asList("id", "color", "price"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=red_7025, price=196.0, id=2}​
// {color=red_4794, price=327.0, id=5}​
// {color=red_9392, price=848.0, id=7}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter='color like "red%"',​
    output_fields=["id", "color", "price"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "color like \"red%\"",​
    "outputFields": ["id", "color", "price"]​
}'​

```

The filtered results are as follows:​

```json
[​
    {"id": 2, "color": "red_7025", "price":196},​
    {"id": 5, "color": "red_4794" "price":327},​
    {"id": 7, "color": "red_9392" "price":848}​
]​

```

#### Example 2: Apply filter on JSON field​

The following example demonstrates how to filter products whose brand name starts with the letter 'S'.​

```python
results = client.query(​
    collection_name="my_collection",​
    filter='inventory["brand"] like "S%"',​
    output_fields=["id", "color", "price", "inventory"]​
)​
​
# Output​
# {'id': 1, 'color': 'pink_8682', 'price': np.float32(593.0), 'inventory': {'brand': 'Sony', 'quantity': 310}}​
# {'id': 2, 'color': 'red_7025', 'price': np.float32(196.0), 'inventory': {'brand': 'Samsung', 'quantity': 274}}​
# {'id': 3, 'color': 'orange_6781', 'price': np.float32(862.0), 'inventory': {'brand': 'Samsung', 'quantity': 103}}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("inventory[\"brand\"] like \"S%\"")​
        .outputFields(Arrays.asList("id", "color", "price", "inventory"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=pink_8682, price=593.0, id=1, inventory={"brand":"Sony","quantity":310}}​
// {color=red_7025, price=196.0, id=2, inventory={"brand":"Samsung","quantity":274}}​
// {color=orange_6781, price=862.0, id=3, inventory={"brand":"Samsung","quantity":103}}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter='inventory["brand"] like "S%"',​
    output_fields=["id", "color", "price", "inventory"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "inventory[\"brand\"] like \"S%\"",​
    "outputFields": ["id", "color", "price", "inventory"]​
}'​

```

The filtered results are as follows:​

```json
[​
  {​
    "id": 1,​
    "color": "pink_8682",​
    "price": 593,​
    "inventory": {​
      "brand": "Sony",​
      "quantity": 310​
    }​
  },​
  {​
    "id": 2,​
    "color": "red_7025",​
    "price": 196,​
    "inventory": {​
      "brand": "Samsung",​
      "quantity": 274​
    }​
  },​
  {​
    "id": 3,​
    "color": "orange_6781",​
    "price": 862,​
    "inventory": {​
      "brand": "Samsung",​
      "quantity": 103​
    }​
  }​
]​

```

#### Example 3: Text match on VARCHAR fields​

The `TEXT_MATCH` expression is used for text match on `VARCHAR` fields. By default, it applies an **OR** logic, but you can combine it with other logical operators to create more complex query conditions. For details, refer to [Text Match](keyword-match.md).​

The following example demonstrates how to use the `TEXT_MATCH` expression to filter products where the `description` field contains either the term `"Apple"` or `"iPhone"`:​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='TEXT_MATCH(description, "Apple iPhone")',​
    output_fields=["id", "description"],​
)​

```

```java
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("TEXT_MATCH(description, \"Apple iPhone\")")​
        .outputFields(Arrays.asList("id", "description"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
const results = client.query({​
    collection_name: "my_collection",​
    filter: "TEXT_MATCH(description, 'Apple iPhone')",​
    output_fields: ["id", "description"]​
});​

```

The filtered results are as follows:​

```JSON
[​
    {'id': 5, 'description': "iPhone 15 Pro, A new chip designed for better gaming and other 'pro' features."}​
    {'id': 7, 'description': "The iPhone 14 is a smartphone from Apple Inc. that comes in various colors and sizes."}​
    {'id': 9, 'description': "The iPhone 16 features a 6.1-inch OLED display, is powered by Apple's A18 processor, and has dual cameras at the back."}​
    {'id': 10, 'description': "The iPad is a brand of iOS- and iPadOS-based tablet computers that are developed and marketed by Apple."}​
]​

```

To filter for descriptions containing multiple keywords simultaneously, you can use the `and` operator. The following example demonstrates how to filter products where the `description` field contains both `"chip"` and `"iPhone"`:​

```python
results = client.query(​
    collection_name="my_collection",​
    filter='TEXT_MATCH(description, "chip") and TEXT_MATCH(description, "iPhone")',​
    output_fields=["id", "description"],​
)​

```

```java
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("TEXT_MATCH(description, \"chip\") and TEXT_MATCH(description, \"iPhone\")")​
        .outputFields(Arrays.asList("id", "description"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
const results = client.query({​
    collection_name: "my_collection",​
    filter: "TEXT_MATCH(description, 'chip') and TEXT_MATCH(description, 'iPhone')",​
    output_fields: ["id", "description"]​
});​

```

The filtered results are as follows:​

```python
[​
    {'id': 5, 'description': "iPhone 15 Pro, A new chip designed for better gaming and other 'pro' features."}​
]​

```

### Arithmetic operators​

Arithmetic operators include:​

- `+`: Addition​

- `-`: Subtraction​

- `*`: Multiplication​

- `/`: Division​

- `**`: Power​

- `%`: Modulo​

#### Example 1: Apply filter on scalar field​

The following example demonstrates how to filter products whose price, after a 50% discount, is between 200 and 300 (both inclusive).​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter="200 <= price*0.5 and price*0.5 <= 300",​
    output_fields=["id", "price"]​
)​
​
# Output​
# {'id': 1, 'price': np.float32(593.0)}​
# {'id': 9, 'price': np.float32(597.0)}​
# {'id': 10, 'price': np.float32(450.0)}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
ueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("200 <= price*0.5 and price*0.5 <= 300")​
        .outputFields(Arrays.asList("id", "price"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {price=593.0, id=1}​
// {price=597.0, id=9}​
// {price=450.0, id=10}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter="200 <= price*0.5 <= 300",​
    output_fields=["id", "price"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "200 <= price*0.5 <= 300",​
    "outputFields": ["id", "price"]​
}'​

```

The filtered results are as follows:​

```json
[​
    {"id": 1, "color": "pink_8682", "price":593},​
    {"id": 9, "color": "white_9381", "price":597},​
    {"id": 10, "color": "purple_4976" "price":450}​
]​

```

#### Example 2: Apply filter on JSON field​

The following example demonstrates how to filter products whose inventory, when doubled, exceeds 600 items.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='inventory["quantity"] * 2 > 600',​
    output_fields=["id", "color", "price", "inventory"]​
)​
​
# Output​
# {'id': 1, 'color': 'pink_8682', 'price': np.float32(593.0), 'inventory': {'brand': 'Sony', 'quantity': 310}}​
# {'id': 6, 'color': 'yellow_4222', 'price': np.float32(996.0), 'inventory': {'brand': 'Microsoft', 'quantity': 376}}​
# {'id': 9, 'color': 'white_9381', 'price': np.float32(597.0), 'inventory': {'brand': 'Apple', 'quantity': 351}}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("inventory[\"quantity\"] * 2 > 600")​
        .outputFields(Arrays.asList("id", "color", "price", "inventory"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=pink_8682, price=593.0, id=1, inventory={"brand":"Sony","quantity":310}}​
// {color=yellow_4222, price=996.0, id=6, inventory={"brand":"Microsoft","quantity":376}}​
// {color=white_9381, price=597.0, id=9, inventory={"brand":"Apple","quantity":351}}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter='inventory["quantity"] * 2 > 600',​
    output_fields=["id", "color", "price", "inventory"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "inventory[\"quantity\"] * 2 > 600",​
    "outputFields": ["id", "color", "price", "inventory"]​
}'​

```

The filtered results are as follows:​

```JSON
[​
  {​
    "id": 1,​
    "color": "pink_8682",​
    "price": 593,​
    "inventory": {​
      "brand": "Sony",​
      "quantity": 310​
    }​
  },​
  {​
    "id": 6,​
    "color": "yellow_4222",​
    "price": 996,​
    "inventory": {​
      "brand": "Microsoft",​
      "quantity": 376​
    }​
  },​
  {​
    "id": 9,​
    "color": "white_9381",​
    "price": 597,​
    "inventory": {​
      "brand": "Apple",​
      "quantity": 351​
    }​
  }​
]​

```

#### Example 3: Apply filter on Array field​

The following example demonstrates how to filter products whose combined sales in the first and second countries exceed 300.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter="sales_volume[0]*2 > 300",​
    output_fields=["id", "color", "price", "sales_volume"]​
)​
​
# Output​
# {'color': 'pink_8682', 'price': np.float32(593.0), 'sales_volume': [161, 81, 51], 'id': 1}​
# {'color': 'red_4794', 'price': np.float32(327.0), 'sales_volume': [155, 161, 106, 86, 99], 'id': 5}​
# {'color': 'yellow_4222', 'price': np.float32(996.0), 'sales_volume': [173, 151, 148], 'id': 6}​
# {'color': 'purple_4976', 'price': np.float32(450.0), 'sales_volume': [190, 149, 85, 79, 80], 'id': 10}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("sales_volume[0]*2 > 300")​
        .outputFields(Arrays.asList("id", "color", "price", "sales_volume"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=pink_8682, price=593.0, id=1, sales_volume=[161, 81, 51]}​
// {color=red_4794, price=327.0, id=5, sales_volume=[155, 161, 106, 86, 99]}​
// {color=yellow_4222, price=996.0, id=6, sales_volume=[173, 151, 148]}​
// {color=purple_4976, price=450.0, id=10, sales_volume=[190, 149, 85, 79, 80]}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter="sales_volume[0]*2 > 300",​
    output_fields=["id", "color","price", "sales_volume"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "sales_volume[0]*2 > 300",​
    "outputFields": ["id", "color", "price", "sales_volume"]​
}'​

```

The filtered results are as follows:​

```JSON
[​
  {​
    "id": 5,​
    "color": "red_4794",​
    "price": 327,​
    "sales_volume": [​
      155,​
      161,​
      106,​
      86,​
      99​
    ]​
  },​
  {​
    "id": 6,​
    "color": "yellow_4222",​
    "price": 996,​
    "sales_volume": [​
      173,​
      151,​
      148​
    ]​
  },​
  {​
    "id": 10,​
    "color": "purple_4976",​
    "price": 450,​
    "sales_volume": [​
      190,​
      149,​
      85,​
      79,​
      80​
    ]​
  }​
]​

```

### Advanced JSON operators​

JSON operators include: ​

- `JSON_CONTAINS`: Filter entities whose JSON field contains elements from a specific list.​

- `JSON_CONTAINS_ALL`: Filter entities whose JSON field contains all elements from a specific list in the same order.​

- `JSON_CONTAINS_ANY`: Filter all entities whose JSON field contains any one element from a specific list.​

<div class="alert note">

When using JSON opertors, the JSON field must contain at least one key whose value is a list.​

</div>

To demonstrate how to use advanced filtering operators on JSON fields, we make a slight adjustment to the example dataset in this section. A new key named 'previous_sales' has been added to the JSON 'inventory' field, which represents the previous sales of the product in three countries. The value of this key is a list of numbers. Below is the modified new example dataset:​

#### Example 1: `JSON_CONTAINS`​

`JSON_CONTAINS(identifier, JsonExpr)`：`identifier` is the key name in the JSON field and `JsonExpr` is the list of filtering conditions.​

The following example demonstrates how to filter products that previously had sales of 232 items in a specific country.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='JSON_CONTAINS(inventory[\"previous_sales\"], 232)',​
    output_fields=["id", "color", "price", "inventory"]​
)​
​
# Output​
# {'inventory': {'brand': 'Samsung', 'quantity': 103, 'previous_sales': [232, 254, 275]}, 'id': 3, 'color': 'orange_6781', 'price': np.float32(862.0)}​
# {'inventory': {'brand': 'Microsoft', 'quantity': 376, 'previous_sales': [254, 275, 232]}, 'id': 6, 'color': 'yellow_4222', 'price': np.float32(996.0)}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("JSON_CONTAINS(inventory[\"previous_sales\"], 232)")​
        .outputFields(Arrays.asList("id", "color", "price", "inventory"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=orange_6781, price=862.0, id=3, inventory={"brand":"Samsung","quantity":103,"previous_sales":[232,254,275]}}​
// {color=yellow_4222, price=996.0, id=6, inventory={"brand":"Microsoft","quantity":376,"previous_sales":[254,275,232]}}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter='JSON_CONTAINS(inventory[\"previous_sales\"], 232)',​
    output_fields=["id", "color","price", "inventory"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "JSON_CONTAINS(inventory[\"previous_sales\"], 232)",​
    "outputFields": ["id", "color", "price", "inventory"]​
}'​

```

The filtered results are as follows:​

```JSON
[​
  {​
    "id": 3,​
    "color": "orange_6781",​
    "price": 862,​
    "inventory": {​
      "brand": "Samsung",​
      "quantity": 103,​
      "previous_sales": [​
        232,​
        254,​
        275​
      ]​
    }​
  }​
]​

```

#### Example 2: `JSON_CONTAINS_ALL`​

`JSON_CONTAINS_ALL(identifier, JsonExpr)`：`identifier` is the key name in the JSON field and `JsonExpr` is the list of filtering conditions.​

The following example demonstrates how to filter products that had previous sales of 232, 254, and 275 items in three different countries.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='JSON_CONTAINS_ALL(inventory["previous_sales"], [232, 254, 275])',​
    output_fields=["id", "color", "price", "inventory"]​
)​
​
# Output​
# {'id': 3, 'color': 'orange_6781', 'price': np.float32(862.0), 'inventory': {'brand': 'Samsung', 'quantity': 103, 'previous_sales': [232, 254, 275]}}​
# {'id': 6, 'color': 'yellow_4222', 'price': np.float32(996.0), 'inventory': {'brand': 'Microsoft', 'quantity': 376, 'previous_sales': [254, 275, 232]}}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("JSON_CONTAINS_ALL(inventory[\"previous_sales\"], [232, 254, 275])")​
        .outputFields(Arrays.asList("id", "color", "price", "inventory"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=orange_6781, price=862.0, id=3, inventory={"brand":"Samsung","quantity":103,"previous_sales":[232,254,275]}}​
// {color=yellow_4222, price=996.0, id=6, inventory={"brand":"Microsoft","quantity":376,"previous_sales":[254,275,232]}}​

```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")​
​
var res = client.query({​
    collection_name="my_collection",​
    filter='JSON_CONTAINS_ALL(inventory["previous_sales"], [232, 254, 275])',​
    output_fields=["id", "color","price", "inventory"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "JSON_CONTAINS_ALL(inventory[\"previous_sales\"], [232, 254, 275])",​
    "outputFields": ["id", "color", "price", "inventory"]​
}'​

```

The filtered results are as follows:​

```JSON
[​
  {​
    "id": 3,​
    "color": "orange_6781",​
    "price": 862,​
    "inventory": {​
      "brand": "Samsung",​
      "quantity": 103,​
      "previous_sales": [​
        232,​
        254,​
        275​
      ]​
    }​
  },​
  {​
    "id": 6,​
    "color": "yellow_4222",​
    "price": 996,​
    "inventory": {​
      "brand": "Microsoft",​
      "quantity": 376,​
      "previous_sales": [​
        254,​
        275,​
        232​
      ]​
    }​
  }​
]​

```

#### Example 3: `JSON_CONTAINS_ANY`​

`JSON_CONTAINS_ANY(identifier, JsonExpr)`：`identifier` is the key name in the JSON field and `JsonExpr` is the list of filtering conditions.​

The following example demonstrates how to filter products that had previous sales of either 232, 254, or 275 items in any one of the three countries.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='JSON_CONTAINS_ANY(inventory["previous_sales"], [232, 254, 275])',​
    output_fields=["id", "color", "price", "inventory"]​
)​
​
# Output​
# {'id': 3, 'color': 'orange_6781', 'price': np.float32(862.0), 'inventory': {'brand': 'Samsung', 'quantity': 103, 'previous_sales': [232, 254, 275]}}​
# {'id': 6, 'color': 'yellow_4222', 'price': np.float32(996.0), 'inventory': {'brand': 'Microsoft', 'quantity': 376, 'previous_sales': [254, 275, 232]}}​
# {'id': 7, 'color': 'red_9392', 'price': np.float32(848.0), 'inventory': {'brand': 'Apple', 'quantity': 61, 'previous_sales': [312, 254, 367]}}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("JSON_CONTAINS_ANY(inventory[\"previous_sales\"], [232, 254, 275])")​
        .outputFields(Arrays.asList("id", "color", "price", "inventory"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=orange_6781, price=862.0, id=3, inventory={"brand":"Samsung","quantity":103,"previous_sales":[232,254,275]}}​
// {color=yellow_4222, price=996.0, id=6, inventory={"brand":"Microsoft","quantity":376,"previous_sales":[254,275,232]}}​
// {color=red_9392, price=848.0, id=7, inventory={"brand":"Apple","quantity":61,"previous_sales":[312,254,367]}}​

```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")​
​
var res = client.query({​
    collection_name="my_collection",​
    filter='JSON_CONTAINS_ANY(inventory["previous_sales"], [232, 254, 275])',​
    output_fields=["id", "color","price", "inventory"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "JSON_CONTAINS_ANY(inventory[\"previous_sales\"], [232, 254, 275])",​
    "outputFields": ["id", "color", "price", "inventory"]​
}'​

```

The filtered results are as follows:​

```JSON
[​
  {​
    "id": 3,​
    "color": "orange_6781",​
    "price": 862,​
    "inventory": {​
      "brand": "Samsung",​
      "quantity": 103,​
      "previous_sales": [​
        232,​
        254,​
        275​
      ]​
    }​
  },​
  {​
    "id": 6,​
    "color": "yellow_4222",​
    "price": 996,​
    "inventory": {​
      "brand": "Microsoft",​
      "quantity": 376,​
      "previous_sales": [​
        254,​
        275,​
        232​
      ]​
    }​
  },​
  {​
    "id": 7,​
    "color": "red_9392",​
    "price": 848,​
    "inventory": {​
      "brand": "Apple",​
      "quantity": 61,​
      "previous_sales": [​
        312,​
        254,​
        367​
      ]​
    }​
  }​
]​

```

### Advanced Array operators​

Array operators include:​

- `ARRAY_CONTAINS`: Filter all entities whose Array field contains a specific element.​

- `ARRAY_CONTAINS_ALL`: Filter all entities whose Array field contains all specified elements.​

- `ARRAY_CONTAINS_ANY`: Filter all entities whose Array field contains any one of the specified elements.​

- `ARRAY_LENGTH`: Check the number of elements in the list.​

#### Example 1: `ARRAY_CONTAINS` ​

`ARRAY_CONTAINS(identifier, ArrayExpr)`：`identifier` is the name of the Array field, and `ArrayExpr` is the array of filtering conditions.​

The following example demonstrates how to filter products with current sales of 161 items in a specific country.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='ARRAY_CONTAINS(sales_volume, 161)',​
    output_fields=["id", "color", "price", "sales_volume"]​
)​
​
# Output​
# {'id': 1, 'color': 'pink_8682', 'price': np.float32(593.0), 'sales_volume': [161, 81, 51]}​
# {'id': 5, 'color': 'red_4794', 'price': np.float32(327.0), 'sales_volume': [155, 161, 106, 86, 99]}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("ARRAY_CONTAINS(sales_volume, 161)")​
        .outputFields(Arrays.asList("id", "color", "price", "sales_volume"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=pink_8682, price=593.0, id=1, sales_volume=[161, 81, 51]}​
// {color=red_4794, price=327.0, id=5, sales_volume=[155, 161, 106, 86, 99]}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter="ARRAY_CONTAINS(sales_volume, 161)",​
    output_fields=["id", "color","price", "sales_volume"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "ARRAY_CONTAINS(sales_volume, 161)",​
    "outputFields": ["id", "color", "price", "sales_volume"]​
}'​

```

The filtered results are as follows:​

```JSON
[​
  {​
    "id": 1,​
    "color": "pink_8682",​
    "price": 593,​
    "sales_volume": [​
      161,​
      81,​
      51​
    ]​
  },​
  {​
    "id": 5,​
    "color": "red_4794",​
    "price": 327,​
    "sales_volume": [​
      155,​
      161,​
      106,​
      86,​
      99​
    ]​
  }​
]​

```

#### Example 2: `ARRAY_CONTAINS_ALL`​

`ARRAY_CONTAINS_ALL(identifier, ArrayExpr)`：`identifier` is the name of the Array field, and`ArrayExpr` is the array of filtering conditions. ​

The following example demonstrates how to filter products with current sales of 150 items in both the first and second countries.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='ARRAY_CONTAINS_ALL(sales_volume, [150, 150])',​
    output_fields=["id", "color", "price", "sales_volume"]​
)​
​
# Output​
# {'price': np.float32(597.0), 'sales_volume': [150, 150, 73], 'id': 9, 'color': 'white_9381'}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("ARRAY_CONTAINS_ALL(sales_volume, [150, 150])")​
        .outputFields(Arrays.asList("id", "color", "price", "sales_volume"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=white_9381, price=597.0, id=9, sales_volume=[150, 150, 73]}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter="ARRAY_CONTAINS_ALL(sales_volume, [150, 150])",​
    output_fields=["id", "color","price", "sales_volume"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "ARRAY_CONTAINS_ALL(sales_volume, [150, 150])",​
    "outputFields": ["id", "color", "price", "sales_volume"]​
}'​

```

The filtered results are as follows:​

```JSON
[​
  {​
    "id": 9,​
    "color": "white_9381",​
    "price": 597,​
    "sales_volume": [​
      150,​
      150,​
      73​
    ]​
  }​
]​

```

#### Example 3: `ARRAY_CONTAINS_ANY`​

`ARRAY_CONTAINS_ANY(identifier, ArrayExpr)`：`identifier` is the name of the Array field, and  `ArrayExpr` is the array of filtering conditions. ​

The following example demonstrates how to filter products with current sales of either 150, 190, or 90 items in any country.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='ARRAY_CONTAINS_ANY(sales_volume, [150, 190, 90])',​
    output_fields=["id", "color", "price", "sales_volume"]​
)​
​
# Output​
# {'id': 3, 'color': 'orange_6781', 'price': np.float32(862.0), 'sales_volume': [124, 117, 90, 188]}​
# {'id': 9, 'color': 'white_9381', 'price': np.float32(597.0), 'sales_volume': [150, 150, 73]}​
# {'id': 10, 'color': 'purple_4976', 'price': np.float32(450.0), 'sales_volume': [190, 149, 85, 79, 80]}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("ARRAY_CONTAINS_ANY(sales_volume, [150, 190, 90])")​
        .outputFields(Arrays.asList("id", "color", "price", "sales_volume"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=orange_6781, price=862.0, id=3, sales_volume=[124, 117, 90, 188]}​
// {color=white_9381, price=597.0, id=9, sales_volume=[150, 150, 73]}​
// {color=purple_4976, price=450.0, id=10, sales_volume=[190, 149, 85, 79, 80]}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter="ARRAY_CONTAINS_ANY(sales_volume, [150, 190, 90])",​
    output_fields=["id", "color","price", "sales_volume"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "ARRAY_CONTAINS_ANY(sales_volume, [150, 190, 90])",​
    "outputFields": ["id", "color", "price", "sales_volume"]​
}'​

```

The filtered results are as follows:​

```JSON
[​
  {​
    "id": 3,​
    "color": "orange_6781",​
    "price": 862,​
    "sales_volume": [​
      124,​
      117,​
      90,​
      188​
    ]​
  },​
  {​
    "id": 9,​
    "color": "white_9381",​
    "price": 597,​
    "sales_volume": [​
      150,​
      150,​
      73​
    ]​
  },​
  {​
    "id": 10,​
    "color": "purple_4976",​
    "price": 450,​
    "sales_volume": [​
      190,​
      149,​
      85,​
      79,​
      80​
    ]​
  }​
]​

```

#### Example 4: `ARRAY_LENGTH`​

The following example demonstrates how to filter products that are sold in only three countries.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='ARRAY_LENGTH(sales_volume) == 3',​
    output_fields=["id", "color", "price", "sales_volume"]​
)​
​
# Output​
# {'id': 1, 'color': 'pink_8682', 'price': np.float32(593.0), 'sales_volume': [161, 81, 51]}​
# {'id': 6, 'color': 'yellow_4222', 'price': np.float32(996.0), 'sales_volume': [173, 151, 148]}​
# {'id': 9, 'color': 'white_9381', 'price': np.float32(597.0), 'sales_volume': [150, 150, 73]}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("ARRAY_LENGTH(sales_volume) == 3")​
        .outputFields(Arrays.asList("id", "color", "price", "sales_volume"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=pink_8682, price=593.0, id=1, sales_volume=[161, 81, 51]}​
// {color=yellow_4222, price=996.0, id=6, sales_volume=[173, 151, 148]}​
// {color=white_9381, price=597.0, id=9, sales_volume=[150, 150, 73]}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter="ARRAY_LENGTH(sales_volume) == 3",​
    output_fields=["id", "color","price", "sales_volume"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "ARRAY_LENGTH(sales_volume) == 3",​
    "outputFields": ["id", "color", "price", "sales_volume"]​
}'​

```

The filtered results are as follows:​

```JSON
[​
  {​
    "id": 1,​
    "color": "pink_8682",​
    "price": 593,​
    "sales_volume": [​
      161,​
      81,​
      51​
    ]​
  },​
  {​
    "id": 6,​
    "color": "yellow_4222",​
    "price": 996,​
    "sales_volume": [​
      173,​
      151,​
      148​
    ]​
  },​
  {​
    "id": 9,​
    "color": "white_9381",​
    "price": 597,​
    "sales_volume": [​
      150,​
      150,​
      73​
    ]​
  }​
]​

```

## Multi-condition filtering​

The logical operators that can be used to combine multiple filtering conditions include:​

- `and` or `&&`: Both conditions should be satisfied.​

- `or` or `||`:  Only one of the two conditions should be satisfied.​

<div class="alert note">

When a lower precedence operation should be processed first, it should be enclosed within parentheses. Innermost parenthetical expressions are evaluated first.​

</div>

#### Example​

The following example demonstrates how to filter products that are red in color, priced below 500, branded as Apple, and have sales over 100 items in the first country​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">cURL</a>
</div>

```python
results = client.query(​
    collection_name="my_collection",​
    filter='color like "red%" and price < 500 and inventory["brand"] in ["Apple"] and sales_volume[0] > 100',​
    output_fields=["id", "color", "price", "inventory", "sales_volume"]​
)​
​
# Output​
# {'id': 5, 'color': 'red_4794', 'price': np.float32(327.0), 'inventory': {'brand': 'Apple', 'quantity': 193, 'previous_sales': [225, 286, 202]}, 'sales_volume': [155, 161, 106, 86, 99]}​

```

```java
import io.milvus.v2.service.vector.request.QueryReq​
import io.milvus.v2.service.vector.request.QueryResp​
​
QueryReq queryReq = QueryReq.builder()​
        .collectionName("my_collection")​
        .filter("color like \"red%\" and price < 500 and inventory[\"brand\"] in [\"Apple\"] and sales_volume[0] > 100")​
        .outputFields(Arrays.asList("id", "color", "price", "inventory", "sales_volume"))​
        .build();​
​
QueryResp getResp = client.query(queryReq);​
​
// Output​
// {color=red_4794, price=327.0, id=5, inventory={"brand":"Apple","quantity":193,"previous_sales":[225,286,202]}, sales_volume=[155, 161, 106, 86, 99]}​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
var res = client.query({​
    collection_name="my_collection",​
    filter='color like "red%" and price < 500 and inventory["brand"] in ["Apple"] and sales_volume[0] > 100',​
    output_fields=["id", "color", "price", "inventory", "sales_volume"]​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_collection",​
    "filter": "color like \"red%\" and price < 500 and inventory[\"brand\"] in [\"Apple\"] and sales_volume[0] > 100",​
    "outputFields": ["id", "color", "price", "inventory", "sales_volume"]​
}'​

```

The filtered results are as follows:​

```JSON
[​
  {​
    "id": 5,​
    "color": "red_4794",​
    "price": 327,​
    "inventory": {​
      "brand": "Apple",​
      "quantity": 193​
    },​
    "sales_volume": [​
      155,​
      161,​
      106,​
      86,​
      99​
    ]​
  }​
]​

```

## Operator precedence​

The following table lists the precedence of operators. Operators are listed top to bottom, in descending precedence.​

| Precedence | Operator                |
|------------|-------------------------|
| 1          | +, -                    |
| 2          | not                     |
| 3          | **                      |
| 4          | *, /, %                 |
| 5          | <, <=, >, >=            |
| 6          | ==, !=                  |
| 7          | like                    |
| 8          | JSON_CONTAINS           |
| 9          | ARRAY_CONTAINS          |
| 10         | JSON_CONTAINS_ALL       |
| 11         | ARRAY_CONTAINS_ALL      |
| 12         | JSON_CONTAINS_ANY       |
| 13         | ARRAY_CONTAINS_ANY      |
| 14         | ARRAY_LENGTH            |
| 15         | and (&&)                |
| 16         | or (\|\|)               |

Expressions are normally evaluated from left to right. Complex expressions are evaluated one at a time. The order in which the expressions are evaluated is determined by the precedence of the operators used.​

If an expression contains two or more operators with the same precedence, the operator to the left is evaluated first. When a lower precedence operation should be processed first, it should be enclosed within parentheses.​
