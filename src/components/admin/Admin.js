import React, {useEffect, useRef, useState} from 'react'
import styles from "./Admin.module.scss";
import idIcon from "../../assets/images/icon/icon_id.png";
import pwIcon from "../../assets/images/icon/icon_pw.png";
import RaffleConfig from "./raffleConfig/RaffleConfig";
import {useNavigate} from "react-router-dom";

function Admin(props) {

    const Navigate = useNavigate();
    const onId = (e) => {
        props.setAdminId(e.target.value);
    };
    const onPw = (e) => {
        props.setAdminPassword(e.target.value);
    };
    useEffect(() => {
    }, []);
    return (
        <>
            {props.admin ? (
                <>
                    <RaffleConfig accounts={props.accounts} adminApiToken={props.adminApiToken} raffleList={props.raffleList} raffleInfo={props.raffleInfo}/>
                </>
            ) : (
                <div className={styles.admin}>
                    <h1 className={styles.admin_title}>
                        LARVA NFT<br/>
                        <span className={styles.point_color}>RAFFLE<span className={styles.admin_title_sub}>ADMIN</span></span>
                    </h1>
                    <div className={styles.login_box}>
                        <h2>어드민 로그인</h2>
                        <div className={styles.input_box}>
                            <label><img src={idIcon} alt={'idIcon'}/> </label><input onChange={onId} type={'text'}
                                                                                     name={'login'}
                                                                                     placeholder={'사용자 아이디'}/>
                        </div>
                        <div className={styles.input_box}>
                            <label><img src={pwIcon} alt={'pwIcon'}/> </label><input onChange={onPw} type={'password'}
                                                                                     name={'login'}
                                                                                     placeholder={'비밀번호'}/>
                        </div>
                        <button onClick={() => props.adminLogin()} className={styles.raffle_btn}>LOGIN</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Admin
