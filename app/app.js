setTimeout(function(){ 
    console.log('eva.js started!');
    var banner = document.querySelector('[role="banner"]');
    var banner_fc = banner.firstChild;
    var banner_fg = banner_fc.firstChild;
    var banner_fgg = banner_fg.firstChild;
    var banner_lggg = banner_fgg.lastChild;
    var eva_banner = document.createElement('div');
    var eva_container = document.createElement('div');
    var eva_button = document.createElement('a');
    
    banner_lggg.appendChild(eva_banner);
    eva_banner.appendChild(eva_container);
    eva_container.appendChild(eva_button);
    
    eva_banner.className = 'gb_fa gb_Wc gb_R';
    eva_container.className = 'gb_Dc gb_eva_bg';
    
    eva_button.setAttribute('class', 'gb_b gb_eva');
    eva_button.setAttribute('href', 'https://www.evabot.ai/');  
    eva_button.setAttribute('title', 'eva');
    eva_button.setAttribute('tabindex', '0');
    eva_button.setAttribute('role', 'button');
    
    console.log(banner_lggg);
    console.log(document.querySelector('[role="banner"]'));
}, 7000);