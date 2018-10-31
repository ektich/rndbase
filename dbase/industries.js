// create industries collection

db = new Mongo().getDB("rndbase")

db.createCollection("industries", {
    validator: {
	$jsonSchema: {
	    bsonType: "object",
	    properties: {
		name: {
		    bsonType: "string",
		    description: "internal name of the industry"
		},
		goods: {
		    bsonType: "string",
		    description: "internal name of the goods"
		},
		"location.city" : {
		    bsonType: "string",
		    description: "internal name of the city"
		},
		"location.region" : {
		    bsonType: "string",
		    description: "internal name of the region"
		},
		"location.cpoint" : {
		    enum: [ "n", "e", "w", "s", "ne", "nw", "se", "sw"],
		    description: "compass point relative to the city"
		}
	    }
	}
    }
})

// create indexes needed in the collection
db.industries.createIndex({'name': 1})
