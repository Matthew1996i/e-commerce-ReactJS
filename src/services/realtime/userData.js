import firebaseService from "../auth/authFirebase"

class UserData {
    async readItem(){
        const runTime = await firebaseService.database().ref('/usuario/')

        return await runTime.once('value')
    }
}