import React, {useEffect, useRef, useState} from 'react'
import {Modal, Button} from 'react-bootstrap';
import styles from "./RaffleConfig.module.scss";
import ReffleItem01 from "../../../assets/images/home/reffle_item_01.png";
import {POST} from "../../../api/api";
import Pagination from "../../common/Pagination";
import {Link} from "react-router-dom";
import ShippingView from "../../common/ShippingView";

function RaffleConfig(props) {
    const [showAlertModal, setShowAlertModal] = useState(false); // 알림창 모달
    const [alerts, setAlerts] = useState(""); // 알림 메세지
    const [endRaffleList, setEndRaffleList] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const offset = (page - 1) * limit;
    function closeAlert() {
        setShowAlertModal(false);
        setAlerts("");
    }
    const [nftTokenId, setNftTokenId] = useState(); //선택 토큰
    const [postUseState, setPostUseState] = useState(false); // 주소 사용 여부
    const [shippingView, setShippingView] = useState(false);
    async function viewAddressFormFadeIn(tokenId, postUse) {
        setPostUseState(postUse);
        setNftTokenId(tokenId);
        setShippingView(true);
    }
    // 래플마감
    async function raffleEnd(round){
        try{
            const result = await POST(`/api/v1/raffle/end`,{round},props.adminApiToken);
            if (result.result === 'success') {
                setAlerts(`${round}회차 래플이 마감되었습니다.`);
                setShowAlertModal(true);
            }
        } catch (e){
            console.log(e);
            setAlerts(`${round}회차 래플 마감 처리를 실패하였습니다.\n다시 시도해주세요.`);
            setShowAlertModal(true);
        }
    }
    // 래플 취소
    async function raffleCancel(round){
        try{
            const result = await POST(`/api/v1/raffle/cancel`,{round},props.adminApiToken);
            if (result.result === 'success') {
                setAlerts(`${round}회차 래플이 취소되었습니다.`);
                setShowAlertModal(true);
            }
        } catch (e){
            console.log(e);
            setAlerts(`${round}회차 래플 취소처리를 실패하였습니다.\n다시 시도해주세요.`);
            setShowAlertModal(true);
        }
    }
    // 발송완료 처리
    async function raffleItemShippingEnd(round, item){
        try{
            const tokenId = item.tokenId;
            const result = await POST(`/api/v1/raffle/shipping/end`,{tokenId},props.adminApiToken);
            if (result.result === 'success') {
                setAlerts(`${round}회차 ${item.title}이 발송완료 처리되었습니다.`);
                setShowAlertModal(true);
            }
        } catch (e){
            console.log(e);
            setAlerts(`${round}회차 [${item.title}] 발송완료 처리를 실패하였습니다.\n다시 시도해주세요.`);
            setShowAlertModal(true);
        }

    }
    useEffect(() => {
        async function getEndRaffleList() {
            await POST(`/api/v1/raffle/getEndRaffleList`,{page},props.adminApiToken).then(async (result) => {
                if (result.result === 'success') {
                    setEndRaffleList(result.data);
                    setLimit(result.limit);
                    setTotal(result.total);
                }
            });
        }
        getEndRaffleList();
    }, [page]);
    return (
        <>
            <div className={styles.raffle_config}>
                <h2 className={styles.raffle_config_title}>
                    래플 관리
                </h2>
                <Link to="/admin/raffle_add" className={styles.add_btn}>신규등록</Link>
                {/*진행중*/}
                <div className={styles.active_raflle_box}>
                    <div className={styles.content_title}>
                        <span>진행중</span>
                    </div>
                    <div className={styles.raffle_list}>
                        <div className={styles.raffle_list_info}>
                            <div className={styles.raffle_round}>{props.raffleInfo?.round}회차</div>
                            <br/>
                            {props.raffleInfo?.start_date}
                            ~ {props.raffleInfo?.end_date}
                        </div>
                        <div className={styles.raffle_list_item_box}>
                            <h3>진행상품</h3>
                            {
                                props.raffleList?.map((item, index) => (
                                    <div key={index} className={styles.raffle_list_item}>
                                        <div className={styles.raffle_list_item_left}>
                                            <img src={item.image_url} alt="item img"/>
                                        </div>
                                        <div className={styles.raffle_list_item_right}>
                                            {item.title} : {item.price} <br/>
                                            <span className={styles.raffle_list_item_span}>응모현황 : {item.enter}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.raffle_list_button_box}>
                            <button onClick={()=> raffleEnd(props.raffleInfo?.round)} className={styles.raffle_btn}>래플 마감</button>
                            <button onClick={()=> raffleCancel(props.raffleInfo?.round)} className={styles.disable_btn}>래플 취소</button>
                        </div>
                    </div>
                </div>
                {/*종료*/}
                <div className={styles.active_raflle_box}>
                    <div className={styles.content_title}>
                        <span>종료</span>
                    </div>
                    {
                        endRaffleList.map((item, index) => (
                            <div key={index} className={styles.raffle_list}>
                                <div className={styles.raffle_list_info}>
                                    <div className={`${styles.raffle_round} ${styles.disable}`}>{item.round}회차</div>
                                    <br/>
                                    {item.start_date}
                                    ~ {item.end_date}
                                </div>
                                <div className={styles.raffle_list_item_box}>
                                    <h3>진행상품</h3>
                                    {
                                        item.item.map((item2, index2) => (
                                            <div key={index2} className={styles.raffle_list_item}>
                                                <div className={styles.raffle_list_item_left}>
                                                    <img src={item2.image_url} alt="item img"/>
                                                </div>
                                                <div className={styles.raffle_list_item_right}>
                                                    {item2.title}<br/>
                                                    <span className={styles.raffle_list_item_span}>응모현황 : {item2.enter}</span>
                                                    <button onClick={ () => viewAddressFormFadeIn(item2.tokenId, item2.is_need_address)} className={styles.raffle_list_item_button}>배송신청현황</button>
                                                    <button onClick={() => raffleItemShippingEnd(item.round, item2)} className={styles.raffle_list_item_button}>발송완료처리</button>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                                <div className={styles.raffle_list_button_box}>
                                    <button className={styles.raffle_btn}>구매 체결 트랜잭션</button>
                                    <button className={styles.disable_btn}>환불 트랜잭션</button>
                                </div>
                            </div>
                        ))
                    }
                    <Pagination
                        total={total}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                    />
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
            {/*배송정보 확인 모달*/}
            <ShippingView shippingView={shippingView} setShippingView={setShippingView} tokenId={nftTokenId} postUse={postUseState} apiToken={props.adminApiToken} address={props.accounts} setNftTokenId={setNftTokenId}/>
        </>
    )
}

export default RaffleConfig
