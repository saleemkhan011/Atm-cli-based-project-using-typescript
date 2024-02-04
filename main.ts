import inquirer from "inquirer";
import chalk from "chalk";



interface atmType {
    userId:string,
    pin:number|string,
    accountType:string,
    mainMenu:string,
    fastCash:number,
}

let atm:atmType = await inquirer.prompt([
    {
        name:'userId',
        type:'input',
        message:'Enter your Id: '
    },
    {
        name:'pin',
        type:'password',
        mask:'*',
        message:'Enter Pin code: '
    },
    {
        name:'accountType',
        type:'list',
        message:'Enter your Account Type:',
        choices:['Current Account','Saving Account'],
    },
    {
        name:'mainMenu',
        type:'list',
        choices:['Balance Inquiry','Fast Cash','Cash Withdrawal','User Information','Exit'],
        message:'Main Menu',
    },
    {
        name:'fastCash',
        type:'list',
        choices:[1000,2000,3000,4000,5000],
        message:'Select amount:',
        when(atm) {
         return atm.mainMenu ==='Fast Cash'
        },
    },
])

let balance = Number((Math.random()*1000000).toFixed(2))



if(atm.mainMenu==='Balance Inquiry'){
    console.log('Dear customer your account balance is:',chalk.green(balance.toLocaleString()))
}



if(atm.mainMenu === 'Fast Cash'){
    if(balance>atm.fastCash){
        let newbalance = balance - atm.fastCash;
        console.log(`Previous Balance:${chalk.green(balance.toLocaleString())}\nNew Balance:${chalk.green(newbalance.toLocaleString())}`)
    }else{
        console.log('Insufficent Balance.')
    }
}





if(atm.mainMenu === 'Cash Withdrawal'){
    let withdrawalAmount = await inquirer.prompt({
        name:'amount',
        type:'number',
        message:'Enter amount:'
    });

    if(withdrawalAmount.amount<balance){
        let balance2 = balance - withdrawalAmount.amount;
        console.log(`Previous Balance:${chalk.green(balance.toLocaleString())}\nNew Balance:${chalk.green(balance2.toLocaleString())}`)
    }else{
        console.log('Insufficient Balance.')
    }

}


if (atm.mainMenu === 'User Information'){
    console.log(atm);
}




if (atm.mainMenu === 'Exit'){
    console.log('Thank you for using ATM.')
}




