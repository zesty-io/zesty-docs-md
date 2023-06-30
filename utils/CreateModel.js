const axios = require("axios")
require("dotenv").config()

// instance zuid
const URL = `https://8-aaeffee09b-7w6v22.api.stage.zesty.io/v1/content/models`
const TOKEN = "3a50654f85e66438ff81caaa63eae5e5423b6f74"

const CreateModel = async ({ name }) => {
   const payload = {
      label: "darw",
      name: "darw",
      type: "templateset",
      description: "nullbcw222222222222222222222222",
      parentZUID: "7-acaabcc3ba-np46r2",
      listed: false,
   }

   const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
   }

   await axios
      .post(URL, payload, {
         headers: headers,
      })
      .then((response) => {
         console.log(response.data)
      })
      .catch((error) => {
         console.log(error.response.data)
      })
}

module.exports = CreateModel
