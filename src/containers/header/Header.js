import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom";
import logo from "../../assets/images/common/logo.png";
import ConnectWallet from "../../components/connectWallet/ConnectWallet";
import styles from "./Header.module.scss";
import myPageButton from "../../assets/images/icon/icon_mypage.png";
import {store} from "../../store";
// import engButton from "../../assets/images/icon/eng_btn.png";
// import koButton from "../../assets/images/icon/ko_btn.png";
// import menuButton from "../../assets/images/icon/menu_btn.png";
// import aniverseIcon from "../../assets/images/icon/icon_larvaNFT.png";
// import discordIcon from "../../assets/images/icon/icon_discord.png";
// import twitterIcon from "../../assets/images/icon/icon_twitter.png";
// import kakaoIcon from "../../assets/images/icon/icon_kakao.png";

function Header(props) {
    const location = useLocation();
    const [menuStatus, setMenuStatus] = useState(false);
    const menuToggle = () => {
        // 👇️ passed function to setState
        setMenuStatus(current => !current);
    };
    useEffect(() => {
        console.log(props.admin);
        if (location.pathname === '/raffle_config' || location.pathname === '/shipping' || location.pathname === '/banner') {
            if (!props.admin) {
                alert('관리자만 접근 가능합니다.');
                document.location.href = '/';
            }
        }
    }, [props.admin])
    return (
        <>
            <div className={styles.header}>
                <Link to="/">
                    <img className={styles.logo_img} src={logo} alt="header logo"/>
                </Link>

                {
                    props.admin &&
                    <div>
                        <Link to="/admin/raffle_config" className={styles.menu_text}>
                            래플관리
                        </Link>
                    </div>
                }
                {/*<div>*/}
                {/*    {props.language === 'ko' ? (*/}
                {/*        <button className={styles.img_button} onClick={() => props.langChangeHandler("en")}><img src={engButton} alt="ENG Button"/></button>*/}
                {/*    ) : (*/}
                {/*        <button className={styles.img_button} onClick={() => props.langChangeHandler("ko")}><img src={koButton} alt="KO Button"/></button>*/}
                {/*    )}*/}
                {/*    <button className={styles.img_button} onClick={() => menuToggle()}><img src={menuButton} alt="menu Button"/></button>*/}
                {/*    <div className={styles.menu_button} style={{display: menuStatus ? 'block' : 'none'}}>*/}
                {/*        <a href="https://larvanft.aniverse.io/" target="_blank" rel="noopener noreferrer"><img src={aniverseIcon} alt="aniverse.io"/> {props.t('LARVA_NFT')}</a>*/}
                {/*        <a href="https://discord.gg/larvanft" target="_blank" rel="noopener noreferrer"><img src={discordIcon} alt="discord link"/> {props.t('DISCORD')}</a>*/}
                {/*        <a href="https://twitter.com/ANIVERSE_NFT" target="_blank" rel="noopener noreferrer"><img src={twitterIcon} alt="twitter link"/> {props.t('TWITTER')}</a>*/}
                {/*        <a href="https://open.kakao.com/o/gCGOxhAc" target="_blank" rel="noopener noreferrer"><img src={kakaoIcon} alt="kakao link"/> {props.t('KAKAO')}</a>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {
                    props.admin ? (
                    <div>
                        <button className={styles.logout_button} onClick={() => props.adminLogout()}>Logout</button>
                    </div>
                    ) :(
                        <ConnectWallet accounts={props.accounts} apiToken={props.apiToken}
                                       networkId={props.networkId}
                                       handleKaikasConnect={() => props.handleKaikasConnect()}
                                       handleLogout={() => props.handleLogout()}/>
                    )
                }
            </div>
        </>
    )
}

export default Header
