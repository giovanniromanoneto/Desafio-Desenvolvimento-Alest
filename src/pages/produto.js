import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {useHistory } from 'react-router-dom'

import {firebase} from '../config/firebase';

import '../styles/produto.css'

export function Produto({match}){
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState();
    const [img, setImg] = useState("");
    const [carregando, setCarregando] = useState(0);
    const [mensagem, setMensagem] = useState();
    const db = firebase.firestore();
    const history = useHistory();

    useEffect(() => {
        if(match.params.idProduto){
            db.collection('produtos').doc(match.params.idProduto).get().then(result =>{
                setNome(result.data().nome);
                setPreco(result.data().preco);
                setImg(result.data().imagem);
            })
        }
    }, [carregando, match.params.idProduto])

    function atualizar(){
        setCarregando(1)
        setMensagem(null)

        db.collection('produtos').doc(match.params.idProduto).update({
            nome: nome,
            preco: preco,
            imagem: img
        }).then(() =>{
            setMensagem('altOk');
            setCarregando(0);
        }).catch(erro =>{
            setMensagem('altErro');
            setCarregando(0);
        })
    }

    function cadastrar(){
        setCarregando(1);

        db.collection('produtos').add({
            nome: nome,
            preco: preco,
            imagem: img
        }).then(() =>{
            setMensagem('cadOk');
            setCarregando(0);
        }).catch(erro =>{
            setMensagem('cadErro');
            setCarregando(0);
        })
    }

    function handleVoltar(){
        history.push('/')
    }

    return(
        <div className="conteiner">
            <div className="tituloPag">
                <p>{match.params.idProduto ? 'Editar Produto' : 'Cadastrar Produto'}</p>
            </div>
            <div>
                <form className="formulario">
                    
                   <div className="divNome">
                        <label>Nome: </label>
                        <input className="inputNome" onChange={(evento) => setNome(evento.target.value)} type="text" value={nome}/>
                    </div> 
                    <div className="divPreco">
                        <label>Preco: </label>
                        <input className="inputPreco" onChange={(evento) => setPreco(evento.target.valueAsNumber)} type="number" value={preco}/>
                    </div> 
                    <div className="divImg">
                        <label>URL da imagem desejada: </label>
                        <input className="inputImg" onChange={(evento) => setImg(evento.target.value)} type="text" value={img}/>
                    </div> 

                    <div className="mensagem">
                        {mensagem === 'altOk' && <span>Produto alterado com sucesso!</span>}
                        {mensagem === 'altErro' && <span>Erro na alteração do produto</span>}
                        {mensagem === 'cadOk'&& <span>Produto cadastrado com sucesso!</span>}
                        {mensagem === 'cadErro'&& <span>Erro no cadastro do produto</span>}
                    </div>

                    <button className="botaoVoltar" onClick={handleVoltar}>Voltar</button>

                    {carregando ? <Spinner animation="border" variant="sucess" role="status"></Spinner>
                    : <button onClick={match.params.idProduto ? atualizar : cadastrar} type="button" className="botaoFinalizar">{match.params.idProduto ? 'Atualizar' : 'Cadastrar'}</button>}
                </form>
            </div>
        </div>
    )

}