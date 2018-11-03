# Notes on Schema for the database #

Main purpose of this database is to build information about industries
and their locations with regard to cities.

## Steam Over Europe (SOE)

SOE map is split into 10 regions. Each region has 5 cities and varying
number of industries. There are also harbours and warehouses from
where goods can be picked up. Each city also has a landmark.

### Industries
Each industry should be represented by a document in the _industries_
collection. It should have a name that identifies the industry, and
location (encoded as a compas point: 'n', 's', 'e', 'w' etc). To help
with translations, for each language there should be a sub-document,
identified by two-letter code of the language ("en", "de" etc), that
will have the appropriate "name" and "location" attributes set in that
language. Each industry should also have distances to different cities
set in a sub-document called "distances". Distance is specified as a
number of tracks.

Following JSON Schema is used to validate documents within
_industries_ collection:

```javascript
{
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
```
