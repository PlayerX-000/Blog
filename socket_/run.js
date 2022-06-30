const sql = require("../bd/sql/Query");
const updateStatistica = require("./estatistica_socket")
let usuarios = 0

exports.estatisticas=async(dataArr)=>{
console.log("ESTATISTICA ENTROU")
const whereLocalidade = {
    where:{
        cidade:dataArr.cidade,
        pais:dataArr.pais,
        estado:dataArr.estado
    }
};
const localBD = await sql.GetLocalidade(whereLocalidade);
if(!localBD){
    this.local({
        cidade:dataArr.cidade,
        pais:dataArr.pais,
        estado:dataArr.estado
}).then(async(res)=>{
    if(res){
const localBDbrt = await sql.GetLocalidade(whereLocalidade) 
const localBD2 = localBDbrt.dataValues
const whereEstatistica = {
    where:{
        mes:dataArr.mes,
        ano:dataArr.ano,
        local_id: localBD2.id
    }
};
const cria_estatistica = {
    mes:dataArr.mes,
    ano:dataArr.ano,
    acessos: 1,
    local_id: localBD2.id
}
const EstatisticaBD = await sql.GetEstatistica(whereEstatistica);

if(!EstatisticaBD){
    await sql.CriaEstatistica(cria_estatistica)
    await updateStatistica.atualizaEstatistica()
}else{
    const acessosUpdate = (EstatisticaBD.acessos)+1
    await sql.AlteraEstatistica({acessos:acessosUpdate},whereEstatistica) 
    await updateStatistica.atualizaEstatistica()
};
};});}else{
    const localBDbrt = await sql.GetLocalidade(whereLocalidade) 
    const localBD = localBDbrt.dataValues
    const whereEstatistica = {
        where:{
            mes:dataArr.mes,
            ano:dataArr.ano,
            local_id: localBD.id
        }
    };
    const cria_estatistica = {
        mes:dataArr.mes,
        ano:dataArr.ano,
        acessos: 1,
        local_id: localBD.id
    }
    const EstatisticaBDbrt = await sql.GetEstatistica(whereEstatistica);
    const EstatisticaBD = EstatisticaBDbrt[0];
    if(!EstatisticaBD){
        await sql.CriaEstatistica(cria_estatistica)
        await updateStatistica.atualizaEstatistica()
    }else{
        const acessosUpdate = (EstatisticaBD.acessos)+1
        await sql.AlteraEstatistica({acessos:acessosUpdate},whereEstatistica) 
        await updateStatistica.atualizaEstatistica()
    };
};};










exports.rank_post=async(dataArr,idPost)=>{
console.log("WHERE LOCALIDADE FEITO")
    const whereLocalidade = {
        where:{
            cidade:dataArr.cidade,
            pais:dataArr.pais,
            estado:dataArr.estado
        }
    };
    console.log("PEGA LOCALIDADE")
    const localBD = await sql.GetLocalidade(whereLocalidade);
    if(!localBD){
        console.log("LOCALIDADE NAO EXISTE")
        this.local({
            cidade:dataArr.cidade,
            pais:dataArr.pais,
            estado:dataArr.estado
    }).then(async(res)=>{
        if(res){
            console.log("LOCALIDADE CRIADA")
    const localBDbrt = await sql.GetLocalidade(whereLocalidade) 
    const localBD2 = localBDbrt.dataValues

    const whereRankPost = {
        where:{
            mes:dataArr.mes,
            post_ID: idPost,
            ano:dataArr.ano,
            local_id: localBD2.id
        }
    };
    const cria_rankPost = {
            acessos:1,
            visitaram_vendedor:0,
            mes:dataArr.mes,
            post_ID: idPost,
            ano:dataArr.ano,
            local_id: localBD2.id
    }
    console.log("PEGA RANKPOST")
    const rankPostBD = await sql.GetRankPosts(whereRankPost);
    if(!rankPostBD){
        console.log("RANK POST NAO EXISTE")
        await sql.CriaRankPosts(cria_rankPost)
        console.log("RANK POST CRIADO")
    }else{
        console.log("ATUALIZANDO RANK POST")
        const acessosUpdate = (rankPostBD.acessos)+1
        await sql.AlteraRankPosts({acessos:acessosUpdate},whereRankPost) 
        console.log("ATUALIZADO")
    };
    };});}else{
        console.log("LOCALIDADE EXISTE")
        const localBDbrt = await sql.GetLocalidade(whereLocalidade) 
        console.log("PEGOU LOCALIDADE")
        const localBD = localBDbrt.dataValues
        const whereRankPost = {
            where:{
                mes:dataArr.mes,
                post_ID: idPost,
                ano:dataArr.ano,
                local_id: localBD.id
            }
        };
        const cria_rankPost = {
            acessos:1,
            visitaram_vendedor:0,
            mes:dataArr.mes,
            post_ID: idPost,
            ano:dataArr.ano,
            local_id: localBD.id
    }
    console.log("PEGANDO RANK POST")
        const rankPostBD = await sql.GetRankPosts(whereRankPost);
        if(!rankPostBD){
            console.log("RANK POST NAO EXISTE")
            await sql.CriaRankPosts(cria_rankPost)
            console.log("CRIADO")
        }else{
            const acessosUpdate = (rankPostBD.acessos)+1
            await sql.AlteraRankPosts({acessos:acessosUpdate},whereRankPost) 
            console.log("RANK POST ATUALIZADO")
        };
    };
};
exports.local=async(dados)=>{
const regra = {cidade:dados.cidade,pais:dados.pais,estado:dados.estado}
const criacaoLocalidade = await sql.CriaLocalidade(regra);
return criacaoLocalidade;
};
exports.UsuariosOnlineControle=(user)=>{
usuarios=usuarios+user
}
exports.getUsersOnline=()=>{return usuarios;};