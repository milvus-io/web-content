---
id: install_standalone-source.md
label: Build from Source Code
order: 1
group: install_standalone 
---

# Install Milvus Standalone

## Build Milvus Standalone from source code

1. Prerequisites

Install the following dependencies before building Milvus Standalone from source code.

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for version control.
- [Golang](https://golang.org/doc/install) version 1.15 or higher and associated toolkits.
- [CMake](https://cmake.org/install/) version 3.14 or higher for compilation.
- [OpenBLAS](https://github.com/xianyi/OpenBLAS/wiki/Installation-Guide) (Basic Linear Algebra Subprograms) library version 0.3.9 or higher for matrix operations.

 2. Compile executable files for Milvus Standalone:

 ```
 # Clone github repository
$ cd /home/$USER/
$ git clone https://github.com/milvus-io/milvus.git

# Install third-party dependencies
$ cd /home/$USER/milvus/
$ ./scripts/install_deps.sh

# Compile Milvus standalone
$ make singlenode
```

3. Start Milvus Standalone:

```
$ unset http_proxy
$ unset https_proxy

# Start infrastructure service
$ cd /home/$USER/milvus/deployments/docker
$ docker-compose down
$ docker-compose up -d

# Start Milvus Standalone service
$ cd /home/$USER/milvus
./bin/singlenode    > /tmp/singlenode.log 2>&1  &
```
