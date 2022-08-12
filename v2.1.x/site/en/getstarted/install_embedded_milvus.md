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
- You want to use Milvus without keeping a long running Milvus process in your machine.
- You want to use Milvus and immediately start a Milvus process.

## Prerequisites

- Python 3.6 or later
- Supported operating systems include Ubuntu 18.04, Mac x86_64, Mac M1

## Install embedded Milvus

1. Run the following command to install embedded Milvus. 

```
$ python3 -m pip install milvus
```

If you already have the required version of PyMilvus installed, run the following command to install.

```
$ python3 -m pip install --no-deps milvus
```

You can also install a specific version of embedded Milvus. The following example installs the 2.0.2-rc4 version of embedded Milvus.

```
$ python3 -m pip install milvus==2.0.2rc4
```

2. Create data folder for embedded Milvus under `/var/bin/e-mllvus`.

```
$ sudo mkdir -p /var/bin/e-milvus
$ sudo chmod 777 -R /var/bin/e-milvus
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
please do the following if you haven not already done so:
1. install required dependencies: bash /var/bin/e-milvus/lib/install_deps.sh
2. export LD_PRELOAD=/SOME_PATH/embd-milvus.so
3. export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib:/usr/local/lib:/var/bin/e-milvus/lib/
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
$ export LD_PRELOAD=/SOME_PATH/embd-milvus.so
$ export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib:/usr/local/lib:/var/bin/e-milvus/lib/
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

## Stop embedded Milvus

Run the following command or press Ctrl+D to stop embedded Milvus.

```
>>> milvus.stop()
if you need to clean up the environment variables, run:
export LD_PRELOAD=
export LD_LIBRARY_PATH=
>>>
>>> exit()
```

<div class="alert note">
Embedded Milvus starts and exits at your command, but all data and logs persist.
</div>

## Upgrade embedded Milvus version

Run the following command to upgrade the version of embedded Milvus you have installed.

```
$ python3 -m pip install --upgrade milvus
```

