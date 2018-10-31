// Create and populate goods collection

db = new Mongo().getDB("rndbase")

db.createCollection("goods", {
    validator: {
	$jsonSchema: {
	    bsonType: "object",
	    required: ["name", "industry"],
	    properties: {
		name: {
		    bsonType: "string",
		    description: "internal goods name"
		},
		industry: {
		    bsonType: "string",
		    description: "industry name producing goods"
		},
		requires: {
		    bsonType: "array",
		    description: "list of resources required by this resource"
		},
		"en.name": {
		    bsonType: "string",
		    description: "name of the resource in British English"
		}
	    }
	}
    }
})

// create indexes needed in the collection
db.goods.createIndex({'name': 1}, {unique: true})
db.goods.createIndex({'industry': 1})

// insert initial data
db.goods.insertMany([
    { name : 'grain',
      en: {name : 'Grain'},
      industry : 'grain farm'},
    { name : 'wood',
      en: {name : 'Wood'},
      industry : 'lumber storage'},
    { name : 'coal',
      en:  {name : 'Coal'},
      industry : 'coal mine'},
    { name : 'cattle',
      en: {name : 'Cattle'},
      industry : 'cattle farm'},
    { name : 'boards',
      en: { name : 'Boards'},
      industry : 'sawmill'},
    { name : 'iron ore',
      en: { name : 'Iron Ore'},
      industry : 'iron ore mine'},
    { name : 'iron',
      en: { name : 'Iron'},
      industry : 'iron works'},
    { name : 'leather',
      en: { name : 'Leather'},
      industry : 'tannery'},
    { name : 'cotton',
      en: { name : 'Cotton'},
      industry : 'cotton warehouse'},
    { name : 'thread',
      en: { name : 'Thread'},
      industry : 'spinning company'},
    { name : 'flour',
      en: { name : 'Flour'},
      industry : 'mill'},
    { name : 'meat',
      en: { name : 'Meat'},
      industry : 'butchery'},
    { name : 'paper',
      en: { name : 'Paper'},
      industry : 'paper mill'},
    { name : 'pastries',
      en: { name : 'Pastries'},
      industry : 'large scale bakery'},
    { name : 'textiles',
      en: { name : 'Textiles'},
      industry : 'weaving mill'},
    { name : 'hardware',
      en: { name : 'Hardware'},
      industry : 'metal factory'},
    { name : 'copper ore',
      en: { name : 'Copper Ore'},
      industry : 'copper mine'},
    { name : 'quartz',
      en: { name : 'Quartz'},
      industry : 'quartz quarry'},
    { name : 'copper',
      en: { name : 'Copper'},
      industry : 'copper smelting'},
    { name : 'steel',
      en: { name : 'Steel'},
      industry : 'steelworks'},
    { name : 'shoes',
      en: { name : 'Shoes'},
      industry : 'shoemaker'},
    { name : 'packaging',
      en: { name : 'Packaging'},
      industry : 'packaging manufacturer'},
    { name : 'wires',
      en: { name : 'Wires'},
      industry : 'wiremaker'},
    { name : 'pipes',
      en: { name : 'Pipes'},
      industry : 'pipe warehouse'},
    { name : 'glassware',
      en: { name : 'Glassware'},
      industry : 'glass factory'},
    { name : 'windows',
      en: { name : 'Windows'},
      industry : 'windowmaker'},
    { name : 'sheet metal',
      en: { name : 'Sheet Metal'},
      industry : 'rolling mill'},
    { name : 'crude oil',
      en: { name : 'Crude Oil'},
      industry : 'crude oil storage'},
    { name : 'lamps',
      en: { name : 'Lamps'},
      industry : 'lampmaker'},
    { name : 'food',
      en: { name : 'Food'},
      industry : 'food factory'},
    { name : 'clothing',
      en: { name : 'Clothing'},
      industry : 'sewing factory'},
    { name : 'stainless steel',
      en: { name : 'Stainless Steel'},
      industry : 'steel refinery'},
    { name : 'chemicals',
      en: { name : 'Chemicals'},
      industry : 'petrochemical plant'},
    { name : 'silicon',
      en: { name : 'Silicon'},
      industry : 'silicon warehouse'},
    { name : 'aluminium',
      en: { name : 'Aluminium'},
      industry : 'aluminium plant'},
    { name : 'bauxite',
      en: { name : 'Bauxite'},
      industry : 'bauxite mine'},
    { name : 'plastics',
      en: { name : 'Plastics'},
      industry : 'refinery'},
    { name : 'steel beams',
      en: { name : 'Steel Beams'},
      industry : 'steel beam factory'},
    { name : 'pottery',
      en: { name : 'Pottery'},
      industry : 'ceramic furnace'},
    { name : 'petrol',
      en: { name : 'Petrol'},
      industry : 'petrol refinery'},
    { name : 'machinery',
      en: { name : 'Machinery'},
      industry : 'mechanical engineering'},
    { name : 'cars',
      en: { name : 'Cars'},
      industry : 'car factory'},
    { name : 'household goods',
      en: { name : 'Household Goods'},
      industry : 'household supplies factory'},
    { name : 'electronics',
      en: { name : 'Electronics'},
      industry : 'electronics factory'},
    { name : 'toys',
      en: { name : 'Toys'},
      industry : 'toys factory'},
    { name : 'sports goods',
      en: { name : 'Sports Goods'},
      industry : 'sports good manufacturer'},
    { name : 'toiletries',
      en: { name : 'Toiletries'},
      industry : 'toiletries factory'},
    { name : 'pharmaceuticals',
      en: { name : 'Pharmaceuticals'},
      industry : 'pharmaceutical refinery'}])
