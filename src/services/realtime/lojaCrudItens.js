import firebaseService from "../auth/authFirebase"

class Database{
    
    newItem(name, price, amount, imageReference){
        const itemData = {
            id: Date.now(),
            name: name,
            price: price,
            image: imageReference,
            amount: amount,
        }
        
        const itemId = itemData.id
        
        const updates = {}

        updates['/produtos/' + itemId] = itemData

        const itemRef = firebaseService.database().ref()

        itemRef.update(updates)
            .then(()=> {
                return {success: true, message: 'Produto Cadastrado'}
            })
            .catch(err => {
                return { success: false, message: `Erro ao criar o produto: ${err.message}` }
            })
    }

    async readItem(){
        const runTime = await firebaseService.database().ref('/produtos/')

        return await runTime.once('value')
    }

    deleteImg(image){
            
        const storage = firebaseService.storage().refFromURL(image)
        
        storage.delete()
        .then(() => {
            return {success: true, message: 'Imagem Excluida com Sucesso'}
        })
        .catch((err) => {
            return { success: false, message: `Erro ao excluir a Imagem: ${err.message}` }
        })
    }
    
    updateItem(id, name, price, amount, newImage){
        const itemData = {
            id,
            name: name,
            price: price,
            image: newImage,
            amount: amount,
        }

        const itemId = itemData.id
        
        const updates = {}

        updates['/produtos/' + itemId] = itemData

        
        const itemRef = firebaseService.database().ref()

        itemRef.update(updates)
            .then(()=> {
                return { success: true, message: 'Produto Cadastrado' }
            })
            .catch(err => {
                return { success: false, message: `Erro ao criar o produto: ${err.message}` }
            })
    }

    async deleteItem(id, storageRef){
        
        const itemRef = firebaseService.database().ref('/produtos/' + id)
        const storage = firebaseService.storage().refFromURL(storageRef)

        storage.delete()
            .then(() => {
                return {success: true, message: 'Imagem Excluida com Sucesso'}
            })
            .catch((err) => {
                return { success: false, message: `Erro ao excluir a Imagem: ${err.message}` }
            })

        itemRef.remove()
            .then(() => {
                return {success: true, message: 'Produto excluido'}
            })
            .catch(err => {
                return { success: false, message: `Erro ao excluir o produto: ${err.message}` }
            })



    }

    
    
}

export default new Database()