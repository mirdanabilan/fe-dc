export default function authHeader() {

    // ngambil user kedalem local storage
    const userStr = localStorage.getItem("user");
    
    // intial state user
    let user = null;

    // ngecek userStr nya ada isinya atau engga
    if(userStr) {
        user = JSON.parse(userStr);

    } 

    // ngecek user untuk ngambil format authorization
    if (user && user.Token) {
        return {'Authorization' : 'Bearer ' + user.Token};
    } else {
        return {'Authorization' : ''};
    }
}