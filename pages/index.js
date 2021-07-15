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

export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    title: 'Eu odeio acorda cedo',
    image: 'https://via.placeholder.com/82x102.png/',
    id: new Date().toISOString(),
  }]);
  

  const usuarioAleatorio = 'igorcesarcode';
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]
  

  return (
    <>
      <AlurakutMenu />
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
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),

              }

              const cumunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(cumunidadesAtualizadas);
              


            }} >
            <div> 
                  <input 
                  placeholder="Qual qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual qual vai ser o nome da sua comunidade?" />                  
                </div>

                <div>
                  <input 
                  placeholder="Coloque uma Url para usamos de capa" 
                  name="image" 
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
            {
            <ul>
            {comunidades.map((itemAtual) => {
              return (
                <li  key={itemAtual.id}>
                  <a href={`/users/${itemAtual.title}`} key={itemAtual.id}>
                    {<img src={itemAtual.image} />}
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>              
            }
          </ProfileRelationsBoxWrapper>
          
          
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
