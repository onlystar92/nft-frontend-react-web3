import { RpcError } from 'eosjs';

async function signTransaction(activeUser, transactionData) {
    var result = null;
    var statusCode = 200;
    var message = "success";
    var actions = [];
    for(let i=0;i < transactionData.length; i++){
        const action = {
            account: Array.isArray(transactionData[i]) ? transactionData[i][0].contractAccount : transactionData[i].contractAccount,
            name: Array.isArray(transactionData[i]) ? transactionData[i][0].actionName : transactionData[i].actionName,
            authorization: [{
                actor: activeUser.accountName,
                permission: activeUser.requestPermission
            }],
            data: Array.isArray(transactionData[i]) ? transactionData[i][0].data : transactionData[i].data,
        };
        actions.push(action);
    }

    try {
        result = await activeUser.signTransaction({
            actions: actions
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.log(result);
    } catch (e) {
            console.log(e);
            if (e instanceof RpcError)
                result = e.json;
                console.log(e);
                if (typeof result === 'string' && 'code' in result) {
                    statusCode = result['code'];
                } else {
                    statusCode = "500";
                }
                message = e + "";
    }
    return {response: result, status: statusCode, message: message};
}

export default signTransaction;