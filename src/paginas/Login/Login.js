import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConnection';

class Login extends Component {
 constructor(props){
  super(props);
  this.state = {
    email: '',
    senha: ''
  };
  this.logar = this.logar.bind(this)
 }

 async logar(e){
  e.preventDefault();

  const{
    email,
    senha
  } = this.state;
  try{
    await signInWithEmailAndPassword(auth,email,senha);
    window.location.href = '/'; //Manda para a página principal caso dê certo
  } catch(error){
      this.setState({erro : 'Usuário não cadastrado ou senha incorreta.'})

  }
 }
 render(){
  return(
    <div style={{ padding: '20px'}}>
      <h1>Login</h1>
        
        <form onSubmit={this.logar}>
          <label>E-mail</label><br />
          <input
            type="email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            required
          /><br /><br />
          <label>Senha</label><br />
          <input
            type="password"
            value={this.state.senha}
            onChange={(e) => this.setState({ senha: e.target.value })}
            required
          /><br /><br />
          {this.state.erro && <p style={{ color: 'red' }}>{this.state.erro}</p>}
          <button type="submit">Acessar</button>
      </form>
      <br />
        <Link to="/cadastro">Não Possui Conta? Cadastre-se</Link>
    </div>
  );
 }
}

export default Login;