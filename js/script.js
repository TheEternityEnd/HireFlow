let profileMenu = document.getElementById("profileMenu");

function toggleMenu() {
    profileMenu.classList.toggle("open-menu");
}

let moreLink = document.getElementById("showMoreLink");
let sideActivity = document.getElementById("sidebarActivity");

function toggleActivity() {
    sideActivity.classList.toggle("open-activity");
    if(sideActivity.classList.contains("open-activity")){
        moreLink.innerHTML = 'Show Less <b>^</b>';
    }
    else{
        moreLink.innerHTML = 'Show More <b>v</b>';
    }
}



