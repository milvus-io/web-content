---
id: install_embedded_milvus.md
related_key: installation
title: Install Embedded Milvus
summary: Learn how to install embedded Milvus.
---

# Install Embedded Milvus


This topic describes how to install embedded Milvus. 

<div class="alert note">
Do not use embedded Milvus in production environment or if you require high performance.
</div>


Embedded Milvus is suitable for the following scenarios:
- You want to use Milvus directly without having it installed using [Docker Compose, Helm, etc.](install_standalone-docker.md).
- You don't feel like using any containers like Docker.
- You want to use Milvus without keeping a long-running Milvus process in your machine.

## Prerequisites

- Python 3.6 or later
- Supported operating systems include Ubuntu 18.04, Mac x86_64 >= 10.4, Mac M1 >= 11.0

## Install embedded Milvus

1. Run the following command to install embedded Milvus. 

```
$ python3 -m pip install milvus
```


You can also install a specific version of embedded Milvus. The following example installs the 2.0.2-rc4 version of embedded Milvus.

```
$ python3 -m pip install milvus==2.1.0
```

2. Create data folder for embedded Milvus under `/var/bin/e-mllvus`.

```
$ sudo mkdir -p /var/bin/e-milvus
$ sudo chmod -R 777 /var/bin/e-milvus
```

## Start embedded Milvus

1. When running embedded Milvus for the first time, import Milvus and run `milvus.before()` to set up embedded Milvus.

```
$ python3
Python 3.9.10 (main, Jan 15 2022, 11:40:53)
[Clang 13.0.0 (clang-1300.0.29.3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import milvus
--- if you are running Milvus for the first time, type milvus.before() for pre-run instructions ---
--- otherwise, type milvus.start() ---
>>>
>>> milvus.before()
please do the following if you have not already done so:
1. install required dependencies: bash /var/bin/e-milvus/lib/install_deps.sh
2. (Linux system only) export LD_PRELOAD=/Users/yuchengao/Documents/GitHub/soothing-rain/embd-milvus/milvus/bin/embd-milvus.so
3. (on Linux systems) export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib:/usr/local/lib:/var/bin/e-milvus/lib/
   (on MacOS systems) export DYLD_FALLBACK_LIBRARY_PATH=DYLD_FALLBACK_LIBRARY_PATH:/usr/lib:/usr/local/lib:/var/bin/e-milvus/lib/
>>>
```

2. Install required dependencies.

```
# exit() python interactive mode first
# Note that this must be done AFTER `import milvus`
$ bash /var/bin/e-milvus/lib/install_deps.sh
```

3. Set the environment variable.

```
# exit() python interactive mode first
# Note that this must be done AFTER `import milvus`
$ (Linux system only) export LD_PRELOAD=/Users/yuchengao/Documents/GitHub/soothing-rain/embd-milvus/milvus/bin/embd-milvus.so
(on Linux systems) $ export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib:/usr/local/lib:/var/bin/e-milvus/lib/
(on MacOS systems) $ export DYLD_FALLBACK_LIBRARY_PATH=DYLD_FALLBACK_LIBRARY_PATH:/usr/lib:/usr/local/lib:/var/bin/e-milvus/lib/
```

4. Start embedded Milvus.

```
$ python3
Python 3.9.10 (main, Jan 15 2022, 11:40:53)
[Clang 13.0.0 (clang-1300.0.29.3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import milvus
--- if you are running Milvus for the first time, type milvus.before() for pre-run instructions ---
--- otherwise, type milvus.start() ---
>>>
>>> milvus.start()
---Milvus Proxy successfully initialized and ready to serve!---
>>>
```

## Play with Embedded Milvus
There are two ways to play with Embedded Milvus.
1. Start another terminal windows and run your Milvus client script. For example:
```
# --- Download hello_milvus script ---
$ wget https://raw.githubusercontent.com/milvus-io/pymilvus/v2.1.0/examples/hello_milvus.py
# --- Run Hello Milvus ---
$ python3 hello_milvus.py
```
2. (not suggested in Linxu) In the same window, type in and run your pyMilvus script, immediately after `milvus.start()`:
```python
$ python3
Python 3.9.10 (main, Jan 15 2022, 11:40:53)
[Clang 13.0.0 (clang-1300.0.29.3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import milvus
--- if you are running Milvus for the first time, type milvus.before() for pre-run instructions ---
--- otherwise, type milvus.start() ---
>>>
>>> milvus.start()
---Milvus Proxy successfully initialized and ready to serve!---
>>>
>>>
>>> import random
>>> from pymilvus import (
...     connections,
...     utility,
...     FieldSchema, CollectionSchema, DataType,
...     Collection,
... )
>>> connections.connect("default", host="localhost", port="19530")
>>> has = utility.has_collection("hello_milvus")
>>> fields = [
...     FieldSchema(name="pk", dtype=DataType.INT64, is_primary=True, auto_id=False),
...     FieldSchema(name="embeddings", dtype=DataType.FLOAT_VECTOR, dim=8)
... ]
>>> schema = CollectionSchema(fields, "hello_milvus is the simplest demo to introduce the APIs")
>>> hello_milvus = Collection("hello_milvus", schema, consistency_level="Strong")
>>> num_entities = 3000
>>> entities = [
...     [i for i in range(num_entities)], # provide the pk field because `auto_id` is set to False
...     [[random.random() for _ in range(8)] for _ in range(num_entities)],  # field embeddings
... ]
>>> insert_result = hello_milvus.insert(entities)
>>> index = {
...     "index_type": "IVF_FLAT",
...     "metric_type": "L2",
...     "params": {"nlist": 128},
... }
>>> hello_milvus.create_index("embeddings", index)
>>> hello_milvus.load()
>>> vectors_to_search = entities[-1][-2:]
>>> search_params = {
...     "metric_type": "l2",
...     "params": {"nprobe": 10},
... }
>>> result = hello_milvus.search(vectors_to_search, "embeddings", search_params, limit=3)
>>> for hits in result:
...     for hit in hits:
...         print(f"hit: {hit}")
...
hit: (distance: 0.0, id: 2998)
hit: (distance: 0.1088758111000061, id: 2345)
hit: (distance: 0.12012234330177307, id: 1172)
hit: (distance: 0.0, id: 2999)
hit: (distance: 0.0297045037150383, id: 2000)
hit: (distance: 0.16927233338356018, id: 560)
>>> utility.drop_collection("hello_milvus")
>>>
```

## Cleaning Up

Finally, when you are done, it is highly recommended that you stop Milvus gracefully and use exit() or Ctrl-D (i.e. EOF) to exit.

```python
>>> milvus.stop()
to clean up, run:
(Linux system only) export LD_PRELOAD=
(on Linux) export LD_LIBRARY_PATH=
(on MacOS) export DYLD_FALLBACK_LIBRARY_PATH=
>>>
>>> exit()
```

## FAQ
Q: Embedded-Milvus quited with segmentation error on Linux systems.

A: Start another terminal window to run your Milvus client. This is because setting env variable `LD_PRELOAD` in Linux might cause some conflicts.

---

Q: I have other issues.

A: Please file an issue here: https://github.com/milvus-io/embd-milvus/issues/new
