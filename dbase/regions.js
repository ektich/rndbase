// create regions collection

db = new Mongo().getDB("rndbase")

db.createCollection("regions", {
    validator: {
	$jsonSchema: {
	    bsonType: "object",
	    required: ["name"],
	    properties: {
		name: {
		    bsonType: "string",
		    description: "internal region name"
		},
		"en.name": {
		    bsonType: "string",
		    description: "name of the region in British English"
		},
	    }
	}
    }
})

// create indexes needed in the collection
db.regions.createIndex({'name': 1}, {unique: true})

// insert initial data
db.regions.insertMany([
    { name: 'central',
      en: {name: 'Central'}},
    {  name: 'east',
       en: {name: 'East'}},
    { name: 'north',
      en: {name: 'North'}},
    { name: 'north-east',
      en: {name: 'North-East'}},
    { name: 'north-west',
      en: {name: 'North-West'}},
    { name: 'south',
      en: {name: 'South'}},
    { name: 'south-east',
      en: {name: 'South-East'}},
    { name: 'south-southeast',
      en: {name: 'South-SouthEast'}},
    { name: 'south-west',
      en: {name: 'South-West'}},
    { name: 'west',
      en: {name: 'West'}}
])
