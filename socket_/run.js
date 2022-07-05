const sql = require("../bd/sql/Query");
const updateStatistica = require("./estatistica_socket")
let usuarios = 0

exports.estatisticas=async(dataArr)=>{
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
    const rankPostBD = await sql.GetRankPosts(whereRankPost);
    if(!rankPostBD[0]){
        await sql.CriaRankPosts(cria_rankPost)
    }else{
        const acessosUpdate = (rankPostBD[0].acessos)+1
        await sql.AlteraRankPosts({acessos:acessosUpdate},whereRankPost) 
    };
    };});}else{
        const localBDbrt = await sql.GetLocalidade(whereLocalidade) 
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
        const rankPostBD = await sql.GetRankPosts(whereRankPost);
        if(!rankPostBD[0]){
            await sql.CriaRankPosts(cria_rankPost)
        }else{
            const acessosUpdate = (rankPostBD[0].acessos)+1

            await sql.AlteraRankPosts({acessos:acessosUpdate},whereRankPost) 
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