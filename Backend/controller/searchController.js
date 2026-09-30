const {searchService} = require("../service/searchService")

const handleSearch = async (req,res)=>{
    const testName = await req.query.test_name;
    const pincode =  await req.query.pincode;
    const result = searchService(testName,pincode);
    console.log(result);
    return res.status(200).json(result);
    
}

module.exports = {handleSearch}