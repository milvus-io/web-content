---
id: pymilvus_faq.md
title: Pymilvus FAQ
---
# PyMilvus FAQ

#### I got random errors `socket operation on non-socket`  from gRPC. What shall I do?

Make sure to set the environment variable `GRPC_ENABLE_FORK_SUPPORT=1`.

#### I got an error when installing PyMilvus on Windows. What shall I do?

We do not recommend installing PyMilvus on Windows. Try installing it in a Conda environment.
