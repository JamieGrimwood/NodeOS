const db = require("quick.db");

let sources
db.add("nam.sources", "it works")

module.exports = {
    no_params: 'Unknown command, please type "nam help" for a list of commands.',
    invalid_parameters: "Invalid parameters, please type \"nam help\" for a list of commands.",

    help: async() => {
        console.log("Install an addon:");
    },
    
    install: async(params) => {
        sources = db.get("nam.sources")
        console.log(params[0])
    }
}