---
id: connect.md
title: Connect
---

# Overview

This section covers fundamentals and basic Milvus operations in Python interactive mode.

Type `python3` in your terminal to enter Python interactive mode. Here we take Python 3.9.1 as an example:

<div class="mutipleCode">
<a href="?node">Nodejs</a> <a href="?py">Python </a>
</div>

<div class="mutipleCode-node" markdown="block">

```js
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

</div>
<div class="mutipleCode-py" markdown="block">

```
➜  ~ python3
Python 3.9.1 (default, Feb  3 2021, 07:38:02)
[Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

</div>

## Connect to the Milvus server

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus_orm import connections
>>> connections.connect("default", host='localhost', port='19530')
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
const milvusClient = new MilvusClient("localhost:19530");
```

## Close server connection

When you no longer need Milvus services, you can call `close()` to release all connection resources to the Milvus server:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> connections.disconnect("default")
```

```javascript
await milvusClient.closeConnection();
```
