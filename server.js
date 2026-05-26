const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.post("/login", async (req, res) => {

  const { name, mobile } = req.body;

  if(!name || !mobile){

    return res.json({
      success:false,
      message:"Please fill all fields"
    });

  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("name", name)
    .eq("mobile", mobile);

  if(error){

    return res.json({
      success:false,
      message:error.message
    });

  }

  if(data.length > 0){

    return res.json({
      success:true,
      message:"Login Successful"
    });

  } else {

    return res.json({
      success:false,
      message:"Invalid Username or Mobile Number"
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Server Running on ${PORT}`);

});
