function saveOptions(e) {
    if (window.localStorage == null) {
        alert('Local storage is required for changing providers');
        return;
    }
    
    changeButtonText(e);
    window.localStorage.gmail = document.getElementById('gmail').checked;
    window.localStorage.salesforce = document.getElementById('salesforce').checked;
    window.localStorage.linkedin = document.getElementById('linkedin').checked;
}

function changeButtonText(e){
    e.target.innerText = 'Saved';
    setTimeout(function(){
        e.target.innerText = 'Save';
    }, 300);
}

function checkStorage() {
    if (window.localStorage == null) {
        alert('LocalStorage must be enabled for changing options.');
        document.getElementById('save').disabled = true;
        return;
    }

    if (window.localStorage.gmail == 'true'){
        document.getElementById('gmail').checked = true;
    }

    if (window.localStorage.linkedin == 'true'){
        document.getElementById('linkedin').checked = true;
    }

    if (window.localStorage.salesforce == 'true'){
        document.getElementById('salesforce').checked = true;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    checkStorage();
    document.querySelector('#save').addEventListener('click', saveOptions);
});
