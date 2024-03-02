# MongoDB Research Document

## Motivation

1. I'm doing this research because I have never worked with databases before and we will need to implement one for Sortify
2. I expect to learn how to store user settings, spotify IDs, playlist info within our database
3. I expect to integrate the database with our frontend and the rest of the stack, as well as implement CRUD operations
4. SCRUM 64, 61, 75
5. This research was done by Mason Melead

## Overview

MongoDB is a NoSQL Database good for large amounts of data. It is very scalable and flexible in terms of schemas. These are some of its advantages vs SQL databases.

## Installation and Setup

### MongoDB Atlas

MongoDB Atlas is a Database as a serivce product from MongoDB. Atlas manages the database for you. There is built in replication. Data is stored on a replica set, ensuring data redundancy.

There are serverless instances or clusters. Serverless instances scale on demand and are better for variable/sparse loads.

Clusters are shared or dedicated. Shared clusters are smaller and include a free tier and allow 100,000 deployments

Dedicated clusters are better for production workloads.
You can choose AWS, Azure, or Google Cloud.
Atlas search allows you to search your database.
Atlas charts is a built-in data visualization tool.

MongoDB Atlas is what we should use. The system will be largely managed for us, and this reduces the technical complexity of the project. None of us are experienced database admins so this makes the most sense.

### Collections and documents

- Collections are analagous to tables in relational databases. Collections are groups of similar documents, though documents within a collection are not required to have the same fields
- Documents are the basic unit of data in MongoDB. They are stored in a BSON format. They consist of key-value pairs (AKA fields).
-
