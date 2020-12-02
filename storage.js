// veri depolama işlemlerini yapacağız
class Storage{
    static getSearchedUsersFromStorage(){//tüm kullanıcıları alır
        let users;
        if (localStorage.getItem("searched")===null) {
            users=[];
        }
        else{//searchd şeklinde keyim varsa ona karşılık gelen değerleri alıp json parsla arraye çevireceğim
            users=JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }

    static addSearchedUsersToStorage(username){//sorgulanmış kullanıcıları storage ekle
        let users=this.getSearchedUsersFromStorage();
        //ındexOf ile username sorgularsak ve bize -1 gelirse o değer yok demektir.
        if (users.indexOf(username)===-1) {
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
        //searched keyimize users'ı gönderiyoruz.Zaten usersin içine arraylari atmıştık
    }

    static clearAllSearchedUsersFromStorage(){//tüm kullanıcıları sil
        localStorage.removeItem("searched");
    }
}