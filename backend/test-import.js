try {
    const User = require("./models/User");
    console.log("User model loaded successfully:", User);
  } catch (error) {
    console.error("Error loading User model:", error.message);
  }
  