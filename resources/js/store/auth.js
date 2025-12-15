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

        // 🔑 Get saved login token from browser storage
        // If token exists, user is already logged in
        this.token = localStorage.getItem('token');

        // 👤 Get saved user information
        // JSON.parse converts string back to an object
        const userData = localStorage.getItem('user');
        this.user = userData ? JSON.parse(userData) : null;

        // 📋 Get saved permissions (menus + actions)
        // If none exist, use an empty array
        const perms = localStorage.getItem('permissions');
        this.permissions = perms ? JSON.parse(perms) : [];

        // 📌 menus holds all permission records
        // This makes sure menus is ALWAYS defined
        this.menus = this.permissions;

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
    login(token, user, permissions) {

        // 💾 Save login data in browser storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('permissions', JSON.stringify(permissions));

        // 🔗 Attach token to axios for API requests
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + token;

        // 🔄 Update class variables
        this.token = token;
        this.user = user;
        this.permissions = permissions;
        this.menus = permissions;
    }

    /**
     * Check if user is logged in
     * Returns true or false
     */
    check() {
        return !!this.token;
    }

    /**
     * 🔐 Detect current menu using browser URL
     * Example:
     * /users → users menu
     */
    getCurrentMenu() {
        const path = window.location.pathname;

        // Find menu that matches current route
        return this.menus.find(m => m.menu_link === path);
    }

    /**
     * 🔐 Check permission for CURRENT page
     * Example usage:
     * Auth.hasPermission('menu_add')
     */
    hasPermission(action) {

        // Get the menu linked to the current page
        const menu = this.getCurrentMenu();

        // Allow only if permission value is 1
        return menu ? menu[action] === 1 : false;
    }

    /**
     * 🔐 Check permission for a SPECIFIC menu
     * Example:
     * Auth.hasPermissionFor('users', 'menu_edit')
     */
    hasPermissionFor(menuName, action) {

        // Find menu by name (case-insensitive)
        const menu = this.menus.find(
            m => m.menu_name.toLowerCase() === menuName.toLowerCase()
        );

        return menu ? menu[action] === 1 : false;
    }

    /**
     * 🔐 Check if a menu should be visible
     * Useful for sidebar navigation
     */
    hasMenuByLink(menuLink) {

        // Returns true if user has access to menu link
        return this.menus.some(m => m.menu_link === menuLink);
    }

    /**
     * Get all menus user has permission for
     */
    getMenus() {
        return this.menus;
    }

    /**
     * Logout user completely
     * Clears all saved data
     */
    logout() {

        // 🧹 Remove everything from browser storage
        localStorage.clear();

        // ❌ Remove token from axios headers
        delete axios.defaults.headers.common['Authorization'];

        // 🔄 Reset class variables
        this.token = null;
        this.user = null;
        this.permissions = [];
        this.menus = [];
    }
}

// Export a SINGLE shared instance
// This allows the same auth state everywhere
export default new Auth();
