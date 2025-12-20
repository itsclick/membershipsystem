import axios from 'axios';

/**
 * Auth class
 * -------------
 * This class handles:
 * - Saving login details
 * - Storing user permissions
 * - Checking what a user is allowed to do
 * - Logging out
 */
class Auth {

    /**
     * This constructor runs automatically
     * when the app loads or refreshes
     */
    constructor() {

        //  Get saved login token from browser storage
        // If token exists, user is already logged in
        this.token = localStorage.getItem('token');

        //  Get saved user information
        // JSON.parse converts string back to an object
        const userData = localStorage.getItem('user');
        this.user = userData ? JSON.parse(userData) : null;

        //  Get saved permissions (menus + actions)
        // If none exist, use an empty array
        const perms = localStorage.getItem('permissions');
        this.permissions = perms ? JSON.parse(perms) : [];

       

        // 🔗 If token exists, attach it to axios
        // So every API request knows the logged-in user
        if (this.token) {
            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + this.token;
        }
    }

    /**
     * Called AFTER successful login
     * Saves user data and permissions
     */
    login(token, user) {

        //  Save login data in browser storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
       

        //  Attach token to axios for API requests
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + token;

        // Update class variables
        this.token = token;
        this.user = user;
        // this.permissions = permissions;
        // this.menus = permissions;
    }

    /**
     * Check if user is logged in
     * Returns true or false
     */
    check() {
        return !!this.token;
    }

    
    
    logout() {

        // 🧹 Remove everything from browser storage
        localStorage.clear();

        //  Remove token from axios headers
        delete axios.defaults.headers.common['Authorization'];

        //  Reset class variables
        this.token = null;
        this.user = null;
        this.permissions = [];
        this.menus = [];
    }
}

// Export a SINGLE shared instance
// This allows the same auth state everywhere
export default new Auth();
