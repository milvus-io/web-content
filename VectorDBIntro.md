# Introduction of Characteristic Vector Database

## Feature vector

### What is a feature vector
A vector is a series of numbers. It is like a matrix with only one row but multiple columns (or only one column but multiple rows), for example [2,0,1,9,0,6,3,0].

A feature vector is a vector that contains information describing an object's important characteristics. An example of a feature vector you might be familiar with is RGB (red-green-blue) color descriptions. A color can be described by how much red, blue, and green there is in it. A feature vector for this would be color = [R, G, B].

### Why feature vector
Advances in modern computer and machine learning technologies have led to huge archieves of multimedia data in diverse application areas such as security, medicine, education and online information services. A multimedia object cannot be simply described by alphanumeric data, the basic data type in traditional databases, as they have generally multiple dimentions of properties.

Instead, feature vectors describe an object from a multidimentional, easily analyzable way, and are suitable to represent numeric or symbolic characteristics of multimedia content.

They are important for many different areas of machine learning and pattern processing. Machine learning algorithms typically require a numerical representation of objects in order for the algorithms to do processing and statistical analysis.

### Use cases
As already mentioned, feature vectors, with its effectiveness and practicality of representing objects in a numerical way to help with may kinds of analyses, are used widely in machine learning. 

- Image processing

  Features can be gradient magnitude, color, grayscale intensity, edges, areas, and more. Feature vectors are particularly popular for analyses in image processing because of the convenient way attributes about an image, like the RGB color example listed, can be compared numerically once put into feature vectors.

- Speech recognition

  Features can be sound lengths, noise level, noise ratios, and more.

- Spam-fighting initiatives

  Features are abundant. They can be IP location, text structure, frequency of certain words, or certain email headers.


## Traditional database & feature vector indexing
Traditional relational database are designed to organize alphanumeric data into interrelated collections. However, this technology is not well suited to the management of multimedia information. The feature vector data, vector storing and indexing methods, the large size of media objects are entirely foreign to traditional databases. 

Some may argue and request call our attention to some vector indexing plug-ins by traditional databases, such as imgsmlr and word2vector by PostgreSQL. However, as the enhancement are only made based on Hash search and one-dimention alphanumeirc data, the performance of these plug-ins are far from satisfying, and can barely meet the needs of huge high-dimentional vector indexing. 


## Vector indexing methods
Feature vectors are good for analysis because there are many techniques for comparing feature vectors. One simple way to compare the feature vectors of two objects is to take the Euclidean distance.

## Feature vector database



## Milvus database
