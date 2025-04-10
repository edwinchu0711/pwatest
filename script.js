var currentHeight = 0 ;
var In_menulist = false ;
var list_opening = false ;

function pageload() {
    menuList();
    
    menu_detect();

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
              console.log('ServiceWorker 註冊成功:', registration.scope);
            })
            .catch(error => {
              console.log('ServiceWorker 註冊失敗:', error);
            });
        });
      }
      
      



}

function menuList(){ // 此function可以使滑鼠滑到menu按鈕時會延伸出更多list
    var menu_list = document.querySelectorAll(".menu-list");
    var menu_button = document.getElementById("menu-button");
    var buttonWidth = parseFloat(window.getComputedStyle(menu_button).width); //取得menu button 的寬
    var buttonHeight = parseFloat(window.getComputedStyle(menu_button).height); //取得menu button 的高
    
    menu_list.forEach(element => {
        var elementWidth = parseFloat(window.getComputedStyle(element).width);
        if (elementWidth < buttonWidth){
        element.style.width = buttonWidth; //設定每個list的寬和menu button一樣高
        
        }
        element.style.marginTop = parseInt(buttonHeight) + "px"; //設定list 的預設位置在menu底下 利用marginTop
        
       
    });
}


function menuList_ani(){ //將menu_List 打開
    var menu_list = document.getElementById("menu-list");
    menu_list.classList.add('show');
}

function re_menuList_ani(){ //將menu_List 收起
    var menu_list = document.getElementById("menu-list");
    menu_list.classList.remove('show');
}

function menu_detect(){ //偵測滑鼠
    var menu_area = document.getElementById("menu-button");
    var menu_button= document.getElementById("menu-button-area"); 
    menu_button.addEventListener("mouseover", menuList_ani ); 
    menu_area.addEventListener("mouseenter", menuList_ani);
    menu_button.addEventListener("mouseleave", re_menuList_ani);
    menu_area.addEventListener("mouseleave", re_menuList_ani);
}



window.onload = pageload ;