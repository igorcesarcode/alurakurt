import { SiteClient } from 'datocms-client';

export default async function recedordeRequests(request,response) {
    const TOKEN = 'You TOKEN API';
    const client = new SiteClient(TOKEN);

    if(request.method === 'POST'){

        const registroCriado = await client.items.create({
            itemType: "975398",
            ...request.body

            
   
    
        });
    
        console.log(registroCriado);
    
        response.json({
            dados:'Alguma coisa',
            registroCriado: registroCriado,
        });
        return;


    }


        response.status(404).json({
            message: 'Ainda não temos nada no POST mais no GET tem!'
        })


}