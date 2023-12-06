const m2s = require('mongoose-to-swagger')
const User = require('./models/user.model')
const Product = require('./models/product.model')

exports.options = {
    "components": {
        "schemas": {
            User: m2s(User),
            Product: m2s(Product)
        }
    },
    "openapi": "3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "Products CRUD API",
        "description": "Products Project Application",
        "contact": {
            "name": "API Support",
            "url": "https: // www.exaple.com",
            "email": "suport@exaple.com" 
        },
    },
    "servers": [
        {
            url: 'http://localhost:3000',
            description: 'Local Server'
        },
        {
            url: "https: // www.exaple.com",
            description: "Testing Server" 
        }
    ],
    "tags": [
        {
            "name": "Users",
            "description": "API for users" 
        },
        {
            "name": "Products",
            "description": "API for products" 
        },
        {
            "name": "Users and Products",
            "description": "API for users and their products" 
        }
    ],
    "paths": {
        "/api/users": {
            "get": {
                "tags": [
                    "Users"
                ],
                "description": "Returns all users",
                "responses": {
                    "200": {
                        "description": "A list of users",
                        "content": {
                            "aplication/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                    "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                        
                    },
                    "400": {

                    }
                }
            }, 
            "post": {
                "tags": [
                    "Users"
                ],
                "description": "Create new user",
                "requestBody": {
                    "description": "User that we want to create",
                    "content": {
                         // "application/x-www-form-urlencoded": { (αν είχαμε καποια φορμα να συμπληρώσουμε)
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": { 
                                    "username": { "type": "string"},
                                    "password": { "type": "string"},
                                    "name": { "type": "string"},
                                    "surname": { "type": "string"},
                                    "email": { "type": "string"},
                                    "address": { 
                                        "type": "object",
                                        "properties": {
                                            "area": {"type": "string"},
                                            "road": {"type": "string"}
                                        }
                                    },
                                    "phone": { 
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": {"type": "string"},
                                                "number": {"type": "string"}
                                            }
                                        }
                                    }
                                },
                                "required": ["username","password", "email"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New user is created"
                    }
                }
            }
        },

        "/api/users/{username}": {
            "get": {
                "tags": [
                    "Users"
                ],
                "parameters":[
                    {"name": "username",
                    "in": "path",
                    "required": true,
                    "description":"User find",
                    "type": "string"
                }
                ],
                "description": "Get user with specific username, field description",
                "summary": "Summary Details",
                "responses": {
                    "200": {
                        "description": "User Find",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "patch": {
                "tags": [
                    "Users"
                ],
                "description": "Upadate user",
                "parameters":[
                    {"name": "username",
                    "in": "path",
                    "required": true,
                    "description":"User of user that we want to update",
                    "type": "string"
                }
                ],
                "requestBody":{
                    "description": "Data of user that we want to update",
                    "content": { 
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": { 
                                    "username": { "type": "string"},
                                    "name": { "type": "string"},
                                    "surname": { "type": "string"},
                                    "email": { "type": "string"},
                                    "address": { 
                                        "type": "object",
                                        "properties": {
                                            "area": {"type": "string"},
                                            "road": {"type": "string"}
                                        }
                                    },
                                    "phone": { 
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": {"type": "string"},
                                                "number": {"type": "string"}
                                            }
                                        }
                                    }
                                },
                                "required": ["email"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User Updated",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "Users"
                ],
                "description": "Deleting user",
                "parameters":[
                    {"name": "username",
                    "in": "path",
                    "description":"Username of user that we want to delete",
                    "schema": {
                        "$ref": "#/components/schemas/User"
                    }
                }
                ],
                "responses": {
                    "200": {
                        "description": "Delete User",

                    }
                }
            }
        },

        "/api/user-products": {
            "get": {
                "tags": [
                    "Users and Products"
                ],
                "summary": "Get all user's products",
                "discription": "Get all user's products",
                "responses": {
                 "200": {
                    "discription": "OK",
                    "schema": {
                        "$ref": "#/components/schemas/User"
                    }
                 }   
                }
        },
            "post": {
                "tags": [
                    "Users and Products"
                ],
                "discription": "Add new product for user",
                "requsteBody": {
                    "discription":"User tha we want to add product",
                    "content": { 
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": { 
                                    "username": { "type": "string"},
                                    "products": { 
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "product": {"type": "string"},
                                                "cost": {"type": "number"},
                                                "quantity": {"type": "number"}
                                            }
                                        }
                                    }
                                },
                            "required": ["quantity" ]    
                            }
                        }
                    }
                    },
                "responses": {
                "200": {
                    "discription": "OK",
                    "schema": {
                        "$ref": "#/components/schema/User"
                    }
                }   
                }
            }
        },
        "/api/user-products/{username}":{
            "get": {
                "tags": [
                    "Users and Products"
                ],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "User's useraname to find products",
                        "type": "string"
                    }
                ],
                "description": "Description Text",
                "summary": "Summary text",
                "responses": {
                    "200": {
                        "description": "User's products",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "patch": {
                "tags": [
                    "Users and Products"
                ],
                "discription": "Upadate user's product",
                "requestBody": {
                    "description": "Description for requestbody",
                    "parameters": [
                        {
                            "name": "username",
                            "in": "path",
                            "required": true,
                            "description": "User's useraname to find products",
                            "type": "string"
                        }
                    ],
                    "content": {
                        "application/json": {
                            "schema":{
                                "type": "object",
                                "properties": {
                                    "username": {"type": "string"},
                                    "product": {
                                        "type": "object",
                                        "properties": {
                                            "_id": {"type": "string"},
                                            "quantity": {"type": "number"}
                                        }
                                    }
                                },
                                "required" : ["quantity"]                              
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description":"Description for response"
                    }
                }
            }
        },
        "/api/user-products/{username}/products/{product}": {
            "delete":{
                "tags": [
                    "Users and Products"
                ],
                "description": "Description for delete",
                "parameters": [
                    {
                        "name": "username", 
                        "in": "path",
                        "description": "username to find",
                        "required": true
                    },
                    {
                        "name": "product",
                        "in": "path",
                        "description": "product name to delete",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Product deleted"
                    }
                }
            }
        },
        "/api/products": {
            "get": {
                "tags": [
                    "Products"
                ],
                "summary": "Get all products",
                "discription": "Get all products",
                "responses": {
                 "200": {
                    "discription": "OK",
                    "schema": {
                        "$ref": "#/components/schemas/Products"
                    }
                 }   
                }
            },
            "post": {
                "tags": [
                    "Products"
                ],
                "description": "Add new product",
                "requestBody": {
                    "description":"User tha we want to add product",
                    "content": { 
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": { 
                                    "product": { "type": "string"},
                                    "cost": {"type": "number"},
                                    "description": {"type": "string"}, 
                                    "quantity": {"type": "number"}
                                },
                            "required": ["product", "cost", "quantity"]    
                            }
                        }
                    }
                },
                "responses": {
                "200": {
                    "description": "OK",
                    "schema": {
                        "$ref": "#/components/schema/Products"
                    }
                }   
                }
            }
        },
        "/api/products/{id}":{
            "get": {
                "tags": [
                    "Products"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "Product's id to find a product",
                        "type": "string"
                    }
                ],
                "description": "Description Text",
                "responses": {
                    "200": {
                        "description": "Product",
                        "schema": {
                            "$ref": "#/components/schemas/Products"
                        }
                    }
                }
            },
            "patch": {
                "tags": [
                    "Products"
                ],
                "dεscription": "Upadate a product",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "Product's id to find a product",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Description for requestbody",
                    "content": {
                        "application/json": {
                            "schema":{
                                "type": "object",
                                "properties": {
                                    "product": { "type": "string"},
                                    "cost": {"type": "number"},
                                    "description": {"type": "string"}, 
                                    "quantity": {"type": "number"}
                                },
                                "required" : ["product", "cost", "quantity"]   
                            }
                        }                              
                    }
                },    
                "responses": {
                    "200": {
                        "description":"Description for response"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Products"
                ],
                "description": "Deleting product",
                "parameters":[
                    {"name": "id",
                    "in": "path",
                    "description":"Username of user that we want to delete",
                    "schema": {
                        "$ref": "#/components/schemas/Products"
                    }
                }
                ],
                "responses": {
                    "200": {
                        "description": "Delete product",

                    }
                }
            }
        }
        
    }
}