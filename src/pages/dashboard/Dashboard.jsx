import React, { useState, useEffect, useCallback } from 'react'
import Card from '../../components/templates/Card'
import './Dashboard.css'
import api from '../../services/auth/authFirebase'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import crudLoja from '../../services/realtime/lojaCrudItens'

const Dashboard = props =>{
   
    const [ useItens, setItens ] = useState({
        itens: {},
        loading: true
    })
    
    const renderDash = useCallback( async () => {
        await crudLoja.readItem()        
            .then((snapshot) =>{
                const response = snapshot.val()
            
                setItens({
                    ...useItens,
                    itens: response,
                    loading: false,
                })

            })
            .catch(err => {
                return { message: 'Erro ao ler a lista', error: err}
            })
    }, [ useItens ])


    useEffect(() => {
        renderDash() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 
        
    useEffect(() => {
        const runTime = api.database().ref('/produtos/')

        const altDash = async () => {
            
        await runTime.once('child_changed')
            .then(snapshot => {
                return renderDash() 
            })
            .catch(err => {
                return { message: 'Erro ao atualizar as mudanças', error: err}
            })
        }

        runTime.once('value')
            .then(() => {
                return renderDash
            })
            .catch(err => {
                console.log(err)
            })
        
        altDash()
        
    },[renderDash, useItens])
    
    const { itens } = useItens
    
    if(useItens.loading){
        return <AiOutlineLoading3Quarters color="#FF5733" size={30} className="loadingSpinner"/>
    }
    else if(!useItens.itens){
        return <h2>Nenhum produto encontrado! </h2>
    }else{
        return(
            <ul className="listDisplay">
                {
                    Object.keys(useItens.itens).map((item) =>{
                        
                        return <Card key={itens[item].id}
                                    id={itens[item].id}
                                    nameProd={itens[item].name} 
                                    price={itens[item].price} 
                                    storage={itens[item].amount} 
                                    img={itens[item].image}
                                    />
                                    
                    })
                }
            </ul>
        )
    }
    
}

export default Dashboard