import firebaseService from "./authFirebase"

class Auth{

    constructor(){
        this.fireAuth = firebaseService.auth()
        this.TOKEN_KEY = '@user-token'
        this.ADMIN_TOKEN = '@user-uid'

        this.isAdmin = this.isAdmin.bind(this)
    }

    getToken(){
        return sessionStorage.getItem(this.TOKEN_KEY)
    }

    async login(email, senha){

        await this.fireAuth.signInWithEmailAndPassword(email, senha)
        const token = await this.fireAuth.currentUser.getIdToken()
        sessionStorage.setItem(this.TOKEN_KEY, token)
        const userID = await this.fireAuth.currentUser
        sessionStorage.setItem(this.ADMIN_TOKEN, userID.uid)
    }

    isAdmin(){
        const userToken = sessionStorage.getItem('@user-uid')
        const tokenAdmin = 'TOKEN ADMIN' //Token gerado pelo cadastro de usuario no firebase

        const isAdmin = userToken === tokenAdmin ? true : false

        return isAdmin
    }

}

export default new Auth()
