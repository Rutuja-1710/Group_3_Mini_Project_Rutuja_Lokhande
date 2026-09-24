const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "visits.json");


const excludedRoutes = ["/visits"];

const visitCounter = (req, res, next) => {
  
  if (req.method !== "GET" || excludedRoutes.includes(req.path)) {
    return next();
  }

 
  if (req.path === "/favicon.ico") {
    return next();
  }

  try {
    let data = { totalVisits: 0, routes: {} };

    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      if (fileContent.trim()) {
        data = JSON.parse(fileContent);
      }
    }

    
    data.totalVisits += 1;

   
    data.routes[req.path] = (data.routes[req.path] || 0) + 1;

   
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error updating visit counts:", error.message);
  }

  next();
};

module.exports = visitCounter;