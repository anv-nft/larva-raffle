import React, {useEffect, useRef, useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from "../containers/header/Header";
import Footer from "../containers/footer/Footer";
import Home from "../components/home/Home";
import {GET, POST} from "../api/api";
import {useWeb3React} from "@web3-react/core";
import {kaikasConnector} from "../utils/web3/connectors";
import Caver from "caver-js";
import {isTestNet} from "../utils/web3/networks";
import {store} from "../store";
import {CHANGE_ADDRESS} from "../store/actions/walletAddress";
import MyPage from "../components/mypage/MyPage";
import Admin from "../components/admin/Admin";
import {useTranslation} from "react-i18next";
import i18next from "../lang/i18n";
import RaffleConfig from "../components/admin/raffleConfig/RaffleConfig";
import RaffleAdd from "../components/admin/raffleAdd/RaffleAdd";

function Index() {
    const {t} = useTranslation();
    const {account, active, activate, deactivate} = useWeb3React();
    const didMount = useRef(true);
    const [accounts, setAccounts] = useState('');
    const [apiToken, setApiToken] = useState(null);
    const [networkId, setNetworkId] = useState(1);
    // const [isConnectedWallet, setConnectWallet] = useState(undefined);
    const [language, setLanguage] = useState("ko");

    const [admin, setAdmin] = useState(false);
    const [adminId, setAdminId] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminApiToken, setAdminApiToken] = useState(null);

    const [raffleList, setRaffleList] = useState([]);
    const [raffleInfo, setRaffleInfo] = useState([]);

    const langChangeHandler = (lang) => {
        setLanguage(lang);
        i18next.changeLanguage(lang);
    }

    // async function checkWalletClosed() {
    //     setInterval(async () => {
    //         const isConnected = window.localStorage.getItem("isConnected");
    //         // console.log(isConnected);
    //         if (isConnected === 'YES') {
    //             const isUnlocked = await window.klaytn._kaikas.isUnlocked();
    //             // console.log(isUnlocked);
    //             if (!isUnlocked) {
    //                 await logout();
    //             }
    //         } else {
    //             setConnectWallet("NO");
    //         }
    //     }, 1000);
    // }

    function loadWalletAttributes(account, chainId) {
        let tempAccounts = [];
        tempAccounts.push(account);
        setAccounts(account);
        store.dispatch(CHANGE_ADDRESS(account, chainId));
        setNetworkId(chainId);

    }

    async function connectKaikas() {
        if (isKaikasWalletInstalled()) {
            try {
                await activate(kaikasConnector);

                const accounts = await window.klaytn.enable();
                const account = accounts[0];
                if (!isTestNet) {
                    if (window.klaytn.networkVersion !== 8217) {
                        alert('Please switch your wallet to the mainnet.');
                        throw new Error('Please switch your wallet to the mainnet');
                    }
                }

                const token = localStorage.getItem('aniverse_token');
                if (token === null) {
                    //토큰생성
                    const res = await GET(`/api/v1/auth/raffle/${account}/uuid`);
                    // sign
                    const message = res.uuid;
                    const provider = window['klaytn'];
                    const caver = new Caver(provider);
                    //서명받기
                    await caver.klay.sign(message, account).then(async (message) => {
                        // get JWT
                        // jwt = await requestSignin(address, signedMessage);
                        await POST(`/api/v1/auth/raffle/signin`, {
                            address: account,
                            message
                        }).then((sign) => {
                            localStorage.setItem('aniverse_token', sign.token);
                            setApiToken(sign.token);
                            loadWalletAttributes(account, window.klaytn.networkVersion);
                        });
                        // save JWT
                    });


                } else if (token) {
                    const tokenCheck = await POST(`/api/v1/auth/tokencheck`, {address: account}, token);
                    if (tokenCheck.result === 'success' && tokenCheck.address === account) {
                        setApiToken(token);
                        loadWalletAttributes(account, window.klaytn.networkVersion);
                    } else {
                        await logout();
                    }
                } else {
                    await logout();
                }
            } catch (e) {
                await logout();
                console.log(e)
            }
        } else {
            alert("Please install Kaikas");
        }
    }


    function isKaikasWalletInstalled() {
        return window.klaytn !== undefined
    }

    async function logout() {
        window.localStorage.removeItem("aniverse_token");
        setNetworkId(undefined);
        setAccounts('');
        setAdmin(false);
        store.dispatch(CHANGE_ADDRESS('', ''));
        try {
            await deactivate();
        } catch (e) {
            console.log(e);
        }
    }

    async function adminLogin() {
        console.log(adminId)
        if(adminId === ''){
            alert('아이디를 입력해주세요.');
            return false;
        }
        if(adminPassword === ''){
            alert('패스워드를 입력해주세요.');
            return false;
        }
        const adminLoginCheck = await POST(`/api/v1/auth/raffle/admin/login`, {id: adminId, password: adminPassword});
        if (adminLoginCheck.result === 'success') {
            console.log(adminLoginCheck);
            localStorage.setItem('aniverse_admin_token', adminLoginCheck.token);
            setAdminApiToken(adminLoginCheck.token);
            setAdmin(true);
        } else {
            alert('로그인 실패 다시 시도해주세요.')
        }
    }

    function adminLogout() {
        console.log('logout');
        localStorage.setItem('aniverse_admin_token', '');
        setAdminApiToken('');
        setAdmin(false);
    }

    useEffect(() => { // CHECK CONNECTION
        async function logoutEffect() {
            await logout();
        }

        if (didMount.current) {
            didMount.current = false;
            return;
        }
        if (!active) {
            logoutEffect();
        }
        // 새고로침시 로그아웃 되는 로직개선
        if (account) {
            const storeAddress = store.getState().wallet.address;
            if (storeAddress !== account.toLowerCase()) {
                logoutEffect();
            }
        }
    }, [active, account]);
    // 어드민 검증
    useEffect(() => {
        const adminToken = localStorage.getItem('aniverse_admin_token');
        if (adminToken) {
            async function tokenCheckApi(){
                try{
                    await POST(`/api/v1/auth/admintokencheck`, {}, adminToken).then(async (result) => {
                        if (result.result === 'success') {
                            setAdminApiToken(adminToken);
                            setAdmin(true);
                        } else {
                            adminLogout();
                        }
                    });
                } catch (e){
                    adminLogout();
                }
            }
            if(!admin){
                tokenCheckApi();
            }
        }
    }, [admin]);
    useEffect(() => {
        async function getCurrentRaffleList(){
            await POST(`/api/v1/raffle/getCurrentRaffleList`).then(async (result) => {
                if (result.result === 'success') {
                    setRaffleList(result.data);
                    setRaffleInfo(result.info);
                }
            });
        }
        getCurrentRaffleList();
    }, []);
    return (

        <Router>
            <Header accounts={accounts} apiToken={apiToken} networkId={networkId}
                    handleKaikasConnect={() => connectKaikas()} handleLogout={() => logout()}
                    langChangeHandler={langChangeHandler} t={t} language={language} admin={admin}
                    adminLogout={() => adminLogout()}/>
            <Routes>
                <Route path="/admin"
                       element={<Admin admin={admin} adminId={adminId} adminPassword={adminPassword}
                                       setAdminId={setAdminId} setAdminPassword={setAdminPassword}
                                       adminLogin={() => adminLogin()}
                                       accounts={accounts} adminApiToken={adminApiToken} raffleList={raffleList} raffleInfo={raffleInfo}
                       />}/>

                {admin &&
                    <>
                        <Route path="/admin/raffle_config"
                               element={<RaffleConfig accounts={accounts} adminApiToken={adminApiToken} raffleList={raffleList} raffleInfo={raffleInfo}/>}/>
                        <Route path="/admin/raffle_add"
                               element={<RaffleAdd accounts={accounts} adminApiToken={adminApiToken}/>}/>
                    </>
                }
                {(accounts && accounts.length > 0) &&
                    <Route path="/mypage" element={<MyPage accounts={accounts} apiToken={apiToken}
                                                           networkId={networkId}
                                                           handleKaikasConnect={() => connectKaikas()}
                                                           handleLogout={() => logout()}/>}/>
                }

                <Route path="*"
                       element={<Home t={t} accounts={accounts} apiToken={apiToken} networkId={networkId} raffleList={raffleList} raffleInfo={raffleInfo}/>}/>
            </Routes>
            <Footer/>
        </Router>
    )
}

export default Index
