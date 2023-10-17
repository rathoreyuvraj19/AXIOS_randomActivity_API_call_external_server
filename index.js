import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body.type);
  let activity = req.body.type;
  let participants = req.body.people;
  try {
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${activity}&participants=${participants}`
    );
    const result = response.data;
    console.log(activity, participants);
    console.log(result[Math.floor(Math.random() * result.length)]);
    res.render("index.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
