// Create and populate goods collection

db = new Mongo().getDB("rndbase")

db.goods.drop()
db.createCollection("goods", {
    validator: {
	$jsonSchema: {
	    bsonType: "object",
	    required: ["name", "era", "industry"],
	    properties: {
		name: {
		    bsonType: "string",
		    description: "internal goods name"
		},
		era: {
		    bsonType: "number",
		    minimum: 1,
		    maximum: 6,
		    description: "era goods belong to"
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
		},
		"en.industry": {
		    bsonType: "string",
		    description: "industry name in British English"
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
      industry : 'grain farm',
      era: 1,
      en: { name : 'Grain',
	    industry : 'Grain Farm'
	  }
    },
    { name : 'wood',
      industry : 'lumber storage',
      era: 1,
      en: {name : 'Wood',
           industry : 'Lumber Storage'
	  }
    },
    { name : 'coal',
      industry : 'coal mine',
      era: 1,
      en:  {name : 'Coal',
	    industry : 'Coal Mine'
	   }
    },
    { name : 'cattle',
      industry : 'cattle farm',
      era: 1,
      requires: ['grain'],
      en: {name : 'Cattle',
	   industry : 'Cattle Farm'
	  }
    },
    { name : 'boards',
      industry : 'sawmill',
      era: 1,
      requires: ['wood'],
      en: { name : 'Boards',
	    industry : 'Sawmill'
	  }
    },
    { name : 'iron ore',
      industry : 'iron ore mine',
      era: 1,
      en: { name : 'Iron Ore',
	    industry : 'Iron Ore'
	  }
    },
    { name : 'iron',
      industry : 'iron works',
      era: 1,
      requires: ['coal', 'iron ore'],
      en: { name : 'Iron',
	    industry : 'Iron Works'
	  }
    },
    { name : 'leather',
      industry : 'tannery',
      era: 1,
      requires: ['cattle', 'grain'],
      en: { name : 'Leather',
	    industry: 'Tannery'
	  }
    },
    { name : 'cotton',
      industry : 'cotton warehouse',
      era: 1,
      en: { name : 'Cotton',
	    industry : 'Cotton Warehouse'
	  }
    },
    { name : 'thread',
      industry : 'spinning company',
      era: 1,
      requires: ['cotton'],
      en: { name : 'Thread',
	    industry : 'Spinning Company'
	  }
    },
    { name : 'flour',
      industry : 'mill',
      era: 2,
      requires: ['grain'],
      en: { name : 'Flour',
	    industry : 'Mill'
	  }
    },
    { name : 'meat',
      era: 2,
      requires: ['cattle'],
      industry : 'butchery',
      en: { name : 'Meat',
	    industry : 'Butchery'
	  }
    },
    { name : 'paper',
      era: 2,
      requires: ['wood'],
      industry : 'paper mill',
      en: { name : 'Paper',
	    industry : 'Paper Mill'
	  }
    },
    { name : 'pastries',
      era: 2,
      requires: ['paper', 'flour'],
      industry : 'large scale bakery',
      en: { name : 'Pastries',
	    industry : 'large scale bakery'
	  }
    },
    { name : 'textiles',
      era: 2,
      requires: ['thread'],
      industry : 'weaving mill',
      en: { name : 'Textiles',
	    industry : 'weaving mill'
	  }
    },
    { name : 'hardware',
      industry : 'metal factory',
      era: 2,
      requires: ['iron','coal'],
      en: { name : 'Hardware',
	    industry : 'Metal Factory'
	  }
    },
    { name : 'copper ore',
      industry : 'copper mine',
      era: 2,
      en: { name : 'Copper Ore',
	    industry : 'Copper Mine'
	  }
    },
    { name : 'quartz',
      industry : 'quartz quarry',
      era: 2,
      en: { name : 'Quartz',
	    industry : 'Quartz Quarry'
	  }
    },
    { name : 'copper',
      industry : 'copper smelting',
      era: 3,
      requires: ['coal', 'copper ore'],
      en: { name : 'Copper',
	    industry : 'Copper Smelting'
	  }
    },
    { name : 'steel',
      industry : 'steelworks',
      era: 3,
      requires: ['coal', 'iron'],
      en: { name : 'Steel',
	    industry : 'Steelworks'}
    },
    { name : 'shoes',
      industry : 'shoemaker',
      era: 3,
      requires: ['leather', 'hardware'], 
      en: { name : 'Shoes',
	    industry : 'Shoemaker'
	  }
    },
    { name : 'packaging',
      industry : 'packaging manufacturer',
      era: 3,
      requires: ['boards', 'paper'],
      en: { name : 'Packaging',
	    industry : 'packaging manufacturer'
	  }
    },
    { name : 'wires',
      industry : 'wiremaker',
      era: 3,
      requires: ['copper'],
      en: { name : 'Wires',
	    industry : 'Wiremaker'
	  }
    },
    { name : 'pipes',
      industry : 'pipe warehouse',
      era: 3,
      requires: ['hardware', 'copper'],
      en: { name : 'Pipes',
	    industry : 'Pipe Warehouse'
	  }
    },
    { name : 'glassware',
      industry : 'glass factory',
      era: 3,
      requires: ['quartz'],
      en: { name : 'Glassware',
	    industry : 'Glass Factory'
	  }
    },
    { name : 'windows',
      industry : 'windowmaker',
      era: 3,
      requires: ['boards','glassware'],
      en: { name : 'Windows',
	    industry : 'Windowmaker'
	  }
    },
    { name : 'sheet metal',
      industry : 'rolling mill',
      era: 4,
      requires: ['steel', 'pipes'],
      en: { name : 'Sheet Metal',
	    industry : 'Rolling Mill'
	  }
    },
    { name : 'crude oil',
      industry : 'crude oil storage',
      era: 4,
      en: { name : 'Crude Oil',
	    industry : 'Crude Oil Storage'
	  }
    },
    { name : 'lamps',
      industry : 'lampmaker',
      era: 4,
      requires: ['wires','glassware'],
      en: { name : 'Lamps',
	    industry : 'Lampmaker'
	  }
    },
    { name : 'food',
      industry : 'food factory',
      era: 4,
      requires: ['pastries', 'meat'],
      en: { name : 'Food',
	    industry : 'Food Factory'
	  }
    },
    { name : 'clothing',
      industry : 'sewing factory',
      era: 4,
      requires: ['textiles', 'shoes'],
      en: { name : 'Clothing',
	    industry : 'Sewing Factory'
	  }
    },
    { name : 'stainless steel',
      industry : 'steel refinery',
      era: 4,
      requires: ['steel', 'chemicals'],
      en: { name : 'Stainless Steel',
	    industry : 'Steel Refinery'
	  }
    },
    { name : 'chemicals',
      industry : 'petrochemical plant',
      era: 4,
      requires: ['crude oil'],
      en: { name : 'Chemicals',
	    industry : 'Petrochemical Plant'
	  }
    },
    { name : 'silicon',
      industry : 'silicon warehouse',
      era: 4,
      requires: ['quartz'],
      en: { name : 'Silicon',
	    industry : 'Silicon Warehouse'
	  }
    },
    { name : 'aluminium',
      industry : 'aluminium plant',
      era: 5,
      requires: ['bauxite'],
      en: { name : 'Aluminium',
	    industry : 'Aluminium Plant'
	  }
    },
    { name : 'bauxite',
      industry : 'bauxite mine',
      era: 5,
      en: { name : 'Bauxite',
	    industry : 'Bauxite Mine'
	  }
    },
    { name : 'plastics',
      industry : 'refinery',
      era: 5,
      requires: ['chemicals'],
      en: { name : 'Plastics',
	    industry: 'Refinery'
	  }
    },
    { name : 'steel beams',
      industry : 'steel beam factory',
      era: 5,
      requires: ['steel', 'pipes'],
      en: { name : 'Steel Beams',
	    industry : 'Steel Beam Factory'
	  }
    },
    { name : 'pottery',
      industry : 'ceramic furnace',
      era: 5,
      requires: ['quartz'],
      en: { name : 'Pottery',
	    industry : 'ceramic furnace'
	  }
    },
    { name : 'petrol',
      industry : 'petrol refinery',
      era: 5,
      requires: ['crude oil', 'chemicals'],
      en: { name : 'Petrol',
	    industry : 'Petrol Refinery'
	  }
    },
    { name : 'machinery',
      era: 5,
      requires: ['sheet metal','wires'],
      industry : 'mechanical engineering',
      en: { name : 'Machinery',
	    industry : 'mechanical engineering'
	  }
    },
    { name : 'cars',
      era: 5,
      requires: ['textiles','windows','sheet metal','lamps'],
      industry : 'car factory',
      en: { name : 'Cars',
	    industry : 'Car Factory'
	  }
    },
    { name : 'household goods',
      era: 6,
      requires: ['glassware','food','stainless steel'],
      industry : 'household supplies factory',
      en: { name : 'Household Goods',
	    industry : 'Household Supplies Factory'
	  }
    },
    { name : 'electronics',
      era: 6,
      requires: ['machinery','plastics','silicom'],
      industry : 'electronics factory',
      en: { name : 'Electronics',
	    industry : 'Electronics Factory'
	  }
    },
    { name : 'toys',
      era: 6,
      requires: ['boards','plastics'],
      industry : 'toys factory',
      en: { name : 'Toys',
	    industry : 'Toys Factory'
	  }
    },
    { name : 'sports goods',
      era: 6,
      requires: ['aluminium'],
      industry : 'sports good manufacturer',
      en: { name : 'Sports Goods',
	    industry : 'Sports Good Manufacturer'
	  }
    },
    { name : 'toiletries',
      era: 6,
      requires: ['pottery','stainless steel'],
      industry : 'toiletries factory',
      en: { name : 'Toiletries',
	    industry : 'Toiletries Factory'
	  }
    },
    { name : 'pharmaceuticals',
      era: 6,
      requires: ['cemicals', 'plastics'],
      industry : 'pharmaceutical refinery',
      en: { name : 'Pharmaceuticals',
	    industry : 'Pharmaceutical Refinery'
	  }
    }])
