import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConnection';

class Cadastro extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: '',
      nome: '',
      sobrenome: '',
      dataNascimento: ''
    };
    this.cadastrar = this.cadastrar.bind(this);
  }


async cadastrar(e) {
    e.preventDefault();
    const {
      email, 
      senha,
      nome, 
      sobrenome, 
      dataNascimento} = this.state;
    try {
      const dadosUsuario = await createUserWithEmailAndPassword(auth, email, senha);
      const user = dadosUsuario.user;
      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid, 
        nome: nome,
        sobrenome: sobrenome,
        dataNascimento: dataNascimento,
        email: email
      });
      alert('Usuário cadastrado com sucesso!');
      window.location.href = '/login'
      this.setState({
        email: '',
        senha: '',
        nome: '',
        sobrenome: '',
        dataNascimento: ''
      });
    } catch (error) {
      alert('Erro ao cadastrar: ' + error.message);
    }
  }

render(){
  return(
    <div style={{ padding: '20px' }}>
      <h1> Cadastro </h1>
      <form onSubmit={this.cadastrar}>
          <div>
            <label>E-mail: </label><br />
            <input
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              required
            />
          </div>
          <br />
          <div>
            <label>Senha: </label><br />
            <input
              type="password"
              value={this.state.senha}
              onChange={(e) => this.setState({ senha: e.target.value })}
              required
            />
          </div>
          <br />
          <div>
            <label>Nome: </label><br />
            <input
              type="text"
              value={this.state.nome}
              onChange={(e) => this.setState({ nome: e.target.value })}
              required
            />
          </div>
          <br />
          <div>
            <label>Sobrenome: </label><br />
            <input
              type="text"
              value={this.state.sobrenome}
              onChange={(e) => this.setState({ sobrenome: e.target.value })}
              required
            />
          </div>
          <br />
          <div>
            <label>Data de Nascimento: </label><br />
            <input
              type="date"
              value={this.state.dataNascimento}
              onChange={(e) => this.setState({ dataNascimento: e.target.value })}
              required
            />
          </div>
          <br />

          <button type="submit">Cadastrar</button>
        </form>
        <br />
        <Link to="/login"> Ir para o Login</Link>
      </div>
  


    );
  }
}

export default Cadastro;