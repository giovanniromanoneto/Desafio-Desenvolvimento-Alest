import { firebase } from '../config/firebase';
import { useAuth } from '../auth/useAuth';

import React, { useEffect, useState } from 'react';
import {useHistory } from 'react-router-dom'

import '../styles/inicio.css'

import edit from '../assets/editImage.png';
import del from '../assets/deleteImage.png';
import logoGoogle from '../assets/logoGoogle.png';
import add from '../assets/addImage.png';

export function Inicio() {
    const db = firebase.firestore();
    const [listProd, setListProd] = useState([]);
    const { user, signInWithGoogle } = useAuth();
    const history = useHistory();

    useEffect(() => {
        let prod = [];
        db.collection('produtos').get().then(res => {
            res.docs.forEach(doc => {
                prod.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    preco: doc.data().preco,
                    img: doc.data().imagem,
                })
            })
            setListProd(prod)
        }).catch(function (err) {
            console.log('Erro ao listar produtos' + err)
        })

    })

    async function handleLogin() {
        if (!user) {
            signInWithGoogle()
        }
    }

    function handleDeleteProd(id) {
        db.collection('produtos').doc(id).delete().then(() => {
            console.log('Sucesso ao deletar o produto')
        }).catch((erro) => {
            console.log('Erro ao deletar produto')
        })
    }

    function handleNewProd(){
        history.push('/produto')
    }

    function handleAlterProd(id){
        history.push(`/produto/${id}`)
    }

    function handleLogOut(){
        firebase.auth().signOut()
        window.location.reload()
    }

    return (
        <>
            <header className="cabecalho"> {
                user ? (
                    <>
                        <div className="divBotaoAdd">
                            <button onClick={handleNewProd} className="botaoAddProduto"><img className="imgBotaoAdd" src={add} alt="Imagem do simbolo de soma" />Adicionar Produto</button>
                        </div>
                        <p className="tituloPaginaLogada">Produtos</p>
                        <div className="infoUsuario">
                            <img className="imgPerfilUser" src={user.avatar} alt="Foto de perfil do usuário" />
                            <span className="nomeUser">{user.name}</span>
                            <button className="botaoSair" onClick={handleLogOut}>Sair</button>
                        </div>
                    </>
                ) : (
                    <>
                    <p className="tituloPagina">Produtos</p>
                    <p>Para editar os produtos  <button onClick={handleLogin} className="botaoLogin"> <img className="imgBotao" src={logoGoogle} alt="Logo Google"/>Faça Login</button></p>
                    </>
                )
            }</header>
            <div className="content">
                {listProd.map(produto => {
                    return (
                        <div className>
                            <div className='boxProd'>
                                <p className="nomeProd">{produto.nome}</p>
                                <img className="imgProd" src={produto.img} alt={"Imagem do Produto"} />
                                <p className="precoProd">R$ {produto.preco}</p>
                                <div className="opcoes">
                                    {user && <input className="editImg" type="image" src={edit} onClick={()=> handleAlterProd(produto.id)} alt="Imagem de um lapis"/>}
                                    {user && <input className="delImg" type="image" src={del} onClick={() => handleDeleteProd(produto.id)} alt="Imagem de uma lata de lixo" />}
                                </div>
                            </div>

                        </div>
                    )

                })}

            </div>
        </>
    )


}