import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '50%' }} />
      
      <hr/>
        <p>
          <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
            @{propriedades.githubUser}
          </a>       
        </p>
        <hr/>


      <AlurakutProfileSidebarMenuDefault/>

    </Box>
  )
}




function ProfileRelationBox(propriedades){
  

  return (
  <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          
          {propriedades.title} ({propriedades.items.length})

        </h2>      
      {

      <ul>
          {/* {seguidores.map((itemAtual) => {
            return (
              <li  key={itemAtual.id}>
                <a href={`/users/${itemAtual.title}`} key={itemAtual.id}>
                  {<img src={`https://github.com/${itemAtual.image}.png`} />}
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          })
          } */}
      </ul>              
      }
  </ProfileRelationsBoxWrapper>    
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([]);
  

  const usuarioAleatorio = 'igorcesarcode';
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]
  

  //Pegar o array de dados do github


const [seguidores, setSeguidores] = React.useState([]);  

React.useEffect(function(){
   fetch('https://api.github.com/users/igorcesarcode/followers')
  .then(function (respostaDoServidor){
    return respostaDoServidor.json();
  })
  .then(function(responstaCompleta){
    setSeguidores(responstaCompleta);

  })  


  fetch('https://graphql.datocms.com/',{
    method: 'POST',
    headers: {
      'Authorization': '56290e3c3130b629a12f9ac08120e6',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ "query": `query{
      allCommunities {
        id
        title
        imageUrl
        urlCanal
        creatorSlug
      }
    }` })
  })
  .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
  .then((respostaCompleta) => {
    const comunidadesVindasDoDado = respostaCompleta.data.allCommunities;
    setComunidades(comunidadesVindasDoDado);
    console.log(comunidadesVindasDoDado);
  })
},[])



  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
          
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) @{usuarioAleatorio}
            </h1>

            <OrkutNostalgicIconSet />
          
          </Box>

          <Box>
            <h2 className="subTitle">Oque voce desaja fazer?</h2>

            <form onSubmit={function handleCriarComunidade(evento){
              evento.preventDefault();
              const dadosDoForm = new FormData(evento.target);

              const comunidade = {
                
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: usuarioAleatorio,
                urlCanal: dadosDoForm.get('urlCanal')

              }

              fetch('/api/comunidades',{
                method:'POST',
                headers:{
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify(comunidade)
              })
              .then(async (response)=> {
                const dados = await response.json();
                console.log(dados);
                const comunidade = dados.registroCriado;
                const cumunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(cumunidadesAtualizadas);                
              })


              


            }} >
            <div> 
                  <input 
                  placeholder="Qual o nome do canal?" 
                  name="title" 
                  aria-label="Qual o nome do canal?" />                  
                </div>

                <div>
                  <input 
                  placeholder="Coloque uma Url para usamos de capa" 
                  name="image" 
                  aria-label="Coloque uma Url para usamos de capa" />                  
                </div>    

                <div>
                  <input 
                  placeholder="Coloque do canal" 
                  name="urlCanal" 
                  aria-label="Coloque uma Url para usamos de capa" />                  
                </div> 
                <button>
                  Criar uma comunidade  
                </button>          
            </form>
          </Box>

        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          
          
          <ProfileRelationsBoxWrapper>
           
           <h2 className="subTitle">Devs do Youtube ({comunidades.length}) </h2>
            {
            
            <ul>
            {comunidades.map((itemAtual) => {
              return (
                <li  key={itemAtual.id}>
                  <a href={`${itemAtual.urlCanal}`} key={itemAtual.id}>
                    {<img src={itemAtual.imageUrl} />}
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>              
            }
          </ProfileRelationsBoxWrapper>
          
          <ProfileRelationBox title={"Seguidores"} items={seguidores} />



          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li  key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
        
      </MainGrid>
    </>
  )
}
