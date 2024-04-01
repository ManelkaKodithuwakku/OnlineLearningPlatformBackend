const { execSync } = require('child_process');
const axiosInstalled = checkModuleInstalled('axios');

if (!axiosInstalled) {
    console.log('axios is not installed. Installing...');
    try {
        execSync('npm install axios');
        console.log('axios has been successfully installed.');
    } catch (error) {
        console.error('Error installing axios:', error);
        process.exit(1); // Exit the script with error code 1
    }
}

// Now require axios
const axios = require('axios');

// Define API endpoint and user data
const API_URL = "http://localhost:8080/api/users/signup";
const USERNAME = "Admin";
const EMAIL = "admin@gmail.com";
const PASSWORD = "Admin@12345";
const IS_ADMIN = true;

// Define user object
const user = {
    username: USERNAME,
    email: EMAIL,
    password: PASSWORD,
    isAdmin: IS_ADMIN
};

// Make POST request to create admin user
axios.post(API_URL, user)
    .then(response => {
        console.log("Admin user created successfully:", response.data);
    })
    .catch(error => {
        console.error("Error creating admin user:", error.response.data);
    });

function checkModuleInstalled(moduleName) {
    try {
        require.resolve(moduleName);
        return true;
    } catch (error) {
        return false;
    }
}
