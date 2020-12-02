//arayüz işlemlerini yapacağız
class UI{
    constructor(){
        this.profilediv=document.getElementById("profile");
        this.cardBody=document.getElementsByClassName("card-body")[0];
        this.repoDiv=document.getElementById("repos");
        this.lastUsers=document.getElementById("last-users");
        this.inputFiled=document.getElementById("githubname");
    }

    clearInput(){
        this.inputFiled.value="";
    }

    showuserInfo(user){//repo ve user geliyodu ben userimi gönderdim buraya app.js'den userın içinden bu bu bunları al diyeceğiz
        this.profilediv.innerHTML=`
          <div class="card card-body mb-3">
                    <div class="row">
                      <div class="col-md-4">
                        <a href="${user.html_url}" target = "_blank">
                         <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
                         <hr>
                         <div id="fullName"><strong>${user.name}</strong></div>
                         <hr>
                         <div id="bio">${user.bio}</div>
                        </div>
                        <div class="col-md-8">
                        <button class="btn btn-secondary">
                              Takipçi  <span class="badge badge-light">${user.followers}</span>
                        </button>
                        <button class="btn btn-info">
                             Takip Edilen  <span class="badge badge-light">${user.following}</span>
                          </button>
                        <button class="btn btn-danger">
                            Repolar  <span class="badge badge-light">${user.public_repos}</span>
                        </button>
                        <hr>
                        <li class="list-group">
                            <li class="list-group-item borderzero">
                                <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                                
                            </li>
                            <li class="list-group-item borderzero">
                                <img src="images/location.png" width="30px"> <span id = "location">${user.location}</a>
                                
                            </li>
                            <li class="list-group-item borderzero">
                                <img src="images/mail.png" width="30px"> <span id="mail">${user.email}</span>
                                
                            </li>
                            
                        </div>
                           
                        
                  </div>
            </div>
        `;
    }

    showError(message){
        const div=document.createElement("div");//div oluşturdum
        div.className="alert alert-danger";//clasına <<
        div.textContent=message;//gönderilen mesaj
        this.cardBody.appendChild(div);//divi cardbodynin en sonuna ekledim

        setTimeout(() => {//2 saniye sonra bu divi kaldır
            div.remove();
        }, 2000);
    }

    showrepoInfo(repos){
        this.repoDiv.innerHTML="";//daha önceden bilgi kaldıysa temizledim
        repos.forEach(element => {
            //+= koydumki her bir repo eklensin, bilirsin. `` template litrela yani back tickimi açıyorum
            this.repoDiv.innerHTML +=`
            <div class="mb-2 card-body">
                    <div class="row">
                        <div class="col-md-2">
                        <a href="${element.html_url}" target = "_blank" id = "repoName">${element.name}</a>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-secondary">
                                Starlar  <span class="badge badge-light" id="repoStar">${element.stargazers_count}</span>
                            </button>

                            <button class="btn btn-info">
                                Forklar  <span class="badge badge-light" id ="repoFork">${element.forks_count}</span>
                            </button>
                    
                        </div>
                </div>
                </div>
            `;
        });
    }

    addSearchedUserToUI(username){
        let users=Storage.getSearchedUsersFromStorage();
        if (users.indexOf(username)===-1) {
            const li=document.createElement("li");
            li.className="list-group-item";
            li.textContent=username;
            this.lastUsers.appendChild(li);

        }
    }
/* 
1.
2.
3.
*/
    clearAllSearchedFromUI(){
        while (this.lastUsers.firstChild!==null) {//bu elementin bir çocuğu elemanı varmı. 1. çocuk varsa ilk çocuk gider sonra 2. sonra 3.
            this.lastUsers.removeChild(this.lastUsers.firstElementChild);
        }
    }

}