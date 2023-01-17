import React, {useEffect, useRef, useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import styles from "./raffleAdd.module.scss";
import icon_01 from "../../../assets/images/icon/icon_01.png";
import {POST, MAIN_URL} from "../../../api/api";
import {Link} from "react-router-dom";
import ItemAdd from "./itemAdd/itemAdd";

function RaffleAdd(props) {
    const [showAlertModal, setShowAlertModal] = useState(false); // 알림창 모달
    const [showSuccessAlertModal, setShowSuccessAlertModal] = useState(false); // 알림창 모달
    const [alerts, setAlerts] = useState(""); // 알림 메세지
    const [itemCount, setItemCount] = useState(4); // 상품정보

    function closeAlert() {
        setShowAlertModal(false);
        setAlerts("");
    }

    function addItem() {
        setItemCount(itemCount + 1);
    }

    function deleteItem() {
        setItemCount(itemCount - 1);
    }

    async function formCheck() {
        const form = new FormData(document.getElementById('raffleForm'));
        form.append('walletAddress',props.accounts);
        for (const keyValue of form) {
            console.log(keyValue);
            if (!keyValue[1] || keyValue[1].size === 0) {
                let inputName;
                switch (keyValue[0]) {
                    case "round":
                        inputName = "회차";
                        break;
                    case "title":
                        inputName = "타이틀";
                        break;
                    case "start_date":
                        inputName = "시작일";
                        break;
                    case "start_time":
                        inputName = "시작시간";
                        break;
                    case "end_date":
                        inputName = "종료일";
                        break;
                    case "end_time":
                        inputName = "종료시간";
                        break;
                    case "itemTitle[]":
                        inputName = "상품명";
                        break;
                    case "itemDescription[]":
                        inputName = "상품설명";
                        break;
                    case "itemPrice[]":
                        inputName = "상품가격";
                        break;
                    case "itemImage[]":
                        inputName = "상품이미지";
                        break;
                }
                setAlerts(`${inputName}를(을) 입력해주세요.`);
                setShowAlertModal(true);
                return false;
            }
            console.log(keyValue[1]);
        }
        await POST(`/api/v1/raffle/createRaffle`, form, props.apiToken).then(async (result) => {
            if (result.result === 'success') {
                setShowSuccessAlertModal(true);
            }
        });
    }
    return (
        <>
            <div className={styles.raffle_add}>
                <h2 className={styles.raffle_add_title}>
                    래플 신규 등록
                </h2>
                <form id="raffleForm" className={styles.raffle_add_box} method="post" enctype="multipart/form-data">
                    <div className={styles.raffle_add_box_title}>
                        <img src={icon_01}/>래플정보
                    </div>
                    <div className={styles.raffle_add_input}>
                        <label>회차</label>
                        <input type="text" name="round"/>
                    </div>
                    <div className={styles.raffle_add_input}>
                        <label>타이틀</label>
                        <input type="text" name="title"/>
                    </div>
                    <div className={styles.raffle_add_input}>
                        <label>시작일</label>
                        <input type="date" name="startDate"/>
                    </div>
                    <div className={styles.raffle_add_input}>
                        <label>시작시간</label>
                        <input type="time" name="startTime"/>
                    </div>
                    <div className={styles.raffle_add_input}>
                        <label>종료일</label>
                        <input type="date" name="endDate"/>
                    </div>
                    <div className={styles.raffle_add_input}>
                        <label>종료시간</label>
                        <input type="time" name="endTime"/>
                    </div>
                    <div className={styles.raffle_add_input}>
                        <label>소개</label>
                        <textarea name="description"/>
                    </div>
                    <div className={styles.raffle_add_box_title}>
                        <img src={icon_01}/>상품정보
                        <button className={styles.add_btn} type={"button"} onClick={() => {
                            addItem()
                        }}> 상품추가</button>
                        <button className={styles.add_btn} type={"button"} onClick={() => {
                            deleteItem()
                        }}> 상품삭제
                        </button>
                    </div>
                    {Array(itemCount)
                        .fill()
                        .map((_, i) => (
                            <ItemAdd idx={i}/>
                        ))
                    }
                </form>
                <div className={styles.raffle_button_box}>
                    <button onClick={() => {
                        formCheck()
                    }} className={styles.raffle_btn}>등록
                    </button>
                    <Link to="/admin/raffle_config" className={styles.disable_btn}>취소</Link>
                </div>
            </div>
            {/*알림창 모달*/}
            <Modal centered show={showAlertModal}
                   onHide={() => closeAlert()}>
                <Modal.Body>
                    <div className="text-center mt-5">
                        <p className="alert_msg"> {alerts}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="alert_box">
                    <button variant="" onClick={() => closeAlert()} className="close_btn">
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
            {/*완료 모달*/}
            <Modal centered show={showSuccessAlertModal}
                   onHide={() => closeAlert()}>
                <Modal.Body>
                    <div className="text-center mt-5">
                        <p className="alert_msg"> 등록이 완료되었습니다.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="alert_box">
                    <Link  className="close_btn" to={"/admin/raffle_config"}> 확인</Link>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RaffleAdd
