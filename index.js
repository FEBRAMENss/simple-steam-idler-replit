const client = require('steam-user');
const totp = require('steam-totp');
const keep_alive = require('./keep_alive.js');

// Credenciais via variáveis de ambiente
var acc = process.env.username;
var pass = process.env.password;
var secret = process.env.shared;

// Jogos a manter ativos (AppIDs)
var apps = [730];
var mode = 1; // 1 - online, 7 - invisível

// Inicializar cliente
let session = new client();
session.logOn({
    "accountName": acc,
    "password": pass,
    "twoFactorCode": totp.generateAuthCode(secret)
});

// Quando entrar
session.on('loggedOn', () => {
    if (session.steamID != null) 
        console.log(session.steamID + ' - Sessão iniciada com sucesso');

    session.setPersona(mode);               
    session.gamesPlayed(apps);
});


// var username2 = process.env.username2;
// var password2 = process.env.password2;
// var shared_secret2 = process.env.shared2;

// var games2 = [730, 440, 570, 304930];  // Enter here AppIDs of the needed games
// var status2 = 1;  // 1 - online, 7 - invisible


// user2 = new steamUser();
// user2.logOn({"accountName": username2, "password": password2, "twoFactorCode": steamTotp.generateAuthCode(shared_secret2)});
// user2.on('loggedOn', () => {
// 	if (user2.steamID != null) console.log(user2.steamID + ' - Successfully logged on');
// 	user2.setPersona(status2);               
// 	user2.gamesPlayed(games2);
// });
