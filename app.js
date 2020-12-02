//Elementleri seçme

const githubForm=document.getElementById("github-form");
const nameInput=document.getElementById("githubname");
const lastUsers=document.getElementById("last-users");
const clearLastUsers=document.getElementById("clear-last-users");
const github=new Github();
const ui=new UI();

eventListeners();
function eventListeners(){
githubForm.addEventListener("submit",getData);
clearLastUsers.addEventListener("click",clearAllSearched);
document.addEventListener("DOMContentLoaded",getAllSearched);//sayfa yenilendikce son aramaları alıp yazdırıcaz
}

function getData(e){
    let username=nameInput.value.trim();
    if(username===""){
        alert("Lütfen geçerli bir kullanıcı adı giriniz");
    }
    else{
        github.getGithubData(username)//gönderdim. Fonksiyon aync olarak yazıldığı için ve bana bir obje göndüreceği için yakalamamız gekeriyor
        .then(response=>{
            if(response.user.message==="Not Found"){//saçma sapan bir user girilirse repo ve user bilgilerinde message alanı not found olarak gelir.O yüzden böyle yazıp yakalıyoruz
                //hatamesaj
                ui.showError("Kullanıcı Bulanamadı");
                console.log("Hata");
            }
            else
            {
                ui.addSearchedUserToUI(username);//storageden önce yazdım olanı getiriyo ekleyip anında yazdıramaz
                Storage.addSearchedUsersToStorage(username);
                ui.showuserInfo(response.user);//responsede repo ve user geliyodu ben userimi gönderdim
                ui.showrepoInfo(response.repo);
            }
        })
        .catch(err=>ui.showError(err));
    }
    ui.clearInput();//input temizleme
    e.preventDefault();//sayfa yenilenmesini önledim;
}

function clearAllSearched(){//Tüm arananları temizler
    if (confirm("Eminmisiniz?")) {
        //silme
        console.log("Silme");
        Storage.clearAllSearchedUsersFromStorage();//STORAGEDEN TEMİZLER
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched(){//arananları storageden alır ui ekler
    let users=Storage.getSearchedUsersFromStorage();
    let result="";//farklı bir yöntemden gidelim
    users.forEach(element => {//her bir useri alıp resulta ekleriz
        result +=`
         <li class="list-group-item">${element}</li> 
        `;
    });
    lastUsers.innerHTML=result;
}