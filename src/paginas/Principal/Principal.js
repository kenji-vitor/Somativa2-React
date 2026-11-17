import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConnection';

class Principal extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      nome: '',
      sobrenome: '',
      dataNascimento: '',
      email: '',
      loading: true
    };
    this.logout = this.logout.bind(this);
  }


componentDidMount(){
  onAuthStateChanged(auth, async(user) => {
    if (user) {
      try{
        const docRef = doc(db,"usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
          const dados = docSnap.data();
          this.setState({
            user: true,
            nome: dados.nome,
            sobrenome: dados.sobrenome,
            dataNascimento: dados.dataNascimento,
            email: dados.email,
            loading: false
          });
        } else {
          console.log("Dado desse usuário não foi encontrado no Firestore ");
          this.setState({loading: false});
        }
      } catch(error){
        console.log("Erro ao buscar dados do usuário: ",error);
        this.setState({loading: false});
      }
    } else{
      window.location.href = '/login';
      this.setState({user: false, loading: false});
    }
  });
}

  async logout() {
    try {
      await signOut(auth);
      window.location.href = '/login';
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  }

  render(){
    const{
      user,
      nome,
      sobrenome,
      dataNascimento,
      email,
      loading
    } = this.state;
    if (loading){
      return <div style={{padding: '20px'}}>Carregando Dados do Usuário...</div>
    }

    return(
      <div style={{padding: '20px'}}>
        <h1>Principal</h1>

        {user ? (
          <div>
            <p>Aqui estão seus dados cadastrados: </p>
            <ul>
              <li><strong>Nome:</strong> {nome}</li>
              <li><strong>Sobrenome:</strong> {sobrenome}</li>
              <li><strong>Data de Nascimento:</strong> {dataNascimento}</li>
              <li><strong>Email:</strong> {email}</li>
            </ul>
            <br />
            <button onClick={this.logout}>Desconectar da Conta</button>
          </div>
        ) : (
          <div>
            <p>Deslogado.Logue para acessar seus dados.</p>
            <Link to="/login">Ir para o Login</Link> | <Link to="/cadastro">Cadastrar</Link>
          </div>
        )}
      </div>
    );
  }
}
export default Principal;