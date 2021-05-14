const path = require("path");
const storage = require('electron-json-storage')
const fs = require('fs');
const getIcon = require("../Icon/icon");

const changeSidebar = newElement => {
    const sidebarElement = document.body.querySelector(".sidebar");
    sidebarElement.parentElement.replaceChild(newElement, sidebarElement);
}

const Sidebar = (callback) => {
    const iconJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../", "config/icon.json")));
    // Functions to get favorites element
    const favoritesElement = favorites => {
        let result = ""
        for(const favorite of favorites){
            result += `<span><img src="${getIcon('sidebar', favorite)}" alt="${favorite} icon"> ${favorite}</span>`
        }
        return result;
    }

    storage.get('sidebar', (err, data) => {
        let _favorites = ['Home', 'Desktop', 'Documents', 'Downloads', 'Pictures', 'Music', 'Pictures', 'Videos']
        // If user has no preference sidebar item
        if(!data || !Object.keys(data).length || !data.favorites.length){
            storage.set('sidebar', {favorites: _favorites})
        }
        else{
            _favorites = data.favorites
        }
        let sidebarElement = document.createElement("div");
        sidebarElement.classList.add("sidebar")
        sidebarElement.innerHTML =  `
        <span class="xplorer-brand">Xplorer</span>
        <div class="sidebar-nav">
            <div class="sidebar-nav-item">
                <span class="sidebar-nav-item-dropdown-btn"><img src="${getIcon('sidebar', 'Favorites')}" alt="Favorites icon"> Favorites</span>
                <div class="sidebar-nav-item-dropdown-container">
                    ${favoritesElement(_favorites)}
                </div>
            </div>
        </div>
        <div class="sidebar-setting-btn">
            <img src="${getIcon('sidebar', 'setting')}" alt="Setting icon" class="sidebar-setting-btn-icon">
            <span class="sidebar-setting-btn-text">Settings</span>
        </div>`
        callback(sidebarElement)
    })
}

module.exports = {changeSidebar, Sidebar}