//burada sadece github get reguest işlemi gerçekleştireceğiz ve aldığımızı promise yapısı ile döndüreceğiz
class Github{

    constructor(){
        this.url="https://api.github.com/users/";
    }

    async getGithubData(username){//bu app.js'den gelir 
        const responseUser=await fetch(this.url+username);//buradan response döner ve bura resolv eettiğinde bizim respon objemiz burada usernamede olacak
        const responseRepo=await fetch(this.url+username+"/repos");

        const userData=await responseUser.json();
        const repoData=await responseRepo.json();

        return{
            user:userData,
            repo:repoData
        }
    }

}