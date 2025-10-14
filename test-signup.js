const signupData = {
  name: "Test Admin",
  email: "test@example.com",
  phone: "1234567890",
  password: "password123",
  restaurantName: "Test Restaurant",
};

fetch("http://localhost:3004/api/auth/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(signupData),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Signup response:", data);
  })
  .catch((error) => {
    console.error("Signup error:", error);
  });
